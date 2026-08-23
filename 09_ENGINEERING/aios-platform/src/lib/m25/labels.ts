// Nhãn hiển thị tiếng Việt — tách khỏi mã enum DB, khớp
// 05_MODULE_LIBRARY/M25_BoiCanh/01_Requirement/DacTa.md.
export const REVIEW_STATUS_LABEL: Record<string, string> = {
  DRAFT: "Nháp",
  PENDING_REVIEW: "Chờ soát xét",
  REVIEW_REJECTED: "Không soát xét",
  PENDING_APPROVAL: "Chờ phê duyệt",
  APPROVAL_REJECTED: "Không phê duyệt",
  APPROVED: "Đã phê duyệt",
  SUPERSEDED: "Hết hiệu lực",
  CANCELLED: "Hủy",
};

export const REVIEW_STATUS_TONE: Record<string, string> = {
  DRAFT: "neutral",
  PENDING_REVIEW: "warn",
  REVIEW_REJECTED: "crit",
  PENDING_APPROVAL: "warn",
  APPROVAL_REJECTED: "crit",
  APPROVED: "good",
  SUPERSEDED: "neutral",
  CANCELLED: "crit",
};

export const CYCLE_TYPE_LABEL: Record<string, string> = {
  DINH_KY: "Định kỳ",
  DOT_XUAT: "Đột xuất",
};

export const MGMT_SYSTEM_LABEL: Record<string, string> = {
  ISO_9001: "ISO 9001",
  ISO_17025: "ISO/IEC 17025",
  ISO_17034: "ISO 17034",
  ISO_27001: "ISO/IEC 27001",
  ISO_42001: "ISO/IEC 42001",
};

export const ISSUE_ORIGIN_LABEL: Record<string, string> = {
  NOI_BO: "Nội bộ",
  BEN_NGOAI: "Bên ngoài",
};

// DacTa mục 4.1
export const ISSUE_CATEGORY_LABEL: Record<string, string> = {
  CHINH_TRI_PHAP_LY: "Chính trị – pháp lý",
  KINH_TE_THI_TRUONG: "Kinh tế – thị trường",
  XA_HOI_KHACH_HANG: "Xã hội – khách hàng",
  CONG_NGHE_SO_AI: "Công nghệ – chuyển đổi số & AI",
  CANH_TRANH_NGANH: "Cạnh tranh trong ngành",
  MOI_TRUONG_HA_TANG: "Môi trường – hạ tầng",
  NGUON_LUC_NOI_BO: "Nguồn lực nội bộ",
  NANG_LUC_KY_THUAT: "Năng lực kỹ thuật & phạm vi công nhận",
  VAN_HOA_TO_CHUC: "Văn hóa – tổ chức – quản trị",
  BAO_MAT_THONG_TIN: "Bảo mật & tài sản thông tin",
};

export const DIRECTION_LABEL: Record<string, string> = {
  CO_HOI: "Cơ hội",
  THACH_THUC: "Thách thức",
  CA_HAI: "Cả hai",
  TRUNG_TINH: "Trung tính",
};

// DacTa mục 4.3 — 3 mức, KHÔNG lặp ma trận R = S x P của M01
export const IMPACT_LEVEL_LABEL: Record<string, string> = {
  THAP: "Thấp",
  TRUNG_BINH: "Trung bình",
  CAO: "Cao",
};

export const IMPACT_LEVEL_TONE: Record<string, string> = {
  THAP: "neutral",
  TRUNG_BINH: "warn",
  CAO: "crit",
};

// DacTa mục 4.2
export const PARTY_GROUP_LABEL: Record<string, string> = {
  KHACH_HANG: "Khách hàng",
  CO_QUAN_QUAN_LY: "Cơ quan quản lý nhà nước",
  TO_CHUC_CONG_NHAN: "Tổ chức công nhận/chỉ định",
  CO_QUAN_CHU_QUAN: "Cơ quan chủ quản (LHHVN)",
  NHAN_SU_NOI_BO: "Nhân sự nội bộ",
  NHA_CUNG_CAP: "Nhà cung cấp và thầu phụ",
  DOI_TAC_NGHIEN_CUU: "Đối tác nghiên cứu – đào tạo",
  CONG_DONG_XA_HOI: "Cộng đồng và xã hội",
};

export const INFLUENCE_LEVEL_LABEL: Record<string, string> = {
  CAO: "Cao",
  TRUNG_BINH: "Trung bình",
  THAP: "Thấp",
};

export const MONITOR_FREQ_LABEL: Record<string, string> = {
  THANG: "Tháng",
  QUY: "Quý",
  SAU_THANG: "6 tháng",
  NAM: "Năm",
  THEO_SU_KIEN: "Theo sự kiện",
};

export const ENTRY_STATUS_LABEL: Record<string, string> = {
  CON_HIEU_LUC: "Còn hiệu lực",
  DA_DONG: "Đã đóng",
};

export const EXPECTATION_SOURCE_LABEL: Record<string, string> = {
  HOP_DONG: "Hợp đồng",
  VAN_BAN_PHAP_LUAT: "Văn bản pháp luật",
  TIEU_CHUAN: "Tiêu chuẩn",
  KHAO_SAT_PHAN_HOI: "Khảo sát/phản hồi",
  KHIEU_NAI: "Khiếu nại (← M12)",
  DANH_GIA_BEN_NGOAI: "Đánh giá bên ngoài",
  HOP_TRAO_DOI: "Họp/trao đổi",
};

export const FULFILLMENT_STATUS_LABEL: Record<string, string> = {
  DANG_DAP_UNG: "Đang đáp ứng",
  CHUA_DAP_UNG: "Chưa đáp ứng",
  KHONG_AP_DUNG: "Không áp dụng",
};

export const M25_ROLE_LABEL: Record<string, string> = {
  QLCL: "Quản lý chất lượng",
  TP: "Trưởng phòng",
  LDV: "Lãnh đạo Viện",
};

export const enumOptions = (map: Record<string, string>) =>
  Object.entries(map).map(([value, label]) => ({ value, label }));
