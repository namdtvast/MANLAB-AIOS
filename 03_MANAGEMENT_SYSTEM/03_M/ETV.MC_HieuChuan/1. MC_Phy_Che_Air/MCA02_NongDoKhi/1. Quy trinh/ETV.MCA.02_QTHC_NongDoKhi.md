---
id: ETV.MCA 02
title: "Phương tiện đo nồng độ khí — Quy trình hiệu chuẩn"
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
revision: "03"
status: Da-ban-hanh
keywords: [CO, NO, NO2, SO2, O3, CO2, O2, HC, LEL, H2S, NH3, HF, Cl2, HCl, benzen, toluene, VOCs, khí cầm tay, khí chuẩn, hiệu chuẩn]
related_documents: ["ETV.MCA.F 02.01", "ETV.P06"]
iso_clause: ["ISO/IEC 17025:2017"]
legal_basis: ["ĐLVN 113:2002", "ĐLVN 265:2016", "Thông tư 10/2021/TT-BTNMT", "Nghị định 08/2021/NĐ-CP"]
ai_tags: [calibration-procedure, gas-analyzer, portable-gas-detector, stack-emission, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCA 02_Khi_V8.pdf`"
supersedes: "ETV.MCA 02 lần ban hành 02 (22/04/2023)"
superseded_by: null
---
# PHƯƠNG TIỆN ĐO NỒNG ĐỘ KHÍ – QUY TRÌNH HIỆU CHUẨN

*Gas analyzers – Calibration procedure*

|                   |                     |
| ----------------- | ------------------- |
| **Mã số**         | ETV.MCA 02          |
| **Lần ban hành**  | 03                  |
| **Ngày ban hành** | 22/04/2026          |
| **Biên soạn**     | Nguyễn Văn Huy      |
| **Soát xét**      | Trần Thị Hoa        |
| **Phê duyệt**     | Nguyễn Hoàng Giang  |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCA 02_Khi_V8.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khi có khác biệt, bản PDF do Viện ban hành là bản có giá trị áp dụng.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian  | Nội dung thay đổi                                    | Lần ban hành |
| ---------- | ---------------------------------------------------- | ------------ |
| 22/04/2023 | Ban hành lần thứ hai (theo ý kiến của chuyên gia BoA) | 02          |
| 22/04/2026 | Ban hành lần thứ ba                                  | 03           |

---

## 1. Phạm vi áp dụng

Văn bản kỹ thuật này quy định quy trình hiệu chuẩn phương tiện đo (PTĐ) khí cầm tay và trạm quan trắc tự động liên tục đối với một số đối tượng có phạm vi đo và sai số lớn nhất cho phép như bảng sau.

| TT  | Đối tượng          | Phạm vi đo                                | MPE      |
| --- | ------------------ | ----------------------------------------- | -------- |
| 1   | CO                 | (0 ÷ 1) %V; (0 ÷ 11.450) mg/m³            | ± 0,7 %  |
| 2   | NO                 | (0 ÷ 5.000) ppm; (0 ÷ 6.150) mg/m³        | ± 1,0 %  |
| 3   | NO₂                | (0 ÷ 2.000) ppm; (0 ÷ 3.760) mg/m³        | ± 2,0 %  |
| 4   | SO₂                | (0 ÷ 5.000) ppm; (0 ÷ 13.100) mg/m³       | ± 0,7 %  |
| 5   | O₃                 | (0 ÷ 10) ppm; (0 ÷ 19,6) mg/m³            | ± 2,1 %  |
| 6   | CO₂                | (0 ÷ 30) %V                               | ± 0,7 %  |
| 7   | O₂                 | (0 ÷ 30) %V                               | ± 0,6 %  |
| 8   | HC (CH₄) / LEL     | (0 ÷ 26.000) mg/m³ / (0 ÷ 100) %V         | ± 3 %    |
| 9   | C₄H₁₀ / LEL        | (0 ÷ 1,8) %V / (0 ÷ 100) %V               | ± 2,1 %  |
| 10  | C₃H₈               | (0 ÷ 2,2) %V                              | ± 2,1 %  |
| 11  | H₂S                | (0 ÷ 1.000) ppm; (0 ÷ 1.517) mg/m³        | ± 2,1 %  |
| 12  | NH₃                | (0 ÷ 1.000) ppm; (0 ÷ 759) mg/m³          | ± 2,3 %  |
| 13  | HF                 | (0 ÷ 0,5) %V; (0 ÷ 400) mg/m³             | ± 10 %   |
| 14  | Cl₂                | (0 ÷ 0,12) %V; (0 ÷ 300) mg/m³            | ± 3 %    |
| 15  | HCl                | (0 ÷ 0,12) %V; (0 ÷ 300) mg/m³            | ± 1,1 %  |
| 16  | Benzen             | (0 ÷ 15) mg/m³                            | ± 2 %    |
| 17  | Ethyl Benzene      | (0 ÷ 2400) mg/m³                          | ± 2 %    |
| 18  | o-Xylene           | (0 ÷ 2400) mg/m³                          | ± 2 %    |
| 19  | Toluene            | (0 ÷ 2000) mg/m³                          | ± 2 %    |
| 20  | VOCs               | (0 ÷ 2400) mg/m³                          | ± 2 %    |

Quy trình này áp dụng đối với nhân viên của Viện Kiểm định Công nghệ và Môi trường (sau đây gọi tắt là PTN) khi hiệu chuẩn phương tiện đo nói trên.

## 2. Giải thích từ ngữ

Các từ ngữ trong văn bản này được hiểu như sau:

- **2.1. Phương tiện đo nồng độ các thông số khí (gọi tắt là PTĐ):** là phương tiện kỹ thuật để thực hiện phép đo.
- **2.2. Sai số lớn nhất cho phép (MPE):** giá trị cực trị của sai số đo, đối với giá trị đại lượng quy chiếu đã biết, cho phép bằng yêu cầu kỹ thuật hoặc các quy định đối với phép đo, phương tiện đo hoặc hệ thống đo đã cho.
- **2.3. Độ trôi:** sự thay đổi liên tục tăng lên hoặc giảm xuống của chỉ số theo thời gian, gây ra do những thay đổi trong tính chất đo lường của phương tiện đo.
- **2.4. Khí "không":** là khí có nồng độ cần hiệu chuẩn nhỏ hơn giới hạn phát hiện của phương tiện đo.
- **2.5. Khí chuẩn, hỗn hợp khí chuẩn:** là loại chất chuẩn được chứng nhận (thể khí) có các thành phần cần hiệu chuẩn ổn định với nồng độ xác định, thường được nén với áp suất cao trong bình kim loại.
- **2.6. Đơn vị tính:** %V (phần trăm thể tích); ppm (phần triệu thể tích); ppb (phần tỷ thể tích).
- **2.7. Cách thức chuyển đổi:** Căn cứ vào các quy định hiện hành về đơn vị đo và điều kiện tiêu chuẩn trong các quy chuẩn kỹ thuật quốc gia về môi trường tương ứng, phải tính toán chuyển đổi đơn vị đo sang mg/m³ tại điều kiện tiêu chuẩn tương ứng. Trường hợp kết quả đo của thiết bị là ppm và điều kiện tiêu chuẩn quy định là 25 °C, 760 mmHg:

  | Chất | Hệ số chuyển đổi |
  | --- | --- |
  | CO  | ppm × 1,14 = mg/Nm³ |
  | SO₂ | ppm × 2,62 = mg/Nm³ |
  | NO₂ | ppm × 1,88 = mg/Nm³ |
  | NO  | ppm × 1,23 = mg/Nm³ |

  Đối với các PTĐ khác thì cũng được tính toán và chuyển đổi tương tự, hoặc truy cập website: `https://www.teesing.com/en/page/library/tools/ppm-mg3-converter`

## 3. Các phép hiệu chuẩn

Phải lần lượt tiến hành các phép kiểm tra ghi trong Bảng 1.

**Bảng 1.**

| TT  | Tên phép hiệu chuẩn                                        | Theo điều, mục của quy trình |
| --- | ---------------------------------------------------------- | ---------------------------- |
| 1   | Kiểm tra bên ngoài                                         | 7.1                          |
| 2   | Kiểm tra kỹ thuật                                          | 7.2                          |
| 3   | **Kiểm tra đo lường**                                      | 7.3                          |
|     | *Đối với hiệu chuẩn sử dụng khí chuẩn*                     | 7.3.2.1                      |
|     | — Kiểm tra điểm "0"                                        |                              |
|     | — Kiểm tra sai số                                          |                              |
|     | — Kiểm tra lặp lại                                         |                              |
|     | — Kiểm tra độ ổn định theo thời gian                       |                              |
|     | *Đối với hiệu chuẩn sử dụng kết quả phân tích (mẫu chuẩn)* | 7.3.2.2                      |
|     | — Kiểm tra sai số                                          |                              |
|     | — Kiểm tra lặp lại                                         |                              |
| 4   | Xử lý chung                                                | 8                            |

> **Ghi chú:** Đối với kiểm tra đo lường bằng mẫu chuẩn ⁽*⁾ chỉ thực hiện kiểm tra sai số tại điểm thực tế và chỉ áp dụng thực hiện trạm khí tại hiện trường.

## 4. Phương tiện phục vụ hiệu chuẩn

Phương tiện hiệu chuẩn được ghi trong Bảng 2.

**Bảng 2**

| TT  | Tên phương tiện hiệu chuẩn                | Đặc trưng kỹ thuật đo lường cơ bản                                                                          |
| --- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| 1   | **Chuẩn đo lường**                        |                                                                                                             |
| 1.1 | Khí chuẩn                                 | - Chọn bình khí chuẩn hoặc điểm khí chuẩn pha loãng có nồng độ bằng hoặc lớn hơn phạm vi đo lớn nhất đối với thông số quy định tại Mục 1<br>- ĐKĐB ≤ ½ phương tiện cần hiệu chuẩn |
| 1.2 | Mẫu chuẩn ⁽*⁾                             | Giá trị chuẩn được xác định bằng kết quả phân tích theo phương pháp xác định nồng độ khí quy định. Đơn vị phân tích phải được chứng nhận VIMCERT theo Nghị định 08/2021/NĐ-CP (Nghị định 127/2014/NĐ-CP cũ) và đã được Viện ETV đánh giá nhà cung cấp theo thủ tục `ETV.P06` |
| 2   | **Phương tiện khác**                      |                                                                                                             |
| 2.1 | Khí "không"                               | - Theo TCVN 3286 hoặc không khí sạch chứa các thành phần khí nhỏ hơn giới hạn phát hiện mà phương tiện đo có thể đo được |
| 2.2 | Thiết bị pha loãng khí chuẩn              | - Lưu lượng đầu ra (0,08 ÷ 5) L/min<br>- Có khả năng tạo ra O₃ tối đa: 10 ppm<br>- Tỷ lệ pha trộn khí chuẩn/khí "không" là 1/5 ÷ 1/1000<br>- Thiết bị pha loãng khí chuẩn phù hợp với yêu cầu kỹ thuật đo lường đã được tổ chức, cá nhân công bố hoặc được cơ quan quản lý nhà nước về đo lường có thẩm quyền quy định áp dụng |
| 2.3 | Bộ điều chỉnh lưu lượng khí               | - Lưu lượng đầu ra: (0,5 ÷ 10) L/min                                                                        |
| 2.4 | Phương tiện đo nhiệt độ, độ ẩm môi trường | - Nhiệt độ: (0 ÷ 50) °C, giá trị độ chia 1 °C<br>- Độ ẩm: (25 ÷ 95) %RH, giá trị độ chia 1 %RH              |
| 3   | **Phương tiện phụ**                       |                                                                                                             |
| 3.1 | Van nối, ống dẫn khí, đầu chuyển đổi      | - Được chế tạo bằng vật liệu thép không gỉ, đồng hoặc nhựa teflon để không làm ảnh hưởng đến khí chuẩn và thành phần khí thuộc đối tượng cần đo |
| 3.2 | Dung dịch kiểm tra rò khí đường ống       |                                                                                                             |

⁽*⁾ Lựa chọn mẫu chuẩn theo yêu cầu khách hàng, trong đó có sự thống nhất về đơn vị được chứng nhận VIMCERT. Đồng thời, chỉ áp dụng thực hiện trạm khí tại hiện trường.

## 5. Điều kiện hiệu chuẩn

Khi tiến hành hiệu chuẩn, phải đảm bảo các điều kiện sau đây:

### 5.1. Điều kiện hiệu chuẩn

- Nhiệt độ: (25 ± 5) °C;
- Độ ẩm không khí: ≤ 80 %RH;
- Điện áp nguồn cấp chính: 220 VAC.

### 5.2. Điều kiện an toàn

- Có hệ thống nối đất an toàn;
- Có hệ thống thông gió/thoát khí đảm bảo an toàn;
- Không có các loại hơi, các loại khí có khả năng ăn mòn cũng như các chất dễ gây cháy, nổ.

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành hiệu chuẩn phải thực hiện các công việc chuẩn bị sau đây:

- **a.** Lựa chọn giá trị nồng độ khí chuẩn phù hợp theo Bảng 2.
- **b.** Đặt bình chịu áp lực chứa khí chuẩn trong phòng đạt điều kiện hiệu chuẩn không ít hơn 6 giờ đối với bình có dung tích nhỏ hơn 40 lít và không ít hơn 16 giờ đối với bình có dung tích từ 40 lít trở lên.
- **c.** Thiết bị cần hiệu chuẩn phải được duy trì ít nhất là 30 phút.
- **d.** Khởi động thiết bị tạo khí "không", thiết bị đo nồng độ khí, thiết bị pha loãng khí chuẩn (nếu cần).
- **e.** Kiểm tra kết nối của van, áp kế trên đường ống kết nối từ các bình khí chuẩn đến PTĐ đảm bảo kín, khít, không rò rỉ và lưu lượng khí đầu vào phù hợp với yêu cầu quy định của nhà sản xuất PTĐ.

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

Phải kiểm tra bên ngoài theo các yêu cầu sau đây:

Kiểm tra bằng mắt để xác định sự phù hợp của PTĐ với các yêu cầu quy định trong tài liệu kỹ thuật về hình dáng, kích thước, hiển thị, nguồn điện sử dụng, nhãn hiệu và phụ kiện kèm theo.

### 7.2. Kiểm tra kỹ thuật

Phải kiểm tra kỹ thuật theo các yêu cầu sau đây:

Kiểm tra cơ cấu chỉnh, trạng thái hoạt động bình thường của PTĐ theo tài liệu kỹ thuật của nhà sản xuất.

### 7.3. Kiểm tra đo lường

PTĐ nồng độ khí được kiểm tra đo lường theo trình tự nội dung, phương pháp và yêu cầu sau:

#### 7.3.1. Đo hiệu chỉnh

Hiệu chỉnh phương tiện đo tùy thuộc theo yêu cầu của khách hàng. Nếu khách hàng không yêu cầu, bỏ qua bước hiệu chỉnh (mục 7.3.1) và tiến hành hiệu chuẩn cho phương tiện đo. Thực hiện hiệu chỉnh theo các bước sau:

**a) Hiệu chỉnh khí "không":** đặt nồng độ khí "không" và đợi giá trị hiển thị của nồng độ khí "không" trên PTĐ nồng độ khí cần hiệu chuẩn ổn định. Ghi lại giá trị đo được vào biên bản. Tiến hành việc hiệu chỉnh điểm khí "không" trên PTĐ nồng độ khí cần hiệu chuẩn.

