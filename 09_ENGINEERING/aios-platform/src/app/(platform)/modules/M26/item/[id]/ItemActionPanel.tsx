"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  approveItem,
  cancelItem,
  createNewVersion,
  markItemReviewed,
  retireItem,
  reviewItem,
  setAiIndex,
  submitItemForReview,
} from "@/lib/m26/actions";
import { M26_ROLE_LABEL } from "@/lib/m26/labels";

const btn =
  "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const btnGhost =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";
const inputCls =
  "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";

export function ItemActionPanel({
  id,
  status,
  role,
  aiIndexed,
  blockMessage,
}: {
  id: string;
  status: string;
  role: string | null;
  aiIndexed: boolean;
  blockMessage: string | null;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [reason, setReason] = useState("");

  const run = (fn: () => Promise<{ ok: boolean; message?: string; id?: string }>) => {
    setError(null);
    startTransition(async () => {
      const r = await fn();
      if (!r.ok) setError(r.message ?? "Có lỗi xảy ra.");
      else {
        setReason("");
        if (r.id && r.id !== id) router.push(`/modules/M26/item/${r.id}`);
        router.refresh();
      }
    });
  };

  const editable = status === "DRAFT" || status === "REVIEW_REJECTED" || status === "APPROVAL_REJECTED";

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
      <p className="text-xs text-ink-3">
        Vai trò M26 của bạn: <strong className="text-ink">{role ? (M26_ROLE_LABEL[role] ?? role) : "chưa gán"}</strong>
      </p>
      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}
      {blockMessage && status === "PENDING_APPROVAL" && (
        <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-xs text-crit">{blockMessage}</p>
      )}

      {editable && (
        <>
          <a href={`/modules/M26/item/${id}/edit`} className={btnGhost}>
            Sửa nội dung
          </a>
          <button className={btn} disabled={isPending} onClick={() => run(() => submitItemForReview(id))}>
            Gửi soát xét
          </button>
        </>
      )}

      {status === "PENDING_REVIEW" && (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-ink-3">Bước soát xét — Trưởng phòng, không được trùng người lập.</p>
          <button className={btn} disabled={isPending} onClick={() => run(() => reviewItem(id, true))}>
            Soát xét đạt
          </button>
          <input placeholder="Lý do (bắt buộc khi trả lại)" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
          <button className={btnGhost} disabled={isPending} onClick={() => run(() => reviewItem(id, false, reason))}>
            Trả lại
          </button>
        </div>
      )}

      {status === "PENDING_APPROVAL" && (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-ink-3">Bước phê duyệt — chỉ Lãnh đạo Viện (ETV.P26 mục 4.1).</p>
          <button className={btn} disabled={isPending} onClick={() => run(() => approveItem(id, true))}>
            Phê duyệt
          </button>
          <input placeholder="Lý do (bắt buộc khi không phê duyệt)" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
          <button className={btnGhost} disabled={isPending} onClick={() => run(() => approveItem(id, false, reason))}>
            Không phê duyệt
          </button>
        </div>
      )}

      {status === "APPROVED" && (
        <div className="flex flex-col gap-2">
          <p className="text-sm text-good">Mục đã phê duyệt là hồ sơ chỉ đọc — muốn đổi nội dung phải tạo phiên bản mới.</p>
          <button className={btnGhost} disabled={isPending} onClick={() => run(() => markItemReviewed(id))}>
            Xác nhận đã rà soát
          </button>
          <button className={btnGhost} disabled={isPending} onClick={() => run(() => createNewVersion(id))}>
            Tạo phiên bản mới
          </button>
          <button className={btnGhost} disabled={isPending} onClick={() => run(() => setAiIndex(id, !aiIndexed))}>
            {aiIndexed ? "Gỡ khỏi chỉ mục trợ lý AI" : "Đưa vào chỉ mục trợ lý AI"}
          </button>
          <input placeholder="Lý do tuyên bố hết hiệu lực" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
          <button className={btnGhost} disabled={isPending} onClick={() => run(() => retireItem(id, reason))}>
            Tuyên bố hết hiệu lực
          </button>
        </div>
      )}

      {status !== "APPROVED" && status !== "RETIRED" && status !== "CANCELLED" && (
        <div className="flex flex-col gap-2 border-t border-border pt-3">
          <input placeholder="Lý do hủy mục (LĐV)" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
          <button className={btnGhost} disabled={isPending} onClick={() => run(() => cancelItem(id, reason))}>
            Hủy mục tri thức
          </button>
        </div>
      )}
    </div>
  );
}
