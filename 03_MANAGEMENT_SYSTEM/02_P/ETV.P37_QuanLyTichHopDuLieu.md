---
# Khối metadata AI — bắt buộc cho mọi văn bản kiểm soát (ETV.P14 §6.3)
id: ETV.P37
title: "Thủ tục Quản lý tích hợp dữ liệu"
type: Thu-tuc
owner: "Phụ trách Quản lý chất lượng (QLCL)"
department: "Toàn Viện"
process: MP37_TichHopDuLieu
capability: [CAP-28_ATTT, CAP-29_AIOffice]
module: M37_TichHopDuLieu
effective_date: ""
revision: "01"
status: Cho-soat-xet
keywords: [tích hợp dữ liệu, điểm tích hợp, hợp đồng dữ liệu, ánh xạ trường dữ liệu, đồng bộ, đối chiếu, ISO/IEC 17025 §7.11]
related_documents: [ETV.QM, ETV.P01, ETV.P02, ETV.P05, ETV.P06, ETV.P08, ETV.P10, ETV.P11, ETV.P13, ETV.P14, ETV.P15, ETV.P17, ETV.P27, ETV.P28, ETV.P29, ETV.P30, ETV.P31, ETV.P33, ETV.P34, ETV.P35, ETV.P38]
iso_clause: ["ISO 9001:2015 §7.5, §8.4", "ISO/IEC 17025:2017 §6.6, §7.11", "ISO 17034:2016 §7.4", "ISO/IEC 27001:2022 §8.1, A.5.14, A.5.19–A.5.22, A.8.20–A.8.22, A.8.26", "ISO/IEC 42001:2023 §8.1, §8.4"]
legal_basis: ["Luật Giao dịch điện tử 20/2023/QH15", "Nghị định 47/2020/NĐ-CP về quản lý, kết nối và chia sẻ dữ liệu số (áp dụng khi kết nối với hệ thống của cơ quan nhà nước)", "Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân"]
ai_tags: [integration-point, data-contract, reconciliation]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Vĩnh viễn (bản hiện hành) — xem chi tiết theo loại tại ETV.P.F 14.06"
digital_signature: "LĐV"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV)"
supersedes: null
superseded_by: null
---
# THỦ TỤC QUẢN LÝ TÍCH HỢP DỮ LIỆU

**Procedure For Data Integration Management**

|                   |                                          |
| ----------------- | ---------------------------------------- |
| **Mã số**         | ETV.P 37                                 |
| **Lần ban hành**  | 01                                       |
| **Ngày ban hành** | ..../..../........                       |
| **Biên soạn**     | Dương Thành Nam — ..../..../........     |
| **Soát xét**      | Đỗ Văn Vinh — Lãnh đạo Phòng, ..../..../........ |
| **Phê duyệt**     | Nguyễn Hoàng Giang — Lãnh đạo Viện, ..../..../........ |

> **Tình trạng bản này: CHỜ SOÁT XÉT** — dự thảo lần đầu, chưa có hiệu lực. Bản này chỉ được áp dụng sau khi Lãnh đạo Viện phê duyệt và chuyển trạng thái **Đã phê duyệt** theo ETV.P14.

> **Chú ý:** Tài liệu nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện Kiểm định Công nghệ và Môi trường.

> **Ghi chú soạn thảo.** Đặc tả module `M37_TichHopDuLieu` hiện mới ở dạng khung mẫu, chưa có nội dung chi tiết. Dự thảo này được xây dựng từ Sổ tay chất lượng §10.6 và từ các nghĩa vụ mà thủ tục đã ban hành, đã dự thảo giao cho MP37: `ETV.P35` mục 6.1.6 (hợp đồng dữ liệu và ánh xạ trường dữ liệu thuộc MP37), `ETV.P34` mục 6.5.2 (chia sẻ định kỳ tự động thiết lập thành điểm tích hợp) và mục 6.4.4 (sai lệch phát sinh từ tích hợp), `ETV.P27` (điểm tích hợp phụ thuộc trước khi huỷ tài sản). Các **giá trị định lượng** là **đề xuất**, cần Viện xác nhận trước khi ban hành.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian | Nội dung thay đổi | Lần ban hành |
| ---------- | ------------------- | -------------- |
| ..../..../........ | Ban hành lần thứ nhất. Thủ tục mới, hiện thực hoá Sổ tay chất lượng §10.6 và quy trình MP37 | 01 |

---

## I. MỤC ĐÍCH

Thủ tục này quy định nội dung, trách nhiệm và trình tự **đăng ký, thoả thuận hợp đồng dữ liệu, kiểm thử, mở kết nối, giám sát, đối chiếu, thay đổi và ngừng** các điểm tích hợp dữ liệu của Viện ETV, nhằm đáp ứng yêu cầu Điều 7.11 và 6.6 của ISO/IEC 17025:2017, Điều 7.4 của ISO 17034:2016, Điều 8.4 của ISO 9001:2015, các kiểm soát A.5.14, A.5.19–A.5.22, A.8.20–A.8.22 của ISO/IEC 27001:2022 và Mục 10.6 của Sổ tay chất lượng. Cụ thể để:

1. Bảo đảm **không có kết nối ngoài đăng ký** — mọi luồng dữ liệu tự động vào hoặc ra khỏi hệ thống của Viện đều có bản ghi, có chủ sở hữu và có phê duyệt.
2. Bảo đảm mỗi kết nối có **hợp đồng dữ liệu** rõ ràng: dữ liệu nào, ánh xạ trường ra sao, tần suất, khối lượng, ai chịu trách nhiệm khi sai.
3. Bảo đảm dữ liệu **không bị biến dạng khi đi qua kết nối** — mọi biến đổi, chuyển đổi đơn vị, làm tròn đều được khai báo và kiểm chứng trước khi mở kết nối.
4. Bảo đảm **phát hiện sớm sai lệch đồng bộ** bằng đối chiếu định kỳ, thay vì phát hiện khi kết quả đã ra ngoài.
5. Bảo đảm dữ liệu đo thu thập tự động từ thiết bị **giữ nguyên giá trị gốc** và không làm mất hiệu lực kết quả.
6. Bảo đảm kết nối ra ngoài Viện tuân thủ nghĩa vụ bảo mật, quy định về dữ liệu cá nhân và điều kiện kỹ thuật của bên nhận.
7. Bảo đảm **ngừng kết nối có kiểm soát**, không để dữ liệu treo hoặc hệ thống phụ thuộc bị hỏng âm thầm.

Áp dụng thống nhất trong toàn Viện ETV, thực hiện qua phần mềm ManLab (Module M37 – Quản lý tích hợp dữ liệu).

---

## II. PHẠM VI ÁP DỤNG

### 2.1. Đối tượng áp dụng

Áp dụng cho toàn bộ đơn vị, phòng ban, cá nhân thuộc Viện ETV và cho **mọi điểm tích hợp dữ liệu**:

