---
# Khối metadata AI — bắt buộc cho mọi văn bản kiểm soát (ETV.P14 §6.3)
id: ETV.P34
title: "Thủ tục Quản lý dữ liệu số"
type: Thu-tuc
owner: "Phụ trách Quản lý chất lượng (QLCL)"
department: "Toàn Viện"
process: MP34_DuLieuSo
capability: [CAP-28_ATTT]
module: M34_DuLieuSo
effective_date: "30/08/2026"
revision: "01"
status: Da-phe-duyet
keywords: [dữ liệu số, từ điển dữ liệu, chất lượng dữ liệu, dữ liệu chủ, tổ chức cá nhân, Party Role, năng lực kỹ thuật, chủ sở hữu dữ liệu, truy xuất nguồn gốc dữ liệu, ISO/IEC 17025 §7.11]
related_documents: [ETV.QM, ETV.P01, ETV.P02, ETV.P08, ETV.P10, ETV.P11, ETV.P13, ETV.P14, ETV.P15, ETV.P17, ETV.P26, ETV.P27, ETV.P28, ETV.P29, ETV.P30, ETV.P31, ETV.P33, ETV.P35, ETV.P36, ETV.P37, ETV.P38]
iso_clause: ["ISO 9001:2015 §7.1.6, §7.5, §9.1", "ISO/IEC 17025:2017 §7.5, §7.11, §8.4", "ISO 17034:2016 §7.4", "ISO/IEC 27001:2022 §8.1, A.5.12, A.5.13, A.5.14, A.5.33, A.8.10, A.8.11, A.8.12", "ISO/IEC 42001:2023 §7.4, §8.1, A.7 (dữ liệu cho hệ thống AI)"]
legal_basis: ["Luật Giao dịch điện tử 20/2023/QH15", "Pháp luật hiện hành về bảo vệ dữ liệu cá nhân", "Pháp luật hiện hành về an toàn thông tin mạng"]
ai_tags: [data-catalog, data-quality, master-data, data-lineage]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Vĩnh viễn (bản hiện hành) — xem chi tiết theo loại tại ETV.P.F 14.06"
digital_signature: "LĐV"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV)"
supersedes: null
superseded_by: null
---
# THỦ TỤC QUẢN LÝ DỮ LIỆU SỐ

**Procedure For Digital Data Management**

|                   |                                          |
| ----------------- | ---------------------------------------- |
| **Mã số**         | ETV.P 34                                 |
| **Lần ban hành**  | 01                                       |
| **Ngày ban hành** | 30/08/2026                               |
| **Biên soạn**     | Dương Thành Nam — 30/08/2026             |
| **Soát xét**      | Đỗ Văn Vinh — Lãnh đạo Phòng, 30/08/2026 |
| **Phê duyệt**     | Nguyễn Hoàng Giang — Lãnh đạo Viện, 30/08/2026 |

> **Tình trạng bản này: ĐÃ PHÊ DUYỆT** — ban hành lần thứ nhất. Bản này có hiệu lực từ ngày 30/08/2026.

> **Chú ý:** Tài liệu nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện Kiểm định Công nghệ và Môi trường.

> **Ghi chú soạn thảo.** Phạm vi của thủ tục này bám đúng ranh giới đã được **ETV.P35 (đã ban hành) mục 2.3** xác lập: *"Dữ liệu số chạy trên nền tảng: chất lượng, vòng đời, kiểm soát truy xuất — ETV.P34"*, còn *"danh mục và vòng đời tài sản dữ liệu, sao lưu, phục hồi — ETV.P27"*. Các **giá trị định lượng** (ngưỡng chất lượng, chu kỳ đo, thời hạn xử lý) **đã được Viện xác nhận** trước khi phê duyệt ngày 30/08/2026.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian | Nội dung thay đổi | Lần ban hành |
| ---------- | ------------------- | -------------- |
| 30/08/2026 | Ban hành lần thứ nhất. Thủ tục mới, hiện thực hoá Sổ tay chất lượng §10.3 và quy trình MP34; phân định rõ với ETV.P27 (tài sản dữ liệu, sao lưu) và ETV.P28 (biện pháp bảo vệ) | 01 |
| 25/08/2026 | Sửa dự thảo, **chưa ban hành**: mục 6.8 trước đây cho phép dữ liệu mức **Hạn chế** dùng trên nền tảng AI đã phê duyệt — trái **ETV.P28 mục 6.13** và **ETV.P26 mục 5.5** đang có hiệu lực. Đưa về đúng bộ văn bản hiện hành: Hạn chế và Mật không đưa vào hệ thống AI dưới mọi hình thức; dẫn chiếu quy tắc gốc về ETV.P29 mục 5.5 thay vì quy định song song. | 01 |
| 26/08/2026 | Bổ sung quản trị dữ liệu chủ đo lường: 12 nhóm dữ liệu chủ tối thiểu; mô hình một hồ sơ Tổ chức/Cá nhân có nhiều vai trò; quy tắc chống trùng, hợp nhất, nguồn và hiệu lực; cập nhật F34.01. **Chưa ban hành, chờ soát xét.** | 01 |
| 30/08/2026 | Ban hành lần thứ nhất: Lãnh đạo Viện phê duyệt, có hiệu lực cùng ngày. Các giá trị định lượng nêu ở dòng trên đã được Viện xác nhận khớp nguồn lực thực tế trước khi phê duyệt | 01 |

---

## I. MỤC ĐÍCH

Thủ tục này quy định nội dung, trách nhiệm và trình tự **xác lập danh mục, xác định chủ sở hữu, kiểm soát chất lượng, kiểm soát truy xuất, khai thác, chia sẻ và quản lý vòng đời** đối với dữ liệu số của Viện ETV, nhằm đáp ứng yêu cầu Điều 7.11 và 7.5 của ISO/IEC 17025:2017, Điều 7.4 của ISO 17034:2016, Điều 7.5 của ISO 9001:2015, các kiểm soát A.5.12–A.5.14, A.5.33, A.8.10–A.8.12 của ISO/IEC 27001:2022 và Mục 10.3 của Sổ tay chất lượng. Cụ thể để:

1. Bảo đảm **không có dữ liệu vô chủ** — mỗi tập dữ liệu có chủ sở hữu nghiệp vụ xác định, biết nằm ở đâu, ai được đọc, ai được sửa.
2. Bảo đảm dữ liệu số **chính xác, đầy đủ, nhất quán, kịp thời, duy nhất và hợp lệ** ở mức đã cam kết, và **đo được** mức đó thay vì khẳng định chung chung.
3. Bảo đảm **một nguồn sự thật** cho dữ liệu dùng chung — không tồn tại nhiều bảng tra song song cho cùng một danh mục.
4. Bảo đảm **dữ liệu đo và hồ sơ kỹ thuật không bị sửa đè**; mọi hiệu chỉnh đều để lại dấu vết và người chịu trách nhiệm.
5. Bảo đảm việc **khai thác, chia sẻ dữ liệu ra ngoài phạm vi được phép** không xảy ra, đặc biệt với dữ liệu khách hàng và dữ liệu cá nhân.
6. Bảo đảm dữ liệu có thể **truy xuất nguồn gốc**: một con số trên báo cáo, chứng chỉ truy được về dữ liệu gốc và quá trình biến đổi đã trải qua.
7. Bảo đảm dữ liệu dùng cho **hệ thống trí tuệ nhân tạo** có nguồn gốc rõ ràng và được phép sử dụng (ETV.P29).
8. Bảo đảm các danh mục dùng chung của hoạt động kiểm định, hiệu chuẩn, thử nghiệm, quan trắc và sản xuất RM/CRM được quản trị thống nhất, đủ để xác định **đúng chủ thể, đúng đối tượng, đúng phương pháp, đúng nguồn lực và đúng phạm vi năng lực** trước khi thực hiện công việc.

Áp dụng thống nhất trong toàn Viện ETV, thực hiện qua phần mềm ManLab (Module M34 – Quản lý dữ liệu số).

---

## II. PHẠM VI ÁP DỤNG

### 2.1. Đối tượng áp dụng

Áp dụng cho toàn bộ đơn vị, phòng ban, cá nhân thuộc Viện ETV và cho **mọi tập dữ liệu số** phát sinh, được lưu giữ hoặc được khai thác trong hoạt động của Viện:

