---
id: ETV.MVA 01
title: "Phương tiện đo nồng độ khí của trạm quan trắc không khí tự động, liên tục — Quy trình kiểm định"
type: Quy-trinh
owner: "Viện Kiểm định Công nghệ và Môi trường"
department: "Phòng Đo lường Chất lượng"
prepared_by: "Nguyễn Ngọc Tuấn"
prepared_date: "19/05/2020"
reviewed_by: "Nguyễn Chu Anh Tuấn"
reviewed_date: "19/05/2020"
approved_by: "Nguyễn Hoàng Giang"
approved_date: "19/05/2020"
process: ""
effective_date: "19/05/2020"
revision: "01"
status: Da-phe-duyet
keywords: [ETV.MVA 01, kiểm định, nồng độ khí, trạm quan trắc tự động liên tục, AQMS, độ trôi, thời gian đáp ứng]
related_documents: ["ETV.MVA.F 01.01", "ETV.MVA 02", "ĐLVN 265:2016", "ĐLVN 333:2016"]
iso_clause: ["ISO/IEC 17025:2017"]
legal_basis: ["ĐLVN 113:2003", "ĐLVN 265:2016", "ĐLVN 333:2016"]
ai_tags: [verification-procedure, gas-analyzer, continuous-monitoring, aqms, drift, response-time]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi từ `ETV.MVA 01_Khi AQMS.pdf`"
supersedes: null
superseded_by: null
---
# PHƯƠNG TIỆN ĐO NỒNG ĐỘ KHÍ CỦA TRẠM QUAN TRẮC KHÔNG KHÍ TỰ ĐỘNG, LIÊN TỤC – QUY TRÌNH KIỂM ĐỊNH

*Continuous gas analyzers monitoring systems – Verification procedure*

|                   |                                     |
| ----------------- | ----------------------------------- |
| **Mã số**         | ETV.MVA 01                          |
| **Lần ban hành**  | 01                                  |
| **Ngày ban hành** | 19/05/2020                          |
| **Biên soạn**     | Nguyễn Ngọc Tuấn                    |
| **Soát xét**      | Nguyễn Chu Anh Tuấn                 |
| **Phê duyệt**     | Nguyễn Hoàng Giang                  |

> Bản chuyển đổi định dạng (PDF → Markdown) do AI thực hiện từ file gốc `ETV.MVA 01_Khi AQMS.pdf`, phục vụ tra cứu trên ManLab. Không lưu bản `.pdf`/`.docx` gốc trong repo. Xem mục *Ghi chú chuyển đổi* ở cuối về các sai khác đã phát hiện trong bản gốc.

## Những thay đổi đã có

| Thời gian | Nội dung thay đổi | Lần ban hành |
|---|---|---|
| 19/05/2020 | Ban hành lần thứ nhất | 01 |

---

## 1. Phạm vi áp dụng

Văn bản kỹ thuật này quy định quy trình kiểm định cho phương tiện đo (PTĐ) khí của trạm quan trắc không khí tự động liên tục đối với một số thông số có phạm vi đo và sai số lớn nhất cho phép như bảng sau.