| TT | Nhóm điểm tích hợp | Ví dụ |
|---|---|---|
| 1 | Giữa các module trong ManLab | Đồng bộ danh mục khách hàng, thiết bị, phương pháp giữa các module |
| 2 | Giữa ManLab và hệ thống nội bộ khác | Kế toán, quản lý văn bản, thư điện tử |
| 3 | **Thiết bị đo và hệ thống thu thập dữ liệu** | Truyền dữ liệu đo tự động từ thiết bị, phần mềm điều khiển vào ManLab |
| 4 | Phần mềm chuyên ngành | Phần mềm tính toán, phần mềm xử lý phổ, phần mềm hiệu chuẩn của hãng |
| 5 | Với hệ thống của cơ quan quản lý nhà nước, tổ chức công nhận | Cổng dữ liệu của cơ quan quản lý, VI-CONNECT |
| 6 | Với khách hàng và đối tác | Trao đổi đơn hàng, kết quả, dữ liệu mẫu theo lô |
| 7 | Với dịch vụ bên thứ ba | Dịch vụ lưu trữ, dịch vụ ký số, dịch vụ mô hình trí tuệ nhân tạo |
| 8 | Nhập, xuất dữ liệu theo tệp có tính lặp lại | Nhập tệp kết quả định kỳ, xuất báo cáo định kỳ cho bên ngoài |

Dữ liệu được quản lý thống nhất trên phần mềm ManLab (Module M37 – Quản lý tích hợp dữ liệu).

### 2.2. Nguyên tắc áp dụng

**Nguyên tắc 1 — Không có kết nối ngoài đăng ký.** Mọi luồng dữ liệu tự động hoặc lặp lại đều phải có bản ghi điểm tích hợp được phê duyệt trước khi mở. Trao đổi dữ liệu **một lần, thủ công** không thuộc thủ tục này mà theo `ETV.P34` §6.5; nhưng khi việc trao đổi đó **lặp lại từ lần thứ ba trở lên hoặc theo lịch**, bắt buộc chuyển thành điểm tích hợp.

**Nguyên tắc 2 — Hợp đồng dữ liệu là cam kết hai chiều.** Hợp đồng dữ liệu không phải tài liệu kỹ thuật một phía: phải nêu rõ bên gửi cam kết gì (nội dung, tần suất, chất lượng), bên nhận cam kết gì (xử lý, phản hồi lỗi, bảo mật) và ai chịu trách nhiệm khi dữ liệu sai.

**Nguyên tắc 3 — Đồng bộ sai một chiều tệ hơn không đồng bộ.** Mỗi điểm tích hợp phải có cơ chế **đối chiếu định kỳ** và cách xử lý khi phát hiện lệch. Kết nối không có đối chiếu **không được phê duyệt**.

### 2.3. Ngoài phạm vi

Thủ tục này **không** thay thế và **không** trùng lặp với:

| Nội dung | Thuộc thủ tục |
|---|---|
| Đăng ký, đánh giá trước vận hành và ngừng vận hành **nền tảng số** | ETV.P35 – Quản lý nền tảng số |
| Hạ tầng, máy chủ, mạng, thiết bị đầu cuối | ETV.P33 – Quản lý hệ thống thông tin |
| Kiểm kê tài sản thông tin, phân loại, sao lưu, huỷ dữ liệu | ETV.P27 – Quản trị dữ liệu và tài sản thông tin |
| **Chất lượng dữ liệu**, từ điển dữ liệu, dữ liệu chủ, phê duyệt chia sẻ từng lần | ETV.P34 – Quản lý dữ liệu số |
| Biện pháp kỹ thuật an toàn thông tin, bí mật xác thực, sự cố an toàn thông tin | ETV.P28 – Quản lý an toàn thông tin |
| Dịch vụ số cung cấp cho khách hàng qua kết nối | ETV.P38 – Quản lý dịch vụ số |
| Tác tử, công cụ, lời nhắc và đánh giá tác động AI | ETV.P29 – Quản lý hệ thống trí tuệ nhân tạo |
| Phê duyệt thay đổi và đánh giá tác động thay đổi | ETV.P30 – Quản lý thay đổi |
| Hiệu chuẩn, kiểm định và vòng đời **thiết bị đo** | ETV.P05 – Quản lý thiết bị |
| Xác nhận giá trị sử dụng phương pháp, kết luận về hiệu lực kết quả đo | ETV.P08 · ETV.P10 · ETV.P11 |
| Đánh giá và lựa chọn nhà cung cấp dịch vụ kết nối | ETV.P06 – Quản lý mua sắm |
| Khôi phục khi gián đoạn kết nối kéo dài | ETV.P31 – Quản lý tính liên tục hoạt động |
| Nghĩa vụ bảo mật với khách hàng, phê duyệt công bố thông tin | ETV.P02 – Bảo mật |
| Lưu trữ hồ sơ phát sinh | ETV.P15 – Kiểm soát hồ sơ |

> **Phân biệt cốt lõi:** ETV.P35 trả lời *"hệ thống nào đang chạy"*; **ETV.P37** trả lời *"dữ liệu chảy giữa chúng theo cam kết nào, có đúng không"*; ETV.P34 trả lời *"dữ liệu có đạt chất lượng không, ai được dùng"*; ETV.P28 trả lời *"kết nối được bảo vệ thế nào"*.

---

## III. TÀI LIỆU VIỆN DẪN

> Nguyên tắc: **chỉ dẫn chiếu, không chép lại nội dung.** Bản đầy đủ đặt tại `03_MANAGEMENT_SYSTEM/` (chuẩn mực) và `08_KNOWLEDGE_GRAPH/01_Regulations/` (pháp luật). QLCL rà soát hiệu lực và văn bản thay thế trước mỗi lần ban hành lại.

### 3.1. Tiêu chuẩn

- ISO 9001:2015 §7.5; §8.4 (Kiểm soát quá trình, sản phẩm, dịch vụ do bên ngoài cung cấp)
- ISO/IEC 17025:2017 §6.6 (Sản phẩm và dịch vụ do bên ngoài cung cấp); §7.11 (Kiểm soát dữ liệu và quản lý thông tin — đặc biệt yêu cầu về hệ thống truyền, xử lý dữ liệu tự động)
- ISO 17034:2016 §7.4 (Kiểm soát dữ liệu)
- ISO/IEC 27001:2022 §8.1; A.5.14 (Truyền nhận thông tin); A.5.19–A.5.22 (An toàn thông tin trong quan hệ nhà cung cấp); A.8.20–A.8.22 (An toàn mạng, dịch vụ mạng, phân tách mạng); A.8.26 (Yêu cầu an toàn cho ứng dụng)
- ISO/IEC 42001:2023 §8.1; §8.4 — khi điểm tích hợp phục vụ hệ thống trí tuệ nhân tạo
- `11_COMPLIANCE/01_ISO_Mapping/MP-ISO-mapping.md` — bảng ánh xạ đầy đủ MP ↔ điều khoản

### 3.2. Văn bản pháp luật