| TT | Nhóm dữ liệu | Ví dụ |
|---|---|---|
| 1 | Dữ liệu đo và dữ liệu kỹ thuật | Dữ liệu thô từ thiết bị đo, dữ liệu tính toán trung gian, kết quả kiểm định, hiệu chuẩn, thử nghiệm |
| 2 | Dữ liệu hồ sơ nghiệp vụ | Hồ sơ khách hàng, đơn hàng, mẫu, tiến độ công việc, biên bản |
| 3 | Dữ liệu chủ (dùng chung) | Tổ chức/Cá nhân và vai trò; dịch vụ; năng lực kỹ thuật; loại đối tượng đo/thử nghiệm; đại lượng–thông số–đơn vị đo; phương pháp; tài liệu viện dẫn; nhân sự–năng lực–thẩm quyền; thiết bị–chuẩn–mẫu chuẩn; cơ sở vật chất; phạm vi công nhận/chỉ định; NCC/NTP được phê duyệt |
| 4 | Dữ liệu quản trị | Dữ liệu nhân sự, tài chính, mua sắm, đào tạo |
| 5 | Dữ liệu hệ thống quản lý | Rủi ro, KPH, đánh giá nội bộ, sáng kiến, chỉ số hiệu quả |
| 6 | Dữ liệu công bố | Dữ liệu đưa lên cổng tra cứu, chứng chỉ số, dữ liệu chia sẻ với cơ quan quản lý |
| 7 | Dữ liệu dùng cho trí tuệ nhân tạo | Dữ liệu ngữ cảnh, tập tri thức, dữ liệu dùng để đánh giá mô hình |

Dữ liệu được quản lý thống nhất trên phần mềm ManLab (Module M34 – Quản lý dữ liệu số).

### 2.2. Nguyên tắc áp dụng

**Nguyên tắc 1 — Một nguồn sự thật.** Mỗi loại dữ liệu dùng chung chỉ có **một** nguồn được công nhận, ghi trong danh mục dữ liệu số. Bảng tra, tệp bảng tính hoặc danh sách riêng của cá nhân, phòng ban **không** được dùng làm căn cứ nghiệp vụ khi đã có nguồn chính thức.

**Nguyên tắc 2 — Dữ liệu gốc không bị sửa đè.** Dữ liệu đo thô và hồ sơ kỹ thuật đã ghi nhận **không được sửa trực tiếp**. Mọi hiệu chỉnh thực hiện bằng bản ghi hiệu chỉnh mới, giữ nguyên giá trị cũ, kèm lý do và người thực hiện (ISO/IEC 17025 §7.5, §7.11).

**Nguyên tắc 3 — Chất lượng dữ liệu phải đo được.** Tập dữ liệu trọng yếu phải có chỉ số chất lượng, ngưỡng chấp nhận và kỳ đo. Khẳng định "dữ liệu của chúng tôi chính xác" mà không có phép đo **không** được chấp nhận làm bằng chứng.

### 2.3. Ngoài phạm vi

Thủ tục này **không** thay thế và **không** trùng lặp với:

| Nội dung | Thuộc thủ tục |
|---|---|
| Danh mục **tài sản thông tin**, sao lưu, phục hồi, huỷ dữ liệu về mặt kỹ thuật | ETV.P27 – Quản trị dữ liệu và tài sản thông tin |
| Biện pháp kỹ thuật bảo vệ dữ liệu, mã hoá, đánh giá rủi ro an toàn thông tin, **phê duyệt quyền truy cập**, xử lý sự cố an toàn thông tin | ETV.P28 – Quản lý an toàn thông tin |
| Hạ tầng, thiết bị, máy chủ nơi dữ liệu được lưu | ETV.P33 – Quản lý hệ thống thông tin |
| Nền tảng số vận hành dữ liệu, điểm tích hợp, đánh giá trước vận hành | ETV.P35 – Quản lý nền tảng số |
| Kết nối, ánh xạ trường dữ liệu, hợp đồng dữ liệu giữa các hệ thống | ETV.P37 – Tích hợp dữ liệu |
| Phát hành, xác thực và truy xuất nguồn gốc **chứng chỉ số, báo cáo điện tử** | ETV.P36 – Quản lý chứng chỉ số và truy xuất nguồn gốc |
| Dịch vụ số cung cấp cho khách hàng | ETV.P38 – Quản lý dịch vụ số |
| Kết luận kỹ thuật, xác nhận giá trị sử dụng phương pháp, hiệu lực kết quả đo | ETV.P08 · ETV.P10 · ETV.P11 |
| Hồ sơ: nhận dạng, lưu giữ, bảo quản, thời hạn lưu, thanh lý | ETV.P15 – Kiểm soát hồ sơ |
| Phân loại thông tin (Công khai · Nội bộ · Hạn chế · Mật) và cam kết bảo mật | ETV.P02 · ETV.P28 |
| Đánh giá tác động và kiểm soát hệ thống trí tuệ nhân tạo | ETV.P29 – Quản lý hệ thống trí tuệ nhân tạo |
| Thay đổi cấu trúc dữ liệu, di trú dữ liệu (phê duyệt và đánh giá tác động) | ETV.P30 – Quản lý thay đổi |
| Khôi phục dữ liệu khi gián đoạn, RPO | ETV.P31 – Quản lý tính liên tục hoạt động |

> **Phân biệt cốt lõi:** ETV.P27 trả lời *"Viện có những tài sản dữ liệu nào, sao lưu và huỷ ra sao"*; **ETV.P34** trả lời *"dữ liệu đó có đúng không, ai được dùng, dùng thế nào, sống bao lâu"*; ETV.P28 trả lời *"bảo vệ bằng biện pháp gì"*; ETV.P33 trả lời *"nằm trên thiết bị nào"*. Một tập dữ liệu khách hàng kích hoạt cả bốn, nhưng mỗi thủ tục giữ đúng vai của mình.

---

## III. TÀI LIỆU VIỆN DẪN

> Nguyên tắc: **chỉ dẫn chiếu, không chép lại nội dung.** Bản đầy đủ đặt tại `03_MANAGEMENT_SYSTEM/` (chuẩn mực) và `08_KNOWLEDGE_GRAPH/01_Regulations/` (pháp luật). QLCL rà soát hiệu lực và văn bản thay thế trước mỗi lần ban hành lại.

### 3.1. Tiêu chuẩn

- ISO 9001:2015 §7.1.6 (Tri thức của tổ chức); §7.5 (Thông tin dạng văn bản); §9.1 (Theo dõi, đo lường, phân tích)
- ISO/IEC 17025:2017 §7.5 (Hồ sơ kỹ thuật); §7.11 (Kiểm soát dữ liệu và quản lý thông tin); §8.4 (Kiểm soát hồ sơ)
- ISO 17034:2016 §7.4 (Kiểm soát dữ liệu)
- ISO/IEC 27001:2022 §8.1; A.5.12 (Phân loại thông tin); A.5.13 (Gắn nhãn thông tin); A.5.14 (Truyền nhận thông tin); A.5.33 (Bảo vệ hồ sơ); A.8.10 (Xoá thông tin); A.8.11 (Che dữ liệu); A.8.12 (Ngăn rò rỉ dữ liệu)
- ISO/IEC 42001:2023 §7.4; §8.1; Phụ lục A — quản lý dữ liệu cho hệ thống AI
- `11_COMPLIANCE/01_ISO_Mapping/MP-ISO-mapping.md` — bảng ánh xạ đầy đủ MP ↔ điều khoản

### 3.2. Văn bản pháp luật

- Luật Giao dịch điện tử số 20/2023/QH15 — giá trị pháp lý của thông điệp dữ liệu, dữ liệu điện tử
- Pháp luật hiện hành về **bảo vệ dữ liệu cá nhân** — áp dụng khi tập dữ liệu chứa dữ liệu cá nhân; QLCL phối hợp PT.ATTT xác định văn bản đang hiệu lực tại thời điểm áp dụng và ghi vào bản ghi dữ liệu
- Pháp luật hiện hành về **an toàn thông tin mạng** — bảo đảm an toàn dữ liệu trên hệ thống thông tin
- Quy định pháp luật chuyên ngành về **lưu giữ hồ sơ đo lường, thử nghiệm** — thời hạn lưu dữ liệu kỹ thuật không được ngắn hơn thời hạn pháp luật yêu cầu

### 3.3. Văn bản nội bộ Viện ETV

