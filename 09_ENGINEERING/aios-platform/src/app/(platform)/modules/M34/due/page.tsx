import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { isQualityDue, isReviewDue, reviewOverdueCycles } from "@/lib/m34/rules";
import { DATA_GROUP_LABEL, LIFECYCLE_LABEL } from "@/lib/m34/labels";

const card = "rounded-xl border border-border bg-surface p-4";

function Row({ href, code, name, note, tone }: { href: string; code: string; name: string; note: string; tone?: "warn" | "crit" }) {
  return (
    <li className="flex flex-wrap items-center justify-between gap-2 border-b border-border py-2 text-sm last:border-0">
      <span>
        <Link href={href} className="font-mono text-xs text-accent hover:underline">
          {code}
        </Link>{" "}
        <span className="text-ink">{name}</span>
      </span>
      <span className={`text-xs ${tone === "crit" ? "font-semibold text-crit" : "text-ink-2"}`}>{note}</span>
    </li>
  );
}

// Bảng đến hạn — 5 nhóm cờ TÍNH KHI ĐỌC, không lưu cột (ETV.P34 Phụ lục II.1; DacTa M34 mục 6).
export default async function M34DuePage() {
  const [dataSets, sharings] = await Promise.all([
    prisma.m34DataSet.findMany({
      where: { status: { in: ["ACTIVE", "ARCHIVED"] } },
      include: { qualityMeasurements: { orderBy: { createdAt: "desc" }, take: 1 } },
    }),
    prisma.m34SharingRequest.findMany({
      where: { status: "DA_THUC_HIEN" },
      include: { dataSet: { select: { id: true, code: true } } },
    }),
  ]);
  const now = new Date();

  const reviewDue = dataSets.filter((d) => d.status === "ACTIVE" && isReviewDue(d.reviewCycle, d.lastReviewedAt, d.createdAt, now));
  const qualityDue = dataSets.filter((d) => {
    const q = d.qualityMeasurements[0];
    return d.status === "ACTIVE" && isQualityDue(d.dataGroup, q?.measuredAt ?? q?.createdAt ?? null, d.approvedAt ?? d.createdAt, now);
  });
  const lifecycleDue = dataSets.filter((d) => d.status === "ARCHIVED" || d.qualityMeasurements[0]?.status === "KHONG_DAT" || d.suspendedUse);
  const revokeOverdue = sharings.filter((s) => s.revokeDue && s.revokeDue < now);
  const personalOver2 = dataSets.filter(
    (d) => d.hasPersonalData && reviewOverdueCycles(d.reviewCycle, d.lastReviewedAt, d.createdAt, now) >= 2,
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M34 · Bảng đến hạn — cờ tính khi đọc (ETV.P34 Phụ lục II.1)</p>
        <h1 className="font-head text-2xl font-bold text-ink">Bảng đến hạn</h1>
      </div>
      <Link href="/modules/M34" className="text-xs text-accent hover:underline">
        ← Danh mục dữ liệu số
      </Link>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <section className={card}>
          <h2 className="font-head text-sm font-bold text-ink">1 · Đến hạn rà soát định kỳ ({reviewDue.length}) — R8</h2>
          <ul className="mt-2">
            {reviewDue.map((d) => (
              <Row
                key={d.id}
                href={`/modules/M34/dataset/${d.id}`}
                code={d.code}
                name={d.name}
                note={`${d.reviewCycle === "THANG_06" ? "06 tháng (dữ liệu cá nhân)" : "12 tháng"} · lần cuối ${d.lastReviewedAt?.toLocaleDateString("vi-VN") ?? "chưa"}`}
              />
            ))}
            {reviewDue.length === 0 && <li className="py-2 text-sm text-ink-3">Không có tập nào đến hạn.</li>}
          </ul>
        </section>

        <section className={card}>
          <h2 className="font-head text-sm font-bold text-ink">2 · Đến hạn đo chất lượng ({qualityDue.length}) — §6.4.2</h2>
          <ul className="mt-2">
            {qualityDue.map((d) => (
              <Row key={d.id} href={`/modules/M34/dataset/${d.id}`} code={d.code} name={d.name} note={DATA_GROUP_LABEL[d.dataGroup]} />
            ))}
            {qualityDue.length === 0 && <li className="py-2 text-sm text-ink-3">Không có tập nào đến hạn.</li>}
          </ul>
        </section>

        <section className={card}>
          <h2 className="font-head text-sm font-bold text-ink">3 · Theo dõi vòng đời / dưới ngưỡng / dừng sử dụng ({lifecycleDue.length})</h2>
          <ul className="mt-2">
            {lifecycleDue.map((d) => (
              <Row
                key={d.id}
                href={`/modules/M34/dataset/${d.id}`}
                code={d.code}
                name={d.name}
                tone={d.suspendedUse ? "crit" : undefined}
                note={[LIFECYCLE_LABEL[d.lifecycleStage], d.suspendedUse && "DỪNG SỬ DỤNG", d.qualityMeasurements[0]?.status === "KHONG_DAT" && "dưới ngưỡng"]
                  .filter(Boolean)
                  .join(" · ")}
              />
            ))}
            {lifecycleDue.length === 0 && <li className="py-2 text-sm text-ink-3">Không có tập nào cần theo dõi.</li>}
          </ul>
        </section>

        <section className={card}>
          <h2 className="font-head text-sm font-bold text-ink">4 · Chia sẻ quá hạn chưa thu hồi ({revokeOverdue.length}) — R18</h2>
          <ul className="mt-2">
            {revokeOverdue.map((s) => (
              <Row
                key={s.id}
                href={`/modules/M34/dataset/${s.dataSet.id}`}
                code={s.code}
                name={s.recipient ?? "nội bộ"}
                tone="crit"
                note={`hạn ${s.revokeDue?.toLocaleDateString("vi-VN")} — yêu cầu bên nhận xóa/trả`}
              />
            ))}
            {revokeOverdue.length === 0 && <li className="py-2 text-sm text-ink-3">Không có phiếu nào quá hạn.</li>}
          </ul>
        </section>

        <section className={`${card} lg:col-span-2`}>
          <h2 className="font-head text-sm font-bold text-ink">
            5 · Dữ liệu cá nhân quá 02 chu kỳ chưa rà soát ({personalOver2.length}) — báo cáo LĐV (ETV.P34 Phụ lục I.2)
          </h2>
          <ul className="mt-2">
            {personalOver2.map((d) => (
              <Row
                key={d.id}
                href={`/modules/M34/dataset/${d.id}`}
                code={d.code}
                name={d.name}
                tone="crit"
                note={`${reviewOverdueCycles(d.reviewCycle, d.lastReviewedAt, d.createdAt, now)} chu kỳ 06 tháng — phải báo cáo LĐV`}
              />
            ))}
            {personalOver2.length === 0 && <li className="py-2 text-sm text-ink-3">Không có tập nào quá 02 chu kỳ.</li>}
          </ul>
        </section>
      </div>
    </div>
  );
}
