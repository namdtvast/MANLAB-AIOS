# MANLAB-AIOS Platform — Increment 0 → 14 (khung 38 module + M10/M21/M29 di trú + M01/M03/M02/M04/M16/M17/M12/M13/M14/M25 xây mới + M16 hoàn thiện theo đặc tả)

App Next.js + Prisma + PostgreSQL duy nhất, hợp nhất kiến trúc 12 tầng của
MANLAB-AIOS thành **một nền tảng có DB thật và build step thật** (thay cho
các prototype rời rạc trước đây).

## Trạng thái Increment 0 — khung nền tảng

- ✅ Next.js 16 (App Router) + TypeScript + Tailwind, `next build` chạy sạch.
- ✅ Prisma 7 + PostgreSQL (driver adapter `@prisma/adapter-pg`) — thay cho
  lưu file JSON của các prototype cũ.
- ✅ Auth thật qua NextAuth v5 (Credentials + Prisma adapter, session JWT) —
  thay cho header `X-Role` giả lập của M10/M29.
- ✅ `PlatformModule` — bảng đăng ký 38 module, seed bằng cách **quét trực
  tiếp** `05_MODULE_LIBRARY/` + `04_PROCESS_LIBRARY/*/manifest.yaml` của
  repo (`prisma/seed.ts`) — không hardcode tên module 2 nơi.
- ✅ Sidebar 38 mục (M01–M38); M10, M21 và M29 đã di trú thật (xem Increment
  1/2/3 dưới), 35 module còn lại hiện trang "Sắp ra mắt" trỏ về đặc tả
  (`DacTa.md`).

## Trạng thái Increment 1 — di trú M10_DamBaoKQ

Chi tiết đầy đủ + evidence verify:
[`05_MODULE_LIBRARY/M10_DamBaoKQ/01_Requirement/_work/20260822-increment1-di-tru-vao-aios-platform/verify.md`](../../05_MODULE_LIBRARY/M10_DamBaoKQ/01_Requirement/_work/20260822-increment1-di-tru-vao-aios-platform/verify.md).

- ✅ Rule engine R1–R8 port 1:1 từ `08_Source/api/rules.mjs` sang
  `src/lib/m10/rules.ts` — đã verify thật qua Browser (soát xét/phê
  duyệt/công bố, chặn tự soát xét, chặn CAPA_REQUIRED, mở khoá sau khi
  liên kết CAPA).
- ✅ Gate theo vai trò thật (`ModuleRoleAssignment`, generic dùng chung cho
  mọi module — vocabulary vai trò khác nhau theo từng module, KHÔNG dùng
  chung 1 enum) — 5 tài khoản demo NTH/LDP/LDV/QLCL/QTHT.
- ⚠️ **Chỉ port bằng bản prototype `08_Source` cũ, CHƯA đạt phạm vi đầy đủ
  của `DacTa.md`** (thiếu 09 loại hồ sơ F10.01–F10.09, liên kết đầy đủ
  M03/M05/M08/M11...). Không nhầm "đã di trú" với "đã hoàn thiện theo đặc
  tả".
- ❌ Bản `08_Source` cũ **vẫn chạy song song**, chưa deprecate — 2 nguồn dữ
  liệu M10 cùng tồn tại, cần quyết định rõ thời điểm tắt bản cũ.

## Trạng thái Increment 2 — di trú M21_CongBoNangLuc

Chi tiết đầy đủ + evidence verify:
[`05_MODULE_LIBRARY/M21_CongBoNangLuc/01_Requirement/_work/20260822-di-tru-m21/verify.md`](../../05_MODULE_LIBRARY/M21_CongBoNangLuc/01_Requirement/_work/20260822-di-tru-m21/verify.md).

- ✅ State machine 12 trạng thái + BR1–BR11 + gate G1/G3/G6 port 1:1 từ
  `08_Source/index.html` sang `src/lib/m21/rules.ts` — đã verify thật qua
  Browser (chuyển trạng thái, chặn thiếu lý do, khoá dữ liệu sau ký số BR1,
  gate theo cấp bậc vai trò NTH<LDP<LDV).
- ✅ Gate theo vai trò thật (`ModuleRoleAssignment`, moduleCode="M21") — dùng
  lại 3 tài khoản demo NTH/LDP/LDV đã tạo ở Increment 1 (một user có thể giữ
  vai trò ở nhiều module).
- ⚠️ **Chỉ port state machine + business rule cốt lõi, CHƯA đạt phạm vi đầy
  đủ**: chưa có trang công khai + QR, in A4 Mẫu 01/9.01, form Báo cáo hằng
  năm Mẫu 9.02, upload file thật cho bằng chứng, tích hợp DB thật với M05
  (Danh mục Phương tiện đo — dùng dữ liệu nhúng tĩnh port từ bản gốc).
- ❌ Bản `08_Source` cũ (submodule) **vẫn chạy song song**, chưa deprecate.

## Trạng thái Increment 3 — di trú M29_AI

Chi tiết đầy đủ + evidence verify:
[`05_MODULE_LIBRARY/M29_AI/01_Requirement/_work/20260823-di-tru-m29/verify.md`](../../05_MODULE_LIBRARY/M29_AI/01_Requirement/_work/20260823-di-tru-m29/verify.md).

- ✅ AIOS Control Plane: RBAC 6 vai trò, vòng đời phê duyệt (Platform/Guardrail/
  Policy/AIA/Prompt), **AIA Gate** + **Deployment Gate** + Tool Gateway port
  1:1 từ `08_Source/api/*.mjs` sang `src/lib/m29/` — đã verify thật qua
  Browser (AIA chưa duyệt chặn Tool Gateway đúng message gốc, disable Tool
  chặn thật, Prompt lifecycle đủ 4 bước, audit log, health check thủ công
  gọi thật ra platform ManLab cổng 8010).
- ✅ Gate theo vai trò thật (`ModuleRoleAssignment`, moduleCode="M29") — 6
  tài khoản demo AI_VIEWER/AI_OPERATOR/AI_ADMIN/AI_SECURITY_ADMIN/AI_AUDITOR
  (+ SUPER_ADMIN gán thêm cho `admin@manlab.vn`).
- ⚠️ Phát hiện + sửa 1 bug thật khi verify qua Browser (thiếu archive
  PromptVersion cũ khi activate bản mới — nằm trong `server.js` gốc, không
  phải `rules.mjs`, RECON ban đầu bỏ sót) — xem verify.md mục "Bug phát hiện".
- ❌ **Chưa có UI**: AISecret (action đã viết, chưa có trang), Evaluation
  Suite/Case tùy biến (chỉ verify được nhánh PASS của Deployment Gate).
  Health polling nền tự động (chỉ có nút thủ công). Platform Registry M35/
  VI-CONNECT thật.
- ❌ Bản `08_Source` cũ (`api/` + `webapp/`) **vẫn chạy song song**, chưa
  deprecate — Tool Gateway của Agent mẫu gọi thật ra `localhost:8010` (server
  M10 standalone cũ), cần server đó chạy để demo thành công.

### M29 FinOps — token, bảng giá và hạn mức chi phí

- ✅ Model có bảng giá tách **token vào/token ra theo 1 triệu token**, tiền tệ USD; thay đổi giá
  ghi Audit Log và không sửa lại chi phí lịch sử.
- ✅ Mỗi `AIRequest` chụp đơn giá, token thật do adapter mô hình trả về và chi phí ước tính tại
  thời điểm gọi. Tool call thuần API không còn dùng độ dài JSON giả làm số token.
- ✅ Trang `/modules/M29/usage` tổng hợp theo tháng: lượt gọi, token vào/ra, chi phí, chi tiết
  theo ngày/Agent/Model và hạn mức toàn M29 hoặc từng Agent.
- ✅ Hạn mức có ngưỡng cảnh báo và tùy chọn chặn tại 100%; Gateway kiểm tra hạn mức trước khi
  gọi nhà cung cấp. Biến `COPILOT_MONTHLY_BUDGET_USD` vẫn được đọc trong giai đoạn chuyển đổi.
