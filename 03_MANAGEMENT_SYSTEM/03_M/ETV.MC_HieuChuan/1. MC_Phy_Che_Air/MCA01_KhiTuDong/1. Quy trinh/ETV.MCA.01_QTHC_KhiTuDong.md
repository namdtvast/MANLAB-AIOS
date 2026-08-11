---
id: ETV.MCA 01
title: "Phương tiện đo nồng độ khí của trạm quan trắc không khí tự động, liên tục — Quy trình hiệu chuẩn"
type: Quy-trinh
owner: "Viện Kiểm định Công nghệ và Môi trường"
department: "Phòng Đo lường Chất lượng"
prepared_by: "Nguyễn Văn Huy"
prepared_date: "22/04/2026"
reviewed_by: "Trần Thị Hoa"
reviewed_date: "22/04/2026"
approved_by: "Nguyễn Hoàng Giang"
approved_date: "22/04/2026"
process: ""
effective_date: "22/04/2026"
revision: "02"
status: Da-ban-hanh
keywords: [SO2, CO, NOx, THC, O3, trạm quan trắc không khí tự động, khí chuẩn, pha loãng khí, độ trôi, thời gian đáp ứng]
related_documents: ["ETV.MCA.F 01.01"]
iso_clause: ["ISO/IEC 17025:2017", "ISO 6145", "ISO 14956", "ISO 20988"]
legal_basis: ["ĐLVN 45:2001", "Quyết định 1292/QĐ-TCMT ngày 28/10/2013", "TCVN 6751:2009 (ISO 9169:2006)"]
ai_tags: [calibration-procedure, ambient-air-quality, gas-analyzer, aaqms, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCA 01_KK tu dong_V2.pdf`"
supersedes: "ETV.MCA 01 lần ban hành 01 (22/04/2019, soát xét 08/04/2021)"
superseded_by: null
---
# PHƯƠNG TIỆN ĐO NỒNG ĐỘ KHÍ CỦA TRẠM QUAN TRẮC KHÔNG KHÍ TỰ ĐỘNG, LIÊN TỤC – QUY TRÌNH HIỆU CHUẨN

*Gas analyzers for continuous ambient air quality monitoring system – Calibration procedure*

|                   |                     |
| ----------------- | ------------------- |
| **Mã số**         | ETV.MCA 01          |
| **Lần ban hành**  | 02                  |
| **Ngày ban hành** | 22/04/2026          |
| **Biên soạn**     | Nguyễn Văn Huy      |
| **Soát xét**      | Trần Thị Hoa        |
| **Phê duyệt**     | Nguyễn Hoàng Giang  |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCA 01_KK tu dong_V2.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khi có khác biệt, bản PDF do Viện ban hành là bản có giá trị áp dụng.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian  | Nội dung thay đổi                              | Lần ban hành |
| ---------- | ---------------------------------------------- | ------------ |
| 22/04/2019 | Ban hành lần thứ nhất                          | 01           |
| 08/04/2021 | Bổ sung mục 2.9. Cách thức chuyển đổi đơn vị   | 01           |
| 22/04/2026 | Ban hành lần 2                                 | 02           |

---

## 1. Phạm vi áp dụng

Văn bản kỹ thuật này quy định quy trình hiệu chuẩn cho phương tiện đo (PTĐ) nồng độ khí (SO₂, CO, NOₓ, THC và O₃) của trạm quan trắc không khí tự động, liên tục có đặc trưng kỹ thuật được nêu trong Bảng 1.

**Bảng 1.**

| TT  | Đặc trưng kỹ thuật       | Đơn vị | SO₂            | CO, THC         | NOₓ            | O₃             |
| --- | ------------------------ | ------ | -------------- | --------------- | -------------- | -------------- |
| 1   | Phạm vi đo               | %V     | (0 ÷ 20)×10⁻⁴  | (0 ÷ 100)×10⁻⁴  | (0 ÷ 20)×10⁻⁴  | (0 ÷ 10)×10⁻⁴  |
|     |                          | ppm    | (0 ÷ 20)       | (0 ÷ 100)       | (0 ÷ 20)       | (0 ÷ 10)       |
| 2   | Sai số lớn nhất cho phép | %      | ± 5 (giá trị đọc) | ± 5 (giá trị đọc) | ± 5 (giá trị đọc) | ± 5 (giá trị đọc) |

Quy trình này áp dụng đối với nhân viên của Viện Kiểm định Công nghệ và Môi trường (sau đây gọi tắt là PTN) khi hiệu chuẩn PTĐ nói trên.

## 2. Giải thích từ ngữ

Các từ ngữ trong văn bản này được hiểu như sau:

- **2.1. Phương tiện đo nồng độ các thông số khí (gọi tắt là PTĐ):** là phương tiện kỹ thuật để thực hiện phép đo.
- **2.2. Sai số lớn nhất cho phép (MPE):** giá trị cực trị của sai số đo, đối với giá trị đại lượng quy chiếu đã biết, cho phép bằng yêu cầu kỹ thuật hoặc các quy định đối với phép đo, phương tiện đo hoặc hệ thống đo đã cho.
- **2.3. Độ trôi:** sự thay đổi liên tục tăng lên hoặc giảm xuống của chỉ số theo thời gian, gây ra do những thay đổi trong tính chất đo lường của phương tiện đo.
- **2.4. Khí "không":** là khí có nồng độ cần hiệu chuẩn nhỏ hơn giới hạn phát hiện của phương tiện đo.
- **2.5. Khí NOₓ (Nitơ Oxyt):** là tổng nồng độ khí NO (Nitơ monoxit) và NO₂ (Nitơ dioxit).
- **2.6. Khí chuẩn, hỗn hợp khí chuẩn:** là loại chất chuẩn được chứng nhận (thể khí) có các thành phần cần hiệu chuẩn ổn định với nồng độ xác định, thường được nén với áp suất cao trong bình kim loại.
- **2.7. Điểm "nồng độ":** là điểm khí chuẩn có giá trị nồng độ khí chuẩn pha loãng phù hợp với phạm vi đo của PTĐ.
- **2.8. Đơn vị tính:**
  - %V: phần trăm (thể tích); 1 %V = 10⁴ ppm = 10⁷ ppb;
  - ppm: phần triệu (thể tích);
  - ppb: phần tỷ (thể tích).
- **2.9. Cách thức chuyển đổi:** Căn cứ vào các quy định hiện hành về đơn vị đo và điều kiện tiêu chuẩn trong các quy chuẩn kỹ thuật quốc gia về môi trường tương ứng, phải tính toán chuyển đổi đơn vị đo sang đơn vị mg/m³ tại điều kiện tiêu chuẩn tương ứng. Trường hợp kết quả đo của thiết bị là ppm và điều kiện tiêu chuẩn quy định là 25 °C, 760 mmHg, nồng độ các chất ô nhiễm được tính theo công thức sau:

  | Chất | Hệ số chuyển đổi |
  | --- | --- |
  | CO  | ppm × 1,14 = mg/Nm³ |
  | SO₂ | ppm × 2,62 = mg/Nm³ |
  | NO₂ | ppm × 1,88 = mg/Nm³ |
  | NO  | ppm × 1,23 = mg/Nm³ |

  Đối với các PTĐ khác thì cũng được tính toán và chuyển đổi tương tự, hoặc truy cập website: `https://www.teesing.com/en/page/library/tools/ppm-mg3-converter`

## 3. Các phép hiệu chuẩn

Phải lần lượt tiến hành các phép kiểm tra ghi trong Bảng 2.

**Bảng 2.**

| TT  | Tên phép hiệu chuẩn              | Theo điều, mục của quy trình |
| --- | -------------------------------- | ---------------------------- |
| 1   | Kiểm tra bên ngoài               | 7.1                          |
| 2   | Kiểm tra kỹ thuật                | 7.2                          |
| 3   | Kiểm tra đo lường                | 7.3                          |
|     | - Kiểm tra độ trôi điểm "không"  | 7.3.2.1                      |
|     | - Kiểm tra độ trôi điểm nồng độ  | 7.3.2.2                      |
|     | - Kiểm tra độ chính xác          | 7.3.2.3                      |
|     | - Kiểm tra độ lặp lại            | 7.3.2.4                      |
|     | - Kiểm tra thời gian đáp ứng     | 7.3.2.5                      |
| 4   | Xử lý chung                      | 8                            |

## 4. Phương tiện phục vụ hiệu chuẩn

Phương tiện hiệu chuẩn được ghi trong Bảng 3.

**Bảng 3.**

| TT  | Phương tiện hiệu chuẩn                                    | Đặc trưng kỹ thuật                                                                                                          |
| --- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Mẫu chuẩn**                                             |                                                                                                                              |
| 1.1 | Khí chuẩn cho phương tiện cần hiệu chuẩn                  | Chọn khí chuẩn (SO₂, NO, CO, CH₄) có nồng độ tối thiểu bằng 5 lần ở phạm vi đo lớn nhất của PTĐ khí cần hiệu chuẩn, cấp chính xác tốt hơn 2 lần so với PTĐ cần hiệu chuẩn |
| 1.2 | Thiết bị tạo khí O₃ *(dành riêng hiệu chuẩn PTĐ khí O₃)*   | - Lưu lượng đầu ra (0,5 ÷ 10) L/min<br>- Độ chính xác: 1,0 %<br>- Độ tuyến tính: 0,5 % toàn thang<br>- Độ lặp lại: 1 % toàn thang<br>- Có khả năng tạo ra O₃: (0 ÷ 6) ppm<br>- Tỷ lệ pha trộn khí chuẩn/khí "không" là 1/5 ÷ 1/900 |
| 2   | **Thiết bị đo liên quan**                                 |                                                                                                                              |
| 2.1 | Thiết bị tạo khí "không"                                  | - Lưu lượng đầu ra: (1 ÷ 15) L/min<br>- Nhiệt độ thiết bị vận hành: (15 ÷ 35) °C<br>- Hiệu suất làm sạch: CO > 99,998 %; SO₂ < 0,5 ppb; NO₂ < 0,5 ppb; HC > 99,798 % |
| 2.2 | Thiết bị pha loãng khí chuẩn cho PTĐ khí                  | - Lưu lượng đầu ra (0,5 ÷ 10) L/min<br>- Độ chính xác: 1,0 %<br>- Độ tuyến tính: 0,5 % toàn thang<br>- Độ lặp lại: 1 % toàn thang<br>- Có khả năng tạo ra O₃: (0 ÷ 6) ppm<br>- Tỷ lệ pha trộn khí chuẩn/khí "không" là 1/5 ÷ 1/900<br>- Thiết bị pha loãng chuẩn phù hợp với yêu cầu kỹ thuật đo lường đã được tổ chức, cá nhân công bố hoặc được cơ quan quản lý nhà nước về đo lường có thẩm quyền quy định áp dụng |
| 2.3 | Thiết bị tự ghi (AD recorder)                             | - Độ ổn định: 0,05 %<br>- Độ phân giải: A/D ≥ 2000<br>- Đầu vào: (4÷20) mA, (0÷20) mA, (0÷5) V, (1÷5) V, (0÷10) V            |
| 2.4 | Bình khí H₂ *(dành cho PTĐ khí THC)*                      | - Độ chính xác: 5 %                                                                                                          |
| 3   | **Phương tiện phụ**                                       |                                                                                                                              |
| 3.1 | Van điều chỉnh                                            | Áp suất P = 25 MPa; cấp chính xác 1,5                                                                                        |
| 3.2 | Phương tiện đo nhiệt độ, độ ẩm môi trường                 | - Phạm vi đo nhiệt độ (0 ÷ 50) °C, độ chính xác ± 1 °C<br>- Phạm vi đo độ ẩm (15 ÷ 95) %RH, độ chính xác ± 5 %RH             |
| 3.3 | Hệ thống cảnh báo khí rò rỉ                               | - Sử dụng hệ thống Xinhaosi                                                                                                  |
| 3.4 | Thiết bị đo điện đa năng (Fluke 289)                      | - DC: khoảng đo 50 mV, 500 mV, 5 V, 50 V, 500 V, 1000 V; sai số 0,025 %<br>- AC: khoảng đo 50 mV, 500 mV, 5 V, 50 V, 500 V, 1000 V; sai số 0,4 %<br>- Điện trở: khoảng đo 500 Ω, 5 kΩ, 50 kΩ, 500 kΩ, 5 MΩ, 50 MΩ, 500 MΩ; sai số 0,05 % |
| 3.5 | Dụng cụ, vật tư và vật liệu                               | - Bộ dụng cụ tháo lắp cơ khí và gá lắp chuyên dụng<br>- Van nối, ống dẫn khí, đầu chuyển đổi được chế tạo bằng vật liệu thép không gỉ, đồng hoặc nhựa teflon để không làm ảnh hưởng đến khí chuẩn và thành phần khí thuộc đối tượng cần đo<br>- Áo blouse, găng tay, khẩu trang và mặt nạ phòng độc |

## 5. Điều kiện hiệu chuẩn

Khi tiến hành hiệu chuẩn, phải đảm bảo các điều kiện sau đây:

### 5.1. Điều kiện phòng hiệu chuẩn

- Nhiệt độ: (25 ± 5) °C;
- Độ ẩm tương đối: (40 ÷ 80) %RH;
- Điện áp nguồn cấp chính: 220 VAC ± 10 V.

### 5.2. Điều kiện an toàn

- Toàn bộ các thiết bị được nối đất an toàn và điện trở nối đất từ (5 ÷ 10) Ω.
- Khí sau khi hiệu chuẩn phải được xử lý và xả ra môi trường.
- Trong khu vực kiểm định/hiệu chuẩn được lắp đặt hệ thống cảnh báo khí rò rỉ, hệ thống cảnh báo khói và cháy để đảm bảo không có các loại hơi, các loại khí có khả năng ăn mòn, cũng như các chất dễ gây cháy nổ và có hệ thống thông gió để đảm bảo an toàn.

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành hiệu chuẩn phải thực hiện các công việc chuẩn bị sau đây:

- **a)** Chọn bình khí chuẩn (SO₂, NOₓ, O₃, CO và THC) có nồng độ theo mục 4.1. Bình khí chuẩn đặt ổn định (không di chuyển) tối thiểu 6 giờ đối với bình có dung tích 40 lít trở xuống và tối thiểu 16 giờ đối với bình có dung tích từ 40 lít trở lên. Tiến hành mở van bình khí chuẩn với áp suất đầu ra: 2 bar.
- **b)** PTĐ khí (SO₂, NOₓ, O₃, CO và THC) cần hiệu chuẩn phải được đặt và vận hành ổn định trong điều kiện hiệu chuẩn ít nhất 6 giờ trước khi tiến hành hiệu chuẩn.
- **c)** Bật các công tắc bên trong khu vực kiểm định/hiệu chuẩn gồm hệ thống điều hòa, điện, UPS, hệ thống cảnh báo khí rò rỉ, hệ thống cảnh báo khói và cháy…
- **d)** Kết nối PTĐ khí (SO₂, NOₓ, O₃, CO và THC) với Datalogger và thiết bị tự ghi.
- **e)** Khởi động các thiết bị theo tài liệu hướng dẫn sử dụng.
- **f)** Chuẩn bị các dụng cụ, vật tư sử dụng để hiệu chuẩn thiết bị.

