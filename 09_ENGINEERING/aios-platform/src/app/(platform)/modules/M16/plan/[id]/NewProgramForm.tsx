"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createAuditProgram } from "@/lib/m16/actions";

const inputCls =
  "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const btn =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";

export function NewProgramForm({ planId }: { planId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [department, setDepartment] = useState("");
  const [field, setField] = useState("");
  const [auditDate, setAuditDate] = useState("");
  const [teamLeadName, setTeamLeadName] = useState("");
  const [teamMembers, setTeamMembers] = useState("");

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-3">
      <p className="text-xs font-medium text-ink">Lập chương trình đánh giá cho kế hoạch này</p>
      <input placeholder="Bộ phận được đánh giá" value={department} onChange={(e) => setDepartment(e.target.value)} className={inputCls} />
      <input placeholder="Lĩnh vực" value={field} onChange={(e) => setField(e.target.value)} className={inputCls} />
      <label className="flex flex-col gap-1 text-xs text-ink-2">
        Ngày đánh giá
        <input type="date" value={auditDate} onChange={(e) => setAuditDate(e.target.value)} className={inputCls} />
      </label>
      <input placeholder="Trưởng đoàn" value={teamLeadName} onChange={(e) => setTeamLeadName(e.target.value)} className={inputCls} />
      <input
        placeholder="Thành viên đoàn (phân cách bằng dấu phẩy)"
        value={teamMembers}
        onChange={(e) => setTeamMembers(e.target.value)}
        className={inputCls}
      />
      {error && <p className="text-xs text-crit">{error}</p>}
      <button
        className={btn}
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            setError(null);
            try {
              const created = await createAuditProgram({
                planId,
                department,
                field,
                auditDate,
                teamLeadName,
                teamMembers: teamMembers.split(",").map((s) => s.trim()).filter(Boolean),
              });
              if (!("id" in created)) {
                setError(created.message);
                return;
              }
              router.push(`/modules/M16/program/${created.id}`);
            } catch (e) {
              setError(e instanceof Error ? e.message : "Có lỗi xảy ra.");
            }
          })
        }
      >
        {isPending ? "Đang tạo…" : "Lập chương trình"}
      </button>
    </div>
  );
}
