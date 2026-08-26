import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ASSET_CLASS_LABEL, ASSET_STATUS_LABEL } from "@/lib/m33/labels";

// Hàng chờ xử lý hạ tầng chưa kiểm kê — ETV.P33 §6.7 (R17): lập bản ghi, hạn vào vận hành 30 ngày,
// không đạt cấu hình cơ sở thì ngắt mạng; có dữ liệu Hạn chế/Mật thì KPH (M13) + sự cố (M28).
export default async function M33UndiscoveredPage() {
  const assets = await prisma.m33ITAsset.findMany({
    where: { discoverySource: "PHAT_HIEN_CHUA_KIEM_KE" },
    orderBy: { createdAt: "desc" },
    include: { custodian: { select: { name: true } } },
  });
  const now = new Date();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M33 · Hạ tầng phát hiện chưa kiểm kê — sự không phù hợp (R17, ETV.P33 §6.7)</p>
        <h1 className="font-head text-2xl font-bold text-ink">Hạ tầng chưa kiểm kê</h1>
        <p className="mt-1 text-sm text-ink-2">
          Còn cần thiết ⇒ đưa vào vận hành trong <strong>30 ngày</strong>; không đạt cấu hình an toàn cơ sở ⇒ ngắt khỏi mạng của Viện;
          có lưu dữ liệu Hạn chế/Mật ⇒ lập KPH (M13) và mở sự cố (M28).
        </p>
      </div>
      <Link href="/modules/M33" className="text-xs text-accent hover:underline">
        ← Danh mục hạ tầng
      </Link>

      <div className="flex flex-col gap-3">
        {assets.map((a) => {
          const overdue = a.inventoryDueAt && a.inventoryDueAt < now && !["OPERATING", "SUSPENDED", "RETIRED", "DISPOSED"].includes(a.status);
          return (
            <section key={a.id} className="rounded-xl border border-border bg-surface p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-ink">
                    <Link href={`/modules/M33/asset/${a.id}`} className="font-mono text-xs text-accent hover:underline">
                      {a.code}
                    </Link>{" "}
                    {a.name} · {ASSET_CLASS_LABEL[a.assetClass]}
                  </p>
                  <p className="text-xs text-ink-2">
                    Chủ quản trị: {a.custodian.name} · Trạng thái: {ASSET_STATUS_LABEL[a.status]} · Hạn vào vận hành:{" "}
                    {a.inventoryDueAt?.toLocaleDateString("vi-VN") ?? "—"}
                  </p>
                </div>
                <div className="flex gap-1">
                  {a.networkIsolated && <span className="rounded-full bg-crit-soft px-2 py-0.5 text-xs font-medium text-crit">Đã ngắt mạng</span>}
                  {overdue && <span className="rounded-full bg-crit-soft px-2 py-0.5 text-xs font-medium text-crit">Quá 30 ngày</span>}
                </div>
              </div>
            </section>
          );
        })}
        {assets.length === 0 && <p className="text-sm text-ink-3">Không có tài sản nào phát hiện chưa kiểm kê.</p>}
      </div>
    </div>
  );
}
