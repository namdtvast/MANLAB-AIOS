// M29 — thực thi Evaluation Case + Deployment Gate. Port 1:1 từ 08_Source/api/evaluation.mjs
// (runCases) và phần deploymentGate() trong 08_Source/api/server.js.
import { prisma } from "@/lib/prisma";

// Quy tắc đánh giá khớp đúng nội dung Prompt hiệu lực của "Trợ lý AI (M29)" đã seed:
// "chỉ gắn cờ cảnh báo khi z-score |>=2|" — Phase 1 chỉ có 1 rule này (xem spec.md Quyết định
// phạm vi #4 — không xây UI biên tập rule phức tạp hơn).
function evaluateCase(input: unknown): string {
  const z = (input as { "z-score"?: unknown } | null)?.["z-score"];
  return typeof z === "number" && Math.abs(z) >= 2 ? "flag_warning" : "no_flag";
}

/**
 * Ca của Copilot tra cứu KHÔNG chấm được bằng hàm này: "đúng" của nó là *có dẫn đúng nguồn hay
 * không*, mà muốn biết thì phải gọi mô hình thật. Nếu để lọt xuống evaluateCase() bên dưới, mọi ca
 * Copilot sẽ bị chấm bằng luật z-score và cho ra kết quả vô nghĩa — nguy hiểm hơn cả sai, vì
 * deploymentGate() đọc kết quả đó để chặn/mở việc kích hoạt PromptVersion mới.
 * Ném lỗi thay vì ghi một AIEvaluationRun rác.
 */
function laCaCopilot(input: unknown): boolean {
  return (input as { kind?: unknown } | null)?.kind === "copilot-tracuu";
}

export function runCases(cases: { id: string; expected: string; input: unknown }[]) {
  const caCopilot = cases.filter((c) => laCaCopilot(c.input));
  if (caCopilot.length)
    throw new Error(
      `Bộ này có ${caCopilot.length} ca của Copilot tra cứu — không chấm được bằng trình chấm đồng bộ ` +
        `(phải gọi mô hình thật để biết câu trả lời dẫn nguồn nào). Chạy: npm run danh-gia-copilot`
    );

  const results = cases.map((c) => {
    const actual = evaluateCase(c.input);
    return { caseId: c.id, expected: c.expected, actual, pass: actual === c.expected };
  });
  const passCount = results.filter((r) => r.pass).length;
  const failCount = results.length - passCount;
  return { results, passCount, failCount, status: results.length === 0 ? "NO_CASES" : failCount === 0 ? "PASS" : "FAIL" };
}

// Deployment Gate — không cho kích hoạt PromptVersion mới nếu AIEvaluationRun gần nhất của
// Agent đó có status=FAIL. Chặn tự động, không có cơ chế override thủ công (đúng bản gốc).
export async function deploymentGate(agentId: string): Promise<{ ok: true } | { ok: false; code: string; message: string }> {
  const suites = await prisma.aIEvaluationSuite.findMany({ where: { agentId }, select: { id: true } });
  const suiteIds = suites.map((s) => s.id);
  if (suiteIds.length === 0) return { ok: true };
  const run = await prisma.aIEvaluationRun.findFirst({ where: { suiteId: { in: suiteIds } }, orderBy: { createdAt: "desc" } });
  if (run && run.status === "FAIL")
    return {
      ok: false,
      code: "DEPLOYMENT_BLOCKED_BY_EVALUATION",
      message: `Evaluation gần nhất (${run.id}) KHÔNG ĐẠT (${run.failCount} case lỗi) — không thể kích hoạt cấu hình mới cho tới khi Evaluation PASS.`,
    };
  return { ok: true };
}