| TT | Phương tiện đo | Phạm vi áp dụng của quy trình | Sai số cho phép |
|---|---|---|---|
| 1 | CO | Đến 100 × 10⁻⁴ hoặc (0 ÷ 1) %V; (0 ÷ 11.450) mg/m³ | đến ± 5 % |
| 2 | SO₂ | Đến 10 × 10⁻⁴ hoặc (0 ÷ 5.000) ppm; (0 ÷ 13.100) mg/m³ | đến ± 5 % |
| 3 | NO | Đến 10 × 10⁻⁴ hoặc (0 ÷ 5.000) ppm; (0 ÷ 6.150) mg/m³ | đến ± 5 % |
| 4 | NO₂ | Đến 10 × 10⁻⁴ hoặc (0 ÷ 1.000) ppm; (0 ÷ 2.680) mg/m³ | đến ± 5 % |
| 5 | O₃ | Đến 5 × 10⁻⁴ hoặc (0 ÷ 10) ppm; (0 ÷ 19,6) mg/m³ | đến ± 5 % |
| 6 | NH₃ | Đến 10 × 10⁻⁴ hoặc (0 ÷ 1.000) ppm; (0 ÷ 759) mg/m³ | đến ± 5 % |
| 7 | THC (tính theo CH₄) | Đến 100 × 10⁻⁴ hoặc (0 ÷ 1) %V | đến ± 5 % |
| 8 | H₂S | Đến 10 × 10⁻⁴ hoặc (0 ÷ 1.000) ppm; (0 ÷ 1.517) mg/m³ | đến ± 5 % |
| 9 | VOCs (tính theo C₆H₆) | Đến 1 × 10⁻⁴ | đến ± 5 % |
| 10 | Benzen | (0 ÷ 15) mg/m³ | đến ± 5 % |
| 11 | Ethyl Benzene | (0 ÷ 2400) mg/m³ | đến ± 5 % |
| 12 | o-Xylene | (0 ÷ 2400) mg/m³ | đến ± 5 % |
| 13 | Toluene | (0 ÷ 2000) mg/m³ | đến ± 5 % |
| 14 | CO₂ | (0 ÷ 20) %V | đến ± 5 % |
| 15 | O₂ | (0 ÷ 25) %V | đến ± 5 % |

Quy trình này áp dụng đối với nhân viên của Viện Kiểm định Công nghệ và Môi trường (sau đây gọi tắt là PTN) khi kiểm định phương tiện đo nói trên.

> **Ghi chú:** Việc lựa chọn thực hiện kiểm định các thiết bị của trạm quan trắc không khí tự động, liên tục (xung quanh và khí thải) theo `ETV.MVA 01` hoặc `ETV.MVA 02` phụ thuộc thông tin công bố đặc tính kỹ thuật của thiết bị mà hãng công bố và đã được thống nhất với nhân viên của PTN trong quá trình trao đổi, làm rõ và thống nhất trước khi tiến hành kiểm định.

## 2. Giải thích từ ngữ

Các từ ngữ trong văn bản này được hiểu như sau:

**2.1 Phương tiện đo nồng độ khí của trạm quan trắc không khí tự động liên tục (gọi tắt là PTĐ):** là phương tiện kỹ thuật để thực hiện phép đo nồng độ khí của trạm quan trắc môi trường không khí xung quanh tự động, liên tục hoặc các phương tiện đo nồng độ khí của trạm quan trắc khí thải tự động, liên tục.

**2.2 Sai số lớn nhất cho phép (MPE):** giá trị cực trị của sai số đo, đối với giá trị đại lượng quy chiếu đã biết, cho phép bằng yêu cầu kỹ thuật hoặc các quy định đối với phép đo, phương tiện đo hoặc hệ thống đo đã cho.

**2.3 Độ trôi:** sự thay đổi liên tục tăng lên hoặc giảm xuống của chỉ số theo thời gian, gây ra do những thay đổi trong tính chất đo lường của phương tiện đo.

**2.4 Khí “không”:** là khí có nồng độ cần kiểm định nhỏ hơn giới hạn phát hiện của phương tiện đo.

**2.5 Khí chuẩn, hỗn hợp khí chuẩn:** là loại chất chuẩn được chứng nhận (thể khí) có các thành phần cần kiểm định ổn định với nồng độ xác định, thường được nén với áp suất cao trong bình kim loại.

**2.6 Đơn vị tính:**
- mg/m³
- %V: Phần trăm (thể tích)
- ppm: Phần triệu (thể tích)
- ppb: Phần tỷ (thể tích)

## 3. Các phép kiểm định

Phải lần lượt tiến hành các phép kiểm tra ghi trong bảng 1.

**Bảng 1**

