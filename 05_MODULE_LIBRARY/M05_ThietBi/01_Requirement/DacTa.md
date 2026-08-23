# M05_ThietBi — Đặc tả yêu cầu

> Nguồn: `03_MANAGEMENT_SYSTEM/02_P/ETV.P05_ThietBi.md` (Thủ tục ETV.P05, lần ban hành 03,
> **Đã phê duyệt** 21/07/2026). **Lưu ý phạm vi số hóa biểu mẫu**: chỉ 10/16 biểu mẫu có nguồn
> đọc được tại thời điểm ban hành (F05.01–F05.10); 6 biểu mẫu liên kết chuẩn đo lường mới
> (F05.11–F05.16) chưa có file nguồn — DacTa.md này đặc tả đủ theo NỘI DUNG thủ tục (đã mô tả rõ
> ràng), không chờ đủ biểu mẫu mới viết.

## 1. Mục tiêu module

Số hóa MP05 — quản lý danh mục, sử dụng, bảo quản, hiệu chuẩn/kiểm tra trung gian và **thiết
lập liên kết chuẩn đo lường (traceability)** cho thiết bị/chuẩn đo lường/chất chuẩn/hóa chất,
theo ISO/IEC 17025 §6.4–§6.5 + Luật Đo lường 04/2011/QH13 + NĐ 105/2016, NĐ 154/2018/NĐ-CP.

