// Nhãn hiển thị tiếng Việt — tách khỏi mã enum DB, khớp DacTa.md/ETV.P17.
export const PLAN_STATUS_LABEL: Record<string, string> = {
  DRAFT: "Đang soạn",
  PENDING_APPROVAL: "Chờ duyệt",
  APPROVED: "Đã duyệt",
  REJECTED: "Không duyệt",
};

export const ACTION_STATUS_LABEL: Record<string, string> = {
  DANG_THUC_HIEN: "Đang thực hiện",
  HOAN_THANH: "Hoàn thành",
};

export const M17_ROLE_LABEL: Record<string, string> = {
  QLCL: "Quản lý chất lượng",
  TP: "Trưởng phòng",
  LDV: "Lãnh đạo Viện",
};

// 12 nội dung xem xét bắt buộc — ISO/IEC 17025:2017 §8.9, DacTa.md mục 2.4
export const REVIEW_TOPICS: { id: number; label: string }[] = [
  { id: 1, label: "Sự phù hợp của chính sách và mục tiêu chất lượng" },
  { id: 2, label: "Sự phù hợp của các thủ tục" },
  { id: 3, label: "Các kết quả đánh giá nội bộ" },
  { id: 4, label: "Tình trạng hành động từ các cuộc xem xét trước" },
  { id: 5, label: "Kết quả các cuộc đánh giá nội bộ gần nhất" },
  { id: 6, label: "Các hành động khắc phục" },
  { id: 7, label: "Kết quả đánh giá của tổ chức bên ngoài" },
  { id: 8, label: "Kết quả so sánh liên phòng/thử nghiệm thành thạo" },
  { id: 9, label: "Khiếu nại, phản hồi khách hàng, phản hồi nhân viên" },
  { id: 10, label: "Khuyến nghị cải tiến" },
  { id: 11, label: "Vấn đề quan trọng khác (chất lượng, nguồn lực, đào tạo)" },
  { id: 12, label: "Mục tiêu năm tiếp theo" },
];
