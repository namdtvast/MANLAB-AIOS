# M29_AI — Mô hình dữ liệu

## Thực thể chính

| Thực thể | Trường chính | Khóa/Quan hệ |
|---|---|---|
| `AIProvider` | `id`, `code` (GEMINI/OPENAI/…), `name`, `status` | PK `id`; 1—N `AIModel` |
| `AIModel` | `id`, `provider_id`, `model_id`, `display_name`, `purpose`, `status`, `temperature`, `max_tokens`, `cost_profile_id`, `version` | FK `provider_id` → `AIProvider` |
| `AIAgent` | `id`, `platform_id`, `code`, `name`, `purpose`, `model_id`, `active_prompt_version_id`, `status`, `risk_level`, `owner`, `version` | FK `platform_id` → `AIPlatform` (M35); FK `model_id` → `AIModel` |
| `AISkill` | `id`, `code`, `name`, `platform_scope`, `version`, `status`, `risk_level` | N—N `AIAgent` qua `AIAgentSkill` |
| `AIAgentSkill` | `agent_id`, `skill_id` | bảng nối |
| `AITool` | `id`, `platform_id`, `code`, `name`, `endpoint`, `http_method`, `input_schema`, `output_schema`, `permission_level` (READ/COMPUTE/PROPOSE/EXECUTE), `risk_level`, `require_confirmation`, `require_approval`, `status`, `version` | FK `platform_id` → `AIPlatform`; N—N `AISkill` (`AISkillTool`), N—N `AIAgent` (`AIAgentTool`) |
| `AISkillTool` | `skill_id`, `tool_id` | bảng nối |
| `AIAgentTool` | `agent_id`, `tool_id` | bảng nối — whitelist Tool Gateway tra theo đây |
| `AIPrompt` | `id`, `code`, `agent_id` | FK `agent_id` → `AIAgent` |
| `AIPromptVersion` | `id`, `prompt_id`, `content`, `status` (DRAFT/REVIEW/APPROVED/ACTIVE/ARCHIVED), `created_by`, `approved_by`, `effective_from` | FK `prompt_id` → `AIPrompt` |
| `AIGuardrail` | `id`, `code`, `description`, `scope` (SYSTEM/PLATFORM/AGENT/SKILL/TOOL/WORKFLOW), `scope_ref`, `severity`, `action` (BLOCK/WARN/REQUIRE_CONFIRMATION/REQUIRE_APPROVAL), `status` | FK động `scope_ref` → Agent/Tool/... theo `scope` |
| `AIPolicy` | `id`, `name`, `version`, `owner`, `approver`, `effective_date`, `status`, `reference` | tham chiếu tự do tới Agent/Platform/Use case |
| `AIImpactAssessment` | `id`, `code` (AIA-YYYY-NNN), `agent_id`, `purpose`, `data_used`, `affected_users`, `risk`, `human_oversight`, `controls`, `residual_risk`, `status` (NOT_ASSESSED/DRAFT/REVIEWED/APPROVED/REVIEW_REQUIRED), `review_date` | FK `agent_id` → `AIAgent` |
| `AIEvaluationSuite` | `id`, `name`, `agent_id` | FK `agent_id` → `AIAgent` |
| `AIEvaluationCase` | `id`, `suite_id`, `input`, `expected` | FK `suite_id` |
| `AIEvaluationRun` | `id`, `suite_id`, `agent_version`, `pass_count`, `fail_count`, `status` | FK `suite_id` |
| `AIRequest` (Trace) | `id` (= TraceId), `platform_id`, `agent_id`, `model_id`, `prompt_version_id`, `user_ref`, `input_tokens`, `output_tokens`, `latency_ms`, `guardrail_result`, `evaluation_result`, `created_at` | FK `agent_id`; 1—N `AIToolCall`; append-only |
| `AIToolCall` | `id`, `request_id`, `tool_id`, `input`, `output`, `status`, `latency_ms`, `error_code` | FK `request_id` → `AIRequest`, FK `tool_id` → `AITool`; append-only |
| `AICostUsage` | `id`, `platform_id`, `agent_id`, `model_id`, `date`, `tokens_in`, `tokens_out`, `cost_estimate` | tổng hợp theo ngày từ `AIRequest` |
| `AISecret` | `id`, `platform_id`, `name`, `masked_value`, `status`, `last_rotated`, `last_used` | giá trị thật lưu ngoài phạm vi entity này (kho secret riêng), không có trường giá trị thật ở đây |
| `AIAuditLog` | `id`, `actor`, `entity_type`, `entity_id`, `field`, `before`, `after`, `reason`, `at` | append-only, không có API sửa/xóa |

## Ràng buộc

- Mọi entity có `version`/vòng đời phê duyệt (Prompt/Policy/Guardrail/AIA): sửa bản đã hiệu
  lực **không ghi đè** — tạo bản ghi version mới. Xem vòng đời chuẩn ở
  [StateMachine.md](../07_Workflow/StateMachine.md).
- `AITool.permission_level = EXECUTE` bắt buộc `require_confirmation=true` **hoặc**
  `require_approval=true` (không được cả hai đều `false`).
- `AIAuditLog`, `AIRequest`, `AIToolCall` là append-only — không có thao tác xóa/sửa.
- `AISecret.masked_value` là giá trị duy nhất trả ra API/UI/log/trace; giá trị thật lưu tách
  biệt khỏi phạm vi đọc thông thường (loại trừ khỏi backup/export chung, không đưa vào version
  control).
- `AIAgent.platform_id`, `AITool.platform_id` phải trỏ tới một bản ghi `AIPlatform` đã tồn tại
  trong Platform Registry — xem [M35_NenTangSo/03_Database/DataModel.md](../../M35_NenTangSo/03_Database/DataModel.md).
