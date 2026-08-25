"use client";

// Đăng ký một công cụ (Tool) mới — tức là mở thêm một endpoint mà Agent được phép gọi qua Tool
// Gateway. Ràng buộc "EXECUTE bắt buộc có chốt người" dưới đây là BẢN GƯƠNG của
// rules.ts#validateTool để chặn ngay trên giao diện; server vẫn là nơi quyết định (cùng cách
// M10 mirror rules sang webapp).
//
// Đăng ký xong công cụ vẫn chưa gọi được: Tool Gateway còn đòi công cụ nằm trong whitelist
// toolIds của Agent và Agent có hồ sơ AIA đã phê duyệt.

import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { createTool } from "@/lib/m29/actions";
import { PERMISSION_LEVEL_LABEL } from "@/lib/m29/labels";
import type { AIPermissionLevel } from "@/generated/prisma/enums";

const fieldCls = "rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const labelCls = "flex flex-col gap-1.5 text-sm font-medium text-ink";

const HTTP_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];
const RISK_LEVELS: [string, string][] = [
  ["LOW", "LOW — Thấp"],
  ["MEDIUM", "MEDIUM — Trung bình"],
  ["HIGH", "HIGH — Cao"],
];

export function NewToolForm({
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
  const [permissionLevel, setPermissionLevel] = useState<AIPermissionLevel>("READ");
  const [requireConfirmation, setRequireConfirmation] = useState(false);
  const [requireApproval, setRequireApproval] = useState(false);

  const thieuChotNguoi = permissionLevel === "EXECUTE" && !requireConfirmation && !requireApproval;

  return (
    <details className="mb-3 rounded-xl border border-border bg-surface">
      <summary className="cursor-pointer list-none px-4 py-2.5 text-sm font-semibold text-ink marker:content-none">+ Đăng ký công cụ mới</summary>

      <form
        ref={formRef}
        className="flex flex-col gap-4 border-t border-border p-4"
        action={(formData: FormData) => {
          setError(null);
          setDone(null);
          const code = String(formData.get("code") ?? "").trim();
          if (existingCodes.some((c) => c.toLowerCase() === code.toLowerCase())) {
            setError(`Mã "${code}" đã có trong danh mục — mỗi công cụ một mã duy nhất.`);
            return;
          }
          startTransition(async () => {
            try {
              await createTool({
                platformId: String(formData.get("platformId") ?? ""),
                code,
                name: String(formData.get("name") ?? "").trim(),
                endpoint: String(formData.get("endpoint") ?? "").trim(),
                httpMethod: String(formData.get("httpMethod") ?? "GET"),
                permissionLevel,
                riskLevel: String(formData.get("riskLevel") ?? "LOW"),
                requireConfirmation,
                requireApproval,
              });
              formRef.current?.reset();
              setPermissionLevel("READ");
              setRequireConfirmation(false);
              setRequireApproval(false);
              setDone(`Đã đăng ký công cụ "${code}" ở trạng thái Hoạt động.`);
              router.refresh();
            } catch (e) {
              setError(e instanceof Error ? e.message : "Có lỗi xảy ra.");
            }
          });
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelCls}>
            Nền tảng phơi công cụ
            <select name="platformId" required className={fieldCls} defaultValue="">
              <option value="" disabled>
                — Chọn nền tảng —
              </option>
              {platforms.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.code} — {p.name}
                </option>
              ))}
            </select>
            <span className="text-xs font-normal text-ink-3">Địa chỉ API lấy từ nền tảng; ô Đường dẫn bên dưới chỉ ghi phần nối thêm.</span>
          </label>

          <label className={labelCls}>
            Mã công cụ
            <input
              name="code"
              required
              pattern="[A-Za-z0-9_.\-]+"
              title="Chỉ dùng chữ, số, dấu gạch dưới, gạch ngang hoặc chấm — không dấu cách."
              className={`${fieldCls} font-mono`}
              placeholder="vd: M10_KpiSummary"
            />
          </label>

          <label className={labelCls}>
            Tên công cụ
            <input name="name" required className={fieldCls} placeholder="vd: Xem KPI đảm bảo hiệu lực (M10)" />
          </label>

          <label className={labelCls}>
            Đường dẫn (endpoint)
            <input
              name="endpoint"
              required
              pattern="/\S*"
              title="Bắt đầu bằng dấu / và không chứa dấu cách."
              className={`${fieldCls} font-mono`}
              placeholder="/api/kpi/summary"
            />
          </label>

          <label className={labelCls}>
            Phương thức HTTP
            <select name="httpMethod" className={fieldCls} defaultValue="GET">
              {HTTP_METHODS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
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

          <label className={`${labelCls} sm:col-span-2`}>
            Quyền tối thiểu để gọi
            <select
              name="permissionLevel"
              className={fieldCls}
              value={permissionLevel}
              onChange={(e) => setPermissionLevel(e.target.value as AIPermissionLevel)}
            >
              {Object.entries(PERMISSION_LEVEL_LABEL).map(([k, v]) => (
                <option key={k} value={k}>
                  {k} — {v}
                </option>
              ))}
            </select>
            <span className="text-xs font-normal text-ink-3">
              Tool Gateway chặn người dùng có vai trò thấp hơn mức này: Đọc → AI_VIEWER, Tính toán → AI_OPERATOR, Đề xuất/Thực thi → AI_ADMIN.
            </span>
          </label>
        </div>

        <div className="flex flex-col gap-2 rounded-lg border border-border bg-bg p-3">
          <label className="flex items-start gap-2 text-sm text-ink">
            <input type="checkbox" name="requireConfirmation" className="mt-0.5" checked={requireConfirmation} onChange={(e) => setRequireConfirmation(e.target.checked)} />
            <span>
              Bắt buộc người dùng xác nhận trước khi gọi
              <span className="block text-xs text-ink-3">Người vận hành phải bấm xác nhận cho từng lần gọi.</span>
            </span>
          </label>
          <label className="flex items-start gap-2 text-sm text-ink">
            <input type="checkbox" name="requireApproval" className="mt-0.5" checked={requireApproval} onChange={(e) => setRequireApproval(e.target.checked)} />
            <span>
              Bắt buộc phê duyệt của người có thẩm quyền
              <span className="block text-xs text-ink-3">Dùng cho công cụ ghi/thay đổi dữ liệu nghiệp vụ.</span>
            </span>
          </label>
        </div>

        {thieuChotNguoi && (
          <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-xs text-crit">
            Công cụ mức <strong>Thực thi</strong> bắt buộc có ít nhất một chốt người: xác nhận hoặc phê duyệt. AI không được tự thực thi một hành động
            nghiệp vụ mà không có người trong vòng lặp.
          </p>
        )}

        {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}
        {done && <p className="rounded-lg border border-good/30 bg-good-soft px-3 py-2 text-sm text-good">{done}</p>}

        <button
          type="submit"
          disabled={isPending || thieuChotNguoi}
          className="cursor-pointer self-start rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Đang lưu…" : "Đăng ký công cụ"}
        </button>
      </form>
    </details>
  );
}