| TT | Tên phép kiểm định | Theo điều, mục của quy trình |
|---|---|---|
| 1 | Kiểm tra bên ngoài | 7.1 |
| 2 | Kiểm tra kỹ thuật | 7.2 |
| 3 | Kiểm tra đo lường | 7.3 |
| | – Kiểm tra độ trôi điểm “0” | 7.3.1 |
| | – Kiểm tra độ trôi điểm “nồng độ” | 7.3.2 |
| | – Kiểm tra sai số | 7.3.3 |
| | – Kiểm tra lặp lại | 7.3.4 |
| | – Kiểm tra thời gian đáp ứng | 7.3.5 |

> **Lưu ý đối chiếu (không sửa bản gốc):** thân bài mục 7.3 của bản gốc đánh số các tiểu mục là **7.3.2.1 … 7.3.2.5**, lệch với bảng 1 (7.3.1 … 7.3.5). Bản chuyển đổi giữ nguyên cả hai cách đánh số của bản gốc; khi trích dẫn, dùng số hiệu ở bảng 1.

## 4. Phương tiện phục vụ kiểm định

Phương tiện kiểm định được ghi trong bảng 2.

**Bảng 2**

| TT | Tên phương tiện kiểm định | Đặc trưng kỹ thuật đo lường cơ bản |
|---|---|---|
| **1** | **Chuẩn đo lường** | |
| 1.1 | Khí chuẩn | – Chọn 01 bình khí chuẩn hoặc điểm khí chuẩn pha loãng có nồng độ bằng hoặc lớn hơn phạm vi đo lớn nhất đối với từng thông số quy định tại Mục 1.<br>– ĐKĐB ≤ ½ phương tiện cần hiệu chuẩn |
| **2** | **Phương tiện khác** | |
| 2.1 | Khí “không” | Theo TCVN 3286 hoặc không khí sạch chứa các thành phần khí nhỏ hơn giới hạn phát hiện mà phương tiện đo có thể đo được |
| 2.2 | Thiết bị pha loãng khí chuẩn cho PTĐ khí | – Lưu lượng đầu ra (0,08 ÷ 5) L/min;<br>– Có khả năng tạo ra O₃ tối đa: 10 ppm (19 mg/m³);<br>– Tỷ lệ pha trộn khí chuẩn/khí “không” là 1/5 ÷ 1/1000 |
| 2.3 | Bộ điều chỉnh lưu lượng khí | – Lưu lượng đầu ra: (0,5 ÷ 5) L/min;<br>– Độ chính xác: 2 % |
| 2.4 | Phương tiện đo nhiệt độ, độ ẩm môi trường | – Nhiệt độ: (5 ÷ 50) °C, giá trị độ chia 1 °C;<br>– Độ ẩm: (25 ÷ 95) %RH, giá trị độ chia 1 %RH |
| **3** | **Phương tiện phụ** | |
| 3.1 | Baromet | – Phạm vi đo: (850 ÷ 1150) hPa;<br>– Giá trị độ chia: 0,1 hPa |
| 3.2 | Van nối, ống dẫn khí, đầu chuyển đổi | Được chế tạo bằng vật liệu thép không gỉ, đồng hoặc nhựa teflon để không làm ảnh hưởng đến khí chuẩn và thành phần khí thuộc đối tượng cần đo |
| 3.3 | Dung dịch kiểm tra rò khí đường ống | *(bản gốc để trống)* |

## 5. Điều kiện kiểm định

Khi tiến hành kiểm định, phải đảm bảo các điều kiện sau đây:

**5.1. Điều kiện kiểm định**
- Nhiệt độ: (25 ± 5) °C;
- Độ ẩm không khí: ≤ 80 %RH;
- Điện áp nguồn cấp chính: 220 VAC.

**5.2. Điều kiện an toàn**
- Có hệ thống nối đất an toàn;
- Có hệ thống thông gió / thoát khí đảm bảo an toàn;
- Không có các loại hơi, các loại khí có khả năng ăn mòn cũng như các chất dễ gây cháy, nổ.

