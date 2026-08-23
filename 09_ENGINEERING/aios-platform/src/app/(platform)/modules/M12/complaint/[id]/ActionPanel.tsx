"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { assignComplaint, closeComplaint, respondComplaint, setCapaRef, setExternalDocRef } from "@/lib/m12/actions";

interface Props {
  id: string;
  status: string;
  m12Role: string | null;
  resolvedOnSpot: boolean;
  customerSatisfiedOnSpot: boolean | null;
  isComplex: boolean;
  externalDocRef: string | null;
  capaRef: string | null;
  assignableUsers: { id: string; name: string }[];
}

const btn =
  "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const btnGhost =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";
const inputCls =
  "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";

export function ComplaintActionPanel({
  id,
  status,
  m12Role,
  resolvedOnSpot,
  customerSatisfiedOnSpot,
  isComplex,
  externalDocRef,
  capaRef,
  assignableUsers,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [docRef, setDocRef] = useState("");
  const [assigneeId, setAssigneeId] = useState(assignableUsers[0]?.id ?? "");
  const [resolution, setResolution] = useState("");
  const [reason, setReason] = useState("");
  const [capaRefInput, setCapaRefInput] = useState("");

  const requiresExternalDoc = !(resolvedOnSpot && customerSatisfiedOnSpot === true);

  const run = (fn: () => Promise<{ ok: boolean; message?: string } | void>) => {
    setError(null);
    startTransition(async () => {
      const r = await fn();
      if (r && "ok" in r && !r.ok) setError(r.message ?? "Có lỗi xảy ra.");
      else router.refresh();
    });
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
      <p className="text-xs text-ink-3">
        Vai trò M12 của bạn: <strong className="text-ink">{m12Role ?? "chưa gán"}</strong>
      </p>
      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      {status === "NHAP" && requiresExternalDoc && !externalDocRef && (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-warn">Bắt buộc khởi tạo văn bản khiếu nại chính thức (F14.03) trước khi phân công.</p>
          <input placeholder="Số hiệu F14.03" value={docRef} onChange={(e) => setDocRef(e.target.value)} className={inputCls} />
          <button className={btn} disabled={isPending} onClick={() => run(() => setExternalDocRef(id, docRef))}>
            Khởi tạo F14.03
          </button>
        </div>
      )}

      {status === "NHAP" && (!requiresExternalDoc || externalDocRef) && (
        <div className="flex flex-col gap-2">
          <select value={assigneeId} onChange={(e) => setAssigneeId(e.target.value)} className={inputCls}>
            {assignableUsers.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
          <button className={btn} disabled={isPending || !assigneeId} onClick={() => run(() => assignComplaint(id, assigneeId))}>
            LĐV phân công xử lý
          </button>
        </div>
      )}

      {status === "DANG_XU_LY" && (
        <div className="flex flex-col gap-2">
          <textarea placeholder="Nội dung trả lời khách hàng" value={resolution} onChange={(e) => setResolution(e.target.value)} rows={3} className={inputCls} />
          <button className={btn} disabled={isPending} onClick={() => run(() => respondComplaint(id, resolution))}>
            Trả lời khách hàng
          </button>
        </div>
      )}

      {status === "DA_TRA_LOI" && isComplex && !capaRef && (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-warn">Khiếu nại phức tạp — bắt buộc liên kết hành động khắc phục trước khi đóng hồ sơ.</p>
          <input placeholder="Số hiệu phiếu khắc phục (→ M13)" value={capaRefInput} onChange={(e) => setCapaRefInput(e.target.value)} className={inputCls} />
          <button className={btn} disabled={isPending} onClick={() => run(() => setCapaRef(id, capaRefInput))}>
            Liên kết CAPA
          </button>
        </div>
      )}

      {status === "DA_TRA_LOI" && (
        <div className="flex flex-col gap-2">
          <input placeholder="Lý do (bắt buộc nếu dừng giải quyết)" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
          <div className="flex gap-2">
            <button className={btn} disabled={isPending} onClick={() => run(() => closeComplaint(id, { customerSatisfied: true }))}>
              Đóng hồ sơ (khách đồng ý)
            </button>
            <button className={btnGhost} disabled={isPending} onClick={() => run(() => closeComplaint(id, { customerSatisfied: false, reason }))}>
              LĐV dừng giải quyết
            </button>
          </div>
        </div>
      )}

      {status === "DONG_HO_SO" && <p className="text-sm text-good">Đã đóng hồ sơ.</p>}
      {status === "KHONG_DAT_THOA_THUAN" && <p className="text-sm text-crit">Đã dừng giải quyết — khách hàng không chấp nhận.</p>}
    </div>
  );
}
