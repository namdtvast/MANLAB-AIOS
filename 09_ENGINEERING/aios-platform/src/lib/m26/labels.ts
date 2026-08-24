// Nhãn hiển thị tiếng Việt — tách khỏi mã enum DB, khớp Thủ tục ETV.P26 và
// 05_MODULE_LIBRARY/M26_TriThuc/01_Requirement/DacTa.md.

export const M26_ROLE_LABEL: Record<string, string> = {
  QLCL: "Phụ trách Quản lý chất lượng (QLCL)",
  TP: "Trưởng phòng/phụ trách lĩnh vực (TP)",
  LDV: "Lãnh đạo Viện (LĐV)",
  QTHT: "Quản trị hệ thống (QTHT)",
  NV: "Nhân viên",
};

export const ITEM_STATUS_LABEL: Record<string, string> = {
  DRAFT: "Nháp",
  PENDING_REVIEW: "Chờ soát xét",
  REVIEW_REJECTED: "Không soát xét",
  PENDING_APPROVAL: "Chờ phê duyệt",
  APPROVAL_REJECTED: "Không phê duyệt",
  APPROVED: "Đã phê duyệt",
  RETIRED: "Hết hiệu lực",
  CANCELLED: "Hủy",
};

export const ITEM_STATUS_TONE: Record<string, string> = {
  DRAFT: "neutral",
  PENDING_REVIEW: "warn",
  REVIEW_REJECTED: "crit",
  PENDING_APPROVAL: "warn",
  APPROVAL_REJECTED: "crit",
  APPROVED: "good",
  RETIRED: "neutral",
  CANCELLED: "crit",
};

export const KNOWLEDGE_FORM_LABEL: Record<string, string> = {
  TRI_THUC_HIEN: "Tri thức hiện",
  TRI_THUC_AN: "Tri thức ẩn",
};

export const CATEGORY_LABEL: Record<string, string> = {
  PHAP_LY_TIEU_CHUAN: "Pháp lý – tiêu chuẩn",
  KY_THUAT_DO_LUONG: "Kỹ thuật đo lường – hiệu chuẩn – thử nghiệm",
  VAN_HANH_THIET_BI: "Vận hành thiết bị",
  BAI_HOC_TINH_HUONG: "Bài học kinh nghiệm và tình huống",
  HE_THONG_QUAN_LY: "Hệ thống quản lý",
  KHACH_HANG_DICH_VU: "Khách hàng – thị trường – dịch vụ",
  SO_HOA_DU_LIEU_AI: "Số hóa – dữ liệu – AI",
  NGHIEN_CUU_PHAT_TRIEN: "Nghiên cứu – phát triển",
};

export const ORIGIN_LABEL: Record<string, string> = {
  NOI_BO: "Nội bộ",
  BEN_NGOAI: "Bên ngoài",
};

export const CRITICALITY_LABEL: Record<string, string> = {
  THAP: "Thấp",
  TRUNG_BINH: "Trung bình",
  CAO: "Cao",
};

export const CRITICALITY_TONE: Record<string, string> = {
  THAP: "neutral",
  TRUNG_BINH: "warn",
  CAO: "crit",
};

export const CONFIDENTIALITY_LABEL: Record<string, string> = {
  CONG_KHAI: "Công khai",
  NOI_BO: "Nội bộ",
  HAN_CHE: "Hạn chế",
  MAT: "Mật",
};

export const CONFIDENTIALITY_TONE: Record<string, string> = {
  CONG_KHAI: "good",
  NOI_BO: "neutral",
  HAN_CHE: "warn",
  MAT: "crit",
};

export const REVIEW_CYCLE_LABEL: Record<string, string> = {
  SAU_THANG: "6 tháng",
  NAM: "1 năm",
  HAI_NAM: "2 năm",
  THEO_SU_KIEN: "Theo sự kiện",
};

export const LESSON_SOURCE_LABEL: Record<string, string> = {
  KPH_CAPA: "Sự không phù hợp/CAPA (M13)",
  KHIEU_NAI: "Khiếu nại, phản hồi (M12)",
  KET_QUA_NGOAI_KIEM_SOAT: "Kết quả ngoài kiểm soát (M10)",
  DANH_GIA: "Đánh giá nội bộ/bên ngoài (M16)",
  SU_CO_THIET_BI: "Sự cố thiết bị (M05)",
  SU_CO_ATTT: "Sự cố an toàn thông tin (M28)",
  SU_CO_AI: "Sự cố hệ thống AI (M29)",
  HOP_DONG_DU_AN: "Hợp đồng, dự án (M07)",
  NGHIEN_CUU: "Nghiên cứu khoa học",
};