**b) Hiệu chỉnh khí có nồng độ:** sau khi hiệu chỉnh xong tại điểm khí "không" trên PTĐ nồng độ khí cần hiệu chuẩn thì tiến hành đo với khí chuẩn trực tiếp từ bình khí hoặc đặt giá trị nồng độ trên thiết bị pha loãng khí chuẩn có giá trị nồng độ tương ứng một trong các điểm (40 ± 10) % và (80 ± 10) % toàn bộ phạm vi đo trên PTĐ khí cần hiệu chuẩn. Đợi giá trị hiển thị nồng độ của khí chuẩn trên PTĐ ổn định hoặc xấp xỉ giá trị nồng độ đã đặt. Ghi lại giá trị đo được vào biên bản. Tiến hành việc hiệu chỉnh khí có nồng độ trên PTĐ nồng độ khí cần hiệu chuẩn.

#### 7.3.2. Tiến hành hiệu chuẩn

##### 7.3.2.1. Đối với hiệu chuẩn sử dụng khí chuẩn theo mục 1.1

**a) Kiểm tra điểm "0"**

Phải dùng PTĐ nồng độ khí đo tối thiểu 03 lần liên tục bằng khí "không" với lưu lượng đầu ra phù hợp với lưu lượng đầu vào của PTĐ. Đợi giá trị trên PTĐ ổn định (bằng hoặc xấp xỉ bằng 0). Ghi lại các giá trị đo được vào biên bản.

