# ETV.P.F 14.06 — Danh mục phân quyền tài khoản & thời hạn lưu

> Biểu mẫu gốc — cấu trúc cột chuẩn. Thuộc `ETV.P14` §7 (`permission`, `retention`), §13. Dữ liệu đầy đủ (theo từng menu/quy trình MP01–MP38) quản lý trong bảng tính vận hành của ManLab — file này quy định **cấu trúc cột bắt buộc**, tránh mỗi lần cập nhật lại định nghĩa lại cấu trúc khác nhau.

## Bảng 1 — Phân quyền truy cập menu (theo nhóm tài khoản)

| Menu/Danh mục | Quy trình liên quan (MPxx) | Lưu giữ (tháng) | Super Admin | LĐV | LĐP | Nhân viên | Khách hàng | CTV | Viewer |
|---|---|---|---|---|---|---|---|---|---|
| | | | | | | | | | |

Giá trị ô: `Có`/`Không`.

## Bảng 2 — Phân quyền hành động (theo nhóm tài khoản)

| Hành động | Super Admin | LĐV | LĐP | Nhân viên | Khách hàng | CTV | Viewer |
|---|---|---|---|---|---|---|---|
| Xem (view) | | | | | | | |
| Tạo mới (new) | | | | | | | |
| Nhân bản (copy) | | | | | | | |
| Chỉnh sửa (edit) | | | | | | | |
| Hủy (undo) | | | | | | | |
| Xóa (delete) | | | | | | | |
| Xuất Excel/Word | | | | | | | |
| Đề nghị soát xét | | | | | | | |
| Đề nghị phê duyệt | | | | | | | |
| Phê duyệt | | | | | | | |
| Ký số | | | | | | | |

Giá trị ô: `Y`/`N`.

> Mọi thay đổi phân quyền phải cập nhật bảng này **trước**, sau đó mới cấu hình trên ManLab (một nguồn sự thật — xem `ETV.P14` §13). Thay đổi phân quyền là một dạng sửa đổi văn bản, phải qua `ETV.P.F 14.01`.
