import type { M34PartyRoleType, M34PartyStatus, M34PartyType } from "@/generated/prisma/enums";

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

export const PARTY_ROLE_LABEL: Record<M34PartyRoleType, string> = {
  CUSTOMER: "Khách hàng",
  SUPPLIER: "Nhà cung cấp (NCC)",
  SUBCONTRACTOR: "Nhà thầu phụ (NTP)",
  MANUFACTURER: "Nhà sản xuất (NSX)",
  PARTNER: "Đối tác",
  REGULATOR: "Cơ quan quản lý",
  ACCREDITATION_BODY: "Tổ chức công nhận/chứng nhận",
  EXPERT: "Chuyên gia",
};

export const PARTY_ROLES = Object.entries(PARTY_ROLE_LABEL) as [M34PartyRoleType, string][];

export function validateParty(input: {
  partyType: M34PartyType;
  legalName: string;
  taxId?: string;
  roles: M34PartyRoleType[];
  contactName?: string;
  contactEmail?: string;
}) {
  if (!input.legalName.trim()) return "Bắt buộc tên pháp lý hoặc họ tên.";
  if (input.partyType === "ORGANIZATION" && !input.taxId?.trim()) return "Tổ chức phải có mã số thuế/định danh; trường hợp không có cần xử lý ngoại lệ có phê duyệt.";
  if (input.roles.length === 0) return "Chọn ít nhất một vai trò nghiệp vụ.";
  if (input.contactEmail && !/^\S+@\S+\.\S+$/.test(input.contactEmail)) return "Email người liên hệ không hợp lệ.";
  return null;
}
