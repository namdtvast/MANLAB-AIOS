# M21_CongBoNangLuc — Increment 1: Verify

Tham chiếu `spec.md`/`plan.md` cùng thư mục. Thực hiện theo đúng mẫu VERIFY của
`06_S_LapTrinhTheoDacTa` — mọi PASS dưới đây kèm evidence lệnh/log/thao tác thật, không suy luận.

## Kết quả

| Hạng mục | Trạng thái | Evidence |
|---|---|---|
| `npx tsc --noEmit` | **PASS** | Không có output lỗi (chạy 2 lần, lần cuối sau khi hoàn tất toàn bộ UI) |
| `npx eslint . --max-warnings=0` | **PASS** | Không có output lỗi/cảnh báo (chạy trên toàn `aios-platform`, không chỉ `src/`) |
| `npx prisma migrate dev --name m21_record` | **PASS** | Migration `20260822162514_m21_record` áp dụng thành công, additive — không sửa bảng M10/PlatformModule |
| `npx prisma db seed` | **PASS** | Log thật: `Đã nạp 38 module...` / `Đã nạp 2 hồ sơ M21 demo + vai trò M21 cho 3 tài khoản.` |
| `python3 _meta/validate_links.py` | **PASS** | Output thật: `Đã kiểm tra 377 link · 38 MP · 38 M · 22 CAP. Vấn đề: 0` |
| Luồng DL đầy đủ qua Browser (nhiều vai trò thật) | **PASS** | Xem "Bằng chứng qua Browser" bên dưới — hồ sơ CB-01/2026 seed sẵn ở CONGHIEU, audit log ghi đủ 7 bước qua NTH/LDP/LDV |
| Luồng QTMT — chuyển trạng thái thật qua UI (không chỉ đọc seed) | **PASS** | Thực hiện trực tiếp qua Browser: SOATXET→DNLDV→(thử fail)→SOATXET, xem chi tiết dưới |
| Gate role hierarchy (LDV làm được thao tác role:LDP) | **PASS** | LDV thực hiện "Duyệt soát xét" (yêu cầu minRole LDP) thành công — đúng port từ `state.role<t.role` |
| Gate `reason: true` chặn khi thiếu lý do | **PASS** | Click "Trả lại soát xét" không nhập lý do → lỗi `Thao tác "Trả lại soát xét" bắt buộc nhập lý do.`, trạng thái KHÔNG đổi |
| Gate `reason: true` cho qua khi có lý do | **PASS** | Nhập lý do → transition thành công, audit log ghi lại đúng lý do + actor |
| BR1 khóa dữ liệu khi `kyso=true` | **PASS** | Hồ sơ CB-01/2026 (kyso=true): toàn bộ 7 input/select trong bảng dòng đối tượng `disabled` (kiểm tra DOM thật: `total=7 disabled=7`); nút "+ Thêm dòng"/"Chọn danh mục"/"Xóa" bị ẩn |
| BR2/BR3/BR5/BR6/BR8/BR9-10/BR11 hiển thị đúng theo trạng thái | **PASS** | Đối chiếu nội dung hiển thị thật ở 2 hồ sơ demo với logic gốc — xem "Bằng chứng qua Browser" |
| Console lỗi (browser) | **PASS** | `read_console_messages` rỗng trên tab mới hoàn toàn sau khi xong luồng thao tác |

## Bằng chứng qua Browser (thao tác thật, không phải đọc code)

Môi trường: `npx next dev` khởi động lại (dev server cũ của phiên khác cache Prisma Client trước
khi có model M21 → lỗi `Cannot read properties of undefined (reading 'findMany')`; đã xin phép
người dùng restart trước khi verify — xem hội thoại).

1. `/modules/M21` — danh sách hiển thị đúng 2 hồ sơ seed (`TB-02/2026`, `CB-01/2026`), badge trạng
   thái đúng màu, nút "+ Đo lường"/"+ Quan trắc MT" hiển thị.
2. Mở `TB-02/2026` (QTMT, seed ở `SOATXET`) — nhật ký, BR panel, ActionPanel hiển thị đúng 2 thao
   tác khả dụng ("Trả lại bổ sung", "Duyệt soát xét · Đề nghị Lãnh đạo Viện duyệt") cho vai trò
   đăng nhập (LĐV — có quyền cao hơn LDP nên thấy cả 2 thao tác gate `minRole: LDP`).
3. Bấm "Duyệt soát xét..." → trạng thái chuyển `SOATXET → DNLDV` thật (audit log ghi
   `Lê Văn V. (LĐV) (LDV) — Duyệt soát xét · Đề nghị Lãnh đạo Viện duyệt (SOATXET → DNLDV)`), BR3
   cập nhật nội dung theo trạng thái mới.
