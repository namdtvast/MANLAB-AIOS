---
# Khối metadata AI — bắt buộc cho mọi văn bản kiểm soát (ETV.P14 VI.3)
id: ETV.P38
title: "Thủ tục Quản lý dịch vụ số"
type: Thu-tuc
owner: "Phụ trách Quản lý chất lượng (QLCL)"
department: "Toàn Viện"
process: MP38_DichVuSo
capability: [CAP-29_AIOffice]
module: M38_DichVuSo
effective_date: ""
revision: "01"
status: Cho-soat-xet
keywords: [dịch vụ số, dịch vụ trực tuyến, cổng tra cứu kết quả, trả kết quả điện tử, mức dịch vụ, ISO/IEC 17025 §7.1, §7.8]
related_documents: [ETV.QM, ETV.P01, ETV.P02, ETV.P06, ETV.P07, ETV.P11, ETV.P12, ETV.P13, ETV.P14, ETV.P15, ETV.P17, ETV.P21, ETV.P27, ETV.P28, ETV.P29, ETV.P30, ETV.P31, ETV.P32, ETV.P34, ETV.P35, ETV.P36, ETV.P37]
iso_clause: ["ISO 9001:2015 §8.2, §8.5.1, §9.1.2", "ISO/IEC 17025:2017 §4.2, §7.1, §7.8, §7.9", "ISO/IEC 27001:2022 §8.1, A.5.14, A.8.26", "ISO/IEC 42001:2023 §8.1"]
legal_basis: ["Luật Giao dịch điện tử 20/2023/QH15", "Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân", "Pháp luật hiện hành về bảo vệ quyền lợi người tiêu dùng và về thương mại điện tử"]
ai_tags: [digital-service, service-level, customer-portal]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Vĩnh viễn (bản hiện hành) — xem chi tiết theo loại tại ETV.P.F 14.06"
digital_signature: "LĐV"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV)"
supersedes: null
superseded_by: null
---
# THỦ TỤC QUẢN LÝ DỊCH VỤ SỐ

**Procedure For Digital Service Management**

|                   |                                          |
| ----------------- | ---------------------------------------- |
| **Mã số**         | ETV.P 38                                 |
| **Lần ban hành**  | 01                                       |
| **Ngày ban hành** | ..../..../........                       |
| **Biên soạn**     | Dương Thành Nam — ..../..../........     |
| **Soát xét**      | Đỗ Văn Vinh — Lãnh đạo Phòng, ..../..../........ |
| **Phê duyệt**     | Nguyễn Hoàng Giang — Lãnh đạo Viện, ..../..../........ |

> **Tình trạng bản này: CHỜ SOÁT XÉT** — dự thảo lần đầu, chưa có hiệu lực. Bản này chỉ được áp dụng sau khi Lãnh đạo Viện phê duyệt và chuyển trạng thái **Đã phê duyệt** theo ETV.P14.

> **Chú ý:** Tài liệu nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện Kiểm định Công nghệ và Môi trường.

> **Ghi chú soạn thảo.** Đặc tả module `M38_DichVuSo` hiện mới ở dạng khung mẫu. Dự thảo này được xây dựng từ Sổ tay chất lượng §10.7 và từ các nghĩa vụ mà thủ tục khác giao cho MP38: `ETV.P35` mục 6.7 (dịch vụ số phải khai báo nền tảng vận hành; **không được công bố nếu nền tảng chưa ở trạng thái Hiệu lực**) và mục 6.5.3 (chặn ngừng nền tảng khi còn dịch vụ số phụ thuộc), `ETV.P32` mục 2.3 (vận hành, mức dịch vụ và hỗ trợ người dùng của dịch vụ đã khai thác thuộc MP38). Các **giá trị định lượng** (mức dịch vụ, thời hạn phản hồi, thời hạn thông báo) là **đề xuất**, cần Viện xác nhận trước khi ban hành.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian | Nội dung thay đổi | Lần ban hành |
| ---------- | ------------------- | -------------- |
| ..../..../........ | Ban hành lần thứ nhất. Thủ tục mới, hiện thực hoá Sổ tay chất lượng §10.7 và quy trình MP38 | 01 |

---

## I. MỤC ĐÍCH

Thủ tục này quy định nội dung, trách nhiệm và trình tự **thiết lập, đánh giá trước khi công bố, vận hành, hỗ trợ người dùng, xử lý sự cố, thay đổi và ngừng cung cấp** các dịch vụ số của Viện ETV, nhằm đáp ứng yêu cầu Điều 4.2, 7.1, 7.8 và 7.9 của ISO/IEC 17025:2017, Điều 8.2 và 8.5.1 của ISO 9001:2015 và Mục 10.7 của Sổ tay chất lượng. Cụ thể để:

1. Bảo đảm mỗi dịch vụ số là một **cam kết có thể kiểm chứng** với khách hàng — có chủ sở hữu, mức dịch vụ, kênh hỗ trợ và phương án khi gián đoạn — chứ không phải một tính năng được bật lên rồi bỏ đó.
2. Bảo đảm dịch vụ **chỉ được công bố khi nền tảng vận hành đã ở trạng thái Hiệu lực** theo ETV.P35 và đã qua đánh giá an toàn thông tin.
3. Bảo đảm **kết quả, chứng chỉ cung cấp qua dịch vụ số có giá trị pháp lý**, xác thực được và truy xuất được nguồn gốc.
4. Bảo đảm nghĩa vụ **bảo mật thông tin khách hàng** không bị suy giảm khi chuyển sang phương thức trực tuyến.
5. Bảo đảm khách hàng luôn có **kênh thay thế** khi dịch vụ số gián đoạn, và được thông báo kịp thời.
6. Bảo đảm phản hồi, khiếu nại phát sinh từ dịch vụ số được xử lý theo đúng thủ tục khiếu nại và được dùng làm đầu vào cải tiến.
7. Bảo đảm **ngừng dịch vụ có kiểm soát**: thông báo trước, chuyển đổi và bảo toàn dữ liệu, hồ sơ của khách hàng.

Áp dụng thống nhất trong toàn Viện ETV, thực hiện qua phần mềm ManLab (Module M38 – Quản lý dịch vụ số).

---

## II. PHẠM VI ÁP DỤNG

### 2.1. Đối tượng áp dụng

Áp dụng cho toàn bộ đơn vị, phòng ban, cá nhân thuộc Viện ETV và cho **mọi dịch vụ số** mà Viện cung cấp cho bên ngoài hoặc cho khách hàng:

