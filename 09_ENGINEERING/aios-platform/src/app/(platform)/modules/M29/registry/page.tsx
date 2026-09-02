import { prisma } from "@/lib/prisma";
import { KICH_THUOC_TRANG, PhanTrang, boQua, chotTrang } from "@/components/PhanTrang";
import { trangHaiNhom } from "@/lib/phan-trang";
import type { AIApprovalStatus, AIOpStatus } from "@/generated/prisma/enums";
import { getM29Role } from "@/lib/m29/actor";
import { can } from "@/lib/m29/model";
import {
  APPROVAL_STATUS_LABEL,
  APPROVAL_STATUS_TONE,
  DATA_BOUNDARY_LABEL,
  DATA_BOUNDARY_TONE,
  OP_STATUS_LABEL,
  OP_STATUS_TONE,
  PERMISSION_LEVEL_LABEL,
  RISK_LEVEL_LABEL,
  RISK_LEVEL_TONE,
  SECURITY_LEVEL_LABEL,
} from "@/lib/m29/labels";
import { mucBaoMatToiDa } from "@/lib/m29/copilot/muc-bao-mat";
import { ADAPTER_TYPES } from "@/lib/m29/adapters";
import { OpStatusToggle, PlatformApprovalButton, ToolStatusToggle } from "./RegistryActions";
import { NewPlatformForm } from "./NewPlatformForm";
import { NewToolForm } from "./NewToolForm";
import { NewSkillForm } from "./NewSkillForm";
import { ModelPricingForm } from "./ModelPricingForm";
import { NewProviderForm } from "./NewProviderForm";
import { NewModelForm } from "./NewModelForm";
import { PlatformKeyEnvForm } from "./PlatformKeyEnvForm";
import { DataBoundaryForm } from "./DataBoundaryForm";

// Bản ghi "đang dùng được" luôn nằm trên đầu bảng, phần còn lại xuống dưới: người vận hành mở
// danh mục là để nhìn thứ đang chạy, không phải để lục qua các bản đã hết hiệu lực. Xếp theo lần
// thao tác gần nhất thì một nền tảng vừa bị lưu trữ lại đứng trên nền tảng đang chạy.
const DANG_DUNG_DUOC: AIOpStatus[] = ["ACTIVE"];

// Nền tảng không có trạng thái "Hoạt động" mà đi theo vòng đời phê duyệt: dùng được nghĩa là Đã
// phê duyệt hoặc Hiệu lực — đúng tập trạng thái mà biểu mẫu thêm Tool bên dưới đang lọc theo
// (ETV.P35 §6.7).
const NEN_TANG_DUNG_DUOC: AIApprovalStatus[] = ["APPROVED", "ACTIVE"];

const TONE_CLASS: Record<string, string> = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  crit: "bg-crit-soft text-crit",
  neutral: "bg-sunk text-ink-2",
};

// Lớp của ô tiêu đề cột, đặt một chỗ vì trang này có năm bảng — sửa rời từng bảng là cách chúng
// trôi khác nhau.
const TH = "border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase text-ink-3";

function Badge({ tone, children }: { tone: string; children: React.ReactNode }) {
  return <span className={`inline-flex whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[tone] ?? TONE_CLASS.neutral}`}>{children}</span>;
}

function EmptyRow({ cols, children }: { cols: number; children: React.ReactNode }) {
  return (
    <tr>
      <td colSpan={cols} className="px-3 py-6 text-center text-sm text-ink-3">
        {children}
      </td>
    </tr>
  );
}

// Năm sổ đăng ký xếp theo THỨ BẬC CHỨA NHAU, không theo số lượng bản ghi: Platform giữ endpoint và
// khoá; Provider gắn vào Platform; Model bắt buộc thuộc một Provider; Tool bắt buộc thuộc một
// Platform; Skill không có khoá ngoại nào nên xuống cuối. Người đăng ký lần đầu phải đi đúng mạch
// này — không có Platform thì không gắn được Provider, không có Provider thì không tạo được Model.
function Section({
  n,
  id,
  title,
  desc,
  count,
  children,
}: {
  n: number;
  id: string;
  title: string;
  desc: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <h2 className="font-head text-sm font-bold text-ink">
          <span className="text-ink-3">{n}. </span>
          {title}
        </h2>
        <span className="text-xs tabular-nums text-ink-3">{count} bản ghi</span>
        <p className="w-full text-xs text-ink-3">{desc}</p>
      </div>
      {children}
    </section>
  );
}

