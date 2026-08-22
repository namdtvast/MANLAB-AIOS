# M35_NenTangSo — Mô hình dữ liệu

## Thực thể chính

| Thực thể | Trường chính | Khóa/Quan hệ |
|---|---|---|
| `AIPlatform` | `id`, `code` (duy nhất, vd MANLAB/VICONNECT), `name`, `base_url`, `api_base_url`, `environment` (PRODUCTION/STAGING/INTERNAL), `status` (HEALTHY/DEGRADED/DOWN/UNKNOWN), `owner`, `adapter_type` | PK `id`; 1—N `AIAgent`, `AITool`, `AIRequest` (tất cả ở [M29_AI](../../M29_AI/03_Database/DataModel.md)) |

## Ràng buộc

- `code` duy nhất toàn hệ thống; không tái sử dụng `code` của nền tảng đã Hết hiệu lực/Hủy.
- `adapter_type` phải khớp một `IAIPlatformAdapter` đã triển khai thật (không cho giá trị tự do
  không tương ứng implementation).
- Không cho phép entity ở M29_AI (`AIAgent.platform_id`, `AITool.platform_id`,
  `AIRequest.platform_id`) tham chiếu tới một `AIPlatform.id` không tồn tại hoặc đã Hủy —
  validate ở tầng application khi ghi.
- `status` (health) do tiến trình health check cập nhật, tách biệt khỏi vòng đời phê duyệt
  đăng ký nền tảng — xem [StateMachine.md](../07_Workflow/StateMachine.md).