| TT | Nhóm dịch vụ số | Ví dụ |
|---|---|---|
| 1 | Tiếp nhận yêu cầu trực tuyến | Đăng ký dịch vụ kiểm định, hiệu chuẩn, thử nghiệm qua biểu mẫu trực tuyến |
| 2 | Theo dõi tiến độ | Cổng khách hàng tra cứu tình trạng mẫu, tiến độ công việc |
| 3 | **Trả kết quả điện tử** | Gửi phiếu kết quả, báo cáo thử nghiệm bản điện tử có ký số |
| 4 | **Tra cứu, xác thực chứng chỉ** | Cổng tra cứu chứng chỉ, mã QR xác thực (phối hợp ETV.P36) |
| 5 | Cung cấp thông tin năng lực | Trang công bố phạm vi năng lực, bảng giá, hướng dẫn khách hàng |
| 6 | Tương tác, hỗ trợ khách hàng | Kênh hỏi đáp trực tuyến, tiếp nhận phản hồi, khiếu nại điện tử |
| 7 | Dịch vụ số có thành phần trí tuệ nhân tạo | Trợ lý hỏi đáp cho khách hàng, gợi ý biểu mẫu đăng ký |
| 8 | Trao đổi dữ liệu với khách hàng, đối tác qua cổng | Nộp và nhận dữ liệu theo lô qua cổng dịch vụ |

Dữ liệu được quản lý thống nhất trên phần mềm ManLab (Module M38 – Quản lý dịch vụ số).

### 2.2. Nguyên tắc áp dụng

**Nguyên tắc 1 — Dịch vụ số là cam kết, không phải tính năng.** Một chức năng chỉ được gọi là dịch vụ số khi có: chủ sở hữu dịch vụ · đối tượng phục vụ xác định · **mức dịch vụ cam kết** · kênh hỗ trợ · **phương án thay thế khi gián đoạn**. Thiếu bất kỳ yếu tố nào thì **không được công bố**.

**Nguyên tắc 2 — Không công bố dịch vụ trên nền tảng chưa hiệu lực.** Dịch vụ số phải khai báo nền tảng vận hành và chỉ được công bố khi nền tảng đó ở trạng thái **Hiệu lực** theo ETV.P35 (quy định này do ETV.P35 mục 6.7 đặt ra, thủ tục này thực thi).

**Nguyên tắc 3 — Kênh số không làm giảm nghĩa vụ.** Nghĩa vụ bảo mật (ISO/IEC 17025 §4.2, ETV.P02), yêu cầu về nội dung và tính đúng đắn của báo cáo kết quả (ETV.P11), nghĩa vụ xử lý khiếu nại (ETV.P12) áp dụng **nguyên vẹn** trên kênh số. Dịch vụ số **không** tạo ra ngoại lệ cho các yêu cầu đó.

### 2.3. Ngoài phạm vi

Thủ tục này **không** thay thế và **không** trùng lặp với:

| Nội dung | Thuộc thủ tục |
|---|---|
| Đăng ký, đánh giá trước vận hành, giám sát và ngừng vận hành **nền tảng số** | ETV.P35 – Quản lý nền tảng số |
| Hạ tầng, máy chủ, mạng | ETV.P33 – Quản lý hệ thống thông tin |
| Điểm tích hợp và hợp đồng dữ liệu phục vụ dịch vụ | ETV.P37 – Quản lý tích hợp dữ liệu |
| Chất lượng, vòng đời và kiểm soát truy xuất dữ liệu | ETV.P34 · ETV.P27 |
| Biện pháp an toàn thông tin, phân quyền, sự cố an toàn thông tin | ETV.P28 – Quản lý an toàn thông tin |
| **Nội dung và tính đúng đắn của báo cáo kết quả, phiếu kết quả** | ETV.P11 – Báo cáo kết quả |
| Phát hành, ký số, xác thực và truy xuất nguồn gốc **chứng chỉ số** | ETV.P36 – Quản lý chứng chỉ số và truy xuất nguồn gốc |
| Xem xét yêu cầu, đề nghị và **hợp đồng** với khách hàng | ETV.P07 – Xem xét yêu cầu, đề nghị và hợp đồng |
| Tiếp nhận, điều tra và kết luận **khiếu nại** | ETV.P12 – Khiếu nại |
| Nghĩa vụ bảo mật và phê duyệt công bố thông tin khách hàng | ETV.P02 – Bảo mật |
| Công bố và kiểm soát **phạm vi năng lực** | ETV.P21 – Công bố và kiểm soát năng lực |
| Sáng kiến, lộ trình phát triển dịch vụ số mới | ETV.P32 – Chuyển đổi số và cải tiến hệ thống |
| Đánh giá tác động và kiểm soát hệ thống trí tuệ nhân tạo | ETV.P29 – Quản lý hệ thống trí tuệ nhân tạo |
| Phương án duy trì hoạt động khi gián đoạn kéo dài | ETV.P31 – Quản lý tính liên tục hoạt động |
| Thẩm định và phê duyệt thay đổi | ETV.P30 – Quản lý thay đổi |

> **Phân biệt cốt lõi:** ETV.P35 trả lời *"nền tảng có chạy không"*; **ETV.P38** trả lời *"khách hàng nhận được gì, cam kết ra sao, hỏng thì làm gì"*; ETV.P11 và ETV.P36 trả lời *"nội dung kết quả, chứng chỉ có đúng và xác thực được không"*; ETV.P12 trả lời *"khách hàng khiếu nại thì xử lý ra sao"*.

---

## III. TÀI LIỆU VIỆN DẪN

> Nguyên tắc: **chỉ dẫn chiếu, không chép lại nội dung.** Bản đầy đủ đặt tại `03_MANAGEMENT_SYSTEM/` (chuẩn mực) và `08_KNOWLEDGE_GRAPH/01_Regulations/` (pháp luật). QLCL rà soát hiệu lực và văn bản thay thế trước mỗi lần ban hành lại.

### 3.1. Tiêu chuẩn

- ISO 9001:2015 §8.2 (Yêu cầu đối với sản phẩm và dịch vụ); §8.5.1 (Kiểm soát việc cung cấp dịch vụ); §9.1.2 (Sự thoả mãn của khách hàng)
- ISO/IEC 17025:2017 §4.2 (Bảo mật); §7.1 (Xem xét yêu cầu, đề nghị và hợp đồng); §7.8 (Báo cáo kết quả); §7.9 (Khiếu nại)
- ISO/IEC 27001:2022 §8.1; A.5.14 (Truyền nhận thông tin); A.8.26 (Yêu cầu an toàn cho ứng dụng)
- ISO/IEC 42001:2023 §8.1 — khi dịch vụ số có thành phần trí tuệ nhân tạo
- `11_COMPLIANCE/01_ISO_Mapping/MP-ISO-mapping.md` — bảng ánh xạ đầy đủ MP ↔ điều khoản

