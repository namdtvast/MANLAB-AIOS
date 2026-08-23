"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createFieldWorkPlan } from "@/lib/m04/actions";
import { RISK_LEVEL_LABEL } from "@/lib/m04/labels";
import type { M04RiskLevel } from "@/generated/prisma/enums";

const LEVELS = Object.keys(RISK_LEVEL_LABEL) as M04RiskLevel[];

const fieldCls =
  "rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const labelCls = "flex flex-col gap-1.5 text-sm font-medium text-ink";

export function NewPlanForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [riskLevel, setRiskLevel] = useState<M04RiskLevel>("THUONG");

  return (
    <form
      className="flex max-w-lg flex-col gap-4 rounded-xl border border-border bg-surface p-5"
      action={(formData: FormData) => {
        setError(null);
        startTransition(async () => {
          try {
            const created = await createFieldWorkPlan({
              site: String(formData.get("site") ?? ""),
              customer: String(formData.get("customer") ?? ""),
              personnel: String(formData.get("personnel") ?? "")
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
              schedule: String(formData.get("schedule") ?? ""),
              workItems: String(formData.get("workItems") ?? "")
                .split("\n")
                .map((s) => s.trim())
                .filter(Boolean),
              riskLevel,
            });
            router.push(`/modules/M04/plan/${created.id}`);
          } catch (e) {
            setError(e instanceof Error ? e.message : "Có lỗi xảy ra.");
          }
        });
      }}
    >
      <label className={labelCls}>
        Địa điểm
        <input name="site" required className={fieldCls} />
      </label>
      <label className={labelCls}>
        Khách hàng (Bên A)
        <input name="customer" required className={fieldCls} />
      </label>
      <label className={labelCls}>
        Nhân sự tham gia (phân cách bằng dấu phẩy)
        <input name="personnel" required placeholder="Nguyễn Văn A, Trần Thị B" className={fieldCls} />
      </label>
      <label className={labelCls}>
        Thời gian dự kiến
        <input type="date" name="schedule" required className={fieldCls} />
      </label>
      <label className={labelCls}>
        Hạng mục công việc (mỗi dòng 1 hạng mục)
        <textarea name="workItems" required rows={3} className={fieldCls} />
      </label>
      <label className={labelCls}>
        Mức rủi ro
        <select value={riskLevel} onChange={(e) => setRiskLevel(e.target.value as M04RiskLevel)} className={fieldCls}>
          {LEVELS.map((l) => (
            <option key={l} value={l}>
              {RISK_LEVEL_LABEL[l]}
            </option>
          ))}
        </select>
      </label>
      {riskLevel === "CAO" && (
        <p className="text-xs text-warn">Mức Rủi ro cao — chỉ LĐV được phê duyệt kế hoạch này (quy tắc 5 ETV.P04).</p>
      )}

      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="cursor-pointer rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Đang lưu…" : "Lập kế hoạch"}
      </button>
    </form>
  );
}
