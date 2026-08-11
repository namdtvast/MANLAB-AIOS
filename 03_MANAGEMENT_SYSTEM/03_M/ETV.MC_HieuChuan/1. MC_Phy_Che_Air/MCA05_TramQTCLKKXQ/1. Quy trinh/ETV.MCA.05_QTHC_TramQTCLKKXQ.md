---
id: ETV.MCA 05
title: "Phương tiện đo nồng độ khí của trạm quan trắc chất lượng không khí xung quanh — Quy trình hiệu chuẩn"
type: Quy-trinh
owner: "Viện Kiểm định Công nghệ và Môi trường"
department: "Phòng Đo lường Chất lượng"
prepared_by: "Nguyễn Văn Huy"
prepared_date: "22/04/2026"
reviewed_by: "Trần Thị Hoa"
reviewed_date: "22/04/2026"
approved_by: "Nguyễn Hoàng Giang"
approved_date: "22/04/2026"
process: ""
effective_date: "22/04/2026"
revision: "02"
status: Da-ban-hanh
keywords: [CO, CO2, SO2, NO, NO2, O3, NH3, THC, H2S, VOCs, HC, trạm quan trắc chất lượng không khí xung quanh, khí chuẩn, hiệu chuẩn]
related_documents: ["ETV.MCA.F 01.01", "ETV.MCA.F 05.01"]
iso_clause: ["ISO/IEC 17025:2017", "ISO 6145", "ISO 14956", "ISO 20988"]
legal_basis: ["ĐLVN 45:2001", "Quyết định 1292/QĐ-TCMT ngày 28/10/2013"]
ai_tags: [calibration-procedure, ambient-air-quality, gas-analyzer, aaqms, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCA 05_Tram QTCL KK xung quanh_V1.pdf`"
supersedes: "ETV.MCA 05 lần ban hành 01"
superseded_by: null
---
# PHƯƠNG TIỆN ĐO NỒNG ĐỘ KHÍ CỦA TRẠM QUAN TRẮC CHẤT LƯỢNG KHÔNG KHÍ XUNG QUANH – QUY TRÌNH HIỆU CHUẨN

*Gas analyzers of ambient air quality monitoring station – Calibration procedure*

|                   |                     |
| ----------------- | ------------------- |
| **Mã số**         | ETV.MCA 05          |
| **Lần ban hành**  | 02                  |
| **Ngày ban hành** | 22/04/2026          |
| **Biên soạn**     | Nguyễn Văn Huy      |
| **Soát xét**      | Trần Thị Hoa        |
| **Phê duyệt**     | Nguyễn Hoàng Giang  |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCA 05_Tram QTCL KK xung quanh_V1.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khi có khác biệt, bản PDF do Viện ban hành là bản có giá trị áp dụng.
>
> *Ghi chú của bản chuyển đổi:* tiêu đề chạy trang trong của bản gốc ghi "…trạm quan trắc không khí **tự động, liên tục**" trong khi trang bìa và mục 1 ghi "…trạm quan trắc **chất lượng không khí xung quanh**". Mục 9 dẫn biểu mẫu `ETV.MCA.F 01.01` còn trang Phụ lục dẫn `ETV.MCA.F 05.01` — theo số hiệu quy trình thì `F 05.01` là mã đúng. Giữ nguyên văn, cần đính chính khi ban hành lại.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian  | Nội dung thay đổi     | Lần ban hành |
| ---------- | --------------------- | ------------ |
| 22/04/2023 | Ban hành lần thứ nhất | 01           |
| 22/04/2026 | Ban hành lần thứ hai  | 02           |

---

## 1. Phạm vi áp dụng

Văn bản kỹ thuật này quy định quy trình hiệu chuẩn cho phương tiện đo (PTĐ) nồng độ khí của trạm quan trắc chất lượng không khí xung quanh có đặc trưng kỹ thuật được nêu trong Bảng 1.

**Bảng 1**

| Thông số đo               | Phạm vi đo của PTĐ (%V) | Sai số lớn nhất cho phép (%) |
| ------------------------- | ----------------------- | ---------------------------- |
| CO                        | Đến 100 × 10⁻⁴          | ± 2,0 %                      |
| CO₂                       | Đến 1,0                 | ± 2,1 %                      |
| SO₂                       | Đến 10 × 10⁻⁴           | ± 2,2 %                      |
| NO                        | Đến 10 × 10⁻⁴           | ± 2,1 %                      |
| NO₂                       | Đến 10 × 10⁻⁴           | ± 2,8 %                      |
| O₃                        | Đến 5 × 10⁻⁴            | ± 2,0 %                      |
| NH₃                       | Đến 10 × 10⁻⁴           | ± 2,8 %                      |
| THC (tính theo CH₄)       | Đến 1000 × 10⁻⁴         | ± 2,8 %                      |
| H₂S                       | Đến 10 × 10⁻⁴           | ± 2,8 %                      |
| VOCs (tính theo C₆H₆)     | Đến 1 × 10⁻⁴            | ± 2,0 %                      |
| HC (tính theo C₆H₁₄)      | Đến 100 × 10⁻⁴          | ± 2,0 %                      |

Quy trình này áp dụng đối với nhân viên của Viện Kiểm định Công nghệ và Môi trường (sau đây gọi tắt là PTN) khi hiệu chuẩn PTĐ nói trên.

## 2. Giải thích từ ngữ

Các từ ngữ trong văn bản này được hiểu như sau:

- **2.1. Phương tiện đo nồng độ khí của trạm quan trắc chất lượng không khí xung quanh (gọi tắt là PTĐ):** là phương tiện kỹ thuật để thực hiện phép đo.
- **2.2. Sai số lớn nhất cho phép (MPE):** giá trị cực trị của sai số đo, đối với giá trị đại lượng quy chiếu đã biết, cho phép bằng yêu cầu kỹ thuật hoặc các quy định đối với phép đo, phương tiện đo hoặc hệ thống đo đã cho.
- **2.3. Độ trôi:** sự thay đổi liên tục tăng lên hoặc giảm xuống của chỉ số theo thời gian, gây ra do những thay đổi trong tính chất đo lường của phương tiện đo.
- **2.4. Khí "không":** là khí nitơ tinh khiết (≥ 99,999 %V) hoặc khí được tạo bởi thiết bị tạo khí "không" có nồng độ các khí cần hiệu chuẩn nhỏ hơn giới hạn phát hiện của phương tiện đo cần hiệu chuẩn.
- **2.5. Khí NOₓ (Nitơ Oxit):** là tổng nồng độ khí NO (Nitơ monoxit) và NO₂ (Nitơ dioxit).
- **2.6. Khí chuẩn, hỗn hợp khí chuẩn:** là loại chất chuẩn được chứng nhận (thể khí) có các thành phần cần hiệu chuẩn ổn định với nồng độ xác định, thường được nén với áp suất cao trong bình kim loại.
- **2.7. Điểm "nồng độ":** là điểm khí chuẩn có giá trị nồng độ khí chuẩn pha loãng phù hợp với phạm vi đo của PTĐ.
- **2.8. Đơn vị tính:**
  - %V: phần trăm (thể tích); 1 %V = 10.000 ppmV; 1 ppmV = 1.000 ppbV;
  - mg/m³: đơn vị đo quy đổi tại nhiệt độ t °C, áp suất 101,325 kPa:

`Y (mg/m³) = ((X(ppmV) × M × 273)/(22,4 × (t + 273)))`

    - `Y`: nồng độ khí quy đổi về điều kiện nhiệt độ t °C, mg/m³;
    - `X`: nồng độ khí theo ppmV;
    - `M`: khối lượng mol phân tử của khí, g/mol.
  - 1 mg/m³ = 1.000 µg/m³.
- **Cách thức chuyển đổi:** Căn cứ vào các quy định hiện hành về đơn vị đo và điều kiện tiêu chuẩn trong các quy chuẩn kỹ thuật quốc gia về môi trường tương ứng, phải tính toán chuyển đổi đơn vị đo sang mg/m³ tại điều kiện tiêu chuẩn tương ứng. Trường hợp kết quả đo của thiết bị là ppm và điều kiện tiêu chuẩn quy định là 25 °C, 760 mmHg:

  | Chất | Hệ số chuyển đổi |
  | --- | --- |
  | CO  | ppm × 1,14 = mg/Nm³ |
  | SO₂ | ppm × 2,62 = mg/Nm³ |
  | NO₂ | ppm × 1,88 = mg/Nm³ |
  | NO  | ppm × 1,23 = mg/Nm³ |

  Đối với các PTĐ khác thì cũng được tính toán và chuyển đổi tương tự, hoặc truy cập website: `https://www.teesing.com/en/page/library/tools/ppm-mg3-converter`

## 3. Các phép hiệu chuẩn

Phải lần lượt tiến hành các phép kiểm tra ghi trong Bảng 2.

**Bảng 2.**

| TT  | Tên phép hiệu chuẩn              | Theo điều, mục của quy trình |
| --- | -------------------------------- | ---------------------------- |
| 1   | Kiểm tra bên ngoài               | 7.1                          |
| 2   | Kiểm tra kỹ thuật                | 7.2                          |
| 3   | Kiểm tra đo lường                | 7.3                          |
|     | - Kiểm tra độ trôi điểm "không"  | 7.3.2.1                      |
|     | - Kiểm tra độ trôi điểm nồng độ  | 7.3.2.2                      |
|     | - Kiểm tra độ chính xác          | 7.3.2.3                      |
|     | - Kiểm tra độ lặp lại            | 7.3.2.4                      |
|     | - Kiểm tra thời gian đáp ứng     | 7.3.2.5 [^tgdu5]             |
| 4   | Xử lý chung                      | 8                            |

[^tgdu5]: Bảng 2 liệt kê phép "Kiểm tra thời gian đáp ứng" tại mục 7.3.2.5, nhưng phần thân văn bản **không có mục 7.3.2.5** — sau 7.3.2.4 chuyển thẳng sang 7.3.3. Giữ nguyên văn, cần bổ sung hoặc đính chính khi ban hành lại.

## 4. Phương tiện phục vụ hiệu chuẩn

Phương tiện hiệu chuẩn được ghi trong Bảng 3.

**Bảng 3.**

| TT  | Phương tiện hiệu chuẩn                                       | Đặc trưng kỹ thuật                                                                                |
| --- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| 1   | **Mẫu chuẩn**                                                |                                                                                                     |
|     | Khí chuẩn cho phương tiện cần hiệu chuẩn                     | - Chọn bình khí chuẩn hoặc điểm khí chuẩn pha loãng có nồng độ bằng hoặc lớn hơn phạm vi đo lớn nhất đối với thông số quy định tại Mục 1<br>- ĐKĐB ≤ ½ phương tiện cần hiệu chuẩn |
| 2   | **Thiết bị đo liên quan**                                    |                                                                                                     |
| 2.1 | Thiết bị tạo khí Ôzôn và pha loãng khí chuẩn                 | - Lưu lượng đầu ra: tối thiểu 1 L/min<br>- Độ chính xác dòng khí: ≤ 1 % toàn thang<br>- Độ lặp lại dòng khí: ≤ 1 % toàn thang<br>- Khả năng tạo ozon: đến 5 ppmV<br>- Độ tuyến tính: ≤ 1 % toàn thang<br>- Thiết bị pha loãng chuẩn phù hợp với yêu cầu kỹ thuật đo lường đã được tổ chức, cá nhân công bố hoặc được cơ quan quản lý nhà nước về đo lường có thẩm quyền quy định áp dụng |
| 2.2 | Phương tiện đo nhiệt độ, độ ẩm môi trường                    | - Phạm vi đo nhiệt độ (0 ÷ 50) °C, độ chính xác ± 1 °C<br>- Phạm vi đo độ ẩm (25 ÷ 95) %RH, độ chính xác ± 5 %RH |
| 2.3 | Lưu lượng kế khí                                             | - Lưu lượng: đến 10 L/min<br>- Độ chính xác: ≤ 2 %                                                  |
| 3   | **Phương tiện phụ**                                          |                                                                                                     |
| 3.1 | Van điều chỉnh                                               | Áp suất P = 25 MPa; cấp chính xác 1,5                                                               |
| 3.2 | Thiết bị tạo khí "không" *(chọn 1 trong 2: 3.2 hoặc 3.3)*    | - Khí đầu ra có nồng độ các khí nhỏ hơn giới hạn phát hiện của phương tiện đo cần kiểm định         |
| 3.3 | Khí "không" *(chọn 1 trong 2: 3.2 hoặc 3.3)*                | - Theo định nghĩa tại mục 2.4                                                                       |
| 3.4 | Bình khí H₂ hoặc thiết bị tạo khí H₂ *(dành cho PTĐ khí THC)* | - Độ chính xác: 5 %                                                                                |
| 3.5 | Dụng cụ, vật tư và vật liệu                                  | - Bộ dụng cụ tháo lắp cơ khí và gá lắp chuyên dụng<br>- Van nối, ống dẫn khí, đầu chuyển đổi được chế tạo bằng vật liệu thép không gỉ, đồng hoặc nhựa teflon để không làm ảnh hưởng đến khí chuẩn và thành phần khí thuộc đối tượng cần đo<br>- Áo blouse, găng tay, khẩu trang và mặt nạ phòng độc |

## 5. Điều kiện hiệu chuẩn

Khi tiến hành hiệu chuẩn, phải đảm bảo các điều kiện sau đây:

- Nhiệt độ: (25 ± 5) °C;
- Độ ẩm tương đối: ≤ 80 %RH, không đọng sương;
- Điện áp nguồn cấp chính: 220 VAC ± 10 V;
- Có hệ thống thoát hơi, khí độc;
- Có hệ thống chống rung.

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành hiệu chuẩn phải thực hiện các công việc chuẩn bị sau đây:

- **a)** Chọn khí "không" theo quy định tại Bảng 3.
- **b)** Chọn bình khí chuẩn có nồng độ theo Bảng 4. Bình khí chuẩn đặt ổn định (không di chuyển) tối thiểu 6 giờ đối với bình có dung tích 40 lít trở xuống và tối thiểu 16 giờ đối với bình có dung tích từ 40 lít trở lên.
- **c)** PTĐ cần hiệu chuẩn phải được đặt và vận hành ổn định trong điều kiện hiệu chuẩn ít nhất 6 giờ trước khi tiến hành hiệu chuẩn.
- **d)** Bật các công tắc bên trong khu vực hiệu chuẩn gồm hệ thống điều hòa, điện, UPS, hệ thống cảnh báo khí rò rỉ, hệ thống cảnh báo khói và cháy (nếu có)…
- **e)** Khởi động các thiết bị theo tài liệu hướng dẫn sử dụng.
- **f)** Chuẩn bị các dụng cụ, vật tư sử dụng để hiệu chuẩn thiết bị.

