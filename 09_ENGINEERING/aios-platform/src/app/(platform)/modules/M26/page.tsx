import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CanCuBanner } from "@/components/CanCuBanner";
import { getViewer } from "@/lib/m26/actor";
import { isDueForReview, visibleConfidentiality } from "@/lib/m26/rules";
import {
  CATEGORY_LABEL,
  CONFIDENTIALITY_LABEL,
  CONFIDENTIALITY_TONE,
  CRITICALITY_LABEL,
  CRITICALITY_TONE,
  ITEM_STATUS_LABEL,
  ITEM_STATUS_TONE,
  KNOWLEDGE_FORM_LABEL,
  M26_ROLE_LABEL,
  REVIEW_CYCLE_LABEL,
} from "@/lib/m26/labels";
import { Badge, fmtDate, th } from "./_ui";
import { StatCard } from "@/components/StatCard";
import { KICH_THUOC_TRANG, PhanTrang, boQua, chotTrang } from "@/components/PhanTrang";

const navLink = "rounded-lg border border-border-strong px-3 py-1.5 text-xs font-semibold text-ink hover:bg-sunk";

export default async function M26ListPage({ searchParams }: { searchParams: Promise<{ loc?: string; trang?: string }> }) {
  const { loc, trang: trangRaw } = await searchParams;
  const viewer = await getViewer();
  const allowed = visibleConfidentiality(viewer.role);

  // Lọc NGAY Ở TẦNG DỮ LIỆU theo mức bảo mật (NFR phân quyền), kèm ngoại lệ cho chủ sở hữu/người giữ.
  const nhinThay = {
    OR: [
      { confidentiality: { in: allowed } },
      ...(viewer.id ? [{ ownerId: viewer.id }, { holders: { some: { userId: viewer.id } } }] : []),
    ],
  };
  // Bộ lọc nông từ thẻ chỉ số: chỉ giữ mục đã đưa vào chỉ mục trợ lý AI.
  const aiOnly = loc === "ai";
  const where = aiOnly ? { AND: [nhinThay, { aiIndexed: true }] } : nhinThay;

  // Thẻ chỉ số đọc TOÀN BỘ mục nhìn thấy được, chỉ lấy các trường cần cho phép tính — bảng thì chỉ
  // lấy đúng một trang. Trước đây cả hai dùng chung một truy vấn `take: 200` nên danh mục vượt 200
  // mục là số liệu trên thẻ sai âm thầm.
  const [tongAll, tong, chiSo] = await Promise.all([
    prisma.m26KnowledgeItem.count(),
    prisma.m26KnowledgeItem.count({ where }),
    prisma.m26KnowledgeItem.findMany({
      where: nhinThay,
      select: {
        status: true,
        reviewCycle: true,
        lastReviewedAt: true,
        approvedAt: true,
        knowledgeForm: true,
        criticality: true,
        aiIndexed: true,
        _count: { select: { holders: true } },
      },
    }),
  ]);

  const hienThi = chiSo.length;
  const hiddenCount = tongAll - hienThi;
  const dueCount = chiSo.filter(
    (i) => i.status === "APPROVED" && isDueForReview(i.reviewCycle, i.lastReviewedAt ?? i.approvedAt),
  ).length;
  const atRiskCount = chiSo.filter(
    (i) => i.knowledgeForm === "TRI_THUC_AN" && i.criticality === "CAO" && i._count.holders <= 1,
  ).length;
  const indexedCount = chiSo.filter((i) => i.aiIndexed).length;

  const trang = chotTrang(trangRaw, tong);
  const listed = await prisma.m26KnowledgeItem.findMany({
    where,
    include: { owner: true, _count: { select: { holders: true, riskLinks: true } } },
    orderBy: [{ status: "asc" }, { code: "asc" }],
    skip: boQua(trang),
    take: KICH_THUOC_TRANG,
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs font-medium text-ink-3">M26 · MP26 · Quản lý tri thức tổ chức</p>
        <h1 className="font-head text-2xl font-bold text-ink">Danh mục tri thức tổ chức</h1>
        <p className="mt-1 text-sm text-ink-2">
          Vai trò M26 của bạn:{" "}
          <strong className="text-ink">{viewer.role ? (M26_ROLE_LABEL[viewer.role] ?? viewer.role) : "Chưa được gán vai trò"}</strong>
        </p>
      </div>

      <CanCuBanner moduleCode="M26" />

      <p className="rounded-lg border border-border bg-surface px-3 py-2 text-xs text-ink-2">
        Danh mục này là <strong>sổ đăng ký</strong>: chỉ lưu tóm tắt và đường dẫn tới nội dung gốc — nội dung thật nằm ở
        08_KNOWLEDGE_GRAPH, M14 (tài liệu), M15 (hồ sơ), M05 (thiết bị).
      </p>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Mục tri thức hiển thị" value={hienThi} href="/modules/M26#muc-tri-thuc" />
        <StatCard
          label="Đến hạn rà soát"
          value={dueCount}
          tone={dueCount > 0 ? "warn" : "good"}
          href="/modules/M26/review-due"
        />
        <StatCard
          label="Rủi ro mất tri thức"
          value={atRiskCount}
          tone={atRiskCount > 0 ? "crit" : "good"}
          href="/modules/M26/knowledge-risk"
        />
        <StatCard
          label="Trong chỉ mục trợ lý AI"
          value={indexedCount}
          href="/modules/M26?loc=ai#muc-tri-thuc"
        />
      </section>

      <section id="muc-tri-thuc" className="flex scroll-mt-24 flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-head text-sm font-bold text-ink">Mục tri thức</h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/modules/M26/lessons" className={navLink}>
              Bài học kinh nghiệm
            </Link>
            <Link href="/modules/M26/needs" className={navLink}>
              Nhu cầu tri thức
            </Link>
            <Link href="/modules/M26/sharing" className={navLink}>
              Chia sẻ tri thức
            </Link>
            <Link href="/modules/M26/knowledge-risk" className={navLink}>
              Rủi ro mất tri thức
            </Link>
            <Link href="/modules/M26/report" className={navLink}>
              Báo cáo cho M17
            </Link>
            <Link href="/modules/M26/print/f26-01" className={navLink}>
              Xuất F26.01
            </Link>
            {(viewer.role === "QLCL" || viewer.role === "TP") && (
              <Link href="/modules/M26/item/new" className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-ink hover:opacity-90">
                + Thêm mục tri thức
              </Link>
            )}
          </div>
        </div>

        {aiOnly && (
          <p className="flex flex-wrap items-center gap-2 text-xs text-ink-2">
            Đang lọc: <strong className="text-ink">Trong chỉ mục trợ lý AI</strong> ({tong} mục)
            <Link href="/modules/M26#muc-tri-thuc" className="font-medium text-accent hover:underline">
              Bỏ lọc
            </Link>
          </p>
        )}

        {hiddenCount > 0 && (
          <p className="text-xs text-ink-3">
            {hiddenCount} mục không hiển thị do vượt mức bảo mật của vai trò hiện tại (ETV.P26 mục 5.1.4).
          </p>
        )}

        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[60rem] text-sm">
            <thead>
              <tr>
                <th className={th}>Mã</th>
                <th className={th}>Tên mục tri thức</th>
                <th className={th}>Nhóm</th>
                <th className={th}>Dạng</th>
                <th className={th}>Trọng yếu</th>
                <th className={th}>Bảo mật</th>
                <th className={th}>Chủ sở hữu</th>
                <th className={th}>Rà soát</th>
                <th className={th}>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {listed.map((i) => {
                const due = i.status === "APPROVED" && isDueForReview(i.reviewCycle, i.lastReviewedAt ?? i.approvedAt);
                return (
                  <tr key={i.id} className="border-b border-border last:border-0 hover:bg-sunk">
                    <td className="px-3 py-2">
                      <Link href={`/modules/M26/item/${i.id}`} className="font-mono text-xs font-medium text-accent hover:underline">
                        {i.code}
                      </Link>
                      {i.version > 1 && <span className="ml-1 text-xs text-ink-3">v{i.version}</span>}
                    </td>
                    <td className="px-3 py-2 text-ink">
                      {i.title}
                      {i.aiIndexed && <span className="ml-2 text-xs text-good">· AI</span>}
                    </td>
                    <td className="px-3 py-2 text-xs text-ink-2">{CATEGORY_LABEL[i.category]}</td>
                    <td className="px-3 py-2 text-xs text-ink-2">
                      {KNOWLEDGE_FORM_LABEL[i.knowledgeForm]}
                      {i.knowledgeForm === "TRI_THUC_AN" && <span className="text-ink-3"> · {i._count.holders} người giữ</span>}
                    </td>
                    <td className="px-3 py-2">
                      <Badge label={CRITICALITY_LABEL[i.criticality]} tone={CRITICALITY_TONE[i.criticality]} />
                    </td>
                    <td className="px-3 py-2">
                      <Badge label={CONFIDENTIALITY_LABEL[i.confidentiality]} tone={CONFIDENTIALITY_TONE[i.confidentiality]} />
                    </td>
                    <td className="px-3 py-2 text-xs text-ink-2">{i.owner.name}</td>
                    <td className="px-3 py-2 text-xs">
                      <span className={due ? "text-crit" : "text-ink-2"}>
                        {REVIEW_CYCLE_LABEL[i.reviewCycle]} · {fmtDate(i.lastReviewedAt ?? i.approvedAt)}
                        {due && " · quá hạn"}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <Badge label={ITEM_STATUS_LABEL[i.status]} tone={ITEM_STATUS_TONE[i.status]} />
                    </td>
                  </tr>
                );
              })}
              {listed.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-3 py-6 text-center text-sm text-ink-3">
                    {aiOnly
                      ? "Chưa có mục tri thức nào nằm trong chỉ mục trợ lý AI."
                      : "Chưa có mục tri thức nào hiển thị với vai trò hiện tại."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <PhanTrang path="/modules/M26" query={{ loc: aiOnly ? "ai" : undefined }} neo="#muc-tri-thuc" trang={trang} tong={tong} donVi="mục tri thức" />
        </div>
      </section>
    </div>
  );
}
