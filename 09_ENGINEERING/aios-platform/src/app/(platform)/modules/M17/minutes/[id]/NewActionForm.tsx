"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createActionTracking } from "@/lib/m17/actions";

const inputCls =
  "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const btn =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";

export function NewActionForm({ minutesId }: { minutesId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [actionDescription, setActionDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-3">
      <p className="text-xs font-medium text-ink">Lập theo dõi hành động mới</p>
      <input placeholder="Mô tả hành động" value={actionDescription} onChange={(e) => setActionDescription(e.target.value)} className={inputCls} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <label className="flex flex-col gap-1 text-xs text-ink-2">
          Bắt đầu
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputCls} />
        </label>
        <label className="flex flex-col gap-1 text-xs text-ink-2">
          Hạn chót
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className={inputCls} />
        </label>
      </div>
      <input placeholder="Người phụ trách" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} className={inputCls} />
      {error && <p className="text-xs text-crit">{error}</p>}
      <button
        className={btn}
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            setError(null);
            try {
              await createActionTracking({ minutesId, actionDescription, startDate, dueDate, assignedTo });
              router.refresh();
            } catch (e) {
              setError(e instanceof Error ? e.message : "Có lỗi xảy ra.");
            }
          })
        }
      >
        {isPending ? "Đang lưu…" : "Lập theo dõi"}
      </button>
    </div>
  );
}
