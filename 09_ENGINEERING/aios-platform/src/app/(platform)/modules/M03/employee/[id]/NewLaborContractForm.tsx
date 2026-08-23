"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createLaborContract } from "@/lib/m03/actions";
import { CONTRACT_TYPE_LABEL } from "@/lib/m03/labels";
import type { M03ContractType } from "@/generated/prisma/enums";

const TYPES = Object.keys(CONTRACT_TYPE_LABEL) as M03ContractType[];

const inputCls =
  "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const btn =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";

export function NewLaborContractForm({ employeeId }: { employeeId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [contractType, setContractType] = useState<M03ContractType>("THUVIEC");
  const [duration, setDuration] = useState("");
  const [salary, setSalary] = useState("");

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-3">
      <p className="text-xs font-medium text-ink">Soạn hợp đồng lao động mới</p>
      <select value={contractType} onChange={(e) => setContractType(e.target.value as M03ContractType)} className={inputCls}>
        {TYPES.map((t) => (
          <option key={t} value={t}>
            {CONTRACT_TYPE_LABEL[t]}
          </option>
        ))}
      </select>
      <input placeholder="Thời hạn (vd: 12 tháng)" value={duration} onChange={(e) => setDuration(e.target.value)} className={inputCls} />
      <input type="number" placeholder="Lương (VNĐ)" value={salary} onChange={(e) => setSalary(e.target.value)} className={inputCls} />
      {error && <p className="text-xs text-crit">{error}</p>}
      <button
        className={btn}
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            setError(null);
            try {
              const created = await createLaborContract({
                employeeId,
                contractType,
                duration: duration || undefined,
                salary: salary ? Number(salary) : undefined,
              });
              router.push(`/modules/M03/contract/${created.id}`);
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
