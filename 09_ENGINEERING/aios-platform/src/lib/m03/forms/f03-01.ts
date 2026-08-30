// Bản xuất biểu mẫu ETV.P.F 03.01 — SƠ YẾU LÝ LỊCH.
//
// Bố cục bám đúng biểu mẫu gốc 06_SHARED_RESOURCES/01_Forms/F03_NhanSu/ETV.P.F03.01_SoYeuLyLich.md
// (mục I–VI, giữ nguyên thứ tự và tên trường). Trường nào M03Employee đã số hoá thì điền sẵn;
// trường nào chưa có trong DB (ngày sinh, CCCD, nguyên quán, trình độ, quan hệ gia đình…) thì
// in ra dòng chấm để điền tay — KHÔNG bỏ mục, vì đoàn đánh giá đối chiếu bản in với biểu mẫu
// đã ban hành.
//
// Mã số/lần ban hành/ngày ban hành lấy từ PlatformModule.forms (seed nạp từ frontmatter của
// chính file biểu mẫu) — xem src/lib/forms/meta.ts, không viết cứng ở đây.
import type { M03ContractType, M03EmploymentType } from "@/generated/prisma/enums";
import { CONTRACT_TYPE_LABEL, EMPLOYEE_STATUS_LABEL, EMPLOYMENT_TYPE_LABEL } from "@/lib/m03/labels";
import type { FormMeta } from "@/lib/forms/meta";
import { BLANK, esc, formatDate, formHeader, signatureRow, valOrBlank } from "@/lib/forms/layout";

/** Mã biểu mẫu như khai trong manifest MP03 — khoá để tra metadata qua getFormMeta(). */
export const F03_01_FORM_CODE = "ETV.P.F03.01";

/** Dữ liệu tối thiểu để dựng một tờ F03.01 — khớp select trong route xuất PDF. */
export interface F0301Employee {
  code: string;
  fullName: string;
  position: string;
  department: string;
  employmentType: M03EmploymentType;
  status: string;
  hireDate: Date;
  laborContracts: { contractType: M03ContractType; status: string; effectiveDate: Date | null }[];
}

/** Hàng "nhãn | giá trị" của các bảng mục I, II, V. */
function row(label: string, value: string): string {
  return `<tr><td class="label">${esc(label)}</td><td>${value}</td></tr>`;
}

/** Các dòng trống để viết tay trong bảng nhiều cột (mục III, IV). */
function emptyRows(cols: number, count: number): string {
  const cells = `<td class="empty-row"></td>`.repeat(cols);
  return `<tr>${cells}</tr>`.repeat(count);
}

/**
 * Hợp đồng lao động đang hiệu lực; nếu chưa có thì lấy hợp đồng mới nhất để bản in vẫn
 * phản ánh đúng hiện trạng hồ sơ.
 */
function currentContractLabel(e: F0301Employee): string {
  const active = e.laborContracts.find((c) => c.status === "ACTIVE") ?? e.laborContracts[0];
  if (!active) return BLANK;
  const type = CONTRACT_TYPE_LABEL[active.contractType] ?? active.contractType;
  const from = active.effectiveDate ? ` (từ ${formatDate(active.effectiveDate)})` : "";
  return esc(`${type}${from}`);
}

