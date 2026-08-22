"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createPromptVersion, promptAction } from "@/lib/m29/actions";
import { PROMPT_STATUS_LABEL } from "@/lib/m29/labels";
import type { M29Role } from "@/lib/m29/model";
import type { AIPromptVersion } from "@/generated/prisma/client";

const btn = "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const btnSm =
  "cursor-pointer rounded-md border border-border-strong px-2 py-1 text-xs text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";

export function PromptPanel({
  agentId,
  versions,
  activeVersionId,
  m29Role,
}: {
  agentId: string;
  versions: AIPromptVersion[];
  activeVersionId: string | null;
  m29Role: M29Role | null;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const canWrite = m29Role === "AI_ADMIN" || m29Role === "SUPER_ADMIN";

  const run = (fn: () => Promise<{ ok: boolean; message?: string } | unknown>) => {
    setError(null);
    startTransition(async () => {
      const r = await fn();
      if (r && typeof r === "object" && "ok" in r && !(r as { ok: boolean }).ok) setError((r as { message?: string }).message ?? "Có lỗi xảy ra.");
      else {
        setContent("");
        router.refresh();
      }
    });
  };

  return (
    <div>
      <h2 className="mb-2 font-head text-sm font-bold text-ink">Prompt — Vòng đời phiên bản</h2>
      {error && <p className="mb-2 rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}
      <div className="flex flex-col gap-2">
        {versions.map((v) => (
          <div key={v.id} className="rounded-lg border border-border bg-surface p-3 text-sm">
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium text-ink">
                {PROMPT_STATUS_LABEL[v.status]} {v.id === activeVersionId && <span className="ml-1 text-xs text-good">(đang hiệu lực)</span>}
              </span>
              {canWrite && (
                <span className="flex gap-1.5">
                  {v.status === "DRAFT" && (
                    <button className={btnSm} disabled={isPending} onClick={() => run(() => promptAction(v.id, "submit-review"))}>
                      Gửi soát xét
                    </button>
                  )}
                  {v.status === "REVIEW" && (
                    <button className={btnSm} disabled={isPending} onClick={() => run(() => promptAction(v.id, "approve"))}>
                      Phê duyệt
                    </button>
                  )}
                  {v.status === "APPROVED" && (
                    <button className={btnSm} disabled={isPending} onClick={() => run(() => promptAction(v.id, "activate"))}>
                      Kích hoạt
                    </button>
                  )}
                </span>
              )}
            </div>
            <p className="mt-1.5 text-xs text-ink-2">{v.content}</p>
          </div>
        ))}
        {versions.length === 0 && <p className="text-xs text-ink-3">Chưa có phiên bản Prompt nào.</p>}
      </div>

      {canWrite && (
        <div className="mt-3 flex flex-col gap-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Nội dung Prompt mới (sẽ tạo version DRAFT — không ghi đè bản ACTIVE hiện có)"
            rows={3}
            className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent-line"
          />
          <button className={btn} disabled={isPending || !content.trim()} onClick={() => run(() => createPromptVersion(agentId, content))}>
            Tạo phiên bản mới
          </button>
        </div>
      )}
    </div>
  );
}
