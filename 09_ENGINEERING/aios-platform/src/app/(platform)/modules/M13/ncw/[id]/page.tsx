import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getM13Role } from "@/lib/m13/actor";
import { listAssignableUsers } from "@/lib/m13/actions";
import { CAP_STATUS_LABEL, NCW_STATUS_LABEL, SEVERITY_LABEL, SOURCE_TYPE_LABEL } from "@/lib/m13/labels";
import { NcwActionPanel } from "./ActionPanel";

export default async function M13NcwDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [n, m13Role, assignable] = await Promise.all([
    prisma.m13NonconformingWork.findUnique({
      where: { id },
      include: {
        detectedBy: true,
        assessedBy: true,
        plan: { include: { assignedTo: true, reviewedBy: true, replacementApprovedBy: true } },
        revokedReports: { orderBy: { createdAt: "asc" } },
        monitoringNotes: { orderBy: { createdAt: "asc" }, include: { author: true } },
      },
    }),
    getM13Role(),
    listAssignableUsers(),
  ]);
  if (!n) notFound();

  const auditEntries = await prisma.m13AuditEntry.findMany({
    where: { OR: [{ itemType: "NCW", itemId: id }, ...(n.plan ? [{ itemType: "CAP" as const, itemId: n.plan.id }] : [])] },
    orderBy: { ts: "asc" },
    include: { actor: true },
  });

  // Cross-module đọc thật: nguồn phát hiện là khiếu nại (← M12) thì tra thẳng bảng M12Complaint
  // theo mã, không import code M12, không sửa gì thuộc M12.
  const linkedComplaint =
    n.sourceType === "KHIEU_NAI" && n.sourceRef
      ? await prisma.m12Complaint.findUnique({ where: { code: n.sourceRef }, select: { id: true, code: true, status: true } })
      : null;

  return (
    <div className="grid max-w-4xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="col-span-2 flex flex-col gap-4">
        <div>
          <p className="font-mono text-xs text-ink-3">{n.code}</p>
          <h1 className="font-head text-2xl font-bold text-ink">Công việc không phù hợp</h1>
          <p className="mt-1 text-sm text-ink-2">
            {NCW_STATUS_LABEL[n.status]}
            {n.severity ? ` · Mức ${SEVERITY_LABEL[n.severity]}` : " · Chưa đánh giá mức độ"}
            {n.stoppedWork ? " · ĐANG DỪNG CÔNG VIỆC" : ""}
          </p>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 rounded-xl border border-border bg-surface p-4 text-sm">
          <dt className="text-ink-3">Mô tả</dt>
          <dd className="text-ink">{n.description}</dd>
          <dt className="text-ink-3">Nguồn phát hiện</dt>
          <dd className="text-ink">
            {SOURCE_TYPE_LABEL[n.sourceType]}
            {linkedComplaint ? (
              <>
                {" — "}
                <Link href={`/modules/M12/complaint/${linkedComplaint.id}`} className="text-accent hover:underline">
                  {linkedComplaint.code}
                </Link>
              </>
            ) : n.sourceRef ? (
              ` — ${n.sourceRef}`
            ) : (
              ""
            )}
          </dd>
          <dt className="text-ink-3">Người phát hiện</dt>
          <dd className="text-ink">{n.detectedBy.name}</dd>
          <dt className="text-ink-3">Dừng ngay khẩn cấp?</dt>
          <dd className="text-ink">{n.emergencyStop ? "Có — đã dừng tại chỗ, báo cáo sau (quy tắc 1)" : "Không"}</dd>
          {n.severity && (
            <>
              <dt className="text-ink-3">Căn cứ đánh giá</dt>
              <dd className="text-ink">
                {n.severityBasis} {n.assessedBy ? `(${n.assessedBy.name})` : ""}
              </dd>
            </>
          )}
        </dl>

        {n.plan && (
          <div className="rounded-xl border border-border bg-surface p-4">
            <h2 className="mb-2 font-head text-sm font-bold text-ink">
              Phương án hành động khắc phục — {CAP_STATUS_LABEL[n.plan.status]}
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <dt className="text-ink-3">Nguyên nhân gốc</dt>
              <dd className="text-ink">{n.plan.rootCause}</dd>
              <dt className="text-ink-3">Nội dung khắc phục</dt>
              <dd className="text-ink">{n.plan.actionPlan}</dd>
              <dt className="text-ink-3">Người thực hiện</dt>
              <dd className="text-ink">{n.plan.assignedTo.name}</dd>
              <dt className="text-ink-3">Người thẩm xét</dt>
              <dd className="text-ink">{n.plan.reviewedBy?.name ?? "Chưa thẩm xét"}</dd>
              {n.plan.reviewNote && (
                <>
                  <dt className="text-ink-3">Ý kiến thẩm xét</dt>
                  <dd className="text-ink">{n.plan.reviewNote}</dd>
                </>
              )}
              {n.plan.replacementReportRef && (
                <>
                  <dt className="text-ink-3">Báo cáo thay thế</dt>
                  <dd className="text-good">
                    {n.plan.replacementReportRef} — LĐV {n.plan.replacementApprovedBy?.name} cho phát hành
                  </dd>
                </>
              )}
            </dl>
          </div>
        )}

        {n.revokedReports.length > 0 && (
          <div className="rounded-xl border border-border bg-surface p-4">
            <h2 className="mb-2 font-head text-sm font-bold text-ink">Báo cáo/GCN đã thu hồi (← M11)</h2>
            <ul className="flex flex-col gap-1 text-sm text-ink-2">
              {n.revokedReports.map((r) => (
                <li key={r.id} className="font-mono text-xs">
                  {r.reportRef}
                  {r.note ? ` — ${r.note}` : ""}
                </li>
              ))}
            </ul>
          </div>
        )}

        {n.monitoringNotes.length > 0 && (
          <div className="rounded-xl border border-border bg-surface p-4">
            <h2 className="mb-2 font-head text-sm font-bold text-ink">Diễn biến theo dõi (mức Nhẹ — quy tắc 3)</h2>
            <ul className="flex flex-col gap-1 text-sm text-ink-2">
              {n.monitoringNotes.map((m) => (
                <li key={m.id}>
                  <span className="text-ink-3">{m.createdAt.toLocaleString("vi-VN")}</span> · {m.author.name} — {m.note}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h2 className="mb-2 font-head text-sm font-bold text-ink">Nhật ký</h2>
          <ul className="flex flex-col gap-2 text-sm">
            {auditEntries.map((e) => (
              <li key={e.id} className="rounded-lg border border-border bg-surface p-3">
                <p className="text-ink">
                  <span className="text-ink-3">{e.ts.toLocaleString("vi-VN")}</span> · {e.actor.name} ({e.role}) — {e.action}
                </p>
                {e.reason && <p className="mt-1 text-ink-2">Lý do/căn cứ: {e.reason}</p>}
              </li>
            ))}
            {auditEntries.length === 0 && (
              <li className="rounded-lg border border-border bg-surface p-3 text-ink-3">Chưa có sự kiện nào.</li>
            )}
          </ul>
        </div>
      </div>

      <div>
        <NcwActionPanel
          id={n.id}
          status={n.status}
          severity={n.severity}
          m13Role={m13Role}
          hasRevokedReport={n.revokedReports.length > 0}
          plan={
            n.plan
              ? {
                  status: n.plan.status,
                  assignedToId: n.plan.assignedToId,
                  replacementReportRef: n.plan.replacementReportRef,
                }
              : null
          }
          assignableUsers={assignable.map((u) => ({ id: u.id, name: u.name ?? u.email }))}
        />
      </div>
    </div>
  );
}
