// gateway.chat() là ĐƯỜNG DUY NHẤT được phép gọi mô hình ngôn ngữ. Test khóa lại hai bất biến
// đắt nhất nếu vỡ:
//   (1) không có cổng nào bị bỏ qua — thiếu AIA, Agent tạm dừng, guardrail chặn, hết hạn mức,
//       không có căn cứ ⇒ KHÔNG có byte nào rời khỏi hạ tầng của Viện;
//   (2) MỌI lượt hỏi sinh đúng 1 AIRequest, kể cả lượt bị chặn và lượt lỗi (AC-03).
//
// Prisma, adapter và hàm truy hồi đều được giả lập — đây là test logic chốt chặn, không phải
// test Postgres hay Anthropic API.
import { beforeEach, describe, expect, it, vi } from "vitest";

const prismaMock = {
  aIAgent: { findUnique: vi.fn() },
  aIImpactAssessment: { findFirst: vi.fn() },
  aIPromptVersion: { findUnique: vi.fn() },
  aIGuardrail: { findMany: vi.fn() },
  aIRequest: { create: vi.fn(), findMany: vi.fn() },
  aIBudget: { findMany: vi.fn() },
  aITool: { findUnique: vi.fn() },
  aIPlatform: { findUnique: vi.fn() },
  aIToolCall: { create: vi.fn() },
};

const adapterChat = vi.fn();
const retrieve = vi.fn();

vi.mock("@/lib/prisma", () => ({ prisma: prismaMock }));
vi.mock("../adapters", () => ({ getAdapter: () => ({ call: vi.fn(), health: vi.fn(), chat: adapterChat }) }));
vi.mock("../copilot/retrieval", async () => {
  const actual = await vi.importActual<typeof import("../copilot/retrieval")>("../copilot/retrieval");
  return { ...actual, retrieve };
});

const { chat, NO_SOURCE_ANSWER } = await import("../gateway");

const PASSAGE = {
  path: "03_MANAGEMENT_SYSTEM/02_P/ETV.P13_KhacPhuc.md",
  title: "Thủ tục Khắc phục",
  heading: "5.2 Xử lý",
  content: "Nội dung trích đoạn.",
  rank: 0.9,
};
const AGENT = {
  id: "agent-copilot",
  name: "Copilot tra cứu",
  status: "ACTIVE",
  platformId: "plat-anthropic",
  modelId: "model-1",
  activePromptVersionId: "pv-1",
  suspendedReason: null,
  model: { modelId: "claude-opus-5", maxTokens: 4096, temperature: null },
  platform: { id: "plat-anthropic", name: "Anthropic API", adapterType: "AnthropicAdapter", apiBaseUrl: "https://api.anthropic.com" },
};
const USER = { id: "u1" };

function happyPath() {
  prismaMock.aIAgent.findUnique.mockResolvedValue({ ...AGENT });
  prismaMock.aIImpactAssessment.findFirst.mockResolvedValue({ id: "aia-3", status: "APPROVED", code: "AIA-2026-003" });
  prismaMock.aIPromptVersion.findUnique.mockResolvedValue({ id: "pv-1", content: "Bạn là trợ lý tra cứu.", status: "ACTIVE" });
  prismaMock.aIGuardrail.findMany.mockResolvedValue([
    { code: "GR-PII-OUT", description: "", severity: "HIGH", action: "BLOCK" },
    { code: "GR-NO-SOURCE", description: "", severity: "HIGH", action: "BLOCK" },
  ]);
  prismaMock.aIRequest.create.mockResolvedValue({ id: "req-1" });
  prismaMock.aIRequest.findMany.mockResolvedValue([]);
  prismaMock.aIBudget.findMany.mockResolvedValue([]);
  retrieve.mockResolvedValue([PASSAGE]);
  adapterChat.mockResolvedValue({
    text: `Xem thủ tục (${PASSAGE.path}).`,
    inputTokens: 1200,
    outputTokens: 90,
    latencyMs: 800,
    errorCode: null,
  });
}

