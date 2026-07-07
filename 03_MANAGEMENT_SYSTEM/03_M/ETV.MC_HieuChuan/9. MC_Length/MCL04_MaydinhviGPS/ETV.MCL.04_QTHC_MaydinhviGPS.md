---
id: ETV.MCL 04
title: "Phương tiện đo định vị bằng vệ tinh (GNSS/GPS) cầm tay — Quy trình hiệu chuẩn"
type: Quy-trinh
owner: "Trần Thị Hoa"
department: "Phòng Đo lường Chất lượng"
process: ""
effective_date: "18/05/2026"
revision: "01"
status: Da-phe-duyet
keywords: [GNSS, GPS, định vị vệ tinh, hiệu chuẩn, tọa độ, độ cao, độ không đảm bảo đo]
related_documents: [ETV.MCL.F04.01, ETV.MCL.F04.02, ETV.MCL.F04.03, ETV.MCL.F04.04]
iso_clause: ["ISO/IEC 17025:2017", "ISO 19157:2013", "ISO 17123-8:2015", "TCVN 9595-3:2013", "JCGM 100:2008 (GUM)"]
legal_basis: []
ai_tags: [calibration-procedure, gnss, gps, uncertainty-evaluation]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "LĐV"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV)"
supersedes: null
superseded_by: null
---
# PHƯƠNG TIỆN ĐO ĐỊNH VỊ BẰNG VỆ TINH (GNSS) – QUY TRÌNH HIỆU CHUẨN

*Global Navigation Satellite systems (GNSS) – Calibration procedure*

|                           |                      |
| ------------------------- | -------------------- |
| **Mã số**         | ETV.MCL 04             |
| **Lần ban hành**  | 01                   |
| **Ngày ban hành** | 18/05/2026           |
| **Biên soạn**     | Trần Thị Hoa   |
| **Soát xét**      | Nguyễn Ngọc Tuấn       |
| **Phê duyệt**     | Nguyễn Hoàng Giang |

> **Tình trạng bản này: ĐÃ PHÊ DUYỆT** — Bản dự thảo/gợi ý chuyển đổi định dạng do AI thực hiện từ file Word gốc; cần LĐP soát xét và LĐV phê duyệt trước khi coi là bản chính thức áp dụng thay thế file .docx gốc.

## THEO DÕI SỬA ĐỔI TÀI LIỆU

| Thời gian | Lý do soát xét, ban hành lại | Lần ban hành |
|---|---|---|
| 18/05/2026 | Ban hành lần 01 | 01 |

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

---

# PHƯƠNG TIỆN ĐO ĐỊNH VỊ BẰNG VỆ TINH (GNSS/GPS) CẦM TAY – QUY TRÌNH HIỆU CHUẨN

*Handheld Global Navigation Satellite Systems (GNSS/GPS) – Calibration Procedure*

## 1. Phạm vi áp dụng

Quy trình này quy định phương pháp hiệu chuẩn các phương tiện đo định vị bằng vệ tinh (GNSS/GPS) cầm tay hoạt động ở chế độ định vị điểm (Standalone Positioning), sử dụng để xác định tọa độ và độ cao tại hiện trường.

Áp dụng tại phòng thí nghiệm hoặc ngoài hiện trường đối với các phương tiện đo sau:

| TT | Tên đối tượng | Phạm vi đo | MPE/LOD |
|---|---|---|---|
| 1 | Máy định vị vệ tinh GPS/GNSS cầm tay | Vĩ độ: -90° đến +90°; Kinh độ: -180° đến +180°; Tọa độ phẳng E, N (m): theo múi chiếu VN-2000 hoặc WGS-84; Độ cao (h): m; theo đặc tính PTĐ | Theo đặc tính kỹ thuật của PTĐ hoặc yêu cầu khách hàng |
| 2 | Thiết bị ghi tọa độ hiện trường | Tọa độ E, N, h hoặc tọa độ địa lý | Theo đặc tính kỹ thuật của PTĐ hoặc yêu cầu sử dụng |

Ví dụ:

- Garmin GPSMap 65s;
- Garmin GPSMap 66s;
- Garmin eTrex 32x;
- Trimble Juno;
- Bad Elf Flex;
- Các thiết bị tương đương.

