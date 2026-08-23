"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createIncident } from "@/lib/m02/actions";

const fieldCls =
  "rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const labelCls = "flex flex-col gap-1.5 text-sm font-medium text-ink";

export function NewIncidentForm() {
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
            const created = await createIncident({ containmentAction: String(formData.get("containmentAction") ?? "") });
            router.push(`/modules/M02/incident/${created.id}`);
          } catch (e) {
            setError(e instanceof Error ? e.message : "Có lỗi xảy ra.");
          }
        });
      }}
    >
      <label className={labelCls}>
        Biện pháp ngăn chặn đã thực hiện ngay
        <textarea
          name="containmentAction"
          required
          rows={3}
          placeholder="vd: Đã khóa tài khoản, thu hồi quyền truy cập email…"
          className={fieldCls}
        />
      </label>
      <p className="text-xs text-ink-3">
        Theo quy tắc 8 ETV.P02: ngăn chặn ngay, không tự xóa/che giấu bằng chứng — báo TP/QLCL đánh giá tiếp theo.
      </p>

      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="cursor-pointer rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Đang lưu…" : "Ghi nhận sự cố"}
      </button>
    </form>
  );
}
