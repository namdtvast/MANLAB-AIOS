"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createSighting, linkSightingIncident, sightingAction } from "@/lib/m29/actions";

const btn = "cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60";
const fieldCls = "rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent-line";
const labelCls = "flex flex-col gap-1.5 text-sm font-medium text-ink";

export function NewSightingForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  if (!open)
    return (
      <button className="rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90" onClick={() => setOpen(true)}>
        Ghi nhận phát hiện mới
      </button>
    );

  return (
    <form
      className="flex max-w-2xl flex-col gap-4 rounded-xl border border-border bg-surface p-5"
      action={(formData: FormData) => {
        setError(null);
        startTransition(async () => {
          try {
            await createSighting({
              name: String(formData.get("name") ?? ""),
              usedBy: String(formData.get("usedBy") ?? ""),
              dataExposed: String(formData.get("dataExposed") ?? ""),
              sensitiveData: formData.get("sensitiveData") === "on",
              plannedAction: String(formData.get("plannedAction") ?? ""),
            });
            setOpen(false);
            router.refresh();
          } catch (e) {
            setError(e instanceof Error ? e.message : "Có lỗi xảy ra.");
          }
        });
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelCls}>
          Tên hệ thống/dịch vụ AI
          <input name="name" required className={fieldCls} placeholder="vd: dịch vụ tóm tắt tài liệu trực tuyến" />
        </label>
        <label className={labelCls}>
          Người/đơn vị đang dùng
          <input name="usedBy" required className={fieldCls} />
        </label>
      </div>
      <label className={labelCls}>
        Dữ liệu đã đưa vào
        <textarea name="dataExposed" rows={2} className={fieldCls} />
      </label>
      <label className="flex items-start gap-2 text-sm text-ink">
        <input type="checkbox" name="sensitiveData" className="mt-0.5" />
        <span>
          Đã xử lý dữ liệu Hạn chế/Mật hoặc dữ liệu cá nhân
          <span className="block text-xs text-ink-3">Nếu có, bắt buộc mở phiếu sự cố trước khi đóng bản ghi này (ETV.P29 mục 5.1.7).</span>
        </span>
      </label>
      <label className={labelCls}>
        Hướng xử lý dự kiến
        <input name="plannedAction" className={fieldCls} placeholder="vd: hoàn thiện hồ sơ đăng ký / chấm dứt sử dụng" />
      </label>
      <p className="text-xs text-ink-3">Hạn xử lý tự đặt là 15 ngày kể từ ngày phát hiện.</p>
      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}
      <div className="flex gap-2">
        <button type="submit" disabled={isPending} className="cursor-pointer rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink disabled:opacity-60">
          {isPending ? "Đang lưu…" : "Ghi nhận"}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="cursor-pointer rounded-lg border border-border px-4 py-2.5 text-sm text-ink-2">
          Bỏ qua
        </button>
      </div>
    </form>
  );
}

export function SightingActions({
  id,
  status,
  agents,
  incidents,
  hasIncident,
}: {
  id: string;
  status: string;
  agents: { id: string; code: string; name: string }[];
  incidents: { id: string; code: string }[];
  hasIncident: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [agentId, setAgentId] = useState("");
  const [reason, setReason] = useState("");
  const [incidentId, setIncidentId] = useState("");

  if (status === "REGISTERED" || status === "DISCONTINUED") return null;

  const run = (action: "start-registering" | "mark-registered" | "discontinue", extra: Record<string, string> = {}) => {
    setError(null);
    startTransition(async () => {
      const r = await sightingAction(id, action, extra);
      if (!r.ok) setError(`${r.code}: ${r.message}`);
      else router.refresh();
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {status === "OPEN" && (
          <button className={`${btn} bg-accent text-accent-ink`} disabled={isPending} onClick={() => run("start-registering")}>
            Bắt đầu đăng ký
          </button>
        )}
        <select className="rounded-lg border border-border bg-bg px-2 py-1.5 text-xs text-ink" value={agentId} onChange={(e) => setAgentId(e.target.value)}>
          <option value="">— chọn Agent đã đăng ký —</option>
          {agents.map((a) => (
            <option key={a.id} value={a.id}>
              {a.code}
            </option>
          ))}
        </select>
        <button className={`${btn} bg-good text-white`} disabled={isPending} onClick={() => run("mark-registered", { registeredAgentId: agentId })}>
          Đã đăng ký
        </button>
      </div>

      {!hasIncident && (
        <div className="flex flex-wrap items-center gap-2">
          <select className="rounded-lg border border-border bg-bg px-2 py-1.5 text-xs text-ink" value={incidentId} onChange={(e) => setIncidentId(e.target.value)}>
            <option value="">— gắn phiếu sự cố —</option>
            {incidents.map((i) => (
              <option key={i.id} value={i.id}>
                {i.code}
              </option>
            ))}
          </select>
          <button
            className={`${btn} border border-border text-ink-2`}
            disabled={isPending || !incidentId}
            onClick={() => {
              setError(null);
              startTransition(async () => {
                try {
                  await linkSightingIncident(id, incidentId);
                  router.refresh();
                } catch (e) {
                  setError(e instanceof Error ? e.message : "Có lỗi xảy ra.");
                }
              });
            }}
          >
            Gắn phiếu
          </button>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <input
          className="rounded-lg border border-border bg-bg px-2 py-1.5 text-xs text-ink"
          placeholder="Lý do chấm dứt"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <button className={`${btn} bg-crit text-white`} disabled={isPending} onClick={() => run("discontinue", { reason })}>
          Chấm dứt sử dụng
        </button>
      </div>

      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-2 py-1.5 text-xs text-crit">{error}</p>}
    </div>
  );
}
