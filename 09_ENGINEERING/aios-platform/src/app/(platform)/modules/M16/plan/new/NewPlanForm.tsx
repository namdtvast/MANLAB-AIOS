"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createAuditPlan } from "@/lib/m16/actions";
import { AUDIT_TYPE_LABEL } from "@/lib/m16/labels";
import type { M16AuditType } from "@/generated/prisma/enums";

const TYPES = Object.keys(AUDIT_TYPE_LABEL) as M16AuditType[];

const fieldCls =
  "rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const labelCls = "flex flex-col gap-1.5 text-sm font-medium text-ink";

export function NewPlanForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState<M16AuditType>("NOI_BO");
  const [isAdHoc, setIsAdHoc] = useState(false);

  return (
    <form
      className="flex max-w-lg flex-col gap-4 rounded-xl border border-border bg-surface p-5"
      action={(formData: FormData) => {
        setError(null);
        startTransition(async () => {
          try {
            const created = await createAuditPlan({
              type,
              year: Number(formData.get("year") ?? new Date().getFullYear()),
              scope: String(formData.get("scope") ?? "")
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
              auditors: String(formData.get("auditors") ?? "")
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
              isAdHoc,
            });
            router.push(`/modules/M16/plan/${created.id}`);
          } catch (e) {
            setError(e instanceof Error ? e.message : "Có lỗi xảy ra.");
          }
        });
      }}
    >
      <label className={labelCls}>
        Loại đánh giá
        <select value={type} onChange={(e) => setType(e.target.value as M16AuditType)} className={fieldCls}>
          {TYPES.map((t) => (
            <option key={t} value={t}>
              {AUDIT_TYPE_LABEL[t]}
            </option>
          ))}
        </select>
      </label>
      <label className={labelCls}>
        Năm
        <input type="number" name="year" required defaultValue={new Date().getFullYear()} className={fieldCls} />
      </label>
      <label className={labelCls}>
        Phạm vi (phân cách bằng dấu phẩy)
        <input name="scope" required placeholder="Phòng Đo lường Chất lượng, Văn phòng" className={fieldCls} />
      </label>
      <label className={labelCls}>
        Đánh giá viên dự kiến (phân cách bằng dấu phẩy)
        <input name="auditors" required placeholder="Nguyễn Thị H., Trần Thị B." className={fieldCls} />
      </label>
      <label className="flex items-center gap-2 text-sm text-ink-2">
        <input type="checkbox" checked={isAdHoc} onChange={(e) => setIsAdHoc(e.target.checked)} />
        Đánh giá đột xuất
      </label>

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
