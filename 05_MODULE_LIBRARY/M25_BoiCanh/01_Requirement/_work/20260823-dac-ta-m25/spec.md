# M25_BoiCanh — SPEC kỹ thuật (work-id 20260823-dac-ta-m25)

> Nghiệp vụ (nguồn sự thật): [`../../DacTa.md`](../../DacTa.md). File này chỉ bổ sung phần **kỹ
> thuật** cần cho BUILD: màn hình, API, tiêu chí chấp nhận, NFR — không lặp lại quy tắc nghiệp vụ.
> Nền tảng đích: `09_ENGINEERING/aios-platform` (Next.js App Router + Prisma + server actions),
> theo đúng khuôn M16/M17.

## 1. RECON — hiện trạng

- `[FACT]` Không có `03_MANAGEMENT_SYSTEM/02_P/ETV.P25*` và không có `06_SHARED_RESOURCES/01_Forms/ETV.P.F25*`.
- `[FACT]` `ETV.QM_QuanlyChatluong.md` §9.2 nêu nguyên tắc và dẫn chiếu "Thủ tục ETV.MP25".
- `[FACT]` `04_PROCESS_LIBRARY/MP25_BoiCanh/manifest.yaml`: `capabilities: [CAP-25]`, `module: M25`,
  `menu_group: DIEU_HANH`, `menu_order: 1`, `owner: "(cập nhật)"`.
- `[FACT]` `02_CAPABILITIES/CAP-25_BoiCanhTriThuc` gồm MP25 + MP26 → M25 và M26 chia đôi năng lực.
- `[FACT]` `05_MODULE_LIBRARY/M25_BoiCanh/08_Source/` trống; M25 chưa có trong aios-platform
  (`prisma/schema.prisma` không có model tiền tố `M25`).
- `[FACT]` Khuôn đã dùng ở M16/M17 trong aios-platform: model đặt tiền tố `M25...`, enum trạng thái
  tiền tố `M25...`, vai trò dùng lại bộ tài khoản demo `QLCL` / `TP` / `LDV`, mọi chuyển trạng thái
  đi qua server action trong `src/lib/m25/actions.ts` + `rules.ts` (gate) + `labels.ts` (nhãn tiếng Việt).
- `[ASSUMPTION]` Kỳ xem xét là snapshot bất biến sau phê duyệt (không có bản trong văn bản ban hành).
- `[QUESTION]` 6 câu hỏi chốt — xem `DacTa.md` mục 10.

## 2. Màn hình (UI)

| # | Màn hình | Đường dẫn dự kiến | Vai trò | Nội dung chính |
|---|---|---|---|---|
| 1 | Danh sách kỳ xem xét | `/modules/M25` | Tất cả (đọc) | Bảng kỳ: mã, loại, năm, phạm vi hệ thống, trạng thái, người lập/phê duyệt; nút "Tạo kỳ mới" (QLCL) |
| 2 | Chi tiết kỳ | `/modules/M25/review/[id]` | Tất cả (đọc) | Thông tin kỳ + 2 tab: Vấn đề bối cảnh · Bên quan tâm; thanh hành động theo trạng thái + vai trò |
| 3 | Biểu mẫu vấn đề bối cảnh | trong tab (dialog/inline) | QLCL, TP | Thêm/sửa `ContextIssue`; chọn nhóm, mức tác động, tần suất theo dõi, liên kết M01 |
| 4 | Biểu mẫu bên quan tâm | trong tab | QLCL, TP | Thêm/sửa `InterestedParty` + danh sách `PartyExpectation` con |
| 5 | Bảng theo dõi đến hạn | `/modules/M25/monitoring` | QLCL, TP | Mục `Còn hiệu lực` đã đến hạn xem xét theo `monitoring_frequency` (tính khi đọc) |

Quy ước hiển thị: nhãn trạng thái/enum tiếng Việt tập trung ở `labels.ts`; kỳ `Đã phê duyệt` hiển
thị **chỉ đọc** toàn bộ (ẩn nút sửa/xóa, không chỉ disable).

## 3. API / server action

| Hành động | Vai trò | Gate chính |
|---|---|---|
| `createReview` | QLCL | `cycle_type = Đột xuất` ⇒ bắt buộc `trigger_reason`; sao chép mục `Còn hiệu lực` từ kỳ liền trước |
| `updateReview` | QLCL | chỉ khi `Nháp` / `Không soát xét` / `Không phê duyệt` |
| `upsertIssue` / `upsertParty` / `upsertExpectation` | QLCL, TP | chỉ khi kỳ chưa phê duyệt; `is_compliance_obligation ⇒ obligation_ref` (quy tắc 4) |
| `closeIssue` / `closeParty` | QLCL, TP | bắt buộc lý do (quy tắc 10) |
| `submitForReview` | QLCL | đủ trường bắt buộc + mọi vấn đề `Cao` có `risk_refs` (quy tắc 3) + mọi bên quan tâm có ≥1 mong đợi (quy tắc 6) |
| `review` (Đạt / Không đạt) | TP ≠ người lập | Không đạt ⇒ bắt buộc lý do |
| `approve` (Đạt / Không đạt) | **LĐV** | Đạt ⇒ bắt buộc `conclusion`; tự chuyển kỳ liền trước sang `Hết hiệu lực` + gán `supersedes_ref` |
| `cancelReview` | LĐV | chỉ khi chưa phê duyệt; bắt buộc lý do |
| `exportForm` (F25.01/02/03) | QLCL | chỉ với kỳ `Đã phê duyệt` |
| `listAudit` | Quản trị | chỉ đọc |

