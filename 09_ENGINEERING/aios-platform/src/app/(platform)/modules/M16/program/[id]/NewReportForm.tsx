"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createAuditReport } from "@/lib/m16/actions";

const inputCls =
  "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const btn =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";

export function NewReportForm({ programId }: { programId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [openingMeetingNotes, setOpeningMeetingNotes] = useState("");
  const [closingMeetingDate, setClosingMeetingDate] = useState("");
  const [closingConclusion, setClosingConclusion] = useState("");

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-3">
      <p className="text-xs font-medium text-ink">Tạo báo cáo tổng hợp (chỉ Trưởng đoàn đánh giá)</p>
      <textarea placeholder="Ghi chú họp khai mạc" value={openingMeetingNotes} onChange={(e) => setOpeningMeetingNotes(e.target.value)} rows={2} className={inputCls} />
      <label className="flex flex-col gap-1 text-xs text-ink-2">
        Ngày họp kết thúc
        <input type="date" value={closingMeetingDate} onChange={(e) => setClosingMeetingDate(e.target.value)} className={inputCls} />
      </label>
      <textarea
        placeholder="Kết luận của trưởng đoàn"
        value={closingConclusion}
        onChange={(e) => setClosingConclusion(e.target.value)}
        rows={2}
        className={inputCls}
      />
      {error && <p className="text-xs text-crit">{error}</p>}
      <button
        className={btn}
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            setError(null);
            const r = await createAuditReport({ programId, openingMeetingNotes: openingMeetingNotes || undefined, closingMeetingDate, closingConclusion });
            if ("id" in r) router.refresh();
            else setError(r.message);
          })
        }
      >
        {isPending ? "Đang lưu…" : "Đệ trình báo cáo"}
      </button>
    </div>
  );
}
