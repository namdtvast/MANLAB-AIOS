import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getM17Role } from "@/lib/m17/actor";
import { M17_ROLE_LABEL, PLAN_STATUS_LABEL } from "@/lib/m17/labels";

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

export default async function M17ListPage() {
  const [plans, minutes, role] = await Promise.all([
    prisma.m17ReviewPlan.findMany({ orderBy: { createdAt: "desc" }, include: { createdBy: true } }),
    prisma.m17ReviewMinutes.findMany({ orderBy: { createdAt: "desc" }, take: 10, include: { plan: true } }),
    getM17Role(),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs font-medium text-ink-3">M17 · MP17 · Xem xét của Lãnh đạo</p>
        <h1 className="font-head text-2xl font-bold text-ink">Chương trình &amp; Biên bản Xem xét</h1>
        <p className="mt-1 text-sm text-ink-2">
          Vai trò M17 của bạn:{" "}
          <strong className="text-ink">{role ? (M17_ROLE_LABEL[role] ?? role) : "Chưa được gán vai trò"}</strong>
        </p>
      </div>

      <section className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-head text-sm font-bold text-ink">Chương trình xem xét</h2>
          <Link href="/modules/M17/plan/new" className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-ink hover:opacity-90">
            + Lập chương trình
          </Link>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[36rem] text-sm">
            <thead>
              <tr>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Mã</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Tiêu đề</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Ngày dự kiến</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Trạng thái</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Người tạo</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-sunk">
                  <td className="px-3 py-2">
                    <Link href={`/modules/M17/plan/${p.id}`} className="whitespace-nowrap font-mono text-xs font-medium text-accent hover:underline">
                      {p.code}
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-ink">{p.title}</td>
                  <td className="px-3 py-2 text-ink-2">{p.plannedDate.toLocaleDateString("vi-VN")}</td>
                  <td className="px-3 py-2">
                    <Badge label={PLAN_STATUS_LABEL[p.status]} tone={PLAN_TONE[p.status]} />
                  </td>
                  <td className="px-3 py-2 text-ink-2">{p.createdBy.name}</td>
                </tr>
              ))}
              {plans.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-3 py-6 text-center text-sm text-ink-3">Chưa có chương trình nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-head text-sm font-bold text-ink">Biên bản xem xét gần đây</h2>
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[36rem] text-sm">
            <thead>
              <tr>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Mã</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Chương trình</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Ngày họp</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Kết luận</th>
              </tr>
            </thead>
            <tbody>
              {minutes.map((m) => (
                <tr key={m.id} className="border-b border-border last:border-0 hover:bg-sunk">
                  <td className="px-3 py-2">
                    <Link href={`/modules/M17/minutes/${m.id}`} className="whitespace-nowrap font-mono text-xs font-medium text-accent hover:underline">
                      {m.code}
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-ink">{m.plan.title}</td>
                  <td className="px-3 py-2 text-ink-2">{m.meetingDate.toLocaleDateString("vi-VN")}</td>
                  <td className="px-3 py-2 text-ink-2">{m.conclusion ? "Đã có" : "Chưa có"}</td>
                </tr>
              ))}
              {minutes.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-3 py-6 text-center text-sm text-ink-3">Chưa có biên bản nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
