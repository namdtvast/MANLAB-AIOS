import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getM29Role } from "@/lib/m29/actor";
import { can } from "@/lib/m29/model";
import { currentMonthRange, usage } from "@/lib/m29/usage";
import { StatCard } from "@/components/StatCard";
import { Badge, thCls } from "../ui";
import { BudgetForm } from "./BudgetForm";

const money = (value: number, currency = "USD") => new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency,
  minimumFractionDigits: value > 0 && value < 0.01 ? 6 : 2,
  maximumFractionDigits: value > 0 && value < 0.01 ? 6 : 2,
}).format(value);

export default async function M29UsagePage() {
  const role = await getM29Role();
  if (!can(role, "usage")) {
    return <div className="rounded-xl border border-crit/30 bg-crit-soft p-4 text-sm text-crit">Bạn không có quyền xem token và chi phí sử dụng AI.</div>;
  }

  const range = currentMonthRange();
  const [rows, agents, budgets] = await Promise.all([
    usage(range),
    prisma.aIAgent.findMany({ orderBy: { code: "asc" }, select: { id: true, code: true, name: true } }),
    prisma.aIBudget.findMany({ orderBy: { code: "asc" }, include: { agent: true } }),
  ]);
  const requests = rows.reduce((n, r) => n + r.requestCount, 0);
  const tokensIn = rows.reduce((n, r) => n + r.tokensIn, 0);
  const tokensOut = rows.reduce((n, r) => n + r.tokensOut, 0);
  const totalCost = rows.reduce((n, r) => n + r.costEstimate, 0);
  const agentCost = new Map<string, number>();
  rows.forEach((r) => r.agentId && agentCost.set(r.agentId, (agentCost.get(r.agentId) ?? 0) + r.costEstimate));

  return (
    <div className="flex max-w-7xl flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M29 · FinOps AI · Tháng {range.from.toLocaleDateString("vi-VN", { month: "2-digit", year: "numeric" })}</p>
        <h1 className="font-head text-2xl font-bold text-ink">Sử dụng token và chi phí</h1>
        <p className="mt-1 max-w-3xl text-sm text-ink-2">Theo dõi token thật do nhà cung cấp trả về, chi phí ước tính theo đơn giá được chụp tại thời điểm gọi và hạn mức tháng.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Lượt gọi trong tháng" value={requests.toLocaleString("vi-VN")} />
        <StatCard label="Token vào" value={tokensIn.toLocaleString("vi-VN")} />
        <StatCard label="Token ra" value={tokensOut.toLocaleString("vi-VN")} />
        <StatCard label="Chi phí ước tính" value={money(totalCost)} tone="warn" />
      </div>

      <section>
        <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
          <div><h2 className="font-head text-sm font-bold text-ink">Hạn mức chi phí</h2><p className="text-xs text-ink-3">Đơn vị chuẩn hiện tại: USD/tháng.</p></div>
        </div>
        {can(role, "usage", "write") && <BudgetForm agents={agents} existingCodes={budgets.map((b) => b.code)} />}
        <div className="mt-3 overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[44rem] text-sm">
            <thead><tr><th className={thCls}>Hạn mức</th><th className={thCls}>Phạm vi</th><th className={`${thCls} text-right`}>Đã dùng</th><th className={`${thCls} text-right`}>Giới hạn</th><th className={thCls}>Mức sử dụng</th><th className={thCls}>Cơ chế</th></tr></thead>
            <tbody>
              {budgets.map((b) => {
                const spent = b.agentId ? agentCost.get(b.agentId) ?? 0 : totalCost;
                const percent = Math.min(999, (spent / b.monthlyLimit) * 100);
                const tone = percent >= 100 ? "crit" : percent >= b.warningPercent ? "warn" : "good";
                return <tr key={b.id} className="border-b border-border last:border-0">
                  <td className="px-3 py-2.5"><span className="block font-medium text-ink">{b.name}</span><span className="font-mono text-xs text-ink-3">{b.code}</span></td>
                  <td className="px-3 py-2.5 text-ink-2">{b.agent ? `${b.agent.code} — ${b.agent.name}` : "Toàn bộ M29"}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-ink">{money(spent, b.currency)}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-ink">{money(b.monthlyLimit, b.currency)}</td>
                  <td className="px-3 py-2.5"><Badge label={`${percent.toFixed(1)}% · ${percent >= 100 ? "Đã đạt hạn mức" : percent >= b.warningPercent ? "Cảnh báo" : "Trong hạn mức"}`} tone={tone} /></td>
                  <td className="px-3 py-2.5 text-ink-2">{b.blockAtLimit ? "Chặn tại 100%" : "Chỉ cảnh báo"}</td>
                </tr>;
              })}
              {budgets.length === 0 && <tr><td colSpan={6} className="px-3 py-8 text-center text-ink-3">Chưa thiết lập hạn mức. Chi phí vẫn được ghi nhận nhưng chưa có ngưỡng cảnh báo/chặn.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-2 font-head text-sm font-bold text-ink">Chi tiết sử dụng theo ngày</h2>
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[52rem] text-sm">
            <thead><tr><th className={thCls}>Ngày</th><th className={thCls}>Agent</th><th className={thCls}>Model</th><th className={`${thCls} text-right`}>Lượt</th><th className={`${thCls} text-right`}>Token vào</th><th className={`${thCls} text-right`}>Token ra</th><th className={`${thCls} text-right`}>Chi phí</th></tr></thead>
            <tbody>
              {rows.map((r) => <tr key={`${r.date}-${r.agentId}-${r.modelId}`} className="border-b border-border last:border-0 hover:bg-sunk">
                <td className="px-3 py-2.5 tabular-nums text-ink">{new Date(`${r.date}T00:00:00Z`).toLocaleDateString("vi-VN")}</td>
                <td className="px-3 py-2.5 text-ink">{r.agentName}</td><td className="px-3 py-2.5 text-ink-2">{r.modelName}</td>
                <td className="px-3 py-2.5 text-right tabular-nums text-ink">{r.requestCount.toLocaleString("vi-VN")}</td>
                <td className="px-3 py-2.5 text-right tabular-nums text-ink">{r.tokensIn.toLocaleString("vi-VN")}</td>
                <td className="px-3 py-2.5 text-right tabular-nums text-ink">{r.tokensOut.toLocaleString("vi-VN")}</td>
                <td className="px-3 py-2.5 text-right tabular-nums font-medium text-ink">{money(r.costEstimate, r.currency)}</td>
              </tr>)}
              {rows.length === 0 && <tr><td colSpan={7} className="px-3 py-8 text-center text-ink-3">Chưa có lượt gọi AI trong tháng này.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
      <div className="flex flex-wrap gap-4 text-sm"><Link href="/modules/M29" className="text-accent hover:underline">← Tổng quan M29</Link><Link href="/modules/M29/registry" className="text-accent hover:underline">Bảng giá Model →</Link><Link href="/modules/M29/traces" className="text-accent hover:underline">Trace chi tiết →</Link></div>
    </div>
  );
}
