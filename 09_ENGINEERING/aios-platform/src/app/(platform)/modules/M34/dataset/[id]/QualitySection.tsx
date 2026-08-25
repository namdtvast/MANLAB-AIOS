"use client";

// Kỳ đo chất lượng sáu chiều — F34.02 phần A (ETV.P34 §6.4). Kỳ đã chốt là hồ sơ bất biến.
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { concludeQuality, createQualityMeasurement, recordQualityRows } from "@/lib/m34/actions";
import { BELOW_THRESHOLD_CASE_LABEL, QUALITY_DIMENSION_LABEL, QUALITY_STATUS_LABEL, QUALITY_STATUS_TONE, TREND_LABEL } from "@/lib/m34/labels";
import type { M34BelowThresholdCase, M34QualityDimension } from "@/generated/prisma/enums";

const btn =
  "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const btnGhost =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-xs text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";
const inputCls = "rounded-lg border border-border bg-bg px-2 py-1 text-xs text-ink outline-none focus:border-accent-line";
const TONE_CLASS: Record<string, string> = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  crit: "bg-crit-soft text-crit",
  neutral: "bg-sunk text-ink-2",
};

interface Row {
  dimension: M34QualityDimension;
  metric: string;
  threshold: string;
  value: string | null;
  passed: boolean | null;
}

interface Measurement {
  id: string;
  code: string;
  period: string;
  status: string;
  trend: string | null;
  belowThresholdCase: string | null;
  remediationPlan: string | null;
  capaRef: string | null;
  measuredByName: string | null;
  rows: Row[];
}

