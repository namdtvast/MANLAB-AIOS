"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createDataSet } from "@/lib/m34/actions";
import { CLASSIFICATION_LABEL, DATA_GROUP_LABEL } from "@/lib/m34/labels";
import type { M34DataGroup, Classification } from "@/generated/prisma/enums";

const inputCls =
  "w-full rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const labelCls = "text-xs font-medium text-ink-3";
const btn =
  "cursor-pointer rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";

export function NewDataSetForm({ users }: { users: { id: string; name: string | null; email: string }[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);

  const [form, setForm] = useState({
    name: "",
    dataGroup: "DO_KY_THUAT" as M34DataGroup,
    purpose: "",
    ownerId: "",
    stewardId: "",
    primaryEntererId: "",
    platformRef: "",
    infraRef: "",
    copiesNote: "",
    classification: "NOI_BO" as Classification,
    hasPersonalData: false,
    personalDataLegalRef: "",
    qualityMetricsNote: "",
    activeRetention: "",
    retentionBasis: "",
    readScope: "",
    writeScope: "",
    externalSharingNote: "",
    infoAssetRef: "",
    recordRef: "",
    lineageNote: "",
  });

  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    setError(null);
    startTransition(async () => {
      const r = await createDataSet({ ...form, primaryEntererId: form.primaryEntererId || null });
      if (!r.ok) {
        setError(r.message);
        return;
      }
      if (r.warnings.length > 0) setWarnings(r.warnings);
      router.push(`/modules/M34/dataset/${r.id}`);
    });
  };

  const userOptions = (
    <>
      <option value="">— chọn —</option>
      {users.map((u) => (
        <option key={u.id} value={u.id}>
          {u.name ?? u.email}
        </option>
      ))}
    </>
  );

  return (
    <div className="flex max-w-3xl flex-col gap-5 rounded-xl border border-border bg-surface p-5">
      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}
      {warnings.length > 0 && (
        <p className="rounded-lg border border-warn/30 bg-warn-soft px-3 py-2 text-xs text-warn">
          Cảnh báo R6 — mô tả có dấu hiệu chứa dữ liệu thật: {warnings.join("; ")}. Bản ghi chỉ mô tả, không chứa dữ liệu (ETV.P34 §6.1.1).
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className={labelCls}>Tên gọi tập dữ liệu *</label>
          <input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Nhóm dữ liệu (ETV.P34 §2.1) *</label>
          <select className={inputCls} value={form.dataGroup} onChange={(e) => set("dataGroup", e.target.value)}>
            {Object.entries(DATA_GROUP_LABEL).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Mục đích sử dụng *</label>
          <input className={inputCls} value={form.purpose} onChange={(e) => set("purpose", e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Chủ sở hữu dữ liệu — CSHDL (R1) *</label>
          <select className={inputCls} value={form.ownerId} onChange={(e) => set("ownerId", e.target.value)}>
            {userOptions}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Người quản trị dữ liệu — QTDL (R1) *</label>
          <select className={inputCls} value={form.stewardId} onChange={(e) => set("stewardId", e.target.value)}>
            {userOptions}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Người nhập liệu chính (phục vụ tách vai trò R16)</label>
          <select className={inputCls} value={form.primaryEntererId} onChange={(e) => set("primaryEntererId", e.target.value)}>
            {userOptions}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Mức phân loại (thang ETV.P02/P27/P28) *</label>
          <select className={inputCls} value={form.classification} onChange={(e) => set("classification", e.target.value)}>
            {Object.entries(CLASSIFICATION_LABEL).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2 pt-5">
          <input
            id="hasPersonal"
            type="checkbox"
            checked={form.hasPersonalData}
            onChange={(e) => set("hasPersonalData", e.target.checked)}
          />
          <label htmlFor="hasPersonal" className="text-sm text-ink">
            Có chứa dữ liệu cá nhân (chu kỳ rà soát 06 tháng — R8)
          </label>
        </div>
        {form.hasPersonalData && (
          <div className="flex flex-col gap-1 sm:col-span-2">
            <label className={labelCls}>Văn bản pháp luật bảo vệ dữ liệu cá nhân đang áp dụng (R2 — §3.2) *</label>
            <input className={inputCls} value={form.personalDataLegalRef} onChange={(e) => set("personalDataLegalRef", e.target.value)} />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Nền tảng lưu (→ M35)</label>
          <input className={inputCls} value={form.platformRef} onChange={(e) => set("platformRef", e.target.value)} placeholder="vd NT-2026-003 / ManLab" />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Hạ tầng lưu (→ M33)</label>
          <input className={inputCls} value={form.infraRef} onChange={(e) => set("infraRef", e.target.value)} placeholder="vd HT-2026-001" />
        </div>
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className={labelCls}>Bản sao ở nơi nào khác (§6.1.1 nhóm Nơi lưu)</label>
          <input className={inputCls} value={form.copiesNote} onChange={(e) => set("copiesNote", e.target.value)} />
        </div>
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className={labelCls}>Chỉ số chất lượng, ngưỡng, kỳ đo (R4 — bắt buộc trước phê duyệt)</label>
          <textarea rows={2} className={inputCls} value={form.qualityMetricsNote} onChange={(e) => set("qualityMetricsNote", e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Thời hạn giữ ở giai đoạn Hoạt động</label>
          <input className={inputCls} value={form.activeRetention} onChange={(e) => set("activeRetention", e.target.value)} placeholder="vd 05 năm" />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Căn cứ thời hạn lưu (R5) *</label>
          <input className={inputCls} value={form.retentionBasis} onChange={(e) => set("retentionBasis", e.target.value)} placeholder="ETV.P15 / F14.06 / pháp luật chuyên ngành" />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Ai được đọc</label>
          <input className={inputCls} value={form.readScope} onChange={(e) => set("readScope", e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Ai được sửa</label>
          <input className={inputCls} value={form.writeScope} onChange={(e) => set("writeScope", e.target.value)} />
        </div>
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className={labelCls}>Được chia sẻ ra ngoài? Điều kiện gì</label>
          <input className={inputCls} value={form.externalSharingNote} onChange={(e) => set("externalSharingNote", e.target.value)} placeholder="Không / Có, điều kiện: …" />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Tài sản thông tin tương ứng (→ M27)</label>
          <input className={inputCls} value={form.infoAssetRef} onChange={(e) => set("infoAssetRef", e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Hồ sơ tương ứng (→ M15)</label>
          <input className={inputCls} value={form.recordRef} onChange={(e) => set("recordRef", e.target.value)} />
        </div>
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className={labelCls}>Truy xuất nguồn gốc — nguồn phát sinh, quy tắc biến đổi (R20, bắt buộc với dữ liệu đo/công bố)</label>
          <textarea rows={2} className={inputCls} value={form.lineageNote} onChange={(e) => set("lineageNote", e.target.value)} />
        </div>
      </div>

      <div>
        <button className={btn} disabled={isPending} onClick={submit}>
          Khai báo (Nháp)
        </button>
      </div>
    </div>
  );
}