- Sổ tay quản lý chất lượng (ETV.QM) §10.3 và §7.11
- ETV.P01 – Quản lý rủi ro và cơ hội · ETV.P02 – Bảo mật thông tin · ETV.P08 – Phương pháp · ETV.P10 – Đảm bảo giá trị sử dụng kết quả
- ETV.P11 – Báo cáo kết quả · ETV.P13 – Khắc phục, cải tiến · ETV.P14 – Kiểm soát tài liệu · ETV.P15 – Kiểm soát hồ sơ
- ETV.P17 – Xem xét của lãnh đạo · ETV.P26 – Quản lý tri thức tổ chức · ETV.P27 – Quản trị dữ liệu và tài sản thông tin
- ETV.P28 – Quản lý an toàn thông tin
- ETV.P29 – Quản lý hệ thống trí tuệ nhân tạo · ETV.P30 – Quản lý thay đổi · ETV.P31 – Quản lý tính liên tục hoạt động
- ETV.P33 – Quản lý hệ thống thông tin · ETV.P35 – Quản lý nền tảng số · ETV.P36 – Quản lý chứng chỉ số và truy xuất nguồn gốc
- ETV.P37 – Tích hợp dữ liệu · ETV.P38 – Quản lý dịch vụ số

---

## IV. THUẬT NGỮ, ĐỊNH NGHĨA VÀ CHỮ VIẾT TẮT

### 4.1. Thuật ngữ và định nghĩa

Định nghĩa chung ("dữ liệu", "thông tin", "hồ sơ") theo ISO 9000:2015 và ISO/IEC 27000 — không nhắc lại tại đây. Các thuật ngữ riêng của thủ tục này:

| Thuật ngữ | Định nghĩa |
|---|---|
| **Dữ liệu số** | Dữ liệu tồn tại ở dạng điện tử, do Viện tạo lập, thu thập, xử lý, lưu giữ hoặc tiếp nhận phục vụ hoạt động quản lý và chuyên môn |
| **Tập dữ liệu** (dataset) | Một nhóm dữ liệu có cùng mục đích và cùng cấu trúc, được kiểm kê thành **một bản ghi** trong danh mục dữ liệu số |
| **Danh mục dữ liệu số** | Bản ghi tập trung về các tập dữ liệu của Viện: mục đích, chủ sở hữu, nơi lưu, mức phân loại, yêu cầu chất lượng, vòng đời |
| **Từ điển dữ liệu** (data dictionary) | Mô tả ý nghĩa, kiểu, đơn vị, miền giá trị hợp lệ và quy tắc bắt buộc của từng trường trong một tập dữ liệu |
| **Chủ sở hữu dữ liệu** (data owner) | Lãnh đạo đơn vị chịu trách nhiệm về **ý nghĩa nghiệp vụ**, tính đúng đắn và việc cho phép khai thác tập dữ liệu |
| **Người quản trị dữ liệu nghiệp vụ** (data steward) | Người được chủ sở hữu giao theo dõi chất lượng, xử lý sai lệch và duy trì từ điển dữ liệu của tập dữ liệu |
| **Người giữ dữ liệu** (data custodian) | Bộ phận kỹ thuật vận hành nơi dữ liệu được lưu (theo ETV.P33, ETV.P35); chịu trách nhiệm kỹ thuật, **không** quyết định nội dung dữ liệu |
| **Dữ liệu chủ** (master data) | Dữ liệu dùng chung nhiều nơi, thay đổi chậm, là căn cứ tham chiếu của các dữ liệu khác (khách hàng, thiết bị, phương pháp, đơn vị đo, nhân sự) |
| **Chủ thể** (Party) | Tổ chức hoặc cá nhân được nhận dạng một lần trong nguồn dữ liệu chủ và có thể tham gia nhiều quan hệ, giao dịch hoặc vai trò nghiệp vụ |
| **Vai trò của chủ thể** (Party Role) | Tư cách nghiệp vụ của một chủ thể trong một thời hạn xác định, ví dụ khách hàng, NCC, NTP, NSX, đối tác, cơ quan quản lý, tổ chức công nhận/chứng nhận hoặc chuyên gia |
| **Bản ghi tham chiếu** | Một giá trị cụ thể thuộc dữ liệu chủ được các hồ sơ nghiệp vụ dẫn chiếu bằng mã định danh ổn định; không sao chép thành nguồn cạnh tranh |
| **Dữ liệu gốc** | Dữ liệu ghi nhận lần đầu, chưa qua biến đổi — bao gồm **dữ liệu đo thô**; là căn cứ cuối cùng khi có tranh luận về kết quả |
| **Chiều chất lượng dữ liệu** | Sáu chiều đánh giá tại §6.4.1: chính xác · đầy đủ · nhất quán · kịp thời · duy nhất · hợp lệ |
| **Ngưỡng chấp nhận** | Giá trị tối thiểu của một chỉ số chất lượng mà tập dữ liệu phải đạt; dưới ngưỡng thì phải xử lý theo §6.4.4 |
| **Truy xuất nguồn gốc dữ liệu** (data lineage) | Khả năng lần ngược một giá trị trên báo cáo, chứng chỉ về dữ liệu gốc và các bước biến đổi đã trải qua |
| **Ẩn danh, giả danh dữ liệu** | Việc loại bỏ hoặc thay thế thông tin định danh để dữ liệu không còn xác định được cá nhân, tổ chức cụ thể |
| **Giai đoạn vòng đời** | Ba giai đoạn của tập dữ liệu: **Hoạt động** → **Lưu trữ** → **Đề nghị huỷ** (§6.7) |

### 4.2. Chữ viết tắt

| Chữ viết tắt | Ý nghĩa |
|---|---|
| ETV | Viện Kiểm định Công nghệ và Môi trường |
| HTQL | Hệ thống quản lý |
| LĐV | Lãnh đạo Viện |
| LĐP / TP | Lãnh đạo Phòng / Trưởng phòng, người phụ trách lĩnh vực |
| NTH | Người thực hiện (mọi nhân sự, không phân biệt chức vụ) |
| QLCL | Phụ trách Quản lý chất lượng |
| QLKT | Phụ trách Quản lý kỹ thuật |
| CSHDL | Chủ sở hữu dữ liệu |
| QTDL | Người quản trị dữ liệu nghiệp vụ |
| QTHT | Quản trị hệ thống |
| PT.ATTT | Người phụ trách an toàn thông tin |
| KPH | Sự không phù hợp và hành động khắc phục (theo ETV.P13) |
| ManLab | Nền tảng số hợp nhất của Viện (ManLab AIOS) |
| RACI | Responsible – Accountable – Consulted – Informed |

---

## V. VAI TRÒ VÀ TRÁCH NHIỆM (RACI)

### 5.1. Ma trận RACI

| Bước trong vòng đời dữ liệu số | NTH | QTDL | CSHDL | QLCL | PT.ATTT | QTHT | LĐV |
|---|---|---|---|---|---|---|---|
| Khai báo tập dữ liệu vào danh mục (F34.01) | C | **R** | **A** | C | I | C | I |
| Lập và duy trì từ điển dữ liệu | C | **R/A** | C | C | I | C | I |
| Xác định mức phân loại thông tin của tập dữ liệu | I | C | **R** | C | **A** | I | I |
| Phê duyệt tập dữ liệu vào danh mục | I | C | **R** | **A** | C | I | C |
| Công nhận **dữ liệu chủ** và nguồn sự thật duy nhất | I | C | **R** | **R/A** | I | C | **A** |
| Xác định chỉ số, ngưỡng chất lượng (F34.02) | C | **R** | **A** | C | I | C | I |
| Đo chất lượng dữ liệu định kỳ | C | **R/A** | A | C | I | C | I |
| Xử lý sai lệch chất lượng dưới ngưỡng | **R** | **R** | **A** | C | I | C | I |
| Mở KPH khi chất lượng không đạt kéo dài | I | C | C | **R/A** | I | I | I |
| Tiếp nhận, thẩm định yêu cầu khai thác, chia sẻ dữ liệu (F34.03) | C | **R** | **R/A** | C | C | I | I |
| Phê duyệt chia sẻ dữ liệu **ra ngoài Viện** | I | C | **R** | C | **R** | I | **A** |
| Thực hiện trích xuất, ẩn danh dữ liệu | I | **R** | A | I | C | **R** | I |
| Hiệu chỉnh dữ liệu đã ghi nhận | **R** | C | **A** | C | I | I | I |
| Kết luận về hiệu lực kết quả khi dữ liệu sai | I | C | C | **R** | I | I | **A** |
| Chuyển giai đoạn vòng đời (Hoạt động → Lưu trữ → Đề nghị huỷ) | I | **R** | **A** | **R** | C | C | **A** *(huỷ)* |
| Thực hiện huỷ dữ liệu về mặt kỹ thuật | I | C | C | C | **A** | **R** | I |
| Duyệt dữ liệu dùng cho hệ thống trí tuệ nhân tạo | I | **R** | **R** | C | **A** | C | **A** |
| Tổng hợp báo cáo phục vụ xem xét của lãnh đạo | I | C | C | **R/A** | C | C | I |