type Trang = { trang?: string; trangPv?: string; trangMd?: string; trangTl?: string; trangSk?: string };

export default async function M29RegistryPage({ searchParams }: { searchParams: Promise<Trang> }) {
  const query: Trang = await searchParams;
  const role = await getM29Role();
  const canWritePlatform = can(role, "platforms", "write");
  const canWriteRegistry = can(role, "registry", "write");
  // Nới/siết ranh giới dữ liệu là việc của quản trị an ninh AI, KHÔNG đi kèm quyền đăng ký nền
  // tảng — ETV.P29 §5.5.
  const canWriteGovernance = can(role, "governance", "write");

  const [tongPl, tongPv, tongMd, tongTl, tongSk, dungPl, dungPv, dungMd, dungTl, dungSk] = await Promise.all([
    prisma.aIPlatform.count(),
    prisma.aIProvider.count(),
    prisma.aIModel.count(),
    prisma.aITool.count(),
    prisma.aISkill.count(),
    // Đếm riêng nhóm đang dùng được: `trangHaiNhom` cần con số này mới tính được cửa sổ `skip/take`
    // của từng nhóm (xem chú thích hàm).
    prisma.aIPlatform.count({ where: { approvalStatus: { in: NEN_TANG_DUNG_DUOC } } }),
    prisma.aIProvider.count({ where: { status: { in: DANG_DUNG_DUOC } } }),
    prisma.aIModel.count({ where: { status: { in: DANG_DUNG_DUOC } } }),
    prisma.aITool.count({ where: { status: { in: DANG_DUNG_DUOC } } }),
    prisma.aISkill.count({ where: { status: { in: DANG_DUNG_DUOC } } }),
  ]);
  const trangPl = chotTrang(query.trang, tongPl);
  const trangPv = chotTrang(query.trangPv, tongPv);
  const trangMd = chotTrang(query.trangMd, tongMd);
  const trangTl = chotTrang(query.trangTl, tongTl);
  const trangSk = chotTrang(query.trangSk, tongSk);

  const [platforms, providers, models, skills, tools, dsPlatform, dsProvider, maProvider, maSkill, maTool] = await Promise.all([
    // Đang dùng được lên đầu bảng, trong mỗi nhóm thì mới thao tác nhất lên trước — xem chú thích
    // cùng truy vấn ở trang Tổng quan M29.
    trangHaiNhom(
      dungPl,
      (skip, take) => prisma.aIPlatform.findMany({ where: { approvalStatus: { in: NEN_TANG_DUNG_DUOC } }, orderBy: { updatedAt: "desc" }, skip, take }),
      (skip, take) => prisma.aIPlatform.findMany({ where: { approvalStatus: { notIn: NEN_TANG_DUNG_DUOC } }, orderBy: { updatedAt: "desc" }, skip, take }),
      boQua(trangPl),
      KICH_THUOC_TRANG,
    ),
    trangHaiNhom(
      dungPv,
      (skip, take) => prisma.aIProvider.findMany({ where: { status: { in: DANG_DUNG_DUOC } }, orderBy: { updatedAt: "desc" }, include: { platform: true }, skip, take }),
      (skip, take) => prisma.aIProvider.findMany({ where: { status: { notIn: DANG_DUNG_DUOC } }, orderBy: { updatedAt: "desc" }, include: { platform: true }, skip, take }),
      boQua(trangPv),
      KICH_THUOC_TRANG,
    ),
    trangHaiNhom(
      dungMd,
      (skip, take) => prisma.aIModel.findMany({ where: { status: { in: DANG_DUNG_DUOC } }, orderBy: { updatedAt: "desc" }, include: { provider: true }, skip, take }),
      (skip, take) => prisma.aIModel.findMany({ where: { status: { notIn: DANG_DUNG_DUOC } }, orderBy: { updatedAt: "desc" }, include: { provider: true }, skip, take }),
      boQua(trangMd),
      KICH_THUOC_TRANG,
    ),
    // Kỹ năng xếp theo mã chứ không theo lần thao tác — mã là thứ người ta tra.
    trangHaiNhom(
      dungSk,
      (skip, take) => prisma.aISkill.findMany({ where: { status: { in: DANG_DUNG_DUOC } }, orderBy: { code: "asc" }, skip, take }),
      (skip, take) => prisma.aISkill.findMany({ where: { status: { notIn: DANG_DUNG_DUOC } }, orderBy: { code: "asc" }, skip, take }),
      boQua(trangSk),
      KICH_THUOC_TRANG,
    ),
    trangHaiNhom(
      dungTl,
      (skip, take) => prisma.aITool.findMany({ where: { status: { in: DANG_DUNG_DUOC } }, orderBy: { updatedAt: "desc" }, include: { platform: true }, skip, take }),
      (skip, take) => prisma.aITool.findMany({ where: { status: { notIn: DANG_DUNG_DUOC } }, orderBy: { updatedAt: "desc" }, include: { platform: true }, skip, take }),
      boQua(trangTl),
      KICH_THUOC_TRANG,
    ),
    // Danh sách cho ô chọn và cho kiểm tra trùng mã của các biểu mẫu thêm mới: phải là TOÀN BỘ sổ,
    // không phải trang đang xem — nếu lấy theo trang thì đứng ở trang 2 sẽ không chọn được nền tảng
    // nằm ở trang 1, còn kiểm tra trùng mã thì bỏ lọt.
    prisma.aIPlatform.findMany({ orderBy: { code: "asc" }, select: { id: true, code: true, name: true, approvalStatus: true } }),
    prisma.aIProvider.findMany({ orderBy: { code: "asc" }, select: { id: true, code: true, name: true } }),
    prisma.aIProvider.findMany({ orderBy: { code: "asc" }, select: { code: true } }),
    prisma.aISkill.findMany({ orderBy: { code: "asc" }, select: { code: true } }),
    prisma.aITool.findMany({ orderBy: { code: "asc" }, select: { code: true } }),
  ]);

  const mucLuc: [string, string, number][] = [
    ["platform", "Platform", tongPl],
    ["provider", "Provider", tongPv],
    ["model", "Model", tongMd],
    ["tool", "Tool", tongTl],
    ["skill", "Skill", tongSk],
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-xs font-medium text-ink-3">M29 · Danh mục</p>
          <h1 className="font-head text-2xl font-bold text-ink">Platform · Provider · Model · Tool · Skill</h1>
        </div>
        <p className="max-w-3xl text-sm text-ink-2">
          Năm sổ đăng ký, xếp từ lớn đến nhỏ theo thứ bậc chứa nhau. Đăng ký lần đầu thì đi từ trên xuống: có nền tảng mới gắn được nhà cung cấp, có nhà
          cung cấp mới tạo được mô hình. AI không nằm trong năm sổ này là AI chưa đăng ký — không được dùng cho công việc của Viện.
        </p>
        <nav className="flex flex-wrap gap-1.5">
          {mucLuc.map(([id, ten, so], i) => (
            <a
              key={id}
              href={`#${id}`}
              className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-ink-2 transition-colors hover:border-accent-line hover:text-ink"
            >
              <span className="text-ink-3">{i + 1}. </span>
              {ten} <span className="tabular-nums text-ink-3">({so})</span>
            </a>
          ))}
        </nav>
      </div>

      <Section
        n={1}
        id="platform"
        title="Platform — Nền tảng"
        count={tongPl}
        desc="Nơi duy nhất giữ địa chỉ API, tên biến chứa khoá, ranh giới dữ liệu và trạng thái sức khoẻ. Mọi sổ bên dưới đều quy về đây."
      >
        {canWritePlatform && <NewPlatformForm adapterTypes={ADAPTER_TYPES} existingCodes={dsPlatform.map((p) => p.code)} />}
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[52rem] text-sm">
            <thead>
              <tr>
                <th className={TH}>Mã</th>
                <th className={TH}>Tên</th>
                <th className={TH}>Biến khoá API</th>
                <th className={TH}>Ranh giới dữ liệu</th>
                {/* Nút vòng đời nằm CÙNG cột với huy hiệu trạng thái, không tách cột riêng: chúng
                    nói về đúng một thứ, và bảng này đã đủ rộng. Cùng cách với cột Ranh giới. */}
                <th className={TH}>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {platforms.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0">
                  {/* Adapter đi kèm mã thay vì chiếm một cột riêng: bảng này đã có 6 cột, mà tên
                      bộ chuyển đổi là thông tin tra cứu chứ không phải thứ người ta quét mắt theo
                      hàng. Bớt một cột giữ được bề ngang bằng các trang module khác. */}
                  <td className="px-3 py-2">
                    <div className="font-mono text-xs text-ink">{p.code}</div>
                    <div className="font-mono text-xs text-ink-3">{p.adapterType}</div>
                  </td>
                  <td className="px-3 py-2 text-ink">{p.name}</td>
                  {/* Chỉ bộ chuyển đổi mô hình cục bộ mới đọc biến theo từng nền tảng; Anthropic
                      và Gemini có biến cố định riêng của SDK/nhà cung cấp nên không có gì để chọn. */}
                  <td className="px-3 py-2 text-ink-2">
                    {p.adapterType !== "LocalOpenAIPlatformAdapter" ? (
                      <span className="text-xs text-ink-3">—</span>
                    ) : canWritePlatform ? (
                      <PlatformKeyEnvForm id={p.id} apiKeyEnv={p.apiKeyEnv} />
                    ) : (
                      <span className="font-mono text-xs">{p.apiKeyEnv ?? "LOCAL_LLM_API_KEY"}</span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex flex-col items-start gap-1">
                      <Badge tone={DATA_BOUNDARY_TONE[p.dataBoundary]}>{DATA_BOUNDARY_LABEL[p.dataBoundary]}</Badge>
                      {/* Hệ quả thực tế của ranh giới, nói thẳng: đây mới là thứ người vận hành
                          cần thấy — trần Công khai nghĩa là Copilot gần như không tra được gì. */}
                      <span className="text-xs text-ink-3">Copilot đọc tới mức {SECURITY_LEVEL_LABEL[mucBaoMatToiDa(p.dataBoundary)]}</span>
                      {p.dataBoundaryRef && <span className="text-xs text-ink-3">Hồ sơ {p.dataBoundaryRef}</span>}
                      {canWriteGovernance && <DataBoundaryForm id={p.id} hienTai={p.dataBoundary} soHoSo={p.dataBoundaryRef} />}
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex flex-col items-start gap-1">
                      <Badge tone={APPROVAL_STATUS_TONE[p.approvalStatus]}>{APPROVAL_STATUS_LABEL[p.approvalStatus]}</Badge>
                      {canWritePlatform && <PlatformApprovalButton id={p.id} status={p.approvalStatus} />}
                    </div>
                  </td>
                </tr>
              ))}
              {platforms.length === 0 && <EmptyRow cols={5}>Chưa đăng ký nền tảng nào. Đây là bước đầu tiên — các sổ bên dưới đều cần một nền tảng.</EmptyRow>}
            </tbody>
          </table>
          <PhanTrang path="/modules/M29/registry" query={query} neo="#platform" trang={trangPl} tong={tongPl} donVi="nền tảng" />
        </div>
      </Section>

      <Section
        n={2}
        id="provider"
        title="Provider — Nhà cung cấp mô hình"
        count={tongPv}
        desc="Đơn vị cung cấp mô hình. Nhà cung cấp tự vận hành phải gắn một nền tảng; dịch vụ ngoài Viện để trống là bình thường."
      >
        {canWriteRegistry && (
          <NewProviderForm platforms={dsPlatform.map((p) => ({ id: p.id, code: p.code, name: p.name }))} existingCodes={maProvider.map((p) => p.code)} />
        )}
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[46rem] text-sm">
            <thead>
              <tr>
                <th className={TH}>Mã</th>
                <th className={TH}>Tên</th>
                <th className={TH}>Nền tảng phơi API</th>
                <th className={TH}>Trạng thái</th>
                {canWriteRegistry && <th className={TH}>Thao tác</th>}
              </tr>
            </thead>
            <tbody>
              {providers.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0">
                  <td className="px-3 py-2 font-mono text-xs text-ink">{p.code}</td>
                  <td className="px-3 py-2 text-ink">{p.name}</td>
                  {/* Nhà cung cấp tự vận hành phải gắn nền tảng — đó là nơi giữ endpoint và trạng
                      thái kiểm tra sức khoẻ. Dịch vụ ngoài Viện để trống là bình thường. */}
                  <td className="px-3 py-2 text-ink-2">
                    {p.platform ? <span className="font-mono text-xs">{p.platform.code}</span> : <span className="text-xs text-ink-3">Không gắn — dịch vụ ngoài Viện</span>}
                  </td>
                  <td className="px-3 py-2">
                    <Badge tone={OP_STATUS_TONE[p.status]}>{OP_STATUS_LABEL[p.status]}</Badge>
                  </td>
                  {canWriteRegistry && (
                    <td className="px-3 py-2">
                      <OpStatusToggle kind="provider" id={p.id} status={p.status} />
                    </td>
                  )}
                </tr>
              ))}
              {providers.length === 0 && <EmptyRow cols={canWriteRegistry ? 5 : 4}>Chưa có nhà cung cấp nào.</EmptyRow>}
            </tbody>
          </table>
          <PhanTrang path="/modules/M29/registry" query={query} neo="#provider" tenTham="trangPv" trang={trangPv} tong={tongPv} donVi="nhà cung cấp" />
        </div>
      </Section>

      <Section
        n={3}
        id="model"
        title="Model — Mô hình và bảng giá token"
        count={tongMd}
        desc="Mô hình cụ thể của một nhà cung cấp. Mã model phải trùng đúng tên máy chủ phơi ra; đơn giá dùng để quy đổi chi phí mỗi lượt gọi."
      >
        {canWriteRegistry && <NewModelForm providers={dsProvider} />}
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[60rem] text-sm">
            <thead>
              <tr>
                <th className={TH}>Mã model</th>
                <th className={TH}>Tên hiển thị</th>
                <th className={TH}>Nhà cung cấp</th>
                <th className={TH}>Giá / 1 triệu token</th>
                {canWriteRegistry && <th className={TH}>Bảng giá</th>}
                <th className={TH}>Trạng thái</th>
                {canWriteRegistry && <th className={TH}>Thao tác</th>}
              </tr>
            </thead>
            <tbody>
              {models.map((m) => (
                <tr key={m.id} className="border-b border-border last:border-0">
                  <td className="px-3 py-2 font-mono text-xs text-ink">{m.modelId}</td>
                  <td className="px-3 py-2 text-ink">{m.displayName}</td>
                  <td className="px-3 py-2 text-ink-2">{m.provider.name}</td>
                  <td className="px-3 py-2 text-xs tabular-nums text-ink-2">
                    Vào {m.inputCostPerMillionTokens.toLocaleString("vi-VN")} · Ra {m.outputCostPerMillionTokens.toLocaleString("vi-VN")} {m.currency}
                  </td>
                  {canWriteRegistry && (
                    <td className="px-3 py-2">
                      <ModelPricingForm
                        model={{
                          id: m.id,
                          name: m.displayName,
                          inputRate: m.inputCostPerMillionTokens,
                          outputRate: m.outputCostPerMillionTokens,
                          currency: m.currency,
                        }}
                      />
                    </td>
                  )}
                  <td className="px-3 py-2">
                    <Badge tone={OP_STATUS_TONE[m.status]}>{OP_STATUS_LABEL[m.status]}</Badge>
                  </td>
                  {canWriteRegistry && (
                    <td className="px-3 py-2">
                      <OpStatusToggle kind="model" id={m.id} status={m.status} />
                    </td>
                  )}
                </tr>
              ))}
              {models.length === 0 && <EmptyRow cols={canWriteRegistry ? 7 : 5}>Chưa có Model nào để thiết lập bảng giá.</EmptyRow>}
            </tbody>
          </table>
          <PhanTrang path="/modules/M29/registry" query={query} neo="#model" tenTham="trangMd" trang={trangMd} tong={tongMd} donVi="model" />
        </div>
      </Section>

      <Section
        n={4}
        id="tool"
        title="Tool — Công cụ tác tử được gọi"
        count={tongTl}
        desc="Một endpoint mà tác tử được phép gọi, luôn thuộc một nền tảng. Đăng ký xong vẫn chưa gọi được: còn phải nằm trong whitelist của từng tác tử."
      >
        {canWriteRegistry && (
          <NewToolForm
            /* ETV.P35 §6.7: công cụ chỉ được trỏ tới nền tảng Đã phê duyệt/Hiệu lực. Lọc ở đây
               cho khỏi mời gọi thao tác sai; createTool vẫn kiểm lại phía máy chủ. */
            platforms={dsPlatform.filter((p) => NEN_TANG_DUNG_DUOC.includes(p.approvalStatus)).map((p) => ({ id: p.id, code: p.code, name: p.name }))}
            existingCodes={maTool.map((t) => t.code)}
          />
        )}
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[36rem] text-sm">
            <thead>
              <tr>
                <th className={TH}>Tên</th>
                <th className={TH}>Platform</th>
                <th className={TH}>Endpoint</th>
                <th className={TH}>Quyền</th>
                <th className={TH}>Trạng thái</th>
                {canWriteRegistry && <th className={TH}>Thao tác</th>}
              </tr>
            </thead>
            <tbody>
              {tools.map((t) => (
                <tr key={t.id} className="border-b border-border last:border-0">
                  <td className="px-3 py-2 text-ink">{t.name}</td>
                  <td className="px-3 py-2 font-mono text-xs text-ink-2">{t.platform.code}</td>
                  <td className="px-3 py-2 font-mono text-xs text-ink-2">{t.endpoint}</td>
                  <td className="px-3 py-2 text-ink-2">{PERMISSION_LEVEL_LABEL[t.permissionLevel]}</td>
                  <td className="px-3 py-2">
                    <Badge tone={t.status === "ACTIVE" ? "good" : "crit"}>{OP_STATUS_LABEL[t.status]}</Badge>
                  </td>
                  {canWriteRegistry && (
                    <td className="px-3 py-2">
                      <ToolStatusToggle id={t.id} status={t.status} />
                    </td>
                  )}
                </tr>
              ))}
              {tools.length === 0 && <EmptyRow cols={canWriteRegistry ? 6 : 5}>Chưa đăng ký công cụ nào.</EmptyRow>}
            </tbody>
          </table>
          <PhanTrang path="/modules/M29/registry" query={query} neo="#tool" tenTham="trangTl" trang={trangTl} tong={tongTl} donVi="công cụ" />
        </div>
      </Section>

      <Section
        n={5}
        id="skill"
        title="Skill — Kỹ năng"
        count={tongSk}
        desc="Nhãn mô tả việc tác tử làm được. Kỹ năng KHÔNG cấp quyền hành động — thứ giới hạn tác tử là whitelist công cụ (ETV.P29 mục 1.3 nguyên tắc 3)."
      >
        {canWriteRegistry && (
          <NewSkillForm platforms={dsPlatform.map((p) => ({ id: p.id, code: p.code, name: p.name }))} existingCodes={maSkill.map((s) => s.code)} />
        )}
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[50rem] text-sm">
            <thead>
              <tr>
                <th className={TH}>Mã</th>
                <th className={TH}>Tên</th>
                <th className={TH}>Phạm vi nền tảng</th>
                <th className={TH}>Mức rủi ro</th>
                <th className={TH}>Phiên bản</th>
                <th className={TH}>Trạng thái</th>
                {canWriteRegistry && <th className={TH}>Thao tác</th>}
              </tr>
            </thead>
            <tbody>
              {skills.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0">
                  <td className="px-3 py-2 font-mono text-xs text-ink">{s.code}</td>
                  <td className="px-3 py-2 text-ink">{s.name}</td>
                  <td className="px-3 py-2 text-ink-2">
                    {s.platformScope ? <span className="font-mono text-xs">{s.platformScope}</span> : <span className="text-xs text-ink-3">Dùng chung</span>}
                  </td>
                  <td className="px-3 py-2">
                    <Badge tone={RISK_LEVEL_TONE[s.riskLevel]}>{RISK_LEVEL_LABEL[s.riskLevel] ?? s.riskLevel}</Badge>
                  </td>
                  <td className="px-3 py-2 tabular-nums text-ink-2">v{s.version}</td>
                  <td className="px-3 py-2">
                    <Badge tone={OP_STATUS_TONE[s.status]}>{OP_STATUS_LABEL[s.status]}</Badge>
                  </td>
                  {canWriteRegistry && (
                    <td className="px-3 py-2">
                      <OpStatusToggle kind="skill" id={s.id} status={s.status} />
                    </td>
                  )}
                </tr>
              ))}
              {skills.length === 0 && <EmptyRow cols={canWriteRegistry ? 7 : 6}>Chưa đăng ký kỹ năng nào.</EmptyRow>}
            </tbody>
          </table>
          <PhanTrang path="/modules/M29/registry" query={query} neo="#skill" tenTham="trangSk" trang={trangSk} tong={tongSk} donVi="kỹ năng" />
        </div>
      </Section>
    </div>
  );
}
