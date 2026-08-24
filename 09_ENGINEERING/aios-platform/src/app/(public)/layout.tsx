import Link from "next/link";
import { auth } from "@/lib/auth";
import { ThemeToggle } from "@/components/ThemeToggle";

// Khung của các trang KHÔNG đòi đăng nhập: trang giới thiệu "/" và form gửi yêu cầu
// cấp tài khoản "/dang-ky". Danh sách đường dẫn công khai là nguồn sự thật ở
// src/proxy.ts — thêm trang mới vào nhóm này phải khai ở đó, nếu không middleware
// vẫn đá về màn hình đăng nhập.
//
// <main id="main-content"> nằm ở ĐÂY và chỉ ở đây — trang con không được mở thêm
// <main> của riêng nó. Lồng hai <main> là HTML không hợp lệ và tạo hai vùng nội dung
// chính cho trình đọc màn hình; liên kết "Bỏ qua điều hướng" cũng phải trỏ vào đúng
// thẻ này chứ không phải một <div> bên trong trang.

// Neo điều hướng trong trang giới thiệu. Mỗi mục phải khớp một section[id] ở
// (public)/page.tsx — đổi id bên đó thì sửa cả ở đây, nếu không neo sẽ trỏ hụt.
const SECTION_LINKS = [
  { href: "#linh-vuc", label: "Lĩnh vực" },
  { href: "#quy-trinh", label: "Quy trình" },
  { href: "#kiem-soat", label: "Kiểm soát" },
];

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <a
        href="#main-content"
        className="fixed left-3 top-3 z-50 -translate-y-20 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-transform focus:translate-y-0"
      >
        Bỏ qua điều hướng
      </a>
      <header className="sticky top-0 z-20 border-b border-border bg-surface/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
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

          {/* Neo tới các mục của trang giới thiệu. Chỉ hiện ở khổ lớn: khổ nhỏ ưu tiên
              chỗ cho hai nút Đăng nhập / Đăng ký, và trang đủ ngắn để cuộn tay. */}
          <nav aria-label="Nội dung trang" className="ml-auto hidden items-center gap-1 lg:flex">
            {SECTION_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-ink-2 transition-colors hover:bg-sunk hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <nav aria-label="Truy cập hệ thống" className="ml-auto flex items-center gap-2 lg:ml-2">
            <ThemeToggle />
            {session?.user ? (
              <Link
                href="/dashboard"
                className="inline-flex min-h-11 items-center whitespace-nowrap rounded-lg bg-accent px-4 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90"
              >
                Vào hệ thống
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="inline-flex min-h-11 items-center whitespace-nowrap rounded-lg border border-border px-3 text-sm font-semibold text-ink-2 transition-colors hover:border-border-strong hover:text-ink sm:px-4"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/dang-ky"
                  className="inline-flex min-h-11 items-center whitespace-nowrap rounded-lg bg-accent px-3 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:px-4"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main id="main-content" className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-ink-2 sm:px-6">
          <p className="font-head font-bold text-ink">
            Viện Kiểm định Công nghệ và Môi trường (ETV)
          </p>
          <p className="max-w-3xl leading-relaxed">
            MANLAB-AIOS là hệ thống nội bộ phục vụ vận hành kiểm định, hiệu chuẩn, thử nghiệm và
            quan trắc môi trường theo ISO 9001, ISO/IEC 17025, ISO 17034, ISO/IEC 27001 và
            ISO/IEC 42001. Tài khoản do Quản trị hệ thống cấp theo phân công công việc.
          </p>
        </div>
      </footer>
    </div>
  );
}
