"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { editOpportunity, editRisk } from "@/lib/m01/actions";

interface Props {
  type: "risk" | "opportunity";
  id: string;
  isRisk: boolean;
  initial: {
    cause?: string | null;
    controlMeasure?: string | null;
    severity?: number | null;
    possibility?: number | null;
    proposedAction?: string | null;
  };
}

const fieldCls =
  "rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const labelCls = "flex flex-col gap-1.5 text-sm font-medium text-ink";
const btn =
  "cursor-pointer rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";

export function EditPanel({ type, id, isRisk, initial }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [cause, setCause] = useState(initial.cause ?? "");
  const [controlMeasure, setControlMeasure] = useState(initial.controlMeasure ?? "");
  const [severity, setSeverity] = useState(initial.severity ?? 1);
  const [possibility, setPossibility] = useState(initial.possibility ?? 1);
  const [proposedAction, setProposedAction] = useState(initial.proposedAction ?? "");

  const save = () => {
    startTransition(async () => {
      if (isRisk) {
        await editRisk(id, { cause, controlMeasure, severity: Number(severity), possibility: Number(possibility) });
      } else {
        await editOpportunity(id, { proposedAction });
      }
      router.refresh();
    });
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
      <h2 className="font-head text-sm font-bold text-ink">
        Bổ sung trước khi gửi soát xét ({type === "risk" ? "Rủi ro" : "Cơ hội"})
      </h2>
      {isRisk ? (
        <>
          <label className={labelCls}>
            Nguyên nhân
            <textarea value={cause} onChange={(e) => setCause(e.target.value)} rows={2} className={fieldCls} />
          </label>
          <label className={labelCls}>
            Biện pháp kiểm soát
            <textarea value={controlMeasure} onChange={(e) => setControlMeasure(e.target.value)} rows={2} className={fieldCls} />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className={labelCls}>
              Mức độ hậu quả (S, 1–5)
              <input type="number" min={1} max={5} value={severity} onChange={(e) => setSeverity(Number(e.target.value))} className={fieldCls} />
            </label>
            <label className={labelCls}>
              Khả năng xảy ra (P, 1–5)
              <input type="number" min={1} max={5} value={possibility} onChange={(e) => setPossibility(Number(e.target.value))} className={fieldCls} />
            </label>
          </div>
          <p className="text-xs text-ink-3">R = S × P = {Number(severity) * Number(possibility)} (server tự tính lại khi lưu).</p>
        </>
      ) : (
        <label className={labelCls}>
          Biện pháp đề xuất
          <textarea value={proposedAction} onChange={(e) => setProposedAction(e.target.value)} rows={2} className={fieldCls} />
        </label>
      )}
      <button className={btn} disabled={isPending} onClick={save}>
        {isPending ? "Đang lưu…" : "Lưu"}
      </button>
    </div>
  );
}
