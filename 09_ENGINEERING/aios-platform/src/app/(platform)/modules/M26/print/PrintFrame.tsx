"use client";

// Khung in dùng chung cho bản xuất biểu mẫu F26.xx: giữ đúng phần đầu của biểu mẫu gốc trong
// 06_SHARED_RESOURCES/01_Forms (mã số, lần ban hành, ngày ban hành) và ẩn phần điều hướng khi in.
export function PrintFrame({
  formCode,
  formName,
  issueLabel = "01",
  issueDate = "23/08/2026",
  children,
}: {
  formCode: string;
  formName: string;
  issueLabel?: string;
  issueDate?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="print-frame flex flex-col gap-4">
      <style
        dangerouslySetInnerHTML={{
          __html: `
@media print {
  body { background: #fff; }
  aside, header, nav, .no-print { display: none !important; }
  .print-frame { color: #000; }
  .print-frame table { border-collapse: collapse; width: 100%; font-size: 10pt; }
  .print-frame th, .print-frame td { border: 1px solid #000; padding: 4px 6px; }
  .print-frame h1 { font-size: 14pt; }
  @page { size: A4 landscape; margin: 12mm; }
}`,
        }}
      />

      <div className="no-print flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-ink-3">
          Bản xuất theo biểu mẫu gốc <strong className="text-ink">{formCode}</strong> (
          <code>06_SHARED_RESOURCES/01_Forms</code>). Bản in là hồ sơ theo ETV.MP15.
        </p>
        <button
          onClick={() => window.print()}
          className="cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-ink hover:opacity-90"
        >
          In / Lưu PDF
        </button>
      </div>

      <div className="rounded-xl border border-border bg-surface p-6 print:border-0 print:p-0">
        <table className="mb-4 w-64 text-xs">
          <tbody>
            <tr>
              <td className="border border-border px-2 py-1 font-semibold">Mã số</td>
              <td className="border border-border px-2 py-1">{formCode}</td>
            </tr>
            <tr>
              <td className="border border-border px-2 py-1 font-semibold">Lần ban hành</td>
              <td className="border border-border px-2 py-1">{issueLabel}</td>
            </tr>
            <tr>
              <td className="border border-border px-2 py-1 font-semibold">Ngày ban hành</td>
              <td className="border border-border px-2 py-1">{issueDate}</td>
            </tr>
          </tbody>
        </table>

        <p className="text-center text-[11px] font-medium uppercase tracking-wide text-ink-2">
          Liên hiệp các Hội Khoa học và Kỹ thuật Việt Nam
          <br />
          Viện Kiểm định Công nghệ và Môi trường
        </p>
        <h1 className="mt-3 text-center font-head text-xl font-bold uppercase text-ink">{formName}</h1>

        <div className="mt-5 flex flex-col gap-5 text-sm text-ink">{children}</div>
      </div>
    </div>
  );
}

export function SignatureRow({ columns }: { columns: string[] }) {
  return (
    <table className="mt-6 w-full text-center text-sm">
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c} className="border border-border px-2 py-2 font-semibold">
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {columns.map((c) => (
            <td key={c} className="border border-border px-2 pb-12 pt-2 align-top text-xs text-ink-3">
              Ngày ..../..../........
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
