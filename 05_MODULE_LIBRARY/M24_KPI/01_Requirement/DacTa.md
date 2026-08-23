# M24_KPI — Đặc tả yêu cầu

> Nguồn: `03_MANAGEMENT_SYSTEM/02_P/ETV.P24_QuanLyLuongThuong.md` (Thủ tục ETV.P24, lần ban hành
> 01, **Đã ban hành** — `doc_status: issued` — 30/11/2025, tên đầy đủ "Đánh giá Hiệu suất Công
> việc, Quản lý Công nhật và Chi trả Lương-Thưởng theo Mô hình 3P (KPI)"). **Lưu ý định vị**: tên
> MP24/M24 trong kiến trúc repo chỉ ghi ngắn gọn "KPI", nhưng nội dung ETV.P24 thực tế gồm 3 phần
> gắn chặt với nhau: quản lý công nhật (chấm công) → tính điểm KPI → chi trả lương-thưởng theo mô
> hình 3P — đúng như README module đã ghi sẵn "Đối tượng dữ liệu chính: Chỉ số KPI, lương 3P".
> Không phải trường hợp lệch chủ đề cần xử lý riêng — nguồn ETV.P24 là đúng thủ tục cho M24.

## 1. Mục tiêu module

Số hóa MP24 — quản lý công nhật (chấm công), xác lập và tính điểm KPI (hiệu quả + năng lực), và
chi trả lương-thưởng theo mô hình 3P (P1 vị trí + P2 hiệu quả + P3 năng lực), theo ISO 9001
§6.2/7.2/9.1/9.3/10 + ISO/IEC 17025 §6.2/7.2/7.7/8.4/8.9 + ISO 17034 §5.3/6.2/7.5/8.7.

## 2. Đối tượng dữ liệu chính

| Đối tượng | Mô tả | Biểu mẫu |
|---|---|---|
| `AttendanceRecord` | Bảng theo dõi chấm công (công nhật) | F24.01 |
| `KPIRecord` | Điểm KPI hiệu quả + năng lực theo kỳ | — (nhúng F24.02) |
| `SalaryRecord` | Bảng theo dõi lương/thưởng (3P) | F24.02 |
| `SalaryDecision` | Quyết định lương, thưởng | F24.03 |

### 2.1. `AttendanceRecord` (F24.01)

`employee_ref`, `date`, `type` (LV/NN/CP/KP/LT/CT/NL — 7 loại hình, xem bảng 2.4),
`check_in_time` (GPS geofence bắt buộc tại trụ sở ETV; ≤08:00 ghi 08:00, >08:00 ghi theo thời
điểm thực), `check_out_time` (tự động 17:30, không cần check-out thủ công), `approved_by` (LĐP),
`monthly_summary` (số ngày LV/CP/KP/LT/CT), `time_coefficient` (= ngày LV hợp lệ / ngày làm việc
chuẩn tháng), `locked` (bool, khóa sau khi tính toán xong).

### 2.2. `KPIRecord`

`employee_ref`, `period` (tháng/quý/năm), `level` (Viện/Phòng/Cá nhân), `criteria[]` (KPI hiệu
quả/KPI năng lực/KPI chất lượng/KPI tuân thủ), `weight` (3=quan trọng, 2=trung bình, 1=đơn
giản), `data_sources[]` (← BG/HĐ/PNT/BBĐL/GCN từ M07/M09/M11), `performance_score_raw` (=
Σ(số lượng công việc × trọng số)), `performance_score_percent` (= điểm thực hiện/điểm chuẩn ×
100%), `competency_score_percent` (= năng lực thực hiện/điểm chuẩn × 100%), `verified_by` (LĐP,
đối chiếu hồ sơ gốc).

### 2.3. `SalaryRecord` (F24.02) / `SalaryDecision` (F24.03)

`employee_ref`, `period`, `attendance_ref` (→ 2.1), `kpi_ref` (→ 2.2), `p1_position_salary` (=
mức lương HĐ × hệ số ngạch/bậc), `p2_performance_salary` (= công thức nếu HQ ≥ yêu cầu, ngược
lại = 0), `p3_competency_salary` (= công thức nếu NL ≥ yêu cầu, ngược lại = 0), `allowance`,
`bonus`, `total_salary` (= P1+P2+P3+phụ cấp+thưởng), `status`
(Nháp/Đề nghị LĐP/Soát xét/Xác nhận NLĐ/Phê duyệt/Ghi nhận-chốt), `employee_confirmed_at`
(tự động Đồng ý sau 4h nếu không phản hồi), `approved_by` (LĐV).

### 2.4. 7 loại hình công nhật (bắt buộc đủ, không rút gọn)

| Ký hiệu | Loại hình | Tính ngày công | Ảnh hưởng KPI |
|---|---|---|---|
| LV | Ngày làm việc (T2–T7) | Có | Tích cực |
| NN | Ngày nghỉ (Chủ nhật) | Không | Trung lập |
| CP | Nghỉ có phép | Có (hợp lệ) | Trung lập |
| KP | Nghỉ không phép | Không | Giảm mạnh |
| LT | Làm thêm giờ | Có | Tích cực |
| CT | Công tác | Có | Tích cực |
| NL | Nghỉ lễ | Có | Trung lập |

## 3. Vai trò

| Vai trò | Trách nhiệm chính |
|---|---|
| LĐV | Ban hành mục tiêu chất lượng + định hướng KPI toàn Viện; phê duyệt hệ thống KPI + cơ chế 3P; xem xét KPI định kỳ; phê duyệt cuối bảng lương/thưởng |
| LĐP | Xây dựng/đề xuất KPI phòng (tiêu chí, trọng số, mục tiêu); giám sát + đánh giá KPI cá nhân; kiểm tra tính đầy đủ/chính xác dữ liệu; phê duyệt chấm công; soát xét bảng lương; đề xuất đào tạo khi năng lực chưa đạt |
| Lãnh đạo Văn phòng | Tính lương/thưởng theo đúng công thức; kiểm soát rủi ro chi phí tiền lương; lưu hồ sơ phục vụ quyết toán/kiểm toán |
| Nhân viên | Thực hiện công việc đúng vai trò/quy trình; ghi nhận dữ liệu KPI đầy đủ/kịp thời/có bằng chứng; xác nhận đồng ý/không đồng ý bảng lương |

## 4. Quy tắc nghiệp vụ

1. Check-in bắt buộc hằng ngày kèm **GPS geofence tại trụ sở ETV** — không ghi nhận công nếu
   check-in ngoài phạm vi định vị.
2. Check-in ≤08:00 → ghi nhận 08:00; check-in muộn hơn → ghi theo thời điểm thực tế check-in —
   không làm tròn ngược lại 08:00 khi đến muộn.
3. `AttendanceRecord` sau khi khóa sổ tháng (`locked = true`) **không được chỉnh sửa** — mọi điều
   chỉnh sau khóa sổ phải qua quy trình riêng (ngoài phạm vi thủ tục này, chưa quy định).
4. `time_coefficient` (hệ số thời gian) phải **≥ 95%** mới đủ điều kiện chi P2/P3 — dưới ngưỡng
   này chặn tính lương hiệu quả/năng lực dù điểm KPI có đạt.
5. `KPIRecord` bắt buộc dữ liệu có nguồn gốc từ hồ sơ thật trên ManLab (BG/HĐ/PNT/BBĐL/GCN) —
   không chấp nhận điểm KPI không có bằng chứng liên kết (`data_sources[]` rỗng chặn xác thực).
6. LĐP phải **xác thực** (đối chiếu hồ sơ gốc) trước khi điểm KPI được dùng để tính lương — không
   tự động tính P2/P3 từ dữ liệu KPI chưa qua xác thực.
7. `p2_performance_salary = 0` nếu hiệu quả (HQ) chưa đạt yêu cầu tối thiểu; `p3_competency_salary
   = 0` nếu năng lực (NL) chưa đạt yêu cầu tối thiểu — không chi trả một phần khi dưới ngưỡng.
8. Quy trình phê duyệt lương/thưởng bắt buộc đủ 6 bước theo đúng thứ tự: Nháp (lập bảng) → Đề
   nghị LĐP → Soát xét (LĐP) → Xác nhận NLĐ (tự động Đồng ý sau 4h không phản hồi) → Phê duyệt
   (LĐV) → Ghi nhận (chốt số liệu, không cho sửa) — không bỏ qua bước Xác nhận NLĐ.
9. Không có KPI hợp lệ → không chi P2/P3; KPI không có bằng chứng → không công nhận chi phí; phụ
   cấp/thưởng không có căn cứ → loại khỏi chi phí — 3 quy tắc kiểm soát rủi ro bắt buộc áp dụng
   trước khi cho phê duyệt.
10. Dữ liệu thiếu hoặc sai phát hiện ở bất kỳ bước nào → **yêu cầu điều chỉnh trước khi phê
    duyệt**, không cho phê duyệt tạm rồi sửa sau.
11. Hồ sơ (bảng KPI, bảng lương/thưởng, dữ liệu chấm công, hồ sơ đối chiếu/giải trình) lưu theo
    **ETV.P15** (kiểm soát hồ sơ) và **ETV.P14** (kiểm soát tài liệu).

## 5. Liên kết

Quy trình: MP24 · Năng lực: CAP-16 · Thủ tục gốc: `ETV.P24_QuanLyLuongThuong.md` (Đã ban hành,
lần 01) · Biểu mẫu: F24.01 (chấm công), F24.02 (lương/thưởng), F24.03 (quyết định lương/thưởng)
· Lưu hồ sơ: ETV.P15, ETV.P14 · Liên quan: M07 (nguồn dữ liệu BG/HĐ cho KPI hiệu quả), M09/M11
(nguồn dữ liệu PNT/BBĐL/GCN cho KPI hiệu quả), M03 (hồ sơ nhân sự/hợp đồng lao động — mức lương
HĐ dùng tính P1) · Căn cứ: ISO 9001:2015 §6.2/7.2/9.1/9.3/10, ISO/IEC 17025:2017
§6.2/7.2/7.7/8.4/8.9, ISO 17034:2016 §5.3/6.2/7.5/8.7.
