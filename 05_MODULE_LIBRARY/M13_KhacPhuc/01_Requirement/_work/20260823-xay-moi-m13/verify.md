# M13_KhacPhuc — Báo cáo VERIFY (Increment 11)

## Build

- `npx prisma migrate dev --name m13_khac_phuc` → **PASS**, migration `20260823130850_m13_khac_phuc`
  áp dụng thành công, additive (chỉ thêm model/enum mới + quan hệ mới trên `User`).
- `npx prisma generate` → **PASS** (chạy tay ngay sau migrate, theo đúng sự cố đã gặp ở
  Increment 10).
- `npx tsc --noEmit` → **PASS**.
- `npx eslint src --max-warnings=0` → **PASS** (toàn bộ `src`).
- `npx prisma db seed` → **PASS**, nạp 4 hồ sơ KPH demo + vai trò M13 cho 4 tài khoản, có tạo mới
  `qlkt@manlab.vn` (vai trò QLKT chưa từng tồn tại trong seed).

## VERIFY qua Browser — bằng chứng thật (không suy luận)

Thao tác qua UI thật, đăng nhập/đăng xuất đổi vai trò giữa NHANVIEN (`nth@`), QLCL (`qlcl@`),
QLKT (`qlkt@`), LĐV (`ldv@`), cùng mật khẩu `DoiMatKhauNgay!2026`.

### 1. Gate căn cứ + vai trò khi đánh giá mức độ (quy tắc 2) — PASS, cả 3 nhánh

Trên hồ sơ mới tạo (KPH-2026-0005, đã xóa sau khi verify):
- LĐV bấm "Ghi nhận đánh giá mức độ" với ô căn cứ **để trống** → chặn đúng: *"Bắt buộc ghi căn cứ
  đánh giá mức độ — đánh giá thủ công, không có công thức tự động."*, trạng thái giữ nguyên
  *Chưa đánh giá mức độ*.
- Đăng nhập NHANVIEN, nhập căn cứ đầy đủ, bấm đánh giá → chặn đúng: *"Chỉ LĐV, QLCL hoặc QLKT
  được đánh giá mức độ không phù hợp (quy tắc 2 ETV.P13)."*
- Đăng nhập QLKT (tài khoản mới của increment này), chọn **Nặng** + căn cứ → thành công:
  `GHI_NHAN → DANG_KHAC_PHUC`, header hiển thị *"Đang khắc phục · Mức Nặng · ĐANG DỪNG CÔNG VIỆC"*
  — xác nhận quy tắc 4 tự đặt `stoppedWork = true`, không cho chọn khác.

### 2. Gate mức Nhẹ bắt buộc ghi chép theo dõi (quy tắc 3) — PASS, cả 2 nhánh

`KPH-2026-0001` (Nhẹ, chưa có ghi chép): LĐV bấm "Đóng hồ sơ không phù hợp" → chặn đúng:
*"Công việc không phù hợp mức Nhẹ — bắt buộc ghi chép diễn biến theo dõi vào sổ trước khi đóng hồ
sơ (quy tắc 3 ETV.P13)."* Ghi 1 diễn biến qua UI → bấm lại → thành công,
`DANG_THEO_DOI → DA_KHAC_PHUC`.

### 3. Gate tách vai trò khi thẩm xét phương án (quy tắc 5) — PASS, cả 3 nhánh

`KPH-2026-0002` (phương án ở `CHO_THAM_XET`, người thực hiện = QLCL):
- LĐV bấm "Thẩm xét ĐẠT" → chặn: *"Chỉ QLCL được thẩm xét hành động khắc phục (quy tắc 5
  ETV.P13)."*
- Đăng nhập chính QLCL đó (đúng vai trò nhưng **là người được phân công thực hiện**) → chặn:
  *"Người thực hiện hành động khắc phục không được tự thẩm xét phương án của chính mình."* —
  đây là gate mới của increment này, đúng vai trò vẫn bị chặn.
- Trên `KPH-2026-0003` (người thực hiện = NHANVIEN): NHANVIEN bấm "Báo hoàn thành khắc phục" →
  `DANG_THUC_HIEN → CHO_THAM_XET`; QLCL (khác người thực hiện) bấm "Thẩm xét ĐẠT" → thành công,
  `CHO_THAM_XET → DAT`, trường "Người thẩm xét" ghi đúng *Phạm Q. (QLCL)*.

### 4. Gate mức Nặng không tự mở khóa khi đóng hồ sơ (quy tắc 5) — PASS, cả 2 nhánh

`KPH-2026-0003` khi phương án còn `DANG_THUC_HIEN`: QLCL bấm "Đóng hồ sơ" → chặn đúng: *"Công
việc không phù hợp mức Nặng — bắt buộc QLCL thẩm xét hành động khắc phục ĐẠT mới được đóng hồ sơ
và cho tiếp tục công việc."* Sau khi thẩm xét ĐẠT, bấm lại → thành công,
`DANG_KHAC_PHUC → DA_KHAC_PHUC`, nhãn *ĐANG DỪNG CÔNG VIỆC* biến mất (`stoppedWork = false`).

### 5. Gate báo cáo thay thế chỉ LĐV, chỉ sau thẩm xét đạt (quy tắc 6) — PASS, cả 3 nhánh

