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

// Ca của Copilot tra cứu KHÔNG chấm được bằng luật z-score. Để lọt xuống evaluateCase() thì mọi
// ca sẽ ra "no_flag", bộ 30 câu hỏi vàng hoá thành 10/30 đúng ngẫu nhiên, và deploymentGate() đọc
// kết quả rác đó để chặn/mở việc kích hoạt PromptVersion. Phải ném lỗi, không được ghi run rác.
describe("runCases — chặn ca của Copilot tra cứu", () => {
  it("ném lỗi thay vì chấm nhầm bằng luật z-score", () => {
    expect(() =>
      runCases([{ id: "c1", expected: "refuse", input: { kind: "copilot-tracuu", ma: "BAY-01", cauHoi: "…" } }])
    ).toThrow(/Copilot tra cứu/);
  });

  it("chỉ rõ lệnh phải chạy thay thế", () => {
    expect(() => runCases([{ id: "c1", expected: "cite", input: { kind: "copilot-tracuu" } }])).toThrow(/danh-gia-copilot/);
  });

  it("một ca Copilot lẫn trong bộ KPI cũng chặn cả bộ, không chấm một nửa", () => {
    expect(() =>
      runCases([
        { id: "c1", expected: "flag_warning", input: { "z-score": 2.4 } },
        { id: "c2", expected: "cite", input: { kind: "copilot-tracuu" } },
      ])
    ).toThrow();
  });

  it("không đụng tới bộ KPI thuần", () => {
    expect(runCases([{ id: "c1", expected: "flag_warning", input: { "z-score": 2.4 } }]).status).toBe("PASS");
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

  // ĐỔI HÀNH VI so với bản port gốc — bản gốc chỉ chặn khi FAIL, nên "chưa chạy lần nào" và
  // "chạy xong chưa ai kết luận" đều lọt. ETV.P29 §5.3.1 đòi có báo cáo ĐÃ PHÊ DUYỆT trước khi
  // vận hành, nên cổng phải fail-closed.
  it("có bộ đánh giá nhưng CHƯA CHẠY lần nào thì CHẶN (ETV.P29 §5.3.1)", async () => {
    prismaMock.aIEvaluationSuite.findMany.mockResolvedValue([{ id: "s1" }]);
    prismaMock.aIEvaluationRun.findFirst.mockResolvedValue(null);
    const r = await deploymentGate("agent-1");
    expect(r).toMatchObject({ ok: false, code: "DEPLOYMENT_BLOCKED_BY_EVALUATION" });
    if (!r.ok) expect(r.message).toContain("CHƯA CHẠY");
  });

  it("chạy xong nhưng CHƯA CÓ NGƯỜI KẾT LUẬN thì CHẶN — phần mềm không tự kết luận (§4.8)", async () => {
    prismaMock.aIEvaluationSuite.findMany.mockResolvedValue([{ id: "s1" }]);
    prismaMock.aIEvaluationRun.findFirst.mockResolvedValue({ id: "run-11", status: "CHO_KET_LUAN", failCount: 0 });
    const r = await deploymentGate("agent-1");
    expect(r).toMatchObject({ ok: false, code: "DEPLOYMENT_BLOCKED_BY_EVALUATION" });
    if (!r.ok) expect(r.message).toContain("F29.03");
  });

  it("agent chưa có bộ đánh giá nào thì không chặn", async () => {
    prismaMock.aIEvaluationSuite.findMany.mockResolvedValue([]);
    expect(await deploymentGate("agent-moi")).toMatchObject({ ok: true });
    expect(prismaMock.aIEvaluationRun.findFirst).not.toHaveBeenCalled();
  });

});