> *Ghi chú của bản chuyển đổi:* mục 6.b dẫn "Bảng 4" nhưng bản gốc **không có Bảng 4**; nồng độ khí chuẩn được quy định tại Bảng 3 (mục 1 Mẫu chuẩn).

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

Kiểm tra bên ngoài của PTĐ cần hiệu chuẩn bằng mắt để xác định sự phù hợp theo các yêu cầu sau đây:

- Có đầy đủ nhãn, mác, nơi chế tạo hoặc tài liệu kèm theo trong đó ghi rõ đặc tính kỹ thuật về hình dáng, kích thước, điện áp nguồn, phụ tùng kèm theo.
- Thiết bị không bị biến dạng, dây dẫn, ống dẫn khí không xoắn, gẫy gập hoặc nứt hay vỡ.

### 7.2. Kiểm tra kỹ thuật

Phải kiểm tra kỹ thuật theo các yêu cầu sau đây:

Lắp ráp, đấu nối các ống dẫn khí, khí "không", thiết bị pha loãng khí chuẩn và PTĐ cần hiệu chuẩn theo sơ đồ hiệu chuẩn (Phụ lục 2).

Vận hành và kiểm tra trạng thái hoạt động bình thường của PTĐ cần hiệu chuẩn theo tài liệu hướng dẫn sử dụng.

