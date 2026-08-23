"use client";

// Quy tắc 6 ETV.P16 (Increment 13) — Trưởng bộ phận được đánh giá: nhận kết quả → phân tích
// nguyên nhân → đề xuất hành động khắc phục; đề xuất mở hồ sơ KPH thật bên M13.
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { acknowledgeFinding, proposeCorrectiveAction } from "@/lib/m16/actions";

const inputCls =
  "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const btn =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";

export function FindingActions({ findingId, acknowledged, hasNcw }: { findingId: string; acknowledged: boolean; hasNcw: boolean }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [rootCause, setRootCause] = useState("");

  if (hasNcw) return null;

  return (
    <div className="mt-2 flex flex-col gap-2 rounded-lg border border-border bg-bg p-2">
      {!acknowledged && (
        <button
          className={btn}
          disabled={isPending}
          onClick={() =>
            startTransition(async () => {
              setError(null);
              const r = await acknowledgeFinding(findingId);
              if (r.ok) router.refresh();
              else setError(r.message);
            })
          }
        >
          Xác nhận đã nhận kết quả (đã thông báo tới nhân viên)
        </button>
      )}

      <textarea
        placeholder="Phân tích nguyên nhân (bắt buộc trước khi chuyển M13)"
        value={rootCause}
        onChange={(e) => setRootCause(e.target.value)}
        rows={2}
        className={inputCls}
      />
      {error && <p className="text-xs text-crit">{error}</p>}
      <button
        className={btn}
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            setError(null);
            const r = await proposeCorrectiveAction(findingId, { rootCause });
            if (r.ok) {
              setRootCause("");
              router.refresh();
            } else setError(r.message);
          })
        }
      >
        {isPending ? "Đang xử lý…" : "Đề xuất hành động khắc phục → mở hồ sơ M13"}
      </button>
    </div>
  );
}
