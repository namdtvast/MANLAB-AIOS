"use client";

// Đăng ký một nền tảng mới vào danh mục M29. Bản ghi luôn sinh ra ở trạng thái Nháp và ở ranh
// giới dữ liệu siết nhất (EXTERNAL_NO_COMMITMENT — mặc định của lược đồ): form này CỐ Ý không
// phơi hai trường đó. Đưa vào vận hành đi qua vòng đời phê duyệt ở cột Thao tác; nới ranh giới
// dữ liệu là việc của AI_SECURITY_ADMIN/SUPER_ADMIN và bắt buộc dẫn số hồ sơ F29.02
// (datRanhGioiDuLieu — xem ETV.P29 §5.5). Đăng ký nền tảng KHÔNG được là đường vòng qua hai chốt đó.

import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { createPlatform } from "@/lib/m29/actions";

const fieldCls = "rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const labelCls = "flex flex-col gap-1.5 text-sm font-medium text-ink";

// AIPlatform.environment là chuỗi tự do ở lược đồ. Giới hạn bằng select để danh mục không sinh
// thêm biến thể viết hoa/viết thường của cùng ba giá trị đang dùng.
const ENVIRONMENTS: [string, string][] = [
  ["INTERNAL", "INTERNAL — hạ tầng trong Viện"],
  ["EXTERNAL", "EXTERNAL — dịch vụ ngoài Viện"],
  ["STAGING", "STAGING — thử nghiệm, chưa vận hành"],
];

export function NewPlatformForm({ adapterTypes, existingCodes }: { adapterTypes: string[]; existingCodes: string[] }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  return (
    <details className="mb-3 rounded-xl border border-border bg-surface">
      <summary className="cursor-pointer list-none px-4 py-2.5 text-sm font-semibold text-ink marker:content-none">+ Đăng ký nền tảng mới</summary>

      <form
        ref={formRef}
        className="flex flex-col gap-4 border-t border-border p-4"
        action={(formData: FormData) => {
          setError(null);
          setDone(null);
          const code = String(formData.get("code") ?? "").trim();
          // Chặn trùng mã ngay trên trình duyệt cho gọn thao tác; ràng buộc thật vẫn là @unique
          // của cột code — client chỉ là gương, không phải chốt.
          if (existingCodes.some((c) => c.toLowerCase() === code.toLowerCase())) {
            setError(`Mã "${code}" đã có trong danh mục — mỗi nền tảng một mã duy nhất.`);
            return;
          }
          startTransition(async () => {
            try {
              await createPlatform({
                code,
                name: String(formData.get("name") ?? "").trim(),
                adapterType: String(formData.get("adapterType") ?? ""),
                environment: String(formData.get("environment") ?? "INTERNAL"),
                baseUrl: String(formData.get("baseUrl") ?? "").trim() || undefined,
                apiBaseUrl: String(formData.get("apiBaseUrl") ?? "").trim() || undefined,
                owner: String(formData.get("owner") ?? "").trim() || undefined,
              });
              formRef.current?.reset();
              setDone(`Đã đăng ký nền tảng "${code}" ở trạng thái Nháp.`);
              router.refresh();
            } catch (e) {
              setError(e instanceof Error ? e.message : "Có lỗi xảy ra.");
            }
          });
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelCls}>
            Mã nền tảng
            <input
              name="code"
              required
              pattern="[A-Za-z0-9_.\-]+"
              title="Chỉ dùng chữ, số, dấu gạch dưới, gạch ngang hoặc chấm — không dấu cách."
              className={`${fieldCls} font-mono`}
              placeholder="vd: OPENAI_API"
            />
          </label>

          <label className={labelCls}>
            Tên nền tảng
            <input name="name" required className={fieldCls} placeholder="vd: OpenAI API (dịch vụ mô hình ngoài Viện)" />
          </label>

          <label className={labelCls}>
            Bộ chuyển đổi (adapter)
            <select name="adapterType" required className={fieldCls} defaultValue="">
              <option value="" disabled>
                — Chọn bộ chuyển đổi —
              </option>
              {adapterTypes.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
            <span className="text-xs font-normal text-ink-3">
              Quyết định cách gọi API thật của nền tảng. Chưa có bộ chuyển đổi riêng thì chọn PlaceholderPlatformAdapter — bản ghi vẫn đăng ký được nhưng
              mọi lời gọi trả NOT_INTEGRATED.
            </span>
          </label>

          <label className={labelCls}>
            Môi trường
            <select name="environment" className={fieldCls} defaultValue="INTERNAL">
              {ENVIRONMENTS.map(([v, label]) => (
                <option key={v} value={v}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className={labelCls}>
            Địa chỉ API (apiBaseUrl)
            <input name="apiBaseUrl" type="url" className={fieldCls} placeholder="https://…" />
            <span className="text-xs font-normal text-ink-3">
              Nguồn sự thật duy nhất cho endpoint của nền tảng — bộ chuyển đổi và vòng dò sức khoẻ đều đọc ở đây. Bỏ trống thì mọi lời gọi trả
              NO_API_BASE_URL.
            </span>
          </label>

          <label className={labelCls}>
            Trang thông tin (baseUrl)
            <input name="baseUrl" type="url" className={fieldCls} placeholder="tùy chọn — trang quản trị/tài liệu của nhà cung cấp" />
          </label>

          <label className={`${labelCls} sm:col-span-2`}>
            Chủ sở hữu
            <input name="owner" className={fieldCls} placeholder="Người chịu trách nhiệm vận hành nền tảng này" />
          </label>
        </div>

        <p className="rounded-lg border border-warn/30 bg-warn-soft px-3 py-2 text-xs text-warn">
          Bản ghi mới luôn ở trạng thái <strong>Nháp</strong> và ranh giới dữ liệu siết nhất (chỉ được gửi tài liệu mức Công khai). Muốn vận hành thì đi
          hết vòng Gửi soát xét → Phê duyệt → Đưa vào vận hành; muốn nới ranh giới dữ liệu phải qua quản trị an ninh AI kèm số hồ sơ ETV.P.F29.02 (ETV.P29 §5.5).
        </p>

        {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}
        {done && <p className="rounded-lg border border-good/30 bg-good-soft px-3 py-2 text-sm text-good">{done}</p>}

        <button
          type="submit"
          disabled={isPending}
          className="cursor-pointer self-start rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Đang lưu…" : "Đăng ký nền tảng"}
        </button>
      </form>
    </details>
  );
}
