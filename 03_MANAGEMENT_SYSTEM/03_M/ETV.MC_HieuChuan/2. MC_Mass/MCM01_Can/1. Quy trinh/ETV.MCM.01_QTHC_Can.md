---
id: ETV.MCM 01
title: "Cân phân tích và cân kỹ thuật — Quy trình hiệu chuẩn"
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
revision: "04"
status: Da-ban-hanh
keywords: [cân phân tích, cân kỹ thuật, quả cân chuẩn, tải trọng lệch tâm, độ nhạy, OIML R76, hiệu chuẩn]
related_documents: ["ETV.MCM.F 01.01"]
iso_clause: ["ISO/IEC 17025:2017"]
legal_basis: ["ĐLVN 131:2003", "ĐLVN 16:2021", "OIML R76"]
ai_tags: [calibration-procedure, balance, mass-metrology, eccentric-load, sensitivity-drift, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCM 01_Can_V9.pdf`"
supersedes: "ETV.MCM 01 lần ban hành 02 (22/04/2023)"
superseded_by: null
---
# CÂN PHÂN TÍCH VÀ CÂN KỸ THUẬT – QUY TRÌNH HIỆU CHUẨN

*Analytical and Technical Balance – Calibration procedure*

|                   |                     |
| ----------------- | ------------------- |
| **Mã số**         | ETV.MCM 01          |
| **Lần ban hành**  | 04                  |
| **Ngày ban hành** | 22/04/2026          |
| **Biên soạn**     | *(bản gốc để trống)* |
| **Soát xét**      | Trần Thị Hoa        |
| **Phê duyệt**     | Nguyễn Hoàng Giang  |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCM 01_Can_V9.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khối chữ ký trong bản gốc **để trống**, chưa có tên người biên soạn. Khi có khác biệt, bản PDF do Viện ban hành là bản có giá trị áp dụng.
>
> *Ghi chú của bản chuyển đổi:* bảng "Những thay đổi đã có" nhảy trực tiếp từ lần ban hành **02** (22/04/2023) sang lần **04** (22/04/2026) — không có dòng lần 03 trong bản gốc; hình vẽ vị trí đặt quả cân (tải trọng lệch tâm) trong Phụ lục là hình ảnh, không tái tạo trong bản Markdown.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian  | Nội dung thay đổi                     | Lần ban hành |
| ---------- | -------------------------------------- | ------------ |
| 22/04/2019 | Ban hành lần thứ nhất                  | 01           |
| 18/09/2019 | Chỉnh sửa theo góp ý của BoA           | 01           |
| 22/04/2023 | Ban hành lần 3 (góp ý của BoA) [^lan3] | 02           |
| 22/04/2026 | Ban hành lần 4                         | 04           |

[^lan3]: Bản gốc ghi nội dung "Ban hành lần 3" nhưng cột Lần ban hành ghi "02" — giữ nguyên văn, có khả năng là lỗi đánh số của bản gốc.

---

## 1. Phạm vi áp dụng

Quy trình này quy định quy trình kỹ thuật hiệu chuẩn cân phân tích cấp chính xác 1 và cân kỹ thuật cấp chính xác 2 được phân cấp theo khuyến nghị OIML R76, phù hợp với các Tiêu chuẩn Việt Nam và đảm bảo các yêu cầu kỹ thuật cho loại cân tương ứng theo các văn bản kỹ thuật đo lường Việt Nam.

Quy trình này áp dụng đối với nhân viên của Viện Kiểm định Công nghệ và Môi trường (sau đây gọi tắt là PTN) khi hiệu chuẩn PTĐ nói trên.

## 2. Giải thích từ ngữ

### 2.1. Giải thích từ ngữ

Các từ ngữ trong văn bản này được hiểu như sau:

1. **Cân phân tích, cân kỹ thuật:**
   - Cân phân tích: là các cân không tự động, cấp chính xác đặc biệt (cấp chính xác I);
   - Cân kỹ thuật: là các cân không tự động, cấp chính xác cao (cấp chính xác II).
2. **Phép so sánh:** phép đo trên cơ sở so sánh giữa giá trị của đại lượng cần đo và giá trị của một đại lượng đã biết. Phép so sánh khối lượng là phép đo chênh lệch khối lượng giữa vật cân với khối lượng của quả cân chuẩn đã biết trước.
3. **Khối lượng riêng (ρ) của quả cân:** tỉ số giữa khối lượng (m) của quả cân chia cho thể tích (V) của nó:

   $$
   \rho = \frac{m}{V}
   $$

4. **Khối lượng quy ước:** khối lượng quy ước của một vật là khối lượng của một vật quy ước có khối lượng riêng 8.000 kg/m³ cân bằng với vật đó trong không khí ở nhiệt độ 20 °C với khối lượng riêng của không khí là 1,2 kg/m³.
5. **Quả cân chuẩn:** quả cân được dùng để tái tạo hoặc cung cấp một giá trị khối lượng đã biết.
6. **Hiệu chuẩn:** là hoạt động, trong những điều kiện quy định, bước thứ nhất là thiết lập mối liên hệ giữa các giá trị đại lượng có độ không đảm bảo đo do chuẩn đo lường cung cấp và các số chỉ tương ứng với độ không đảm bảo đo kèm theo, bước thứ hai là sử dụng thông tin này để thiết lập mối liên hệ nhận được kết quả đo từ số chỉ.

   > **Chú thích:**
   > - Hiệu chuẩn có thể diễn tả bằng một tuyên bố, hàm hiệu chuẩn, biểu đồ hiệu chuẩn, đường cong hiệu chuẩn, hoặc bảng hiệu chuẩn. Trong một số trường hợp nó có thể bao gồm sự hiệu chính cộng hoặc nhân của số chỉ với độ không đảm bảo đo kèm theo.
   > - Không được nhầm lẫn hiệu chuẩn với hiệu chỉnh hệ thống đo, thường gọi sai là "tự hiệu chuẩn", cũng không được nhầm lẫn với kiểm định của hiệu chuẩn.
   > - Thông thường bước đầu tiên trong định nghĩa trên được hiểu là hiệu chuẩn.

7. **Hiệu chỉnh:** là tập hợp các thao tác được tiến hành trên hệ thống đo để cho ra số chỉ đã quy định tương ứng với giá trị đã cho của đại lượng được đo.
8. **Độ không đảm bảo đo (ĐKĐB):** thông số gắn với kết quả của phép đo, đặc trưng cho sự phân tán của các giá trị có thể quy cho đại lượng đo một cách hợp lý.

   > **Chú thích:**
   > - Thông số có thể là độ lệch chuẩn (hoặc bội của nó), hoặc là 1/2 của khoảng với mức tin cậy xác định.
   > - Nói chung, ĐKĐB gồm nhiều thành phần. Một số thành phần có thể được đánh giá bằng phân bố thống kê các kết quả của một dãy phép đo và có thể được đặc trưng bằng độ lệch chuẩn, được đánh giá từ các phân bố xác suất mô phỏng trên cơ sở thực nghiệm hoặc thông tin khác.
   > - Kết quả đo được hiểu là ước lượng tốt nhất về giá trị của đại lượng đo và tất cả các thành phần của ĐKĐB, bao gồm cả những thành phần do các ảnh hưởng hệ thống như các thành phần gắn với những sự hiệu chỉnh và gắn với các chuẩn quy chiếu gây ra, đều góp phần vào độ phân tán.

9. **Đơn vị tính:** mg, g.

### 2.2. Ký hiệu

| Ký hiệu | Ý nghĩa |
| --- | --- |
| `E`    | Độ lệch khỏi giá trị danh định của quả cân chuẩn |
| `Max`  | Mức cân lớn nhất |
| `Min`  | Mức cân nhỏ nhất |
| `I`    | Giá trị chỉ thị của cân |
| `U_j`  | Độ không đảm bảo đo của quả cân chuẩn |
| `C`    | Độ chênh lệch giữa các mức cân |
| `d`    | Giá trị độ chia nhỏ nhất của cân chuẩn |

## 3. Các phép hiệu chuẩn

Phải lần lượt tiến hành các phép kiểm tra ghi trong Bảng 1.

**Bảng 1.**

| TT  | Tên phép hiệu chuẩn                                    | Theo điều, mục của quy trình |
| --- | ------------------------------------------------------- | ----------------------------- |
| 1   | Kiểm tra bên ngoài                                      | Điều 7.1                      |
| 2   | Kiểm tra kỹ thuật                                       | Điều 7.2                      |
| 3   | Kiểm tra đo lường — tải trọng lệch tâm; độ lặp lại      | Điều 7.3                      |
| 4   | Tính toán độ không đảm bảo đo                           | Điều 7.4                      |
| 5   | Xử lý chung                                             | 8                              |

## 4. Phương tiện hiệu chuẩn

| TT  | Phương tiện hiệu chuẩn                                          | Đặc trưng kỹ thuật                                                                                     |
| --- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 1   | **Chuẩn đo lường**                                                 |                                                                                                         |
|     | Bộ quả cân chuẩn (ưu tiên sử dụng quả cân 2 không sao)             | - Phải có khối lượng danh định phù hợp với các mức cân cần hiệu chuẩn<br>- Phải được liên kết chuẩn với cấp cao hơn và còn hiệu lực hiệu chuẩn<br>- Phải có sai số không lớn hơn 1/3 sai số cho phép lớn nhất của cân tại mức cân kiểm tra |
| 2   | **Phương tiện đo khác**                                            |                                                                                                         |
| 2.1 | PTĐ nhiệt độ và độ ẩm môi trường                                   | - Dải đo: Nhiệt độ (0 ÷ 50) °C; Độ ẩm không khí (25 ÷ 95) %RH<br>- Độ phân giải: Nhiệt độ 1 °C; Độ ẩm 1 %RH |
| 2.2 | Thiết bị đo áp suất (Barometer)                                    | - Độ chính xác ± 2,0 hPa                                                                                |
| 3   | **Phương tiện phụ**                                                |                                                                                                         |
| 3.1 | Panh                                                               |                                                                                                         |
| 3.2 | Đĩa                                                                | Là các dụng cụ chuyên dùng, không được tạo ra vết xước, vết bẩn hoặc bám bụi, bám các vật lạ lên bề mặt quả cân chuẩn, đĩa cân… |
| 3.3 | Khay đựng quả cân                                                  |                                                                                                         |

## 5. Điều kiện hiệu chuẩn

Khi tiến hành hiệu chuẩn phải đảm bảo các điều kiện sau đây:

- Nhiệt độ môi trường không khí (t °C) nơi tiến hành hiệu chuẩn phải đảm bảo nằm trong khoảng giới hạn nhiệt độ làm việc của cân được nhà sản xuất quy định. Biến động nhiệt độ trong phòng cần nằm trong giới hạn:
  - ± 2 °C đối với cân cấp chính xác 1;
  - ± 5 °C đối với cân cấp chính xác 2.
- Độ ẩm tương đối của không khí (%RH) nơi tiến hành hiệu chuẩn phải đảm bảo nằm trong giới hạn: (40 ÷ 70) %RH.
- Phòng hiệu chuẩn phải sạch sẽ, đủ sáng. Xa các nguồn sinh gió, nhiệt, các nguồn tạo rung động, điện từ trường…
- Bàn đặt cân phải đảm bảo độ nằm ngang, vững chắc, đặt nơi tránh gió lùa.

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành kiểm định phải thực hiện các công việc chuẩn bị sau đây:

- Làm sạch vị trí đặt cân, bên trong và bên ngoài buồng cân;
- Kiểm tra độ thăng bằng, nếu thấy cần thiết điều chỉnh lại cho cân ngay ngắn, cân bằng;
- Bật nguồn để sấy máy đối với cân điện tử tối thiểu 30 phút hoặc theo yêu cầu của nhà sản xuất;
- Mở cửa buồng cân để cân bằng nhiệt độ giữa không gian bên trong và bên ngoài;
- Đặt các quả cân chuẩn cạnh cân cần hiệu chuẩn, ổn định nhiệt độ đối với các quả cân chuẩn trong thời gian không nhỏ hơn giá trị quy định trong Bảng 2.

**Bảng 2. Thời gian ổn định nhiệt độ theo cấp chính xác của quả cân**

| Khối lượng danh nghĩa của quả cân | E2 — 20°C | E2 — 5°C | E2 — 2°C | E2 — 0,5°C | F1 — 20°C | F1 — 5°C | F1 — 2°C | F1 — 0,5°C | F2 — 20°C | F2 — 5°C | F2 — 2°C | F2 — 0,5°C |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1.000 kg          | –  | 40 | 16 | 1   | 79 | 1 | 1 | – | 5 | 1 | 0,5 | – |
| 100, 200, 500 kg  | 70 | 40 | 16 | 1   | 33 | 2 | 1 | 0,5 | 4 | 1 | 0,5 | 0,5 |
| 10, 20, 50 kg     | 27 | 18 | 10 | 1   | 12 | 4 | 1 | 0,5 | 3 | 1 | 0,5 | 0,5 |
| 1, 2, 5 kg        | 12 | 8  | 5  | 1   | 6  | 3 | 1 | 0,5 | 2 | 1 | 0,5 | 0,5 |
| 100, 200, 500 g   | 5  | 4  | 3  | 1   | 3  | 2 | 1 | 0,5 | 1 | 0,5 | 0,5 | 0,5 |
| 10, 20, 50 g      | 2  | 1  | 1  | 0,5 | 1  | 1 | 1 | 0,5 | 1 | 0,5 | 0,5 | 0,5 |
| < 10 g            | 1  | 0,5| 0,5| 0,5 | 1  | 0,5 | 0,5 | 0,5 | 0,5 | 0,5 | 0,5 | 0,5 |

*(Đơn vị: giờ. |ΔT| là chênh lệch ban đầu giữa nhiệt độ của quả cân và nhiệt độ tại nơi kiểm định.)*

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

Phải kiểm tra bên ngoài theo các yêu cầu sau đây:

- Kiểm tra tính đầy đủ của các cơ cấu, các cụm chi tiết trên cân.
- Kiểm tra yêu cầu trên nhãn hiệu phải ghi tối thiểu những đặc trưng sau: ký hiệu cân hoặc cơ sở sản xuất (nhà sản xuất hoặc nước sản xuất); cấp chính xác; mức cân lớn nhất Max; giá trị độ chia nhỏ nhất d; số cân; khoảng điện áp làm việc của thiết bị.
- Các ký hiệu, số hiệu trên nhãn hiệu cân phải rõ ràng, không được tẩy xóa.

### 7.2. Kiểm tra kỹ thuật

Phải kiểm tra kỹ thuật theo các yêu cầu sau đây:

- Kiểm tra các yêu cầu kỹ thuật đề ra trong tài liệu kỹ thuật của cân và các văn bản kỹ thuật đo lường tương ứng với cấp chính xác và loại cân cụ thể theo các thông số kỹ thuật của cân hiệu chuẩn ghi trong giấy chứng nhận hiệu chuẩn (lần trước đó) và các tài liệu kỹ thuật khác (catalog, giấy chứng nhận kiểm tra xuất xưởng… của nhà sản xuất) đi kèm. Trường hợp có nghi ngờ và được sự đồng ý của khách hàng, tiến hành thử các chỉ tiêu kỹ thuật này tại các phòng thử nghiệm được công nhận.
- Kiểm tra và ghi vào biên bản tình trạng của cân và vị trí đặt cân. Ghi rõ các điểm chưa đảm bảo yêu cầu hoặc có thể gây ra ảnh hưởng xấu tới hoạt động của cân hoặc tới kết quả hiệu chuẩn. Tuyệt đối không được hiệu chỉnh lại các sai lệch của cân tại bước kiểm tra này.
- Sau các bước kiểm tra kỹ thuật như trên, nếu phát hiện những sai lệch, hiệu chỉnh lại cho phù hợp với yêu cầu của khách hàng.

### 7.3. Kiểm tra đo lường

Cân được kiểm tra đo lường theo trình tự nội dung, phương pháp và yêu cầu sau đây:

#### 7.3.1. Tải trọng lệch tâm

- Dùng quả cân (hoặc một số quả cân) có khối lượng xấp xỉ 1/3 đến 1/2 giá trị mức cân lớn nhất của cân, lần lượt đặt lên các vị trí khác nhau của đĩa cân (bàn cân) theo thứ tự 5 vị trí: Giữa (1), rồi lần lượt 4 góc (2, 3, 4, 5) *(xem sơ đồ vị trí trong biên bản hiệu chuẩn ở Phụ lục)*.
- Quan sát chỉ thị lúc cân không tải. Nhấn Tare để trả về zero.
- Đặt một quả cân chuẩn hoặc một nhóm quả cân chuẩn có khối lượng danh định xấp xỉ 1/3 đến 1/2 giá trị mức cân lớn nhất của cân lên giữa đĩa cân (vị trí 1). Đợi giá trị chỉ thị ổn định, ghi lại kết quả vào bảng ở Biên bản Phụ lục I.
- Tiếp tục thực hiện chuyển tuần tự quả cân chuẩn (hoặc nhóm quả cân chuẩn) sang các vị trí 2, 3, 4, 5, sau đó lại đặt vào vị trí giữa đĩa cân (vị trí 1). Đợi giá trị chỉ thị ổn định, ghi lại kết quả tương ứng của các vị trí vào bảng ở Biên bản Phụ lục I.
- Tính giá trị trung bình của 02 số chỉ tại 02 lần kiểm ở vị trí Giữa (`I_TB`).
- Tính chênh lệch (C) số chỉ cân (I) ở các vị trí khác (2, 3, 4, 5) với giá trị trung bình đã tính ở trên theo công thức:

  $$
  C_{2-1} = I_2 - I_{TB} \qquad C_{3-1} = I_3 - I_{TB} \qquad C_{4-1} = I_4 - I_{TB} \qquad C_{5-1} = I_5 - I_{TB}
  $$

- Sai số góc (`E_C`) của cân được tính theo công thức:

  $$
  E_C = \max\{|C_{2-1}|; |C_{3-1}|; |C_{4-1}|; |C_{5-1}|\}
  $$

  trong đó `I_2, I_3, I_4, I_5`: số chỉ của cân tại vị trí 2, 3, 4, 5.

#### 7.3.2. Kiểm tra độ đúng

Việc kiểm tra độ lặp lại của cân phân tích và cân kỹ thuật được thực hiện bằng cách tiến hành các phép cân ít nhất với các mức cân bằng Min, 1/200 Max, 1/20 Max, 1/4 Max, 1/2 Max, 3/4 Max, Max. Nếu khách hàng yêu cầu thì số lượng điểm kiểm tra độ lặp lại sẽ được thực hiện theo yêu cầu khách hàng. Mỗi mức cân bao gồm 6 phép cân, thực hiện theo trình tự sau:

- Quan sát chỉ thị của cân lúc không tải. Nhấn Tare để trả về zero.
- Đặt một quả cân chuẩn hoặc một nhóm quả cân chuẩn có khối lượng danh định bằng Min lên giữa đĩa cân, đợi giá trị chỉ thị ổn định, ghi lại chỉ thị của cân lúc có tải vào Biên bản Phụ lục I. Lấy quả cân ra.
- Lần lượt tiến hành các phép cân liên tiếp nhau cho đến khi hoàn thành 6 lần cân. Ghi lại kết quả vào bảng ở Biên bản Phụ lục I.
- Tiếp tục tiến hành tương tự các phép cân với các mức cân còn lại, đợi giá trị chỉ thị ổn định, ghi lại chỉ thị của cân lúc có tải vào Biên bản Phụ lục I. Lấy quả cân ra.
- Lần lượt tiến hành các phép cân liên tiếp nhau cho đến khi hoàn thành 6 lần cân. Ghi lại kết quả vào bảng ở Biên bản Phụ lục I.
- Tính độ lệch chuẩn cho các giá trị cân trên với mỗi mức kiểm (j) theo công thức:

  $$
  S_j = \sqrt{\frac{\sum_{i=1}^{n}(I_i - \bar{I})^2}{n-1}} \qquad \text{với } \bar{I} = \frac{\sum_{i=1}^{n} I_i}{n}
  $$

  - `I_i`: số chỉ của cân tại lần cân thứ i (g);
  - `n`: số lần cân có tải.

- Số hiệu chính của cân tại các mức cân theo công thức sau:

  $$
  E_i = L_p - I_i
  $$

  - `I_i`: số chỉ của cân tại lần cân thứ i (g);
  - `L_p`: khối lượng danh nghĩa của quả cân chuẩn dùng làm tải kiểm tra (g).

- Số hiệu chính trung bình được xác định theo công thức:

  $$
  \bar{E} = \frac{\sum_{i=1}^{n} E_i}{n}
  $$

  với `n` là số lần cân.

### 7.4. Đánh giá độ không đảm bảo đo

**a) Xác định các yếu tố gây ra ĐKĐB tại tất cả các điểm hiệu chuẩn**

- Cân cần hiệu chuẩn: đặc tính kỹ thuật do nhà sản xuất cung cấp, số liệu đo đạc lần trước, độ nhạy, độ lặp lại, độ chênh lệch kết quả khi đặt tải lệch tâm, thời gian đáp ứng và độ phân giải của cân cần hiệu chuẩn;
- Điều kiện môi trường trong phòng đo/hiệu chuẩn (nhiệt độ, độ ẩm);
- Quả cân chuẩn;
- Nhân viên đo/hiệu chuẩn;
- Nguồn điện cấp vào thiết bị;
- Một số ảnh hưởng ngẫu nhiên khác;
- Từ tính của quả cân chuẩn;
- Độ rung.

**b) Tính toán ĐKĐB của các yếu tố ảnh hưởng**

Các yếu tố ảnh hưởng đến ĐKĐB được xác định như trên. Tuy nhiên, không phải tất cả các yếu tố ảnh hưởng đều có thể xác định được hoặc có những yếu tố ảnh hưởng không đáng kể tới ĐKĐB thì có thể xem xét và bỏ qua như: nhân viên thực hiện công tác đo/hiệu chuẩn, nguồn điện, điều kiện môi trường và một vài yếu tố ngẫu nhiên khác… ĐKĐB được tính như sau:

- **ĐKĐB của thành phần độ lặp lại:**

  $$
  u_W = \frac{S_j}{\sqrt{n}}
  $$

- **ĐKĐB do độ phân giải của cân tại mức 0:**

  $$
  u_{R0} = \frac{d_0}{2\sqrt{3}}
  $$

- **ĐKĐB do độ phân giải của cân tại mức cân đang xét:**

  $$
  u_{Ri} = \frac{d_i}{2\sqrt{3}}
  $$

  với `d_i`: giá trị độ chia của cân tương ứng với mức cân đang xét.

- **ĐKĐB của giá trị khối lượng quả cân được sử dụng:**

  $$
  u_m = \frac{\sum_{j=1}^{n} U_j}{2}
  $$

  - `U_j`: độ không đảm bảo đo của quả cân (j) được dùng (lấy theo giấy chứng nhận hiệu chuẩn đi kèm quả cân);
  - `n`: số lượng các quả cân (j) được dùng trong bước kiểm tra độ đúng tương ứng với mức cân đang xét.

- **ĐKĐB do tải trọng lệch tâm:**

  $$
  u_E = \frac{E_C}{\sqrt{3} \cdot L_{ecc}}
  $$

  với `L_ecc` là mức tải kiểm tra tải trọng lệch tâm.

- **ĐKĐB do tải trọng lệch tâm tại mức cân đang xét:**

  $$
  u_{Ei} = u_E \cdot m
  $$

  với `m`: là mức cân đang xét (mg).

- **ĐKĐB của thành phần độ nhạy của cân phân tích và cân kỹ thuật:**

  - Ở cân phân tích và cân kỹ thuật **không có** cơ cấu hiệu chuẩn (CAL MODE):

    $$
    u_N = \frac{5 \cdot N \cdot m}{\sqrt{3}}
    $$

    với `N`: độ trôi nhạy của cân (N = 4×10⁻⁶/°C); `m`: mức cân đang xét (mg).

  - Ở cân phân tích và cân kỹ thuật **có** cơ cấu hiệu chuẩn (CAL MODE):

    $$
    u_N = \frac{\Delta T \cdot N \cdot m}{\sqrt{3}}
    $$

    với `ΔT`: chênh lệch nhiệt độ thời điểm bắt đầu và kết thúc hiệu chuẩn (°C); `N`: độ trôi nhạy của cân (N = 4×10⁻⁶/°C); `m`: mức cân đang xét (mg).

**c) Tính toán ĐKĐB tổng hợp và ĐKĐB mở rộng**

**ĐKĐB tổng hợp:**

$$
u_c = \sqrt{u_W^2 + u_{R0}^2 + u_{Ri}^2 + u_m^2 + u_{Ei}^2 + u_N^2}
$$

**ĐKĐB mở rộng** — độ không đảm bảo đo mở rộng (U) là đại lượng xác định miền giá trị phân bố bao quanh kết quả đo:

$$
U = k \cdot u_c
$$

Với `k` là hệ số bao phủ, hệ số bằng số được sử dụng như là bội của ĐKĐB chuẩn kết hợp để đưa ra ĐKĐB mở rộng, thường được chọn k = 2 với mức tin cậy xấp xỉ 95 %.

## 8. Xử lý chung

- **8.1.** Cân sau khi hiệu chuẩn được dán tem, cấp giấy chứng nhận hiệu chuẩn kèm theo thông báo kết quả hiệu chuẩn.
- **8.2.** Chu kỳ hiệu chuẩn của cân được khuyến nghị tối đa là 12 tháng.

## 9. Phụ lục

Biên bản hiệu chuẩn cân phân tích và cân kỹ thuật (`ETV.MCM.F 01.01`).

---

## PHỤ LỤC — BIÊN BẢN HIỆU CHUẨN CÂN PHÂN TÍCH VÀ CÂN KỸ THUẬT (`ETV.MCM.F 01.01`)

*LIÊN HIỆP CÁC HỘI KHOA HỌC VÀ KỸ THUẬT VIỆT NAM — VIỆN KIỂM ĐỊNH CÔNG NGHỆ VÀ MÔI TRƯỜNG*

Số GCN: ………………  Số tem: ………………  Số PNT: NT…………/ETV

### I. Thông tin chung

1. Tên đối tượng: …
2. Kiểu: …  3. Số hiệu: …  4. Mã quản lý: …
5. Hãng sản xuất: …  6. Năm sản xuất: …
7. Đơn vị sử dụng: …
8. Đặc trưng kỹ thuật: Phạm vi hoạt động: … — Độ phân giải: … — Thông tin khác: …

### II. Thông tin hiệu chuẩn

1. Phương pháp hiệu chuẩn: ETV.MCM 01
2. Chuẩn sử dụng:

| Mã quản lý | Cơ sở sản xuất | Số hiệu | Diễn giải           | Hiệu lực hiệu chuẩn | Liên kết chuẩn |
| ---------- | -------------- | ------- | -------------------- | -------------------- | -------------- |
| IRM-01     | Thụy Sỹ        | 158846  | 23 quả, dãy 1:2:2:5   | 07/2025               | VMI            |
| IRM-03     | Changzhou      | 10564   | 0,5 kg                | 07/2025               | VMI            |
| IRM-04     | Changzhou      | 10565   | 1 kg                  | 09/2023               | VMI            |
| IRM-05     | Changzhou      | 10566   | 2 kg                  | 09/2023               | VMI            |

3. Điều kiện môi trường:
   - Nhiệt độ bắt đầu: …… °C — Độ ẩm bắt đầu: …… %RH
   - Nhiệt độ kết thúc: …… °C — Độ ẩm kết thúc: …… %RH
4. Địa điểm hiệu chuẩn tại: ☐ Cơ sở  ☐ PTN

### III. Kiểm tra bên ngoài

1. Kiểm tra tính đầy đủ của các cơ cấu, các cụm chi tiết trên cân.
2. Kiểm tra nhãn hiệu của cân.

### IV. Kiểm tra kỹ thuật

1. Lắp ráp, đấu nối thiết bị đo cần hiệu chuẩn: …
2. Vận hành thiết bị đo cần hiệu chuẩn: …
3. Kiểm tra trạng thái hoạt động bình thường của thiết bị đo cần hiệu chuẩn: ☐ Bình thường  ☐ Không bình thường

### V. Kiểm tra đo lường

**4.1. Kiểm tra trước hiệu chuẩn**

| TT | Trước hiệu chỉnh — Giá trị chuẩn (g) | Trước hiệu chỉnh — Giá trị chỉ thị (g) | Sau hiệu chỉnh — Giá trị chuẩn (g) | Sau hiệu chỉnh — Giá trị chỉ thị (g) |
| -- | --- | --- | --- | --- |
| 1  |  |  |  |  |
| 2  |  |  |  |  |
| 3  |  |  |  |  |
| 4  |  |  |  |  |
| 5  |  |  |  |  |

Tiến hành hiệu chỉnh thiết bị: ☐ Có  ☐ Không

**4.2. Tải trọng lệch tâm**

Vị trí đặt quả cân: *(sơ đồ 5 vị trí — Giữa (1), 4 góc (2, 3, 4, 5) — là hình vẽ trong bản gốc, không tái tạo ở đây)*

| Khối lượng danh định (g) | I₁ | I₂ | I₃ | I₄ | I₅ | I₁ |
| --- | --- | --- | --- | --- | --- | --- |
| P = |  |  |  |  |  |  |

**4.3. Độ đúng**

| Khối lượng danh định (g) | Lần 1 | Lần 2 | Lần 3 | Lần 4 | Lần 5 | Lần 6 |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |

…………………, ngày …… tháng …… năm 20…

Người kiểm tra — Người thực hiện

---

## TÀI LIỆU THAM KHẢO

- **ISO/IEC 17025:2017** — Yêu cầu chung về năng lực của phòng thử nghiệm và hiệu chuẩn;
- **ĐLVN 131:2003** — Hướng dẫn đánh giá độ không đảm bảo đo;
- **ĐLVN 16:2021** — Cân phân tích và cân kỹ thuật - Quy trình kiểm định;
- Hướng dẫn sử dụng thiết bị.
