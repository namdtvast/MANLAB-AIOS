import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getM33Role } from "@/lib/m33/actor";
import { isExpiringSoon, isInventoryOverdue, isMaintenanceDue, isReviewDue } from "@/lib/m33/rules";
import {
  ASSET_CLASS_LABEL,
  ASSET_STATUS_LABEL,
  ASSET_STATUS_TONE,
  CRITICALITY_LABEL,
  CRITICALITY_TONE,
  ENVIRONMENT_LABEL,
  M33_ROLE_LABEL,
  NETWORK_ZONE_LABEL,
} from "@/lib/m33/labels";
import { CanCuBanner } from "@/components/CanCuBanner";

const TONE_CLASS: Record<string, string> = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  crit: "bg-crit-soft text-crit",
  neutral: "bg-sunk text-ink-2",
};

function Badge({ label, tone }: { label: string; tone: string }) {
  return (
    <span className={`inline-flex items-center rounded-full whitespace-nowrap px-2 py-0.5 text-xs font-medium ${TONE_CLASS[tone]}`}>
      {label}
    </span>
  );
}

const th = "border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3";

export default async function M33ListPage() {
  const [assets, role] = await Promise.all([
    prisma.m33ITAsset.findMany({
      orderBy: { createdAt: "desc" },
      include: { custodian: { select: { name: true } }, userOwner: { select: { name: true } } },
    }),
    getM33Role(),
  ]);

  const now = new Date();
  const operating = assets.filter((a) => a.status === "OPERATING");

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs font-medium text-ink-3">M33 · MP33 · Quản lý hệ thống thông tin</p>
        <h1 className="font-head text-2xl font-bold text-ink">Danh mục hạ tầng công nghệ thông tin</h1>
        <p className="mt-1 text-sm text-ink-2">
          Vai trò M33 của bạn:{" "}
          <strong className="text-ink">{role ? (M33_ROLE_LABEL[role] ?? role) : "Chưa được gán vai trò"}</strong>
        </p>
      </div>

      <CanCuBanner moduleCode="M33" />

      <p className="rounded-xl border border-warn/30 bg-warn-soft px-4 py-3 text-xs text-warn">
        Thủ tục nguồn <strong>ETV.P33 đang ở trạng thái DỰ THẢO (Chờ soát xét)</strong> — các giá trị định lượng
        (mốc vá 07/30/90 ngày, SLA sự cố, 30 ngày kiểm kê) là đề xuất; Viện phê duyệt theo MP14 thì chốt lại. M33 giữ
        <strong> hồ sơ quản trị</strong>, không thay thế công cụ giám sát kỹ thuật; bản ghi không chứa bí mật xác thực (R7).
      </p>

      <section className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-head text-sm font-bold text-ink">
            Tài sản ({operating.length} đang vận hành / {assets.length} bản ghi)
          </h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/modules/M33/plan" className="rounded-lg border border-border-strong px-3 py-1.5 text-xs font-semibold text-ink hover:bg-sunk">
              Kế hoạch bảo trì năm
            </Link>
            <Link href="/modules/M33/maintenance" className="rounded-lg border border-border-strong px-3 py-1.5 text-xs font-semibold text-ink hover:bg-sunk">
              Bảo trì – vá lỗi
            </Link>
            <Link href="/modules/M33/accounts" className="rounded-lg border border-border-strong px-3 py-1.5 text-xs font-semibold text-ink hover:bg-sunk">
              Tài khoản
            </Link>
            <Link href="/modules/M33/incidents" className="rounded-lg border border-border-strong px-3 py-1.5 text-xs font-semibold text-ink hover:bg-sunk">
              Sự cố
            </Link>
            <Link href="/modules/M33/due" className="rounded-lg border border-border-strong px-3 py-1.5 text-xs font-semibold text-ink hover:bg-sunk">
              Bảng đến hạn
            </Link>
            <Link href="/modules/M33/report" className="rounded-lg border border-border-strong px-3 py-1.5 text-xs font-semibold text-ink hover:bg-sunk">
              Báo cáo 06 tháng
            </Link>
            <Link href="/modules/M33/asset/new" className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-ink hover:opacity-90">
              + Khai báo tài sản
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[68rem] text-sm">
            <thead>
              <tr>
                <th className={th}>Mã</th>
                <th className={th}>Tên</th>
                <th className={th}>Lớp</th>
                <th className={th}>Vùng mạng / Môi trường</th>
                <th className={th}>Chủ quản trị / Sử dụng</th>
                <th className={th}>Trọng yếu</th>
                <th className={th}>Trạng thái</th>
                <th className={th}>Cảnh báo</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((a) => {
                const flags: { label: string; tone: string }[] = [];
                if (a.networkIsolated) flags.push({ label: "Đã ngắt mạng", tone: "crit" });
                if (a.status === "OPERATING" && isReviewDue(a.reviewCycleMonths, a.lastReviewedAt, a.commissionedAt ?? a.createdAt, now))
                  flags.push({ label: "Đến hạn rà soát", tone: "warn" });
                if (a.status === "OPERATING" && isMaintenanceDue(a.maintenanceCycle, a.lastMaintainedAt, a.commissionedAt ?? a.createdAt, now))
                  flags.push({ label: "Đến hạn bảo trì", tone: "warn" });
                if (isExpiringSoon(a.licenseExpiry, now) || isExpiringSoon(a.warrantyUntil, now) || isExpiringSoon(a.eolDate, now))
                  flags.push({ label: "Bản quyền/bảo hành/EOL", tone: "warn" });
                if (a.eolDate && a.eolDate < now && a.status === "OPERATING") flags.push({ label: "EOL còn vận hành", tone: "crit" });
                if (isInventoryOverdue(a.inventoryDueAt, a.status, now)) flags.push({ label: "Chưa kiểm kê quá 30 ngày", tone: "crit" });
                if (a.isPersonalDevice) flags.push({ label: "BYOD", tone: "neutral" });
                return (
                  <tr key={a.id} className="border-b border-border last:border-0 hover:bg-sunk">
                    <td className="px-3 py-2">
                      <Link href={`/modules/M33/asset/${a.id}`} className="whitespace-nowrap font-mono text-xs font-medium text-accent hover:underline">
                        {a.code}
                      </Link>
                    </td>
                    <td className="px-3 py-2 text-ink">{a.name}</td>
                    <td className="px-3 py-2 text-xs text-ink-2">{ASSET_CLASS_LABEL[a.assetClass]}</td>
                    <td className="px-3 py-2 text-xs text-ink-2">
                      {a.networkZone ? NETWORK_ZONE_LABEL[a.networkZone] : "—"} · {ENVIRONMENT_LABEL[a.environment]}
                    </td>
                    <td className="px-3 py-2 text-xs text-ink-2">
                      {a.custodian.name} / {a.userOwner.name}
                    </td>
                    <td className="px-3 py-2">
                      <Badge label={CRITICALITY_LABEL[a.criticality]} tone={CRITICALITY_TONE[a.criticality]} />
                    </td>
                    <td className="px-3 py-2">
                      <Badge label={ASSET_STATUS_LABEL[a.status]} tone={ASSET_STATUS_TONE[a.status]} />
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex flex-wrap gap-1">
                        {flags.map((f) => (
                          <Badge key={f.label} label={f.label} tone={f.tone} />
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {assets.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-3 py-6 text-center text-sm text-ink-3">
                    Chưa có tài sản nào trong danh mục.
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
