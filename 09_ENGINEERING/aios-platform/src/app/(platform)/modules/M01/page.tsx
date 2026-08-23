import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getM01Role } from "@/lib/m01/actor";
import { M01_ROLE_LABEL, RISK_LEVEL_LABEL, RISK_SOURCE_LABEL, OPP_SOURCE_LABEL, STATUS_LABEL } from "@/lib/m01/labels";
import { CanCuBanner } from "@/components/CanCuBanner";

const STATUS_TONE: Record<string, "good" | "warn" | "crit" | "neutral"> = {
  DRAFT: "neutral",
  PENDING_REVIEW: "warn",
  PENDING_LEADER_APPROVAL: "warn",
  IN_PROGRESS: "warn",
  DONE: "good",
};

const RISK_LEVEL_TONE: Record<string, "good" | "warn" | "crit"> = {
  THAP: "good",
  TRUNGBINH: "warn",
  CAO: "crit",
  RATCAO: "crit",
};

const TONE_CLASS: Record<string, string> = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  crit: "bg-crit-soft text-crit",
  neutral: "bg-sunk text-ink-2",
};

function Badge({ label, tone }: { label: string; tone: string }) {
  return (
    <span className={`inline-flex items-center rounded-full whitespace-nowrap px-2 py-0.5 text-xs font-medium ${TONE_CLASS[tone]}`}>
      {label}
    </span>
  );
}

export default async function M01ListPage() {
  const [risks, opportunities, role] = await Promise.all([
    prisma.m01RiskItem.findMany({ orderBy: { createdAt: "desc" }, include: { createdBy: true } }),
    prisma.m01OpportunityItem.findMany({ orderBy: { createdAt: "desc" }, include: { createdBy: true } }),
    getM01Role(),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-ink-3">M01 · MP01 · Quản lý Rủi ro và Cơ hội</p>
          <h1 className="font-head text-2xl font-bold text-ink">Rủi ro &amp; Cơ hội</h1>
          <p className="mt-1 text-sm text-ink-2">
            Vai trò M01 của bạn:{" "}
            <strong className="text-ink">{role ? (M01_ROLE_LABEL[role] ?? role) : "Chưa được gán vai trò"}</strong>
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Link
            href="/modules/M01/new?type=risk"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90"
          >
            + Rủi ro
          </Link>
          <Link
            href="/modules/M01/new?type=opportunity"
            className="rounded-lg border border-border-strong px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-sunk"
          >
            + Cơ hội
          </Link>
        </div>
      </div>

      <CanCuBanner moduleCode="M01" />

      <section className="flex flex-col gap-2">
        <h2 className="font-head text-sm font-bold text-ink">Rủi ro</h2>
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[36rem] text-sm">
            <thead>
              <tr>
                <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Mã</th>
                <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Tên rủi ro</th>
                <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Nguồn gốc</th>
                <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">R = S×P</th>
                <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Mức độ</th>
                <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Trạng thái</th>
                <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Người tạo</th>
              </tr>
            </thead>
            <tbody>
              {risks.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0 hover:bg-sunk">
                  <td className="px-3 py-2.5">
                    <Link href={`/modules/M01/risk/${r.id}`} className="whitespace-nowrap font-mono text-xs font-medium text-accent hover:underline">
                      {r.code}
                    </Link>
                  </td>
                  <td className="px-3 py-2.5 text-ink">{r.title}</td>
                  <td className="px-3 py-2.5 text-ink-2">{RISK_SOURCE_LABEL[r.source]}</td>
                  <td className="px-3 py-2.5 text-ink">
                    {r.severity != null && r.possibility != null ? `${r.riskScore} (${r.severity}×${r.possibility})` : "—"}
                  </td>
                  <td className="px-3 py-2.5">
                    {r.riskLevel ? <Badge label={RISK_LEVEL_LABEL[r.riskLevel]} tone={RISK_LEVEL_TONE[r.riskLevel]} /> : <span className="text-ink-3">—</span>}
                  </td>
                  <td className="px-3 py-2.5">
                    <Badge label={STATUS_LABEL[r.status]} tone={STATUS_TONE[r.status] ?? "neutral"} />
                  </td>
                  <td className="px-3 py-2.5 text-ink-2">{r.createdBy.name}</td>
                </tr>
              ))}
              {risks.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-3 py-8 text-center text-sm text-ink-3">
                    Chưa có rủi ro nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-head text-sm font-bold text-ink">Cơ hội</h2>
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[36rem] text-sm">
            <thead>
              <tr>
                <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Mã</th>
                <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Tên cơ hội</th>
                <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Nguồn phát hiện</th>
                <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Trạng thái</th>
                <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Người tạo</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map((o) => (
                <tr key={o.id} className="border-b border-border last:border-0 hover:bg-sunk">
                  <td className="px-3 py-2.5">
                    <Link href={`/modules/M01/opportunity/${o.id}`} className="whitespace-nowrap font-mono text-xs font-medium text-accent hover:underline">
                      {o.code}
                    </Link>
                  </td>
                  <td className="px-3 py-2.5 text-ink">{o.title}</td>
                  <td className="px-3 py-2.5 text-ink-2">{OPP_SOURCE_LABEL[o.source]}</td>
                  <td className="px-3 py-2.5">
                    <Badge label={STATUS_LABEL[o.status]} tone={STATUS_TONE[o.status] ?? "neutral"} />
                  </td>
                  <td className="px-3 py-2.5 text-ink-2">{o.createdBy.name}</td>
                </tr>
              ))}
              {opportunities.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-3 py-8 text-center text-sm text-ink-3">
                    Chưa có cơ hội nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
