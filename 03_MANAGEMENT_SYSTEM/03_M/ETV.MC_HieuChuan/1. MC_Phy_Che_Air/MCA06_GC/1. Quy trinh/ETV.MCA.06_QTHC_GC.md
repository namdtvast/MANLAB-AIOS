---
id: ETV.MCA 06
title: "Hệ thống phân tích sắc ký khí (GC) — Quy trình hiệu chuẩn"
type: Quy-trinh
owner: "Viện Kiểm định Công nghệ và Môi trường"
department: "Phòng Đo lường Chất lượng"
prepared_by: "Nguyễn Văn Huy"
prepared_date: "22/06/2026"
reviewed_by: "Trần Thị Hoa"
reviewed_date: "22/06/2026"
approved_by: "Nguyễn Hoàng Giang"
approved_date: "22/06/2026"
process: ""
effective_date: "22/06/2026"
revision: "02"
status: Da-ban-hanh
keywords: [GC, sắc ký khí, FID, TCD, ECD, NPD, MS, FPD, PID, NSD, tốc độ dòng khí, nhiệt độ lò cột, độ tuyến tính, hiệu chuẩn]
related_documents: []
iso_clause: ["ISO/IEC 17025:2017"]
legal_basis: []
ai_tags: [calibration-procedure, gas-chromatography, detector, uncertainty-budget, dilution-method]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCA_06_GC_V8.pdf`"
supersedes: "ETV.MCA 06 lần ban hành 01"
superseded_by: null
---
# HỆ THỐNG PHÂN TÍCH SẮC KÝ KHÍ (GC) – QUY TRÌNH HIỆU CHUẨN

*Gas Chromatography (GC) Analytical Systems – Calibration Procedures*

|                   |                     |
| ----------------- | ------------------- |
| **Mã số**         | ETV.MCA 06          |
| **Lần ban hành**  | 02                  |
| **Ngày ban hành** | 22/06/2026          |
| **Biên soạn**     | Nguyễn Văn Huy      |
| **Soát xét**      | Trần Thị Hoa        |
| **Phê duyệt**     | Nguyễn Hoàng Giang  |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCA_06_GC_V8.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khi có khác biệt, bản PDF do Viện ban hành là bản có giá trị áp dụng.
>
> *Ghi chú của bản chuyển đổi:* (1) chân trang in xen kẽ "Lần BH: 1" và "Lần BH: 2" — lần ban hành đúng là **02**; (2) Bảng 2 ánh xạ *độ lặp lại → 7.3.3* và *độ tuyến tính → 7.3.4*, trong khi phần thân đánh số ngược lại (7.3.3 là độ tuyến tính, 7.3.4 là độ lặp lại); (3) trang "TÀI LIỆU THAM KHẢO" **để trống**; (4) Bảng 5 mục 4.2 Phụ lục dẫn nhầm "dung dịch hiệu chuẩn Gamma-BHC" trong khi nội dung là Malathion. Giữ nguyên văn, cần đính chính khi ban hành lại.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## THEO DÕI SỬA ĐỔI TÀI LIỆU

| Thời gian  | Nội dung thay đổi | Lần ban hành |
| ---------- | ----------------- | ------------ |
| 22/06/2026 | Ban hành lần 02   | 02           |

---

## 1. Phạm vi áp dụng

Văn bản kỹ thuật này quy định quy trình hiệu chuẩn hệ thống phân tích sắc ký khí (sau đây gọi tắt là Máy GC) được ghép nối với các loại đầu dò (detector) như tại Bảng 1 và có phạm vi nhiệt độ đến 300 °C, phạm vi tốc độ dòng từ (0 ÷ 500) mL/min.

**Bảng 1**

| TT  | Đầu dò                                                | Ứng dụng                                        |
| --- | ----------------------------------------------------- | ----------------------------------------------- |
| 1   | Đầu dò ion hóa ngọn lửa — *Flame Ionization Detector (FID)* | Áp dụng rộng rãi cho các hợp chất hữu cơ  |
| 2   | Đầu dò dẫn nhiệt — *Thermal Conductivity Detector (TCD)* | Các khí hữu cơ và vô cơ                      |
| 3   | Đầu dò cộng kết điện tử — *Electron Capture Detector (ECD)* | Các dẫn xuất halogen và các hợp chất liên quan |
| 4   | Đầu dò NPD — *Nitrogen/Phosphorus Detector (NPD)*     | Các hợp chất có chứa phốt pho và nitơ           |
| 5   | Đầu dò khối phổ — *Mass spectrometer (MS)*            | Hầu hết các hợp chất hóa học                    |
| 6   | Đầu dò quang hóa ngọn lửa — *Flame photometric detector (FPD)* | Các hợp chất chứa phốt pho và lưu huỳnh |
| 7   | Đầu dò quang hóa ion — *Photoionization Detector (PID)* | Áp dụng rộng rãi cho các khí hữu cơ và vô cơ   |
| 8   | Đầu dò NSD — *Nitrogen Selective Detector (NSD)*      | Các hợp chất có chứa nitơ                       |

Quy trình này áp dụng đối với nhân viên của Viện Kiểm định Công nghệ và Môi trường (sau đây gọi tắt là PTN) khi hiệu chuẩn Hệ thống phân tích sắc ký khí (GC) nói trên.

## 2. Giải thích từ ngữ

Các từ ngữ trong văn bản này được hiểu như sau:

- **2.1. Hiệu chuẩn:** là hoạt động xác định, thiết lập mối quan hệ giữa giá trị đo của chuẩn đo lường, phương tiện đo với giá trị đo của đại lượng cần đo.
- **2.2. Hiệu chỉnh:** là tập hợp các thao tác được tiến hành trên hệ thống đo để cho ra số chỉ đã quy định tương ứng với giá trị đã cho của đại lượng được đo.
- **2.3. Độ không đảm bảo đo (ĐKĐB):** thông số gắn với kết quả của phép đo, đặc trưng cho sự phân tán của các giá trị có thể quy cho đại lượng đo một cách hợp lý.
- **2.4. Sắc ký (Chromatograph):** là kỹ thuật tách các cấu tử ra khỏi hỗn hợp dựa trên ái lực khác nhau của mỗi cấu tử đối với pha tĩnh.
- **2.5. GC (Gas Chromatography) — sắc ký khí:** là một phương pháp tách dựa trên sự phân bố khác nhau của các chất giữa hai pha không trộn lẫn vào nhau, trong đó pha động là chất khí (khí mang) đi qua pha tĩnh chứa trong cột.
- **2.6. Detector (đầu dò):** đầu dò dùng phát hiện tín hiệu để định tính và định lượng các chất cần phân tích:
  - **FID** (*Flame Ionization Detector*): đầu dò ion hoá ngọn lửa (đo dòng ion được ion hoá từ ngọn lửa hydro);
  - **ECD** (*Electron Capture Detector*): đầu dò bắt giữ electron (đo sự suy giảm dòng electron được tạo ra từ sự va đập các bức xạ β của Ni-63 với các phân tử khí mang N₂);
  - **MS** (*Mass spectrometer*): đầu dò khối phổ;
  - **NPD** (*Nitrogen phosphorus detector*): đầu dò nitơ, phốt pho;
  - **FPD** (*Flame photometric detector*): đầu dò đo bức xạ huỳnh quang được tạo ra từ năng lượng của ngọn lửa hydro;
  - **PID** (*Photoionization Detector*): đầu dò quang hóa.
- **2.7. Mẫu trắng:** là dung dịch được dùng để thiết lập đường nền của hệ thống sắc ký khí và thường là dung môi tinh khiết.
- **2.8. Mẫu chuẩn được chứng nhận (CRM):** là loại chất chuẩn được chứng nhận có nồng độ xác định.
- **2.9. Dung dịch hiệu chuẩn:** là dung dịch chuẩn có nồng độ nằm trong khoảng nồng độ làm việc, được pha chế từ mẫu chuẩn gốc có nồng độ hoặc/và độ tinh khiết như trong giấy chứng nhận kèm theo.
- **2.10. Khoảng làm việc:** là khoảng nồng độ của một hợp chất trong dung dịch có thể thực hiện được các phép đo phân tích trong giới hạn xác định.

## 3. Các phép hiệu chuẩn

**Bảng 2**

| TT  | Tên phép hiệu chuẩn                   | Theo điều, mục của quy trình |
| --- | ------------------------------------- | ---------------------------- |
| 1   | Kiểm tra bên ngoài                    | 7.1                          |
| 2   | Kiểm tra kỹ thuật                     | 7.2                          |
| 3   | Kiểm tra đo lường                     | 7.3                          |
| 3.1 | Kiểm tra độ chính xác tốc độ dòng khí | 7.3.1                        |
| 3.2 | Kiểm tra nhiệt độ                     | 7.3.2                        |
| 3.3 | Kiểm tra độ lặp lại của hệ thống      | 7.3.3 [^hv]                  |
| 3.4 | Kiểm tra độ tuyến tính của hệ thống   | 7.3.4 [^hv]                  |
| 4   | Đánh giá độ không đảm bảo đo          | 8                            |
| 5   | Xử lý chung                           | 9                            |

[^hv]: Bảng 2 ánh xạ *độ lặp lại → 7.3.3* và *độ tuyến tính → 7.3.4*, trong khi phần thân văn bản đánh số ngược lại (7.3.3 là độ tuyến tính, 7.3.4 là độ lặp lại). Bản chuyển đổi giữ nguyên cả hai; cần đính chính khi ban hành lại.

## 4. Phương tiện phục vụ hiệu chuẩn

Các phương tiện dùng để hiệu chuẩn được nêu trong Bảng 3.

**Bảng 3**

| TT  | Tên thiết bị và chuẩn đo lường            | Đặc trưng kỹ thuật đo lường                                                       | Áp dụng cho điều mục |
| --- | ----------------------------------------- | ----------------------------------------------------------------------------------- | -------------------- |
| 1   | **Chuẩn đo lường**                        |                                                                                     |                      |
| 1.1 | Dung dịch chuẩn hoặc mẫu chuẩn            | - Có thành phần, nồng độ và độ chính xác hoặc ĐKĐB như trong Bảng 4                 |                      |
| 1.2 | Máy đo tốc độ dòng khí                    | - Phạm vi đo: (0 ÷ 500) mL/min<br>- ĐKĐB/độ chính xác: ± 3 %                        |                      |
| 1.3 | Nhiệt kế chỉ thị hiện số                  | - Phạm vi đo: (0 ÷ 300) °C<br>- Độ phân giải: 0,1 °C<br>- ĐKĐB: ≥ 0,4 °C [^dkdb]    |                      |
| 2   | **Phương tiện khác**                      |                                                                                     |                      |
| 2.1 | Bình định mức                             | - Dung tích: (10, 25, 50, 100, 1000) mL<br>- Cấp chính xác: A và đảm bảo liên kết chuẩn đo lường |          |
| 2.2 | Pipet, Micropipet                         | - Phạm vi đo: (1, 2, 5, 10, 25) mL<br>- Cấp chính xác: A và đảm bảo liên kết chuẩn đo lường |               |
| 2.3 | Phương tiện đo nhiệt độ, độ ẩm môi trường | - Phạm vi: (0 ÷ 50) °C; (25 ÷ 95) %RH<br>- Giá trị độ chia: 1 °C; 1 %RH             |                      |
| 2.4 | Cân phân tích                             | - Phạm vi cân lớn nhất: 220 g<br>- Độ chia: 0,01 mg                                 | 6.3                  |
| 3   | **Phương tiện phụ**                       |                                                                                     |                      |
| 3.1 | Nước tinh khiết                           | - Nước loại 2 sử dụng trong phòng thí nghiệm theo TCVN 4851:1989                    |                      |
| 3.2 | Khí mang, khí hydro                       | - Độ tinh khiết theo yêu cầu: 99,995 %                                              |                      |
| 3.3 | Dung môi                                  | Methanol, n-Hexan                                                                   |                      |
| 3.4 | Giấy thấm                                 |                                                                                     |                      |
| 3.5 | Bình xịt tia                              |                                                                                     |                      |
| 3.6 | Găng tay, dung dịch làm sạch, vải cotton  |                                                                                     |                      |

[^dkdb]: Bản gốc ghi "ĐKĐB: **≥** 0,4 °C" — với yêu cầu về chuẩn đo lường, dấu đúng phải là **≤**. Giữ nguyên văn, cần đính chính khi ban hành lại.

> *Lưu ý:* Tuỳ thuộc vào từng PTĐ để lựa chọn chuẩn đo lường và phương tiện phụ phù hợp và đáp ứng yêu cầu.

## 5. Điều kiện môi trường

Khi tiến hành hiệu chuẩn phải đảm bảo các điều kiện môi trường sau:

- Nhiệt độ: (25 ± 5) °C;
- Độ ẩm không khí: ≤ 80 %RH (không đọng sương);
- Phải đảm bảo máy đã bật lên ít nhất 02 giờ để ổn định và không có sự thay đổi đột ngột về điều kiện môi trường.

## 6. Chuẩn bị hiệu chuẩn

**6.1.** Phương tiện đo cần hiệu chuẩn (sau đây gọi tắt là PTĐ) phải đang hoạt động bình thường và được kiểm tra vận hành hoạt động theo đúng yêu cầu của nhà sản xuất quy định trong tài liệu kỹ thuật.

**6.2.** Chọn phương tiện hiệu chuẩn theo mục 4; dung dịch chuẩn được chọn sử dụng tương ứng đối với từng đầu dò cụ thể như trong Bảng 4.

**Bảng 4**

| STT | Detector                                  | Dung dịch chuẩn sử dụng          | ĐKĐB / Độ tinh khiết                          |
| --- | ----------------------------------------- | -------------------------------- | --------------------------------------------- |
| 1   | Flame Ionization Detector (FID)           | Dung dịch chuẩn Hexadecan        | - ĐKĐB: U ≤ 0,5 %<br>- Độ tinh khiết: ≥ 99,5 % |
| 2   | Thermal Conductivity Detector (TCD)       | Dung dịch chuẩn Hexadecan        | - ĐKĐB: U ≤ 0,5 %<br>- Độ tinh khiết: ≥ 99,5 % |
| 3   | Electron Capture Detector (ECD)           | Dung dịch chuẩn Gamma-BHC (Lindane) | - Độ tinh khiết: ≥ 99,0 %                  |
| 4   | Nitrogen/Phosphorus Detector (NPD)        | Dung dịch chuẩn Malathion        | - Độ tinh khiết: ≥ 96,1 %                     |
| 5   | Mass spectrometer (MS)                    | Dung dịch chuẩn Malathion        | - Độ tinh khiết: ≥ 96,1 %                     |
| 6   | Flame photometric detector (FPD)          | Dung dịch chuẩn Malathion        | - Độ tinh khiết: ≥ 96,1 %                     |
| 7   | Photoionization Detector (PID)            | Dung dịch chuẩn Toluen           | - Độ tinh khiết: ≥ 99,8 %                     |
| 8   | Nitrogen Selective Detector (NSD)         | Dung dịch chuẩn Azobenzen        | - Độ tinh khiết: ≥ 98,5 %                     |

**6.3. Chuẩn bị chất chuẩn, hóa chất**

- Chuẩn bị một dãy dung dịch chuẩn có 05 điểm nồng độ khác nhau để xây dựng đường cong hiệu chuẩn. Các dung dịch này được chuẩn bị bằng phương pháp pha loãng từ dung dịch chuẩn gốc.

**6.4. Chuẩn bị máy GC cần hiệu chuẩn**

Máy GC cần hiệu chuẩn phải đáp ứng được các yêu cầu sau đây:

- Cột phải được làm sạch trước khi dùng cho quá trình hiệu chuẩn;
- Kiểm tra, làm sạch buồng tiêm và septum;
- Kiểm tra không có rò rỉ khí của toàn bộ hệ thống.

Máy GC cần hiệu chuẩn phải đang hoạt động bình thường và được kiểm tra vận hành theo đúng yêu cầu của nhà sản xuất quy định trong tài liệu kỹ thuật của máy.

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

Phải kiểm tra bên ngoài theo các yêu cầu sau đây:

- Kiểm tra bằng mắt để xác định sự phù hợp của PTĐ đối với các yêu cầu quy định trong tài liệu kỹ thuật, hình dáng kích thước, ký nhãn hiệu, nguồn nuôi, hiển thị, tài liệu và phụ kiện kèm theo;
- Kiểm tra độ tinh khiết của khí mang đang sử dụng;
- Lý lịch của thiết bị được cập nhật trong quá trình sử dụng (nếu có).

### 7.2. Kiểm tra kỹ thuật

Phải kiểm tra kỹ thuật theo các yêu cầu sau đây:

- Kiểm tra trạng thái hoạt động bình thường của PTĐ theo hướng dẫn sử dụng của nhà sản xuất;
- Kiểm tra rò rỉ tại các khớp nối liên kết giữa các đường ống dẫn khí mang của máy GC cần hiệu chuẩn.

### 7.3. Kiểm tra đo lường

#### 7.3.1. Kiểm tra độ chính xác tốc độ dòng khí

- Sau khi rửa hệ thống GC cần hiệu chuẩn, độ chính xác tốc độ dòng được kiểm tra bằng cách sử dụng máy đo tốc độ dòng khí đã được hiệu chuẩn đo giá trị tốc độ dòng được cài đặt trên máy GC.
- Tiến hành cài đặt tốc độ dòng khí qua cột tại 3 điểm là (0,5; 1,0 và 2,0) mL/phút (có thể cài đặt giá trị tốc độ dòng theo yêu cầu kỹ thuật của máy hoặc theo yêu cầu sử dụng của khách hàng).
- Dùng PTĐ chuẩn đo tối thiểu 05 lần các giá trị đã cài đặt, mỗi lần cách nhau 05 phút. Ghi kết quả đo vào biên bản hiệu chuẩn.
- Sai số giá trị tốc độ dòng được tính theo công thức:

`Δ_1 = f_F - f_ch`

- `f_F`: giá trị tốc độ dòng chỉ thị trên máy GC cần hiệu chuẩn, mL/min;
- `f_ch`: giá trị tốc độ dòng trung bình đo được của chuẩn, mL/min.

#### 7.3.2. Kiểm tra nhiệt độ

Tiến hành kiểm tra nhiệt độ lò cột (column):

- Cài đặt chế độ gia nhiệt cho buồng ổn định nhiệt độ cột sắc ký tại 3 điểm nhiệt độ tương ứng với (20 %; 50 %; 80 %) ± 10 % phạm vi gia nhiệt của buồng (có thể cài đặt các điểm nhiệt độ theo tài liệu kỹ thuật của máy hoặc theo yêu cầu sử dụng của khách hàng).
- Đặt cảm biến đo nhiệt độ vào buồng ổn định nhiệt độ cột và gần vị trí lắp cột sắc ký. Đọc tối thiểu 05 lần kết quả đo nhiệt độ, mỗi lần cách nhau 05 phút. Ghi kết quả đo vào biên bản hiệu chuẩn.

Số hiệu chính tại mỗi điểm nhiệt độ hiệu chuẩn được tính theo công thức:

`Δt = t_ch - t_bk`

- `t_ch`: giá trị trung bình của k nhiệt kế chuẩn tại mỗi điểm nhiệt độ hiệu chuẩn, °C:

`t_ch = (1/k)Σ(1→k) t`

  trong đó giá trị trung bình của nhiệt kế chuẩn được tính theo:

`t = (1/n)Σ(i=1→n)(t + ∂ t)`

  - `t`: giá trị chỉ thị trung bình của nhiệt kế chuẩn, °C;
  - `∂t`: số hiệu chính của nhiệt kế chuẩn tại điểm nhiệt độ hiệu chuẩn (lấy từ giấy chứng nhận hiệu chuẩn của nhiệt kế chuẩn), °C;
  - `n`: số lần đo của nhiệt kế chuẩn tại mỗi điểm nhiệt độ hiệu chuẩn.

- `t_bk`: giá trị trung bình của chỉ thị nhiệt của lò cột tại mỗi điểm nhiệt độ hiệu chuẩn, °C:

`t_bk = (1/n)Σ(i=1→n) t  (4)`

  - `n`: số lần đọc chỉ thị nhiệt độ trên máy GC tại mỗi điểm nhiệt độ hiệu chuẩn.

#### 7.3.3. Kiểm tra độ tuyến tính

- Độ tuyến tính của máy GC được xác định bằng cách ghi nhận tín hiệu diện tích peak của sắc ký đồ với 05 điểm chuẩn có nồng độ ở mục 6.3 phù hợp với từng detector.
- Dùng máy GC cần hiệu chuẩn tiến hành chạy mẫu tối thiểu 03 lần liên tiếp tại mỗi điểm nồng độ của dung dịch chuẩn đã chọn.
- Thiết lập đường chuẩn theo phương trình hồi quy tuyến tính y = ax + b biểu diễn sự phụ thuộc của diện tích peak trung bình và các điểm nồng độ của dung dịch chuẩn. Độ tuyến tính được đánh giá dựa vào hệ số tương quan R².

#### 7.3.4. Kiểm tra độ lặp lại

- Chọn dung dịch chuẩn thích hợp ở mục 6.
- Chọn một dung dịch chuẩn kiểm tra độ lặp lại có giá trị nồng độ nằm trong dãy dung dịch chuẩn ở mục 6.3 phù hợp với detector của máy GC cần hiệu chuẩn.
- Dùng máy GC cần hiệu chuẩn tiến hành chạy mẫu tối thiểu 06 lần liên tiếp dung dịch chuẩn đã chọn.
- Ghi kết quả vào biên bản hiệu chuẩn.
- Độ lặp lại được tính toán bằng độ lệch chuẩn tương đối RSD:

`RSD = (s/x̄) × 100 với s = √((Σ(i=1→n)(x_i - x̄)²)/(n-1))`

- `RSD`: độ lệch chuẩn tương đối của các kết quả đo lặp lại, %;
- `s`: độ lệch chuẩn của các kết quả đo lặp lại;
- `x_i`: giá trị đo lần thứ i;
- `x̄`: giá trị đo trung bình;
- `n`: số lần đo lặp lại (n = 6).

## 8. Ước lượng độ không đảm bảo đo các phép đo của máy GC

### 8.1. ĐKĐB phép đo độ chính xác tốc độ dòng: u_f

- ĐKĐB ảnh hưởng bởi độ phân tán của kết quả đo thời gian 06 lần lặp lại:

`S_f = √((Σ(x_i - x_tb)²)/(n-1)) u_1 = (S_f/√(n))`

  - `S_f`: độ lệch chuẩn giữa n lần đo;
  - `x_i`: giá trị thời gian đo lần i;
  - `x_tb`: giá trị đo trung bình;
  - `n`: số lần đo (n = 6).

- ĐKĐB của máy đo tốc độ dòng khí:

`u_2 = (U_ch/2)`

  với `U_ch` là ĐKĐB của máy đo tốc độ dòng khí lấy từ GCN hiệu chuẩn.

- ĐKĐB do độ phân giải của chỉ thị tốc độ dòng:

`u_3 = (d/2√(3))`

  với `d` là độ phân giải tốc độ dòng khí của máy GC cần hiệu chuẩn.

- ĐKĐB tổng hợp:

`u_f = √(u_1² + u_2² + u_3²)`

- ĐKĐB mở rộng: `U_f = k × u_f` — với hệ số phủ k = 2, mức tin cậy 95 %.

### 8.2. ĐKĐB phép đo nhiệt độ: u_T

ĐKĐB đo nhiệt độ của buồng cột GC được tổ hợp từ các nguồn ĐKĐB thành phần, chia thành hai loại:

**a) Độ không đảm bảo đo của nhiệt kế chuẩn**

`u_ch = √(u_ch1² + u_ch2²)`

- ĐKĐB `u_ch1` của nhiệt kế chuẩn (kiểu B): `u_ch1 = (U_95/2)` — với `U₉₅` là ĐKĐB mở rộng của nhiệt kế chuẩn, lấy từ GCN hiệu chuẩn.
- ĐKĐB do độ tản mạn `u_ch2` (kiểu A):

`u_ch2 = √(S_ch2²/n) = (S_ch2/√(n)) = √((Σ(1→n)(t_i - t̄)²)/n(n-1)) với S_ch2 = √((Σ(1→n)(t_i - t̄)²)/(n-1))`

  - `S_ch2`: độ lệch chuẩn nhiệt độ đo được bởi nhiệt kế chuẩn tại điểm hiệu chuẩn nhiệt độ buồng, °C;
  - `n`: số lần đo lặp, n = 5;
  - `t_i`: nhiệt độ buồng đo được bởi nhiệt kế chuẩn tại lần đo lặp thứ i, °C;
  - `t̄`: giá trị trung bình sau n lần đo lặp, °C.

**b) Độ không đảm bảo đo của thiết bị chỉ thị nhiệt của buồng GC**

`u_bk = √(u_bk1² + u_bk2²)`

- ĐKĐB do độ tản mạn `u_bk1`:

`u_bk1 = √(S_bk1²/n) = (S_bk1/√(n)) = √((Σ(1→n)(t_i - t̄)²)/n(n-1))`

  - `S_bk1`: độ lệch chuẩn nhiệt độ buồng đo được trên GC tại điểm hiệu chuẩn nhiệt độ, °C;
  - `n`: số lần đo lặp, n = 5.

- ĐKĐB do độ phân giải `u_bk2` của chỉ thị nhiệt độ của GC:

`u_bk2 = (d/2√(3))`

  với `d` là độ phân giải chỉ thị nhiệt độ của GC (°C).

### 8.3. ĐKĐB phép đo phân tích định lượng: u_Đ

#### 8.3.1. ĐKĐB của dung dịch chuẩn gốc

Vì không có thông tin về độ không đảm bảo đo được cung cấp bởi nhà cung cấp trong chứng chỉ phân tích cho vật liệu tiêu chuẩn được sử dụng để chuẩn bị các dung dịch chuẩn, độ tinh khiết không được xem xét như một nguồn độ không đảm bảo tiềm năng. Tuy nhiên, độ tinh khiết của tiêu chuẩn được xem xét khi nồng độ được tính toán.

Nồng độ dung dịch pha gốc:

`C = (m/V)`

- `C`: nồng độ dung dịch pha gốc (mg/L);
- `m`: khối lượng của hoá chất chuẩn (mg);
- `V`: thể tích bình định mức (L).

**a. ĐKĐB gây nên bởi cân phân tích** *(theo giấy chứng nhận hiệu chuẩn)*:

`u_m = (g/2)`

**b. ĐKĐB gây nên bởi độ tinh khiết của các hóa chất chuẩn `u_p`** — độ tinh khiết của hóa chất được chỉ dẫn theo catalogue nhà sản xuất. Ví dụ: nhãn lọ hoá chất ghi độ tinh khiết 99,997 % nên P = 1,00000 ± 0,00003:

`u_p = (0,00003/√(3))`

**c. ĐKĐB gây nên bởi bình định mức `u_flask`:**

`u_flask = √(u_calf² + u_per² + u_temp²)`

- `u_calf`: ĐKĐB gây nên bởi bình định mức dùng để pha loãng dung dịch chuẩn;
- `u_per`: ĐKĐB do thao tác của nhân viên thực hiện;
- `u_temp`: ĐKĐB do giãn nở nhiệt.

Độ không đảm bảo đo của dung dịch chuẩn gốc pha:

`u_C = C√((u_flask/V_flask)² + (u_m/m)² + u_p²)`

#### 8.3.2. Nồng độ dung dịch pha loãng

`C_i = ((V_i-1 · C_i-1)/V_i)`

- `C_i`: nồng độ của dung dịch cần pha loãng thứ i (mg/L);
- `C_{i-1}`: nồng độ chất chuẩn thứ i-1 (mg/L);
- `V_i`: thể tích bình định mức dùng để pha loãng dung dịch thứ i (mL);
- `V_{i-1}`: thể tích dung dịch cần hút để pha loãng dung dịch thứ i (mL).

**Các thành phần gây ra ĐKĐB tính toán cho mỗi detector:**

- ĐKĐB do độ phân tán kết quả đo của PTĐ n lần lặp lại:

`S_C = √((Σ(x_i - x_tb)²)/(n-1)) u_A = (s_C/√(n))`

  - `x_i`: giá trị diện tích peak đo lần i;
  - `n`: số lần đo (n = 3).

**Bảng 5 — Các thành phần độ không đảm bảo đo**

| TT    | Tên yếu tố ảnh hưởng                                       | Ký hiệu   | Đơn vị | Công thức tính |
| ----- | ---------------------------------------------------------- | --------- | ------ | -------------- |
| 1     | Độ lặp lại của PTĐ                                         | `u_A`     | mg/L   | `u_A = s_C/√(n)` |
| 2     | ĐKĐB của dung dịch chuẩn pha gốc                           | `u_C`     | mg/L   | (xem 8.3.1) |
| 3     | ĐKĐB của dung dịch chuẩn thứ i                             | `u_Ci`    | mg/L   | (xem công thức bên dưới) |
| 3.1   | ĐKĐB gây ra bởi pipet                                      | `u_pipet` |        | `u_pipet = √(u_calp² + u_temp²)` |
| 3.1.1 | ĐKĐB gây nên bởi pipet dùng để pha loãng dung dịch chuẩn   | `u_calp`  | mL     | `u_calp = d/k` — pipet có thể tích `V_pipet`, ĐKĐB `d`, hệ số phủ theo GCN (k = 2) |
| 3.1.2 | ĐKĐB do giãn nở nhiệt                                      | `u_temp`  | mL     | `u_temp = (V_pipet × γ × Δ_i)/√(3)` — `γ`: hệ số dãn nở/1 °C; `Δ_i`: sai lệch nhiệt độ so với 20 °C |
| 3.2   | ĐKĐB gây ra bởi bình định mức pha loãng                    | `u_flask` |        | `u_flask = √(u_calf² + u_per² + u_temp²)` |
| 3.2.1 | ĐKĐB gây nên bởi bình định mức dùng để pha loãng           | `u_calf`  | mL     | `u_calf = e/k` — bình định mức có thể tích `V_flask`, ĐKĐB `e`, hệ số phủ theo GCN (k = 2) |
| 3.2.2 | ĐKĐB do thao tác của nhân viên thực hiện                   | `u_per`   | mL     | `u_per = 0,03/√(3)` — sai số do dư hoặc thiếu ở giọt cuối cùng, xấp xỉ ± 0,03 mL |
| 3.2.3 | ĐKĐB do giãn nở nhiệt                                      | `u_temp`  | mL     | `u_temp = (V_flask × γ × Δ_i)/√(3)` |

Tính `u_Ci`:

`u_Ci = C_i²√((u_flask/V_flask)² + (u_pipet/V_pipet)² + ((u_C_i-1)/(C_i-1))²)`

- ĐKĐB tổng hợp: `u_Đ = √(u_A² + u_Ci²)`
- ĐKĐB mở rộng: `U_Đ = k × u_Đ` — với hệ số phủ k = 2, mức tin cậy 95 %.
- ĐKĐB tương đối: `Độ KĐBĐ tương đối (%) = ((Độ KĐBĐ mở rộng)/(Giá trị đo)) × 100`

## 9. Xử lý chung

- Máy GC sau khi hiệu chuẩn được dán tem hiệu chuẩn và cấp giấy chứng nhận hiệu chuẩn, kèm theo thông báo kết quả hiệu chuẩn.
- Chu kỳ hiệu chuẩn khuyến nghị: 12 tháng.

## 10. Phụ lục

Phụ lục 01 — Biên bản hiệu chuẩn (BBĐL).

---

## PHỤ LỤC — CHUẨN BỊ DUNG DỊCH CHUẨN

### 1. Detector FID

- Chuẩn bị dung dịch hiệu chuẩn Hexadecan (n-C16) 1000 mg/L: cân 10 mg Hexadecan bằng cân phân tích vào bình định mức 10 mL và định mức bằng n-Hexan tới vạch.
- Pha dung dịch chuẩn 50 mg/L Hexadecan: hút 500 µL chuẩn Hexadecan 1000 mg/L vào bình định mức 10 mL, định mức đến vạch bằng n-Hexan.
- Chuẩn bị dung dịch Hexadecan (0,5; 1; 2; 5; 10) mg/L từ dung dịch Hexadecan 50 mg/L vào bình định mức 10 mL, định mức đến vạch bằng n-Hexan.

**Bảng 1**

| Dung dịch chuẩn                       | 1   | 2   | 3   | 4    | 5    |
| ------------------------------------- | --- | --- | --- | ---- | ---- |
| Nồng độ pha n-C16, mg/L               | 0,5 | 1   | 2   | 5    | 10   |
| Dung dịch chuẩn n-C16 50 mg/L, µL     | 100 | 200 | 400 | 1000 | 2000 |
| Dung dịch nội chuẩn (nếu cần), mL     | 0,1 | 0,1 | 0,1 | 0,1  | 0,1  |
| Bình định mức, mL                     | 10  | 10  | 10  | 10   | 10   |

> *Lưu ý:* Đối với dải nồng độ khác theo yêu cầu khách hàng hoặc những dải đặc biệt, chuẩn bị một dãy dung dịch hiệu chuẩn có 05 điểm nồng độ khác nhau theo công thức C₁V₁ = C₂V₂ từ dung dịch hiệu chuẩn Hexadecan (n-C16) 1000 mg/L.

### 2. Detector TCD

- Chuẩn bị dung dịch hiệu chuẩn Hexadecan (n-C16) 5000 mg/L: cân 50 mg Hexadecan vào bình định mức 10 mL, định mức bằng n-Hexan tới vạch.
- Chuẩn bị dung dịch Hexadecan (100; 200; 300; 400; 500) mg/L từ dung dịch 5000 mg/L vào bình định mức 10 mL.

**Bảng 2**

| Dung dịch chuẩn                        | 1   | 2   | 3   | 4   | 5    |
| -------------------------------------- | --- | --- | --- | --- | ---- |
| Nồng độ pha n-C16, mg/L                | 100 | 200 | 300 | 400 | 500  |
| Dung dịch chuẩn n-C16 5000 mg/L, µL    | 200 | 400 | 600 | 800 | 1000 |
| Dung dịch nội chuẩn (nếu cần), mL      | 0,1 | 0,1 | 0,1 | 0,1 | 0,1  |
| Bình định mức, mL                      | 10  | 10  | 10  | 10  | 10   |

### 3. Detector ECD

- Chuẩn bị dung dịch hiệu chuẩn Gamma-BHC 1000 mg/L: cân 10 mg Gamma-BHC vào bình định mức 10 mL, định mức bằng n-Hexan tới vạch.
- Pha dung dịch chuẩn 10 mg/L Gamma-BHC: hút 100 µL chuẩn 1000 mg/L vào bình định mức 10 mL.
- Chuẩn bị dung dịch Gamma-BHC (0,1; 0,5; 1; 2; 5) mg/L từ dung dịch 10 mg/L.

**Bảng 3**

| Dung dịch chuẩn                            | 1   | 2   | 3    | 4    | 5    |
| ------------------------------------------ | --- | --- | ---- | ---- | ---- |
| Nồng độ chuẩn Gamma-BHC, mg/L              | 0,1 | 0,5 | 1    | 2    | 5    |
| Dung dịch chuẩn Gamma-BHC 10 mg/L, µL      | 100 | 500 | 1000 | 2000 | 5000 |
| Dung dịch nội chuẩn (nếu cần), mL          | 0,1 | 0,1 | 0,1  | 0,1  | 0,1  |
| Bình định mức, mL                          | 10  | 10  | 10   | 10   | 10   |

### 4. Detector MS, FPD, NPD

**4.1. Trường hợp 1: Pha với dải thấp (max 75 µg/L)** — áp dụng với dòng máy Agilent hoặc dòng máy có dải đo thấp.

- Chuẩn bị dung dịch hiệu chuẩn Malathion 1000 mg/L: hút 10 µL Malathion 100 mg bằng kim tiêm Hamilton vào vial 2 mL, thêm 990 µL n-Hexan.
- Chuẩn bị Malathion 100 mg/L: hút 10 µL Malathion 1000 mg/L vào vial, thêm 990 µL n-Hexan.
- Chuẩn bị Malathion 1 mg/L: hút 100 µL Malathion 100 mg/L vào vial, thêm 900 µL n-Hexan.

**Bảng 4**

| Dung dịch chuẩn                          | 1     | 2     | 3     | 4     | 5     |
| ---------------------------------------- | ----- | ----- | ----- | ----- | ----- |
| Nồng độ Malathion, mg/L                  | 0,005 | 0,010 | 0,015 | 0,025 | 0,075 |
| Dung dịch chuẩn Malathion 1 mg/L, µL     | 5     | 10    | 15    | 25    | 75    |
| Dung dịch nội chuẩn (nếu cần), µL        | 100   | 100   | 100   | 100   | 100   |
| Định mức, µL                             | 1000  | 1000  | 1000  | 1000  | 1000  |

**4.2. Trường hợp 2: Pha với dải cao (max 2.000 µg/L)** — áp dụng đối với các máy đáp ứng dải nồng độ cao.

- Chuẩn bị Malathion 1000 mg/L như trên; pha dung dịch chuẩn 10 mg/L: hút 100 µL chuẩn 1000 mg/L vào bình định mức 10 mL.
- Chuẩn bị dung dịch Malathion (0,1; 0,2; 0,5; 1,0; 2,0) mg/L từ dung dịch 10 mg/L.

**Bảng 5**

| Dung dịch chuẩn                           | 1   | 2   | 3   | 4    | 5    |
| ----------------------------------------- | --- | --- | --- | ---- | ---- |
| Nồng độ Malathion, mg/L                   | 0,1 | 0,2 | 0,5 | 1,0  | 2,0  |
| Dung dịch chuẩn Malathion 10 mg/L, µL     | 100 | 200 | 500 | 1000 | 2000 |
| Dung dịch nội chuẩn (nếu cần), µL         | 100 | 100 | 100 | 100  | 100  |
| Bình định mức, mL                         | 10  | 10  | 10  | 10   | 10   |

### 5. Detector PID

- Chuẩn bị dung dịch hiệu chuẩn Toluen ở các nồng độ (100, 200, 300, 400, 500) mg/L từ dung dịch gốc 1000 mg/L vào bình định mức 10 mL, định mức đến vạch bằng methanol.

**Bảng 6**

| Dung dịch chuẩn                          | 1   | 2   | 3   | 4   | 5   |
| ---------------------------------------- | --- | --- | --- | --- | --- |
| Nồng độ Toluen, mg/L                     | 100 | 200 | 300 | 400 | 500 |
| Dung dịch chuẩn Toluen 1000 mg/L, mL     | 1   | 2   | 3   | 4   | 5   |
| Dung dịch nội chuẩn (nếu cần), mL        | 0,1 | 0,1 | 0,1 | 0,1 | 0,1 |
| Bình định mức, mL                        | 10  | 10  | 10  | 10  | 10  |

### 6. Detector NSD

- Chuẩn bị dung dịch hiệu chuẩn Azobenzen 1000 mg/L: cân 10 mg Azobenzen vào bình định mức 10 mL, định mức bằng n-Hexan tới vạch.
- Pha dung dịch chuẩn 10 mg/L Azobenzen: hút 100 µL chuẩn 1000 mg/L vào bình định mức 10 mL.
- Chuẩn bị dung dịch Azobenzen (0,1; 0,2; 0,3; 0,4; 0,5) mg/L từ dung dịch 10 mg/L.

**Bảng 7**

| Dung dịch chuẩn                            | 1   | 2   | 3   | 4   | 5   |
| ------------------------------------------ | --- | --- | --- | --- | --- |
| Nồng độ Azobenzen, mg/L                    | 0,1 | 0,2 | 0,3 | 0,4 | 0,5 |
| Dung dịch chuẩn Azobenzen 10 mg/L, µL      | 100 | 200 | 300 | 400 | 500 |
| Dung dịch nội chuẩn (nếu cần), mL          | 0,1 | 0,1 | 0,1 | 0,1 | 0,1 |
| Bình định mức, mL                          | 10  | 10  | 10  | 10  | 10  |

Dùng xi lanh hút các dung dịch chuẩn CRM ở mục 6.2 và dung dịch chuẩn đã pha ở mục 6.3 vào các vial đã chuẩn bị trước phù hợp với máy GC cần hiệu chuẩn.
