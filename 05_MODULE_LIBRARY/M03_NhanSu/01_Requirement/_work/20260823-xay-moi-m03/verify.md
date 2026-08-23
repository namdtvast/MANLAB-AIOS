# M03_NhanSu — Báo cáo VERIFY (Increment 5)

## Build

- `npx tsc --noEmit` → **PASS**.
- `npx eslint src --max-warnings=0` → **PASS**.
- `npx prisma migrate dev --name m03_nhan_su` → **PASS**, migration `20260823014715_m03_nhan_su`
  áp dụng thành công, additive (không sửa bảng M01/M10/M21/M29/PlatformModule hiện có).
- `npx tsx prisma/seed.ts` → **PASS**, nạp 2 đề xuất tuyển dụng + 2 hồ sơ nhân sự + 2 phiếu đào
  tạo + 1 HĐLĐ demo + vai trò M03 cho 4 tài khoản (3 tái sử dụng từ M01/M10 + 1 tài khoản mới
  `vanphong@manlab.vn`).

## Sự cố gặp phải + cách xử lý

- **Prisma Client cũ trên dev server đang chạy sẵn** (lặp lại đúng sự cố đã gặp ở M01/M21): xử lý
  bằng `preview_stop` + `preview_start` (process tự khởi tạo trong phiên, không cần hỏi quyền).
- **`computer.left_click` theo `ref` đôi khi không kích hoạt event** (gặp lại y hệt lần M01, dù
  lần này dùng `ref` thay vì toạ độ scale) — không rõ nguyên nhân chính xác (nghi vấn: dev overlay
  Next.js hoặc timing hydration), khắc phục bằng gọi `.click()` trực tiếp qua `javascript_tool`
  — 100% các bước VERIFY dùng cách này đều ghi nhận đúng qua `get_page_text` ngay sau đó.
- **Tự động điền form qua `document.querySelectorAll('input')` bắt luôn ô tìm kiếm module ở
  sidebar** (placeholder "Tìm module theo mã hoặc tên…") do cùng có `placeholder` — khiến 1 lần
  điền form "Đánh dấu Đã tuyển" bị lệch field (fullName/position/department dịch chuyển 1 vị trí,
  tạo ra `NS-2026-0003` với dữ liệu tên/vị trí bị hoán đổi và department rỗng). Đây là lỗi thao
  tác test, không phải lỗi ứng dụng — transition/gate vẫn chạy đúng (đã xác nhận qua nhật ký), chỉ
  dữ liệu demo của riêng bản ghi này không đẹp. Không sửa lại vì không ảnh hưởng đánh giá tính
  đúng đắn của rules.ts/actions.ts.

## VERIFY qua Browser — bằng chứng thật (không suy luận)

Đăng nhập lần lượt 4 tài khoản demo (`nth`=NGUOIHUONGDAN, `ldp`=TP, `ldv`=LDV,
`vanphong`=VANPHONG @manlab.vn, cùng mật khẩu `DoiMatKhauNgay!2026`), thao tác qua UI thật.

### 1. Luồng RecruitmentPlan đầy đủ (TD-2026-0002) — PASS

`Chờ duyệt` → **TP bấm "Phê duyệt" → bị chặn**: *"Chỉ LĐV được phê duyệt đề xuất tuyển dụng."* →
LĐV phê duyệt → `Đã duyệt` → **LĐV bấm "Đánh dấu Đã tuyển" → bị chặn**: *"Chỉ Văn phòng/TP được
đánh dấu Đã tuyển."* → VanPhong điền thông tin + đánh dấu Đã tuyển → `Đã tuyển`, tạo
`M03Employee` mới (NS-2026-0003), tự động điều hướng sang trang chi tiết nhân sự.

### 2. Gate 6 điều kiện hoàn thành đào tạo (PT-2026-0002, quy tắc 3 ETV.P03) — PASS, trọng tâm increment

Seed sẵn ở `Chờ duyệt` với 5/6 điều kiện (thiếu c5AssessmentPassed). LĐV bấm "Phê duyệt" → **bị
chặn ở server** (không chỉ ẩn nút UI): *"Thiếu ít nhất 1/6 điều kiện hoàn thành đào tạo (quy tắc 3
ETV.P03) — không thể phê duyệt Đạt."* LĐV bấm "Yêu cầu bổ sung" thiếu lý do → bị chặn: *"Yêu cầu
bổ sung bắt buộc nhập lý do."* Nhập lý do → chuyển `Cần bổ sung` (`NEEDS_SUPPLEMENT`, kết quả
`Đào tạo bổ sung`). Đăng nhập NguoiHuongDan (NTH), tick đủ 6/6 checkbox, Lưu, Gửi duyệt →
`Chờ duyệt` (UI tự báo "Đủ 6/6 điều kiện"). LĐV phê duyệt lại → `Đã hoàn thành` (`APPROVED`,
result=`Đạt`) — **side-effect xác nhận đúng**: `M03Employee.status` của Trần Thị Bích tự động
chuyển từ "Đang thử việc" → "Chính thức" (không cần thao tác thủ công riêng).

