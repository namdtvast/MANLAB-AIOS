"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { advanceIncident, updateIncidentFields } from "@/lib/m28/actions";
import { INCIDENT_STATUS_LABEL } from "@/lib/m28/labels";
import type { M28IncidentStatus } from "@/generated/prisma/enums";

const btn =
  "cursor-pointer rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const btnGhost =
  "cursor-pointer rounded-lg border border-border px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";
const inputCls =
  "w-full rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const labelCls = "text-xs font-medium text-ink-3";

const NEXT_STEPS: Record<string, M28IncidentStatus[]> = {
  MOI: ["DANG_KHONG_CHE", "HUY"],
  DANG_KHONG_CHE: ["DANG_DIEU_TRA", "HUY"],
  DANG_DIEU_TRA: ["DANG_KHAC_PHUC", "HUY"],
  DANG_KHAC_PHUC: ["CHO_KET_LUAN"],
  CHO_KET_LUAN: ["DA_DONG"],
  DA_DONG: [],
  HUY: [],
};

export function IncidentActionPanel({
  id,
  status,
  severity,
  role,
  m10Ref,
  m11Ref,
  lessonRef,
}: {
  id: string;
  status: string;
  severity: string;
  role: string | null;
  m10Ref: string | null;
  m11Ref: string | null;
  lessonRef: string | null;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [fields, setFields] = useState({
    evidencePreserved: "",
    scopeOfImpact: "",
    m10Ref: m10Ref ?? "",
    m11Ref: m11Ref ?? "",
    lessonRef: lessonRef ?? "",
    capaRef: "",
  });

  const run = (fn: () => Promise<{ ok: boolean; message?: string }>) => {
    setError(null);
    startTransition(async () => {
      const r = await fn();
      if (!r.ok) setError(r.message ?? "Có lỗi xảy ra.");
      else {
        setNote("");
        router.refresh();
      }
    });
  };

  const steps = NEXT_STEPS[status] ?? [];
  const closed = status === "DA_DONG" || status === "HUY";
  const canEdit = ["ATTT", "QTHT", "QLCL", "LDV"].includes(role ?? "") && !closed;

  if (steps.length === 0 && !canEdit) return null;

  return (
    <section className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
      <h2 className="font-head text-lg font-semibold text-ink">Hành động</h2>
      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      {steps.length > 0 && (
        <>
          <div>
            <label className={labelCls}>
              Ghi chú cho bước tiếp theo — bắt buộc với khống chế (nêu biện pháp), khắc phục (nêu nguyên nhân) và huỷ
              phiếu (nêu lý do)
            </label>
            <input className={inputCls} value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
          <div className="flex flex-wrap gap-2">
            {steps.map((s) => (
              <button
                key={s}
                className={s === "HUY" ? btnGhost : btn}
                disabled={isPending}
                onClick={() => run(() => advanceIncident(id, s, note))}
              >
                {s === "DA_DONG" ? "Đóng sự cố" : `Chuyển: ${INCIDENT_STATUS_LABEL[s]}`}
              </button>
            ))}
          </div>
          {status === "CHO_KET_LUAN" && (
            <p className="text-xs text-ink-3">
              Đóng sự cố mức {severity === "CAO" || severity === "RAT_CAO" ? "Cao/Rất cao thuộc thẩm quyền LĐV" : "Thấp/Trung bình thuộc thẩm quyền PT.ATTT"};
              người liên quan trực tiếp tới sự cố không được đóng chính sự cố đó (ETV.P28 mục 5.3).
            </p>
          )}
        </>
      )}

      {canEdit && (
        <div className="flex flex-col gap-2 border-t border-border pt-3">
          <label className={labelCls}>Cập nhật hồ sơ điều tra</label>
          <div className="grid gap-2 sm:grid-cols-2">
            <input
              className={inputCls}
              placeholder="Bằng chứng đã thu thập và nơi lưu"
              value={fields.evidencePreserved}
              onChange={(e) => setFields((s) => ({ ...s, evidencePreserved: e.target.value }))}
            />
            <input
              className={inputCls}
              placeholder="Phạm vi ảnh hưởng"
              value={fields.scopeOfImpact}
              onChange={(e) => setFields((s) => ({ ...s, scopeOfImpact: e.target.value }))}
            />
            <input
              className={inputCls}
              placeholder="Mã hồ sơ ETV.P10 (nếu ảnh hưởng hiệu lực kết quả)"
              value={fields.m10Ref}
              onChange={(e) => setFields((s) => ({ ...s, m10Ref: e.target.value }))}
            />
            <input
              className={inputCls}
              placeholder="Mã hồ sơ ETV.P11"
              value={fields.m11Ref}
              onChange={(e) => setFields((s) => ({ ...s, m11Ref: e.target.value }))}
            />
            <input
              className={inputCls}
              placeholder="Mã bài học kinh nghiệm ETV.P26"
              value={fields.lessonRef}
              onChange={(e) => setFields((s) => ({ ...s, lessonRef: e.target.value }))}
            />
            <input
              className={inputCls}
              placeholder="Mã KPH ETV.P13"
              value={fields.capaRef}
              onChange={(e) => setFields((s) => ({ ...s, capaRef: e.target.value }))}
            />
          </div>
          <div>
            <button className={btnGhost} disabled={isPending} onClick={() => run(() => updateIncidentFields(id, fields))}>
              Lưu hồ sơ
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
