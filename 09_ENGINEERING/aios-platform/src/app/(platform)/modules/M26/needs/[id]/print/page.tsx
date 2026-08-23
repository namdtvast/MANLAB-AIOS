import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { NEED_METHOD_LABEL, NEED_STATUS_LABEL, NEED_TRIGGER_LABEL } from "@/lib/m26/labels";
import { fmtDate } from "../../../_ui";
import { PrintFrame, SignatureRow } from "../../../print/PrintFrame";

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="border border-border p-3">
    <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-3">{label}</p>
    <div className="mt-1 whitespace-pre-wrap text-sm text-ink">{children}</div>
  </div>
);

export default async function PrintNeed({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const n = await prisma.m26KnowledgeNeed.findUnique({
    where: { id },
    include: {
      createdBy: true,
      responsible: true,
      decidedBy: true,
      targetItem: { select: { code: true, title: true } },
      resultItem: { select: { code: true, title: true } },
      resultTraining: { select: { code: true } },
    },
  });
  if (!n) notFound();

  return (
    <div className="flex flex-col gap-4">
      <Link href="/modules/M26/needs" className="no-print text-xs text-accent hover:underline">
        ← Nhu cầu tri thức
      </Link>

      <PrintFrame formCode="ETV.P.F 26.03" formName="Phiếu xác định nhu cầu tri thức">
        <p className="text-xs text-ink-3">
          Số phiếu: <strong className="text-ink">{n.code}</strong> · Ngày lập: {fmtDate(n.createdAt)} · Người đề xuất: {n.createdBy.name} ·
          Trạng thái: {NEED_STATUS_LABEL[n.status]}
        </p>

        <Field label="1. Căn cứ phát sinh nhu cầu">
          {NEED_TRIGGER_LABEL[n.trigger]}
          <br />
          Bản ghi/căn cứ dẫn chiếu: {n.triggerRef}
          {n.targetItem && `\nMục tri thức liên quan: ${n.targetItem.code} — ${n.targetItem.title}`}
        </Field>

        <Field label="2. Mô tả nhu cầu">
          {n.description}
          {"\n"}Hạn cần có tri thức: {fmtDate(n.requiredBy)}
        </Field>

        <Field label="3. Hình thức bổ sung và phân công">
          {NEED_METHOD_LABEL[n.method]}
          {"\n"}Người chịu trách nhiệm: {n.responsible.name}
        </Field>

        <Field label="4. Kết quả đầu ra">
          {n.resultItem
            ? `Mục tri thức ${n.resultItem.code} — ${n.resultItem.title}`
            : n.resultTraining
              ? `Hồ sơ đào tạo bên M03: ${n.resultTraining.code}`
              : "Chưa có kết quả — không đóng ở trạng thái Đã đáp ứng được (quy tắc 8)"}
        </Field>

        <Field label="5. Kết luận">
          {NEED_STATUS_LABEL[n.status]}
          {n.decidedBy && `\nNgười quyết định: ${n.decidedBy.name} · ${fmtDate(n.decidedAt)}`}
          {n.reason && `\nLý do: ${n.reason}`}
        </Field>

        <SignatureRow columns={["Người đề xuất", "Người soát xét (QLCL)", "Người phê duyệt (Lãnh đạo Viện)"]} />
        <p className="text-[11px] text-ink-3">Hồ sơ lưu theo ETV.MP15, thời hạn 05 năm sau khi đóng.</p>
      </PrintFrame>
    </div>
  );
}
