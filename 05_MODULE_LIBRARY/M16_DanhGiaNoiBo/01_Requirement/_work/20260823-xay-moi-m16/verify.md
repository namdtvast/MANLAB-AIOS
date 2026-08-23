# M16_DanhGiaNoiBo — Báo cáo VERIFY (Increment 8)

## Build

- `npx tsc --noEmit` → **PASS**.
- `npx eslint src --max-warnings=0` → **PASS**.
- `npx prisma migrate dev --name m16_danh_gia_noi_bo` → **PASS**, migration
  `20260823053013_m16_danh_gia_noi_bo` áp dụng thành công, additive.
- `npx tsx prisma/seed.ts` → **PASS**, nạp 2 kế hoạch + 1 chương trình + 2 phát hiện + 1 báo cáo
  demo + vai trò M16 cho 4 tài khoản (3 tái sử dụng + 1 tài khoản mới `truongdoan@manlab.vn`).

## Sự cố gặp phải + cách xử lý

- **Prisma Client cũ trên dev server đang chạy sẵn**: xử lý bằng `preview_stop` + `preview_start`
  (lặp lại đúng sự cố đã gặp ở M01/M02/M03/M04).
- **Trang điều hướng về "/" giữa lúc `get_page_text` và bước click kế tiếp** (lặp lại đúng sự cố
  đã gặp ở M04): khắc phục bằng cách `navigate` lại URL trang chi tiết ngay trước mỗi lần click,
  không dựa vào state trang đã đọc ở bước trước.
- **Dữ liệu test tự nhập bị lệch trường** khi điền form "Lập chương trình" qua JS (input order
  không khớp giả định) — không phải lỗi ứng dụng, chỉ ảnh hưởng dữ liệu demo của bản ghi
  `CTDG-2026-0002` (tên hiển thị "An toàn thông tin" ở vị trí department), không ảnh hưởng đánh
  giá đúng đắn của gate đang test (gate ngày đánh giá).

## VERIFY qua Browser — bằng chứng thật (không suy luận)

Đăng nhập lần lượt QLCL (`nth@manlab.vn`), LĐP (`ldp@manlab.vn`), LĐV (`ldv@manlab.vn`), Trưởng
đoàn (`truongdoan@manlab.vn`, cùng mật khẩu `DoiMatKhauNgay!2026`), thao tác qua UI thật.

### 1. Gate duyệt `AuditPlan` 2 cấp (mirror M10) — PASS đầy đủ cả 2 bước

Kế hoạch `KHDG-2026-0002` (`Chờ xem xét`) — QLCL (người tạo) bấm "Xem xét đạt" → bị chặn: *"Chỉ
LĐP (không phải người tạo) được xem xét kế hoạch."* Đăng nhập LĐP, xem xét đạt → chuyển
`Chờ phê duyệt`. LĐP thử tự phê duyệt luôn → bị chặn: *"Chỉ LĐV được phê duyệt kế hoạch đánh
giá."* Đăng nhập LĐV, phê duyệt → `Đã phê duyệt`, form "Lập chương trình đánh giá" xuất hiện đúng
lúc (chỉ khi `status=APPROVED`).

### 2. Gate thời hạn thông báo `AuditProgram` (quy tắc 2 ETV.P16) — PASS

Lập chương trình mới với `auditDate` cách hiện tại 3 ngày → bấm "Xác nhận chương trình" → bị
chặn: *"Ngày đánh giá chỉ còn 3 ngày — bắt buộc thông báo bộ phận liên quan ít nhất 1 tuần trước
(quy tắc 2 ETV.P16)."*

### 3. Gate vai trò tạo `AuditReport` — chỉ Trưởng đoàn (quy tắc 3 DacTa) — PASS

Trên chương trình `CTDG-2026-0001` (đã `CONFIRMED`, có sẵn dữ liệu seed), LĐV thử đệ trình báo
cáo → bị chặn: *"Chỉ Trưởng đoàn đánh giá được tạo báo cáo tổng hợp."*

### 4. Báo cáo trễ hạn — cảnh báo, KHÔNG chặn (quy tắc 4 DacTa "trễ hạn cần cảnh báo") — PASS

Đăng nhập Trưởng đoàn, đệ trình báo cáo mới với `closingMeetingDate` cách đây 10 ngày (> 7 ngày)
→ **tạo thành công** (không bị chặn, đúng thiết kế), hiển thị badge đỏ "Trễ hạn" ngay trên danh
sách báo cáo, nhật ký ghi rõ "— TRỄ HẠN".

### 5. Dữ liệu seed hiển thị đúng — PASS

`CTDG-2026-0001` hiển thị đủ 2 phát hiện (1 Phù hợp, 1 Không phù hợp kèm `capaRef` tham chiếu tự
do → M13) và 1 báo cáo đúng hạn (`BCDG-2026-0001`, không có badge trễ hạn).

## Regression

```
$ python3 _meta/validate_links.py
Đã kiểm tra 377 link · 38 MP · 38 M · 22 CAP. Vấn đề: 0
```
PASS.

## Điều CHƯA verify (báo cáo rõ, không quy tròn thành "hoàn tất")

- **Không test qua UI** luồng "Trả lại" (LĐP return) và "Từ chối" (LĐV reject) kế hoạch — chỉ
  test nhánh "đạt" của cả 2 bước duyệt.
- **Không test** ghi phát hiện qua UI với vai trò DANHGIAVIEN riêng biệt (chỉ test qua QLCL trong
  dữ liệu seed và Trưởng đoàn — `canCreateFinding` cho phép cả 2, nhưng chưa demo case bị chặn
  cho vai trò khác, vd LĐV thử ghi phát hiện).
- 2 "Quyết định phạm vi" trong spec.md (mô hình 2 bước duyệt tường minh dù DacTa viết gọn; chỉ
  gate cứng mốc 7 ngày, mốc 2 tuần chỉ cảnh báo mềm chưa cài) — **chưa được LĐP xác nhận chính
  thức**.
- Validate năng lực đánh giá viên (quy tắc 1 — liên kết đào tạo thật từ M03), thông báo khách
  hàng + thu hồi kết quả M11 (quy tắc 5), thẩm tra CAPA qua M13 (quy tắc 6–7) — ngoài phạm vi
  increment này, đã ghi rõ trong spec.md.

## Kết luận

Đủ bằng chứng thật cho 3 gate nghiệp vụ chính: duyệt kế hoạch 2 cấp (LĐP xem xét → LĐV phê
duyệt, cả 2 self-forbidden đều verify), gate thời hạn thông báo chương trình (7 ngày), gate vai
trò tạo báo cáo (chỉ Trưởng đoàn) — cùng với hành vi "cảnh báo không chặn" cho báo cáo trễ hạn,
đúng tinh thần DacTa phân biệt "bắt buộc" (chặn) và "cần cảnh báo" (không chặn). Tier M — không
thuộc Tier L.