- Luật Giao dịch điện tử số 20/2023/QH15 — giá trị pháp lý của thông điệp dữ liệu trao đổi qua kết nối
- **Nghị định 47/2020/NĐ-CP** về quản lý, kết nối và chia sẻ dữ liệu số — **áp dụng khi Viện kết nối với hệ thống của cơ quan nhà nước**; Viện tuân thủ yêu cầu kỹ thuật và thủ tục do cơ quan chủ quản hệ thống đó quy định
- **Nghị định 13/2023/NĐ-CP** về bảo vệ dữ liệu cá nhân — khi luồng dữ liệu có chứa dữ liệu cá nhân
- Pháp luật hiện hành về **an toàn thông tin mạng**

### 3.3. Văn bản nội bộ Viện ETV

- Sổ tay quản lý chất lượng (ETV.QM) §10.6 và §7.11
- ETV.P01 – Quản lý rủi ro và cơ hội · ETV.P02 – Bảo mật · ETV.P05 – Quản lý thiết bị · ETV.P06 – Quản lý mua sắm
- ETV.P08 – Phương pháp · ETV.P10 – Đảm bảo giá trị sử dụng kết quả · ETV.P11 – Báo cáo kết quả · ETV.P13 – Khắc phục, cải tiến
- ETV.P14 – Kiểm soát tài liệu · ETV.P15 – Kiểm soát hồ sơ · ETV.P17 – Xem xét của lãnh đạo
- ETV.P27 – Quản trị dữ liệu và tài sản thông tin · ETV.P28 – Quản lý an toàn thông tin · ETV.P29 – Quản lý hệ thống trí tuệ nhân tạo
- ETV.P30 – Quản lý thay đổi · ETV.P31 – Quản lý tính liên tục hoạt động · ETV.P33 – Quản lý hệ thống thông tin
- ETV.P34 – Quản lý dữ liệu số · ETV.P35 – Quản lý nền tảng số · ETV.P38 – Quản lý dịch vụ số

---

## IV. THUẬT NGỮ, ĐỊNH NGHĨA VÀ CHỮ VIẾT TẮT

### 4.1. Thuật ngữ và định nghĩa

| Thuật ngữ | Định nghĩa |
|---|---|
| **Tích hợp dữ liệu** | Việc kết nối hai hệ thống để dữ liệu được truyền, đồng bộ hoặc chia sẻ tự động hoặc theo lịch, không phải nhập tay từng lần |
| **Điểm tích hợp** | Một kết nối cụ thể giữa hệ thống của Viện và một hệ thống khác, được kiểm kê thành **một bản ghi**, có mã, chủ sở hữu, hướng dữ liệu, hợp đồng dữ liệu và cơ chế đối chiếu |
| **Hệ thống nguồn / hệ thống đích** | Hệ thống phát sinh dữ liệu / hệ thống tiếp nhận dữ liệu tại một điểm tích hợp |
| **Hướng dữ liệu** | Chiều truyền: **Đi** (từ Viện ra), **Đến** (từ ngoài vào), **Hai chiều** |
| **Hợp đồng dữ liệu** (data contract) | Thoả thuận giữa hai bên về: tập trường dữ liệu, ý nghĩa và kiểu của từng trường, quy tắc bắt buộc, tần suất, khối lượng dự kiến, cam kết chất lượng và cách xử lý khi lỗi |
| **Ánh xạ trường dữ liệu** | Bảng tương ứng giữa trường ở hệ thống nguồn và trường ở hệ thống đích, kèm quy tắc chuyển đổi (đơn vị, định dạng, làm tròn, giá trị mặc định) |
| **Đối chiếu** (reconciliation) | Việc so sánh dữ liệu giữa hai đầu của điểm tích hợp theo chu kỳ để phát hiện thiếu, thừa, lệch giá trị |
| **Hàng đợi lỗi** | Nơi lưu các bản ghi không truyền hoặc không xử lý được, chờ xử lý lại; **không được xoá** khi chưa xử lý |
| **Kết nối một chiều đọc** | Điểm tích hợp mà Viện chỉ đọc dữ liệu từ hệ thống khác, không ghi ngược lại |
| **Thay đổi phá vỡ tương thích** (breaking change) | Thay đổi hợp đồng dữ liệu làm hệ thống đầu kia ngừng hoạt động đúng nếu không sửa theo: bỏ trường, đổi kiểu, đổi ý nghĩa, đổi đơn vị |
| **Tạm ngừng kết nối** | Việc dừng truyền dữ liệu tại một điểm tích hợp mà không xoá bản ghi, nhằm ngăn dữ liệu sai lan tiếp |
| **Bí mật xác thực** | Khoá API, mật khẩu, chứng thư số dùng cho kết nối; quản lý theo ETV.P28, **không** lưu trong bản ghi điểm tích hợp |

### 4.2. Chữ viết tắt

| Chữ viết tắt | Ý nghĩa |
|---|---|
| ETV | Viện Kiểm định Công nghệ và Môi trường |
| HTQL | Hệ thống quản lý |
| LĐV | Lãnh đạo Viện |
| LĐP / TP | Lãnh đạo Phòng / Trưởng phòng, người phụ trách lĩnh vực |
| NTH | Người thực hiện |
| QLCL | Phụ trách Quản lý chất lượng |
| QLKT | Phụ trách Quản lý kỹ thuật |
| CSHTH | Chủ sở hữu điểm tích hợp |
| ĐMKT | Đầu mối kỹ thuật |
| QTHT | Quản trị hệ thống |
| PT.ATTT | Người phụ trách an toàn thông tin |
| CSHDL | Chủ sở hữu dữ liệu (theo ETV.P34) |
| KPH | Sự không phù hợp và hành động khắc phục (theo ETV.P13) |
| ManLab | Nền tảng số hợp nhất của Viện (ManLab AIOS) |
| RACI | Responsible – Accountable – Consulted – Informed |

---

## V. VAI TRÒ VÀ TRÁCH NHIỆM (RACI)

### 5.1. Ma trận RACI

| Bước trong vòng đời điểm tích hợp | NTH | CSHTH | ĐMKT | CSHDL | PT.ATTT | QLCL | LĐV |
|---|---|---|---|---|---|---|---|
| Đề xuất mở điểm tích hợp | **R** | **R** | C | C | I | C | I |
| Lập bản ghi điểm tích hợp (F37.01) | I | **R/A** | **R** | C | I | C | I |
| Thoả thuận **hợp đồng dữ liệu** và ánh xạ trường (F37.02) | I | **A** | **R** | **R** | C | C | I |
| Xác nhận dữ liệu được phép chia sẻ và mức phân loại | I | C | I | **R/A** | **A** | C | I |
| Đánh giá an toàn thông tin của kết nối | I | C | C | I | **R/A** | C | I |
| Kiểm thử và đối chiếu trước khi mở kết nối | I | **A** | **R** | **R** | C | C | I |
| Phê duyệt mở kết nối **nội bộ** | I | **R** | C | C | C | **R/A** | I |
| Phê duyệt mở kết nối **ra ngoài Viện** | I | **R** | C | C | **R** | C | **R/A** |
| Vận hành, giám sát đồng bộ, xử lý hàng đợi lỗi | I | A | **R/A** | C | I | I | I |
| **Đối chiếu định kỳ** và lập báo cáo đối chiếu | I | **A** | **R** | **R** | I | C | I |
| Xử lý sự cố tích hợp; quyết định **tạm ngừng kết nối** | I | **R** | **R** | C | C | **A** | C |
| Thay đổi hợp đồng dữ liệu (không phá vỡ tương thích) | I | **R/A** | **R** | C | C | C | I |
| Thay đổi **phá vỡ tương thích** | I | **R** | C | C | C | C | **R/A** |
| Rà soát định kỳ điểm tích hợp | I | **R/A** | C | C | C | **R** | I |
| Ngừng kết nối | I | **R** | **R** | C | C | **A** | **A** |
| Tổng hợp báo cáo phục vụ xem xét của lãnh đạo | I | C | C | C | C | **R/A** | I |

