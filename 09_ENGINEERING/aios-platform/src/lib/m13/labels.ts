// Nhãn hiển thị tiếng Việt — tách khỏi mã enum DB, khớp DacTa.md/ETV.P13.
export const SOURCE_TYPE_LABEL: Record<string, string> = {
  TU_PHAT_HIEN: "Tự phát hiện",
  KHIEU_NAI: "Từ khiếu nại (← M12)",
  IC_VUOT_GIOI_HAN: "IC vượt giới hạn kiểm soát (← M05)",
  DANH_GIA_NOI_BO: "Phát hiện khi đánh giá nội bộ (← M16)",
  KHAC: "Khác",
};

export const SEVERITY_LABEL: Record<string, string> = {
  NHE: "Nhẹ",
  NANG: "Nặng",
};

export const NCW_STATUS_LABEL: Record<string, string> = {
  GHI_NHAN: "Ghi nhận",
  DANG_THEO_DOI: "Đang theo dõi",
  DANG_KHAC_PHUC: "Đang khắc phục",
  DA_KHAC_PHUC: "Đã khắc phục",
};

export const CAP_STATUS_LABEL: Record<string, string> = {
  DANG_THUC_HIEN: "Đang thực hiện",
  CHO_THAM_XET: "Chờ thẩm xét",
  DAT: "Thẩm xét đạt",
  KHONG_DAT: "Thẩm xét không đạt",
};

export const M13_ROLE_LABEL: Record<string, string> = {
  NHANVIEN: "Nhân viên PTN",
  QLCL: "Quản lý chất lượng",
  QLKT: "Quản lý kỹ thuật",
  LDV: "Lãnh đạo Viện",
};
