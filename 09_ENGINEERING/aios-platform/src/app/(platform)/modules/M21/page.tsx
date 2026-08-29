import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getM21Role } from "@/lib/m21/actor";
import { createDLRecordAndRedirect, createQTMTRecordAndRedirect } from "@/lib/m21/actions";
import { M21_ROLE_LABEL, RECORD_TYPE_SHORT, STATUS_LABEL, STATUS_TONE } from "@/lib/m21/labels";
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
    <span className={`inline-flex items-center rounded-full whitespace-nowrap px-2 py-0.5 text-xs font-medium ${TONE_CLASS[tone]}`}>
      {label}
    </span>
  );
}

export default async function M21ListPage({ searchParams }: { searchParams: Promise<{ trang?: string }> }) {
  const { trang: trangRaw } = await searchParams;
  const [tong, role] = await Promise.all([prisma.m21Record.count(), getM21Role()]);
  const trang = chotTrang(trangRaw, tong);
  const records = await prisma.m21Record.findMany({
    orderBy: { createdAt: "desc" },
    include: { createdBy: true, lines: true },
    skip: boQua(trang),
    take: KICH_THUOC_TRANG,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-ink-3">
            M21 · MP21 · Công bố, thông báo và kiểm soát năng lực hoạt động
          </p>
          <h1 className="font-head text-2xl font-bold text-ink">Công bố / Thông báo năng lực ĐL–QTMT</h1>
          <p className="mt-1 text-sm text-ink-2">
            Vai trò M21 của bạn:{" "}
            <strong className="text-ink">{role ? (M21_ROLE_LABEL[role] ?? role) : "Chưa được gán vai trò"}</strong>
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <form action={createDLRecordAndRedirect}>
            <button type="submit" className="cursor-pointer rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90">
              + Đo lường (Mẫu 01)
            </button>
          </form>
          <form action={createQTMTRecordAndRedirect}>
            <button type="submit" className="cursor-pointer rounded-lg border border-border-strong px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-sunk">
              + Quan trắc MT (Mẫu 9.01)
            </button>
          </form>
        </div>
      </div>

      <CanCuBanner moduleCode="M21" />

      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full min-w-[36rem] text-sm">
          <thead>
            <tr>
              <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Mã hồ sơ</th>
              <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Loại</th>
              <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Tổ chức</th>
              <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Số dòng</th>
              <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Trạng thái</th>
              <th className="border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3">Người tạo</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id} className="border-b border-border last:border-0 hover:bg-sunk">
                <td className="px-3 py-2.5">
                  <Link href={`/modules/M21/${r.id}`} className="whitespace-nowrap font-mono text-xs font-medium text-accent hover:underline">
                    {r.code}
                  </Link>
                </td>
                <td className="px-3 py-2.5 text-ink">{RECORD_TYPE_SHORT[r.loai]}</td>
                <td className="px-3 py-2.5 text-ink">{r.toChuc}</td>
                <td className="px-3 py-2.5 text-ink-2">{r.lines.length}</td>
                <td className="px-3 py-2.5">
                  <Badge label={STATUS_LABEL[r.status]} tone={STATUS_TONE[r.status] ?? "neutral"} />
                </td>
                <td className="px-3 py-2.5 text-ink-2">{r.createdBy.name}</td>
              </tr>
            ))}
            {records.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-8 text-center text-sm text-ink-3">
                  Chưa có hồ sơ nào — bấm một trong hai nút phía trên để bắt đầu.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <PhanTrang path="/modules/M21" trang={trang} tong={tong} donVi="hồ sơ" />
      </div>
    </div>
  );
}
