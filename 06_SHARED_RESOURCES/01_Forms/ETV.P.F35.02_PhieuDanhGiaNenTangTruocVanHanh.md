---
id: ETV.P.F35.02
title: "Phiếu đánh giá nền tảng số trước khi đưa vào vận hành"
type: Bieu-mau
process: MP35_NenTangSo
module: M35_NenTangSo
revision: "01"
effective_date: "24/08/2026"
status: Da-phe-duyet
knowledge_category: HTQL-noi-bo
permission: Noi-bo
source: "Viện Kiểm định Công nghệ và Môi trường (ETV)"
related_documents: [ETV.P35, ETV.P.F35.01, ETV.P.F35.03, ETV.P.F35.04]
---
# PHIẾU ĐÁNH GIÁ NỀN TẢNG SỐ TRƯỚC KHI ĐƯA VÀO VẬN HÀNH

|  |  |
| --- | --- |
| **Mã số** | ETV.P.F 35.02 |
| **Lần ban hành** | 01 |
| **Ngày ban hành** | 24/08/2026 |
| **Soát xét** | ..../..../.... |
| **Trang** | 1/1 |

LIÊN HIỆP CÁC HỘI KHOA HỌC VÀ KỸ THUẬT VIỆT NAM
VIỆN KIỂM ĐỊNH CÔNG NGHỆ VÀ MÔI TRƯỜNG

**Số phiếu:** ...................　**Ngày lập:** ..../..../........

> Bắt buộc lập khi: đăng ký mới nền tảng PRODUCTION · nền tảng STAGING có dữ liệu thật · nền tảng thuê ngoài xử lý dữ liệu Hạn chế/Mật · chuyển nền tảng từ STAGING/INTERNAL lên PRODUCTION (ETV.P35 §6.2.1).

## 1. Thông tin nền tảng

| Trường | Nội dung |
|---|---|
| Mã nền tảng đề xuất | |
| Tên nền tảng | |
| Nhóm nền tảng (1–7) | |
| Môi trường | ☐ PRODUCTION　☐ STAGING　☐ INTERNAL |
| Nguồn | ☐ Tự xây　☐ Thuê ngoài (SaaS/PaaS/IaaS)　☐ Nền tảng đối tác |
| Nhà cung cấp (nếu có) | |
| Chủ sở hữu nền tảng | |
| Đầu mối kỹ thuật | |
| Mức trọng yếu đề xuất | ☐ Thấp　☐ Trung bình　☐ Cao |
| Mức phân loại dữ liệu cao nhất | ☐ Công khai　☐ Nội bộ　☐ Hạn chế　☐ Mật |
| Loại bộ chuyển đổi | |

## 2. Nội dung đánh giá

| TT | Nhóm nội dung | Câu hỏi phải trả lời | Kết quả đánh giá | Bằng chứng kèm theo |
|---|---|---|---|---|
| 1 | Nhu cầu nghiệp vụ | Phục vụ quá trình nào? Có trùng lặp nền tảng đã có không? | | |
| 2 | Dữ liệu | Xử lý dữ liệu gì, mức phân loại, lưu ở đâu, ai truy cập được? | | |
| 3 | An toàn thông tin | Xác thực, phân quyền, mã hóa, nhật ký; bí mật xác thực lưu ở đâu (ETV.P28)? | | |
| 4 | Nhà cung cấp | Đã đánh giá theo ETV.P06 chưa? Cam kết bảo mật, mức dịch vụ, điều khoản trả lại dữ liệu? | | |
| 5 | Xác nhận giá trị sử dụng | Nếu tham gia xử lý dữ liệu kiểm định/hiệu chuẩn/thử nghiệm: đã xác nhận theo ISO/IEC 17025 §7.11 chưa? | | |
| 6 | Tính liên tục | Phương án khi nền tảng ngừng hoạt động; sao lưu và khả năng phục hồi (ETV.P31)? | | |
| 7 | Tích hợp | Các điểm tích hợp phát sinh; ảnh hưởng tới nền tảng đang chạy? | | |
| 8 | Trí tuệ nhân tạo | Có thành phần AI không? Nếu có, hồ sơ AIA theo ETV.P29 số bao nhiêu? | | |
| 9 | Rủi ro | Rủi ro đã nhận diện và mã rủi ro đã mở tại ETV.P01? | | |

## 3. Kiểm tra điều kiện chặn cứng

*(Theo ETV.P35 §6.2.3 — thiếu bất kỳ mục nào, hệ thống ManLab từ chối phê duyệt)*

| TT | Điều kiện | Đạt | Không áp dụng | Bằng chứng/Ghi chú |
|---|---|---|---|---|
| 1 | Có chủ sở hữu và đầu mối kỹ thuật là người cụ thể đang làm việc tại Viện | ☐ | — | |
| 2 | Có mức phân loại dữ liệu, nhất quán với mô tả dữ liệu tại mục 2 | ☐ | — | |
| 3 | Nền tảng PRODUCTION: đã bật kiểm tra sức khỏe | ☐ | ☐ | |
| 4 | Mức trọng yếu Cao: có ≥ 01 rủi ro tại ETV.P01 và phương án liên tục ETV.P31 | ☐ | ☐ | Mã rủi ro: |
| 5 | Thuê ngoài xử lý dữ liệu Hạn chế/Mật: có hồ sơ đánh giá nhà cung cấp ETV.P06 còn hiệu lực | ☐ | ☐ | Số hồ sơ: |
| 6 | Có thành phần AI: có hồ sơ AIA theo ETV.P29 | ☐ | ☐ | Số hồ sơ AIA: |
| 7 | Bản ghi không chứa mật khẩu, khóa API, chứng thư số | ☐ | — | |

## 4. Kết luận đánh giá

☐ **Đủ điều kiện** đưa vào vận hành

☐ **Chưa đủ điều kiện** — nội dung phải bổ sung: ...........................................................................

☐ **Đề nghị phê duyệt ngoại lệ có thời hạn** *(chỉ LĐV phê duyệt; thời hạn khắc phục không quá 90 ngày và phải mở rủi ro tại ETV.P01)*

| Điều kiện còn thiếu | Lý do cấp bách | Mã rủi ro (ETV.P01) | Hạn khắc phục |
|---|---|---|---|
| | | | ..../..../........ |

---

| Người lập | Người soát xét | Người phê duyệt |
| --- | --- | --- |
| *(CSH/ĐMKT)* | *(ĐMKT/TP, khác người lập)* | *(Lãnh đạo Viện)* |
| Ngày: ..../..../........ | Ngày: ..../..../........ | Ngày: ..../..../........ |

> Người lập ≠ người phê duyệt. Trợ lý AI không lập, không soát xét, không phê duyệt phiếu này (ETV.P35 §V). Hồ sơ lưu theo ETV.P15.
