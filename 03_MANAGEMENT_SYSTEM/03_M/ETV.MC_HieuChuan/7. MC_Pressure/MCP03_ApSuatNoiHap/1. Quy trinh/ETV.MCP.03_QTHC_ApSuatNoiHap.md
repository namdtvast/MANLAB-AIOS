---
id: ETV.MCP 03
title: "Nồi hấp tiệt trùng (áp suất) — Quy trình hiệu chuẩn"
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
keywords: [nồi hấp tiệt trùng, autoclave, áp suất, mbar, datalogger, tiệt trùng, hiệu chuẩn]
related_documents: ["ETV.MCP.F 03.01"]
iso_clause: ["ISO/IEC 17025:2017"]
legal_basis: ["TCVN 6792:2001", "ĐLVN 131:2003", "ĐLVN 138:2004", "ĐLVN 127:2003", "ĐLVN 113:2003"]
ai_tags: [calibration-procedure, autoclave, pressure-metrology, sterilization, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCP_03_Ap_suat_noi_hap_Quy_trinh_hieu_chuan_V1.pdf`"
supersedes: null
superseded_by: null
---
# NỒI HẤP TIỆT TRÙNG (ÁP SUẤT) – QUY TRÌNH HIỆU CHUẨN

*Autoclave (Pressure) – Calibration Procedure*

|                   |                     |
| ----------------- | ------------------- |
| **Mã số**         | ETV.MCP 03          |
| **Lần ban hành**  | 01                  |
| **Ngày ban hành** | 22/04/2026          |
| **Biên soạn**     | *(cần xác nhận — xem ghi chú)* |
| **Soát xét**      | Trần Thị Hoa        |
| **Phê duyệt**     | Nguyễn Hoàng Giang  |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCP_03_Ap_suat_noi_hap_Quy_trinh_hieu_chuan_V1.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khi có khác biệt, bản PDF do Viện ban hành là bản có giá trị áp dụng.
>
> **⚠ Xung đột vai trò cần xử lý:** bản gốc in *Biên soạn: **Trần Thị Hoa**, Soát xét: Nguyễn Ngọc Tuấn, Phê duyệt: Nguyễn Hoàng Giang*. Theo quy tắc hiện hành của Viện, người soát xét là Quản lý chất lượng — Trần Thị Hoa. Nếu ghi theo cả hai thì bà Hoa vừa biên soạn vừa soát xét, vi phạm tách vai trò. Bản chuyển đổi **để trống người biên soạn** chờ Viện xác nhận, không tự chọn một trong hai.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## THEO DÕI SỬA ĐỔI TÀI LIỆU

| Ngày soát xét | Lý do soát xét, ban hành lại | Lần ban hành |
| ------------- | ---------------------------- | ------------ |
| 22/04/2026    | Ban hành lần thứ 1           | 01           |

---

## 1. Phạm vi áp dụng

Văn bản kỹ thuật này quy định quy trình hiệu chuẩn các thiết bị hấp tiệt trùng (nồi hấp; thiết bị tiệt trùng; nồi hấp tiệt trùng; thiết bị rửa và khử trùng…) hiển thị áp suất có phạm vi đo đến 5000 mbar.

Quy trình này áp dụng đối với nhân viên của Viện Kiểm định Công nghệ và Môi trường (sau đây gọi tắt là PTN) khi hiệu chuẩn PTĐ nói trên.

## 2. Tài liệu tham khảo

**TCVN 6792:2001** — Thiết bị hấp tiệt trùng.

## 3. Các phép hiệu chuẩn

Phải lần lượt tiến hành các phép kiểm tra ghi trong Bảng 1.

**Bảng 1.**

| TT  | Tên phép hiệu chuẩn          | Theo điều, mục của quy trình |
| --- | ---------------------------- | ---------------------------- |
| 1   | Kiểm tra bên ngoài           | 7.1                          |
| 2   | Kiểm tra kỹ thuật            | 7.2                          |
| 3   | Kiểm tra đo lường            | 7.3                          |
| 4   | Đánh giá độ không đảm bảo đo | 7.4                          |
| 5   | Xử lý chung                  | 8                            |

## 4. Phương tiện phục vụ hiệu chuẩn

Phương tiện hiệu chuẩn được ghi trong Bảng 2.

**Bảng 2.**

| TT  | Phương tiện hiệu chuẩn                              | Đặc trưng kỹ thuật                                                                                       |
| --- | --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 1   | **Chuẩn đo lường**                                  | Các chuẩn đo lường phải được liên kết chuẩn theo quy định và độ không đảm bảo đo của tổ hợp chuẩn so với PTĐ cần hiệu chuẩn phải thỏa mãn tỉ số truyền chuẩn ≤ 1/3 |
| 1.1 | Thiết bị đo nhiệt độ và áp suất (datalogger nhiệt, áp) | - Phạm vi đo phù hợp với dải đo làm việc của thiết bị hấp tiệt trùng<br>- Độ phân giải: < 0,1 bar<br>- Độ không đảm bảo đo của tổ hợp chuẩn so với thiết bị thỏa mãn tỉ số truyền chuẩn ≤ 1/3 |
| 1.2 | Áp kế tự ghi (áp suất chuẩn không dây)              | - Dải đo: (0 ÷ 5) bar<br>- Độ phân giải: 2 mbar<br>- Phần mềm cài đặt qua đường dẫn `https://www.tecnosoft.eu/en/products/6/100/spd-high-temperature-data-loggers-management-software/` |
| 2   | **Phương tiện khác**                                |                                                                                                             |
| 2.1 | Thiết bị đo nhiệt độ và độ ẩm môi trường            | - Dải đo: Nhiệt độ (0 ÷ 50) °C; Độ ẩm tương đối (0 ÷ 100) %RH<br>- Độ phân giải: Nhiệt độ 1 °C; Độ ẩm 1 %RH<br>- Liên kết chuẩn với hệ thống chuẩn quốc gia |
| 3   | **Phương tiện phụ**                                 |                                                                                                             |
| 3.1 | Đồng hồ đo thời gian                                |                                                                                                             |
| 3.2 | Găng tay, dung dịch làm sạch, vải cotton            |                                                                                                             |
| 3.3 | Hệ thống gá lắp nhiệt kế                            |                                                                                                             |

## 5. Điều kiện hiệu chuẩn

Khi tiến hành hiệu chuẩn phải đảm bảo các điều kiện sau đây:

- Nhiệt độ: (25 ± 5) °C;
- Độ ẩm tương đối: (40 ÷ 80) %RH.

> *Lưu ý:* Điều kiện môi trường hiệu chuẩn hiện trường chỉ cần thoả mãn với yêu cầu sử dụng của thiết bị hấp cần hiệu chuẩn.

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành hiệu chuẩn phải thực hiện các công việc chuẩn bị sau đây:

- Kiểm tra tình trạng hoạt động của thiết bị hấp theo hướng dẫn sử dụng của nhà sản xuất.
- Làm vệ sinh sạch sẽ phương tiện cần hiệu chuẩn.
- Lựa chọn và chuẩn bị tổ hợp chuẩn phù hợp với thiết bị cần hiệu chuẩn.

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

Phải kiểm tra bên ngoài theo các yêu cầu sau đây:

- Xem xét và ghi các thông tin về tên, nhãn hiệu, kiểu/loại, số hiệu, chỉ thị nhiệt độ của thiết bị hấp, phạm vi hoạt động, độ phân giải, cơ sở sản xuất…
- Nếu thiết bị đo sử dụng pin cần phải thay pin mới trước khi hiệu chuẩn.

### 7.2. Kiểm tra kỹ thuật

Phải kiểm tra kỹ thuật theo các yêu cầu sau đây:

- Kiểm tra tình trạng hoạt động của thiết bị khi cung cấp điện áp danh định được ghi trên nhãn.
- Hệ điều khiển các chức năng hoạt động tốt.
- Bộ chỉ thị áp suất hoạt động ổn định, không có hiện tượng thay đổi đột ngột, biến động. Đối với thiết bị hấp chỉ thị hiện số, các số hiển thị phải rõ nét, không bị mờ hoặc mất nét. Đối với thiết bị hấp chỉ thị tương tự, vạch chia phải còn đầy đủ, không bị nhòe hoặc mất chữ số, kim chỉ thị không bị ma sát hoặc kẹt kim.
- Các bộ phận khác hoạt động bình thường.

### 7.3. Kiểm tra đo lường

Thiết bị cần hiệu chuẩn được kiểm tra đo lường theo trình tự nội dung, phương pháp và yêu cầu sau đây:

#### 7.3.1. Phương pháp

Kiểm tra đo lường được thực hiện bằng cách so sánh: số chỉ của thiết bị cần hiệu chuẩn tại điểm kiểm tra được so sánh với giá trị áp suất "thực" được xác định bởi tổ hợp chuẩn.

#### 7.3.2. Quy định chung

- Hiệu chuẩn áp suất tại các điểm nhiệt tương ứng (105; 121) °C hoặc theo yêu cầu của cơ sở sử dụng. Thực hiện hiệu chuẩn áp suất từ điểm nhiệt độ thấp đến điểm nhiệt độ cao.
- Các phép đo áp suất được thực hiện khi nhiệt độ và áp suất của thiết bị tạo nhiệt độ, áp suất chuẩn và nhiệt độ, áp suất của thiết bị đo đã ổn định. Thời gian thực hiện hiệu chuẩn tối thiểu 1 giờ.

#### 7.3.3. Trình tự kiểm tra áp suất tại một điểm nhiệt độ

- Sử dụng tổ hợp chuẩn để phát ra các điểm hiệu chuẩn phù hợp.
- Tùy thuộc theo từng thiết bị khác nhau thì thời gian thực hiện hiệu chuẩn khác nhau, nhưng mỗi điểm tối thiểu không ít hơn 1 giờ. Sau khi thiết bị đã tiến hành đo xong, lấy datalogger áp suất để xuất dữ liệu và ghi vào biên bản hiệu chuẩn phù hợp với dữ liệu đã ghi thời gian. Các dữ liệu được trích xuất từ datalogger được ghi tổng hợp 5 phút. Số lượng kết quả không ít hơn 5 giá trị áp suất tại mỗi điểm nhiệt độ kiểm tra.
- Lần lượt tiến hành đo tương tự đối với các điểm kiểm tra tiếp theo cho đến điểm kiểm tra cuối cùng.

### 7.4. Đánh giá độ không đảm bảo đo

#### 7.4.1. Xác định các yếu tố gây ra ĐKĐB tại tất cả các điểm hiệu chuẩn

- Tổ hợp chuẩn;
- Thiết bị cần hiệu chuẩn;
- Nhân viên đo/hiệu chuẩn.

#### 7.4.2. Tính toán ĐKĐB của các yếu tố ảnh hưởng

ĐKĐB của phép hiệu chuẩn thiết bị hiển thị áp suất được tính toán từ các sai số ảnh hưởng đến các phép đo áp suất khi hiệu chuẩn, chia thành hai loại: ĐKĐB của tổ hợp chuẩn và ĐKĐB của thiết bị, tính toán trong toàn dải đo.

**a) Độ không đảm bảo đo của tổ hợp chuẩn `u_ch`**

