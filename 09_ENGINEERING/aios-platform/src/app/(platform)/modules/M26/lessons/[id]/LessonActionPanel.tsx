"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { analyzeLesson, approveLesson, cancelLesson, submitLesson, updateLesson, type LessonFormInput } from "@/lib/m26/actions";
import { M26_ROLE_LABEL } from "@/lib/m26/labels";

const btn =
  "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-ink hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const btnGhost =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";
const inputCls = "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none focus:border-accent-line";

export function LessonActionPanel({
  id,
  status,
  role,
  current,
  items,
}: {
  id: string;
  status: string;
  role: string | null;
  current: LessonFormInput;
  items: { id: string; code: string; title: string }[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [itemId, setItemId] = useState(current.knowledgeItemId ?? "");

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

  const editable = status === "MOI" || status === "DANG_PHAN_TICH";

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
      <p className="text-xs text-ink-3">
        Vai trò M26 của bạn: <strong className="text-ink">{role ? (M26_ROLE_LABEL[role] ?? role) : "chưa gán"}</strong>
      </p>
      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      {editable && (
        <div className="flex flex-col gap-2">
          <label className="text-xs text-ink-3">Mục tri thức kết tinh (bắt buộc trước khi trình phê duyệt)</label>
          <select value={itemId} onChange={(e) => setItemId(e.target.value)} className={inputCls}>
            <option value="">— Chưa gắn —</option>
            {items.map((i) => (
              <option key={i.id} value={i.id}>
                {i.code} — {i.title}
              </option>
            ))}
          </select>
          <button
            className={btnGhost}
            disabled={isPending}
            onClick={() => run(() => updateLesson(id, { ...current, knowledgeItemId: itemId || undefined }))}
          >
            Lưu liên kết mục tri thức
          </button>
        </div>
      )}

      {status === "MOI" && (
        <button className={btn} disabled={isPending} onClick={() => run(() => analyzeLesson(id))}>
          Nhận phân tích
        </button>
      )}

      {status === "DANG_PHAN_TICH" && (
        <button className={btn} disabled={isPending} onClick={() => run(() => submitLesson(id))}>
          Trình phê duyệt
        </button>
      )}

      {status === "CHO_PHE_DUYET" && (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-ink-3">Bước phê duyệt — chỉ Lãnh đạo Viện.</p>
          <button className={btn} disabled={isPending} onClick={() => run(() => approveLesson(id, true))}>
            Phê duyệt bài học
          </button>
          <input placeholder="Lý do trả lại" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
          <button className={btnGhost} disabled={isPending} onClick={() => run(() => approveLesson(id, false, reason))}>
            Trả lại
          </button>
        </div>
      )}

      {status === "DA_PHE_DUYET" && <p className="text-sm text-good">Bài học đã phê duyệt — hồ sơ bất biến, lưu theo ETV.MP15 (10 năm).</p>}

      {status !== "DA_PHE_DUYET" && status !== "HUY" && (
        <div className="flex flex-col gap-2 border-t border-border pt-3">
          <input placeholder="Lý do hủy phiếu" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
          <button className={btnGhost} disabled={isPending} onClick={() => run(() => cancelLesson(id, reason))}>
            Hủy phiếu bài học
          </button>
        </div>
      )}
    </div>
  );
}
