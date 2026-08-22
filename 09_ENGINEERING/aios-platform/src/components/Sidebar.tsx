"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import type { PlatformModule } from "@/generated/prisma/client";

export function Sidebar({ modules }: { modules: PlatformModule[] }) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return modules;
    return modules.filter(
      (m) => m.code.toLowerCase().includes(q) || m.name.toLowerCase().includes(q),
    );
  }, [modules, query]);

  return (
    <nav className="flex w-72 shrink-0 flex-col border-r border-border bg-surface">
      <Link
        href="/"
        className="flex items-center gap-3 border-b border-border px-5 py-4"
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
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm module theo mã hoặc tên…"
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-3"
          />
        </label>
      </div>

      <ul className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-2">
        {filtered.map((m) => {
          const href = `/modules/${m.code}`;
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={m.code}>
              <Link
                href={href}
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
        {filtered.length === 0 && (
          <li className="px-3 py-6 text-center text-xs text-ink-3">
            Không tìm thấy module phù hợp.
          </li>
        )}
      </ul>
    </nav>
  );
}
