---
id: ETV.MCF 06
title: "Phương tiện đo lưu lượng ống kín — Quy trình hiệu chuẩn"
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
keywords: [lưu lượng ống kín, closed conduit flow, lưu lượng kế điện từ, hiệu chuẩn]
related_documents: []
iso_clause: ["ISO/IEC 17025:2005", "TCVN 8112", "TCVN 8440", "TCVN 8114", "TCVN 9496", "TCVN 9497", "ISO 3966:1997", "ISO 7066-1:1989", "ISO 7066-2:1988"]
legal_basis: ["ĐLVN 131:2003"]
ai_tags: [calibration-procedure, closed-conduit-flow, electromagnetic-flowmeter, uncertainty-budget]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "Nguyễn Hoàng Giang"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV) — chuyển đổi định dạng từ bản PDF gốc `ETV.MCF 06_Luu luong duong ong kin_V1.pdf`"
supersedes: "ETV.MCF 06 lần ban hành 01 (22/04/2019, bổ sung 19/05/2020)"
superseded_by: null
---
# PHƯƠNG TIỆN ĐO LƯU LƯỢNG ỐNG KÍN – QUY TRÌNH HIỆU CHUẨN

*Equipment of Flow in Closed Conduits – Calibration Procedure*

|                   |                     |
| ----------------- | ------------------- |
| **Mã số**         | ETV.MCF 06          |
| **Lần ban hành**  | 02                  |
| **Ngày ban hành** | 22/04/2026          |
| **Biên soạn**     | *(bản gốc để trống)* |
| **Soát xét**      | Trần Thị Hoa        |
| **Phê duyệt**     | Nguyễn Hoàng Giang  |

> **Tình trạng bản này:** Bản chuyển đổi định dạng (PDF → Markdown) từ file gốc `ETV.MCF 06_Luu luong duong ong kin_V1.pdf` do Viện ban hành, phục vụ tra cứu trên ManLab. Khối chữ ký trên trang bìa để trống, chưa có tên người biên soạn.
>
> *Ghi chú của bản chuyển đổi:* bảng ký hiệu tại mục 2.2 của bản gốc (Cd, C0, A, B, b, δ, g, h, p, α) là các ký hiệu về đập tràn/máng Parshall — trùng khớp với bảng ký hiệu của `ETV.MCF 05` (Lưu lượng kênh hở), không liên quan đến nội dung của quy trình này (lưu lượng ống kín). Đây rõ ràng là lỗi sao chép từ mẫu MCF05. Bản chuyển đổi giữ nguyên văn bảng này nhưng ghi chú tại đây. Ngoài ra, "Bổ sung phạm vi đo (DN6000)" tại bảng theo dõi thay đổi ghi ngày 19/05/2020 nhưng bảng theo dõi lại ghi "Ban hành lần 2" vào ngày "19/05/2026" trong khi trang bìa ghi ngày ban hành 22/04/2026 — hai ngày khác nhau cho cùng một lần ban hành 02; giữ nguyên văn, dùng ngày trang bìa (22/04/2026) làm giá trị chính thức.

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian  | Nội dung thay đổi                              | Lần ban hành |
| ---------- | -------------------------------------------------- | ------------ |
| 22/04/2019 | Ban hành lần thứ nhất                               | 01           |
| 19/05/2020 | Bổ sung phạm vi đo (DN6000) và chuẩn sử dụng        | 01           |
| 19/05/2026 | Ban hành lần 2[^ngay19052026]                       | 02           |

[^ngay19052026]: Xem ghi chú ở đầu tài liệu về sai khác ngày giữa bảng theo dõi thay đổi và trang bìa.

---

## 1. Phạm vi áp dụng

Văn bản này quy định quy trình hiệu chuẩn các thiết bị đo lưu lượng dòng chảy trong ống dẫn kín có vận tốc dòng (0 ÷ 10) m/s tương ứng đến DN6000; độ không đảm bảo đo đến 2,2 %.

Quy trình này áp dụng đối với nhân viên của Viện Kiểm định Công nghệ và Môi trường khi hiệu chuẩn thiết bị nói trên.

## 2. Giải thích từ ngữ

Trong phạm vi quy trình này, các từ ngữ và ký hiệu dưới đây được hiểu như sau:

### 2.1. Thuật ngữ

