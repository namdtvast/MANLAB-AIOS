import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getM16Role } from "@/lib/m16/actor";
import { AUDIT_TYPE_LABEL, M16_ROLE_LABEL, PLAN_STATUS_LABEL, PROGRAM_STATUS_LABEL } from "@/lib/m16/labels";

const TONE_CLASS: Record<string, string> = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  crit: "bg-crit-soft text-crit",
  neutral: "bg-sunk text-ink-2",
};

function Badge({ label, tone }: { label: string; tone: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[tone]}`}>
      {label}
    </span>
  );
}

const PLAN_TONE: Record<string, string> = { DRAFT: "neutral", PENDING_REVIEW: "warn", PENDING_APPROVAL: "warn", APPROVED: "good", REJECTED: "crit" };
const PROGRAM_TONE: Record<string, string> = { DRAFT: "neutral", CONFIRMED: "good", CLOSED: "neutral" };

export default async function M16ListPage() {
  const [plans, programs, role] = await Promise.all([
    prisma.m16AuditPlan.findMany({ orderBy: { createdAt: "desc" }, include: { createdBy: true } }),
    prisma.m16AuditProgram.findMany({ orderBy: { createdAt: "desc" }, take: 10, include: { plan: true } }),
    getM16Role(),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs font-medium text-ink-3">M16 · MP16 · Đánh giá Nội bộ/Bên ngoài</p>
        <h1 className="font-head text-2xl font-bold text-ink">Kế hoạch &amp; Chương trình Đánh giá</h1>
        <p className="mt-1 text-sm text-ink-2">
          Vai trò M16 của bạn:{" "}
          <strong className="text-ink">{role ? (M16_ROLE_LABEL[role] ?? role) : "Chưa được gán vai trò"}</strong>
        </p>
      </div>

      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="font-head text-sm font-bold text-ink">Kế hoạch đánh giá</h2>
          <div className="flex items-center gap-2">
            <Link
              href="/modules/M16/auditors"
              className="rounded-lg border border-border-strong px-3 py-1.5 text-xs font-medium text-ink hover:bg-sunk"
            >
              Sổ năng lực đánh giá viên
            </Link>
            <Link href="/modules/M16/plan/new" className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-ink hover:opacity-90">
              + Lập kế hoạch
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Mã</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Loại</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Năm</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Trạng thái</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Người tạo</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-sunk">
                  <td className="px-3 py-2">
                    <Link href={`/modules/M16/plan/${p.id}`} className="font-mono text-xs font-medium text-accent hover:underline">
                      {p.code}
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-ink-2">{AUDIT_TYPE_LABEL[p.type]}</td>
                  <td className="px-3 py-2 text-ink">{p.year}</td>
                  <td className="px-3 py-2">
                    <Badge label={PLAN_STATUS_LABEL[p.status]} tone={PLAN_TONE[p.status]} />
                  </td>
                  <td className="px-3 py-2 text-ink-2">{p.createdBy.name}</td>
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

      <section className="flex flex-col gap-2">
        <h2 className="font-head text-sm font-bold text-ink">Chương trình đánh giá gần đây</h2>
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Mã</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Bộ phận</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Ngày đánh giá</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-sunk">
                  <td className="px-3 py-2">
                    <Link href={`/modules/M16/program/${p.id}`} className="font-mono text-xs font-medium text-accent hover:underline">
                      {p.code}
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-ink">{p.department}</td>
                  <td className="px-3 py-2 text-ink-2">{p.auditDate.toLocaleDateString("vi-VN")}</td>
                  <td className="px-3 py-2">
                    <Badge label={PROGRAM_STATUS_LABEL[p.status]} tone={PROGRAM_TONE[p.status]} />
                  </td>
                </tr>
              ))}
              {programs.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-3 py-6 text-center text-sm text-ink-3">Chưa có chương trình nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
