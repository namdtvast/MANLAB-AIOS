import { prisma } from "@/lib/prisma";
import { getM29Role } from "@/lib/m29/actor";
import { can } from "@/lib/m29/model";

export default async function M29AuditPage() {
  const role = await getM29Role();
  // DacTa.md M29 mục 4, cột Audit: chỉ AI_AUDITOR và SUPER_ADMIN được đọc.
  if (!can(role, "audit")) {
    return <div className="rounded-xl border border-crit/30 bg-crit-soft p-4 text-sm text-crit">Bạn không có quyền xem nhật ký thay đổi cấu hình.</div>;
  }

  const entries = await prisma.aIAuditLog.findMany({
    orderBy: { at: "desc" },
    take: 200,
    include: { actor: true },
  });

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs font-medium text-ink-3">M29 · Audit Log</p>
        <h1 className="font-head text-2xl font-bold text-ink">Nhật ký thay đổi cấu hình</h1>
        <p className="mt-1 text-sm text-ink-2">Append-only — mọi tạo mới/cập nhật/chuyển trạng thái đều ghi lại ai, khi nào, nội dung.</p>
      </div>

      <div className="flex flex-col gap-2">
        {entries.map((e) => (
          <div key={e.id} className="rounded-lg border border-border bg-surface p-3 text-sm">
            <p className="text-ink">
              <span className="text-ink-3">{e.at.toLocaleString("vi-VN")}</span> · {e.actor?.name ?? e.actorLabel ?? "SYSTEM"} ({e.role}) — {e.entityType}/{e.entityId}
              {e.field ? ` · ${e.field}` : ""}
            </p>
            {e.reason && <p className="mt-1 text-xs text-ink-2">{e.reason}</p>}
          </div>
        ))}
        {entries.length === 0 && <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-ink-3">Chưa có audit log nào.</p>}
      </div>
    </div>
  );
}
