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

**Copilot tra cứu nằm TRONG phạm vi M29, không phải tính năng đứng ngoài.** Trợ lý hỏi–đáp chỉ-đọc
gắn trên nền tảng là một `AIAgent` (mã `AGENT_COPILOT_TRACUU`) đăng ký trong chính control plane
này: prompt là `AIPromptVersion` đã phê duyệt, hồ sơ tác động là `AIImpactAssessment`, mọi lượt hỏi
là một `AIRequest`. Không có route nào gọi thẳng dịch vụ mô hình bên ngoài — làm vậy là vô hiệu hóa
AIA Gate và biến M29 thành sổ sách trang trí. Đặc tả đầy đủ:
[`_work/20260825-copilot-tra-cuu/`](_work/20260825-copilot-tra-cuu/spec.md).

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
| `AIProvider` | Nhà cung cấp model (Anthropic/Gemini/máy chủ nội bộ…) | PK `id`; 1—N `AIModel`; FK tùy chọn `platform_id` → `AIPlatform` (bắt buộc với nhà cung cấp **tự vận hành** — endpoint và kiểm tra sức khoẻ chỉ nằm ở `AIPlatform`, không nhân đôi sang đây) |
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
| `AIAuditLog` | Nhật ký mọi thay đổi cấu hình | append-only; `actorId` rỗng + `actorLabel="SYSTEM"` khi hệ thống tự chạy theo lịch |
| `AIIncident` | Phiếu sự cố AI — **biểu mẫu ETV.P.F29.04** | mã `SCAI-YYYY-NNNN`; FK `agent_id?`, `platform_id?`, `trace_id?` |
| `AIUnregisteredSighting` | Hệ thống AI dùng ngoài danh mục (ETV.P29 mục 5.1.7) | mã `UAI-YYYY-NNN`; hạn xử lý 15 ngày; FK `incident_id?`, `registered_agent_id?` |

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

Increment 4 bổ sung 2 nhóm quyền: **Sự cố AI** (`AI_OPERATOR` trở lên được lập và xử lý; đóng phiếu
mức Nghiêm trọng và hủy phiếu chỉ `SUPER_ADMIN` — vai Lãnh đạo Viện) và **AI chưa đăng ký**
(`AI_ADMIN`/`AI_SECURITY_ADMIN` ghi, `AI_OPERATOR`/`AI_AUDITOR` đọc).

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
    giá), ghi `AIAuditLog` với `actor=SYSTEM`. **Đồng thời** `AIAgent` tương ứng chuyển
    `SUSPENDED` với `suspendedReason="AIA_OVERDUE"`, và tự trở lại `ACTIVE` khi AIA được phê
    duyệt lại (ETV.P29 mục 5.2.3).
12. Tool Gateway từ chối mọi lời gọi thay mặt `AIAgent` không ở trạng thái `ACTIVE`
    (`AGENT_NOT_ACTIVE`) — bước kiểm tra đặt ngay sau bước xác thực Agent tồn tại.
13. Lập `AIIncident` mức `SEVERE` có gắn Agent → Agent chuyển `SUSPENDED` ngay trong cùng thao
    tác với `suspendedReason="INCIDENT:<mã phiếu>"` (khống chế trước — ETV.P29 mục 5.7.3). Nhánh
    tạm dừng vì sự cố **không** tự phục hồi theo AIA — phải mở lại có chủ đích, bắt buộc ghi lý do.
14. Đóng `AIIncident`: người phát hiện không được tự đóng · mức `SEVERE` chỉ `SUPER_ADMIN` ·
    `SEVERE`/`SIGNIFICANT` bắt buộc mã KPH (MP13) · lộ dữ liệu nhạy cảm bắt buộc số phiếu F28.03 ·
    ảnh hưởng kết quả đã phát hành bắt buộc mã hồ sơ MP10/MP11. Phần mềm **không** tự kết luận về
    hiệu lực kết quả, chỉ buộc khai báo hồ sơ đã xử lý ở thủ tục chuyên trách.
15. `AIUnregisteredSighting` đóng bằng `REGISTERED` bắt buộc trỏ tới Agent thật; `DISCONTINUED`
    bắt buộc lý do; bản ghi có `sensitiveData=true` không đóng được khi chưa gắn phiếu sự cố.

**Quy tắc riêng cho Copilot tra cứu (Increment 5):**

