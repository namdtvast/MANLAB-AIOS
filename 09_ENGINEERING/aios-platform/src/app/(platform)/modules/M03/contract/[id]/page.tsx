import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getM03Role } from "@/lib/m03/actor";
import { CONTRACT_STATUS_LABEL, CONTRACT_TYPE_LABEL } from "@/lib/m03/labels";
import { ContractActionPanel } from "./ActionPanel";

export default async function M03ContractDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [contract, m03Role] = await Promise.all([
    prisma.m03LaborContract.findUnique({ where: { id }, include: { employee: true, signedBy: true } }),
    getM03Role(),
  ]);
  if (!contract) notFound();

  const auditEntries = await prisma.m03AuditEntry.findMany({
    where: { itemType: "LABOR_CONTRACT", itemId: id },
    orderBy: { ts: "asc" },
    include: { actor: true },
  });

  const renewalHistory = Array.isArray(contract.renewalHistory) ? (contract.renewalHistory as Record<string, unknown>[]) : [];

  return (
    <div className="grid max-w-4xl grid-cols-3 gap-6">
      <div className="col-span-2 flex flex-col gap-4">
        <div>
          <p className="font-mono text-xs text-ink-3">{contract.code}</p>
          <h1 className="font-head text-2xl font-bold text-ink">Hợp đồng lao động — {contract.employee.fullName}</h1>
          <p className="mt-1 text-sm text-ink-2">
            {CONTRACT_TYPE_LABEL[contract.contractType]} · {CONTRACT_STATUS_LABEL[contract.status]}
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl border border-border bg-surface p-4 text-sm">
          <dt className="text-ink-3">Thời hạn</dt>
          <dd className="text-ink">{contract.duration ?? "—"}</dd>
          <dt className="text-ink-3">Lương</dt>
          <dd className="text-ink">{contract.salary ? contract.salary.toLocaleString("vi-VN") + " đ" : "—"}</dd>
          <dt className="text-ink-3">Ngày hiệu lực</dt>
          <dd className="text-ink">{contract.effectiveDate ? contract.effectiveDate.toLocaleDateString("vi-VN") : "—"}</dd>
          <dt className="text-ink-3">Ngày hết hạn</dt>
          <dd className="text-ink">{contract.expiryDate ? contract.expiryDate.toLocaleDateString("vi-VN") : "—"}</dd>
          <dt className="text-ink-3">Người ký</dt>
          <dd className="text-ink">{contract.signedBy?.name ?? "—"}</dd>
        </dl>

        {renewalHistory.length > 0 && (
          <div className="rounded-xl border border-border bg-surface p-4 text-sm">
            <p className="mb-2 text-ink-3">Lịch sử gia hạn</p>
            <ul className="list-inside list-disc text-ink">
              {renewalHistory.map((h, i) => (
                <li key={i}>{JSON.stringify(h)}</li>
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
        <ContractActionPanel id={contract.id} status={contract.status} m03Role={m03Role} />
      </div>
    </div>
  );
}
