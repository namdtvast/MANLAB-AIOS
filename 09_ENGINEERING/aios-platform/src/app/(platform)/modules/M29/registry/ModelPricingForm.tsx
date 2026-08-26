"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { updateModelPricing } from "@/lib/m29/actions";

const fieldCls = "rounded-lg border border-border bg-bg px-3 py-2 text-sm tabular-nums text-ink outline-none transition-colors focus:border-accent-line";

export function ModelPricingForm({
  model,
}: {
  model: { id: string; name: string; inputRate: number; outputRate: number; currency: string };
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ tone: "good" | "crit"; text: string } | null>(null);

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="min-h-11 cursor-pointer rounded-md border border-border-strong px-3 py-2 text-xs font-medium text-ink transition-colors hover:bg-sunk"
        aria-expanded={open}
      >
        {open ? "Đóng bảng giá" : "Cập nhật bảng giá"}
      </button>
      {open && (
        <form
          className="mt-3 grid gap-3 rounded-lg border border-border bg-bg p-3 sm:grid-cols-3"
          action={(formData) => {
            setMessage(null);
            startTransition(async () => {
              try {
                await updateModelPricing({
                  modelId: model.id,
                  inputCostPerMillionTokens: Number(formData.get("inputRate")),
                  outputCostPerMillionTokens: Number(formData.get("outputRate")),
                  currency: String(formData.get("currency") || "USD"),
                });
                setMessage({ tone: "good", text: "Đã cập nhật. Lượt gọi mới sẽ chụp đơn giá này vào Trace." });
                router.refresh();
              } catch (e) {
                setMessage({ tone: "crit", text: e instanceof Error ? e.message : "Không cập nhật được bảng giá." });
              }
            });
          }}
        >
          <label className="flex flex-col gap-1 text-xs font-medium text-ink">
            Token vào / 1 triệu
            <input name="inputRate" type="number" min="0" step="0.000001" required defaultValue={model.inputRate} className={fieldCls} />
          </label>
          <label className="flex flex-col gap-1 text-xs font-medium text-ink">
            Token ra / 1 triệu
            <input name="outputRate" type="number" min="0" step="0.000001" required defaultValue={model.outputRate} className={fieldCls} />
          </label>
          <label className="flex flex-col gap-1 text-xs font-medium text-ink">
            Tiền tệ
            <select name="currency" required defaultValue={model.currency} className={fieldCls}>
              <option value="USD">USD — Đô la Mỹ</option>
            </select>
          </label>
          <p className="text-xs leading-5 text-ink-3 sm:col-span-3">
            Nhập theo bảng giá chính thức của nhà cung cấp. Giá không tự động lấy từ Internet; mọi thay đổi được ghi Audit Log.
          </p>
          {message && (
            <p className={`text-xs sm:col-span-3 ${message.tone === "good" ? "text-good" : "text-crit"}`} role="status">
              {message.text}
            </p>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="min-h-11 cursor-pointer justify-self-start rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-3"
          >
            {isPending ? "Đang lưu…" : "Lưu bảng giá"}
          </button>
        </form>
      )}
    </div>
  );
}
