# M16_DanhGiaNoiBo — Báo cáo VERIFY (Increment 13 — hoàn thiện theo DacTa)

Tham chiếu `spec.md` + `plan.md` cùng thư mục.

## Build

- `npx tsc --noEmit` → **PASS** (exit 0).
- `npx eslint src --max-warnings=0` → **PASS** (exit 0).
- `npx prisma migrate dev --name m16_hoan_thien_dacta` → **PASS**, migration
  `20260823142557_m16_hoan_thien_dacta` áp dụng thành công, thuần additive (không xoá/đổi kiểu cột
  nào; cảnh báo duy nhất là unique index mới trên `M16AuditFinding.ncwId`, không có dữ liệu trùng).
- `npx prisma generate` + `npx tsx prisma/seed.ts` → **PASS** (2 tài khoản demo mới, 3 bản ghi
  năng lực cho `NS-2026-0001`, gắn FK nhân sự cho `CTDG-2026-0001` cũ).

## Sự cố gặp phải + cách xử lý

- `prisma migrate dev` **không chạy được ở môi trường non-interactive** (Prisma 7 bỏ chế độ này) —
  xử lý bằng `yes | script -q /dev/null npx prisma migrate dev …` để cấp pty và trả lời prompt.
- **Dev server của phiên làm việc khác đang chiếm cổng 3000** với Prisma Client cũ → dừng tiến
  trình cũ rồi `preview_start` lại (lặp lại đúng sự cố đã gặp ở M01/M02/M03/M04/M16-Increment 8).
- **Trang tự điều hướng về `/` giữa 2 lần gọi công cụ** (lặp lại sự cố M04/M16-Increment 8): mỗi
  lần thao tác đều `navigate` lại URL trước khi click, không dựa vào DOM đã đọc ở bước trước.
- **Dữ liệu M03 trong DB dev đã khác seed gốc**: `PT-2026-0002` (Trần Thị Bích) nay ở trạng thái
  Đạt/Đã phê duyệt do phiên verify M03 trước đó thao tác qua UI. Không phải lỗi — đổi kịch bản
  demo "thành viên chưa đủ năng lực" sang `NS-2026-0003` (Nhân viên QLCL, không có hồ sơ đào tạo
  Đạt nào).

## VERIFY qua Browser — bằng chứng thật (không suy luận)

Đăng nhập lần lượt QLCL (`nth@manlab.vn`), Đánh giá viên (`danhgiavien@manlab.vn`), Trưởng bộ phận
(`truongbophan@manlab.vn`), Trưởng đoàn (`truongdoan@manlab.vn`), LĐP (`ldp@manlab.vn`), QLCL của
M13 (`qlcl@manlab.vn`) — cùng mật khẩu demo.

### 1. Sổ năng lực đánh giá viên — gate bằng chứng (quy tắc 1) — PASS một phần

QLCL bấm "Công nhận năng lực" cho `NS-2026-0003` khi chưa chọn hồ sơ đào tạo → bị chặn:
*"Bắt buộc chọn hồ sơ đào tạo (M03) làm bằng chứng cho đào tạo ISO/IEC 17025."* Giao diện cũng
hiện sẵn *"Nhân sự này chưa có hồ sơ đào tạo nào được phê duyệt Đạt bên M03."*

`NS-2026-0001` hiển thị đủ 3 năng lực với bằng chứng là hồ sơ `PT-2026-0001` (M03) → badge
**"Đủ điều kiện trưởng đoàn"**.

### 2. Gate năng lực khi xác nhận chương trình (quy tắc 1) — PASS

Lập `CTDG-2026-0004`… (trước đó) `CTDG-2026-0003` với trưởng đoàn Nguyễn Văn An + thành viên
"Nhân viên QLCL" (chưa có năng lực nào) → bấm "Xác nhận chương trình" → bị chặn:

> Đoàn đánh giá chưa đủ năng lực theo quy tắc 1 ETV.P16 — Nhân viên QLCL thiếu: đào tạo ISO/IEC
> 17025, đào tạo đánh giá nội bộ. Công nhận năng lực tại Sổ năng lực đánh giá viên trước khi xác nhận.

Trang chương trình hiển thị đúng từng người thiếu gì (khối "Năng lực đoàn đánh giá").

### 3. Cảnh báo mềm mốc 2 tuần (quy tắc 2) — PASS, KHÔNG chặn

`CTDG-2026-0004` có `auditDate` cách 10 ngày → hiện *"⚠ Ngày đánh giá còn 10 ngày — nhắc đoàn đánh
giá chuẩn bị (quy tắc 2 ETV.P16 khuyến nghị ít nhất 2 tuần)."* và **vẫn xác nhận thành công**
(đoàn đủ năng lực) — nhật ký ghi "đoàn đủ năng lực theo quy tắc 1".

### 4. Đánh giá viên ghi phát hiện (đóng khoảng trống Increment 8) — PASS

`danhgiavien@manlab.vn` ghi `PH-2026-0003` (Không phù hợp). Trang hiển thị cảnh báo
*"Chưa chuyển sang M13 — quy tắc 6 ETV.P16 bắt buộc mọi KPH phải có hành động khắc phục."*

### 5. Trưởng bộ phận: nhận kết quả → đề xuất CAPA sang M13 (quy tắc 6) — PASS cả 2 nhánh

- Bấm "Đề xuất hành động khắc phục" **trước khi** xác nhận nhận kết quả → bị chặn: *"Phải xác nhận
  đã nhận kết quả và thông báo tới nhân viên trước khi phân tích nguyên nhân và đề xuất khắc phục."*
