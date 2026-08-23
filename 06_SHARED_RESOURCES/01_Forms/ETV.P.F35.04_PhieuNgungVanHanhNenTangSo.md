---
id: ETV.P.F35.04
title: "Phiếu ngừng vận hành nền tảng số"
type: Bieu-mau
process: MP35_NenTangSo
module: M35_NenTangSo
revision: "01"
effective_date: "24/08/2026"
status: Da-phe-duyet
knowledge_category: HTQL-noi-bo
permission: Noi-bo
source: "Viện Kiểm định Công nghệ và Môi trường (ETV)"
related_documents: [ETV.P35, ETV.P.F35.01, ETV.P.F35.02, ETV.P.F35.03]
---
# PHIẾU NGỪNG VẬN HÀNH NỀN TẢNG SỐ

|  |  |
| --- | --- |
| **Mã số** | ETV.P.F 35.04 |
| **Lần ban hành** | 01 |
| **Ngày ban hành** | 24/08/2026 |
| **Soát xét** | ..../..../.... |
| **Trang** | 1/1 |

LIÊN HIỆP CÁC HỘI KHOA HỌC VÀ KỸ THUẬT VIỆT NAM
VIỆN KIỂM ĐỊNH CÔNG NGHỆ VÀ MÔI TRƯỜNG

**Số phiếu:** ...................　**Ngày lập:** ..../..../........

## 1. Thông tin nền tảng ngừng vận hành

| Trường | Nội dung |
|---|---|
| Mã nền tảng | |
| Tên nền tảng | |
| Môi trường | ☐ PRODUCTION　☐ STAGING　☐ INTERNAL |
| Mức trọng yếu | ☐ Thấp　☐ Trung bình　☐ Cao |
| Mức phân loại dữ liệu cao nhất | ☐ Công khai　☐ Nội bộ　☐ Hạn chế　☐ Mật |
| Chủ sở hữu nền tảng | |
| Ngày đưa vào vận hành | ..../..../........ |
| Ngày dự kiến ngừng vận hành | ..../..../........ |

## 2. Căn cứ ngừng vận hành

☐ Không còn nhu cầu nghiệp vụ　☐ Bị thay thế bởi nền tảng khác　☐ Hết hạn hợp đồng thuê dịch vụ
☐ Nhà cung cấp chấm dứt dịch vụ　☐ Không còn đáp ứng yêu cầu an toàn thông tin　☐ Khác: ....................

**Diễn giải lý do (bắt buộc):** ...................................................................................................

**Nền tảng thay thế (nếu có):** Mã ................ Tên ...............................................................

## 3. Kiểm tra đối tượng còn phụ thuộc

*(Điều kiện chặn cứng — ETV.P35 mục 5.5.3: không chuyển Hết hiệu lực khi còn đối tượng đang hoạt động trỏ tới nền tảng này)*

| TT | Loại đối tượng | Thủ tục | Số lượng còn hoạt động | Hướng xử lý (Chuyển hướng/Dừng) | Đã hoàn thành |
|---|---|---|---|---|---|
| 1 | Tác tử (Agent) | ETV.MP29 | | | ☐ |
| 2 | Công cụ (Tool) | ETV.MP29 | | | ☐ |
| 3 | Lời nhắc (Prompt) | ETV.MP29 | | | ☐ |
| 4 | Dịch vụ số cho khách hàng | ETV.MP38 | | | ☐ |
| 5 | Điểm tích hợp | ETV.MP37 | | | ☐ |

## 4. Phương án xử lý dữ liệu

*(Phải hoàn tất **trước khi** chấm dứt quyền truy cập — ETV.P35 mục 5.5.3)*

| TT | Loại dữ liệu | Mức phân loại | Cách xử lý (Trích xuất/Di chuyển/Hủy có kiểm soát) | Nơi lưu sau xử lý | Thủ tục áp dụng | Người thực hiện | Ngày hoàn thành | Xác nhận |
|---|---|---|---|---|---|---|---|---|
| 1 | | | | | MP27 / MP34 | | | ☐ |
| 2 | | | | | MP27 / MP34 | | | ☐ |
| 3 | | | | | MP27 / MP34 | | | ☐ |

**Biên bản xử lý dữ liệu kèm theo:** số ................ ngày ..../..../........

## 5. Thu hồi quyền truy cập và cắt kết nối

| TT | Nội dung | Người thực hiện | Ngày thực hiện | Xác nhận |
|---|---|---|---|---|
| 1 | Cắt các điểm tích hợp | | | ☐ |
| 2 | Thu hồi bí mật xác thực (khóa API, chứng thư) theo MP28 | | | ☐ |
| 3 | Thu hồi tài khoản người dùng | | | ☐ |
| 4 | Tắt kiểm tra sức khỏe | | | ☐ |
| 5 | Kết thúc hợp đồng/dịch vụ với nhà cung cấp (nếu có) | | | ☐ |

## 6. Kết luận

☐ **Đủ điều kiện** chuyển bản ghi sang **Hết hiệu lực**　　☐ **Chưa đủ điều kiện** — nội dung còn thiếu: ....................

**Ngày chuyển Hết hiệu lực:** ..../..../........　**Mã nền tảng không được cấp lại cho nền tảng khác** (ETV.P35 mục 5.1.8).

---

| Người lập | Người xác nhận kỹ thuật | Người kiểm tra phụ thuộc | Người phê duyệt |
| --- | --- | --- | --- |
| *(Chủ sở hữu nền tảng)* | *(Đầu mối kỹ thuật)* | *(QLCL)* | *(Lãnh đạo Viện)* |
| Ngày: ..../..../........ | Ngày: ..../..../........ | Ngày: ..../..../........ | Ngày: ..../..../........ |

> Việc ngừng vận hành do **Lãnh đạo Viện** phê duyệt, bắt buộc ghi lý do (ETV.P35 mục 6.1). Hồ sơ lưu 10 năm theo ETV.MP15.