Quy trình này không áp dụng cho bộ thu GNSS RTK Base–Rover (ETV.MCL.03).

## 2. Giải thích từ ngữ và thuật ngữ viết tắt

Các từ ngữ và ký hiệu trong quy trình này được hiểu như sau:

- **Hiệu chuẩn (Calibration):** Hoạt động xác định mối quan hệ giữa giá trị do phương tiện đo chỉ thị với giá trị chuẩn tương ứng của đại lượng đo.
- **Hiệu chỉnh (Adjustment):** Tập hợp các thao tác được thực hiện trên phương tiện đo nhằm đưa số chỉ của phương tiện đo về giá trị quy định.
- **Độ không đảm bảo đo (Measurement uncertainty):** Thông số gắn với kết quả đo, đặc trưng cho sự phân tán của các giá trị có thể quy cho đại lượng đo một cách hợp lý.
- **GNSS (Global Navigation Satellite System):** Hệ thống định vị dẫn đường bằng vệ tinh toàn cầu, bao gồm GPS, GLONASS, Galileo, BeiDou và các hệ thống vệ tinh tương tự.
- **GPS (Global Positioning System):** Hệ thống định vị toàn cầu do Hoa Kỳ phát triển.
- **RTK (Real-Time Kinematic):** Phương pháp định vị động thời gian thực sử dụng số liệu hiệu chỉnh từ trạm tham chiếu để đạt độ chính xác ở mức centimet.
- **GNSS RTK:** Hệ thống định vị vệ tinh sử dụng kỹ thuật RTK, gồm một hoặc nhiều bộ thu GNSS làm việc ở chế độ định vị động thời gian thực.
- **PDOP (Position Dilution of Precision):** Hệ số suy giảm độ chính xác vị trí, phản ánh ảnh hưởng của hình học phân bố vệ tinh đến độ chính xác định vị. Giá trị PDOP càng nhỏ thì chất lượng định vị càng tốt.
- **HDOP (Horizontal Dilution of Precision):** Hệ số suy giảm độ chính xác theo phương ngang.
- **VDOP (Vertical Dilution of Precision):** Hệ số suy giảm độ chính xác theo phương đứng.
- **E (Easting):** Tọa độ phẳng theo hướng Đông trong hệ tọa độ sử dụng, đơn vị mét (m).
- **N (Northing):** Tọa độ phẳng theo hướng Bắc trong hệ tọa độ sử dụng, đơn vị mét (m).
- **h (Ellipsoidal height):** Độ cao trắc địa hoặc độ cao của điểm đo so với mặt ellipsoid tham chiếu, đơn vị mét (m).
- **H (Orthometric height):** Độ cao thủy chuẩn hoặc độ cao chính thường, đơn vị mét (m).
- **MPE (Maximum Permissible Error):** Sai số cho phép lớn nhất của phương tiện đo theo đặc tính kỹ thuật của nhà sản xuất hoặc theo yêu cầu kỹ thuật quy định.
- **U (Expanded uncertainty):** Độ không đảm bảo đo mở rộng.
- **uc (Combined standard uncertainty):** Độ không đảm bảo đo chuẩn tổng hợp.
- **k (Coverage factor):** Hệ số phủ dùng để tính độ không đảm bảo đo mở rộng. Thông thường chọn k = 2, tương ứng với mức tin cậy xấp xỉ 95%.
- **Điểm chuẩn tọa độ:** Điểm có giá trị tọa độ E, N, h hoặc vĩ độ, kinh độ, độ cao đã được xác định và có khả năng liên kết chuẩn tới chuẩn đo lường quốc gia hoặc quốc tế.
- **Điểm đo:** Vị trí thực hiện phép hiệu chuẩn phương tiện đo GNSS/GPS cầm tay.
- **Sai số tọa độ ngang (Horizontal position error):** Sai lệch giữa tọa độ mặt bằng đo được và tọa độ chuẩn của điểm đo.
- **Sai số độ cao (Vertical error):** Sai lệch giữa độ cao đo được và độ cao chuẩn của điểm đo.
- **VN-2000:** Hệ quy chiếu và hệ tọa độ quốc gia Việt Nam.
- **WGS-84 (World Geodetic System 1984):** Hệ quy chiếu trắc địa toàn cầu được sử dụng phổ biến trong các hệ thống GNSS.

