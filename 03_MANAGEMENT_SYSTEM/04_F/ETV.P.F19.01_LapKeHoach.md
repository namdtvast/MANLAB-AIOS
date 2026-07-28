---
form_code: ETV.P.F19.01
form_name: Lập Kế hoạch Sản xuất Chất chuẩn
form_type: Planning Form
procedure_ref: ETV.P19
issue_date: 2025-04-22
version: 01
applicable_to: Certified Reference Material (CRM) / Reference Material (RM) Production
responsible_dept: Phòng Đo lường Chất lượng
---

# F19.01 – LẬP KẾ HOẠCH SẢN XUẤT CHẤT CHUẨN

## 1. THÔNG TIN CHUNG

### Bảng 1: Trạng thái kế hoạch

| TT | Trạng thái (KH) | Số phiếu (KH) | Trạng thái (ĐG) |
|---|---|---|---|
| 1 | Nháp | F19.01-2025-05-16-001 | (Link từ menu Đánh giá) |

**Ghi chú:** 
- Số phiếu được tự động sinh ra theo định dạng: F19.01-YYYY-MM-DD-XXX
- Trạng thái cho phép: Nháp, Soát xét, Phê duyệt

### Bảng 2: Thông tin yêu cầu từ Hợp đồng

| TT | Số Hợp đồng | Tên khách hàng yêu cầu | Người liên hệ (HĐ) |
|---|---|---|---|
| 1 | 1404.01/25/ĐL-ETV | CÔNG TY CỔ PHẦN GIẢI PHÁP THÔNG MINH XANH (Cty_GSOT) | Cao Duy Trường (Cty_GSOT) |
| 2 | | | |
| 3 | | | |

**Điều kiện lấy dữ liệu:**
1. Chỉ Droplist các hợp đồng có "Yêu cầu thực hiện = Chế tạo/Pha chế". Các yêu cầu khác không có trong Droplist
2. Chỉ hiện Số hợp đồng của "Trạng thái (Hợp đồng) = Đã duyệt" (các trạng thái khác không hiện trong Droplist)
3. Số Hợp đồng đã được Lập kế hoạch thì không hiện trong Droplist

---

## 2. THÔNG TIN YÊU CẦU SẢN PHẨM CẦN SẢN XUẤT

### Bảng 3: Danh mục đối tượng từ Hợp đồng

| TT | Số Hợp đồng | Tên đối tượng | CSSX (Hãng) | Số lượng | Quy cách đóng gói |
|---|---|---|---|---|---|
| 1 | 1404.01/25/ĐL-ETV | Dung dịch COD | ETV | | |
| 2 | | Dung dịch COD | ETV | | |
| 3 | | Dung dịch Sắt | ETV | | |

**Ghi chú:** 
- Bảng này được lấy tự động từ danh mục Hợp đồng (chi tiết theo từng Số hợp đồng)
- Điền số lượng, quy cách đóng gói theo yêu cầu khách hàng

---

## 3. DANH MỤC CHẤT CHUẨN CẦN SẢN XUẤT

### Bảng 4: Thông tin sản xuất chất chuẩn

| TT | Số Hợp đồng | Tên đối tượng | Loại sản phẩm | Giá trị danh định | Đơn vị | U (mục tiêu) | Số lượng | Ngày giao dự kiến |
|---|---|---|---|---|---|---|---|---|
| 1 | 1404.01/25/ĐL-ETV | Dung dịch COD | CRM | 1000 | mg/L | ±20 | 50 | 2025-05-21 |
| 2 | | | | | | | | |
| 3 | | | | | | | | |

**Hướng dẫn điền:**
- **Loại sản phẩm:** CRM (Certified Reference Material) hoặc RM (Reference Material)
- **Giá trị danh định:** Giá trị chuẩn mong muốn
- **Đơn vị:** mg/L, %, ppm, v.v.
- **U (mục tiêu):** Độ không đảm bảo đo mục tiêu
- **Số lượng:** Số chai/đơn vị sản xuất
- **Ngày giao dự kiến:** Ngày hoàn thành sản xuất

---

## 4. NGUỒN VẬT LIỆU GỐC

### Bảng 5: Hóa chất gốc / Nguyên liệu

| TT | Tên hóa chất gốc | CoA (Chứng chỉ chất lượng) | Mã lô (Lot number) | Hạn dùng | Ghi chú |
|---|---|---|---|---|---|
| 1 | Potassium dichromate (K₂Cr₂O₇) | Có | L2502-156 | 2026-12-31 | Sigma-Aldrich |
| 2 | | | | | |
| 3 | | | | | |

**Hướng dẫn điền:**
- **CoA:** Có/Không (phải có chứng chỉ từ nhà cung cấp)
- **Mã lô:** Truy cập được từ nhãn hóa chất
- **Hạn dùng:** Từ ChứngChỉ (CoA)

---

## 5. PHƯƠNG PHÁP VÀ THIẾT BỊ

### Bảng 6: Quy trình thực hiện

| TT | Tên chất chuẩn | Phương pháp thực hiện | SOP/Quy trình | Phần mềm tính toán |
|---|---|---|---|---|
| 1 | COD 1000 mg/L | Pha chế từ hóa chất gốc | SOP-COD-01 (Rev.03) | Excel GUM v2.1 |
| 2 | | | | |
| 3 | | | | |

### Bảng 7: Thiết bị sử dụng

