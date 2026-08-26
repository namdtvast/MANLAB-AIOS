import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  PLAN_REQUIRED_CLASSES,
  isExpiringSoon,
  isInventoryOverdue,
  isMaintenanceDue,
  isReviewDue,
  maintenanceOverdueCycles,
} from "@/lib/m33/rules";
import { SEVERITY_LABEL } from "@/lib/m33/labels";

const card = "rounded-xl border border-border bg-surface p-4";

function Row({ href, code, name, note, tone }: { href: string; code: string; name: string; note: string; tone?: "warn" | "crit" }) {
  return (
    <li className="flex flex-wrap items-center justify-between gap-2 border-b border-border py-2 text-sm last:border-0">
      <span>
        <Link href={href} className="font-mono text-xs text-accent hover:underline">
          {code}
        </Link>{" "}
        <span className="text-ink">{name}</span>
      </span>
      <span className={`text-xs ${tone === "crit" ? "font-semibold text-crit" : "text-ink-2"}`}>{note}</span>
    </li>
  );
}

// Bảng đến hạn — 7 nhóm cờ TÍNH KHI ĐỌC (ETV.P33 Phụ lục II.1; DacTa M33 mục 6).
export default async function M33DuePage() {
  const now = new Date();
  const [assets, patchTasks, incidents, approvedPlan] = await Promise.all([
    prisma.m33ITAsset.findMany({ where: { status: { in: ["OPERATING", "SUSPENDED", "DRAFT", "PENDING_REVIEW", "PENDING_APPROVAL", "REVIEW_REJECTED", "APPROVAL_REJECTED"] } } }),
    prisma.m33MaintenanceTask.findMany({
      where: { taskType: "VA_LOI_BAO_MAT", status: { notIn: ["HOAN_THANH", "HUY"] }, dueAt: { lt: now } },
      include: { assets: { select: { id: true, code: true } } },
    }),
    prisma.m33ITIncident.findMany({ where: { status: "MOI", responseDueAt: { lt: now } }, include: { assets: { select: { code: true } } } }),
    prisma.m33MaintenancePlan.findFirst({ where: { status: "DA_PHE_DUYET" }, include: { scopeAssets: { select: { id: true } } } }),
  ]);

  const operating = assets.filter((a) => a.status === "OPERATING" || a.status === "SUSPENDED");
  const reviewDue = operating.filter((a) => isReviewDue(a.reviewCycleMonths, a.lastReviewedAt, a.commissionedAt ?? a.createdAt, now));
  const maintDue = operating.filter((a) => isMaintenanceDue(a.maintenanceCycle, a.lastMaintainedAt, a.commissionedAt ?? a.createdAt, now));
  const expiring = operating.filter((a) => isExpiringSoon(a.licenseExpiry, now) || isExpiringSoon(a.warrantyUntil, now) || isExpiringSoon(a.eolDate, now) || (a.eolDate && a.eolDate < now));
  const undiscovered = assets.filter((a) => isInventoryOverdue(a.inventoryDueAt, a.status, now));
  const covered = new Set(approvedPlan?.scopeAssets.map((s) => s.id) ?? []);
  const outsidePlan = operating.filter((a) => PLAN_REQUIRED_CLASSES.includes(a.assetClass) && !covered.has(a.id));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M33 · Bảng đến hạn — 7 nhóm cờ tính khi đọc (ETV.P33 Phụ lục II.1)</p>
        <h1 className="font-head text-2xl font-bold text-ink">Bảng đến hạn</h1>
      </div>
      <Link href="/modules/M33" className="text-xs text-accent hover:underline">
        ← Danh mục hạ tầng
      </Link>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <section className={card}>
          <h2 className="font-head text-sm font-bold text-ink">1 · Đến hạn rà soát ({reviewDue.length}) — R12</h2>
          <ul className="mt-2">
            {reviewDue.map((a) => (
              <Row key={a.id} href={`/modules/M33/asset/${a.id}`} code={a.code} name={a.name} note={`chu kỳ ${a.reviewCycleMonths} tháng · lần cuối ${a.lastReviewedAt?.toLocaleDateString("vi-VN") ?? "chưa"}`} />
            ))}
            {reviewDue.length === 0 && <li className="py-2 text-sm text-ink-3">Không có tài sản nào.</li>}
          </ul>
        </section>

        <section className={card}>
          <h2 className="font-head text-sm font-bold text-ink">2 · Đến hạn bảo trì ({maintDue.length}) — R8</h2>
          <ul className="mt-2">
            {maintDue.map((a) => {
              const cycles = maintenanceOverdueCycles(a.maintenanceCycle, a.lastMaintainedAt, a.commissionedAt ?? a.createdAt, now);
              return (
                <Row
                  key={a.id}
                  href={`/modules/M33/asset/${a.id}`}
                  code={a.code}
                  name={a.name}
                  tone={cycles >= 2 ? "crit" : undefined}
                  note={cycles >= 2 ? `quá ${cycles} chu kỳ — cảnh báo LĐV + KPH (R8)` : "quá hạn bảo trì"}
                />
              );
            })}
            {maintDue.length === 0 && <li className="py-2 text-sm text-ink-3">Không có tài sản nào.</li>}
          </ul>
        </section>

        <section className={card}>
          <h2 className="font-head text-sm font-bold text-ink">3 · Vá lỗi bảo mật quá hạn ({patchTasks.length}) — §6.3.3</h2>
          <ul className="mt-2">
            {patchTasks.map((t) => (
              <Row
                key={t.id}
                href="/modules/M33/maintenance"
                code={t.code}
                name={t.assets.map((a) => a.code).join(", ")}
                tone={t.severity === "NGHIEM_TRONG" ? "crit" : "warn"}
                note={`${t.severity ? SEVERITY_LABEL[t.severity] : ""} · hạn ${t.dueAt?.toLocaleDateString("vi-VN")}${t.severity === "NGHIEM_TRONG" ? " — cảnh báo LĐV + KPH" : ""}`}
              />
            ))}
            {patchTasks.length === 0 && <li className="py-2 text-sm text-ink-3">Không có vá lỗi nào quá hạn.</li>}
          </ul>
        </section>

        <section className={card}>
          <h2 className="font-head text-sm font-bold text-ink">4 · Bản quyền / bảo hành / EOL ({expiring.length}) — R11, R21</h2>
          <ul className="mt-2">
            {expiring.map((a) => (
              <Row
                key={a.id}
                href={`/modules/M33/asset/${a.id}`}
                code={a.code}
                name={a.name}
                tone={a.eolDate && a.eolDate < now ? "crit" : "warn"}
                note={[
                  a.licenseExpiry && `bản quyền ${a.licenseExpiry.toLocaleDateString("vi-VN")}`,
                  a.warrantyUntil && `BH ${a.warrantyUntil.toLocaleDateString("vi-VN")}`,
                  a.eolDate && `EOL ${a.eolDate.toLocaleDateString("vi-VN")}${a.eolDate < now ? " — cần rủi ro + kế hoạch thay thế" : ""}`,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              />
            ))}
            {expiring.length === 0 && <li className="py-2 text-sm text-ink-3">Không có tài sản nào.</li>}
          </ul>
        </section>

        <section className={card}>
          <h2 className="font-head text-sm font-bold text-ink">5 · Quá hạn phản hồi sự cố ({incidents.length}) — R18</h2>
          <ul className="mt-2">
            {incidents.map((i) => (
              <Row key={i.id} href="/modules/M33/incidents" code={i.code} name={i.assets.map((a) => a.code).join(", ")} tone="crit" note={`hạn phản hồi ${i.responseDueAt?.toLocaleString("vi-VN")}`} />
            ))}
            {incidents.length === 0 && <li className="py-2 text-sm text-ink-3">Không có phiếu nào.</li>}
          </ul>
        </section>

        <section className={card}>
          <h2 className="font-head text-sm font-bold text-ink">6 · Chưa kiểm kê quá 30 ngày ({undiscovered.length}) — R17</h2>
          <ul className="mt-2">
            {undiscovered.map((a) => (
              <Row key={a.id} href={`/modules/M33/asset/${a.id}`} code={a.code} name={a.name} tone="crit" note={`hạn vào vận hành ${a.inventoryDueAt?.toLocaleDateString("vi-VN")}`} />
            ))}
            {undiscovered.length === 0 && <li className="py-2 text-sm text-ink-3">Không có tài sản nào.</li>}
          </ul>
        </section>

        <section className={`${card} lg:col-span-2`}>
          <h2 className="font-head text-sm font-bold text-ink">7 · Ngoài kế hoạch bảo trì năm ({outsidePlan.length}) — R19</h2>
          <ul className="mt-2">
            {outsidePlan.map((a) => (
              <Row key={a.id} href={`/modules/M33/asset/${a.id}`} code={a.code} name={a.name} tone="warn" note="có hệ điều hành/phần mềm nền nhưng không thuộc kế hoạch đã phê duyệt" />
            ))}
            {outsidePlan.length === 0 && <li className="py-2 text-sm text-ink-3">Mọi tài sản thuộc diện đều đã trong kế hoạch.</li>}
          </ul>
        </section>
      </div>
    </div>
  );
}
