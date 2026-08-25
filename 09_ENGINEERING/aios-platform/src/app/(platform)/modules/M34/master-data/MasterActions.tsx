"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { addMergeMap, createFinding, createMasterSource, recognizeMasterSource, resolveFinding, revokeMasterSource } from "@/lib/m34/actions";

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

export function NewMasterForm({ dataSets }: { dataSets: { id: string; code: string; name: string }[] }) {
  const { isPending, error, run } = useRun();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ masterType: "", dataSetId: "", sourceSystem: "", authorizedEditors: "", syncTargets: "" });

  return (
    <section className="rounded-xl border border-border bg-surface p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-head text-sm font-bold text-ink">Đề nghị công nhận nguồn sự thật (LĐV quyết — R9)</h2>
        <button className={btnGhost} onClick={() => setOpen((v) => !v)}>
          {open ? "Đóng" : "+ Đề nghị"}
        </button>
      </div>
      {error && <p className="mt-2 rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}
      {open && (
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <input placeholder="Loại dữ liệu chủ (vd Danh mục khách hàng) *" className={inputCls} value={form.masterType} onChange={(e) => setForm((f) => ({ ...f, masterType: e.target.value }))} />
          <select className={inputCls} value={form.dataSetId} onChange={(e) => setForm((f) => ({ ...f, dataSetId: e.target.value }))}>
            <option value="">— tập dữ liệu chủ (nhóm Dữ liệu chủ) —</option>
            {dataSets.map((d) => (
              <option key={d.id} value={d.id}>
                {d.code} — {d.name}
              </option>
            ))}
          </select>
          <input placeholder="Nguồn sự thật: hệ thống, bảng *" className={inputCls} value={form.sourceSystem} onChange={(e) => setForm((f) => ({ ...f, sourceSystem: e.target.value }))} />
          <input placeholder="Người được phân quyền thêm/sửa tại nguồn *" className={inputCls} value={form.authorizedEditors} onChange={(e) => setForm((f) => ({ ...f, authorizedEditors: e.target.value }))} />
          <input placeholder="Hệ thống đồng bộ từ nguồn (M37, phẩy)" className={`${inputCls} sm:col-span-2`} value={form.syncTargets} onChange={(e) => setForm((f) => ({ ...f, syncTargets: e.target.value }))} />
          <div>
            <button
              className={btn}
              disabled={isPending}
              onClick={() =>
                run(
                  () =>
                    createMasterSource({
                      ...form,
                      syncTargets: form.syncTargets.split(",").map((s) => s.trim()).filter(Boolean),
                    }),
                  () => setOpen(false),
                )
              }
            >
              Đề nghị công nhận
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export function MasterActions({ id, status, role }: { id: string; status: string; role: string | null }) {
  const { isPending, error, run } = useRun();
  const [reason, setReason] = useState("");
  const [merge, setMerge] = useState({ oldRef: "", survivingRef: "" });

  return (
    <span className="flex flex-wrap items-center gap-2">
      {error && <span className="max-w-64 text-xs text-crit">{error}</span>}
      {status === "DE_NGHI" && (
        <button className={btn} disabled={isPending} onClick={() => run(() => recognizeMasterSource(id))}>
          LĐV công nhận
        </button>
      )}
      {status === "DA_CONG_NHAN" && (
        <>
          <input placeholder="Bản ghi trùng (bị gộp)" className={inputCls} value={merge.oldRef} onChange={(e) => setMerge((m) => ({ ...m, oldRef: e.target.value }))} />
          <input placeholder="Bản ghi giữ lại" className={inputCls} value={merge.survivingRef} onChange={(e) => setMerge((m) => ({ ...m, survivingRef: e.target.value }))} />
          <button className={btnGhost} disabled={isPending} onClick={() => run(() => addMergeMap(id, merge), () => setMerge({ oldRef: "", survivingRef: "" }))}>
            Ghi hợp nhất
          </button>
          {role === "LDV" && (
            <>
              <input placeholder="Lý do thu hồi" className={inputCls} value={reason} onChange={(e) => setReason(e.target.value)} />
              <button className={btnGhost} disabled={isPending} onClick={() => run(() => revokeMasterSource(id, reason))}>
                Thu hồi
              </button>
            </>
          )}
        </>
      )}
    </span>
  );
}

export function NewFindingForm({ masterSourceId }: { masterSourceId: string }) {
  const { isPending, error, run } = useRun();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ description: "", usedBy: "", usedFor: "", diffNote: "", causedError: false, capaRef: "" });

  return (
    <span>
      <button className={btnGhost} onClick={() => setOpen((v) => !v)}>
        {open ? "Đóng" : "+ Ghi nhận bảng tra song song"}
      </button>
      {open && (
        <div className="mt-2 grid grid-cols-1 gap-2 rounded-lg border border-border p-2 sm:grid-cols-2">
          {error && <p className="rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-xs text-crit sm:col-span-2">{error}</p>}
          <input placeholder="Bảng tra/tệp là gì *" className={inputCls} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          <input placeholder="Ai, đơn vị đang dùng *" className={inputCls} value={form.usedBy} onChange={(e) => setForm((f) => ({ ...f, usedBy: e.target.value }))} />
          <input placeholder="Dùng làm căn cứ cho việc gì *" className={inputCls} value={form.usedFor} onChange={(e) => setForm((f) => ({ ...f, usedFor: e.target.value }))} />
          <input placeholder="Chênh lệch so với nguồn *" className={inputCls} value={form.diffNote} onChange={(e) => setForm((f) => ({ ...f, diffNote: e.target.value }))} />
          <label className="flex items-center gap-1 text-xs text-ink">
            <input type="checkbox" checked={form.causedError} onChange={(e) => setForm((f) => ({ ...f, causedError: e.target.checked }))} />
            Đã gây sai lệch kết quả/hồ sơ → KPH
          </label>
          {form.causedError && (
            <input placeholder="Số KPH (ETV.P13) *" className={inputCls} value={form.capaRef} onChange={(e) => setForm((f) => ({ ...f, capaRef: e.target.value }))} />
          )}
          <div>
            <button
              className={btn}
              disabled={isPending}
              onClick={() => run(() => createFinding({ masterSourceId, ...form, capaRef: form.capaRef || null }), () => setOpen(false))}
            >
              Ghi nhận — ngừng sử dụng ngay
            </button>
          </div>
        </div>
      )}
    </span>
  );
}

export function ResolveFindingButton({ id }: { id: string }) {
  const { isPending, error, run } = useRun();
  return (
    <span className="ml-2 inline-flex items-center gap-2">
      {error && <span className="text-xs text-crit">{error}</span>}
      <button className={btnGhost} disabled={isPending} onClick={() => run(() => resolveFinding(id))}>
        Đóng xử lý (QLCL)
      </button>
    </span>
  );
}