**Đây chính là "Danh mục Phương tiện đo" mà M21_CongBoNangLuc cần tích hợp thật** (hiện M21 đang
dùng dữ liệu nhúng tĩnh `catalog.ts` do M05 chưa có backend — xem M21 spec.md Quyết định phạm
vi #1). Khi M05 được xây dựng thật, đây là điểm ưu tiên tích hợp lại M21.

## 2. Đối tượng dữ liệu chính

| Đối tượng | Mô tả | Biểu mẫu |
|---|---|---|
| `Equipment` | Thiết bị/chuẩn đo lường (danh mục + phiếu theo dõi) | F05.01, F05.02 |
| `UsageLog` | Nhật ký sử dụng thiết bị | F05.03 |
| `CalibrationPlan` | Kế hoạch hiệu chuẩn/bảo dưỡng/kiểm tra hằng năm | F05.04 |
| `CalibrationResult` | Kết quả hiệu chuẩn/bảo dưỡng/kiểm tra | F05.05 |
| `Chemical` / `ReferenceMaterial` | Hóa chất / chất chuẩn (khí chuẩn, dung dịch chuẩn) | F05.06–F05.10 |
| `TraceabilityMatrix` | Ma trận liên kết chuẩn theo phương pháp/đại lượng | F05.14 |
| `CertificateReview` | Rà soát chấp nhận CoC/CoA | F05.15 |
| `IntermediateCheck` | Kế hoạch + biên bản kiểm tra trung gian (IC) | F05.16 |

### 2.1. `Equipment`

`code` (mã quản lý = viết tắt lĩnh vực + 2 số, vd `IRS-01`), `name`, `field` (lĩnh vực đo lường),
`group` (nhóm 1/nhóm 2 theo Luật Đo lường), `status` (Đang dùng/Đang hiệu chuẩn/Hỏng-cách
ly/Thanh lý), `qr_code`, `location`, `certificate_ref`, `next_calibration_due` (**cảnh báo trước
≥30 ngày**).

### 2.2. `TraceabilityMatrix` (mục 6.4, cốt lõi nghiệp vụ của module)

`method_ref` (phương pháp/đại lượng), `measurement_range`, `dut_ref`, `working_standard_ref`,
`reference_standard_ref`, `provider_ref` (← M06, trong danh mục được phê duyệt), `U`, `k`,
`calibration_cycle`, `ic_schedule`, `coc_coa_link`.

### 2.3. `CertificateReview`

`certificate_no`, `issuer`, `accreditation_status`, `range_covered`, `U`/`k`/`method` có đầy đủ,
`traceability_statement`, `valid_until`, `conclusion` (enum: **Chấp nhận / Có điều kiện / Không
chấp nhận**).

### 2.4. `IntermediateCheck`

`equipment_ref`, `scheduled_at`, `result`, `control_limit`, `within_limit` (bool) — **vượt giới
hạn → tự động chuyển Equipment.status = Hỏng-cách ly** (quy tắc 4).

## 3. Vai trò

| Vai trò | Trách nhiệm chính |
|---|---|
| LĐV | Phê duyệt `CalibrationPlan` hằng năm; phê duyệt đề nghị sửa chữa/thanh lý qua tổ chức bên ngoài |
| TP (Lãnh đạo PTN) | Duy trì/bảo quản/sử dụng chuẩn đo lường; soát xét kế hoạch hiệu chuẩn + đề nghị mua; tổ chức phân công |
| QLKT | Lập danh mục/mã quản lý; **phê duyệt `TraceabilityMatrix`, `CertificateReview`, `IntermediateCheck`**; đánh giá kết quả hiệu chuẩn |
| Nhân sự được phân công | Thực hiện kiểm soát, ghi chép, phát hiện & báo cáo sự cố |
| QLCL | Theo dõi tuân thủ; kiểm soát hồ sơ theo ETV.P15 |

## 4. Quy tắc nghiệp vụ

1. Chuẩn đo lường **hết hạn/hết hiệu lực chứng nhận không được sử dụng** — chặn cứng, không chỉ
   cảnh báo.
2. Gia hạn/chứng nhận lại phải hoàn tất **trước hạn ≥ 1 tháng** (cả nhóm 1, nhóm 2, chất chuẩn
   hóa học).
3. Chỉ kiểm định viên/hiệu chuẩn viên/thử nghiệm viên đã được chứng nhận + ETV phân công mới
   được sử dụng chuẩn đo lường tương ứng.
4. `IntermediateCheck` vượt giới hạn kiểm soát → **ngừng sử dụng ngay**, dán nhãn tình trạng,
   đánh giá ảnh hưởng tới kết quả đã phát hành trước đó, xử lý theo **M13 (KhacPhuc)**.
5. `CertificateReview.conclusion = Không chấp nhận` → CoC/CoA không được dùng làm bằng chứng
   liên kết chuẩn cho `TraceabilityMatrix`.
6. Chu kỳ hiệu chuẩn xác định **theo rủi ro** (mức sử dụng, lịch sử trôi, tầm quan trọng phép đo,
   kết quả IC) — không phải hằng số cố định; rút ngắn khi có dấu hiệu suy giảm.
7. Nhà cung cấp dịch vụ hiệu chuẩn/CRM phải nằm trong danh mục **đã được phê duyệt** (← M06),
   ưu tiên tổ chức được công nhận ISO/IEC 17025 (hiệu chuẩn) / ISO 17034 (CRM).
8. Thiết bị hỏng/mất độ chính xác → xử lý theo **M13**, dán nhãn cảnh báo trong thời gian sửa
   chữa; chỉ dùng lại khi có đầy đủ bằng chứng độ chính xác/tin cậy.
9. Hóa chất/chất chuẩn hết hạn không được dùng trực tiếp — có thể kiểm tra xác nhận còn đảm bảo
   kỹ thuật (theo hướng dẫn riêng) hoặc phải thanh lý.
10. Hồ sơ liên kết chuẩn (chứng chỉ, ma trận, IC, đánh giá rủi ro chu kỳ) lưu theo **ETV.P15**,
    tối thiểu bằng thời hạn hiệu lực của quyết định chứng nhận gần nhất.

## 5. Liên kết

Quy trình: MP05 · Năng lực: CAP-05_ThietBi · Thủ tục gốc: `ETV.P05_ThietBi.md` (Đã phê duyệt,
lần 03) · Biểu mẫu: F05.01–F05.16 (10/16 đã số hóa) · Lưu hồ sơ: ETV.P15 · Liên quan: M04 (điều
kiện bảo quản), M06 (danh mục nhà cung cấp hiệu chuẩn/CRM được phê duyệt), M13 (xử lý thiết bị
hỏng/IC vượt giới hạn), **M21 (Danh mục PTĐ dùng chung với công bố năng lực — điểm tích hợp ưu
tiên)** · Căn cứ: ISO 9001 §7.1.5, ISO/IEC 17025 §6.4/§6.5/§7.6, ISO 17034:2016, Luật Đo lường
04/2011/QH13, NĐ 105/2016/NĐ-CP, NĐ 154/2018/NĐ-CP, TT 24/2013/TT-BKHCN, ILAC P10, JCGM 200:2012.
