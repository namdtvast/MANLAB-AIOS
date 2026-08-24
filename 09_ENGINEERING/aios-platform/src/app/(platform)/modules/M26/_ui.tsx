// Thành phần hiển thị dùng chung trong M26 (badge, tiêu đề bảng) — giữ đúng khuôn M25/M17.
const TONE_CLASS: Record<string, string> = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  crit: "bg-crit-soft text-crit",
  neutral: "bg-sunk text-ink-2",
};

export function Badge({ label, tone = "neutral" }: { label: string; tone?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full whitespace-nowrap px-2 py-0.5 text-xs font-medium ${TONE_CLASS[tone] ?? TONE_CLASS.neutral}`}>
      {label}
    </span>
  );
}

export const th = "border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3";

export const fmtDate = (d: Date | null | undefined) => (d ? new Date(d).toLocaleDateString("vi-VN") : "—");
