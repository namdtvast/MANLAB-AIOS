# M10 — Đầu ra

Sản phẩm module M10 sinh ra trong vòng đời bảo đảm hiệu lực. Nghiệp vụ: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md).

| Đầu ra | Định dạng | Ghi chú |
|---|---|---|
| Kế hoạch bảo đảm hiệu lực (F10.01) | PDF/bảng | quy trình–đối tượng–hoạt động–tần suất theo năm/phòng |
| Hồ sơ đánh giá P10 (F10.02–F10.08) | Bản ghi có phiên bản + audit trail | QC/PT-ILC/đồng nhất/ổn định/đặc trưng/công cụ số; kèm `indicators`, dữ liệu thô, bằng chứng |
| Phiếu công bố nội bộ (F10.09) | PDF/bản ghi | `publication_status`, `release_allowed`, `expires_at`; khống chế phát hành ở M11 |
| Dữ liệu máy đọc | JSON/API | truyền trạng thái P10 sang F11.03/M11; phục vụ liên thông |
| Báo cáo KPI (← 06_Dashboard) | Bảng/biểu | tỉ lệ Đạt/Cảnh báo/Không đạt, KPH mở/trễ hạn, phân bố z/En/bias theo kỳ, phòng, `record_type` |
| Hồ sơ truy xuất KPH-CAPA | Liên kết (→ M13) | nhánh không đạt: nguyên nhân, hành động, xác nhận hiệu lực |
| Đầu vào Xem xét lãnh đạo (→ M17) | Tổng hợp | KPI hiệu lực kết quả theo kỳ |

## Bảng trạng thái công bố → khống chế phát hành (F10.09)

| `publication_status` | `release_allowed` | Xử lý tại F11.03 (M11) |
|---|---|---|
| PASS | true | Cho phép phát hành |
| CONDITIONAL | true (có điều kiện) | Phát hành kèm điều kiện/hạn, người phê duyệt xác nhận |
| WARNING | gắn cờ | Chuyển LĐP/LĐV xem xét |
| FAIL-BLOCKED | false | Khóa phát hành; bắt buộc mở/liên kết CAPA |
| EXPIRED | false | Yêu cầu đánh giá lại/gia hạn P10 |

## Hỗ trợ AI (← M29, có kiểm soát)
- Gắn cờ dữ liệu thiếu/không nhất quán trước soát xét; phát hiện chỉ số bất thường (z/En vượt ngưỡng), xu hướng trôi.
- Tra cứu hồ sơ P10 bằng ngôn ngữ tự nhiên (có nhật ký, có kiểm soát).
- AI **không** tự phê duyệt, **không** tự kết luận sự phù hợp, **không** đổi dữ liệu gốc; đầu ra AI phải người đủ năng lực kiểm chứng.