> LĐV luôn là **A** cuối cùng đối với việc **công nhận dữ liệu chủ**, **chia sẻ dữ liệu ra ngoài Viện**, **huỷ dữ liệu** và **cho phép dùng dữ liệu cho hệ thống AI** — không uỷ quyền.

### 5.2. Trách nhiệm cụ thể

**Lãnh đạo Viện (LĐV):** Phê duyệt danh mục dữ liệu chủ và nguồn sự thật duy nhất của Viện; phê duyệt việc chia sẻ dữ liệu ra ngoài Viện và việc huỷ dữ liệu; phê duyệt việc sử dụng dữ liệu của Viện cho hệ thống trí tuệ nhân tạo; quyết định xử lý khi dữ liệu sai ảnh hưởng kết quả đã phát hành; xem xét tình hình dữ liệu số trong cuộc họp xem xét của lãnh đạo (ETV.P17).

**Phụ trách Quản lý chất lượng (QLCL):** Quản trị danh mục dữ liệu số; kiểm tra tính đầy đủ của bản ghi trước khi trình phê duyệt; theo dõi kết quả đo chất lượng và tập dữ liệu **đến hạn rà soát**; mở KPH theo ETV.P13 khi chất lượng dưới ngưỡng kéo dài hoặc phát hiện dữ liệu bị sửa đè; phối hợp ETV.P10, ETV.P11 khi dữ liệu sai ảnh hưởng kết quả đã phát hành; tổng hợp báo cáo; lưu hồ sơ theo ETV.P15.

**Chủ sở hữu dữ liệu (CSHDL):** Chịu trách nhiệm về **ý nghĩa nghiệp vụ và tính đúng đắn** của tập dữ liệu; xác định mức phân loại thông tin (phối hợp PT.ATTT); quyết định ai được đọc, ai được sửa trong phạm vi quyền hạn; phê duyệt yêu cầu khai thác nội bộ; đề xuất chuyển giai đoạn vòng đời; bảo đảm tập dữ liệu có chỉ số chất lượng và ngưỡng chấp nhận.

**Người quản trị dữ liệu nghiệp vụ (QTDL):** Lập và duy trì từ điển dữ liệu; tổ chức đo chất lượng theo kỳ; ghi nhận, phân tích và xử lý sai lệch; thực hiện trích xuất, ẩn danh dữ liệu theo yêu cầu đã phê duyệt; duy trì thông tin truy xuất nguồn gốc của tập dữ liệu.

**Người phụ trách an toàn thông tin (PT.ATTT):** Xác nhận mức phân loại thông tin và biện pháp bảo vệ tương ứng (ETV.P28); cho ý kiến bắt buộc với mọi yêu cầu chia sẻ dữ liệu ra ngoài Viện và với dữ liệu cá nhân; xác nhận phương pháp ẩn danh, giả danh và phương pháp huỷ dữ liệu an toàn.

**Quản trị hệ thống (QTHT):** Thực hiện thao tác kỹ thuật trên dữ liệu theo yêu cầu đã phê duyệt (trích xuất, di chuyển, huỷ); bảo đảm hạ tầng và nền tảng lưu dữ liệu đúng theo ETV.P33, ETV.P35; **không** tự quyết định nội dung, phạm vi hay việc chia sẻ dữ liệu.

**Lãnh đạo Phòng (TP):** Bảo đảm nhân sự của đơn vị nhập liệu đúng quy định, không tạo bảng tra song song, không lưu dữ liệu công việc ngoài hệ thống được phê duyệt; xác nhận nhu cầu khai thác dữ liệu của đơn vị.

**Người thực hiện (NTH):** Nhập dữ liệu trung thực, đầy đủ, đúng thời điểm; **không** sửa đè dữ liệu gốc; báo ngay cho QTDL khi phát hiện dữ liệu sai, thiếu hoặc trùng; chỉ khai thác dữ liệu trong phạm vi được phép và **không** chuyển dữ liệu ra ngoài kênh đã được phê duyệt.

### 5.3. Nguyên tắc tách vai trò và giới hạn của AI

- Người đề nghị khai thác dữ liệu ≠ người phê duyệt. Người thực hiện trích xuất ≠ người phê duyệt.
- Người nhập dữ liệu **không** đồng thời là người kết luận về chất lượng của chính dữ liệu mình nhập.
- Việc huỷ dữ liệu cần **hai chữ ký**: phê duyệt của LĐV và xác nhận phương pháp huỷ của PT.ATTT.
- Trợ lý AI được phép **phát hiện** dữ liệu trùng, thiếu, bất thường; **nhắc** tập dữ liệu đến hạn rà soát, đến hạn đo chất lượng; **gợi ý** ánh xạ và chuẩn hoá giá trị; **soạn dự thảo** từ điển dữ liệu và báo cáo. Trợ lý AI **không** tự sửa dữ liệu nghiệp vụ trên môi trường vận hành, **không** phê duyệt khai thác hay chia sẻ dữ liệu, **không** kết luận chất lượng dữ liệu và **không** tự huỷ dữ liệu (ISO/IEC 42001; ETV.P29).

---

## VI. NỘI DUNG / QUY TRÌNH THỰC HIỆN

### 6.1. Danh mục dữ liệu số (Biểu mẫu F34.01)

#### 6.1.1. Nội dung tối thiểu của một bản ghi

| Nhóm | Trường bắt buộc |
|---|---|
| Nhận dạng | Mã tập dữ liệu; tên gọi; nhóm dữ liệu (§2.1); mục đích sử dụng |
| Trách nhiệm | **Chủ sở hữu dữ liệu** và **người quản trị dữ liệu nghiệp vụ** — thiếu một trong hai thì không được phê duyệt |
| Nơi lưu | Nền tảng số (ETV.P35) và hạ tầng (ETV.P33) nơi dữ liệu tồn tại; có bản sao ở nơi nào khác không |
| Phân loại | Mức phân loại thông tin: **Công khai · Nội bộ · Hạn chế · Mật** (theo ETV.P02, ETV.P27, ETV.P28); **có chứa dữ liệu cá nhân hay không** |
| Chất lượng | Chỉ số chất lượng áp dụng, ngưỡng chấp nhận, kỳ đo (§6.4) |
| Vòng đời | Giai đoạn hiện tại; thời hạn giữ ở giai đoạn Hoạt động; căn cứ thời hạn lưu (ETV.P15, ETV.P.F 14.06, quy định pháp luật chuyên ngành) |
| Khai thác | Ai được đọc, ai được sửa; có được chia sẻ ra ngoài không và với điều kiện gì |
| Liên kết | Tài sản thông tin tương ứng (ETV.P27); điểm tích hợp (ETV.P37); dữ liệu chủ được tham chiếu; hồ sơ tương ứng (ETV.P15) |

**Nghiêm cấm** đưa nội dung dữ liệu thật (đặc biệt dữ liệu cá nhân, dữ liệu khách hàng) vào phần mô tả của bản ghi danh mục — bản ghi chỉ **mô tả**, không **chứa** dữ liệu.

#### 6.1.2. Từ điển dữ liệu

Tập dữ liệu thuộc nhóm **dữ liệu đo và dữ liệu kỹ thuật**, **dữ liệu chủ** và **dữ liệu công bố** bắt buộc có từ điển dữ liệu, ghi cho từng trường: tên trường, ý nghĩa nghiệp vụ, kiểu dữ liệu, đơn vị đo (nếu có), miền giá trị hợp lệ, bắt buộc hay không, quy tắc kiểm tra và ví dụ.

Từ điển dữ liệu là **căn cứ để kiểm tra hợp lệ** khi nhập liệu và khi tích hợp; thay đổi từ điển dữ liệu là **thay đổi cấu trúc dữ liệu** — thực hiện theo ETV.P30.

#### 6.1.3. Trình tự đưa tập dữ liệu vào danh mục

| Bước | Nội dung thực hiện | Trách nhiệm | Biểu mẫu |
|---|---|---|---|
| 1 | Khai báo bản ghi tập dữ liệu (trạng thái **Nháp**) kèm từ điển dữ liệu (nếu thuộc diện bắt buộc) | QTDL | `ETV.P.F 34.01` |
| 2 | Xác nhận mức phân loại thông tin và biện pháp bảo vệ tương ứng | CSHDL, PT.ATTT | `ETV.P.F 34.01` |
| 3 | Kiểm tra trùng lặp với tập dữ liệu đã có; nếu trùng thì **gộp**, không tạo bản ghi mới | QLCL | `ETV.P.F 34.01` |
| 4 | Phê duyệt đưa vào danh mục; tập dữ liệu chuyển **Hiệu lực** | CSHDL (QLCL soát xét) | `ETV.P.F 34.01` |
| 5 | Rà soát định kỳ (mặc định **01 năm/lần**, dữ liệu chứa dữ liệu cá nhân **06 tháng/lần**): còn cần thiết, còn đúng mức phân loại, còn đúng thời hạn giữ | QTDL, CSHDL | `ETV.P.F 34.01` |

