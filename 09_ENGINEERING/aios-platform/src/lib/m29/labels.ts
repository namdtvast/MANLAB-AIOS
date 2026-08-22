// Nhãn hiển thị tiếng Việt cho M29 — tách khỏi mã enum DB, port từ APPROVAL/PROMPT_STATUS/...
// trong 08_Source/api/model.mjs.
export const APPROVAL_STATUS_LABEL: Record<string, string> = {
  DRAFT: "Nháp",
  PENDING_REVIEW: "Chờ soát xét",
  RETURNED: "Không soát xét",
  PENDING_APPROVAL: "Chờ phê duyệt",
  REJECTED: "Không phê duyệt",
  APPROVED: "Đã phê duyệt",
  ARCHIVED: "Hết hiệu lực/Hủy",
};

export const APPROVAL_STATUS_TONE: Record<string, "good" | "warn" | "crit" | "neutral"> = {
  DRAFT: "neutral",
  PENDING_REVIEW: "warn",
  RETURNED: "warn",
  PENDING_APPROVAL: "warn",
  REJECTED: "crit",
  APPROVED: "good",
  ARCHIVED: "crit",
};

export const PROMPT_STATUS_LABEL: Record<string, string> = {
  DRAFT: "Nháp",
  REVIEW: "Đang soát xét",
  APPROVED: "Đã phê duyệt",
  ACTIVE: "Đang hiệu lực",
  ARCHIVED: "Hết hiệu lực",
};

export const OP_STATUS_LABEL: Record<string, string> = {
  ACTIVE: "Hoạt động",
  DISABLED: "Vô hiệu hóa",
  DEPRECATED: "Ngừng dùng",
};

export const HEALTH_LABEL: Record<string, string> = {
  HEALTHY: "Bình thường",
  DEGRADED: "Suy giảm",
  DOWN: "Ngừng hoạt động",
  UNKNOWN: "Chưa rõ",
};

export const HEALTH_TONE: Record<string, "good" | "warn" | "crit" | "neutral"> = {
  HEALTHY: "good",
  DEGRADED: "warn",
  DOWN: "crit",
  UNKNOWN: "neutral",
};

export const PERMISSION_LEVEL_LABEL: Record<string, string> = {
  READ: "Đọc",
  COMPUTE: "Tính toán",
  PROPOSE: "Đề xuất",
  EXECUTE: "Thực thi",
};

export const GUARDRAIL_ACTION_LABEL: Record<string, string> = {
  BLOCK: "Chặn",
  WARN: "Cảnh báo",
  REQUIRE_CONFIRMATION: "Cần xác nhận",
  REQUIRE_APPROVAL: "Cần phê duyệt",
};

export const AIA_STATUS_LABEL: Record<string, string> = {
  NOT_ASSESSED: "Chưa đánh giá",
  DRAFT: "Nháp",
  REVIEWED: "Đã soát xét",
  APPROVED: "Đã phê duyệt",
  REVIEW_REQUIRED: "Cần rà soát lại",
};

export const AIA_STATUS_TONE: Record<string, "good" | "warn" | "crit" | "neutral"> = {
  NOT_ASSESSED: "neutral",
  DRAFT: "neutral",
  REVIEWED: "warn",
  APPROVED: "good",
  REVIEW_REQUIRED: "crit",
};

export const M29_ROLE_LABEL: Record<string, string> = {
  AI_VIEWER: "Người xem",
  AI_OPERATOR: "Vận hành",
  AI_ADMIN: "Quản trị AI",
  AI_SECURITY_ADMIN: "Quản trị bảo mật AI",
  AI_AUDITOR: "Kiểm toán AI",
  SUPER_ADMIN: "Super Admin",
};
