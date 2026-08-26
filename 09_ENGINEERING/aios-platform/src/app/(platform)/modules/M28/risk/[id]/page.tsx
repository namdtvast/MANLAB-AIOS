import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getM28Role } from "@/lib/m28/actor";
import { isRiskReviewDue, isTreatmentOverdue, maxTreatmentMonths, riskLevel } from "@/lib/m28/rules";
import {
  RISK_LEVEL_LABEL,
  RISK_LEVEL_TONE,
  RISK_STATUS_LABEL,
  RISK_STATUS_TONE,
  TREATMENT_OPTION_LABEL,
  TREATMENT_STATUS_LABEL,
  TREATMENT_STATUS_TONE,
} from "@/lib/m28/labels";
import { CLASSIFICATION_LABEL } from "@/lib/m34/labels";
import { RiskActionPanel } from "./RiskActionPanel";

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

const th =
  "border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3";

export default async function M28RiskDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [risk, role, users] = await Promise.all([
    prisma.m28SecurityRisk.findUnique({
      where: { id },
      include: {
        owner: { select: { name: true } },
        createdBy: { select: { name: true } },
        reviewedBy: { select: { name: true } },
        approvedBy: { select: { name: true } },
        residualAcceptedBy: { select: { name: true } },
        treatments: {
          orderBy: { dueAt: "asc" },
          include: { responsible: { select: { name: true } }, verifiedBy: { select: { name: true } } },
        },
      },
    }),
    getM28Role(),
    prisma.user.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true, email: true } }),
  ]);
  if (!risk) notFound();

  const [audit, assets] = await Promise.all([
    prisma.m28AuditEntry.findMany({
      where: { itemType: "RISK", itemId: id },
      orderBy: { ts: "desc" },
      include: { actor: { select: { name: true } } },
      take: 50,
    }),
    prisma.m27InfoAsset.findMany({
      where: { code: { in: risk.assetRefs } },
      select: { id: true, code: true, name: true },
    }),
  ]);

  const now = new Date();
  const level = riskLevel(risk.riskScore);
  const maxMonths = maxTreatmentMonths(level);
  const doneTreatments = risk.treatments.filter((t) => t.status === "HOAN_THANH").length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M28 · Biểu mẫu ETV.P.F 28.01</p>
        <h1 className="font-head text-2xl font-bold text-ink">
          <span className="font-mono text-lg text-ink-2">{risk.code}</span> — {risk.title}
        </h1>
        <p className="mt-1 flex flex-wrap items-center gap-2 text-sm">
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[RISK_STATUS_TONE[risk.status]]}`}
          >
            {RISK_STATUS_LABEL[risk.status]}
          </span>
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[RISK_LEVEL_TONE[level]]}`}
          >
            Mức {RISK_LEVEL_LABEL[level]} — {risk.riskScore} điểm
          </span>
          {risk.bcpInput && (
            <span className="inline-flex items-center rounded-full bg-sunk px-2 py-0.5 text-xs font-medium text-ink-2">
              Đầu vào bắt buộc của ETV.P31
            </span>
          )}
        </p>
      </div>

      <Link href="/modules/M28" className="text-xs text-accent hover:underline">
        ← Hồ sơ rủi ro an toàn thông tin
      </Link>

      <section className="rounded-xl border border-border bg-surface p-4">
        <h2 className="mb-2 font-head text-lg font-semibold text-ink">Mô tả và chấm điểm</h2>
        <Row label="Tài sản thông tin liên quan (M27)">
          {assets.length === 0 ? (
            <span className="text-crit">Không tìm thấy tài sản trong danh mục M27</span>
          ) : (
            assets.map((a) => (
              <Link
                key={a.id}
                href={`/modules/M27/asset/${a.id}`}
                className="mr-2 text-accent hover:underline"
              >
                {a.code} — {a.name}
              </Link>
            ))
          )}
        </Row>
        <Row label="Mức phân loại thông tin bị ảnh hưởng">{CLASSIFICATION_LABEL[risk.classification]}</Row>
        <Row label="Mối đe dọa">{risk.threat}</Row>
        <Row label="Điểm yếu">{risk.vulnerability}</Row>
        <Row label="Kiểm soát hiện có">{risk.existingControls ?? "—"}</Row>
        <Row label="Hệ quả theo ba chiều">
          Bí mật {risk.impactC} · Toàn vẹn {risk.impactI} · Sẵn sàng {risk.impactA}
          <span className="block text-xs text-ink-3">
            T lấy giá trị lớn nhất trong ba chiều = {risk.impact} (ETV.P28 mục 6.4.2)
          </span>
        </Row>
        <Row label="Điểm rủi ro">
          K {risk.likelihood} × T {risk.impact} = <strong>{risk.riskScore}</strong> — mức{" "}
          {RISK_LEVEL_LABEL[level]}
          {maxMonths && <span className="block text-xs text-ink-3">Hạn xử lý tối đa: {maxMonths} tháng</span>}
        </Row>
        <Row label="Phương án xử lý">{TREATMENT_OPTION_LABEL[risk.treatmentOption]}</Row>
        <Row label="Kiểm soát SoA được viện tới">{risk.soaControlRefs.join(", ") || "—"}</Row>
        <Row label="Chủ sở hữu rủi ro">
          {risk.owner?.name ?? "—"}
          <span className="block text-xs text-ink-3">
            Phải là TP lĩnh vực hoặc LĐV; không giao cho Quản trị hệ thống (ETV.P28 mục 6.4.3)
          </span>
        </Row>
        <Row label="Rủi ro tương ứng ở M01">{risk.m01RiskRef ?? "—"}</Row>
        <Row label="Rà soát gần nhất">
          {risk.lastAssessedAt?.toLocaleDateString("vi-VN") ?? "chưa rà soát"}
          {isRiskReviewDue(risk, now) && <strong className="ml-1 text-warn">— quá 12 tháng, phải rà soát lại</strong>}
        </Row>
        {risk.residualScore !== null && (
          <Row label="Rủi ro tồn dư">
            {risk.residualLikelihood} × {risk.residualImpact} = <strong>{risk.residualScore}</strong>
            {risk.residualAcceptedBy && (
              <span className="block text-xs text-ink-3">
                LĐV chấp nhận: {risk.residualAcceptedBy.name} ngày{" "}
                {risk.residualAcceptedAt?.toLocaleDateString("vi-VN")} — lý do: {risk.residualAcceptReason}
              </span>
            )}
          </Row>
        )}
        <Row label="Vết phê duyệt">
          Lập: {risk.createdBy?.name ?? "—"} · Soát xét: {risk.reviewedBy?.name ?? "—"} · Phê duyệt:{" "}
          {risk.approvedBy?.name ?? "—"}
          {risk.reason && <span className="block text-xs text-crit">Lý do gần nhất: {risk.reason}</span>}
        </Row>
      </section>

      <section>
        <h2 className="font-head text-lg font-semibold text-ink">
          Kế hoạch xử lý rủi ro (RTP){" "}
          <span className="text-sm font-normal text-ink-3">
            — {doneTreatments}/{risk.treatments.length} hạng mục đã xác nhận hiệu lực
          </span>
        </h2>
        <p className="mt-1 text-xs text-ink-3">
          Biện pháp chưa được PT.ATTT xác nhận hiệu lực thì <strong>không</strong> được ghi là hoàn thành (ETV.P28 mục
          6.5.2).
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[60rem] text-sm">
            <thead>
              <tr>
                <th className={th}>Biện pháp</th>
                <th className={th}>Kiểm soát SoA</th>
                <th className={th}>Người chịu trách nhiệm</th>
                <th className={th}>Hạn</th>
                <th className={th}>Xác nhận hiệu lực</th>
                <th className={th}>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {risk.treatments.map((t) => (
                <tr key={t.id} className="border-b border-border last:border-0">
                  <td className="px-3 py-2 text-ink">
                    {t.measure}
                    {t.interimMeasure && (
                      <span className="block text-xs text-warn">
                        Khống chế tạm thời: {t.interimMeasure}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2 font-mono text-xs text-ink-2">{t.soaControlRef}</td>
                  <td className="px-3 py-2 text-ink-2">{t.responsible?.name ?? "—"}</td>
                  <td className="px-3 py-2 text-xs text-ink-2">
                    {t.dueAt.toLocaleDateString("vi-VN")}
                    {isTreatmentOverdue(t, now) && <strong className="ml-1 text-crit">quá hạn</strong>}
                  </td>
                  <td className="px-3 py-2 text-xs text-ink-2">
                    {t.verifiedBy
                      ? `${t.verifiedBy.name} — ${t.verifiedAt?.toLocaleDateString("vi-VN")}`
                      : t.verificationMethod}
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[TREATMENT_STATUS_TONE[t.status]]}`}
                    >
                      {TREATMENT_STATUS_LABEL[t.status]}
                    </span>
                  </td>
                </tr>
              ))}
              {risk.treatments.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-center text-sm text-ink-3">
                    Chưa có hạng mục xử lý nào.
                    {risk.riskScore >= 7 && (
                      <strong className="ml-1 text-crit">
                        Rủi ro từ 7 điểm trở lên bắt buộc có Kế hoạch xử lý (ETV.P28 mục 6.4.3).
                      </strong>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <RiskActionPanel
        id={risk.id}
        status={risk.status}
        role={role}
        riskScore={risk.riskScore}
        users={users}
        treatments={risk.treatments.map((t) => ({ id: t.id, measure: t.measure, status: t.status }))}
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
