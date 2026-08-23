"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createFeedback } from "@/lib/m12/actions";
import { FEEDBACK_CATEGORY_LABEL, FEEDBACK_ORIGIN_LABEL } from "@/lib/m12/labels";
import type { M12FeedbackCategory, M12FeedbackOrigin } from "@/generated/prisma/enums";

const ORIGINS = Object.keys(FEEDBACK_ORIGIN_LABEL) as M12FeedbackOrigin[];
const CATEGORIES = Object.keys(FEEDBACK_CATEGORY_LABEL) as M12FeedbackCategory[];

const fieldCls =
  "rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const labelCls = "flex flex-col gap-1.5 text-sm font-medium text-ink";

export function NewFeedbackForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [origin, setOrigin] = useState<M12FeedbackOrigin>("KHACH_HANG");
  const [category, setCategory] = useState<M12FeedbackCategory>("QUY_TRINH");

  return (
    <form
      className="flex max-w-lg flex-col gap-4 rounded-xl border border-border bg-surface p-5"
      action={(formData: FormData) => {
        setError(null);
        startTransition(async () => {
          try {
            await createFeedback({
              origin,
              category,
              content: String(formData.get("content") ?? ""),
              source: String(formData.get("source") ?? "") || undefined,
            });
            router.push("/modules/M12");
          } catch (e) {
            setError(e instanceof Error ? e.message : "Có lỗi xảy ra.");
          }
        });
      }}
    >
      <label className={labelCls}>
        Nguồn
        <select value={origin} onChange={(e) => setOrigin(e.target.value as M12FeedbackOrigin)} className={fieldCls}>
          {ORIGINS.map((o) => (
            <option key={o} value={o}>
              {FEEDBACK_ORIGIN_LABEL[o]}
            </option>
          ))}
        </select>
      </label>
      <label className={labelCls}>
        Nhóm nội dung
        <select value={category} onChange={(e) => setCategory(e.target.value as M12FeedbackCategory)} className={fieldCls}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {FEEDBACK_CATEGORY_LABEL[c]}
            </option>
          ))}
        </select>
      </label>
      <label className={labelCls}>
        Nội dung
        <textarea name="content" required rows={4} className={fieldCls} />
      </label>
      <label className={labelCls}>
        Kênh nhận (không bắt buộc)
        <input name="source" placeholder="Form etv.org.vn/danh-gia-va-phan-nan / khảo sát nội bộ" className={fieldCls} />
      </label>

      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="cursor-pointer rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Đang lưu…" : "Ghi nhận"}
      </button>
    </form>
  );
}
