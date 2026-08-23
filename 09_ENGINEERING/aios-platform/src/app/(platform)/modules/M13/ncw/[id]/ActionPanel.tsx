"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  addMonitoringNote,
  approveReplacementReport,
  assessSeverity,
  closeNcw,
  completeCapPlan,
  createCapPlan,
  reviewCapPlan,
  revokeReport,
} from "@/lib/m13/actions";
import type { M13Severity } from "@/generated/prisma/enums";

interface Props {
  id: string;
  status: string;
  severity: string | null;
  m13Role: string | null;
  hasRevokedReport: boolean;
  plan: { status: string; assignedToId: string; replacementReportRef: string | null } | null;
  assignableUsers: { id: string; name: string }[];
}

const btn =
  "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const btnGhost =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";
const inputCls =
  "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const boxCls = "flex flex-col gap-2 border-t border-border pt-3 first:border-0 first:pt-0";

export function NcwActionPanel({ id, status, severity, m13Role, hasRevokedReport, plan, assignableUsers }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [basis, setBasis] = useState("");
  const [pickedSeverity, setPickedSeverity] = useState<M13Severity>("NHE");
  const [rootCause, setRootCause] = useState("");
  const [actionPlan, setActionPlan] = useState("");
  const [assigneeId, setAssigneeId] = useState(assignableUsers[0]?.id ?? "");
  const [reviewNote, setReviewNote] = useState("");
  const [monitoringNote, setMonitoringNote] = useState("");
  const [reportRef, setReportRef] = useState("");
  const [replacementRef, setReplacementRef] = useState("");

  const run = (fn: () => Promise<{ ok: boolean; message?: string } | void>) => {
    setError(null);
    startTransition(async () => {
      const r = await fn();
      if (r && "ok" in r && !r.ok) setError(r.message ?? "Có lỗi xảy ra.");
      else router.refresh();
    });
  };

  const isClosed = status === "DA_KHAC_PHUC";

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
      <p className="text-xs text-ink-3">
        Vai trò M13 của bạn: <strong className="text-ink">{m13Role ?? "chưa gán"}</strong>
      </p>
      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      {status === "GHI_NHAN" && (
        <div className={boxCls}>
          <p className="text-xs text-ink-2">Đánh giá mức độ không phù hợp (LĐV/QLCL/QLKT — quy tắc 2).</p>
          <select value={pickedSeverity} onChange={(e) => setPickedSeverity(e.target.value as M13Severity)} className={inputCls}>
            <option value="NHE">Nhẹ — tiếp tục việc, theo dõi chặt chẽ</option>
            <option value="NANG">Nặng — dừng hẳn công việc</option>
          </select>
          <input placeholder="Căn cứ đánh giá (bắt buộc)" value={basis} onChange={(e) => setBasis(e.target.value)} className={inputCls} />
          <button className={btn} disabled={isPending} onClick={() => run(() => assessSeverity(id, { severity: pickedSeverity, basis }))}>
            Ghi nhận đánh giá mức độ
          </button>
        </div>
      )}

      {status === "DANG_THEO_DOI" && (
        <div className={boxCls}>
          <p className="text-xs text-warn">Mức Nhẹ — bắt buộc ghi chép diễn biến theo dõi trước khi đóng hồ sơ (quy tắc 3).</p>
          <input placeholder="Diễn biến theo dõi" value={monitoringNote} onChange={(e) => setMonitoringNote(e.target.value)} className={inputCls} />
          <button className={btnGhost} disabled={isPending} onClick={() => run(() => addMonitoringNote(id, monitoringNote))}>
            Ghi chép diễn biến
          </button>
        </div>
      )}

      {status === "DANG_KHAC_PHUC" && !plan && (
        <div className={boxCls}>
          <p className="text-xs text-crit">Mức Nặng — QLCL lập phương án hành động khắc phục và phân công thực hiện (quy tắc 4).</p>
          <input placeholder="Nguyên nhân gốc" value={rootCause} onChange={(e) => setRootCause(e.target.value)} className={inputCls} />
          <textarea placeholder="Nội dung phương án khắc phục" value={actionPlan} onChange={(e) => setActionPlan(e.target.value)} rows={3} className={inputCls} />
          <select value={assigneeId} onChange={(e) => setAssigneeId(e.target.value)} className={inputCls}>
            {assignableUsers.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
          <button
            className={btn}
            disabled={isPending || !assigneeId}
            onClick={() => run(() => createCapPlan(id, { rootCause, actionPlan, assignedToId: assigneeId }))}
          >
            QLCL lập phương án khắc phục
          </button>
        </div>
      )}

      {plan?.status === "DANG_THUC_HIEN" && (
        <div className={boxCls}>
          <p className="text-xs text-ink-2">Cán bộ được phân công báo hoàn thành hành động khắc phục.</p>
          <button className={btn} disabled={isPending} onClick={() => run(() => completeCapPlan(id))}>
            Báo hoàn thành khắc phục
          </button>
        </div>
      )}

      {plan?.status === "CHO_THAM_XET" && (
        <div className={boxCls}>
          <p className="text-xs text-warn">QLCL thẩm xét hành động khắc phục — người thực hiện không được tự thẩm xét (quy tắc 5).</p>
          <input placeholder="Ý kiến thẩm xét (bắt buộc nếu KHÔNG ĐẠT)" value={reviewNote} onChange={(e) => setReviewNote(e.target.value)} className={inputCls} />
          <div className="flex gap-2">
            <button className={btn} disabled={isPending} onClick={() => run(() => reviewCapPlan(id, { passed: true, note: reviewNote || undefined }))}>
              Thẩm xét ĐẠT
            </button>
            <button className={btnGhost} disabled={isPending} onClick={() => run(() => reviewCapPlan(id, { passed: false, note: reviewNote }))}>
              Thẩm xét KHÔNG ĐẠT
            </button>
          </div>
        </div>
      )}

      {severity === "NANG" && !isClosed && (
        <div className={boxCls}>
          <p className="text-xs text-ink-2">Thu hồi báo cáo/GCN liên quan (← M11, quy tắc 4).</p>
          <input placeholder="Số hiệu báo cáo/GCN thu hồi" value={reportRef} onChange={(e) => setReportRef(e.target.value)} className={inputCls} />
          <button className={btnGhost} disabled={isPending} onClick={() => run(() => revokeReport(id, { reportRef }))}>
            Thu hồi báo cáo
          </button>
        </div>
      )}

      {hasRevokedReport && !plan?.replacementReportRef && (
        <div className={boxCls}>
          <p className="text-xs text-warn">Chỉ LĐV được cho phát hành báo cáo thay thế — không tự động phát hành lại (quy tắc 6).</p>
          <input placeholder="Số hiệu báo cáo thay thế" value={replacementRef} onChange={(e) => setReplacementRef(e.target.value)} className={inputCls} />
          <button className={btn} disabled={isPending} onClick={() => run(() => approveReplacementReport(id, replacementRef))}>
            LĐV cho phát hành thay thế
          </button>
        </div>
      )}

      {(status === "DANG_THEO_DOI" || status === "DANG_KHAC_PHUC") && (
        <div className={boxCls}>
          <button className={btn} disabled={isPending} onClick={() => run(() => closeNcw(id))}>
            Đóng hồ sơ không phù hợp
          </button>
        </div>
      )}

      {isClosed && <p className="text-sm text-good">Đã khắc phục — hồ sơ đã đóng.</p>}
    </div>
  );
}
