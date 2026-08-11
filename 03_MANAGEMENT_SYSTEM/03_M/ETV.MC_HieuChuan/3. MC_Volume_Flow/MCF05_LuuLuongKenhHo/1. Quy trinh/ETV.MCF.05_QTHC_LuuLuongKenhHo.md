---
id: ETV.MCF 05
title: "Phương tiện đo lưu lượng kênh hở — Quy trình hiệu chuẩn"
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
keywords: [lưu lượng kênh hở, open channel flow, đập tràn thành mỏng, máng Parshall, hiệu chuẩn]
related_documents: []
iso_clause: ["ISO/IEC 17025:2017"]
legal_basis: []
ai_tags: [calibration-procedure, open-channel-flow, weir, parshall-flume, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCF 05_Luu luong kenh ho_V1.pdf`"
supersedes: "ETV.MCF 05 lần ban hành 01 (22/04/2019)"
superseded_by: null
---
# PHƯƠNG TIỆN ĐO LƯU LƯỢNG KÊNH HỞ – QUY TRÌNH HIỆU CHUẨN

*Flow Measurement Equipment in Open Channel – Calibration Procedure*

|                   |                     |
| ----------------- | ------------------- |
| **Mã số**         | ETV.MCF 05          |
| **Lần ban hành**  | 02                  |
| **Ngày ban hành** | 22/04/2026          |
| **Biên soạn**     | *(bản gốc để trống)* |
| **Soát xét**      | Trần Thị Hoa        |
| **Phê duyệt**     | Nguyễn Hoàng Giang  |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCF 05_Luu luong kenh ho_V1.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khối chữ ký trên trang bìa để trống, chưa có tên người biên soạn.
>
> *Ghi chú của bản chuyển đổi:* đây là tài liệu dài và phức tạp nhất trong lô chuyển đổi (22 trang gốc), có rất nhiều công thức toán học và hình vẽ kỹ thuật (Hình 1–9, Hình A.1–A.3, Hình B.1–B.5, các công thức từ (10) đến (26)) được trình bày dưới dạng hình ảnh nhúng trong PDF gốc — lớp văn bản trích xuất **không lấy được nội dung của các công thức và hình vẽ này** (chỉ lấy được số thứ tự công thức và đoạn văn giải thích ký hiệu xung quanh). Bản chuyển đổi này giữ nguyên toàn bộ phần văn bản trích xuất được (định nghĩa, mô tả, ký hiệu, bảng số liệu, yêu cầu kỹ thuật, phần thân công thức có trích xuất được như (1), (2), (7), (8), (9), (15), (16), (22), (24)), và đánh dấu rõ các vị trí công thức/hình ảnh không trích xuất được bằng ghi chú "*(công thức/hình vẽ là hình ảnh trong bản gốc, không trích xuất được — xem bản PDF gốc)*". Ngoài ra, chân trang các trang từ 17/22 trở đi trong bản gốc quay lại ghi "Lần BH: 01, Ngày BH: 22/04/2019" thay vì "Lần BH: 02, Ngày BH: 22/04/2026" — có thể do các trang Phụ lục B chưa được cập nhật khi ban hành lại lần 02.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian  | Nội dung thay đổi     | Lần ban hành |
| ---------- | ---------------------- | ------------ |
| 22/04/2019 | Ban hành lần thứ 1     | 01           |
| 22/04/2026 | Ban hành lần thứ 2     | 02           |

---

## 1. Phạm vi áp dụng

Quy trình này quy định quy trình kỹ thuật hiệu chuẩn các thiết bị đo lưu lượng dòng chảy kênh hở (bao gồm đập tràn thành mỏng và máng Parshall tiêu chuẩn) có cấp chính xác đến 2 %.

Quy trình này áp dụng đối với nhân viên của Viện Kiểm định Công nghệ và Môi trường (sau đây gọi tắt là PTN) khi hiệu chuẩn PTĐ nói trên.

## 2. Giải thích từ ngữ

Các từ ngữ trong văn bản này được hiểu như sau:

- Thiết bị đo lưu lượng dòng chảy kênh hở sau đây được viết tắt là LLKH.
- **Bộ phận chỉ thị** là một bộ phận của LLKH dùng để hiển thị hoặc in ra các kết quả đo được.
- **Phần tử đo mức hoặc vận tốc dòng chảy chất lỏng** là một bộ phận của LLKH, tùy theo nguyên lý đo nó có thể tiếp xúc hoặc không tiếp xúc trực tiếp với chất lỏng trong kênh hở rồi sau đó truyền thông tin về mức hoặc vận tốc cần đo tới bộ xử lý và thiết bị chỉ thị bằng phương tiện hoặc thiết bị truyền tín hiệu, sau đó dựa vào hình dạng máng hoặc đập tràn đã được cài đặt sẵn sẽ tính toán lưu lượng trong kênh hở và hiển thị trên màn hình hiển thị.
- **Đập tràn thành mỏng** là những công trình nhân tạo nhằm ngăn cản dòng chảy của chất lỏng để bắt buộc dòng chảy chất lỏng phải chảy qua nó và có chiều dày đỉnh đập, δ, thỏa mãn điều kiện 0 < δ < 0,67h.
- **Máng** là công trình nhân tạo tùy theo mục đích sử dụng thì có nhiều hình dạng khác nhau, được chế tạo nhằm mục đích thông qua mức chất lỏng đo được trên máng đó để tính toán lưu lượng của dòng chảy.
- Độ không đảm bảo đo sau đây sẽ được viết tắt là ĐKĐBĐ.

### 2.2. Các ký hiệu sử dụng trong quy trình

| Ký hiệu | Chi tiết                                                          | Đơn vị SI |
| -------- | -------------------------------------------------------------------- | --------- |
| Cd       | Hệ số xả                                                              | -         |
| C0       | Hằng số với từng kích thước của máng kiểu Parshall                   | -         |
| A        | Diện tích của kênh đầu vào của đập/máng                              | m²        |
| B        | Độ rộng của kênh đầu vào của đập/máng                                 | m         |
| b        | Độ rộng cửa tràn                                                      | m         |
| δ        | Chiều dày đỉnh đập                                                    | m         |
| g        | Gia tốc trọng trường                                                  | m/s²      |
| h        | Chiều cao cột nước tràn                                               | m         |
| p        | Chiều cao đập so với mặt đáy kênh đầu vào đập/máng                    | m         |
| α        | Góc của cửa tràn                                                      | °         |

## 3. Các phép hiệu chuẩn

Phải lần lượt tiến hành các phép kiểm tra ghi trong Bảng 1.

**Bảng 1**

| TT  | Tên phép hiệu chuẩn             | Theo điều, mục của quy trình |
| --- | ---------------------------------- | -------------------------------- |
| 1   | Kiểm tra bên ngoài                 | 7.1                               |
| 2   | Kiểm tra kỹ thuật                  | 7.2                               |
| 3   | Kiểm tra đo lường — đo, hiệu chỉnh  | 7.3.1                            |
|     | — tiến hành hiệu chuẩn              | 7.3.2                             |
| 4   | Tính toán độ không đảm bảo đo      | 7.4                               |
| 5   | Xử lý chung                        | 8                                 |

## 4. Phương tiện phục vụ hiệu chuẩn

Phương tiện hiệu chuẩn được ghi trong Bảng 2.

**Bảng 2**

| TT  | Phương tiện hiệu chuẩn                                                                    | Đặc trưng kỹ thuật                                                                                     |
| --- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| 1   | **Chuẩn đo lường** (\*)                                                                         |                                                                                                                    |
| 1.1 | Kênh hở với máng hoặc đập tràn thành mỏng đã được lắp đặt trong lòng kênh                        | Phạm vi đo mức hoặc lưu lượng: phù hợp với thiết bị đo                                                          |
| 1.2 | Thước đo độ dài để đo trực tiếp mức nước trong kênh hoặc đập tràn (thước vạch, thước cuộn, thước quả rọi,...) | Phạm vi đo: phù hợp với mức nước thiết kế trong kênh; độ không đảm bảo đo ≤ 1 % kích thước của đập tràn cần kiểm tra |
| 2   | **Phương tiện phụ**                                                                              |                                                                                                                    |
| 2.1 | Thiết bị đo nhiệt độ và độ ẩm môi trường                                                          | Dải đo: Nhiệt độ (0 ÷ 50) °C; Độ ẩm tương đối (0 ÷ 100) %RH. Độ phân giải: Nhiệt độ 1 °C; Độ ẩm 1 %RH; liên kết chuẩn với hệ thống chuẩn quốc gia |
| 3   | **Phương tiện khác**                                                                             |                                                                                                                    |
| 3.1 | Các hình trụ có đường kính khác nhau                                                             | —                                                                                                                  |

*(\*) Trường hợp cần nâng cao độ chính xác của phép hiệu chuẩn thì có thể gắn lưu lượng kế chất lỏng chuẩn phía trước hoặc sau hệ thống kênh hở.*

## 5. Điều kiện hiệu chuẩn

Khi tiến hành hiệu chuẩn phải đảm bảo các điều kiện sau:

- Nhiệt độ: (25 ± 5) °C;
- Độ ẩm tương đối: (40 ~ 80) %RH (không đọng sương);
- Địa điểm hiệu chuẩn phải sạch sẽ, thoáng, không có các chất ăn mòn hóa học, không gây rung động trong quá trình hiệu chuẩn;
- Nhằm tạo ra chiều cao cột nước tràn ổn định thì yêu cầu một đoạn kênh dẫn dòng chảy trước đập hoặc máng có chiều dài tối thiểu là 5 lần độ rộng của cửa tràn.

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành hiệu chuẩn phải thực hiện các công việc chuẩn bị sau đây:

- Đối với các LLKH có chỉ thị điện tử thì phương tiện cần hiệu chuẩn cần phải sấy máy tối thiểu 30 phút hoặc theo khuyến cáo của nhà sản xuất;
- Đoạn kênh dẫn dòng chảy phía trước đầu vào đập tràn hoặc máng phải đảm bảo không có sự lắng đọng của tạp chất hoặc cặn lắng hoặc bất kỳ vật thể dị thường nào mà có thể gây ảnh hưởng đến dòng chảy và phải đảm bảo dòng chảy qua đập tràn hoặc máng là dòng chảy tự do;
- Gắn thiết bị cần hiệu chuẩn vào vị trí đo trên hoặc trong, tùy theo nguyên lý thiết kế của thiết bị, kênh hở đã được chuẩn bị.

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

Phải kiểm tra bên ngoài theo các yêu cầu sau đây:

- **7.1.1.** Kiểm tra bản vẽ kỹ thuật: trong trường hợp khách hàng đã xây dựng đập tràn hoặc máng thì khách hàng cần cung cấp cho bên hiệu chuẩn các bản vẽ kỹ thuật và bản vẽ xây lắp (nếu có) về mặt bằng và kích thước xây dựng đập tràn hoặc máng.
- **7.1.2.** Kiểm tra nhãn mác: thiết bị cần hiệu chuẩn phải có nhãn mác ghi rõ xuất xứ, số hiệu sản phẩm (serial), năm sản xuất, phạm vi đo mức và lưu lượng, điều kiện về môi trường làm việc.
- **7.1.3.** Bộ phận chỉ thị phải đảm bảo rõ ràng và đọc được chính xác.
- **7.1.4.** Kiểm tra tài liệu và phụ kiện kèm theo: thiết bị hiệu chuẩn phải có đầy đủ tài liệu hướng dẫn sử dụng, yêu cầu về bố trí, lắp đặt và thuyết minh phương pháp đo, các phụ kiện kèm theo (nếu có).

### 7.2. Kiểm tra kỹ thuật

Phải kiểm tra kỹ thuật theo các yêu cầu sau đây:

#### 7.2.1. Kiểm tra khả năng hoạt động của hệ thống

Vận hành hệ thống để đảm bảo lưu lượng chất lỏng chảy qua thiết bị cần hiệu chuẩn và hệ thống kênh hở trong vòng 90 giây tại lưu lượng lớn nhất của hệ thống kênh hở. Hệ thống công nghệ phải đảm bảo các yêu cầu sau:

- Có khả năng cung cấp dòng chất lỏng liên tục và ổn định;
- Chất lỏng chảy qua hệ thiết bị cần hiệu chuẩn và hệ thống kênh hở không bị rò rỉ;
- Có khả năng thay đổi lưu lượng trong phạm vi lưu lượng của hệ thống kênh hở.

#### 7.2.2. Kiểm tra kỹ thuật của thiết bị

- **7.2.2.1.** Kiểm tra kỹ thuật với đập tràn thành mỏng cửa tràn hình chữ nhật: chi tiết xem trong mục A.1 của Phụ lục A.
- **7.2.2.2.** Kiểm tra kỹ thuật với đập tràn thành mỏng cửa tràn hình tam giác: chi tiết xem trong mục A.2 của Phụ lục A.
- **7.2.2.3.** Kiểm tra kỹ thuật với máng Parshall tiêu chuẩn: chi tiết xem trong mục A.3 của Phụ lục A.

### 7.3. Kiểm tra đo lường

Các thiết bị đo lưu lượng trong kênh hở được kiểm tra đo lường theo trình tự nội dung, phương pháp và yêu cầu sau đây:

#### 7.3.1. Quy định chung

- Đối với thiết bị đo mức nước trong kênh hở phải tiến hành kiểm tra tại tối thiểu 03 mức hoặc lưu lượng được phân bố tương đối đều trong phạm vi đo của thiết bị trong trường hợp phạm vi lưu lượng của chuẩn phủ được phạm vi lưu lượng của thiết bị kiểm tra và là phạm vi đo của chuẩn trong trường hợp ngược lại;
- Khi cần thiết phải tiến hành xác định mốc "0" hay mặt phẳng mốc trong việc xác định mức nước trong kênh hở.

#### 7.3.2. Quá trình đo

##### 7.3.2.1. Đối với đập tràn thành mỏng, cửa tràn hình chữ nhật

- Kiểm tra độ rộng của kênh đầu vào, B: dùng thước đo chiều dài đo lặp lại tối thiểu 3 lần chiều rộng của đoạn kênh phía trước đập tràn, cách đập tràn một khoảng tối thiểu bằng 4 lần mức nước lớn nhất của đập tràn. Giá trị của B là trung bình cộng của 3 lần đo trên;
- Kiểm tra độ rộng cửa tràn, b: dùng thước đo chiều dài đo chiều rộng của cửa tràn, b, tại 3 vị trí phân bố đều trên chiều cao cột nước tràn lớn nhất, hmax. Tại mỗi vị trí đo tiến hành đo lặp lại tối thiểu 3 lần. Giá trị của b sẽ là trung bình cộng của tất cả các lần đo trên;
- Kiểm tra chiều cao đập so với mặt đáy kênh đầu vào, p: dùng thước đo chiều dài tiến hành đo lặp lại tối thiểu 3 lần chiều cao đập so với mặt đáy kênh đầu vào, p. Giá trị của p sẽ là trung bình cộng số học của 3 lần đo trên;
- Tiến hành kiểm tra các giá trị đo được (B, b, p) theo mục A.1 của Phụ lục A.

##### 7.3.2.2. Đối với đập tràn thành mỏng, cửa tràn hình tam giác

- Kiểm tra góc α của cửa tràn:
  - Sử dụng 2 hình trụ với bán kính (R1, R2) khác nhau đã được hiệu chuẩn đặt vào trong góc α của cửa tràn sao cho 2 hình trụ đó tiếp các cạnh của cửa tràn, như Hình 1;
  - Dùng thước đo chiều dài đo lặp lại tối thiểu 3 lần khoảng cách L giữa 2 tâm của 2 hình trụ;
  - Tính toán góc α theo công thức sau:

    $$\alpha = 2 \times \arcsin\left(\frac{R_2 - R_1}{L}\right) \tag{1}$$

- Kiểm tra độ rộng của kênh đầu vào, B: dùng thước đo chiều dài đo lặp lại tối thiểu 3 lần chiều rộng của đoạn kênh phía trước đập tràn, cách đập tràn một khoảng tối thiểu bằng 4 lần mức nước lớn nhất của đập tràn. Giá trị của B là trung bình cộng của 3 lần đo trên;
- Kiểm tra chiều cao đập so với mặt đáy kênh đầu vào, p: dùng thước đo chiều dài tiến hành đo lặp lại tối thiểu 3 lần chiều cao đập so với mặt đáy kênh đầu vào, p. Giá trị của p sẽ là trung bình cộng số học của 3 lần đo trên;
- Tiến hành kiểm tra các giá trị đo được (B, b, p) theo mục A.2 của Phụ lục A.

##### 7.3.2.3. Đối với máng Parshall tiêu chuẩn

Kiểm tra độ rộng của họng thoát của máng, b: dùng thước đo chiều dài đo lặp lại tối thiểu 3 lần chiều rộng họng của máng, b. Giá trị của b là trung bình cộng của 3 lần đo trên.

#### 7.3.3. Xác định hệ số của thiết bị đo

Tại mỗi điểm lưu lượng tiến hành ghi nhận lưu lượng LLKH và tại chuẩn tối thiểu 3 lần.

Hệ số của thiết bị đo lưu lượng dòng chảy trong kênh hở tại lần đo thứ i (`MF_i`) được xác định theo công thức:

$$MF_i = \frac{Q_{stdi}}{Q_{LLKHi}} \tag{2}$$

Trong đó: `Q_stdi`: lưu lượng của chuẩn tại lần đo thứ i, m³/h; `Q_LLKHi`: lưu lượng tại LLKH tại lần đo thứ i, m³/h.

Hệ số của thiết bị đo trung bình, `M̄F`, tại lưu lượng kiểm tra được xác định theo công thức trung bình cộng của n lần đo (n ≥ 3). *(công thức là hình ảnh trong bản gốc, không trích xuất được — xem bản PDF gốc)*

### 7.4. Tính toán độ không đảm bảo đo

#### 7.4.1. Các yếu tố gây ra ĐKĐBĐ bao gồm

- PTĐ lưu lượng cần hiệu chuẩn: đặc tính kỹ thuật do nhà sản xuất cung cấp, số liệu đo đạc lần trước;
- Điều kiện môi trường hiệu chuẩn (nhiệt độ, độ ẩm);
- Sai lệch về nhiệt độ của chất lỏng;
- Nhân viên đo/hiệu chuẩn;
- Nhiệt kế;
- Một số ảnh hưởng ngẫu nhiên khác.

#### 7.4.2. Tính toán ĐKĐBĐ của các yếu tố ảnh hưởng tại tất cả các điểm hiệu chuẩn

**Độ không đảm bảo đo tổng hợp:**

$$u_c = \sqrt{u_{LLKH}^2 + u_A^2 + u_{std}^2}$$

Trong đó: `u_c`: ĐKĐBĐ tổng hợp tương đối, %; `u_std`: ĐKĐBĐ khi xác định lưu lượng chất lỏng chuẩn, %; `u_LLKH`: ĐKĐBĐ khi xác định lưu lượng chất lỏng tại LLKH, %; `u_A`: ĐKĐBĐ loại A, %.

**ĐKĐBĐ khi xác định lưu lượng tại LLKH:**

$$u_{LLKH} = \frac{d}{2\sqrt{3} \times Q_{LLKH}} \times 100\ (\%) \tag{5}$$

Trong đó: `Q_LLKH`: lưu lượng chất lỏng chỉ thị trên LLKH trung bình của n lần đo; `d`: độ phân giải của LLKH.

**ĐKĐBĐ loại A:** ĐKĐBĐ loại A được xác định theo công thức thống kê chuẩn (độ lệch chuẩn thực nghiệm của trung bình). *(công thức là hình ảnh trong bản gốc, không trích xuất được — xem bản PDF gốc)*

**ĐKĐBĐ khi xác định lưu lượng tại chuẩn**

**Với đập tràn thành mỏng, cửa tràn hình chữ nhật:**

Công thức tính toán lưu lượng tại chuẩn qua đập tràn thành mỏng, cửa tràn hình chữ nhật:

$$Q_{std} = \frac{2}{3} \times C_d \times \sqrt{2g} \times b_e \times h_e^{3/2} \tag{7}$$

Trong đó:

- `C_d` là hệ số xả của đập tràn thành mỏng, cửa tràn hình chữ nhật. Chi tiết xem mục B.1 của Phụ lục B;
- `b_e` là độ rộng hiệu dụng của đập tràn: `b_e = b + k_b` (8), chi tiết xem mục B.1 của Phụ lục B;
- `h_e` là mức nước tràn hiệu dụng của đập tràn: `h_e = h + k_h` (9), chi tiết xem mục B.1 của Phụ lục B;
- `g = 9,784 m/s²` là gia tốc trọng trường, được xác định bằng cách khảo sát và xác định thực tế giá trị gia tốc trọng trường tại 3 địa điểm khác nhau: Hà Nội với g = 9,786 m/s²; Đà Nẵng g = 9,784 m/s²; Biên Hòa với g = 9,782 m/s². Quy trình này sử dụng g = 9,784 m/s² với độ không đảm bảo đo u(g) = 0,04 %.

Xuất phát từ (7), độ không đảm bảo đo tuyệt đối được tính, chia cả hai vế cho `Q_std` và kết hợp với công thức (7) *(các bước biến đổi trung gian là hình ảnh trong bản gốc, không trích xuất được — xem bản PDF gốc)*, các thành phần gồm:

- **u(Cd):** độ không đảm bảo đo khi xác định hệ số xả của đập tràn thành mỏng cửa tràn hình chữ nhật (rectangular). Nếu đập tràn thành mỏng được chế tạo và lắp đặt thỏa mãn mục A.1 của Phụ lục A thì u(Cd) được xác định bằng thực nghiệm theo Bảng 3:

  **Bảng 3: Giá trị u(Cd) theo chiều cao cột nước tràn**

  | Loại cửa tràn      | Chiều cao cột nước tràn | u(Cd)   |
  | -------------------- | -------------------------- | ------- |
  | Cửa tràn chữ nhật     | h ≤ 1p                      | 0,75 %  |
  | Cửa tràn chữ nhật     | 1p < h ≤ 1,5p                | 1,00 %  |
  | Cửa tràn chữ nhật     | 1,5p < h                     | 1,50 %  |

- **u(be):** độ không đảm bảo đo khi xác định độ rộng cửa tràn, b, tổ hợp từ `uA(be)`: độ không đảm bảo đo loại A khi xác định be theo mục 7.3.2.1, và `Ugauge(be)`: lấy trong giấy chứng nhận hiệu chuẩn (lấy giá trị trung bình trên toàn bộ dải đo của thước) của thước sử dụng đo độ rộng cửa tràn, b. *(công thức tổ hợp là hình ảnh trong bản gốc)*
- **u(he):** độ không đảm bảo đo khi xác định chiều cao cột nước tràn, h, tổ hợp từ `uA(he)`: độ không đảm bảo đo khi xác định h theo mục 7.3.2.1, và `Ugauge(he)`: lấy trong giấy chứng nhận hiệu chuẩn của thước sử dụng đo chiều cao cột nước tràn của đập. *(công thức tổ hợp là hình ảnh trong bản gốc)*
- **u(g):** độ không đảm bảo đo khi xác định gia tốc trọng trường tại điểm tiến hành khảo sát. Sử dụng giá trị gia tốc trọng trường được xác định theo thực nghiệm thì u(g) = 0,04 %.

**Với đập tràn thành mỏng, cửa tràn hình tam giác:**

Công thức tính toán lưu lượng chuẩn qua đập tràn thành mỏng, cửa tràn hình tam giác: *(công thức (15) là hình ảnh trong bản gốc, không trích xuất được — xem bản PDF gốc)*

Trong đó: `C_d` là hệ số xả của đập tràn thành mỏng, cửa tràn hình tam giác (chi tiết xem mục B.2); `α` là góc của đập tràn; `h_e` là mức nước hiệu dụng trong đập tràn: `h_e = h + k_h` (16), chi tiết xem mục B.2.

Xuất phát từ (15), độ không đảm bảo đo tuyệt đối được tính theo công thức (17); chia cả hai vế cho `Q_std` *(các công thức là hình ảnh trong bản gốc, không trích xuất được — xem bản PDF gốc)*, các thành phần gồm:

- **u(Cd):** độ không đảm bảo đo khi xác định hệ số xả của đập tràn. Nếu đập tràn được chế tạo và lắp đặt thỏa mãn mục A.2 thì u(Cd) = 0,5[^ucd05] (đơn vị không ghi rõ trong bản gốc);
- **u(tan(α/2)):** độ không đảm bảo đo khi xác định góc α của cửa tràn. Phân bố xác suất trong việc xác định góc α của cửa tràn tuân theo phân bố chữ nhật. Quy trình xác định α thực hiện theo mục 7.3.2.2. Trong đó: `α_max, α_min, α_tb`: lần lượt là giá trị lớn nhất, nhỏ nhất và trung bình khi xác định góc α theo mục 7.3.2.2 *(công thức tính là hình ảnh trong bản gốc)*;
- **u(he):** độ không đảm bảo đo khi xác định chiều cao cột nước tràn, h, tổ hợp từ `uA(he)`: độ không đảm bảo đo khi xác định h theo mục 7.3.2.2, và `Ugauge(he)`: lấy trong giấy chứng nhận hiệu chuẩn của thước sử dụng đo chiều cao cột nước tràn của đập.

[^ucd05]: Nguyên văn bản gốc ghi "u(Cd) = 0,5" không kèm đơn vị (%) — có thể là lược bỏ đơn vị %. Giữ nguyên văn.

**Với máng Parshall tiêu chuẩn:**

Công thức tính toán lưu lượng chuẩn qua máng kiểu Parshall: *(công thức (22) là hình ảnh trong bản gốc, không trích xuất được — xem bản PDF gốc)*

Trong đó: `C0`: hằng số (trong phạm vi quy trình này C0 = 0,372); `Cd`: hệ số xả trong việc xác định lưu lượng qua máng; `b`: độ rộng họng thoát của máng; `h`: chiều cao cột nước qua máng; `g = 9,784 m/s²`: gia tốc trọng trường.

Xuất phát từ công thức (22), độ không đảm bảo đo trong việc xác định lưu lượng qua máng gồm thành phần ĐKĐB ngẫu nhiên và ĐKĐB hệ thống trong việc xác định lưu lượng qua máng *(các công thức là hình ảnh trong bản gốc, không trích xuất được — xem bản PDF gốc)*. Với máng Parshall chế tạo tuân theo Phụ lục A.3 của quy trình này thì áp dụng các giá trị tương ứng đã xác định bằng thực nghiệm.

**Tính toán ĐKĐBĐ tổng hợp:** ĐKĐBĐ tổng hợp được xác định cho mỗi lưu lượng kiểm tra theo công thức:

$$u_C = \sqrt{u_A^2 + u_{B1}^2 + u_{B2}^2 + u_{B3}^2 + u_{B4}^2} \tag{24}$$

**ĐKĐBĐ mở rộng:** ĐKĐBĐ mở rộng được xác định cho mỗi lưu lượng kiểm tra theo công thức (25):

$$U = k \times u_C \tag{25}$$

Trong đó: `U`: ĐKĐBĐ mở rộng, %; `k`: hệ số phủ, k = 2 ứng với xác suất tin cậy xấp xỉ 95 %.

## 8. Xử lý chung

- **8.1.** Thiết bị đo lưu lượng sau khi hiệu chuẩn được dán tem, cấp giấy chứng nhận hiệu chuẩn kèm theo kết quả hiệu chuẩn.
- **8.2.** Chu kỳ hiệu chuẩn được khuyến nghị là 01 năm.

## PHỤ LỤC A — YÊU CẦU KỸ THUẬT ĐỐI VỚI ĐẬP TRÀN THÀNH MỎNG VÀ MÁNG PARSHALL TIÊU CHUẨN

### A.1. Yêu cầu kỹ thuật với đập tràn thành mỏng, cửa tràn hình chữ nhật

- Cửa tràn phải đảm bảo các mặt là phẳng, cứng và đặt vuông góc với lòng và 2 thành của kênh. Bề mặt phía trước của đập tràn phải đảm bảo nhẵn;
- Bề mặt của đỉnh cửa tràn phải đảm bảo phẳng, nhẵn và tạo thành cạnh sắc nhọn với mặt phẳng phía đầu vào và ra;
- Độ rộng đỉnh của đập tràn, δ, phải đảm bảo 0 < δ < 0,67h;
- Để đảm bảo mặt đáy và các mặt cạnh của cửa tràn tạo thành cạnh sắc nhọn với mặt phẳng đầu vào/ra của đập thì chúng hoặc phải được gia công cơ khí, hoặc gọt rũa tỉ mỉ. Các cạnh phía đầu ra của đập tràn sẽ được vát một góc tối thiểu 45° nếu độ rộng của đỉnh đập δ > 2 mm;
- Yêu cầu kỹ thuật về kích thước cho đập tràn thành mỏng, cửa tràn hình chữ nhật: h ≤ 2,5p; h ≥ 30 mm; b ≥ 150 mm; p ≥ 100 mm; (B - b)/2 ≥ 100 mm.

*(Hình A.1: Các kích thước và cấu tạo của đập tràn thành mỏng, cửa tràn hình chữ nhật — hình vẽ trong bản gốc, không tái tạo lại.)*

### A.2. Yêu cầu kỹ thuật với đập tràn thành mỏng, cửa tràn hình tam giác

- Cửa tràn phải đảm bảo các mặt là phẳng, cứng và đặt vuông góc với lòng và 2 thành của kênh. Bề mặt phía trước của đập tràn phải đảm bảo nhẵn;
- Các bề mặt của cửa tràn phải đảm bảo phẳng, nhẵn và tạo thành cạnh sắc nhọn với mặt phẳng phía đầu vào và ra của đập tràn. Độ rộng đỉnh của đập tràn, δ, cũng phải đảm bảo thỏa mãn 0 < δ < 0,67h;
- Bề mặt phía đầu ra của đập cũng sẽ được vát một góc tối thiểu 45° trong trường hợp thành của đập, δ, dày hơn 2 mm;
- Vùng lân cận của góc vát do thường xuyên tiếp xúc với chất lỏng nên dễ bị ăn mòn và oxy hóa, do vậy trong vùng này nên được phủ bằng một vật liệu chống ăn mòn hoặc có thể gia công cơ khí bằng vật liệu chống ăn mòn;
- Yêu cầu kỹ thuật về kích thước cho đập tràn thành mỏng, cửa tràn hình tam giác: 20° ≤ α ≤ 100°; h ≤ 0,4p; h ≤ 0,2B; 50 ≤ h ≤ 380 mm; p ≥ 450 mm; B ≥ 1000 mm.

*(Hình A.2: Các kích thước và cấu tạo của đập tràn thành mỏng, cửa tràn hình tam giác — hình vẽ trong bản gốc, không tái tạo lại.)*

### A.3. Yêu cầu kỹ thuật với máng Parshall tiêu chuẩn

Máng Parshall là máng có tiết diện ngang là hình chữ nhật và bao gồm có 1 lối vào hội tụ, một họng thoát và một đoạn đầu ra được phân kỳ được bố trí nối tiếp với nhau. Mặt sàn của đoạn đầu vào thật sự thăng bằng theo chiều ngang và đứng. Hai mặt cạnh của nó sẽ được xây dựng theo chiều thẳng đứng và thu hẹp dần với góc không đổi bằng 11°19' hay nói một cách khác nó sẽ được co lại theo tỷ lệ 1:5 so với trục của máng.

Hai mặt cạnh của đoạn họng song song với nhau. Trên mặt đáy của nó sẽ nghiêng theo chiều hướng xuống với độ dốc bằng 3:8. Đoạn thẳng giao giữa đoạn đầu vào và đoạn họng được gọi là đỉnh của máng. Khoảng cách 2 mặt phẳng, một mặt phẳng trùng với mặt sàn của đoạn đầu vào mặt phẳng còn lại đi qua điểm thấp nhất của đoạn họng, song song, được gọi là chiều cao đỉnh của máng, hp1.

Hai mặt cạnh của đoạn đầu ra được đặt thẳng đứng và được bố trí phân kỳ với một góc không đổi bằng 9°28' hay mở rộng so với trục của máng theo tỷ lệ 1:6. Mặt đáy của đoạn đầu ra sẽ nghiêng theo chiều hướng lên trên với độ dốc bằng 1:6.

Để đảm bảo sự ổn định của lưu lượng tại lối vào và để ngăn cản sự dao động tại bề mặt của đoạn đầu ra thì lối vào và lối ra sẽ được nối với một kênh dẫn thông qua một mặt cong với bán kính cong, R, thỏa mãn R ≥ 2·hmax.

Máng Parshall tiêu chuẩn là máng có chiều rộng của đoạn họng, b, thỏa mãn: 0,152 ≤ b ≤ 2,4 m.

**Bảng A.1: Các kích thước đối với máng Parshall tiêu chuẩn** (đơn vị: m)

| Máng | b     | l (họng) | X    | Y     | hp1   | b1   | l1    | le    | la    | b2   | L2   | hp2   | hc (chiều cao thành máng) |
| ---- | ----- | ---------- | ---- | ----- | ----- | ---- | ----- | ----- | ----- | ---- | ---- | ----- | ---------------------------- |
| 1    | 0,152 | 0,305      | 0,05 | 0,075 | 0,115 | 0,40 | 0,610 | 0,622 | 0,415 | 0,39 | 0,61 | 0,012 | 0,60                          |
| 2    | 0,250 | 0,600      | 005  | 0,075 | 0,230 | 0,78 | 1,325 | 1,352 | 0,900 | 0,55 | 0,92 | 0,072 | 0,80                          |
| 3    | 0,300 | 0,600      | 0,05 | 0,075 | 0,230 | 0,84 | 1,350 | 1,377 | 0,920 | 0,60 | 0,92 | 0,072 | 0,95                          |
| 4    | 0,450 | 0,600      | 0,05 | 0,075 | 0,230 | 1,02 | 1,425 | 1,454 | 0,967 | 0,75 | 0,92 | 0,072 | 0,95                          |
| 5    | 0,600 | 0,600      | 0,05 | 0,075 | 0,230 | 1,20 | 1,500 | 1,530 | 1,020 | 0,90 | 0,92 | 0,072 | 0,95                          |
| 6    | 0,750 | 0,600      | 0,05 | 0,075 | 0,230 | 1,38 | 1,575 | 1,607 | 1,074 | 1,05 | 0,92 | 0,072 | 0,95                          |
| 7    | 0,900 | 0,600      | 0,05 | 0,075 | 0,230 | 1,56 | 1,650 | 1,683 | 1,121 | 1,20 | 0,92 | 0,072 | 0,95                          |
| 8    | 1,000 | 0,600      | 0,05 | 0,075 | 0,230 | 1,68 | 1,700 | 1,734 | 1,161 | 1,30 | 0,92 | 0,072 | 1,00                          |
| 9    | 1,200 | 0,600      | 0,05 | 0,075 | 0,230 | 1,92 | 1,800 | 1,836 | 1,227 | 1,50 | 0,92 | 0,072 | 1,00                          |
| 10   | 1,500 | 0,600      | 0,05 | 0,075 | 0,230 | 2,28 | 1,950 | 1,989 | 1,329 | 1,80 | 0,92 | 0,072 | 1,00                          |
| 11   | 1,800 | 0,600      | 0,05 | 0,075 | 0,230 | 2,64 | 2,100 | 2,142 | 1,427 | 2,10 | 0,92 | 0,072 | 1,00                          |
| 12   | 2,100 | 0,600      | 0,05 | 0,075 | 0,230 | 3,00 | 2,250 | 2,295 | 1,534 | 2,40 | 0,92 | 0,072 | 1,00                          |
| 13   | 2,400 | 0,600      | 0,05 | 0,075 | 0,230 | 3,36 | 2,400 | 2,448 | 1,632 | 2,70 | 0,92 | 0,072 | 1,00                          |

*(Hình A.3: Các kích thước và cấu tạo của máng kiểu Parshall (hình chiếu bằng và mặt cắt) — hình vẽ trong bản gốc, không tái tạo lại.)*

Trên mặt đáy độ rộng của đoạn họng đo tại mọi điểm không vượt quá 0,2 % của b.

## PHỤ LỤC B — XÁC ĐỊNH HỆ SỐ XẢ VÀ CÁC THAM SỐ PHỤ TRỢ CHO ĐẬP TRÀN THÀNH MỎNG VÀ MÁNG PARSHALL TIÊU CHUẨN

### B.1. Đối với đập tràn thành mỏng, cửa tràn hình chữ nhật

Hệ số xả Cd đã được xác định theo thực nghiệm, nó là hàm số của 2 biến số (b/B, h/p) theo công thức thực nghiệm (27); công thức xác định Cd theo thực nghiệm là (28) *(công thức là hình ảnh trong bản gốc, không trích xuất được — xem bản PDF gốc)*. Tùy theo giá trị b/B mà hệ số Cd xác định theo thực nghiệm được biểu diễn trong Hình B.1. Các giá trị khác của b/B được tính toán từ công thức nội suy từ các công thức đã có từ (29) đến (37) *(hình vẽ và các công thức nội suy là hình ảnh trong bản gốc, không trích xuất được)*.

Độ rộng và mức nước hiệu dụng của đập được xác định theo công thức (8) và (9). Trong đó `k_b` và `k_h` là các đại lượng bù cho sự kết hợp do sự tác động của độ nhớt động lực và sức căng bề mặt và nó được xác định bằng thực nghiệm. Giá trị của `k_b` được xác định theo thực nghiệm dựa vào Hình B.2. Từ thực nghiệm đã xác định `k_h = 0,001 m` cho đập tràn thành mỏng.

### B.2. Đối với đập tràn thành mỏng, cửa tràn hình tam giác

Hệ số xả Cd đã được xác định theo thực nghiệm, nó là hàm số của 3 biến số *(công thức là hình ảnh trong bản gốc, không trích xuất được)*. Hình B.3 biểu diễn giá trị hệ số xả Cd xác định bằng thực nghiệm với góc của cửa tràn 20° ≤ α ≤ 90°.

Với α = 90° thì giá trị hệ số xả phụ thuộc vào tỷ số p/B được xác định theo thực nghiệm biểu diễn trong Hình B.4. Lúc này giá trị của hằng số `k_h = 0,00085 m`.

Khi góc của cửa tràn là rất nhỏ so với diện tích của đoạn kênh đầu vào lúc đó giá trị của hệ số chiều cao cột nước hiệu dụng, `k_h`, được xác định theo thực nghiệm và được biểu diễn như Hình B.5.

*(Hình B.1–B.5 là các đồ thị thực nghiệm trong bản gốc, không tái tạo lại — xem bản PDF gốc.)*

### B.3. Đối với máng Parshall tiêu chuẩn

Đối với máng Parshall tiêu chuẩn giá trị hệ số xả Cd thay đổi theo kích thước của máng. Giá trị hệ số Cd xác định theo thực nghiệm theo kích thước, b, của máng được cho trong Bảng B.1 *(bảng số liệu là hình ảnh trong bản gốc, không trích xuất được — xem bản PDF gốc)*.
