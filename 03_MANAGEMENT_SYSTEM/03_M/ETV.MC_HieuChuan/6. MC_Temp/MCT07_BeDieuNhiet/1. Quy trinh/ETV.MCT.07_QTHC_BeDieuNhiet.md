---
id: ETV.MCT 07
title: "Bể điều nhiệt — Quy trình hiệu chuẩn"
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
revision: "03"
status: Da-ban-hanh
keywords: [bể điều nhiệt, liquid bath, độ ổn định, độ đồng đều, ITS-90, hiệu chuẩn]
related_documents: []
iso_clause: ["ISO/IEC 17025:2017"]
legal_basis: ["ĐLVN 113:2003", "ĐLVN 138:2004", "ĐLVN 127:2003", "ĐLVN 131:2003", "VMI-CP 17:2013"]
ai_tags: [calibration-procedure, liquid-bath, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCT 07_Be dieu nhiet.pdf`"
supersedes: "ETV.MCT 07 lần ban hành 02 (19/05/2020, sửa đổi 22/04/2023)"
superseded_by: null
---
# BỂ ĐIỀU NHIỆT – QUY TRÌNH HIỆU CHUẨN

*Liquid Bath – Calibration Procedure*

|                   |                     |
| ----------------- | ------------------- |
| **Mã số**         | ETV.MCT 07          |
| **Lần ban hành**  | 03                  |
| **Ngày ban hành** | 22/04/2026          |
| **Biên soạn**     | *(bản gốc để trống)* |
| **Soát xét**      | Trần Thị Hoa        |
| **Phê duyệt**     | Nguyễn Hoàng Giang  |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCT 07_Be dieu nhiet.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khối chữ ký trong bản gốc để trống, chưa có tên người biên soạn.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian  | Nội dung thay đổi                          | Lần ban hành |
| ---------- | ---------------------------------------------- | ------------ |
| 19/05/2020 | Ban hành lần thứ nhất                          | 01           |
| 22/04/2023 | Sửa đổi theo ý kiến của chuyên gia đánh giá    | 02           |
| 22/04/2026 | Ban hành lần thứ ba                            | 03           |

---

## 1. Phạm vi áp dụng

Văn bản kỹ thuật này quy định quy trình hiệu chuẩn các loại bể ổn nhiệt, bể điều hòa nhiệt độ, bể ổn định nhiệt độ, bể cách thủy (sau đây gọi chung là bể điều nhiệt) trong dải nhiệt độ từ -20 °C đến 200 °C theo Thang nhiệt độ quốc tế 1990 (ITS-90).

Quy trình này áp dụng đối với nhân viên của Viện Kiểm định Công nghệ và Môi trường (sau đây gọi tắt là PTN) khi hiệu chuẩn PTĐ nói trên.

## 2. Giải thích từ ngữ

Các từ ngữ trong văn bản này được hiểu như sau:

- **Bể điều nhiệt:** là thiết bị dùng để duy trì nhiệt độ môi trường thông qua chất lỏng tại một mức không đổi.
- **Hiệu chuẩn:** là hoạt động xác định, thiết lập mối quan hệ giữa giá trị đo của chuẩn đo lường, phương tiện đo với giá trị đo của đại lượng cần đo.
- **Hiệu chỉnh:** là tập hợp các thao tác được tiến hành trên hệ thống đo để cho ra số chỉ đã quy định tương ứng với giá trị đã cho của đại lượng được đo.
- **Độ không đảm bảo đo (ĐKĐB):** thông số gắn với kết quả của phép đo, đặc trưng cho sự phân tán của các giá trị có thể quy cho đại lượng đo một cách hợp lý.

## 3. Các phép hiệu chuẩn

Phải lần lượt tiến hành các phép kiểm tra ghi trong Bảng 1.

**Bảng 1**

| TT  | Tên phép hiệu chuẩn                                | Theo điều, mục của quy trình |
| --- | -------------------------------------------------------- | -------------------------------- |
| 1   | Kiểm tra bên ngoài                                        | 7.1                               |
| 2   | Kiểm tra kỹ thuật                                         | 7.2                               |
| 3   | Kiểm tra đo lường — xác định số hiệu chính của bể điều nhiệt | 7.3.4.1                       |
|     | — xác định độ ổn định                                     | 7.3.4.2                           |
|     | — xác định độ đồng đều                                    | 7.3.4.3                           |
| 4   | Tính toán độ không đảm bảo đo                             | 7.4                               |
| 5   | Xử lý chung                                               | 8                                 |

## 4. Phương tiện phục vụ hiệu chuẩn

Phương tiện hiệu chuẩn được ghi trong Bảng 2.

**Bảng 2**

| TT  | Phương tiện hiệu chuẩn              | Đặc trưng kỹ thuật                                                                                                                          |
| --- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Chuẩn đo lường**                     | Các chuẩn đo lường phải được liên kết chuẩn theo quy định và độ không đảm bảo đo của tổ hợp chuẩn so với bể điều nhiệt phải thỏa mãn tỉ số truyền chuẩn ≤ 1/3 |
| 1.1 | Nhiệt kế chuẩn                         | Phạm vi đo phù hợp với dải đo làm việc của bể điều nhiệt; độ không đảm bảo đo phù hợp với dẫn xuất chuẩn và liên kết chuẩn với hệ thống chuẩn quốc gia |
| 1.2 | Thiết bị chỉ thị chuẩn                 | Phạm vi đo phù hợp với dải đo làm việc của bể điều nhiệt; độ phân giải ≤ 0,1 °C; độ không đảm bảo đo của tổ hợp chuẩn so với thiết bị thỏa mãn tỉ số truyền chuẩn ≤ 1/3 |
| 2   | **Phương tiện khác**                   |                                                                                                                                                    |
| 2.1 | Thiết bị đo nhiệt độ và độ ẩm môi trường | Dải đo: Nhiệt độ (0 ÷ 50) °C; Độ ẩm tương đối (20 ÷ 95) %RH. Độ phân giải: Nhiệt độ 1 °C; Độ ẩm 1 %RH; liên kết chuẩn với hệ thống chuẩn quốc gia |
| 3   | **Phương tiện phụ**                    |                                                                                                                                                    |
| 3.1 | Đồng hồ đo thời gian                   | —                                                                                                                                                  |
| 3.2 | Găng tay, dung dịch làm sạch, vải cotton | —                                                                                                                                                |
| 3.3 | Hệ thống gá lắp nhiệt kế               | —                                                                                                                                                  |

## 5. Điều kiện hiệu chuẩn

Khi tiến hành hiệu chuẩn phải đảm bảo các điều kiện sau đây:

- Nhiệt độ: (25 ± 5) °C;
- Độ ẩm tương đối: (40 ÷ 70) %RH.

> *Lưu ý:* Điều kiện môi trường hiệu chuẩn hiện trường chỉ cần thoả mãn với yêu cầu sử dụng của nhiệt kế cần hiệu chuẩn.

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành hiệu chuẩn phải thực hiện các công việc chuẩn bị sau đây:

- Kiểm tra tình trạng hoạt động của bể điều nhiệt theo hướng dẫn sử dụng của nhà sản xuất;
- Đặt các đầu đo của nhiệt kế chuẩn vào bể điều nhiệt, có thể đưa các đầu đo theo lối vào có sẵn của bể điều nhiệt, sau đó dùng vật liệu cách nhiệt lấp kín hoặc đưa các đầu đo theo cửa bể điều nhiệt nếu cửa có thể đóng kín được khi hoạt động;
- Các đầu đo nhiệt độ chuẩn được đặt cố định phân bố đều trong bể, phân bố theo các góc của một hình khối lăng trụ, các điểm đo không gian của đầu đo nhiệt độ chuẩn được đặt cách các thành của bể điều nhiệt một khoảng cách từ 50 mm đến 60 mm và 1 đầu đo nhiệt độ chuẩn được đặt cố định tại tâm hình học của bể (xem Hình 1);
- Lắp các đầu đo nhiệt độ chuẩn vào thiết bị chỉ thị (hoặc tự ghi) chuẩn theo đúng vị trí các kênh (xem số ghi trên đầu của đầu đo nhiệt độ chuẩn)/ghi nhiệt độ theo các kênh tương ứng.

*(Hình 1 trong bản gốc minh họa vị trí đặt các đầu đo cặp nhiệt điện theo các góc của hình khối lăng trụ — không tái tạo lại trong bản chuyển đổi này, xem bản PDF gốc.)*

Số lượng các đầu đo là 3, 5 hay 9 phụ thuộc vào thể tích của bể điều nhiệt:

- Thể tích buồng nhiệt ≤ 0,05 m³: số đầu đo nhiệt độ chuẩn là 3 hoặc 5;
- Thể tích buồng nhiệt > 0,05 m³: số đầu đo nhiệt độ chuẩn là 9.

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

Kiểm tra bằng mắt để xác định sự phù hợp của PTĐ đối với các yêu cầu quy định trong tài liệu kỹ thuật, hình dáng kích thước, ký nhãn hiệu, nguồn nuôi, hiển thị, tài liệu và phụ kiện kèm theo.

### 7.2. Kiểm tra kỹ thuật

Phải kiểm tra kỹ thuật theo các yêu cầu sau đây:

- Kiểm tra tình trạng hoạt động của bể điều nhiệt khi cung cấp điện áp danh định được ghi trên nhãn;
- Hệ điều khiển các chức năng hoạt động tốt;
- Bộ chỉ thị nhiệt độ hoạt động ổn định, không có hiện tượng thay đổi đột ngột, biến động. Đối với nhiệt kế chỉ thị hiện số, các số hiển thị phải rõ nét, không bị mờ hoặc mất nét. Đối với nhiệt kế chỉ thị tương tự, vạch chia phải còn đầy đủ, không bị nhòe hoặc mất chữ số, kim chỉ thị không bị ma sát hoặc kẹt kim;
- Các bộ phận khác của bể điều nhiệt hoạt động bình thường;
- Nếu bể điều nhiệt có cửa phải đảm bảo độ kín, không bị cong vênh, nứt vỡ;
- Nếu bể điều nhiệt có quạt đối lưu, kiểm tra quạt phải hoạt động bình thường.

### 7.3. Kiểm tra đo lường

Bể điều nhiệt cần hiệu chuẩn được kiểm tra đo lường theo trình tự nội dung, phương pháp và yêu cầu sau đây:

#### 7.3.1. Phương pháp

Kiểm tra đo lường được thực hiện bằng phương pháp so sánh trực tiếp giá trị nhiệt độ của PTĐ chuẩn với giá trị nhiệt độ của bể điều nhiệt cần hiệu chuẩn.

#### 7.3.2. Quy định chung

- **7.3.2.1.** Số điểm nhiệt độ kiểm tra phải được chia đều trong dải nhiệt độ (không ít hơn 03 điểm) hoặc theo yêu cầu của cơ sở sử dụng. Thực hiện hiệu chuẩn từ điểm nhiệt độ thấp đến điểm nhiệt độ cao.
- **7.3.2.2.** Các phép đo nhiệt độ được thực hiện khi nhiệt độ của nhiệt kế chuẩn và nhiệt độ của bể điều nhiệt đã ổn định trong 10 phút. Ghi kết quả đo không ít hơn 5 lần tại mỗi điểm nhiệt độ kiểm tra.

#### 7.3.3. Trình tự kiểm tra tại một điểm nhiệt độ

- **7.3.3.1.** Đặt nhiệt độ của bể điều nhiệt tương ứng với giá trị nhiệt độ đầu tiên cần hiệu chuẩn.
- **7.3.3.2.** Sau khi nhiệt độ đã ổn định (theo mục 7.3.2.2), đọc số chỉ nhiệt độ của bộ hiển thị bể điều nhiệt và số chỉ của các nhiệt kế chuẩn (từ nhiệt kế chuẩn ở vị trí 1 đến vị trí k). Trình tự đọc theo thứ tự:

  Bể điều nhiệt → ch1 → ch2 → ch3 … → chk → Bể điều nhiệt (ttn → t1 → t2 → t3 … → tk → ttn), với k = 3; 5 hoặc 9 theo thể tích của bể điều nhiệt.

  Trong đó: ch1, ch2 … chk là nhiệt kế chuẩn thứ 1, thứ 2, … thứ k (°C); t1, t2 … tk là nhiệt độ của nhiệt kế chuẩn thứ 1, thứ 2, … thứ k (°C); ttn là nhiệt độ đọc trên bộ chỉ thị của bể điều nhiệt (°C).

  Số lượt đọc tại mỗi điểm nhiệt độ kiểm tra không ít hơn 5 lần.

- **7.3.3.3.** Lần lượt tiến hành đo tương tự đối với các điểm nhiệt độ kiểm tra tiếp theo cho đến điểm nhiệt độ kiểm tra cuối cùng.

#### 7.3.4. Xử lý kết quả hiệu chuẩn

##### 7.3.4.1. Xác định số hiệu chính bể nhiệt

Số hiệu chính của bể tại mỗi điểm nhiệt độ kiểm tra được tính theo công thức:

$$
\Delta t = t_{ch} - t_{tn}
$$

Trong đó:

$$
t_{ch} = \frac{1}{k}\sum_{j=1}^{k} t_j
$$

`t_j`: giá trị trung bình của mỗi nhiệt kế chuẩn (chỉ thị chuẩn), tính theo công thức:

$$
t_j = \frac{1}{n}\sum_{i=1}^{n} (t_j \pm \partial t_j)_i
$$

Với `∂t_j`: số hiệu chính của nhiệt kế chuẩn thứ j tại điểm nhiệt độ kiểm tra (xem trong giấy chứng nhận hiệu chuẩn); `n`: số lần đo của mỗi nhiệt kế chuẩn tại mỗi điểm nhiệt độ kiểm tra.

`t_tn`: giá trị trung bình của chỉ thị bể điều nhiệt tại mỗi điểm nhiệt độ kiểm tra, tính theo công thức:

$$
t_{tn} = \frac{1}{n}\sum_{i=1}^{n} t_i
$$

##### 7.3.4.2. Xác định độ ổn định của bể điều nhiệt

Việc kiểm tra độ ổn định thiết bị cần kiểm tra tối thiểu trong thời gian 30 phút. Độ ổn định của bể điều nhiệt tại một điểm nhiệt độ được xác định như sau:

$$
\delta t_{od} = \pm \frac{1}{2} \max(t_{ch\ max,j} - t_{ch\ min,j})\quad j: 1,2,\ldots,k
$$

Trong đó: `δt_od`: độ ổn định của bể điều nhiệt tại nhiệt độ kiểm tra; `t_ch max,j`, `t_ch min,j`: nhiệt độ cao nhất và thấp nhất của nhiệt kế chuẩn thứ j tại điểm nhiệt độ kiểm tra.

##### 7.3.4.3. Xác định độ đồng đều của bể điều nhiệt

Độ đồng đều của bể điều nhiệt tại một điểm nhiệt độ được xác định như sau:

$$
\delta t_{dd} = \pm \frac{1}{2} \max[\max(t_{ch\ j}) - \min(t_{ch\ i})]\quad j \neq i;\ j,i: 1,2,\ldots,k
$$

Trong đó: `δt_dd`: độ đồng đều của bể điều nhiệt; `max(t_ch j)`, `min(t_ch i)`: nhiệt độ trung bình lớn nhất và nhỏ nhất trong k nhiệt kế chuẩn tại các vị trí đo khác nhau.

### 7.4. Tính toán độ không đảm bảo đo

#### 7.4.1. Các yếu tố gây ra ĐKĐBĐ bao gồm

- Thiết bị chuẩn nhiệt độ;
- Bể điều nhiệt cần hiệu chuẩn;
- Nhân viên đo/hiệu chuẩn.

#### 7.4.2. Tính toán ĐKĐB của các yếu tố ảnh hưởng tại tất cả các điểm hiệu chuẩn

ĐKĐB của phép hiệu chuẩn bể điều nhiệt được tính toán từ các nguồn gây ảnh hưởng đến các phép đo nhiệt độ khi hiệu chuẩn, được chia thành hai loại: độ không đảm bảo đo của tổ hợp chuẩn và độ không đảm bảo đo của bể điều nhiệt, tính toán trong toàn dải đo, cụ thể như sau:

**a) Độ không đảm bảo đo của tổ hợp chuẩn:**

$$
u_{ch} = \sqrt{u_{ch1}^2 + u_{ch2}^2}
$$

**ĐKĐB của nhiệt kế chuẩn (u_ch1):**

$$
u_{ch1} = \frac{U_{95}}{2}
$$

Với `U_95`: ĐKĐB mở rộng của nhiệt kế chuẩn, lấy từ giấy chứng nhận hiệu chuẩn.

**ĐKĐB do độ tản mạn của các kết quả đo từ nhiệt kế chuẩn (u_ch2):**

$$
u_{ch2} = \sqrt{\sum_{j=1}^{k} u_{ch2,j}^2}\quad \text{k: số vị trí dây đo}
$$

Với `u_ch2,j` là ĐKĐB chuẩn loại A của nhiệt kế chuẩn thứ j:

$$
u_{ch2,j} = \sqrt{\frac{S_j^2}{n}}
$$

Trong đó `S_j` là độ lệch chuẩn của nhiệt kế chuẩn thứ j, tính cho n lần đọc:

$$
S_j = \sqrt{\frac{\sum_{i=1}^{n} (t_{i,j} - t_j)^2}{n-1}}
$$

- `n`: số lần đọc tại mỗi điểm;
- `t_i,j`: lần đọc thứ i của nhiệt kế chuẩn thứ j;
- `t_j`: nhiệt độ trung bình tại điểm kiểm tra của nhiệt kế chuẩn thứ j.

**b) Độ không đảm bảo đo của thiết bị:**

$$
u_{bk} = \sqrt{u_{bk1}^2 + u_{bk2}^2 + u_{bk3}^2 + u_{bk4}^2}
$$

**ĐKĐB do độ tản mạn của các kết quả đo từ bộ chỉ thị của thiết bị (u_bk1):**

$$
u_{bk1} = \sqrt{\frac{S_j^2}{n}}
$$

Trong đó `s_j` là độ lệch chuẩn tại điểm đo thứ j, `n` là số lần đọc tại mỗi điểm đo:

$$
s_j = \sqrt{\frac{\sum_1^n (t_i - t)^2}{n-1}}
$$

- `n`: số lần đọc tại mỗi điểm;
- `t_i`: lần đọc thứ i của bể điều nhiệt;
- `t`: nhiệt độ trung bình tại điểm kiểm tra của bể điều nhiệt.

**Độ không đảm bảo đo tính theo độ ổn định (u_bk2):**

$$
u_{bk2} = \frac{\delta t_{od}}{\sqrt{3}}
$$

Trong đó: `δt_od`: độ ổn định của bể điều nhiệt tại nhiệt độ kiểm tra.

**Độ không đảm bảo đo tính theo độ đồng đều (u_bk3):**

$$
u_{bk3} = \frac{\delta t_{dd}}{\sqrt{3}}
$$

Trong đó: `δt_dd`: độ đồng đều của bể điều nhiệt.

**Độ không đảm bảo đo theo độ phân giải của chỉ thị bể điều nhiệt (u_bk4):**

Đối với chỉ thị tương tự:

$$
u_{bk4} = \frac{d}{3\sqrt{3}}
$$

Trong đó `d` là giá trị độ chia của bể.

Đối với chỉ thị hiện số:

$$
u_{bk4} = \frac{d}{2\sqrt{3}}
$$

Trong đó `d` là độ phân giải của thiết bị gia nhiệt.

**ĐKĐB tổng hợp:** Độ không đảm bảo đo liên hợp là đại lượng được xác định từ tổ hợp chuẩn và bể điều nhiệt:

$$
u_c = \sqrt{u_{ch1}^2 + u_{ch2}^2 + u_{bk1}^2 + u_{bk2}^2 + u_{bk3}^2 + u_{bk4}^2}
$$

**ĐKĐB mở rộng:** Độ không đảm bảo đo mở rộng (U95) là đại lượng xác định miền giá trị phân bố bao quanh kết quả đo:

$$
U_{95} = k \times u_c
$$

Với k = 2 là hệ số bao phủ tương ứng với mức độ tin cậy 95 % C.L.

## 8. Xử lý chung

- **8.1.** Thiết bị sau khi hiệu chuẩn được dán tem, cấp giấy chứng nhận hiệu chuẩn kèm theo kết quả hiệu chuẩn.
- **8.2.** Chu kỳ hiệu chuẩn được khuyến nghị là 12 tháng.

## 9. Phụ lục

Biên bản hiệu chuẩn bể điều nhiệt (`ETV.MCT 07.01`).

## TÀI LIỆU THAM KHẢO

- ISO/IEC 17025:2017: Yêu cầu chung về năng lực của phòng thử nghiệm và hiệu chuẩn.
- ĐLVN 113:2003: Yêu cầu về nội dung và trình bày văn bản kỹ thuật đo lường Việt Nam.
- ĐLVN 138:2004 "Nhiệt kế chỉ thị hiện số và tương tự - Quy trình hiệu chuẩn", Tổng cục Tiêu chuẩn – Đo lường – Chất lượng, 2004.
- ĐLVN 127:2003 "Tủ xác định nhu cầu oxi sinh hóa (BOD) - Quy trình hiệu chuẩn", Tổng cục Tiêu chuẩn – Đo lường – Chất lượng, 2003.
- ĐLVN 131:2003 "Hướng dẫn đánh giá độ không đảm bảo đo", Tổng cục Tiêu chuẩn – Đo lường – Chất lượng, 2003.
- VMI-CP 17:2013 "Tủ nhiệt - Quy trình hiệu chuẩn", Viện Đo lường Việt Nam, 2013.