16. Chỉ mục tri thức của Copilot chỉ nhận tài liệu có **mức bảo mật ∈ {Công khai, Nội bộ}** *và*
    **trạng thái Đã phê duyệt** (ETV.P29 §5.5 + ETV.P26 §5.5). Thiếu mức, mức không hợp lệ, hoặc
    thuộc lớp tài liệu chưa được rà mức ⇒ **bỏ qua** — không có nhánh mặc định cho qua. Tài liệu
    ngoài chỉ mục không được nhắc tới dưới bất kỳ hình thức nào, kể cả tiêu đề.
17. **Mọi lượt hỏi sinh đúng một `AIRequest`**, kể cả lượt bị guardrail chặn, lượt vượt hạn mức,
    lượt không tìm được căn cứ và lượt lỗi mạng. Không có lượt nào đi ngoài sổ trace.
18. `AIGuardrail` được **đọc và cưỡng chế lúc chạy**, không còn là bản ghi khai báo: bản ghi trong
    CSDL quyết định guardrail nào có hiệu lực và hành động (`BLOCK`/`WARN`); mã guardrail không có
    phép phát hiện tương ứng trong mã nguồn phải lộ ra là *không cưỡng chế được*, không im lặng bỏ
    qua. Câu trả lời không dẫn được nguồn bị thay bằng câu từ chối cố định.
19. Bộ kiểm thử của Copilot bám **đúng 7 nhóm của biểu mẫu ban hành ETV.P.F29.03** (nhóm 3, 4, 5, 7
    bắt buộc đạt), không tự đặt cơ cấu riêng — cơ cấu song song thì hồ sơ chạy ra không điền được
    vào phiếu và cổng triển khai §5.3.2 mất căn cứ.
20. **Phần mềm ĐO, người KẾT LUẬN.** ETV.P29 §4.8 và ghi chú cuối F29.03: trợ lý AI được chạy tình
    huống kiểm thử theo kịch bản nhưng **không** kết luận Đạt/Không đạt và **không** phê duyệt
    phiếu. Hệ quả bắt buộc trong mã: trình chạy ghi `AIEvaluationRun.status = CHO_KET_LUAN` và xuất
    bản nháp F29.03 với ô Kết luận **để trống**; chỉ hành động của người có quyền, kèm số phiếu
    F29.03 đã ký, mới chuyển được sang `PASS`/`FAIL` (ghi vết ở `AIAuditLog`).
21. **Cổng triển khai fail-closed** (ETV.P29 §5.3.1): chỉ mở khi lần đánh giá gần nhất có kết luận
    Đạt. "Chưa chạy lần nào" và "chạy xong chưa ai kết luận" đều **chặn** — khác bản port gốc vốn
    chỉ chặn khi Không đạt.
22. Bộ kiểm thử Copilot **không chấm được bằng trình chấm đồng bộ** của M29 (luật z-score): "đúng"
    của nó là *có dẫn đúng nguồn hay không*, phải gọi mô hình thật mới biết. `runCases()` ném lỗi
    khi gặp ca Copilot thay vì ghi một `AIEvaluationRun` rác. Cùng lý do: lượt đánh giá gặp lỗi hạ
    tầng bị **huỷ**, không ghi kết quả — một sự cố mạng không được phép hoá trang thành "100% đạt".

23. **Ranh giới dữ liệu theo TỪNG nền tảng** (ETV.P29 §5.5): `AIPlatform.dataBoundary`, ba trạng
    thái ánh xạ thẳng từ hai câu lồng nhau của §5.5 — không rời hạ tầng Viện · rời nhưng có cam kết
    đã trích F29.02 · rời không cam kết (**mặc định**, chỉ Công khai). **Không** suy trần từ tên nhà
    cung cấp (cùng nhà cung cấp có bậc cam kết và bậc không), cũng **không** suy từ
    `AIPlatform.environment` — trường đó trả lời câu hỏi khác, mặc định ở giá trị dễ dãi nhất và
    chưa từng được kiểm bởi nhánh logic nào, nên dựng chốt lên nó là fail-open. Trần tối đa là
    **Nội bộ** kể cả với mô hình nội bộ: ETV.P28 §6.13 cấm AI *truy cập* dữ liệu Hạn chế/Mật.
    Nới lên trạng thái "có cam kết" phải qua `datRanhGioiDuLieu()` dưới quyền `governance`
    (không phải `platforms` — người đăng ký nền tảng không tự nới ranh giới của mình), bắt buộc dẫn
    số hồ sơ F29.02, ghi vết ở `AIAuditLog`.
