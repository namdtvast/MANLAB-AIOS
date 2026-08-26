"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createAsset } from "@/lib/m27/actions";
import {
  ASSET_TYPE_LABEL,
  BACKUP_FREQUENCY_LABEL,
  CIA_LABEL,
  DATA_DOMAIN_LABEL,
  DISPOSAL_METHOD_LABEL,
} from "@/lib/m27/labels";
import { CLASSIFICATION_LABEL } from "@/lib/m34/labels";
import { isElectronic, MIN_CLASSIFICATION } from "@/lib/m27/rules";
import type {
  Classification,
  M27AssetType,
  M27CiaLevel,
  M27DataDomain,
  M27DisposalMethod,
} from "@/generated/prisma/enums";

const inputCls =
  "w-full rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const labelCls = "text-xs font-medium text-ink-3";
const btn =
  "cursor-pointer rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className={labelCls}>{label}</label>
      {children}
      {hint && <span className="text-xs text-ink-3">{hint}</span>}
    </div>
  );
}

function Select<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: Record<string, string>;
}) {
  return (
    <select className={inputCls} value={value} onChange={(e) => onChange(e.target.value as T)}>
      {Object.entries(options).map(([k, v]) => (
        <option key={k} value={k}>
          {v}
        </option>
      ))}
    </select>
  );
}

