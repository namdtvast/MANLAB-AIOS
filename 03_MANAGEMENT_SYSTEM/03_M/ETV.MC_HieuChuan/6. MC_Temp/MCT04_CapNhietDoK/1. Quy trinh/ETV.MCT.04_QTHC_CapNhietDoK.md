---
id: ETV.MCT 04
title: "Cặp nhiệt điện công nghiệp — Quy trình hiệu chuẩn"
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
keywords: [cặp nhiệt điện, thermocouple, sức điện động, ITS-90, loại K, hiệu chuẩn]
related_documents: []
iso_clause: ["ISO/IEC 17025:2017"]
legal_basis: ["ĐLVN 113:2003", "ĐLVN 123:2003", "ĐLVN 131:2003", "ĐLVN 161:2005"]
ai_tags: [calibration-procedure, thermocouple, emf, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCT 04_Cap nhiet do K.pdf`"
supersedes: "ETV.MCT 04 lần ban hành 01 (22/04/2019)"
superseded_by: null
---
# CẶP NHIỆT ĐIỆN CÔNG NGHIỆP – QUY TRÌNH HIỆU CHUẨN

*Industrial Thermocouples – Calibration Procedure*

|                   |                     |
| ----------------- | ------------------- |
| **Mã số**         | ETV.MCT 04          |
| **Lần ban hành**  | 02                  |
| **Ngày ban hành** | 22/04/2026          |
| **Biên soạn**     | *(bản gốc để trống)* |
| **Soát xét**      | Trần Thị Hoa        |
| **Phê duyệt**     | Nguyễn Hoàng Giang  |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCT 04_Cap nhiet do K.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khối chữ ký trong bản gốc để trống, chưa có tên người biên soạn.
>
> *Ghi chú của bản chuyển đổi:* lớp văn bản trích xuất từ bản gốc có một số lỗi mã hoá ký tự đặc trưng của quá trình OCR/trích xuất PDF (ví dụ "đởc" → "đọc", "ỡV" → "µV", "Äе" → "ΔE", "nhậy" → "nhạy") — đã hiệu chỉnh các lỗi mã hoá rõ ràng này khi chuyển sang Markdown để giữ văn bản dễ đọc, không phải là chỉnh sửa nội dung kỹ thuật.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian  | Nội dung thay đổi     | Lần ban hành |
| ---------- | ---------------------- | ------------ |
| 22/04/2019 | Ban hành lần thứ nhất  | 01           |
| 22/04/2026 | Ban hành lần thứ hai   | 02           |

---

## 1. Phạm vi áp dụng

Văn bản kỹ thuật này quy định quy trình hiệu chuẩn các loại cặp nhiệt điện dùng trong công nghiệp (không áp dụng với các cặp nhiệt điện có đầu tự do), phù hợp với các định nghĩa của thang nhiệt độ quốc tế 1990 (ITS-90), có phạm vi từ -200 đến 1.800 °C.

Quy trình này áp dụng đối với nhân viên của Viện Kiểm định Công nghệ và Môi trường (sau đây gọi tắt là PTN) khi hiệu chuẩn PTĐ nói trên.

## 2. Giải thích từ ngữ

Các từ ngữ trong văn bản này được hiểu như sau:

- **Hiệu chuẩn:** là hoạt động xác định, thiết lập mối quan hệ giữa giá trị đo của chuẩn đo lường, phương tiện đo với giá trị đo của đại lượng cần đo.
- **Độ không đảm bảo đo (ĐKĐB):** thông số gắn với kết quả của phép đo, đặc trưng cho sự phân tán của các giá trị có thể quy cho đại lượng đo một cách hợp lý.

## 3. Các phép hiệu chuẩn

Phải lần lượt tiến hành các phép kiểm tra ghi trong Bảng 1.

**Bảng 1**

| TT  | Tên phép hiệu chuẩn             | Theo điều, mục của quy trình |
| --- | ---------------------------------- | -------------------------------- |
| 1   | Kiểm tra bên ngoài                 | 7.1                               |
| 2   | Kiểm tra kỹ thuật                  | 7.2                               |
| 3   | Kiểm tra đo lường                  | 7.3                               |
| 4   | Xử lý kết quả                      | 7.4                               |
| 5   | Đánh giá độ không đảm bảo đo       | 7.5                               |

## 4. Phương tiện phục vụ hiệu chuẩn

Phương tiện hiệu chuẩn được ghi trong Bảng 2.

**Bảng 2**

| TT  | Phương tiện hiệu chuẩn                | Đặc trưng kỹ thuật                                                                                                          |
| --- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Chuẩn đo lường**                       | Các chuẩn đo lường phải được liên kết chuẩn theo quy định và độ không đảm bảo đo của tổ hợp chuẩn so với tủ nhiệt phải thỏa mãn tỉ số truyền chuẩn ≤ 1/3 |
| 1.1 | Lò chuẩn nhiệt độ                        | Dải tạo nhiệt độ (150 ÷ 1.200) °C; độ phân giải: 0,1 °C (150 ÷ 1.000) °C, 1 °C (1.000 ÷ 1.200) °C; độ không đảm bảo đo phù hợp với dẫn xuất chuẩn và liên kết chuẩn với hệ thống chuẩn quốc gia |
| 1.2 | Lò chuẩn nhiệt độ                        | Dải tạo nhiệt độ (-5 ÷ 126) °C; độ phân giải: 0,01 °C; độ không đảm bảo đo phù hợp với dẫn xuất chuẩn và liên kết chuẩn với hệ thống chuẩn quốc gia |
| 1.3 | Thiết bị đo điện áp chuẩn (Fluke 8846)   | Dải đo: (0 ÷ 1000) VDC; độ phân giải: 0,00001 V                                                                              |
| 1.4 | Dây nhiệt loại K                         | Dải đo: (-150 ÷ 865) °C                                                                                                       |
| 2   | **Phương tiện khác**                     |                                                                                                                                |
| 2.1 | Thiết bị đo nhiệt độ và độ ẩm môi trường | Dải đo: Nhiệt độ (0 ÷ 50) °C; Độ ẩm tương đối (0 ÷ 100) %RH. Độ phân giải: Nhiệt độ 1 °C; Độ ẩm 1 %RH. Liên kết chuẩn với hệ thống chuẩn quốc gia |
| 3   | **Phương tiện phụ**                      |                                                                                                                                |
| 3.1 | Đồng hồ đo thời gian                     | —                                                                                                                              |
| 3.2 | Găng tay, dung dịch làm sạch, vải cotton | —                                                                                                                              |
| 3.3 | Hệ thống gá lắp                          | —                                                                                                                              |
| 3.4 | Bộ tiếp nối tiếp điểm                    | —                                                                                                                              |

## 5. Điều kiện hiệu chuẩn

Khi tiến hành hiệu chuẩn phải đảm bảo các điều kiện sau đây:

- Nhiệt độ: (25 ± 5) °C;
- Độ ẩm tương đối: (40 ÷ 70) %RH.

> *Lưu ý:* Điều kiện môi trường hiệu chuẩn hiện trường chỉ cần thoả mãn với yêu cầu sử dụng của nhiệt kế cần hiệu chuẩn.

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành hiệu chuẩn phải thực hiện các công việc chuẩn bị sau đây:

- Kiểm tra tình trạng hoạt động của tủ nhiệt theo hướng dẫn sử dụng của nhà sản xuất;
- Làm vệ sinh sạch sẽ phương tiện cần hiệu chuẩn;
- Lựa chọn và chuẩn bị tổ hợp chuẩn phù hợp với thiết bị cần hiệu chuẩn.

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

Phải kiểm tra bên ngoài theo các yêu cầu sau đây: xem xét và ghi các thông tin về tên, nhãn hiệu, kiểu/loại, số hiệu, chỉ thị nhiệt độ của cặp nhiệt điện công nghiệp, phạm vi hoạt động, độ phân giải, cơ sở sản xuất... Nếu thiết bị đo sử dụng pin cần phải thay pin mới trước khi hiệu chuẩn.

### 7.2. Kiểm tra kỹ thuật

Phải kiểm tra kỹ thuật theo các yêu cầu sau đây:

- Kiểm tra tình trạng hoạt động của thiết bị khi cung cấp điện áp danh định được ghi trên nhãn;
- Hệ điều khiển các chức năng hoạt động tốt;
- Bộ chỉ thị nhiệt độ hoạt động ổn định, không có hiện tượng thay đổi đột ngột, biến động. Đối với nhiệt kế chỉ thị hiện số, các số hiển thị phải rõ nét, không bị mờ hoặc mất nét. Đối với nhiệt kế chỉ thị tương tự, vạch chia phải còn đầy đủ, không bị nhòe hoặc mất chữ số, kim chỉ thị không bị ma sát hoặc kẹt kim;
- Các bộ phận khác hoạt động bình thường.

### 7.3. Kiểm tra đo lường

Cặp nhiệt điện cần hiệu chuẩn được kiểm tra đo lường theo trình tự nội dung, phương pháp và yêu cầu sau đây:

#### 7.3.1. Phương pháp

Kiểm tra đo lường được thực hiện bằng cách xác định giá trị sức điện động (mV) của cặp nhiệt điện cần hiệu chuẩn tại các điểm nhiệt độ kiểm tra thể hiện bởi nhiệt kế chuẩn. Hiệu chuẩn cặp nhiệt điện là thiết lập quan hệ nhiệt độ và sức điện động (t °C – mV) của cặp nhiệt điện cần hiệu chuẩn trong dải nhiệt độ làm việc.

#### 7.3.2. Quy định chung

- **7.3.2.1.** Số điểm nhiệt độ kiểm tra phải được chia đều trong dải nhiệt độ (không ít hơn 05 điểm) hoặc theo yêu cầu của cơ sở sử dụng. Thực hiện hiệu chuẩn từ điểm nhiệt độ thấp đến điểm nhiệt độ cao.
- **7.3.2.2.** Các phép đo nhiệt độ được thực hiện khi nhiệt độ của thiết bị tạo nhiệt độ chuẩn và nhiệt độ của thiết bị đo đã ổn định trong 10 phút. Ghi kết quả đo không ít hơn 5 lần tại mỗi điểm nhiệt độ kiểm tra.
- **7.3.2.3.** Hiệu chuẩn cho các cặp nhiệt điện không có đầu tự do nên hiệu chỉnh sức điện động theo công thức:

  $$
  E_{bk}(t, 0°C) = E_{bk}(t, t_0) + E_{bk}(t_0, 0°C)
  $$

  Trong đó: `E_bk(t, 0°C)`: sức điện động của cặp nhiệt điện ở nhiệt độ t °C và đầu tự do được giữ ở 0 °C; `E_bk(t, t0)`: sức điện động của cặp nhiệt điện ở t °C và đầu tự do được giữ ở t0 khác 0 °C; `E_bk(t0, 0°C)`: sức điện động của cặp nhiệt điện ở nhiệt độ t0 và đầu tự do được giữ ở nhiệt độ 0 °C.

#### 7.3.3. Trình tự kiểm tra tại một điểm nhiệt độ

- **7.3.3.1.** Đặt nhiệt độ của tủ nhiệt tương ứng với giá trị nhiệt độ đầu tiên cần kiểm tra.
- **7.3.3.2.** Sau khi nhiệt độ đã ổn định (theo mục 7.3.2.2), đọc số chỉ nhiệt độ của tổ hợp chuẩn và số chỉ thiết bị đo. Trình tự đọc theo thứ tự:

  Tổ hợp chuẩn → N1 → N2 → N3 … → Nn → Tổ hợp chuẩn

  Trong đó: N1, N2, … Nn là nhiệt kế cần hiệu chuẩn; quá trình đọc số chỉ từ nhiệt kế chuẩn đến nhiệt kế thứ Nn và đọc trở về đến nhiệt kế chuẩn là một lượt đọc. Số lượt đọc tại mỗi điểm kiểm tra không ít hơn 5 lần.

- **7.3.3.3.** Lần lượt tiến hành đo tương tự đối với các điểm nhiệt độ kiểm tra tiếp theo cho đến điểm nhiệt độ kiểm tra cuối cùng.

### 7.4. Xử lý kết quả hiệu chuẩn

- **7.4.1.** Giá trị đo được của nhiệt kế chuẩn và sức điện động của cặp nhiệt điện cần hiệu chuẩn tại mỗi điểm kiểm tra là giá trị trung bình của các lần đo. Giá trị sức điện động trung bình của cặp nhiệt điện cần hiệu chuẩn được tính theo công thức:

  $$
  E_{bk}(t) = \frac{1}{n}\sum_{i=1}^{n} E_i
  $$

  Trong đó: `n`: số lần đo tại mỗi điểm; `E_i`: giá trị sức điện động của cặp nhiệt điện cần hiệu chuẩn đo được tại lần thứ i.

- **7.4.2.** Xác định nhiệt độ "thực" của nhiệt kế chuẩn khi sử dụng để hiệu chuẩn. Qua số hiệu chính từ giấy chứng nhận hiệu chuẩn ta tính được nhiệt độ thực: `t_ch`.

- **7.4.3.** Từ các giá trị nhiệt độ `t_ch`, tra trong bảng chia độ chuẩn của loại cặp nhiệt điện cần hiệu chuẩn để tìm sức nhiệt điện động chuẩn `E_bkTC(t)` (xem Phụ lục 3).

- **7.4.4.** Tính độ lệch ΔE giữa giá trị trung bình sức nhiệt điện động của cặp nhiệt điện cần hiệu chuẩn với sức nhiệt điện động chuẩn tại mỗi điểm kiểm tra theo công thức:

  $$
  \Delta E = E_{bk}(t) - E_{bkTC}(t)
  $$

- **7.4.5.** Từ bảng chia độ chuẩn của loại cặp nhiệt điện cần hiệu chuẩn và độ lệch ΔE để tính số hiệu chính của cặp nhiệt điện tại từng điểm kiểm tra.

- **7.4.6.** Tính độ lệch chuẩn tại mỗi điểm kiểm tra của số đọc của nhiệt kế chuẩn và của cặp nhiệt điện cần hiệu chuẩn theo công thức:

  $$
  s_i = \sqrt{\frac{\sum_{\ell=1}^{n} (x_\ell - \bar{X})^2}{n-1}}
  $$

- **7.4.7.** Tính độ lệch chuẩn trung bình của nhiệt kế chuẩn và của cặp nhiệt điện cần hiệu chuẩn trong cả dải nhiệt độ hiệu chuẩn:

  $$
  s_p = \sqrt{\frac{\sum_{i=1}^{N} s_i^2}{N}}
  $$

  Trong đó: `s_i`: độ lệch chuẩn tại điểm kiểm tra thứ i (i = 1, 2,…N); `N`: số điểm kiểm tra; `x_ℓ`: giá trị đo thứ ℓ của điểm kiểm tra (ℓ = 1,2,…n); `X̄`: giá trị trung bình của n lần đo; `n`: số lần đo tại mỗi điểm kiểm tra.

### 7.5. Đánh giá độ không đảm bảo đo

#### 7.5.1. Xác định các yếu tố gây ra ĐKĐBĐ tại tất cả các điểm hiệu chuẩn

Các yếu tố gây ra ĐKĐBĐ bao gồm:

- Thiết bị chuẩn nhiệt độ;
- Thiết bị cần hiệu chuẩn;
- Nhân viên đo/hiệu chuẩn.

#### 7.5.2. Tính toán ĐKĐBĐ đo của các yếu tố ảnh hưởng

ĐKĐBĐ của phép hiệu chuẩn được tính toán từ các sai số ảnh hưởng đến các phép đo nhiệt độ khi hiệu chuẩn, được chia thành hai loại: độ không đảm bảo đo của tổ hợp chuẩn và độ không đảm bảo đo của thiết bị, tính toán trong toàn dải đo, cụ thể:

**a) Độ không đảm bảo đo của tổ hợp chuẩn:**

Tính toán độ không đảm bảo đo này phụ thuộc vào các độ không đảm bảo đo thành phần của tổ hợp thiết bị chuẩn sử dụng, bao gồm nhiệt kế chuẩn, thiết bị chỉ thị chuẩn và thiết bị tạo môi trường nhiệt độ... Tính toán được suy từ các độ không đảm bảo mở rộng của mỗi loại thiết bị chuẩn, gồm các thành phần sau:

**Độ không đảm bảo đo của nhiệt kế chuẩn (u_ch1):** Thành phần này lấy từ giấy chứng nhận hiệu chuẩn, tính từ độ không đảm bảo đo mở rộng U (theo mức độ tin cậy chất lượng P% và hệ số phủ k):

$$
u_{ch1} = \frac{U}{k}\ [°C]
$$

**Độ không đảm bảo đo của thiết bị đo mV chuẩn (u_ch2):** Thành phần này lấy từ giấy chứng nhận hiệu chuẩn:

$$
u_{ch2} = \frac{U \times A_{max}}{k \times S_e}\ [°C]
$$

Trong đó: `A_max`: giá trị đo của thiết bị chỉ thị tại điểm kiểm tra lớn nhất; `S_e`: độ nhạy của cặp nhiệt điện chuẩn tại điểm kiểm tra lớn nhất (µV/°C).

**Độ không đảm bảo đo của bình điều nhiệt hoặc lò hiệu chuẩn — loại B (u_ch3):** Thành phần này được tính từ tổ hợp hai thành phần độ không đảm bảo đo của thiết bị theo độ ổn định `δt1` và độ đồng đều `δt2`:

$$
u_{ch3} = \sqrt{u_{od}^2 + u_{dd}^2}\ [°C]
$$

Ước lượng theo phân bố chữ nhật của 2 thành phần trên:

$$
u_{od} = \frac{\delta t_1}{\sqrt{3}}\ ;\quad u_{dd} = \frac{\delta t_2}{\sqrt{3}}
$$

**Độ không đảm bảo đo theo độ tản mạn của kết quả đo tại các điểm kiểm tra — loại A (u_ch4):** Thành phần này tính theo độ lệch chuẩn trung bình `s_p`, tính toán theo công thức trong mục 7.4.6, từ đó ước lượng theo độ không đảm bảo chuẩn loại A:

$$
u_{ch4} = \frac{s_p}{\sqrt{n}}\ [°C]
$$

**Độ không đảm bảo đo thiết bị đo nhiệt độ quy đổi — loại B (u_ch5):** Thành phần này lấy từ giấy chứng nhận hiệu chuẩn:

$$
u_{ch5} = \frac{U}{k}\ [°C]
$$

**b) Độ không đảm bảo đo của thiết bị cần hiệu chuẩn (u_bk):**

**Độ không đảm bảo đo của thiết bị đo chuẩn — loại B (u_bk1):** Thành phần này tính toán tương tự như mục a) ở trên, giá trị `A_max`, độ nhạy phụ thuộc vào loại cặp nhiệt điện cần hiệu chuẩn.

**Độ không đảm bảo đo theo độ tản mạn của kết quả đo tại các điểm kiểm tra — loại A (u_bk2):** Thành phần này tính theo độ lệch chuẩn trung bình `s_p`, tính toán theo công thức trong mục 7.4.7:

$$
u_{bk2} = \frac{s_p}{\sqrt{n}}\ [°C]
$$

**c) Độ không đảm bảo đo chuẩn kết hợp của phép hiệu chuẩn, u_c:**

$$
u_c = \sqrt{u_{ch}^2 + u_{bk}^2}
$$

**d) Độ không đảm bảo đo mở rộng** (tính với mức độ tin cậy 95 %; hệ số k = 2):

$$
U_{95} = k \times u_c
$$

Với k = 2 là hệ số bao phủ tương ứng với mức độ tin cậy 95 % C.L.

**Bảng các thành phần độ không đảm bảo đo**

| TT  | Nguồn gốc gây ra độ không đảm bảo đo | Đánh giá | Phân bố  |
| --- | ---------------------------------------- | -------- | -------- |
| 1   | **Thiết bị chuẩn**                       |          |          |
| 1.1 | Cặp nhiệt điện chuẩn                     | B        | Chuẩn    |
| 1.2 | Thiết bị đo mV chuẩn                     | B        | Chuẩn    |
| 1.3 | Nhiệt độ bình điều nhiệt, lò tạo nhiệt độ | B       | Chữ nhật |
| 1.4 | Thiết bị đo nhiệt độ quy đổi             | B        | Chuẩn    |
| 1.5 | Độ tản mạn kết quả đo                    | A        | Chuẩn    |
| 1.6 | Bình điểm 0                              | B        | Chữ nhật |
| 2   | **Thiết bị cần hiệu chuẩn**              |          |          |
| 2.1 | Thiết bị đo mV chuẩn                     | B        | Chuẩn    |
| 2.2 | Độ tản mạn kết quả đo                    | A        | Chuẩn    |
| 3   | Độ không đảm bảo đo kết hợp              | uc       | Chuẩn    |
| 4   | Độ không đảm bảo đo mở rộng              | U95      | Chuẩn    |

## 8. Xử lý chung

- **8.1.** Thiết bị sau khi hiệu chuẩn được dán tem, cấp giấy chứng nhận hiệu chuẩn kèm theo kết quả hiệu chuẩn.
- **8.2.** Chu kỳ hiệu chuẩn được khuyến nghị là 01 năm.

## TÀI LIỆU THAM KHẢO

- ISO/IEC 17025:2017: Yêu cầu chung về năng lực của phòng thử nghiệm và hiệu chuẩn.
- ĐLVN 131:2003 "Hướng dẫn đánh giá độ không đảm bảo đo".
- ĐLVN 161:2005 "Cặp nhiệt điện công nghiệp - Quy trình hiệu chuẩn", Tổng cục Tiêu chuẩn – Đo lường – Chất lượng, 2005.
- ĐLVN 123:2003 "Hiệu chuẩn cặp nhiệt điện chuẩn loại B,R,S bằng phương pháp so sánh - Quy trình hiệu chuẩn", Tổng cục Tiêu chuẩn – Đo lường – Chất lượng, 2003.
- ĐLVN 113:2003: Yêu cầu về nội dung và trình bày văn bản kỹ thuật đo lường Việt Nam.
