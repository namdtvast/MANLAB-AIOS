"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { approveSoA, submitSoA } from "@/lib/m28/actions";

const btn =
  "cursor-pointer rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const btnGhost =
  "cursor-pointer rounded-lg border border-border px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";
const inputCls =
  "w-full rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";

export function SoaActions({
  id,
  status,
  role,
  controlCount,
  missingExclusionReason,
}: {
  id: string;
  status: string;
  role: string | null;
  controlCount: number;
  missingExclusionReason: number;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [reason, setReason] = useState("");

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

  const canDraft = (status === "DRAFT" || status === "PENDING_REVIEW") && (role === "ATTT" || role === "QLCL");
  const canApprove = status === "PENDING_APPROVAL" && role === "LDV";

  if (!canDraft && !canApprove) return null;

  return (
    <section className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
      <h2 className="font-head text-lg font-semibold text-ink">Hành động</h2>
      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      {canApprove && (
        <>
          {missingExclusionReason > 0 && (
            <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">
              Còn {missingExclusionReason} kiểm soát ghi &quot;Loại trừ&quot; chưa nêu lý do — sẽ bị chặn khi phê
              duyệt (ETV.P28 mục 6.6).
            </p>
          )}
          <div>
            <label className="text-xs font-medium text-ink-3">Lý do — bắt buộc khi không phê duyệt</label>
            <input className={inputCls} value={reason} onChange={(e) => setReason(e.target.value)} />
          </div>
        </>
      )}

      <div className="flex flex-wrap gap-2">
        {canDraft && (
          <button className={btn} disabled={isPending} onClick={() => run(() => submitSoA(id))}>
            Trình LĐV phê duyệt
          </button>
        )}
        {canApprove && (
          <>
            <button className={btn} disabled={isPending} onClick={() => run(() => approveSoA(id, true))}>
              Phê duyệt Tuyên bố áp dụng
            </button>
            <button className={btnGhost} disabled={isPending} onClick={() => run(() => approveSoA(id, false, reason))}>
              Không phê duyệt
            </button>
          </>
        )}
      </div>
      <p className="text-xs text-ink-3">
        Phiên bản hiện có {controlCount} kiểm soát. Phê duyệt yêu cầu đủ 93 dòng của Phụ lục A và mọi kiểm soát Loại
        trừ đều đã nêu căn cứ.
      </p>
    </section>
  );
}
