"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createComplaint } from "@/lib/m12/actions";
import { CHANNEL_LABEL } from "@/lib/m12/labels";
import type { M12Channel } from "@/generated/prisma/enums";

const CHANNELS = Object.keys(CHANNEL_LABEL) as M12Channel[];

const fieldCls =
  "rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const labelCls = "flex flex-col gap-1.5 text-sm font-medium text-ink";

export function NewComplaintForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [channel, setChannel] = useState<M12Channel>("TRUC_TIEP");
  const [resolvedOnSpot, setResolvedOnSpot] = useState(false);
  const [customerSatisfiedOnSpot, setCustomerSatisfiedOnSpot] = useState(false);
  const [isComplex, setIsComplex] = useState(false);

  return (
    <form
      className="flex max-w-lg flex-col gap-4 rounded-xl border border-border bg-surface p-5"
      action={(formData: FormData) => {
        setError(null);
        startTransition(async () => {
          try {
            const created = await createComplaint({
              channel,
              content: String(formData.get("content") ?? ""),
              relatedCertificateRef: String(formData.get("relatedCertificateRef") ?? "") || undefined,
              resolvedOnSpot,
              customerSatisfiedOnSpot: resolvedOnSpot ? customerSatisfiedOnSpot : undefined,
              isComplex,
            });
            router.push(`/modules/M12/complaint/${created.id}`);
          } catch (e) {
            setError(e instanceof Error ? e.message : "Có lỗi xảy ra.");
          }
        });
      }}
    >
      <label className={labelCls}>
        Kênh tiếp nhận
        <select value={channel} onChange={(e) => setChannel(e.target.value as M12Channel)} className={fieldCls}>
          {CHANNELS.map((c) => (
            <option key={c} value={c}>
              {CHANNEL_LABEL[c]}
            </option>
          ))}
        </select>
      </label>
      <label className={labelCls}>
        Nội dung khiếu nại
        <textarea name="content" required rows={4} className={fieldCls} />
      </label>
      <label className={labelCls}>
        Liên quan sai sót GCN (nếu có, → M11)
        <input name="relatedCertificateRef" placeholder="Số hiệu GCN (không bắt buộc)" className={fieldCls} />
      </label>

      <label className="flex items-center gap-2 text-sm text-ink-2">
        <input type="checkbox" checked={resolvedOnSpot} onChange={(e) => setResolvedOnSpot(e.target.checked)} />
        Đã giải thích được ngay tại chỗ
      </label>
      {resolvedOnSpot && (
        <label className="ml-6 flex items-center gap-2 text-sm text-ink-2">
          <input type="checkbox" checked={customerSatisfiedOnSpot} onChange={(e) => setCustomerSatisfiedOnSpot(e.target.checked)} />
          Khách hàng hài lòng với giải thích tại chỗ
        </label>
      )}
      <label className="flex items-center gap-2 text-sm text-ink-2">
        <input type="checkbox" checked={isComplex} onChange={(e) => setIsComplex(e.target.checked)} />
        Phức tạp / ảnh hưởng lớn / có dấu hiệu sai sót hệ thống
      </label>

      {resolvedOnSpot && customerSatisfiedOnSpot ? (
        <p className="rounded-lg border border-good/30 bg-good-soft px-3 py-2 text-xs text-good">
          Đã giải thích ngay và khách hài lòng → hồ sơ sẽ tự động đóng ngay, không cần văn bản khiếu nại chính thức
          (quy tắc 2 ETV.P12).
        </p>
      ) : (
        <p className="rounded-lg border border-warn/30 bg-warn-soft px-3 py-2 text-xs text-warn">
          Không giải thích được ngay hoặc khách chưa hài lòng → bắt buộc khởi tạo văn bản khiếu nại chính thức
          (F14.03) trước khi LĐV phân công xử lý (quy tắc 1-2 ETV.P12).
        </p>
      )}

      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="cursor-pointer rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Đang lưu…" : "Tiếp nhận khiếu nại"}
      </button>
    </form>
  );
}
