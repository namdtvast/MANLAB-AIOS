import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MENU_GROUPS, DEFAULT_MENU_GROUP } from "@/lib/menu";

// Trang chủ CÔNG KHAI — người đọc chưa đăng nhập và có thể chưa biết ETV là gì.
// Không đặt liên kết vào /modules/* ở đây: những đường dẫn đó bị middleware chặn,
// bấm vào chỉ rơi về màn hình đăng nhập.
//
// Vùng nội dung dùng <div>, KHÔNG dùng <main>: layout công khai đã có <main> bọc
// ngoài (và mang id="main-content" cho liên kết bỏ qua điều hướng). Lồng hai <main>
// là HTML không hợp lệ và tạo hai vùng nội dung chính cho trình đọc màn hình.

const DOCS_PORTAL =
  process.env.NEXT_PUBLIC_DOCS_PORTAL_URL ?? "https://namdtvast.github.io/MANLAB-AIOS/";

type IconName = "shield" | "calibrate" | "flask" | "leaf" | "trace" | "document";

function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    shield: (
      <>
        <path d="M12 3 5.5 5.5v5.7c0 4.1 2.7 7.8 6.5 9.3 3.8-1.5 6.5-5.2 6.5-9.3V5.5L12 3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    calibrate: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 4v3m0 10v3M4 12h3m10 0h3" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    flask: (
      <>
        <path d="M9 3h6m-5 0v6l-5 8.2A2.5 2.5 0 0 0 7.1 21h9.8a2.5 2.5 0 0 0 2.1-3.8L14 9V3" />
        <path d="M7.5 15h9" />
      </>
    ),
    leaf: (
      <>
        <path d="M20 4.5C12 4.5 6 8.3 6 14a6 6 0 0 0 6 6c5.7 0 8-6.5 8-15.5Z" />
        <path d="M4 21c2.2-5.2 6.2-8.8 12-11" />
      </>
    ),
    trace: (
      <>
        <path d="M5 4h14v14H5z" />
        <path d="M9 8h6m-6 4h6m-6 4h3" />
        <path d="M5 7H3v14h13v-3" />
      </>
    ),
    document: (
      <>
        <path d="M7 3h7l4 4v14H7z" />
        <path d="M14 3v5h4M10 12h5m-5 4h5" />
      </>
    ),
  };
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}

function Arrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
    >
      <path d="M4 10h11m-4-4 4 4-4 4" />
    </svg>
  );
}

function SectionHead({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent">{eyebrow}</p>
      <h2 className="font-head text-2xl font-bold tracking-tight text-ink sm:text-3xl">{title}</h2>
      {lead && <p className="mt-3 text-base leading-7 text-ink-2">{lead}</p>}
    </div>
  );
}

// Bốn chuỗi nghiệp vụ chuyên môn của Viện, bám đúng năng lực gốc ở 02_CAPABILITIES:
// CAP-09 Kiểm định, CAP-08 Hiệu chuẩn, CAP-10 Thử nghiệm, CAP-11 Quan trắc.
const SERVICES: { icon: IconName; code: string; title: string; body: string; steps: string[] }[] = [
  {
    icon: "shield",
    code: "KĐ",
    title: "Kiểm định",
    body: "Quản lý đối tượng, phương tiện đo và hồ sơ kiểm định theo đúng phạm vi được giao.",
    steps: ["Tiếp nhận", "Thực hiện", "Phát hành"],
  },
  {
    icon: "calibrate",
    code: "HC",
    title: "Hiệu chuẩn",
    body: "Liên kết phương pháp, chuẩn sử dụng, kết quả đo và bằng chứng kỹ thuật trong một hồ sơ.",
    steps: ["Phương pháp", "Kết quả", "Truy xuất"],
  },
  {
    icon: "flask",
    code: "TN",
    title: "Thử nghiệm",
    body: "Theo dõi mẫu, phép thử, dữ liệu kết quả và quá trình soát xét trước khi phát hành.",
    steps: ["Mẫu", "Phép thử", "Báo cáo"],
  },
  {
    icon: "leaf",
    code: "QT",
    title: "Quan trắc môi trường",
    body: "Quản lý kế hoạch, hiện trường, mẫu, kết quả và hồ sơ quan trắc theo chuỗi công việc.",
    steps: ["Kế hoạch", "Hiện trường", "Kết quả"],
  },
];

