# M35_NenTangSo — Đặc tả API

| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| GET | `/api/ai/platforms` | AI_VIEWER | Danh sách nền tảng đã đăng ký, kèm `status` health hiện tại |
| POST | `/api/ai/platforms` | AI_ADMIN | Đăng ký nền tảng mới (Nháp) |
| GET | `/api/ai/platforms/{id}` | AI_VIEWER | Chi tiết 1 nền tảng |
| PUT | `/api/ai/platforms/{id}` | AI_ADMIN | Sửa (khi Nháp) hoặc tạo thay đổi cần soát xét lại nếu đang Hiệu lực |
| POST | `/api/ai/platforms/{id}/submit-review` | Người lập | → Chờ soát xét |
| POST | `/api/ai/platforms/{id}/approve` | Người phê duyệt | → Đã phê duyệt → Hiệu lực |
| GET | `/api/ai/platforms/{id}/health` | AI_VIEWER | Kết quả health check gần nhất (`HEALTHY`/`DEGRADED`/`DOWN`/`UNKNOWN`, `last_error`) |
| GET | `/api/ai/platforms/{id}/audit` | AI_AUDITOR | Nhật ký thay đổi cấu hình nền tảng này (dùng `AIAuditLog` chung của M29_AI) |

> Đây là API duy nhất quản trị *định danh* nền tảng. API quản trị Agent/Tool/Prompt chạy trên
> từng nền tảng (lọc theo `platform_id` trả về từ `/api/ai/platforms`) thuộc
> [M29_AI/02_API/API.md](../../M29_AI/02_API/API.md).

Mọi thao tác đổi trạng thái ghi `AIAuditLog`; vi phạm quy tắc (vd `code` trùng, `platform_id`
không tồn tại khi Agent/Tool bên M29 tham chiếu tới) → lỗi thống nhất
`{ traceId, errorCode, component, timestamp }`.