### 3.2. Văn bản pháp luật

- **Luật Giao dịch điện tử số 20/2023/QH15** — giá trị pháp lý của thông điệp dữ liệu, chữ ký điện tử, chữ ký số dùng cho kết quả và chứng chỉ điện tử
- **Nghị định 13/2023/NĐ-CP** về bảo vệ dữ liệu cá nhân — khi dịch vụ thu thập, xử lý dữ liệu cá nhân của khách hàng, người dùng
- Pháp luật hiện hành về **bảo vệ quyền lợi người tiêu dùng** và về **thương mại điện tử** — điều khoản sử dụng, thông tin cung cấp cho người dùng, cơ chế tiếp nhận phản hồi
- Pháp luật hiện hành về **an toàn thông tin mạng**
- Quy định pháp luật chuyên ngành về **đo lường, đánh giá sự phù hợp** — hình thức, nội dung phiếu kết quả, giấy chứng nhận khi cung cấp bản điện tử

### 3.3. Văn bản nội bộ Viện ETV

- Sổ tay quản lý chất lượng (ETV.QM) §10.7
- ETV.P01 – Quản lý rủi ro và cơ hội · ETV.P02 – Bảo mật · ETV.P06 – Quản lý mua sắm · ETV.P07 – Xem xét yêu cầu, đề nghị và hợp đồng
- ETV.P11 – Báo cáo kết quả · ETV.P12 – Khiếu nại · ETV.P13 – Khắc phục, cải tiến · ETV.P14 – Kiểm soát tài liệu
- ETV.P15 – Kiểm soát hồ sơ · ETV.P17 – Xem xét của lãnh đạo · ETV.P21 – Công bố và kiểm soát năng lực
- ETV.P27 – Quản trị dữ liệu và tài sản thông tin · ETV.P28 – Quản lý an toàn thông tin · ETV.P29 – Quản lý hệ thống trí tuệ nhân tạo
- ETV.P30 – Quản lý thay đổi · ETV.P31 – Quản lý tính liên tục hoạt động · ETV.P32 – Chuyển đổi số và cải tiến hệ thống
- ETV.P34 – Quản lý dữ liệu số · ETV.P35 – Quản lý nền tảng số · ETV.P36 – Quản lý chứng chỉ số và truy xuất nguồn gốc · ETV.P37 – Quản lý tích hợp dữ liệu

---

## IV. THUẬT NGỮ, ĐỊNH NGHĨA VÀ CHỮ VIẾT TẮT

### 4.1. Thuật ngữ và định nghĩa

| Thuật ngữ | Định nghĩa |
|---|---|
| **Dịch vụ số** | Dịch vụ mà Viện cung cấp cho khách hàng hoặc bên ngoài thông qua phương tiện điện tử, được kiểm kê thành **một bản ghi**, có chủ sở hữu, mức dịch vụ và kênh hỗ trợ xác định |
| **Chủ sở hữu dịch vụ** | Lãnh đạo đơn vị chịu trách nhiệm về **giá trị nghiệp vụ** của dịch vụ: phục vụ ai, cam kết gì, chất lượng ra sao |
| **Đối tượng phục vụ** | Nhóm người dùng của dịch vụ: khách hàng đã ký hợp đồng · khách hàng tiềm năng · cơ quan quản lý · công chúng |
| **Mức dịch vụ cam kết** | Cam kết định lượng về thời gian phục vụ, thời gian phản hồi hỗ trợ và mức sẵn sàng của dịch vụ |
| **Kênh thay thế** | Phương thức để khách hàng tiếp tục được phục vụ khi dịch vụ số gián đoạn (trực tiếp, điện thoại, thư điện tử) |
| **Công bố dịch vụ** | Việc chính thức đưa dịch vụ ra cho đối tượng phục vụ sử dụng, sau khi đủ điều kiện tại §6.2 |
| **Thử nghiệm giới hạn** | Việc cho một nhóm người dùng giới hạn sử dụng dịch vụ trước khi công bố rộng rãi, có tiêu chí kết thúc định trước |
| **Sự cố dịch vụ** | Sự việc làm dịch vụ ngừng, sai hoặc suy giảm ở phía người dùng, bất kể nguyên nhân từ nền tảng, hạ tầng, tích hợp hay nội dung |
| **Gián đoạn có kế hoạch** | Việc tạm ngừng dịch vụ đã được thông báo trước để bảo trì, nâng cấp |
| **Điều khoản sử dụng** | Văn bản nêu quyền, nghĩa vụ của người dùng dịch vụ và giới hạn trách nhiệm của Viện; là tài liệu kiểm soát theo ETV.P14 |
| **Kết quả điện tử** | Phiếu kết quả, báo cáo, giấy chứng nhận cung cấp dưới dạng dữ liệu điện tử có chữ ký số, có giá trị pháp lý theo Luật Giao dịch điện tử |

### 4.2. Chữ viết tắt

| Chữ viết tắt | Ý nghĩa |
|---|---|
| ETV | Viện Kiểm định Công nghệ và Môi trường |
| HTQL | Hệ thống quản lý |
| LĐV | Lãnh đạo Viện |
| LĐP / TP | Lãnh đạo Phòng / Trưởng phòng, người phụ trách lĩnh vực |
| NTH | Người thực hiện |
| CSHDV | Chủ sở hữu dịch vụ số |
| ĐMKT | Đầu mối kỹ thuật |
| QLCL | Phụ trách Quản lý chất lượng |
| QLKT | Phụ trách Quản lý kỹ thuật |
| QTHT | Quản trị hệ thống |
| PT.ATTT | Người phụ trách an toàn thông tin |
| KPH | Sự không phù hợp và hành động khắc phục (theo ETV.P13) |
| ManLab | Nền tảng số hợp nhất của Viện (ManLab AIOS) |
| RACI | Responsible – Accountable – Consulted – Informed |

---

## V. VAI TRÒ VÀ TRÁCH NHIỆM (RACI)

### 5.1. Ma trận RACI

