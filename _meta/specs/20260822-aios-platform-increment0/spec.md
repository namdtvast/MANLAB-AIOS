# Feature Spec — 20260822-aios-platform-increment0

Tier: **L** (đổi kiến trúc, đổi authentication, hạ tầng dùng chung/production).
Phạm vi: hạ tầng dùng chung không gắn một module cụ thể → artifact lưu tại
`_meta/specs/` theo mục 10 của SKILL.md, không phải `Mxx_Slug/01_Requirement/_work/`.

## OUTCOME

```
Primary User: Nhân sự ETV vận hành/quản trị nền tảng số (sau này); hiện tại
  là coder/DevOps triển khai nền tảng.
Secondary User: Đoàn đánh giá/kiểm định muốn duyệt trạng thái số hóa của
  từng module qua 1 cổng duy nhất thay vì nhiều prototype rời rạc.
Administrator: Vai trò ADMIN (bảng PlatformModule/User) — quản lý danh sách
  module, tài khoản.
External System: (chưa có ở Increment 0 — API M10/M29 hiện vẫn là service
  riêng, chưa gọi từ app này)

Problem: MANLAB-AIOS gồm 38 module số hóa (M01–M38) nhưng chỉ 3 module có
  code chạy thật (M10, M21, M29), mỗi cái là 1 app/DB độc lập (file JSON,
  không auth thật, không build step) — không có "một nền tảng" thống nhất
  như người dùng yêu cầu (đối chiếu VI-CONNECT: 1 app Next.js+Prisma+Postgres).

Current Situation: Trước Increment 0, không tồn tại app nào hợp nhất — mỗi
  module tự chạy trên port riêng, không có bảng ghi nhận "38 module có
  những gì, module nào đã số hóa" tập trung, không có auth thật (chỉ mô
  phỏng qua header X-Role).

Expected Improvement: Có 1 app Next.js+Prisma+PostgreSQL, build step thật
  (`next build`), auth thật (NextAuth v5 + bcrypt), và sidebar/registry
  liệt kê đủ 38 module lấy trực tiếp từ cấu trúc repo (không hardcode 2
  nơi) — làm nền cho Increment 1+ (di trú nghiệp vụ M10/M29 và xây tiếp
  35 module còn lại).

Success Criteria:
  - `npm run build` chạy sạch (0 lỗi TypeScript/ESLint).
  - Đăng nhập/đăng xuất bằng tài khoản thật (không phải X-Role giả lập).
  - Truy cập route được bảo vệ khi chưa đăng nhập → redirect 307 về /login.
  - Sidebar hiển thị đúng 38 module, đúng tên (khớp manifest MPxx), đúng 3
    module đánh dấu "Đang chạy" (M10/M21/M29).
  - `python3 _meta/validate_links.py` vẫn PASS sau khi thêm code mới.
```

## SPEC

### UI

```
Purpose: Khung điều hướng + trang chi tiết cho từng module trong số 38.
User: Người dùng đã đăng nhập (mọi role ở Increment 0 — chưa phân quyền
  UI theo role, chỉ có bảng phân quyền ở DB làm nền cho sau này).
Input: Form đăng nhập (email/password).
Output: Trang dashboard (thống kê tổng/active/coming-soon), trang chi
  tiết /modules/[code].
Actions: Đăng nhập, đăng xuất, điều hướng qua 38 mục sidebar.
Validation: email/password bắt buộc (HTML required); sai thông tin →
  thông báo "Sai email hoặc mật khẩu." (không tiết lộ email có tồn tại
  hay không).
Permission: Toàn bộ route trừ /login và /api/auth/* yêu cầu session hợp
  lệ (proxy.ts).
Loading state: Nút "Đăng nhập" hiển thị "Đang đăng nhập…" khi pending
  (useActionState).
Empty state: (không áp dụng — luôn có 38 module từ seed)
Error state: Trang /modules/[code] không tồn tại → notFound() (404 mặc
  định Next.js).
```

### Data

```
Entities: User, Account, Session, VerificationToken (chuẩn NextAuth
  Prisma adapter), PlatformModule (mới, riêng của platform này).
Fields (PlatformModule): id, code (unique, "M01".."M38"), slug, name,
  mpCode, capabilityCode, status (ACTIVE|COMING_SOON), sourcePath, order
  (unique), createdAt, updatedAt.
Fields (User, bổ sung so với chuẩn NextAuth): passwordHash (cho
  Credentials provider), role (enum PlatformRole: ADMIN/MEMBER/VIEWER,
  default VIEWER).
Relations: Account/Session → User (1-N, cascade delete). PlatformModule
  không có quan hệ FK ở Increment 0 (chưa có bảng nghiệp vụ M10/M29 nào
  tham chiếu tới).
Constraints: PlatformModule.code unique, .order unique.
Indexes: unique index tự động trên code/order/email (Prisma @unique).
Audit fields: PlatformModule có createdAt/updatedAt; chưa có audit log
  thay đổi (khác với AIAuditLog của M29 — chưa hợp nhất ở Increment 0).
Version/concurrency fields: không có (chưa cần ở quy mô Increment 0).
```

