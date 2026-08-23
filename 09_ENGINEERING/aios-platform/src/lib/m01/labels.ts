// Nhãn hiển thị tiếng Việt — tách khỏi mã enum DB, khớp DacTa.md/ETV.P01.
export const STATUS_LABEL: Record<string, string> = {
  DRAFT: "Đang soạn",
  PENDING_REVIEW: "Đang soát xét",
  PENDING_LEADER_APPROVAL: "Chờ LĐV quyết định",
  IN_PROGRESS: "Đang xử lý",
  DONE: "Hoàn thành",
};

export const RISK_SOURCE_LABEL: Record<string, string> = {
  DANH_GIA_NOI_BO: "Đánh giá nội bộ",
  XEM_XET_LANH_DAO: "Xem xét của lãnh đạo",
  DE_XUAT_NHAN_VIEN: "Đề xuất của nhân viên",
  PHAN_NAN: "Phàn nàn",
  DANH_GIA_BEN_NGOAI: "Đánh giá bên ngoài",
  TNTT_SSLP: "Đảm bảo giá trị kết quả bằng TNTT/SSLP",
  KHAC: "Nguồn gốc khác",
};

export const OPP_SOURCE_LABEL: Record<string, string> = {
  DANH_GIA_NOI_BO: "Đánh giá nội bộ",
  DE_XUAT_NHAN_VIEN: "Đề xuất của nhân viên",
  PHAN_HOI_KHACH_HANG: "Phản hồi khách hàng",
  KHAC: "Khác",
};

export const RISK_LEVEL_LABEL: Record<string, string> = {
  THAP: "Thấp",
  TRUNGBINH: "Trung bình",
  CAO: "Cao",
  RATCAO: "Rất cao",
};

export const VERIFY_RESULT_LABEL: Record<string, string> = {
  DAT: "Đạt",
  CHUA_DAT: "Chưa đạt",
};

export const M01_ROLE_LABEL: Record<string, string> = {
  NV: "Nhân viên",
  TP_QLCL: "Trưởng phòng / QLCL",
  LDV: "Lãnh đạo Viện",
};
