import Link from "next/link";
import { prisma } from "@/lib/prisma";

const KPIS = [
  { key: "total", label: "Tổng số module", tone: "ink" as const },
  { key: "active", label: "Đã có ứng dụng chạy thật", tone: "good" as const },
  { key: "upcoming", label: "Sắp ra mắt", tone: "warn" as const },
];

export default async function DashboardPage() {
  const [total, active] = await Promise.all([
    prisma.platformModule.count(),
    prisma.platformModule.count({ where: { status: "ACTIVE" } }),
  ]);
  const values: Record<string, number> = { total, active, upcoming: total - active };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-accent">
          Tổng quan
        </p>
        <h1 className="font-head text-2xl font-bold text-ink">Tổng quan nền tảng</h1>
        <p className="mt-1 max-w-2xl text-sm text-ink-2">
          Cổng thống nhất cho kiến trúc 12 tầng MANLAB-AIOS — mỗi mục trong sidebar tương ứng
          một module số hóa (M01–M38).
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {KPIS.map((kpi) => (
          <div
            key={kpi.key}
            className="rounded-xl border border-border bg-surface p-4 shadow-sm"
          >
            <p className="text-xs text-ink-2">{kpi.label}</p>
            <p
              className={`mt-2 font-head text-3xl font-bold tabular-nums ${
                kpi.tone === "good"
                  ? "text-good"
                  : kpi.tone === "warn"
                    ? "text-warn"
                    : "text-ink"
              }`}
            >
              {values[kpi.key]}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-surface p-5">
        <p className="font-head text-sm font-bold text-ink">Increment 0 — khung nền tảng</p>
        <p className="mt-1.5 max-w-2xl text-sm text-ink-2">
          Đây là khung của lộ trình hợp nhất 12 tầng vào một nền tảng có DB và build step
          thật. M10 đã di trú vào nền tảng này; các module còn lại hiện trang{" "}
          <span className="font-medium text-ink">Sắp ra mắt</span> trỏ về đặc tả nghiệp vụ.
        </p>
        <Link
          href="/modules/M10"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
        >
          Xem module đã di trú (M10)
          <svg aria-hidden viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} className="h-3.5 w-3.5">
            <path d="M8 5.5 13.5 10 8 14.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
