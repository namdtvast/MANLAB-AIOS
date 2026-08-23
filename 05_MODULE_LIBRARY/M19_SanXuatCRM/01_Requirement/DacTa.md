# M19_SanXuatCRM — Đặc tả yêu cầu

> Nguồn: `03_MANAGEMENT_SYSTEM/02_P/ETV.P19_SanXuatCRM.md` (Thủ tục ETV.P19, lần ban hành 01,
> **Đã phê duyệt** (`doc_status: issued`) 22/04/2025, tên đầy đủ "Hoạch định Sản xuất Chất
> chuẩn" — Reference Material Production Planning Procedure). 3 biểu mẫu chính F19.01–03 + tham
> chiếu F13.02/F20.01/F20.02 (thuộc M13/M20).

## 1. Mục tiêu module

Số hóa MP19 — hoạch định, triển khai, đánh giá đồng nhất/ổn định và tổng hợp kết quả sản xuất
chất chuẩn (RM/CRM), theo ISO 17034 + ISO 33405/33406 + GUM. Đầu ra Đạt của module này là đầu
vào cho **M20** (đóng gói/dán nhãn/phân phối) và phát hành GCN phân tích.

## 2. Đối tượng dữ liệu chính

| Đối tượng | Mô tả | Biểu mẫu |
|---|---|---|
| `ProductionPlan` | Kế hoạch sản xuất chất chuẩn | F19.01 |
| `PlanAssessment` | Đánh giá/soát xét khả thi kế hoạch + theo dõi triển khai | F19.02 |
| `ProductionResult` | Tổng hợp kết quả sản xuất (giá trị danh định, U, đồng nhất, ổn định) | F19.03 |
| `HomogeneityTest` | Đánh giá độ đồng nhất (ANOVA) | — (nhúng vào F19.02) |
| `StabilityTest` | Đánh giá độ ổn định (thời gian thực/vận chuyển) | — (nhúng vào F19.02) |

### 2.1. `ProductionPlan`

`request_source` (hợp đồng đã duyệt), `material_type` (RM/CRM), `nominal_value`, `unit`,
`target_uncertainty`, `quantity`, `packaging_spec`, `delivery_date`, `raw_material_ref` (hóa
chất gốc, CoA, mã lô, hạn dùng), `method_ref`, `equipment_ref`, `preparation_source` (Từ dung
dịch chuẩn/Từ hóa chất chuẩn rắn/Tự sản xuất RM/Phối hợp nhiều nguồn/Chiết từ mẫu thực),
`assigned_personnel` (người pha chế/người đo/người tính U/người đánh giá đồng nhất-ổn định),
`status` (Nháp/Soát xét/Đã duyệt/Không duyệt).

### 2.2. `HomogeneityTest`

`sample_size` (n ≥10% tổng chai, tối thiểu 4), `replicate_count` (m ≥2, khuyến nghị 3),
`sampling_positions` (đầu/giữa/cuối lô), `s_bu` (độ lệch giữa đơn vị — ANOVA), `s_wu` (độ lệch
trong đơn vị), `u_hom` (= s_bu), `rsd_percent`, `result` (Đạt/Không đạt — Đạt khi `u_hom < U/3`
và không có xu hướng bất thường).

### 2.3. `StabilityTest`

`test_type` (Thời gian thực/Vận chuyển), `time_points[]` (≥3 mốc), `units_per_point` (≥3),
`replicate_per_unit` (≥2), `drift_analysis` (ANOVA lặp + hồi quy tuyến tính), `u_stab`, `result`
(Ổn định/Không ổn định — Ổn định khi chênh lệch giữa các mốc < U/3 và không có xu hướng có ý
nghĩa thống kê).

### 2.4. `ProductionResult`

`actual_quantity`, `nominal_value_measured` (x̄, từ ≥10 phép đo lặp), `uA`, `uB`, `uc` (=√(uA²+uB²)),
`U` (= k·uc, k=2), `homogeneity_ref`, `stability_ref`, `passed_count`, `failed_count`,
`failure_reasons[]`, `result` (Đạt: đồng nhất + ổn định + sai lệch ≤ ±2U / Không đạt), `signed_by`
(người thực hiện + LĐP).

## 3. Vai trò

| Vai trò | Trách nhiệm chính |
|---|---|
| LĐV | Chỉ đạo chung; phê duyệt F19.01/F19.02/F19.03 (cấp Phê duyệt); đảm bảo nguồn lực |
| LĐP | Soát xét F19.01/F19.02/F19.03 (cấp Soát xét); tổ chức triển khai; giám sát toàn chu trình; xác nhận kết quả pha chế/đo/tính U khi cần |
| NTH — Người pha chế | Pha dung dịch chuẩn theo F19.01; ghi nhật ký pha chế |
| NTH — Người đo giá trị | Đo lặp theo SOP; ghi kết quả |
| NTH — Người tính U | Tính độ không đảm bảo đo theo GUM |
| NTH — Người đánh giá đồng nhất/ổn định | Thiết kế lấy mẫu, phân tích ANOVA/xu hướng |
| Bộ phận bảo trì & hiệu chuẩn thiết bị | Kiểm tra/bảo dưỡng/hiệu chuẩn thiết bị dùng trong sản xuất (← M05) |

## 4. Quy tắc nghiệp vụ

1. Mọi `ProductionPlan`/`PlanAssessment`/`ProductionResult` đều đi qua đúng **3 cấp**: **Lập**
   (mọi tài khoản, tự động ghi ngày+người theo tài khoản đăng nhập) → **Soát xét** (chỉ
   LĐP/LĐV/Admin) → **Phê duyệt** (chỉ LĐV/Admin) — không cho bỏ qua cấp.
2. `PlanAssessment` chỉ được tạo sau khi `ProductionPlan` đã **Phê duyệt** (chuyển tự động sang
   trạng thái Nháp của bước đánh giá) — không tạo đánh giá cho kế hoạch chưa duyệt.
3. Kết luận soát xét kế hoạch = **Không đạt** → bắt buộc nêu lý do, yêu cầu cập nhật lại kế
   hoạch — không cho tiếp tục triển khai sản xuất song song.
4. `HomogeneityTest` bắt buộc với mọi lô sản xuất theo ISO 17034/33405 — không có ngoại lệ bỏ
   qua bước này; cỡ mẫu tối thiểu n≥10%/4 chai, m≥2 lần đo — validate khi nhập.
5. Tiêu chí Đạt của `HomogeneityTest`: `u_hom < U/3` **và** không có xu hướng/phân bố lệch bất
   thường trong dữ liệu — cả hai điều kiện đều bắt buộc, không chỉ dựa vào RSD.
6. Tiêu chí Đạt của `StabilityTest`: chênh lệch giá trị giữa các mốc thời gian < U/3 **và**
   không có xu hướng có ý nghĩa thống kê — nếu có biến động, bắt buộc rút ngắn hạn dùng hoặc
   tái đánh giá/tái sản xuất, không được giữ nguyên hạn dùng gốc.
7. `ProductionResult.result = Đạt` chỉ khi đồng thời: đồng nhất Đạt, ổn định Đạt, VÀ sai lệch
   giá trị đo so với giá trị danh định không vượt ±2U — thiếu 1 điều kiện thì toàn lô Không đạt.
8. Mẫu `Không đạt` **không được dùng để chứng nhận** — chỉ có thể lưu nội bộ (huấn luyện/nghiên
   cứu) hoặc hủy; không cho chuyển sang bước đóng gói/dán nhãn của M20.
9. `U = k·uc` với `k=2` (≈95%) là hệ số cố định của thủ tục — không tự đổi hệ số phủ khi tính
   toán trừ khi có yêu cầu khác bằng văn bản.
10. `ProductionResult` bắt buộc chữ ký xác nhận của người thực hiện + LĐP trước khi coi là hồ sơ
    hoàn chỉnh để chuyển giao sang M20 (đóng gói/dán nhãn/phát hành GCN).
11. Hồ sơ lưu điện tử trên ManLab; bản cứng lưu tối thiểu 3 năm hoặc theo ISO 17034; toàn bộ lưu
    theo **ETV.P15**.

## 5. Liên kết

Quy trình: MP19 · Năng lực: CAP liên quan chất chuẩn (ISO 17034) · Thủ tục gốc:
`ETV.P19_SanXuatCRM.md` (Đã ban hành, lần 01) · Biểu mẫu: F19.01–F19.03; tham chiếu F13.02 (→
M13), F20.01/F20.02 (→ M20) · Lưu hồ sơ: ETV.P15 · Liên quan: M05 (hiệu chuẩn/bảo trì thiết bị
dùng trong sản xuất), M13 (sổ theo dõi GCN không phù hợp), M20 (đóng gói/dán nhãn/phân phối sau
khi Đạt), M11 (phát hành GCN phân tích) · Căn cứ: ISO 17034:2016, ISO/IEC 17025:2017, ISO
33401/33405/33406:2024, GUM, ISO 9001:2015.
