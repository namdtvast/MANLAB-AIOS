"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { signServiceContract, terminateServiceContract } from "@/lib/m03/actions";

const btn =
  "cursor-pointer rounded-lg border border-border-strong px-2 py-1 text-xs text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";

export function ServiceContractActions({ id, status }: { id: string; status: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [showTerminate, setShowTerminate] = useState(false);
  const [reason, setReason] = useState("");
  const [securityRevoked, setSecurityRevoked] = useState(false);
  const [bhxhSettled, setBhxhSettled] = useState(false);

  const run = (fn: () => Promise<{ ok: boolean; message?: string }>) => {
    setError(null);
    startTransition(async () => {
      const r = await fn();
      if (!r.ok) setError(r.message ?? "Có lỗi xảy ra.");
      else {
        setShowTerminate(false);
        router.refresh();
      }
    });
  };

  if (status === "DRAFT") {
    return (
      <div className="flex flex-col items-end gap-1">
        <button className={btn} disabled={isPending} onClick={() => run(() => signServiceContract(id))}>
          Ký
        </button>
        {error && <p className="text-xs text-crit">{error}</p>}
      </div>
    );
  }

  if (status === "ACTIVE") {
    return (
      <div className="flex flex-col items-end gap-1">
        {!showTerminate ? (
          <button className={btn} onClick={() => setShowTerminate(true)}>
            Chấm dứt
          </button>
        ) : (
          <div className="flex flex-col gap-1 rounded-lg border border-border bg-bg p-2">
            <input
              placeholder="Lý do"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="rounded border border-border bg-surface px-2 py-1 text-xs text-ink"
            />
            <label className="flex items-center gap-1 text-xs text-ink-2">
              <input type="checkbox" checked={securityRevoked} onChange={(e) => setSecurityRevoked(e.target.checked)} />
              Đã thu hồi quyền truy cập bảo mật
            </label>
            <label className="flex items-center gap-1 text-xs text-ink-2">
              <input type="checkbox" checked={bhxhSettled} onChange={(e) => setBhxhSettled(e.target.checked)} />
              Đã chốt/trả sổ BHXH
            </label>
            <button
              className={btn}
              disabled={isPending}
              onClick={() => run(() => terminateServiceContract(id, { reason, securityRevoked, bhxhSettled }))}
            >
              Xác nhận chấm dứt
            </button>
          </div>
        )}
        {error && <p className="text-xs text-crit">{error}</p>}
      </div>
    );
  }

  return null;
}
