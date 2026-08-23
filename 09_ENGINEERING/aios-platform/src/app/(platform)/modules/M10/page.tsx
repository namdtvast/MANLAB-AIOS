import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getM10Role } from "@/lib/m10/actor";
import { M10_ROLE_LABEL, RECORD_TYPE_LABEL, RESULT_LABEL, STATUS_LABEL } from "@/lib/m10/labels";

const STATUS_TONE: Record<string, "good" | "warn" | "crit" | "neutral"> = {
  DRAFT: "neutral",
  PENDING_REVIEW: "warn",
  RETURNED: "warn",
  PENDING_APPROVAL: "warn",
  REJECTED: "crit",
  APPROVED: "good",
  PUBLISHED: "good",
  EXPIRED: "crit",
  REVOKED: "crit",
};

const RESULT_TONE: Record<string, "good" | "warn" | "crit"> = {
  PASS: "good",
  WARNING: "warn",
  FAIL: "crit",
};

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

export default async function M10ListPage() {
  const [assessments, role] = await Promise.all([
    prisma.m10Assessment.findMany({ orderBy: { createdAt: "desc" }, include: { createdBy: true } }),
    getM10Role(),
  ]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-ink-3">
            M10 · MP10 · Đảm bảo giá trị sử dụng của kết quả
          </p>
          <h1 className="font-head text-2xl font-bold text-ink">Chương trình QC / dữ liệu PT</h1>
          <p className="mt-1 text-sm text-ink-2">
            Vai trò M10 của bạn:{" "}
            <strong className="text-ink">
              {role ? (M10_ROLE_LABEL[role] ?? role) : "Chưa được gán vai trò"}
            </strong>
          </p>
        </div>
        <Link
          href="/modules/M10/new"
          className="shrink-0 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90"
        >
          + Tạo hồ sơ
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full min-w-[36rem] text-sm">
          <thead>
            <tr>
              <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Mã hồ sơ</th>
              <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Loại</th>
              <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Đối tượng</th>
              <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Trạng thái</th>
              <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Kết quả</th>
              <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Người tạo</th>
            </tr>
          </thead>
          <tbody>
            {assessments.map((a) => (
              <tr key={a.id} className="border-b border-border last:border-0 hover:bg-sunk">
                <td className="px-3 py-2.5">
                  <Link href={`/modules/M10/${a.id}`} className="whitespace-nowrap font-mono text-xs font-medium text-accent hover:underline">
                    {a.code}
                  </Link>
                </td>
                <td className="px-3 py-2.5 text-ink">{RECORD_TYPE_LABEL[a.recordType]}</td>
                <td className="px-3 py-2.5 text-ink">{a.object}</td>
                <td className="px-3 py-2.5">
                  <Badge label={STATUS_LABEL[a.status]} tone={STATUS_TONE[a.status] ?? "neutral"} />
                </td>
                <td className="px-3 py-2.5">
                  {a.result ? (
                    <Badge label={RESULT_LABEL[a.result]} tone={RESULT_TONE[a.result] ?? "neutral"} />
                  ) : (
                    <span className="text-ink-3">—</span>
                  )}
                </td>
                <td className="px-3 py-2.5 text-ink-2">{a.createdBy.name}</td>
              </tr>
            ))}
            {assessments.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-8 text-center text-sm text-ink-3">
                  Chưa có hồ sơ nào — bấm “+ Tạo hồ sơ” để bắt đầu.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
