# Feature Spec — 20260822-aios-control-plane

> Tier L. Phạm vi Phase 1 (Control & Visibility) cho CAP-29_AIOffice, số hóa qua M29_AI (lõi)
> + M35_NenTangSo (Platform Registry). Xem `outcome.md` cho RECON/OUTCOME đầy đủ.

## A. CURRENT STATE (tóm tắt — RECON đầy đủ ở `outcome.md`)

- `07_AI_OPERATING_SYSTEM` = cấu hình Skill cho Claude Code, không phải sản phẩm.
- `M29_AI`, `M35_NenTangSo`, `M38_DichVuSo` = khung mẫu rỗng, chưa có dữ liệu/API/UI thật.
- Duy nhất `M10_DamBaoKQ/08_Source` là mẫu tham chiếu phần mềm thật đang chạy trong repo
  (Node.js thuần + JSON store + webapp ES module, RBAC mô phỏng qua header).
- Không có Platform Registry, Agent/Tool/Prompt Registry, Trace, Token/Cost, RBAC, Audit
  nào tồn tại dưới dạng phần mềm.
- VI-CONNECT: không có source/API trong hệ sinh thái này để tích hợp thật.

## B. GAP ANALYSIS

| Yêu cầu (mục 41 DoD Phase 1 bản gốc) | Hiện trạng | Gap | Hành động |
|---|---|---|---|
| Platform selector, quản trị ≥2 Platform độc lập | Không tồn tại | 100% | Tạo `AIPlatform` registry trong M35 |
| Xem Provider/Model đang active | Không tồn tại | 100% | Tạo `AIProvider`/`AIModel` trong M29 |
| Xem Agent, Skills của Agent, Tools của Agent | Không tồn tại | 100% | Tạo `AIAgent`/`AISkill`/`AITool` + bảng quan hệ |
| Tool hiển thị API + permission | Không tồn tại | 100% | `AITool.permission_level` (READ/COMPUTE/PROPOSE/EXECUTE) |
| Prompt có version | Không tồn tại | 100% | `AIPrompt`/`AIPromptVersion`, lifecycle DRAFT→ACTIVE |
| AI Trace, thể hiện Tool/API đã gọi | Không tồn tại | 100% | `AIRequest`/`AIToolCall` + Tool Gateway ghi log |
| Thống kê token/chi phí | Không tồn tại | 100% | `AIUsage`/`AICostUsage`, cấu hình giá theo version |
| System Health | Không tồn tại | 100% | `AIHealthCheck` polling Provider/Platform API |
| Evaluation Suite | Không tồn tại | 100% | `AIEvaluationSuite/Case/Run` — Phase 1 chỉ smoke test |
| RBAC | Không có (M10 dùng X-Role mô phỏng) | 100% | Áp mô hình mô phỏng tương tự M10, ghi rõ giới hạn |
| Secret không lộ frontend | N/A (chưa có secret nào) | 100% | `AISecret` chỉ lưu masked value ra API/UI |
| Audit Log | Không có | 100% | `AIAuditLog` append-only cho mọi write API |
| Swagger/OpenAPI | Không có | 100% | Sinh OpenAPI từ route Node.js (viết tay JSON, không cần framework) |
| Không cho LLM tự ý truy cập DB production | N/A — repo chưa có DB production nào bị lộ | — | Thiết kế Tool Gateway ngay từ đầu theo nguyên tắc này |
| Đa nền tảng, không hard-code platform trong logic | N/A | — | Platform Adapter interface (`IAIPlatformAdapter`), ManLab là adapter đầu tiên |

## C. TARGET ARCHITECTURE

