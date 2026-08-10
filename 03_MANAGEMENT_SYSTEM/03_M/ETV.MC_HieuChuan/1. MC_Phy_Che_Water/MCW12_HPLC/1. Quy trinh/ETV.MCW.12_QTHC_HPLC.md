---
id: ETV.MCW 12
title: "Hệ thống phân tích sắc ký lỏng (HPLC) — Quy trình hiệu chuẩn"
type: Quy-trinh
owner: ""
department: "Viện Kiểm định Công nghệ và Môi trường"
process: ""
effective_date: "22/04/2026"
revision: "02"
status: Da-ban-hanh
keywords: [HPLC, sắc ký lỏng, tốc độ dòng pha động, nhiệt độ buồng cột, detector UV/VIS, MS, RF, RI, EC, độ tuyến tính, hiệu chuẩn]
related_documents: []
iso_clause: ["ISO/IEC 17025:2017"]
legal_basis: []
ai_tags: [calibration-procedure, hplc, chromatography, uncertainty-budget, dilution-method]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: null
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCW 12 HPLC_V5.pdf`"
supersedes: "ETV.MCW 12 lần ban hành 01 (14/03/2024)"
superseded_by: null
---
# HỆ THỐNG PHÂN TÍCH SẮC KÝ LỎNG (HPLC) – QUY TRÌNH HIỆU CHUẨN

*Liquid chromatography (HPLC) analysis system – Calibration procedures*

|                   |                |
| ----------------- | -------------- |
| **Mã số**         | ETV.MCW 12     |
| **Lần ban hành**  | 02             |
| **Ngày ban hành** | 22/04/2026     |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCW 12 HPLC_V5.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khi có khác biệt, bản PDF do Viện ban hành là bản có giá trị áp dụng.
>
> *Ghi chú của bản chuyển đổi:* trang "TÀI LIỆU THAM KHẢO" (trang 16/18) trong bản gốc **để trống**, không có mục tham chiếu nào — cần bổ sung khi ban hành lại.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## THEO DÕI SỬA ĐỔI TÀI LIỆU

| Ngày soát xét | Lý do soát xét, ban hành lại | Lần ban hành |
| ------------- | ---------------------------- | ------------ |
| 14/03/2024    | Ban hành lần 1               | 01           |
| 22/04/2026    | Ban hành lần 2               | 02           |

---

## 1. Phạm vi áp dụng

Quy trình này quy định quy trình kỹ thuật hiệu chuẩn Hệ thống phân tích sắc ký lỏng (HPLC) có một hoặc các đặc tính kỹ thuật như Bảng 1.

**Bảng 1**

| STT | Đại lượng đo                        | Phạm vi              | Cấp chính xác/ĐKĐB |
| --- | ----------------------------------- | -------------------- | ------------------ |
| 1   | Tốc độ dòng pha động                | (0,1 ÷ 5) mL/min     | 1,4 %              |
| 2   | Nhiệt độ buồng cột                  | Đến 100 °C           | 0,5 °C             |
| 3   | Detector UV/VIS                     | (0,025 ÷ 100) mg/L   | 1,4 %              |
| 4   | Mass spectrometer (MS)              | (0,025 ÷ 100) mg/L   | 2,0 %              |
| 5   | Fluorescence detector (RF)          | (1 ÷ 1000) mg/L      | 1,4 %              |
| 6   | Refractive Index detector (RI)      | (0,025 ÷ 100) mg/L   | 1,4 %              |
| 7   | Electrochemical detector (EC)       | (1 ÷ 100) mg/L       | 1,4 %              |

Quy trình này áp dụng đối với nhân viên của Viện Kiểm định Công nghệ và Môi trường (sau đây gọi tắt là PTN) khi hiệu chuẩn Hệ thống phân tích sắc ký lỏng (HPLC) nói trên.

## 2. Giải thích từ ngữ

Các từ ngữ trong văn bản này được hiểu như sau:

- **2.1. Hiệu chuẩn:** là hoạt động xác định, thiết lập mối quan hệ giữa giá trị đo của chuẩn đo lường, phương tiện đo với giá trị đo của đại lượng cần đo.
- **2.2. Hiệu chỉnh:** là tập hợp các thao tác được tiến hành trên hệ thống đo để cho ra số chỉ đã quy định tương ứng với giá trị đã cho của đại lượng được đo.
- **2.3. Độ không đảm bảo đo (ĐKĐB):** thông số gắn với kết quả của phép đo, đặc trưng cho sự phân tán của các giá trị có thể quy cho đại lượng đo một cách hợp lý.
- **2.4. Sắc ký (Chromatograph):** là kỹ thuật tách các cấu tử ra khỏi hỗn hợp dựa trên ái lực khác nhau của mỗi cấu tử đối với pha tĩnh.
- **2.5. Pha tĩnh (Stationary phase):** dạng rắn xốp được nhồi trong một ống kim loại gọi là cột sắc ký, có tác dụng giữ hoá chất.
- **2.6. Pha động (Mobile phase):** là chất lỏng có tác dụng hoà tan hoá chất. Trong pha động, tất cả các chất đều di chuyển cùng vận tốc bằng vận tốc pha động.
- **2.7. Mẫu trắng:** là dung dịch được dùng để thiết lập đường nền của hệ thống sắc ký khí và thường là dung môi tinh khiết.
- **2.8. Mẫu chuẩn được chứng nhận (CRM):** là loại chất chuẩn được chứng nhận có nồng độ xác định.
- **2.9. Dung dịch hiệu chuẩn:** là dung dịch chuẩn có nồng độ nằm trong khoảng nồng độ làm việc, được pha chế từ mẫu chuẩn gốc có nồng độ hoặc/và độ tinh khiết như trong giấy chứng nhận kèm theo.
- **2.10. Khoảng làm việc:** là khoảng nồng độ của một hợp chất trong dung dịch có thể thực hiện được các phép đo phân tích trong giới hạn xác định.

## 3. Các phép hiệu chuẩn

**Bảng 2**

| TT  | Tên phép hiệu chuẩn                     | Theo điều, mục của quy trình |
| --- | --------------------------------------- | ---------------------------- |
| 1   | Kiểm tra bên ngoài                      | 7.1                          |
| 2   | Kiểm tra kỹ thuật                       | 7.2                          |
| 3   | Kiểm tra đo lường                       | 7.3                          |
| 3.1 | Kiểm tra độ chính xác tốc độ dòng bơm   | 7.3.1                        |
| 3.2 | Kiểm tra nhiệt độ                       | 7.3.2                        |
| 3.3 | Kiểm tra độ lặp lại                     | 7.3.3                        |
| 3.4 | Kiểm tra độ tuyến tính                  | 7.3.4                        |
| 4   | Đánh giá độ không đảm bảo đo            | 8                            |
| 5   | Xử lý chung                             | 9                            |

## 4. Phương tiện phục vụ hiệu chuẩn

Các phương tiện dùng để hiệu chuẩn được nêu trong Bảng 3.

**Bảng 3**

| STT | Tên thiết bị và chuẩn đo lường     | Đặc trưng kỹ thuật đo lường                                                       | Áp dụng cho điều mục |
| --- | ---------------------------------- | ----------------------------------------------------------------------------------- | -------------------- |
| 1   | **Chuẩn đo lường**                 |                                                                                     |                      |
| 1.1 | Dung dịch chuẩn hoặc mẫu chuẩn     | - Có thành phần, độ tinh khiết và độ không đảm bảo đo như trong Bảng 4              | 6.3                  |
| 1.2 | Nhiệt kế chỉ thị hiện số           | - Phạm vi đo: (0 ÷ 250) °C<br>- Độ phân giải: 0,1 °C<br>- ĐKĐB: ≤ 0,3 °C            |                      |
| 1.3 | Bình định mức                      | - Dung tích 10 mL<br>- Cấp chính xác A<br>- ĐKĐB: ≤ 0,02 mL                         |                      |
| 1.4 | Đồng hồ bấm giây                   | - Phạm vi đo: (0 ÷ 10) h<br>- Độ phân giải: 0,01 s<br>- ĐKĐB: ≤ 1×10⁻³ s            |                      |
| 2   | **Phương tiện khác**               |                                                                                     |                      |
| 2.1 | Bình định mức                      | - Dung tích: (10, 25, 50, 100, 1000) mL<br>- Cấp chính xác: A và đảm bảo liên kết chuẩn đo lường |         |
| 2.2 | Pipet, Micropipet                  | - Phạm vi đo: (1, 2, 5, 10, 25) mL<br>- Cấp chính xác: A và đảm bảo liên kết chuẩn đo lường |              |
| 2.3 | Phương tiện đo nhiệt độ, độ ẩm môi trường | - Phạm vi: Nhiệt độ (0 ÷ 50) °C; Độ ẩm (25 ÷ 95) %RH<br>- Giá trị độ chia: Nhiệt độ 1 °C; Độ ẩm 1 %RH |  |
| 2.4 | Cân phân tích                      | - Phạm vi cân lớn nhất: 102 g<br>- Độ chia: 0,01 mg                                 | 6.3                  |
| 3   | **Phương tiện phụ**                |                                                                                     |                      |
| 3.1 | Nước tinh khiết                    | - Nước loại 2 sử dụng trong phòng thí nghiệm theo TCVN 4851:1989                    |                      |
| 3.2 | Khí mang, Khí Hydro                | - Độ tinh khiết theo yêu cầu: 99,995 %                                              |                      |
| 3.3 | Dung môi Methanol, Acetonitrile    |                                                                                     |                      |
| 3.4 | Giấy thấm                          |                                                                                     |                      |
| 3.5 | Bình xịt tia                       |                                                                                     |                      |
| 3.6 | Găng tay, dung dịch làm sạch, vải cotton [^stt12] |                                                                      |                      |

[^stt12]: Bản gốc đánh trùng số "3.3" cho hai dòng (dung môi và giấy thấm), khiến các dòng sau lệch; bản chuyển đổi đánh lại 3.3–3.6 cho đúng thứ tự.

> *Lưu ý:* Tuỳ thuộc vào từng đại lượng đo để lựa chọn chuẩn đo lường và phương tiện phụ phù hợp và đáp ứng yêu cầu.

## 5. Điều kiện môi trường

Khi tiến hành hiệu chuẩn phải đảm bảo các điều kiện môi trường sau:

- Nhiệt độ: (25 ± 5) °C;
- Độ ẩm không khí: ≤ 80 %RH (không đọng sương);
- Phải đảm bảo máy đã bật lên ít nhất 02 giờ để ổn định và không có sự thay đổi đột ngột về điều kiện môi trường.

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành hiệu chuẩn phải thực hiện các công việc chuẩn bị sau đây:

**6.1.** Phương tiện đo cần hiệu chuẩn (sau đây gọi tắt là PTĐ) phải đang hoạt động bình thường và được kiểm tra vận hành hoạt động theo đúng yêu cầu của nhà sản xuất quy định trong tài liệu kỹ thuật.

**6.2.** Chọn phương tiện hiệu chuẩn theo mục 4; dung dịch chuẩn được chọn sử dụng tương ứng đối với từng đầu dò cụ thể như trong Bảng 4.

**Bảng 4**

| STT | Đại lượng đo               | Đặc trưng kỹ thuật đo lường                                                     |
| --- | ------------------------- | --------------------------------------------------------------------------------- |
| 1   | Detector UV/VIS           | Dung dịch chuẩn Caffein — Độ tinh khiết: 99,9 % — ĐKĐB: ± 0,02 %                  |
| 2   | Mass spectrometer (MS)    | Dung dịch chuẩn Caffein — Độ tinh khiết: 99,9 % — ĐKĐB: ± 0,02 %                  |
| 3   | RF detector               | Dung dịch chuẩn Anthracene — Độ tinh khiết: 99,68 % — ĐKĐB: ± 0,3 %               |
| 4   | RI detector               | Dung dịch chuẩn Caffein — Độ tinh khiết: 99,9 % — ĐKĐB: ± 0,02 %                  |
| 5   | EC detector               | Dung dịch chuẩn Hydroquinone — Độ tinh khiết: 99,9 % — ĐKĐB: ± 0,1 %              |

**6.3. Chuẩn bị chất chuẩn, hóa chất**

- Chuẩn bị một dãy dung dịch chuẩn có 05 điểm nồng độ khác nhau chia đều trên khoảng đo để xây dựng đường cong hiệu chuẩn. Các dung dịch này được chuẩn bị bằng phương pháp pha loãng từ dung dịch chuẩn gốc (chi tiết theo Phụ lục).

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

Phải kiểm tra bên ngoài theo các yêu cầu sau đây:

- Kiểm tra bằng mắt để xác định sự phù hợp của PTĐ đối với các yêu cầu quy định trong tài liệu kỹ thuật, hình dáng kích thước, ký nhãn hiệu, nguồn nuôi, hiển thị, tài liệu và phụ kiện kèm theo.
- Lý lịch của thiết bị được cập nhật trong quá trình sử dụng (nếu có).

### 7.2. Kiểm tra kỹ thuật

Phải kiểm tra kỹ thuật theo các yêu cầu sau đây:

- Kiểm tra trạng thái hoạt động bình thường của PTĐ theo hướng dẫn sử dụng của nhà sản xuất.
- Kiểm tra rò rỉ tại các khớp nối liên kết giữa các đường ống dẫn của máy HPLC cần hiệu chuẩn.

### 7.3. Kiểm tra đo lường

#### 7.3.1. Kiểm tra độ chính xác tốc độ dòng của bơm

- **Bước 1:** Thay pha động bằng nước cất và cài đặt tốc độ bơm 1,0 mL/min.
- **Bước 2:** Cho bơm vận hành để đẩy hết pha động cũ ra khỏi đường ống.
- **Bước 3:** Lắp ống tạo áp vào ngõ ra của bơm và chờ đến khi áp suất ổn định.
- **Bước 4:** Đặt bình định mức sạch và đã sấy khô ở đầu ra của ống tạo áp sao cho các giọt pha động (nước) rơi vào bình định mức 10 mL mà không chạm vào thành bình, và bắt đầu bấm giờ ngay lập tức khi giọt đầu tiên rơi vào bình.
- **Bước 5:** Đợi cho đến khi pha động thu được đạt vạch 10 mL của bình định mức và dừng đồng hồ bấm giờ.
- **Bước 6:** Ghi lại thời gian cần thiết để thu thập 10 mL pha động vào biên bản hiệu chuẩn.

Thực hiện lặp lại 5 lần các bước 1 đến 6 và tính tốc độ dòng trung bình của 5 lần kiểm tra.

Lặp lại quy trình với tốc độ 1,5 và 2,0 mL/min (có thể theo yêu cầu kỹ thuật của máy hoặc theo yêu cầu sử dụng của khách hàng).

Tốc độ dòng được tính theo công thức:

$$f_{ch} = \frac{V_{bdm}}{t} \tag{1}$$

Sai số giá trị tốc độ dòng được tính theo công thức:

$$\Delta_1 = f_F - f_{ch}$$

- `f_F`: giá trị tốc độ dòng chỉ thị trên máy HPLC cần hiệu chuẩn, mL/min;
- `f_ch`: giá trị tốc độ dòng trung bình đo được của chuẩn, mL/min.

#### 7.3.2. Kiểm tra nhiệt độ

Tiến hành kiểm tra nhiệt độ buồng cột (column):

- Tiến hành cài đặt chế độ gia nhiệt cho buồng ổn định nhiệt độ cột sắc ký tại 3 điểm nhiệt độ (30; 50; 80) °C ± 5 °C hoặc có thể cài đặt các điểm nhiệt độ theo tài liệu kỹ thuật của máy hoặc theo yêu cầu sử dụng của khách hàng.
- Đặt cảm biến đo nhiệt độ tại tâm của buồng ổn định nhiệt độ cột và gần vị trí lắp cột sắc ký. Đọc tối thiểu 06 lần kết quả đo nhiệt độ, mỗi lần cách nhau 05 phút. Ghi kết quả đo vào biên bản hiệu chuẩn.

Tính toán sai số giữa nhiệt độ chỉ thị của máy HPLC cần hiệu chuẩn so với nhiệt độ của nhiệt kế chuẩn:

$$\Delta_2 = T_{tb} - T_{ch}$$

- `T_tb`: giá trị nhiệt độ chỉ thị của máy HPLC cần hiệu chuẩn, °C;
- `T_ch`: giá trị nhiệt độ trung bình của nhiệt kế chuẩn, °C.

#### 7.3.3. Kiểm tra độ lặp lại

- Chọn một nồng độ dung dịch trong dãy dung dịch chuẩn ở mục 6.3 phù hợp với detector của máy HPLC cần hiệu chuẩn để tiến hành kiểm tra độ lặp lại.
- Dùng máy HPLC cần hiệu chuẩn tiến hành chạy mẫu tối thiểu 06 lần liên tiếp dung dịch chuẩn đã chọn với điều kiện sắc ký đã được cài đặt.
- Ghi kết quả vào biên bản hiệu chuẩn.
- Độ lặp lại được tính toán bằng độ lệch chuẩn tương đối RSD theo công thức:

$$RSD = \frac{s}{\bar{x}} \times 100 \qquad \text{với } s = \sqrt{\frac{\sum_{i=1}^{n}(x_i - \bar{x})^2}{n-1}}$$

- `RSD`: độ lệch chuẩn tương đối của các kết quả đo lặp lại, %;
- `s`: độ lệch chuẩn của các kết quả đo lặp lại;
- `x_i`: giá trị đo lần thứ i (i = 1; 2; 3; 4; …);
- `x̄`: giá trị đo trung bình;
- `n`: số lần đo lặp lại (n = 6).

#### 7.3.4. Kiểm tra độ tuyến tính

- Độ tuyến tính của hệ thống HPLC được xác định bằng cách ghi nhận tín hiệu diện tích peak của sắc ký đồ với 05 điểm chuẩn có nồng độ ở mục 6.3 phù hợp với từng detector.
- Dùng máy HPLC cần hiệu chuẩn tiến hành chạy mẫu liên tiếp ít nhất 3 lần đo tại mỗi nồng độ và theo chiều tăng nồng độ của dung dịch chuẩn đã chọn với điều kiện máy sắc ký đã được cài đặt.
- Thiết lập đường chuẩn theo phương trình hồi quy tuyến tính y = ax + b biểu diễn sự phụ thuộc của diện tích peak trung bình và các điểm nồng độ của dung dịch chuẩn. Độ tuyến tính được đánh giá dựa vào hệ số tương quan R².

## 8. Ước lượng độ không đảm bảo đo các phép đo của máy HPLC

### 8.1. Độ không đảm bảo đo phép đo độ chính xác tốc độ dòng: u_f

Dựa vào phương trình tổng quát (1), độ không đảm bảo đo chuẩn tổng hợp được tính như sau:

$$u_F = \sqrt{c_t^2 u^2(t) + c_{V_{bdm}}^2 u^2(V_{bdm})} = \sqrt{\left(\frac{\partial C_i}{\partial t}\right)^2 u^2(t) + \left(\frac{\partial C_i}{\partial V_{bdm}}\right)^2 u^2(V_{bdm})}$$

- `u(t)`, `u(V_bdm)`: các hệ số đóng góp vào độ không đảm bảo đo;
- `∂C_i/∂t`, `∂C_i/∂V_bdm`: các hệ số nhạy.

**ĐKĐB gây ra bởi bình định mức `u(V_bdm)` và hệ số nhạy `c_bdm`**

- ĐKĐB của bình định mức lấy từ giấy chứng nhận hiệu chuẩn:

  $$u_{bdm1} = \frac{a}{2}$$

  với `a` là ĐKĐB của bình định mức lấy từ giấy chứng nhận hiệu chuẩn.

- ĐKĐB thành phần `u_bdm2` do độ tản mạn:

  $$u_{bdm2} = \sqrt{\frac{S_i^2}{n}} = \frac{S_i}{\sqrt{n}} \qquad \text{với } S_i = \sqrt{\frac{\sum_{1}^{n}(V_{bdm_i} - \bar{V}_{bdm})^2}{n-1}}$$

  - `S_i`: Độ lệch chuẩn, mL;
  - `n`: Số lần đo;
  - `V_bdm_i`: thể tích bình định mức ở lần lặp thứ i, mL;
  - `V̄_bdm`: Giá trị trung bình thể tích bình định mức sau n lần đo, mL.

- Hệ số nhạy:

  $$c_{bdm} = \frac{\partial C_i}{\partial V_{bdm}} = \frac{1}{t}$$

**ĐKĐB gây ra bởi đồng hồ bấm giây `u(t) = √(u_t1² + u_t2²)` và hệ số nhạy `c_t`**

- ĐKĐB của đồng hồ bấm giây lấy từ giấy chứng nhận hiệu chuẩn:

  $$u_{t1} = \frac{b}{2}$$

  với `b` là ĐKĐB của đồng hồ bấm giây lấy từ giấy chứng nhận hiệu chuẩn.

- ĐKĐB thành phần `u_t2` do độ tản mạn:

  $$u_{t2} = \sqrt{\frac{S_i^2}{n}} = \frac{S_i}{\sqrt{n}} \qquad \text{với } S_i = \sqrt{\frac{\sum_{1}^{n}(t_i - \bar{t})^2}{n-1}}$$

  - `S_i`: Độ lệch chuẩn, s;
  - `n`: Số lần đo;
  - `t_i`: thời gian ở lần lặp thứ i, s;
  - `t̄`: Giá trị trung bình thời gian sau n lần đo, s.

- Hệ số nhạy:

  $$c_t = \frac{\partial C_i}{\partial C_t} = \frac{-V}{t^2}$$

- ĐKĐB ảnh hưởng bởi độ phân tán của kết quả đo thời gian 06 lần lặp lại: `u_1`

  $$S_f = \sqrt{\frac{\sum(x_i - x_{tb})^2}{n-1}} \qquad u_1 = \frac{S_f}{\sqrt{n}}$$

  - `S_f`: độ lệch chuẩn giữa n lần đo;
  - `x_i`: giá trị thời gian đo lần i (i = 1, 2, …, n);
  - `x_tb`: giá trị đo trung bình;
  - `n`: số lần đo (n = 6).

- ĐKĐB tổng hợp:

  $$u_f = \sqrt{u_1^2 + u_t^2 + u_V^2}$$

- ĐKĐB mở rộng:

  $$U_f = k \times u_f$$

  Độ KĐBĐ mở rộng với hệ số phủ k = 2, ở mức tin cậy 95 %.

### 8.2. Độ không đảm bảo đo phép đo nhiệt độ: u_T

ĐKĐB đo nhiệt độ của buồng cột HPLC được tổ hợp từ các nguồn ĐKĐB thành phần, được chia thành hai loại: ĐKĐB khi sử dụng nhiệt kế chuẩn và ĐKĐB của thiết bị chỉ thị nhiệt của buồng cột HPLC, cụ thể như sau:

**a) Độ không đảm bảo đo của nhiệt kế chuẩn**

$$u_{ch} = \sqrt{u_{ch1}^2 + u_{ch2}^2}$$

- ĐKĐB `u_ch1` của nhiệt kế chuẩn (ĐKĐB kiểu B):

  $$u_{ch1} = \frac{U_{95}}{2}$$

  với `U₉₅`: ĐKĐB mở rộng của nhiệt kế chuẩn, lấy từ GCN hiệu chuẩn.

- ĐKĐB do độ tản mạn `u_ch2` của các kết quả đo bởi nhiệt kế chuẩn (kiểu A):

  $$u_{ch2} = \sqrt{\frac{S_{ch2}^2}{n}} = \frac{S_{ch2}}{\sqrt{n}} = \sqrt{\frac{\sum_{1}^{n}(t_i - \bar{t})^2}{n(n-1)}} \qquad \text{với } S_{ch2} = \sqrt{\frac{\sum_{1}^{n}(t_i - \bar{t})^2}{n-1}}$$

  - `S_ch2`: Độ lệch chuẩn nhiệt độ dung môi đo được bởi nhiệt kế chuẩn tại điểm hiệu chuẩn nhiệt độ buồng, °C;
  - `n`: Số lần đo lặp nhiệt độ buồng bởi nhiệt kế chuẩn tại mỗi điểm hiệu chuẩn nhiệt độ, n = 5;
  - `t_i`: Nhiệt độ buồng đo được bởi nhiệt kế chuẩn tại lần đo lặp thứ i, °C;
  - `t̄`: Giá trị trung bình nhiệt độ buồng đo được bởi nhiệt kế chuẩn sau n lần đo lặp, °C.

**b) Độ không đảm bảo đo của thiết bị chỉ thị nhiệt của buồng HPLC**

$$u_{bk} = \sqrt{u_{bk1}^2 + u_{bk2}^2}$$

- ĐKĐB do độ tản mạn `u_bk1` của các kết quả đo của bộ chỉ thị nhiệt buồng HPLC:

  $$u_{bk1} = \sqrt{\frac{S_{bk1}^2}{n}} = \frac{S_{bk1}}{\sqrt{n}} = \sqrt{\frac{\sum_{1}^{n}(t_i - \bar{t})^2}{n(n-1)}} \qquad \text{với } S_{bk1} = \sqrt{\frac{\sum_{1}^{n}(t_i - \bar{t})^2}{n-1}}$$

  - `S_bk1`: Độ lệch chuẩn nhiệt độ buồng đo được trên HPLC tại điểm hiệu chuẩn nhiệt độ, °C;
  - `n`: Số lần đo lặp, n = 5;
  - `t_i`: Nhiệt độ buồng cột đo được trên HPLC tại lần đo lặp thứ i, °C;
  - `t̄`: Giá trị trung bình nhiệt độ buồng đo được trên HPLC sau n lần đo lặp, °C.

- ĐKĐB do độ phân giải `u_bk2` của chỉ thị nhiệt độ của HPLC:

  $$u_{bk2} = \frac{d}{2\sqrt{3}}$$

  - `d`: Độ phân giải chỉ thị nhiệt độ của HPLC (°C).

### 8.3. Độ KĐBĐ phép đo phân tích định lượng: u_Đ

#### 8.3.1. Độ không đảm bảo đo của dung dịch chuẩn gốc

Vì không có thông tin về độ không đảm bảo đo được cung cấp bởi nhà cung cấp trong chứng chỉ phân tích cho vật liệu tiêu chuẩn được sử dụng để chuẩn bị các dung dịch chuẩn, sự tinh khiết không được xem xét như một nguồn độ không đảm bảo tiềm năng. Tuy nhiên, độ tinh khiết của tiêu chuẩn được xem xét khi nồng độ được tính toán.

Nồng độ dung dịch pha gốc được tính theo công thức:

$$C = \frac{m}{V}$$

- `C`: nồng độ dung dịch pha gốc (mg/L);
- `m`: khối lượng của hoá chất chuẩn (mg);
- `V`: thể tích bình định mức (L).

**a. Độ không đảm bảo gây nên bởi cân phân tích**

Theo giấy chứng nhận hiệu chuẩn — ví dụ: trong giấy chứng nhận hiệu chuẩn ghi ĐKĐB của cân phân tích là g (mg) với mức tin cậy 95 % thì:

$$u_m = \frac{g}{2}$$

**b. Độ không đảm bảo gây nên bởi độ tinh khiết của các hóa chất chuẩn `u_p`**

Độ tinh khiết của hóa chất được chỉ dẫn theo catalogue nhà sản xuất — ví dụ: trên nhãn lọ hoá chất ghi độ tinh khiết 99,997 % cho nên P = 1,00000 ± 0,00003:

$$u_p = \frac{0{,}00003}{\sqrt{3}}$$

**c. Độ không đảm bảo gây nên bởi bình định mức `u_flask`**

$$u_{flask} = \sqrt{u_{calf}^2 + u_{per}^2 + u_{temp}^2}$$

- `u_calf`: ĐKĐB gây nên bởi bình định mức dùng để pha loãng dung dịch chuẩn;
- `u_per`: ĐKĐB do thao tác của nhân viên thực hiện;
- `u_temp`: ĐKĐB do giãn nở nhiệt.

Độ không đảm bảo đo của dung dịch chuẩn gốc pha:

$$u_C = C\sqrt{\left(\frac{u_{flask}}{V_{flask}}\right)^2 + \left(\frac{u_m}{m}\right)^2 + u_p^2}$$

#### 8.3.2. Nồng độ dung dịch pha loãng

$$C_i = \frac{V_{i-1} \cdot C_{i-1}}{V_i}$$

- `C_i`: Nồng độ của dung dịch cần pha loãng thứ i (mg/L);
- `C_{i-1}`: Nồng độ chất chuẩn thứ i-1 (mg/L);
- `V_i`: Thể tích bình định mức dùng để pha loãng dung dịch thứ i (mL);
- `V_{i-1}`: Thể tích dung dịch cần hút để pha loãng dung dịch thứ i (mL).

**Độ KĐBĐ phép đo phân tích định lượng: u_Đ**

Các thành phần gây ra độ không đảm bảo đo tính toán cho mỗi detector:

- Độ KĐBĐ do độ phân tán kết quả đo của PTĐ n lần lặp lại: `u_A`

  $$S_C = \sqrt{\frac{\sum(x_i - x_{tb})^2}{n-1}} \qquad u_A = \frac{s_C}{\sqrt{n}}$$

  - `S_C`: độ lệch chuẩn giữa n lần đo;
  - `x_i`: giá trị diện tích peak đo lần i (i = 1, 2, …, n);
  - `x_tb`: giá trị đo trung bình;
  - `n`: số lần đo (n = 3).

**Các thành phần độ không đảm bảo đo — Bảng 5**

| STT   | Tên yếu tố ảnh hưởng                                       | Ký hiệu   | Đơn vị | Công thức tính |
| ----- | ---------------------------------------------------------- | --------- | ------ | -------------- |
| 1     | Độ lặp lại của PTĐ                                         | `u_A`     | mg/L   | $u_A = s_C/\sqrt{n}$ |
| 2     | ĐKĐB của dung dịch chuẩn pha gốc                           | `u_C`     | mg/L   | (xem 8.3.1) |
| 3     | ĐKĐB của dung dịch chuẩn thứ i                             | `u_Ci`    | mg/L   | (xem công thức `u_Ci` bên dưới) |
| 3.1   | ĐKĐB gây ra bởi pipet                                      | `u_pipet` |        | $u_{pipet} = \sqrt{u_{calp}^2 + u_{temp}^2}$ |
| 3.1.1 | ĐKĐB gây nên bởi pipet dùng để pha loãng dung dịch chuẩn   | `u_calp`  | mL     | $u_{calp} = d/k$ — pipet có thể tích `V_pipet` và ĐKĐB là `d` với hệ số phủ theo GCN (k = 2) |
| 3.1.2 | ĐKĐB do giãn nở nhiệt                                      | `u_temp`  | mL     | $u_{temp} = (V_{pipet} \times \gamma \times \Delta_i)/\sqrt{3}$ — `γ`: hệ số dãn nở/1 °C; `Δ_i`: sai lệch nhiệt độ so với 20 °C |
| 3.2   | ĐKĐB gây ra bởi bình định mức pha loãng                    | `u_flask` |        | $u_{flask} = \sqrt{u_{calf}^2 + u_{per}^2 + u_{temp}^2}$ |
| 3.2.1 | ĐKĐB gây nên bởi bình định mức dùng để pha loãng dung dịch chuẩn | `u_calf` | mL | $u_{calf} = e/k$ — bình định mức có thể tích `V_flask` và ĐKĐB là `e` với hệ số phủ theo GCN (k = 2) |
| 3.2.2 | ĐKĐB do thao tác của nhân viên thực hiện                   | `u_per`   | mL     | $u_{per} = 0{,}03/\sqrt{3}$ — sai số do thao tác (dư hoặc thiếu ở giọt cuối cùng, xấp xỉ ± 0,03 mL) |
| 3.2.3 | ĐKĐB do giãn nở nhiệt                                      | `u_temp`  | mL     | $u_{temp} = (V_{flask} \times \gamma \times \Delta_i)/\sqrt{3}$ |

Tính `u_Ci`:

$$u_{Ci} = C_i^2\sqrt{\left(\frac{u_{flask}}{V_{flask}}\right)^2 + \left(\frac{u_{pipet}}{V_{pipet}}\right)^2 + \left(\frac{u_{C_{i-1}}}{C_{i-1}}\right)^2}$$

- Độ KĐBĐ tổng hợp:

  $$u_{Đ} = \sqrt{u_A^2 + u_{Ci}^2}$$

- Độ KĐBĐ mở rộng:

  $$U_{Đ} = k \times u_{Đ}$$

  Độ không đảm bảo đo mở rộng với hệ số phủ k = 2, ở mức tin cậy 95 %.

- Tính độ KĐBĐ tương đối:

  $$\text{Độ KĐBĐ tương đối (\%)} = \frac{\text{Độ KĐBĐ mở rộng}}{\text{Giá trị đo}} \times 100$$

## 9. Xử lý chung

- Hệ thống phân tích sắc ký lỏng (HPLC) sau khi hiệu chuẩn được dán tem hiệu chuẩn và cấp giấy chứng nhận hiệu chuẩn, kèm theo thông báo kết quả hiệu chuẩn.
- Chu kỳ hiệu chuẩn khuyến nghị: 12 tháng.

## 10. Phụ lục

- Phụ lục 01: Biên bản hiệu chuẩn (BBĐL);
- Phụ lục 02: Chuẩn bị dung dịch chuẩn.

---

## PHỤ LỤC — CHUẨN BỊ DUNG DỊCH CHUẨN

### 1. Detector UV/VIS, MS, RI

**1.1. Trường hợp 1: Pha với dải thấp (max 200 µg/L)**

- Áp dụng đối với dòng máy XEVO TQ-XS hoặc các máy đáp ứng dải nồng độ thấp.
- Chuẩn bị dung dịch hiệu chuẩn gốc 1000 mg/L Caffein: Cân chính xác 10 mg Caffein vào bình định mức 10 mL. Định mức đến vạch bằng methanol.
- Chuẩn bị dung dịch hiệu chuẩn làm việc 10 mg/L Caffein: Hút 100 µL chuẩn 1000 mg/L vào bình định mức 10 mL. Định mức đến vạch bằng methanol.
- Chuẩn bị dung dịch hiệu chuẩn làm việc 1 mg/L Caffein: Hút 1000 µL chuẩn 10 mg/L vào bình định mức 10 mL. Định mức đến vạch bằng methanol.
- Chuẩn bị dung dịch hiệu chuẩn làm việc Caffein ở các nồng độ (25, 50, 75, 100, 200) µg/L từ dung dịch hiệu chuẩn làm việc 1 mg/L vào bình định mức 10 mL. Định mức đến vạch bằng methanol.

**Bảng 1**

| Dung dịch chuẩn                                    | 1   | 2   | 3   | 4    | 5    |
| -------------------------------------------------- | --- | --- | --- | ---- | ---- |
| Nồng độ caffein cần pha, µg/L                      | 25  | 50  | 75  | 100  | 200  |
| Lượng dung dịch chuẩn caffein 1 mg/L cần hút, µL   | 250 | 500 | 750 | 1000 | 2000 |
| Bình định mức, mL                                  | 10  | 10  | 10  | 10   | 10   |

**1.2. Trường hợp 2: Pha với dải cao**

- Áp dụng đối với các máy đáp ứng dải nồng độ cao.
- Chuẩn bị dung dịch hiệu chuẩn gốc 1000 mg/L Caffein: Cân chính xác 10 mg Caffein vào bình định mức 10 mL. Định mức đến vạch bằng methanol.
- Chuẩn bị dung dịch hiệu chuẩn Caffein ở các nồng độ (10, 20, 40, 60, 80) mg/L từ dung dịch gốc 1000 mg/L vào bình định mức 10 mL. Định mức đến vạch bằng methanol.

**Bảng 2**

| Dung dịch chuẩn                                        | 1   | 2   | 3   | 4   | 5   |
| ------------------------------------------------------ | --- | --- | --- | --- | --- |
| Nồng độ caffein cần pha, mg/L                          | 10  | 20  | 40  | 60  | 80  |
| Lượng dung dịch chuẩn caffein 1000 mg/L cần hút, mL    | 0,1 | 0,2 | 0,4 | 0,6 | 0,8 |
| Bình định mức, mL                                      | 10  | 10  | 10  | 10  | 10  |

> *Lưu ý:* Đối với dải nồng độ khác theo yêu cầu khách hàng hoặc những dải đặc biệt, tiến hành chuẩn bị một dãy dung dịch hiệu chuẩn có 05 điểm nồng độ khác nhau để xây dựng đường cong hiệu chuẩn theo công thức C₁V₁ = C₂V₂ từ dung dịch hiệu chuẩn Caffein 1000 mg/L.

### 2. Detector RF

- Cân chính xác đến 10 mg chuẩn Anthracene cho vào bình định mức 10 mL. Định mức đến vạch bằng Acetonitrile. Đánh trong bồn siêu âm khoảng 2 phút cho chuẩn tan hết.
- Chuẩn bị dung dịch hiệu chuẩn Anthracene ở các nồng độ (100, 200, 400, 600, 800) mg/L từ dung dịch gốc 1000 mg/L vào bình định mức 10 mL. Định mức đến vạch bằng Acetonitrile.

**Bảng 3**

| Dung dịch chuẩn                                          | 1   | 2   | 3   | 4   | 5   |
| -------------------------------------------------------- | --- | --- | --- | --- | --- |
| Nồng độ chuẩn Anthracene cần pha, mg/L                   | 100 | 200 | 400 | 600 | 800 |
| Lượng dung dịch chuẩn Anthracene 1000 mg/L cần hút, mL   | 1   | 2   | 4   | 6   | 8   |
| Bình định mức, mL                                        | 10  | 10  | 10  | 10  | 10  |

> *Lưu ý:* Đối với dải nồng độ khác theo yêu cầu khách hàng hoặc những dải đặc biệt, tiến hành chuẩn bị một dãy dung dịch hiệu chuẩn có 05 điểm nồng độ khác nhau để xây dựng đường cong hiệu chuẩn theo công thức C₁V₁ = C₂V₂ từ dung dịch hiệu chuẩn Anthracene 1000 mg/L.

### 3. Detector EC

- Chuẩn bị dung dịch chuẩn 1000 mg/L Hydroquinone: Cân chính xác 10 mg Hydroquinone vào bình định mức 10 mL. Định mức đến vạch bằng methanol.
- Chuẩn bị dung dịch hiệu chuẩn Hydroquinone ở các nồng độ (10, 20, 40, 60, 80) mg/L từ dung dịch gốc 1000 mg/L vào bình định mức 10 mL. Định mức đến vạch bằng methanol.

**Bảng 4**

| Dung dịch chuẩn                                             | 1   | 2   | 3   | 4   | 5   |
| ----------------------------------------------------------- | --- | --- | --- | --- | --- |
| Nồng độ chuẩn Hydroquinone cần pha, mg/L                    | 10  | 20  | 40  | 60  | 80  |
| Lượng dung dịch chuẩn Hydroquinone 1000 mg/L cần hút, mL    | 0,1 | 0,2 | 0,4 | 0,6 | 0,8 |
| Bình định mức, mL                                           | 10  | 10  | 10  | 10  | 10  |

> *Lưu ý:* Đối với dải nồng độ khác theo yêu cầu khách hàng hoặc những dải đặc biệt, tiến hành chuẩn bị một dãy dung dịch hiệu chuẩn có 05 điểm nồng độ khác nhau để xây dựng đường cong hiệu chuẩn theo công thức C₁V₁ = C₂V₂ từ dung dịch hiệu chuẩn Hydroquinone 1000 mg/L.
