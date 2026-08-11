---
id: ETV.MCO 02
title: "Phương tiện đo cường độ ánh sáng — Quy trình hiệu chuẩn"
type: Quy-trinh
owner: "Viện Kiểm định Công nghệ và Môi trường"
department: "Phòng Đo lường Chất lượng"
prepared_by: ""
prepared_date: "22/04/2026"
reviewed_by: "Trần Thị Hoa"
reviewed_date: "22/04/2026"
approved_by: "Nguyễn Hoàng Giang"
approved_date: "22/04/2026"
process: ""
effective_date: "22/04/2026"
revision: "02"
status: Da-ban-hanh
keywords: [độ rọi, lux, cường độ ánh sáng, photometry, quang kế chuẩn, đèn chuẩn, hiệu chuẩn]
related_documents: []
iso_clause: ["ISO/IEC 17025:2017"]
legal_basis: ["ĐLVN 131:2003", "ĐLVN 257:2014", "ĐLVN 270:2015"]
ai_tags: [calibration-procedure, illuminance-meter, photometry, optics-metrology, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCO 02_Cuong do Anh sang_V1.pdf`"
supersedes: "ETV.MCO 02 lần ban hành 01 (22/04/2019)"
superseded_by: null
---
# PHƯƠNG TIỆN ĐO CƯỜNG ĐỘ ÁNH SÁNG – QUY TRÌNH HIỆU CHUẨN

*Photometry Meter – Calibration Procedure*

|                   |                     |
| ----------------- | ------------------- |
| **Mã số**         | ETV.MCO 02          |
| **Lần ban hành**  | 02                  |
| **Ngày ban hành** | 22/04/2026          |
| **Biên soạn**     | *(bản gốc để trống)* |
| **Soát xét**      | Trần Thị Hoa        |
| **Phê duyệt**     | Nguyễn Hoàng Giang  |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCO 02_Cuong do Anh sang_V1.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khối chữ ký trong bản gốc **để trống**, chưa có tên người biên soạn.
>
> *Ghi chú của bản chuyển đổi:* các công thức toán học ở mục 7.3.2 (công thức sai số tương đối), 7.4 (biểu thức độ nhạy độ rọi), 7.4.1–7.4.3 (ĐKĐB tổng hợp, mở rộng, biểu diễn kết quả) và toàn bộ nội dung trang 8–9/11 (Phụ lục 2) trong bản gốc là **hình ảnh công thức**, không trích xuất được thành text qua lớp text PDF — các mục này để trống nội dung công thức, chỉ giữ tiêu đề và phần văn bản mô tả liền kề; tham khảo bản PDF gốc để xem công thức đầy đủ. Bảng 3 (thành phần ĐKĐB) cũng thiếu cột diễn giải các ký hiệu do cùng nguyên nhân.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian  | Nội dung thay đổi     | Lần ban hành |
| ---------- | --------------------- | ------------ |
| 22/04/2019 | Ban hành lần thứ nhất | 01           |
| 22/04/2026 | Ban hành lần thứ hai  | 02           |

---

## 1. Phạm vi áp dụng

Văn bản kỹ thuật này quy định quy trình hiệu chuẩn ban đầu, định kỳ và sau sửa chữa các phương tiện đo cường độ ánh sáng trong phạm vi đo (0 ÷ 100.000) lux, có độ chính xác đến 2,0 %.

Quy trình này áp dụng đối với nhân viên của Viện Kiểm định Công nghệ và Môi trường (sau đây gọi tắt là PTN) khi hiệu chuẩn PTĐ nói trên.

## 2. Giải thích từ ngữ

Các từ ngữ trong văn bản này được hiểu như sau:

- **2.1. Độ rọi** là đại lượng đặc trưng cho bề mặt được chiếu sáng, là mật độ quang thông trên bề mặt có diện tích S. Đơn vị độ rọi là lux (ký hiệu: lx); độ rọi là tỷ số của quang thông và diện tích bề mặt được chiếu sáng đều của quang thông. Khi mặt được chiếu sáng không đều, độ rọi được tính bằng trung bình cộng của độ rọi các điểm.
- **2.2. Môi trường tối** để kiểm tra điểm "0" đề cập trong quy trình này là môi trường có độ rọi từ 0 lx đến 0,1 lx.
- **2.3. Phương pháp hiệu chuẩn phương tiện đo độ rọi:** phương pháp hiệu chuẩn phương tiện đo độ rọi sử dụng trong quy trình này là phương pháp so sánh với quang kế chuẩn tại các khoảng cách d khác nhau so với đèn chuẩn có nhiệt độ màu từ 2700 K đến 3200 K.
- **2.4. DUT (Device Under Test):** PTĐ cường độ ánh sáng cần hiệu chuẩn.

## 3. Các phép hiệu chuẩn

Phải lần lượt tiến hành các phép kiểm tra ghi trong Bảng 1.

**Bảng 1.**

| TT  | Tên phép hiệu chuẩn           | Theo điều, mục của quy trình |
| --- | ------------------------------- | ----------------------------- |
| 1   | Kiểm tra bên ngoài             | 7.1                            |
| 2   | Kiểm tra kỹ thuật               | 7.2                            |
| 3   | Kiểm tra đo lường               | 7.3                            |
|     | — Kiểm tra điểm "0"             | 7.3.1                          |
|     | — Kiểm tra sai số               | 7.3.2                          |
| 4   | Tính toán độ không đảm bảo đo   | 7.4                            |
| 5   | Xử lý chung                     | 8                               |

## 4. Phương tiện phục vụ hiệu chuẩn

Phương tiện hiệu chuẩn được ghi trong Bảng 2.

**Bảng 2.**

| TT  | Phương tiện hiệu chuẩn                                  | Đặc trưng kỹ thuật                                                                                     |
| --- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 1   | **Chuẩn đo lường**                                          |                                                                                                       |
|     | Phương tiện đo cường độ ánh sáng chuẩn (gọi tắt là quang kế chuẩn) | - Phạm vi đo: (0 ÷ 100.000) lux<br>- U = (0,5 ÷ 1,5) %; k = 2                                    |
| 2   | **Phương tiện đo khác**                                     |                                                                                                       |
| 2.1 | Nguồn sáng (đèn chuẩn)                                      | - Công suất: P = 1000 W ÷ 2000 W<br>- U = (1,0 ÷ 1,5) %; k = 2                                       |
| 2.2 | PTĐ nhiệt độ và độ ẩm môi trường                            | - Dải đo: Nhiệt độ (0 ÷ 50) °C; Độ ẩm tương đối (10 ÷ 95) %RH<br>- Độ phân giải: Nhiệt độ 1 °C; Độ ẩm 1 %RH |

## 5. Điều kiện hiệu chuẩn

Khi tiến hành hiệu chuẩn phải đảm bảo các điều kiện sau:

- Nhiệt độ: (25 ± 2) °C;
- Độ ẩm tương đối: ≤ 80 %RH (không đọng sương).

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành hiệu chuẩn phải thực hiện các công việc chuẩn bị sau đây:

### 6.1. Lắp đặt PTĐ cường độ ánh sáng, DUT

- **6.1.1.** Sử dụng thiết bị định tâm bằng laser chiếu chùm laser hướng về phía lắp đặt PTĐ cường độ ánh sáng.
- **6.1.2.** Sử dụng thiết bị định tâm bằng laser, máy thủy bình, hệ thống vít me để điều chỉnh hệ thống giá đỡ sao cho mặt phẳng chuẩn của PTĐ cường độ ánh sáng vuông góc với trục quang và tâm mặt phẳng chuẩn bộ thu quang nằm trên trục quang.
- **6.1.3.** Thực hiện bước 6.3.1 và 6.3.2 đối với DUT.

### 6.2. Lắp đặt đèn chuẩn

- **6.2.1.** Đèn chuẩn được lắp đặt vào vị trí đui đèn phù hợp trên giá trắc quang.
- **6.2.2.** Sử dụng máy thủy chuẩn, chùm laser và hệ thống vi chỉnh TP 90, giá đỡ đui đèn để căn chỉnh đèn chuẩn sao cho mặt phẳng chuẩn của sợi đốt đèn vuông góc với trục quang và tâm mặt phẳng chuẩn sợi đốt nằm trên trục quang.
- **6.2.3.** Dịch chuyển đèn chuẩn về vị trí ban đầu (điểm 0).

### 6.3. Nối nguồn cung cấp điện cho đèn chuẩn

- **6.3.1.** Kiểm tra cực của đèn chuẩn bằng máy đo vạn năng.
- **6.3.2.** Nối nguồn cung cấp cho đèn chuẩn.

### 6.4. Kiểm tra hệ thống đo

- **6.4.1.** Kiểm tra hệ thống đo nguồn cấp điện cho đèn chuẩn bằng máy đo vạn năng.
- **6.4.2.** Kiểm tra hệ thống đo tín hiệu quang thu được từ PTĐ cường độ ánh sáng đến máy đo dòng nhỏ bằng máy đo vạn năng.

### 6.5. Chuẩn bị các thiết bị dùng để hiệu chuẩn

- **6.5.1.** Bật tất cả các máy đo, để ổn định ít nhất 30 phút trước khi tiến hành đo.
- **6.5.2.** Bật nguồn cung cấp ít nhất 30 phút trước khi tiến hành cung cấp điện cho đèn chuẩn.

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

Phải kiểm tra bên ngoài theo các yêu cầu sau đây:

Kiểm tra bằng mắt thường để xác định rõ DUT với các yêu cầu quy định trong tài liệu kỹ thuật về hình dáng, kích thước, ký, nhãn hiệu và các phụ kiện kèm theo. Bề mặt bộ thu quang của DUT không bị nứt, vỡ và hư hỏng.

### 7.2. Kiểm tra kỹ thuật

Phải kiểm tra kỹ thuật theo các yêu cầu sau đây:

Kiểm tra trạng thái hoạt động bình thường của DUT theo tài liệu kỹ thuật.

### 7.3. Kiểm tra đo lường

DUT được kiểm tra đo lường theo trình tự nội dung, phương pháp và yêu cầu sau đây:

#### 7.3.1. Kiểm tra điểm "0"

Kiểm tra điểm "0" bằng cách dùng DUT để đo dòng quang trong môi trường tối có mức độ rọi từ 0,0 lx đến 0,1 lx. Thực hiện 3 lần phép đo lặp và ghi kết quả vào biên bản (Phụ lục 1).

#### 7.3.2. Kiểm tra sai số độ nhạy độ rọi tại các mức độ rọi

DUT được so sánh với quang kế chuẩn ở các mức độ rọi khác nhau (50 lx; 100 lx; 200 lx; 500 lx; 1000 lx; 3000 lx; 5000 lx; 7000 lx; 10.000 lx). Ghi lại các kết quả đo của quang kế chuẩn và DUT vào biên bản (Phụ lục 1). Mỗi mức độ rọi cần thực hiện 5 lần phép đo lặp.

Sai số tương đối độ nhạy độ rọi của DUT, δ (%): *(công thức là hình ảnh trong bản gốc, không trích xuất được — xem bản PDF gốc)*

- `S_vT`: độ nhạy độ rọi DUT, [A/lx];
- `S_vR`: độ nhạy độ rọi quang kế chuẩn, [A/lx].

### 7.4. Tính toán độ không đảm bảo đo

Độ nhạy độ rọi DUT được tính theo biểu thức sau: *(công thức là hình ảnh trong bản gốc — xem bản PDF gốc)*

#### 7.4.1. Độ không đảm bảo đo tổng hợp, u(S_T)

*(Biểu thức là hình ảnh trong bản gốc — xem bản PDF gốc.)*

Các thành phần độ không đảm bảo đo được biểu diễn trong biểu thức (3) được xác định, trình bày theo Phụ lục 2.

#### 7.4.2. Độ không đảm bảo đo mở rộng, U(S_T)

*(Biểu thức là hình ảnh trong bản gốc — xem bản PDF gốc.)*

**Bảng 3. Các thành phần độ không đảm bảo đo**

*(Cột "Độ không đảm bảo đo chuẩn thành phần tương đối `u_r(y)`" và cột giá trị "`c_i u_r(y)`" trong bản gốc chứa công thức dạng hình ảnh, không trích xuất được. Cột "Hệ số nhạy `c_i`" của toàn bộ các dòng đều bằng 1.)*

| Các thành phần độ không đảm bảo đo | Hệ số nhạy `c_i` |
| --- | --- |
| `u_r(u_R)_rep`   | 1 |
| `u_r(u_R)_ali`   | 1 |
| `u_r(u_R)_inst`  | 1 |
| `u_r(u_R)_stra`  | 1 |
| `u_r(ccf)`       | 1 |
| `u_r(S_Rv)`      | 1 |
| `u_r(S_Rv)_cal`  | 1 |
| `u_r(y_T)_rep`   | 1 |
| `u_r(y_T)_ins`   | 1 |
| `u_r,c(S_Tv)`    |   |
| `U_r,c(S_Tv); k = 2` |   |

#### 7.4.3. Biểu diễn kết quả độ nhạy độ rọi

*(Nội dung là hình ảnh trong bản gốc — xem bản PDF gốc.)*

## 8. Xử lý chung

- **8.1.** PTĐ cường độ ánh sáng sau khi hiệu chuẩn được cấp chứng chỉ hiệu chuẩn (tem hiệu chuẩn, giấy chứng nhận hiệu chuẩn, ...) theo quy định.
- **8.2.** Chu kỳ hiệu chuẩn của PTĐ cường độ ánh sáng khuyến nghị là: 12 tháng.

---

## TÀI LIỆU THAM KHẢO

- **ISO/IEC 17025:2017** — Yêu cầu chung về năng lực của phòng thử nghiệm và hiệu chuẩn;
- **ĐLVN 131:2003** — Hướng dẫn đánh giá độ không đảm bảo đo;
- **ĐLVN 257:2014** — Phương tiện đo độ rọi - Quy trình kiểm định;
- **ĐLVN 270:2015** — Quang kế chuẩn - Quy trình hiệu chuẩn.
