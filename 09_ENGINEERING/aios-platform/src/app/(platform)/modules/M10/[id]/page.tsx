import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getM10Role } from "@/lib/m10/actor";
import { RECORD_TYPE_LABEL, RESULT_LABEL, STATUS_LABEL } from "@/lib/m10/labels";
import { ActionPanel } from "./ActionPanel";

export default async function M10DetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [assessment, m10Role] = await Promise.all([
    prisma.m10Assessment.findUnique({
      where: { id },
      include: {
        createdBy: true,
        reviewedBy: true,
        approvedBy: true,
        auditEntries: { orderBy: { ts: "asc" }, include: { actor: true } },
      },
    }),
    getM10Role(),
  ]);

  if (!assessment) notFound();

  return (
    <div className="grid max-w-4xl grid-cols-3 gap-6">
      <div className="col-span-2 flex flex-col gap-4">
        <div>
          <p className="font-mono text-xs text-ink-3">{assessment.code}</p>
          <h1 className="font-head text-2xl font-bold text-ink">{assessment.object}</h1>
          <p className="mt-1 text-sm text-ink-2">
            {RECORD_TYPE_LABEL[assessment.recordType]} · v{assessment.version} ·{" "}
            {STATUS_LABEL[assessment.status]}
            {assessment.result ? ` · ${RESULT_LABEL[assessment.result]}` : ""}
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl border border-border bg-surface p-4 text-sm">
          <dt className="text-ink-3">Kế hoạch</dt>
          <dd className="text-ink">{assessment.planId ?? "—"}</dd>
          <dt className="text-ink-3">Quy trình</dt>
          <dd className="text-ink">{assessment.procedureId ?? "—"}</dd>
          <dt className="text-ink-3">Tiêu chí</dt>
          <dd className="text-ink">{assessment.criteriaId ?? "—"}</dd>
          <dt className="text-ink-3">Nhân sự</dt>
          <dd className="text-ink">{assessment.personnelId ?? "—"}</dd>
          <dt className="text-ink-3">Dữ liệu thô / bằng chứng</dt>
          <dd className="text-ink">
            {assessment.rawData} / {assessment.evidence}
          </dd>
          <dt className="text-ink-3">KPH-CAPA</dt>
          <dd className="text-ink">{assessment.capaId ?? "—"}</dd>
          <dt className="text-ink-3">Người tạo</dt>
          <dd className="text-ink">{assessment.createdBy.name}</dd>
          <dt className="text-ink-3">Người soát xét</dt>
          <dd className="text-ink">{assessment.reviewedBy?.name ?? "—"}</dd>
          <dt className="text-ink-3">Người phê duyệt</dt>
          <dd className="text-ink">{assessment.approvedBy?.name ?? "—"}</dd>
        </dl>

        <div>
          <h2 className="mb-2 font-head text-sm font-bold text-ink">Nhật ký</h2>
          <ul className="flex flex-col gap-2 text-sm">
            {assessment.auditEntries.map((e) => (
              <li key={e.id} className="rounded-lg border border-border bg-surface p-3">
                <p className="text-ink">
                  <span className="text-ink-3">{e.ts.toLocaleString("vi-VN")}</span> · {e.actor.name} ({e.role}) —{" "}
                  {e.action}
                </p>
                {e.reason && <p className="mt-1 text-ink-2">Lý do: {e.reason}</p>}
              </li>
            ))}
            {assessment.auditEntries.length === 0 && (
              <li className="rounded-lg border border-border bg-surface p-3 text-ink-3">
                Chưa có sự kiện nào.
              </li>
            )}
          </ul>
        </div>
      </div>

      <div>
        <ActionPanel id={assessment.id} status={assessment.status} result={assessment.result} capaId={assessment.capaId} m10Role={m10Role} />
      </div>
    </div>
  );
}
