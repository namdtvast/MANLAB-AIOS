import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { daysSince, isDueForMonitoring } from "@/lib/m25/rules";
import { IMPACT_LEVEL_LABEL, MONITOR_FREQ_LABEL, PARTY_GROUP_LABEL } from "@/lib/m25/labels";

const th = "border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3";

// Đến hạn xem xét là TÍNH KHI ĐỌC (derived) từ tần suất theo dõi + lần cập nhật gần nhất —
// không lưu cột trạng thái quá hạn trong DB (thống nhất với M04/M17/M20).
export default async function M25MonitoringPage() {
  const now = new Date();
  const reviews = await prisma.m25ContextReview.findMany({
    where: { status: "APPROVED" },
    orderBy: { approvedAt: "desc" },
    take: 1,
    include: {
      issues: { where: { status: "CON_HIEU_LUC" }, include: { owner: { select: { name: true } } } },
      parties: { where: { status: "CON_HIEU_LUC" }, include: { owner: { select: { name: true } } } },
    },
  });
  const current = reviews[0];

  const dueIssues = (current?.issues ?? []).filter((i) => isDueForMonitoring(i.monitoringFrequency, i.updatedAt, now));
  const dueParties = (current?.parties ?? []).filter((p) => isDueForMonitoring(p.monitoringFrequency, p.updatedAt, now));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M25 · Theo dõi đến hạn xem xét</p>
        <h1 className="font-head text-2xl font-bold text-ink">Mục đến hạn xem xét lại</h1>
        {current ? (
          <p className="mt-1 text-sm text-ink-2">
            Kỳ đang có hiệu lực:{" "}
            <Link href={`/modules/M25/review/${current.id}`} className="font-mono text-accent hover:underline">
              {current.code}
            </Link>{" "}
            · {current.issues.length} vấn đề và {current.parties.length} bên quan tâm còn hiệu lực.
          </p>
        ) : (
          <p className="mt-1 text-sm text-ink-2">Chưa có kỳ xem xét bối cảnh nào được phê duyệt.</p>
        )}
      </div>

      <section className="flex flex-col gap-2">
        <h2 className="font-head text-sm font-bold text-ink">Vấn đề bối cảnh đến hạn ({dueIssues.length})</h2>
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[40rem] text-sm">
            <thead>
              <tr>
                <th className={th}>Mã</th>
                <th className={th}>Vấn đề</th>
                <th className={th}>Mức tác động</th>
                <th className={th}>Tần suất</th>
                <th className={th}>Chưa cập nhật</th>
                <th className={th}>Phụ trách</th>
              </tr>
            </thead>
            <tbody>
              {dueIssues.map((i) => (
                <tr key={i.id} className="border-b border-border last:border-0 hover:bg-sunk">
                  <td className="px-3 py-2 font-mono text-xs text-ink-2">{i.code}</td>
                  <td className="px-3 py-2 text-ink">{i.title}</td>
                  <td className="px-3 py-2 text-ink-2">{IMPACT_LEVEL_LABEL[i.impactLevel]}</td>
                  <td className="px-3 py-2 text-ink-2">{MONITOR_FREQ_LABEL[i.monitoringFrequency]}</td>
                  <td className="px-3 py-2 text-warn">{daysSince(i.updatedAt, now)} ngày</td>
                  <td className="px-3 py-2 text-ink-2">{i.owner?.name ?? "chưa gán"}</td>
                </tr>
              ))}
              {dueIssues.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-center text-sm text-ink-3">Không có vấn đề nào quá hạn theo dõi.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-head text-sm font-bold text-ink">Bên quan tâm đến hạn ({dueParties.length})</h2>
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[40rem] text-sm">
            <thead>
              <tr>
                <th className={th}>Mã</th>
                <th className={th}>Bên quan tâm</th>
                <th className={th}>Nhóm</th>
                <th className={th}>Tần suất</th>
                <th className={th}>Chưa cập nhật</th>
                <th className={th}>Đầu mối</th>
              </tr>
            </thead>
            <tbody>
              {dueParties.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-sunk">
                  <td className="px-3 py-2 font-mono text-xs text-ink-2">{p.code}</td>
                  <td className="px-3 py-2 text-ink">{p.name}</td>
                  <td className="px-3 py-2 text-ink-2">{PARTY_GROUP_LABEL[p.group]}</td>
                  <td className="px-3 py-2 text-ink-2">{MONITOR_FREQ_LABEL[p.monitoringFrequency]}</td>
                  <td className="px-3 py-2 text-warn">{daysSince(p.updatedAt, now)} ngày</td>
                  <td className="px-3 py-2 text-ink-2">{p.owner?.name ?? "chưa gán"}</td>
                </tr>
              ))}
              {dueParties.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-center text-sm text-ink-3">Không có bên quan tâm nào quá hạn theo dõi.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <p className="text-xs text-ink-3">
        Mục &quot;Theo sự kiện&quot; không có chu kỳ cố định nên không bao giờ bị tính là quá hạn.
      </p>
    </div>
  );
}