> LĐV luôn là **A** cuối cùng đối với **kết nối ra ngoài Viện**, **thay đổi phá vỡ tương thích** và **ngừng kết nối có ảnh hưởng bên ngoài** — không uỷ quyền.

### 5.2. Trách nhiệm cụ thể

**Lãnh đạo Viện (LĐV):** Phê duyệt mở, thay đổi phá vỡ tương thích và ngừng các điểm tích hợp **ra ngoài Viện**; quyết định khi kết nối gặp sự cố ảnh hưởng nghĩa vụ với khách hàng hoặc cơ quan quản lý; xem xét tình hình tích hợp dữ liệu trong cuộc họp xem xét của lãnh đạo (ETV.P17).

**Chủ sở hữu điểm tích hợp (CSHTH):** Là lãnh đạo đơn vị có nhu cầu nghiệp vụ về luồng dữ liệu; chịu trách nhiệm về **lý do nghiệp vụ** của kết nối, nội dung hợp đồng dữ liệu, việc đối chiếu định kỳ được thực hiện và kết quả đối chiếu được xử lý; đề nghị thay đổi hoặc ngừng khi không còn nhu cầu.

**Đầu mối kỹ thuật (ĐMKT):** Thiết lập, cấu hình kết nối và ánh xạ trường; thực hiện kiểm thử trước khi mở; theo dõi nhật ký đồng bộ và hàng đợi lỗi; thực hiện đối chiếu theo chu kỳ; xử lý sự cố kỹ thuật; **từ chối** mở hoặc sửa kết nối khi chưa có phê duyệt.

**Chủ sở hữu dữ liệu (CSHDL — theo ETV.P34):** Xác nhận dữ liệu được phép truyền qua điểm tích hợp, phạm vi trường dữ liệu và mức phân loại; xác nhận kết quả đối chiếu về mặt nghiệp vụ; quyết định xử lý khi phát hiện lệch dữ liệu.

**Người phụ trách an toàn thông tin (PT.ATTT):** Đánh giá phương thức xác thực, mã hoá đường truyền, phạm vi quyền của tài khoản kết nối; cho ý kiến bắt buộc với mọi kết nối ra ngoài Viện và với luồng chứa dữ liệu cá nhân; xác nhận nơi lưu bí mật xác thực theo ETV.P28.

**Phụ trách Quản lý chất lượng (QLCL):** Quản trị danh mục điểm tích hợp; phê duyệt kết nối nội bộ; theo dõi điểm tích hợp **quá hạn đối chiếu**, **đang tạm ngừng**, **đến hạn rà soát**; mở KPH theo ETV.P13 khi sai lệch lặp lại hoặc dữ liệu sai đã lan ra ngoài; lưu hồ sơ theo ETV.P15.

**Người thực hiện (NTH):** Không tự thiết lập kết nối tự động, không tự viết kịch bản đồng bộ dữ liệu ngoài phạm vi được giao; báo ngay khi phát hiện dữ liệu giữa hai hệ thống không khớp.

### 5.3. Nguyên tắc tách vai trò và giới hạn của AI

- Người đề xuất ≠ người phê duyệt. Người thiết lập kết nối ≠ người phê duyệt mở kết nối.
- Người thực hiện đối chiếu ≠ người xác nhận kết quả đối chiếu về mặt nghiệp vụ (CSHDL).
- Trợ lý AI được phép **phát hiện** kết nối chưa đăng ký, **nhắc** hạn đối chiếu và hạn rà soát, **gợi ý** ánh xạ trường dữ liệu, **phân tích** nhật ký lỗi và tổng hợp báo cáo đối chiếu. Trợ lý AI **không** phê duyệt mở, thay đổi hay ngừng kết nối, **không** tự sửa ánh xạ trên môi trường vận hành, **không** tự xử lý hàng đợi lỗi bằng cách sửa dữ liệu và **không** kết luận về nguyên nhân sai lệch (ISO/IEC 42001; ETV.P29).

---

## VI. NỘI DUNG / QUY TRÌNH THỰC HIỆN

### 6.1. Danh mục điểm tích hợp (Biểu mẫu F37.01)

#### 6.1.1. Nội dung tối thiểu của một bản ghi

| Nhóm | Trường bắt buộc |
|---|---|
| Nhận dạng | Mã điểm tích hợp; tên gọi; nhóm (§2.1); mục đích nghiệp vụ |
| Hai đầu kết nối | Hệ thống nguồn và hệ thống đích, kèm mã nền tảng (ETV.P35) hoặc mã tài sản hạ tầng (ETV.P33); tổ chức đối tác (nếu ra ngoài) |
| Luồng dữ liệu | Hướng dữ liệu; phương thức (API, tệp, cơ sở dữ liệu, hàng đợi); tần suất; khối lượng dự kiến; giờ chạy |
| Dữ liệu | Tập dữ liệu liên quan (ETV.P34); tài sản thông tin (ETV.P27); **mức phân loại cao nhất**; có chứa dữ liệu cá nhân hay không |
| Trách nhiệm | Chủ sở hữu điểm tích hợp; đầu mối kỹ thuật; đầu mối phía đối tác |
| Bảo mật | Phương thức xác thực; mã hoá đường truyền; **nơi lưu bí mật xác thực** (không ghi giá trị) |
| Kiểm soát | Cơ chế và chu kỳ **đối chiếu**; cách xử lý lỗi; hàng đợi lỗi; cảnh báo khi ngừng đồng bộ |
| Vòng đời | Ngày mở kết nối; chu kỳ rà soát; trạng thái; phiên bản hợp đồng dữ liệu đang áp dụng |

**Nghiêm cấm** ghi khoá API, mật khẩu, chứng thư số vào bản ghi điểm tích hợp (nguyên tắc thống nhất với ETV.P35 §2.2 và ETV.P33).

#### 6.1.2. Mã điểm tích hợp

Mã do QLCL cấp, **duy nhất toàn hệ thống**, dạng `TH-<năm>-<số thứ tự>`, cấp một lần và không thay đổi; không cấp lại mã của điểm tích hợp đã ngừng.

#### 6.1.3. Phân mức điểm tích hợp

