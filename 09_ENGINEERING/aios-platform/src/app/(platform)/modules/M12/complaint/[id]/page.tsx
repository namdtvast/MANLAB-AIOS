import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getM12Role } from "@/lib/m12/actor";
import { listAssignableUsers } from "@/lib/m12/actions";
import { CHANNEL_LABEL, COMPLAINT_STATUS_LABEL } from "@/lib/m12/labels";
import { ComplaintActionPanel } from "./ActionPanel";

export default async function M12ComplaintDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [c, m12Role, assignable] = await Promise.all([
    prisma.m12Complaint.findUnique({ where: { id }, include: { createdBy: true, assignedTo: true } }),
    getM12Role(),
    listAssignableUsers(),
  ]);
  if (!c) notFound();

  const auditEntries = await prisma.m12AuditEntry.findMany({
    where: { itemType: "COMPLAINT", itemId: id },
    orderBy: { ts: "asc" },
    include: { actor: true },
  });

  return (
    <div className="grid max-w-4xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="col-span-2 flex flex-col gap-4">
        <div>
          <p className="font-mono text-xs text-ink-3">{c.code}</p>
          <h1 className="font-head text-2xl font-bold text-ink">Khiếu nại — {CHANNEL_LABEL[c.channel]}</h1>
          <p className="mt-1 text-sm text-ink-2">
            {COMPLAINT_STATUS_LABEL[c.status]}
            {c.isComplex ? " · Phức tạp/ảnh hưởng lớn" : ""}
          </p>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 rounded-xl border border-border bg-surface p-4 text-sm">
          <dt className="text-ink-3">Nội dung</dt>
          <dd className="col-span-1 text-ink">{c.content}</dd>
          <dt className="text-ink-3">Người tiếp nhận</dt>
          <dd className="text-ink">{c.createdBy.name}</dd>
          <dt className="text-ink-3">Cán bộ phụ trách</dt>
          <dd className="text-ink">{c.assignedTo?.name ?? "—"}</dd>
          <dt className="text-ink-3">Giải thích ngay tại chỗ?</dt>
          <dd className="text-ink">{c.resolvedOnSpot ? (c.customerSatisfiedOnSpot ? "Có — khách hài lòng" : "Có — khách chưa hài lòng") : "Không"}</dd>
          <dt className="text-ink-3">Văn bản khiếu nại (F14.03)</dt>
          <dd className="text-ink">{c.externalDocRef ?? "Chưa có"}</dd>
          <dt className="text-ink-3">Liên quan GCN (→ M11)</dt>
          <dd className="text-ink">{c.relatedCertificateRef ?? "—"}</dd>
          {c.resolution && (
            <>
              <dt className="text-ink-3">Trả lời khách hàng</dt>
              <dd className="text-ink">{c.resolution}</dd>
            </>
          )}
          {c.capaRef && (
            <>
              <dt className="text-ink-3">Hành động khắc phục (→ M13)</dt>
              <dd className="text-ink">{c.capaRef}</dd>
            </>
          )}
          {c.stopReason && (
            <>
              <dt className="text-ink-3">Lý do dừng giải quyết</dt>
              <dd className="text-crit">{c.stopReason}</dd>
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
        <ComplaintActionPanel
          id={c.id}
          status={c.status}
          m12Role={m12Role}
          resolvedOnSpot={c.resolvedOnSpot}
          customerSatisfiedOnSpot={c.customerSatisfiedOnSpot}
          isComplex={c.isComplex}
          externalDocRef={c.externalDocRef}
          capaRef={c.capaRef}
          assignableUsers={assignable.map((u) => ({ id: u.id, name: u.name ?? u.email }))}
        />
      </div>
    </div>
  );
}
