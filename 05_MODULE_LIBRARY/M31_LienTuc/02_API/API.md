# M31_LienTuc — Đặc tả API

> Khung mẫu (template) — cập nhật nội dung cụ thể cho module. Xem M36_ChungChiSo làm ví dụ đã hoàn chỉnh.

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| POST | `/lientuc` | Người lập | Tạo bản ghi (Nháp) |
| GET | `/lientuc/{id}` | Nội bộ | Xem chi tiết |
| PUT | `/lientuc/{id}` | Người lập | Sửa (khi Nháp) |
| POST | `/lientuc/{id}/submit-review` | Người lập | → Chờ soát xét |
| POST | `/lientuc/{id}/approve` | Người phê duyệt | → Đã phê duyệt |
| GET | `/lientuc/{id}/audit` | Quản trị | Nhật ký thao tác |

> Mọi thao tác đổi trạng thái ghi AuditLog; vi phạm quy tắc → 409 kèm mã lỗi.
