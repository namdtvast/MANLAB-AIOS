import type { M34PartyStatus, M34PartyType } from "@/generated/prisma/enums";

export const PARTY_TYPE_LABEL: Record<M34PartyType, string> = {
  ORGANIZATION: "Tổ chức/Doanh nghiệp",
  PERSON: "Cá nhân",
};

export const PARTY_STATUS_LABEL: Record<M34PartyStatus, string> = {
  DRAFT: "Nháp",
  PENDING_REVIEW: "Chờ soát xét",
  PENDING_APPROVAL: "Chờ phê duyệt",
  ACTIVE: "Hiệu lực",
  REVIEW_REJECTED: "Không soát xét",
  APPROVAL_REJECTED: "Không phê duyệt",
  ARCHIVED: "Lưu trữ",
};

/**
 * Vai trò của chủ thể là MASTER DATA cấu hình được (bảng M34PartyRoleType),
 * KHÔNG phải enum sinh từ Prisma — xem 09_ENGINEERING/05_Database/MasterData_ChuThe_VaiTro.md
 * mục 4.4. Thêm một vai trò mới là thêm một dòng dữ liệu, không phải một migration.
 */
export interface PartyRoleTypeOption {
  code: string;
  nameVi: string;
}

/** Bảng tra mã vai trò → tên hiển thị, dựng từ danh mục đọc ở tầng server. */
export function roleLabelMap(list: PartyRoleTypeOption[]): Map<string, string> {
  return new Map(list.map((r) => [r.code, r.nameVi]));
}

/** Tên hiển thị của một mã vai trò; mã lạ (đã bị vô hiệu hóa) vẫn hiện được thay vì mất dấu. */
export function roleLabel(labels: Map<string, string>, code: string): string {
  return labels.get(code) ?? code;
}

export function validateParty(input: {
  partyType: M34PartyType;
  legalName: string;
  taxId?: string;
  roles: string[];
  contactName?: string;
  contactEmail?: string;
}) {
  if (!input.legalName.trim()) return "Bắt buộc tên pháp lý hoặc họ tên.";
  if (input.partyType === "ORGANIZATION" && !input.taxId?.trim()) return "Tổ chức phải có mã số thuế/định danh; trường hợp không có cần xử lý ngoại lệ có phê duyệt.";
  if (input.roles.length === 0) return "Chọn ít nhất một vai trò nghiệp vụ.";
  if (input.contactEmail && !/^\S+@\S+\.\S+$/.test(input.contactEmail)) return "Email người liên hệ không hợp lệ.";
  return null;
}