- **Lưu lượng kế điện từ (electromagnetic flowmeter):** lưu lượng kế tạo ra từ trường vuông góc với dòng chảy, vì vậy cho phép tạo ra tốc độ dòng chảy từ sức điện động cảm ứng (e.m.f) được tạo ra bởi chuyển động của chất lỏng dẫn điện trong từ trường. Lưu lượng kế điện từ bao gồm một thiết bị sơ cấp và một hoặc nhiều thiết bị thứ cấp.
- **Ống lưu lượng kế (meter tube):** phần ống của thiết bị sơ cấp qua đó chất lỏng được đo lưu lượng; bề mặt phía trong của ống thường được cách điện.
- **Điện cực của lưu lượng kế (meter electrodes):** một hoặc nhiều cặp tiếp điểm hoặc bản tụ điện mà nhờ đó điện áp cảm ứng được phát hiện.
- **Lưu lượng toàn thang (full-scale flow-rate):** lưu lượng tương ứng với tín hiệu đầu ra lớn nhất.
- Độ không đảm bảo đo sau đây sẽ được viết tắt là ĐKĐBĐ.

### 2.2. Các ký hiệu sử dụng trong quy trình[^kyhieu]

| Ký hiệu | Chi tiết                                                       | Đơn vị |
| -------- | ---------------------------------------------------------------- | ------ |
| Cd       | Hệ số xả                                                          | -      |
| C0       | Hằng số với từng kích thước của máng kiểu Parshall                | -      |
| A        | Diện tích của kênh đầu vào của đập/máng                           | m²     |
| B        | Độ rộng của kênh đầu vào của đập/máng                              | m      |
| b        | Độ rộng cửa tràn                                                   | m      |
| δ        | Chiều dày đỉnh đập                                                 | m      |
| g        | Gia tốc trọng trường                                               | m/s²   |
| h        | Chiều cao cột nước tràn                                            | m      |
| p        | Chiều cao đập so với mặt đáy kênh đầu vào đập/máng                 | m      |
| α        | Góc của cửa tràn                                                   | °      |

[^kyhieu]: Xem ghi chú ở đầu tài liệu — bảng ký hiệu này trùng với `ETV.MCF 05` và không liên quan trực tiếp đến nội dung lưu lượng ống kín của quy trình này.

## 3. Các phép hiệu chuẩn

Phải lần lượt tiến hành các phép kiểm tra ghi trong Bảng 1.

**Bảng 1**

| TT  | Tên phép hiệu chuẩn             | Theo điều, mục của quy trình |
| --- | ---------------------------------- | -------------------------------- |
| 1   | Kiểm tra bên ngoài                 | 7.1                               |
| 2   | Kiểm tra kỹ thuật                  | 7.2                               |
| 3   | Kiểm tra đo lường                  | 7.3                               |
| 4   | Tính toán độ không đảm bảo đo      | 7.4                               |

## 4. Phương tiện hiệu chuẩn

Phương tiện hiệu chuẩn được ghi trong Bảng 2.

**Bảng 2**

| TT  | Phương tiện hiệu chuẩn                    | Đặc trưng kỹ thuật                                                                                                     |
| --- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Chuẩn đo lường** (\*)                        |                                                                                                                                |
| 1.1 | Chuẩn lưu lượng ống kín                        | Phạm vi đo: (0 ÷ 10) m/s; đường kính: (DN50 ÷ DN6000); độ không đảm bảo đo nhỏ hơn 1/2 sai số cho phép của đối tượng đo; chuẩn được liên kết chuẩn với cấp cao hơn và có giấy chứng nhận kèm theo |
| 2   | **Phương tiện phụ**                            |                                                                                                                                |
| 2.1 | Thiết bị đo nhiệt độ và độ ẩm môi trường       | Dải đo: Nhiệt độ (0 ÷ 50) °C; Độ ẩm tương đối (0 ÷ 100) %RH. Độ phân giải: Nhiệt độ 1 °C; Độ ẩm 1 %RH; liên kết chuẩn với hệ thống chuẩn quốc gia |
| 3   | **Phương tiện khác**                           |                                                                                                                                |
| 3.1 | Các hình trụ có đường kính khác nhau           | —                                                                                                                              |

*(\*) Trường hợp cần nâng cao độ chính xác của phép hiệu chuẩn thì có thể gắn lưu lượng kế chất lỏng chuẩn phía trước hoặc sau hệ thống kênh hở.*[^ghichu_kenhho]

[^ghichu_kenhho]: Ghi chú (\*) này nhắc đến "hệ thống kênh hở" — cùng dấu hiệu sao chép nguyên văn từ `ETV.MCF 05` như đã nêu ở đầu tài liệu.

## 5. Điều kiện hiệu chuẩn

Khi tiến hành hiệu chuẩn phải đảm bảo các điều kiện sau:

