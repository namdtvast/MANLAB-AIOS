import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  PLAN_REQUIRED_CLASSES,
  isExpiringSoon,
  isInventoryOverdue,
  isMaintenanceDue,
  isReviewDue,
} from "@/lib/m33/rules";
import {
  ASSET_CLASS_LABEL,
  CRITICALITY_LABEL,
  ENVIRONMENT_LABEL,
  NETWORK_ZONE_LABEL,
  PRIORITY_LABEL,
  SEVERITY_LABEL,
} from "@/lib/m33/labels";

const card = "rounded-xl border border-border bg-surface p-4";
const h2 = "font-head text-sm font-bold text-ink";

// Báo cáo tình hình hệ thống thông tin — đủ TÁM nội dung ETV.P33 §6.9. Mọi con số tính khi đọc
// từ bản ghi nghiệp vụ: số trên trang và số trong báo cáo nộp LĐV luôn là một (06_Dashboard M33).
export default async function M33ReportPage() {
  const now = new Date();
  const [assets, patchTasks, incidents, recons] = await Promise.all([
    prisma.m33ITAsset.findMany(),
    prisma.m33MaintenanceTask.findMany({ where: { taskType: "VA_LOI_BAO_MAT" }, include: { assets: { select: { code: true } } } }),
    prisma.m33ITIncident.findMany(),
    prisma.m33AccountReconciliation.findMany({ orderBy: { createdAt: "desc" }, take: 2 }),
  ]);

  const operating = assets.filter((a) => a.status === "OPERATING" || a.status === "SUSPENDED");
  const count = <T,>(arr: T[], key: (t: T) => string) =>
    arr.reduce<Record<string, number>>((acc, t) => ({ ...acc, [key(t)]: (acc[key(t)] ?? 0) + 1 }), {});

  const byClass = count(operating, (a) => ASSET_CLASS_LABEL[a.assetClass]);
  const byEnv = count(operating, (a) => ENVIRONMENT_LABEL[a.environment]);
  const byZone = count(operating.filter((a) => a.networkZone), (a) => NETWORK_ZONE_LABEL[a.networkZone!]);
  const byCrit = count(operating, (a) => CRITICALITY_LABEL[a.criticality]);

  const reviewDue = operating.filter((a) => isReviewDue(a.reviewCycleMonths, a.lastReviewedAt, a.commissionedAt ?? a.createdAt, now));
  const maintDue = operating.filter((a) => isMaintenanceDue(a.maintenanceCycle, a.lastMaintainedAt, a.commissionedAt ?? a.createdAt, now));

  const openPatch = patchTasks.filter((t) => t.status !== "HOAN_THANH" && t.status !== "HUY");
  const overdueCritical = openPatch.filter((t) => t.severity === "NGHIEM_TRONG" && t.dueAt && t.dueAt < now);

  const byPriority = count(incidents, (i) => PRIORITY_LABEL[i.priority]);
  const closed = incidents.filter((i) => i.status === "DA_DONG");

  const eol = operating.filter((a) => a.eolDate && a.eolDate < now);
  const undiscovered = assets.filter((a) => a.discoverySource === "PHAT_HIEN_CHUA_KIEM_KE");
  const undiscoveredOverdue = assets.filter((a) => isInventoryOverdue(a.inventoryDueAt, a.status, now));
  const budget = operating.filter((a) => (a.eolDate && a.eolDate < now) || isExpiringSoon(a.warrantyUntil, now) || a.replacementPlan);
  const outsidePlanCount = operating.filter((a) => PLAN_REQUIRED_CLASSES.includes(a.assetClass)).length;

  const stat = (label: string, entries: Record<string, number>) => (
    <p className="text-sm text-ink-2">
      <strong className="text-ink">{label}:</strong>{" "}
      {Object.entries(entries)
        .map(([k, v]) => `${k}: ${v}`)
        .join(" · ") || "—"}
    </p>
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M33 · Báo cáo tình hình hệ thống thông tin 06 tháng/lần — ETV.P33 §6.9 (VP tổng hợp, trình theo ETV.P17)</p>
        <h1 className="font-head text-2xl font-bold text-ink">Báo cáo tình hình hệ thống thông tin</h1>
        <p className="mt-1 text-sm text-ink-2">Tám nội dung bắt buộc — số liệu tính trực tiếp từ bản ghi tại thời điểm mở trang.</p>
      </div>
      <Link href="/modules/M33" className="text-xs text-accent hover:underline">
        ← Danh mục hạ tầng
      </Link>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <section className={card}>
          <h2 className={h2}>(1) Tổng tài sản đang vận hành — {operating.length}</h2>
          <div className="mt-2 flex flex-col gap-1">
            {stat("Theo lớp", byClass)}
            {stat("Theo môi trường", byEnv)}
            {stat("Theo vùng mạng", byZone)}
            {stat("Theo mức trọng yếu", byCrit)}
          </div>
        </section>

        <section className={card}>
          <h2 className={h2}>(2) Đến hạn/quá hạn rà soát và bảo trì</h2>
          <p className="mt-2 text-sm text-ink-2">
            Đến hạn rà soát: <strong>{reviewDue.length}</strong> · Đến hạn bảo trì: <strong>{maintDue.length}</strong> — chi tiết ở{" "}
            <Link href="/modules/M33/due" className="text-accent hover:underline">
              Bảng đến hạn
            </Link>
          </p>
        </section>

        <section className={card}>
          <h2 className={h2}>
            (3) Vá lỗi bảo mật — {openPatch.length} đang mở, Nghiêm trọng quá hạn:{" "}
            <span className={overdueCritical.length > 0 ? "text-crit" : ""}>{overdueCritical.length}</span>
          </h2>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-ink-2">
            {overdueCritical.map((t) => (
              <li key={t.id}>
                {t.code} · {t.assets.map((a) => a.code).join(", ")} · {t.severity && SEVERITY_LABEL[t.severity]} · hạn{" "}
                {t.dueAt?.toLocaleDateString("vi-VN")} — cảnh báo LĐV + KPH (R8)
              </li>
            ))}
            {overdueCritical.length === 0 && <li className="text-ink-3">Không có lỗ hổng Nghiêm trọng quá hạn.</li>}
          </ul>
        </section>

        <section className={card}>
          <h2 className={h2}>(4) Sự cố — {incidents.length} phiếu, đã đóng {closed.length}</h2>
          <div className="mt-2">{stat("Theo mức", byPriority)}</div>
        </section>

        <section className={card}>
          <h2 className={h2}>(5) Kết quả đối chiếu tài khoản (R20)</h2>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-ink-2">
            {recons.map((r) => (
              <li key={r.id}>
                {r.code} · kỳ {r.period} · không phiếu {r.orphanAccountIds.length} · phiếu không TK {r.orphanRequestRefs.length} · quá hạn{" "}
                {r.expiredAccountIds.length} · thiếu MFA {r.mfaMissingIds.length} · {r.status === "DA_CHOT" ? "đã chốt" : "đang thực hiện"}
              </li>
            ))}
            {recons.length === 0 && <li className="text-ink-3">Chưa có kỳ đối chiếu nào.</li>}
          </ul>
        </section>

        <section className={card}>
          <h2 className={h2}>
            (6) Hạ tầng EOL còn vận hành — <span className={eol.length > 0 ? "text-crit" : ""}>{eol.length}</span> (R11)
          </h2>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-ink-2">
            {eol.map((a) => (
              <li key={a.id}>
                {a.code} · {a.name} · EOL {a.eolDate?.toLocaleDateString("vi-VN")} · rủi ro: {a.riskRefs.join(", ") || "THIẾU"} · kế hoạch thay
                thế: {a.replacementPlan ?? "THIẾU"}
              </li>
            ))}
            {eol.length === 0 && <li className="text-ink-3">Không có hạ tầng EOL còn vận hành.</li>}
          </ul>
        </section>

        <section className={card}>
          <h2 className={h2}>(7) Tài sản phát hiện chưa kiểm kê — {undiscovered.length}, quá 30 ngày: {undiscoveredOverdue.length} (R17)</h2>
          <p className="mt-2 text-sm text-ink-2">
            Chi tiết ở{" "}
            <Link href="/modules/M33/undiscovered" className="text-accent hover:underline">
              Hạ tầng chưa kiểm kê
            </Link>
          </p>
        </section>

        <section className={card}>
          <h2 className={h2}>(8) Nhu cầu ngân sách thay thế, nâng cấp — {budget.length} tài sản</h2>
          <p className="mt-2 text-sm text-ink-2">
            EOL còn vận hành, sắp hết bảo hành hoặc đã có kế hoạch thay thế · tài sản thuộc diện kế hoạch bảo trì năm: {outsidePlanCount}
          </p>
        </section>
      </div>
    </div>
  );
}