```
                 M29_AI  +  M35_NenTangSo   (AIOS Control Plane, Phase 1)
                       │
        ┌──────────────┼───────────────────┐
        │              │                    │
   AIPlatform=ManLab  AIPlatform=VI-CONNECT  AIPlatform=N (tương lai)
   (adapter thật:        (adapter placeholder,
    trỏ M10 API mẫu)      chưa tích hợp API thật)
        │
        ▼
   AI Gateway (Node.js http, không phụ thuộc npm ngoài — theo tiền lệ M10)
        │
   ┌────┼─────────────────────────────────────────┐
   │    │                                          │
 Registry API                              Tool Gateway
 (Platform/Provider/Model/Agent/Skill/      (chặn Tool ngoài whitelist của
  Tool/Prompt/Guardrail/Policy/AIA/          Agent, ghi AIToolCall + AIRequest,
  Evaluation/Secret/Audit — CRUD có RBAC)     áp permission READ/COMPUTE/PROPOSE/
   │                                          EXECUTE trước khi gọi Platform API)
   ▼
 JSON file store (api/data/data.json — như M10), tách namespace theo entity
```

Nguyên tắc bắt buộc (khớp mục 13, 35 yêu cầu gốc):
- Agent **không bao giờ** gọi thẳng DB/API của Platform — luôn qua Tool Gateway, Tool Gateway
  tra `AITool.endpoint` + `permission_level` trước khi forward.
- Không viết `if (platform == "ManLab")` rải rác — mọi hành vi riêng theo platform nằm trong
  `IAIPlatformAdapter` (Phase 1 chỉ cần 1 adapter thật: `ManlabPlatformAdapter` gọi M10 API;
  VI-CONNECT là `PlaceholderPlatformAdapter` trả 501/"chưa tích hợp").
- AI **không** tự phê duyệt/kết luận (ràng buộc 42001 đã ghi ở README M29/12_Policies) — mọi
  entity có vòng đời phê duyệt (Prompt/Policy/Guardrail/AIA) dùng state machine chuẩn của repo
  (Nháp→Chờ soát xét→Chờ phê duyệt→Đã phê duyệt→Đã công bố→Hết hiệu lực/Hủy), người phê duyệt
  luôn là con người.

## D. DATA MODEL

### Nhóm 1 — Platform (thuộc M35_NenTangSo)

| Thực thể | Trường chính | Quan hệ |
|---|---|---|
| `AIPlatform` | id, code (MANLAB/VICONNECT/…), name, base_url, api_base_url, environment, status (HEALTHY/DEGRADED/DOWN/UNKNOWN), owner, adapter_type | 1—N với AIAgent, AITool, AIRequest |

### Nhóm 2 — Lõi quản trị AI (thuộc M29_AI)

