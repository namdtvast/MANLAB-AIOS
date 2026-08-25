import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CORRECTION_STATUS_LABEL, CORRECTION_STATUS_TONE, PUBLISHED_IMPACT_LABEL } from "@/lib/m34/labels";

const TONE_CLASS: Record<string, string> = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  crit: "bg-crit-soft text-crit",
  neutral: "bg-sunk text-ink-2",
};
const th = "border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3";

export default async function M34CorrectionsPage() {
  const corrections = await prisma.m34DataCorrection.findMany({
    orderBy: { createdAt: "desc" },
    include: { dataSet: { select: { id: true, code: true, name: true } }, requestedBy: { select: { name: true } } },
  });
  const awaiting = corrections.filter((c) => c.status === "CHO_KET_LUAN_P10_P11");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M34 · Hiệu chỉnh dữ liệu đã ghi nhận (ETV.P34 §6.3)</p>
        <h1 className="font-head text-2xl font-bold text-ink">Hiệu chỉnh dữ liệu</h1>
        <p className="mt-1 text-sm text-ink-2">
          Dữ liệu gốc bất biến — hiệu chỉnh bằng bản ghi mới, giữ giá trị cũ (R11). Đang chờ kết luận ETV.P10/P11:{" "}
          <strong className={awaiting.length > 0 ? "text-crit" : "text-ink"}>{awaiting.length}</strong> (chặn cứng R12).
        </p>
      </div>
      <Link href="/modules/M34" className="text-xs text-accent hover:underline">
        ← Danh mục dữ liệu số
      </Link>

      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full min-w-[56rem] text-sm">
          <thead>
            <tr>
              <th className={th}>Mã</th>
              <th className={th}>Tập dữ liệu</th>
              <th className={th}>Bản ghi/trường</th>
              <th className={th}>Trước → sau</th>
              <th className={th}>Ảnh hưởng phát hành</th>
              <th className={th}>Người đề nghị</th>
              <th className={th}>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {corrections.map((c) => (
              <tr key={c.id} className="border-b border-border last:border-0 hover:bg-sunk">
                <td className="px-3 py-2 font-mono text-xs text-ink">{c.code}</td>
                <td className="px-3 py-2">
                  <Link href={`/modules/M34/dataset/${c.dataSet.id}`} className="text-accent hover:underline">
                    {c.dataSet.code}
                  </Link>
                </td>
                <td className="px-3 py-2 text-xs text-ink-2">{c.recordPointer}</td>
                <td className="px-3 py-2 text-xs">
                  <span className="rounded bg-crit-soft px-1 font-mono">{c.oldValue}</span> →{" "}
                  <span className="rounded bg-good-soft px-1 font-mono">{c.newValue}</span>
                </td>
                <td className="px-3 py-2 text-xs text-ink-2">
                  {c.publishedImpact ? PUBLISHED_IMPACT_LABEL[c.publishedImpact] : "chưa xem xét"}
                  {c.validityRef && ` · ${c.validityRef}`}
                </td>
                <td className="px-3 py-2 text-xs text-ink-2">{c.requestedBy.name}</td>
                <td className="px-3 py-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[CORRECTION_STATUS_TONE[c.status]]}`}>
                    {CORRECTION_STATUS_LABEL[c.status]}
                  </span>
                </td>
              </tr>
            ))}
            {corrections.length === 0 && (
              <tr>
                <td colSpan={7} className="px-3 py-6 text-center text-sm text-ink-3">
                  Chưa có đề nghị hiệu chỉnh nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