Tính toán ĐKĐB này phụ thuộc vào các ĐKĐB thành phần của tổ hợp thiết bị chuẩn sử dụng, suy từ các ĐKĐB mở rộng của mỗi loại thiết bị chuẩn, gồm các thành phần sau:

- **ĐKĐB của thiết bị tạo chuẩn `u_ch1`** — lấy từ giấy chứng nhận hiệu chuẩn, tính từ ĐKĐB mở rộng U (theo mức độ tin cậy P % và hệ số phủ k):

  $$
  u_{ch1} = \frac{U}{k}
  $$

- **ĐKĐB do độ tản mạn của các kết quả đo của tổ hợp thiết bị chuẩn `u_ch2`:**

  - Tính độ lệch chuẩn `s_i`:

    $$
    s_i = \sqrt{\frac{\sum(t_i - t_{tb})^2}{n-1}}
    $$

    - `t_i`: giá trị đo thứ i của điểm kiểm tra, i = 1, 2, …, n;
    - `t_tb`: giá trị trung bình của n lần đo;
    - `s_i`: độ lệch chuẩn tại điểm kiểm tra thứ i.

  - Tính độ lệch chuẩn luỹ tích `u`:

    $$
    u = \left(\frac{\sum s_i^2}{N}\right)^{1/2}
    $$

    với `N`: số vị trí tại điểm kiểm tra.

  - Tính độ không đảm bảo chuẩn loại A:

    $$
    u_{ch2} = u_A = \frac{u}{\sqrt{n}}
    $$

    với `n`: số lần đo tại mỗi điểm kiểm tra.

