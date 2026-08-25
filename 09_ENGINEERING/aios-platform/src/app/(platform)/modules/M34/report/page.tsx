import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { isReviewDue } from "@/lib/m34/rules";
import {
  BELOW_THRESHOLD_CASE_LABEL,
  CLASSIFICATION_LABEL,
  DATA_GROUP_LABEL,
  LIFECYCLE_LABEL,
  QUALITY_DIMENSION_LABEL,
} from "@/lib/m34/labels";

const card = "rounded-xl border border-border bg-surface p-4";
const h2 = "font-head text-sm font-bold text-ink";

// Báo cáo tình hình dữ liệu số — đủ BẢY nội dung ETV.P34 §6.9. Mọi con số tính khi đọc từ bản ghi
// nghiệp vụ: số trên trang này và số trong báo cáo nộp LĐV luôn là một (DacTa M34/06_Dashboard).
export default async function M34ReportPage() {
  const [dataSets, quality, corrections, sharings, findings] = await Promise.all([
    prisma.m34DataSet.findMany({ include: { qualityMeasurements: { orderBy: { createdAt: "desc" }, take: 1 } } }),
    prisma.m34QualityMeasurement.findMany({ where: { status: { in: ["DAT", "KHONG_DAT"] } }, include: { rows: true, dataSet: { select: { code: true } } } }),
    prisma.m34DataCorrection.findMany({ include: { dataSet: { select: { code: true } } } }),
    prisma.m34SharingRequest.findMany({ where: { requestType: "RA_NGOAI_VIEN" } }),
    prisma.m34ParallelLookupFinding.findMany(),
  ]);
  const now = new Date();

  const count = <T,>(arr: T[], key: (t: T) => string) =>
    arr.reduce<Record<string, number>>((acc, t) => ({ ...acc, [key(t)]: (acc[key(t)] ?? 0) + 1 }), {});

  const byGroup = count(dataSets, (d) => DATA_GROUP_LABEL[d.dataGroup]);
  const byClass = count(dataSets, (d) => CLASSIFICATION_LABEL[d.classification]);
  const byStage = count(
    dataSets.filter((d) => ["ACTIVE", "ARCHIVED", "DISPOSAL_PROPOSED", "DISPOSED"].includes(d.status)),
    (d) => LIFECYCLE_LABEL[d.lifecycleStage],
  );

  // (2) tỷ lệ đạt theo chiều
  const dimStats = quality
    .flatMap((q) => q.rows)
    .reduce<Record<string, { pass: number; total: number }>>((acc, r) => {
      if (r.passed === null) return acc;
      const k = QUALITY_DIMENSION_LABEL[r.dimension];
      const cur = acc[k] ?? { pass: 0, total: 0 };
      return { ...acc, [k]: { pass: cur.pass + (r.passed ? 1 : 0), total: cur.total + 1 } };
    }, {});

  const failing = quality.filter((q) => q.status === "KHONG_DAT");
  const publishedImpactCorrections = corrections.filter((c) => c.publishedImpact === "DA_DUNG_PHAT_HANH");
  const approvedSharings = sharings.filter((s) => ["DA_PHE_DUYET", "DA_THUC_HIEN", "DA_THU_HOI"].includes(s.status));
  const revoked = sharings.filter((s) => s.status === "DA_THU_HOI");
  const causedError = findings.filter((f) => f.causedError);
  const reviewDue = dataSets.filter((d) => d.status === "ACTIVE" && isReviewDue(d.reviewCycle, d.lastReviewedAt, d.createdAt, now));
  const stageDue = dataSets.filter((d) => d.status === "ARCHIVED");

  const stat = (label: string, entries: Record<string, number>) => (
    <p className="text-sm text-ink-2">
      <strong className="text-ink">{label}:</strong>{" "}
      {Object.entries(entries)
        .map(([k, v]) => `${k}: ${v}`)
        .join(" · ") || "—"}
    </p>
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M34 · Báo cáo tình hình dữ liệu số 06 tháng/lần — ETV.P34 §6.9 (QLCL tổng hợp, trình theo ETV.P17)</p>
        <h1 className="font-head text-2xl font-bold text-ink">Báo cáo tình hình dữ liệu số</h1>
        <p className="mt-1 text-sm text-ink-2">Bảy nội dung bắt buộc — số liệu tính trực tiếp từ bản ghi tại thời điểm mở trang.</p>
      </div>
      <Link href="/modules/M34" className="text-xs text-accent hover:underline">
        ← Danh mục dữ liệu số
      </Link>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <section className={card}>
          <h2 className={h2}>(1) Tổng số tập dữ liệu — {dataSets.length} bản ghi</h2>
          <div className="mt-2 flex flex-col gap-1">
            {stat("Theo nhóm", byGroup)}
            {stat("Theo mức phân loại", byClass)}
            {stat("Theo giai đoạn vòng đời", byStage)}
          </div>
        </section>

        <section className={card}>
          <h2 className={h2}>(2) Kết quả đo chất lượng theo chiều — {quality.length} kỳ đã chốt</h2>
          <div className="mt-2 flex flex-col gap-1">
            {Object.entries(dimStats).map(([k, v]) => (
              <p key={k} className="text-sm text-ink-2">
                <strong className="text-ink">{k}:</strong> {v.pass}/{v.total} đạt ({v.total ? Math.round((v.pass / v.total) * 100) : 0}%)
              </p>
            ))}
            {Object.keys(dimStats).length === 0 && <p className="text-sm text-ink-3">Chưa có kỳ đo nào chốt.</p>}
          </div>
        </section>

        <section className={card}>
          <h2 className={h2}>(3) Tập dưới ngưỡng và tình trạng khắc phục — {failing.length}</h2>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-ink-2">
            {failing.map((q) => (
              <li key={q.id}>
                {q.dataSet.code} · kỳ {q.period} · {q.belowThresholdCase ? BELOW_THRESHOLD_CASE_LABEL[q.belowThresholdCase] : "—"}
                {q.capaRef && ` · KPH ${q.capaRef}`} · hạn khắc phục {q.remediationDue?.toLocaleDateString("vi-VN") ?? "—"}
              </li>
            ))}
            {failing.length === 0 && <li className="text-ink-3">Không có tập nào dưới ngưỡng.</li>}
          </ul>
        </section>

        <section className={card}>
          <h2 className={h2}>
            (4) Hiệu chỉnh dữ liệu — {corrections.length} đề nghị, trong đó ảnh hưởng kết quả đã phát hành: {publishedImpactCorrections.length}
          </h2>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-ink-2">
            {publishedImpactCorrections.map((c) => (
              <li key={c.id}>
                {c.code} · {c.dataSet.code} · kết luận M10/M11: {c.validityRef ?? "chưa có (đang chặn — R12)"}
              </li>
            ))}
            {publishedImpactCorrections.length === 0 && <li className="text-ink-3">Không có trường hợp ảnh hưởng phát hành.</li>}
          </ul>
        </section>

        <section className={card}>
          <h2 className={h2}>
            (5) Chia sẻ ra ngoài Viện — {approvedSharings.length} phiếu đã phê duyệt, đã thu hồi {revoked.length}
          </h2>
          <p className="mt-2 text-sm text-ink-2">
            Đang trong hạn sử dụng: {sharings.filter((s) => s.status === "DA_THUC_HIEN" && (!s.revokeDue || s.revokeDue >= now)).length} · Quá hạn
            chưa thu hồi:{" "}
            <strong className="text-crit">{sharings.filter((s) => s.status === "DA_THUC_HIEN" && s.revokeDue && s.revokeDue < now).length}</strong>
          </p>
        </section>

        <section className={card}>
          <h2 className={h2}>
            (6) Bảng tra song song, kênh chưa duyệt — {findings.length} phát hiện, gây sai lệch {causedError.length}
          </h2>
          <p className="mt-2 text-sm text-ink-2">
            Đã xử lý xong: {findings.filter((f) => f.status === "DA_XU_LY").length} · Vi phạm kênh cá nhân bị chặn ngay tại tầng nhập liệu (R19),
            trường hợp phát hiện qua sự cố ghi nhận ở M28/M13.
          </p>
        </section>

        <section className={`${card} lg:col-span-2`}>
          <h2 className={h2}>
            (7) Đến hạn rà soát: {reviewDue.length} tập · đến hạn chuyển giai đoạn vòng đời (đang Lưu trữ): {stageDue.length} tập
          </h2>
          <p className="mt-2 text-sm text-ink-2">
            Chi tiết từng tập xem <Link href="/modules/M34/due" className="text-accent hover:underline">Bảng đến hạn</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
