import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getActor } from "@/lib/m34/actor";
import { isQualityDue, isReviewDue } from "@/lib/m34/rules";
import {
  CLASSIFICATION_LABEL,
  DATASET_STATUS_LABEL,
  DATA_GROUP_LABEL,
  DICT_STATUS_LABEL,
  LIFECYCLE_LABEL,
  REVIEW_CYCLE_LABEL,
} from "@/lib/m34/labels";
import { DataSetActionPanel } from "./DataSetActionPanel";
import { QualitySection } from "./QualitySection";
import { CorrectionSection } from "./CorrectionSection";
import { SharingSection } from "./SharingSection";
import { AISection } from "./AISection";

export default async function M34DataSetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let actor: { id: string; m34Role: string | null } | null = null;
  try {
    actor = await getActor();
  } catch {
    actor = null;
  }

  const d = await prisma.m34DataSet.findUnique({
    where: { id },
    include: {
      createdBy: { select: { name: true } },
      owner: { select: { id: true, name: true } },
      steward: { select: { id: true, name: true } },
      approvedBy: { select: { name: true } },
      dictionaryVersions: { orderBy: { version: "desc" }, include: { _count: { select: { fields: true } } } },
      qualityMeasurements: { orderBy: { createdAt: "desc" }, include: { rows: true, measuredBy: { select: { name: true } } } },
      corrections: { orderBy: { createdAt: "desc" }, include: { requestedBy: { select: { name: true } } } },
      sharingRequests: { orderBy: { createdAt: "desc" }, include: { requester: { select: { name: true } }, approvedBy: { select: { name: true } } } },
      aiApprovals: { orderBy: { createdAt: "desc" }, include: { approvedBy: { select: { name: true } } } },
    },
  });
  if (!d) notFound();

  const childIds = [
    id,
    ...d.dictionaryVersions.map((v) => v.id),
    ...d.qualityMeasurements.map((q) => q.id),
    ...d.corrections.map((c) => c.id),
    ...d.sharingRequests.map((s) => s.id),
    ...d.aiApprovals.map((a) => a.id),
  ];
  const auditEntries = await prisma.m34AuditEntry.findMany({
    where: { itemId: { in: childIds } },
    orderBy: { ts: "asc" },
    include: { actor: { select: { name: true } } },
  });

  const now = new Date();
  const activeDict = d.dictionaryVersions.find((v) => v.status === "ACTIVE");
  const lastQ = d.qualityMeasurements[0];
  const isOwner = actor?.id === d.ownerId;
  const isSteward = actor?.id === d.stewardId;

  const dt = "text-ink-3";
  const dd = "text-ink";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-ink-3">{d.code}</p>
          <h1 className="font-head text-2xl font-bold text-ink">{d.name}</h1>
          <p className="mt-1 text-sm text-ink-2">
            {DATA_GROUP_LABEL[d.dataGroup]} · {DATASET_STATUS_LABEL[d.status]} · Giai đoạn {LIFECYCLE_LABEL[d.lifecycleStage]}
          </p>
        </div>
        <Link href="/modules/M34" className="text-xs text-accent hover:underline">
          ← Danh mục dữ liệu số
        </Link>
      </div>

      {d.suspendedUse && (
        <p className="rounded-xl border border-crit/30 bg-crit-soft px-4 py-3 text-sm text-crit">
          <strong>Đang dừng sử dụng.</strong> {d.suspendReason}
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-3 rounded-xl border border-border bg-surface p-4 text-sm sm:grid-cols-2">
            <dt className={dt}>Mục đích</dt>
            <dd className={dd}>{d.purpose}</dd>
            <dt className={dt}>Chủ sở hữu dữ liệu (CSHDL)</dt>
            <dd className={dd}>{d.owner.name}</dd>
            <dt className={dt}>Người quản trị dữ liệu (QTDL)</dt>
            <dd className={dd}>{d.steward.name}</dd>
            <dt className={dt}>Mức phân loại</dt>
            <dd className={dd}>
              {CLASSIFICATION_LABEL[d.classification]}
              {(d.classification === "HAN_CHE" || d.classification === "MAT") && (
                <span className="ml-2 rounded-full bg-crit-soft px-2 py-0.5 text-xs font-medium text-crit">Cấm dùng cho AI (R22)</span>
              )}
            </dd>
            <dt className={dt}>Dữ liệu cá nhân</dt>
            <dd className={dd}>
              {d.hasPersonalData ? `Có — ${d.personalDataLegalRef ?? "chưa ghi văn bản áp dụng"}` : "Không"}
            </dd>
            <dt className={dt}>Nơi lưu</dt>
            <dd className={dd}>
              {[d.platformRef && `Nền tảng: ${d.platformRef}`, d.infraRef && `Hạ tầng: ${d.infraRef}`].filter(Boolean).join(" · ") || "—"}
              {d.copiesNote ? ` · Bản sao: ${d.copiesNote}` : ""}
            </dd>
            <dt className={dt}>Chỉ số chất lượng (R4)</dt>
            <dd className={dd}>{d.qualityMetricsNote ?? "— chưa khai (chặn phê duyệt)"}</dd>
            <dt className={dt}>Thời hạn lưu</dt>
            <dd className={dd}>
              {d.activeRetention ?? "—"} · Căn cứ: {d.retentionBasis}
            </dd>
            <dt className={dt}>Khai thác</dt>
            <dd className={dd}>
              Đọc: {d.readScope ?? "—"} · Sửa: {d.writeScope ?? "—"} · Ra ngoài: {d.externalSharingNote ?? "—"}
            </dd>
            <dt className={dt}>Liên kết</dt>
            <dd className={dd}>
              {[d.infoAssetRef && `M27: ${d.infoAssetRef}`, d.recordRef && `M15: ${d.recordRef}`].filter(Boolean).join(" · ") || "—"}
            </dd>
            <dt className={dt}>Rà soát định kỳ</dt>
            <dd className={dd}>
              {REVIEW_CYCLE_LABEL[d.reviewCycle]} · Lần gần nhất: {d.lastReviewedAt ? d.lastReviewedAt.toLocaleDateString("vi-VN") : "chưa"}
              {d.status === "ACTIVE" && isReviewDue(d.reviewCycle, d.lastReviewedAt, d.createdAt, now) && (
                <span className="ml-2 rounded-full bg-warn-soft px-2 py-0.5 text-xs font-medium text-warn">Đến hạn rà soát</span>
              )}
            </dd>
            <dt className={dt}>Truy xuất nguồn gốc (R20)</dt>
            <dd className={dd}>{d.lineageNote ?? "—"}</dd>
            <dt className={dt}>Người lập / phê duyệt</dt>
            <dd className={dd}>
              {d.createdBy.name} / {d.approvedBy?.name ?? "chưa"}
            </dd>
            {d.reason && (
              <>
                <dt className={dt}>Lý do gần nhất</dt>
                <dd className={dd}>{d.reason}</dd>
              </>
            )}
          </dl>

          <section className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-head text-sm font-bold text-ink">Từ điển dữ liệu {d.dictionaryRequired ? "(bắt buộc — R3)" : "(không bắt buộc với nhóm này)"}</h2>
              <Link href={`/modules/M34/dataset/${d.id}/dictionary`} className="text-xs font-semibold text-accent hover:underline">
                Quản lý từ điển →
              </Link>
            </div>
            <p className="mt-2 text-sm text-ink-2">
              {activeDict
                ? `Phiên bản hiệu lực: v${activeDict.version} (${activeDict._count.fields} trường, hiệu lực ${activeDict.effectiveDate?.toLocaleDateString("vi-VN") ?? "—"})`
                : "Chưa có phiên bản hiệu lực."}
              {" · "}
              {d.dictionaryVersions.length} phiên bản:{" "}
              {d.dictionaryVersions.map((v) => `v${v.version} (${DICT_STATUS_LABEL[v.status]})`).join(", ") || "chưa có"}
            </p>
          </section>

          <QualitySection
            dataSetId={d.id}
            dataGroup={d.dataGroup}
            qualityDue={d.status === "ACTIVE" && isQualityDue(d.dataGroup, lastQ?.measuredAt ?? lastQ?.createdAt ?? null, d.approvedAt ?? d.createdAt, now)}
            suspendedUse={d.suspendedUse}
            m34Role={actor?.m34Role ?? null}
            measurements={d.qualityMeasurements.map((q) => ({
              id: q.id,
              code: q.code,
              period: q.period,
              status: q.status,
              trend: q.trend,
              belowThresholdCase: q.belowThresholdCase,
              remediationPlan: q.remediationPlan,
              capaRef: q.capaRef,
              measuredByName: q.measuredBy?.name ?? null,
              rows: q.rows.map((r) => ({
                dimension: r.dimension,
                metric: r.metric,
                threshold: r.threshold,
                value: r.value,
                passed: r.passed,
              })),
            }))}
          />

          <CorrectionSection
            dataSetId={d.id}
            m34Role={actor?.m34Role ?? null}
            isOwner={isOwner}
            isSteward={isSteward}
            corrections={d.corrections.map((c) => ({
              id: c.id,
              code: c.code,
              recordPointer: c.recordPointer,
              oldValue: c.oldValue,
              newValue: c.newValue,
              correctionReason: c.correctionReason,
              status: c.status,
              publishedImpact: c.publishedImpact,
              validityRef: c.validityRef,
              validityConclusion: c.validityConclusion,
              correctionRecordId: c.correctionRecordId,
              requestedByName: c.requestedBy.name,
              reason: c.reason,
            }))}
          />

          <SharingSection
            dataSetId={d.id}
            m34Role={actor?.m34Role ?? null}
            isOwner={isOwner}
            sharings={d.sharingRequests.map((s) => ({
              id: s.id,
              code: s.code,
              requestType: s.requestType,
              recipient: s.recipient,
              purpose: s.purpose,
              scopeNote: s.scopeNote,
              channel: s.channel,
              status: s.status,
              atttOpinionById: s.atttOpinionById,
              approvedByName: s.approvedBy?.name ?? null,
              requesterName: s.requester.name,
              revokeDue: s.revokeDue?.toISOString() ?? null,
              reason: s.reason,
            }))}
          />

          <AISection
            dataSetId={d.id}
            classification={d.classification}
            m34Role={actor?.m34Role ?? null}
            approvals={d.aiApprovals.map((a) => ({
              id: a.id,
              code: a.code,
              aiPurpose: a.aiPurpose,
              aiSystemRef: a.aiSystemRef,
              aiaRef: a.aiaRef,
              mitigation: a.mitigation,
              status: a.status,
              atttOpinionById: a.atttOpinionById,
              approvedByName: a.approvedBy?.name ?? null,
              reason: a.reason,
            }))}
          />

          <div>
            <h2 className="mb-2 font-head text-sm font-bold text-ink">Nhật ký (append-only — ETV.P34 §6.6)</h2>
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
          <DataSetActionPanel
            id={d.id}
            status={d.status}
            m34Role={actor?.m34Role ?? null}
            isOwner={isOwner}
            suspendedUse={d.suspendedUse}
            disposal={{
              retentionExpired: d.disposalRetentionExpired,
              notBasis: d.disposalNotBasis,
              noDispute: d.disposalNoDispute,
              noDependent: d.disposalNoDependent,
              atttConfirmed: Boolean(d.disposalAtttConfirmedById),
              disposalRecordRef: d.disposalRecordRef,
            }}
          />
        </div>
      </div>
    </div>
  );
}
