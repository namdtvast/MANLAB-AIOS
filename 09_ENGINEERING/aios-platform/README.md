# MANLAB-AIOS Platform — Increment 0 + 1 + 2 + 3 + 4 (khung 38 module + M10/M21/M29 di trú + M01 xây mới)

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
```
