"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createAccount, flagOrphanAccount, lockAccount, recordHrEvent, revokeAccount, unlockAccount } from "@/lib/m33/actions";
import { ACCOUNT_TYPE_LABEL } from "@/lib/m33/labels";
import type { M33AccountType } from "@/generated/prisma/enums";

const btn =
  "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const btnGhost =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-xs text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";
const inputCls = "rounded-lg border border-border bg-bg px-2 py-1 text-xs text-ink outline-none focus:border-accent-line";

function useRun() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const run = (fn: () => Promise<{ ok: boolean; message?: string }>, after?: () => void) => {
    setError(null);
    startTransition(async () => {
      const r = await fn();
      if (!r.ok) setError(r.message ?? "Có lỗi xảy ra.");
      else {
        after?.();
        router.refresh();
      }
    });
  };
  return { isPending, error, run };
}

export function NewAccountForm({
  assets,
  users,
}: {
  assets: { id: string; code: string; name: string }[];
  users: { id: string; name: string | null; email: string }[];
}) {
  const { isPending, error, run } = useRun();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    loginName: "",
    accountType: "CA_NHAN_DINH_DANH" as M33AccountType,
    assetId: "",
    platformRef: "",
    holderId: "",
    holderNote: "",
    accessRequestRef: "",
    secretLocation: "",
    secretIssuer: "",
    mfaEnabled: false,
    validUntil: "",
    sharedApprovalRef: "",
  });
  // Khai bản ghi này là chính tài khoản đăng nhập ManLab của người giữ. Không có ô chọn người
  // riêng: platformUserId luôn bằng holderId (rules.ts đòi đúng như vậy), nên không có đường
  // khai nhầm sang người khác — mà khai nhầm ở đây nghĩa là khóa oan một người.
  const [laTaiKhoanNenTang, setLaTaiKhoanNenTang] = useState(false);
  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <section className="rounded-xl border border-border bg-surface p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-head text-sm font-bold text-ink">Ghi nhận tài khoản theo phiếu F28.04 (QTHT — R6)</h2>
        <button className={btnGhost} onClick={() => setOpen((v) => !v)}>
          {open ? "Đóng" : "+ Ghi nhận tài khoản"}
        </button>
      </div>
      {error && <p className="mt-2 rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}
      {open && (
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <input placeholder="Tên đăng nhập *" className={inputCls} value={form.loginName} onChange={(e) => set("loginName", e.target.value)} />
          <select className={inputCls} value={form.accountType} onChange={(e) => set("accountType", e.target.value)}>
            {Object.entries(ACCOUNT_TYPE_LABEL).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
          <select className={inputCls} value={form.assetId} onChange={(e) => set("assetId", e.target.value)}>
            <option value="">— trên tài sản (chọn 1 trong 2) —</option>
            {assets.map((a) => (
              <option key={a.id} value={a.id}>
                {a.code} — {a.name}
              </option>
            ))}
          </select>
          <input placeholder="…hoặc trên nền tảng (M35)" className={inputCls} value={form.platformRef} onChange={(e) => set("platformRef", e.target.value)} />
          <select className={inputCls} value={form.holderId} onChange={(e) => set("holderId", e.target.value)}>
            <option value="">— người giữ —</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name ?? u.email}
              </option>
            ))}
          </select>
          <input placeholder="Người giữ là bên thứ ba (ghi chú)" className={inputCls} value={form.holderNote} onChange={(e) => set("holderNote", e.target.value)} />
          <input placeholder="Phiếu F28.04 đã phê duyệt (M28) *" className={inputCls} value={form.accessRequestRef} onChange={(e) => set("accessRequestRef", e.target.value)} />
          <input placeholder="NƠI LƯU bí mật xác thực (không ghi giá trị) *" className={inputCls} value={form.secretLocation} onChange={(e) => set("secretLocation", e.target.value)} />
          <input placeholder="Người có quyền cấp phát *" className={inputCls} value={form.secretIssuer} onChange={(e) => set("secretIssuer", e.target.value)} />
          <input type="date" className={inputCls} value={form.validUntil} onChange={(e) => set("validUntil", e.target.value)} />
          <label className="flex items-center gap-2 text-xs text-ink">
            <input type="checkbox" checked={form.mfaEnabled} onChange={(e) => set("mfaEnabled", e.target.checked)} />
            MFA đã bật (bắt buộc với đặc quyền)
          </label>
          <label className="flex items-center gap-2 text-xs text-ink">
            <input
              type="checkbox"
              checked={laTaiKhoanNenTang}
              onChange={(e) => setLaTaiKhoanNenTang(e.target.checked)}
            />
            Là tài khoản đăng nhập ManLab của người giữ — khóa/thu hồi ở đây sẽ cắt đăng nhập
          </label>
          {form.accountType === "DUNG_CHUNG_NGOAI_LE" && (
            <input placeholder="Phê duyệt ngoại lệ dùng chung *" className={inputCls} value={form.sharedApprovalRef} onChange={(e) => set("sharedApprovalRef", e.target.value)} />
          )}
          <div>
            <button
              className={btn}
              disabled={isPending}
              onClick={() =>
                run(
                  () =>
                    createAccount({
                      ...form,
                      assetId: form.assetId || null,
                      platformRef: form.platformRef || null,
                      holderId: form.holderId || null,
                      platformUserId: laTaiKhoanNenTang ? form.holderId || null : null,
                      validUntil: form.validUntil || null,
                      sharedApprovalRef: form.sharedApprovalRef || null,
                    }),
                  () => {
                    setOpen(false);
                    setLaTaiKhoanNenTang(false);
                  },
                )
              }
            >
              Ghi nhận
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export function AccountActions({
  id,
  status,
  role,
  catDangNhap,
}: {
  id: string;
  status: string;
  role: string | null;
  /** Bản ghi này gắn với một tài khoản đăng nhập ManLab — thao tác ở đây cắt luôn đăng nhập. */
  catDangNhap: boolean;
}) {
  const { isPending, error, run } = useRun();
  const [reason, setReason] = useState("");
  const [hrEvent, setHrEvent] = useState("");
  void role;
  // Một ô lý do dùng chung cho mọi nút của dòng, nên phải xoá sau mỗi lần chạy được: bỏ lại nội
  // dung cũ thì thao tác sau ghi nhầm căn cứ của thao tác trước vào sổ.
  const xoaLyDo = () => setReason("");

  return (
    <div className="flex flex-col gap-1">
      {error && <span className="max-w-64 text-xs text-crit">{error}</span>}
      {catDangNhap && status !== "DA_THU_HOI" && (
        <span className="max-w-64 text-xs text-warn">Thao tác ở dòng này cắt luôn quyền đăng nhập ManLab.</span>
      )}
      <div className="flex flex-wrap items-center gap-1">
        {status === "DANG_HOAT_DONG" && (
          <>
            <button className={btnGhost} disabled={isPending} onClick={() => run(() => flagOrphanAccount(id))}>
              Bất thường → khóa
            </button>
            <input placeholder="Lý do/phiếu" className={inputCls} value={reason} onChange={(e) => setReason(e.target.value)} />
            <button className={btnGhost} disabled={isPending} onClick={() => run(() => lockAccount(id, reason), xoaLyDo)}>
              Tạm khóa
            </button>
          </>
        )}
        {status === "TAM_KHOA" && (
          <>
            <input placeholder="Kết luận xem xét của PT.ATTT" className={inputCls} value={reason} onChange={(e) => setReason(e.target.value)} />
            <button className={btnGhost} disabled={isPending} onClick={() => run(() => unlockAccount(id, reason), xoaLyDo)}>
              Mở lại
            </button>
          </>
        )}
        {status !== "DA_THU_HOI" && (
          <button className={btnGhost} disabled={isPending} onClick={() => run(() => revokeAccount(id, reason || "Theo phiếu M28"), xoaLyDo)}>
            Thu hồi
          </button>
        )}
        {status === "DANG_HOAT_DONG" && (
          <>
            <input placeholder="Sự kiện nhân sự (M03)" className={inputCls} value={hrEvent} onChange={(e) => setHrEvent(e.target.value)} />
            <button className={btnGhost} disabled={isPending} onClick={() => run(() => recordHrEvent(id, hrEvent))}>
              Biến động NS (R16)
            </button>
          </>
        )}
      </div>
    </div>
  );
}
