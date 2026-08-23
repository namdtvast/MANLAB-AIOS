import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getM16Role } from "@/lib/m16/actor";
import { CONFORMITY_LABEL, PROGRAM_STATUS_LABEL } from "@/lib/m16/labels";
import { ConfirmProgramButton } from "./ConfirmProgramButton";
import { NewFindingForm } from "./NewFindingForm";
import { NewReportForm } from "./NewReportForm";

export default async function M16ProgramDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [p, m16Role] = await Promise.all([
    prisma.m16AuditProgram.findUnique({
      where: { id },
      include: { plan: true, findings: true, reports: { include: { createdBy: true } } },
    }),
    getM16Role(),
  ]);
  if (!p) notFound();

  const auditEntries = await prisma.m16AuditEntry.findMany({
    where: { itemType: "PROGRAM", itemId: id },
    orderBy: { ts: "asc" },
    include: { actor: true },
  });

  return (
    <div className="flex max-w-4xl flex-col gap-6">
      <div>
        <p className="font-mono text-xs text-ink-3">{p.code}</p>
        <h1 className="font-head text-2xl font-bold text-ink">{p.department}</h1>
        <p className="mt-1 text-sm text-ink-2">
          {p.field} · {p.auditDate.toLocaleDateString("vi-VN")} · {PROGRAM_STATUS_LABEL[p.status]}
        </p>
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl border border-border bg-surface p-4 text-sm">
        <dt className="text-ink-3">Kế hoạch</dt>
        <dd className="text-ink">{p.plan.code}</dd>
        <dt className="text-ink-3">Trưởng đoàn</dt>
        <dd className="text-ink">{p.teamLeadName}</dd>
        <dt className="text-ink-3">Thành viên đoàn</dt>
        <dd className="text-ink">{p.teamMembers.join(", ") || "—"}</dd>
      </dl>

      {p.status === "DRAFT" && <ConfirmProgramButton id={p.id} />}

      <section className="flex flex-col gap-2">
        <h2 className="font-head text-sm font-bold text-ink">Phát hiện</h2>
        <ul className="flex flex-col gap-2 text-sm">
          {p.findings.map((f) => (
            <li key={f.id} className="rounded-lg border border-border bg-surface p-3">
              <p className="font-mono text-xs text-ink-3">{f.code}</p>
              <p className="text-ink">
                {f.clauseRef} · {f.department} · {CONFORMITY_LABEL[f.conformity]}
              </p>
              <p className="text-ink-2">{f.description}</p>
              {f.capaRef && <p className="text-ink-2">CAPA: {f.capaRef}</p>}
            </li>
          ))}
          {p.findings.length === 0 && <li className="rounded-lg border border-border bg-surface p-3 text-ink-3">Chưa có phát hiện nào.</li>}
        </ul>
        {p.status === "CONFIRMED" && <NewFindingForm programId={p.id} />}
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-head text-sm font-bold text-ink">Báo cáo tổng hợp</h2>
        <ul className="flex flex-col gap-2 text-sm">
          {p.reports.map((r) => (
            <li key={r.id} className="rounded-lg border border-border bg-surface p-3">
              <p className="font-mono text-xs text-ink-3">
                {r.code} {r.isLate && <span className="ml-2 rounded-full bg-crit-soft px-2 py-0.5 text-xs text-crit">Trễ hạn</span>}
              </p>
              <p className="text-ink">Kết luận: {r.closingConclusion}</p>
              <p className="text-ink-2">Người đệ trình: {r.createdBy.name}</p>
            </li>
          ))}
          {p.reports.length === 0 && <li className="rounded-lg border border-border bg-surface p-3 text-ink-3">Chưa có báo cáo nào.</li>}
        </ul>
        {p.status === "CONFIRMED" && <NewReportForm programId={p.id} />}
      </section>

      <div>
        <h2 className="mb-2 font-head text-sm font-bold text-ink">Nhật ký</h2>
        <ul className="flex flex-col gap-2 text-sm">
          {auditEntries.map((e) => (
            <li key={e.id} className="rounded-lg border border-border bg-surface p-3">
              <p className="text-ink">
                <span className="text-ink-3">{e.ts.toLocaleString("vi-VN")}</span> · {e.actor.name} ({e.role}) — {e.action}
              </p>
            </li>
          ))}
          {auditEntries.length === 0 && <li className="rounded-lg border border-border bg-surface p-3 text-ink-3">Chưa có sự kiện nào.</li>}
        </ul>
      </div>

      <p className="text-xs text-ink-3">
        Vai trò M16 của bạn: <strong className="text-ink">{m16Role ?? "chưa gán"}</strong>
      </p>
    </div>
  );
}