| Bước trong vòng đời dịch vụ số | NTH | CSHDV | ĐMKT | QLKT | PT.ATTT | QLCL | LĐV |
|---|---|---|---|---|---|---|---|
| Đề xuất dịch vụ số mới *(sáng kiến theo ETV.P32)* | **R** | **R** | C | C | I | C | **A** |
| Lập bản ghi dịch vụ (F38.01); xác định đối tượng phục vụ | I | **R/A** | C | C | I | C | I |
| Xác định **mức dịch vụ cam kết** và kênh hỗ trợ | I | **R/A** | C | C | I | **R** | C |
| Xác định **kênh thay thế** khi gián đoạn | I | **R** | C | C | I | **A** | C |
| Đánh giá trước khi công bố (F38.02) | I | **R** | **R** | C | **R** | **A** | C |
| Kiểm tra nền tảng vận hành ở trạng thái Hiệu lực (ETV.P35) | I | C | **R** | I | C | **A** | I |
| Xác nhận nội dung kết quả, chứng chỉ cung cấp qua dịch vụ | I | C | I | **R/A** | I | C | C |
| **Phê duyệt công bố dịch vụ** | I | C | C | C | C | C | **R/A** |
| Vận hành, theo dõi mức dịch vụ | I | **A** | **R** | I | I | C | I |
| Hỗ trợ người dùng, trả lời câu hỏi | **R** | **A** | C | C | I | C | I |
| Xử lý **sự cố dịch vụ** (F38.03); thông báo khách hàng | C | **R** | **R** | C | C | **A** | C |
| Tiếp nhận phản hồi; chuyển khiếu nại sang ETV.P12 | **R** | **A** | I | C | I | **R** | I |
| Gián đoạn có kế hoạch: lập lịch và thông báo trước | I | **R** | **R** | I | I | **A** | C |
| Thay đổi dịch vụ | I | **R** | **R** | C | C | **A** | **A** *(thay đổi lớn)* |
| Ngừng cung cấp dịch vụ | I | **R** | **R** | C | C | **R** | **R/A** |
| Rà soát định kỳ dịch vụ | I | **R/A** | C | C | C | **R** | I |
| Tổng hợp báo cáo phục vụ xem xét của lãnh đạo | I | C | C | C | C | **R/A** | I |

> LĐV luôn là **A** cuối cùng đối với **công bố dịch vụ**, **thay đổi lớn** và **ngừng cung cấp dịch vụ** — không uỷ quyền.

### 5.2. Trách nhiệm cụ thể

**Lãnh đạo Viện (LĐV):** Phê duyệt công bố dịch vụ số, thay đổi lớn và ngừng cung cấp dịch vụ; quyết định khi sự cố dịch vụ ảnh hưởng nghĩa vụ với khách hàng hoặc uy tín của Viện; phê duyệt điều khoản sử dụng và các cam kết mức dịch vụ công bố ra ngoài; xem xét tình hình dịch vụ số trong cuộc họp xem xét của lãnh đạo (ETV.P17).

**Chủ sở hữu dịch vụ (CSHDV):** Chịu trách nhiệm về **giá trị nghiệp vụ** của dịch vụ và về việc cam kết mức dịch vụ được thực hiện; xác định đối tượng phục vụ, kênh hỗ trợ và kênh thay thế; tổ chức hỗ trợ người dùng; chủ trì xử lý sự cố dịch vụ ở phía nghiệp vụ; đề xuất thay đổi hoặc ngừng khi dịch vụ không còn phù hợp.

**Đầu mối kỹ thuật (ĐMKT):** Cấu hình, vận hành dịch vụ trên nền tảng; theo dõi mức sẵn sàng và thời gian phản hồi; xử lý sự cố kỹ thuật; phối hợp ETV.P35, ETV.P37 khi nguyên nhân nằm ở nền tảng hoặc điểm tích hợp.

**Phụ trách Quản lý kỹ thuật (QLKT):** Xác nhận **nội dung kết quả, chứng chỉ** cung cấp qua dịch vụ số đúng yêu cầu của ETV.P11 và quy định pháp luật chuyên ngành; xác nhận cách hiển thị kết quả không gây hiểu sai (đơn vị đo, độ không đảm bảo đo, phạm vi áp dụng).

**Người phụ trách an toàn thông tin (PT.ATTT):** Đánh giá an toàn thông tin của dịch vụ trước khi công bố (xác thực người dùng, phân quyền, bảo vệ dữ liệu cá nhân, chống truy cập trái phép tới kết quả của khách hàng khác); cho ý kiến bắt buộc khi dịch vụ thu thập dữ liệu cá nhân.

**Phụ trách Quản lý chất lượng (QLCL):** Quản trị danh mục dịch vụ số; kiểm tra đủ điều kiện công bố trước khi trình LĐV; theo dõi mức dịch vụ thực tế so với cam kết, dịch vụ **đến hạn rà soát**, sự cố lặp lại; bảo đảm phản hồi và khiếu nại từ kênh số được chuyển đúng ETV.P12; mở KPH theo ETV.P13; lưu hồ sơ theo ETV.P15.

**Người thực hiện (NTH):** Hỗ trợ người dùng theo phân công, trong phạm vi thông tin được phép cung cấp (ETV.P02); **không** cung cấp kết quả, thông tin của khách hàng qua kênh chưa được phê duyệt; báo ngay khi phát hiện dịch vụ hiển thị sai hoặc lộ thông tin.

### 5.3. Nguyên tắc tách vai trò và giới hạn của AI

- Người lập bản ghi dịch vụ ≠ người phê duyệt công bố.
- Người vận hành kỹ thuật ≠ người xác nhận nội dung kết quả cung cấp qua dịch vụ (QLKT).
- Trợ lý AI được phép: hỗ trợ trả lời câu hỏi thường gặp của người dùng theo tập tri thức đã duyệt; phân loại và định tuyến phản hồi; nhắc dịch vụ **không đạt mức cam kết**, đến hạn rà soát; soạn dự thảo thông báo và báo cáo.
- Trợ lý AI **không** được: phê duyệt công bố hay ngừng dịch vụ · **cung cấp kết quả đo, kết luận kỹ thuật hoặc diễn giải kết quả cho khách hàng** · trả lời thay Viện về khiếu nại · truy xuất và tiết lộ dữ liệu của khách hàng ngoài phạm vi người dùng đó được phép xem. Mọi thành phần AI trong dịch vụ phải có hồ sơ đánh giá tác động theo **ETV.P29** và phải hiển thị rõ cho người dùng biết đang tương tác với trợ lý tự động.

---

## VI. NỘI DUNG / QUY TRÌNH THỰC HIỆN

### 6.1. Danh mục dịch vụ số (Biểu mẫu F38.01)

#### 6.1.1. Nội dung tối thiểu của một bản ghi