/** Một tờ F03.01 hoàn chỉnh cho một nhân sự. */
export function renderF0301Sheet(e: F0301Employee, meta: FormMeta): string {
  return `
${formHeader({
  code: meta.code,
  title: meta.title || "Sơ yếu lý lịch",
  revision: meta.revision,
  effectiveDate: meta.effectiveDate,
  photoBox: true,
})}

<h2 class="section">I. Thông tin cá nhân</h2>
<table class="grid"><tbody>
  ${row("Họ và tên", `<strong>${esc(e.fullName)}</strong>`)}
  ${row("Mã số nhân viên", esc(e.code))}
  ${row("Ngày tháng năm sinh", BLANK)}
  ${row("Giới tính", BLANK)}
  ${row("Căn cước công dân", `${BLANK} cấp ngày ......../......../.......... tại ${BLANK}`)}
  ${row("Nguyên quán", BLANK)}
  ${row("Chỗ ở hiện nay", BLANK)}
  ${row("Điện thoại liên hệ", BLANK)}
  ${row("Email", BLANK)}
  ${row("Số tài khoản / Ngân hàng", `${BLANK} / ${BLANK}`)}
  ${row("Khi cần báo tin cho", BLANK)}
  ${row("Tình trạng sức khoẻ", BLANK)}
</tbody></table>

<h2 class="section">II. Trình độ</h2>
<table class="grid"><tbody>
  ${row("Trình độ học vấn", BLANK)}
  ${row("Chuyên ngành", BLANK)}
  ${row("Trình độ tin học", BLANK)}
  ${row("Trình độ ngoại ngữ", BLANK)}
  ${row("Văn bằng, chứng chỉ liên quan", "<em>(đính kèm bản photo công chứng — theo ETV.P03 mục 6.1)</em>")}
</tbody></table>

<h2 class="section">III. Quá trình đào tạo, công tác</h2>
<table class="grid">
  <thead><tr>
    <th style="width:22mm">Từ ngày</th><th style="width:22mm">Đến ngày</th>
    <th>Đơn vị / Trường học</th><th>Chức danh / Ngành học</th><th style="width:24mm">Ghi chú</th>
  </tr></thead>
  <tbody>
    <tr>
      <td>${esc(formatDate(e.hireDate))}</td>
      <td>${esc(e.status === "DANGHIVIEC" ? "" : "nay")}</td>
      <td>Viện Kiểm định Công nghệ và Môi trường</td>
      <td>${esc(e.position)}</td>
      <td>${esc(EMPLOYEE_STATUS_LABEL[e.status] ?? e.status)}</td>
    </tr>
    ${emptyRows(5, 4)}
  </tbody>
</table>

<h2 class="section">IV. Quan hệ gia đình</h2>
<table class="grid">
  <thead><tr>
    <th style="width:32mm">Quan hệ</th><th>Họ và tên</th>
    <th style="width:24mm">Năm sinh</th><th>Nghề nghiệp / Nơi công tác</th>
  </tr></thead>
  <tbody>${emptyRows(4, 5)}</tbody>
</table>

<h2 class="section">V. Vị trí công tác tại ETV</h2>
<table class="grid"><tbody>
  ${row("Bộ phận", valOrBlank(e.department))}
  ${row("Chức vụ", valOrBlank(e.position))}
  ${row("Ngày tiếp nhận", esc(formatDate(e.hireDate)))}
  ${row("Hình thức làm việc", esc(EMPLOYMENT_TYPE_LABEL[e.employmentType] ?? e.employmentType))}
  ${row("Loại hợp đồng hiện tại", currentContractLabel(e))}
</tbody></table>

<h2 class="section">VI. Cam kết</h2>
<p class="commit">
  Tôi xin cam đoan những lời khai trên là đúng sự thật, nếu có gì sai tôi xin chịu trách nhiệm
  hoàn toàn.
</p>
${signatureRow([
  { role: "Ngày khai", hint: "Ngày ..../..../........" },
  { role: "Người khai", hint: "(Ký, ghi rõ họ tên)" },
  { role: "Xác nhận của bộ phận nhân sự", hint: "(Ký, ghi rõ họ tên)" },
])}

<p class="footnote">
  Bản xuất từ MANLAB-AIOS — module M03 (Nhân sự), theo biểu mẫu ${esc(meta.code)} lần ban hành
  ${esc(meta.revision)}. Các ô để trống là trường chưa được số hoá trong hệ thống, điền tay khi
  hoàn thiện hồ sơ. Bản in là hồ sơ, kiểm soát theo ETV.MP15.
</p>`;
}

/** Tên file PDF cho một nhân sự — bỏ dấu để an toàn trên mọi hệ điều hành. */
export function f0301FileName(e: F0301Employee, meta: FormMeta): string {
  const slug = e.fullName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[^A-Za-z0-9]+/g, "")
    .trim();
  const code = meta.code.replace(/\s+/g, "").replace(/^ETV\.P\./, "");
  return `${code}_SoYeuLyLich_${e.code}_${slug}.pdf`;
}
