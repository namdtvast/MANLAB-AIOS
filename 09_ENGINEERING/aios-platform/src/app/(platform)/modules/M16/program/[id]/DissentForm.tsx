"use client";

// Quy tắc 3 ETV.P16 (Increment 13) — ý kiến không thống nhất được BẢO LƯU kèm báo cáo; kết luận
// của trưởng đoàn không thay đổi, không có biểu quyết đa số.
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { recordReportDissent } from "@/lib/m16/actions";

const inputCls =
  "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const btn =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";

export function DissentForm({ reportId }: { reportId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [opinionBy, setOpinionBy] = useState("");
  const [opinion, setOpinion] = useState("");

  return (
    <div className="mt-2 flex flex-col gap-2 rounded-lg border border-border bg-bg p-2">
      <p className="text-xs text-ink-2">Ghi ý kiến bảo lưu (không làm thay đổi kết luận của trưởng đoàn)</p>
      <input placeholder="Tên người nêu ý kiến" value={opinionBy} onChange={(e) => setOpinionBy(e.target.value)} className={inputCls} />
      <textarea placeholder="Nội dung ý kiến bảo lưu" value={opinion} onChange={(e) => setOpinion(e.target.value)} rows={2} className={inputCls} />
      {error && <p className="text-xs text-crit">{error}</p>}
      <button
        className={btn}
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            setError(null);
            const r = await recordReportDissent(reportId, { opinionBy, opinion });
            if (r.ok) {
              setOpinionBy("");
              setOpinion("");
              router.refresh();
            } else setError(r.message);
          })
        }
      >
        {isPending ? "Đang lưu…" : "Ghi ý kiến bảo lưu"}
      </button>
    </div>
  );
}