| Mức | Tiêu chí (thỏa mãn **bất kỳ**) | Thẩm quyền phê duyệt mở |
|---|---|---|
| **Mức 1 — Nội bộ** | Chỉ giữa các module, hệ thống trong Viện; dữ liệu mức Nội bộ trở xuống | QLCL |
| **Mức 2 — Nội bộ trọng yếu** | Truyền dữ liệu đo, hồ sơ kỹ thuật, dữ liệu khách hàng giữa các hệ thống trong Viện; hoặc dữ liệu mức Hạn chế | QLCL, có ý kiến PT.ATTT |
| **Mức 3 — Ra ngoài Viện** | Có một đầu nằm ngoài Viện; hoặc truyền dữ liệu mức **Mật**; hoặc có dữ liệu cá nhân; hoặc phục vụ nghĩa vụ báo cáo với cơ quan quản lý, tổ chức công nhận | **LĐV**, có ý kiến PT.ATTT và CSHDL |

Khi nghi ngờ giữa hai mức, **áp mức cao hơn**.

### 6.2. Hợp đồng dữ liệu và ánh xạ trường (Biểu mẫu F37.02)

#### 6.2.1. Nội dung bắt buộc

| Nhóm | Nội dung |
|---|---|
| Phạm vi | Tập bản ghi được truyền; điều kiện lọc; dữ liệu **không** được truyền |
| Ánh xạ trường | Trường nguồn → trường đích; kiểu; **đơn vị đo**; định dạng; quy tắc chuyển đổi, làm tròn; giá trị mặc định; trường bắt buộc |
| Quy tắc hợp lệ | Miền giá trị cho phép; quy tắc kiểm tra tại đầu nhận; hành vi khi bản ghi không hợp lệ (từ chối, đưa vào hàng đợi lỗi, cảnh báo) |
| Định danh | Khoá định danh bản ghi để tránh trùng và để đối chiếu |
| Tần suất và khối lượng | Lịch chạy; khối lượng bình thường và ngưỡng bất thường |
| Cam kết chất lượng | Độ trễ tối đa chấp nhận được; tỷ lệ lỗi tối đa; chiều chất lượng áp dụng theo ETV.P34 §6.4 |
| Trách nhiệm khi sai | Bên nào sửa dữ liệu nguồn; bên nào truyền lại; thời hạn xử lý |
| Phiên bản | Số phiên bản hợp đồng; ngày hiệu lực; phiên bản thay thế |

Ánh xạ trường phải nhất quán với **từ điển dữ liệu** của tập dữ liệu tương ứng tại ETV.P34 §6.1.2; nếu lệch, phải sửa một trong hai trước khi mở kết nối — **không** để hai định nghĩa cùng tồn tại.

#### 6.2.2. Chuyển đổi đơn vị và làm tròn

Mọi phép chuyển đổi đơn vị, đổi hệ đo, làm tròn hoặc suy diễn giá trị tại điểm tích hợp phải được **khai báo tường minh** trong hợp đồng dữ liệu và **kiểm chứng bằng bộ dữ liệu mẫu** trước khi mở kết nối. **Nghiêm cấm** thực hiện chuyển đổi ngầm không khai báo — đây là nguyên nhân điển hình làm sai lệch dữ liệu đo mà không ai phát hiện.

### 6.3. Mở điểm tích hợp

#### 6.3.1. Trình tự thực hiện

| Bước | Nội dung thực hiện | Trách nhiệm | Biểu mẫu |
|---|---|---|---|
| 1 | Đề xuất, nêu nhu cầu nghiệp vụ và hai đầu kết nối; lập bản ghi (trạng thái **Nháp**) | CSHTH, ĐMKT | `ETV.P.F 37.01` |
| 2 | Thoả thuận **hợp đồng dữ liệu** và ánh xạ trường với bên còn lại | ĐMKT, CSHDL | `ETV.P.F 37.02` |
| 3 | Xác nhận dữ liệu được phép truyền, phạm vi trường và mức phân loại | CSHDL, PT.ATTT | `ETV.P.F 37.01` |
| 4 | Đánh giá an toàn thông tin: xác thực, mã hoá, phạm vi quyền của tài khoản kết nối, nơi lưu bí mật xác thực (ETV.P28) | PT.ATTT | `ETV.P.F 37.01` |
| 5 | **Kiểm thử trên môi trường tách biệt** với bộ dữ liệu mẫu; đối chiếu kết quả với kỳ vọng; ghi biên bản kiểm thử | ĐMKT, CSHDL | `ETV.P.F 37.02` |
| 6 | Mở phiếu thay đổi theo **ETV.P30** nếu kết nối chạm hệ thống đang vận hành; cập nhật bản ghi nền tảng theo **ETV.P35** | ĐMKT | `F 30.02`, `F 35.01` |
| 7 | Phê duyệt mở kết nối theo mức (§6.1.3); không đạt → **Không phê duyệt** (bắt buộc ghi lý do) | QLCL (Mức 1, 2) · **LĐV** (Mức 3) | `ETV.P.F 37.01` |
| 8 | Mở kết nối; **chạy song song hoặc chạy giới hạn** trong kỳ đầu (§6.3.2); bật giám sát và cảnh báo | ĐMKT, QTHT | `ETV.P.F 37.01` |
| 9 | Kết thúc kỳ theo dõi ban đầu: đối chiếu toàn bộ, kết luận đạt → chuyển **Hiệu lực** | CSHTH, CSHDL | `ETV.P.F 37.02` |

#### 6.3.2. Kỳ theo dõi ban đầu

Điểm tích hợp Mức 2 và Mức 3 phải qua **kỳ theo dõi ban đầu tối thiểu 30 ngày** (hoặc tối thiểu 03 chu kỳ đồng bộ đối với luồng tần suất thấp), trong đó: đối chiếu **100%** bản ghi giữa hai đầu; giữ nguyên phương thức cũ nếu kết nối thay thế một cách làm đang chạy; ghi nhận toàn bộ lỗi và thời gian xử lý. Kết nối **không** được coi là Hiệu lực trước khi kết thúc kỳ này với kết luận đạt.

### 6.4. Vận hành, giám sát và đối chiếu

#### 6.4.1. Giám sát

Mỗi điểm tích hợp phải có: nhật ký đồng bộ ghi thời điểm, khối lượng, kết quả từng lần chạy · cảnh báo tự động khi **không chạy đúng lịch**, khi khối lượng vượt ngưỡng bất thường hoặc khi tỷ lệ lỗi vượt cam kết · hàng đợi lỗi có người phụ trách xử lý.

Bản ghi trong **hàng đợi lỗi không được xoá** khi chưa xử lý; xoá bản ghi lỗi mà không xử lý là hành vi che giấu sai lệch, xử lý theo ETV.P13.

#### 6.4.2. Đối chiếu định kỳ

| Mức điểm tích hợp | Chu kỳ đối chiếu tối thiểu | Phạm vi |
|---|---|---|
| **Mức 3** — ra ngoài Viện | **01 tháng/lần** | Toàn bộ hoặc mẫu đại diện có ý nghĩa thống kê |
| **Mức 2** — nội bộ trọng yếu | 03 tháng/lần | Toàn bộ hoặc mẫu đại diện |
| **Mức 1** — nội bộ | 06 tháng/lần | Mẫu đại diện |

