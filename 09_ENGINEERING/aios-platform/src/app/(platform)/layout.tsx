import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Sidebar } from "@/components/Sidebar";
import { SidebarToggle } from "@/components/SidebarToggle";
import { HomeButton } from "@/components/HomeButton";
import { ThemeToggle } from "@/components/ThemeToggle";

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
  const modules = await prisma.platformModule.findMany({ orderBy: { order: "asc" } });
  const displayName = session?.user?.name ?? session?.user?.email ?? "";

  return (
    <div className="flex flex-1">
      <Sidebar modules={modules} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-2 border-b border-border bg-surface/85 px-3 py-3 backdrop-blur sm:px-6">
          <SidebarToggle />
          <HomeButton />
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
                {initials(displayName) || "?"}
              </span>
              <span className="hidden text-sm leading-tight sm:block">
                <span className="block font-medium text-ink">{displayName}</span>
                <span className="block text-xs text-ink-3">{session?.user?.role}</span>
              </span>
            </div>
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
    </div>
  );
}
