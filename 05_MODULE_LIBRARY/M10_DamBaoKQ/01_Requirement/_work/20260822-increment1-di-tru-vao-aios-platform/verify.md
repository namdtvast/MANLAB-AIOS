# Verification Report — 20260822-increment1-di-tru-vao-aios-platform

Tier: **L** (đổi kiến trúc dữ liệu M10 từ file JSON sang Postgres, port rule
engine authoritative sang runtime mới). Increment 1 của lộ trình đã thống
nhất với người dùng (xem
[`_meta/specs/20260822-aios-platform-increment0/`](../../../../../_meta/specs/20260822-aios-platform-increment0/)).

## PHẠM VI — quan trọng, đọc trước khi dùng làm tham chiếu

Increment này port **1:1 hành vi của bản prototype hiện có**
(`05_MODULE_LIBRARY/M10_DamBaoKQ/08_Source/api/{model,rules,store}.mjs`),
**KHÔNG phải** hiện thực hoá toàn bộ đặc tả đầy đủ trong `DacTa.md` (09 loại
hồ sơ F10.01–F10.09, các trường `equipment_id[]`, `reference_standard_id[]`,
liên kết M03/M05/M08/M11 đầy đủ...). Đây là *di trú* một bản đã chạy, không
phải *hoàn thiện* module theo đặc tả gốc — khoảng cách giữa 2 việc này vẫn
còn nguyên, ghi nhận rõ để tránh hiểu lầm module đã "xong" theo `DacTa.md`.

## IMPLEMENTATION REPORT

```
Implemented:
- Schema Prisma: M10RecordType/M10Status/M10Result/M10PubStatus (enum),
  M10Assessment, M10AuditEntry, ModuleRoleAssignment (generic, dùng chung
  cho mọi module — role là String tự do theo vocabulary từng module, đã
  RECON xác nhận M10 (NTH/LDP/LDV/QLCL/QTHT) và M29 (AI_VIEWER/AI_OPERATOR/
  ...) dùng vocabulary khác nhau nên không dùng chung 1 enum).
- src/lib/m10/rules.ts — port 1:1 rules.mjs (R1–R8: validateForSubmit,
  canReview, canApprove, canPublish, requiresCapa, derivePubStatus,
  T.submit/review/approve/publish) — chỉ đổi STATUS/RESULT từ nhãn tiếng
  Việt (string) sang mã enum, KHÔNG đổi logic quyết định.
- src/lib/m10/actor.ts, actions.ts — port store.mjs (create/edit/transition/
  linkCapa/newVersion) sang Prisma + Server Actions.
- UI: /modules/M10 (danh sách), /modules/M10/new (tạo), /modules/M10/[id]
  (chi tiết + ActionPanel theo trạng thái).
- Seed: 5 tài khoản demo theo vai trò M10 (NTH/LDP/LDV/QLCL/QTHT) + 4 hồ sơ
  demo tương ứng dữ liệu trong model.mjs/seed() (mã hồ sơ sinh mới, KHÔNG
  giữ nguyên P10-2026-0039..0042 gốc — DB mới, không phải migrate dữ liệu
  sản xuất thật, xem plan.md Increment 0).

Changed files: prisma/schema.prisma (M10 models), prisma/seed.ts (+seedM10),
src/lib/m10/{rules,actor,actions,labels}.ts,
src/app/(platform)/modules/M10/{page,new/*,[id]/*}.tsx, src/lib/auth.ts
(session callback — xem "Spec Drift" bên dưới, bug phát hiện trong lúc verify).

Database changes: migration `20260822142603_m10_migration` — thêm bảng
mới, không sửa/xoá bảng đã có của Increment 0.

Specification drift:
1. [BUG PHÁT HIỆN + SỬA] `src/lib/auth.ts` session callback thiếu gán
   `session.user.id = token.sub` — mọi lookup theo `userId` (bao gồm
   `ModuleRoleAssignment`) âm thầm trả về "chưa gán vai trò"/"chưa đăng
   nhập" thay vì lỗi rõ ràng, vì Prisma coi `userId: undefined` là "bỏ qua
   điều kiện" chứ không throw. Đây là lỗi trong nền tảng auth của
   Increment 0, không phải của increment này, nhưng chỉ lộ ra khi có
   nghiệp vụ thật cần tra `userId` (Increment 0 chưa có nghiệp vụ nào cần).
2. Tách `getActor`/`getM10Role` ra module riêng `actor.ts` (không phải
   `"use server"`) — gọi trực tiếp một export "use server" trong lúc render
   Server Component đi qua RPC boundary không cần thiết, từng gây lỗi
   "Chưa đăng nhập" dù đã login. Server Actions thật (mutation, gọi từ
   Client Component) vẫn giữ nguyên trong actions.ts.
Cả hai đều là sửa lỗi phát hiện qua verify thật (không phải đoán), không
đổi phạm vi nghiệp vụ đã thống nhất.
```