**b) Kiểm tra sai số**

- Sai số của PTĐ nồng độ khí phải được xác định riêng rẽ đối với các thông số khí. Thực hiện đo với khí chuẩn trực tiếp từ bình khí hoặc đặt giá trị nồng độ trên thiết bị pha loãng khí chuẩn lần lượt với các điểm nồng độ có giá trị bằng (40 ± 10) % và (80 ± 10) % của toàn bộ phạm vi đo.
- Tại mỗi điểm hiệu chuẩn đo tối thiểu 03 lần liên tiếp bằng PTĐ. Đợi giá trị ổn định và ghi lại giá trị đo được vào biên bản.
- Kết quả sai số xác định theo công thức:

$$
\Delta = C_d - C_{ch}
$$

- `Δ`: sai số;
- `C_d`: giá trị của phương tiện đo;
- `C_ch`: giá trị của chuẩn.

**c) Kiểm tra lặp lại**

- Với mỗi thông số khí, thực hiện đo với khí chuẩn trực tiếp từ bình khí hoặc đặt giá trị nồng độ trên thiết bị pha loãng khí chuẩn lần lượt với các điểm nồng độ có giá trị bằng (40 ± 10) % và (80 ± 10) % của toàn bộ phạm vi đo.
- Phải dùng PTĐ cần hiệu chuẩn đo lặp 10 lần liên tiếp xác định nồng độ khí chuẩn đã chọn. Ghi giá trị đo được vào biên bản.
- Độ lệch chuẩn thực nghiệm `s(q_k)` được xác định theo công thức:

$$
s(q_k) = \sqrt{\frac{1}{n-1}\sum_{k=1}^{n}(q_k - \bar{q})^2}
$$

Trong hầu hết các trường hợp, ước lượng tốt nhất có thể có của các giá trị kỳ vọng của đại lượng q là trung bình số học `q̄`, nó thay đổi một cách ngẫu nhiên.

**d) Kiểm tra độ ổn định theo thời gian**

- Với mỗi thông số khí, thực hiện đo với khí chuẩn trực tiếp từ bình khí hoặc đặt giá trị nồng độ trên thiết bị pha loãng khí chuẩn lần lượt với các điểm nồng độ có giá trị bằng (40 ± 10) % hoặc (80 ± 10) % của toàn bộ phạm vi đo.
- Phải dùng PTĐ đo tối thiểu 03 lần giá trị nồng độ khí chuẩn đã chọn, mỗi lần cách nhau 02 giờ. Ghi lại giá trị đo được vào biên bản.
- Sai số của mỗi phép đo được xác định theo công thức:

$$
a_{od} = C_s - C_d
$$

- `a_od`: sai số của lần đo thứ i so với lần đầu tiên của PTĐ;
- `C_s`: giá trị của phương tiện đo với lần đo thứ i;
- `C_d`: giá trị của phương tiện đo với lần đo đầu tiên.

