"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { callToolAction } from "@/lib/m29/actions";
import type { M29Role } from "@/lib/m29/model";
import type { AITool } from "@/generated/prisma/client";

const btn = "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";

export function ToolGatewayPanel({ agentId, tools, m29Role }: { agentId: string; tools: AITool[]; m29Role: M29Role | null }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [toolId, setToolId] = useState(tools[0]?.id ?? "");
  const [result, setResult] = useState<{ ok: boolean; message?: string; traceId?: string } | null>(null);

  const call = () => {
    setResult(null);
    startTransition(async () => {
      const r = await callToolAction({ toolId, agentId, input: {} });
      setResult(r);
      router.refresh();
    });
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
      <h2 className="font-head text-sm font-bold text-ink">Gọi thử qua Tool Gateway</h2>
      <p className="text-xs text-ink-3">Đi qua đủ 7 bước kiểm soát: Tool tồn tại → whitelist Agent → quyền vai trò → AIA đã phê duyệt → gọi Platform Adapter thật.</p>
      <select
        value={toolId}
        onChange={(e) => setToolId(e.target.value)}
        className="rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none focus:border-accent-line"
      >
        {tools.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
      <button className={btn} disabled={isPending || !toolId || !m29Role} onClick={call}>
        {isPending ? "Đang gọi…" : "Gọi Tool"}
      </button>
      {result && (
        <p className={`rounded-lg border px-3 py-2 text-xs ${result.ok ? "border-good/30 bg-good-soft text-good" : "border-crit/30 bg-crit-soft text-crit"}`}>
          {result.ok ? `Thành công — traceId ${result.traceId}` : result.message}
        </p>
      )}
    </div>
  );
}
