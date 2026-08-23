// Nhãn hiển thị tiếng Việt — tách khỏi mã enum DB, khớp ETV.P14 §6.3 và StateMachine.md.
export const DOC_TYPE_LABEL: Record<string, string> = {
  SO_TAY: "Sổ tay chất lượng",
  THU_TUC: "Thủ tục",
  QUY_TRINH: "Quy trình",
  HUONG_DAN: "Hướng dẫn",
  BIEU_MAU: "Biểu mẫu",
  QUYET_DINH: "Quyết định",
  CONG_VAN: "Công văn",
  THONG_BAO: "Thông báo",
  BIEN_BAN: "Biên bản",
  BAO_CAO: "Báo cáo",
  GIAY_CHUNG_NHAN: "Giấy chứng nhận",
  VAN_BAN_BEN_NGOAI: "Văn bản bên ngoài",
};

// Đúng 7 giá trị của 07_Workflow/StateMachine.md — không thêm trạng thái mới.
export const DOC_STATUS_LABEL: Record<string, string> = {
  NHAP: "Nháp",
  CHO_SOAT_XET: "Chờ soát xét",
  KHONG_SOAT_XET: "Không soát xét",
  CHO_PHE_DUYET: "Chờ phê duyệt",
  KHONG_PHE_DUYET: "Không phê duyệt",
  DA_PHE_DUYET: "Đã phê duyệt",
  HET_HIEU_LUC_HUY: "Hết hiệu lực/Hủy",
};

export const KNOWLEDGE_CATEGORY_LABEL: Record<string, string> = {
  NOI_BO: "Nội bộ",
  CONG_KHAI: "Công khai",
  MAT: "Mật",
};

export const DISPOSAL_LABEL: Record<string, string> = {
  THANH_LY: "Thanh lý (giữ lưu tham khảo)",
  HUY_BO: "Hủy bỏ khỏi phạm vi kiểm soát",
};

export const M14_ROLE_LABEL: Record<string, string> = {
  NTH: "Người lập (NTH)",
  LDP: "Lãnh đạo Phòng — soát xét",
  LDV: "Lãnh đạo Viện — phê duyệt",
  LDV_UYQUYEN: "Người được LĐV ủy quyền",
  VANTHU: "Văn thư/QLCL",
  AI_AGENT: "AI Agent (← M29)",
};
