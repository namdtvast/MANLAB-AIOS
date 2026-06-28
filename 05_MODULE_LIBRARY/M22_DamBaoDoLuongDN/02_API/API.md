# M22_DamBaoDoLuongDN — Đặc tả API

> Khung mẫu (template) — cập nhật nội dung cụ thể cho module. Xem M36_ChungChiSo làm ví dụ đã hoàn chỉnh.

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| POST | `/dambaodoluongdn` | Người lập | Tạo bản ghi (Nháp) |
| GET | `/dambaodoluongdn/{id}` | Nội bộ | Xem chi tiết |
| PUT | `/dambaodoluongdn/{id}` | Người lập | Sửa (khi Nháp) |
| POST | `/dambaodoluongdn/{id}/submit-review` | Người lập | → Chờ soát xét |
| POST | `/dambaodoluongdn/{id}/approve` | Người phê duyệt | → Đã phê duyệt |
| GET | `/dambaodoluongdn/{id}/audit` | Quản trị | Nhật ký thao tác |

> Mọi thao tác đổi trạng thái ghi AuditLog; vi phạm quy tắc → 409 kèm mã lỗi.
