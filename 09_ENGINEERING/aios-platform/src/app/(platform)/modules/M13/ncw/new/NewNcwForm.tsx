"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createNcw } from "@/lib/m13/actions";
import { SOURCE_TYPE_LABEL } from "@/lib/m13/labels";
import type { M13SourceType } from "@/generated/prisma/enums";

const SOURCE_TYPES = Object.keys(SOURCE_TYPE_LABEL) as M13SourceType[];

const fieldCls =
  "rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const labelCls = "flex flex-col gap-1.5 text-sm font-medium text-ink";

export function NewNcwForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [sourceType, setSourceType] = useState<M13SourceType>("TU_PHAT_HIEN");
  const [emergencyStop, setEmergencyStop] = useState(false);

  return (
    <form
      className="flex max-w-lg flex-col gap-4 rounded-xl border border-border bg-surface p-5"
      action={(formData: FormData) => {
        setError(null);
        startTransition(async () => {
          try {
            const created = await createNcw({
              sourceType,
              sourceRef: String(formData.get("sourceRef") ?? "") || undefined,
              description: String(formData.get("description") ?? ""),
              emergencyStop,
            });
            router.push(`/modules/M13/ncw/${created.id}`);
          } catch (e) {
            setError(e instanceof Error ? e.message : "Có lỗi xảy ra.");
          }
        });
      }}
    >
      <label className={labelCls}>
        Nguồn phát hiện
        <select value={sourceType} onChange={(e) => setSourceType(e.target.value as M13SourceType)} className={fieldCls}>
          {SOURCE_TYPES.map((s) => (
            <option key={s} value={s}>
              {SOURCE_TYPE_LABEL[s]}
            </option>
          ))}
        </select>
      </label>
      <label className={labelCls}>
        Tham chiếu nguồn (nếu có)
        <input name="sourceRef" placeholder="vd KN-2026-0003 (khiếu nại) — không bắt buộc" className={fieldCls} />
      </label>
      <label className={labelCls}>
        Mô tả công việc không phù hợp
        <textarea name="description" required rows={4} className={fieldCls} />
      </label>

      <label className="flex items-center gap-2 text-sm text-ink-2">
        <input type="checkbox" checked={emergencyStop} onChange={(e) => setEmergencyStop(e.target.checked)} />
        Trường hợp khẩn cấp — đã dừng ngay công việc đang thực hiện
      </label>

      {emergencyStop ? (
        <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-xs text-crit">
          Quy tắc 1 ETV.P13: được phép dừng ngay công việc không cần chờ phê duyệt trước — ghi nhận rồi báo cáo sau.
        </p>
      ) : (
        <p className="rounded-lg border border-border bg-sunk px-3 py-2 text-xs text-ink-2">
          Sau khi ghi nhận, LĐV/QLCL/QLKT sẽ đánh giá mức độ Nhẹ/Nặng — mức Nặng bắt buộc dừng hẳn công việc và lập
          phương án hành động khắc phục (quy tắc 2 và 4 ETV.P13).
        </p>
      )}

      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="cursor-pointer rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Đang lưu…" : "Ghi nhận vào sổ theo dõi"}
      </button>
    </form>
  );
}
