# M28_ATTT — OUTCOME + VERIFY (work-id 20260826-build-m28-isms)

**Chế độ**: BUILD · **Tier**: M — thêm 8 bảng vào schema dùng chung, thêm module vào registry, 4 state
machine. **Không** phải Tier L: không đụng authentication, không đụng ma trận phân quyền (vai trò
`TP/QTHT/ATTT/QLCL/VP/LDV` đã có sẵn từ M27, M33), không migration phá huỷ dữ liệu.

## Vì sao làm bây giờ, và vì sao phải sau M27

`ETV.P28` mục 6.3 và quy tắc **R1** yêu cầu mỗi rủi ro an toàn thông tin phải gắn với ít nhất một tài
sản **có thật trong danh mục M27**. Trước ngày 26/08/2026 điều kiện này không thực thi được nên câu
hỏi mở số 3 của đặc tả đề nghị hạ R1 xuống cảnh báo mềm. M27 lên nền tảng cùng ngày đã gỡ nút đó:
`actions.ts` truy vấn danh mục, đếm số mã tài sản thực sự tồn tại và đang sử dụng, rồi truyền vào
rule — **R1 nay là chặn cứng thật**, không phải cảnh báo.

Nếu làm ngược thứ tự, SoA sẽ có kiểm soát ghi "Áp dụng" mà không chứng minh được kiểm kê tài sản
theo ISO/IEC 27001 **A.5.9** — đúng thứ mà đoàn đánh giá hỏi đầu tiên.

## Phạm vi đã làm

Cả bốn dòng nghiệp vụ của ISMS, với **toàn bộ 21 quy tắc R1–R21** ở tầng server action:

| Dòng nghiệp vụ | Thực thể | Quy tắc chính |
|---|---|---|
| Đánh giá và xử lý rủi ro | `M28SecurityRisk`, `M28RiskTreatment` | R1–R6, R12, R13 |
| Tuyên bố áp dụng | `M28SoAVersion`, `M28SoAControl` | R7, R8, R9 |
| Sự cố an toàn thông tin | `M28SecurityIncident` | R10, R14, R15, R20 |
| Quyền truy cập | `M28AccessRequest`, `M28AccessReview` | R16–R19 |

## Quyết định thiết kế đáng ghi lại

1. **Rule thuần hàm, dữ liệu liên module truyền vào.** Nền tảng không dùng FK chéo module, nên
   `actions.ts` truy vấn M27 rồi truyền `assetsExist` vào `validateRiskInput`. Rule không import
   prisma — nhờ vậy 47 test chạy được không cần Postgres.
2. **SoA chỉ lưu mã kiểm soát.** `annexAControlCodes()` sinh 93 mã theo bốn chủ đề, **không kèm tên
   và diễn giải**: chép nội dung tiêu chuẩn có bản quyền vào cơ sở dữ liệu bị chính ETV.P28 mục 6.6
   cấm. Giao diện nhắc lại điều này ngay trên trang SoA.
3. **R9 là cảnh báo, không chặn.** Kiểm soát "Áp dụng" quá hạn cam kết mà chưa có bằng chứng thì phải
   lập KPH theo ETV.P13 — nhưng thủ tục không nói chặn thao tác, nên module chỉ nêu đích danh các
   dòng vi phạm để không trôi.
4. **Điều kiện đóng sự cố xếp lớp.** R15 kiểm bài học kinh nghiệm trước, rồi mới tới nghĩa vụ thông
   báo; và trước cả hai là R20 (người liên quan không được tự đóng) cùng R14 (hiệu lực kết quả đo).
   Thứ tự này khiến người dùng sửa từng thiếu sót một thay vì nhận một danh sách lỗi khó đọc.

## Kết quả

Trạng thái dùng đúng 5 giá trị: `PASS / FAIL / NOT RUN / NOT APPLICABLE / BLOCKED`.

| # | Hạng mục | Trạng thái | Bằng chứng |
|---|---|---|---|
| 1 | Schema hợp lệ | **PASS** | `prisma validate` → "The schema at prisma/schema.prisma is valid 🚀" |
| 2 | Migration **chỉ thêm**, không phá huỷ dữ liệu | **PASS** | `20260826151413_m28_attt/migration.sql`: 8 `CREATE TABLE`, **0** kết quả khi grep `DROP\|ALTER COLUMN\|DELETE FROM\|TRUNCATE` |
| 3 | Typecheck | **PASS** | `tsc --noEmit` — 0 lỗi trong `src/lib/m28` và `modules/M28`; lỗi `layout.tsx LayoutProps` có sẵn từ trước, ngoài phạm vi |
| 4 | Lint | **PASS** | `eslint src/lib/m28 "src/app/(platform)/modules/M28"` — không cảnh báo |
| 5 | Unit test rules | **PASS** | 47 test mới, phủ R1–R21 |
| 6 | Toàn bộ test nền tảng không hồi quy | **PASS** | `npm test` → 21 file, **422 test** đều xanh |
| 7 | Seed chạy sạch | **PASS** | M28 `ACTIVE` · 3 rủi ro · 3 hạng mục RTP · SoA **93 kiểm soát, 3 loại trừ** · 1 sự cố · 1 phiếu quyền · 1 đợt rà soát |
| 8 | `validate_links.py` | **PASS** | 564 link · 46 MP · 38 M · 22 CAP — 0 vấn đề |
| 9 | `validate_citations.py --chan` | **PASS** | 824 trích dẫn điều khoản — 0 hỏng |