### 6.2. Dữ liệu chủ và nguồn sự thật duy nhất

#### 6.2.1. Công nhận nguồn sự thật

Với mỗi loại dữ liệu chủ, LĐV **công nhận một nguồn duy nhất** ghi trong danh mục. Kể từ thời điểm công nhận:

- Mọi hệ thống, báo cáo, biểu mẫu phải lấy dữ liệu từ nguồn đó hoặc từ bản sao được đồng bộ tự động (ETV.P37);
- **Không** được duy trì bảng tra, tệp bảng tính song song cho cùng loại dữ liệu;
- Việc thêm, sửa giá trị dữ liệu chủ chỉ thực hiện tại nguồn, bởi người được phân quyền.

#### 6.2.2. Xử lý bảng tra song song

Bảng tra, danh sách riêng phát hiện đang được dùng làm căn cứ nghiệp vụ trong khi đã có nguồn chính thức được coi là **không phù hợp**: ngừng sử dụng ngay, đối chiếu chênh lệch với nguồn chính thức, cập nhật phần dữ liệu đúng còn thiếu vào nguồn chính thức, và xem xét mở KPH theo ETV.P13 nếu đã gây sai lệch kết quả hoặc hồ sơ.

#### 6.2.3. Hệ thống dữ liệu chủ tối thiểu

Viện duy trì tối thiểu các nhóm dữ liệu chủ sau. Mỗi nhóm phải được đăng ký tại F34.01, có một nguồn sự thật duy nhất, chủ sở hữu, người quản trị, từ điển dữ liệu, quy tắc định danh và trạng thái hiệu lực.

| Mã nhóm | Dữ liệu chủ | Nội dung tối thiểu | Module nghiệp vụ sử dụng chính |
|---|---|---|---|
| MD01 | Tổ chức/Cá nhân và vai trò | Định danh chủ thể; tổ chức/cá nhân; vai trò; đầu mối; địa chỉ; trạng thái xác minh và hiệu lực | M06, M07, M12, M25, M34, M37, M38 |
| MD02 | Dịch vụ | Loại dịch vụ; lĩnh vực; địa điểm/phương thức cung cấp; trạng thái | M07, M21, M38 |
| MD03 | Năng lực kỹ thuật | Dịch vụ; đối tượng; đại lượng/thông số; phạm vi; phương pháp; độ không đảm bảo đo/CMC khi áp dụng; địa điểm; hiệu lực | M07, M08, M21 |
| MD04 | Loại đối tượng đo/thử nghiệm | Nhóm, loại, đặc tính nhận dạng, yêu cầu xử lý/bảo quản | M07, M09, M11 |
| MD05 | Đại lượng–thông số–đơn vị đo | Đại lượng/thông số; ký hiệu; đơn vị; hệ đơn vị; quy tắc quy đổi | M08, M10, M11, M18, M23 |
| MD06 | Phương pháp kỹ thuật | Loại KĐ/HC/TN/lấy mẫu; mã; phiên bản; phạm vi áp dụng; tình trạng xác nhận/thẩm định; hiệu lực | M08, M09, M10, M11 |
| MD07 | Tiêu chuẩn và tài liệu viện dẫn | Loại tài liệu; số hiệu; phiên bản; nguồn kiểm soát; ngày hiệu lực/hết hiệu lực | M08, M14, M26 |
| MD08 | Nhân sự–năng lực–thẩm quyền | Nhân sự; năng lực theo phương pháp/lĩnh vực; phân công; quyền thực hiện/soát xét/phê duyệt; thời hạn | M03, M07, M08, M11, M21 |
| MD09 | Thiết bị–chuẩn–mẫu chuẩn | Loại và tài sản cụ thể; đặc tính; tình trạng hiệu chuẩn/kiểm định; liên kết chuẩn; phạm vi và trạng thái sử dụng | M05, M08, M10, M19 |
| MD10 | Cơ sở vật chất và địa điểm | Phòng/khu vực/hiện trường; điều kiện môi trường; phạm vi hoạt động được phép | M04, M07, M21 |
| MD11 | Phạm vi công nhận–chỉ định–đăng ký | Cơ quan cấp; quyết định/chứng chỉ; phạm vi; ngày hiệu lực/hết hạn; minh chứng | M07, M21 |
| MD12 | NCC/NTP và phạm vi được phê duyệt | Chủ thể; vai trò; sản phẩm/dịch vụ; năng lực; kết quả đánh giá; thời hạn phê duyệt | M06, M07 |

Danh sách trên là mức tối thiểu. Khi phát sinh dữ liệu chủ mới, CSHDL đề nghị bổ sung vào F34.01; QLCL kiểm tra không trùng nghĩa; LĐV công nhận nguồn theo §6.2.1. Không được tạo thêm nhóm chỉ vì khác tên gọi trên một màn hình nếu bản chất đã thuộc nhóm hiện có.

#### 6.2.4. Quản lý Tổ chức/Cá nhân và vai trò

1. **Một chủ thể — một hồ sơ định danh.** Hồ sơ Tổ chức/Cá nhân là nguồn gốc; “Khách hàng”, “NCC”, “NTP”, “NSX”, “Đối tác” là vai trò, không phải các danh mục định danh độc lập.
2. Một chủ thể được mang nhiều vai trò đồng thời; mỗi vai trò có phạm vi, trạng thái, ngày hiệu lực, ngày hết hiệu lực và hồ sơ phê duyệt riêng khi nghiệp vụ yêu cầu.
3. Người liên hệ, người đại diện pháp luật và chuyên gia là hồ sơ cá nhân được liên kết với tổ chức bằng loại quan hệ và thời hạn; không lặp lại thành chuỗi văn bản ở nhiều danh mục.
4. Trước khi tạo mới phải tra cứu theo định danh tin cậy (mã số thuế, mã đăng ký hoặc mã hệ thống) và danh sách ứng viên tương đồng. **Không tự động hợp nhất chỉ dựa vào tên gần giống.**
5. Hợp nhất bản ghi phải do người có thẩm quyền phê duyệt, giữ mã cũ–mã còn lại, giá trị trước/sau, nguồn, bằng chứng, người và thời điểm; bản ghi đã được hồ sơ nghiệp vụ tham chiếu không được xoá cứng.
6. Trạng thái `Lead/Tiềm năng`, `Đang hoạt động`, `Ngừng giao dịch` là trạng thái quan hệ khách hàng, không thay thế trạng thái phê duyệt hồ sơ chủ thể hoặc trạng thái vai trò.
7. Dữ liệu định danh cá nhân nhạy cảm chỉ thu thập khi có mục đích, căn cứ và phân quyền phù hợp; không dùng làm khóa đối soát toàn cục giữa ManLab và hệ thống bên ngoài.

#### 6.2.5. Quy tắc đối với dữ liệu chủ kỹ thuật

1. Hồ sơ năng lực kỹ thuật phải liên kết tối thiểu: dịch vụ → đối tượng → đại lượng/thông số → phạm vi → phương pháp → nguồn lực/thẩm quyền → phạm vi công nhận/chỉ định khi áp dụng.
2. Loại đối tượng là dữ liệu chủ; phương tiện đo, mẫu hoặc đối tượng cụ thể của khách hàng là hồ sơ nghiệp vụ có mã riêng và dẫn chiếu loại đối tượng.
3. Loại thiết bị/chuẩn/mẫu chuẩn là dữ liệu chủ; từng thiết bị/chuẩn/mẫu chuẩn cụ thể là tài sản có số nhận dạng, lịch sử và trạng thái riêng theo ETV.P05.
4. Mã phương pháp và tài liệu viện dẫn phải gắn phiên bản và hiệu lực. Hồ sơ đã phát hành giữ tham chiếu đến phiên bản được sử dụng tại thời điểm thực hiện.
5. Đơn vị đo và quy tắc quy đổi dùng từ MD05; không cho phép từng module tự tạo ký hiệu hoặc hệ số quy đổi cạnh tranh.
6. Chỉ bản ghi `Hiệu lực` và đủ điều kiện nghiệp vụ mới được chọn cho hồ sơ mới; hồ sơ cũ phải giữ ảnh chụp hoặc tham chiếu phiên bản để truy xuất.