`KPH-2026-0003` (có 3 báo cáo đã thu hồi):
- QLCL nhập số hiệu + bấm "LĐV cho phát hành thay thế" → chặn: *"Chỉ LĐV được cho phát hành báo
  cáo thay thế (quy tắc 6 ETV.P13)."*
- LĐV bấm khi phương án **chưa** `DAT` → chặn: *"Bắt buộc hành động khắc phục đã được QLCL thẩm
  xét ĐẠT trước khi LĐV cho phát hành báo cáo thay thế."*
- Sau khi thẩm xét ĐẠT, LĐV bấm lại → thành công: *"BC-2026-0155-TT — LĐV Lê Văn V. (LĐV) cho
  phát hành"*.

### 6. Gate chỉ QLCL lập phương án (quy tắc 4) — PASS (nhánh chặn)

QLKT điền đủ nguyên nhân gốc + nội dung khắc phục rồi bấm "QLCL lập phương án khắc phục" → chặn
đúng: *"Chỉ QLCL được lập phương án hành động khắc phục (quy tắc 4 ETV.P13)."*, không tạo bản ghi.

### 7. Cross-module đọc thật M13 → M12 — PASS

`KPH-2026-0004` (`sourceType = KHIEU_NAI`, `sourceRef = KN-2026-0003`) hiển thị *"Từ khiếu nại
(← M12) — KN-2026-0003"* kèm link sống tới `/modules/M12/complaint/<id>` — query thẳng bảng
`M12Complaint` bằng Prisma, không import code M12, không sửa gì thuộc M12.

## Sự cố gặp phải + cách xử lý

- **`read_page` của Browser trả về "(empty page)" với viewport 0x0** trên các trang chi tiết M13 —
  không dùng được ref. Xử lý: thao tác qua `javascript_tool` (click nút thật bằng `.click()`,
  đặt giá trị input qua native setter của `Object.getPrototypeOf(el)` + `dispatchEvent('input')`
  để React nhận). Lưu ý: `Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,…)`
  ném `Illegal invocation` trong sandbox này — phải lấy prototype từ chính phần tử.
- **Toạ độ click lệch giữa `read_page` (579×811) và ảnh chụp thật (800×1121)** — lặp lại sự cố đã
  ghi ở Increment 10. Xử lý: điền form đăng nhập bằng `form_input` theo ref, bấm nút submit theo
  toạ độ lấy từ **ảnh chụp** (400, 748), không dùng toạ độ suy từ `read_page`.
- **Một sự kiện đánh giá mức độ trên `KPH-2026-0004` (13:16:40, LĐV, căn cứ "Đánh giá thủ công")
  không do phiên làm việc này thực hiện** — chuỗi "Đánh giá thủ công" không tồn tại trong code
  hay seed (đã grep), nên là input gõ tay từ người dùng thao tác trực tiếp trên Browser pane cùng
  lúc. Không phải lỗi ứng dụng: `basis` có giá trị nên qua gate là đúng; đã kiểm chứng riêng
  nhánh `basis` rỗng bị chặn (mục 1).

## Regression

```
$ python3 _meta/validate_links.py
Đã kiểm tra 377 link · 38 MP · 38 M · 22 CAP. Vấn đề: 0
```
PASS.

## Điều CHƯA verify (báo cáo rõ, không quy tròn thành "hoàn tất")

- **Không test qua UI** nhánh `NOT_SEVERE` (QLCL cố lập phương án khắc phục cho hồ sơ mức Nhẹ) —
  panel chỉ hiện nút lập phương án khi `status = DANG_KHAC_PHUC`, không tạo được tình huống này
  qua thao tác thường; gate đã viết ở `rules.ts` nhưng chưa demo runtime.
- **Không test qua UI** nhánh `PLAN_EXISTS` (lập phương án thứ hai) và `BAD_STATE` của các
  transition.
- **Không test qua UI** nhánh thẩm xét **KHÔNG ĐẠT** (`CHO_THAM_XET → DANG_THUC_HIEN`) và gate
  `NOTE_REQUIRED` đi kèm.
- **Không test** `txCompleteCapPlan` khi người bấm không phải người được phân công (`FORBIDDEN`).
- **4 "Quyết định phạm vi"** trong spec.md (plan 1-1 với NCW; gate `SELF_REVIEW`; yêu cầu phương
  án `DAT` trước khi phát hành báo cáo thay thế; ngưỡng tối thiểu 1 ghi chép theo dõi) — **chưa
  được LĐV xác nhận chính thức**.
- **F13.01 chưa số hóa được** (nguồn Dropbox rỗng 0 byte theo ghi chú trong ETV.P13) — cấu trúc
  sổ theo dõi suy từ nội dung quy trình, chưa đối chiếu được với biểu mẫu gốc.

## Kết luận

Đủ bằng chứng thật cho gate trọng yếu nhất của ETV.P13 — **mức Nặng không được đóng hồ sơ/tiếp
tục công việc cho tới khi QLCL thẩm xét ĐẠT, và người thực hiện không được tự thẩm xét** — hoạt
động đúng cả nhánh chặn lẫn nhánh thành công qua thao tác đổi vai trò thật, không chỉ đọc code.
Tier M — không thuộc Tier L (không đụng auth/tenant/migration phá hủy dữ liệu).
