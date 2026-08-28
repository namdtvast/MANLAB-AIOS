"use client";

// Đăng ký một nhà cung cấp mô hình (AIProvider) vào danh mục.
//
// Trước đây Provider và Model chỉ sinh ra được bằng seed hoặc bằng tay trên cơ sở dữ liệu, nên
// người vận hành đăng ký xong nền tảng thì đứng lại: không có đường nào nối nền tảng đó tới một
// model dùng thật. Hai form này chỉ mở đúng khoảng trống ấy, không đổi vòng đời phê duyệt.

import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { createProvider } from "@/lib/m29/actions";

const fieldCls = "rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const labelCls = "flex flex-col gap-1.5 text-sm font-medium text-ink";

export function NewProviderForm({
  platforms,
  existingCodes,
}: {
  platforms: { id: string; code: string; name: string }[];
  existingCodes: string[];
}) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  return (
    <details className="mb-3 rounded-xl border border-border bg-surface">
      <summary className="cursor-pointer list-none px-4 py-2.5 text-sm font-semibold text-ink marker:content-none">+ Thêm nhà cung cấp</summary>

      <form
        ref={formRef}
        className="flex flex-col gap-4 border-t border-border p-4"
        action={(formData: FormData) => {
          setError(null);
          setDone(null);
          const code = String(formData.get("code") ?? "").trim();
          if (existingCodes.some((c) => c.toLowerCase() === code.toLowerCase())) {
            setError(`Mã "${code}" đã có trong danh mục.`);
            return;
          }
          startTransition(async () => {
            try {
              await createProvider({
                code,
                name: String(formData.get("name") ?? "").trim(),
                platformId: String(formData.get("platformId") ?? "") || undefined,
              });
              formRef.current?.reset();
              setDone(`Đã thêm nhà cung cấp "${code}".`);
              router.refresh();
            } catch (e) {
              setError(e instanceof Error ? e.message : "Có lỗi xảy ra.");
            }
          });
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelCls}>
            Mã nhà cung cấp
            <input
              name="code"
              required
              pattern="[A-Za-z0-9_.\-]+"
              title="Chỉ dùng chữ, số, dấu gạch dưới, gạch ngang hoặc chấm — không dấu cách."
              className={`${fieldCls} font-mono`}
              placeholder="vd: MANLAB_LOCAL"
            />
          </label>

          <label className={labelCls}>
            Tên nhà cung cấp
            <input name="name" required className={fieldCls} placeholder="vd: ManLab Local AI (RTX 3090, tự vận hành)" />
          </label>

          <label className={`${labelCls} sm:col-span-2`}>
            Nền tảng phơi API
            <select name="platformId" className={fieldCls} defaultValue="">
              <option value="">— Không gắn (dịch vụ mô hình ngoài Viện) —</option>
              {platforms.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.code} — {p.name}
                </option>
              ))}
            </select>
            <span className="text-xs font-normal text-ink-3">
              Bắt buộc với nhà cung cấp TỰ VẬN HÀNH (máy chủ GPU nội bộ): địa chỉ API và trạng thái kiểm tra sức khoẻ chỉ nằm ở bản ghi nền tảng
              (ETV.GAI 01 §3.6). Dịch vụ ngoài Viện để trống là bình thường.
            </span>
          </label>
        </div>

        {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}
        {done && <p className="rounded-lg border border-good/30 bg-good-soft px-3 py-2 text-sm text-good">{done}</p>}

        <button
          type="submit"
          disabled={isPending}
          className="cursor-pointer self-start rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Đang lưu…" : "Thêm nhà cung cấp"}
        </button>
      </form>
    </details>
  );
}
