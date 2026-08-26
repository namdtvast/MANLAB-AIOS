import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getM27Role } from "@/lib/m27/actor";
import { ASSET_STATUS_LABEL, DATA_DOMAIN_LABEL } from "@/lib/m27/labels";
import { CLASSIFICATION_LABEL } from "@/lib/m34/labels";

const th =
  "border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3";

export default async function M27PersonalDataPage() {
  const role = await getM27Role();
  // Danh sách này phục vụ nghĩa vụ pháp lý theo NĐ 13/2023 (ETV.P27 §6.4) — QLCL tổng hợp,
  // sao gửi PT.ATTT. Không mở cho vai trò khác.
  if (role !== "QLCL" && role !== "LDV" && role !== "ATTT") {
    return (
      <div className="flex flex-col gap-4">
        <Link href="/modules/M27" className="text-xs text-accent hover:underline">
          ← Danh mục tài sản thông tin
        </Link>
        <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">
          Danh sách tài sản có dữ liệu cá nhân do QLCL tổng hợp, sao gửi PT.ATTT (ETV.P27 §6.4, VIII). Vai trò hiện
          tại không được tiếp cận.
        </p>
      </div>
    );
  }

  const assets = await prisma.m27InfoAsset.findMany({
    where: { containsPersonalData: true },
    orderBy: { code: "asc" },
    include: { owner: { select: { name: true } } },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M27 · Nghị định 13/2023/NĐ-CP</p>
        <h1 className="font-head text-2xl font-bold text-ink">Tài sản có dữ liệu cá nhân</h1>
        <p className="mt-1 text-sm text-ink-2">
          Mỗi tài sản phải có <strong>căn cứ pháp lý và mục đích xử lý</strong>, phạm vi chủ thể dữ liệu, và{" "}
          <strong>thời hạn lưu hữu hạn</strong> — không được ghi &quot;vĩnh viễn&quot; nếu không có căn cứ pháp luật
          (ETV.P27 §6.4).
        </p>
      </div>

      <Link href="/modules/M27" className="text-xs text-accent hover:underline">
        ← Danh mục tài sản thông tin
      </Link>

      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full min-w-[64rem] text-sm">
          <thead>
            <tr>
              <th className={th}>Mã</th>
              <th className={th}>Tên tài sản</th>
              <th className={th}>Nhóm dữ liệu</th>
              <th className={th}>Phân loại</th>
              <th className={th}>Căn cứ và mục đích xử lý</th>
              <th className={th}>Thời hạn lưu</th>
              <th className={th}>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((a) => (
              <tr key={a.id} className="border-b border-border last:border-0 hover:bg-sunk">
                <td className="px-3 py-2">
                  <Link href={`/modules/M27/asset/${a.id}`} className="font-mono text-xs text-accent hover:underline">
                    {a.code}
                  </Link>
                </td>
                <td className="px-3 py-2 text-ink">
                  {a.name}
                  {a.personalDataScope && <span className="block text-xs text-ink-3">{a.personalDataScope}</span>}
                </td>
                <td className="px-3 py-2 text-ink-2">{DATA_DOMAIN_LABEL[a.dataDomain]}</td>
                <td className="px-3 py-2 text-ink-2">{CLASSIFICATION_LABEL[a.classification]}</td>
                <td className="px-3 py-2 text-xs text-ink-2">
                  {a.legalBasis ?? <span className="text-crit">Thiếu căn cứ — chặn phê duyệt (§6.4)</span>}
                </td>
                <td className="px-3 py-2 text-xs text-ink-2">{a.retentionPeriod}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{ASSET_STATUS_LABEL[a.status]}</td>
              </tr>
            ))}
            {assets.length === 0 && (
              <tr>
                <td colSpan={7} className="px-3 py-8 text-center text-sm text-ink-3">
                  Chưa có tài sản nào được đánh dấu chứa dữ liệu cá nhân.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
