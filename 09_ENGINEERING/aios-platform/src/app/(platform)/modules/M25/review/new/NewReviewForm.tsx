"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createContextReview } from "@/lib/m25/actions";
import { CYCLE_TYPE_LABEL, MGMT_SYSTEM_LABEL, enumOptions } from "@/lib/m25/labels";

const fieldCls =
  "rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const labelCls = "flex flex-col gap-1.5 text-sm font-medium text-ink";

const SYSTEMS = enumOptions(MGMT_SYSTEM_LABEL);

export function NewReviewForm({ previous, defaultYear }: { previous: { code: string; issues: number; parties: number } | null; defaultYear: number }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [cycleType, setCycleType] = useState("DINH_KY");
  const [systems, setSystems] = useState<string[]>(["ISO_9001", "ISO_17025"]);
  const [inherit, setInherit] = useState(true);

  const toggle = (v: string) => setSystems((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));

  return (
    <form
      className="flex max-w-lg flex-col gap-4 rounded-xl border border-border bg-surface p-5"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        setError(null);
        startTransition(async () => {
          const r = await createContextReview({
            cycleType: cycleType as "DINH_KY" | "DOT_XUAT",
            periodYear: Number(formData.get("periodYear") ?? defaultYear),
            triggerReason: String(formData.get("triggerReason") ?? ""),
            scopeSystems: systems,
            summary: String(formData.get("summary") ?? ""),
            inheritFromPrevious: inherit,
          });
          if (!r.ok) setError(r.message);
          else router.push(`/modules/M25/review/${r.id}`);
        });
      }}
    >
      <label className={labelCls}>
        Loại kỳ
        <select name="cycleType" value={cycleType} onChange={(e) => setCycleType(e.target.value)} className={fieldCls}>
          {enumOptions(CYCLE_TYPE_LABEL).map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      {cycleType === "DOT_XUAT" && (
        <label className={labelCls}>
          Sự kiện làm phát sinh (bắt buộc với kỳ đột xuất)
          <textarea
            name="triggerReason"
            rows={2}
            placeholder="vd: Nghị định mới về đo lường có hiệu lực; mở rộng phạm vi công nhận; sự cố ATTT…"
            className={fieldCls}
          />
        </label>
      )}

      <label className={labelCls}>
        Năm áp dụng
        <input type="number" name="periodYear" defaultValue={defaultYear} required className={fieldCls} />
      </label>

      <div className="flex flex-col gap-1.5">
        <p className="text-sm font-medium text-ink">Phạm vi hệ thống quản lý</p>
        {SYSTEMS.map((s) => (
          <label key={s.value} className="flex items-center gap-2 text-xs text-ink-2">
            <input type="checkbox" checked={systems.includes(s.value)} onChange={() => toggle(s.value)} />
            {s.label}
          </label>
        ))}
      </div>

      <label className={labelCls}>
        Tóm tắt biến động so với kỳ trước
        <textarea name="summary" rows={3} className={fieldCls} />
      </label>

      {previous && (
        <label className="flex items-start gap-2 text-xs text-ink-2">
          <input type="checkbox" checked={inherit} onChange={(e) => setInherit(e.target.checked)} className="mt-0.5" />
          <span>
            Kế thừa các mục còn hiệu lực của kỳ <strong className="font-mono">{previous.code}</strong> ({previous.issues} vấn đề, {previous.parties} bên
            quan tâm) — mục đã đóng không kế thừa (quy tắc 9).
          </span>
        </label>
      )}

      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="cursor-pointer rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Đang lưu…" : "Lập kỳ xem xét"}
      </button>
    </form>
  );
}
