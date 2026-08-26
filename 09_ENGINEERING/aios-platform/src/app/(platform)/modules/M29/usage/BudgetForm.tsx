"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { createBudget } from "@/lib/m29/actions";

const fieldCls = "min-h-11 rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const labelCls = "flex flex-col gap-1.5 text-sm font-medium text-ink";

export function BudgetForm({ agents, existingCodes }: { agents: { id: string; code: string; name: string }[]; existingCodes: string[] }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ tone: "good" | "crit"; text: string } | null>(null);

  return (
    <details className="rounded-xl border border-border bg-surface">
      <summary className="min-h-11 cursor-pointer list-none px-4 py-3 text-sm font-semibold text-ink marker:content-none">+ Thiết lập hạn mức tháng</summary>
      <form
        ref={formRef}
        className="grid gap-4 border-t border-border p-4 sm:grid-cols-2"
        action={(formData) => {
          setMessage(null);
          const code = String(formData.get("code") || "").trim();
          if (existingCodes.some((c) => c.toLowerCase() === code.toLowerCase())) {
            setMessage({ tone: "crit", text: `Mã hạn mức "${code}" đã tồn tại.` });
            return;
          }
          startTransition(async () => {
            try {
              await createBudget({
                code,
                name: String(formData.get("name") || "").trim(),
                agentId: String(formData.get("agentId") || "") || undefined,
                monthlyLimit: Number(formData.get("monthlyLimit")),
                warningPercent: Number(formData.get("warningPercent")),
                blockAtLimit: formData.get("blockAtLimit") === "on",
                owner: String(formData.get("owner") || "").trim(),
              });
              formRef.current?.reset();
              setMessage({ tone: "good", text: "Đã tạo hạn mức và ghi Audit Log." });
              router.refresh();
            } catch (e) {
              setMessage({ tone: "crit", text: e instanceof Error ? e.message : "Không tạo được hạn mức." });
            }
          });
        }}
      >
        <label className={labelCls}>
          Mã hạn mức
          <input name="code" required pattern="[A-Za-z0-9_.\-]+" className={`${fieldCls} font-mono`} placeholder="BUDGET_M29_2026" />
        </label>
        <label className={labelCls}>
          Tên hạn mức
          <input name="name" required className={fieldCls} placeholder="Ngân sách AI toàn Viện" />
        </label>
        <label className={labelCls}>
          Phạm vi
          <select name="agentId" className={fieldCls} defaultValue="">
            <option value="">Toàn bộ M29</option>
            {agents.map((a) => <option key={a.id} value={a.id}>{a.code} — {a.name}</option>)}
          </select>
        </label>
        <label className={labelCls}>
          Hạn mức tháng (USD)
          <input name="monthlyLimit" type="number" min="0.01" step="0.01" required className={`${fieldCls} tabular-nums`} />
        </label>
        <label className={labelCls}>
          Cảnh báo khi đạt (%)
          <input name="warningPercent" type="number" min="1" max="100" defaultValue="80" required className={`${fieldCls} tabular-nums`} />
        </label>
        <label className={labelCls}>
          Chủ sở hữu ngân sách
          <input name="owner" className={fieldCls} placeholder="PT.AI hoặc đơn vị phụ trách" />
        </label>
        <label className="flex items-start gap-2 text-sm text-ink sm:col-span-2">
          <input name="blockAtLimit" type="checkbox" defaultChecked className="mt-1" />
          <span>Chặn lượt gọi mới khi đạt 100% hạn mức.<span className="block text-xs text-ink-3">Lượt đã bị chặn vẫn sinh Trace nhưng không phát sinh token tính phí.</span></span>
        </label>
        {message && <p role="status" className={`text-sm sm:col-span-2 ${message.tone === "good" ? "text-good" : "text-crit"}`}>{message.text}</p>}
        <button type="submit" disabled={isPending} className="min-h-11 cursor-pointer justify-self-start rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2">
          {isPending ? "Đang lưu…" : "Lưu hạn mức"}
        </button>
      </form>
    </details>
  );
}
