"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createLesson, type LessonFormInput } from "@/lib/m26/actions";
import { LESSON_SOURCE_LABEL, enumOptions } from "@/lib/m26/labels";

const fieldCls = "rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent-line";
const labelCls = "flex flex-col gap-1.5 text-sm font-medium text-ink";

export function NewLessonForm({ items }: { items: { id: string; code: string; title: string }[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  if (!open)
    return (
      <button
        onClick={() => setOpen(true)}
        className="cursor-pointer self-start rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-ink hover:opacity-90"
      >
        + Gửi bài học kinh nghiệm
      </button>
    );

  return (
    <form
      className="flex max-w-2xl flex-col gap-4 rounded-xl border border-border bg-surface p-5"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        setError(null);
        const payload: LessonFormInput = {
          title: String(fd.get("title") ?? ""),
          sourceType: String(fd.get("sourceType")) as LessonFormInput["sourceType"],
          sourceRef: String(fd.get("sourceRef") ?? ""),
          context: String(fd.get("context") ?? ""),
          rootCauseRef: String(fd.get("rootCauseRef") ?? ""),
          lesson: String(fd.get("lesson") ?? ""),
          recommendedAction: String(fd.get("recommendedAction") ?? ""),
          shareRequired: fd.get("shareRequired") === "on",
          knowledgeItemId: String(fd.get("knowledgeItemId") ?? "") || undefined,
        };
        startTransition(async () => {
          const r = await createLesson(payload);
          if (!r.ok) setError(r.message);
          else router.push(`/modules/M26/lessons/${r.id}`);
        });
      }}
    >
      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      <label className={labelCls}>
        Tên bài học
        <input name="title" required className={fieldCls} />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelCls}>
          Nguồn phát sinh
          <select name="sourceType" defaultValue="KPH_CAPA" className={fieldCls}>
            {enumOptions(LESSON_SOURCE_LABEL).map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <label className={labelCls}>
          Bản ghi gốc (bắt buộc)
          <input name="sourceRef" required className={fieldCls} placeholder="Mã KPH/khiếu nại/hồ sơ đánh giá…" />
        </label>
      </div>

      <label className={labelCls}>
        Bối cảnh sự việc
        <textarea name="context" rows={3} required className={fieldCls} placeholder="Ngắn gọn, không quy kết cá nhân." />
      </label>

      <label className={labelCls}>
        Nguyên nhân gốc đã phân tích ở M13 (nếu có)
        <input name="rootCauseRef" className={fieldCls} placeholder="Mã phiếu CAPA — M26 không phân tích lại nguyên nhân gốc" />
      </label>

      <label className={labelCls}>
        Bài học rút ra
        <textarea name="lesson" rows={3} required className={fieldCls} />
      </label>

      <label className={labelCls}>
        Khuyến nghị — việc nên làm khác đi lần sau
        <textarea name="recommendedAction" rows={2} required className={fieldCls} />
      </label>

      <label className={labelCls}>
        Mục tri thức kết tinh (bắt buộc trước khi phê duyệt)
        <select name="knowledgeItemId" defaultValue="" className={fieldCls}>
          <option value="">— Chưa gắn —</option>
          {items.map((i) => (
            <option key={i.id} value={i.id}>
              {i.code} — {i.title}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-2 text-sm text-ink-2">
        <input type="checkbox" name="shareRequired" /> Cần tổ chức chia sẻ rộng
      </label>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="cursor-pointer rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink hover:opacity-90 disabled:opacity-50"
        >
          Gửi phiếu bài học
        </button>
        <button type="button" onClick={() => setOpen(false)} className="cursor-pointer rounded-lg border border-border-strong px-4 py-2 text-sm text-ink hover:bg-sunk">
          Đóng
        </button>
      </div>
    </form>
  );
}
