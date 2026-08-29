import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { KICH_THUOC_TRANG, PhanTrang, boQua, chotTrang } from "@/components/PhanTrang";
import { BELOW_THRESHOLD_CASE_LABEL, QUALITY_STATUS_LABEL, QUALITY_STATUS_TONE, TREND_LABEL } from "@/lib/m34/labels";

const TONE_CLASS: Record<string, string> = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  crit: "bg-crit-soft text-crit",
  neutral: "bg-sunk text-ink-2",
};
const th = "border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-3";

export default async function M34QualityPage({ searchParams }: { searchParams: Promise<{ trang?: string }> }) {
  const { trang: trangRaw } = await searchParams;
  const [tong, failing] = await Promise.all([
    prisma.m34QualityMeasurement.count(),
    prisma.m34QualityMeasurement.count({ where: { status: "KHONG_DAT" } }),
  ]);
  const trang = chotTrang(trangRaw, tong);
  const measurements = await prisma.m34QualityMeasurement.findMany({
    orderBy: { createdAt: "desc" },
    include: { dataSet: { select: { id: true, code: true, name: true, suspendedUse: true } }, rows: true, measuredBy: { select: { name: true } } },
    skip: boQua(trang),
    take: KICH_THUOC_TRANG,
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M34 · Đo chất lượng dữ liệu — sáu chiều (ETV.P34 §6.4)</p>
        <h1 className="font-head text-2xl font-bold text-ink">Kỳ đo chất lượng</h1>
        <p className="mt-1 text-sm text-ink-2">
          {tong} kỳ đo · {failing} kỳ Không đạt đang theo dõi khắc phục (hạn 15 ngày làm việc — R15).
        </p>
      </div>
      <Link href="/modules/M34" className="text-xs text-accent hover:underline">
        ← Danh mục dữ liệu số
      </Link>

      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full min-w-[56rem] text-sm">
          <thead>
            <tr>
              <th className={th}>Mã</th>
              <th className={th}>Tập dữ liệu</th>
              <th className={th}>Kỳ</th>
              <th className={th}>Đạt/chiều</th>
              <th className={th}>Người đo</th>
              <th className={th}>Xu hướng</th>
              <th className={th}>Trạng thái</th>
              <th className={th}>Tình huống xử lý</th>
            </tr>
          </thead>
          <tbody>
            {measurements.map((m) => {
              const passCount = m.rows.filter((r) => r.passed === true).length;
              return (
                <tr key={m.id} className="border-b border-border last:border-0 hover:bg-sunk">
                  <td className="px-3 py-2 font-mono text-xs text-ink">{m.code}</td>
                  <td className="px-3 py-2">
                    <Link href={`/modules/M34/dataset/${m.dataSet.id}`} className="text-accent hover:underline">
                      {m.dataSet.code} — {m.dataSet.name}
                    </Link>
                    {m.dataSet.suspendedUse && (
                      <span className="ml-1 rounded-full bg-crit-soft px-2 py-0.5 text-xs font-medium text-crit">Dừng sử dụng</span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-ink-2">{m.period}</td>
                  <td className="px-3 py-2 text-ink-2">
                    {passCount}/{m.rows.length}
                  </td>
                  <td className="px-3 py-2 text-xs text-ink-2">{m.measuredBy?.name ?? "—"}</td>
                  <td className="px-3 py-2 text-xs text-ink-2">{m.trend ? TREND_LABEL[m.trend] : "—"}</td>
                  <td className="px-3 py-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[QUALITY_STATUS_TONE[m.status]]}`}>
                      {QUALITY_STATUS_LABEL[m.status]}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-xs text-ink-2">
                    {m.belowThresholdCase ? BELOW_THRESHOLD_CASE_LABEL[m.belowThresholdCase] : "—"}
                    {m.capaRef && ` · KPH ${m.capaRef}`}
                  </td>
                </tr>
              );
            })}
            {measurements.length === 0 && (
              <tr>
                <td colSpan={8} className="px-3 py-6 text-center text-sm text-ink-3">
                  Chưa có kỳ đo nào — mở kỳ từ trang chi tiết tập dữ liệu.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <PhanTrang path="/modules/M34/quality" trang={trang} tong={tong} donVi="kỳ đo" />
      </div>
    </div>
  );
}
