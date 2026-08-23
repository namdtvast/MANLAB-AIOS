"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { approveDisclosure } from "@/lib/m02/actions";
import { AUTHORITY_LEVEL_LABEL } from "@/lib/m02/labels";

const btn =
  "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";

export function DisclosureActionPanel({
  id,
  status,
  authorityLevel,
  m02Role,
}: {
  id: string;
  status: string;
  authorityLevel: string;
  m02Role: string | null;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
      <p className="text-xs text-ink-3">
        Vai trò M02 của bạn: <strong className="text-ink">{m02Role ?? "chưa gán"}</strong>
      </p>
      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      {status === "DRAFT" ? (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-ink-3">
            Cần thẩm quyền: <strong className="text-ink">{AUTHORITY_LEVEL_LABEL[authorityLevel]}</strong>
          </p>
          <button
            className={btn}
            disabled={isPending}
            onClick={() =>
              startTransition(async () => {
                setError(null);
                const r = await approveDisclosure(id);
                if (!r.ok) setError(r.message);
                else router.refresh();
              })
            }
          >
            Phê duyệt công bố
          </button>
        </div>
      ) : (
        <p className="text-sm text-good">Đã phê duyệt.</p>
      )}
    </div>
  );
}
