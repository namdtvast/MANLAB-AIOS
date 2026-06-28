# M20_PhanPhoi — Đặc tả API

> Khung mẫu (template) — cập nhật nội dung cụ thể cho module. Xem M36_ChungChiSo làm ví dụ đã hoàn chỉnh.

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| POST | `/phanphoi` | Người lập | Tạo bản ghi (Nháp) |
| GET | `/phanphoi/{id}` | Nội bộ | Xem chi tiết |
| PUT | `/phanphoi/{id}` | Người lập | Sửa (khi Nháp) |
| POST | `/phanphoi/{id}/submit-review` | Người lập | → Chờ soát xét |
| POST | `/phanphoi/{id}/approve` | Người phê duyệt | → Đã phê duyệt |
| GET | `/phanphoi/{id}/audit` | Quản trị | Nhật ký thao tác |

> Mọi thao tác đổi trạng thái ghi AuditLog; vi phạm quy tắc → 409 kèm mã lỗi.
