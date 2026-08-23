"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { revokeCommitment } from "@/lib/m02/actions";

const btn =
  "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const inputCls =
  "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";

export function CommitmentActionPanel({ id, status, m02Role }: { id: string; status: string; m02Role: string | null }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [reason, setReason] = useState("");

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
      <p className="text-xs text-ink-3">
        Vai trò M02 của bạn: <strong className="text-ink">{m02Role ?? "chưa gán"}</strong>
      </p>
      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      {status === "HIEU_LUC" ? (
        <div className="flex flex-col gap-2">
          <input placeholder="Lý do thu hồi (không bắt buộc)" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
          <button
            className={btn}
            disabled={isPending}
            onClick={() =>
              startTransition(async () => {
                setError(null);
                const r = await revokeCommitment(id, reason || undefined);
                if (!r.ok) setError(r.message);
                else router.refresh();
              })
            }
          >
            Thu hồi cam kết
          </button>
        </div>
      ) : (
        <p className="text-sm text-ink-2">Cam kết đã bị thu hồi.</p>
      )}
    </div>
  );
}
