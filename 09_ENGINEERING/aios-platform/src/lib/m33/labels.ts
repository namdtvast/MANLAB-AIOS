// Nhãn hiển thị tiếng Việt — tách khỏi mã enum DB, khớp
// 05_MODULE_LIBRARY/M33_HeThongTT/01_Requirement/DacTa.md (ETV.P33 dự thảo, Chờ soát xét).

export const M33_ROLE_LABEL: Record<string, string> = {
  QTHT: "Quản trị hệ thống",
  ATTT: "Người phụ trách an toàn thông tin",
  VP: "Văn phòng",
  TP: "Trưởng phòng (đơn vị sử dụng)",
  QLCL: "Phụ trách Quản lý chất lượng",
  LDV: "Lãnh đạo Viện",
};

export const ASSET_CLASS_LABEL: Record<string, string> = {
  MAY_CHU: "Máy chủ",
  THIET_BI_MANG: "Thiết bị mạng",
  MAY_TRAM: "Máy trạm – máy tính xách tay",
  THIET_BI_DI_DONG: "Thiết bị di động",
  MAY_TINH_DIEU_KHIEN_DO: "Máy tính điều khiển – thu thập dữ liệu đo",
  THIET_BI_LUU_TRU: "Thiết bị lưu trữ",
  THIET_BI_NGOAI_VI: "Thiết bị ngoại vi",
  PHAN_MEM_BAN_QUYEN: "Phần mềm – bản quyền",
  DICH_VU_THUE_NGOAI: "Dịch vụ CNTT thuê ngoài",
  THIET_BI_KY_SO: "Thiết bị ký số",
};

export const NETWORK_ZONE_LABEL: Record<string, string> = {
  QUAN_TRI_VAN_PHONG: "Quản trị – văn phòng",
  THIET_BI_DO: "Thiết bị đo và thu thập dữ liệu",
  KHACH_WIFI: "Khách – Wi-Fi công cộng",
  KHONG_NOI_MANG: "Không nối mạng",
};

