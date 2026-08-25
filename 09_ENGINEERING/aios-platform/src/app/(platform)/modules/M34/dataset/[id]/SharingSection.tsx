"use client";

// Khai thác, chia sẻ dữ liệu — F34.03 (ETV.P34 §6.5). Ba loại, ba đường phê duyệt;
// kênh cá nhân/dịch vụ AI công cộng bị chặn ngay khi lập phiếu (R19 — cấm tuyệt đối).
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { approveSharing, createSharingRequest, executeSharing, giveAtttOpinion, revokeSharing, submitSharing } from "@/lib/m34/actions";
import { SHARING_STATUS_LABEL, SHARING_STATUS_TONE, SHARING_TYPE_LABEL } from "@/lib/m34/labels";
import type { M34SharingType } from "@/generated/prisma/enums";

const btn =
  "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const btnGhost =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-xs text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";
const inputCls = "rounded-lg border border-border bg-bg px-2 py-1 text-xs text-ink outline-none focus:border-accent-line";
const TONE_CLASS: Record<string, string> = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  crit: "bg-crit-soft text-crit",
  neutral: "bg-sunk text-ink-2",
};

interface Sharing {
  id: string;
  code: string;
  requestType: string;
  recipient: string | null;
  purpose: string;
  scopeNote: string;
  channel: string;
  status: string;
  atttOpinionById: string | null;
  approvedByName: string | null;
  requesterName: string | null;
  revokeDue: string | null;
  reason: string | null;
}

