// Bản xuất biểu mẫu ETV.P.F 03.08 — DANH SÁCH NHÂN SỰ.
//
// Khác F03.01 ở chỗ đây là biểu mẫu TỔNG HỢP: một tờ chứa cả danh sách, khổ ngang, 11 cột đúng
// thứ tự biểu mẫu gốc 06_SHARED_RESOURCES/01_Forms/F03_NhanSu/ETV.P.F03.08_DanhSachNhanSu.md.
//
// Cột "Ngày sinh" và "Ghi chú" chưa có trong M03Employee nên để ô trống điền tay — giữ nguyên cột
// vì đoàn đánh giá đối chiếu bản in với biểu mẫu đã ban hành.
//
// Mã số/lần ban hành/ngày ban hành lấy từ PlatformModule.forms (seed nạp từ frontmatter của chính
// file biểu mẫu) — xem src/lib/forms/meta.ts, không viết cứng ở đây.
import type { M03ContractType } from "@/generated/prisma/enums";
import { CONTRACT_TYPE_LABEL } from "@/lib/m03/labels";
import type { FormMeta } from "@/lib/forms/meta";
import { esc, formatDate, formHeader, signatureRow } from "@/lib/forms/layout";

/** Mã biểu mẫu như khai trong manifest MP03 — khoá để tra metadata qua getFormMeta(). */
export const F03_08_FORM_CODE = "ETV.P.F03.08";

/** Dữ liệu một dòng danh sách — khớp select trong route xuất PDF. */
export interface F0308Employee {
  code: string;
  fullName: string;
  position: string;
  department: string;
  status: string;
  laborContracts: {
    contractType: M03ContractType;
    status: string;
    effectiveDate: Date | null;
    expiryDate: Date | null;
  }[];
}

/**
 * Hợp đồng lao động đang hiệu lực; nếu chưa có thì lấy hợp đồng mới nhất để danh sách vẫn phản
 * ánh đúng hiện trạng hồ sơ (giống cách F03.01 chọn hợp đồng).
 */
function currentContract(e: F0308Employee) {
  return e.laborContracts.find((c) => c.status === "ACTIVE") ?? e.laborContracts[0] ?? null;
}

/**
 * Cột "Trạng thái" của biểu mẫu gốc là ba ô tick — giữ nguyên hình thức đó và đánh dấu ô đúng
 * theo dữ liệu, thay vì thay bằng một chữ. Bản in vẫn tick tay được nếu cần sửa.
 */
function statusBoxes(status: string): string {
  const box = (on: boolean, label: string) => `${on ? "☑" : "☐"} ${label}`;
  return [
    box(status === "THUVIEC", "Thử việc"),
    box(status === "CHINHTHUC", "Chính thức"),
    box(status === "DANGHIVIEC", "Đã nghỉ"),
  ].join("<br />");
}

const COLUMNS = [
  { label: "TT", width: "10mm" },
  { label: "Mã NV", width: "26mm" },
  { label: "Họ và tên", width: "40mm" },
  { label: "Ngày sinh", width: "22mm" },
  { label: "Bộ phận", width: "" },
  { label: "Chức vụ", width: "" },
  { label: "Loại hợp đồng", width: "26mm" },
  { label: "Ngày bắt đầu HĐ", width: "23mm" },
  { label: "Ngày kết thúc HĐ", width: "23mm" },
  { label: "Trạng thái", width: "26mm" },
  { label: "Ghi chú", width: "26mm" },
];

function bodyRow(e: F0308Employee, index: number): string {
  const hd = currentContract(e);
  return `<tr>
  <td class="num">${index + 1}</td>
  <td class="mid">${esc(e.code)}</td>
  <td>${esc(e.fullName)}</td>
  <td></td>
  <td>${esc(e.department)}</td>
  <td>${esc(e.position)}</td>
  <td>${hd ? esc(CONTRACT_TYPE_LABEL[hd.contractType] ?? hd.contractType) : ""}</td>
  <td class="mid">${esc(formatDate(hd?.effectiveDate))}</td>
  <td class="mid">${esc(formatDate(hd?.expiryDate))}</td>
  <td>${statusBoxes(e.status)}</td>
  <td></td>
</tr>`;
}

/** Một tờ F03.08 chứa toàn bộ danh sách đã chọn. */
export function renderF0308Sheet(employees: F0308Employee[], meta: FormMeta): string {
  const head = COLUMNS.map(
    (c) => `<th${c.width ? ` style="width:${c.width}"` : ""}>${esc(c.label)}</th>`,
  ).join("");

  return `
${formHeader({
  code: meta.code,
  title: meta.title || "Danh sách nhân sự",
  revision: meta.revision,
  effectiveDate: meta.effectiveDate,
})}

<table class="list">
  <thead><tr>${head}</tr></thead>
  <tbody>
    ${employees.map(bodyRow).join("\n")}
    ${
      employees.length === 0
        ? `<tr><td class="num" colspan="${COLUMNS.length}">(Không có nhân sự nào trong danh sách)</td></tr>`
        : ""
    }
  </tbody>
</table>

<p class="note">
  Trạng thái cập nhật ngay khi có thay đổi theo ETV.P03: tiếp nhận mới, ký/gia hạn hợp đồng, hoàn
  thành đào tạo (Thử việc → Chính thức), chấm dứt hợp đồng (chuyển Đã nghỉ, dẫn chiếu ETV.P.F 03.13).
</p>

${signatureRow([
  { role: "Người cập nhật (Văn phòng)", hint: "(Ký, ghi rõ họ tên)" },
  { role: "Ngày cập nhật", hint: "Ngày ..../..../........" },
  { role: "Xác nhận (Lãnh đạo Viện)", hint: "(Ký, ghi rõ họ tên)" },
])}

<p class="footnote">
  Bản xuất từ MANLAB-AIOS — module M03 (Nhân sự), theo biểu mẫu ${esc(meta.code)} lần ban hành
  ${esc(meta.revision)}. Danh sách gồm ${employees.length} nhân sự. Cột Ngày sinh và Ghi chú là
  trường chưa được số hoá trong hệ thống, điền tay khi hoàn thiện hồ sơ. Bản in là hồ sơ, kiểm
  soát theo ETV.MP15.
</p>`;
}

/** Tên file PDF của bản danh sách — số lượng nằm trong tên để phân biệt các lần xuất. */
export function f0308FileName(count: number, meta: FormMeta): string {
  const code = meta.code.replace(/\s+/g, "").replace(/^ETV\.P\./, "");
  return `${code}_DanhSachNhanSu_${count}NhanSu.pdf`;
}
