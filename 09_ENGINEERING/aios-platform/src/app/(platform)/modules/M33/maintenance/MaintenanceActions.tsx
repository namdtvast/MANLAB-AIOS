"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { acceptTask, cancelTask, createTask, performTask, startTask } from "@/lib/m33/actions";
import { SEVERITY_LABEL, TASK_TYPE_LABEL } from "@/lib/m33/labels";
import type { M33MaintenanceType, M33Severity } from "@/generated/prisma/enums";

const btn =
  "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const btnGhost =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-xs text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";
const inputCls = "rounded-lg border border-border bg-bg px-2 py-1 text-xs text-ink outline-none focus:border-accent-line";

function useRun() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const run = (fn: () => Promise<{ ok: boolean; message?: string }>, after?: () => void) => {
    setError(null);
    startTransition(async () => {
      const r = await fn();
      if (!r.ok) setError(r.message ?? "Có lỗi xảy ra.");
      else {
        after?.();
        router.refresh();
      }
    });
  };
  return { isPending, error, run };
}

export function NewTaskForm({
  assets,
  plans,
}: {
  assets: { id: string; code: string; name: string }[];
  plans: { id: string; code: string; year: number }[];
}) {
  const { isPending, error, run } = useRun();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    taskType: "BAO_TRI_DINH_KY" as M33MaintenanceType,
    severity: "" as "" | M33Severity,
    assetIds: [] as string[],
    planId: "",
    changeRef: "",
    impactAssessmentRef: "",
    measurementImpactRef: "",
    emergencyOrderRef: "",
  });

  return (
    <section className="rounded-xl border border-border bg-surface p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-head text-sm font-bold text-ink">Lập công việc (QTHT)</h2>
        <button className={btnGhost} onClick={() => setOpen((v) => !v)}>
          {open ? "Đóng" : "+ Lập công việc"}
        </button>
      </div>
      {error && <p className="mt-2 rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}
      {open && (
        <div className="mt-3 flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            <select className={inputCls} value={form.taskType} onChange={(e) => setForm((f) => ({ ...f, taskType: e.target.value as M33MaintenanceType }))}>
              {Object.entries(TASK_TYPE_LABEL).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
            {form.taskType === "VA_LOI_BAO_MAT" && (
              <select className={inputCls} value={form.severity} onChange={(e) => setForm((f) => ({ ...f, severity: e.target.value as M33Severity }))}>
                <option value="">— mức nghiêm trọng —</option>
                {Object.entries(SEVERITY_LABEL).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            )}
            {form.taskType === "BAO_TRI_DINH_KY" && (
              <select className={inputCls} value={form.planId} onChange={(e) => setForm((f) => ({ ...f, planId: e.target.value }))}>
                <option value="">— kế hoạch năm đã phê duyệt (R19) —</option>
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.code} — năm {p.year}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <input placeholder="Phiếu thay đổi F30.02 (M30 — R5)" className={inputCls} value={form.changeRef} onChange={(e) => setForm((f) => ({ ...f, changeRef: e.target.value }))} />
            <input placeholder="Đánh giá ATTT (M28 — khi có thay đổi)" className={inputCls} value={form.impactAssessmentRef} onChange={(e) => setForm((f) => ({ ...f, impactAssessmentRef: e.target.value }))} />
            <input placeholder="Đánh giá M10 (máy tính điều khiển đo — R4)" className={inputCls} value={form.measurementImpactRef} onChange={(e) => setForm((f) => ({ ...f, measurementImpactRef: e.target.value }))} />
            <input placeholder="Lệnh khẩn cấp LĐV (nếu có)" className={inputCls} value={form.emergencyOrderRef} onChange={(e) => setForm((f) => ({ ...f, emergencyOrderRef: e.target.value }))} />
          </div>
          <p className="text-xs text-ink-3">Tài sản ({form.assetIds.length} đã chọn):</p>
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            {assets.map((a) => (
              <label key={a.id} className="flex items-center gap-2 text-xs text-ink">
                <input
                  type="checkbox"
                  checked={form.assetIds.includes(a.id)}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, assetIds: e.target.checked ? [...f.assetIds, a.id] : f.assetIds.filter((x) => x !== a.id) }))
                  }
                />
                {a.code} — {a.name}
              </label>
            ))}
          </div>
          <div>
            <button
              className={btn}
              disabled={isPending}
              onClick={() =>
                run(
                  () =>
                    createTask({
                      taskType: form.taskType,
                      severity: form.severity || null,
                      assetIds: form.assetIds,
                      planId: form.planId || null,
                      changeRef: form.changeRef || null,
                      impactAssessmentRef: form.impactAssessmentRef || null,
                      measurementImpactRef: form.measurementImpactRef || null,
                      emergencyOrderRef: form.emergencyOrderRef || null,
                    }),
                  () => setOpen(false),
                )
              }
            >
              Lập công việc
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export function MaintenanceActions({ id, status, role, hasControlComputer }: { id: string; status: string; role: string | null; hasControlComputer: boolean }) {
  const { isPending, error, run } = useRun();
  const [evidence, setEvidence] = useState("");
  const [postCheck, setPostCheck] = useState("");
  const [reason, setReason] = useState("");
  void role;

  return (
    <span className="flex flex-wrap items-center gap-2">
      {error && <span className="max-w-72 text-xs text-crit">{error}</span>}
      {status === "KE_HOACH" && (
        <button className={btnGhost} disabled={isPending} onClick={() => run(() => startTask(id))}>
          Bắt đầu
        </button>
      )}
      {status === "DANG_THUC_HIEN" && (
        <>
          <input placeholder="Bằng chứng (nhật ký, ảnh…) *" className={inputCls} value={evidence} onChange={(e) => setEvidence(e.target.value)} />
          {hasControlComputer && (
            <input placeholder="Kiểm tra sau áp dụng (§6.3.4) *" className={inputCls} value={postCheck} onChange={(e) => setPostCheck(e.target.value)} />
          )}
          <button
            className={btn}
            disabled={isPending}
            onClick={() => run(() => performTask(id, { result: "THANH_CONG", evidenceRef: evidence, postCheckResult: postCheck || null, userNotified: true }))}
          >
            Ghi nhận đã thực hiện → chờ nghiệm thu
          </button>
        </>
      )}
      {status === "CHO_NGHIEM_THU" && (
        <button className={btn} disabled={isPending} onClick={() => run(() => acceptTask(id))}>
          Nghiệm thu (≠ người thực hiện — R15)
        </button>
      )}
      {status !== "HOAN_THANH" && status !== "HUY" && (
        <>
          <input placeholder="Lý do hủy/hoãn" className={inputCls} value={reason} onChange={(e) => setReason(e.target.value)} />
          <button className={btnGhost} disabled={isPending} onClick={() => run(() => cancelTask(id, reason))}>
            Hủy
          </button>
        </>
      )}
    </span>
  );
}
