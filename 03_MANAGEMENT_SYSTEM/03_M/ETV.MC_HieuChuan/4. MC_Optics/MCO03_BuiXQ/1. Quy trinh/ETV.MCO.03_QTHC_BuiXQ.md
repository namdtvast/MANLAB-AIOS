---
id: ETV.MCO 03
title: "Phương tiện đo nồng độ khối lượng bụi (PM10; PM2,5) trong môi trường không khí xung quanh — Quy trình hiệu chuẩn"
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
keywords: [bụi, PM10, PM2.5, TSP, tháp trộn hạt bụi, đầu hút mẫu, trọng lượng, không khí xung quanh, hiệu chuẩn]
related_documents: ["ETV.MCO 03.01"]
iso_clause: ["ISO/IEC 17025:2017", "ISO 12103-1 A1"]
legal_basis: []
ai_tags: [calibration-procedure, dust-meter, pm-monitor, ambient-air-quality, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCO 03_Bui XQ_V3.pdf`"
supersedes: "ETV.MCO 03 lần ban hành 01 (22/04/2019, soát xét 19/05/2020 và 22/04/2022)"
superseded_by: null
---
# PHƯƠNG TIỆN ĐO NỒNG ĐỘ KHỐI LƯỢNG BỤI (PM10; PM2,5) TRONG MÔI TRƯỜNG KHÔNG KHÍ XUNG QUANH – QUY TRÌNH HIỆU CHUẨN

*Dust meter – Calibration procedure*

|                   |                     |
| ----------------- | ------------------- |
| **Mã số**         | ETV.MCO 03          |
| **Lần ban hành**  | 02                  |
| **Ngày ban hành** | 22/04/2026          |
| **Biên soạn**     | *(bản gốc để trống)* |
| **Soát xét**      | Trần Thị Hoa        |
| **Phê duyệt**     | Nguyễn Hoàng Giang  |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCO 03_Bui XQ_V3.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khối chữ ký trong bản gốc **để trống**, chưa có tên người biên soạn. Khi có khác biệt, bản PDF do Viện ban hành là bản có giá trị áp dụng.
>
> **Về việc chỉ lưu bản này:** thư mục `00_RAW_DATA/QTHC` từng có hai file cùng mang số `ETV.MCO 03`: bản này (Bui XQ_V3, lần ban hành 02, chuyên biệt cho bụi PM trong không khí xung quanh dạng tự động liên tục) và một bản khác (Bui-V2, lần ban hành 01, gộp cả bụi môi trường xung quanh lẫn bụi khí thải). Phần bụi khí thải trong bản cũ nay đã tách thành quy trình riêng `ETV.MCO 04`; bản Bui XQ_V3 này là bản kế thừa, đầy đủ và mới hơn nên được chọn chuyển đổi; bản Bui-V2 không chuyển đổi.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian  | Nội dung thay đổi                    | Lần ban hành |
| ---------- | -------------------------------------- | ------------ |
| 22/04/2019 | Ban hành lần thứ nhất                  | 01           |
| 19/05/2020 | Soát xét, bổ sung làm rõ tên PTĐ       | 01           |
| 22/04/2022 | Soát xét, bổ sung làm rõ tên PTĐ       | 01           |
| 22/04/2026 | Ban hành lần thứ hai                   | 02           |

---

## 1. Phạm vi và đối tượng áp dụng

Quy trình này quy định quy trình kỹ thuật hiệu chuẩn phương tiện đo nồng độ khối lượng bụi trong môi trường không khí xung quanh (PM10; PM2,5…) sử dụng phương pháp trọng lượng, bao gồm thiết bị đo cầm tay và tự động, liên tục, cụ thể:

| TT  | Thông số                    | Phạm vi đo          | Độ chính xác |
| --- | ---------------------------- | -------------------- | ------------- |
| 1   | Bụi môi trường xung quanh    | (0 ÷ 2000) mg/m³      | ± 10 %        |

Văn bản này áp dụng cho phương tiện đo nồng độ bụi trong môi trường không khí xung quanh (tự động, liên tục) có đầu hút mẫu và theo nguyên lý trọng lượng, suy giảm tia Beta, tán xạ ánh sáng, quang học và cân bằng dao động vi lượng giảm dần (TOEM).

Văn bản này **không** áp dụng để kiểm định phương tiện đo nồng độ bụi trong môi trường không khí xung quanh như:

- Phương tiện đo theo nguyên lý cảm biến không có đầu hút mẫu (không có bơm hút) dạng tự động, liên tục;
- Phương tiện đo theo nguyên lý cảm biến dạng cầm tay;
- Phương tiện đo theo nguyên lý đếm hạt;
- Phương tiện đo khí thải tự động, liên tục.

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

7. **Đơn vị tính:** µg/m³ (1 mg/m³ = 1.000 µg/m³), %.
8. **Từ ngữ viết tắt:**
   - **PM10** (*Particulate matter 10*): tổng các hạt bụi lơ lửng có đường kính khí động học nhỏ hơn hoặc bằng 10 µm;
   - **PM5** (*Particulate matter 5*): tổng các hạt bụi lơ lửng có đường kính khí động học nhỏ hơn hoặc bằng 5 µm;
   - **PM2.5** (*Particulate matter 2.5*): tổng các hạt bụi lơ lửng có đường kính khí động học nhỏ hơn hoặc bằng 2,5 µm;
   - **PM1** (*Particulate matter 1*): tổng các hạt bụi lơ lửng có đường kính khí động học nhỏ hơn hoặc bằng 1 µm.

## 3. Các phép hiệu chuẩn

Phải lần lượt tiến hành các phép hiệu chuẩn ghi trong Bảng 1.

**Bảng 1**

| TT  | Tên phép hiệu chuẩn                                            | Theo điều, mục của quy trình |
| --- | ----------------------------------------------------------------- | ----------------------------- |
| 1   | Kiểm tra bên ngoài                                                | 7.1                            |
| 2   | Kiểm tra kỹ thuật                                                 | 7.2                            |
| 3   | Kiểm tra đo lường — kiểm tra điểm 0, kiểm tra sai số, kiểm tra độ lặp lại | 7.3                     |
| 4   | Tính toán độ không đảm bảo đo                                     | 7.4 [^muc74]                  |
| 5   | Xử lý chung                                                       | 8                              |

[^muc74]: Bảng 1 dẫn "7.4" cho mục tính ĐKĐB, nhưng phần thân văn bản đánh mục này là **8. Ước lượng độ không đảm bảo đo** (và mục 9 là Xử lý chung, mục 10 là Phụ lục). Giữ nguyên văn Bảng 1, cần đính chính khi ban hành lại.

## 4. Phương tiện phục vụ hiệu chuẩn

Phương tiện hiệu chuẩn được ghi trong Bảng 2.

**Bảng 2**

| TT  | Tên phương tiện dùng để hiệu chuẩn        | Đặc trưng kỹ thuật đo lường cơ bản                                                                       | Áp dụng cho điều mục |
| --- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------- | --------------------- |
| 1   | **Chuẩn đo lường**                           | PTĐ chuẩn nồng độ bụi PM2,5; PM10 đảm bảo: phạm vi đo tối thiểu (0 ÷ 2.000) µg/m³; ĐKĐB của hệ thống chuẩn đo lường nhỏ hơn 1,5 lần sai số lớn nhất cho phép |                       |
|     | Thiết bị đo nồng độ bụi chuẩn                | - Phạm vi đo tối thiểu: (0 ÷ 2.000) µg/m³<br>- Độ phân giải: ≤ 0,1 µg/m³                                  | 6, 7                  |
|     | Hạt bụi chuẩn                                | - Đáp ứng tiêu chuẩn ISO 12103-1 A1<br>- Kích thước danh nghĩa tối thiểu: (0 ÷ 10) µm                     | 6, 7                  |
|     | Tháp trộn hạt bụi                            | - Có đầu hút mẫu với lưu lượng hút khác nhau phù hợp với lưu lượng hút của PTĐ bụi cần kiểm định (để đảm bảo đẳng tích)<br>- Vật liệu chế tạo nhẵn, mịn, không tích điện | 6, 7    |
|     | Thiết bị phân tán bụi (tùy chọn)             | - Phân tán bụi khô<br>- Phạm vi kích thước hạt tối thiểu: (0 ÷ 10) µm<br>- Có thể tạo ra sol khí thử nghiệm ổn định với nồng độ bụi phù hợp | 6, 7    |
| 2   | **Phương tiện đo**                           |                                                                                                           |                       |
| 2.1 | Barometer                                    | - Phạm vi đo: (750 ÷ 1150) hPa<br>- Giá trị độ chia: 0,1 hPa                                              | 6, 7.2                |
| 2.2 | Phương tiện đo nhiệt độ và độ ẩm môi trường  | - Phạm vi đo: Nhiệt độ (0 ÷ 50) °C, giá trị độ chia 1 °C; Độ ẩm (25 ÷ 95) %RH, giá trị độ chia 1 %RH      | 5                     |
| 2.3 | Thiết bị đo và kiểm soát lưu lượng           | - Phạm vi lưu lượng phù hợp với lưu lượng phương tiện đo cần kiểm định<br>- Độ chính xác: ≤ ± 2,0 %       | 6, 7.2                |
| 3   | **Phương tiện phụ**                          |                                                                                                           |                       |
| 3.1 | Mẫu "không"                                  | Là mẫu có các thành phần bụi nhỏ hơn 03 lần ngưỡng giới hạn mà phương tiện đo có thể phát hiện được trên một đơn vị thể tích (m³) | 6, 7    |
| 3.2 | Van nối, ống dẫn khí, đầu chuyển đổi         | Được chế tạo bằng vật liệu không làm ảnh hưởng đến nồng độ bụi chuẩn cần đo                               | 6, 7                  |
| 3.3 | Áp kế                                        | - Phạm vi đo: (0 ÷ 1,5) bar<br>- Cấp chính xác: 1                                                          | 6, 7                  |

## 5. Điều kiện hiệu chuẩn

Khi tiến hành hiệu chuẩn, phải đảm bảo các điều kiện môi trường sau đây:

- **5.1.** Địa điểm làm việc phải ít bụi, thoáng mát, không có chất ăn mòn hóa học, không có các nguồn gây biến đổi lớn về nhiệt môi trường và ít rung động trong quá trình làm việc.
- **5.2.** PTĐ cần hiệu chuẩn phải được lắp đặt theo đúng tài liệu hướng dẫn của nhà sản xuất. Các gioăng đệm không được lấn vào phần trong của ống dẫn.
- **5.3. Điều kiện thực hiện hiệu chuẩn:**
  - Nhiệt độ: (25 ± 2) °C;
  - Độ ẩm không khí: ≤ 80 %RH (không đọng sương);
  - Áp suất khí quyển: (860 ÷ 1060) hPa.
- **5.4. Điều kiện phòng cân:**
  - Nhiệt độ: (20 ± 3) °C;
  - Độ ẩm không khí: (45 ÷ 50) %RH.

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành hiệu chuẩn, phải chuẩn bị các công việc sau đây:

- PTĐ cần hiệu chuẩn phải được kiểm tra, vận hành ổn định theo đúng yêu cầu của nhà sản xuất quy định trong tài liệu kỹ thuật.
- Kiểm tra kết nối của PTĐ cần hiệu chuẩn đến hệ thống chuẩn nồng độ bụi PM2,5; PM10, phải đảm bảo sự kín, khít, lưu lượng khí đầu vào phù hợp với hướng dẫn sử dụng của nhà sản xuất.
- Vận hành PTĐ chuẩn; PTĐ cần hiệu chuẩn theo đúng quy định trong tài liệu kỹ thuật.
- Chọn điểm hiệu chuẩn có nồng độ khối lượng bụi theo yêu cầu sau:
  - Điểm hiệu chuẩn thứ nhất có giá trị nồng độ khối lượng bụi nằm trong khoảng (30 ± 10) % của toàn bộ phạm vi đo;
  - Điểm hiệu chuẩn thứ hai có giá trị nồng độ khối lượng bụi nằm trong khoảng (80 ± 10) % của toàn bộ phạm vi đo.

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

PTĐ cần hiệu chuẩn được kiểm tra bên ngoài theo các yêu cầu sau đây:

Kiểm tra xác định sự phù hợp của PTĐ cần hiệu chuẩn với các yêu cầu quy định trong tài liệu kỹ thuật về hình dáng, kích thước, hiển thị, nguồn điện sử dụng, nhãn hiệu và phụ kiện kèm theo.

### 7.2. Kiểm tra kỹ thuật

PTĐ cần hiệu chuẩn được kiểm tra kỹ thuật theo các yêu cầu quy định trong tài liệu kỹ thuật.

- Kiểm tra phương pháp lấy mẫu, bơm hút mẫu của PTĐ.
- Kiểm tra lưu lượng hút của PTĐ (nếu có):
  - Kết nối thiết bị đo lưu lượng không khí với đầu hút mẫu của PTĐ;
  - Tiến hành đo 3 lần liên tiếp. Ghi kết quả vào biên bản hiệu chuẩn ở Phụ lục;
  - Sai lệch giữa giá trị lưu lượng danh định và giá trị lưu lượng đo được của PTĐ cần hiệu chuẩn ≤ 5 %.
- Kiểm tra bộ phận hiển thị: phạm vi đo, giá trị độ chia, bộ phận ghi dữ liệu, bộ phận tính toán dữ liệu, hệ thống cảnh báo, cơ cấu hiệu chỉnh, bảo mật.

### 7.3. Kiểm tra đo lường

PTĐ cần hiệu chuẩn được kiểm tra đo lường theo các yêu cầu sau đây:

#### 7.3.1. Phương pháp hiệu chuẩn

Phương pháp hiệu chuẩn thiết bị đo nồng độ khối lượng bụi PM10, PM2,5 được tiến hành bằng cách so sánh giá trị nồng độ bụi đo được bằng chuẩn bụi và phương tiện đo cần hiệu chuẩn.

#### 7.3.2. Tiến hành hiệu chuẩn

##### 7.3.2.1. Kiểm tra mẫu "không"

Hai phương tiện đo được tiến hành đo đồng thời, tối thiểu 3 lần liên tiếp mẫu "không". Ghi kết quả đo được vào biên bản ở Phụ lục 1.

##### 7.3.2.2. Kiểm tra độ chính xác

- Chọn các điểm hiệu chuẩn như tại mục 6.
- Tại mỗi điểm hiệu chuẩn, đo tối thiểu 5 lần liên tiếp bằng PTĐ. Ghi kết quả đo được vào biên bản ở Phụ lục.
- Sai số của PTĐ tại mỗi lần đo được tính theo công thức sau:

$$\delta = \frac{C_Đ - C_{ref}}{C_{ref}} \times 100\% \tag{1}$$

- `δ`: sai số tương đối, %;
- `C_Đ`: giá trị đo của PTĐ cần hiệu chuẩn tại mỗi lần đo, µg/m³;
- `C_ref`: giá trị đo của PTĐ chuẩn nồng độ bụi tại mỗi lần đo, µg/m³.

## 8. Ước lượng độ không đảm bảo đo

### 8.1. Các yếu tố gây ra độ không đảm bảo đo

Việc hiệu chuẩn được thực hiện bằng phương pháp so sánh trực tiếp nên sẽ có 6 thành phần ĐKĐB chính như sau: độ không đồng nhất nồng độ bụi tại các vị trí đầu hút mẫu; ĐKĐB của chuẩn bụi; độ trôi điểm "0" của PTĐ cần hiệu chuẩn; độ lặp lại của chuẩn bụi; độ lặp lại của PTĐ cần hiệu chuẩn; độ phân giải của PTĐ cần hiệu chuẩn. Các thành phần ĐKĐB khác có thể coi là nhỏ không đáng kể, cụ thể như sau:

#### 8.1.1. Hiệu suất thu gom của đầu lựa chọn kích thước hạt bụi

Đặc tính lựa chọn kích thước hạt PM được xác định dựa theo thiết kế khi được hoạt động ở tốc độ dòng chảy chính xác. Sai lệch lựa chọn kích thước hạt PM sẽ phụ thuộc vào:

- Sai lệch so với thiết kế cơ học lý tưởng do dung sai kích thước, tích tụ bụi hoặc bôi trơn không đủ;
- Sai lệch so với tốc độ dòng chảy yêu cầu.

Những sai lệch này được giới hạn bởi dung sai thiết kế theo đúng tiêu chuẩn bởi nhà thiết kế, nên có thể được coi là không đáng kể. Ngoài ra, độ lệch trong phần kích thước sẽ phụ thuộc vào nhiệt độ môi trường xung quanh, sự phụ thuộc nhiệt độ của độ nhớt của không khí. Đường kính cắt hạt PM thay đổi chỉ khoảng 1,5 % khi nhiệt độ thay đổi 10 K. Về nguyên tắc, sự thay đổi này góp phần không đáng kể vào nguồn không đảm bảo đo của kết quả.

#### 8.1.2. Tổn thất lắng đọng trong đường ống nối

Tổn thất do lắng đọng (trọng lực và quán tính) sẽ nhỏ không đáng kể bằng cách sử dụng đường ống nối thẳng đứng và hạn chế đường ống nối khúc cua trong đường hút mẫu. Ngoài ra còn có tổn thất lắng đọng trong đường ống nối do sự chênh lệch nhiệt độ, do vậy cần hạn chế sự sụt giảm nhiệt độ lớn giữa ống nối và không khí hút mẫu. Tổn thất lắng đọng trong đường ống nối thường được coi là không đáng kể để đóng góp vào ĐKĐB đo.

#### 8.1.3. Tổn thất hạt PM do xuyên qua cái lọc bụi

Tổn thất hạt PM do xuyên qua cái lọc bụi là nhỏ không đáng kể và bị giới hạn bởi yêu cầu kỹ thuật đối với cái lọc bụi, vì theo đặc tính của cái lọc bụi thì khả năng giữ lại hạt 0,3 µm là 99,8 %. Vậy nên, nguồn đóng góp vào ĐKĐB đo do tổn thất hạt PM là không đáng kể.

#### 8.1.4. Tổn thất hạt PM do bay hơi giữa quá trình thu gom

Các yếu tố chính trong tốc độ bay hơi là nhiệt độ của hệ thống hút mẫu và cái lọc bụi; độ ẩm tương đối; vật liệu lọc và tốc độ dòng chảy. Tổn thất hạt PM do bay hơi được giới hạn trong phương pháp đo bởi các ràng buộc đối với các thành phần của hệ thống lấy mẫu, bảo quản, vận chuyển và điều kiện hút mẫu được quy định trong quy trình. Vì vậy, tổn thất hạt PM do bay hơi giữa quá trình thu gom và cân được coi là không đáng kể vào nguồn độ không đảm bảo đo của kết quả.

#### 8.1.5. Tốc độ dòng chảy (Q)

Hai thành phần sai số đo tốc độ dòng chảy: thứ nhất phát sinh từ độ chính xác của tiêu chuẩn truyền được sử dụng để hiệu chuẩn; thứ hai là do bất kỳ độ lệch thực nào giữa tốc độ dòng chảy yêu cầu và tốc độ dòng chảy đã được xác định khi hiệu chuẩn trong khoảng thời gian đo. Lưu lượng trung bình được kiểm soát trong phạm vi ± 2 %, trong khi đồng hồ đo lưu lượng được hiệu chuẩn với độ sai số đo nhỏ hơn 2 % (với độ tin cậy 95 %).

Việc đo lưu lượng cũng có thể bị ảnh hưởng bởi sự khác biệt về tốc độ dòng chảy giữa đầu hút mẫu và đồng hồ đo lưu lượng, giảm áp suất qua cái lọc bụi, gió, nhiệt độ và áp suất ảnh hưởng đến đồng hồ đo lưu lượng và rò rỉ trong đường ống hoặc xung quanh giá đỡ bộ lọc bụi.

#### 8.1.6. Thời gian (t)

Các thiết bị đo thời gian điện tử có độ chính xác rất cao, nên sẽ có ĐKĐB rất nhỏ; ví dụ, có thể có một sai lệch giữa thời gian đo được và thời gian thực mà bộ lọc hút mẫu ở tốc độ dòng chảy yêu cầu. Nhưng sai lệch tối đa yêu cầu là 5 phút trong khoảng thời gian hút mẫu là 24 giờ, tức là độ sai lệch chỉ 0,35 %, nên đóng góp nhỏ không đáng kể vào ĐKĐB của kết quả đo.

#### 8.1.7. Độ lặp lại của PTĐ cần hiệu chuẩn

PTĐ cần hiệu chuẩn được đo lặp n lần (5 lần) và ĐKĐB kiểu A do đo lặp này sẽ được xác định bằng phương pháp thống kê.

#### 8.1.8. Độ phân giải của PTĐ cần hiệu chuẩn

Độ phân giải của PTĐ cần hiệu chuẩn ảnh hưởng đến kết quả đánh giá độ không đảm bảo đo của hệ thống và ĐKĐB do phân giải sẽ được tính từ độ phân giải theo phân bố xác suất hình chữ nhật.

#### 8.1.9. Độ không đảm bảo đo do độ trôi điểm "0" (u_drift)

Độ trôi điểm "0" (drift) là giá trị lớn nhất đạt được của phép đo lặp lại 3 lần với mẫu "không".

#### 8.1.10. Độ không đảm bảo đo của chuẩn bụi

Độ không đảm bảo đo kiểu B của chuẩn bụi sẽ được lấy từ giấy chứng nhận hiệu chuẩn và được coi là có phân bố xác suất chuẩn.

#### 8.1.11. Độ lệch đồng nhất vị trí đầu hút mẫu

Độ không đồng nhất nồng độ vị trí đầu hút mẫu (hay còn gọi là độ đồng nhất của sol khí trong tháp trộn) biểu thị độ chênh lệch về nồng độ bụi thu được tại các vị trí hút mẫu khác nhau trên cùng một mặt phẳng tiết diện.

`η_hom`: là độ không đồng nhất nồng độ bụi vị trí đầu hút mẫu (chỉ áp dụng khi PTĐ chuẩn bụi có nhiều vị trí đầu ra):

$$\eta_{hom} = 1 - \frac{|C_{i}^{ref} - C_{j}^{ref}|}{\bar{C}} \tag{2}$$

- `C_i^ref`: nồng độ hạt PM tại vị trí đầu hút mẫu i trên cùng mặt phẳng tiết diện thu mẫu, µg/m³;
- `C_j^ref`: nồng độ hạt PM tại vị trí đầu hút mẫu j trên cùng mặt phẳng tiết diện thu mẫu, µg/m³.

#### 8.1.12. Độ lặp lại của chuẩn bụi

Chuẩn bụi cũng sẽ được đo lặp n lần (5 lần) và ĐKĐB kiểu A do đo lặp này sẽ được xác định bằng phương pháp thống kê.

### 8.2. Tổng hợp các nguồn độ không đảm bảo đo thành phần

**Bảng 3**

| TT  | Thành phần                                              | Ký hiệu     | Sự đóng góp |
| --- | ---------------------------------------------------------- | ----------- | ------------- |
| 1   | Độ không đồng nhất nồng độ vị trí đầu hút mẫu, µg/m³        | `u_ηhom`    | $u_{\eta hom} = \dfrac{|C_i^{ref} - C_j^{ref}|}{2\sqrt{3}}$ |
| 2   | Độ không đảm bảo của chuẩn bụi, µg/m³                       | `u_ref`     | $u_{ref} = \dfrac{U_{cer}}{2}$ |
| 3   | Độ không đảm bảo đo do độ trôi điểm "0" (u_drift), µg/m³    | `u_drift`   | $u_{drift} = \dfrac{drift}{\sqrt{3}}$ |
| 4   | Độ lặp lại của chuẩn bụi, µg/m³                             | `u_Aref`    | $u_{Aref} = \dfrac{s(\bar{y})}{\sqrt{n}}$ |
| 5   | Độ lặp lại của PTĐ cần hiệu chuẩn, µg/m³                    | `u_A`       | $u_A = \dfrac{s(\bar{x})}{\sqrt{n}}$ |
| 6   | Độ phân giải của PTĐ cần hiệu chuẩn, µg/m³                  | `u_res`     | $u_{res} = \dfrac{d}{2\sqrt{3}}$ |

### 8.3. Độ không đảm bảo đo chuẩn tổng hợp (u_c)

$$u_c = \sqrt{u_{\eta hom}^2 + u_{ref}^2 + u_{drift}^2 + u_{Aref}^2 + u_A^2 + u_{res}^2} \quad (\mu g/m^3) \tag{3}$$

hoặc

$$u_c = \frac{u_c \times 100}{\bar{C}} \quad (\%) \tag{4}$$

với `C̄`: giá trị trung bình của PTĐ cần hiệu chuẩn (µg/m³).

### 8.4. Độ không đảm bảo đo chuẩn mở rộng U

$$U = k \times u_C \tag{5}$$

## 9. Xử lý chung

- **9.1.** Phương tiện đo bụi sau khi hiệu chuẩn được dán tem, cấp giấy chứng nhận hiệu chuẩn có chứa các thông tin về kết quả hiệu chuẩn kèm theo độ không đảm bảo đo.
- **9.2.** Chu kỳ hiệu chuẩn của phương tiện đo bụi được khuyến nghị: tối đa 01 lần/năm.

## 10. Phụ lục

Biên bản hiệu chuẩn phương tiện đo lưu lượng khí (`ETV.MCO 03.01`).

> *Ghi chú của bản chuyển đổi:* mục 10 dẫn tên biểu mẫu là "Biên bản hiệu chuẩn phương tiện đo **lưu lượng khí**" — có khả năng là lỗi sao chép tên biểu mẫu từ quy trình MCF; đối tượng đúng của quy trình này là phương tiện đo bụi. Giữ nguyên văn.
