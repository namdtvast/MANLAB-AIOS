---
id: ETV.MCW 02
title: "Phương tiện đo độ dẫn điện (EC) — Quy trình hiệu chuẩn"
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
keywords: [độ dẫn điện, EC, conductivity, hiệu chuẩn, dung dịch chuẩn EC, quan trắc môi trường nước, độ không đảm bảo đo]
related_documents: ["ETV.MCW.F 02.01"]
iso_clause: ["ISO/IEC 17025:2017"]
legal_basis: ["ĐLVN 131:2003", "ĐLVN 274:2014", "ĐLVN 383:2021"]
ai_tags: [calibration-procedure, conductivity-meter, water-quality, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCW 02_EC_V4.pdf`"
supersedes: "ETV.MCW 02 lần ban hành 02 (22/04/2023)"
superseded_by: null
---
# PHƯƠNG TIỆN ĐO ĐỘ DẪN ĐIỆN – QUY TRÌNH HIỆU CHUẨN

*Conductivity meter – Calibration procedure*

|                   |                |
| ----------------- | -------------- |
| **Mã số**         | ETV.MCW 02     |
| **Lần ban hành**  | 03             |
| **Ngày ban hành** | 22/04/2026     |
| **Biên soạn**     | Nguyễn Văn Đồng |
| **Soát xét**      | Trần Thị Hoa |
| **Phê duyệt**     | Nguyễn Hoàng Giang |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCW 02_EC_V4.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khi có khác biệt, bản PDF do Viện ban hành là bản có giá trị áp dụng.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian  | Nội dung thay đổi                        | Lần ban hành |
| ---------- | ---------------------------------------- | ------------ |
| 22/04/2019 | Ban hành lần thứ nhất                    | 01           |
| 22/04/2023 | Ban hành lần hai (theo chuyên gia BoA)   | 02           |
| 22/04/2026 | Ban hành lần ba                          | 03           |

---

## 1. Phạm vi áp dụng

Văn bản kỹ thuật này quy định quy trình hiệu chuẩn phương tiện đo (PTĐ) độ dẫn điện, bao gồm các phương tiện đo thông dụng và trong hoạt động quan trắc môi trường nước (nước mặt; nước thải; nước biển; nước ngầm…) ngoài hiện trường và trong phòng thí nghiệm, có phạm vi đo (0 ÷ 500) mS/cm và sai số/độ không đảm bảo đo lớn nhất ± 0,63 %.

Quy trình này áp dụng đối với nhân viên của Viện Kiểm định Công nghệ và Môi trường (sau đây gọi tắt là PTN) khi hiệu chuẩn PTĐ nêu trên.

## 2. Thuật ngữ và định nghĩa

Các từ ngữ trong văn bản này được hiểu như sau:

- **2.1. Độ dẫn điện của chất lỏng:** là khả năng của môi trường nước cho phép sự di chuyển của các hạt điện tích qua nó khi có lực tác động vào các hạt như lực tĩnh điện của điện trường. Sự di chuyển này tạo thành dòng điện và cơ chế của chuyển động này phụ thuộc vào vật chất. Độ dẫn điện là nghịch đảo của điện trở (Ohm).
- **2.2. Dung dịch chuẩn EC được chứng nhận:** là loại chất chuẩn thể lỏng có độ dẫn điện xác định và được cơ quan có thẩm quyền chứng nhận.
- **2.3. Đơn vị đo:**
  - Đơn vị độ dẫn điện: S/m (Siemen trên mét);
  - Quy đổi: 1 S/m = 1.000 mS/m = 100.000 mS/cm = 100.000.000 µS/cm.

## 3. Các phép hiệu chuẩn

Phải lần lượt tiến hành các phép kiểm tra nêu trong Bảng 1.

**Bảng 1.**

| TT  | Tên phép hiệu chuẩn                          | Theo điều, mục của quy trình |
| --- | -------------------------------------------- | ---------------------------- |
| 1   | Kiểm tra bên ngoài                           | 7.1                          |
| 2   | Kiểm tra kỹ thuật                            | 7.2                          |
| 3   | Kiểm tra đo lường                            | 7.3                          |
| 3.1 | Kiểm tra trước hiệu chuẩn                    | 7.3.1                        |
|     | Đo trước hiệu chỉnh                          | a                            |
|     | Tiến hành hiệu chỉnh                         | b                            |
| 3.2 | Tiến hành hiệu chuẩn                         | 7.3.2                        |
|     | Kiểm tra sai số                              | a                            |
|     | Kiểm tra độ lặp lại                          | b                            |
|     | Kiểm tra độ ổn định theo thời gian (độ trôi) | c                            |
| 3.3 | Tính toán độ không đảm bảo đo                | 7.3.3                        |
| 4   | Xử lý chung                                  | 8                            |

## 4. Phương tiện hiệu chuẩn

Các phương tiện dùng để hiệu chuẩn được nêu trong Bảng 2.

**Bảng 2.**

| TT  | Phương tiện hiệu chuẩn              | Đặc trưng kỹ thuật                                                                                                    |
| --- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 1   | **Chuẩn đo lường**                  |                                                                                                                         |
|     | Dung dịch chuẩn được chứng nhận     | - Các giá trị chuẩn phù hợp cho dải đo (0 ÷ 500) mS/cm<br>- Độ không đảm bảo đo không lớn hơn ½ độ chính xác của phương tiện đo cần hiệu chuẩn |
| 2   | **Phương tiện khác**                |                                                                                                                         |
| 2.1 | Bể ổn nhiệt                         | - Phạm vi đo: (-20 ÷ 200) °C<br>- Độ ổn định: ± 0,5 °C                                                                  |
| 2.2 | Thiết bị đo nhiệt độ                | - Phạm vi điều nhiệt từ (-20 ÷ 200) °C<br>- Độ chính xác: ± 0,5 °C                                                      |
| 2.3 | PTĐ nhiệt độ và độ ẩm môi trường    | - Dải đo: Nhiệt độ (0 ÷ 50) °C; Độ ẩm tương đối (25 ÷ 95) %RH<br>- Độ phân giải: Nhiệt độ 1 °C; Độ ẩm 1 %RH             |
| 3   | **Phương tiện phụ**                 |                                                                                                                         |
| 3.1 | Nước deion hoặc nước cất 2 lần      | - Giá trị độ dẫn nằm trong khoảng: (0,055 ÷ 2) µS/cm                                                                    |
| 3.2 | Cốc mỏ                              |                                                                                                                         |
| 3.3 | Nước cất                            |                                                                                                                         |
| 3.4 | Bình tia nước cất                   |                                                                                                                         |
| 3.5 | Giấy thấm                           |                                                                                                                         |

## 5. Điều kiện hiệu chuẩn

Khi tiến hành hiệu chuẩn phải đảm bảo các điều kiện sau:

- Nhiệt độ: (25 ± 5) °C;
- Độ ẩm tương đối: ≤ 80 %RH (không đọng sương).

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành hiệu chuẩn phải thực hiện các công việc chuẩn bị sau đây:

- Chọn 03 dung dịch chuẩn phù hợp với dải đo của PTĐ và phạm vi được công nhận. Các điểm lựa chọn có thể thay đổi tùy thuộc theo từng loại máy, theo hướng dẫn vận hành của nhà sản xuất hoặc theo yêu cầu của khách hàng.
- Đổ dung dịch chuẩn thứ nhất vào trong cốc (lượng dung dịch chuẩn có thể điều chỉnh tăng lên để phù hợp với các loại đầu đo có kích thước lớn hơn, để đầu đo có thể nhúng chìm hoàn toàn trong dung dịch chuẩn). Tiến hành tương tự với hai dung dịch chuẩn còn lại.
- PTĐ độ dẫn điện cần hiệu chuẩn và dung dịch chuẩn phải được đặt trong phòng hiệu chuẩn tối thiểu 01 giờ trước khi tiến hành hiệu chuẩn.
- Dung dịch chuẩn được giữ ổn nhiệt tại (25 ± 0,5) °C bằng bể ổn nhiệt.
- Trước khi tiến hành hiệu chuẩn, đầu đo của PTĐ phải được làm sạch với dung môi thích hợp tuỳ thuộc vào vật liệu chế tạo đầu đo, theo hướng dẫn của nhà sản xuất ghi trong tài liệu kỹ thuật, sau đó rửa lại bằng nước cất.

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

Phải kiểm tra bên ngoài theo các yêu cầu sau đây:

Kiểm tra bằng mắt để xác định sự phù hợp của PTĐ đối với các yêu cầu quy định trong tài liệu kỹ thuật, hình dáng kích thước, ký nhãn hiệu, nguồn nuôi, hiển thị, tài liệu và phụ kiện kèm theo.

### 7.2. Kiểm tra kỹ thuật

Phải kiểm tra kỹ thuật theo các yêu cầu sau đây:

Kiểm tra trạng thái hoạt động bình thường của PTĐ theo hướng dẫn sử dụng của nhà sản xuất.

### 7.3. Kiểm tra đo lường

#### 7.3.1. Kiểm tra trước hiệu chuẩn

Hoạt động này không bắt buộc; chỉ thực hiện khi PTĐ sai lệch lớn hoặc theo yêu cầu của khách hàng và PTĐ có thể hiệu chỉnh.

**a. Đo trước hiệu chỉnh**

- Nhúng đầu đo của PTĐ độ dẫn cần hiệu chuẩn vào cốc đựng dung dịch chuẩn thứ 1. Tiến hành đo và ghi lại các giá trị vào biên bản theo Phụ lục 01.
- Rửa sạch đầu đo và làm khô bằng giấy mềm.
- Nhúng đầu đo của PTĐ độ dẫn cần hiệu chuẩn vào cốc đựng dung dịch chuẩn thứ 2. Tiến hành đo và ghi giá trị đo vào biên bản ở Phụ lục 01.
- Rửa sạch đầu điện cực và làm khô bằng giấy mềm.
- Đối với dung dịch chuẩn thứ 3, tiến hành các thao tác tương tự như 2 dung dịch trên.

**b. Tiến hành hiệu chỉnh**

- Lựa chọn chế độ hiệu chỉnh trên PTĐ EC cần hiệu chuẩn và tiến hành hiệu chỉnh PTĐ bằng các dung dịch chuẩn theo hướng dẫn của nhà sản xuất. Ghi lại thông tin về quá trình hiệu chỉnh vào biên bản theo Phụ lục 01.
- Sau mỗi lần đo cần rửa sạch đầu đo bằng nước cất và làm khô bằng giấy mềm.
- Đối với PTĐ cần hiệu chuẩn không thể tiến hành hiệu chỉnh được hoặc khách hàng không yêu cầu hiệu chỉnh thì bỏ qua bước 7.3.1 và thực hiện bước tiếp theo.

#### 7.3.2. Tiến hành hiệu chuẩn

**a. Kiểm tra sai số**

- Chọn 03 dung dịch chuẩn như trong mục 6 để tiến hành kiểm tra sai số của PTĐ.
- Đo giá trị độ dẫn điện của các dung dịch chuẩn tại nhiệt độ (25 ± 0,1) °C, đợi giá trị hiển thị trên PTĐ ổn định trong (1 ÷ 2) phút. Đọc kết quả đo tối thiểu 3 lần liên tiếp và ghi lại các giá trị vào biên bản theo Phụ lục 01.
- Lặp lại quy trình đo như trên đối với 2 dung dịch chuẩn còn lại.

**b. Kiểm tra độ lặp lại**

- Đo giá trị độ dẫn điện của 3 dung dịch chuẩn tại nhiệt độ (25 ± 0,1) °C, mỗi dung dịch chuẩn đo lặp lại 7 lần. Ghi kết quả đo vào biên bản Phụ lục 01.

**c. Kiểm tra độ ổn định theo thời gian (độ trôi)**

- Chọn 01 dung dịch chuẩn như trong mục 6 để tiến hành kiểm tra độ ổn định. Đo giá trị độ dẫn điện của dung dịch chuẩn tại nhiệt độ (25 ± 0,1) °C. Thực hiện đo 03 lần, mỗi lần cách nhau 02 giờ. Ghi kết quả đo vào biên bản Phụ lục 01.

#### 7.3.3. Tính toán độ không đảm bảo đo (ĐKĐB)

##### 7.3.3.1. Các yếu tố gây ra ĐKĐB bao gồm

- PTĐ độ dẫn cần hiệu chuẩn: đặc tính kỹ thuật do nhà sản xuất cung cấp, số liệu đo đạc lần trước;
- Điều kiện môi trường trong phòng đo/hiệu chuẩn (nhiệt độ, độ ẩm);
- Dung dịch chuẩn;
- Sai lệch về nhiệt độ của dung dịch chuẩn;
- Nhân viên đo/hiệu chuẩn;
- Một số ảnh hưởng ngẫu nhiên khác.

##### 7.3.3.2. Tính toán ĐKĐB của các yếu tố ảnh hưởng tại tất cả các điểm hiệu chuẩn

**a. Thành phần ĐKĐB do độ lặp lại**

Tính ĐKĐB do độ lặp lại trong bước kiểm tra độ chính xác của thiết bị tại các nồng độ dung dịch chuẩn.

$$
u_A = \frac{s}{\sqrt{n}}
$$

$$
s = \sqrt{\frac{1}{n-1}\sum_{k=1}^{n}(q_k - \bar{q})^2}
$$

- `u_A`: ĐKĐB do độ lặp lại;
- `s`: độ lệch chuẩn thực nghiệm sau n lần đo;
- `n`: số lần thực hiện đo;
- `q_k`: giá trị đo được ở lần thứ k;
- `q̄`: giá trị trung bình của n lần đo.

**b. Thành phần ĐKĐB do dung dịch chuẩn**

- Nếu giấy chứng nhận cung cấp độ chính xác của dung dịch chuẩn:

  $$
  u_{B1} = \frac{a}{\sqrt{3}} \quad (a: \text{Độ chính xác của dung dịch chuẩn})
  $$

- Nếu giấy chứng nhận cung cấp ĐKĐB của dung dịch chuẩn:

  $$
  u_{B1} = \frac{a}{k} \quad (a: \text{ĐKĐB của dung dịch chuẩn},\; k: \text{hệ số bao phủ})
  $$

**c. Thành phần ĐKĐB do ảnh hưởng nhiệt độ của bể điều nhiệt**

- Nếu giấy chứng nhận cung cấp độ ổn định (b) của bể điều nhiệt:

  $$
  u_{B2} = \frac{b}{\sqrt{3}}\left(\frac{\Delta_{EC}}{\Delta_t}\right)
  $$

- Nếu giấy chứng nhận chỉ cung cấp ĐKĐB (c) của bể điều nhiệt:

  $$
  u_{B2} = \frac{c}{2}\left(\frac{\Delta_{EC}}{\Delta_t}\right)
  $$

`(Δ_EC/Δ_t)`: Giá trị EC thay đổi theo nhiệt độ tính trên 1 °C.

**d. Thành phần ĐKĐB do nhiệt kế kiểm tra nhiệt độ**

$$
u_{B3} = \frac{d}{2}\left(\frac{\Delta_{EC}}{\Delta_t}\right)
$$

- `d`: ĐKĐB của PTĐ kiểm tra nhiệt độ dung dịch chuẩn;
- `(Δ_EC/Δ_t)`: Giá trị EC thay đổi theo nhiệt độ tính trên 1 °C.

**e. Thành phần ĐKĐB do độ phân giải của PTĐ cần hiệu chuẩn**

$$
u_{B4} = \frac{e}{2\sqrt{3}}
$$

- `e`: Độ phân giải của PTĐ cần hiệu chuẩn.

**f. Thành phần ĐKĐB do độ trôi của PTĐ cần hiệu chuẩn**

$$
u_{B5} = \frac{\max \Delta_{EC}}{2\sqrt{3}}
$$

- `max Δ_EC`: Độ trôi lớn nhất so với kết quả đo lần 1 của PTĐ cần hiệu chuẩn.

**Tính toán ĐKĐB tổng hợp**

$$
u_C = \sqrt{u_A^2 + u_{B1}^2 + u_{B2}^2 + u_{B3}^2 + u_{B4}^2 + u_{B5}^2}
$$

**ĐKĐB mở rộng**

$$
U = k \cdot u_C
$$

Với `k` là hệ số bao phủ, hệ số bằng số được sử dụng như là bội của ĐKĐB tổng hợp để đưa ra ĐKĐB mở rộng, thường được chọn k = 2 với mức tin cậy xấp xỉ 95 %.

## 8. Xử lý chung

- **8.1.** PTĐ độ dẫn điện sau khi hiệu chuẩn được dán tem, cấp giấy chứng nhận hiệu chuẩn kèm theo thông báo kết quả hiệu chuẩn.
- **8.2.** Chu kỳ hiệu chuẩn được khuyến nghị là 01 năm.

## 9. Phụ lục

Phụ lục 01 — Biên bản hiệu chuẩn PTĐ độ dẫn điện (`ETV.MCW.F 02.01`).

---

## TÀI LIỆU THAM KHẢO

- **ISO/IEC 17025** — Yêu cầu chung về năng lực của phòng thử nghiệm và hiệu chuẩn;
- **ĐLVN 131:2003** — Hướng dẫn đánh giá độ không đảm bảo đo;
- **ĐLVN 274:2014** — Phương tiện đo độ dẫn điện - Quy trình kiểm định;
- **ĐLVN 383:2021** — Phương tiện đo độ dẫn điện của trạm quan trắc môi trường nước - Quy trình kiểm định;
- Hướng dẫn sử dụng PTĐ độ dẫn điện của các hãng thiết bị.
