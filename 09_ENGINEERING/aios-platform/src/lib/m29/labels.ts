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
  SUSPENDED: "Tạm dừng",
};

export const OP_STATUS_TONE: Record<string, "good" | "warn" | "crit" | "neutral"> = {
  ACTIVE: "good",
  DISABLED: "neutral",
  DEPRECATED: "neutral",
  SUSPENDED: "crit",
};

// Lý do tạm dừng Agent — hiển thị cho người đọc thay vì mã kỹ thuật.
export function suspendReasonLabel(reason: string | null): string {
  if (!reason) return "";
  if (reason === "AIA_OVERDUE") return "Hồ sơ AIA quá hạn rà soát";
  if (reason.startsWith("INCIDENT:")) return `Khống chế sự cố ${reason.slice("INCIDENT:".length)}`;
  return reason;
}

// ---------- Increment 4: sự cố AI + AI chưa đăng ký (ETV.P29 mục 5.1.7, 5.7) ----------

export const INCIDENT_SEVERITY_LABEL: Record<string, string> = {
  SEVERE: "Nghiêm trọng",
  SIGNIFICANT: "Đáng kể",
  MINOR: "Nhẹ",
};

export const INCIDENT_SEVERITY_TONE: Record<string, "good" | "warn" | "crit" | "neutral"> = {
  SEVERE: "crit",
  SIGNIFICANT: "warn",
  MINOR: "neutral",
};

export const INCIDENT_KIND_LABEL: Record<string, string> = {
  WRONG_OUTPUT: "Đầu ra sai/bịa thông tin",
  DATA_LEAK: "Rò rỉ dữ liệu",
  PROMPT_INJECTION: "Tiêm lệnh",
  PERMISSION_BREACH: "Vượt quyền hành động",
  BIAS: "Thiên lệch, phân biệt đối xử",
  SERVICE_DISRUPTION: "Gián đoạn dịch vụ",
  UNREGISTERED_AI: "Sử dụng AI chưa đăng ký",
  OTHER: "Khác",
};

export const INCIDENT_STATUS_LABEL: Record<string, string> = {
  NEW: "Mới",
  IN_PROGRESS: "Đang xử lý",
  PENDING_CONFIRMATION: "Chờ xác nhận",
  CLOSED: "Đã đóng",
  CANCELLED: "Hủy",
};

export const INCIDENT_STATUS_TONE: Record<string, "good" | "warn" | "crit" | "neutral"> = {
  NEW: "crit",
  IN_PROGRESS: "warn",
  PENDING_CONFIRMATION: "warn",
  CLOSED: "good",
  CANCELLED: "neutral",
};

export const UNREGISTERED_STATUS_LABEL: Record<string, string> = {
  OPEN: "Mới phát hiện",
  REGISTERING: "Đang hoàn thiện đăng ký",
  REGISTERED: "Đã đăng ký",
  DISCONTINUED: "Đã chấm dứt sử dụng",
};

export const UNREGISTERED_STATUS_TONE: Record<string, "good" | "warn" | "crit" | "neutral"> = {
  OPEN: "crit",
  REGISTERING: "warn",
  REGISTERED: "good",
  DISCONTINUED: "neutral",
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
