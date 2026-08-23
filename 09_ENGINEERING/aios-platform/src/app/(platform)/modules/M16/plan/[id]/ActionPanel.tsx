"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { approveAuditPlan, reviewAuditPlan, submitAuditPlan } from "@/lib/m16/actions";

interface Props {
  id: string;
  status: string;
  m16Role: string | null;
}

const btn =
  "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const btnGhost =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";
const inputCls =
  "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";

export function PlanActionPanel({ id, status, m16Role }: Props) {
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
        Vai trò M16 của bạn: <strong className="text-ink">{m16Role ?? "chưa gán"}</strong>
      </p>
      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      {(status === "DRAFT" || status === "REJECTED") && (
        <button className={btn} disabled={isPending} onClick={() => run(() => submitAuditPlan(id))}>
          Gửi xem xét
        </button>
      )}

      {status === "PENDING_REVIEW" && (
        <div className="flex flex-col gap-2">
          <input placeholder="Lý do (bắt buộc nếu trả lại)" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
          <div className="flex gap-2">
            <button className={btn} disabled={isPending} onClick={() => run(() => reviewAuditPlan(id, { decision: "approve" }))}>
              Xem xét đạt
            </button>
            <button className={btnGhost} disabled={isPending} onClick={() => run(() => reviewAuditPlan(id, { decision: "return", reason }))}>
              Trả lại
            </button>
          </div>
        </div>
      )}

      {status === "PENDING_APPROVAL" && (
        <div className="flex flex-col gap-2">
          <input placeholder="Lý do (bắt buộc nếu từ chối)" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
          <div className="flex gap-2">
            <button className={btn} disabled={isPending} onClick={() => run(() => approveAuditPlan(id, { decision: "approve" }))}>
              Phê duyệt
            </button>
            <button className={btnGhost} disabled={isPending} onClick={() => run(() => approveAuditPlan(id, { decision: "reject", reason }))}>
              Từ chối
            </button>
          </div>
        </div>
      )}

      {status === "APPROVED" && <p className="text-sm text-good">Đã phê duyệt — có thể lập chương trình đánh giá.</p>}
    </div>
  );
}
