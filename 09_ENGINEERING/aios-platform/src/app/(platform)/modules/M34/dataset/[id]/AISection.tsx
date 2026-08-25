"use client";

// Dữ liệu dùng cho hệ thống AI (ETV.P34 §6.8) — bốn điều kiện; Hạn chế/Mật cấm tuyệt đối (R22).
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { approveAI, createAIApproval, giveAIAtttOpinion, revokeAI } from "@/lib/m34/actions";
import { AI_APPROVAL_STATUS_LABEL, AI_APPROVAL_STATUS_TONE, AI_PURPOSE_LABEL } from "@/lib/m34/labels";

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

interface Approval {
  id: string;
  code: string;
  aiPurpose: string;
  aiSystemRef: string | null;
  aiaRef: string;
  mitigation: string;
  status: string;
  atttOpinionById: string | null;
  approvedByName: string | null;
  reason: string | null;
}

export function AISection({
  dataSetId,
  classification,
  m34Role,
  approvals,
}: {
  dataSetId: string;
  classification: string;
  m34Role: string | null;
  approvals: Approval[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ aiPurpose: "DU_LIEU_NGU_CANH", aiSystemRef: "", aiaRef: "", mitigation: "" });
  const [reason, setReason] = useState("");

  const banned = classification === "HAN_CHE" || classification === "MAT";

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
        <h2 className="font-head text-sm font-bold text-ink">Dữ liệu dùng cho hệ thống AI (ETV.P34 §6.8)</h2>
        {!banned && (
          <button className={btnGhost} onClick={() => setShowNew((v) => !v)}>
            {showNew ? "Đóng" : "+ Đề nghị dùng cho AI"}
          </button>
        )}
      </div>
      {banned && (
        <p className="mt-2 rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-xs text-crit">
          Tập mức <strong>{classification === "MAT" ? "Mật" : "Hạn chế"}</strong> — cấm tuyệt đối đưa vào hệ thống AI dưới mọi hình thức:
          không lập chỉ mục, không đưa vào lời nhắc, không truy xuất trực tiếp (R22 — ETV.P34 §6.8; ETV.P28 §5.13).
        </p>
      )}
      {error && <p className="mt-2 rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      {showNew && !banned && (
        <div className="mt-3 grid grid-cols-1 gap-2 rounded-lg border border-border p-3 sm:grid-cols-2">
          <select className={inputCls} value={form.aiPurpose} onChange={(e) => setForm((f) => ({ ...f, aiPurpose: e.target.value }))}>
            {Object.entries(AI_PURPOSE_LABEL).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
          <input placeholder="Hệ thống AI (mã bên M29)" className={inputCls} value={form.aiSystemRef} onChange={(e) => setForm((f) => ({ ...f, aiSystemRef: e.target.value }))} />
          <input placeholder="Hồ sơ AIA theo ETV.P29 *" className={inputCls} value={form.aiaRef} onChange={(e) => setForm((f) => ({ ...f, aiaRef: e.target.value }))} />
          <input placeholder="Biện pháp giảm thiểu *" className={inputCls} value={form.mitigation} onChange={(e) => setForm((f) => ({ ...f, mitigation: e.target.value }))} />
          <div>
            <button className={btn} disabled={isPending} onClick={() => run(() => createAIApproval(dataSetId, form))}>
              Đề nghị
            </button>
          </div>
        </div>
      )}

      <div className="mt-3 flex flex-col gap-3">
        {approvals.map((a) => (
          <div key={a.id} className="rounded-lg border border-border p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-ink">
                <span className="font-mono text-xs">{a.code}</span> · {AI_PURPOSE_LABEL[a.aiPurpose]}
                {a.aiSystemRef && ` · ${a.aiSystemRef}`}
              </p>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[AI_APPROVAL_STATUS_TONE[a.status]]}`}>
                {AI_APPROVAL_STATUS_LABEL[a.status]}
              </span>
            </div>
            <p className="mt-1 text-xs text-ink-2">
              AIA: {a.aiaRef} · Giảm thiểu: {a.mitigation} · Ý kiến ATTT: {a.atttOpinionById ? "có" : "chưa"}
              {a.approvedByName && ` · LĐV: ${a.approvedByName}`}
              {a.reason && ` · ${a.reason}`}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {a.status === "DE_NGHI" && !a.atttOpinionById && m34Role === "ATTT" && (
                <button className={btnGhost} disabled={isPending} onClick={() => run(() => giveAIAtttOpinion(a.id))}>
                  PT.ATTT cho ý kiến
                </button>
              )}
              {a.status === "DE_NGHI" && (
                <>
                  <button className={btn} disabled={isPending} onClick={() => run(() => approveAI(a.id, true))}>
                    LĐV phê duyệt
                  </button>
                  <input placeholder="Lý do từ chối" className={inputCls} value={reason} onChange={(e) => setReason(e.target.value)} />
                  <button className={btnGhost} disabled={isPending} onClick={() => run(() => approveAI(a.id, false, reason))}>
                    Từ chối
                  </button>
                </>
              )}
              {a.status === "DA_PHE_DUYET" && (
                <>
                  <input placeholder="Lý do thu hồi" className={inputCls} value={reason} onChange={(e) => setReason(e.target.value)} />
                  <button className={btnGhost} disabled={isPending} onClick={() => run(() => revokeAI(a.id, reason))}>
                    Thu hồi (LĐV/ATTT)
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
        {approvals.length === 0 && !banned && <p className="text-sm text-ink-3">Chưa có hồ sơ nào.</p>}
      </div>
    </section>
  );
}