> **Chú ý:**
> - Khi tiến hành hiệu chuẩn cần phải mở quạt thông gió nhằm đảm bảo an toàn.
> - Đối với thiết bị tự ghi cần tiến hành kiểm tra đầu ra của thiết bị:
>   - Nếu đầu ra tín hiệu của thiết bị đo khí là (V) có thể đấu trực tiếp;
>   - Nếu đầu ra tín hiệu của thiết bị đo khí là (A) cần có bộ chuyển đổi về (V) nhằm đảm bảo tính ổn định của thiết bị.

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

Kiểm tra bên ngoài của PTĐ khí (SO₂, NOₓ, O₃, CO và THC) cần hiệu chuẩn bằng mắt để xác định sự phù hợp theo các yêu cầu sau đây:

- Có đầy đủ nhãn, mác, nơi chế tạo hoặc tài liệu kèm theo trong đó ghi rõ đặc tính kỹ thuật về hình dáng, kích thước, điện áp nguồn, phụ tùng kèm theo.
- Thiết bị không bị biến dạng, dây dẫn, ống dẫn khí không xoắn, gẫy gập hoặc nứt hay vỡ.

### 7.2. Kiểm tra kỹ thuật

Phải kiểm tra kỹ thuật theo các yêu cầu sau đây:

