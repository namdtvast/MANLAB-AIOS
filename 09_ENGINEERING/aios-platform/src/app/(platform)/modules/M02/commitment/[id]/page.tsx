import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getM02Role } from "@/lib/m02/actor";
import { COMMITMENT_STATUS_LABEL, COMMITMENT_TYPE_LABEL } from "@/lib/m02/labels";
import { CommitmentActionPanel } from "./ActionPanel";

export default async function M02CommitmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [commitment, m02Role] = await Promise.all([
    prisma.m02SecurityCommitment.findUnique({ where: { id }, include: { employee: true, revokedBy: true } }),
    getM02Role(),
  ]);
  if (!commitment) notFound();

  const auditEntries = await prisma.m02AuditEntry.findMany({
    where: { itemType: "COMMITMENT", itemId: id },
    orderBy: { ts: "asc" },
    include: { actor: true },
  });

  return (
    <div className="grid max-w-4xl grid-cols-3 gap-6">
      <div className="col-span-2 flex flex-col gap-4">
        <div>
          <p className="font-mono text-xs text-ink-3">{commitment.code}</p>
          <h1 className="font-head text-2xl font-bold text-ink">{commitment.personName}</h1>
          <p className="mt-1 text-sm text-ink-2">
            {COMMITMENT_TYPE_LABEL[commitment.type]} · {COMMITMENT_STATUS_LABEL[commitment.status]}
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl border border-border bg-surface p-4 text-sm">
          <dt className="text-ink-3">Tổ chức</dt>
          <dd className="text-ink">{commitment.org ?? "—"}</dd>
          <dt className="text-ink-3">Ngày ký</dt>
          <dd className="text-ink">{commitment.signedDate.toLocaleDateString("vi-VN")}</dd>
          <dt className="text-ink-3">Phạm vi tiếp cận</dt>
          <dd className="text-ink">{commitment.accessScope}</dd>
          <dt className="text-ink-3">Nhân sự liên kết (M03)</dt>
          <dd className="text-ink">{commitment.employee ? `${commitment.employee.code} — ${commitment.employee.fullName}` : "—"}</dd>
          {commitment.status === "DA_THU_HOI" && (
            <>
              <dt className="text-ink-3">Người thu hồi</dt>
              <dd className="text-ink">{commitment.revokedBy?.name ?? "—"}</dd>
              <dt className="text-ink-3">Lý do thu hồi</dt>
              <dd className="text-ink">{commitment.revokeReason ?? "—"}</dd>
            </>
          )}
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
        <CommitmentActionPanel id={commitment.id} status={commitment.status} m02Role={m02Role} />
      </div>
    </div>
  );
}
