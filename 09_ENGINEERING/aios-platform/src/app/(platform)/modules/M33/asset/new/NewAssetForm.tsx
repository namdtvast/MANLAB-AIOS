"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createAsset } from "@/lib/m33/actions";
import {
  ASSET_CLASS_LABEL,
  CRITICALITY_LABEL,
  DISCOVERY_LABEL,
  ENVIRONMENT_LABEL,
  MAINTENANCE_CYCLE_LABEL,
  NETWORK_ZONE_LABEL,
} from "@/lib/m33/labels";
import { CLASSIFICATION_LABEL } from "@/lib/m34/labels";
import type {
  M33AssetClass,
  M33Criticality,
  M33DiscoverySource,
  M33Environment,
  M33MaintenanceCycle,
  M33NetworkZone,
  Classification,
} from "@/generated/prisma/enums";

const inputCls =
  "w-full rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const labelCls = "text-xs font-medium text-ink-3";
const btn =
  "cursor-pointer rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";

export function NewAssetForm({ users }: { users: { id: string; name: string | null; email: string }[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    assetClass: "MAY_CHU" as M33AssetClass,
    model: "",
    serial: "",
    networkZone: "" as "" | M33NetworkZone,
    environment: "VAN_HANH" as M33Environment,
    location: "",
    userOwnerId: "",
    custodianId: "",
    criticality: "TRUNG_BINH" as M33Criticality,
    measuringDeviceRef: "",
    maxClassification: "NOI_BO" as Classification,
    diskEncryption: false,
    screenLock: false,
    antimalware: false,
    defaultPasswordChanged: false,
    unusedServicesClosed: false,
    osVersion: "",
    isPersonalDevice: false,
    byodApprovalRef: "",
    licenseType: "",
    licenseExpiry: "",
    warrantyUntil: "",
    eolDate: "",
    maintenanceCycle: "NAM" as M33MaintenanceCycle,
    recoveryTimeObjective: "",
    failoverPlan: "",
    riskRefs: "",
    platformRefs: "",
    infoAssetRefs: "",
    discoverySource: "MUA_SAM_MOI" as M33DiscoverySource,
  });
  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    setError(null);
    startTransition(async () => {
      const r = await createAsset({
        ...form,
        networkZone: form.networkZone || null,
        riskRefs: form.riskRefs.split(",").map((s) => s.trim()).filter(Boolean),
        platformRefs: form.platformRefs.split(",").map((s) => s.trim()).filter(Boolean),
        infoAssetRefs: form.infoAssetRefs.split(",").map((s) => s.trim()).filter(Boolean),
      });
      if (!r.ok) setError(r.message);
      else router.push(`/modules/M33/asset/${r.id}`);
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
  const check = (k: keyof typeof form, label: string) => (
    <label className="flex items-center gap-2 text-sm text-ink">
      <input type="checkbox" checked={Boolean(form[k])} onChange={(e) => set(k, e.target.checked)} />
      {label}
    </label>
  );

  return (
    <div className="flex max-w-3xl flex-col gap-5 rounded-xl border border-border bg-surface p-5">
      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className={labelCls}>Tên định danh trong vận hành *</label>
          <input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Lớp tài sản (ETV.P33 §2.1) *</label>
          <select className={inputCls} value={form.assetClass} onChange={(e) => set("assetClass", e.target.value)}>
            {Object.entries(ASSET_CLASS_LABEL).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Nguồn ghi nhận *</label>
          <select className={inputCls} value={form.discoverySource} onChange={(e) => set("discoverySource", e.target.value)}>
            {Object.entries(DISCOVERY_LABEL).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Model</label>
          <input className={inputCls} value={form.model} onChange={(e) => set("model", e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Serial (duy nhất với thiết bị vật lý)</label>
          <input className={inputCls} value={form.serial} onChange={(e) => set("serial", e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Vùng mạng (ETV.P28 mục 5.7.3)</label>
          <select className={inputCls} value={form.networkZone} onChange={(e) => set("networkZone", e.target.value)}>
            <option value="">— không áp dụng —</option>
            {Object.entries(NETWORK_ZONE_LABEL).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Môi trường *</label>
          <select className={inputCls} value={form.environment} onChange={(e) => set("environment", e.target.value)}>
            {Object.entries(ENVIRONMENT_LABEL).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className={labelCls}>Vị trí vật lý / nhà cung cấp đám mây *</label>
          <input className={inputCls} value={form.location} onChange={(e) => set("location", e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Người/đơn vị sử dụng (R1) *</label>
          <select className={inputCls} value={form.userOwnerId} onChange={(e) => set("userOwnerId", e.target.value)}>
            {userOptions}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Chủ quản trị — QTHT (R1) *</label>
          <select className={inputCls} value={form.custodianId} onChange={(e) => set("custodianId", e.target.value)}>
            {userOptions}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Mức trọng yếu (ETV.P33 §6.1.3)</label>
          <select className={inputCls} value={form.criticality} onChange={(e) => set("criticality", e.target.value)}>
            {Object.entries(CRITICALITY_LABEL).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Mức phân loại tối đa được xử lý</label>
          <select className={inputCls} value={form.maxClassification} onChange={(e) => set("maxClassification", e.target.value)}>
            {Object.entries(CLASSIFICATION_LABEL).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </div>
        {form.assetClass === "MAY_TINH_DIEU_KHIEN_DO" && (
          <div className="flex flex-col gap-1 sm:col-span-2">
            <label className={labelCls}>Thiết bị đo được phục vụ — M05 (R4) *</label>
            <input className={inputCls} value={form.measuringDeviceRef} onChange={(e) => set("measuringDeviceRef", e.target.value)} placeholder="vd TB-2025-031" />
          </div>
        )}
        <div className="flex flex-col gap-2 sm:col-span-2">
          <p className={labelCls}>Cấu hình an toàn cơ sở (R3 — ETV.P28 mục 5.7.2; ETV.P33 §6.2.3)</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {check("defaultPasswordChanged", "Đã đổi mật khẩu mặc định")}
            {check("unusedServicesClosed", "Đã đóng dịch vụ không dùng đến")}
            {check("screenLock", "Khóa màn hình tự động (thiết bị đầu cuối)")}
            {check("antimalware", "Phòng chống mã độc đang hoạt động (đầu cuối)")}
            {check("diskEncryption", "Mã hóa ổ đĩa (bắt buộc khi Hạn chế/Mật)")}
            {check("isPersonalDevice", "Thiết bị cá nhân dùng cho công việc (BYOD)")}
          </div>
        </div>
        {form.isPersonalDevice && (
          <div className="flex flex-col gap-1 sm:col-span-2">
            <label className={labelCls}>Phê duyệt LĐV cho BYOD xử lý Hạn chế/Mật (§6.2.4)</label>
            <input className={inputCls} value={form.byodApprovalRef} onChange={(e) => set("byodApprovalRef", e.target.value)} />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Hệ điều hành / phiên bản</label>
          <input className={inputCls} value={form.osVersion} onChange={(e) => set("osVersion", e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Chu kỳ bảo trì (R8)</label>
          <select className={inputCls} value={form.maintenanceCycle} onChange={(e) => set("maintenanceCycle", e.target.value)}>
            {Object.entries(MAINTENANCE_CYCLE_LABEL).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </div>
        {form.assetClass === "PHAN_MEM_BAN_QUYEN" && (
          <>
            <div className="flex flex-col gap-1">
              <label className={labelCls}>Loại giấy phép (R21) *</label>
              <input className={inputCls} value={form.licenseType} onChange={(e) => set("licenseType", e.target.value)} />
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelCls}>Hết hạn giấy phép *</label>
              <input type="date" className={inputCls} value={form.licenseExpiry} onChange={(e) => set("licenseExpiry", e.target.value)} />
            </div>
          </>
        )}
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Bảo hành đến</label>
          <input type="date" className={inputCls} value={form.warrantyUntil} onChange={(e) => set("warrantyUntil", e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Mốc hết vòng đời (EOL — R11)</label>
          <input type="date" className={inputCls} value={form.eolDate} onChange={(e) => set("eolDate", e.target.value)} />
        </div>
        {form.criticality === "CAO" && (
          <>
            <div className="flex flex-col gap-1">
              <label className={labelCls}>RTO — thời gian khôi phục mục tiêu (bắt buộc với Cao) *</label>
              <input className={inputCls} value={form.recoveryTimeObjective} onChange={(e) => set("recoveryTimeObjective", e.target.value)} />
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelCls}>Phương án dự phòng *</label>
              <input className={inputCls} value={form.failoverPlan} onChange={(e) => set("failoverPlan", e.target.value)} />
            </div>
          </>
        )}
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Rủi ro đã mở (M01/M28, phẩy)</label>
          <input className={inputCls} value={form.riskRefs} onChange={(e) => set("riskRefs", e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Nền tảng đang chạy trên hạ tầng này (M35, phẩy)</label>
          <input className={inputCls} value={form.platformRefs} onChange={(e) => set("platformRefs", e.target.value)} />
        </div>
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className={labelCls}>Tài sản thông tin trên thiết bị (M27, phẩy — R2)</label>
          <input className={inputCls} value={form.infoAssetRefs} onChange={(e) => set("infoAssetRefs", e.target.value)} />
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
