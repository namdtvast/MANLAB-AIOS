import Link from "next/link";

// Thẻ chỉ số dùng chung cho các trang tổng quan (dashboard, M26, M29…).
// Quy ước: nhãn và số căn giữa; thẻ nào có đích tra cứu thì cả thẻ là link và
// hiện thêm dòng "Xem chi tiết" để người dùng biết bấm được.

export type StatTone = "ink" | "good" | "warn" | "crit";

const TONE_CLASS: Record<StatTone, string> = {
  ink: "text-ink",
  good: "text-good",
  warn: "text-warn",
  crit: "text-crit",
};

const BASE =
  "flex flex-col items-center justify-center rounded-xl border border-border bg-surface px-4 py-3 text-center";

export function StatCard({
  label,
  value,
  tone = "ink",
  href,
  linkLabel = "Xem chi tiết",
}: {
  label: string;
  value: number | string;
  tone?: StatTone;
  href?: string | null;
  linkLabel?: string;
}) {
  const body = (
    <>
      <p className="text-xs text-ink-2">{label}</p>
      <p className={`mt-1.5 font-head text-3xl font-bold tabular-nums ${TONE_CLASS[tone]}`}>{value}</p>
      {href && (
        <span className="mt-1.5 text-xs font-medium text-accent group-hover:underline">{linkLabel} →</span>
      )}
    </>
  );

  if (!href) return <div className={BASE}>{body}</div>;

  return (
    <Link href={href} className={`${BASE} group transition-colors hover:border-accent-line`}>
      {body}
    </Link>
  );
}
