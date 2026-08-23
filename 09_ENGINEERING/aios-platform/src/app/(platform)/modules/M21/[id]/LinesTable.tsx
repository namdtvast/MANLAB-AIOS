"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { M21LineResult } from "@/generated/prisma/enums";
import { addLine, deleteLine, updateLine } from "@/lib/m21/actions";
import { gateCheck, type CatalogItemForGate } from "@/lib/m21/rules";
import { CATALOG, type CatalogItem } from "@/lib/m21/catalog";
import { LINE_RESULT_LABEL } from "@/lib/m21/labels";

interface LineRow {
  id: string;
  ten: string;
  linhVuc: string;
  phamVi: string;
  ccx: string;
  quyTrinh: string;
  nguoiTH: string;
  ghiChu: string;
  ketQua: M21LineResult;
  lyDo: string;
  bangChung: string;
  bcFileName: string;
  linked: boolean;
  catalogRef: string;
}

const inputCls =
  "w-full rounded-md border border-border bg-bg px-2 py-1 text-xs text-ink outline-none transition-colors focus:border-accent-line";

function toGateItem(c: CatalogItem): CatalogItemForGate {
  return { trangThaiPTD: c.trangThaiPTD, quyTrinh: c.quyTrinh, nangLucCode: c.nangLucCode, dichVu: c.dichVu, cmcMax: c.cmcMax, phamVi: c.phamVi };
}

function CatalogPicker({ onPick, onClose }: { onPick: (item: CatalogItem) => void; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q ? CATALOG.filter((c) => c.ten.toLowerCase().includes(q) || c.linhVuc.toLowerCase().includes(q)) : CATALOG;
    return list.slice(0, 30);
  }, [query]);

  return (
    <div className="mt-2 rounded-lg border border-dashed border-accent-line bg-accent-soft p-3">
      <div className="mb-2 flex items-center gap-2">
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm trong Danh mục Phương tiện đo…"
          className="flex-1 rounded-md border border-border bg-surface px-2 py-1.5 text-xs text-ink outline-none focus:border-accent-line"
        />
        <button type="button" onClick={onClose} className="cursor-pointer text-xs font-medium text-ink-2 hover:text-ink">
          Đóng
        </button>
      </div>
      <div className="flex max-h-64 flex-col gap-1 overflow-y-auto">
        {results.map((c, i) => {
          const gate = gateCheck(toGateItem(c));
          return (
            <button
              key={i}
              type="button"
              onClick={() => onPick(c)}
              className={`flex cursor-pointer flex-col gap-0.5 rounded-md border border-border bg-surface px-2.5 py-1.5 text-left text-xs hover:border-accent-line ${gate.pass ? "" : "opacity-70"}`}
            >
              <span className="font-semibold text-ink">
                {c.ten} <span className="font-normal text-ink-3">· {c.linhVuc} · {c.dichVu}</span>
              </span>
              <span className="text-ink-2">{c.phamVi}</span>
              {!gate.pass && <span className="text-crit">{gate.reasons.join("; ")}</span>}
            </button>
          );
        })}
        {results.length === 0 && <p className="px-2 py-4 text-center text-xs text-ink-3">Không tìm thấy.</p>}
      </div>
    </div>
  );
}

