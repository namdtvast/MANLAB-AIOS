// M28 — nhãn tiếng Việt, tách khỏi mã enum lưu trong DB (mirror src/lib/m27/labels.ts).
// Thang phân loại dùng CLASSIFICATION_LABEL/TONE chung toàn nền tảng (src/lib/m34/labels.ts).

export const M28_ROLE_LABEL: Record<string, string> = {
  TP: "Trưởng phòng (chủ sở hữu rủi ro)",
  QTHT: "Quản trị hệ thống",
  ATTT: "Người phụ trách an toàn thông tin",
  QLCL: "Phụ trách Quản lý chất lượng",
  VP: "Văn phòng",
  LDV: "Lãnh đạo Viện",
};

export const RISK_LEVEL_LABEL: Record<string, string> = {
  THAP: "Thấp",
  TRUNG_BINH: "Trung bình",
  CAO: "Cao",
  RAT_CAO: "Rất cao",
};

export const RISK_LEVEL_TONE: Record<string, string> = {
  THAP: "good",
  TRUNG_BINH: "warn",
  CAO: "crit",
  RAT_CAO: "crit",
};

export const TREATMENT_OPTION_LABEL: Record<string, string> = {
  GIAM_THIEU: "Giảm thiểu",
  TRANH: "Tránh",
  CHIA_SE: "Chia sẻ",
  CHAP_NHAN: "Chấp nhận",
};

export const RISK_STATUS_LABEL: Record<string, string> = {
  DRAFT: "Nháp",
  PENDING_REVIEW: "Chờ soát xét",
  REVIEW_REJECTED: "Không soát xét",
  PENDING_APPROVAL: "Chờ phê duyệt",
  APPROVAL_REJECTED: "Không phê duyệt",
  DANG_XU_LY: "Đang xử lý",
  DA_XU_LY: "Đã xử lý",
  CHAP_NHAN_TON_DU: "Chấp nhận rủi ro tồn dư",
  HET_HIEU_LUC: "Hết hiệu lực",
};

export const RISK_STATUS_TONE: Record<string, string> = {
  DRAFT: "neutral",
  PENDING_REVIEW: "warn",
  REVIEW_REJECTED: "crit",
  PENDING_APPROVAL: "warn",
  APPROVAL_REJECTED: "crit",
  DANG_XU_LY: "warn",
  DA_XU_LY: "good",
  CHAP_NHAN_TON_DU: "good",
  HET_HIEU_LUC: "neutral",
};

export const TREATMENT_STATUS_LABEL: Record<string, string> = {
  MO: "Mở",
  DANG_THUC_HIEN: "Đang thực hiện",
  HOAN_THANH: "Hoàn thành",
};

export const TREATMENT_STATUS_TONE: Record<string, string> = {
  MO: "neutral",
  DANG_THUC_HIEN: "warn",
  HOAN_THANH: "good",
};

export const SOA_STATUS_LABEL: Record<string, string> = {
  DRAFT: "Nháp",
  PENDING_REVIEW: "Chờ soát xét",
  PENDING_APPROVAL: "Chờ phê duyệt",
  DA_PHE_DUYET: "Đã phê duyệt",
  HET_HIEU_LUC: "Hết hiệu lực",
};

export const SOA_STATUS_TONE: Record<string, string> = {
  DRAFT: "neutral",
  PENDING_REVIEW: "warn",
  PENDING_APPROVAL: "warn",
  DA_PHE_DUYET: "good",
  HET_HIEU_LUC: "neutral",
};

export const IMPLEMENTATION_STATUS_LABEL: Record<string, string> = {
  CHUA_THUC_HIEN: "Chưa thực hiện",
  DANG_THUC_HIEN: "Đang thực hiện",
  DA_THUC_HIEN: "Đã thực hiện",
};

export const IMPLEMENTATION_STATUS_TONE: Record<string, string> = {
  CHUA_THUC_HIEN: "crit",
  DANG_THUC_HIEN: "warn",
  DA_THUC_HIEN: "good",
};

