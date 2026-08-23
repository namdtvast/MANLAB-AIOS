# M12_KhieuNai — Báo cáo VERIFY (Increment 10)

## Build

- `npx prisma migrate dev --name m12_khieu_nai` → **PASS**, migration `20260823071840_m12_khieu_nai`
  áp dụng thành công, additive.
- `npx prisma generate` → **PASS** (bắt buộc chạy riêng sau migrate lần này vì tsc ban đầu báo
  thiếu `m12Complaint`/`M12Channel`... — xem mục "Sự cố gặp phải").
- `npx tsc --noEmit` → **PASS** (sau khi generate lại client).
- `npx eslint src --max-warnings=0` → **PASS** (toàn bộ `src`, không chỉ file M12).
- `npx prisma db seed` → **PASS**, nạp 4 khiếu nại + 2 phàn nàn/góp ý demo + vai trò M12 cho 4 tài
  khoản (tái sử dụng toàn bộ, không tạo tài khoản mới).

## Sự cố gặp phải + cách xử lý

- **`prisma migrate dev` không tự generate client đầy đủ trong lần chạy này** (khác vài lần trước
  chỉ cần `preview_stop`/`preview_start`) — tsc báo thiếu toàn bộ type M12. Xử lý: chạy tay
  `npx prisma generate` trước khi tsc lại, sau đó PASS.
- **Prisma Client cũ trên dev server đang chạy sẵn**: xử lý bằng `preview_stop` + `preview_start`
  (lặp lại sự cố đã gặp ở mọi increment trước).
- **Đăng xuất qua `fetch('/api/auth/signout', ...)` với CSRF token rỗng không có tác dụng thật**
  (session vẫn giữ nguyên) — phát hiện khi kiểm tra `/api/auth/session` sau khi tưởng đã đăng xuất
  thành công. Xử lý: dùng đúng nút "Đăng xuất" trong UI (`el.click()` qua `javascript_tool`) thay
  vì gọi thẳng API — đăng xuất xác nhận đúng qua `/api/auth/session` trả về `null`.
- **`computer.type` không ghi được giá trị vào ô email/mật khẩu ở trang đăng nhập** sau khi
  viewport thực tế (748×720 theo ảnh chụp) lệch với viewport báo cáo trong `read_page`
  (374×360) — click theo toạ độ tuyệt đối trúng sai vị trí. Xử lý: chuyển sang `form_input` (điền
  theo `ref`, không phụ thuộc toạ độ) cho 2 ô nhập, chỉ dùng `computer.left_click` theo `ref` cho
  nút submit — hoạt động đúng, xác nhận qua `/api/auth/session`.

## VERIFY qua Browser — bằng chứng thật (không suy luận)

Đăng nhập lần lượt LĐV (`ldv@manlab.vn`), LĐP=PHUTRACH (`ldp@manlab.vn`), cùng mật khẩu
`DoiMatKhauNgay!2026`, thao tác qua UI thật (form/nút thật, không gọi thẳng server action).

### 1. Gate bắt buộc F14.03 trước khi phân công (quy tắc 1-2 ETV.P12) — PASS

Mở `KN-2026-0002` (không giải thích được ngay, chưa có `externalDocRef`) với vai trò LĐV — panel
hành động chỉ hiện ô nhập F14.03 + nút "Khởi tạo F14.03", **không hiện** form phân công. Nhập
`F14.03-2026-0005` → khởi tạo thành công → panel chuyển sang hiện form chọn cán bộ phụ trách +
nút "LĐV phân công xử lý". Bấm phân công → chuyển đúng `Nháp → Đang xử lý`, nhật ký ghi
*"LĐV phân công xử lý (NHAP → DANG_XU_LY)"*.

### 2. Gate bắt buộc CAPA khi đóng hồ sơ phức tạp (quy tắc 4 ETV.P12) — PASS, cả 2 nhánh

Mở `KN-2026-0003` (`isComplex=true`, đã ở `DA_TRA_LOI`, chưa có `capaRef`). Bấm "Đóng hồ sơ
(khách đồng ý)" khi chưa liên kết CAPA → bị chặn đúng: *"Khiếu nại phức tạp/ảnh hưởng lớn — bắt
buộc có hành động khắc phục (CAPA, quy tắc 4 ETV.P12) trước khi đóng hồ sơ."* Liên kết CAPA
(`F13.01-2026-0009`) → cảnh báo biến mất, bấm lại "Đóng hồ sơ" → thành công, chuyển
`DA_TRA_LOI → DONG_HO_SO`.

### 3. Gate LĐV-only khi dừng giải quyết (quy tắc 5 ETV.P12) — PASS, cả 2 nhánh

