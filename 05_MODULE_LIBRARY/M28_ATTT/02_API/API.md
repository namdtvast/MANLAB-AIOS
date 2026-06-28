# M28_ATTT — Đặc tả API

> Khung mẫu (template) — cập nhật nội dung cụ thể cho module. Xem M36_ChungChiSo làm ví dụ đã hoàn chỉnh.

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| POST | `/attt` | Người lập | Tạo bản ghi (Nháp) |
| GET | `/attt/{id}` | Nội bộ | Xem chi tiết |
| PUT | `/attt/{id}` | Người lập | Sửa (khi Nháp) |
| POST | `/attt/{id}/submit-review` | Người lập | → Chờ soát xét |
| POST | `/attt/{id}/approve` | Người phê duyệt | → Đã phê duyệt |
| GET | `/attt/{id}/audit` | Quản trị | Nhật ký thao tác |

> Mọi thao tác đổi trạng thái ghi AuditLog; vi phạm quy tắc → 409 kèm mã lỗi.
