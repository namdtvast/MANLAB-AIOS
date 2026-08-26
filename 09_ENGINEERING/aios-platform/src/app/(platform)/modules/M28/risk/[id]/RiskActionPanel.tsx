"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  acceptResidual,
  addTreatment,
  approveRisk,
  markRiskTreated,
  retireRisk,
  reviewRisk,
  submitRisk,
  verifyTreatment,
} from "@/lib/m28/actions";

const btn =
  "cursor-pointer rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const btnGhost =
  "cursor-pointer rounded-lg border border-border px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";
const inputCls =
  "w-full rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const labelCls = "text-xs font-medium text-ink-3";

export function RiskActionPanel({
  id,
  status,
  role,
  riskScore,
  users,
  treatments,
}: {
  id: string;
  status: string;
  role: string | null;
  riskScore: number;
  users: { id: string; name: string | null; email: string }[];
  treatments: { id: string; measure: string; status: string }[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [residual, setResidual] = useState({ likelihood: 2, impact: 2 });
  const [verifyNote, setVerifyNote] = useState("");
  const [showTreatment, setShowTreatment] = useState(false);
  const [t, setT] = useState({
    measure: "",
    soaControlRef: "",
    responsibleId: users[0]?.id ?? "",
    resources: "",
    dueAt: "",
    interimMeasure: "",
    verificationMethod: "",
  });

  const run = (fn: () => Promise<{ ok: boolean; message?: string }>) => {
    setError(null);
    startTransition(async () => {
      const r = await fn();
      if (!r.ok) setError(r.message ?? "Có lỗi xảy ra.");
      else {
        setReason("");
        setVerifyNote("");
        setShowTreatment(false);
        router.refresh();
      }
    });
  };

  const editable = ["DRAFT", "REVIEW_REJECTED", "APPROVAL_REJECTED"].includes(status);
  const pendingTreatments = treatments.filter((x) => x.status !== "HOAN_THANH");
  const residualScore = residual.likelihood * residual.impact;

  const actions: React.ReactNode[] = [];
  if (editable)
    actions.push(
      <button key="submit" className={btn} disabled={isPending} onClick={() => run(() => submitRisk(id))}>
        Gửi soát xét
      </button>,
    );
  if (status === "PENDING_REVIEW" && (role === "ATTT" || role === "QLCL"))
    actions.push(
      <button key="rv-ok" className={btn} disabled={isPending} onClick={() => run(() => reviewRisk(id, true))}>
        Soát xét đạt
      </button>,
      <button
        key="rv-no"
        className={btnGhost}
        disabled={isPending}
        onClick={() => run(() => reviewRisk(id, false, reason))}
      >
        Không soát xét
      </button>,
    );
  if (status === "PENDING_APPROVAL" && role === "LDV")
    actions.push(
      <button key="ap-ok" className={btn} disabled={isPending} onClick={() => run(() => approveRisk(id, true))}>
        Phê duyệt
      </button>,
      <button
        key="ap-no"
        className={btnGhost}
        disabled={isPending}
        onClick={() => run(() => approveRisk(id, false, reason))}
      >
        Không phê duyệt
      </button>,
    );
  if (status === "DANG_XU_LY" && role === "ATTT")
    actions.push(
      <button key="treated" className={btn} disabled={isPending} onClick={() => run(() => markRiskTreated(id))}>
        Xác nhận đã xử lý
      </button>,
    );
  if (role === "LDV" && status !== "HET_HIEU_LUC")
    actions.push(
      <button key="retire" className={btnGhost} disabled={isPending} onClick={() => run(() => retireRisk(id, reason))}>
        Rủi ro hết hiệu lực
      </button>,
    );

  const canAddTreatment =
    ["ATTT", "TP", "QLCL", "LDV"].includes(role ?? "") && !["HET_HIEU_LUC", "CHAP_NHAN_TON_DU"].includes(status);
  const canAcceptResidual = status === "DA_XU_LY" && (role === "LDV" || role === "ATTT");
  const canVerify = role === "ATTT" && pendingTreatments.length > 0;

  if (actions.length === 0 && !canAddTreatment && !canAcceptResidual && !canVerify) return null;

  return (
    <section className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
      <h2 className="font-head text-lg font-semibold text-ink">Hành động</h2>
      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      <div>
        <label className={labelCls}>
          Lý do — bắt buộc khi không soát xét, không phê duyệt, hết hiệu lực, hoặc chấp nhận rủi ro tồn dư từ 7 điểm
        </label>
        <input className={inputCls} value={reason} onChange={(e) => setReason(e.target.value)} />
      </div>

      {actions.length > 0 && <div className="flex flex-wrap gap-2">{actions}</div>}

      {canVerify && (
        <div className="flex flex-col gap-2 border-t border-border pt-3">
          <label className={labelCls}>
            Xác nhận hiệu lực hạng mục xử lý — chỉ PT.ATTT, bắt buộc ghi cách xác nhận (ETV.P28 mục 6.5.2)
          </label>
          <input
            className={inputCls}
            placeholder="vd Thử nghiệm gửi thư ra ngoài miền, cảnh báo hoạt động đúng"
            value={verifyNote}
            onChange={(e) => setVerifyNote(e.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            {pendingTreatments.map((x) => (
              <button
                key={x.id}
                className={btnGhost}
                disabled={isPending}
                onClick={() => run(() => verifyTreatment(x.id, verifyNote))}
              >
                Xác nhận: {x.measure.slice(0, 40)}
                {x.measure.length > 40 ? "…" : ""}
              </button>
            ))}
          </div>
        </div>
      )}

      {canAcceptResidual && (
        <div className="flex flex-col gap-2 border-t border-border pt-3">
          <label className={labelCls}>
            Chấp nhận rủi ro tồn dư — từ 7 điểm trở lên chỉ LĐV chấp nhận, bắt buộc ghi lý do (ETV.P28 mục 6.4.3)
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-ink-3">Khả năng</span>
            <input
              type="number"
              min={1}
              max={5}
              className="w-16 rounded-lg border border-border bg-bg px-2 py-1 text-sm text-ink"
              value={residual.likelihood}
              onChange={(e) => setResidual((s) => ({ ...s, likelihood: Number(e.target.value) }))}
            />
            <span className="text-xs text-ink-3">× Tác động</span>
            <input
              type="number"
              min={1}
              max={5}
              className="w-16 rounded-lg border border-border bg-bg px-2 py-1 text-sm text-ink"
              value={residual.impact}
              onChange={(e) => setResidual((s) => ({ ...s, impact: Number(e.target.value) }))}
            />
            <span className="text-sm text-ink">
              = <strong>{residualScore}</strong>
              {residualScore >= 7 && <span className="ml-1 text-xs text-crit">cần LĐV chấp nhận</span>}
            </span>
            <button
              className={btn}
              disabled={isPending}
              onClick={() => run(() => acceptResidual(id, residual.likelihood, residual.impact, reason))}
            >
              Đóng rủi ro
            </button>
          </div>
        </div>
      )}

      {canAddTreatment && (
        <div className="border-t border-border pt-3">
          {!showTreatment ? (
            <button className={btnGhost} onClick={() => setShowTreatment(true)}>
              + Thêm hạng mục Kế hoạch xử lý rủi ro
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Biện pháp xử lý</label>
                  <input className={inputCls} value={t.measure} onChange={(e) => setT((s) => ({ ...s, measure: e.target.value }))} />
                </div>
                <div>
                  <label className={labelCls}>Mã kiểm soát trong SoA</label>
                  <input
                    className={inputCls}
                    placeholder="A.8.13"
                    value={t.soaControlRef}
                    onChange={(e) => setT((s) => ({ ...s, soaControlRef: e.target.value }))}
                  />
                </div>
                <div>
                  <label className={labelCls}>Người chịu trách nhiệm</label>
                  <select
                    className={inputCls}
                    value={t.responsibleId}
                    onChange={(e) => setT((s) => ({ ...s, responsibleId: e.target.value }))}
                  >
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name ?? u.email}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Hạn hoàn thành</label>
                  <input
                    type="date"
                    className={inputCls}
                    value={t.dueAt}
                    onChange={(e) => setT((s) => ({ ...s, dueAt: e.target.value }))}
                  />
                </div>
                <div>
                  <label className={labelCls}>Cách xác nhận hiệu lực</label>
                  <input
                    className={inputCls}
                    value={t.verificationMethod}
                    onChange={(e) => setT((s) => ({ ...s, verificationMethod: e.target.value }))}
                  />
                </div>
                {riskScore >= 20 && (
                  <div>
                    <label className={labelCls}>Biện pháp khống chế tạm thời (bắt buộc với mức Rất cao)</label>
                    <input
                      className={inputCls}
                      value={t.interimMeasure}
                      onChange={(e) => setT((s) => ({ ...s, interimMeasure: e.target.value }))}
                    />
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <button className={btn} disabled={isPending} onClick={() => run(() => addTreatment({ riskId: id, ...t }))}>
                  Lưu hạng mục
                </button>
                <button className={btnGhost} onClick={() => setShowTreatment(false)}>
                  Huỷ
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