const ask = (question = "Công việc không phù hợp xử lý thế nào?") => chat({ question, history: [], user: USER });

beforeEach(() => {
  vi.clearAllMocks();
  delete process.env.COPILOT_MONTHLY_BUDGET_USD;
  happyPath();
});

describe("Đường đi thành công", () => {
  it("trả lời kèm trích dẫn và ghi trace với token thật của nhà cung cấp", async () => {
    const r = await ask();

    expect(r).toMatchObject({ ok: true, code: null, requestId: "req-1" });
    expect(r.citations).toEqual([{ path: PASSAGE.path, title: PASSAGE.title, heading: PASSAGE.heading }]);
    expect(prismaMock.aIRequest.create).toHaveBeenCalledTimes(1);
    expect(prismaMock.aIRequest.create.mock.calls[0][0].data).toMatchObject({
      agentId: AGENT.id,
      userRef: USER.id,
      inputTokens: 1200,
      outputTokens: 90,
      latencyMs: 800,
      guardrailResult: "PASS",
      promptVersionId: "pv-1",
    });
  });

  // ETV.P29 mục 5.3.1 đòi đánh giá TRƯỚC khi kích hoạt; không có đường này thì trình chạy đánh giá
  // buộc phải sửa activePromptVersionId trong CSDL để đo. Bản đo phải đi vào prompt hệ thống VÀ
  // vào trace — hồ sơ đánh giá chỉ có giá trị khi chỉ đúng cấu hình đã sinh ra câu trả lời.
  it("đo được một phiên bản lời nhắc chưa kích hoạt, và trace ghi đúng bản đã dùng", async () => {
    prismaMock.aIPromptVersion.findUnique.mockResolvedValue({ id: "pv-2", content: "Bản lời nhắc đang thử.", status: "APPROVED" });

    const r = await chat({ question: "Hỏi thử", history: [], user: USER, promptVersionId: "pv-2" });

    expect(r.ok).toBe(true);
    expect(prismaMock.aIPromptVersion.findUnique).toHaveBeenCalledWith({ where: { id: "pv-2" } });
    expect(adapterChat.mock.calls[0][1].system).toContain("Bản lời nhắc đang thử.");
    expect(prismaMock.aIRequest.create.mock.calls[0][0].data.promptVersionId).toBe("pv-2");
  });

  it("prompt hệ thống lấy từ AIPromptVersion, không viết cứng trong mã", async () => {
    await ask();
    const sent = adapterChat.mock.calls[0][1];
    expect(sent.system).toContain("Bạn là trợ lý tra cứu.");
    expect(sent.system).toContain(PASSAGE.path);
    expect(sent.modelId).toBe("claude-opus-5");
    // Các model Claude hiện hành trả 400 nếu nhận temperature — không được gửi.
    expect(sent).not.toHaveProperty("temperature");
  });
});