| Thực thể | Trường chính | Quan hệ |
|---|---|---|
| `AIProvider` | id, code (GEMINI/OPENAI/…), name, status | 1—N AIModel |
| `AIModel` | id, provider_id, model_id, display_name, purpose, status, temperature, max_tokens, cost_profile_id, version | N—1 AIProvider |
| `AIAgent` | id, platform_id, code, name, purpose, model_id, active_prompt_version_id, status, risk_level, owner, version | N—1 AIPlatform, N—1 AIModel |
| `AISkill` | id, code, name, platform_scope, version, status, risk_level | N—N AIAgent (bảng nối `AIAgentSkill`) |
| `AITool` | id, platform_id, code, name, endpoint, http_method, input_schema, output_schema, permission_level (READ/COMPUTE/PROPOSE/EXECUTE), risk_level, require_confirmation, require_approval, status, version | N—1 AIPlatform, N—N AISkill (`AISkillTool`), N—N AIAgent (`AIAgentTool`) |
| `AIPrompt` / `AIPromptVersion` | prompt: id, code, agent_id; version: id, prompt_id, content, status (DRAFT/REVIEW/APPROVED/ACTIVE/ARCHIVED), created_by, approved_by, effective_from | N—1 AIAgent |
| `AIGuardrail` | id, code, description, scope (SYSTEM/PLATFORM/AGENT/SKILL/TOOL/WORKFLOW), severity, action (BLOCK/WARN/REQUIRE_CONFIRMATION/REQUIRE_APPROVAL), status | N—N AIAgent/AITool qua scope_ref |
| `AIPolicy` | id, name, version, owner, approver, effective_date, status, reference | tham chiếu tự do tới Agent/Platform/Use case |
| `AIImpactAssessment` (AIA — bắt buộc theo MP29/ISO 42001) | id, code (AIA-YYYY-NNN), agent_id, purpose, data_used, affected_users, risk, human_oversight, controls, residual_risk, status (NOT_ASSESSED/DRAFT/REVIEWED/APPROVED/REVIEW_REQUIRED), review_date | N—1 AIAgent |
| `AIEvaluationSuite/Case/Run` | suite: id, name, agent_id; case: id, suite_id, input, expected; run: id, suite_id, agent_version, pass_count, fail_count, status | N—1 AIAgent |
| `AIRequest` (Trace) | id (=TraceId), platform_id, agent_id, model_id, prompt_version_id, user_ref, input_tokens, output_tokens, latency_ms, guardrail_result, evaluation_result, created_at | N—1 AIAgent, 1—N AIToolCall |
| `AIToolCall` | id, request_id, tool_id, input, output, status, latency_ms, error_code | N—1 AIRequest, N—1 AITool |
| `AICostUsage` | id, platform_id, agent_id, model_id, date, tokens_in, tokens_out, cost_estimate | tổng hợp theo ngày từ AIRequest |
| `AISecret` | id, platform_id, name, masked_value, status, last_rotated, last_used | giá trị thật KHÔNG trả qua API đọc thường |
| `AIAuditLog` | id, actor, entity_type, entity_id, field, before, after, reason, at | append-only, không cho sửa/xóa |

### Ràng buộc

- Mọi entity có `version`/vòng đời phê duyệt: sửa production **không ghi đè**, tạo bản ghi
  version mới (đúng bất biến "không sửa trực tiếp tài liệu đã ban hành" của repo, áp dụng
  tương tự cho Prompt/Policy/Guardrail).
- `AITool.permission_level = EXECUTE` bắt buộc có `require_confirmation=true` hoặc
  `require_approval=true` (không được cả hai đều false).
- `AIAuditLog`, `AIRequest`, `AIToolCall` là append-only — không có API DELETE.
- `AISecret.masked_value` là giá trị duy nhất trả ra ngoài (vd `****XmBW`); giá trị thật lưu
  tại `api/data/secrets.local.json`, thêm vào `.gitignore` giống `api/data/data.json` của M10.

## E. API SPEC (rút gọn — đầy đủ hoàn thiện trong `M29_AI/02_API/API.md` khi BUILD)

| Method | Path | Permission | Mô tả |
|---|---|---|---|
| GET/POST | `/api/ai/platforms` | AI_VIEWER / AI_ADMIN | Platform Registry |
| GET/POST | `/api/ai/providers`, `/api/ai/models` | AI_VIEWER / AI_ADMIN | Provider/Model registry |
| GET/POST | `/api/ai/agents`, `/api/ai/agents/{id}` | AI_VIEWER / AI_ADMIN | Agent + dependency view (Model/Prompt/Skills/Tools/Guardrails/Evaluation) |
| GET/POST | `/api/ai/skills`, `/api/ai/tools` | AI_VIEWER / AI_ADMIN | Skill/Tool registry |
| POST | `/api/ai/tools/{id}/call` | theo `permission_level` của Tool + quyền User hiện tại | Tool Gateway — entrypoint duy nhất Agent được gọi Platform API |
| GET/POST | `/api/ai/prompts`, `/api/ai/prompts/{id}/versions` | AI_ADMIN | Prompt + version lifecycle |
| GET/POST | `/api/ai/guardrails`, `/api/ai/policies` | AI_SECURITY_ADMIN | Guardrail/Policy registry |
| GET/POST | `/api/ai/aia` | AI_ADMIN (duyệt: người có thẩm quyền, không phải AI) | AI Impact Assessment |
| GET | `/api/ai/traces`, `/api/ai/traces/{id}` | AI_OPERATOR / AI_AUDITOR | Trace chi tiết theo TraceId |
| GET | `/api/ai/usage`, `/api/ai/costs` | AI_OPERATOR | Token/Cost theo Platform/Agent/ngày |
| GET/POST | `/api/ai/secrets` (đọc = masked; ghi = AI_SECURITY_ADMIN) | AI_SECURITY_ADMIN | Secret registry |
| GET | `/api/ai/audit-logs` | AI_AUDITOR (read-only) | Audit Log |
| GET | `/api/ai/health` | AI_VIEWER | System Health tổng hợp |

