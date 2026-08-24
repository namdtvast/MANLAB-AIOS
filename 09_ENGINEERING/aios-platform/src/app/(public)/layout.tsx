import Link from "next/link";
import { auth } from "@/lib/auth";
import { ThemeToggle } from "@/components/ThemeToggle";

// Khung của các trang KHÔNG đòi đăng nhập: trang giới thiệu "/" và form gửi yêu cầu
// cấp tài khoản "/dang-ky". Danh sách đường dẫn công khai là nguồn sự thật ở
// src/proxy.ts — thêm trang mới vào nhóm này phải khai ở đó, nếu không middleware
// vẫn đá về màn hình đăng nhập.

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="sticky top-0 z-20 border-b border-border bg-surface/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
          <Link href="/" className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent font-head text-sm font-bold text-accent-ink">
              AI
            </span>
            <span className="min-w-0">
              <span className="block truncate font-head text-[15px] font-bold tracking-tight text-ink">
                MANLAB-AIOS
              </span>
              <span className="hidden truncate text-xs text-ink-3 sm:block">
                Viện Kiểm định Công nghệ và Môi trường
              </span>
            </span>
          </Link>

          <nav aria-label="Truy cập hệ thống" className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            {session?.user ? (
              <Link
                href="/dashboard"
                className="inline-flex min-h-11 items-center rounded-lg bg-accent px-4 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90"
              >
                Vào hệ thống
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="inline-flex min-h-11 items-center rounded-lg border border-border px-3 text-sm font-semibold text-ink-2 transition-colors hover:border-border-strong hover:text-ink sm:px-4"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/dang-ky"
                  className="inline-flex min-h-11 items-center rounded-lg bg-accent px-3 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 sm:px-4"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-ink-2 sm:px-6">
          <p className="font-head font-bold text-ink">
            Viện Kiểm định Công nghệ và Môi trường (ETV)
          </p>
          <p className="max-w-3xl leading-relaxed">
            MANLAB-AIOS là hệ thống nội bộ phục vụ vận hành kiểm định — hiệu chuẩn — thử nghiệm
            theo ISO 9001, ISO/IEC 17025, ISO 17034, ISO/IEC 27001 và ISO/IEC 42001. Tài khoản do
            Quản trị hệ thống cấp theo phân công công việc.
          </p>
        </div>
      </footer>
    </div>
  );
}