- Nhiệt độ: (25 ± 5) °C;
- Độ ẩm tương đối: (40 ~ 80) %RH (không đọng sương);
- Địa điểm hiệu chuẩn phải sạch sẽ, thoáng, không có các chất ăn mòn hóa học, không gây rung động trong quá trình hiệu chuẩn.

## 6. Chuẩn bị hiệu chuẩn

Trước khi tiến hành hiệu chuẩn phải thực hiện các công việc chuẩn bị sau đây:

### 6.1. Yêu cầu chung

- Dòng chảy phải đều;
- Tại vị trí đầu vào của ống thẳng phía dòng vào cần đối xứng trục và không bị ảnh hưởng bởi các xung động và xoáy lớn;
- Chuẩn lưu lượng hoặc chuẩn hiệu chuẩn cho phép đo lưu lượng hoặc khối lượng dòng chảy phải tuân theo quy định của TCVN 8440 (ISO 4185) hoặc TCVN 9497 (ISO 8316), hoặc bất cứ tiêu chuẩn nào liên quan đến chuẩn đối với phép đo dòng chất lỏng;
- Chuẩn lưu lượng hay chuẩn hiệu chuẩn phải nằm trong phạm vi phù hợp để bao trùm phạm vi của dòng chảy đối với lưu lượng kế được kiểm tra. Nếu lưu lượng kế được yêu cầu lắp đặt trong nhiều hơn một thiết bị kiểm tra thì phải mô tả tất cả các lắp đặt này;
- Ống chứa chất lỏng phải luôn đầy. Chất lỏng phải tuân thủ với các thông số đưa ra ở mục 2.2;
- Ống lưu lượng kế phải luôn đầy chất lỏng trong suốt quá trình kiểm tra. Để đạt được điều này, mạng lưới đường ống nơi thiết bị sơ cấp được lắp đặt phải có đủ chỗ cho việc thoát khí bên trong nó;
- Trong mọi trường hợp phải tuân thủ hướng dẫn lắp đặt dụng cụ đo của nhà sản xuất;
- Việc kết nối giữa ống và chuẩn lưu lượng phải được tiến hành sao cho thiết bị nối không choán chỗ dòng chảy của chất lỏng.

## 7. Tiến hành hiệu chuẩn

### 7.1. Kiểm tra bên ngoài

Phải kiểm tra bên ngoài theo các yêu cầu sau đây:

- Có đầy đủ nhãn, mác, nơi chế tạo hoặc tài liệu kèm theo trong đó ghi rõ đặc tính kỹ thuật về hình dáng, kích thước, điện áp nguồn, phụ tùng kèm theo;
- Thiết bị không bị biến dạng, dây dẫn, ống dẫn khí không xoắn, gẫy gập hoặc nứt hay vỡ.

### 7.2. Kiểm tra kỹ thuật

Phải kiểm tra kỹ thuật theo các yêu cầu sau đây: vận hành và kiểm tra trạng thái hoạt động bình thường của phương tiện đo lưu lượng ống kín cần hiệu chuẩn theo tài liệu hướng dẫn sử dụng.

### 7.3. Kiểm tra đo lường

Các thiết bị đo lưu lượng trong ống kín được kiểm tra đo lường theo trình tự nội dung, phương pháp và yêu cầu sau đây:

PTĐ lưu lượng chuẩn và các thiết bị thử kèm theo phải cho phép ổn định (nghĩa là cho phép có ít nhất 15 min khởi động trong điều kiện môi trường ổn định trước khi bất cứ thử nghiệm nào được tiến hành). Trong thời gian khởi động này trở kháng đầu ra cần nằm ở khoảng giữa của giới hạn cho phép. Các điều kiện môi trường có thể ảnh hưởng tới kết quả thử phải được quan sát và ghi lại.

Trừ khi có quy định khác, trước khi thử lưu lượng kế phải được điều chỉnh ở sai số nhỏ nhất đối với các giá trị trong phạm vi cận trên và cận dưới trước các thử nghiệm.

Để có thể đánh giá tính năng của hệ thống lưu lượng trên một phạm vi dòng chảy quy định thì các điểm thử nên được tiến hành với lưu lượng được điều chỉnh tương đương khoảng 10 %, 25 %, 50 %, 75 % và 100 % biên độ (xem Hình 1). Tốt nhất nên tiến hành ít nhất ba phép đo ở mỗi điểm thử.

Từ các số đọc tại mỗi lưu lượng, phải tính số đọc đầu ra trung bình. Sự khác biệt giữa giá trị này và giá trị tương ứng của hệ thống chuẩn quy chiếu là sai số đối với tiêu chuẩn này. Độ lệch này sẽ được biểu diễn theo tỷ lệ phần trăm của biên độ đầu ra hoặc dòng được đo.

