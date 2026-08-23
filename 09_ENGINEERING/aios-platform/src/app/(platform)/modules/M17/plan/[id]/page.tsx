import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getM17Role } from "@/lib/m17/actor";
import { PLAN_STATUS_LABEL, REVIEW_TOPICS } from "@/lib/m17/labels";
import { PlanActionPanel } from "./ActionPanel";
import { NewMinutesForm } from "./NewMinutesForm";

export default async function M17PlanDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [p, m17Role] = await Promise.all([
    prisma.m17ReviewPlan.findUnique({
      where: { id },
      include: { createdBy: true, tpApprovedBy: true, ldvApprovedBy: true, minutes: true },
    }),
    getM17Role(),
  ]);
  if (!p) notFound();

  const auditEntries = await prisma.m17AuditEntry.findMany({
    where: { itemType: "PLAN", itemId: id },
    orderBy: { ts: "asc" },
    include: { actor: true },
  });

  return (
    <div className="grid max-w-4xl grid-cols-3 gap-6">
      <div className="col-span-2 flex flex-col gap-4">
        <div>
          <p className="font-mono text-xs text-ink-3">{p.code}</p>
          <h1 className="font-head text-2xl font-bold text-ink">{p.title}</h1>
          <p className="mt-1 text-sm text-ink-2">{PLAN_STATUS_LABEL[p.status]}{p.isAdHoc ? " · Đột xuất" : ""}</p>
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl border border-border bg-surface p-4 text-sm">
          <dt className="text-ink-3">Ngày dự kiến</dt>
          <dd className="text-ink">{p.plannedDate.toLocaleDateString("vi-VN")}</dd>
          <dt className="text-ink-3">Địa điểm</dt>
          <dd className="text-ink">{p.location}</dd>
          <dt className="text-ink-3">Thành phần tham dự</dt>
          <dd className="text-ink">{p.attendees.join(", ")}</dd>
          <dt className="text-ink-3">Nội dung dự kiến</dt>
          <dd className="text-ink">{p.plannedTopics.map((t) => REVIEW_TOPICS.find((r) => r.id === t)?.label ?? t).join("; ")}</dd>
          <dt className="text-ink-3">TP đã duyệt</dt>
          <dd className="text-ink">{p.tpApprovedBy?.name ?? "Chưa"}</dd>
          <dt className="text-ink-3">LĐV đã duyệt</dt>
          <dd className="text-ink">{p.ldvApprovedBy?.name ?? "Chưa"}</dd>
        </dl>

        {p.minutes.length > 0 && (
          <div>
            <h2 className="mb-2 font-head text-sm font-bold text-ink">Biên bản</h2>
            <ul className="flex flex-col gap-2 text-sm">
              {p.minutes.map((m) => (
                <li key={m.id} className="rounded-lg border border-border bg-surface p-3">
                  <a href={`/modules/M17/minutes/${m.id}`} className="font-medium text-accent hover:underline">
                    {m.code}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {p.status === "APPROVED" && <NewMinutesForm planId={p.id} />}

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
        <PlanActionPanel
          id={p.id}
          status={p.status}
          tpApproved={!!p.tpApprovedById}
          ldvApproved={!!p.ldvApprovedById}
          m17Role={m17Role}
        />
      </div>
    </div>
  );
}
