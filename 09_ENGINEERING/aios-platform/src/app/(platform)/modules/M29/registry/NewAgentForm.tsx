"use client";

// Đăng ký một HỆ THỐNG AI vào danh mục — bước 1 của ETV.P29 mục 5.1.6, tức một dòng của phần 1
// biểu mẫu ETV.P.F 29.01.
//
// Đây là biểu mẫu duy nhất trên trang này KHÔNG đưa bản ghi vào hoạt động ngay: hệ thống AI ra
// đời ở trạng thái Nháp và phải đi hết vòng soát xét — phê duyệt của mục 6.1. Provider/Model/Tool
// đăng ký xong là dùng được; hệ thống AI thì không.
//
// Hai ràng buộc dưới đây là BẢN GƯƠNG của rules.ts#validateDangKyHeThongAI, chặn sớm cho người
// nhập đỡ mất một vòng máy chủ — server vẫn là nơi quyết định (cùng cách NewToolForm làm gương
// cho validateTool).
//
// Kỹ năng và công cụ KHÔNG có trong biểu mẫu này: gán ở trang chi tiết tác tử, vì nâng mức quyền
// công cụ là thay đổi lớn kéo theo tạm dừng tác tử và rà soát lại AIA (kiemTraGanCongCu).

import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { createAgent } from "@/lib/m29/actions";
import { ACQUISITION_LABEL, REVIEW_CYCLE_LABEL, RISK_LEVEL_LABEL, SYSTEM_GROUP_LABEL } from "@/lib/m29/labels";
import type { AIAcquisitionType, AIReviewCycle, AISystemGroup } from "@/generated/prisma/enums";

const fieldCls = "rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const labelCls = "flex flex-col gap-1.5 text-sm font-medium text-ink";

// Mức tác động của hệ thống AI — ETV.P29 mục 5.1.3. Cùng ba mã với riskLevel của Skill/Tool nhưng
// KHÁC ý nghĩa: ở đây là mức tác động quyết định kiểm soát bắt buộc, không phải mức rủi ro kỹ
// thuật của một endpoint.
const RISK_LEVELS = ["LOW", "MEDIUM", "HIGH"] as const;

