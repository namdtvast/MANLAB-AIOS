# Implementation Plan — 20260822-aios-platform-increment0

## Architecture Impact

```
Frontend: Next.js 16 App Router, TypeScript, Tailwind v4 — mới hoàn toàn
  tại 09_ENGINEERING/aios-platform (không có frontend hợp nhất trước đó).
Backend: Server Components + Server Actions của Next.js (không tách API
  server riêng như M10/M29) — đọc/ghi DB trực tiếp qua Prisma trong RSC.
Database: PostgreSQL mới (aios_platform_dev cục bộ) — tách biệt hoàn
  toàn với data/data.json của M10/M29 (chưa hợp nhất).
Authentication: NextAuth v5 (Credentials + PrismaAdapter, session
  strategy JWT) — thay thế hoàn toàn kiểu X-Role giả lập của M10/M29
  NHƯNG chỉ trong phạm vi app mới; M10/M29 vẫn dùng X-Role như cũ cho
  tới khi bị port ở Increment 1.
Authorization: bảng User.role (ADMIN/MEMBER/VIEWER) tồn tại nhưng CHƯA
  được dùng để gate bất kỳ UI/route nào ở Increment 0 — ghi rõ đây là nợ
  kỹ thuật cần làm trước khi lên production thật.
API: /api/auth/[...nextauth] duy nhất (do next-auth generate).
Domain: dự kiến aios.manlab.vn (theo quyết định của người dùng ở phiên
  làm việc trước) — CHƯA cấu hình domain/deploy thật ở Increment 0.
Data layer: Prisma 7 + driver adapter @prisma/adapter-pg (bắt buộc ở
  Prisma 7 — không còn `url` trực tiếp trong schema.prisma).
Background jobs: không có.
Testing: chưa có test tự động (chỉ verify thủ công qua browser + curl —
  xem verify.md). Nợ kỹ thuật cần bổ sung trước Increment 1.
Deployment: chưa triển khai — DEPLOYMENT.md cũ (multi-subdomain) đã lỗi
  thời, cần viết lại cho kiến trúc 1-app này (việc riêng, chưa làm ở
  Increment 0).
```

## Database Impact

```
Tables added: User, Account, Session, VerificationToken (chuẩn NextAuth
  Prisma adapter, có bổ sung User.passwordHash/role), PlatformModule.
Tables modified: (không — DB hoàn toàn mới, không có bảng cũ để sửa)
Columns: xem prisma/schema.prisma trong aios-platform.
Indexes: unique trên User.email, PlatformModule.code, PlatformModule.order.
Constraints: FK Account/Session → User (onDelete: Cascade).
Migration: 1 migration duy nhất `20260822135309_init`
  (prisma/migrations/20260822135309_init/migration.sql), tạo mới toàn bộ
  — không có dữ liệu cũ cần biến đổi.
Data backfill: seed.ts nạp 38 PlatformModule (quét repo) + 1 User admin
  demo — không phải backfill dữ liệu sản xuất thật (chưa có).
Backward compatibility: N/A (DB mới, không có consumer cũ nào phụ thuộc).
Rollback: `npx prisma migrate reset` (dev) hoặc xoá database
  aios_platform_dev — an toàn vì chưa có dữ liệu thật, chỉ seed demo.
```

## File Impact

```
CREATE:
  09_ENGINEERING/aios-platform/**  (toàn bộ app Next.js mới)
  09_ENGINEERING/07_DevOps/DEPLOYMENT.md, deploy/**  (từ phiên làm việc
    trước — kiến trúc multi-subdomain, NAY ĐÃ LỖI THỜI, xem ghi chú
    Spec Drift bên dưới)
  _meta/specs/20260822-aios-platform-increment0/**  (artifact này)

MODIFY:
  .claude/launch.json  (+ cấu hình dev server "aios-platform")
  09_ENGINEERING/README.md  (+ mục giới thiệu aios-platform, cảnh báo
    DEPLOYMENT.md lỗi thời)
  09_ENGINEERING/07_DevOps/README.md  (+ trỏ tới DEPLOYMENT.md)

DO NOT MODIFY:
  05_MODULE_LIBRARY/M10_DamBaoKQ/08_Source/**  (Increment 0 không đụng
    tới code M10 — chỉ đọc README/manifest lúc seed)
  05_MODULE_LIBRARY/M29_AI/08_Source/**  (tương tự)
  Bất kỳ manifest.yaml có doc_status: issued nào.
```

