import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getM04Role } from "@/lib/m04/actor";
import { PLAN_STATUS_LABEL, RISK_LEVEL_LABEL } from "@/lib/m04/labels";
import { PlanActionPanel } from "./ActionPanel";

export default async function M04PlanDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [p, m04Role] = await Promise.all([
    prisma.m04FieldWorkPlan.findUnique({ where: { id }, include: { createdBy: true, approvedBy: true } }),
    getM04Role(),
  ]);
  if (!p) notFound();

  const auditEntries = await prisma.m04AuditEntry.findMany({
    where: { itemType: "FIELD_WORK_PLAN", itemId: id },
    orderBy: { ts: "asc" },
    include: { actor: true },
  });

  return (
    <div className="grid max-w-4xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="col-span-2 flex flex-col gap-4">
        <div>
          <p className="font-mono text-xs text-ink-3">{p.code}</p>
          <h1 className="font-head text-2xl font-bold text-ink">{p.site}</h1>
          <p className="mt-1 text-sm text-ink-2">
            {RISK_LEVEL_LABEL[p.riskLevel]} · {PLAN_STATUS_LABEL[p.status]}
          </p>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 rounded-xl border border-border bg-surface p-4 text-sm">
          <dt className="text-ink-3">Khách hàng</dt>
          <dd className="text-ink">{p.customer}</dd>
          <dt className="text-ink-3">Nhân sự tham gia</dt>
          <dd className="text-ink">{p.personnel.join(", ")}</dd>
          <dt className="text-ink-3">Thời gian dự kiến</dt>
          <dd className="text-ink">{p.schedule.toLocaleDateString("vi-VN")}</dd>
          <dt className="text-ink-3">Hạng mục công việc</dt>
          <dd className="text-ink">
            <ul className="list-inside list-disc">
              {p.workItems.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </dd>
          <dt className="text-ink-3">Người lập</dt>
          <dd className="text-ink">{p.createdBy.name}</dd>
          <dt className="text-ink-3">Người phê duyệt</dt>
          <dd className="text-ink">{p.approvedBy?.name ?? "—"}</dd>
          <dt className="text-ink-3">Đã phổ biến</dt>
          <dd className="text-ink">{p.briefed ? `Có (${p.briefedAt?.toLocaleString("vi-VN")})` : "Chưa"}</dd>
        </dl>

        <div>
          <h2 className="mb-2 font-head text-sm font-bold text-ink">Nhật ký</h2>
          <ul className="flex flex-col gap-2 text-sm">
            {auditEntries.map((e) => (
              <li key={e.id} className="rounded-lg border border-border bg-surface p-3">
                <p className="text-ink">
                  <span className="text-ink-3">{e.ts.toLocaleString("vi-VN")}</span> · {e.actor.name} ({e.role}) — {e.action}
                </p>
                {e.reason && <p className="mt-1 text-ink-2">Lý do: {e.reason}</p>}
              </li>
            ))}
            {auditEntries.length === 0 && (
              <li className="rounded-lg border border-border bg-surface p-3 text-ink-3">Chưa có sự kiện nào.</li>
            )}
          </ul>
        </div>
      </div>

      <div>
        <PlanActionPanel id={p.id} status={p.status} riskLevel={p.riskLevel} briefed={p.briefed} m04Role={m04Role} />
      </div>
    </div>
  );
}
