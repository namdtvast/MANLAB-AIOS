// Khung HTML dùng chung cho MỌI bản xuất biểu mẫu ETV (F03.01, F26.xx, …).
//
// Tự chứa hoàn toàn: CSS nhúng sẵn, không tải font/ảnh từ mạng — nhờ vậy Chromium render được
// ngay bằng page.setContent() mà không cần đăng nhập lại hay chờ tài nguyên ngoài.
//
// Trình bày theo Nghị định 30/2020/NĐ-CP: Times New Roman 13pt, khổ A4, lề trên 20mm /
// dưới 20mm / trái 30mm / phải 15mm.

/** Chèn giá trị vào HTML — mọi dữ liệu từ DB phải đi qua hàm này. */
export function esc(v: unknown): string {
  if (v === null || v === undefined) return "";
  return String(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Ô dữ liệu còn trống trong biểu mẫu — in ra dòng kẻ mờ để điền tay. */
export const BLANK = '<span class="blank"></span>';

/** Giá trị hoặc ô trống nếu chưa số hoá được trường đó. */
export function valOrBlank(v: unknown): string {
  const s = v === null || v === undefined ? "" : String(v).trim();
  return s === "" ? BLANK : esc(s);
}

export function formatDate(d: Date | null | undefined): string {
  if (!d) return "";
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getUTCFullYear()}`;
}

const BASE_CSS = `
@page { size: A4 portrait; margin: 20mm 15mm 20mm 30mm; }
* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: "Times New Roman", Times, serif;
  font-size: 13pt;
  line-height: 1.4;
  color: #000;
  background: #fff;
}
.sheet { page-break-after: always; }
.sheet:last-child { page-break-after: auto; }

.form-id { border-collapse: collapse; width: 62mm; font-size: 10pt; margin-bottom: 6mm; }
table.head-row .form-id { margin-bottom: 0; }
.form-id td { border: 1px solid #000; padding: 1.2mm 2mm; }
.form-id td:first-child { font-weight: bold; width: 28mm; }

.org { text-align: center; font-size: 11pt; line-height: 1.35; text-transform: uppercase; }
.org strong { font-size: 12pt; }
h1.form-title {
  text-align: center; text-transform: uppercase; font-size: 16pt;
  margin: 5mm 0 2mm; letter-spacing: .3px;
}
/* Khối đầu trang: bảng mã số bên trái, ô dán ảnh bên phải (biểu mẫu có ảnh chân dung). */
table.head-row { width: 100%; border-collapse: collapse; margin-bottom: 6mm; }
table.head-row > tbody > tr > td { border: 0; padding: 0; vertical-align: top; }
table.head-row td.photo-cell { text-align: right; width: 34mm; }
.photo-box {
  display: inline-block; width: 30mm; height: 40mm; border: 1px solid #000;
  font-size: 9pt; text-align: center; color: #444;
  line-height: 40mm; /* căn giữa dòng chữ trong ô */
}
h2.section {
  font-size: 13pt; font-weight: bold; text-transform: uppercase;
  margin: 5mm 0 2mm; page-break-after: avoid;
}
table.grid { border-collapse: collapse; width: 100%; font-size: 12pt; page-break-inside: avoid; }
table.grid th, table.grid td { border: 1px solid #000; padding: 1.5mm 2mm; vertical-align: top; }
table.grid th { background: #f0f0f0; font-weight: bold; text-align: center; }
table.grid td.label { width: 52mm; font-weight: normal; }
table.grid td.empty-row { height: 8mm; }

/* Ô chưa có dữ liệu trong hệ thống: kẻ dòng chấm để điền tay khi in. */
.blank {
  display: inline-block; min-width: 30mm; width: 92%;
  border-bottom: 1px dotted #666; height: 1em; vertical-align: baseline;
}
p.commit { margin: 3mm 0; text-align: justify; }
table.sign { border-collapse: collapse; width: 100%; margin-top: 6mm; page-break-inside: avoid; }
table.sign td { width: 33.33%; text-align: center; vertical-align: top; padding: 2mm; font-size: 12pt; }
table.sign td .role { font-weight: bold; text-transform: uppercase; font-size: 11pt; }
table.sign td .hint { font-style: italic; font-size: 10pt; color: #333; }
table.sign td .space { height: 22mm; }
.footnote {
  margin-top: 5mm; font-size: 9pt; font-style: italic; color: #333;
  border-top: .5pt solid #999; padding-top: 1.5mm;
}
`;

export interface FormHeader {
  /** Mã biểu mẫu in ở bảng góc trên, vd "ETV.P.F03.01" */
  code: string;
  /** Tên biểu mẫu in làm tiêu đề, vd "Sơ yếu lý lịch" */
  title: string;
  revision: string;
  effectiveDate: string;
  /** Biểu mẫu có ô dán ảnh chân dung ở góc phải trên (F03.01) */
  photoBox?: boolean;
}

/** Bảng mã số / lần ban hành / ngày ban hành + quốc hiệu đơn vị + tiêu đề biểu mẫu. */
export function formHeader(h: FormHeader): string {
  const idTable = `<table class="form-id"><tbody>
  <tr><td>Mã số</td><td>${esc(h.code)}</td></tr>
  <tr><td>Lần ban hành</td><td>${esc(h.revision)}</td></tr>
  <tr><td>Ngày ban hành</td><td>${esc(h.effectiveDate)}</td></tr>
</tbody></table>`;

  // Có ô ảnh thì xếp cạnh bảng mã số cho khỏi chiếm chỗ của mục I; không có thì để nguyên
  // bảng mã số ở góc trái.
  const head = h.photoBox
    ? `<table class="head-row"><tbody><tr>
  <td>${idTable}</td>
  <td class="photo-cell"><span class="photo-box">Ảnh 3x4</span></td>
</tr></tbody></table>`
    : idTable;

  return `
${head}
<div class="org">
  Liên hiệp các Hội Khoa học và Kỹ thuật Việt Nam<br />
  <strong>Viện Kiểm định Công nghệ và Môi trường</strong>
</div>
<h1 class="form-title">${esc(h.title)}</h1>`;
}

/** Hàng chữ ký cuối biểu mẫu. */
export function signatureRow(roles: { role: string; hint?: string }[]): string {
  const cells = roles
    .map(
      (r) => `<td>
    <div class="role">${esc(r.role)}</div>
    <div class="hint">${esc(r.hint ?? "(Ký, ghi rõ họ tên)")}</div>
    <div class="space"></div>
  </td>`,
    )
    .join("");
  return `<table class="sign"><tbody><tr>${cells}</tr></tbody></table>`;
}

/**
 * Gói nhiều "tờ" biểu mẫu thành một tài liệu HTML hoàn chỉnh.
 * Mỗi phần tử của `sheets` chiếm trang riêng khi in.
 */
export function formDocument(docTitle: string, sheets: string[]): string {
  return `<!doctype html>
<html lang="vi"><head><meta charset="utf-8" />
<title>${esc(docTitle)}</title>
<style>${BASE_CSS}</style>
</head><body>
${sheets.map((s) => `<section class="sheet">${s}</section>`).join("\n")}
</body></html>`;
}
