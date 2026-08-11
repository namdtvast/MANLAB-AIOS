---
id: ETV.MCO 01
title: "Phương tiện đo quang phổ tử ngoại khả kiến — Quy trình hiệu chuẩn"
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
keywords: [UV-Vis, quang phổ tử ngoại khả kiến, kính lọc chuẩn, bước sóng, độ hấp thụ, K2Cr2O7, hiệu chuẩn]
related_documents: ["ETV.MCO.F 01.01"]
iso_clause: ["ISO/IEC 17025:2017"]
legal_basis: []
ai_tags: [calibration-procedure, uv-vis-spectrophotometer, optics-metrology, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCO 01_UV_VIS_V3.pdf`"
supersedes: "ETV.MCO 01 lần ban hành 02 (22/04/2023)"
superseded_by: null
---
# PHƯƠNG TIỆN ĐO QUANG PHỔ TỬ NGOẠI KHẢ KIẾN – QUY TRÌNH HIỆU CHUẨN

*UV/Vis Spectrophotometer – Calibration Procedure*

|                   |                     |
| ----------------- | ------------------- |
| **Mã số**         | ETV.MCO 01          |
| **Lần ban hành**  | 03                  |
| **Ngày ban hành** | 22/04/2026          |
| **Biên soạn**     | *(bản gốc để trống)* |
| **Soát xét**      | Trần Thị Hoa        |
| **Phê duyệt**     | Nguyễn Hoàng Giang  |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCO 01_UV_VIS_V3.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khối chữ ký trong bản gốc **để trống**, chưa có tên người biên soạn.
>
> *Ghi chú của bản chuyển đổi:* lớp text PDF của một số đoạn (đầu mục 1, toàn bộ mục 2, đầu mục 7.2/7.3) bị lặp ký tự/từ do lỗi trích xuất font của bản gốc — các đoạn này được phục hồi theo ngữ cảnh và đối chiếu với các quy trình MCO khác cùng cấu trúc; nội dung số liệu kỹ thuật (bước sóng, độ hấp thụ, công thức) trích nguyên vẹn. Bảng "Những thay đổi đã có" ghi dòng cuối "Ban hành lần thứ hai" nhưng cột Lần ban hành ghi "03" — khả năng là lỗi copy từ dòng trước; giữ nguyên văn. Khi có khác biệt, bản PDF do Viện ban hành là bản có giá trị áp dụng.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian | Nội dung thay đổi                                    | Lần ban hành |
| --------- | ----------------------------------------------------- | ------------ |
| 22/4/2019 | Ban hành lần thứ nhất                                 | 01           |
| 18/9/2019 | Cập nhật theo ý kiến chuyên gia BoA                   | 01           |
| 22/4/2023 | Ban hành lần thứ 02 theo ý kiến chuyên gia BoA        | 02           |
| 22/4/2026 | Ban hành lần thứ hai [^lanbh]                         | 03           |

[^lanbh]: Bản gốc ghi nội dung "Ban hành lần thứ hai" ở dòng lần ban hành 03 — có khả năng là lỗi sao chép từ dòng 02, giữ nguyên văn.

---

## 1. Phạm vi áp dụng

Quy trình này quy định quy trình kỹ thuật hiệu chuẩn máy quang phổ tử ngoại khả kiến (gọi tắt là máy UV-Vis) có phạm vi bước sóng (190 ÷ 900) nm, sai số bước sóng (0,5 ÷ 3) nm; phạm vi độ hấp thụ (0 ÷ 2,0) Abs, sai số độ hấp thụ từ 0,005 Abs.

Quy trình này áp dụng đối với nhân viên của Viện Kiểm định Công nghệ và Môi trường (sau đây gọi tắt là PTN) khi hiệu chuẩn thiết bị UV-Vis thuộc phạm vi kể trên.

## 2. Giải thích từ ngữ

Không áp dụng.

## 3. Các phép hiệu chuẩn

Phải lần lượt tiến hành các phép kiểm tra ghi trong Bảng 1.

**Bảng 1**

| TT  | Tên phép hiệu chuẩn                        | Theo điều, mục của quy trình |
| --- | -------------------------------------------- | ----------------------------- |
| 1   | Kiểm tra bên ngoài                          | 7.1                            |
| 2   | Kiểm tra kỹ thuật — kiểm tra độ phẳng đường nền | 7.2                        |
| 3   | Kiểm tra đo lường                           | 7.3                            |
|     | — Kiểm tra sai lệch bước sóng               | 7.3.1                          |
|     | — Kiểm tra sai lệch độ hấp thụ              | 7.3.2                          |
|     |    Kiểm tra sai lệch độ hấp thụ vùng UV     | 7.3.2.1                        |
|     |    Kiểm tra sai lệch độ hấp thụ vùng Vis    | 7.3.2.2                        |
| 4   | Tính toán độ không đảm bảo đo               | 7.4                             |
| 5   | Xử lý chung                                 | 8                               |

## 4. Phương tiện hiệu chuẩn

Phương tiện hiệu chuẩn được ghi trong Bảng 2.

**Bảng 2**

| TT  | Phương tiện hiệu chuẩn         | Đặc trưng kỹ thuật                                                                                                          |
| --- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| 1   | **Chuẩn đo lường**              |                                                                                                                              |
| 1.1 | Bộ kính lọc chuẩn                | - Bước sóng: F1: (279; 287; 361; 418; 445; 453; 460; 536; 638) nm; F2, F3, F4: (405 ÷ 890) nm<br>- Độ hấp thụ: (0,25; 0,5; 1) Abs<br>- Độ không đảm bảo đo phù hợp và liên kết chuẩn với hệ thống chuẩn quốc gia hoặc quốc tế |
| 1.2 | Bộ dung dịch chuẩn               | - Chuẩn K₂Cr₂O₇ với các nồng độ: (20; 40; 60; 80; 100) mg/L, độ hấp thụ tương ứng: (0,25; 0,5; 0,75; 1,0; 1,25) Abs<br>- Chuẩn axit percloric HClO₄<br>- Độ không đảm bảo đo phù hợp và liên kết chuẩn với hệ thống chuẩn quốc gia hoặc quốc tế |
| 2   | **Phương tiện khác**            |                                                                                                                              |
| 2.1 | Thiết bị đo nhiệt độ và độ ẩm môi trường | - Dải đo: Nhiệt độ (0 ÷ 50) °C; Độ ẩm tương đối (0 ÷ 100) %RH<br>- Độ phân giải: Nhiệt độ 1 °C; Độ ẩm 1 %RH<br>- Liên kết chuẩn với hệ thống chuẩn quốc gia |
| 3   | **Phương tiện phụ**             |                                                                                                                              |
| 3.1 | Găng tay, dung dịch làm sạch, vải cotton |                                                                                                                       |

## 5. Điều kiện hiệu chuẩn

Khi tiến hành hiệu chuẩn, phải đảm bảo các điều kiện sau đây:

- Nhiệt độ: (25 ± 5) °C;
- Độ ẩm tương đối: ≤ 80 %RH (không đọng sương).

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành hiệu chuẩn phải thực hiện các công việc chuẩn bị sau đây:

- Vệ sinh khu vực đặt máy UV-Vis, lau bụi trên thân máy, bàn đặt máy và các thiết bị phụ trợ cho máy.
- Kiểm tra và vệ sinh buồng đựng cuvet đo quang, và cửa chắn buồng đo mẫu; kiểm tra dây cáp và các cổng kết nối dữ liệu của máy.
- Bật máy UV-Vis cần hiệu chuẩn theo hướng dẫn vận hành của hãng. Thời gian chạy ổn định máy tối thiểu là 30 phút trước khi tiến hành hiệu chuẩn.
- Khi khởi động máy cần kiểm tra tình trạng của máy, thông tin cảnh báo trên máy UV-Vis hoặc phần mềm về tình trạng của đèn Đơtơri, đèn Vonfram.

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

Máy UV-Vis phải đảm bảo các yêu cầu sau: kiểm tra bằng mắt để xác định sự phù hợp của máy UV-Vis đối với các yêu cầu quy định trong tài liệu kỹ thuật, về hình dáng, kích thước, chỉ thị, điện áp, ký nhãn hiệu, tài liệu và phụ kiện kèm theo.

### 7.2. Kiểm tra kỹ thuật

Phải kiểm tra kỹ thuật theo các yêu cầu sau đây:

- Kiểm tra trạng thái hoạt động bình thường của máy UV-Vis theo hướng dẫn sử dụng của nhà sản xuất.
- Kiểm tra độ phẳng của đường nền.

Sử dụng kính lọc rỗng (Blank), đặt vào vị trí đo mẫu trong buồng đo và tiến hành quét đường nền (Baseline); khi máy UV-Vis ổn định, trên màn hình sẽ hiển thị giá trị 0 Abs.

> *Lưu ý:* Trong trường hợp bóng đèn nguồn sáng quá tuổi sử dụng và phần mềm thông báo cần thay thì phải khuyến nghị thay bóng đèn trước khi tiến hành kiểm tra đo lường, và chỉ tiến hành hiệu chuẩn sau khi thay bóng đèn ít nhất 8 giờ.

### 7.3. Kiểm tra đo lường

#### 7.3.1. Kiểm tra sai lệch bước sóng

Chọn dải bước sóng kiểm tra (200 ÷ 700) nm.

Đặt kính lọc F1 vào vị trí đo mẫu và tiến hành quét bước sóng để xác định các bước sóng cực đại đo được của máy UV-Vis và so sánh với các đỉnh bước sóng của kính lọc chuẩn.

Thực hiện đo lặp lại 5 lần và ghi các giá trị bước sóng đo được tại mỗi điểm cực đại vào biên bản hiệu chuẩn (Phụ lục 01).

#### 7.3.2. Kiểm tra sai lệch độ hấp thụ

##### 7.3.2.1. Kiểm tra sai lệch độ hấp thụ vùng UV

Sử dụng dung dịch chuẩn axit percloric HClO₄ để ổn định giá trị nền của độ hấp thụ (auto zero), về giá trị không (0 Abs).

Lựa chọn các bước sóng phù hợp với bộ dung dịch chuẩn để quét phổ hấp thụ (các bước sóng: 235 nm, 257 nm, 313 nm, 350 nm).

Tiến hành đo 5 lần đối với từng dung dịch chuẩn có nồng độ: 20 mg/L; 40 mg/L; 80 mg/L tại các bước sóng trên và ghi lại giá trị đo được vào biên bản hiệu chuẩn (Phụ lục 01).

##### 7.3.2.2. Kiểm tra sai lệch độ hấp thụ vùng Vis

Sử dụng kính lọc rỗng F1 (Blank) để ổn định giá trị nền của độ hấp thụ (auto zero), về giá trị không (0 Abs).

Lựa chọn các bước sóng phù hợp với bộ kính lọc chuẩn để quét phổ hấp thụ (440 nm, 465 nm, 546 nm, 590 nm, 635 nm, 880 nm).

Tiến hành đo 5 lần đối với từng kính lọc chuẩn (F2, F3, F4) tương ứng với độ hấp thụ (0,25; 0,5; 1,0) Abs và ghi lại giá trị đo được vào biên bản hiệu chuẩn (Phụ lục 01).

### 7.4. Tính toán độ không đảm bảo đo (ĐKĐB)

#### 7.4.1. Xác định đại lượng đo

Thực hiện hiệu chuẩn bằng cách so sánh trực tiếp bộ kính lọc chuẩn được chứng nhận và máy UV-Vis. Đối với mỗi kính lọc chuẩn đều có giấy chứng nhận độ chính xác hoặc độ không đảm bảo đo của từng kính lọc.

Ngoài ra, còn một số thiết bị cũng có ảnh hưởng đến kết quả đo như: nguồn điện, thiết bị đo điều kiện môi trường gây ra các sai số trong kết quả đo giữa các lần đo khác nhau… Như vậy, cần phải xác định đại lượng ảnh hưởng đến ĐKĐB để tính toán một cách cụ thể và chính xác đối với kết quả cuối cùng.

#### 7.4.2. Mô hình tính toán ĐKĐB

Để ước tính độ không đảm bảo đo, trước tiên cần nhận dạng và tìm hiểu các yếu tố ảnh hưởng tới độ chính xác của phép đo đang được xem xét, sau đó xác định dạng của hàm mật độ phân bố xác suất tương ứng với từng nguồn cụ thể. Trong trường hợp phép đo quang, ĐKĐB kết hợp của phép đo này được tính thông qua mô hình toán sau đây:

Sai số tại mỗi điểm hiệu chuẩn được xác định bằng hiệu số giữa giá trị của chuẩn và giá trị trung bình của các kết quả đo trên PTĐ theo công thức:

$$
h_c = x_{tb} - x_{ch}
$$

- `h_c`: sai số tại mỗi điểm hiệu chuẩn;
- `x_tb`: kết quả đo trên PTĐ;
- `x_ch`: giá trị của chuẩn.

#### 7.4.3. Các yếu tố gây ra ĐKĐB bao gồm

- Chuẩn đo lường;
- PTĐ cần hiệu chuẩn;
- Một số ảnh hưởng ngẫu nhiên khác.

#### 7.4.4. Tính toán ĐKĐB của các yếu tố ảnh hưởng tại tất cả các điểm hiệu chuẩn

Các thành phần của độ không đảm bảo đo cho trong bảng sau:

| TT  | Tên yếu tố ảnh hưởng                                  | Ký hiệu | Loại | Dạng hàm phân bố |
| --- | -------------------------------------------------------- | ------- | ---- | ----------------- |
| 1   | ĐKĐB đo lặp của máy UV-Vis                               | `u_ch`  | A    | Chuẩn             |
| 2   | ĐKĐB do ảnh hưởng của độ phân giải của máy UV-Vis        | `u_pg`  | B    | Chữ nhật          |
| 3   | ĐKĐB của bộ dung dịch chuẩn dải UV                        | `u_dd`  | B    | Chuẩn             |
| 4   | ĐKĐB của bộ kính lọc chuẩn dải Vis                        | `u_k`   | B    | Chuẩn             |
| 5   | Độ chính xác của bước sóng                                | `u_bs`  | B    | Chuẩn             |

##### 7.4.4.1. Tính toán ĐKĐB của phép đo sai lệch bước sóng

**Các thành phần độ không đảm bảo đo:**

- **`u_A1`** (%, loại A, phân bố chuẩn) — độ lặp:

  Giá trị trung bình của phép đo lặp lại n lần từ giá trị quan sát được `x_i` (i = 1, 2, …, n):

  $$
  \bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i
  $$

  Độ lệch chuẩn:

  $$
  s(x) = \sqrt{\frac{\sum_{i=1}^{n}(x_i - \bar{x})^2}{n-1}}
  $$

  $$
  u_{A1} = \frac{s(x)}{\sqrt{n} \cdot x_{tb}} \times 100
  $$

- **`u_pg1`** (%, loại B, chữ nhật) — độ phân giải:

  $$
  u_{pg1} = \frac{a_{pg1}}{2\sqrt{3} \cdot x_{tb}} \times 100
  $$

  với `a_pg1` là độ phân giải của máy UV-Vis.

- **`u_ch1`** (%, loại B, chuẩn):

  $$
  u_{ch1} = \frac{U_{ch1}}{2 \cdot x_{ch}} \times 100
  $$

  với `U_ch1` (nm) là ĐKĐB lấy theo giấy chứng nhận hiệu chuẩn của kính lọc chuẩn.

- **`U_bs`** (nm):

  Độ không đảm bảo đo tổng hợp của máy UV-Vis:

  $$
  u_{ctb1} = \sqrt{x_{tb} \cdot u_{A1}^2 + u_{pg}^2} / 100
  $$

  Độ không đảm bảo đo tổng hợp của chuẩn:

  $$
  u_{cc1} = (x_c \cdot u_{ch1}) / 100
  $$

  Độ không đảm bảo đo tổng hợp tại mỗi điểm hiệu chuẩn:

  $$
  u_{c1} = \sqrt{u_{cc1}^2 + u_{ctb1}^2}
  $$

  Độ không đảm bảo đo mở rộng:

  $$
  U_{bs} = k \cdot u_{c1}
  $$

  với `k` là hệ số phủ (k = 2 tương ứng với xác suất tin cậy P = 0,95).

##### 7.4.4.2. Tính toán ĐKĐB của phép đo sai lệch độ hấp thụ [^7432]

[^7432]: Bản gốc đánh số mục này là "7.4.3.2"; theo mạch đánh số của các mục cha (7.4.4.x), số đúng phải là 7.4.4.2. Bản chuyển đổi sửa lại cho nhất quán.

**Các thành phần độ không đảm bảo đo:**

- **`u_A2`** (%, loại A, phân bố chuẩn) — độ lặp:

  Giá trị trung bình của phép đo lặp lại n lần từ giá trị quan sát được `A_i` (i = 1, 2, …, n):

  $$
  \bar{A} = \frac{1}{n}\sum_{i=1}^{n} A_i
  $$

  Độ lệch chuẩn:

  $$
  s(A) = \sqrt{\frac{\sum_{i=1}^{n}(A_i - \bar{A})^2}{n-1}}
  $$

  $$
  u_{A2} = \frac{s(A)}{\sqrt{n} \cdot A_{tb}} \times 100
  $$

- **`u_pg2`** (%, loại B, chữ nhật) — độ phân giải:

  $$
  u_{pg2} = \frac{a_{pg2}}{2\sqrt{3} \cdot A_{tb}} \times 100
  $$

  với `a_pg2` là độ phân giải của máy UV-Vis.

- **`u_ch2`** (%, loại B, chuẩn):

  $$
  u_{ch2} = \frac{U_{ch2}}{2 \cdot A_{ch}} \times 100
  $$

  với `U_ch2` (nm) là ĐKĐB lấy theo giấy chứng nhận hiệu chuẩn của kính lọc chuẩn hoặc lọ dung dịch chuẩn.

- **`u_bs`** (%, loại B, chuẩn):

  $$
  u_{bs} = \frac{U_{bs}}{2 \cdot x_{tb}} \times 100
  $$

  `U_bs` (Abs) là ĐKĐB được ước lượng theo công thức (12), trang 24 trong tài liệu hướng dẫn tính ĐKĐB của NIST — "Regular Spectral Transmittance". Theo đó:

  $$
  U_{bs} = \frac{u(\lambda)}{d\lambda} = \frac{dA}{d\lambda} \cdot \frac{u_i(\lambda)}{A}
  $$

  Giá trị `U_bs` sẽ được ước lượng theo kết quả tính toán của NIST tương ứng với ĐKĐB của phép đo sai lệch bước sóng ở trên.

- **`U_ht`** (Abs):

  Độ không đảm bảo đo tổng hợp của máy UV-Vis:

  $$
  u_{ctb2} = \sqrt{A_{tb} \cdot u_{A2}^2 + u_{pg2}^2 + u_{bs}^2} / 100
  $$

  Độ không đảm bảo đo tổng hợp của chuẩn:

  $$
  u_{cc2} = (A_c \cdot u_{ch2}) / 100
  $$

  Độ không đảm bảo đo tổng hợp tại mỗi điểm hiệu chuẩn:

  $$
  u_{c2} = \sqrt{u_{cc2}^2 + u_{ctb2}^2}
  $$

  Độ không đảm bảo đo mở rộng:

  $$
  U_{ht} = k \cdot u_{c2}
  $$

  với `k` là hệ số phủ (k = 2 tương ứng với xác suất tin cậy P = 0,95).

## 8. Xử lý chung

- **8.1.** PTĐ sau khi hiệu chuẩn được dán tem, cấp giấy chứng nhận hiệu chuẩn kèm theo kết quả hiệu chuẩn.
- **8.2.** Chu kỳ hiệu chuẩn được khuyến nghị là 01 năm.

## 9. Phụ lục

Biên bản hiệu chuẩn PTĐ quang phổ tử ngoại khả kiến (`ETV.MCO.F 01.01`).