## 6. Chuẩn bị kiểm định

Trước khi tiến hành kiểm định phải thực hiện các công việc chuẩn bị sau đây:

- **a.** Lựa chọn giá trị nồng độ khí chuẩn phù hợp theo Bảng 2.
- **b.** Đặt bình chịu áp lực chứa khí chuẩn trong phòng đạt điều kiện kiểm định không ít hơn 1 giờ đối với bình có dung tích nhỏ hơn 40 lít và không ít hơn 6 giờ đối với bình có dung tích từ 40 lít trở lên.
- **c.** Thiết bị cần kiểm định phải được duy trì ít nhất là 30 phút.
- **d.** Khởi động thiết bị pha loãng khí chuẩn, thiết bị tạo ozone.
- **e.** Kiểm tra kết nối của van, áp kế trên đường ống kết nối từ các bình khí chuẩn đến PTĐ đảm bảo kín, khít, không rò rỉ và lưu lượng khí đầu vào phù hợp với yêu cầu quy định của nhà sản xuất PTĐ.

## 7. Tiến hành kiểm định

### 7.1. Kiểm tra bên ngoài

Phải kiểm tra bên ngoài theo các yêu cầu sau đây:

Kiểm tra bằng mắt để xác định sự phù hợp của PTĐ với các yêu cầu quy định trong tài liệu kỹ thuật về hình dáng, kích thước, hiển thị, nguồn điện sử dụng, nhãn hiệu và phụ kiện kèm theo.

### 7.2. Kiểm tra kỹ thuật

Phải kiểm tra kỹ thuật theo các yêu cầu sau đây:

Kiểm tra cơ cấu chỉnh, trạng thái hoạt động bình thường của PTĐ theo tài liệu kỹ thuật của nhà sản xuất.

### 7.3. Kiểm tra đo lường

PTĐ nồng độ khí được kiểm tra đo lường theo trình tự nội dung, phương pháp và yêu cầu sau:

#### 7.3.1 *(bản gốc: 7.3.2.1)* Kiểm tra độ trôi điểm “không”

- Lựa chọn nồng độ tại điểm “không” trên thiết bị pha loãng khí chuẩn với lưu lượng đầu ra phù hợp với lưu lượng đầu vào của PTĐ khí. Đợi cho giá trị hiển thị của khí “không” trên PTĐ khí ổn định, bằng hoặc xấp xỉ bằng 0.
- Tiến hành đo liên tục trong vòng 6 phút và 1 phút/lần (tối thiểu 6 kết quả đo cho mỗi điểm), các giá trị được ghi lại vào biên bản.
- Thực hiện tương tự kiểm tra độ trôi điểm “không” sau 24 giờ.
- Độ trôi điểm “không” 24ZD không vượt quá ± 0,05 %V.

#### 7.3.2 *(bản gốc: 7.3.2.2)* Kiểm tra độ trôi điểm “nồng độ”

- Tạo nồng độ khí chuẩn pha loãng có giá trị bằng (80 ± 10) % của toàn bộ phạm vi đo.
- Kiểm tra độ trôi điểm “nồng độ” của PTĐ khí được thực hiện theo phương pháp đo 6 lần liên tiếp tại điểm nồng độ có giá trị bằng (80 ± 10) %.
- Tiến hành đo liên tục trong vòng 6 phút và 1 phút/lần (tối thiểu 6 kết quả đo cho mỗi điểm), các giá trị được ghi lại vào biên bản.
- Thực hiện tương tự kiểm tra độ trôi điểm “nồng độ” sau 24 giờ.
- Độ trôi điểm “nồng độ” 24SD không vượt quá giới hạn sai số lớn nhất cho phép.

#### 7.3.3 *(bản gốc: 7.3.2.3)* Kiểm tra sai số

