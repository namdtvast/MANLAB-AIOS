"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { markActionDone } from "@/lib/m17/actions";

export function MarkDoneButton({ id }: { id: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      className="mt-1 cursor-pointer rounded-lg border border-border-strong px-2 py-1 text-xs text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await markActionDone(id);
          router.refresh();
        })
      }
    >
      Đánh dấu Hoàn thành
    </button>
  );
}
