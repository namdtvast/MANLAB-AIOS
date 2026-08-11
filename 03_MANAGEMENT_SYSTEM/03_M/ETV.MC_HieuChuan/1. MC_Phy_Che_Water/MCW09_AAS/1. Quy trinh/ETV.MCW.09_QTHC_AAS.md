---
id: ETV.MCW 09
title: "Phương tiện đo quang phổ hấp thụ nguyên tử (AAS) — Quy trình hiệu chuẩn"
type: Quy-trinh
owner: "Viện Kiểm định Công nghệ và Môi trường"
department: "Phòng Đo lường Chất lượng"
prepared_by: "Nguyễn Văn Đồng"
prepared_date: "22/04/2026"
reviewed_by: "Trần Thị Hoa"
reviewed_date: "22/04/2026"
approved_by: "Nguyễn Hoàng Giang"
approved_date: "22/04/2026"
process: ""
effective_date: "22/04/2026"
revision: "03"
status: Da-ban-hanh
keywords: [AAS, quang phổ hấp thụ nguyên tử, atomic absorption, ngọn lửa, lò graphite, hydrua, hóa hơi lạnh, độ tuyến tính, hiệu chuẩn]
related_documents: ["ETV.MCW.F 09.01"]
iso_clause: ["ISO/IEC 17025:2017"]
legal_basis: ["ĐLVN 131:2003", "ĐLVN 353:2020", "JCGM 100:2008 (GUM)"]
ai_tags: [calibration-procedure, aas, spectrometer, heavy-metals, uncertainty-budget, dilution-method]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCW 09_AAS_V4.pdf`"
supersedes: "ETV.MCW 09 lần ban hành 02 (22/04/2023)"
superseded_by: null
---
# PHƯƠNG TIỆN ĐO QUANG PHỔ HẤP THỤ NGUYÊN TỬ – QUY TRÌNH HIỆU CHUẨN

*Atomic Absorption Spectrometer (AAS) – Calibration Procedure*

|                   |                |
| ----------------- | -------------- |
| **Mã số**         | ETV.MCW 09     |
| **Lần ban hành**  | 03             |
| **Ngày ban hành** | 22/04/2026     |
| **Biên soạn**     | Nguyễn Văn Đồng |
| **Soát xét**      | Trần Thị Hoa |
| **Phê duyệt**     | Nguyễn Hoàng Giang |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCW 09_AAS_V4.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khi có khác biệt, bản PDF do Viện ban hành là bản có giá trị áp dụng.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian  | Nội dung thay đổi                                | Lần ban hành |
| ---------- | ------------------------------------------------ | ------------ |
| 18/09/2019 | Ban hành lần thứ nhất                            | 01           |
| 19/05/2021 | Điều chỉnh bổ sung chuẩn sử dụng                 | 01           |
| 22/04/2023 | Điều chỉnh quy trình theo ý kiến chuyên gia BoA  | 02           |
| 22/04/2026 | Điều chỉnh bổ sung chuẩn sử dụng                 | 03           |

---

## 1. Phạm vi áp dụng

Văn bản kỹ thuật này quy định quy trình hiệu chuẩn ban đầu, hiệu chuẩn định kỳ và hiệu chuẩn sau sửa chữa đối với phương tiện đo quang phổ hấp thụ nguyên tử (AAS) có phạm vi bước sóng (185 ÷ 900) nm, độ hấp thụ từ (0 ÷ 5) Abs.

Quy trình này áp dụng đối với nhân viên của Viện Kiểm định Công nghệ và Môi trường (sau đây gọi tắt là PTN) khi hiệu chuẩn PTĐ nói trên.

## 2. Thuật ngữ và định nghĩa

- **2.1. Dung dịch thử trắng:** là dung dịch có chứa tất cả các chất ngoại trừ nguyên tố cần xác định, có cùng nồng độ giống như yêu cầu cho việc chuẩn bị dung dịch chuẩn quy chiếu của các nguyên tố đó.
- **2.2. Dung dịch chuẩn:** là dung dịch chứa nồng độ đã biết chính xác của nguyên tố cần xác định và được dùng để kiểm định, hiệu chuẩn và thử nghiệm phương tiện đo.
- **2.3. Độ lặp lại:** là mức độ gần nhau giữa các kết quả của phép đo liên tiếp cùng một đại lượng sử dụng cùng một phương tiện đo trong cùng một điều kiện và trong một khoảng thời gian tương đối ngắn.
- **2.4. Độ tuyến tính:** là phạm vi nồng độ của một nguyên tố cần xác định trong dung dịch có thể đo được trong giới hạn quy định.

## 3. Các phép hiệu chuẩn

Phải lần lượt tiến hành các phép kiểm tra ghi trong Bảng 1.

**Bảng 1.**

| TT  | Tên phép hiệu chuẩn           | Theo điều, mục của quy trình |
| --- | ----------------------------- | ---------------------------- |
| 1   | Kiểm tra bên ngoài            | 7.1                          |
| 2   | Kiểm tra kỹ thuật             | 7.2                          |
| 3   | Kiểm tra đo lường             | 7.3                          |
| 3.1 | Kiểm tra độ lặp lại           | 7.3.1 [^hoanvi]              |
| 3.2 | Kiểm tra độ tuyến tính        | 7.3.2 [^hoanvi]              |
| 4   | Tính toán độ không đảm bảo đo | 7.4                          |

[^hoanvi]: Bảng 1 của bản gốc ánh xạ "độ lặp lại → 7.3.1" và "độ tuyến tính → 7.3.2", trong khi phần thân văn bản lại đánh số ngược lại (7.3.1 là độ tuyến tính, 7.3.2 là độ lặp lại). Bản chuyển đổi giữ nguyên cả hai; cần đính chính khi ban hành lại.

## 4. Phương tiện hiệu chuẩn

Phương tiện hiệu chuẩn được ghi trong Bảng 2.

**Bảng 2.**

| TT  | Phương tiện hiệu chuẩn                        | Đặc trưng kỹ thuật                                                                |
| --- | --------------------------------------------- | ----------------------------------------------------------------------------------- |
| 1   | **Chuẩn đo lường** — Dung dịch chuẩn gốc các kim loại | Độ không đảm bảo đo phù hợp và liên kết chuẩn với hệ thống chuẩn quốc gia hoặc quốc tế |
|     | - Dung dịch chuẩn đồng (Cu)                   | - Nồng độ 1000 mg/L, ĐKĐB: ≤ 1 %                                                    |
|     | - Dung dịch chuẩn chì (Pb)                    | - Nồng độ 1000 mg/L, ĐKĐB: ≤ 1 %                                                    |
|     | - Dung dịch chuẩn thủy ngân (Hg)              | - Nồng độ 1000 mg/L, ĐKĐB: ≤ 1 %                                                    |
|     | - Dung dịch chuẩn asen (As)                   | - Nồng độ 1000 mg/L, ĐKĐB: ≤ 1 %                                                    |
| 2   | **Phương tiện khác**                          |                                                                                     |
| 2.1 | Micropipet, Pipet                             | - Phạm vi đo: (1, 2, 5, 10, 20, 25) mL<br>- Cấp chính xác: A và đảm bảo liên kết chuẩn đo lường |
| 2.2 | Bình định mức                                 | - Dung tích: (10; 25; 50; 100; 1000) mL<br>- Cấp chính xác: A và đảm bảo liên kết chuẩn đo lường |
| 2.3 | Phương tiện đo nhiệt độ và độ ẩm môi trường   | - Phạm vi: (0 ÷ 50) °C; (25 ÷ 95) %RH<br>- Giá trị độ chia: 1 °C; 1 %RH             |
| 3   | **Phương tiện phụ**                           |                                                                                     |
| 3.1 | Nước cất                                      | Nước loại 2 sử dụng trong phòng thí nghiệm theo TCVN 4851:1989                       |
| 3.2 | HNO₃                                          | - Độ tinh khiết phân tích                                                            |
| 3.3 | Găng tay, dung dịch làm sạch, vải cotton [^stt9] |                                                                                  |

[^stt9]: Bản gốc đánh số hai dòng cuối đều là "3.2"; bản chuyển đổi đánh lại thành 3.2 và 3.3 cho đúng thứ tự.

## 5. Điều kiện hiệu chuẩn

Khi tiến hành hiệu chuẩn, phải đảm bảo các điều kiện sau đây:

- Nhiệt độ: (23 ± 5) °C;
- Độ ẩm tương đối: ≤ 80 %RH (không đọng sương);
- Có hệ thống thoát khí.

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành hiệu chuẩn phải thực hiện các công việc sau:

**6.1.** Phương tiện đo cần hiệu chuẩn (sau đây gọi tắt là PTĐ) phải đang hoạt động bình thường và được kiểm tra vận hành hoạt động theo đúng yêu cầu của nhà sản xuất quy định trong tài liệu kỹ thuật.

**6.2.** Chọn phương tiện hiệu chuẩn theo mục 4; dung dịch chuẩn kim loại được chọn sử dụng tương ứng đối với từng kỹ thuật cụ thể như trong Bảng 3.

**Bảng 3.**

| Nguyên tố | Bước sóng (nm) | Phạm vi làm việc |
| --------- | -------------- | ---------------- |
| **PTĐ quang phổ hấp thụ nguyên tử sử dụng kỹ thuật ngọn lửa** — đơn vị mg/L | | |
| Cu | 324,7 | 0,8 ÷ 8 mg/L |
| Pb | 283,3 | 5 ÷ 50 mg/L |
| **PTĐ quang phổ hấp thụ nguyên tử sử dụng kỹ thuật lò graphite** — đơn vị µg/L | | |
| Cu | 324,7 | 4 ÷ 40 µg/L |
| Pb | 283,3 | 12 ÷ 120 µg/L |
| **PTĐ quang phổ hấp thụ nguyên tử sử dụng kỹ thuật hydrua** | | |
| As | 193,7 | 0,4 ÷ 4 µg/L |
| **PTĐ quang phổ hấp thụ nguyên tử sử dụng kỹ thuật hóa hơi lạnh** | | |
| Hg | 253,7 | 8 ÷ 80 µg/L |

**6.3. Chuẩn bị dung dịch thử trắng và dung dịch chuẩn**

*6.3.1. Dung dịch thử trắng* (HNO₃/Nước):

- Thêm 300 mL nước cất vào bình định mức 1000 mL.
- Dùng pipet hút 20 mL HNO₃ vào bình định mức trên, thêm từ từ nước cất đến vạch định mức.
- Sau đó chuyển toàn bộ thể tích vào bình nhựa hoặc chai thủy tinh có thể tích 1,5 lít, đậy kín nắp, lắc cho tan đều để có được dung dịch thử trắng là HNO₃ 2,0 %.

*6.3.2. Dung dịch chuẩn:*

- Chuẩn bị tối thiểu 5 điểm dung dịch chuẩn có nồng độ khác nhau được phân bố đều, phù hợp với phạm vi làm việc như quy định trong mục 6.2, đối với mỗi nguyên tố cần xác định.

## 7. Tiến hành

### 7.1. Kiểm tra bên ngoài

- Kiểm tra bằng mắt thường để xác định sự phù hợp của máy đo với các yêu cầu trong tài liệu kỹ thuật về hình dạng, kích thước, chỉ thị, ký mã hiệu, số seri, ngày sản xuất, điện thế, tần số và nguồn điện áp.
- Hiện trạng tem hiệu chuẩn (nếu có).
- Lý lịch sử dụng phương tiện đo được cập nhật trong quá trình hoạt động (nếu có).

### 7.2. Kiểm tra kỹ thuật

Phải kiểm tra kỹ thuật theo các yêu cầu sau đây:

- Kiểm tra trạng thái hoạt động bình thường của máy theo hướng dẫn vận hành.
- Khi bật ngọn lửa, ngọn lửa phải cháy đều không bị ngắt quãng.
- Trong kiểm tra đo lường kỹ thuật nguyên tử hóa không ngọn lửa phải sử dụng cuvet graphit mới.

### 7.3. Kiểm tra đo lường

#### 7.3.1. Kiểm tra độ tuyến tính

- Chọn dãy dung dịch chuẩn thích hợp ở mục 6.
- Tiến hành đo 5 dung dịch chuẩn như bảng trên, mỗi dung dịch tiến hành đo lặp lại 3 lần. Ghi kết quả vào biên bản hiệu chuẩn.
- Lập phương trình hồi quy y = ax + b, đưa ra hệ số tương quan tuyến tính R².

#### 7.3.2. Kiểm tra độ lặp lại

- Chọn dung dịch chuẩn thích hợp ở mục 6.
- Chọn một dung dịch chuẩn kiểm tra độ lặp lại có giá trị nồng độ nằm trong dãy dung dịch chuẩn sử dụng ở mục 6.
- Thực hiện 06 phép đo liên tiếp đối với dung dịch chuẩn ở những điều kiện quy định. Ghi kết quả đo được vào biên bản hiệu chuẩn.

Tính kết quả độ hấp thụ trung bình và giá trị độ lệch chuẩn (%):

$$
u_A = \frac{s_{\bar{C}}}{\sqrt{n}} \tag{1}
$$

Giá trị trung bình được tính theo công thức:

$$
\bar{C} = \frac{1}{n}\sum_{i=1}^{n} C_i \tag{2}
$$

Độ lệch chuẩn SD tính theo công thức:

$$
s_{\bar{C}} = \sqrt{\frac{\sum_{i=1}^{n}(C_i - \bar{C})^2}{n-1}} \tag{3}
$$

- `n`: số lần đo;
- `C_i`: giá trị đo thứ i;
- `C̄`: giá trị đo trung bình.

#### 7.3.3. Tính toán

Nồng độ dung dịch pha loãng được tính theo công thức:

$$
C_i = \frac{V_{i-1} \cdot C_{i-1}}{V_i} \tag{4}
$$

- `C_i`: Nồng độ của dung dịch cần pha loãng thứ i (mg/L);
- `C_{i-1}`: Nồng độ của chất chuẩn thứ i-1 (mg/L);
- `V_i`: Thể tích bình định mức dùng để pha loãng dung dịch thứ i (mL);
- `V_{i-1}`: Thể tích dung dịch cần hút để pha loãng dung dịch thứ i (mL).

### 7.4. Tính toán độ không đảm bảo đo

#### 7.4.1. Xác định các yếu tố ảnh hưởng đến ĐKĐB

| TT  | Tên yếu tố ảnh hưởng                                          | Ký hiệu     | Loại | Dạng hàm phân bố |
| --- | ------------------------------------------------------------- | ----------- | ---- | ---------------- |
| 1   | Độ lặp lại của PTĐ                                            | `u_A`       | A    | Chuẩn            |
| 2   | ĐKĐB của dung dịch chuẩn gốc (theo giấy chứng nhận)           | `u_C0`      | B    | Chuẩn            |
| 3   | ĐKĐB của dung dịch chuẩn thứ i                                | `u_Ci`      | B    |                  |
| 3.1 | ĐKĐB gây nên bởi pipet dùng để pha loãng dung dịch chuẩn      | `u_pipet`   | B    | Chữ nhật         |
| 3.2 | ĐKĐB gây ra bởi bình định mức để pha loãng dung dịch chuẩn    | `u_flask`   | B    | Chữ nhật         |
| 3.3 | ĐKĐB do thao tác của nhân viên thực hiện                      | `u_per`     | B    | Chữ nhật         |
| 3.4 | ĐKĐB do sự dãn nở về nhiệt                                    | `u_temp`    | B    | Chữ nhật         |
| 4   | Nguồn điện cấp                                                | `u_volt`    | B    | Chuẩn            |
| 5   | Điều kiện môi trường                                          | `u_mt`      | B    | Chữ nhật         |

#### 7.4.2. Tính toán ĐKĐB của các yếu tố ảnh hưởng

Các yếu tố ảnh hưởng đến ĐKĐB được xác định từ mục 7.1. Tuy nhiên, không phải tất cả các yếu tố ảnh hưởng đều có thể xác định được hoặc có những yếu tố ảnh hưởng không đáng kể tới ĐKĐB thì có thể xem xét và bỏ qua như: độ phân giải, nguồn điện, điều kiện môi trường (nhiệt độ) và một vài yếu tố ngẫu nhiên khác… Do vậy, mới chỉ tính toán và áp dụng cho 3 yếu tố ảnh hưởng:

- ĐKĐB của phép đo (độ lặp lại, độ chệch);
- ĐKĐB của dung dịch chuẩn (theo giấy chứng nhận);
- ĐKĐB của dung dịch chuẩn thứ i (do bình định mức, pipet, người thực hiện).

$$
u_C = \sqrt{u_A^2 + u_{Ci}^2}
$$

| Ký hiệu   | Đơn vị | Định nghĩa                                                                    |
| --------- | ------ | ----------------------------------------------------------------------------- |
| `u`       | mg/L   | ĐKĐB tổng hợp                                                                 |
| `u_A`     | mg/L   | ĐKĐB độ lặp lại của PTĐ                                                       |
| `u_C0`    | mL     | ĐKĐB của dung dịch chuẩn gốc                                                  |
| `u_Ci`    | mL     | ĐKĐB của dung dịch chuẩn thứ i (do bình định mức, pipet, người thực hiện)     |
| `u_pipet` | mL     | ĐKĐB gây nên bởi pipet dùng để pha loãng dung dịch chuẩn                      |
| `u_flask` | mL     | ĐKĐB gây ra bởi bình định mức để pha loãng dung dịch chuẩn                    |
| `u_temp`  |        | ĐKĐB do sự dãn nở về nhiệt                                                    |
| `u_per`   | mL     | ĐKĐB do thao tác của nhân viên thực hiện                                      |

**Các thành phần độ không đảm bảo đo:**

| TT    | Tên yếu tố ảnh hưởng                                       | Ký hiệu   | Đơn vị | Công thức tính |
| ----- | ---------------------------------------------------------- | --------- | ------ | -------------- |
| 1     | Độ lặp lại của PTĐ                                         | `u_A`     | mg/L   | $u_A = s(C)/\sqrt{n}$ |
| 2     | ĐKĐB của dung dịch chuẩn gốc 1000 mg/L (theo GCN)          | `u_C0`    | mg/L   | $u_{C0} = a/k$ |
| 3     | ĐKĐB của dung dịch chuẩn thứ i                             | `u_Ci`    | mg/L   | (xem 7.4.3) |
| 3.1   | ĐKĐB gây nên bởi pipet                                     | `u_pipet` |        | $u_{pipet} = \sqrt{u_{calp}^2 + u_{temp}^2}$ |
| 3.1.1 | ĐKĐB gây nên bởi pipet dùng để pha loãng dung dịch chuẩn   | `u_calp`  | mL     | $u_{calp} = d/k$ — pipet có thể tích `V_pipet` và ĐKĐB là `d` với hệ số phủ theo GCN (k = 2) |
| 3.1.2 | ĐKĐB do giãn nở nhiệt                                      | `u_temp`  |        | $u_{temp} = (V_{pipet} \times \gamma \times \Delta_i)/\sqrt{3}$ — `γ`: hệ số dãn nở/1 °C; `Δ_i`: sai lệch nhiệt độ so với 20 °C; `T`: nhiệt độ môi trường thí nghiệm |
| 3.2   | ĐKĐB gây ra bởi bình định mức để pha loãng dung dịch chuẩn | `u_flask` |        | $u_{flask} = \sqrt{u_{calf}^2 + u_{per}^2 + u_{temp}^2}$ |
| 3.2.1 | ĐKĐB gây ra bởi bình định mức                              | `u_calf`  | mL     | $u_{calf} = e/k$ — bình định mức có thể tích `V_flask` và ĐKĐB là `e` với hệ số phủ k theo GCN (k = 2) |
| 3.2.2 | ĐKĐB do thao tác của nhân viên thực hiện                   | `u_per`   | mL     | $u_{per} = 0{,}03/\sqrt{3}$ — sai số do thao tác (dư hoặc thiếu ở giọt cuối cùng, tính xấp xỉ ± 0,03 mL) |
| 3.2.3 | ĐKĐB do giãn nở nhiệt                                      | `u_temp`  |        | $u_{temp} = (V_{flask} \times \gamma \times \Delta_i)/\sqrt{3}$ — `γ`: hệ số dãn nở/1 °C; `Δ_i`: sai lệch nhiệt độ so với 20 °C |

#### 7.4.3. Độ không đảm bảo đo chuẩn tổng hợp (u_C)

Từ công thức tổng quát (4) xác định ĐKĐB từ tổ hợp của nồng độ dung dịch chuẩn cần pha loãng:

$$
u_{Ci}^2 = C_i^2 \cdot \left[\left(\frac{u_{flask}}{V_{flask}}\right)^2 + \left(\frac{u_{pipet}}{V_{pipet}}\right)^2 + \left(\frac{u_{C_{i-1}}}{C_{i-1}}\right)^2\right]
$$

Độ không đảm bảo đo của dung dịch thứ i (pha loãng lần thứ i):

$$
u_{Ci} = C_i \cdot \sqrt{\left(\frac{u_{flask}}{V_{flask}}\right)^2 + \left(\frac{u_{pipet}}{V_{pipet}}\right)^2 + \left(\frac{u_{C_{i-1}}}{C_{i-1}}\right)^2} \quad \text{(mg/L)}
$$

- `C_{i-1}`: nồng độ của chất chuẩn i-1 (mg/L), i = 1, …, i;
- `C_i`: nồng độ chất chuẩn C_i (mg/L).

Độ không đảm bảo đo tổng hợp:

$$
u_C = \sqrt{u_A^2 + u_{Ci}^2} \quad \text{(mg/L)}
$$

Độ không đảm bảo mở rộng (với hệ số phủ k = 2; độ tin cậy 95 %):

$$
U = 2 \cdot u_C
$$

## 8. Xử lý chung

- **8.1.** PTĐ AAS sau khi hiệu chuẩn được dán tem, cấp giấy chứng nhận hiệu chuẩn kèm theo kết quả hiệu chuẩn.
- **8.2.** Chu kỳ hiệu chuẩn được khuyến nghị là 01 năm.

## 9. Phụ lục

Phụ lục 01 — Biên bản hiệu chuẩn PTĐ AAS (`ETV.MCW.F 09.01`).

---

## PHỤ LỤC 1 — BIÊN BẢN HIỆU CHUẨN QUANG PHỔ HẤP THỤ NGUYÊN TỬ

*LIÊN HIỆP CÁC HỘI KHOA HỌC VÀ KỸ THUẬT VIỆT NAM — VIỆN KIỂM ĐỊNH CÔNG NGHỆ VÀ MÔI TRƯỜNG*

Số GCN: ………………  Số tem: ………………  Số PNT: NT…………/ETV

### I. Thông tin chung

1. Tên đối tượng: …
2. Kiểu: …  3. Số hiệu: …  4. Mã quản lý: …
5. Cơ sở sản xuất: …  6. Năm sản xuất: …
7. Cơ sở sử dụng: …
8. Nơi sử dụng: …
9. Đặc trưng kỹ thuật:

| Phạm vi đo | Độ phân giải | Độ chính xác | Thông tin khác |
| --- | --- | --- | --- |
|  |  |  |  |

### II. Thông tin hiệu chuẩn

1. Phương pháp hiệu chuẩn: ETV.MCW 09
2. Chuẩn sử dụng:

| Mã quản lý   | Hãng/Nước sản xuất | Diễn giải  | ĐKĐB     | Thời hạn   | LKC  |
| ------------ | ------------------ | ---------- | -------- | ---------- | ---- |
| RMW-Cu-001   | INORGANIC          | 1000 mg/L  | 10 mg/L  | 06/05/2025 | NIST |
| RMW-Pb-001   | INORGANIC          | 1000 mg/L  | 10 mg/L  | 28/08/2026 | NIST |
| RMW-As-001   | INORGANIC          | 1000 mg/L  | 10 mg/L  | 29/10/2026 | NIST |
| RMW-Hg-001   | INORGANIC          | 1000 mg/L  | 10 mg/L  | 29/05/2024 | NIST |

3. Điều kiện môi trường: Nhiệt độ …… °C — Độ ẩm …… %RH
4. Địa điểm hiệu chuẩn tại: ☐ PTN  ☐ Cơ sở  ☐ Hiện trường

### III. Kết quả hiệu chuẩn

- 3.1. Kiểm tra bên ngoài: ☐ Đạt  ☐ Không đạt
- 3.2. Kiểm tra kỹ thuật: ☐ Đạt  ☐ Không đạt
- 3.3. Kết quả đo lường

**a. Kiểm tra độ tuyến tính**

| TT | Nồng độ dung dịch chuẩn lý thuyết (mg/L) | Độ hấp thụ (Abs) — Lần 1 | Lần 2 | Lần 3 | Nồng độ đo được (mg/L) — Lần 1 | Lần 2 | Lần 3 |
| -- | --- | --- | --- | --- | --- | --- | --- |
| 0  |  |  |  |  |  |  |  |
| 1  |  |  |  |  |  |  |  |
| 2  |  |  |  |  |  |  |  |
| 3  |  |  |  |  |  |  |  |
| 4  |  |  |  |  |  |  |  |
| 5  |  |  |  |  |  |  |  |

Phương trình y = ax + b: ………………  R²: ………………

**b. Kiểm tra độ lặp lại**

| TT | Nồng độ dung dịch chuẩn lý thuyết (mg/L) | Độ hấp thụ (Abs) | Nồng độ đo được (mg/L) |
| -- | --- | --- | --- |
| 1  |  |  |  |
| 2  |  |  |  |
| 3  |  |  |  |
| 4  |  |  |  |
| 5  |  |  |  |
| 6  |  |  |  |

…………………, ngày …… tháng …… năm 202…

Người kiểm tra — Người thực hiện

---

## PHỤ LỤC 2 — CÔNG THỨC VÀ QUY TRÌNH PHA LOÃNG DUNG DỊCH

**Công thức pha loãng dung dịch**

Pha V₂ mL dung dịch A có nồng độ C₂ (mg/L) từ dung dịch A có nồng độ C₁ (mg/L). Thể tích cần hút V được tính theo công thức:

$$
V = \frac{V_2 \cdot C_2}{C_1} \tag{4}
$$

- `C₂`: Nồng độ của dung dịch cần pha loãng (mg/L);
- `C₁`: Nồng độ của chất chuẩn gốc (mg/L);
- `V₂`: Thể tích bình định mức dùng để pha loãng dung dịch thứ i (mL);
- `V`: Thể tích dung dịch cần hút để pha loãng dung dịch thứ i (mL).

**Quy trình pha loãng dung dịch chuẩn**

*Chuẩn bị dung dịch thử trắng (HNO₃/Nước):*

- Thêm 300 mL nước cất vào bình định mức 1000 mL.
- Dùng pipet hút 20 mL HNO₃ vào bình định mức trên, thêm từ từ nước cất đến vạch định mức.
- Sau đó chuyển toàn bộ thể tích vào bình nhựa hoặc chai thủy tinh có thể tích 1,5 lít, đậy kín nắp, lắc cho tan đều để có được dung dịch thử trắng là HNO₃ 2,0 %.

*Chuẩn bị dung dịch chuẩn pha loãng:*

Từ dung dịch chuẩn có nồng độ C₁ (mg/L), hút chính xác V (mL) dung dịch vào bình định mức (V₂ mL), thêm vừa đủ bằng dung dịch thử trắng tới vạch, lắc đều.

---

## TÀI LIỆU THAM KHẢO

1. **ĐLVN 131:2003** — Hướng dẫn đánh giá độ không đảm bảo đo, Tổng cục Tiêu chuẩn - Đo lường - Chất lượng, 2003.
2. **ĐLVN 353:2020** — Phương tiện đo quang phổ hấp thụ nguyên tử - Quy trình kiểm định, Tổng cục Tiêu chuẩn - Đo lường - Chất lượng, 2020.
3. **A1-06.PP 02.07** — Phương pháp hiệu chuẩn máy quang phổ, Trung tâm Đo lường, Cục Tiêu chuẩn - Đo lường - Chất lượng, 2013.
4. **JCGM 100:2008** — *Evaluation of measurement data - Guide to the expression of uncertainty in measurement* (GUM), 1998.
5. **ISO/IEC 17025:2017** — Yêu cầu chung về năng lực của phòng thử nghiệm và hiệu chuẩn.
