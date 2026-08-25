"use client";

// Bảng nhân sự có chọn dòng để xuất biểu mẫu F03.01 thành PDF.
//
// Chọn 1 dòng → tải một file .pdf; chọn nhiều dòng → tải .zip mỗi người một file
// (xem src/app/api/m03/export/f03-01/route.ts).
import Link from "next/link";
import { useMemo, useState } from "react";
import { EMPLOYEE_STATUS_LABEL, EMPLOYMENT_TYPE_LABEL } from "@/lib/m03/labels";

export interface EmployeeRow {
  id: string;
  code: string;
  fullName: string;
  position: string;
  employmentType: string;
  status: string;
}

const STATUS_TONE: Record<string, string> = {
  THUVIEC: "bg-warn-soft text-warn",
  CHINHTHUC: "bg-good-soft text-good",
  DANGHIVIEC: "bg-sunk text-ink-2",
};

const TH = "border-b border-border px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-3";

export function EmployeeTable({ rows }: { rows: EmployeeRow[] }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allChecked = rows.length > 0 && selected.size === rows.length;
  // Giữ đúng thứ tự hiển thị trên bảng để thứ tự file trong .zip khớp với những gì người dùng thấy.
  const selectedIds = useMemo(() => rows.filter((r) => selected.has(r.id)).map((r) => r.id), [rows, selected]);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelected(allChecked ? new Set() : new Set(rows.map((r) => r.id)));
  }

  async function exportPdf() {
    if (selectedIds.length === 0 || exporting) return;
    setExporting(true);
    setError(null);
    try {
      const res = await fetch(`/api/m03/export/f03-01?ids=${selectedIds.join(",")}`);
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(body?.message ?? `Xuất PDF thất bại (mã ${res.status}).`);
        return;
      }
      // Tên file do máy chủ đặt trong Content-Disposition — đọc lại để lưu đúng tên.
      const disposition = res.headers.get("Content-Disposition") ?? "";
      const utf8 = /filename\*=UTF-8''([^;]+)/i.exec(disposition);
      const plain = /filename="([^"]+)"/i.exec(disposition);
      const fileName = utf8 ? decodeURIComponent(utf8[1]) : (plain?.[1] ?? "F03.01.pdf");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      setError("Không kết nối được máy chủ để xuất PDF.");
    } finally {
      setExporting(false);
    }
  }

  return (
    <section className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-head text-sm font-bold text-ink">Nhân sự</h2>
        <div className="flex items-center gap-2">
          {selected.size > 0 && (
            <span className="text-xs text-ink-3">Đã chọn {selected.size} nhân sự</span>
          )}
          <button
            type="button"
            onClick={exportPdf}
            disabled={selected.size === 0 || exporting}
            className="cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-xs font-semibold text-ink-2 transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-45"
          >
            {exporting
              ? "Đang tạo file…"
              : selected.size > 1
                ? `Xuất PDF F03.01 (${selected.size} file .zip)`
                : "Xuất PDF F03.01"}
          </button>
        </div>
      </div>

      {error && (
        <p role="alert" className="rounded-lg bg-crit-soft px-3 py-2 text-xs text-crit">
          {error}
        </p>
      )}

      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full min-w-[40rem] text-sm">
          <thead>
            <tr>
              <th className={`${TH} w-10`}>
                <input
                  type="checkbox"
                  checked={allChecked}
                  onChange={toggleAll}
                  aria-label="Chọn tất cả nhân sự"
                  className="cursor-pointer accent-accent"
                />
              </th>
              <th className={TH}>Mã</th>
              <th className={TH}>Họ tên</th>
              <th className={TH}>Vị trí</th>
              <th className={TH}>Loại</th>
              <th className={TH}>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((e) => (
              <tr
                key={e.id}
                className={`border-b border-border last:border-0 hover:bg-sunk ${selected.has(e.id) ? "bg-sunk" : ""}`}
              >
                <td className="px-3 py-2.5">
                  <input
                    type="checkbox"
                    checked={selected.has(e.id)}
                    onChange={() => toggle(e.id)}
                    aria-label={`Chọn ${e.fullName}`}
                    className="cursor-pointer accent-accent"
                  />
                </td>
                <td className="px-3 py-2.5">
                  <Link
                    href={`/modules/M03/employee/${e.id}`}
                    className="whitespace-nowrap font-mono text-xs font-medium text-accent hover:underline"
                  >
                    {e.code}
                  </Link>
                </td>
                <td className="px-3 py-2.5 text-ink">{e.fullName}</td>
                <td className="px-3 py-2.5 text-ink-2">{e.position}</td>
                <td className="px-3 py-2.5 text-ink-2">
                  {EMPLOYMENT_TYPE_LABEL[e.employmentType] ?? e.employmentType}
                </td>
                <td className="px-3 py-2.5">
                  <span
                    className={`inline-flex items-center whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_TONE[e.status] ?? "bg-sunk text-ink-2"}`}
                  >
                    {EMPLOYEE_STATUS_LABEL[e.status] ?? e.status}
                  </span>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-8 text-center text-sm text-ink-3">
                  Chưa có hồ sơ nhân sự nào — tạo từ đề xuất tuyển dụng đã duyệt.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
