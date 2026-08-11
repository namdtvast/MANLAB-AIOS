---
id: ETV.MCW 06
title: "Phương tiện đo oxy hòa tan (DO) — Quy trình hiệu chuẩn"
type: Quy-trinh
owner: "Viện Kiểm định Công nghệ và Môi trường"
department: "Phòng Đo lường Chất lượng"
prepared_by: "Nguyễn Văn Đồng"
prepared_date: "22/04/2026"
reviewed_by: "Trần Thị Hoa"
reviewed_date: "22/04/2026"
approved_by: "Nguyễn Hoàng Giang"
approved_date: "22/04/2026"
process: ""
effective_date: "22/04/2026"
revision: "03"
status: Da-ban-hanh
keywords: [DO, oxy hòa tan, dissolved oxygen, hiệu chuẩn, điểm bão hòa, Na2SO3, quan trắc môi trường nước]
related_documents: ["ETV.MCW.F 06.01"]
iso_clause: ["ISO/IEC 17025:2017", "ISO 5814:2012"]
legal_basis: ["ĐLVN 131:2003", "ĐLVN 276:2014", "ĐLVN 385:2021", "TCVN 7325:2016", "TCVN 7324:2004"]
ai_tags: [calibration-procedure, do-meter, dissolved-oxygen, water-quality, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCW 06_DO_Khong theo Winkler V2.pdf`"
supersedes: "ETV.MCW 06 lần ban hành 02 (22/04/2023)"
superseded_by: null
---
# PHƯƠNG TIỆN ĐO OXY HÒA TAN – QUY TRÌNH HIỆU CHUẨN

*Dissolved Oxygen meter – Calibration procedure*

|                   |                |
| ----------------- | -------------- |
| **Mã số**         | ETV.MCW 06     |
| **Lần ban hành**  | 03             |
| **Ngày ban hành** | 22/04/2026     |
| **Biên soạn**     | Nguyễn Văn Đồng |
| **Soát xét**      | Trần Thị Hoa |
| **Phê duyệt**     | Nguyễn Hoàng Giang |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCW 06_DO_Khong theo Winkler V2.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khi có khác biệt, bản PDF do Viện ban hành là bản có giá trị áp dụng.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian  | Nội dung thay đổi                                        | Lần ban hành |
| ---------- | -------------------------------------------------------- | ------------ |
| 22/04/2019 | Ban hành lần thứ nhất                                    | 01           |
| 19/05/2021 | Điều chỉnh quy trình theo ĐLVN 385                       | 01           |
| 22/04/2023 | Ban hành lần thứ hai (điều chỉnh theo ý kiến của chuyên gia BoA) | 02   |
| 22/04/2026 | Ban hành lần thứ ba                                      | 03           |

---

## 1. Phạm vi áp dụng

Quy trình này quy định quy trình kỹ thuật hiệu chuẩn phương tiện đo (PTĐ) DO bao gồm các phương tiện đo thông dụng và trong hoạt động quan trắc môi trường nước (nước mặt; nước thải; nước biển; nước ngầm…) ngoài hiện trường và trong phòng thí nghiệm, có phạm vi đo (0 ÷ 20) mg/L hoặc có phạm vi đo (0 ÷ 200) % oxy bão hòa và sai số/độ không đảm bảo đo lớn nhất 2,1 %.

Quy trình này áp dụng đối với nhân viên của Viện Kiểm định Công nghệ và Môi trường (sau đây gọi tắt là PTN) khi hiệu chuẩn PTĐ nói trên.

## 2. Giải thích từ ngữ

Các từ ngữ trong văn bản này được hiểu như sau:

- **2.1. Nồng độ oxy hòa tan:** là lượng ôxy có trong nước được tính bằng mg/L hay % bão hòa theo nhiệt độ. Phần trăm bão hòa là phần trăm tiềm tàng của nước để giữ ôxy có mặt trong nước.
- **2.2. Dung dịch điểm "0":** là dung dịch có nồng độ oxy hòa tan bằng không trong dung dịch.
- **2.3. Dung dịch nồng độ oxy bão hòa:** là các dung dịch có nồng độ ôxy hòa tan bão hòa trong nước tại các nhiệt độ xác định.
- **2.4. Đơn vị đo:** mg/L hoặc %.

## 3. Các phép hiệu chuẩn

Phải lần lượt tiến hành các phép kiểm tra ghi trong Bảng 1.

**Bảng 1.**

| TT  | Tên phép hiệu chuẩn           | Theo điều, mục của quy trình |
| --- | ----------------------------- | ---------------------------- |
| 1   | Kiểm tra bên ngoài            | 7.1                          |
| 2   | Kiểm tra kỹ thuật             | 7.2                          |
| 3   | Kiểm tra đo lường             | 7.3                          |
| 3.1 | Kiểm tra trước hiệu chuẩn     | 7.3.1                        |
|     | Đo trước hiệu chỉnh           | a                            |
|     | Tiến hành hiệu chỉnh          | b                            |
| 3.2 | Tiến hành hiệu chuẩn          | 7.3.2                        |
|     | Kiểm tra điểm "0"             | a                            |
|     | Kiểm tra sai số               | b                            |
|     | Kiểm tra độ lặp lại           | c                            |
| 3.3 | Tính toán độ không đảm bảo đo | 7.3.4 [^muc]                 |
| 4   | Xử lý chung                   | 8                            |

[^muc]: Nguyên văn Bảng 1 của bản gốc ghi "7.3.4", trong khi nội dung tương ứng nằm ở mục 7.3.3. Giữ nguyên văn, cần đính chính khi ban hành lại.

## 4. Phương tiện phục vụ hiệu chuẩn

Phương tiện hiệu chuẩn được ghi trong Bảng 2.

**Bảng 2.**

| TT  | Phương tiện hiệu chuẩn            | Đặc trưng kỹ thuật                                                                                         |
| --- | --------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| 1   | **Chuẩn đo lường**                |                                                                                                              |
|     | PTĐ nồng độ oxy hoà tan           | - Phạm vi đo: (0 ÷ 20) mg/L hoặc đến 200 % oxy bão hòa<br>- Độ không đảm bảo: ≤ 2,0 % của dải đo             |
| 2   | **Phương tiện đo khác**           |                                                                                                              |
| 2.1 | Hóa chất Sodium Sulfite (Na₂SO₃)  | - Độ tinh khiết ≥ 95 %                                                                                       |
| 2.2 | Thiết bị đo nhiệt độ              | - Phạm vi đo: (0 ÷ 50) °C<br>- Độ chính xác: ≤ 0,1 °C                                                        |
| 2.3 | Bể ổn nhiệt                       | - Phạm vi điều nhiệt từ (-20 ÷ 200) °C<br>- Độ ổn định: ≤ 0,1 °C                                             |
| 2.4 | PTĐ nhiệt độ và độ ẩm môi trường  | - Dải đo: Nhiệt độ (0 ÷ 50) °C; Độ ẩm tương đối (25 ÷ 95) %RH<br>- Độ phân giải: Nhiệt độ 1 °C; Độ ẩm 1 %RH  |
| 3   | **Phương tiện phụ**               |                                                                                                              |
| 3.1 | Cốc thủy tinh                     | - Phù hợp với kích thước của đầu đo                                                                          |
| 3.2 | Bình xịt tia                      |                                                                                                              |
| 3.3 | Nước cất hoặc nước siêu sạch      | - Nước loại 1 theo TCVN 4851:1989                                                                            |
| 3.4 | Giấy thấm                         |                                                                                                              |
| 3.5 | Bơm khí                           | - Lưu lượng ra khoảng 1 L/phút                                                                               |
| 3.6 | Lưu lượng kế khí                  | - Phạm vi điều chỉnh: đến 2 L/phút                                                                           |

## 5. Điều kiện hiệu chuẩn

Khi tiến hành hiệu chuẩn phải đảm bảo các điều kiện sau:

- Nhiệt độ: (25 ± 2) °C;
- Độ ẩm tương đối: ≤ 80 %RH (không đọng sương).

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành hiệu chuẩn phải thực hiện các công việc chuẩn bị sau:

- Chuẩn bị dung dịch điểm "0" bằng cách dùng PTĐ DO chuẩn nhúng vào cốc chứa nước siêu sạch đặt trong bể ổn nhiệt để ổn nhiệt tại (25 ± 0,1) °C và thêm từ từ hóa chất Na₂SO₃ vào đến khi PTĐ DO chuẩn hiển thị giá trị bằng "0".
- Chuẩn bị dung dịch kiểm tra điểm bão hòa bằng cách cho một cốc chứa nước cất hoặc nước siêu sạch vào bể ổn nhiệt và đặt ổn định nhiệt độ tại tối thiểu 02 điểm nhiệt độ trong dải từ (0 ÷ 50) °C, đồng thời dùng bơm thổi không khí với tốc độ khoảng 1 L/phút vào cốc trong khoảng 2 giờ để đạt đến bão hoà oxy. Việc tạo các điểm oxy bão hoà phải đảm bảo mỗi điểm có giá trị nồng độ oxy hoà tan bão hoà cách nhau tối thiểu từ (1 ÷ 2) mg/L (chi tiết tại bảng Phụ lục 01: bảng tra các giá trị nồng độ oxy hoà tan bão hoà trong nước theo nhiệt độ, được tham chiếu đến Bảng A.3 trong Phụ lục A của tiêu chuẩn ISO 5814:2012).
- PTĐ DO chuẩn và PTĐ được để ổn định tại nhiệt độ môi trường hiệu chuẩn khoảng 2 giờ trước khi tiến hành hiệu chuẩn.
- Trước khi tiến hành hiệu chuẩn, đầu đo của PTĐ phải được làm sạch theo hướng dẫn của nhà sản xuất ghi trong tài liệu kỹ thuật, sau đó rửa lại bằng nước cất và lau khô bằng giấy thấm.
- Mỗi khi đầu đo DO của PTĐ được thay đổi môi trường đo thì cần để đầu đo ổn định trong tối thiểu 30 phút trước khi tiến hành đo.

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

Phải kiểm tra bên ngoài theo các yêu cầu sau đây:

Kiểm tra bằng mắt để xác định sự phù hợp của PTĐ đối với các yêu cầu quy định trong tài liệu kỹ thuật, hình dáng kích thước, ký nhãn hiệu, nguồn nuôi, hiển thị, tài liệu và phụ kiện kèm theo.

### 7.2. Kiểm tra kỹ thuật

Phải kiểm tra kỹ thuật theo các yêu cầu sau đây:

Kiểm tra trạng thái hoạt động bình thường của PTĐ theo hướng dẫn sử dụng.

### 7.3. Kiểm tra đo lường

Phải kiểm tra đo lường theo trình tự sau đây:

#### 7.3.1. Kiểm tra trước hiệu chuẩn

Hoạt động này không bắt buộc; chỉ thực hiện khi PTĐ sai lệch lớn hoặc theo yêu cầu của khách hàng và PTĐ có thể hiệu chỉnh.

##### 7.3.1.1. Đo trước hiệu chỉnh

- **Kiểm tra điểm "0":** Nhúng đầu đo DO vào cốc đựng dung dịch điểm "0" tại nhiệt độ 25 °C.
- Đầu đo của PTĐ phải được ngâm tối thiểu 10 phút trong dung dịch điểm "0", đến khi giá trị đo ổn định thì ghi lại vào biên bản ở Phụ lục 02.
- **Kiểm tra điểm bão hòa:** Đưa đầu đo của PTĐ chuẩn và của khách hàng vào điểm bão hòa, tối thiểu 10 phút. Đến khi giá trị đo ổn định thì ghi lại vào biên bản ở Phụ lục 02.

##### 7.3.1.2. Tiến hành hiệu chỉnh

- **Tại điểm "0":** Chọn chế độ hiệu chuẩn zero trên PTĐ, nhúng đầu đo DO vào cốc đựng dung dịch DO 0 mg/L. Tiến hành các thao tác hiệu chỉnh theo hướng dẫn của nhà sản xuất tùy theo từng loại thiết bị khác nhau.
- **Tại điểm bão hòa:** Sử dụng điểm chuẩn bão hòa đã được chuẩn bị và giữ ổn định tại nhiệt độ (25 ± 0,5) °C. Tiến hành các thao tác hiệu chỉnh theo hướng dẫn của nhà sản xuất tùy theo từng loại thiết bị khác nhau.

> **Chú ý:**
> - Quá trình hiệu chỉnh cần tuân thủ theo hướng dẫn của nhà sản xuất;
> - Đối với PTĐ cần hiệu chuẩn không thể tiến hành hiệu chỉnh được hoặc khách hàng không yêu cầu hiệu chỉnh thì bỏ qua bước 7.3.1 và thực hiện bước tiếp theo.

#### 7.3.2. Tiến hành hiệu chuẩn

##### 7.3.2.1. Kiểm tra điểm "0"

- Đo giá trị nồng độ oxy hòa tan của dung dịch "0". Tiến hành đo lặp lại tối thiểu 3 lần liên tiếp điểm "0" bằng PTĐ cần hiệu chuẩn và ghi kết quả đo vào biên bản Phụ lục 02.

##### 7.3.2.2. Kiểm tra sai số

- Đặt cố định đầu đo của PTĐ và thiết bị chuẩn vào cốc chứa dung dịch đã được làm bão hoà oxy. Tiến hành đo lặp lại tại mỗi điểm đo tối thiểu 03 lần liên tiếp giá trị oxy hoà tan bằng PTĐ nồng độ oxy hòa tan chuẩn và PTĐ, ghi kết quả đo được vào biên bản ở Phụ lục 02.
- Tiến hành đo các điểm nồng độ oxy hoà tan bão hoà được chuẩn bị như trong Mục 6. Đầu đo của PTĐ và đầu đo của PTĐ nồng độ oxy hòa tan được ngâm trong dung dịch tối thiểu 10 phút. Tại mỗi điểm đo lặp lại tối thiểu 03 lần liên tiếp. Ghi kết quả đo được vào biên bản ở Phụ lục 02.

##### 7.3.2.3. Kiểm tra độ lặp lại

- Chọn điểm nồng độ "0" và 01 điểm nồng độ oxy hòa tan tại nhiệt độ như đã chuẩn bị ở mục 6.
- Tiến hành đo lặp lại tối thiểu 7 lần liên tiếp. Ghi kết quả vào biên bản Phụ lục 02.

#### 7.3.3. Tính toán độ không đảm bảo đo

##### 7.3.3.1. Các yếu tố gây ra ĐKĐB bao gồm

- PTĐ DO cần hiệu chuẩn: đặc tính kỹ thuật do nhà sản xuất cung cấp, số liệu đo đạc lần trước;
- PTĐ DO chuẩn dùng để kiểm tra nồng độ dung dịch điểm 0 và dung dịch bão hòa;
- Điều kiện môi trường trong phòng đo/hiệu chuẩn (nhiệt độ, độ ẩm);
- Nhân viên đo/hiệu chuẩn;
- Một số ảnh hưởng ngẫu nhiên khác.

##### 7.3.3.2. Tính toán ĐKĐB của các yếu tố ảnh hưởng tại tất cả các điểm hiệu chuẩn

**a. Thành phần ĐKĐB do độ lặp lại**

$$
u_A = \frac{s}{\sqrt{n}}
$$

$$
s = \sqrt{\frac{1}{n-1}\sum_{k=1}^{n}(C_k - \bar{C})^2}
$$

- `u_A`: ĐKĐB do độ lặp lại;
- `s`: độ lệch chuẩn thực nghiệm sau n lần đo;
- `n`: số lần thực hiện đo;
- `C_k`: giá trị đo được ở lần thứ k;
- `C̄`: giá trị trung bình của n lần đo.

**b. Thành phần ĐKĐB của thiết bị chuẩn**

$$
u_{B1} = \frac{a}{k} \quad (a: \text{ĐKĐB của thiết bị chuẩn},\; k: \text{hệ số bao phủ})
$$

**c. Thành phần ĐKĐB do ảnh hưởng nhiệt độ của bể điều nhiệt**

- Nếu giấy chứng nhận cung cấp độ ổn định (b) của bể điều nhiệt:

$$
u_{B2} = \frac{b}{\sqrt{3}}\left(\frac{\Delta_{DO}}{\Delta_t}\right)
$$

- Nếu giấy chứng nhận chỉ cung cấp ĐKĐB (c) của bể điều nhiệt:

$$
u_{B2} = \frac{c}{2}\left(\frac{\Delta_{DO}}{\Delta_t}\right)
$$

`(Δ_DO/Δ_t)`: Giá trị DO thay đổi theo nhiệt độ tính trên 1 °C.

**d. Thành phần ĐKĐB do thiết bị kiểm tra nhiệt độ dung dịch chuẩn**

$$
u_{B3} = \frac{d}{2}\left(\frac{\Delta_{DO}}{\Delta_t}\right)
$$

- `d`: ĐKĐB của PTĐ kiểm tra nhiệt độ dung dịch chuẩn;
- `(Δ_DO/Δ_t)`: Giá trị DO thay đổi theo nhiệt độ tính trên 1 °C.

**e. Thành phần ĐKĐB do độ phân giải của PTĐ cần hiệu chuẩn**

$$
u_{B4} = \frac{e}{2\sqrt{3}}
$$

- `e`: Độ phân giải của PTĐ cần hiệu chuẩn.

**Tính toán ĐKĐB tổng hợp**

$$
u_C = \sqrt{u_A^2 + u_{B1}^2 + u_{B2}^2 + u_{B3}^2 + u_{B4}^2}
$$

**ĐKĐB mở rộng**

$$
U = k \cdot u_C
$$

Với `k` là hệ số bao phủ, hệ số bằng số được sử dụng như là bội của ĐKĐB tổng hợp để đưa ra ĐKĐB mở rộng, thường được chọn k = 2 với mức tin cậy xấp xỉ 95 %.

## 8. Xử lý chung

- **8.1.** Phương tiện đo DO sau khi hiệu chuẩn được dán tem, cấp giấy chứng nhận hiệu chuẩn kèm theo kết quả hiệu chuẩn.
- **8.2.** Chu kỳ hiệu chuẩn được khuyến nghị là 01 năm.

## 9. Phụ lục

Biên bản hiệu chuẩn PTĐ oxy hoà tan (`ETV.MCW.F 06.01`).

---

## PHỤ LỤC 01

**Bảng A.3** — Độ hòa tan của oxy trong nước cân bằng với nước bão hòa trong không khí ở áp suất khí quyển (1013 hPa) với độ muối nêu trong Bảng A.1 Phụ lục A, ISO 5814:2012 *(TCVN 7325:2016 — Chất lượng nước - Xác định oxy hòa tan)*

| Nhiệt độ (°C) | Độ muối 0 | Độ muối 9 | Độ muối 18 | Độ muối 27 | Độ muối 36 |
| ------------- | --------- | --------- | ---------- | ---------- | ---------- |
|               | *Oxy hòa tan (mg/L)* |  |  |  |  |
| 0             | 14,62     | 13,73     | 12,89      | 12,11      | 11,37      |
| 1,0           | 14,22     | 13,36     | 12,55      | 11,79      | 11,08      |
| 2,0           | 13,83     | 13,00     | 12,22      | 11,49      | 10,80      |
| 3,0           | 13,46     | 12,66     | 11,91      | 11,20      | 10,54      |
| 4,0           | 13,11     | 12,34     | 11,61      | 10,93      | 10,28      |
| 5,0           | 12,77     | 12,03     | 11,33      | 10,66      | 10,04      |
| 6,0           | 12,45     | 11,73     | 11,05      | 10,41      | 9,81       |
| 7,0           | 12,14     | 11,44     | 10,79      | 10,17      | 9,58       |
| 8,0           | 11,84     | 11,17     | 10,54      | 9,94       | 9,37       |
| 9,0           | 11,56     | 10,91     | 10,29      | 9,71       | 9,16       |
| 10,0          | 11,29     | 10,66     | 10,06      | 9,50       | 8,97       |
| 11,0          | 11,03     | 10,42     | 9,84       | 9,29       | 8,78       |
| 12,0          | 10,78     | 10,19     | 9,63       | 9,09       | 8,59       |
| 13,0          | 10,54     | 9,96      | 9,42       | 8,90       | 8,42       |
| 14,0          | 10,31     | 9,75      | 9,22       | 8,72       | 8,25       |
| 15,0          | 10,08     | 9,54      | 9,03       | 8,55       | 8,09       |
| 16,0          | 9,87      | 9,35      | 8,85       | 8,38       | 7,93       |
| 17,0          | 9,67      | 9,15      | 8,67       | 8,21       | 7,78       |
| 18,0          | 9,47      | 8,97      | 8,50       | 8,05       | 7,63       |
| 19,0          | 9,28      | 8,79      | 8,34       | 7,90       | 7,49       |
| 20,0          | 9,09      | 8,62      | 8,18       | 7,75       | 7,35       |
| 21,0          | 8,92      | 8,46      | 8,02       | 7,61       | 7,22       |
| 22,0          | 8,74      | 8,30      | 7,88       | 7,47       | 7,09       |
| 23,0          | 8,58      | 8,14      | 7,73       | 7,34       | 6,97       |
| 24,0          | 8,42      | 8,00      | 7,59       | 7,21       | 6,85       |
| 25,0          | 8,26      | 7,85      | 7,46       | 7,09       | 6,73       |
| 26,0          | 8,11      | 7,71      | 7,33       | 6,97       | 6,62       |
| 27,0          | 7,97      | 7,58      | 7,20       | 6,85       | 6,51       |
| 28,0          | 7,83      | 7,45      | 7,08       | 6,73       | 6,40       |
| 29,0          | 7,69      | 7,32      | 6,96       | 6,62       | 6,30       |
| 30,0          | 7,56      | 7,20      | 6,85       | 6,52       | 6,20       |
| 31,0          | 7,43      | 7,07      | 6,74       | 6,41       | 6,10       |
| 32,0          | 7,31      | 6,96      | 6,63       | 6,31       | 6,01       |
| 33,0          | 7,18      | 6,84      | 6,52       | 6,21       | 5,92       |
| 34,0          | 7,07      | 6,73      | 6,42       | 6,11       | 5,83       |
| 35,0          | 6,95      | 6,63      | 6,32       | 6,02       | 5,74       |
| 36,0          | 6,84      | 6,52      | 6,22       | 5,93       | 5,65       |
| 37,0          | 6,73      | 6,42      | 6,12       | 5,84       | 5,57       |
| 38,0          | 6,62      | 6,32      | 6,03       | 5,75       | 5,48       |
| 39,0          | 6,52      | 6,22      | 5,93       | 5,66       | 6,40 [^a3] |
| 40,0          | 6,41      | 6,12      | 5,84       | 5,58       | 5,32       |
| 41,0          | 6,31      | 6,03      | 5,75       | 5,50       | 5,25       |
| 42,0          | 6,21      | 5,94      | 5,67       | 5,41       | 5,17       |
| 43,0          | 6,12      | 5,84      | 5,58       | 5,33       | 5,09       |
| 44,0          | 6,02      | 5,75      | 5,50       | 5,25       | 5,02       |
| 45,0          | 5,93      | 5,67      | 5,42       | 5,18       | 4,95       |

[^a3]: Bản gốc in "6,40" tại ô (39,0 °C; độ muối 36) — giá trị này phá vỡ xu hướng giảm đơn điệu của cột (giữa 5,48 và 5,32), gần như chắc chắn là lỗi in của bản gốc, giá trị đúng theo ISO 5814:2012 là **5,40**. Giữ nguyên văn và đánh dấu; cần đối chiếu bản tiêu chuẩn gốc khi ban hành lại.

**Ví dụ:**

| Đại lượng | Giá trị |
| --- | --- |
| Nhiệt độ của phép đo | 20 °C |
| Độ dẫn điện được đo | 0,87 S/m (20 °C) |
| Độ muối (Bảng A.1) | 6 |
| Oxy hòa tan (20 °C), độ muối 0 (Bảng A.3) | 9,09 mg/L |
| Oxy hòa tan (20 °C), độ muối 9 (Bảng A.3) | 8,62 mg/L |
| Giá trị thặng dư | (9,09 mg/L − 8,62 mg/L)/9 = 0,0522 mg/L |
| Oxy hòa tan tại độ muối được nêu | 9,09 mg/L − (0,0522 mg/L × 6) = 8,8 mg/L |

**Bảng A.1** — Sự tương quan giữa độ dẫn điện và độ muối

| Độ dẫn điện (S/m) ᵇ | Giá trị độ muối ᵃ | Độ dẫn điện (S/m) ᵇ | Giá trị độ muối ᵃ | Độ dẫn điện (S/m) ᵇ | Giá trị độ muối ᵃ |
| --- | --- | --- | --- | --- | --- |
| 0,5 | 3  | 2,0 | 13 | 3,5 | 25 |
| 0,6 | 4  | 2,1 | 14 | 3,6 | 25 |
| 0,7 | 4  | 2,2 | 15 | 3,7 | 26 |
| 0,8 | 5  | 2,3 | 15 | 3,8 | 27 |
| 0,9 | 6  | 2,4 | 16 | 3,9 | 28 |
| 1,0 | 6  | 2,5 | 17 | 4,0 | 29 |
| 1,1 | 7  | 2,6 | 18 | 4,2 | 30 |
| 1,2 | 8  | 2,7 | 18 | 4,4 | 32 |
| 1,3 | 8  | 2,8 | 19 | 4,6 | 33 |
| 1,4 | 9  | 2,9 | 20 | 4,8 | 35 |
| 1,5 | 10 | 3,0 | 21 | 5,0 | 37 |
| 1,6 | 10 | 3,1 | 22 | 5,2 | 38 |
| 1,7 | 11 | 3,2 | 22 | 5,4 | 40 |
| 1,8 | 12 | 3,3 | 23 | —   | —  |
| 1,9 | 13 | 3,4 | 24 | —   | —  |

ᵃ Độ muối đo được từ độ dẫn điện ở 20 °C.
ᵇ 1 S/m = 10 mmhos/cm.

---

## PHỤ LỤC 02

Biên bản hiệu chuẩn phương tiện đo nồng độ oxy hòa tan (`ETV.MCW.F 06.01`).

---

## TÀI LIỆU THAM KHẢO

- **ISO/IEC 17025:2017** — Yêu cầu chung về năng lực của phòng thử nghiệm và hiệu chuẩn;
- **ĐLVN 131:2003** — Hướng dẫn đánh giá độ không đảm bảo đo;
- **TCVN 7325:2004 (ISO 5814:1990)** — Chất lượng nước - Xác định oxy hòa tan - Phương pháp đầu đo điện hóa;
- **TCVN 7324:2004 (ISO 5813:1983)** — Chất lượng nước - Xác định oxy hoà tan - Phương pháp iod;
- **ĐLVN 276:2014** — Phương tiện đo nồng độ oxy hòa tan - Quy trình kiểm định;
- **ĐLVN 385:2021** — Phương tiện đo nồng độ oxy hòa tan của trạm quan trắc môi trường nước - Quy trình kiểm định;
- Hướng dẫn sử dụng PTĐ oxy hòa tan.