- ℹ️ Chi phí là **ước tính vận hành**, chưa phải hóa đơn đối soát; M29 chưa tự quy đổi USD sang
  VND và không tự lấy bảng giá từ Internet.

## Trạng thái Increment 4 — xây mới M01_RuiRo (không có nguyên mẫu code)

Chi tiết đầy đủ + evidence verify:
[`05_MODULE_LIBRARY/M01_RuiRo/01_Requirement/_work/20260823-xay-moi-m01/verify.md`](../../05_MODULE_LIBRARY/M01_RuiRo/01_Requirement/_work/20260823-xay-moi-m01/verify.md).

**Khác M10/M21/M29** (di trú từ `08_Source` nguyên mẫu thật): M01 **xây mới hoàn toàn từ
`01_Requirement/DacTa.md`** (transcribe từ `ETV.P01_RuiRoCoHoi.md`) — module đầu tiên trong batch
đặc tả M02→M24 được hiện thực hóa thành CRUD + state machine thật.

- ✅ Quản lý Rủi ro (`M01RiskItem`) và Cơ hội (`M01OpportunityItem`) — 2 entity tách riêng, chung
  1 state machine (`DRAFT → PENDING_REVIEW → [PENDING_LEADER_APPROVAL nếu Rủi ro Rất cao] →
  IN_PROGRESS → DONE`), `risk_score = severity × possibility` luôn tính lại ở server.
- ✅ Gate theo vai trò thật (`ModuleRoleAssignment`, moduleCode="M01") — 3 vai trò
  NV/TP_QLCL/LDV, dùng lại 3 tài khoản demo đã có (nth/ldp/ldv@manlab.vn).
- ✅ Đã verify thật qua Browser: luồng Cơ hội đầy đủ, luồng Rủi ro mức Rất cao (LĐV-only gate),
  gate bắt buộc chọn người phụ trách khi phê duyệt, gate "Chưa đạt bắt buộc lý do" + không tự
  đóng hồ sơ, gate không tự thẩm xét chính mình — xem verify.md mục "VERIFY qua Browser".
- ⚠️ 4 "Quyết định phạm vi" khi thiết kế state machine (state `Đã phê duyệt` không persist riêng,
  state mới `PENDING_LEADER_APPROVAL`, không mô hình hoá tranh chấp thẩm xét khác người, dashboard
  Phụ lục B ngoài phạm vi) — **chưa được LĐP xác nhận chính thức**, xem DacTa.md mục 8.
- ❌ **Chưa có**: menu Báo cáo (F01.03 — biểu đồ/xuất PDF-Excel), luồng "Trả lại" chưa click qua
  UI thật (chỉ verify qua code), self-review-forbidden chưa có tình huống demo để click thử.

## Trạng thái Increment 5 — xây mới M03_NhanSu (không có nguyên mẫu code)

Chi tiết đầy đủ + evidence verify:
[`05_MODULE_LIBRARY/M03_NhanSu/01_Requirement/_work/20260823-xay-moi-m03/verify.md`](../../05_MODULE_LIBRARY/M03_NhanSu/01_Requirement/_work/20260823-xay-moi-m03/verify.md).

Giống M01 (xây mới từ `DacTa.md`, không di trú `08_Source`). Phạm vi rộng hơn M01: 7 loại đối
tượng dữ liệu (RecruitmentPlan/Employee/TrainingPlan/TrainingRecord/LaborContract/ServiceContract/
ContractTermination) nhưng chỉ 4 loại có workflow đầy đủ trong Increment này.

- ✅ Luồng tuyển dụng → nhân sự: `RecruitmentPlan` (Nháp→Chờ duyệt→Đã duyệt→Đã tuyển, tạo
  `Employee` tự động) với 2 gate vai trò (LĐV-only phê duyệt, VanPhong/TP-only đánh dấu Đã tuyển).
- ✅ **Trọng tâm**: gate 6 điều kiện hoàn thành đào tạo (`TrainingRecord`, quy tắc 3 ETV.P03) —
  LĐV bị chặn cứng ở server nếu thiếu bất kỳ 1/6 điều kiện, dù có bấm nút Phê duyệt; luồng
  "Yêu cầu bổ sung" → sửa → gửi lại → phê duyệt đã verify đầy đủ qua Browser.
- ✅ Side-effect tự động: `Employee.status` chuyển Chính thức khi đào tạo Đạt; chuyển Đã nghỉ
  việc khi chấm dứt HĐLĐ.
- ✅ Gate chấm dứt hợp đồng lao động — bắt buộc tick "đã thu hồi quyền truy cập bảo mật" (phối
  hợp M02) trước khi cho xác nhận, đúng quy tắc 7 DacTa.
- ✅ Hợp đồng dịch vụ (soạn + ký) đã verify; gia hạn HĐLĐ và chấm dứt HĐDV **chưa** verify qua UI.
- ⚠️ 2 "Quyết định phạm vi" (rút gọn ProbationReport/ServiceContract, EXPIRED derived không cron)
  — chưa được LĐP xác nhận chính thức, xem DacTa.md mục 6.
- ⚠️ Phát hiện 1 gate còn thiếu khi VERIFY (nội dung đào tạo Ban đầu chưa validate ≥8 mục) — đã
  sửa ngay trong cùng increment trước khi merge, xem verify.md mục 5.
- ❌ Chưa có UI riêng cho `ContractTermination` (chỉ tạo ngầm trong transaction).

## Trạng thái Increment 6 — xây mới M02_BaoMat (không có nguyên mẫu code)

Chi tiết đầy đủ + evidence verify:
[`05_MODULE_LIBRARY/M02_BaoMat/01_Requirement/_work/20260823-xay-moi-m02/verify.md`](../../05_MODULE_LIBRARY/M02_BaoMat/01_Requirement/_work/20260823-xay-moi-m02/verify.md).

Giống M01/M03 (xây mới từ `DacTa.md`, không di trú `08_Source`). 4 đối tượng: cam kết bảo mật,
sổ khách, phê duyệt công bố thông tin, sự cố bảo mật.

- ✅ **Điểm kỹ thuật đáng chú ý**: `SecurityCommitment.employeeId` là FK thật tới `M03Employee`
  (không phải chuỗi tham chiếu tự do như M03 dự kiến ban đầu, vì lúc đó M02 chưa xây) — đã verify
  qua Browser, mở cam kết hiển thị đúng liên kết nhân sự thật.
- ✅ Gate `DisclosureApproval` (quy tắc 5 ETV.P02): bắt buộc đã thông báo khách hàng trước khi
  công bố (trừ khi pháp luật cấm), đúng thẩm quyền TP/LĐV theo lựa chọn khi tạo hồ sơ — cả 2 gate
  đã verify chặn đúng qua Browser.
- ✅ Gate `SecurityIncident` (quy tắc 8 ETV.P02): bắt buộc đánh giá phạm vi/hậu quả trước khi
  chuyển bước, bắt buộc biện pháp khắc phục trước khi đóng hồ sơ — cả 2 gate đã verify chặn đúng.
- ✅ Thu hồi cam kết bảo mật đã verify qua Browser.
- ⚠️ 1 "Quyết định phạm vi" (SecurityCommitment không có bước soát xét/phê duyệt riêng — ký giấy
  = hiệu lực ngay) — chưa được LĐP xác nhận chính thức, xem DacTa.md mục 6.
- ❌ Gate `VisitorLog` (bắt buộc cam kết KHÁCH hợp lệ) chỉ verify qua code, chưa demo runtime (UI
  tự nhiên chỉ cho chọn cam kết hợp lệ nên không tạo được tình huống lỗi qua thao tác thường).
  Chưa có form sửa `customerNotified` sau khi tạo hồ sơ công bố. Chưa test nhánh LĐV duyệt thành
  công (chỉ test nhánh TP bị chặn sai thẩm quyền).

## Trạng thái Increment 7 — xây mới M04_MoiTruong (không có nguyên mẫu code)

Chi tiết đầy đủ + evidence verify:
[`05_MODULE_LIBRARY/M04_MoiTruong/01_Requirement/_work/20260823-xay-moi-m04/verify.md`](../../05_MODULE_LIBRARY/M04_MoiTruong/01_Requirement/_work/20260823-xay-moi-m04/verify.md).