Lắp ráp, đấu nối các ống dẫn khí, thiết bị tạo khí "không", thiết bị pha loãng khí chuẩn và PTĐ khí (SO₂, NOₓ, O₃, CO và THC) cần hiệu chuẩn theo sơ đồ hiệu chuẩn (Phụ lục 2).

Vận hành và kiểm tra trạng thái hoạt động bình thường của PTĐ khí cần hiệu chuẩn theo tài liệu hướng dẫn sử dụng.

### 7.3. Kiểm tra đo lường

PTĐ khí (SO₂, NOₓ, O₃, CO và THC) được kiểm tra đo lường theo trình tự nội dung, phương pháp và yêu cầu sau:

#### 7.3.1. Đo hiệu chỉnh

**a) Hiệu chỉnh khí "không":** đặt nồng độ khí "không" trên thiết bị pha loãng khí chuẩn với lưu lượng đầu ra phù hợp với lưu lượng đầu vào của PTĐ khí (SO₂, NOₓ, O₃, CO và THC). Đợi giá trị hiển thị của nồng độ khí "không" trên PTĐ khí cần hiệu chuẩn ổn định hoặc xấp xỉ bằng không. Đồng thời các giá trị được ghi lại trên thiết bị tự ghi để thể hiện sự ổn định của nồng độ khí chuẩn và lưu lại trên datalogger, hoặc có thể ghi lại các giá trị đo được vào biên bản. Tiến hành việc hiệu chỉnh khí "không" trên PTĐ khí cần hiệu chuẩn.