describe("Không cổng nào được bỏ qua — không byte nào rời khỏi Viện", () => {
  it("chưa khai Agent trong danh mục M29", async () => {
    prismaMock.aIAgent.findUnique.mockResolvedValue(null);
    const r = await ask();
    expect(r).toMatchObject({ ok: false, code: "AGENT_NOT_CONFIGURED" });
    expect(adapterChat).not.toHaveBeenCalled();
  });

  it("Agent bị tạm dừng (ETV.P29 5.7.3)", async () => {
    prismaMock.aIAgent.findUnique.mockResolvedValue({ ...AGENT, status: "SUSPENDED", suspendedReason: "INCIDENT:SCAI-2026-0001" });
    const r = await ask();
    expect(r).toMatchObject({ ok: false, code: "AGENT_NOT_ACTIVE" });
    expect(r.answer).toContain("SCAI-2026-0001");
    expect(adapterChat).not.toHaveBeenCalled();
  });

  it("AIA chưa được phê duyệt (AIA Gate — ISO/IEC 42001)", async () => {
    prismaMock.aIImpactAssessment.findFirst.mockResolvedValue({ id: "aia-3", status: "DRAFT" });
    const r = await ask();
    expect(r).toMatchObject({ ok: false, code: "AIA_NOT_APPROVED" });
    expect(adapterChat).not.toHaveBeenCalled();
  });

  it("chưa có hồ sơ AIA nào", async () => {
    prismaMock.aIImpactAssessment.findFirst.mockResolvedValue(null);
    expect(await ask()).toMatchObject({ ok: false, code: "AIA_NOT_APPROVED" });
    expect(adapterChat).not.toHaveBeenCalled();
  });

  it("prompt hệ thống chưa được phê duyệt", async () => {
    prismaMock.aIPromptVersion.findUnique.mockResolvedValue({ id: "pv-1", content: "…", status: "DRAFT" });
    expect(await ask()).toMatchObject({ ok: false, code: "PROMPT_NOT_APPROVED" });
    expect(adapterChat).not.toHaveBeenCalled();
  });

  // Cờ đo một phiên bản lời nhắc chưa kích hoạt KHÔNG được trở thành lối vòng qua vòng đời phê
  // duyệt: bản Nháp vẫn phải bị chặn y như khi nó đang là bản hiệu lực.
  it("bản lời nhắc chỉ định để đo vẫn phải đã phê duyệt", async () => {
    prismaMock.aIPromptVersion.findUnique.mockResolvedValue({ id: "pv-2", content: "Bản nháp.", status: "DRAFT" });
    const r = await chat({ question: "Hỏi thử", history: [], user: USER, promptVersionId: "pv-2" });
    expect(r).toMatchObject({ ok: false, code: "PROMPT_NOT_APPROVED" });
    expect(adapterChat).not.toHaveBeenCalled();
  });

  it("guardrail đầu vào chặn TRƯỚC khi gọi API, không phải sau", async () => {
    const r = await chat({ question: "Tra hồ sơ của CCCD 001199012345", history: [], user: USER });
    expect(r).toMatchObject({ ok: false, code: "GUARDRAIL_BLOCKED" });
    expect(adapterChat).not.toHaveBeenCalled();
    expect(prismaMock.aIRequest.create.mock.calls[0][0].data.guardrailResult).toBe("BLOCK:GR-PII-OUT");
  });

  it("vượt hạn mức chi phí tháng", async () => {
    process.env.COPILOT_MONTHLY_BUDGET_USD = "1";
    prismaMock.aIRequest.findMany.mockResolvedValue([
      { inputTokens: 1_000_000, outputTokens: 0, model: { costPer1kTokens: 0.0075 } },
    ]);
    const r = await ask();
    expect(r).toMatchObject({ ok: false, code: "QUOTA_EXCEEDED" });
    expect(adapterChat).not.toHaveBeenCalled();
  });

  it("không tìm được căn cứ ⇒ từ chối, KHÔNG gọi API", async () => {
    retrieve.mockResolvedValue([]);
    const r = await ask();
    expect(r).toMatchObject({ ok: false, code: "NO_SOURCE", answer: NO_SOURCE_ANSWER });
    expect(adapterChat).not.toHaveBeenCalled();
    expect(prismaMock.aIRequest.create.mock.calls[0][0].data.guardrailResult).toBe("BLOCK:GR-NO-SOURCE");
  });

  it("câu trả lời không dẫn nguồn nào ⇒ thay bằng câu từ chối", async () => {
    adapterChat.mockResolvedValue({ text: "Theo tôi thì nên làm thế này.", inputTokens: 10, outputTokens: 5, latencyMs: 100, errorCode: null });
    const r = await ask();
    expect(r).toMatchObject({ ok: false, code: "GUARDRAIL_BLOCKED", answer: NO_SOURCE_ANSWER });
    expect(r.citations).toEqual([]);
  });
});

