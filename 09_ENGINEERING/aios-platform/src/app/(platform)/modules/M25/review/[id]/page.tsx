import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getM25Role } from "@/lib/m25/actor";
import { listM01Linkables, listM25Users } from "@/lib/m25/actions";
import { canEditReview } from "@/lib/m25/rules";
import { CYCLE_TYPE_LABEL, MGMT_SYSTEM_LABEL, REVIEW_STATUS_LABEL } from "@/lib/m25/labels";
import { ReviewActionPanel } from "./ReviewActionPanel";
import { IssuesSection } from "./IssuesSection";
import { PartiesSection } from "./PartiesSection";

export default async function M25ReviewDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [r, m25Role] = await Promise.all([
    prisma.m25ContextReview.findUnique({
      where: { id },
      include: {
        createdBy: true,
        reviewedBy: true,
        approvedBy: true,
        supersedes: { select: { id: true, code: true } },
        supersededBy: { select: { id: true, code: true } },
        issues: {
          orderBy: { createdAt: "asc" },
          include: { owner: { select: { name: true } }, riskLinks: { include: { risk: true, opportunity: true } } },
        },
        parties: {
          orderBy: { createdAt: "asc" },
          include: { owner: { select: { name: true } }, expectations: { orderBy: { createdAt: "asc" } } },
        },
      },
    }),
    getM25Role(),
  ]);
  if (!r) notFound();

  // Nhật ký hiển thị toàn bộ vết của kỳ: cả thao tác trên chính kỳ lẫn trên vấn đề/bên quan tâm/
  // mong đợi thuộc kỳ đó — hồ sơ truy vết phải xem được ở một chỗ khi đoàn đánh giá hỏi.
  const childIds = [
    id,
    ...r.issues.map((i) => i.id),
    ...r.parties.map((p) => p.id),
    ...r.parties.flatMap((p) => p.expectations.map((e) => e.id)),
  ];
  const [auditEntries, users, m01] = await Promise.all([
    prisma.m25AuditEntry.findMany({ where: { itemId: { in: childIds } }, orderBy: { ts: "asc" }, include: { actor: true } }),
    listM25Users(),
    listM01Linkables(),
  ]);

  const editable = canEditReview(r.status);
  const highUnlinked = r.issues.filter((i) => i.status === "CON_HIEU_LUC" && i.impactLevel === "CAO" && i.riskLinks.length === 0);
  const partiesWithoutExp = r.parties.filter((p) => p.status === "CON_HIEU_LUC" && p.expectations.length === 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-ink-3">{r.code}</p>
          <h1 className="font-head text-2xl font-bold text-ink">
            Kỳ xem xét bối cảnh {CYCLE_TYPE_LABEL[r.cycleType].toLowerCase()} — năm {r.periodYear}
          </h1>
          <p className="mt-1 text-sm text-ink-2">{REVIEW_STATUS_LABEL[r.status]}</p>
        </div>
        <Link href="/modules/M25" className="text-xs text-accent hover:underline">
          ← Danh sách kỳ
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-3 rounded-xl border border-border bg-surface p-4 text-sm sm:grid-cols-2">
            <dt className="text-ink-3">Phạm vi hệ thống</dt>
            <dd className="text-ink">{r.scopeSystems.map((s) => MGMT_SYSTEM_LABEL[s]).join(", ")}</dd>
            {r.cycleType === "DOT_XUAT" && (
              <>
                <dt className="text-ink-3">Sự kiện phát sinh</dt>
                <dd className="text-ink">{r.triggerReason ?? "—"}</dd>
              </>
            )}
            <dt className="text-ink-3">Tóm tắt biến động</dt>
            <dd className="text-ink">{r.summary ?? "—"}</dd>
            <dt className="text-ink-3">Người lập</dt>
            <dd className="text-ink">{r.createdBy.name}</dd>
            <dt className="text-ink-3">Soát xét (TP)</dt>
            <dd className="text-ink">{r.reviewedBy?.name ?? "Chưa"}</dd>
            <dt className="text-ink-3">Phê duyệt (LĐV)</dt>
            <dd className="text-ink">{r.approvedBy?.name ?? "Chưa"}</dd>
            {r.conclusion && (
              <>
                <dt className="text-ink-3">Kết luận LĐV</dt>
                <dd className="text-ink">{r.conclusion}</dd>
              </>
            )}
            {r.reason && (
              <>
                <dt className="text-ink-3">Lý do gần nhất</dt>
                <dd className="text-ink">{r.reason}</dd>
              </>
            )}
            {r.supersedes && (
              <>
                <dt className="text-ink-3">Thay thế kỳ</dt>
                <dd>
                  <Link href={`/modules/M25/review/${r.supersedes.id}`} className="font-mono text-accent hover:underline">
                    {r.supersedes.code}
                  </Link>
                </dd>
              </>
            )}
            {r.supersededBy && (
              <>
                <dt className="text-ink-3">Bị thay thế bởi</dt>
                <dd>
                  <Link href={`/modules/M25/review/${r.supersededBy.id}`} className="font-mono text-accent hover:underline">
                    {r.supersededBy.code}
                  </Link>
                </dd>
              </>
            )}
          </dl>

          <IssuesSection
            reviewId={r.id}
            editable={editable}
            users={users}
            m01={m01}
            issues={r.issues.map((i) => ({
              id: i.id,
              code: i.code,
              title: i.title,
              description: i.description,
              origin: i.origin,
              category: i.category,
              direction: i.direction,
              impactLevel: i.impactLevel,
              monitoringMethod: i.monitoringMethod,
              monitoringFrequency: i.monitoringFrequency,
              status: i.status,
              closeReason: i.closeReason,
              ownerName: i.owner?.name ?? null,
              objectiveRefs: i.objectiveRefs,
              evidenceRefs: i.evidenceRefs,
              links: i.riskLinks.map((l) => ({
                id: l.id,
                label: l.risk ? `${l.risk.code} — ${l.risk.title}` : l.opportunity ? `${l.opportunity.code} — ${l.opportunity.title}` : "—",
              })),
            }))}
          />

          <PartiesSection
            reviewId={r.id}
            editable={editable}
            users={users}
            parties={r.parties.map((p) => ({
              id: p.id,
              code: p.code,
              name: p.name,
              group: p.group,
              influenceLevel: p.influenceLevel,
              engagementChannel: p.engagementChannel,
              monitoringFrequency: p.monitoringFrequency,
              impartialityFlag: p.impartialityFlag,
              status: p.status,
              closeReason: p.closeReason,
              ownerName: p.owner?.name ?? null,
              expectations: p.expectations.map((e) => ({
                id: e.id,
                description: e.description,
                source: e.source,
                isComplianceObligation: e.isComplianceObligation,
                obligationRef: e.obligationRef,
                responseAction: e.responseAction,
                responseModuleRef: e.responseModuleRef,
                fulfillmentStatus: e.fulfillmentStatus,
              })),
            }))}
          />

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
              {auditEntries.length === 0 && <li className="rounded-lg border border-border bg-surface p-3 text-ink-3">Chưa có sự kiện nào.</li>}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <ReviewActionPanel id={r.id} status={r.status} m25Role={m25Role} />
          {editable && (highUnlinked.length > 0 || partiesWithoutExp.length > 0) && (
            <div className="rounded-xl border border-warn/30 bg-warn-soft p-4 text-xs text-warn">
              <p className="font-semibold">Chưa gửi soát xét được:</p>
              <ul className="mt-1 list-disc pl-4">
                {highUnlinked.map((i) => (
                  <li key={i.id}>
                    {i.code} — mức tác động Cao, chưa liên kết rủi ro/cơ hội M01 (quy tắc 3)
                  </li>
                ))}
                {partiesWithoutExp.map((p) => (
                  <li key={p.id}>
                    {p.code} — bên quan tâm chưa có nhu cầu/mong đợi nào (quy tắc 6)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
