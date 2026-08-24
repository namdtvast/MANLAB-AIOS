"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { PlatformModule } from "@/generated/prisma/client";
import { MENU_GROUPS, DEFAULT_MENU_GROUP } from "@/lib/menu";
import {
  closeSidebarOnMobile,
  expandSidebar,
  hideSidebar,
  getOpenGroups,
  getServerOpenGroups,
  setOpenGroups,
  subscribeOpenGroups,
} from "@/lib/sidebar";

function HomeIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
    >
      <path d="M3.5 8.5 10 3l6.5 5.5" />
      <path d="M5 8v8.5h10V8" />
    </svg>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-3.5 w-3.5 shrink-0 transition-transform ${open ? "rotate-90" : ""}`}
    >
      <path d="m7.5 4.5 6 5.5-6 5.5" />
    </svg>
  );
}

export function Sidebar({ modules }: { modules: PlatformModule[] }) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  // Chỉ chứa các nhóm người dùng đã tự bấm mở/đóng; nhóm chưa có mặt ở đây theo
  // mặc định động — xem isOpen().
  const openGroups = useSyncExternalStore(
    subscribeOpenGroups,
    getOpenGroups,
    getServerOpenGroups,
  );
  const searchRef = useRef<HTMLInputElement>(null);
  const onHome = pathname === "/";

  // Gom 38 module thành các nhóm nghiệp vụ theo menuGroup (nạp từ manifest.yaml
  // của MPxx qua seed). Trong nhóm sắp theo menuOrder — thứ tự dòng chảy nghiệp
  // vụ, không phải số Mxx. Nhóm rỗng sau khi lọc thì không hiển thị.
  const q = query.trim().toLowerCase();
  const groups = useMemo(() => {
    const matched = q
      ? modules.filter(
          (m) => m.code.toLowerCase().includes(q) || m.name.toLowerCase().includes(q),
        )
      : modules;

    return MENU_GROUPS.map((g) => ({
      ...g,
      items: matched
        .filter((m) => (m.menuGroup ?? DEFAULT_MENU_GROUP) === g.code)
        .sort((a, b) => (a.menuOrder ?? a.order) - (b.menuOrder ?? b.order)),
    })).filter((g) => g.items.length > 0);
  }, [modules, q]);

  const matchCount = groups.reduce((n, g) => n + g.items.length, 0);

  // Nhóm chứa module đang mở — "đang dùng thì bung, không dùng thì gấp lại".
  const activeGroup = useMemo(() => {
    const m = modules.find(
      (x) => pathname === `/modules/${x.code}` || pathname.startsWith(`/modules/${x.code}/`),
    );
    return m ? (m.menuGroup ?? DEFAULT_MENU_GROUP) : null;
  }, [modules, pathname]);

  // Đang tìm kiếm thì bung hết để thấy ngay kết quả. Nhóm chưa được bấm bao giờ
  // thì theo mặc định: nhóm của module đang xem; ở trang không thuộc module nào
  // (bảng điều khiển) thì nhóm đầu tiên, để menu không rỗng trơn.
  function isOpen(code: string) {
    if (q) return true;
    const chosen = openGroups[code];
    if (chosen !== undefined) return chosen;
    return activeGroup ? code === activeGroup : code === MENU_GROUPS[0].code;
  }

  function toggleGroup(code: string) {
    setOpenGroups({ ...openGroups, [code]: !isOpen(code) });
  }

  return (
    <>
      {/* Lớp nền mờ của menu điện thoại: bấm ra ngoài là đóng. */}
      <button
        type="button"
        aria-label="Đóng danh sách module"
        onClick={closeSidebarOnMobile}
        className="sidebar-backdrop fixed inset-0 z-30 bg-black/50"
      />

      {/* Hình thái rút gọn (máy tính): lối vào trang chủ, nút mở lại, nút tìm. */}
      <nav className="sidebar-rail w-14 shrink-0 flex-col items-center gap-2 border-r border-border bg-surface py-3">
        <Link
          href="/"
          title="MANLAB-AIOS"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent font-head text-sm font-bold text-accent-ink"
        >
          AI
        </Link>
        <Link
          href="/"
          aria-current={onHome ? "page" : undefined}
          title="Trang chủ"
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border transition-colors ${
            onHome
              ? "border-accent-line bg-accent-soft text-accent"
              : "border-border text-ink-2 hover:border-border-strong hover:text-ink"
          }`}
        >
          <HomeIcon />
        </Link>
        <button
          type="button"
          onClick={expandSidebar}
          aria-label="Hiện danh sách module"
          title="Hiện danh sách module"
          className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg border border-border text-ink-2 transition-colors hover:border-border-strong hover:text-ink"
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
            <path d="M3 5h14M3 10h14M3 15h14" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => {
            expandSidebar();
            searchRef.current?.focus();
          }}
          aria-label="Tìm module"
          title="Tìm module"
          className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg border border-border text-ink-2 transition-colors hover:border-border-strong hover:text-ink"
        >
          <svg
            aria-hidden
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.7}
            strokeLinecap="round"
            className="h-4 w-4"
          >
            <circle cx="9" cy="9" r="6" />
            <path d="m17 17-4-4" />
          </svg>
        </button>
      </nav>

      <nav className="sidebar-full z-40 flex w-72 shrink-0 flex-col border-r border-border bg-surface">
        <div className="flex items-center gap-2 border-b border-border px-3 py-4">
          <Link
            href="/"
            onClick={closeSidebarOnMobile}
            className="flex min-w-0 flex-1 items-center gap-3"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent font-head text-sm font-bold text-accent-ink">
              AI
            </span>
            <span className="min-w-0">
              <span className="block truncate font-head text-[15px] font-bold tracking-tight text-ink">
                MANLAB-AIOS
              </span>
              <span className="block truncate text-xs text-ink-3">
                Kiến trúc 12 tầng · 38 module
              </span>
            </span>
          </Link>
          {/* Máy tính: thu về thanh rút gọn. Điện thoại: đóng lớp phủ. */}
          <button
            type="button"
            onClick={hideSidebar}
            aria-label="Ẩn danh sách module"
            title="Ẩn danh sách module"
            className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-lg border border-border text-ink-2 transition-colors hover:border-border-strong hover:text-ink"
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
              <path d="M11.5 5 6.5 10l5 5" />
              <path d="M15 4.5v11" />
            </svg>
          </button>
        </div>

        <div className="border-b border-border p-3">
          <label className="flex items-center gap-2 rounded-lg border border-border bg-bg px-3 py-2 text-ink-3 focus-within:border-accent-line">
            <svg
              aria-hidden
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.7}
              className="h-4 w-4 shrink-0"
            >
              <circle cx="9" cy="9" r="6" />
              <path d="m17 17-4-4" strokeLinecap="round" />
            </svg>
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm module theo mã hoặc tên…"
              className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-3"
            />
          </label>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          <Link
            href="/"
            onClick={closeSidebarOnMobile}
            aria-current={onHome ? "page" : undefined}
            className={`mb-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
              onHome
                ? "bg-accent-soft font-semibold text-accent"
                : "text-ink-2 hover:bg-sunk hover:text-ink"
            }`}
          >
            <HomeIcon />
            Trang chủ
          </Link>

          {groups.map((g) => {
            const open = isOpen(g.code);
            const panelId = `menu-group-${g.code}`;
            return (
              <section key={g.code} className="mb-1">
                <h2>
                  <button
                    type="button"
                    onClick={() => toggleGroup(g.code)}
                    aria-expanded={open}
                    aria-controls={panelId}
                    className={`flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-[11px] font-bold uppercase tracking-wider transition-colors hover:bg-sunk ${
                      open ? "text-accent" : "text-ink-2 hover:text-accent"
                    }`}
                  >
                    <Chevron open={open} />
                    <span className="min-w-0 flex-1 truncate">{g.label}</span>
                    <span className="shrink-0 font-mono text-[10px] font-normal text-ink-3">
                      {g.items.length}
                    </span>
                  </button>
                </h2>
                {open && (
                  <ul id={panelId} className="flex flex-col gap-0.5">
                    {g.items.map((m) => {
                      const href = `/modules/${m.code}`;
                      const active = pathname === href || pathname.startsWith(`${href}/`);
                      return (
                        <li key={m.code}>
                          <Link
                            href={href}
                            onClick={closeSidebarOnMobile}
                            aria-current={active ? "page" : undefined}
                            className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                              active
                                ? "bg-accent-soft font-semibold text-accent"
                                : "text-ink-2 hover:bg-sunk hover:text-ink"
                            }`}
                          >
                            <span className="truncate">
                              <span
                                className={`font-mono text-xs ${active ? "text-accent" : "text-ink-3"}`}
                              >
                                {m.code}
                              </span>{" "}
                              {m.name}
                            </span>
                            {m.status === "ACTIVE" && (
                              <span
                                aria-label="Đang chạy"
                                title="Đang chạy"
                                className="h-1.5 w-1.5 shrink-0 rounded-full bg-good"
                              />
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </section>
            );
          })}
          {matchCount === 0 && (
            <p className="px-3 py-6 text-center text-xs text-ink-3">
              Không tìm thấy module phù hợp.
            </p>
          )}
        </div>
      </nav>
    </>
  );
}