## 3. Các phép hiệu chuẩn

| TT | Tên phép đo | Ký hiệu | Điều mục | Ghi chú |
|---|---|---|---|---|
| 1 | Kiểm tra bên ngoài | KTBN | 7.1 | Bắt buộc |
| 2 | Kiểm tra kỹ thuật | KTKT | 7.2 | Bắt buộc |
| 3 | Hiệu chuẩn tọa độ mặt bằng | H | 7.3.3 | Bắt buộc |
| 4 | Hiệu chuẩn độ cao | V | 7.3.3 | Khi áp dụng |
| 5 | Đánh giá độ lặp lại và ĐKĐBĐ | U | 7.3.4; 7.3.5 | Bắt buộc |

## 4. Phương tiện phục vụ hiệu chuẩn

### 4.1 Chuẩn đo lường (thiết bị)

| TT | Tên thiết bị | Đặc trưng kỹ thuật | Liên kết chuẩn |
|---|---|---|---|
| 1 | Bộ thu GNSS RTK cấp trắc địa | Leica GS18, Trimble R10, CHCNAV i93 hoặc tương đương | GCN hiệu chuẩn còn hiệu lực |
| 2 | Máy toàn đạc hoặc máy thủy chuẩn (nếu áp dụng) | Kiểm tra điểm chuẩn | GCN hiệu chuẩn |
| 3 | Nhiệt ẩm kế, áp kế | Theo dõi điều kiện môi trường | GCN hiệu chuẩn |

### 4.2 Chuẩn đo lường (chuẩn mẫu)

| TT | Đối tượng | Giá trị chuẩn |
|---|---|---|
| 1 | Điểm chuẩn tọa độ | E₀, N₀, h₀ |
| 2 | Điểm chuẩn VN-2000 hoặc WGS-84 | Theo hồ sơ xác lập |

**Yêu cầu:** Độ không đảm bảo đo của điểm chuẩn nên nhỏ hơn hoặc bằng 1/3 MPE của phương tiện đo cần hiệu chuẩn (Chi tiết tại Phụ lục 03).

**Ghi chú:** Trường hợp nhà sản xuất không công bố MPE, sử dụng yêu cầu kỹ thuật do khách hàng xác định làm cơ sở đánh giá. Nếu không có, chỉ công bố kết quả đo mà không kết luận đạt/không đạt (xem Giải quyết tại Mục 7.3.5.2).

### 4.3 Vật liệu, dụng cụ

- Chân máy;
- Đế định tâm;
- Máy tính;
- Phần mềm xử lý GNSS;
- Nguồn điện;
- Sổ ghi chép.

## 5. Điều kiện môi trường

- Nhiệt độ: (15 ÷ 35) °C;
- Độ ẩm: ≤ 85 %RH;
- Không mưa;
- Không có vật cản lớn;
- Hạn chế phản xạ đa đường;
- PDOP ≤ 6;
- Số lượng vệ tinh ≥ 5.

## 6. Chuẩn bị hiệu chuẩn

- Kiểm tra hiệu lực chuẩn đo lường;
- Kiểm tra tình trạng thiết bị;
- Xác định hệ tọa độ;
- Kiểm tra pin, bộ nhớ;
- Chọn tối thiểu 03 điểm chuẩn;
- Ghi nhận điều kiện môi trường;
- Ghi nhận số vệ tinh và PDOP.

## 7. Tiến hành hiệu chuẩn

### 7.1 Kiểm tra bên ngoài

Kiểm tra:

- Nhãn mác;
- Màn hình;
- Bàn phím;
- Anten;
- Pin;
- Phụ kiện đi kèm.

### 7.2 Kiểm tra kỹ thuật

Kiểm tra:

- Khởi động thiết bị;
- Thu tín hiệu vệ tinh;
- Thiết lập hệ tọa độ;
- Chức năng ghi dữ liệu;
- Hiển thị bình thường.

### 7.3 Kiểm tra đo lường

#### 7.3.1 Nguyên tắc

So sánh kết quả chỉ thị của thiết bị với giá trị tọa độ chuẩn tại các điểm chuẩn đã biết.

#### 7.3.2 Trình tự đo