## Implementation Increments

```
P1  Scaffold Next.js + Tailwind + TypeScript tại 09_ENGINEERING/aios-platform
P2  Prisma schema (auth models + PlatformModule) + migrate dev (Postgres
    local) — xử lý phát sinh: Prisma 7 đổi cách cấu hình datasource
    (driver adapter bắt buộc, không còn `url` trong schema.prisma)
P3  NextAuth v5 (Credentials + PrismaAdapter) + type augmentation đúng
    module gốc (@auth/core/types, @auth/core/jwt — không phải
    "next-auth"/"next-auth/jwt" vì đó chỉ là re-export barrel)
P4  proxy.ts gate auth (Next.js 16 đổi middleware.ts → proxy.ts)
P5  seed.ts quét 05_MODULE_LIBRARY + 04_PROCESS_LIBRARY/*/manifest.yaml
P6  UI: layout (platform) + Sidebar 38 mục + dashboard + /modules/[code]
P7  Verify: build, lint, browser thật (login/logout/route-guard/2 loại
    module), validate_links.py
```

## Rollout / Rollback

```
Feature flag: không cần — app mới hoàn toàn độc lập (port riêng, DB
  riêng), không ảnh hưởng M10/M29/docs đang chạy. Không có rủi ro tới hạ
  tầng hiện có.
Migration order: N/A (chưa deploy production).
Deploy order: chưa áp dụng — Increment 0 chỉ chạy dev cục bộ.
Compatibility window: N/A.
Backfill: N/A.
Monitoring: chưa có (nợ kỹ thuật trước production).
Rollback: xoá thư mục 09_ENGINEERING/aios-platform + database
  aios_platform_dev — không chạm tới bất kỳ hệ thống nào khác, rollback
  100% an toàn và độc lập.
```

## Risk Analysis

| Rủi ro | Mức độ | Biện pháp giảm thiểu |
|---|---|---|
| DEPLOYMENT.md cũ (multi-subdomain) gây hiểu nhầm kiến trúc hiện tại | MEDIUM | Đã ghi cảnh báo rõ trong 09_ENGINEERING/README.md; cần việc riêng để viết lại — chưa làm ở Increment 0 |
| Chưa có test tự động — thay đổi sau này dễ hồi quy | MEDIUM | Bổ sung test trước khi bắt đầu Increment 1 (di trú rule engine M10/M29) |
| passwordHash/role tồn tại nhưng UI/route chưa gate theo role | HIGH (nếu deploy production nguyên trạng) | KHÔNG đưa app này ra production cho tới khi có RBAC thật ở UI, không chỉ ở DB |
| Tài khoản demo admin@manlab.vn có mật khẩu cố định trong seed.ts | HIGH nếu chạy seed trên production | Ghi rõ trong README "chỉ dev/demo, đổi/xoá trước khi triển khai thật"; không tự động chạy seed ở pipeline production |
| BR-02 (ACTIVE_MODULE_CODES) hardcode trong seed.ts, có thể lệch thực tế nếu module mới được xây mà quên cập nhật | LOW | Ghi rõ trong comment code; cân nhắc tự động hoá (đếm file 08_Source) ở Increment sau nếu thấy cần |

## BUILD PLAN

```
P1–P7 đã thực hiện tuần tự như trên trong cùng phiên làm việc, không có
Spec Drift so với OUTCOME/SPEC ban đầu (khung 38 module + DB/Prisma/auth
thật + build step thật) — chỉ phát sinh 2 điều chỉnh kỹ thuật do phiên
bản thư viện mới hơn kiến thức nền (Prisma 7 driver adapter, Next.js 16
proxy.ts) đã áp dụng đúng theo tài liệu chính thức, không đổi phạm vi
nghiệp vụ đã thống nhất với người dùng.
```
