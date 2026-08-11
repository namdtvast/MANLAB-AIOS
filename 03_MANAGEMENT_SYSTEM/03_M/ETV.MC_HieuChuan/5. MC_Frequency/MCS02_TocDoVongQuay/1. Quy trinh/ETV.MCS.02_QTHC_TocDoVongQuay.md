---
id: ETV.MCS 02
title: "Máy tốc độ vòng quay — Quy trình hiệu chuẩn"
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
keywords: [tốc độ vòng quay, speedometer, rpm, máy ly tâm, tachometer, hiệu chuẩn]
related_documents: []
iso_clause: ["ISO/IEC 17025:2017"]
legal_basis: ["ĐLVN 113:2003", "ĐLVN 165:2005", "ĐLVN 131:2004"]
ai_tags: [calibration-procedure, rotation-speed, tachometer, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCS 02_Toc do vong quay_V7.pdf`"
supersedes: "ETV.MCS 02 lần ban hành 02 (22/04/2019, bổ sung 25/11/2021, cập nhật 22/04/2023)"
superseded_by: null
---
# MÁY TỐC ĐỘ VÒNG QUAY – QUY TRÌNH HIỆU CHUẨN

*Speedometer machine – Calibration Procedure*

|                   |                     |
| ----------------- | ------------------- |
| **Mã số**         | ETV.MCS 02          |
| **Lần ban hành**  | 03                  |
| **Ngày ban hành** | 22/04/2026          |
| **Biên soạn**     | *(bản gốc để trống)* |
| **Soát xét**      | Trần Thị Hoa        |
| **Phê duyệt**     | Nguyễn Hoàng Giang  |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCS 02_Toc do vong quay_V7.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khối chữ ký trong bản gốc để trống, chưa có tên người biên soạn.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian  | Nội dung thay đổi                                    | Lần ban hành |
| ---------- | ------------------------------------------------------ | ------------ |
| 22/04/2019 | Ban hành lần thứ nhất                                   | 01           |
| 25/11/2021 | Bổ sung PTĐ cô quay chân không                          | 01           |
| 22/04/2023 | Bổ sung, cập nhật nội dung theo ý kiến chuyên gia đánh giá lại | 02   |
| 22/04/2026 | Ban hành lần thứ hai [^lanbanhanh]                      | 03           |

[^lanbanhanh]: Bản gốc ghi "Ban hành lần thứ hai" ở dòng ứng với lần ban hành số 03 trong cột "Lần ban hành" — có thể là lỗi đánh số thứ tự lần ban hành trong bản gốc (03 lần thay đổi số/03 lần ban hành nhưng dòng cuối vẫn ghi "lần thứ hai"). Giữ nguyên văn.

---

## 1. Phạm vi áp dụng

Văn bản kỹ thuật này quy định quy trình hiệu chuẩn các máy tốc độ vòng quay (máy ly tâm; máy xác định độ hòa tan, máy xác định độ tan rã, máy tách nước, máy xác định độ cặn lắng, cô quay chân không... chi tiết tại Phụ lục 1 của quy trình) trong phạm vi (1 ÷ 99.999) rpm với sai số không nhỏ hơn ± 2 rpm.

Quy trình này được áp dụng đối với kỹ thuật viên của Phòng Đo lường Chất lượng (sau đây gọi tắt là PTN) của Viện Kiểm định Công nghệ và Môi trường khi tiến hành hiệu chuẩn các phương tiện nói trên.

## 2. Giải thích từ ngữ

Các từ ngữ trong văn bản này được hiểu như sau:

- **Máy ly tâm:** thiết bị tạo tốc độ quay cho môi trường chất lỏng để phân tách hoặc cô đặc những phần tử lơ lửng trong chất lỏng theo nguyên lý lực ly tâm.
- **Máy đo tốc độ vòng quay kiểu không tiếp xúc:** kiểu máy đo tốc độ vòng quay có đầu đo không tiếp xúc với bộ phận quay của thiết bị tạo tốc độ vòng quay.
- **Máy đo tốc độ vòng quay kiểu tiếp xúc:** kiểu máy đo tốc độ vòng quay có đầu đo tiếp xúc với bộ phận quay của thiết bị tạo tốc độ vòng quay.
- **DUT (Device Under Test):** thiết bị cần được hiệu chuẩn.
- **PTĐ:** phương tiện đo.
- **KĐBĐ:** không đảm bảo đo.

## 3. Các phép hiệu chuẩn

Phải lần lượt tiến hành các phép kiểm tra ghi trong Bảng 1.

**Bảng 1**

| TT  | Tên phép hiệu chuẩn                                            | Theo điều, mục của quy trình |
| --- | ----------------------------------------------------------------- | -------------------------------- |
| 1   | Kiểm tra bên ngoài                                                 | 7.1                               |
| 2   | Kiểm tra kỹ thuật (kiểm tra mặt tiếp xúc; kiểm tra hoạt động bộ đếm; kiểm tra điện áp cung cấp cho máy) | 7.2 |
| 3   | Kiểm tra đo lường — xác định độ chính xác tốc độ vòng quay ở chế độ đo không tiếp xúc | 7.3.1 |
|     | — xác định độ chính xác tốc độ vòng quay ở chế độ đo tiếp xúc      | 7.3.2                             |
|     | — tính toán độ không đảm bảo đo                                   | 7.4                               |
| 4   | Xử lý chung                                                        | 8                                 |

## 4. Phương tiện hiệu chuẩn

Phương tiện hiệu chuẩn được ghi trong Bảng 2.

**Bảng 2**

| TT  | Phương tiện hiệu chuẩn              | Đặc trưng kỹ thuật                                                                                                                                                                                                                                                                                    |
| --- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Chuẩn đo lường**                    |                                                                                                                                                                                                                                                                                                              |
| 1.1 | Chuẩn đo tốc độ vòng quay hiện số     | *1. Kiểu không tiếp xúc (optical non-contact):* dải đo từ 1 đến 99.999 rpm; độ chính xác ± 0,1 % số đọc + 2 số cuối; độ phân giải 0,1 rpm khi phạm vi đo < 1.000 rpm, 1 rpm khi phạm vi đo > 1.000 rpm.<br>*2. Kiểu tiếp xúc (direct contact):* dải đo từ 1 đến 99.999 rpm; độ chính xác ± 0,1 % số đọc + 2 số cuối; độ phân giải 0,1 rpm khi phạm vi đo từ 0,5 đến 999,9 rpm, 1 rpm khi phạm vi đo > 1.000 rpm |
| 2   | **Phương tiện đo khác**               |                                                                                                                                                                                                                                                                                                              |
| 2.1 | PTĐ nhiệt độ và độ ẩm môi trường      | Dải đo: Nhiệt độ (0 ÷ 50) °C; Độ ẩm tương đối (10 ÷ 95) %RH. Độ phân giải: Nhiệt độ 1 °C; Độ ẩm 1 %RH                                                                                                                                                                                                       |

## 5. Điều kiện hiệu chuẩn

Khi tiến hành hiệu chuẩn phải đảm bảo các điều kiện sau:

- Nhiệt độ: (25 ± 5) °C;
- Độ ẩm tương đối: ≤ 80 %RH (không đọng sương).

## 6. Chuẩn bị hiệu chuẩn

Trước khi hiệu chuẩn phải thực hiện các bước sau đây:

Máy tốc độ vòng quay chuẩn và DUT phải được cấp điện và sấy máy theo điều kiện kỹ thuật và thời gian quy định của nhà sản xuất.

### 6.1. Chuẩn bị làm việc cho máy tốc độ vòng quay được hiệu chuẩn

- DUT cần được kiểm tra và được làm vệ sinh đối với trục quay, nắp kính đậy.
- DUT cần được đặt, gá cố định chắc chắn, đảm bảo giảm thiểu tối đa rung, lắc, xê dịch trong khi vận hành.
- Khi đo theo nguyên lý quang học không tiếp xúc sẽ cần phải dán tấm phản quang có diện tích khoảng 12 mm² lên thành mặt ngoài của trục quay, hoặc trên thiết diện mặt cắt của trục quay (trên 1 điểm bất kỳ theo bán kính xuyên tâm trục quay) của DUT ở vị trí thuận tiện và phù hợp để nhận chùm sáng đến từ đầu phát quang của máy đo tốc độ vòng quay chuẩn.
- Khi đo theo nguyên lý tiếp xúc cơ khí sẽ cần phải gá đầu nhọn cao su của máy tốc độ vòng quay chuẩn với tâm trục quay của DUT.

### 6.2. Chuẩn bị làm việc cho máy đo tốc độ vòng quay chuẩn

- **6.2.1.** Khi đo theo nguyên lý quang học không tiếp xúc sẽ cần phải gá lắp máy đo tốc độ vòng quay chuẩn bằng các dụng cụ chuyên dụng hoặc cầm máy bằng tay sao cho đầu thu-phát quang của máy cách tấm dán phản quang khoảng 50 mm đến 500 mm tùy thuộc vào độ sáng nền của môi trường, và sao cho đầu thu quang nhận được tín hiệu quang phản xạ mạnh và ổn định từ tấm dán phản quang.
- **6.2.2.** Khi đo theo nguyên lý tiếp xúc cơ khí sẽ cần phải gá lắp máy đo tốc độ vòng quay chuẩn hoặc cầm máy bằng tay để ép đầu quay nhọn cao su của máy tiếp xúc, với lực ép phù hợp, vào tâm trục quay của DUT (để tránh ma sát trượt). Khi này hướng trục quay DUT trùng với hướng trục quay của máy đo tốc độ vòng quay chuẩn.

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

Phải kiểm tra bên ngoài đối với DUT theo các yêu cầu sau đây:

- Máy phải có nhãn, mác ghi số máy, nơi sản xuất/nhà sản xuất;
- Máy phải đầy đủ các bộ phận, núm nút điều chỉnh, núm thiết lập tốc độ và phụ kiện cần thiết;
- Màn hình chỉ thị phải rõ nét, đọc được dễ dàng.

### 7.2. Kiểm tra kỹ thuật

Phải kiểm tra kỹ thuật DUT theo các yêu cầu sau:

- Các bộ phận cơ cấu quay phải có kết cấu chắc chắn, không rơ, kẹt;
- Các đầu kết nối điện phải chắc chắn, không bị lỏng;
- Các núm, nút, chỉ thị tốc độ vòng quay phải đảm bảo hoạt động bình thường;
- Cảm biến và bộ biến đổi tốc độ vòng quay phải hoạt động bình thường;
- Cấp điện, thiết lập tốc độ vòng quay thì DUT phải hoạt động bình thường.

### 7.3. Kiểm tra đo lường

DUT phải được kiểm tra độ chính xác tốc độ vòng quay tại ít nhất 5 điểm được phân bố đều và được khắc độ rõ ràng trên toàn bộ thang tốc độ vòng quay của máy và việc kiểm tra được thực hiện theo trình tự nội dung, phương pháp và yêu cầu theo các mục sau đây:

#### 7.3.1. Xác định độ chính xác tốc độ vòng quay ở chế độ đo không tiếp xúc

Sử dụng đầu đo không tiếp xúc. Khi điểm kiểm tra tốc độ vòng quay có giá trị từ 5 rpm đến 60.000 rpm, và khi DUT có ô kính hoặc khe hở để đầu đo quang có thể phát chùm sáng vào tấm phản quang sau đó nhận được tia sáng phản xạ từ tấm phản quang. Việc đo tốc độ được tiến hành theo trình tự sau:

- Thiết lập điểm kiểm tra tốc độ vòng quay trên DUT;
- Chọn chế độ đo tốc độ vòng quay Photo-Tachometer trên máy đo tốc độ vòng quay chuẩn;
- Nhấn nút đo và hướng chùm sáng phát ra từ máy đo tốc độ vòng quay chuẩn tới tấm dán phản quang được dán trên thành mặt ngoài của trục quay, hoặc trên thiết diện mặt cắt của trục quay của DUT;
- Khi giá trị tốc độ vòng quay đo được trên màn hình LCD của máy đo tốc độ vòng quay chuẩn ổn định (khoảng 2 giây), đọc kết quả đo tốc độ vòng quay được hiển thị trên màn hình;
- Đo lặp 5 lần tại mỗi điểm tốc độ vòng quay kiểm tra trên DUT;
- Ghi các kết quả đo tốc độ vòng quay vào biên bản hiệu chuẩn ở Phụ lục 1.

#### 7.3.2. Xác định độ chính xác tốc độ vòng quay ở chế độ đo tiếp xúc

Khi điểm kiểm tra tốc độ vòng quay có giá trị từ 0,05 rpm đến 5 rpm hoặc từ 0,05 đến 20.000 rpm, và khi có thể gá lắp đầu nhọn cao su của đầu đo tiếp xúc cơ khí với trục quay của DUT, hoặc khi buồng quay của DUT có cấu trúc kín không có ô kính hoặc không có khe hở để có thể đo tốc độ vòng quay theo nguyên lý quang học.

- Gá đầu quay nhọn cao su của máy tiếp xúc, với lực ép phù hợp, vào tâm trục quay của DUT (để tránh ma sát trượt). Khi này hướng trục quay DUT trùng với hướng trục quay của máy đo tốc độ vòng quay chuẩn;
- Thiết lập điểm kiểm tra tốc độ vòng quay trên DUT;
- Tiến hành đo lặp tại mỗi điểm kiểm tra tốc độ vòng quay 5 lần;
- Đọc giá trị tốc độ vòng quay trên máy đo tốc độ vòng quay chuẩn khi các giá trị này ổn định. Ghi lại các kết quả đo tốc độ vòng quay vào mẫu biên bản hiệu chuẩn ở Phụ lục 2.

### 7.4. Tính toán độ không đảm bảo đo

#### 7.4.1. Nguồn của độ không đảm bảo

Độ không đảm bảo đo tốc độ vòng quay bao gồm các nguồn ĐKĐB từ:

- Thiết bị chuẩn;
- Thiết bị cần hiệu chuẩn.

#### 7.4.2. Xác định các độ không đảm bảo đo thành phần

Các nguồn gây ra độ không đảm bảo đo:

- Độ không đảm bảo kiểu A của DUT do đo lặp;
- Độ không đảm bảo kiểu B do độ phân giải thiết lập tốc độ vòng quay của DUT;
- Độ không đảm bảo kiểu B của máy đo vận tốc vòng quay chuẩn;
- Độ không đảm bảo kiểu B do năng lực, kinh nghiệm của nhân viên (trên thực tế được coi là rất nhỏ).

*Biểu đồ xương cá nguyên nhân — kết quả (tóm tắt theo bản gốc):* ĐKĐB do thay đổi nhiệt độ môi trường (≈ 0), ĐKĐB do đo lặp (kiểu A), ĐKĐB do các nguồn khác (≈ 0), ĐKĐB do độ phân giải (kiểu B), ĐKĐB máy tốc độ vòng quay chuẩn (kiểu B), ĐKĐB do nhân viên hiệu chuẩn (≈ 0) → hội tụ về ĐKĐB tổng hợp của quá trình đo.

### 7.5. Tính độ không đảm bảo đo

#### 7.5.1. ĐKĐB từ thiết bị chuẩn

**a) Độ không đảm bảo kiểu A do độ phân tán của chuẩn**

- Tính giá trị tốc độ vòng quay trung bình `V̄c` đo được tại điểm kiểm tra:

  $$
  \bar{V}_c = \frac{\sum_1^n V_{ci}}{n}\ \text{, rpm} \tag{1}
  $$

  Trong đó: `n`: số lần đo lặp tại 1 điểm tốc độ vòng quay kiểm tra; `V_ci`: tốc độ vòng quay của chuẩn đo được ở lần đo thứ i, rpm; `V̄c`: tốc độ vòng quay trung bình của chuẩn đo được tại điểm kiểm tra.

- Tính độ lệch chuẩn thực nghiệm (độ phân tán kết quả đo):

  $$
  s(V_c) = \sqrt{\frac{\sum_1^n (V_{ci} - \bar{V}_c)^2}{n-1}}\ \text{, rpm} \tag{2}
  $$

- Tính độ không đảm bảo `u_A` do đo lặp n lần (độ lệch chuẩn thực nghiệm của trung bình):

  $$
  u_{A1} = \sqrt{\frac{\sum_1^n (V_{ci} - \bar{V}_c)^2}{n(n-1)}}\ \text{, rpm} \tag{3}
  $$

**b) ĐKĐB của phương tiện đo tốc độ vòng quay chuẩn**

$$
u_{B1} = \frac{U_r}{k}\ \text{, rpm} \tag{4}
$$

Trong đó: `u_B1`: ĐKĐB chuẩn tuyệt đối của máy đo tốc độ vòng quay chuẩn, rpm; `U_r`: ĐKĐB mở rộng tuyệt đối của máy đo tốc độ vòng quay chuẩn được lấy từ giấy chứng nhận hiệu chuẩn, rpm; `k`: hệ số phủ của ĐKĐB mở rộng tuyệt đối của máy đo tốc độ vòng quay chuẩn được lấy từ giấy chứng nhận hiệu chuẩn.

**c) ĐKĐB do độ phân giải của chuẩn**

$$
u_{B2} = \frac{A \times d}{\sqrt{3}}\ \text{, rpm} \tag{5}
$$

Trong đó: `u_B2`: độ không đảm bảo đo tuyệt đối do độ phân giải thiết lập tốc độ vòng quay của chuẩn, rpm; `A`: độ phân giải thiết lập tốc độ vòng quay trên chuẩn, rpm; `d`: hệ số có giá trị d = 1/2 đối với bộ chỉ thị hiện số, 1/10 đối với bộ chỉ thị tương tự.

#### 7.5.2. ĐKĐB từ phương tiện đo tốc độ vòng quay cần hiệu chuẩn (DUT)

**a) Độ không đảm bảo kiểu A do độ phân tán của DUT**

- Tính giá trị tốc độ vòng quay trung bình `V̄_tb` đo được tại điểm kiểm tra:

  $$
  \bar{V}_{tb} = \frac{\sum_1^n V_{tbi}}{n}\ \text{, rpm} \tag{6}
  $$

  Trong đó: `n`: số lần đo lặp tại 1 điểm tốc độ vòng quay kiểm tra; `V_tbi`: tốc độ vòng quay của DUT đo được ở lần đo thứ i, rpm; `V̄_tb`: tốc độ vòng quay trung bình của DUT đo được tại điểm kiểm tra.

- Tính độ lệch chuẩn thực nghiệm (độ phân tán kết quả đo):

  $$
  s(V_{tb}) = \sqrt{\frac{\sum_1^n (V_{tbi} - \bar{V}_{tb})^2}{n-1}}\ \text{, rpm} \tag{7}
  $$

- Tính độ không đảm bảo `u_A` do đo lặp n lần (độ lệch chuẩn thực nghiệm của trung bình):

  $$
  u_{A2} = \sqrt{\frac{\sum_1^n (V_{tbi} - \bar{V}_{tb})^2}{n(n-1)}}\ \text{, rpm} \tag{8}
  $$

**b) ĐKĐB do độ phân giải của DUT**

$$
u_{B3} = \frac{A \times d}{\sqrt{3}}\ \text{, rpm} \tag{9}
$$

Trong đó: `u_B3`: độ không đảm bảo đo tuyệt đối do độ phân giải thiết lập tốc độ vòng quay của DUT, rpm; `A`: độ phân giải thiết lập tốc độ vòng quay trên DUT, rpm; `d`: hệ số có giá trị d = 1/2 đối với bộ chỉ thị hiện số, 1/10 đối với bộ chỉ thị tương tự.

#### 7.5.3. Độ không đảm bảo đo tổng hợp

$$
u_c(V_{DUT}) = \sqrt{u_{A1}^2 + u_{A2}^2 + u_{B1}^2 + u_{B2}^2 + u_{B3}^2}\ \text{, rpm} \tag{10}
$$

#### 7.5.4. Độ không đảm bảo đo mở rộng

$$
U = k \times u_c(V_{DUT})\ \text{, rpm} \tag{11}
$$

Trong đó: `u_c(V_DUT)`: ĐKĐB tổng hợp của tốc độ vòng quay của DUT, rpm; `k`: hệ số phủ, có giá trị bằng 2, ứng với xác suất tin cậy 95 %.

#### 7.5.5. Công bố kết quả đo

Kết quả hiệu chuẩn vận tốc vòng quay của DUT được công bố như sau:

$$
V_{DUT} = \bar{V}_{DUT} \pm U\ \text{, rpm} \tag{12}
$$

Trong đó: `U`: ĐKĐB mở rộng được tính với hệ số phủ k = 2 ứng với xác suất tin cậy P = 95 %; `k`: hệ số phủ, có giá trị bằng 2, ứng với xác suất tin cậy 95 %.

## 8. Xử lý chung

- **8.1.** DUT sau khi hiệu chuẩn được dán tem, cấp giấy chứng nhận hiệu chuẩn kèm theo kết quả hiệu chuẩn.
- **8.2.** DUT không đáp ứng một trong các yêu cầu trong mục 7 thì thực hiện các biện pháp khắc phục như hiệu chỉnh lại, sửa chữa, thay thế, v.v., sau đó thực hiện lại mục 7. Trong trường hợp không khắc phục được thì DUT sẽ không được dán tem và cấp giấy chứng nhận hiệu chuẩn, nhưng ghi kết quả đo vào biên bản hiệu chuẩn, đồng thời thông báo với khách hàng để có cách giải quyết thích hợp.
- **8.3.** Chu kỳ hiệu chuẩn được khuyến nghị là 12 tháng.

## PHỤ LỤC 1 — Danh sách các máy áp dụng trong quy trình hiệu chuẩn phương tiện đo tốc độ vòng quay

| TT  | Tên máy                                                              | Yêu cầu kỹ thuật, rpm       | Sai số cho phép, rpm         |
| --- | ------------------------------------------------------------------- | ---------------------------- | ------------------------------ |
| 1   | Máy giặt Wascator                                                    | (500 ÷ 1.100)                 | ± 20                            |
| 2   | Máy đo độ mài mòn Martindale                                         | 47,5 (trục A, C); 44,5 (trục B) | ± 2,5 (trục A, C); ± 2,4 (trục B) |
| 3   | Máy Dynawash                                                         | 560                            | ± 11,2                          |
| 4   | Máy giặt Whirlpool                                                   | 500; 660; 430                  | ± 20                            |
| 5   | Máy Miele                                                            | 800; 900; 1.000; 1.100; 1.200; 1.300 | ± 20                       |
| 6   | Máy ly tâm                                                           | (0 ÷ 60.000)                   | ± 5                             |
| 7   | Động cơ không điều khiển, có điều khiển và các máy tạo tốc độ vòng quay tương tự | (0 ÷ 60.000)      | ± 5                             |
| 8   | Máy xác định độ hòa tan, máy xác định độ tan rã, máy tách nước, máy xác định độ cặn lắng | (0 ÷ 60.000) | ± 5                             |

## PHỤ LỤC — BIÊN BẢN HIỆU CHUẨN PHƯƠNG TIỆN ĐO TỐC ĐỘ VÒNG QUAY

Số GCN: … — Số tem: … — Số PNT: …

**I. Thông tin chung:** Tên đối tượng, Kiểu, Số hiệu, Mã quản lý, Hãng sản xuất, Năm sản xuất, Đơn vị sử dụng, Đặc trưng kỹ thuật (phạm vi đo, độ phân giải, độ chia vạch, khoảng cách vạch chia, điểm hiệu chuẩn, ghi chú).

**II. Thông tin hiệu chuẩn:** Phương pháp hiệu chuẩn `ETV.MCS 02`; bảng mẫu chuẩn (mã quản lý, hãng/nước sản xuất, diễn giải, hiệu lực hiệu chuẩn, liên kết chuẩn); điều kiện môi trường (nhiệt độ (25 ± 5) °C, độ ẩm (40 ÷ 80) %RH, áp suất); địa điểm hiệu chuẩn (PTN/Hiện trường).

**III. Kiểm tra kỹ thuật:** lắp ráp/đấu nối, vận hành, kiểm tra trạng thái hoạt động (Bình thường/Không bình thường).

**IV. Kiểm tra đo lường:**

*4.1. Kiểu đo không tiếp xúc* — điểm hiệu chuẩn (rpm): 60; 600; 6.000; 24.000; 36.000; 48.000; 60.000, mỗi điểm đo 5 lần, ghi trung bình/sai số đo/ĐKĐBĐ (k=2, P=95%).

*4.2. Kiểu đo chớp sáng* — điểm hiệu chuẩn (rpm): 300; 600; 1.200; 3.000; 9.000; 15.000; 24.000; 30.000, mỗi điểm đo 5 lần, ghi trung bình/sai số đo/ĐKĐBĐ (k=2, P=95%).

Người kiểm tra — Người thực hiện.

## SƠ ĐỒ LIÊN KẾT CHUẨN — MÁY TỐC ĐỘ VÒNG QUAY

Chuẩn bên ngoài (VMI, ĐLQĐ,… tổ chức công nhận khác) → *quy trình hiệu chuẩn* → Thiết bị chuẩn tốc độ vòng quay (phạm vi đo (5 ~ 99.999) rpm; độ phân giải 0,1/1 rpm; U95: (0,1 ~ 2,3) rpm) → *quy trình hiệu chuẩn ETV.MCS 02* → Máy tốc độ vòng quay (máy ly tâm, máy xác định độ hòa tan, máy xác định độ tan rã, máy tách nước, máy xác định độ cặn lắng…) — (0 ~ 60.000) rpm; U95: 3,8 rpm.

## TÀI LIỆU THAM KHẢO

1. ĐLVN 113:2003 - Yêu cầu về nội dung và trình bày văn bản kỹ thuật đo lường Việt Nam.
2. ĐLVN 165:2005 - Máy đo tốc độ - Quy trình hiệu chuẩn.
3. Hướng dẫn ước lượng độ không đảm bảo đo của các dụng cụ đo lường sử dụng trong phòng thí nghiệm – Th.S Nguyễn Đăng Huy.
4. ĐLVN 131:2004 – Hướng dẫn đánh giá và trình bày độ không đảm bảo đo.
5. User's Guide Casio HS-30W.
6. Expression of the Uncertainty of Measurement in Calibration – Publication reference EA-4/02.
7. Manufacturer's Operation Manuals, User Instructions.
8. ISO/IEC 17025:2017: Yêu cầu chung về năng lực của phòng thử nghiệm và hiệu chuẩn.
9. ISO 6330:2000 Domestic washing & drying procedure for textile testing.
10. ISO 6330:2000/Amd.1:2008 Domestic washing & drying procedure for textile testing - AMENDMENT 1.
11. EN ISO 26330:1994 Domestic washing & drying procedure for textile testing.
12. BS EN ISO 6330:2001 Domestic washing & drying procedure for textile testing.
13. AATCC TM 135-2004 Dimensional Changes of Fabrics after Home Laundering.
14. AATCC TM 88b-2006 - Smoothness of Seams in Fabrics after Repeated Home Laundering.
15. AATCC Technical Manual 2010 - Standardization of Home Laundry Test Conditions.