- **ĐKĐB liên hợp `u_ch` của tổ hợp chuẩn:**

  $$
  u_{ch} = \sqrt{u_{ch1}^2 + u_{ch2}^2}
  $$

**b) Độ không đảm bảo đo của thiết bị cần hiệu chuẩn `u_bk`**

- **ĐKĐB do độ tản mạn của các kết quả đo từ chỉ thị của thiết bị hấp cần hiệu chuẩn `u_bk1`** — tính theo độ không đảm bảo chuẩn loại A:

  $$
  s_i = \sqrt{\frac{\sum(t_i - t_{tb})^2}{n-1}} \qquad u = \left(\frac{\sum s_i^2}{N}\right)^{1/2} \qquad u_{bk1} = u_A = \frac{u}{\sqrt{n}}
  $$

  với `N`: số vị trí điểm kiểm tra; `n`: số lần đo tại mỗi điểm kiểm tra.

- **ĐKĐB theo độ phân giải của thiết bị hấp cần hiệu chuẩn `u_bk2`** — tính từ khả năng phân giải nhỏ nhất của thiết bị hấp, ký hiệu `d`:

  $$
  u_{bk2} = \frac{A \cdot d}{\sqrt{3}}
  $$

  - `A`: giá trị nhỏ nhất của chỉ thị của thiết bị hấp cần hiệu chuẩn;
  - `d = 1/2` (½ digit) đối với thiết bị hấp chỉ thị hiện số;
  - `d = 1/10` đối với thiết bị hấp chỉ thị tương tự.

