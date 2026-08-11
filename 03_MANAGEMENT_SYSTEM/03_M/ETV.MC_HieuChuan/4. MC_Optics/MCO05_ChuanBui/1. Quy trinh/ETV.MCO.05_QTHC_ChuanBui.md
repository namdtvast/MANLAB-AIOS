---
id: ETV.MCO 05
title: "Hệ thống chuẩn nồng độ khối lượng bụi PM10, PM2,5 — Quy trình hiệu chuẩn"
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
keywords: [chuẩn bụi, PM10, PM2.5, gravimetric, cái lọc bụi, cân phân tích, tháp trộn, hiệu chuẩn]
related_documents: []
iso_clause: ["ISO/IEC 17025:2017", "EN 12341:2014", "EN 14907:2005"]
legal_basis: ["ĐLVN 294:2016"]
ai_tags: [calibration-procedure, dust-standard, pm-reference-sampler, gravimetric-method, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCO 05_Chuan Bui_V3.pdf`"
supersedes: "ETV.MCO 05 lần ban hành 01 (19/05/2021)"
superseded_by: null
---
# HỆ THỐNG CHUẨN NỒNG ĐỘ KHỐI LƯỢNG BỤI PM10, PM2,5 – QUY TRÌNH HIỆU CHUẨN

*Standard system for mass concentration of PM10, PM2,5 – Calibration procedure*

|                   |                     |
| ----------------- | ------------------- |
| **Mã số**         | ETV.MCO 05          |
| **Lần ban hành**  | 02                  |
| **Ngày ban hành** | 22/04/2026          |
| **Biên soạn**     | *(bản gốc để trống)* |
| **Soát xét**      | Trần Thị Hoa        |
| **Phê duyệt**     | Nguyễn Hoàng Giang  |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCO 05_Chuan Bui_V3.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khối chữ ký trong bản gốc **để trống**, chưa có tên người biên soạn.
>
> *Ghi chú của bản chuyển đổi:* (1) một số công thức số thứ tự trong bản gốc bị nhảy cóc hoặc lặp (ví dụ công thức (21) không xuất hiện, công thức (13)–(15) xuất hiện hai lần với hai bộ ký hiệu `u_A`/`u_Aref` khác nhau, mục "8.2.1.12" lặp lại nội dung của "8.2.1.1"); Bảng 3 trong bản gốc là bảng công thức dạng ảnh/ký tự lẫn lộn, được diễn giải lại theo đúng nội dung công thức tương ứng tìm thấy ở mục 8.2.x phía sau; (2) trang Phụ lục (biên bản hiệu chuẩn) ở trang 18/21 trong bản gốc in nhầm tiêu đề "Phương tiện đo hàm lượng bụi (TSP; TP; PM; PM10; PM5; PM 2,5; PM1)" và "Lần BH: 01 — Ngày BH: 22/04/2019" — là tiêu đề của quy trình khác (`ETV.MCO 03`/`04`), rõ ràng là lỗi dán nhầm chân trang; giữ nguyên văn trong phần Phụ lục. Khi có khác biệt, bản PDF do Viện ban hành là bản có giá trị áp dụng.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian  | Nội dung thay đổi     | Lần ban hành |
| ---------- | --------------------- | ------------ |
| 19/05/2021 | Ban hành lần thứ nhất | 01           |
| 22/04/2026 | Ban hành lần thứ hai  | 02           |

---

## 1. Phạm vi áp dụng

Văn bản kỹ thuật này quy định quy trình hiệu chuẩn hệ thống chuẩn nồng độ khối lượng bụi PM10, PM2,5 có phạm vi đo (0 ÷ 1.000) µg/m³ với độ không đảm bảo đo hoặc độ chính xác không nhỏ hơn 6 %, dùng để kiểm định phương tiện đo nồng độ khối lượng bụi PM10, PM2,5 trong môi trường không khí xung quanh.

## 2. Giải thích từ ngữ

Trong văn bản này, các từ ngữ dưới đây được hiểu như sau:

- **2.1. Hệ thống chuẩn nồng độ khối lượng bụi PM10, PM2,5:** là hệ thống tích hợp (tháp trộn, thiết bị phân tán bụi, hạt bụi chuẩn, thiết bị đo) để tạo ra các điểm nồng độ khối lượng bụi chuẩn với độ chính xác cao (gọi tắt là PTĐ cần hiệu chuẩn).
- **2.2. Thiết bị thu mẫu tham chiếu khối lượng bụi:** là thiết bị dùng để thu mẫu bụi PM với một thể tích không khí xác định hút qua cái lọc bụi trong một khoảng thời gian nhất định. Nồng độ khối lượng bụi PM được biểu thị bằng khối lượng của PM được giữ lại trên cái lọc bụi chia cho thể tích không khí (gọi tắt là thiết bị thu mẫu chuẩn).
- **2.3. PM10:** là các hạt bụi lơ lửng có đường kính khí động học nhỏ hơn hoặc bằng 10 µm.
- **2.4. PM2,5:** là các hạt bụi lơ lửng có đường kính khí động học nhỏ hơn hoặc bằng 2,5 µm.
- **2.5. Chuẩn nồng độ khối lượng bụi:** là chuẩn có các thành phần bụi với khối lượng xác định trên một đơn vị thể tích.
- **2.6. Mẫu "không":** là mẫu có các thành phần bụi nhỏ hơn 03 lần ngưỡng giới hạn mà phương tiện đo có thể phát hiện được trên một đơn vị thể tích.
- **2.7. ĐKĐB:** độ không đảm bảo đo.
- **2.8. Đơn vị đo:** µg/m³ (1 mg/m³ = 1.000 µg/m³).

## 3. Các phép hiệu chuẩn

Phải lần lượt tiến hành các phép hiệu chuẩn ghi trong Bảng 1.

**Bảng 1**

| TT  | Tên phép hiệu chuẩn         | Theo điều mục của quy trình |
| --- | ------------------------------ | ----------------------------- |
| 1   | Kiểm tra bên ngoài             | 7.1                            |
| 2   | Kiểm tra kỹ thuật               | 7.2                            |
| 3   | Kiểm tra đo lường               | 7.3                            |
| 3.1 | Kiểm tra mẫu "không"           | 7.3.2.1                        |
| 3.2 | Kiểm tra độ chính xác          | 7.3.2.2                        |
| 4   | Xử lý chung                    | 8 [^muc9]                      |

[^muc9]: Bảng 1 dẫn mục 8 là "Xử lý chung", nhưng phần thân văn bản đánh mục 8 là **"Ước lượng độ không đảm bảo đo"** và mục 9 mới là "Xử lý chung". Giữ nguyên văn, cần đính chính khi ban hành lại.

## 4. Phương tiện hiệu chuẩn

Các phương tiện dùng để hiệu chuẩn được nêu trong Bảng 2.

**Bảng 2**

| TT  | Tên phương tiện dùng để hiệu chuẩn | Đặc trưng kỹ thuật đo lường cơ bản                                                                                     | Áp dụng cho điều mục |
| --- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------- |
| 1   | **Chuẩn đo lường**                     |                                                                                                                       |                       |
| 1.1 | Cân phân tích                          | - Khả năng cân tối đa: 52/220 g<br>- Khả năng đọc (d): 0,001/0,01 mg<br>- ĐKĐB tại điểm 100 mg: < 0,015 mg           | 6, 7.2                |
| 1.2 | Thiết bị thu mẫu chuẩn                 | - Lưu lượng (thể tích): (1,0; 2,3; 2,7; 3,0) m³/h tương ứng (16,67; 38,33; 45,00; 50,00) L/min<br>- Đường kính cái lọc bụi: 47 mm<br>- Thiết bị kiểm soát được nhiệt độ, áp suất và thời gian<br>- ĐKĐB lưu lượng: < 2 % | 6, 7.2      |
| 2   | **Phương tiện đo**                     |                                                                                                                       |                       |
| 2.1 | Barometer                              | - Phạm vi đo: (750 ÷ 1150) hPa<br>- Giá trị độ chia: 0,1 hPa                                                          | 6, 7.2                |
| 2.2 | Phương tiện đo nhiệt độ và độ ẩm môi trường | - Phạm vi đo: Nhiệt độ (0 ÷ 50) °C, giá trị độ chia 1 °C; Độ ẩm (25 ÷ 95) %RH, giá trị độ chia 1 %RH             | 5                      |
| 3   | **Phương tiện phụ**                    |                                                                                                                       |                       |
| 3.1 | Cái lọc bụi                            | - PTFE không thấm nước<br>- Đường kính cái lọc: 46,2 mm<br>- Kích thước lỗ cái lọc: 2 µm<br>- Vòng hỗ trợ: polypropylene<br>- Khả năng giữ lại hạt (0,3 µm): 99,8 % | 6, 7   |
| 3.2 | Giá đỡ cái lọc bụi                     | Vật liệu: thép không gỉ. Đường kính của khu vực tiếp xúc không khí hút mẫu: (34 ÷ 44) mm                              | 6, 7                  |
| 3.3 | Panh gắp cái lọc bụi                   | Thép không gỉ phủ Polytetrafluoroethylene (PTFE)                                                                      | 6, 7                  |
| 3.4 | Áp kế (kiểm tra rò rỉ)                 | - Phạm vi đo: (0 ÷ 1,5) bar<br>- Cấp chính xác: 1                                                                     | 6                      |
| 3.5 | Đồng hồ bấm giây                       | - Đồng hồ đo thời gian chuẩn<br>- Sai số nhỏ hơn 1 phút/ngày                                                          | 6                      |
| 3.6 | Van nối, ống dẫn khí, đầu chuyển đổi    | Chế tạo bằng vật liệu không làm ảnh hưởng đến nồng độ khối lượng bụi chuẩn cần đo                                     | 6, 7.2                 |

## 5. Điều kiện hiệu chuẩn

Khi tiến hành hiệu chuẩn, phải đảm bảo các điều kiện môi trường sau đây:

- **5.1.** Địa điểm làm việc phải ít bụi, thoáng mát, không có chất ăn mòn hóa học, không có các nguồn gây biến đổi lớn về nhiệt môi trường và ít rung động trong quá trình làm việc.
- **5.2.** PTĐ cần hiệu chuẩn phải được lắp đặt vào hệ thống theo đúng tài liệu hướng dẫn của nhà sản xuất. Các gioăng đệm không được lấn vào phần trong của ống dẫn.
- **5.3.** Đoạn ống thẳng phía trước và phía sau của thiết bị thu mẫu chuẩn phải có chiều dài không nhỏ hơn các giá trị quy định trong tài liệu hướng dẫn của nhà sản xuất và phải có cùng đường kính danh định với PTĐ cần hiệu chuẩn.
- **5.4. Điều kiện thực hiện hiệu chuẩn:**
  - Nhiệt độ: (25 ± 2) °C;
  - Độ ẩm không khí: ≤ 80 %RH (không đọng sương);
  - Áp suất khí quyển: (860 ÷ 1060) hPa.
- **5.5. Điều kiện phòng cân:**
  - Nhiệt độ: (20 ± 3) °C;
  - Độ ẩm không khí: (45 ÷ 50) %RH.

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành hiệu chuẩn, phải chuẩn bị các công việc sau đây:

- PTĐ cần hiệu chuẩn phải được kiểm tra, vận hành ổn định theo đúng yêu cầu của nhà sản xuất quy định trong tài liệu kỹ thuật.
- Chuẩn đo lường cần phải được hiệu chuẩn, kiểm tra trước khi sử dụng:
  - Kiểm tra kết nối của thiết bị thu mẫu chuẩn đến PTĐ cần hiệu chuẩn đảm bảo sự kín, khít, không rò rỉ, lưu lượng khí đầu vào phù hợp với yêu cầu quy định của nhà sản xuất.
  - Tốc độ rò rỉ không được vượt quá 1 % tốc độ hút mẫu trung bình [1].
  - Trước khi hút mẫu, tất cả các cái lọc bụi trắng phải được đặt trong phòng cân đảm bảo điều kiện ở nhiệt độ (19 ÷ 21) °C và (45 ÷ 50) %RH trong ≥ 48 giờ, sau đó cân lần đầu tiên: kết quả `m_bi,1`, và trong ≥ 12 giờ cân lần tiếp theo: kết quả `m_bi,2`.

  Sai lệch giữa hai lần cân phải đáp ứng yêu cầu sau:

  $$\Delta m_{bi} = |m_{bi,1} - m_{bi,2}| \leq 40\ \mu g \tag{1}$$

  Nếu điều kiện (1) không đáp ứng, cái lọc bụi sẽ bị loại bỏ hoặc được bảo quản trong phòng cân thêm khoảng thời gian ≥ 24 giờ, cân lại: kết quả `m_bi,3`.

  Sai lệch giữa hai lần cân cuối cùng phải đáp ứng yêu cầu sau:

  $$|m_{bi,2} - m_{bi,3}| \leq 40\ \mu g \tag{2}$$

  Nếu điều kiện (2) không đáp ứng, cái lọc bụi sẽ bị loại bỏ và sẽ thay thế bằng cái lọc bụi khác, phải thực hiện kiểm tra lại theo bước tuần tự như trên.

- Trong thời gian hút mẫu, nhiệt độ của không khí xung quanh bộ hút mẫu phải chênh lệch ít hơn 5 °C so với nhiệt độ của phòng cân cái lọc bụi.
- Vận hành thiết bị thu mẫu chuẩn; cân phân tích; PTĐ cần hiệu chuẩn theo đúng quy định trong tài liệu kỹ thuật.
- Chọn điểm hiệu chuẩn có nồng độ khối lượng bụi theo yêu cầu sau:
  - Điểm hiệu chuẩn thứ nhất có giá trị nồng độ khối lượng bụi nằm trong khoảng (30 ± 10) % của toàn bộ phạm vi đo;
  - Điểm hiệu chuẩn thứ hai có giá trị nồng độ khối lượng bụi nằm trong khoảng (80 ± 10) % của toàn bộ phạm vi đo.

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

PTĐ cần hiệu chuẩn được kiểm tra bên ngoài theo các yêu cầu sau đây:

Kiểm tra xác định sự phù hợp của PTĐ cần hiệu chuẩn với các yêu cầu quy định trong tài liệu kỹ thuật về hình dáng, kích thước, hiển thị, nguồn điện sử dụng, nhãn hiệu và phụ kiện kèm theo.

### 7.2. Kiểm tra kỹ thuật

PTĐ cần hiệu chuẩn được kiểm tra kỹ thuật theo các yêu cầu quy định trong tài liệu kỹ thuật.

### 7.3. Kiểm tra đo lường

PTĐ cần hiệu chuẩn được kiểm tra đo lường theo các yêu cầu sau đây:

#### 7.3.1. Phương pháp hiệu chuẩn

Phương pháp hiệu chuẩn hệ thống chuẩn nồng độ khối lượng bụi PM10, PM2,5 được tiến hành bằng cách so sánh kết quả của hệ thống chuẩn đo lường bụi được xác định bằng việc cân lượng bụi thu được trên cái lọc bụi sau khi lọc một thể tích không khí xác định với giá trị hiển thị của PTĐ cần hiệu chuẩn.

#### 7.3.2. Tiến hành hiệu chuẩn

##### 7.3.2.1. Kiểm tra mẫu "không"

**a. Tại vị trí đầu hút 01**

- Sử dụng PTĐ cần hiệu chuẩn đo lần lượt tối thiểu 5 lần liên tiếp các điểm hiệu chuẩn đã chọn ở mục 6 với thời gian đo trùng với thời gian hút mẫu trên thiết bị thu mẫu chuẩn. Ghi kết quả đo được vào biên bản ở Phụ lục 1.
- Đối với thiết bị thu mẫu chuẩn:
  - Cái lọc bụi phải được đặt trong môi trường điều hòa sạch.
  - Đảm bảo khả năng nguyên xi của cái lọc bụi và vị trí của nó trong hộp tuần tự cái lọc bụi hút mẫu.
  - Các cái lọc bụi trong hộp sẽ được thu mẫu trong khoảng thời gian hút mẫu cần thiết, sau đó được đặt lại trong hộp băng lọc hoặc trong đĩa petri thủy tinh sạch.

  > *Lưu ý:* Phải giữ lại ít nhất 01 cái lọc bụi trong hộp để làm mẫu trắng.

- Tất cả các cái lọc bụi đã hút mẫu và các cái lọc bụi trắng phải được bảo vệ khỏi sự nhiễm bẩn bên ngoài trong quá trình bảo quản và vận chuyển.
- Cái lọc bụi đã hút mẫu phải được đặt trong phòng cân đảm bảo điều kiện ở nhiệt độ (19 ÷ 21) °C và (45 ÷ 50) %RH trong ≥ 48 giờ, sau đó cân lần đầu tiên (gọi là kết quả `m_azi,1`) và sau 24 giờ đến 72 giờ cân lần 02 (gọi là kết quả `m_azi,2`).

  Sai lệch giữa hai kết quả phải đáp ứng yêu cầu:

  $$|m_{azi,1} - m_{azi,2}| \leq 60\ \mu g \tag{3}$$

  Nếu điều kiện (3) không đáp ứng, kết quả sẽ là không hợp lệ hoặc cái lọc bụi sẽ được bảo quản trong phòng cân thêm khoảng thời gian ≥ 24 giờ và được cân lại (gọi là kết quả `m_azi,3`).

  Sai lệch giữa hai kết quả cuối cùng sẽ đáp ứng yêu cầu:

  $$|m_{azi,2} - m_{azi,3}| \leq 60\ \mu g \tag{4}$$

  Nếu điều kiện (4) không đáp ứng, kết quả sẽ bị hủy bỏ và coi là không hợp lệ.

  Khối lượng cái lọc bụi phải được đọc là giá trị trung bình của ít nhất 02 lần cân liên tiếp gần nhất.

**b. Tại vị trí đầu hút 02**

Thực hiện tương tự các bước như tại vị trí đầu hút 01 (mục a).

##### 7.3.2.2. Kiểm tra độ chính xác

**a. Tại vị trí đầu hút 01**

- Sử dụng PTĐ cần hiệu chuẩn đo lần lượt tối thiểu 5 lần liên tiếp các điểm hiệu chuẩn đã chọn ở mục 6 với thời gian đo trùng với thời gian hút mẫu trên thiết bị thu mẫu chuẩn. Ghi kết quả đo được vào biên bản ở Phụ lục 1.
- Đối với thiết bị thu mẫu chuẩn:
  - Giá đỡ cái lọc bụi phải được đặt trong môi trường điều hòa sạch.
  - Đảm bảo khả năng nguyên xi của cái lọc bụi và vị trí của nó trong hộp tuần tự cái lọc bụi hút mẫu.
  - Các cái lọc bụi trong hộp sẽ được thu mẫu trong khoảng thời gian hút mẫu cần thiết, sau đó được đặt lại trong hộp băng lọc hoặc trong đĩa petri thủy tinh sạch.

  > *Lưu ý:* Phải giữ lại ít nhất 01 cái lọc bụi trong hộp để làm mẫu trắng.

- Tất cả các cái lọc bụi đã lấy mẫu và các cái lọc bụi trắng phải được bảo quản khỏi sự nhiễm bẩn bên ngoài trong quá trình lưu giữ và vận chuyển.
- Cái lọc bụi đã hút mẫu phải được đặt trong phòng cân đảm bảo điều kiện ở nhiệt độ (19 ÷ 21) °C và (45 ÷ 50) %RH trong ≥ 48 giờ, sau đó cân lần đầu tiên (gọi là kết quả `m_asi,1`) và sau 24 giờ đến 72 giờ cân lần 02 (gọi là kết quả `m_asi,2`).

  Sai lệch giữa hai kết quả phải đáp ứng yêu cầu:

  $$|m_{asi,1} - m_{asi,2}| \leq 60\ \mu g \tag{5}$$

  Nếu điều kiện (5) không đáp ứng, kết quả sẽ là không hợp lệ hoặc cái lọc bụi sẽ được bảo quản trong phòng cân thêm khoảng thời gian ≥ 24 giờ và được cân lại (gọi là kết quả `m_asi,3`).

  Sai lệch giữa hai kết quả cuối cùng sẽ đáp ứng yêu cầu:

  $$|m_{asi,2} - m_{asi,3}| \leq 60\ \mu g \tag{6}$$

  Nếu điều kiện (6) không đáp ứng, kết quả sẽ bị hủy bỏ và coi là không hợp lệ.

  Khối lượng cái lọc bụi phải được đọc là giá trị trung bình của ít nhất hai lần cân liên tiếp gần nhất.

**b. Tại vị trí đầu hút 02**

Thực hiện tương tự các bước như tại vị trí đầu hút 01 (mục a).

#### 7.3.3. Tính toán

**Nồng độ khối lượng hạt PM tham chiếu [2]:**

$$C_{m,ref} = \eta_{hom} \cdot \frac{m}{V} = \eta_{hom} \cdot \frac{(m_{ai} - m_{bi})}{Q \times t} \tag{7}$$

- `C_m,ref`: nồng độ khối lượng hạt PM tham chiếu;
- `η_hom`: là độ không đồng nhất nồng độ bụi vị trí đầu hút mẫu:

  $$\eta_{hom} = 1 - \frac{|C_i^{ref} - C_j^{ref}|}{\bar{C}} \tag{8}$$

  - `C_i^ref`: nồng độ hạt PM tại vị trí i trên cùng mặt phẳng tiết diện thu mẫu, µg/m³;
  - `C_j^ref`: nồng độ hạt PM tại vị trí j trên cùng mặt phẳng tiết diện thu mẫu, µg/m³;
  - `C̄`: nồng độ hạt PM trung bình tại các điểm đo, µg/m³.

- `m`: là khối lượng hạt PM thu được trên cái lọc bụi, µg:

  $$m = m_{ai} - m_{bi} \tag{9}$$

  - `m_ai`: khối lượng cái lọc bụi thứ i sau khi hút mẫu, µg;
  - `m_bi`: khối lượng cái lọc bụi thứ i trước khi hút mẫu, µg.

- `V`: là thể tích được hút mẫu, m³:

  $$V = Q \times t \tag{10}$$

  - `Q`: lưu lượng thể tích qua cái lọc bụi, m³/h;
  - `t`: thời gian thu mẫu hạt PM (thời gian đo), h.

## 8. Ước lượng độ không đảm bảo đo

### 8.1. Các yếu tố gây ra độ không đảm bảo đo

Từ mô hình tổng quát (7) có 04 tham số đầu vào đóng góp vào đại lượng đầu ra, đó là nồng độ hạt PM trung bình tại các điểm đo, tốc độ dòng chảy, thời gian và độ lệch đồng nhất vị trí đầu hút mẫu, cụ thể:

#### 8.1.1. Hiệu suất thu gom của đầu lựa chọn kích thước hạt bụi

Đặc tính lựa chọn kích thước hạt PM được xác định dựa theo thiết kế khi được hoạt động ở tốc độ dòng chảy chính xác. Sai lệch trong phần lựa chọn kích thước hạt PM sẽ phụ thuộc vào: sai lệch so với thiết kế cơ học lý tưởng do dung sai kích thước, tích tụ bụi hoặc bôi trơn không đủ; sai lệch so với tốc độ dòng chảy yêu cầu.

Những sai lệch này được giới hạn bởi dung sai thiết kế từ nhà sản xuất theo đúng tiêu chuẩn nên có thể được coi là không đáng kể. Ngoài ra, độ lệch trong phần kích thước sẽ phụ thuộc vào nhiệt độ môi trường xung quanh, vì sự phụ thuộc nhiệt độ của độ nhớt của không khí xung quanh. Đường kính cắt PM thay đổi khoảng 1,5 % khi nhiệt độ thay đổi 10 K. Về nguyên tắc, sự thay đổi này góp phần không đáng kể vào nguồn không đảm bảo đo của kết quả.

#### 8.1.2. Tổn thất lắng đọng trong đường ống nối

Tổn thất do lắng đọng (trọng lực và quán tính) không đáng kể bằng cách sử dụng đường ống nối thẳng đứng và hạn chế đường ống nối khúc cua trong đường hút mẫu. Ngoài ra, tổn thất lắng đọng trong đường ống nối do sự chênh lệch nhiệt độ, do vậy cần hạn chế sự sụt giảm nhiệt độ lớn giữa ống nối và không khí hút mẫu. Vì vậy tổn thất lắng đọng trong đường ống nối được coi là có sự đóng góp không đáng kể vào nguồn độ không đảm bảo đo của kết quả.

#### 8.1.3. Tổn thất hạt PM do xuyên qua cái lọc bụi

Tổn thất hạt PM do xuyên qua cái lọc bụi sẽ rất nhỏ và bị giới hạn bởi yêu cầu kỹ thuật đối với cái lọc bụi (Bảng 2, mục 3, khoản 3.1: khả năng giữ lại hạt 0,3 µm là 99,8 %). Cho nên, nguồn đóng góp vào độ không đảm bảo đo của kết quả do tổn thất hạt PM là không đáng kể.

#### 8.1.4. Tổn thất hạt PM do bay hơi giữa quá trình thu gom và cân

Các yếu tố chính trong tốc độ bay hơi là nhiệt độ của hệ thống hút mẫu và cái lọc bụi; độ ẩm tương đối; vật liệu lọc và tốc độ dòng chảy. Tổn thất hạt PM do bay hơi được giới hạn trong phương pháp đo bởi các ràng buộc đối với các thành phần của hệ thống lấy mẫu, bảo quản, vận chuyển và điều kiện hút mẫu được quy định trong quy trình. Vì vậy, tổn thất hạt PM do bay hơi giữa quá trình thu gom và cân được coi là không đáng kể vào nguồn độ không đảm bảo đo của kết quả.

#### 8.1.5. Độ không đảm bảo của cân phân tích và độ trôi điểm 0

Sử dụng kết quả ĐKĐB trên giấy chứng nhận hiệu chuẩn của cân phân tích.

#### 8.1.6. Ảnh hưởng khối lượng cái lọc bụi do hàm lượng ẩm

Sự thay đổi độ ẩm trên cái lọc bụi cũng đóng góp vào độ không đảm bảo đo. Tuy nhiên, sự thay đổi về độ ẩm tương đối trung bình được kiểm soát (45 ÷ 50) %RH giữa các lần cân cái lọc bụi chưa hút mẫu.

#### 8.1.7. Ảnh hưởng khối lượng của hạt PM do hàm lượng nước

Đưa các hạt PM thu được về mức hàm lượng nước tiêu chuẩn bằng cách quy định nhiệt độ và độ ẩm tương đối trước và trong khi cân. Ảnh hưởng của điều này đối với độ không đảm bảo của phép đo được định lượng một phần bởi hạn chế về sự thay đổi khối lượng ở các lần cân riêng biệt của cái lọc bụi hút mẫu được đưa ra.

#### 8.1.8. Ảnh hưởng lực đẩy của hạt PM trong môi trường không khí

Mật độ của không khí gây ra hiệu ứng lực đẩy đối với trọng lượng của cái lọc bụi, chủ yếu được xác định bởi áp suất không khí và nhiệt độ. Tuy nhiên, tác động của sự thay đổi lực đẩy có thể được tính toán từ các nguyên tắc vật lý và nhỏ hơn 3 µg.

#### 8.1.9. Ảnh hưởng của từ tính trong quá trình cân

Từ tính có ảnh hưởng đáng kể đến trọng lượng của cái lọc bụi. Tuy nhiên, trong quá trình cân cái lọc bụi (trước và sau khi hút mẫu) phải được khử từ tính để kiểm soát điều này.

#### 8.1.10. Nhiễm bẩn hoặc tổn thất hạt PM giữa các lần cân (trước và sau khi hút mẫu)

Có thể tạo ra sai số đáng kể về trọng lượng của các hạt PM được thu thập do tổn thất từ quá trình xử lý, vận chuyển và cân hoặc nhiễm bẩn từ các hạt PM không được thu thập trong quá trình hút mẫu. Các quy trình xử lý, bảo quản và vận chuyển được thiết kế để kiểm soát các yếu tố này. Do vậy, yếu tố này được coi ảnh hưởng không đáng kể vào nguồn độ không đảm bảo đo của kết quả.

#### 8.1.11. Các bề mặt do tương tác giữa vật liệu cái lọc bụi và khí

Vật liệu cái lọc bụi có thể hấp phụ các hợp chất dễ bay hơi có trong không khí được hút mẫu như amoniac, nitơ đioxit và khí hữu cơ. Sự đóng góp vào khối lượng cái lọc bụi sẽ thay đổi theo nồng độ của các loại khí và bản chất hóa học của vật liệu cái lọc bụi. Sự hấp phụ thậm chí có thể dẫn đến giảm thất thoát các cấu tử bán dễ bay hơi của hạt PM. Do đó, không thể định lượng được mức độ ảnh hưởng của sự hấp phụ các chất khí. Yếu tố này được thừa nhận nhưng không được xem xét vào nguồn độ không đảm bảo đo của kết quả.

#### 8.1.12. Tốc độ dòng chảy (Q)

Hai thành phần của độ sai số đo tốc độ dòng chảy: thứ nhất phát sinh từ độ chính xác của tiêu chuẩn truyền được sử dụng để hiệu chuẩn; thứ hai là do bất kỳ độ lệch thực nào so với tốc độ dòng yêu cầu so với giá trị đã hiệu chuẩn trong khoảng thời gian của phép đo. Lưu lượng trung bình được kiểm soát trong phạm vi ± 2 %, trong khi đồng hồ đo lưu lượng được hiệu chuẩn với độ sai số đo nhỏ hơn 2 % (với độ tin cậy 95 %).

Việc đo lưu lượng cũng có thể bị ảnh hưởng bởi sự khác biệt về tốc độ dòng chảy giữa đầu hút mẫu và đồng hồ đo lưu lượng, giảm áp suất qua cái lọc bụi, gió, nhiệt độ và áp suất ảnh hưởng đến đồng hồ đo lưu lượng và rò rỉ trong đường ống hoặc xung quanh giá đỡ bộ lọc bụi.

#### 8.1.13. Thời gian (t)

Với các thiết bị đo thời gian hiện đại như hiện nay sẽ không có ảnh hưởng đáng kể nào đến mục đích đo lường hiệu chuẩn. Ngoài ra, sẽ có một số khác biệt giữa thời gian đo được và thời gian thực mà bộ lọc hút mẫu ở tốc độ dòng chảy yêu cầu. Chênh lệch tối đa yêu cầu là 5 phút trong khoảng thời gian hút mẫu là 24 giờ, tức là độ biến thiên 0,35 %. Tuy nhiên, có thể coi sai số bởi thời gian đo không ảnh hưởng đáng kể đến nguồn độ không đảm bảo đo của kết quả.

#### 8.1.14. Độ lệch đồng nhất vị trí đầu hút mẫu

Độ lệch đồng nhất vị trí đầu hút mẫu (hay còn gọi là độ đồng nhất của sol khí trong tháp trộn) là hệ số chênh lệch về nồng độ bụi thu được tại các vị trí hút mẫu khác nhau trên cùng một mặt phẳng tiết diện.

#### 8.1.15. Độ lặp lại của thiết bị thu mẫu chuẩn

Đối với thiết bị thu mẫu chuẩn với các lần đo khác nhau, sẽ có các giá trị và độ không đảm bảo do lặp lại của kết quả hệ thống chuẩn.

#### 8.1.16. Độ lặp lại của PTĐ cần hiệu chuẩn

Đối với PTĐ cần hiệu chuẩn với các kết quả đo có sự sai lệch khác nhau, sẽ có các giá trị và độ không đảm bảo do lặp lại của kết quả đo được xác định bằng phương pháp thống kê.

#### 8.1.17. Độ phân giải của PTĐ cần hiệu chuẩn

Độ phân giải của PTĐ cần hiệu chuẩn ảnh hưởng đến kết quả đánh giá độ không đảm bảo đo của hệ thống và được tính bằng ½ giá trị độ phân giải, tính theo phân bố chuẩn hình chữ nhật.

### 8.2. Tính toán ĐKĐB của các yếu tố ảnh hưởng

Từ mô hình tổng quát (7), xác định ĐKĐB từ tổ hợp của nồng độ khối lượng bụi chuẩn:

$$u_C = C \times \sqrt{\frac{u_{\eta hom}^2}{\eta_{hom}^2} + \frac{u_{(m_{ai}-m_{bi})}^2}{(m_{ai}-m_{bi})^2} + \frac{u_{(Q)}^2}{Q^2} + \frac{u_{(t)}^2}{t^2}} \tag{11}$$

Trong đó `t` xác định rất lớn và `u(t)` xấp xỉ bằng không nên ảnh hưởng không đáng kể, `u²(t)/t² ~ 0`. Từ đó suy ra dạng rút gọn tương đương biểu diễn theo hai cách:

$$u_C^2 = \frac{\eta_{hom}^2 \times (m_{ai}-m_{bi})^2 \times u_{\eta hom}^2}{\eta_{hom}^2 \times Q^2 \times t^2} + \frac{\eta_{hom}^2 \times (m_{ai}-m_{bi})^2 \times u_{(m_{ai}-m_{bi})}^2}{(m_{ai}-m_{bi})^2 \times Q^2 \times t^2} + \frac{C^2 \times Q^2 \times u_{(Q)}^2}{Q^2 \times 100^2} \tag{12}$$

hay:

$$u_C^2 = \frac{(m_{ai}-m_{bi})^2 \times u_{\eta hom}^2}{Q^2 \times t^2} + \frac{\eta_{hom}^2 \times u_{(m_{ai}-m_{bi})}^2}{Q^2 \times t^2} + \frac{C^2 \times u_{(Q)}^2}{100^2}$$

> *Ghi chú của bản chuyển đổi:* các bước biến đổi trung gian của công thức (12) trong bản gốc bị lặp/rối do lỗi trích xuất ký tự toán học từ PDF; hai dạng công thức được giữ lại ở trên phản ánh nội dung toán học của bản gốc theo khả năng đọc tốt nhất — tham khảo bản PDF gốc để đối chiếu khi cần độ chính xác tuyệt đối.

#### 8.2.1. Độ không đảm bảo do PTĐ cần hiệu chuẩn

##### 8.2.1.1. Độ không đảm bảo đo chuẩn loại A (u_A)

Độ không đảm bảo đo do phép đo lặp lại [3]:

- Giá trị trung bình của n phép đo:

  $$\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i \tag{13}$$

- Độ lệch chuẩn thực nghiệm của giá trị trung bình:

  $$s(\bar{x}) = \sqrt{\frac{\sum_{i=1}^{n}(x_i - \bar{x})^2}{n-1}} \tag{14}$$

  - `n`: số lần đo; `x_i`: giá trị đo thứ i; `x̄`: giá trị đo trung bình.

- Độ không đảm bảo đo chuẩn loại A:

  $$u_A = \frac{s(\bar{x})}{\sqrt{n}} \tag{15}$$

##### 8.2.1.2. Độ không đảm bảo đo gây nên bởi độ phân giải của PTĐ (u_res)

$$u_{res} = \frac{d}{2\sqrt{3}} \tag{16}$$

với `d`: là độ phân giải của PTĐ cần hiệu chuẩn.

#### 8.2.2. Độ không đảm bảo đo của thiết bị thu mẫu chuẩn

##### 8.2.2.1. Độ không đảm bảo gây ra bởi cân phân tích

Theo giấy chứng nhận hiệu chuẩn:

$$u_{mba} = \frac{U_{mba}}{k} \tag{17}$$

- `U_mba`: độ không đảm bảo từ giấy chứng nhận hiệu chuẩn của cân phân tích;
- `k`: hệ số phủ với mức độ tin cậy theo đơn vị hiệu chuẩn cấp (k = 2).

##### 8.2.2.2. Độ lặp lại của cân phân tích

Độ không đảm bảo thực nghiệm tính được sau khi tiến hành cân 1 lượng hạt PM bất kỳ (1 g), 10 lần, là b (µg).

Độ không đảm bảo đo của khối lượng:

$$u_m = \sqrt{\left(\frac{a}{2}\right)^2 + b^2} \tag{18}$$

##### 8.2.2.3. Ảnh hưởng của độ ẩm đến cái lọc bụi

$$u_{mlb} = \frac{|m_{c,1} - m_{c,2}|}{\sqrt{3}} \tag{19}$$

- `m_c,1`: kết quả cân cái lọc bụi chưa hút mẫu lần 1;
- `m_c,2`: kết quả cân cái lọc bụi chưa hút mẫu lần 2.

##### 8.2.2.4. Ảnh hưởng lực đẩy của hạt PM trên cái lọc bụi chưa được hút mẫu

$$u_{mb1} = \frac{3}{\sqrt{3}}\ \mu g \tag{20}$$

Giá trị 3: là giá trị được tính toán từ các nguyên tắc vật lý.

##### 8.2.2.5. Ảnh hưởng do độ trôi của cân từ cái lọc bụi chưa được hút mẫu

$$u_{mzd1} = \frac{\text{độ phân giải cân}}{\sqrt{3}}\ \mu g \tag{22}$$

> *Ghi chú:* bản gốc không có công thức số (21) trong dãy đánh số này — giữ nguyên văn.

##### 8.2.2.6. Ảnh hưởng của độ phơi sáng trên cái lọc bụi được hút mẫu

$$u_{mfb} = \frac{|m_{s,1} - m_{s,2}|}{\sqrt{3}} \tag{23}$$

- `m_s,1`: kết quả cân cái lọc bụi được hút mẫu lần 1;
- `m_s,2`: kết quả cân cái lọc bụi được hút mẫu lần 2.

##### 8.2.2.7. Ảnh hưởng của độ ẩm lên cái lọc bụi được hút mẫu

$$u_{mhp} = \frac{|m_{s,1} - m_{s,2}|}{\sqrt{12}} \tag{24}$$

##### 8.2.2.8. Ảnh hưởng lực đẩy của hạt PM trên cái lọc bụi được hút mẫu

$$u_{mb2} = \frac{3}{\sqrt{3}}\ \mu g \tag{25}$$

Giá trị 3: là giá trị được tính toán từ các nguyên tắc vật lý.

##### 8.2.2.9. Ảnh hưởng của cân không trôi của cái lọc bụi được hút mẫu

$$u_{mzd2} = \frac{\text{độ phân giải cân}}{\sqrt{3}}\ \mu g \tag{26}$$

##### 8.2.2.10. Độ không đảm bảo gây ra bởi thiết bị thu mẫu chuẩn

Theo giấy chứng nhận hiệu chuẩn:

$$u_Q = \frac{U_c}{k} \tag{27}$$

- `k`: hệ số phủ với mức độ tin cậy theo đơn vị hiệu chuẩn cấp (k = 2);
- `U_c`: độ không đảm bảo đo từ giấy chứng nhận hiệu chuẩn của thiết bị thu mẫu chuẩn.

##### 8.2.2.11. Ảnh hưởng của độ không đồng nhất nồng độ bụi vị trí đầu hút mẫu

$$u_{\eta hom} = \frac{|C_i^{ref} - C_j^{ref}|}{2\sqrt{3}}\ \mu g/m^3 \tag{28}$$

##### 8.2.2.12. Độ không đảm bảo đo chuẩn loại A của thiết bị thu mẫu chuẩn (u_Aref)

Độ không đảm bảo đo do phép đo lặp lại [3], tính theo cùng nguyên tắc (13)–(14) ở mục 8.2.1.1:

$$u_{Aref} = \frac{s(\bar{x})}{\sqrt{n}} \tag{15}$$

### 8.2 (tiếp). Độ không đảm bảo đo chuẩn tổng hợp (u_c)

$$u_c = \sqrt{\frac{(m_{ai}-m_{bi})^2 \times u_{\eta hom}^2}{Q^2 \times t^2} + \frac{\eta_{hom}^2 \times u_{(m_{ai}-m_{bi})}^2}{Q^2 \times t^2} + \frac{C^2 \times u_{(Q)}^2}{100^2} + u_{Aref}^2 + u_A^2 + u_{res}^2}\ \ (\mu g/m^3) \tag{29}$$

hoặc

$$u_c = \frac{u_c \times 100}{\bar{C}}\ (\%) \tag{30}$$

Trong đó:

$$u_{(m_{ai}-m_{bi})}^2 = \sum u_{mi}^2$$

`C̄`: giá trị trung bình của chuẩn (µg/m³).

### 8.3. Độ không đảm bảo đo chuẩn mở rộng U

$$U = k \times u_C \tag{31}$$

Trong đó `k` là hệ số phủ, k = 2 ứng với xác suất tin cậy xấp xỉ 95 %.

## 9. Xử lý chung

- **a.** Hệ thống chuẩn nồng độ khối lượng bụi PM10, PM2,5 sau khi hiệu chuẩn, nếu có độ không đảm bảo đo hoặc độ chính xác ≤ 6 %, được cấp chứng chỉ hiệu chuẩn (tem hiệu chuẩn, giấy chứng nhận hiệu chuẩn) theo quy định.
- **b.** Hệ thống chuẩn nồng độ khối lượng bụi PM10, PM2,5 sau khi hiệu chuẩn, nếu có độ không đảm bảo đo hoặc độ chính xác > 6 %, thì không cấp chứng chỉ hiệu chuẩn mới và xóa dấu hiệu chuẩn cũ (nếu có).
- **c.** Chu kỳ hiệu chuẩn của hệ thống chuẩn nồng độ khối lượng bụi PM10, PM2,5 là 12 tháng.

---

## PHỤ LỤC — BIÊN BẢN HIỆU CHUẨN

> *Ghi chú của bản chuyển đổi:* trang biên bản (trang 18/21 bản gốc) in nhầm tiêu đề chân trang "Phương tiện đo hàm lượng bụi (TSP; TP; PM; PM10; PM5; PM 2,5; PM1)" và "Lần BH: 01 — Ngày BH: 22/04/2019" — thuộc quy trình khác; giữ nguyên văn nội dung biểu mẫu.

Tên cơ quan hiệu chuẩn: ……………………… — **BIÊN BẢN HIỆU CHUẨN** — Số: ………

- Tên đối tượng: …
- Kiểu: …  Số: …
- Cơ sở sản xuất: …  Năm sản xuất: …
- Đặc trưng kỹ thuật: …
- Cơ sở sử dụng: …
- Phương pháp thực hiện: …
- Chuẩn, thiết bị chính được sử dụng: …
- Điều kiện môi trường: Nhiệt độ …… °C; Độ ẩm …… %RH
- Người thực hiện: ……  Ngày thực hiện: ……
- Địa điểm thực hiện: …

### KẾT QUẢ HIỆU CHUẨN

1. Kiểm tra bên ngoài: ☐ Đạt  ☐ Không đạt
2. Kiểm tra kỹ thuật: ☐ Đạt  ☐ Không đạt

**Kiểm tra cái lọc bụi**

| TT  | Ký hiệu cái lọc | Khối lượng trước khi lấy mẫu — Lần 1 (mg) | Lần 2 (mg) | Lần 3 (mg) | Khối lượng sau khi lấy mẫu — Lần 1 (mg) | Lần 2 (mg) | Lần 3 (mg) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 – 26 |  |  |  |  |  |  |  |

**3. Kiểm tra đo lường**

**3.1. Kiểm tra mẫu "không"**

| TT | Giá trị của đối tượng (mg/m³) | Giá trị của chuẩn (mg/m³) | Khối lượng trước khi đo (mg) | Khối lượng sau khi đo (mg) | Thể tích hút mẫu (m³) | Thời gian hút mẫu (giờ) |
| --- | --- | --- | --- | --- | --- | --- |
| A. Vị trí đầu hút 01 — 1, 2, 3 |  |  |  |  |  |  |
| B. Vị trí đầu hút 02 — 1, 2, 3 |  |  |  |  |  |  |

**3.2. Kiểm tra độ chính xác**

| TT | Điểm nồng độ (mg/m³) | Giá trị của đối tượng (mg/m³) | Giá trị của chuẩn (mg/m³) | Khối lượng trước khi đo (mg) | Khối lượng sau khi đo (mg) | Thể tích hút mẫu (m³) | Thời gian hút mẫu (giờ) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A. Vị trí đầu hút 01 — 1–5, 1–5 |  |  |  |  |  |  |  |
| B. Vị trí đầu hút 02 — 1–5, 1–5 |  |  |  |  |  |  |  |

Người soát lại — Người thực hiện

---

## TÀI LIỆU THAM KHẢO

1. European Committee for Standardization, *"EN 12341:2014 Ambient air - Standard gravimetric measurement method for the determination of the PM10 or PM2,5 mass concentration of suspended particulate matter"*, 2014.
2. S. Horender et al., *"Facility for production of ambient-like model aerosols (PALMA) in the laboratory: Application in the intercomparison of automated PM monitors with the reference gravimetric method"*, Atmos. Meas. Tech., vol. 14, no. 2, pp. 1225–1238, 2021, doi: 10.5194/amt-14-1225-2021.
3. Tổng cục Tiêu chuẩn Đo lường Chất lượng, *"ĐLVN 294:2016 - Chuẩn đo hàm lượng bụi tổng trong không khí quy trình hiệu chuẩn"*, 2016.
4. *"Directive 2008/50/EC of the European Parliament and of the Council of 21 May 2008 on ambient air quality and cleaner air for Europe"*.
5. EN 14907:2005 — Ambient air quality - Standard gravimetric measurement method for the determination of the PM2,5 mass fraction of suspended particulate matter.
6. M. D. Vonk J., Hafkenscheid TH.L., *"Comparability of reference measurement devices and filter types for particulate matter (PM10)"*, RIVM Report 680708010/2010, Rijksinstituut voor Volksgezondheid en Milieu, Bilthoven, The Netherlands, 2011.
7. CEN/TS 16450:2013 — Ambient air - Automated measuring systems for the measurement of the concentration of particulate matter (PM10; PM2,5).
8. EN 14902 — Ambient air quality - Standard method for the measurement of Pb, Cd, As and Ni in the PM10 fraction of suspended particulate matter.
9. EN 15549 — Air quality - Standard method for the measurement of the concentration of benzo[a]pyrene in ambient air.
