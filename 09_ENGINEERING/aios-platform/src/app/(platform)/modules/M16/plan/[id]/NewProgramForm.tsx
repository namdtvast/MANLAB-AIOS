"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createAuditProgram } from "@/lib/m16/actions";

const inputCls =
  "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const btn =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";

// Increment 13: đoàn đánh giá chọn từ hồ sơ nhân sự thật của M03 để server kiểm tra được năng lực
// (quy tắc 1 ETV.P16). Tên hiển thị vẫn được chụp lại vào hồ sơ khi tạo chương trình.
export function NewProgramForm({
  planId,
  employees,
}: {
  planId: string;
  employees: { id: string; code: string; fullName: string; department: string; qualified: boolean }[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [department, setDepartment] = useState("");
  const [field, setField] = useState("");
  const [auditDate, setAuditDate] = useState("");
  const [teamLeadEmployeeId, setTeamLeadEmployeeId] = useState("");
  const [memberEmployeeIds, setMemberEmployeeIds] = useState<string[]>([]);

  const toggleMember = (id: string) =>
    setMemberEmployeeIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-3">
      <p className="text-xs font-medium text-ink">Lập chương trình đánh giá cho kế hoạch này</p>
      <input placeholder="Bộ phận được đánh giá" value={department} onChange={(e) => setDepartment(e.target.value)} className={inputCls} />
      <input placeholder="Lĩnh vực" value={field} onChange={(e) => setField(e.target.value)} className={inputCls} />
      <label className="flex flex-col gap-1 text-xs text-ink-2">
        Ngày đánh giá
        <input type="date" value={auditDate} onChange={(e) => setAuditDate(e.target.value)} className={inputCls} />
      </label>

      <label className="flex flex-col gap-1 text-xs text-ink-2">
        Trưởng đoàn (nhân sự M03)
        <select value={teamLeadEmployeeId} onChange={(e) => setTeamLeadEmployeeId(e.target.value)} className={inputCls}>
          <option value="">— chọn trưởng đoàn —</option>
          {employees.map((e) => (
            <option key={e.id} value={e.id}>
              {e.fullName} ({e.code}){e.qualified ? "" : " — chưa đủ năng lực"}
            </option>
          ))}
        </select>
      </label>

      <fieldset className="flex flex-col gap-1 rounded-lg border border-border p-2">
        <legend className="px-1 text-xs text-ink-2">Thành viên đoàn</legend>
        {employees
          .filter((e) => e.id !== teamLeadEmployeeId)
          .map((e) => (
            <label key={e.id} className="flex items-center gap-2 text-sm text-ink">
              <input type="checkbox" checked={memberEmployeeIds.includes(e.id)} onChange={() => toggleMember(e.id)} />
              {e.fullName} <span className="text-xs text-ink-3">({e.department})</span>
              {!e.qualified && <span className="text-xs text-warn">chưa đủ năng lực</span>}
            </label>
          ))}
        {employees.length === 0 && <p className="text-xs text-ink-3">Chưa có hồ sơ nhân sự nào bên M03.</p>}
      </fieldset>

      <p className="text-xs text-ink-3">
        Năng lực được kiểm tra khi <strong className="text-ink">xác nhận</strong> chương trình (quy tắc 1 ETV.P16) — vẫn lập được chương trình nháp
        với người chưa đủ năng lực.
      </p>
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
                teamLeadEmployeeId,
                memberEmployeeIds,
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
