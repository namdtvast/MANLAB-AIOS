// Nhãn hiển thị tiếng Việt — tách khỏi mã enum DB, khớp DacTa.md/ETV.P02.
export const COMMITMENT_TYPE_LABEL: Record<string, string> = {
  NHAN_VIEN: "Nhân viên",
  THU_VIEC: "Thử việc",
  KHACH: "Khách/chuyên gia/nhà thầu",
};

export const COMMITMENT_STATUS_LABEL: Record<string, string> = {
  HIEU_LUC: "Hiệu lực",
  DA_THU_HOI: "Đã thu hồi",
};

export const DISCLOSURE_STATUS_LABEL: Record<string, string> = {
  DRAFT: "Đang soạn",
  APPROVED: "Đã duyệt",
};

export const AUTHORITY_LEVEL_LABEL: Record<string, string> = {
  TP: "Trưởng phòng PTN",
  LDV: "Lãnh đạo Viện",
};

export const INCIDENT_STATUS_LABEL: Record<string, string> = {
  DETECTED: "Đã phát hiện",
  ASSESSED: "Đã đánh giá",
  CLOSED: "Đã đóng",
};

export const M02_ROLE_LABEL: Record<string, string> = {
  NV: "Nhân viên",
  TP: "Trưởng phòng PTN",
  QLCL: "Quản lý chất lượng",
  LDV: "Lãnh đạo Viện",
};
