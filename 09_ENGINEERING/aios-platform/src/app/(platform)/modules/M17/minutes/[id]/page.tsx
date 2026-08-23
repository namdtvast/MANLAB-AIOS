import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getM17Role } from "@/lib/m17/actor";
import { ACTION_STATUS_LABEL, REVIEW_TOPICS } from "@/lib/m17/labels";
import { RecordConclusionForm } from "./RecordConclusionForm";
import { NewActionForm } from "./NewActionForm";
import { NewCapaForm } from "./NewCapaForm";
import { MarkDoneButton } from "./MarkDoneButton";

interface TopicResult {
  topicId: number;
  assessmentResult: string;
}

export default async function M17MinutesDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [m, m17Role] = await Promise.all([
    prisma.m17ReviewMinutes.findUnique({
      where: { id },
      include: { plan: true, recordedBy: true, actions: true, capas: true },
    }),
    getM17Role(),
  ]);
  if (!m) notFound();

  const topicResults = m.topicResults as unknown as TopicResult[];
  const now = new Date();

  return (
    <div className="flex max-w-4xl flex-col gap-6">
      <div>
        <p className="font-mono text-xs text-ink-3">{m.code}</p>
        <h1 className="font-head text-2xl font-bold text-ink">Biên bản — {m.plan.title}</h1>
        <p className="mt-1 text-sm text-ink-2">Ngày họp: {m.meetingDate.toLocaleDateString("vi-VN")}</p>
      </div>

      <div className="rounded-xl border border-border bg-surface p-4 text-sm">
        <p className="mb-2 text-ink-3">12 nội dung xem xét</p>
        <ul className="flex flex-col gap-1">
          {topicResults
            .sort((a, b) => a.topicId - b.topicId)
            .map((t) => (
              <li key={t.topicId} className="text-ink">
                <strong>{t.topicId}. {REVIEW_TOPICS.find((r) => r.id === t.topicId)?.label}:</strong> {t.assessmentResult}
              </li>
            ))}
        </ul>
      </div>

      <div className="rounded-xl border border-border bg-surface p-4 text-sm">
        <p className="text-ink-3">Kết luận của LĐV</p>
        <p className="text-ink">{m.conclusion ?? "Chưa có kết luận."}</p>
        {!m.conclusion && <RecordConclusionForm minutesId={m.id} m17Role={m17Role} />}
      </div>

      <section className="flex flex-col gap-2">
        <h2 className="font-head text-sm font-bold text-ink">Theo dõi hành động sau xem xét</h2>
        <ul className="flex flex-col gap-2 text-sm">
          {m.actions.map((a) => {
            const isOverdue = a.status === "DANG_THUC_HIEN" && a.dueDate < now;
            return (
              <li key={a.id} className="rounded-lg border border-border bg-surface p-3">
                <p className="font-mono text-xs text-ink-3">{a.code}</p>
                <p className="text-ink">{a.actionDescription}</p>
                <p className="text-ink-2">
                  Phụ trách: {a.assignedTo} · Hạn: {a.dueDate.toLocaleDateString("vi-VN")} ·{" "}
                  <span className={isOverdue ? "font-semibold text-crit" : ""}>
                    {isOverdue ? "Quá hạn" : ACTION_STATUS_LABEL[a.status]}
                  </span>
                </p>
                {a.status === "DANG_THUC_HIEN" && <MarkDoneButton id={a.id} />}
              </li>
            );
          })}
          {m.actions.length === 0 && <li className="rounded-lg border border-border bg-surface p-3 text-ink-3">Chưa có hành động nào.</li>}
        </ul>
        <NewActionForm minutesId={m.id} />
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-head text-sm font-bold text-ink">Phiếu yêu cầu khắc phục (→ M13)</h2>
        <ul className="flex flex-col gap-2 text-sm">
          {m.capas.map((c) => (
            <li key={c.id} className="rounded-lg border border-border bg-surface p-3">
              <p className="font-mono text-xs text-ink-3">{c.code}</p>
              <p className="text-ink">{c.description}</p>
            </li>
          ))}
          {m.capas.length === 0 && <li className="rounded-lg border border-border bg-surface p-3 text-ink-3">Chưa có phiếu nào.</li>}
        </ul>
        <NewCapaForm minutesId={m.id} />
      </section>

      <p className="text-xs text-ink-3">
        Người ghi biên bản: {m.recordedBy.name} · Vai trò M17 của bạn: <strong className="text-ink">{m17Role ?? "chưa gán"}</strong>
      </p>
    </div>
  );
}
