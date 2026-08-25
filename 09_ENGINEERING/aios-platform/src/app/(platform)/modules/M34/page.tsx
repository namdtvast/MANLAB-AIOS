import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getM34Role } from "@/lib/m34/actor";
import { isQualityDue, isReviewDue } from "@/lib/m34/rules";
import {
  CLASSIFICATION_LABEL,
  CLASSIFICATION_TONE,
  DATASET_STATUS_LABEL,
  DATASET_STATUS_TONE,
  DATA_GROUP_LABEL,
  LIFECYCLE_LABEL,
  M34_ROLE_LABEL,
} from "@/lib/m34/labels";
import { CanCuBanner } from "@/components/CanCuBanner";

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

export default async function M34ListPage() {
  const [dataSets, role] = await Promise.all([
    prisma.m34DataSet.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        owner: { select: { name: true } },
        steward: { select: { name: true } },
        qualityMeasurements: { orderBy: { createdAt: "desc" }, take: 1, select: { status: true, measuredAt: true, createdAt: true } },
      },
    }),
    getM34Role(),
  ]);

  const now = new Date();
  const active = dataSets.filter((d) => d.status === "ACTIVE");

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs font-medium text-ink-3">M34 · MP34 · Quản lý dữ liệu số</p>
        <h1 className="font-head text-2xl font-bold text-ink">Danh mục dữ liệu số</h1>
        <p className="mt-1 text-sm text-ink-2">
          Vai trò M34 của bạn:{" "}
          <strong className="text-ink">{role ? (M34_ROLE_LABEL[role] ?? role) : "Chưa được gán vai trò"}</strong>
          {" · "}Chủ sở hữu dữ liệu (CSHDL) xét theo từng tập, không phải vai trò chung.
        </p>
      </div>

      <CanCuBanner moduleCode="M34" />

      <p className="rounded-xl border border-warn/30 bg-warn-soft px-4 py-3 text-xs text-warn">
        Thủ tục nguồn <strong>ETV.P34 đang ở trạng thái DỰ THẢO (Chờ soát xét)</strong> — các giá trị định lượng
        (kỳ đo, chu kỳ rà soát, thời hạn khắc phục) là đề xuất; Viện phê duyệt theo MP14 thì mọi con số chốt lại.
        Bản ghi chỉ <strong>mô tả</strong> tập dữ liệu, nghiêm cấm chứa dữ liệu thật (ETV.P34 §6.1.1).
      </p>

      <section className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-head text-sm font-bold text-ink">
            Tập dữ liệu ({active.length} hiệu lực / {dataSets.length} bản ghi)
          </h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/modules/M34/master-data" className="rounded-lg border border-border-strong px-3 py-1.5 text-xs font-semibold text-ink hover:bg-sunk">
              Dữ liệu chủ
            </Link>
            <Link href="/modules/M34/due" className="rounded-lg border border-border-strong px-3 py-1.5 text-xs font-semibold text-ink hover:bg-sunk">
              Bảng đến hạn
            </Link>
            <Link href="/modules/M34/report" className="rounded-lg border border-border-strong px-3 py-1.5 text-xs font-semibold text-ink hover:bg-sunk">
              Báo cáo 06 tháng
            </Link>
            <Link href="/modules/M34/dataset/new" className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-ink hover:opacity-90">
              + Khai báo tập dữ liệu
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[62rem] text-sm">
            <thead>
              <tr>
                <th className={th}>Mã</th>
                <th className={th}>Tên gọi</th>
                <th className={th}>Nhóm</th>
                <th className={th}>CSHDL / QTDL</th>
                <th className={th}>Phân loại</th>
                <th className={th}>Vòng đời</th>
                <th className={th}>Trạng thái</th>
                <th className={th}>Cảnh báo</th>
              </tr>
            </thead>
            <tbody>
              {dataSets.map((d) => {
                const lastQ = d.qualityMeasurements[0];
                const flags: { label: string; tone: string }[] = [];
                if (d.suspendedUse) flags.push({ label: "Dừng sử dụng", tone: "crit" });
                if (d.status === "ACTIVE" && isReviewDue(d.reviewCycle, d.lastReviewedAt, d.createdAt, now))
                  flags.push({ label: "Đến hạn rà soát", tone: "warn" });
                if (d.status === "ACTIVE" && isQualityDue(d.dataGroup, lastQ?.measuredAt ?? lastQ?.createdAt ?? null, d.approvedAt ?? d.createdAt, now))
                  flags.push({ label: "Đến hạn đo chất lượng", tone: "warn" });
                if (lastQ?.status === "KHONG_DAT") flags.push({ label: "Dưới ngưỡng", tone: "crit" });
                if (d.hasPersonalData) flags.push({ label: "Dữ liệu cá nhân", tone: "warn" });
                return (
                  <tr key={d.id} className="border-b border-border last:border-0 hover:bg-sunk">
                    <td className="px-3 py-2">
                      <Link href={`/modules/M34/dataset/${d.id}`} className="whitespace-nowrap font-mono text-xs font-medium text-accent hover:underline">
                        {d.code}
                      </Link>
                    </td>
                    <td className="px-3 py-2 text-ink">{d.name}</td>
                    <td className="px-3 py-2 text-xs text-ink-2">{DATA_GROUP_LABEL[d.dataGroup]}</td>
                    <td className="px-3 py-2 text-xs text-ink-2">
                      {d.owner.name} / {d.steward.name}
                    </td>
                    <td className="px-3 py-2">
                      <Badge label={CLASSIFICATION_LABEL[d.classification]} tone={CLASSIFICATION_TONE[d.classification]} />
                    </td>
                    <td className="px-3 py-2 text-xs text-ink-2">{LIFECYCLE_LABEL[d.lifecycleStage]}</td>
                    <td className="px-3 py-2">
                      <Badge label={DATASET_STATUS_LABEL[d.status]} tone={DATASET_STATUS_TONE[d.status]} />
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex flex-wrap gap-1">
                        {flags.map((f) => (
                          <Badge key={f.label} label={f.label} tone={f.tone} />
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {dataSets.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-3 py-6 text-center text-sm text-ink-3">
                    Chưa có tập dữ liệu nào trong danh mục.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
