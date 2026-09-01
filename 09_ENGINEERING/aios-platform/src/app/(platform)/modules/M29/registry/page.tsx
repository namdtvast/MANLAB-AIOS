import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { KICH_THUOC_TRANG, PhanTrang, boQua, chotTrang } from "@/components/PhanTrang";
import { getM29Role } from "@/lib/m29/actor";
import { can } from "@/lib/m29/model";
import {
  ACQUISITION_LABEL,
  AIA_STATUS_LABEL,
  AIA_STATUS_TONE,
  APPROVAL_STATUS_LABEL,
  APPROVAL_STATUS_TONE,
  DATA_BOUNDARY_LABEL,
  DATA_BOUNDARY_TONE,
  OP_STATUS_LABEL,
  OP_STATUS_TONE,
  PERMISSION_LEVEL_LABEL,
  REVIEW_CYCLE_LABEL,
  RISK_LEVEL_LABEL,
  RISK_LEVEL_TONE,
  SECURITY_LEVEL_LABEL,
  SYSTEM_GROUP_SHORT,
} from "@/lib/m29/labels";
import { mucBaoMatToiDa } from "@/lib/m29/copilot/muc-bao-mat";
import { ADAPTER_TYPES } from "@/lib/m29/adapters";
import { nenTangNhanDuocTacTu } from "@/lib/m29/rules";
import { AgentApprovalButton, OpStatusToggle, PlatformApprovalButton, ToolStatusToggle } from "./RegistryActions";
import { NewAgentForm } from "./NewAgentForm";
import { NewPlatformForm } from "./NewPlatformForm";
import { NewToolForm } from "./NewToolForm";
import { NewSkillForm } from "./NewSkillForm";
import { ModelPricingForm } from "./ModelPricingForm";
import { NewProviderForm } from "./NewProviderForm";
import { NewModelForm } from "./NewModelForm";
import { PlatformKeyEnvForm } from "./PlatformKeyEnvForm";
import { DataBoundaryForm } from "./DataBoundaryForm";

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

type Trang = { trang?: string; trangPv?: string; trangMd?: string; trangTl?: string; trangSk?: string; trangAg?: string };