| Nhóm | Trường bắt buộc |
|---|---|
| Nhận dạng | Mã dịch vụ; tên gọi; nhóm dịch vụ (§2.1); mô tả dịch vụ dành cho người dùng |
| Trách nhiệm | **Chủ sở hữu dịch vụ**; đầu mối kỹ thuật; bộ phận hỗ trợ người dùng |
| Đối tượng | Đối tượng phục vụ; điều kiện sử dụng; cách người dùng được cấp quyền truy cập |
| Nền tảng | **Mã nền tảng vận hành** (ETV.P35) và trạng thái nền tảng; điểm tích hợp liên quan (ETV.P37) |
| Dữ liệu | Tập dữ liệu, tài sản thông tin dịch vụ truy xuất (ETV.P34, ETV.P27); **mức phân loại cao nhất**; có thu thập dữ liệu cá nhân hay không |
| Cam kết | **Mức dịch vụ**: thời gian phục vụ, mức sẵn sàng mục tiêu, thời gian phản hồi hỗ trợ |
| Dự phòng | **Kênh thay thế** khi gián đoạn; ngưỡng và cách thông báo khách hàng |
| Pháp lý | Điều khoản sử dụng (mã tài liệu theo ETV.P14); thông báo về dữ liệu cá nhân |
| Vòng đời | Ngày công bố; chu kỳ rà soát; trạng thái |

#### 6.1.2. Mức dịch vụ cam kết

Mỗi dịch vụ phải có tối thiểu ba cam kết định lượng. Mức đề xuất áp dụng chung, điều chỉnh theo từng dịch vụ khi phê duyệt:

| Chỉ số | Mức đề xuất |
|---|---|
| **Thời gian phục vụ** | 24/7 đối với dịch vụ tra cứu; giờ hành chính đối với dịch vụ có xử lý của nhân sự |
| **Mức sẵn sàng mục tiêu** | ≥ 99% theo tháng đối với dịch vụ tra cứu kết quả, chứng chỉ; ≥ 98% với dịch vụ còn lại |
| **Thời gian phản hồi hỗ trợ** | Trong **01 ngày làm việc** kể từ khi nhận yêu cầu; **04 giờ làm việc** với yêu cầu liên quan kết quả đã phát hành |
| **Thời gian thông báo gián đoạn có kế hoạch** | Trước **03 ngày làm việc** |

Cam kết công bố ra ngoài phải được **LĐV phê duyệt** và phải là mức Viện thực sự đáp ứng được — cam kết vượt năng lực thực tế là rủi ro đối với uy tín và nghĩa vụ hợp đồng.

### 6.2. Đánh giá trước khi công bố dịch vụ (Biểu mẫu F38.02)

#### 6.2.1. Điều kiện bắt buộc

Dịch vụ chỉ được trình phê duyệt công bố khi đủ **toàn bộ** điều kiện sau:

| # | Điều kiện | Căn cứ |
|---|---|---|
| 1 | **Nền tảng vận hành ở trạng thái Hiệu lực** | ETV.P35 §6.7 |
| 2 | Có chủ sở hữu dịch vụ, đầu mối kỹ thuật, bộ phận hỗ trợ là người, bộ phận cụ thể | §5.2 |
| 3 | Có **mức dịch vụ cam kết** và cơ chế đo được mức đó | §6.1.2 |
| 4 | Có **kênh thay thế** khi dịch vụ gián đoạn | Nguyên tắc 1 |
| 5 | Có **điều khoản sử dụng** đã ban hành theo ETV.P14 | §4.1 |
| 6 | Có đánh giá **an toàn thông tin** đạt: xác thực, phân quyền, chống truy cập chéo dữ liệu giữa các khách hàng | ETV.P28 |
| 7 | Có căn cứ và thông báo về **dữ liệu cá nhân** (nếu thu thập) | ETV.P27 §6.4; NĐ 13/2023 |
| 8 | **QLKT xác nhận nội dung** kết quả, chứng chỉ hiển thị qua dịch vụ đúng ETV.P11 và quy định pháp luật | ETV.P11 |
| 9 | Kết quả, chứng chỉ điện tử có **chữ ký số** và cơ chế xác thực, truy xuất nguồn gốc | Luật GDĐT 2023; ETV.P36 |
| 10 | Đã **thử nghiệm giới hạn** đạt tiêu chí kết thúc (với dịch vụ hướng khách hàng) | §6.2.2 |
| 11 | Có hồ sơ **AIA** theo ETV.P29 nếu dịch vụ có thành phần trí tuệ nhân tạo | ETV.P29 |
| 12 | Dịch vụ công bố thông tin năng lực phải nhất quán với phạm vi đã công bố theo **ETV.P21** | ETV.P21 |

#### 6.2.2. Thử nghiệm giới hạn

Dịch vụ hướng khách hàng phải qua thử nghiệm với nhóm người dùng giới hạn, thời hạn **tối đa 60 ngày**, có tiêu chí kết thúc định trước (tối thiểu: không có lỗi hiển thị sai kết quả · không có sự cố lộ dữ liệu · tỷ lệ yêu cầu hỗ trợ trong ngưỡng chấp nhận · đạt mức sẵn sàng cam kết). Trong thời gian thử nghiệm, **kênh phục vụ hiện hành vẫn là kênh chính thức**.

#### 6.2.3. Trình tự thực hiện

| Bước | Nội dung thực hiện | Trách nhiệm | Biểu mẫu |
|---|---|---|---|
| 1 | Lập bản ghi dịch vụ (trạng thái **Nháp**); xác định đối tượng phục vụ, mức dịch vụ, kênh hỗ trợ, kênh thay thế | CSHDV | `ETV.P.F 38.01` |
| 2 | Chuẩn bị điều khoản sử dụng, thông báo về dữ liệu cá nhân; ban hành theo ETV.P14 | CSHDV, QLCL | Theo ETV.P14 |
| 3 | Đánh giá trước khi công bố theo 12 điều kiện tại §6.2.1 | QLCL chủ trì; PT.ATTT, QLKT, ĐMKT tham gia | `ETV.P.F 38.02` |
| 4 | Thử nghiệm giới hạn; kết luận theo tiêu chí kết thúc | CSHDV, ĐMKT | `ETV.P.F 38.02` |
| 5 | **Phê duyệt công bố**; không đạt → trả lại (bắt buộc ghi lý do) | **LĐV** | `ETV.P.F 38.02` |
| 6 | Công bố dịch vụ; thông báo tới đối tượng phục vụ; bật giám sát mức dịch vụ | CSHDV, ĐMKT | `ETV.P.F 38.01` |
| 7 | Rà soát định kỳ (mặc định **12 tháng/lần**; dịch vụ có dữ liệu cá nhân hoặc thành phần AI: **06 tháng/lần**) | CSHDV, QLCL | `ETV.P.F 38.01` |

### 6.3. Vận hành và hỗ trợ người dùng

