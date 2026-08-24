// Vòng quét AIA quá hạn (ETV.P29 mục 5.2.3). Ba tính chất phải giữ:
//   1. Quá hạn thì AIA chuyển Cần rà soát lại VÀ tác tử bị tạm dừng.
//   2. Nhật ký ghi actor = SYSTEM, không mượn danh nghĩa một người thật.
//   3. Idempotent — chạy lại không sinh nhật ký trùng, không đè lý do tạm dừng đã có.
import { beforeEach, describe, expect, it, vi } from "vitest";

const prismaMock = {
  aIImpactAssessment: { findMany: vi.fn(), update: vi.fn() },
  aIAgent: { update: vi.fn() },
  aIAuditLog: { create: vi.fn() },
};

vi.mock("@/lib/prisma", () => ({ prisma: prismaMock }));

const { sweepAiaReview, SUSPEND_REASON_AIA } = await import("../sweep");

const NOW = new Date("2026-08-24T00:00:00.000Z");
const QUA_HAN = new Date("2026-08-14T00:00:00.000Z");

const aiaQuaHan = (over: Record<string, unknown> = {}) => ({
  id: "aia-1",
  code: "AIA-2026-002",
  reviewDate: QUA_HAN,
  status: "APPROVED",
  agent: { id: "agent-1", status: "ACTIVE", suspendedReason: null },
  ...over,
});

beforeEach(() => {
  vi.clearAllMocks();
  prismaMock.aIImpactAssessment.findMany.mockResolvedValue([]);
});

describe("sweepAiaReview — phát hiện quá hạn", () => {
  it("chỉ quét hồ sơ Đã phê duyệt và đã quá mốc rà soát", async () => {
    await sweepAiaReview(NOW);
    expect(prismaMock.aIImpactAssessment.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { status: "APPROVED", reviewDate: { lt: NOW } } })
    );
  });

  it("chuyển AIA sang Cần rà soát lại và tạm dừng tác tử tương ứng", async () => {
    prismaMock.aIImpactAssessment.findMany.mockResolvedValue([aiaQuaHan()]);

    const r = await sweepAiaReview(NOW);

    expect(r).toMatchObject({ aiaFlagged: 1, agentsSuspended: 1, ranAt: NOW });
    expect(prismaMock.aIImpactAssessment.update).toHaveBeenCalledWith({ where: { id: "aia-1" }, data: { status: "REVIEW_REQUIRED" } });
    expect(prismaMock.aIAgent.update).toHaveBeenCalledWith({
      where: { id: "agent-1" },
      data: { status: "SUSPENDED", suspendedReason: SUSPEND_REASON_AIA, suspendedAt: NOW },
    });
  });

  it("nhật ký ghi actor SYSTEM, không gắn vào một người dùng nào", async () => {
    prismaMock.aIImpactAssessment.findMany.mockResolvedValue([aiaQuaHan()]);

    await sweepAiaReview(NOW);

    expect(prismaMock.aIAuditLog.create).toHaveBeenCalledTimes(2); // 1 cho AIA, 1 cho Agent
    for (const call of prismaMock.aIAuditLog.create.mock.calls) {
      expect(call[0].data).toMatchObject({ actorId: null, actorLabel: "SYSTEM", role: "SYSTEM" });
    }
    const lyDoAia = prismaMock.aIAuditLog.create.mock.calls.find((c) => c[0].data.entityType === "aia")![0].data.reason as string;
    expect(lyDoAia).toContain(QUA_HAN.toISOString()); // nêu rõ mốc quá hạn để truy vết được
  });

  it("nhiều hồ sơ quá hạn thì xử lý hết, đếm đúng số lượng", async () => {
    prismaMock.aIImpactAssessment.findMany.mockResolvedValue([
      aiaQuaHan(),
      aiaQuaHan({ id: "aia-2", code: "AIA-2026-003", agent: { id: "agent-2", status: "ACTIVE", suspendedReason: null } }),
    ]);

    const r = await sweepAiaReview(NOW);

    expect(r).toMatchObject({ aiaFlagged: 2, agentsSuspended: 2 });
    expect(prismaMock.aIAgent.update).toHaveBeenCalledTimes(2);
  });
});

describe("sweepAiaReview — không giẫm lên trạng thái đang có", () => {
  it("không đè lý do tạm dừng của tác tử đang bị khống chế vì sự cố", async () => {
    prismaMock.aIImpactAssessment.findMany.mockResolvedValue([
      aiaQuaHan({ agent: { id: "agent-1", status: "SUSPENDED", suspendedReason: "INCIDENT:SCAI-2026-0001" } }),
    ]);

    const r = await sweepAiaReview(NOW);

    // AIA vẫn phải gắn cờ, nhưng tác tử giữ nguyên lý do khống chế sự cố.
    expect(r).toMatchObject({ aiaFlagged: 1, agentsSuspended: 0 });
    expect(prismaMock.aIImpactAssessment.update).toHaveBeenCalledOnce();
    expect(prismaMock.aIAgent.update).not.toHaveBeenCalled();
  });

  it("hồ sơ không gắn tác tử nào thì vẫn gắn cờ được, không lỗi", async () => {
    prismaMock.aIImpactAssessment.findMany.mockResolvedValue([aiaQuaHan({ agent: null })]);

    const r = await sweepAiaReview(NOW);

    expect(r).toMatchObject({ aiaFlagged: 1, agentsSuspended: 0 });
    expect(prismaMock.aIAgent.update).not.toHaveBeenCalled();
  });

  it("idempotent — lượt quét sau không còn gì để làm, không sinh nhật ký trùng", async () => {
    // Lượt 1 có việc; lượt 2 truy vấn không trả bản ghi nào vì AIA đã sang REVIEW_REQUIRED.
    prismaMock.aIImpactAssessment.findMany.mockResolvedValueOnce([aiaQuaHan()]).mockResolvedValueOnce([]);

    const lan1 = await sweepAiaReview(NOW);
    const soLogSauLan1 = prismaMock.aIAuditLog.create.mock.calls.length;
    const lan2 = await sweepAiaReview(NOW);

    expect(lan1.aiaFlagged).toBe(1);
    expect(lan2).toMatchObject({ aiaFlagged: 0, agentsSuspended: 0 });
    expect(prismaMock.aIAuditLog.create.mock.calls.length).toBe(soLogSauLan1);
  });

  it("không có hồ sơ nào quá hạn thì không ghi gì cả", async () => {
    const r = await sweepAiaReview(NOW);
    expect(r).toMatchObject({ aiaFlagged: 0, agentsSuspended: 0 });
    expect(prismaMock.aIAuditLog.create).not.toHaveBeenCalled();
    expect(prismaMock.aIImpactAssessment.update).not.toHaveBeenCalled();
  });
});
