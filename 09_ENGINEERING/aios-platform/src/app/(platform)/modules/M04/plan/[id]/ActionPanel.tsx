"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { approveFieldWorkPlan, markPlanBriefed, submitFieldWorkPlan } from "@/lib/m04/actions";

interface Props {
  id: string;
  status: string;
  riskLevel: string;
  briefed: boolean;
  m04Role: string | null;
}

const btn =
  "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const btnGhost =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";
const inputCls =
  "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";

export function PlanActionPanel({ id, status, riskLevel, briefed, m04Role }: Props) {
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
        Vai trò M04 của bạn: <strong className="text-ink">{m04Role ?? "chưa gán"}</strong>
      </p>
      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      {(status === "DRAFT" || status === "REJECTED") && (
        <button className={btn} disabled={isPending} onClick={() => run(() => submitFieldWorkPlan(id))}>
          Gửi duyệt
        </button>
      )}

      {status === "PENDING_APPROVAL" && (
        <div className="flex flex-col gap-2">
          {riskLevel === "CAO" && <p className="text-xs text-warn">Mức Rủi ro cao — chỉ LĐV được phê duyệt.</p>}
          <input placeholder="Lý do (bắt buộc nếu từ chối)" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
          <div className="flex gap-2">
            <button className={btn} disabled={isPending} onClick={() => run(() => approveFieldWorkPlan(id, { decision: "approve" }))}>
              Phê duyệt
            </button>
            <button className={btnGhost} disabled={isPending} onClick={() => run(() => approveFieldWorkPlan(id, { decision: "reject", reason }))}>
              Từ chối
            </button>
          </div>
        </div>
      )}

      {status === "APPROVED" && !briefed && (
        <button className={btn} disabled={isPending} onClick={() => run(() => markPlanBriefed(id))}>
          Đánh dấu đã phổ biến cho nhân sự
        </button>
      )}

      {status === "APPROVED" && briefed && <p className="text-sm text-good">Đã duyệt và đã phổ biến — sẵn sàng thi công.</p>}
    </div>
  );
}
