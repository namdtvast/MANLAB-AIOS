"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { approvalAction, setToolStatus } from "@/lib/m29/actions";
import type { AIApprovalStatus, AIOpStatus } from "@/generated/prisma/enums";

const btnSm =
  "cursor-pointer rounded-md border border-border-strong px-2 py-1 text-xs text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";

export function PlatformApprovalButton({ id, status }: { id: string; status: AIApprovalStatus }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const run = (action: "submit" | "review" | "approve" | "archive", extra?: { reason?: string }) => {
    setError(null);
    startTransition(async () => {
      const r = await approvalAction("platform", id, action, extra);
      if (!r.ok) setError(r.message);
      else router.refresh();
    });
  };

  return (
    <span className="flex items-center gap-1.5">
      {status === "DRAFT" && (
        <button className={btnSm} disabled={isPending} onClick={() => run("submit")}>
          Gửi soát xét
        </button>
      )}
      {status === "PENDING_REVIEW" && (
        <button className={btnSm} disabled={isPending} onClick={() => run("review", {})}>
          Soát xét đạt
        </button>
      )}
      {status === "PENDING_APPROVAL" && (
        <button className={btnSm} disabled={isPending} onClick={() => run("approve", {})}>
          Phê duyệt
        </button>
      )}
      {error && <span className="text-crit">{error}</span>}
    </span>
  );
}

export function ToolStatusToggle({ id, status }: { id: string; status: AIOpStatus }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const toggle = () => {
    startTransition(async () => {
      await setToolStatus(id, status === "ACTIVE" ? "DISABLED" : "ACTIVE");
      router.refresh();
    });
  };

  return (
    <button className={btnSm} disabled={isPending} onClick={toggle}>
      {status === "ACTIVE" ? "Vô hiệu hóa" : "Kích hoạt lại"}
    </button>
  );
}
