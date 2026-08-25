# Feature Spec — 20260825-ai-copilot-tra-cuu

Bổ sung **AI Copilot tra cứu (chỉ-đọc)** cho nền tảng ManLab (`09_ENGINEERING/aios-platform`):
trợ lý hỏi–đáp về thủ tục ETV.Pxx, tiêu chuẩn ISO/TCVN, biểu mẫu và mục tiêu module, **bắt buộc
trích dẫn nguồn**, **không ghi bất kỳ dữ liệu nghiệp vụ nào**.

Tier: **L** — mở một đường gọi API ra ngoài Viện lần đầu tiên, chạm ranh giới bảo mật thông tin
(ISO/IEC 27001, MP02/MP28) và ranh giới quản trị AI (ISO/IEC 42001, MP29), là hạ tầng dùng chung
cho cả 38 module. Phạm vi không gắn một module nghiệp vụ đơn lẻ → artifact lưu tại `_meta/specs/`
theo mục 10 của `06_S_LapTrinhTheoDacTa/SKILL.md`.

Chế độ: **ANALYZE** — tài liệu này là đặc tả, chưa hiện thực hóa. Không sửa `adapters.ts`,
`gateway.ts`, `schema.prisma` hay layout nền tảng cho tới khi PLAN được duyệt.

Quyết định phạm vi đã chốt với chủ sở hữu ngày 2026-08-25: **chỉ-đọc** (không phải copilot gợi ý
điền form), **gọi Anthropic API** (không mock, không tự host). Xem §12.

---

## RECON

### [FACT] Hiện trạng

| # | Sự kiện quan sát được | Nguồn |
|---|---|---|
| F1 | Control plane quản trị AI đã đầy đủ: `AIPlatform/Provider/Model/Skill/Tool/Agent/Prompt/PromptVersion/Guardrail/Policy/ImpactAssessment/EvaluationSuite/Case/Run/Request/ToolCall/Secret/AuditLog/Incident/UnregisteredSighting` | `prisma/schema.prisma:457-935` |
| F2 | Tool Gateway thực thi **7 bước kiểm tra theo đúng thứ tự**, bước (7) là AIA Gate — Agent không có `AIImpactAssessment` ở trạng thái `APPROVED` thì bị chặn hoàn toàn | `src/lib/m29/gateway.ts:15-102` |
| F3 | `adapters.ts` **chỉ có `ManlabPlatformAdapter`** gọi HTTP nội bộ (mặc định `localhost:8010`). **Không có adapter nào gọi mô hình ngôn ngữ.** | `src/lib/m29/adapters.ts` |
| F4 | `AIRequest` đã có sẵn chỗ ghi `inputTokens`, `outputTokens`, `latencyMs`, `guardrailResult`, `promptVersionId`, `userRef`; chi phí tính từ `AIModel.costPer1kTokens` | `prisma/schema.prisma:548-566,750-770` + `src/lib/m29/usage.ts` |
| F5 | `AISecret` **chỉ lưu `maskedValue`**, cố ý không lưu giá trị thật trong Postgres dev dùng chung | `prisma/schema.prisma:785-797` + comment tại chỗ |
| F6 | RBAC M29 gồm 6 vai trò (`AI_VIEWER/OPERATOR/ADMIN/SECURITY_ADMIN/AUDITOR/SUPER_ADMIN`), gán qua `ModuleRoleAssignment(moduleCode="M29")`, kiểm tra bằng `can()`/`PERMS` | `src/lib/m29/model.ts`, `src/lib/m29/actor.ts` |
| F7 | **Chưa có bất kỳ lời gọi LLM nào trong `src/`** — `grep -riE "anthropic\|openai\|ANTHROPIC_API_KEY" src` trả về 0 kết quả; `.env` chỉ có `DATABASE_URL`, `AUTH_SECRET`, `AUTH_TRUST_HOST`, `NEXTAUTH_URL` | grep toàn `src/`, `.env` |
| F8 | `AIGuardrail`/`AIPolicy` hiện là **bản ghi khai báo**: gateway gán cứng `guardrailResult` mà chưa có điểm cưỡng chế nào đọc `AIGuardrail` lúc chạy | `src/lib/m29/gateway.ts` (không tham chiếu `aIGuardrail`) |
| F9 | `M14AiSuggestion` đã có bảng lưu gợi ý AI kèm `appliedById/appliedAt` nhưng **chưa có nơi nào sinh ra gợi ý** | `prisma/schema.prisma:2282-2300` |
| F10 | 38/38 `MPxx/manifest.yaml` đã khai mục tiêu + căn cứ pháp luật/ISO; `_meta/build_site.py` đã có sẵn phép quét toàn repo sinh `docs/data.json` | commit `20bff12`, `_meta/build_site.py` |
| F11 | Ứng dụng là Next.js 16 App Router + Prisma 7 + NextAuth v5, layout nền tảng ở `src/app/(platform)/layout.tsx` | `package.json`, cây `src/app` |

