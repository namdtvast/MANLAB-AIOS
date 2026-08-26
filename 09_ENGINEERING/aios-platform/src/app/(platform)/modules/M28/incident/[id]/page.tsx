import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getM28Role } from "@/lib/m28/actor";
import { closerRole, reportDeadlineHours } from "@/lib/m28/rules";
import {
  INCIDENT_STATUS_LABEL,
  INCIDENT_STATUS_TONE,
  SEVERITY_LABEL,
  SEVERITY_TONE,
  TRISTATE_LABEL,
} from "@/lib/m28/labels";
import { CLASSIFICATION_LABEL } from "@/lib/m34/labels";
import { IncidentActionPanel } from "./IncidentActionPanel";

const TONE_CLASS: Record<string, string> = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  crit: "bg-crit-soft text-crit",
  neutral: "bg-sunk text-ink-2",
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-border py-2 last:border-0 sm:flex-row sm:gap-4">
      <span className="w-60 shrink-0 text-xs font-medium text-ink-3">{label}</span>
      <span className="text-sm text-ink">{children}</span>
    </div>
  );
}

export default async function M28IncidentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [incident, role] = await Promise.all([
    prisma.m28SecurityIncident.findUnique({
      where: { id },
      include: { reporter: { select: { name: true } }, closedBy: { select: { name: true } } },
    }),
    getM28Role(),
  ]);
  if (!incident) notFound();

  const audit = await prisma.m28AuditEntry.findMany({
    where: { itemType: "INCIDENT", itemId: id },
    orderBy: { ts: "desc" },
    include: { actor: { select: { name: true } } },
    take: 50,
  });

  const needsLesson = incident.severity === "CAO" || incident.severity === "RAT_CAO";
  const blockers: string[] = [];
  if (incident.affectsResultValidity && (!incident.m10Ref || !incident.m11Ref))
    blockers.push("ảnh hưởng hiệu lực kết quả đo nhưng chưa kích hoạt ETV.P10 và ETV.P11");
  if (needsLesson && !incident.lessonRef)
    blockers.push("sự cố mức Cao trở lên nhưng chưa lập phiếu bài học kinh nghiệm theo ETV.P26");
  if (incident.involvesCustomerData === "CHUA_XAC_DINH" || incident.involvesPersonalData === "CHUA_XAC_DINH")
    blockers.push("chưa kết luận có liên quan dữ liệu khách hàng hoặc dữ liệu cá nhân hay không");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M28 · Biểu mẫu ETV.P.F 28.03</p>
        <h1 className="font-head text-2xl font-bold text-ink">
          <span className="font-mono text-lg text-ink-2">{incident.code}</span> — Sự cố an toàn thông tin
        </h1>
        <p className="mt-1 flex flex-wrap items-center gap-2 text-sm">
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[INCIDENT_STATUS_TONE[incident.status]]}`}
          >
            {INCIDENT_STATUS_LABEL[incident.status]}
          </span>
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[SEVERITY_TONE[incident.severity]]}`}
          >
            Mức {SEVERITY_LABEL[incident.severity]}
          </span>
          <span className="text-xs text-ink-2">
            Hạn báo cáo nội bộ:{" "}
            {reportDeadlineHours(incident.severity) === 0
              ? "ngay lập tức"
              : `${reportDeadlineHours(incident.severity)} giờ`}{" "}
            · Thẩm quyền đóng: {closerRole(incident.severity) === "LDV" ? "Lãnh đạo Viện" : "PT.ATTT"}
          </span>
        </p>
      </div>

      <Link href="/modules/M28/incidents" className="text-xs text-accent hover:underline">
        ← Danh sách sự cố
      </Link>

      {blockers.length > 0 && incident.status !== "DA_DONG" && incident.status !== "HUY" && (
        <div className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">
          <strong>Chưa đủ điều kiện đóng sự cố:</strong> {blockers.join("; ")} (ETV.P28 mục 6.8.2 bước 6, 6.8.3).
        </div>
      )}

      <section className="rounded-xl border border-border bg-surface p-4">
        <h2 className="mb-2 font-head text-lg font-semibold text-ink">Hồ sơ sự cố</h2>
        <Row label="Người phát hiện, báo cáo">{incident.reporter?.name ?? "—"}</Row>
        <Row label="Mốc thời gian">
          Xảy ra: {incident.occurredAt?.toLocaleString("vi-VN") ?? "ước lượng chưa rõ"} · Phát hiện:{" "}
          {incident.detectedAt.toLocaleString("vi-VN")} · Báo cáo: {incident.reportedAt.toLocaleString("vi-VN")}
        </Row>
        <Row label="Hiện tượng">{incident.symptom}</Row>
        <Row label="Tài sản, hệ thống liên quan (M27)">{incident.assetRefs.join(", ") || "—"}</Row>
        <Row label="Mức phân loại thông tin">{CLASSIFICATION_LABEL[incident.classification]}</Row>
        <Row label="Liên quan dữ liệu khách hàng">{TRISTATE_LABEL[incident.involvesCustomerData]}</Row>
        <Row label="Liên quan dữ liệu cá nhân">
          {TRISTATE_LABEL[incident.involvesPersonalData]}
          {incident.involvesPersonalData === "CO" && (
            <span className="block text-xs text-ink-3">
              Vi phạm dữ liệu cá nhân: thực hiện nghĩa vụ thông báo theo Nghị định 13/2023/NĐ-CP; PT.ATTT chuẩn bị
              nội dung, LĐV quyết định gửi (ETV.P28 mục 6.8.3).
            </span>
          )}
        </Row>
        <Row label="Khống chế">
          {incident.containedAt?.toLocaleString("vi-VN") ?? "chưa"}
          {incident.containmentActions && (
            <span className="block text-xs text-ink-2">{incident.containmentActions}</span>
          )}
        </Row>
        <Row label="Bằng chứng đã bảo toàn">
          {incident.evidencePreserved ?? (
            <span className="text-crit">Chưa ghi — không tự ý xoá dữ liệu, nhật ký, thư điện tử liên quan</span>
          )}
        </Row>
        <Row label="Nguyên nhân trực tiếp">{incident.directCause ?? "—"}</Row>
        <Row label="Phạm vi ảnh hưởng">{incident.scopeOfImpact ?? "—"}</Row>
        <Row label="Ảnh hưởng hiệu lực kết quả đo, chứng chỉ">
          {incident.affectsResultValidity ? "Có" : "Không"}
          {incident.affectsResultValidity && (
            <span className="block text-xs text-ink-2">
              ETV.P10: {incident.m10Ref ?? "chưa có"} · ETV.P11: {incident.m11Ref ?? "chưa có"} — AI và cá nhân đơn lẻ
              không được tự kết luận về hiệu lực kết quả (ETV.P28 mục 6.8.3).
            </span>
          )}
        </Row>
        <Row label="Rủi ro đã cập nhật hoặc mở mới">{incident.riskRefs.join(", ") || "—"}</Row>
        <Row label="Hành động khắc phục (ETV.P13)">{incident.capaRef ?? "—"}</Row>
        <Row label="Bài học kinh nghiệm (ETV.P26)">
          {incident.lessonRef ?? (needsLesson ? <span className="text-crit">bắt buộc với mức Cao trở lên</span> : "—")}
        </Row>
        <Row label="Khôi phục">{incident.recoveryAt?.toLocaleString("vi-VN") ?? "chưa"}</Row>
        {incident.closedBy && (
          <Row label="Đã đóng">
            {incident.closedBy.name} — {incident.closedAt?.toLocaleString("vi-VN")}
          </Row>
        )}
        {incident.reason && <Row label="Lý do gần nhất">{incident.reason}</Row>}
      </section>

      <IncidentActionPanel
        id={incident.id}
        status={incident.status}
        severity={incident.severity}
        role={role}
        m10Ref={incident.m10Ref}
        m11Ref={incident.m11Ref}
        lessonRef={incident.lessonRef}
      />

      <section>
        <h2 className="font-head text-lg font-semibold text-ink">Nhật ký thao tác</h2>
        <div className="mt-3 overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full text-sm">
            <tbody>
              {audit.map((e) => (
                <tr key={e.id} className="border-b border-border last:border-0">
                  <td className="px-3 py-2 text-xs whitespace-nowrap text-ink-3">{e.ts.toLocaleString("vi-VN")}</td>
                  <td className="px-3 py-2 text-xs whitespace-nowrap text-ink-2">
                    {e.actor?.name ?? "—"} ({e.role})
                  </td>
                  <td className="px-3 py-2 text-ink">{e.action}</td>
                  <td className="px-3 py-2 text-xs text-ink-2">{e.reason ?? ""}</td>
                </tr>
              ))}
              {audit.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-3 py-6 text-center text-sm text-ink-3">
                    Chưa có thao tác nào được ghi nhận.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
