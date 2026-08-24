import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MENU_GROUPS, DEFAULT_MENU_GROUP } from "@/lib/menu";

// Trang chủ CÔNG KHAI — người đọc chưa đăng nhập và có thể chưa biết ETV là gì.
// Không đặt liên kết vào /modules/* ở đây: những đường dẫn đó bị middleware chặn,
// bấm vào chỉ rơi về màn hình đăng nhập.

const DOCS_PORTAL =
  process.env.NEXT_PUBLIC_DOCS_PORTAL_URL ?? "https://namdtvast.github.io/MANLAB-AIOS/";

function Arrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 shrink-0"
    >
      <path d="M8 5.5 13.5 10 8 14.5" />
    </svg>
  );
}

function SectionHead({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <div>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-accent">{eyebrow}</p>
      <h2 className="font-head text-xl font-bold text-ink">{title}</h2>
      {lead && <p className="mt-1.5 max-w-3xl text-[15px] leading-relaxed text-ink-2">{lead}</p>}
    </div>
  );
}

const FEATURES = [
  {
    title: "Căn cứ pháp lý hiện ngay trên màn hình làm việc",
    body: "Mỗi trang module mở ra là thấy thủ tục viện dẫn, lần ban hành, ngày hiệu lực, chủ sở hữu quy trình, điều khoản ISO và biểu mẫu áp dụng — bấm mở được file gốc.",
  },
  {
    title: "Chốt chặn nghiệp vụ thực thi ở máy chủ",
    body: "Không tự thẩm xét hồ sơ của chính mình, không phê duyệt khi chưa đủ điều kiện, không sửa dữ liệu sau khi đã ký số. Ẩn nút chỉ là lớp ngoài — máy chủ mới là nơi chặn thật.",
  },
  {
    title: "Trạng thái hồ sơ đi đúng thủ tục đã ban hành",
    body: "Vòng đời Nháp → Trình → Soát xét → Phê duyệt → Công bố được mã hóa theo đúng thủ tục ETV.Pxx, thay vì tùy nghi theo thói quen từng người.",
  },
  {
    title: "Vai trò theo từng module, không dùng chung một quyền",
    body: "Một người có thể là nhân viên thực hiện ở module này và lãnh đạo phòng ở module khác. Quyền gán theo từng module đúng vốn từ vai trò của thủ tục đó.",
  },
  {
    title: "Vết kiểm tra sinh ra khi làm, không phải khi bị hỏi",
    body: "Mỗi lần chuyển trạng thái đều ghi ai làm, lúc nào, lý do gì. Đến kỳ đánh giá là có sẵn bằng chứng, không phải dựng lại hồ sơ.",
  },
  {
    title: "AI có kiểm soát theo ISO/IEC 42001",
    body: "Agent phải qua đánh giá tác động và cổng công cụ mới được chạy. AI không bao giờ tự ra kết luận đo lường cuối cùng hay tự phê duyệt chứng chỉ.",
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
    body: "Nơi làm việc hằng ngày: lập hồ sơ, ghi nhận kết quả, trình duyệt — theo đúng biểu mẫu đã ban hành.",
  },
  {
    role: "Quản trị hệ thống",
    body: "Quản lý tài khoản, gán vai trò theo module, vận hành hạ tầng và kiểm soát AI.",
  },
  {
    role: "Đoàn đánh giá · Bên quan tâm",
    body: "Truy vết từ điều khoản tiêu chuẩn tới thủ tục, tới hồ sơ thật và bằng chứng — theo quyền được cấp.",
  },
];

const CONTRIBUTIONS = [
  "Thủ tục đã ban hành được thực thi thật, không dừng ở tệp văn bản nằm trong thư mục.",
  "Một nguồn sự thật cho biểu mẫu, chuẩn mực và dữ liệu — hết cảnh mỗi phòng giữ một bản khác nhau.",
  "Bằng chứng tuân thủ ISO 9001 / 17025 / 17034 / 27001 / 42001 sinh ra trong lúc làm việc.",
  "Chuỗi truy vết xuyên suốt: năng lực → thủ tục → module → hồ sơ → bằng chứng.",
  "Việc đến hạn và hồ sơ tồn đọng lộ ra sớm, thay vì phát hiện khi đã trễ.",
];

