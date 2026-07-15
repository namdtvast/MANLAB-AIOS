# M10_DamBaoKQ — Đặc tả yêu cầu

## 1. Phạm vi
Số hóa quy trình **MP10 — Đảm bảo hiệu lực của các kết quả** (`ETV.P10`, lần ban hành 04). Module quản lý vòng đời các hồ sơ bảo đảm hiệu lực từ khi lập kế hoạch, thực hiện, đánh giá Đạt/Cảnh báo/Không đạt đến khi công bố trạng thái phát hành và theo dõi cải tiến. Bao gồm 09 loại hồ sơ (biểu mẫu):

| Biểu mẫu | Nội dung | §P10 |
|---|---|---|
| `F10.01` | Kế hoạch bảo đảm hiệu lực | 6.3 |
| `F10.02` | Hồ sơ QC nội bộ | 6.5 |
| `F10.03` | Đánh giá tay nghề (→ F03.02) | 6.6 |
| `F10.04` | PT/ILC | 6.7 |
| `F10.05`–`F10.07` | Đồng nhất · Ổn định · Đặc trưng/ấn định giá trị RM/CRM | 6.8 |
| `F10.08` | Xác nhận công cụ số/phần mềm/AI | 6.9 |
| `F10.09` | Công bố nội bộ trạng thái P10 (← F11.03) | 6.11 |

## 2. Trường dữ liệu bắt buộc

| Nhóm | Trường | Ghi chú |
|---|---|---|
| Định danh | `assessment_id` (**duy nhất**) | mã hồ sơ P10 tự sinh |
| | `record_type` | PLAN/QC/PROFICIENCY/PT_ILC/HOMOGENEITY/STABILITY/CHARACTERIZATION/TOOL_AI/PUBLICATION |
| | `version`, `status` | phiên bản; trạng thái vòng đời |
| Liên kết | `plan_id` | ← kế hoạch F10.01 |
| | `procedure_id`, `object_id` | quy trình/phương pháp (← M08); đối tượng/mẫu/lô |
| | `equipment_id[]`, `reference_standard_id[]` | thiết bị (← M05), chuẩn/chất chuẩn |
| | `personnel_id` | nhân sự thực hiện (← M03) |
| Kỹ thuật | `criteria_id`, `raw_data[]`, `evidence[]` | tiêu chí có phiên bản; dữ liệu thô; tệp bằng chứng |
| | `indicators` | z-score/En/zeta/Bias%/Recovery%/RSD-CV%/u_hom/u_stab/U_CRM tùy `record_type` |
| Kết quả | `result` | ĐẠT / CẢNH BÁO / KHÔNG ĐẠT |
| Công bố (F10.09) | `source_certificate_id` (← F11.03), `publication_status`, `release_allowed`, `expires_at`, `capa_id` | trạng thái PASS/CONDITIONAL/WARNING/FAIL-BLOCKED/EXPIRED |
| Kiểm soát | `created_by`, `reviewed_by`, `approved_by`, `reason`, `source_snapshot_at` | audit trail bắt buộc |

## 3. Quy tắc nghiệp vụ (control rules)
1. `assessment_id` duy nhất; bản nháp P10 là phiên bản **độc lập** có audit trail; khi lấy từ `F11.03` phải lưu `source_certificate_id` + `source_snapshot_at`, **không sửa dữ liệu nguồn**; cảnh báo khi F11.03 thay đổi sau thời điểm sao chép.
2. Tách biệt **tạo — soát xét — phê duyệt**: mọi tài khoản tạo nháp/gửi duyệt; **soát xét chỉ LĐP**; **phê duyệt chỉ LĐV**. Không ai tự soát xét/tự phê duyệt hồ sơ do mình tạo.
3. Không cho chuyển **Chờ phê duyệt** nếu thiếu trường bắt buộc, dữ liệu thô hoặc bằng chứng theo `record_type`.
4. **Trả lại / Từ chối / Không đạt** bắt buộc nhập `reason`; hệ thống tạo phiên bản chỉnh sửa và giữ bản trước.
5. Tiêu chí **ưu tiên**: (1) pháp luật/quy chuẩn → (2) cơ quan công nhận → (3) phương pháp/tiêu chuẩn → (4) hợp đồng → (5) nội bộ đã phê duyệt → (6) giá trị mặc định. Giá trị mặc định chỉ dùng khi QLCL/LĐP phê duyệt trước.
6. Kết quả `KHÔNG ĐẠT`/trạng thái `FAIL-BLOCKED` → **khóa phát hành**, bắt buộc mở/liên kết KPH-CAPA (← M13); không được thử lại để có kết quả đạt mà không điều tra nguyên nhân.
7. `F10.09` là **điểm chốt nội bộ**, không thay thế `F11.03`; sau phê duyệt, trạng thái P10 truyền sang F11.03 và khống chế nút phát hành theo bảng trạng thái.
8. Hệ thống AI (← M29) chỉ **hỗ trợ/gắn cờ cảnh báo**; không tự phê duyệt, không tự kết luận sự phù hợp, không thay đổi dữ liệu gốc; đầu ra AI phải được người đủ năng lực kiểm chứng.
9. `AuditLog` append-only; bản đã phê duyệt không bị ghi đè — sửa đổi phải tạo phiên bản mới.

## 4. Vai trò
NTH/Mọi tài khoản (tạo nháp, gửi duyệt, thực hiện) · LĐP (soát xét) · LĐV (phê duyệt, công bố) · QLCL (theo dõi KPH/CAPA, tổng hợp KPI) · QTHT/ATTT (phân quyền, audit trail, sao lưu, sự cố dữ liệu/AI).

## 5. Truy xuất nguồn gốc
Kế hoạch F10.01 → hoạt động F10.02–F10.08 → đánh giá kết quả → công bố F10.09 (← chứng chỉ F11.03/M11) → khống chế phát hành; nhánh không đạt → KPH/CAPA (M13) → xác nhận hiệu lực. Tổng hợp KPI → đầu vào Xem xét lãnh đạo (M17).

## 6. Liên kết
Quy trình: `MP10` · Năng lực: `CAP-17` · Căn cứ: ISO/IEC 17025 §7.7 (và §7.10, §7.11); ISO 17034 §7.7–7.15; ISO 9001 §9.1; ISO/IEC 27001; ISO/IEC 42001 §7.5. Module liên quan: M03, M05, M08, M11, M13, M17, M18, M29, M36.
