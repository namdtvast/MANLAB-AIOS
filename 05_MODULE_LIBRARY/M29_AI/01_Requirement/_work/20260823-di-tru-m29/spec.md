# M29_AI — Đặc tả di trú vào aios-platform (Increment 3)

Tier: **M** (nâng từ đánh giá ban đầu — xem "Vì sao không giữ Tier L" bên dưới). Theo đúng mẫu
Increment 1/2 đã làm với M10/M21: port control logic hiện có sang
`09_ENGINEERING/aios-platform/src/lib/m29/`, gate vai trò thật, verify qua Browser.

Kế thừa `outcome.md` đã có sẵn tại
[`_work/20260822-aios-control-plane/outcome.md`](../20260822-aios-control-plane/outcome.md)
(RECON/OUTCOME cấp capability CAP-29_AIOffice) — spec.md này **bổ sung, không thay thế**:
RECON lại dựa trên mã nguồn THẬT đã chạy (`08_Source/api/*.mjs`, không chỉ đọc DacTa.md/outcome.md),
vì bản outcome.md cũ viết trước khi `aios-platform` tồn tại nên giả định kiến trúc Node+JSON độc
lập — không còn đúng cho lần di trú này.

## Vì sao không giữ Tier L

`outcome.md` xếp Tier L vì lúc đó xem đây là "hạ tầng production mới, mô hình RBAC/authorization
mới". Thực tế khi RECON mã nguồn thật:
- RBAC đã có khuôn `ModuleRoleAssignment` dùng chung từ Increment 1 (M10) — không phải mô hình
  authorization mới, chỉ thêm vocabulary vai trò mới cho `moduleCode="M29"`.
- Không đổi authentication, không đổi tenant isolation, không breaking API công khai (chưa có
  API công khai M29 nào tồn tại để breaking).
- Không phải hạ tầng production dùng chung — đây là 1 module trong sidebar, cô lập theo bảng
  riêng, additive.
→ Đúng tiêu chí Tier **M**: đổi schema DB + business rule đáng kể + nhiều file + UI/backend
không tầm thường. Vẫn cẩn trọng vì đây là module quản trị AI có ý nghĩa tuân thủ ISO/IEC 42001.

## RECON — mã nguồn thật (`08_Source/api/*.mjs`, 502 dòng, 11 file)

```
[FACT] model.mjs: 7 enum trạng thái (APPROVAL 7 giá trị dùng chung Platform/Guardrail/Policy,
       PROMPT_STATUS 5, OP_STATUS 3, HEALTH 4, PERMISSION_LEVEL 4, GUARDRAIL_ACTION 4,
       AIA_STATUS 5), ROLE_RANK (AI_VIEWER=1, AI_AUDITOR=1, AI_OPERATOR=2, AI_ADMIN=3,
       AI_SECURITY_ADMIN=3, SUPER_ADMIN=9), TOOL_MIN_ROLE map permission_level→role tối thiểu.
[FACT] rules.mjs: PERMS ma trận RBAC theo category (platforms/registry/aia/governance/
       evaluations/traces/usage/secrets/audit/health) — hàm can(role, category, action).
       approvalTransitions dùng CHUNG cho Platform/Guardrail/Policy (submit→review→approve/
       reject→archive). aiaTransitions RIÊNG cho AIA (start-draft→submit-review→approve, hoặc
       flag-review-required khi đã approved). promptTransitions RIÊNG cho PromptVersion
       (submit-review→approve→activate). validateTool: EXECUTE bắt buộc require_confirmation
       HOẶC require_approval. hasToolPermission: role rank >= rank tối thiểu của permission_level.
[FACT] gateway.mjs — callTool() là điểm kiểm soát trung tâm, thứ tự chặn: (1) Tool tồn tại,
       (2) BẮT BUỘC có agentId (không cho gọi Tool "trần"), (3) Agent tồn tại, (4) Tool không
       DISABLED, (5) Tool nằm trong toolIds whitelist của Agent, (6) role đủ quyền theo
       hasToolPermission, (7) **AIA Gate: Agent phải có AIA status=APPROVED** — ĐÃ THỰC THI
       THẬT trong code hiện tại (dù DacTa.md ghi "Phase 2, chưa triển khai" — RECON mã nguồn
       thắng RECON tài liệu). Qua hết mới gọi platform adapter thật, ghi 1 AIRequest + 1
       AIToolCall.
[FACT] adapters.mjs — ManlabPlatformAdapter gọi HTTP THẬT tới `platform.api_base_url + endpoint`
       (mặc định trỏ `http://localhost:8010` — server M10 standalone cũ, KHÔNG phải aios-platform
       mới). PlaceholderPlatformAdapter (dùng cho VI-CONNECT) luôn trả 501 NOT_INTEGRATED.