### 6.3. Nhập liệu, hiệu chỉnh và bảo toàn dữ liệu gốc

#### 6.3.1. Nguyên tắc bảo toàn dữ liệu gốc

Dữ liệu đo thô và hồ sơ kỹ thuật đã ghi nhận **không được sửa trực tiếp, không được ghi đè, không được xoá**. Hiệu chỉnh thực hiện bằng bản ghi mới, giữ nguyên giá trị cũ, kèm: giá trị trước, giá trị sau, lý do, người thực hiện, thời điểm (ISO/IEC 17025 §7.5).

#### 6.3.2. Trình tự hiệu chỉnh dữ liệu đã ghi nhận

| Bước | Nội dung thực hiện | Trách nhiệm | Biểu mẫu |
|---|---|---|---|
| 1 | Đề nghị hiệu chỉnh, nêu rõ dữ liệu, giá trị đúng và lý do; đính kèm bằng chứng | NTH | `ETV.P.F 34.02` |
| 2 | Xem xét ảnh hưởng: dữ liệu đã dùng để phát hành kết quả, chứng chỉ hay chưa | QTDL, CSHDL | `ETV.P.F 34.02` |
| 3 | Nếu **đã phát hành** → chuyển ngay sang **ETV.P10, ETV.P11** để kết luận về hiệu lực kết quả trước khi hiệu chỉnh có hiệu lực | QLCL | Theo ETV.P10, ETV.P11 |
| 4 | Thực hiện hiệu chỉnh bằng bản ghi mới; hệ thống giữ nguyên giá trị cũ và ghi vết đầy đủ | QTDL | `ETV.P.F 34.02` |
| 5 | Xem xét mở KPH theo ETV.P13 nếu sai lệch có nguyên nhân hệ thống hoặc lặp lại | QLCL | Theo ETV.P13 |

#### 6.3.3. Kiểm tra khi nhập liệu

Hệ thống phải kiểm tra hợp lệ theo từ điển dữ liệu ngay tại thời điểm nhập: trường bắt buộc, kiểu dữ liệu, miền giá trị, đơn vị đo, quan hệ tham chiếu tới dữ liệu chủ. Dữ liệu nhập từ tệp hoặc từ thiết bị đo phải qua bước kiểm tra tương đương trước khi được ghi nhận chính thức.

### 6.4. Chất lượng dữ liệu (Biểu mẫu F34.02)

#### 6.4.1. Sáu chiều chất lượng

| Chiều | Câu hỏi kiểm tra | Ví dụ chỉ số |
|---|---|---|
| **Chính xác** | Giá trị có phản ánh đúng thực tế không? | Tỷ lệ bản ghi sai phát hiện qua đối chiếu mẫu |
| **Đầy đủ** | Có thiếu bản ghi, thiếu trường bắt buộc không? | Tỷ lệ trường bắt buộc còn trống |
| **Nhất quán** | Cùng một thực thể có mâu thuẫn giữa các nơi không? | Số chênh lệch khi đối chiếu với dữ liệu chủ |
| **Kịp thời** | Dữ liệu có được cập nhật đúng lúc cần dùng không? | Độ trễ trung bình từ khi phát sinh tới khi có trên hệ thống |
| **Duy nhất** | Có bản ghi trùng cho cùng một thực thể không? | Số bản ghi trùng phát hiện trong kỳ |
| **Hợp lệ** | Giá trị có nằm trong miền cho phép của từ điển dữ liệu không? | Tỷ lệ bản ghi vi phạm quy tắc kiểm tra |

#### 6.4.2. Yêu cầu bắt buộc theo nhóm dữ liệu

| Nhóm dữ liệu | Chỉ số bắt buộc | Kỳ đo tối thiểu |
|---|---|---|
| Dữ liệu đo và dữ liệu kỹ thuật | Cả sáu chiều | **03 tháng/lần** |
| Dữ liệu chủ | Duy nhất, nhất quán, đầy đủ | 06 tháng/lần |
| Dữ liệu hồ sơ nghiệp vụ, dữ liệu công bố | Đầy đủ, kịp thời, hợp lệ | 06 tháng/lần |
| Dữ liệu quản trị, dữ liệu HTQL | Đầy đủ, kịp thời | 12 tháng/lần |
| Dữ liệu dùng cho trí tuệ nhân tạo | Theo §6.8 | Trước mỗi lần cập nhật tập dữ liệu |

#### 6.4.3. Ngưỡng chấp nhận

Ngưỡng do CSHDL đề xuất, QLCL soát xét, ghi trong bản ghi tập dữ liệu. Mức tối thiểu áp dụng chung: tập dữ liệu thuộc nhóm **dữ liệu đo và dữ liệu kỹ thuật** và **dữ liệu công bố** phải đạt **100%** ở chiều **hợp lệ** và **đầy đủ** đối với các trường bắt buộc — không chấp nhận ngưỡng thấp hơn.

#### 6.4.4. Xử lý khi dưới ngưỡng

| Tình huống | Xử lý |
|---|---|
| Dưới ngưỡng ở một chiều, không ảnh hưởng kết quả đã phát hành | QTDL lập kế hoạch khắc phục trong **15 ngày làm việc**; đo lại ở kỳ kế tiếp |
| Dưới ngưỡng **02 kỳ liên tiếp** | Bắt buộc mở KPH theo ETV.P13 |
| Sai lệch có khả năng **ảnh hưởng kết quả, chứng chỉ đã phát hành** | Dừng sử dụng dữ liệu liên quan; chuyển ngay **ETV.P10, ETV.P11**; báo cáo LĐV |
| Sai lệch phát sinh từ tích hợp, đồng bộ giữa hệ thống | Xử lý theo **ETV.P37**; tạm ngừng điểm tích hợp nếu tiếp tục sinh dữ liệu sai |
| Dữ liệu chủ có bản ghi trùng | Hợp nhất tại nguồn, giữ lịch sử ánh xạ; không xoá cứng bản ghi đã được tham chiếu |

### 6.5. Khai thác và chia sẻ dữ liệu (Biểu mẫu F34.03)

#### 6.5.1. Khai thác nội bộ

Người dùng chỉ được đọc, sửa dữ liệu trong phạm vi quyền đã được cấp theo ETV.P28. Yêu cầu khai thác vượt quyền hiện có (kết xuất diện rộng, truy cập tập dữ liệu của đơn vị khác, kết nối công cụ phân tích) phải lập phiếu và được **CSHDL phê duyệt**.

#### 6.5.2. Chia sẻ ra ngoài Viện

| Bước | Nội dung thực hiện | Trách nhiệm | Biểu mẫu |
|---|---|---|---|
| 1 | Lập phiếu yêu cầu: bên nhận, mục đích, phạm vi dữ liệu, hình thức và kênh chuyển, thời hạn sử dụng, cam kết bảo mật | Người đề nghị | `ETV.P.F 34.03` |
| 2 | Xác định căn cứ pháp lý và nghĩa vụ đối với **dữ liệu cá nhân**, **dữ liệu khách hàng** (nghĩa vụ bảo mật theo ETV.P02, ISO/IEC 17025 §4.2) | CSHDL, PT.ATTT | `ETV.P.F 34.03` |
| 3 | Xác định biện pháp giảm thiểu: chỉ chia sẻ trường cần thiết, **ẩn danh hoặc giả danh**, giới hạn thời hạn, kênh có bảo vệ | PT.ATTT | `ETV.P.F 34.03` |
| 4 | **Phê duyệt** chia sẻ | **LĐV** | `ETV.P.F 34.03` |
| 5 | Thực hiện trích xuất, chuyển giao đúng phạm vi và kênh đã duyệt; ghi nhật ký | QTDL, QTHT | `ETV.P.F 34.03` |
| 6 | Theo dõi thời hạn; yêu cầu bên nhận xoá hoặc trả lại dữ liệu khi hết mục đích sử dụng | CSHDL | `ETV.P.F 34.03` |

Chia sẻ **định kỳ, tự động** với một bên nhận cố định được thiết lập thành **điểm tích hợp** theo ETV.P37, phê duyệt một lần và rà soát theo chu kỳ — không lập phiếu cho từng lần chuyển.

#### 6.5.3. Cấm tuyệt đối