export const ENVIRONMENT_LABEL: Record<string, string> = {
  VAN_HANH: "Vận hành",
  KIEM_THU: "Kiểm thử",
  PHAT_TRIEN: "Phát triển",
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

export const DISCOVERY_LABEL: Record<string, string> = {
  KIEM_KE_KY_DAU: "Kiểm kê kỳ đầu",
  MUA_SAM_MOI: "Mua sắm mới",
  PHAT_HIEN_CHUA_KIEM_KE: "Phát hiện chưa kiểm kê",
};

export const ASSET_STATUS_LABEL: Record<string, string> = {
  DRAFT: "Nháp",
  PENDING_REVIEW: "Chờ soát xét",
  REVIEW_REJECTED: "Không soát xét",
  PENDING_APPROVAL: "Chờ phê duyệt",
  APPROVAL_REJECTED: "Không phê duyệt",
  OPERATING: "Đang vận hành",
  SUSPENDED: "Tạm ngừng",
  RETIRED: "Ngừng vận hành",
  DISPOSED: "Đã thanh lý",
  CANCELLED: "Hủy bản ghi",
};

export const ASSET_STATUS_TONE: Record<string, string> = {
  DRAFT: "neutral",
  PENDING_REVIEW: "warn",
  REVIEW_REJECTED: "crit",
  PENDING_APPROVAL: "warn",
  APPROVAL_REJECTED: "crit",
  OPERATING: "good",
  SUSPENDED: "warn",
  RETIRED: "neutral",
  DISPOSED: "crit",
  CANCELLED: "crit",
};

export const MAINTENANCE_CYCLE_LABEL: Record<string, string> = {
  THANG: "Hằng tháng",
  QUY: "Hằng quý",
  SAU_THANG: "06 tháng",
  NAM: "Hằng năm",
  THEO_KHUYEN_CAO_HANG: "Theo khuyến cáo hãng",
};

export const TASK_TYPE_LABEL: Record<string, string> = {
  BAO_TRI_DINH_KY: "Bảo trì định kỳ",
  VA_LOI_BAO_MAT: "Vá lỗi bảo mật",
  CAP_NHAT_PHIEN_BAN: "Cập nhật phiên bản",
  SUA_CHUA_SU_CO: "Sửa chữa sự cố",
  SAO_LUU_KIEM_TRA_KHOI_PHUC: "Sao lưu – kiểm tra khôi phục",
  THAY_THE_LINH_KIEN: "Thay thế linh kiện",
};

export const SEVERITY_LABEL: Record<string, string> = {
  NGHIEM_TRONG: "Nghiêm trọng (07 ngày)",
  CAO: "Cao (30 ngày)",
  TRUNG_BINH: "Trung bình (90 ngày)",
  THAP: "Thấp (chu kỳ kế tiếp)",
};

export const TASK_RESULT_LABEL: Record<string, string> = {
  THANH_CONG: "Thành công",
  THAT_BAI: "Thất bại",
  HOAN: "Hoãn",
};

export const TASK_STATUS_LABEL: Record<string, string> = {
  KE_HOACH: "Kế hoạch",
  DANG_THUC_HIEN: "Đang thực hiện",
  CHO_NGHIEM_THU: "Chờ nghiệm thu",
  HOAN_THANH: "Hoàn thành",
  HUY: "Hủy",
};

export const TASK_STATUS_TONE: Record<string, string> = {
  KE_HOACH: "neutral",
  DANG_THUC_HIEN: "warn",
  CHO_NGHIEM_THU: "warn",
  HOAN_THANH: "good",
  HUY: "crit",
};

export const PLAN_STATUS_LABEL: Record<string, string> = {
  DRAFT: "Nháp",
  CHO_PHE_DUYET: "Chờ phê duyệt",
  DA_PHE_DUYET: "Đã phê duyệt",
  THAY_THE: "Thay thế",
};

export const PLAN_STATUS_TONE: Record<string, string> = {
  DRAFT: "neutral",
  CHO_PHE_DUYET: "warn",
  DA_PHE_DUYET: "good",
  THAY_THE: "neutral",
};

export const ACCOUNT_TYPE_LABEL: Record<string, string> = {
  CA_NHAN_DINH_DANH: "Cá nhân định danh",
  DAC_QUYEN_QUAN_TRI: "Đặc quyền – quản trị",
  DICH_VU_HE_THONG: "Dịch vụ – hệ thống",
  BEN_THU_BA: "Bên thứ ba",
  DUNG_CHUNG_NGOAI_LE: "Dùng chung (ngoại lệ)",
};

export const ACCOUNT_STATUS_LABEL: Record<string, string> = {
  DANG_HOAT_DONG: "Đang hoạt động",
  TAM_KHOA: "Tạm khóa",
  DA_THU_HOI: "Đã thu hồi",
};

export const ACCOUNT_STATUS_TONE: Record<string, string> = {
  DANG_HOAT_DONG: "good",
  TAM_KHOA: "warn",
  DA_THU_HOI: "neutral",
};

export const RECON_SCOPE_LABEL: Record<string, string> = {
  TOAN_BO: "Toàn bộ tài khoản (06 tháng/lần)",
  DAC_QUYEN_DICH_VU: "Đặc quyền và dịch vụ (≥ 02 lần/năm, trình LĐV)",
};

export const RECON_STATUS_LABEL: Record<string, string> = {
  DANG_THUC_HIEN: "Đang thực hiện",
  DA_CHOT: "Đã chốt (bất biến)",
};

export const INCIDENT_KIND_LABEL: Record<string, string> = {
  SU_CO: "Sự cố",
  YEU_CAU_HO_TRO: "Yêu cầu hỗ trợ",
};

export const IMPACT_LABEL: Record<string, string> = {
  NGUNG_TOAN_VIEN: "Ngừng dịch vụ toàn Viện",
  NGUNG_MOT_PHONG: "Ngừng một phòng – một hệ thống",
  ANH_HUONG_MOT_NGUOI: "Ảnh hưởng một người dùng",
  KHONG_ANH_HUONG: "Không ảnh hưởng vận hành",
};

export const PRIORITY_LABEL: Record<string, string> = {
  CAO: "Cao",
  TRUNG_BINH: "Trung bình",
  THAP: "Thấp",
};

export const PRIORITY_TONE: Record<string, string> = {
  CAO: "crit",
  TRUNG_BINH: "warn",
  THAP: "neutral",
};

export const INCIDENT_STATUS_LABEL: Record<string, string> = {
  MOI: "Mới",
  DANG_XU_LY: "Đang xử lý",
  CHO_BEN_THU_BA: "Chờ bên thứ ba",
  DA_XU_LY: "Đã xử lý",
  DA_DONG: "Đã đóng",
  HUY: "Hủy",
};

export const INCIDENT_STATUS_TONE: Record<string, string> = {
  MOI: "crit",
  DANG_XU_LY: "warn",
  CHO_BEN_THU_BA: "warn",
  DA_XU_LY: "warn",
  DA_DONG: "good",
  HUY: "neutral",
};
