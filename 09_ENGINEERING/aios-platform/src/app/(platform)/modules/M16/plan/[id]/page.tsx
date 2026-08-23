import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getM16Role } from "@/lib/m16/actor";
import { AUDIT_TYPE_LABEL, PLAN_STATUS_LABEL, PROGRAM_STATUS_LABEL } from "@/lib/m16/labels";
import { REQUIRED_MEMBER_QUALS } from "@/lib/m16/rules";
import { PlanActionPanel } from "./ActionPanel";
import { NewProgramForm } from "./NewProgramForm";

export default async function M16PlanDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [p, m16Role] = await Promise.all([
    prisma.m16AuditPlan.findUnique({
      where: { id },
      include: { createdBy: true, reviewedBy: true, approvedBy: true, programs: true, followUpOfProgram: true },
    }),
    getM16Role(),
  ]);
  if (!p) notFound();

  const auditEntries = await prisma.m16AuditEntry.findMany({
    where: { itemType: "PLAN", itemId: id },
    orderBy: { ts: "asc" },
    include: { actor: true },
  });

  // Nhân sự M03 + trạng thái năng lực để chọn đoàn đánh giá (quy tắc 1 ETV.P16, Increment 13).
  const employees =
    p.status === "APPROVED"
      ? (await prisma.m03Employee.findMany({ orderBy: { code: "asc" }, include: { m16Qualifications: true } })).map((e) => ({
          id: e.id,
          code: e.code,
          fullName: e.fullName,
          department: e.department,
          qualified: REQUIRED_MEMBER_QUALS.every((q) => e.m16Qualifications.some((x) => x.qualType === q)),
        }))
      : [];

  return (
    <div className="grid max-w-4xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="col-span-2 flex flex-col gap-4">
        <div>
          <p className="font-mono text-xs text-ink-3">{p.code}</p>
          <h1 className="font-head text-2xl font-bold text-ink">
            Đánh giá {AUDIT_TYPE_LABEL[p.type]} năm {p.year}
          </h1>
          <p className="mt-1 text-sm text-ink-2">{PLAN_STATUS_LABEL[p.status]}{p.isAdHoc ? " · Đột xuất" : ""}</p>
          {p.followUpOfProgram && (
            <p className="mt-1 text-sm text-warn">
              Đánh giá bổ sung sau chương trình{" "}
              <a href={`/modules/M16/program/${p.followUpOfProgram.id}`} className="text-accent hover:underline">
                {p.followUpOfProgram.code}
              </a>{" "}
              (quy tắc 7 ETV.P16 — thẩm tra chưa đủ tin cậy)
            </p>
          )}
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 rounded-xl border border-border bg-surface p-4 text-sm">
          <dt className="text-ink-3">Phạm vi</dt>
          <dd className="text-ink">{p.scope.join(", ")}</dd>
          <dt className="text-ink-3">Đánh giá viên</dt>
          <dd className="text-ink">{p.auditors.join(", ")}</dd>
          <dt className="text-ink-3">Người tạo</dt>
          <dd className="text-ink">{p.createdBy.name}</dd>
          <dt className="text-ink-3">Người xem xét</dt>
          <dd className="text-ink">{p.reviewedBy?.name ?? "—"}</dd>
          <dt className="text-ink-3">Người phê duyệt</dt>
          <dd className="text-ink">{p.approvedBy?.name ?? "—"}</dd>
        </dl>

        {p.programs.length > 0 && (
          <div>
            <h2 className="mb-2 font-head text-sm font-bold text-ink">Chương trình đánh giá</h2>
            <ul className="flex flex-col gap-2 text-sm">
              {p.programs.map((pr) => (
                <li key={pr.id} className="rounded-lg border border-border bg-surface p-3">
                  <a href={`/modules/M16/program/${pr.id}`} className="font-medium text-accent hover:underline">
                    {pr.code} — {pr.department}
                  </a>
                  <span className="ml-2 text-ink-2">{PROGRAM_STATUS_LABEL[pr.status]}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {p.status === "APPROVED" && <NewProgramForm planId={p.id} employees={employees} />}

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
        <PlanActionPanel id={p.id} status={p.status} m16Role={m16Role} />
      </div>
    </div>
  );
}
