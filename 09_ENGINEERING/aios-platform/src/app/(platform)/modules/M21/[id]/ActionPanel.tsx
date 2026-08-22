"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { transition } from "@/lib/m21/actions";
import type { M21Status } from "@/generated/prisma/enums";
import type { M21Role } from "@/lib/m21/rules";
import { M21_ROLE_LABEL } from "@/lib/m21/labels";

interface SerializableTransition {
  to: M21Status;
  label: string;
  minRole?: M21Role;
  reason?: boolean;
  needReceipt?: boolean;
  danger?: boolean;
  warn?: boolean;
}

const btnBase = "cursor-pointer rounded-lg px-3 py-1.5 text-sm font-semibold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const inputCls =
  "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";

function toneClass(t: SerializableTransition) {
  if (t.danger) return `${btnBase} bg-crit text-white`;
  if (t.warn) return `${btnBase} border border-warn text-warn`;
  return `${btnBase} bg-accent text-accent-ink`;
}

export function ActionPanel({
  id,
  m21Role,
  transitions,
}: {
  id: string;
  m21Role: M21Role | null;
  transitions: SerializableTransition[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [receiptNo, setReceiptNo] = useState("");
  const [activeTo, setActiveTo] = useState<M21Status | null>(null);

  const run = (t: SerializableTransition) => {
    setError(null);
    startTransition(async () => {
      const r = await transition(id, t.to, { reason: reason || undefined, receiptNo: receiptNo || undefined });
      if (!r.ok) {
        setError(r.message);
        return;
      }
      setReason("");
      setReceiptNo("");
      setActiveTo(null);
      router.refresh();
    });
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
      <p className="text-xs text-ink-3">
        Vai trò M21 của bạn: <strong className="text-ink">{m21Role ? M21_ROLE_LABEL[m21Role] : "chưa gán"}</strong>
      </p>
      {error && (
        <p className="whitespace-pre-line rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>
      )}

      {transitions.length === 0 && <p className="text-sm text-ink-3">Hồ sơ ở trạng thái cuối, không còn thao tác.</p>}

      {transitions.map((t) => {
        const isActive = activeTo === t.to;
        const needsInput = t.reason || t.needReceipt;
        return (
          <div key={t.to} className="flex flex-col gap-2">
            {needsInput && isActive && (
              <input
                placeholder={t.needReceipt ? "Mã biên nhận (bắt buộc)" : "Lý do (bắt buộc)"}
                value={t.needReceipt ? receiptNo : reason}
                onChange={(e) => (t.needReceipt ? setReceiptNo(e.target.value) : setReason(e.target.value))}
                className={inputCls}
              />
            )}
            <button
              type="button"
              disabled={isPending}
              className={toneClass(t)}
              onClick={() => {
                if (needsInput && !isActive) {
                  setActiveTo(t.to);
                  return;
                }
                run(t);
              }}
            >
              {t.label}
              {t.minRole ? ` (từ ${t.minRole})` : ""}
            </button>
          </div>
        );
      })}
    </div>
  );
}
