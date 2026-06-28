# M36 — Đầu ra

| Đầu ra | Định dạng | Ghi chú |
|---|---|---|
| Chứng chỉ số (người đọc) | PDF/A có chữ ký số | bản trình bày |
| Chứng chỉ số (máy đọc) | XML/JSON có cấu trúc (hướng DCC) | phục vụ liên thông, API |
| Mã QR tra cứu | PNG/SVG nhúng vào chứng chỉ | trỏ tới `/public/verify/{qr_token}` |
| Trang tra cứu công khai | Web | hiển thị thông tin tối thiểu, có dấu hiệu hiệu lực/thu hồi |
| Báo cáo thống kê | Bảng/biểu (← 06_Dashboard) | số phát hành/thu hồi/thay thế theo kỳ, theo loại DCC/DVC/DTC |

## Hỗ trợ AI (← M29, có kiểm soát)
- Phát hiện bất thường trong kết quả đo và sai lệch so với lịch sử thiết bị.
- Cảnh báo chứng chỉ thiếu/không nhất quán dữ liệu trước khi soát xét.
- Tra cứu chứng chỉ bằng ngôn ngữ tự nhiên (text-to-SQL có kiểm soát, có nhật ký).
- **Không** tự phê duyệt; kết quả AI chỉ hỗ trợ người có thẩm quyền.
