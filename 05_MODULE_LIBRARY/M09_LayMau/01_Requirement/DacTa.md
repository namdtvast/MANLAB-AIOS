# M09_LayMau — Đặc tả yêu cầu

> Nguồn: `03_MANAGEMENT_SYSTEM/02_P/ETV.P09_LayMau.md` (Thủ tục ETV.P09, lần ban hành 02, **Đã
> phê duyệt** 21/07/2026). 0/5 biểu mẫu có nguồn — đặc tả dựa trên nội dung quy trình (đầy đủ,
> rõ ràng trong thân thủ tục), chưa chờ đủ biểu mẫu.

## 1. Mục tiêu module

Số hóa MP09 — lấy mẫu, xử lý và bảo quản mẫu môi trường (nước, đất, không khí, khí thải...) cho
dịch vụ quan trắc, đảm bảo tính đại diện/ổn định/truy xuất được, theo ISO/IEC 17025 §7.3/§7.4 +
Luật Bảo vệ môi trường 72/2020/QH14 + TT 10/2021/TT-BTNMT.

## 2. Đối tượng dữ liệu chính

| Đối tượng | Mô tả | Biểu mẫu |
|---|---|---|
| `SamplingPlan` | Kế hoạch lấy mẫu | F09.01 |
| `Sample` | Mẫu môi trường, định danh bằng QR | — |
| `SamplingLog` | Nhật ký lấy mẫu hiện trường | F09.03 |
| `HandoverRecord` | Biên bản giao nhận mẫu (hiện trường → PTN) | F09.02 |
| `PreservationAssessment` | Phiếu đánh giá điều kiện bảo quản/xử lý mẫu | F09.04 |
| `AnalysisRequest` | Phiếu yêu cầu phân tích | F09.05 |

### 2.1. `Sample`

`code` = `YYM-abcde` (YY = 2 số cuối năm phát hành, `abcde` = số thứ tự 00001–10000), `qr_code`
(liên kết `manlab.etv.org.vn`, ánh xạ loại mẫu/vị trí/chỉ tiêu/người lấy/phương pháp/bảo quản —
**bản thân mã không chứa các thông tin này**, chỉ là khóa tra cứu), `matrix_type` (nước
mặt/ngầm/thải, đất, khí, khí thải...), `sampling_location`, `sampled_at`, `sampled_by`,
`is_qc_sample` (mẫu lặp/mẫu trắng QA/QC).

### 2.2. `SamplingLog`

`field_conditions` (nhiệt độ, thời tiết, dòng chảy, mùi, màu), `quick_field_params` (pH, DO,
TDS, EC, nhiệt độ đo nhanh tại chỗ), `photo_refs[]`.

### 2.3. `HandoverRecord`

`received_at` (PTN), `temperature_at_receipt` (**phải ≤10°C**), `condition_ok` (bool — kiểm tra
tình trạng/nhãn/số lượng), `rejection_reason` (bắt buộc nếu `condition_ok = false`).

## 3. Vai trò

| Vai trò | Trách nhiệm chính |
|---|---|
| LĐV | Chủ sở hữu; phân công nhân sự, đảm bảo trang thiết bị/phương tiện lấy mẫu |
| Trung tâm Quan trắc và Chứng nhận phù hợp | Thực hiện kế hoạch lấy mẫu/xử lý/bảo quản đúng kỹ thuật |
| Cán bộ lấy mẫu | Thực hiện đầy đủ các bước lấy mẫu, ghi nhận, bảo quản |
| QLCL | Kiểm tra định kỳ quá trình lấy mẫu, lưu hồ sơ |

## 4. Quy tắc nghiệp vụ

1. Mỗi mẫu **bắt buộc** có `code`/QR duy nhất, dán ngay tại hiện trường trước khi rời vị trí lấy
   mẫu — không tạo hồ sơ phân tích cho mẫu không có mã.
2. QA/QC hiện trường: chương trình **< 30 mẫu** → lấy ≥1 mẫu lặp + ≥1 mẫu trắng hiện trường;
   chương trình **≥ 30 mẫu** → QA/QC ≥ 10% tổng số mẫu.
3. Vận chuyển mẫu về PTN **tối đa 24 giờ** (tùy chỉ tiêu cụ thể); dùng thùng cách nhiệt chuyên
   dụng.
4. Tiếp nhận tại PTN: `temperature_at_receipt > 10°C` HOẶC chai vỡ/mất nhãn → **không tiếp
   nhận**, lập biên bản xử lý (`condition_ok = false`, bắt buộc `rejection_reason`).
5. Mẫu quan sát thấy tạp chất lạ tại hiện trường (lá cây, mảnh vụn...) → loại bỏ và lấy lại,
   không tiếp tục sử dụng mẫu nhiễm bẩn.
6. Mỗi chỉ tiêu bảo quản trong chai/lọ riêng biệt theo đúng chất bảo quản yêu cầu (không gộp
   chung nhiều chỉ tiêu cần hóa chất bảo quản khác nhau vào 1 bình).
7. Mẫu sau phân tích lưu tối thiểu **7–30 ngày** (tùy loại mẫu) trước khi hủy.
8. Hồ sơ lấy mẫu/nhật ký/phiếu yêu cầu phân tích/biên bản giao mẫu lưu **tối thiểu 3 năm** theo
   ETV.P15.

## 5. Liên kết

Quy trình: MP09 · Năng lực: CAP-04_HienTruong, CAP-11_QuanTrac · Thủ tục gốc:
`ETV.P09_LayMau.md` (Đã phê duyệt, lần 02) · Biểu mẫu: F09.01–F09.05 (chưa có nguồn số hóa) ·
Lưu hồ sơ: ETV.P15 (tối thiểu 3 năm) · Liên quan: M04 (điều kiện bảo quản mẫu tại PTN), M07
(phiếu nhận-trả mẫu từ khách hàng), M11 (kết quả phân tích từ `AnalysisRequest`) · Căn cứ:
ISO/IEC 17025 §7.3/§7.4, Luật Bảo vệ môi trường 72/2020/QH14, NĐ 08/2022/NĐ-CP, NĐ
05/2025/NĐ-CP, TT 02/2022/TT-BTNMT, TT 10/2021/TT-BTNMT, TCVN 6663-1/6663-3, TCVN 5999:1995.
