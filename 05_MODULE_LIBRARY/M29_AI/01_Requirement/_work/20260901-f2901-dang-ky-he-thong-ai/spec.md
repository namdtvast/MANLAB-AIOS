# F29.01 phần 1 — đăng ký hệ thống AI trên M29

Work-id: `20260901-f2901-dang-ky-he-thong-ai` · Tier **M** (đổi schema DB + quy tắc nghiệp vụ + UI)

## OUTCOME

**WHO** — CSH hệ thống AI và ĐMKT (vai trò `AI_ADMIN`) lập bản ghi; PT.AI soát xét; LĐV (`SUPER_ADMIN`) phê duyệt.

**WHAT** — nhập được **phần 1 của ETV.P.F 29.01 (Danh mục hệ thống AI)** ngay trên aios-platform, thay vì chỉ có đường seed.

**WHY** — `createAgent()` đã tồn tại tại `src/lib/m29/actions.ts` từ đầu nhưng **không có giao diện nào gọi**: tác tử chỉ vào được CSDL qua `prisma/seed.ts`. Dòng đầu tiên của sổ đăng ký — thứ mà ETV.P29 mục 5.1.7 dựa vào để nói "AI không có trong danh mục là AI chưa đăng ký" — hiện không ai nhập được. AIA kẹt theo, vì `AiaPanel` chỉ mở trong trang chi tiết tác tử.

**SUCCESS CRITERIA**
1. Người có vai trò `AI_ADMIN` đăng ký được một hệ thống AI mới từ `/modules/M29/registry`, không đụng tới seed.
2. Mọi trường bắt buộc tại **ETV.P29 mục 5.1.2** đều có chỗ chứa trong CSDL.
3. Cột "Trạng thái" của biểu mẫu đọc được đúng 9 giá trị mà **ETV.P29 mục 6.1** quy định.
4. Hai ràng buộc của **mục 5.1.3** bị chặn ngay khi nhập, không chờ người soát xét bắt.

## RECON — [FACT]

- [FACT] `createAgent()` (`src/lib/m29/actions.ts:323`) không có nơi gọi: grep toàn `src/` chỉ trả đúng dòng định nghĩa. Agent vào CSDL qua `prisma/seed.ts:683` và `:764`.
- [FACT] `HDSD.yaml` bước 1 chỉ liệt kê "Provider, Model, Skill, Tool và Platform" — thiếu Tác tử. Lỗ hổng nhất quán giữa hướng dẫn và giao diện.
- [FACT] So `AIAgent` với ETV.P29 mục 5.1.2, thiếu 5 trường: Nhóm (1–5) · Hình thức · Đầu mối kỹ thuật · Có dữ liệu cá nhân · Chu kỳ rà soát.
- [FACT] **Trường thiếu thứ 6** — cột "Trạng thái" của F29.01 liệt kê đúng 9 giá trị của enum `AIApprovalStatus` (Nháp · Chờ soát xét · Không soát xét · Chờ phê duyệt · Không phê duyệt · Đã phê duyệt · Tạm dừng · Hết hiệu lực · Hủy), khớp ETV.P29 mục 6.1. `AIAgent` chỉ có `status: AIOpStatus` với 4 giá trị vận hành (Hoạt động/Vô hiệu hóa/Ngừng dùng/Tạm dừng) — **cột Trạng thái của biểu mẫu hiện không xuất được từ dữ liệu có sẵn**.
- [FACT] `approvalTransitions` (`rules.ts:79`) và `approvalAction(kind, …)` (`actions.ts:647`) đã dựng sẵn vòng đời chuẩn dùng chung cho Platform/Guardrail/Policy — mở thêm `"agent"` là mở rộng, không phải viết mới.
- [FACT] Cổng AIA đã chặn thật: `gateway.ts:65` từ chối mọi lời gọi thay mặt Agent chưa có AIA `APPROVED`, `:48` từ chối Agent không `ACTIVE`. Tác tử vừa đăng ký chưa chạy được gì.
- [FACT] Migration trong repo là **SQL viết tay**, tên `<timestamp>_<slug>` (xem `20260831090000_m03_k2_k3_k4`).

## SPEC

### 1. Dữ liệu — 7 cột thêm vào `AIAgent`

| Cột | Kiểu | Mặc định | Căn cứ |
|---|---|---|---|
| `systemGroup` | `AISystemGroup` | `EMBEDDED_AGENT` | 5.1.2 "Nhóm" |
| `acquisition` | `AIAcquisitionType` | `SELF_DEVELOPED` | 5.1.2 "Hình thức" |
| `technicalContact` | `String` | `""` | 5.1.2 "Đầu mối kỹ thuật" (§4.5 ĐMKT) |
| `personalData` | `Boolean` | `false` | 5.1.2 "Có xử lý dữ liệu cá nhân hay không" |
| `reviewCycle` | `AIReviewCycle` | `BY_EVENT` | 5.1.2 "Chu kỳ rà soát", thang tại 5.1.3 |
| `approvalStatus` | `AIApprovalStatus` | `DRAFT` | 6.1 "Bản ghi hệ thống AI" |
| `approvedBy` | `String?` | `null` | 6.1 bước 5 |

Ba enum mới, đặt tên theo tiền tố `AI` như mọi enum M29 khác:

