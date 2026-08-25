"use client";

// Hiệu chỉnh dữ liệu đã ghi nhận — F34.02 phần B (ETV.P34 §6.3). Dữ liệu gốc bất biến (R11);
// đã dùng phát hành thì chặn tới khi có kết luận ETV.P10/P11 (R12 — chặn cứng).
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { assessCorrection, attachCorrectionValidity, createCorrection, performCorrection, rejectCorrection } from "@/lib/m34/actions";
import { CORRECTION_STATUS_LABEL, CORRECTION_STATUS_TONE, PUBLISHED_IMPACT_LABEL, VALIDITY_CONCLUSION_LABEL } from "@/lib/m34/labels";

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

interface Correction {
  id: string;
  code: string;
  recordPointer: string;
  oldValue: string;
  newValue: string;
  correctionReason: string;
  status: string;
  publishedImpact: string | null;
  validityRef: string | null;
  validityConclusion: string | null;
  correctionRecordId: string | null;
  requestedByName: string | null;
  reason: string | null;
}

export function CorrectionSection({
  dataSetId,
  m34Role,
  isOwner,
  isSteward,
  corrections,
}: {
  dataSetId: string;
  m34Role: string | null;
  isOwner: boolean;
  isSteward: boolean;
  corrections: Correction[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ recordPointer: "", oldValue: "", newValue: "", correctionReason: "", evidenceRef: "" });
  const [work, setWork] = useState({ validityRef: "", conclusion: "CON_HIEU_LUC", recordId: "", capaRef: "", reason: "" });

  const run = (fn: () => Promise<{ ok: boolean; message?: string }>) => {
    setError(null);
    startTransition(async () => {
      const r = await fn();
      if (!r.ok) setError(r.message ?? "Có lỗi xảy ra.");
      else {
        setShowNew(false);
        router.refresh();
      }
    });
  };

  return (
    <section className="rounded-xl border border-border bg-surface p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-head text-sm font-bold text-ink">Hiệu chỉnh dữ liệu đã ghi nhận (ETV.P34 §6.3)</h2>
        <button className={btnGhost} onClick={() => setShowNew((v) => !v)}>
          {showNew ? "Đóng" : "+ Đề nghị hiệu chỉnh"}
        </button>
      </div>
      <p className="mt-1 text-xs text-ink-3">
        Dữ liệu đo thô và hồ sơ kỹ thuật <strong>không sửa đè, không xóa</strong> — hiệu chỉnh bằng bản ghi mới, giữ nguyên giá trị cũ (R11).
      </p>
      {error && <p className="mt-2 rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      {showNew && (
        <div className="mt-3 grid grid-cols-1 gap-2 rounded-lg border border-border p-3 sm:grid-cols-2">
          <input placeholder="Bản ghi, trường cần hiệu chỉnh *" className={inputCls} value={form.recordPointer} onChange={(e) => setForm((f) => ({ ...f, recordPointer: e.target.value }))} />
          <input placeholder="Bằng chứng đính kèm" className={inputCls} value={form.evidenceRef} onChange={(e) => setForm((f) => ({ ...f, evidenceRef: e.target.value }))} />
          <input placeholder="Giá trị trước *" className={inputCls} value={form.oldValue} onChange={(e) => setForm((f) => ({ ...f, oldValue: e.target.value }))} />
          <input placeholder="Giá trị sau *" className={inputCls} value={form.newValue} onChange={(e) => setForm((f) => ({ ...f, newValue: e.target.value }))} />
          <input placeholder="Lý do hiệu chỉnh *" className={`${inputCls} sm:col-span-2`} value={form.correctionReason} onChange={(e) => setForm((f) => ({ ...f, correctionReason: e.target.value }))} />
          <div>
            <button className={btn} disabled={isPending} onClick={() => run(() => createCorrection(dataSetId, form))}>
              Gửi đề nghị (NTH)
            </button>
          </div>
        </div>
      )}

      <div className="mt-3 flex flex-col gap-3">
        {corrections.map((c) => (
          <div key={c.id} className="rounded-lg border border-border p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-ink">
                <span className="font-mono text-xs">{c.code}</span> · {c.recordPointer} · {c.requestedByName}
              </p>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[CORRECTION_STATUS_TONE[c.status]]}`}>
                {CORRECTION_STATUS_LABEL[c.status]}
              </span>
            </div>
            <p className="mt-1 text-xs text-ink-2">
              <span className="rounded bg-crit-soft px-1 font-mono">{c.oldValue}</span> →{" "}
              <span className="rounded bg-good-soft px-1 font-mono">{c.newValue}</span> · {c.correctionReason}
              {c.publishedImpact && ` · ${PUBLISHED_IMPACT_LABEL[c.publishedImpact]}`}
              {c.validityRef && ` · Kết luận ${c.validityRef}: ${c.validityConclusion ? VALIDITY_CONCLUSION_LABEL[c.validityConclusion] : "—"}`}
              {c.correctionRecordId && ` · Bản ghi mới: ${c.correctionRecordId}`}
              {c.reason && ` · Lý do: ${c.reason}`}
            </p>

            {(c.status === "MOI" || c.status === "DANG_XEM_XET" || c.status === "CHO_KET_LUAN_P10_P11") && (
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {c.status === "MOI" && (isSteward || isOwner || m34Role === "QLCL") && (
                  <>
                    <button className={btnGhost} disabled={isPending} onClick={() => run(() => assessCorrection(c.id, "CHUA_DUNG_PHAT_HANH"))}>
                      Chưa dùng phát hành
                    </button>
                    <button className={btnGhost} disabled={isPending} onClick={() => run(() => assessCorrection(c.id, "DA_DUNG_PHAT_HANH"))}>
                      Đã dùng phát hành → chờ P10/P11
                    </button>
                  </>
                )}
                {c.status === "CHO_KET_LUAN_P10_P11" && !c.validityRef && m34Role === "QLCL" && (
                  <>
                    <input placeholder="Số hồ sơ M10/M11" className={inputCls} value={work.validityRef} onChange={(e) => setWork((w) => ({ ...w, validityRef: e.target.value }))} />
                    <select className={inputCls} value={work.conclusion} onChange={(e) => setWork((w) => ({ ...w, conclusion: e.target.value }))}>
                      {Object.entries(VALIDITY_CONCLUSION_LABEL).map(([k, v]) => (
                        <option key={k} value={k}>
                          {v}
                        </option>
                      ))}
                    </select>
                    <button className={btnGhost} disabled={isPending} onClick={() => run(() => attachCorrectionValidity(c.id, work.validityRef, work.conclusion))}>
                      Ghi kết luận
                    </button>
                  </>
                )}
                {(c.status === "DANG_XEM_XET" || (c.status === "CHO_KET_LUAN_P10_P11" && c.validityRef)) && (
                  <>
                    <input placeholder="Mã bản ghi hiệu chỉnh mới *" className={inputCls} value={work.recordId} onChange={(e) => setWork((w) => ({ ...w, recordId: e.target.value }))} />
                    <input placeholder="Số KPH (nếu nguyên nhân hệ thống)" className={inputCls} value={work.capaRef} onChange={(e) => setWork((w) => ({ ...w, capaRef: e.target.value }))} />
                    <button className={btn} disabled={isPending} onClick={() => run(() => performCorrection(c.id, work.recordId, work.capaRef || null))}>
                      Thực hiện (QTDL)
                    </button>
                  </>
                )}
                <input placeholder="Lý do từ chối" className={inputCls} value={work.reason} onChange={(e) => setWork((w) => ({ ...w, reason: e.target.value }))} />
                <button className={btnGhost} disabled={isPending} onClick={() => run(() => rejectCorrection(c.id, work.reason))}>
                  Từ chối
                </button>
              </div>
            )}
          </div>
        ))}
        {corrections.length === 0 && <p className="text-sm text-ink-3">Chưa có đề nghị hiệu chỉnh nào.</p>}
      </div>
    </section>
  );
}
