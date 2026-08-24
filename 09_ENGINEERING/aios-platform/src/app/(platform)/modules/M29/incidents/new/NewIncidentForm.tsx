"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createIncident } from "@/lib/m29/actions";
import type { AIIncidentKind, AIIncidentSeverity } from "@/generated/prisma/enums";
import { INCIDENT_KIND_LABEL, INCIDENT_SEVERITY_LABEL } from "@/lib/m29/labels";

const fieldCls = "rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const labelCls = "flex flex-col gap-1.5 text-sm font-medium text-ink";

export function NewIncidentForm({ agents }: { agents: { id: string; code: string; name: string }[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [severity, setSeverity] = useState<AIIncidentSeverity>("MINOR");

  return (
    <form
      className="flex max-w-2xl flex-col gap-4 rounded-xl border border-border bg-surface p-5"
      action={(formData: FormData) => {
        setError(null);
        startTransition(async () => {
          try {
            const created = await createIncident({
              severity: formData.get("severity") as AIIncidentSeverity,
              kind: formData.get("kind") as AIIncidentKind,
              agentId: String(formData.get("agentId") ?? "") || undefined,
              traceId: String(formData.get("traceId") ?? "") || undefined,
              description: String(formData.get("description") ?? ""),
              containmentAction: String(formData.get("containmentAction") ?? ""),
              affectsIssuedResult: formData.get("affectsIssuedResult") === "on",
              sensitiveDataExposed: formData.get("sensitiveDataExposed") === "on",
            });
            router.push(`/modules/M29/incidents/${created.id}`);
          } catch (e) {
            setError(e instanceof Error ? e.message : "Có lỗi xảy ra.");
          }
        });
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelCls}>
          Mức độ
          <select name="severity" className={fieldCls} value={severity} onChange={(e) => setSeverity(e.target.value as AIIncidentSeverity)}>
            {Object.entries(INCIDENT_SEVERITY_LABEL).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </label>

        <label className={labelCls}>
          Loại sự cố
          <select name="kind" className={fieldCls} defaultValue="WRONG_OUTPUT">
            {Object.entries(INCIDENT_KIND_LABEL).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </label>

        <label className={labelCls}>
          Tác tử liên quan
          <select name="agentId" className={fieldCls} defaultValue="">
            <option value="">— Không gắn tác tử (AI chưa đăng ký) —</option>
            {agents.map((a) => (
              <option key={a.id} value={a.id}>
                {a.code} — {a.name}
              </option>
            ))}
          </select>
        </label>

        <label className={labelCls}>
          Mã nhật ký suy luận (Trace)
          <input name="traceId" className={fieldCls} placeholder="tùy chọn" />
        </label>
      </div>

      {severity === "SEVERE" && (
        <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-xs text-crit">
          Sự cố mức Nghiêm trọng: tác tử được chọn sẽ bị <strong>tạm dừng ngay</strong> khi lưu phiếu (khống chế trước — ETV.P29 mục 5.7.3), và
          chỉ Lãnh đạo Viện mới được kết luận, đóng phiếu.
        </p>
      )}

      <label className={labelCls}>
        Diễn biến sự việc
        <textarea name="description" required rows={4} className={fieldCls} placeholder="Mô tả điều đã xảy ra, phát hiện thế nào…" />
      </label>

      <label className={labelCls}>
        Biện pháp khống chế đã thực hiện
        <textarea name="containmentAction" rows={2} className={fieldCls} placeholder="vd: đã tạm dừng tác tử, vô hiệu hóa công cụ, gỡ nguồn dữ liệu khỏi chỉ mục AI…" />
      </label>

      <div className="flex flex-col gap-2 rounded-lg border border-border bg-bg p-3">
        <label className="flex items-start gap-2 text-sm text-ink">
          <input type="checkbox" name="affectsIssuedResult" className="mt-0.5" />
          <span>
            Ảnh hưởng tới kết quả đo hoặc chứng chỉ <strong>đã phát hành</strong>
            <span className="block text-xs text-ink-3">Khi đóng phiếu bắt buộc ghi mã hồ sơ đã xử lý theo ETV.MP10/MP11.</span>
          </span>
        </label>
        <label className="flex items-start gap-2 text-sm text-ink">
          <input type="checkbox" name="sensitiveDataExposed" className="mt-0.5" />
          <span>
            Lộ dữ liệu mức Hạn chế/Mật hoặc dữ liệu cá nhân
            <span className="block text-xs text-ink-3">Khi đóng phiếu bắt buộc có số phiếu ETV.P.F28.03 (xử lý đồng thời theo ETV.MP28).</span>
          </span>
        </label>
      </div>

      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="cursor-pointer rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Đang lưu…" : "Lập phiếu sự cố"}
      </button>
    </form>
  );
}
