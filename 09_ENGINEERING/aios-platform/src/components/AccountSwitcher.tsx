"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { doiTaiKhoanAction } from "@/app/(platform)/doi-tai-khoan-action";
import type { TaiKhoanDemo } from "@/lib/doi-tai-khoan";

const NHAN_PLATFORM_ROLE: Record<string, string> = {
  ADMIN: "Quản trị nền tảng",
  MEMBER: "Thành viên",
  VIEWER: "Chỉ xem",
};

// Ngay cả khi đã gom theo mã vai trò, một người vẫn có thể mang vài vai trò khác nhau —
// cắt bớt chip để một dòng không đẩy danh sách dài ra; phần còn lại nằm ở tooltip chip "+N".
const CHIP_TOI_DA = 4;

function chuCaiDau(label: string) {
  return label
    .trim()
    .split(/\s+/)
    .slice(-2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

function tenHienThi(u: TaiKhoanDemo) {
  return u.name ?? u.email;
}

/**
 * Bộ chuyển tài khoản trên header. Chỉ được render khi src/lib/doi-tai-khoan.ts cho phép —
 * component này KHÔNG tự quyết định quyền, nó chỉ hiển thị danh sách mà server đã lọc sẵn.
 *
 * Mỗi dòng là một submit button của cùng một form: name="email" value=<email> nên lượt đổi
 * đi thẳng qua server action, không cần state trung gian cho việc chọn.
 */
export function AccountSwitcher({
  taiKhoanHienTai,
  danhSach,
}: {
  taiKhoanHienTai: { email: string; name: string | null; role: string };
  danhSach: TaiKhoanDemo[];
}) {
  const [mo, setMo] = useState(false);
  const [loc, setLoc] = useState("");
  const boc = useRef<HTMLDivElement>(null);
  // Đổi tài khoản xong quay lại đúng trang đang xem — đó là toàn bộ điểm khác biệt so với
  // Đăng xuất/Đăng nhập, vốn luôn ném người dùng về /dashboard.
  const pathname = usePathname();

  useEffect(() => {
    if (!mo) return;
    const ngoai = (e: MouseEvent) => {
      if (boc.current && !boc.current.contains(e.target as Node)) setMo(false);
    };
    const phim = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMo(false);
    };
    document.addEventListener("mousedown", ngoai);
    document.addEventListener("keydown", phim);
    return () => {
      document.removeEventListener("mousedown", ngoai);
      document.removeEventListener("keydown", phim);
    };
  }, [mo]);

  const tuKhoa = loc.trim().toLowerCase();
  const hienThi = tuKhoa
    ? danhSach.filter((u) =>
        [u.name ?? "", u.email, u.role, ...u.vaiTro.flatMap((v) => [v.role, ...v.moduleCodes])]
          .join(" ")
          .toLowerCase()
          .includes(tuKhoa)
      )
    : danhSach;

  const nhanHienTai = taiKhoanHienTai.name ?? taiKhoanHienTai.email;

  return (
    <div ref={boc} className="relative">
      <button
        type="button"
        onClick={() => setMo((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={mo}
        title="Đổi tài khoản đăng nhập"
        className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-transparent px-1.5 py-1 transition-colors hover:border-border"
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
          {chuCaiDau(nhanHienTai) || "?"}
        </span>
        <span className="hidden text-left text-sm leading-tight sm:block">
          <span className="block font-medium text-ink">{nhanHienTai}</span>
          <span className="block text-xs text-ink-3">{taiKhoanHienTai.role}</span>
        </span>
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-4 w-4 shrink-0 text-ink-3 transition-transform ${mo ? "rotate-180" : ""}`}
        >
          <path d="m6 8 4 4 4-4" />
        </svg>
      </button>

      {mo && (
        <div
          role="menu"
          className="absolute right-0 top-full z-30 mt-2 flex max-h-[70vh] w-[19rem] flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-lg sm:w-[22rem]"
        >
          <div className="border-b border-border px-3 py-2.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-3">
              Đổi tài khoản đăng nhập
            </p>
            <p className="mt-1 text-xs leading-snug text-ink-3">
              Quyền đi theo người: chuyển sang tài khoản nào thì thao tác đúng như người đó.
              Tài khoản dựng sẵn cho demo, không phải tài khoản người thật.
            </p>
            <input
              type="search"
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
              placeholder="Lọc theo tên, email hoặc vai trò…"
              aria-label="Lọc danh sách tài khoản"
              className="mt-2 w-full rounded-lg border border-border bg-bg px-2.5 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line"
            />
          </div>

          <form action={doiTaiKhoanAction} className="min-h-0 flex-1 overflow-y-auto p-1.5">
            <input type="hidden" name="quayLai" value={pathname} />
            {hienThi.length === 0 && (
              <p className="px-2 py-3 text-sm text-ink-3">Không có tài khoản nào khớp.</p>
            )}
            {hienThi.map((u) => {
              const dangDung = u.email === taiKhoanHienTai.email;
              return (
                <button
                  key={u.id}
                  type="submit"
                  name="email"
                  value={u.email}
                  disabled={dangDung}
                  role="menuitem"
                  className={`flex w-full items-start gap-2.5 rounded-lg px-2 py-2 text-left transition-colors ${
                    dangDung
                      ? "cursor-default bg-accent-soft"
                      : "cursor-pointer hover:bg-bg"
                  }`}
                >
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent-soft text-[0.65rem] font-semibold text-accent">
                    {chuCaiDau(tenHienThi(u)) || "?"}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5">
                      <span className="truncate text-sm font-medium text-ink">{tenHienThi(u)}</span>
                      {dangDung && (
                        <span className="shrink-0 text-[0.65rem] font-semibold uppercase text-accent">
                          đang dùng
                        </span>
                      )}
                    </span>
                    <span className="block truncate text-xs text-ink-3">{u.email}</span>
                    <span className="mt-1 flex flex-wrap gap-1">
                      <span className="rounded border border-border px-1.5 py-0.5 text-[0.65rem] text-ink-2">
                        {NHAN_PLATFORM_ROLE[u.role] ?? u.role}
                      </span>
                      {u.vaiTro.slice(0, CHIP_TOI_DA).map((v) => (
                        <span
                          key={v.role}
                          className="rounded border border-border px-1.5 py-0.5 text-[0.65rem] text-ink-2"
                          title={`Vai trò ${v.role} ở: ${v.moduleCodes.join(", ")}`}
                        >
                          {v.role}
                          <span className="text-ink-3"> · {v.moduleCodes.length}</span>
                        </span>
                      ))}
                      {u.vaiTro.length > CHIP_TOI_DA && (
                        <span
                          className="rounded border border-border px-1.5 py-0.5 text-[0.65rem] text-ink-3"
                          title={u.vaiTro
                            .slice(CHIP_TOI_DA)
                            .map((v) => `${v.role} (${v.moduleCodes.join(", ")})`)
                            .join(" · ")}
                        >
                          +{u.vaiTro.length - CHIP_TOI_DA}
                        </span>
                      )}
                    </span>
                  </span>
                </button>
              );
            })}
          </form>
        </div>
      )}
    </div>
  );
}
