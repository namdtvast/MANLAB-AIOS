import Link from "next/link";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { getM13Role } from "@/lib/m13/actor";
import { CAP_STATUS_LABEL, M13_ROLE_LABEL, NCW_STATUS_LABEL, SEVERITY_LABEL, SOURCE_TYPE_LABEL } from "@/lib/m13/labels";
import { CanCuBanner } from "@/components/CanCuBanner";
import { StatCard } from "@/components/StatCard";
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

const NCW_TONE: Record<string, string> = {
  GHI_NHAN: "neutral",
  DANG_THEO_DOI: "warn",
  DANG_KHAC_PHUC: "crit",
  DA_KHAC_PHUC: "good",
};

const th = "border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3";

const LOC_LABEL: Record<string, string> = {
  "chua-dong": "Hồ sơ chưa đóng",
  "dung-viec": "Đang dừng công việc",
};

// Điều kiện lọc ở TẦNG DB, không lọc sau khi lấy: 10 dòng của một trang phải là 10 dòng của đúng
// nhóm đang xem, và thẻ chỉ số vẫn đếm trên toàn sổ chứ không phải trên trang đang hiện.
const WHERE: Record<string, Prisma.M13NonconformingWorkWhereInput> = {
  "chua-dong": { status: { not: "DA_KHAC_PHUC" } },
  "dung-viec": { stoppedWork: true },
};

export default async function M13ListPage({ searchParams }: { searchParams: Promise<{ loc?: string; trang?: string }> }) {
  const { loc, trang: trangRaw } = await searchParams;
  // Bộ lọc nông từ thẻ chỉ số — bấm vào con số thì thấy đúng những hồ sơ làm nên con số đó.
  const filter = loc && LOC_LABEL[loc] ? loc : null;
  const where = filter ? WHERE[filter] : undefined;

  const [tongAll, openCount, stoppedCount, tong, role] = await Promise.all([
    prisma.m13NonconformingWork.count(),
    prisma.m13NonconformingWork.count({ where: WHERE["chua-dong"] }),
    prisma.m13NonconformingWork.count({ where: WHERE["dung-viec"] }),
    prisma.m13NonconformingWork.count({ where }),
    getM13Role(),
  ]);
  const trang = chotTrang(trangRaw, tong);
  const listed = await prisma.m13NonconformingWork.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { detectedBy: true, plan: true },
    skip: boQua(trang),
    take: KICH_THUOC_TRANG,
  });

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

      <CanCuBanner moduleCode="M13" />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <StatCard label="Hồ sơ chưa đóng" value={openCount} href="/modules/M13?loc=chua-dong#so-theo-doi" />
        <StatCard
          label="Đang dừng công việc"
          value={stoppedCount}
          tone={stoppedCount > 0 ? "crit" : "ink"}
          href="/modules/M13?loc=dung-viec#so-theo-doi"
        />
        <StatCard label="Tổng hồ sơ" value={tongAll} href="/modules/M13#so-theo-doi" />
      </div>

      <section id="so-theo-doi" className="flex scroll-mt-24 flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-head text-sm font-bold text-ink">Sổ theo dõi công việc không phù hợp (F13.01)</h2>
          <Link href="/modules/M13/ncw/new" className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-ink hover:opacity-90">
            + Ghi nhận không phù hợp
          </Link>
        </div>

        {filter && (
          <p className="flex flex-wrap items-center gap-2 text-xs text-ink-2">
            Đang lọc: <strong className="text-ink">{LOC_LABEL[filter]}</strong> ({tong}/{tongAll} hồ sơ)
            <Link href="/modules/M13#so-theo-doi" className="font-medium text-accent hover:underline">
              Bỏ lọc
            </Link>
          </p>
        )}

        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[36rem] text-sm">
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
              {listed.map((n) => (
                <tr key={n.id} className="border-b border-border last:border-0 hover:bg-sunk">
                  <td className="px-3 py-2">
                    <Link href={`/modules/M13/ncw/${n.id}`} className="whitespace-nowrap font-mono text-xs font-medium text-accent hover:underline">
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
              {listed.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-center text-sm text-ink-3">
                    {filter ? `Không có hồ sơ nào thuộc nhóm “${LOC_LABEL[filter]}”.` : "Chưa có hồ sơ không phù hợp nào."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <PhanTrang path="/modules/M13" query={{ loc: filter ?? undefined }} neo="#so-theo-doi" trang={trang} tong={tong} donVi="hồ sơ" />
        </div>
      </section>
    </div>
  );
}
