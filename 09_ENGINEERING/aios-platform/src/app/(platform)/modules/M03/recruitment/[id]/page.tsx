import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getM03Role } from "@/lib/m03/actor";
import { RECRUITMENT_STATUS_LABEL } from "@/lib/m03/labels";
import { RecruitmentActionPanel } from "./ActionPanel";

export default async function M03RecruitmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [plan, m03Role] = await Promise.all([
    prisma.m03RecruitmentPlan.findUnique({
      where: { id },
      include: { createdBy: true, approvedBy: true, employees: true },
    }),
    getM03Role(),
  ]);
  if (!plan) notFound();

  const auditEntries = await prisma.m03AuditEntry.findMany({
    where: { itemType: "RECRUITMENT", itemId: id },
    orderBy: { ts: "asc" },
    include: { actor: true },
  });

  return (
    <div className="grid max-w-4xl grid-cols-3 gap-6">
      <div className="col-span-2 flex flex-col gap-4">
        <div>
          <p className="font-mono text-xs text-ink-3">{plan.code}</p>
          <h1 className="font-head text-2xl font-bold text-ink">{plan.position}</h1>
          <p className="mt-1 text-sm text-ink-2">{RECRUITMENT_STATUS_LABEL[plan.status]}</p>
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl border border-border bg-surface p-4 text-sm">
          <dt className="text-ink-3">Bộ phận</dt>
          <dd className="text-ink">{plan.department}</dd>
          <dt className="text-ink-3">Số lượng</dt>
          <dd className="text-ink">{plan.headcount}</dd>
          <dt className="text-ink-3">Yêu cầu</dt>
          <dd className="text-ink">{plan.requirement}</dd>
          <dt className="text-ink-3">Người tạo</dt>
          <dd className="text-ink">{plan.createdBy.name}</dd>
          <dt className="text-ink-3">Người duyệt</dt>
          <dd className="text-ink">{plan.approvedBy?.name ?? "—"}</dd>
        </dl>

        {plan.employees.length > 0 && (
          <div>
            <h2 className="mb-2 font-head text-sm font-bold text-ink">Nhân sự đã tuyển</h2>
            <ul className="flex flex-col gap-2 text-sm">
              {plan.employees.map((e) => (
                <li key={e.id} className="rounded-lg border border-border bg-surface p-3">
                  <a href={`/modules/M03/employee/${e.id}`} className="font-medium text-accent hover:underline">
                    {e.code} — {e.fullName}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h2 className="mb-2 font-head text-sm font-bold text-ink">Nhật ký</h2>
          <ul className="flex flex-col gap-2 text-sm">
            {auditEntries.map((e) => (
              <li key={e.id} className="rounded-lg border border-border bg-surface p-3">
                <p className="text-ink">
                  <span className="text-ink-3">{e.ts.toLocaleString("vi-VN")}</span> · {e.actor.name} ({e.role}) — {e.action}
                </p>
                {e.reason && <p className="mt-1 text-ink-2">Lý do: {e.reason}</p>}
              </li>
            ))}
            {auditEntries.length === 0 && (
              <li className="rounded-lg border border-border bg-surface p-3 text-ink-3">Chưa có sự kiện nào.</li>
            )}
          </ul>
        </div>
      </div>

      <div>
        <RecruitmentActionPanel id={plan.id} status={plan.status} m03Role={m03Role} />
      </div>
    </div>
  );
}
