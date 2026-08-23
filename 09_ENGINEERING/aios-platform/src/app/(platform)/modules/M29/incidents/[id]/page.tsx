import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getM29Role } from "@/lib/m29/actor";
import { can } from "@/lib/m29/model";
import {
  INCIDENT_KIND_LABEL,
  INCIDENT_SEVERITY_LABEL,
  INCIDENT_SEVERITY_TONE,
  INCIDENT_STATUS_LABEL,
  INCIDENT_STATUS_TONE,
} from "@/lib/m29/labels";
import { Badge } from "../../ui";
import { IncidentActions } from "./IncidentActions";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-border px-4 py-2.5 last:border-0 sm:flex-row sm:gap-4">
      <span className="w-full shrink-0 text-xs text-ink-3 sm:w-64 sm:pt-0.5">{label}</span>
      <span className="text-sm text-ink">{children}</span>
    </div>
  );
}

export default async function M29IncidentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const role = await getM29Role();
  if (!can(role, "incidents")) {
    return <div className="rounded-xl border border-crit/30 bg-crit-soft p-4 text-sm text-crit">Bạn không có quyền xem phiếu sự cố AI.</div>;
  }

  const inc = await prisma.aIIncident.findUnique({
    where: { id },
    include: { agent: true, platform: true, detectedBy: true, assessedBy: true, closedBy: true },
  });
  if (!inc) notFound();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs font-medium text-ink-3">M29 · ETV.P.F29.04</p>
        <h1 className="font-head text-2xl font-bold text-ink">{inc.code}</h1>
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge label={INCIDENT_SEVERITY_LABEL[inc.severity]} tone={INCIDENT_SEVERITY_TONE[inc.severity]} />
          <Badge label={INCIDENT_STATUS_LABEL[inc.status]} tone={INCIDENT_STATUS_TONE[inc.status]} />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-surface">
        <Row label="Loại sự cố">{INCIDENT_KIND_LABEL[inc.kind]}</Row>
        <Row label="Tác tử liên quan">{inc.agent ? `${inc.agent.code} — ${inc.agent.name}` : "— (không gắn tác tử)"}</Row>
        <Row label="Mã nhật ký suy luận">{inc.traceId ?? "—"}</Row>
        <Row label="Người phát hiện">{inc.detectedBy.name ?? "—"}</Row>
        <Row label="Phát hiện lúc">{inc.detectedAt.toLocaleString("vi-VN")}</Row>
        <Row label="Diễn biến">{inc.description}</Row>
        <Row label="Biện pháp khống chế">{inc.containmentAction || "—"}</Row>
        <Row label="Ảnh hưởng kết quả đã phát hành">
          {inc.affectsIssuedResult ? `Có — hồ sơ MP10/MP11: ${inc.issuedResultRef ?? "chưa ghi"}` : "Không"}
        </Row>
        <Row label="Lộ dữ liệu Hạn chế/Mật/cá nhân">{inc.sensitiveDataExposed ? `Có — phiếu F28.03: ${inc.f28Ref ?? "chưa ghi"}` : "Không"}</Row>
        <Row label="Mã KPH (MP13)">{inc.capRef ?? "—"}</Row>
        <Row label="Người xử lý">{inc.assessedBy?.name ?? "—"}</Row>
        <Row label="Người đóng phiếu">{inc.closedBy?.name ?? "—"}</Row>
        <Row label="Kết luận">{inc.closureNote ?? "—"}</Row>
        {inc.cancelReason && <Row label="Lý do hủy">{inc.cancelReason}</Row>}
      </div>

      <IncidentActions
        id={inc.id}
        status={inc.status}
        severity={inc.severity}
        needsF28={inc.sensitiveDataExposed}
        needsIssuedRef={inc.affectsIssuedResult}
        canWrite={can(role, "incidents", "write")}
      />

      <Link href="/modules/M29/incidents" className="text-sm text-accent hover:underline">
        ← Danh sách phiếu sự cố
      </Link>
    </div>
  );
}