- `AISystemGroup`: `EMBEDDED_AGENT` (1) · `OFFICE_ASSIST` (2) · `TECHNICAL_ANALYSIS` (3) · `DOCUMENT_PROCESSING` (4) · `EXTERNAL_MODEL_SERVICE` (5)
- `AIAcquisitionType`: `SELF_DEVELOPED` · `PURCHASED` · `SUBSCRIBED` · `THIRD_PARTY_EMBEDDED`
- `AIReviewCycle`: `SIX_MONTHS` · `ONE_YEAR` · `BY_EVENT`

`approvalStatus` **tách hẳn** khỏi `status: AIOpStatus` đang có, không gộp: một cái trả lời "hồ sơ đăng ký đi tới đâu", cái kia "tác tử có đang chạy không". Gộp lại thì không diễn đạt được trạng thái thật rất hay gặp — hồ sơ Đã phê duyệt nhưng tác tử đang Tạm dừng vì AIA quá hạn.

### 2. Quy tắc nghiệp vụ mới (`rules.ts`, có bản gương trên form)

- **R-F29-1** — `personalData = true` ⇒ `riskLevel` phải là `HIGH`. Căn cứ 5.1.3: dùng dữ liệu cá nhân là một trong ba tiêu chí xác định mức tác động **Cao**.
- **R-F29-2** — chu kỳ rà soát không được thưa hơn mức tác động cho phép (5.1.3): `HIGH` ⇒ chỉ `SIX_MONTHS`; `MEDIUM` ⇒ `SIX_MONTHS` hoặc `ONE_YEAR`; `LOW` ⇒ mọi giá trị.
- **R-F29-3** — chỉ chọn được nền tảng có `approvalStatus ∈ {APPROVED, ACTIVE}`. Căn cứ 5.1.1: bản ghi phải trỏ tới một mã nền tảng "đã đăng ký **và đang hiệu lực**" tại ETV.MP35.

Server là nơi quyết định; form chỉ chặn sớm cho người nhập đỡ mất công — cùng cách `NewToolForm` làm gương cho `validateTool`.

### 3. Vòng đời bản ghi (ETV.P29 mục 6.1, tách vai trò theo mục 4.8)

| Bước | Hành động | Quyền yêu cầu |
|---|---|---|
| Lập | `createAgent` → `DRAFT` | `registry:write` (AI_ADMIN) |
| Trình soát xét | `submit` | `registry:write` |
| Soát xét | `review` (Đạt → Chờ phê duyệt · Không đạt → Không soát xét, **bắt buộc lý do**) | `registry:write` **và người soát xét ≠ người lập** |
| Phê duyệt | `approve` / `reject` | `platforms:write` (SUPER_ADMIN = LĐV) |
| Hết hiệu lực / Hủy | `archive` / `cancel` | `platforms:write` |

"Người lập" đọc từ `AIAuditLog` của chính bản ghi (bản ghi `create` đầu tiên) — không thêm cột `createdBy`, vì nhật ký đã là nguồn sự thật append-only theo quy tắc 2 của DacTa.

### 4. Giao diện

- `NewAgentForm` đặt ở `/modules/M29/registry` — trang tự gọi mình là "Danh mục", và F29.01 phần 1 chính là một sổ đăng ký. Trang Tổng quan giữ nguyên vai trò giám sát.
- Section 6 "Agent — Hệ thống AI" trong registry, xếp **cuối** đúng mạch thứ bậc chứa nhau đã có: Agent trỏ tới Platform, Model, Skill và Tool nên nằm sau tất cả.
- Bảng hiển thị đúng các cột của F29.01 phần 1 (mã, tên, nhóm, nền tảng/mô hình, hình thức, chủ sở hữu, ĐMKT, mức tác động, dữ liệu cá nhân, chu kỳ rà soát, AIA, trạng thái hồ sơ + trạng thái vận hành).
- Gán Skill/Tool **không** nằm trong form đăng ký: đã có `SkillToolPanel` ở trang chi tiết, và gán công cụ là thay đổi lớn có hệ quả riêng (`kiemTraGanCongCu`).

## ACCEPTANCE CRITERIA

1. `AI_ADMIN` đăng ký tác tử mới → bản ghi ở **Nháp**, hiện trong Section 6 và trong bảng Agent ở Tổng quan.
2. Chọn "có dữ liệu cá nhân" mà để mức tác động Trung bình → form chặn, `createAgent` cũng chặn nếu gọi thẳng.
3. Mức tác động Cao + chu kỳ 1 năm → bị chặn với thông báo dẫn mục 5.1.3.
4. Ô chọn nền tảng không liệt kê nền tảng đang Nháp/Chờ duyệt/Hết hiệu lực.
5. Người vừa lập bản ghi không tự soát xét được bản ghi đó.
6. `npm test`, `npm run lint`, `npm run build`, `npm run kiem-tra-hdsd` đều xanh.

## GIỚI HẠN ĐÃ BIẾT (không làm trong lần này)

- **Cổng `approvalStatus` chưa gắn vào Tool Gateway.** Gateway vẫn chỉ kiểm `status = ACTIVE` + AIA `APPROVED`. Nghĩa là một tác tử hồ sơ mới ở Nháp mà bị đặt `ACTIVE` bằng SQL vẫn gọi được công cụ. Siết chỗ này là thay đổi hành vi vận hành đang chạy (Copilot), phải đo trên dữ liệu thật trước — tách việc riêng.
- Route xuất `/api/m29/export/f29-01` (sinh PDF biểu mẫu có dữ liệu) là việc kế tiếp, theo khuôn `src/app/api/m03/export/f03-08/route.ts`.
- Phần 2 và phần 3 của biểu mẫu đã có nơi nhập từ trước (`NewToolForm`, `UnregisteredPanel`), không đụng tới.