export function NewAssetForm({ users }: { users: { id: string; name: string | null; email: string }[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    assetType: "CSDL_DIEN_TU" as M27AssetType,
    dataDomain: "KET_QUA_DO" as M27DataDomain,
    description: "",
    classification: "HAN_CHE" as Classification,
    classificationDowngradeRef: "",
    ciaC: "TRUNG_BINH" as M27CiaLevel,
    ciaI: "TRUNG_BINH" as M27CiaLevel,
    ciaA: "TRUNG_BINH" as M27CiaLevel,
    containsPersonalData: false,
    personalDataScope: "",
    legalBasis: "",
    ownerId: users[0]?.id ?? "",
    custodianId: "",
    storageLocation: "",
    systemRefs: "",
    docRef: "",
    recordRef: "",
    datasetRefs: "",
    retentionPeriod: "",
    retentionBasis: "",
    disposalMethod: "XOA_AN_TOAN" as M27DisposalMethod,
    backupRequired: false,
    backupFrequency: "THANG",
    externalSharingAllowed: false,
    riskRefs: "",
  });
  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const electronic = isElectronic(form.assetType);
  const minLevel = MIN_CLASSIFICATION[form.dataDomain];
  const order: Classification[] = ["CONG_KHAI", "NOI_BO", "HAN_CHE", "MAT"];
  const isDowngrade = order.indexOf(form.classification) < order.indexOf(minLevel);
  const highAvailability = form.ciaA === "CAO";

  const submit = () => {
    setError(null);
    startTransition(async () => {
      const r = await createAsset({
        ...form,
        systemRefs: form.systemRefs.split(",").map((s) => s.trim()).filter(Boolean),
        datasetRefs: form.datasetRefs.split(",").map((s) => s.trim()).filter(Boolean),
        riskRefs: form.riskRefs.split(",").map((s) => s.trim()).filter(Boolean),
        backupRequired: highAvailability ? true : form.backupRequired,
      });
      if (!r.ok) setError(r.message);
      else router.push(`/modules/M27/asset/${r.id}`);
    });
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4">
      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Tên tài sản">
          <input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} />
        </Field>
        <Field label="Loại tài sản">
          <Select value={form.assetType} onChange={(v) => set("assetType", v)} options={ASSET_TYPE_LABEL} />
        </Field>
      </div>

      <Field
        label="Mô tả nội dung dữ liệu"
        hint="Mô tả nội dung chứa đựng — KHÔNG chép dữ liệu thật vào bản ghi (ETV.P27 Phụ lục I.1 điều kiện 8)."
      >
        <textarea
          className={inputCls}
          rows={2}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nhóm dữ liệu nghiệp vụ">
          <Select value={form.dataDomain} onChange={(v) => set("dataDomain", v)} options={DATA_DOMAIN_LABEL} />
        </Field>
        <Field
          label="Mức phân loại"
          hint={`Mức tối thiểu của nhóm dữ liệu này: ${CLASSIFICATION_LABEL[minLevel]} (ETV.P27 §6.1.3).`}
        >
          <Select
            value={form.classification}
            onChange={(v) => set("classification", v)}
            options={CLASSIFICATION_LABEL}
          />
        </Field>
      </div>

      {isDowngrade && (
        <Field
          label="Căn cứ hạ mức phân loại"
          hint="Bắt buộc khi đặt thấp hơn mức tối thiểu: mã phê duyệt công bố theo ETV.P02, hoặc căn cứ pháp luật bắt buộc công bố. Thiếu ⇒ chặn phê duyệt."
        >
          <input
            className={inputCls}
            value={form.classificationDowngradeRef}
            onChange={(e) => set("classificationDowngradeRef", e.target.value)}
          />
        </Field>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Bảo mật (C)">
          <Select value={form.ciaC} onChange={(v) => set("ciaC", v)} options={CIA_LABEL} />
        </Field>
        <Field label="Toàn vẹn (I)">
          <Select value={form.ciaI} onChange={(v) => set("ciaI", v)} options={CIA_LABEL} />
        </Field>
        <Field label="Sẵn sàng (A)" hint={highAvailability ? "Sẵn sàng = Cao ⇒ bắt buộc sao lưu (§6.5.1)." : undefined}>
          <Select value={form.ciaA} onChange={(v) => set("ciaA", v)} options={CIA_LABEL} />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Chủ sở hữu tài sản" hint="Phải là MỘT CÁ NHÂN, không phải tên phòng (điều kiện 1).">
          <select className={inputCls} value={form.ownerId} onChange={(e) => set("ownerId", e.target.value)}>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name ?? u.email}
              </option>
            ))}
          </select>
        </Field>
        {electronic && (
          <Field label="Người quản lý kỹ thuật" hint="Bắt buộc với tài sản ở dạng điện tử (điều kiện 2).">
            <select className={inputCls} value={form.custodianId} onChange={(e) => set("custodianId", e.target.value)}>
              <option value="">— chọn —</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name ?? u.email}
                </option>
              ))}
            </select>
          </Field>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nơi lưu vật lý hoặc logic">
          <input
            className={inputCls}
            value={form.storageLocation}
            onChange={(e) => set("storageLocation", e.target.value)}
          />
        </Field>
        {electronic && (
          <Field label="Hệ thống chứa tài sản (mã ở ETV.P33)" hint="Nhiều mã cách nhau bằng dấu phẩy.">
            <input
              className={inputCls}
              placeholder="HT-2026-0001"
              value={form.systemRefs}
              onChange={(e) => set("systemRefs", e.target.value)}
            />
          </Field>
        )}
      </div>

      <div className="flex flex-col gap-2 border-t border-border pt-3">
        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            checked={form.containsPersonalData}
            onChange={(e) => set("containsPersonalData", e.target.checked)}
          />
          Tài sản có chứa dữ liệu cá nhân
        </label>
        {form.containsPersonalData && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Phạm vi chủ thể và loại dữ liệu cá nhân">
              <input
                className={inputCls}
                placeholder="vd Người lao động của Viện; dữ liệu cơ bản"
                value={form.personalDataScope}
                onChange={(e) => set("personalDataScope", e.target.value)}
              />
            </Field>
            <Field
              label="Căn cứ pháp lý và mục đích xử lý"
              hint="Bắt buộc theo NĐ 13/2023 (§6.4). Thời hạn lưu phải hữu hạn, không ghi 'vĩnh viễn' nếu không có căn cứ pháp luật."
            >
              <input
                className={inputCls}
                value={form.legalBasis}
                onChange={(e) => set("legalBasis", e.target.value)}
              />
            </Field>
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Thời hạn lưu">
          <input
            className={inputCls}
            placeholder="vd 10 năm"
            value={form.retentionPeriod}
            onChange={(e) => set("retentionPeriod", e.target.value)}
          />
        </Field>
        <Field label="Căn cứ thời hạn lưu" hint="ETV.P15 · ETV.P.F 14.06 · pháp luật chuyên ngành (điều kiện 5).">
          <input
            className={inputCls}
            value={form.retentionBasis}
            onChange={(e) => set("retentionBasis", e.target.value)}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phương pháp huỷ dự kiến">
          <Select
            value={form.disposalMethod}
            onChange={(v) => set("disposalMethod", v)}
            options={DISPOSAL_METHOD_LABEL}
          />
        </Field>
        <Field label="Sao lưu">
          <label className="flex items-center gap-2 py-1.5 text-sm text-ink">
            <input
              type="checkbox"
              checked={highAvailability ? true : form.backupRequired}
              disabled={highAvailability}
              onChange={(e) => set("backupRequired", e.target.checked)}
            />
            Có yêu cầu sao lưu
          </label>
          {(highAvailability || form.backupRequired) && (
            <Select
              value={form.backupFrequency}
              onChange={(v) => set("backupFrequency", v)}
              options={BACKUP_FREQUENCY_LABEL}
            />
          )}
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Rủi ro liên quan (ETV.P28 / ETV.P01)" hint="Nhiều mã cách nhau bằng dấu phẩy.">
          <input className={inputCls} value={form.riskRefs} onChange={(e) => set("riskRefs", e.target.value)} />
        </Field>
        <Field label="Tài liệu (ETV.P14) / hồ sơ (ETV.P15) liên quan">
          <div className="flex gap-2">
            <input
              className={inputCls}
              placeholder="Mã tài liệu"
              value={form.docRef}
              onChange={(e) => set("docRef", e.target.value)}
            />
            <input
              className={inputCls}
              placeholder="Mã hồ sơ"
              value={form.recordRef}
              onChange={(e) => set("recordRef", e.target.value)}
            />
          </div>
        </Field>
      </div>

      {(form.classification === "HAN_CHE" || form.classification === "MAT") && (
        <p className="rounded-lg border border-border bg-sunk px-3 py-2 text-xs text-ink-2">
          Tài sản mức <strong>{CLASSIFICATION_LABEL[form.classification]}</strong> mặc định{" "}
          <strong>không được phép</strong> chia sẻ ra ngoài Viện (ETV.P27 §6.6). Từng lần chia sẻ phải được phê
          duyệt theo ETV.P34 §6.5 (F34.03).
        </p>
      )}

      <div>
        <button className={btn} disabled={isPending} onClick={submit}>
          {isPending ? "Đang lưu…" : "Lưu bản ghi (Nháp)"}
        </button>
      </div>
    </div>
  );
}
