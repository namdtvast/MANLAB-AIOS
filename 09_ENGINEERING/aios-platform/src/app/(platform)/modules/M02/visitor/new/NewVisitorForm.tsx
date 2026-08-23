"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createVisitorLog } from "@/lib/m02/actions";

const fieldCls =
  "rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const labelCls = "flex flex-col gap-1.5 text-sm font-medium text-ink";

export function NewVisitorForm({ commitments }: { commitments: { id: string; label: string }[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="flex max-w-lg flex-col gap-4 rounded-xl border border-border bg-surface p-5"
      action={(formData: FormData) => {
        setError(null);
        startTransition(async () => {
          const r = await createVisitorLog({
            commitmentId: String(formData.get("commitmentId") ?? ""),
            visitorName: String(formData.get("visitorName") ?? ""),
            org: String(formData.get("org") ?? "") || undefined,
            purpose: String(formData.get("purpose") ?? ""),
            area: String(formData.get("area") ?? ""),
          });
          if ("id" in r) router.push("/modules/M02");
          else setError(r.message);
        });
      }}
    >
      <label className={labelCls}>
        Cam kết bảo mật đã ký (F02.02)
        <select name="commitmentId" required className={fieldCls}>
          <option value="">— Chọn cam kết —</option>
          {commitments.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </label>
      {commitments.length === 0 && (
        <p className="text-xs text-warn">Chưa có cam kết loại Khách còn hiệu lực — tạo cam kết trước khi ghi sổ khách.</p>
      )}

      <label className={labelCls}>
        Tên khách
        <input name="visitorName" required className={fieldCls} />
      </label>
      <label className={labelCls}>
        Tổ chức
        <input name="org" className={fieldCls} />
      </label>
      <label className={labelCls}>
        Mục đích
        <input name="purpose" required className={fieldCls} />
      </label>
      <label className={labelCls}>
        Khu vực
        <input name="area" required placeholder="vd: Phòng thí nghiệm hiệu chuẩn" className={fieldCls} />
      </label>

      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="cursor-pointer rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Đang lưu…" : "Ghi sổ khách"}
      </button>
    </form>
  );
}
