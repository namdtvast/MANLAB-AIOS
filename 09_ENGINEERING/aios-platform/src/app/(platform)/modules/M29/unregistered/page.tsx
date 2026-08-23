import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getM29Role } from "@/lib/m29/actor";
import { can } from "@/lib/m29/model";
import { UNREGISTERED_STATUS_LABEL, UNREGISTERED_STATUS_TONE } from "@/lib/m29/labels";
import { Badge, thCls } from "../ui";
import { NewSightingForm, SightingActions } from "./UnregisteredPanel";

export default async function M29UnregisteredPage() {
  const role = await getM29Role();
  if (!can(role, "unregistered")) {
    return <div className="rounded-xl border border-crit/30 bg-crit-soft p-4 text-sm text-crit">Bạn không có quyền xem sổ theo dõi AI chưa đăng ký.</div>;
  }

  // "Quá hạn" do truy vấn quyết định, không tính bằng đồng hồ trong lúc render (react-hooks/purity).
  const [sightings, agents, openIncidents, overdueRows] = await Promise.all([
    prisma.aIUnregisteredSighting.findMany({ orderBy: { createdAt: "desc" }, include: { detectedBy: true, incident: true, registeredAgent: true } }),
    prisma.aIAgent.findMany({ orderBy: { code: "asc" }, select: { id: true, code: true, name: true } }),
    prisma.aIIncident.findMany({ where: { status: { notIn: ["CLOSED", "CANCELLED"] } }, orderBy: { createdAt: "desc" }, select: { id: true, code: true } }),
    prisma.aIUnregisteredSighting.findMany({
      where: { status: { in: ["OPEN", "REGISTERING"] }, dueDate: { lt: new Date() } },
      select: { id: true },
    }),
  ]);

  const overdueIds = new Set(overdueRows.map((r) => r.id));
  const canWrite = can(role, "unregistered", "write");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-ink-3">M29 · ETV.P29 mục 5.1.7 · Biểu mẫu ETV.P.F29.01 phần 3</p>
          <h1 className="font-head text-2xl font-bold text-ink">Hệ thống AI chưa đăng ký</h1>
          <p className="mt-1 text-sm text-ink-2">
            Phải hoàn thiện hồ sơ đăng ký trong 15 ngày làm việc kể từ khi phát hiện, hoặc chấm dứt sử dụng.
          </p>
        </div>
        {canWrite && <NewSightingForm />}
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full min-w-[64rem] text-sm">
          <thead>
            <tr>
              <th className={thCls}>Mã</th>
              <th className={thCls}>Hệ thống AI</th>
              <th className={thCls}>Người/đơn vị dùng</th>
              <th className={thCls}>Phát hiện</th>
              <th className={thCls}>Hạn xử lý</th>
              <th className={thCls}>Dữ liệu nhạy cảm</th>
              <th className={thCls}>Phiếu sự cố</th>
              <th className={thCls}>Trạng thái</th>
              {canWrite && <th className={thCls}>Thao tác</th>}
            </tr>
          </thead>
          <tbody>
            {sightings.map((s) => {
              const overdue = overdueIds.has(s.id);
              return (
                <tr key={s.id} className="border-b border-border last:border-0 align-top hover:bg-sunk">
                  <td className="px-3 py-2.5 font-mono text-xs font-medium text-ink">{s.code}</td>
                  <td className="px-3 py-2.5 text-ink">
                    {s.name}
                    {s.registeredAgent && <span className="block text-xs text-ink-3">→ {s.registeredAgent.code}</span>}
                  </td>
                  <td className="px-3 py-2.5 text-ink-2">{s.usedBy}</td>
                  <td className="px-3 py-2.5 tabular-nums text-ink-2">{s.detectedAt.toLocaleDateString("vi-VN")}</td>
                  <td className={`px-3 py-2.5 tabular-nums ${overdue ? "font-semibold text-crit" : "text-ink-2"}`}>
                    {s.dueDate.toLocaleDateString("vi-VN")}
                    {overdue && <span className="block text-xs">quá hạn</span>}
                  </td>
                  <td className="px-3 py-2.5">{s.sensitiveData ? <Badge label="Có" tone="crit" /> : <span className="text-xs text-ink-3">Không</span>}</td>
                  <td className="px-3 py-2.5 font-mono text-xs text-ink-2">{s.incident?.code ?? "—"}</td>
                  <td className="px-3 py-2.5">
                    <Badge label={UNREGISTERED_STATUS_LABEL[s.status]} tone={UNREGISTERED_STATUS_TONE[s.status]} />
                  </td>
                  {canWrite && (
                    <td className="px-3 py-2.5">
                      <SightingActions id={s.id} status={s.status} agents={agents} incidents={openIncidents} hasIncident={Boolean(s.incidentId)} />
                    </td>
                  )}
                </tr>
              );
            })}
            {sightings.length === 0 && (
              <tr>
                <td colSpan={canWrite ? 9 : 8} className="px-3 py-8 text-center text-sm text-ink-3">
                  Chưa ghi nhận hệ thống AI nào dùng ngoài danh mục.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Link href="/modules/M29" className="text-sm text-accent hover:underline">
        ← Về tổng quan M29
      </Link>
    </div>
  );
}
