"use client";

// Đăng ký một model (AIModel) thuộc một nhà cung cấp đã có.
//
// `modelId` phải TRÙNG ĐÚNG id model tại nhà cung cấp — với máy chủ tự vận hành đó là
// `--served-model-name` của vLLM/LiteLLM (ETV.GAI 01 §3.4 Bước 4b). Sai một ký tự thì lượt gọi
// đầu tiên mới đổ, không phải lúc đăng ký.
//
// Model mới sinh ra ở trạng thái ACTIVE theo mặc định của lược đồ, nhưng chưa dùng được ngay:
// Agent phải trỏ vào model đó và phải có hồ sơ AIA đã phê duyệt (ETV.P29 §5.2.3 — Cổng AIA).

import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { createModel } from "@/lib/m29/actions";

const fieldCls = "rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const labelCls = "flex flex-col gap-1.5 text-sm font-medium text-ink";

export function NewModelForm({ providers }: { providers: { id: string; code: string; name: string }[] }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  if (providers.length === 0)
    return (
      <p className="mb-3 rounded-xl border border-dashed border-border px-4 py-3 text-sm text-ink-3">
        Chưa có nhà cung cấp nào — thêm nhà cung cấp trước, model gắn vào nhà cung cấp đó.
      </p>
    );

  return (
    <details className="mb-3 rounded-xl border border-border bg-surface">
      <summary className="cursor-pointer list-none px-4 py-2.5 text-sm font-semibold text-ink marker:content-none">+ Thêm model</summary>

      <form
        ref={formRef}
        className="flex flex-col gap-4 border-t border-border p-4"
        action={(formData: FormData) => {
          setError(null);
          setDone(null);
          const modelId = String(formData.get("modelId") ?? "").trim();
          startTransition(async () => {
            try {
              const maxTokens = String(formData.get("maxTokens") ?? "").trim();
              await createModel({
                providerId: String(formData.get("providerId") ?? ""),
                modelId,
                displayName: String(formData.get("displayName") ?? "").trim(),
                purpose: String(formData.get("purpose") ?? "").trim() || undefined,
                maxTokens: maxTokens ? Number(maxTokens) : undefined,
                inputCostPerMillionTokens: Number(formData.get("inputRate") ?? 0),
                outputCostPerMillionTokens: Number(formData.get("outputRate") ?? 0),
                currency: String(formData.get("currency") ?? "USD"),
              });
              formRef.current?.reset();
              setDone(`Đã thêm model "${modelId}".`);
              router.refresh();
            } catch (e) {
              setError(e instanceof Error ? e.message : "Có lỗi xảy ra.");
            }
          });
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelCls}>
            Nhà cung cấp
            <select name="providerId" required className={fieldCls} defaultValue="">
              <option value="" disabled>
                — Chọn nhà cung cấp —
              </option>
              {providers.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.code} — {p.name}
                </option>
              ))}
            </select>
          </label>

          <label className={labelCls}>
            Mã model tại nhà cung cấp (modelId)
            <input name="modelId" required className={`${fieldCls} font-mono`} placeholder="vd: qwen3-14b-instruct" />
            <span className="text-xs font-normal text-ink-3">
              Phải trùng đúng tên model mà máy chủ phơi ra. Với máy chủ nội bộ: chính là <code className="font-mono">--served-model-name</code>; kiểm bằng
              <code className="font-mono"> GET {"{apiBaseUrl}"}/models</code>.
            </span>
          </label>

          <label className={labelCls}>
            Tên hiển thị
            <input name="displayName" required className={fieldCls} placeholder="vd: Qwen3 14B (lượng tử hoá INT4)" />
          </label>

          <label className={labelCls}>
            Giới hạn token mỗi lượt (maxTokens)
            <input name="maxTokens" type="number" min="1" step="1" className={fieldCls} placeholder="vd: 4096" />
          </label>

          <label className={`${labelCls} sm:col-span-2`}>
            Nhóm tác vụ được phép (purpose)
            <input name="purpose" className={fieldCls} placeholder="vd: Tra cứu, phân loại, bóc tách tài liệu — chạy trên hạ tầng của Viện" />
          </label>

          <label className={labelCls}>
            Giá token vào / 1 triệu
            <input name="inputRate" type="number" min="0" step="0.000001" defaultValue={0} className={`${fieldCls} tabular-nums`} />
            <span className="text-xs font-normal text-ink-3">Mô hình nội bộ để 0 — chi phí điện và khấu hao theo dõi ở ETV.P.F 33.01.</span>
          </label>

          <label className={labelCls}>
            Giá token ra / 1 triệu
            <input name="outputRate" type="number" min="0" step="0.000001" defaultValue={0} className={`${fieldCls} tabular-nums`} />
          </label>

          <label className={labelCls}>
            Tiền tệ
            <select name="currency" className={fieldCls} defaultValue="USD">
              <option value="USD">USD</option>
              <option value="VND">VND</option>
            </select>
          </label>
        </div>

        {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}
        {done && <p className="rounded-lg border border-good/30 bg-good-soft px-3 py-2 text-sm text-good">{done}</p>}

        <button
          type="submit"
          disabled={isPending}
          className="cursor-pointer self-start rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Đang lưu…" : "Thêm model"}
        </button>
      </form>
    </details>
  );
}
