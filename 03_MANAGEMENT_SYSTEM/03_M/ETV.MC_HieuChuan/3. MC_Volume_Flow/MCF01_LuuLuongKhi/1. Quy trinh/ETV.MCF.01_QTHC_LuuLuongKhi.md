---
id: ETV.MCF 01
title: "Phương tiện đo lưu lượng khí — Quy trình hiệu chuẩn"
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
revision: "03"
status: Da-ban-hanh
keywords: [lưu lượng khí, air flow meter, đồng hồ khí, quy đổi điều kiện tiêu chuẩn, hiệu chuẩn]
related_documents: []
iso_clause: ["ISO/IEC 17025:2017"]
legal_basis: ["ĐLVN 131:2004", "ĐLVN 253:2015", "ĐLVN 304:2016", "ASTM D5337-11"]
ai_tags: [calibration-procedure, gas-flow, air-flow-meter, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCF 01_Luu luong khi_V7.pdf`"
supersedes: "ETV.MCF 01 lần ban hành 02 (18/09/2019, sửa 03/01/2020, bổ sung 19/05/2022, ban hành lần 02 — 22/04/2023)"
superseded_by: null
---
# PHƯƠNG TIỆN ĐO LƯU LƯỢNG KHÍ – QUY TRÌNH HIỆU CHUẨN

*Air Flow Meter – Calibration Procedure*

|                   |                     |
| ----------------- | ------------------- |
| **Mã số**         | ETV.MCF 01          |
| **Lần ban hành**  | 03                  |
| **Ngày ban hành** | 22/04/2026          |
| **Biên soạn**     | *(bản gốc để trống)* |
| **Soát xét**      | Trần Thị Hoa        |
| **Phê duyệt**     | Nguyễn Hoàng Giang  |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCF 01_Luu luong khi_V7.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khối chữ ký trong bản gốc để trống, chưa có tên người biên soạn.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian  | Nội dung thay đổi                                                    | Lần ban hành |
| ---------- | ------------------------------------------------------------------------ | ------------ |
| 18/09/2019 | Ban hành lần thứ 01 (theo ý kiến chuyên gia kỹ thuật của BoA)             | 01           |
| 03/01/2020 | Sửa theo ý kiến chuyên gia kỹ thuật của BoA                              | 01           |
| 19/05/2022 | Bổ sung thêm chuẩn 160 L/min và mở rộng phạm vi hiệu chuẩn theo chuẩn mới | 01          |
| 22/04/2023 | Ban hành lần thứ 02 (theo ý kiến Viện trưởng Nguyễn Hoàng Giang)          | 02           |
| 22/04/2026 | Ban hành lần thứ 03                                                       | 03           |

---

## 1. Phạm vi áp dụng

Văn bản kỹ thuật này quy định quy trình hiệu chuẩn cho các phương tiện đo (PTĐ) lưu lượng khí bao gồm lưu lượng kế khí; đồng hồ đo khí; thiết bị lấy mẫu khí; thiết bị lấy mẫu bụi; thiết bị pha loãng khí chuẩn… có phạm vi lưu lượng đến 1.980 L/min và có sai số đến 1,4 %.

Quy trình này áp dụng đối với nhân viên của Viện Kiểm định Công nghệ và Môi trường (sau đây gọi tắt là PTN) khi hiệu chuẩn PTĐ nói trên.

## 2. Giải thích từ ngữ

### 2.1. Thuật ngữ, định nghĩa

Các thuật ngữ và định nghĩa trong văn bản này được hiểu như sau:

1. **Lưu lượng khí:** là lượng chất khí chảy qua một điểm đo trong một khoảng thời gian.
2. **Phạm vi lưu lượng:** khoảng được giới hạn bởi lưu lượng lớn nhất và lưu lượng nhỏ nhất trong đó PTĐ không được vượt quá sai số cho phép lớn nhất (MPE).
3. **Lưu lượng lớn nhất, Qmax:** là giá trị tương ứng với giới hạn trên của phạm vi lưu lượng.
4. **Lưu lượng nhỏ nhất, Qmin:** là giá trị tương ứng với giới hạn dưới của phạm vi lưu lượng.
5. **Lưu lượng cài đặt:** là giá trị cài đặt chỉ thị lưu lượng của thiết bị.
6. **PTĐ lưu lượng khí:** là các phương tiện đo dạng bơm hút/đẩy khí hoặc các loại lưu lượng kế khí có thể điều chỉnh lưu lượng.
7. **Điều kiện tiêu chuẩn:** là điều kiện mà tại đó có áp suất tiêu chuẩn (P0 = 1013,25 hPa), nhiệt độ tiêu chuẩn (T0 = 298,15 °K).[^t0]
8. **Hiệu chuẩn:** là hoạt động xác định, thiết lập mối quan hệ giữa giá trị đo của chuẩn đo lường, phương tiện đo với giá trị đo của đại lượng cần đo.
9. **Hiệu chỉnh:** là tập hợp các thao tác được tiến hành trên hệ thống đo để cho ra số chỉ đã quy định tương ứng với giá trị đã cho của đại lượng được đo.
10. **Độ không đảm bảo đo (ĐKĐB):** thông số gắn với kết quả của phép đo, đặc trưng cho sự phân tán của các giá trị có thể quy cho đại lượng đo một cách hợp lý.
11. **Đơn vị tính:** L/min.

[^t0]: Bản gốc ghi T0 = 298,15 °K tại mục định nghĩa (mục 2.1.7), nhưng bảng ký hiệu ở mục 2.2 và công thức (2)/(4) ở phần thân đều dùng T0 = 273,15 K (0 °C, giá trị tiêu chuẩn thông thường). Đây có khả năng là lỗi đánh máy tại mục 2.1.7 (298,15 K = 25 °C, không phải 0 °C tiêu chuẩn). Giữ nguyên văn cả hai chỗ, giá trị dùng trong tính toán thực tế theo công thức là 273,15 K.

### 2.2. Ký hiệu

| Ký hiệu | Chi tiết                                                       | Đơn vị |
| -------- | ---------------------------------------------------------------- | ------ |
| Ttb      | Nhiệt độ đo tại thiết bị                                          | K      |
| Ptb      | Áp suất đo tại thiết bị                                           | hPa    |
| Qtb      | Lưu lượng của thiết bị                                            | L/min  |
| Tc       | Nhiệt độ đo tại chuẩn                                             | K      |
| Pc       | Áp suất đo tại chuẩn                                              | hPa    |
| Qc       | Lưu lượng của chuẩn                                               | L/min  |
| T0       | Nhiệt độ tiêu chuẩn (273,15 K)                                    | K      |
| P0       | Áp suất tiêu chuẩn (1013,25 hPa)                                  | hPa    |
| Q0tb     | Lưu lượng của thiết bị chuyển về điều kiện tiêu chuẩn             | L/min  |
| Q0c      | Lưu lượng của chuẩn chuyển về điều kiện tiêu chuẩn                | L/min  |
| Q0       | Lưu lượng quy về điều kiện tiêu chuẩn                             | L/min  |
| Q        | Lưu lượng ở điều kiện đo                                          | L/min  |

## 3. Các phép hiệu chuẩn

Phải lần lượt tiến hành các phép kiểm tra ghi trong Bảng 1.

**Bảng 1**

| TT  | Tên phép hiệu chuẩn                                                                                  | Theo điều, mục của quy trình |
| --- | ---------------------------------------------------------------------------------------------------------- | -------------------------------- |
| 1   | Kiểm tra bên ngoài                                                                                           | 7.1                               |
| 2   | Kiểm tra kỹ thuật                                                                                            | 7.2                               |
| 3   | Kiểm tra đo lường — trình tự thực hiện hiệu chuẩn tại 01 điểm lưu lượng                                       | 7.3.1                             |
|     | — tiến hành hiệu chuẩn                                                                                        | 7.3.2                             |
|     | — tính toán chuyển đổi lưu lượng về cùng điều kiện tiêu chuẩn và xác định số hiệu chính                       | 7.3.3                             |
| 4   | Tính toán độ không đảm bảo đo                                                                                 | 7.4                               |
| 5   | Xử lý chung                                                                                                   | 8                                 |

## 4. Phương tiện phục vụ hiệu chuẩn

Phương tiện hiệu chuẩn được ghi trong Bảng 2.

**Bảng 2**

| TT  | Phương tiện hiệu chuẩn        | Đặc trưng kỹ thuật                                                                              |
| --- | -------------------------------- | ---------------------------------------------------------------------------------------------------- |
| 1   | **Chuẩn đo lường**               |                                                                                                        |
| 1.1 | Chuẩn lưu lượng thấp             | Phạm vi đo: (0 ÷ 5.000) mL/min; độ không đảm bảo đo nhỏ hơn 1/2 sai số cho phép của PTĐ cần hiệu chuẩn |
| 1.2 | Chuẩn lưu lượng thấp             | Phạm vi đo: (0 ÷ 10.000) mL/min; độ không đảm bảo đo nhỏ hơn 1/2 sai số cho phép của PTĐ cần hiệu chuẩn |
| 1.3 | Chuẩn lưu lượng                  | Phạm vi đo: (0 ÷ 20) L/min; độ không đảm bảo đo nhỏ hơn 1/2 sai số cho phép của PTĐ cần hiệu chuẩn      |
| 1.4 | Chuẩn lưu lượng                  | Phạm vi đo: (2 ÷ 30) L/min; độ không đảm bảo đo nhỏ hơn 1/2 sai số cho phép của PTĐ cần hiệu chuẩn      |
| 1.5 | Chuẩn đồng hồ thể tích           | Phạm vi đo: (0,4 ÷ 66,7) L/min; độ không đảm bảo đo nhỏ hơn 1/2 sai số cho phép của PTĐ cần hiệu chuẩn  |
| 1.6 | Chuẩn lưu lượng                  | Phạm vi đo: (0 ÷ 160) L/min; độ không đảm bảo đo nhỏ hơn 1/2 sai số cho phép của PTĐ cần hiệu chuẩn     |
| 1.7 | Chuẩn lưu lượng                  | Phạm vi đo: (0 ÷ 300) L/min; độ không đảm bảo đo nhỏ hơn 1/2 sai số cho phép của PTĐ cần hiệu chuẩn     |
| 1.8 | Chuẩn lưu lượng lớn              | Phạm vi đo: (280 ÷ 1.980) L/min; độ không đảm bảo đo nhỏ hơn 1/2 sai số cho phép của PTĐ cần hiệu chuẩn |
| 2   | **Phương tiện phụ**              |                                                                                                        |
| 2.1 | Thiết bị đo áp suất              | Phạm vi đo: (600 ÷ 1.100) hPa; độ chính xác: ± 2,0 hPa                                                 |
| 2.2 | Thiết bị đo nhiệt độ             | Phạm vi đo: (0 ÷ 50) °C; độ chính xác: ± 1 °C                                                          |
| 2.3 | Thiết bị đo độ ẩm                | Phạm vi đo: (15 ÷ 95) %RH; độ chính xác: ± 5 %RH                                                       |
| 2.4 | Thiết bị đo thời gian            | Giá trị độ chia d = 0,01 s                                                                              |
| 3   | **Phương tiện khác**             |                                                                                                        |
| 3.1 | Dụng cụ bảo hộ                   | Áo blue, khẩu trang, găng tay                                                                          |
| 3.2 | Thiết bị đo độ dài               | Dải đo: (0 ÷ 100) mm; độ chính xác: ± 0,1 mm                                                           |

## 5. Điều kiện hiệu chuẩn

Các PTĐ lưu lượng khí (lưu lượng kế hoặc hệ thống đo lưu lượng khí) phải có cơ cấu hút khí với lưu lượng phù hợp với lưu lượng làm việc của lưu lượng kế.

Khi tiến hành hiệu chuẩn, phải đảm bảo các điều kiện môi trường sau đây:

- Địa điểm làm việc phải sạch sẽ, thoáng mát;
- Nhiệt độ: [(20 ÷ 30) ± 5] °C;
- Áp suất: [(960 ÷ 1.080) ± 10] hPa;
- Độ ẩm không khí: [(40 ÷ 85) ± 5] %RH;
- Đảm bảo các đầu nối, ống dẫn khí trong hệ thống hiệu chuẩn phải kín.

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành hiệu chuẩn phải thực hiện các công việc sau đây:

- Chọn thiết bị chuẩn lưu lượng phù hợp với phương tiện đo:
  - Đối với PTĐ cần hiệu chuẩn trong phạm vi đo (0 ÷ 5) L/min có thể sử dụng một trong các chuẩn lưu lượng tại mục (1.1; 1.2; 1.3; 1.4; 1.5; 1.6; 1.7) Bảng 2;
  - Đối với PTĐ cần hiệu chuẩn trong phạm vi đo (5 ÷ 30) L/min có thể sử dụng một trong các chuẩn lưu lượng tại mục (1.2; 1.3; 1.4; 1.5; 1.6; 1.7) Bảng 2;
  - Đối với PTĐ cần hiệu chuẩn trong phạm vi đo (30 ÷ 70) L/min có thể sử dụng một trong các chuẩn lưu lượng tại mục (1.5; 1.6; 1.7) Bảng 2;
  - Đối với PTĐ cần hiệu chuẩn trong phạm vi đo (70 ÷ 300) L/min có thể sử dụng một trong các chuẩn lưu lượng tại mục (1.6; 1.7) Bảng 2;
  - Đối với PTĐ cần hiệu chuẩn trong phạm vi đo (280 ÷ 1.980) L/min sử dụng chuẩn lưu lượng mục 1.8 Bảng 2;
- PTĐ lưu lượng cần hiệu chuẩn phải được đặt trong phòng đạt điều kiện hiệu chuẩn ít nhất 30 phút trước khi tiến hành hiệu chuẩn;
- Kết nối đầu lấy mẫu của PTĐ lưu lượng với hệ thống chuẩn lưu lượng và lắp đặt thiết bị đo nhiệt độ, áp suất trên PTĐ cần hiệu chuẩn;
- Kiểm tra độ kín của hệ thống hiệu chuẩn bằng cách đóng hoàn toàn đầu vào của chuẩn và bật bơm hút của phương tiện đo cần hiệu chuẩn ở mức 80 % lưu lượng hút tối đa. Nếu lưu lượng hút xấp xỉ không thì hệ thống hiệu chuẩn đã kín, ngược lại cần xem lại các vị trí đầu nối sau đó tiến hành kiểm tra lại độ kín;
- Chuẩn bị các dụng cụ bảo hộ lao động.

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

Phải kiểm tra bên ngoài theo các yêu cầu sau đây:

- Kiểm tra nhãn mác: thiết bị cần kiểm định phải có ký hiệu chiều lưu lượng, có nhãn mác ghi rõ xuất xứ, số hiệu sản phẩm (serial);
- Kiểm tra bằng mắt để xác định sự phù hợp của thiết bị cần hiệu chuẩn đối với các yêu cầu quy định trong tài liệu kỹ thuật, hình dáng kích thước, hiển thị, tài liệu và phụ kiện kèm theo.

### 7.2. Kiểm tra kỹ thuật

Phải kiểm tra kỹ thuật theo các yêu cầu sau đây: kiểm tra trạng thái hoạt động bình thường của thiết bị cần hiệu chuẩn theo hướng dẫn sử dụng.

### 7.3. Kiểm tra đo lường

PTĐ lưu lượng khí được kiểm tra đo lường theo trình tự nội dung, phương pháp và yêu cầu sau đây:

#### 7.3.1. Hiệu chuẩn tại điểm (1 ÷ 1,1) Qmin

**a) Hiệu chuẩn với phương tiện đo sử dụng chuẩn đo lường tại mục (1.1; 1.2; 1.3; 1.4; 1.6; 1.7; 1.8)**

- **Bước 1:** Đặt giá trị trên PTĐ về điểm lưu lượng cần hiệu chuẩn và đợi giá trị chỉ thị ổn định;
- **Bước 2:** Thực hiện 5 lần đọc, mỗi lần cách nhau 15 s, kết quả hiệu chuẩn tại mỗi lưu lượng tính bằng trung bình cộng của 5 lần đọc. Ghi lại hiển thị lưu lượng, nhiệt độ, áp suất trên PTĐ cần hiệu chuẩn và trên chuẩn vào biên bản Phụ lục I;
- **Bước 3:** Lưu lượng mỗi lần đo của chuẩn được tính toán theo công thức:

  $$
  Q_c = \frac{V_c}{t} \tag{1}
  $$

  Trong đó: `Q_c`: lưu lượng tại chuẩn ở điều kiện đo, L/min; `V_c`: thể tích tại chuẩn ở điều kiện đo, L; `t`: thời gian hiệu chuẩn, min.

  > *Ghi chú:* Trường hợp số hiệu chính kết quả đo lưu lượng của chuẩn theo giấy chứng nhận hiệu chuẩn nhỏ hơn độ chính xác của chuẩn thì không cần hiệu chính kết quả đo của chuẩn.

**b) Hiệu chuẩn với phương tiện sử dụng chuẩn đo lường tại mục (1.5)**[^muc_b]

- Đối với PTĐ cần hiệu chuẩn ở điểm lưu lượng thuộc phạm vi đo (30 ÷ 70) L/min cần sử dụng chuẩn lưu lượng dạng thể tích kết hợp đồng hồ bấm thời gian. Các bước thực hiện như sau:
  - Kết nối phương tiện đo cần hệ thống hiệu chuẩn gồm đồng hồ khí chuẩn và các thiết bị đo nhiệt độ, áp suất trên đường ống;
  - Điều chỉnh lưu lượng cần hiệu chuẩn trên PTĐ cần hiệu chuẩn;
  - Chuyển hệ thống chuẩn về trạng thái bắt đầu;
  - Chuyển dòng lưu lượng cho chất khí chảy qua PTĐ vào hệ thống hiệu chuẩn;
  - Tắt PTĐ và xác định giá trị thể tích, nhiệt độ, áp suất chỉ thị trên hệ thống chuẩn và thể tích, nhiệt độ, áp suất trên PTĐ;
- Tiếp tục thực hiện các bước 2 và bước 3 như tại điểm a) Khoản 7.3.1.

[^muc_b]: Bản gốc ghi tiêu đề mục b) là "Hiệu chuẩn với phương tiện sử dụng chuẩn đo lường tại mục (1.1; 1,2; 1.3; 1.4; 1.6; 1.7; 1.8)" — trùng lặp với tiêu đề mục a), nhưng nội dung thân mục b) mô tả trường hợp dùng "chuẩn lưu lượng dạng thể tích kèm đồng hồ bấm thời gian" cho dải (30 ÷ 70) L/min, tức là chuẩn đồng hồ thể tích mục 1.5 trong Bảng 2 — không khớp với tiêu đề liệt kê. Bản chuyển đổi này sửa tiêu đề mục b) cho khớp với nội dung thân mục, giữ nguyên nội dung.

#### 7.3.2. Hiệu chuẩn tại điểm (0,45 ÷ 0,55) Qmax và (0,9 ÷ 1) Qmax

Cách thức thực hiện tương tự tại mục 7.3.1. Trong trường hợp khách hàng yêu cầu PTN hiệu chuẩn tại các điểm cố định khác thì PTN tiến hành hiệu chuẩn PTĐ theo yêu cầu của khách hàng.

#### 7.3.3. Tính toán chuyển đổi lưu lượng về cùng điều kiện tiêu chuẩn và xác định số hiệu chính

Quy đổi kết quả đo lưu lượng tại chuẩn và tại PTĐ lưu lượng ở điều kiện đo về cùng điều kiện tiêu chuẩn để so sánh khi tính toán kết quả hiệu chuẩn.

Công thức quy đổi đối với lưu lượng tại chuẩn:

$$
Q_{oc} = Q_c \times \frac{P_c}{P_0} \times \frac{T_0}{T_c} \times \frac{Z_0}{Z} \tag{2}
$$

Công thức quy đổi đối với lưu lượng tại PTĐ:

$$
Q_{otb} = Q_{tb} \times \frac{P_{tb}}{P_0} \times \frac{T_0}{T_{tb}} \times \frac{Z_0}{Z} \tag{3}
$$

Trong đó:

- `Q_oc`: lưu lượng tại chuẩn ở điều kiện đo quy đổi về điều kiện tiêu chuẩn, L/min;
- `Q_otb`: lưu lượng tại PTĐ ở điều kiện đo quy đổi về điều kiện tiêu chuẩn, L/min;
- `Q_c`: lưu lượng tại chuẩn ở điều kiện đo, L/min;
- `Q_tb`: lưu lượng tại PTĐ ở điều kiện đo, L/min;
- `P_0`: áp suất tại điều kiện tiêu chuẩn, hPa;
- `P_c`: áp suất trung bình tại chuẩn ở điều kiện đo trong thời gian thực hiện hiệu chuẩn, hPa;
- `P_tb`: áp suất trung bình tại PTĐ ở điều kiện đo trong thời gian thực hiện hiệu chuẩn, hPa;
- `T_0`: nhiệt độ tại điều kiện tiêu chuẩn, K;
- `T_c`: nhiệt độ trung bình tại chuẩn ở điều kiện đo trong thời gian thực hiện hiệu chuẩn, K;
- `T_tb`: nhiệt độ trung bình tại PTĐ ở điều kiện đo trong thời gian thực hiện hiệu chuẩn, K;
- `Z_0, Z`: lần lượt là hệ số nén của không khí ở điều kiện tiêu chuẩn và điều kiện đo, chúng được xác định theo tài liệu "Gas Property Equations for NIST Fluid Flow Gas Flow Measurement Calibration Services, John D. Wright" trang 3, ấn bản năm 2004; chúng được coi bằng 1 nếu áp suất của thiết bị không lớn hơn 300 kPa.

Số hiệu chính tại mỗi điểm lưu lượng hiệu chuẩn được xác định bằng hiệu số giữa giá trị trung bình của các kết quả đo trên phương tiện đo và chuẩn theo công thức:

$$
\Delta hc = Q_{oc} - Q_{otb} = \left(Q_c \times \frac{P_c}{P_0} \times \frac{T_0}{T_c} \times \frac{Z_0}{Z}\right) - \left(Q_{tb} \times \frac{P_{tb}}{P_0} \times \frac{T_0}{T_{tb}} \times \frac{Z_0}{Z}\right) = \frac{1013,25}{298,15}\left(Q_c \times \frac{P_c}{T_c} - Q_{tb} \times \frac{P_{tb}}{T_{tb}}\right) \tag{4}
$$

### 7.4. Tính toán độ không đảm bảo đo

Độ không đảm bảo của toàn bộ quá trình hiệu chuẩn PTĐ lưu lượng khí được dựa trên sự phân tích các nguồn gây nên sai số chủ yếu là các nguồn có tính chất ngẫu nhiên của các phép đo và tính toán trung gian. Các độ không đảm bảo thành phần được xác định, tổng hợp thành độ không đảm bảo tổng hợp gắn với giá trị trung bình lưu lượng và cuối cùng thông báo dưới dạng ĐKĐB mở rộng với hệ số phủ k = 2, xác suất tin cậy P = 95 %.

#### 7.4.1. Các yếu tố gây ra ĐKĐB bao gồm

- PTĐ cần hiệu chuẩn;
- Chuẩn đo lường;
- Thiết bị đo nhiệt độ, áp suất chuẩn;
- Thiết bị đo độ dài;
- Một số ảnh hưởng ngẫu nhiên khác.

#### 7.4.2. Tính toán ĐKĐB của các yếu tố ảnh hưởng tại tất cả các điểm hiệu chuẩn

Từ mô hình tính toán Δhc theo công thức (4), các thành phần của độ không đảm bảo đo cho trong bảng sau:

| Yếu tố                                              | Phân bố  | Loại | ĐKĐB chuẩn |
| ------------------------------------------------------- | -------- | ---- | ---------- |
| ĐKĐB do độ lặp lại của PTĐ cần hiệu chuẩn                | Chuẩn    | A    | uA         |
| ĐKĐB do ảnh hưởng của độ phân giải của PTĐ cần hiệu chuẩn | Chữ nhật | B    | upg        |
| ĐKĐB của chuẩn đo độ dài                                 | Chữ nhật | B    | udd        |
| ĐKĐB của chuẩn lưu lượng                                 | Chuẩn    | B    | uch        |
| ĐKĐB của đồng hồ bấm giờ                                 | Chuẩn    | B    | udh        |
| ĐKĐB của PTĐ áp suất tại chuẩn                           | Chuẩn    | B    | upc        |
| ĐKĐB của PTĐ nhiệt độ tại chuẩn                          | Chuẩn    | B    | utc        |
| ĐKĐB của PTĐ nhiệt độ tại PTĐ                            | Chuẩn    | B    | uttb       |
| ĐKĐB của PTĐ áp suất tại PTĐ                             | Chuẩn    | B    | uptb       |

Ta có ĐKĐB tổng hợp là đại lượng được xác định từ tổ hợp chuẩn:

$$
u_{hc} = \sqrt{u_{Qoc}^2 + u_{Qotb}^2} \tag{5}
$$

Với:

$$
u_{Qoc} = Q_{oc} \times \sqrt{\frac{u_{ch}^2}{Q_{oc}^2} + \frac{u_{pc}^2}{P_c^2} + \frac{u_{tc}^2}{(T_c + 273,15)^2}} \tag{6}
$$

$$
u_{Qotb} = Q_{otb} \times \sqrt{\frac{u_A^2 + u_{pg}^2}{Q_{od}^2} + \frac{u_{ptb}^2}{P_{tb}^2} + \frac{u_{ttb}^2}{(T_{tb} + 273,15)^2}} \tag{7}
$$

Trường hợp PTĐ hiệu chuẩn trong dải (30 ÷ 70) L/min, sử dụng chuẩn lưu lượng dạng thể tích kèm đồng hồ bấm giờ để hiệu chuẩn, khi đó `u_Qoc` được tính như sau:

$$
u_{Qoc} = \frac{V_{oc}}{t} \times \sqrt{\frac{u_{ch}^2}{V_{oc}^2} + \frac{u_{dh}^2}{t_{dh}^2} + \frac{u_{pc}^2}{P_c^2} + \frac{u_{tc}^2}{(T_c + 273,15)^2}} \tag{8}
$$

Tính `u_ch`:

$$
u_{ch} = \frac{U_{ch}}{2} \tag{9}
$$

`U_ch`: ĐKĐB của chuẩn lưu lượng lấy từ giấy chứng nhận hiệu chuẩn, L/min (hoặc L khi sử dụng chuẩn đồng hồ thể tích để hiệu chuẩn PTĐ trong dải (30 ÷ 70) L/min).

Tính `u_pc`:

$$
u_{pc} = \frac{U_{pc}}{2} \tag{10}
$$

`U_pc`: ĐKĐB của thiết bị đo áp suất tại chuẩn từ giấy chứng nhận hiệu chuẩn, hPa.

Tính `u_tc`:

$$
u_{tc} = \frac{U_{tc}}{2} \tag{11}
$$

`U_tc`: ĐKĐB của thiết bị đo nhiệt độ tại chuẩn từ giấy chứng nhận hiệu chuẩn, K.

Tính `u_A`:

$$
u_A = s(\overline{\Delta hc}) = \frac{s(\Delta hc_k)}{\sqrt{n}} = \sqrt{\frac{\sum_{k=1}^{n} (\Delta hc_k - \overline{\Delta hc})^2}{n(n-1) \times \overline{\Delta hc}^2}} \times 100 \tag{12}
$$

Trong hầu hết các trường hợp, ước lượng tốt nhất có thể có của các giá trị kỳ vọng của kết quả hiệu chính lưu lượng Δhc là trung bình số học `Δhc̄`, nó thay đổi một cách ngẫu nhiên. Trung bình số học của n kết quả đo độc lập:

$$
\overline{\Delta hc} = \frac{1}{n}\sum_{k=1}^{n} \Delta hc_k \tag{13}
$$

Độ lệch chuẩn thực nghiệm `s(Δhc_k)` được dùng để ước lượng phân bố của Δhc:

$$
s(\Delta hc_k) = \sqrt{\frac{1}{n-1}\sum_{k=1}^{n} (\Delta hc_k - \overline{\Delta hc})^2} \tag{14}
$$

Độ lệch chuẩn thực nghiệm `s(Δhc̄)` của giá trị trung bình được dùng để ước lượng độ rộng của phân bố các giá trị trung bình:

$$
s(\overline{\Delta hc}) = \frac{s(\Delta hc_k)}{\sqrt{n}} \tag{15}
$$

Tính `u_pg`: đối với PTĐ dạng lưu lượng kế có bộ phận chỉ thị kiểu thang đo, độ phân giải được xác định theo công thức:

$$
a_{pg} = \frac{a_d \times d}{l_d} \tag{16}
$$

Trong đó: `a_pg`: độ phân giải của PTĐ lưu lượng cần hiệu chuẩn, L/min; `a_d`: khả năng phân biệt của mắt người, a_d = 1 mm; `d`: giá trị độ chia của thang đo, L/min; `l_d`: chiều dài độ chia của thang đo, mm.

Khi đó ĐKĐB do độ phân giải của PTĐ:

$$
u_{pg} = a_d \times \frac{d}{l_d} \times \sqrt{\frac{u_d^2}{d^2} + \frac{u_{dd}^2}{l_d^2}} = \frac{d}{l_d} \times \sqrt{\frac{(d/2\sqrt{3})^2}{d^2} + \frac{(U_{dd}/2)^2}{l_d^2}} \tag{17}
$$

Với `U_dd` là ĐKĐB của thước đo độ dài từ giấy chứng nhận hiệu chuẩn, mm.

Đối với PTĐ lưu lượng kiểu điện tử thì `a_pg = d`. Khi đó ĐKĐB do độ phân giải của PTĐ:

$$
u_{pg} = \frac{d}{2\sqrt{3}} \tag{18}
$$

Tính `u_ptb`:

$$
u_{ptb} = \frac{U_{ptb}}{2} \tag{19}
$$

`u_ptb`: ĐKĐB của thiết bị đo áp suất tại PTĐ lấy theo giấy chứng nhận hiệu chuẩn, hPa.

Tính `u_ttb`:

$$
u_{ttb} = \frac{U_{ttb}}{2} \tag{20}
$$

`U_ttb`: ĐKĐB của thiết bị đo nhiệt độ tại PTĐ lấy theo giấy chứng nhận hiệu chuẩn, K.

Tính `u_dh`:

$$
u_{dh} = \frac{U_{dh} \times 24 \times 60}{2} \tag{21}
$$

`U_dh`: ĐKĐB của chuẩn đồng hồ bấm giờ lấy từ giấy chứng nhận hiệu chuẩn, phút.

> *Lưu ý:* Kết quả hiệu chuẩn của đồng hồ bấm giờ trong giấy chứng nhận là tính trong 24h và chỉ xác định ĐKĐB của đồng hồ bấm giờ khi sử dụng kèm chuẩn lưu lượng dạng thể tích để hiệu chuẩn PTĐ trong dải (30 ÷ 70) L/min. Trường hợp không sử dụng đồng hồ bấm giờ thì bỏ qua ĐKĐB do thành phần này.

**Tính toán ĐKĐB tổng hợp:** ĐKĐB tổng hợp (uc) tại mỗi điểm lưu lượng:

$$
u_c = \sqrt{u_{Qoc}^2 + u_{Qotb}^2}\ \text{(L/min)} \tag{22}
$$

ĐKĐB mở rộng được xác định cho mỗi điểm lưu lượng:

$$
U = k \times u_c\ \text{(L/min)} \tag{23}
$$

Với k là hệ số bao phủ, hệ số bằng số được sử dụng như là bội của ĐKĐB chuẩn kết hợp để đưa ra ĐKĐB mở rộng, thường được chọn k = 2 với mức tin cậy xấp xỉ 95 %.

## 8. Xử lý chung

- **8.1.** Phương tiện đo lưu lượng khí sau khi hiệu chuẩn được dán tem, cấp giấy chứng nhận hiệu chuẩn kèm theo kết quả hiệu chuẩn.
- **8.2.** Chu kỳ hiệu chuẩn được khuyến nghị là 01 năm.

## 9. Phụ lục

Biên bản hiệu chuẩn phương tiện đo lưu lượng khí (`ETV.MCF.F 01.01`).

## PHỤ LỤC 02 — Sơ đồ hiệu chuẩn phương tiện đo lưu lượng khí

1. PTĐ lưu lượng khí dạng bơm hút: Chuẩn — PTĐ (kết nối trực tiếp).
2. PTĐ lưu lượng khí dạng lưu lượng kế: Chuẩn — PTĐ — Bơm hút.

## TÀI LIỆU THAM KHẢO

1. ĐLVN 131:2004, "Hướng dẫn đánh giá và trình bày độ không đảm bảo đo", 23 trang.
2. C. Douglas Faison and Carroll S. Brickenkamp (2004), "NIST Handbook 150-2G Calibration Laboratories Technical Guide for Mechanical Measurements".
3. Casella USA (2005), "APEX SERIES PERSONAL AIR SAMPLING PUMPS & PUMPMANAGER SOFTWARE".
4. ASTM D5337-11, "Standard Practice for Flow Rate for Calibration of Personal Sampling Pumps".
5. ĐLVN 253:2015, "Đồng hồ khí công nghiệp - quy trình kiểm định".
6. ĐLVN 304:2016, "Đồng hồ chuẩn đo khí kiểu vòi phun - quy trình hiệu chuẩn".
