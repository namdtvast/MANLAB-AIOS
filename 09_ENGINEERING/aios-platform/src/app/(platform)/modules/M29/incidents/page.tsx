import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { KICH_THUOC_TRANG, PhanTrang, boQua, chotTrang } from "@/components/PhanTrang";
import { getM29Role } from "@/lib/m29/actor";
import { can } from "@/lib/m29/model";
import { INCIDENT_KIND_LABEL, INCIDENT_SEVERITY_LABEL, INCIDENT_SEVERITY_TONE, INCIDENT_STATUS_LABEL, INCIDENT_STATUS_TONE } from "@/lib/m29/labels";
import { Badge, thCls } from "../ui";

export default async function M29IncidentsPage({ searchParams }: { searchParams: Promise<{ trang?: string }> }) {
  const { trang: trangRaw } = await searchParams;
  const role = await getM29Role();
  if (!can(role, "incidents")) {
    return <div className="rounded-xl border border-crit/30 bg-crit-soft p-4 text-sm text-crit">Bạn không có quyền xem phiếu sự cố AI.</div>;
  }

  const tong = await prisma.aIIncident.count();
  const trang = chotTrang(trangRaw, tong);
  const incidents = await prisma.aIIncident.findMany({
    orderBy: { createdAt: "desc" },
    skip: boQua(trang),
    take: KICH_THUOC_TRANG,
    include: { agent: true, detectedBy: true },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-ink-3">M29 · ETV.P29 mục 5.7 · Biểu mẫu ETV.P.F29.04</p>
          <h1 className="font-head text-2xl font-bold text-ink">Phiếu sự cố trí tuệ nhân tạo</h1>
          <p className="mt-1 text-sm text-ink-2">
            Sự cố có yếu tố mất an toàn thông tin xử lý đồng thời theo ETV.MP28 — hồ sơ gốc là phiếu F28.03, phiếu này chỉ dẫn chiếu.
          </p>
        </div>
        {can(role, "incidents", "write") && (
          <Link
            href="/modules/M29/incidents/new"
            className="rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90"
          >
            Lập phiếu sự cố
          </Link>
        )}
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full min-w-[52rem] text-sm">
          <thead>
            <tr>
              <th className={thCls}>Mã</th>
              <th className={thCls}>Mức</th>
              <th className={thCls}>Loại</th>
              <th className={thCls}>Tác tử</th>
              <th className={thCls}>Người phát hiện</th>
              <th className={thCls}>Phát hiện lúc</th>
              <th className={thCls}>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((i) => (
              <tr key={i.id} className="border-b border-border last:border-0 hover:bg-sunk">
                <td className="px-3 py-2.5">
                  <Link href={`/modules/M29/incidents/${i.id}`} className="whitespace-nowrap font-mono text-xs font-medium text-accent hover:underline">
                    {i.code}
                  </Link>
                </td>
                <td className="px-3 py-2.5">
                  <Badge label={INCIDENT_SEVERITY_LABEL[i.severity]} tone={INCIDENT_SEVERITY_TONE[i.severity]} />
                </td>
                <td className="px-3 py-2.5 text-ink-2">{INCIDENT_KIND_LABEL[i.kind]}</td>
                <td className="px-3 py-2.5 text-ink-2">{i.agent?.name ?? "—"}</td>
                <td className="px-3 py-2.5 text-ink-2">{i.detectedBy.name ?? "—"}</td>
                <td className="px-3 py-2.5 tabular-nums text-ink-2">{i.detectedAt.toLocaleString("vi-VN")}</td>
                <td className="px-3 py-2.5">
                  <Badge label={INCIDENT_STATUS_LABEL[i.status]} tone={INCIDENT_STATUS_TONE[i.status]} />
                </td>
              </tr>
            ))}
            {incidents.length === 0 && (
              <tr>
                <td colSpan={7} className="px-3 py-8 text-center text-sm text-ink-3">
                  Chưa có phiếu sự cố nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <PhanTrang path="/modules/M29/incidents" trang={trang} tong={tong} donVi="phiếu sự cố" />
      </div>

      <Link href="/modules/M29" className="text-sm text-accent hover:underline">
        ← Về tổng quan M29
      </Link>
    </div>
  );
}