### 3. Gate chấm dứt hợp đồng lao động — bắt buộc thu hồi bảo mật (HDLD-2026-0001) — PASS

LĐV bấm "Chấm dứt hợp đồng" với lý do đã nhập nhưng **chưa tick "Đã thu hồi quyền truy cập bảo
mật"** → bị chặn: *"Thiếu: thu hồi quyền truy cập bảo mật (phối hợp M02)"* (đúng quy tắc 7 DacTa
— phối hợp M02). Tick đủ 2 checkbox (bảo mật + BHXH), xác nhận lại → `Đã chấm dứt` — **side-effect
xác nhận đúng**: `M03Employee.status` của Nguyễn Văn An tự động chuyển "Chính thức" → "Đã nghỉ
việc"; tạo `M03ContractTermination` mới (không kiểm tra riêng bằng UI vì chưa có trang danh sách
Termination trong Increment 5, nhưng transaction không lỗi → coi là tạo thành công).

### 4. Hợp đồng dịch vụ (ServiceContract) — soạn + ký — PASS

Soạn `HDDV-2026-0001` (Dịch vụ chuyên môn, `Đang soạn`) trên NS-2026-0002 → LĐV bấm "Ký" →
`Đang hiệu lực`, nút chuyển thành "Chấm dứt" (chưa test tiếp chấm dứt HĐDV — xem mục "Chưa
verify").

### 5. Gate nội dung đào tạo Ban đầu ≥8 mục — phát hiện thiếu khi VERIFY, đã fix ngay

Khi rà soát lại `createTrainingPlan`, phát hiện DacTa.md §2.2 yêu cầu ≥8 nội dung bắt buộc cho
đào tạo Ban đầu nhưng server chưa validate — đã bổ sung chặn `CONTENT_INCOMPLETE` trong
`actions.ts` (không sửa `rules.ts` vì đây là validate input thô, chưa cần state machine).
Smoke-test lại qua UI (tạo `PT-2026-0003` với đủ 8 nội dung mặc định) → **PASS, không regression**
(`npx tsc --noEmit` + `npx eslint --max-warnings=0` PASS sau khi sửa). UI hiện tại luôn gửi đúng
8 mục mặc định khi `planType=BAN_DAU` (không có ô nhập tự do) nên chưa demo được nhánh lỗi qua
UI — gate chỉ bảo vệ khỏi việc gọi action trực tiếp với dữ liệu thiếu (vd nếu sau này thêm form
tự do), không phải lỗ hổng đang khai thác được qua UI hiện tại.

## Regression

```
$ python3 _meta/validate_links.py
Đã kiểm tra 377 link · 38 MP · 38 M · 22 CAP. Vấn đề: 0
```
PASS — không phá vỡ liên kết Hub/Module/Capability nào.

## Điều CHƯA verify (báo cáo rõ, không quy tròn thành "hoàn tất")

- **Không test** gia hạn hợp đồng lao động (`renewLaborContract`) qua UI thật — logic đã viết
  (`txRenewContract`, append `renewalHistory`) nhưng chưa bấm nút "Gia hạn" để xác nhận.
- **Không test** chấm dứt hợp đồng dịch vụ (`terminateServiceContract`) qua UI — chỉ test soạn+ký.
- **Không test** trường hợp "Từ chối" đề xuất tuyển dụng (`REJECTED`) qua UI thật.
- **Không test** kế hoạch đào tạo loại Định kỳ/Bổ sung (chỉ test loại Ban đầu).
- Không có trang danh sách/chi tiết riêng cho `M03ContractTermination` — chỉ tạo ngầm trong
  transaction khi chấm dứt hợp đồng, chưa có UI xem lại.
- 2 "Quyết định phạm vi" trong spec.md (rút gọn ProbationReport/ServiceContract thành CRUD đơn
  giản, `EXPIRED` tính derived không cron) — **chưa được LĐP xác nhận chính thức**.
- `ProbationReport` **hoàn toàn chưa có model/UI riêng** — theo Quyết định phạm vi, nội dung đã
  gộp vào luồng TrainingRecord, nhưng nếu LĐP không đồng ý gộp thì cần bổ sung entity riêng.

## Kết luận

Đủ bằng chứng thật cho trọng tâm increment: gate 6 điều kiện đào tạo (quy tắc 3, phần logic quan
trọng nhất của ETV.P03 khi số hóa) chặn đúng ở server, không chỉ ẩn nút; luồng tuyển dụng 2 gate
vai trò (LĐV-only phê duyệt, VanPhong/TP-only đánh dấu tuyển) hoạt động đúng; gate chấm dứt hợp
đồng bắt buộc thu hồi bảo mật hoạt động đúng; 2 side-effect tự động cập nhật `Employee.status`
(→ CHINHTHUC khi đào tạo đạt, → DANGHIVIEC khi chấm dứt HĐLĐ) đã xác nhận qua UI thật. Tier M —
không thuộc Tier L.
