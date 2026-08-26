"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createRisk } from "@/lib/m28/actions";
import { RISK_LEVEL_LABEL, TREATMENT_OPTION_LABEL } from "@/lib/m28/labels";
import { CLASSIFICATION_LABEL } from "@/lib/m34/labels";
import { computeImpact, computeRiskScore, maxTreatmentMonths, riskLevel } from "@/lib/m28/rules";
import type { Classification, M28TreatmentOption } from "@/generated/prisma/enums";

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

const SCALE = [1, 2, 3, 4, 5];

export function NewRiskForm({
  users,
  assets,
}: {
  users: { id: string; name: string | null; email: string }[];
  assets: { code: string; name: string; classification: string }[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    assetRefs: [] as string[],
    classification: "HAN_CHE" as Classification,
    threat: "",
    vulnerability: "",
    existingControls: "",
    impactC: 3,
    impactI: 3,
    impactA: 3,
    likelihood: 3,
    treatmentOption: "GIAM_THIEU" as M28TreatmentOption,
    soaControlRefs: "",
    ownerId: users[0]?.id ?? "",
    m01RiskRef: "",
  });
  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  // Điểm rủi ro tính ngay trên giao diện cho người dùng thấy hệ quả, nhưng giá trị lưu vào DB là
  // giá trị do server tính lại — giao diện không phải nguồn sự thật.
  const impact = computeImpact(form.impactC, form.impactI, form.impactA);
  const score = computeRiskScore(form.likelihood, impact);
  const level = riskLevel(score);
  const maxMonths = maxTreatmentMonths(level);

  const toggleAsset = (code: string) =>
    setForm((f) => ({
      ...f,
      assetRefs: f.assetRefs.includes(code) ? f.assetRefs.filter((c) => c !== code) : [...f.assetRefs, code],
    }));

  const submit = () => {
    setError(null);
    startTransition(async () => {
      const r = await createRisk({
        ...form,
        soaControlRefs: form.soaControlRefs.split(",").map((s) => s.trim()).filter(Boolean),
      });
      if (!r.ok) setError(r.message);
      else router.push(`/modules/M28/risk/${r.id}`);
    });
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4">
      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      <Field label="Tên rủi ro" hint="Đủ nghĩa khi đứng một mình.">
        <input className={inputCls} value={form.title} onChange={(e) => set("title", e.target.value)} />
      </Field>

      <Field
        label="Tài sản thông tin liên quan (danh mục M27)"
        hint="Bắt buộc chọn ít nhất một. Rủi ro không gắn được tài sản thì không cho lưu (ETV.P28 mục 6.3)."
      >
        <div className="flex flex-col gap-1 rounded-lg border border-border bg-bg p-2">
          {assets.map((a) => (
            <label key={a.code} className="flex items-center gap-2 text-sm text-ink">
              <input
                type="checkbox"
                checked={form.assetRefs.includes(a.code)}
                onChange={() => toggleAsset(a.code)}
              />
              <span className="font-mono text-xs text-ink-2">{a.code}</span> {a.name}
              <span className="text-xs text-ink-3">({CLASSIFICATION_LABEL[a.classification]})</span>
            </label>
          ))}
          {assets.length === 0 && <span className="text-xs text-ink-3">Chưa có tài sản nào Đang sử dụng.</span>}
        </div>
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Mối đe dọa">
          <input className={inputCls} value={form.threat} onChange={(e) => set("threat", e.target.value)} />
        </Field>
        <Field label="Điểm yếu bị khai thác">
          <input
            className={inputCls}
            value={form.vulnerability}
            onChange={(e) => set("vulnerability", e.target.value)}
          />
        </Field>
      </div>

      <Field label="Kiểm soát hiện có (nếu có)">
        <input
          className={inputCls}
          value={form.existingControls}
          onChange={(e) => set("existingControls", e.target.value)}
        />
      </Field>

      <Field label="Mức phân loại thông tin bị ảnh hưởng">
        <select
          className={inputCls}
          value={form.classification}
          onChange={(e) => set("classification", e.target.value)}
        >
          {Object.entries(CLASSIFICATION_LABEL).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-4 sm:grid-cols-4">
        {(
          [
            ["impactC", "Hệ quả — Bí mật (C)"],
            ["impactI", "Hệ quả — Toàn vẹn (I)"],
            ["impactA", "Hệ quả — Sẵn sàng (A)"],
            ["likelihood", "Khả năng xảy ra (K)"],
          ] as const
        ).map(([key, label]) => (
          <Field key={key} label={label}>
            <select className={inputCls} value={form[key]} onChange={(e) => set(key, Number(e.target.value))}>
              {SCALE.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </Field>
        ))}
      </div>

      <div className="rounded-lg border border-border bg-sunk px-3 py-2 text-sm text-ink-2">
        Hệ thống tính: T = max(C, I, A) = <strong className="text-ink">{impact}</strong> · R = K × T ={" "}
        <strong className="text-ink">{score}</strong> ⇒ mức{" "}
        <strong className="text-ink">{RISK_LEVEL_LABEL[level]}</strong>
        {maxMonths && ` — hạn xử lý tối đa ${maxMonths} tháng`}
        {form.impactA >= 4 && (
          <span className="block text-xs">
            Tác động tới tính sẵn sàng từ 4 trở lên ⇒ rủi ro này là đầu vào bắt buộc cho kế hoạch liên tục hoạt động
            (ETV.P31).
          </span>
        )}
        {score >= 20 && (
          <span className="block text-xs text-crit">
            Mức Rất cao: bắt buộc có biện pháp khống chế tạm thời áp dụng ngay khi lập Kế hoạch xử lý.
          </span>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phương án xử lý">
          <select
            className={inputCls}
            value={form.treatmentOption}
            onChange={(e) => set("treatmentOption", e.target.value)}
          >
            {Object.entries(TREATMENT_OPTION_LABEL).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label="Mã kiểm soát trong SoA"
          hint={
            form.treatmentOption === "GIAM_THIEU"
              ? "Bắt buộc khi chọn Giảm thiểu. Nhiều mã cách nhau bằng dấu phẩy, vd A.5.14, A.8.24."
              : "Nhiều mã cách nhau bằng dấu phẩy."
          }
        >
          <input
            className={inputCls}
            value={form.soaControlRefs}
            onChange={(e) => set("soaControlRefs", e.target.value)}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Chủ sở hữu rủi ro"
          hint="Phải là TP lĩnh vực hoặc LĐV — không giao cho Quản trị hệ thống (ETV.P28 mục 6.4.3)."
        >
          <select className={inputCls} value={form.ownerId} onChange={(e) => set("ownerId", e.target.value)}>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name ?? u.email}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Mã rủi ro tương ứng ở M01 (nếu mức Cao trở lên)">
          <input className={inputCls} value={form.m01RiskRef} onChange={(e) => set("m01RiskRef", e.target.value)} />
        </Field>
      </div>

      <div>
        <button className={btn} disabled={isPending} onClick={submit}>
          {isPending ? "Đang lưu…" : "Lưu bản ghi (Nháp)"}
        </button>
      </div>
    </div>
  );
}