Khi có phạm vi thay đổi gắn với thiết bị thì quy trình thử nghiệm trên phải được áp dụng độc lập cho mỗi phạm vi dòng chảy, nhưng sự tương thích của các số đọc ở các vùng tương ứng trong mỗi phạm vi phải được kiểm tra chéo với các phạm vi thay đổi.

*(Hình 1 - Hiệu chuẩn mẫu chỉ ra phân bố điểm thử — hình vẽ trong bản gốc, không tái tạo lại.)*

### 7.4. Tính toán độ không đảm bảo đo

#### 7.4.1. Xác định các yếu tố gây ra ĐKĐBĐ

Các yếu tố gây ra ĐKĐBĐ bao gồm:

- PTĐ lưu lượng chuẩn: đặc tính kỹ thuật do nhà sản xuất cung cấp, số liệu đo đạc lần trước, độ trôi điểm "không", độ chính xác, độ lặp lại, độ tuyến tính, thời gian đáp ứng và độ phân giải của PTĐ;
- PTĐ lưu lượng ống kín: đặc tính kỹ thuật do nhà sản xuất cung cấp, số liệu đo đạc lần trước, độ trôi điểm "không", độ chính xác, độ lặp lại, độ tuyến tính, thời gian đáp ứng và độ phân giải của thiết bị;
- Điều kiện môi trường trong phòng đo/hiệu chuẩn (nhiệt độ, độ ẩm);
- Nhân viên đo/hiệu chuẩn;
- Nguồn điện cấp vào thiết bị;
- Một số ảnh hưởng ngẫu nhiên khác.

#### 7.4.2. Tính toán ĐKĐBĐ của các yếu tố ảnh hưởng

Các yếu tố ảnh hưởng đến ĐKĐBĐ được xác định từ mục 7.4.1. Tuy nhiên, không phải tất cả các yếu tố ảnh hưởng đều có thể xác định được hoặc có những yếu tố ảnh hưởng không đáng kể tới ĐKĐBĐ thì có thể xem xét và bỏ qua như: nhân viên thực hiện công tác đo/hiệu chuẩn, nguồn điện, điều kiện môi trường và một vài yếu tố ngẫu nhiên khác… ĐKĐBĐ được tính như sau:

**ĐKĐBĐ của PTĐ chuẩn lưu lượng ống kín**

ĐKĐBĐ của chuẩn được xác định bao gồm ĐKĐBĐ từ GCN của đơn vị hiệu chuẩn (`u_B1`) và độ lặp lại của PTĐ chuẩn đo được tại thực tế (`u_B2`), trong đó:

ĐKĐBĐ từ GCN chuẩn:

$$u_{B1} = \frac{u_{Cal}}{2}$$

với `u_Cal` là ĐKĐBĐ dẫn theo chứng nhận của nhà sản xuất PTĐ lưu lượng chuẩn.

Với những PTĐ chuẩn lưu lượng ống kín mà nhà sản xuất không công bố ĐKĐBĐ, chỉ có độ chính xác của PTĐ thì ĐKĐBĐ của PTĐ được tính theo công thức:

$$u_{B1} = \frac{\text{độ chính xác}}{\sqrt{3}}$$

ĐKĐBĐ của độ chụm (độ lặp lại) của PTĐ chuẩn lưu lượng ống kín (`u_B2`):

$$u_{B2} = s(\bar{q}) = \frac{s(q_k)}{\sqrt{n}} = \sqrt{\frac{1}{n(n-1)}\sum_{k=1}^{n} (q_k - \bar{q})^2}$$

Trong hầu hết các trường hợp, ước lượng tốt nhất có thể có của các giá trị kỳ vọng của đại lượng q là trung bình số học `q̄`, nó thay đổi một cách ngẫu nhiên. Trung bình số học của n kết quả đo độc lập:

$$\bar{q} = \frac{1}{n}\sum_{k=1}^{n} q_k$$

Độ lệch chuẩn thực nghiệm `s(q_k)` được dùng để ước lượng phân bố của q:

$$s(q_k) = \sqrt{\frac{1}{n-1}\sum_{k=1}^{n} (q_k - \bar{q})^2}$$

Độ lệch chuẩn thực nghiệm `s(q̄)` của giá trị trung bình được dùng để ước lượng độ rộng của phân bố các giá trị trung bình:

$$s(\bar{q}) = \frac{s(q_k)}{\sqrt{n}}$$

**ĐKĐBĐ của PTĐ lưu lượng ống kín cần hiệu chuẩn**

