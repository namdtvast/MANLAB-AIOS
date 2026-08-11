---
id: ETV.MCT 13
title: "Lò vi sóng — Quy trình hiệu chuẩn"
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
keywords: [lò vi sóng, microwave oven, công suất hấp thụ, nhiệt lượng, hiệu chuẩn]
related_documents: []
iso_clause: ["ISO/IEC 17025:2017"]
legal_basis: ["TCVN 5699-2-25:2007", "ASTM F1317-98"]
ai_tags: [calibration-procedure, microwave-oven, power-measurement, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCT 13_Lo vi song_Quy trinh_V3.pdf`"
supersedes: "ETV.MCT 13 lần ban hành 02 (27/09/2022, sửa đổi 22/04/2023)"
superseded_by: null
---
# LÒ VI SÓNG – QUY TRÌNH HIỆU CHUẨN

*Microwave Oven – Calibration Procedure*

|                   |                     |
| ----------------- | ------------------- |
| **Mã số**         | ETV.MCT 13          |
| **Lần ban hành**  | 03                  |
| **Ngày ban hành** | 22/04/2026          |
| **Biên soạn**     | *(bản gốc để trống)* |
| **Soát xét**      | Trần Thị Hoa        |
| **Phê duyệt**     | Nguyễn Hoàng Giang  |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCT 13_Lo vi song_Quy trinh_V3.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab.
>
> *Ghi chú của bản chuyển đổi:* trang bìa hiển thị trực quan khối chữ ký (BIÊN SOẠN/SOÁT XÉT/PHÊ DUYỆT) **trống**, nhưng lớp văn bản ẩn phía dưới của trang PDF (không hiển thị khi xem/in) lại chứa các tên "Trần Thị Hoa" (dưới cột biên soạn), "Nguyễn Ngọc Tuấn" (dưới cột soát xét), "Nguyễn Hoàng Giang" (dưới cột phê duyệt) — cùng dạng phát hiện như tại `ETV.MCS 06` và `ETV.MCT 02`, đáng chú ý là cách phân vai (Trần Thị Hoa ở vị trí biên soạn thay vì soát xét) khác với các quy trình khác trong lô này. Do bản hiển thị (bản có giá trị áp dụng) để trống, `prepared_by`/`reviewed_by` trong bản chuyển đổi này giữ theo chính sách chung của nhóm (blank/Trần Thị Hoa), ghi nhận phát hiện tại đây để người có thẩm quyền xác minh khi cần.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Ngày soát xét | Lý do soát xét, ban hành lại       | Lần ban hành |
| -------------- | ------------------------------------ | ------------ |
| 27/09/2022     | Ban hành lần thứ 01                  | 01           |
| 22/04/2023     | Sửa đổi theo ý kiến chuyên gia       | 02           |
| 22/04/2026     | Ban hành lần thứ ba                  | 03           |

---

## 1. Phạm vi áp dụng

Quy trình này quy định quy trình kỹ thuật hiệu chuẩn lò vi sóng tại phòng thí nghiệm hoặc ngoài hiện trường, cụ thể như sau:

| TT  | Phương tiện đo | Phạm vi đo              |
| --- | ----------------- | -------------------------- |
| 1   | Lò vi sóng         | (10 ÷ 300) °C; Max 1500 W  |

Quy trình này áp dụng đối với nhân viên của Viện Kiểm định Công nghệ và Môi trường (sau đây gọi tắt là PTN) khi hiệu chuẩn PTĐ nói trên.

## 2. Giải thích từ ngữ

Các từ ngữ trong văn bản này được hiểu như sau:

- **Lò vi sóng:** thiết bị dùng năng lượng điện từ ở một hoặc một số băng tần ISM[^ism] trong khoảng từ 300 MHz đến 30 GHz, để làm nóng đồ vật trong khoang chứa.
- **Hiệu chuẩn:** là hoạt động xác định, thiết lập mối quan hệ giữa giá trị đo của chuẩn đo lường, phương tiện đo với giá trị đo của đại lượng cần đo.
- **Hiệu chỉnh:** là tập hợp các thao tác được tiến hành trên hệ thống đo để cho ra số chỉ đã quy định tương ứng với giá trị đã cho của đại lượng được đo.
- **Độ không đảm bảo đo (ĐKĐB):** thông số gắn với kết quả của phép đo, đặc trưng cho sự phân tán của các giá trị có thể quy cho đại lượng đo một cách hợp lý.
- **Đơn vị đo:** °C, W (watt).

[^ism]: Băng tần ISM là các tần số điện từ do ITU thiết lập và được nêu trong TCVN 6988 (CISPR 11).

## 3. Các phép hiệu chuẩn

Phải lần lượt tiến hành các phép kiểm tra nêu trong Bảng 1.

**Bảng 1**

| TT  | Tên phép hiệu chuẩn                                          | Theo điều, mục của quy trình |
| --- | ---------------------------------------------------------------- | -------------------------------- |
| 1   | Kiểm tra bên ngoài                                                | 7.1                               |
| 2   | Kiểm tra kỹ thuật                                                 | 7.2                               |
| 3   | Kiểm tra đo lường — phương pháp                                   | 7.3.1                             |
|     | — tiến hành hiệu chuẩn                                            | 7.3.2                             |
|     | — xử lý kết quả hiệu chuẩn                                        | 7.3.3                             |
| 4   | Đánh giá độ không đảm bảo đo — đánh giá ĐKĐB nhiệt độ của lò vi sóng | 7.4.1                          |
|     | — đánh giá ĐKĐB công suất của lò vi sóng                          | 7.4.2                             |
| 5   | Xử lý chung                                                       | 8                                 |

## 4. Phương tiện phục vụ hiệu chuẩn

Các phương tiện dùng để hiệu chuẩn được nêu trong Bảng 2.

**Bảng 2**

| TT   | Phương tiện hiệu chuẩn                                | Đặc trưng kỹ thuật                                                                                                                          |
| ---- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | **Chuẩn đo lường**                                          | Các chuẩn đo lường phải được liên kết chuẩn theo quy định và độ không đảm bảo đo của tổ hợp chuẩn so với PTĐ cần hiệu chuẩn phải thỏa mãn tỉ số truyền chuẩn ≤ 1/3 |
| 1.1  | Chuẩn nhiệt độ chỉ thị hiện số                              | Phạm vi đo phù hợp với dải đo làm việc của lò vi sóng; độ phân giải ≤ 0,1 °C; độ không đảm bảo đo của tổ hợp chuẩn so với thiết bị thỏa mãn tỉ số truyền chuẩn ≤ 1/3 |
| 1.2  | Nhiệt kế chuẩn (Platin, TC)                                 | Phạm vi đo phù hợp với dải đo làm việc của bể điều nhiệt; độ không đảm bảo đo phù hợp với dẫn xuất chuẩn và liên kết chuẩn với hệ thống chuẩn quốc gia |
| 1.3  | Đồng hồ bấm giây điện tử (hoặc công tắc hẹn giờ điện tử)    | Dải đo: (0 ÷ 10) h; độ phân giải: 0,01 s                                                                                                        |
| 2    | **Phương tiện khác**                                        |                                                                                                                                                    |
| 2.1  | Thiết bị đo nhiệt độ và độ ẩm môi trường                    | Dải đo: Nhiệt độ (0 ÷ 50) °C; Độ ẩm tương đối (10 ÷ 95) %RH. Độ phân giải: Nhiệt độ 1 °C; Độ ẩm 1 %RH; liên kết chuẩn với hệ thống chuẩn quốc gia |
| 2.2  | Cốc thủy tinh                                               | Vật liệu: borosilicat hoặc làm bằng vật liệu không hấp thụ năng lượng vi sóng; dung tích: (1; 2) L                                              |
| 2.3  | Bình định mức                                               | Dung tích: (500; 1000) mL                                                                                                                        |
| 2.4  | Cân phân tích (cân chuẩn)                                   | Cấp chính xác A; phạm vi đo: (1,4 ÷ 3.200) g; độ phân giải: 0,01 g; độ chính xác: 0,1 g                                                          |
| 2.5  | Nước cất                                                    | —                                                                                                                                                  |
| 2.6  | Dung môi: glycerol                                          | —                                                                                                                                                  |
| 3    | **Phương tiện phụ**                                          |                                                                                                                                                    |
| 3.1  | Găng tay, dung dịch làm sạch, vải cotton                    | —                                                                                                                                                  |
| 3.2  | Hệ thống gá lắp nhiệt kế                                    | —                                                                                                                                                  |

## 5. Điều kiện hiệu chuẩn

Khi tiến hành hiệu chuẩn phải đảm bảo các điều kiện sau đây:

- Nhiệt độ: (25 ± 5) °C;
- Độ ẩm tương đối: (40 ÷ 80) %RH.

> *Lưu ý:* Điều kiện môi trường tại hiện trường chỉ cần thoả mãn với yêu cầu sử dụng của lò vi sóng cần hiệu chuẩn.

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành hiệu chuẩn phải thực hiện các công việc chuẩn bị sau đây:

- Kiểm tra tình trạng hoạt động lò vi sóng theo hướng dẫn sử dụng của nhà sản xuất;
- Làm vệ sinh sạch sẽ phương tiện cần hiệu chuẩn;
- Lựa chọn và chuẩn bị tổ hợp chuẩn phù hợp với thiết bị cần hiệu chuẩn.

> *Lưu ý:*
> - Nếu lò vừa mới được sử dụng, cần để lò nguội cho đến khi bằng nhiệt độ phòng;
> - Thêm 3 s là để cho phép trễ khởi động của magnetron;
> - Khối lượng nước cất dùng hiệu chuẩn có thể thay đổi phụ thuộc vào kích thước khoang chứa.

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

Phải kiểm tra bên ngoài theo các yêu cầu sau đây: kiểm tra bằng mắt để xác định sự phù hợp của lò vi sóng đối với các yêu cầu quy định trong tài liệu kỹ thuật, hình dáng kích thước, ký nhãn hiệu, nguồn nuôi, hiển thị, tài liệu và phụ kiện kèm theo.

### 7.2. Kiểm tra kỹ thuật

Phải kiểm tra kỹ thuật theo các yêu cầu sau đây:

- Kiểm tra tình trạng hoạt động của lò vi sóng khi cung cấp điện áp danh định được ghi trên nhãn;
- Hệ điều khiển các chức năng hoạt động tốt;
- Bộ chỉ thị hoạt động ổn định, không có hiện tượng thay đổi đột ngột, biến động. Đối với lò vi sóng chỉ thị hiện số, các số hiển thị phải rõ nét, không bị mờ hoặc mất nét. Đối với lò vi sóng chỉ thị hiện số hoặc chỉ thị tương tự, vạch chia phải còn đầy đủ, không bị nhòe hoặc mất chữ số, kim chỉ thị không bị ma sát hoặc kẹt kim;
- Sử dụng đồng hồ bấm giờ, kiểm tra độ chính xác của bộ hẹn giờ của lò vi sóng. Bộ hẹn giờ phải chính xác trong khoảng 2 %. Nếu không, hãy xác định các cài đặt cần thiết để đảm bảo độ chính xác;
- Các bộ phận khác hoạt động bình thường.

### 7.3. Kiểm tra đo lường

Lò vi sóng cần hiệu chuẩn được kiểm tra đo lường theo trình tự nội dung, phương pháp và yêu cầu sau đây:

#### 7.3.1. Phương pháp

**7.3.1.1. Kiểm tra độ chính xác nhiệt độ:** kiểm tra đo lường được thực hiện theo chiều tăng nhiệt độ (theo các điểm nhiệt độ được quy định trong Bảng 3) của dung môi chịu nhiệt tiếp xúc với bức xạ vi sóng trong một khoảng thời gian cố định, sử dụng PTĐ nhiệt độ chuẩn để đo lại nhiệt độ của dung môi.

**7.3.1.2. Kiểm tra công suất vi sóng:** kiểm tra đo lường được thực hiện bằng cách đo độ gia tăng nhiệt độ trong 1 kg nước hấp thụ bức xạ vi sóng của lò trong một khoảng thời gian cố định. So sánh số chỉ công suất của lò vi sóng tại mỗi điểm kiểm tra với giá trị công suất đo được (watt) được xác định bởi tổ hợp chuẩn.

#### 7.3.2. Tiến hành hiệu chuẩn

Có thể lựa chọn kiểm tra một hoặc tất cả thông số sau:

##### 7.3.2.1. Kiểm tra độ chính xác nhiệt độ

- Đổ dung môi vào bình phản ứng của lò vi sóng (khoảng nửa bình);
- Lựa chọn điểm hiệu chuẩn theo Bảng 3 hoặc theo yêu cầu của cơ sở sử dụng phương tiện đo.

**Bảng 3**

| Dải đo (°C) | Điểm hiệu chuẩn (°C)  | Độ chính xác (°C) |
| ------------- | ------------------------ | -------------------- |
| ≤ 100         | 50                        | 2                     |
|               | T – 10                    | 3                     |
| > 100 và ≤ 200 | 50                       | 2                     |
|               | 100                       | 3                     |
|               | T – 10                    | 5                     |
| > 200         | 50                        | 2                     |
|               | 100                       | 3                     |
|               | ½(200 + T)                | 5                     |
|               | T – 10                    | 7                     |

Trong đó: T là điểm nhiệt độ cận trên của dải đo thiết bị.

- Đặt mức nhiệt độ trên lò vi sóng theo Bảng 3 với các điều kiện như quá trình hoạt động bình thường;
- Ngay sau khi hoàn thành chu trình tăng nhiệt, nhúng nhiệt kế vào cốc dung môi và khuấy mạnh, ghi lại giá trị nhiệt độ vào biên bản;
- Thực hiện lặp lại phép đo 05 lần và ghi kết quả vào Biên bản tại Phụ lục kèm theo;
- Tại các điểm hiệu chuẩn khác thực hiện tương tự như trên.

##### 7.3.2.2. Kiểm tra độ chính xác công suất vi sóng

- Hiệu chuẩn 4 điểm liên quan đến phép đo công suất hấp thụ bằng cách thiết lập 4 điểm công suất khác nhau (hoặc theo yêu cầu của cơ sở sử dụng phương tiện đo). Thực hiện hiệu chuẩn từ điểm công suất thấp đến điểm công suất cao;
- Đổ chính xác 1000 mL nước cất (1 kg nước cất) vào cốc có mỏ 2L (hoặc bình phản ứng của lò vi sóng) ở (23 ± 2) °C. Ghi nhiệt độ ban đầu của nước vào biên bản hiệu chuẩn tại Phụ lục kèm theo;
- Đặt cốc (hoặc bình) đã đổ nước vào tâm lò vi sóng. Cốc được đậy nắp, được lưu thông liên tục (theo đường dẫn mẫu bình thường) qua trường vi sóng. Bật công suất lò vi sóng trong 2 phút 3 s tại điểm thiết lập công suất hiệu chuẩn mong muốn khi quạt hút của lò vi sóng ở mức tối đa (như trong quá trình hoạt động bình thường);
- Ngay sau khi hoàn thành chu trình nguồn, nhúng nhiệt kế chuẩn vào cốc nước (hoặc bình nước) và khuấy đều nước. Đo nhiệt độ của nước. Ghi nhiệt độ này vào biên bản;
- Lặp lại các phép đo để thu được các phép đo ba lần về độ tăng nhiệt độ. Sử dụng một mẫu nước mới cho mỗi lần đo. Nếu nước được sử dụng lại, cả nước và cốc phải để nguội trở về (23 ± 2) °C.

#### 7.3.3. Xử lý kết quả hiệu chuẩn

##### 7.3.3.1. Kiểm tra độ chính xác nhiệt độ

Số hiệu chính tại mỗi điểm nhiệt độ hiệu chuẩn được tính theo công thức:

$$\Delta t = t_{ch} - t_{vs} \tag{1}$$

Trong đó `t_ch`: giá trị trung bình của k nhiệt kế chuẩn tại mỗi điểm nhiệt độ hiệu chuẩn, °C:

$$t_{ch} = \frac{1}{k}\sum_{1}^{k} \bar{t} \tag{2}$$

Ở đây, giá trị trung bình của nhiệt kế chuẩn được tính theo công thức:

$$\bar{t} = \frac{1}{n}\sum_{i=1}^{n} (t + \partial t)_i \tag{3}$$

- `t`: giá trị chỉ thị trung bình của nhiệt kế chuẩn, °C;
- `∂t`: số hiệu chính của nhiệt kế chuẩn tại điểm nhiệt độ hiệu chuẩn (lấy từ giấy chứng nhận hiệu chuẩn của nhiệt kế chuẩn), °C;
- `n`: số lần đo của nhiệt kế chuẩn tại mỗi điểm nhiệt độ hiệu chuẩn.

`t_vs`: giá trị trung bình của chỉ thị nhiệt lò vi sóng tại mỗi điểm nhiệt độ hiệu chuẩn, °C:

$$t_{vs} = \frac{1}{n}\sum_{i=1}^{n} t_i \tag{4}$$

`n`: số lần đọc chỉ thị nhiệt độ trên lò vi sóng tại mỗi điểm nhiệt độ hiệu chuẩn.

##### 7.3.3.2. Kiểm tra công suất vi sóng

Công thức tính nhiệt lượng:

$$Q = P \times t \tag{5}$$

Trong đó: `P`: công suất hấp thụ, W; `Q`: nhiệt lượng, W·s; `t`: thời gian hấp thụ công suất vi sóng, s.

Công thức (5) sẽ được biến đổi thành công thức tính công suất sau đây:

$$P = \frac{Q}{t} = \frac{C_w \times m_w \times (T_2 - T_1) + C_b \times m_b \times (T_2 - T_0)}{t} \tag{6}$$

Trong đó:

- `C_w`: nhiệt dung riêng của nước, cal·g⁻¹·°C⁻¹ {C_w = 4,187 J/(K·kg)};
- `m_w`: khối lượng mẫu nước, g;
- `C_b`: nhiệt dung riêng của thuỷ tinh, cal·g⁻¹·°C⁻¹;
- `m_b`: khối lượng của cốc thuỷ tinh, g;
- `T_1`: nhiệt độ ban đầu của nước tinh khiết, °C;
- `T_0`: nhiệt độ môi trường, °C;
- `T_2`: nhiệt độ nước sau khi hấp thụ công suất vi sóng, °C;
- `t`: thời gian hấp thụ công suất vi sóng, s.

> *Lưu ý:* Hệ số chuyển đổi calo·s nhiệt hóa thành watt (K = 4,184).

### 7.4. Đánh giá độ không đảm bảo đo

#### 7.4.1. Đánh giá độ không đảm bảo đo nhiệt độ của lò vi sóng

##### 7.4.1.1. Các yếu tố gây ra độ không đảm bảo đo

Các yếu tố gây ra ĐKĐB bao gồm: thiết bị chuẩn nhiệt độ; thiết bị đo nhiệt độ của lò vi sóng.

##### 7.4.1.2. Tính các độ không đảm bảo đo nhiệt độ thành phần

ĐKĐB đo nhiệt độ của lò vi sóng được tổ hợp từ các nguồn ĐKĐB thành phần, được chia thành hai loại: ĐKĐB đo khi sử dụng nhiệt kế chuẩn và ĐKĐB của thiết bị chỉ thị nhiệt của lò vi sóng, cụ thể như sau:

**a) Độ không đảm bảo đo của nhiệt kế chuẩn:**

$$u_{ch} = \sqrt{u_{ch1}^2 + u_{ch2}^2} \tag{7}$$

ĐKĐB `u_ch1` của nhiệt kế chuẩn (ĐKĐB kiểu B):

$$u_{ch1} = \frac{U_{95}}{2} \tag{8}$$

Với `U_95`: ĐKĐB mở rộng của nhiệt kế chuẩn, lấy từ giấy chứng nhận hiệu chuẩn.

ĐKĐB do độ tản mạn `u_ch2` của các kết quả đo bởi nhiệt kế chuẩn (ĐKĐB kiểu A):

$$u_{ch2} = \sqrt{\frac{S_{ch}^2}{n}} = \frac{S_{ch}}{\sqrt{n}} = \sqrt{\frac{\sum_1^n (t_i - \bar{t})^2}{n(n-1)}} \tag{9}$$

Với `S_ch` được tính theo công thức:

$$S_{ch} = \sqrt{\frac{\sum_1^n (t_i - \bar{t})^2}{n-1}}$$

Trong đó: `S_ch`: độ lệch chuẩn nhiệt độ dung môi đo được bởi nhiệt kế chuẩn tại điểm hiệu chuẩn nhiệt độ lò vi sóng, °C; `n`: số lần đo lặp nhiệt độ dung môi bởi nhiệt kế chuẩn tại mỗi điểm hiệu chuẩn nhiệt độ (n = 5); `t_i`: nhiệt độ dung môi đo được bởi nhiệt kế chuẩn tại lần đo lặp thứ i; `t̄`: giá trị trung bình nhiệt độ dung môi đo được bởi nhiệt kế chuẩn sau n lần đo lặp.

**b) Độ không đảm bảo đo của thiết bị chỉ thị nhiệt của lò vi sóng:**

$$u_{bk} = \sqrt{u_{bk1}^2 + u_{bk2}^2} \tag{10}$$

ĐKĐB do độ tản mạn `u_bk1` của các kết quả đo của bộ chỉ thị nhiệt lò vi sóng:

$$u_{bk1} = \sqrt{\frac{S_{bk1}^2}{n}} = \frac{S_{bk1}}{\sqrt{n}} = \sqrt{\frac{\sum_1^n (t_i - \bar{t})^2}{n(n-1)}} \tag{11}$$

Với `S_bk1` được tính theo công thức:

$$S_{bk1} = \sqrt{\frac{\sum_1^n (t_i - \bar{t})^2}{n-1}}$$

Trong đó: `S_bk1`: độ lệch chuẩn nhiệt độ dung môi đo được trên lò vi sóng tại điểm hiệu chuẩn nhiệt độ lò vi sóng, °C; `n`: số lần đo lặp nhiệt độ dung môi trên lò vi sóng tại mỗi điểm hiệu chuẩn nhiệt độ (n = 5); `t_i`: nhiệt độ dung môi đo được trên lò vi sóng tại lần đo lặp thứ i; `t̄`: giá trị trung bình nhiệt độ dung môi đo được trên lò vi sóng sau n lần đo lặp.

ĐKĐB đo do độ phân giải `u_bk2` của chỉ thị nhiệt độ của lò vi sóng:

Đối với lò vi sóng chỉ thị nhiệt độ kiểu tương tự:

$$u_{bk2} = \frac{d}{3\sqrt{3}} \tag{12}$$

Trong đó: `d`: giá trị độ chia nhiệt độ của lò vi sóng, °C.

Đối với chỉ thị hiện số:

$$u_{bk2} = \frac{d}{2\sqrt{3}} \tag{12'}$$

Trong đó: `d`: độ phân giải chỉ thị nhiệt độ của lò vi sóng, °C.

##### 7.4.1.3. ĐKĐB tổng hợp

ĐKĐB đo tổng hợp được xác định từ tổ hợp các ĐKĐB của nhiệt kế chuẩn và của thiết bị đo nhiệt của lò vi sóng:

$$u_c = \sqrt{u_{ch}^2 + u_{bk}^2}$$

Thay công thức (7) và (10) vào công thức trên sẽ nhận được công thức (13):

$$u_c = \sqrt{u_{ch1}^2 + u_{ch2}^2 + u_{bk1}^2 + u_{bk2}^2} \tag{13}$$

##### 7.4.1.4. ĐKĐB mở rộng

ĐKĐB mở rộng U là đại lượng xác định miền giá trị phân bố bao quanh kết quả đo:

$$U = k \times u_c$$

Trong đó: k là hệ số phủ, thường được chọn k = 2 với mức tin cậy xấp xỉ 95 %.

#### 7.4.2. Đánh giá độ không đảm bảo đo công suất lò vi sóng

##### 7.4.2.1. Các yếu tố gây ra độ không đảm bảo đo

Các ĐKĐB thành phần chủ yếu từ các nguồn sau: phép đo khối lượng nước; phép đo khối lượng bình thủy tinh; phép đo thời gian phát công suất lò vi sóng; phép đo nhiệt độ môi trường, nhiệt độ ban đầu của nước, nhiệt độ cuối của nước sau khi hấp thụ công suất cao tần; thiết bị đo công suất của lò vi sóng cần hiệu chuẩn.

##### 7.4.2.2. Tính các độ không đảm bảo thành phần đo công suất vi sóng

Mô hình toán học theo công thức (6) cho thấy có 06 tham số đầu vào đóng góp vào đại lượng đầu ra, đó là: khối lượng nước, khối lượng cốc thuỷ tinh borosilicate, nhiệt độ môi trường, nhiệt độ ban đầu và nhiệt độ sau thời gian hấp thụ công suất vi sóng của cốc, thời gian hấp thụ công suất vi sóng.

**a) ĐKĐB từ sử dụng cân chuẩn để cân khối lượng nước** `u_w = √(u_w1² + u_w2²)` và hệ số nhạy `c_w`, được xác định như sau:

ĐKĐB thành phần `u_w1` do độ tản mạn của kết quả cân khối lượng nước:

$$u_{w1} = \sqrt{\frac{S_j^2}{n}} = \frac{S_j}{\sqrt{n}} = \sqrt{\frac{\sum_1^n (m_{wi} - \bar{m}_w)^2}{n(n-1)}} \tag{14}$$

Với `S_j` được tính theo công thức:

$$S_j = \sqrt{\frac{\sum_1^n (m_{wi} - \bar{m}_w)^2}{n-1}}$$

Trong đó: `s_j`: độ lệch chuẩn cân khối lượng nước tại điểm kiểm tra công suất thứ j, g; `n`: số lần cân lặp khối lượng nước tại mỗi điểm kiểm tra công suất thứ j; `m_wi`: khối lượng nước cân được tại lần cân lặp thứ i, g; `m̄_w`: giá trị trung bình khối lượng nước sau n lần cân, g.

ĐKĐB thành phần `u_w2` được lấy từ giấy chứng nhận hiệu chuẩn của cân chuẩn:

$$u_{w2} = \frac{A}{2} \tag{15}$$

Trong đó: `u_w2`: ĐKĐB của cân chuẩn khi cân nước, g; `A`: ĐKĐB của cân chuẩn tại mức tải m được lấy từ giấy chứng nhận hiệu chuẩn, g.

Hệ số nhạy:

$$c_w = \frac{\partial P}{\partial m_w} = \frac{C_w \times (T_2 - T_1)}{t} \tag{16}$$

**b) ĐKĐB khi sử dụng cân chuẩn để cân khối lượng cốc thủy tinh** `u_b = √(u_b1² + u_b2²)` và hệ số nhạy `c_b`, được xác định như sau:

ĐKĐB thành phần `u_b1` do độ tản mạn của kết quả cân khối lượng cốc thủy tinh:

$$u_{b1} = \sqrt{\frac{S_j^2}{n}} = \frac{S_j}{\sqrt{n}} = \sqrt{\frac{\sum_1^n (m_{bi} - \bar{m}_b)^2}{n(n-1)}} \tag{17}$$

Với `S_j` được tính theo công thức:

$$S_j = \sqrt{\frac{\sum_1^n (m_{bi} - \bar{m}_b)^2}{n-1}}$$

Trong đó: `S_j`: độ lệch chuẩn của khối lượng cốc thủy tinh cân được tại điểm kiểm tra công suất thứ j, g; `n`: số lần cân lặp khối lượng cốc thủy tinh; `m_bi`: khối lượng cốc cân được tại lần cân lặp thứ i, g; `m̄_b`: giá trị trung bình khối lượng cốc sau n lần cân, g.

ĐKĐB của cân chuẩn `u_b2` khi cân cốc thủy tinh, lấy từ giấy chứng nhận hiệu chuẩn:

$$u_{b2} = \frac{A}{2} \tag{18}$$

Trong đó: `u_b2`: ĐKĐB của cân chuẩn khi cân cốc thủy tinh, g; `A`: ĐKĐB của cân chuẩn tại mức tải m được lấy từ giấy chứng nhận hiệu chuẩn, g.

Hệ số nhạy:

$$c_b = \frac{\partial P}{\partial m_b} = \frac{C_b \times (T_2 - T_0)}{t} \tag{19}$$

**c) ĐKĐB đo nhiệt độ môi trường** `u_T0 = √(u_T01² + u_T02²)` và hệ số nhạy `c_T0`, được xác định như sau:

ĐKĐB thành phần `u_T01` do độ tản mạn của kết quả đo nhiệt độ môi trường thực tế:

$$u_{T01} = \sqrt{\frac{S_j^2}{n}} = \frac{S_j}{\sqrt{n}} = \sqrt{\frac{\sum_1^n (T_{0i} - \bar{T}_0)^2}{n(n-1)}} \tag{20}$$

Với `S_j` được tính theo công thức:

$$S_j = \sqrt{\frac{\sum_1^n (T_{0i} - \bar{T}_0)^2}{n-1}}$$

Trong đó: `S_j`: độ lệch chuẩn nhiệt độ môi trường đo được tại điểm kiểm tra công suất thứ j, °C; `n`: số lần đo lặp; `T_0i`: nhiệt độ môi trường đo được tại lần đo thứ i, °C; `T̄_0`: giá trị trung bình đo nhiệt độ môi trường sau n lần đo, °C.

ĐKĐB thành phần `u_T02` lấy từ giấy chứng nhận hiệu chuẩn PTĐ nhiệt độ:

$$u_{T02} = \frac{B}{2} \tag{21}$$

Với `B`: ĐKĐB của nhiệt độ lấy từ giấy chứng nhận hiệu chuẩn PTĐ nhiệt độ, °C.

Hệ số nhạy:

$$c_{T0} = \frac{\partial P}{\partial T_0} = -\frac{C_b \times m_b}{t} \tag{22}$$

**d) ĐKĐB của nhiệt độ ban đầu của nước** `u_T1 = √(u_T11² + u_T12²)` và hệ số nhạy `c_T1`, được xác định như sau:

`u_T11` là ĐKĐB thành phần do độ tản mạn của kết quả nhiệt độ ban đầu của nước:

$$u_{T11} = \sqrt{\frac{S_j^2}{n}} = \frac{S_j}{\sqrt{n}} = \sqrt{\frac{\sum_1^n (T_{1i} - \bar{T}_1)^2}{n(n-1)}} \tag{23}$$

Với `S_j` được tính theo công thức:

$$S_j = \sqrt{\frac{\sum_1^n (T_{1i} - \bar{T}_1)^2}{n-1}}$$

Trong đó: `S_j`: độ lệch chuẩn nhiệt độ ban đầu của nước đo được tại điểm kiểm tra công suất thứ j, °C; `n`: số lần đo lặp; `T_1i`: nhiệt độ ban đầu của nước đo được tại lần đo thứ i, °C; `T̄_1`: giá trị trung bình đo nhiệt độ ban đầu của nước sau n lần đo, °C.

ĐKĐB thành phần `u_T12` lấy từ giấy chứng nhận hiệu chuẩn PTĐ nhiệt độ:

$$u_{T12} = \frac{C}{2} \tag{24}$$

Với `C`: ĐKĐB của nhiệt độ lấy từ giấy chứng nhận hiệu chuẩn PTĐ nhiệt độ.

Hệ số nhạy:

$$c_{T1} = \frac{\partial P}{\partial T_1} = -\frac{C_w \times m_w}{t} \tag{25}$$

**e) ĐKĐB đo nhiệt độ của nước sau khi hấp thụ công suất vi sóng** `u_T2 = √(u_T21² + u_T22²)` và hệ số nhạy `c_T2`, được xác định như sau:

ĐKĐB thành phần `u_T21` do độ tản mạn của kết quả đo nhiệt độ của nước sau khi hấp thụ công suất vi sóng:

$$u_{T21} = \sqrt{\frac{S_j^2}{n}} = \frac{S_j}{\sqrt{n}} = \sqrt{\frac{\sum_1^n (T_{2i} - \bar{T}_2)^2}{n(n-1)}} \tag{26}$$

Với `S_j` được tính theo công thức:

$$S_j = \sqrt{\frac{\sum_1^n (T_{2i} - \bar{T}_2)^2}{n-1}}$$

Trong đó: `S_j`: độ lệch chuẩn nhiệt độ nước sau khi hấp thụ công suất vi sóng đo được tại điểm kiểm tra công suất thứ j, °C; `n`: số lần đo lặp; `T_2i`: nhiệt độ của nước sau khi hấp thụ công suất vi sóng đo được tại lần đo thứ i, °C; `T̄_2`: giá trị trung bình đo nhiệt độ của nước sau khi hấp thụ công suất vi sóng sau n lần đo, °C.

ĐKĐB thành phần `u_T22` được lấy từ giấy chứng nhận hiệu chuẩn PTĐ nhiệt độ:

$$u_{T22} = \frac{C}{2} \tag{27}$$

Với `C`: ĐKĐB đo nhiệt độ được lấy từ giấy chứng nhận hiệu chuẩn PTĐ nhiệt độ.

Hệ số nhạy:

$$c_{T2} = \frac{\partial P}{\partial T_2} = \frac{C_b \times m_b + C_w \times m_w}{t} \tag{28}$$

**f) ĐKĐB của thời gian hấp thụ công suất vi sóng** `u_t`, hệ số nhạy `c_t`, được xác định như sau:

$$u_t = \frac{D}{2} \tag{27'}$$

> *Ghi chú:* bản gốc lặp lại số thứ tự công thức (27) cho công thức này (khác với công thức (27) ở mục e); đánh dấu (27') để phân biệt trong bản chuyển đổi, giữ nguyên nội dung công thức gốc.

Với `D`: ĐKĐB đo thời gian được lấy từ giấy chứng nhận hiệu chuẩn của đồng hồ bấm giây điện tử (chuẩn thời gian).

Hệ số nhạy:

$$c_t = \frac{\partial P}{\partial t} = -\frac{C_w \times m_w \times (T_2 - T_1) + C_b \times m_b \times (T_2 - T_0)}{t^2} \tag{28'}$$

**g) Tính ĐKĐB thành phần `u_DUT` đo công suất của lò vi sóng cần hiệu chuẩn:**

$$u_{DUT} = \sqrt{u_{DUT1}^2 + u_{DUT2}^2} \tag{29}$$

ĐKĐB do độ tản mạn `u_DUT1` của các kết quả đo công suất trên lò vi sóng:

$$u_{DUT1} = \sqrt{\frac{S_j^2}{n}} = \frac{S_j}{\sqrt{n}} = \sqrt{\frac{\sum_1^n (P_{DUTi} - \bar{P}_{DUT})^2}{n(n-1)}} \tag{30}$$

Với `S_j` được tính theo công thức:

$$S_j = \sqrt{\frac{\sum_1^n (P_{DUTi} - \bar{P}_{DUT})^2}{n-1}}$$

Trong đó: `S_j`: độ lệch chuẩn công suất vi sóng đo được trên lò vi sóng tại điểm kiểm tra công suất thứ j, W; `n`: số lần đo lặp; `P_DUTi`: công suất vi sóng đo được trên lò vi sóng tại lần đo thứ i, W; `P̄_DUT`: giá trị trung bình đo công suất trên lò vi sóng sau n lần đo, W.

ĐKĐB do độ phân giải `u_DUT2` của chỉ thị công suất trên lò vi sóng:

$$u_{DUT2} = \frac{R \times d}{\sqrt{3}} \tag{31}$$

Trong đó: `u_DUT2`: ĐKĐB do độ phân giải công suất của lò vi sóng, W; `R`: giá trị nhỏ nhất của PTĐ cần hiệu chuẩn; d = 1/2 đối với bộ chỉ thị hiện số; d = 1/10 đối với bộ chỉ thị tương tự.

Hệ số nhạy:

$$c_{DUT} = 1 \tag{32}$$

##### 7.4.2.3. ĐKĐB tổng hợp

Từ công thức tổng quát (6) ta có ĐKĐB tổng hợp như sau:

$$u_c = \sqrt{c_w^2 u_w^2 + c_b^2 u_b^2 + c_{T0}^2 u_{T0}^2 + c_{T1}^2 u_{T1}^2 + c_{T2}^2 u_{T2}^2 + c_t^2 u_t^2 + c_{DUT}^2 u_{DUT}^2} \tag{33}$$

Thay các công thức từ (14) đến công thức (32) vào công thức (33) ta có:

$$u_c = \sqrt{c_w^2(u_{w1}^2 + u_{w2}^2) + c_b^2(u_{b1}^2 + u_{b2}^2) + c_{T0}^2(u_{T01}^2 + u_{T02}^2) + c_{T1}^2(u_{T11}^2 + u_{T12}^2) + c_{T2}^2(u_{T21}^2 + u_{T22}^2) + c_t^2 u_t^2 + c_{DUT}^2(u_{DUT1}^2 + u_{DUT2}^2)} \tag{34}$$

##### 7.4.2.4. ĐKĐB mở rộng

$$U = k \times u_C$$

Với k là hệ số bao phủ, thường được chọn k = 2 với mức tin cậy xấp xỉ 95 %.

## 8. Xử lý chung

- **8.1.** PTĐ sau khi hiệu chuẩn được dán tem, cấp giấy chứng nhận hiệu chuẩn kèm theo thông báo kết quả hiệu chuẩn.
- **8.2.** Chu kỳ hiệu chuẩn được khuyến nghị là 12 tháng.

## 9. Phụ lục

Phụ lục 01 - Biên bản hiệu chuẩn (BBHC).

## TÀI LIỆU THAM KHẢO

1. Beck, M., Steer, B., & Brown, M. (1996). Microwave Assisted Acid Digestion of Siliceous and Organically Based Matrices. Syria Studies, 7(1), 37–72.
2. Tổng cục Tiêu chuẩn Đo lường Chất lượng. TCVN 5699-2-25:2007: Thiết bị điện gia dụng và các thiết bị điện tương tự - An toàn. Phần 2-25: Yêu cầu cụ thể đối với lò vi sóng, Lò vi sóng kết hợp.
3. Xiao, T., Mao, X., & Fu, K. (2018). A novel power calibration method for microwave digestion system. Proceedings of 2018 IEEE 4th Information Technology and Mechatronics Engineering Conference, ITOEC 2018, Itoec, 659–662. https://doi.org/10.1109/ITOEC.2018.8740768
4. ASTM, F 1317-98 - Standard Test Method for Calibration of Microwave Ovens, ASTM, 2002.
5. https://en.wikipedia.org/wiki/Table_of_specific_heat_capacities
6. https://www.engineeringtoolbox.com/specific-heat-solids-d_154.html