> Mọi API POST/PUT ghi `AIAuditLog`. Response lỗi thống nhất `{ traceId, errorCode, component, timestamp }` — đúng mục 39 yêu cầu gốc.

## F. UI MAP

```
AIOS
├── Dashboard           (Platform status, request/tool-call hôm nay, evaluation pass rate, cảnh báo)
├── Platforms           (danh sách + Platform selector áp cho toàn bộ menu dưới)
├── Models & Providers  (danh sách, Test Connection, Set Active/Disable)
├── Agents              (danh sách + Agent Detail: Model/Prompt/Skills/Tools/Guardrails/AIA/Evaluation)
├── Skills / Tools      (registry, permission_level, enable/disable)
├── Prompts             (danh sách + version history + diff)
├── Guardrails & Policies
├── AI Impact Assessment (AIA)
├── Evaluations         (suite/case/run, pass rate)
├── Traces & Logs       (tìm theo TraceId/Agent/Platform, xem full chain)
├── Token & Cost        (theo Platform/Agent/Model/ngày)
├── Secrets             (masked, Test/Rotate/Disable)
└── Audit Log           (read-only)
```

Dashboard tổng quan ưu tiên câu hỏi lãnh đạo (mục 34 yêu cầu gốc): AI có chạy không, nền tảng
nào đang dùng, có lỗi/chặn không, chi phí bao nhiêu — chi tiết kỹ thuật đặt ở màn hình con.

## G. RBAC MATRIX (mô phỏng qua header, giống tiền lệ M10 — không phải auth production)

| Role | Platforms | Models/Agents/Skills/Tools/Prompts | Guardrails/Policies/Secrets | Audit |
|---|---|---|---|---|
| AI_VIEWER | Xem | Xem | — | — |
| AI_OPERATOR | Xem | Xem + xem Trace/Usage + chạy Evaluation | — | — |
| AI_ADMIN | Xem | CRUD (trừ Secret) | Xem | — |
| AI_SECURITY_ADMIN | Xem | Xem | CRUD | — |
| AI_AUDITOR | Xem | Xem | Xem | Xem (read-only) |
| SUPER_ADMIN | CRUD | CRUD | CRUD | Xem |

> AI (agent/model) không bao giờ có role trong bảng này — chỉ con người mới có role AIOS.

## Acceptance Criteria (rút gọn từ mục 42 yêu cầu gốc, khớp hạ tầng Phase 1)

