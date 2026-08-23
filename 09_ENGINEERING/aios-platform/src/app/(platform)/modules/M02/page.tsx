import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getM02Role } from "@/lib/m02/actor";
import {
  COMMITMENT_STATUS_LABEL,
  COMMITMENT_TYPE_LABEL,
  DISCLOSURE_STATUS_LABEL,
  INCIDENT_STATUS_LABEL,
  M02_ROLE_LABEL,
} from "@/lib/m02/labels";

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

const COMMITMENT_TONE: Record<string, string> = { HIEU_LUC: "good", DA_THU_HOI: "neutral" };
const DISCLOSURE_TONE: Record<string, string> = { DRAFT: "warn", APPROVED: "good" };
const INCIDENT_TONE: Record<string, string> = { DETECTED: "crit", ASSESSED: "warn", CLOSED: "good" };

export default async function M02ListPage() {
  const [commitments, visitorLogs, disclosures, incidents, role] = await Promise.all([
    prisma.m02SecurityCommitment.findMany({ orderBy: { createdAt: "desc" }, take: 20 }),
    prisma.m02VisitorLog.findMany({ orderBy: { createdAt: "desc" }, take: 10, include: { commitment: true } }),
    prisma.m02DisclosureApproval.findMany({ orderBy: { createdAt: "desc" }, take: 10 }),
    prisma.m02SecurityIncident.findMany({ orderBy: { createdAt: "desc" }, take: 10 }),
    getM02Role(),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs font-medium text-ink-3">M02 · MP02 · Bảo mật thông tin</p>
        <h1 className="font-head text-2xl font-bold text-ink">Cam kết, Khách, Công bố &amp; Sự cố</h1>
        <p className="mt-1 text-sm text-ink-2">
          Vai trò M02 của bạn:{" "}
          <strong className="text-ink">{role ? (M02_ROLE_LABEL[role] ?? role) : "Chưa được gán vai trò"}</strong>
        </p>
      </div>

      <section className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-head text-sm font-bold text-ink">Cam kết bảo mật</h2>
          <Link href="/modules/M02/commitment/new" className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-ink hover:opacity-90">
            + Ghi nhận cam kết
          </Link>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[36rem] text-sm">
            <thead>
              <tr>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Mã</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Người ký</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Loại</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {commitments.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-sunk">
                  <td className="px-3 py-2">
                    <Link href={`/modules/M02/commitment/${c.id}`} className="whitespace-nowrap font-mono text-xs font-medium text-accent hover:underline">
                      {c.code}
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-ink">{c.personName}</td>
                  <td className="px-3 py-2 text-ink-2">{COMMITMENT_TYPE_LABEL[c.type]}</td>
                  <td className="px-3 py-2">
                    <Badge label={COMMITMENT_STATUS_LABEL[c.status]} tone={COMMITMENT_TONE[c.status]} />
                  </td>
                </tr>
              ))}
              {commitments.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-3 py-6 text-center text-sm text-ink-3">Chưa có cam kết nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-head text-sm font-bold text-ink">Sổ khách ra vào khu vực hạn chế</h2>
          <Link href="/modules/M02/visitor/new" className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-ink hover:opacity-90">
            + Ghi sổ khách
          </Link>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[36rem] text-sm">
            <thead>
              <tr>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Mã</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Khách</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Khu vực</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Giờ vào</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Giờ ra</th>
              </tr>
            </thead>
            <tbody>
              {visitorLogs.map((v) => (
                <tr key={v.id} className="border-b border-border last:border-0 hover:bg-sunk">
                  <td className="px-3 py-2 font-mono text-xs text-ink">{v.code}</td>
                  <td className="px-3 py-2 text-ink">{v.visitorName}</td>
                  <td className="px-3 py-2 text-ink-2">{v.area}</td>
                  <td className="px-3 py-2 text-ink-2">{v.entryTime.toLocaleString("vi-VN")}</td>
                  <td className="px-3 py-2 text-ink-2">{v.exitTime ? v.exitTime.toLocaleString("vi-VN") : "—"}</td>
                </tr>
              ))}
              {visitorLogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-3 py-6 text-center text-sm text-ink-3">Chưa có khách nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-head text-sm font-bold text-ink">Công bố thông tin ra bên thứ ba</h2>
          <Link href="/modules/M02/disclosure/new" className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-ink hover:opacity-90">
            + Soạn hồ sơ công bố
          </Link>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[36rem] text-sm">
            <thead>
              <tr>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Mã</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Người nhận</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {disclosures.map((d) => (
                <tr key={d.id} className="border-b border-border last:border-0 hover:bg-sunk">
                  <td className="px-3 py-2">
                    <Link href={`/modules/M02/disclosure/${d.id}`} className="whitespace-nowrap font-mono text-xs font-medium text-accent hover:underline">
                      {d.code}
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-ink">{d.recipient}</td>
                  <td className="px-3 py-2">
                    <Badge label={DISCLOSURE_STATUS_LABEL[d.status]} tone={DISCLOSURE_TONE[d.status]} />
                  </td>
                </tr>
              ))}
              {disclosures.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-3 py-6 text-center text-sm text-ink-3">Chưa có hồ sơ công bố nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-head text-sm font-bold text-ink">Sự cố bảo mật</h2>
          <Link href="/modules/M02/incident/new" className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-ink hover:opacity-90">
            + Báo cáo sự cố
          </Link>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[36rem] text-sm">
            <thead>
              <tr>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Mã</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Biện pháp ngăn chặn</th>
                <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((i) => (
                <tr key={i.id} className="border-b border-border last:border-0 hover:bg-sunk">
                  <td className="px-3 py-2">
                    <Link href={`/modules/M02/incident/${i.id}`} className="whitespace-nowrap font-mono text-xs font-medium text-accent hover:underline">
                      {i.code}
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-ink">{i.containmentAction}</td>
                  <td className="px-3 py-2">
                    <Badge label={INCIDENT_STATUS_LABEL[i.status]} tone={INCIDENT_TONE[i.status]} />
                  </td>
                </tr>
              ))}
              {incidents.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-3 py-6 text-center text-sm text-ink-3">Chưa có sự cố nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
