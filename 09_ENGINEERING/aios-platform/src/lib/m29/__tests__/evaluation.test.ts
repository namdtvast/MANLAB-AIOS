// Đánh giá chất lượng và Cổng triển khai (ETV.P29 mục 5.4). Điểm cốt lõi: khi đánh giá gần nhất
// KHÔNG ĐẠT thì không có đường nào kích hoạt cấu hình mới — không có cơ chế vượt qua thủ công.
import { beforeEach, describe, expect, it, vi } from "vitest";

const prismaMock = {
  aIEvaluationSuite: { findMany: vi.fn() },
  aIEvaluationRun: { findFirst: vi.fn() },
};

vi.mock("@/lib/prisma", () => ({ prisma: prismaMock }));

const { deploymentGate, runCases } = await import("../evaluation");

beforeEach(() => {
  vi.clearAllMocks();
});

describe("runCases — chấm bộ ca kiểm thử", () => {
  it("đạt khi mọi ca khớp kỳ vọng", () => {
    const r = runCases([
      { id: "c1", expected: "flag_warning", input: { "z-score": 2.4 } },
      { id: "c2", expected: "no_flag", input: { "z-score": 0.5 } },
    ]);
    expect(r).toMatchObject({ status: "PASS", passCount: 2, failCount: 0 });
  });

  it("không đạt khi có ca lệch, và chỉ rõ ca nào", () => {
    const r = runCases([
      { id: "c1", expected: "no_flag", input: { "z-score": 2.4 } },
      { id: "c2", expected: "no_flag", input: { "z-score": 0.5 } },
    ]);
    expect(r).toMatchObject({ status: "FAIL", passCount: 1, failCount: 1 });
    expect(r.results.find((x) => x.caseId === "c1")).toMatchObject({ pass: false, actual: "flag_warning" });
  });

  it("ngưỡng gắn cờ là |z| ≥ 2, áp cho cả giá trị âm", () => {
    expect(runCases([{ id: "c", expected: "flag_warning", input: { "z-score": -2.1 } }]).status).toBe("PASS");
    expect(runCases([{ id: "c", expected: "flag_warning", input: { "z-score": 2 } }]).status).toBe("PASS");
    expect(runCases([{ id: "c", expected: "no_flag", input: { "z-score": 1.99 } }]).status).toBe("PASS");
  });

  it("đầu vào thiếu hoặc sai kiểu thì coi như không gắn cờ, không ném lỗi", () => {
    expect(runCases([{ id: "c", expected: "no_flag", input: null }]).status).toBe("PASS");
    expect(runCases([{ id: "c", expected: "no_flag", input: {} }]).status).toBe("PASS");
    expect(runCases([{ id: "c", expected: "no_flag", input: { "z-score": "2.4" } }]).status).toBe("PASS");
  });

  it("bộ rỗng trả trạng thái riêng, không nhập nhèm thành Đạt", () => {
    expect(runCases([])).toMatchObject({ status: "NO_CASES", passCount: 0, failCount: 0 });
  });
});

describe("deploymentGate — Cổng triển khai", () => {
  it("chặn khi lần đánh giá gần nhất KHÔNG ĐẠT", async () => {
    prismaMock.aIEvaluationSuite.findMany.mockResolvedValue([{ id: "s1" }]);
    prismaMock.aIEvaluationRun.findFirst.mockResolvedValue({ id: "run-9", status: "FAIL", failCount: 3 });

    const r = await deploymentGate("agent-1");

    expect(r).toMatchObject({ ok: false, code: "DEPLOYMENT_BLOCKED_BY_EVALUATION" });
    if (!r.ok) expect(r.message).toContain("run-9");
  });

  it("chỉ xét lần chạy GẦN NHẤT — lần cũ hỏng không chặn mãi mãi", async () => {
    prismaMock.aIEvaluationSuite.findMany.mockResolvedValue([{ id: "s1" }]);
    prismaMock.aIEvaluationRun.findFirst.mockResolvedValue({ id: "run-10", status: "PASS", failCount: 0 });

    expect(await deploymentGate("agent-1")).toMatchObject({ ok: true });
    expect(prismaMock.aIEvaluationRun.findFirst).toHaveBeenCalledWith(expect.objectContaining({ orderBy: { createdAt: "desc" } }));
  });

  it("agent chưa có bộ đánh giá nào thì không chặn", async () => {
    prismaMock.aIEvaluationSuite.findMany.mockResolvedValue([]);
    expect(await deploymentGate("agent-moi")).toMatchObject({ ok: true });
    expect(prismaMock.aIEvaluationRun.findFirst).not.toHaveBeenCalled();
  });

  it("có bộ đánh giá nhưng chưa chạy lần nào thì không chặn", async () => {
    prismaMock.aIEvaluationSuite.findMany.mockResolvedValue([{ id: "s1" }]);
    prismaMock.aIEvaluationRun.findFirst.mockResolvedValue(null);
    expect(await deploymentGate("agent-1")).toMatchObject({ ok: true });
  });
});
