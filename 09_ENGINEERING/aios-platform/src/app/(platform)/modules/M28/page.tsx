import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getM28Role } from "@/lib/m28/actor";
import { isRiskReviewDue, isTreatmentOverdue, riskLevel } from "@/lib/m28/rules";
import {
  M28_ROLE_LABEL,
  RISK_LEVEL_LABEL,
  RISK_LEVEL_TONE,
  RISK_STATUS_LABEL,
  RISK_STATUS_TONE,
  TREATMENT_OPTION_LABEL,
} from "@/lib/m28/labels";
import { CLASSIFICATION_LABEL, CLASSIFICATION_TONE } from "@/lib/m34/labels";
import { CanCuBanner } from "@/components/CanCuBanner";
import { KICH_THUOC_TRANG, PhanTrang, boQua, chotTrang } from "@/components/PhanTrang";

const TONE_CLASS: Record<string, string> = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  crit: "bg-crit-soft text-crit",
  neutral: "bg-sunk text-ink-2",
};

function Badge({ label, tone }: { label: string; tone: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full whitespace-nowrap px-2 py-0.5 text-xs font-medium ${TONE_CLASS[tone] ?? TONE_CLASS.neutral}`}
    >
      {label}
    </span>
  );
}

const th =
  "border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3";

export default async function M28ListPage({ searchParams }: { searchParams: Promise<{ trang?: string }> }) {
  const { trang: trangRaw } = await searchParams;
  const [chiSo, tong, role, soa, incidentCount, accessPending] = await Promise.all([
    // Bốn thẻ chỉ số đọc TOÀN BỘ hồ sơ rủi ro, chỉ lấy các trường cần cho phép tính; bảng bên dưới
    // chỉ lấy một trang. Đếm trên trang đang xem thì con số đổi theo trang và mất ý nghĩa theo dõi.
    prisma.m28SecurityRisk.findMany({ include: { treatments: true } }),
    prisma.m28SecurityRisk.count(),
    getM28Role(),
    prisma.m28SoAVersion.findFirst({
      where: { status: "DA_PHE_DUYET" },
      include: { _count: { select: { controls: true } } },
    }),
    prisma.m28SecurityIncident.count({ where: { status: { notIn: ["DA_DONG", "HUY"] } } }),
    prisma.m28AccessRequest.count({ where: { status: { in: ["DE_NGHI", "CHO_PHE_DUYET", "DA_PHE_DUYET"] } } }),
  ]);
  const now = new Date();

  const open = chiSo.filter((r) => !["HET_HIEU_LUC", "CHAP_NHAN_TON_DU"].includes(r.status));
  const highOpen = open.filter((r) => r.riskScore >= 13).length;
  const overdueTreatments = chiSo.flatMap((r) => r.treatments).filter((t) => isTreatmentOverdue(t, now)).length;
  const reviewDue = chiSo.filter((r) => isRiskReviewDue(r, now)).length;

  const trang = chotTrang(trangRaw, tong);
  const risks = await prisma.m28SecurityRisk.findMany({
    orderBy: [{ riskScore: "desc" }, { code: "asc" }],
    include: { owner: { select: { name: true } }, treatments: true },
    skip: boQua(trang),
    take: KICH_THUOC_TRANG,
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs font-medium text-ink-3">M28 · MP28 · Quản lý an toàn thông tin</p>
        <h1 className="font-head text-2xl font-bold text-ink">Hồ sơ rủi ro an toàn thông tin</h1>
        <p className="mt-1 text-sm text-ink-2">
          Vai trò M28 của bạn:{" "}
          <strong className="text-ink">{role ? (M28_ROLE_LABEL[role] ?? role) : "Chưa được gán vai trò"}</strong>
        </p>
      </div>

      <CanCuBanner moduleCode="M28" />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs text-ink-3">Rủi ro đang mở</p>
          <p className="font-head text-2xl font-bold text-ink">{open.length}</p>
          <p className="text-xs text-ink-2">{highOpen} ở mức Cao trở lên</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs text-ink-3">Tuyên bố áp dụng</p>
          <p className="font-head text-2xl font-bold text-ink">{soa ? `v${soa.version}` : "—"}</p>
          <p className="text-xs text-ink-2">{soa ? `${soa._count.controls} kiểm soát` : "Chưa có bản hiệu lực"}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs text-ink-3">Sự cố đang xử lý</p>
          <p className="font-head text-2xl font-bold text-ink">{incidentCount}</p>
          <p className="text-xs text-ink-2">chưa đóng</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs text-ink-3">Phiếu quyền truy cập</p>
          <p className="font-head text-2xl font-bold text-ink">{accessPending}</p>
          <p className="text-xs text-ink-2">đang trong quy trình</p>
        </div>
      </div>

      {(overdueTreatments > 0 || reviewDue > 0) && (
        <div className="flex flex-col gap-2">
          {overdueTreatments > 0 && (
            <p className="rounded-lg border border-warn/30 bg-warn-soft px-3 py-2 text-sm text-warn">
              {overdueTreatments} hạng mục Kế hoạch xử lý rủi ro đã quá hạn — cảnh báo chủ sở hữu rủi ro; quá 02 lần
              cảnh báo thì báo cáo LĐV (ETV.P28 mục 6.5.2).
            </p>
          )}
          {reviewDue > 0 && (
            <p className="rounded-lg border border-warn/30 bg-warn-soft px-3 py-2 text-sm text-warn">
              {reviewDue} rủi ro quá 12 tháng chưa rà soát — cảnh báo LĐV và đưa vào báo cáo xem xét của lãnh đạo
              (ETV.P28 mục 6.4.1).
            </p>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/modules/M28/risk/new"
          className="cursor-pointer rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90"
        >
          Khai báo rủi ro
        </Link>
        <Link href="/modules/M28/soa" className="text-xs text-accent hover:underline">
          Tuyên bố áp dụng (F28.02) →
        </Link>
        <Link href="/modules/M28/incidents" className="text-xs text-accent hover:underline">
          Sự cố an toàn thông tin (F28.03) →
        </Link>
        <Link href="/modules/M28/access" className="text-xs text-accent hover:underline">
          Quyền truy cập (F28.04) →
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full min-w-[72rem] text-sm">
          <thead>
            <tr>
              <th className={th}>Mã</th>
              <th className={th}>Rủi ro</th>
              <th className={th}>Tài sản (M27)</th>
              <th className={th}>Phân loại</th>
              <th className={th}>K × T = R</th>
              <th className={th}>Mức</th>
              <th className={th}>Xử lý</th>
              <th className={th}>Chủ sở hữu</th>
              <th className={th}>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {risks.map((r) => {
              const level = riskLevel(r.riskScore);
              const flags: string[] = [];
              if (isRiskReviewDue(r, now)) flags.push("Quá hạn rà soát");
              if (r.treatments.some((t) => isTreatmentOverdue(t, now))) flags.push("RTP quá hạn");
              if (r.bcpInput) flags.push("Đầu vào ETV.P31");
              return (
                <tr key={r.id} className="border-b border-border last:border-0 hover:bg-sunk">
                  <td className="px-3 py-2">
                    <Link href={`/modules/M28/risk/${r.id}`} className="font-mono text-xs text-accent hover:underline">
                      {r.code}
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-ink">
                    {r.title}
                    {flags.length > 0 && (
                      <span className="mt-1 flex flex-wrap gap-1">
                        {flags.map((f) => (
                          <Badge key={f} label={f} tone={f === "Đầu vào ETV.P31" ? "neutral" : "warn"} />
                        ))}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2 font-mono text-xs text-ink-2">{r.assetRefs.join(", ")}</td>
                  <td className="px-3 py-2">
                    <Badge
                      label={CLASSIFICATION_LABEL[r.classification]}
                      tone={CLASSIFICATION_TONE[r.classification]}
                    />
                  </td>
                  <td className="px-3 py-2 font-mono text-xs text-ink-2">
                    {r.likelihood} × {r.impact} = <strong className="text-ink">{r.riskScore}</strong>
                  </td>
                  <td className="px-3 py-2">
                    <Badge label={RISK_LEVEL_LABEL[level]} tone={RISK_LEVEL_TONE[level]} />
                  </td>
                  <td className="px-3 py-2 text-xs text-ink-2">
                    {TREATMENT_OPTION_LABEL[r.treatmentOption]}
                    <span className="block text-ink-3">
                      {r.treatments.filter((t) => t.status === "HOAN_THANH").length}/{r.treatments.length} hạng mục
                    </span>
                  </td>
                  <td className="px-3 py-2 text-ink-2">{r.owner?.name ?? "—"}</td>
                  <td className="px-3 py-2">
                    <Badge label={RISK_STATUS_LABEL[r.status]} tone={RISK_STATUS_TONE[r.status]} />
                  </td>
                </tr>
              );
            })}
            {risks.length === 0 && (
              <tr>
                <td colSpan={9} className="px-3 py-8 text-center text-sm text-ink-3">
                  Chưa có rủi ro nào trong hồ sơ.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <PhanTrang path="/modules/M28" trang={trang} tong={tong} donVi="rủi ro" />
      </div>
    </div>
  );
}
