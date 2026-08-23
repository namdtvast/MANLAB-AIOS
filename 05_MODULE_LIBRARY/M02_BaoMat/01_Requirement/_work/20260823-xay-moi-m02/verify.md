# M02_BaoMat — Báo cáo VERIFY (Increment 6)

## Build

- `npx tsc --noEmit` → **PASS**.
- `npx eslint src --max-warnings=0` → **PASS**.
- `npx prisma migrate dev --name m02_bao_mat` → **PASS**, migration `20260823044746_m02_bao_mat`
  áp dụng thành công, additive (không sửa bảng M01/M03/M10/M21/M29/PlatformModule hiện có — chỉ
  thêm 1 quan hệ ngược `M03Employee.m02Commitments`, không đổi field/logic M03).
- `npx tsx prisma/seed.ts` → **PASS**, nạp 2 cam kết + 1 sổ khách + 1 hồ sơ công bố + 1 sự cố demo
  + vai trò M02 cho 3 tài khoản (tái sử dụng toàn bộ từ M01/M03, không tạo tài khoản mới).

## Sự cố gặp phải + cách xử lý

- **Prisma Client cũ trên dev server đang chạy sẵn** (lặp lại đúng sự cố đã gặp ở M01/M03): xử lý
  bằng `preview_stop` + `preview_start`.
- **`form_input` với checkbox không kích hoạt đúng React state** — tick checkbox "Đã thông báo
  khách hàng" qua `form_input` (set `value: "true"`) không phản ánh đúng vào state React (kết quả
  hiển thị vẫn "Không" sau khi submit) — khắc phục bằng gọi `.click()` trực tiếp qua
  `javascript_tool` (đọc `checkbox.checked` sau click để xác nhận đúng trước khi submit).

## VERIFY qua Browser — bằng chứng thật (không suy luận)

Đăng nhập TP (`ldp@manlab.vn`, mật khẩu `DoiMatKhauNgay!2026` — vai trò trung tâm của module này
theo bảng gate spec.md), thao tác qua UI thật.

### 1. FK thật với M03Employee (thay cho `securityCommitmentRef` tự do) — PASS

Mở `CK-2026-0001` (cam kết loại Nhân viên, seed liên kết `NS-2026-0002`) → trường "Nhân sự liên
kết (M03)" hiển thị đúng `NS-2026-0002 — Trần Thị Bích` — xác nhận quan hệ Prisma thật hoạt động,
không phải chuỗi tự do.

### 2. Gate DisclosureApproval — quy tắc 5 ETV.P02 — PASS

Hồ sơ `CB-2026-0001` (seed, `customerNotified=false`, `legallyProhibitedNotify=false`) — TP bấm
"Phê duyệt công bố" → bị chặn: *"Bắt buộc đã thông báo khách hàng trước khi công bố, trừ khi
pháp luật cấm thông báo (quy tắc 5 ETV.P02)."* Tạo hồ sơ mới `CB-2026-0003` với
`customerNotified=true` → TP duyệt thành công → `Đã duyệt`, `approvedBy` ghi đúng.

### 3. Gate thẩm quyền phê duyệt (TP vs LĐV) — PASS

Tạo hồ sơ `CB-2026-0004` với `authorityLevel=LDV` + `legallyProhibitedNotify=true` (đủ điều kiện
thông báo) — TP (sai thẩm quyền) bấm "Phê duyệt công bố" → bị chặn: *"Chỉ LĐV (đúng thẩm quyền đã
chọn) được duyệt công bố này."* (chưa đăng nhập LĐV để test nhánh thành công — xem mục "Chưa
verify").

### 4. Gate SecurityIncident — quy tắc 8 ETV.P02 — PASS, cả 2 bước

Tạo sự cố mới `SC-2026-0002` (`Đã phát hiện`) → bấm "Ghi nhận đánh giá" khi chưa điền đánh giá →
bị chặn: *"Bắt buộc đánh giá phạm vi/hậu quả trước khi chuyển bước."* Với sự cố seed `SC-2026-0001`
(đã ở `Đã đánh giá`) → bấm "Đóng hồ sơ sự cố" khi chưa điền biện pháp khắc phục → bị chặn: *"Không
được đóng hồ sơ khi thiếu biện pháp khắc phục (quy tắc 8 ETV.P02)."* Điền biện pháp khắc phục →
đóng thành công → `Đã đóng`, nhật ký ghi đủ 3 bước (phát hiện/đánh giá/đóng).

### 5. Thu hồi cam kết bảo mật — PASS

`CK-2026-0001` (`Hiệu lực`) → TP bấm "Thu hồi cam kết" → chuyển `Đã thu hồi`, `revokedBy` ghi
đúng người thực hiện, nhật ký ghi đủ.

### 6. Danh sách M02 hiển thị đúng — PASS

`/modules/M02` hiển thị đủ 4 khối (Cam kết/Sổ khách/Công bố/Sự cố), badge trạng thái đúng màu,
sổ khách hiển thị đúng giờ vào/ra.

## Regression

```
$ python3 _meta/validate_links.py
Đã kiểm tra 377 link · 38 MP · 38 M · 22 CAP. Vấn đề: 0
```
PASS.

## Điều CHƯA verify (báo cáo rõ, không quy tròn thành "hoàn tất")

- **Không test** LĐV đăng nhập duyệt hồ sơ `authorityLevel=LDV` (nhánh thành công) — chỉ xác nhận
  nhánh chặn khi sai vai trò (TP thử duyệt hồ sơ cần LĐV).
- **Không test qua UI** gate `VisitorLog` (bắt buộc `commitmentId` hợp lệ loại KHÁCH còn hiệu
  lực) — UI dropdown chỉ liệt kê cam kết hợp lệ (`listActiveCommitments("KHACH")`) nên không tự
  nhiên tạo được tình huống lỗi qua thao tác thông thường; gate `validateVisitorCommitment` trong
  `rules.ts` bảo vệ khỏi việc gọi action trực tiếp với `commitmentId` sai (không phải KHÁCH, đã
  thu hồi, hoặc không tồn tại) — xác nhận qua đọc code, chưa demo runtime.
- **Không có form sửa `customerNotified`/`legallyProhibitedNotify` sau khi tạo** — phát hiện khi
  test mục 2 (phải tạo hồ sơ mới thay vì sửa hồ sơ seed) — không phải lỗi gate, chỉ là giới hạn UI
  Increment này (tạo mới thay vì sửa tại chỗ).
- **Không test** `recordExit` (ghi giờ ra khách) qua UI — action đã viết nhưng chưa có nút trên
  danh sách (chỉ hiển thị dữ liệu, chưa có action inline).
- 2 "Quyết định phạm vi" trong spec.md (FK thật thay free-text ref, không có bước soát xét cho
  SecurityCommitment) — **chưa được LĐP xác nhận chính thức**.

## Kết luận

Đủ bằng chứng thật cho 2 gate nghiệp vụ chính (DisclosureApproval — thông báo khách hàng +
thẩm quyền phê duyệt; SecurityIncident — bắt buộc đánh giá trước, bắt buộc khắc phục trước khi
đóng) và điểm kỹ thuật quan trọng nhất của increment: FK thật giữa M02 và M03 (thay cho tham
chiếu tự do trước đây). Tier M — không thuộc Tier L.
