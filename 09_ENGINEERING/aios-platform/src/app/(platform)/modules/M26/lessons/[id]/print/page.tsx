import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { LESSON_SOURCE_LABEL, LESSON_STATUS_LABEL } from "@/lib/m26/labels";
import { fmtDate } from "../../../_ui";
import { PrintFrame, SignatureRow } from "../../../print/PrintFrame";

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="border border-border p-3">
    <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-3">{label}</p>
    <div className="mt-1 whitespace-pre-wrap text-sm text-ink">{children}</div>
  </div>
);

export default async function PrintLesson({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const l = await prisma.m26LessonLearned.findUnique({
    where: { id },
    include: {
      createdBy: true,
      approvedBy: true,
      knowledgeItem: { select: { code: true, title: true } },
      m13Nc: { select: { code: true } },
    },
  });
  if (!l) notFound();

  return (
    <div className="flex flex-col gap-4">
      <Link href={`/modules/M26/lessons/${id}`} className="no-print text-xs text-accent hover:underline">
        ← Phiếu bài học {l.code}
      </Link>

      <PrintFrame formCode="ETV.P.F 26.02" formName="Phiếu bài học kinh nghiệm">
        <p className="text-xs text-ink-3">
          Số phiếu: <strong className="text-ink">{l.code}</strong> · Ngày lập: {fmtDate(l.createdAt)} · Người lập: {l.createdBy.name} · Trạng
          thái: {LESSON_STATUS_LABEL[l.status]}
        </p>

        <Field label="1. Nguồn phát sinh bài học">
          {LESSON_SOURCE_LABEL[l.sourceType]}
          <br />
          Bản ghi gốc: {l.sourceRef}
          {l.m13Nc && ` (M13: ${l.m13Nc.code})`}
        </Field>

        <Field label="2. Bối cảnh sự việc">{l.context}</Field>

        <Field label="3. Nguyên nhân gốc (đã phân tích tại ETV.MP13)">{l.rootCauseRef ?? "Không áp dụng"}</Field>

        <Field label="4. Bài học rút ra">{l.lesson}</Field>

        <Field label="5. Khuyến nghị — việc nên làm khác đi lần sau">{l.recommendedAction}</Field>

        <Field label="6. Kết tinh thành tri thức tổ chức">
          {l.knowledgeItem ? `${l.knowledgeItem.code} — ${l.knowledgeItem.title}` : "Chưa gắn mục tri thức (không phê duyệt được — quy tắc 7)"}
        </Field>

        <Field label="7. Yêu cầu chia sẻ">{l.shareRequired ? "Có — lập biên bản ETV.P.F26.04 sau khi phê duyệt" : "Không"}</Field>

        <Field label="8. Kết luận">
          {l.status === "DA_PHE_DUYET"
            ? `Đã phê duyệt${l.approvedBy ? ` — ${l.approvedBy.name}, ngày ${fmtDate(l.approvedAt)}` : ""}`
            : LESSON_STATUS_LABEL[l.status]}
          {l.reason && `\nLý do: ${l.reason}`}
        </Field>

        <SignatureRow columns={["Người lập", "Người soát xét (QLCL)", "Người phê duyệt (Lãnh đạo Viện)"]} />
        <p className="text-[11px] text-ink-3">Hồ sơ lưu theo ETV.MP15, thời hạn 10 năm.</p>
      </PrintFrame>
    </div>
  );
}
