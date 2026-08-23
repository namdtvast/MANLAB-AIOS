# MANLAB-AIOS Platform — Increment 0 → 11 (khung 38 module + M10/M21/M29 di trú + M01/M03/M02/M04/M16/M17/M12/M13 xây mới)

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
- ❌ Chưa test qua UI: luồng Trả lại/Từ chối kế hoạch, gate DANHGIAVIEN riêng biệt khi ghi phát
  hiện.

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
npm run dev                  # http://localhost:3000
```

Tài khoản demo (chỉ dev/demo — đổi/xoá trước khi triển khai thật):
`admin@manlab.vn` / `DoiMatKhauNgay!2026`.

Hoặc dùng cấu hình preview có sẵn của repo: `.claude/launch.json` →
`aios-platform` (port mặc định 3000).

## Build production

```bash
npm run build
npm run start
```

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
src/lib/m01/            Rule engine + actor/actions M01 — Rủi ro & Cơ hội, xây mới (Increment 4)
src/lib/m03/            Rule engine + actor/actions M03 — Nhân sự, xây mới (Increment 5)
src/lib/m02/            Rule engine + actor/actions M02 — Bảo mật, xây mới (Increment 6)
src/lib/m04/            Rule engine + actor/actions M04 — Môi trường, xây mới (Increment 7)
src/lib/m16/            Rule engine + actor/actions M16 — Đánh giá nội bộ, xây mới (Increment 8)
src/lib/m17/            Rule engine + actor/actions M17 — Xem xét lãnh đạo, xây mới (Increment 9)
src/lib/m12/            Rule engine + actor/actions M12 — Khiếu nại & phản hồi, xây mới (Increment 10)
src/lib/m13/            Rule engine + actor/actions M13 — Công việc không phù hợp/CAPA, xây mới (Increment 11)
```
