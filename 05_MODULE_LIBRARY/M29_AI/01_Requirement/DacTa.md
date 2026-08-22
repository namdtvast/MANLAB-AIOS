# M29_AI — Đặc tả yêu cầu

## 1. Phạm vi

Số hóa MP29 — **lõi quản trị hệ thống trí tuệ nhân tạo** dùng chung cho toàn bộ nền tảng số
của Viện (ManLab, VI-CONNECT, các nền tảng sau này — đăng ký ở [M35_NenTangSo](../../M35_NenTangSo/01_Requirement/DacTa.md)).

Đây là **Phase 1 — Control & Visibility**: cho phép AI_ADMIN biết AI nào đang chạy, ở nền
tảng nào, dùng model/provider gì, Agent được phép gọi Tool nào, Prompt nào đang hiệu lực, AI
đã làm gì (trace đầy đủ chain), tốn bao nhiêu token/chi phí, ai đổi cấu hình AI lúc nào — mà
không cần đọc source code. Guardrail/AIA workflow nâng cao, Deployment Gate tự động theo
Evaluation để ở Phase 2/3 (chỉ mô tả kiến trúc, chưa triển khai).

**Không nhầm lẫn** với `07_AI_OPERATING_SYSTEM` (cấu hình Skill/Agent/Guardrail cho *Claude
Code vận hành trên chính repo này*) — M29_AI là phần mềm quản trị AI của **sản phẩm** ETV/ManLab.

## 2. Nguyên tắc kiến trúc bắt buộc

1. Agent **không bao giờ** gọi thẳng DB/API của một nền tảng — mọi lời gọi đi qua **Tool
   Gateway**, Gateway tra `AITool.endpoint` + `permission_level` trước khi forward.
2. Hành vi riêng theo từng nền tảng nằm trong `IAIPlatformAdapter` (M35) — không rải
   `if (platform == "ManLab")` trong logic nghiệp vụ.
3. **AI không bao giờ tự kết luận/tự phê duyệt** (ràng buộc ISO/IEC 42001 — xem
   `07_AI_OPERATING_SYSTEM/12_Policies`): mọi entity có vòng đời phê duyệt (Prompt/Policy/
   Guardrail/AIA) dùng state machine chuẩn của repo, người phê duyệt luôn là con người — xem
   [StateMachine.md](../07_Workflow/StateMachine.md).
4. Sửa một bản ghi đã ACTIVE/APPROVED không ghi đè — tạo bản ghi version mới (đúng bất biến
   "không sửa trực tiếp tài liệu đã ban hành" của repo, áp dụng tương tự cho Prompt/Policy/
   Guardrail).

## 3. Trường dữ liệu chính

| Thực thể | Ý nghĩa | Khóa/Quan hệ |
|---|---|---|
| `AIProvider` | Nhà cung cấp model (Gemini/OpenAI/…) | PK `id`; 1—N `AIModel` |
| `AIModel` | Model cụ thể được cấu hình dùng | FK `provider_id`; N—1 `AIProvider` |
| `AIAgent` | Tác nhân AI vận hành trên một nền tảng | FK `platform_id` (→ M35), `model_id`, `active_prompt_version_id` |
| `AISkill` | Năng lực/skill Agent có thể dùng | N—N `AIAgent` qua `AIAgentSkill` |
| `AITool` | Điểm gọi API thật (qua Tool Gateway) | FK `platform_id`; N—N `AISkill`/`AIAgent`; `permission_level` (READ/COMPUTE/PROPOSE/EXECUTE) |
| `AIPrompt` / `AIPromptVersion` | Prompt và lịch sử phiên bản | FK `agent_id`; `status` DRAFT/REVIEW/APPROVED/ACTIVE/ARCHIVED |
| `AIGuardrail` | Rào chắn kiểm soát hành vi AI | `scope` SYSTEM/PLATFORM/AGENT/SKILL/TOOL/WORKFLOW; `action` BLOCK/WARN/REQUIRE_CONFIRMATION/REQUIRE_APPROVAL |
| `AIPolicy` | Chính sách quản trị AI cấp Viện | tham chiếu tự do tới Agent/Platform/Use case |
| `AIImpactAssessment` (AIA) | Hồ sơ đánh giá tác động AI — **bắt buộc theo ISO 42001** | FK `agent_id`; mã `AIA-YYYY-NNN` |
| `AIEvaluationSuite/Case/Run` | Bộ kiểm thử chất lượng Agent | FK `agent_id`/`suite_id` |
| `AIRequest` (Trace) | 1 lượt gọi AI đầu-cuối | PK = TraceId; FK `agent_id`, `model_id`, `prompt_version_id`; 1—N `AIToolCall` |
| `AIToolCall` | 1 lần Agent gọi 1 Tool trong 1 Trace | FK `request_id`, `tool_id` |
| `AICostUsage` | Tổng hợp token/chi phí theo ngày | FK `platform_id`, `agent_id`, `model_id` |
| `AISecret` | Khóa/thông tin nhạy cảm dùng cho Tool/Provider | chỉ trả `masked_value` ra ngoài |
| `AIAuditLog` | Nhật ký mọi thay đổi cấu hình | append-only, FK tự do tới mọi entity |

Chi tiết trường từng thực thể: [DataModel.md](../03_Database/DataModel.md).

## 4. Vai trò (RBAC — mô phỏng qua header, chưa phải auth production)

