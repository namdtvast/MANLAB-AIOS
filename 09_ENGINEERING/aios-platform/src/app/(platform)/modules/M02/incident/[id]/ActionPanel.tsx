"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { assessIncident, closeIncident } from "@/lib/m02/actions";

const btn =
  "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const inputCls =
  "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";

export function IncidentActionPanel({ id, status, m02Role }: { id: string; status: string; m02Role: string | null }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [impactAssessment, setImpactAssessment] = useState("");
  const [notificationRequired, setNotificationRequired] = useState(false);
  const [correctiveAction, setCorrectiveAction] = useState("");

  const run = (fn: () => Promise<{ ok: boolean; message?: string }>) => {
    setError(null);
    startTransition(async () => {
      const r = await fn();
      if (!r.ok) setError(r.message ?? "Có lỗi xảy ra.");
      else router.refresh();
    });
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
      <p className="text-xs text-ink-3">
        Vai trò M02 của bạn: <strong className="text-ink">{m02Role ?? "chưa gán"}</strong>
      </p>
      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      {status === "DETECTED" && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-ink">Đánh giá phạm vi/hậu quả (TP)</p>
          <textarea
            placeholder="Đánh giá phạm vi/hậu quả"
            value={impactAssessment}
            onChange={(e) => setImpactAssessment(e.target.value)}
            rows={2}
            className={inputCls}
          />
          <label className="flex items-center gap-2 text-xs text-ink-2">
            <input type="checkbox" checked={notificationRequired} onChange={(e) => setNotificationRequired(e.target.checked)} />
            Bắt buộc thông báo khách hàng/cơ quan thẩm quyền (NĐ 13/2023)
          </label>
          <button className={btn} disabled={isPending} onClick={() => run(() => assessIncident(id, { impactAssessment, notificationRequired }))}>
            Ghi nhận đánh giá
          </button>
        </div>
      )}

      {status === "ASSESSED" && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-ink">Biện pháp khắc phục</p>
          <textarea
            placeholder="Biện pháp khắc phục"
            value={correctiveAction}
            onChange={(e) => setCorrectiveAction(e.target.value)}
            rows={2}
            className={inputCls}
          />
          <button className={btn} disabled={isPending} onClick={() => run(() => closeIncident(id, { correctiveAction }))}>
            Đóng hồ sơ sự cố
          </button>
        </div>
      )}

      {status === "CLOSED" && <p className="text-sm text-good">Hồ sơ đã đóng.</p>}
    </div>
  );
}
