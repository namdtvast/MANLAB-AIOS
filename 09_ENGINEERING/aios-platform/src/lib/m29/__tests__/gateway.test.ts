// Tool Gateway là điểm gọi API nền tảng DUY NHẤT mà Agent được phép dùng, nên đây là ranh giới
// an ninh của cả module. Test khóa lại 8 bước kiểm tra VÀ THỨ TỰ của chúng: một bước bị bỏ, bị
// đảo, hay bị "tối ưu" ra sau lời gọi nền tảng đều làm test đỏ.
//
// Prisma và Platform Adapter đều được giả lập — mục tiêu là kiểm tra logic chốt chặn, không phải
// kiểm tra Postgres.
import { beforeEach, describe, expect, it, vi } from "vitest";

const prismaMock = {
  aITool: { findUnique: vi.fn() },
  aIAgent: { findUnique: vi.fn() },
  aIImpactAssessment: { findFirst: vi.fn() },
  aIPlatform: { findUnique: vi.fn() },
  aIRequest: { create: vi.fn() },
  aIToolCall: { create: vi.fn() },
};

const adapterCall = vi.fn();

vi.mock("@/lib/prisma", () => ({ prisma: prismaMock }));
vi.mock("../adapters", () => ({
  getAdapter: () => ({ call: adapterCall, health: vi.fn() }),
}));

const { callTool } = await import("../gateway");

const TOOL = { id: "tool-1", platformId: "plat-1", code: "T1", status: "ACTIVE", permissionLevel: "READ" };
const AGENT = { id: "agent-1", name: "Trợ lý AI", status: "ACTIVE", toolIds: ["tool-1"], modelId: "m1", activePromptVersionId: "pv1", suspendedReason: null };
const AIA_APPROVED = { id: "aia-1", status: "APPROVED", code: "AIA-2026-001" };
const PLATFORM = { id: "plat-1", adapterType: "ManlabPlatformAdapter" };
const USER = { id: "u1", role: "AI_ADMIN" as const };

/** Dựng trạng thái "mọi thứ hợp lệ" rồi từng test chỉ hỏng đúng một mắt xích. */
function happyPath() {
  prismaMock.aITool.findUnique.mockResolvedValue({ ...TOOL });
  prismaMock.aIAgent.findUnique.mockResolvedValue({ ...AGENT });
  prismaMock.aIImpactAssessment.findFirst.mockResolvedValue({ ...AIA_APPROVED });
  prismaMock.aIPlatform.findUnique.mockResolvedValue({ ...PLATFORM });
  prismaMock.aIRequest.create.mockResolvedValue({ id: "req-1" });
  prismaMock.aIToolCall.create.mockResolvedValue({ id: "call-1" });
  adapterCall.mockResolvedValue({ status: 200, output: { ok: true }, latencyMs: 12, errorCode: null });
}

beforeEach(() => {
  vi.clearAllMocks();
  happyPath();
});

describe("Tool Gateway — đường đi thành công", () => {
  it("qua đủ các bước thì gọi nền tảng và ghi lại trace", async () => {
    const r = await callTool({ toolId: "tool-1", agentId: "agent-1", input: { x: 1 }, user: USER });
    expect(r).toMatchObject({ ok: true, traceId: "req-1", requestId: "req-1", toolCallId: "call-1" });
    expect(adapterCall).toHaveBeenCalledOnce();
    expect(prismaMock.aIRequest.create).toHaveBeenCalledOnce();
    expect(prismaMock.aIToolCall.create).toHaveBeenCalledOnce();
  });
});

