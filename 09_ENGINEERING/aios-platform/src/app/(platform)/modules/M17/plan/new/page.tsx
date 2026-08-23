import { hasCompletedAuditThisYear } from "@/lib/m17/actions";
import { hasApprovedContextReview } from "@/lib/m25/actions";
import { NewPlanForm } from "./NewPlanForm";

export default async function M17NewPlanPage() {
  const year = new Date().getFullYear();
  const [hasAudit, hasContext] = await Promise.all([hasCompletedAuditThisYear(year), hasApprovedContextReview(year)]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs font-medium text-ink-3">M17 · Lập chương trình xem xét lãnh đạo</p>
        <h1 className="font-head text-2xl font-bold text-ink">Chương trình xem xét lãnh đạo mới</h1>
      </div>
      {!hasAudit && (
        <p className="max-w-lg rounded-lg border border-warn/30 bg-warn-soft px-3 py-2 text-sm text-warn">
          Chưa ghi nhận cuộc đánh giá nội bộ/bên ngoài nào hoàn thành trong năm {year} (M16) —
          chương trình xem xét lãnh đạo nên lập sau khi đã hoàn thành đánh giá trong năm (quy tắc
          1 ETV.P17). Vẫn có thể tiếp tục lập nếu là chương trình đột xuất.
        </p>
      )}
      {!hasContext && (
        <p className="max-w-lg rounded-lg border border-warn/30 bg-warn-soft px-3 py-2 text-sm text-warn">
          Năm {year} chưa có kỳ xem xét bối cảnh nào được phê duyệt (M25) — bối cảnh tổ chức và các
          bên quan tâm là đầu vào hoạch định của cuộc xem xét lãnh đạo, nên hoàn tất trước (quy tắc
          1 DacTa M25). Cảnh báo mềm, vẫn có thể tiếp tục lập chương trình.
        </p>
      )}
      <NewPlanForm />
    </div>
  );
}
