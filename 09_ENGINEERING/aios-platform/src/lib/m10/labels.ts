// Nhãn hiển thị tiếng Việt — tách khỏi mã enum DB, khớp model.mjs gốc.
export const STATUS_LABEL: Record<string, string> = {
  DRAFT: "Nháp",
  PENDING_REVIEW: "Chờ soát xét",
  RETURNED: "Trả lại",
  PENDING_APPROVAL: "Chờ phê duyệt",
  REJECTED: "Từ chối",
  APPROVED: "Đã phê duyệt",
  PUBLISHED: "Đã công bố",
  EXPIRED: "Hết hiệu lực",
  REVOKED: "Thu hồi/Hủy",
};

export const RESULT_LABEL: Record<string, string> = {
  PASS: "ĐẠT",
  WARNING: "CẢNH BÁO",
  FAIL: "KHÔNG ĐẠT",
};

export const RECORD_TYPE_LABEL: Record<string, string> = {
  PT_ILC: "PT/ILC",
  QC: "QC nội bộ",
  STABILITY: "Độ ổn định",
  PLAN: "Kế hoạch",
  PUBLICATION: "Công bố",
};

export const PUB_STATUS_LABEL: Record<string, string> = {
  PASS: "ĐẠT",
  CONDITIONAL: "ĐẠT có điều kiện",
  WARNING: "CẢNH BÁO",
  FAIL_BLOCKED: "KHÔNG ĐẠT — chặn công bố",
  EXPIRED: "Hết hiệu lực",
};

export const M10_ROLE_LABEL: Record<string, string> = {
  NTH: "Người thực hiện",
  LDP: "Lãnh đạo phòng",
  LDV: "Lãnh đạo Viện",
  QLCL: "Quản lý chất lượng",
  QTHT: "Quản trị hệ thống",
};
