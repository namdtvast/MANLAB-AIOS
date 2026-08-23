import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getViewer } from "@/lib/m26/actor";
import { isDueForReview, overdueCycles, reviewDueDate, TRANSFER_METHODS, visibleConfidentiality } from "@/lib/m26/rules";
import {
  CATEGORY_LABEL,
  CONFIDENTIALITY_LABEL,
  CRITICALITY_LABEL,
  ITEM_STATUS_LABEL,
  KNOWLEDGE_FORM_LABEL,
  ORIGIN_LABEL,
  REVIEW_CYCLE_LABEL,
} from "@/lib/m26/labels";
import { fmtDate } from "../../_ui";
import { PrintFrame, SignatureRow } from "../PrintFrame";

const th = "border border-border px-2 py-1 text-left text-[11px] font-semibold uppercase text-ink-3";
const td = "border border-border px-2 py-1 align-top text-xs text-ink-2";

// F26.01 — Danh mục tri thức tổ chức. Bố cục bám biểu mẫu gốc:
// 1) danh mục · 2) bảng rủi ro mất tri thức · 3) mục đến hạn/quá hạn rà soát · 4) mục hết hiệu lực.
export default async function PrintF2601() {
  const viewer = await getViewer();
  const allowed = visibleConfidentiality(viewer.role);

  const items = await prisma.m26KnowledgeItem.findMany({
    where: {
      OR: [{ confidentiality: { in: allowed } }, ...(viewer.id ? [{ ownerId: viewer.id }] : [])],
    },
    include: {
      owner: true,
      document: { select: { code: true } },
      holders: { include: { user: true } },
      riskLinks: { include: { risk: { select: { code: true } } } },
      targetedBy: { select: { code: true, method: true, status: true } },
      supersededBy: { select: { code: true } },
    },
    orderBy: { code: "asc" },
  });

  const approved = items.filter((i) => i.status === "APPROVED");
  const due = approved
    .map((i) => ({ i, from: i.lastReviewedAt ?? i.approvedAt }))
    .filter((r) => isDueForReview(r.i.reviewCycle, r.from));
  const atRisk = items.filter(
    (i) => i.knowledgeForm === "TRI_THUC_AN" && i.criticality === "CAO" && i.holders.length <= 1 && i.status !== "CANCELLED",
  );
  const retired = items.filter((i) => i.status === "RETIRED");

  return (
    <div className="flex flex-col gap-4">
      <Link href="/modules/M26" className="no-print text-xs text-accent hover:underline">
        ← Danh mục tri thức
      </Link>

      <PrintFrame formCode="ETV.P.F 26.01" formName="Danh mục tri thức tổ chức">
        <p className="text-xs text-ink-3">
          Kỳ báo cáo: từ ..../..../........ đến ..../..../........ · Đơn vị lập: ......................................
          <br />
          Nguyên tắc: danh mục là <strong>sổ đăng ký</strong> — cột &quot;Nguồn nội dung gốc&quot; ghi đường dẫn tới nơi lưu nội dung
          thật, không chép toàn văn tài liệu.
        </p>

        <section>
          <h2 className="mb-2 font-head text-sm font-bold text-ink">1. Danh mục mục tri thức</h2>
          <table className="w-full">
            <thead>
              <tr>
                {["TT", "Mã", "Tên mục tri thức", "Nhóm", "Dạng", "Nguồn gốc", "Nguồn nội dung gốc / Tài liệu M14", "Người giữ", "Chủ sở hữu", "Trọng yếu", "Bảo mật", "Chu kỳ", "Rà soát gần nhất", "Chỉ mục AI", "PB", "Trạng thái"].map(
                  (h) => (
                    <th key={h} className={th}>
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {items.map((i, idx) => (
                <tr key={i.id}>
                  <td className={td}>{idx + 1}</td>
                  <td className={td}>{i.code}</td>
                  <td className={td}>{i.title}</td>
                  <td className={td}>{CATEGORY_LABEL[i.category]}</td>
                  <td className={td}>{KNOWLEDGE_FORM_LABEL[i.knowledgeForm]}</td>
                  <td className={td}>{ORIGIN_LABEL[i.origin]}</td>
                  <td className={td}>{i.document ? `M14: ${i.document.code}` : (i.sourceRef ?? "—")}</td>
                  <td className={td}>{i.holders.map((h) => h.user.name).join(", ") || "—"}</td>
                  <td className={td}>{i.owner.name}</td>
                  <td className={td}>{CRITICALITY_LABEL[i.criticality]}</td>
                  <td className={td}>{CONFIDENTIALITY_LABEL[i.confidentiality]}</td>
                  <td className={td}>{REVIEW_CYCLE_LABEL[i.reviewCycle]}</td>
                  <td className={td}>{fmtDate(i.lastReviewedAt ?? i.approvedAt)}</td>
                  <td className={td}>{i.aiIndexed ? "x" : ""}</td>
                  <td className={td}>{i.version}</td>
                  <td className={td}>{ITEM_STATUS_LABEL[i.status]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2 className="mb-2 font-head text-sm font-bold text-ink">2. Bảng rủi ro mất tri thức trọng yếu</h2>
          <p className="mb-2 text-xs text-ink-3">
            Mục trọng yếu Cao, dạng tri thức ẩn, số người giữ ≤ 1 — theo ETV.P26 mục 5.1.6 phải mở rủi ro tại ETV.MP01 và lập phiếu F26.03
            chuyển giao trước khi được phê duyệt.
          </p>
          <table className="w-full">
            <thead>
              <tr>
                {["TT", "Mã mục", "Tên mục tri thức", "Người giữ duy nhất", "Mã rủi ro (MP01)", "Phiếu chuyển giao (F26.03)", "Trạng thái"].map((h) => (
                  <th key={h} className={th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {atRisk.map((i, idx) => (
                <tr key={i.id}>
                  <td className={td}>{idx + 1}</td>
                  <td className={td}>{i.code}</td>
                  <td className={td}>{i.title}</td>
                  <td className={td}>{i.holders.map((h) => h.user.name).join(", ") || "Chưa ghi nhận"}</td>
                  <td className={td}>{i.riskLinks.map((l) => l.risk.code).join(", ") || "Chưa mở rủi ro"}</td>
                  <td className={td}>
                    {i.targetedBy
                      .filter((n) => (TRANSFER_METHODS as readonly string[]).includes(n.method) && n.status !== "KHONG_THUC_HIEN")
                      .map((n) => n.code)
                      .join(", ") || "Chưa có phiếu"}
                  </td>
                  <td className={td}>{ITEM_STATUS_LABEL[i.status]}</td>
                </tr>
              ))}
              {atRisk.length === 0 && (
                <tr>
                  <td className={td} colSpan={7}>
                    Không có tri thức trọng yếu nào đang phụ thuộc một người.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        <section>
          <h2 className="mb-2 font-head text-sm font-bold text-ink">3. Mục đến hạn/quá hạn rà soát trong kỳ</h2>
          <table className="w-full">
            <thead>
              <tr>
                {["TT", "Mã mục", "Tên mục tri thức", "Chủ sở hữu", "Hạn rà soát", "Số chu kỳ quá hạn", "Kết quả rà soát"].map((h) => (
                  <th key={h} className={th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {due.map(({ i, from }, idx) => (
                <tr key={i.id}>
                  <td className={td}>{idx + 1}</td>
                  <td className={td}>{i.code}</td>
                  <td className={td}>{i.title}</td>
                  <td className={td}>{i.owner.name}</td>
                  <td className={td}>{fmtDate(reviewDueDate(i.reviewCycle, from))}</td>
                  <td className={td}>{overdueCycles(i.reviewCycle, from)}</td>
                  <td className={td} />
                </tr>
              ))}
              {due.length === 0 && (
                <tr>
                  <td className={td} colSpan={7}>
                    Không có mục nào quá hạn rà soát.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        <section>
          <h2 className="mb-2 font-head text-sm font-bold text-ink">4. Mục chuyển hết hiệu lực trong kỳ</h2>
          <table className="w-full">
            <thead>
              <tr>
                {["TT", "Mã mục", "Tên mục tri thức", "Lý do", "Phiên bản thay thế", "Ngày hết hiệu lực", "Đã gỡ chỉ mục AI"].map((h) => (
                  <th key={h} className={th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {retired.map((i, idx) => (
                <tr key={i.id}>
                  <td className={td}>{idx + 1}</td>
                  <td className={td}>{i.code}</td>
                  <td className={td}>{i.title}</td>
                  <td className={td}>{i.reason ?? "—"}</td>
                  <td className={td}>{i.supersededBy?.code ?? "—"}</td>
                  <td className={td}>{fmtDate(i.retiredAt)}</td>
                  <td className={td}>{i.aiIndexed ? "Chưa" : "Rồi"}</td>
                </tr>
              ))}
              {retired.length === 0 && (
                <tr>
                  <td className={td} colSpan={7}>
                    Không có mục nào hết hiệu lực trong kỳ.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        <SignatureRow columns={["Người lập (QLCL/TP)", "Người soát xét (TP lĩnh vực)", "Người phê duyệt (Lãnh đạo Viện)"]} />
      </PrintFrame>
    </div>
  );
}
