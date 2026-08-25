"use client";

// Bảng nhân sự có chọn dòng để xuất biểu mẫu ra PDF. Hai biểu mẫu, hai bản chất khác nhau:
//
//   F03.01 Sơ yếu lý lịch — hồ sơ CÁ NHÂN: 1 dòng → một .pdf; nhiều dòng → .zip mỗi người một
//     file. Phải chọn ít nhất một dòng.
//   F03.08 Danh sách nhân sự — biểu mẫu TỔNG HỢP: luôn ra đúng một .pdf khổ ngang. Không chọn
//     dòng nào thì xuất toàn bộ danh sách.
//
// Xem src/app/api/m03/export/{f03-01,f03-08}/route.ts.
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
  // Mã biểu mẫu đang xuất ("F03.01" | "F03.08") — để chỉ khoá đúng nút đang chạy.
  const [exporting, setExporting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const allChecked = rows.length > 0 && selected.size === rows.length;
  // Giữ đúng thứ tự hiển thị trên bảng để thứ tự dòng/file khớp với những gì người dùng thấy.
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

  /**
   * @param form mã biểu mẫu, dùng làm khoá trạng thái nút và tên file dự phòng
   * @param requireSelection true với biểu mẫu hồ sơ cá nhân (F03.01) — không chọn thì không xuất
   */
  async function exportPdf(form: string, requireSelection: boolean) {
    if (exporting) return;
    if (requireSelection && selectedIds.length === 0) return;
    setExporting(form);
    setError(null);
    try {
      const slug = form.toLowerCase().replace(".", "-");
      const query = selectedIds.length > 0 ? `?ids=${selectedIds.join(",")}` : "";
      const res = await fetch(`/api/m03/export/${slug}${query}`);
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(body?.message ?? `Xuất PDF thất bại (mã ${res.status}).`);
        return;
      }
      // Tên file do máy chủ đặt trong Content-Disposition — đọc lại để lưu đúng tên.
      const disposition = res.headers.get("Content-Disposition") ?? "";
      const utf8 = /filename\*=UTF-8''([^;]+)/i.exec(disposition);
      const plain = /filename="([^"]+)"/i.exec(disposition);
      const fileName = utf8 ? decodeURIComponent(utf8[1]) : (plain?.[1] ?? `${form}.pdf`);

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
      setExporting(null);
    }
  }

  const BTN =
    "cursor-pointer rounded-lg border border-border-strong px-3 py-1.5 text-xs font-semibold text-ink-2 transition-colors hover:bg-sunk disabled:cursor-not-allowed disabled:opacity-45";

  return (
    <section className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-head text-sm font-bold text-ink">Nhân sự</h2>
        <div className="flex flex-wrap items-center gap-2">
          {selected.size > 0 && (
            <span className="text-xs text-ink-3">Đã chọn {selected.size} nhân sự</span>
          )}
          <button
            type="button"
            onClick={() => exportPdf("F03.01", true)}
            disabled={selected.size === 0 || exporting !== null}
            title="Sơ yếu lý lịch — mỗi nhân sự một file PDF riêng"
            className={BTN}
          >
            {exporting === "F03.01"
              ? "Đang tạo file…"
              : selected.size > 1
                ? `Xuất PDF F03.01 (${selected.size} file .zip)`
                : "Xuất PDF F03.01"}
          </button>
          <button
            type="button"
            onClick={() => exportPdf("F03.08", false)}
            disabled={rows.length === 0 || exporting !== null}
            title="Danh sách nhân sự — một file PDF khổ ngang cho cả danh sách"
            className={BTN}
          >
            {exporting === "F03.08"
              ? "Đang tạo file…"
              : selected.size > 0
                ? `Xuất PDF F03.08 (${selected.size} nhân sự)`
                : "Xuất PDF F03.08 (toàn bộ)"}
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