- Tạo nồng độ khí chuẩn pha loãng có giá trị bằng (20 ± 10) %; (50 ± 10) % và (80 ± 10) % của giới hạn đo cận trên của thang đo.
- Kiểm tra sai số của PTĐ được thực hiện tại 03 điểm nồng độ khí có giá trị bằng (20 ± 10) %; (50 ± 10) % và (80 ± 10) % của giới hạn đo trên.
- Tiến hành đo liên tục trong vòng 6 phút và 1 phút/lần (tối thiểu 6 kết quả đo cho mỗi điểm), các giá trị được ghi lại vào biên bản.
- Sai số của mỗi phép đo được tính theo công thức sau:

$$\delta = \frac{C_{meas} - C_{ref}}{C_{ref}} \times 100$$

Trong đó:

| Ký hiệu | Ý nghĩa |
|---|---|
| $\delta$ | Sai số phép đo, % |
| $C_{meas}$ | Giá trị đo trung bình của PTĐ, %V (ppm) |
| $C_{ref}$ | Giá trị trung bình của thiết bị pha loãng, %V (ppm) |

- Sai số phép đo của PTĐ không vượt quá sai số lớn nhất cho phép.

#### 7.3.4 *(bản gốc: 7.3.2.4)* Kiểm tra độ lặp lại (tái lặp)

Thực hiện kiểm tra độ lặp lại (tái lặp) của PTĐ khí theo phương pháp tiến hành đo tối thiểu 10 lần liên tiếp. Ghi kết quả vào biên bản kiểm định.

Độ chính xác được xác định theo công thức:

$$s(\overline{q}) = \frac{s(q_k)}{\sqrt{n}} = \sqrt{\frac{1}{n(n-1)}\sum_{k=1}^{n}\left(q_k - \overline{q}\right)^2}$$

Trong đó:

| Ký hiệu | Ý nghĩa |
|---|---|
| $s(\overline{q})$ | Độ lệch chuẩn thực nghiệm trung bình |
| $s(q_k)$ | Độ lệch chuẩn thực nghiệm được dùng để ước lượng độ rộng của phân bố các giá trị trung bình |
| $\overline{q}$ | Trung bình số học — ước lượng tốt nhất có thể có của giá trị kỳ vọng của đại lượng $q$ |

- Độ lặp lại của PTĐ không vượt quá 1/3 sai số lớn nhất cho phép.

#### 7.3.5 *(bản gốc: 7.3.2.5)* Kiểm tra thời gian đáp ứng

- Tạo 01 điểm nồng độ khí “không” và nồng độ khí chuẩn pha loãng có giá trị bằng 90 % của giới hạn đo trên.
- Kiểm tra thời gian đáp ứng của PTĐ theo phương pháp đưa khí “không” vào PTĐ cần kiểm định; sau khi đạt giá trị “không” ổn định, tăng đến điểm nồng độ có giá trị bằng 90 % giá trị giới hạn đo trên của PTĐ cần kiểm định.
- Ghi thời gian lúc bắt đầu tăng nồng độ khí và thời gian khi PTĐ đạt giá trị bằng 90 % giới hạn đo vào biên bản kiểm định.
- Thời gian đáp ứng của PTĐ không vượt quá thời gian đáp ứng do hãng công bố.

## 8. Xử lý chung

**8.1.** Phương tiện đo nồng độ khí sau khi kiểm định nếu đạt các yêu cầu quy định theo quy trình kiểm định này được niêm phong cơ cấu chỉnh và cấp chứng chỉ kiểm định (tem kiểm định, dấu kiểm định, giấy chứng nhận kiểm định) theo quy định.

**8.2.** Phương tiện đo nồng độ khí sau khi kiểm định nếu không đạt một trong các yêu cầu quy định của quy trình kiểm định này thì không cấp chứng chỉ kiểm định mới và xóa dấu kiểm định cũ (nếu có).

**8.3.** Chu kỳ kiểm định của phương tiện đo nồng độ khí: 12 tháng.

