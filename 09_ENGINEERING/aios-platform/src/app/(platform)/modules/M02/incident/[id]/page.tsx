import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getM02Role } from "@/lib/m02/actor";
import { INCIDENT_STATUS_LABEL } from "@/lib/m02/labels";
import { IncidentActionPanel } from "./ActionPanel";

export default async function M02IncidentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [inc, m02Role] = await Promise.all([
    prisma.m02SecurityIncident.findUnique({ where: { id }, include: { detectedBy: true, assessedBy: true, closedBy: true } }),
    getM02Role(),
  ]);
  if (!inc) notFound();

  const auditEntries = await prisma.m02AuditEntry.findMany({
    where: { itemType: "INCIDENT", itemId: id },
    orderBy: { ts: "asc" },
    include: { actor: true },
  });

  return (
    <div className="grid max-w-4xl grid-cols-3 gap-6">
      <div className="col-span-2 flex flex-col gap-4">
        <div>
          <p className="font-mono text-xs text-ink-3">{inc.code}</p>
          <h1 className="font-head text-2xl font-bold text-ink">Sự cố bảo mật</h1>
          <p className="mt-1 text-sm text-ink-2">{INCIDENT_STATUS_LABEL[inc.status]}</p>
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl border border-border bg-surface p-4 text-sm">
          <dt className="text-ink-3">Người phát hiện</dt>
          <dd className="text-ink">{inc.detectedBy.name}</dd>
          <dt className="text-ink-3">Thời điểm phát hiện</dt>
          <dd className="text-ink">{inc.detectedAt.toLocaleString("vi-VN")}</dd>
          <dt className="text-ink-3">Biện pháp ngăn chặn</dt>
          <dd className="text-ink">{inc.containmentAction}</dd>
          <dt className="text-ink-3">Đánh giá phạm vi/hậu quả</dt>
          <dd className="text-ink">{inc.impactAssessment ?? "—"}</dd>
          <dt className="text-ink-3">Bắt buộc thông báo</dt>
          <dd className="text-ink">{inc.notificationRequired == null ? "—" : inc.notificationRequired ? "Có" : "Không"}</dd>
          <dt className="text-ink-3">Biện pháp khắc phục</dt>
          <dd className="text-ink">{inc.correctiveAction ?? "—"}</dd>
        </dl>

        <div>
          <h2 className="mb-2 font-head text-sm font-bold text-ink">Nhật ký</h2>
          <ul className="flex flex-col gap-2 text-sm">
            {auditEntries.map((e) => (
              <li key={e.id} className="rounded-lg border border-border bg-surface p-3">
                <p className="text-ink">
                  <span className="text-ink-3">{e.ts.toLocaleString("vi-VN")}</span> · {e.actor.name} ({e.role}) — {e.action}
                </p>
              </li>
            ))}
            {auditEntries.length === 0 && (
              <li className="rounded-lg border border-border bg-surface p-3 text-ink-3">Chưa có sự kiện nào.</li>
            )}
          </ul>
        </div>
      </div>

      <div>
        <IncidentActionPanel id={inc.id} status={inc.status} m02Role={m02Role} />
      </div>
    </div>
  );
}