### 7.3. Kiểm tra đo lường

PTĐ cần hiệu chuẩn được kiểm tra đo lường theo trình tự nội dung, phương pháp và yêu cầu sau:

#### 7.3.1. Đo hiệu chỉnh

**a) Hiệu chỉnh khí "không":**

- Đặt nồng độ khí "không" trên thiết bị pha loãng khí chuẩn với lưu lượng đầu ra phù hợp với lưu lượng đầu vào của PTĐ cần hiệu chuẩn.
- Đợi giá trị hiển thị của nồng độ khí "không" trên PTĐ cần hiệu chuẩn ổn định hoặc xấp xỉ bằng không. Đồng thời các giá trị được ghi lại vào biên bản.
- Tiến hành việc hiệu chỉnh khí "không" trên PTĐ cần hiệu chuẩn.

**b) Hiệu chỉnh khí có nồng độ:**

- Sau khi hiệu chỉnh xong tại điểm khí "không" trên PTĐ cần hiệu chuẩn thì đặt giá trị nồng độ trên thiết bị pha loãng khí chuẩn lần lượt tương ứng khoảng (20 ± 10) %; (50 ± 10) % và (80 ± 10) % toàn bộ phạm vi đo trên PTĐ cần hiệu chuẩn (đối với những thiết bị chuẩn tại 2 điểm thì tiến hành hiệu chuẩn tại điểm (40 ± 10) % và (80 ± 10) % toàn bộ phạm vi đo trên PTĐ).
- Đợi giá trị hiển thị nồng độ của khí chuẩn trên PTĐ cần hiệu chuẩn ổn định và xấp xỉ giá trị nồng độ đã đặt trên thiết bị pha loãng khí chuẩn. Đồng thời các giá trị được ghi lại vào biên bản.
- Tiến hành việc hiệu chỉnh khí có nồng độ trên PTĐ cần hiệu chuẩn.

