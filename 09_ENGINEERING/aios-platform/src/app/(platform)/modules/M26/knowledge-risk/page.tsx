import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getViewer } from "@/lib/m26/actor";
import { TRANSFER_METHODS, visibleConfidentiality } from "@/lib/m26/rules";
import { CONFIDENTIALITY_LABEL, ITEM_STATUS_LABEL, ITEM_STATUS_TONE } from "@/lib/m26/labels";
import { Badge, th } from "../_ui";

// Bảng rủi ro mất tri thức: mục trọng yếu CAO, dạng tri thức ẩn, số người giữ ≤ 1 —
// đầu vào của M01 và điều kiện chặn phê duyệt (ETV.P26 mục 5.1.6).
export default async function KnowledgeRiskPage() {
  const viewer = await getViewer();
  const allowed = visibleConfidentiality(viewer.role);

  const items = await prisma.m26KnowledgeItem.findMany({
    where: {
      knowledgeForm: "TRI_THUC_AN",
      criticality: "CAO",
      status: { notIn: ["CANCELLED", "RETIRED"] },
      OR: [{ confidentiality: { in: allowed } }, ...(viewer.id ? [{ ownerId: viewer.id }] : [])],
    },
    include: {
      owner: true,
      holders: { include: { user: true } },
      riskLinks: { include: { risk: { select: { code: true } } } },
      needs: { select: { code: true, method: true, status: true } },
    },
    orderBy: { code: "asc" },
  });

  const atRisk = items.filter((i) => i.holders.length <= 1);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href="/modules/M26" className="text-xs text-accent hover:underline">
          ← Danh mục tri thức
        </Link>
        <h1 className="mt-1 font-head text-2xl font-bold text-ink">Rủi ro mất tri thức trọng yếu</h1>
        <p className="mt-1 text-sm text-ink-2">
          Tri thức ẩn mức trọng yếu Cao mà chỉ một người nắm giữ. Theo ETV.P26 mục 5.1.6, mục như vậy{" "}
          <strong>không được phê duyệt</strong> tới khi có liên kết rủi ro bên M01 <strong>và</strong> phiếu nhu cầu tri thức mang tính chuyển giao
          (kèm cặp · đào tạo nội bộ · văn bản hóa).
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full min-w-[56rem] text-sm">
          <thead>
            <tr>
              <th className={th}>Mã</th>
              <th className={th}>Tên mục tri thức</th>
              <th className={th}>Người giữ</th>
              <th className={th}>Chủ sở hữu</th>
              <th className={th}>Bảo mật</th>
              <th className={th}>Rủi ro M01</th>
              <th className={th}>Nhu cầu chuyển giao</th>
              <th className={th}>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {atRisk.map((i) => {
              const transfer = i.needs.filter(
                (n) => (TRANSFER_METHODS as readonly string[]).includes(n.method) && n.status !== "KHONG_THUC_HIEN",
              );
              return (
                <tr key={i.id} className="border-b border-border last:border-0 hover:bg-sunk">
                  <td className="px-3 py-2">
                    <Link href={`/modules/M26/item/${i.id}`} className="font-mono text-xs font-medium text-accent hover:underline">
                      {i.code}
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-ink">{i.title}</td>
                  <td className="px-3 py-2 text-xs text-ink-2">
                    {i.holders.length === 0 ? <span className="text-crit">Chưa ghi nhận</span> : i.holders.map((h) => h.user.name).join(", ")}
                  </td>
                  <td className="px-3 py-2 text-xs text-ink-2">{i.owner.name}</td>
                  <td className="px-3 py-2 text-xs text-ink-2">{CONFIDENTIALITY_LABEL[i.confidentiality]}</td>
                  <td className="px-3 py-2 text-xs">
                    {i.riskLinks.length > 0 ? (
                      <span className="text-good">{i.riskLinks.map((l) => l.risk.code).join(", ")}</span>
                    ) : (
                      <span className="text-crit">Chưa mở rủi ro</span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-xs">
                    {transfer.length > 0 ? (
                      <span className="text-good">{transfer.map((n) => n.code).join(", ")}</span>
                    ) : (
                      <span className="text-crit">Chưa có phiếu</span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <Badge label={ITEM_STATUS_LABEL[i.status]} tone={ITEM_STATUS_TONE[i.status]} />
                  </td>
                </tr>
              );
            })}
            {atRisk.length === 0 && (
              <tr>
                <td colSpan={8} className="px-3 py-6 text-center text-sm text-ink-3">
                  Không có tri thức trọng yếu nào đang phụ thuộc một người.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
