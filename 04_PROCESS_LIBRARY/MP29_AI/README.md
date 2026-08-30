# MP29_AI — Quản lý hệ thống trí tuệ nhân tạo

| Thuộc tính | Giá trị |
|---|---|
| Mã quy trình | MP29 |
| Tên gọi ngắn | AI |
| Thủ tục ban hành | `ETV.P29` — Lần ban hành 01, đang **chờ soát xét** |
| Điều khoản/căn cứ | ISO/IEC 42001 §4–§10 (trọng tâm §6.1.4 đánh giá tác động, §8.1–§8.4 kiểm soát vận hành và vòng đời); ISO/IEC 27001 §6.1.2, §8.1, A.5.9–A.5.12, A.5.23, A.8.16; ISO 9001 §6.1, §7.1.6, §8.5.1; ISO/IEC 17025 §4.1, §7.7, §7.11; ISO 17034 §7.4 |
| Năng lực liên quan | CAP-29 |
| Module số hóa | M29_AI |
| Chủ sở hữu | Người phụ trách quản trị AI (PT.AI) |
| Hướng dẫn | `ETV.GAI 01` — Tích hợp máy chủ mô hình AI nội bộ vào ManLab AIOS (bản **nháp**; mã số là mã đề xuất) · `ETV.GAI 02` — Kiến trúc tri thức và ngữ nghĩa cho AI trong hệ sinh thái ManLab (bản **nháp**; mã số là mã đề xuất) |
| Biểu mẫu | ETV.P.F29.01 (Danh mục hệ thống AI) · ETV.P.F29.02 (Phiếu đánh giá tác động AI – AIA) · ETV.P.F29.03 (Phiếu kiểm thử và đánh giá chất lượng AI) · ETV.P.F29.04 (Phiếu sự cố AI) |

**Ranh giới:** MP35 quản lý *nền tảng* nơi phần mềm chạy; MP29 quản lý *hệ thống AI chạy trên nền tảng đó*. Rủi ro và sự cố an toàn thông tin thuộc MP28; tri thức cấp cho AI thuộc MP26; tài sản dữ liệu thuộc MP27/MP34.

**Hai cổng chặn cứng của thủ tục:** *Cổng AIA* — tác tử chưa có hồ sơ AIA đã phê duyệt thì mọi lời gọi công cụ bị từ chối. *Cổng triển khai* — không kích hoạt phiên bản lời nhắc mới khi đánh giá chất lượng gần nhất Không đạt.

> Hub không chứa nội dung quy trình. Xem `links.yaml`.
