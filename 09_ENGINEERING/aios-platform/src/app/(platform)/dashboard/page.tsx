import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MENU_GROUPS, DEFAULT_MENU_GROUP } from "@/lib/menu";

// Bảng điều khiển của người ĐÃ đăng nhập. Phần giới thiệu nền tảng (mục đích, đối
// tượng, giá trị) nằm ở trang chủ công khai "/" — người đã vào tới đây không cần
// đọc lại, cái họ cần là vào việc.

export default async function DashboardPage() {
  const [session, modules] = await Promise.all([
    auth(),
    prisma.platformModule.findMany({
      orderBy: { order: "asc" },
      select: {
        code: true,
        name: true,
        status: true,
        menuGroup: true,
        menuOrder: true,
        order: true,
        docStatus: true,
      },
    }),
  ]);

  const total = modules.length;
  const activeModules = modules.filter((m) => m.status === "ACTIVE");
  const issued = modules.filter((m) => m.docStatus === "issued").length;
  const displayName = session?.user?.name ?? session?.user?.email ?? "";

  const kpis = [
    { label: "Module trong kiến trúc", value: total, tone: "ink" as const },
    { label: "Đã vận hành trên nền tảng", value: activeModules.length, tone: "good" as const },
    { label: "Có thủ tục đã ban hành", value: issued, tone: "ink" as const },
    { label: "Nhóm nghiệp vụ", value: MENU_GROUPS.length, tone: "ink" as const },
  ];

  const groups = MENU_GROUPS.map((g) => {
    const items = modules
      .filter((m) => (m.menuGroup ?? DEFAULT_MENU_GROUP) === g.code)
      .sort((a, b) => (a.menuOrder ?? a.order) - (b.menuOrder ?? b.order));
    return { ...g, items, active: items.filter((m) => m.status === "ACTIVE") };
  }).filter((g) => g.items.length > 0);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-accent">
          Bảng điều khiển
        </p>
        <h1 className="font-head text-2xl font-bold text-ink">
          {displayName ? `Chào ${displayName}` : "Tổng quan nền tảng"}
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-ink-2">
          Mỗi mục trong danh sách bên trái là một module số hóa một thủ tục đã ban hành. Chấm
          xanh là module đã vận hành thật trên nền tảng.
        </p>
      </div>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-border bg-surface p-4 shadow-sm">
            <p className="text-xs text-ink-2">{kpi.label}</p>
            <p
              className={`mt-2 font-head text-3xl font-bold tabular-nums ${
                kpi.tone === "good" ? "text-good" : "text-ink"
              }`}
            >
              {kpi.value}
            </p>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-head text-lg font-bold text-ink">Bản đồ nghiệp vụ</h2>
          <p className="mt-1 max-w-3xl text-sm text-ink-2">
            Module chưa vận hành mở trang giới thiệu và trỏ về đặc tả nghiệp vụ tương ứng.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {groups.map((g) => (
            <div key={g.code} className="flex flex-col rounded-xl border border-border bg-surface p-4">
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-head text-sm font-bold text-ink">{g.label}</p>
                <p className="shrink-0 font-mono text-xs text-ink-3">
                  <span className="sr-only">Đã vận hành </span>
                  {g.active.length}/{g.items.length}
                </p>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {g.items.map((m) => (
                  <Link
                    key={m.code}
                    href={`/modules/${m.code}`}
                    title={`${m.name} — ${m.status === "ACTIVE" ? "đã vận hành" : "chưa vận hành"}`}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[11px] transition-colors ${
                      m.status === "ACTIVE"
                        ? "border-accent-line bg-accent-soft font-semibold text-accent hover:opacity-80"
                        : "border-border text-ink-3 hover:border-border-strong hover:text-ink-2"
                    }`}
                  >
                    {m.status === "ACTIVE" && (
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-good" />
                    )}
                    {m.code}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-sunk p-4 text-sm text-ink-2">
        <p className="font-head font-bold text-ink">Tình trạng hiện tại</p>
        <p className="mt-1.5 max-w-3xl leading-relaxed">
          Nền tảng đang xây theo từng bước. {activeModules.length}/{total} module đã chạy thật, và
          trong số đó nhiều module mới đạt phần lõi của đặc tả chứ chưa đủ toàn bộ phạm vi. Trang
          module luôn nói rõ phần nào đã có, phần nào chưa.
        </p>
        <Link
          href="/"
          className="mt-2.5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
        >
          Xem trang giới thiệu công khai
          <svg
            aria-hidden
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.7}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
          >
            <path d="M8 5.5 13.5 10 8 14.5" />
          </svg>
        </Link>
      </section>
    </div>
  );
}
