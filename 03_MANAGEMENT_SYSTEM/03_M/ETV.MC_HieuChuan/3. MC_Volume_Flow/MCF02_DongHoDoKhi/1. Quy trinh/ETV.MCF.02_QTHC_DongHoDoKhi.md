---
id: ETV.MCF 02
title: "Đồng hồ đo thể tích khí — Quy trình hiệu chuẩn"
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
keywords: [đồng hồ đo khí, gas gauge meter, thể tích khí, quy đổi điều kiện tiêu chuẩn, hiệu chuẩn]
related_documents: []
iso_clause: ["ISO/IEC 17025:2017"]
legal_basis: ["ĐLVN 131:2004", "ĐLVN 253:2015", "ĐLVN 304:2016", "ASTM D5337-11"]
ai_tags: [calibration-procedure, gas-volume-meter, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCF 02_Dong ho do khi_V1.pdf`"
supersedes: "ETV.MCF 02 lần ban hành 02 (22/04/2019, sửa 18/09/2019 và 03/01/2020)"
superseded_by: null
---
# ĐỒNG HỒ ĐO THỂ TÍCH KHÍ – QUY TRÌNH HIỆU CHUẨN

*Gas Gauge Meter – Calibration Procedure*

|                   |                     |
| ----------------- | ------------------- |
| **Mã số**         | ETV.MCF 02          |
| **Lần ban hành**  | 03                  |
| **Ngày ban hành** | 22/04/2026          |
| **Biên soạn**     | *(bản gốc để trống)* |
| **Soát xét**      | Trần Thị Hoa        |
| **Phê duyệt**     | Nguyễn Hoàng Giang  |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCF 02_Dong ho do khi_V1.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khối chữ ký trên trang bìa để trống, chưa có tên người biên soạn.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian  | Nội dung thay đổi                                     | Lần ban hành |
| ---------- | ---------------------------------------------------------- | ------------ |
| 22/04/2019 | Ban hành lần thứ nhất                                       | 01           |
| 18/09/2019 | Ban hành lần thứ hai (sửa theo ý kiến chuyên gia kỹ thuật của BoA) | 02    |
| 03/01/2020 | Sửa theo ý kiến chuyên gia kỹ thuật của BoA                 | 02           |
| 03/01/2020 | Ban hành lần 3[^lan3]                                       | 03           |
| 22/04/2026 | *(lần ban hành hiện tại, xem trang bìa)*                    | 03           |

[^lan3]: Bản gốc ghi cùng ngày 03/01/2020 cho cả hai dòng "sửa theo ý kiến chuyên gia" (lần 02) và "Ban hành lần 3" (lần 03) — nhiều khả năng là trùng lặp/lỗi ghi ngày trong bảng theo dõi thay đổi gốc. Giữ nguyên văn. Trang bìa của bản PDF gốc ghi ngày ban hành hiện hành là 22/04/2026, lần ban hành 03 — dùng làm giá trị `effective_date`/`revision` chính thức của bản chuyển đổi này.

---

## 1. Phạm vi áp dụng

Quy trình này quy định quy trình kỹ thuật hiệu chuẩn phương tiện đo (PTĐ) lưu lượng khí dạng thể tích có phạm vi hiển thị thể tích đến 99.999 m³, độ chính xác 5 %.

Quy trình này áp dụng đối với nhân viên của Viện Kiểm định Công nghệ và Môi trường (sau đây gọi tắt là PTN) khi hiệu chuẩn PTĐ nói trên.

## 2. Giải thích từ ngữ

### 2.1. Thuật ngữ, định nghĩa

1. **Lưu lượng khí:** là lượng chất khí chảy qua thiết bị trong một khoảng thời gian.
2. **Đồng hồ thể tích khí dạng thể tích:** là các phương tiện đo dạng đếm thể tích khí.
3. **Điều kiện tiêu chuẩn:** là điều kiện mà tại đó có áp suất tiêu chuẩn (P0 = 1013,25 hPa), nhiệt độ tiêu chuẩn (T0 = 298,15 °K).[^t0]
4. **Hiệu chuẩn:** là hoạt động xác định, thiết lập mối quan hệ giữa giá trị đo của chuẩn đo lường, phương tiện đo với giá trị đo của đại lượng cần đo.
5. **Hiệu chỉnh:** là tập hợp các thao tác được tiến hành trên hệ thống đo để cho ra số chỉ đã quy định tương ứng với giá trị đã cho của đại lượng được đo.
6. **Độ không đảm bảo đo (ĐKĐB):** thông số gắn với kết quả của phép đo, đặc trưng cho sự phân tán của các giá trị có thể quy cho đại lượng đo một cách hợp lý.
7. **Đơn vị tính:** m³.

[^t0]: Cùng lưu ý như tại `ETV.MCF 01`: mục định nghĩa ghi T0 = 298,15 K nhưng bảng ký hiệu và công thức tính toán trong thân văn bản đều dùng T0 = 273,15 K.

### 2.2. Ký hiệu

| Ký hiệu | Chi tiết                                                       | Đơn vị |
| -------- | ---------------------------------------------------------------- | ------ |
| Ttb      | Nhiệt độ đo tại thiết bị                                          | K      |
| Ptb      | Áp suất đo tại thiết bị                                           | hPa    |
| Vtb      | Thể tích của thiết bị                                             | L      |
| Tc       | Nhiệt độ đo tại chuẩn                                             | K      |
| Pc       | Áp suất đo tại chuẩn                                              | hPa    |
| Vc       | Thể tích của chuẩn                                                | L      |
| T0       | Nhiệt độ tiêu chuẩn (273,15 K)                                    | K      |
| P0       | Áp suất tiêu chuẩn (1013,25 hPa)                                  | hPa    |
| V0tb     | Thể tích của thiết bị chuyển về điều kiện tiêu chuẩn              | L      |
| V0c      | Thể tích của chuẩn chuyển về điều kiện tiêu chuẩn                 | L      |
| V0       | Thể tích quy về điều kiện tiêu chuẩn                              | L      |
| V        | Thể tích ở điều kiện đo                                           | L      |

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

| TT  | Phương tiện hiệu chuẩn        | Đặc trưng kỹ thuật                                                                                       |
| --- | -------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| 1   | **Chuẩn đo lường**               |                                                                                                                    |
| 1.1 | Chuẩn đồng hồ thể tích khí        | Phạm vi hiển thị: 99999,9998 m³; độ không đảm bảo đo nhỏ hơn 1/2 sai số cho phép của đối tượng đo; thiết bị chuẩn được liên kết chuẩn với cấp cao hơn và có giấy chứng nhận kèm theo |
| 2   | **Phương tiện phụ**              |                                                                                                                    |
| 2.1 | Thiết bị đo áp suất              | Phạm vi đo: (600 ÷ 1.100) hPa; độ chính xác: ± 2,0 hPa                                                          |
| 2.2 | Thiết bị đo nhiệt độ             | Phạm vi đo: (0 ÷ 50) °C; độ chính xác: ± 1 °C                                                                    |
| 2.3 | Thiết bị đo độ ẩm                | Phạm vi đo: (15 ÷ 95) %RH; độ chính xác: ± 5 %RH                                                                 |
| 2.4 | Thiết bị đo thời gian            | Giá trị độ chia d = 0,01 s                                                                                        |
| 3   | **Phương tiện khác**             |                                                                                                                    |
| 3.1 | Dụng cụ bảo hộ                   | Áo blu, khẩu trang, găng tay                                                                                      |

## 5. Điều kiện hiệu chuẩn

Khi tiến hành hiệu chuẩn, phải đảm bảo các điều kiện môi trường sau đây:

- Địa điểm làm việc phải sạch sẽ, thoáng mát;
- Nhiệt độ: (20 ÷ 30) °C; sự thay đổi của nhiệt độ không vượt quá ± 2 °C;
- Áp suất: (960 ÷ 1.080) hPa; sự thay đổi của áp suất không vượt quá ± 10 hPa;
- Độ ẩm không khí: (40 ÷ 85) %RH; sự thay đổi của độ ẩm không vượt quá ± 5 %RH;
- Đảm bảo các đầu nối, ống dẫn khí trong hệ thống hiệu chuẩn phải kín.

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành hiệu chuẩn phải thực hiện các công việc chuẩn bị sau đây:

- Đồng hồ thể tích cần hiệu chuẩn phải được đặt trong phòng đạt điều kiện hiệu chuẩn ít nhất 30 phút trước khi tiến hành hiệu chuẩn;
- Kết nối đầu lấy mẫu của đồng hồ thể tích với hệ thống chuẩn thể tích và lắp đặt thiết bị đo nhiệt độ, áp suất trên PTĐ cần hiệu chuẩn;
- Kiểm tra độ kín của hệ thống hiệu chuẩn bằng cách đóng hoàn toàn van đầu vào của đồng hồ chuẩn và bật bơm hút của đồng hồ thể tích cần hiệu chuẩn ở mức 80 % công suất hút tối đa. Nếu thể tích hút xấp xỉ 0 m³ thì hệ thống hiệu chuẩn đã kín, ngược lại cần xem lại các vị trí đầu nối sau đó tiến hành kiểm tra lại độ kín.

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

Phải kiểm tra bên ngoài theo các yêu cầu sau đây:

- Kiểm tra nhãn mác: thiết bị cần hiệu chuẩn phải có ký hiệu chiều lưu lượng, có nhãn mác ghi rõ xuất xứ, số hiệu sản phẩm (Serial);
- Kiểm tra bằng mắt để xác định sự phù hợp của thiết bị cần hiệu chuẩn đối với các yêu cầu quy định trong tài liệu kỹ thuật, hình dáng kích thước, hiển thị, tài liệu và phụ kiện kèm theo.

### 7.2. Kiểm tra kỹ thuật

Phải kiểm tra kỹ thuật theo các yêu cầu sau đây: kiểm tra trạng thái hoạt động bình thường của thiết bị cần hiệu chuẩn theo hướng dẫn sử dụng.

### 7.3. Kiểm tra đo lường

Đồng hồ thể tích được kiểm tra đo lường theo trình tự nội dung, phương pháp và yêu cầu sau đây:

- Kết nối phương tiện đo cần hệ thống hiệu chuẩn gồm đồng hồ khí chuẩn và các thiết bị đo nhiệt độ, áp suất trên đường ống;
- Điều chỉnh lưu lượng cần hiệu chuẩn trên PTĐ cần hiệu chuẩn;
- Chuyển hệ thống chuẩn về trạng thái bắt đầu;
- Chuyển dòng lưu lượng cho chất khí chảy qua PTĐ vào hệ thống hiệu chuẩn;
- Tắt PTĐ và xác định giá trị thể tích, nhiệt độ, áp suất chỉ thị trên hệ thống chuẩn và thể tích, nhiệt độ, áp suất trên PTĐ;
- Thực hiện ít nhất 5 lần đo, mỗi lần đo thể tích hút mẫu tối thiểu 500 lần giá trị độ chia;
- Thực hiện các phép đo với giá trị thể tích của PTĐ cần hiệu chuẩn tại ít nhất 3 điểm lưu lượng (1 ÷ 1,1)Qmin, (0,45 ÷ 0,55)Qmax, (0,9 ÷ 1)Qmax. Đợi giá trị chỉ thị ổn định, ghi lại kết quả thể tích, nhiệt độ, áp suất vào biên bản Phụ lục I;
- Quy đổi kết quả đo thể tích tại chuẩn và tại đồng hồ thể tích ở điều kiện đo về cùng điều kiện tiêu chuẩn để so sánh khi tính toán kết quả hiệu chuẩn.

Công thức quy đổi đối với thể tích tại chuẩn:

`V_oc = V_c × (P_c/P_0) × (T_0/T_c) × (Z_0/Z)  (2)`

Công thức quy đổi đối với thể tích tại PTĐ:

`V_otb = V_tb × (P_tb/P_0) × (T_0/T_tb) × (Z_0/Z)  (3)`

Trong đó:

- `V_oc`: thể tích tại chuẩn ở điều kiện đo quy đổi về điều kiện tiêu chuẩn, m³;
- `V_otb`: thể tích tại PTĐ ở điều kiện đo quy đổi về điều kiện tiêu chuẩn, m³;
- `V_c`: thể tích tại chuẩn ở điều kiện đo, m³;
- `V_tb`: thể tích tại PTĐ ở điều kiện đo, m³;
- `P_0`: áp suất tại điều kiện tiêu chuẩn, hPa;
- `P_c`: áp suất trung bình tại chuẩn ở điều kiện đo trong thời gian thực hiện hiệu chuẩn, hPa;
- `P_tb`: áp suất trung bình tại PTĐ ở điều kiện đo trong thời gian thực hiện hiệu chuẩn, hPa;
- `T_0`: nhiệt độ tại điều kiện tiêu chuẩn, K;
- `T_c`: nhiệt độ trung bình tại chuẩn ở điều kiện đo trong thời gian thực hiện hiệu chuẩn, K;
- `T_tb`: nhiệt độ trung bình tại PTĐ ở điều kiện đo trong thời gian thực hiện hiệu chuẩn, K;
- `Z_0, Z`: lần lượt là hệ số nén của không khí ở điều kiện tiêu chuẩn và điều kiện đo, chúng được xác định theo tài liệu "Gas Property Equations for NIST Fluid Flow Gas Flow Measurement Calibration Services, John D. Wright" trang 3, ấn bản năm 2004; chúng được coi bằng 1 nếu áp suất của thiết bị không lớn hơn 300 kPa.

Số hiệu chính tại mỗi điểm thể tích hiệu chuẩn được xác định bằng hiệu số giữa giá trị trung bình của các kết quả đo trên phương tiện đo và chuẩn theo công thức:

`Δ hc = V_oc - V_otb = (V_c × (P_c/P_0) × (T_0/T_c) × (Z_0/Z)) - (V_tb × (P_tb/P_0) × (T_0/T_tb) × (Z_0/Z)) = 1013,25(1/298,15)(V_c × (P_c/T_c) - V_tb × (P_tb/T_tb))  (4)`

Trong trường hợp khách hàng yêu cầu PTN hiệu chuẩn tại các điểm cố định khác thì PTN tiến hành hiệu chuẩn PTĐ theo yêu cầu của khách hàng.

### 7.4. Tính toán độ không đảm bảo đo

Độ không đảm bảo của toàn bộ quá trình hiệu chuẩn Đồng hồ thể tích khí được dựa trên sự phân tích các nguồn gây nên sai số chủ yếu là các nguồn có tính chất ngẫu nhiên của các phép đo và tính toán trung gian. Các độ không đảm bảo thành phần được xác định, tổng hợp thành độ không đảm bảo tổng hợp gắn với giá trị trung bình thể tích và cuối cùng thông báo dưới dạng ĐKĐB mở rộng với hệ số phủ k = 2, xác suất tin cậy P = 95 %.

#### 7.4.1. Các yếu tố gây ra ĐKĐB bao gồm

- PTĐ cần hiệu chuẩn;
- Chuẩn đo lường;
- Thiết bị đo nhiệt độ, áp suất chuẩn;
- Một số ảnh hưởng ngẫu nhiên khác.

#### 7.4.2. Tính toán ĐKĐB của các yếu tố ảnh hưởng tại tất cả các điểm hiệu chuẩn

Từ mô hình tính toán Δhc theo công thức (4), các thành phần của độ không đảm bảo đo cho trong bảng sau:

| Yếu tố                                              | Phân bố  | Loại | ĐKĐB chuẩn |
| ------------------------------------------------------- | -------- | ---- | ---------- |
| ĐKĐB do độ lặp lại của PTĐ cần hiệu chuẩn                | Chuẩn    | A    | uA         |
| ĐKĐB do ảnh hưởng của độ phân giải của PTĐ cần hiệu chuẩn | Chữ nhật | B    | upg        |
| ĐKĐB của chuẩn thể tích                                  | Chuẩn    | B    | uch        |
| ĐKĐB của PTĐ áp suất tại chuẩn                           | Chuẩn    | B    | upc        |
| ĐKĐB của PTĐ nhiệt độ tại chuẩn                          | Chuẩn    | B    | utc        |
| ĐKĐB của PTĐ nhiệt độ tại PTĐ                            | Chuẩn    | B    | uttb       |
| ĐKĐB của PTĐ áp suất tại PTĐ                             | Chuẩn    | B    | uptb       |

Ta có ĐKĐB tổng hợp là đại lượng được xác định từ tổ hợp chuẩn:

`u_hc = √(u_Voc² + u_Votb²)  (5)`

Với:

`u_Voc = V_oc × √((u_ch²/V_oc²) + (u_pc²/P_c²) + (u_tc²/((T_c + 273,15)²)))`

`u_Votb = V_otb × √(((u_A² + u_pg²)/V_od²) + (u_ptb²/P_tb²) + (u_ttb²/((T_tb + 273,15)²)))`

Tính `u_ch`:

`u_ch = (U_ch/2)  (6)`

`U_ch`: ĐKĐB của chuẩn thể tích lấy từ giấy chứng nhận hiệu chuẩn, m³.

Tính `u_pc`:

`u_pc = (U_pc/2)  (7)`

`U_pc`: ĐKĐB của thiết bị đo áp suất tại chuẩn từ giấy chứng nhận hiệu chuẩn, hPa.

Tính `u_tc`:

`u_tc = (U_tc/2)  (8)`

`U_tc`: ĐKĐB của thiết bị đo nhiệt độ tại chuẩn từ giấy chứng nhận hiệu chuẩn, K.

Tính `u_A`:

`u_A = s(‾(Δ hc)) = (s(Δ hc_k)/√(n)) = √((Σ(k=1→n) (Δ hc_k - ‾(Δ hc))²)/(n(n-1) × ‾(Δ hc)²)) × 100 (%)  (9)`

Trong hầu hết các trường hợp, ước lượng tốt nhất có thể có của các giá trị kỳ vọng của kết quả hiệu chính thể tích Δhc là trung bình số học `Δhc̄`, nó thay đổi một cách ngẫu nhiên. Trung bình số học của n kết quả đo độc lập:

`‾(Δ hc) = (1/n)Σ(k=1→n) Δ hc_k  (10)`

Độ lệch chuẩn thực nghiệm `s(Δhc_k)` được dùng để ước lượng phân bố của Δhc:

`s(Δ hc_k) = √((1/(n-1))Σ(k=1→n) (Δ hc_k - ‾(Δ hc))²)  (11)`

Độ lệch chuẩn thực nghiệm `s(Δhc̄)` của giá trị trung bình được dùng để ước lượng độ rộng của phân bố các giá trị trung bình:

`s(‾(Δ hc)) = (s(Δ hc_k)/√(n))  (12)`

Tính `u_pg`:

`u_pg = (d/2√(3))  (13)`

`d`: giá trị độ phân giải, L.

Tính `u_ptb`:

`u_ptb = (U_ptb/2)  (14)`

`u_ptb`: ĐKĐB của thiết bị đo áp suất tại PTĐ lấy theo giấy chứng nhận hiệu chuẩn, hPa.

Tính `u_ttb`:

`u_ttb = (U_ttb/2)  (15)`

`U_ttb`: ĐKĐB của thiết bị đo nhiệt độ tại PTĐ lấy theo giấy chứng nhận hiệu chuẩn, K.

**Tính toán ĐKĐB tổng hợp:** ĐKĐB tổng hợp (uc) tại mỗi điểm thể tích:

`u_c = √(u_Voc² + u_Votb²) (L)  (16)`

ĐKĐB mở rộng được xác định cho mỗi điểm thể tích:

`U = k × u_c (L)  (17)`

Với k là hệ số bao phủ, hệ số bằng số được sử dụng như là bội của ĐKĐB chuẩn kết hợp để đưa ra ĐKĐB mở rộng, thường được chọn k = 2 với mức tin cậy xấp xỉ 95 %.

## 8. Xử lý chung

- **8.1.** Đồng hồ đo thể tích khí sau khi hiệu chuẩn được dán tem, cấp giấy chứng nhận hiệu chuẩn kèm theo kết quả hiệu chuẩn.
- **8.2.** Chu kỳ hiệu chuẩn được khuyến nghị là 01 năm.

## 9. Phụ lục

Biên bản hiệu chuẩn đồng hồ đo thể tích khí (`ETV.MCF.F 02.01`).

## PHỤ LỤC 02 — Sơ đồ hiệu chuẩn Đồng hồ đo thể tích

Chuẩn — PTĐ (kết nối trực tiếp).

## TÀI LIỆU THAM KHẢO

1. ĐLVN 131:2004, "Hướng dẫn đánh giá và trình bày độ không đảm bảo đo", 23 trang.
2. C. Douglas Faison and Carroll S. Brickenkamp (2004), "NIST Handbook 150-2G Calibration Laboratories Technical Guide for Mechanical Measurements".
3. Casella USA (2005), "APEX SERIES PERSONAL AIR SAMPLING PUMPS & PUMPMANAGER SOFTWARE".
4. ASTM D5337-11, "Standard Practice for Flow Rate for Calibration of Personal Sampling Pumps".
5. ĐLVN 253:2015, "Đồng hồ khí công nghiệp - quy trình kiểm định".
6. ĐLVN 304:2016, "Đồng hồ chuẩn đo khí kiểu vòi phun - quy trình hiệu chuẩn".
