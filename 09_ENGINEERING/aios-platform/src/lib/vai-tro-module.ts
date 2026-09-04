// Danh mục vai trò hợp lệ của từng module — một chỗ tra duy nhất cho trang /admin/users.
//
// KHÔNG khai danh sách mới ở đây: mỗi module đã có bảng nhãn Mxx_ROLE_LABEL trong
// src/lib/mXX/labels.ts, đang dùng để hiển thị vai trò trên chính module đó. File này chỉ gom
// chúng lại. Viết một danh sách thứ hai thì hai bên sẽ lệch nhau, và bên lệch là bên không ai
// nhìn — trong khi hậu quả của lệch là cấp một mã vai trò không module nào công nhận, người
// dùng chỉ thấy mình không có quyền và không có gì báo lỗi.
//
// Vai trò là chuỗi tự do ở tầng database (ModuleRoleAssignment.role) vì mỗi module giữ nguyên
// vocabulary gốc của thủ tục tương ứng — M10 dùng NTH/LDP/QLCL, M29 dùng AI_OPERATOR/SUPER_ADMIN.
// Đúng danh mục hay không vì vậy phải kiểm ở tầng ứng dụng, xem vaiTroHopLe().
import { M01_ROLE_LABEL } from "@/lib/m01/labels";
import { M02_ROLE_LABEL } from "@/lib/m02/labels";
import { M03_ROLE_LABEL } from "@/lib/m03/labels";
import { M04_ROLE_LABEL } from "@/lib/m04/labels";
import { M10_ROLE_LABEL } from "@/lib/m10/labels";
import { M12_ROLE_LABEL } from "@/lib/m12/labels";
import { M13_ROLE_LABEL } from "@/lib/m13/labels";
import { M14_ROLE_LABEL } from "@/lib/m14/labels";
import { M16_ROLE_LABEL } from "@/lib/m16/labels";
import { M17_ROLE_LABEL } from "@/lib/m17/labels";
import { M21_ROLE_LABEL } from "@/lib/m21/labels";
import { M25_ROLE_LABEL } from "@/lib/m25/labels";
import { M26_ROLE_LABEL } from "@/lib/m26/labels";
import { M27_ROLE_LABEL } from "@/lib/m27/labels";
import { M28_ROLE_LABEL } from "@/lib/m28/labels";
import { M29_ROLE_LABEL } from "@/lib/m29/labels";
import { M33_ROLE_LABEL } from "@/lib/m33/labels";
import { M34_ROLE_LABEL } from "@/lib/m34/labels";

export const VAI_TRO_THEO_MODULE: Record<string, Record<string, string>> = {
  M01: M01_ROLE_LABEL,
  M02: M02_ROLE_LABEL,
  M03: M03_ROLE_LABEL,
  M04: M04_ROLE_LABEL,
  M10: M10_ROLE_LABEL,
  M12: M12_ROLE_LABEL,
  M13: M13_ROLE_LABEL,
  M14: M14_ROLE_LABEL,
  M16: M16_ROLE_LABEL,
  M17: M17_ROLE_LABEL,
  M21: M21_ROLE_LABEL,
  M25: M25_ROLE_LABEL,
  M26: M26_ROLE_LABEL,
  M27: M27_ROLE_LABEL,
  M28: M28_ROLE_LABEL,
  M29: M29_ROLE_LABEL,
  M33: M33_ROLE_LABEL,
  M34: M34_ROLE_LABEL,
};

/** Các lựa chọn vai trò của một module, rỗng nếu module đó chưa khai danh mục vai trò. */
export function vaiTroCuaModule(moduleCode: string): { role: string; label: string }[] {
  const bang = VAI_TRO_THEO_MODULE[moduleCode];
  if (!bang) return [];
  return Object.entries(bang).map(([role, label]) => ({ role, label }));
}

export function vaiTroHopLe(moduleCode: string, role: string): boolean {
  return Boolean(VAI_TRO_THEO_MODULE[moduleCode]?.[role]);
}

/** Nhãn tiếng Việt của một vai trò; trả lại chính mã khi không tra được (dữ liệu cũ). */
export function nhanVaiTro(moduleCode: string, role: string): string {
  return VAI_TRO_THEO_MODULE[moduleCode]?.[role] ?? role;
}
