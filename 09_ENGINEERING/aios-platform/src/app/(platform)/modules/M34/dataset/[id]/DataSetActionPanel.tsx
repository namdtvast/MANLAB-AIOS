"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  approveDataSet,
  archiveDataSet,
  cancelDataSet,
  confirmDisposalMethod,
  disposeDataSet,
  liftSuspension,
  markDataSetReviewed,
  markDuplicateDataSet,
  proposeDisposal,
  reactivateDataSet,
  reviewDataSet,
  submitDataSet,
  updateDisposalChecklist,
} from "@/lib/m34/actions";
import { M34_ROLE_LABEL } from "@/lib/m34/labels";

const btn =
  "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const btnGhost =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";
const inputCls =
  "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";

export function DataSetActionPanel({
  id,
  status,
  m34Role,
  isOwner,
  suspendedUse,
  disposal,
}: {
  id: string;
  status: string;
  m34Role: string | null;
  isOwner: boolean;
  suspendedUse: boolean;
  disposal: { retentionExpired: boolean; notBasis: boolean; noDispute: boolean; noDependent: boolean; atttConfirmed: boolean; disposalRecordRef: string | null };
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [mergeTarget, setMergeTarget] = useState("");
  const [checklist, setChecklist] = useState({
    retentionExpired: disposal.retentionExpired,
    notBasis: disposal.notBasis,
    noDispute: disposal.noDispute,
    noDependent: disposal.noDependent,
    disposalRecordRef: disposal.disposalRecordRef ?? "",
  });

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
  const checkbox = (k: keyof typeof checklist, label: string) => (
    <label className="flex items-start gap-2 text-xs text-ink">
      <input
        type="checkbox"
        className="mt-0.5"
        checked={Boolean(checklist[k])}
        onChange={(e) => setChecklist((c) => ({ ...c, [k]: e.target.checked }))}
      />
      {label}
    </label>
  );

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
      <p className="text-xs text-ink-3">
        Vai trò M34 của bạn: <strong className="text-ink">{m34Role ? (M34_ROLE_LABEL[m34Role] ?? m34Role) : "chưa gán"}</strong>
        {isOwner && " · CSHDL của tập này"}
      </p>
      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      {editable && (
        <button className={btn} disabled={isPending} onClick={() => run(() => submitDataSet(id))}>
          Gửi soát xét
        </button>
      )}

      {status === "PENDING_REVIEW" && (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-ink-3">Soát xét — QLCL kiểm trùng lặp, PT.ATTT xác nhận phân loại (≠ người lập).</p>
          <button className={btn} disabled={isPending} onClick={() => run(() => reviewDataSet(id, true))}>
            Soát xét đạt
          </button>
          <input placeholder="Lý do (bắt buộc khi trả lại)" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
          <button className={btnGhost} disabled={isPending} onClick={() => run(() => reviewDataSet(id, false, reason))}>
            Trả lại
          </button>
          <div className="flex flex-col gap-2 border-t border-border pt-2">
            <p className="text-xs text-ink-3">Trùng tập đã có? Gộp, không tạo mới (R7).</p>
            <input placeholder="ID/mã tập gộp vào" value={mergeTarget} onChange={(e) => setMergeTarget(e.target.value)} className={inputCls} />
            <button className={btnGhost} disabled={isPending} onClick={() => run(() => markDuplicateDataSet(id, mergeTarget, reason || "Trùng tập đã có"))}>
              Đánh dấu trùng — gộp
            </button>
          </div>
        </div>
      )}

      {status === "PENDING_APPROVAL" && (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-ink-3">Phê duyệt — chỉ CSHDL của tập (ETV.P34 §6.1.3 bước 4).</p>
          <button className={btn} disabled={isPending} onClick={() => run(() => approveDataSet(id, true))}>
            Phê duyệt — Hiệu lực
          </button>
          <input placeholder="Lý do (bắt buộc khi không phê duyệt)" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
          <button className={btnGhost} disabled={isPending} onClick={() => run(() => approveDataSet(id, false, reason))}>
            Không phê duyệt
          </button>
        </div>
      )}

      {(status === "ACTIVE" || status === "ARCHIVED") && (
        <div className="flex flex-col gap-2">
          <button className={btnGhost} disabled={isPending} onClick={() => run(() => markDataSetReviewed(id))}>
            Xác nhận rà soát định kỳ (R8)
          </button>
          {suspendedUse && (
            <>
              <input placeholder="Căn cứ gỡ dừng sử dụng (kỳ đo đạt lại…)" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
              <button className={btnGhost} disabled={isPending} onClick={() => run(() => liftSuspension(id, reason))}>
                Gỡ cờ dừng sử dụng (QLCL)
              </button>
            </>
          )}
        </div>
      )}

      {status === "ACTIVE" && (
        <div className="flex flex-col gap-2 border-t border-border pt-3">
          <p className="text-xs text-ink-3">Vòng đời — hết nhu cầu dùng thường xuyên (ETV.P34 §6.7.1).</p>
          <input placeholder="Lý do chuyển Lưu trữ" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
          <button className={btnGhost} disabled={isPending} onClick={() => run(() => archiveDataSet(id, reason))}>
            Chuyển Lưu trữ
          </button>
        </div>
      )}

      {status === "ARCHIVED" && (
        <div className="flex flex-col gap-2 border-t border-border pt-3">
          <input placeholder="Lý do" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
          <button className={btnGhost} disabled={isPending} onClick={() => run(() => reactivateDataSet(id, reason))}>
            Đưa lại Hiệu lực
          </button>
          <button className={btnGhost} disabled={isPending} onClick={() => run(() => proposeDisposal(id, reason))}>
            Đề nghị hủy (QLCL)
          </button>
        </div>
      )}

      {status === "DISPOSAL_PROPOSED" && (
        <div className="flex flex-col gap-2 border-t border-border pt-3">
          <p className="text-xs font-semibold text-ink">Điều kiện trước khi hủy — ETV.P34 §6.7.2 (QLCL xác nhận)</p>
          {checkbox("retentionExpired", "Đã hết thời hạn lưu theo quy định")}
          {checkbox("notBasis", "Không còn là căn cứ của kết quả, chứng chỉ còn hiệu lực")}
          {checkbox("noDispute", "Không còn khiếu nại, tranh chấp, vụ việc, cuộc đánh giá liên quan")}
          {checkbox("noDependent", "Không còn tập dữ liệu, báo cáo, điểm tích hợp phụ thuộc")}
          <input
            placeholder="Số biên bản hủy (ETV.P27)"
            value={checklist.disposalRecordRef}
            onChange={(e) => setChecklist((c) => ({ ...c, disposalRecordRef: e.target.value }))}
            className={inputCls}
          />
          <button
            className={btnGhost}
            disabled={isPending}
            onClick={() => run(() => updateDisposalChecklist(id, checklist))}
          >
            Lưu kết quả kiểm tra (QLCL)
          </button>
          <button className={btnGhost} disabled={isPending} onClick={() => run(() => confirmDisposalMethod(id))}>
            Xác nhận phương pháp hủy (PT.ATTT) {disposal.atttConfirmed && "✓"}
          </button>
          <input placeholder="Lý do hủy (LĐV)" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
          <button className={btn} disabled={isPending} onClick={() => run(() => disposeDataSet(id, reason))}>
            LĐV phê duyệt hủy
          </button>
        </div>
      )}

      {status === "DISPOSED" && (
        <p className="text-sm text-good">
          Đã hủy theo ETV.P27 — bản ghi danh mục vẫn giữ để truy vết, chỉ đọc (ETV.P34 Phụ lục II.1).
        </p>
      )}

      {(status === "DRAFT" || status === "PENDING_REVIEW" || status === "REVIEW_REJECTED" || status === "PENDING_APPROVAL" || status === "APPROVAL_REJECTED") && (
        <div className="flex flex-col gap-2 border-t border-border pt-3">
          <input placeholder="Lý do hủy bản ghi (QLCL — khai báo sai/trùng)" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
          <button className={btnGhost} disabled={isPending} onClick={() => run(() => cancelDataSet(id, reason))}>
            Hủy bản ghi
          </button>
        </div>
      )}
    </div>
  );
}
