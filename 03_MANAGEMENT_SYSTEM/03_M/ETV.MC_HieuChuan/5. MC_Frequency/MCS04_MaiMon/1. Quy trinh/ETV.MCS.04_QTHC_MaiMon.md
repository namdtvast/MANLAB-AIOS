---
id: ETV.MCS 04
title: "Máy thử độ mài mòn — Quy trình hiệu chuẩn"
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
revision: "01"
status: Da-ban-hanh
keywords: [độ mài mòn, friability tester, tốc độ vòng quay, viên nén, hiệu chuẩn]
related_documents: []
iso_clause: ["ISO/IEC 17025:2017"]
legal_basis: []
ai_tags: [calibration-procedure, friability-tester, rotation-speed, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCS 04_May thu do mai mon.pdf`"
supersedes: null
superseded_by: null
---
# MÁY THỬ ĐỘ MÀI MÒN – QUY TRÌNH HIỆU CHUẨN

*Friability tester – Calibration Procedure*

|                   |                     |
| ----------------- | ------------------- |
| **Mã số**         | ETV.MCS 04          |
| **Lần ban hành**  | 01                  |
| **Ngày ban hành** | 22/04/2026          |
| **Biên soạn**     | *(bản gốc để trống)* |
| **Soát xét**      | Trần Thị Hoa        |
| **Phê duyệt**     | Nguyễn Hoàng Giang  |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCS 04_May thu do mai mon.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khối chữ ký trong bản gốc để trống, chưa có tên người biên soạn.
>
> *Ghi chú của bản chuyển đổi:* văn bản gốc có nhiều dấu hiệu được soạn từ mẫu dùng chung với `ETV.MCS 03` (Máy thử độ hòa tan viên nén và viên nang) và `ETV.MCS 05` (Máy thử độ tan rã) mà chưa cập nhật hết tên đối tượng: mục 2 định nghĩa DUT là "Máy thử độ hòa tan viên nén và viên nang", mục 8.1 ghi "Máy thử độ tan ra sau khi hiệu chuẩn…", và toàn bộ Phụ lục 1 (biên bản hiệu chuẩn) mang tiêu đề "BIÊN BẢN HIỆU CHUẨN MÁY THỬ ĐỘ TAN RÃ" với mục 4.4 "Kiểm tra độ hòa tan" — không liên quan đến máy thử độ mài mòn. Giữ nguyên văn toàn bộ, chỉ ghi chú tại đây để người có thẩm quyền soát xét khi ban hành lại.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian  | Nội dung thay đổi     | Lần ban hành |
| ---------- | ---------------------- | ------------ |
| 22/04/2026 | Ban hành lần thứ nhất  | 01           |

---

## 1. Phạm vi áp dụng

Văn bản kỹ thuật này quy định quy trình hiệu chuẩn Máy thử độ mài mòn đối với một số đặc tính đo lường có phạm vi đo và sai số lớn nhất cho phép như bảng sau.

| TT  | Thông số     | Phạm vi đo             | Sai số        |
| --- | ------------- | ------------------------ | -------------- |
| 1   | Tốc độ vòng   | (20 ÷ 100) vòng/phút     | 0,1 vòng/phút  |
| 2   | Thời gian     | (0 ÷ 10) phút            | 0,16 s         |

Quy trình này được áp dụng đối với kỹ thuật viên của Phòng Đo lường Chất lượng (sau đây gọi tắt là PTN) của Viện Kiểm định Công nghệ và Môi trường khi tiến hành hiệu chuẩn các phương tiện nói trên.

## 2. Giải thích từ ngữ

Các từ ngữ trong văn bản này được hiểu như sau:

- **Máy đo độ mài mòn** là thiết bị dùng để xác định độ hao mòn, khả năng chống vỡ vụn trong hoạt động sản xuất, đóng gói và vận chuyển.
  - Trong ngành y, dược: độ mài mòn là tỷ lệ % của thuốc viên nén bị mất đi do vỡ, mòn sau quá trình thử nghiệm, thể hiện độ bền bề mặt của viên, chống lại sự bào mòn.
  - Trong công nghiệp: máy đo độ mài mòn chủ yếu là để thử nghiệm mức độ chịu mài mòn của mẫu vật bằng giấy nhám và đo lường tình trạng của mài mòn, mất trọng lượng, mất khối lượng, độ dày, độ mài mòn từ đó so sánh kết quả của tiêu chuẩn cao su và có được kết quả chính xác hơn. Ngoài ra, máy đo độ mài mòn cung cấp chức năng mài mòn và rách, phù hợp để kiểm tra lốp, băng tải, đai truyền và đế giày.
- **DUT (Device Under Test):** Máy thử độ hòa tan viên nén và viên nang cần được hiệu chuẩn.[^dut]
- **PTĐ:** Phương tiện đo.
- **ĐKĐB:** Không đảm bảo đo.

[^dut]: Nguyên văn bản gốc — định nghĩa DUT ghi "Máy thử độ hòa tan viên nén và viên nang", không khớp với đối tượng của quy trình này (Máy thử độ mài mòn). Xem ghi chú ở đầu tài liệu.

## 3. Các phép hiệu chuẩn

Phải lần lượt tiến hành các phép kiểm tra ghi trong Bảng 1.

**Bảng 1**

| TT  | Tên phép hiệu chuẩn                              | Theo điều, mục của quy trình |
| --- | --------------------------------------------------- | -------------------------------- |
| 1   | Kiểm tra bên ngoài                                   | 7.1                               |
| 2   | Kiểm tra kỹ thuật                                    | 7.2                               |
| 3   | Kiểm tra đo lường — xác định độ chính xác tốc độ vòng quay | 7.3.1                      |
|     | — xác định đồng hồ đo thời gian                      | 7.3.2                             |
|     | — tính toán độ không đảm bảo đo                      | 7.4                               |
| 4   | Xử lý chung                                          | 8                                 |

## 4. Phương tiện hiệu chuẩn

Phương tiện hiệu chuẩn được ghi trong Bảng 2.

**Bảng 2**

| TT  | Phương tiện hiệu chuẩn                | Đặc trưng kỹ thuật                                                                                                                                          |
| --- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Chuẩn đo lường**                       |                                                                                                                                                                |
| 1.1 | Chuẩn đo tốc độ vòng quay hiện số        | Dải đo từ 1 đến 99.999 lần/phút; độ chính xác ± 0,1 % số đọc + 2 số cuối; độ phân giải 0,1 lần/phút khi phạm vi đo < 1.000 lần/phút, 1 lần/phút khi phạm vi đo > 1.000 lần/phút |
| 1.2 | Chuẩn đo thời gian                       | Dải đo: —; độ không đảm bảo đo của tổ hợp chuẩn so với thiết bị thỏa mãn tỉ số truyền chuẩn ≤ 1/3                                                             |
| 2   | **Phương tiện đo khác**                  |                                                                                                                                                                |
| 2.1 | PTĐ nhiệt độ và độ ẩm môi trường         | Dải đo: Nhiệt độ (0 ÷ 50) °C; Độ ẩm tương đối (10 ÷ 95) %RH. Độ phân giải: Nhiệt độ 1 °C; Độ ẩm 1 %RH                                                        |

## 5. Điều kiện hiệu chuẩn

Khi tiến hành hiệu chuẩn phải đảm bảo các điều kiện sau:

- Nhiệt độ: (25 ± 5) °C;
- Độ ẩm tương đối: ≤ 80 %RH (không đọng sương).

## 6. Chuẩn bị hiệu chuẩn

Trước khi hiệu chuẩn phải thực hiện các bước sau đây:

- Vặn chặt nắp của thiết bị trước khi bắt đầu kiểm tra độ mài mòn;
- Căn chỉnh vạch đánh dấu của trống với vạch đánh dấu của vít để tránh sai sót khi đếm.

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

Phải kiểm tra bên ngoài đối với DUT theo các yêu cầu sau đây:

- Máy phải có nhãn, mác ghi số máy, nơi sản xuất/nhà sản xuất;
- Máy phải đầy đủ các bộ phận, núm nút điều chỉnh, núm thiết lập tốc độ và phụ kiện cần thiết;
- Màn hình chỉ thị phải rõ nét, đọc được dễ dàng.

### 7.2. Kiểm tra kỹ thuật

Phải kiểm tra kỹ thuật DUT theo các yêu cầu sau:

- Kiểm tra trực quan tính toàn vẹn của lưới giỏ trước khi sử dụng;
- Kiểm tra xem giỏ và mái chèo có bị hư hỏng không trước khi sử dụng. Phải ngừng sử dụng và loại bỏ các giỏ bị biến dạng hoặc mái chèo không sử dụng được;
- Kiểm tra các bình trong khi hạ thấp cụm mái chèo hoặc giỏ;
- Các bộ phận cơ cấu quay phải có kết cấu chắc chắn, không rơ, kẹt;
- Các đầu kết nối điện phải chắc chắn, không bị lỏng;
- Kiểm tra và lắp mái chèo hoặc giỏ vào các dụng cụ vào các vị trí tương ứng;
- Cấp điện, thiết lập tốc độ vòng quay thì DUT phải hoạt động bình thường.

### 7.3. Kiểm tra đo lường

#### 7.3.1. Kiểm tra độ chính xác tốc độ vòng quay

DUT phải được kiểm tra độ chính xác tốc độ vòng quay tại 3 điểm, việc kiểm tra được thực hiện theo trình tự yêu cầu sau đây:

- Dán một mảnh giấy phản quang kim loại nhỏ vào trục. Tập trung ánh sáng của máy đo tốc độ vào giấy bằng cách nhấn nút bên của thiết bị;
- Thiết lập điểm kiểm tra tốc độ vòng quay trên DUT;
- Chiếu ánh sáng từ máy đo tốc độ vào giấy và để yên;
- Nhấn nút đo và hướng chùm sáng phát ra từ máy đo tốc độ vòng quay chuẩn tới tấm dán phản quang được dán trên thành mặt ngoài của trục của DUT;
- Khi giá trị tốc độ vòng quay đo được trên màn hình LCD của máy đo tốc độ vòng quay chuẩn ổn định (khoảng một hoặc hai phút), đọc kết quả đo tốc độ vòng quay được hiển thị trên màn hình;
- Đo lặp tối thiểu 5 lần. Ghi các kết quả đo vào biên bản hiệu chuẩn ở Phụ lục 1.
- Sai số giữa giá trị tốc độ vòng quay cài đặt trên máy với PTĐ chuẩn được tính theo công thức:

$$
\Delta V = v_{tb} - v_{ch} \tag{1}
$$

  Trong đó: `v_ch`: giá trị trung bình của chuẩn, lần/phút; `v_tb`: giá trị trung bình tốc độ cài đặt trên máy, lần/phút.

#### 7.3.2. Kiểm tra độ chính xác nhiệt độ môi trường trong bình thử

- Đổ nước cất vào mỗi bình thử;
- Đặt dây nhiệt vào các bình của máy thử độ tan rã;[^dungdich]
- Cài đặt nhiệt độ hoạt động của thiết bị ở 37 °C (hoặc theo yêu cầu của đơn vị sử dụng). Đồng thời, duy trì ổn định tốc độ vòng quay và để các dụng cụ đạt được nhiệt độ đã đặt;
- Khi nhiệt độ đã ổn định như nhiệt độ đã cài đặt thì tiến hành đọc giá trị hiển thị ở PTĐ đo nhiệt độ chuẩn;
- Đo lặp tối thiểu 5 lần tại mỗi điểm nhiệt cài đặt;
- Ghi các kết quả vào biên bản hiệu chuẩn ở Phụ lục 1;
- Sai số giữa giá trị nhiệt độ hiển thị trên máy với PTĐ chuẩn được tính theo công thức:

$$
\Delta t = t_{cd} - t_{ch} \tag{2}
$$

  Trong đó:

$$
t_{ch} = \frac{1}{k}\sum_{j=1}^{k} (t_{chj} \pm \partial t_{chj}) \tag{3}
$$

  - `t_ch`: giá trị trung bình của mỗi nhiệt kế chuẩn (chỉ thị chuẩn), °C;
  - `t_chj`: giá trị nhiệt độ chuẩn tại lần thứ j, °C;
  - `∂t_chj`: số hiệu chính của nhiệt kế chuẩn thứ j tại điểm nhiệt độ kiểm tra (xem trong giấy chứng nhận hiệu chuẩn), °C;
  - `k`: tổng số lần đo của mỗi nhiệt kế chuẩn tại một điểm nhiệt độ;
  - `t_cd`: giá trị trung bình của chỉ thị nhiệt độ tại mỗi điểm nhiệt độ cài đặt, °C:

$$
t_{cd} = \frac{1}{n}\sum_{i=1}^{n} t_{cdi}
$$

  - `t_cdi`: giá trị nhiệt độ của máy tại lần thứ i, °C;
  - `n`: tổng số lần đo nhiệt độ của máy tại mỗi điểm cài đặt nhiệt.

  Thực hiện tương tự như trên đối với từng điểm đo còn lại.

[^dungdich]: Nguyên văn bản gốc nhắc đến "bình của máy thử độ tan rã" — cùng dấu hiệu tái sử dụng mẫu từ `ETV.MCS 05` như đã ghi chú ở đầu tài liệu.

#### 7.3.3. Kiểm tra độ chính xác đồng hồ thời gian

- Cài đặt thời gian vận hành của thiết bị lần lượt là (15; 30; 60) phút hoặc theo chế độ chạy thực tế và nhu cầu của khách hàng;
- Song song với thiết bị bắt đầu vận hành thì bắt đầu bấm đồng hồ bấm giây. Sau khi đồng hồ đếm thời gian của thiết bị dừng thì cũng phải bấm dừng đồng hồ bấm giây;
- Đo lặp tối thiểu 2 lần tại mỗi điểm nhiệt cài đặt;
- Ghi các kết quả vào biên bản hiệu chuẩn ở Phụ lục 1;
- Sai số giữa giá trị thời gian cài đặt trên máy với PTĐ chuẩn được tính theo công thức:

$$
\Delta X = x_{cd} - x_{ch} \tag{4}
$$

  Trong đó:

$$
x_{ch} = \frac{1}{n}\sum_{j=1}^{n} x_j
$$

  - `x_ch`: giá trị trung bình của chuẩn, phút;
  - `x_j`: giá trị của chuẩn tại lần thứ j, phút;
  - `n`: tổng số lần đo;
  - `x_cd`: giá trị trung bình thời gian trên máy, phút.

  Thực hiện tương tự như trên đối với từng điểm còn lại.

### 7.4. Tính toán độ không đảm bảo đo

**Nguồn của độ không đảm bảo:** Độ không đảm bảo đo tốc độ vòng quay bao gồm các nguồn ĐKĐB từ thiết bị chuẩn và thiết bị cần hiệu chuẩn.

**Xác định các độ không đảm bảo đo thành phần:** Các nguồn gây ra độ không đảm bảo đo:

- Độ không đảm bảo kiểu A của DUT do đo lặp;
- Độ không đảm bảo kiểu B do độ phân giải thiết lập của DUT;
- Độ không đảm bảo kiểu B của máy đo vận tốc vòng quay chuẩn;
- Độ không đảm bảo kiểu B do năng lực, kinh nghiệm của nhân viên (trên thực tế được coi là rất nhỏ).

#### 7.4.1. ĐKĐB thông số tốc độ vòng quay

##### 7.4.1.1. ĐKĐB từ PTĐ chuẩn

**a) Độ không đảm bảo kiểu A do độ phân tán của PTĐ chuẩn**

- Tính giá trị tốc độ vòng quay trung bình `v̄_ch` đo được tại điểm kiểm tra:

$$
v_{ch} = \frac{1}{n}\sum_{j=1}^{n} v_j \tag{5}
$$

  Trong đó: `v_ch`: giá trị trung bình của chuẩn, lần/phút; `v_j`: giá trị của chuẩn tại lần thứ j, lần/phút; `n`: tổng số lần đo.

- Tính độ lệch chuẩn thực nghiệm (độ phân tán kết quả đo):

$$
s(V_{ch}) = \sqrt{\frac{\sum_1^n (V_{chj} - \bar{V}_{ch})^2}{n-1}}\ \text{, lần/phút} \tag{6}
$$

- Tính độ không đảm bảo `u_A` do đo lặp n lần (độ lệch chuẩn thực nghiệm của trung bình):

$$
u_{A1} = \sqrt{\frac{\sum_1^n (V_{cj} - \bar{V}_c)^2}{n(n-1)}}\ \text{, lần/phút} \tag{7}
$$

**b) ĐKĐB kiểu B của PTĐ chuẩn**

$$
u_{B1} = \frac{U_r}{k}\ \text{, lần/phút} \tag{8}
$$

Trong đó: `u_B1`: ĐKĐB chuẩn tuyệt đối của máy đo tốc độ vòng quay chuẩn, lần/phút; `U_r`: ĐKĐB mở rộng tuyệt đối của máy đo tốc độ vòng quay chuẩn được lấy từ giấy chứng nhận hiệu chuẩn, lần/phút; `k`: hệ số phủ của ĐKĐB mở rộng tuyệt đối của máy đo tốc độ vòng quay chuẩn được lấy từ giấy chứng nhận hiệu chuẩn.

**c) ĐKĐB do độ phân giải của chuẩn**

$$
u_{B2} = \frac{A \times d}{\sqrt{3}}\ \text{, lần/phút} \tag{9}
$$

Trong đó: `u_B2`: độ không đảm bảo đo tuyệt đối do độ phân giải thiết lập tốc độ vòng quay của chuẩn, lần/phút; `A`: độ phân giải thiết lập tốc độ vòng quay trên chuẩn, lần/phút; `d`: hệ số có giá trị d = 1/2 đối với bộ chỉ thị hiện số, 1/10 đối với bộ chỉ thị tương tự.

##### 7.4.1.2. ĐKĐB từ DUT

**a) Độ không đảm bảo kiểu A do độ phân tán của DUT**

- Tính giá trị tốc độ vòng quay trung bình `V̄_tb` đo được tại điểm kiểm tra:

$$
\bar{V}_{tb} = \frac{\sum_1^n V_{tbi}}{n}\ \text{, lần/phút} \tag{10}
$$

  Trong đó: `n`: số lần đo lặp tại 1 điểm tốc độ vòng quay kiểm tra; `V_tbi`: tốc độ vòng quay của DUT đo được ở lần đo thứ i, lần/phút; `V̄_tb`: tốc độ vòng quay trung bình của DUT đo được tại điểm kiểm tra.

- Tính độ lệch chuẩn thực nghiệm (độ phân tán kết quả đo):

$$
s(V_{tb}) = \sqrt{\frac{\sum_1^n (V_{tbj} - \bar{V}_{tb})^2}{n-1}}\ \text{, lần/phút} \tag{11}
$$

- Tính độ không đảm bảo `u_A` do đo lặp n lần:

$$
u_{A2} = \sqrt{\frac{\sum_1^n (V_{tbj} - \bar{V}_{tb})^2}{n(n-1)}}\ \text{, lần/phút} \tag{12}
$$

**b) ĐKĐB do độ phân giải của DUT**

$$
u_{B3} = \frac{A \times d}{\sqrt{3}}\ \text{, lần/phút} \tag{13}
$$

Trong đó: `u_B3`: độ không đảm bảo đo tuyệt đối do độ phân giải thiết lập tốc độ vòng quay của DUT, lần/phút; `A`: độ phân giải thiết lập tốc độ vòng quay trên DUT, lần/phút; `d`: hệ số có giá trị d = 1/2 đối với bộ chỉ thị hiện số, 1/10 đối với bộ chỉ thị tương tự.

##### 7.4.1.3. Độ không đảm bảo đo tổng hợp

$$
u_c = \sqrt{u_{ch1}^2 + u_{ch2}^2 + u_{bk1}^2 + u_{bk2}^2 + u_{bk3}^2 + u_{bk4}^2} \tag{14}
$$

> *Ghi chú:* ký hiệu trong công thức (14) của bản gốc (`u_ch1, u_ch2, u_bk1…u_bk4`) không khớp trực tiếp với các ký hiệu `u_A1, u_A2, u_B1, u_B2, u_B3` vừa định nghĩa ở trên (chỉ có 5 thành phần, công thức (14) lại viết 6 số hạng) — có thể là công thức tổng hợp dùng chung mẫu với mục 7.4.2/7.4.3 (thông số nhiệt độ/thời gian) mà chưa đổi lại ký hiệu. Giữ nguyên văn.

##### 7.4.1.4. Độ không đảm bảo đo mở rộng

$$
U = k \times u_c(V_{DUT})\ \text{, lần/phút} \tag{15}
$$

Trong đó: `u_c(V_DUT)`: ĐKĐB tổng hợp của tốc độ vòng quay của DUT, lần/phút; `k`: hệ số phủ, có giá trị bằng 2, ứng với xác suất tin cậy 95 %.

#### 7.4.2. ĐKĐB thông số nhiệt độ

##### 7.4.2.1. ĐKĐB từ PTĐ tổ hợp chuẩn

$$
u_{tch} = \sqrt{u_{tch1}^2 + u_{tch2}^2} \tag{16}
$$

**ĐKĐB của nhiệt kế chuẩn (u_tch1):**

$$
u_{tch1} = \frac{U_{95}}{2} \tag{17}
$$

Với `U_95`: ĐKĐB mở rộng của nhiệt kế chuẩn, lấy từ giấy chứng nhận hiệu chuẩn.

**ĐKĐB do độ tản mạn của các kết quả đo từ nhiệt kế chuẩn (u_tch2):**

$$
u_{tch2} = \sqrt{\sum_{j=1}^{k} u_{tch2,j}^2} \tag{18}
$$

Với `u_tch2,j` là ĐKĐB chuẩn loại A của nhiệt kế chuẩn thứ j:

$$
u_{tch2j} = \sqrt{\frac{S_j^2}{n}} \tag{19}
$$

Trong đó `S_j` là độ lệch chuẩn của nhiệt kế chuẩn thứ j, tính cho n lần đọc:

$$
S_j = \sqrt{\frac{\sum_{i=1}^{n} (t_{i,j} - t_j)^2}{n-1}} \tag{20}
$$

- `n`: số lần đọc tại mỗi điểm;
- `t_i,j`: lần đọc thứ i của nhiệt kế chuẩn thứ j;
- `t_j`: nhiệt độ trung bình tại điểm kiểm tra của nhiệt kế chuẩn thứ j.

##### 7.4.2.2. ĐKĐB từ DUT

$$
u_{tbk} = \sqrt{u_{tbk1}^2 + u_{tbk2}^2} \tag{21}
$$

**ĐKĐB do độ tản mạn của các kết quả đo từ bộ chỉ thị của thiết bị (u_bk1):**

$$
u_{tbk1j} = \sqrt{\frac{S_j^2}{n}} \tag{22}
$$

Trong đó `s_j` là độ lệch chuẩn tại điểm đo thứ j, `n` là số lần đọc tại mỗi điểm đo:

$$
s_j = \sqrt{\frac{\sum_1^n (t_i - t)^2}{n-1}} \tag{23}
$$

- `n`: số lần đọc tại mỗi điểm;
- `t_i`: lần đọc thứ i của thiết bị nhiệt;
- `t`: nhiệt độ trung bình tại điểm kiểm tra của thiết bị nhiệt.

**Độ không đảm bảo đo theo độ phân giải của chỉ thị thiết bị (u_bk4):**

Đối với chỉ thị tương tự:

$$
u_{tbk2} = \frac{d}{3\sqrt{3}} \tag{24}
$$

Trong đó `d` là giá trị độ chia của thiết bị nhiệt.

Đối với chỉ thị hiện số:

$$
u_{tbk2} = \frac{d}{2\sqrt{3}} \tag{25}
$$

Trong đó `d` là độ phân giải của thiết bị nhiệt.

##### 7.4.2.3. Độ không đảm bảo đo tổng hợp

Độ không đảm bảo đo liên hợp là đại lượng được xác định từ tổ hợp chuẩn và tủ nhiệt:

$$
u_{tc} = \sqrt{u_{tch1}^2 + u_{tch2}^2 + u_{tbk1}^2 + u_{tbk2}^2} \tag{26}
$$

##### 7.4.2.4. Độ không đảm bảo đo mở rộng

Độ không đảm bảo đo mở rộng (U95) là đại lượng xác định miền giá trị phân bố bao quanh kết quả đo:

$$
U_{95} = k \times u_c \tag{27}
$$

Với k = 2 là hệ số bao phủ tương ứng với mức độ tin cậy 95 % C.L.

#### 7.4.3. ĐKĐB thông số thời gian

##### 7.4.3.1. ĐKĐB từ PTĐ chuẩn

$$
u_{xch} = \sqrt{u_{xch1}^2 + u_{xch2}^2} \tag{28}
$$

**ĐKĐB kiểu B từ PTĐ chuẩn (u_ch1):**

$$
u_{xch1} = \frac{U_{95}}{2} \tag{29}
$$

Với `U_95`: ĐKĐB mở rộng của đồng hồ bấm thời gian chuẩn, lấy từ giấy chứng nhận hiệu chuẩn.

**ĐKĐB do độ tản mạn của các kết quả đo từ đồng hồ bấm thời gian chuẩn (u_ch2):**

$$
u_{xch2} = \sqrt{\frac{1}{k}\sum_{j=1}^{k} u_{xch2,j}^2} \tag{30}
$$

Với `u_xch2,j` là ĐKĐB chuẩn loại A của đồng hồ bấm thời gian chuẩn thứ j:

$$
u_{xch2j} = \sqrt{\frac{S_j^2}{n}} \tag{31}
$$

Trong đó `S_j` là độ lệch chuẩn của đồng hồ bấm thời gian chuẩn, tính cho n lần đọc:

$$
S_j = \sqrt{\frac{\sum_{i=1}^{n} (x_{i,j} - x_j)^2}{n-1}} \tag{32}
$$

- `n`: số lần đọc tại mỗi điểm;
- `x_i,j`: lần đọc thứ i của đồng hồ bấm thời gian chuẩn thứ j;
- `x_j`: giá trị trung bình tại điểm kiểm tra của đồng hồ bấm thời gian chuẩn thứ j.[^xj]

[^xj]: Bản gốc ghi nhầm "𝑥𝑗: Nhiệt độ trung bình tại điểm kiểm tra..." (thuật ngữ "nhiệt độ" sao chép từ mục 7.4.2 thời gian) — về bản chất đây là đại lượng thời gian, không phải nhiệt độ. Giữ nguyên văn, chú thích lại cho đúng ngữ cảnh.

##### 7.4.3.2. ĐKĐB từ DUT

$$
u_{xbk} = \sqrt{u_{xbk1}^2 + u_{xbk2}^2} \tag{33}
$$

**ĐKĐB do độ tản mạn của các kết quả đo từ bộ chỉ thị của thiết bị (u_bk1):**

$$
u_{xbk1j} = \sqrt{\frac{S_j^2}{n}} \tag{34}
$$

Trong đó `s_j` là độ lệch chuẩn tại điểm đo thứ j, `n` là số lần đọc tại mỗi điểm đo:

$$
s_j = \sqrt{\frac{\sum_1^n (x_i - x)^2}{n-1}} \tag{35}
$$

- `n`: số lần đọc tại mỗi điểm;
- `x_i`: lần đọc thứ i của DUT;
- `x`: giá trị trung bình tại điểm kiểm tra của DUT.

**Độ không đảm bảo đo theo độ phân giải của chỉ thị DUT (u_bk4):**

$$
u_{xbk2} = \frac{d}{2\sqrt{3}} \tag{36}
$$

Trong đó `d` là độ phân giải của DUT.

##### 7.4.3.3. Độ không đảm bảo đo tổng hợp

Độ không đảm bảo đo liên hợp là đại lượng được xác định từ tổ hợp chuẩn và DUT:

$$
u_{xc} = \sqrt{u_{xch1}^2 + u_{xch2}^2 + u_{xbk1}^2 + u_{xbk2}^2} \tag{37}
$$

##### 7.4.3.4. Độ không đảm bảo đo mở rộng

Độ không đảm bảo đo mở rộng (U95) là đại lượng xác định miền giá trị phân bố bao quanh kết quả đo:

$$
U_{95} = k \times u_c \tag{38}
$$

Với k = 2 là hệ số bao phủ tương ứng với mức độ tin cậy 95 % C.L.

## 8. Xử lý chung

- **8.1.** Máy thử độ tan rã[^tanra] sau khi hiệu chuẩn được dán tem, cấp giấy chứng nhận hiệu chuẩn kèm theo kết quả hiệu chuẩn.
- **8.2.** Chu kỳ hiệu chuẩn được khuyến nghị là 12 tháng.

[^tanra]: Nguyên văn bản gốc ghi "Máy thử độ tan ra" — cùng dấu hiệu tái sử dụng mẫu như đã ghi chú ở đầu tài liệu; đối tượng đúng của quy trình này là Máy thử độ mài mòn.

## PHỤ LỤC 1 — BIÊN BẢN HIỆU CHUẨN

> *Ghi chú của bản chuyển đổi:* tiêu đề Phụ lục 1 trong bản gốc ghi "BIÊN BẢN HIỆU CHUẨN MÁY THỬ ĐỘ TAN RÃ" và mục 4.4 có bảng "Kiểm tra độ hòa tan" — không thuộc quy trình hiệu chuẩn Máy thử độ mài mòn (xem ghi chú ở đầu tài liệu). Giữ nguyên văn cấu trúc biểu mẫu.

Số GCN: … — Số tem: … — Số PNT: …

**I. Thông tin chung:** Tên đối tượng, Kiểu, Số hiệu, Mã quản lý, Hãng sản xuất, Năm sản xuất, Đơn vị sử dụng, Đặc trưng kỹ thuật (phạm vi đo, độ phân giải, độ chia vạch, khoảng cách vạch chia, điểm hiệu chuẩn, ghi chú).

**II. Thông tin hiệu chuẩn:** Phương pháp hiệu chuẩn `ETV.MCS …`; bảng mẫu chuẩn (mã quản lý, hãng/nước sản xuất, diễn giải, hiệu lực hiệu chuẩn, liên kết chuẩn); điều kiện môi trường (nhiệt độ, độ ẩm, áp suất); địa điểm hiệu chuẩn (PTN/Hiện trường).

**III. Kiểm tra kỹ thuật:** lắp ráp/đấu nối, vận hành, kiểm tra trạng thái hoạt động (Bình thường/Không bình thường).

**IV. Kiểm tra đo lường:**

- *4.1. Kiểm tra tốc độ vòng quay* — 7 điểm hiệu chuẩn (lần/phút), mỗi điểm đo 5 lần, ghi trung bình/sai số đo.
- *4.2. Kiểm tra nhiệt độ bình thử* — 8 điểm hiệu chuẩn (°C), mỗi điểm đo 5 lần, ghi trung bình/sai số đo.
- *4.3. Kiểm tra đồng hồ thời gian* — 5 điểm hiệu chuẩn (phút), mỗi điểm đo 3 lần, ghi trung bình/sai số đo.
- *4.4. Kiểm tra độ hòa tan* — 5 điểm hiệu chuẩn (phút, lần/phút), mỗi điểm đo 3 lần, ghi trung bình/sai số đo.

Người kiểm tra — Người thực hiện.

## TÀI LIỆU THAM KHẢO

*(bản gốc để trống — không có tài liệu tham khảo được liệt kê)*
