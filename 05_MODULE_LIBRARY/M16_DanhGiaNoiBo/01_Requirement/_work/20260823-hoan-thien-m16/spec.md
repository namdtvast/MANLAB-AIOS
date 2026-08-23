# M16_DanhGiaNoiBo — Đặc tả hoàn thiện theo DacTa (Increment 13, aios-platform)

Tiếp nối Increment 8 (`_work/20260823-xay-moi-m16/`) — bản đó chỉ cài 3 gate chính (duyệt kế
hoạch 2 cấp, thời hạn thông báo 7 ngày, vai trò tạo báo cáo). Increment này đóng các quy tắc còn
lại của `01_Requirement/DacTa.md` mà lúc đó phải hoãn vì **M03/M13 chưa có backend thật** — nay
đã có (Increment 5 và 12).

## OUTCOME

- **WHO**: QLCL (công nhận năng lực đánh giá viên, lập chương trình), Đánh giá viên (ghi phát
  hiện, nêu ý kiến bảo lưu), Trưởng đoàn (kết luận cuối, ý kiến bảo lưu), **Trưởng bộ phận được
  đánh giá** (nhận kết quả, phân tích nguyên nhân, đề xuất CAPA — vai trò chưa có action nào ở
  Increment 8), LĐP (thẩm tra sau khắc phục, đóng chương trình hoặc đề xuất đánh giá bổ sung).
- **WHAT**: (1) đăng ký năng lực đánh giá viên dựa trên **hồ sơ đào tạo thật của M03**, gate cứng
  khi xác nhận chương trình; (2) cảnh báo mềm mốc 2 tuần; (3) ghi ý kiến bảo lưu trên báo cáo;
  (4) phát hiện KPH → **tạo hồ sơ M13 thật** thay cho `capaRef` chuỗi tự do; (5) LĐP thẩm tra +
  đóng chương trình hoặc đề xuất đánh giá bổ sung.
- **WHY**: quy tắc 1, 2, 3, 6, 7 của ETV.P16 (lần 03, Đã phê duyệt) hiện chưa được hiện thực —
  DacTa mục 4 ghi rõ quy tắc 1 phải "validate khi phân công, không chỉ là ghi chú", quy tắc 6 ghi
  "mọi phát hiện Không phù hợp phải dẫn tới đề xuất hành động khắc phục qua M13".
- **SUCCESS CRITERIA** (verify qua Browser với tài khoản vai trò thật):
  1. Chương trình có thành viên **chưa đủ năng lực** → bị chặn xác nhận, nêu đúng người thiếu gì.
  2. Công nhận năng lực bằng hồ sơ đào tạo **chưa Đạt** của M03 → bị chặn ở server.
  3. Trưởng bộ phận đề xuất CAPA từ phát hiện KPH → sinh hồ sơ KPH thật trong M13, mở được từ M13.
  4. LĐP đóng chương trình khi còn phát hiện KPH chưa khắc phục xong → bị chặn.
  5. Ngày đánh giá còn 7–13 ngày → hiện cảnh báo mềm, **không** chặn.

## Ánh xạ quy tắc DacTa → thiết kế

| Quy tắc ETV.P16 | Increment 8 | Increment 13 (bản này) |
|---|---|---|
| 1. Năng lực đánh giá viên — validate khi phân công | ❌ chỉ tên tự do | `M16AuditorQualification` + gate xác nhận chương trình |
| 2. Thông báo ≥1 tuần; nhắc đoàn ≥2 tuần | ✅ gate 7 ngày / ❌ mốc 2 tuần | thêm cảnh báo mềm 7–13 ngày |
| 3. Kết luận trưởng đoàn là cuối cùng, ý kiến khác **bảo lưu** | ✅ gate vai trò / ❌ chưa lưu ý kiến bảo lưu | `M16ReportDissent` |
| 4. Báo cáo ≤1 tuần làm việc — cảnh báo | ✅ đã có | không đổi |
| 5. Ảnh hưởng kết quả đã phát hành → thông báo KH + thu hồi (→ M11) | ❌ | **vẫn ngoài phạm vi** — M11 chưa xây |
| 6. KPH → CAPA qua M13, LĐP kiểm tra lại trước khi coi là đóng | ❌ `capaRef` tự do | FK thật `ncwId` → `M13NonconformingWork` |
| 7. Sau khắc phục LĐP thẩm tra, có thể đề xuất đánh giá bổ sung | ❌ | đóng chương trình có gate + đề xuất đánh giá bổ sung |
| 8. Lưu hồ sơ theo ETV.P15 | — | không đổi (chưa có M15) |