## 9. Phụ lục

Biên bản kiểm định phương tiện đo nồng độ khí của trạm quan trắc không khí tự động, liên tục (`ETV.MVA.F 01.01`) — xem `2. Bieu mau/ETV.MVA.F01.01_BBKD_KhiTuDong.md`.

## Tài liệu tham khảo

- ĐLVN 113:2002 — Yêu cầu về nội dung và cách trình bày văn bản kỹ thuật Đo lường Việt Nam. *(bản gốc ghi năm 2002; văn bản thực tế là **ĐLVN 113:2003** — xem Ghi chú chuyển đổi)*
- ISO/IEC 17025:2017 — Yêu cầu chung về năng lực của phòng thử nghiệm và kiểm định.
- ĐLVN 265:2016 — Phương tiện đo nồng độ SO₂, CO₂, CO, NOₓ trong không khí – Quy trình kiểm định.
- ĐLVN 333:2017 — Phương tiện đo nồng độ SO₂, CO₂, CO, NOₓ của trạm quan trắc không khí tự động liên tục – Quy trình kiểm định. *(bản gốc ghi năm 2017; văn bản thực tế là **ĐLVN 333:2016** — xem Ghi chú chuyển đổi)*

---

## Ghi chú chuyển đổi

- Nguồn: `ETV.MVA 01_Khi AQMS.pdf` (9 trang) trong `2. QTKD/`; có kèm bản `.docx` cùng tên. Trích xuất text trực tiếp, không dùng OCR; bản gốc đọc sạch, không mất dấu tiếng Việt.
- **Đánh số mục lệch trong bản gốc:** bảng 1 ghi các phép kiểm tra ở mục 7.3.1–7.3.5, nhưng thân bài đánh số 7.3.2.1–7.3.2.5 (không có 7.3.1.x). Bản chuyển đổi ghi song song cả hai để không mất dấu vết bản gốc; đã nêu rõ trong khối lưu ý dưới bảng 1.
- **Sai số hiệu tài liệu tham khảo:** bản gốc ghi “ĐLVN 113: 2002” (thực tế là ĐLVN 113:2003) và “ĐLVN 333: 2017” (thực tế là ĐLVN 333:2016 — xem `MVA_DLVN333_KhiTuDong/` trong cùng thư mục lĩnh vực). Giữ nguyên số của bản gốc kèm chú thích, không tự sửa.
- Bản gốc bảng 2 mục 3.3 (Dung dịch kiểm tra rò khí đường ống) **để trống** cột đặc trưng kỹ thuật; giữ nguyên.
- Bản gốc bảng 2 mục 1.1 kết thúc bằng hai dấu chấm (“…cần hiệu chuẩn..”) và dùng từ “hiệu chuẩn” trong một quy trình kiểm định; bản chuyển đổi bỏ dấu chấm thừa, giữ nguyên từ ngữ.
- Bản gốc mục 8.3 viết “phương tiện độ nồng độ khí” (thiếu chữ “đo”); bản chuyển đổi ghi “phương tiện đo nồng độ khí”, không đổi nghĩa.
- Bản gốc mục 1 ghi “trong quá trao đổi”; bản chuyển đổi ghi “trong quá trình trao đổi”, không đổi nghĩa.
- **Người soát xét** của văn bản này là Nguyễn Chu Anh Tuấn theo khối chữ ký bản gốc, khác với Quản lý chất lượng hiện hành (Trần Thị Hoa) nêu tại `03_M/README.md`. Giữ theo bản gốc; khi ban hành lại cần cập nhật cho khớp.

---

*Quy trình kiểm định Phương tiện đo nồng độ khí của trạm quan trắc không khí tự động, liên tục — `ETV.MVA 01` — Lần ban hành 01, ngày 19/05/2020 — Trang tài liệu điện tử, không áp dụng đánh số trang thủ công (bản in xuất từ ManLab tự sinh header/footer).*