#### 7.3.2. Đo kiểm tra sau khi hiệu chỉnh

PTĐ cần hiệu chuẩn sau khi hiệu chỉnh được kiểm tra đo lường theo trình tự nội dung, phương pháp và yêu cầu sau đây nhằm xác định thiết bị đảm bảo theo yêu cầu kỹ thuật của nhà sản xuất:

##### 7.3.2.1. Kiểm tra độ trôi điểm "không"

- Lựa chọn nồng độ tại điểm "không" trên thiết bị pha loãng khí chuẩn với lưu lượng đầu ra phù hợp với lưu lượng đầu vào của PTĐ cần hiệu chuẩn. Đợi cho giá trị hiển thị của khí "không" trên PTĐ cần hiệu chuẩn ổn định, bằng hoặc xấp xỉ bằng 0.
- Tiến hành đo liên tục trong vòng 6 phút và 1 phút/lần (tối thiểu 6 kết quả đo cho mỗi điểm), các giá trị được ghi lại vào biên bản.
- Thực hiện tương tự kiểm tra độ trôi điểm "không" sau 24 giờ.

##### 7.3.2.2. Kiểm tra độ trôi điểm "nồng độ"

- Tạo nồng độ khí chuẩn pha loãng có giá trị bằng (80 ± 10) % của toàn bộ phạm vi đo.
- Kiểm tra độ trôi điểm "nồng độ" của PTĐ cần hiệu chuẩn được thực hiện theo phương pháp đo 6 lần liên tiếp tại điểm nồng độ có giá trị bằng (80 ± 10) %.
- Tiến hành đo liên tục trong vòng 6 phút và 1 phút/lần (tối thiểu 6 kết quả đo cho mỗi điểm), các giá trị được ghi lại trên thiết bị tự ghi và lưu lại trên datalogger hoặc có thể ghi lại các giá trị đo được vào biên bản.
- Thực hiện tương tự kiểm tra độ trôi điểm "nồng độ" sau 24 giờ.