#### 6.3.1. Giám sát mức dịch vụ

ĐMKT theo dõi liên tục mức sẵn sàng, thời gian phản hồi của dịch vụ (dữ liệu tình trạng nền tảng lấy từ ETV.P35 §6.3). QLCL tổng hợp **mức dịch vụ thực tế so với cam kết** theo tháng. Dịch vụ **không đạt cam kết 02 tháng liên tiếp** → mở KPH theo ETV.P13 và xem xét điều chỉnh cam kết hoặc nâng cấp năng lực (qua sáng kiến theo ETV.P32).

#### 6.3.2. Hỗ trợ người dùng

Mỗi dịch vụ phải công bố ít nhất **một kênh hỗ trợ** với đầu mối và thời gian phản hồi. Yêu cầu hỗ trợ được ghi nhận, phân loại và theo dõi tới khi đóng. Nhân sự hỗ trợ chỉ cung cấp thông tin trong phạm vi được phép (ETV.P02); mọi câu hỏi về **nội dung kỹ thuật của kết quả** phải chuyển tới người có thẩm quyền theo ETV.P11, **không** tự diễn giải.

#### 6.3.3. Phản hồi và khiếu nại

Phản hồi tích cực, góp ý cải tiến → đưa vào danh mục sáng kiến theo **ETV.P32**. Nội dung mang tính **khiếu nại** (về kết quả, về dịch vụ, về hành vi của Viện) → chuyển **ETV.P12** ngay khi nhận diện, không xử lý riêng trong kênh số; thời điểm tiếp nhận tính từ khi khách hàng gửi trên kênh số.

Sự thoả mãn của khách hàng đối với dịch vụ số được thu thập tối thiểu **01 lần/năm** và là đầu vào xem xét của lãnh đạo (ISO 9001 §9.1.2).

### 6.4. Sự cố dịch vụ và gián đoạn (Biểu mẫu F38.03)

#### 6.4.1. Phân mức và nghĩa vụ thông báo

| Mức | Tiêu chí | Thông báo nội bộ | Thông báo khách hàng |
|---|---|---|---|
| **Cao** | Dịch vụ ngừng hoàn toàn; **hiển thị sai kết quả**; lộ dữ liệu giữa các khách hàng | **Ngay**, báo LĐV trong 01 giờ | Trong **04 giờ**, kèm kênh thay thế |
| **Trung bình** | Một chức năng chính không dùng được; chậm đáng kể; ảnh hưởng nhóm người dùng | Trong 04 giờ làm việc | Trong **01 ngày làm việc** nếu chưa khắc phục |
| **Thấp** | Lỗi hiển thị nhỏ, không ảnh hưởng nội dung kết quả | Trong 01 ngày làm việc | Không bắt buộc |

Trường hợp **hiển thị sai kết quả** hoặc **lộ dữ liệu khách hàng**: **tạm ngừng chức năng liên quan ngay**, chuyển **ETV.P28** (nếu là lộ dữ liệu), chuyển **ETV.P10, ETV.P11** để kết luận về hiệu lực kết quả đã cung cấp, và báo cáo LĐV — không chờ khắc phục xong mới báo.

#### 6.4.2. Định tuyến

| Nguyên nhân | Định tuyến |
|---|---|
| Nền tảng vận hành lỗi | **ETV.P35** — phiếu sự cố nền tảng F35.03 |
| Hạ tầng, mạng | **ETV.P33** — phiếu sự cố F33.04 |
| Sai lệch dữ liệu từ kết nối | **ETV.P37** — tạm ngừng điểm tích hợp, đối chiếu |
| Sai nội dung kết quả, chứng chỉ | **ETV.P11**, **ETV.P36** |
| Lộ lọt dữ liệu, truy cập trái phép | **ETV.P28** — không đóng phiếu trước khi ETV.P28 kết luận |
| Gián đoạn kéo dài vượt ngưỡng kích hoạt | **ETV.P31** |
| Sự cố lặp ≥ **03 lần trong 90 ngày** | **ETV.P13** — bắt buộc mở KPH |

#### 6.4.3. Gián đoạn có kế hoạch

Bảo trì, nâng cấp làm dịch vụ tạm ngừng phải: thông báo trước **03 ngày làm việc** cho đối tượng phục vụ · thực hiện ngoài giờ cao điểm khi có thể · nêu rõ thời gian dự kiến và kênh thay thế · thực hiện theo phiếu thay đổi ETV.P30 nếu chạm cấu hình nền tảng.

### 6.5. Thay đổi và ngừng cung cấp dịch vụ

#### 6.5.1. Thay đổi dịch vụ

| Loại | Ví dụ | Yêu cầu |
|---|---|---|
| **Thay đổi nhỏ** | Sửa nội dung hướng dẫn, bố cục giao diện không đổi chức năng | CSHDV phê duyệt; ghi nhật ký |
| **Thay đổi lớn** | Thay đổi phạm vi dịch vụ, đối tượng phục vụ, **mức dịch vụ cam kết**, cách xác thực người dùng, dữ liệu hiển thị cho khách hàng | Đánh giá lại theo §6.2.1 ở phần bị ảnh hưởng; phiếu thay đổi ETV.P30; **LĐV phê duyệt**; thông báo khách hàng trước khi áp dụng |
| Thay đổi điều khoản sử dụng | Sửa quyền, nghĩa vụ của người dùng | Ban hành lại theo ETV.P14; thông báo và để người dùng biết trước khi hiệu lực |

#### 6.5.2. Ngừng cung cấp dịch vụ

| Bước | Nội dung thực hiện | Trách nhiệm |
|---|---|---|
| 1 | Đề nghị ngừng: lý do, dịch vụ thay thế, số người dùng đang sử dụng | CSHDV |
| 2 | Xác định nghĩa vụ còn tồn với khách hàng: yêu cầu đang xử lý, kết quả chưa nhận, dữ liệu khách hàng đã nộp | CSHDV, QLCL |
| 3 | Lập kế hoạch chuyển đổi: kênh thay thế, cách khách hàng lấy lại dữ liệu, hồ sơ, thời điểm ngừng | CSHDV, ĐMKT |
| 4 | **Thông báo khách hàng trước tối thiểu 30 ngày** (hoặc theo cam kết trong hợp đồng nếu dài hơn) | CSHDV |
| 5 | Phê duyệt ngừng | **LĐV** |
| 6 | Ngừng dịch vụ; bảo toàn dữ liệu, hồ sơ theo ETV.P15, ETV.P27; cập nhật bản ghi nền tảng (ETV.P35) và điểm tích hợp (ETV.P37) | ĐMKT, QLCL |
| 7 | Chuyển bản ghi sang **Đã ngừng**; **giữ bản ghi** để truy vết | QLCL |