**b) Hiệu chỉnh khí có nồng độ:** Sau khi hiệu chỉnh xong tại điểm khí "không" trên PTĐ khí cần hiệu chuẩn thì đặt giá trị nồng độ trên thiết bị pha loãng khí chuẩn lần lượt tương ứng khoảng (20 ± 10) %; (50 ± 10) % và (80 ± 10) % toàn bộ phạm vi đo trên PTĐ khí cần hiệu chuẩn (đối với những thiết bị chuẩn tại 2 điểm thì tiến hành hiệu chuẩn tại điểm (80 ± 10) % toàn bộ phạm vi đo trên PTĐ). Đợi giá trị hiển thị nồng độ của khí chuẩn trên PTĐ khí cần hiệu chuẩn ổn định hoặc xấp xỉ giá trị nồng độ đã đặt trên thiết bị pha loãng khí chuẩn. Đồng thời các giá trị được ghi lại trên thiết bị tự ghi và lưu lại trên datalogger, hoặc có thể ghi lại các giá trị đo được vào biên bản. Tiến hành việc hiệu chỉnh khí có nồng độ trên PTĐ khí cần hiệu chuẩn.

#### 7.3.2. Đo kiểm tra sau khi hiệu chỉnh

PTĐ khí (SO₂, NOₓ, O₃, CO và THC) sau khi hiệu chỉnh được kiểm tra đo lường theo trình tự nội dung, phương pháp và yêu cầu sau đây nhằm xác định thiết bị đảm bảo theo yêu cầu kỹ thuật của nhà sản xuất:

##### 7.3.2.1. Kiểm tra độ trôi điểm "không"

- Lựa chọn nồng độ tại điểm "không" trên thiết bị pha loãng khí chuẩn với lưu lượng đầu ra phù hợp với lưu lượng đầu vào của PTĐ khí. Đợi cho giá trị hiển thị của khí "không" trên PTĐ khí ổn định, bằng hoặc xấp xỉ bằng 0.
- Tiến hành đo liên tục trong vòng 6 phút và 1 phút/lần (tối thiểu 6 kết quả đo cho mỗi điểm), các giá trị được ghi lại trên thiết bị tự ghi và lưu lại trên datalogger hoặc có thể ghi lại các giá trị đo được vào biên bản.
- Thực hiện tương tự kiểm tra độ trôi điểm "không" sau 24 giờ.

##### 7.3.2.2. Kiểm tra độ trôi điểm "nồng độ"

- Tạo nồng độ khí chuẩn pha loãng có giá trị bằng (80 ± 10) % của toàn bộ phạm vi đo.
- Kiểm tra độ trôi điểm "nồng độ" của PTĐ khí được thực hiện theo phương pháp đo 6 lần liên tiếp tại điểm nồng độ có giá trị bằng (80 ± 10) %.
- Tiến hành đo liên tục trong vòng 6 phút và 1 phút/lần (tối thiểu 6 kết quả đo cho mỗi điểm), các giá trị được ghi lại trên thiết bị tự ghi và lưu lại trên datalogger hoặc có thể ghi lại các giá trị đo được vào biên bản.
- Thực hiện tương tự kiểm tra độ trôi điểm "nồng độ" sau 24 giờ.