function LineRowEditor({ line, editable }: { line: LineRow; editable: boolean }) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [pickerOpen, setPickerOpen] = useState(false);
  const needsReasonEvidence = line.ketQua === "KHONG" || line.ketQua === "DIEUCHINH";

  const patch = (data: Partial<LineRow>) => {
    startTransition(async () => {
      await updateLine(line.id, data);
      router.refresh();
    });
  };

  const onDelete = () => {
    startTransition(async () => {
      await deleteLine(line.id);
      router.refresh();
    });
  };

  const onPick = (item: CatalogItem) => {
    setPickerOpen(false);
    patch({ ten: item.ten, linhVuc: item.linhVuc, phamVi: item.phamVi, quyTrinh: item.quyTrinh, ccx: item.mpelod, linked: true, catalogRef: item.ten });
  };

  return (
    <div className="rounded-lg border border-border bg-surface p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="grid flex-1 grid-cols-1 gap-2 sm:grid-cols-3">
          <label className="flex flex-col gap-0.5 text-[11px] font-medium text-ink-2">
            Tên đối tượng
            <input disabled={!editable} defaultValue={line.ten} onBlur={(e) => patch({ ten: e.target.value })} className={inputCls} />
          </label>
          <label className="flex flex-col gap-0.5 text-[11px] font-medium text-ink-2">
            Lĩnh vực
            <input disabled={!editable} defaultValue={line.linhVuc} onBlur={(e) => patch({ linhVuc: e.target.value })} className={inputCls} />
          </label>
          <label className="flex flex-col gap-0.5 text-[11px] font-medium text-ink-2">
            Phạm vi đo
            <input disabled={!editable} defaultValue={line.phamVi} onBlur={(e) => patch({ phamVi: e.target.value })} className={inputCls} />
          </label>
          <label className="flex flex-col gap-0.5 text-[11px] font-medium text-ink-2">
            Cấp/ĐCX/MPE/LOD
            <input disabled={!editable} defaultValue={line.ccx} onBlur={(e) => patch({ ccx: e.target.value })} className={inputCls} />
          </label>
          <label className="flex flex-col gap-0.5 text-[11px] font-medium text-ink-2">
            Quy trình thực hiện
            <input disabled={!editable} defaultValue={line.quyTrinh} onBlur={(e) => patch({ quyTrinh: e.target.value })} className={inputCls} />
          </label>
          <label className="flex flex-col gap-0.5 text-[11px] font-medium text-ink-2">
            Người thực hiện
            <input disabled={!editable} defaultValue={line.nguoiTH} onBlur={(e) => patch({ nguoiTH: e.target.value })} className={inputCls} />
          </label>
          <label className="flex flex-col gap-0.5 text-[11px] font-medium text-ink-2">
            Kết quả
            <select
              disabled={!editable}
              value={line.ketQua}
              onChange={(e) => patch({ ketQua: e.target.value as M21LineResult })}
              className={inputCls}
            >
              {Object.entries(LINE_RESULT_LABEL).map(([k, label]) => (
                <option key={k} value={k}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          {needsReasonEvidence && (
            <>
              <label className="flex flex-col gap-0.5 text-[11px] font-medium text-ink-2">
                Lý do <span className="text-crit">*</span>
                <input disabled={!editable} defaultValue={line.lyDo} onBlur={(e) => patch({ lyDo: e.target.value })} className={inputCls} />
              </label>
              <label className="flex flex-col gap-0.5 text-[11px] font-medium text-ink-2">
                Bằng chứng <span className="text-crit">*</span>
                <input disabled={!editable} defaultValue={line.bangChung} onBlur={(e) => patch({ bangChung: e.target.value })} className={inputCls} />
              </label>
            </>
          )}
        </div>
        {editable && (
          <button type="button" onClick={onDelete} className="cursor-pointer text-xs font-semibold text-crit hover:underline">
            Xóa
          </button>
        )}
      </div>
      {editable && (
        <div className="mt-2">
          {line.linked && <span className="mr-2 rounded bg-accent-soft px-1.5 py-0.5 text-[10px] font-semibold text-accent">Từ danh mục PTĐ</span>}
          <button type="button" onClick={() => setPickerOpen((v) => !v)} className="cursor-pointer text-xs font-medium text-accent underline">
            {pickerOpen ? "Ẩn danh mục" : "Chọn từ Danh mục Phương tiện đo"}
          </button>
          {pickerOpen && <CatalogPicker onPick={onPick} onClose={() => setPickerOpen(false)} />}
        </div>
      )}
    </div>
  );
}

export function LinesTable({
  recordId,
  editable,
  lines,
}: {
  recordId: string;
  loai: string;
  editable: boolean;
  lines: LineRow[];
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const onAdd = () => {
    startTransition(async () => {
      await addLine(recordId);
      router.refresh();
    });
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-head text-sm font-bold text-ink">Dòng đối tượng ({lines.length})</h2>
        {editable && (
          <button type="button" onClick={onAdd} className="cursor-pointer text-xs font-semibold text-accent hover:underline">
            + Thêm dòng
          </button>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {lines.map((l) => (
          <LineRowEditor key={l.id} line={l} editable={editable} />
        ))}
        {lines.length === 0 && <p className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-ink-3">Chưa có dòng đối tượng nào.</p>}
      </div>
    </div>
  );
}
