import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getM25Role } from "@/lib/m25/actor";
import { CYCLE_TYPE_LABEL, M25_ROLE_LABEL, MGMT_SYSTEM_LABEL, REVIEW_STATUS_LABEL, REVIEW_STATUS_TONE } from "@/lib/m25/labels";
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

const th = "border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3";

export default async function M25ListPage({ searchParams }: { searchParams: Promise<{ trang?: string }> }) {
  const { trang: trangRaw } = await searchParams;
  // Kỳ đang hiệu lực tra riêng chứ không dò trong danh sách đang hiện: kỳ đó có thể nằm ở trang 3.
  const [tong, current, role] = await Promise.all([
    prisma.m25ContextReview.count(),
    prisma.m25ContextReview.findFirst({ where: { status: "APPROVED" }, orderBy: { createdAt: "desc" }, include: { approvedBy: true } }),
    getM25Role(),
  ]);
  const trang = chotTrang(trangRaw, tong);
  const reviews = await prisma.m25ContextReview.findMany({
    orderBy: { createdAt: "desc" },
    include: { createdBy: true, approvedBy: true, _count: { select: { issues: true, parties: true } } },
    skip: boQua(trang),
    take: KICH_THUOC_TRANG,
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs font-medium text-ink-3">M25 · MP25 · Bối cảnh tổ chức và các bên quan tâm</p>
        <h1 className="font-head text-2xl font-bold text-ink">Kỳ xem xét bối cảnh</h1>
        <p className="mt-1 text-sm text-ink-2">
          Vai trò M25 của bạn:{" "}
          <strong className="text-ink">{role ? (M25_ROLE_LABEL[role] ?? role) : "Chưa được gán vai trò"}</strong>
        </p>
      </div>

      <CanCuBanner moduleCode="M25" />

      <section id="danh-sach-ky" className="flex scroll-mt-24 flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-head text-sm font-bold text-ink">Danh sách kỳ</h2>
          <div className="flex gap-2">
            <Link href="/modules/M25/monitoring" className="rounded-lg border border-border-strong px-3 py-1.5 text-xs font-semibold text-ink hover:bg-sunk">
              Theo dõi đến hạn
            </Link>
            <Link href="/modules/M25/review/new" className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-ink hover:opacity-90">
              + Lập kỳ xem xét
            </Link>
          </div>
        </div>

        {current && (
          <p className="text-xs text-ink-3">
            Kỳ đang có hiệu lực:{" "}
            <Link href={`/modules/M25/review/${current.id}`} className="font-mono text-accent hover:underline">
              {current.code}
            </Link>{" "}
            · năm {current.periodYear} · phê duyệt bởi {current.approvedBy?.name ?? "—"}
          </p>
        )}

        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[44rem] text-sm">
            <thead>
              <tr>
                <th className={th}>Mã</th>
                <th className={th}>Loại</th>
                <th className={th}>Năm</th>
                <th className={th}>Phạm vi</th>
                <th className={th}>Vấn đề / Bên quan tâm</th>
                <th className={th}>Trạng thái</th>
                <th className={th}>Người lập</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0 hover:bg-sunk">
                  <td className="px-3 py-2">
                    <Link href={`/modules/M25/review/${r.id}`} className="whitespace-nowrap font-mono text-xs font-medium text-accent hover:underline">
                      {r.code}
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-ink">{CYCLE_TYPE_LABEL[r.cycleType]}</td>
                  <td className="px-3 py-2 text-ink-2">{r.periodYear}</td>
                  <td className="px-3 py-2 text-xs text-ink-2">{r.scopeSystems.map((s) => MGMT_SYSTEM_LABEL[s]).join(", ")}</td>
                  <td className="px-3 py-2 text-ink-2">
                    {r._count.issues} / {r._count.parties}
                  </td>
                  <td className="px-3 py-2">
                    <Badge label={REVIEW_STATUS_LABEL[r.status]} tone={REVIEW_STATUS_TONE[r.status]} />
                  </td>
                  <td className="px-3 py-2 text-ink-2">{r.createdBy.name}</td>
                </tr>
              ))}
              {reviews.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-3 py-6 text-center text-sm text-ink-3">
                    Chưa có kỳ xem xét bối cảnh nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <PhanTrang path="/modules/M25" neo="#danh-sach-ky" trang={trang} tong={tong} donVi="kỳ xem xét" />
        </div>
      </section>
    </div>
  );
}
