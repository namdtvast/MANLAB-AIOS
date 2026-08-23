"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createRecruitmentPlan } from "@/lib/m03/actions";

const fieldCls =
  "rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const labelCls = "flex flex-col gap-1.5 text-sm font-medium text-ink";

export function NewRecruitmentForm() {
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
            const created = await createRecruitmentPlan({
              position: String(formData.get("position") ?? ""),
              department: String(formData.get("department") ?? ""),
              headcount: Number(formData.get("headcount") ?? 1),
              requirement: String(formData.get("requirement") ?? ""),
            });
            router.push(`/modules/M03/recruitment/${created.id}`);
          } catch (e) {
            setError(e instanceof Error ? e.message : "Có lỗi xảy ra.");
          }
        });
      }}
    >
      <label className={labelCls}>
        Vị trí tuyển dụng
        <input name="position" required placeholder="vd: Kỹ thuật viên hiệu chuẩn" className={fieldCls} />
      </label>
      <label className={labelCls}>
        Bộ phận
        <input name="department" required placeholder="vd: Phòng Đo lường Chất lượng" className={fieldCls} />
      </label>
      <label className={labelCls}>
        Số lượng
        <input type="number" name="headcount" min={1} defaultValue={1} className={fieldCls} />
      </label>
      <label className={labelCls}>
        Yêu cầu tuyển dụng
        <textarea name="requirement" required rows={3} placeholder="Bằng cấp, kinh nghiệm, chuyên ngành…" className={fieldCls} />
      </label>

      {error && (
        <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="cursor-pointer rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Đang tạo…" : "Tạo đề xuất"}
      </button>
    </form>
  );
}
