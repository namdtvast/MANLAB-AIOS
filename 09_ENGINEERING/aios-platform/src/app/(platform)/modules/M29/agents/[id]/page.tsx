import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getM29Role } from "@/lib/m29/actor";
import { M29_ROLE_LABEL, OP_STATUS_LABEL, PERMISSION_LEVEL_LABEL } from "@/lib/m29/labels";
import { AiaPanel } from "./AiaPanel";
import { PromptPanel } from "./PromptPanel";
import { ToolGatewayPanel } from "./ToolGatewayPanel";

export default async function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [agent, role] = await Promise.all([
    prisma.aIAgent.findUnique({
      where: { id },
      include: { platform: true, model: true, aia: true, evaluationSuites: { include: { runs: { orderBy: { createdAt: "desc" }, take: 1 } } } },
    }),
    getM29Role(),
  ]);
  if (!agent) notFound();

  const [skills, tools, guardrails, promptVersions] = await Promise.all([
    prisma.aISkill.findMany({ where: { id: { in: agent.skillIds } } }),
    prisma.aITool.findMany({ where: { id: { in: agent.toolIds } } }),
    prisma.aIGuardrail.findMany({ where: { OR: [{ scope: "SYSTEM" }, { scopeRef: agent.id }] } }),
    prisma.aIPromptVersion.findMany({ where: { prompt: { agentId: agent.id } }, orderBy: { createdAt: "desc" } }),
  ]);
  const aia = agent.aia[0] ?? null;
  const lastRun = agent.evaluationSuites.flatMap((s) => s.runs)[0] ?? null;

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
          <dd className="text-ink">{lastRun ? `${lastRun.status} (${lastRun.passCount} đạt / ${lastRun.failCount} lỗi)` : "chưa chạy"}</dd>
        </dl>

        <div>
          <h2 className="mb-2 font-head text-sm font-bold text-ink">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s.id} className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">
                {s.name}
              </span>
            ))}
            {skills.length === 0 && <p className="text-xs text-ink-3">Chưa gán skill nào.</p>}
          </div>
        </div>

        <div>
          <h2 className="mb-2 font-head text-sm font-bold text-ink">Tools (whitelist Tool Gateway)</h2>
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
            {tools.length === 0 && <p className="text-xs text-ink-3">Chưa gán tool nào.</p>}
          </div>
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
        <ToolGatewayPanel agentId={agent.id} tools={tools} m29Role={role} />
        <p className="text-xs text-ink-3">
          Vai trò M29 của bạn: <strong className="text-ink">{role ? M29_ROLE_LABEL[role] : "chưa gán"}</strong>
        </p>
      </div>
    </div>
  );
}
