# M23_CongBoCRM — Đặc tả yêu cầu

> Nguồn: `03_MANAGEMENT_SYSTEM/02_P/ETV.P23_CongBoCRM.md` (Thủ tục ETV.P23, lần ban hành 02, **Đã
> phê duyệt** 21/07/2026, tên đầy đủ "Công bố Giá trị Danh định và Độ không đảm bảo đo của Chất
> chuẩn"). 2/2 biểu mẫu áp dụng (`F23.01`, `F23.02`) **chưa số hóa** — nguồn không có file biểu
> mẫu rời, cần Phòng Kỹ thuật bổ sung (không tự suy diễn cấu trúc). Mục V (RACI) do AI tổng hợp
> từ mục "Phân công trách nhiệm" 6.6 của bản gốc, chưa được LĐP xác nhận.

## 1. Mục tiêu module

Số hóa MP23 — xác lập, đánh giá và **công bố chính thức** (chứng chỉ/phiếu công bố) giá trị danh
định và độ không đảm bảo đo (ĐKĐBĐ) của chất chuẩn do ETV sản xuất, theo ISO 17034 + ISO 33401 +
GUM. **Phân biệt với M19**: M19 là quy trình *sản xuất* (pha chế, đánh giá đồng nhất/ổn định
trong lô); M23 là bước *công bố giá trị* sau sản xuất — xử lý thống kê giá trị danh định cuối
cùng, tính ĐKĐBĐ tổng hợp, biên soạn chứng chỉ chính thức, và quy trình sửa đổi/thu hồi/cập nhật
định kỳ khi chất chuẩn đã lưu hành.

## 2. Đối tượng dữ liệu chính

| Đối tượng | Mô tả | Biểu mẫu |
|---|---|---|
| `MeasurementRecord` | Biên bản đo lường/dữ liệu đo phục vụ công bố | F23.01 |
| `AssignedValueCertificate` | Chứng chỉ chất chuẩn/phiếu công bố giá trị danh định + ĐKĐBĐ | F23.02 |
| `CertificateAmendment` | Biên bản sửa đổi/thu hồi công bố | — (nhúng F23.02) |

### 2.1. `MeasurementRecord` (F23.01)

`batch_ref` (← M19 `ProductionResult`), `purpose` (hiệu chuẩn/kiểm tra hiệu năng/thử nghiệm liên
phòng), `characteristic` (đặc tính công bố), `sample_count` (tối thiểu 10 mẫu đại diện),
`replicate_count`, `lab_participants[]` (nếu liên phòng), `raw_measurements[]`,
`statistical_summary` (trung bình/độ lệch chuẩn/kiểm tra phân bố), `homogeneity_ref`,
`stability_ref` (← M19, nếu là CRM).

### 2.2. `AssignedValueCertificate` (F23.02)

`product_name`, `batch_id`, `assigned_value`, `unit`, `expanded_uncertainty` (U, k=2),
`uncertainty_components[]` (chuẩn bị mẫu/quá trình đo/đồng nhất-ổn định/nguồn chuẩn/sai số hệ
thống), `analysis_method`, `traceability_info`, `storage_conditions`, `expiry_date`,
`approved_by` (Lãnh đạo kỹ thuật/Ủy ban chuyên môn), `issued_by` (bộ phận phát hành tài liệu),
`status` (Dự thảo/Chờ phê duyệt/Đã phát hành/Đã sửa đổi/Đã thu hồi), `superseded_by` (khi có bản
sửa đổi mới).

### 2.3. `CertificateAmendment`

`certificate_ref`, `reason` (sai sót giá trị công bố/kết quả đánh giá lại/dữ liệu không đủ tin
cậy), `action` (Sửa đổi/Thu hồi), `customer_notified` (bool, bắt buộc `true` nếu khách hàng đã
nhận sản phẩm), `new_certificate_ref`.

## 3. Vai trò (RACI — *do AI tổng hợp, cần LĐP xác nhận*)

| Vai trò | Trách nhiệm chính |
|---|---|
| Lãnh đạo kỹ thuật / Ủy ban chuyên môn | Xét duyệt nội bộ hồ sơ công bố trước khi phát hành chính thức; phê duyệt sửa đổi/thu hồi |
| Bộ phận kỹ thuật | Thu thập/xử lý dữ liệu đo; tính ĐKĐBĐ theo GUM; soạn chứng chỉ/phiếu công bố; đề xuất thử nghiệm bổ sung khi dữ liệu chưa đủ tin cậy |
| Bộ phận kiểm soát chất lượng (QLCL/ISO) | Cung cấp lại chứng chỉ/báo cáo gốc khi có yêu cầu truy xuất/khiếu nại; tham gia đánh giá nội bộ khi có tranh chấp |
| Bộ phận phát hành tài liệu | Phát hành/lưu trữ chứng chỉ trên ManLab; đính kèm sản phẩm khi cung cấp ra ngoài; cập nhật khi có thay đổi |

## 4. Quy tắc nghiệp vụ

1. `MeasurementRecord` bắt buộc tối thiểu **10 mẫu đại diện** từ cùng một lô — không công bố giá
   trị dựa trên cỡ mẫu nhỏ hơn khi chưa có lý do kỹ thuật ghi rõ.
2. Giá trị danh định (`assigned_value`) phải tính từ phương pháp thống kê đã xác định trước
   (trung bình có trọng số/trung bình đơn giản/robust) — không đổi phương pháp tính giữa các lô
   cùng loại chất chuẩn mà không ghi lý do.
3. `expanded_uncertainty` U = k·u với **k = 2** (≈95%) mặc định, trừ khi có quy định khác bằng
   văn bản — không tự đổi hệ số phủ tùy tiện (đồng nhất với quy tắc M18/M19).
4. `AssignedValueCertificate.status → Đã phát hành` chỉ khi đã qua **xét duyệt nội bộ** bởi Lãnh
   đạo kỹ thuật/Ủy ban chuyên môn — không phát hành trực tiếp từ Dự thảo.
5. Dữ liệu đo **không đủ tin cậy** (đồng nhất/ổn định không đạt, hoặc phân bố bất thường) → bắt
   buộc **tạm dừng công bố**, tổ chức đánh giá nguyên nhân, lập kế hoạch thử nghiệm bổ sung —
   không công bố giá trị tạm/ước lượng khi chưa đủ dữ liệu.
6. Phát hiện sai sót trong giá trị đã công bố hoặc có đánh giá lại → bắt buộc lập
   `CertificateAmendment`; nếu khách hàng **đã nhận sản phẩm liên quan**, bắt buộc
   `customer_notified = true` trước khi coi amendment hoàn tất — không sửa âm thầm.
7. Chứng chỉ có hạn sử dụng dài phải **đánh giá ổn định lại định kỳ 6–12 tháng**; nếu có thay đổi
   → cập nhật `AssignedValueCertificate` mới và đặt `superseded_by` trỏ về bản cũ (giữ lịch sử,
   không ghi đè).
8. Yêu cầu truy xuất/khiếu nại từ khách hàng về chứng chỉ đã phát hành → bộ phận kỹ thuật phối
   hợp QLCL cung cấp lại chứng chỉ + báo cáo gốc; có tranh chấp → bắt buộc đánh giá nội bộ lại
   toàn bộ quy trình (không chỉ trả lời riêng lẻ từng câu hỏi).
9. Hồ sơ công bố (dữ liệu đo, đánh giá đồng nhất/ổn định, chứng chỉ, biên bản xét duyệt/sửa
   đổi/thu hồi) lưu tại bộ phận ISO, Phòng Kỹ thuật và hệ thống quản lý chất chuẩn theo **ETV.P15**.

## 5. Liên kết

Quy trình: MP23 · Năng lực: CAP-12_CRM · Thủ tục gốc: `ETV.P23_CongBoCRM.md` (Đã phê duyệt, lần
02) · Biểu mẫu: F23.01, F23.02 (chưa số hóa, chờ Phòng Kỹ thuật bổ sung) · Lưu hồ sơ: ETV.P15 ·
Liên quan: **M19** (nguồn dữ liệu sản xuất/đồng nhất/ổn định, đầu vào của bước công bố), M20
(phân phối/truy xuất chất chuẩn đã công bố), M08 (phương pháp/ĐKĐBĐ theo GUM), M11 (nguyên tắc
chung báo cáo kết quả), M13 (khi phát hiện sai sót cần thu hồi liên hệ CAPA nếu nghiêm trọng) ·
Căn cứ: ISO/IEC 17025:2017, ISO 17034:2016/TCVN ISO 17034:2017, ISO 33401:2024, GUM.