## VERIFY

```
Build:
PASS
Evidence: `npx next build` — "✓ Compiled successfully", "Finished
  TypeScript", route map liệt kê đủ /modules/M10, /modules/M10/[id],
  /modules/M10/new.

Lint:
PASS
Evidence: `npx eslint .` — không output (0 lỗi).

Access control (role gate) — evidence chi tiết, đây là phần lõi của yêu
cầu "gate theo role":
PASS
Evidence (thao tác thật qua Browser + đối chiếu psql sau mỗi bước, DB
  aios_platform_dev):
  1. Đăng nhập ldp@manlab.vn, mở P10-2026-0001 (PENDING_REVIEW) → bấm
     "Soát xét đạt" → DB: status PENDING_REVIEW → PENDING_APPROVAL,
     reviewedById = user LDP. Đúng.
  2. Vẫn là LDP, bấm "Phê duyệt" trên chính hồ sơ đó (status giờ
     PENDING_APPROVAL) → server trả lỗi đúng rule R (SELF_REVIEW_FORBIDDEN):
     "Chỉ LĐV (không phải người tạo/soát xét) được phê duyệt." — DB KHÔNG
     đổi (đúng, phải chặn).
  3. Đăng nhập ldv@manlab.vn, bấm "Phê duyệt" → DB: status → APPROVED,
     approvedById = user LDV. Đúng.
  4. Vẫn LDV, bấm "Công bố" → DB: status → PUBLISHED, pubStatus=PASS,
     releaseAllowed=true. Đúng.
  5. Hồ sơ P10-2026-0003 (STABILITY, result=FAIL): submit (LDV) → review
     (LDP, đạt) → bấm "Phê duyệt" (LDV) khi CHƯA có capaId → server chặn
     đúng rule CAPA_REQUIRED: "Kết quả KHÔNG ĐẠT: bắt buộc liên kết
     KPH-CAPA trước khi phê duyệt." — DB status vẫn PENDING_APPROVAL
     (không đổi, đúng).
  6. Bấm "Liên kết KPH-CAPA" → DB: capaId = "CAPA-0003". Bấm "Phê duyệt"
     lại → DB: status → APPROVED, approvedById = LDV. Đúng — rule tự mở
     khoá sau khi điều kiện được thoả.

Audit trail:
PASS
Evidence: mỗi transition trên đều sinh đúng 1 dòng M10AuditEntry với
  actor/role/action/reason đúng — xác nhận qua UI "Nhật ký" hiển thị đủ
  timeline (vd hồ sơ 0001: "Tạo hồ sơ" → "Soát xét đạt → chờ phê duyệt
  (PENDING_REVIEW → PENDING_APPROVAL)" đúng actor Trần Thị Hoa (LĐP)).

Data integrity:
PASS
Evidence: seed idempotent (kiểm tra `existing > 0` trước khi tạo lại demo
  records), `psql` xác nhận đúng 4 hồ sơ demo + 5 user M10 sau seed.

Security:
PASS WITH NOTE
Evidence: mật khẩu demo dùng chung 1 password cho cả 5 tài khoản M10 —
  chấp nhận được cho dev/demo (đã ghi trong seed.ts/README), KHÔNG dùng
  cho production.

Regression:
PASS
Evidence: không sửa `05_MODULE_LIBRARY/M10_DamBaoKQ/08_Source/` (bản
  prototype cũ) — 2 hệ thống chạy song song độc lập, không ảnh hưởng
  lẫn nhau. `npx eslint .` + `npx next build` của aios-platform không có
  lỗi liên quan module khác (docs/, M29 chưa đụng tới).

MANLAB validate_links.py:
PASS
Evidence: chạy sau khi thêm thư mục _work này — xem lệnh cuối phiên làm
  việc.
```

## DIFF REVIEW

```
Expected files: đúng phạm vi nêu ở "Changed files" trên — toàn bộ trong
  09_ENGINEERING/aios-platform/ (mã) + thư mục _work này (artifact).
Unexpected files: không có.
Issues: không phát hiện.
```

## RESULT

```
PASS WITH WARNINGS
```

Lý do WARNINGS (không phải PASS thuần): (1) chưa có test tự động — verify
hoàn toàn thủ công qua thao tác Browser + đối chiếu DB trực tiếp; (2) chưa
đạt phạm vi đầy đủ của `DacTa.md` (mới port đúng bằng bản prototype cũ,
thiếu 09 loại hồ sơ, liên kết M03/M05/M08/M11 đầy đủ); (3) bản cũ
(`08_Source`) vẫn còn chạy song song, chưa deprecate — cần quyết định rõ
khi nào tắt hẳn bản cũ để tránh 2 nguồn dữ liệu M10 cùng tồn tại.