[FACT] server.js — deploymentGate(agentId): chặn "activate" PromptVersion mới nếu
       AIEvaluationRun gần nhất của Agent có status=FAIL (mã lỗi DEPLOYMENT_BLOCKED_BY_EVALUATION)
       — cũng ĐÃ THỰC THI THẬT, không phải chỉ mô tả kiến trúc.
[FACT] health.mjs — checkHealth() poll adapter.health() theo platform đã APPROVED, cập nhật
       health/last_error/last_health_check_at. checkAiaReviews() quét AIA đã APPROVED quá hạn
       review_date → tự chuyển REVIEW_REQUIRED, ghi audit actor="SYSTEM" (hệ thống phát hiện
       theo lịch, không phải AI tự kết luận nội dung — không vi phạm ISO 42001 §so với
       nguyên tắc "AI không tự kết luận").
[FACT] usage.mjs — Token/Cost tính TRỰC TIẾP từ AIRequest theo (date, platform, agent, model),
       KHÔNG có bảng lưu trùng — cost = (tokens/1000) × COST_PER_1K_TOKENS[model_id] (hằng số
       hardcode trong code, hiện chỉ có 1 model 'MODEL-GEMINI-FLASH': 0.0003).
[FACT] secrets.mjs — lưu TÁCH RIÊNG khỏi data.json chính (file `secrets.local.json` khác), giá
       trị thật KHÔNG BAO GIỜ trả ra qua API (`toPublic()` chỉ trả `masked_value` = '****' + 4
       ký tự cuối).
[FACT] simpleCrud (trong server.js, không phải file riêng) — CRUD chung cho
       providers/models/skills/agents/tools: create() luôn ghi AIAuditLog action="create",
       update() ghi AIAuditLog kèm before/after.
[FACT] AIAgent.skillIds/toolIds là mảng string id thô (không phải bảng N-N riêng) — seed.mjs
       xác nhận: `skillIds: ['SKILL-PHANTICH-KPI'], toolIds: ['TOOL-M10-KPI']`.
[FACT] seed.mjs: dữ liệu mẫu có 1 Platform thật (PLAT-MANLAB, trỏ M10 cũ cổng 8010) + 1
       Platform placeholder (PLAT-VICONNECT), Platform ĐÃ LÀ một bản ghi trong chính M29 — KHÔNG
       phụ thuộc M35_NenTangSo tồn tại thật (M35 vẫn COMING_SOON, chưa có backend) → di trú M29
       lần này KHÔNG cần di trú M35 trước, đúng scope người dùng đã chọn ("M21 → M29").
[ASSUMPTION] Vì Tool Gateway của aios-platform chạy trong CÙNG process Next.js (Server Action),
       ManlabPlatformAdapter tiếp tục gọi ra `api_base_url` bên ngoài qua `fetch()` y hệt bản
       gốc — KHÔNG đổi sang gọi trực tiếp Prisma của M10 trong cùng process (đúng nguyên tắc
       kiến trúc #1 DacTa.md: "Agent không bao giờ gọi thẳng DB/API của một nền tảng" — Tool
       Gateway luôn qua HTTP adapter, kể cả khi 2 nền tảng cùng nằm trong 1 repo).
[ASSUMPTION] KHÔNG lưu giá trị thật của AISecret vào Postgres (kể cả mã hoá) trong increment
       này — chỉ lưu `maskedValue` + metadata. Bản gốc đã tách secrets khỏi data.json chính vì
       lý do tương tự; Postgres dev dùng chung của aios-platform chưa có vault, lưu cleartext dù
       tách bảng vẫn rủi ro hơn cần thiết cho Phase 1 (chưa có Tool nào thật sự cần secret để
       gọi — ManlabPlatformAdapter hiện không dùng secret). Xem "Quyết định phạm vi #3".
