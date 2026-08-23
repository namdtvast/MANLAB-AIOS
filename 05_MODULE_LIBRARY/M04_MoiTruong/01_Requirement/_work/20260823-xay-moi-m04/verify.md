# M04_MoiTruong — Báo cáo VERIFY (Increment 7)

## Build

- `npx tsc --noEmit` → **PASS**.
- `npx eslint src --max-warnings=0` → **PASS**.
- `npx prisma migrate dev --name m04_moi_truong` → **PASS**, migration
  `20260823051118_m04_moi_truong` áp dụng thành công, additive.
- `npx tsx prisma/seed.ts` → **PASS**, nạp 4 khu vực + 2 nhật ký điều kiện + 2 kế hoạch hiện
  trường demo + vai trò M04 cho 3 tài khoản (tái sử dụng toàn bộ từ M01/M02/M03).

## Sự cố gặp phải + cách xử lý

- **Prisma Client cũ trên dev server đang chạy sẵn** (lặp lại đúng sự cố đã gặp ở M01/M02/M03):
  xử lý bằng `preview_stop` + `preview_start`.
- **`form_input` trên `<select>` gây điều hướng nhầm về trang chủ**: gọi `form_input` liên tiếp
  trên combobox loại nhật ký rồi combobox khu vực khiến ref map bị invalid giữa 2 lần gọi (lỗi
  "ref map not initialized"), và lần gọi kế tiếp vô tình resolve sang phần tử khác trên trang,
  điều hướng tab về `/`. Khắc phục bằng gọi `.value` set qua `javascript_tool` (native setter +
  dispatch `change` event) thay vì `form_input` liên tiếp trên nhiều `<select>` cùng lúc.

## VERIFY qua Browser — bằng chứng thật (không suy luận)

Đăng nhập lần lượt NV (`nth@manlab.vn`), TP (`ldp@manlab.vn`), LĐV (`ldv@manlab.vn`, cùng mật
khẩu `DoiMatKhauNgay!2026`), thao tác qua UI thật.

### 1. Gate `M04ConditionLog` — vượt ngưỡng bắt buộc biện pháp xử lý (quy tắc 2 ETV.P04) — PASS

Chọn khu vực "Phòng đo áp suất" (ngưỡng 18–22°C), nhập 30°C/50% (vượt ngưỡng) — UI hiện cảnh báo
client-side "Vượt ngưỡng cho phép — bắt buộc nhập biện pháp xử lý." Bấm "Ghi nhận" **không điền**
biện pháp xử lý → bị chặn ở server: *"Vượt ngưỡng cho phép — bắt buộc ghi biện pháp xử lý (quy
tắc 2 ETV.P04)."* Điền biện pháp xử lý → ghi nhận thành công (`DK-2026-0003`, badge "Vượt
ngưỡng").

### 2. Gate `M04FieldWorkPlan` mức Rủi ro cao (quy tắc 5 ETV.P04) — PASS

Kế hoạch `HT-2026-0002` (mức Rủi ro cao, `Chờ duyệt`) — TP bấm "Phê duyệt" → bị chặn: *"Kế hoạch
mức Rủi ro cao — chỉ LĐV được phê duyệt (quy tắc 5 ETV.P04)."* Đăng nhập LĐV, bấm "Phê duyệt" →
thành công, chuyển `Đã duyệt`, `approvedBy` ghi đúng LĐV (không phải TP).

### 3. Đánh dấu đã phổ biến — PASS

Sau khi `HT-2026-0002` đã duyệt, bấm "Đánh dấu đã phổ biến cho nhân sự" → `briefed=true`,
`briefedAt` ghi đúng thời điểm, nhật ký ghi rõ hành động (không đổi `status`, đúng thiết kế).

### 4. Kế hoạch mức Thường (seed `HT-2026-0001`) — xác nhận qua danh sách, không thao tác thêm

Đã seed sẵn ở `Đã duyệt` bởi TP (không cần LĐV) — xác nhận đúng logic `canApprovePlan` (mức
Thường: TP hoặc LĐV đều duyệt được) qua dữ liệu ban đầu, chưa test click trực tiếp (xem mục "Chưa
verify").

### 5. Danh sách M04 hiển thị đúng — PASS

`/modules/M04` hiển thị đủ 2 khối (Nhật ký điều kiện, Kế hoạch hiện trường), badge "Đạt"/"Vượt
ngưỡng" đúng màu, badge mức rủi ro/trạng thái đúng.

## Regression

```
$ python3 _meta/validate_links.py
Đã kiểm tra 377 link · 38 MP · 38 M · 22 CAP. Vấn đề: 0
```
PASS.

## Điều CHƯA verify (báo cáo rõ, không quy tròn thành "hoàn tất")

- **Không test qua UI** nhánh TP tự duyệt kế hoạch mức Thường (chỉ xác nhận qua dữ liệu seed sẵn
  đã ở trạng thái Đã duyệt bởi TP, chưa click "Phê duyệt" trực tiếp cho case này).
- **Không test** luồng "Từ chối" (`reject`) kế hoạch hiện trường qua UI.
- **Không test** ghi log loại `CHEMICAL_CABINET`/`EQUIPMENT_CABINET` qua UI (chỉ có sẵn trong dữ
  liệu seed, chưa tạo mới qua form cho 2 loại này — chỉ tạo mới loại `ENVIRONMENT`).
- 2 "Quyết định phạm vi" trong spec.md (gộp 3 loại log thành 1 model `M04ConditionLog`; bảng
  `M04AreaSpec` chỉ seed 4 khu vực mẫu minh họa, không phải danh mục đầy đủ Phụ lục II thật) —
  **chưa được LĐP xác nhận chính thức**.
- Liên kết thông số môi trường vào biên bản đo lường M10/M11 (quy tắc 3 DacTa) — ngoài phạm vi
  increment này, đã ghi rõ trong spec.md.

## Kết luận

Đủ bằng chứng thật cho 2 gate nghiệp vụ chính: `M04ConditionLog` (bắt buộc biện pháp xử lý khi
vượt ngưỡng, tính `withinSpec` hoàn toàn ở server) và `M04FieldWorkPlan` (gate cấp phê duyệt theo
mức rủi ro — LĐV-only khi Rủi ro cao). Tier M — không thuộc Tier L.
