import { prisma } from "@/lib/prisma";
import { getM29Role } from "@/lib/m29/actor";
import { can } from "@/lib/m29/model";
import { APPROVAL_STATUS_LABEL, APPROVAL_STATUS_TONE, OP_STATUS_LABEL, PERMISSION_LEVEL_LABEL } from "@/lib/m29/labels";
import { PlatformApprovalButton, ToolStatusToggle } from "./RegistryActions";

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

  const [platforms, providers, models, skills, tools] = await Promise.all([
    prisma.aIPlatform.findMany({ orderBy: { code: "asc" } }),
    prisma.aIProvider.findMany({ orderBy: { code: "asc" } }),
    prisma.aIModel.findMany({ orderBy: { modelId: "asc" }, include: { provider: true } }),
    prisma.aISkill.findMany({ orderBy: { code: "asc" } }),
    prisma.aITool.findMany({ orderBy: { code: "asc" }, include: { platform: true } }),
  ]);

  return (
    <div className="flex max-w-5xl flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M29 · Danh mục</p>
        <h1 className="font-head text-2xl font-bold text-ink">Provider · Model · Skill · Tool · Platform</h1>
      </div>

      <section>
        <h2 className="mb-2 font-head text-sm font-bold text-ink">Platform</h2>
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase text-ink-3">Mã</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase text-ink-3">Tên</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase text-ink-3">Adapter</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase text-ink-3">Trạng thái</th>
                {canWritePlatform && <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase text-ink-3">Thao tác</th>}
              </tr>
            </thead>
            <tbody>
              {platforms.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0">
                  <td className="px-3 py-2 font-mono text-xs text-ink">{p.code}</td>
                  <td className="px-3 py-2 text-ink">{p.name}</td>
                  <td className="px-3 py-2 text-ink-2">{p.adapterType}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[APPROVAL_STATUS_TONE[p.approvalStatus]]}`}>
                      {APPROVAL_STATUS_LABEL[p.approvalStatus]}
                    </span>
                  </td>
                  {canWritePlatform && (
                    <td className="px-3 py-2">
                      <PlatformApprovalButton id={p.id} status={p.approvalStatus} />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-2 font-head text-sm font-bold text-ink">Tool</h2>
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full text-sm">
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
          <ul className="flex flex-col gap-1.5 text-sm">
            {providers.map((p) => (
              <li key={p.id} className="rounded-lg border border-border bg-surface px-3 py-2 text-ink">
                {p.name} <span className="text-xs text-ink-3">({OP_STATUS_LABEL[p.status]})</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-2 font-head text-sm font-bold text-ink">Model</h2>
          <ul className="flex flex-col gap-1.5 text-sm">
            {models.map((m) => (
              <li key={m.id} className="rounded-lg border border-border bg-surface px-3 py-2 text-ink">
                {m.displayName} <span className="text-xs text-ink-3">· {m.provider.name} · ${m.costPer1kTokens}/1K token</span>
              </li>
            ))}
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
