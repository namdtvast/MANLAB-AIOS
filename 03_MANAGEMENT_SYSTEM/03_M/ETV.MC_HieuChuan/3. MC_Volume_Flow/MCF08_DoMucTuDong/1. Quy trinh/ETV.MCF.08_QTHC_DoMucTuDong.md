---
id: ETV.MCF 08
title: "Phương tiện đo mức tự động — Quy trình hiệu chuẩn"
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
keywords: [đo mức tự động, automatic level meter, hiệu chuẩn]
related_documents: []
iso_clause: ["ISO/IEC 17025:2017"]
legal_basis: []
ai_tags: [calibration-procedure, automatic-level-meter, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCF 08_Do muc tu dong.pdf`"
supersedes: "ETV.MCF 08 lần ban hành 01 (22/04/2019)"
superseded_by: null
---
# PHƯƠNG TIỆN ĐO MỨC TỰ ĐỘNG – QUY TRÌNH HIỆU CHUẨN

*Automatic Level Meter – Calibration Procedure*

|                           |                             |
| ------------------------- | --------------------------- |
| **Mã số**         | ETV.MCF 08                  |
| **Lần ban hành**  | 02                          |
| **Ngày ban hành** | 22/04/2026                  |
| **Biên soạn**     | *(bản gốc để trống)* |
| **Soát xét**      | Trần Thị Hoa              |
| **Phê duyệt**     | Nguyễn Hoàng Giang        |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCF 08_Do muc tu dong.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khối chữ ký trên trang bìa để trống, chưa có tên người biên soạn.
>
> ⚠️ **Ghi chú quan trọng của bản chuyển đổi:** Toàn bộ nội dung thân văn bản của tài liệu này (mục 2 trở đi: giải thích từ ngữ, bảng ký hiệu, phương tiện hiệu chuẩn, điều kiện, trình tự hiệu chuẩn, công thức tính ĐKĐB) **trùng khớp gần như nguyên văn với `ETV.MCO 05` — không, với `ETV.MCF 05` (Phương tiện đo lưu lượng kênh hở)**: cùng thuật ngữ "LLKH", cùng đối tượng đập tràn thành mỏng/máng Parshall, cùng bảng ký hiệu Cd/C0/A/B/b/δ/g/h/p/α, cùng toàn bộ công thức và Phụ lục A/B. Chỉ có tiêu đề trang bìa và mã số là khác ("Phương tiện đo mức tự động" / `ETV.MCF 08`), còn nội dung thân bài không hề đề cập đến "phương tiện đo mức tự động" theo đúng tên gọi. Đây là dấu hiệu rõ ràng của lỗi sao chép toàn bộ nội dung từ mẫu `ETV.MCF 05` mà chưa soạn lại cho đúng đối tượng của quy trình `ETV.MCF 08`. Mục 9 Phụ lục của bản gốc còn dẫn chiếu nhầm mã biểu mẫu "ETV.MCW.F 08.01" (thuộc nhóm MCW – hoá lý nước) thay vì "ETV.MCF.F 08.01".
>
> Bản chuyển đổi này **giữ nguyên văn 100 % nội dung đã được Viện ban hành trong bản PDF gốc** (đây là bản có giá trị áp dụng chính thức), không tự ý sửa hay thay bằng nội dung đúng về "đo mức tự động", chỉ đánh dấu bất thường tại đây để người có thẩm quyền soát xét và biên soạn lại nội dung đúng khi ban hành lần tiếp theo.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian | Nội dung thay đổi  | Lần ban hành |
| ---------- | --------------------- | -------------- |
| 22/04/2019 | Ban hành lần thứ 1 | 01             |
| 22/04/2026 | Ban hành lần thứ 2 | 02             |

---

## 1. Phạm vi áp dụng

Quy trình này quy định quy trình kỹ thuật hiệu chuẩn phương tiện đo mức tự động có cấp chính xác đến 2 %.

Quy trình này áp dụng đối với nhân viên của Viện Kiểm định Công nghệ và Môi trường (sau đây gọi tắt là PTN) khi hiệu chuẩn PTĐ nói trên.

## 2. Giải thích từ ngữ

*(Nguyên văn bản gốc — xem ghi chú ở đầu tài liệu về việc nội dung này trùng với `ETV.MCF 05`)*

Các từ ngữ trong văn bản này được hiểu như sau:

- Thiết bị đo lưu lượng dòng chảy kênh hở sau đây được viết tắt là LLKH.
- **Bộ phận chỉ thị** là một bộ phận của LLKH dùng để hiển thị hoặc in ra các kết quả đo được.
- **Phần tử đo mức hoặc vận tốc dòng chảy chất lỏng** là một bộ phận của LLKH, tùy theo nguyên lý đo nó có thể tiếp xúc hoặc không tiếp xúc trực tiếp với chất lỏng trong kênh hở rồi sau đó truyền thông tin về mức hoặc vận tốc cần đo tới bộ xử lý và thiết bị chỉ thị bằng phương tiện hoặc thiết bị truyền tín hiệu, sau đó dựa vào hình dạng máng hoặc đập tràn đã được cài đặt sẵn sẽ tính toán lưu lượng trong kênh hở và hiển thị trên màn hình hiển thị.
- **Đập tràn thành mỏng** là những công trình nhân tạo nhằm ngăn cản dòng chảy của chất lỏng để bắt buộc dòng chảy chất lỏng phải chảy qua nó và có chiều dày đỉnh đập, δ, thỏa mãn điều kiện 0 < δ < 0,67h.
- **Máng** là công trình nhân tạo tùy theo mục đích sử dụng thì có nhiều hình dạng khác nhau, được chế tạo nhằm mục đích thông qua mức chất lỏng đo được trên máng đó để tính toán lưu lượng của dòng chảy.
- Độ không đảm bảo đo sau đây sẽ được viết tắt là ĐKĐBĐ.

### 2.2. Các ký hiệu sử dụng trong quy trình

| Ký hiệu | Chi tiết                                                        | Đơn vị SI |
| --------- | ---------------------------------------------------------------- | ------------ |
| Cd        | Hệ số xả                                                      | -            |
| C0        | Hằng số với từng kích thước của máng kiểu Parshall     | -            |
| A         | Diện tích của kênh đầu vào của đập/máng               | m²          |
| B         | Độ rộng của kênh đầu vào của đập/máng                | m            |
| b         | Độ rộng cửa tràn                                            | m            |
| δ        | Chiều dày đỉnh đập                                         | m            |
| g         | Gia tốc trọng trường                                         | m/s²        |
| h         | Chiều cao cột nước tràn                                     | m            |
| p         | Chiều cao đập so với mặt đáy kênh đầu vào đập/máng | m            |
| α        | Góc của cửa tràn                                             | °           |

## 3. Các phép hiệu chuẩn

Phải lần lượt tiến hành các phép kiểm tra ghi trong Bảng 1.

**Bảng 1**

| TT | Tên phép hiệu chuẩn                    | Theo điều, mục của quy trình |
| -- | ------------------------------------------ | --------------------------------- |
| 1  | Kiểm tra bên ngoài                      | 7.1                               |
| 2  | Kiểm tra kỹ thuật                       | 7.2                               |
| 3  | Kiểm tra đo lường — đo, hiệu chỉnh | 7.3.1                             |
|    | — tiến hành hiệu chuẩn                | 7.3.2                             |
| 4  | Tính toán độ không đảm bảo đo     | 7.4                               |
| 5  | Xử lý chung                              | 8                                 |

## 4. Phương tiện phục vụ hiệu chuẩn

Phương tiện hiệu chuẩn được ghi trong Bảng 2.

**Bảng 2**

| TT  | Phương tiện hiệu chuẩn                                                                                                                | Đặc trưng kỹ thuật                                                                                                                                                             |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Chuẩn đo lường** (\*)                                                                                                          |                                                                                                                                                                                     |
| 1.1 | Kênh hở với máng hoặc đập tràn thành mỏng đã được lắp đặt trong lòng kênh                                              | Phạm vi đo mức hoặc lưu lượng: phù hợp với thiết bị đo                                                                                                                 |
| 1.2 | Thước đo độ dài để đo trực tiếp mức nước trong kênh hoặc đập tràn (thước vạch, thước cuộn, thước quả rọi,...) | Phạm vi đo: phù hợp với mức nước thiết kế trong kênh; độ không đảm bảo đo ≤ 1 % kích thước của đập tràn cần kiểm tra                                    |
| 2   | **Phương tiện phụ**                                                                                                              |                                                                                                                                                                                     |
| 2.1 | Thiết bị đo nhiệt độ và độ ẩm môi trường                                                                                      | Dải đo: Nhiệt độ (0 ÷ 50) °C; Độ ẩm tương đối (0 ÷ 100) %RH. Độ phân giải: Nhiệt độ 1 °C; Độ ẩm 1 %RH; liên kết chuẩn với hệ thống chuẩn quốc gia |
| 3   | **Phương tiện khác**                                                                                                             |                                                                                                                                                                                     |
| 3.1 | Các hình trụ có đường kính khác nhau                                                                                              | —                                                                                                                                                                                  |

*(\*) Trường hợp cần nâng cao độ chính xác của phép hiệu chuẩn thì có thể gắn lưu lượng kế chất lỏng chuẩn phía trước hoặc sau hệ thống kênh hở.*

## 5. Điều kiện hiệu chuẩn

Khi tiến hành hiệu chuẩn phải đảm bảo các điều kiện sau:

- Nhiệt độ: (25 ± 5) °C;
- Độ ẩm tương đối: (40 ~ 80) %RH (không đọng sương);
- Địa điểm hiệu chuẩn phải sạch sẽ, thoáng, không có các chất ăn mòn hóa học, không gây rung động trong quá trình hiệu chuẩn;
- Nhằm tạo ra chiều cao cột nước tràn ổn định thì yêu cầu một đoạn kênh dẫn dòng chảy trước đập hoặc máng có chiều dài tối thiểu là 5 lần độ rộng của cửa tràn.

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành hiệu chuẩn phải thực hiện các công việc chuẩn bị sau đây:

- Đối với các LLKH có chỉ thị điện tử thì phương tiện cần hiệu chuẩn cần phải sấy máy tối thiểu 30 phút hoặc theo khuyến cáo của nhà sản xuất;
- Đoạn kênh dẫn dòng chảy phía trước đầu vào đập tràn hoặc máng phải đảm bảo không có sự lắng đọng của tạp chất hoặc cặn lắng hoặc bất kỳ vật thể dị thường nào mà có thể gây ảnh hưởng đến dòng chảy và phải đảm bảo dòng chảy qua đập tràn hoặc máng là dòng chảy tự do;
- Gắn thiết bị cần hiệu chuẩn vào vị trí đo trên hoặc trong, tùy theo nguyên lý thiết kế của thiết bị, kênh hở đã được chuẩn bị.

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

- **7.1.1.** Kiểm tra bản vẽ kỹ thuật: trong trường hợp khách hàng đã xây dựng đập tràn hoặc máng thì khách hàng cần cung cấp cho bên hiệu chuẩn các bản vẽ kỹ thuật và bản vẽ xây lắp (nếu có) về mặt bằng và kích thước xây dựng đập tràn hoặc máng.
- **7.1.2.** Kiểm tra nhãn mác: thiết bị cần hiệu chuẩn phải có nhãn mác ghi rõ xuất xứ, số hiệu sản phẩm (serial), năm sản xuất, phạm vi đo mức và lưu lượng, điều kiện về môi trường làm việc.
- **7.1.3.** Bộ phận chỉ thị phải đảm bảo rõ ràng và đọc được chính xác.
- **7.1.4.** Kiểm tra tài liệu và phụ kiện kèm theo: thiết bị hiệu chuẩn phải có đầy đủ tài liệu hướng dẫn sử dụng, yêu cầu về bố trí, lắp đặt và thuyết minh phương pháp đo, các phụ kiện kèm theo (nếu có).

### 7.2. Kiểm tra kỹ thuật

#### 7.2.1. Kiểm tra khả năng hoạt động của hệ thống

Vận hành hệ thống để đảm bảo lưu lượng chất lỏng chảy qua thiết bị cần hiệu chuẩn và hệ thống kênh hở trong vòng 90 giây tại lưu lượng lớn nhất của hệ thống kênh hở. Hệ thống công nghệ phải đảm bảo các yêu cầu sau:

- Có khả năng cung cấp dòng chất lỏng liên tục và ổn định;
- Chất lỏng chảy qua hệ thiết bị cần hiệu chuẩn và hệ thống kênh hở không bị rò rỉ;
- Có khả năng thay đổi lưu lượng trong phạm vi lưu lượng của hệ thống kênh hở.

#### 7.2.2. Kiểm tra kỹ thuật của thiết bị

- **7.2.2.1.** Kiểm tra kỹ thuật với đập tràn thành mỏng cửa tràn hình chữ nhật: chi tiết xem trong mục A.1 của Phụ lục A.
- **7.2.2.2.** Kiểm tra kỹ thuật với đập tràn thành mỏng cửa tràn hình tam giác: chi tiết xem trong mục A.2 của Phụ lục A.
- **7.2.2.3.** Kiểm tra kỹ thuật với máng Parshall tiêu chuẩn: chi tiết xem trong mục A.3 của Phụ lục A.

### 7.3. Kiểm tra đo lường

Các thiết bị đo lưu lượng trong kênh hở được kiểm tra đo lường theo trình tự nội dung, phương pháp và yêu cầu sau đây:

#### 7.3.1. Quy định chung

- Đối với thiết bị đo mức nước trong kênh hở phải tiến hành kiểm tra tại tối thiểu 03 mức hoặc lưu lượng được phân bố tương đối đều trong phạm vi đo của thiết bị trong trường hợp phạm vi lưu lượng của chuẩn phủ được phạm vi lưu lượng của thiết bị kiểm tra và là phạm vi đo của chuẩn trong trường hợp ngược lại;
- Khi cần thiết phải tiến hành xác định mốc "0" hay mặt phẳng mốc trong việc xác định mức nước trong kênh hở.

#### 7.3.2. Quá trình đo

Đối với đập tràn thành mỏng cửa tràn hình chữ nhật, hình tam giác, và máng Parshall tiêu chuẩn: quy trình kiểm tra các kích thước B, b, p, góc α tương tự như mô tả tại `ETV.MCF 05` mục 7.3.2.1–7.3.2.3, sử dụng thước đo chiều dài đo lặp lại tối thiểu 3 lần cho mỗi kích thước, lấy giá trị trung bình cộng làm kết quả (chi tiết đầy đủ xem file [ETV.MCF.05_QTHC_LuuLuongKenhHo.md](<../../MCF05_LuuLuongKenhHo/1.%20Quy%20trinh/ETV.MCF.05_QTHC_LuuLuongKenhHo.md>)).

#### 7.3.3. Xác định hệ số của thiết bị đo

Tại mỗi điểm lưu lượng tiến hành ghi nhận lưu lượng LLKH và tại chuẩn tối thiểu 3 lần.

Hệ số của thiết bị đo lưu lượng dòng chảy trong kênh hở tại lần đo thứ i (`MF_i`) được xác định theo công thức `MF_i = Q_stdi / Q_LLKHi`, trong đó: `Q_stdi`: lưu lượng của chuẩn tại lần đo thứ i, m³/h; `Q_LLKHi`: lưu lượng tại LLKH tại lần đo thứ i, m³/h.

Hệ số của thiết bị đo trung bình, `M̄F`, tại lưu lượng kiểm tra được xác định theo công thức trung bình cộng của n lần đo (n ≥ 3). *(công thức là hình ảnh trong bản gốc, không trích xuất được — xem bản PDF gốc)*

### 7.4. Tính toán độ không đảm bảo đo

#### 7.4.1. Các yếu tố gây ra ĐKĐB bao gồm

- PTĐ lưu lượng cần hiệu chuẩn: đặc tính kỹ thuật do nhà sản xuất cung cấp, số liệu đo đạc lần trước;
- Điều kiện môi trường hiệu chuẩn (nhiệt độ, độ ẩm);
- Sai lệch về nhiệt độ của dung dịch chuẩn;
- Nhân viên đo/hiệu chuẩn;
- Nhiệt kế;
- Một số ảnh hưởng ngẫu nhiên khác.

#### 7.4.2. Tính toán ĐKĐB đo của các yếu tố ảnh hưởng tại tất cả các điểm hiệu chuẩn

**Độ không đảm bảo đo tổng hợp:**

$$
u_c = \sqrt{u_{LLKH}^2 + u_A^2 + u_{std}^2}
$$

Trong đó: `u_c`: ĐKĐBĐ tổng hợp tương đối, %; `u_std`: ĐKĐBĐ khi xác định lưu lượng chất lỏng chuẩn, %; `u_LLKH`: ĐKĐBĐ khi xác định lưu lượng chất lỏng tại LLKH, %; `u_A`: ĐKĐBĐ loại A, %.

**ĐKĐBĐ khi xác định lưu lượng tại LLKH:**

$$
u_{LLKH} = \frac{d}{2\sqrt{3} \times Q_{LLKH}} \times 100\ (\%)
$$

Trong đó: `Q_LLKH`: lưu lượng chất lỏng chỉ thị trên LLKH trung bình của n lần đo; `d`: độ phân giải của LLKH.

**ĐKĐBĐ loại A** được xác định theo công thức thống kê chuẩn (độ lệch chuẩn thực nghiệm của trung bình). *(công thức là hình ảnh trong bản gốc, không trích xuất được — xem bản PDF gốc)*

**ĐKĐBĐ khi xác định lưu lượng tại chuẩn** (với đập tràn thành mỏng hình chữ nhật, hình tam giác, và máng Parshall tiêu chuẩn): công thức và các thành phần u(Cd), u(be), u(he), u(g), u(tan α/2) — tương tự nội dung tại `ETV.MCF 05` mục 7.4.2 (chi tiết đầy đủ xem file `ETV.MCF.05_QTHC_LuuLuongKenhHo.md` đã dẫn ở trên), bao gồm Bảng 3 giá trị u(Cd) theo chiều cao cột nước tràn:

| Loại cửa tràn      | Chiều cao cột nước tràn | u(Cd)  |
| --------------------- | ---------------------------- | ------ |
| Cửa tràn chữ nhật | h ≤ 1p                      | 0,75 % |
| Cửa tràn chữ nhật | 1p < h ≤ 1,5p               | 1,00 % |
| Cửa tràn chữ nhật | 1,5p < h                     | 1,50 % |

**Tính toán ĐKĐB kết hợp:**

$$
u_C = \sqrt{u_A^2 + u_{B1}^2 + u_{B2}^2 + u_{B3}^2 + u_{B4}^2}
$$

**ĐKĐB mở rộng:**

$$
U = k \times u_C
$$

Với k là hệ số bao phủ, hệ số bằng số được sử dụng như là bội của ĐKĐB chuẩn kết hợp để đưa ra độ KĐBĐ mở rộng, thường được chọn k = 2 với mức tin cậy xấp xỉ 95 %.

## 8. Xử lý chung

- **8.1.** PTĐ mức tự động sau khi hiệu chuẩn được dán tem, cấp giấy chứng nhận hiệu chuẩn kèm theo kết quả hiệu chuẩn.
- **8.2.** Chu kỳ hiệu chuẩn được khuyến nghị là 01 năm.

## 9. Phụ lục

- Biên bản hiệu chuẩn phương tiện đo (`ETV.MCF.F 08.01`).
- Giấy chứng nhận hiệu chuẩn (`V.P.F 11.03`).
