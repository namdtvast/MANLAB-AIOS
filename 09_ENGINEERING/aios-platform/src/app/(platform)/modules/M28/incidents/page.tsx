import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getM28Role } from "@/lib/m28/actor";
import { closerRole, reportDeadlineHours } from "@/lib/m28/rules";
import {
  INCIDENT_STATUS_LABEL,
  INCIDENT_STATUS_TONE,
  M28_ROLE_LABEL,
  SEVERITY_LABEL,
  SEVERITY_TONE,
  TRISTATE_LABEL,
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

export default async function M28IncidentsPage() {
  const [incidents, role] = await Promise.all([
    prisma.m28SecurityIncident.findMany({
      orderBy: { detectedAt: "desc" },
      include: { reporter: { select: { name: true } }, closedBy: { select: { name: true } } },
    }),
    getM28Role(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M28 · Biểu mẫu ETV.P.F 28.03</p>
        <h1 className="font-head text-2xl font-bold text-ink">Sự cố an toàn thông tin</h1>
        <p className="mt-1 text-sm text-ink-2">
          Đây là <strong>hồ sơ gốc</strong> về sự cố: ETV.P02 và M29 dẫn chiếu tới phiếu này, không lập hai bộ hồ sơ
          song song (ETV.P28 mục 2.3). Vai trò của bạn:{" "}
          <strong className="text-ink">{role ? (M28_ROLE_LABEL[role] ?? role) : "chưa được gán"}</strong>
        </p>
      </div>

      <Link href="/modules/M28" className="text-xs text-accent hover:underline">
        ← Hồ sơ rủi ro an toàn thông tin
      </Link>

      <div className="rounded-lg border border-border bg-sunk px-3 py-2 text-xs text-ink-2">
        <strong>Thời hạn báo cáo nội bộ theo mức</strong> (ETV.P28 mục 6.8.1): Thấp ≤ 24 giờ · Trung bình ≤ 08 giờ ·
        Cao và Rất cao <strong>ngay lập tức</strong>. Thẩm quyền đóng: LĐV với mức Cao/Rất cao, PT.ATTT với mức
        Thấp/Trung bình. Người liên quan trực tiếp tới sự cố <strong>không</strong> được đóng chính sự cố đó.
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full min-w-[72rem] text-sm">
          <thead>
            <tr>
              <th className={th}>Mã</th>
              <th className={th}>Hiện tượng</th>
              <th className={th}>Phát hiện</th>
              <th className={th}>Mức</th>
              <th className={th}>Phân loại</th>
              <th className={th}>Dữ liệu KH / cá nhân</th>
              <th className={th}>Thẩm quyền đóng</th>
              <th className={th}>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((i) => (
              <tr key={i.id} className="border-b border-border last:border-0 hover:bg-sunk">
                <td className="px-3 py-2">
                  <Link href={`/modules/M28/incident/${i.id}`} className="font-mono text-xs text-accent hover:underline">
                    {i.code}
                  </Link>
                </td>
                <td className="px-3 py-2 text-ink">
                  {i.symptom}
                  {i.affectsResultValidity && (
                    <span className="block text-xs text-crit">
                      Ảnh hưởng hiệu lực kết quả đo — bắt buộc kích hoạt ETV.P10 và ETV.P11
                    </span>
                  )}
                </td>
                <td className="px-3 py-2 text-xs text-ink-2">
                  {i.detectedAt.toLocaleDateString("vi-VN")}
                  <span className="block text-ink-3">
                    hạn báo cáo:{" "}
                    {reportDeadlineHours(i.severity) === 0 ? "ngay lập tức" : `${reportDeadlineHours(i.severity)} giờ`}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[SEVERITY_TONE[i.severity]]}`}
                  >
                    {SEVERITY_LABEL[i.severity]}
                  </span>
                </td>
                <td className="px-3 py-2 text-xs text-ink-2">{CLASSIFICATION_LABEL[i.classification]}</td>
                <td className="px-3 py-2 text-xs text-ink-2">
                  KH: {TRISTATE_LABEL[i.involvesCustomerData]} · CN: {TRISTATE_LABEL[i.involvesPersonalData]}
                </td>
                <td className="px-3 py-2 text-xs text-ink-2">
                  {closerRole(i.severity) === "LDV" ? "Lãnh đạo Viện" : "PT.ATTT"}
                  {i.closedBy && <span className="block text-ink-3">đã đóng: {i.closedBy.name}</span>}
                </td>
                <td className="px-3 py-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[INCIDENT_STATUS_TONE[i.status]]}`}
                  >
                    {INCIDENT_STATUS_LABEL[i.status]}
                  </span>
                </td>
              </tr>
            ))}
            {incidents.length === 0 && (
              <tr>
                <td colSpan={8} className="px-3 py-8 text-center text-sm text-ink-3">
                  Chưa ghi nhận sự cố an toàn thông tin nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