ĐKĐBĐ của PTĐ lưu lượng ống kín cần hiệu chuẩn được xác định thông qua ĐKĐBĐ của độ chụm (độ lặp lại) (`u_A1`) và ĐKĐBĐ thông qua độ phân giải của PTĐ (`u_A2`). Trong đó:

ĐKĐBĐ của độ chụm (độ lặp lại) của PTĐ lưu lượng ống kín (`u_A1`):

$$u_{A1} = s(\bar{q}) = \frac{s(q_k)}{\sqrt{n}} = \sqrt{\frac{1}{n(n-1)}\sum_{k=1}^{n} (q_k - \bar{q})^2}$$

(tính tương tự như trên với công thức trung bình số học `q̄` và độ lệch chuẩn thực nghiệm `s(q_k)`, `s(q̄)`).

ĐKĐBĐ thông qua độ phân giải của thiết bị được lấy từ thông số từ nhà sản xuất:

$$u_{A2} = \frac{\text{độ phân giải}}{2\sqrt{3}}$$

#### 7.4.3. Tính toán ĐKĐBĐ tổng hợp và ĐKĐBĐ mở rộng

**ĐKĐBĐ tổng hợp:**

$$u_C = \sqrt{u_{A1}^2 + u_{A2}^2 + u_{B1}^2 + u_{B2}^2}$$

**ĐKĐBĐ mở rộng:** Độ không đảm bảo đo mở rộng (U) là đại lượng xác định miền giá trị phân bố bao quanh kết quả đo:

$$U = k \times u_C$$

Với k là hệ số bao phủ, hệ số bằng số được sử dụng như là bội của ĐKĐBĐ chuẩn kết hợp để đưa ra ĐKĐBĐ mở rộng, thường được chọn k = 2 với mức tin cậy xấp xỉ 95 %.

## 8. Xử lý chung

- **8.1.** PTĐ lưu lượng ống kín sau khi hiệu chuẩn được dán tem, cấp giấy chứng nhận hiệu chuẩn có chứa các thông tin về kết quả hiệu chuẩn kèm theo ĐKĐBĐ tương ứng.
- **8.2.** Chu kỳ hiệu chuẩn của PTĐ lưu lượng ống kín được khuyến nghị: 12 tháng.

## 9. Phụ lục

Biên bản hiệu chuẩn phương tiện đo lưu lượng ống kín (`ETV.MCF.F 06.01`).

## TÀI LIỆU THAM KHẢO

1. ISO/IEC 17025:2005: Yêu cầu chung về năng lực của phòng thử nghiệm và hiệu chuẩn.
2. ĐLVN 131:2003 "Hướng dẫn đánh giá độ không đảm bảo đo".
3. TCVN 7699-2-3 (IEC 68-2-3), Thử nghiệm môi trường - Phần 2-3: Các thử nghiệm: Thử nghiệm Ca: Nóng ẩm, trạng thái ổn định.
4. TCVN 7699-2-4 (IEC 68-2-4), Thử nghiệm môi trường - Phần 2-4: Các thử nghiệm: Thử nghiệm D: Nóng ẩm gia tốc.
5. TCVN 7699-2-6:2009 (IEC 68-2-6:1982), Thử nghiệm môi trường - Phần 2-6: Các thử nghiệm: Thử nghiệm Fc và hướng dẫn: Rung (hình sin).
6. TCVN 7699-2-27 (IEC 68-2-27), Thử nghiệm môi trường - Phần 2-27: Các thử nghiệm. Thử nghiệm Ea và hướng dẫn: Xóc.
7. TCVN 8112 (ISO 4006), Đo dòng chất lỏng trong ống dẫn kín - Từ vựng và ký hiệu.
8. TCVN 8440 (ISO 4185), Đo dòng chất lỏng trong ống dẫn kín - Phương pháp cân.
9. TCVN 8114 (ISO 5168), Đo dòng chất lỏng - Ước lượng độ không đảm bảo đo của phép đo lưu lượng.
10. TCVN 9496 (ISO 6817), Đo dòng chất lỏng dẫn điện trong ống dẫn kín - Phương pháp dùng lưu lượng kế điện từ.
11. TCVN 9497:2012 (ISO 8316:1987), Đo dòng chất lỏng trong ống dẫn kín - Phương pháp thu chất lỏng trong bình thể tích.
12. ISO 3966:1997, Measurement of fluid flow in closed conduits - Velocity area method using Pitot static tubes.
13. ISO 7066-1:1989, Assessment of uncertainty in the calibration and use of flow measurement devices - Part 1: Linear calibration relationships.
14. ISO 7066-2:1988, Assessment of uncertainty in the calibration and use of flow measurement devices - Part 2: Non-linear calibration relationships.