describe("Tool Gateway — từng chốt chặn", () => {
  it("(1) Tool không tồn tại", async () => {
    prismaMock.aITool.findUnique.mockResolvedValue(null);
    const r = await callTool({ toolId: "khong-co", agentId: "agent-1", input: {}, user: USER });
    expect(r).toMatchObject({ ok: false, code: "NOT_FOUND" });
    expect(adapterCall).not.toHaveBeenCalled();
  });

  it("(2) không cho gọi Tool trần — bắt buộc thay mặt một Agent cụ thể", async () => {
    const r = await callTool({ toolId: "tool-1", agentId: undefined, input: {}, user: USER });
    expect(r).toMatchObject({ ok: false, code: "AGENT_REQUIRED" });
    expect(adapterCall).not.toHaveBeenCalled();
  });

  it("(3) Agent không tồn tại", async () => {
    prismaMock.aIAgent.findUnique.mockResolvedValue(null);
    const r = await callTool({ toolId: "tool-1", agentId: "khong-co", input: {}, user: USER });
    expect(r).toMatchObject({ ok: false, code: "NOT_FOUND" });
  });

  it("(3b) Agent bị Tạm dừng vì AIA quá hạn — chặn kèm lý do (ETV.P29 mục 5.2.3)", async () => {
    prismaMock.aIAgent.findUnique.mockResolvedValue({ ...AGENT, status: "SUSPENDED", suspendedReason: "AIA_OVERDUE" });
    const r = await callTool({ toolId: "tool-1", agentId: "agent-1", input: {}, user: USER });
    expect(r).toMatchObject({ ok: false, code: "AGENT_NOT_ACTIVE" });
    if (!r.ok) expect(r.message).toContain("AIA_OVERDUE");
    expect(adapterCall).not.toHaveBeenCalled();
  });

  it("(3b) Agent bị Tạm dừng để khống chế sự cố Nghiêm trọng — chặn (ETV.P29 mục 5.7.3)", async () => {
    prismaMock.aIAgent.findUnique.mockResolvedValue({ ...AGENT, status: "SUSPENDED", suspendedReason: "INCIDENT:SCAI-2026-0001" });
    const r = await callTool({ toolId: "tool-1", agentId: "agent-1", input: {}, user: USER });
    expect(r).toMatchObject({ ok: false, code: "AGENT_NOT_ACTIVE" });
    if (!r.ok) expect(r.message).toContain("SCAI-2026-0001");
  });

  it("(3b) Agent đã Vô hiệu hóa cũng không gọi được — lỗ hổng của bản trước Increment 4", async () => {
    prismaMock.aIAgent.findUnique.mockResolvedValue({ ...AGENT, status: "DISABLED" });
    const r = await callTool({ toolId: "tool-1", agentId: "agent-1", input: {}, user: USER });
    expect(r).toMatchObject({ ok: false, code: "AGENT_NOT_ACTIVE" });
    expect(adapterCall).not.toHaveBeenCalled();
  });

  it("(4) Tool đang bị vô hiệu hóa", async () => {
    prismaMock.aITool.findUnique.mockResolvedValue({ ...TOOL, status: "DISABLED" });
    const r = await callTool({ toolId: "tool-1", agentId: "agent-1", input: {}, user: USER });
    expect(r).toMatchObject({ ok: false, code: "TOOL_DISABLED" });
    expect(adapterCall).not.toHaveBeenCalled();
  });

  it("(5) Tool không nằm trong whitelist của Agent", async () => {
    prismaMock.aIAgent.findUnique.mockResolvedValue({ ...AGENT, toolIds: ["tool-khac"] });
    const r = await callTool({ toolId: "tool-1", agentId: "agent-1", input: {}, user: USER });
    expect(r).toMatchObject({ ok: false, code: "TOOL_NOT_WHITELISTED" });
  });

  it("(6) vai trò không đủ quyền theo mức quyền của Tool", async () => {
    prismaMock.aITool.findUnique.mockResolvedValue({ ...TOOL, permissionLevel: "EXECUTE" });
    const r = await callTool({ toolId: "tool-1", agentId: "agent-1", input: {}, user: { id: "u2", role: "AI_VIEWER" } });
    expect(r).toMatchObject({ ok: false, code: "FORBIDDEN" });
    expect(adapterCall).not.toHaveBeenCalled();
  });

  it("(7) AIA Gate — Agent chưa có hồ sơ đánh giá tác động thì không vận hành được", async () => {
    prismaMock.aIImpactAssessment.findFirst.mockResolvedValue(null);
    const r = await callTool({ toolId: "tool-1", agentId: "agent-1", input: {}, user: USER });
    expect(r).toMatchObject({ ok: false, code: "AIA_NOT_APPROVED" });
    expect(adapterCall).not.toHaveBeenCalled();
  });

  it("(7) AIA Gate — hồ sơ chưa phê duyệt hoặc cần rà soát lại đều bị chặn", async () => {
    for (const status of ["DRAFT", "REVIEWED", "REVIEW_REQUIRED", "NOT_ASSESSED"]) {
      prismaMock.aIImpactAssessment.findFirst.mockResolvedValue({ ...AIA_APPROVED, status });
      const r = await callTool({ toolId: "tool-1", agentId: "agent-1", input: {}, user: USER });
      expect(r).toMatchObject({ ok: false, code: "AIA_NOT_APPROVED" });
    }
    expect(adapterCall).not.toHaveBeenCalled();
  });
});

describe("Tool Gateway — quyền hợp lệ vẫn không vượt được AIA Gate", () => {
  it("SUPER_ADMIN cũng bị chặn khi Agent chưa có AIA đã phê duyệt", async () => {
    prismaMock.aIImpactAssessment.findFirst.mockResolvedValue({ ...AIA_APPROVED, status: "DRAFT" });
    const r = await callTool({ toolId: "tool-1", agentId: "agent-1", input: {}, user: { id: "u3", role: "SUPER_ADMIN" } });
    expect(r).toMatchObject({ ok: false, code: "AIA_NOT_APPROVED" });
  });
});

describe("Tool Gateway — lời gọi nền tảng trả lỗi", () => {
  it("vẫn ghi trace rồi mới trả lỗi, không nuốt lỗi", async () => {
    adapterCall.mockResolvedValue({ status: 502, output: null, latencyMs: 5, errorCode: "UPSTREAM_DOWN" });
    const r = await callTool({ toolId: "tool-1", agentId: "agent-1", input: {}, user: USER });
    expect(r).toMatchObject({ ok: false, code: "UPSTREAM_DOWN" });
    expect(prismaMock.aIRequest.create).toHaveBeenCalledOnce();
    expect(prismaMock.aIToolCall.create).toHaveBeenCalledOnce();
    expect(prismaMock.aIToolCall.create.mock.calls[0][0].data.status).toBe("ERROR");
  });
});