- Sử dụng tối thiểu 03 điểm chuẩn;
- Mỗi điểm đo tối thiểu 10 lần;
- Thời gian chờ tối thiểu 30 giây giữa các lần đo;
- Ghi nhận: E, N, h; PDOP; Số vệ tinh; Thời gian đo.

#### 7.3.3 Tính toán kết quả

Việc tính sai số, giá trị trung bình, độ lệch chuẩn và độ không đảm bảo đo được thực hiện riêng cho từng điểm chuẩn. Kết quả cuối cùng của phương tiện đo được tổng hợp từ các điểm chuẩn sử dụng trong phép hiệu chuẩn. Trường hợp công bố một kết quả đại diện, lấy giá trị sai số lớn nhất hoặc giá trị bất lợi nhất trong các điểm chuẩn, trừ khi có quy định khác.

Sai số thành phần:

ΔE = E − E₀
ΔN = N − N₀
Δh = h − h₀

Sai số vị trí mặt bằng:

eH = √(ΔE² + ΔN²)

Tính:

- Giá trị trung bình;
- Độ lệch chuẩn;
- Độ lặp lại.

#### 7.3.4 Xác định độ không đảm bảo đo

##### 7.3.4.1 Nguyên tắc chung

Độ không đảm bảo đo được xác định theo hướng dẫn tại JCGM 100:2008 (GUM) và TCVN 9595-3:2013, bằng cách xác định các nguồn độ không đảm bảo đo ảnh hưởng đến kết quả hiệu chuẩn, đánh giá độ không đảm bảo đo chuẩn của từng nguồn, tính độ không đảm bảo đo chuẩn tổng hợp và độ không đảm bảo đo mở rộng.

Độ không đảm bảo đo được xác định riêng đối với:

- Tọa độ theo phương Đông (E);
- Tọa độ theo phương Bắc (N);
- Độ cao (h);
- Sai số vị trí mặt bằng (H).

Sai số tọa độ thành phần tại lần đo thứ i được xác định theo công thức tương ứng (xem bản gốc để tham chiếu công thức đầy đủ). Sai số vị trí mặt bằng tại lần đo thứ i cũng được xác định tương tự.

Trong đó: E_i, N_i, h_i là giá trị do phương tiện đo chỉ thị tại lần đo thứ i; E₀, N₀, h₀ là giá trị chuẩn của điểm chuẩn tọa độ.

##### 7.3.4.2 Các nguồn độ không đảm bảo đo

Các nguồn độ không đảm bảo đo chủ yếu bao gồm:

a) Độ không đảm bảo đo của điểm chuẩn tọa độ;
b) Độ lặp lại của kết quả đo;
c) Độ phân giải của phương tiện đo;
d) Sai lệch định tâm và đặt thiết bị;
đ) Ảnh hưởng của điều kiện môi trường;
e) Ảnh hưởng của phương pháp đo và xử lý số liệu.

Ngoài các nguồn trên, có thể xem xét bổ sung các nguồn độ không đảm bảo đo khác khi có căn cứ kỹ thuật phù hợp.

##### 7.3.4.3 Thành phần độ không đảm bảo đo do điểm chuẩn tọa độ

Độ không đảm bảo đo chuẩn của điểm chuẩn tọa độ được xác định từ giấy chứng nhận hiệu chuẩn hoặc hồ sơ xác lập điểm chuẩn.

Trường hợp chứng chỉ chuẩn công bố độ không đảm bảo đo mở rộng U_ref với hệ số phủ k, độ không đảm bảo đo chuẩn được xác định theo công thức u_ref = U_ref / k.

Trong đó: u_ref là độ không đảm bảo đo chuẩn của điểm chuẩn; U_ref là độ không đảm bảo đo mở rộng của điểm chuẩn; k là hệ số phủ.

##### 7.3.4.4 Thành phần độ không đảm bảo đo do độ lặp lại

Độ không đảm bảo đo chuẩn do độ lặp lại được đánh giá theo phương pháp thống kê (Loại A), sử dụng công thức u = s/√n.

Trong đó: n là số lần đo hợp lệ; s là độ lệch chuẩn thực nghiệm của dãy số liệu.

