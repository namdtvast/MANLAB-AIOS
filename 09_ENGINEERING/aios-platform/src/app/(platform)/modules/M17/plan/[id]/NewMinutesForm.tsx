"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createReviewMinutes } from "@/lib/m17/actions";
import { REVIEW_TOPICS } from "@/lib/m17/labels";

const inputCls =
  "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const btn =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";

export function NewMinutesForm({ planId }: { planId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [meetingDate, setMeetingDate] = useState("");
  const [results, setResults] = useState<Record<number, string>>({});
  const [skipTopic10, setSkipTopic10] = useState(false); // demo gate: cố tình bỏ trống 1 nội dung

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-3">
      <p className="text-xs font-medium text-ink">Lập biên bản xem xét (đủ 12 nội dung)</p>
      <label className="flex flex-col gap-1 text-xs text-ink-2">
        Ngày họp
        <input type="date" value={meetingDate} onChange={(e) => setMeetingDate(e.target.value)} className={inputCls} />
      </label>
      {REVIEW_TOPICS.map((t) => (
        <label key={t.id} className="flex flex-col gap-1 text-xs text-ink-2">
          {t.id}. {t.label}
          <input
            value={results[t.id] ?? ""}
            onChange={(e) => setResults((r) => ({ ...r, [t.id]: e.target.value }))}
            className={inputCls}
          />
        </label>
      ))}
      <label className="flex items-center gap-2 text-xs text-crit">
        <input type="checkbox" checked={skipTopic10} onChange={(e) => setSkipTopic10(e.target.checked)} />
        (Demo gate) Bỏ trống nội dung số 10 khi lưu
      </label>
      {error && <p className="text-xs text-crit">{error}</p>}
      <button
        className={btn}
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            setError(null);
            const topicResults = REVIEW_TOPICS.filter((t) => !(skipTopic10 && t.id === 10)).map((t) => ({
              topicId: t.id,
              assessmentResult: results[t.id] ?? "",
            }));
            const r = await createReviewMinutes({ planId, meetingDate, topicResults });
            if ("id" in r) router.push(`/modules/M17/minutes/${r.id}`);
            else setError(r.message);
          })
        }
      >
        {isPending ? "Đang lưu…" : "Lập biên bản"}
      </button>
    </div>
  );
}
