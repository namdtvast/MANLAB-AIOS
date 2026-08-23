"use client";

// Trạng thái sidebar nằm ngoài React, ở hai chỗ:
//   1. Thuộc tính data-sidebar trên <html> — quyết định hình thái đang hiển thị
//      (xem globals.css). Để ở DOM để script inline của layout.tsx đặt được
//      trước khi hydrate, không nháy khi tải lại trang.
//   2. localStorage — ghi nhớ giữa các phiên. Có thể bị chặn (Safari riêng tư),
//      nên mọi truy cập đều bọc try/catch: hỏng thì chỉ mất tính năng ghi nhớ.
//
// Ba trạng thái của data-sidebar:
//   (không có)  — máy tính: hiện bảng đầy đủ; điện thoại: ẩn hẳn.
//   "collapsed" — máy tính: thu về thanh rút gọn; điện thoại: vẫn ẩn.
//   "open"      — điện thoại: bung bảng đầy đủ dạng lớp phủ; máy tính: như mặc định.
export const LS_COLLAPSED = "sidebar:collapsed";
export const LS_OPEN_GROUPS = "sidebar:open-groups";

// Trùng với breakpoint `md` của Tailwind dùng trong globals.css.
const MOBILE_MAX_WIDTH = 767;

export function isMobileViewport() {
  return window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`).matches;
}

function setState(value: "collapsed" | "open" | null) {
  const root = document.documentElement;
  if (value) root.setAttribute("data-sidebar", value);
  else root.removeAttribute("data-sidebar");
}

function storedCollapsed() {
  try {
    return localStorage.getItem(LS_COLLAPSED) === "1";
  } catch {
    return false;
  }
}

/**
 * Ẩn sidebar. Trên máy tính là thu về thanh rút gọn và ghi nhớ lựa chọn; trên
 * điện thoại chỉ đóng lớp phủ — đóng menu ở điện thoại không có nghĩa là lần
 * sau mở trên máy tính cũng phải thu.
 */
export function hideSidebar() {
  if (isMobileViewport()) {
    closeSidebarOnMobile();
    return;
  }
  setState("collapsed");
  try {
    localStorage.setItem(LS_COLLAPSED, "1");
  } catch {
    // Bỏ qua.
  }
}

/** Bung sidebar: trên điện thoại là lớp phủ tạm thời nên không ghi nhớ. */
export function expandSidebar() {
  if (isMobileViewport()) {
    setState("open");
    return;
  }
  setState(null);
  try {
    localStorage.setItem(LS_COLLAPSED, "0");
  } catch {
    // Bỏ qua.
  }
}

/** Đóng lớp phủ trên điện thoại; trên máy tính không làm gì. */
export function closeSidebarOnMobile() {
  if (!isMobileViewport()) return;
  const root = document.documentElement;
  if (root.getAttribute("data-sidebar") !== "open") return;
  // Trả về đúng lựa chọn đã ghi nhớ của khổ máy tính, phòng khi người dùng xoay
  // ngang hoặc phóng to cửa sổ ngay sau đó.
  setState(storedCollapsed() ? "collapsed" : null);
}

// Nhóm menu nào đang bung — kho ngoài React (useSyncExternalStore) để đọc được
// localStorage mà không phải setState trong effect lúc mount.
const EMPTY: Record<string, boolean> = {};
let cache = EMPTY;
let cacheRaw: string | null = null;
const listeners = new Set<() => void>();

export function subscribeOpenGroups(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

export function getOpenGroups(): Record<string, boolean> {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(LS_OPEN_GROUPS);
  } catch {
    // Bỏ qua.
  }
  // Chỉ parse lại khi chuỗi đổi: useSyncExternalStore đòi snapshot ổn định,
  // trả object mới mỗi lần đọc sẽ render vô hạn.
  if (raw !== cacheRaw) {
    cacheRaw = raw;
    try {
      cache = raw ? (JSON.parse(raw) as Record<string, boolean>) : EMPTY;
    } catch {
      cache = EMPTY;
    }
  }
  return cache;
}

/** Server render không có localStorage — luôn khởi đầu từ mặc định động. */
export function getServerOpenGroups(): Record<string, boolean> {
  return EMPTY;
}

export function setOpenGroups(next: Record<string, boolean>) {
  cache = next;
  cacheRaw = JSON.stringify(next);
  try {
    localStorage.setItem(LS_OPEN_GROUPS, cacheRaw);
  } catch {
    // Bỏ qua.
  }
  for (const l of listeners) l();
}