## Data model — bổ sung (additive)

### `M16AuditorQualification` (mới) — quy tắc 1

`employeeId` (FK **`M03Employee`**), `qualType` (`ISO_17025` / `DANH_GIA_NOI_BO` /
`KINH_NGHIEM_TRUONG_DOAN`), `trainingRecordId?` (FK **`M03TrainingRecord`**), `note?`,
`recognizedById` (FK User), `recognizedAt`. `@@unique([employeeId, qualType])`.

Server **kiểm tra thật** khi công nhận: hồ sơ đào tạo phải thuộc đúng nhân sự đó, `result = DAT`,
`status = APPROVED` — không có cờ "đã đào tạo" tự khai. Loại `KINH_NGHIEM_TRUONG_DOAN` không có hồ
sơ tương ứng trong M03 nên bắt buộc `note` (mô tả kinh nghiệm) thay cho `trainingRecordId`.

### `M16ProgramMember` (mới) + `M16AuditProgram.teamLeadEmployeeId` — nhân sự thật thay tên tự do

`M16ProgramMember(programId, employeeId)` `@@unique([programId, employeeId])`;
`teamLeadEmployeeId?` FK `M03Employee`.

`teamLeadName` / `teamMembers[]` **giữ nguyên** làm bản chụp tên tại thời điểm lập chương trình
(hồ sơ lưu theo ETV.P15 phải giữ tên đúng lúc đó, không đổi theo hồ sơ nhân sự sau này); FK mới
dùng để **validate năng lực**, không dùng để hiển thị lịch sử.

### `M16AuditFinding` — thêm trường (quy tắc 6)

`acknowledgedById?` + `acknowledgedAt?` (Trưởng bộ phận xác nhận đã nhận kết quả và thông báo tới
nhân viên), `rootCauseProposal?`, `ncwId?` (FK **`M13NonconformingWork`**, `@unique`).
`capaRef` cũ giữ lại cho dữ liệu lịch sử, đánh dấu deprecated trong schema, form mới không nhập.

### `M16ReportDissent` (mới) — quy tắc 3

`reportId` (FK `M16AuditReport`), `opinionBy` (tên thành viên nêu ý kiến), `opinion`,
`recordedById` (FK User), `createdAt`.

### `M16AuditProgram` — trạng thái `CLOSED` (quy tắc 7)

`M16ProgramStatus` thêm `CLOSED`; thêm `closedAt?`, `closedById?` (FK User), `closureNote?`.

### `M16AuditPlan.followUpOfProgramId?` (FK `M16AuditProgram`) — đánh giá bổ sung (quy tắc 7)

### `M13SourceType` — thêm giá trị `DANH_GIA_NOI_BO`

Thay đổi duy nhất chạm vào M13; additive, không đụng state machine M13. Hồ sơ KPH sinh từ M16 ghi
`sourceRef = <mã phát hiện>` và đi tiếp **đúng luồng M13** (đánh giá mức độ → phương án → thẩm
xét → đóng), M16 chỉ đọc trạng thái.

## Gate mới (AUTHORITATIVE ở `src/lib/m16/rules.ts`)

