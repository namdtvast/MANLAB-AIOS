import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getActor } from "@/lib/m33/actor";
import { baselineIssues, isMaintenanceDue, isReviewDue } from "@/lib/m33/rules";
import {
  ACCOUNT_STATUS_LABEL,
  ASSET_CLASS_LABEL,
  ASSET_STATUS_LABEL,
  CRITICALITY_LABEL,
  DISCOVERY_LABEL,
  ENVIRONMENT_LABEL,
  INCIDENT_STATUS_LABEL,
  MAINTENANCE_CYCLE_LABEL,
  NETWORK_ZONE_LABEL,
  PRIORITY_LABEL,
  TASK_STATUS_LABEL,
  TASK_TYPE_LABEL,
} from "@/lib/m33/labels";
import { CLASSIFICATION_LABEL } from "@/lib/m34/labels";
import { AssetActionPanel } from "./AssetActionPanel";

export default async function M33AssetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let actor: { id: string; m33Role: string | null } | null = null;
  try {
    actor = await getActor();
  } catch {
    actor = null;
  }

  const a = await prisma.m33ITAsset.findUnique({
    where: { id },
    include: {
      custodian: { select: { name: true } },
      userOwner: { select: { name: true } },
      createdBy: { select: { name: true } },
      approvedBy: { select: { name: true } },
      tasks: { orderBy: { createdAt: "desc" }, take: 10, select: { id: true, code: true, taskType: true, status: true, dueAt: true } },
      accounts: { orderBy: { createdAt: "desc" }, select: { id: true, code: true, loginName: true, status: true } },
      incidents: { orderBy: { reportedAt: "desc" }, take: 10, select: { id: true, code: true, priority: true, status: true, description: true } },
    },
  });
  if (!a) notFound();

  const auditEntries = await prisma.m33AuditEntry.findMany({
    where: { itemType: "ASSET", itemId: id },
    orderBy: { ts: "asc" },
    include: { actor: { select: { name: true } } },
  });

  const now = new Date();
  const issues = baselineIssues(a);
  const dt = "text-ink-3";
  const dd = "text-ink";
  const d = (x: Date | null) => (x ? x.toLocaleDateString("vi-VN") : "—");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-ink-3">{a.code}</p>
          <h1 className="font-head text-2xl font-bold text-ink">{a.name}</h1>
          <p className="mt-1 text-sm text-ink-2">
            {ASSET_CLASS_LABEL[a.assetClass]} · {ASSET_STATUS_LABEL[a.status]} · Trọng yếu {CRITICALITY_LABEL[a.criticality]}
            {a.networkIsolated && <span className="ml-2 rounded-full bg-crit-soft px-2 py-0.5 text-xs font-medium text-crit">Đã ngắt mạng</span>}
          </p>
        </div>
        <Link href="/modules/M33" className="text-xs text-accent hover:underline">
          ← Danh mục hạ tầng
        </Link>
      </div>

      {issues.length > 0 && a.status !== "DISPOSED" && a.status !== "CANCELLED" && (
        <p className="rounded-xl border border-warn/30 bg-warn-soft px-4 py-3 text-sm text-warn">
          Thiếu cấu hình an toàn cơ sở (R3): {issues.join("; ")}.
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-3 rounded-xl border border-border bg-surface p-4 text-sm sm:grid-cols-2">
            <dt className={dt}>Model / Serial</dt>
            <dd className={dd}>
              {a.model ?? "—"} / {a.serial ?? "—"}
            </dd>
            <dt className={dt}>Vùng mạng · Môi trường</dt>
            <dd className={dd}>
              {a.networkZone ? NETWORK_ZONE_LABEL[a.networkZone] : "—"} · {ENVIRONMENT_LABEL[a.environment]}
            </dd>
            <dt className={dt}>Vị trí</dt>
            <dd className={dd}>{a.location}</dd>
            <dt className={dt}>Chủ quản trị / Đơn vị sử dụng</dt>
            <dd className={dd}>
              {a.custodian.name} / {a.userOwner.name}
            </dd>
            <dt className={dt}>Phân loại tối đa</dt>
            <dd className={dd}>
              {CLASSIFICATION_LABEL[a.maxClassification]} · Mã hóa ổ đĩa: {a.diskEncryption ? "có" : "chưa"}
            </dd>
            <dt className={dt}>Nguồn ghi nhận</dt>
            <dd className={dd}>
              {DISCOVERY_LABEL[a.discoverySource]}
              {a.inventoryDueAt && ` · hạn vào vận hành ${d(a.inventoryDueAt)} (R17)`}
            </dd>
            <dt className={dt}>Bảo trì</dt>
            <dd className={dd}>
              {MAINTENANCE_CYCLE_LABEL[a.maintenanceCycle]} · lần cuối {d(a.lastMaintainedAt)}
              {a.status === "OPERATING" && isMaintenanceDue(a.maintenanceCycle, a.lastMaintainedAt, a.commissionedAt ?? a.createdAt, now) && (
                <span className="ml-2 rounded-full bg-warn-soft px-2 py-0.5 text-xs font-medium text-warn">Đến hạn</span>
              )}
            </dd>
            <dt className={dt}>Rà soát định kỳ (R12)</dt>
            <dd className={dd}>
              {a.reviewCycleMonths} tháng · lần cuối {d(a.lastReviewedAt)}
              {a.status === "OPERATING" && isReviewDue(a.reviewCycleMonths, a.lastReviewedAt, a.commissionedAt ?? a.createdAt, now) && (
                <span className="ml-2 rounded-full bg-warn-soft px-2 py-0.5 text-xs font-medium text-warn">Đến hạn</span>
              )}
            </dd>
            <dt className={dt}>Vá lỗi</dt>
            <dd className={dd}>
              {a.patchLevel ?? "—"} · lần cuối {d(a.lastPatchedAt)}
            </dd>
            <dt className={dt}>Bản quyền / Bảo hành / EOL</dt>
            <dd className={dd}>
              {a.licenseType ? `${a.licenseType} đến ${d(a.licenseExpiry)}` : "—"} · BH {d(a.warrantyUntil)} · EOL {d(a.eolDate)}
              {a.eolDate && a.eolDate < now && a.status === "OPERATING" && (
                <span className="ml-2 rounded-full bg-crit-soft px-2 py-0.5 text-xs font-medium text-crit">EOL còn vận hành (R11)</span>
              )}
            </dd>
            {a.criticality === "CAO" && (
              <>
                <dt className={dt}>RTO / Phương án dự phòng</dt>
                <dd className={dd}>
                  {a.recoveryTimeObjective ?? "—"} / {a.failoverPlan ?? "—"}
                </dd>
              </>
            )}
            <dt className={dt}>Liên kết</dt>
            <dd className={dd}>
              {[
                a.platformRefs.length > 0 && `M35: ${a.platformRefs.join(", ")}`,
                a.infoAssetRefs.length > 0 && `M27: ${a.infoAssetRefs.join(", ")}`,
                a.measuringDeviceRef && `M05: ${a.measuringDeviceRef}`,
                a.riskRefs.length > 0 && `Rủi ro: ${a.riskRefs.join(", ")}`,
              ]
                .filter(Boolean)
                .join(" · ") || "—"}
            </dd>
            <dt className={dt}>BYOD</dt>
            <dd className={dd}>{a.isPersonalDevice ? `Có — phê duyệt: ${a.byodApprovalRef ?? "chưa"}` : "Không"}</dd>
            <dt className={dt}>Bằng chứng xóa dữ liệu (R10)</dt>
            <dd className={dd}>{a.disposalEvidenceRef ?? "—"}</dd>
            <dt className={dt}>Người lập / phê duyệt</dt>
            <dd className={dd}>
              {a.createdBy.name} / {a.approvedBy?.name ?? "chưa"}
            </dd>
            {a.reason && (
              <>
                <dt className={dt}>Lý do gần nhất</dt>
                <dd className={dd}>{a.reason}</dd>
              </>
            )}
          </dl>

          <section className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-head text-sm font-bold text-ink">Bảo trì – vá lỗi gần đây</h2>
              <Link href="/modules/M33/maintenance" className="text-xs font-semibold text-accent hover:underline">
                Tất cả →
              </Link>
            </div>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-ink-2">
              {a.tasks.map((t) => (
                <li key={t.id}>
                  <span className="font-mono text-xs">{t.code}</span> · {TASK_TYPE_LABEL[t.taskType]} · {TASK_STATUS_LABEL[t.status]}
                  {t.dueAt && ` · hạn ${t.dueAt.toLocaleDateString("vi-VN")}`}
                </li>
              ))}
              {a.tasks.length === 0 && <li className="text-ink-3">Chưa có công việc nào.</li>}
            </ul>
          </section>

          <section className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-head text-sm font-bold text-ink">Tài khoản trên tài sản</h2>
              <Link href="/modules/M33/accounts" className="text-xs font-semibold text-accent hover:underline">
                Tất cả →
              </Link>
            </div>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-ink-2">
              {a.accounts.map((s) => (
                <li key={s.id}>
                  <span className="font-mono text-xs">{s.code}</span> · {s.loginName} · {ACCOUNT_STATUS_LABEL[s.status]}
                </li>
              ))}
              {a.accounts.length === 0 && <li className="text-ink-3">Chưa ghi nhận tài khoản nào.</li>}
            </ul>
          </section>

          <section className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-head text-sm font-bold text-ink">Sự cố gần đây</h2>
              <Link href="/modules/M33/incidents" className="text-xs font-semibold text-accent hover:underline">
                Tất cả →
              </Link>
            </div>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-ink-2">
              {a.incidents.map((i) => (
                <li key={i.id}>
                  <span className="font-mono text-xs">{i.code}</span> · {PRIORITY_LABEL[i.priority]} · {INCIDENT_STATUS_LABEL[i.status]} — {i.description.slice(0, 80)}
                </li>
              ))}
              {a.incidents.length === 0 && <li className="text-ink-3">Chưa có sự cố nào.</li>}
            </ul>
          </section>

          <div>
            <h2 className="mb-2 font-head text-sm font-bold text-ink">Nhật ký (append-only — ETV.P28 mục 5.7.5)</h2>
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
          <AssetActionPanel
            id={a.id}
            status={a.status}
            m33Role={actor?.m33Role ?? null}
            hasDisposalEvidence={Boolean(a.disposalEvidenceRef)}
            refs={{ platformRefs: a.platformRefs, infoAssetRefs: a.infoAssetRefs, measuringDeviceRef: a.measuringDeviceRef }}
          />
        </div>
      </div>
    </div>
  );
}