```
AC-01  GIVEN 2 Platform (ManLab, VI-CONNECT placeholder) đã đăng ký
       WHEN chọn Platform = ManLab trên UI
       THEN chỉ hiển thị Agent/Tool/Prompt có platform_id = ManLab

AC-02  GIVEN 1 Agent có Model/Prompt/Skills/Tools/Guardrails/AIA/Evaluation đã gán
       WHEN mở Agent Detail
       THEN thấy đủ 6 mục trên trong 1 màn hình, không cần đọc source

AC-03  GIVEN Agent gọi 1 Tool READ hợp lệ qua Tool Gateway
       WHEN request hoàn tất
       THEN có đúng 1 AIRequest + ≥1 AIToolCall, đủ trường User/Agent/Skill/Tool/API/Result/
            Model/Tokens/Latency, xem được qua GET /api/ai/traces/{id}

AC-04  GIVEN 1 Tool bị Disable (status=DISABLED)
       WHEN Agent cố gọi Tool đó qua Tool Gateway
       THEN Tool Gateway trả lỗi có traceId/errorCode, KHÔNG forward tới Platform API

AC-05  GIVEN User không có permission tương ứng permission_level của Tool
       WHEN gọi Tool đó
       THEN bị từ chối (403), ghi AIAuditLog

AC-06  GIVEN Prompt đang ACTIVE
       WHEN sửa nội dung Prompt
       THEN tạo AIPromptVersion mới (status DRAFT), bản ACTIVE cũ không bị ghi đè

AC-07  GIVEN 1 AISecret đã tạo
       WHEN gọi GET /api/ai/secrets hoặc xem UI
       THEN chỉ thấy masked_value, KHÔNG bao giờ thấy giá trị thật (kể cả trong log/trace)

AC-08  GIVEN Provider bị lỗi kết nối (Test Connection FAIL)
       WHEN vào Dashboard
       THEN thấy cảnh báo trạng thái Provider = DOWN/DEGRADED kèm last_error

AC-09  GIVEN bất kỳ thay đổi cấu hình nào qua API ghi (POST/PUT)
       WHEN thao tác hoàn tất
       THEN có 1 AIAuditLog ghi actor/entity/before/after/at, không sửa/xóa được sau đó
```

## Non-Functional Requirements

```
Performance:      Trace/Usage query trả về <2s cho 30 ngày dữ liệu JSON-file-store (Phase 1
                  quy mô nhỏ, không cần index engine riêng).
Scalability:      Ngoài phạm vi Phase 1 — JSON file store chỉ phù hợp prototype/nội bộ; nếu
                  vượt quy mô phải đổi sang DB engine thật (quyết định kiến trúc riêng, cần
                  duyệt lại — không tự ý đổi khi BUILD).
Availability:      Không yêu cầu HA ở Phase 1 (nội bộ ETV).
Concurrency:      Ghi JSON file qua write khóa tuần tự (giống pattern store.mjs của M10).
Logging/Observability: Mọi request/tool-call/audit ghi log có TraceId thống nhất.
Audit trail:      AIAuditLog append-only, không API xóa/sửa.
Privacy:          Không đưa dữ liệu cá nhân/mật vào Prompt/Context (đúng ràng buộc CLAUDE.md
                  gốc + README `07_AI_OPERATING_SYSTEM`).
Retention:        Trace/Usage giữ tối thiểu 90 ngày (điều chỉnh theo MP29 khi ban hành thật).
Backup:           Theo cơ chế backup chung của repo/máy chủ vận hành — không định nghĩa riêng.
Timezone:         Asia/Ho_Chi_Minh, lưu trữ nội bộ theo UTC ISO-8601.
Localization:      Tiếng Việt cho UI/label, giữ nguyên thuật ngữ kỹ thuật tiếng Anh (Agent,
                  Tool, Prompt…) như văn phong hiện có trong 07_AI_OPERATING_SYSTEM.
Accessibility:    Không yêu cầu đặc biệt ở Phase 1.
Idempotency:      POST /tools/{id}/call không idempotent theo thiết kế (là 1 lời gọi AI thật);
                  ghi rõ TraceId để tránh nhầm lẫn khi retry.
Traceability:      Answer → Agent → Prompt version → Tool → API → Platform → Model → tokens —
                  phải suy ra được từ 1 TraceId duy nhất (AC-03).
Electronic signature/version integrity: Prompt/Policy/Guardrail version là append-only, có
                  created_by/approved_by — không có cơ chế ký số ở Phase 1 (ngoài phạm vi).
```