export const LESSON_STATUS_LABEL: Record<string, string> = {
  MOI: "Mới",
  DANG_PHAN_TICH: "Đang phân tích",
  CHO_PHE_DUYET: "Chờ phê duyệt",
  DA_PHE_DUYET: "Đã phê duyệt",
  HUY: "Hủy",
};

export const LESSON_STATUS_TONE: Record<string, string> = {
  MOI: "warn",
  DANG_PHAN_TICH: "warn",
  CHO_PHE_DUYET: "warn",
  DA_PHE_DUYET: "good",
  HUY: "crit",
};

export const NEED_TRIGGER_LABEL: Record<string, string> = {
  PHUONG_PHAP_MOI: "Phương pháp mới (M08)",
  THIET_BI_MOI: "Thiết bị mới (M05)",
  MO_RONG_PHAM_VI: "Mở rộng phạm vi công nhận/chỉ định (M21)",
  BIEN_DONG_NHAN_SU: "Biến động nhân sự (M03)",
  CONG_NGHE_AI_MOI: "Công nghệ, hệ thống AI mới (M29/M32)",
  THAY_DOI_PHAP_LUAT: "Thay đổi pháp luật, tiêu chuẩn",
  VAN_DE_BOI_CANH: "Vấn đề bối cảnh tổ chức (M25)",
  KPH_LAP_LAI: "Sự không phù hợp lặp lại (M13)",
  CHUYEN_GIAO_TRI_THUC_AN: "Chuyển giao tri thức ẩn trọng yếu",
};

export const NEED_METHOD_LABEL: Record<string, string> = {
  DAO_TAO_NOI_BO: "Đào tạo nội bộ",
  DAO_TAO_BEN_NGOAI: "Đào tạo bên ngoài",
  TUYEN_DUNG: "Tuyển dụng",
  THUE_CHUYEN_GIA: "Thuê chuyên gia",
  MUA_TAI_LIEU: "Mua tài liệu, tiêu chuẩn",
  NGHIEN_CUU_NOI_BO: "Nghiên cứu nội bộ",
  HOP_TAC_CHUYEN_GIAO: "Hợp tác – chuyển giao công nghệ",
  KEM_CAP: "Kèm cặp – hướng dẫn",
  VAN_BAN_HOA: "Văn bản hóa thành tài liệu kiểm soát",
};

export const NEED_STATUS_LABEL: Record<string, string> = {
  MO: "Mở",
  DANG_BO_SUNG: "Đang bổ sung",
  DA_DAP_UNG: "Đã đáp ứng",
  KHONG_THUC_HIEN: "Không thực hiện",
};

export const NEED_STATUS_TONE: Record<string, string> = {
  MO: "warn",
  DANG_BO_SUNG: "warn",
  DA_DAP_UNG: "good",
  KHONG_THUC_HIEN: "neutral",
};

export const SHARING_FORM_LABEL: Record<string, string> = {
  SINH_HOAT_CHUYEN_MON: "Sinh hoạt chuyên môn",
  DAO_TAO_NOI_BO: "Đào tạo nội bộ",
  KEM_CAP: "Kèm cặp – hướng dẫn",
  BAN_TIN_FAQ: "Bản tin/FAQ nội bộ",
  PHO_BIEN_HOI_THAO: "Phổ biến sau hội thảo",
  BAN_GIAO_NHAN_SU: "Bàn giao khi thay đổi nhân sự",
};

export const SHARING_STATUS_LABEL: Record<string, string> = {
  KE_HOACH: "Kế hoạch",
  DA_THUC_HIEN: "Đã thực hiện",
  HUY: "Hủy",
};

export const SHARING_STATUS_TONE: Record<string, string> = {
  KE_HOACH: "warn",
  DA_THUC_HIEN: "good",
  HUY: "crit",
};

export const ITEM_TYPE_LABEL: Record<string, string> = {
  ITEM: "Mục tri thức",
  LESSON: "Bài học kinh nghiệm",
  NEED: "Nhu cầu tri thức",
  SHARING: "Hoạt động chia sẻ",
};

export const enumOptions = (map: Record<string, string>) =>
  Object.entries(map).map(([value, label]) => ({ value, label }));