### [ASSUMPTION] Giả định nêu rõ, cần xác nhận khi hiện thực hóa

- **A1** — Chi phí gọi API do Viện chi trả; hạn mức tháng khai bằng `AIPolicy` và cưỡng chế bằng truy vấn `usage()` trước mỗi lượt.
- **A2** — Chỉ **tài liệu đã ban hành và không mật** được phép đưa vào ngữ cảnh gửi ra ngoài. Dữ liệu nghiệp vụ trong DB (hồ sơ khách hàng, kết quả đo, nhân sự) **không** nằm trong phạm vi Increment 1.
- **A3** — Ngôn ngữ làm việc là tiếng Việt; câu trả lời không trích dẫn được nguồn thì phải từ chối.
- **A4** — Người dùng nội bộ đã đăng nhập; Copilot không phục vụ khách hàng bên ngoài ở increment này.

### [QUESTION] Chưa chốt — phải trả lời trước khi bật cho người dùng thật

- **Q1** — Mức bảo mật của từng tài liệu để nạp chỉ mục. **Quy tắc đã có sẵn**: ETV.P29 §5.5 + ETV.P26 §5.5 + ETV.P28 §5.13 — chỉ mức **Công khai/Nội bộ** vào chỉ mục AI, hệ 4 mức gốc thuộc ETV.P02/P27. Việc còn lại là gán mức cho từng tài liệu, xem [q1-anh-xa-muc-bao-mat.md](q1-anh-xa-muc-bao-mat.md). **Chưa xong:** rà 84 SOP `03_MANAGEMENT_SYSTEM/03_M`.
- **Q2 — ĐÃ ĐÓNG.** ETV.P29 §4.1: **LĐV phê duyệt hồ sơ AIA**; §4.2: PT.AI chủ trì lập và soát xét cùng CSH; §4.8: tách vai trò đề xuất ≠ soát xét ≠ phê duyệt. Hồ sơ AIA của Copilot lập trên **F29.02**.
- **Q3** — Hạn mức chi phí tháng: là **tham số vận hành**, không đưa vào thủ tục (đổi hạn mức không được kéo theo ban hành lại thủ tục). Khai trong **F29.01** khi đăng ký hệ thống AI + bản ghi `AIPolicy` trong CSDL M29. Còn chờ LĐV ấn định con số.
- **Q4 — ĐÃ ĐÓNG.** ETV.P29 §9: hội thoại Copilot là *nhật ký suy luận (Trace)* — QTHT lưu, **05 năm**; trường hợp liên quan chứng chỉ đã phát hành thì theo thời hạn lưu của hồ sơ chứng chỉ. Quyền đọc lại theo `ETV.P.F14.06` và RBAC M29.

---

## OUTCOME

Khi increment này xong, một cán bộ đăng nhập ManLab có thể:

1. Mở khay Copilot ở bất kỳ trang nào, hỏi bằng tiếng Việt: *"Khi phát hiện công việc không phù hợp thì làm theo thủ tục nào, biểu mẫu gì?"*
2. Nhận câu trả lời **kèm đường dẫn tới đúng thủ tục/biểu mẫu trong repo**, bấm được vào nguồn.
3. Không nhận được câu trả lời bịa: hệ thống không tìm thấy căn cứ thì nói thẳng là không có.

Và một cán bộ quản trị AI (`AI_ADMIN`/`AI_AUDITOR`) có thể:

4. Xem Copilot trong danh mục Agent của M29, với AIA đã duyệt, prompt có phiên bản, tool whitelist rõ ràng.
5. Xem **mọi lượt hỏi** ở trang Traces kèm token, độ trễ, chi phí quy đổi — không có lượt nào đi ngoài sổ.
6. Tạm dừng Copilot tức thì bằng đúng cơ chế đã có (`AIAgent.status`, sự cố ETV.P29 5.7.3).

