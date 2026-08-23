// Nhãn hiển thị tiếng Việt — tách khỏi mã enum DB, khớp DacTa.md/ETV.P03.
export const RECRUITMENT_STATUS_LABEL: Record<string, string> = {
  DRAFT: "Đang soạn",
  PENDING_APPROVAL: "Chờ duyệt",
  APPROVED: "Đã duyệt",
  FULFILLED: "Đã tuyển",
  REJECTED: "Từ chối",
};

export const EMPLOYMENT_TYPE_LABEL: Record<string, string> = {
  CHINHTHUC: "Chính thức",
  THUVIEC: "Thử việc",
  THUCTAP: "Thực tập",
  HDDV: "Hợp đồng dịch vụ",
};

export const EMPLOYEE_STATUS_LABEL: Record<string, string> = {
  THUVIEC: "Đang thử việc",
  CHINHTHUC: "Chính thức",
  DANGHIVIEC: "Đã nghỉ việc",
};

export const TRAINING_PLAN_TYPE_LABEL: Record<string, string> = {
  BAN_DAU: "Ban đầu (nhân sự mới)",
  DINH_KY: "Định kỳ",
  BO_SUNG: "Bổ sung",
};

export const TRAINING_STATUS_LABEL: Record<string, string> = {
  DRAFT: "Đang soạn",
  PENDING_APPROVAL: "Chờ duyệt",
  APPROVED: "Đã hoàn thành",
  NEEDS_SUPPLEMENT: "Cần bổ sung",
};

export const TRAINING_RESULT_LABEL: Record<string, string> = {
  DAT: "Đạt",
  CHUA_DAT: "Chưa đạt",
  BO_SUNG: "Đào tạo bổ sung",
};

export const TRAINING_CONDITION_LABEL: Record<string, string> = {
  c1AttendedAllContent: "1. Tham gia đủ nội dung bắt buộc",
  c2FollowedRules: "2. Tuân thủ nội quy/an toàn/bảo mật",
  c3CanPerformWork: "3. Thực hiện được công việc theo phân công",
  c4RecordsComplete: "4. Hồ sơ/biểu mẫu đúng yêu cầu",
  c5AssessmentPassed: "5. Kết quả đánh giá đạt",
  c6EvidenceSufficient: "6. Đủ bằng chứng thực hiện",
};

export const CONTRACT_TYPE_LABEL: Record<string, string> = {
  THOIVU: "Có thời hạn",
  KHONGTHOIHAN: "Không thời hạn",
  THUVIEC: "Thử việc",
  THUCTAP: "Thực tập",
};

export const CONTRACT_STATUS_LABEL: Record<string, string> = {
  DRAFT: "Đang soạn",
  PENDING_SIGN: "Chờ ký",
  ACTIVE: "Đang hiệu lực",
  TERMINATED: "Đã chấm dứt",
  EXPIRED: "Hết hạn",
};

export const SERVICE_TYPE_LABEL: Record<string, string> = {
  CHUYENMON: "Dịch vụ chuyên môn",
  PHOTHONG: "Dịch vụ phổ thông",
};

export const M03_ROLE_LABEL: Record<string, string> = {
  LDV: "Lãnh đạo Viện",
  TP: "Lãnh đạo PTN",
  QLCL: "Quản lý chất lượng",
  QLKT: "Quản lý kỹ thuật",
  VANPHONG: "Văn phòng",
  NGUOIHUONGDAN: "Người hướng dẫn",
};