const WORKFLOW = [
  { number: "01", title: "Tiếp nhận", body: "Ghi nhận yêu cầu, đối tượng, phạm vi và người phụ trách." },
  { number: "02", title: "Thực hiện", body: "Làm việc theo phương pháp, biểu mẫu và căn cứ đang có hiệu lực." },
  { number: "03", title: "Kiểm soát", body: "Soát xét điều kiện, dữ liệu và thẩm quyền trước quyết định." },
  { number: "04", title: "Phát hành", body: "Phê duyệt và công bố hồ sơ theo đúng vòng đời đã ban hành." },
  { number: "05", title: "Truy vết", body: "Giữ bằng chứng ai làm, lúc nào và dựa trên căn cứ nào." },
];

const CONTROL_POINTS: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "document",
    title: "Một nguồn dữ liệu",
    body: "Biểu mẫu, chuẩn mực và hồ sơ dùng chung một nguồn sự thật, giảm nhầm phiên bản.",
  },
  {
    icon: "shield",
    title: "Chốt chặn ở máy chủ",
    body: "Quyền và điều kiện nghiệp vụ được kiểm tra tại nơi xử lý, không chỉ ẩn nút trên màn hình.",
  },
  {
    icon: "trace",
    title: "Bằng chứng sinh ra khi làm",
    body: "Mỗi lần chuyển trạng thái đều để lại vết kiểm tra phục vụ truy xuất và đánh giá.",
  },
];

const AUDIENCE = [
  {
    role: "Lãnh đạo Viện",
    body: "Phê duyệt ở các nút quyết định, nhìn được tình trạng toàn hệ thống mà không phải hỏi từng phòng.",
  },
  {
    role: "Lãnh đạo phòng · Trưởng phòng",
    body: "Soát xét hồ sơ do nhân viên trình, phân công người phụ trách, theo dõi việc đến hạn của phòng mình.",
  },
  {
    role: "Quản lý chất lượng",
    body: "Giữ hệ thống quản lý: tài liệu, đánh giá nội bộ, việc không phù hợp, hành động khắc phục, xem xét của lãnh đạo.",
  },
  {
    role: "Nhân viên thực hiện",
    body: "Nơi làm việc hằng ngày: lập hồ sơ, ghi nhận kết quả, trình duyệt theo đúng biểu mẫu đã ban hành.",
  },
  {
    role: "Quản trị hệ thống",
    body: "Quản lý tài khoản, gán vai trò theo module, vận hành hạ tầng và kiểm soát AI.",
  },
  {
    role: "Đoàn đánh giá · Bên quan tâm",
    body: "Truy vết từ điều khoản tiêu chuẩn tới thủ tục, tới hồ sơ thật và bằng chứng, theo quyền được cấp.",
  },
];

