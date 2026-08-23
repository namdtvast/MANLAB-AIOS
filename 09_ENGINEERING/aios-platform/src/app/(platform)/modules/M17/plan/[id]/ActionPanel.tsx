"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ldvApproveReviewPlan, rejectReviewPlan, submitReviewPlan, tpApproveReviewPlan } from "@/lib/m17/actions";

interface Props {
  id: string;
  status: string;
  tpApproved: boolean;
  ldvApproved: boolean;
  m17Role: string | null;
}

const btn =
  "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const btnGhost =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";
const inputCls =
  "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";

export function PlanActionPanel({ id, status, tpApproved, ldvApproved, m17Role }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [reason, setReason] = useState("");

  const run = (fn: () => Promise<{ ok: boolean; message?: string } | void>) => {
    setError(null);
    startTransition(async () => {
      const r = await fn();
      if (r && "ok" in r && !r.ok) setError(r.message ?? "Có lỗi xảy ra.");
      else router.refresh();
    });
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
      <p className="text-xs text-ink-3">
        Vai trò M17 của bạn: <strong className="text-ink">{m17Role ?? "chưa gán"}</strong>
      </p>
      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      {(status === "DRAFT" || status === "REJECTED") && (
        <button className={btn} disabled={isPending} onClick={() => run(() => submitReviewPlan(id))}>
          Gửi yêu cầu duyệt
        </button>
      )}

      {status === "PENDING_APPROVAL" && (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-ink-3">
            Đồng phê duyệt — cần cả 2: TP {tpApproved ? "✅" : "⬜"} · LĐV {ldvApproved ? "✅" : "⬜"}
          </p>
          <div className="flex gap-2">
            <button className={btnGhost} disabled={isPending || tpApproved} onClick={() => run(() => tpApproveReviewPlan(id))}>
              TP duyệt
            </button>
            <button className={btnGhost} disabled={isPending || ldvApproved} onClick={() => run(() => ldvApproveReviewPlan(id))}>
              LĐV duyệt
            </button>
          </div>
          <input placeholder="Lý do (bắt buộc nếu từ chối)" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
          <button className={btn} disabled={isPending} onClick={() => run(() => rejectReviewPlan(id, reason))}>
            Từ chối
          </button>
        </div>
      )}

      {status === "APPROVED" && <p className="text-sm text-good">Đã đồng phê duyệt (TP + LĐV) — có thể lập biên bản.</p>}
    </div>
  );
}
