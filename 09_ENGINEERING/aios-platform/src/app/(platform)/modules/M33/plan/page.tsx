import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getM33Role } from "@/lib/m33/actor";
import { PLAN_REQUIRED_CLASSES } from "@/lib/m33/rules";
import { PLAN_STATUS_LABEL, PLAN_STATUS_TONE } from "@/lib/m33/labels";
import { NewPlanForm, PlanActions } from "./PlanActions";

const TONE_CLASS: Record<string, string> = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  crit: "bg-crit-soft text-crit",
  neutral: "bg-sunk text-ink-2",
};

export default async function M33PlanPage() {
  const [plans, role, planRequiredAssets] = await Promise.all([
    prisma.m33MaintenancePlan.findMany({
      orderBy: { year: "desc" },
      include: {
        createdBy: { select: { name: true } },
        approvedBy: { select: { name: true } },
        scopeAssets: { select: { id: true, code: true, name: true } },
        _count: { select: { tasks: true } },
      },
    }),
    getM33Role(),
    prisma.m33ITAsset.findMany({
      where: { status: "OPERATING", assetClass: { in: PLAN_REQUIRED_CLASSES } },
      select: { id: true, code: true, name: true },
      orderBy: { code: "asc" },
    }),
  ]);

  // R19 — đối chiếu phạm vi: tài sản thuộc diện mà chưa nằm trong kế hoạch đã phê duyệt hiện hành
  const approved = plans.find((p) => p.status === "DA_PHE_DUYET");
  const covered = new Set(approved?.scopeAssets.map((a) => a.id) ?? []);
  const uncovered = planRequiredAssets.filter((a) => !covered.has(a.id));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M33 · Kế hoạch bảo trì năm — LĐV phê duyệt trước năm kế hoạch (R19, ETV.P33 §6.3.1)</p>
        <h1 className="font-head text-2xl font-bold text-ink">Kế hoạch bảo trì năm</h1>
        <p className="mt-1 text-sm text-ink-2">
          Phủ toàn bộ tài sản có hệ điều hành/phần mềm nền. Ngoài kế hoạch hiện hành:{" "}
          <strong className={uncovered.length > 0 ? "text-warn" : "text-ink"}>{uncovered.length}</strong> tài sản.
        </p>
      </div>
      <Link href="/modules/M33" className="text-xs text-accent hover:underline">
        ← Danh mục hạ tầng
      </Link>

      <NewPlanForm assets={planRequiredAssets} />

      {uncovered.length > 0 && (
        <p className="rounded-xl border border-warn/30 bg-warn-soft px-4 py-3 text-xs text-warn">
          Chưa được phủ bởi kế hoạch đã phê duyệt: {uncovered.map((a) => a.code).join(", ")} (R19).
        </p>
      )}

      <div className="flex flex-col gap-4">
        {plans.map((p) => (
          <section key={p.id} className="rounded-xl border border-border bg-surface p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-ink">
                  <span className="font-mono text-xs">{p.code}</span> · Năm {p.year} · {p.scopeAssets.length} tài sản · {p._count.tasks} công việc
                </p>
                <p className="text-xs text-ink-2">
                  Người lập: {p.createdBy.name} · Phê duyệt: {p.approvedBy?.name ?? "chưa"}
                  {p.downtimeNeeds && ` · Ngừng dịch vụ: ${p.downtimeNeeds}`}
                  {p.reason && ` · ${p.reason}`}
                </p>
                <p className="mt-1 text-xs text-ink-3">{p.scopeAssets.map((a) => a.code).join(" · ")}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[PLAN_STATUS_TONE[p.status]]}`}>
                  {PLAN_STATUS_LABEL[p.status]}
                </span>
                <PlanActions id={p.id} status={p.status} role={role} />
              </div>
            </div>
          </section>
        ))}
        {plans.length === 0 && <p className="text-sm text-ink-3">Chưa có kế hoạch bảo trì năm nào.</p>}
      </div>
    </div>
  );
}
