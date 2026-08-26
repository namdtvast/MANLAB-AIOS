"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  approveAsset,
  cancelAsset,
  disposeAsset,
  isolateAsset,
  markAssetReviewed,
  resumeAsset,
  retireAsset,
  reviewAsset,
  submitAsset,
  suspendAsset,
  updateOperationalFields,
} from "@/lib/m33/actions";
import { M33_ROLE_LABEL } from "@/lib/m33/labels";

const btn =
  "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const btnGhost =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";
const inputCls =
  "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";

export function AssetActionPanel({
  id,
  status,
  m33Role,
  hasDisposalEvidence,
  refs,
}: {
  id: string;
  status: string;
  m33Role: string | null;
  hasDisposalEvidence: boolean;
  refs: { platformRefs: string[]; infoAssetRefs: string[]; measuringDeviceRef: string | null };
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [evidence, setEvidence] = useState("");

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

  const editable = status === "DRAFT" || status === "REVIEW_REJECTED" || status === "APPROVAL_REJECTED";
  const hasDeps = refs.platformRefs.length > 0 || refs.infoAssetRefs.length > 0 || Boolean(refs.measuringDeviceRef);

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
      <p className="text-xs text-ink-3">
        Vai trò M33 của bạn: <strong className="text-ink">{m33Role ? (M33_ROLE_LABEL[m33Role] ?? m33Role) : "chưa gán"}</strong>
      </p>
      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      {editable && (
        <button className={btn} disabled={isPending} onClick={() => run(() => submitAsset(id))}>
          Gửi soát xét (đã áp cấu hình cơ sở)
        </button>
      )}

      {status === "PENDING_REVIEW" && (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-ink-3">Soát xét — PT.ATTT kiểm cấu hình an toàn, vùng mạng, phân loại (≠ người lập).</p>
          <button className={btn} disabled={isPending} onClick={() => run(() => reviewAsset(id, true))}>
            Soát xét đạt
          </button>
          <input placeholder="Lý do (bắt buộc khi trả lại)" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
          <button className={btnGhost} disabled={isPending} onClick={() => run(() => reviewAsset(id, false, reason))}>
            Trả lại
          </button>
        </div>
      )}

      {status === "PENDING_APPROVAL" && (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-ink-3">Phê duyệt — LĐV; chặn theo ETV.P33 Phụ lục I.1.</p>
          <button className={btn} disabled={isPending} onClick={() => run(() => approveAsset(id, true))}>
            Phê duyệt — Đang vận hành
          </button>
          <input placeholder="Lý do (khi không phê duyệt)" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
          <button className={btnGhost} disabled={isPending} onClick={() => run(() => approveAsset(id, false, reason))}>
            Không phê duyệt
          </button>
        </div>
      )}

      {(status === "OPERATING" || status === "SUSPENDED") && (
        <div className="flex flex-col gap-2">
          <button className={btnGhost} disabled={isPending} onClick={() => run(() => markAssetReviewed(id))}>
            Xác nhận rà soát định kỳ (R12)
          </button>
          {status === "OPERATING" ? (
            <>
              <input placeholder="Lý do tạm ngừng (bảo trì lớn/sự cố)" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
              <button className={btnGhost} disabled={isPending} onClick={() => run(() => suspendAsset(id, reason))}>
                Tạm ngừng
              </button>
            </>
          ) : (
            <button className={btnGhost} disabled={isPending} onClick={() => run(() => resumeAsset(id))}>
              Trở lại vận hành
            </button>
          )}
          <input placeholder="Lý do ngắt mạng (không đạt cấu hình cơ sở)" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
          <button className={btnGhost} disabled={isPending} onClick={() => run(() => isolateAsset(id, reason))}>
            Ngắt khỏi mạng của Viện (§6.7)
          </button>
          <div className="flex flex-col gap-2 border-t border-border pt-2">
            <p className="text-xs text-ink-3">
              Ngừng vận hành — {hasDeps ? "còn đối tượng phụ thuộc (M35/M27/M05), gỡ tham chiếu sau khi xử lý xong" : "đã hết đối tượng phụ thuộc"}.
            </p>
            <input placeholder="Lý do ngừng vận hành" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
            <button className={btnGhost} disabled={isPending} onClick={() => run(() => retireAsset(id, reason))}>
              Ngừng vận hành
            </button>
          </div>
        </div>
      )}

      {status === "RETIRED" && (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-ink-3">
            Thanh lý — cần bằng chứng xóa dữ liệu an toàn (← M27, R10), thu hồi hết tài khoản, LĐV phê duyệt.
          </p>
          <input
            placeholder="Số biên bản hủy dữ liệu (M27)"
            value={evidence}
            onChange={(e) => setEvidence(e.target.value)}
            className={inputCls}
          />
          <button
            className={btnGhost}
            disabled={isPending}
            onClick={() => run(() => updateOperationalFields(id, { disposalEvidenceRef: evidence }))}
          >
            Ghi bằng chứng xóa dữ liệu (QTHT) {hasDisposalEvidence && "✓"}
          </button>
          <input placeholder="Lý do thanh lý (LĐV)" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
          <button className={btn} disabled={isPending} onClick={() => run(() => disposeAsset(id, reason))}>
            LĐV phê duyệt thanh lý
          </button>
        </div>
      )}

      {status === "DISPOSED" && (
        <p className="text-sm text-good">
          Đã thanh lý — bản ghi kiểm kê vẫn giữ, mã không cấp lại (R22). Chỉ đọc.
        </p>
      )}

      {(status === "DRAFT" || status === "PENDING_REVIEW" || status === "REVIEW_REJECTED" || status === "PENDING_APPROVAL" || status === "APPROVAL_REJECTED") && (
        <div className="flex flex-col gap-2 border-t border-border pt-3">
          <input placeholder="Lý do hủy bản ghi (LĐV — khai báo sai/trùng)" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
          <button className={btnGhost} disabled={isPending} onClick={() => run(() => cancelAsset(id, reason))}>
            Hủy bản ghi
          </button>
        </div>
      )}
    </div>
  );
}
