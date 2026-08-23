// Nhãn hiển thị tiếng Việt — tách khỏi mã enum DB, khớp DacTa.md/ETV.P16.
export const AUDIT_TYPE_LABEL: Record<string, string> = {
  NOI_BO: "Nội bộ",
  BEN_NGOAI: "Bên ngoài",
};

export const PLAN_STATUS_LABEL: Record<string, string> = {
  DRAFT: "Đang soạn",
  PENDING_REVIEW: "Chờ xem xét",
  PENDING_APPROVAL: "Chờ phê duyệt",
  APPROVED: "Đã phê duyệt",
  REJECTED: "Từ chối",
};

export const PROGRAM_STATUS_LABEL: Record<string, string> = {
  DRAFT: "Đang soạn",
  CONFIRMED: "Đã xác nhận",
};

export const CONFORMITY_LABEL: Record<string, string> = {
  PHU_HOP: "Phù hợp",
  KHONG_PHU_HOP: "Không phù hợp",
};

export const M16_ROLE_LABEL: Record<string, string> = {
  QLCL: "Quản lý chất lượng",
  LDP: "Lãnh đạo Phòng",
  LDV: "Lãnh đạo Viện",
  TRUONGDOAN: "Trưởng đoàn đánh giá",
  DANHGIAVIEN: "Đánh giá viên",
  TRUONGBOPHAN: "Trưởng bộ phận được đánh giá",
};