24. Lượt chạy bộ đánh giá **dưới trần thu hẹp không được ghi** thành `AIEvaluationRun`: §5.3.1 đánh
    giá hệ thống đúng như nó sẽ vận hành, nên hồ sơ chạy trên phạm vi hẹp hơn là hồ sơ nói về một
    hệ thống khác.

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
- ✅ **Increment 4** (2026-08-24, bù 3 khoảng trống giữa Thủ tục **ETV.P29** đã ban hành và phần
  mềm): quét AIA quá hạn **tự động** + tạm dừng tác tử + tự phục hồi, Tool Gateway chặn tác tử
  không `ACTIVE`, phiếu sự cố AI (F29.04) đủ vòng đời và ràng buộc tách vai trò, sổ theo dõi AI
  chưa đăng ký (mục 5.1.7). Verify qua Browser thật + kịch bản logic — xem
  [`_work/20260824-m29-giam-sat-su-co/verify.md`](_work/20260824-m29-giam-sat-su-co/verify.md).
- ✅ **Bộ test logic** (2026-08-24): 73 ca `vitest` phủ `rules.ts`, `gateway.ts`, `model.ts`,
  `evaluation.ts`, `sweep.ts` — chạy không cần Postgres (Prisma giả lập), có workflow CI
  `test-aios-platform.yml`. Đã kiểm chứng bằng 5 đột biến gieo vào mã sản phẩm, xem
  [`_work/20260824-m29-bo-test-logic/verify.md`](_work/20260824-m29-bo-test-logic/verify.md).
  Chưa có test tích hợp trên DB thật, test `actions.ts` và test giao diện.
- ✅ **Increment 5 — Copilot tra cứu** (2026-08-25): `AnthropicAdapter` + `gateway.chat()` (đường
  gọi mô hình ngôn ngữ **duy nhất**, dùng lại AIA Gate và chốt trạng thái Agent của `callTool()`),
  điểm cưỡng chế guardrail lúc chạy (`GR-PII-OUT`/`GR-SCOPE`/`GR-NO-SOURCE`), chỉ mục toàn văn
  Postgres có lọc mức bảo mật (`CopilotDocChunk`), hội thoại (`CopilotThread`/`CopilotMessage`),
  khay Copilot trên mọi trang nền tảng. Verify qua Browser thật (AIA Gate chặn thật, tạm dừng Agent
  ẩn khay thật, guardrail PII chặn thật, trace ghi thật) — xem
  [`_work/20260825-copilot-tra-cuu/verify.md`](_work/20260825-copilot-tra-cuu/verify.md).
  **Chưa chạy được lượt hỏi thật** vì môi trường chưa có `ANTHROPIC_API_KEY`.
- ✅ **Bộ kiểm thử theo ETV.P.F29.03** (2026-08-25, Increment 5): **42 tình huống** phủ đủ 7 nhóm của
  biểu mẫu, gồm cả 3 nhóm bắt buộc đạt mà bản đầu còn thiếu (tiêm lệnh · rò rỉ · giới hạn quyền);
  kiểm thử tiêm lệnh phủ cả véc-tơ chỉ dẫn ẩn **trong tài liệu được nạp chỉ mục** bằng tài liệu mồi
  chèn–xoá trong cùng lượt chạy. Trình chạy xuất **bản nháp phiếu F29.03** với ô Kết luận để trống.
  Đo được ngay: **24/24** nguồn kỳ vọng có thật; truy hồi **19/20**; **5/42** tình huống chạy trọn
  vẹn và đều đạt — trong đó có trọn **nhóm 5** và **nhóm 7** (hai nhóm bắt buộc đạt). Nhờ bộ này
  phát hiện và sửa khiếm khuyết truy hồi (6 đoạn chỉ trải trên 3,35 tài liệu → 4,65).
  ❌ **37/42 tình huống chưa chạy** (thiếu khóa API) và **bộ kiểm thử chưa được soát xét** —
  trạng thái `DU_THAO_CHUA_SOAT_XET`, chưa phải căn cứ mở Copilot cho toàn Viện.
- ✅ **Chạy thật lần đầu** (2026-08-25, Google Gemini `gemini-3.5-flash`): đổi nhà cung cấp chỉ cần
  thêm một adapter + đổi bản ghi `AIPlatform`, **không sửa một dòng nghiệp vụ nào** — đúng như
  nguyên tắc kiến trúc #2 dự kiến. 3 câu hỏi chạy trọn đường dây, token thật đã vào sổ trace.
  Khoá hiện có là bậc **miễn phí**, không bảo đảm điều khoản không huấn luyện lại, nên theo
  ETV.P29 §5.5 chỉ được gửi mức **Công khai**: chỉ mục dùng được co từ 1.865 xuống **12 đoạn**.