export const SEVERITY_LABEL: Record<string, string> = {
  THAP: "Thấp",
  TRUNG_BINH: "Trung bình",
  CAO: "Cao",
  RAT_CAO: "Rất cao",
};

export const SEVERITY_TONE: Record<string, string> = {
  THAP: "neutral",
  TRUNG_BINH: "warn",
  CAO: "crit",
  RAT_CAO: "crit",
};

export const INCIDENT_STATUS_LABEL: Record<string, string> = {
  MOI: "Mới",
  DANG_KHONG_CHE: "Đang khống chế",
  DANG_DIEU_TRA: "Đang điều tra",
  DANG_KHAC_PHUC: "Đang khắc phục",
  CHO_KET_LUAN: "Chờ kết luận",
  DA_DONG: "Đã đóng",
  HUY: "Huỷ (cảnh báo giả)",
};

export const INCIDENT_STATUS_TONE: Record<string, string> = {
  MOI: "crit",
  DANG_KHONG_CHE: "crit",
  DANG_DIEU_TRA: "warn",
  DANG_KHAC_PHUC: "warn",
  CHO_KET_LUAN: "warn",
  DA_DONG: "good",
  HUY: "neutral",
};

export const TRISTATE_LABEL: Record<string, string> = {
  CO: "Có",
  KHONG: "Không",
  CHUA_XAC_DINH: "Chưa xác định",
};

export const SUBJECT_TYPE_LABEL: Record<string, string> = {
  NHAN_SU_CHINH_THUC: "Nhân sự chính thức",
  THU_VIEC: "Thử việc",
  CHUYEN_GIA_NHA_THAU: "Chuyên gia, nhà thầu",
  NHA_CUNG_CAP_CNTT: "Nhà cung cấp công nghệ thông tin",
};

export const REQUEST_TYPE_LABEL: Record<string, string> = {
  CAP_MOI: "Cấp mới",
  THAY_DOI: "Thay đổi",
  THU_HOI_MOT_PHAN: "Thu hồi một phần",
  THU_HOI_TOAN_BO: "Thu hồi toàn bộ",
};

export const ACCESS_STATUS_LABEL: Record<string, string> = {
  DE_NGHI: "Đề nghị",
  CHO_PHE_DUYET: "Chờ phê duyệt",
  DA_PHE_DUYET: "Đã phê duyệt",
  DA_THUC_HIEN: "Đã thực hiện",
  TU_CHOI: "Từ chối",
  DA_THU_HOI: "Đã thu hồi",
};

export const ACCESS_STATUS_TONE: Record<string, string> = {
  DE_NGHI: "neutral",
  CHO_PHE_DUYET: "warn",
  DA_PHE_DUYET: "warn",
  DA_THUC_HIEN: "good",
  TU_CHOI: "crit",
  DA_THU_HOI: "neutral",
};

export const REVIEW_SCOPE_LABEL: Record<string, string> = {
  PHONG: "Rà soát quyền của phòng",
  TAI_KHOAN_DAC_QUYEN: "Rà soát tài khoản đặc quyền",
};

export const ITEM_TYPE_LABEL: Record<string, string> = {
  RISK: "Rủi ro an toàn thông tin",
  TREATMENT: "Hạng mục xử lý rủi ro",
  SOA_VERSION: "Tuyên bố áp dụng",
  INCIDENT: "Sự cố an toàn thông tin",
  ACCESS_REQUEST: "Phiếu quyền truy cập",
  ACCESS_REVIEW: "Đợt rà soát quyền",
};

/// Bốn chủ đề của Phụ lục A ISO/IEC 27001:2022 — chỉ nhãn chủ đề, KHÔNG chép tên từng kiểm soát.
export const ANNEX_THEME_LABEL: Record<string, string> = {
  "A.5": "A.5 — Kiểm soát tổ chức",
  "A.6": "A.6 — Kiểm soát con người",
  "A.7": "A.7 — Kiểm soát vật lý",
  "A.8": "A.8 — Kiểm soát công nghệ",
};