| TT | Tên thiết bị | Model/Số hiệu | Trạng thái hiệu chuẩn | Ngày hiệu chuẩn tiếp theo | Ghi chú |
|---|---|---|---|---|---|
| 1 | Máy đo COD | HACH DR3900 | Đã hiệu chuẩn | 2025-08-15 | Lắp tại Phòng thử |
| 2 | Cân phân tích | Ohaus Explorer | Đã hiệu chuẩn | 2025-10-20 | ±0.0001 g |
| 3 | Bình định mức 1000 mL | Pyrex Class A | Đã hiệu chuẩn | 2025-07-10 | |

**Hướng dẫn điền:**
- **Trạng thái hiệu chuẩn:** Đã hiệu chuẩn / Cần hiệu chuẩn / Ngoài hạn
- Chỉ sử dụng thiết bị đã được hiệu chuẩn

### Bảng 8: Nguồn pha chế

Chọn một trong các lựa chọn sau:

- [ ] Từ dung dịch chuẩn (solution) có sẵn
- [ ] Từ hóa chất chuẩn (dạng rắn) - **Lựa chọn cho COD**
- [ ] Từ hóa chất gốc tự sản xuất (RM)
- [ ] Pha từ nhiều nguồn phối hợp
- [ ] Chiết từ mẫu thực (matrix CRM)

---

## 6. PHÂN CÔNG NHÂN SỰ

### Bảng 9: Phân công công việc

| TT | Công việc | Người thực hiện | Chức vụ | Ghi chú |
|---|---|---|---|---|
| 1 | Pha chế dung dịch | [Tên nhân viên] | Kỹ thuật viên | |
| 2 | Đo giá trị danh định | [Tên nhân viên] | Kỹ thuật viên | |
| 3 | Tính độ không đảm bảo | [Tên nhân viên] | Kỹ thuật viên | |
| 4 | Đánh giá đồng nhất (ANOVA) | [Tên nhân viên] | Kỹ thuật viên | |
| 5 | Đánh giá độ ổn định | [Tên nhân viên] | Kỹ thuật viên | |

**Hướng dẫn điền:**
- Phân công rõ ràng để tránh nhầm lẫn trách nhiệm
- Mỗi công việc cần ít nhất 1 người chính và 1 người kiểm soát

---

## 7. KẾ HOẠCH KIỂM SOÁT CHẤT LƯỢNG

### Bảng 10: Kế hoạch đánh giá

| TT | Tiêu chí đánh giá | Phương pháp | Chuẩn tuân thủ | Ghi chú |
|---|---|---|---|---|
| 1 | Đánh giá độ đồng nhất | Lấy ≥10% số chai, đo ≥3 lần | ISO 33405 | ANOVA one-way |
| 2 | Đánh giá độ ổn định (thời gian thực) | Đánh giá tại T0, 1 tháng, 3 tháng | ISO 33405 | Kiểm tra trôi (drift) |
| 3 | Đánh giá độ ổn định (vận chuyển) | Mô phỏng điều kiện vận chuyển | ISO 17034 | Nếu cần |

---

## 8. KẾ HOẠCH THỜI GIAN THỰC HIỆN

### Bảng 11: Lịch trình sản xuất

| Công đoạn | Dự kiến bắt đầu | Dự kiến kết thúc | Ghi chú |
|---|---|---|---|
| Chuẩn bị vật liệu | 2025-05-01 | 2025-05-05 | Kiểm tra CoA, tính toán khối lượng |
| Pha chế | 2025-05-06 | 2025-05-08 | Ghi nhật ký chi tiết |
| Đo giá trị danh định | 2025-05-09 | 2025-05-12 | ≥10 lần, ≥3 nhân viên |
| Đánh giá độ đồng nhất | 2025-05-13 | 2025-05-15 | Phân tích ANOVA |
| Tính độ không đảm bảo | 2025-05-16 | 2025-05-17 | Theo GUM |
| Đóng gói, dán nhãn | 2025-05-18 | 2025-05-19 | Chuẩn bị giao |
| Hoàn thành | - | 2025-05-21 | Ngày giao khách hàng |

---

## HƯỚNG DẪN ÁP DỤNG

### Ai có thể lập kế hoạch?
- Tất cả nhân viên (Public user, LĐP, LĐV, Admin)

### Ai có thể soát xét?
- Chỉ LĐP, LĐV, Admin

### Ai có thể phê duyệt?
- Chỉ LĐV và Admin

### Trạng thái duyệt

| Bước | Trạng thái | Người thực hiện | Hành động |
|---|---|---|---|
| 1 | Nháp | Lập kế hoạch | Nhập dữ liệu, lưu nháp |
| 2 | Soát xét | Lãnh đạo Phòng | Kiểm tra tính khả thi, độ chính xác |
| 3 | Phê duyệt | Lãnh đạo Viện | Phê duyệt triển khai |
| 4 | Chuẩn bị triển khai | - | Chuyển sang bảng Đánh giá (F19.02) |

---

## LIÊN KẾT ĐẾN BIỂU MẪU KHÁC

- **F19.02** – Đánh giá Kế hoạch Sản xuất Chất chuẩn (được điền sau khi F19.01 được phê duyệt)
- **F19.03** – Kết quả Sản xuất Chất chuẩn (được điền sau khi triển khai hoàn thành)
- **F05.05** – Đánh giá Hóa chất, Thiết bị, Chuẩn đo (hỗ trợ kiểm soát chất lượng)

---

## GHI CHÚ

- Tất cả trường bắt buộc phải điền trước khi soát xét
- Dữ liệu được lưu tự động trên hệ thống ManLab
- Nhật ký thay đổi được ghi lại trong "Lịch sử chỉnh sửa" của hệ thống
