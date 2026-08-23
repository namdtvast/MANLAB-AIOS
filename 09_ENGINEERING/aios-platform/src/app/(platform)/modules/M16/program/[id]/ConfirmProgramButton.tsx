"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { confirmAuditProgram } from "@/lib/m16/actions";

const btn =
  "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";

export function ConfirmProgramButton({ id }: { id: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-3">
      {error && <p className="text-xs text-crit">{error}</p>}
      <button
        className={btn}
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            setError(null);
            const r = await confirmAuditProgram(id);
            if (!r.ok) setError(r.message);
            else router.refresh();
          })
        }
      >
        Xác nhận chương trình (thông báo bộ phận liên quan)
      </button>
    </div>
  );
}
