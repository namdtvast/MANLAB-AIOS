// Nhãn hiển thị tiếng Việt — tách khỏi mã enum DB, khớp
// 05_MODULE_LIBRARY/M34_DuLieuSo/01_Requirement/DacTa.md (ETV.P34 dự thảo, Chờ soát xét).

export const M34_ROLE_LABEL: Record<string, string> = {
  QLCL: "Phụ trách Quản lý chất lượng",
  ATTT: "Người phụ trách an toàn thông tin",
  LDV: "Lãnh đạo Viện",
  QTDL: "Người quản trị dữ liệu nghiệp vụ",
  QTHT: "Quản trị hệ thống",
};

export const DATASET_STATUS_LABEL: Record<string, string> = {
  DRAFT: "Nháp",
  PENDING_REVIEW: "Chờ soát xét",
  REVIEW_REJECTED: "Không soát xét",
  PENDING_APPROVAL: "Chờ phê duyệt",
  APPROVAL_REJECTED: "Không phê duyệt",
  ACTIVE: "Hiệu lực",
  ARCHIVED: "Lưu trữ",
  DISPOSAL_PROPOSED: "Đề nghị hủy",
  DISPOSED: "Đã hủy",
  CANCELLED: "Hủy bản ghi",
};

export const DATASET_STATUS_TONE: Record<string, string> = {
  DRAFT: "neutral",
  PENDING_REVIEW: "warn",
  REVIEW_REJECTED: "crit",
  PENDING_APPROVAL: "warn",
  APPROVAL_REJECTED: "crit",
  ACTIVE: "good",
  ARCHIVED: "neutral",
  DISPOSAL_PROPOSED: "warn",
  DISPOSED: "crit",
  CANCELLED: "crit",
};

export const DATA_GROUP_LABEL: Record<string, string> = {
  DO_KY_THUAT: "Dữ liệu đo và kỹ thuật",
  HO_SO_NGHIEP_VU: "Hồ sơ nghiệp vụ",
  DU_LIEU_CHU: "Dữ liệu chủ (dùng chung)",
  QUAN_TRI: "Dữ liệu quản trị",
  HE_THONG_QUAN_LY: "Dữ liệu hệ thống quản lý",
  CONG_BO: "Dữ liệu công bố",
  TRI_TUE_NHAN_TAO: "Dữ liệu dùng cho AI",
};

export const CLASSIFICATION_LABEL: Record<string, string> = {
  CONG_KHAI: "Công khai",
  NOI_BO: "Nội bộ",
  HAN_CHE: "Hạn chế",
  MAT: "Mật",
};

export const CLASSIFICATION_TONE: Record<string, string> = {
  CONG_KHAI: "good",
  NOI_BO: "neutral",
  HAN_CHE: "warn",
  MAT: "crit",
};

export const LIFECYCLE_LABEL: Record<string, string> = {
  HOAT_DONG: "Hoạt động",
  LUU_TRU: "Lưu trữ",
  DE_NGHI_HUY: "Đề nghị hủy",
};

export const REVIEW_CYCLE_LABEL: Record<string, string> = {
  THANG_12: "12 tháng/lần",
  THANG_06: "06 tháng/lần (dữ liệu cá nhân)",
};

export const DICT_STATUS_LABEL: Record<string, string> = {
  DRAFT: "Nháp",
  ACTIVE: "Hiệu lực",
  SUPERSEDED: "Đã thay thế",
};

export const MASTER_STATUS_LABEL: Record<string, string> = {
  DE_NGHI: "Đề nghị",
  DA_CONG_NHAN: "Đã công nhận",
  THU_HOI: "Thu hồi công nhận",
};

export const MASTER_STATUS_TONE: Record<string, string> = {
  DE_NGHI: "warn",
  DA_CONG_NHAN: "good",
  THU_HOI: "crit",
};

export const FINDING_STATUS_LABEL: Record<string, string> = {
  MOI: "Mới",
  DANG_XU_LY: "Đang xử lý",
  DA_XU_LY: "Đã xử lý",
};

export const QUALITY_DIMENSION_LABEL: Record<string, string> = {
  CHINH_XAC: "Chính xác",
  DAY_DU: "Đầy đủ",
  NHAT_QUAN: "Nhất quán",
  KIP_THOI: "Kịp thời",
  DUY_NHAT: "Duy nhất",
  HOP_LE: "Hợp lệ",
};

