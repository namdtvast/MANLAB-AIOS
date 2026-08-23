"use client";

// Quy tắc 7 ETV.P16 (Increment 13) — LĐP thẩm tra kết quả khắc phục: đóng chương trình khi đủ
// tin cậy, hoặc đề xuất đánh giá bổ sung khi chưa đủ. Không tự đóng khi CAPA vừa hoàn thành.
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { closeAuditProgram, proposeFollowUpAudit } from "@/lib/m16/actions";

const inputCls =
  "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const btn =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";
const btnPrimary =
  "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";

export function CloseProgramPanel({ programId }: { programId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [reason, setReason] = useState("");

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-3">
      <p className="text-xs font-medium text-ink">Thẩm tra sau khắc phục (LĐP — quy tắc 7 ETV.P16)</p>

      <input placeholder="Ghi chú thẩm tra khi đóng chương trình" value={note} onChange={(e) => setNote(e.target.value)} className={inputCls} />
      {error && <p className="text-xs text-crit">{error}</p>}
      <button
        className={btnPrimary}
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            setError(null);
            const r = await closeAuditProgram(programId, { note: note || undefined });
            if (r.ok) router.refresh();
            else setError(r.message);
          })
        }
      >
        Thẩm tra đạt — đóng chương trình
      </button>

      <input
        placeholder="Lý do chưa đủ tin cậy (để đề xuất đánh giá bổ sung)"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className={inputCls}
      />
      <button
        className={btn}
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            setError(null);
            const r = await proposeFollowUpAudit(programId, { reason });
            if (r.ok) {
              setReason("");
              router.refresh();
            } else setError(r.message);
          })
        }
      >
        {isPending ? "Đang xử lý…" : "Chưa đủ tin cậy — đề xuất đánh giá bổ sung"}
      </button>
    </div>
  );
}
