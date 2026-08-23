// Nhãn hiển thị tiếng Việt — tách khỏi mã enum DB, khớp DacTa.md/ETV.P04.
export const LOG_TYPE_LABEL: Record<string, string> = {
  ENVIRONMENT: "Điều kiện môi trường",
  CHEMICAL_CABINET: "Tủ bảo quản hóa chất",
  EQUIPMENT_CABINET: "Tủ bảo quản thiết bị",
};

export const RISK_LEVEL_LABEL: Record<string, string> = {
  THUONG: "Thường",
  CAO: "Rủi ro cao",
};

export const PLAN_STATUS_LABEL: Record<string, string> = {
  DRAFT: "Đang soạn",
  PENDING_APPROVAL: "Chờ duyệt",
  APPROVED: "Đã duyệt",
  REJECTED: "Từ chối",
};

export const M04_ROLE_LABEL: Record<string, string> = {
  NV: "Nhân viên",
  TP: "Trưởng phòng PTN",
  LDV: "Lãnh đạo Viện",
  QLKT: "Quản lý kỹ thuật",
  QLCL: "Quản lý chất lượng",
};
