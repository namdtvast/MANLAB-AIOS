import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getActor, getM01Role } from "@/lib/m01/actor";
import { listAssignableUsers } from "@/lib/m01/actions";
import { OPP_SOURCE_LABEL, RISK_LEVEL_LABEL, RISK_SOURCE_LABEL, STATUS_LABEL, VERIFY_RESULT_LABEL } from "@/lib/m01/labels";
import { ActionPanel } from "./ActionPanel";
import { EditPanel } from "./EditPanel";

export default async function M01DetailPage({ params }: { params: Promise<{ type: string; id: string }> }) {
  const { type, id } = await params;
  if (type !== "risk" && type !== "opportunity") notFound();

  const [item, m01Role, actor, assignableUsers] = await Promise.all([
    type === "risk"
      ? prisma.m01RiskItem.findUnique({
          where: { id },
          include: { createdBy: true, reviewedBy: true, approvedBy: true, assignee: true, verifiedBy: true },
        })
      : prisma.m01OpportunityItem.findUnique({
          where: { id },
          include: { createdBy: true, reviewedBy: true, approvedBy: true, assignee: true, verifiedBy: true },
        }),
    getM01Role(),
    getActor().catch(() => null),
    listAssignableUsers(),
  ]);

  if (!item) notFound();

  const auditEntries = await prisma.m01AuditEntry.findMany({
    where: { itemType: type === "risk" ? "RISK" : "OPPORTUNITY", itemId: id },
    orderBy: { ts: "asc" },
    include: { actor: true },
  });

  const isRisk = type === "risk";

  return (
    <div className="grid max-w-4xl grid-cols-3 gap-6">
      <div className="col-span-2 flex flex-col gap-4">
        <div>
          <p className="font-mono text-xs text-ink-3">{item.code}</p>
          <h1 className="font-head text-2xl font-bold text-ink">{item.title}</h1>
          <p className="mt-1 text-sm text-ink-2">
            {isRisk ? "Rủi ro" : "Cơ hội"} · {STATUS_LABEL[item.status]}
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl border border-border bg-surface p-4 text-sm">
          <dt className="text-ink-3">Mô tả</dt>
          <dd className="text-ink">{item.description}</dd>
          <dt className="text-ink-3">Nguồn gốc</dt>
          <dd className="text-ink">
            {isRisk
              ? RISK_SOURCE_LABEL[(item as { source: string }).source]
              : OPP_SOURCE_LABEL[(item as { source: string }).source]}
          </dd>
          {isRisk && (
            <>
              <dt className="text-ink-3">Nguyên nhân</dt>
              <dd className="text-ink">{(item as { cause: string | null }).cause ?? "—"}</dd>
              <dt className="text-ink-3">Biện pháp kiểm soát</dt>
              <dd className="text-ink">{(item as { controlMeasure: string | null }).controlMeasure ?? "—"}</dd>
              <dt className="text-ink-3">S × P = R</dt>
              <dd className="text-ink">
                {(item as { severity: number | null }).severity ?? "—"} × {(item as { possibility: number | null }).possibility ?? "—"} ={" "}
                {(item as { riskScore: number | null }).riskScore ?? "—"}
              </dd>
              <dt className="text-ink-3">Mức độ rủi ro</dt>
              <dd className="text-ink">
                {(item as { riskLevel: string | null }).riskLevel
                  ? RISK_LEVEL_LABEL[(item as { riskLevel: string }).riskLevel]
                  : "—"}
              </dd>
            </>
          )}
          {!isRisk && (
            <>
              <dt className="text-ink-3">Biện pháp đề xuất</dt>
              <dd className="text-ink">{(item as { proposedAction: string | null }).proposedAction ?? "—"}</dd>
            </>
          )}
          <dt className="text-ink-3">Người phụ trách</dt>
          <dd className="text-ink">{item.assignee?.name ?? "—"}</dd>
          <dt className="text-ink-3">Thời hạn</dt>
          <dd className="text-ink">{item.dueDate ? item.dueDate.toLocaleDateString("vi-VN") : "—"}</dd>
          <dt className="text-ink-3">Bằng chứng thực hiện</dt>
          <dd className="text-ink">{item.evidence ?? "—"}</dd>
          <dt className="text-ink-3">Kết quả thẩm xét</dt>
          <dd className="text-ink">{item.verifyResult ? VERIFY_RESULT_LABEL[item.verifyResult] : "—"}</dd>
          <dt className="text-ink-3">Người tạo</dt>
          <dd className="text-ink">{item.createdBy.name}</dd>
          <dt className="text-ink-3">Người soát xét</dt>
          <dd className="text-ink">{item.reviewedBy?.name ?? "—"}</dd>
          <dt className="text-ink-3">Người phê duyệt</dt>
          <dd className="text-ink">{item.approvedBy?.name ?? "—"}</dd>
          <dt className="text-ink-3">Người thẩm xét</dt>
          <dd className="text-ink">{item.verifiedBy?.name ?? "—"}</dd>
        </dl>

        {item.status === "DRAFT" && item.createdById === actor?.id && (
          <EditPanel type={type} id={item.id} isRisk={isRisk} initial={item} />
        )}

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
        <ActionPanel
          type={type}
          id={item.id}
          status={item.status}
          riskLevel={isRisk ? (item as { riskLevel: string | null }).riskLevel : null}
          assigneeId={item.assigneeId}
          hasEvidence={!!item.evidence}
          m01Role={m01Role}
          currentUserId={actor?.id ?? null}
          assignableUsers={assignableUsers}
        />
      </div>
    </div>
  );
}
