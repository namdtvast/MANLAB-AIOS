"use client";

import { useActionState, useId, useState } from "react";
import { reviewAccessRequestAction, type ReviewState } from "@/lib/access-request/actions";
import { FIELD_LIMITS } from "@/lib/access-request/rules";

export function ReviewPanel({ id }: { id: string }) {
  const [state, formAction, isPending] = useActionState<ReviewState | undefined, FormData>(
    reviewAccessRequestAction,
    undefined,
  );
  const [decision, setDecision] = useState<"APPROVED" | "REJECTED">("APPROVED");
  const noteId = useId();

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="decision" value={decision} />

      <label htmlFor={noteId} className="text-xs font-medium text-ink-2">
        Ghi chú{" "}
        <span className="font-normal text-ink-3">
          {decision === "REJECTED" ? "(bắt buộc khi từ chối)" : "(không bắt buộc)"}
        </span>
      </label>
      <textarea
        id={noteId}
        name="reviewNote"
        rows={2}
        defaultValue={state?.reviewNote ?? ""}
        maxLength={FIELD_LIMITS.reviewNote}
        className="w-full resize-y rounded-lg border border-border bg-bg px-2.5 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line"
      />

      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          disabled={isPending}
          onClick={() => setDecision("APPROVED")}
          className="inline-flex min-h-9 cursor-pointer items-center rounded-lg bg-accent px-3 text-xs font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Đồng ý cấp
        </button>
        <button
          type="submit"
          disabled={isPending}
          onClick={() => setDecision("REJECTED")}
          className="inline-flex min-h-9 cursor-pointer items-center rounded-lg border border-crit/40 px-3 text-xs font-semibold text-crit transition-colors hover:bg-crit-soft disabled:cursor-not-allowed disabled:opacity-60"
        >
          Từ chối
        </button>
      </div>

      {state?.message && (
        <p
          role="status"
          className={`rounded-lg px-2.5 py-1.5 text-xs ${
            state.ok ? "bg-good-soft text-good" : "bg-crit-soft text-crit"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
