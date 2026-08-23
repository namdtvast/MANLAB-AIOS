"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { approveTrainingRecord, submitTrainingRecord, updateTrainingConditions } from "@/lib/m03/actions";
import { TRAINING_CONDITION_LABEL } from "@/lib/m03/labels";

interface Conditions {
  c1AttendedAllContent: boolean;
  c2FollowedRules: boolean;
  c3CanPerformWork: boolean;
  c4RecordsComplete: boolean;
  c5AssessmentPassed: boolean;
  c6EvidenceSufficient: boolean;
}

interface Props {
  id: string;
  status: string;
  m03Role: string | null;
  conditions: Conditions;
  assessmentMethod: string;
  evidence: string;
}

const btn =
  "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const btnGhost =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";
const inputCls =
  "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";

const CONDITION_KEYS = Object.keys(TRAINING_CONDITION_LABEL) as (keyof Conditions)[];

export function TrainingActionPanel({ id, status, m03Role, conditions: initial, assessmentMethod: initialMethod, evidence: initialEvidence }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [conditions, setConditions] = useState<Conditions>(initial);
  const [assessmentMethod, setAssessmentMethod] = useState(initialMethod);
  const [evidence, setEvidence] = useState(initialEvidence);

  const run = (fn: () => Promise<{ ok: boolean; message?: string } | void>) => {
    setError(null);
    startTransition(async () => {
      const r = await fn();
      if (r && "ok" in r && !r.ok) setError(r.message ?? "Có lỗi xảy ra.");
      else router.refresh();
    });
  };

  const allMet = CONDITION_KEYS.every((k) => conditions[k]);
  const canEdit = status === "DRAFT" || status === "NEEDS_SUPPLEMENT";

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
      <p className="text-xs text-ink-3">
        Vai trò M03 của bạn: <strong className="text-ink">{m03Role ?? "chưa gán"}</strong>
      </p>
      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      {canEdit && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-ink">6 điều kiện hoàn thành (quy tắc 3, ETV.P03):</p>
          {CONDITION_KEYS.map((k) => (
            <label key={k} className="flex items-center gap-2 text-xs text-ink-2">
              <input
                type="checkbox"
                checked={conditions[k]}
                onChange={(e) => setConditions((c) => ({ ...c, [k]: e.target.checked }))}
              />
              {TRAINING_CONDITION_LABEL[k]}
            </label>
          ))}
          <input
            placeholder="Phương pháp đánh giá"
            value={assessmentMethod}
            onChange={(e) => setAssessmentMethod(e.target.value)}
            className={inputCls}
          />
          <input placeholder="Bằng chứng thực hiện" value={evidence} onChange={(e) => setEvidence(e.target.value)} className={inputCls} />
          <button
            className={btnGhost}
            disabled={isPending}
            onClick={() => run(async () => { await updateTrainingConditions(id, { ...conditions, assessmentMethod, evidence }); })}
          >
            Lưu
          </button>
          <button className={btn} disabled={isPending} onClick={() => run(() => submitTrainingRecord(id))}>
            Gửi duyệt
          </button>
        </div>
      )}

      {status === "PENDING_APPROVAL" && (
        <div className="flex flex-col gap-2">
          <p className={`text-xs ${allMet ? "text-good" : "text-warn"}`}>
            {allMet ? "Đủ 6/6 điều kiện." : "Chưa đủ 6/6 điều kiện — LĐV sẽ bị chặn nếu bấm Phê duyệt."}
          </p>
          <input placeholder="Lý do (bắt buộc nếu yêu cầu bổ sung)" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
          <div className="flex gap-2">
            <button className={btn} disabled={isPending} onClick={() => run(() => approveTrainingRecord(id, { decision: "approve" }))}>
              Phê duyệt
            </button>
            <button className={btnGhost} disabled={isPending} onClick={() => run(() => approveTrainingRecord(id, { decision: "reject", reason }))}>
              Yêu cầu bổ sung
            </button>
          </div>
        </div>
      )}

      {status === "APPROVED" && <p className="text-sm text-good">Đã hoàn thành đào tạo (đủ 6/6 điều kiện).</p>}
    </div>
  );
}