- **ĐKĐB liên hợp `u_bk` của thiết bị hấp tiệt trùng:**

  $$
  u_{bk} = \sqrt{u_{bk1}^2 + u_{bk2}^2}
  $$

**c) Độ không đảm bảo đo chuẩn liên hợp của phép hiệu chuẩn `u_c`**

$$
u_c = \sqrt{u_{ch}^2 + u_{bk}^2}
$$

**d) Độ không đảm bảo đo mở rộng** *(tính với mức độ tin cậy 95 %; hệ số k = 2)* [^dmuc]

$$
U = k \cdot u_c
$$

Với k = 2 là hệ số bao phủ tương ứng với mức độ tin cậy 95 %.

[^dmuc]: Bản gốc đánh nhãn mục này là "c)" lần thứ hai; bản chuyển đổi đánh lại thành "d)" cho đúng thứ tự.

## 8. Xử lý chung

- **8.1.** Thiết bị sau khi hiệu chuẩn được dán tem, cấp giấy chứng nhận hiệu chuẩn kèm theo kết quả hiệu chuẩn.
- **8.2.** Chu kỳ hiệu chuẩn được khuyến nghị là 12 tháng.

## 9. Phụ lục

Biên bản hiệu chuẩn thiết bị hấp tiệt trùng (`ETV.MCP.F 03.01`).

---

## TÀI LIỆU THAM KHẢO

- **ISO/IEC 17025:2017** — Yêu cầu chung về năng lực của phòng thử nghiệm và hiệu chuẩn;
- **ĐLVN 131:2003** — Hướng dẫn đánh giá độ không đảm bảo đo;
- **ĐLVN 138:2004** — Nhiệt kế chỉ thị hiện số và tương tự - Quy trình hiệu chuẩn, Tổng cục Tiêu chuẩn - Đo lường - Chất lượng, 2004;
- **ĐLVN 127:2003** — Tủ xác định nhu cầu oxy sinh hóa (BOD) - Quy trình hiệu chuẩn, Tổng cục Tiêu chuẩn - Đo lường - Chất lượng, 2003;
- **VMI - CP 17:2013** — Tủ nhiệt - Quy trình hiệu chuẩn, Viện Đo lường Việt Nam, 2013;
- **ĐLVN 113:2003** — Yêu cầu về nội dung và trình bày văn bản kỹ thuật đo lường Việt Nam;
- **TCVN 6792:2001** — Thiết bị hấp tiệt trùng.
