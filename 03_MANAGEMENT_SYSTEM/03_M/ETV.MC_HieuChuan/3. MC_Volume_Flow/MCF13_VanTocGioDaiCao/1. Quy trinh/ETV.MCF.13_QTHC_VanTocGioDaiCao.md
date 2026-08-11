---
id: ETV.MCF 13
title: "Phương tiện đo vận tốc gió ở dải cao — Quy trình hiệu chuẩn"
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
keywords: [vận tốc gió, anemometer, hầm tạo gió, dải cao, hiệu chuẩn]
related_documents: []
iso_clause: ["ISO/IEC 17025:2017", "JCGM 106:2012", "GUM"]
legal_basis: ["ĐLVN 345:2018", "ĐLVN 92:2001", "VMI-CP 11:2013"]
ai_tags: [calibration-procedure, anemometer, wind-tunnel, high-velocity, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCF 13_Van toc gio dai cao_V3.pdf`"
supersedes: "ETV.MCF 13 lần ban hành 01 (22/01/2023)"
superseded_by: null
---
# PHƯƠNG TIỆN ĐO VẬN TỐC GIÓ Ở DẢI CAO – QUY TRÌNH HIỆU CHUẨN

*Anemometer at High Velocity – Calibration Procedure*

|                   |                     |
| ----------------- | ------------------- |
| **Mã số**         | ETV.MCF 13          |
| **Lần ban hành**  | 02                  |
| **Ngày ban hành** | 22/04/2026          |
| **Biên soạn**     | *(bản gốc để trống)* |
| **Soát xét**      | Trần Thị Hoa        |
| **Phê duyệt**     | Nguyễn Hoàng Giang  |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCF 13_Van toc gio dai cao_V3.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khối chữ ký trên trang bìa để trống, chưa có tên người biên soạn.
>
> *Ghi chú của bản chuyển đổi:* trang bìa ghi "Lần ban hành: 02" nhưng chân trang các trang thân bài và bảng "Những thay đổi đã có" đều ghi lần ban hành mới nhất là "03" (ngày 22/04/2026, cùng ngày với trang bìa) — hai giá trị lần ban hành khác nhau cho cùng một ngày ban hành. Bản chuyển đổi này lấy giá trị trang bìa (02) làm giá trị chính thức cho trường `revision`, ghi nhận sai khác tại đây. Ngoài ra, mục 1 và mục 7.3.1 của bản gốc ghi nhầm tên tiêu chuẩn tiếng Anh là "Anemometer at low velocity" (thay vì "high velocity") tại dòng tiêu đề lặp lại đầu mục 1 — có dấu hiệu sao chép từ `ETV.MCF 03` (dải thấp); giữ nguyên văn.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian  | Nội dung thay đổi                     | Lần ban hành |
| ---------- | ------------------------------------------ | ------------ |
| 22/01/2023 | Ban hành lần thứ nhất                       | 01           |
| 22/04/2023 | Ban hành lần thứ 2 (góp ý của BoA)          | 02           |
| 22/04/2026 | Ban hành lần thứ 3[^lan3]                   | 03[^lan3]    |

[^lan3]: Xem ghi chú ở đầu tài liệu về sai khác giữa trang bìa (lần 02) và bảng theo dõi thay đổi (lần 03) cho cùng ngày ban hành 22/04/2026.

---

## 1. Phạm vi áp dụng

Quy trình này quy định quy trình kỹ thuật hiệu chuẩn phương tiện đo (PTĐ) vận tốc gió có phạm vi đo (0 ÷ 45) m/s sử dụng hầm tạo gió chuẩn OMEGA - WT4401 (sau đây gọi tắt là hầm tạo gió chuẩn). Áp dụng với các PTĐ vận tốc gió kiểu ống pitot, cảm biến nhiệt có kích thước hình học phù hợp.

Quy trình này được áp dụng tại Viện Kiểm định Công nghệ và Môi trường khi hiệu chuẩn PTĐ nói trên.

## 2. Giải thích từ ngữ

Các từ ngữ trong văn bản này được hiểu như sau:

- **Hiệu chuẩn:** là hoạt động xác định, thiết lập mối quan hệ giữa giá trị đo của chuẩn đo lường, phương tiện đo với giá trị đo của đại lượng cần đo.
- **Hiệu chỉnh:** là tập hợp các thao tác được tiến hành trên hệ thống đo để cho ra số chỉ đã quy định tương ứng với giá trị đã cho của đại lượng được đo.
- **Độ không đảm bảo đo (ĐKĐB):** thông số gắn với kết quả của phép đo, đặc trưng cho sự phân tán của các giá trị có thể quy cho đại lượng đo một cách hợp lý.

**Từ ngữ viết tắt:**

- PTĐ: Phương tiện đo vận tốc gió;
- ĐKĐB: Độ không đảm bảo đo;
- ETV: Viện Kiểm định Công nghệ và Môi trường.

## 3. Các phép hiệu chuẩn

Phải lần lượt tiến hành các phép kiểm tra ghi trong Bảng 1.

**Bảng 1**

| TT  | Tên phép hiệu chuẩn             | Theo điều, mục của quy trình |
| --- | ---------------------------------- | -------------------------------- |
| 1   | Kiểm tra bên ngoài                 | 7.1                               |
| 2   | Kiểm tra kỹ thuật                  | 7.2                               |
| 3   | Kiểm tra đo lường                  | 7.3                               |
| 4   | Tính toán độ không đảm bảo đo      | 7.4                               |
| 5   | Xử lý chung                        | 8                                 |

## 4. Phương tiện phục vụ hiệu chuẩn

Phương tiện hiệu chuẩn được ghi trong Bảng 2.

**Bảng 2**

| TT  | Phương tiện hiệu chuẩn                     | Đặc trưng kỹ thuật                                                                                          |
| --- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 1   | **Chuẩn đo lường**                              |                                                                                                                        |
| 1.1 | Hầm tạo gió chuẩn WT4401 D                      | Dải tạo vận tốc gió: (0 ÷ 45) m/s; độ chính xác (1 ÷ 2) %; có hệ thống điều khiển vận tốc gió tự động; ĐKĐBĐ hoặc độ chính xác ≤ 1/2 MPE của PTĐ cần hiệu chuẩn |
| 2   | **Phương tiện khác**                            |                                                                                                                        |
| 2.1 | Thiết bị đo nhiệt độ và độ ẩm môi trường        | Dải đo: Nhiệt độ (10 ÷ 50) °C; Độ ẩm tương đối (10 ÷ 90) %RH. Độ phân giải: Nhiệt độ 0,1 °C; Độ ẩm 1 %RH             |
| 2.2 | Thiết bị đo áp suất khí quyển                   | Dải đo: Áp suất (300 ÷ 1200) hPa; độ phân giải: Áp suất 0,1 hPa                                                      |
| 3   | **Phương tiện phụ**                             |                                                                                                                        |
| 3.1 | Thước đo; giá đỡ                                | —                                                                                                                      |

## 5. Điều kiện hiệu chuẩn

Khi tiến hành hiệu chuẩn phải đảm bảo các điều kiện sau:

- Nhiệt độ: (25 ± 5) °C;
- Độ ẩm tương đối: (40 ÷ 80) %RH.

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành hiệu chuẩn phải thực hiện các công việc chuẩn bị sau đây:

- Kiểm tra yêu cầu cơ bản của hầm tạo gió chuẩn:
  - Không sử dụng hầm tạo gió chuẩn trong phòng nhỏ làm cho luồng khí yếu ảnh hưởng đến độ chính xác của hầm tạo gió chuẩn;
  - Tránh định hướng cửa vào và cửa xả của hầm tạo gió chuẩn về phía cửa sổ mở, lối đi hoặc hành lang nơi mọi người đang đi bộ. Ảnh hưởng của sự thay đổi dòng khí qua cửa vào có ảnh hưởng nghiêm trọng đến sự thay đổi tốc độ dòng chảy trong hầm tạo gió chuẩn;
  - Cần có ít nhất 1,5 m (5 feet) không gian trống ở phía trước và phía sau hầm tạo gió chuẩn. Không có chướng ngại vật, di chuyển đồ vật, hoặc mở cửa ra vào hoặc cửa sổ;
  - Định hướng cửa xả về phía khu vực mở lớn nhất của căn phòng để giảm thiểu luồng khí trong phòng thí nghiệm. Hiển nhiên là khi tốc độ dòng chảy của hầm tạo gió chuẩn càng cao thì nguy cơ tạo ra luồng khí trong phòng thí nghiệm càng cao;
  - Cấu trúc hình học của cảm biến đo vận tốc gió có thể gây ảnh hưởng đến giá trị đọc;
  - Điều chỉnh phù hợp tốc độ dòng khí của hầm tạo gió chuẩn phụ thuộc vào nhiệt độ không khí và áp suất khí quyển;
  - Hàng năm đánh giá và khảo sát trường vận tốc trong hầm gió thông qua việc tiến hành đo tối thiểu 03 điểm vận tốc gió tương ứng với 03 bộ gá của hầm gió bằng thiết bị đo vận tốc gió đã được hiệu chuẩn và đảm bảo độ ổn định. Tiến hành đo tối thiểu 5 vị trí chia đều trên tiết diện đo nhằm xác định độ phân bố, đồng đều của tốc độ gió trong hầm;
- Kiểm tra tình trạng hoạt động của PTĐ vận tốc gió cần hiệu chuẩn theo hướng dẫn sử dụng của nhà sản xuất.

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

Phải kiểm tra bên ngoài theo các yêu cầu sau đây: xem xét và ghi các thông tin về tên, nhãn hiệu, kiểu/loại, số hiệu, phạm vi hoạt động, độ phân giải của PTĐ theo thiết kế của nhà sản xuất.

### 7.2. Kiểm tra kỹ thuật

Phải kiểm tra kỹ thuật theo các yêu cầu sau đây:

- Kiểm tra tình trạng hoạt động của PTĐ khi bật nguồn, thổi thử luồng gió vào đầu đo vận tốc gió;
- Hệ điều khiển các chức năng hoạt động tốt;
- Bộ chỉ thị hoạt động ổn định, không có hiện tượng thay đổi đột ngột, biến động. Phần chỉ thị phải rõ nét, không bị mờ hoặc mất nét.

### 7.3. Kiểm tra đo lường

Phương tiện đo vận tốc gió cần hiệu chuẩn được kiểm tra đo lường theo trình tự nội dung, phương pháp và yêu cầu sau đây:

#### 7.3.1. Phương pháp

Kiểm tra đo lường được thực hiện bằng phương pháp so sánh trực tiếp giá trị đọc vận tốc gió của phương tiện đo cần hiệu chuẩn với giá trị vận tốc gió chuẩn được thiết lập từ hầm tạo gió chuẩn. Công thức tổng quát như sau:

$$
\Delta V_E = \bar{V}_{DUT} - \bar{V}_R \tag{1}
$$

Trong đó: `ΔV_E`: sai số vận tốc gió của PTĐ cần hiệu chuẩn, m/s; `V̄_DUT`: vận tốc gió trung bình đọc được trên PTĐ cần hiệu chuẩn tại hầm tạo gió chuẩn trong điều kiện áp suất và nhiệt độ môi trường thực tế thí nghiệm, m/s; `V̄_R`: vận tốc gió chuẩn thực tế trung bình được tạo ra trong hầm tạo gió chuẩn trong điều kiện áp suất và nhiệt độ môi trường thực tế thí nghiệm, m/s.

#### 7.3.2. Tiến hành hiệu chuẩn

- Số điểm vận tốc kiểm tra tối thiểu là 3 điểm, đại diện cho các điểm đầu, điểm giữa và điểm cuối thang đo vận tốc gió của PTĐ cần hiệu chuẩn;
- Gá lắp PTĐ cần hiệu chuẩn vào hầm tạo gió chuẩn:
  - Khi gá phương tiện đo cần căn chỉnh sao cho cảm biến đo vận tốc gió nằm vào khoảng từ 3 cm đến 7 cm tính từ thành ống và gần giữa tâm hầm gió;
  - Vận hành hệ thống hoạt động ổn định và đảm bảo các yêu cầu theo mục 6;
- Khi giá trị đọc của PTĐ và hầm tạo gió chuẩn ổn định. Trong 01 phút đọc và ghi tối thiểu 03 giá trị đo. Giá trị trung bình trong 01 phút được ghi kết quả đo vào biên bản theo Phụ lục 1. Tối thiểu đọc 05 giá trị tại mỗi điểm hiệu chuẩn (bảng Phụ lục đo phân bố trường tốc độ gió kèm theo).

#### 7.3.3. Xử lý kết quả hiệu chuẩn

Xác định số hiệu chính của PTĐ vận tốc gió tại mỗi điểm kiểm tra được tính theo công thức:

$$
\Delta V_C = \bar{V}_R - \bar{V}_{DUT} = \bar{V}_{R2} \times K - \bar{V}_{DUT} \tag{2}
$$

Trong đó:

- `ΔV_C`: số hiệu chính của PTĐ cần hiệu chuẩn, m/s;
- `V̄_DUT`: vận tốc gió trung bình đọc được trên PTĐ cần hiệu chuẩn tại hầm tạo gió chuẩn trong điều kiện áp suất và nhiệt độ môi trường thực tế thí nghiệm, m/s;
- `V̄_R`: vận tốc gió chuẩn thực tế trung bình được tạo ra trong hầm tạo gió chuẩn trong điều kiện áp suất và nhiệt độ môi trường thực tế thí nghiệm, m/s;
- `V̄_R2`: vận tốc gió chuẩn được xác định trong hầm tạo gió chuẩn tại điều kiện chuẩn về áp suất và nhiệt độ môi trường, m/s;
- `K`: hệ số phụ thuộc vào nhiệt độ và áp suất môi trường.

Đối với vận tốc gió `V_R2` được tạo ra trong hầm tạo gió chuẩn được tính theo độ chênh áp suất, vận tốc gió trong giấy chứng nhận hiệu chuẩn của hầm tạo gió chuẩn và độ chênh áp suất thực tế đo được theo công thức:

$$
V_{R2} = V_{R1} \times \sqrt{\frac{\Delta P_{R2}}{\Delta P_{R1}}} \tag{3}
$$

Trong đó: `V_R2`: vận tốc gió chuẩn được xác định trong hầm tạo gió chuẩn tại điều kiện chuẩn về áp suất và nhiệt độ môi trường, m/s; `V_R1`: vận tốc gió được lấy ra từ giấy chứng nhận hiệu chuẩn của hầm tạo gió chuẩn trong điều kiện chuẩn về áp suất và nhiệt độ môi trường, m/s; `ΔP_R2`: độ chênh áp suất đo được trong hầm tạo gió chuẩn trong điều kiện về áp suất và nhiệt độ môi trường thực tế thí nghiệm; `ΔP_R1`: độ chênh áp suất được lấy ra từ giấy chứng nhận hiệu chuẩn của hầm tạo gió chuẩn trong điều kiện chuẩn về áp suất và nhiệt độ môi trường.

Hệ số K phụ thuộc vào nhiệt độ và áp suất môi trường được tính theo công thức:

$$
K = \frac{P_0}{P} \times \frac{273,15 + T}{294,25} \tag{4}
$$

Trong đó: `P_0`: áp suất khí quyển ở điều kiện tiêu chuẩn 1 atm; `P`: áp suất khí quyển thực tế thí nghiệm; `T`: nhiệt độ môi trường thực tế thí nghiệm, °C.

Thay công thức (3), (4) vào công thức (2) ta có:

$$
\Delta V_C = V_{R1} \times \sqrt{\frac{\Delta P_{R2}}{\Delta P_{R1}}} \times K - \bar{V}_{DUT} = V_{R1} \times \sqrt{\frac{\Delta P_{R2}}{\Delta P_{R1}} \times \frac{P_0}{P} \times \frac{273,15+T}{294,25}} - \bar{V}_{DUT} \tag{5}
$$

Trong đó: `V_R1`, `ΔP_R1`, `P_0` là các giá trị cố định lấy theo giấy chứng nhận và giá trị chuẩn quy ước.

### 7.4. Tính toán độ không đảm bảo đo

#### 7.4.1. Các yếu tố gây ra ĐKĐB

- Hầm chuẩn tạo gió chuẩn (thông số nhiệt độ; áp suất chênh áp);
- Thiết bị đo nhiệt độ và áp suất khí quyển;
- PTĐ cần hiệu chuẩn.

#### 7.4.2. Tính toán ĐKĐB tại các điểm hiệu chuẩn vận tốc gió

Từ mô hình tổng quát (2) và (5) tính số hiệu chính số chỉ vận tốc của PTĐ cần hiệu chuẩn ta có ĐKĐB tổng hợp được tính theo công thức:

$$
u_c = \sqrt{c_R^2 u_R^2 + c_{DUT}^2 u_{DUT}^2} = \sqrt{u_R^2 + u_{DUT}^2} \tag{6}
$$

Trong đó: `u_c`: ĐKĐB của PTĐ vận tốc gió, m/s; `u_R`: ĐKĐB thành phần của hầm tạo gió chuẩn, m/s; `u_DUT`: ĐKĐB thành phần của PTĐ cần hiệu chuẩn, m/s; `c_R`, `c_DUT`: lần lượt là hệ số nhạy của hầm tạo gió chuẩn và PTĐ cần hiệu chuẩn và có hệ số bằng 1.

##### 7.4.2.1. Tính ĐKĐB thành phần từ vận tốc gió chuẩn thực tế `V_R` được tạo ra trong hầm tạo gió chuẩn tại điều kiện áp suất và nhiệt độ môi trường thí nghiệm

Từ mô hình tính vận tốc gió chuẩn thực tế từ công thức (3), (4):

$$
V_R = V_{R2} \times K = V_{R1} \times \sqrt{\frac{\Delta P_{R2}}{\Delta P_{R1}}} \times \frac{P_0}{P} \times \frac{273,15+T}{294,25} \tag{7}
$$

Trong đó: `ΔP_R1`, `P_0` là các giá trị cố định lấy theo giấy chứng nhận và giá trị chuẩn quy ước. Do đó, các thành phần này không ảnh hưởng lớn đến ĐKĐB của vận tốc gió chuẩn tại công thức (7). Do vậy, các nguồn ĐKĐB thành phần được xác định cụ thể như sau:

**ĐKĐB thành phần từ độ chính xác vận tốc của hầm gió theo công bố của hãng `u_VR1` và hệ số nhạy `c_VR1`:**

$$
u_{VR1} = \frac{ACC}{\sqrt{3}} \tag{8}
$$

Trong đó: `ACC`: độ chính xác vận tốc của hầm gió theo công bố của hãng — nếu `V_R1` ≤ 6,5 m/s thì ACC: 2 % giá trị đọc với Restrictive plate (A; B); nếu 6,5 m/s ≤ `V_R1` ≤ 45 m/s thì ACC: 1 % giá trị đọc với No Restrictive plate.

**ĐKĐB thành phần từ độ chênh áp suất (chênh áp) đo được trong hầm tạo gió chuẩn** có `u_ΔPR2 = √(u_ΔPR2.1² + u_ΔPR2.2²)` và hệ số nhạy `c_ΔPR2`:

$$
c_{\Delta PR2} = \frac{\partial V_R}{\partial \Delta P_{R2}} = V_{R1} \times \frac{1}{\sqrt{\Delta P_{R1}}} \times \frac{P_0}{P} \times \frac{273,15+T}{294,25} \times \frac{1}{2\sqrt{\Delta P_{R2}}} = \frac{V_{R1} \times P_0 \times (273,15+T)}{2P \times \sqrt{\Delta P_{R1} \times \Delta P_{R2}} \times 294,25} \tag{9}
$$

`u_ΔPR2.1` là ĐKĐB thành phần từ độ tản mạn của kết quả chênh áp:

$$
u_{\Delta PR2.1} = \sqrt{\frac{S_j^2}{n}} = \frac{S_j}{\sqrt{n}} = \frac{\sum_1^n (P_{R2.i} - \bar{P}_{R2})}{\sqrt{n(n-1)}} \tag{10}
$$

Với `S_j` được tính theo công thức:

$$
S_j = \sqrt{\frac{\sum_1^n (P_{R2.i} - \bar{P}_{R2})^2}{n-1}}
$$

Trong đó: `s_j` là độ lệch chuẩn tại điểm đo thứ j; `n`: số lần đọc tại mỗi điểm; `P_R2.i`: giá trị kết quả chênh áp tại lần đọc thứ i; `P̄_R2`: giá trị trung bình đo chênh áp tại n điểm.

`u_ΔPR2.2` là ĐKĐB thành phần từ kết quả chênh áp lấy từ giấy chứng nhận hiệu chuẩn:

$$
u_{\Delta PR2.2} = \frac{A}{2} \tag{11}
$$

Với A: độ không đảm bảo đo của chênh áp lấy từ giấy chứng nhận hiệu chuẩn.

**ĐKĐB thành phần từ nhiệt độ môi trường thực tế thí nghiệm** có `u_T = √(u_T1² + u_T2²)` và hệ số nhạy `c_T`:

$$
c_T = \frac{\partial V_R}{\partial T} = V_{R1} \times \sqrt{\frac{\Delta P_{R2}}{\Delta P_{R1}}} \times \frac{P_0}{P} \times \frac{1}{294,25} = \frac{V_{R1} \times P_0 \times \sqrt{\Delta P_{R2}}}{P \times \sqrt{\Delta P_{R1}} \times 294,25} \tag{12}
$$

`u_T1` là ĐKĐB thành phần từ độ tản mạn của kết quả nhiệt độ thực tế:

$$
u_{T1} = \sqrt{\frac{S_j^2}{n}} = \frac{S_j}{\sqrt{n}} = \frac{\sum_1^n (T_i - \bar{T})}{\sqrt{n(n-1)}} \tag{13}
$$

Với `S_j` được tính theo công thức:

$$
S_j = \sqrt{\frac{\sum_1^n (T_i - \bar{T})^2}{n-1}}
$$

Trong đó: `s_j` là độ lệch chuẩn tại điểm đo thứ j; `n`: số lần đọc tại mỗi điểm; `T_i`: giá trị kết quả nhiệt độ tại lần đọc thứ i; `T̄`: giá trị trung bình đo nhiệt độ tại n điểm.

`u_T2` là ĐKĐB thành phần từ kết quả nhiệt độ thực tế lấy từ giấy chứng nhận hiệu chuẩn:

$$
u_{T2} = \frac{B}{2} \tag{14}
$$

Với B: độ không đảm bảo đo của nhiệt độ lấy từ giấy chứng nhận hiệu chuẩn.

**ĐKĐB thành phần từ áp suất khí quyển thực tế thí nghiệm** có `u_P = √(u_P1² + u_P2²)` và hệ số nhạy `c_P`:

$$
c_P = \frac{\partial V_R}{\partial P} = \frac{V_{R1} \times P_0 \times (273,15+T)}{\sqrt{\Delta P_{R1}} \times 294,25} \times \left(-\frac{1}{P^2}\right) = -\frac{V_{R1} \times P_0 \times (273,15+T)}{P^2 \times \sqrt{\Delta P_{R1}} \times 294,25} \tag{15}
$$

`u_P1` là ĐKĐB thành phần từ độ tản mạn của kết quả áp suất khí quyển:

$$
u_{P1} = \sqrt{\frac{S_j^2}{n}} = \frac{S_j}{\sqrt{n}} = \frac{\sum_1^n (P_i - \bar{P})}{\sqrt{n(n-1)}} \tag{16}
$$

Với `S_j` được tính theo công thức:

$$
S_j = \sqrt{\frac{\sum_1^n (P_i - \bar{P})^2}{n-1}}
$$

Trong đó: `s_j` là độ lệch chuẩn tại điểm đo thứ j; `n`: số lần đọc tại mỗi điểm; `P_i`: giá trị kết quả áp suất khí quyển tại lần đọc thứ i; `P̄`: giá trị trung bình đo áp suất khí quyển tại n điểm.

`u_P2` là ĐKĐB thành phần từ kết quả áp suất khí quyển thực tế lấy từ giấy chứng nhận hiệu chuẩn:

$$
u_{P2} = \frac{C}{2} \tag{17}
$$

Với C: độ không đảm bảo đo của áp suất khí quyển lấy từ giấy chứng nhận hiệu chuẩn.

**ĐKĐB đo do ảnh hưởng từ phân bố của trường vận tốc tại tiết diện đo của hầm gió (SF: Speed Field):**

$$
u_{SF} = \frac{\max(V_{ch\ j}) - \min(V_{ch\ i})}{2\sqrt{3}} \tag{18}
$$

Trong đó: `u_SF`: ĐKĐB do trường tốc độ gió của hầm chuẩn; j, i là các giá trị đo quá trình khảo sát trường tốc độ gió tại các vị trí đã chọn tại hầm gió (j ≠ i và i, j: 1, 2,…, 5).

Hệ số nhạy: `c_SF = 1` (19).

Thay công thức từ (8) đến (19) vào công thức (7) ta có ĐKĐB tổng hợp tính từ vận tốc gió chuẩn thực tế như sau:

$$
u_{VR}^2 = c_{VR1}^2 u_{VR1}^2 + c_{\Delta PR2}^2 u_{\Delta PR2}^2 + c_T^2 u_T^2 + c_P^2 u_P^2 + c_{SF}^2 u_{SF}^2
$$
$$
= c_{VR1}^2 u_{VR1}^2 + c_{\Delta PR2}^2 (u_{\Delta PR2.1}^2 + u_{\Delta PR2.2}^2) + c_T^2 (u_{T1}^2 + u_{T2}^2) + c_P^2 (u_{P1}^2 + u_{P2}^2) + c_{SF}^2 u_{SF}^2 \tag{20}
$$

##### 7.4.2.2. Tính ĐKĐB thành phần từ PTĐ cần hiệu chuẩn

$$
u_{DUT} = \sqrt{u_{DUT1}^2 + u_{DUT2}^2} \tag{21}
$$

`u_DUT1` ĐKĐB do độ tản mạn của các kết quả đo từ PTĐ cần hiệu chuẩn:

$$
u_{DUT1} = \sqrt{\frac{S_j^2}{n}} = \frac{S_j}{\sqrt{n}} = \frac{\sum_1^n (V_{DUTi} - \bar{V}_{DUT})}{\sqrt{n(n-1)}} \tag{22}
$$

Trong đó: `s_j` là độ lệch chuẩn tại điểm đo thứ j; `n` là số lần đọc tại mỗi điểm đo:

$$
S_j = \sqrt{\frac{\sum_1^n (V_{DUTi} - \bar{V}_{DUT})^2}{n-1}}
$$

Trong đó: `n`: số lần đọc tại mỗi điểm; `V_DUTi`: lần đọc thứ i của PTĐ cần hiệu chuẩn; `V̄_DUT`: vận tốc gió trung bình tại điểm kiểm tra của PTĐ cần hiệu chuẩn.

`u_DUT2` ĐKĐB theo độ phân giải của chỉ thị của PTĐ cần hiệu chuẩn:

$$
u_{DUT2} = \frac{R \times d}{\sqrt{3}} \tag{23}
$$

Trong đó: `u_DUT2`: ĐKĐB do độ phân giải của PTĐ cần hiệu chuẩn; `R`: giá trị nhỏ nhất của PTĐ cần hiệu chuẩn; d = 1/2 đối với bộ chỉ thị hiện số; d = 1/10 đối với bộ chỉ thị tương tự.

Hệ số nhạy: `c_DUT = 1` (24).

##### 7.4.2.3. ĐKĐB tổng hợp được xác định

Thay công thức (20) và (21) vào công thức (6) ta có:

$$
u_c = \sqrt{u_R^2 + u_{DUT}^2} = \sqrt{c_{VR1}^2 u_{VR1}^2 + c_{\Delta PR2}^2 (u_{\Delta PR2.1}^2 + u_{\Delta PR2.2}^2) + c_T^2 (u_{T1}^2 + u_{T2}^2) + c_P^2 (u_{P1}^2 + u_{P2}^2) + c_{SF}^2 u_{SF}^2 + c_{DUT}^2 (u_{DUT1}^2 + u_{DUT2}^2)} \tag{25}
$$

##### 7.4.2.4. ĐKĐB mở rộng được tính

$$
U = k \times u_c \tag{26}
$$

Với k là hệ số bao phủ, hệ số bằng số được sử dụng như là bội của ĐKĐB tổng hợp để đưa ra ĐKĐB mở rộng, thường được chọn k = 2 với mức tin cậy xấp xỉ 95 %.

## 8. Xử lý chung

- **8.1.** Phương tiện đo vận tốc gió sau khi hiệu chuẩn được dán tem, cấp giấy chứng nhận hiệu chuẩn kèm theo kết quả hiệu chuẩn.
- **8.2.** Chu kỳ hiệu chuẩn được khuyến nghị là 01 năm.

## 9. Phụ lục

Biên bản hiệu chuẩn chi tiết tại Phụ lục 01 (`ETV.MCF.F 13.01`).

## PHỤ LỤC 03 — BẢNG KHẢO SÁT TRƯỜNG TỐC ĐỘ GIÓ TRONG HẦM CHUẨN

*(Thời gian khảo sát năm 2023)*

| TT  | Vận tốc cài đặt (m/s) | Áp suất (chênh áp) | Vị trí 3 cm | Vị trí 5 cm | Vị trí 7 cm | Giá trị đồng đều trong buồng | Giá trị đồng đều tại các vị trí | Nhiệt độ | Độ ẩm | Áp suất |
| --- | ------------------------ | ---------------------- | -------------- | -------------- | -------------- | -------------------------------- | ------------------------------------ | -------- | ------ | -------- |
| 1–3 | 1                         | 1,744                  | 0,95 ~ 0,95     | 0,95 ~ 0,96     | 0,97 ~ 0,98     | ~ 0,01                             | 0,012                                 | 34,9     | 65,4   | 29,68    |
| 4–6 | 2                         | 0,793                  | 1,85            | 1,87            | 1,88            | ~ 0,015                            | 0,015                                 | 34,9     | 65,4   | 29,68    |
| 7–9 | 2,5                       | 1,210                  | 2,40 ~ 2,41     | 2,44 ~ 2,45     | 2,41 ~ 2,42     | ~ 0,015 ~ 0,02                     | 0,018                                 | 34,9     | 65,4   | 29,68    |
| 10–12 | 5                       | 4,947                  | 4,51 ~ 4,52     | 4,57 ~ 4,58     | 4,59 ~ 4,60     | ~ 0,04                             | 0,040                                 | 34,9     | 65,4   | 29,68    |
| 13–15 | 10                      | 0,462                  | 9,35 ~ 9,36     | 9,40 ~ 9,41     | 9,52 ~ 9,53     | ~ 0,08 ~ 0,09                      | 0,09                                  | 34,9     | 65,4   | 29,68    |
| 16–18 | 20                      | 1,896                  | 19,57 ~ 19,58   | 19,40 ~ 19,42   | 19,68 ~ 19,70   | ~ 0,14                             | 0,140                                 | 34,9     | 65,4   | 29,68    |
| 19–21 | 30                      | 4,269                  | 29,40 ~ 29,43   | 29,43 ~ 29,44   | 29,69 ~ 29,70   | ~ 0,135 ~ 0,145                    | 0,138                                 | 34,9     | 65,4   | 29,68    |

## TÀI LIỆU THAM KHẢO

1. ĐLVN 345:2018 "Thiết bị đo vận tốc gió – Quy trình kiểm định", Tổng cục Tiêu chuẩn Đo lường Chất lượng, 2018.
2. ĐLVN 92:2001 "Máy đo vận tốc gió - Quy trình kiểm định tạm thời", Tổng cục Tiêu chuẩn Đo lường Chất lượng, 2001.
3. VMI-CP 11:2013 "Thiết bị đo tốc độ gió – Quy trình hiệu chuẩn", Viện Đo lường Việt Nam, 2013.
4. Hướng dẫn sử dụng hầm chuẩn vận tốc gió Omega WT4401.
5. JCGM 106:2012 Evaluation of measurement data – The role of measurement uncertainty in conformity assessment, BIPM 2012.
6. Guide to the Expression of Uncertainty in Measurement (GUM), BIPM, IEC, IFCC, ISO, IUPAC, IUPAP, OIML. First edition, 1995.
