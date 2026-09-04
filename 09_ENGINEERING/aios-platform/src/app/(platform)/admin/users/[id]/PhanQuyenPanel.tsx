"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { capVaiTro, doiVaiTroNenTang, thuHoiVaiTro } from "@/lib/admin-users/actions";
import type { PlatformRole } from "@/generated/prisma/enums";

const btn =
  "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const btnGhost =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-xs text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";
const inputCls =
  "rounded-lg border border-border bg-bg px-2 py-1.5 text-xs text-ink outline-none focus:border-accent-line";

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

const VAI_TRO_NEN_TANG: { value: PlatformRole; label: string }[] = [
  { value: "VIEWER", label: "Chỉ xem" },
  { value: "MEMBER", label: "Người dùng" },
  { value: "ADMIN", label: "Quản trị hệ thống" },
];

export function PhanQuyenPanel({
  subjectId,
  vaiTroNenTang,
  modules,
  phieu,
}: {
  subjectId: string;
  vaiTroNenTang: PlatformRole;
  modules: { code: string; name: string; vaiTro: { role: string; label: string }[] }[];
  phieu: { id: string; nhan: string }[];
}) {
  const { isPending, error, run } = useRun();
  const [moduleCode, setModuleCode] = useState(modules[0]?.code ?? "");
  const [role, setRole] = useState(modules[0]?.vaiTro[0]?.role ?? "");
  const [phieuId, setPhieuId] = useState("");
  const [roleNenTang, setRoleNenTang] = useState<PlatformRole>(vaiTroNenTang);
  const [phieuNenTangId, setPhieuNenTangId] = useState("");

  const vaiTroCuaModuleDangChon = modules.find((m) => m.code === moduleCode)?.vaiTro ?? [];
  const khongCoPhieu = phieu.length === 0;

  return (
    <section className="rounded-xl border border-border bg-surface p-4">
      <h2 className="font-head text-sm font-bold text-ink">Cấp quyền theo phiếu F28.04</h2>
      {error && (
        <p className="mt-2 rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>
      )}

      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-4">
        <select
          className={inputCls}
          value={moduleCode}
          onChange={(e) => {
            const code = e.target.value;
            setModuleCode(code);
            // Vai trò của module cũ hầu như không có trong danh mục module mới, giữ lại chỉ
            // để người dùng bấm Cấp rồi nhận lỗi INVALID_ROLE.
            setRole(modules.find((m) => m.code === code)?.vaiTro[0]?.role ?? "");
          }}
        >
          {modules.map((m) => (
            <option key={m.code} value={m.code}>
              {m.code} — {m.name}
            </option>
          ))}
        </select>
        <select className={inputCls} value={role} onChange={(e) => setRole(e.target.value)}>
          {vaiTroCuaModuleDangChon.map((v) => (
            <option key={v.role} value={v.role}>
              {v.label}
            </option>
          ))}
        </select>
        <select className={inputCls} value={phieuId} onChange={(e) => setPhieuId(e.target.value)}>
          <option value="">— phiếu F28.04 (bắt buộc) —</option>
          {phieu.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nhan}
            </option>
          ))}
        </select>
        <div>
          <button
            className={btn}
            disabled={isPending || khongCoPhieu}
            onClick={() =>
              run(() => capVaiTro({ subjectId, moduleCode, role, accessRequestId: phieuId }), () => setPhieuId(""))
            }
          >
            Cấp vai trò
          </button>
        </div>
      </div>

      <h2 className="mt-5 font-head text-sm font-bold text-ink">Vai trò nền tảng</h2>
      <p className="mt-1 text-xs text-ink-3">
        Quyết định quyền chung trên nền tảng (xem, thao tác, quản trị) — khác vai trò module ở trên. Đổi cũng phải
        có phiếu.
      </p>
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <select
          className={inputCls}
          value={roleNenTang}
          onChange={(e) => setRoleNenTang(e.target.value as PlatformRole)}
        >
          {VAI_TRO_NEN_TANG.map((v) => (
            <option key={v.value} value={v.value}>
              {v.label}
            </option>
          ))}
        </select>
        <select className={inputCls} value={phieuNenTangId} onChange={(e) => setPhieuNenTangId(e.target.value)}>
          <option value="">— phiếu F28.04 (bắt buộc) —</option>
          {phieu.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nhan}
            </option>
          ))}
        </select>
        <div>
          <button
            className={btnGhost}
            disabled={isPending || khongCoPhieu || roleNenTang === vaiTroNenTang}
            onClick={() =>
              run(
                () => doiVaiTroNenTang({ subjectId, roleMoi: roleNenTang, accessRequestId: phieuNenTangId }),
                () => setPhieuNenTangId(""),
              )
            }
          >
            Đổi vai trò nền tảng
          </button>
        </div>
      </div>
    </section>
  );
}

export function NutThuHoi({ assignmentId }: { assignmentId: string }) {
  const { isPending, error, run } = useRun();
  const [note, setNote] = useState("");

  return (
    <div className="flex flex-col gap-1">
      {error && <span className="max-w-64 text-xs text-crit">{error}</span>}
      <div className="flex flex-wrap items-center gap-1">
        <input
          placeholder="Lý do (bắt buộc)"
          className={inputCls}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button
          className={btnGhost}
          disabled={isPending}
          onClick={() => run(() => thuHoiVaiTro(assignmentId, note), () => setNote(""))}
        >
          Thu hồi
        </button>
      </div>
    </div>
  );
}
