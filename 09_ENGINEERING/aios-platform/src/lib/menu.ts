// Nhãn hiển thị và thứ tự của các nhóm menu — Increment 1 của
// _meta/specs/20260823-menu-phan-quyen-manlab (SPEC §2.2).
//
// Ở đây CHỈ có phần trình bày (nhãn tiếng Việt + thứ tự nhóm trên sidebar).
// Phép gán "module Mxx thuộc nhóm nào" là nguồn sự thật của repo, khai ở
// 04_PROCESS_LIBRARY/MPxx/manifest.yaml (menu_group/menu_order) và nạp vào
// PlatformModule.menuGroup qua prisma/seed.ts — không lặp lại ở file này.

export const MENU_GROUPS = [
  { code: "DIEU_HANH", label: "Điều hành & hoạch định" },
  { code: "NGUON_LUC", label: "Nguồn lực" },
  { code: "KHACH_HANG", label: "Khách hàng & dịch vụ" },
  { code: "KY_THUAT", label: "Chuỗi kỹ thuật" },
  { code: "CHAT_LUONG", label: "Chất lượng & tuân thủ" },
  { code: "DU_LIEU_SO", label: "Dữ liệu & chứng chỉ số" },
  { code: "CONG_NGHE", label: "Công nghệ & an toàn thông tin" },
] as const;

// Trùng với DEFAULT_MENU_GROUP của prisma/seed.ts: module chưa khai nhóm vẫn
// phải xuất hiện trong menu thay vì biến mất.
export const DEFAULT_MENU_GROUP = "CHAT_LUONG";
