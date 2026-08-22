import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getM29Role } from "@/lib/m29/actor";
import { M29_ROLE_LABEL, APPROVAL_STATUS_LABEL, APPROVAL_STATUS_TONE, HEALTH_LABEL, HEALTH_TONE, OP_STATUS_LABEL } from "@/lib/m29/labels";
import { can } from "@/lib/m29/model";
import { CheckHealthButton } from "./CheckHealthButton";

const TONE_CLASS: Record<string, string> = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  crit: "bg-crit-soft text-crit",
  neutral: "bg-sunk text-ink-2",
};

function Badge({ label, tone }: { label: string; tone: string }) {
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[tone]}`}>{label}</span>;
}

export default async function M29OverviewPage() {
  const role = await getM29Role();
  if (!can(role, "platforms") && !can(role, "registry")) {
    return (
      <div className="rounded-xl border border-crit/30 bg-crit-soft p-4 text-sm text-crit">
        Bạn chưa được gán vai trò M29 (AI_VIEWER/AI_OPERATOR/AI_ADMIN/AI_SECURITY_ADMIN/AI_AUDITOR/SUPER_ADMIN) — không có quyền xem module này.
      </div>
    );
  }

  const [platforms, agents, pendingAia, disabledTools] = await Promise.all([
    prisma.aIPlatform.findMany({ orderBy: { code: "asc" } }),
    prisma.aIAgent.findMany({ orderBy: { code: "asc" }, include: { model: true, aia: true } }),
    prisma.aIImpactAssessment.count({ where: { status: { in: ["NOT_ASSESSED", "DRAFT", "REVIEWED", "REVIEW_REQUIRED"] } } }),
    prisma.aITool.count({ where: { status: "DISABLED" } }),
  ]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs font-medium text-ink-3">M29 · MP29 · Lõi quản trị hệ thống trí tuệ nhân tạo (AIOS Control Plane)</p>
        <h1 className="font-head text-2xl font-bold text-ink">AI Office — Tổng quan</h1>
        <p className="mt-1 text-sm text-ink-2">
          Vai trò M29 của bạn: <strong className="text-ink">{role ? M29_ROLE_LABEL[role] : "Chưa được gán vai trò"}</strong>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs text-ink-2">Platform</p>
          <p className="mt-2 font-head text-3xl font-bold tabular-nums text-ink">{platforms.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs text-ink-2">Agent</p>
          <p className="mt-2 font-head text-3xl font-bold tabular-nums text-ink">{agents.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs text-ink-2">AIA chưa Đã phê duyệt</p>
          <p className={`mt-2 font-head text-3xl font-bold tabular-nums ${pendingAia > 0 ? "text-warn" : "text-good"}`}>{pendingAia}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs text-ink-2">Tool đang Vô hiệu hóa</p>
          <p className={`mt-2 font-head text-3xl font-bold tabular-nums ${disabledTools > 0 ? "text-crit" : "text-good"}`}>{disabledTools}</p>
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-head text-sm font-bold text-ink">Platform</h2>
          {can(role, "health") && <CheckHealthButton />}
        </div>
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Mã</th>
                <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Tên</th>
                <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Môi trường</th>
                <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Sức khỏe</th>
                <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {platforms.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-sunk">
                  <td className="px-3 py-2.5 font-mono text-xs font-medium text-ink">{p.code}</td>
                  <td className="px-3 py-2.5 text-ink">{p.name}</td>
                  <td className="px-3 py-2.5 text-ink-2">{p.environment}</td>
                  <td className="px-3 py-2.5">
                    <Badge label={HEALTH_LABEL[p.health]} tone={HEALTH_TONE[p.health] ?? "neutral"} />
                  </td>
                  <td className="px-3 py-2.5">
                    <Badge label={APPROVAL_STATUS_LABEL[p.approvalStatus]} tone={APPROVAL_STATUS_TONE[p.approvalStatus] ?? "neutral"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="mb-2 font-head text-sm font-bold text-ink">Agent</h2>
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Mã</th>
                <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Tên</th>
                <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Model</th>
                <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Trạng thái</th>
                <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">AIA</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((a) => {
                const aia = a.aia[0];
                return (
                  <tr key={a.id} className="border-b border-border last:border-0 hover:bg-sunk">
                    <td className="px-3 py-2.5">
                      <Link href={`/modules/M29/agents/${a.id}`} className="font-mono text-xs font-medium text-accent hover:underline">
                        {a.code}
                      </Link>
                    </td>
                    <td className="px-3 py-2.5 text-ink">{a.name}</td>
                    <td className="px-3 py-2.5 text-ink-2">{a.model?.displayName ?? "—"}</td>
                    <td className="px-3 py-2.5">
                      <Badge label={OP_STATUS_LABEL[a.status]} tone={a.status === "ACTIVE" ? "good" : "neutral"} />
                    </td>
                    <td className="px-3 py-2.5">
                      {aia ? (
                        <Badge label={aia.status} tone={aia.status === "APPROVED" ? "good" : "warn"} />
                      ) : (
                        <span className="text-xs text-ink-3">chưa có hồ sơ</span>
                      )}
                    </td>
                  </tr>
                );
              })}
              {agents.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-3 py-8 text-center text-sm text-ink-3">
                    Chưa có Agent nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex gap-4 text-sm">
        <Link href="/modules/M29/registry" className="text-accent hover:underline">
          Danh mục Provider/Model/Skill/Tool →
        </Link>
        <Link href="/modules/M29/traces" className="text-accent hover:underline">
          Trace (nhật ký gọi AI) →
        </Link>
        <Link href="/modules/M29/audit" className="text-accent hover:underline">
          Audit Log →
        </Link>
      </div>
    </div>
  );
}
