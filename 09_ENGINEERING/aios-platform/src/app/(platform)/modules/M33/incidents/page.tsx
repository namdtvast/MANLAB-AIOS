import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getM33Role } from "@/lib/m33/actor";
import { IMPACT_LABEL, INCIDENT_KIND_LABEL, INCIDENT_STATUS_LABEL, INCIDENT_STATUS_TONE, PRIORITY_LABEL, PRIORITY_TONE } from "@/lib/m33/labels";
import { IncidentActions, NewIncidentForm } from "./IncidentActions";

const TONE_CLASS: Record<string, string> = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  crit: "bg-crit-soft text-crit",
  neutral: "bg-sunk text-ink-2",
};

export default async function M33IncidentsPage() {
  const [incidents, role, assets] = await Promise.all([
    prisma.m33ITIncident.findMany({
      orderBy: { reportedAt: "desc" },
      include: { assets: { select: { code: true } }, reportedBy: { select: { name: true } }, assignedTo: { select: { name: true } } },
    }),
    getM33Role(),
    prisma.m33ITAsset.findMany({ where: { status: { in: ["OPERATING", "SUSPENDED"] } }, select: { id: true, code: true, name: true, criticality: true }, orderBy: { code: "asc" } }),
  ]);

  const now = new Date();
  const responseOverdue = incidents.filter((i) => i.status === "MOI" && i.responseDueAt && i.responseDueAt < now);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M33 · Sự cố và yêu cầu hỗ trợ — F33.04 (ETV.P33 §6.5); định tuyến 5 đích: M28 · M35 · M10/M11 · M31 · M13</p>
        <h1 className="font-head text-2xl font-bold text-ink">Sự cố và hỗ trợ</h1>
        <p className="mt-1 text-sm text-ink-2">
          Quá hạn phản hồi (R18): <strong className={responseOverdue.length > 0 ? "text-crit" : "text-ink"}>{responseOverdue.length}</strong> ·
          Mức Cao: phản hồi ngay + báo LĐV trong 01 giờ.
        </p>
      </div>
      <Link href="/modules/M33" className="text-xs text-accent hover:underline">
        ← Danh mục hạ tầng
      </Link>

      <NewIncidentForm assets={assets} />

      <div className="flex flex-col gap-3">
        {incidents.map((i) => (
          <section key={i.id} className="rounded-xl border border-border bg-surface p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-ink">
                  <span className="font-mono text-xs">{i.code}</span> · {INCIDENT_KIND_LABEL[i.kind]} ·{" "}
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[PRIORITY_TONE[i.priority]]}`}>
                    {PRIORITY_LABEL[i.priority]}
                  </span>
                  {i.securityFlag && <span className="ml-1 rounded-full bg-crit-soft px-2 py-0.5 text-xs font-medium text-crit">ATTT → M28</span>}
                  {i.status === "MOI" && i.responseDueAt && i.responseDueAt < now && (
                    <span className="ml-1 rounded-full bg-crit-soft px-2 py-0.5 text-xs font-medium text-crit">Quá hạn phản hồi</span>
                  )}
                </p>
                <p className="text-xs text-ink-2">
                  {i.description.slice(0, 140)} · {IMPACT_LABEL[i.impact]} · Tài sản: {i.assets.map((a) => a.code).join(", ")} · Báo:{" "}
                  {i.reportedBy.name} {i.reportedAt.toLocaleString("vi-VN")}
                  {i.assignedTo && ` · Xử lý: ${i.assignedTo.name}`}
                  {i.securityIncidentRef && ` · M28: ${i.securityIncidentRef}${i.securityConcluded ? " (đã kết luận)" : " (chờ kết luận)"}`}
                  {i.capaRef && ` · KPH: ${i.capaRef}`}
                  {i.reason && ` · ${i.reason}`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[INCIDENT_STATUS_TONE[i.status]]}`}>
                  {INCIDENT_STATUS_LABEL[i.status]}
                </span>
                <IncidentActions id={i.id} status={i.status} priority={i.priority} securityFlag={i.securityFlag} role={role} />
              </div>
            </div>
          </section>
        ))}
        {incidents.length === 0 && <p className="text-sm text-ink-3">Chưa có phiếu sự cố nào.</p>}
      </div>
    </div>
  );
}