##### 7.3.2.3. Kiểm tra sai số

- Tạo nồng độ khí chuẩn pha loãng có giá trị bằng (20 ± 10) %; (50 ± 10) % và (80 ± 10) % của giới hạn đo cận trên của thang đo.
- Kiểm tra sai số của PTĐ được thực hiện tại 03 điểm nồng độ khí có giá trị bằng (20 ± 10) %; (50 ± 10) % và (80 ± 10) % của giới hạn đo trên.
- Tiến hành đo liên tục trong vòng 6 phút và 1 phút/lần (tối thiểu 6 kết quả đo cho mỗi điểm).
- Sai số của mỗi phép đo được tính theo công thức sau:

`δ = ((C_meas - C_ref)/C_ref) × 100`

- `δ`: sai số phép đo, %;
- `C_meas`: giá trị đo trung bình của PTĐ, %V (ppm);
- `C_ref`: giá trị trung bình của thiết bị đo nồng độ khí, %V (ppm).

##### 7.3.2.4. Kiểm tra độ lặp lại (tái lặp)

Thực hiện kiểm tra độ lặp lại (tái lặp) của PTĐ cần hiệu chuẩn theo phương pháp tiến hành 3 phép đo liên tiếp và tuần tự bằng khí chuẩn với nồng độ đã chọn và khí "không". Độ chính xác được xác định theo công thức:

`s(q̄) = (s(q_k)/√(n)) = √((1/n(n-1))Σ(k=1→n)(q_k - q̄)²)`

- `s(q̄)` là độ lệch chuẩn thực nghiệm trung bình;
- `s(q_k)` là độ lệch chuẩn thực nghiệm được dùng để ước lượng độ rộng của phân bố các giá trị trung bình;
- Ước lượng tốt nhất có thể có của các giá trị kỳ vọng của đại lượng q là trung bình số học `q̄`.

- Lựa chọn nồng độ tại điểm (50 ± 10) % toàn bộ phạm vi đo tương ứng với PTĐ cần hiệu chuẩn trên thiết bị pha loãng khí chuẩn, với lưu lượng đầu ra phù hợp với lưu lượng đầu vào của PTĐ. Đợi cho giá trị hiển thị nồng độ của khí chuẩn trên PTĐ ổn định, bằng hoặc xấp xỉ bằng giá trị nồng độ đã đặt.
- Tiến hành đo liên tục trong vòng 6 phút và 1 phút/lần (tối thiểu 6 kết quả đo cho mỗi điểm).
- Đặt và lặp lại tối thiểu 3 lần liên tiếp chương trình kiểm tra độ lặp lại trên thiết bị tạo khí chuẩn theo trình tự và thời gian sau:

```
Bắt đầu → Kiểm tra bằng khí "không" (5 phút) → Kiểm tra bằng khí chuẩn (6 phút)
          ↳ Lặp lại 3 lần liên tiếp
```

#### 7.3.3. Đánh giá độ không đảm bảo đo

```
Bắt đầu → Bước 1: Xác định đại lượng đo
        → Bước 2: Xác định các yếu tố ảnh hưởng đến ĐKĐB
        → Bước 3: Tính toán ĐKĐB của các yếu tố ảnh hưởng
        → Bước 4: Tính toán ĐKĐB kết hợp và ĐKĐB mở rộng
```

##### 7.3.3.1. Xác định đại lượng đo

Thực hiện hiệu chuẩn PTĐ bằng cách đo gián tiếp từ khí chuẩn thông qua thiết bị pha loãng khí chuẩn. Đối với mỗi bình khí chuẩn đều có giấy chứng nhận độ chính xác hoặc độ không đảm bảo đo của khí.

Ngoài ra, còn một số thiết bị cũng có ảnh hưởng đến kết quả đo như: thiết bị tạo khí "không" ảnh hưởng đến thiết bị pha loãng khí chuẩn; thiết bị ổn điện ảnh hưởng đến sự ổn định của toàn bộ hệ thống hiệu chuẩn thiết bị; thiết bị đo điều kiện môi trường gây ra các sai số trong kết quả đo giữa các lần đo khác nhau. Như vậy, cần phải xác định đại lượng ảnh hưởng đến ĐKĐB để tính toán một cách cụ thể và chính xác đối với kết quả cuối cùng.

##### 7.3.3.2. Xác định các yếu tố gây ra ĐKĐB tại tất cả các điểm hiệu chuẩn

- PTĐ cần hiệu chuẩn: đặc tính kỹ thuật do nhà sản xuất cung cấp, số liệu đo đạc lần trước, độ trôi điểm "không", độ chính xác, độ lặp lại, độ tuyến tính, thời gian đáp ứng và độ phân giải của PTĐ;
- Thiết bị pha loãng khí chuẩn: độ chính xác do nhà sản xuất cung cấp hoặc độ không đảm bảo đo do tổ chức đo lường chứng nhận;
- Điều kiện môi trường trong phòng đo/hiệu chuẩn (nhiệt độ, độ ẩm);
- Bình khí chuẩn;
- Nhân viên đo/hiệu chuẩn;
- Nguồn điện cấp vào thiết bị;
- Một số ảnh hưởng ngẫu nhiên khác.

##### 7.3.3.3. Tính toán ĐKĐB của các yếu tố ảnh hưởng