Vi phạm gate ⇒ trả lỗi nghiệp vụ có mã (khuôn REST tương đương: `409` + mã lỗi), không im lặng bỏ qua.

## 4. Tiêu chí chấp nhận (AC)

| # | Tiêu chí | Cách verify |
|---|---|---|
| AC1 | QLCL tạo được kỳ định kỳ và kỳ đột xuất; đột xuất thiếu `trigger_reason` bị chặn | Thao tác UI 2 chiều |
| AC2 | Kỳ có vấn đề `impact_level = Cao` chưa liên kết M01 **không** gửi soát xét được; sau khi liên kết thì gửi được | Thao tác UI 2 chiều |
| AC3 | Bên quan tâm không có mong đợi nào ⇒ chặn gửi soát xét | Thao tác UI 2 chiều |
| AC4 | Mong đợi đánh dấu nghĩa vụ tuân thủ mà thiếu `obligation_ref` ⇒ chặn lưu | Thao tác UI 2 chiều |
| AC5 | TP trùng người lập **không** soát xét được; TP khác soát xét được | Đăng nhập 2 tài khoản |
| AC6 | Chỉ LĐV phê duyệt được và bắt buộc nhập `conclusion` | Thử với QLCL/TP (bị từ chối) và LĐV (thành công) |
| AC7 | Sau phê duyệt: kỳ chỉ đọc; kỳ liền trước tự chuyển `Hết hiệu lực` và `supersedes_ref` đúng | Kiểm tra UI + DB |
| AC8 | Tạo kỳ mới kế thừa đúng các mục `Còn hiệu lực` của kỳ trước, không kế thừa mục `Đã đóng` | So sánh 2 kỳ |
| AC9 | Bảng theo dõi đến hạn hiển thị đúng mục quá hạn theo `monitoring_frequency` | Dữ liệu seed có mục quá hạn và chưa quá hạn |
| AC10 | Mọi chuyển trạng thái ghi `AuditLog` đủ ai/khi nào/trước→sau/lý do | Xem nhật ký sau chuỗi thao tác |
| AC11 | M17 tạo `ReviewPlan` cho năm chưa có kỳ bối cảnh `Đã phê duyệt` ⇒ hiện cảnh báo mềm, **không** chặn | Thử 2 chiều (có/không có kỳ) |

## 5. NFR

- **Ghi vết**: `AuditLog` append-only, không API xóa/sửa.
- **Bất biến hồ sơ**: kỳ `Đã phê duyệt`/`Hết hiệu lực` không có đường ghi nào trong server action.
- **Phân quyền**: kiểm tra vai trò ở **server action**, không chỉ ẩn nút ở UI.
- **Truy vết chéo**: `risk_refs` sang M01 lưu bằng khóa ngoại thật khi M01 đã có trên nền tảng
  (M01 đã ACTIVE ⇒ dùng FK thật, không lưu chuỗi tự do).
- **Ngôn ngữ**: toàn bộ nhãn/thông báo tiếng Việt; enum lưu tiếng Anh trong DB theo khuôn M16/M17.
- **Hiệu năng**: danh sách kỳ và tab vấn đề/bên quan tâm phân trang ≥ 50 dòng/trang; tính "đến hạn"
  là **tính khi đọc** (derived), không lưu cột trạng thái quá hạn — thống nhất với M04/M17/M20.

## 6. Rủi ro của chính đặc tả này

| Rủi ro | Mức | Giảm nhẹ |
|---|---|---|
| Thủ tục `ETV.P25` khi ban hành khác đặc tả suy dẫn | **Cao** | BUILD chỉ nên bắt đầu sau khi chốt 6 câu hỏi ở DacTa mục 10; các quy tắc `[SUY DẪN]` gom vào `rules.ts` để sửa một chỗ |
| Biểu mẫu F25.01–F25.03 chưa ban hành ⇒ bản xuất không dùng làm hồ sơ chính thức được | Trung bình | Increment xuất biểu mẫu để sau cùng; trước đó dán nhãn "bản nháp nội bộ" |
| Chồng lấn với M01 (nhận diện rủi ro hai nơi) | Trung bình | M25 chỉ gắn liên kết, tuyệt đối không chấm điểm S/P/R |
| Chồng lấn với M26_TriThuc (cùng CAP-25) | Thấp | Ranh giới đã ghi ở DacTa mục 1 |
