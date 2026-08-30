import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getM29Role } from "@/lib/m29/actor";
import { can } from "@/lib/m29/model";
import { EVALUATION_RUN_STATUS_LABEL, M29_ROLE_LABEL, OP_STATUS_LABEL, PERMISSION_LEVEL_LABEL } from "@/lib/m29/labels";
import { AiaPanel } from "./AiaPanel";
import { EvaluationPanel } from "./EvaluationPanel";
import { PromptPanel } from "./PromptPanel";
import { ToolGatewayPanel } from "./ToolGatewayPanel";
import { ModelPanel, type ModelChoice } from "./ModelPanel";
import { SkillPicker, ToolPicker } from "./SkillToolPanel";

export default async function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [agent, role] = await Promise.all([
    prisma.aIAgent.findUnique({
      where: { id },
      // Lấy 5 lượt đánh giá gần nhất, không phải 1: người ký cần thấy lượt trước đó để biết mình
      // đang kết luận cho lần chạy nào — cổng triển khai chỉ đọc lượt đầu danh sách.
      include: { platform: true, model: true, aia: true, evaluationSuites: { include: { runs: { orderBy: { createdAt: "desc" }, take: 5 } } } },
    }),
    getM29Role(),
  ]);
  if (!agent) notFound();

  const canWriteRegistry = can(role, "registry", "write");
  const [skills, tools, guardrails, promptVersions] = await Promise.all([
    prisma.aISkill.findMany({ where: { id: { in: agent.skillIds } } }),
    prisma.aITool.findMany({ where: { id: { in: agent.toolIds } } }),
    prisma.aIGuardrail.findMany({ where: { OR: [{ scope: "SYSTEM" }, { scopeRef: agent.id }] } }),
    prisma.aIPromptVersion.findMany({ where: { prompt: { agentId: agent.id } }, orderBy: { createdAt: "desc" } }),
  ]);
  // Model dùng được cho tác tử: đang Hoạt động, và nhà cung cấp của nó gắn với một nền tảng đã
  // phê duyệt hoặc đang vận hành. Lọc ở đây cho khỏi mời gọi thao tác sai; doiMoHinhTacTu() kiểm
  // lại đủ các điều kiện này ở phía máy chủ.
  const modelChoices: ModelChoice[] = (
    await prisma.aIModel.findMany({
      where: {
        status: "ACTIVE",
        provider: { platform: { approvalStatus: { in: ["APPROVED", "ACTIVE"] } } },
      },
      include: { provider: { include: { platform: true } } },
      orderBy: { modelId: "asc" },
    })
  ).flatMap((m) =>
    m.provider.platform
      ? [
          {
            id: m.id,
            modelId: m.modelId,
            displayName: m.displayName,
            platformId: m.provider.platform.id,
            platformCode: m.provider.platform.code,
            platformName: m.provider.platform.name,
          },
        ]
      : []
  );

  // Danh mục đầy đủ chỉ nạp cho người có quyền sửa — vai trò chỉ xem không cần biết trong danh
  // mục còn công cụ nào khác.
  const [moiSkill, moiTool] = canWriteRegistry
    ? await Promise.all([
        prisma.aISkill.findMany({ orderBy: { code: "asc" }, select: { id: true, code: true, name: true } }),
        prisma.aITool.findMany({ orderBy: { code: "asc" }, include: { platform: { select: { code: true } } } }),
      ])
    : [[], []];

  const aia = agent.aia[0] ?? null;
  // Trộn run của MỌI bộ rồi sắp lại theo thời gian — deploymentGate() cũng xét chung như vậy, nên
  // "lượt gần nhất" trên màn hình phải đúng là lượt cổng sẽ đọc, không phải lượt gần nhất của bộ
  // đầu tiên.
  const runs = agent.evaluationSuites
    .flatMap((s) => s.runs.map((r) => ({ ...r, suiteName: s.name })))
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  const lastRun = runs[0] ?? null;

  return (
    <div className="grid max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="col-span-2 flex flex-col gap-4">
        <div>
          <p className="font-mono text-xs text-ink-3">
            {agent.code} · {agent.platform.name}
          </p>
          <h1 className="font-head text-2xl font-bold text-ink">{agent.name}</h1>
          <p className="mt-1 text-sm text-ink-2">{agent.purpose}</p>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 rounded-xl border border-border bg-surface p-4 text-sm">
          <dt className="text-ink-3">Model</dt>
          <dd className="text-ink">{agent.model ? `${agent.model.displayName} (${agent.model.modelId})` : "—"}</dd>
          <dt className="text-ink-3">Trạng thái vận hành</dt>
          <dd className="text-ink">{OP_STATUS_LABEL[agent.status]}</dd>
          <dt className="text-ink-3">Chủ sở hữu</dt>
          <dd className="text-ink">{agent.owner || "—"}</dd>
          <dt className="text-ink-3">Mức rủi ro</dt>
          <dd className="text-ink">{agent.riskLevel}</dd>
          <dt className="text-ink-3">Evaluation gần nhất</dt>
          <dd className="text-ink">
            {lastRun ? `${EVALUATION_RUN_STATUS_LABEL[lastRun.status] ?? lastRun.status} (${lastRun.passCount} đạt / ${lastRun.failCount} lỗi)` : "chưa chạy"}
          </dd>
        </dl>

        <ModelPanel
          agentId={agent.id}
          hienTai={{
            platformCode: agent.platform.code,
            modelId: agent.model?.modelId ?? null,
            status: agent.status,
            suspendedReason: agent.suspendedReason,
          }}
          choices={modelChoices}
          m29Role={role}
        />

        <div>
          <h2 className="font-head text-sm font-bold text-ink">Kỹ năng (Skill)</h2>
          {/* Nói rõ kỹ năng KHÔNG phải cơ chế cấp quyền: ETV.P29 mục 2.1 chỉ coi "tập kỹ năng" là
              một phần mô tả tác tử, còn thứ chặn/cho hành động là whitelist công cụ ngay dưới.
              Không có dòng này thì ô trống dễ bị đọc thành "tác tử hỏng". */}
          <p className="mb-2 text-xs text-ink-3">Phạm vi việc tác tử được khai là làm được (ETV.P29 mục 2.1) — dùng để soát xét, không tự cấp quyền hành động.</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s.id} className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">
                {s.name}
              </span>
            ))}
            {skills.length === 0 && (
              <p className="text-xs text-ink-3">Chưa gán kỹ năng nào — tác tử chạy thuần theo phiên bản lời nhắc đang áp dụng.</p>
            )}
          </div>
          {canWriteRegistry && <SkillPicker agentId={agent.id} skills={moiSkill} daChon={agent.skillIds} />}
        </div>

        <div>
          <h2 className="font-head text-sm font-bold text-ink">Công cụ (whitelist Tool Gateway)</h2>
          {/* Cổng công cụ là đường gọi duy nhất (ETV.P29 mục 5.4.2); còn việc công cụ ngoài danh
              sách bị chặn là nguyên tắc 3 ở mục 1.3. Ghi thẳng lên giao diện để không ai đi tìm
              "chỗ bật công cụ" ở nơi khác. */}
          <p className="mb-2 text-xs text-ink-3">Điểm gọi nghiệp vụ tác tử được phép dùng. Công cụ ngoài danh sách bị chặn ngay tại cổng, không phụ thuộc nội dung lời nhắc — ETV.P29 mục 1.3 nguyên tắc 3.</p>
          <div className="flex flex-col gap-2">
            {tools.map((t) => (
              <div key={t.id} className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2 text-sm">
                <span className="text-ink">
                  {t.name} <span className="font-mono text-xs text-ink-3">· {t.endpoint}</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="rounded-full bg-sunk px-2 py-0.5 text-xs text-ink-2">{PERMISSION_LEVEL_LABEL[t.permissionLevel]}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${t.status === "ACTIVE" ? "bg-good-soft text-good" : "bg-crit-soft text-crit"}`}>
                    {OP_STATUS_LABEL[t.status]}
                  </span>
                </span>
              </div>
            ))}
            {tools.length === 0 && (
              <p className="rounded-lg border border-dashed border-border px-3 py-2 text-xs text-ink-3">
                Whitelist rỗng — Tool Gateway chặn <strong className="font-semibold text-ink-2">mọi</strong> lời gọi công cụ thay mặt tác tử này ở bước (5), bất kể lời nhắc viết gì. Đây là trạng thái đúng của một tác tử chỉ tra cứu tài liệu.
              </p>
            )}
          </div>
          {canWriteRegistry && (
            <ToolPicker
              agentId={agent.id}
              tools={moiTool.map((t) => ({
                id: t.id,
                code: t.code,
                name: t.name,
                endpoint: t.endpoint,
                platformCode: t.platform.code,
                status: t.status,
                permissionLevel: t.permissionLevel,
              }))}
              daChon={agent.toolIds}
            />
          )}
        </div>

        <div>
          <h2 className="mb-2 font-head text-sm font-bold text-ink">Guardrail</h2>
          <div className="flex flex-col gap-2">
            {guardrails.map((g) => (
              <div key={g.id} className="rounded-lg border border-border bg-surface px-3 py-2 text-sm">
                <p className="font-medium text-ink">{g.description}</p>
                <p className="mt-0.5 text-xs text-ink-3">
                  {g.scope} · {g.action} · {g.severity}
                </p>
              </div>
            ))}
            {guardrails.length === 0 && <p className="text-xs text-ink-3">Chưa có guardrail nào.</p>}
          </div>
        </div>

        <PromptPanel agentId={agent.id} versions={promptVersions} activeVersionId={agent.activePromptVersionId} m29Role={role} />
      </div>

      <div className="flex flex-col gap-4">
        <AiaPanel aia={aia} agentId={agent.id} m29Role={role} />

        <EvaluationPanel
          canWrite={can(role, "evaluations", "write")}
          runs={runs.map((r) => ({
            id: r.id,
            suiteName: r.suiteName,
            status: r.status,
            passCount: r.passCount,
            failCount: r.failCount,
            createdAt: r.createdAt.toLocaleString("vi-VN"),
          }))}
        />
        <ToolGatewayPanel agentId={agent.id} tools={tools} m29Role={role} />
        <p className="text-xs text-ink-3">
          Vai trò M29 của bạn: <strong className="text-ink">{role ? M29_ROLE_LABEL[role] : "chưa gán"}</strong>
        </p>
      </div>
    </div>
  );
}