export function NewAgentForm({
  platforms,
  models,
  existingCodes,
}: {
  platforms: { id: string; code: string; name: string }[];
  models: { id: string; modelId: string; providerName: string }[];
  existingCodes: string[];
}) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);
  const [riskLevel, setRiskLevel] = useState<string>("MEDIUM");
  const [personalData, setPersonalData] = useState(false);
  const [reviewCycle, setReviewCycle] = useState<AIReviewCycle>("ONE_YEAR");

  // Gương của R-F29-1 và R-F29-2 (rules.ts). Giữ nguyên chữ nghĩa dẫn mục để người nhập đọc trên
  // giao diện đúng câu mà máy chủ sẽ trả nếu vẫn cố gửi.
  const loiDuLieuCaNhan = personalData && riskLevel !== "HIGH" ? "Có xử lý dữ liệu cá nhân thì mức tác động bắt buộc là Cao (ETV.P29 mục 5.1.3)." : null;
  const loiChuKy =
    riskLevel === "HIGH" && reviewCycle !== "SIX_MONTHS"
      ? "Mức tác động Cao bắt buộc rà soát ≤ 06 tháng (ETV.P29 mục 5.1.3)."
      : riskLevel === "MEDIUM" && reviewCycle === "BY_EVENT"
        ? "Mức tác động Trung bình bắt buộc rà soát ≤ 01 năm (ETV.P29 mục 5.1.3)."
        : null;
  const canTro = loiDuLieuCaNhan ?? loiChuKy;

  return (
    <details className="mb-3 rounded-xl border border-border bg-surface">
      <summary className="cursor-pointer list-none px-4 py-2.5 text-sm font-semibold text-accent marker:content-none">+ Đăng ký hệ thống AI mới</summary>

      <form
        ref={formRef}
        className="flex flex-col gap-4 border-t border-border p-4"
        action={(formData: FormData) => {
          setError(null);
          setDone(null);
          const code = String(formData.get("code") ?? "").trim();
          if (existingCodes.some((c) => c.toLowerCase() === code.toLowerCase())) {
            setError(`Mã "${code}" đã có trong danh mục — mỗi hệ thống AI một mã duy nhất.`);
            return;
          }
          const modelId = String(formData.get("modelId") ?? "");
          startTransition(async () => {
            const r = await createAgent({
              platformId: String(formData.get("platformId") ?? ""),
              code,
              name: String(formData.get("name") ?? "").trim(),
              purpose: String(formData.get("purpose") ?? "").trim(),
              modelId: modelId || undefined,
              riskLevel,
              owner: String(formData.get("owner") ?? "").trim(),
              systemGroup: String(formData.get("systemGroup") ?? "EMBEDDED_AGENT") as AISystemGroup,
              acquisition: String(formData.get("acquisition") ?? "SELF_DEVELOPED") as AIAcquisitionType,
              technicalContact: String(formData.get("technicalContact") ?? "").trim(),
              personalData,
              reviewCycle,
            });
            if (!r.ok) {
              setError(r.message);
              return;
            }
            formRef.current?.reset();
            setRiskLevel("MEDIUM");
            setPersonalData(false);
            setReviewCycle("ONE_YEAR");
            setDone(`Đã đăng ký hệ thống AI "${code}" ở trạng thái Nháp — gửi soát xét để trình phê duyệt.`);
            router.refresh();
          });
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelCls}>
            Nền tảng vận hành (mã ETV.MP35)
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
            <span className="text-xs font-normal text-ink-3">
              Chỉ liệt kê nền tảng đã đăng ký và đang hiệu lực tại ETV.MP35 (mục 5.1.1) — nền tảng đang Nháp hay Chờ phê duyệt không nhận được hệ thống AI.
            </span>
          </label>

          <label className={labelCls}>
            Mã hệ thống AI
            <input
              name="code"
              required
              pattern="[A-Za-z0-9_.\-]+"
              title="Chỉ dùng chữ, số, dấu gạch dưới, gạch ngang hoặc chấm — không dấu cách."
              className={`${fieldCls} font-mono`}
              placeholder="vd: AGENT_SOAT_HOSO"
            />
          </label>

          <label className={labelCls}>
            Tên hệ thống AI
            <input name="name" required className={fieldCls} placeholder="vd: Trợ lý soát hồ sơ kỹ thuật" />
          </label>

          <label className={labelCls}>
            Nhóm hệ thống AI
            <select name="systemGroup" className={fieldCls} defaultValue="EMBEDDED_AGENT">
              {Object.entries(SYSTEM_GROUP_LABEL).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </label>

          <label className={`${labelCls} sm:col-span-2`}>
            Mục đích sử dụng
            <textarea
              name="purpose"
              required
              rows={2}
              className={fieldCls}
              placeholder="vd: Soát tính đầy đủ của hồ sơ kỹ thuật, sinh bản nháp danh sách thiếu — không tự kết luận"
            />
          </label>

          <label className={labelCls}>
            Mô hình sử dụng
            <select name="modelId" className={fieldCls} defaultValue="">
              <option value="">— Chưa gắn mô hình —</option>
              {models.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.modelId} — {m.providerName}
                </option>
              ))}
            </select>
          </label>

          <label className={labelCls}>
            Hình thức
            <select name="acquisition" className={fieldCls} defaultValue="SELF_DEVELOPED">
              {Object.entries(ACQUISITION_LABEL).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </label>

          <label className={labelCls}>
            Chủ sở hữu (CSH)
            <input name="owner" required className={fieldCls} placeholder="vd: Phòng Kỹ thuật" />
          </label>

          <label className={labelCls}>
            Đầu mối kỹ thuật (ĐMKT)
            <input name="technicalContact" required className={fieldCls} placeholder="vd: Nguyễn Văn A — Tổ CNTT" />
          </label>

          <label className={labelCls}>
            Mức tác động
            <select name="riskLevel" className={fieldCls} value={riskLevel} onChange={(e) => setRiskLevel(e.target.value)}>
              {RISK_LEVELS.map((v) => (
                <option key={v} value={v}>
                  {RISK_LEVEL_LABEL[v]}
                </option>
              ))}
            </select>
            <span className="text-xs font-normal text-ink-3">
              Trung bình và Cao bắt buộc có hồ sơ AIA đã phê duyệt mới vận hành được (mục 5.1.3, 5.2.3).
            </span>
          </label>

          <label className={labelCls}>
            Chu kỳ rà soát
            <select name="reviewCycle" className={fieldCls} value={reviewCycle} onChange={(e) => setReviewCycle(e.target.value as AIReviewCycle)}>
              {Object.entries(REVIEW_CYCLE_LABEL).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex flex-col gap-2 rounded-lg border border-border bg-bg p-3">
          <label className="flex items-start gap-2 text-sm text-ink">
            <input type="checkbox" name="personalData" className="mt-0.5" checked={personalData} onChange={(e) => setPersonalData(e.target.checked)} />
            <span>
              Có xử lý dữ liệu cá nhân
              <span className="block text-xs text-ink-3">
                Kéo theo mức tác động Cao và toàn bộ kiểm soát của mức đó. Dữ liệu mức Hạn chế và Mật thì không bao giờ được cấp cho AI (mục 5.5).
              </span>
            </span>
          </label>
        </div>

        {canTro && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-xs text-crit">{canTro}</p>}
        {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}
        {done && <p className="rounded-lg border border-good/30 bg-good-soft px-3 py-2 text-sm text-good">{done}</p>}

        <button
          type="submit"
          disabled={isPending || canTro !== null}
          className="cursor-pointer self-start rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Đang lưu…" : "Đăng ký hệ thống AI"}
        </button>
      </form>
    </details>
  );
}