##### 7.3.2.2. Đối với hiệu chuẩn sử dụng chuẩn đo lường theo mục 1.2 (sử dụng kết quả phân tích)

**a) Kiểm tra sai số**

- Sai số của PTĐ nồng độ khí phải được xác định riêng rẽ đối với các thông số khí. Thực hiện lấy mẫu, đo nhanh và phân tích kết quả theo phương pháp xác định nồng độ khí thải quy định theo Thông tư 10/2021/TT-BTNMT theo mức (trên 50 % và dưới 50 %) công suất của nhà máy. Thời gian, kết quả lấy mẫu được ghi vào biên bản. Đối với hoạt động lấy mẫu, đo nhanh và phân tích có thể sử dụng đơn vị bên ngoài có đủ năng lực, phải được chứng nhận VIMCERT theo Nghị định 08/2021/NĐ-CP và đã được Viện ETV đánh giá nhà cung cấp theo thủ tục `ETV.P06`.
- Tại mỗi điểm hiệu chuẩn ghi kết quả đo của thiết bị và kết quả phân tích khí theo cùng thời điểm. Xử lý kết quả và ghi lại giá trị đo được vào biên bản.
- Kết quả sai số xác định theo công thức:

$$
\Delta = C_d - C_{ch}
$$

**b) Kiểm tra lặp lại**

