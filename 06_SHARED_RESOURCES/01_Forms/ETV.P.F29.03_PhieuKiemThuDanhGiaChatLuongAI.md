---
id: ETV.P.F29.03
title: "Phiếu kiểm thử và đánh giá chất lượng hệ thống trí tuệ nhân tạo"
type: Bieu-mau
process: MP29_AI
module: M29_AI
revision: "01"
effective_date: "24/08/2026"
status: Cho-soat-xet
knowledge_category: HTQL-noi-bo
permission: Noi-bo
source: "Viện Kiểm định Công nghệ và Môi trường (ETV)"
related_documents: [ETV.P29, ETV.P.F29.01, ETV.P.F29.02, ETV.P.F29.04]
---
# PHIẾU KIỂM THỬ VÀ ĐÁNH GIÁ CHẤT LƯỢNG HỆ THỐNG TRÍ TUỆ NHÂN TẠO

|  |  |
| --- | --- |
| **Mã số** | ETV.P.F 29.03 |
| **Lần ban hành** | 01 |
| **Ngày ban hành** | ..../..../........ |
| **Soát xét** | ..../..../.... |
| **Trang** | 1/1 |

LIÊN HIỆP CÁC HỘI KHOA HỌC VÀ KỸ THUẬT VIỆT NAM
VIỆN KIỂM ĐỊNH CÔNG NGHỆ VÀ MÔI TRƯỜNG

**Số phiếu:** ...................　**Ngày chạy đánh giá:** ..../..../........

> Bắt buộc đối với hệ thống AI mức tác động **Trung bình** và **Cao** trước khi vận hành, khi đổi mô hình/nhà cung cấp, sau mỗi sự cố AI mức Nghiêm trọng, và định kỳ (Cao: 06 tháng · Trung bình: 01 năm). **Cổng triển khai:** không được kích hoạt phiên bản lời nhắc mới nếu lần đánh giá gần nhất **Không đạt** (ETV.P29 mục 5.3.2).

## 1. Đối tượng đánh giá

| Trường | Nội dung |
|---|---|
| Mã hệ thống AI (F29.01) | |
| Tên hệ thống AI | |
| Mã hồ sơ AIA (F29.02) | |
| Mô hình sử dụng | |
| Phiên bản lời nhắc được đánh giá | |
| Danh sách công cụ được phép | |
| Lý do đánh giá | ☐ Trước khi vận hành　☐ Định kỳ　☐ Đổi mô hình/nhà cung cấp　☐ Sau sự cố　☐ Thay đổi lớn |
| Môi trường chạy đánh giá | ☐ Kiểm thử　☐ Tiền vận hành　☐ Vận hành *(chỉ khi không thể tách môi trường, phải nêu lý do)* |
| Dữ liệu dùng để kiểm thử | ☐ Mô phỏng　☐ Thật đã ẩn danh　☐ Thật *(cần LĐV phê duyệt — số văn bản: ..........)* |

## 2. Kết quả theo nhóm kiểm thử

| TT | Nhóm kiểm thử | Số tình huống | Số đạt | Ngưỡng chấp nhận | Kết quả | Ghi chú |
|---|---|---|---|---|---|---|
| 1 | Tính đúng đắn của đầu ra trên tình huống công việc thật | | | | ☐ Đạt ☐ Không | |
| 2 | Hành vi khi thiếu thông tin *(không bịa dữ liệu, số liệu, mã tài liệu)* | | | | ☐ Đạt ☐ Không | |
| 3 | Kiểm thử tiêm lệnh qua dữ liệu đầu vào | | | | ☐ Đạt ☐ Không | |
| 4 | Kiểm thử rò rỉ *(lời nhắc hệ thống, bí mật xác thực, dữ liệu ngoài quyền)* | | | | ☐ Đạt ☐ Không | |
| 5 | Kiểm thử giới hạn quyền *(công cụ ngoài danh sách, công cụ bị vô hiệu hóa)* | | | | ☐ Đạt ☐ Không | |
| 6 | Tính nhất quán của kết quả với cùng đầu vào | | | | ☐ Đạt ☐ Không | |
| 7 | Kiểm thử ranh giới bất biến *(AI từ chối kết luận/phê duyệt thay người có thẩm quyền)* | | | | ☐ Đạt ☐ Không | |
| 8 | Khác: ................................ | | | | ☐ Đạt ☐ Không | |

*Nhóm 3, 4, 5 và 7 là **bắt buộc đạt**; chỉ cần một nhóm trong số này Không đạt thì kết luận chung là **Không đạt**.*

## 3. Tình huống không đạt và hướng xử lý

| TT | Mã tình huống | Mô tả sai lệch quan sát được | Mức nghiêm trọng | Nguyên nhân sơ bộ | Hành động sửa chữa | Người thực hiện | Hạn hoàn thành |
|---|---|---|---|---|---|---|---|
| 1 | | | | | | | ..../..../........ |
| 2 | | | | | | | ..../..../........ |

## 4. Kết luận

☐ **ĐẠT** — đủ điều kiện vận hành/tiếp tục vận hành với phiên bản lời nhắc nêu tại mục 1

☐ **KHÔNG ĐẠT** — **không** được kích hoạt phiên bản lời nhắc mới; phải sửa và chạy lại đánh giá

**Ngày đánh giá lại kế tiếp:** ..../..../........

**Khuyến nghị bổ sung** *(rào chắn, giới hạn công cụ, đào tạo người dùng, cập nhật AIA)*: ........................

---

| Người thực hiện đánh giá | Người soát xét | Người phê duyệt kết quả |
| --- | --- | --- |
| *(ĐMKT/QTHT)* | *(PT.AI, khác người thực hiện)* | *(Lãnh đạo Viện — với hệ thống AI mức Cao)* |
| Ngày: ..../..../........ | Ngày: ..../..../........ | Ngày: ..../..../........ |

> Người thực hiện ≠ người phê duyệt. Trợ lý AI có thể chạy tình huống kiểm thử theo kịch bản, nhưng **không** kết luận Đạt/Không đạt và **không** phê duyệt phiếu này (ETV.P29 mục 4.8). Hồ sơ lưu theo ETV.MP15.
