---
id: ETV.MCP 02
title: "Áp kế kiểu chênh áp — Quy trình hiệu chuẩn"
type: Quy-trinh
owner: "Viện Kiểm định Công nghệ và Môi trường"
department: "Phòng Đo lường Chất lượng"
prepared_by: "Nguyễn Ngọc Tuấn"
prepared_date: "22/04/2026"
reviewed_by: "Trần Thị Hoa"
reviewed_date: "22/04/2026"
approved_by: "Nguyễn Hoàng Giang"
approved_date: "22/04/2026"
process: ""
effective_date: "22/04/2026"
revision: "03"
status: Da-ban-hanh
keywords: [áp kế chênh áp, differential pressure gauge, áp suất, bar, Pa, lò xo, hiện số, hiệu chuẩn]
related_documents: ["ETV.MCP.F 02.01"]
iso_clause: ["ISO/IEC 17025:2017"]
legal_basis: ["ĐLVN 131:2003", "ĐLVN 76:2001", "ĐLVN 236:2011"]
ai_tags: [calibration-procedure, differential-pressure, pressure-metrology, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCP 02_Chenh ap_v3.pdf`"
supersedes: "ETV.MCP 02 lần ban hành 02 (22/04/2023)"
superseded_by: null
---
# ÁP KẾ KIỂU CHÊNH ÁP – QUY TRÌNH HIỆU CHUẨN

*Calibration procedure – Differential Pressure Gauge*

|                   |                     |
| ----------------- | ------------------- |
| **Mã số**         | ETV.MCP 02          |
| **Lần ban hành**  | 03                  |
| **Ngày ban hành** | 22/04/2026          |
| **Biên soạn**     | Nguyễn Ngọc Tuấn    |
| **Soát xét**      | Trần Thị Hoa        |
| **Phê duyệt**     | Nguyễn Hoàng Giang  |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCP 02_Chenh ap_v3.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khi có khác biệt, bản PDF do Viện ban hành là bản có giá trị áp dụng.
>
> *Ghi chú của bản chuyển đổi:* bản gốc in người soát xét là **Nguyễn Chu Anh Tuấn**; bản chuyển đổi ghi theo quy tắc hiện hành của Viện (người soát xét là Quản lý chất lượng — Trần Thị Hoa). Tên người biên soạn lấy đúng theo bản gốc.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian  | Nội dung thay đổi     | Lần ban hành |
| ---------- | --------------------- | ------------ |
| 01/10/2020 | Ban hành lần thứ nhất | 01           |
| 22/04/2023 | Ban hành lần thứ hai  | 02           |
| 22/04/2026 | Ban hành lần thứ ba   | 03           |

---

## 1. Phạm vi áp dụng

Quy trình này quy định quy trình kỹ thuật hiệu chuẩn áp kế kiểu chênh áp có phạm vi đo từ (-2,5 đến 2,5) bar với cấp chính xác ± 0,2 %.

Quy trình này áp dụng đối với nhân viên của Viện Kiểm định Công nghệ và Môi trường (sau đây gọi tắt là PTN) khi hiệu chuẩn phương tiện đo nói trên.

## 2. Tài liệu tham khảo

- **ISO/IEC 17025:2017** — Yêu cầu chung về năng lực của phòng thử nghiệm và hiệu chuẩn;
- **ĐLVN 131:2003** — Hướng dẫn đánh giá độ không đảm bảo đo;
- **ĐLVN 76:2001** — Quy trình hiệu chuẩn áp kế, chân không kế kiểu lò xo và hiện số;
- **ĐLVN 236:2011** — Quy trình kiểm định đồng hồ đo khí kiểu chênh áp.

## 3. Các phép hiệu chuẩn

Phải lần lượt tiến hành các phép kiểm tra ghi trong Bảng 1.

**Bảng 1.**

| TT  | Tên phép hiệu chuẩn             | Theo điều, mục của quy trình |
| --- | ------------------------------- | ---------------------------- |
| 1   | Kiểm tra bên ngoài              | 7.1                          |
| 2   | Kiểm tra kỹ thuật               | 7.2                          |
| 3   | Kiểm tra đo lường               | 7.3                          |
|     | - Xác định số điểm hiệu chuẩn   | 7.3.1                        |
|     | - Tiến hành hiệu chuẩn          | 7.3.2                        |
|     | - Tính toán độ không đảm bảo đo | 7.3.3 [^m733]                |
| 4   | Tính toán độ không đảm bảo đo   | 8                            |
| 5   | Xử lý chung                     | 9                            |

[^m733]: Bảng 1 dẫn mục 7.3.3 nhưng thân văn bản **không có mục 7.3.3** — nội dung tính ĐKĐB nằm ở mục 8. Giữ nguyên văn, cần đính chính khi ban hành lại.

## 4. Phương tiện phục vụ hiệu chuẩn

Phương tiện hiệu chuẩn được ghi trong Bảng 2.

**Bảng 2.**

| TT  | Phương tiện hiệu chuẩn      | Đặc trưng kỹ thuật                                                                                                          |
| --- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Chuẩn đo lường**          |                                                                                                                              |
| 1.1 | Hệ thống chuẩn áp suất      | - Phạm vi đo không nhỏ hơn phạm vi đo của thiết bị đo áp suất cần hiệu chuẩn<br>- Độ không đảm bảo đo hoặc sai số cho phép nhỏ hơn hoặc bằng 1/3 sai số cho phép của thiết bị đo áp suất cần hiệu chuẩn |
| 2   | **Phương tiện phụ**         |                                                                                                                              |
| 2.1 | Hệ thống tạo áp suất        | - Áp suất tạo được tối thiểu phải bằng giới hạn đo trên của thiết bị đo áp suất cần hiệu chuẩn<br>- Độ sụt áp không vượt quá 5 % trong thời gian 5 phút, sau khi đã chịu tải 15 phút |
| 2.2 | Thiết bị đo nhiệt độ, độ ẩm | - Phạm vi đo: Nhiệt độ (0 ÷ 50) °C; Độ ẩm tương đối (0 ÷ 80) %RH<br>- Độ phân giải: Nhiệt độ 1 °C; Độ ẩm 1 %RH               |

## 5. Điều kiện hiệu chuẩn

Khi tiến hành hiệu chuẩn phải đảm bảo các điều kiện sau:

### 5.1. Môi trường truyền áp suất

- Thông thường sử dụng môi trường không khí để truyền áp suất.

### 5.2. Môi trường hiệu chuẩn

- Nhiệt độ:
  - (20 ± 2) °C đối với thiết bị đo áp suất có cấp chính xác cao hơn 0,4;
  - (20 ± 5) °C đối với thiết bị đo áp suất có cấp chính xác thấp hơn hoặc bằng 0,4.
- Độ ẩm tương đối: (40 ÷ 80) %RH (không đọng sương).
- Địa điểm hiệu chuẩn phải sạch sẽ, thoáng, không có bụi, không bị đốt nóng từ một phía, không gây rung động trong quá trình hiệu chuẩn.

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành hiệu chuẩn phải thực hiện các công việc chuẩn bị sau đây:

- Áp kế kiểu chênh áp chuẩn phải đặt trong phòng hiệu chuẩn cho đến khi chúng đạt được nhiệt độ quy định ở mục 5.2.
- Tăng từ từ áp suất đến giới hạn đo trên của áp kế rồi khóa các van lại, duy trì trạng thái này trong 5 phút, kiểm tra sự rò rỉ áp suất trong hệ thống. Sau đó mở các van để áp suất giảm từ từ và trở về trạng thái ban đầu.
- Gá lắp áp kế cần hiệu chuẩn vào vị trí làm việc, cho hoạt động thử để kiểm tra khả năng làm việc của thiết bị đo chênh áp.

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

Phải kiểm tra bên ngoài theo các yêu cầu sau đây:

- **7.1.1.** Kiểm tra bằng mắt để xác định sự phù hợp của thiết bị với các yêu cầu quy định trong tài liệu kỹ thuật về hình dáng, kích thước, hiển thị, nguồn điện sử dụng, nhãn hiệu và phụ kiện kèm theo.
- **7.1.2.** Áp kế kiểu chênh áp cần hiệu chuẩn phải ở tình trạng tốt: không bị ăn mòn, nứt, han rỉ; bộ phận chỉ thị phải đảm bảo rõ ràng và đọc được chính xác.

### 7.2. Kiểm tra kỹ thuật

Phải kiểm tra kỹ thuật theo các yêu cầu sau đây:

- **7.2.1.** Đơn vị đo lường áp suất theo nhà sản xuất công bố hoặc ghi trên thiết bị.
- **7.2.2.** Giá trị độ chia vạch hoặc độ phân giải của thang đo phải phù hợp với cấp chính xác.
- **7.2.3.** Kiểm tra trạng thái hoạt động bình thường của thiết bị theo tài liệu kỹ thuật của nhà sản xuất.
- **7.2.4. Đối với áp kế kiểu chênh áp nước:**
  - Ống đo phải chế tạo từ thủy tinh trung tính, trong suốt, không có bọt khí và không bị cong vênh. Đường kính trong của ống đo không được nhỏ hơn 4 mm. Đường kính ống phải đều, sai số cho phép là ± 0,1 mm. Bề mặt bên trong của thành ống phải nhẵn bóng.
  - Gioăng đệm phải đủ kín, giữ không cho nước trào ra khi sử dụng và khi vận chuyển, nhưng phải đảm bảo có độ xốp sao cho khi có áp suất tác động, cột nước phải dịch chuyển được từ 0 đến 200 mm nước trong khoảng thời gian nhỏ hơn 1,5 giây.
  - Vạch chia của thang đo phải được ghi khắc ở cả hai phía (bên trái và bên phải) của cột nước.
- **7.2.5. Đối với áp kế chênh áp kiểu lò xo và hiện số:**
  - Đơn vị đo lường ghi trên mặt áp kế là Pa (Pascal) hoặc đơn vị áp suất khác do nhà sản xuất ghi trên áp kế.
  - Giá trị độ chia nhỏ nhất hoặc độ phân giải của thang đo phải phù hợp với cấp chính xác và tuân theo dãy: **1·10ⁿ; 2·10ⁿ; 5·10ⁿ** — trong đó n là số nguyên dương, âm hoặc bằng 0.

### 7.3. Kiểm tra đo lường

Các thiết bị đo áp suất được kiểm tra đo lường theo trình tự nội dung, phương pháp và yêu cầu sau đây:

#### 7.3.1. Xác định số điểm hiệu chuẩn

Áp kế phải được hiệu chuẩn ở một số điểm tối thiểu phân bố đều trên toàn bộ thang đo khi tăng và giảm áp suất, tùy thuộc vào cấp chính xác của áp kế:

| Cấp chính xác của áp kế | Số điểm hiệu chuẩn tối thiểu |
| --- | --- |
| Cao hơn 0,25 | 10 điểm (10 % phạm vi đo cho mỗi điểm) |
| Từ 0,25 đến 1 | 6 điểm (15 % phạm vi đo cho mỗi điểm) |
| Thấp hơn 1 | 5 điểm (20 % phạm vi đo cho mỗi điểm) |

Trường hợp trên áp kế không ghi cấp chính xác để xác định số điểm hiệu chuẩn tối thiểu thì cấp chính xác của áp kế được ước lượng tương đối theo biểu thức sau:

- Đối với áp kế kiểu chênh áp nước và lò xo:

`cấp chính xác = (((1/2) giá trị độ chia nhỏ nhất)/(phạm vi đo)) × 100`

- Đối với áp kế chênh áp hiện số:

`cấp chính xác = ((độ phân giải)/(phạm vi đo)) × 100`

#### 7.3.2. Tiến hành hiệu chuẩn

- Tăng từ từ áp suất đến giới hạn đo trên của áp kế, duy trì 5 phút, sau đó kiểm tra sự rò rỉ áp suất trong hệ thống.
- Tiếp theo mở van ra để áp suất giảm từ từ và trở về trạng thái ban đầu.
- Sau khi áp suất hoàn toàn trở về trạng thái ban đầu thì chỉnh điểm 0. Đối với những áp kế không điều chỉnh được điểm 0 thì ghi lại giá trị đó vào biên bản hiệu chuẩn.
- Đọc số chỉ ở từng điểm đo đã xác định trước, khi tăng và khi giảm áp suất, tại chuẩn và áp kế cần hiệu chuẩn.
- Thời gian chịu tải giữa loạt đo khi tăng áp suất sang trạng thái giảm áp suất là 5 phút (ở giá trị đo trên của áp kế cần hiệu chuẩn).
- Kết quả hiệu chuẩn phải ghi vào biên bản hiệu chuẩn theo mẫu ở Phụ lục 1.

## 8. Tính toán độ không đảm bảo đo

### 8.1. Độ không đảm bảo đo loại A

Xác định công thức hiệu chuẩn: **y = a + bx**

- `y`: giá trị áp suất chỉ thị trên áp kế cần hiệu chuẩn;
- `x`: giá trị áp suất trên chuẩn.

Với `n` là số lần đo:

`x̄ = (Σx_i/n) ȳ = (Σy_i/n)`

`b = ((Σ(x_i - x̄)(y_i - ȳ))/(Σ(x_i - x̄)²)) a = ȳ - b · x̄`

Xác định các thành phần tính độ không đảm bảo đo loại A:

`Q_y = √((Σ{y_i - (a + b · x_i)}²)/(n-2))`

`Q_a = Q_y · √(Σx_i²/(n · Σ(x_i - x̄)²)) Q_b = Q_y · √(1/(Σ(x_i - x̄)²))`

`r(a,b) = -(Σx_i/√(n · Σx_i²))`

- `Q_y`: độ lệch chuẩn của y;
- `Q_a`: độ lệch chuẩn của a;
- `Q_b`: độ lệch chuẩn của hệ số góc b;
- `r(a,b)`: hệ số tương quan của a và b.

Công thức tính độ không đảm bảo đo loại A:

`u_A = √(Q_a² + x_i² · Q_b² + 2 x_i · Q_a · Q_b · r(a,b))`

### 8.2. Độ không đảm bảo đo loại B

Độ không đảm bảo đo loại B gồm hai thành phần: độ chia/độ phân giải của áp kế cần hiệu chuẩn (`u_tb`) và ĐKĐB của chuẩn áp suất (`u_ch`).

**Tính `u_tb`:**

- Đối với thiết bị đo áp suất kiểu lò xo và nước:

`u_tb = ((Độ chia vạch)/√(6))`

- Đối với thiết bị đo áp suất kiểu hiện số:

`u_tb = ((Độ phân giải ở áp suất lớn nhất)/√(3))`

**Tính `u_ch`** — xác định theo độ không đảm bảo đo `U(ch)` của chuẩn theo giấy chứng nhận hiệu chuẩn:

`u_ch = (U(ch)/k)  [^uch2]`

[^uch2]: Bản gốc in vế trái là `u_tb` lần thứ hai; theo nội dung ("Tính u_ch") thì ký hiệu đúng phải là `u_ch`.

Trong đó `k` là hệ số phủ được ghi trong giấy chứng nhận hiệu chuẩn của chuẩn.

### 8.3. ĐKĐB tổng hợp

`u_c = √(u_A² + u_tb² + u_ch²)`

### 8.4. ĐKĐB mở rộng

`U = k · u_c`

- `U`: ĐKĐB mở rộng;
- `k`: hệ số phủ ứng với xác suất tin cậy xấp xỉ 95 %.

ĐKĐB tương đối:

`ĐKĐB tương đối (%) = ((ĐKĐB mở rộng)/(Phạm vi đo)) × 100`

## 9. Xử lý chung

- **9.1.** Thiết bị đo áp kế kiểu chênh áp sau khi hiệu chuẩn được dán tem, cấp giấy chứng nhận hiệu chuẩn kèm theo thông báo kết quả hiệu chuẩn.
- **9.2.** Thời hạn hiệu chuẩn tiếp theo được khuyến nghị là 12 tháng.

## 10. Phụ lục

Biên bản hiệu chuẩn thiết bị đo áp kế kiểu chênh áp (`ETV.MCP.F 02.01`).