Không đạt được (cố ý, ngoài phạm vi): gợi ý điền form, tra cứu dữ liệu nghiệp vụ trong DB, thao tác ghi, phục vụ khách hàng ngoài.

---

## SPEC

### 1. Định vị kiến trúc (MUST)

Copilot **là một `AIAgent` đăng ký trong M29**, không phải một tính năng đứng ngoài. Hệ quả bắt buộc:

| Ràng buộc | Cưỡng chế ở đâu |
|---|---|
| Không có AIA `APPROVED` ⇒ không trả lời được | Bước (7) Gateway, đã có sẵn |
| Agent `SUSPENDED`/`DISABLED` ⇒ ngừng ngay | Bước (3b) Gateway, đã có sẵn |
| Mọi lượt hỏi sinh đúng 1 `AIRequest` | Bổ sung ở `gateway.chat()` |
| Prompt hệ thống phải là một `AIPromptVersion` trạng thái duyệt, không hardcode trong mã | `AIAgent.activePromptVersionId` |

**Cấm tuyệt đối:** tạo một route API riêng gọi thẳng Anthropic. Làm vậy là vô hiệu hóa AIA Gate và biến M29 thành sổ sách trang trí.

### 2. Ranh giới hành vi (MUST NOT)

1. Không thực hiện bất kỳ thao tác ghi dữ liệu nghiệp vụ nào.
2. Không đưa ra kết luận đo lường/hiệu chuẩn, không đánh giá đạt/không đạt, không phê duyệt hồ sơ hay chứng chỉ (ISO/IEC 42001 — ràng buộc tầng 07 trong `CLAUDE.md`).
3. Không trả lời khi không dẫn được nguồn trong repo; câu trả lời trống nguồn phải thay bằng: *"Không tìm thấy căn cứ trong hệ thống tài liệu của Viện."*
4. Không gửi ra ngoài: dữ liệu cá nhân, dữ liệu khách hàng, kết quả thử nghiệm/hiệu chuẩn, tài liệu phân loại mật (A2, Q1).
5. Không tự nhận là người phê duyệt; mọi câu trả lời hiển thị nhãn *"Nội dung do AI tạo — người dùng chịu trách nhiệm kiểm chứng trước khi sử dụng."*

### 3. Luồng một lượt hỏi

| Bước | Việc | Thất bại thì |
|---|---|---|
| 1 | Xác thực phiên, lấy vai trò M29 qua `getM29Role()` | 401 |
| 2 | Nạp Agent `COPILOT` + `activePromptVersion` | `AGENT_NOT_CONFIGURED` |
| 3 | Kiểm tra `agent.status === ACTIVE` và AIA `APPROVED` | Từ chối, hiện đúng lý do như Gateway đang trả |
| 4 | Guardrail đầu vào: chặn mẫu PII, chặn câu hỏi ngoài phạm vi (§6) | Ghi `guardrailResult=BLOCK`, không gọi API |
| 5 | Kiểm tra hạn mức chi phí theo `AIPolicy` (A1) | `QUOTA_EXCEEDED` |
| 6 | Truy hồi ngữ cảnh (§5) → dựng prompt = promptVersion.content + trích đoạn + câu hỏi | Không có trích đoạn ⇒ trả lời từ chối, **vẫn ghi trace** |
| 7 | Gọi `AnthropicAdapter.chat()` | Ghi trace với `errorCode`, hiện lỗi thân thiện |
| 8 | Guardrail đầu ra + ghi `AIRequest` (token, latency, guardrailResult) | — |

Bước 6 và 7 **không được đảo thứ tự** và không được bỏ bước 4/5 kể cả khi "chỉ hỏi vu vơ".

### 4. Bổ sung tầng adapter

- Thêm `AnthropicAdapter` vào `src/lib/m29/adapters.ts`, đăng ký qua `getAdapter()` theo `AIPlatform.adapterType` sẵn có — **không** sửa chữ ký `PlatformAdapter` hiện tại; mở rộng bằng phương thức `chat()` tùy chọn để `ManlabPlatformAdapter` không phải cài đặt.
- Thêm `chat()` cạnh `callTool()` trong `src/lib/m29/gateway.ts`, dùng lại nguyên các bước kiểm tra (3b) và (7).
- `AIModel` cho Copilot khai `modelId` là model Claude đang dùng, `costPer1kTokens` khai theo bảng giá thực tế để `usage()` ra số đúng.

### 5. Nguồn tri thức và cách truy hồi

