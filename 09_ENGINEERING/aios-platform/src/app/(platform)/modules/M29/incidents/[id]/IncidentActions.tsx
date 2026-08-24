"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { incidentAction } from "@/lib/m29/actions";

const btn = "cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60";
const fieldCls = "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent-line";

export function IncidentActions({
  id,
  status,
  severity,
  needsF28,
  needsIssuedRef,
  canWrite,
}: {
  id: string;
  status: string;
  severity: string;
  needsF28: boolean;
  needsIssuedRef: boolean;
  canWrite: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [containment, setContainment] = useState("");
  const [capRef, setCapRef] = useState("");
  const [f28Ref, setF28Ref] = useState("");
  const [issuedResultRef, setIssuedResultRef] = useState("");
  const [closureNote, setClosureNote] = useState("");
  const [cancelReason, setCancelReason] = useState("");

  if (!canWrite) return null;
  if (status === "CLOSED" || status === "CANCELLED") return null;

  const run = (action: "start" | "submit" | "close" | "cancel", extra: Record<string, string> = {}) => {
    setError(null);
    startTransition(async () => {
      const r = await incidentAction(id, action, extra);
      if (!r.ok) setError(`${r.code}: ${r.message}`);
      else router.refresh();
    });
  };

  const needsCap = severity === "SEVERE" || severity === "SIGNIFICANT";

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
      <h2 className="font-head text-sm font-bold text-ink">Thao tác</h2>

      {status === "NEW" && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-ink">Biện pháp khống chế đã thực hiện</label>
          <textarea rows={2} className={fieldCls} value={containment} onChange={(e) => setContainment(e.target.value)} />
          <button className={`${btn} bg-accent text-accent-ink self-start`} disabled={isPending} onClick={() => run("start", { containmentAction: containment })}>
            Bắt đầu xử lý
          </button>
        </div>
      )}

      {status === "IN_PROGRESS" && (
        <button className={`${btn} bg-accent text-accent-ink self-start`} disabled={isPending} onClick={() => run("submit")}>
          Trình xác nhận
        </button>
      )}

      {status === "PENDING_CONFIRMATION" && (
        <div className="flex flex-col gap-2">
          {needsCap && (
            <label className="flex flex-col gap-1 text-sm font-medium text-ink">
              Mã phiếu KPH (ETV.MP13) — bắt buộc với sự cố Nghiêm trọng/Đáng kể
              <input className={fieldCls} value={capRef} onChange={(e) => setCapRef(e.target.value)} />
            </label>
          )}
          {needsF28 && (
            <label className="flex flex-col gap-1 text-sm font-medium text-ink">
              Số phiếu ETV.P.F28.03 — bắt buộc vì có lộ dữ liệu nhạy cảm
              <input className={fieldCls} value={f28Ref} onChange={(e) => setF28Ref(e.target.value)} />
            </label>
          )}
          {needsIssuedRef && (
            <label className="flex flex-col gap-1 text-sm font-medium text-ink">
              Mã hồ sơ đã xử lý theo ETV.MP10/MP11 — bắt buộc vì ảnh hưởng kết quả đã phát hành
              <input className={fieldCls} value={issuedResultRef} onChange={(e) => setIssuedResultRef(e.target.value)} />
            </label>
          )}
          <label className="flex flex-col gap-1 text-sm font-medium text-ink">
            Kết luận xử lý
            <textarea rows={2} className={fieldCls} value={closureNote} onChange={(e) => setClosureNote(e.target.value)} />
          </label>
          <button
            className={`${btn} bg-good text-white self-start`}
            disabled={isPending}
            onClick={() => run("close", { capRef, f28Ref, issuedResultRef, closureNote })}
          >
            Đóng sự cố
          </button>
          <p className="text-xs text-ink-3">
            Người phát hiện không được đóng chính sự cố đó; sự cố Nghiêm trọng chỉ Lãnh đạo Viện (SUPER_ADMIN) đóng được — ETV.P29 mục 5.7.3.
          </p>
        </div>
      )}

      <details className="text-sm">
        <summary className="cursor-pointer text-ink-2">Hủy phiếu (chỉ Lãnh đạo Viện)</summary>
        <div className="mt-2 flex flex-col gap-2">
          <input className={fieldCls} placeholder="Lý do hủy (bắt buộc)" value={cancelReason} onChange={(e) => setCancelReason(e.target.value)} />
          <button className={`${btn} bg-crit text-white self-start`} disabled={isPending} onClick={() => run("cancel", { reason: cancelReason })}>
            Hủy phiếu
          </button>
        </div>
      </details>

      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}
    </div>
  );
}
