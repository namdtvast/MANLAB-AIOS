---
id: ETV.MCT 10
title: "Nhiệt kế thuỷ tinh — thuỷ ngân có cơ cấu cực đại — Quy trình hiệu chuẩn"
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
keywords: [nhiệt kế thủy ngân, cơ cấu cực đại, maximum thermometer, hiệu chuẩn]
related_documents: []
iso_clause: ["ISO/IEC 17025:2017"]
legal_basis: ["ĐLVN 113:2003", "ĐLVN 131:2003", "ĐLVN 159:2017"]
ai_tags: [calibration-procedure, maximum-thermometer, mercury-thermometer, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCT 10_Nhiet ke TT-TN co cau cuc dai_V2.pdf`"
supersedes: "ETV.MCT 10 lần ban hành 01 (19/05/2020)"
superseded_by: null
---
# NHIỆT KẾ THỦY TINH – THỦY NGÂN CÓ CƠ CẤU CỰC ĐẠI – QUY TRÌNH HIỆU CHUẨN

*Mercury-in-Glass Thermometers with Maximum Device – Calibration Procedure*

|                   |                     |
| ----------------- | ------------------- |
| **Mã số**         | ETV.MCT 10          |
| **Lần ban hành**  | 02                  |
| **Ngày ban hành** | 22/04/2026          |
| **Biên soạn**     | *(bản gốc để trống)* |
| **Soát xét**      | Trần Thị Hoa        |
| **Phê duyệt**     | Nguyễn Hoàng Giang  |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCT 10_Nhiet ke TT-TN co cau cuc dai_V2.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khối chữ ký trong bản gốc để trống, chưa có tên người biên soạn.
>
> *Ghi chú của bản chuyển đổi:* (1) công thức của `u_ch3` (độ đồng đều bình điều nhiệt) và `u_ch4` (độ ổn định bình điều nhiệt) trong mục 7.4.1.c/d là hình ảnh trong bản gốc, không trích xuất được thành văn bản — chỉ trích xuất được phần chú giải ký hiệu; theo cùng mẫu công thức `u = δ/√3` dùng nhất quán ở các mục khác của quy trình này và ở các quy trình MCT khác, suy đoán hợp lý là `u_ch3 = δ_dd/√3` và `u_ch4 = δ_od/√3`, nhưng đây là suy diễn của bản chuyển đổi — xem bản PDF gốc để xác nhận; (2) mã biểu mẫu tại mục 9 Phụ lục ghi "ETV.MCT.F 09.01" — có thể là lỗi đánh máy do sao chép từ `ETV.MCT 09`, đáng lẽ phải là `ETV.MCT.F 10.01`. Giữ nguyên văn.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian  | Nội dung thay đổi     | Lần ban hành |
| ---------- | ---------------------- | ------------ |
| 19/05/2020 | Ban hành lần thứ nhất  | 01           |
| 22/04/2026 | Ban hành lần thứ hai   | 02           |

---

## 1. Phạm vi áp dụng

Văn bản kỹ thuật này quy định quy trình hiệu chuẩn ban đầu đối với các loại nhiệt kế thủy tinh - thủy ngân có cơ cấu cực đại (sau đây gọi là nhiệt kế cần hiệu chuẩn) dùng để đo nhiệt độ cao nhất của môi trường trong một khoảng thời gian, phạm vi đo từ (-20 ÷ 80) °C, giá trị độ chia 0,5 °C và độ chính xác 0,5 °C.

Quy trình này áp dụng đối với nhân viên của Viện Kiểm định Công nghệ và Môi trường (sau đây gọi tắt là PTN) khi hiệu chuẩn thiết bị nói trên.

## 2. Thuật ngữ và định nghĩa

Các thuật ngữ và định nghĩa trong văn bản này được hiểu như sau:

- **Nhiệt kế thuỷ tinh - thuỷ ngân:** là nhiệt kế có nguyên lý hoạt động dựa trên sự giãn nở của thuỷ ngân theo nhiệt độ. Cấu tạo của nhiệt kế gồm có bầu chứa thuỷ ngân, ống mao quản, bầu chứa phụ, thang chia độ. Thân nhiệt kế làm bằng thuỷ tinh chịu nhiệt.
- **Nhiệt kế thuỷ tinh - thuỷ ngân thân đặc:** là nhiệt kế thân chứa ống mao quản thành dày có thể khắc vạch thang đo trực tiếp trên đó.
- **Nhiệt kế thuỷ tinh - thuỷ ngân có bảng thang đo trong:** là nhiệt kế mà ống mao quản và thang đo là hai bộ phận độc lập. Thang chia được khắc trên tấm thuỷ tinh phẳng, đục, ống mao quản được cố định trên đó. Cả hai đặt trong ống thuỷ tinh lớn.
- **Cơ cấu cực đại:** là phần cấu tạo của nhiệt kế giúp cho số chỉ của nhiệt kế giữ ở giá trị nhiệt độ cao nhất sau quá trình đo nhất định và duy trì cho đến khi người sử dụng đặt lại.
- **Hiệu chuẩn:** là hoạt động xác định, thiết lập mối quan hệ giữa giá trị đo của chuẩn đo lường, phương tiện đo với giá trị đo của đại lượng cần đo.
- **Độ không đảm bảo đo (ĐKĐB):** thông số gắn với kết quả của phép đo, đặc trưng cho sự phân tán của các giá trị có thể quy cho đại lượng đo một cách hợp lý.

## 3. Các phép hiệu chuẩn

Phải lần lượt tiến hành các phép kiểm tra ghi trong Bảng 1.

**Bảng 1**

| STT | Tên phép hiệu chuẩn             | Mục |
| --- | ---------------------------------- | --- |
| 1   | Kiểm tra bên ngoài                 | 7.1 |
| 2   | Kiểm tra kỹ thuật                  | 7.2 |
| 3   | Kiểm tra đo lường                  | 7.3 |
| 4   | Tính toán độ không đảm bảo đo      | 7.4 |
| 5   | Xử lý chung                        | 8   |

## 4. Phương tiện phục vụ hiệu chuẩn

Phương tiện hiệu chuẩn được ghi trong Bảng 2.

**Bảng 2**

| STT | Phương tiện hiệu chuẩn                    | Đặc trưng kỹ thuật                                                                                                     |
| --- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Chuẩn đo lường**                            |                                                                                                                                |
|     | Nhiệt kế chuẩn                                | Phạm vi đo phù hợp với phạm vi của nhiệt kế cần hiệu chuẩn; độ không đảm bảo đo mở rộng không lớn hơn 0,1 °C; độ không đảm bảo đo của tổ hợp chuẩn so với nhiệt kế thỏa mãn tỉ số truyền chuẩn ≤ 1/3 |
| 2   | **Phương tiện đo khác**                       |                                                                                                                                |
| 2.1 | Các bình điều nhiệt chất lỏng                 | Phạm vi đo phù hợp với phạm vi hiệu chuẩn; độ ổn định không lớn hơn ± 0,05 °C; độ đồng đều không lớn hơn ± 0,05 °C          |
| 2.2 | Thiết bị đo nhiệt độ và độ ẩm môi trường      | Phạm vi đo: 0 đến 50 °C; 0 đến 100 %RH. Độ phân giải: 0,1 °C; 1 %RH                                                          |
| 3   | **Phương tiện phụ**                           |                                                                                                                                |
| 3.1 | Kính phóng đại                                | Độ phóng đại không nhỏ hơn 4X                                                                                                |
| 3.2 | Dụng cụ gá lắp, giấy lau sạch, cồn tinh khiết, đồng hồ thời gian | —                                                                                                          |

## 5. Điều kiện hiệu chuẩn

Khi tiến hành hiệu chuẩn phải đảm bảo các điều kiện sau đây:

- Nhiệt độ: (25 ± 5) °C;
- Độ ẩm tương đối: (40 ÷ 70) %RH;
- Điện áp nguồn cung cấp phải ổn định, không được thay đổi quá 10 % so với giá trị danh định.

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành hiệu chuẩn cần thực hiện các công việc chuẩn bị sau:

- Lựa chọn tổ hợp chuẩn thoả mãn điều kiện như trong Bảng 2;
- Làm vệ sinh sạch nhiệt kế cần hiệu chuẩn, chuẩn bị các dụng cụ để gá lắp nhiệt kế chuẩn và nhiệt kế cần hiệu chuẩn.

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

Kiểm tra bên ngoài theo các yêu cầu sau đây:

- Bầu nhiệt kế cần hiệu chuẩn không có bọt khí, vật lạ;
- Thân nhiệt kế cần hiệu chuẩn phải trong suốt, mặt ngoài phải trơn nhẵn, không bị xước, nứt vỡ và không có bọt khí làm ảnh hưởng đến việc đọc số chỉ;
- Ống mao quản phải trong suốt cho phép nhìn rõ cột chất lỏng. Cột chất lỏng không bị đứt đoạn, chất lỏng không được bám dính trên ống mao quản;
- **Thang đo:** vạch, số phải được khắc hoặc in rõ nét và không thể tẩy xóa được; bảng thang đo (với nhiệt kế có chứa bảng thang đo) không được xê dịch tương đối với ống mao quản;
- Trên thân của nhiệt kế thân đặc hoặc trên bảng thang đo của nhiệt kế phải có các chữ, ký hiệu, nhãn hiệu sau đây: ký hiệu chia độ °C; tên hoặc nhãn hiệu của nhà sản xuất, số sản xuất; kiểu nhúng.

### 7.2. Kiểm tra kỹ thuật

Kiểm tra kỹ thuật theo các yêu cầu sau đây:

- Sai lệch số chỉ của cột chất lỏng khi đặt nhiệt kế cần hiệu chuẩn theo phương thẳng đứng và nằm ngang không vượt quá 0,1 °C;
- **Kiểm tra cơ cấu cực đại:**
  - **a.** Kiểm tra chốt giữ thuỷ ngân: đặt nhiệt kế lên bàn theo phương nằm ngang trên tờ giấy trắng, tiến hành làm nóng bầu thuỷ ngân bằng khăn nóng (50 ± 10) °C, sau đó làm lạnh bầu nhiệt kế bằng khăn lạnh (10 ± 10) °C. Dùng kính lúp quan sát, chốt giữ thuỷ ngân không được bám dính thuỷ ngân tại đó;
  - **b.** Đưa cột thuỷ ngân của nhiệt kế cần hiệu chuẩn về nhiệt độ môi trường bằng cách dùng tay vẩy hoặc dùng máy ly tâm;
  - **c.** Đặt bầu nhiệt kế cần hiệu chuẩn vào bình điều nhiệt có nhiệt độ cao hơn nhiệt độ môi trường không khí 10 °C, sau 10 phút đọc số chỉ của nhiệt kế. Lấy nhiệt kế ra khỏi bình điều nhiệt, đặt theo phương thẳng đứng;
  - **d.** Sau 1 giờ, đọc lại số chỉ của nhiệt kế, số chỉ không được thay đổi quá 0,1 °C.

### 7.3. Kiểm tra đo lường

Nhiệt kế thủy tinh - thủy ngân có cơ cấu cực đại được kiểm tra đo lường theo trình tự các nội dung, phương pháp và các yêu cầu sau đây:

#### 7.3.1. Quy định chung

- **a.** Nhiệt kế cần hiệu chuẩn được kiểm tra đo lường bằng phương pháp so sánh. Số chỉ của nhiệt kế cần hiệu chuẩn được so sánh với giá trị nhiệt độ của nhiệt kế chuẩn quy định tại mục 4 tại mỗi điểm nhiệt độ kiểm tra.
- **b.** Các điểm nhiệt độ kiểm tra phải cách đều nhau. Số điểm nhiệt độ kiểm tra không ít hơn 4.
- **c.** Trình tự kiểm tra tại các điểm như sau: lần lượt thực hiện kiểm tra tại các điểm nhiệt độ thấp nhất đến điểm nhiệt độ cao nhất.
- **d.** Khi nhúng nhiệt kế cần hiệu chuẩn vào trong bình điều nhiệt phải tuân theo quy định sau:
  - Nhiệt kế phải giữ theo phương thẳng đứng;
  - Nhiệt kế phải được nhúng đến vạch kiểm tra, cho phép nhô lên trên mặt thoáng không quá 3 vạch chia.
- **e.** Trình tự đọc số chỉ theo quy định dưới đây: Nhiệt kế chuẩn → N1 → N2 → N3 … → NN → Nhiệt kế chuẩn.

  Trong đó: N1, N2, N3…NN là các nhiệt kế cần hiệu chuẩn. Quá trình đọc số chỉ từ nhiệt kế chuẩn đến nhiệt kế NN trở về đến nhiệt kế chuẩn là một lượt đọc. Số lượt đọc tại mỗi điểm kiểm tra không ít hơn 3.

- **f.** Số chỉ của nhiệt kế tại các điểm nhiệt độ kiểm tra được đọc khi nhiệt độ của bình điều nhiệt đã ổn định sau ít nhất 10 phút. Khi đọc số chỉ của nhiệt kế phải điều chỉnh hệ thống đọc bằng kính phóng đại sao cho nhìn rõ vạch chia và cột chất lỏng, đường ngắm phải vuông góc với cột chất lỏng và ngang bằng với mặt thoáng của cột chất lỏng.

#### 7.3.2. Tiến hành kiểm tra

- **a.** Vẩy bằng tay hoặc máy chuyên dụng (nếu có) cho cột thuỷ ngân của nhiệt kế bị kiểm hạ thấp hơn nhiệt độ cần kiểm tra ít nhất 3 °C;
- **b.** Đặt nhiệt độ của bình điều nhiệt tương ứng điểm nhiệt độ kiểm tra thấp nhất;
- **c.** Khi nhiệt độ đã ổn định đọc và ghi số chỉ của các nhiệt kế theo trình tự như mục 7.3.1 ở trên;
- **d.** Lần lượt đặt nhiệt độ của bình điều nhiệt tương ứng với điểm nhiệt độ kiểm tra tiếp theo cho đến điểm nhiệt độ kiểm tra cuối cùng. Trình tự và cách đo lặp lại như mục trên.

#### 7.3.3. Xác định sai số

Sai số của nhiệt kế cần hiệu chuẩn:

$$
\Delta t = \bar{t}_{bk} - (\bar{t}_{ch} + \delta_{ch})
$$

Trong đó: `t̄_bk`: giá trị trung bình của nhiệt kế cần hiệu chuẩn tại điểm kiểm tra; `t̄_ch`: giá trị trung bình của nhiệt kế chuẩn tại điểm kiểm tra; `δ_ch`: số hiệu chính của nhiệt kế chuẩn (lấy trong GCN hiệu chuẩn).

### 7.4. Tính toán độ không đảm bảo đo

**Bảng các thành phần độ không đảm bảo đo**

| STT | Nguồn gốc gây ra độ không đảm bảo đo             | Đánh giá | Phân bố  |
| --- | ------------------------------------------------------ | -------- | -------- |
| I   | **Tổ hợp chuẩn**                                        |          |          |
| 1   | Độ tản mạn của kết quả đo                               | A        | Chuẩn    |
| 2   | Chuẩn nhiệt độ chỉ thị hiện số                          | B        | Chuẩn    |
| II  | **Nhiệt kế thủy tinh - thủy ngân có cơ cấu cực đại**    |          |          |
| 1   | Độ tản mạn kết quả đo                                   | A        | Chuẩn    |
| 2   | Độ phân giải của chỉ thị nhiệt độ                       | B        | Chữ nhật |
| III | Độ không đảm bảo đo tổ hợp                              | uc       | Chuẩn    |
| IV  | Độ không đảm bảo đo mở rộng                             | U95      | Chuẩn    |

#### 7.4.1. Độ không đảm bảo đo của tổ hợp chuẩn (u_ch) gồm các thành phần sau

**a. Độ không đảm bảo đo chuẩn loại A của chỉ thị các nhiệt kế chuẩn (u_ch1):**

$$
u_{ch1} = \sqrt{\sum_{j=1}^{k} u_{ch1,j}^2}
$$

Trong đó `u_ch1,j` là độ không đảm bảo đo loại A của nhiệt kế thứ j:

$$
u_{ch1,j} = \sqrt{\frac{S_j^2}{n}}\ ;\quad S_j = \sqrt{\frac{\sum_{i=1}^{n} (t_{ij} - \bar{t}_j)^2}{n-1}}
$$

Với `S_j`: là độ lệch chuẩn của nhiệt kế chuẩn thứ j; `n`: số lần đọc tại mỗi điểm; `t_ij`: lần đọc thứ i của nhiệt kế thứ j; `t̄_j`: nhiệt độ trung bình tại điểm kiểm tra của nhiệt kế chuẩn thứ j.

**b. Độ không đảm bảo đo của tổ hợp chuẩn, gồm các thiết bị chỉ thị đo với các nhiệt kế chuẩn (u_ch2):**

$$
u_{ch2} = \frac{U_{95}}{2}
$$

Trong đó `U_95` là độ không đảm bảo đo mở rộng của tổ hợp đo với nhiệt kế chuẩn (lấy giá trị của tổ hợp chuẩn có giá trị lớn nhất).

**c. Độ không đảm bảo đo do độ đồng đều của bình điều nhiệt chất lỏng (u_ch3):**

$$
u_{ch3} = \frac{\delta_{dd}}{\sqrt{3}}
$$

Trong đó: `δ_dd` là độ đồng đều của bình điều nhiệt chất lỏng (lấy trong giấy chứng nhận của chuẩn).

**d. Độ không đảm bảo đo do độ ổn định của bình điều nhiệt chất lỏng (u_ch4):**

$$
u_{ch4} = \frac{\delta_{od}}{\sqrt{3}}
$$

Trong đó: `δ_od` là độ ổn định của bình điều nhiệt chất lỏng (lấy trong giấy chứng nhận của chuẩn).

**Độ không đảm bảo đo liên hợp của tổ hợp chuẩn:**

$$
u_{ch} = \sqrt{u_{ch1}^2 + u_{ch2}^2 + u_{ch3}^2 + u_{ch4}^2}
$$

#### 7.4.2. Độ không đảm bảo Nhiệt kế thủy tinh - thủy ngân có cơ cấu cực đại (u_bk)

**a. Độ không đảm bảo đo chuẩn loại A của Nhiệt kế thủy tinh - thủy ngân có cơ cấu cực đại (u_bk1):**

$$
u_{bk1} = \sqrt{\frac{S_j^2}{n}}\ ;\quad S_j = \sqrt{\frac{\sum_{i=1}^{n} (t_i - \bar{t}_j)^2}{n-1}}
$$

Với: `S_j`: là độ lệch chuẩn tại điểm đo thứ N; `n`: số lần đọc tại mỗi điểm; `t_i`: lần đọc thứ i của Nhiệt kế thủy tinh - thủy ngân có cơ cấu cực đại; `t̄_j`: nhiệt độ trung bình tại điểm kiểm tra của Nhiệt kế thủy tinh - thủy ngân có cơ cấu cực đại.

**b. Độ không đảm bảo đo tính theo độ phân giải của thiết bị (u_bk2):**

Đối với chỉ thị tương tự:

$$
u_{bk2} = \frac{d}{3\sqrt{3}}
$$

Trong đó: d là giá trị độ chia của thiết bị.

Đối với chỉ thị hiện số:

$$
u_{bk2} = \frac{d}{2\sqrt{3}}
$$

Trong đó: d là độ phân giải của thiết bị.

**Độ không đảm bảo đo tổng hợp của Nhiệt kế thủy tinh - thủy ngân có cơ cấu cực đại:**

$$
u_{bk} = \sqrt{u_{bk1}^2 + u_{bk2}^2}
$$

#### 7.4.3. Độ không đảm bảo đo chuẩn tổng hợp của phép hiệu chuẩn, u_c

$$
u_c = \sqrt{u_{ch}^2 + u_{bk}^2}
$$

#### 7.4.4. Độ không đảm bảo đo mở rộng

$$
U = k \times u_c
$$

Tính với mức độ tin cậy 95 % và hệ số phủ k = 2.

## 8. Xử lý chung

- **8.1.** Nhiệt kế thủy tinh - thủy ngân có cơ cấu cực đại sau khi hiệu chuẩn được dán tem, cấp giấy chứng nhận hiệu chuẩn kèm theo kết quả hiệu chuẩn.
- **8.2.** Chu kỳ hiệu chuẩn được khuyến nghị là 12 tháng.

## 9. Phụ lục

Biên bản hiệu chuẩn Nhiệt kế thủy tinh - thủy ngân có cơ cấu cực đại (`ETV.MCT.F 09.01`)[^bieumau].

[^bieumau]: Xem ghi chú ở đầu tài liệu về khả năng đây là lỗi đánh máy (nên là `ETV.MCT.F 10.01`).

## TÀI LIỆU THAM KHẢO

- ISO/IEC 17025:2017: Yêu cầu chung về năng lực của phòng thử nghiệm và hiệu chuẩn.
- ĐLVN 131:2003 "Hướng dẫn đánh giá độ không đảm bảo đo".
- ĐLVN 113:2003: Yêu cầu về nội dung và trình bày văn bản kỹ thuật đo lường Việt Nam.
- ĐLVN 159:2017: Nhiệt kế thủy tinh - thủy ngân có cơ cấu cực đại – Quy trình kiểm định.
