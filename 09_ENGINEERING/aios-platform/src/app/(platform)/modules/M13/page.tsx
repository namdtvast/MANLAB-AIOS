import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getM13Role } from "@/lib/m13/actor";
import { CAP_STATUS_LABEL, M13_ROLE_LABEL, NCW_STATUS_LABEL, SEVERITY_LABEL, SOURCE_TYPE_LABEL } from "@/lib/m13/labels";

const TONE_CLASS: Record<string, string> = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  crit: "bg-crit-soft text-crit",
  neutral: "bg-sunk text-ink-2",
};

function Badge({ label, tone }: { label: string; tone: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[tone]}`}>
      {label}
    </span>
  );
}

const NCW_TONE: Record<string, string> = {
  GHI_NHAN: "neutral",
  DANG_THEO_DOI: "warn",
  DANG_KHAC_PHUC: "crit",
  DA_KHAC_PHUC: "good",
};

const th = "border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3";

export default async function M13ListPage() {
  const [items, role] = await Promise.all([
    prisma.m13NonconformingWork.findMany({
      orderBy: { createdAt: "desc" },
      include: { detectedBy: true, plan: true },
    }),
    getM13Role(),
  ]);

  const stoppedCount = items.filter((n) => n.stoppedWork).length;
  const openCount = items.filter((n) => n.status !== "DA_KHAC_PHUC").length;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs font-medium text-ink-3">M13 · MP13 · Công việc không phù hợp</p>
        <h1 className="font-head text-2xl font-bold text-ink">Kiểm soát công việc không phù hợp</h1>
        <p className="mt-1 text-sm text-ink-2">
          Vai trò M13 của bạn:{" "}
          <strong className="text-ink">{role ? (M13_ROLE_LABEL[role] ?? role) : "Chưa được gán vai trò"}</strong>
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs text-ink-3">Hồ sơ chưa đóng</p>
          <p className="font-head text-2xl font-bold text-ink">{openCount}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs text-ink-3">Đang dừng công việc</p>
          <p className={`font-head text-2xl font-bold ${stoppedCount > 0 ? "text-crit" : "text-ink"}`}>{stoppedCount}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs text-ink-3">Tổng hồ sơ</p>
          <p className="font-head text-2xl font-bold text-ink">{items.length}</p>
        </div>
      </div>

      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="font-head text-sm font-bold text-ink">Sổ theo dõi công việc không phù hợp (F13.01)</h2>
          <Link href="/modules/M13/ncw/new" className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-ink hover:opacity-90">
            + Ghi nhận không phù hợp
          </Link>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className={th}>Mã</th>
                <th className={th}>Nguồn phát hiện</th>
                <th className={th}>Mức độ</th>
                <th className={th}>Trạng thái</th>
                <th className={th}>Phương án khắc phục</th>
                <th className={th}>Người phát hiện</th>
              </tr>
            </thead>
            <tbody>
              {items.map((n) => (
                <tr key={n.id} className="border-b border-border last:border-0 hover:bg-sunk">
                  <td className="px-3 py-2">
                    <Link href={`/modules/M13/ncw/${n.id}`} className="font-mono text-xs font-medium text-accent hover:underline">
                      {n.code}
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-ink-2">{SOURCE_TYPE_LABEL[n.sourceType]}</td>
                  <td className="px-3 py-2">
                    {n.severity ? (
                      <Badge label={SEVERITY_LABEL[n.severity]} tone={n.severity === "NANG" ? "crit" : "warn"} />
                    ) : (
                      <span className="text-xs text-ink-3">Chưa đánh giá</span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <Badge label={NCW_STATUS_LABEL[n.status]} tone={NCW_TONE[n.status]} />
                  </td>
                  <td className="px-3 py-2 text-ink-2">{n.plan ? CAP_STATUS_LABEL[n.plan.status] : "—"}</td>
                  <td className="px-3 py-2 text-ink-2">{n.detectedBy.name}</td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-center text-sm text-ink-3">Chưa có hồ sơ không phù hợp nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
