"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createAssessment } from "@/lib/m10/actions";
import { RECORD_TYPE_LABEL } from "@/lib/m10/labels";
import type { M10RecordType } from "@/generated/prisma/enums";

const RECORD_TYPES = Object.keys(RECORD_TYPE_LABEL) as M10RecordType[];

const fieldCls =
  "rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const labelCls = "flex flex-col gap-1.5 text-sm font-medium text-ink";

export function NewAssessmentForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="flex max-w-lg flex-col gap-4 rounded-xl border border-border bg-surface p-5"
      action={(formData: FormData) => {
        setError(null);
        startTransition(async () => {
          try {
            const created = await createAssessment({
              recordType: formData.get("recordType") as M10RecordType,
              object: String(formData.get("object") ?? ""),
              planId: String(formData.get("planId") ?? "") || undefined,
              procedureId: String(formData.get("procedureId") ?? "") || undefined,
              personnelId: String(formData.get("personnelId") ?? "") || undefined,
              criteriaId: String(formData.get("criteriaId") ?? "") || undefined,
              rawData: Number(formData.get("rawData") ?? 0),
              evidence: Number(formData.get("evidence") ?? 0),
            });
            router.push(`/modules/M10/${created.id}`);
          } catch (e) {
            setError(e instanceof Error ? e.message : "Có lỗi xảy ra.");
          }
        });
      }}
    >
      <label className={labelCls}>
        Loại hồ sơ
        <select name="recordType" className={fieldCls}>
          {RECORD_TYPES.map((rt) => (
            <option key={rt} value={rt}>
              {RECORD_TYPE_LABEL[rt]}
            </option>
          ))}
        </select>
      </label>

      <label className={labelCls}>
        Đối tượng
        <input
          name="object"
          required
          placeholder="vd: Mẫu A · Chì trong nước"
          className={fieldCls}
        />
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className={labelCls}>
          Kế hoạch (plan_id)
          <input name="planId" className={fieldCls} />
        </label>
        <label className={labelCls}>
          Quy trình (procedure_id)
          <input name="procedureId" className={fieldCls} />
        </label>
        <label className={labelCls}>
          Tiêu chí (criteria_id)
          <input name="criteriaId" className={fieldCls} />
        </label>
        <label className={labelCls}>
          Nhân sự (personnel_id)
          <input name="personnelId" className={fieldCls} />
        </label>
        <label className={labelCls}>
          Số dữ liệu thô
          <input type="number" name="rawData" min={0} defaultValue={0} className={fieldCls} />
        </label>
        <label className={labelCls}>
          Số bằng chứng
          <input type="number" name="evidence" min={0} defaultValue={0} className={fieldCls} />
        </label>
      </div>

      {error && (
        <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="cursor-pointer rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Đang tạo…" : "Tạo hồ sơ"}
      </button>
    </form>
  );
}
