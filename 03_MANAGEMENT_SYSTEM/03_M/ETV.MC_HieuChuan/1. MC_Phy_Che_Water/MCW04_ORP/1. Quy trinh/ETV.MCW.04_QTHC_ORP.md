---
id: ETV.MCW 04
title: "Phương tiện đo thế ôxy hoá khử (ORP) — Quy trình hiệu chuẩn"
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
revision: "02"
status: Da-ban-hanh
keywords: [ORP, thế ôxy hóa khử, oxidation reduction potential, hiệu chuẩn, dung dịch chuẩn ORP, quan trắc môi trường nước]
related_documents: ["ETV.MCW.F 04.01"]
iso_clause: ["ISO/IEC 17025:2017"]
legal_basis: ["ĐLVN 131:2003"]
ai_tags: [calibration-procedure, orp-meter, water-quality, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCW 04_ORP_V3.pdf`"
supersedes: "ETV.MCW 04 lần ban hành 01 (22/04/2019)"
superseded_by: null
---
# PHƯƠNG TIỆN ĐO THẾ ÔXY HOÁ KHỬ (ORP) – QUY TRÌNH HIỆU CHUẨN

*ORP meter – Calibration procedure*

|                   |                |
| ----------------- | -------------- |
| **Mã số**         | ETV.MCW 04     |
| **Lần ban hành**  | 02             |
| **Ngày ban hành** | 22/04/2026     |
| **Biên soạn**     | Nguyễn Văn Đồng |
| **Soát xét**      | Trần Thị Hoa |
| **Phê duyệt**     | Nguyễn Hoàng Giang |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCW 04_ORP_V3.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khi có khác biệt, bản PDF do Viện ban hành là bản có giá trị áp dụng.
>
> *Ghi chú của bản chuyển đổi:* trong bản gốc, các mục 7.3.2 a/b/c ghi "đo giá trị **độ dẫn điện**" và công thức `u_B3` dùng ký hiệu `Δ_EC` — nhiều khả năng là lỗi sao chép từ quy trình `ETV.MCW 02` (EC), đại lượng đúng phải là ORP. Bản chuyển đổi giữ nguyên văn và đánh dấu tại chỗ; cần LĐP soát xét đính chính ở lần ban hành sau.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian  | Nội dung thay đổi     | Lần ban hành |
| ---------- | --------------------- | ------------ |
| 22/04/2019 | Ban hành lần thứ nhất | 01           |
| 22/04/2026 | Ban hành lần hai      | 02           |

---

## 1. Phạm vi áp dụng

Quy trình này quy định quy trình kỹ thuật hiệu chuẩn phương tiện đo (PTĐ) ORP đối với hoạt động quan trắc môi trường nước ngoài hiện trường và trong phòng thí nghiệm, có phạm vi đo (-999 ÷ 999) mV và sai số lớn nhất cho phép ± 5 %.

Quy trình này áp dụng đối với nhân viên Viện Kiểm định Công nghệ và Môi trường (sau đây gọi tắt là PTN) khi hiệu chuẩn PTĐ nói trên.

## 2. Thuật ngữ và định nghĩa

Các từ ngữ trong văn bản này được hiểu như sau:

- **2.1. Điện thế oxy hóa khử (ORP hay Oxidation Reduction Potential):** là đo khả năng của một hệ thống chất lỏng nhận hoặc cho điện tích (e⁻) từ các phản ứng hóa học. Khi một hệ thống có khuynh hướng nhận điện tích, hệ thống sẽ có đặc tính là oxy hóa. Khi chúng có khuynh hướng cho điện tích, hệ thống sẽ có đặc tính là khử. Điện thế oxy hóa khử của một hệ thống có thể thay đổi tùy theo sự hiện diện của các thành phần mới hoặc khi nồng độ của các thành phần đang có trong hệ thống thay đổi.
- **2.2. Dung dịch chuẩn ORP được chứng nhận:** là loại chất chuẩn thể lỏng có thế oxy hóa khử xác định và được cơ quan có thẩm quyền chứng nhận.
- **2.3. Đơn vị đo:** mV.

## 3. Các phép hiệu chuẩn

Phải lần lượt tiến hành các phép kiểm tra nêu trong Bảng 1.

**Bảng 1.**

| TT  | Tên phép hiệu chuẩn                          | Theo điều, mục của quy trình |
| --- | -------------------------------------------- | ---------------------------- |
| 1   | Kiểm tra bên ngoài                           | 7.1                          |
| 2   | Kiểm tra kỹ thuật                            | 7.2                          |
| 3   | Kiểm tra đo lường                            | 7.3                          |
| 3.1 | Kiểm tra trước hiệu chuẩn                    | 7.3.1                        |
|     | Đo trước hiệu chỉnh                          | a                            |
|     | Tiến hành hiệu chỉnh                         | b                            |
| 3.2 | Tiến hành hiệu chuẩn                         | 7.3.2                        |
|     | Kiểm tra sai số                              | a                            |
|     | Kiểm tra độ lặp lại                          | b                            |
|     | Kiểm tra độ ổn định theo thời gian (độ trôi) | c                            |
| 3.3 | Tính toán độ không đảm bảo đo                | 7.3.3                        |
| 4   | Xử lý chung                                  | 8                            |

## 4. Phương tiện hiệu chuẩn

Các phương tiện dùng để hiệu chuẩn được nêu trong Bảng 2.

**Bảng 2.**

| TT  | Phương tiện hiệu chuẩn           | Đặc trưng kỹ thuật                                                                                    |
| --- | -------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 1   | **Chuẩn đo lường**               |                                                                                                         |
|     | Dung dịch chuẩn được chứng nhận  | - Độ không đảm bảo đo phù hợp và liên kết chuẩn với hệ thống chuẩn quốc gia hoặc quốc tế                |
| 2   | **Phương tiện đo khác**          |                                                                                                         |
| 2.1 | Phương tiện đo độ dẫn điện       | - Phạm vi đo: (0 ÷ 20) µS/cm<br>- Độ chính xác: ± 0,5 %                                                 |
| 2.2 | Bể ổn nhiệt                      | - Phạm vi đo: (-20 ÷ 200) °C<br>- Độ ổn định: ± 0,01 °C                                                 |
| 2.3 | PTĐ nhiệt độ và độ ẩm môi trường | - Dải đo: Nhiệt độ (0 ÷ 50) °C; Độ ẩm tương đối (10 ÷ 95) %RH<br>- Độ phân giải: Nhiệt độ 1 °C; Độ ẩm 1 %RH |
| 3   | **Phương tiện phụ**              |                                                                                                         |
| 3.1 | Cốc mỏ                           |                                                                                                         |
| 3.2 | Nước cất                         | Nước loại 1 (theo TCVN 4851:1989)                                                                       |
| 3.3 | Bình tia nước cất                |                                                                                                         |
| 3.4 | Giấy thấm                        |                                                                                                         |

## 5. Điều kiện hiệu chuẩn

Khi tiến hành hiệu chuẩn phải đảm bảo các điều kiện sau:

- Nhiệt độ: (25 ± 5) °C;
- Độ ẩm tương đối: ≤ 80 %RH (không đọng sương).

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành hiệu chuẩn phải thực hiện các công việc chuẩn bị sau đây:

### 6.1. Chuẩn bị bể điều nhiệt

- Chỉ sử dụng nước cất dùng cho bể điều nhiệt.
- Thêm nước cất vào trong bể điều nhiệt đến vạch mức trong bể.
- Bật bể điều nhiệt, cài đặt nhiệt độ về giá trị 25 °C; kiểm tra lại nhiệt độ bằng thiết bị đo nhiệt độ.

### 6.2. Chuẩn bị dung dịch chuẩn

- Đổ dung dịch chuẩn ORP thứ nhất vào trong cốc mỏ, lượng dung dịch chuẩn điều chỉnh phù hợp với đầu đo ORP cần hiệu chuẩn sao cho đầu đo có thể nhúng chìm hoàn toàn trong dung dịch chuẩn.
- Tiến hành thao tác tương tự với 02 dung dịch chuẩn còn lại.
- Đặt 3 cốc đựng dung dịch chuẩn đã được chuẩn bị ở trên vào trong bể điều nhiệt, để ổn định nhiệt độ dung dịch chuẩn đạt giá trị (25 ± 0,01) °C.

### 6.3. Ổn định PTĐ trước hiệu chuẩn

Thiết bị cần hiệu chuẩn sau khi được bàn giao (nhận mẫu) cần được đặt trong PTN tiến hành hiệu chuẩn tối thiểu là 2 giờ để thiết bị ổn định trong điều kiện PTN.

Trước khi tiến hành hiệu chuẩn, đầu đo của PTĐ ORP phải được làm sạch bằng dung môi thích hợp tùy thuộc vào vật liệu chế tạo đầu đo, theo hướng dẫn của nhà sản xuất, sau đó rửa lại bằng nước cất. PTĐ ORP cần bật trước 30 phút để PTĐ hoạt động ổn định (tiến hành đồng thời cùng với mục 6.1).

### 6.4. Chuẩn bị bình tia nước cất và giấy thấm

Chuẩn bị các bình tia, nước cất sử dụng để rửa đầu đo điện cực.

Chuẩn bị giấy mềm để thấm khô đầu đo điện cực sau mỗi lần rửa điện cực.

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

Phải kiểm tra bên ngoài theo các yêu cầu sau đây:

Kiểm tra bằng mắt để xác định sự phù hợp của PTĐ đối với các yêu cầu quy định trong tài liệu kỹ thuật, hình dáng kích thước, ký nhãn hiệu, nguồn điện sử dụng, hiển thị, tài liệu và phụ kiện kèm theo.

### 7.2. Kiểm tra kỹ thuật

Phải kiểm tra kỹ thuật theo các yêu cầu sau đây:

Kiểm tra trạng thái hoạt động bình thường của PTĐ theo hướng dẫn sử dụng.

### 7.3. Kiểm tra đo lường

Phải kiểm tra đo lường theo trình tự sau đây:

#### 7.3.1. Kiểm tra trước hiệu chuẩn

**a. Đo trước hiệu chỉnh**

- Nhúng đầu đo của PTĐ ORP cần hiệu chuẩn vào cốc đựng dung dịch chuẩn thứ nhất. Đợi giá trị hiển thị trên PTĐ ổn định và ghi lại các giá trị vào biên bản theo Phụ lục 01.
- Rửa sạch đầu đo và làm khô bằng giấy mềm.
- Lặp lại quy trình đo như trên đối với 02 dung dịch chuẩn còn lại.

**b. Tiến hành hiệu chỉnh**

- Lựa chọn chế độ hiệu chỉnh trên PTĐ ORP cần hiệu chuẩn và tiến hành hiệu chỉnh PTĐ bằng các dung dịch chuẩn theo hướng dẫn của nhà sản xuất. Ghi lại thông tin về quá trình hiệu chỉnh vào biên bản theo Phụ lục 01.
- Sau mỗi lần đo cần rửa sạch đầu đo bằng nước cất và làm khô bằng giấy mềm.
- Đối với PTĐ cần hiệu chuẩn không thể tiến hành hiệu chỉnh được hoặc khách hàng không yêu cầu hiệu chỉnh thì bỏ qua bước hiệu chỉnh và thực hiện bước tiếp theo.

#### 7.3.2. Tiến hành hiệu chuẩn

**a. Kiểm tra sai số**

- Chọn 03 dung dịch chuẩn như trong mục 6 để tiến hành kiểm tra sai số của PTĐ.
- Đo giá trị độ dẫn điện [^sic] của các dung dịch chuẩn tại nhiệt độ (25 ± 0,01) °C, đợi giá trị hiển thị trên PTĐ ổn định trong 1-2 phút. Đọc kết quả đo tối thiểu 3 lần liên tiếp và ghi lại các giá trị vào biên bản theo Phụ lục 01.
- Lặp lại quy trình đo như trên đối với 2 dung dịch chuẩn còn lại.

**b. Kiểm tra độ lặp lại**

- Đo giá trị độ dẫn điện [^sic] của 3 dung dịch chuẩn tại nhiệt độ (25 ± 0,01) °C, mỗi dung dịch chuẩn đo lặp lại 7 lần. Ghi kết quả đo vào biên bản Phụ lục 01.

**c. Kiểm tra độ ổn định theo thời gian (độ trôi)**

- Chọn 01 dung dịch chuẩn như trong mục 6 để tiến hành kiểm tra độ ổn định. Đo giá trị độ dẫn điện [^sic] của dung dịch chuẩn tại nhiệt độ (25 ± 0,01) °C. Thực hiện đo 03 lần, mỗi lần cách nhau 02 giờ. Ghi kết quả đo vào biên bản Phụ lục 01.

[^sic]: Nguyên văn bản gốc ghi "độ dẫn điện"; theo phạm vi áp dụng của quy trình, đại lượng đo phải là ORP (mV).

#### 7.3.3. Tính toán độ không đảm bảo đo

##### 7.3.3.1. Các yếu tố gây ra ĐKĐB bao gồm

- PTĐ ORP cần hiệu chuẩn: đặc tính kỹ thuật do nhà sản xuất cung cấp, số liệu đo đạc lần trước;
- Điều kiện môi trường trong phòng đo/hiệu chuẩn (nhiệt độ, độ ẩm);
- Dung dịch chuẩn;
- Sai lệch về nhiệt độ của dung dịch chuẩn;
- Nhân viên đo/hiệu chuẩn;
- Một số ảnh hưởng ngẫu nhiên khác.

##### 7.3.3.2. Tính toán ĐKĐB của các yếu tố ảnh hưởng tại tất cả các điểm hiệu chuẩn

**a. Thành phần ĐKĐB do độ lặp lại**

Tính ĐKĐB do độ lặp lại trong bước kiểm tra độ chính xác của thiết bị tại các nồng độ dung dịch chuẩn.

$$u_A = \frac{s}{\sqrt{n}}$$

$$s = \sqrt{\frac{1}{n-1}\sum_{k=1}^{n}(q_k - \bar{q})^2}$$

- `u_A`: ĐKĐB do độ lặp lại;
- `s`: độ lệch chuẩn thực nghiệm sau n lần đo;
- `n`: số lần thực hiện đo;
- `q_k`: giá trị đo được ở lần thứ k;
- `q̄`: giá trị trung bình của n lần đo.

**b. Thành phần ĐKĐB do dung dịch chuẩn**

- Nếu giấy chứng nhận cung cấp độ chính xác của dung dịch chuẩn:

  $$u_{B1} = \frac{a}{\sqrt{3}} \quad (a: \text{Độ chính xác của dung dịch chuẩn})$$

- Nếu giấy chứng nhận cung cấp ĐKĐB của dung dịch chuẩn:

  $$u_{B1} = \frac{a}{k} \quad (a: \text{ĐKĐB của dung dịch chuẩn},\; k: \text{hệ số bao phủ})$$

**c. Thành phần ĐKĐB do ảnh hưởng nhiệt độ của bể điều nhiệt**

- Nếu giấy chứng nhận cung cấp độ ổn định (b) của bể điều nhiệt:

  $$u_{B2} = \frac{b}{\sqrt{3}}\left(\frac{\Delta_{ORP}}{\Delta_t}\right)$$

- Nếu giấy chứng nhận chỉ cung cấp ĐKĐB (c) của bể điều nhiệt:

  $$u_{B2} = \frac{c}{2}\left(\frac{\Delta_{ORP}}{\Delta_t}\right)$$

`(Δ_ORP/Δ_t)`: Giá trị ORP thay đổi theo nhiệt độ tính trên 1 °C.

**d. Thành phần ĐKĐB do thiết bị kiểm tra nhiệt độ**

$$u_{B3} = \frac{d}{2}\left(\frac{\Delta_{EC}}{\Delta_t}\right)$$

- `d`: ĐKĐB của PTĐ kiểm tra nhiệt độ dung dịch chuẩn;
- `(Δ_ORP/Δ_t)`: Giá trị ORP thay đổi theo nhiệt độ tính trên 1 °C.

> *Ghi chú của bản chuyển đổi:* bản gốc in ký hiệu `Δ_EC` trong công thức nhưng chú giải ngay dưới lại là `Δ_ORP` — giữ nguyên văn, cần đính chính khi ban hành lại.

**e. Thành phần ĐKĐB do độ phân giải của PTĐ cần hiệu chuẩn**

$$u_{B4} = \frac{e}{2\sqrt{3}}$$

- `e`: Độ phân giải của PTĐ cần hiệu chuẩn.

**Tính toán ĐKĐB tổng hợp**

$$u_C = \sqrt{u_A^2 + u_{B1}^2 + u_{B2}^2 + u_{B3}^2 + u_{B4}^2}$$

**ĐKĐB mở rộng**

$$U = k \cdot u_C$$

Với `k` là hệ số bao phủ, hệ số bằng số được sử dụng như là bội của ĐKĐB tổng hợp để đưa ra ĐKĐB mở rộng, thường được chọn k = 2 với mức tin cậy xấp xỉ 95 %.

## 8. Xử lý chung

- **8.1.** Phương tiện đo ORP sau khi hiệu chuẩn được dán tem, cấp giấy chứng nhận hiệu chuẩn kèm theo kết quả hiệu chuẩn.
- **8.2.** Chu kỳ hiệu chuẩn được khuyến nghị là 01 năm.

## 9. Phụ lục

Phụ lục 01 — Biên bản hiệu chuẩn thế oxy hoá khử (`ETV.MCW.F 04.01`).

---

## TÀI LIỆU THAM KHẢO

- **ISO/IEC 17025:2017** — Yêu cầu chung về năng lực của phòng thử nghiệm và hiệu chuẩn;
- **ĐLVN 131:2003** — Hướng dẫn đánh giá độ không đảm bảo đo;
- Hướng dẫn sử dụng thiết bị đo thế oxy hóa khử (ORP).
