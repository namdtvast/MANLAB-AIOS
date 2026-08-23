"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  leaderDecideRisk,
  reviewOpportunity,
  reviewRisk,
  submitEvidenceOpportunity,
  submitEvidenceRisk,
  submitOpportunity,
  submitRisk,
  verifyOpportunity,
  verifyRisk,
} from "@/lib/m01/actions";
import type { M01VerifyResult } from "@/generated/prisma/enums";

interface Props {
  type: "risk" | "opportunity";
  id: string;
  status: string;
  riskLevel: string | null;
  assigneeId: string | null;
  hasEvidence: boolean;
  m01Role: string | null;
  currentUserId: string | null;
  assignableUsers: { id: string; name: string }[];
}

const btn =
  "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const btnGhost =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";
const inputCls =
  "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";

export function ActionPanel({ type, id, status, riskLevel, assigneeId, hasEvidence, m01Role, currentUserId, assignableUsers }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [selectedAssignee, setSelectedAssignee] = useState(assignableUsers[0]?.id ?? "");
  const [dueDate, setDueDate] = useState("");
  const [evidence, setEvidence] = useState("");
  const [verifyResult, setVerifyResult] = useState<M01VerifyResult>("DAT");

  const isRisk = type === "risk";

  const run = (fn: () => Promise<{ ok: boolean; message?: string } | void>) => {
    setError(null);
    startTransition(async () => {
      const r = await fn();
      if (r && "ok" in r && !r.ok) setError(r.message ?? "Có lỗi xảy ra.");
      else router.refresh();
    });
  };

  const submitFn = () => (isRisk ? submitRisk(id) : submitOpportunity(id));
  const reviewFn = (input: Parameters<typeof reviewRisk>[1]) =>
    isRisk ? reviewRisk(id, input) : reviewOpportunity(id, input);
  const submitEvidenceFn = (ev: string) => (isRisk ? submitEvidenceRisk(id, ev) : submitEvidenceOpportunity(id, ev));
  const verifyFn = (input: Parameters<typeof verifyRisk>[1]) => (isRisk ? verifyRisk(id, input) : verifyOpportunity(id, input));

  const isRatCao = isRisk && riskLevel === "RATCAO";

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
      <p className="text-xs text-ink-3">
        Vai trò M01 của bạn: <strong className="text-ink">{m01Role ?? "chưa gán"}</strong>
      </p>
      {error && (
        <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>
      )}

      {status === "DRAFT" && (
        <button className={btn} disabled={isPending} onClick={() => run(submitFn)}>
          Gửi soát xét
        </button>
      )}

      {status === "PENDING_REVIEW" && (
        <div className="flex flex-col gap-2">
          {isRatCao && (
            <p className="text-xs text-warn">Mức Rất cao — soát xét đạt sẽ chuyển LĐV quyết định (chưa cần phân công ở bước này).</p>
          )}
          {!isRatCao && (
            <>
              <select value={selectedAssignee} onChange={(e) => setSelectedAssignee(e.target.value)} className={inputCls}>
                <option value="">— Chọn người phụ trách —</option>
                {assignableUsers.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
              <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className={inputCls} />
            </>
          )}
          <input placeholder="Lý do (bắt buộc nếu trả lại)" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
          <div className="flex gap-2">
            <button
              className={btn}
              disabled={isPending}
              onClick={() =>
                run(() =>
                  reviewFn({
                    decision: "approve",
                    assigneeId: isRatCao ? undefined : selectedAssignee || undefined,
                    dueDate: isRatCao ? undefined : dueDate || undefined,
                  })
                )
              }
            >
              Soát xét đạt
            </button>
            <button className={btnGhost} disabled={isPending} onClick={() => run(() => reviewFn({ decision: "return", reason }))}>
              Trả lại
            </button>
          </div>
        </div>
      )}

      {status === "PENDING_LEADER_APPROVAL" && (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-warn">Rủi ro mức Rất cao — chỉ LĐV được quyết định.</p>
          <select value={selectedAssignee} onChange={(e) => setSelectedAssignee(e.target.value)} className={inputCls}>
            <option value="">— Chọn người phụ trách —</option>
            {assignableUsers.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className={inputCls} />
          <input placeholder="Lý do (bắt buộc nếu không phê duyệt)" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
          <div className="flex gap-2">
            <button
              className={btn}
              disabled={isPending}
              onClick={() =>
                run(() => leaderDecideRisk(id, { decision: "approve", assigneeId: selectedAssignee || undefined, dueDate: dueDate || undefined }))
              }
            >
              LĐV phê duyệt
            </button>
            <button className={btnGhost} disabled={isPending} onClick={() => run(() => leaderDecideRisk(id, { decision: "reject", reason }))}>
              LĐV không phê duyệt
            </button>
          </div>
        </div>
      )}

      {status === "IN_PROGRESS" && (
        <div className="flex flex-col gap-3">
          {assigneeId === currentUserId && (
            <div className="flex flex-col gap-2">
              <p className="text-xs text-ink-3">Nộp bằng chứng thực hiện:</p>
              <input placeholder="Mô tả bằng chứng" value={evidence} onChange={(e) => setEvidence(e.target.value)} className={inputCls} />
              <button className={btn} disabled={isPending} onClick={() => run(() => submitEvidenceFn(evidence))}>
                Nộp bằng chứng
              </button>
            </div>
          )}

          {hasEvidence && assigneeId !== currentUserId && (
            <div className="flex flex-col gap-2">
              <p className="text-xs text-ink-3">Thẩm xét kết quả thực hiện:</p>
              <select value={verifyResult} onChange={(e) => setVerifyResult(e.target.value as M01VerifyResult)} className={inputCls}>
                <option value="DAT">Đạt</option>
                <option value="CHUA_DAT">Chưa đạt</option>
              </select>
              <input placeholder="Lý do (bắt buộc nếu Chưa đạt)" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
              <button className={btn} disabled={isPending} onClick={() => run(() => verifyFn({ result: verifyResult, reason }))}>
                Ghi nhận thẩm xét
              </button>
            </div>
          )}

          {!hasEvidence && assigneeId !== currentUserId && (
            <p className="text-xs text-ink-3">Chờ người phụ trách nộp bằng chứng thực hiện.</p>
          )}
        </div>
      )}

      {status === "DONE" && <p className="text-sm text-good">Hồ sơ đã hoàn thành.</p>}
    </div>
  );
}
