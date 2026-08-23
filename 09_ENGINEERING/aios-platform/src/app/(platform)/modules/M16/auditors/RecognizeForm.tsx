"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { recognizeQualification } from "@/lib/m16/actions";
import { QUAL_TYPE_LABEL } from "@/lib/m16/labels";
import type { M16QualTypeLite } from "@/lib/m16/rules";

const QUAL_TYPES = Object.keys(QUAL_TYPE_LABEL) as M16QualTypeLite[];
const inputCls =
  "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const btn =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";

export function RecognizeForm({
  employeeId,
  employeeName,
  passedRecords,
}: {
  employeeId: string;
  employeeName: string;
  passedRecords: { id: string; code: string; planType: string }[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [qualType, setQualType] = useState<M16QualTypeLite>("ISO_17025");
  const [trainingRecordId, setTrainingRecordId] = useState("");
  const [note, setNote] = useState("");

  const needsEvidence = qualType !== "KINH_NGHIEM_TRUONG_DOAN";

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-bg p-3">
      <p className="text-xs font-medium text-ink">Công nhận năng lực cho {employeeName}</p>
      <select value={qualType} onChange={(e) => setQualType(e.target.value as M16QualTypeLite)} className={inputCls}>
        {QUAL_TYPES.map((q) => (
          <option key={q} value={q}>
            {QUAL_TYPE_LABEL[q]}
          </option>
        ))}
      </select>

      {needsEvidence ? (
        <label className="flex flex-col gap-1 text-xs text-ink-2">
          Hồ sơ đào tạo làm bằng chứng (M03 — chỉ hiện hồ sơ đã phê duyệt Đạt)
          <select value={trainingRecordId} onChange={(e) => setTrainingRecordId(e.target.value)} className={inputCls}>
            <option value="">— chọn hồ sơ đào tạo —</option>
            {passedRecords.map((r) => (
              <option key={r.id} value={r.id}>
                {r.code} ({r.planType})
              </option>
            ))}
          </select>
        </label>
      ) : (
        <input placeholder="Căn cứ công nhận kinh nghiệm trưởng đoàn" value={note} onChange={(e) => setNote(e.target.value)} className={inputCls} />
      )}

      {needsEvidence && passedRecords.length === 0 && (
        <p className="text-xs text-warn">Nhân sự này chưa có hồ sơ đào tạo nào được phê duyệt Đạt bên M03.</p>
      )}
      {error && <p className="text-xs text-crit">{error}</p>}

      <button
        className={btn}
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            setError(null);
            const r = await recognizeQualification({
              employeeId,
              qualType,
              trainingRecordId: needsEvidence ? trainingRecordId || undefined : undefined,
              note: needsEvidence ? undefined : note || undefined,
            });
            if (r.ok) {
              setTrainingRecordId("");
              setNote("");
              router.refresh();
            } else setError(r.message);
          })
        }
      >
        {isPending ? "Đang lưu…" : "Công nhận năng lực"}
      </button>
    </div>
  );
}