##### 7.3.2.3. Kiểm tra sai số

- Tạo nồng độ khí chuẩn pha loãng có giá trị bằng (20 ± 10) %; (50 ± 10) % và (80 ± 10) % của giới hạn đo cận trên của thang đo.
- Kiểm tra sai số của PTĐ được thực hiện tại 03 điểm nồng độ khí có giá trị bằng (20 ± 10) %; (50 ± 10) % và (80 ± 10) % của giới hạn đo trên.
- Tiến hành đo liên tục trong vòng 6 phút và 1 phút/lần (tối thiểu 6 kết quả đo cho mỗi điểm), các giá trị được ghi lại trên thiết bị tự ghi và lưu lại trên datalogger hoặc có thể ghi lại các giá trị đo được vào biên bản.
- Sai số của mỗi phép đo được tính theo công thức sau:

$$
\delta = \frac{C_{meas} - C_{ref}}{C_{ref}} \times 100
$$

- `δ`: sai số phép đo, %;
- `C_meas`: giá trị đo trung bình của PTĐ, %V (ppm);
- `C_ref`: giá trị trung bình của thiết bị đo nồng độ khí, %V (ppm).

##### 7.3.2.4. Kiểm tra độ lặp lại (tái lặp)

Thực hiện kiểm tra độ lặp lại (tái lặp) của PTĐ khí theo phương pháp tiến hành 2 phép đo liên tiếp và tuần tự bằng khí chuẩn với nồng độ đã chọn và khí "không". Độ chính xác được xác định theo công thức:

$$
s(\bar{q}) = \frac{s(q_k)}{\sqrt{n}} = \sqrt{\frac{1}{n(n-1)}\sum_{k=1}^{n}(q_k - \bar{q})^2}
$$

- `s(q̄)` là độ lệch chuẩn thực nghiệm trung bình;
- `s(q_k)` là độ lệch chuẩn thực nghiệm được dùng để ước lượng độ rộng của phân bố các giá trị trung bình;
- Ước lượng tốt nhất có thể có của các giá trị kỳ vọng của đại lượng q là trung bình số học `q̄`.

- Lựa chọn nồng độ tại điểm (80 ± 10) % toàn bộ phạm vi đo tương ứng với PTĐ khí trên thiết bị pha loãng khí chuẩn, với lưu lượng đầu ra phù hợp với lưu lượng đầu vào của PTĐ khí. Đợi cho giá trị hiển thị nồng độ của khí chuẩn trên PTĐ khí ổn định, bằng hoặc xấp xỉ bằng giá trị nồng độ đã đặt.
- Tiến hành đo liên tục trong vòng 5 phút và 1 phút/lần (tối thiểu 5 kết quả đo cho mỗi điểm).
- Đặt và lặp lại tối thiểu 2 lần liên tiếp chương trình kiểm tra độ lặp lại trên thiết bị tạo khí chuẩn theo trình tự và thời gian sau:

```
Bắt đầu → Kiểm tra bằng khí "không" (5 phút) → Kiểm tra bằng khí chuẩn (5 phút)
          ↳ Lặp lại 2 lần liên tiếp
```

##### 7.3.2.5. Kiểm tra thời gian đáp ứng

