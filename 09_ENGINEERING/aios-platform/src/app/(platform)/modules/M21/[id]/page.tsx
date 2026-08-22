import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getM21Role } from "@/lib/m21/actor";
import { isEditable, TRANSITIONS } from "@/lib/m21/rules";
import { RECORD_TYPE_LABEL, STATUS_LABEL } from "@/lib/m21/labels";
import { ActionPanel } from "./ActionPanel";
import { LinesTable } from "./LinesTable";
import { RulesPanel } from "./RulesPanel";

export default async function M21DetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [record, m21Role] = await Promise.all([
    prisma.m21Record.findUnique({
      where: { id },
      include: {
        createdBy: true,
        lines: { orderBy: { createdAt: "asc" } },
        auditEntries: { orderBy: { ts: "asc" }, include: { actor: true } },
      },
    }),
    getM21Role(),
  ]);

  if (!record) notFound();

  const editable = isEditable(record.kyso);
  // Chỉ truyền phần dữ liệu tuần tự hoá được sang Client Component — TransitionDef còn có
  // guard/check dạng hàm, không serialize được qua RPC boundary.
  const availableTransitions = TRANSITIONS[record.status].map(({ to, label, minRole, reason, needReceipt, danger, warn }) => ({
    to,
    label,
    minRole,
    reason,
    needReceipt,
    danger,
    warn,
  }));

  return (
    <div className="grid max-w-6xl grid-cols-3 gap-6">
      <div className="col-span-2 flex flex-col gap-4">
        <div>
          <p className="font-mono text-xs text-ink-3">{record.code}</p>
          <h1 className="font-head text-2xl font-bold text-ink">{record.toChuc}</h1>
          <p className="mt-1 text-sm text-ink-2">
            {RECORD_TYPE_LABEL[record.loai]} · Lần {record.lan} · {STATUS_LABEL[record.status]}
            {record.kyso && <span className="ml-2 font-semibold text-crit">🔒 Đã ký số — dữ liệu khóa (BR1)</span>}
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl border border-border bg-surface p-4 text-sm">
          <dt className="text-ink-3">Địa chỉ</dt>
          <dd className="text-ink">{record.diaChi}</dd>
          <dt className="text-ink-3">Người đại diện pháp luật</dt>
          <dd className="text-ink">{record.daiDien}</dd>
          {record.loai === "DL" && (
            <>
              <dt className="text-ink-3">Địa điểm thực hiện hoạt động</dt>
              <dd className="text-ink">{record.diaDiem || "—"}</dd>
            </>
          )}
          <dt className="text-ink-3">Cơ quan tiếp nhận</dt>
          <dd className="text-ink">{record.coQuanTiepNhan}</dd>
          <dt className="text-ink-3">Ngày gửi / Mã biên nhận</dt>
          <dd className="text-ink">
            {record.ngayGui ? record.ngayGui.toLocaleDateString("vi-VN") : "—"} / {record.maBienNhan ?? "—"}
          </dd>
          <dt className="text-ink-3">Ngày công khai</dt>
          <dd className="text-ink">{record.ngayCongKhai ? record.ngayCongKhai.toLocaleDateString("vi-VN") : "—"}</dd>
          <dt className="text-ink-3">Người tạo</dt>
          <dd className="text-ink">{record.createdBy.name}</dd>
        </dl>

        <LinesTable
          recordId={record.id}
          loai={record.loai}
          editable={editable}
          lines={record.lines.map((l) => ({ ...l }))}
        />

        <RulesPanel record={record} />

        <div>
          <h2 className="mb-2 font-head text-sm font-bold text-ink">Nhật ký</h2>
          <ul className="flex flex-col gap-2 text-sm">
            {record.auditEntries.map((e) => (
              <li key={e.id} className="rounded-lg border border-border bg-surface p-3">
                <p className="text-ink">
                  <span className="text-ink-3">{e.ts.toLocaleString("vi-VN")}</span> · {e.actor.name} ({e.role}) — {e.action}
                </p>
                {e.reason && <p className="mt-1 text-ink-2">Lý do: {e.reason}</p>}
              </li>
            ))}
            {record.auditEntries.length === 0 && (
              <li className="rounded-lg border border-border bg-surface p-3 text-ink-3">Chưa có sự kiện nào.</li>
            )}
          </ul>
        </div>
      </div>

      <div>
        <ActionPanel id={record.id} m21Role={m21Role} transitions={availableTransitions} />
      </div>
    </div>
  );
}
