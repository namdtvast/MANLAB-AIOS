"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { linkRisk, unlinkRisk } from "@/lib/m26/actions";

const btnGhost =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-xs text-ink transition-colors hover:bg-sunk disabled:opacity-50";
const fieldCls = "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none focus:border-accent-line";

export function RiskLinkPanel({
  itemId,
  links,
  risks,
}: {
  itemId: string;
  links: { riskId: string; code: string; title: string }[];
  risks: { id: string; code: string; title: string }[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [riskId, setRiskId] = useState(risks[0]?.id ?? "");

  const run = (fn: () => Promise<{ ok: boolean; message?: string }>) => {
    setError(null);
    startTransition(async () => {
      const r = await fn();
      if (!r.ok) setError(r.message ?? "Có lỗi xảy ra.");
      else router.refresh();
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-xs text-crit">{error}</p>}
      <ul className="flex flex-col gap-1">
        {links.map((l) => (
          <li key={l.riskId} className="flex items-center justify-between gap-2 text-sm text-ink-2">
            <span>
              <span className="font-mono text-xs text-accent">{l.code}</span> — {l.title}
            </span>
            <button className={btnGhost} disabled={isPending} onClick={() => run(() => unlinkRisk(itemId, l.riskId))}>
              Gỡ
            </button>
          </li>
        ))}
        {links.length === 0 && <li className="text-sm text-ink-3">Chưa liên kết rủi ro nào bên M01.</li>}
      </ul>
      {risks.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <select value={riskId} onChange={(e) => setRiskId(e.target.value)} className={fieldCls}>
            {risks.map((r) => (
              <option key={r.id} value={r.id}>
                {r.code} — {r.title}
              </option>
            ))}
          </select>
          <button className={btnGhost} disabled={isPending || !riskId} onClick={() => run(() => linkRisk(itemId, riskId))}>
            + Liên kết rủi ro M01
          </button>
        </div>
      )}
    </div>
  );
}
