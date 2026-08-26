"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { approvePlan, createPlan, submitPlan } from "@/lib/m33/actions";

const btn =
  "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const btnGhost =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-xs text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";
const inputCls = "rounded-lg border border-border bg-bg px-2 py-1 text-xs text-ink outline-none focus:border-accent-line";

function useRun() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const run = (fn: () => Promise<{ ok: boolean; message?: string }>, after?: () => void) => {
    setError(null);
    startTransition(async () => {
      const r = await fn();
      if (!r.ok) setError(r.message ?? "Có lỗi xảy ra.");
      else {
        after?.();
        router.refresh();
      }
    });
  };
  return { isPending, error, run };
}

export function NewPlanForm({ assets }: { assets: { id: string; code: string; name: string }[] }) {
  const { isPending, error, run } = useRun();
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear() + 1);
  const [selected, setSelected] = useState<string[]>(assets.map((a) => a.id));
  const [downtime, setDowntime] = useState("");

  return (
    <section className="rounded-xl border border-border bg-surface p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-head text-sm font-bold text-ink">Lập kế hoạch (VP chủ trì — R19)</h2>
        <button className={btnGhost} onClick={() => setOpen((v) => !v)}>
          {open ? "Đóng" : "+ Lập kế hoạch năm"}
        </button>
      </div>
      {error && <p className="mt-2 rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}
      {open && (
        <div className="mt-3 flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            <input type="number" className={inputCls} value={year} onChange={(e) => setYear(Number(e.target.value))} />
            <input placeholder="Nhu cầu ngừng dịch vụ" className={inputCls} value={downtime} onChange={(e) => setDowntime(e.target.value)} />
          </div>
          <p className="text-xs text-ink-3">Phạm vi ({selected.length}/{assets.length} tài sản thuộc diện):</p>
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            {assets.map((a) => (
              <label key={a.id} className="flex items-center gap-2 text-xs text-ink">
                <input
                  type="checkbox"
                  checked={selected.includes(a.id)}
                  onChange={(e) => setSelected((s) => (e.target.checked ? [...s, a.id] : s.filter((x) => x !== a.id)))}
                />
                {a.code} — {a.name}
              </label>
            ))}
          </div>
          <div>
            <button
              className={btn}
              disabled={isPending}
              onClick={() => run(() => createPlan({ year, scopeAssetIds: selected, downtimeNeeds: downtime || null }), () => setOpen(false))}
            >
              Lập kế hoạch (Nháp)
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export function PlanActions({ id, status, role }: { id: string; status: string; role: string | null }) {
  const { isPending, error, run } = useRun();
  const [reason, setReason] = useState("");
  void role;

  return (
    <span className="flex flex-wrap items-center gap-2">
      {error && <span className="max-w-64 text-xs text-crit">{error}</span>}
      {status === "DRAFT" && (
        <button className={btnGhost} disabled={isPending} onClick={() => run(() => submitPlan(id))}>
          Trình LĐV
        </button>
      )}
      {status === "CHO_PHE_DUYET" && (
        <>
          <button className={btn} disabled={isPending} onClick={() => run(() => approvePlan(id, true))}>
            LĐV phê duyệt
          </button>
          <input placeholder="Lý do trả lại" className={inputCls} value={reason} onChange={(e) => setReason(e.target.value)} />
          <button className={btnGhost} disabled={isPending} onClick={() => run(() => approvePlan(id, false, reason))}>
            Trả lại
          </button>
        </>
      )}
    </span>
  );
}
