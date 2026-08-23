"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { renewLaborContract, signLaborContract, terminateLaborContract } from "@/lib/m03/actions";

interface Props {
  id: string;
  status: string;
  m03Role: string | null;
}

const btn =
  "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const btnGhost =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";
const inputCls =
  "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";

export function ContractActionPanel({ id, status, m03Role }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [effectiveDate, setEffectiveDate] = useState("");
  const [newExpiryDate, setNewExpiryDate] = useState("");
  const [reason, setReason] = useState("");
  const [securityRevoked, setSecurityRevoked] = useState(false);
  const [bhxhSettled, setBhxhSettled] = useState(false);
  const [showTerminate, setShowTerminate] = useState(false);

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
        Vai trò M03 của bạn: <strong className="text-ink">{m03Role ?? "chưa gán"}</strong>
      </p>
      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      {(status === "DRAFT" || status === "PENDING_SIGN") && (
        <div className="flex flex-col gap-2">
          <input type="date" value={effectiveDate} onChange={(e) => setEffectiveDate(e.target.value)} className={inputCls} />
          <button className={btn} disabled={isPending} onClick={() => run(() => signLaborContract(id, { effectiveDate }))}>
            Ký hợp đồng
          </button>
        </div>
      )}

      {status === "ACTIVE" && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-ink">Gia hạn</p>
            <input type="date" value={newExpiryDate} onChange={(e) => setNewExpiryDate(e.target.value)} className={inputCls} />
            <button className={btnGhost} disabled={isPending} onClick={() => run(() => renewLaborContract(id, { newExpiryDate }))}>
              Gia hạn
            </button>
          </div>

          {!showTerminate ? (
            <button className={btnGhost} onClick={() => setShowTerminate(true)}>
              Chấm dứt hợp đồng
            </button>
          ) : (
            <div className="flex flex-col gap-2 rounded-lg border border-border bg-bg p-3">
              <p className="text-xs font-medium text-ink">Chấm dứt hợp đồng</p>
              <input placeholder="Lý do" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
              <label className="flex items-center gap-2 text-xs text-ink-2">
                <input type="checkbox" checked={securityRevoked} onChange={(e) => setSecurityRevoked(e.target.checked)} />
                Đã thu hồi quyền truy cập bảo mật (phối hợp M02)
              </label>
              <label className="flex items-center gap-2 text-xs text-ink-2">
                <input type="checkbox" checked={bhxhSettled} onChange={(e) => setBhxhSettled(e.target.checked)} />
                Đã chốt/trả sổ BHXH
              </label>
              <button
                className={btn}
                disabled={isPending}
                onClick={() => run(() => terminateLaborContract(id, { reason, securityRevoked, bhxhSettled }))}
              >
                Xác nhận chấm dứt
              </button>
            </div>
          )}
        </div>
      )}

      {status === "TERMINATED" && <p className="text-sm text-ink-2">Hợp đồng đã chấm dứt.</p>}
    </div>
  );
}
