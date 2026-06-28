# M03_NhanSu — Đặc tả API

> Khung mẫu (template) — cập nhật nội dung cụ thể cho module. Xem M36_ChungChiSo làm ví dụ đã hoàn chỉnh.

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| POST | `/nhansu` | Người lập | Tạo bản ghi (Nháp) |
| GET | `/nhansu/{id}` | Nội bộ | Xem chi tiết |
| PUT | `/nhansu/{id}` | Người lập | Sửa (khi Nháp) |
| POST | `/nhansu/{id}/submit-review` | Người lập | → Chờ soát xét |
| POST | `/nhansu/{id}/approve` | Người phê duyệt | → Đã phê duyệt |
| GET | `/nhansu/{id}/audit` | Quản trị | Nhật ký thao tác |

> Mọi thao tác đổi trạng thái ghi AuditLog; vi phạm quy tắc → 409 kèm mã lỗi.
