import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getM28Role } from "@/lib/m28/actor";
import { requiredApprover } from "@/lib/m28/rules";
import {
  ACCESS_STATUS_LABEL,
  ACCESS_STATUS_TONE,
  REQUEST_TYPE_LABEL,
  REVIEW_SCOPE_LABEL,
  SUBJECT_TYPE_LABEL,
} from "@/lib/m28/labels";
import { CLASSIFICATION_LABEL } from "@/lib/m34/labels";

const TONE_CLASS: Record<string, string> = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  crit: "bg-crit-soft text-crit",
  neutral: "bg-sunk text-ink-2",
};

const th =
  "border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3";

interface AccessItem {
  heThong: string;
  vaiTro: string;
  isPrivileged: boolean;
  mucPhanLoai: string;
  validUntil: string;
}

export default async function M28AccessPage() {
  const [requests, reviews, role] = await Promise.all([
    prisma.m28AccessRequest.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        subject: { select: { name: true } },
        requestedBy: { select: { name: true } },
        approvedBy: { select: { name: true } },
        executedBy: { select: { name: true } },
      },
    }),
    prisma.m28AccessReview.findMany({
      orderBy: { reviewedAt: "desc" },
      include: { reviewer: { select: { name: true } } },
    }),
    getM28Role(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M28 · Biểu mẫu ETV.P.F 28.04</p>
        <h1 className="font-head text-2xl font-bold text-ink">Định danh và quản lý truy cập</h1>
        <p className="mt-1 text-sm text-ink-2">
          Ba vai trò <strong>đề nghị ≠ phê duyệt ≠ thực hiện</strong> phải khác nhau; QTHT không tự phê duyệt quyền
          của chính mình (ETV.P28 mục 6.7.1, 5.3).
        </p>
      </div>

      <Link href="/modules/M28" className="text-xs text-accent hover:underline">
        ← Hồ sơ rủi ro an toàn thông tin
      </Link>

      <div className="rounded-lg border border-border bg-sunk px-3 py-2 text-xs text-ink-2">
        <strong>Thẩm quyền phê duyệt</strong>: tài khoản đặc quyền, hệ thống chứa thông tin mức Hạn chế/Mật, hoặc cấp
        cho nhà cung cấp công nghệ thông tin thì <strong>bắt buộc LĐV</strong>; còn lại PT.ATTT phê duyệt. Bắt buộc
        MFA với tài khoản quản trị, truy cập từ xa, thư điện tử công vụ và hệ thống chứa thông tin Hạn chế/Mật. Thu
        hồi <strong>trong ngày làm việc</strong> khi chấm dứt hợp đồng hoặc chuyển công tác — là điều kiện để hoàn
        tất thủ tục thôi việc theo ETV.P03.
      </div>

      <section>
        <h2 className="font-head text-lg font-semibold text-ink">
          Phiếu yêu cầu quyền truy cập <span className="text-sm font-normal text-ink-3">({requests.length})</span>
        </h2>
        <div className="mt-3 overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[72rem] text-sm">
            <thead>
              <tr>
                <th className={th}>Mã</th>
                <th className={th}>Đối tượng</th>
                <th className={th}>Loại yêu cầu</th>
                <th className={th}>Hệ thống và mức quyền</th>
                <th className={th}>MFA</th>
                <th className={th}>Thẩm quyền duyệt</th>
                <th className={th}>Ba vai trò</th>
                <th className={th}>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => {
                const items = (Array.isArray(r.items) ? r.items : []) as unknown as AccessItem[];
                const need = requiredApprover({
                  hasPrivilegedItem: items.some((i) => i?.isPrivileged),
                  touchesRestrictedOrSecret: items.some(
                    (i) => i?.mucPhanLoai === "HAN_CHE" || i?.mucPhanLoai === "MAT",
                  ),
                  subjectType: r.subjectType,
                });
                return (
                  <tr key={r.id} className="border-b border-border last:border-0 hover:bg-sunk">
                    <td className="px-3 py-2 font-mono text-xs text-ink">{r.code}</td>
                    <td className="px-3 py-2 text-ink">
                      {r.subject?.name ?? r.subjectExternal ?? "—"}
                      <span className="block text-xs text-ink-3">{SUBJECT_TYPE_LABEL[r.subjectType]}</span>
                    </td>
                    <td className="px-3 py-2 text-xs text-ink-2">{REQUEST_TYPE_LABEL[r.requestType]}</td>
                    <td className="px-3 py-2 text-xs text-ink-2">
                      {items.map((i, idx) => (
                        <span key={idx} className="block">
                          {i.heThong} — {i.vaiTro}
                          {i.isPrivileged && <strong className="ml-1 text-crit">đặc quyền</strong>}
                          <span className="text-ink-3"> ({CLASSIFICATION_LABEL[i.mucPhanLoai] ?? i.mucPhanLoai})</span>
                        </span>
                      ))}
                    </td>
                    <td className="px-3 py-2 text-xs">
                      {r.mfaRequired ? <strong className="text-ink">Bắt buộc</strong> : <span className="text-ink-3">—</span>}
                    </td>
                    <td className="px-3 py-2 text-xs text-ink-2">
                      {need === "LDV" ? "Lãnh đạo Viện" : "PT.ATTT"}
                    </td>
                    <td className="px-3 py-2 text-xs text-ink-2">
                      Đề nghị: {r.requestedBy?.name ?? "—"}
                      <span className="block">Duyệt: {r.approvedBy?.name ?? "—"}</span>
                      <span className="block">Thực hiện: {r.executedBy?.name ?? "—"}</span>
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[ACCESS_STATUS_TONE[r.status]]}`}
                      >
                        {ACCESS_STATUS_LABEL[r.status]}
                      </span>
                      {r.statusReason && <span className="block text-xs text-ink-3">{r.statusReason}</span>}
                    </td>
                  </tr>
                );
              })}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-3 py-8 text-center text-sm text-ink-3">
                    Chưa có phiếu yêu cầu quyền truy cập nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-head text-lg font-semibold text-ink">
          Rà soát quyền định kỳ <span className="text-sm font-normal text-ink-3">({reviews.length})</span>
        </h2>
        <p className="mt-1 text-xs text-ink-3">
          TP rà soát danh sách quyền của phòng tối thiểu 06 tháng/lần; danh sách tài khoản đặc quyền do LĐV phê duyệt
          và rà soát ít nhất 02 lần/năm. Quyền thừa phải được thu hồi <strong>bằng phiếu</strong>, không thu hồi ngầm.
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className={th}>Kỳ</th>
                <th className={th}>Phạm vi</th>
                <th className={th}>Số tài khoản</th>
                <th className={th}>Quyền thừa</th>
                <th className={th}>Đã thu hồi</th>
                <th className={th}>Người rà soát</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((rv) => (
                <tr key={rv.id} className="border-b border-border last:border-0">
                  <td className="px-3 py-2 text-ink">{rv.period}</td>
                  <td className="px-3 py-2 text-xs text-ink-2">
                    {REVIEW_SCOPE_LABEL[rv.scope]}
                    {rv.department && <span className="block text-ink-3">{rv.department}</span>}
                  </td>
                  <td className="px-3 py-2 text-ink-2">{rv.accountsReviewed}</td>
                  <td className="px-3 py-2 text-ink-2">{rv.excessFound}</td>
                  <td className="px-3 py-2 text-xs text-ink-2">
                    {rv.revoked}
                    {rv.revocationRefs.length > 0 && (
                      <span className="block text-ink-3">{rv.revocationRefs.join(", ")}</span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-xs text-ink-2">
                    {rv.reviewer?.name ?? "—"} — {rv.reviewedAt.toLocaleDateString("vi-VN")}
                  </td>
                </tr>
              ))}
              {reviews.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-center text-sm text-ink-3">
                    Chưa ghi nhận đợt rà soát quyền nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <p className="text-xs text-ink-3">
        Vai trò M28 của bạn: <strong className="text-ink">{role ?? "chưa được gán"}</strong>. Thao tác trên phiếu
        (trình duyệt, phê duyệt, thực hiện, thu hồi) thực hiện ở tầng server action theo đúng thẩm quyền — giao diện
        thao tác sẽ bổ sung ở increment sau.
      </p>
    </div>
  );
}
