// M27 — nhãn tiếng Việt, tách khỏi mã enum lưu trong DB (mirror src/lib/m33/labels.ts).
// Thang phân loại KHÔNG khai ở đây: CLASSIFICATION_LABEL/TONE dùng chung toàn nền tảng,
// hiện đặt tại src/lib/m34/labels.ts và M33 cũng import chéo từ đó.

export const M27_ROLE_LABEL: Record<string, string> = {
  TP: "Trưởng phòng (chủ sở hữu tài sản)",
  QTHT: "Quản trị hệ thống (quản lý kỹ thuật)",
  ATTT: "Người phụ trách an toàn thông tin",
  QLCL: "Phụ trách Quản lý chất lượng",
  VP: "Văn phòng",
  LDV: "Lãnh đạo Viện",
};

export const ASSET_TYPE_LABEL: Record<string, string> = {
  CSDL_DIEN_TU: "Cơ sở dữ liệu, tập dữ liệu điện tử",
  TEP_TAI_LIEU: "Tệp tài liệu điện tử",
  HO_SO_GIAY: "Hồ sơ giấy",
  UNG_DUNG_NEN_TANG: "Ứng dụng, nền tảng chứa dữ liệu",
  VAT_MANG_TIN_ROI: "Vật mang tin rời",
  DICH_VU_BEN_THU_BA: "Dữ liệu trên dịch vụ bên thứ ba",
  DU_LIEU_THIET_BI_DO: "Dữ liệu đo từ thiết bị",
};

export const DATA_DOMAIN_LABEL: Record<string, string> = {
  KHACH_HANG: "Dữ liệu khách hàng",
  KET_QUA_DO: "Dữ liệu kết quả đo, thử nghiệm, kiểm định",
  HIEU_CHUAN_CRM: "Dữ liệu hiệu chuẩn và mẫu chuẩn",
  NHAN_SU: "Dữ liệu nhân sự",
  TAI_CHINH: "Dữ liệu tài chính, hợp đồng",
  HE_THONG_QUAN_LY: "Dữ liệu hệ thống quản lý",
  NGHIEN_CUU: "Dữ liệu nghiên cứu",
  VAN_HANH_CNTT: "Dữ liệu vận hành công nghệ thông tin",
  PHUC_VU_AI: "Dữ liệu phục vụ trí tuệ nhân tạo",
};

export const CIA_LABEL: Record<string, string> = {
  THAP: "Thấp",
  TRUNG_BINH: "Trung bình",
  CAO: "Cao",
};

export const CIA_TONE: Record<string, string> = {
  THAP: "neutral",
  TRUNG_BINH: "warn",
  CAO: "crit",
};

export const BACKUP_FREQUENCY_LABEL: Record<string, string> = {
  NGAY: "Hằng ngày",
  TUAN: "Hằng tuần",
  THANG: "Hằng tháng",
  KHAC: "Khác",
};

export const DISPOSAL_METHOD_LABEL: Record<string, string> = {
  CAT_VUN_GIAY: "Cắt vụn (hồ sơ giấy)",
  XOA_AN_TOAN: "Xoá an toàn (ghi đè theo chuẩn)",
  HUY_VAT_LY: "Huỷ vật lý vật mang tin",
  HUY_KHOA_MA_HOA: "Huỷ khoá mã hoá (crypto-erase)",
  BEN_THU_BA_XOA: "Bên thứ ba xoá và cung cấp bằng chứng",
};

export const ASSET_STATUS_LABEL: Record<string, string> = {
  DRAFT: "Nháp",
  PENDING_REVIEW: "Chờ soát xét",
  REVIEW_REJECTED: "Không soát xét",
  PENDING_APPROVAL: "Chờ phê duyệt",
  APPROVAL_REJECTED: "Không phê duyệt",
  DANG_SU_DUNG: "Đang sử dụng",
  NGUNG_SU_DUNG: "Ngừng sử dụng",
  DA_HUY: "Đã huỷ",
  CANCELLED: "Huỷ bản ghi",
};

export const ASSET_STATUS_TONE: Record<string, string> = {
  DRAFT: "neutral",
  PENDING_REVIEW: "warn",
  REVIEW_REJECTED: "crit",
  PENDING_APPROVAL: "warn",
  APPROVAL_REJECTED: "crit",
  DANG_SU_DUNG: "good",
  NGUNG_SU_DUNG: "warn",
  DA_HUY: "neutral",
  CANCELLED: "neutral",
};

export const RULE_ACTION_LABEL: Record<string, string> = {
  LUU_TRU: "Lưu trữ",
  TRUYEN_GUI: "Truyền, gửi",
  IN_SAO_CHEP: "In ấn, sao chép",
  MANG_RA_NGOAI: "Mang ra ngoài Viện",
  CHIA_SE_BEN_THU_BA: "Chia sẻ với bên thứ ba",
  THIET_BI_CA_NHAN: "Lưu trên thiết bị cá nhân",
  CHI_MUC_AI: "Đưa vào chỉ mục AI",
  HUY: "Huỷ",
};

export const RULE_VERSION_STATUS_LABEL: Record<string, string> = {
  DRAFT: "Nháp",
  PENDING_APPROVAL: "Chờ phê duyệt",
  DA_PHE_DUYET: "Đã phê duyệt",
  HET_HIEU_LUC: "Hết hiệu lực",
};

export const RULE_VERSION_STATUS_TONE: Record<string, string> = {
  DRAFT: "neutral",
  PENDING_APPROVAL: "warn",
  DA_PHE_DUYET: "good",
  HET_HIEU_LUC: "neutral",
};

export const ITEM_TYPE_LABEL: Record<string, string> = {
  ASSET: "Tài sản thông tin",
  RULE_VERSION: "Bảng quy tắc xử lý",
};
