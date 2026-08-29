import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { KICH_THUOC_TRANG, PhanTrang, boQua, chotTrang } from "@/components/PhanTrang";
import { AI_APPROVAL_STATUS_LABEL, AI_APPROVAL_STATUS_TONE, AI_PURPOSE_LABEL, CLASSIFICATION_LABEL } from "@/lib/m34/labels";

const TONE_CLASS: Record<string, string> = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  crit: "bg-crit-soft text-crit",
  neutral: "bg-sunk text-ink-2",
};
const th = "border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3";

export default async function M34AIDataPage({ searchParams }: { searchParams: Promise<{ trang?: string }> }) {
  const { trang: trangRaw } = await searchParams;
  const [tong, active] = await Promise.all([
    prisma.m34AIDataApproval.count(),
    prisma.m34AIDataApproval.count({ where: { status: "DA_PHE_DUYET" } }),
  ]);
  const trang = chotTrang(trangRaw, tong);
  const approvals = await prisma.m34AIDataApproval.findMany({
    orderBy: { createdAt: "desc" },
    include: { dataSet: { select: { id: true, code: true, name: true, classification: true } }, approvedBy: { select: { name: true } } },
    skip: boQua(trang),
    take: KICH_THUOC_TRANG,
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M34 · Dữ liệu dùng cho hệ thống trí tuệ nhân tạo (ETV.P34 §6.8)</p>
        <h1 className="font-head text-2xl font-bold text-ink">Dữ liệu cấp cho hệ thống AI</h1>
        <p className="mt-1 text-sm text-ink-2">
          {active} tập đang được phép cấp cho hệ thống AI. Bốn điều kiện bắt buộc: bản ghi danh mục · phê duyệt LĐV có ý kiến
          PT.ATTT · hồ sơ AIA theo ETV.P29 · biện pháp giảm thiểu. <strong>Hạn chế/Mật: cấm tuyệt đối</strong> (R22 — ETV.P28 §5.13).
        </p>
      </div>
      <Link href="/modules/M34" className="text-xs text-accent hover:underline">
        ← Danh mục dữ liệu số
      </Link>

      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full min-w-[52rem] text-sm">
          <thead>
            <tr>
              <th className={th}>Mã</th>
              <th className={th}>Tập dữ liệu</th>
              <th className={th}>Phân loại</th>
              <th className={th}>Mục đích</th>
              <th className={th}>Hệ thống AI</th>
              <th className={th}>AIA (M29)</th>
              <th className={th}>LĐV</th>
              <th className={th}>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {approvals.map((a) => (
              <tr key={a.id} className="border-b border-border last:border-0 hover:bg-sunk">
                <td className="px-3 py-2 font-mono text-xs text-ink">{a.code}</td>
                <td className="px-3 py-2">
                  <Link href={`/modules/M34/dataset/${a.dataSet.id}`} className="text-accent hover:underline">
                    {a.dataSet.code} — {a.dataSet.name}
                  </Link>
                </td>
                <td className="px-3 py-2 text-xs text-ink-2">{CLASSIFICATION_LABEL[a.dataSet.classification]}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{AI_PURPOSE_LABEL[a.aiPurpose]}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{a.aiSystemRef ?? "—"}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{a.aiaRef}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{a.approvedBy?.name ?? "—"}</td>
                <td className="px-3 py-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[AI_APPROVAL_STATUS_TONE[a.status]]}`}>
                    {AI_APPROVAL_STATUS_LABEL[a.status]}
                  </span>
                </td>
              </tr>
            ))}
            {approvals.length === 0 && (
              <tr>
                <td colSpan={8} className="px-3 py-6 text-center text-sm text-ink-3">
                  Chưa có tập dữ liệu nào được đề nghị dùng cho hệ thống AI.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <PhanTrang path="/modules/M34/ai-data" trang={trang} tong={tong} donVi="đề nghị" />
      </div>
    </div>
  );
}
