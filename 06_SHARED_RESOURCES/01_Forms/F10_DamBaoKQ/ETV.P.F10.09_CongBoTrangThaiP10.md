# ETV.P.F 10.09 — Công bố nội bộ trạng thái P10

> Biểu mẫu gốc — bản trắng. Thuộc `ETV.P10` §6.11 và Phụ lục V. **Là điểm chốt nội bộ, không thay thế Chứng chỉ đo lường/Báo cáo kết quả `F11.03`.** Không điền dữ liệu thật vào file này; nhân bản để sử dụng trong ManLab (module `M10_DamBaoKQ`).

## Liên kết nguồn (từ F11.03)

| Trường | Nội dung |
|---|---|
| Số chứng chỉ/báo cáo (CertificateId) | ..................... |
| Khách hàng | ..................... |
| Đối tượng · model/serial | ..................... |
| Quy trình · nhân sự · thiết bị · chuẩn | ..................... |
| Ngày thực hiện · kết quả | ..................... |

## Quyết định công bố P10

| Trường | Nội dung |
|---|---|
| Mã đánh giá/công bố (AssessmentId/PublicationId) | ..................... |
| **Trạng thái** | ☐ PASS ☐ CONDITIONAL ☐ WARNING ☐ FAIL/BLOCKED ☐ EXPIRED/MISSING |
| Quyền phát hành (ReleaseAllowed) | ☐ Có ☐ Có điều kiện ☐ Không |
| Lý do/điều kiện kèm theo | ..................... |
| Kiểm soát bổ sung (nếu CONDITIONAL) | ..................... |
| Người phê duyệt (LĐV) · Ngày | ......... / ......... |
| Hạn hiệu lực (ExpiresAt) | ..................... |
| Mã KPH/CAPA (nếu FAIL/BLOCKED) | ..................... |

## Quy tắc trạng thái → xử lý tại F11.03

| Trạng thái | Cho phép phát hành | Yêu cầu |
|---|---|---|
| PASS | Có | Đánh giá P10 còn hiệu lực và được phê duyệt. |
| CONDITIONAL | Có điều kiện | Có lý do, kiểm soát bổ sung, người phê duyệt và ngày hết hạn. |
| WARNING | Chờ quyết định | LĐP soát xét và LĐV phê duyệt trước phát hành. |
| FAIL/BLOCKED | Không | Khóa phát hành; mở/liên kết KPH-CAPA. |
| EXPIRED/MISSING | Không | Cập nhật hoặc thực hiện đánh giá P10 trước phát hành. |