const WITHOUT = [
  "Hồ sơ nằm rải trên Word, Excel, email và ổ chia sẻ — không ai chắc bản nào là bản cuối.",
  "Thủ tục ban hành xong vẫn bị làm tắt, vì không có gì chặn quy trình sai.",
  "Đến kỳ đánh giá phải dựng lại bằng chứng bằng tay, tốn tuần lễ và vẫn có lỗ hổng.",
  "Không truy được ai duyệt, lúc nào, dựa trên căn cứ nào khi có khiếu nại.",
  "Tri thức vận hành nằm trong đầu vài người; người nghỉ là quy trình đứt.",
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

  const kpis = [
    { label: "Module trong kiến trúc", value: total, tone: "ink" as const },
    { label: "Đã vận hành trên nền tảng", value: activeCount, tone: "good" as const },
    { label: "Có thủ tục đã ban hành", value: issued, tone: "ink" as const },
    { label: "Nhóm nghiệp vụ", value: MENU_GROUPS.length, tone: "ink" as const },
  ];

  const groups = MENU_GROUPS.map((g) => ({
    ...g,
    count: modules.filter((m) => (m.menuGroup ?? DEFAULT_MENU_GROUP) === g.code).length,
  })).filter((g) => g.count > 0);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-10 sm:px-6 sm:py-14">
      {/* 1. Mục đích — trang này là gì, dùng để làm gì */}
      <section className="rounded-2xl border border-border bg-surface p-6 sm:p-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent">
          MANLAB-AIOS · Hệ điều hành doanh nghiệp của Viện ETV
        </p>
        <h1 className="max-w-3xl font-head text-3xl font-bold leading-snug text-ink sm:text-4xl">
          Nơi thủ tục của Viện được đem ra chạy, không phải nơi cất giữ tài liệu
        </h1>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-ink-2 sm:text-base">
          Viện Kiểm định Công nghệ và Môi trường vận hành theo ISO 9001, ISO/IEC 17025, ISO 17034,
          ISO/IEC 27001 và ISO/IEC 42001. MANLAB-AIOS đưa {total} thủ tục trong hệ thống quản lý đó
          thành {total} module số hóa dùng chung một cơ sở dữ liệu, một cách đăng nhập và một bộ
          quy tắc. Mỗi màn hình gắn thẳng với một thủ tục đã ban hành — làm việc trên đây tức là
          làm đúng thủ tục, và bằng chứng tuân thủ sinh ra ngay trong lúc làm.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {signedIn ? (
            <Link
              href="/dashboard"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-accent px-5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90"
            >
              Vào hệ thống
              <Arrow />
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-accent px-5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90"
              >
                Đăng nhập
                <Arrow />
              </Link>
              <Link
                href="/dang-ky"
                className="inline-flex min-h-11 items-center rounded-lg border border-border-strong px-5 text-sm font-semibold text-ink transition-colors hover:bg-sunk"
              >
                Đăng ký — gửi yêu cầu cấp tài khoản
              </Link>
            </>
          )}
        </div>
        {!signedIn && (
          <p className="mt-3 text-sm text-ink-3">
            Tài khoản do Quản trị hệ thống cấp theo phân công công việc, không mở tự do.
          </p>
        )}
      </section>

      {/* 2. Số liệu thật từ bảng đăng ký module */}
      <section aria-label="Quy mô nền tảng" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
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

      {/* 3. Khác gì những nơi khác */}
      <section className="flex flex-col gap-5">
        <SectionHead
          eyebrow="Khác biệt"
          title="Khác gì cổng tài liệu và ổ chia sẻ?"
          lead="Ba nơi cùng nói về một hệ thống quản lý, nhưng giữ ba vai khác nhau. Đừng dùng nhầm vai."
        />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-surface p-5">
            <p className="font-head text-sm font-bold text-ink">Cổng tài liệu</p>
            <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-ink-3">Để đọc</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">
              Duyệt toàn bộ 12 tầng kiến trúc và mở văn bản gốc: thủ tục, biểu mẫu, tiêu chuẩn.
              Chỉ đọc, không tạo ra hồ sơ nào.
            </p>
            <a
              href={DOCS_PORTAL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
            >
              Mở cổng tài liệu
              <Arrow />
            </a>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <p className="font-head text-sm font-bold text-ink">Ổ chia sẻ · Word · Excel</p>
            <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-ink-3">Để lưu</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">
              Giữ được tệp nhưng không giữ được quy tắc: không chặn được quy trình sai, không biết
              bản nào là bản cuối, không nói được ai duyệt lúc nào.
            </p>
          </div>
          <div className="rounded-xl border border-accent-line bg-accent-soft p-5">
            <p className="font-head text-sm font-bold text-accent">Nền tảng này</p>
            <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-accent">
              Để làm và để chứng minh
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">
              Hồ sơ thật chạy trong cơ sở dữ liệu thật, đi đúng vòng đời của thủ tục, có vai trò,
              có chốt chặn và có vết kiểm tra kèm theo.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Tính năng nổi bật */}
      <section className="flex flex-col gap-5">
        <SectionHead
          eyebrow="Tính năng"
          title="Làm được ở đây, khó làm được ở nơi khác"
          lead="Sáu điểm dưới đây là lý do một phần mềm quản lý thông thường không thay thế được nền tảng này trong môi trường kiểm định — hiệu chuẩn — thử nghiệm."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-xl border border-border bg-surface p-5">
              <p className="font-head text-sm font-bold text-ink">{f.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Đối tượng tham gia */}
      <section className="flex flex-col gap-5">
        <SectionHead
          eyebrow="Đối tượng"
          title="Ai làm việc trên nền tảng này?"
          lead="Cùng một hồ sơ đi qua nhiều vai. Mỗi vai chỉ thấy và chỉ làm được phần việc của mình, do quyền gán theo từng module."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {AUDIENCE.map((a) => (
            <div key={a.role} className="rounded-xl border border-border bg-surface p-5">
              <p className="font-head text-sm font-bold text-ink">{a.role}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{a.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Đóng góp gì — và nếu không có thì sao */}
      <section className="flex flex-col gap-5">
        <SectionHead eyebrow="Giá trị" title="Nền tảng đóng góp gì — và thiếu nó thì sao?" />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-good/30 bg-good-soft p-5">
            <p className="font-head text-sm font-bold text-good">Có nền tảng này</p>
            <ul className="mt-3 flex flex-col gap-2.5">
              {CONTRIBUTIONS.map((c) => (
                <li key={c} className="flex gap-2.5 text-sm leading-relaxed text-ink-2">
                  <svg
                    aria-hidden
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 h-4 w-4 shrink-0 text-good"
                  >
                    <path d="m4.5 10.5 3.5 3.5 7.5-8" />
                  </svg>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-crit/30 bg-crit-soft p-5">
            <p className="font-head text-sm font-bold text-crit">Nếu không có</p>
            <ul className="mt-3 flex flex-col gap-2.5">
              {WITHOUT.map((w) => (
                <li key={w} className="flex gap-2.5 text-sm leading-relaxed text-ink-2">
                  <svg
                    aria-hidden
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 h-4 w-4 shrink-0 text-crit"
                  >
                    <path d="M6 6l8 8M14 6l-8 8" />
                  </svg>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Phạm vi nghiệp vụ — không liên kết vì các trang đó đòi đăng nhập */}
      <section className="flex flex-col gap-5">
        <SectionHead
          eyebrow="Phạm vi"
          title="Bảy nhóm nghiệp vụ"
          lead="Nội dung chi tiết của từng module chỉ mở cho người đã được cấp tài khoản."
        />
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {groups.map((g) => (
            <li
              key={g.code}
              className="flex items-baseline justify-between gap-2 rounded-xl border border-border bg-surface px-4 py-3"
            >
              <span className="font-head text-sm font-bold text-ink">{g.label}</span>
              <span className="shrink-0 font-mono text-xs text-ink-3">
                {g.count} <span className="sr-only">module</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* 8. Nói thẳng tình trạng thật */}
      <section className="rounded-xl border border-border bg-sunk p-5 text-sm text-ink-2">
        <p className="font-head font-bold text-ink">Tình trạng hiện tại</p>
        <p className="mt-1.5 max-w-3xl leading-relaxed">
          Nền tảng đang xây theo từng bước. {activeCount}/{total} module đã chạy thật, và trong số
          đó nhiều module mới đạt phần lõi của đặc tả chứ chưa đủ toàn bộ phạm vi. Trang module
          luôn nói rõ phần nào đã có, phần nào chưa — không quy tròn &ldquo;đã dựng&rdquo; thành
          &ldquo;đã hoàn thiện&rdquo;.
        </p>
      </section>

      {/* 9. Lối vào cuối trang */}
      {!signedIn && (
        <section className="flex flex-col items-start gap-4 rounded-2xl border border-accent-line bg-accent-soft p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="font-head text-lg font-bold text-ink">Cần truy cập hệ thống?</p>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-2">
              Đã được cấp tài khoản thì đăng nhập. Chưa có thì gửi yêu cầu — Quản trị hệ thống xét
              theo phân công công việc, không cấp tự động.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href="/login"
              className="inline-flex min-h-11 items-center rounded-lg bg-accent px-5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90"
            >
              Đăng nhập
            </Link>
            <Link
              href="/dang-ky"
              className="inline-flex min-h-11 items-center rounded-lg border border-border-strong bg-surface px-5 text-sm font-semibold text-ink transition-colors hover:bg-sunk"
            >
              Đăng ký
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