Nguồn (chỉ tài liệu, không chạm bảng nghiệp vụ):

| Nguồn | Nội dung dùng được |
|---|---|
| `04_PROCESS_LIBRARY/MPxx/manifest.yaml` + `README.md` | Mục tiêu, chủ sở hữu, căn cứ, biểu mẫu của 38 thủ tục |
| `03_MANAGEMENT_SYSTEM` | Thủ tục ETV.Pxx, quy trình kỹ thuật đã ban hành |
| `06_SHARED_RESOURCES` | Danh mục biểu mẫu gốc |
| `08_KNOWLEDGE_GRAPH/Wiki` | Tóm tắt tiêu chuẩn/quy định đã biên soạn |
| `05_MODULE_LIBRARY/Mxx/README.md` | Module nào số hóa thủ tục nào |

Cách làm ở Increment 1: chỉ mục full-text trên Postgres đang dùng, nạp bằng script tái dùng phép quét của `_meta/build_site.py`. **Chưa dựng vector DB riêng** — chỉ nâng cấp khi đo được là full-text không đủ (§11).

Mỗi trích đoạn đưa vào prompt phải mang theo đường dẫn repo; câu trả lời hiển thị đúng các đường dẫn đó. Trích đoạn giới hạn độ dài.

**Điều kiện nạp chỉ mục (ETV.P29 §5.5, ETV.P26 §5.5):** chỉ nạp tài liệu có `mức bảo mật ∈ {Công khai, Nội bộ}` **và** `doc_status = issued`; thiếu mức ⇒ bỏ qua (fail-closed). Chi tiết ánh xạ theo lớp tài liệu: [q1-anh-xa-muc-bao-mat.md](q1-anh-xa-muc-bao-mat.md).

### 6. Guardrail phải cưỡng chế thật

F8 cho thấy `AIGuardrail` hiện chưa được đọc lúc chạy. Increment này phải bổ sung điểm cưỡng chế đọc `AIGuardrail` theo `scope in (SYSTEM, AGENT)` và áp `action` (`BLOCK`/`WARN`/`LOG`) ở bước 4 và 8. Tối thiểu 3 guardrail có hiệu lực:

- `GR-PII-OUT` — chặn số CMND/CCCD, số điện thoại, email cá nhân trong đầu vào.
- `GR-SCOPE` — chặn câu hỏi yêu cầu kết luận đo lường/phê duyệt (§2.2).
- `GR-NO-SOURCE` — chặn đầu ra không kèm đường dẫn nguồn.

### 7. Mô hình dữ liệu bổ sung

Tái dùng tối đa. Chỉ thêm 2 bảng, mỗi tin nhắn trỏ về đúng một `AIRequest` để không có đường vòng nào thoát khỏi sổ trace:

- `CopilotThread(id, userId, moduleContext?, createdAt)`
- `CopilotMessage(id, threadId, role, content, citations Json, requestId?, createdAt)`

Không thêm cột nào vào các bảng `AI*` hiện có.

### 8. Phân quyền

- **Dùng Copilot:** mọi người dùng đã đăng nhập (không cần vai trò M29) — vì chỉ đọc tài liệu đã ban hành.
- **Quản trị Copilot** (đổi prompt, bật/tắt, đổi model): `AI_ADMIN` (`registry: rw`) như mọi Agent khác.
- **Đọc trace/chi phí:** `AI_OPERATOR`, `AI_AUDITOR`, `SUPER_ADMIN` — nguyên ma trận `PERMS`, không nới thêm.
- Người dùng chỉ đọc được thread của chính mình; `AI_AUDITOR` đọc được tất cả (phục vụ đánh giá).

### 9. Bí mật và khóa API

Theo F5, `AISecret` **không** lưu khóa thật. Khóa Anthropic đặt ở biến môi trường `ANTHROPIC_API_KEY`, không commit; `AISecret` chỉ giữ bản ghi đăng ký + `maskedValue` + `lastRotated`/`lastUsed` phục vụ MP28. `.env.example` phải liệt kê biến mới; `.env` giữ nguyên trong `.gitignore`.

### 10. Tiêu chí nghiệm thu

