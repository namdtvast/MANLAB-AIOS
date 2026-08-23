"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { approveContextReview, cancelContextReview, reviewContextReview, submitContextReview } from "@/lib/m25/actions";
import { M25_ROLE_LABEL } from "@/lib/m25/labels";

const btn =
  "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const btnGhost =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";
const inputCls =
  "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";

export function ReviewActionPanel({ id, status, m25Role }: { id: string; status: string; m25Role: string | null }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [conclusion, setConclusion] = useState("");

  const run = (fn: () => Promise<{ ok: boolean; message?: string }>) => {
    setError(null);
    startTransition(async () => {
      const r = await fn();
      if (!r.ok) setError(r.message ?? "Có lỗi xảy ra.");
      else {
        setReason("");
        setConclusion("");
        router.refresh();
      }
    });
  };

  const editable = status === "DRAFT" || status === "REVIEW_REJECTED" || status === "APPROVAL_REJECTED";

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
      <p className="text-xs text-ink-3">
        Vai trò M25 của bạn: <strong className="text-ink">{m25Role ? (M25_ROLE_LABEL[m25Role] ?? m25Role) : "chưa gán"}</strong>
      </p>
      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      {editable && (
        <button className={btn} disabled={isPending} onClick={() => run(() => submitContextReview(id))}>
          Gửi soát xét
        </button>
      )}

      {status === "PENDING_REVIEW" && (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-ink-3">Bước soát xét — Trưởng phòng (không được trùng người lập).</p>
          <button className={btn} disabled={isPending} onClick={() => run(() => reviewContextReview(id, true))}>
            Soát xét đạt
          </button>
          <input placeholder="Lý do (bắt buộc khi trả lại)" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
          <button className={btnGhost} disabled={isPending} onClick={() => run(() => reviewContextReview(id, false, reason))}>
            Trả lại
          </button>
        </div>
      )}

      {status === "PENDING_APPROVAL" && (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-ink-3">Bước phê duyệt — chỉ Lãnh đạo Viện.</p>
          <textarea
            rows={3}
            placeholder="Kết luận của LĐV (bắt buộc khi phê duyệt)"
            value={conclusion}
            onChange={(e) => setConclusion(e.target.value)}
            className={inputCls}
          />
          <button className={btn} disabled={isPending} onClick={() => run(() => approveContextReview(id, true, conclusion))}>
            Phê duyệt
          </button>
          <input placeholder="Lý do (bắt buộc khi không phê duyệt)" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
          <button className={btnGhost} disabled={isPending} onClick={() => run(() => approveContextReview(id, false, undefined, reason))}>
            Không phê duyệt
          </button>
        </div>
      )}

      {(status === "APPROVED" || status === "SUPERSEDED") && (
        <p className="text-sm text-good">
          Hồ sơ bất biến — kỳ đã phê duyệt không sửa được nội dung. Muốn thay đổi bối cảnh, hãy lập kỳ mới (quy tắc 8).
        </p>
      )}

      {status !== "APPROVED" && status !== "SUPERSEDED" && status !== "CANCELLED" && (
        <div className="flex flex-col gap-2 border-t border-border pt-3">
          <input placeholder="Lý do hủy kỳ (LĐV)" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
          <button className={btnGhost} disabled={isPending} onClick={() => run(() => cancelContextReview(id, reason))}>
            Hủy kỳ
          </button>
        </div>
      )}
    </div>
  );
}
