---
id: ETV.MCS 03
title: "Máy thử độ hòa tan viên nén và viên nang — Quy trình hiệu chuẩn"
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
keywords: [độ hòa tan, dissolution tester, viên nén, viên nang, prednisone, UV-Vis, hiệu chuẩn]
related_documents: []
iso_clause: ["ISO/IEC 17025:2017"]
legal_basis: []
ai_tags: [calibration-procedure, dissolution-tester, uv-vis, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCS 03_May thu do hoa tan va vien nen_V2.pdf`"
supersedes: "ETV.MCS 03 lần ban hành 01 (13/09/2024)"
superseded_by: null
---
# MÁY THỬ ĐỘ HÒA TAN VIÊN NÉN VÀ VIÊN NANG – QUY TRÌNH HIỆU CHUẨN

*Dissolution tester for tablets and capsules – Calibration Procedure*

|                   |                     |
| ----------------- | ------------------- |
| **Mã số**         | ETV.MCS 03          |
| **Lần ban hành**  | 02                  |
| **Ngày ban hành** | 22/04/2026          |
| **Biên soạn**     | *(bản gốc để trống)* |
| **Soát xét**      | Trần Thị Hoa        |
| **Phê duyệt**     | Nguyễn Hoàng Giang  |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCS 03_May thu do hoa tan va vien nen_V2.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khối chữ ký trong bản gốc để trống, chưa có tên người biên soạn.
>
> *Ghi chú của bản chuyển đổi:* trang bìa ghi "Ngày ban hành: 22/04/2026", nhưng chân trang lặp lại trên toàn bộ các trang sau lại ghi "Ngày BH: 22/06/2026" — hai ngày khác nhau trong cùng một bản PDF. Bản chuyển đổi này lấy ngày ban hành trên trang bìa (22/04/2026) làm giá trị chính thức để đồng bộ với các quy trình `ETV.MCS 01/02/04/05/06` cùng đợt ban hành, và ghi nhận sai khác ở chân trang tại đây để người có thẩm quyền xác minh khi soát xét.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian  | Nội dung thay đổi     | Lần ban hành |
| ---------- | ---------------------- | ------------ |
| 13/09/2024 | Ban hành lần thứ nhất  | 01           |
| 22/04/2026 | Ban hành lần hai       | 02           |

---

## 1. Phạm vi áp dụng

Văn bản kỹ thuật này quy định quy trình hiệu chuẩn Máy thử đo hòa tan viên nén và viên nang đối với một số đặc tính đo lường có phạm vi đo và sai số lớn nhất cho phép như bảng sau.

| TT  | Thông số     | Phạm vi đo             | Sai số           |
| --- | ------------- | ------------------------ | ------------------ |
| 1   | Tốc độ vòng   | (30 ÷ 500) vòng/phút     | 0,2 vòng/phút      |
| 2   | Nhiệt độ      | (20 ÷ 50) °C             | Đến 0,10 °C        |
| 3   | Thời gian     | (0 ÷ 60) phút            | 0,80 s             |
| 4   | Độ hòa tan    | (0 ~ 100) %              | 1,4 %              |

Quy trình này được áp dụng đối với kỹ thuật viên của Phòng Đo lường Chất lượng (sau đây gọi tắt là PTN) của Viện Kiểm định Công nghệ và Môi trường khi tiến hành hiệu chuẩn các phương tiện nói trên.

## 2. Giải thích từ ngữ

Các từ ngữ trong văn bản này được hiểu như sau:

- **Máy đo độ hòa tan:** dùng trong việc xác định đặc tính của thuốc viên dạng rắn. Thiết bị có thể phát hiện sự thay đổi công thức ảnh hưởng đến tỷ lệ hòa tan của thuốc. Thử nghiệm hoà tan là một công cụ quan trọng để mô tả đặc tính hiệu quả của thuốc viên dạng thành phẩm.
- **DUT (Device Under Test):** Máy thử độ hòa tan viên nén và viên nang cần được hiệu chuẩn.
- **PTĐ:** Phương tiện đo.
- **ĐKĐB:** Không đảm bảo đo.

## 3. Các phép hiệu chuẩn

Phải lần lượt tiến hành các phép kiểm tra ghi trong Bảng 1.

**Bảng 1**

| TT  | Tên phép hiệu chuẩn                                                     | Theo điều, mục của quy trình |
| --- | -------------------------------------------------------------------------- | -------------------------------- |
| 1   | Kiểm tra bên ngoài                                                          | 7.1                               |
| 2   | Kiểm tra kỹ thuật (kiểm tra mặt tiếp xúc; kiểm tra hoạt động bộ đếm; kiểm tra điện áp cung cấp cho máy) | 7.2 |
| 3   | Kiểm tra đo lường — xác định độ chính xác tốc độ vòng quay                 | 7.3.1                             |
|     | — xác định nhiệt độ trong bình thử                                         | 7.3.2                             |
|     | — xác định đồng hồ đo thời gian                                            | 7.3.3                             |
|     | — xác định độ hòa tan                                                      | 7.3.4                             |
|     | — tính toán độ không đảm bảo đo                                            | 7.4                               |
| 4   | Xử lý chung                                                                 | 8                                 |

## 4. Phương tiện hiệu chuẩn

Phương tiện hiệu chuẩn được ghi trong Bảng 2.

**Bảng 2**

| TT   | Phương tiện hiệu chuẩn              | Đặc trưng kỹ thuật                                                                                                                                                                                                                       |
| ---- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | **Chuẩn đo lường**                     |                                                                                                                                                                                                                                            |
| 1.1  | Chuẩn đo tốc độ vòng quay hiện số      | Dải đo từ 1 đến 99.999 rpm; độ chính xác ± 0,1 % số đọc + 2 số cuối; độ phân giải 0,1 rpm khi phạm vi đo < 1.000 rpm, 1 rpm khi phạm vi đo > 1.000 rpm                                                                                    |
| 1.2  | Chuẩn đo nhiệt độ                      | Thiết bị chỉ thị chuẩn — dải đo phù hợp với dải đo làm việc của DUT; độ không đảm bảo đo của tổ hợp chuẩn so với thiết bị thỏa mãn tỉ số truyền chuẩn ≤ 1/3                                                                              |
| 1.3  | Chuẩn đo thời gian                     | Dải đo: —; độ không đảm bảo đo của tổ hợp chuẩn so với thiết bị thỏa mãn tỉ số truyền chuẩn ≤ 1/3                                                                                                                                          |
| 1.4  | Thiết bị UV-Vis                        | Dải bước sóng: (190 ÷ 1.100) nm; độ chính xác bước sóng: ± 1 nm; dải đo quang: ± 3 Abs; độ tuyến tính quang: 0,5 % với 2 Abs, 1 % tại > 2 Abs with neutral glass at 546 nm; độ chính xác quang: 5 mAbs tại (0,0 ÷ 0,5) Abs; ánh sáng lạc: tại 220 nm < 3,3 Abs / < 0,05 % |
| 1.5  | Viên Prednisone                        | Chuẩn Prednisone 10 mg/viên                                                                                                                                                                                                                |
| 1.6  | Chất chuẩn Prednisone                  | —                                                                                                                                                                                                                                           |
| 2    | **Phương tiện đo khác**                |                                                                                                                                                                                                                                              |
| 2.1  | PTĐ nhiệt độ và độ ẩm môi trường       | Dải đo: Nhiệt độ (0 ÷ 50) °C; Độ ẩm tương đối (10 ÷ 95) %RH. Độ phân giải: Nhiệt độ 1 °C; Độ ẩm 1 %RH                                                                                                                                     |
| 2.2  | Bình định mức                          | 10 mL; 50 mL                                                                                                                                                                                                                                 |
| 3    | **Phương tiện phụ**                    |                                                                                                                                                                                                                                              |
| 3.1  | Màng lọc PVDF (0,45 μm × Φ47 mm)       | Chất liệu Polyvinylidene fluoride; màu trắng; bề mặt Plain; đường kính lỗ 0,45 μm; đường kính φ47 mm                                                                                                                                        |
| 3.2  | Nước cất (sử dụng tại mục 7.3.4)       | —                                                                                                                                                                                                                                            |

## 5. Điều kiện hiệu chuẩn

Khi tiến hành hiệu chuẩn phải đảm bảo các điều kiện sau:

- Nhiệt độ: (25 ± 5) °C;
- Độ ẩm tương đối: ≤ 80 %RH (không đọng sương).

## 6. Chuẩn bị hiệu chuẩn

Trước khi hiệu chuẩn phải thực hiện các bước sau đây:

- Đảm bảo hệ thống sạch và không có bụi. Trong trường hợp cần vệ sinh, hãy lau sạch bằng giấy ăn;
- Đảm bảo thiết bị được kết nối với nguồn điện liên tục;
- Kiểm tra nước tinh khiết trong bồn. Nước phải trong và đạt đến vạch;
- DUT cần được kiểm tra và được làm vệ sinh đối với trục quay, nắp kính đậy;
- DUT cần được đặt, gá cố định chắc chắn, đảm bảo giảm thiểu tối đa rung, lắc, xê dịch trong khi vận hành;
- Kiểm tra mực nước của dụng cụ và đổ nước vào bồn đến mức đã đánh dấu trước khi đặt bình thử vào;
- DUT được bật chế độ làm nóng 30 phút trước khi tiến hành hiệu chuẩn.

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

Phải kiểm tra bên ngoài đối với DUT theo các yêu cầu sau đây:

- Máy phải có nhãn, mác ghi số máy, nơi sản xuất/nhà sản xuất;
- Máy phải đầy đủ các bộ phận, núm nút điều chỉnh, núm thiết lập tốc độ và phụ kiện cần thiết;
- Màn hình chỉ thị phải rõ nét, đọc được dễ dàng.

### 7.2. Kiểm tra kỹ thuật

Phải kiểm tra kỹ thuật DUT theo các yêu cầu sau:

#### 7.2.1. Kiểm tra chung

- Kiểm tra trực quan tính toàn vẹn của lưới giỏ trước khi sử dụng;
- Kiểm tra xem giỏ và mái chèo có bị hư hỏng không trước khi sử dụng. Phải ngừng sử dụng và loại bỏ các giỏ bị biến dạng hoặc mái chèo không sử dụng được;
- Kiểm tra các bình trong khi hạ thấp cụm mái chèo hoặc giỏ;
- Các bộ phận cơ cấu quay phải có kết cấu chắc chắn, không rơ, kẹt;
- Các đầu kết nối điện phải chắc chắn, không bị lỏng;
- Kiểm tra và lắp mái chèo hoặc giỏ vào các dụng cụ vào các vị trí tương ứng;
- Cấp điện, thiết lập tốc độ vòng quay thì DUT phải hoạt động bình thường.

#### 7.2.2. Kiểm tra độ lệch tâm của mái chèo/rổ

- Cố định thiết bị định tâm vào bình sao cho kim chỉ vừa chạm vào trục mái chèo;
- Xoay thiết bị bằng cả hai tay quanh trục mái chèo trong bình (Hình 1);
- Đảm bảo rằng tấm đáy không bị nhấc ra khỏi bình hoặc tiếp xúc đúng cách với bình;
- Dừng xoay khi con trỏ bắt đầu di chuyển theo hướng ngược lại;
- Đảm bảo vị trí đảo ngược của con trỏ đúng bằng cách xoay thiết bị theo hướng ngược lại;
- Ghi lại giá trị của kim chỉ tại điểm này, tức là điểm lệch lớn nhất ở một bên;
- Bắt đầu xoay thiết bị xa hơn bằng cả hai tay theo hướng ban đầu;
- Lưu ý độ lệch tối đa của con trỏ;
- Sự khác biệt giữa hai giá trị độ lệch chia cho hai sẽ cho ra giá trị độ lệch tâm của mái chèo/rổ;
- Lặp lại quy trình này cho tất cả các mái chèo hoặc giỏ còn lại;
- Ghi lại các số đọc vào giao thức hiệu chuẩn;
- **Tiêu chuẩn chấp nhận:** tâm mái chèo/giỏ: ≤ 2,0 mm.

*(Hình 1–7 minh họa các bước đo trong bản gốc — không tái tạo lại trong bản chuyển đổi này, xem bản PDF gốc.)*

#### 7.2.3. Kiểm tra độ lắc của mái chèo/giỏ

- Đảm bảo trục mái chèo hoặc giỏ được siết chặt với trục quay;
- Nâng máy khuấy lên mức thích hợp sao cho đầu cánh khuấy chạm tới điểm kim đo của đồng hồ đo (Hình 2);
- Cố định thiết bị định tâm trên tàu sao cho kim chỉ vừa chạm vào trục mái chèo (Hình 3);
- Bắt đầu quay trục mái chèo/giỏ;
- Kiểm tra độ lệch tối đa của kim chỉ của thiết bị ở cả hai phía của "0" và thêm giá trị đọc;
- Lặp lại quy trình này với phần mái chèo hoặc thân giỏ còn lại;
- Ghi lại các số đọc vào biên bản hiệu chuẩn;
- **Tiêu chuẩn chấp nhận:** giới hạn độ rung lắc của trục mái chèo/rổ: ≤ ± 2 mm.

#### 7.2.4. Kiểm tra khoảng cách từ mép dưới của giỏ/chèo đến bề mặt bên trong thấp nhất của bình

- Đổ hết nước trong bình ra và giữ nguyên ở vị trí tương ứng mà không cần nắp;
- Kẹp chặt tất cả các bình bằng giá đỡ có sẵn trên đĩa đựng;
- Hạ thấp bộ phận khuấy xuống vị trí thấp nhất cho đến khi nó tự động dừng lại;
- Cắm thước đo độ sâu vào bên trong bình theo chiều thẳng đứng (Hình 4);
- Giữ thước đo độ sâu theo chiều thẳng đứng bằng cả hai tay ép sao cho phần uốn cong hình chữ "V" ôm lấy trục mái chèo (Hình 5);
- Chạm vào hàm tham chiếu của thước đo độ sâu ở mặt dưới của mái chèo (Hình 5);
- Thả tay ra và đảm bảo phần dưới của hàm chạm vào đáy bình;
- Lưu ý cách đọc thang đo Vernier và thang đo chính (Hình 6 và 7);
- Ghi lại quan sát vào giao thức hiệu chuẩn;
- Lặp lại quy trình này với phần tàu còn lại có mái chèo hoặc giỏ;
- **Tiêu chuẩn chấp nhận:** 25 ± 2 mm.

### 7.3. Kiểm tra đo lường

#### 7.3.1. Kiểm tra độ chính xác tốc độ vòng quay

DUT phải được kiểm tra độ chính xác tốc độ vòng quay tại ít nhất 3 điểm được phân bố đều, việc kiểm tra được thực hiện theo trình tự yêu cầu sau đây:

- Dán một mảnh giấy phản quang kim loại nhỏ vào trục mái chèo/rổ. Tập trung ánh sáng của máy đo tốc độ vào giấy bằng cách nhấn nút bên của thiết bị;
- Thiết lập điểm kiểm tra tốc độ vòng quay trên DUT;
- Chọn chế độ đo tốc độ vòng quay Photo-Tachometer trên máy đo tốc độ vòng quay chuẩn;
- Chiếu ánh sáng từ máy đo tốc độ vào giấy và để yên;
- Nhấn nút đo và hướng chùm sáng phát ra từ máy đo tốc độ vòng quay chuẩn tới tấm dán phản quang được dán trên thành mặt ngoài của trục quay hoặc trên thiết diện mặt cắt của trục quay của DUT;
- Khi giá trị tốc độ vòng quay đo được trên màn hình LCD của máy đo tốc độ vòng quay chuẩn ổn định (khoảng một hoặc hai phút), đọc kết quả đo tốc độ vòng quay được hiển thị trên màn hình;
- Đo lặp tối thiểu 5 lần tại mỗi điểm tốc độ vòng quay kiểm tra trên DUT;
- Ghi các kết quả đo tốc độ vòng quay vào biên bản hiệu chuẩn ở Phụ lục 1;
- Sai số giữa giá trị tốc độ vòng quay cài đặt trên máy với PTĐ chuẩn được tính theo công thức:

$$
\Delta V = v_{tb} - v_{ch} \tag{1}
$$

  Trong đó: `v_ch`: giá trị trung bình của chuẩn, vòng/phút (rpm); `v_tb`: giá trị trung bình tốc độ cài đặt trên máy, vòng/phút (rpm).

- Thực hiện tương tự như trên đối với từng điểm đo còn lại.

#### 7.3.2. Kiểm tra độ chính xác nhiệt độ môi trường trong bình thử

- Đổ nước cất vào mỗi bình thử độ hòa tan;
- Đặt dây nhiệt vào các bình của máy thử đo hòa tan;
- Cài đặt nhiệt độ hoạt động của thiết bị ở 37 °C (hoặc theo yêu cầu của đơn vị sử dụng). Đồng thời, cài đặt tốc độ vòng quay tại 50 vòng/phút và để các dụng cụ đạt được nhiệt độ đã đặt;
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

#### 7.3.3. Kiểm tra độ chính xác đồng hồ thời gian

- Cài đặt thời gian vận hành của thiết bị lần lượt là (30; 45; 60) phút hoặc theo chế độ chạy thực tế và nhu cầu của khách hàng;
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

#### 7.3.4. Kiểm tra độ hòa tan

- Điều kiện thử, phương pháp định lượng, giới hạn hàm lượng hoạt chất hòa tan được tiến hành theo giấy chứng nhận của viên chuẩn Prednisone;
- Tiến hành vận hành máy và cài đặt máy theo đúng thông số sau:
  - Kiểm tra số lô hiện tại của viên thuốc có hiệu chuẩn thiết bị hòa tan theo USP;
  - Đổ 500 mL nước khử khí vào mỗi bình và duy trì nhiệt độ ở mức (37 ± 0,5) °C;
  - Cài đặt thời gian: 30 phút;
  - Cài đặt tốc độ khuấy: 50 vòng/phút;
  - Bỏ vào mỗi bình một viên thuốc. Đối với DUT có từ 12 bình thì sẽ thực hiện 1 lần mỗi bình 1 viên. Đối với DUT dưới 12 bình sẽ tiến hành thực hiện tối thiểu 2 lần, mỗi lần 1 viên;
- Lắp giỏ quay/cánh khuấy vào trục quay (thử bằng cánh khuấy hoặc giỏ quay theo yêu cầu của khách hàng). Chạy thiết bị trong thời gian đã đặt;
- Mỗi bình lấy một mẫu 10 mL và lọc qua bộ lọc 0,45 micron. Sau đó đo độ hấp thụ ở bước sóng 242 nm bằng thiết bị quang phổ tử ngoại khả kiến (UV/Vis);
- Ghi các kết quả vào biên bản hiệu chuẩn ở Phụ lục 1.

> *Ghi chú:* Đối với thiết bị quang phổ tử ngoại khả kiến (UV/Vis) trước khi thực hiện đo kết quả phải xây dựng đường chuẩn Prednisone để xác định hàm lượng hoạt chất prednisone hòa tan, từ đó tính được phần trăm (%) hòa tan (chi tiết quy trình dựng đường chuẩn tại Phụ lục 2).

### 7.4. Tính toán độ không đảm bảo đo

**Nguồn của độ không đảm bảo:** Độ không đảm bảo đo tốc độ vòng quay bao gồm các nguồn ĐKĐB từ thiết bị chuẩn và thiết bị cần hiệu chuẩn.

**Xác định các độ không đảm bảo đo thành phần:** Các nguồn gây ra độ không đảm bảo đo:

- Độ không đảm bảo kiểu A của DUT do đo lặp;
- Độ không đảm bảo kiểu B do độ phân giải thiết lập của DUT;
- Độ không đảm bảo kiểu B của máy đo vận tốc vòng quay chuẩn;
- Độ không đảm bảo kiểu B do năng lực, kinh nghiệm của nhân viên (trên thực tế được coi là rất nhỏ).

*(Bản gốc có sơ đồ "Biểu đồ xương cá nguyên nhân - kết quả" minh họa các nguồn ĐKĐB nêu trên — không tái tạo lại trong bản chuyển đổi này.)*

#### 7.4.1. ĐKĐB thông số tốc độ vòng quay

##### 7.4.1.1. ĐKĐB từ PTĐ chuẩn

**a) Độ không đảm bảo kiểu A do độ phân tán của PTĐ chuẩn**

- Tính giá trị tốc độ vòng quay trung bình `v̄_ch` đo được tại điểm kiểm tra:

$$
v_{ch} = \frac{1}{n}\sum_{j=1}^{n} v_j \tag{5}
$$

  Trong đó: `v_ch`: giá trị trung bình của chuẩn, vòng/phút (rpm); `v_j`: giá trị của chuẩn tại lần thứ j, vòng/phút (rpm); `n`: tổng số lần đo.

- Tính độ lệch chuẩn thực nghiệm (độ phân tán kết quả đo):

$$
s(V_{ch}) = \sqrt{\frac{\sum_1^n (V_{chj} - \bar{V}_{ch})^2}{n-1}}\ \text{, rpm} \tag{6}
$$

- Tính độ không đảm bảo `u_A` do đo lặp n lần (độ lệch chuẩn thực nghiệm của trung bình):

$$
u_{A1} = \sqrt{\frac{\sum_1^n (V_{cj} - \bar{V}_c)^2}{n(n-1)}}\ \text{, rpm} \tag{7}
$$

**b) ĐKĐB kiểu B của PTĐ chuẩn**

$$
u_{B1} = \frac{U_r}{k}\ \text{, rpm} \tag{8}
$$

Trong đó: `u_B1`: ĐKĐB chuẩn tuyệt đối của máy đo tốc độ vòng quay chuẩn, rpm; `U_r`: ĐKĐB mở rộng tuyệt đối của máy đo tốc độ vòng quay chuẩn được lấy từ giấy chứng nhận hiệu chuẩn, rpm; `k`: hệ số phủ của ĐKĐB mở rộng tuyệt đối của máy đo tốc độ vòng quay chuẩn được lấy từ giấy chứng nhận hiệu chuẩn.

**c) ĐKĐB do độ phân giải của chuẩn**

$$
u_{B2} = \frac{A \times d}{\sqrt{3}}\ \text{, rpm} \tag{9}
$$

Trong đó: `u_B2`: độ không đảm bảo đo tuyệt đối do độ phân giải thiết lập tốc độ vòng quay của chuẩn, rpm; `A`: độ phân giải thiết lập tốc độ vòng quay trên chuẩn, rpm; `d`: hệ số có giá trị d = 1/2 đối với bộ chỉ thị hiện số, 1/10 đối với bộ chỉ thị tương tự.

##### 7.4.1.2. ĐKĐB từ DUT

**a) Độ không đảm bảo kiểu A do độ phân tán của DUT**

- Tính giá trị tốc độ vòng quay trung bình `V̄_tb` đo được tại điểm kiểm tra:

$$
\bar{V}_{tb} = \frac{\sum_1^n V_{tbi}}{n}\ \text{, rpm} \tag{10}
$$

  Trong đó: `n`: số lần đo lặp tại 1 điểm tốc độ vòng quay kiểm tra; `V_tbi`: tốc độ vòng quay của DUT đo được ở lần đo thứ i, rpm; `V̄_tb`: tốc độ vòng quay trung bình của DUT đo được tại điểm kiểm tra.

- Tính độ lệch chuẩn thực nghiệm (độ phân tán kết quả đo):

$$
s(V_{tb}) = \sqrt{\frac{\sum_1^n (V_{tbj} - \bar{V}_{tb})^2}{n-1}}\ \text{, rpm} \tag{11}
$$

- Tính độ không đảm bảo `u_A` do đo lặp n lần:

$$
u_{A2} = \sqrt{\frac{\sum_1^n (V_{tbj} - \bar{V}_{tb})^2}{n(n-1)}}\ \text{, rpm} \tag{12}
$$

**b) ĐKĐB do độ phân giải của DUT**

$$
u_{B3} = \frac{A \times d}{\sqrt{3}}\ \text{, rpm} \tag{13}
$$

Trong đó: `u_B3`: độ không đảm bảo đo tuyệt đối do độ phân giải thiết lập tốc độ vòng quay của DUT, rpm; `A`: độ phân giải thiết lập tốc độ vòng quay trên DUT, rpm; `d`: hệ số có giá trị d = 1/2 đối với bộ chỉ thị hiện số, 1/10 đối với bộ chỉ thị tương tự.

##### 7.4.1.3. Độ không đảm bảo đo tổng hợp

$$
u_c = \sqrt{u_{ch1}^2 + u_{ch2}^2 + u_{bk1}^2 + u_{bk2}^2 + u_{bk3}^2 + u_{bk4}^2} \tag{14}
$$

> *Ghi chú:* cùng nhận xét như tại `ETV.MCS 04`/`05` — ký hiệu trong công thức (14) của bản gốc không khớp trực tiếp với `u_A1, u_A2, u_B1, u_B2, u_B3` vừa định nghĩa. Giữ nguyên văn.

##### 7.4.1.4. Độ không đảm bảo đo mở rộng

$$
U = k \times u_c(V_{DUT})\ \text{, rpm} \tag{15}
$$

Trong đó: `u_c(V_DUT)`: ĐKĐB tổng hợp của tốc độ vòng quay của DUT, rpm; `k`: hệ số phủ, có giá trị bằng 2, ứng với xác suất tin cậy 95 %.

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

[^xj]: Bản gốc ghi nhầm "𝑥𝑗: Nhiệt độ trung bình tại điểm kiểm tra..." — cùng lỗi sao chép từ mục 7.4.2 như tại `ETV.MCS 04`/`05`. Về bản chất đây là đại lượng thời gian.

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

$$
u_{xc} = \sqrt{u_{xch1}^2 + u_{xch2}^2 + u_{xbk1}^2 + u_{xbk2}^2} \tag{37}
$$

##### 7.4.3.4. Độ không đảm bảo đo mở rộng

$$
U_{95} = k \times u_c \tag{38}
$$

Với k = 2 là hệ số bao phủ tương ứng với mức độ tin cậy 95 % C.L.

#### 7.4.4. ĐKĐB độ hòa tan

Công thức tổng quát tính độ hòa tan viên thuốc:

$$
T\% = \frac{A_t}{A_s} \times \frac{W_s}{Dose} \times D \times P \times R \times F_{DS} \times 100 \tag{39}
$$

Trong đó:

- `A_t`: độ hấp thụ của dung dịch thử (Abs);
- `A_s`: độ hấp thụ của dung dịch chuẩn (Abs);
- `W_s`: khối lượng của chuẩn (mg);
- `Dose`: khối lượng (liều lượng) danh định (mg);
- `P`: độ tinh khiết của chất chuẩn (%);
- `D`: hệ số pha loãng;
- `R`: hệ số từ độ chính xác của phương pháp;
- `F_DS`: hệ số từ hệ thống hòa tan.

Từ công thức tổng quát (39), ta có ĐKĐB tổng hợp của độ hòa tan viên thuốc như sau:

$$
u_T = T \sqrt{\frac{u_{At}^2}{A_t^2} + \frac{u_{Ast}^2}{A_{st}^2} + \frac{u_{Wst}^2}{W_{st}^2} + \frac{u_{dose}^2}{dose^2} + \frac{u_P^2}{P^2} + \frac{u_D^2}{D^2} + \frac{u_R^2}{R^2} + \frac{u_{FDS}^2}{F_{DS}^2}} \tag{40}
$$

Trong đó, các thành phần độ không đảm bảo đo:

##### 7.4.4.1. ĐKĐB từ đo độ hấp thụ của dung dịch thử bằng thiết bị đo quang, u_At

$$
u_{At} = \sqrt{u_{At,straylight}^2 + u_{At,Linear}^2 + u_{At,Acc}^2 + u_{At,std}^2} \tag{41}
$$

hoặc:

$$
u_{At} = \sqrt{\frac{U_{At}^2}{k^2} + u_{At,std}^2} \tag{42}
$$

Trong đó:

- `u_At,straylight`: ĐKĐB từ ánh sáng lạc được lấy theo công bố của hãng;
- `u_At,Linear`: ĐKĐB từ độ tuyến tính của bộ quang được lấy theo công bố của hãng;
- `u_At,Acc`: ĐKĐB từ độ chính xác của bộ quang được lấy theo công bố của hãng;
- `u_At,std`: ĐKĐB từ độ tản mạn của kết quả đo bằng dung dịch thử;
- `U_At`: ĐKĐB mở rộng của PTĐ quang phổ tử ngoại khả kiến, lấy từ giấy chứng nhận hiệu chuẩn.

##### 7.4.4.2. ĐKĐB từ đo độ hấp thụ của dung dịch chuẩn bằng thiết bị đo quang, u_Ast (Abs)

$$
u_{Ast} = \sqrt{u_{Ast,straylight}^2 + u_{Ast,Linear}^2 + u_{Ast,Acc}^2 + u_{Ast,std}^2} \tag{43}
$$

hoặc:

$$
u_{Ast} = \sqrt{\frac{U_{Ast}^2}{k^2} + u_{Ast,std}^2} \tag{44}
$$

Trong đó:

- `u_Ast,straylight`: ĐKĐB từ ánh sáng lạc được lấy theo công bố của hãng;
- `u_Ast,Linear`: ĐKĐB từ độ tuyến tính của bộ quang được lấy theo công bố của hãng;
- `u_Ast,Acc`: ĐKĐB từ độ chính xác của bộ quang được lấy theo công bố của hãng;
- `u_Ast,std`: ĐKĐB từ độ tản mạn của kết quả đo bằng dung dịch chuẩn;
- `U_Ast`: ĐKĐB mở rộng của PTĐ quang phổ tử ngoại khả kiến, lấy từ giấy chứng nhận hiệu chuẩn.

##### 7.4.4.3. ĐKĐB từ khối lượng của chuẩn, u_Wst (mg)

$$
u_{Wst} = \frac{U_{Wst}}{k} \tag{45}
$$

`U_Wst`: ĐKĐB mở rộng của cân viên thuốc thử, lấy từ giấy chứng nhận hiệu chuẩn.

##### 7.4.4.4. ĐKĐB từ độ tinh khiết của chất chuẩn, u_P (mg)

$$
u_P = \frac{(1-P)}{100\sqrt{3}} \tag{46}
$$

`P`: độ tinh khiết của chất chuẩn.

##### 7.4.4.5. ĐKĐB từ hệ thống hòa tan, u_DS (%)

Hệ thống hòa tan gồm các thành phần như nhiệt độ, tốc độ vòng quay, thời gian hòa tan. Do vậy, ĐKĐB hệ thống hòa tan cụ thể như sau:

$$
u_{DS} = \sqrt{u_v^2 + u_t^2 + u_x^2} \tag{47}
$$

##### 7.4.4.6. ĐKĐB từ pha loãng mẫu chuẩn, u_D (%) — chỉ áp dụng khi có pha loãng mẫu chuẩn

$$
u_C = \sqrt{u_A^2 + u_{Ci}^2} \tag{48}
$$

Các thành phần độ không đảm bảo đo:

| TT    | Tên yếu tố ảnh hưởng                                        | Ký hiệu    | Đơn vị | Công thức tính                                                                                                                                     |
| ----- | -------------------------------------------------------------- | ------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | Độ lặp lại của PTĐ                                              | `u_A`        | mg/L   | `u_A = s(C) / √n`                                                                                                                                    |
| 2     | ĐKĐB đo của dung dịch chuẩn gốc 1000 mg/L (theo giấy chứng nhận) | `u_C0`       | mg/L   | `u_C0 = a / k`                                                                                                                                       |
| 3     | ĐKĐB đo của dung dịch chuẩn thứ i                                | `u_Ci`       | mg/L   | (xem công thức bên dưới)                                                                                                                              |
| 3.1   | ĐKĐB đo gây nên bởi pipet                                       | `u_pipet`    | —      | `u_pipet = √(u_calp² + u_temp²)`                                                                                                                     |
| 3.1.1 | ĐKĐB đo gây nên bởi pipet dùng để pha loãng dung dịch chuẩn      | `u_calp`     | mL     | `u_calp = d / k` — pipet có thể tích Vpipet và ĐKĐB là d với hệ số phủ theo giấy chứng nhận (k=2)                                                    |
| 3.1.2 | ĐKĐB đo do giãn nở nhiệt                                        | `u_temp`     | —      | `u_temp = (Vpipet × γ × Δi) / √3` — γ: hệ số dãn nở/°C; Δi: sai lệch nhiệt độ so với 20 °C; T: nhiệt độ môi trường thí nghiệm                        |
| 3.2   | ĐKĐB đo gây ra bởi bình định mức để pha loãng dung dịch chuẩn   | `u_flask`    | —      | `u_flask = √(u_calf² + u_per² + u_temp²)`                                                                                                            |
| 3.2.1 | ĐKĐB đo gây ra bởi bình định mức để pha loãng dung dịch chuẩn   | `u_calf`     | mL     | `u_calf = e / k` — bình định mức có thể tích Vflask và ĐKĐB là e với hệ số phủ k theo giấy chứng nhận (k=2)                                          |
| 3.2.2 | ĐKĐB đo do thao tác của nhân viên thực hiện                     | `u_per`      | mL     | `u_per = 0,03 / √3` — sai số do thao tác (sai số do dư hoặc thiếu ở giọt cuối cùng được tính xấp xỉ ± 0,03 mL)                                       |
| 3.2.3 | ĐKĐB đo do giãn nở nhiệt                                        | `u_temp`     | —      | `u_temp = (Vflask × γ × Δi) / √3` — γ: hệ số dãn nở/°C; Δi: sai lệch nhiệt độ so với 20 °C; T: nhiệt độ môi trường thí nghiệm                        |

Độ không đảm bảo đo của dung dịch chuẩn thứ i (pha loãng lần thứ i):

$$
u_{Ci} = C_i \times \sqrt{\left(\frac{u_{flask}}{V_{flask}}\right)^2 + \left(\frac{u_{pipet}}{V_{pipet}}\right)^2 + \left(\frac{u_{Ci-1}}{C_{i-1}}\right)^2}\ \text{(mg/L)}
$$

Trong đó: `C_i-1`: là nồng độ của chất chuẩn i-1 (mg/L), i = 1,…,i; `C_i`: là nồng độ chất chuẩn Ci (mg/L).

##### 7.4.4.7. Độ không đảm bảo đo mở rộng

Độ không đảm bảo đo mở rộng (U95) là đại lượng xác định miền giá trị phân bố bao quanh kết quả đo:

$$
U_{95} = k \times u_T
$$

Với k = 2 là hệ số bao phủ tương ứng với mức độ tin cậy 95 % C.L.

## 8. Xử lý chung

- **8.1.** DUT sau khi hiệu chuẩn được dán tem, cấp giấy chứng nhận hiệu chuẩn kèm theo kết quả hiệu chuẩn.
- **8.2.** DUT không đáp ứng một trong các yêu cầu trong mục 7 thì thực hiện các biện pháp khắc phục như hiệu chỉnh lại, sửa chữa, thay thế, v.v., sau đó thực hiện lại mục 7. Trong trường hợp không khắc phục được thì DUT sẽ không được dán tem và cấp giấy chứng nhận hiệu chuẩn, nhưng ghi kết quả đo vào biên bản hiệu chuẩn, đồng thời thông báo với khách hàng để có cách giải quyết thích hợp.
- **8.3.** Chu kỳ hiệu chuẩn được khuyến nghị là 12 tháng.

## PHỤ LỤC 1 — BIÊN BẢN HIỆU CHUẨN PHƯƠNG TIỆN ĐO ĐỘ HÒA TAN

Số GCN: … — Số tem: … — Số PNT: …

**I. Thông tin chung:** Tên đối tượng, Kiểu, Số hiệu, Mã quản lý, Hãng sản xuất, Năm sản xuất, Đơn vị sử dụng, Đặc trưng kỹ thuật (phạm vi đo, độ phân giải, độ chia vạch, khoảng cách vạch chia, điểm hiệu chuẩn, ghi chú).

**II. Thông tin hiệu chuẩn:** Phương pháp hiệu chuẩn `ETV.MCS …`; bảng mẫu chuẩn (mã quản lý, hãng/nước sản xuất, diễn giải, hiệu lực hiệu chuẩn, liên kết chuẩn); điều kiện môi trường (nhiệt độ, độ ẩm, áp suất); địa điểm hiệu chuẩn (PTN/Hiện trường).

**III. Kiểm tra kỹ thuật:** lắp ráp/đấu nối, vận hành, kiểm tra trạng thái hoạt động (Bình thường/Không bình thường).

**IV. Kiểm tra đo lường:**

- *4.1. Kiểm tra tốc độ vòng quay* — 7 điểm hiệu chuẩn (rpm), mỗi điểm đo 5 lần, ghi trung bình/sai số đo.
- *4.2. Kiểm tra nhiệt độ bình thử* — 8 điểm hiệu chuẩn (°C), mỗi điểm đo 5 lần, ghi trung bình/sai số đo.
- *4.3. Kiểm tra đồng hồ thời gian* — 5 điểm hiệu chuẩn (phút), mỗi điểm đo 3 lần, ghi trung bình/sai số đo.
- *4.4. Kiểm tra độ hòa tan* — 5 điểm hiệu chuẩn (phút, rpm), mỗi điểm đo 3 lần, ghi trung bình/sai số đo.

Người kiểm tra — Người thực hiện.

## PHỤ LỤC 2 — XÂY DỰNG ĐƯỜNG CHUẨN TRÊN THIẾT BỊ QUANG PHỔ TỬ NGOẠI KHẢ KIẾN

### 1. Chuẩn bị

- Đổ 500 mL nước khử khí vào mỗi bình và duy trì nhiệt độ ở mức (37 ± 0,5) °C;
- Cài đặt thời gian: 30 phút;
- Cài đặt tốc độ khuấy: 50 vòng/phút;
- **Dung dịch chuẩn Prednisone:** chuyển khoảng 25 mg USP Prednisone RS vào bình định mức 25,0 mL. Hòa tan trong khoảng 10 mL cồn (ethanol hoặc methanol cấp thuốc thử) với siêu âm. Sau khi làm nguội đến nhiệt độ phòng, pha loãng đến vạch bằng cồn;
- Pha loãng dung dịch gốc 5,0 mL trong 500,0 mL bằng nước tinh khiết để thu được nồng độ cuối cùng khoảng 0,01 mg/mL.

### 2. Xây dựng đường chuẩn

- Thực hiện phép đo UV ở bước sóng hấp thụ tối đa. Đối với Prednisone, sử dụng 242 nm;
- Độ hấp thụ của dung dịch được đo trong một cell thạch anh có chiều dài đường đi 1,0 cm. Sử dụng định luật Beer, các giá trị độ hấp thụ được tính toán (AU trên mg/mL) của các chuẩn làm việc và chuẩn đối chứng phải phù hợp với nhau trong phạm vi 1,0 %.

## TÀI LIỆU THAM KHẢO

*(bản gốc để trống — không có tài liệu tham khảo được liệt kê)*
