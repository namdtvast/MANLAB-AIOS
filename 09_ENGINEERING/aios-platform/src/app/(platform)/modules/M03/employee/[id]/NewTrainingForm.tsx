"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createTrainingPlan } from "@/lib/m03/actions";
import { TRAINING_PLAN_TYPE_LABEL } from "@/lib/m03/labels";
import type { M03TrainingPlanType } from "@/generated/prisma/enums";

const PLAN_TYPES = Object.keys(TRAINING_PLAN_TYPE_LABEL) as M03TrainingPlanType[];

const inputCls =
  "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const btn =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";

const DEFAULT_CONTENT_BAN_DAU = [
  "Nhận thức hệ thống quản lý",
  "Nội quy lao động",
  "Bảo mật thông tin",
  "An toàn lao động",
  "Mô tả công việc",
  "Chuyên môn kỹ thuật",
  "Hướng dẫn biểu mẫu/phần mềm ManLab",
  "Thực hành có giám sát",
];

export function NewTrainingForm({ employeeId }: { employeeId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [planType, setPlanType] = useState<M03TrainingPlanType>("BAN_DAU");
  const [trainer, setTrainer] = useState("");

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-3">
      <p className="text-xs font-medium text-ink">Tạo kế hoạch đào tạo mới</p>
      <select value={planType} onChange={(e) => setPlanType(e.target.value as M03TrainingPlanType)} className={inputCls}>
        {PLAN_TYPES.map((t) => (
          <option key={t} value={t}>
            {TRAINING_PLAN_TYPE_LABEL[t]}
          </option>
        ))}
      </select>
      <input placeholder="Người hướng dẫn" value={trainer} onChange={(e) => setTrainer(e.target.value)} className={inputCls} />
      {error && <p className="text-xs text-crit">{error}</p>}
      <button
        className={btn}
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            setError(null);
            try {
              const created = await createTrainingPlan({
                employeeId,
                planType,
                trainer,
                content: planType === "BAN_DAU" ? DEFAULT_CONTENT_BAN_DAU : [],
              });
              if (!("id" in created)) {
                setError(created.message);
                return;
              }
              router.push(`/modules/M03/training/${created.id}`);
            } catch (e) {
              setError(e instanceof Error ? e.message : "Có lỗi xảy ra.");
            }
          })
        }
      >
        {isPending ? "Đang tạo…" : "Tạo kế hoạch + phiếu theo dõi"}
      </button>
    </div>
  );
}
