"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createCorrectiveActionRequest } from "@/lib/m17/actions";

const inputCls =
  "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const btn =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";

export function NewCapaForm({ minutesId }: { minutesId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-3">
      <p className="text-xs font-medium text-ink">Lập phiếu yêu cầu khắc phục (F13.01, → M13)</p>
      <textarea placeholder="Nội dung yêu cầu khắc phục" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className={inputCls} />
      {error && <p className="text-xs text-crit">{error}</p>}
      <button
        className={btn}
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            setError(null);
            try {
              await createCorrectiveActionRequest({ minutesId, description });
              router.refresh();
            } catch (e) {
              setError(e instanceof Error ? e.message : "Có lỗi xảy ra.");
            }
          })
        }
      >
        {isPending ? "Đang lưu…" : "Lập phiếu"}
      </button>
    </div>
  );
}
