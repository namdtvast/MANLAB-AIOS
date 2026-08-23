import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getM02Role } from "@/lib/m02/actor";
import { AUTHORITY_LEVEL_LABEL, DISCLOSURE_STATUS_LABEL } from "@/lib/m02/labels";
import { DisclosureActionPanel } from "./ActionPanel";

export default async function M02DisclosureDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [d, m02Role] = await Promise.all([
    prisma.m02DisclosureApproval.findUnique({ where: { id }, include: { approvedBy: true } }),
    getM02Role(),
  ]);
  if (!d) notFound();

  const auditEntries = await prisma.m02AuditEntry.findMany({
    where: { itemType: "DISCLOSURE", itemId: id },
    orderBy: { ts: "asc" },
    include: { actor: true },
  });

  return (
    <div className="grid max-w-4xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="col-span-2 flex flex-col gap-4">
        <div>
          <p className="font-mono text-xs text-ink-3">{d.code}</p>
          <h1 className="font-head text-2xl font-bold text-ink">Công bố tới {d.recipient}</h1>
          <p className="mt-1 text-sm text-ink-2">
            Thẩm quyền: {AUTHORITY_LEVEL_LABEL[d.authorityLevel]} · {DISCLOSURE_STATUS_LABEL[d.status]}
          </p>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 rounded-xl border border-border bg-surface p-4 text-sm">
          <dt className="text-ink-3">Căn cứ</dt>
          <dd className="text-ink">{d.basis}</dd>
          <dt className="text-ink-3">Nội dung</dt>
          <dd className="text-ink">{d.content}</dd>
          <dt className="text-ink-3">Đã thông báo khách hàng</dt>
          <dd className="text-ink">{d.customerNotified ? "Có" : "Không"}</dd>
          <dt className="text-ink-3">Pháp luật cấm thông báo</dt>
          <dd className="text-ink">{d.legallyProhibitedNotify ? "Có" : "Không"}</dd>
          <dt className="text-ink-3">Người phê duyệt</dt>
          <dd className="text-ink">{d.approvedBy?.name ?? "—"}</dd>
        </dl>

        <div>
          <h2 className="mb-2 font-head text-sm font-bold text-ink">Nhật ký</h2>
          <ul className="flex flex-col gap-2 text-sm">
            {auditEntries.map((e) => (
              <li key={e.id} className="rounded-lg border border-border bg-surface p-3">
                <p className="text-ink">
                  <span className="text-ink-3">{e.ts.toLocaleString("vi-VN")}</span> · {e.actor.name} ({e.role}) — {e.action}
                </p>
              </li>
            ))}
            {auditEntries.length === 0 && (
              <li className="rounded-lg border border-border bg-surface p-3 text-ink-3">Chưa có sự kiện nào.</li>
            )}
          </ul>
        </div>
      </div>

      <div>
        <DisclosureActionPanel id={d.id} status={d.status} authorityLevel={d.authorityLevel} m02Role={m02Role} />
      </div>
    </div>
  );
}
