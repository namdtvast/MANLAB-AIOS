"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { callToolAction } from "@/lib/m29/actions";
import { can, type M29Role } from "@/lib/m29/model";
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
      {/* Whitelist rỗng không phải lỗi cấu hình đang chờ ai đó sửa: với tác tử chỉ tra cứu, đó
          chính là kiểm soát. Nói ra bằng chữ, thay vì để một ô chọn trống cạnh một nút bấm mờ. */}
      {tools.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border px-3 py-2 text-xs text-ink-3">
          Tác tử này không có công cụ nào trong whitelist nên không có gì để gọi thử. Phép thử tương ứng nằm ở bộ đánh giá F29.03 (ETV.P29 mục 5.3.1 — kiểm thử giới hạn quyền): gọi một công cụ ngoài danh sách và kỳ vọng cổng chặn.
        </p>
      ) : (
        <>
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
        </>
      )}
      {result && (
        <p className={`rounded-lg border px-3 py-2 text-xs ${result.ok ? "border-good/30 bg-good-soft text-good" : "border-crit/30 bg-crit-soft text-crit"}`}>
          {result.ok ? (
            <>
              {/* Bằng chứng công cụ chạy thật nằm ở nhật ký, không nằm ở dòng thông báo này. */}
              Thành công — trace <span className="font-mono">{result.traceId}</span>.{" "}
              {/* Gọi Tool được không kéo theo quyền đọc nhật ký: AI_ADMIN có cái trước, không có cái sau. */}
              {can(m29Role, "traces") && (
                <Link href="/modules/M29/traces" className="underline">
                  Xem trong nhật ký gọi AI
                </Link>
              )}
            </>
          ) : (
            result.message
          )}
        </p>
      )}
    </div>
  );
}