- Tạo 01 điểm nồng độ khí "không" và nồng độ khí chuẩn pha loãng có giá trị bằng (80 ± 10) % của giới hạn đo trên.
- Kiểm tra thời gian đáp ứng của PTĐ theo phương pháp đưa khí "không" vào PTĐ cần kiểm định; sau khi đạt giá trị "không" ổn định, tăng đến điểm nồng độ có giá trị bằng (80 ± 10) % của PTĐ cần kiểm định. Ghi thời gian lúc bắt đầu tăng nồng độ khí và thời gian khi PTĐ đạt giá trị bằng 90 % nồng độ đã tạo vào biên bản.

#### 7.3.3. Đánh giá độ không đảm bảo đo

```
Bắt đầu → Bước 1: Xác định đại lượng đo
        → Bước 2: Xác định các yếu tố ảnh hưởng đến ĐKĐB
        → Bước 3: Tính toán ĐKĐB của các yếu tố ảnh hưởng
        → Bước 4: Tính toán ĐKĐB kết hợp và ĐKĐB mở rộng
```

##### 7.3.3.1. Xác định đại lượng đo

Thực hiện hiệu chuẩn khí (SO₂, NOₓ, O₃, CO và THC) bằng cách đo gián tiếp từ khí chuẩn thông qua thiết bị pha loãng khí chuẩn. Đối với mỗi bình khí chuẩn đều có giấy chứng nhận độ chính xác hoặc độ không đảm bảo đo của khí.

Ngoài ra, còn một số thiết bị cũng có ảnh hưởng đến kết quả đo như: thiết bị tạo khí "không" ảnh hưởng đến thiết bị pha loãng khí chuẩn; thiết bị ổn điện ảnh hưởng đến sự ổn định của toàn bộ hệ thống hiệu chuẩn thiết bị; thiết bị đo điều kiện môi trường gây ra các sai số trong kết quả đo giữa các lần đo khác nhau. Như vậy, cần phải xác định đại lượng ảnh hưởng đến ĐKĐB để tính toán một cách cụ thể và chính xác đối với kết quả cuối cùng.

##### 7.3.3.2. Xác định các yếu tố gây ra ĐKĐB tại tất cả các điểm hiệu chuẩn

- PTĐ khí (SO₂, NOₓ, O₃, CO và THC) cần hiệu chuẩn: đặc tính kỹ thuật do nhà sản xuất cung cấp, số liệu đo đạc lần trước, độ trôi điểm "không", độ chính xác, độ lặp lại, độ tuyến tính, thời gian đáp ứng và độ phân giải của PTĐ;
- Thiết bị pha loãng khí chuẩn: độ chính xác do nhà sản xuất cung cấp hoặc độ không đảm bảo đo do tổ chức đo lường chứng nhận;
- Điều kiện môi trường trong phòng đo/hiệu chuẩn (nhiệt độ, độ ẩm);
- Bình khí chuẩn;
- Nhân viên đo/hiệu chuẩn;
- Nguồn điện cấp vào thiết bị;
- Một số ảnh hưởng ngẫu nhiên khác.

##### 7.3.3.3. Tính toán ĐKĐB của các yếu tố ảnh hưởng

*(Đối với PTĐ khí O₃ áp dụng theo Phụ lục 2.)*

| Nguồn gây nên ĐKĐB (Budget of Uncertainty) | Loại | Công thức tính |
| --- | --- | --- |
| Độ lặp lại của thiết bị *(Reproducibility of Object)* | A | $u_{A1} = s(\bar{q})$ |
| Độ phân giải của thiết bị *(Resolution of Object)* | B | $u_{B1} = \dfrac{\text{độ phân giải}}{2\sqrt{3}}$ |
| Độ chính xác của khí chuẩn *(Accuracy of Cylinder)* | B | $u_{B2} = \dfrac{u_{Ref}}{2}$ hoặc $u_{B2} = \dfrac{\text{độ chính xác}}{\sqrt{3}}$ |
| ĐKĐB của thiết bị pha loãng *(Uncertainty of Multigas Calibrator)* | B | $u_{B3} = \dfrac{\text{độ chính xác}}{\sqrt{3}}$ |
| ĐKĐB do nguồn tuyến tính | B | $u_{B3} = 100 \cdot \dfrac{\sqrt{s^2/a^2}}{d}$ — `s`: độ lệch theo phương trình tuyến tính; `a`: hệ số lệch; `d`: phạm vi đo của thiết bị |
| **ĐKĐB tổng hợp** *(Combined Uncertainty)* | | $u_c = \sqrt{u_{A1}^2 + u_{B1}^2 + u_{B2}^2 + u_{B3}^2}$ |
| **ĐKĐB mở rộng** *(Expanded Uncertainty)* | | $U = k \cdot u_c$ — k = 2 với mức tin cậy xấp xỉ 95 % |

