"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  approveAssessment,
  linkCapa,
  newVersion,
  publishAssessment,
  reviewAssessment,
  submitAssessment,
} from "@/lib/m10/actions";
import { PUB_STATUS_LABEL } from "@/lib/m10/labels";
import type { M10PubStatus } from "@/generated/prisma/enums";

interface Props {
  id: string;
  status: string;
  result: string | null;
  capaId: string | null;
  m10Role: string | null;
}

const btn =
  "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const btnGhost =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";
const inputCls =
  "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";

export function ActionPanel({ id, status, result, capaId, m10Role }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [pubStatus, setPubStatus] = useState<M10PubStatus>("PASS");

  const run = (fn: () => Promise<{ ok: boolean; message?: string } | void>) => {
    setError(null);
    startTransition(async () => {
      const r = await fn();
      if (r && "ok" in r && !r.ok) setError(r.message ?? "Có lỗi xảy ra.");
      else router.refresh();
    });
  };

  const requiresCapa = result === "FAIL" && !capaId;

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
      <p className="text-xs text-ink-3">
        Vai trò M10 của bạn: <strong className="text-ink">{m10Role ?? "chưa gán"}</strong>
      </p>
      {error && (
        <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">
          {error}
        </p>
      )}

      {status === "DRAFT" || status === "RETURNED" || status === "REJECTED" ? (
        <button className={btn} disabled={isPending} onClick={() => run(() => submitAssessment(id))}>
          Gửi soát xét
        </button>
      ) : null}

      {status === "PENDING_REVIEW" && (
        <div className="flex flex-col gap-2">
          <input
            placeholder="Lý do (bắt buộc nếu trả lại)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className={inputCls}
          />
          <div className="flex gap-2">
            <button
              className={btn}
              disabled={isPending}
              onClick={() => run(() => reviewAssessment(id, { decision: "approve" }))}
            >
              Soát xét đạt
            </button>
            <button
              className={btnGhost}
              disabled={isPending}
              onClick={() => run(() => reviewAssessment(id, { decision: "return", reason }))}
            >
              Trả lại
            </button>
          </div>
        </div>
      )}

      {status === "PENDING_APPROVAL" && (
        <div className="flex flex-col gap-2">
          {requiresCapa && (
            <p className="text-xs text-warn">
              Kết quả KHÔNG ĐẠT — cần liên kết KPH-CAPA trước khi phê duyệt.
            </p>
          )}
          <input
            placeholder="Lý do (bắt buộc nếu từ chối)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className={inputCls}
          />
          <div className="flex gap-2">
            <button
              className={btn}
              disabled={isPending}
              onClick={() => run(() => approveAssessment(id, { decision: "approve" }))}
            >
              Phê duyệt
            </button>
            <button
              className={btnGhost}
              disabled={isPending}
              onClick={() => run(() => approveAssessment(id, { decision: "reject", reason }))}
            >
              Từ chối
            </button>
          </div>
        </div>
      )}

      {status === "APPROVED" && (
        <div className="flex flex-col gap-2">
          <select
            value={pubStatus}
            onChange={(e) => setPubStatus(e.target.value as M10PubStatus)}
            className={inputCls}
          >
            {Object.entries(PUB_STATUS_LABEL).map(([k, label]) => (
              <option key={k} value={k}>
                {label}
              </option>
            ))}
          </select>
          <button className={btn} disabled={isPending} onClick={() => run(() => publishAssessment(id, { pubStatus }))}>
            Công bố
          </button>
        </div>
      )}

      {requiresCapa && (
        <button className={btnGhost} disabled={isPending} onClick={() => run(() => linkCapa(id))}>
          Liên kết KPH-CAPA (→ M13)
        </button>
      )}

      <button className={btnGhost} disabled={isPending} onClick={() => run(() => newVersion(id))}>
        Tạo phiên bản mới
      </button>
    </div>
  );
}