**Không** được ngừng dịch vụ khi còn yêu cầu của khách hàng đang xử lý trên dịch vụ đó mà chưa có phương án hoàn tất.

### 6.6. Kết quả và chứng chỉ cung cấp qua dịch vụ số

- Kết quả, chứng chỉ điện tử phải có **chữ ký số** của người có thẩm quyền và giữ nguyên nội dung đã được phê duyệt theo **ETV.P11**; dịch vụ số **không** được tự tạo, tự sửa hay tự định dạng lại nội dung kết quả.
- Phải có cơ chế để bên nhận **xác thực** tính toàn vẹn và nguồn gốc (mã tra cứu, mã QR, chức năng kiểm tra) — chi tiết theo **ETV.P36**.
- Việc cung cấp bản điện tử **không** làm thay đổi nghĩa vụ về nội dung, thời hạn lưu hồ sơ và trách nhiệm của người ký.
- Người dùng chỉ được xem kết quả thuộc phạm vi của mình; **truy cập chéo dữ liệu giữa các khách hàng là sự cố mức Cao** (§6.4.1).
- Kết quả đã cung cấp qua dịch vụ số nếu phải thu hồi, đính chính → thực hiện theo **ETV.P11**, đồng thời gỡ hoặc đánh dấu trên dịch vụ và thông báo khách hàng.

### 6.7. Dịch vụ chưa đăng ký

Chức năng đang phục vụ khách hàng qua phương tiện điện tử mà **chưa có bản ghi dịch vụ** được coi là **không phù hợp**. Khi phát hiện: QLCL lập bản ghi ở trạng thái Nháp và xác định chủ sở hữu; nếu dịch vụ cần thiết → đưa vào trình tự §6.2.3 trong **30 ngày**; nếu dịch vụ đang hiển thị kết quả, dữ liệu khách hàng mà chưa qua đánh giá an toàn thông tin → **tạm ngừng ngay**; nếu đã gây lộ dữ liệu hoặc hiển thị sai kết quả → lập KPH theo ETV.P13 và xử lý theo ETV.P28, ETV.P11.

### 6.8. Báo cáo và soát xét

QLCL tổng hợp **06 tháng/lần** và trước mỗi cuộc họp xem xét của lãnh đạo (ETV.P17): danh sách dịch vụ số theo nhóm và trạng thái; **mức dịch vụ thực tế so với cam kết**; số lượng và phân mức sự cố dịch vụ, thời gian khắc phục; số yêu cầu hỗ trợ và thời gian phản hồi; phản hồi, khiếu nại phát sinh từ kênh số và kết quả xử lý; kết quả khảo sát sự thoả mãn của khách hàng; dịch vụ đến hạn rà soát; dịch vụ chưa đăng ký phát hiện trong kỳ; đề xuất cải tiến chuyển sang ETV.P32.

Thủ tục này được soát xét định kỳ theo ETV.P14 §6.10, hoặc đột xuất khi có thay đổi về pháp luật giao dịch điện tử, bảo vệ dữ liệu cá nhân hoặc khi mở nhóm dịch vụ số mới.

---

## VII. BIỂU MẪU ÁP DỤNG

| Mã biểu mẫu | Tên biểu mẫu | Nơi lưu bản gốc |
|---|---|---|
| **ETV.P.F 38.01** | Danh mục dịch vụ số và cam kết mức dịch vụ | `06_SHARED_RESOURCES/01_Forms/` |
| **ETV.P.F 38.02** | Phiếu đánh giá dịch vụ số trước khi công bố | `06_SHARED_RESOURCES/01_Forms/` |
| **ETV.P.F 38.03** | Phiếu sự cố dịch vụ số và nhật ký hỗ trợ người dùng | `06_SHARED_RESOURCES/01_Forms/` |

Phiếu khiếu nại dùng bộ biểu mẫu của **ETV.P12**; phiếu thay đổi dùng **F30.02**; bản ghi nền tảng dùng **F35.01**; phiếu sự cố nền tảng dùng **F35.03**; phiếu sự cố an toàn thông tin dùng **F28.03**; hồ sơ AIA dùng biểu mẫu của **ETV.P29**; điều khoản sử dụng là **tài liệu kiểm soát** ban hành theo ETV.P14 — **không** lập biểu mẫu mới ở thủ tục này (nguyên tắc một nơi duy nhất, ETV.P14).

---

## VIII. LƯU HỒ SƠ

Việc lập, lưu giữ, bảo quản, tra cứu, phân quyền truy cập và thanh lý hồ sơ thực hiện theo **ETV.P15 – Kiểm soát hồ sơ**; thời hạn lưu và phân quyền chi tiết theo **ETV.P.F 14.06**. Thủ tục này **không** quy định lại cơ chế lưu trữ, chỉ đăng ký hồ sơ phát sinh và thời hạn đề xuất.

| Hồ sơ | Người lưu | Thời hạn lưu đề xuất |
|---|---|---|
| Danh mục dịch vụ số (F38.01) và các phiên bản | QLCL | Vĩnh viễn trên ManLab |
| Phiếu đánh giá trước khi công bố (F38.02) kèm kết quả thử nghiệm giới hạn | QLCL | Suốt vòng đời dịch vụ + 05 năm |
| Phiếu sự cố dịch vụ (F38.03) | CSHDV, sao gửi QLCL | 05 năm sau khi đóng |
| Nhật ký hỗ trợ người dùng | CSHDV | 03 năm |
| Bằng chứng thông báo khách hàng (sự cố, gián đoạn, thay đổi, ngừng dịch vụ) | QLCL | 10 năm |
| Điều khoản sử dụng và các phiên bản | QLCL | Theo ETV.P14 |
| Số liệu mức dịch vụ theo tháng | ĐMKT, sao gửi QLCL | 03 năm |
| Kết quả khảo sát sự thoả mãn của khách hàng với dịch vụ số | QLCL | Theo ETV.P17 |
| Báo cáo dịch vụ số phục vụ xem xét của lãnh đạo | QLCL | Theo ETV.P17 |

---

## IX. CÁC PHỤ LỤC

### Phụ lục I — Ma trận kiểm soát rủi ro và điều kiện chặn cứng

*(Dẫn chiếu từ §6.1, §6.2, §6.3, §6.4, §6.5, §6.6, §6.7)*

**I.1. Điều kiện chặn cứng trước khi phê duyệt công bố dịch vụ**