Chuyển dữ liệu khách hàng, dữ liệu đo, dữ liệu cá nhân ra ngoài qua **kênh cá nhân hoặc dịch vụ chưa được phê duyệt** (thư điện tử cá nhân, tài khoản lưu trữ đám mây cá nhân, ứng dụng nhắn tin cá nhân, dịch vụ trí tuệ nhân tạo công cộng) — vi phạm nghiêm trọng, xử lý theo ETV.P28 và ETV.P13.

### 6.6. Truy xuất nguồn gốc dữ liệu

Tập dữ liệu thuộc nhóm **dữ liệu đo và dữ liệu kỹ thuật** và **dữ liệu công bố** phải ghi nhận đủ để lần ngược: nguồn phát sinh (thiết bị, người nhập, hệ thống bên ngoài) · các bước biến đổi, tính toán đã áp dụng và phiên bản quy tắc tính · người và thời điểm của mỗi lần ghi nhận, hiệu chỉnh · kết quả, báo cáo, chứng chỉ đã sử dụng dữ liệu đó.

Yêu cầu này là điều kiện để đáp ứng ISO/IEC 17025 §7.11 và để phục vụ truy xuất nguồn gốc chứng chỉ số theo **ETV.P36**. Nhật ký thao tác trên dữ liệu phải **không sửa được** và được lưu theo ETV.P28 mục 6.7.5.

### 6.7. Vòng đời dữ liệu số

#### 6.7.1. Ba giai đoạn

| Giai đoạn | Ý nghĩa | Yêu cầu |
|---|---|---|
| **Hoạt động** | Dữ liệu đang được dùng cho công việc hằng ngày | Đầy đủ quyền truy cập, đo chất lượng theo kỳ |
| **Lưu trữ** | Hết nhu cầu sử dụng thường xuyên nhưng còn trong thời hạn lưu | Hạn chế quyền ghi; giữ khả năng đọc và truy xuất; vẫn chịu yêu cầu bảo vệ theo mức phân loại |
| **Đề nghị huỷ** | Đã hết thời hạn lưu theo ETV.P15, ETV.P.F 14.06 và pháp luật chuyên ngành | Chỉ được huỷ sau khi kiểm tra ràng buộc tại §6.7.2 và có phê duyệt của LĐV |

#### 6.7.2. Điều kiện trước khi huỷ

Không được huỷ tập dữ liệu khi: chưa hết thời hạn lưu theo quy định pháp luật hoặc theo ETV.P15 · dữ liệu còn là căn cứ của kết quả, chứng chỉ đang còn hiệu lực · còn khiếu nại, tranh chấp, vụ việc hoặc cuộc đánh giá đang xử lý liên quan tới dữ liệu đó · còn tập dữ liệu khác, báo cáo hoặc điểm tích hợp phụ thuộc mà chưa được xử lý.

Việc **huỷ dữ liệu về mặt kỹ thuật** (phương pháp huỷ an toàn, biên bản huỷ, xử lý bản sao lưu) thực hiện theo **ETV.P27**; thủ tục này chỉ quyết định **dữ liệu nào được phép chuyển sang đề nghị huỷ và khi nào**.

#### 6.7.3. Bản sao và dữ liệu ngoài hệ thống

Bản sao dữ liệu tạo ra để phục vụ công việc (kết xuất, tệp làm việc) phải được xoá khi hết mục đích, **không** được coi là nguồn dữ liệu và **không** được dùng làm căn cứ nghiệp vụ. Nghiêm cấm lưu trữ lâu dài dữ liệu công việc trên thiết bị cá nhân hoặc dịch vụ cá nhân (ETV.P28 mục 6.7.9).

### 6.8. Dữ liệu dùng cho hệ thống trí tuệ nhân tạo

Dữ liệu của Viện chỉ được dùng làm dữ liệu ngữ cảnh, tập tri thức hoặc dữ liệu đánh giá cho hệ thống trí tuệ nhân tạo khi có đủ:

1. Bản ghi tập dữ liệu trong danh mục, ghi rõ **mức phân loại** và có/không chứa dữ liệu cá nhân;
2. **Phê duyệt của LĐV** cho mục đích sử dụng đó, có ý kiến của PT.ATTT;
3. Hồ sơ đánh giá tác động AI theo **ETV.P29**;
4. Biện pháp giảm thiểu tương ứng mức phân loại: loại bỏ hoặc ẩn danh dữ liệu cá nhân, loại trừ dữ liệu mức **Mật**, giới hạn phạm vi truy xuất.

Dữ liệu mức **Hạn chế** và **Mật** **không** được đưa vào hệ thống trí tuệ nhân tạo — không lập chỉ mục, không đưa vào lời nhắc, không truy xuất trực tiếp — theo **ETV.P28 mục 6.13** và **ETV.P26 mục 5.5** (hai thủ tục đang có hiệu lực). Quy tắc gốc về dữ liệu cấp cho AI nằm ở **ETV.P29 mục 5.5**; thủ tục này không quy định lại và không nới rộng. Kết quả do hệ thống AI sinh ra **không** được ghi đè lên dữ liệu gốc và phải được đánh dấu rõ nguồn gốc khi lưu vào hệ thống.

### 6.9. Báo cáo và soát xét

QLCL tổng hợp **06 tháng/lần** và trước mỗi cuộc họp xem xét của lãnh đạo (ETV.P17): tổng số tập dữ liệu theo nhóm, mức phân loại và giai đoạn vòng đời; kết quả đo chất lượng theo chiều và tỷ lệ đạt ngưỡng; tập dữ liệu dưới ngưỡng và tình trạng khắc phục; số lần hiệu chỉnh dữ liệu đã ghi nhận và trường hợp ảnh hưởng kết quả đã phát hành; yêu cầu chia sẻ dữ liệu ra ngoài đã phê duyệt và tình trạng thu hồi; trường hợp bảng tra song song, dữ liệu chuyển ra ngoài kênh chưa duyệt phát hiện trong kỳ; tập dữ liệu đến hạn rà soát, đến hạn chuyển giai đoạn vòng đời.

Thủ tục này được soát xét định kỳ theo ETV.P14 §6.10, hoặc đột xuất khi có thay đổi lớn về kiến trúc dữ liệu hoặc yêu cầu pháp lý về bảo vệ dữ liệu.

---

## VII. BIỂU MẪU ÁP DỤNG

| Mã biểu mẫu | Tên biểu mẫu | Nơi lưu bản gốc |
|---|---|---|
| **ETV.P.F 34.01** | Danh mục dữ liệu số và từ điển dữ liệu | `06_SHARED_RESOURCES/01_Forms/` |
| **ETV.P.F 34.02** | Phiếu đo chất lượng và hiệu chỉnh dữ liệu | `06_SHARED_RESOURCES/01_Forms/` |
| **ETV.P.F 34.03** | Phiếu yêu cầu khai thác, chia sẻ dữ liệu | `06_SHARED_RESOURCES/01_Forms/` |

Biên bản huỷ dữ liệu và hồ sơ sao lưu, phục hồi dùng biểu mẫu của **ETV.P27**; phiếu quyền truy cập dùng **F28.04** của ETV.P28; phiếu thay đổi cấu trúc dữ liệu dùng **F30.02** của ETV.P30; hồ sơ điểm tích hợp dùng biểu mẫu của ETV.P37; phiếu hành động khắc phục dùng biểu mẫu của ETV.P13 — **không** lập biểu mẫu mới ở thủ tục này (nguyên tắc một nơi duy nhất, ETV.P14).

---

## VIII. LƯU HỒ SƠ

Việc lập, lưu giữ, bảo quản, tra cứu, phân quyền truy cập và thanh lý hồ sơ thực hiện theo **ETV.P15 – Kiểm soát hồ sơ**; thời hạn lưu và phân quyền chi tiết theo **ETV.P.F 14.06 (Danh mục phân quyền và thời hạn lưu)**. Thủ tục này **không** quy định lại cơ chế lưu trữ, chỉ đăng ký các hồ sơ phát sinh và thời hạn đề xuất để cập nhật vào danh mục đó.

