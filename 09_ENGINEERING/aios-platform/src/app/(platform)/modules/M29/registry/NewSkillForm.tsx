"use client";

// Đăng ký một kỹ năng (AISkill) vào danh mục.
//
// Cùng khoảng trống với NewProviderForm/NewToolForm: `createSkill()` có sẵn từ đầu nhưng không
// màn hình nào gọi, nên kỹ năng chỉ sinh ra được bằng seed. Hệ quả thấy rõ ở trang tác tử —
// danh mục có đúng một kỹ năng của trợ lý M10, gán cho tác tử nào khác cũng là ghi sai sổ.
//
// Kỹ năng KHÔNG cấp quyền hành động cho tác tử (thứ đó là whitelist công cụ), nên đăng ký kỹ
// năng không đi qua vòng đời phê duyệt như nền tảng — chỉ ghi nhật ký theo ETV.P29 mục 5.4.1.

import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { createSkill } from "@/lib/m29/actions";

const fieldCls = "rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const labelCls = "flex flex-col gap-1.5 text-sm font-medium text-ink";

const RISK_LEVELS: [string, string][] = [
  ["LOW", "LOW — Thấp"],
  ["MEDIUM", "MEDIUM — Trung bình"],
  ["HIGH", "HIGH — Cao"],
];

export function NewSkillForm({ platforms, existingCodes }: { platforms: { id: string; code: string; name: string }[]; existingCodes: string[] }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  return (
    <details className="mb-3 rounded-xl border border-border bg-surface">
      <summary className="cursor-pointer list-none px-4 py-2.5 text-sm font-semibold text-ink marker:content-none">+ Đăng ký kỹ năng mới</summary>

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
              await createSkill({
                code,
                name: String(formData.get("name") ?? "").trim(),
                platformScope: String(formData.get("platformScope") ?? "").trim() || undefined,
                riskLevel: String(formData.get("riskLevel") ?? "LOW"),
              });
              formRef.current?.reset();
              setDone(`Đã đăng ký kỹ năng "${code}". Gán cho tác tử ở trang chi tiết tác tử.`);
              router.refresh();
            } catch (e) {
              setError(e instanceof Error ? e.message : "Có lỗi xảy ra.");
            }
          });
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelCls}>
            Mã kỹ năng
            <input
              name="code"
              required
              pattern="[A-Za-z0-9_.\-]+"
              title="Chỉ dùng chữ, số, dấu gạch dưới, gạch ngang hoặc chấm — không dấu cách."
              className={`${fieldCls} font-mono`}
              placeholder="vd: TraCuuTaiLieu"
            />
          </label>

          <label className={labelCls}>
            Tên kỹ năng
            <input name="name" required className={fieldCls} placeholder="vd: Tra cứu thủ tục, tiêu chuẩn, biểu mẫu đã ban hành" />
          </label>

          <label className={labelCls}>
            Phạm vi nền tảng
            <select name="platformScope" className={fieldCls} defaultValue="">
              <option value="">— Dùng chung, không giới hạn nền tảng —</option>
              {platforms.map((p) => (
                <option key={p.id} value={p.code}>
                  {p.code} — {p.name}
                </option>
              ))}
            </select>
            <span className="text-xs font-normal text-ink-3">
              Ghi phạm vi để đọc sổ biết kỹ năng này nói về việc trên nền tảng nào — không phải một chốt kiểm soát: thứ giới hạn tác tử làm được gì là
              whitelist công cụ (ETV.P29 mục 1.3 nguyên tắc 3).
            </span>
          </label>

          <label className={labelCls}>
            Mức rủi ro
            <select name="riskLevel" className={fieldCls} defaultValue="LOW">
              {RISK_LEVELS.map(([v, label]) => (
                <option key={v} value={v}>
                  {label}
                </option>
              ))}
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
          {isPending ? "Đang lưu…" : "Đăng ký kỹ năng"}
        </button>
      </form>
    </details>
  );
}
