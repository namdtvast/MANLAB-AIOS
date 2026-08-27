"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { approvalAction, setToolStatus } from "@/lib/m29/actions";
import type { AIApprovalStatus, AIOpStatus } from "@/generated/prisma/enums";

const btnSm =
  "cursor-pointer rounded-md border border-border-strong px-2 py-1 text-xs text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";

// Nhánh bắt buộc ghi lý do — ETV.P35 Phụ lục II ghi chú cuối: "Mọi nhánh Hủy, Không phê duyệt,
// Không soát xét bắt buộc ghi lý do", và §6.5.2 bước 4 với nhánh Hết hiệu lực. Giao diện chặn
// trước cho đỡ mất công một vòng máy chủ, nhưng rules.ts vẫn kiểm lại (REASON_REQUIRED) — giao
// diện không phải nơi giữ luật.
type ReasonKey = "return" | "reject" | "archive" | "cancel";

const REASON_META: Record<ReasonKey, { label: string; prompt: string }> = {
  return: { label: "Trả lại", prompt: "Lý do trả lại để người lập sửa" },
  reject: { label: "Từ chối", prompt: "Lý do không phê duyệt" },
  archive: { label: "Hết hiệu lực", prompt: "Căn cứ ngừng vận hành (số phiếu ETV.P.F 35.04)" },
  cancel: { label: "Hủy", prompt: "Lý do bỏ bản ghi trước khi phê duyệt" },
};

// Bộ nút theo trạng thái, bám ETV.P35 Phụ lục II.1. Hủy và Hết hiệu lực KHÔNG bao giờ hiện cùng
// lúc: trạng thái 9 (Hủy) chỉ mở trước khi phê duyệt, trạng thái 8 (Hết hiệu lực) chỉ mở sau đó.
const PRE_APPROVAL: AIApprovalStatus[] = ["DRAFT", "PENDING_REVIEW", "RETURNED", "REJECTED", "PENDING_APPROVAL"];

export function PlatformApprovalButton({ id, status }: { id: string; status: AIApprovalStatus }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [asking, setAsking] = useState<ReasonKey | null>(null);
  const [reason, setReason] = useState("");

  const run = (action: "submit" | "review" | "approve" | "activate" | "archive" | "cancel", extra?: { decision?: "return" | "reject"; reason?: string }) => {
    setError(null);
    startTransition(async () => {
      const r = await approvalAction("platform", id, action, extra);
      if (!r.ok) setError(r.message);
      else {
        setAsking(null);
        setReason("");
        router.refresh();
      }
    });
  };

  const confirmReason = () => {
    if (!asking || !reason.trim()) return;
    if (asking === "return") run("review", { decision: "return", reason });
    else if (asking === "reject") run("approve", { decision: "reject", reason });
    else run(asking, { reason });
  };

  const ask = (key: ReasonKey) => {
    setError(null);
    setReason("");
    setAsking(key);
  };

  const reasonButton = (key: ReasonKey) => (
    <button className={btnSm} disabled={isPending} onClick={() => ask(key)}>
      {REASON_META[key].label}
    </button>
  );

  // Hết hiệu lực và Hủy là hai trạng thái kết thúc: không còn thao tác nào. Bản ghi KHÔNG xóa
  // được — ETV.P35 §6.1.8 cấm cấp lại mã nền tảng đã Hủy/Hết hiệu lực để giữ giá trị truy vết,
  // nên bản ghi phải ở lại danh mục làm chứng cứ.
  if (status === "ARCHIVED" || status === "CANCELLED") return <span className="text-xs text-ink-3">—</span>;

  return (
    <div className="flex flex-col gap-1.5">
      <span className="flex flex-wrap items-center gap-1.5">
        {(["DRAFT", "RETURNED", "REJECTED"] as AIApprovalStatus[]).includes(status) && (
          <button className={btnSm} disabled={isPending} onClick={() => run("submit")}>
            Gửi soát xét
          </button>
        )}
        {status === "PENDING_REVIEW" && (
          <>
            <button className={btnSm} disabled={isPending} onClick={() => run("review", {})}>
              Soát xét đạt
            </button>
            {reasonButton("return")}
          </>
        )}
        {status === "PENDING_APPROVAL" && (
          <>
            <button className={btnSm} disabled={isPending} onClick={() => run("approve", {})}>
              Phê duyệt
            </button>
            {reasonButton("reject")}
          </>
        )}
        {/* Bước cuối của ETV.P35 §6.1.7: phê duyệt xong vẫn phải đưa vào vận hành thì bản ghi mới
            Hiệu lực và mới vào vòng dò sức khoẻ. Không gộp vào nút Phê duyệt. */}
        {status === "APPROVED" && (
          <button className={btnSm} disabled={isPending} onClick={() => run("activate")}>
            Đưa vào vận hành
          </button>
        )}
        {(["APPROVED", "ACTIVE"] as AIApprovalStatus[]).includes(status) && reasonButton("archive")}
        {PRE_APPROVAL.includes(status) && reasonButton("cancel")}
      </span>

      {asking && (
        <span className="flex flex-col gap-1">
          <textarea
            className="w-56 rounded-md border border-border-strong bg-surface px-2 py-1 text-xs text-ink"
            rows={2}
            autoFocus
            placeholder={REASON_META[asking].prompt}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <span className="flex gap-1.5">
            <button className={btnSm} disabled={isPending || !reason.trim()} onClick={confirmReason}>
              Xác nhận {REASON_META[asking].label.toLowerCase()}
            </button>
            <button className={btnSm} disabled={isPending} onClick={() => setAsking(null)}>
              Bỏ qua
            </button>
          </span>
        </span>
      )}

      {error && <span className="text-xs text-crit">{error}</span>}
    </div>
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
