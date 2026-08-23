"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createAuditFinding } from "@/lib/m16/actions";
import { CONFORMITY_LABEL } from "@/lib/m16/labels";
import type { M16Conformity } from "@/generated/prisma/enums";

const CONFORMITIES = Object.keys(CONFORMITY_LABEL) as M16Conformity[];
const inputCls =
  "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const btn =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";

export function NewFindingForm({ programId }: { programId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [clauseRef, setClauseRef] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [conformity, setConformity] = useState<M16Conformity>("PHU_HOP");
  const [evidence, setEvidence] = useState("");
  const [auditorSignature, setAuditorSignature] = useState("");
  const [capaRef, setCapaRef] = useState("");

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-3">
      <p className="text-xs font-medium text-ink">Ghi phát hiện mới</p>
      <input placeholder="Điều khoản liên quan (vd: ISO/IEC 17025 §7.5)" value={clauseRef} onChange={(e) => setClauseRef(e.target.value)} className={inputCls} />
      <input placeholder="Bộ phận" value={department} onChange={(e) => setDepartment(e.target.value)} className={inputCls} />
      <textarea placeholder="Mô tả phát hiện" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className={inputCls} />
      <select value={conformity} onChange={(e) => setConformity(e.target.value as M16Conformity)} className={inputCls}>
        {CONFORMITIES.map((c) => (
          <option key={c} value={c}>
            {CONFORMITY_LABEL[c]}
          </option>
        ))}
      </select>
      <input placeholder="Bằng chứng" value={evidence} onChange={(e) => setEvidence(e.target.value)} className={inputCls} />
      <input placeholder="Chữ ký đánh giá viên (tên)" value={auditorSignature} onChange={(e) => setAuditorSignature(e.target.value)} className={inputCls} />
      {conformity === "KHONG_PHU_HOP" && (
        <input placeholder="Tham chiếu CAPA (→ M13, tự do)" value={capaRef} onChange={(e) => setCapaRef(e.target.value)} className={inputCls} />
      )}
      {error && <p className="text-xs text-crit">{error}</p>}
      <button
        className={btn}
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            setError(null);
            const r = await createAuditFinding({
              programId,
              clauseRef,
              department,
              description,
              conformity,
              evidence: evidence || undefined,
              auditorSignature,
              capaRef: capaRef || undefined,
            });
            if ("id" in r) router.refresh();
            else setError(r.message);
          })
        }
      >
        {isPending ? "Đang lưu…" : "Ghi phát hiện"}
      </button>
    </div>
  );
}
