"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createReviewPlan } from "@/lib/m17/actions";
import { REVIEW_TOPICS } from "@/lib/m17/labels";

const fieldCls =
  "rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const labelCls = "flex flex-col gap-1.5 text-sm font-medium text-ink";

export function NewPlanForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [isAdHoc, setIsAdHoc] = useState(false);
  const [topics, setTopics] = useState<number[]>(REVIEW_TOPICS.map((t) => t.id));

  const toggleTopic = (id: number) => setTopics((t) => (t.includes(id) ? t.filter((x) => x !== id) : [...t, id].sort((a, b) => a - b)));

  return (
    <form
      className="flex max-w-lg flex-col gap-4 rounded-xl border border-border bg-surface p-5"
      action={(formData: FormData) => {
        setError(null);
        startTransition(async () => {
          try {
            const created = await createReviewPlan({
              title: String(formData.get("title") ?? ""),
              isAdHoc,
              plannedDate: String(formData.get("plannedDate") ?? ""),
              location: String(formData.get("location") ?? ""),
              attendees: String(formData.get("attendees") ?? "")
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
              plannedTopics: topics,
            });
            router.push(`/modules/M17/plan/${created.id}`);
          } catch (e) {
            setError(e instanceof Error ? e.message : "Có lỗi xảy ra.");
          }
        });
      }}
    >
      <label className={labelCls}>
        Tiêu đề
        <input name="title" required placeholder="vd: Xem xét lãnh đạo Quý 4/2026" className={fieldCls} />
      </label>
      <label className="flex items-center gap-2 text-sm text-ink-2">
        <input type="checkbox" checked={isAdHoc} onChange={(e) => setIsAdHoc(e.target.checked)} />
        Đột xuất
      </label>
      <label className={labelCls}>
        Ngày dự kiến
        <input type="date" name="plannedDate" required className={fieldCls} />
      </label>
      <label className={labelCls}>
        Địa điểm
        <input name="location" required className={fieldCls} />
      </label>
      <label className={labelCls}>
        Thành phần tham dự (phân cách bằng dấu phẩy)
        <input name="attendees" required placeholder="LĐV, Trưởng phòng, QLCL" className={fieldCls} />
      </label>
      <div className="flex flex-col gap-1.5">
        <p className="text-sm font-medium text-ink">Nội dung dự kiến (12 nội dung chuẩn)</p>
        {REVIEW_TOPICS.map((t) => (
          <label key={t.id} className="flex items-center gap-2 text-xs text-ink-2">
            <input type="checkbox" checked={topics.includes(t.id)} onChange={() => toggleTopic(t.id)} />
            {t.id}. {t.label}
          </label>
        ))}
      </div>

      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="cursor-pointer rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Đang lưu…" : "Lập chương trình"}
      </button>
    </form>
  );
}
