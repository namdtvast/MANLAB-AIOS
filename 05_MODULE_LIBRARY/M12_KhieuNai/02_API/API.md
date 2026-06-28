# M12_KhieuNai — Đặc tả API

> Khung mẫu (template) — cập nhật nội dung cụ thể cho module. Xem M36_ChungChiSo làm ví dụ đã hoàn chỉnh.

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| POST | `/khieunai` | Người lập | Tạo bản ghi (Nháp) |
| GET | `/khieunai/{id}` | Nội bộ | Xem chi tiết |
| PUT | `/khieunai/{id}` | Người lập | Sửa (khi Nháp) |
| POST | `/khieunai/{id}/submit-review` | Người lập | → Chờ soát xét |
| POST | `/khieunai/{id}/approve` | Người phê duyệt | → Đã phê duyệt |
| GET | `/khieunai/{id}/audit` | Quản trị | Nhật ký thao tác |

> Mọi thao tác đổi trạng thái ghi AuditLog; vi phạm quy tắc → 409 kèm mã lỗi.
