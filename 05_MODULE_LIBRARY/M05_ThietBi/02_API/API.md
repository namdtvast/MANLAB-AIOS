# M05_ThietBi — Đặc tả API

> Khung mẫu (template) — cập nhật nội dung cụ thể cho module. Xem M36_ChungChiSo làm ví dụ đã hoàn chỉnh.

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| POST | `/thietbi` | Người lập | Tạo bản ghi (Nháp) |
| GET | `/thietbi/{id}` | Nội bộ | Xem chi tiết |
| PUT | `/thietbi/{id}` | Người lập | Sửa (khi Nháp) |
| POST | `/thietbi/{id}/submit-review` | Người lập | → Chờ soát xét |
| POST | `/thietbi/{id}/approve` | Người phê duyệt | → Đã phê duyệt |
| GET | `/thietbi/{id}/audit` | Quản trị | Nhật ký thao tác |

> Mọi thao tác đổi trạng thái ghi AuditLog; vi phạm quy tắc → 409 kèm mã lỗi.
