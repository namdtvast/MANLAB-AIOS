"use client";

import { expandSidebar } from "@/lib/sidebar";

/**
 * Nút mở danh sách module trên thanh đầu trang. Chỉ hiện ở khổ điện thoại —
 * khổ máy tính đã có nút thu/mở ngay trong sidebar.
 */
export function SidebarToggle() {
  return (
    <button
      type="button"
      onClick={expandSidebar}
      aria-label="Mở danh sách module"
      title="Mở danh sách module"
      className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-lg border border-border text-ink-2 transition-colors hover:border-border-strong hover:text-ink md:hidden"
    >
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4.5 w-4.5"
      >
        <path d="M3 5h14M3 10h14M3 15h14" />
      </svg>
    </button>
  );
}
