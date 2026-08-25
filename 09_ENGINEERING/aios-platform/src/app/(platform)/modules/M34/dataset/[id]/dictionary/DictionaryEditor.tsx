"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { activateDictionaryVersion, createDictionaryVersion, type DictFieldInput } from "@/lib/m34/actions";

const btn =
  "cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
const btnGhost =
  "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-xs text-ink transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-50";
const inputCls = "rounded-lg border border-border bg-bg px-2 py-1 text-xs text-ink outline-none focus:border-accent-line";

const emptyField = (): DictFieldInput => ({ fieldName: "", meaning: "", dataType: "", unit: "", validDomain: "", required: false, validationRule: "", example: "" });

export function DictionaryEditor({ dataSetId, nextVersion }: { dataSetId: string; nextVersion: number }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [changeRef, setChangeRef] = useState("");
  const [fields, setFields] = useState<DictFieldInput[]>([emptyField()]);

  const setF = (i: number, patch: Partial<DictFieldInput>) => setFields((fs) => fs.map((f, j) => (i === j ? { ...f, ...patch } : f)));

  const submit = () => {
    setError(null);
    startTransition(async () => {
      const r = await createDictionaryVersion(dataSetId, { changeRef: changeRef || null, fields });
      if (!r.ok) setError(r.message);
      else {
        setOpen(false);
        setFields([emptyField()]);
        router.refresh();
      }
    });
  };

  return (
    <section className="rounded-xl border border-border bg-surface p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-head text-sm font-bold text-ink">Tạo phiên bản {nextVersion}</h2>
        <button className={btnGhost} onClick={() => setOpen((v) => !v)}>
          {open ? "Đóng" : "+ Soạn phiên bản mới"}
        </button>
      </div>
      {error && <p className="mt-2 rounded-lg border border-crit/30 bg-crit-soft px-3 py-2 text-sm text-crit">{error}</p>}
      {open && (
        <div className="mt-3 flex flex-col gap-2">
          {nextVersion >= 2 && (
            <input placeholder="Phiếu thay đổi cấu trúc F30.02 (bắt buộc từ v02 — R3)" className={inputCls} value={changeRef} onChange={(e) => setChangeRef(e.target.value)} />
          )}
          {fields.map((f, i) => (
            <div key={i} className="grid grid-cols-2 gap-2 rounded-lg border border-border p-2 sm:grid-cols-4">
              <input placeholder="Tên trường *" className={inputCls} value={f.fieldName} onChange={(e) => setF(i, { fieldName: e.target.value })} />
              <input placeholder="Ý nghĩa nghiệp vụ *" className={inputCls} value={f.meaning} onChange={(e) => setF(i, { meaning: e.target.value })} />
              <input placeholder="Kiểu dữ liệu *" className={inputCls} value={f.dataType} onChange={(e) => setF(i, { dataType: e.target.value })} />
              <input placeholder="Đơn vị đo" className={inputCls} value={f.unit ?? ""} onChange={(e) => setF(i, { unit: e.target.value })} />
              <input placeholder="Miền giá trị hợp lệ" className={inputCls} value={f.validDomain ?? ""} onChange={(e) => setF(i, { validDomain: e.target.value })} />
              <label className="flex items-center gap-1 text-xs text-ink">
                <input type="checkbox" checked={f.required} onChange={(e) => setF(i, { required: e.target.checked })} /> Bắt buộc
              </label>
              <input placeholder="Quy tắc kiểm tra" className={inputCls} value={f.validationRule ?? ""} onChange={(e) => setF(i, { validationRule: e.target.value })} />
              <input placeholder="Ví dụ" className={inputCls} value={f.example ?? ""} onChange={(e) => setF(i, { example: e.target.value })} />
            </div>
          ))}
          <div className="flex gap-2">
            <button className={btnGhost} onClick={() => setFields((fs) => [...fs, emptyField()])}>
              + Thêm trường
            </button>
            <button className={btn} disabled={isPending} onClick={submit}>
              Lưu phiên bản (Nháp)
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export function ActivateDictButton({ versionId }: { versionId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  return (
    <span className="flex items-center gap-2">
      {error && <span className="text-xs text-crit">{error}</span>}
      <button
        className={btn}
        disabled={isPending}
        onClick={() => {
          setError(null);
          startTransition(async () => {
            const r = await activateDictionaryVersion(versionId);
            if (!r.ok) setError(r.message);
            else router.refresh();
          });
        }}
      >
        Kích hoạt
      </button>
    </span>
  );
}