## Một lỗi chỉ lộ ra khi chạy thật — và một kết luận suýt sai

`tsc` và `eslint` **đều xanh**, nhưng bấm "Đóng sự cố" thì trang gãy với lỗi runtime của Next.js:
*A "use server" file can only export async functions*. Nguyên nhân: `actions.ts` còn dòng
`export { ANNEX_A_CONTROL_COUNT }` — export một hằng số từ file `"use server"` là bất hợp lệ.

Đáng ghi lại hơn cả lỗi: **suýt nữa kết luận sai**. Kiểm tra cơ sở dữ liệu thấy sự cố vẫn ở
`CHO_KET_LUAN`, không có bản ghi nhật ký — thoạt nhìn đúng như R15 đã chặn. Thực ra server action đã
**crash**, rule chưa từng chạy. Nếu chỉ kiểm bằng cách nhìn trạng thái cơ sở dữ liệu thì đã báo PASS
cho một đường dẫn hỏng. Bài học: trạng thái "không thay đổi" là bằng chứng **yếu** — phải xem cả
thông báo lỗi trả về và console.

Sau khi sửa, kiểm lại đúng cách:

| Thao tác | Kết quả |
|---|---|
| Bấm "Đóng sự cố" (mức Cao, chưa có bài học) | Chặn: *"Sự cố mức Cao trở lên chỉ được đóng khi đã lập phiếu bài học kinh nghiệm theo ETV.P26 (R15; ETV.P28 mục 6.8.2 bước 6)."* |
| Điền bài học rồi đóng lại | Quy tắc **tiếp theo** lộ ra: *"Sự cố liên quan dữ liệu khách hàng hoặc dữ liệu cá nhân: phải hoàn tất nghĩa vụ thông báo và lưu bằng chứng gửi/nhận trước khi đóng (R15; ETV.P28 mục 6.8.3)."* |

Hai quy tắc bắn tuần tự, đều kèm điều khoản — chứng minh gate nằm ở server action chứ không ở giao diện.

## Verify trên ứng dụng thật

Chạy trên **cơ sở dữ liệu tạm `aios_platform_m28`** riêng, không đụng cơ sở dữ liệu dev đang mở của
người dùng. Đăng nhập vai trò **LĐV**:

| Hạng mục | Trạng thái | Quan sát được |
|---|---|---|
| Module trong menu, nhóm `CONG_NGHE`, chấm xanh ACTIVE | **PASS** | Sidebar: "M28 Quản lý an toàn thông tin" |
| Banner căn cứ | **PASS** | "ETV.P28 · lần ban hành 02 · ngày 26/08/2026 · **Đang hiệu lực**" + 4 biểu mẫu F28.01–04 |
| Chấm điểm rủi ro (R2) | **PASS** | RR-002: "Bí mật 3 · Toàn vẹn 5 · Sẵn sàng 5" → "T lấy giá trị lớn nhất = 5"; "K 4 × T 5 = 20 — mức Rất cao"; "Hạn xử lý tối đa: 3 tháng" |
| R12 — đầu vào ETV.P31 | **PASS** | RR-002 (`impactA = 5`) gắn nhãn "Đầu vào bắt buộc của ETV.P31" |
| R13 — quá hạn rà soát | **PASS** | RR-003 gắn cờ "Quá hạn rà soát"; trang chính cảnh báo "1 rủi ro quá 12 tháng chưa rà soát" |
| R1 — liên kết tài sản M27 | **PASS** | Form khai báo rủi ro hiện đúng 3 tài sản thật của M27 để chọn |
| SoA | **PASS** | 93 kiểm soát "đủ Phụ lục A" · 90 Áp dụng (70 có bằng chứng) · 3 Loại trừ "đều có lý do" · **6 quá hạn bằng chứng** nêu đích danh A.8.12–A.8.17 |
| R15 — chặn đóng sự cố | **PASS** | Xem bảng ở mục trên |

## Chưa verify — nêu rõ, không quy tròn thành xong

| Hạng mục | Trạng thái | Vì sao |
|---|---|---|
| Thao tác trên phiếu quyền truy cập ở giao diện | **NOT RUN** | Server action và test đã đủ (R16–R19), nhưng trang `/access` mới chỉ đọc — chưa có nút trình duyệt/phê duyệt/thực hiện/thu hồi |
| R17 — chặn PT.ATTT duyệt quyền đặc quyền, trên giao diện | **PASS (unit)** · **NOT RUN (UI)** | Có test; chưa thao tác hai chiều trên màn hình |
| R20 — người liên quan không được đóng sự cố | **PASS (unit)** · **NOT RUN (UI)** | `involvedUserIds` hiện mới lấy từ người báo cáo; cần trường ghi người gây ra sự cố khi có kết luận điều tra |
| Xuất PDF F28.01–F28.04 | **NOT APPLICABLE** | Ngoài phạm vi lần này |
| Trang chỉ số ISMS 06 tháng/lần cho ETV.P17 | **NOT APPLICABLE** | Ngoài phạm vi lần này; số liệu thô đã có trên trang chính |

## Nợ kỹ thuật đã ghi trong mã

- `loadIncidentForRules` suy `involvedUserIds` từ người báo cáo. Khi bổ sung trường ghi người gây ra
  sự cố trong kết luận điều tra, đây là **chỗ duy nhất** phải sửa để R20 phản ánh đúng thực tế.
- `notifications` của sự cố lưu dạng `Json`. Nếu nghiệp vụ cần truy vấn theo đối tượng nhận hoặc
  theo hạn thông báo, phải tách thành bảng riêng.
