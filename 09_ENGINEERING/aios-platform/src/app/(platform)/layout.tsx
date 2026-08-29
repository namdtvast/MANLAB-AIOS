import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Sidebar } from "@/components/Sidebar";
import { SidebarToggle } from "@/components/SidebarToggle";
import { HomeButton } from "@/components/HomeButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CopilotDrawer } from "@/components/CopilotDrawer";
import { AccountSwitcher } from "@/components/AccountSwitcher";
import { copilotAvailable } from "@/lib/m29/copilot/availability";
import { maTaiLieuTraCuuDuoc } from "@/lib/m29/copilot/chi-muc";
import { danhSachTaiKhoanDemo, duocDoiTaiKhoan } from "@/lib/doi-tai-khoan";

function initials(label: string) {
  return label
    .trim()
    .split(/\s+/)
    .slice(-2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const isAdmin = session?.user?.role === "ADMIN";
  // Bộ chuyển tài khoản chỉ dựng khi phiên hiện tại thật sự được phép đổi (cần gạt
  // DEMO_ACCOUNT_SWITCH + cờ demoAccount) — xem src/lib/doi-tai-khoan.ts. Môi trường thật
  // không đặt cần gạt thì danh sách rỗng và header giữ nguyên khối danh tính tĩnh như cũ.
  const [modules, pendingAccessRequests, showCopilot, doiDuoc, taiKhoanDemo, maTraCuuDuoc] = await Promise.all([
    prisma.platformModule.findMany({ orderBy: { order: "asc" } }),
    isAdmin ? prisma.accessRequest.count({ where: { status: "PENDING" } }) : Promise.resolve(0),
    copilotAvailable(),
    duocDoiTaiKhoan(session?.user?.id),
    danhSachTaiKhoanDemo(),
    maTaiLieuTraCuuDuoc(),
  ]);
  const displayName = session?.user?.name ?? session?.user?.email ?? "";

  return (
    <div className="flex flex-1">
      <Sidebar modules={modules} isAdmin={isAdmin} pendingAccessRequests={pendingAccessRequests} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-2 border-b border-border bg-surface/85 px-3 py-3 backdrop-blur sm:px-6">
          <SidebarToggle />
          <HomeButton />
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            {doiDuoc && taiKhoanDemo.length > 1 ? (
              <AccountSwitcher
                taiKhoanHienTai={{
                  email: session?.user?.email ?? "",
                  name: session?.user?.name ?? null,
                  role: session?.user?.role ?? "",
                }}
                danhSach={taiKhoanDemo}
              />
            ) : (
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
                  {initials(displayName) || "?"}
                </span>
                <span className="hidden text-sm leading-tight sm:block">
                  <span className="block font-medium text-ink">{displayName}</span>
                  <span className="block text-xs text-ink-3">{session?.user?.role}</span>
                </span>
              </div>
            )}
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <button
                type="submit"
                className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-sm text-ink-2 transition-colors hover:border-border-strong hover:text-ink sm:px-3"
              >
                <svg
                  aria-hidden
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.7}
                  className="h-4 w-4"
                >
                  <path d="M12.5 14.5V16a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 16V4A1.5 1.5 0 0 1 5 2.5h6A1.5 1.5 0 0 1 12.5 4v1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 10h8.5M16.5 10 13.5 7M16.5 10 13.5 13" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="hidden sm:inline">Đăng xuất</span>
              </button>
            </form>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
      {/* Gợi ý câu hỏi bám dữ liệu module thật (PlatformModule, seed từ manifest.yaml) — không
          viết cứng 38 × 3 câu ở giao diện. Chỉ truyền 3 trường cần dùng, không truyền cả bản ghi.
          maTraCuuDuoc lọc tiếp phần gợi ý bám mã thủ tục theo chỉ mục Copilot: module khai docId
          trỏ tới thủ tục chưa phê duyệt thì thủ tục đó không có trong chỉ mục, mời hỏi là mời vào
          một lượt chắc chắn bị từ chối (xem chi-muc.ts). */}
      {showCopilot && (
        <CopilotDrawer modules={modules.map((m) => ({ code: m.code, name: m.name, docId: m.docId }))} maTraCuuDuoc={maTraCuuDuoc} />
      )}
    </div>
  );
}