- Với mỗi thông số khí, thực hiện lấy mẫu, đo nhanh và phân tích kết quả theo phương pháp xác định nồng độ khí thải quy định theo Thông tư 10/2021/TT-BTNMT theo mức (trên 50 % và dưới 50 %) công suất của nhà máy. Đối với hoạt động lấy mẫu, đo nhanh và phân tích có thể sử dụng đơn vị bên ngoài có đủ năng lực, phải được chứng nhận VIMCERT theo Nghị định 08/2021/NĐ-CP.
- Phải dùng PTĐ cần hiệu chuẩn đo lặp từ (3 ÷ 6) lần liên tiếp xác định nồng độ khí đã chọn. Ghi giá trị đo được vào biên bản.
- Độ lệch chuẩn thực nghiệm `s(q_k)` được xác định theo công thức:

$$
s(q_k) = \sqrt{\frac{1}{n-1}\sum_{k=1}^{n}(q_k - \bar{q})^2}
$$

> **Ghi chú:** Việc thực hiện hiệu chuẩn thực hiện theo yêu cầu thực tế của khách hàng. Viện ETV trao đổi và thống nhất với khách hàng về số lượng điểm và nội dung kiểm tra trong phiếu yêu cầu thực hiện.

#### 7.3.3. Đánh giá độ không đảm bảo đo (ĐKĐB)

```
Bắt đầu → Bước 1: Phép đo đặc trưng
        → Bước 2: Xác định các yếu tố ảnh hưởng đến ĐKĐB
        → Bước 3: Tính toán ĐKĐB của các yếu tố ảnh hưởng
        → Bước 4: Tính toán ĐKĐB kết hợp và ĐKĐB mở rộng
```

##### 7.3.3.1. Xác định đại lượng đo

So sánh PTĐ khí bằng cách đo trực tiếp với bình khí chuẩn hoặc đo gián tiếp từ khí chuẩn thông qua thiết bị pha loãng khí chuẩn. Đối với mỗi bình khí chuẩn đều có giấy chứng nhận độ chính xác hoặc độ không đảm bảo đo của bình khí.

Ngoài ra, còn một số thiết bị cũng có ảnh hưởng đến kết quả đo như: thiết bị tạo khí "không", thiết bị ổn điện ảnh hưởng đến sự ổn định của toàn bộ hệ thống hiệu chuẩn thiết bị, thiết bị đo điều kiện môi trường gây ra các sai số trong kết quả đo giữa các lần đo khác nhau… Như vậy, cần phải xác định đại lượng ảnh hưởng đến ĐKĐB để tính toán một cách cụ thể và chính xác đối với kết quả cuối cùng.

##### 7.3.3.2. Xác định các yếu tố gây ra ĐKĐB

- PTĐ nồng độ khí cần hiệu chuẩn: đặc tính kỹ thuật do nhà sản xuất cung cấp, số liệu đo đạc lần trước, độ trôi điểm "không", độ chính xác, độ lặp lại, độ tuyến tính, thời gian đáp ứng khi sử dụng thiết bị, độ trôi điểm nồng độ;
- Thiết bị pha loãng khí chuẩn: độ chính xác do nhà sản xuất cung cấp hoặc độ không đảm bảo đo do tổ chức đo lường chứng nhận;
- Điều kiện môi trường trong đo/hiệu chuẩn (nhiệt độ, độ ẩm, áp suất);
- Bình khí chuẩn;
- Nhân viên đo/hiệu chuẩn;
- Nguồn điện cấp vào thiết bị;
- Một số ảnh hưởng ngẫu nhiên khác.

##### 7.3.3.3. Tính toán ĐKĐB của các yếu tố ảnh hưởng

Các yếu tố ảnh hưởng đến ĐKĐB được xác định từ mục 7.3.3.2. Tuy nhiên, không phải tất cả các yếu tố ảnh hưởng đều có thể xác định được hoặc có những yếu tố ảnh hưởng không đáng kể tới ĐKĐB thì có thể xem xét và bỏ qua như: nhân viên thực hiện công tác đo/hiệu chuẩn, nguồn điện, điều kiện môi trường, thời gian đáp ứng khi sử dụng thiết bị và một vài yếu tố ngẫu nhiên khác…

**ĐKĐB của PTĐ khí cần hiệu chuẩn** được xác định thông qua ĐKĐB độ chụm — độ lặp lại (`u_A1`), ĐKĐB độ ổn định theo thời gian (`u_A2`) và ĐKĐB thông qua độ phân giải của PTĐ (`u_B1`):