```

## OUTCOME (thu hẹp từ outcome.md gốc cho increment di trú này)

Không viết lại OUTCOME đầy đủ — dùng nguyên `outcome.md` gốc, chỉ thu hẹp Success Criteria về
đúng phạm vi khả thi khi port vào aios-platform (xem Acceptance Criteria bên dưới), bỏ phần phụ
thuộc M35 thật (chưa tồn tại) và VI-CONNECT thật (chưa có source).

## Data model — port từ `model.mjs` sang Prisma enum + model

Enum (giữ nguyên tên value tiếng Anh SCREAMING_CASE, nhãn tiếng Việt ở `labels.ts`):
`AIApprovalStatus` (DRAFT/PENDING_REVIEW/RETURNED/PENDING_APPROVAL/REJECTED/APPROVED/ARCHIVED),
`AIPromptStatus` (DRAFT/REVIEW/APPROVED/ACTIVE/ARCHIVED), `AIOpStatus` (ACTIVE/DISABLED/
DEPRECATED), `AIHealth` (HEALTHY/DEGRADED/DOWN/UNKNOWN), `AIPermissionLevel` (READ/COMPUTE/
PROPOSE/EXECUTE), `AIGuardrailAction` (BLOCK/WARN/REQUIRE_CONFIRMATION/REQUIRE_APPROVAL),
`AIAStatus` (NOT_ASSESSED/DRAFT/REVIEWED/APPROVED/REVIEW_REQUIRED).

Model (additive, không đụng M10/M21):
`AIPlatform, AIProvider, AIModel, AISkill, AITool, AIAgent (skillIds/toolIds String[]),
AIPrompt, AIPromptVersion, AIGuardrail, AIPolicy, AIImpactAssessment, AIEvaluationSuite,
AIEvaluationCase, AIEvaluationRun, AIRequest (trace), AIToolCall, AISecret (chỉ maskedValue),
AIAuditLog (append-only)`.

## Quyết định phạm vi (đọc trước khi BUILD)

1. **RBAC**: `ModuleRoleAssignment.moduleCode="M29"`, `role` ∈ {AI_VIEWER, AI_OPERATOR, AI_ADMIN,
   AI_SECURITY_ADMIN, AI_AUDITOR, SUPER_ADMIN} — port nguyên `ROLE_RANK`/`PERMS`/`TOOL_MIN_ROLE`.
2. **Platform**: seed 2 bản ghi giống gốc — `PLAT-MANLAB` trỏ `http://localhost:8010` (server M10
   standalone cũ — VẪN PHẢI chạy song song để Tool Gateway demo gọi được thật), `PLAT-VICONNECT`
   placeholder luôn trả `NOT_INTEGRATED`. KHÔNG tạo Platform Registry (M35) riêng.
3. **Secret**: chỉ lưu `maskedValue`, KHÔNG lưu giá trị thật (khác 1 chút so với bản gốc — bản
   gốc lưu thật ở file tách riêng; ở đây không lưu thật ở đâu cả trong Postgres dev). Vì hiện
   không có Tool nào thật sự cần secret để gọi, không mất chức năng nào đang dùng.
4. **Evaluation**: port `runCases()` (1 rule duy nhất: z-score |>=2| → flag_warning) + CRUD
   Suite/Case/Run tối thiểu (đủ để `deploymentGate` hoạt động thật) — KHÔNG xây UI biên tập rule
   đánh giá phức tạp hơn 1 rule đã có.
5. **Health polling nền (`startHealthPolling` setInterval 30s)**: KHÔNG bật polling nền tự động
   trong Next.js server (rủi ro chạy nhiều lần khi HMR/nhiều instance) — thay bằng nút "Kiểm tra
   ngay" gọi `checkHealth()` thủ công qua Server Action. `checkAiaReviews()` (quét AIA quá hạn)
   cũng chạy thủ công qua nút, không cron nền ở increment này.
6. **UI**: ưu tiên 2 luồng có giá trị kiểm soát cao nhất trước — (a) Tool Gateway + Trace (AC
   trọng tâm của OUTCOME gốc: "1 lượt gọi AI qua Tool Gateway sinh ra 1 Trace đầy đủ"), (b) vòng
   đời AIA + Guardrail (lõi tuân thủ ISO 42001). Agent/Prompt/Tool/Skill/Provider/Model dùng 1
   trang danh sách + form CRUD dùng chung layout (không thiết kế riêng từng loại).

## Acceptance Criteria (thu hẹp từ outcome.md gốc, chỉ giữ phần khả thi ngay)

- [ ] Đăng nhập bằng tài khoản có vai trò M29 thật, thấy đúng menu theo `can(role, category)`.
- [ ] Tạo Agent mới, gán Model/Skill/Tool, AIA chưa APPROVED → gọi Tool Gateway bị chặn
  `AIA_NOT_APPROVED` (chứng minh AIA Gate chạy thật, không chỉ đọc code).
- [ ] Duyệt AIA (start-draft→submit-review→approve) → gọi lại Tool Gateway thành công, sinh 1
  AIRequest + 1 AIToolCall xem được ở trang Trace.
- [ ] Disable 1 Tool → Agent không gọi được Tool đó (`TOOL_DISABLED`).
- [ ] Sửa nội dung Prompt đang ACTIVE → tạo PromptVersion mới ở DRAFT, bản ACTIVE cũ giữ nguyên.
- [ ] AIEvaluationRun status=FAIL gần nhất của Agent → activate PromptVersion mới bị chặn
  `DEPLOYMENT_BLOCKED_BY_EVALUATION`.
- [ ] AISecret chỉ hiện `maskedValue` ở mọi nơi (UI/log/audit).
- [ ] Mọi create/update/transition ghi `AIAuditLog` (actor/entity/before/after/reason).
- [ ] `python3 _meta/validate_links.py` PASS.

## Ngoài phạm vi Increment 3 (nêu rõ để không nhầm "đã xong")

- Health polling nền tự động, cron quét AIA quá hạn tự động.
- Tích hợp Platform Registry M35 thật, tích hợp VI-CONNECT thật.
- UI biên tập bộ rule Evaluation phức tạp hơn rule z-score hiện có.
- Lưu/luân chuyển secret thật (chỉ lưu masked metadata).
