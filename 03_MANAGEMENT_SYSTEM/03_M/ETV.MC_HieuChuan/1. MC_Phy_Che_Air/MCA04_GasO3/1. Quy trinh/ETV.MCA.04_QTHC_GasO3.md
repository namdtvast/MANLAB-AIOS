---
id: ETV.MCA 04
title: "Phương tiện đo nồng độ khí Ôzôn (O3) của trạm quan trắc chất lượng không khí xung quanh — Quy trình hiệu chuẩn"
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
keywords: [Ozone, O3, AAQMS, trạm quan trắc chất lượng không khí xung quanh, khí chuẩn, độ trôi, hiệu chuẩn]
related_documents: ["ETV.MCA.F 04.01"]
iso_clause: ["ISO/IEC 17025:2017", "ISO 6145", "ISO 14956", "ISO 20988"]
legal_basis: ["ĐLVN 389:2021", "ĐLVN 45:2001", "Quyết định 1292/QĐ-TCMT ngày 28/10/2013"]
ai_tags: [calibration-procedure, ozone, gas-analyzer, ambient-air-quality, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCA 04_TB O3 CL KK xung quanh_V1.pdf`"
supersedes: "ETV.MCA 04 lần ban hành 01 (22/04/2023); thay thế bản dự thảo do AI xây dựng theo US EPA EPA-454/B-22-003 trước đây lưu tại vị trí này"
superseded_by: null
---
# PHƯƠNG TIỆN ĐO NỒNG ĐỘ KHÍ ÔZÔN (O3) CỦA TRẠM QUAN TRẮC CHẤT LƯỢNG KHÔNG KHÍ XUNG QUANH – QUY TRÌNH HIỆU CHUẨN

*Ozone analyzers of ambient air quality monitoring station – Calibration procedure*

|                   |                     |
| ----------------- | ------------------- |
| **Mã số**         | ETV.MCA 04          |
| **Lần ban hành**  | 02                  |
| **Ngày ban hành** | 22/04/2026          |
| **Biên soạn**     | Nguyễn Văn Huy      |
| **Soát xét**      | Trần Thị Hoa        |
| **Phê duyệt**     | Nguyễn Hoàng Giang  |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCA 04_TB O3 CL KK xung quanh_V1.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khi có khác biệt, bản PDF do Viện ban hành là bản có giá trị áp dụng.
>
> **Thay thế bản dự thảo:** vị trí này trước đây lưu một bản dự thảo do AI xây dựng trên cơ sở tài liệu US EPA (EPA-454/B-22-003), soạn khi chưa biết Viện đã có quy trình chính thức cho cùng đối tượng. Nay đã có bản `ETV.MCA 04` chính thức (ban hành lần 01 ngày 22/04/2023, lần 02 ngày 22/04/2026) nên bản dự thảo được thay thế hoàn toàn.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian  | Nội dung thay đổi     | Lần ban hành |
| ---------- | --------------------- | ------------ |
| 22/04/2023 | Ban hành lần thứ nhất | 01           |
| 22/04/2026 | Ban hành lần thứ hai  | 02           |

---

## 1. Phạm vi áp dụng

Văn bản kỹ thuật này quy định quy trình hiệu chuẩn cho phương tiện đo (PTĐ) nồng độ khí O₃ của trạm quan trắc chất lượng không khí xung quanh có đặc trưng kỹ thuật được nêu trong Bảng 1.

**Bảng 1**

| Thông số đo | Phạm vi đo của PTĐ (%V) | Sai số lớn nhất cho phép (%) |
| ----------- | ----------------------- | ---------------------------- |
| O₃          | Đến 5 × 10⁻⁴            | ± 2,0 %                      |

Quy trình này áp dụng đối với nhân viên của Viện Kiểm định Công nghệ và Môi trường (sau đây gọi tắt là PTN) khi hiệu chuẩn PTĐ nói trên.

## 2. Giải thích từ ngữ

Các từ ngữ trong văn bản này được hiểu như sau:

- **2.1. Phương tiện đo nồng độ khí O₃ của trạm quan trắc chất lượng không khí xung quanh (gọi tắt là PTĐ):** là phương tiện kỹ thuật để thực hiện phép đo.
- **2.2. Sai số lớn nhất cho phép (MPE):** giá trị cực trị của sai số đo, đối với giá trị đại lượng quy chiếu đã biết, cho phép bằng yêu cầu kỹ thuật hoặc các quy định đối với phép đo, phương tiện đo hoặc hệ thống đo đã cho.
- **2.3. Độ trôi:** sự thay đổi liên tục tăng lên hoặc giảm xuống của chỉ số theo thời gian, gây ra do những thay đổi trong tính chất đo lường của phương tiện đo.
- **2.4. Khí "không":** là khí nitơ tinh khiết (≥ 99,999 %V) hoặc khí được tạo bởi thiết bị tạo khí "không" có nồng độ các khí cần hiệu chuẩn nhỏ hơn giới hạn phát hiện của phương tiện đo cần hiệu chuẩn.
- **2.5. Điểm "nồng độ":** là điểm khí chuẩn có giá trị nồng độ khí chuẩn pha loãng phù hợp với phạm vi đo của PTĐ.
- **2.6. Đơn vị tính:**
  - %V: phần trăm (thể tích); 1 %V = 10.000 ppmV; 1 ppmV = 1.000 ppbV;
  - mg/m³: đơn vị đo quy đổi tại nhiệt độ t °C, áp suất 101,325 kPa:

$$
Y\ (\text{mg/m}^3) = \frac{X(ppmV) \times M \times 273}{22{,}4 \times (t + 273)}
$$

    - `Y`: nồng độ khí quy đổi về điều kiện nhiệt độ t °C, mg/m³;
    - `X`: nồng độ khí theo ppmV;
    - `M`: khối lượng mol phân tử của khí, g/mol.
  - 1 mg/m³ = 1.000 µg/m³.
- **Cách thức chuyển đổi:** Căn cứ vào các quy định hiện hành về đơn vị đo và điều kiện tiêu chuẩn trong các quy chuẩn kỹ thuật quốc gia về môi trường tương ứng, phải tính toán chuyển đổi đơn vị đo sang mg/m³ tại điều kiện tiêu chuẩn tương ứng. Trường hợp kết quả đo của thiết bị là ppm và điều kiện tiêu chuẩn quy định là 25 °C, 760 mmHg:

  **O₃: ppm × 1,96 = mg/Nm³**

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
|     | - Kiểm tra thời gian đáp ứng     | 7.3.2.5 [^tgdu]              |
| 4   | Xử lý chung                      | 8                            |

[^tgdu]: Bảng 2 của bản gốc liệt kê phép "Kiểm tra thời gian đáp ứng" tại mục 7.3.2.5, nhưng phần thân văn bản **không có mục 7.3.2.5** — sau 7.3.2.4 chuyển thẳng sang 7.3.3. Giữ nguyên văn, cần bổ sung hoặc đính chính khi ban hành lại.

## 4. Phương tiện phục vụ hiệu chuẩn

Phương tiện hiệu chuẩn được ghi trong Bảng 3.

**Bảng 3.**

| TT  | Phương tiện hiệu chuẩn                                    | Đặc trưng kỹ thuật                                                                                |
| --- | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| 1   | **Mẫu chuẩn**                                             |                                                                                                     |
|     | Phương tiện tạo khí Ôzôn chuẩn                            | - Phạm vi tạo: (0,1 ÷ 6) ppm<br>- Lưu lượng: (0 ÷ 10) L/min<br>- ĐKĐB ≤ ½ phương tiện cần hiệu chuẩn |
| 2   | **Phương tiện đo khác**                                   |                                                                                                     |
| 2.1 | Phương tiện đo nhiệt độ, độ ẩm môi trường                 | - Phạm vi đo nhiệt độ (0 ÷ 50) °C, độ chính xác ± 1 °C<br>- Phạm vi đo độ ẩm (25 ÷ 95) %RH, độ chính xác ± 5 %RH |
| 2.2 | Lưu lượng kế khí                                          | - Lưu lượng: đến 10 L/min<br>- Độ chính xác: ≤ 2 %                                                  |
| 3   | **Phương tiện phụ**                                       |                                                                                                     |
| 3.1 | Van điều chỉnh                                            | Áp suất P = 25 MPa; cấp chính xác 1,5                                                               |
| 3.2 | Thiết bị tạo khí "không" *(chọn 1 trong 2: 3.2 hoặc 3.3)* | - Khí đầu ra có nồng độ các khí nhỏ hơn giới hạn phát hiện của phương tiện đo cần kiểm định         |
| 3.3 | Khí "không" *(chọn 1 trong 2: 3.2 hoặc 3.3)*             | - Theo định nghĩa tại mục 2.4                                                                       |
| 3.4 | Dụng cụ, vật tư và vật liệu                               | - Bộ dụng cụ tháo lắp cơ khí và gá lắp chuyên dụng<br>- Van nối, ống dẫn khí, đầu chuyển đổi được chế tạo bằng vật liệu thép không gỉ, đồng hoặc nhựa teflon để không làm ảnh hưởng đến khí chuẩn và thành phần khí thuộc đối tượng cần đo<br>- Áo blouse, găng tay, khẩu trang và mặt nạ phòng độc |

## 5. Điều kiện hiệu chuẩn

Khi tiến hành hiệu chuẩn, phải đảm bảo các điều kiện sau đây:

- Nhiệt độ: (25 ± 5) °C;
- Độ ẩm tương đối: ≤ 80 %RH, không đọng sương;
- Điện áp nguồn cấp chính: 220 VAC ± 10 V;
- Có hệ thống thoát hơi, khí độc;
- Có hệ thống chống rung.

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành hiệu chuẩn phải thực hiện các công việc chuẩn bị sau đây:

- **a)** Chọn khí "không" theo quy định tại Bảng 3.
- **b)** Phương tiện tạo khí Ôzôn chuẩn đặt ổn định (không di chuyển) tối thiểu 1 giờ.
- **c)** PTĐ cần hiệu chuẩn phải được đặt và vận hành ổn định trong điều kiện hiệu chuẩn ít nhất 1 giờ trước khi tiến hành hiệu chuẩn.
- **d)** Bật các công tắc bên trong khu vực hiệu chuẩn gồm hệ thống điều hòa, điện, UPS, hệ thống cảnh báo khí rò rỉ, hệ thống cảnh báo khói và cháy (nếu có)…
- **e)** Khởi động các thiết bị theo tài liệu hướng dẫn sử dụng.
- **f)** Chuẩn bị các dụng cụ, vật tư sử dụng để hiệu chuẩn thiết bị.

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

Kiểm tra bên ngoài của PTĐ cần hiệu chuẩn bằng mắt để xác định sự phù hợp theo các yêu cầu sau đây:

- Có đầy đủ nhãn, mác, nơi chế tạo hoặc tài liệu kèm theo trong đó ghi rõ đặc tính kỹ thuật về hình dáng, kích thước, điện áp nguồn, phụ tùng kèm theo.
- Thiết bị không bị biến dạng, dây dẫn, ống dẫn khí không xoắn, gẫy gập hoặc nứt hay vỡ.

### 7.2. Kiểm tra kỹ thuật

Phải kiểm tra kỹ thuật theo các yêu cầu sau đây:

Lắp ráp, đấu nối các ống dẫn khí, khí "không", phương tiện tạo khí Ôzôn chuẩn và PTĐ cần hiệu chuẩn theo sơ đồ hiệu chuẩn (Phụ lục 2).

Vận hành và kiểm tra trạng thái hoạt động bình thường của PTĐ cần hiệu chuẩn theo tài liệu hướng dẫn sử dụng.

### 7.3. Kiểm tra đo lường

PTĐ cần hiệu chuẩn được kiểm tra đo lường theo trình tự nội dung, phương pháp và yêu cầu sau:

#### 7.3.1. Đo hiệu chỉnh

Hiệu chỉnh phương tiện đo tùy thuộc theo yêu cầu của khách hàng. Nếu khách hàng không yêu cầu, bỏ qua bước hiệu chỉnh (mục 7.3.1) và tiến hành hiệu chuẩn cho phương tiện đo (mục 7.3.2).

Thực hiện hiệu chỉnh theo các bước sau:

**a) Hiệu chỉnh khí "không":**

- Đặt nồng độ khí "không" trên thiết bị tạo khí "không" với lưu lượng đầu ra phù hợp với lưu lượng đầu vào của PTĐ cần hiệu chuẩn.
- Đợi giá trị hiển thị của nồng độ khí "không" trên PTĐ cần hiệu chuẩn ổn định hoặc xấp xỉ bằng không. Đồng thời các giá trị được ghi lại vào biên bản tại Phụ lục kèm theo.
- Tiến hành việc hiệu chỉnh khí "không" trên PTĐ cần hiệu chuẩn.

**b) Hiệu chỉnh khí có nồng độ:**

Sau khi hoàn tất hiệu chỉnh tại điểm khí "không" (zero) trên PTĐ cần hiệu chuẩn, tiến hành đo và hiệu chỉnh tại các điểm nồng độ khí chuẩn theo số điểm hiệu chuẩn quy định đối với từng loại PTĐ, cụ thể như sau:

| Phương thức hiệu chuẩn | Các điểm nồng độ (% toàn bộ phạm vi đo) |
| --- | --- |
| 3 điểm | (20 ± 10) %, (50 ± 10) % và (80 ± 10) % |
| 2 điểm | (40 ± 10) % và (80 ± 10) % |
| 1 điểm | (80 ± 10) % |
| Nhà sản xuất có quy định riêng | Thực hiện theo đúng hướng dẫn khuyến cáo của nhà sản xuất thiết bị |

- Đợi giá trị hiển thị nồng độ của khí chuẩn trên PTĐ cần hiệu chuẩn ổn định và xấp xỉ giá trị nồng độ đã đặt trên phương tiện tạo khí Ôzôn chuẩn. Đồng thời các giá trị được ghi lại vào biên bản tại Phụ lục kèm theo.
- Tiến hành việc hiệu chỉnh khí có nồng độ trên PTĐ cần hiệu chuẩn.

#### 7.3.2. Đo kiểm tra sau khi hiệu chỉnh

PTĐ cần hiệu chuẩn sau khi hiệu chỉnh được kiểm tra đo lường theo trình tự nội dung, phương pháp và yêu cầu sau đây nhằm xác định thiết bị đảm bảo theo yêu cầu kỹ thuật của nhà sản xuất:

##### 7.3.2.1. Kiểm tra độ trôi điểm "không"

- Lựa chọn nồng độ tại điểm "không" trên thiết bị tạo khí "không" với lưu lượng đầu ra phù hợp với lưu lượng đầu vào của PTĐ cần hiệu chuẩn. Đợi cho giá trị hiển thị của khí "không" trên PTĐ cần hiệu chuẩn ổn định, bằng hoặc xấp xỉ bằng 0.
- Tiến hành đo liên tục trong vòng 6 phút và 1 phút/lần (tối thiểu 6 kết quả đo cho mỗi điểm), các giá trị được ghi lại vào biên bản.
- Thực hiện tương tự kiểm tra độ trôi điểm "không" sau 24 giờ.

##### 7.3.2.2. Kiểm tra độ trôi điểm "nồng độ"

- Tạo nồng độ khí chuẩn có giá trị bằng (80 ± 10) % của toàn bộ phạm vi đo.
- Kiểm tra độ trôi điểm "nồng độ" của PTĐ cần hiệu chuẩn được thực hiện theo phương pháp đo 6 lần liên tiếp tại điểm nồng độ có giá trị bằng (80 ± 10) %.
- Tiến hành đo liên tục trong vòng 6 phút và 1 phút/lần (tối thiểu 6 kết quả đo cho mỗi điểm), các giá trị được ghi lại vào biên bản tại Phụ lục kèm theo.
- Thực hiện tương tự kiểm tra độ trôi điểm "nồng độ" sau 24 giờ.

##### 7.3.2.3. Kiểm tra sai số

- Tạo nồng độ khí chuẩn có giá trị bằng (20 ± 10) %; (50 ± 10) % và (80 ± 10) % của giới hạn đo cận trên của thang đo.
- Kiểm tra sai số của PTĐ được thực hiện tại 03 điểm nồng độ khí có giá trị bằng (20 ± 10) %; (50 ± 10) % và (80 ± 10) % của giới hạn đo trên.
- Tiến hành đo liên tục trong vòng 6 phút và 1 phút/lần (tối thiểu 6 kết quả đo cho mỗi điểm), các giá trị được ghi lại vào biên bản tại Phụ lục kèm theo.
- Sai số của mỗi phép đo được tính theo công thức sau:

$$
\delta = \frac{C_{meas} - C_{ref}}{C_{ref}} \times 100
$$

- `δ`: sai số phép đo, %;
- `C_meas`: giá trị đo trung bình của PTĐ, %V (ppm);
- `C_ref`: giá trị trung bình của thiết bị đo nồng độ khí, %V (ppm).

##### 7.3.2.4. Kiểm tra độ lặp lại (tái lặp)

Thực hiện kiểm tra độ lặp lại (tái lặp) của PTĐ cần hiệu chuẩn theo phương pháp tiến hành 3 phép đo liên tiếp và tuần tự bằng khí chuẩn với nồng độ đã chọn và khí "không". Độ chính xác được xác định theo công thức:

$$
s(\bar{q}) = \frac{s(q_k)}{\sqrt{n}} = \sqrt{\frac{1}{n(n-1)}\sum_{k=1}^{n}(q_k - \bar{q})^2}
$$

- `s(q̄)` là độ lệch chuẩn thực nghiệm trung bình;
- `s(q_k)` là độ lệch chuẩn thực nghiệm được dùng để ước lượng độ rộng của phân bố các giá trị trung bình;
- Ước lượng tốt nhất có thể có của các giá trị kỳ vọng của đại lượng q là trung bình số học `q̄`.

- Lựa chọn nồng độ tại điểm (50 ± 10) % toàn bộ phạm vi đo tương ứng với PTĐ cần hiệu chuẩn trên phương tiện tạo khí chuẩn, với lưu lượng đầu ra phù hợp với lưu lượng đầu vào của PTĐ. Đợi cho giá trị hiển thị nồng độ của khí chuẩn trên PTĐ ổn định, bằng hoặc xấp xỉ bằng giá trị nồng độ đã đặt.
- Tiến hành đo liên tục trong vòng 6 phút và 1 phút/lần (tối thiểu 6 kết quả đo cho mỗi điểm), các giá trị được ghi lại vào biên bản tại Phụ lục kèm theo.
- Đặt và lặp lại tối thiểu 3 lần liên tiếp chương trình kiểm tra độ lặp lại trên thiết bị tạo khí chuẩn theo trình tự và thời gian sau:

```
Bắt đầu → Kiểm tra bằng khí "không" (5 phút) → Kiểm tra bằng khí chuẩn (6 phút)
          ↳ Lặp lại 3 lần liên tiếp
```

#### 7.3.3. Đánh giá độ không đảm bảo đo

```
Bắt đầu → Bước 1: Xác định đại lượng đo
        → Bước 2: Xác định các yếu tố ảnh hưởng đến ĐKĐB
        → Bước 3: Tính toán ĐKĐB của các yếu tố ảnh hưởng
        → Bước 4: Tính toán ĐKĐB kết hợp và ĐKĐB mở rộng
```

##### 7.3.3.1. Xác định đại lượng đo

- Đại lượng đo trong quy trình này là giá trị nồng độ khí chuẩn do PTĐ cần hiệu chuẩn chỉ thị.
- Phép đo được thực hiện theo phương pháp đo gián tiếp với công thức tổng quát:

$$
\Delta = C_đ - C_c
$$

- Do bản chất phép đo là gián tiếp, kết quả hiệu chuẩn phụ thuộc vào độ chính xác của giá trị nồng độ khí chuẩn tham chiếu, vốn chịu ảnh hưởng bởi ĐKĐB của chính phương tiện tạo khí chuẩn. Ngoài ra, kết quả đo còn chịu tác động gián tiếp từ một số thiết bị phụ trợ trong hệ thống hiệu chuẩn, cụ thể:
  - **Thiết bị tạo khí "không":** ảnh hưởng đến độ tinh khiết và độ ổn định của điểm chuẩn gốc;
  - **Thiết bị ổn áp/ổn định nguồn điện:** ảnh hưởng đến độ ổn định vận hành của toàn bộ hệ thống hiệu chuẩn;
  - **Thiết bị đo điều kiện môi trường** (nhiệt độ, độ ẩm, áp suất): gây sai khác kết quả đo giữa các lần đo khác nhau.

##### 7.3.3.2. Xác định các yếu tố gây ra ĐKĐB tại tất cả các điểm hiệu chuẩn

- PTĐ cần hiệu chuẩn: đặc tính kỹ thuật do nhà sản xuất cung cấp, số liệu đo đạc lần trước, độ trôi điểm "không", độ chính xác, độ lặp lại, độ tuyến tính, thời gian đáp ứng và độ phân giải của PTĐ;
- Phương tiện tạo khí chuẩn: độ chính xác do nhà sản xuất cung cấp hoặc độ không đảm bảo đo do tổ chức đo lường chứng nhận;
- Điều kiện môi trường trong phòng đo/hiệu chuẩn (nhiệt độ, độ ẩm);
- Bình khí chuẩn;
- Nhân viên đo/hiệu chuẩn;
- Nguồn điện cấp vào thiết bị;
- Một số ảnh hưởng ngẫu nhiên khác.

##### 7.3.3.3. Tính toán ĐKĐB của các yếu tố ảnh hưởng

| Nguồn gây nên ĐKĐB (Budget of Uncertainty) | Loại | Công thức tính |
| --- | --- | --- |
| Độ lặp lại của thiết bị *(Reproducibility of Object)* | A | $u_{A1} = s(\bar{q})$ |
| Độ phân giải của thiết bị *(Resolution of Object)* | B | $u_{B1} = \dfrac{\text{độ phân giải}}{2\sqrt{3}}$ |
| ĐKĐB của phương tiện tạo khí chuẩn *(Uncertainty of Ozone Generator)* | B | $u_{B2} = \dfrac{\text{độ chính xác}}{\sqrt{3}}$ hoặc $u_{B2} = \dfrac{u_{Ref}}{2}$ |
| ĐKĐB do nguồn tuyến tính | B | $u_{B3} = 100 \cdot \dfrac{\sqrt{s^2/a^2}}{d}$ — `s`: độ lệch theo phương trình tuyến tính; `a`: hệ số lệch; `d`: phạm vi đo của thiết bị |
| **ĐKĐB tổng hợp** *(Combined Uncertainty)* | | $u_c = \sqrt{u_{A1}^2 + u_{B1}^2 + u_{B2}^2 + u_{B3}^2}$ |
| **ĐKĐB mở rộng** *(Expanded Uncertainty)* | | $U = k \cdot u_c$ — k = 2 với mức tin cậy xấp xỉ 95 % |

## 8. Xử lý chung

- **8.1.** Phương tiện đo sau khi hiệu chuẩn được dán tem, cấp giấy chứng nhận hiệu chuẩn kèm theo kết quả hiệu chuẩn.
- **8.2.** Chu kỳ hiệu chuẩn được khuyến nghị là 01 năm.

## 9. Phụ lục

`ETV.MCA.F 04.01` — Biên bản hiệu chuẩn phương tiện đo nồng độ khí O₃ của trạm quan trắc chất lượng không khí xung quanh.

> *Ghi chú của bản chuyển đổi:* trang Phụ lục của bản gốc ghi "Chi tiết theo **ETV.MCA.F 05.01**" trong khi mục 9 ghi `ETV.MCA.F 04.01` — mã đúng phải là `F 04.01`. Cần đính chính khi ban hành lại.

---

## TÀI LIỆU THAM KHẢO

- **ĐLVN 389:2021** — Quy trình kiểm định phương tiện đo nồng độ khí của trạm quan trắc chất lượng không khí xung quanh;
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
- **TCVN 8712:2011 (ISO 12039:2001)** — Phát thải nguồn tĩnh - Xác định cacbon monoxit, cacbon dioxit và oxy;
- **TCVN 8714:2011 (ISO 25140:2010)** — Phát thải nguồn tĩnh – Phương pháp tự động xác định nồng độ metan bằng detector ion hóa ngọn lửa;
- **TCVN 8715 (ISO 15139)** — Phát thải nguồn tĩnh – Phương pháp thủ công xác định nồng độ metan sử dụng sắc ký khí;
- **TCVN 6751:2009 (ISO 9169:2006)** — Chất lượng không khí – Định nghĩa và xác định đặc trưng tính năng của hệ thống đo tự động;
- **ISO 14956** — Air quality – Evaluation of the suitability of a measurement procedure by comparison with a required measurement uncertainty;
- **ISO 20988** — Air quality – Guidelines to estimating measurement uncertainty;
- **Quyết định số 1292/QĐ-TCMT** ngày 28/10/2013 của Tổng cục trưởng Tổng cục Môi trường.
