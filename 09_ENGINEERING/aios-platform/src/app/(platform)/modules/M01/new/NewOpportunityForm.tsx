"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createOpportunity } from "@/lib/m01/actions";
import { OPP_SOURCE_LABEL } from "@/lib/m01/labels";
import type { M01OppSource } from "@/generated/prisma/enums";

const SOURCES = Object.keys(OPP_SOURCE_LABEL) as M01OppSource[];

const fieldCls =
  "rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const labelCls = "flex flex-col gap-1.5 text-sm font-medium text-ink";

export function NewOpportunityForm() {
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
            const created = await createOpportunity({
              title: String(formData.get("title") ?? ""),
              description: String(formData.get("description") ?? ""),
              source: formData.get("source") as M01OppSource,
            });
            router.push(`/modules/M01/opportunity/${created.id}`);
          } catch (e) {
            setError(e instanceof Error ? e.message : "Có lỗi xảy ra.");
          }
        });
      }}
    >
      <label className={labelCls}>
        Tên cơ hội
        <input name="title" required placeholder="vd: Tự động hoá nhập liệu kết quả đo" className={fieldCls} />
      </label>

      <label className={labelCls}>
        Mô tả
        <textarea name="description" required rows={3} className={fieldCls} />
      </label>

      <label className={labelCls}>
        Nguồn phát hiện
        <select name="source" className={fieldCls}>
          {SOURCES.map((s) => (
            <option key={s} value={s}>
              {OPP_SOURCE_LABEL[s]}
            </option>
          ))}
        </select>
      </label>

      <p className="text-xs text-ink-3">
        Sau khi tạo, hồ sơ ở trạng thái Đang soạn — bổ sung biện pháp đề xuất trước khi gửi soát xét.
      </p>

      {error && (
        <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="cursor-pointer rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Đang tạo…" : "Tạo hồ sơ cơ hội"}
      </button>
    </form>
  );
}
