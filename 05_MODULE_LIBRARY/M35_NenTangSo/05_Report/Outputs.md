# M35_NenTangSo — Đầu ra

> Đồng bộ với **`ETV.P35`** mục VII và VIII (ban hành lần 01 ngày 24/08/2026). Bản xuất phải khớp bố cục
> và danh mục chuẩn của biểu mẫu gốc tại `06_SHARED_RESOURCES/01_Forms/`.

## Biểu mẫu ban hành

| Đầu ra | Định dạng | Nội dung | Thời hạn lưu |
|---|---|---|---|
| **F35.01** — Danh mục nền tảng số | PDF/Excel | 6 phần: danh mục nền tảng · điểm tích hợp · ngoại lệ có thời hạn · đến hạn rà soát · hết hiệu lực trong kỳ · nền tảng chưa đăng ký | Vĩnh viễn trên ManLab |
| **F35.02** — Phiếu đánh giá trước vận hành | PDF | 9 mục đánh giá · bảng 7 điều kiện chặn cứng · kết luận (kể cả đề nghị ngoại lệ) | Vòng đời nền tảng + 05 năm |
| **F35.03** — Phiếu sự cố và nhật ký giám sát | PDF | Phần A phiếu sự cố · phần B nhật ký giám sát trong kỳ · phần C nhật ký thay đổi cấu hình | 05 năm sau khi đóng |
| **F35.04** — Phiếu ngừng vận hành | PDF | Căn cứ · kiểm tra phụ thuộc · phương án xử lý dữ liệu · thu hồi truy cập · kết luận | 10 năm |

Đánh giá nhà cung cấp dùng lại biểu mẫu của **M06**; hồ sơ AIA dùng lại biểu mẫu của **M29** —
không tạo biểu mẫu mới.

## Báo cáo và màn hình

| Đầu ra | Định dạng | Ghi chú |
|---|---|---|
| Báo cáo tình hình nền tảng số phục vụ M17 | Dữ liệu/PDF | 06 tháng/lần và trước mỗi kỳ xem xét lãnh đạo: tổng số theo nhóm/môi trường · đăng ký mới · ngừng vận hành · đến hạn/quá hạn rà soát · sự cố và downtime nền tảng mức Cao · ngoại lệ đang hiệu lực · nền tảng phát hiện chưa đăng ký |
| Bảng nền tảng đến hạn rà soát | Màn hình | Tính khi đọc theo `last_reviewed_at + review_cycle` |
| Bảng ngoại lệ quá hạn khắc phục | Màn hình/PDF | Cảnh báo LĐV; đầu vào M01 |
| Bảng phụ thuộc nền tảng | Màn hình | Agent/Tool/Prompt (M29) + dịch vụ số (M38) theo `platform_id`; bắt buộc xem trước khi ngừng vận hành |
| Thống kê thời gian ngừng hoạt động | Màn hình/Dữ liệu | Từ `HealthCheckResult` + `PlatformIncident`, lọc theo `criticality` |
| Nhật ký kiểm tra sức khỏe | Dữ liệu | Append-only, lưu 02 năm |

## Hỗ trợ AI (← M29, có kiểm soát)

AI được phép **gợi ý** trường còn thiếu khi lập bản ghi, **phát hiện** nền tảng nghi chưa đăng ký từ
nhật ký truy cập, **cảnh báo** nền tảng đến hạn rà soát và ngoại lệ sắp quá hạn.

AI **không** lập bản ghi chính thức, **không** soát xét, **không** phê duyệt, **không** tự bật/tắt
kiểm tra sức khỏe và **không** tự quyết định ngừng vận hành (ISO/IEC 42001; ràng buộc MP29).
