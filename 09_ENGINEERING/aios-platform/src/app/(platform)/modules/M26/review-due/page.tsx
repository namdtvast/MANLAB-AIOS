import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getViewer } from "@/lib/m26/actor";
import { isDueForReview, overdueCycles, reviewDueDate, visibleConfidentiality } from "@/lib/m26/rules";
import { CONFIDENTIALITY_LABEL, CRITICALITY_LABEL, REVIEW_CYCLE_LABEL } from "@/lib/m26/labels";
import { Badge, fmtDate, th } from "../_ui";

// Cờ "đến hạn rà soát" là thuộc tính TÍNH KHI ĐỌC — không lưu cột trạng thái (quy tắc 4 DacTa M26).
export default async function ReviewDuePage() {
  const viewer = await getViewer();
  const allowed = visibleConfidentiality(viewer.role);

  const approved = await prisma.m26KnowledgeItem.findMany({
    where: {
      status: "APPROVED",
      OR: [{ confidentiality: { in: allowed } }, ...(viewer.id ? [{ ownerId: viewer.id }] : [])],
    },
    include: { owner: true },
    orderBy: { code: "asc" },
  });

  const due = approved
    .map((i) => ({ item: i, from: i.lastReviewedAt ?? i.approvedAt }))
    .filter((r) => isDueForReview(r.item.reviewCycle, r.from))
    .map((r) => ({ ...r, cycles: overdueCycles(r.item.reviewCycle, r.from) }))
    .sort((a, b) => b.cycles - a.cycles);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href="/modules/M26" className="text-xs text-accent hover:underline">
          ← Danh mục tri thức
        </Link>
        <h1 className="mt-1 font-head text-2xl font-bold text-ink">Mục đến hạn rà soát</h1>
        <p className="mt-1 text-sm text-ink-2">
          Tính theo lần rà soát gần nhất + chu kỳ (ETV.P26 mục 5.1.5). Quá <strong>2 chu kỳ</strong> liên tiếp sẽ được nêu trong báo cáo gửi
          Lãnh đạo Viện. Hệ thống không tự chuyển mục sang Hết hiệu lực — quyết định lỗi thời là của con người.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full min-w-[52rem] text-sm">
          <thead>
            <tr>
              <th className={th}>Mã</th>
              <th className={th}>Tên mục tri thức</th>
              <th className={th}>Chủ sở hữu</th>
              <th className={th}>Trọng yếu</th>
              <th className={th}>Bảo mật</th>
              <th className={th}>Chu kỳ</th>
              <th className={th}>Hạn rà soát</th>
              <th className={th}>Quá hạn</th>
            </tr>
          </thead>
          <tbody>
            {due.map(({ item, from, cycles }) => (
              <tr key={item.id} className="border-b border-border last:border-0 hover:bg-sunk">
                <td className="px-3 py-2">
                  <Link href={`/modules/M26/item/${item.id}`} className="font-mono text-xs font-medium text-accent hover:underline">
                    {item.code}
                  </Link>
                </td>
                <td className="px-3 py-2 text-ink">{item.title}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{item.owner.name}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{CRITICALITY_LABEL[item.criticality]}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{CONFIDENTIALITY_LABEL[item.confidentiality]}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{REVIEW_CYCLE_LABEL[item.reviewCycle]}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{fmtDate(reviewDueDate(item.reviewCycle, from))}</td>
                <td className="px-3 py-2">
                  <Badge label={cycles >= 2 ? `${cycles} chu kỳ — báo LĐV` : `${cycles} chu kỳ`} tone={cycles >= 2 ? "crit" : "warn"} />
                </td>
              </tr>
            ))}
            {due.length === 0 && (
              <tr>
                <td colSpan={8} className="px-3 py-6 text-center text-sm text-ink-3">
                  Không có mục tri thức nào quá hạn rà soát.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
