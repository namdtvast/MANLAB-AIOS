"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Lối về bảng điều khiển trên thanh đầu trang — luôn hiện ở mọi khổ màn hình.
 *
 * Trên điện thoại sidebar bị ẩn hẳn (xem lib/sidebar.ts), nên nếu chỉ dựa vào
 * logo trong sidebar thì người dùng đang ở sâu trong một module không có đường
 * quay về bằng một cú bấm. Nút này là đường đó.
 *
 * Trỏ về /dashboard chứ không phải "/": "/" là trang giới thiệu công khai cho
 * người chưa đăng nhập, không phải nơi làm việc.
 */
export function HomeButton() {
  const pathname = usePathname();
  const active = pathname === "/dashboard";

  return (
    <Link
      href="/dashboard"
      aria-current={active ? "page" : undefined}
      title="Bảng điều khiển"
      className={`flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-sm transition-colors sm:px-3 ${
        active
          ? "border-accent-line bg-accent-soft font-semibold text-accent"
          : "border-border text-ink-2 hover:border-border-strong hover:text-ink"
      }`}
    >
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M3.5 8.5 10 3l6.5 5.5" />
        <path d="M5 8v8.5h10V8" />
      </svg>
      <span className="hidden sm:inline">Bảng điều khiển</span>
    </Link>
  );
}
