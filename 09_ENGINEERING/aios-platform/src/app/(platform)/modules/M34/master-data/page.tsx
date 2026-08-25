import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getM34Role } from "@/lib/m34/actor";
import { FINDING_STATUS_LABEL, MASTER_STATUS_LABEL, MASTER_STATUS_TONE } from "@/lib/m34/labels";
import { MasterActions, NewFindingForm, NewMasterForm, ResolveFindingButton } from "./MasterActions";

const TONE_CLASS: Record<string, string> = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  crit: "bg-crit-soft text-crit",
  neutral: "bg-sunk text-ink-2",
};

export default async function M34MasterDataPage() {
  const [sources, role, dataSets] = await Promise.all([
    prisma.m34MasterDataSource.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        dataSet: { select: { id: true, code: true, name: true } },
        findings: { orderBy: { createdAt: "desc" } },
        mergeMaps: { orderBy: { createdAt: "desc" }, take: 5 },
      },
    }),
    getM34Role(),
    prisma.m34DataSet.findMany({ where: { dataGroup: "DU_LIEU_CHU" }, select: { id: true, code: true, name: true }, orderBy: { code: "asc" } }),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-ink-3">M34 · Dữ liệu chủ và nguồn sự thật duy nhất (ETV.P34 §6.2)</p>
        <h1 className="font-head text-2xl font-bold text-ink">Dữ liệu chủ</h1>
        <p className="mt-1 text-sm text-ink-2">
          Mỗi loại dữ liệu chủ chỉ có <strong>một</strong> nguồn được LĐV công nhận (R9). Bảng tra song song là sự không phù hợp —
          ngừng dùng ngay, đối chiếu, cập nhật về nguồn, KPH nếu đã gây sai lệch (R10).
        </p>
      </div>
      <Link href="/modules/M34" className="text-xs text-accent hover:underline">
        ← Danh mục dữ liệu số
      </Link>

      <NewMasterForm dataSets={dataSets} />

      <div className="flex flex-col gap-4">
        {sources.map((m) => (
          <section key={m.id} className="rounded-xl border border-border bg-surface p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-ink">
                  <span className="font-mono text-xs">{m.code}</span> · {m.masterType}
                </p>
                <p className="text-xs text-ink-2">
                  Nguồn sự thật: <strong>{m.sourceSystem}</strong> · Người sửa tại nguồn: {m.authorizedEditors} · Tập:{" "}
                  <Link href={`/modules/M34/dataset/${m.dataSet.id}`} className="font-mono text-accent hover:underline">
                    {m.dataSet.code}
                  </Link>
                  {m.syncTargets.length > 0 && ` · Đồng bộ (M37): ${m.syncTargets.join(", ")}`}
                  {m.recognizedAt && ` · Công nhận: ${m.recognizedAt.toLocaleDateString("vi-VN")}`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[MASTER_STATUS_TONE[m.status]]}`}>
                  {MASTER_STATUS_LABEL[m.status]}
                </span>
                <MasterActions id={m.id} status={m.status} role={role} />
              </div>
            </div>

            {m.mergeMaps.length > 0 && (
              <p className="mt-2 text-xs text-ink-3">
                Ánh xạ hợp nhất gần nhất: {m.mergeMaps.map((mm) => `${mm.oldRef} → ${mm.survivingRef}`).join(" · ")}
              </p>
            )}

            <div className="mt-3 border-t border-border pt-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-ink">Bảng tra song song phát hiện (F34.01 phần III.1)</h3>
                <NewFindingForm masterSourceId={m.id} />
              </div>
              <ul className="mt-2 flex flex-col gap-2">
                {m.findings.map((f) => (
                  <li key={f.id} className="rounded-lg border border-border p-2 text-xs text-ink-2">
                    <span className="font-mono">{f.code}</span> · {f.description} · Dùng bởi: {f.usedBy} · Cho việc: {f.usedFor} · Chênh lệch:{" "}
                    {f.diffNote} · {f.causedError ? `Đã gây sai lệch — KPH ${f.capaRef ?? "THIẾU"}` : "Chưa gây sai lệch"} ·{" "}
                    <strong>{FINDING_STATUS_LABEL[f.status]}</strong>
                    {f.status !== "DA_XU_LY" && <ResolveFindingButton id={f.id} />}
                  </li>
                ))}
                {m.findings.length === 0 && <li className="text-xs text-ink-3">Chưa phát hiện bảng tra song song nào.</li>}
              </ul>
            </div>
          </section>
        ))}
        {sources.length === 0 && <p className="text-sm text-ink-3">Chưa có loại dữ liệu chủ nào được đề nghị công nhận.</p>}
      </div>
    </div>
  );
}
