"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  approveAsset,
  cancelAsset,
  markAssetReviewed,
  recordRestoreTest,
  retireAsset,
  reviewAsset,
  setAiUse,
  submitAsset,
} from "@/lib/m27/actions";

const btn =
  "cursor-pointer rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const btnGhost =
  "cursor-pointer rounded-lg border border-border px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";
const inputCls =
  "w-full rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";

export function AssetActionPanel({
  id,
  status,
  role,
  backupRequired,
  aiUseAllowed,
}: {
  id: string;
  status: string;
  role: string | null;
  backupRequired: boolean;
  aiUseAllowed: boolean;
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
        setEvidence("");
        router.refresh();
      }
    });
  };

  const editable = ["DRAFT", "REVIEW_REJECTED", "APPROVAL_REJECTED"].includes(status);
  const inUse = status === "DANG_SU_DUNG";

  const actions: React.ReactNode[] = [];

  if (editable) {
    actions.push(
      <button key="submit" className={btn} disabled={isPending} onClick={() => run(() => submitAsset(id))}>
        Gửi soát xét
      </button>,
    );
    if (role === "LDV")
      actions.push(
        <button key="cancel" className={btnGhost} disabled={isPending} onClick={() => run(() => cancelAsset(id, reason))}>
          Huỷ bản ghi
        </button>,
      );
  }

  if (status === "PENDING_REVIEW" && role === "ATTT") {
    actions.push(
      <button key="rv-ok" className={btn} disabled={isPending} onClick={() => run(() => reviewAsset(id, true))}>
        Soát xét đạt
      </button>,
      <button
        key="rv-no"
        className={btnGhost}
        disabled={isPending}
        onClick={() => run(() => reviewAsset(id, false, reason))}
      >
        Không soát xét
      </button>,
    );
  }

  if (status === "PENDING_APPROVAL" && role === "LDV") {
    actions.push(
      <button key="ap-ok" className={btn} disabled={isPending} onClick={() => run(() => approveAsset(id, true))}>
        Phê duyệt vào danh mục
      </button>,
      <button
        key="ap-no"
        className={btnGhost}
        disabled={isPending}
        onClick={() => run(() => approveAsset(id, false, reason))}
      >
        Không phê duyệt
      </button>,
    );
  }

  if (inUse) {
    actions.push(
      <button key="reviewed" className={btnGhost} disabled={isPending} onClick={() => run(() => markAssetReviewed(id))}>
        Ghi nhận đã rà soát
      </button>,
      <button key="retire" className={btnGhost} disabled={isPending} onClick={() => run(() => retireAsset(id, reason))}>
        Chuyển Ngừng sử dụng
      </button>,
    );
    if (role === "QLCL" || role === "QTHT" || role === "ATTT")
      actions.push(
        <button
          key="ai"
          className={btnGhost}
          disabled={isPending}
          onClick={() => run(() => setAiUse(id, !aiUseAllowed))}
        >
          {aiUseAllowed ? "Bỏ cho phép dùng cho AI" : "Cho phép dùng cho AI"}
        </button>,
      );
  }

  if (actions.length === 0 && !(inUse && backupRequired)) return null;

  return (
    <section className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
      <h2 className="font-head text-lg font-semibold text-ink">Hành động</h2>
      {error && (
        <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>
      )}

      <div>
        <label className="text-xs font-medium text-ink-3">
          Lý do — bắt buộc khi không soát xét, không phê duyệt, ngừng sử dụng hoặc huỷ bản ghi
        </label>
        <input className={inputCls} value={reason} onChange={(e) => setReason(e.target.value)} />
      </div>

      <div className="flex flex-wrap gap-2">{actions}</div>

      {inUse && backupRequired && (
        <div className="flex flex-col gap-2 border-t border-border pt-3">
          <label className="text-xs font-medium text-ink-3">
            Ghi nhận kiểm chứng phục hồi — dẫn chiếu bằng chứng F31.03 của ETV.P31 (§6.5.2)
          </label>
          <input
            className={inputCls}
            placeholder="vd F31.03/2026-08"
            value={evidence}
            onChange={(e) => setEvidence(e.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            <button
              className={btn}
              disabled={isPending}
              onClick={() => run(() => recordRestoreTest(id, true, evidence))}
            >
              Kiểm chứng Đạt
            </button>
            <button
              className={btnGhost}
              disabled={isPending}
              onClick={() => run(() => recordRestoreTest(id, false, evidence))}
            >
              Kiểm chứng Không đạt
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