| Hồ sơ | Người lưu | Thời hạn lưu đề xuất |
|---|---|---|
| Danh mục dữ liệu số và từ điển dữ liệu (F34.01), các phiên bản | QLCL | Vĩnh viễn trên ManLab |
| Phiếu đo chất lượng và hiệu chỉnh dữ liệu (F34.02) | QTDL, sao gửi QLCL | 05 năm |
| Phiếu yêu cầu khai thác, chia sẻ dữ liệu (F34.03) | QLCL | 10 năm |
| Hồ sơ phê duyệt chia sẻ dữ liệu ra ngoài và bằng chứng thu hồi, xoá sau khi hết hạn | QLCL, sao gửi PT.ATTT | 10 năm |
| Hồ sơ hiệu chỉnh dữ liệu ảnh hưởng kết quả đã phát hành | QLCL | Theo thời hạn hồ sơ kỹ thuật tương ứng (ETV.P15) |
| Quyết định công nhận dữ liệu chủ và nguồn sự thật duy nhất | QLCL | Vĩnh viễn trên ManLab |
| Hồ sơ phê duyệt dữ liệu dùng cho hệ thống trí tuệ nhân tạo | QLCL, sao gửi PT.ATTT | Theo ETV.P29 |
| Biên bản huỷ dữ liệu | Theo ETV.P27 | Theo ETV.P27 |
| Báo cáo tình hình dữ liệu số phục vụ xem xét của lãnh đạo | QLCL | Theo ETV.P17 |

---

## IX. CÁC PHỤ LỤC

### Phụ lục I — Ma trận kiểm soát rủi ro và điều kiện chặn cứng

*(Dẫn chiếu từ §6.1, §6.2, §6.3, §6.4, §6.5, §6.7, §6.8. Hệ thống ManLab thực thi các điều kiện này bằng ràng buộc kỹ thuật.)*

**I.1. Điều kiện chặn cứng**

| TT | Điều kiện | Áp dụng cho |
|---|---|---|
| 1 | Có **chủ sở hữu dữ liệu** và **người quản trị dữ liệu nghiệp vụ** là người cụ thể | Mọi tập dữ liệu |
| 2 | Có **mức phân loại thông tin** và khai báo có/không chứa dữ liệu cá nhân | Mọi tập dữ liệu |
| 3 | Có **từ điển dữ liệu** | Dữ liệu đo, dữ liệu kỹ thuật, dữ liệu chủ, dữ liệu công bố |
| 4 | Có **chỉ số chất lượng, ngưỡng và kỳ đo** | Mọi tập dữ liệu ở giai đoạn Hoạt động |
| 5 | Có **căn cứ thời hạn lưu** (ETV.P15, ETV.P.F 14.06 hoặc pháp luật chuyên ngành) | Mọi tập dữ liệu |
| 6 | Có **phê duyệt của LĐV** và ý kiến PT.ATTT | Chia sẻ dữ liệu ra ngoài Viện; huỷ dữ liệu; dùng dữ liệu cho hệ thống AI |
| 7 | Bản ghi danh mục **không chứa nội dung dữ liệu thật** | Mọi tập dữ liệu |

**I.2. Các tình huống bị chặn hoặc phải xử lý bắt buộc**

| Tình huống | Xử lý |
|---|---|
| Tập dữ liệu không có chủ sở hữu dữ liệu | **Không cho lưu** |
| **Sửa đè, ghi đè hoặc xoá dữ liệu đo thô, hồ sơ kỹ thuật** đã ghi nhận | **Cấm tuyệt đối**; phát hiện thì lập KPH theo ETV.P13 và xử lý theo ETV.P28 |
| Hiệu chỉnh dữ liệu đã dùng để phát hành kết quả mà **chưa qua ETV.P10, ETV.P11** | **Chặn thao tác** cho tới khi có kết luận về hiệu lực kết quả |
| Duy trì **bảng tra song song** cho dữ liệu chủ đã có nguồn chính thức | Không phù hợp; xử lý theo §6.2.2 |
| Chất lượng **dưới ngưỡng 02 kỳ liên tiếp** | Bắt buộc mở KPH theo ETV.P13 |
| Dữ liệu đo, dữ liệu công bố không đạt **100%** ở chiều hợp lệ và đầy đủ (trường bắt buộc) | **Không chấp nhận**; dừng sử dụng cho tới khi khắc phục |
| Chuyển dữ liệu khách hàng, dữ liệu đo, dữ liệu cá nhân qua **kênh cá nhân hoặc dịch vụ chưa được phê duyệt** | **Cấm tuyệt đối**; xử lý theo ETV.P28 và ETV.P13 |
| Chia sẻ dữ liệu ra ngoài mà **không giới hạn phạm vi trường, không ẩn danh** khi có biện pháp giảm thiểu khả thi | **Không chấp nhận** |
| Đưa dữ liệu mức **Hạn chế, Mật** lên dịch vụ trí tuệ nhân tạo công cộng | **Cấm tuyệt đối** |
| Kết quả do AI sinh ra **ghi đè lên dữ liệu gốc** hoặc lưu mà không đánh dấu nguồn gốc | **Không chấp nhận** (§6.8) |
| Huỷ dữ liệu khi chưa hết thời hạn lưu, còn là căn cứ của kết quả còn hiệu lực, hoặc còn vụ việc liên quan | **Chặn thao tác** (§6.7.2) |
| Huỷ dữ liệu mà thiếu phê duyệt của LĐV hoặc thiếu xác nhận phương pháp huỷ của PT.ATTT | **Chặn thao tác** |
| Tập dữ liệu chứa dữ liệu cá nhân **quá 06 tháng chưa rà soát** | Cảnh báo CSHDL; quá 02 chu kỳ → báo cáo LĐV |
| Trợ lý AI tự sửa dữ liệu vận hành, phê duyệt chia sẻ, kết luận chất lượng hoặc tự huỷ dữ liệu | **Cấm tuyệt đối** |

### Phụ lục II — Bảng trạng thái và thẩm quyền thao tác

*(Dẫn chiếu từ §6.1.3, §6.4, §6.5, §6.7)*

**II.1. Bản ghi tập dữ liệu (F34.01)**

| STT | Trạng thái | Ý nghĩa | Người thao tác | Bắt buộc lý do |
|---|---|---|---|---|
| 1 | Nháp | Đang khai báo | QTDL | Không |
| 2 | Chờ soát xét | Chờ xác nhận mức phân loại và kiểm tra trùng lặp | QTDL | Không |
| 3 | Không soát xét | Bị trả lại để sửa | QLCL, PT.ATTT (≠ người lập) | **Có** |
| 4 | Chờ phê duyệt | Chờ chủ sở hữu dữ liệu | QLCL | Không |
| 5 | Không phê duyệt | Bị trả lại để sửa | CSHDL | **Có** |
| 6 | Hiệu lực | Đang được sử dụng, giai đoạn **Hoạt động** | CSHDL | Không |
| 7 | Lưu trữ | Hết nhu cầu sử dụng thường xuyên, còn trong thời hạn lưu | CSHDL, QLCL | **Có** |
| 8 | Đề nghị huỷ | Hết thời hạn lưu, chờ kiểm tra ràng buộc và phê duyệt | QLCL | **Có** |
| 9 | Đã huỷ | Đã huỷ theo ETV.P27; **bản ghi danh mục vẫn giữ** để truy vết | **LĐV** | **Có** |
| 10 | Huỷ bản ghi | Khai báo sai hoặc trùng, bỏ trước khi phê duyệt | QLCL | **Có** |

Cờ **Đến hạn rà soát**, **Chất lượng dưới ngưỡng**, **Đến hạn chuyển giai đoạn vòng đời** không phải trạng thái hồ sơ mà là cảnh báo tính theo dữ liệu bản ghi.

**II.2. Các đối tượng khác**

| Đối tượng | Chuỗi trạng thái | Thẩm quyền kết thúc |
|---|---|---|
| Phiếu đo chất lượng (F34.02 – phần đo) | Mới → Đang đo → Có kết quả → Đạt / Không đạt | QTDL (Đạt) · QLCL (Không đạt, quyết định mở KPH) |
| Đề nghị hiệu chỉnh dữ liệu (F34.02 – phần hiệu chỉnh) | Mới → Đang xem xét ảnh hưởng → Chờ kết luận ETV.P10/P11 *(nếu đã phát hành)* → Đã hiệu chỉnh / Từ chối | CSHDL · LĐV (khi ảnh hưởng kết quả đã phát hành) |
| Phiếu khai thác, chia sẻ dữ liệu (F34.03) | Nháp → Chờ ý kiến ATTT → Chờ phê duyệt → Đã phê duyệt → Đã thực hiện → Đã thu hồi / Từ chối | CSHDL (nội bộ) · **LĐV** (ra ngoài Viện) |

Mọi nhánh **Từ chối**, **Không phê duyệt**, **Không soát xét**, **Không đạt**, **Đã huỷ** bắt buộc ghi lý do.

---

*Thủ tục Quản lý dữ liệu số — ETV.P 34 — Lần BH: 01 — Trang tài liệu điện tử, không áp dụng đánh số trang thủ công (bản in xuất từ ManLab tự sinh header/footer theo ETV.P14 §6.4).*