Độ lệch chuẩn thực nghiệm được xác định từ giá trị đo tại lần thứ i (x_i) và giá trị trung bình của n lần đo (x̄).

##### 7.3.4.5 Thành phần độ không đảm bảo đo do độ phân giải của phương tiện đo

Thành phần độ không đảm bảo đo chuẩn do độ phân giải của phương tiện đo được xác định theo phân bố chữ nhật, trong đó d là độ phân giải của phương tiện đo.

##### 7.3.4.6 Thành phần độ không đảm bảo đo do định tâm và đặt thiết bị

Độ không đảm bảo đo chuẩn do sai lệch định tâm được xác định theo phân bố chữ nhật, trong đó a là sai lệch định tâm lớn nhất ước lượng được.

Đối với các thiết bị GNSS/GPS cầm tay, thành phần này được xác định từ kết quả thực nghiệm hoặc kinh nghiệm kỹ thuật.

##### 7.3.4.7 Thành phần độ không đảm bảo đo do môi trường

Thành phần độ không đảm bảo đo do môi trường bao gồm: nhiệt độ; độ ẩm; che khuất vệ tinh; phản xạ đa đường (multipath); nhiễu điện từ; giá trị PDOP; các yếu tố hiện trường khác.

Thành phần này được xác định từ thực nghiệm hoặc ước lượng theo kinh nghiệm kỹ thuật.

##### 7.3.4.8 Thành phần độ không đảm bảo đo do phương pháp đo

Thành phần độ không đảm bảo đo do phương pháp đo bao gồm: phương pháp lấy mẫu; phương pháp xử lý số liệu; thuật toán tính toán; chuyển đổi hệ tọa độ; phần mềm xử lý.

##### 7.3.4.9 Độ không đảm bảo đo chuẩn tổng hợp

Độ không đảm bảo đo chuẩn tổng hợp được xác định bằng phương pháp cộng phương sai theo JCGM 100:2008. Việc tính toán được thực hiện riêng đối với: phương Đông (E); phương Bắc (N); độ cao (h).

##### 7.3.4.10 Độ không đảm bảo đo chuẩn tổng hợp theo phương ngang

Độ không đảm bảo đo chuẩn tổng hợp theo phương ngang được xác định từ độ không đảm bảo đo chuẩn tổng hợp theo phương Đông và theo phương Bắc.

**Ghi chú:** Công thức trên áp dụng khi giả định các thành phần E và N là không tương quan (r = 0). Trong trường hợp có cơ sở xác định hệ số tương quan r ≠ 0 (ví dụ: u_ref và u_cent tác động đồng thời lên cả E và N), cần tính uᴴ theo công thức đầy đủ có chứa số hạng 2r·uᶜE·uᶜN theo JCGM 100:2008 Điều 5.2.

##### 7.3.4.11 Độ không đảm bảo đo mở rộng

Độ không đảm bảo đo mở rộng được xác định theo công thức U = k·uc. Thông thường chọn k = 2, tương ứng với mức tin cậy xấp xỉ 95 %.

##### 7.3.4.12 Bảng tổng hợp các nguồn độ không đảm bảo đo

Việc xác định độ không đảm bảo đo được tổng hợp theo Bảng dưới đây.

| Nguồn độ không đảm bảo đo | Ký hiệu | Phân bố | Hệ số nhạy | ĐKĐBĐ chuẩn |
|---|---|---|---|---|
| Điểm chuẩn tọa độ |  | Chuẩn | 1 | … |
| Độ lặp lại |  | Chuẩn | 1 | … |
| Độ phân giải |  | Chữ nhật | 1 | … |
| Định tâm |  | Chữ nhật | 1 | … |
| Môi trường |  | Chữ nhật | 1 | … |
| Phương pháp đo |  | Chữ nhật | 1 | … |
| Độ không đảm bảo đo chuẩn tổng hợp |  |  |  |  |
| Độ không đảm bảo đo mở rộng (k = 2) |  |  |  |  |

### 7.3.5 Đánh giá và công bố kết quả

#### 7.3.5.1 Đánh giá kết quả hiệu chuẩn

Kết quả hiệu chuẩn được đánh giá trên cơ sở sai số đo, độ không đảm bảo đo mở rộng và giới hạn sai số cho phép của phương tiện đo theo đặc tính kỹ thuật của nhà sản xuất hoặc theo yêu cầu kỹ thuật được khách hàng xác định trước khi thực hiện hiệu chuẩn.