Nội dung đối chiếu: số lượng bản ghi hai đầu · giá trị các trường trọng yếu · bản ghi thiếu, thừa, trùng · độ trễ thực tế so với cam kết. Người **thực hiện** đối chiếu ≠ người **xác nhận** kết quả về mặt nghiệp vụ.

#### 6.4.3. Xử lý khi phát hiện lệch

| Tình huống | Xử lý |
|---|---|
| Lệch nhỏ, không ảnh hưởng kết quả đã phát hành | Sửa tại **nguồn**, truyền lại; ghi vào báo cáo đối chiếu; theo dõi ở kỳ kế tiếp |
| Lệch lặp lại **02 kỳ liên tiếp** hoặc do lỗi ánh xạ | **Tạm ngừng kết nối**; sửa hợp đồng dữ liệu theo §6.5; mở KPH theo ETV.P13 |
| Lệch ảnh hưởng **dữ liệu đo, hồ sơ kỹ thuật, kết quả đã phát hành** | **Tạm ngừng kết nối ngay**; chuyển **ETV.P10, ETV.P11** kết luận về hiệu lực kết quả; báo cáo LĐV |
| Dữ liệu sai **đã truyền ra ngoài Viện** | Thông báo bên nhận trong **24 giờ**; phối hợp thu hồi, đính chính; báo cáo LĐV; mở KPH theo ETV.P13 |
| Lệch do bên đối tác thay đổi mà không thông báo | Tạm ngừng kết nối; làm việc lại về hợp đồng dữ liệu; xem xét theo ETV.P06 nếu là nhà cung cấp |
| Nghi ngờ nguyên nhân an toàn thông tin | Xử lý đồng thời theo **ETV.P28**; không đóng sự cố tích hợp trước khi ETV.P28 kết luận |

### 6.5. Thay đổi và ngừng điểm tích hợp

#### 6.5.1. Thay đổi hợp đồng dữ liệu

| Loại thay đổi | Ví dụ | Yêu cầu |
|---|---|---|
| **Không phá vỡ tương thích** | Thêm trường tuỳ chọn, mở rộng miền giá trị, tăng tần suất trong ngưỡng | CSHTH phê duyệt; tăng phiên bản hợp đồng; thông báo đầu kia trước khi áp dụng |
| **Phá vỡ tương thích** | Bỏ trường, đổi kiểu, **đổi đơn vị đo**, đổi ý nghĩa trường, đổi khoá định danh | Phiên bản mới của hợp đồng; **kiểm thử lại**; phiếu thay đổi theo ETV.P30; **LĐV phê duyệt** với Mức 3; thoả thuận thời điểm chuyển đổi với đầu kia |
| Thay đổi phương thức xác thực, địa chỉ kết nối | Đổi khoá, đổi điểm cuối API | Ghi nhật ký thay đổi; cập nhật bản ghi nền tảng theo ETV.P35 §6.4 |

**Nghiêm cấm** áp dụng thay đổi phá vỡ tương thích mà không thông báo trước cho đầu còn lại và không có phương án quay lui.

#### 6.5.2. Ngừng điểm tích hợp

| Bước | Nội dung thực hiện | Trách nhiệm |
|---|---|---|
| 1 | Đề nghị ngừng: lý do, phương án thay thế, dữ liệu còn phải chuyển nốt | CSHTH |
| 2 | Kiểm tra **đối tượng còn phụ thuộc**: báo cáo, dịch vụ số (ETV.P38), tác tử AI (ETV.P29), tập dữ liệu (ETV.P34) đang dùng luồng này | QLCL, ĐMKT |
| 3 | Xử lý **hàng đợi lỗi còn tồn**; đối chiếu lần cuối; chốt số liệu hai đầu | ĐMKT, CSHDL |
| 4 | Thông báo đầu còn lại và thoả thuận thời điểm ngừng (bắt buộc với Mức 3) | CSHTH |
| 5 | Phê duyệt ngừng | QLCL (Mức 1, 2) · **LĐV** (Mức 3) |
| 6 | Thu hồi tài khoản, khoá kết nối, bí mật xác thực (ETV.P28); chuyển bản ghi sang **Đã ngừng**; lưu hồ sơ theo ETV.P15 | ĐMKT, QTHT, QLCL |

Bản ghi điểm tích hợp đã ngừng **vẫn được giữ** để truy vết dữ liệu lịch sử.

### 6.6. Tích hợp với thiết bị đo và hệ thống thu thập dữ liệu

Đây là **nhóm đặc thù**, áp dụng bổ sung:

- Dữ liệu đo thu thập tự động phải giữ **giá trị gốc** như thiết bị sinh ra; mọi biến đổi (đổi đơn vị, làm tròn, hiệu chính) phải khai báo trong hợp đồng dữ liệu và **không được ghi đè giá trị gốc** (ETV.P34 §6.3.1).
- Việc thiết lập, thay đổi kết nối tới máy tính điều khiển, thu thập dữ liệu của thiết bị đo thực hiện theo **ETV.P33 §6.3.4**: bắt buộc có phiếu thay đổi ETV.P30 và **đánh giá ảnh hưởng tới hiệu lực kết quả đo** theo ETV.P10 trước khi áp dụng.
- Trước khi đưa vào sử dụng chính thức, phải **đối chiếu dữ liệu truyền tự động với giá trị đọc trực tiếp trên thiết bị** trên một bộ mẫu đại diện; kết quả lưu cùng hồ sơ kiểm thử.
- Kết nối tới thiết bị đo phải nằm trong **vùng mạng dành cho thiết bị đo** theo ETV.P28 mục 6.7.3.

### 6.7. Kết nối ra ngoài Viện

- Kết nối với **hệ thống của cơ quan nhà nước** tuân thủ yêu cầu kỹ thuật, thủ tục đăng ký và quy định chia sẻ dữ liệu của cơ quan chủ quản hệ thống đó; hồ sơ đăng ký lưu kèm bản ghi điểm tích hợp.
- Kết nối với **nhà cung cấp, đối tác** phải có thoả thuận bằng văn bản gồm: phạm vi dữ liệu, nghĩa vụ bảo mật, nghĩa vụ thông báo sự cố, quyền kiểm tra của Viện, trả lại hoặc xoá dữ liệu khi kết thúc (ETV.P28 mục 6.7.7; đánh giá nhà cung cấp theo ETV.P06).
- Luồng có **dữ liệu cá nhân** phải ghi căn cứ pháp lý, mục đích và biện pháp giảm thiểu (ẩn danh, giới hạn trường) theo ETV.P27 §6.4 và ETV.P34.
- Dữ liệu mức **Hạn chế, Mật** chỉ được truyền qua kênh có mã hoá và tài khoản có thời hạn; **cấm** truyền qua kênh cá nhân hoặc dịch vụ chưa được phê duyệt.

### 6.8. Kết nối chưa đăng ký

Luồng dữ liệu tự động hoặc lặp lại đang chạy mà **chưa có bản ghi điểm tích hợp** được coi là **không phù hợp**. Khi phát hiện:

1. QLCL lập bản ghi ở trạng thái Nháp, xác định chủ sở hữu và đầu mối kỹ thuật.
2. Nếu luồng cần thiết → đưa vào trình tự §6.3.1 trong thời hạn **30 ngày**.
3. Nếu luồng truyền dữ liệu mức **Hạn chế/Mật**, dữ liệu cá nhân hoặc ra ngoài Viện → **tạm ngừng ngay** cho tới khi hoàn tất đăng ký và phê duyệt.
4. Nếu đã gây sai lệch dữ liệu hoặc lộ lọt → lập KPH theo ETV.P13 và xử lý sự cố theo ETV.P28.

Kịch bản đồng bộ, macro, công cụ tự dựng để chuyển dữ liệu giữa hai hệ thống thuộc diện **số hoá âm thầm** theo ETV.P32 §6.9 và phải khai báo.

### 6.9. Vai trò của AI trong tích hợp dữ liệu

Trợ lý AI được phép: đối chiếu danh mục điểm tích hợp với luồng thực tế để **phát hiện kết nối chưa đăng ký**; nhắc điểm tích hợp **quá hạn đối chiếu**, **quá hạn rà soát**, đang tạm ngừng kéo dài; **gợi ý ánh xạ trường** khi lập hợp đồng dữ liệu; phân tích nhật ký lỗi và tổng hợp báo cáo đối chiếu.

Trợ lý AI **không** phê duyệt mở, thay đổi hay ngừng kết nối, **không** tự sửa ánh xạ hoặc cấu hình trên môi trường vận hành, **không** tự sửa dữ liệu trong hàng đợi lỗi và **không** kết luận nguyên nhân sai lệch. Điểm tích hợp phục vụ hệ thống trí tuệ nhân tạo phải tuân thủ thêm ETV.P29 và ETV.P34 §6.8.

### 6.10. Báo cáo và soát xét

QLCL tổng hợp **06 tháng/lần** và trước mỗi cuộc họp xem xét của lãnh đạo (ETV.P17): tổng số điểm tích hợp theo nhóm và mức; điểm tích hợp mở mới, ngừng trong kỳ; kết quả đối chiếu và tỷ lệ đạt cam kết chất lượng; số lần tạm ngừng kết nối và nguyên nhân; sự cố tích hợp ảnh hưởng dữ liệu đo hoặc kết quả đã phát hành; điểm tích hợp quá hạn đối chiếu, quá hạn rà soát; kết nối chưa đăng ký phát hiện trong kỳ.

Thủ tục này được soát xét định kỳ theo ETV.P14 §6.10, hoặc đột xuất khi có thay đổi lớn về kiến trúc hệ thống hoặc yêu cầu kết nối của cơ quan quản lý.

---

## VII. BIỂU MẪU ÁP DỤNG

| Mã biểu mẫu | Tên biểu mẫu | Nơi lưu bản gốc |
|---|---|---|
| **ETV.P.F 37.01** | Danh mục điểm tích hợp dữ liệu | `06_SHARED_RESOURCES/01_Forms/` |
| **ETV.P.F 37.02** | Hợp đồng dữ liệu, ánh xạ trường và biên bản kiểm thử | `06_SHARED_RESOURCES/01_Forms/` |
| **ETV.P.F 37.03** | Biên bản đối chiếu và phiếu sự cố tích hợp | `06_SHARED_RESOURCES/01_Forms/` |

Phiếu thay đổi dùng **F30.02** của ETV.P30; bản ghi nền tảng dùng **F35.01** của ETV.P35; phiếu sự cố an toàn thông tin dùng **F28.03**; phiếu chia sẻ dữ liệu từng lần dùng **F34.03** của ETV.P34; phiếu hành động khắc phục dùng biểu mẫu của ETV.P13 — **không** lập biểu mẫu mới ở thủ tục này (nguyên tắc một nơi duy nhất, ETV.P14).

---

## VIII. LƯU HỒ SƠ

Việc lập, lưu giữ, bảo quản, tra cứu, phân quyền truy cập và thanh lý hồ sơ thực hiện theo **ETV.P15 – Kiểm soát hồ sơ**; thời hạn lưu và phân quyền chi tiết theo **ETV.P.F 14.06**. Thủ tục này **không** quy định lại cơ chế lưu trữ, chỉ đăng ký hồ sơ phát sinh và thời hạn đề xuất.

| Hồ sơ | Người lưu | Thời hạn lưu đề xuất |
|---|---|---|
| Danh mục điểm tích hợp (F37.01) và các phiên bản | QLCL | Vĩnh viễn trên ManLab |
| Hợp đồng dữ liệu, ánh xạ trường (F37.02), mọi phiên bản | QLCL | Suốt vòng đời điểm tích hợp + 05 năm |
| Biên bản kiểm thử trước khi mở kết nối | ĐMKT, sao gửi QLCL | Suốt vòng đời điểm tích hợp + 05 năm |
| Biên bản đối chiếu định kỳ (F37.03) | ĐMKT, sao gửi QLCL | 05 năm |
| Phiếu sự cố tích hợp (F37.03) | QLCL | 05 năm sau khi đóng |
| Nhật ký đồng bộ và hàng đợi lỗi | ĐMKT | 02 năm |
| Thoả thuận, hồ sơ đăng ký kết nối với bên ngoài | QLCL | 10 năm |
| Hồ sơ sự cố có dữ liệu sai đã truyền ra ngoài | QLCL | 10 năm |
| Báo cáo tích hợp dữ liệu phục vụ xem xét của lãnh đạo | QLCL | Theo ETV.P17 |

---

## IX. CÁC PHỤ LỤC

### Phụ lục I — Ma trận kiểm soát rủi ro và điều kiện chặn cứng

*(Dẫn chiếu từ §6.1, §6.2, §6.3, §6.4, §6.5, §6.6, §6.7, §6.8)*

**I.1. Điều kiện chặn cứng trước khi phê duyệt mở điểm tích hợp**

| TT | Điều kiện | Áp dụng cho |
|---|---|---|
| 1 | Có **chủ sở hữu điểm tích hợp** và **đầu mối kỹ thuật** là người cụ thể | Mọi điểm tích hợp |
| 2 | Có **hợp đồng dữ liệu và ánh xạ trường** đã thoả thuận, nhất quán với từ điển dữ liệu (ETV.P34) | Mọi điểm tích hợp |
| 3 | Có **cơ chế và chu kỳ đối chiếu** | Mọi điểm tích hợp |
| 4 | Có **biên bản kiểm thử đạt** trên môi trường tách biệt | Mọi điểm tích hợp |
| 5 | Có xác nhận của **chủ sở hữu dữ liệu** về phạm vi trường và mức phân loại | Mọi điểm tích hợp |
| 6 | Có **đánh giá an toàn thông tin** và nơi lưu bí mật xác thực (ETV.P28) | Mức 2, Mức 3 |
| 7 | Có **phiếu thay đổi ETV.P30** khi chạm hệ thống đang vận hành | Mức 2, Mức 3 |
| 8 | Có **phê duyệt của LĐV**, ý kiến PT.ATTT và thoả thuận bằng văn bản với bên ngoài | Mức 3 |
| 9 | Có **đánh giá ảnh hưởng hiệu lực kết quả đo (ETV.P10)** | Kết nối chạm thiết bị đo, hệ thống thu thập dữ liệu |
| 10 | Bản ghi **không chứa** khoá API, mật khẩu, chứng thư số | Mọi điểm tích hợp |

