"use client";

function toggleTheme() {
  const root = document.documentElement;
  const current = root.getAttribute("data-theme");
  const isDark = current
    ? current === "dark"
    : window.matchMedia("(prefers-color-scheme: dark)").matches;
  const next = isDark ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch {
    // Safari chế độ riêng tư có thể chặn localStorage — bỏ qua, chỉ mất tính năng ghi nhớ.
  }
}

export function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Chuyển giao diện sáng/tối"
      title="Chuyển giao diện sáng/tối"
      className="relative grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-lg border border-border text-ink-2 transition-colors hover:border-border-strong hover:text-ink"
    >
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="theme-icon-sun absolute inset-0 m-auto h-4 w-4"
      >
        <circle cx="10" cy="10" r="3.5" />
        <path d="M10 2.5v2M10 15.5v2M17.5 10h-2M4.5 10h-2M15.3 4.7l-1.4 1.4M6.1 13.9l-1.4 1.4M15.3 15.3l-1.4-1.4M6.1 6.1 4.7 4.7" />
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="theme-icon-moon absolute inset-0 m-auto h-4 w-4"
      >
        <path d="M17 12.4A7 7 0 0 1 7.6 3a7 7 0 1 0 9.4 9.4Z" />
      </svg>
    </button>
  );
}
