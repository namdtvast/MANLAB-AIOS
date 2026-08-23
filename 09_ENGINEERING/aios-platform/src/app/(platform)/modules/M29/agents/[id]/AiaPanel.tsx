"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { aiaAction, createAia } from "@/lib/m29/actions";
import { AIA_STATUS_LABEL, AIA_STATUS_TONE } from "@/lib/m29/labels";
import type { M29Role } from "@/lib/m29/model";
import type { AIImpactAssessment } from "@/generated/prisma/client";

const btn = "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const btnGhost =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";
const TONE_CLASS: Record<string, string> = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  crit: "bg-crit-soft text-crit",
  neutral: "bg-sunk text-ink-2",
};

export function AiaPanel({ aia, agentId, m29Role }: { aia: AIImpactAssessment | null; agentId: string; m29Role: M29Role | null }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const canWrite = m29Role === "AI_ADMIN" || m29Role === "SUPER_ADMIN";

  const runAction = (fn: () => Promise<{ ok: boolean; message?: string } | unknown>) => {
    setError(null);
    startTransition(async () => {
      const r = await fn();
      if (r && typeof r === "object" && "ok" in r && !(r as { ok: boolean }).ok) setError((r as { message?: string }).message ?? "Có lỗi xảy ra.");
      else router.refresh();
    });
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-head text-sm font-bold text-ink">AI Impact Assessment (ISO 42001)</h2>
        {aia && <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[AIA_STATUS_TONE[aia.status]]}`}>{AIA_STATUS_LABEL[aia.status]}</span>}
      </div>
      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      {!aia ? (
        <>
          <p className="text-xs text-ink-3">Agent chưa có hồ sơ AIA — Tool Gateway sẽ chặn mọi lời gọi cho tới khi có AIA ở trạng thái Đã phê duyệt.</p>
          {canWrite && (
            <button
              className={btn}
              disabled={isPending}
              onClick={() =>
                runAction(() =>
                  createAia({
                    agentId,
                    purpose: "Rà soát và gắn cờ cảnh báo — không tự kết luận phù hợp",
                    risk: "LOW",
                    humanOversight: "Người thẩm định xác nhận trước khi phê duyệt hồ sơ",
                  })
                )
              }
            >
              Khởi tạo hồ sơ AIA
            </button>
          )}
        </>
      ) : (
        <>
          <dl className="grid grid-cols-1 gap-y-1.5 text-xs">
            <dt className="text-ink-3">Mã hồ sơ</dt>
            <dd className="font-mono text-ink">{aia.code}</dd>
            <dt className="text-ink-3">Mục đích</dt>
            <dd className="text-ink">{aia.purpose}</dd>
            <dt className="text-ink-3">Rủi ro / Rủi ro còn lại</dt>
            <dd className="text-ink">
              {aia.risk} / {aia.residualRisk}
            </dd>
          </dl>

          {canWrite && (
            <div className="flex flex-col gap-2">
              {aia.status === "NOT_ASSESSED" && (
                <button className={btn} disabled={isPending} onClick={() => runAction(() => aiaAction(aia.id, "start-draft"))}>
                  Khởi tạo Nháp
                </button>
              )}
              {aia.status === "DRAFT" && (
                <button className={btn} disabled={isPending} onClick={() => runAction(() => aiaAction(aia.id, "submit-review"))}>
                  Gửi soát xét
                </button>
              )}
              {aia.status === "REVIEWED" && (
                <button className={btn} disabled={isPending} onClick={() => runAction(() => aiaAction(aia.id, "approve"))}>
                  Phê duyệt AIA
                </button>
              )}
              {aia.status === "APPROVED" && (
                <div className="flex flex-col gap-2">
                  <input placeholder="Lý do cần rà soát lại" value={reason} onChange={(e) => setReason(e.target.value)}
                    className="rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none focus:border-accent-line" />
                  <button className={btnGhost} disabled={isPending} onClick={() => runAction(() => aiaAction(aia.id, "flag-review-required", { reason }))}>
                    Gắn cờ cần rà soát lại
                  </button>
                </div>
              )}
              {aia.status === "REVIEW_REQUIRED" && (
                <button className={btn} disabled={isPending} onClick={() => runAction(() => aiaAction(aia.id, "start-draft"))}>
                  Khởi tạo lại (đánh giá mới)
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
