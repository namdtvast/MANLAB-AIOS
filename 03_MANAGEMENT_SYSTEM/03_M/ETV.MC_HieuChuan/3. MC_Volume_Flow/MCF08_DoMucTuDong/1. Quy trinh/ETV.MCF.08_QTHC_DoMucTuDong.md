---
id: ETV.MCF 08
title: "Phương tiện đo mức tự động — Quy trình hiệu chuẩn"
type: Quy-trinh
owner: "Viện Kiểm định Công nghệ và Môi trường"
department: "Phòng Đo lường Chất lượng"
prepared_by: ""
prepared_date: "11/08/2026"
reviewed_by: "Trần Thị Hoa"
reviewed_date: "11/08/2026"
approved_by: "Nguyễn Hoàng Giang"
approved_date: "11/08/2026"
process: ""
effective_date: "11/08/2026"
revision: "03"
status: Da-ban-hanh
keywords: [đo mức tự động, automatic level meter, siêu âm, radar, thuỷ tĩnh, hiệu chuẩn]
related_documents: ["ETV.MCF 12"]
iso_clause: ["ISO/IEC 17025:2017"]
legal_basis: []
ai_tags: [calibration-procedure, automatic-level-meter, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — soát xét, biên soạn lại nội dung thân bài lần ban hành 03 (xem ghi chú tình trạng bản này); nguồn gốc chuyển đổi PDF ban đầu: `ETV.MCF 08_Do muc tu dong.pdf`"
supersedes: "ETV.MCF 08 lần ban hành 02 (22/04/2026)"
superseded_by: null
---
# PHƯƠNG TIỆN ĐO MỨC TỰ ĐỘNG – QUY TRÌNH HIỆU CHUẨN

*Automatic Level Meter – Calibration Procedure*

|                           |                             |
| ------------------------- | --------------------------- |
| **Mã số**         | ETV.MCF 08                  |
| **Lần ban hành**  | 03                          |
| **Ngày ban hành** | 11/08/2026                  |
| **Biên soạn**     | *(bản gốc để trống)* |
| **Soát xét**      | Trần Thị Hoa              |
| **Phê duyệt**     | Nguyễn Hoàng Giang        |

> **Tình trạng bản này:** Lần ban hành 03 — biên soạn lại toàn bộ thân bài (mục 1 trở đi) theo yêu cầu soát xét của người dùng, theo đúng ETV.P14 §6.4 (ban hành lại → lần ban hành tăng thêm 01). Lần ban hành 02 (22/04/2026, xem `supersedes`) là bản chuyển đổi trực tiếp từ PDF gốc `ETV.MCF 08_Do muc tu dong.pdf`, trong đó phát hiện toàn bộ nội dung thân bài trùng khớp gần như nguyên văn với `ETV.MCF 05` (Phương tiện đo lưu lượng kênh hở) — lỗi sao chép mẫu từ Viện, không mô tả đúng đối tượng "phương tiện đo mức tự động". Nội dung dưới đây được soạn lại đúng đối tượng, theo cấu trúc chuẩn chung của nhóm quy trình MCF và tham chiếu `ETV.MCF 12` (Đo mực nước — cùng lĩnh vực đo mức, gần nhất về phương pháp).
>
> **Cần soát xét/phê duyệt chính thức theo ETV.P14 trước khi áp dụng cho khách hàng:** bản này do AI soạn thảo theo yêu cầu và nội dung do AI đề xuất (mục 1–9) — chưa qua bước soát xét kỹ thuật (LĐP) và phê duyệt (LĐV) thực tế theo đúng luồng RACI của ETV.P14 §III/§6.6.1; tên người soát xét/phê duyệt trong bảng trên tạm giữ theo mẫu chung của hệ thống, chưa phải chữ ký thật.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian | Nội dung thay đổi                                                                                                          | Lần ban hành |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| 22/04/2019 | Ban hành lần thứ 1                                                                                                          | 01             |
| 22/04/2026 | Ban hành lần thứ 2 (chuyển đổi PDF → Markdown; phát hiện lỗi nội dung thân bài trùng `ETV.MCF 05`, chưa sửa)          | 02             |
| 11/08/2026 | Ban hành lần thứ 3: biên soạn lại toàn bộ thân bài (mục 1–9) đúng đối tượng "phương tiện đo mức tự động", sửa mã biểu mẫu Phụ lục | 03             |

---

## 1. Phạm vi áp dụng

Quy trình này quy định quy trình kỹ thuật hiệu chuẩn phương tiện đo mức tự động (PTĐ) — thiết bị đo và hiển thị hoặc truyền liên tục giá trị mức chất lỏng bằng nguyên lý điện tử (không cần người vận hành đọc trực tiếp tại vị trí đo), có phạm vi đo đến 20 m, cấp chính xác đến 2 %.

Quy trình này áp dụng đối với nhân viên của Viện Kiểm định Công nghệ và Môi trường (sau đây gọi tắt là PTN) khi hiệu chuẩn PTĐ nói trên.

## 2. Giải thích từ ngữ

Các từ ngữ trong văn bản này được hiểu như sau:

- **Phương tiện đo mức tự động:** thiết bị đo liên tục và tự động hiển thị hoặc truyền tín hiệu đầu ra (analog 4–20 mA, số, hoặc truyền thông) tương ứng với giá trị mức chất lỏng, dựa trên một trong các nguyên lý đo phổ biến: siêu âm (ultrasonic), radar, thuỷ tĩnh (đo áp suất cột chất lỏng — hydrostatic), điện dung, hoặc phao liên tục (continuous float).
- **Điểm "0":** mức chất lỏng tương ứng với giá trị 0 trên thang đo hoặc tín hiệu đầu ra nhỏ nhất của PTĐ.
- **Độ trôi điểm "0":** sự thay đổi giá trị chỉ thị của PTĐ tại mức "0" sau một chu trình đo, so với giá trị ban đầu.
- **Vùng chết (dead band):** khoảng cách gần đầu đo (đối với PTĐ không tiếp xúc như siêu âm, radar) mà trong đó PTĐ không thể đo chính xác mức chất lỏng.
- Độ không đảm bảo đo sau đây được viết tắt là ĐKĐB.

## 3. Các phép hiệu chuẩn

Phải lần lượt tiến hành các phép kiểm tra ghi trong Bảng 1.

**Bảng 1**

| TT  | Tên phép hiệu chuẩn         | Theo điều, mục của quy trình |
| --- | ------------------------------ | --------------------------------- |
| 1   | Kiểm tra bên ngoài              | 7.1                                |
| 2   | Kiểm tra kỹ thuật               | 7.2                                |
| 3   | Kiểm tra đo lường               | 7.3                                |
| 4   | Tính toán độ không đảm bảo đo | 7.4                                |
| 5   | Xử lý chung                     | 8                                  |

## 4. Phương tiện phục vụ hiệu chuẩn

Phương tiện hiệu chuẩn được ghi trong Bảng 2.

**Bảng 2**

| TT  | Phương tiện hiệu chuẩn                                          | Đặc trưng kỹ thuật                                                                                                            |
| --- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Chuẩn đo lường**                                                    |                                                                                                                                          |
| 1.1 | Bể/cột nước hiệu chuẩn có khả năng điều chỉnh và duy trì mức ổn định | Phạm vi mức: phù hợp với PTĐ cần hiệu chuẩn                                                                                            |
| 1.2 | Thước đo mức chuẩn (thước thép, thước quang học, hoặc PTĐ mức chuẩn) | Phạm vi đo: phù hợp với dải mức hiệu chuẩn; ĐKĐB ≤ 1/3 ĐKĐB hoặc sai số cho phép của PTĐ cần hiệu chuẩn                              |
| 2   | **Phương tiện phụ**                                                   |                                                                                                                                          |
| 2.1 | Thiết bị đo nhiệt độ và độ ẩm môi trường                             | Dải đo: Nhiệt độ (0 ÷ 50) °C; Độ ẩm tương đối (0 ÷ 100) %RH. Độ phân giải: Nhiệt độ 1 °C; Độ ẩm 1 %RH                              |
| 2.2 | Đồng hồ đo điện vạn năng                                              | Dùng kiểm tra tín hiệu đầu ra dạng dòng/áp (nếu PTĐ có tín hiệu analog 4–20 mA hoặc 0–10 V)                                          |
| 3   | **Phương tiện khác**                                                  |                                                                                                                                          |
| 3.1 | Nivo thăng bằng                                                       | Dùng kiểm tra độ thẳng đứng/nằm ngang khi lắp đặt PTĐ                                                                                  |

## 5. Điều kiện hiệu chuẩn

Khi tiến hành hiệu chuẩn phải đảm bảo các điều kiện sau:

- Nhiệt độ: (25 ± 5) °C;
- Độ ẩm tương đối: (40 ÷ 80) %RH (không đọng sương);
- Địa điểm hiệu chuẩn phải sạch sẽ, thoáng, không có chấn động mạnh trong quá trình hiệu chuẩn;
- Mặt thoáng chất lỏng trong bể/cột hiệu chuẩn phải ổn định, không có sóng/nhiễu bề mặt ảnh hưởng đến phép đo (đặc biệt quan trọng với PTĐ nguyên lý siêu âm/radar).

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành hiệu chuẩn phải thực hiện các công việc chuẩn bị sau đây:

- Cấp nguồn và sấy máy PTĐ cần hiệu chuẩn tối thiểu 30 phút hoặc theo khuyến cáo của nhà sản xuất;
- Lắp đặt PTĐ vào vị trí đo đúng theo hướng dẫn của nhà sản xuất: đối với PTĐ nguyên lý không tiếp xúc (siêu âm, radar), đảm bảo khoảng cách và góc lắp đặt so với mặt thoáng chất lỏng phù hợp, tránh vùng chết (dead band); đối với PTĐ thuỷ tĩnh, đảm bảo đầu đo ngập hoàn toàn trong chất lỏng ở mức thấp nhất cần hiệu chuẩn;
- Kiểm tra hệ thống bể/cột nước chuẩn không rò rỉ, có khả năng điều chỉnh mức nước tăng/giảm đều đặn trong toàn dải cần hiệu chuẩn;
- Kết nối thiết bị đọc tín hiệu đầu ra (đồng hồ đo điện vạn năng, máy tính…) nếu cần.

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

Phải kiểm tra bên ngoài theo các yêu cầu sau đây:

- **7.1.1.** Kiểm tra nhãn mác: PTĐ cần hiệu chuẩn phải có nhãn ghi rõ xuất xứ, số hiệu sản phẩm (serial), năm sản xuất, phạm vi đo, cấp chính xác, điều kiện môi trường làm việc;
- **7.1.2.** Kiểm tra bộ phận chỉ thị (nếu có) phải rõ ràng, đọc được chính xác; đầu đo, vỏ bảo vệ không bị hư hỏng, ăn mòn, nứt vỡ;
- **7.1.3.** Kiểm tra tài liệu và phụ kiện kèm theo: tài liệu hướng dẫn sử dụng, yêu cầu lắp đặt, các phụ kiện kèm theo (nếu có).

### 7.2. Kiểm tra kỹ thuật

- Kiểm tra trạng thái hoạt động bình thường của PTĐ theo hướng dẫn vận hành của nhà sản xuất;
- Kiểm tra sự đáp ứng của PTĐ: số chỉ hoặc tín hiệu đầu ra phải thay đổi phù hợp (tăng/giảm đúng chiều) khi mức chất lỏng tăng hoặc giảm;
- Đối với PTĐ có tín hiệu đầu ra dạng analog (4–20 mA, 0–10 V…): kiểm tra tín hiệu tại điểm đầu và điểm cuối thang đo bằng đồng hồ đo điện vạn năng, đối chiếu với thông số kỹ thuật do nhà sản xuất công bố.

### 7.3. Kiểm tra đo lường

Phương tiện đo mức tự động cần hiệu chuẩn được kiểm tra đo lường theo trình tự nội dung, phương pháp và yêu cầu sau đây:

**7.3.1. Quy định chung**

- Kiểm tra đo lường được thực hiện bằng cách so sánh trực tiếp số chỉ (hoặc giá trị mức quy đổi từ tín hiệu đầu ra) của PTĐ cần hiệu chuẩn với mức chất lỏng chuẩn xác định bằng thước đo mức chuẩn hoặc PTĐ mức chuẩn;
- Xác định điểm "0" giả định trước khi bắt đầu kiểm tra;
- Chọn tối thiểu 05 điểm kiểm tra phân bố tương đối đều trong dải đo của PTĐ (hoặc trong phạm vi đo của chuẩn, nếu phạm vi chuẩn nhỏ hơn phạm vi PTĐ).

**7.3.2. Quá trình đo**

- Tại mỗi điểm kiểm tra, điều chỉnh mức chất lỏng trong bể/cột hiệu chuẩn đến giá trị đã chọn, chờ ổn định, đọc và ghi lại đồng thời số chỉ của PTĐ cần hiệu chuẩn và mức chuẩn tối thiểu 3 lần;
- Tiến hành đo lần lượt theo chiều tăng từ điểm thấp nhất đến điểm cao nhất, sau đó theo chiều giảm từ điểm cao nhất về điểm thấp nhất;
- Sau khi hoàn thành chu trình đo, đo lại điểm "0" để xác định độ trôi điểm "0".

**7.3.3. Xử lý kết quả**

Sai số tại mỗi điểm kiểm tra được tính theo công thức:

`ΔH = H_ptđ - H_ch`

Trong đó: `ΔH`: sai số đo mức, mm; `H_ptđ`: giá trị mức trung bình do PTĐ cần hiệu chuẩn chỉ thị (hoặc quy đổi từ tín hiệu đầu ra), mm; `H_ch`: giá trị mức chuẩn trung bình tại cùng điểm kiểm tra, mm.

Kết quả được ghi vào biên bản hiệu chuẩn theo mẫu tại Phụ lục.

### 7.4. Tính toán độ không đảm bảo đo

#### 7.4.1. Các yếu tố gây ra ĐKĐB bao gồm

- PTĐ mức tự động cần hiệu chuẩn: đặc tính kỹ thuật do nhà sản xuất cung cấp, độ phân giải, độ trôi điểm "0";
- Thước đo mức chuẩn hoặc PTĐ mức chuẩn: ĐKĐB nêu trong giấy chứng nhận hiệu chuẩn;
- Điều kiện môi trường hiệu chuẩn (nhiệt độ, độ ẩm, dao động mặt thoáng chất lỏng);
- Nhân viên đo/hiệu chuẩn;
- Một số ảnh hưởng ngẫu nhiên khác.

#### 7.4.2. Tính toán ĐKĐB của các yếu tố ảnh hưởng tại các điểm hiệu chuẩn

**a. Thành phần ĐKĐB do độ lặp lại**

`u_A = (s/√(n))`

Trong đó: `u_A`: ĐKĐB do độ lặp lại; `s`: độ lệch chuẩn thực nghiệm sau n lần đo:

`s = √((1/(n-1))Σ(k=1→n) (q_k - q̄)²)`

Với `n`: số lần thực hiện đo; `q_k`: giá trị đo được ở lần thứ k; `q̄`: giá trị trung bình của n lần đo.

**b. Thành phần ĐKĐB do chuẩn đo lường**

Tính `u_B1`:

- Nếu giấy chứng nhận cung cấp độ chính xác của chuẩn:

  `u_B1 = (a/√(3))` (a: độ chính xác của chuẩn)

- Nếu giấy chứng nhận cung cấp ĐKĐB của chuẩn:

  `u_B1 = (a/k)` (a: ĐKĐB của chuẩn, k: hệ số phủ ghi trong giấy chứng nhận)

**c. Thành phần ĐKĐB do độ phân giải của PTĐ cần hiệu chuẩn**

`u_B2 = (e/2√(3))`

Trong đó: `e`: độ phân giải của PTĐ cần hiệu chuẩn.

**d. Thành phần ĐKĐB do độ trôi điểm "0"**

`u_B3 = (Δ0/√(3))`

Trong đó: `Δ0`: độ trôi điểm "0" xác định tại mục 7.3.2 (chênh lệch giữa giá trị điểm "0" đo lại sau chu trình và giá trị điểm "0" ban đầu).

**Tính toán ĐKĐB tổng hợp:**

`u_C = √(u_A² + u_B1² + u_B2² + u_B3²)`

**ĐKĐB mở rộng:**

`U = k × u_C`

Với k là hệ số bao phủ, hệ số bằng số được sử dụng như là bội của ĐKĐB tổng hợp để đưa ra ĐKĐB mở rộng, thường được chọn k = 2 với mức tin cậy xấp xỉ 95 %.

## 8. Xử lý chung

- **8.1.** PTĐ mức tự động sau khi hiệu chuẩn được dán tem, cấp giấy chứng nhận hiệu chuẩn kèm theo kết quả hiệu chuẩn.
- **8.2.** Chu kỳ hiệu chuẩn được khuyến nghị là 01 năm.

## 9. Phụ lục

- Biên bản hiệu chuẩn phương tiện đo (`ETV.MCF.F 08.01`).
- Giấy chứng nhận hiệu chuẩn (`V.P.F 11.03`).
