# M18_QuyTacQuyetDinh — Đặc tả API

> Khung mẫu (template) — cập nhật nội dung cụ thể cho module. Xem M36_ChungChiSo làm ví dụ đã hoàn chỉnh.

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| POST | `/quytacquyetdinh` | Người lập | Tạo bản ghi (Nháp) |
| GET | `/quytacquyetdinh/{id}` | Nội bộ | Xem chi tiết |
| PUT | `/quytacquyetdinh/{id}` | Người lập | Sửa (khi Nháp) |
| POST | `/quytacquyetdinh/{id}/submit-review` | Người lập | → Chờ soát xét |
| POST | `/quytacquyetdinh/{id}/approve` | Người phê duyệt | → Đã phê duyệt |
| GET | `/quytacquyetdinh/{id}/audit` | Quản trị | Nhật ký thao tác |

> Mọi thao tác đổi trạng thái ghi AuditLog; vi phạm quy tắc → 409 kèm mã lỗi.