- ĐKĐB của độ chụm (độ lặp lại):

$$
u_{A1} = s(\bar{q}) = \frac{s(q_k)}{\sqrt{n}} = \sqrt{\frac{1}{n(n-1)}\sum_{k=1}^{n}(q_k - \bar{q})^2}
$$

- ĐKĐB độ ổn định theo thời gian của PTĐ:

$$
u_{A2} = \frac{\max a_{od}}{\sqrt{3}}
$$

  với `max a_od` là độ không ổn định lớn nhất của lần đo thứ i so với lần đầu tiên của PTĐ.

- ĐKĐB thông qua độ phân giải của thiết bị (lấy từ thông số của nhà sản xuất):

$$
u_{B1} = \frac{a_{pg}}{2\sqrt{3}}
$$

  với `a_pg` là độ phân giải của PTĐ; cần phải quy đổi đơn vị ppm hoặc % phù hợp với cách tính ĐKĐB của các yếu tố trên.

**ĐKĐB của mẫu chuẩn:**

$$
u_{B2} = \frac{u_k}{k}
$$

- `u_k`: ĐKĐB trích dẫn theo chứng nhận của nhà sản xuất khí chuẩn;
- `k`: hệ số bao phủ được công bố theo giấy chứng nhận của nhà sản xuất.

Với những khí chuẩn mà nhà sản xuất không công bố ĐKĐB, chỉ có độ chính xác của khí chuẩn:

$$
u_{B2} = \frac{a_k}{\sqrt{3}}
$$

với `a_k` là độ chính xác của khí chuẩn theo chứng nhận của nhà sản xuất.

**ĐKĐB của thiết bị pha loãng khí chuẩn** *(áp dụng đối với thiết bị phải sử dụng thiết bị pha loãng khí chuẩn)*:

$$
u_{B3} = \frac{u_{ref}}{k}
$$

- `u_ref`: ĐKĐB trích dẫn theo chứng nhận hiệu chuẩn của thiết bị;
- `k`: hệ số bao phủ được công bố theo giấy chứng nhận của nhà sản xuất.

Với thiết bị có độ chính xác công bố của hãng sản xuất:

$$
u_{B3} = \frac{a_{ref}}{\sqrt{3}}
$$

Đối với trường hợp không sử dụng thiết bị pha loãng mà dùng phương tiện đo lưu lượng khí để kiểm soát lưu lượng thì:

$$
u_{B3} = \frac{u_{\%ll}}{2}
$$

với `u_%ll` là ĐKĐB của thiết bị đo lưu lượng (cấp trong GCN hiệu chuẩn).

**ĐKĐB tổng hợp:**

$$
u_c = \sqrt{u_{A1}^2 + u_{A2}^2 + u_{B1}^2 + u_{B2}^2 + u_{B3}^2}
$$

**ĐKĐB mở rộng** — độ không đảm bảo đo mở rộng (U) là đại lượng xác định miền giá trị phân bố bao quanh kết quả đo:

$$
U = k \cdot u_c
$$

Với `k` là hệ số bao phủ, thường được chọn k = 2 với mức tin cậy 95 %. Thành phần này chính là độ không đảm bảo đo của kết quả hiệu chuẩn PTĐ nồng độ khí và được đưa vào giấy chứng nhận hiệu chuẩn cùng với kết quả hiệu chuẩn.

## 8. Xử lý chung

- **8.1.** PTĐ nồng độ khí sau khi hiệu chuẩn được dán tem, cấp giấy chứng nhận hiệu chuẩn kèm theo kết quả hiệu chuẩn.
- **8.2.** Chu kỳ hiệu chuẩn khuyến nghị là 12 tháng.

## 9. Phụ lục

Biên bản hiệu chuẩn phương tiện đo nồng độ khí (`ETV.MCA.F 02.01`).

---

## TÀI LIỆU THAM KHẢO

- **ĐLVN 113:2002** — Yêu cầu về nội dung và cách trình bày văn bản kỹ thuật Đo lường Việt Nam;
- **ISO/IEC 17025:2017** — Yêu cầu chung về năng lực của phòng thử nghiệm và hiệu chuẩn;
- **ĐLVN 265:2016** — Quy trình kiểm định phương tiện đo nồng độ SO₂, CO₂, CO, NOx trong không khí.
