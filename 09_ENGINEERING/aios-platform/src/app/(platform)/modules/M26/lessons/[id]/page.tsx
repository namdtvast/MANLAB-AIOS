import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getViewer } from "@/lib/m26/actor";
import { LESSON_SOURCE_LABEL, LESSON_STATUS_LABEL, LESSON_STATUS_TONE } from "@/lib/m26/labels";
import { Badge, fmtDate, th } from "../../_ui";
import { LessonActionPanel } from "./LessonActionPanel";

export default async function LessonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const viewer = await getViewer();

  const lesson = await prisma.m26LessonLearned.findUnique({
    where: { id },
    include: {
      createdBy: true,
      approvedBy: true,
      knowledgeItem: { select: { id: true, code: true, title: true } },
      m13Nc: { select: { code: true } },
    },
  });
  if (!lesson) notFound();

  const [items, audit] = await Promise.all([
    prisma.m26KnowledgeItem.findMany({
      where: { status: "APPROVED" },
      select: { id: true, code: true, title: true },
      orderBy: { code: "asc" },
    }),
    prisma.m26AuditEntry.findMany({ where: { itemType: "LESSON", itemId: id }, include: { actor: true }, orderBy: { ts: "desc" }, take: 20 }),
  ]);

  const rows: [string, React.ReactNode][] = [
    ["Nguồn phát sinh", LESSON_SOURCE_LABEL[lesson.sourceType]],
    ["Bản ghi gốc", lesson.m13Nc ? `${lesson.sourceRef} (M13: ${lesson.m13Nc.code})` : lesson.sourceRef],
    ["Nguyên nhân gốc (M13)", lesson.rootCauseRef ?? "—"],
    [
      "Mục tri thức kết tinh",
      lesson.knowledgeItem ? (
        <Link key="k" href={`/modules/M26/item/${lesson.knowledgeItem.id}`} className="text-accent hover:underline">
          {lesson.knowledgeItem.code} — {lesson.knowledgeItem.title}
        </Link>
      ) : (
        <span className="text-crit">Chưa gắn — không phê duyệt được (quy tắc 7)</span>
      ),
    ],
    ["Cần chia sẻ rộng", lesson.shareRequired ? "Có" : "Không"],
    ["Người lập", `${lesson.createdBy.name} · ${fmtDate(lesson.createdAt)}`],
    ["Người phê duyệt", lesson.approvedBy ? `${lesson.approvedBy.name} · ${fmtDate(lesson.approvedAt)}` : "—"],
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href="/modules/M26/lessons" className="text-xs text-accent hover:underline">
          ← Bài học kinh nghiệm
        </Link>
        <div className="mt-1 flex flex-wrap items-center gap-3">
          <h1 className="font-head text-2xl font-bold text-ink">{lesson.title}</h1>
          <Badge label={LESSON_STATUS_LABEL[lesson.status]} tone={LESSON_STATUS_TONE[lesson.status]} />
        </div>
        <p className="mt-1 font-mono text-xs text-ink-3">
          {lesson.code} ·{" "}
          <Link href={`/modules/M26/lessons/${lesson.id}/print`} className="font-sans text-accent hover:underline">
            Xuất biểu mẫu F26.02
          </Link>
        </p>
        {lesson.reason && <p className="mt-2 rounded-lg border border-warn/30 bg-warn-soft px-3 py-2 text-sm text-warn">Lý do: {lesson.reason}</p>}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="flex flex-col gap-6">
          <section className="overflow-x-auto rounded-xl border border-border bg-surface">
            <table className="w-full text-sm">
              <tbody>
                {rows.map(([k, v]) => (
                  <tr key={k} className="border-b border-border last:border-0">
                    <td className="w-52 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-ink-3">{k}</td>
                    <td className="px-3 py-2 text-ink-2">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {[
            ["Bối cảnh sự việc", lesson.context],
            ["Bài học rút ra", lesson.lesson],
            ["Khuyến nghị", lesson.recommendedAction],
          ].map(([title, body]) => (
            <section key={title} className="rounded-xl border border-border bg-surface p-4">
              <h2 className="font-head text-sm font-bold text-ink">{title}</h2>
              <p className="mt-2 whitespace-pre-wrap text-sm text-ink-2">{body}</p>
            </section>
          ))}

          <section className="flex flex-col gap-2">
            <h2 className="font-head text-sm font-bold text-ink">Nhật ký</h2>
            <div className="overflow-x-auto rounded-xl border border-border bg-surface">
              <table className="w-full min-w-[36rem] text-sm">
                <thead>
                  <tr>
                    <th className={th}>Thời điểm</th>
                    <th className={th}>Người thực hiện</th>
                    <th className={th}>Hành động</th>
                    <th className={th}>Lý do</th>
                  </tr>
                </thead>
                <tbody>
                  {audit.map((a) => (
                    <tr key={a.id} className="border-b border-border last:border-0">
                      <td className="px-3 py-2 text-xs text-ink-3">{new Date(a.ts).toLocaleString("vi-VN")}</td>
                      <td className="px-3 py-2 text-xs text-ink-2">
                        {a.actor.name} <span className="text-ink-3">({a.role})</span>
                      </td>
                      <td className="px-3 py-2 text-ink-2">{a.action}</td>
                      <td className="px-3 py-2 text-xs text-ink-3">{a.reason ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <LessonActionPanel
          id={lesson.id}
          status={lesson.status}
          role={viewer.role}
          items={items}
          current={{
            title: lesson.title,
            sourceType: lesson.sourceType,
            sourceRef: lesson.sourceRef,
            context: lesson.context,
            rootCauseRef: lesson.rootCauseRef ?? undefined,
            lesson: lesson.lesson,
            recommendedAction: lesson.recommendedAction,
            shareRequired: lesson.shareRequired,
            knowledgeItemId: lesson.knowledgeItemId ?? undefined,
          }}
        />
      </div>
    </div>
  );
}
