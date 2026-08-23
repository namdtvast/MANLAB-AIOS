"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createServiceContract } from "@/lib/m03/actions";
import { SERVICE_TYPE_LABEL } from "@/lib/m03/labels";
import type { M03ServiceType } from "@/generated/prisma/enums";

const TYPES = Object.keys(SERVICE_TYPE_LABEL) as M03ServiceType[];

const inputCls =
  "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const btn =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";

export function NewServiceContractForm({ employeeId }: { employeeId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [serviceType, setServiceType] = useState<M03ServiceType>("CHUYENMON");
  const [duration, setDuration] = useState("");
  const [fee, setFee] = useState("");

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-3">
      <p className="text-xs font-medium text-ink">Soạn hợp đồng dịch vụ mới</p>
      <select value={serviceType} onChange={(e) => setServiceType(e.target.value as M03ServiceType)} className={inputCls}>
        {TYPES.map((t) => (
          <option key={t} value={t}>
            {SERVICE_TYPE_LABEL[t]}
          </option>
        ))}
      </select>
      <input placeholder="Thời hạn" value={duration} onChange={(e) => setDuration(e.target.value)} className={inputCls} />
      <input type="number" placeholder="Phí dịch vụ (VNĐ)" value={fee} onChange={(e) => setFee(e.target.value)} className={inputCls} />
      {error && <p className="text-xs text-crit">{error}</p>}
      <button
        className={btn}
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            setError(null);
            try {
              await createServiceContract({ employeeId, serviceType, duration: duration || undefined, fee: fee ? Number(fee) : undefined });
              router.refresh();
            } catch (e) {
              setError(e instanceof Error ? e.message : "Có lỗi xảy ra.");
            }
          })
        }
      >
        {isPending ? "Đang tạo…" : "Soạn hợp đồng"}
      </button>
    </div>
  );
}
