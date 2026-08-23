import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getM04Role } from "@/lib/m04/actor";
import { LOG_TYPE_LABEL, M04_ROLE_LABEL, PLAN_STATUS_LABEL, RISK_LEVEL_LABEL } from "@/lib/m04/labels";
import { CanCuBanner } from "@/components/CanCuBanner";

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

const PLAN_TONE: Record<string, string> = { DRAFT: "neutral", PENDING_APPROVAL: "warn", APPROVED: "good", REJECTED: "crit" };
const RISK_TONE: Record<string, string> = { THUONG: "good", CAO: "crit" };

export default async function M04ListPage() {
  const [logs, plans, role] = await Promise.all([
    prisma.m04ConditionLog.findMany({ orderBy: { createdAt: "desc" }, take: 20, include: { area: true, reportedBy: true } }),
    prisma.m04FieldWorkPlan.findMany({ orderBy: { createdAt: "desc" } }),
    getM04Role(),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs font-medium text-ink-3">M04 · MP04 · Điều kiện môi trường &amp; công việc hiện trường</p>
        <h1 className="font-head text-2xl font-bold text-ink">Môi trường, Bảo quản &amp; Hiện trường</h1>
        <p className="mt-1 text-sm text-ink-2">
          Vai trò M04 của bạn:{" "}
          <strong className="text-ink">{role ? (M04_ROLE_LABEL[role] ?? role) : "Chưa được gán vai trò"}</strong>
        </p>
      </div>

      <CanCuBanner moduleCode="M04" />

      <section className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-head text-sm font-bold text-ink">Nhật ký điều kiện (môi trường / tủ bảo quản)</h2>
          <Link href="/modules/M04/log/new" className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-ink hover:opacity-90">
            + Ghi nhận điều kiện
          </Link>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[36rem] text-sm">
            <thead>
              <tr>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Mã</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Loại</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Khu vực</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Nhiệt độ/Độ ẩm</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Đạt ngưỡng</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Người ghi</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l) => (
                <tr key={l.id} className="border-b border-border last:border-0 hover:bg-sunk">
                  <td className="px-3 py-2 font-mono text-xs text-ink">{l.code}</td>
                  <td className="px-3 py-2 text-ink-2">{LOG_TYPE_LABEL[l.logType]}</td>
                  <td className="px-3 py-2 text-ink">{l.area.name}</td>
                  <td className="px-3 py-2 text-ink">
                    {l.temperature}°C / {l.humidity}%
                  </td>
                  <td className="px-3 py-2">
                    <Badge label={l.withinSpec ? "Đạt" : "Vượt ngưỡng"} tone={l.withinSpec ? "good" : "crit"} />
                  </td>
                  <td className="px-3 py-2 text-ink-2">{l.reportedBy.name}</td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-center text-sm text-ink-3">Chưa có bản ghi nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-head text-sm font-bold text-ink">Kế hoạch công việc hiện trường</h2>
          <Link href="/modules/M04/plan/new" className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-ink hover:opacity-90">
            + Lập kế hoạch
          </Link>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[36rem] text-sm">
            <thead>
              <tr>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Mã</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Địa điểm</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Khách hàng</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Mức rủi ro</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-sunk">
                  <td className="px-3 py-2">
                    <Link href={`/modules/M04/plan/${p.id}`} className="whitespace-nowrap font-mono text-xs font-medium text-accent hover:underline">
                      {p.code}
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-ink">{p.site}</td>
                  <td className="px-3 py-2 text-ink-2">{p.customer}</td>
                  <td className="px-3 py-2">
                    <Badge label={RISK_LEVEL_LABEL[p.riskLevel]} tone={RISK_TONE[p.riskLevel]} />
                  </td>
                  <td className="px-3 py-2">
                    <Badge label={PLAN_STATUS_LABEL[p.status]} tone={PLAN_TONE[p.status]} />
                  </td>
                </tr>
              ))}
              {plans.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-3 py-6 text-center text-sm text-ink-3">Chưa có kế hoạch nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
