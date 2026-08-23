import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getM03Role } from "@/lib/m03/actor";
import { EMPLOYEE_STATUS_LABEL, EMPLOYMENT_TYPE_LABEL, M03_ROLE_LABEL, RECRUITMENT_STATUS_LABEL } from "@/lib/m03/labels";

const STATUS_TONE: Record<string, "good" | "warn" | "crit" | "neutral"> = {
  DRAFT: "neutral",
  PENDING_APPROVAL: "warn",
  APPROVED: "warn",
  FULFILLED: "good",
  REJECTED: "crit",
  THUVIEC: "warn",
  CHINHTHUC: "good",
  DANGHIVIEC: "neutral",
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

export default async function M03ListPage() {
  const [plans, employees, role] = await Promise.all([
    prisma.m03RecruitmentPlan.findMany({ orderBy: { createdAt: "desc" }, include: { createdBy: true } }),
    prisma.m03Employee.findMany({ orderBy: { createdAt: "desc" } }),
    getM03Role(),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-ink-3">M03 · MP03 · Nhân sự</p>
          <h1 className="font-head text-2xl font-bold text-ink">Tuyển dụng, Đào tạo &amp; Hợp đồng</h1>
          <p className="mt-1 text-sm text-ink-2">
            Vai trò M03 của bạn:{" "}
            <strong className="text-ink">{role ? (M03_ROLE_LABEL[role] ?? role) : "Chưa được gán vai trò"}</strong>
          </p>
        </div>
        <Link
          href="/modules/M03/recruitment/new"
          className="shrink-0 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90"
        >
          + Đề xuất tuyển dụng
        </Link>
      </div>

      <section className="flex flex-col gap-2">
        <h2 className="font-head text-sm font-bold text-ink">Đề xuất tuyển dụng</h2>
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[36rem] text-sm">
            <thead>
              <tr>
                <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Mã</th>
                <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Vị trí</th>
                <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Bộ phận</th>
                <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">SL</th>
                <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Trạng thái</th>
                <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Người tạo</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-sunk">
                  <td className="px-3 py-2.5">
                    <Link href={`/modules/M03/recruitment/${p.id}`} className="whitespace-nowrap font-mono text-xs font-medium text-accent hover:underline">
                      {p.code}
                    </Link>
                  </td>
                  <td className="px-3 py-2.5 text-ink">{p.position}</td>
                  <td className="px-3 py-2.5 text-ink-2">{p.department}</td>
                  <td className="px-3 py-2.5 text-ink">{p.headcount}</td>
                  <td className="px-3 py-2.5">
                    <Badge label={RECRUITMENT_STATUS_LABEL[p.status]} tone={STATUS_TONE[p.status] ?? "neutral"} />
                  </td>
                  <td className="px-3 py-2.5 text-ink-2">{p.createdBy.name}</td>
                </tr>
              ))}
              {plans.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-3 py-8 text-center text-sm text-ink-3">
                    Chưa có đề xuất tuyển dụng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-head text-sm font-bold text-ink">Nhân sự</h2>
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[36rem] text-sm">
            <thead>
              <tr>
                <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Mã</th>
                <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Họ tên</th>
                <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Vị trí</th>
                <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Loại</th>
                <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e) => (
                <tr key={e.id} className="border-b border-border last:border-0 hover:bg-sunk">
                  <td className="px-3 py-2.5">
                    <Link href={`/modules/M03/employee/${e.id}`} className="whitespace-nowrap font-mono text-xs font-medium text-accent hover:underline">
                      {e.code}
                    </Link>
                  </td>
                  <td className="px-3 py-2.5 text-ink">{e.fullName}</td>
                  <td className="px-3 py-2.5 text-ink-2">{e.position}</td>
                  <td className="px-3 py-2.5 text-ink-2">{EMPLOYMENT_TYPE_LABEL[e.employmentType]}</td>
                  <td className="px-3 py-2.5">
                    <Badge label={EMPLOYEE_STATUS_LABEL[e.status]} tone={STATUS_TONE[e.status] ?? "neutral"} />
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-3 py-8 text-center text-sm text-ink-3">
                    Chưa có hồ sơ nhân sự nào — tạo từ đề xuất tuyển dụng đã duyệt.
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
