---
id: ETV.MCS 01
title: "Phương tiện đo độ ồn — Quy trình hiệu chuẩn"
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
keywords: [độ ồn, sound level meter, chuẩn âm đa chức năng, mức áp suất âm, hiệu chuẩn]
related_documents: []
iso_clause: ["ISO/IEC 17025:2015"]
legal_basis: ["ĐLVN 89:2010", "ĐLVN 131:2003"]
ai_tags: [calibration-procedure, sound-level-meter, acoustic-calibrator, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCS 01_Do on_V7.pdf`"
supersedes: "ETV.MCS 01 lần ban hành 01 (22/04/2019, rà soát 18/09/2019 và 22/04/2023)"
superseded_by: null
---
# PHƯƠNG TIỆN ĐO ĐỘ ỒN – QUY TRÌNH HIỆU CHUẨN

*Sound level meter – Calibration procedure*

|                   |                     |
| ----------------- | ------------------- |
| **Mã số**         | ETV.MCS 01          |
| **Lần ban hành**  | 02                  |
| **Ngày ban hành** | 22/04/2026          |
| **Biên soạn**     | *(bản gốc để trống)* |
| **Soát xét**      | Trần Thị Hoa        |
| **Phê duyệt**     | Nguyễn Hoàng Giang  |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCS 01_Do on_V7.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khối chữ ký trong bản gốc để trống, chưa có tên người biên soạn.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian  | Nội dung thay đổi                                             | Lần ban hành |
| ---------- | -------------------------------------------------------------- | ------------ |
| 22/04/2019 | Ban hành lần thứ nhất                                           | 01           |
| 18/09/2019 | Rà soát theo ý kiến chuyên gia BoA                              | 01           |
| 22/04/2023 | Rà soát theo ý kiến góp ý chuyên gia BoA trong đợt đánh giá lại | 02           |
| 22/04/2026 | Ban hành lần thứ hai                                            | 02           |

---

## 1. Phạm vi áp dụng

Quy trình này quy định quy trình kỹ thuật hiệu chuẩn phương tiện đo độ ồn "Class 1", "Class 2" phù hợp với các tiêu chuẩn IEC 60651:1979, IEC 61672-1:2005, BS EN 60651-ANSI, S1.4-1983 hoặc các tiêu chuẩn tương đương.

Quy trình này áp dụng đối với nhân viên của Viện Kiểm định Công nghệ và Môi trường (sau đây gọi tắt là PTN) khi hiệu chuẩn PTĐ nói trên.

## 2. Giải thích từ ngữ

Các thuật ngữ và định nghĩa trong văn bản này được hiểu như sau:

1. **Hiệu chuẩn:** là hoạt động xác định, thiết lập mối quan hệ giữa giá trị đo của chuẩn đo lường, phương tiện đo với giá trị đo của đại lượng cần đo.
2. **Hiệu chỉnh:** là tập hợp các thao tác được tiến hành trên hệ thống đo để cho ra số chỉ đã quy định tương ứng với giá trị đã cho của đại lượng được đo.
3. **Độ không đảm bảo đo (ĐKĐB):** thông số gắn với kết quả của phép đo, đặc trưng cho sự phân tán của các giá trị có thể quy cho đại lượng đo một cách hợp lý.
4. **RMS:** căn bậc hai của trung bình bình phương của mức áp suất âm.
5. **Crest Factor:** tỉ số giữa giá trị lớn nhất và giá trị RMS của mức áp suất âm.
6. **Trọng số tần số (Frequency Weighting):** cho một phương tiện đo độ ồn, là sự khác biệt giữa mức tín hiệu chỉ thị trên thiết bị hiển thị và mức tín hiệu vào hình sin liên tục có biên độ không đổi.
7. **Trọng số thời gian (Time Weighting):** hàm mũ theo thời gian, với một hằng số thời gian xác định, để lấy giá trị trung bình của mức áp suất âm tức thời theo trọng số.

## 3. Các phép hiệu chuẩn

Phải lần lượt tiến hành các phép kiểm tra ghi trong Bảng 1.

**Bảng 1**

| TT  | Tên phép hiệu chuẩn             | Theo điều, mục của quy trình |
| --- | --------------------------------- | ------------------------------- |
| 1   | Kiểm tra bên ngoài                | 7.1                              |
| 2   | Kiểm tra kỹ thuật                 | 7.2                              |
| 3   | Kiểm tra đo lường                 | 7.3                              |
| 4   | Tính toán độ không đảm bảo đo     | 7.4                              |
| 5   | Xử lý chung                       | 8                                |

## 4. Phương tiện phục vụ hiệu chuẩn

Phương tiện hiệu chuẩn được ghi trong Bảng 2.

**Bảng 2**

| TT   | Phương tiện hiệu chuẩn                                                | Đặc trưng kỹ thuật                                                                                                                                                                                                              |
| ---- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| I    | **Phương tiện đo chuẩn**                                                |                                                                                                                                                                                                                                   |
| 1    | Chuẩn âm đa chức năng (Multifunction Acoustic Calibrator, Type: 4226)   | - Mức áp suất âm danh nghĩa: 94 dB, 104 dB, 114 dB<br>- Phạm vi tần số: từ 31,5 Hz đến 16 kHz<br>- Sai số tuyệt đối tại mức áp suất âm chuẩn: 94 dB ± 0,2 dB, 20 µPa, 1 kHz<br>- Sai số tuyệt đối ở các bước 10 dB và 20 dB: ± 0,1 dB với tần số ≤ 8 kHz, ± 0,2 dB với tần số > 8 kHz<br>- Độ ổn định tần số: đến 30 µHz/Hz (ppm) |
| II   | **Phương tiện đo phụ**                                                  |                                                                                                                                                                                                                                   |
| 2    | Thiết bị đo nhiệt độ, độ ẩm                                              | - Dải đo: Nhiệt độ (0 ÷ 50) °C; Độ ẩm tương đối (10 ÷ 95) %RH<br>- Độ phân giải: Nhiệt độ 1 °C; Độ ẩm 1 %RH                                                                                                                     |

## 5. Điều kiện hiệu chuẩn

Khi tiến hành hiệu chuẩn phải đảm bảo các điều kiện sau:

- Nhiệt độ môi trường: (23 ± 5) °C;
- Độ ẩm môi trường: ≤ 80 %RH.

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành hiệu chuẩn phải thực hiện các công việc sau đây:

- **a)** Chọn máy hiệu chuẩn âm đa chức năng theo các yêu cầu tại mục 1 Bảng 2.
- **b)** PTĐ độ ồn cần hiệu chuẩn phải được đặt trong phòng đạt điều kiện hiệu chuẩn ít nhất 30 phút trước khi tiến hành hiệu chuẩn.
- **c)** Lắp microphone của PTĐ độ ồn vào Couple của thiết bị chuẩn âm đa chức năng.
- **d)** Bật công tắc nguồn nuôi của thiết bị chuẩn âm đa chức năng để kiểm tra tín hiệu. Đặt chuyển mạch "Microphone" tại vị trí a, "Sound Field" tại vị trí "Pressure", "Function" tại vị trí "Calibration", "Sound level" với giá trị mức 94 dB tại tần số 1 kHz trên chuẩn âm đa chức năng.
- **e)** Bật công tắc nguồn nuôi của PTĐ độ ồn cần hiệu chuẩn theo tài liệu hướng dẫn sử dụng.
- **f)** Các dụng cụ bảo hộ lao động.

> **Chú ý:**
> - Luôn tắt nguồn của thiết bị sau khi sử dụng. Tháo pin ra khỏi thiết bị nếu thời gian dài không sử dụng thiết bị (lâu hơn 1 tuần).
> - Chỉ lau thiết bị bằng vải mềm khô, khi thật sự cần thiết thì dùng vải hơi ẩm nước, không được dùng cồn, dung môi hoặc các loại hóa chất để lau chùi thiết bị.
> - Không dùng các vật dụng như bút, tô vít… để chỉ lên màn hình LCD và mặt máy.

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

Phải kiểm tra bề ngoài theo các yêu cầu sau đây:

- Máy đo độ ồn phải có tên gọi, kiểu mẫu, số sản xuất, đơn vị đo, chỉ dẫn chức năng còn nguyên, không bị tẩy xoá. Công tắc, phím ấn, núm điều chỉnh, đèn hiển thị không bị kẹt, hư hỏng.
- Đầu nhận tín hiệu âm thanh (Microphone) không bị móp, méo, lưới bảo vệ, màng rung không bị rách hoặc bám bụi bẩn.
- Đặt chuẩn âm đa chức năng và máy đo độ ồn vào vị trí không bị ảnh hưởng bởi rung động và tiếng ồn bên ngoài.

### 7.2. Kiểm tra kỹ thuật

Phải kiểm tra kỹ thuật theo yêu cầu sau đây:

- Kiểm tra nguồn cung cấp: kiểm tra pin trên PTĐ độ ồn và chuẩn âm đa chức năng, nếu pin yếu thì cần thực hiện thay pin mới.
- Kiểm tra hoạt động của PTĐ độ ồn: thực hiện tất cả các thao tác cần thiết để khẳng định PTĐ độ ồn đang hoạt động bình thường.

### 7.3. Kiểm tra đo lường

Máy đo độ ồn được kiểm tra đo lường theo trình tự, nội dung, phương pháp và yêu cầu sau đây:

#### 7.3.1. Đo điều kiện môi trường

Thực hiện đo điều kiện môi trường bao gồm các thông số: nhiệt độ, độ ẩm, áp suất; mỗi thông số thực hiện đo lặp lại 3 lần, ghi lại giá trị lần lượt vào biên bản hiệu chuẩn.

> *Ghi chú:* Thời gian thực hiện đo điều kiện môi trường là thời gian bắt đầu thực hiện, giữa khoảng thực hiện và kết thúc quá trình thực hiện hiệu chuẩn.

#### 7.3.2. Đo hiệu chỉnh

Đo hiệu chỉnh tại điểm 94 dB.

**Trường hợp 1: Máy đo độ ồn có chức năng hiệu chỉnh điểm 94 dB bằng biến trở**

- Đưa đầu đo của máy đo độ ồn vào chuẩn độ ồn sao cho độ rung và ồn bên ngoài không ảnh hưởng đến phép đo;
- Chọn độ ồn 94 dB, tần số 1 kHz trên chuẩn độ ồn;
- Chọn chức năng hiệu chỉnh điểm 94 dB trên PTĐ độ ồn (CAL 94 dB);
- Điều chỉnh biến trở để chỉ thị của PTĐ độ ồn chỉ thị đúng giá trị 94 dB.

**Trường hợp 2: PTĐ độ ồn có chức năng hiệu chỉnh điểm 94 dB bằng phần mềm**

- Tiến hành các bước như PTĐ độ ồn có chức năng hiệu chỉnh bằng biến trở. Tuy nhiên bước điều chỉnh được tiến hành theo hướng dẫn sử dụng của nhà sản xuất.

#### 7.3.3. Đo kiểm tra sau khi hiệu chỉnh

##### 7.3.3.1. Kiểm tra đáp ứng tần số

- **a)** Đặt PTĐ độ ồn ở chế độ đo "RMS", trọng số thời gian F (Fast) hoặc S (Slow);
- **b)** Đặt chuyển mạch "Microphone", "Sound Field" trên chuẩn âm đa chức năng 4226 (sau đây gọi tắt 4226) ở vị trí phù hợp, tùy thuộc kiểu microphone và kiểu PTĐ độ ồn theo hướng dẫn sử dụng của 4226 hoặc của DUT;
- **c)** Đặt chuyển mạch "Function" ở vị trí "Calibration";
- **d)** Đặt chuyển mạch "Sound Level" trên 4226 lần lượt ở các vị trí "94 Inv.A"(\*), "94 Lin", "104 Lin", "114 Lin". Bật nguồn 4226;
- **e)** Tại mỗi vị trí chuyển mạch "Sound Level" nêu trên, lần lượt thay đổi các tần số trong phạm vi dải tần của chuẩn âm đa chức năng phù hợp với dải tần của PTĐ độ ồn;
- **f)** Đọc giá trị hiển thị trên PTĐ độ ồn 5 lần tương ứng với mỗi tần số và ghi giá trị này vào biên bản hiệu chuẩn mục A — Phụ lục 1.

*(\*) Ở chế độ "94 Inv.A" phải đặt PTĐ độ ồn ở chế độ đáp ứng tần số loại A.*

##### 7.3.3.2. Kiểm tra độ tuyến tính

- **a)** Đặt PTĐ độ ồn ở chế độ đo "RMS", trọng số thời gian F (Fast) hoặc S (Slow);
- **b)** Đặt chuyển mạch "Microphone", "Sound Field" trên chuẩn âm đa chức năng 4226 ở vị trí phù hợp như ở trên;
- **c)** Đặt chuyển mạch "Function" ở vị trí "Calibration". Bật máy 4226;
- **d)** Chuyển tần số trên 4226 để chọn lần lượt tất cả các tần số trong phạm vi dải tần đo của PTĐ độ ồn;
- **e)** Ở mỗi tần số trên, đặt chuyển mạch "Sound Level" trên 4226 lần lượt ở các vị trí "94 Lin", "104 Lin", "114 Lin";
- **f)** Đọc giá trị hiển thị trên PTĐ độ ồn 5 lần tương ứng với các tần số và ghi giá trị này vào biên bản hiệu chuẩn mục B — Phụ lục 1.

##### 7.3.3.3. Kiểm tra trọng số thời gian F và S

- **a)** Đặt PTĐ độ ồn ở chế độ đo RMS, trọng số thời gian là F (Fast);
- **b)** Đặt chuyển mạch "Function" trên 4226 ở vị trí "Test Level". Bật máy 4226. Đèn chỉ thị "2 kHz" trên 4226 phải sáng;
- **c)** Điều chỉnh núm xoay trên 4226 cho đến khi PTĐ độ ồn chỉ thị giá trị 106,0 dB ổn định;
- **d)** Đặt chuyển mạch "Function" trên 4226 ở vị trí "Time Weighting F";
- **e)** Ghi lại giá trị RMS cực đại đọc trên PTĐ độ ồn;
- **f)** Thực hiện lần lượt các bước b), c), d), e) 4 lần để ghi lại bốn giá trị vào mục C — Phụ lục 1;
- **g)** Thực hiện lại lần lượt các bước b), c), d), e) với sự thay đổi:
  - Ở bước a): chuyển mạch "Time Weighting" trên PTĐ độ ồn ở vị trí S (Slow);
  - Ở bước d): chuyển mạch "Function" trên 4226 ở vị trí "Time Weighting S".

##### 7.3.3.4. Kiểm tra khả năng đo với Crest Factor

- **a)** Đặt PTĐ độ ồn ở chế độ RMS và trọng số thời gian F (Fast) hoặc S (Slow);
- **b)** Đặt chuyển mạch "Function" trên 4226 ở vị trí "Test Level". Bật máy 4226. Đèn chỉ thị "2 kHz" trên 4226 phải sáng;
- **c)** Điều chỉnh núm xoay trên 4226 cho đến khi PTĐ độ ồn chỉ thị giá trị 100 dB ổn định;
- **d)** Đặt chuyển mạch "Function" trên 4226 ở vị trí "Crest Factor";
- **e)** Ghi lại giá trị đọc trên PTĐ độ ồn;
- **f)** Thực hiện lần lượt các bước b), c), d), e) 04 lần để ghi lại 04 giá trị mục D — Phụ lục 1.

> **Lưu ý:** Hệ số hiệu chính trường áp suất sang trường tự do có thể áp dụng 1 trong các trường hợp sau:
> - Số công bố trong HDSD của SLM (đối với các SLM có công bố);
> - Áp dụng trang 13 HDSD 4226 đối với các SLM sử dụng Microphone của B&K;
> - Đối với các SLM còn lại nên để 4226 ở chức năng pressure và công bố rõ không áp dụng số hiệu chỉnh;
> - Bổ sung thêm giá trị Correction đối với một số hãng công bố. VD: RION NL-42, RION NL-52. Nếu thiết bị không công bố, thì giá trị Correction = 0.

### 7.4. Tính toán độ không đảm bảo đo

Trình tự tính toán ĐKĐB theo 4 bước: (1) Phép đo đặc trưng → (2) Xác định các yếu tố ảnh hưởng đến ĐKĐB → (3) Tính toán ĐKĐB của các yếu tố ảnh hưởng → (4) Tính toán ĐKĐB kết hợp và ĐKĐB mở rộng.

#### 7.4.1. Các yếu tố gây ra ĐKĐB bao gồm

- PTĐ độ ồn: đặc tính kỹ thuật do nhà sản xuất cung cấp, số liệu đo đạc lần trước, độ chính xác, độ lặp lại, thời gian đáp ứng và độ phân giải của PTĐ;
- Thiết bị chuẩn âm đa chức năng: đặc tính kỹ thuật do nhà sản xuất cung cấp, độ phân giải của thiết bị, độ không đảm bảo đo;
- Điều kiện môi trường trong phòng đo/hiệu chuẩn (nhiệt độ, độ ẩm, áp suất);
- Nhân viên đo/hiệu chuẩn;
- Nguồn điện cấp vào thiết bị;
- Một số ảnh hưởng ngẫu nhiên khác.

#### 7.4.2. Tính toán ĐKĐB của các yếu tố ảnh hưởng tại tất cả các điểm hiệu chuẩn

Các thành phần của độ không đảm bảo đo cho trong bảng sau:

| Yếu tố                                          | Phân bố    | Kiểu | ĐKĐB chuẩn |
| ------------------------------------------------ | ---------- | ---- | ---------- |
| Độ không đảm bảo đo của các lần đo lặp           | Chuẩn      | A    | u1         |
| Độ không đảm bảo đo của chuẩn                    | Chuẩn      | B    | u2         |
| Độ phân giải của PTĐ độ ồn                       | Chữ nhật   | B    | u3         |
| Hệ số nhiệt độ của chuẩn                         | Chữ nhật   | B    | u4         |
| Hệ số áp suất tĩnh của chuẩn                     | Chữ nhật   | B    | u5         |
| Độ không đảm bảo đo của giá trị Correction       | Chuẩn      | B    | u6         |

Các yếu tố ảnh hưởng đến ĐKĐB được xác định từ mục 7.4.1. Tuy nhiên, không phải tất cả các yếu tố ảnh hưởng đều có thể xác định được hoặc có những yếu tố ảnh hưởng không đáng kể tới ĐKĐB thì có thể xem xét và bỏ qua như: nhân viên thực hiện công tác đo/hiệu chuẩn, nguồn điện và một vài yếu tố ngẫu nhiên khác… ĐKĐB được tính như sau:

**ĐKĐB của PTĐ độ ồn cần hiệu chuẩn (u1):** ĐKĐB của kết quả đo lặp lại 5 lần trên PTĐ độ ồn cần hiệu chuẩn.

$$u_1 = \sqrt{\frac{S_j^2}{n}} = \frac{S_j}{\sqrt{n}} = \frac{\sum_1^n (q_i - \bar{q})}{\sqrt{n(n-1)}} \tag{1}$$

Với `S_j` được tính theo công thức:

$$S_j = \frac{\sum_1^n (q_i - \bar{q})}{\sqrt{n-1}}$$

Trong đó:

- `s_j`: độ lệch chuẩn tại điểm đo thứ j;
- `n`: số lần đọc tại mỗi điểm;
- `q_i`: giá trị kết quả đo được tại lần đọc thứ i, dB;
- `q̄`: giá trị trung bình đo được tại n điểm, dB.

**ĐKĐB của thiết bị chuẩn âm đa chức năng (u2):** Dựa vào giấy chứng nhận hiệu chuẩn, ĐKĐB mở rộng của chuẩn là `U_cal`.

$$u_2 = \frac{U_{cal}}{k} \tag{2}$$

`u2`: ĐKĐB của thiết bị chuẩn âm đa chức năng được xác định thông qua ĐKĐB đã được liên kết với cấp cao hơn.

**ĐKĐB do độ phân giải của PTĐ độ ồn (u3), dB:**

$$u_3 = \frac{a}{2\sqrt{3}} \tag{3}$$

`a`: độ phân giải của PTĐ cần hiệu chuẩn.

**ĐKĐB do nhiệt độ môi trường (u4), dB:**

$$u_4 = \frac{\delta_{qtc} \times \Delta t}{\sqrt{3}} \tag{4}$$

`Δt` (°C): giá trị tuyệt đối của hiệu nhiệt độ môi trường khi hiệu chuẩn PTĐ đo độ ồn và nhiệt độ khi hiệu chuẩn chuẩn (công bố trong giấy chứng nhận hiệu chuẩn của chuẩn). `δ_qtc`: hệ số nhiệt độ của chuẩn âm do thay đổi nhiệt độ môi trường, dB/°C (được lấy từ đặc trưng kỹ thuật của chuẩn 4226 = 0,002 dB/°C).

**ĐKĐB do áp suất môi trường (u5), dB:**

$$u_5 = \frac{\delta_{qtc} \times \Delta p}{\sqrt{3}} \tag{5}$$

`Δp`: giá trị tuyệt đối của hiệu áp suất môi trường lúc hiệu chuẩn PTĐ đo độ ồn và áp suất khi hiệu chuẩn chuẩn âm thanh (được lấy từ đặc trưng kỹ thuật của chuẩn 4226 = 0,00055 dB/hPa). `δ_qtc`: hệ số áp suất của chuẩn âm do thay đổi áp suất môi trường, dB/kPa.

**ĐKĐB của giá trị Correction (u6), dB:**

$$u_6 = \frac{U_{correct}}{k}$$

`U_correct`: lấy theo công bố của hãng tại tài liệu kỹ thuật hoặc xem trong Phụ lục 3 của quy trình kèm theo. Tuy nhiên đối với một số hãng không công bố đối với giá trị này sẽ không cần tính toán vào ĐKĐB tổng hợp và mở rộng.

#### 7.4.3. Tính toán ĐKĐB tổng hợp với ĐKĐB mở rộng

**ĐKĐB tổng hợp:** Sau khi đã xác định được ĐKĐB từ PTĐ độ ồn cần hiệu chuẩn và từ thiết bị chuẩn âm đa chức năng thì độ không đảm bảo tổng hợp (uc) được tính theo công thức:

$$u_c = \sqrt{u_1^2 + u_2^2 + u_3^2 + u_4^2 + u_5^2 + u_6^2} \tag{6}$$

**ĐKĐB mở rộng:** Độ không đảm bảo đo mở rộng (U) là đại lượng xác định miền giá trị phân bố bao quanh kết quả đo. Độ không đảm bảo kết hợp (uc) đã thể hiện ĐKĐB của kết quả đo. Tuy nhiên chưa đảm bảo để xác định một khoảng xung quanh kết quả phép đo mà khoảng này có thể chứa một phần lớn phân bố của các giá trị có thể quy cho đại lượng một cách hợp lý. Khoảng đó được gọi là độ không đảm bảo mở rộng (U), dB:

$$U = k \times u_c \tag{7}$$

Với k là hệ số bao phủ, hệ số bằng số được sử dụng như là bội của ĐKĐB tổng hợp để đưa ra ĐKĐB mở rộng, thường được chọn k = 2 với mức tin cậy xấp xỉ 95 %.

## 8. Xử lý chung

- **8.1.** PTĐ độ ồn sau khi hiệu chuẩn được dán tem, cấp giấy chứng nhận hiệu chuẩn kèm theo thông báo kết quả hiệu chuẩn.
- **8.2.** Chu kỳ hiệu chuẩn của PTĐ độ ồn được khuyến nghị tối đa là 01 lần/năm.

## 9. Phụ lục

- Phụ lục 1 — Biên bản hiệu chuẩn phương tiện đo độ ồn (`ETV.MCS.F 01.01`): thông tin chung về phương tiện đo, thiết bị chuẩn độ ồn (mã thiết bị, liên kết chuẩn, thời hạn hiệu lực), điều kiện môi trường, kết quả kiểm tra bên ngoài/kỹ thuật, và các bảng kết quả đo (4.1 đáp ứng tần số theo 3 chế độ 94.Inv.A/Lin.A/Lin.C tại các tần số 31,5 Hz–16.000 Hz; 4.2 độ tuyến tính; 4.3 trọng số thời gian F/S; 4.4 Crest Factor).
- Phụ lục 2 — Sai số cho phép của phương tiện đo độ ồn: Bảng 2.1 trọng số tần số A/C/Z và giới hạn cho phép (Loại 1/Loại 2) theo tần số từ 10 Hz đến 20.000 Hz (theo Bảng 2 trang 33 IEC 61672-1, 5/2002); Bảng 2.2 độ phi tuyến đo mức âm cho phép; Bảng 2.2 (tiếp) sai số mức âm cho phép ứng với đặc tính thời gian "F"/"S"; Bảng 2.2 (tiếp) sai số mức âm cho phép với Crest Factor = 3.
- Phụ lục 3 — Bảng hệ số Correction.
- Phụ lục 4 — Sơ đồ dẫn xuất chuẩn (lĩnh vực Tần số): Chuẩn quốc gia (VMI) → hiệu chuẩn chuẩn công tác (thiết bị hiệu chuẩn âm đa chức năng) → hiệu chuẩn phương tiện đo độ ồn.

## PHỤ LỤC 2: SAI SỐ CHO PHÉP CỦA PHƯƠNG TIỆN ĐO ĐỘ ỒN

**Bảng 2.1. Trọng số tần số và giới hạn cho phép bao gồm ĐKĐB lớn nhất của phép đo**

| Tần số (Hz) | Trọng số A (dB) | Trọng số C (dB) | Trọng số Z (dB) | Giới hạn Loại 1 (dB) | Giới hạn Loại 2 (dB) |
| ----------- | --------------- | --------------- | --------------- | ---------------------- | ---------------------- |
| 10          | -70,4           | -14,3           | 0,0             | +3,5; -∞               | +5,5; -∞               |
| 12,5        | -63,4           | -11,2           | 0,0             | +3,0; -∞               | +5,5; -∞               |
| 16          | -56,7           | -8,5            | 0,0             | +2,5; -4,5             | +5,5; -∞               |
| 20          | -50,5           | -6,2            | 0,0             | ± 2,5                  | ± 3,5                  |
| 25          | -44,7           | -4,4            | 0,0             | +2,5; -2,0             | ± 3,5                  |
| 31,5        | -39,4           | -3,0            | 0,0             | ± 2,0                  | ± 3,5                  |
| 40          | -34,6           | -2,0            | 0,0             | ± 1,5                  | ± 2,5                  |
| 50          | -30,2           | -1,3            | 0,0             | ± 1,5                  | ± 2,5                  |
| 63          | -26,2           | -0,8            | 0,0             | ± 1,5                  | ± 2,5                  |
| 80          | -22,5           | -0,5            | 0,0             | ± 1,5                  | ± 2,5                  |
| 100         | -19,1           | -0,3            | 0,0             | ± 1,5                  | ± 2,0                  |
| 125         | -16,1           | -0,2            | 0,0             | ± 1,5                  | ± 2,0                  |
| 160         | -13,4           | -0,1            | 0,0             | ± 1,5                  | ± 2,0                  |
| 200         | -10,9           | 0,0             | 0,0             | ± 1,5                  | ± 2,0                  |
| 250         | -8,6            | 0,0             | 0,0             | ± 1,4                  | ± 1,9                  |
| 315         | -6,6            | 0,0             | 0,0             | ± 1,4                  | ± 1,9                  |
| 400         | -4,8            | 0,0             | 0,0             | ± 1,4                  | ± 1,9                  |
| 500         | -3,2            | 0,0             | 0,0             | ± 1,4                  | ± 1,9                  |
| 630         | -1,9            | 0,0             | 0,0             | ± 1,4                  | ± 1,9                  |
| 800         | -0,8            | 0,0             | 0,0             | ± 1,4                  | ± 1,9                  |
| 1.000       | 0               | 0               | 0               | ± 1,1                  | ± 1,4                  |
| 1.250       | +0,6            | 0,0             | 0,0             | ± 1,4                  | ± 1,9                  |
| 1.600       | +1,0            | -0,1            | 0,0             | ± 1,6                  | ± 2,6                  |
| 2.000       | +1,2            | -0,2            | 0,0             | ± 1,6                  | ± 2,6                  |
| 2.500       | +1,3            | -0,3            | 0,0             | ± 1,6                  | ± 3,1                  |
| 3.150       | +1,2            | -0,5            | 0,0             | ± 1,6                  | ± 3,1                  |
| 4.000       | +1,0            | -0,8            | 0,0             | ± 1,6                  | ± 3,6                  |
| 5.000       | +0,5            | -1,3            | 0,0             | ± 2,1                  | ± 4,1                  |
| 6.300       | -0,1            | -2,0            | 0,0             | +2,1; -2,6             | ± 5,1                  |
| 8.000       | -1,1            | -3,0            | 0,0             | +2,1; -3,1             | ± 5,6                  |
| 10.000      | -2,5            | -4,4            | 0,0             | +2,6; -3,6             | +5,6; -∞               |
| 12.500      | -4,3            | -6,2            | 0,0             | +3,0; -6,0             | +6,0; -∞               |
| 16.000      | -6,6            | -8,5            | 0,0             | +3,5; -17,0            | +6,0; -∞               |
| 20.000      | -9,3            | -11,2           | 0,0             | +4,0; -∞               | +6,0; -∞               |

*Theo Bảng 2 trang 33 IEC-61672-1 (5/2002).*

**Bảng 2.2. Độ phi tuyến đo mức âm cho phép ứng với các dải tần**

| Mức áp suất âm                | Loại 1 (dB) | Loại 2 (dB) |
| ------------------------------ | ------------ | ------------ |
| Mức âm trong dải đo chính      | ± 0,4        | ± 0,6        |
| Mức âm ngoài dải đo chính      | ± 1,0        | ± 1,5        |
| Dải tần                        | (31,5 ~ 8.000) Hz |         |

**Bảng 2.2 (tiếp). Sai số mức âm cho phép ứng với các đặc tính thời gian "F" và "S"**

| Đặc tính thời gian | Loại 1 (dB) | Loại 2 (dB) |
| -------------------- | ------------ | ------------ |
| F                    | +1,0         | +1,0; -2,0   |
| S                    | ± 1,0        | ± 2,0        |

**Bảng 2.2 (tiếp). Sai số mức âm cho phép với Crest Factor bằng 3**

| Loại   | Sai số cho phép |
| ------ | ------------------ |
| Loại 1 | ± 0,5 dB            |
| Loại 2 | ± 1,0 dB            |

## TÀI LIỆU THAM KHẢO

- ISO/IEC 17025:2015: Yêu cầu chung về năng lực của phòng thử nghiệm và hiệu chuẩn.
- ĐLVN 131:2003: Hướng dẫn đánh giá và trình bày độ không đảm bảo đo.
- ĐLVN 89:2010: PTĐ độ ồn - Quy trình kiểm định.
- IEC 61672-1:2013: Electroacoustics - Sound level meters - Part 1: Specifications.
- Hướng dẫn sử dụng thiết bị chuẩn độ ồn.
