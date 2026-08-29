import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { KICH_THUOC_TRANG, PhanTrang, boQua, chotTrang } from "@/components/PhanTrang";
import { getViewer } from "@/lib/m26/actor";
import { LESSON_SOURCE_LABEL, LESSON_STATUS_LABEL, LESSON_STATUS_TONE } from "@/lib/m26/labels";
import { Badge, fmtDate, th } from "../_ui";
import { NewLessonForm } from "./NewLessonForm";

export default async function LessonsPage({ searchParams }: { searchParams: Promise<{ trang?: string }> }) {
  const { trang: trangRaw } = await searchParams;
  const tong = await prisma.m26LessonLearned.count();
  const trang = chotTrang(trangRaw, tong);
  const viewer = await getViewer();
  const [lessons, items] = await Promise.all([
    prisma.m26LessonLearned.findMany({
      include: { createdBy: true, knowledgeItem: { select: { id: true, code: true } } },
      orderBy: [{ status: "asc" }, { code: "desc" }],
      skip: boQua(trang),
      take: KICH_THUOC_TRANG,
    }),
    prisma.m26KnowledgeItem.findMany({
      where: { status: "APPROVED" },
      select: { id: true, code: true, title: true },
      orderBy: { code: "asc" },
    }),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href="/modules/M26" className="text-xs text-accent hover:underline">
          ← Danh mục tri thức
        </Link>
        <h1 className="mt-1 font-head text-2xl font-bold text-ink">Bài học kinh nghiệm</h1>
        <p className="mt-1 text-sm text-ink-2">
          Biểu mẫu ETV.P.F26.02. Bài học chỉ được phê duyệt khi đã <strong>kết tinh thành mục tri thức</strong> (ETV.P26 mục 5.2.2); việc phân tích
          nguyên nhân gốc thuộc ETV.MP13, M26 chỉ dẫn chiếu.
        </p>
      </div>

      {viewer.role && <NewLessonForm items={items} />}

      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full min-w-[52rem] text-sm">
          <thead>
            <tr>
              <th className={th}>Mã</th>
              <th className={th}>Tên bài học</th>
              <th className={th}>Nguồn phát sinh</th>
              <th className={th}>Bản ghi gốc</th>
              <th className={th}>Mục tri thức</th>
              <th className={th}>Người lập</th>
              <th className={th}>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((l) => (
              <tr key={l.id} className="border-b border-border last:border-0 hover:bg-sunk">
                <td className="px-3 py-2">
                  <Link href={`/modules/M26/lessons/${l.id}`} className="font-mono text-xs font-medium text-accent hover:underline">
                    {l.code}
                  </Link>
                </td>
                <td className="px-3 py-2 text-ink">{l.title}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{LESSON_SOURCE_LABEL[l.sourceType]}</td>
                <td className="px-3 py-2 text-xs text-ink-3">{l.sourceRef}</td>
                <td className="px-3 py-2 text-xs">
                  {l.knowledgeItem ? (
                    <Link href={`/modules/M26/item/${l.knowledgeItem.id}`} className="font-mono text-accent hover:underline">
                      {l.knowledgeItem.code}
                    </Link>
                  ) : (
                    <span className="text-crit">Chưa gắn</span>
                  )}
                </td>
                <td className="px-3 py-2 text-xs text-ink-2">
                  {l.createdBy.name} · {fmtDate(l.createdAt)}
                </td>
                <td className="px-3 py-2">
                  <Badge label={LESSON_STATUS_LABEL[l.status]} tone={LESSON_STATUS_TONE[l.status]} />
                </td>
              </tr>
            ))}
            {lessons.length === 0 && (
              <tr>
                <td colSpan={7} className="px-3 py-6 text-center text-sm text-ink-3">
                  Chưa có phiếu bài học kinh nghiệm nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <PhanTrang path="/modules/M26/lessons" trang={trang} tong={tong} donVi="phiếu" />
      </div>
    </div>
  );
}