| Mã | Tiêu chí | Cách kiểm |
|---|---|---|
| AC-01 | Không có AIA `APPROVED` ⇒ Copilot từ chối trả lời, nêu đúng lý do | Đặt AIA về `DRAFT`, hỏi thử |
| AC-02 | `AIAgent.status = SUSPENDED` ⇒ ngừng ngay, không gọi API ra ngoài | Tạm dừng Agent, kiểm tra không có request rời máy |
| AC-03 | Mọi lượt hỏi (kể cả lượt bị guardrail chặn và lượt lỗi) đều sinh 1 `AIRequest` | Đếm trước/sau ở trang Traces |
| AC-04 | Chi phí ở trang Usage khớp token thật × `costPer1kTokens` | Đối chiếu tay 5 lượt |
| AC-05 | 100% câu trả lời có ít nhất 1 đường dẫn nguồn mở được | Bộ 30 câu hỏi vàng (§11) |
| AC-06 | Câu hỏi ngoài phạm vi tài liệu ⇒ từ chối, không bịa | 10 câu hỏi bẫy trong bộ vàng |
| AC-07 | Guardrail PII chặn được đầu vào chứa CCCD/điện thoại | Ca kiểm thử tự động |
| AC-08 | Không có đường gọi Anthropic nào ngoài `gateway.chat()` | `grep -rn "anthropic" src` chỉ ra `adapters.ts` |
| AC-09 | `python3 _meta/validate_links.py` = 0 vấn đề; `npm run build` + `npm run test` xanh | Lệnh |
| AC-11 | Tài liệu mức **Hạn chế** ⇒ Copilot không trả lời được và **không nhắc tới sự tồn tại** của nó | Đặt 1 tài liệu Hạn chế, hỏi đúng nội dung |
| AC-12 | Tài liệu **thiếu mức bảo mật** ⇒ không vào chỉ mục (fail-closed) | Ca kiểm thử |
| AC-13 | Hạ mức tài liệu đang trong chỉ mục ⇒ biến mất khỏi câu trả lời ngay lượt hỏi kế tiếp (P29 §5.5) | Ca kiểm thử |

### 11. Đánh giá trước khi mở rộng

Soạn `AIEvaluationSuite` "Copilot tra cứu v1" gồm ≥30 `AIEvaluationCase` (20 câu có đáp án đúng kèm nguồn kỳ vọng + 10 câu bẫy phải từ chối). Ngưỡng bật cho người dùng thật: **≥90% dẫn đúng nguồn, 100% từ chối đúng ở câu bẫy**. Chưa đạt thì không mở, và không "sửa bằng cách nới ngưỡng".

### 12. Phi chức năng

- Độ trễ mục tiêu: phản hồi đầu tiên < 3s (dùng streaming); timeout cứng 30s.
- Copilot hỏng hoặc hết hạn mức **không được** làm hỏng trang đang mở — khay Copilot là thành phần độc lập, lỗi khu trú.
- Bật/tắt toàn cục bằng cờ môi trường, tắt được ngay không cần deploy lại schema.

### 13. Quyết định đã chốt (2026-08-25)

| # | Quyết định | Lý do |
|---|---|---|
| 1 | Increment 1 chỉ-đọc, không gợi ý điền form | AIA nhẹ, rủi ro tuân thủ thấp, vẫn buộc dựng đủ xương sống (adapter + trace + guardrail + eval) |
| 2 | Gọi Anthropic API, không mock, không tự host | Có bản chạy thật sớm; adapter đúng interface sẵn có nên đổi nhà cung cấp sau này không phải sửa nghiệp vụ |
| 3 | Không dựng vector DB ở increment này | Full-text trên Postgres sẵn có đủ cho tra cứu thủ tục; chỉ nâng cấp khi eval chứng minh là thiếu |
| 4 | Không thêm cột vào bảng `AI*` | Giữ nguyên control plane đã port 1:1 từ `08_Source`, tránh lệch hai bản |
| 5 | **Không tạo hệ phân loại riêng cho AI** — dùng nguyên 4 mức Công khai/Nội bộ/Hạn chế/Mật đã ban hành | ETV.P28 §2 quy định 4 mức là thống nhất toàn Viện, các thủ tục khác *sử dụng nguyên, không định nghĩa lại*; P29 §5.5 đã quy định sẵn mức nào vào được chỉ mục AI |
| 6 | Điều khoản "không dùng dữ liệu để huấn luyện lại" của nhà cung cấp phải được trích vào hồ sơ AIA (F29.02) | ETV.P29 §5.5: không bảo đảm được điều khoản này thì chỉ được gửi mức Công khai — phạm vi Copilot phụ thuộc trực tiếp vào đó |