### Business Rules

```
BR-01: Mọi route trong (platform) route group yêu cầu session hợp lệ;
  không có session → redirect 307 tới /login?callbackUrl=<path gốc>.
BR-02: PlatformModule.status = ACTIVE chỉ dành cho module đã có
  05_MODULE_LIBRARY/Mxx_Slug/08_Source chạy thật (hiện: M10, M21, M29,
  hardcode trong seed.ts — KHÔNG tự động phát hiện qua đếm file, vì đó là
  quyết định vận hành, không phải suy luận từ filesystem).
BR-03: Danh sách/tên 38 module PHẢI lấy từ 05_MODULE_LIBRARY/ +
  04_PROCESS_LIBRARY/*/manifest.yaml lúc seed — không hardcode tên module
  trong code ứng dụng (đúng nguyên tắc "một nguồn sự thật" của repo gốc).
```

### State

```
States: Session — chưa đăng nhập / đã đăng nhập.
Allowed transitions: chưa đăng nhập → đã đăng nhập (Credentials hợp lệ);
  đã đăng nhập → chưa đăng nhập (signOut).
Forbidden transitions: (không áp dụng ở quy mô Increment 0 — chưa có
  state machine nghiệp vụ nào được port vào đây)
Authorized roles: mọi role đã đăng nhập được xem toàn bộ sidebar/dashboard
  ở Increment 0 (chưa gate theo role — ghi nhận là NOT DONE, không giả
  vờ đã có).
Triggers: submit form login, click "Đăng xuất".
Side effects: tạo/xoá Session record trong Postgres (qua PrismaAdapter).
```

### API

```
Method/Path: POST/GET /api/auth/[...nextauth] — toàn bộ do next-auth
  handlers quản lý (không tự viết endpoint auth riêng).
Authorization: public (đây chính là endpoint xác thực).
Request/Response/Validation/Status codes/Error codes: theo chuẩn NextAuth
  v5, không custom.
(Chưa có API nghiệp vụ nào khác ở Increment 0 — /modules/[code] là Server
Component đọc DB trực tiếp qua Prisma, không qua REST API riêng.)
```

### Acceptance Criteria

```
GIVEN chưa đăng nhập, WHEN truy cập "/" hoặc "/modules/M10" bằng curl
  không cookie, THEN nhận HTTP 307 redirect tới /login?callbackUrl=...
  — verified: xem verify.md.

GIVEN đã đăng nhập bằng admin@manlab.vn (mật khẩu tài khoản demo), WHEN vào
  trang chủ, THEN thấy sidebar đủ 38 mục, thẻ thống kê 38/3/35 — verified
  bằng screenshot trong verify.md.

GIVEN module status=ACTIVE (M10), WHEN vào /modules/M10, THEN thấy khối
  thông báo xanh "đã có ứng dụng chạy thật" + sourcePath — verified.

GIVEN module status=COMING_SOON (M01), WHEN vào /modules/M01, THEN thấy
  khối "Sắp ra mắt" + đường dẫn DacTa.md — verified.

GIVEN đã đăng nhập, WHEN bấm "Đăng xuất", THEN quay lại /login — verified.
```

### Non-Functional Requirements

```
Performance: chưa đo (Increment 0 chưa có tải thật).
Scalability: N/A ở quy mô hiện tại (dev/demo).
Availability: N/A (chưa deploy production).
Concurrency: Prisma Postgres adapter dùng connection pool mặc định của
  driver `pg` — chưa cấu hình pool size riêng, cần xem lại khi deploy.
Logging: chưa có (dùng console mặc định của Next.js dev).
Observability: chưa có.
Audit trail: chưa có (khác biệt với AIAuditLog của M29 — cần làm ở
  Increment khi hợp nhất dữ liệu M29 vào đây).
Privacy: passwordHash dùng bcrypt (10 rounds); AUTH_SECRET random 32
  byte trong .env (gitignored, không commit).
Retention: N/A.
Backup: N/A (Postgres local dev, chưa có chiến lược backup — PHẢI làm
  trước khi có dữ liệu thật).
Timezone: chưa xử lý riêng (dùng UTC mặc định Postgres/Prisma).
Localization: giao diện tiếng Việt, chưa có i18n framework.
Accessibility: chưa audit riêng (dùng label/input chuẩn HTML).
Idempotency: seed.ts dùng upsert theo code — chạy lại nhiều lần an toàn,
  không tạo trùng.
Traceability: PlatformModule.sourcePath trỏ ngược về đường dẫn thật
  trong repo — giữ liên kết tới nguồn.
Electronic signature/version integrity: N/A ở Increment 0 (chưa động tới
  hồ sơ có version/e-signature như MP14).
```