| Hành động | Vai trò | Điều kiện chặn |
|---|---|---|
| Công nhận năng lực | QLCL | ISO_17025/DANH_GIA_NOI_BO: bắt buộc hồ sơ đào tạo M03 `DAT`+`APPROVED` đúng nhân sự; KINH_NGHIEM_TRUONG_DOAN: bắt buộc `note` |
| Xác nhận chương trình | QLCL/LĐP | (giữ) `auditDate` ≥ 7 ngày **+ (mới)** mọi thành viên đủ `ISO_17025` **và** `DANH_GIA_NOI_BO`; trưởng đoàn thêm `KINH_NGHIEM_TRUONG_DOAN`; bắt buộc đã gán trưởng đoàn là nhân sự thật |
| Xác nhận đã nhận kết quả phát hiện | TRUONGBOPHAN | chỉ phát hiện `KHONG_PHU_HOP` |
| Đề xuất CAPA (→ tạo KPH ở M13) | TRUONGBOPHAN | phải `KHONG_PHU_HOP`, đã xác nhận nhận kết quả, chưa có `ncwId`, bắt buộc `rootCauseProposal` |
| Ghi ý kiến bảo lưu | DANHGIAVIEN / TRUONGDOAN | bắt buộc nội dung + tên người nêu |
| Đóng chương trình | **LĐP** | phải `CONFIRMED`, có ≥1 báo cáo, **mọi** phát hiện KPH đã có `ncwId`, **mọi** hồ sơ M13 liên kết ở trạng thái `DA_KHAC_PHUC` |
| Đề xuất đánh giá bổ sung | LĐP / QLCL | bắt buộc lý do; tạo `M16AuditPlan` mới `isAdHoc=true`, `DRAFT`, liên kết ngược chương trình |

Cảnh báo mềm (không chặn): `auditDate` còn 7–13 ngày → "nhắc đoàn chuẩn bị ít nhất 2 tuần trước".

## Quyết định phạm vi (cần LĐP xác nhận lại)

1. **Năng lực = đăng ký có bằng chứng, không suy diễn tự động từ nội dung đào tạo.** M03 không có
   trường phân loại "đào tạo ISO/IEC 17025" hay "đào tạo đánh giá nội bộ"; nếu dò chuỗi trong
   `TrainingPlan.content` sẽ là suy diễn mong manh. Vì vậy QLCL **chọn hồ sơ đào tạo Đạt làm bằng
   chứng** cho từng loại năng lực, server kiểm tra hồ sơ đó có thật + Đạt + đúng người.
2. **`teamLeadName`/`teamMembers[]` giữ lại làm bản chụp tên**, không xoá — hồ sơ đánh giá lưu
   theo ETV.P15 cần tên tại thời điểm lập; FK mới chỉ phục vụ validate năng lực.
3. **Đóng chương trình là hành động của LĐP** (DacTa chỉ ghi "LĐP kiểm tra lại kết quả thực hiện
   trước khi coi là đóng" — không nói rõ ai bấm đóng, cũng không nói đóng cái gì; chọn đóng ở cấp
   **chương trình đánh giá** vì đó là đơn vị có đủ phát hiện + báo cáo).
4. **Trưởng bộ phận phải xác nhận đã nhận kết quả trước khi đề xuất CAPA** — suy ra từ thứ tự
   trách nhiệm trong DacTa mục 3 ("thông báo kết quả tới nhân viên; phân tích nguyên nhân; đề
   xuất CAPA"), DacTa không nói rõ đây là điều kiện bắt buộc.
5. **2 tài khoản demo mới** `danhgiavien@manlab.vn`, `truongbophan@manlab.vn` — vì `getActor()`
   lấy 1 vai trò/module/người, không thể gộp nhiều vai trò M16 vào 1 tài khoản để demo gate.

## Vẫn ngoài phạm vi

- Quy tắc 5 (thông báo khách hàng + thu hồi kết quả đã phát hành) — cần M11, chưa xây. M13 đã có
  `M13RevokedReport` nhưng đó là thu hồi phía M13, không thay thế luồng M11.
- Lưu hồ sơ theo ETV.P15 (quy tắc 8) — M15 chưa xây.
- Biểu mẫu in F16.01–F16.04 (chưa có bản mẫu trống trong `06_SHARED_RESOURCES`).