export default async function M29RegistryPage({ searchParams }: { searchParams: Promise<Trang> }) {
  const query: Trang = await searchParams;
  const role = await getM29Role();
  const canWritePlatform = can(role, "platforms", "write");
  const canWriteRegistry = can(role, "registry", "write");
  // Nới/siết ranh giới dữ liệu là việc của quản trị an ninh AI, KHÔNG đi kèm quyền đăng ký nền
  // tảng — ETV.P29 §5.5.
  const canWriteGovernance = can(role, "governance", "write");

  const [tongPl, tongPv, tongMd, tongTl, tongSk, tongAg] = await Promise.all([
    prisma.aIPlatform.count(),
    prisma.aIProvider.count(),
    prisma.aIModel.count(),
    prisma.aITool.count(),
    prisma.aISkill.count(),
    prisma.aIAgent.count(),
  ]);
  const trangPl = chotTrang(query.trang, tongPl);
  const trangPv = chotTrang(query.trangPv, tongPv);
  const trangMd = chotTrang(query.trangMd, tongMd);
  const trangTl = chotTrang(query.trangTl, tongTl);
  const trangSk = chotTrang(query.trangSk, tongSk);
  const trangAg = chotTrang(query.trangAg, tongAg);

  const [platforms, providers, models, skills, tools, agents, dsPlatform, dsProvider, dsModel, maProvider, maSkill, maAgent] = await Promise.all([
    // Mới thao tác nhất lên đầu — xem chú thích cùng truy vấn ở trang Tổng quan M29.
    prisma.aIPlatform.findMany({ orderBy: { updatedAt: "desc" }, skip: boQua(trangPl), take: KICH_THUOC_TRANG }),
    // Mới thao tác nhất lên đầu — cùng cách xếp với bảng Platform (xem chú thích ở trang Tổng quan M29).
    prisma.aIProvider.findMany({ orderBy: { updatedAt: "desc" }, include: { platform: true }, skip: boQua(trangPv), take: KICH_THUOC_TRANG }),
    prisma.aIModel.findMany({ orderBy: { updatedAt: "desc" }, include: { provider: true }, skip: boQua(trangMd), take: KICH_THUOC_TRANG }),
    prisma.aISkill.findMany({ orderBy: { code: "asc" }, skip: boQua(trangSk), take: KICH_THUOC_TRANG }),
    prisma.aITool.findMany({ orderBy: { updatedAt: "desc" }, include: { platform: true }, skip: boQua(trangTl), take: KICH_THUOC_TRANG }),
    // Bảng danh mục hệ thống AI — phần 1 biểu mẫu ETV.P.F 29.01. Kèm AIA vì cột "Mã hồ sơ AIA" là
    // một cột của chính biểu mẫu, không phải thông tin phụ.
    prisma.aIAgent.findMany({
      orderBy: { updatedAt: "desc" },
      include: { platform: { select: { code: true } }, model: { select: { modelId: true } }, aia: { orderBy: { createdAt: "desc" }, take: 1 } },
      skip: boQua(trangAg),
      take: KICH_THUOC_TRANG,
    }),
    // Danh sách cho ô chọn và cho kiểm tra trùng mã của các biểu mẫu thêm mới: phải là TOÀN BỘ sổ,
    // không phải trang đang xem — nếu lấy theo trang thì đứng ở trang 2 sẽ không chọn được nền tảng
    // nằm ở trang 1, còn kiểm tra trùng mã thì bỏ lọt.
    prisma.aIPlatform.findMany({ orderBy: { code: "asc" }, select: { id: true, code: true, name: true, approvalStatus: true } }),
    prisma.aIProvider.findMany({ orderBy: { code: "asc" }, select: { id: true, code: true, name: true } }),
    prisma.aIModel.findMany({ orderBy: { modelId: "asc" }, where: { status: "ACTIVE" }, select: { id: true, modelId: true, provider: { select: { name: true } } } }),
    prisma.aIProvider.findMany({ orderBy: { code: "asc" }, select: { code: true } }),
    prisma.aISkill.findMany({ orderBy: { code: "asc" }, select: { code: true } }),
    prisma.aIAgent.findMany({ orderBy: { code: "asc" }, select: { code: true } }),
  ]);

  const mucLuc: [string, string, number][] = [
    ["platform", "Platform", tongPl],
    ["provider", "Provider", tongPv],
    ["model", "Model", tongMd],
    ["tool", "Tool", tongTl],
    ["skill", "Skill", tongSk],
    ["agent", "Agent", tongAg],
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-xs font-medium text-ink-3">M29 · Danh mục</p>
          <h1 className="font-head text-2xl font-bold text-ink">Platform · Provider · Model · Tool · Skill · Agent</h1>
        </div>
        <p className="max-w-3xl text-sm text-ink-2">
          Sáu sổ đăng ký, xếp theo thứ bậc chứa nhau. Đăng ký lần đầu thì đi từ trên xuống: có nền tảng mới gắn được nhà cung cấp, có nhà cung cấp mới tạo
          được mô hình, và hệ thống AI ở sổ cuối cùng thì trỏ tới tất cả những thứ trên. AI không nằm trong sáu sổ này là AI chưa đăng ký — không được dùng
          cho công việc của Viện.
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
        {canWritePlatform && <NewPlatformForm adapterTypes={ADAPTER_TYPES} existingCodes={platforms.map((p) => p.code)} />}
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
            platforms={dsPlatform.filter((p) => p.approvalStatus === "APPROVED" || p.approvalStatus === "ACTIVE").map((p) => ({ id: p.id, code: p.code, name: p.name }))}
            existingCodes={tools.map((t) => t.code)}
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

      {/* Sổ thứ 6 — DANH MỤC HỆ THỐNG AI, tức phần 1 biểu mẫu ETV.P.F 29.01. Xếp cuối vì bản ghi ở
          đây trỏ tới cả năm sổ trên: nền tảng, mô hình (qua nhà cung cấp), công cụ và kỹ năng.
          Bảng ở trang Tổng quan hiển thị cùng những tác tử này nhưng theo cột VẬN HÀNH (sức khoẻ,
          AIA quá hạn, lý do tạm dừng); bảng dưới đây theo cột của BIỂU MẪU. */}
      <Section
        n={6}
        id="agent"
        title="Agent — Hệ thống AI"
        count={tongAg}
        desc="Sổ đăng ký hệ thống AI của Viện — phần 1 biểu mẫu ETV.P.F 29.01. Bản ghi mới ra đời ở trạng thái Nháp và phải đi hết vòng soát xét — phê duyệt của ETV.P29 mục 6.1 trước khi được vận hành."
      >
        {canWriteRegistry && (
          <NewAgentForm
            platforms={dsPlatform.filter(nenTangNhanDuocTacTu).map((p) => ({ id: p.id, code: p.code, name: p.name }))}
            models={dsModel.map((m) => ({ id: m.id, modelId: m.modelId, providerName: m.provider.name }))}
            existingCodes={maAgent.map((a) => a.code)}
          />
        )}
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[76rem] text-sm">
            <thead>
              <tr>
                <th className={TH}>Mã · Nhóm</th>
                <th className={TH}>Tên · Mục đích</th>
                <th className={TH}>Nền tảng · Mô hình</th>
                <th className={TH}>Hình thức</th>
                <th className={TH}>CSH · ĐMKT</th>
                <th className={TH}>Mức tác động</th>
                <th className={TH}>DL cá nhân</th>
                <th className={TH}>Chu kỳ rà soát</th>
                <th className={TH}>Hồ sơ AIA</th>
                <th className={TH}>Trạng thái hồ sơ</th>
                <th className={TH}>Vận hành</th>
                {canWriteRegistry && <th className={TH}>Thao tác</th>}
              </tr>
            </thead>
            <tbody>
              {agents.map((a) => {
                const aia = a.aia[0];
                return (
                  <tr key={a.id} className="border-b border-border last:border-0">
                    <td className="px-3 py-2">
                      <Link href={`/modules/M29/agents/${a.id}`} className="font-mono text-xs font-medium text-accent hover:underline">
                        {a.code}
                      </Link>
                      <div className="text-xs text-ink-3">{SYSTEM_GROUP_SHORT[a.systemGroup]}</div>
                    </td>
                    <td className="px-3 py-2">
                      <div className="text-ink">{a.name}</div>
                      {/* Mục đích sử dụng là cột bắt buộc của mục 5.1.2 nên phải hiện, nhưng nó là
                          câu văn — cắt ngắn ở đây, đọc đủ ở trang chi tiết. */}
                      <div className="line-clamp-2 max-w-[22rem] text-xs text-ink-3">{a.purpose || "—"}</div>
                    </td>
                    <td className="px-3 py-2">
                      <div className="font-mono text-xs text-ink-2">{a.platform.code}</div>
                      <div className="font-mono text-xs text-ink-3">{a.model?.modelId ?? "—"}</div>
                    </td>
                    <td className="px-3 py-2 text-xs text-ink-2">{ACQUISITION_LABEL[a.acquisition]}</td>
                    <td className="px-3 py-2">
                      <div className="text-xs text-ink-2">{a.owner || "—"}</div>
                      <div className="text-xs text-ink-3">{a.technicalContact || "—"}</div>
                    </td>
                    <td className="px-3 py-2">
                      <Badge tone={RISK_LEVEL_TONE[a.riskLevel]}>{RISK_LEVEL_LABEL[a.riskLevel] ?? a.riskLevel}</Badge>
                    </td>
                    <td className="px-3 py-2">
                      {/* Có dữ liệu cá nhân là điều kiện kéo mức tác động lên Cao (mục 5.1.3), nên
                          tô cảnh báo — không phải để chê, mà để người soát xét nhìn thấy ngay. */}
                      {a.personalData ? <Badge tone="warn">Có</Badge> : <span className="text-xs text-ink-3">Không</span>}
                    </td>
                    <td className="px-3 py-2 text-xs text-ink-2">{REVIEW_CYCLE_LABEL[a.reviewCycle]}</td>
                    <td className="px-3 py-2">
                      {aia ? (
                        <>
                          <div className="font-mono text-xs text-ink-2">{aia.code}</div>
                          <Badge tone={AIA_STATUS_TONE[aia.status]}>{AIA_STATUS_LABEL[aia.status]}</Badge>
                        </>
                      ) : (
                        <span className="text-xs text-ink-3">Chưa có</span>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <Badge tone={APPROVAL_STATUS_TONE[a.approvalStatus]}>{APPROVAL_STATUS_LABEL[a.approvalStatus]}</Badge>
                    </td>
                    <td className="px-3 py-2">
                      <Badge tone={OP_STATUS_TONE[a.status]}>{OP_STATUS_LABEL[a.status]}</Badge>
                    </td>
                    {canWriteRegistry && (
                      <td className="px-3 py-2">
                        <AgentApprovalButton id={a.id} status={a.approvalStatus} quyenLanhDao={canWritePlatform} />
                      </td>
                    )}
                  </tr>
                );
              })}
              {agents.length === 0 && <EmptyRow cols={canWriteRegistry ? 12 : 11}>Chưa đăng ký hệ thống AI nào.</EmptyRow>}
            </tbody>
          </table>
          <PhanTrang path="/modules/M29/registry" query={query} neo="#agent" tenTham="trangAg" trang={trangAg} tong={tongAg} donVi="hệ thống AI" />
        </div>
      </Section>
    </div>
  );
}
