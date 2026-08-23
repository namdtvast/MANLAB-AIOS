"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createDisclosure } from "@/lib/m02/actions";
import { AUTHORITY_LEVEL_LABEL } from "@/lib/m02/labels";
import type { M02AuthorityLevel } from "@/generated/prisma/enums";

const LEVELS = Object.keys(AUTHORITY_LEVEL_LABEL) as M02AuthorityLevel[];

const fieldCls =
  "rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const labelCls = "flex flex-col gap-1.5 text-sm font-medium text-ink";

export function NewDisclosureForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [authorityLevel, setAuthorityLevel] = useState<M02AuthorityLevel>("TP");
  const [legallyProhibitedNotify, setLegallyProhibitedNotify] = useState(false);
  const [customerNotified, setCustomerNotified] = useState(false);

  return (
    <form
      className="flex max-w-lg flex-col gap-4 rounded-xl border border-border bg-surface p-5"
      action={(formData: FormData) => {
        setError(null);
        startTransition(async () => {
          try {
            const created = await createDisclosure({
              basis: String(formData.get("basis") ?? ""),
              content: String(formData.get("content") ?? ""),
              recipient: String(formData.get("recipient") ?? ""),
              authorityLevel,
              legallyProhibitedNotify,
              customerNotified,
            });
            router.push(`/modules/M02/disclosure/${created.id}`);
          } catch (e) {
            setError(e instanceof Error ? e.message : "Có lỗi xảy ra.");
          }
        });
      }}
    >
      <label className={labelCls}>
        Căn cứ công bố
        <textarea name="basis" required rows={2} placeholder="Căn cứ pháp luật/hợp đồng yêu cầu công bố" className={fieldCls} />
      </label>
      <label className={labelCls}>
        Nội dung công bố
        <textarea name="content" required rows={2} className={fieldCls} />
      </label>
      <label className={labelCls}>
        Người/tổ chức nhận
        <input name="recipient" required className={fieldCls} />
      </label>
      <label className={labelCls}>
        Thẩm quyền phê duyệt
        <select value={authorityLevel} onChange={(e) => setAuthorityLevel(e.target.value as M02AuthorityLevel)} className={fieldCls}>
          {LEVELS.map((l) => (
            <option key={l} value={l}>
              {AUTHORITY_LEVEL_LABEL[l]}
            </option>
          ))}
        </select>
      </label>
      <label className="flex items-center gap-2 text-sm text-ink-2">
        <input type="checkbox" checked={customerNotified} onChange={(e) => setCustomerNotified(e.target.checked)} />
        Đã thông báo khách hàng trước khi công bố
      </label>
      <label className="flex items-center gap-2 text-sm text-ink-2">
        <input type="checkbox" checked={legallyProhibitedNotify} onChange={(e) => setLegallyProhibitedNotify(e.target.checked)} />
        Pháp luật cấm thông báo cho khách hàng (miễn trừ)
      </label>

      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="cursor-pointer rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Đang lưu…" : "Soạn hồ sơ"}
      </button>
    </form>
  );
}