export function SharingSection({
  dataSetId,
  m34Role,
  isOwner,
  sharings,
}: {
  dataSetId: string;
  m34Role: string | null;
  isOwner: boolean;
  sharings: Sharing[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({
    requestType: "NOI_BO_VUOT_QUYEN" as M34SharingType,
    hasCustomerData: false,
    recipient: "",
    purpose: "",
    scopeNote: "",
    channel: "",
    useUntil: "",
    legalBasis: "",
  });
  const [attt, setAttt] = useState({ note: "", scope: true, anon: true, anonNA: "", timeLimited: true, protectedChannel: true, nda: "", returnDelete: true });
  const [work, setWork] = useState({ reason: "", logRef: "", evidence: "" });

  const run = (fn: () => Promise<{ ok: boolean; message?: string }>) => {
    setError(null);
    startTransition(async () => {
      const r = await fn();
      if (!r.ok) setError(r.message ?? "Có lỗi xảy ra.");
      else {
        setShowNew(false);
        router.refresh();
      }
    });
  };

  return (
    <section className="rounded-xl border border-border bg-surface p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-head text-sm font-bold text-ink">Khai thác, chia sẻ dữ liệu (ETV.P34 §6.5)</h2>
        <button className={btnGhost} onClick={() => setShowNew((v) => !v)}>
          {showNew ? "Đóng" : "+ Lập phiếu F34.03"}
        </button>
      </div>
      {error && <p className="mt-2 rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}

      {showNew && (
        <div className="mt-3 grid grid-cols-1 gap-2 rounded-lg border border-border p-3 sm:grid-cols-2">
          <select className={inputCls} value={form.requestType} onChange={(e) => setForm((f) => ({ ...f, requestType: e.target.value as M34SharingType }))}>
            {Object.entries(SHARING_TYPE_LABEL).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2 text-xs text-ink">
            <input type="checkbox" checked={form.hasCustomerData} onChange={(e) => setForm((f) => ({ ...f, hasCustomerData: e.target.checked }))} />
            Có dữ liệu khách hàng (nghĩa vụ bảo mật ETV.P02)
          </label>
          <input placeholder="Bên nhận (bắt buộc khi ra ngoài Viện)" className={inputCls} value={form.recipient} onChange={(e) => setForm((f) => ({ ...f, recipient: e.target.value }))} />
          <input placeholder="Mục đích sử dụng *" className={inputCls} value={form.purpose} onChange={(e) => setForm((f) => ({ ...f, purpose: e.target.value }))} />
          <input placeholder="Phạm vi: trường, thời gian, số bản ghi *" className={inputCls} value={form.scopeNote} onChange={(e) => setForm((f) => ({ ...f, scopeNote: e.target.value }))} />
          <input placeholder="Hình thức, kênh chuyển *" className={inputCls} value={form.channel} onChange={(e) => setForm((f) => ({ ...f, channel: e.target.value }))} />
          <input type="date" className={inputCls} value={form.useUntil} onChange={(e) => setForm((f) => ({ ...f, useUntil: e.target.value }))} />
          <input placeholder="Căn cứ pháp lý (khi ra ngoài)" className={inputCls} value={form.legalBasis} onChange={(e) => setForm((f) => ({ ...f, legalBasis: e.target.value }))} />
          <div>
            <button className={btn} disabled={isPending} onClick={() => run(() => createSharingRequest({ ...form, dataSetId }))}>
              Lập phiếu (Nháp)
            </button>
          </div>
        </div>
      )}

      <div className="mt-3 flex flex-col gap-3">
        {sharings.map((s) => (
          <div key={s.id} className="rounded-lg border border-border p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-ink">
                <span className="font-mono text-xs">{s.code}</span> · {SHARING_TYPE_LABEL[s.requestType]}
                {s.recipient && ` → ${s.recipient}`}
              </p>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[SHARING_STATUS_TONE[s.status]]}`}>
                {SHARING_STATUS_LABEL[s.status]}
              </span>
            </div>
            <p className="mt-1 text-xs text-ink-2">
              {s.purpose} · Phạm vi: {s.scopeNote} · Kênh: {s.channel} · Người đề nghị: {s.requesterName}
              {s.approvedByName && ` · Phê duyệt: ${s.approvedByName}`}
              {s.revokeDue && ` · Hạn sử dụng: ${new Date(s.revokeDue).toLocaleDateString("vi-VN")}`}
              {s.reason && ` · ${s.reason}`}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              {s.status === "DRAFT" && (
                <button className={btnGhost} disabled={isPending} onClick={() => run(() => submitSharing(s.id))}>
                  Gửi phiếu
                </button>
              )}
              {s.status === "CHO_Y_KIEN_ATTT" && m34Role === "ATTT" && (
                <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border p-2">
                  <label className="flex items-center gap-1 text-xs text-ink">
                    <input type="checkbox" checked={attt.scope} onChange={(e) => setAttt((a) => ({ ...a, scope: e.target.checked }))} />
                    Chỉ trường cần thiết
                  </label>
                  <label className="flex items-center gap-1 text-xs text-ink">
                    <input type="checkbox" checked={attt.anon} onChange={(e) => setAttt((a) => ({ ...a, anon: e.target.checked }))} />
                    Ẩn danh/giả danh
                  </label>
                  {!attt.anon && (
                    <input placeholder="Lý do không ẩn danh được" className={inputCls} value={attt.anonNA} onChange={(e) => setAttt((a) => ({ ...a, anonNA: e.target.value }))} />
                  )}
                  <input placeholder="Ghi chú/căn cứ pháp lý" className={inputCls} value={attt.note} onChange={(e) => setAttt((a) => ({ ...a, note: e.target.value }))} />
                  <button
                    className={btn}
                    disabled={isPending}
                    onClick={() =>
                      run(() =>
                        giveAtttOpinion(s.id, true, {
                          note: attt.note,
                          minScopeLimited: attt.scope,
                          minAnonymized: attt.anon,
                          minAnonymizeNA: attt.anonNA || null,
                          minTimeLimited: attt.timeLimited,
                          minProtectedChannel: attt.protectedChannel,
                          minNdaRef: attt.nda || null,
                          minReturnDelete: attt.returnDelete,
                        }),
                      )
                    }
                  >
                    ATTT chấp nhận
                  </button>
                  <button className={btnGhost} disabled={isPending} onClick={() => run(() => giveAtttOpinion(s.id, false, { note: attt.note, minScopeLimited: false, minAnonymized: false }))}>
                    Không chấp nhận
                  </button>
                </div>
              )}
              {s.status === "CHO_PHE_DUYET" && (
                <>
                  <button className={btn} disabled={isPending} onClick={() => run(() => approveSharing(s.id, true))}>
                    Phê duyệt ({s.requestType === "RA_NGOAI_VIEN" ? "LĐV" : "CSHDL"})
                  </button>
                  <input placeholder="Lý do từ chối" className={inputCls} value={work.reason} onChange={(e) => setWork((w) => ({ ...w, reason: e.target.value }))} />
                  <button className={btnGhost} disabled={isPending} onClick={() => run(() => approveSharing(s.id, false, work.reason))}>
                    Từ chối
                  </button>
                </>
              )}
              {s.status === "DA_PHE_DUYET" && (
                <>
                  <input placeholder="Nhật ký chuyển giao *" className={inputCls} value={work.logRef} onChange={(e) => setWork((w) => ({ ...w, logRef: e.target.value }))} />
                  <button className={btnGhost} disabled={isPending} onClick={() => run(() => executeSharing(s.id, work.logRef))}>
                    Ghi nhận đã thực hiện (QTDL/QTHT ≠ người duyệt)
                  </button>
                </>
              )}
              {s.status === "DA_THUC_HIEN" && (isOwner || m34Role === "QLCL") && (
                <>
                  <input placeholder="Bằng chứng bên nhận đã xóa/trả *" className={inputCls} value={work.evidence} onChange={(e) => setWork((w) => ({ ...w, evidence: e.target.value }))} />
                  <button className={btnGhost} disabled={isPending} onClick={() => run(() => revokeSharing(s.id, work.evidence))}>
                    Thu hồi
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
        {sharings.length === 0 && <p className="text-sm text-ink-3">Chưa có phiếu khai thác, chia sẻ nào.</p>}
      </div>
    </section>
  );
}
