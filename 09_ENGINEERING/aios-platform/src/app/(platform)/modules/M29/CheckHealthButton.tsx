"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { checkHealthAction } from "@/lib/m29/actions";

export function CheckHealthButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => startTransition(async () => {
        await checkHealthAction();
        router.refresh();
      })}
      className="cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isPending ? "Đang kiểm tra…" : "Kiểm tra ngay (Platform health + AIA quá hạn)"}
    </button>
  );
}
