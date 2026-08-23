"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createCommitment } from "@/lib/m02/actions";
import { COMMITMENT_TYPE_LABEL } from "@/lib/m02/labels";
import type { M02CommitmentType } from "@/generated/prisma/enums";

const TYPES = Object.keys(COMMITMENT_TYPE_LABEL) as M02CommitmentType[];

const fieldCls =
  "rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const labelCls = "flex flex-col gap-1.5 text-sm font-medium text-ink";

export function NewCommitmentForm({ employees }: { employees: { id: string; label: string }[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState<M02CommitmentType>("KHACH");
  const [employeeId, setEmployeeId] = useState("");

  return (
    <form
      className="flex max-w-lg flex-col gap-4 rounded-xl border border-border bg-surface p-5"
      action={(formData: FormData) => {
        setError(null);
        startTransition(async () => {
          try {
            const created = await createCommitment({
              type,
              personName: String(formData.get("personName") ?? ""),
              org: String(formData.get("org") ?? "") || undefined,
              signedDate: String(formData.get("signedDate") ?? ""),
              accessScope: String(formData.get("accessScope") ?? ""),
              employeeId: type !== "KHACH" ? employeeId || undefined : undefined,
            });
            router.push(`/modules/M02/commitment/${created.id}`);
          } catch (e) {
            setError(e instanceof Error ? e.message : "Có lỗi xảy ra.");
          }
        });
      }}
    >
      <label className={labelCls}>
        Loại cam kết
        <select value={type} onChange={(e) => setType(e.target.value as M02CommitmentType)} className={fieldCls}>
          {TYPES.map((t) => (
            <option key={t} value={t}>
              {COMMITMENT_TYPE_LABEL[t]}
            </option>
          ))}
        </select>
      </label>

      {type !== "KHACH" && (
        <label className={labelCls}>
          Liên kết nhân sự (M03)
          <select value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} className={fieldCls}>
            <option value="">— Không liên kết —</option>
            {employees.map((e) => (
              <option key={e.id} value={e.id}>
                {e.label}
              </option>
            ))}
          </select>
        </label>
      )}

      <label className={labelCls}>
        Họ tên người ký
        <input name="personName" required className={fieldCls} />
      </label>
      <label className={labelCls}>
        Tổ chức (nếu là khách/nhà thầu)
        <input name="org" className={fieldCls} />
      </label>
      <label className={labelCls}>
        Ngày ký
        <input type="date" name="signedDate" required className={fieldCls} />
      </label>
      <label className={labelCls}>
        Phạm vi/khu vực/thông tin được tiếp cận
        <textarea name="accessScope" required rows={2} className={fieldCls} />
      </label>

      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="cursor-pointer rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Đang lưu…" : "Ghi nhận cam kết"}
      </button>
    </form>
  );
}
