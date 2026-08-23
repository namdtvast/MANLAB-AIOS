import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getM03Role } from "@/lib/m03/actor";
import { TRAINING_PLAN_TYPE_LABEL, TRAINING_RESULT_LABEL, TRAINING_STATUS_LABEL } from "@/lib/m03/labels";
import { TrainingActionPanel } from "./ActionPanel";

export default async function M03TrainingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [record, m03Role] = await Promise.all([
    prisma.m03TrainingRecord.findUnique({
      where: { id },
      include: { trainingPlan: true, employee: true, approvedBy: true },
    }),
    getM03Role(),
  ]);
  if (!record) notFound();

  const auditEntries = await prisma.m03AuditEntry.findMany({
    where: { itemType: "TRAINING_RECORD", itemId: id },
    orderBy: { ts: "asc" },
    include: { actor: true },
  });

  return (
    <div className="grid max-w-4xl grid-cols-3 gap-6">
      <div className="col-span-2 flex flex-col gap-4">
        <div>
          <p className="font-mono text-xs text-ink-3">{record.code}</p>
          <h1 className="font-head text-2xl font-bold text-ink">Kết quả đào tạo — {record.employee.fullName}</h1>
          <p className="mt-1 text-sm text-ink-2">
            {TRAINING_PLAN_TYPE_LABEL[record.trainingPlan.planType]} · {TRAINING_STATUS_LABEL[record.status]}
            {record.result ? ` · ${TRAINING_RESULT_LABEL[record.result]}` : ""}
          </p>
        </div>

        {record.trainingPlan.content.length > 0 && (
          <div className="rounded-xl border border-border bg-surface p-4 text-sm">
            <p className="mb-2 text-ink-3">Nội dung đào tạo (kế hoạch)</p>
            <ul className="list-inside list-disc text-ink">
              {record.trainingPlan.content.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        )}

        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl border border-border bg-surface p-4 text-sm">
          <dt className="text-ink-3">Phương pháp đánh giá</dt>
          <dd className="text-ink">{record.assessmentMethod ?? "—"}</dd>
          <dt className="text-ink-3">Bằng chứng</dt>
          <dd className="text-ink">{record.evidence ?? "—"}</dd>
          <dt className="text-ink-3">Người phê duyệt</dt>
          <dd className="text-ink">{record.approvedBy?.name ?? "—"}</dd>
        </dl>

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
        <TrainingActionPanel
          id={record.id}
          status={record.status}
          m03Role={m03Role}
          conditions={{
            c1AttendedAllContent: record.c1AttendedAllContent,
            c2FollowedRules: record.c2FollowedRules,
            c3CanPerformWork: record.c3CanPerformWork,
            c4RecordsComplete: record.c4RecordsComplete,
            c5AssessmentPassed: record.c5AssessmentPassed,
            c6EvidenceSufficient: record.c6EvidenceSufficient,
          }}
          assessmentMethod={record.assessmentMethod ?? ""}
          evidence={record.evidence ?? ""}
        />
      </div>
    </div>
  );
}
