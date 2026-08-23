"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { approveRecruitmentPlan, fulfillRecruitmentPlan, submitRecruitmentPlan } from "@/lib/m03/actions";
import { EMPLOYMENT_TYPE_LABEL } from "@/lib/m03/labels";
import type { M03EmploymentType } from "@/generated/prisma/enums";

interface Props {
  id: string;
  status: string;
  m03Role: string | null;
}

const btn =
  "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const btnGhost =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";
const inputCls =
  "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";

const EMP_TYPES = Object.keys(EMPLOYMENT_TYPE_LABEL) as M03EmploymentType[];

export function RecruitmentActionPanel({ id, status, m03Role }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [fullName, setFullName] = useState("");
  const [empType, setEmpType] = useState<M03EmploymentType>("THUVIEC");
  const [hireDate, setHireDate] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");

  const run = (fn: () => Promise<{ ok: boolean; message?: string } | void>) => {
    setError(null);
    startTransition(async () => {
      const r = await fn();
      if (r && "ok" in r && !r.ok) setError(r.message ?? "Có lỗi xảy ra.");
      else router.refresh();
    });
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
      <p className="text-xs text-ink-3">
        Vai trò M03 của bạn: <strong className="text-ink">{m03Role ?? "chưa gán"}</strong>
      </p>
      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      {status === "DRAFT" && (
        <button className={btn} disabled={isPending} onClick={() => run(() => submitRecruitmentPlan(id))}>
          Gửi duyệt
        </button>
      )}

      {status === "PENDING_APPROVAL" && (
        <div className="flex flex-col gap-2">
          <input placeholder="Lý do (bắt buộc nếu từ chối)" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
          <div className="flex gap-2">
            <button className={btn} disabled={isPending} onClick={() => run(() => approveRecruitmentPlan(id, { decision: "approve" }))}>
              Phê duyệt
            </button>
            <button className={btnGhost} disabled={isPending} onClick={() => run(() => approveRecruitmentPlan(id, { decision: "reject", reason }))}>
              Từ chối
            </button>
          </div>
        </div>
      )}

      {status === "APPROVED" && (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-ink-3">Nhập thông tin nhân sự để đánh dấu Đã tuyển:</p>
          <input placeholder="Họ tên" value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputCls} />
          <input placeholder="Vị trí công việc" value={position} onChange={(e) => setPosition(e.target.value)} className={inputCls} />
          <input placeholder="Bộ phận" value={department} onChange={(e) => setDepartment(e.target.value)} className={inputCls} />
          <select value={empType} onChange={(e) => setEmpType(e.target.value as M03EmploymentType)} className={inputCls}>
            {EMP_TYPES.map((t) => (
              <option key={t} value={t}>
                {EMPLOYMENT_TYPE_LABEL[t]}
              </option>
            ))}
          </select>
          <input type="date" value={hireDate} onChange={(e) => setHireDate(e.target.value)} className={inputCls} />
          <button
            className={btn}
            disabled={isPending}
            onClick={() =>
              run(async () => {
                const r = await fulfillRecruitmentPlan(id, { fullName, position, department, employmentType: empType, hireDate });
                if ("ok" in r && r.ok && "employeeId" in r) {
                  router.push(`/modules/M03/employee/${r.employeeId}`);
                  return;
                }
                return r;
              })
            }
          >
            Đánh dấu Đã tuyển — tạo hồ sơ nhân sự
          </button>
        </div>
      )}

      {(status === "FULFILLED" || status === "REJECTED") && (
        <p className="text-sm text-ink-2">Đề xuất đã kết thúc.</p>
      )}
    </div>
  );
}
