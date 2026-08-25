# M17_XemXetLanhDao — Báo cáo VERIFY (Increment 9)

## Build

- `npx tsc --noEmit` → **PASS**.
- `npx eslint src --max-warnings=0` → **PASS**.
- `npx prisma migrate dev --name m17_xem_xet_lanh_dao` → **PASS**, migration
  `20260823054607_m17_xem_xet_lanh_dao` áp dụng thành công, additive.
- `npx tsx prisma/seed.ts` → **PASS**, nạp 2 chương trình + 1 biên bản + 2 hành động + 1 phiếu
  CAPA demo + vai trò M17 cho 3 tài khoản (tái sử dụng toàn bộ từ M01–M04/M16, không tạo mới).

## Sự cố gặp phải + cách xử lý

- **Prisma Client cũ trên dev server đang chạy sẵn**: xử lý bằng `preview_stop` + `preview_start`
  (lặp lại đúng sự cố đã gặp ở các increment trước).
- **Trang điều hướng về "/" giữa lúc thao tác** (lặp lại đúng sự cố đã gặp ở M04/M16): khắc phục
  bằng `navigate` lại URL ngay trước mỗi lần click quan trọng.
- **Prisma `Json` field type lỗi TS** khi truyền `TopicResult[]` trực tiếp — sửa bằng ép kiểu
  `as unknown as object` (không phải lỗi logic, chỉ là giới hạn kiểu TypeScript của Prisma Client
  cho cột `Json`).

## VERIFY qua Browser — bằng chứng thật (không suy luận)

Đăng nhập lần lượt TP (`ldp@manlab.vn`), LĐV (`ldv@manlab.vn`, cùng mật khẩu
tài khoản demo), thao tác qua UI thật.

### 1. Gate đồng phê duyệt `ReviewPlan` (quy tắc 2 ETV.P17) — PASS, đúng cả 2 chiều

Chương trình seed `CTXX-2026-0002` đã có TP duyệt (nút "TP duyệt" disabled đúng ở client). Đăng
nhập LĐV, bấm "LĐV duyệt" → chuyển ngay `Đã duyệt` (không cần bước trung gian, đúng thiết kế "đủ
cả 2 thì tự động APPROVED" bất kể thứ tự). Xác nhận qua nhật ký: *"LĐV phê duyệt (PENDING_APPROVAL
→ APPROVED)"*.

### 2. Gate đủ 12 nội dung `ReviewMinutes` (quy tắc 4 ETV.P17) — PASS

Lập biên bản cho `CTXX-2026-0002` với checkbox "Demo gate — bỏ trống nội dung số 10" được tick →
bị chặn: *"Bắt buộc đủ 12 nội dung theo ISO/IEC 17025 §8.9 — hiện có 11/12 (quy tắc 4 ETV.P17)."*
Bỏ tick, lập lại → thành công (`BBXX-2026-0002`), hiển thị đủ 12 dòng nội dung.

### 3. Gate chỉ LĐV ghi kết luận (quy tắc 5 ETV.P17) — PASS (nhánh thành công)

Đăng nhập LĐV, ghi kết luận cho `BBXX-2026-0002` → thành công, `conclusion` hiển thị đúng ngay.
(Chưa test nhánh chặn với vai trò khác — xem mục "Chưa verify".)

### 4. "Quá hạn" derived, không lưu DB — PASS

Biên bản seed `BBXX-2026-0001` có `HDXX-2026-0001` (dueDate đã qua, status vẫn `DANG_THUC_HIEN`
trong DB) → hiển thị đúng badge đỏ "Quá hạn" tính lúc đọc; `HDXX-2026-0002` (status
`HOAN_THANH`) → hiển thị "Hoàn thành" đúng, không bị tính nhầm quá hạn dù đã set `dueDate`
tương lai.

### 5. Cross-module: cảnh báo mềm dựa trên dữ liệu M16 thật (quy tắc 1 ETV.P17) — PASS

Trang `/modules/M17/plan/new` **không hiển thị** cảnh báo "chưa có đánh giá năm nay" — vì M16 đã
seed sẵn `M16AuditReport` cho năm hiện tại (Increment 8) — xác nhận `hasCompletedAuditThisYear()`
query thật vào bảng `M16AuditReport`/`M16AuditProgram`/`M16AuditPlan` hoạt động đúng (không phải
giả lập/hardcode).

## Regression

```
$ python3 _meta/validate_links.py
Đã kiểm tra 377 link · 38 MP · 38 M · 22 CAP. Vấn đề: 0
```
PASS.

## Điều CHƯA verify (báo cáo rõ, không quy tròn thành "hoàn tất")

- **Không test qua UI** nhánh chặn của gate "chỉ LĐV ghi kết luận" (vd QLCL/TP thử ghi kết luận bị
  chặn) — chỉ test nhánh thành công vì UI ẩn form khi đã có `conclusion`, và biên bản dùng để test
  vốn chưa có kết luận nên chỉ còn 1 lượt thử.
- **Không test** gate `ALREADY_APPROVED` qua UI thật (TP/LĐV duyệt 2 lần) — nút đã disable đúng ở
  client nên không click lại được để kích hoạt request thứ 2; gate server đã viết nhưng chưa demo
  runtime.
- **Không test** trường hợp cảnh báo mềm **hiển thị** (chưa có đánh giá M16 năm đó) — chỉ xác
  nhận trường hợp không hiển thị (đã có đánh giá). Muốn test nhánh hiển thị cần seed lại với năm
  chưa có `M16AuditReport`, không thực hiện trong Increment này để tránh phá dữ liệu demo M16 đã
  chốt.
- 1 "Quyết định phạm vi" trong spec.md ("Quá hạn" derived không lưu DB, mirror M04/M20) — **chưa
  được LĐP xác nhận chính thức**.
- `CorrectiveActionRequest` chưa có FK thật tới M13 (M13 chưa xây) — chỉ bản ghi tối giản, đã ghi
  rõ trong spec.md.

## Kết luận

Đủ bằng chứng thật cho gate mới nhất chưa từng dùng ở increment trước — **đồng phê duyệt**
(co-approval, TP + LĐV độc lập, không phân cấp) — hoạt động đúng bất kể thứ tự duyệt; gate đủ 12
nội dung chặn đúng; và lần đầu tiên xác nhận 1 module xây mới **đọc dữ liệu thật** từ module khác
đã xây trước đó trong cùng nền tảng (M17 → M16). Tier M — không thuộc Tier L.