*(Đối với PTĐ khí O₃ áp dụng theo Phụ lục 2.)*

| Nguồn gây nên ĐKĐB (Budget of Uncertainty) | Loại | Công thức tính |
| --- | --- | --- |
| Độ lặp lại của thiết bị *(Reproducibility of Object)* | A | `u_A1 = s(q̄)` |
| Độ phân giải của thiết bị *(Resolution of Object)* | B | `u_B1 = ((độ phân giải)/2√(3))` |
| Độ chính xác của khí chuẩn *(Accuracy of Cylinder)* | B | `u_B2 = (u_Ref/2)` hoặc `u_B2 = ((độ chính xác)/√(3))` |
| ĐKĐB của thiết bị pha loãng *(Uncertainty of Multigas Calibrator)* | B | `u_B3 = ((độ chính xác)/√(3))` hoặc `u_B3 = (u_Ref/2)` |
| ĐKĐB do nguồn tuyến tính | B | `u_B3 = 100 · (√(s²/a²)/d)` — `s`: độ lệch theo phương trình tuyến tính; `a`: hệ số lệch; `d`: phạm vi đo của thiết bị |
| **ĐKĐB tổng hợp** *(Combined Uncertainty)* | | `u_c = √(u_A1² + u_B1² + u_B2² + u_B3²)` |
| **ĐKĐB mở rộng** *(Expanded Uncertainty)* | | `U = k · u_c` — k = 2 với mức tin cậy xấp xỉ 95 % |

## 8. Xử lý chung

- **8.1.** Phương tiện đo sau khi hiệu chuẩn được dán tem, cấp giấy chứng nhận hiệu chuẩn kèm theo kết quả hiệu chuẩn.
- **8.2.** Chu kỳ hiệu chuẩn được khuyến nghị là 01 năm.

## 9. Phụ lục

Biên bản hiệu chuẩn phương tiện đo khí tự động, liên tục — `ETV.MCA.F 05.01` *(bản gốc mục 9 ghi `ETV.MCA.F 01.01`, trang Phụ lục ghi `ETV.MCA.F 05.01`)*.

---

## TÀI LIỆU THAM KHẢO

- HORIBA User manual (APSA-370; APNA-370; APOA-370; APMA-370 và APHA-370);
- **TCVN 5976:1995 (ISO 7935:1992)** — Khí thải nguồn tĩnh – Xác định nồng độ khối lượng của lưu huỳnh dioxit (SO₂) – Đặc tính của các phương pháp đo tự động;
- **mCERTs 12/2008, Version 6** — Performance Standards for Continuous Ambient Air Quality Monitoring Systems;
- **ĐLVN 45:2001** — Máy đo hàm lượng khí - Quy trình kiểm định;
- **ISO 6145** — Phân tích khí - Điều chế hỗn hợp khí hiệu chuẩn - Phương pháp thể tích động;
- **ISO 7395** — Phân tích khí - Điều chế hỗn hợp khí hiệu chuẩn - Phương pháp khối lượng động;
- **TCVN 6502:1999 (ISO 6879:1995)** — Chất lượng không khí – Đặc tính và các khái niệm có liên quan với các phương pháp đo chất lượng không khí;
- **TCVN 6501:1999 (ISO 10849:1996)** — Sự phát thải nguồn tĩnh – Xác định nồng độ khối lượng của các nitơ oxit;
- **TCVN 6138:1996 (ISO 7996:1985)** — Không khí xung quanh – Xác định nồng độ khối lượng của các nitơ oxit – Phương pháp quang hóa học;
- **OIML/TC16/SC1/N1** — Instruments for continuous measurement of CO, NOx in stationary source emissions;
- **TCVN 8712:2011 (ISO 12039:2001)**, **TCVN 8714:2011 (ISO 25140:2010)**, **TCVN 8715 (ISO 15139)** — Phát thải nguồn tĩnh;
- **TCVN 6751:2009 (ISO 9169:2006)** — Chất lượng không khí – Định nghĩa và xác định đặc trưng tính năng của hệ thống đo tự động;
- **ISO 14956**, **ISO 20988** — Air quality – Evaluation/Guidelines to estimating measurement uncertainty;
- **Quyết định số 1292/QĐ-TCMT** ngày 28/10/2013 của Tổng cục trưởng Tổng cục Môi trường.
