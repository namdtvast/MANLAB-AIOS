// Thành phần hiển thị dùng chung trong M29 — tách ra khi Increment 4 thêm 3 trang mới cùng dùng
// Badge/tiêu đề bảng, tránh chép lại khối TONE_CLASS ở từng trang.
const TONE_CLASS: Record<string, string> = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  crit: "bg-crit-soft text-crit",
  neutral: "bg-sunk text-ink-2",
};

export const thCls = "border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3";

export function Badge({ label, tone }: { label: string; tone: string }) {
  return <span className={`inline-flex items-center rounded-full whitespace-nowrap px-2 py-0.5 text-xs font-medium ${TONE_CLASS[tone] ?? TONE_CLASS.neutral}`}>{label}</span>;
}
