import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getViewer } from "@/lib/m26/actor";
import { isDueForReview, isNeedOverdue, overdueCycles, TRANSFER_METHODS, visibleConfidentiality } from "@/lib/m26/rules";
import {
  CATEGORY_LABEL,
  CONFIDENTIALITY_LABEL,
  CRITICALITY_LABEL,
  LESSON_SOURCE_LABEL,
  NEED_METHOD_LABEL,
  NEED_STATUS_LABEL,
  SHARING_FORM_LABEL,
} from "@/lib/m26/labels";
import { fmtDate, th } from "../_ui";

const Section = ({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) => (
  <section className="flex flex-col gap-2">
    <h2 className="font-head text-sm font-bold text-ink">{title}</h2>
    {note && <p className="text-xs text-ink-3">{note}</p>}
    <div className="overflow-x-auto rounded-xl border border-border bg-surface">{children}</div>
  </section>
);

// Báo cáo tình hình tri thức tổ chức — đầu vào bắt buộc của ETV.MP17 (Xem xét của lãnh đạo),
// theo ETV.P26 mục 5.6. Kỳ mặc định: 6 tháng gần nhất, đổi được qua ?months=
export default async function KnowledgeReportPage({ searchParams }: { searchParams: Promise<{ months?: string }> }) {
  const { months } = await searchParams;
  const periodMonths = Number(months) > 0 ? Number(months) : 6;
  const from = new Date();
  from.setMonth(from.getMonth() - periodMonths);

  const viewer = await getViewer();
  const allowed = visibleConfidentiality(viewer.role);
  const visible = { OR: [{ confidentiality: { in: allowed } }, ...(viewer.id ? [{ ownerId: viewer.id }] : [])] };

  const [approvedInPeriod, retiredInPeriod, allApproved, lessons, needs, sharings, atRisk] = await Promise.all([
    prisma.m26KnowledgeItem.findMany({
      where: { ...visible, status: "APPROVED", approvedAt: { gte: from } },
      include: { owner: true },
      orderBy: { approvedAt: "desc" },
    }),
    prisma.m26KnowledgeItem.findMany({
      where: { ...visible, status: "RETIRED", retiredAt: { gte: from } },
      include: { supersededBy: { select: { code: true } } },
      orderBy: { retiredAt: "desc" },
    }),
    prisma.m26KnowledgeItem.findMany({ where: { ...visible, status: "APPROVED" }, include: { owner: true } }),
    prisma.m26LessonLearned.findMany({
      where: { createdAt: { gte: from } },
      include: { knowledgeItem: { select: { code: true } } },
      orderBy: { code: "asc" },
    }),
    prisma.m26KnowledgeNeed.findMany({
      where: { status: { in: ["MO", "DANG_BO_SUNG"] } },
      include: { responsible: true },
      orderBy: { requiredBy: "asc" },
    }),
    prisma.m26SharingEvent.findMany({
      where: { heldAt: { gte: from }, status: "DA_THUC_HIEN" },
      include: { presenter: true, _count: { select: { participants: true, items: true } } },
      orderBy: { heldAt: "desc" },
    }),
    prisma.m26KnowledgeItem.findMany({
      where: { ...visible, knowledgeForm: "TRI_THUC_AN", criticality: "CAO", status: { notIn: ["CANCELLED", "RETIRED"] } },
      include: {
        owner: true,
        holders: { include: { user: true } },
        riskLinks: { include: { risk: { select: { code: true } } } },
        targetedBy: { select: { code: true, method: true, status: true } },
      },
    }),
  ]);

  const due = allApproved.filter((i) => isDueForReview(i.reviewCycle, i.lastReviewedAt ?? i.approvedAt));
  const overdue2 = due.filter((i) => overdueCycles(i.reviewCycle, i.lastReviewedAt ?? i.approvedAt) >= 2);
  const singlePoint = atRisk.filter((i) => i.holders.length <= 1);
  const approvedLessons = lessons.filter((l) => l.status === "DA_PHE_DUYET");
  const pendingLessons = lessons.filter((l) => l.status !== "DA_PHE_DUYET" && l.status !== "HUY");
  const lateNeeds = needs.filter((n) => isNeedOverdue(n));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href="/modules/M26" className="text-xs text-accent hover:underline">
          ← Danh mục tri thức
        </Link>
        <h1 className="mt-1 font-head text-2xl font-bold text-ink">Báo cáo tình hình tri thức tổ chức</h1>
        <p className="mt-1 text-sm text-ink-2">
          Đầu vào bắt buộc của <strong>ETV.MP17 — Xem xét của lãnh đạo</strong> theo ETV.P26 mục 5.6. Kỳ báo cáo: {periodMonths} tháng gần nhất
          (từ {fmtDate(from)}). Bảng rủi ro mất tri thức đồng thời là đầu vào của ETV.MP01.
        </p>
        <div className="mt-2 flex gap-2 text-xs">
          {[3, 6, 12].map((m) => (
            <Link
              key={m}
              href={`/modules/M26/report?months=${m}`}
              className={`rounded-lg border px-2.5 py-1 ${m === periodMonths ? "border-accent-line text-accent" : "border-border-strong text-ink-2 hover:bg-sunk"}`}
            >
              {m} tháng
            </Link>
          ))}
          <Link href="/modules/M26/print/f26-01" className="rounded-lg border border-border-strong px-2.5 py-1 text-ink-2 hover:bg-sunk">
            Xuất F26.01
          </Link>
        </div>
      </div>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Tri thức mới phê duyệt", value: approvedInPeriod.length },
          { label: "Mục hết hiệu lực", value: retiredInPeriod.length },
          { label: "Quá hạn rà soát", value: due.length },
          { label: "Quá 2 chu kỳ — báo LĐV", value: overdue2.length },
          { label: "Bài học đã kết tinh", value: approvedLessons.length },
          { label: "Bài học đang xử lý", value: pendingLessons.length },
          { label: "Nhu cầu chưa đáp ứng", value: needs.length },
          { label: "Rủi ro mất tri thức", value: singlePoint.length },
        ].map((c) => (
          <div key={c.label} className="rounded-xl border border-border bg-surface px-4 py-3">
            <p className="text-xs text-ink-3">{c.label}</p>
            <p className="mt-1 font-head text-xl font-bold text-ink">{c.value}</p>
          </div>
        ))}
      </section>

      <Section title="1. Tri thức mới được phê duyệt trong kỳ">
        <table className="w-full min-w-[40rem] text-sm">
          <thead>
            <tr>
              <th className={th}>Mã</th>
              <th className={th}>Tên mục tri thức</th>
              <th className={th}>Nhóm</th>
              <th className={th}>Trọng yếu</th>
              <th className={th}>Bảo mật</th>
              <th className={th}>Ngày phê duyệt</th>
            </tr>
          </thead>
          <tbody>
            {approvedInPeriod.map((i) => (
              <tr key={i.id} className="border-b border-border last:border-0">
                <td className="px-3 py-2 font-mono text-xs text-ink-2">{i.code}</td>
                <td className="px-3 py-2 text-ink">{i.title}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{CATEGORY_LABEL[i.category]}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{CRITICALITY_LABEL[i.criticality]}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{CONFIDENTIALITY_LABEL[i.confidentiality]}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{fmtDate(i.approvedAt)}</td>
              </tr>
            ))}
            {approvedInPeriod.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-4 text-center text-sm text-ink-3">
                  Không có mục tri thức nào được phê duyệt trong kỳ.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Section>

      <Section title="2. Mục hết hiệu lực trong kỳ" note="Mục hết hiệu lực tự rời chỉ mục trợ lý AI trong cùng giao dịch (ETV.P26 mục 5.5).">
        <table className="w-full min-w-[40rem] text-sm">
          <thead>
            <tr>
              <th className={th}>Mã</th>
              <th className={th}>Tên mục tri thức</th>
              <th className={th}>Lý do</th>
              <th className={th}>Thay thế bởi</th>
              <th className={th}>Ngày</th>
            </tr>
          </thead>
          <tbody>
            {retiredInPeriod.map((i) => (
              <tr key={i.id} className="border-b border-border last:border-0">
                <td className="px-3 py-2 font-mono text-xs text-ink-2">{i.code}</td>
                <td className="px-3 py-2 text-ink">{i.title}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{i.reason ?? "—"}</td>
                <td className="px-3 py-2 font-mono text-xs text-ink-2">{i.supersededBy?.code ?? "—"}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{fmtDate(i.retiredAt)}</td>
              </tr>
            ))}
            {retiredInPeriod.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-4 text-center text-sm text-ink-3">
                  Không có mục nào hết hiệu lực trong kỳ.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Section>

      <Section title="3. Mục quá hạn rà soát" note="Quá 2 chu kỳ liên tiếp phải nêu đích danh trước Lãnh đạo Viện (ETV.P26 mục 5.1.5).">
        <table className="w-full min-w-[40rem] text-sm">
          <thead>
            <tr>
              <th className={th}>Mã</th>
              <th className={th}>Tên mục tri thức</th>
              <th className={th}>Chủ sở hữu</th>
              <th className={th}>Rà soát gần nhất</th>
              <th className={th}>Số chu kỳ quá hạn</th>
            </tr>
          </thead>
          <tbody>
            {due.map((i) => (
              <tr key={i.id} className="border-b border-border last:border-0">
                <td className="px-3 py-2 font-mono text-xs text-ink-2">{i.code}</td>
                <td className="px-3 py-2 text-ink">{i.title}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{i.owner.name}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{fmtDate(i.lastReviewedAt ?? i.approvedAt)}</td>
                <td className={`px-3 py-2 text-xs ${overdueCycles(i.reviewCycle, i.lastReviewedAt ?? i.approvedAt) >= 2 ? "text-crit" : "text-ink-2"}`}>
                  {overdueCycles(i.reviewCycle, i.lastReviewedAt ?? i.approvedAt)}
                </td>
              </tr>
            ))}
            {due.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-4 text-center text-sm text-ink-3">
                  Không có mục nào quá hạn rà soát.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Section>

      <Section title="4. Bài học kinh nghiệm trong kỳ">
        <table className="w-full min-w-[40rem] text-sm">
          <thead>
            <tr>
              <th className={th}>Mã</th>
              <th className={th}>Tên bài học</th>
              <th className={th}>Nguồn phát sinh</th>
              <th className={th}>Mục tri thức</th>
              <th className={th}>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((l) => (
              <tr key={l.id} className="border-b border-border last:border-0">
                <td className="px-3 py-2 font-mono text-xs text-ink-2">{l.code}</td>
                <td className="px-3 py-2 text-ink">{l.title}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{LESSON_SOURCE_LABEL[l.sourceType]}</td>
                <td className="px-3 py-2 font-mono text-xs text-ink-2">{l.knowledgeItem?.code ?? "—"}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{l.status}</td>
              </tr>
            ))}
            {lessons.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-4 text-center text-sm text-ink-3">
                  Không có bài học nào phát sinh trong kỳ.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Section>

      <Section title="5. Nhu cầu tri thức chưa đáp ứng" note={`${lateNeeds.length} phiếu đã quá hạn — thuộc nội dung phải báo cáo Lãnh đạo Viện.`}>
        <table className="w-full min-w-[40rem] text-sm">
          <thead>
            <tr>
              <th className={th}>Mã</th>
              <th className={th}>Mô tả</th>
              <th className={th}>Hình thức</th>
              <th className={th}>Phụ trách</th>
              <th className={th}>Hạn</th>
              <th className={th}>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {needs.map((n) => (
              <tr key={n.id} className="border-b border-border last:border-0">
                <td className="px-3 py-2 font-mono text-xs text-ink-2">{n.code}</td>
                <td className="max-w-sm px-3 py-2 text-sm text-ink-2">{n.description}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{NEED_METHOD_LABEL[n.method]}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{n.responsible.name}</td>
                <td className={`px-3 py-2 text-xs ${isNeedOverdue(n) ? "text-crit" : "text-ink-2"}`}>{fmtDate(n.requiredBy)}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{NEED_STATUS_LABEL[n.status]}</td>
              </tr>
            ))}
            {needs.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-4 text-center text-sm text-ink-3">
                  Không còn nhu cầu tri thức nào đang mở.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Section>

      <Section title="6. Hoạt động chia sẻ tri thức đã thực hiện">
        <table className="w-full min-w-[40rem] text-sm">
          <thead>
            <tr>
              <th className={th}>Mã</th>
              <th className={th}>Hình thức</th>
              <th className={th}>Nội dung</th>
              <th className={th}>Người trình bày</th>
              <th className={th}>Số mục / người dự</th>
              <th className={th}>Ngày</th>
            </tr>
          </thead>
          <tbody>
            {sharings.map((e) => (
              <tr key={e.id} className="border-b border-border last:border-0">
                <td className="px-3 py-2 font-mono text-xs text-ink-2">{e.code}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{SHARING_FORM_LABEL[e.form]}</td>
                <td className="max-w-sm px-3 py-2 text-sm text-ink">{e.topic}</td>
                <td className="px-3 py-2 text-xs text-ink-2">{e.presenter.name}</td>
                <td className="px-3 py-2 text-xs text-ink-2">
                  {e._count.items} / {e._count.participants}
                </td>
                <td className="px-3 py-2 text-xs text-ink-2">{fmtDate(e.heldAt)}</td>
              </tr>
            ))}
            {sharings.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-4 text-center text-sm text-ink-3">
                  Chưa có hoạt động chia sẻ nào được ghi nhận trong kỳ.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Section>

      <Section title="7. Rủi ro mất tri thức trọng yếu" note="Đầu vào của ETV.MP01 — tri thức ẩn mức Cao đang phụ thuộc một người.">
        <table className="w-full min-w-[40rem] text-sm">
          <thead>
            <tr>
              <th className={th}>Mã</th>
              <th className={th}>Tên mục tri thức</th>
              <th className={th}>Người giữ</th>
              <th className={th}>Rủi ro M01</th>
              <th className={th}>Nhu cầu chuyển giao</th>
            </tr>
          </thead>
          <tbody>
            {singlePoint.map((i) => {
              const transfer = i.targetedBy.filter(
                (n) => (TRANSFER_METHODS as readonly string[]).includes(n.method) && n.status !== "KHONG_THUC_HIEN",
              );
              return (
                <tr key={i.id} className="border-b border-border last:border-0">
                  <td className="px-3 py-2 font-mono text-xs text-ink-2">{i.code}</td>
                  <td className="px-3 py-2 text-ink">{i.title}</td>
                  <td className="px-3 py-2 text-xs text-ink-2">{i.holders.map((h) => h.user.name).join(", ") || "Chưa ghi nhận"}</td>
                  <td className="px-3 py-2 text-xs text-ink-2">{i.riskLinks.map((l) => l.risk.code).join(", ") || "—"}</td>
                  <td className="px-3 py-2 text-xs text-ink-2">{transfer.map((n) => n.code).join(", ") || "—"}</td>
                </tr>
              );
            })}
            {singlePoint.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-4 text-center text-sm text-ink-3">
                  Không có tri thức trọng yếu nào đang phụ thuộc một người.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Section>
    </div>
  );
}