## 8. Xử lý chung

- **8.1.** Thiết bị đo sau khi hiệu chuẩn được dán tem, cấp giấy chứng nhận hiệu chuẩn kèm theo kết quả hiệu chuẩn.
- **8.2.** Chu kỳ hiệu chuẩn được khuyến nghị là 01 năm.

## 9. Phụ lục

Chi tiết theo `ETV.MCA.F 01.01`.

---

## TÀI LIỆU THAM KHẢO

- HORIBA User manual (APSA-370; APNA-370; APOA-370; APMA-370 và APHA-370);
- **TCVN 5976:1995 (ISO 7935:1992)** — Khí thải nguồn tĩnh – Xác định nồng độ khối lượng của lưu huỳnh dioxit (SO₂) – Đặc tính của các phương pháp đo tự động;
- **mCERTs 12/2008, Version 6** — Performance Standards for Continuous Ambient Air Quality Monitoring Systems;
- **ĐLVN 45:2001** — Máy đo hàm lượng khí - Quy trình kiểm định;
- **ISO 6145** — Phân tích khí - Điều chế hỗn hợp khí hiệu chuẩn - Phương pháp thể tích động;
- **ISO 7395** — Phân tích khí - Điều chế hỗn hợp khí hiệu chuẩn - Phương pháp khối lượng động;
- **TCVN 6502:1999 (ISO 6879:1995)** — Chất lượng không khí – Đặc tính và các khái niệm có liên quan với các phương pháp đo chất lượng không khí;
- **TCVN 6501:1999 (ISO 10849:1996)** — Sự phát thải nguồn tĩnh – Xác định nồng độ khối lượng của các nitơ oxit – Đặc tính của hệ thống đo tự động;
- **TCVN 6138:1996 (ISO 7996:1985)** — Không khí xung quanh – Xác định nồng độ khối lượng của các nitơ oxit – Phương pháp quang hóa học;
- **TCVN 6500:1999 (ISO 6879:1995)** — Chất lượng không khí – Đặc tính và các khái niệm liên quan đối với các phương pháp đo chất lượng không khí;
- **OIML/TC16/SC1/N1** — Instruments for continuous measurement of CO, NOx in stationary source emissions;
- **TCVN 8712:2011 (ISO 12039:2001)** — Phát thải nguồn tĩnh - Xác định cacbon monoxit, cacbon dioxit và oxy – Đặc tính tính năng và hiệu chuẩn các hệ thống đo tự động;
- **TCVN 8714:2011 (ISO 25140:2010)** — Phát thải nguồn tĩnh – Phương pháp tự động xác định nồng độ metan bằng detector ion hóa ngọn lửa;
- **TCVN 8715 (ISO 15139)** — Phát thải nguồn tĩnh – Phương pháp thủ công xác định nồng độ metan sử dụng sắc ký khí;
- **TCVN 6751:2009 (ISO 9169:2006)** — Chất lượng không khí – Định nghĩa và xác định đặc trưng tính năng của hệ thống đo tự động;
- **ISO 14956** — Air quality – Evaluation of the suitability of a measurement procedure by comparison with a required measurement uncertainty;
- **ISO 20988** — Air quality – Guidelines to estimating measurement uncertainty;
- **Quyết định số 1292/QĐ-TCMT** ngày 28/10/2013 của Tổng cục trưởng Tổng cục Môi trường về việc ban hành hướng dẫn quy trình kỹ thuật hiệu chuẩn các thiết bị phân tích khí NOx, SO₂, CO, O₃ của trạm quan trắc môi trường không khí tự động, liên tục.
