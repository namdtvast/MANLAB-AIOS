"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { recordConclusion } from "@/lib/m17/actions";

const inputCls =
  "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const btn =
  "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";

export function RecordConclusionForm({ minutesId, m17Role }: { minutesId: string; m17Role: string | null }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [conclusion, setConclusion] = useState("");

  return (
    <div className="mt-2 flex flex-col gap-2">
      <p className="text-xs text-ink-3">
        Chỉ LĐV ghi được kết luận (vai trò của bạn: <strong>{m17Role ?? "chưa gán"}</strong>)
      </p>
      <textarea placeholder="Kết luận cuối cùng" value={conclusion} onChange={(e) => setConclusion(e.target.value)} rows={2} className={inputCls} />
      {error && <p className="text-xs text-crit">{error}</p>}
      <button
        className={btn}
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            setError(null);
            const r = await recordConclusion(minutesId, conclusion);
            if (!r.ok) setError(r.message);
            else router.refresh();
          })
        }
      >
        {isPending ? "Đang lưu…" : "Ghi kết luận"}
      </button>
    </div>
  );
}
