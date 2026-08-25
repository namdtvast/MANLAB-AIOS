---
id: ETV.P.F35.01
title: "Danh mục nền tảng số"
type: Bieu-mau
process: MP35_NenTangSo
module: M35_NenTangSo
revision: "01"
effective_date: "24/08/2026"
status: Da-phe-duyet
knowledge_category: HTQL-noi-bo
permission: Noi-bo
source: "Viện Kiểm định Công nghệ và Môi trường (ETV)"
related_documents: [ETV.P35, ETV.P.F35.02, ETV.P.F35.03, ETV.P.F35.04]
---
# DANH MỤC NỀN TẢNG SỐ

|  |  |
| --- | --- |
| **Mã số** | ETV.P.F 35.01 |
| **Lần ban hành** | 01 |
| **Ngày ban hành** | 24/08/2026 |
| **Soát xét** | ..../..../.... |
| **Trang** | 1/1 |

LIÊN HIỆP CÁC HỘI KHOA HỌC VÀ KỸ THUẬT VIỆT NAM
VIỆN KIỂM ĐỊNH CÔNG NGHỆ VÀ MÔI TRƯỜNG

**Kỳ báo cáo:** Từ ..../..../........ đến ..../..../........　**Đơn vị lập:** ......................................

> **Nguyên tắc:** Danh mục này là **sổ đăng ký**, không phải kho cấu hình. Cột "Hồ sơ gốc" bắt buộc ghi đường dẫn tới nơi lưu hồ sơ thật. **Nghiêm cấm** ghi mật khẩu, khóa API, chứng thư số vào bất kỳ cột nào của biểu mẫu này (ETV.P35 §2.2).

## 1. Danh mục nền tảng số

| TT | Mã nền tảng | Tên nền tảng | Nhóm (1–7) | Môi trường | Địa chỉ giao diện | Địa chỉ gốc API | Chủ sở hữu | Đầu mối kỹ thuật | Mức trọng yếu | Mức phân loại dữ liệu | Loại bộ chuyển đổi | Nguồn (Tự xây/Thuê ngoài/Đối tác) | Chu kỳ rà soát | Lần rà soát gần nhất | Hạn rà soát kế tiếp | Kiểm tra sức khỏe | Tình trạng vận hành | Hồ sơ gốc | Trạng thái |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | | | | | | | | | | | | | | | | ☐ | | | |
| 2 | | | | | | | | | | | | | | | | ☐ | | | |
| 3 | | | | | | | | | | | | | | | | ☐ | | | |
| ... | | | | | | | | | | | | | | | | ☐ | | | |

**Chú giải danh mục chuẩn**

| Trường | Giá trị hợp lệ |
|---|---|
| Nhóm nền tảng | (1) Lõi nghiệp vụ · (2) Đối tác/liên thông · (3) Văn phòng và cộng tác · (4) Dịch vụ khách hàng · (5) Dữ liệu và phân tích · (6) Trí tuệ nhân tạo · (7) Phát triển và vận hành |
| Môi trường | PRODUCTION · STAGING · INTERNAL (mỗi môi trường là **một bản ghi riêng**) |
| Mức trọng yếu | Thấp · Trung bình · Cao (Cao bắt buộc có rủi ro ETV.P01 + phương án liên tục ETV.P31) |
| Mức phân loại dữ liệu | Công khai · Nội bộ · Hạn chế · Mật (theo ETV.P02/ETV.P27/ETV.P28 — ghi theo mức **cao nhất** nền tảng xử lý) |
| Loại bộ chuyển đổi | Phải khớp một thành phần đã triển khai thật; nền tảng chưa có API thật ghi **Bộ chuyển đổi tạm** |
| Chu kỳ rà soát | 06 tháng · 01 năm · 02 năm · Theo sự kiện (mặc định: Cao ≤ 01 năm; Trung bình 02 năm; Thấp theo sự kiện) |
| Kiểm tra sức khỏe | Bắt buộc bật với mức trọng yếu Cao và Trung bình, và với mọi nền tảng PRODUCTION |
| Tình trạng vận hành | Hoạt động tốt · Suy giảm · Ngừng · Chưa xác định (do hệ thống tự cập nhật, **không** phải trạng thái hồ sơ) |
| Trạng thái | Nháp · Chờ soát xét · Không soát xét · Chờ phê duyệt · Không phê duyệt · Đã phê duyệt · Hiệu lực · Hết hiệu lực · Hủy |

## 2. Danh mục điểm tích hợp

| TT | Mã nền tảng | Nền tảng đối tác | Hướng dữ liệu (Đi/Đến/Hai chiều) | Loại dữ liệu trao đổi | Mức phân loại cao nhất | Phương thức xác thực | Nơi lưu bí mật xác thực (ETV.P28) | Hợp đồng dữ liệu (ETV.P37) | Tình trạng |
|---|---|---|---|---|---|---|---|---|---|
| 1 | | | | | | | | | |
| 2 | | | | | | | | | |

## 3. Nền tảng đang vận hành theo ngoại lệ có thời hạn

*(Theo ETV.P35 §6.2.3 — LĐV phê duyệt ngoại lệ, thời hạn khắc phục không quá 90 ngày)*

| TT | Mã nền tảng | Điều kiện còn thiếu | Lý do phê duyệt ngoại lệ | Mã rủi ro (ETV.P01) | Ngày phê duyệt | Hạn khắc phục | Tình trạng khắc phục |
|---|---|---|---|---|---|---|---|
| 1 | | | | | | | |
| 2 | | | | | | | |

## 4. Nền tảng đến hạn/quá hạn rà soát trong kỳ

| TT | Mã nền tảng | Tên nền tảng | Chủ sở hữu | Hạn rà soát | Số chu kỳ quá hạn | Kết quả rà soát (Còn cần thiết / Cần thay đổi / Đề nghị ngừng vận hành) | Ghi chú |
|---|---|---|---|---|---|---|---|
| 1 | | | | | | | |
| 2 | | | | | | | |

## 5. Nền tảng chuyển hết hiệu lực trong kỳ

| TT | Mã nền tảng | Tên nền tảng | Lý do (bắt buộc) | Nền tảng thay thế | Số phiếu F35.04 | Ngày hết hiệu lực | Đã xử lý xong dữ liệu (ETV.P27/ETV.P34) |
|---|---|---|---|---|---|---|---|
| 1 | | | | | | | ☐ |
| 2 | | | | | | | ☐ |

## 6. Nền tảng phát hiện chưa đăng ký trong kỳ

*(Theo ETV.P35 §6.6)*

| TT | Tên nền tảng | Người/đơn vị đang sử dụng | Dữ liệu đã đưa lên | Mức phân loại | Hướng xử lý (Đăng ký / Ngừng sử dụng) | Số KPH (ETV.P13) nếu có | Hạn hoàn thành |
|---|---|---|---|---|---|---|---|
| 1 | | | | | | | |
| 2 | | | | | | | |

---

| Người lập | Người soát xét | Người phê duyệt |
| --- | --- | --- |
| *(CSH/ĐMKT/QLCL)* | *(ĐMKT/TP, khác người lập)* | *(Lãnh đạo Viện)* |
| Ngày: ..../..../........ | Ngày: ..../..../........ | Ngày: ..../..../........ |

> Người lập ≠ người phê duyệt. Mọi bản ghi nền tảng do **Lãnh đạo Viện** phê duyệt (ETV.P35 §5.2). Hồ sơ lưu theo ETV.P15.