Giống M01/M02/M03 (xây mới từ `DacTa.md`, không di trú `08_Source`). 2 đối tượng chính: nhật ký
điều kiện (`M04ConditionLog` — gộp môi trường + tủ hóa chất + tủ thiết bị theo đúng gợi ý "cấu
trúc chung" trong DacTa) và kế hoạch công việc hiện trường (`M04FieldWorkPlan`).

- ✅ Gate `withinSpec` (quy tắc 2 ETV.P04): tự tính hoàn toàn ở server so với ngưỡng khu vực
  (`M04AreaSpec`), bắt buộc biện pháp xử lý khi vượt ngưỡng — đã verify chặn đúng qua Browser.
- ✅ Gate cấp phê duyệt `FieldWorkPlan` theo mức rủi ro (quy tắc 5 ETV.P04): mức Rủi ro cao chỉ
  LĐV được duyệt, TP bị chặn đúng thông báo — đã verify qua Browser (LĐV duyệt thành công sau khi
  TP bị chặn).
- ✅ Đánh dấu đã phổ biến kế hoạch cho nhân sự trước khi thi công (quy tắc 4).
- ⚠️ 2 "Quyết định phạm vi" (gộp 3 loại log thành 1 model; `M04AreaSpec` chỉ seed 4 khu vực mẫu,
  chưa phải Phụ lục II đầy đủ) — chưa được LĐP xác nhận chính thức, xem DacTa.md mục 6.
- ❌ Chưa test qua UI: nhánh TP tự duyệt mức Thường, luồng Từ chối, ghi log loại tủ hóa
  chất/thiết bị qua form (chỉ có trong seed).

## Trạng thái Increment 8 — xây mới M16_DanhGiaNoiBo (không có nguyên mẫu code)

Chi tiết đầy đủ + evidence verify:
[`05_MODULE_LIBRARY/M16_DanhGiaNoiBo/01_Requirement/_work/20260823-xay-moi-m16/verify.md`](../../05_MODULE_LIBRARY/M16_DanhGiaNoiBo/01_Requirement/_work/20260823-xay-moi-m16/verify.md).

Giống M01/M02/M03/M04 (xây mới từ `DacTa.md`, không di trú `08_Source`). 4 đối tượng: kế hoạch
đánh giá, chương trình đánh giá, phát hiện, báo cáo tổng hợp.

- ✅ Gate duyệt `AuditPlan` 2 cấp (mirror M10): LĐP xem xét trước (không tự xem xét hồ sơ mình
  tạo), LĐV phê duyệt cuối (LĐP không tự phê duyệt được) — đã verify cả 2 nhánh chặn qua Browser.
- ✅ Gate thời hạn thông báo `AuditProgram` (quy tắc 2 ETV.P16): chặn xác nhận khi ngày đánh giá
  còn dưới 7 ngày.
- ✅ Gate vai trò tạo `AuditReport`: chỉ Trưởng đoàn đánh giá — LĐV bị chặn đúng thông báo.
- ✅ Báo cáo trễ hạn hiển thị badge cảnh báo nhưng **không chặn tạo**, đúng phân biệt "bắt buộc"
  vs "cần cảnh báo" trong DacTa.
- ⚠️ 2 "Quyết định phạm vi" (2 bước duyệt tường minh; chỉ gate cứng mốc 7 ngày) — chưa được LĐP
  xác nhận chính thức, xem DacTa.md mục 6.
- ❌ Chưa test qua UI: luồng Trả lại/Từ chối kế hoạch. (Gate DANHGIAVIEN đã được verify ở
  Increment 13.)
- ➡️ Quy tắc 1/2(mốc 2 tuần)/3/6/7 được hoàn thiện ở **Increment 13** bên dưới.

## Trạng thái Increment 9 — xây mới M17_XemXetLanhDao (không có nguyên mẫu code)

Chi tiết đầy đủ + evidence verify:
[`05_MODULE_LIBRARY/M17_XemXetLanhDao/01_Requirement/_work/20260823-xay-moi-m17/verify.md`](../../05_MODULE_LIBRARY/M17_XemXetLanhDao/01_Requirement/_work/20260823-xay-moi-m17/verify.md).

Giống M01/M02/M03/M04/M16 (xây mới từ `DacTa.md`, không di trú `08_Source`). 4 đối tượng: chương
trình xem xét, biên bản (12 nội dung ISO/IEC 17025 §8.9), theo dõi hành động, phiếu yêu cầu khắc
phục (→ M13).

- ✅ **Điểm kỹ thuật mới**: gate **đồng phê duyệt** (co-approval) cho `ReviewPlan` — TP và LĐV phê
  duyệt độc lập theo bất kỳ thứ tự nào, tự chuyển `APPROVED` khi đủ cả 2 — khác mô hình phân cấp
  tuần tự đã dùng ở M10/M16. Đã verify chiều TP→LĐV qua Browser.
- ✅ Gate đủ 12 nội dung khi lập `ReviewMinutes` (quy tắc 4 ETV.P17): chặn đúng khi thiếu 1 nội
  dung, thành công khi đủ 12 — đã verify cả 2 nhánh qua Browser.
- ✅ Gate chỉ LĐV ghi kết luận cuộc họp (quy tắc 5) — verify nhánh thành công qua Browser.
- ✅ **Cross-module thật đầu tiên**: cảnh báo mềm quy tắc 1 (chưa đủ dữ liệu đánh giá M16 năm đó)
  query Prisma trực tiếp vào bảng `M16AuditReport`/`M16AuditProgram`/`M16AuditPlan` — không import
  code M16, không chặn tạo. Đã verify trường hợp không hiển thị cảnh báo (M16 đã có dữ liệu).
- ✅ "Quá hạn" tính toán khi đọc (derived, không lưu DB), mirror M04 — đã verify hiển thị đúng.
- ⚠️ 3 "Quyết định phạm vi" (Quá hạn derived; co-approval thay vì phân cấp; cảnh báo mềm bằng
  query thật) — chưa được LĐV xác nhận chính thức, xem DacTa.md mục 6.
- ❌ Chưa test qua UI: chiều LĐV→TP của gate đồng phê duyệt, gate `ALREADY_APPROVED`, nhánh chặn
  của gate "chỉ LĐV ghi kết luận", trường hợp cảnh báo mềm **hiển thị**, luồng Từ chối kế hoạch.

## Trạng thái Increment 10 — xây mới M12_KhieuNai (không có nguyên mẫu code)

Chi tiết đầy đủ + evidence verify:
[`05_MODULE_LIBRARY/M12_KhieuNai/01_Requirement/_work/20260823-xay-moi-m12/verify.md`](../../05_MODULE_LIBRARY/M12_KhieuNai/01_Requirement/_work/20260823-xay-moi-m12/verify.md).

Giống M01/M02/M03/M04/M16/M17 (xây mới từ `DacTa.md`, không di trú `08_Source`). 2 đối tượng
nghiệp vụ: khiếu nại (state machine đầy đủ) và phàn nàn/góp ý (khách hàng + nội bộ, gộp 1 model
với field `origin`).

- ✅ **Điểm nghiệp vụ mới**: gate **bắt buộc văn bản khiếu nại chính thức F14.03** trước khi phân
  công, khi không giải quyết được ngay tại chỗ (quy tắc 1-2 ETV.P12) — đã verify cả nhánh chặn lẫn
  nhánh thành công qua Browser.
- ✅ Gate bắt buộc liên kết CAPA (→ M13) trước khi đóng hồ sơ khiếu nại phức tạp (quy tắc 4) —
  verify cả 2 nhánh qua Browser.
- ✅ Gate chỉ LĐV được quyết định dừng giải quyết khi khách hàng chưa chấp nhận (quy tắc 5) —
  verify nhánh chặn (PHUTRACH) lẫn nhánh thành công (LĐV) bằng đăng nhập đổi vai trò thật.
- ✅ Nhánh tắt: giải thích được ngay + khách hài lòng → đóng hồ sơ ngay khi tạo, không qua bước
  trung gian (quy tắc 2). Chuyển phàn nàn/góp ý thành khiếu nại chỉ 1 lần (quy tắc 6).
- ⚠️ 3 "Quyết định phạm vi" (gộp `Feedback`/`InternalFeedback` 1 model; `txAssignComplaint` quy
  định cứng vai trò LĐV cho mọi khiếu nại; `isComplex` là cờ thủ công) — chưa được LĐV xác nhận
  chính thức, xem DacTa.md mục 6.
- ❌ Chưa test qua UI: nhánh chặn `FORBIDDEN` khi người không được phân công cố trả lời, nhánh
  chặn `ASSIGNEE_REQUIRED`/không phải LĐV cố phân công, tổ hợp khiếu nại phức tạp + dừng giải
  quyết.

## Trạng thái Increment 11 — xây mới M13_KhacPhuc (không có nguyên mẫu code)

Chi tiết đầy đủ + evidence verify:
[`05_MODULE_LIBRARY/M13_KhacPhuc/01_Requirement/_work/20260823-xay-moi-m13/verify.md`](../../05_MODULE_LIBRARY/M13_KhacPhuc/01_Requirement/_work/20260823-xay-moi-m13/verify.md).

Giống M01/M02/M03/M04/M16/M17/M12 (xây mới từ `DacTa.md`, không di trú `08_Source`). M13 là
**điểm hội tụ CAPA** của hệ thống — M05/M10/M12 đều dẫn về đây. 4 đối tượng: sổ theo dõi công
việc không phù hợp (F13.01), phương án hành động khắc phục (1-1, chỉ mức Nặng), báo cáo/GCN đã
thu hồi, ghi chép diễn biến theo dõi.

- ✅ **Điểm nghiệp vụ mới**: gate **tách vai trò khi thẩm xét** — đúng vai trò QLCL nhưng nếu là
  người được phân công thực hiện phương án thì vẫn bị chặn tự thẩm xét. Đã verify cả 3 nhánh
  (sai vai trò / đúng vai trò nhưng tự thẩm xét / QLCL khác thẩm xét đạt) qua Browser.
- ✅ Gate **không tự mở khóa** (quy tắc 5 ETV.P13): mức Nặng chỉ đóng hồ sơ và cho tiếp tục công
  việc khi phương án đã thẩm xét ĐẠT — verify cả 2 nhánh; đóng thành công thì `stoppedWork` tự
  gỡ.
- ✅ Gate đánh giá mức độ (quy tắc 2): bắt buộc căn cứ + chỉ LĐV/QLCL/QLKT — verify cả 3 nhánh;
  chọn mức Nặng tự đặt dừng hẳn công việc (quy tắc 4).
- ✅ Gate mức Nhẹ bắt buộc ghi chép diễn biến trước khi đóng (quy tắc 3) và gate báo cáo thay thế
  chỉ LĐV + chỉ sau thẩm xét đạt (quy tắc 6) — verify đủ nhánh chặn lẫn nhánh thành công.
- ✅ **Cross-module đọc thật**: hồ sơ có nguồn phát hiện là khiếu nại hiển thị link sống sang
  `M12Complaint` (query thẳng bảng M12, không import code M12) — mirror cách M17 đọc bảng M16.
- ✅ Tạo mới tài khoản demo `qlkt@manlab.vn` (vai trò QLKT chưa từng có trong seed).
- ⚠️ 4 "Quyết định phạm vi" (plan 1-1 với hồ sơ; gate tự-thẩm-xét; yêu cầu phương án ĐẠT trước
  khi phát hành báo cáo thay thế; ngưỡng tối thiểu 1 ghi chép theo dõi) — chưa được LĐV xác nhận
  chính thức, xem DacTa.md mục 6.
- ❌ Chưa test qua UI: nhánh `NOT_SEVERE`, `PLAN_EXISTS`, thẩm xét KHÔNG ĐẠT + `NOTE_REQUIRED`,
  `txCompleteCapPlan` bởi người không được phân công.

## Trạng thái Increment 12 — xây mới M14_TaiLieu (không có nguyên mẫu code)

Chi tiết đầy đủ + evidence verify:
[`05_MODULE_LIBRARY/M14_TaiLieu/01_Requirement/_work/20260823-xay-moi-m14/verify.md`](../../05_MODULE_LIBRARY/M14_TaiLieu/01_Requirement/_work/20260823-xay-moi-m14/verify.md).

Khác các increment trước: M14 **đã có sẵn đặc tả** `02_API/API.md`, `03_Database/DataModel.md`,
`07_Workflow/StateMachine.md` — bản triển khai bám theo (đúng 7 trạng thái, đúng danh sách mã lỗi
nghiệp vụ), không định nghĩa lại.

- ✅ **Điểm mới quan trọng nhất — gate ISO/IEC 42001**: tài khoản AI Agent bị chặn ở **mọi**
  transition (`assertNotAiActor` gọi trong từng tx), verify bằng chính `ai-operator@manlab.vn`
  thao tác trên UI thật; chiều ngược lại cũng verify: gợi ý của AI chỉ vào văn bản khi người có
  thẩm quyền bấm "Áp dụng gợi ý".
- ✅ Gate thiếu trường bắt buộc **theo loại văn bản** (ETV.P14 §6.3) — thông báo liệt kê đúng tên
  từng trường còn thiếu, danh sách rút ngắn sau khi áp dụng gợi ý AI.
- ✅ Gate **không ủy quyền** phê duyệt Sổ tay/Thủ tục (quy tắc 4) — verify cả nhánh chặn
  (`LDV_UYQUYEN`) lẫn nhánh thành công (LĐV chính danh) trên cùng một văn bản.
- ✅ Gate người lập không tự soát xét; chỉ Văn thư/QLCL ban hành; chỉ LĐP thanh lý (phân biệt
  thanh lý vs hủy bỏ theo §6.11).
- ✅ **Cross-module chiều ngược**: văn bản bên ngoài hiển thị khiếu nại (M12) đang viện dẫn nó qua
  `externalDocRef` — khép vòng liên kết M12 → F14.03 tạo ở Increment 10.
- ⚠️ 5 "Quyết định phạm vi" + **nợ kỹ thuật**: `permissionGroup`/`retention` lưu chuỗi thay vì FK
  tới F14.06 (biểu mẫu chưa số hóa) — xem DacTa.md mục 6.
- ❌ Chưa test qua UI: `INVALID_CODE_FORMAT`/trùng mã khi tạo mới, nhánh Không soát xét/Không phê
  duyệt, `txPublish` nhánh thành công, `txDiscard` (LĐV hủy bỏ), `ALREADY_APPLIED`.

## Trạng thái Increment 14 — xây mới M25_BoiCanh (không có nguyên mẫu code, **cũng chưa có thủ tục**)

Chi tiết đầy đủ + evidence verify:
[`05_MODULE_LIBRARY/M25_BoiCanh/01_Requirement/_work/20260823-dac-ta-m25/verify.md`](../../05_MODULE_LIBRARY/M25_BoiCanh/01_Requirement/_work/20260823-dac-ta-m25/verify.md).

Khác **mọi** increment trước: các module trước đều số hóa một Thủ tục `ETV.Pxx` đã ban hành, còn
**`ETV.P25` chưa tồn tại** — Sổ tay chất lượng §9.2 mới chỉ dẫn chiếu tới nó. Đặc tả là bản **suy
dẫn** từ QM §9.2 + ISO 9001 §4.1/§4.2 (+ 17025 §4.1, 27001/42001 §4.1–4.3); mọi quy tắc suy dẫn
gom hết vào `src/lib/m25/rules.ts` và được đánh dấu `[SUY DẪN]` trong `DacTa.md` để sửa một chỗ
khi thủ tục được ban hành theo MP14.

- ✅ **Mô hình mới trên nền tảng — kỳ xem xét là snapshot có phiên bản**: kỳ Đã phê duyệt bất
  biến (không đường ghi nào), kỳ mới phê duyệt tự đẩy kỳ cũ sang `SUPERSEDED` + gán
  `supersedesId`; verify thật cả 2 chiều (BC-2026-0002 duyệt → BC-2026-0001 Hết hiệu lực, hết
  nút sửa).
- ✅ Gate **không để vấn đề trọng yếu bị treo** (quy tắc 3): vấn đề mức tác động Cao chưa liên
  kết rủi ro/cơ hội bên M01 thì chặn gửi soát xét — verify cả nhánh chặn lẫn nhánh qua sau khi
  liên kết FK thật sang `M01RiskItem`.
- ✅ Gate mong đợi thành **nghĩa vụ tuân thủ phải có căn cứ** (quy tắc 4) và **mỗi bên quan tâm
  phải có ≥1 mong đợi** (quy tắc 6) — verify đủ nhánh chặn + nhánh thành công.
- ✅ Gate **tách vai trò** (quy tắc 7): chỉ TP soát xét, chỉ LĐV phê duyệt (bắt buộc kết luận),
  người lập không tự soát xét/tự phê duyệt — verify cả 4 nhánh trên UI thật.
- ✅ **Kế thừa kỳ trước** (quy tắc 9): kỳ mới sao chép mục còn hiệu lực (kèm liên kết M01) và
  sinh mã mới; đóng mục bắt buộc lý do (quy tắc 10).
- ✅ "Đến hạn xem xét" là **tính khi đọc** từ tần suất + lần cập nhật gần nhất, không lưu cột
  trạng thái — verify cả 2 chiều; mục "Theo sự kiện" không bao giờ bị tính quá hạn.
- ✅ **Cross-module chiều mới**: M17 cảnh báo mềm khi lập chương trình xem xét lãnh đạo cho năm
  chưa có kỳ bối cảnh nào được phê duyệt (đọc thẳng bảng M25, không import code) — verify cả 2
  chiều.
- ⚠️ **6 câu hỏi phải chốt với LĐV/QLCL** trước khi coi là hồ sơ chính thức (chu kỳ, cấp phê
  duyệt, chặn cứng hay cảnh báo mềm ở quy tắc 3, danh mục chuẩn…) — xem `DacTa.md` mục 10; biểu
  mẫu F25.01–F25.03 **chưa ban hành** nên chưa làm chức năng xuất biểu mẫu.
- ❌ Chưa test qua UI: nhánh Không soát xét/Không phê duyệt (trả lại kèm lý do), bỏ liên kết M01,
  xóa mong đợi, đóng vấn đề bối cảnh.

## Trạng thái Increment 15 — khung Căn cứ pháp lý trên mọi trang module

Trước đây chỉ trang M25 có một đoạn "Căn cứ:" **viết cứng trong JSX**; 12 trang module còn lại
không nói người dùng đang thao tác theo văn bản kiểm soát nào. Increment này biến đoạn đó thành
một thành phần dùng chung lấy dữ liệu từ chính repo:

`04_PROCESS_LIBRARY/MPxx/manifest.yaml` (khối `document` + `forms`) và `links.yaml`
(`procedure`, `form_files`) → `prisma/seed.ts` → `PlatformModule` → `<CanCuBanner moduleCode="Mxx" />`.

Banner hiển thị 6 nhóm thông tin: mã + tên thủ tục (bấm mở file gốc qua cổng tài liệu) · lần ban
hành + ngày ban hành · chip trạng thái hiệu lực · chủ sở hữu quy trình · chuẩn mực ISO viện dẫn +
văn bản pháp luật · biểu mẫu áp dụng (mỗi mã là một link tới biểu mẫu gốc ở `06_SHARED_RESOURCES`).

- ✅ Khối `document` của 12 MP được **trích từ chính văn bản thủ tục** ở `03_MANAGEMENT_SYSTEM/02_P`
  (`id`/`title`/`revision`/`effective_date`/`iso_clause`/`legal_basis`), không tự đặt số hiệu.
- ✅ `links.yaml` của MP01/02/03/04/10/14/21 được sửa để `procedure` trỏ đúng file `ETV.Pxx` (trước
  đó nhiều MP còn trỏ nhầm sang Sổ tay chất lượng) và bổ sung `form_files`.
- ✅ MP21 chuẩn hóa khối `document` từ lược đồ riêng (`controlled/edition/issued`) về lược đồ chung.
- ⚠️ **M29 chưa có `ETV.P29`** — banner nói thẳng "chưa ban hành thủ tục" thay vì bịa căn cứ; seed
  in cảnh báo `[căn cứ] M29: …` mỗi lần chạy.
- ⚠️ M12/M13/M16/M17/M21 chưa có file biểu mẫu trong `06_SHARED_RESOURCES/01_Forms` (M21 mới có mã
  F21.01–F21.12 khai trong manifest, chưa có file) — chip mã vẫn hiện nhưng không bấm mở được.
- ⚠️ Banner chỉ gắn ở **trang chính** của 13 module đang chạy, chưa gắn ở các trang chi tiết.

## Trạng thái Increment 16 — xuất biểu mẫu ra PDF có dữ liệu (M03: F03.01 + F03.08)

Trước đây bản xuất biểu mẫu duy nhất là trang in HTML của M26 (`window.print()` — người dùng tự
"Lưu thành PDF", không đặt được tên file, không xuất hàng loạt). Increment này làm ra **file PDF
thật tải thẳng về máy**, làm trên hai biểu mẫu M03 **có bản chất khác nhau** để kiểm chứng khung
dùng chung có thật sự tổng quát.

Tại `/modules/M03`, chọn dòng trong bảng Nhân sự rồi bấm nút xuất tương ứng:

| Biểu mẫu | Bản chất | Kết quả | Chọn dòng |
|---|---|---|---|
| **F03.01** Sơ yếu lý lịch | Hồ sơ **cá nhân**, khổ dọc | 1 người → `F03.01_SoYeuLyLich_NS-2026-0002_TranThiBich.pdf`; nhiều người → `.zip`, mỗi người một file riêng (mỗi tờ là hồ sơ độc lập theo ETV.MP15, không gộp) | Bắt buộc, tối đa 100 người/lần |
| **F03.08** Danh sách nhân sự | Biểu mẫu **tổng hợp**, khổ ngang 11 cột | Luôn đúng **một** file `F03.08_DanhSachNhanSu_3NhanSu.pdf` — gói `.zip` ở đây là sai bản chất biểu mẫu | Không chọn = xuất **toàn bộ** danh sách |

Kiến trúc — cố ý dựng để dùng lại cho ~100 biểu mẫu còn lại của Viện, không phải chỉ cho F03.01:

| Lớp | File | Vai trò |
|---|---|---|
| Khung biểu mẫu | `src/lib/forms/layout.ts` | Khung A4 dùng chung theo NĐ 30/2020/NĐ-CP (Times New Roman 13pt, lề 20/20/30/15mm), khổ dọc/ngang, bảng mã số, quốc hiệu, hàng chữ ký, bảng danh sách dài (đầu bảng lặp mỗi trang), ô trống điền tay, escape dữ liệu |
| Metadata biểu mẫu | `src/lib/forms/meta.ts` | Đọc mã số/lần ban hành/ngày ban hành từ `PlatformModule.forms` |
| Nội dung từng biểu mẫu | `src/lib/m03/forms/f03-01.ts`, `f03-08.ts` | Bố cục 6 mục I–VI của F03.01 / 11 cột của F03.08 + quy tắc đặt tên file |
| Sinh PDF | `src/lib/pdf/render.ts` | Chromium headless (Puppeteer) render HTML → PDF, dùng lại một tiến trình |
| Điểm gọi | `src/app/api/m03/export/{f03-01,f03-08}/route.ts` | `GET ?ids=a,b,c` → PDF hoặc ZIP tuỳ bản chất biểu mẫu |

**Vì sao render từ HTML chứ không dựng PDF bằng thư viện vẽ**: mỗi biểu mẫu chỉ mô tả bố cục
**một lần** dưới dạng HTML, dùng chung cho cả bản xem trên web lẫn file PDF. Dựng bằng thư viện vẽ
thì mỗi biểu mẫu phải viết hai lần — với ~100 biểu mẫu của Viện là không kham nổi.

- ✅ Metadata biểu mẫu đi đúng đường sẵn có: frontmatter file biểu mẫu ở `06_SHARED_RESOURCES` →
  `prisma/seed.ts` → `PlatformModule.forms` → bản xuất. Biểu mẫu ban hành lại thì chạy lại seed,
  bản xuất tự đổi theo — **không viết cứng mã số/lần ban hành trong template**.
- ✅ Lúc chạy **không đọc file trong repo**: truy cập filesystem động khiến Next trace và đóng gói
  toàn bộ repo vào bundle deploy (Next cảnh báo thẳng khi build).
- ✅ `next.config.ts` khai `serverExternalPackages: ["puppeteer"]` — Puppeteer nạp Chromium từ ổ
  đĩa lúc chạy, gói vào bundle sẽ hỏng đường dẫn thực thi.
- ✅ **Khung dùng chung đã được kiểm chứng là tổng quát**: thêm biểu mẫu thứ hai (F03.08 — bản
  chất khác hẳn) chỉ cần bổ sung khổ ngang + kiểu bảng danh sách vào `layout.ts`; bảng mã số,
  quốc hiệu, hàng chữ ký, escape, tra metadata dùng lại nguyên vẹn.
- ✅ 25 test ở `src/lib/forms/__tests__/{f03-01,f03-08}.test.ts` (Prisma giả lập, không cần
  Postgres lẫn Chromium). Đã kiểm chứng end-to-end trên trình duyệt thật: F03.01 PDF đơn (`%PDF`,
  297KB) + ZIP 3 file đúng tên đúng thứ tự; F03.08 toàn bộ danh sách (200KB), lọc theo dòng đã
  chọn, và `ids` không tồn tại → 404 chứ không im lặng trả bảng rỗng.
- ⚠️ **`M03Employee` mới có 6 trường, F03.01 có ~20** — bản xuất giữ đủ 6 mục của biểu mẫu gốc,
  phần chưa số hoá in dòng chấm để điền tay (không bỏ mục, vì đoàn đánh giá đối chiếu bản in với
  biểu mẫu đã ban hành). Muốn PDF điền đầy đủ phải mở rộng `M03Employee` — **cần LĐP quyết định**,
  đó là mở rộng phạm vi module chứ không thuộc việc xuất biểu mẫu.
- ⚠️ Quyền xuất = quyền xem: chỉ yêu cầu phiên đăng nhập, **không** siết theo vai trò M03, vì trang
  `/modules/M03` hiện cho mọi người đã đăng nhập xem chính những dữ liệu này. Khi siết quyền xem
  theo module thì phải siết đồng thời cả trang lẫn route xuất, không để lệch.
- ⚠️ Mới làm 2/18 biểu mẫu của M03 và 2/~100 biểu mẫu toàn Viện. Cách làm đã đứng vững qua hai
  bản chất biểu mẫu khác nhau, có thể nhân rộng sang module khác.

## Trạng thái Increment 17 — HDSD: hướng dẫn dùng tuần tự trên mọi trang module

Khung Căn cứ (Increment 15) trả lời "trang này chạy theo văn bản nào", nhưng không trả lời
"tôi phải bấm gì trước, bấm gì sau, và ai làm bước nào". Người dùng mở một module lạ vẫn phải đi
hỏi người khác. Increment này thêm mục **Hướng dẫn sử dụng** vào chính khung đó, đi theo
đúng lối dữ liệu cũ:

`05_MODULE_LIBRARY/Mxx_Slug/04_UI/HDSD.yaml` → `parseHdsd()` → `prisma/seed.ts` →
`PlatformModule.hdsd` → `<CanCuBanner>`.

Mỗi bước gồm vai trò · việc phải làm · nút "Mở màn hình →" (nếu bước đó có màn hình riêng) ·
ràng buộc chặn của bước. Mục này **gập sẵn**, bấm một lần là mở — không đẩy nội dung nghiệp vụ
xuống dưới.

- ✅ 16 module đang vận hành đều đã có HDSD (5–9 bước/module), nội dung chắt từ chính
  `src/lib/mxx/rules.ts` (điều kiện chặn, tách vai trò) chứ không viết lại theo trí nhớ.
- ✅ Lược đồ `manlab-aios/hdsd@1.0` kiểm tra bằng `parseHdsd()` — sai lược đồ thì **dừng seed**
  kèm tên file, không nạp hướng dẫn cụt. Chép nhầm HDSD của module khác và `path` trỏ sang module
  khác đều bị bắt.
- ✅ `npm run kiem-tra-hdsd` chạy được trên máy sạch (không cần Postgres) — dùng chính hàm
  `parseHdsd()` của seed, không viết lại luật kiểm tra ở hai nơi.
- ⚠️ Module chưa dựng (COMING_SOON) chưa có HDSD — banner ẩn hẳn mục này thay vì hiện khung rỗng.
- ⚠️ HDSD là văn bản soạn tay: đổi luồng nghiệp vụ trong `rules.ts` mà quên sửa `HDSD.yaml` thì
  công cụ **không** phát hiện được — nó chỉ kiểm lược đồ và mã module, không đối chiếu ngữ nghĩa.

## Vì sao đặt ở `09_ENGINEERING/aios-platform` chứ không phải `05_MODULE_LIBRARY/Mxx`

App này không số hóa **một** MPxx cụ thể — nó là lớp nền tảng hợp nhất
xuyên suốt cả 38 module, nên không gắn một mã `Mxx` nào (không vi phạm bất
biến "không tự đổi/sinh số Mxx" của repo, vì đây không tự nhận là module
số hóa của MP nào). `09_ENGINEERING` là tầng "mã nguồn/hạ tầng kỹ thuật
của nền tảng" theo đúng mô tả trong `09_ENGINEERING/README.md` gốc.

## Chạy dev

Cần Postgres đang chạy cục bộ (hoặc sửa `DATABASE_URL` trong `.env` trỏ
tới DB khác):

```bash
createdb aios_platform_dev   # 1 lần, nếu chưa có DB
npm install
npx prisma migrate dev       # tạo bảng
npx prisma db seed           # nạp 38 module + tài khoản demo
npm run nap-chi-muc-copilot  # nạp chỉ mục tri thức cho Copilot tra cứu (xem bên dưới)
npm run dev                  # http://localhost:3000
```

Biến môi trường: xem [`.env.example`](.env.example). File `.env` bị `.gitignore` chặn — không commit.

Tài khoản demo (chỉ dev/demo — đổi/xoá trước khi triển khai thật):
`admin@manlab.vn`; mật khẩu lấy từ biến môi trường `SEED_DEMO_PASSWORD`, hoặc do lệnh
seed sinh ngẫu nhiên và in ra một lần nếu biến đó không được đặt.

Hoặc dùng cấu hình preview có sẵn của repo: `.claude/launch.json` →
`aios-platform` (port mặc định 3000).

## Trạng thái Increment 13 — hoàn thiện M16_DanhGiaNoiBo theo đặc tả

Chi tiết đầy đủ + evidence verify:
[`05_MODULE_LIBRARY/M16_DanhGiaNoiBo/01_Requirement/_work/20260823-hoan-thien-m16/verify.md`](../../05_MODULE_LIBRARY/M16_DanhGiaNoiBo/01_Requirement/_work/20260823-hoan-thien-m16/verify.md).

Khác các increment trước (mỗi increment = 1 module mới): đây là increment **quay lại đóng khoảng
trống đặc tả** của một module đã xây — 5 quy tắc ETV.P16 trước đó phải hoãn vì M03/M13 chưa có
backend thật, nay đã có.

- ✅ **Quy tắc 1 — năng lực đánh giá viên là dữ liệu thật, không phải ghi chú**: `M16AuditorQualification`
  công nhận từng loại năng lực với bằng chứng bắt buộc là hồ sơ đào tạo `DAT`+`APPROVED` của
  **M03** (server kiểm tra hồ sơ đúng người/đúng kết quả); đoàn đánh giá chuyển từ tên tự do sang
  FK `M03Employee`. Xác nhận chương trình bị chặn cứng khi đoàn thiếu năng lực — đã verify qua
  Browser (nêu đích danh người thiếu gì).
- ✅ **Quy tắc 6 — KPH sinh hồ sơ thật bên M13**: Trưởng bộ phận được đánh giá xác nhận nhận kết
  quả → phân tích nguyên nhân → đề xuất khắc phục, gọi thẳng action của M13 (`M13SourceType`
  thêm `DANH_GIA_NOI_BO`), hồ sơ đi tiếp đúng luồng M13. Thay cho `capaRef` chuỗi tự do.
- ✅ **Quy tắc 7 — LĐP thẩm tra mới được đóng**: trạng thái `CLOSED` chỉ mở khi có báo cáo + mọi
  KPH đã chuyển M13 + mọi hồ sơ M13 đã Đã khắc phục; nhánh "chưa đủ tin cậy" tạo kế hoạch **đánh
  giá bổ sung** đột xuất. Đã verify trọn vòng đời qua Browser (chặn 2 lần, đóng thành công sau khi
  xử lý xong hồ sơ bên M13).
- ✅ Quy tắc 3 (ý kiến bảo lưu, không biểu quyết) + quy tắc 2 (cảnh báo mềm mốc 2 tuần, không chặn).
- ✅ 2 vai trò trước đây không có action nay dùng thật: `DANHGIAVIEN`, `TRUONGBOPHAN` (+2 tài khoản
  demo).
- ⚠️ 5 "Quyết định phạm vi" mới — chưa được LĐP xác nhận chính thức, xem DacTa.md mục 7.
- ❌ Chưa verify runtime: gate "hồ sơ đào tạo chưa Đạt" (UI không tạo được tình huống), thu hồi
  công nhận năng lực (action có, chưa có nút). Quy tắc 5 (→ M11) và 8 (→ M15) vẫn ngoài phạm vi vì
  2 module đó chưa xây.

## Build production

```bash
npm run build
npm run start
```

### Header bảo mật

`next.config.ts` phát 6 header trên mọi response: `Strict-Transport-Security`, `X-Frame-Options`,
`Content-Security-Policy` (mới chỉ `frame-ancestors`), `X-Content-Type-Options`, `Referrer-Policy`,
`Permissions-Policy`. Đặt ở tầng ứng dụng chứ không ở nginx/Cloudflare để bản dev, bản build cục bộ
và bản trên VPS cư xử giống nhau. Kiểm sau khi deploy:

```bash
curl -sSI https://aios.manlab.vn/login | grep -iE "strict-transport|content-security|x-frame|x-content-type|referrer-policy|permissions-policy"
```

CSP đầy đủ (`script-src`/`style-src`) **chưa làm** — cần phát nonce trong `src/proxy.ts` cho script
nội tuyến ở `src/app/layout.tsx` và style nội tuyến ở `M26/print/PrintFrame.tsx`; lý do và các bước
ghi ở cuối `next.config.ts`.

### Lịch quét AIA quá hạn (M29)

Đặt `M29_SWEEP_TOKEN` trong `.env` của máy chủ rồi cho cron gọi `POST /api/m29/sweep` — mẫu crontab
nằm ngay cạnh biến đó trong [`.env.example`](.env.example). **Bỏ qua bước này thì vòng quét im lặng
không chạy**: route trả 503 và hồ sơ AIA quá hạn rà soát không bao giờ tự chuyển sang *Cần rà soát
lại*, trái với yêu cầu "phát hiện theo lịch, chủ thể là hệ thống" của ETV.P29 mục 5.2.3. Không có
cảnh báo nào cho tình trạng này — phải tự kiểm:

```bash
curl -sS -o /dev/null -w "%{http_code}\n" -X POST https://aios.manlab.vn/api/m29/sweep
```

`503` = chưa cấu hình token, vòng quét đang tắt. `401` = đã cấu hình (token trong lệnh trên sai,
đúng như mong đợi vì lệnh không gửi token).

## Chạy test

```bash
npm test
```

Bộ test logic nghiệp vụ (hiện phủ module M29) đặt tại `src/lib/m29/__tests__/`, chạy bằng
`vitest`. Prisma được giả lập trong từng file test nên **không cần Postgres** — chạy được trên máy
sạch và trong CI, hết dưới 1 giây. `npm run test:watch` để chạy liên tục khi đang sửa mã.

Test phủ những chốt chặn mà Thủ tục ETV.P29 đặt ra: 8 bước của Tool Gateway, AIA Gate, Cổng triển
khai, vòng đời phiếu sự cố (tách vai trò người phát hiện/người đóng), vòng quét AIA quá hạn, và ma
trận phân quyền. Sửa mã làm hỏng một trong các chốt đó thì test đỏ — xem
`05_MODULE_LIBRARY/M29_AI/01_Requirement/_work/20260824-m29-bo-test-logic/verify.md` để biết bộ
test đã được kiểm chứng thế nào.

CI chạy bộ test này ở mọi push/PR chạm `09_ENGINEERING/aios-platform/**`
(`.github/workflows/test-aios-platform.yml`).

## Copilot tra cứu (M29)

Trợ lý hỏi–đáp **chỉ-đọc** gắn ở góc dưới mọi trang nền tảng: trả lời về thủ tục ETV.Pxx, biểu mẫu,
tiêu chuẩn và module, **bắt buộc dẫn đường dẫn tài liệu gốc**, không ghi bất kỳ dữ liệu nghiệp vụ nào.

Copilot **không phải tính năng đứng ngoài** — nó là một `AIAgent` (`AGENT_COPILOT_TRACUU`) đăng ký
trong chính control plane M29, nên chịu nguyên các chốt đã có: chưa có hồ sơ AIA `APPROVED` thì
không trả lời được, Agent chuyển `SUSPENDED` thì khay biến mất ngay, và **mọi lượt hỏi sinh đúng một
`AIRequest`** ở trang Trace — kể cả lượt bị guardrail chặn, lượt vượt hạn mức và lượt lỗi.
`gateway.chat()` là đường gọi mô hình ngôn ngữ **duy nhất**.

Chuẩn bị để chạy:

```bash
# Một trong hai nhà cung cấp — Copilot chọn Gemini khi chỉ có khoá Gemini:
echo 'ANTHROPIC_API_KEY="sk-ant-..."' >> .env
echo 'GEMINI_API_KEY="..."'           >> .env
npm run nap-chi-muc-copilot                     # nạp lại mỗi khi tài liệu trong repo thay đổi
```

Không có khoá thì khay vẫn hiện, mọi lượt hỏi báo `NO_API_KEY` và trang đang mở không bị ảnh hưởng.
Đổi nhà cung cấp **không sửa một dòng nghiệp vụ nào** — chỉ thêm adapter trong `src/lib/m29/adapters.ts`
và đổi `adapterType` của bản ghi `AIPlatform`; nhưng theo ETV.P29 §5.3.3 đó là sự kiện **bắt buộc
đánh giá lại**.

**Ranh giới dữ liệu theo TỪNG nền tảng (ETV.P29 §5.5)** — `AIPlatform.dataBoundary`, ba trạng thái
ánh xạ thẳng từ thủ tục:

| Ranh giới | Nghĩa | Trần |
|---|---|---|
| `NO_EXTERNAL_TRANSFER` | dữ liệu không rời hạ tầng Viện (mô hình tự vận hành) | Nội bộ |
| `EXTERNAL_WITH_COMMITMENT` | rời, nhà cung cấp cam kết không huấn luyện lại, **đã trích vào F29.02** | Nội bộ |
| `EXTERNAL_NO_COMMITMENT` | rời, không cam kết — **mặc định** | chỉ Công khai |

Không trạng thái nào mở tới **Hạn chế/Mật**, kể cả mô hình nội bộ: ETV.P28 §6.13 cấm ở mức *truy
cập* — *"trợ lý AI chỉ được truy cập nguồn dữ liệu mức Công khai và Nội bộ"*.

Đổi ranh giới bằng `datRanhGioiDuLieu()`, quyền `governance` (**AI_SECURITY_ADMIN**, **SUPER_ADMIN**)
— cố ý **không** phải `platforms`, để người đăng ký nền tảng không tự nới ranh giới của chính nền
tảng mình vừa tạo. Nới lên trạng thái *có cam kết* **bắt buộc dẫn số hồ sơ F29.02**, để trống là lỗi;
mọi lần đổi ghi vết ở `AIAuditLog`.

> **Sau khi di trú:** mọi `AIPlatform` đã có trong CSDL nhận giá trị mặc định
> `EXTERNAL_NO_COMMITMENT`, tức bị siết xuống Công khai — fail-closed đúng ý đồ, nhưng Copilot sẽ
> đột ngột "quên" gần hết tài liệu. Chạy lại `npx prisma db seed` (khai sẵn ranh giới cho 5 nền tảng
> mẫu) hoặc gọi `datRanhGioiDuLieu()` cho từng nền tảng.

Chạy bộ đánh giá dưới trần thu hẹp sẽ **không** được ghi thành `AIEvaluationRun`.

Chỉ mục **fail-closed** theo ETV.P29 §5.5 + ETV.P26 §5.5: chỉ nạp tài liệu mức Công khai/Nội bộ
**và** đã phê duyệt, thuộc lớp tài liệu đã được duyệt trong
[`q1-anh-xa-muc-bao-mat.md`](../../05_MODULE_LIBRARY/M29_AI/01_Requirement/_work/20260825-copilot-tra-cuu/q1-anh-xa-muc-bao-mat.md).
Hồ sơ đã điền, dữ liệu khách hàng/nhân sự, bằng chứng đánh giá, toàn văn tiêu chuẩn có bản quyền và
84 SOP `03_MANAGEMENT_SYSTEM/03_M` (chưa rà mức từng file) **không** vào chỉ mục — lần chạy script
in ra đầy đủ số file bị bỏ và lý do.

Bộ kiểm thử chất lượng — **42 tình huống theo đúng 7 nhóm của biểu mẫu ban hành
[ETV.P.F29.03](../../06_SHARED_RESOURCES/01_Forms/F29_AI/ETV.P.F29.03_PhieuKiemThuDanhGiaChatLuongAI.md)**
(nhóm 3, 4, 5, 7 bắt buộc đạt). Nguồn sự thật: `src/lib/m29/copilot/bo-cau-hoi-vang.ts`.

```bash
npm run danh-gia-copilot -- --kiem-nguon     # nguồn kỳ vọng có thật trong chỉ mục? (không gọi mô hình)
npm run danh-gia-copilot -- --chi-truy-hoi   # truy hồi lấy được nguồn đúng không? (điều kiện cần)
npm run danh-gia-copilot                     # đánh giá thật, ghi AIEvaluationRun — cần khoá API của nền tảng đang gán
npm run danh-gia-copilot -- --loi-nhac <id>  # đo một phiên bản lời nhắc CHƯA kích hoạt
```

**Phần mềm đo, người kết luận.** Trình chạy chỉ ghi `AIEvaluationRun.status = CHO_KET_LUAN` và xuất
bản nháp phiếu F29.03 với ô Kết luận **để trống** — ETV.P29 §4.8: trợ lý AI không kết luận Đạt/Không
đạt và không phê duyệt phiếu. Chuyển sang Đạt/Không đạt ở khối **Đánh giá chất lượng (ETV.P.F29.03)**
trên trang chi tiết tác tử, quyền `evaluations:write` (**AI_OPERATOR**, **SUPER_ADMIN** — cố ý *không*
phải AI_ADMIN: người khai báo cấu hình không tự kết luận cấu hình của mình), bắt buộc dẫn số phiếu đã ký.

**Cổng triển khai fail-closed** (ETV.P29 §5.3.1): không kích hoạt được phiên bản lời nhắc mới nếu lần
đánh giá gần nhất chưa có kết luận Đạt — kể cả khi chưa chạy lần nào. Lượt đánh giá gặp lỗi hạ tầng bị
huỷ và không ghi kết quả: sự cố mạng không được hoá trang thành "đạt".

Cổng đó và yêu cầu "đánh giá trước khi vận hành" của cùng điều khoản sẽ **khoá nhau** nếu chỉ đo được
bản đang hiệu lực: muốn đo bản mới phải kích hoạt trước, mà kích hoạt lại đòi đo trước. `--loi-nhac`
là lối ra: đo đúng bản sắp dùng mà không đụng `activePromptVersionId`. Bản được đo vẫn phải
APPROVED/ACTIVE, và `AIRequest.promptVersionId` ghi đúng bản đã dùng nên trace không nói dối về thứ đã
sinh ra câu trả lời. Trước khi có cờ này, cách duy nhất để đo là sửa thẳng CSDL — xem cảnh báo tự ghi
trong [`_work/20260828-loi-nhac-trich-dan-cuoi/verify.md`](../../05_MODULE_LIBRARY/M29_AI/01_Requirement/_work/20260828-loi-nhac-trich-dan-cuoi/verify.md).

Tắt nhanh: `COPILOT_ENABLED=false` trong `.env` (đường tắt kỹ thuật cho sự cố) hoặc chuyển Agent sang
`SUSPENDED` trong M29 (đường đúng theo quy trình ETV.P29 §5.7.3).

Đặc tả và bằng chứng verify:
[`M29_AI/01_Requirement/_work/20260825-copilot-tra-cuu/`](../../05_MODULE_LIBRARY/M29_AI/01_Requirement/_work/20260825-copilot-tra-cuu/spec.md)
— spec · plan · q1 · verify.

## Cấu trúc chính

```
prisma/schema.prisma   Schema: auth (User/Account/Session) + PlatformModule
prisma/seed.ts         Seed — quét repo để nạp 38 module + user demo
src/lib/auth.ts        Cấu hình NextAuth v5 (Credentials + Prisma adapter)
src/lib/prisma.ts       Prisma client singleton (driver adapter pg)
src/proxy.ts            Gate auth (Next.js 16 đổi tên middleware.ts → proxy.ts)
src/app/login/          Trang đăng nhập
src/app/(platform)/     Layout có sidebar + trang dashboard + /modules/[code]
src/lib/m10/            Rule engine + actor/actions M10 (Increment 1)
src/lib/m21/            Rule engine + actor/actions M21 (Increment 2)
src/lib/m29/            Rule engine + actor/actions M29 — AIOS Control Plane (Increment 3)
src/lib/m29/copilot/    Copilot tra cứu: truy hồi + chuẩn hóa văn bản + server action
scripts/nap-chi-muc-copilot.ts  Nạp chỉ mục tri thức cho Copilot (lọc mức bảo mật fail-closed)
src/lib/m01/            Rule engine + actor/actions M01 — Rủi ro & Cơ hội, xây mới (Increment 4)
src/lib/m03/            Rule engine + actor/actions M03 — Nhân sự, xây mới (Increment 5)
src/lib/m02/            Rule engine + actor/actions M02 — Bảo mật, xây mới (Increment 6)
src/lib/m04/            Rule engine + actor/actions M04 — Môi trường, xây mới (Increment 7)
src/lib/m16/            Rule engine + actor/actions M16 — Đánh giá nội bộ, xây mới (Increment 8)
src/lib/m17/            Rule engine + actor/actions M17 — Xem xét lãnh đạo, xây mới (Increment 9)
src/lib/m12/            Rule engine + actor/actions M12 — Khiếu nại & phản hồi, xây mới (Increment 10)
src/lib/m13/            Rule engine + actor/actions M13 — Công việc không phù hợp/CAPA, xây mới (Increment 11)
src/lib/m14/            Rule engine + actor/actions M14 — Kiểm soát tài liệu, xây mới (Increment 12)
src/lib/m25/            Rule engine + actor/actions M25 — Bối cảnh & bên quan tâm, xây mới (Increment 14)
src/components/CanCuBanner.tsx  Khung Căn cứ pháp lý dùng chung cho mọi trang module (Increment 15)
src/lib/hdsd.ts         Lược đồ + kiểm tra HDSD của module (Increment 17)
scripts/kiem-tra-hdsd.ts  Kiểm tra mọi 05_MODULE_LIBRARY/Mxx/04_UI/HDSD.yaml, không cần Postgres
                        (M16 bổ sung năng lực đánh giá viên + liên kết M03/M13 ở Increment 13)
```
