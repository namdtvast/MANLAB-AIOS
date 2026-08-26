import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getM33Role } from "@/lib/m33/actor";
import { SEVERITY_LABEL, TASK_RESULT_LABEL, TASK_STATUS_LABEL, TASK_STATUS_TONE, TASK_TYPE_LABEL } from "@/lib/m33/labels";
import { MaintenanceActions, NewTaskForm } from "./MaintenanceActions";

const TONE_CLASS: Record<string, string> = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  crit: "bg-crit-soft text-crit",
  neutral: "bg-sunk text-ink-2",
};

export default async function M33MaintenancePage() {
  const [tasks, role, assets, plans] = await Promise.all([
    prisma.m33MaintenanceTask.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        assets: { select: { id: true, code: true, assetClass: true } },
        performedBy: { select: { name: true } },
        acceptedBy: { select: { name: true } },
        plan: { select: { code: true, status: true } },
      },
    }),
    getM33Role(),
    prisma.m33ITAsset.findMany({ where: { status: { in: ["OPERATING", "SUSPENDED"] } }, select: { id: true, code: true, name: true }, orderBy: { code: "asc" } }),
    prisma.m33MaintenancePlan.findMany({ where: { status: "DA_PHE_DUYET" }, select: { id: true, code: true, year: true } }),
  ]);

  const now = new Date();
  const waiting = tasks.filter((t) => t.status === "CHO_NGHIEM_THU");
  const overduePatch = tasks.filter((t) => t.taskType === "VA_LOI_BAO_MAT" && t.status !== "HOAN_THANH" && t.status !== "HUY" && t.dueAt && t.dueAt < now);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M33 · Bảo trì, vá lỗi, cập nhật — F33.02 (ETV.P33 §6.3)</p>
        <h1 className="font-head text-2xl font-bold text-ink">Bảo trì và vá lỗi</h1>
        <p className="mt-1 text-sm text-ink-2">
          Hàng chờ nghiệm thu (người nghiệm thu ≠ người thực hiện — R15): <strong>{waiting.length}</strong> · Vá lỗi quá hạn:{" "}
          <strong className={overduePatch.length > 0 ? "text-crit" : "text-ink"}>{overduePatch.length}</strong>
        </p>
      </div>
      <Link href="/modules/M33" className="text-xs text-accent hover:underline">
        ← Danh mục hạ tầng
      </Link>

      <NewTaskForm assets={assets} plans={plans} />

      <div className="flex flex-col gap-3">
        {tasks.map((t) => {
          const isOverdue = t.status !== "HOAN_THANH" && t.status !== "HUY" && t.dueAt && t.dueAt < now;
          return (
            <section key={t.id} className="rounded-xl border border-border bg-surface p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-ink">
                    <span className="font-mono text-xs">{t.code}</span> · {TASK_TYPE_LABEL[t.taskType]}
                    {t.severity && ` · ${SEVERITY_LABEL[t.severity]}`}
                    {isOverdue && <span className="ml-2 rounded-full bg-crit-soft px-2 py-0.5 text-xs font-medium text-crit">Quá hạn</span>}
                  </p>
                  <p className="text-xs text-ink-2">
                    Tài sản: {t.assets.map((a) => a.code).join(", ")} · Hạn: {t.dueAt ? t.dueAt.toLocaleDateString("vi-VN") : "—"}
                    {t.plan && ` · Kế hoạch: ${t.plan.code}`}
                    {t.changeRef && ` · M30: ${t.changeRef}`}
                    {t.measurementImpactRef && ` · M10: ${t.measurementImpactRef}`}
                    {t.performedBy && ` · Thực hiện: ${t.performedBy.name}`}
                    {t.acceptedBy && ` · Nghiệm thu: ${t.acceptedBy.name}`}
                    {t.result && ` · ${TASK_RESULT_LABEL[t.result]}`}
                    {t.reason && ` · ${t.reason}`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[TASK_STATUS_TONE[t.status]]}`}>
                    {TASK_STATUS_LABEL[t.status]}
                  </span>
                  <MaintenanceActions
                    id={t.id}
                    status={t.status}
                    role={role}
                    hasControlComputer={t.assets.some((a) => a.assetClass === "MAY_TINH_DIEU_KHIEN_DO")}
                  />
                </div>
              </div>
            </section>
          );
        })}
        {tasks.length === 0 && <p className="text-sm text-ink-3">Chưa có công việc bảo trì nào.</p>}
      </div>
    </div>
  );
}
