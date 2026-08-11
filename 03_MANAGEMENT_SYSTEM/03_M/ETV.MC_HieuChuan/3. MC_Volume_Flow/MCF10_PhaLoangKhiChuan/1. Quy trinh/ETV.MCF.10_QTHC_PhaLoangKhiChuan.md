---
id: ETV.MCF 10
title: "Thiết bị pha loãng khí chuẩn — Quy trình hiệu chuẩn"
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
keywords: [pha loãng khí chuẩn, dynamic gas calibrator, khí không, khí span, hiệu chuẩn]
related_documents: []
iso_clause: ["ISO/IEC 17025:2017"]
legal_basis: ["ASTM D5337-11"]
ai_tags: [calibration-procedure, gas-diluter, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCF 10_Thiet bi pha loang khi chuan_V2.pdf`"
supersedes: "ETV.MCF 10 lần ban hành 01 (19/05/2020)"
superseded_by: null
---
# THIẾT BỊ PHA LOÃNG KHÍ CHUẨN – QUY TRÌNH HIỆU CHUẨN

*Dynamic Gas Calibrator – Calibration Procedure*

|                   |                     |
| ----------------- | ------------------- |
| **Mã số**         | ETV.MCF 10          |
| **Lần ban hành**  | 02                  |
| **Ngày ban hành** | 22/04/2026          |
| **Biên soạn**     | *(bản gốc để trống)* |
| **Soát xét**      | Trần Thị Hoa        |
| **Phê duyệt**     | Nguyễn Hoàng Giang  |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCF 10_Thiet bi pha loang khi chuan_V2.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khối chữ ký trên trang bìa để trống, chưa có tên người biên soạn.
>
> *Ghi chú của bản chuyển đổi:* mục 7.3.2 (đánh giá độ không đảm bảo đo) của bản gốc có nhiều công thức và ký hiệu con (subscript) không trích xuất được thành văn bản (hiển thị trống giữa các cụm từ mô tả) — bản chuyển đổi này diễn giải lại các thành phần ĐKĐB theo đúng ngữ cảnh mô tả trong bản gốc (dựa vào các hệ số a, b, d, e được nêu tên tương ứng với PTĐ lưu lượng khí pha loãng, PTĐ lưu lượng khí nguồn, khí "không", khí nguồn), sử dụng ký hiệu suy luận hợp lý (`u_Vpl`, `u_Vng`, `u_C0`, `u_Ce`) để trình bày mạch lạc, nhưng đây là diễn giải của bản chuyển đổi chứ không phải ký hiệu nguyên văn — xem bản PDF gốc để đối chiếu khi cần độ chính xác tuyệt đối. Danh mục tài liệu tham khảo ở cuối bản gốc cũng bị mất mục 1 và 2 (nội dung bắt đầu giữa câu "...caison and Carroll S. Brickenkamp..." — rõ ràng là phần đầu của tài liệu tham khảo NIST Handbook 150-2G đã bị cắt mất, có thể do lỗi khi xuất file PDF gốc).

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian  | Nội dung thay đổi     | Lần ban hành |
| ---------- | ---------------------- | ------------ |
| 19/05/2020 | Ban hành lần thứ nhất  | 01           |
| 22/04/2026 | Ban hành lần thứ hai   | 02           |

---

## 1. Phạm vi và đối tượng áp dụng

Văn bản kỹ thuật này quy định quy trình hiệu chuẩn lưu lượng khí của bộ pha loãng khí chuẩn phạm vi đo (0 ÷ 30) L/min.

| TT  | Thông số   | Phạm vi đo              | Cấp chính xác |
| --- | ------------ | -------------------------- | ---------------- |
| 1   | Lưu lượng    | Đến 30 L/min                | ± 2,4 %           |
| 2   | SO2          | (0 ÷ 13.100) mg/m³           |                   |
| 3   | NOx          | (0 ÷ 6.150) mg/m³             |                   |
| 4   | CO           | (0 ÷ 11.450) mg/m³            | ± 5 %             |
| 5   | CO2          | (0 ÷ 20) % Vol                |                   |
| 6   | O2           | (0 ÷ 25) % Vol                 |                   |

Văn bản này áp dụng đối với nhân viên của Viện Kiểm định Công nghệ và Môi trường (sau đây gọi tắt là PTN) khi hiệu chuẩn thiết bị nói trên.

## 2. Thuật ngữ, định nghĩa và ký hiệu

### 2.1. Thuật ngữ, định nghĩa

Các thuật ngữ và định nghĩa trong văn bản này được hiểu như sau:

1. **Lưu lượng khí:** là lượng chất khí chảy qua thiết bị trong một khoảng thời gian.
2. **Bộ pha loãng khí chuẩn (BPLKC):** là thiết bị có khả năng pha loãng khí thành khí có nồng độ mong muốn theo nguyên lý pha khí với khí "không". BPLKC gồm 2 dòng khí: khí "không" và khí nồng độ (khí span).
3. **Khí "không":** là khí Nitơ kỹ thuật tinh khiết hoặc khí không chứa các thành phần khí thuộc đối tượng cần đo.
4. **Hiệu chuẩn:** là hoạt động xác định, thiết lập mối quan hệ giữa giá trị đo của chuẩn đo lường, phương tiện đo với giá trị đo của đại lượng cần đo.
5. **Độ không đảm bảo đo (ĐKĐB):** thông số gắn với kết quả của phép đo, đặc trưng cho sự phân tán của các giá trị có thể quy cho đại lượng đo một cách hợp lý.
6. **Đơn vị tính:** L/min.

### 2.2. Ký hiệu

| Ký hiệu | Chi tiết                                                 | Đơn vị |
| -------- | ----------------------------------------------------------- | ------ |
| Ttb      | Nhiệt độ đo tại thiết bị                                     | K      |
| Ptb      | Áp suất đo tại thiết bị                                      | hPa    |
| Vtb      | Lưu lượng hiển thị của thiết bị                              | L/min  |
| Vc       | Lưu lượng đo của chuẩn chuyển về cùng điều kiện đo của thiết bị | L/min |
| T0       | Nhiệt độ đo tại chuẩn                                        | K      |
| P0       | Áp suất đo tại chuẩn                                         | hPa    |
| V0       | Lưu lượng hiển thị của chuẩn                                 | L/min  |

## 3. Các phép hiệu chuẩn

Phải lần lượt tiến hành các phép hiệu chuẩn như trong Bảng 1.

**Bảng 1**

| TT  | Tên phép hiệu chuẩn             | Theo điều mục của quy trình |
| --- | ---------------------------------- | -------------------------------- |
| 1   | Kiểm tra bên ngoài                 | 7.1                               |
| 2   | Kiểm tra kỹ thuật                  | 7.2                               |
| 3   | Kiểm tra đo lường — tiến hành hiệu chuẩn | 7.3.1                     |
| 4   | Đánh giá độ không đảm bảo đo       | 7.3.2                             |

## 4. Phương tiện phục vụ hiệu chuẩn

Phương tiện hiệu chuẩn được ghi trong Bảng 2.

**Bảng 2**

| TT  | Phương tiện hiệu chuẩn                                       | Đặc trưng kỹ thuật                                                                                                            |
| --- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Chuẩn đo lường**                                                    |                                                                                                                                        |
| 1.1 | Chuẩn lưu lượng thấp                                                  | Phạm vi lưu lượng: (0 ÷ 10.000) mL/min; độ không đảm bảo đo nhỏ hơn 1/2 sai số cho phép của đối tượng đo; liên kết chuẩn với cấp cao hơn và có giấy chứng nhận kèm theo |
| 1.2 | Chuẩn lưu lượng thấp                                                  | Phạm vi đo: (0 ÷ 10.000) mL/min; độ không đảm bảo đo nhỏ hơn 1/2 sai số cho phép của đối tượng đo; liên kết chuẩn với cấp cao hơn và có giấy chứng nhận kèm theo |
| 1.3 | Chuẩn lưu lượng trung bình                                            | Phạm vi đo: (2 ÷ 30) L/min; độ không đảm bảo đo nhỏ hơn 1/2 sai số cho phép của đối tượng đo; liên kết chuẩn với cấp cao hơn và có giấy chứng nhận kèm theo |
| 1.4 | Khí chuẩn                                                             | Chọn bình khí chuẩn hoặc điểm khí chuẩn pha loãng có nồng độ bằng hoặc lớn hơn phạm vi đo lớn nhất đối với thông số quy định tại mục 1; ĐKĐB ≤ 2 % |
| 2   | **Phương tiện phụ**                                                    |                                                                                                                                        |
| 2.1 | Bơm nén khí                                                            | Dung tích bình chứa: 500 L                                                                                                             |
| 2.2 | Bình khí Nitơ                                                          | Độ tinh khiết: 99,999 %                                                                                                                |
| 2.3 | Thiết bị đo nhiệt độ, áp suất chuẩn                                    | Dải đo: Áp suất (10 ÷ 1100) hPa, độ chính xác ± 2,0 hPa; Nhiệt độ (0 ÷ 50) °C, độ chính xác ± 0,8 °C                                   |
| 2.4 | Thiết bị đo nhiệt độ, độ ẩm môi trường                                 | Dải đo: Nhiệt độ (0 ÷ 50) °C, độ chính xác ± 2 °C; Độ ẩm (15 ÷ 95) %RH, độ chính xác ± 5 %RH                                          |
| 2.5 | Hệ thống chuẩn phân tích nồng độ khí SO2, CO2, CO, NOx, O2, HC          | Phạm vi đo: SO2 (0 ÷ 13.100) mg/m³; CO2 (0 ÷ 20) %Vol; CO (0 ÷ 1) %Vol; NOx (0 ÷ 6.150) mg/m³; O2 (0 ÷ 21) %Vol; độ không đảm bảo đo ± 2,5 % |
| 3   | **Phương tiện khác**                                                   |                                                                                                                                        |
| 3.1 | Dụng cụ bảo hộ                                                         | Áo blu, khẩu trang, găng tay                                                                                                           |

## 5. Điều kiện hiệu chuẩn

Khi tiến hành hiệu chuẩn, phải đảm bảo các điều kiện sau:

- Nhiệt độ: 25 ± 5 °C;
- Trong quá trình hiệu chuẩn, nhiệt độ dòng khí không được thay đổi quá 2 °C trong một giờ;
- Độ ẩm tương đối: (40 ÷ 70) %RH.

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành hiệu chuẩn phải thực hiện các công việc sau đây:

- **a)** Chọn thiết bị chuẩn lưu lượng theo các yêu cầu tại mục 1 Bảng 2;
- **b)** Bộ pha loãng khí cần hiệu chuẩn phải được đặt trong phòng đạt điều kiện hiệu chuẩn ít nhất 30 phút trước khi tiến hành hiệu chuẩn;
- **c)** Kết nối đầu ra của BPLKC với thiết bị chuẩn lưu lượng;
- **d)** Bật công tắc nguồn nuôi của thiết bị chuẩn lưu lượng để kiểm tra tín hiệu;
- **e)** Bật công tắc nguồn nuôi của BPLKC cần hiệu chuẩn theo tài liệu hướng dẫn sử dụng;
- **f)** Kiểm tra độ kín của các đầu nối thiết bị với chuẩn:
  - Bịt đầu vào của chuẩn bằng màng cao su hoặc phương tiện khác thích hợp;
  - Đặt lưu lượng tại điểm (50 ± 10) % giá trị toàn thang đo trên BPLKC và theo dõi giá trị hiển thị tại thiết bị. Nếu giá trị bằng không, các đầu nối thiết bị kín. Nếu giá trị đọc khác không thì cần kiểm tra lại các đầu nối để loại bỏ các khe hở;
  - Sau khi kiểm tra độ kín của các đầu nối, tháo các màng bịt đầu vào của chuẩn, tiếp tục tiến hành các bước tiếp theo;
- **g)** Chuẩn bị các dụng cụ bảo hộ lao động.

## 7. Tiến hành hiệu chuẩn

Phần này bao gồm các mục sau đây: kiểm tra bên ngoài; kiểm tra kỹ thuật; kiểm tra đo lường.

### 7.1. Kiểm tra bên ngoài

Phải kiểm tra bên ngoài theo các yêu cầu sau đây:

- Kiểm tra nhãn mác: thiết bị cần kiểm định phải có ký hiệu chiều lưu lượng, có nhãn mác ghi rõ xuất xứ, số hiệu sản phẩm (Serial);
- Kiểm tra bằng mắt để xác định sự phù hợp của thiết bị cần hiệu chuẩn đối với các yêu cầu quy định trong tài liệu kỹ thuật, hình dáng kích thước, hiển thị, tài liệu và phụ kiện kèm theo.

### 7.2. Kiểm tra kỹ thuật

Phải kiểm tra kỹ thuật theo các yêu cầu sau đây: kiểm tra trạng thái hoạt động bình thường của thiết bị cần hiệu chuẩn theo hướng dẫn sử dụng.

### 7.3. Kiểm tra đo lường

PTĐ được kiểm tra đo lường theo trình tự nội dung, phương pháp và yêu cầu sau đây:

#### 7.3.1. Tiến hành hiệu chuẩn

##### 7.3.1.1. Hiệu chuẩn dòng khí không

- Đặt lưu lượng dòng khí "không" trên BPLKC cần hiệu chuẩn về (20 ± 10) % giá trị của thang đo và đợi giá trị chỉ thị của PTĐ ổn định. Đọc giá trị hiển thị nhiệt độ, áp suất, lưu lượng trên PTĐ và chuẩn đo lường;
- Tiến hành thực hiện 6 phép đo liên tiếp, sau mỗi phép đo tắt BPLKC để lưu lượng về không trước khi thực hiện phép đo kế tiếp, ghi lại kết quả 6 phép đo vào biên bản Phụ lục 1;
- Thực hiện tương tự các phép đo với giá trị lưu lượng của BPLKC tại (50 ± 10) % và (80 ± 10) % giá trị thang đo, chờ giá trị chỉ thị trên BPLKC ổn định, ghi kết quả đo được vào biên bản Phụ lục I;
- Trong trường hợp khách hàng yêu cầu PTN hiệu chuẩn tại các điểm cố định thì PTN tiến hành hiệu chuẩn PTĐ theo yêu cầu của khách hàng.

##### 7.3.1.2. Hiệu chuẩn dòng khí nồng độ

Trình tự tiến hành tương tự như hiệu chuẩn đối với dòng khí không.

##### 7.3.1.3. Hiệu chuẩn nồng độ khí

- Sử dụng hệ thống chuẩn phân tích nồng độ khí để xác định trực tiếp giá trị nồng độ khí từ thiết bị pha loãng khí chuẩn;
- Tiến hành đo lặp lại tối thiểu 10 lần liên tiếp và ghi kết quả vào biên bản Phụ lục I.

#### 7.3.2. Đánh giá độ không đảm bảo đo

**a) Các yếu tố gây ra ĐKĐB bao gồm:**

- Chuẩn đo lường;
- PTĐ lưu lượng cần hiệu chuẩn: đặc tính kỹ thuật do nhà sản xuất cung cấp, số liệu đo đạc lần trước;
- Điều kiện môi trường trong phòng đo/hiệu chuẩn (nhiệt độ, độ ẩm, áp suất);
- Nhân viên đo/hiệu chuẩn;
- Thiết bị đo nhiệt độ, áp suất chuẩn;
- Thiết bị đo độ dài;
- Một số ảnh hưởng ngẫu nhiên khác.

**b) Tính toán ĐKĐB đo của các yếu tố ảnh hưởng tại tất cả các điểm hiệu chuẩn**

Độ không đảm bảo của khí pha loãng được tính toán dựa trên sự phân tích các nguồn gây nên sai số như: khí nguồn, khí zero ("khí không"); PTĐ lưu lượng khí nguồn; PTĐ lưu lượng khí pha loãng; PTĐ nhiệt độ và áp suất; nguồn điện cấp vào thiết bị; một số ảnh hưởng ngẫu nhiên khác.

Do bộ điều chỉnh lưu lượng của T750 sử dụng MFC để kiểm soát áp suất của hệ thống trong điều kiện hoạt động và thực hiện tại điều kiện nhiệt độ bình thường, nhiệt độ không đổi nên có thể bỏ qua ảnh hưởng của nhiệt độ, áp suất.

Từ phương trình tổng quát (nồng độ mol của khí pha loãng), sai số trong nồng độ mol của khí pha loãng i có thể được ước lượng từ sai số của mỗi biến số liên quan.

Đầu tiên, độ không đảm bảo đo tiêu chuẩn của các giá trị đầu vào được tính toán dựa trên phương sai của phân bố. Sau đó, độ không đảm bảo đo chuẩn của kết quả, thu được bằng cách sử dụng độ không đảm bảo đo thành phần và hệ số tương quan. Cuối cùng, độ không đảm bảo đo chuẩn tổng hợp của kết quả được tính từ các hệ số đóng góp vào độ không đảm bảo đo và các hệ số nhạy tương ứng.

**a) ĐKĐB gây ra bởi PTĐ lưu lượng khí pha loãng (u_Vpl) và hệ số nhạy**

ĐKĐB thành phần `u_Vpl1` do độ tản mạn của kết quả đo lưu lượng khí pha loãng:

$$
u_{Vpl1} = \sqrt{\frac{S^2}{n}} = \frac{S}{\sqrt{n}} = \frac{\sum_1^n (V_i - \bar{V})}{\sqrt{n(n-1)}}
$$

Với `S` được tính theo công thức độ lệch chuẩn thực nghiệm chuẩn. Trong đó: `S`: độ lệch chuẩn lưu lượng khí pha loãng, L/min; `n`: số lần đo; `V_i`: lưu lượng khí pha loãng đo được tại lần cân lặp thứ i, L/min; `V̄`: giá trị trung bình lưu lượng khí pha loãng sau n lần, L/min.

ĐKĐB thành phần `u_Vpl2` được lấy từ giấy chứng nhận hiệu chuẩn của PTĐ lưu lượng khí pha loãng:

$$
u_{Vpl2} = \frac{a}{2}
$$

Trong đó: `u_Vpl2`: ĐKĐB của PTĐ lưu lượng khí pha loãng, L/min; `a`: ĐKĐB của PTĐ lưu lượng khí pha loãng được lấy từ giấy chứng nhận hiệu chuẩn, L/min.

**b) ĐKĐB gây ra bởi PTĐ lưu lượng khí nguồn (u_Vng) và hệ số nhạy**

ĐKĐB thành phần `u_Vng1` do độ tản mạn của kết quả đo lưu lượng khí nguồn: tính tương tự như `u_Vpl1`, với `S`: độ lệch chuẩn lưu lượng khí nguồn, L/min; `n`: số lần đo; `V_i`: lưu lượng khí nguồn đo được tại lần cân lặp thứ i, L/min; `V̄`: giá trị trung bình lưu lượng khí nguồn sau n lần, L/min.

ĐKĐB thành phần `u_Vng2` được lấy từ giấy chứng nhận hiệu chuẩn của PTĐ lưu lượng khí nguồn:

$$
u_{Vng2} = \frac{b}{2}
$$

Trong đó: `u_Vng2`: ĐKĐB của PTĐ lưu lượng khí nguồn, L/min; `b`: ĐKĐB của PTĐ lưu lượng khí nguồn được lấy từ giấy chứng nhận hiệu chuẩn, L/min.

**c) ĐKĐB đo nồng độ khí pha loãng "khí không" (u_C0) và hệ số nhạy**

$$
u_{C0} = \frac{d}{2}
$$

Trong đó: `d`: ĐKĐB của khí pha loãng "khí không" được lấy từ giấy chứng nhận hiệu chuẩn, mg/m³.

**d) ĐKĐB đo nồng độ khí nguồn (u_Ce) và hệ số nhạy**

$$
u_{Ce} = \frac{e}{2}
$$

Trong đó: `e`: ĐKĐB của khí nguồn được lấy từ giấy chứng nhận hiệu chuẩn, mg/m³.

**ĐKĐB tổng hợp:** tổ hợp từ các thành phần `u_Vpl`, `u_Vng`, `u_C0`, `u_Ce` với hệ số nhạy tương ứng theo công thức căn bậc hai của tổng bình phương.

Khí không có nồng độ ngưỡng phát hiện ≈ 0 nên `u_C0` và hệ số nhạy tương ứng có thể bỏ qua trong phương trình tổng quát cuối cùng.

**ĐKĐB mở rộng:** ĐKĐBĐ mở rộng được xác định cho mỗi điểm lưu lượng hiệu chuẩn theo công thức:

$$
U = k \times u_C
$$

Với k là hệ số bao phủ, hệ số bằng số được sử dụng như là bội của ĐKĐB chuẩn kết hợp để đưa ra độ KĐBĐ mở rộng, thường được chọn k = 2 với mức tin cậy 95 %.

## 8. Xử lý chung

- **8.1.** Phương tiện đo sau khi hiệu chuẩn được dán tem, cấp giấy chứng nhận hiệu chuẩn kèm theo kết quả hiệu chuẩn.
- **8.2.** Chu kỳ hiệu chuẩn được khuyến nghị là 01 năm.

## 9. Phụ lục

Biên bản hiệu chuẩn phương tiện đo (`ETV.MCF.F 10.01`).

## TÀI LIỆU THAM KHẢO

*(Nguyên văn bản gốc — hai mục đầu của danh mục tham khảo bị mất trong bản PDF gốc, nội dung trích xuất bắt đầu giữa câu; xem ghi chú ở đầu tài liệu.)*

1. *(nội dung bị mất trong bản gốc)*
2. C. Douglas Faison and Carroll S. Brickenkamp (2004), "NIST Handbook 150-2G Calibration Laboratories Technical Guide for Mechanical Measurements".
3. Casella USA (2005), "APEX SERIES PERSONAL AIR SAMPLING PUMPS & PUMPMANAGER SOFTWARE".
4. ASTM D5337-11, "Standard Practice for Flow Rate for Calibration of Personal Sampling Pumps".
