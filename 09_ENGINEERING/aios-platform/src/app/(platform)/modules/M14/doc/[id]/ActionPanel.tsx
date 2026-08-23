"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  applyAiSuggestion,
  approveDocument,
  discardDocument,
  publishDocument,
  retireDocument,
  reviewDocument,
  submitReview,
} from "@/lib/m14/actions";

interface Props {
  id: string;
  status: string;
  m14Role: string | null;
  isPublished: boolean;
  pendingSuggestions: { id: string; field: string; suggestedValue: string; rationale: string | null }[];
}

const btn =
  "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const btnGhost =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-sm text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";
const inputCls =
  "rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-ink outline-none transition-colors focus:border-accent-line";
const boxCls = "flex flex-col gap-2 border-t border-border pt-3 first:border-0 first:pt-0";

export function DocActionPanel({ id, status, m14Role, isPublished, pendingSuggestions }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [distribution, setDistribution] = useState("");

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
        Vai trò M14 của bạn: <strong className="text-ink">{m14Role ?? "chưa gán"}</strong>
      </p>
      {m14Role === "AI_AGENT" && (
        <p className="rounded-lg border border-warn/30 bg-warn-soft px-3 py-2 text-xs text-warn">
          Tài khoản AI chỉ được gợi ý và cảnh báo — mọi thao tác chuyển trạng thái đều bị chặn (ETV.P14 §6.9,
          ISO/IEC 42001 §7.5).
        </p>
      )}
      {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      {pendingSuggestions.length > 0 && (
        <div className={boxCls}>
          <p className="text-xs text-ink-2">Gợi ý của AI — cần người có thẩm quyền xác nhận mới ghi vào văn bản:</p>
          {pendingSuggestions.map((s) => (
            <div key={s.id} className="rounded-lg border border-border bg-bg p-2">
              <p className="text-xs text-ink">
                <strong>{s.field}</strong>: {s.suggestedValue}
              </p>
              {s.rationale && <p className="mt-0.5 text-xs text-ink-3">{s.rationale}</p>}
              <button className={`${btnGhost} mt-2`} disabled={isPending} onClick={() => run(() => applyAiSuggestion(s.id))}>
                Áp dụng gợi ý
              </button>
            </div>
          ))}
        </div>
      )}

      {(status === "NHAP" || status === "KHONG_SOAT_XET" || status === "KHONG_PHE_DUYET") && (
        <div className={boxCls}>
          <button className={btn} disabled={isPending} onClick={() => run(() => submitReview(id))}>
            Gửi soát xét
          </button>
        </div>
      )}

      {status === "CHO_SOAT_XET" && (
        <div className={boxCls}>
          <p className="text-xs text-ink-2">LĐP soát xét kỹ thuật (RACI §III).</p>
          <input placeholder="Lý do (bắt buộc nếu không đạt)" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
          <div className="flex gap-2">
            <button className={btn} disabled={isPending} onClick={() => run(() => reviewDocument(id, { passed: true }))}>
              Soát xét đạt
            </button>
            <button className={btnGhost} disabled={isPending} onClick={() => run(() => reviewDocument(id, { passed: false, reason }))}>
              Không soát xét
            </button>
          </div>
        </div>
      )}

      {status === "CHO_PHE_DUYET" && (
        <div className={boxCls}>
          <p className="text-xs text-ink-2">Sổ tay và Thủ tục bắt buộc LĐV trực tiếp phê duyệt, không ủy quyền (quy tắc 4).</p>
          <input placeholder="Lý do (bắt buộc nếu không phê duyệt)" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
          <div className="flex gap-2">
            <button className={btn} disabled={isPending} onClick={() => run(() => approveDocument(id, { passed: true }))}>
              Phê duyệt ban hành
            </button>
            <button className={btnGhost} disabled={isPending} onClick={() => run(() => approveDocument(id, { passed: false, reason }))}>
              Không phê duyệt
            </button>
          </div>
        </div>
      )}

      {status === "DA_PHE_DUYET" && !isPublished && (
        <div className={boxCls}>
          <p className="text-xs text-ink-2">Văn thư/QLCL ban hành: cập nhật danh mục, phân phối, thu hồi bản cũ (F14.04).</p>
          <input placeholder="Nội dung giao nhận" value={distribution} onChange={(e) => setDistribution(e.target.value)} className={inputCls} />
          <button className={btn} disabled={isPending} onClick={() => run(() => publishDocument(id, distribution))}>
            Ban hành &amp; phân phối
          </button>
        </div>
      )}

      {status === "DA_PHE_DUYET" && (
        <div className={boxCls}>
          <p className="text-xs text-ink-2">Kết thúc vòng đời — hai hành vi khác nhau (§6.11).</p>
          <input placeholder="Lý do (bắt buộc)" value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} />
          <div className="flex gap-2">
            <button className={btnGhost} disabled={isPending} onClick={() => run(() => retireDocument(id, reason))}>
              LĐP thanh lý
            </button>
            <button className={btnGhost} disabled={isPending} onClick={() => run(() => discardDocument(id, reason))}>
              LĐV hủy bỏ
            </button>
          </div>
        </div>
      )}

      {status === "HET_HIEU_LUC_HUY" && <p className="text-sm text-ink-3">Văn bản đã kết thúc vòng đời kiểm soát.</p>}
    </div>
  );
}