| Vai trò | Platforms | Model/Agent/Skill/Tool/Prompt | Guardrail/Policy/Secret | Audit |
|---|---|---|---|---|
| AI_VIEWER | Xem | Xem | — | — |
| AI_OPERATOR | Xem | Xem + Trace/Usage + chạy Evaluation | — | — |
| AI_ADMIN | Xem | CRUD (trừ Secret) | Xem | — |
| AI_SECURITY_ADMIN | Xem | Xem | CRUD | — |
| AI_AUDITOR | Xem | Xem | Xem | Xem (read-only) |
| SUPER_ADMIN | CRUD | CRUD | CRUD | Xem |

> AI (agent/model) không bao giờ có vai trò trong bảng này — chỉ con người mới có role AIOS.

## 5. Quy tắc nghiệp vụ

1. `AITool.permission_level = EXECUTE` bắt buộc `require_confirmation=true` hoặc
   `require_approval=true` (không được cả hai đều `false`).
2. `AIAuditLog`, `AIRequest`, `AIToolCall` là append-only — không có API xóa/sửa.
3. Tool bị `DISABLED` → Tool Gateway chặn ngay, không forward tới API nền tảng, trả lỗi kèm
   `traceId`/`errorCode`.
4. User không có quyền tương ứng `permission_level` của Tool → từ chối (403), ghi
   `AIAuditLog`.
5. Sửa nội dung `AIPrompt` đang `ACTIVE` → tạo `AIPromptVersion` mới ở trạng thái `DRAFT`,
   bản `ACTIVE` cũ giữ nguyên cho tới khi bản mới được duyệt và kích hoạt.
6. `AISecret.masked_value` là giá trị duy nhất trả qua API/UI/log/trace; giá trị thật không
   bao giờ xuất hiện ngoài tầng lưu trữ secret.
7. Mọi API ghi (POST/PUT) phải sinh một `AIAuditLog` (actor/entity/before/after/at).
8. Không đăng ký Agent/Tool cho một `platform_id` chưa tồn tại trong Platform Registry (M35).
9. **AIA Gate** (Phase 2, bắt buộc theo ISO/IEC 42001): Tool Gateway từ chối mọi lời gọi thay
   mặt một `AIAgent` chưa có `AIImpactAssessment` ở trạng thái `APPROVED` — kể cả khi Tool và
   quyền của user đều hợp lệ. Lời gọi Tool Gateway luôn phải có `agent_id` (không cho gọi Tool
   "trần" không gắn với Agent nào, tránh lách whitelist).
10. **Deployment Gate** (Phase 2): không cho `activate` một `AIPromptVersion` mới nếu
    `AIEvaluationRun` gần nhất của Agent đó có `status=FAIL` — chặn tự động, không có cơ chế
    override thủ công ở Phase 2.
11. `AIImpactAssessment.status=APPROVED` tự động chuyển sang `REVIEW_REQUIRED` khi quá hạn
    `review_date` — do hệ thống phát hiện theo lịch (không phải AI tự kết luận nội dung đánh
    giá), ghi `AIAuditLog` với `actor=SYSTEM`.

## 6. Liên kết

Quy trình: MP29 · Năng lực: CAP-29_AIOffice · Căn cứ: ISO/IEC 42001 · Platform Registry:
[M35_NenTangSo](../../M35_NenTangSo/01_Requirement/DacTa.md) · API: [API.md](../02_API/API.md) ·
Vòng đời: [StateMachine.md](../07_Workflow/StateMachine.md) · Tiền lệ triển khai tham chiếu:
[M10_DamBaoKQ/08_Source](../../M10_DamBaoKQ/08_Source).

> Đặc tả này hợp nhất từ đặc tả làm việc chi tiết hơn (RECON/OUTCOME/SPEC/PLAN/Acceptance
> Criteria đầy đủ, kiến trúc Tool Gateway, ví dụ AC-01..AC-09) tại
> [`_work/20260822-aios-control-plane/`](_work/20260822-aios-control-plane/) — giữ lại làm
> hồ sơ digital thread, không lặp lại toàn văn ở đây.

## 7. Trạng thái triển khai (aios-platform)

- ✅ **Increment 3** (2026-08-23, di trú từ `08_Source/api/*.mjs` sang
  `09_ENGINEERING/aios-platform/src/lib/m29/`): state machine/RBAC/AIA Gate/Tool Gateway/
  Deployment Gate port 1:1, có DB Postgres thật, gate vai trò thật qua `ModuleRoleAssignment`,
  verify qua Browser thật (AIA Gate chặn/mở thật, disable Tool chặn thật, Prompt lifecycle đủ
  4 bước, audit log, health check thủ công) — xem
  [`_work/20260823-di-tru-m29/verify.md`](_work/20260823-di-tru-m29/verify.md).
- ✅ Không cần di trú M35_NenTangSo trước — Platform là 1 bảng nội bộ của M29
  (`AIPlatform`), không phụ thuộc M35 thật (RECON xác nhận từ `seed.mjs` gốc).
- ❌ **Chưa làm**: UI cho AISecret (mask value — action đã có, chưa có trang), UI tạo/chạy
  Evaluation Suite tùy biến (chỉ verify được nhánh Evaluation PASS, chưa verify nhánh chặn
  `DEPLOYMENT_BLOCKED_BY_EVALUATION` qua Browser), health polling nền tự động (chỉ có nút thủ
  công), tích hợp Platform Registry M35/VI-CONNECT thật.
- ❌ Bản `08_Source` cũ (`api/` + `webapp/`) **vẫn chạy song song**, chưa deprecate. Tool Gateway
  của Agent mẫu gọi thật ra `http://localhost:8010` (server M10 standalone cũ) — cần server đó
  chạy để demo Tool Gateway/health check thành công.
