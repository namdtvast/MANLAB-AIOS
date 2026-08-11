---
id: ETV.MCF 03
title: "Phương tiện đo vận tốc gió ở dải thấp — Quy trình hiệu chuẩn"
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
keywords: [vận tốc gió, anemometer, hầm tạo gió, dải thấp, hiệu chuẩn]
related_documents: []
iso_clause: ["ISO/IEC 17025:2017"]
legal_basis: ["ĐLVN 345:2018", "ĐLVN 92:2001", "VMI-CP 11:2013"]
ai_tags: [calibration-procedure, anemometer, wind-tunnel, low-velocity, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCF 03_Toc do gio_V3.pdf`"
supersedes: "ETV.MCF 03 lần ban hành 01 (22/04/2019, sửa 18/09/2019, 03/01/2020, tách quy trình 30/12/2022, cập nhật 22/04/2023)"
superseded_by: null
---
# PHƯƠNG TIỆN ĐO VẬN TỐC GIÓ Ở DẢI THẤP – QUY TRÌNH HIỆU CHUẨN

*Anemometer at Low Velocity – Calibration Procedure*

|                   |                     |
| ----------------- | ------------------- |
| **Mã số**         | ETV.MCF 03          |
| **Lần ban hành**  | 02                  |
| **Ngày ban hành** | 22/04/2026          |
| **Biên soạn**     | *(bản gốc để trống)* |
| **Soát xét**      | Trần Thị Hoa        |
| **Phê duyệt**     | Nguyễn Hoàng Giang  |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCF 03_Toc do gio_V3.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khối chữ ký trên trang bìa để trống, chưa có tên người biên soạn.
>
> *Ghi chú của bản chuyển đổi:* một số trang trong bản gốc (trang 3, 5, 7) ghi "Ngày BH: 22/04/2023" ở chân trang trong khi trang bìa và các trang khác ghi "22/04/2026" — không nhất quán, có thể là chân trang chưa cập nhật hết khi ban hành lại. Bản chuyển đổi lấy ngày trang bìa (22/04/2026) làm giá trị chính thức.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian  | Nội dung thay đổi                                                    | Lần ban hành |
| ---------- | ------------------------------------------------------------------------ | ------------ |
| 22/04/2019 | Ban hành lần thứ nhất                                                     | 01           |
| 18/09/2019 | Theo góp ý của chuyên gia BoA                                             | 01           |
| 03/01/2020 | Theo góp ý của chuyên gia BoA                                             | 01           |
| 30/12/2022 | Điều chỉnh tên quy trình để tách 02 quy trình hiệu chuẩn dải cao và dải thấp | 01        |
| 22/04/2023 | Cập nhật lại quy trình                                                    | 02           |
| 22/04/2026 | Cập nhật quy trình, bổ sung và điều chỉnh thiết bị chuẩn đo lường         | 02           |

---

## 1. Phạm vi áp dụng

Quy trình này quy định quy trình kỹ thuật hiệu chuẩn phương tiện đo (PTĐ) vận tốc gió có phạm vi đo (0 ÷ 15) m/s theo phương pháp sử dụng ống khí động dựa theo hướng dẫn sử dụng của thiết bị hầm tạo gió chuẩn Omega WTM-1000 (sau đây gọi tắt là hầm tạo gió chuẩn). Áp dụng với các thiết bị đo vận tốc gió sử dụng ống pitot, cảm biến và cánh quạt có kích thước hình học giống với danh mục thiết bị được liệt kê trong Phụ lục 2.

Quy trình này áp dụng đối với nhân viên của Viện Kiểm định Công nghệ và Môi trường (sau đây gọi tắt là PTN) khi hiệu chuẩn PTĐ nói trên.

## 2. Giải thích từ ngữ

Các từ ngữ trong văn bản này được hiểu như sau:

- **Hiệu chuẩn:** là hoạt động xác định, thiết lập mối quan hệ giữa giá trị đo của chuẩn đo lường, phương tiện đo với giá trị đo của đại lượng cần đo.
- **Hiệu chỉnh:** là tập hợp các thao tác được tiến hành trên hệ thống đo để cho ra số chỉ đã quy định tương ứng với giá trị đã cho của đại lượng được đo.
- **Độ không đảm bảo đo (ĐKĐB):** thông số gắn với kết quả của phép đo, đặc trưng cho sự phân tán của các giá trị có thể quy cho đại lượng đo một cách hợp lý.

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

| TT  | Phương tiện hiệu chuẩn                   | Đặc trưng kỹ thuật                                                                                          |
| --- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| 1   | **Chuẩn đo lường**                            |                                                                                                                  |
| 1.1 | Thiết bị chuẩn tốc độ gió                     | Dải tạo gió: (0 ÷ 30) m/s; độ phân giải: 0,01 m/s; độ không đảm bảo đo: ≤ 3 %                                  |
| 2   | **Phương tiện khác**                          |                                                                                                                  |
| 2.1 | Hầm tạo gió                                   | Dải tạo gió: (0 ÷ 15) m/s; độ ổn định dưới 3 % hoặc 0,1 m/s (lấy giá trị lớn hơn); có hệ thống điều khiển vận tốc gió tự động |
| 2.2 | Thiết bị đo nhiệt độ và độ ẩm môi trường      | Dải đo: Nhiệt độ (10 ÷ 50) °C; Độ ẩm tương đối (10 ÷ 90) %RH. Độ phân giải: Nhiệt độ 1 °C; Độ ẩm 1 %RH        |
| 3   | **Phương tiện phụ**                           |                                                                                                                  |
| 3.1 | Thước đo                                      | —                                                                                                                |

## 5. Điều kiện hiệu chuẩn

Khi tiến hành hiệu chuẩn phải đảm bảo các điều kiện sau:

- Nhiệt độ: (25 ± 5) °C;
- Độ ẩm tương đối: (40 ÷ 80) %RH.

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành hiệu chuẩn phải thực hiện các công việc chuẩn bị sau đây:

- Kiểm tra yêu cầu cơ bản của hầm tạo gió:
  - Không sử dụng hầm tạo gió trong phòng nhỏ làm cho luồng khí yếu ảnh hưởng đến độ chính xác của hầm tạo gió;
  - Tránh định vị lối vào và ống xả về phía cửa sổ mở, lối đi hoặc hành lang nơi mọi người đang đi bộ. Ảnh hưởng của sự thay đổi dòng khí qua cửa hút có ảnh hưởng nghiêm trọng đến sự thay đổi tốc độ dòng chảy trong hầm tạo gió;
  - Cần có ít nhất 1,5 m (5 feet) không gian trống ở phía trước và phía sau hầm tạo gió chuẩn. Không có chướng ngại vật, di chuyển đồ vật, hoặc mở cửa ra vào hoặc cửa sổ;
  - Xác định vị trí ống xả về phía khu vực mở lớn nhất của căn phòng để giảm thiểu luồng không khí trong phòng. Tốc độ dòng chảy càng cao, cơ hội tạo ra dòng điện càng nhiều;
  - Hình học thăm dò không khí ảnh hưởng đến giá trị đọc. Có bảng hệ số hiệu chỉnh cho các loại đầu dò không khí khác nhau (loại dây nóng & cánh gạt);
  - Điều chỉnh phù hợp tốc độ dòng khí của hầm gió phụ thuộc vào nhiệt độ không khí và áp suất khí quyển;
- Kiểm tra tình trạng hoạt động của thiết bị theo hướng dẫn sử dụng của nhà sản xuất;
- Đối với các thiết bị đo vận tốc gió kiểu ống pitot, cảm biến sử dụng thiết bị đo áp suất, nhiệt độ môi trường để tính hệ số K1;
- Đối với các thiết bị đo vận tốc gió kiểu cánh quạt, so sánh chiều dài, kích cỡ hình học của cánh quạt với các mẫu thiết bị có trong Phụ lục 2;
- Lắp đặt thiết bị: gá đặt đầu đo của thiết bị chuẩn và PTĐ cần hiệu chuẩn vào vùng làm việc (test section) của hầm gió sao cho tâm hình học của các đầu đo trùng với tâm dòng khí của hầm gió. Đối với hầm hình trụ đường kính 10 cm, vị trí gá đặt phải đảm bảo khoảng cách gá đúng tâm hình học (5 cm từ thành hầm).

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

Phải kiểm tra bên ngoài theo các yêu cầu sau đây: xem xét và ghi các thông tin về tên, nhãn hiệu, kiểu/loại, số hiệu, phạm vi hoạt động, độ phân giải của thiết bị theo thiết kế của nhà sản xuất.

### 7.2. Kiểm tra kỹ thuật

Phải kiểm tra kỹ thuật theo các yêu cầu sau đây:

- Kiểm tra tình trạng hoạt động của thiết bị khi bật nguồn, thổi thử luồng gió vào đầu đo vận tốc gió;
- Hệ điều khiển các chức năng hoạt động tốt;
- Bộ chỉ thị hoạt động ổn định, không có hiện tượng thay đổi đột ngột, biến động. Phần chỉ thị phải rõ nét, không bị mờ hoặc mất nét.

### 7.3. Kiểm tra đo lường

Phương tiện đo gió cần hiệu chuẩn được kiểm tra đo lường theo trình tự nội dung, phương pháp và yêu cầu sau đây:

#### 7.3.1. Phương pháp

Phương pháp hiệu chuẩn là so sánh trực tiếp giá trị đo của PTĐ cần hiệu chuẩn (Vđ) với giá trị của thiết bị chuẩn tốc độ gió (Vc) đặt đồng thời hoặc thay thế trong hầm tạo gió tại cùng một điều kiện dòng ổn định.

Số hiệu chính (Δz) của PTĐ tại mỗi điểm hiệu chuẩn được tính bằng:

$$\Delta z = V_c - V_t$$

Trong đó: `V_c`: giá trị vận tốc gió thực tế chỉ thị bởi thiết bị chuẩn (đã sửa số hiệu chính theo giấy chứng nhận của chuẩn); `V_t`: giá trị vận tốc gió thực tế của PTĐ cần hiệu chuẩn, được quy đổi từ số chỉ hiển thị (Vđ) kết hợp các hệ số hiệu chỉnh môi trường (K1) và hình học (K2).

#### 7.3.2. Tiến hành đo, hiệu chuẩn

- Số điểm đo kiểm tra lần lượt là 2,5 m/s; 5 m/s; 10 m/s; 15 m/s;
- Kết nối thiết bị cần hiệu chuẩn vào hệ thống chuẩn đo lường:
  - Sử dụng thước để căn chỉnh sao cho đầu đo vận tốc gió đặt vào giữa tâm hầm, hầm tạo gió chuẩn có đường kính 10 cm nên thiết bị đo vận tốc gió phải được gắn vào hầm tạo gió chuẩn với chiều dài từ tâm cánh quạt tới vị trí gá là 5 cm;
  - Đối với các thiết bị đo vận tốc gió dạng pitot hoặc cảm biến, sử dụng 02 cổng thăm dò có sẵn trên hầm tạo gió chuẩn, tiến hành đặt đầu đo cách vị trí cố định là 5 cm;
- Vận hành hệ thống chạy ổn định và đảm bảo theo mục 6;
- Tại mỗi điểm hiệu chuẩn, điều chỉnh tốc độ hầm gió đạt giá trị yêu cầu, đợi dòng khí ổn định trong ít nhất 2 phút;
- Tiến hành ghi nhận số liệu đồng thời giữa chuẩn và PTĐ. Trong vòng 1 phút, đọc tối thiểu 3 cặp giá trị. Lặp lại chu kỳ để thu được tối thiểu 5 giá trị trung bình tại mỗi điểm hiệu chuẩn nhằm phục vụ tính toán thống kê, ghi kết quả đo vào biên bản theo Phụ lục 1.

#### 7.3.3. Xử lý kết quả hiệu chuẩn

Xác định số hiệu chính của thiết bị đo vận tốc gió tại mỗi điểm kiểm tra được tính theo công thức:

$$\Delta z = V_{ci} - V_{ti} = V_{ci} \times K_{2c} - V_{ti} \times K_{2t}$$

Trong đó: `Δz`: số hiệu chính của thiết bị đo vận tốc gió tại điểm kiểm tra thứ i; `V_ci`: giá trị vận tốc trung bình của thiết bị chuẩn tại điểm kiểm tra thứ i; `V_ti`: giá trị vận tốc trung bình của thiết bị cần hiệu chuẩn tại điểm kiểm tra thứ i; `K_2c`: hệ số phụ thuộc kích thước hình học của thiết bị chuẩn theo Phụ lục 2; `K_2t`: hệ số phụ thuộc kích thước hình học của thiết bị cần hiệu chuẩn theo Phụ lục 2.

### 7.4. Tính toán độ không đảm bảo đo

#### 7.4.1. Các yếu tố gây ra ĐKĐB bao gồm

- Thiết bị đo vận tốc gió chuẩn;
- Buồng chuẩn tạo vận tốc gió, thiết bị đo nhiệt độ, áp suất khí quyển trong buồng;
- Thiết bị cần hiệu chuẩn.

#### 7.4.2. Tính toán ĐKĐB của các yếu tố ảnh hưởng tại tất cả các điểm hiệu chuẩn

Mô hình tính toán:

$$\Delta z = V_c - V_t = V_c K_{2c} - V_đ \times K_{2đ} = V_c K_{2c} - (\bar{V}_đ + d) \times K_{2đ}$$

ĐKĐB của phép hiệu chuẩn bao gồm các thành phần: thiết bị chuẩn; thiết bị cần hiệu chuẩn (độ phân giải; độ lặp lại…); hệ số kích thước hình học của thiết bị đo.

Ta có ĐKĐB tổng hợp là đại lượng được xác định từ tổ hợp chuẩn:

$$u_c = \sqrt{(V_c K_{2c})^2 \times \left(\frac{u_{Vc}^2}{V_c^2} + \frac{u_{K2c}^2}{K_{2c}^2}\right) + (\bar{V}_đ K_{2đ})^2 \times \left(\frac{u_{V\bar{đ}}^2}{\bar{V}_đ^2} + \frac{u_{K2đ}^2}{K_{2đ}^2}\right) + (dK_{2đ})^2 \times \left(\frac{u_d^2}{d^2} + \frac{u_{K2đ}^2}{K_{2đ}^2}\right)}$$

Trong đó:

**a) Độ không đảm bảo đo của tổ hợp chuẩn:**

$$u_{Vc} = \sqrt{u_{Vc1}^2 + u_{Vc2}^2 + u_{Vc3}^2}$$

`u_Vc1`: ĐKĐB của thiết bị đo vận tốc gió chuẩn:

$$u_{Vc1} = \frac{A}{2}$$

Với A: độ không đảm bảo đo của thiết bị chuẩn vận tốc gió lấy từ giấy chứng nhận hiệu chuẩn.

`u_Vc2`: ĐKĐB của độ tản mạn của thiết bị đo vận tốc gió chuẩn:

$$u_{Vc2} = \sqrt{\frac{S_j^2}{n}} = \frac{S_j}{\sqrt{n}} = \frac{\sum_1^n (t_i - \bar{t})}{\sqrt{n(n-1)}}$$

Trong đó: `s_j` là độ lệch chuẩn tại điểm đo thứ j; `n` là số lần đọc tại mỗi điểm đo:

$$S_j = \sqrt{\frac{\sum_1^n (t_i - \bar{t})^2}{n-1}}$$

- `n`: số lần đọc tại mỗi điểm;
- `t_i`: lần đọc thứ i của thiết bị đo chuẩn;
- `t̄`: vận tốc gió trung bình tại điểm kiểm tra của thiết bị cần hiệu chuẩn.

`u_Vc3`: ĐKĐB của độ ổn định và phân bố của trường vận tốc:

$$u_{Vc3} = \frac{\max(V_{cj}) - \min(V_{ci})}{2\sqrt{3}}$$

Trong đó: j; i: các giá trị đo quá trình khảo sát trường tốc độ gió tại các vị trí đã chọn tại hầm gió (j ≠ i và i, j: 1, 2,…).

**b) Độ không đảm bảo đo của thiết bị:**

$$u_{V\bar{đ}} = \sqrt{u_{V\bar{đ}}^2 + u_d^2}$$

Với `u_bk1`: ĐKĐB do độ tản mạn của các kết quả đo từ bộ chỉ thị của thiết bị:

$$u_{V\bar{đ}} = \sqrt{\frac{S_j^2}{n}} = \frac{S_j}{\sqrt{n}} = \frac{\sum_1^n (t_i - \bar{t})}{\sqrt{n(n-1)}}$$

Trong đó: `s_j` là độ lệch chuẩn tại điểm đo thứ j; `n` là số lần đọc tại mỗi điểm đo:

$$S_j = \sqrt{\frac{\sum_1^n (t_i - \bar{t})^2}{n-1}}$$

- `n`: số lần đọc tại mỗi điểm;
- `t_i`: lần đọc thứ i của thiết bị cần hiệu chuẩn;
- `t̄`: vận tốc gió trung bình tại điểm kiểm tra của thiết bị cần hiệu chuẩn.

Độ không đảm bảo đo theo độ phân giải của chỉ thị thiết bị cần hiệu chuẩn:

$$u_d = \frac{A \times d}{\sqrt{3}}$$

Trong đó: `u_bk2`: ĐKĐB do độ phân giải của bộ chỉ thị; `A`: giá trị nhỏ nhất của bộ chỉ thị của thiết bị cần hiệu chuẩn; d = 1/2 đối với bộ chỉ thị hiện số; d = 1/10 đối với bộ chỉ thị tương tự.

**c) Độ không đảm bảo đo của kích thước thiết bị vận tốc gió:**

$$u_{K2} = \frac{0,005}{\sqrt{3}}$$

Trong đó: 0,005 là nửa độ phân giải của hệ số kích thước thiết bị vận tốc gió tại bảng Phụ lục 2.

**e) ĐKĐB mở rộng:**

$$U = k \times u_C$$

Với k là hệ số bao phủ, hệ số bằng số được sử dụng như là bội của ĐKĐB tổng hợp để đưa ra ĐKĐB mở rộng, thường được chọn k = 2 với mức tin cậy xấp xỉ 95 %.

## 8. Xử lý chung

- **8.1.** Phương tiện đo vận tốc gió sau khi hiệu chuẩn được dán tem, cấp giấy chứng nhận hiệu chuẩn kèm theo kết quả hiệu chuẩn.
- **8.2.** Chu kỳ hiệu chuẩn được khuyến nghị là 01 năm.

## 9. Phụ lục

Biên bản hiệu chuẩn chi tiết tại Phụ lục 01 (`ETV.MCF.F 03.01`).

## PHỤ LỤC 02 — Bảng hệ số hiệu chuẩn phương tiện đo vận tốc gió

*(Áp dụng đồng dạng về kích thước hình học theo khuyến nghị của nhà sản xuất chuẩn)*

| Model No. | Description                   | K2 @ 2.5 m/s | K2 @ 5 m/s | K2 @ 10 m/s | K2 @ 15 m/s |
| --------- | -------------------------------- | ------------ | ---------- | ----------- | ----------- |
| FMA-904   | Hot Wire 0-2000 FPM               | 1,04         | 1,00       | 1,01        | N/A         |
| FMA-905   | Hot Wire 0-5000 FPM               | 1,00         | 1,00       | 1,01        | 1,04        |
| HHF42     | Hot Wire 40-3940 FPM              | 1,04         | 1,00       | 1,06        | 1,07        |
| HHF801    | Vane Type 160-2358 FPM            | 1,08         | 1,12       | 1,17        | N/A         |
| HHF802    | Vane Type 80-4930 FPM             | 0,90         | 0,96       | 1,04        | 1,07        |
| HHF803    | Vane Type 160-4930 FPM            | 0,94         | 1,00       | 1,09        | 1,06        |
| HHF91     | Vane Type 125-4900 FPM            | 0,86         | 0,92       | 1,00        | 1,03        |
| HHF92A    | Vane Type 80-6900 FPM             | 0,92         | 0,97       | 1,05        | 1,04        |
| HHF81     | Vane Type 80-5910 FPM             | 1,03         | 1,06       | 1,13        | 1,12        |
| HHF82     | Vane Type 80-5910 FPM             | 1,14         | 1,18       | 1,24        | 1,22        |
| HHF11     | Vane Type 80-6900 FPM             | 0,88         | 0,90       | 0,99        | 1,01        |

## TÀI LIỆU THAM KHẢO

1. ĐLVN 345:2018 "Thiết bị đo vận tốc gió – Quy trình kiểm định", Tổng cục Tiêu chuẩn Đo lường Chất lượng, 2018.
2. ĐLVN 92:2001 "Máy đo vận tốc gió - Quy trình kiểm định tạm thời", Tổng cục Tiêu chuẩn Đo lường Chất lượng, 2001.
3. VMI-CP 11:2013 "Thiết bị đo vận tốc gió – Quy trình hiệu chuẩn", Viện Đo lường Việt Nam, 2013.
4. Hướng dẫn sử dụng buồng chuẩn vận tốc gió Omega WTM-1000.