**I.2. Các tình huống bị chặn hoặc phải xử lý bắt buộc**

| Tình huống | Xử lý |
|---|---|
| Mở kết nối khi **chưa có phê duyệt** theo mức | Vi phạm nghiêm trọng; xử lý như thay đổi âm thầm theo ETV.P30 |
| Điểm tích hợp **không có cơ chế đối chiếu** | **Chặn phê duyệt** |
| **Chuyển đổi đơn vị, làm tròn ngầm** không khai báo trong hợp đồng dữ liệu | **Cấm tuyệt đối**; tạm ngừng kết nối và kiểm chứng lại |
| Ánh xạ trường **mâu thuẫn với từ điển dữ liệu** của ETV.P34 | **Chặn phê duyệt** cho tới khi thống nhất một định nghĩa |
| Chuyển sang **Hiệu lực** khi chưa kết thúc kỳ theo dõi ban đầu với kết luận đạt | **Chặn thao tác** (Mức 2, Mức 3) |
| **Xoá bản ghi trong hàng đợi lỗi** khi chưa xử lý | **Cấm tuyệt đối**; xử lý theo ETV.P13 |
| Lệch dữ liệu lặp lại **02 kỳ đối chiếu liên tiếp** | **Tạm ngừng kết nối** + mở KPH theo ETV.P13 |
| Lệch ảnh hưởng **dữ liệu đo, kết quả đã phát hành** | **Tạm ngừng ngay** + chuyển ETV.P10, ETV.P11 + báo cáo LĐV |
| Dữ liệu sai **đã truyền ra ngoài Viện** mà không thông báo bên nhận trong 24 giờ | Vi phạm nghiêm trọng |
| Áp dụng **thay đổi phá vỡ tương thích** mà không thông báo đầu còn lại, không có phương án quay lui | **Không chấp nhận** |
| Ghi **giá trị đè lên dữ liệu đo gốc** tại điểm tích hợp | **Cấm tuyệt đối** (ETV.P34 §6.3.1) |
| Thiết lập kết nối tới máy tính điều khiển thiết bị đo mà thiếu phiếu thay đổi hoặc đánh giá ảnh hưởng hiệu lực kết quả đo | **Chặn thao tác** (ETV.P33 §6.3.4) |
| Truyền dữ liệu **Hạn chế/Mật** qua kênh chưa được phê duyệt hoặc không mã hoá | **Cấm tuyệt đối**; xử lý theo ETV.P28 |
| Ngừng kết nối khi còn **dịch vụ số, tác tử AI, báo cáo** đang phụ thuộc chưa xử lý | **Chặn thao tác** |
| Kết nối chưa đăng ký truyền dữ liệu Hạn chế/Mật hoặc ra ngoài Viện | **Tạm ngừng ngay** + KPH ETV.P13 + sự cố ETV.P28 |
| Điểm tích hợp **quá hạn đối chiếu 02 chu kỳ** | Cảnh báo LĐV; đưa vào báo cáo xem xét của lãnh đạo |
| Trợ lý AI phê duyệt kết nối, tự sửa ánh xạ vận hành hoặc tự sửa dữ liệu trong hàng đợi lỗi | **Cấm tuyệt đối** |

### Phụ lục II — Bảng trạng thái và thẩm quyền thao tác

*(Dẫn chiếu từ §6.3, §6.4, §6.5)*

**II.1. Điểm tích hợp (F37.01)**

| STT | Trạng thái | Ý nghĩa | Người thao tác | Bắt buộc lý do |
|---|---|---|---|---|
| 1 | Nháp | Đang khai báo, đang thoả thuận hợp đồng dữ liệu | CSHTH, ĐMKT | Không |
| 2 | Chờ soát xét | Chờ xác nhận dữ liệu, mức phân loại và đánh giá an toàn thông tin | CSHTH | Không |
| 3 | Không soát xét | Bị trả lại để sửa | CSHDL, PT.ATTT (≠ người lập) | **Có** |
| 4 | Chờ phê duyệt | Chờ người có thẩm quyền theo mức | QLCL | Không |
| 5 | Không phê duyệt | Bị trả lại hoặc bị từ chối | QLCL (Mức 1, 2) · LĐV (Mức 3) | **Có** |
| 6 | Đang theo dõi ban đầu | Đã mở, đang trong kỳ theo dõi (§6.3.2) | ĐMKT | Không |
| 7 | Hiệu lực | Vận hành chính thức | CSHTH (sau khi kết luận kỳ theo dõi đạt) | Không |
| 8 | Tạm ngừng | Dừng truyền để xử lý sai lệch hoặc sự cố | CSHTH, QLCL, ĐMKT | **Có** |
| 9 | Đã ngừng | Chấm dứt kết nối; **bản ghi vẫn giữ** để truy vết | QLCL (Mức 1, 2) · LĐV (Mức 3) | **Có** |
| 10 | Huỷ bản ghi | Khai báo sai hoặc trùng, bỏ trước khi phê duyệt | QLCL | **Có** |

Cờ **Quá hạn đối chiếu**, **Đến hạn rà soát**, **Hàng đợi lỗi tồn đọng** không phải trạng thái hồ sơ mà là cảnh báo tính theo dữ liệu bản ghi.

**II.2. Các đối tượng khác**

| Đối tượng | Chuỗi trạng thái | Thẩm quyền kết thúc |
|---|---|---|
| Hợp đồng dữ liệu (F37.02) | Nháp → Chờ thoả thuận → Đã thoả thuận → Hiệu lực → Hết hiệu lực *(khi có phiên bản mới)* | CSHTH · **LĐV** với thay đổi phá vỡ tương thích ở Mức 3 |
| Biên bản đối chiếu (F37.03 – phần đối chiếu) | Mới → Đang đối chiếu → Có kết quả → Đạt / Không đạt | CSHDL *(xác nhận nghiệp vụ)* |
| Phiếu sự cố tích hợp (F37.03 – phần sự cố) | Mới → Đang xử lý → Chờ bên đối tác → Đã xử lý → Đã đóng / Huỷ | QLCL · PT.ATTT *(khi có yếu tố an toàn thông tin)* |

Mọi nhánh **Không phê duyệt**, **Không soát xét**, **Tạm ngừng**, **Đã ngừng**, **Huỷ** bắt buộc ghi lý do.

---

*Thủ tục Quản lý tích hợp dữ liệu — ETV.P 37 — Lần BH: 01 — Trang tài liệu điện tử, không áp dụng đánh số trang thủ công (bản in xuất từ ManLab tự sinh header/footer theo ETV.P14 §6.4).*
