# 02 — CAPABILITIES ⭐ (tầng quan trọng nhất)

Năng lực nghiệp vụ = đơn vị gốc của hệ thống. Mỗi năng lực được hiện thực hóa bởi một
hoặc nhiều quy trình MPxx và số hóa bởi các module Mxx.

| Mã | Năng lực | Quy trình thực hiện |
|---|---|---|
| CAP-01 | Tiếp nhận & Báo giá | MP07 |
| CAP-02 | Ký hợp đồng | MP07 |
| CAP-03 | Lập kế hoạch thực hiện | MP07, MP09 |
| CAP-04 | Hiện trường & Lấy mẫu | MP09 |
| CAP-05 | Hiệu chuẩn | MP04, MP05, MP08, MP10, MP11, MP18 |
| CAP-06 | Kiểm định | MP04, MP05, MP08, MP10, MP11, MP18 |
| CAP-07 | Thử nghiệm | MP04, MP08, MP09, MP10, MP11, MP18 |
| CAP-08 | Quan trắc môi trường | MP09, MP10, MP11, MP21 |
| CAP-09 | Sản xuất mẫu chuẩn (CRM) | MP19, MP20, MP23 |
| CAP-10 | Công bố năng lực hoạt động | MP21 |
| CAP-11 | Đảm bảo đo lường tại doanh nghiệp | MP22 |
| CAP-12 | Đào tạo chuyên môn | MP03 |
| CAP-13 | Quản lý nhân sự | MP03 |
| CAP-14 | Kế toán & Tài chính | — |
| CAP-15 | Mua sắm & Quản lý nhà cung cấp | MP06 |
| CAP-16 | Quản lý thiết bị & chuẩn | MP05 |
| CAP-17 | Chất lượng & Cải tiến | MP01, MP10, MP12, MP13, MP16, MP17, MP24, MP30, MP32 |
| CAP-18 | Quản lý tài liệu & hồ sơ | MP14, MP15 |
| CAP-19 | An toàn thông tin & Dữ liệu | MP27, MP28, MP31, MP33, MP34, MP37 |
| CAP-20 | AI Office & Dịch vụ số | MP29, MP35, MP38 |
| CAP-21 | Chứng chỉ số DMC | MP36 |
| CAP-22 | Bối cảnh & Tri thức tổ chức | MP25, MP26 |


---

**Lưu file gì ở đây:** mỗi năng lực một thư mục `CAP-xx/` gồm `capability.yaml` (định nghĩa năng lực + link tới các MP thực hiện) và `README.md` (mô tả, chủ sở hữu năng lực, KPI năng lực).

**KHÔNG lưu ở đây:** cách làm chi tiết (→ `04_PROCESS_LIBRARY`); mã nguồn/đặc tả module (→ `05`, `09`); tài liệu tiêu chuẩn (→ `03`).

**Lưu ý:** Năng lực là đơn vị **ổn định nhất**, ít thay đổi. Khi mở dịch vụ mới: tạo `CAP` trước, rồi mới gắn `MP`/`M`. Không tạo CAP trùng nghĩa.