Đủ **toàn bộ 12 điều kiện** tại §6.2.1. Thiếu bất kỳ điều kiện nào → hệ thống ManLab **từ chối** thao tác trình phê duyệt.

**I.2. Các tình huống bị chặn hoặc phải xử lý bắt buộc**

| Tình huống | Xử lý |
|---|---|
| Công bố dịch vụ khi **nền tảng vận hành chưa ở trạng thái Hiệu lực** | **Chặn thao tác** (ETV.P35 §6.7) |
| Dịch vụ không có **mức dịch vụ cam kết** hoặc không có **kênh thay thế** | **Chặn phê duyệt công bố** |
| Dịch vụ hiển thị **kết quả sai** cho khách hàng | Tạm ngừng chức năng **ngay**; chuyển ETV.P10, ETV.P11; báo cáo LĐV; thông báo khách hàng trong 04 giờ |
| **Truy cập chéo dữ liệu giữa các khách hàng** | Sự cố **mức Cao**; tạm ngừng ngay; xử lý theo ETV.P28; thông báo khách hàng và cân nhắc nghĩa vụ thông báo theo pháp luật |
| Cung cấp kết quả, chứng chỉ điện tử **không có chữ ký số** hoặc không xác thực được nguồn gốc | **Không chấp nhận** (Luật GDĐT 2023; ETV.P36) |
| Dịch vụ số **tự tạo, tự sửa, tự định dạng lại** nội dung kết quả | **Cấm tuyệt đối** — nội dung do ETV.P11 quyết định |
| Cam kết mức dịch vụ công bố ra ngoài **vượt năng lực thực tế** | **Không chấp nhận**; phải điều chỉnh cam kết hoặc nâng cấp năng lực trước khi công bố |
| Không đạt mức cam kết **02 tháng liên tiếp** | Bắt buộc mở KPH theo ETV.P13 |
| Sự cố dịch vụ lặp **≥ 03 lần trong 90 ngày** | Bắt buộc mở KPH theo ETV.P13 |
| Đóng phiếu sự cố có yếu tố lộ lọt dữ liệu trước khi **ETV.P28 kết luận** | **Chặn thao tác đóng** |
| Xử lý **khiếu nại** riêng trong kênh số thay vì chuyển ETV.P12 | **Không chấp nhận** |
| Ngừng dịch vụ khi còn **yêu cầu của khách hàng đang xử lý** chưa có phương án hoàn tất | **Chặn thao tác** |
| Ngừng dịch vụ mà **không thông báo khách hàng trước tối thiểu 30 ngày** | **Không chấp nhận** trừ trường hợp bất khả kháng có phê duyệt của LĐV |
| Dịch vụ có thành phần AI mà **chưa có hồ sơ AIA** theo ETV.P29 | **Chặn phê duyệt công bố** |
| Trợ lý AI **cung cấp kết quả đo, kết luận kỹ thuật hoặc diễn giải kết quả** cho khách hàng | **Cấm tuyệt đối** |
| Trợ lý AI trả lời khách hàng mà **không hiển thị rõ là trợ lý tự động** | **Không chấp nhận** |
| Chức năng đang phục vụ khách hàng mà **chưa đăng ký** và chưa qua đánh giá an toàn thông tin | **Tạm ngừng ngay** (§6.7) |
| Dịch vụ công bố thông tin năng lực **không nhất quán** với phạm vi đã công bố theo ETV.P21 | **Chặn công bố**; sửa trước khi mở |

### Phụ lục II — Bảng trạng thái và thẩm quyền thao tác

*(Dẫn chiếu từ §6.2.3, §6.4, §6.5)*

**II.1. Dịch vụ số (F38.01)**

| STT | Trạng thái | Ý nghĩa | Người thao tác | Bắt buộc lý do |
|---|---|---|---|---|
| 1 | Nháp | Đang thiết kế, chuẩn bị điều kiện | CSHDV | Không |
| 2 | Chờ đánh giá | Chờ đánh giá trước khi công bố (§6.2.1) | CSHDV | Không |
| 3 | Không đạt đánh giá | Bị trả lại để bổ sung | QLCL, PT.ATTT, QLKT | **Có** |
| 4 | Thử nghiệm giới hạn | Đang chạy với nhóm người dùng giới hạn | CSHDV, ĐMKT | Không |
| 5 | Chờ phê duyệt | Đã đủ điều kiện, chờ LĐV | QLCL | Không |
| 6 | Không phê duyệt | Bị từ chối công bố | LĐV | **Có** |
| 7 | Đang cung cấp | Đã công bố, đang phục vụ | LĐV (phê duyệt) · CSHDV (vận hành) | Không |
| 8 | Tạm ngừng | Ngừng tạm thời do sự cố hoặc bảo trì | CSHDV, QLCL · **LĐV** khi do sự cố mức Cao | **Có** |
| 9 | Đã ngừng | Chấm dứt cung cấp; **bản ghi vẫn giữ** để truy vết | **LĐV** | **Có** |
| 10 | Huỷ bản ghi | Khai báo sai hoặc trùng, bỏ trước khi công bố | QLCL | **Có** |

Cờ **Không đạt mức cam kết**, **Đến hạn rà soát**, **Có sự cố chưa đóng** không phải trạng thái hồ sơ mà là cảnh báo tính theo dữ liệu bản ghi.

**II.2. Các đối tượng khác**

| Đối tượng | Chuỗi trạng thái | Thẩm quyền kết thúc |
|---|---|---|
| Phiếu đánh giá trước khi công bố (F38.02) | Nháp → Chờ ý kiến chuyên môn → Chờ phê duyệt → Đạt / Không đạt | **LĐV** |
| Phiếu sự cố dịch vụ (F38.03 – phần sự cố) | Mới → Đang xử lý → Chờ thủ tục được định tuyến → Đã xử lý → Đã đóng / Huỷ | CSHDV (Đã đóng) · PT.ATTT *(khi có lộ lọt dữ liệu)* · LĐV (Huỷ) |
| Yêu cầu hỗ trợ (F38.03 – phần hỗ trợ) | Mới → Đang xử lý → Đã trả lời → Đã đóng / Chuyển khiếu nại (ETV.P12) | CSHDV · QLCL *(khi chuyển khiếu nại)* |

Mọi nhánh **Không đạt**, **Không phê duyệt**, **Tạm ngừng**, **Đã ngừng**, **Huỷ** bắt buộc ghi lý do.

---

*Thủ tục Quản lý dịch vụ số — ETV.P 38 — Lần BH: 01 — Trang tài liệu điện tử, không áp dụng đánh số trang thủ công (bản in xuất từ ManLab tự sinh header/footer theo ETV.P14 §6.4).*