describe("Mọi lượt hỏi đều vào sổ (AC-03)", () => {
  const cases: [string, () => void][] = [
    ["Agent chưa khai", () => prismaMock.aIAgent.findUnique.mockResolvedValue(null)],
    ["Agent tạm dừng", () => prismaMock.aIAgent.findUnique.mockResolvedValue({ ...AGENT, status: "DISABLED" })],
    ["AIA chưa duyệt", () => prismaMock.aIImpactAssessment.findFirst.mockResolvedValue(null)],
    ["không có căn cứ", () => retrieve.mockResolvedValue([])],
    [
      "lỗi mạng khi gọi nhà cung cấp",
      () => adapterChat.mockResolvedValue({ text: "", inputTokens: 0, outputTokens: 0, latencyMs: 30000, errorCode: "TIMEOUT" }),
    ],
    [
      "thiếu khóa API",
      () => adapterChat.mockResolvedValue({ text: "", inputTokens: 0, outputTokens: 0, latencyMs: 0, errorCode: "NO_API_KEY" }),
    ],
  ];

  for (const [name, arrange] of cases) {
    it(`${name} vẫn sinh đúng 1 AIRequest`, async () => {
      arrange();
      const r = await ask();
      expect(r.requestId).toBe("req-1");
      expect(prismaMock.aIRequest.create).toHaveBeenCalledTimes(1);
    });
  }

  it("lượt lỗi ghi mã lỗi vào trace thay vì ghi PASS", async () => {
    adapterChat.mockResolvedValue({ text: "", inputTokens: 0, outputTokens: 0, latencyMs: 30000, errorCode: "TIMEOUT" });
    await ask();
    expect(prismaMock.aIRequest.create.mock.calls[0][0].data.guardrailResult).toBe("ERROR:TIMEOUT");
  });

  it("thiếu khóa API thì báo đúng nguyên nhân, không báo lỗi chung chung", async () => {
    adapterChat.mockResolvedValue({ text: "", inputTokens: 0, outputTokens: 0, latencyMs: 0, errorCode: "NO_API_KEY" });
    // Thông báo nêu TÊN NỀN TẢNG chứ không phải tên biến môi trường: mỗi nền tảng mô hình dùng một
    // biến khác nhau, ghi cứng một tên sẽ chỉ sai chỗ khi Agent chạy trên nền tảng khác.
    const answer = (await ask()).answer;
    expect(answer).toContain("khóa API");
    expect(answer).toContain("Anthropic API");
  });
});

