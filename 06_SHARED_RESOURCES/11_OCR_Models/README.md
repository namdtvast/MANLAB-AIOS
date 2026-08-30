# 11 — OCR Models (Mô hình & template nhận dạng)

> **Một câu:** cấu hình để máy đọc được **biểu mẫu giấy đã điền** — bản đồ vùng nhận dạng, từ điển sửa lỗi, tham số model.

**Hiện có:** chưa có file — mục dưới mô tả những gì sẽ đưa vào.

## Lưu gì ở đây

| Loại | Ví dụ |
|---|---|
| Template nhận dạng theo từng biểu mẫu | với `ETV.P.F05.03`: vùng nào là ngày, vùng nào là số đọc — ánh xạ **ô trên giấy → trường dữ liệu** |
| Từ điển sửa lỗi nhận dạng | tiếng Việt có dấu, ký hiệu đo (`µm`, `°C`, `m³/h`), mã thiết bị dễ đọc nhầm (`0`/`O`, `1`/`l`) |
| Cấu hình model, ngưỡng tin cậy | ngưỡng bắt buộc người xác nhận lại thay vì lấy tự động |
| Bộ mẫu kiểm thử nhỏ | vài ảnh **không chứa dữ liệu thật** để kiểm tra sau khi chỉnh template |

## Không lưu ở đây

| Thứ này | Về đâu | Vì sao |
|---|---|---|
| File scan gốc và kết quả OCR của hồ sơ thật | CSDL / [`11_COMPLIANCE`](../../11_COMPLIANCE) | Là hồ sơ và dữ liệu vận hành |
| Trọng số model dung lượng lớn | Lưu ngoài repo, chỉ ghi lại nguồn/phiên bản | GitHub chặn file > 100MB; repo này công khai |
| Thử nghiệm, so sánh engine OCR | [`12_RESEARCH/03_OCR`](../../12_RESEARCH/03_OCR) | Nghiên cứu chưa đưa vào vận hành |

## Phép thử nhanh

> File này **giúp máy đọc mọi tờ cùng loại**? → cấu hình, để ở đây. File này **là một tờ cụ thể đã điền**? → hồ sơ, không để ở đây.

**Ràng buộc AI (ISO 42001):** OCR chỉ **đề xuất** dữ liệu; người có thẩm quyền xác nhận. AI không tự chốt kết quả đo — xem [`MP29_AI`](../../04_PROCESS_LIBRARY/MP29_AI).
