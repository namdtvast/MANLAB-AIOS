// Nhãn hiển thị tiếng Việt cho M29 — tách khỏi mã enum DB, port từ APPROVAL/PROMPT_STATUS/...
// trong 08_Source/api/model.mjs.
export const APPROVAL_STATUS_LABEL: Record<string, string> = {
  DRAFT: "Nháp",
  PENDING_REVIEW: "Chờ soát xét",
  RETURNED: "Không soát xét",
  PENDING_APPROVAL: "Chờ phê duyệt",
  REJECTED: "Không phê duyệt",
  APPROVED: "Đã phê duyệt",
  ACTIVE: "Hiệu lực",
  ARCHIVED: "Hết hiệu lực",
  CANCELLED: "Hủy",
};

export const APPROVAL_STATUS_TONE: Record<string, "good" | "warn" | "crit" | "neutral"> = {
  DRAFT: "neutral",
  PENDING_REVIEW: "warn",
  RETURNED: "warn",
  PENDING_APPROVAL: "warn",
  REJECTED: "crit",
  APPROVED: "good",
  ACTIVE: "good",
  ARCHIVED: "crit",
  CANCELLED: "crit",
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
  // KHÔNG viết "chờ AIA được phê duyệt": phê duyệt lại AIA cố ý KHÔNG tự mở lại tác tử ở nhánh
  // này (xem doiMoHinhTacTu), nên nhãn đó sẽ nói sai ngay khi AIA vừa được duyệt xong.
  if (reason === "MODEL_CHANGED") return "Vừa đổi mô hình — rà soát lại AIA và chạy lại bộ đánh giá trước khi mở lại";
  if (reason === "TOOL_PERMISSION_RAISED") return "Vừa nâng mức quyền công cụ — rà soát lại AIA và chạy lại bộ đánh giá trước khi mở lại";
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

/**
 * Dịch mã lỗi kỹ thuật do adapter ghi vào AIPlatform.lastError sang câu người vận hành đọc được.
 *
 * Có hàm này vì trước đây bảng nền tảng chỉ hiện huy hiệu "Ngừng hoạt động": thiếu khoá API,
 * khoá sai, và máy chủ tắt hẳn trông giống hệt nhau trên giao diện, trong khi ba ca đó cần ba
 * cách xử lý khác nhau — và mã lỗi thì đã nằm sẵn trong DB.
 *
 * Cố ý KHÔNG che tên biến môi trường: nó là tên biến, không phải giá trị bí mật, và chính nó là
 * thông tin người vận hành cần để sửa.
 */
export function healthErrorLabel(error: string | null | undefined): string | null {
  if (!error) return null;
  if (error.startsWith("NO_API_KEY:")) return `Máy chủ AIOS chưa có biến môi trường ${error.slice("NO_API_KEY:".length)} — đặt khoá API vào .env rồi khởi động lại dịch vụ.`;
  const map: Record<string, string> = {
    NO_API_KEY: "Máy chủ AIOS chưa có khoá API của nhà cung cấp này (đặt trong .env rồi khởi động lại dịch vụ).",
    NO_API_BASE_URL: "Chưa khai Địa chỉ API (apiBaseUrl) cho nền tảng.",
    INVALID_KEY_ENV: "Tên biến môi trường chứa khoá API không hợp lệ — đặt lại ở phần Danh mục.",
    NOT_INTEGRATED: "Chưa có bộ chuyển đổi thật — mọi lời gọi trả NOT_INTEGRATED.",
    TIMEOUT: "Quá thời gian chờ — máy chủ không phản hồi kịp.",
  };
  if (map[error]) return map[error];
  // Lỗi mạng của fetch tới AIOS dưới dạng "TypeError: fetch failed" — đúng về kỹ thuật nhưng vô
  // nghĩa với người vận hành, mà đây lại là ca hay gặp nhất (máy chủ tắt, sai địa chỉ, bị chặn).
  if (error.includes("fetch failed")) return "Không kết nối được tới máy chủ — soát lại Địa chỉ API, máy chủ có đang chạy và có bị chặn mạng không.";
  const http = error.match(/^HTTP (\d{3})$/);
  if (http) {
    const ma = http[1];
    if (ma === "401" || ma === "403") return `Máy chủ từ chối khoá API (HTTP ${ma}) — khoá sai hoặc đã bị thu hồi.`;
    if (ma === "404") return "Máy chủ không có đường dẫn kiểm tra (HTTP 404) — soát lại Địa chỉ API.";
    return `Máy chủ trả lỗi HTTP ${ma}.`;
  }
  return error;
}

// ---------- Ranh giới dữ liệu của nền tảng (ETV.P29 §5.5) ----------

export const DATA_BOUNDARY_LABEL: Record<string, string> = {
  NO_EXTERNAL_TRANSFER: "Không rời hạ tầng Viện",
  EXTERNAL_WITH_COMMITMENT: "Ra ngoài, có cam kết",
  EXTERNAL_NO_COMMITMENT: "Ra ngoài, không cam kết",
};

// Không tô "tốt/xấu" theo cảm tính: mức siết nhất (chỉ gửi tài liệu Công khai) là AN TOÀN nhất về
// dữ liệu nhưng lại là mức khiến Copilot đọc được ít nhất. Dùng tông trung tính cho cả ba, chỉ
// nhấn "không rời hạ tầng" vì đó là trạng thái vừa an toàn vừa không mất tài liệu Nội bộ.
export const DATA_BOUNDARY_TONE: Record<string, "good" | "warn" | "crit" | "neutral"> = {
  NO_EXTERNAL_TRANSFER: "good",
  EXTERNAL_WITH_COMMITMENT: "neutral",
  EXTERNAL_NO_COMMITMENT: "warn",
};

export const SECURITY_LEVEL_LABEL: Record<string, string> = {
  "Cong-khai": "Công khai",
  "Noi-bo": "Nội bộ",
};

export const PERMISSION_LEVEL_LABEL: Record<string, string> = {
  READ: "Đọc",
  COMPUTE: "Tính toán",
  PROPOSE: "Đề xuất",
  EXECUTE: "Thực thi",
};

// Mức rủi ro của Skill và Tool. AISkill.riskLevel/AITool.riskLevel là String tự do ở lược đồ, nên
// tra không trúng thì trả về chính giá trị thô thay vì để trống — bản ghi cũ hoặc sinh bằng SQL
// vẫn phải đọc được trên bảng.
export const RISK_LEVEL_LABEL: Record<string, string> = {
  LOW: "Thấp",
  MEDIUM: "Trung bình",
  HIGH: "Cao",
};

export const RISK_LEVEL_TONE: Record<string, "good" | "warn" | "crit" | "neutral"> = {
  LOW: "good",
  MEDIUM: "warn",
  HIGH: "crit",
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

/**
 * Trạng thái một lượt đánh giá chất lượng. CHO_KET_LUAN cố ý KHÔNG đọc thành "Chưa đạt": phần mềm
 * mới đo xong, chưa ai kết luận — hai chuyện khác nhau (ETV.P29 §4.8).
 */
export const EVALUATION_RUN_STATUS_LABEL: Record<string, string> = {
  CHO_KET_LUAN: "Chờ người kết luận",
  PASS: "Đạt",
  FAIL: "Không đạt",
};

export const EVALUATION_RUN_STATUS_TONE: Record<string, "good" | "warn" | "crit" | "neutral"> = {
  CHO_KET_LUAN: "warn",
  PASS: "good",
  FAIL: "crit",
};

// ---------- Danh mục hệ thống AI — ETV.P29 mục 5.1.2 (phần 1 biểu mẫu ETV.P.F 29.01) ----------

// Số thứ tự (1)–(5) giữ nguyên trong nhãn, không bỏ cho gọn: bảng "Chú giải danh mục chuẩn" của
// biểu mẫu đánh số đúng năm nhóm này, và người điền biểu mẫu giấy tra theo số.
export const SYSTEM_GROUP_LABEL: Record<string, string> = {
  EMBEDDED_AGENT: "(1) Tác tử AI nhúng trong nền tảng nghiệp vụ",
  OFFICE_ASSIST: "(2) AI hỗ trợ hành chính — văn phòng",
  TECHNICAL_ANALYSIS: "(3) AI hỗ trợ kỹ thuật — phân tích dữ liệu",
  DOCUMENT_PROCESSING: "(4) AI xử lý tài liệu, hình ảnh",
  EXTERNAL_MODEL_SERVICE: "(5) Dịch vụ mô hình của nhà cung cấp bên ngoài",
};

/** Bản ngắn cho ô hẹp trong bảng — bảng danh mục đã có 12 cột, nhãn đầy đủ ở trên làm vỡ bề ngang. */
export const SYSTEM_GROUP_SHORT: Record<string, string> = {
  EMBEDDED_AGENT: "(1) Nhúng nghiệp vụ",
  OFFICE_ASSIST: "(2) Hành chính",
  TECHNICAL_ANALYSIS: "(3) Kỹ thuật",
  DOCUMENT_PROCESSING: "(4) Tài liệu, ảnh",
  EXTERNAL_MODEL_SERVICE: "(5) Dịch vụ ngoài",
};

export const ACQUISITION_LABEL: Record<string, string> = {
  SELF_DEVELOPED: "Tự phát triển",
  PURCHASED: "Mua",
  SUBSCRIBED: "Thuê dịch vụ",
  THIRD_PARTY_EMBEDDED: "Nhúng sẵn trong nền tảng bên thứ ba",
};

export const REVIEW_CYCLE_LABEL: Record<string, string> = {
  SIX_MONTHS: "≤ 06 tháng",
  ONE_YEAR: "≤ 01 năm",
  BY_EVENT: "Theo sự kiện",
};

// Chu kỳ rà soát KHÔNG tô theo "thưa là xấu": theo mục 5.1.3, Theo sự kiện là mức ĐÚNG của hệ
// thống tác động Thấp. Cái sai là chu kỳ thưa hơn mức tác động cho phép, và đó là việc của quy
// tắc R-F29-2 trong rules.ts, không phải của bảng màu.
export const REVIEW_CYCLE_TONE: Record<string, "good" | "warn" | "crit" | "neutral"> = {
  SIX_MONTHS: "neutral",
  ONE_YEAR: "neutral",
  BY_EVENT: "neutral",
};

export const M29_ROLE_LABEL: Record<string, string> = {
  AI_VIEWER: "Người xem",
  AI_OPERATOR: "Vận hành",
  AI_ADMIN: "Quản trị AI",
  AI_SECURITY_ADMIN: "Quản trị bảo mật AI",
  AI_AUDITOR: "Kiểm toán AI",
  SUPER_ADMIN: "Super Admin",
};