// Hạn mức chi phí (AIBudget) là chốt duy nhất ngăn tiền chảy ra ngoài dự toán. Trước khi tiếp
// quản, phần này KHÔNG có ca test nào — trong khi nó quyết định có gọi nhà cung cấp hay không.
// Chốt hỏng theo hướng fail-open thì không ai thấy cho tới lúc nhận hóa đơn.
describe("Hạn mức chi phí tháng (AIBudget)", () => {
  const hanMuc = (p: Partial<{ code: string; agentId: string | null; monthlyLimit: number }> = {}) => ({
    code: p.code ?? "NS-M29-2026",
    agentId: p.agentId === undefined ? null : p.agentId,
    monthlyLimit: p.monthlyLimit ?? 10,
  });
  /** Một lượt đã tiêu `cost` USD, ghi bằng snapshot. */
  const daTieu = (cost: number) => [{ inputTokens: 0, outputTokens: 0, estimatedCost: cost, inputUnitCostPerMillion: 0, outputUnitCostPerMillion: 0, model: null }];

  it("hạn mức toàn cục bị vượt ⇒ chặn, KHÔNG gọi nhà cung cấp, vẫn ghi trace", async () => {
    prismaMock.aIBudget.findMany.mockResolvedValue([hanMuc({ monthlyLimit: 10 })]);
    prismaMock.aIRequest.findMany.mockResolvedValue(daTieu(12));

    const r = await ask();

    expect(r).toMatchObject({ ok: false, code: "QUOTA_EXCEEDED" });
    expect(r.answer).toContain("NS-M29-2026");
    expect(adapterChat).not.toHaveBeenCalled();
    expect(prismaMock.aIRequest.create).toHaveBeenCalledTimes(1);
  });

  it("chưa chạm hạn mức ⇒ cho qua", async () => {
    prismaMock.aIBudget.findMany.mockResolvedValue([hanMuc({ monthlyLimit: 10 })]);
    prismaMock.aIRequest.findMany.mockResolvedValue(daTieu(9.99));
    expect(await ask()).toMatchObject({ ok: true });
  });

  // Ranh giới hay bị viết nhầm thành ">": tiêu đúng bằng hạn mức là ĐÃ hết hạn mức.
  it("chi tiêu BẰNG ĐÚNG hạn mức ⇒ chặn", async () => {
    prismaMock.aIBudget.findMany.mockResolvedValue([hanMuc({ monthlyLimit: 10 })]);
    prismaMock.aIRequest.findMany.mockResolvedValue(daTieu(10));
    expect(await ask()).toMatchObject({ ok: false, code: "QUOTA_EXCEEDED" });
  });

  it("chỉ xét hạn mức ĐANG hiệu lực và có bật chặn — không để hạn mức 'chỉ cảnh báo' hay đã hết hiệu lực lọt vào", async () => {
    await ask();
    const dieuKien = prismaMock.aIBudget.findMany.mock.calls[0][0].where;
    expect(dieuKien).toMatchObject({ status: "ACTIVE", blockAtLimit: true });
    expect(dieuKien.effectiveFrom).toHaveProperty("lte");
    // effectiveTo: hoặc chưa đặt, hoặc còn ở tương lai.
    expect(JSON.stringify(dieuKien.OR)).toContain("effectiveTo");
  });

  it("chỉ xét hạn mức thuộc phạm vi: toàn cục hoặc đúng Agent này", async () => {
    await ask();
    const dieuKien = prismaMock.aIBudget.findMany.mock.calls[0][0].where;
    expect(JSON.stringify(dieuKien.AND)).toContain("agent-copilot");
    expect(JSON.stringify(dieuKien.AND)).toContain("null");
  });

  it("nhiều hạn mức cùng áp ⇒ nêu đúng mã hạn mức bị vượt", async () => {
    prismaMock.aIBudget.findMany.mockResolvedValue([
      hanMuc({ code: "NS-TOAN-VIEN", monthlyLimit: 1000 }),
      hanMuc({ code: "NS-COPILOT", agentId: "agent-copilot", monthlyLimit: 5 }),
    ]);
    prismaMock.aIRequest.findMany.mockResolvedValue(daTieu(6));
    const r = await ask();
    expect(r).toMatchObject({ ok: false, code: "QUOTA_EXCEEDED" });
    expect(r.answer).toContain("NS-COPILOT");
  });

  // Chi phí lịch sử phải đọc từ SNAPSHOT lúc gọi, không tính lại bằng bảng giá hôm nay — đổi giá
  // nhà cung cấp không được làm chi tiêu quá khứ tự co giãn.
  it("tính chi tiêu theo snapshot đã ghi, không tính lại theo bảng giá hiện tại", async () => {
    prismaMock.aIBudget.findMany.mockResolvedValue([hanMuc({ monthlyLimit: 10 })]);
    prismaMock.aIRequest.findMany.mockResolvedValue([
      {
        inputTokens: 1_000_000,
        outputTokens: 1_000_000,
        estimatedCost: 11, // snapshot: đã vượt
        inputUnitCostPerMillion: 5,
        outputUnitCostPerMillion: 6,
        model: { costPer1kTokens: 0, inputCostPerMillionTokens: 0, outputCostPerMillionTokens: 0, currency: "USD" },
      },
    ]);
    // Nếu tính lại theo bảng giá model hiện tại (0/0) thì ra 0 và sẽ KHÔNG chặn.
    expect(await ask()).toMatchObject({ ok: false, code: "QUOTA_EXCEEDED" });
  });

  it("không có hạn mức nào và không đặt biến môi trường ⇒ không chặn theo chi phí", async () => {
    prismaMock.aIBudget.findMany.mockResolvedValue([]);
    prismaMock.aIRequest.findMany.mockResolvedValue(daTieu(1_000_000));
    expect(await ask()).toMatchObject({ ok: true });
  });
});