export const QUALITY_STATUS_LABEL: Record<string, string> = {
  MOI: "Mới",
  DANG_DO: "Đang đo",
  CO_KET_QUA: "Có kết quả",
  DAT: "Đạt",
  KHONG_DAT: "Không đạt",
};

export const QUALITY_STATUS_TONE: Record<string, string> = {
  MOI: "neutral",
  DANG_DO: "warn",
  CO_KET_QUA: "warn",
  DAT: "good",
  KHONG_DAT: "crit",
};

export const BELOW_THRESHOLD_CASE_LABEL: Record<string, string> = {
  MOT_CHIEU_KHONG_ANH_HUONG: "Dưới ngưỡng một chiều, không ảnh hưởng kết quả đã phát hành",
  HAI_KY_LIEN_TIEP: "Dưới ngưỡng 02 kỳ liên tiếp — bắt buộc mở KPH",
  ANH_HUONG_KET_QUA_DA_PHAT_HANH: "Có khả năng ảnh hưởng kết quả, chứng chỉ đã phát hành",
  TU_TICH_HOP_DONG_BO: "Sai lệch phát sinh từ tích hợp, đồng bộ",
  DU_LIEU_CHU_TRUNG: "Dữ liệu chủ có bản ghi trùng",
};

export const TREND_LABEL: Record<string, string> = {
  CAI_THIEN: "Cải thiện",
  GIU_NGUYEN: "Giữ nguyên",
  XAU_DI: "Xấu đi",
};

export const PUBLISHED_IMPACT_LABEL: Record<string, string> = {
  CHUA_DUNG_PHAT_HANH: "Chưa dùng để phát hành",
  DA_DUNG_PHAT_HANH: "Đã dùng để phát hành kết quả",
};

export const VALIDITY_CONCLUSION_LABEL: Record<string, string> = {
  CON_HIEU_LUC: "Kết quả còn hiệu lực",
  THU_HOI_PHAT_HANH_LAI: "Phải thu hồi, phát hành lại",
};

export const CORRECTION_STATUS_LABEL: Record<string, string> = {
  MOI: "Mới",
  DANG_XEM_XET: "Đang xem xét ảnh hưởng",
  CHO_KET_LUAN_P10_P11: "Chờ kết luận ETV.P10/P11",
  DA_HIEU_CHINH: "Đã hiệu chỉnh",
  TU_CHOI: "Từ chối",
};

export const CORRECTION_STATUS_TONE: Record<string, string> = {
  MOI: "neutral",
  DANG_XEM_XET: "warn",
  CHO_KET_LUAN_P10_P11: "crit",
  DA_HIEU_CHINH: "good",
  TU_CHOI: "crit",
};

export const SHARING_TYPE_LABEL: Record<string, string> = {
  NOI_BO_VUOT_QUYEN: "Khai thác nội bộ vượt quyền",
  RA_NGOAI_VIEN: "Chia sẻ ra ngoài Viện",
  DINH_KY_TU_DONG: "Chia sẻ định kỳ, tự động (→ điểm tích hợp M37)",
};

export const SHARING_STATUS_LABEL: Record<string, string> = {
  DRAFT: "Nháp",
  CHO_Y_KIEN_ATTT: "Chờ ý kiến PT.ATTT",
  CHO_PHE_DUYET: "Chờ phê duyệt",
  DA_PHE_DUYET: "Đã phê duyệt",
  DA_THUC_HIEN: "Đã thực hiện",
  DA_THU_HOI: "Đã thu hồi",
  TU_CHOI: "Từ chối",
};

export const SHARING_STATUS_TONE: Record<string, string> = {
  DRAFT: "neutral",
  CHO_Y_KIEN_ATTT: "warn",
  CHO_PHE_DUYET: "warn",
  DA_PHE_DUYET: "good",
  DA_THUC_HIEN: "good",
  DA_THU_HOI: "neutral",
  TU_CHOI: "crit",
};

export const AI_PURPOSE_LABEL: Record<string, string> = {
  DU_LIEU_NGU_CANH: "Dữ liệu ngữ cảnh",
  TAP_TRI_THUC: "Tập tri thức",
  DANH_GIA_MO_HINH: "Dữ liệu đánh giá mô hình",
};

export const AI_APPROVAL_STATUS_LABEL: Record<string, string> = {
  DE_NGHI: "Đề nghị",
  DA_PHE_DUYET: "Đã phê duyệt",
  THU_HOI: "Thu hồi",
};

export const AI_APPROVAL_STATUS_TONE: Record<string, string> = {
  DE_NGHI: "warn",
  DA_PHE_DUYET: "good",
  THU_HOI: "crit",
};