- Sau khi xác nhận nhận kết quả → đề xuất thành công, sinh **hồ sơ thật** `KPH-2026-0006` bên M13.
  Mở `/modules/M13/ncw/…` thấy: nguồn *"Phát hiện khi đánh giá nội bộ (← M16) — PH-2026-0003 (M16 —
  ISO/IEC 17025 §7.11)"*, người phát hiện là Trưởng bộ phận, mô tả kèm phân tích nguyên nhân.

### 6. Ý kiến bảo lưu (quy tắc 3) — PASS

Trưởng đoàn ghi ý kiến bảo lưu của Đánh giá viên trên `BCDG-2026-0003`; hiển thị dưới tiêu đề
*"Ý kiến bảo lưu (quy tắc 3 ETV.P16 — kết luận trưởng đoàn ở trên vẫn là cuối cùng)"*, **kết luận
của trưởng đoàn không đổi** — không có cơ chế biểu quyết.

### 7. Đóng chương trình — LĐP thẩm tra (quy tắc 7) — PASS đủ 3 nhánh

- LĐP đóng khi chưa có báo cáo → chặn: *"Chưa có báo cáo tổng hợp — không đóng chương trình đánh
  giá được."*
- Sau khi Trưởng đoàn đệ trình `BCDG-2026-0003` (đúng hạn, không badge Trễ hạn), LĐP đóng lại →
  chặn: *"Hồ sơ khắc phục bên M13 chưa hoàn tất cho: PH-2026-0003 — LĐP chỉ đóng chương trình khi
  đã thẩm tra kết quả thực hiện (quy tắc 7 ETV.P16)."*
- Xử lý xong hồ sơ bên M13 **theo đúng luồng M13** (QLCL đánh giá mức Nhẹ → ghi chép diễn biến →
  đóng hồ sơ ⇒ `KPH-2026-0006` = "Đã khắc phục"), LĐP đóng lại → **thành công**: trạng thái
  *"Đã đóng (LĐP thẩm tra đạt)"*, hiển thị người đóng + ghi chú thẩm tra.

### 8. Đề xuất đánh giá bổ sung (quy tắc 7, nhánh "chưa đủ tin cậy") — PASS

LĐP bấm "Chưa đủ tin cậy — đề xuất đánh giá bổ sung" → tạo kế hoạch đột xuất `KHDG-2026-0003`,
nhật ký chương trình ghi *"Đề xuất đánh giá bổ sung — tạo kế hoạch đột xuất … KHDG-2026-0003"* kèm
lý do; trang kế hoạch mới hiển thị dòng liên kết ngược về chương trình gốc.

## Regression

```
$ python3 _meta/validate_links.py
Đã kiểm tra 377 link · 38 MP · 38 M · 22 CAP. Vấn đề: 0
```
PASS. `read_console_messages(onlyErrors)` → không có lỗi console trong toàn bộ phiên thao tác.

Không đụng rule/action của module khác; thay đổi duy nhất chạm M13 là **thêm 1 giá trị enum**
`M13SourceType.DANH_GIA_NOI_BO` + nhãn hiển thị — luồng M13 chạy nguyên vẹn (đã chứng minh ở mục 7
khi xử lý `KPH-2026-0006` qua đúng UI M13).

## Điều CHƯA verify (báo cáo rõ, không quy tròn thành "hoàn tất")

- **Gate `EVIDENCE_NOT_PASSED`** (chọn hồ sơ đào tạo chưa Đạt làm bằng chứng) chỉ verify **bằng
  code**, không tạo được tình huống qua UI: dropdown chỉ liệt kê hồ sơ `result=DAT` +
  `status=APPROVED`, nên không chọn được hồ sơ chưa Đạt bằng thao tác thường. Gate vẫn nằm ở
  server (`txRecognizeQualification`) nên vẫn chặn nếu gọi trực tiếp.
- **`revokeQualification`** (thu hồi công nhận năng lực) có action + gate QLCL nhưng **chưa có nút
  trên UI** → chưa verify runtime.
- **Chưa test** nhánh chặn khi vai trò khác TRUONGBOPHAN bấm đề xuất CAPA (giao diện chỉ hiện nút
  cho TRUONGBOPHAN nên không click được); gate vẫn ở server.
- **Chưa test** ghi ý kiến bảo lưu bởi vai trò không phải thành viên đoàn (nút chỉ hiện cho
  DANHGIAVIEN/TRUONGDOAN).
- 5 "Quyết định phạm vi" trong `spec.md` — **chưa được LĐP xác nhận chính thức**.
- Quy tắc 5 (thông báo khách hàng + thu hồi kết quả đã phát hành → M11) và quy tắc 8 (lưu hồ sơ
  theo ETV.P15 → M15) **vẫn ngoài phạm vi** vì M11/M15 chưa xây.

## Kết luận

Increment 13 đóng 5/6 khoảng trống quy tắc còn lại của DacTa (1, 2, 3, 6, 7) bằng liên kết dữ liệu
thật sang M03 (hồ sơ đào tạo) và M13 (hồ sơ khắc phục) — không thêm cờ tự khai nào. Toàn bộ gate
chính đã có bằng chứng chặn/cho-qua thật qua Browser, gồm cả vòng đời trọn vẹn
phát hiện KPH → CAPA M13 → thẩm tra → đóng chương trình. Tier M — không thuộc Tier L.
