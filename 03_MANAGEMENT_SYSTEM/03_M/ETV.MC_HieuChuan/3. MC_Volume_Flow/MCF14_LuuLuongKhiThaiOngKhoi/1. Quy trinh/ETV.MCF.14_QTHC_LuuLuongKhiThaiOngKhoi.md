---
id: ETV.MCF 14
title: "Phương tiện đo vận tốc và lưu lượng thể tích khí thải trong ống khói — Quy trình hiệu chuẩn"
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
keywords: [vận tốc khí thải, lưu lượng khí thải, ống khói, ống Pitot, hiệu chuẩn]
related_documents: ["ETV.MCF 04 (Phương tiện đo lưu lượng khí thải)"]
iso_clause: ["ISO/IEC 17025:2017", "Thông tư 24/2017/TT-BTNMT"]
legal_basis: ["Thông tư 24/2017/TT-BTNMT"]
ai_tags: [calibration-procedure, stack-emission, flow-velocity, pitot-tube, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCF 14_Luu luong khi thai ong khoi - V1.pdf`"
supersedes: "ETV.MCF 14 lần ban hành 01 (19/05/2020)"
superseded_by: null
---
# PHƯƠNG TIỆN ĐO VẬN TỐC VÀ LƯU LƯỢNG THỂ TÍCH KHÍ THẢI TRONG ỐNG KHÓI – QUY TRÌNH HIỆU CHUẨN

*Velocity and volume flow rate in ducts – Calibration Procedure*

|                   |                     |
| ----------------- | ------------------- |
| **Mã số**         | ETV.MCF 14          |
| **Lần ban hành**  | 02                  |
| **Ngày ban hành** | 22/04/2026          |
| **Biên soạn**     | *(bản gốc để trống)* |
| **Soát xét**      | Trần Thị Hoa        |
| **Phê duyệt**     | Nguyễn Hoàng Giang  |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCF 14_Luu luong khi thai ong khoi - V1.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khối chữ ký trên trang bìa để trống, chưa có tên người biên soạn. Ô "Soát xét" ở chân trang mỗi trang thân bài ghi ngày "/ /2020" (chưa điền), khác với ngày soát xét/phê duyệt "22/04/2026" dùng trong frontmatter của bản chuyển đổi này — giữ nguyên văn ở đây, footnote tại vị trí liên quan.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian  | Nội dung thay đổi     | Lần ban hành |
| ---------- | ---------------------- | ------------ |
| 19/05/2020 | Ban hành lần thứ nhất | 01           |
| 22/04/2026 | Ban hành lần thứ hai  | 02           |

---

## 1. Phạm vi và đối tượng áp dụng

Quy trình này quy định quy trình kỹ thuật hiệu chuẩn phương tiện đo (PTĐ) lưu lượng khí thải trong ống khói tự động, liên tục cụ thể: phạm vi đo: đến 5.000.000 m³/h hoặc vận tốc đến 40 m/s, độ chính xác: ± 4%.

Quy trình này áp dụng đối với nhân viên của Viện Kiểm định Công nghệ và Môi trường khi sử dụng PTĐ nói trên.

## 2. Thuật ngữ và định nghĩa

Trong quy trình này các từ ngữ sau đây được hiểu như sau:

1. **Phương tiện đo (PTĐ):** là thiết bị được dùng độc lập hoặc kết hợp với thiết bị phụ để thực hiện phép đo.
2. **Hiệu chuẩn:** là hoạt động, trong những điều kiện quy định, bước thứ nhất là thiết lập mối liên hệ giữa các giá trị đại lượng có độ không đảm bảo đo do chuẩn đo lường cung cấp và các số chỉ tương ứng với độ không đảm bảo đo kèm theo và bước thứ hai là sử dụng thông tin này thiết lập mối liên hệ để nhận được kết quả đo từ số chỉ.
3. **Hiệu chỉnh:** là tập hợp các thao tác được tiến hành trên hệ thống đo để cho ra số chỉ đã quy định tương ứng với giá trị đã cho của đại lượng được đo.
4. **Độ không đảm bảo đo (ĐKĐB):** thông số gắn với kết quả của phép đo, đặc trưng cho sự phân tán của các giá trị có thể quy cho đại lượng đo một cách hợp lý.
5. **Độ đúng:** là mức độ gần nhau giữa trung bình của một số vô hạn các giá trị đại lượng đo được lặp lại và giá trị đại lượng quy chiếu.
6. **Độ chính xác:** là mức độ gần nhau giữa giá trị đại lượng đo được và giá trị đại lượng thực của đại lượng đo.
7. **Độ trôi:** là sự thay đổi từ từ đặc trưng đo lường của PTĐ.
8. **Đơn vị tính:** m/s, m³/h, m³/min…

## 3. Các phép hiệu chuẩn

Phải lần lượt tiến hành các phép hiệu chuẩn ghi trong Bảng 1.

**Bảng 1**

| TT  | Tên phép hiệu chuẩn        | Theo điều, mục của quy trình |
| --- | ---------------------------- | -------------------------------- |
| 1   | Kiểm tra bên ngoài            | 7.1                                |
| 2   | Kiểm tra kỹ thuật              | 7.2                                |
| 3   | Kiểm tra đo lường              | 7.3                                |
|     | – Kiểm tra sai số              | 7.3.1                              |
|     | – Kiểm tra độ lặp lại          | 7.3.2                              |
| 4   | Tính toán độ không đảm bảo đo  | 7.4                                |
| 5   | Xử lý chung                    | 8                                  |

*Ghi chú của bản chuyển đổi:* mục 7 của bản gốc trên thực tế đánh số các tiểu mục là 7.3.1.1, 7.3.1.2, rồi 7.3.2.1, 7.3.2.2 — không hoàn toàn khớp với "Kiểm tra sai số = 7.3.1 / Kiểm tra độ lặp lại = 7.3.2" như liệt kê ở Bảng 1 trên. Xem chi tiết tại mục 7.3 bên dưới; giữ nguyên đánh số gốc.

## 4. Phương tiện phục vụ hiệu chuẩn

Phương tiện hiệu chuẩn được ghi trong Bảng 2.

**Bảng 2**

| TT   | Tên phương tiện hiệu chuẩn                                              | Đặc trưng kỹ thuật đo lường cơ bản                                                                                                                                                          |
| ---- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | **Chuẩn đo lường**                                                        |                                                                                                                                                                                                    |
| 1.1  | Chuẩn lưu lượng – Đồng hồ đo chênh áp, áp kế dạng nghiêng hoặc thiết bị đo chênh áp; phương tiện đo nhiệt độ | Phạm vi đo lưu lượng: đến (0 ÷ 99,9995) m³, độ chính xác 2%; phạm vi vận tốc dòng: đến 40 m/s, độ chính xác 2%; phạm vi đo chênh áp: đến 250 mmH₂O, độ chính xác 2,3%; phạm vi đo nhiệt độ: đến 600 °C, độ chính xác 2%; ĐKĐB ≤ ½ phương tiện cần hiệu chuẩn |
| 1.2  | Chuẩn vận tốc                                                             | Phạm vi đo: đến 40 m/s; độ phân giải: 0,1 m/s; ĐKĐB ≤ ½ phương tiện cần hiệu chuẩn                                                                                                              |
| 2    | **Phương tiện khác**                                                      |                                                                                                                                                                                                    |
| 2.1  | Phương tiện đo nhiệt độ, độ ẩm môi trường                                 | Nhiệt độ: (0 ÷ 50) °C, giá trị độ chia 1 °C; độ ẩm: (25 ÷ 95) %RH, giá trị độ chia 1 %RH                                                                                                          |
| 2.2  | Phương tiện đo áp suất khí quyển                                          | Phạm vi đo đến 2,54 mmHg[^dv-mmhg], giá trị độ chia *(bản gốc để trống)*                                                                                                                          |
| 3    | **Phương tiện phụ**                                                       |                                                                                                                                                                                                    |
| 3.1  | Ống Pitot chữ S hoặc ống Pitot tiêu chuẩn (chữ L)                          | Được chế tạo bằng vật liệu thép không gỉ                                                                                                                                                          |

[^dv-mmhg]: Nguyên văn bản gốc ghi phạm vi đo áp suất khí quyển "đến 2,54 mmHg" — cùng giá trị bất thường đã ghi nhận tại `ETV.MCF 04` (áp suất khí quyển tiêu chuẩn thường vào khoảng 760 mmHg; 2,54 mmHg là quá nhỏ để phù hợp với ngữ cảnh). Nhiều khả năng là lỗi đơn vị hoặc lỗi đánh máy lặp lại từ cùng một mẫu tài liệu gốc dùng chung. Giữ nguyên văn, không tự sửa.

## 5. Điều kiện hiệu chuẩn

Phòng hiệu chuẩn phải đảm bảo các điều kiện sau:

- Nhiệt độ: (25 ± 5) °C;
- Độ ẩm tương đối: ≤ 80 %RH (không đọng sương);
- Điện áp nguồn cấp chính: 220 VAC ± 10 V.

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành hiệu chuẩn phải thực hiện các công việc chuẩn bị sau đây:

a) Lắp ráp hệ thống lấy mẫu theo hình vẽ và kiểm tra độ kín của hệ thống sau khi lắp ráp như hướng dẫn tại Phụ lục 02 ban hành kèm theo Thông tư 24/2017/TT-BTNMT.

b) Kiểm tra độ kín của ống Pitot: thổi qua đầu dưới của ống Pitot (đầu đo áp suất động) cho đến khi công tơ của áp kế đo được ít nhất 7,6 mmH₂O sau đó bịt kín, áp lực sẽ ổn định ít nhất trong 15 s. Thực hiện tương tự với lỗ trên (đầu đo áp suất tĩnh) sử dụng lực hút để có áp suất tối thiểu là 7,6 mmH₂O.

c) Xác định vị trí lấy mẫu, số lượng điểm hút mẫu, áp suất ống khói, nhiệt độ và áp suất động, hàm ẩm theo quy định tại Phụ lục 01, 02, 03 và 04 ban hành kèm theo Thông tư 24/2017/TT-BTNMT.

d) Cần lấy mẫu phải có độ dài phù hợp, có thể hút mẫu tại tất cả các điểm hút mẫu đã được xác định theo quy định tại Phụ lục 01 ban hành kèm theo Thông tư 24/2017/TT-BTNMT.

e) Lựa chọn kích thước đầu hút: căn cứ vào vận tốc của dòng khí để lựa chọn đầu hút mẫu thích hợp.

f) Đánh dấu vị trí của từng điểm hút mẫu trong ống khói đã được xác định trên cần lấy mẫu bằng mực chịu nhiệt hoặc băng dính chịu nhiệt.

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

Phải kiểm tra bên ngoài theo các yêu cầu sau đây: kiểm tra bằng mắt để xác định sự phù hợp của phương tiện cần hiệu chuẩn với các yêu cầu quy định trong tài liệu kỹ thuật về hình dáng, kích thước, hiển thị, nguồn điện sử dụng, nhãn hiệu và phụ kiện kèm theo.

### 7.2. Kiểm tra kỹ thuật

Kiểm tra trạng thái hoạt động của phương tiện cần hiệu chuẩn theo tài liệu kỹ thuật.

### 7.3. Kiểm tra đo lường

#### 7.3.1. Kiểm tra lưu lượng (đối với thiết bị có ống hút mẫu)

**7.3.1.1. Đo kiểm tra trước hiệu chuẩn**

Lắp máy đầu hút lưu lượng của thiết bị cần hiệu chuẩn với thiết bị đo lưu lượng chuẩn, bật sấy 3 phút. Tiến hành đo kiểm tra lưu lượng không khí, chờ giá trị chỉ thị ổn định. Ghi lại kết quả vào biên bản Phụ lục 1.

**7.3.1.2. Đo kiểm tra sau hiệu chuẩn**

**7.3.2.1. Kiểm tra điểm "0"**[^muc-nhay]

Phải tiến hành đo tối thiểu 03 mẫu liên tiếp bằng hệ thống chuẩn lưu lượng khí thải trong ống khói tại lúc nhà máy không hoạt động. Ghi lại các giá trị của PTĐ và hệ thống chuẩn sau khi tính toán được vào biên bản.

**7.3.2.2. Kiểm tra sai số**

- Sai số của PTĐ được thực hiện tại lúc nhà máy vận hành với công suất hoạt động ≥ 50% công suất tối đa của nhà máy.
- Tiến hành đo tối thiểu 03 lần liên tiếp bằng hệ thống chuẩn. Ghi lại các giá trị của PTĐ và hệ thống chuẩn sau khi phân tích được vào biên bản.
- Sai lệch giữa giá trị lưu lượng danh định và giá trị lưu lượng đo được của PTĐ cần hiệu chuẩn không lớn hơn ± 5%.

[^muc-nhay]: Bản gốc chuyển trực tiếp từ đánh số "7.3.1.2. Đo kiểm tra sau hiệu chuẩn" (chỉ có tiêu đề, không có nội dung) sang "7.3.2.1. Kiểm tra điểm '0'" — bỏ qua một cấp đánh số trung gian (không có nội dung "7.3.1.2" thực sự, và không có mục "7.3.2" làm tiêu đề cha cho "7.3.2.1"/"7.3.2.2"). Giữ nguyên cấu trúc/đánh số như bản gốc.

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

Các yếu tố ảnh hưởng đến ĐKĐB được xác định từ mục 7.4.1. Tuy nhiên, không phải tất cả các yếu tố ảnh hưởng đều có thể xác định được hoặc có những yếu tố ảnh hưởng không đáng kể tới ĐKĐB thì có thể xem xét và bỏ qua như: nhân viên thực hiện công tác đo/hiệu chuẩn, nguồn điện, điều kiện môi trường và một vài yếu tố ngẫu nhiên khác. ĐKĐB được tính như sau:

**ĐKĐB do sự lặp lại của chuẩn:**

$$
u_{A1} = \frac{s}{\sqrt{3}}
$$

Trong đó: `s`: độ lệch chuẩn thực nghiệm sau 3 lần đo, với `n` = số lần thực hiện đo; `q_k`: giá trị đo được ở lần thứ k; `q̄`: giá trị trung bình của k lần đo.

**ĐKĐB do lưu lượng chuẩn:**

$$
u_{B1} = \frac{U}{k}
$$

Trong đó: `U`: độ không đảm bảo đo của máy đo lưu lượng; `k`: hệ số phủ (k = 2).

**ĐKĐB do độ phân giải của phương tiện đo:**

$$
u_{B2} = \frac{d}{2\sqrt{3}}
$$

Trong đó: `d`: giá trị độ chia nhỏ nhất của phương tiện đo.

#### 7.4.3. Tính toán ĐKĐB kết hợp với ĐKĐB mở rộng

**ĐKĐB kết hợp:**

$$
U_c = \sqrt{u_{A1}^2 + u_{B1}^2 + u_{B2}^2} \tag{*}
$$

**ĐKĐB mở rộng:**

Độ không đảm bảo đo mở rộng (U) là đại lượng xác định miền giá trị phân bố bao quanh kết quả đo:

$$
U = k \cdot U_c
$$

Với k là hệ số bao phủ, hệ số bằng số được sử dụng như là bội của ĐKĐB chuẩn kết hợp để đưa ra độ không đảm bảo đo mở rộng, thường được chọn k = 2 với mức tin cậy xấp xỉ 95%.

[^uc]: (*) Công thức ĐKĐB kết hợp trong bản gốc được viết là "Uc = √(UA + UB1 + UB2)" — không có dấu mũ bình phương trên từng số hạng trong căn. Theo nguyên tắc GUM chuẩn (tổng phương sai các thành phần độc lập), công thức đúng phải là căn bậc hai của tổng bình phương từng thành phần, như thể hiện ở trên. Bản chuyển đổi trình bày dạng có bình phương (chuẩn GUM) và ghi chú lại cách viết thiếu dấu mũ của bản gốc tại đây; không loại trừ khả năng đây chỉ là lỗi trình bày công thức khi soạn thảo/trích xuất từ bản gốc, không phải sai về bản chất phương pháp.

## 8. Xử lý chung

**8.1.** Phương tiện đo lưu lượng khí thải trong ống khói sau khi hiệu chuẩn được dán tem, cấp giấy chứng nhận hiệu chuẩn có chứa các thông tin về kết quả hiệu chuẩn kèm theo độ không đảm bảo đo tương ứng.

**8.2.** Chu kỳ hiệu chuẩn của phương tiện đo lưu lượng khí thải trong ống khói được khuyến nghị: tối đa 01 lần/năm.

## PHỤ LỤC

(Chi tiết theo `ETV.MCF.F 04.01`[^f0401])

[^f0401]: Nguyên văn bản gốc ghi mã biểu mẫu phụ lục là "ETV.MCF.F 04.01" — trùng với mã biểu mẫu của `ETV.MCF 04` (Phương tiện đo lưu lượng khí thải), không phải "ETV.MCF.F 14.01" như lẽ ra phải tương ứng với mã quy trình hiện tại (`ETV.MCF 14`). Nhiều khả năng là lỗi sao chép từ mẫu tài liệu MCF04 khi soạn thảo. Giữ nguyên văn, không tự sửa.
