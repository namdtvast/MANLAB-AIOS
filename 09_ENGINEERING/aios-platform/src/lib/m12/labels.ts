// Nhãn hiển thị tiếng Việt — tách khỏi mã enum DB, khớp DacTa.md/ETV.P12.
export const CHANNEL_LABEL: Record<string, string> = {
  TRUC_TIEP: "Trực tiếp",
  DIEN_THOAI: "Điện thoại",
  EMAIL: "Email",
  VAN_BAN: "Văn bản",
  FORM_ONLINE: "Form online",
};

export const COMPLAINT_STATUS_LABEL: Record<string, string> = {
  NHAP: "Nháp",
  DANG_XU_LY: "Đang xử lý",
  DA_TRA_LOI: "Đã trả lời",
  DONG_HO_SO: "Đóng hồ sơ",
  KHONG_DAT_THOA_THUAN: "Không đạt thỏa thuận",
};

export const FEEDBACK_ORIGIN_LABEL: Record<string, string> = {
  KHACH_HANG: "Khách hàng",
  NOI_BO: "Nội bộ",
};

export const FEEDBACK_CATEGORY_LABEL: Record<string, string> = {
  QUY_TRINH: "Quy trình",
  THAI_DO_PHUC_VU: "Thái độ phục vụ",
  PHOI_HOP_NOI_BO: "Phối hợp nội bộ",
  DIEU_HANH: "Điều hành",
  THOI_GIAN_XU_LY: "Thời gian xử lý",
};

export const M12_ROLE_LABEL: Record<string, string> = {
  QLCL: "Quản lý chất lượng",
  LDV: "Lãnh đạo Viện",
  TIEPNHAN: "Người tiếp nhận",
  PHUTRACH: "Cán bộ phụ trách xử lý",
};
