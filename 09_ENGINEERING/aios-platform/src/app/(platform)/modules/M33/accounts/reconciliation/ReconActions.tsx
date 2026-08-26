"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { closeReconciliation, createReconciliation, reviewReconciliation, submitReconToLdv } from "@/lib/m33/actions";

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

export function ReconActions() {
  const { isPending, error, run } = useRun();
  const [open, setOpen] = useState(false);
  const [period, setPeriod] = useState("");
  const [scope, setScope] = useState<"TOAN_BO" | "DAC_QUYEN_DICH_VU">("TOAN_BO");
  const [orphans, setOrphans] = useState("");

  return (
    <section className="rounded-xl border border-border bg-surface p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-head text-sm font-bold text-ink">Mở kỳ đối chiếu (QTHT)</h2>
        <button className={btnGhost} onClick={() => setOpen((v) => !v)}>
          {open ? "Đóng" : "+ Mở kỳ"}
        </button>
      </div>
      {error && <p className="mt-2 rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}
      {open && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <input placeholder="Kỳ (vd 2026-H1)" className={inputCls} value={period} onChange={(e) => setPeriod(e.target.value)} />
          <select className={inputCls} value={scope} onChange={(e) => setScope(e.target.value as never)}>
            <option value="TOAN_BO">Toàn bộ tài khoản (06 tháng/lần)</option>
            <option value="DAC_QUYEN_DICH_VU">Đặc quyền và dịch vụ (≥ 02 lần/năm)</option>
          </select>
          <input
            placeholder="Phiếu M28 không có tài khoản (phẩy — đối chiếu tay)"
            className={inputCls}
            value={orphans}
            onChange={(e) => setOrphans(e.target.value)}
          />
          <button
            className={btn}
            disabled={isPending}
            onClick={() =>
              run(
                () => createReconciliation({ period, scope, orphanRequestRefs: orphans.split(",").map((s) => s.trim()).filter(Boolean) }),
                () => setOpen(false),
              )
            }
          >
            Mở kỳ — chốt 2 nhóm tự động (quá hạn, thiếu MFA)
          </button>
        </div>
      )}
    </section>
  );
}

export function ReconRowActions({ id, status, scope }: { id: string; status: string; scope: string }) {
  const { isPending, error, run } = useRun();
  if (status === "DA_CHOT") return null;
  return (
    <span className="flex flex-wrap items-center gap-1">
      {error && <span className="max-w-64 text-xs text-crit">{error}</span>}
      {scope === "DAC_QUYEN_DICH_VU" && (
        <>
          <button className={btnGhost} disabled={isPending} onClick={() => run(() => reviewReconciliation(id))}>
            ATTT rà soát
          </button>
          <button className={btnGhost} disabled={isPending} onClick={() => run(() => submitReconToLdv(id))}>
            Trình LĐV
          </button>
        </>
      )}
      <button className={btn} disabled={isPending} onClick={() => run(() => closeReconciliation(id))}>
        Chốt kỳ (bất biến)
      </button>
    </span>
  );
}