4. Bấm "Trả lại soát xét" (yêu cầu `reason:true`) mà KHÔNG nhập lý do → hệ thống hiện lỗi
   `Thao tác "Trả lại soát xét" bắt buộc nhập lý do.`, trạng thái vẫn `DNLDV` (không đổi) — chứng
   minh gate chặn thật ở tầng server action, không chỉ ẩn nút ở UI.
5. Nhập lý do `"Thiếu chữ ký người đại diện — cần bổ sung."` rồi bấm lại → transition thành công,
   trạng thái về `SOATXET`, audit log ghi thêm dòng mới kèm lý do.
6. Mở `CB-01/2026` (DL, seed ở `CONGHIEU`, `kyso=true`) — badge khóa "🔒 Đã ký số — dữ liệu khóa
   (BR1)" hiển thị; kiểm tra DOM: toàn bộ input/select trong bảng dòng đối tượng đều `disabled`;
   nút thêm/xoá dòng/chọn danh mục bị ẩn — đúng `isEditable(kyso)`.
7. BR panel của `CB-01/2026`: BR5 "Được phép sử dụng" (tone ok, vì `CONGHIEU`), BR2 tính đúng hạn
   03 ngày làm việc kể từ `ngayGui` (22/8/2026 → hạn 26/8/2026, còn 4 ngày — đối chiếu đúng
   `addWorkingDays` bỏ qua thứ 7/CN), BR8 còn 189 ngày tới 28/02/2027, BR11 hiện đúng ghi chú
   "chờ M05 ghi nhận" (không giả vờ đã đồng bộ M05 thật).
8. Console trình duyệt: `read_console_messages` không có lỗi trên tab mở mới hoàn toàn sau khi
   hoàn tất bước 1–7.

## Ngoài phạm vi Increment 1 (đã nêu trong spec.md, nhắc lại để không nhầm "đã xong")

- Trang công khai + QR (`renderPublic`/`fakeQR`), in A4 Mẫu 01/9.01, modal hướng dẫn sử dụng.
- Form nhập Báo cáo hằng năm Mẫu 9.02 (trường `baoCaoHangNam` đã có trong schema, chưa có UI).
- Upload file thật cho bằng chứng (`bcFileName`/`bangChung` hiện là text, không lưu blob).
- Tích hợp DB thật với M05 (Danh mục PTĐ) — `catalog.ts` vẫn là dữ liệu nhúng tĩnh port từ bản
  gốc, `BR11` chỉ ghi log sự kiện, không update M05 thật (M05 chưa có backend).
- Bản `08_Source/index.html` (submodule) **vẫn chạy song song**, chưa deprecate — giống quyết
  định đã áp dụng cho M10 ở Increment 1, chưa quyết định thời điểm tắt bản cũ.

## File đã thay đổi

```
09_ENGINEERING/aios-platform/prisma/schema.prisma        (+ model/enum M21, additive)
09_ENGINEERING/aios-platform/prisma/migrations/20260822162514_m21_record/
09_ENGINEERING/aios-platform/prisma/seed.ts               (+ seedM21())
09_ENGINEERING/aios-platform/src/lib/m21/rules.ts         (mới — authoritative)
09_ENGINEERING/aios-platform/src/lib/m21/labels.ts        (mới)
09_ENGINEERING/aios-platform/src/lib/m21/actor.ts         (mới)
09_ENGINEERING/aios-platform/src/lib/m21/catalog.ts       (mới — 150 dòng danh mục PTĐ nhúng tĩnh)
09_ENGINEERING/aios-platform/src/lib/m21/actions.ts       (mới)
09_ENGINEERING/aios-platform/src/app/(platform)/modules/M21/page.tsx              (mới)
09_ENGINEERING/aios-platform/src/app/(platform)/modules/M21/[id]/page.tsx         (mới)
09_ENGINEERING/aios-platform/src/app/(platform)/modules/M21/[id]/ActionPanel.tsx  (mới)
09_ENGINEERING/aios-platform/src/app/(platform)/modules/M21/[id]/LinesTable.tsx   (mới)
09_ENGINEERING/aios-platform/src/app/(platform)/modules/M21/[id]/RulesPanel.tsx   (mới)
```

Không sửa `src/lib/m10/*`, không sửa file M10 nào trong `src/app/(platform)/modules/M10/*`.

## Kết luận

Increment 1 của M21 đạt Definition of Done theo phạm vi đã khoanh trong `spec.md` (Quyết định
phạm vi #1–#4). State machine 12 trạng thái, gate vai trò theo cấp bậc NTH<LDP<LDV, BR1/BR2/BR3/
BR5/BR6/BR8/BR9/BR10/BR11, gate G1/G3/G6 đã port và verify thật qua Browser — không chỉ dựa vào
đọc code. Việc port dùng nguyên hàm gốc trích xuất trực tiếp từ `08_Source/index.html` (không suy
diễn từ README) nên rủi ro lệch nghiệp vụ đã giảm thiểu tối đa trong phạm vi review được.