export default async function PublicHomePage() {
  const [session, modules] = await Promise.all([
    auth(),
    prisma.platformModule.findMany({
      orderBy: { order: "asc" },
      select: { code: true, status: true, menuGroup: true, docStatus: true },
    }),
  ]);

  const total = modules.length;
  const activeCount = modules.filter((m) => m.status === "ACTIVE").length;
  const issued = modules.filter((m) => m.docStatus === "issued").length;
  const signedIn = Boolean(session?.user);

  const groups = MENU_GROUPS.map((g) => ({
    ...g,
    count: modules.filter((m) => (m.menuGroup ?? DEFAULT_MENU_GROUP) === g.code).length,
  })).filter((g) => g.count > 0);

  const stats = [
    { label: "Module kiến trúc", value: total },
    { label: "Module đang vận hành", value: activeCount },
    { label: "Thủ tục đã ban hành", value: issued },
    { label: "Nhóm nghiệp vụ", value: MENU_GROUPS.length },
  ];

  return (
    <div className="overflow-hidden">
      {/* 1. Mục đích — nền tảng này là gì, cho ai, vào bằng đường nào */}
      <section className="relative border-b border-border bg-surface">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,var(--accent-soft),transparent_32%)]"
        />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-24">
          <div className="min-w-0">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent-line bg-accent-soft px-3 py-1.5 text-xs font-semibold text-accent">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-good" />
              Nền tảng vận hành nghiệp vụ của Viện ETV
            </p>
            <h1 className="max-w-4xl font-head text-4xl font-bold leading-[1.13] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]">
              Quản lý hoạt động đo lường và quan trắc môi trường
              <span className="mt-2 block text-accent">trên một nền tảng thống nhất</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-ink-2 sm:text-lg sm:leading-8">
              Kết nối kiểm định, hiệu chuẩn, thử nghiệm và quan trắc môi trường với quy trình, hồ
              sơ, vai trò và bằng chứng tuân thủ trong cùng một hệ thống.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={signedIn ? "/dashboard" : "/login"}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-6 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                {signedIn ? "Vào bảng điều khiển" : "Đăng nhập hệ thống"}
                <Arrow />
              </Link>
              {!signedIn && (
                <Link
                  href="/dang-ky"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border-strong bg-surface px-6 text-sm font-semibold text-ink transition-colors hover:bg-sunk focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  Đăng ký — gửi yêu cầu cấp tài khoản
                </Link>
              )}
            </div>
            {!signedIn && (
              <p className="mt-3 text-sm text-ink-3">
                Tài khoản được cấp theo phân công công việc và phạm vi trách nhiệm.
              </p>
            )}
          </div>

          <div className="min-w-0 rounded-3xl border border-border bg-bg p-3 shadow-[0_24px_60px_rgb(0_0_0/0.10)] sm:p-5">
            <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                    Trung tâm vận hành
                  </p>
                  <p className="mt-1 font-head text-lg font-bold text-ink">Chuỗi hồ sơ xuyên suốt</p>
                </div>
                <span className="rounded-full bg-good-soft px-3 py-1 text-xs font-semibold text-good">
                  Đang vận hành
                </span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {SERVICES.map((s) => (
                  <div key={s.code} className="min-w-0 rounded-xl border border-border bg-bg p-3 sm:p-4">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                        <Icon name={s.icon} />
                      </span>
                      <div className="min-w-0">
                        <p className="font-head text-sm font-bold leading-tight text-ink">{s.title}</p>
                        <p className="mt-0.5 text-[11px] text-ink-3">Nghiệp vụ {s.code}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl bg-accent px-4 py-4 text-accent-ink">
                <div className="flex items-center justify-between gap-3 text-xs font-semibold">
                  <span>Hồ sơ → Dữ liệu → Bằng chứng</span>
                  <span>
                    {activeCount}/{total} module
                  </span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-white"
                    style={{ width: total ? `${(activeCount / total) * 100}%` : "0%" }}
                  />
                </div>
                <p className="mt-2 text-xs leading-5 opacity-80">
                  Tiến độ vận hành được lấy từ danh mục module hiện tại.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-7xl flex-col gap-20 px-4 py-16 sm:px-6 sm:py-20">
        {/* 2. Bốn chuỗi nghiệp vụ chuyên môn */}
        <section id="linh-vuc" className="scroll-mt-24">
          <SectionHead
            eyebrow="Bốn lĩnh vực cốt lõi"
            title="Một nền tảng, bốn chuỗi nghiệp vụ chuyên môn"
            lead="Mỗi lĩnh vực giữ đúng thuật ngữ và luồng hồ sơ riêng, nhưng dùng chung nền tảng dữ liệu, phân quyền và truy vết."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {SERVICES.map((s) => (
              <article
                key={s.code}
                className="flex min-h-72 flex-col rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent-line"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-soft text-accent">
                    <Icon name={s.icon} />
                  </span>
                  <span className="font-mono text-xs font-semibold text-ink-3">{s.code}</span>
                </div>
                <h3 className="mt-5 font-head text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-ink-2">{s.body}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`Các bước chính của ${s.title}`}>
                  {s.steps.map((step) => (
                    <li
                      key={step}
                      className="rounded-full border border-border bg-bg px-2.5 py-1 text-xs text-ink-2"
                    >
                      {step}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* 3. Luồng vận hành */}
        <section
          id="quy-trinh"
          aria-labelledby="workflow-title"
          className="scroll-mt-24 rounded-3xl bg-accent p-6 text-accent-ink sm:p-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] opacity-70">Luồng vận hành</p>
          <h2
            id="workflow-title"
            className="mt-2 max-w-3xl font-head text-2xl font-bold tracking-tight sm:text-3xl"
          >
            Từ yêu cầu ban đầu đến bằng chứng có thể truy xuất
          </h2>
          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-white/15 md:grid-cols-5">
            {WORKFLOW.map((step, i) => (
              <article key={step.number} className="bg-accent p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold opacity-60">{step.number}</span>
                  {i < WORKFLOW.length - 1 && <Arrow />}
                </div>
                <h3 className="mt-6 font-head text-base font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 opacity-75">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 4. Kiểm soát hệ thống + quy mô thật */}
        <section id="kiem-soat" className="scroll-mt-24">
          <SectionHead
            eyebrow="Kiểm soát hệ thống"
            title="Không chỉ số hóa biểu mẫu, mà số hóa cả cách làm đúng"
            lead="Nền tảng liên kết căn cứ, vai trò, dữ liệu và phê duyệt để hồ sơ được tạo đúng ngay trong quá trình thực hiện."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {CONTROL_POINTS.map((p) => (
              <article key={p.title} className="rounded-2xl border border-border bg-surface p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-sunk text-accent">
                  <Icon name={p.icon} />
                </span>
                <h3 className="mt-5 font-head text-lg font-bold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-2">{p.body}</p>
              </article>
            ))}
          </div>
          <div
            className="mt-4 grid gap-4 rounded-2xl border border-border bg-sunk p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6"
            aria-label="Quy mô nền tảng hiện tại"
          >
            {stats.map((item) => (
              <div key={item.label} className="border-border first:border-l-0 first:pl-0 sm:border-l sm:pl-5">
                <p className="font-head text-3xl font-bold tabular-nums text-ink">{item.value}</p>
                <p className="mt-1 text-sm text-ink-2">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Đối tượng tham gia */}
        <section id="doi-tuong" className="scroll-mt-24">
          <SectionHead
            eyebrow="Đối tượng"
            title="Ai làm việc trên nền tảng này?"
            lead="Cùng một hồ sơ đi qua nhiều vai. Mỗi vai chỉ thấy và chỉ làm được phần việc của mình, do quyền gán theo từng module."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {AUDIENCE.map((a) => (
              <article key={a.role} className="rounded-2xl border border-border bg-surface p-5">
                <h3 className="font-head text-base font-bold text-ink">{a.role}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-2">{a.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 6. Phạm vi quản lý — không liên kết vì các trang đó đòi đăng nhập */}
        <section
          id="pham-vi"
          className="scroll-mt-24 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start"
        >
          <SectionHead
            eyebrow="Phạm vi quản lý"
            title="Bảy nhóm nghiệp vụ kết nối toàn Viện"
            lead="Nội dung chi tiết chỉ mở theo tài khoản và vai trò được cấp. Số module phản ánh danh mục hiện có của nền tảng."
          />
          <ul className="grid gap-3 sm:grid-cols-2">
            {groups.map((g) => (
              <li
                key={g.code}
                className="flex min-h-16 items-center justify-between gap-4 rounded-xl border border-border bg-surface px-4 py-3"
              >
                <span className="font-head text-sm font-bold text-ink">{g.label}</span>
                <span className="shrink-0 rounded-full bg-sunk px-2.5 py-1 font-mono text-xs text-ink-2">
                  {g.count}
                  <span className="sr-only"> module</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* 7. Nói thẳng tình trạng thật — tránh nhầm "đã dựng" với "đã hoàn thiện" */}
        <section className="rounded-2xl border border-border bg-sunk p-5 text-sm text-ink-2 sm:p-6">
          <h2 className="font-head text-base font-bold text-ink">Tình trạng hiện tại</h2>
          <p className="mt-2 max-w-3xl leading-6">
            Nền tảng đang xây theo từng bước. {activeCount}/{total} module đã chạy thật, và trong số
            đó nhiều module mới đạt phần lõi của đặc tả chứ chưa đủ toàn bộ phạm vi. Trang module
            luôn nói rõ phần nào đã có, phần nào chưa — không quy tròn &ldquo;đã dựng&rdquo; thành
            &ldquo;đã hoàn thiện&rdquo;.
          </p>
        </section>

        {/* 8. Lối vào cuối trang */}
        <section className="rounded-3xl border border-accent-line bg-accent-soft p-6 sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                Truy cập nền tảng
              </p>
              <h2 className="mt-2 font-head text-2xl font-bold text-ink sm:text-3xl">
                Bắt đầu công việc theo đúng vai trò được giao
              </h2>
              <p className="mt-3 text-sm leading-6 text-ink-2">
                Đã được cấp tài khoản thì đăng nhập. Chưa có thì gửi yêu cầu — Quản trị hệ thống xét
                theo phân công công việc, không cấp tự động.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link
                href={signedIn ? "/dashboard" : "/login"}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-6 text-sm font-semibold text-accent-ink hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                {signedIn ? "Vào bảng điều khiển" : "Đăng nhập"}
                <Arrow />
              </Link>
              {!signedIn && (
                <Link
                  href="/dang-ky"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border-strong bg-surface px-6 text-sm font-semibold text-ink hover:bg-sunk focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  Đăng ký
                </Link>
              )}
              <a
                href={DOCS_PORTAL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border-strong bg-surface px-6 text-sm font-semibold text-ink hover:bg-sunk focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Mở cổng tài liệu
                <Arrow />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
