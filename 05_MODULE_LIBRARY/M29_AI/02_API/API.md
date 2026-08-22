# M29_AI — Đặc tả API

> REST/JSON. Entry point duy nhất để Agent gọi API của một nền tảng là `POST
> /api/ai/tools/{id}/call` (Tool Gateway) — không có route nào khác cho phép Agent gọi thẳng
> API bên ngoài. Mọi POST/PUT ghi `AIAuditLog`. Lỗi trả về thống nhất
> `{ traceId, errorCode, component, timestamp }`.

| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| GET/POST | `/api/ai/providers` | AI_VIEWER / AI_ADMIN | Provider registry |
| GET/POST | `/api/ai/models` | AI_VIEWER / AI_ADMIN | Model registry (gắn `provider_id`) |
| GET/POST | `/api/ai/agents` | AI_VIEWER / AI_ADMIN | Agent registry |
| GET | `/api/ai/agents/{id}` | AI_VIEWER | Agent Detail: Model + Prompt hiệu lực + Skills + Tools + Guardrails + AIA + Evaluation gần nhất |
| GET/POST | `/api/ai/skills` | AI_VIEWER / AI_ADMIN | Skill registry |
| GET/POST | `/api/ai/tools` | AI_VIEWER / AI_ADMIN | Tool registry (`permission_level`, `endpoint`, `status`) |
| POST | `/api/ai/tools/{id}/call` | theo `permission_level` của Tool + quyền user | **Tool Gateway** — bắt buộc `agentId`; kiểm tra Tool `status`/whitelist theo Agent, **AIA Gate** (Agent phải có AIA `APPROVED`), forward tới Platform Adapter (M35), ghi `AIRequest` + `AIToolCall` |
| GET/POST | `/api/ai/prompts` | AI_ADMIN | Prompt registry |
| GET/POST | `/api/ai/prompts/{id}/versions` | AI_ADMIN | Tạo/xem version Prompt (lifecycle DRAFT→ACTIVE); `.../activate` áp **Deployment Gate** — chặn nếu Evaluation gần nhất của Agent `FAIL` |
| GET/POST | `/api/ai/guardrails` | AI_SECURITY_ADMIN | Guardrail registry |
| GET/POST | `/api/ai/policies` | AI_SECURITY_ADMIN | Policy registry |
| GET/POST | `/api/ai/aia` | AI_ADMIN (duyệt: người có thẩm quyền, không phải AI) | AI Impact Assessment |
| GET/POST | `/api/ai/evaluations` | AI_OPERATOR | Evaluation suite/case/run |
| GET | `/api/ai/traces` | AI_OPERATOR / AI_AUDITOR | Danh sách Trace, filter theo Platform/Agent/ngày |
| GET | `/api/ai/traces/{id}` | AI_OPERATOR / AI_AUDITOR | Chi tiết 1 Trace: chain đầy đủ User→Agent→Skill→Tool→API→Result→Model→Tokens→Latency |
| GET | `/api/ai/usage`, `/api/ai/costs` | AI_OPERATOR | Token/Cost theo Platform/Agent/Model/ngày |
| GET/POST | `/api/ai/secrets` | đọc: AI_SECURITY_ADMIN (masked); ghi: AI_SECURITY_ADMIN | Secret registry — đọc luôn trả `masked_value` |
| GET | `/api/ai/audit-logs` | AI_AUDITOR (read-only) | Audit Log, không có route sửa/xóa |
| GET | `/api/ai/health` | AI_VIEWER | System Health tổng hợp theo Platform/Provider |

## Ghi chú triển khai

- Không có route DELETE cho `AIRequest`, `AIToolCall`, `AIAuditLog` (append-only theo quy tắc
  nghiệp vụ #2 trong [DacTa.md](../01_Requirement/DacTa.md)).
- Danh sách Platform (`AIPlatform`) và endpoint quản trị Platform thuộc
  [M35_NenTangSo/02_API/API.md](../../M35_NenTangSo/02_API/API.md) — mọi entity trên đây lọc
  được theo `platform_id` trả về từ đó.
- Đặc tả request/response schema chi tiết từng field, ví dụ curl, mã lỗi cụ thể: hoàn thiện khi
  BUILD (chưa phê duyệt triển khai) — xem
  [`_work/20260822-aios-control-plane/spec.md`](../01_Requirement/_work/20260822-aios-control-plane/spec.md)
  mục E cho bản nháp kỹ hơn.
