import { prisma } from "@/lib/prisma";
import { getM29Role } from "@/lib/m29/actor";
import { can } from "@/lib/m29/model";
import {
  APPROVAL_STATUS_LABEL,
  APPROVAL_STATUS_TONE,
  DATA_BOUNDARY_LABEL,
  DATA_BOUNDARY_TONE,
  OP_STATUS_LABEL,
  PERMISSION_LEVEL_LABEL,
  SECURITY_LEVEL_LABEL,
} from "@/lib/m29/labels";
import { mucBaoMatToiDa } from "@/lib/m29/copilot/muc-bao-mat";
import { ADAPTER_TYPES } from "@/lib/m29/adapters";
import { PlatformApprovalButton, ToolStatusToggle } from "./RegistryActions";
import { NewPlatformForm } from "./NewPlatformForm";
import { NewToolForm } from "./NewToolForm";
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

export default async function M29RegistryPage() {
  const role = await getM29Role();
  const canWritePlatform = can(role, "platforms", "write");
  const canWriteRegistry = can(role, "registry", "write");
  // Nới/siết ranh giới dữ liệu là việc của quản trị an ninh AI, KHÔNG đi kèm quyền đăng ký nền
  // tảng — ETV.P29 §5.5.
  const canWriteGovernance = can(role, "governance", "write");

  const [platforms, providers, models, skills, tools] = await Promise.all([
    // Mới thao tác nhất lên đầu — xem chú thích cùng truy vấn ở trang Tổng quan M29.
    prisma.aIPlatform.findMany({ orderBy: { updatedAt: "desc" } }),
    // Mới thao tác nhất lên đầu — cùng cách xếp với bảng Platform (xem chú thích ở trang Tổng quan M29).
    prisma.aIProvider.findMany({ orderBy: { updatedAt: "desc" }, include: { platform: true } }),
    prisma.aIModel.findMany({ orderBy: { updatedAt: "desc" }, include: { provider: true } }),
    prisma.aISkill.findMany({ orderBy: { code: "asc" } }),
    prisma.aITool.findMany({ orderBy: { updatedAt: "desc" }, include: { platform: true } }),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M29 · Danh mục</p>
        <h1 className="font-head text-2xl font-bold text-ink">Provider · Model · Skill · Tool · Platform</h1>
      </div>

      <section id="platform" className="scroll-mt-24">
        <h2 className="mb-2 font-head text-sm font-bold text-ink">Platform</h2>
        {canWritePlatform && <NewPlatformForm adapterTypes={ADAPTER_TYPES} existingCodes={platforms.map((p) => p.code)} />}
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[52rem] text-sm">
            <thead>
              <tr>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase text-ink-3">Mã</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase text-ink-3">Tên</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase text-ink-3">Biến khoá API</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase text-ink-3">Ranh giới dữ liệu</th>
                {/* Nút vòng đời nằm CÙNG cột với huy hiệu trạng thái, không tách cột riêng: chúng
                    nói về đúng một thứ, và bảng này đã đủ rộng. Cùng cách với cột Ranh giới. */}
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase text-ink-3">Trạng thái</th>
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
                      <span className={`inline-flex whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[DATA_BOUNDARY_TONE[p.dataBoundary]]}`}>
                        {DATA_BOUNDARY_LABEL[p.dataBoundary]}
                      </span>
                      {/* Hệ quả thực tế của ranh giới, nói thẳng: đây mới là thứ người vận hành
                          cần thấy — trần Công khai nghĩa là Copilot gần như không tra được gì. */}
                      <span className="text-xs text-ink-3">Copilot đọc tới mức {SECURITY_LEVEL_LABEL[mucBaoMatToiDa(p.dataBoundary)]}</span>
                      {p.dataBoundaryRef && <span className="text-xs text-ink-3">Hồ sơ {p.dataBoundaryRef}</span>}
                      {canWriteGovernance && <DataBoundaryForm id={p.id} hienTai={p.dataBoundary} soHoSo={p.dataBoundaryRef} />}
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex flex-col items-start gap-1">
                      <span className={`inline-flex whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[APPROVAL_STATUS_TONE[p.approvalStatus]]}`}>
                        {APPROVAL_STATUS_LABEL[p.approvalStatus]}
                      </span>
                      {canWritePlatform && <PlatformApprovalButton id={p.id} status={p.approvalStatus} />}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="tool" className="scroll-mt-24">
        <h2 className="mb-2 font-head text-sm font-bold text-ink">Tool</h2>
        {canWriteRegistry && (
          <NewToolForm
            /* ETV.P35 §6.7: công cụ chỉ được trỏ tới nền tảng Đã phê duyệt/Hiệu lực. Lọc ở đây
               cho khỏi mời gọi thao tác sai; createTool vẫn kiểm lại phía máy chủ. */
            platforms={platforms.filter((p) => p.approvalStatus === "APPROVED" || p.approvalStatus === "ACTIVE").map((p) => ({ id: p.id, code: p.code, name: p.name }))}
            existingCodes={tools.map((t) => t.code)}
          />
        )}
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[36rem] text-sm">
            <thead>
              <tr>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase text-ink-3">Tên</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase text-ink-3">Platform</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase text-ink-3">Endpoint</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase text-ink-3">Quyền</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase text-ink-3">Trạng thái</th>
                {canWriteRegistry && <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase text-ink-3">Thao tác</th>}
              </tr>
            </thead>
            <tbody>
              {tools.map((t) => (
                <tr key={t.id} className="border-b border-border last:border-0">
                  <td className="px-3 py-2 text-ink">{t.name}</td>
                  <td className="px-3 py-2 text-ink-2">{t.platform.code}</td>
                  <td className="px-3 py-2 font-mono text-xs text-ink-2">{t.endpoint}</td>
                  <td className="px-3 py-2 text-ink-2">{PERMISSION_LEVEL_LABEL[t.permissionLevel]}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${t.status === "ACTIVE" ? "bg-good-soft text-good" : "bg-crit-soft text-crit"}`}>
                      {OP_STATUS_LABEL[t.status]}
                    </span>
                  </td>
                  {canWriteRegistry && (
                    <td className="px-3 py-2">
                      <ToolStatusToggle id={t.id} status={t.status} />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <h2 className="mb-2 font-head text-sm font-bold text-ink">Provider</h2>
          {canWriteRegistry && (
            <NewProviderForm platforms={platforms.map((p) => ({ id: p.id, code: p.code, name: p.name }))} existingCodes={providers.map((p) => p.code)} />
          )}
          <ul className="flex flex-col gap-1.5 text-sm">
            {providers.map((p) => (
              <li key={p.id} className="rounded-lg border border-border bg-surface px-3 py-2 text-ink">
                {p.name} <span className="text-xs text-ink-3">({OP_STATUS_LABEL[p.status]})</span>
                {/* Nhà cung cấp tự vận hành phải gắn nền tảng — đó là nơi giữ endpoint và trạng
                    thái kiểm tra sức khoẻ. Dịch vụ ngoài Viện để trống là bình thường. */}
                <span className="text-xs text-ink-3">{p.platform ? ` · nền tảng ${p.platform.code}` : " · không gắn nền tảng"}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-2 font-head text-sm font-bold text-ink">Model và bảng giá token</h2>
          {canWriteRegistry && <NewModelForm providers={providers.map((p) => ({ id: p.id, code: p.code, name: p.name }))} />}
          <ul className="flex flex-col gap-1.5 text-sm">
            {models.map((m) => (
              <li key={m.id} className="rounded-lg border border-border bg-surface px-3 py-2 text-ink">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span>
                    {m.displayName} <span className="text-xs text-ink-3">· {m.provider.name}</span>
                    <span className="ml-1 font-mono text-xs text-ink-3">({m.modelId})</span>
                  </span>
                  <span className="text-xs tabular-nums text-ink-2">
                    Vào {m.inputCostPerMillionTokens.toLocaleString("vi-VN")} · Ra {m.outputCostPerMillionTokens.toLocaleString("vi-VN")} {m.currency}/1M token
                  </span>
                </div>
                {canWriteRegistry && (
                  <ModelPricingForm
                    model={{
                      id: m.id,
                      name: m.displayName,
                      inputRate: m.inputCostPerMillionTokens,
                      outputRate: m.outputCostPerMillionTokens,
                      currency: m.currency,
                    }}
                  />
                )}
              </li>
            ))}
            {models.length === 0 && <li className="rounded-lg border border-dashed border-border p-6 text-center text-ink-3">Chưa có Model nào để thiết lập bảng giá.</li>}
          </ul>
        </div>
        <div className="sm:col-span-2">
          <h2 className="mb-2 font-head text-sm font-bold text-ink">Skill</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s.id} className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