Giới hạn sai số cho phép được ký hiệu là: giới hạn sai số cho phép theo phương ngang; giới hạn sai số cho phép theo độ cao.

Trường hợp nhà sản xuất không quy định giới hạn sai số cho phép hoặc khách hàng không yêu cầu đánh giá sự phù hợp, PTN chỉ công bố kết quả hiệu chuẩn, sai số và độ không đảm bảo đo mà không đưa ra kết luận đạt hoặc không đạt.

#### 7.3.5.2 Tiêu chí đánh giá sự phù hợp

Sai số vị trí mặt bằng trung bình và sai số độ cao trung bình được xác định, cùng với độ không đảm bảo đo mở rộng tương ứng. Thông thường chọn hệ số phủ tương ứng với mức tin cậy xấp xỉ 95 %.

Phương tiện đo được đánh giá là **Đạt yêu cầu** khi đồng thời thỏa mãn hai điều kiện sau:

a) Theo phương ngang: sai số vị trí mặt bằng cộng độ không đảm bảo đo mở rộng không vượt quá giới hạn sai số cho phép theo phương ngang;
b) Theo độ cao: sai số độ cao cộng độ không đảm bảo đo mở rộng không vượt quá giới hạn sai số cho phép theo độ cao.

Trường hợp phương tiện đo không có chức năng xác định độ cao hoặc không yêu cầu đánh giá độ cao thì chỉ áp dụng điều kiện theo phương ngang.

Phương tiện đo được đánh giá là **Không đạt yêu cầu** khi không thỏa mãn ít nhất một trong các điều kiện trên.

#### 7.3.5.3 Quy tắc ra quyết định

Việc đánh giá sự phù hợp được thực hiện theo quy tắc quyết định đơn giản (Simple Acceptance Rule) theo ILAC-G8:09/2019, trong đó độ không đảm bảo đo được xem xét trực tiếp thông qua biểu thức so sánh sai số cộng độ không đảm bảo đo mở rộng với giới hạn sai số cho phép.

Kết luận phù hợp được đưa ra khi giá trị trên không vượt quá giới hạn sai số cho phép tương ứng.

Trường hợp khách hàng yêu cầu áp dụng quy tắc quyết định khác hoặc có quy định riêng của tiêu chuẩn kỹ thuật, việc đánh giá phải được thực hiện theo quy tắc đã được thống nhất trước khi tiến hành hiệu chuẩn.

#### 7.3.5.4 Công bố kết quả hiệu chuẩn

Kết quả hiệu chuẩn tối thiểu phải bao gồm:

a) Tên phương tiện đo;
b) Kiểu, số sê-ri;
c) Hệ tọa độ sử dụng;
d) Điểm chuẩn sử dụng;
đ) Điều kiện môi trường;
e) Số vệ tinh và giá trị PDOP trong quá trình đo;
g) Giá trị tọa độ chuẩn;
h) Giá trị trung bình do phương tiện đo chỉ thị;
i) Sai số vị trí mặt bằng;
k) Sai số độ cao (nếu áp dụng);
l) Độ lặp lại;
m) Độ không đảm bảo đo mở rộng;
n) Hệ số phủ k;
o) Mức tin cậy tương ứng;
p) Kết luận sự phù hợp (nếu áp dụng).

#### 7.3.5.5 Trình bày kết quả

Kết quả hiệu chuẩn được trình bày theo dạng:

a) Theo phương ngang: sai số vị trí mặt bằng ± độ không đảm bảo đo mở rộng (k = 2; mức tin cậy xấp xỉ 95 %)
b) Theo độ cao: sai số độ cao ± độ không đảm bảo đo mở rộng (k = 2; mức tin cậy xấp xỉ 95 %)

Ví dụ:

- Sai số vị trí mặt bằng: (k = 2; P ≈ 95 %)
- Sai số độ cao: (k = 2; P ≈ 95 %)

#### 7.3.5.6 Kết luận

Phương tiện đo sau khi hiệu chuẩn được kết luận:

- **Đạt yêu cầu**, khi thỏa mãn các tiêu chí đánh giá quy định tại mục 7.3.5.2; hoặc
- **Không đạt yêu cầu**, khi không thỏa mãn ít nhất một trong các tiêu chí trên.

Kết luận hiệu chuẩn phải được ghi rõ trong Biên bản hiệu chuẩn và Giấy chứng nhận hiệu chuẩn.

## 8. Xử lý chung

Thiết bị đạt yêu cầu được:

- Dán tem hiệu chuẩn;
- Cấp giấy chứng nhận hiệu chuẩn;
- Lưu hồ sơ hiệu chuẩn.

Chu kỳ hiệu chuẩn: 12 tháng (xem Phụ lục 04).

## 9. Phụ lục

- Phụ lục 01: Biên bản hiệu chuẩn.
- Phụ lục 02: Bảng tính sai số và độ không đảm bảo đo.
- Phụ lục 03: Hồ sơ xác lập điểm chuẩn toạ độ.
- Phụ lục 04: Mẫu Giấy chứng nhận hiệu chuẩn.

## TÀI LIỆU THAM KHẢO

- American Society for Photogrammetry and Remote Sensing. (2014). *ASPRS Positional Accuracy Standards for Digital Geospatial Data*. Bethesda, MD: ASPRS.
- European Accreditation. (2022). *EA-4/02 M:2022. Evaluation of the Uncertainty of Measurement in Calibration*. Paris, France: European Accreditation.
- Federal Geographic Data Committee. (2024). *Geospatial Positioning Accuracy Standards, Part 1: Reporting Methodology*. Reston, VA, USA: FGDC.
- International Laboratory Accreditation Cooperation. (2020). *ILAC-P14:09/2020. ILAC Policy for Measurement Uncertainty in Calibration*. Sydney, Australia: ILAC.
- International Laboratory Accreditation Cooperation. (2019). *ILAC-G8:09/2019. Guidelines on Decision Rules and Statements of Conformity*. Sydney, Australia: ILAC.
- International Organization for Standardization. (2013). *ISO 19157:2013. Geographic information - Data quality*. Geneva, Switzerland: ISO.
- International Organization for Standardization. (2015). *ISO 17123-8:2015. Optics and optical instruments - Field procedures for testing geodetic and surveying instruments - Part 8: GNSS field measurement systems in real-time kinematic (RTK)*. Geneva, Switzerland: ISO.
- Joint Committee for Guides in Metrology. (2008). *JCGM 100:2008. Evaluation of measurement data - Guide to the expression of uncertainty in measurement (GUM)*. Sèvres, France: BIPM.
- Joint Committee for Guides in Metrology. (2012). *JCGM 200:2012. International vocabulary of metrology - Basic and general concepts and associated terms (VIM), 3rd edition*. Sèvres, France: BIPM.
- Garmin Ltd. (2020). *GPSMAP 65s Owner's Manual*. Olathe, Kansas, USA: Garmin International Inc.
- Garmin Ltd. (2020). *GPSMAP 65 Series Technical Specifications*. Olathe, Kansas, USA: Garmin International Inc.
- Bộ Khoa học và Công nghệ. (2013). *TCVN 9595-3:2013. Độ chính xác (độ đúng và độ chụm) của phương pháp đo và kết quả đo – Phần 3: Các thước đo trung gian của độ chụm của phương pháp đo tiêu chuẩn*. Hà Nội: Nhà xuất bản Khoa học và Kỹ thuật.
- Bureau International des Poids et Mesures. (2019). *The International System of Units (SI), 9th edition*. Sèvres, France: BIPM.
- Tài liệu kỹ thuật, hướng dẫn sử dụng và đặc tính kỹ thuật của phương tiện đo GNSS/GPS cầm tay được hiệu chuẩn.
- Hồ sơ xác lập điểm chuẩn tọa độ, giấy chứng nhận hiệu chuẩn của chuẩn đo lường và thiết bị phụ sử dụng trong phép hiệu chuẩn.

---

*Quy trình hiệu chuẩn Phương tiện đo định vị bằng vệ tinh (GNSS/GPS) cầm tay — ETV.MCL 04 — Lần BH: 01 — Trang tài liệu điện tử, không áp dụng đánh số trang thủ công (bản in xuất từ ManLab tự sinh header/footer).*