Trên `KN-2026-0002` (đã ở `DA_TRA_LOI` sau khi LĐP trả lời): đăng nhập LĐP (vai trò `PHUTRACH`),
bấm "LĐV dừng giải quyết" → bị chặn đúng: *"Chỉ LĐV được quyết định dừng giải quyết khi khách
hàng chưa chấp nhận (quy tắc 5 ETV.P12)."* Đăng nhập lại LĐV, bấm lại cùng nút với cùng lý do →
thành công, chuyển `DA_TRA_LOI → KHONG_DAT_THOA_THUAN`, nhật ký ghi đúng lý do bằng văn bản.

### 4. Nhánh tắt — giải thích ngay + khách hài lòng → đóng hồ sơ ngay (quy tắc 2) — PASS

`KN-2026-0001` (seed với `resolvedOnSpot=true`, `customerSatisfiedOnSpot=true`) hiển thị thẳng
trạng thái `Đóng hồ sơ`, `externalDocRef = "Chưa có"`, nhật ký chỉ có 1 dòng duy nhất *"Tiếp nhận
khiếu nại — giải thích ngay, khách hài lòng → đóng hồ sơ"* — xác nhận không đi qua các bước trung
gian, đúng quy tắc 2 "chỉ cần ghi vào Complaint, không bắt buộc F14.03".

### 5. Chuyển phàn nàn/góp ý thành khiếu nại (quy tắc 6 ETV.P12) — PASS

Bấm "Chuyển thành khiếu nại (quy tắc 6)" trên `PNGY-2026-0002` (chưa escalate) → tạo
`KN-2026-0005` mới, cột "Đã chuyển khiếu nại?" cập nhật thành link tới hồ sơ mới ngay khi
`router.refresh()`.

### 6. Form tạo khiếu nại mới qua UI thật — PASS

Điền nội dung tại `/modules/M12/complaint/new`, bấm "Tiếp nhận khiếu nại" → tạo `KN-2026-0006`,
redirect đúng sang trang chi tiết, hiển thị đúng trạng thái `Nháp` + cảnh báo bắt buộc F14.03 (vì
mặc định `resolvedOnSpot=false`).

## Regression

```
$ python3 _meta/validate_links.py
Đã kiểm tra 377 link · 38 MP · 38 M · 22 CAP. Vấn đề: 0
```
PASS.

## Điều CHƯA verify (báo cáo rõ, không quy tròn thành "hoàn tất")

- **Không test qua UI** nhánh chặn của `txRespondComplaint` khi người không phải cán bộ được phân
  công cố trả lời (`FORBIDDEN`) — chỉ test nhánh thành công (đúng người phân công trả lời).
  Server-side gate đã viết (`c.assignedToId !== u.id`) nhưng chưa demo runtime.
- **Không test qua UI** nhánh chặn `ASSIGNEE_REQUIRED`/vai trò không phải LĐV cố phân công
  (`FORBIDDEN` trên `txAssignComplaint`) — panel chỉ hiện nút phân công khi đã có sẵn danh sách
  cán bộ phụ trách hợp lệ, không tạo được tình huống lỗi qua thao tác thường ở giao diện hiện tại.
- **Không test** hồ sơ khiếu nại phức tạp mà LĐV chọn dừng giải quyết thay vì đóng (2 nhánh cuối
  `txCloseComplaint` — `customerSatisfied=false` khi `isComplex=true` — không phụ thuộc gate CAPA
  theo thiết kế, nhưng chưa demo runtime riêng cho tổ hợp này).
- **Model gộp `Feedback`/`InternalFeedback`** thành 1 bảng `M12Feedback` — "Quyết định phạm vi"
  trong spec.md — **chưa được LĐV xác nhận chính thức**.
- Người thực hiện `txAssignComplaint` quy định cứng là vai trò `LDV` cho mọi trường hợp (kể cả
  khiếu nại không phức tạp) — DacTa chỉ nói rõ với khiếu nại phức tạp, đây là lựa chọn để có 1
  gate nhất quán, **chưa được LĐV xác nhận**.
- `relatedCertificateRef`/`externalDocRef`/`capaRef` đều là field tham chiếu tự do (M11 đã xây
  nhưng không có FK ngược theo DacTa; M14/M13 chưa xây) — không có validate định dạng.

## Kết luận

Đủ bằng chứng thật cho gate mới nhất — **bắt buộc văn bản khiếu nại chính thức (F14.03) khi không
giải quyết được ngay tại chỗ** (quy tắc 1-2) — hoạt động đúng; gate CAPA bắt buộc cho khiếu nại
phức tạp và gate LĐV-only khi dừng giải quyết đều verify được cả nhánh chặn lẫn nhánh thành công
qua thao tác đăng nhập/đăng xuất đổi vai trò thật, không chỉ đọc code. Tier M — không thuộc Tier L.
