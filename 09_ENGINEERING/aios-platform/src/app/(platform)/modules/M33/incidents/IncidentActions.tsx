"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  cancelIncident,
  closeIncident,
  confirmSecurityConclusion,
  createIncident,
  markIncidentResolved,
  respondIncident,
  routeIncident,
} from "@/lib/m33/actions";
import { IMPACT_LABEL, INCIDENT_KIND_LABEL } from "@/lib/m33/labels";
import type { M33Impact, M33IncidentKind } from "@/generated/prisma/enums";

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

export function NewIncidentForm({ assets }: { assets: { id: string; code: string; name: string; criticality: string }[] }) {
  const { isPending, error, run } = useRun();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    kind: "SU_CO" as M33IncidentKind,
    description: "",
    impact: "ANH_HUONG_MOT_NGUOI" as M33Impact,
    assetIds: [] as string[],
    securityFlag: false,
    platformDown: false,
    measurementAffected: false,
  });

  return (
    <section className="rounded-xl border border-border bg-surface p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-head text-sm font-bold text-ink">Báo sự cố / yêu cầu hỗ trợ (mọi nhân sự)</h2>
        <button className={btnGhost} onClick={() => setOpen((v) => !v)}>
          {open ? "Đóng" : "+ Báo sự cố"}
        </button>
      </div>
      {error && <p className="mt-2 rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}
      {open && (
        <div className="mt-3 flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            <select className={inputCls} value={form.kind} onChange={(e) => setForm((f) => ({ ...f, kind: e.target.value as M33IncidentKind }))}>
              {Object.entries(INCIDENT_KIND_LABEL).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
            <select className={inputCls} value={form.impact} onChange={(e) => setForm((f) => ({ ...f, impact: e.target.value as M33Impact }))}>
              {Object.entries(IMPACT_LABEL).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <textarea rows={2} placeholder="Mô tả *" className={inputCls} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          <div className="flex flex-wrap gap-3 text-xs text-ink">
            <label className="flex items-center gap-1">
              <input type="checkbox" checked={form.securityFlag} onChange={(e) => setForm((f) => ({ ...f, securityFlag: e.target.checked }))} />
              Dấu hiệu mất ATTT (→ M28, R9)
            </label>
            <label className="flex items-center gap-1">
              <input type="checkbox" checked={form.platformDown} onChange={(e) => setForm((f) => ({ ...f, platformDown: e.target.checked }))} />
              Nền tảng ManLab ngừng (nâng mức Cao)
            </label>
            <label className="flex items-center gap-1">
              <input type="checkbox" checked={form.measurementAffected} onChange={(e) => setForm((f) => ({ ...f, measurementAffected: e.target.checked }))} />
              Ảnh hưởng hệ thống thu thập dữ liệu đo (nâng mức Cao)
            </label>
          </div>
          <p className="text-xs text-ink-3">Tài sản liên quan ({form.assetIds.length}):</p>
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
                {a.criticality === "CAO" && <span className="text-crit">(trọng yếu Cao)</span>}
              </label>
            ))}
          </div>
          <div>
            <button className={btn} disabled={isPending} onClick={() => run(() => createIncident(form), () => setOpen(false))}>
              Ghi nhận phiếu
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export function IncidentActions({ id, status, priority, securityFlag, role }: { id: string; status: string; priority: string; securityFlag: boolean; role: string | null }) {
  const { isPending, error, run } = useRun();
  const [escalated, setEscalated] = useState(false);
  const [route, setRoute] = useState({ securityIncidentRef: "", capaRef: "" });
  const [close, setClose] = useState({ rootCause: "", resolution: "", back: true, lessonRef: "", noLessonReason: "" });
  const [reason, setReason] = useState("");
  void role;

  return (
    <div className="flex max-w-md flex-col gap-1">
      {error && <span className="text-xs text-crit">{error}</span>}
      <div className="flex flex-wrap items-center gap-1">
        {status === "MOI" && (
          <>
            {priority === "CAO" && (
              <label className="flex items-center gap-1 text-xs text-ink">
                <input type="checkbox" checked={escalated} onChange={(e) => setEscalated(e.target.checked)} />
                Đã báo LĐV (01 giờ — R18)
              </label>
            )}
            <button className={btn} disabled={isPending} onClick={() => run(() => respondIncident(id, escalated))}>
              Tiếp nhận (QTHT)
            </button>
          </>
        )}
        {(status === "DANG_XU_LY" || status === "CHO_BEN_THU_BA") && (
          <>
            {securityFlag && (
              <>
                <input placeholder="Phiếu F28.03 (M28)" className={inputCls} value={route.securityIncidentRef} onChange={(e) => setRoute((r) => ({ ...r, securityIncidentRef: e.target.value }))} />
                <button className={btnGhost} disabled={isPending} onClick={() => run(() => routeIncident(id, { securityIncidentRef: route.securityIncidentRef }))}>
                  Định tuyến M28
                </button>
                <button className={btnGhost} disabled={isPending} onClick={() => run(() => confirmSecurityConclusion(id))}>
                  ATTT xác nhận M28 đã kết luận
                </button>
              </>
            )}
            <input placeholder="KPH (khi lặp ≥3 lần/90 ngày)" className={inputCls} value={route.capaRef} onChange={(e) => setRoute((r) => ({ ...r, capaRef: e.target.value }))} />
            <button className={btnGhost} disabled={isPending} onClick={() => run(() => routeIncident(id, { capaRef: route.capaRef }))}>
              Ghi KPH
            </button>
            <input placeholder="Nguyên nhân *" className={inputCls} value={close.rootCause} onChange={(e) => setClose((c) => ({ ...c, rootCause: e.target.value }))} />
            <input placeholder="Biện pháp *" className={inputCls} value={close.resolution} onChange={(e) => setClose((c) => ({ ...c, resolution: e.target.value }))} />
            <input placeholder="Bài học M26 / lý do không lập *" className={inputCls} value={close.noLessonReason} onChange={(e) => setClose((c) => ({ ...c, noLessonReason: e.target.value }))} />
            <button
              className={btnGhost}
              disabled={isPending}
              onClick={() =>
                run(() =>
                  markIncidentResolved(id, {
                    rootCause: close.rootCause,
                    resolution: close.resolution,
                    assetBackToNormal: close.back,
                    lessonRef: close.lessonRef || null,
                    noLessonReason: close.noLessonReason || null,
                  }),
                )
              }
            >
              Đã xử lý
            </button>
          </>
        )}
        {status === "DA_XU_LY" && (
          <button className={btn} disabled={isPending} onClick={() => run(() => closeIncident(id))}>
            Đóng phiếu {securityFlag && "(PT.ATTT)"}
          </button>
        )}
        {status !== "DA_DONG" && status !== "HUY" && (
          <>
            <input placeholder="Lý do hủy (LĐV)" className={inputCls} value={reason} onChange={(e) => setReason(e.target.value)} />
            <button className={btnGhost} disabled={isPending} onClick={() => run(() => cancelIncident(id, reason))}>
              Hủy
            </button>
          </>
        )}
      </div>
    </div>
  );
}