- ❌ **Chưa làm**: rà mức bảo mật 84 SOP `03_MANAGEMENT_SYSTEM/03_M` để đưa vào chỉ mục (và bổ sung
  câu hỏi vàng cho lớp này); phát trả lời theo luồng (streaming); trang Trace chưa hiện cột
  `guardrailResult`; chưa có UI chạy đánh giá.
- ❌ **Chưa làm**: UI cho AISecret (mask value — action đã có, chưa có trang), UI tạo/chạy
  Evaluation Suite tùy biến (chỉ verify được nhánh Evaluation PASS, chưa verify nhánh chặn
  `DEPLOYMENT_BLOCKED_BY_EVALUATION` qua Browser), health polling nền tự động (chỉ có nút thủ
  công; riêng sweep AIA đã tự động từ Increment 4), tích hợp Platform Registry M35/VI-CONNECT
  thật, hạ tầng cron thật gọi `/api/m29/sweep` ở môi trường triển khai.
- ✅ **Nhà cung cấp mô hình tự vận hành** (2026-08-25): `AIProvider.platformId` (tùy chọn) trỏ tới
  `AIPlatform` để endpoint và trạng thái kiểm tra sức khoẻ chỉ có **một** nguồn sự thật, cùng
  `LocalOpenAIPlatformAdapter` gọi API tương thích OpenAI của máy chủ GPU nội bộ. Triển khai theo
  `ETV.GAI 01` §3.6; 14 ca test phủ đủ bộ mã lỗi và hai đường dừng-trước-khi-phát-HTTP — xem
  [`_work/20260825-local-model-provider/verify.md`](_work/20260825-local-model-provider/verify.md).
  **Chưa gọi được máy chủ thật** vì `llm.manlab.vn` chưa dựng; bản ghi mẫu để `DRAFT`/`DISABLED`.
  Trần mức bảo mật vẫn là biến toàn cục, **chưa gắn theo từng nền tảng** — nên mô hình nội bộ hiện
  chưa nhận được tài liệu mức Nội bộ dù dữ liệu không rời hạ tầng của Viện (việc còn lại).
- ✅ **Vòng đời Hiệu lực của nền tảng** (2026-08-25): hiện thực trạng thái `ACTIVE` mà
  `StateMachine.md` (trạng thái 7) và ETV.P35 §6.1.7 bước 6 đã quy định nhưng phần mềm còn thiếu —
  thêm chuyển tiếp `activate()`, cho ngừng vận hành từ `ACTIVE`, và sửa `checkHealthAction()` lọc
  `{ in: ["APPROVED", "ACTIVE"] }` (bộ lọc cũ làm nền tảng vừa đưa vào vận hành rơi khỏi vòng dò
  sức khoẻ). Xem
  [`_work/20260825-vong-doi-hieu-luc-nen-tang/verify.md`](_work/20260825-vong-doi-hieu-luc-nen-tang/verify.md).
  **Chưa kiểm được lượt bấm nút thật trên giao diện** — công cụ trình duyệt không kích hoạt được
  server action; logic đã phủ bằng test đơn vị. Trạng thái `CANCELLED` vẫn chưa có chuyển tiếp.
- ✅ **Đăng ký nền tảng và công cụ trên giao diện** (2026-08-25): trang danh mục có form tạo mới cho
  `AIPlatform` và `AITool` — trước đó `createPlatform`/`createTool` đã có đủ kiểm quyền và ghi nhật ký
  kiểm toán nhưng **không thành phần giao diện nào gọi tới**, nên đăng ký một nền tảng phải sửa
  `prisma/seed.ts`. Form cố ý không phơi `dataBoundary` và `approvalStatus`: bản ghi mới luôn ra ở
  `DRAFT` + ranh giới siết nhất, muốn nới vẫn phải qua `datRanhGioiDuLieu()` kèm số hồ sơ F29.02.
  Bổ sung chặn `adapterType` không có thật ở `createPlatform` (trước đây rơi âm thầm về
  `PlaceholderPlatformAdapter`). Kiểm trên trình duyệt thật đủ 3 vai trò và cả hai luồng tạo — xem
  [`_work/20260825-form-dang-ky-nen-tang-cong-cu/verify.md`](_work/20260825-form-dang-ky-nen-tang-cong-cu/verify.md).
  ❌ **Chưa làm**: form cho Provider/Model/Skill/Agent, và sửa/xóa bản ghi đã có.
- ❌ Bản `08_Source` cũ (`api/` + `webapp/`) **vẫn chạy song song**, chưa deprecate. Tool Gateway
  của Agent mẫu gọi thật ra `http://localhost:8010` (server M10 standalone cũ) — cần server đó
  chạy để demo Tool Gateway/health check thành công.
