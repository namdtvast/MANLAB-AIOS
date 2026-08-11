---
id: ETV.MCO 04
title: "Phương tiện đo hàm lượng bụi trong khí thải — Quy trình hiệu chuẩn"
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
keywords: [bụi khí thải, particulate matter, isokinetic, giấy lọc, aceton, đẳng động lực, Opacity, hiệu chuẩn]
related_documents: ["ETV.MCO 04.01"]
iso_clause: ["ISO/IEC 17025:2017"]
legal_basis: ["Thông tư 24/2017/TT-BTNMT"]
ai_tags: [calibration-procedure, stack-emission, particulate-matter, isokinetic-sampling, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCO 04_Bui trong khi thai_V1.pdf`"
supersedes: "ETV.MCO 04 lần ban hành 01 (19/05/2020)"
superseded_by: null
---
# PHƯƠNG TIỆN ĐO HÀM LƯỢNG BỤI TRONG KHÍ THẢI – QUY TRÌNH HIỆU CHUẨN

*Particulate matter emissions – Calibration Procedure*

|                   |                     |
| ----------------- | ------------------- |
| **Mã số**         | ETV.MCO 04          |
| **Lần ban hành**  | 02                  |
| **Ngày ban hành** | 22/04/2026          |
| **Biên soạn**     | *(bản gốc để trống)* |
| **Soát xét**      | Trần Thị Hoa        |
| **Phê duyệt**     | Nguyễn Hoàng Giang  |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCO 04_Bui trong khi thai_V1.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khối chữ ký trong bản gốc **để trống**, chưa có tên người biên soạn.
>
> *Ghi chú của bản chuyển đổi:* các công thức tính toán ở mục 7.3.2.b.3 (nồng độ axeton, lượng axeton, tổng khối lượng bụi, giá trị isokinetic — công thức 5.2 đến 5.5) và sơ đồ lắp ráp hệ thống lấy mẫu ở mục 6.2 là hình ảnh trong bản gốc, không trích xuất được thành text — chỉ giữ tiêu đề công thức và bảng chú giải ký hiệu đầy đủ; tham khảo bản PDF gốc để xem công thức và sơ đồ. Khi có khác biệt, bản PDF do Viện ban hành là bản có giá trị áp dụng.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian  | Nội dung thay đổi     | Lần ban hành |
| ---------- | --------------------- | ------------ |
| 19/05/2020 | Làm rõ tên quy trình  | 01           |
| 22/04/2026 | Ban hành lần 2        | 02           |

---

## 1. Phạm vi và đối tượng áp dụng

Quy trình này quy định quy trình kỹ thuật hiệu chuẩn phương tiện đo hàm lượng bụi trong khí thải sử dụng phương pháp quang học, phương pháp trọng lượng, bao gồm thiết bị đo cầm tay và tự động, liên tục, cụ thể:

| TT  | Phương tiện đo       | Phạm vi đo                                | Độ chính xác |
| --- | --------------------- | ------------------------------------------- | ------------- |
| 1   | Bụi trong khí thải    | (0 ÷ 10.000) mg/m³ hoặc (0 ÷ 100) % ⁽*⁾      | ± 8 %         |

⁽*⁾ %: được tính theo Opacity.

Quy trình này áp dụng đối với nhân viên của Viện Kiểm định Công nghệ và Môi trường khi sử dụng PTĐ nói trên.

## 2. Thuật ngữ và định nghĩa

Trong quy trình này các từ ngữ sau đây được hiểu như sau:

1. **Phương tiện đo (PTĐ):** là thiết bị được dùng độc lập hoặc kết hợp với thiết bị phụ để thực hiện phép đo.
2. **Hiệu chuẩn:** là hoạt động, trong những điều kiện quy định, bước thứ nhất là thiết lập mối liên hệ giữa các giá trị đại lượng có độ không đảm bảo đo do chuẩn đo lường cung cấp và các số chỉ tương ứng với độ không đảm bảo đo kèm theo, bước thứ hai là sử dụng thông tin này thiết lập mối liên hệ để nhận được kết quả đo từ số chỉ.

   > **Chú thích:**
   > - Hiệu chuẩn có thể diễn tả bằng một tuyên bố, hàm hiệu chuẩn, biểu đồ hiệu chuẩn, đường cong hiệu chuẩn, hoặc bảng hiệu chuẩn. Trong một số trường hợp nó có thể bao gồm sự hiệu chính cộng hoặc nhân của số chỉ với độ không đảm bảo đo kèm theo.
   > - Không được nhầm lẫn hiệu chuẩn với hiệu chỉnh hệ thống đo, thường gọi sai là "tự hiệu chuẩn", cũng không được nhầm lẫn với kiểm định của hiệu chuẩn.
   > - Thông thường bước đầu tiên trong định nghĩa trên được hiểu là hiệu chuẩn.

3. **Hiệu chỉnh:** là tập hợp các thao tác được tiến hành trên hệ thống đo để cho ra số chỉ đã quy định tương ứng với giá trị đã cho của đại lượng được đo.
4. **Độ không đảm bảo đo (ĐKĐB):** thông số gắn với kết quả của phép đo, đặc trưng cho sự phân tán của các giá trị có thể quy cho đại lượng đo một cách hợp lý.

   > **Chú thích:**
   > - Thông số có thể là độ lệch chuẩn (hoặc bội của nó), hoặc là 1/2 của khoảng với mức tin cậy xác định.
   > - Nói chung, ĐKĐB gồm nhiều thành phần. Một số thành phần có thể được đánh giá bằng phân bố thống kê các kết quả của một dãy phép đo và có thể được đặc trưng bằng độ lệch chuẩn, được đánh giá từ các phân bố xác suất mô phỏng trên cơ sở thực nghiệm hoặc thông tin khác.
   > - Kết quả đo được hiểu là ước lượng tốt nhất về giá trị của đại lượng đo và tất cả các thành phần của ĐKĐB, bao gồm cả những thành phần do các ảnh hưởng hệ thống như các thành phần gắn với những sự hiệu chỉnh và gắn với các chuẩn quy chiếu gây ra, đều góp phần vào độ phân tán.

5. **Độ đúng:** là mức độ gần nhau giữa trung bình của một số vô hạn các giá trị đại lượng đo được lặp lại và giá trị đại lượng quy chiếu.

   > **Chú thích:**
   > - Độ đúng đo không phải là đại lượng và do đó không thể thể hiện bằng số, nhưng thước đo mức độ gần nhau được cho trong TCVN 6910.
   > - Độ đúng đo tỉ lệ nghịch với sai số đo hệ thống, nhưng không liên quan với sai số đo ngẫu nhiên.
   > - Không được sử dụng độ chính xác đo cho "độ đúng đo" và ngược lại.

6. **Độ chính xác:** là mức độ gần nhau giữa giá trị đại lượng đo được và giá trị đại lượng thực của đại lượng đo.

   > **Chú thích:**
   > - Khái niệm "độ chính xác đo" không phải là đại lượng và không cho biết trị số đại lượng. Phép đo được xem là chính xác hơn khi có sai số đo nhỏ hơn.
   > - Thuật ngữ "độ chính xác đo" không được sử dụng cho độ đúng đo, và thuật ngữ độ chụm đo không được sử dụng cho "độ chính xác đo", tuy nhiên nó có liên quan với cả hai khái niệm này.
   > - Độ chính xác đo đôi khi được hiểu là mức độ gần nhau giữa các giá trị đại lượng đo được đang quy cho đại lượng đo.

7. **Độ trôi:** là sự thay đổi từ từ đặc trưng đo lường của PTĐ.
8. **Đơn vị tính:** mg/m³, %.
9. **Từ ngữ viết tắt:** **PM** (*Particulate matter*): hàm lượng hạt bụi.

## 3. Các phép hiệu chuẩn

Phải lần lượt tiến hành các phép hiệu chuẩn ghi trong Bảng 1.

**Bảng 1**

| TT  | Tên phép hiệu chuẩn           | Theo điều, mục của quy trình |
| --- | -------------------------------- | ----------------------------- |
| 1   | Kiểm tra bên ngoài               | 7.1                            |
| 2   | Kiểm tra kỹ thuật                 | 7.2                            |
| 3   | Kiểm tra đo lường                 | 7.3                            |
|     | — Kiểm tra sai số                 | 7.3.1                          |
|     | — Kiểm tra độ lặp lại             | 7.3.2                          |
| 4   | Tính toán độ không đảm bảo đo     | 7.4                            |
| 5   | Xử lý chung                       | 8                               |

## 4. Phương tiện phục vụ hiệu chuẩn

Phương tiện hiệu chuẩn được ghi trong Bảng 2.

**Bảng 2**

| TT  | Tên phương tiện hiệu chuẩn                | Đặc trưng kỹ thuật đo lường cơ bản                                                                       |
| --- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 1   | **Chuẩn đo lường**                           | Các chuẩn đo lường phải được liên kết chuẩn theo quy định và độ không đảm bảo đo của tổ hợp chuẩn so với phương tiện đo hàm lượng bụi phải thỏa mãn tỉ số truyền chuẩn ≤ 1/1,5 |
| 1.1 | Chuẩn lưu lượng                              | - Lưu lượng bơm (max 2,5 m³/h; U = 0,056 m³/h)<br>- Nhiệt độ (max 1.200 °C; U = 3,4 °C)<br>- Chênh áp (max 250 mmH₂O; U = 1,3 %) |
| 1.2 | Cân phân tích                                | - Phạm vi đo (0 ÷ 50) g, độ phân giải đến 0,1 mg                                                          |
| 2   | **Phương tiện khác**                         |                                                                                                           |
| 2.1 | Phương tiện đo nhiệt độ, độ ẩm môi trường    | - Nhiệt độ: (0 ÷ 50) °C, giá trị độ chia 1 °C; Độ ẩm: (25 ÷ 95) %RH, giá trị độ chia 1 %RH                |
| 2.2 | Tủ sấy                                       | - Phạm vi đo (40 ÷ 250) °C, độ chính xác 2 °C                                                             |
| 3   | **Phương tiện phụ**                          |                                                                                                           |
| 3.1 | Mẫu "không"                                  | Không khí sạch chứa thành phần bụi có hàm lượng nhỏ hơn giới hạn mà phương tiện đo có thể phát hiện được  |

## 5. Điều kiện hiệu chuẩn

Phòng hiệu chuẩn phải đảm bảo các điều kiện sau:

- Nhiệt độ: (25 ± 5) °C;
- Độ ẩm tương đối: ≤ 80 %RH (không đọng sương);
- Điện áp nguồn cấp chính: 220 VAC ± 10 V;
- Hoặc thực hiện theo điều kiện môi trường tại hiện trường.

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành hiệu chuẩn phải thực hiện các công việc chuẩn bị sau đây:

### 6.1. Công tác chuẩn bị trước khi ra hiện trường

- **a)** Kiểm tra giấy lọc: bằng cách kiểm tra ngược sáng những chỗ không đều, vết rạn nứt hay những lỗ thủng nhỏ. Dán nhãn hoặc đánh số các giấy lọc tại mặt sau gần mép hoặc có thể dán nhãn vào các hộp/thùng chứa (các đĩa petri bằng thủy tinh hoặc polyethylene) và giữ mỗi một giấy lọc riêng trong từng hộp/thùng.
- **b)** Sấy giấy lọc đến khối lượng không đổi và tiến hành cân (sử dụng cân phân tích). Chênh lệch tối đa giữa các lần cân không quá 0,5 mg. Ghi lại giá trị ổn định nhất. Trong mỗi lần cân, khoảng thời gian giấy lọc tiếp xúc với không khí trong phòng thí nghiệm tối đa là 2 phút.
- **c)** Xác định vị trí lấy mẫu, số lượng điểm hút mẫu, áp suất ống khói, nhiệt độ và áp suất động, hàm ẩm theo quy định tại Phụ lục 01, 02, 03 và 04 ban hành kèm theo Thông tư 24/2017/TT-BTNMT. Ngoài ra, kiểm tra rò rỉ của ống pitot và xác định tỷ lệ lấy mẫu isokinetic.
- **d)** Lựa chọn kích thước đầu hút: căn cứ vào vận tốc của dòng khí để lựa chọn đầu hút mẫu thích hợp.
- **e)** Cần lấy mẫu phải có độ dài phù hợp, có thể hút mẫu tại tất cả các điểm hút mẫu đã được xác định theo quy định tại Phụ lục 01 ban hành kèm theo Thông tư 24/2017/TT-BTNMT.

### 6.2. Công tác chuẩn bị tại hiện trường

- **a)** Cho 100 mL nước vào 2 ống impinger thứ 1 và 2, ống impinger thứ 3 để rỗng và cho khoảng (200 ÷ 300) g silicagel vào ống impinger thứ 4. Sử dụng cân kỹ thuật cân trọng lượng của silicagel trong ống impinger, có thể được cân với chênh lệch không quá 0,5 g. Ghi lại kết quả cân ban đầu.
- **b)** Sử dụng panh hoặc găng tay sạch đặt giấy lọc vào cặp giấy lọc. Kiểm tra các vết rách, hở của giấy lọc sau khi lắp đặt xong.
- **c)** Đánh dấu vị trí của từng điểm hút mẫu trong ống khói đã được xác định trên cần lấy mẫu bằng mực chịu nhiệt hoặc băng dính chịu nhiệt.
- **d)** Lắp ráp hệ thống lấy mẫu *(sơ đồ hệ thống trong bản gốc là hình ảnh, không tái tạo ở đây)* và kiểm tra độ kín của hệ thống sau khi lắp ráp như hướng dẫn tại Phụ lục 02 ban hành kèm theo Thông tư 24/2017/TT-BTNMT.
- **đ)** Cho đá lạnh và nước xung quanh bình hệ thống impinger.
- **e)** Sau khi lắp xong hệ thống lấy mẫu, bật hệ thống gia nhiệt cần lấy mẫu và giấy lọc, chờ cho nhiệt độ ổn định. Nếu vòng đệm viton được sử dụng để lắp ráp đầu lấy mẫu vào cần lấy mẫu, kiểm tra độ kín tại vị trí này và áp suất chân không khoảng 380 mmHg.

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

Phải kiểm tra bên ngoài theo các yêu cầu sau đây:

Kiểm tra bằng mắt để xác định sự phù hợp của phương tiện cần hiệu chuẩn với các yêu cầu quy định trong tài liệu kỹ thuật về hình dáng, kích thước, hiển thị, nguồn điện sử dụng, nhãn hiệu và phụ kiện kèm theo.

### 7.2. Kiểm tra kỹ thuật

Kiểm tra trạng thái hoạt động của phương tiện cần hiệu chuẩn theo tài liệu kỹ thuật.

### 7.3. Kiểm tra đo lường

#### 7.3.1. Kiểm tra lưu lượng (đối với thiết bị có ống hút mẫu)

##### 7.3.1.1. Đo kiểm tra trước hiệu chuẩn

Lắp máy đầu hút lưu lượng của thiết bị cần hiệu chuẩn với thiết bị đo lưu lượng chuẩn, bật sấy 3 phút. Tiến hành đo kiểm tra lưu lượng không khí, chờ giá trị chỉ thị ổn định. Ghi lại kết quả vào biên bản Phụ lục I.

##### 7.3.1.2. Đo kiểm tra sau hiệu chuẩn

**a) Kiểm tra độ chính xác**

- Kết nối thiết bị đo lưu lượng không khí với đầu hút mẫu của PTĐ cần hiệu chuẩn.
- Tiến hành đo 3 lần liên tiếp. Ghi kết quả vào biên bản hiệu chuẩn ở Phụ lục 1.
- Sai lệch giữa giá trị lưu lượng danh định và giá trị lưu lượng đo được của PTĐ cần hiệu chuẩn không lớn hơn ± 5 %.

#### 7.3.2. Đo hàm lượng bụi

**a) Kiểm tra độ chính xác** *(thực hiện đối với thiết bị có hệ thống chuẩn bằng filter)*

Thực hiện kiểm tra độ chính xác đối với 2 điểm bằng kính chuẩn, đo ít nhất 6 phép đo liên tiếp tại mỗi điểm. Đợi kết quả của máy đo ổn định, ghi lại giá trị đo được vào biên bản Phụ lục I.

**b) Kiểm tra độ lặp lại**

***b.1) Lấy mẫu***

1. Trong suốt quá trình lấy mẫu, duy trì điều kiện lấy mẫu đẳng động lực (trong khoảng 10 % của vận tốc đẳng động lực) và nhiệt độ xung quanh giấy lọc vào khoảng 120 ± 14 °C.
2. Làm sạch các lỗ hút mẫu trước khi chạy thử để làm giảm tối đa ảnh hưởng của vật liệu, bụi bẩn đến đầu hút mẫu. Trước khi bắt đầu lấy mẫu, kiểm tra lại toàn bộ thiết bị lấy mẫu. Đưa đầu hút mẫu vào dòng khí theo phương vuông góc với dòng khí. Bật bơm và điều chỉnh lưu lượng cho điều kiện lấy mẫu đẳng động lực (tính toán phần trăm lấy mẫu đẳng động lực 90 % ≤ I ≤ 110 %).
3. Tiến hành với tất cả các điểm hút mẫu đã tính toán theo hướng dẫn tại Phụ lục 01 ban hành kèm theo Thông tư 24/2017/TT-BTNMT.
4. Kết thúc quá trình lấy mẫu: đưa đầu lấy mẫu ra khỏi dòng khí, để một thời gian cho đầu lấy mẫu nguội và bắt đầu thu mẫu. Trước khi tháo rời các thiết bị, cần sử dụng giấy bạc bịt kín đầu lấy mẫu nhằm tránh việc mất hoặc thêm bụi. Lau sạch tất cả bụi bên ngoài cần lấy mẫu và bộ phận xung quanh. Tháo bộ phận chứa giấy lọc, lấy giấy lọc cho vào hộp bảo quản hoặc đĩa petri có bịt kín bằng băng paraphin, mỗi mẫu được ký hiệu riêng.
5. Thu toàn bộ bụi, chất rắn đọng ở mặt trong của các bộ phận của thiết bị (như đầu lấy mẫu, cần lấy mẫu, bộ phận chứa giấy lọc) bằng các phương pháp như siêu âm, dung môi hữu cơ (aceton) và dùng chổi chuyên dụng chải sạch. Chuyển chất lỏng đã rửa vào cốc đã cân khối lượng. Toàn bộ lượng chất lỏng này sẽ được bảo quản, mỗi mẫu được ký hiệu riêng.

***b.2) Bảo quản và vận chuyển mẫu***

Giấy lọc và lượng chất lỏng thu được sau khi rửa các bộ phận của thiết bị đo được vận chuyển về phòng thí nghiệm, tiến hành cân trong điều kiện tương tự nhau.

***b.3) Tính toán kết quả***

1. **Thể tích khí khô:** quy đổi thể tích mẫu đo được bằng đồng hồ đo khí về điều kiện chuẩn (25 °C, 760 mmHg). *(công thức là hình ảnh trong bản gốc)*
2. **Nồng độ axeton.** *(công thức 5.2, là hình ảnh trong bản gốc)*
3. **Lượng axeton đã rửa.** *(công thức 5.3, là hình ảnh trong bản gốc)*
4. **Tổng khối lượng bụi:** bao gồm trên giấy lọc và trong dung dịch aceton dùng để rửa thiết bị. *(công thức 5.4, là hình ảnh trong bản gốc)*
5. **Giá trị isokinetic:**
   - Tính từ giá trị thô *(công thức 5.5, là hình ảnh trong bản gốc)*
   - Tính từ giá trị trung gian *(hình ảnh trong bản gốc)*
   - Kết quả: 90 % ≤ I ≤ 110 %, kết quả được chấp nhận.

**Chú giải ký hiệu dùng trong các công thức tính toán:**

| Ký hiệu | Ý nghĩa |
| --- | --- |
| `A_n`      | Tiết diện ngang của vòi lấy mẫu, m² |
| `B_ws`     | Hơi nước trong khí thải, % thể tích |
| `C_a`      | Lượng aceton còn lại (mg/mg) |
| `C_S`      | Hàm lượng bụi trong ống khói, theo khí khô, ở điều kiện tiêu chuẩn (g/Nm³) |
| `I`        | Phần trăm lấy mẫu đẳng động lực |
| `m_a`      | Khối lượng bụi trong nước rửa aceton sau khi làm khô (mg) |
| `m_n`      | Tổng bụi thu được, mg |
| `P_bar`    | Áp suất khí quyển tại điểm hút mẫu, mmHg |
| `P_s`      | Áp suất tuyệt đối của khí ống khói, mmHg |
| `P_std`    | Áp suất tại điều kiện tiêu chuẩn 25 °C, 760 mmHg |
| `R`        | Hằng số khí lý tưởng 0,06236 [(mmHg)(m³)/(K)(g·mol)] |
| `T_s`      | Nhiệt độ trung bình của khí ống khói, °K |
| `T_m`      | Nhiệt độ trung bình tuyệt đối DGM, °K |
| `T_std`    | Nhiệt độ tuyệt đối tại điều kiện chuẩn, 25 °C + 273 = 298 °K |
| `V_a`      | Thể tích aceton, mL |
| `V_aw`     | Thể tích aceton sử dụng để rửa, mL |
| `V_lc`     | Tổng thể tích nước thu được trong bình ngưng và trong silicagel, mL |
| `V_m`      | Thể tích mẫu khí được xác định bởi đồng hồ đo khí khô, m³ |
| `V_m(std)` | Thể tích mẫu khí xác định bằng đồng hồ đo khí khô, ở điều kiện chuẩn, m³ |
| `V_w(std)` | Thể tích hơi nước trong mẫu khí, ở điều kiện tiêu chuẩn, m³ |
| `V_s`      | Vận tốc khí ống khói, tính toán theo Phụ lục 02 ban hành kèm theo Thông tư 24/2017/TT-BTNMT, công thức (2.4), m/s |
| `W_a`      | Trọng lượng của phần thể tích còn lại, mg |
| `Y`        | Hệ số hiệu chuẩn của đồng hồ đo khí khô |
| `ρ_a`      | Tỷ trọng của aceton, mg/mL |
| `ρ_w`      | Tỷ trọng của nước, 0,9982 g/mL |
| `K1`       | 0,3858 °K/mmHg |
| `K3`       | 0,001 g/mg |
| `K4`       | 0,003454 [(mmHg)(m³)]/[(mL)(°K)] |
| `K5`       | 4,320 |

Thực hiện lặp lại 3 lần và ghi kết quả vào biên bản tại Phụ lục I.

### 7.4. Đánh giá độ không đảm bảo đo

#### 7.4.1. Xác định các yếu tố gây ra ĐKĐB tại tất cả các điểm hiệu chuẩn

- Máy đo độ bụi cần hiệu chuẩn: đặc tính kỹ thuật do nhà sản xuất cung cấp, số liệu đo đạc lần trước, độ trôi điểm "không", độ lặp lại khi sử dụng thiết bị;
- Thiết bị chuẩn đo lường: đặc tính kỹ thuật do nhà sản xuất cung cấp, số liệu đo đạc lần trước, giá trị độ chia, độ đúng của thiết bị;
- Điều kiện môi trường trong phòng đo/hiệu chuẩn (nhiệt độ, độ ẩm);
- Nhân viên đo/hiệu chuẩn;
- Nguồn điện cấp vào thiết bị;
- Một số ảnh hưởng ngẫu nhiên khác.

#### 7.4.2. Tính toán ĐKĐB của các yếu tố ảnh hưởng

Các yếu tố ảnh hưởng đến ĐKĐB được xác định từ mục 7.4.1. Tuy nhiên, không phải tất cả các yếu tố ảnh hưởng đều có thể xác định được hoặc có những yếu tố ảnh hưởng không đáng kể tới ĐKĐB thì có thể xem xét và bỏ qua như: nhân viên thực hiện công tác đo/hiệu chuẩn, nguồn điện, điều kiện môi trường và một vài yếu tố ngẫu nhiên khác… ĐKĐB được tính như sau:

- **ĐKĐB do sự lặp lại:**

`u_A = (s/√(3))`

  `s`: độ lệch chuẩn thực nghiệm sau 3 lần đo, với `n`: số lần thực hiện đo; `q_k`: giá trị đo được ở lần thứ k; `q̄`: giá trị trung bình của k lần đo.

- **ĐKĐB do lưu lượng của máy đo độ bụi cần hiệu chuẩn:**

`U_B1 = (s/√(3))`

  `s`: độ lệch chuẩn thực nghiệm sau 3 lần đo, với `n`: số lần thực hiện đo; `q_k`: giá trị đo được ở lần thứ k; `q̄`: giá trị trung bình của k lần đo.

- **ĐKĐB do lưu lượng chuẩn:**

`U_B2 = (U_M/k)`

  `k` là hệ số phủ (k = 2); `U_M`: độ không đảm bảo đo của máy đo lưu lượng.

- **ĐKĐB do độ phân giải của phương tiện đo bụi:**

`U_B3 = (d/2√(3))`

  `d`: giá trị độ chia nhỏ nhất của phương tiện đo độ bụi.

#### 7.4.3. Tính toán ĐKĐB kết hợp với ĐKĐB mở rộng

**ĐKĐB kết hợp:**

`U_c = √(U_A² + U_B1² + U_B2² + U_B3²)`

**ĐKĐB mở rộng** — độ không đảm bảo đo mở rộng (U) là đại lượng xác định miền giá trị phân bố bao quanh kết quả đo:

`U = k · U_c`

Với `k` là hệ số bao phủ, hệ số bằng số được sử dụng như là bội của ĐKĐB chuẩn kết hợp để đưa ra ĐKĐB mở rộng, thường được chọn k = 2 với mức tin cậy xấp xỉ 95 %.

## 8. Xử lý chung

- **8.1.** Phương tiện đo bụi sau khi hiệu chuẩn được dán tem, cấp giấy chứng nhận hiệu chuẩn có chứa các thông tin về kết quả hiệu chuẩn kèm theo độ không đảm bảo đo.
- **8.2.** Chu kỳ hiệu chuẩn của phương tiện đo bụi được khuyến nghị: tối đa 01 lần/năm.

## 9. Phụ lục

Biên bản hiệu chuẩn phương tiện đo lưu lượng khí (`ETV.MCO 04.01`).

> *Ghi chú của bản chuyển đổi:* mục 9 dẫn tên biểu mẫu là "Biên bản hiệu chuẩn phương tiện đo **lưu lượng khí**" — cùng dạng lỗi sao chép tên biểu mẫu như ở `ETV.MCO 03`; đối tượng đúng của quy trình này là phương tiện đo bụi trong khí thải. Giữ nguyên văn.
