# ETV.P.F 14.02 — Danh mục văn bản nội bộ

> Biểu mẫu gốc — bản trắng. Thuộc `ETV.P14` §6.1, §10.1 bước 6. Danh sách sống thực tế quản lý trên ManLab; file này là cấu trúc cột chuẩn để nhân bản (Excel/ManLab), không lưu dữ liệu thật tại đây.

| Mã số (`id`) | Tên văn bản (`title`) | Loại (`type`) | Chủ sở hữu (`owner`) | Phòng/bộ phận (`department`) | Quy trình (`process`) | Lần ban hành (`revision`) | Ngày hiệu lực (`effective_date`) | Trạng thái (`status`) | Điều khoản ISO (`iso_clause`) | Căn cứ pháp lý (`legal_basis`) | Thay thế (`supersedes`) | Được thay thế bởi (`superseded_by`) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| | | | | | | | | | | | | |

Danh mục loại hình văn bản nội bộ (giá trị hợp lệ cho cột `type`): Sổ tay chất lượng · Thủ tục · Quy trình · Hướng dẫn · Biểu mẫu · Quyết định · Công văn · Thông báo · Biên bản · Báo cáo. *(Hợp đồng không thuộc P14 — quản lý tại P03/P07.)*

Trạng thái (`status`) lấy đúng giá trị theo `05_MODULE_LIBRARY/M14_TaiLieu/07_Workflow/StateMachine.md`: Nháp · Chờ soát xét · Không soát xét · Chờ phê duyệt · Không phê duyệt · Đã phê duyệt · Hết hiệu lực/Hủy.
