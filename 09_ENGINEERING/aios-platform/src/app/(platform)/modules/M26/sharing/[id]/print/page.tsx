import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CONFIDENTIALITY_LABEL, SHARING_FORM_LABEL, SHARING_STATUS_LABEL } from "@/lib/m26/labels";
import { fmtDate } from "../../../_ui";
import { PrintFrame, SignatureRow } from "../../../print/PrintFrame";

const th = "border border-border px-2 py-1 text-left text-[11px] font-semibold uppercase text-ink-3";
const td = "border border-border px-2 py-1 align-top text-xs text-ink-2";

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="border border-border p-3">
    <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-3">{label}</p>
    <div className="mt-1 whitespace-pre-wrap text-sm text-ink">{children}</div>
  </div>
);

export default async function PrintSharing({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const e = await prisma.m26SharingEvent.findUnique({
    where: { id },
    include: {
      presenter: true,
      createdBy: true,
      evidenceTraining: { select: { code: true } },
      items: { include: { item: { select: { code: true, title: true, confidentiality: true, version: true } } } },
      participants: { include: { user: true } },
    },
  });
  if (!e) notFound();

  return (
    <div className="flex flex-col gap-4">
      <Link href="/modules/M26/sharing" className="no-print text-xs text-accent hover:underline">
        ← Chia sẻ tri thức
      </Link>

      <PrintFrame formCode="ETV.P.F 26.04" formName="Biên bản chia sẻ tri thức">
        <p className="text-xs text-ink-3">
          Số biên bản: <strong className="text-ink">{e.code}</strong> · Thời gian: {fmtDate(e.heldAt)} · Người lập: {e.createdBy.name} · Trạng
          thái: {SHARING_STATUS_LABEL[e.status]}
        </p>

        <Field label="1. Hình thức chia sẻ">
          {SHARING_FORM_LABEL[e.form]}
          {e.form === "DAO_TAO_NOI_BO" &&
            `\nHồ sơ đào tạo dẫn chiếu (ETV.MP03): ${e.evidenceTraining?.code ?? e.evidenceRef ?? "—"}`}
        </Field>

        <Field label="2. Nội dung trình bày">{e.topic}</Field>

        <section>
          <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-3">3. Mục tri thức được chia sẻ</h2>
          <table className="w-full">
            <thead>
              <tr>
                {["TT", "Mã mục", "Tên mục tri thức", "Phiên bản", "Mức bảo mật"].map((h) => (
                  <th key={h} className={th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {e.items.map((si, idx) => (
                <tr key={si.id}>
                  <td className={td}>{idx + 1}</td>
                  <td className={td}>{si.item.code}</td>
                  <td className={td}>{si.item.title}</td>
                  <td className={td}>{si.item.version}</td>
                  <td className={td}>{CONFIDENTIALITY_LABEL[si.item.confidentiality]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <Field label="4. Người trình bày">{e.presenter.name}</Field>

        <section>
          <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-3">5. Danh sách người tham dự</h2>
          <table className="w-full">
            <thead>
              <tr>
                {["TT", "Họ và tên", "Ghi chú", "Chữ ký"].map((h) => (
                  <th key={h} className={th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {e.participants.map((p, idx) => (
                <tr key={p.id}>
                  <td className={td}>{idx + 1}</td>
                  <td className={td}>{p.user.name}</td>
                  <td className={td}>{p.note ?? ""}</td>
                  <td className={`${td} h-10`} />
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-1 text-[11px] text-ink-3">Tổng số người tham dự: {e.participants.length}</p>
        </section>

        {e.handoverNote && <Field label="6. Bàn giao tri thức khi thay đổi nhân sự">{e.handoverNote}</Field>}

        <Field label="7. Ghi nhận hiệu quả và phản hồi">{e.effectivenessNote ?? "—"}</Field>

        <SignatureRow columns={["Người lập biên bản", "Người trình bày", "Trưởng phòng/Người phụ trách"]} />
        <p className="text-[11px] text-ink-3">Biên bản sao gửi Phụ trách Quản lý chất lượng. Hồ sơ lưu theo ETV.MP15, thời hạn 05 năm.</p>
      </PrintFrame>
    </div>
  );
}
