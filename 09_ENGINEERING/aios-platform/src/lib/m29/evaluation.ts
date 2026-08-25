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

// Deployment Gate — ETV.P29 §5.3.1 và §5.3.2.
//
// ĐỔI HÀNH VI so với bản port gốc: gốc chỉ chặn khi lần chạy gần nhất FAIL, tức là "chưa chạy lần
// nào" và "chạy xong nhưng chưa ai kết luận" đều LỌT. Thủ tục đã ban hành nói ngược lại — §5.3.1:
// hệ thống AI mức Trung bình/Cao "phải có báo cáo đánh giá chất lượng ĐÃ PHÊ DUYỆT trước khi đưa
// vào vận hành". Nên cổng này fail-closed: chỉ mở khi lần chạy gần nhất có kết luận ĐẠT.
//
// Agent chưa có bộ đánh giá nào thì không chặn — chưa tới ngưỡng bắt buộc của §5.3.1, và chặn ở
// đây sẽ khoá cả những tác tử mức Thấp vốn không cần phiếu F29.03.
export async function deploymentGate(agentId: string): Promise<{ ok: true } | { ok: false; code: string; message: string }> {
  const suites = await prisma.aIEvaluationSuite.findMany({ where: { agentId }, select: { id: true } });
  const suiteIds = suites.map((s) => s.id);
  if (suiteIds.length === 0) return { ok: true };

  const run = await prisma.aIEvaluationRun.findFirst({ where: { suiteId: { in: suiteIds } }, orderBy: { createdAt: "desc" } });
  const chan = (message: string) => ({ ok: false as const, code: "DEPLOYMENT_BLOCKED_BY_EVALUATION", message });

  if (!run) return chan("Tác tử đã có bộ đánh giá nhưng CHƯA CHẠY lần nào — ETV.P29 mục 5.3.1 yêu cầu có báo cáo đánh giá chất lượng đã phê duyệt trước khi vận hành.");
  if (run.status === "FAIL")
    return chan(`Đánh giá gần nhất (${run.id}) KHÔNG ĐẠT (${run.failCount} tình huống lỗi) — không thể kích hoạt cấu hình mới cho tới khi có lần đánh giá Đạt.`);
  if (run.status !== "PASS")
    return chan(
      `Đánh giá gần nhất (${run.id}) ở trạng thái ${run.status} — phần mềm đã đo xong nhưng CHƯA CÓ NGƯỜI KẾT LUẬN trên phiếu ETV.P.F29.03. Kết luận Đạt/Không đạt do người ký, không do phần mềm (ETV.P29 mục 4.8).`
    );
  return { ok: true };
}
