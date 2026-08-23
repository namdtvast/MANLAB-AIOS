"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createNeed, fulfillNeed, setNeedResult, startNeed, waiveNeed, type NeedFormInput } from "@/lib/m26/actions";
import { NEED_METHOD_LABEL, NEED_TRIGGER_LABEL, enumOptions } from "@/lib/m26/labels";

const fieldCls = "rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent-line";
const labelCls = "flex flex-col gap-1.5 text-sm font-medium text-ink";
const btnGhost = "cursor-pointer rounded-lg border border-border-strong px-2.5 py-1 text-xs text-ink hover:bg-sunk disabled:opacity-50";

export function NewNeedForm({
  users,
  allItems,
}: {
  users: { id: string; name: string | null; email: string }[];
  allItems: { id: string; code: string; title: string }[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  if (!open)
    return (
      <button
        onClick={() => setOpen(true)}
        className="cursor-pointer self-start rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-ink hover:opacity-90"
      >
        + Lập phiếu nhu cầu tri thức
      </button>
    );

  return (
    <form
      className="flex max-w-2xl flex-col gap-4 rounded-xl border border-border bg-surface p-5"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        setError(null);
        const payload: NeedFormInput = {
          trigger: String(fd.get("trigger")) as NeedFormInput["trigger"],
          triggerRef: String(fd.get("triggerRef") ?? ""),
          description: String(fd.get("description") ?? ""),
          requiredBy: String(fd.get("requiredBy") ?? ""),
          method: String(fd.get("method")) as NeedFormInput["method"],
          responsibleId: String(fd.get("responsibleId") ?? ""),
          targetItemId: String(fd.get("targetItemId") ?? "") || undefined,
        };
        startTransition(async () => {
          const r = await createNeed(payload);
          if (!r.ok) setError(r.message);
          else {
            setOpen(false);
            router.refresh();
          }
        });
      }}
    >
      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelCls}>
          Căn cứ phát sinh
          <select name="trigger" defaultValue="PHUONG_PHAP_MOI" className={fieldCls}>
            {enumOptions(NEED_TRIGGER_LABEL).map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <label className={labelCls}>
          Hình thức bổ sung
          <select name="method" defaultValue="DAO_TAO_NOI_BO" className={fieldCls}>
            {enumOptions(NEED_METHOD_LABEL).map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <label className={labelCls}>
          Hạn cần có tri thức
          <input type="date" name="requiredBy" required className={fieldCls} />
        </label>
        <label className={labelCls}>
          Người chịu trách nhiệm
          <select name="responsibleId" className={fieldCls}>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name ?? u.email}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className={labelCls}>
        Bản ghi/căn cứ dẫn chiếu
        <input name="triggerRef" required className={fieldCls} placeholder="Hồ sơ mở rộng phạm vi, mã KPH, văn bản pháp luật…" />
      </label>
      <label className={labelCls}>
        Mục tri thức liên quan (bắt buộc khi là phiếu chuyển giao tri thức ẩn trọng yếu)
        <select name="targetItemId" defaultValue="" className={fieldCls}>
          <option value="">— Không gắn mục nào —</option>
          {allItems.map((i) => (
            <option key={i.id} value={i.id}>
              {i.code} — {i.title}
            </option>
          ))}
        </select>
        <span className="text-xs font-normal text-ink-3">
          Đây là mục tri thức mà nhu cầu nhằm bổ sung/chuyển giao — khác với &quot;kết quả&quot; ghi nhận khi đóng phiếu.
        </span>
      </label>

      <label className={labelCls}>
        Mô tả nhu cầu
        <textarea name="description" rows={3} required className={fieldCls} placeholder="Tri thức còn thiếu là gì, thiếu ở đâu" />
      </label>
      <div className="flex gap-2">
        <button type="submit" disabled={isPending} className="cursor-pointer rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink hover:opacity-90 disabled:opacity-50">
          Lập phiếu
        </button>
        <button type="button" onClick={() => setOpen(false)} className="cursor-pointer rounded-lg border border-border-strong px-4 py-2 text-sm text-ink hover:bg-sunk">
          Đóng
        </button>
      </div>
    </form>
  );
}

export function NeedActions({
  id,
  status,
  items,
  trainings,
  hasResult,
}: {
  id: string;
  status: string;
  items: { id: string; code: string }[];
  trainings: { id: string; code: string }[];
  hasResult: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [result, setResult] = useState("");

  const run = (fn: () => Promise<{ ok: boolean; message?: string }>) => {
    setError(null);
    startTransition(async () => {
      const r = await fn();
      if (!r.ok) setError(r.message ?? "Có lỗi xảy ra.");
      else {
        setReason("");
        router.refresh();
      }
    });
  };

  if (status === "DA_DAP_UNG" || status === "KHONG_THUC_HIEN") return <span className="text-xs text-ink-3">Đã đóng</span>;

  return (
    <div className="flex flex-col gap-1.5">
      {error && <p className="text-xs text-crit">{error}</p>}
      {status === "MO" && (
        <button className={btnGhost} disabled={isPending} onClick={() => run(() => startNeed(id))}>
          Bắt đầu bổ sung
        </button>
      )}
      {!hasResult && (
        <div className="flex flex-wrap items-center gap-1.5">
          <select value={result} onChange={(e) => setResult(e.target.value)} className="rounded-lg border border-border bg-bg px-2 py-1 text-xs text-ink">
            <option value="">— Chọn kết quả —</option>
            {items.map((i) => (
              <option key={i.id} value={`item:${i.id}`}>
                Mục tri thức {i.code}
              </option>
            ))}
            {trainings.map((t) => (
              <option key={t.id} value={`training:${t.id}`}>
                Hồ sơ đào tạo {t.code}
              </option>
            ))}
          </select>
          <button
            className={btnGhost}
            disabled={isPending || !result}
            onClick={() =>
              run(() =>
                setNeedResult(id, {
                  itemId: result.startsWith("item:") ? result.slice(5) : null,
                  trainingId: result.startsWith("training:") ? result.slice(9) : null,
                }),
              )
            }
          >
            Ghi kết quả
          </button>
        </div>
      )}
      <button className={btnGhost} disabled={isPending} onClick={() => run(() => fulfillNeed(id))}>
        Đóng — đã đáp ứng
      </button>
      <div className="flex flex-wrap items-center gap-1.5">
        <input
          placeholder="Lý do (LĐV)"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-36 rounded-lg border border-border bg-bg px-2 py-1 text-xs text-ink"
        />
        <button className={btnGhost} disabled={isPending} onClick={() => run(() => waiveNeed(id, reason))}>
          Không thực hiện
        </button>
      </div>
    </div>
  );
}