export function QualitySection({
  dataSetId,
  dataGroup,
  qualityDue,
  suspendedUse,
  m34Role,
  measurements,
}: {
  dataSetId: string;
  dataGroup: string;
  qualityDue: boolean;
  suspendedUse: boolean;
  m34Role: string | null;
  measurements: Measurement[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState("");
  const [editRows, setEditRows] = useState<Record<string, Row[]>>({});
  const [conclude, setConclude] = useState<{ caseCode: string; plan: string; capaRef: string; trend: string }>({
    caseCode: "",
    plan: "",
    capaRef: "",
    trend: "GIU_NGUYEN",
  });

  const run = (fn: () => Promise<{ ok: boolean; message?: string }>) => {
    setError(null);
    startTransition(async () => {
      const r = await fn();
      if (!r.ok) setError(r.message ?? "Có lỗi xảy ra.");
      else router.refresh();
    });
  };

  const rowsOf = (m: Measurement) => editRows[m.id] ?? m.rows;
  const setRow = (m: Measurement, dim: string, patch: Partial<Row>) =>
    setEditRows((s) => ({ ...s, [m.id]: rowsOf(m).map((r) => (r.dimension === dim ? { ...r, ...patch } : r)) }));

  return (
    <section className="rounded-xl border border-border bg-surface p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-head text-sm font-bold text-ink">
          Chất lượng dữ liệu — sáu chiều (ETV.P34 §6.4){" "}
          {qualityDue && <span className="ml-1 rounded-full bg-warn-soft px-2 py-0.5 text-xs font-medium text-warn">Đến hạn đo</span>}
          {suspendedUse && <span className="ml-1 rounded-full bg-crit-soft px-2 py-0.5 text-xs font-medium text-crit">Đang dừng sử dụng</span>}
        </h2>
        <div className="flex gap-2">
          <input placeholder="Kỳ đo (vd 2026-Q3)" value={period} onChange={(e) => setPeriod(e.target.value)} className={inputCls} />
          <button className={btn} disabled={isPending} onClick={() => run(() => createQualityMeasurement(dataSetId, period))}>
            + Mở kỳ đo
          </button>
        </div>
      </div>
      {error && <p className="mt-2 rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}
      {dataGroup === "DO_KY_THUAT" || dataGroup === "CONG_BO" ? (
        <p className="mt-2 text-xs text-ink-3">
          Nhóm này chịu <strong>sàn 100%</strong> ở chiều hợp lệ và đầy đủ — dưới sàn thì không được Đạt và tập bị dừng sử dụng (ETV.P34 §6.4.3).
        </p>
      ) : null}

      <div className="mt-3 flex flex-col gap-4">
        {measurements.map((m) => {
          const closed = m.status === "DAT" || m.status === "KHONG_DAT";
          const rows = rowsOf(m);
          return (
            <div key={m.id} className="rounded-lg border border-border p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm text-ink">
                  <span className="font-mono text-xs">{m.code}</span> · Kỳ {m.period} · Người đo: {m.measuredByName ?? "—"}
                  {m.trend && ` · Xu hướng: ${TREND_LABEL[m.trend]}`}
                </p>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[QUALITY_STATUS_TONE[m.status]]}`}>
                  {QUALITY_STATUS_LABEL[m.status]}
                  {closed && " · Đã chốt (bất biến)"}
                </span>
              </div>

              <table className="mt-2 w-full text-xs">
                <thead>
                  <tr className="text-left text-ink-3">
                    <th className="py-1 pr-2">Chiều</th>
                    <th className="py-1 pr-2">Chỉ số</th>
                    <th className="py-1 pr-2">Ngưỡng</th>
                    <th className="py-1 pr-2">Giá trị đo</th>
                    <th className="py-1">Kết quả</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.dimension} className="border-t border-border">
                      <td className="py-1 pr-2 text-ink">{QUALITY_DIMENSION_LABEL[r.dimension]}</td>
                      {closed ? (
                        <>
                          <td className="py-1 pr-2 text-ink-2">{r.metric || "—"}</td>
                          <td className="py-1 pr-2 text-ink-2">{r.threshold || "—"}</td>
                          <td className="py-1 pr-2 text-ink-2">{r.value ?? "—"}</td>
                          <td className="py-1">{r.passed === null ? "—" : r.passed ? "Đạt" : "Không đạt"}</td>
                        </>
                      ) : (
                        <>
                          <td className="py-1 pr-2">
                            <input className={inputCls} value={r.metric} onChange={(e) => setRow(m, r.dimension, { metric: e.target.value })} />
                          </td>
                          <td className="py-1 pr-2">
                            <input className={inputCls} value={r.threshold} onChange={(e) => setRow(m, r.dimension, { threshold: e.target.value })} />
                          </td>
                          <td className="py-1 pr-2">
                            <input className={inputCls} value={r.value ?? ""} onChange={(e) => setRow(m, r.dimension, { value: e.target.value })} />
                          </td>
                          <td className="py-1">
                            <select
                              className={inputCls}
                              value={r.passed === null ? "" : r.passed ? "1" : "0"}
                              onChange={(e) => setRow(m, r.dimension, { passed: e.target.value === "" ? null : e.target.value === "1" })}
                            >
                              <option value="">—</option>
                              <option value="1">Đạt</option>
                              <option value="0">Không đạt</option>
                            </select>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>

              {closed && m.status === "KHONG_DAT" && (
                <p className="mt-2 text-xs text-ink-2">
                  Tình huống: {m.belowThresholdCase ? BELOW_THRESHOLD_CASE_LABEL[m.belowThresholdCase] : "—"} · Kế hoạch: {m.remediationPlan ?? "—"}
                  {m.capaRef && ` · KPH: ${m.capaRef}`}
                </p>
              )}

              {!closed && (
                <div className="mt-3 flex flex-col gap-2">
                  <div className="flex flex-wrap gap-2">
                    <button
                      className={btnGhost}
                      disabled={isPending}
                      onClick={() => run(() => recordQualityRows(m.id, rows))}
                    >
                      Lưu giá trị đo (QTDL)
                    </button>
                    <select className={inputCls} value={conclude.trend} onChange={(e) => setConclude((c) => ({ ...c, trend: e.target.value }))}>
                      {Object.entries(TREND_LABEL).map(([k, v]) => (
                        <option key={k} value={k}>
                          Xu hướng: {v}
                        </option>
                      ))}
                    </select>
                    <button
                      className={btn}
                      disabled={isPending}
                      onClick={() => run(() => concludeQuality(m.id, { verdictPass: true, trend: conclude.trend }))}
                    >
                      Chốt: Đạt (QTDL)
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <select className={inputCls} value={conclude.caseCode} onChange={(e) => setConclude((c) => ({ ...c, caseCode: e.target.value }))}>
                      <option value="">Tình huống §6.4.4 —</option>
                      {Object.entries(BELOW_THRESHOLD_CASE_LABEL).map(([k, v]) => (
                        <option key={k} value={k}>
                          {v}
                        </option>
                      ))}
                    </select>
                    <input
                      placeholder="Kế hoạch khắc phục (15 ngày làm việc)"
                      className={inputCls}
                      value={conclude.plan}
                      onChange={(e) => setConclude((c) => ({ ...c, plan: e.target.value }))}
                    />
                    <input
                      placeholder="Số KPH (khi 02 kỳ liên tiếp)"
                      className={inputCls}
                      value={conclude.capaRef}
                      onChange={(e) => setConclude((c) => ({ ...c, capaRef: e.target.value }))}
                    />
                    <button
                      className={btnGhost}
                      disabled={isPending}
                      onClick={() =>
                        run(() =>
                          concludeQuality(m.id, {
                            verdictPass: false,
                            belowThresholdCase: (conclude.caseCode || null) as M34BelowThresholdCase | null,
                            remediationPlan: conclude.plan,
                            capaRef: conclude.capaRef || null,
                            trend: conclude.trend,
                          }),
                        )
                      }
                    >
                      Chốt: Không đạt (QLCL)
                    </button>
                  </div>
                  {m34Role !== "QLCL" && m34Role !== "QTDL" && (
                    <p className="text-xs text-ink-3">QTDL ghi giá trị và chốt Đạt; QLCL chốt Không đạt và quyết định mở KPH (Phụ lục II.2).</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
        {measurements.length === 0 && <p className="text-sm text-ink-3">Chưa có kỳ đo nào.</p>}
      </div>
    </section>
  );
}
