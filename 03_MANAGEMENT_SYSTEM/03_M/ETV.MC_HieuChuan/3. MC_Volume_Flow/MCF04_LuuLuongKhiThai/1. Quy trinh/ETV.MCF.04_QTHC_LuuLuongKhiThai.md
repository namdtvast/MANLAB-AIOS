---
id: ETV.MCF 04
title: "Phương tiện đo lưu lượng khí thải — Quy trình hiệu chuẩn"
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
keywords: [lưu lượng khí thải, ống khói, flow meter, ống Pitot, hiệu chuẩn]
related_documents: []
iso_clause: ["ISO/IEC 17025:2017", "TCVN 6910"]
legal_basis: ["Thông tư 24/2017/TT-BTNMT"]
ai_tags: [calibration-procedure, stack-flow, pitot-tube, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCF 04_Luu luong khi thai_V1.pdf`"
supersedes: "ETV.MCF 04 lần ban hành 01 (22/04/2019)"
superseded_by: null
---
# PHƯƠNG TIỆN ĐO LƯU LƯỢNG KHÍ THẢI – QUY TRÌNH HIỆU CHUẨN

*Flow Meter – Calibration Procedure*

|                   |                     |
| ----------------- | ------------------- |
| **Mã số**         | ETV.MCF 04          |
| **Lần ban hành**  | 02                  |
| **Ngày ban hành** | 22/04/2026          |
| **Biên soạn**     | *(bản gốc để trống)* |
| **Soát xét**      | Trần Thị Hoa        |
| **Phê duyệt**     | Nguyễn Hoàng Giang  |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCF 04_Luu luong khi thai_V1.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khối chữ ký trên trang bìa để trống, chưa có tên người biên soạn.
>
> *Ghi chú của bản chuyển đổi:* trang bìa ghi "Lần ban hành: 02, Ngày ban hành: 22/04/2026", nhưng toàn bộ chân trang lặp lại từ trang 2 trở đi vẫn ghi "Lần BH: 01, Ngày BH: 22/04/2019, Soát xét: 19/5/2020" — cho thấy nội dung thân văn bản (từ mục 1 trở đi) có khả năng chưa được cập nhật đồng bộ với trang bìa khi ban hành lần 2. Bản chuyển đổi này lấy thông tin trang bìa (lần 02 — 22/04/2026) làm giá trị chính thức, giữ nguyên nội dung thân văn bản theo bản PDF gốc.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian  | Nội dung thay đổi     | Lần ban hành |
| ---------- | ---------------------- | ------------ |
| 22/04/2019 | Ban hành lần thứ nhất  | 01           |
| 22/04/2022 | Ban hành lần thứ hai   | 02           |

---

## 1. Phạm vi và đối tượng áp dụng

Quy trình này quy định quy trình kỹ thuật hiệu chuẩn phương tiện đo lưu lượng khí thải trong ống khói tự động, liên tục cụ thể: phạm vi đo đến 5.000.000 m³/h hoặc vận tốc đến 40 m/s, độ chính xác ± 3 %.

Quy trình này áp dụng đối với nhân viên của Viện Kiểm định Công nghệ và Môi trường khi sử dụng PTĐ nói trên.

## 2. Thuật ngữ và định nghĩa

Trong quy trình này các từ ngữ sau đây được hiểu như sau:

1. **Phương tiện đo (PTĐ):** là thiết bị được dùng độc lập hoặc kết hợp với thiết bị phụ để thực hiện phép đo.
2. **Hiệu chuẩn:** là hoạt động, trong những điều kiện quy định, bước thứ nhất là thiết lập mối liên hệ giữa các giá trị đại lượng có độ không đảm bảo đo do chuẩn đo lường cung cấp và các số chỉ tương ứng với độ không đảm bảo đo kèm theo và bước thứ hai là sử dụng thông tin này thiết lập mối liên hệ để nhận được kết quả đo từ số chỉ.

   *Chú thích:*
   - Hiệu chuẩn có thể diễn tả bằng một tuyên bố, hàm hiệu chuẩn, biểu đồ hiệu chuẩn, đường cong hiệu chuẩn, hoặc bảng hiệu chuẩn. Trong một số trường hợp nó có thể bao gồm sự hiệu chính cộng hoặc nhân của số chỉ với độ không đảm bảo đo kèm theo;
   - Không được nhầm lẫn hiệu chuẩn với hiệu chỉnh hệ thống đo, thường gọi sai là "tự hiệu chuẩn", cũng không được nhầm lẫn với kiểm định của hiệu chuẩn;
   - Thông thường bước đầu tiên trong định nghĩa trên được hiểu là hiệu chuẩn.

3. **Hiệu chỉnh:** là tập hợp các thao tác được tiến hành trên hệ thống đo để cho ra số chỉ đã quy định tương ứng với giá trị đã cho của đại lượng được đo.
4. **Độ không đảm bảo đo (ĐKĐB):** thông số gắn với kết quả của phép đo, đặc trưng cho sự phân tán của các giá trị có thể quy cho đại lượng đo một cách hợp lý.

   *Chú thích:*
   - Thông số có thể là độ lệch chuẩn (hoặc bội của nó), hoặc là 1/2 của khoảng với mức tin cậy xác định;
   - Nói chung, ĐKĐB gồm nhiều thành phần. Một số thành phần có thể được đánh giá bằng phân bố thống kê các kết quả của một dãy phép đo và có thể được đặc trưng bằng độ lệch chuẩn, được đánh giá từ các phân bố xác suất mô phỏng trên cơ sở thực nghiệm hoặc thông tin khác;
   - Kết quả đo được hiểu là ước lượng tốt nhất về giá trị của đại lượng đo và tất cả các thành phần của ĐKĐB, bao gồm cả những thành phần do các ảnh hưởng hệ thống như các thành phần gắn với những sự hiệu chỉnh và gắn với các chuẩn quy chiếu gây ra, đều góp phần vào độ phân tán.

5. **Độ đúng:** là mức độ gần nhau giữa trung bình của một số vô hạn các giá trị đại lượng đo được lặp lại và giá trị đại lượng quy chiếu.

   *Chú thích:*
   - Độ đúng đo không phải là đại lượng và do đó không thể thể hiện bằng số, nhưng thước đo mức độ gần nhau được cho trong TCVN 6910;
   - Độ đúng đo tỉ lệ nghịch với sai số đo hệ thống, nhưng không liên quan với sai số đo ngẫu nhiên;
   - Không được sử dụng độ chính xác đo cho "độ đúng đo" và ngược lại.

6. **Độ chính xác:** là mức độ gần nhau giữa giá trị đại lượng đo được và giá trị đại lượng thực của đại lượng đo.

   *Chú thích:*
   - Khái niệm "độ chính xác đo" không phải là đại lượng và không cho biết trị số đại lượng. Phép đo được xem là chính xác hơn khi có sai số đo nhỏ hơn;
   - Thuật ngữ "độ chính xác đo" không được sử dụng cho độ đúng đo và thuật ngữ độ chụm đo không được sử dụng cho "độ chính xác đo", tuy nhiên, nó có liên quan với cả hai khái niệm này;
   - Độ chính xác đo đôi khi được hiểu là mức độ gần nhau giữa các giá trị đại lượng đo được đang quy cho đại lượng đo.

7. **Độ trôi:** là sự thay đổi từ từ đặc trưng đo lường của PTĐ.
8. **Đơn vị tính:** mg/m³, %.

## 3. Các phép hiệu chuẩn

Phải lần lượt tiến hành các phép hiệu chuẩn ghi trong Bảng 1.

**Bảng 1**

| TT  | Tên phép hiệu chuẩn             | Theo điều, mục của quy trình |
| --- | ---------------------------------- | -------------------------------- |
| 1   | Kiểm tra bên ngoài                 | 7.1                               |
| 2   | Kiểm tra kỹ thuật                  | 7.2                               |
| 3   | Kiểm tra đo lường — kiểm tra sai số | 7.3.1                            |
|     | — kiểm tra độ lặp lại              | 7.3.2                             |
| 4   | Tính toán độ không đảm bảo đo      | 7.4                               |
| 5   | Xử lý chung                        | 8                                 |

## 4. Phương tiện phục vụ hiệu chuẩn

Phương tiện hiệu chuẩn được ghi trong Bảng 2.

**Bảng 2**

| TT  | Tên phương tiện hiệu chuẩn                                                     | Đặc trưng kỹ thuật đo lường cơ bản                                                                                                            |
| --- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Chuẩn đo lường**                                                                   |                                                                                                                                                        |
| 1.1 | Chuẩn lưu lượng — đồng hồ đo chênh áp, áp kế dạng nghiêng hoặc thiết bị đo chênh áp; phương tiện đo nhiệt độ | Phạm vi đo đến 5.000.000 m³/h, độ chính xác 2,5 %; phạm vi vận tốc dòng đến 40 m/s, độ chính xác 2,5 %; phạm vi đo đến 250 mmH2O, độ chính xác 2,5 % |
| 2   | **Phương tiện khác**                                                                 |                                                                                                                                                        |
| 2.1 | Phương tiện đo nhiệt độ, độ ẩm môi trường                                            | Nhiệt độ: (0 ÷ 50) °C, giá trị độ chia 1 °C; Độ ẩm: (25 ÷ 95) %RH, giá trị độ chia 1 %RH                                                              |
| 2.2 | Phương tiện đo áp suất khí quyển                                                     | Phạm vi đo đến 2,54 mmHg[^mmhg]                                                                                                                       |
| 3   | **Phương tiện phụ**                                                                  |                                                                                                                                                        |
| 3.1 | Ống Pitot chữ S hoặc ống Pitot tiêu chuẩn (chữ L)                                     | Được chế tạo bằng vật liệu thép không gỉ                                                                                                              |

[^mmhg]: Nguyên văn bản gốc — giá trị "2,54 mmHg" cho phạm vi đo áp suất khí quyển có khả năng là lỗi đơn vị/giá trị (áp suất khí quyển thường ở mức 700-800 mmHg), nhưng không có đủ ngữ cảnh để xác định giá trị đúng. Giữ nguyên văn.

## 5. Điều kiện hiệu chuẩn

Phòng hiệu chuẩn phải đảm bảo các điều kiện sau:

- Nhiệt độ: (25 ± 5) °C;
- Độ ẩm tương đối: ≤ 80 %RH (không đọng sương);
- Điện áp nguồn cấp chính: 220 VAC ± 10 V.

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành hiệu chuẩn phải thực hiện các công việc chuẩn bị sau đây:

- **a)** Lắp ráp hệ thống lấy mẫu và kiểm tra độ kín của hệ thống sau khi lắp ráp như hướng dẫn tại Phụ lục 02 ban hành kèm theo Thông tư 24/2017/TT-BTNMT.
- **b)** Kiểm tra độ kín của ống Pitot: thổi qua đầu dưới của ống Pitot (đầu đo áp suất động) cho đến khi công tơ của áp kế đo được ít nhất 7,6 mmH2O sau đó bịt kín, áp lực sẽ ổn định ít nhất trong 15 s. Thực hiện tương tự với lỗ trên (đầu đo áp suất tĩnh) sử dụng lực hút để có áp suất tối thiểu là 7,6 mmH2O.
- **c)** Xác định vị trí lấy mẫu, số lượng điểm hút mẫu, áp suất ống khói, nhiệt độ và áp suất động, hàm ẩm theo quy định tại Phụ lục 01, 02, 03 và 04 ban hành kèm theo Thông tư 24/2017/TT-BTNMT.
- **d)** Cần lấy mẫu phải có độ dài phù hợp, có thể hút mẫu tại tất cả các điểm hút mẫu đã được xác định theo quy định tại Phụ lục 01 ban hành kèm theo Thông tư 24/2017/TT-BTNMT.
- **e)** Lựa chọn kích thước đầu hút: căn cứ vào vận tốc của dòng khí để lựa chọn đầu hút mẫu thích hợp.
- **f)** Đánh dấu vị trí của từng điểm hút mẫu trong ống khói đã được xác định trên cần lấy mẫu bằng mực chịu nhiệt hoặc băng dính chịu nhiệt.

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

Phải kiểm tra bên ngoài theo các yêu cầu sau đây: kiểm tra bằng mắt để xác định sự phù hợp của phương tiện cần hiệu chuẩn với các yêu cầu quy định trong tài liệu kỹ thuật về hình dáng, kích thước, hiển thị, nguồn điện sử dụng, nhãn hiệu và phụ kiện kèm theo.

### 7.2. Kiểm tra kỹ thuật

Kiểm tra trạng thái hoạt động của phương tiện cần hiệu chuẩn theo tài liệu kỹ thuật.

### 7.3. Kiểm tra đo lường

#### 7.3.1. Kiểm tra lưu lượng (đối với thiết bị có ống hút mẫu)

**7.3.1.1. Đo kiểm tra trước hiệu chuẩn**

Lắp máy đầu hút lưu lượng của thiết bị cần hiệu chuẩn với thiết bị đo lưu lượng chuẩn bật sấy 3 phút. Tiến hành đo kiểm tra lưu lượng không khí, chờ giá trị chỉ thị ổn định. Ghi lại kết quả vào biên bản Phụ lục I.

**7.3.1.2. Đo kiểm tra sau hiệu chuẩn**

##### 7.3.2.1. Kiểm tra điểm "0"[^muc732]

Phải tiến hành đo tối thiểu 03 mẫu liên tiếp bằng hệ thống chuẩn lưu lượng khí thải trong ống khói tại lúc nhà máy không hoạt động. Ghi lại các giá trị của PTĐ và hệ thống chuẩn sau khi tính toán được vào biên bản.

##### 7.3.2.2. Kiểm tra sai số

- Sai số của PTĐ được thực hiện tại lúc nhà máy vận hành với công suất hoạt động ≥ 50 % công suất tối đa của nhà máy;
- Tiến hành đo tối thiểu 03 lần liên tiếp bằng hệ thống chuẩn. Ghi lại các giá trị của PTĐ và hệ thống chuẩn sau khi phân tích được vào biên bản;
- Sai lệch giữa giá trị lưu lượng danh định và giá trị lưu lượng đo được của PTĐ cần hiệu chuẩn không lớn hơn ± 5 %.

[^muc732]: Bản gốc đánh số mục con là "7.3.2.1"/"7.3.2.2" ngay dưới mục "7.3.1.2. Đo kiểm tra sau hiệu chuẩn" — có khả năng nhảy số từ 7.3.1.x sang 7.3.2.x không nhất quán (thiếu mục 7.3.1.3 hoặc đánh số nhầm 7.3.2 thay vì tiếp tục 7.3.1.3/7.3.1.4). Giữ nguyên văn cấu trúc đánh số gốc.

### 7.4. Đánh giá độ không đảm bảo đo

#### 7.4.1. Xác định các yếu tố gây ra ĐKĐB tại tất cả các điểm hiệu chuẩn

Các yếu tố gây ra ĐKĐB bao gồm:

- Thiết bị đo lưu lượng khí thải trong ống khói cần hiệu chuẩn: đặc tính kỹ thuật do nhà sản xuất cung cấp, số liệu đo đạc lần trước, độ trôi điểm "không", độ lặp lại khi sử dụng thiết bị;
- Thiết bị chuẩn đo lường: đặc tính kỹ thuật do nhà sản xuất cung cấp, số liệu đo đạc lần trước, giá trị độ chia, độ đúng của thiết bị;
- Điều kiện môi trường trong phòng đo/hiệu chuẩn (nhiệt độ, độ ẩm);
- Nhân viên đo/hiệu chuẩn;
- Nguồn điện cấp vào thiết bị;
- Một số ảnh hưởng ngẫu nhiên khác.

#### 7.4.2. Tính toán ĐKĐB đo của các yếu tố ảnh hưởng

Các yếu tố ảnh hưởng đến ĐKĐB được xác định từ mục 7.4.1. Tuy nhiên, không phải tất cả các yếu tố ảnh hưởng đều có thể xác định được hoặc có những yếu tố ảnh hưởng không đáng kể tới ĐKĐB thì có thể xem xét và bỏ qua như: nhân viên thực hiện công tác đo/hiệu chuẩn, nguồn điện, điều kiện môi trường và một vài yếu tố ngẫu nhiên khác… ĐKĐB được tính như sau:

**ĐKĐBĐ do sự lặp lại của chuẩn:**

$$u_{A1} = \frac{s}{\sqrt{3}}$$

`s`: độ lệch chuẩn thực nghiệm sau 3 lần đo, với `n` = số lần thực hiện đo, `q_k`: giá trị đo được ở lần thứ k, `q̄`: giá trị trung bình của k lần đo.

**ĐKĐB do lưu lượng chuẩn:**

$$u_{B1} = \frac{U}{k}$$

`U`: độ không đảm bảo đo của máy đo lưu lượng; `k`: hệ số phủ (k = 2).

**ĐKĐB do độ phân giải của phương tiện đo:**

$$u_{B2} = \frac{d}{2\sqrt{3}}$$

`d`: giá trị độ chia nhỏ nhất của phương tiện đo.

#### 7.4.3. Tính toán ĐKĐB kết hợp với ĐKĐB mở rộng

**ĐKĐB kết hợp:**

$$U_c = \sqrt{U_A^2 + U_{B1}^2 + U_{B2}^2}$$

**ĐKĐB mở rộng:** Độ không đảm bảo đo mở rộng (U) là đại lượng xác định miền giá trị phân bố bao quanh kết quả đo:

$$U = k \times U_c$$

Với k là hệ số bao phủ, hệ số bằng số được sử dụng như là bội của ĐKĐB chuẩn kết hợp để đưa ra độ KĐBĐ mở rộng, thường được chọn k = 2 với mức tin cậy xấp xỉ 95 %.

## 8. Xử lý chung

- **8.1.** Phương tiện đo lưu lượng khí thải trong ống khói sau khi hiệu chuẩn được dán tem, cấp giấy chứng nhận hiệu chuẩn có chứa các thông tin về kết quả hiệu chuẩn kèm theo độ không đảm bảo đo tương ứng.
- **8.2.** Chu kỳ hiệu chuẩn của phương tiện đo lưu lượng khí thải trong ống khói được khuyến nghị: tối đa 01 lần/năm.

## PHỤ LỤC

Chi tiết theo `ETV.MCF.F 04.01`.
