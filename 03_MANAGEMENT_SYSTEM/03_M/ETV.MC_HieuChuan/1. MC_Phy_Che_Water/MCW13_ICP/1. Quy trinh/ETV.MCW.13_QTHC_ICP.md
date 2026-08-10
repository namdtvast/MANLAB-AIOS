---
id: ETV.MCW 13
title: "Hệ thống cảm ứng cao tần plasma (ICP) — Quy trình hiệu chuẩn"
type: Quy-trinh
owner: ""
department: "Viện Kiểm định Công nghệ và Môi trường"
process: ""
effective_date: "22/04/2026"
revision: "02"
status: Da-ban-hanh
keywords: [ICP, ICP-MS, ICP-OES, plasma cảm ứng cao tần, 21 nguyên tố, kim loại nặng, độ tuyến tính, nội chuẩn, hiệu chuẩn]
related_documents: []
iso_clause: ["ISO/IEC 17025:2017"]
legal_basis: []
ai_tags: [calibration-procedure, icp-ms, icp-oes, heavy-metals, uncertainty-budget, dilution-method]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: null
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCW_13 ICP_V4.pdf`"
supersedes: "ETV.MCW 13 lần ban hành 01 (14/03/2024)"
superseded_by: null
---
# HỆ THỐNG CẢM ỨNG CAO TẦN PLASMA (ICP) – QUY TRÌNH HIỆU CHUẨN

*Inductively coupled plasma system (ICP) – Calibration procedure*

|                   |                |
| ----------------- | -------------- |
| **Mã số**         | ETV.MCW 13     |
| **Lần ban hành**  | 02             |
| **Ngày ban hành** | 22/04/2026     |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCW_13 ICP_V4.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khi có khác biệt, bản PDF do Viện ban hành là bản có giá trị áp dụng.
>
> *Ghi chú của bản chuyển đổi:* (1) chân trang bản gốc in xen kẽ mã `ETV.MCW 12` và `ETV.MCW 13` — lỗi sao chép từ quy trình HPLC, mã đúng là `ETV.MCW 13`; (2) trang "TÀI LIỆU THAM KHẢO" (trang 11/18) **để trống**; (3) cột "Bước sóng mm" trong Bảng II Phụ lục 03 phải là **nm**. Cần đính chính khi ban hành lại.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## THEO DÕI SỬA ĐỔI TÀI LIỆU

| Ngày soát xét | Lý do soát xét, ban hành lại | Lần ban hành |
| ------------- | ---------------------------- | ------------ |
| 14/03/2024    | Ban hành mới                 | 01           |
| 22/04/2026    | Ban hành lần 2               | 02           |

---

## 1. Phạm vi áp dụng

Văn bản kỹ thuật này quy định quy trình hiệu chuẩn ban đầu, hiệu chuẩn định kỳ và hiệu chuẩn sau sửa chữa đối với Hệ thống cảm ứng cao tần plasma (ICP-MS/OES) có một hoặc các đặc tính kỹ thuật như Bảng 1.

**Bảng 1**

| STT | Đại lượng đo                                                                                       | Phạm vi      | Cấp chính xác/ĐKĐB |
| --- | -------------------------------------------------------------------------------------------------- | ------------ | ------------------ |
| 1   | Đầu dò MS (Detector MS) — 21 nguyên tố: Al, Ag, As, Ba, Be, Cd, Co, Cr, Cu, Fe, K, Mn, Mo, Ni, Pb, Sb, Se, Ti, V, Zn, Sn | Đến 10 mg/L  | 1,6 %              |
| 2   | Đầu dò OES (Detector OES) — 21 nguyên tố: Al, Ag, As, Ba, Be, Cd, Co, Cr, Cu, Fe, K, Mn, Mo, Ni, Pb, Sb, Se, Ti, V, Zn, Sn | Đến 10 mg/L  | 1,6 %              |

Quy trình này áp dụng đối với nhân viên của Viện Kiểm định Công nghệ và Môi trường (sau đây gọi tắt là PTN) khi hiệu chuẩn Hệ thống cảm ứng cao tần plasma (ICP) nói trên.

## 2. Giải thích từ ngữ

Các từ ngữ trong văn bản này được hiểu như sau:

- **2.1. Hiệu chuẩn:** là hoạt động xác định, thiết lập mối quan hệ giữa giá trị đo của chuẩn đo lường, phương tiện đo với giá trị đo của đại lượng cần đo.
- **2.2. Hiệu chỉnh:** là tập hợp các thao tác được tiến hành trên hệ thống đo để cho ra số chỉ đã quy định tương ứng với giá trị đã cho của đại lượng được đo.
- **2.3. Độ không đảm bảo đo (ĐKĐB):** thông số gắn với kết quả của phép đo, đặc trưng cho sự phân tán của các giá trị có thể quy cho đại lượng đo một cách hợp lý.
- **2.4. Hệ thống cảm ứng cao tần Plasma (ICP):** là nguồn ion hóa phân hủy hoàn toàn mẫu thành các phần tử cấu thành của nó và biến đổi các phần tử đó thành các ion. Nó thường bao gồm khí argon và năng lượng được "kết hợp" với nó bằng cách sử dụng cuộn dây cảm ứng để tạo thành plasma.
- **2.5. Detector (đầu dò):** đầu dò dùng phát hiện tín hiệu để định tính và định lượng các chất cần phân tích.
- **2.6. RSD (Relative Standard Deviation):** độ lệch chuẩn tương đối.
- **2.7. Độ tuyến tính:** đường thẳng tương quan giữa kết quả (trung bình) của phép đo (tín hiệu) và số lượng (nồng độ) của thành phần cần được xác định.
- **2.8. Peak Area:** diện tích peak.
- **2.9. Oven:** lò.
- **2.10. Autosampler:** chích mẫu tự động.

## 3. Các phép hiệu chuẩn

**Bảng 2**

| TT  | Tên phép hiệu chuẩn           | Theo điều, mục của quy trình |
| --- | ----------------------------- | ---------------------------- |
| 1   | Kiểm tra bên ngoài            | 7.1                          |
| 2   | Kiểm tra kỹ thuật             | 7.2                          |
| 3   | Kiểm tra đo lường             | 7.3                          |
| 3.1 | Kiểm tra độ lặp lại           | 7.3.1                        |
| 3.2 | Kiểm tra độ tuyến tính        | 7.3.2                        |
| 4   | Đánh giá độ không đảm bảo đo  | 8                            |
| 5   | Xử lý chung                   | 9                            |

## 4. Phương tiện phục vụ hiệu chuẩn

Các phương tiện dùng để hiệu chuẩn được nêu trong Bảng 3.

**Bảng 3**

| TT  | Tên thiết bị và chuẩn đo lường            | Đặc trưng kỹ thuật đo lường                                                                     |
| --- | ----------------------------------------- | ------------------------------------------------------------------------------------------------- |
| 1   | **Chuẩn đo lường**                        |                                                                                                   |
| 1.1 | Dung dịch chuẩn được chứng nhận           | Dung dịch chuẩn 21 nguyên tố (Al, Ag, As, Ba, Be, Cd, Co, Cr, Cu, Fe, K, Mn, Mo, Ni, Pb, Sb, Se, Ti, V, Zn, Sn) — ĐKĐB: ≤ 0,55 % |
| 2   | **Phương tiện khác**                      |                                                                                                   |
| 2.1 | Bình định mức                             | - Dung tích: (10, 25, 50, 100, 1000) mL<br>- Cấp chính xác: A và đảm bảo liên kết chuẩn đo lường  |
| 2.2 | Pipet, Micropipet                         | - Phạm vi đo: (1, 2, 5, 10, 25) mL<br>- Cấp chính xác: A và đảm bảo liên kết chuẩn đo lường       |
| 2.3 | Phương tiện đo nhiệt độ, độ ẩm môi trường | - Phạm vi: Nhiệt độ (0 ÷ 50) °C; Độ ẩm (25 ÷ 95) %RH<br>- Giá trị độ chia: Nhiệt độ 1 °C; Độ ẩm 1 %RH |
| 3   | **Phương tiện phụ**                       |                                                                                                   |
| 3.1 | Nước tinh khiết                           | - Nước loại 2 sử dụng trong phòng thí nghiệm theo TCVN 4851:1989                                  |
| 3.2 | Khí Argon, Khí Helium                     | - Độ tinh khiết theo yêu cầu: 99,999 %                                                            |
| 3.3 | Dung môi HNO₃                             | - HNO₃ 67 %                                                                                       |
| 3.4 | Giấy thấm                                 |                                                                                                   |
| 3.5 | Bình xịt tia                              |                                                                                                   |
| 3.6 | Găng tay, dung dịch làm sạch, vải cotton  |                                                                                                   |

> *Lưu ý:* Tuỳ thuộc vào từng PTĐ để lựa chọn chuẩn đo lường và phương tiện phụ phù hợp và đáp ứng yêu cầu.

## 5. Điều kiện môi trường

Khi tiến hành hiệu chuẩn phải đảm bảo các điều kiện môi trường sau:

- Nhiệt độ: (25 ± 5) °C;
- Độ ẩm không khí: (40 ÷ 80) %RH (không đọng sương);
- Phải đảm bảo máy đã bật lên ít nhất 02 giờ để ổn định và không có sự thay đổi đột ngột về điều kiện môi trường.

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành hiệu chuẩn phải thực hiện các công việc chuẩn bị sau đây:

### 6.1. Chuẩn bị dung dịch chuẩn và dung dịch thử trắng

- Chuẩn bị một dãy dung dịch chuẩn có 05 điểm nồng độ khác nhau chia đều trên khoảng đo để xây dựng đường cong hiệu chuẩn. Các dung dịch này được chuẩn bị bằng phương pháp pha loãng từ dung dịch chuẩn gốc. Điều quan trọng là nồng độ của axit nitric có trong các dung dịch là giống nhau (chi tiết theo Phụ lục).

> **Lưu ý:**
> - Đối với **ICP-OES**: dùng pipet hút một lượng dung dịch chuẩn gốc xác định, sau đó thêm 0,5 mL HNO₃ vào bình định mức 100 mL và định mức đến vạch bằng nước cất.
> - Đối với **ICP-MS**: dùng pipet hút một lượng dung dịch chuẩn gốc xác định, sau đó thêm 1 mL HNO₃ vào bình định mức 100 mL và định mức đến vạch bằng nước cất.

- **Dung dịch mẫu trắng:** Sử dụng dung dịch mẫu trắng chứa nước và cùng một lượng axit như trong dung dịch hiệu chuẩn.
- **Riêng đối với ICP-MS** cần phải có dung dịch nội chuẩn khi phân tích các nền mẫu phức tạp:
  - Mỗi dung dịch được đo bằng ICP-MS trong các vận hành thông thường cần chứa một chất chuẩn nội. Nồng độ của các chất chuẩn nội phải bằng nhau trong tất cả các dung dịch.
  - Dung dịch nội chuẩn chứa Rodi và Luteti có nồng độ khối lượng ρ = 1000 mg/L. Nồng độ các chất này có trong dung dịch thử phải không đáng kể.
  - Nồng độ của dung dịch nội chuẩn pha loãng cần đủ cao để có cường độ tín hiệu đủ mạnh. Đối với dung dịch nội chuẩn ρ(Rh, Lu) = 5 mg/L, dùng pipet lấy 0,5 mL dung dịch nội chuẩn Rh và Lu 1000 mg/L cho vào từng bình định mức 100 mL, thêm 1 mL axit nitric, thêm nước đến vạch và chuyển dung dịch sang bình thích hợp.
  - Dùng pipet lấy 10 mL dung dịch zero hoặc dung dịch hiệu chuẩn cho vào bình đựng mẫu, thêm 0,1 mL dung dịch nội chuẩn pha loãng và trộn.

### 6.2. Chuẩn bị hệ thống cảm ứng cao tần Plasma cần hiệu chuẩn

- Phương tiện đo cần hiệu chuẩn (sau đây gọi tắt là PTĐ) phải đang hoạt động bình thường và được kiểm tra vận hành hoạt động theo đúng yêu cầu của nhà sản xuất quy định trong tài liệu kỹ thuật.
- Bật máy ICP và để nhiệt độ ổn định. Bước này thường mất khoảng 20 phút, tuy nhiên nếu thiết bị đã tắt trong thời gian dài thì có thể mất nhiều thời gian hơn.
- Làm sạch bộ đa sắc trong khoảng 20 phút trước khi bắt đầu hiệu chuẩn và để nguyên trong quá trình hiệu chuẩn thiết bị. Quá trình thanh lọc có thể xảy ra khi nhiệt độ của thiết bị đang ổn định.
- Điều chỉnh các hệ thống được cấu hình bằng AVS 6/7, AVS 4 và bộ lấy mẫu tự động. Thay ống cấp nước rửa/chất mang từ đầu vào của ống bơm nhu động bằng ống có thể ngâm trong dung dịch hiệu chuẩn.

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

Phải kiểm tra bên ngoài theo các yêu cầu sau đây:

- Kiểm tra bằng mắt để xác định sự phù hợp của PTĐ đối với các yêu cầu quy định trong tài liệu kỹ thuật, hình dáng kích thước, ký nhãn hiệu, nguồn nuôi, hiển thị, tài liệu và phụ kiện kèm theo.
- Lý lịch của thiết bị được cập nhật trong quá trình sử dụng (nếu có).

### 7.2. Kiểm tra kỹ thuật

Phải kiểm tra kỹ thuật theo các yêu cầu sau đây:

- Kiểm tra trạng thái hoạt động bình thường của PTĐ theo hướng dẫn sử dụng của nhà sản xuất.
- Kiểm tra rò rỉ tại các khớp nối liên kết giữa các đường ống dẫn của ICP cần hiệu chuẩn.

### 7.3. Kiểm tra đo lường

#### 7.3.1. Kiểm tra độ lặp lại

- Chọn điểm chuẩn có giá trị nồng độ nằm giữa khoảng tuyến tính ở mục 6.1 phù hợp với detector của máy ICP cần hiệu chuẩn để tiến hành kiểm tra độ lặp lại.
- Dùng máy ICP cần hiệu chuẩn tiến hành chạy mẫu tối thiểu 06 lần liên tiếp dung dịch chuẩn đã chọn với điều kiện đã được cài đặt.
- Ghi kết quả vào biên bản hiệu chuẩn.
- Độ lặp lại được tính toán bằng độ lệch chuẩn tương đối RSD theo công thức:

$$RSD = \frac{s}{\bar{x}} \times 100 \qquad \text{với } s = \sqrt{\frac{\sum_{i=1}^{n}(x_i - \bar{x})^2}{n-1}}$$

- `RSD`: độ lệch chuẩn tương đối của các kết quả đo lặp lại, %;
- `s`: độ lệch chuẩn của các kết quả đo lặp lại;
- `x_i`: giá trị đo lần thứ i (i = 1; 2; 3; 4; …);
- `x̄`: giá trị đo trung bình;
- `n`: số lần đo lặp lại (n = 6).

#### 7.3.2. Kiểm tra độ tuyến tính

- Độ tuyến tính của hệ thống ICP được xác định bằng cách ghi nhận cường độ tín hiệu với 05 điểm chuẩn có nồng độ ở mục 6.1 phù hợp với từng detector.
- Dùng máy ICP cần hiệu chuẩn tiến hành chạy mẫu tối thiểu 03 lần liên tiếp tại mỗi điểm nồng độ và theo chiều tăng nồng độ của dung dịch chuẩn đã chọn.
- Thiết lập đường chuẩn theo phương trình hồi quy tuyến tính y = ax + b biểu diễn sự phụ thuộc của cường độ tín hiệu và các điểm nồng độ của dung dịch chuẩn. Độ tuyến tính được đánh giá dựa vào hệ số tương quan R².
- **Hệ số tương quan tuyến tính: R² ≥ 0,995.**

## 8. Ước lượng độ không đảm bảo đo các phép đo của máy ICP

Nồng độ dung dịch pha loãng được tính theo công thức:

$$C_i = \frac{V_{i-1} \cdot C_{i-1}}{V_i}$$

- `C_i`: Nồng độ của dung dịch cần pha loãng thứ i (mg/L);
- `C_{i-1}`: Nồng độ chất chuẩn thứ i-1 (mg/L);
- `V_i`: Thể tích bình định mức dùng để pha loãng dung dịch thứ i (mL);
- `V_{i-1}`: Thể tích dung dịch cần hút để pha loãng dung dịch thứ i (mL).

**Độ KĐBĐ phép đo phân tích định lượng: u_Đ**

Các thành phần gây ra độ không đảm bảo đo tính toán cho mỗi detector:

- Độ KĐBĐ do độ phân tán kết quả đo n lần lặp lại: `u_A`

  $$S_C = \sqrt{\frac{\sum(x_i - x_{tb})^2}{n-1}} \qquad u_A = \frac{s_C}{\sqrt{n}}$$

  - `S_C`: độ lệch chuẩn giữa n lần đo;
  - `x_i`: giá trị diện tích peak đo lần i (i = 1, 2, …, n);
  - `x_tb`: giá trị đo trung bình;
  - `n`: số lần đo (n = 3).

**Các thành phần độ không đảm bảo đo — Bảng 4**

| STT   | Tên yếu tố ảnh hưởng                                        | Ký hiệu   | Đơn vị | Công thức tính |
| ----- | ----------------------------------------------------------- | --------- | ------ | -------------- |
| 1     | Độ lặp lại của PTĐ                                          | `u_A`     | mg/L   | $u_A = s_C/\sqrt{n}$ |
| 2     | ĐKĐB của dung dịch chuẩn gốc 100 mg/L (theo giấy chứng nhận) | `u_C0`   | mg/L   | $u_{C0} = a/k$ |
| 3     | ĐKĐB của dung dịch chuẩn thứ i                              | `u_Ci`    | mg/L   | (xem công thức `u_Ci` bên dưới) |
| 3.1   | ĐKĐB gây ra bởi pipet                                       | `u_pipet` |        | $u_{pipet} = \sqrt{u_{calp}^2 + u_{temp}^2}$ |
| 3.1.1 | ĐKĐB gây nên bởi pipet dùng để pha loãng dung dịch chuẩn    | `u_calp`  | mL     | $u_{calp} = d/k$ — pipet có thể tích `V_pipet` và ĐKĐB là `d` với hệ số phủ theo GCN (k = 2) |
| 3.1.2 | ĐKĐB do giãn nở nhiệt                                       | `u_temp`  | mL     | $u_{temp} = (V_{pipet} \times \gamma \times \Delta_i)/\sqrt{3}$ — `γ`: hệ số dãn nở/1 °C; `Δ_i`: sai lệch nhiệt độ so với 20 °C |
| 3.2   | ĐKĐB gây ra bởi bình định mức pha loãng                     | `u_flask` |        | $u_{flask} = \sqrt{u_{calf}^2 + u_{per}^2 + u_{temp}^2}$ |
| 3.2.1 | ĐKĐB gây nên bởi bình định mức dùng để pha loãng dung dịch chuẩn | `u_calf` | mL | $u_{calf} = e/k$ — bình định mức có thể tích `V_flask` và ĐKĐB là `e` với hệ số phủ theo GCN (k = 2) |
| 3.2.2 | ĐKĐB do thao tác của nhân viên thực hiện                    | `u_per`   | mL     | $u_{per} = 0{,}03/\sqrt{3}$ — sai số do thao tác (dư hoặc thiếu ở giọt cuối cùng, xấp xỉ ± 0,03 mL) |
| 3.2.3 | ĐKĐB do giãn nở nhiệt                                       | `u_temp`  | mL     | $u_{temp} = (V_{flask} \times \gamma \times \Delta_i)/\sqrt{3}$ |

Tính `u_Ci`:

$$u_{Ci} = C_i^2\sqrt{\left(\frac{u_{flask}}{V_{flask}}\right)^2 + \left(\frac{u_{pipet}}{V_{pipet}}\right)^2 + \left(\frac{u_{C_{i-1}}}{C_{i-1}}\right)^2}$$

- Độ KĐBĐ tổng hợp:

  $$u_{Đ} = \sqrt{u_A^2 + u_{Ci}^2}$$

- Độ KĐBĐ mở rộng:

  $$U_{Đ} = k \times u_{Đ}$$

  Độ không đảm bảo đo mở rộng với hệ số phủ k = 2, ở mức tin cậy 95 %.

- Tính độ KĐBĐ tương đối:

  $$\text{Độ KĐBĐ tương đối (\%)} = \frac{\text{Độ KĐBĐ mở rộng}}{\text{Giá trị đo}} \times 100$$

## 9. Xử lý chung

- Máy ICP sau khi hiệu chuẩn được dán tem hiệu chuẩn và cấp giấy chứng nhận hiệu chuẩn, kèm theo thông báo kết quả hiệu chuẩn.
- Chu kỳ hiệu chuẩn khuyến nghị: 12 tháng.

## 10. Phụ lục

- Phụ lục 01: Biên bản hiệu chuẩn (BBĐL);
- Phụ lục 02: Chuẩn bị dung dịch chuẩn;
- Phụ lục 03: Thông số kỹ thuật thiết bị.

---

## PHỤ LỤC 02 — CHUẨN BỊ DUNG DỊCH CHUẨN

### 1. Detector MS

**1.1. Trường hợp 1: Pha với dải thấp (max 50 µg/L)**

- Chuẩn bị dung dịch hiệu chuẩn 21 nguyên tố ở các nồng độ (10, 20, 30, 40, 50) µg/L từ dung dịch làm việc 10 mg/L (pha từ dung dịch chuẩn gốc 100 mg/L) vào bình định mức 100 mL. Định mức đến vạch bằng HNO₃ 1 %.

**Bảng 1**

| Dung dịch chuẩn                                            | 1   | 2   | 3   | 4   | 5   |
| ---------------------------------------------------------- | --- | --- | --- | --- | --- |
| Nồng độ dung dịch đa nguyên tố cần pha, µg/L               | 10  | 20  | 30  | 40  | 50  |
| Lượng dung dịch chuẩn đa nguyên tố 10 mg/L cần hút, µL     | 100 | 200 | 300 | 400 | 500 |
| Dung dịch nội chuẩn (nếu cần), mL                          | 0,1 | 0,1 | 0,1 | 0,1 | 0,1 |
| Bình định mức, mL                                          | 100 | 100 | 100 | 100 | 100 |

**1.2. Trường hợp 2: Pha với dải cao**

- Áp dụng đối với dòng máy Perkin Elmer hoặc các máy đáp ứng dải nồng độ cao.
- Chuẩn bị dung dịch hiệu chuẩn 21 nguyên tố ở các nồng độ (100, 200, 300, 400, 500) µg/L từ dung dịch làm việc 10 mg/L (pha từ dung dịch chuẩn gốc 100 mg/L) vào bình định mức 100 mL. Định mức đến vạch bằng HNO₃ 1 %.

**Bảng 2**

| Dung dịch chuẩn                                            | 1    | 2    | 3    | 4    | 5    |
| ---------------------------------------------------------- | ---- | ---- | ---- | ---- | ---- |
| Nồng độ dung dịch đa nguyên tố cần pha, µg/L               | 100  | 200  | 300  | 400  | 500  |
| Lượng dung dịch chuẩn đa nguyên tố 10 mg/L cần hút, µL     | 1000 | 2000 | 3000 | 4000 | 5000 |
| Dung dịch nội chuẩn (nếu cần), mL                          | 0,1  | 0,1  | 0,1  | 0,1  | 0,1  |
| Bình định mức, mL                                          | 100  | 100  | 100  | 100  | 100  |

### 2. Detector OES

**2.1. Trường hợp 1: Pha với dải thấp (max 50 µg/L)**

- Chuẩn bị dung dịch hiệu chuẩn 21 nguyên tố ở các nồng độ (10, 20, 30, 40, 50) µg/L từ dung dịch làm việc 10 mg/L (pha từ dung dịch chuẩn gốc 100 mg/L) vào bình định mức 100 mL. Định mức đến vạch bằng HNO₃ 0,5 %.

**Bảng 3**

| Dung dịch chuẩn                                            | 1   | 2   | 3   | 4   | 5   |
| ---------------------------------------------------------- | --- | --- | --- | --- | --- |
| Nồng độ dung dịch đa nguyên tố cần pha, µg/L               | 10  | 20  | 30  | 40  | 50  |
| Lượng dung dịch chuẩn đa nguyên tố 10 mg/L cần hút, µL     | 100 | 200 | 300 | 400 | 500 |
| Dung dịch nội chuẩn (nếu cần), mL                          | 0,1 | 0,1 | 0,1 | 0,1 | 0,1 |
| Bình định mức, mL                                          | 100 | 100 | 100 | 100 | 100 |

**2.2. Trường hợp 2: Pha với dải cao**

- Chuẩn bị dung dịch hiệu chuẩn 21 nguyên tố ở các nồng độ (100, 200, 300, 400, 500) µg/L từ dung dịch làm việc 10 mg/L (pha từ dung dịch chuẩn gốc 100 mg/L) vào bình định mức 100 mL. Định mức đến vạch bằng HNO₃ 0,5 %.

**Bảng 4**

| Dung dịch chuẩn                                            | 1    | 2    | 3    | 4    | 5    |
| ---------------------------------------------------------- | ---- | ---- | ---- | ---- | ---- |
| Nồng độ dung dịch đa nguyên tố cần pha, µg/L               | 100  | 200  | 300  | 400  | 500  |
| Lượng dung dịch chuẩn đa nguyên tố 10 mg/L cần hút, µL     | 1000 | 2000 | 3000 | 4000 | 5000 |
| Dung dịch nội chuẩn (nếu cần), mL                          | 0,1  | 0,1  | 0,1  | 0,1  | 0,1  |
| Bình định mức, mL                                          | 100  | 100  | 100  | 100  | 100  |

---

## PHỤ LỤC 03 — THÔNG SỐ KỸ THUẬT THIẾT BỊ

### Bảng I — Các chất đồng vị được khuyến cáo, giới hạn phát hiện và khả năng nhiễu của thiết bị (ICP-MS)

| Nguyên tố | Đồng vị | Giới hạn phát hiện của thiết bị (mg/L) | Nhiễu do ion đẳng áp và ion tích điện kép | Nhiễu do ion đa nguyên tử — độ phân giải khối lượng 300 | Nhiễu do ion đa nguyên tử — độ phân giải khối lượng 10 000 |
| --------- | ------- | --- | --- | --- | --- |
| As | 75   | 0,5 | | ArCl⁺, KAr⁺, CaCl⁺, KS⁺, CaS⁺, CoO⁺, CoNH⁺, NiN⁺, NiNH⁺ | |
| Au | 197  | *Chất chuẩn nội* | | TaO⁺, HfOH⁺, WOH⁺ | |
| Cd | 111  | 0,5 | | MoO⁺, MoOH⁺, AsAr⁺, SeCl⁺, SeS⁺, BrS⁺, ZnAr⁺ | MoO⁺, MoOH⁺ |
| Cd | 112 ᵃ | | | | |
| Cd | 114  | 0,2 | Sn⁺ | MoO⁺, MoOH⁺, SeCl⁺, SeS⁺, SeAr⁺, BrCl⁺, BrS⁺ | MoO⁺, MoOH⁺ |
| Hg | 199 ᵃ | | | | |
| Hg | 200  | 1   | | HgH⁺, WO⁺, WOH⁺ | HgH⁺ |
| Hg | 201 ᵃ | | | | |
| Hg | 202  | 0,2 | | HgH⁺, WO⁺ | HgH⁺ |
| Lu | 175  | *Chất chuẩn nội* | | BaCl⁺, BaAr⁺, CeCl⁺, LaAr⁺ | |
| Pb | 206  | 0,3 | | RhRh⁺ | |
| Pb | 207  | 0,3 | | PbH⁺, IrO⁺ | PbH⁺ |
| Pb | 208  | 0,2 | | PbH⁺, HgC⁺, PtO⁺ | PbH⁺ |
| Rh | 103  | *Chất chuẩn nội* | | Pb²⁺⁺, CuAr⁺, SrO⁺, SrOH⁺, SrNH⁺, KrOH⁺, ZnCl⁺ | SrO⁺ |

ᵃ Có thể sử dụng chất đồng vị làm chất kiểm soát chất lượng để kiểm tra tỷ lệ đồng vị.

### Bảng II — Bước sóng khuyến nghị ᵃ, giới hạn định lượng có thể đạt được (XLQ ᵇ) cho các loại thiết bị khác nhau và nhiễu phổ quan trọng (ICP-OES)

| Nguyên tố | Bước sóng (nm) | Xấp xỉ XLQ — đối chiếu qua tia (µg/L) | Xấp xỉ XLQ — đối chiếu qua trục (µg/L) | Nguyên tố cản trở |
| --- | --- | --- | --- | --- |
| Ag | 328,068 | (20) | (4) | Fe, Mn, Zr |
| Ag | 338,289 | (20) | (10) | Cr, Fe, Zr, Mn |
| Al | 167,079 | 1 | 2 | Fe, Pb |
| Al | 308,215 | 100 | 17 | Fe, Mn, OH, V |
| Al | 396,152 | 10 | 6 | Cu, Fe, Mo, Zr |
| As | 188,979 | 18 | 14 | Al, Cr, Fe, Ti |
| As | 193,696 | 5 | 14 | Al, Co, Fe, W, V |
| As | 197,197 | (100) | 31 | Al, Co, Fe, Pb, Ti |
| B  | 182,528 | (6) | — | S |
| B  | 208,957 | (5) | (7) | Al, Mo |
| B  | 249,677 | 10 | 5 | Co, Cr, Fe |
| B  | 249,772 | 4 | 24 | Co, Fe |
| Ba | 230,425 | — | 3 | — |
| Ba | 233,527 | 2 | 0,5 | Fe, V |
| Ba | 455,403 | 6 | 0,7 | Zr |
| Ba | 493,408 | (3) | 0,4 | — |
| Be | 313,042 | (2) | (0,1) | Fe |
| Be | 313,107 | — | (0,3) | V |
| Be | 234,861 | (5) | (0,1) | — |
| Bi | 233,060 | (40) | (17) | Co, Cu, Ti, V |
| Bi | 306,770 | (80) | (165) | Fe, Mo, V |
| Ca | 315,887 | 100 | 13 | Co, Mo |
| Ca | 317,933 | 26 | 4 | Fe, V |
| Ca | 393,366 | 0,4 | 25 | V, Zr |
| Ca | 422,673 | — | — | V, Mo, Zr |
| Cd | 214,441 | 1 | 0,9 | As, Cr, Fe, Sc, Sb |
| Cd | 226,502 | 4 | 0,2 | As, Co, Fe, Ni |
| Cd | 228,802 | 2 | 0,5 | As, Co, Sc |
| Co | 228,616 | 6 | 1 | Ti |
| Co | 238,892 | 10 | 3 | Fe |
| Cr | 205,559 | 1 | 5 | Be, Fe, Mo, Ni, Ti |
| Cr | 267,719 | 4 | 2 | Mn, P, V |
| Cr | 283,563 | (10) | (2) | Fe, Mo, V, W |
| Cr | 284,324 | (10) | — | Fe |
| Cu | 324,754 | 9 | 2 | Cr, Fe, Mo, Ti |
| Cu | 327,396 | 4 | 3 | Co, Ti |
| Fe | 238,204 | 14 | (3) | Co |
| Fe | 259,940 | 6 | 2 | Co |
| Fe | 271,441 | — | — | — |
| Ga | 287,424 | — | — | Cr |
| Ga | 294,364 | — | — | Fe, Ti |
| Ga | 417,204 | — | — | Fe, V |
| In | 230,605 | — | — | Fe |
| In | 325,609 | — | — | Mn |
| In | 410,175 | — | — | Ce |
| K  | 766,490 | 66 | 20 | Ar, Ba, Mg |
| K  | 769,896 | — | (230) | Ba |
| Li | 460,290 | 900 | (700) | Ar, Fe |
| Li | 670,788 | 6 | 10 | Ar |
| Mg | 279,078 | 33 | 19 | Fe |
| Mg | 279,553 | 1 | 7 | Fe |
| Mg | 285,213 | 4 | 14 | Cr |
| Mn | 257,610 | 1 | 0,4 | Cr, Fe, Mo, W |
| Mn | 293,305 | (20) | (8) | Al, Cr, Fe, Ti |
| Mo | 202,031 | (30) | (2) | Al, Fe, Ni |
| Mo | 204,597 | (50) | (6) | Co, Cr |
| Na | 330,237 | (20) | 300 | Zn |
| Na | 588,995 | 20 | 200 | Ar, V |
| Na | 589,592 | 93 | 20 | Ba |
| Ni | 221,648 | 10 | 2 | Si |
| Ni | 231,604 | 15 | 2 | Co, Sb |
| P  | 177,434 | 500 | (16) | Cu |
| P  | 178,221 | 25 | 13 | Fe, I |
| P  | 213,618 | 500 | 50 | Co, Cu, Fe, Mo, Zn |
| P  | 214,915 | 330 | 9 | Al, Co, Cu, Mg |
| S  | 180,669 | 13 | 33 | As, Ca |
| S  | 181,975 | 39 | 17 | Cr, Mo |
| Sb | 206,834 | (100) | (4) | Co, Cr, Fe, Mg, Mn |
| Sb | 217,582 | (100) | (18) | Pb, Fe |
| Se | 196,089 | (100) | (7) | — |
| Se | 203,984 | (100) | (7) | Cr, Sb |
| Si | 212,412 | 3 | (13) | Mo |
| Si | 251,611 | 20 | 10 | — |
| Si | 288,158 | (30) | 24 | Cr |
| Sn | 189,988 | (100) | (60) | Cr, Ti |
| Sn | 235,485 | (100) | (200) | Cd, Mo |
| Sn | 283,998 | — | (120) | |
| Sr | 407,711 | 2,6 | 0,6 | Cr |
| Sr | 421,552 | 0,1 | 0,1 | — |
| Sr | 460,733 | (10) | (3) | — |
| Ti | 334,941 | (5) | (2) | Cr |
| Ti | 336,123 | (10) | (1) | — |
| Ti | 337,280 | (10) | — | — |
| Ti | 368,521 | (10) | — | Co, Cr |
| V  | 290,881 | (10) | — | Fe, Mo |
| V  | 292,402 | (10) | (3) | Cr, Fe, Mo, V |
| V  | 310,229 | (10) | (0,7) | Cr, Mg |
| V  | 311,071 | (10) | (1) | Cr, Fe, Mn, Ti |
| W  | 202,998 | (60) | — | Ni, Zn |
| W  | 207,912 | (30) | (10) | Ni, Mo, V |
| W  | 209,860 | (60) | (20) | — |
| W  | 222,589 | (60) | (30) | Cr, Cu, Ni |
| W  | 239,711 | (60) | — | — |
| Zn | 202,548 | — | (3) | Cr, Cu, Co, Ni |
| Zn | 206,200 | 13 | 5 | Cr |
| Zn | 213,857 | 3,3 | 1 | Cu, Fe, Ni |
| Zr | 339,197 | — | (2) | Mo |
| Zr | 343,823 | (10) | (0,3) | — |
| Zr | 354,262 | (50) | (1) | — |

> **CHÚ THÍCH 1:** XLQ — Định nghĩa giới hạn định lượng (XLQ) theo định nghĩa 3.11.
>
> **CHÚ THÍCH 2:** Phần lớn số liệu XLQ thu được từ phép thử liên phòng thí nghiệm (xem Phụ lục B). Các phòng thí nghiệm tham gia được yêu cầu báo cáo về XLQ được tính theo định nghĩa 3.11. Trong Bảng 1, giá trị trung vị của các số liệu đã báo cáo đối với nền mẫu nước uống được đưa ra. Số liệu báo cáo trong dấu ngoặc lấy từ các nguồn khác.

ᵃ Bước sóng trong Bảng 1 theo bảng NIST dùng cho số liệu phổ nguyên tử cơ bản (http://physics.nist.gov/PhysRefData/Handbook/).

ᵇ Vì một số bước sóng chỉ là khuyến nghị cho các thiết bị chân không và không khuyến nghị cho các thiết bị khử trùng, nên việc lựa chọn bước sóng cho thiết bị đặc thù cần phải theo các khuyến nghị của nhà sản xuất.
