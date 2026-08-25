---
# Khối metadata AI — bắt buộc cho mọi văn bản kiểm soát (ETV.P14 §6.3)
id: ETV.P33
title: "Thủ tục Quản lý hệ thống thông tin"
type: Thu-tuc
owner: "Chánh Văn phòng (đơn vị chủ trì quản trị hệ thống thông tin)"
department: "Toàn Viện"
process: MP33_HeThongTT
capability: [CAP-28_ATTT]
module: M33_HeThongTT
effective_date: ""
revision: "01"
status: Cho-soat-xet
keywords: [hệ thống thông tin, hạ tầng công nghệ thông tin, kiểm kê tài sản, bảo trì, vá lỗi, tài khoản hệ thống, ISO/IEC 27001 A.5.9, ISO 9001 §7.1.3]
related_documents: [ETV.QM, ETV.P01, ETV.P02, ETV.P03, ETV.P05, ETV.P06, ETV.P08, ETV.P10, ETV.P11, ETV.P13, ETV.P14, ETV.P15, ETV.P16, ETV.P17, ETV.P26, ETV.P27, ETV.P28, ETV.P29, ETV.P30, ETV.P31, ETV.P32, ETV.P34, ETV.P35]
iso_clause: ["ISO 9001:2015 §7.1.3, §9.3", "ISO/IEC 17025:2017 §6.4, §7.11", "ISO 17034:2016 §7.4", "ISO/IEC 27001:2022 A.5.9, A.7.9–A.7.10, A.8.1, A.8.7–A.8.9, A.8.19–A.8.22, A.8.32", "ISO/IEC 42001:2023 §8.1"]
legal_basis: ["Luật Giao dịch điện tử 20/2023/QH15", "Pháp luật hiện hành về an toàn thông tin mạng", "Pháp luật hiện hành về sở hữu trí tuệ đối với phần mềm"]
ai_tags: [it-asset, maintenance, patching, system-account]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Vĩnh viễn (bản hiện hành) — xem chi tiết theo loại tại ETV.P.F 14.06"
digital_signature: "LĐV"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV)"
supersedes: null
superseded_by: null
---
# THỦ TỤC QUẢN LÝ HỆ THỐNG THÔNG TIN

**Procedure For Information System Management**

|                   |                                          |
| ----------------- | ---------------------------------------- |
| **Mã số**         | ETV.P 33                                 |
| **Lần ban hành**  | 01                                       |
| **Ngày ban hành** | ..../..../........                       |
| **Biên soạn**     | Dương Thành Nam — ..../..../........     |
| **Soát xét**      | Đỗ Văn Vinh — Lãnh đạo Phòng, ..../..../........ |
| **Phê duyệt**     | Nguyễn Hoàng Giang — Lãnh đạo Viện, ..../..../........ |

> **Tình trạng bản này: CHỜ SOÁT XÉT** — dự thảo lần đầu, chưa có hiệu lực. Bản này chỉ được áp dụng sau khi Lãnh đạo Viện phê duyệt và chuyển trạng thái **Đã phê duyệt** theo ETV.P14.

> **Chú ý:** Tài liệu nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện Kiểm định Công nghệ và Môi trường.

> **Ghi chú soạn thảo.** Dự thảo lấy đặc tả module `M33_HeThongTT/01_Requirement/DacTa.md` làm đầu vào và **chốt** các điểm mà đặc tả để ngỏ: ranh giới kiểm kê với ETV.P27 (§2.3), vai trò đối với tài khoản hệ thống (§6.4), thời hạn vá lỗi bảo mật (§6.3.3), điều kiện dùng thiết bị cá nhân (§6.2.4), ngưỡng sự cố lặp (§6.5.4), phạm vi dịch vụ thuê ngoài (§2.1) và lộ trình kiểm kê kỳ đầu (§6.1.5). Các **giá trị định lượng** là **đề xuất**, cần Viện xác nhận cho khớp nguồn lực thực tế trước khi ban hành.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian | Nội dung thay đổi | Lần ban hành |
| ---------- | ------------------- | -------------- |
| ..../..../........ | Ban hành lần thứ nhất. Thủ tục mới, hiện thực hoá Sổ tay chất lượng §10.2 và quy trình MP33; chốt các điểm ranh giới đã được ETV.P28 và ETV.P35 (đã ban hành) giao cho MP33 | 01 |

---

## I. MỤC ĐÍCH

Thủ tục này quy định nội dung, trách nhiệm và trình tự **kiểm kê, đưa vào vận hành, bảo trì, vá lỗi, kiểm soát tài khoản kỹ thuật, xử lý sự cố và ngừng vận hành** đối với hạ tầng công nghệ thông tin của Viện ETV, nhằm đáp ứng yêu cầu Điều 7.1.3 của ISO 9001:2015, Điều 6.4 và 7.11 của ISO/IEC 17025:2017, các kiểm soát A.5.9, A.7.9–A.7.10, A.8.1, A.8.7–A.8.9, A.8.19–A.8.22 của ISO/IEC 27001:2022 và Mục 10.2 của Sổ tay chất lượng. Cụ thể để:

1. Bảo đảm **không có hạ tầng vô chủ** — mỗi cấu phần đều có người quản trị và đơn vị sử dụng xác định.
2. Bảo đảm hạ tầng **đúng cấu hình an toàn, được vá lỗi và bảo trì đúng hạn**, có phương án khôi phục khi hỏng.
3. Bảo đảm **mọi tài khoản tồn tại trên hệ thống đều truy được về một phiếu đã phê duyệt** theo ETV.P28 — không có tài khoản ngoài phiếu.
4. Bảo đảm thay đổi trên **máy tính điều khiển, thu thập dữ liệu của thiết bị đo** không được thực hiện trước khi đánh giá ảnh hưởng tới hiệu lực kết quả đo.
5. Bảo đảm thiết bị **không rời khỏi Viện khi dữ liệu chưa được xoá an toàn** (thanh lý, chuyển giao, gửi sửa chữa bên ngoài).
6. Cung cấp dữ liệu hạ tầng trọng yếu và thời gian khôi phục làm đầu vào cho kế hoạch duy trì liên tục hoạt động (ETV.P31) và cho xem xét của lãnh đạo (ETV.P17).

Áp dụng thống nhất trong toàn Viện ETV, thực hiện qua phần mềm ManLab (Module M33 – Quản lý hệ thống thông tin).

---

## II. PHẠM VI ÁP DỤNG

### 2.1. Đối tượng áp dụng

Áp dụng cho toàn bộ đơn vị, phòng ban, cá nhân thuộc Viện ETV và cho **mọi cấu phần hạ tầng công nghệ thông tin** phục vụ công việc của Viện:

| TT | Lớp tài sản | Ví dụ |
|---|---|---|
| 1 | Máy chủ | Máy chủ vật lý, máy chủ ảo, máy chủ thuê tại trung tâm dữ liệu |
| 2 | Thiết bị mạng | Switch, router, tường lửa, điểm truy cập không dây |
| 3 | Máy trạm, máy tính xách tay | Máy tính của nhân viên, máy tính dùng chung |
| 4 | Thiết bị di động | Điện thoại, máy tính bảng dùng cho công việc |
| 5 | **Máy tính điều khiển, thu thập dữ liệu của thiết bị đo** | Máy tính gắn với thiết bị kiểm định, hiệu chuẩn, thử nghiệm |
| 6 | Thiết bị lưu trữ | NAS, ổ cứng ngoài, băng từ |
| 7 | Thiết bị ngoại vi | Máy in, máy quét, bộ lưu điện |
| 8 | Phần mềm và bản quyền | Hệ điều hành, phần mềm chuyên dụng, giấy phép sử dụng |
| 9 | Dịch vụ công nghệ thông tin thuê ngoài | Hạ tầng đám mây, hosting, thư điện tử, tên miền, chứng thư số máy chủ |
| 10 | Thiết bị ký số | USB token chữ ký số của tổ chức và cá nhân |

**Dịch vụ thuê ngoài** được kiểm kê tại thủ tục này với tư cách **hạ tầng**; nếu dịch vụ đó đồng thời là một nền tảng phần mềm phục vụ nghiệp vụ thì phải **đăng ký thêm** bản ghi nền tảng theo ETV.P35 và liên kết hai bản ghi với nhau.

Dữ liệu được quản lý thống nhất trên phần mềm ManLab (Module M33 – Quản lý hệ thống thông tin).

### 2.2. Nguyên tắc áp dụng

**Nguyên tắc 1 — Kiểm kê một lần, không hai nơi.** Thủ tục này kiểm kê **thiết bị, hệ thống, phần mềm**; ETV.P27 kiểm kê **dữ liệu và tài sản thông tin** nằm trên các thiết bị đó và trỏ xuống bằng tham chiếu hệ thống. Báo cáo kiểm kê tài sản phục vụ ISO/IEC 27001 A.5.9 là **hợp của hai danh mục**, xuất từ một màn hình chung; không lập hai danh mục thiết bị song song.

> **Chốt điểm lệch câu chữ:** ETV.P28 mục 5.7.2 viết thiết bị đầu cuối "được đăng ký trong danh mục tài sản (ETV.MP27)", trong khi ETV.P35 mục 2.3 giao "thiết bị đầu cuối" cho ETV.P33. Cách hiểu thống nhất kể từ thủ tục này: **thiết bị đăng ký tại ETV.P33**, **dữ liệu trên thiết bị đăng ký tại ETV.P27**. Yêu cầu cấu hình an toàn của ETV.P28 mục 5.7.2 vẫn áp dụng nguyên, được thực thi và kiểm chứng tại §6.2.3 của thủ tục này.

**Nguyên tắc 2 — Thực thi, không phê duyệt.** Đối với quyền truy cập, thủ tục này giữ vai trò **người thực hiện**: cấp, thay đổi, thu hồi tài khoản theo phiếu **F28.04 đã được phê duyệt** tại ETV.P28. Quản trị hệ thống **không** phê duyệt quyền cho chính mình hoặc cho người khác.

**Nguyên tắc 3 — Hồ sơ quản trị, không phải hệ thống giám sát.** Thủ tục này giữ **bằng chứng quản trị** (thiết bị nào đang ở đâu, ai chịu trách nhiệm, đã vá lỗi và bảo trì tới đâu, tài khoản nào tồn tại theo phiếu nào), **không** thay thế công cụ giám sát kỹ thuật, không tự thu thập nhật ký và không tự quét lỗ hổng.

### 2.3. Ngoài phạm vi

Thủ tục này **không** thay thế và **không** trùng lặp với:

| Nội dung | Thuộc thủ tục |
|---|---|
| Đăng ký, đánh giá trước vận hành, giám sát và ngừng vận hành **nền tảng số** (phần mềm nghiệp vụ) | ETV.P35 – Quản lý nền tảng số |
| Kiểm kê **dữ liệu và tài sản thông tin**; sao lưu, phục hồi, huỷ dữ liệu an toàn | ETV.P27 – Quản trị dữ liệu và tài sản thông tin |
| Chất lượng, vòng đời và kiểm soát truy xuất **dữ liệu số** | ETV.P34 – Quản lý dữ liệu số |
| Chính sách an toàn thông tin, đánh giá rủi ro, SoA, **phê duyệt quyền truy cập**, kết luận sự cố an toàn thông tin | ETV.P28 – Quản lý an toàn thông tin |
| Thẩm định và phê duyệt thay đổi | ETV.P30 – Quản lý thay đổi |
| Kết luận về hiệu lực kết quả đo bị ảnh hưởng | ETV.P10 · ETV.P11 |
| Hiệu chuẩn, kiểm định, vòng đời **thiết bị đo** | ETV.P05 – Quản lý thiết bị |
| Mua sắm, thuê dịch vụ, đánh giá nhà cung cấp | ETV.P06 – Quản lý mua sắm |
| Kế hoạch duy trì liên tục hoạt động, diễn tập khôi phục | ETV.P31 – Quản lý tính liên tục hoạt động |
| Đánh giá tác động và kiểm soát hệ thống trí tuệ nhân tạo | ETV.P29 – Quản lý hệ thống trí tuệ nhân tạo |
| Sáng kiến, lộ trình chuyển đổi số | ETV.P32 – Chuyển đổi số và cải tiến hệ thống |
| Nhận diện, đánh giá, xử lý rủi ro | ETV.P01 – Rủi ro và cơ hội |
| Sự không phù hợp và hành động khắc phục | ETV.P13 – Khắc phục, cải tiến |
| Lưu trữ hồ sơ phát sinh | ETV.P15 – Kiểm soát hồ sơ |

> **Phân biệt cốt lõi:** ETV.P28 **đặt yêu cầu** bảo mật; **ETV.P33 vận hành hạ tầng** đáp ứng yêu cầu đó và giữ bằng chứng; ETV.P35 quản lý **phần mềm nghiệp vụ chạy trên hạ tầng**; ETV.P27 quản lý **dữ liệu nằm trong đó**. Một sự cố máy chủ có thể kích hoạt cả bốn, nhưng mỗi thủ tục giữ đúng vai của mình.

---

## III. TÀI LIỆU VIỆN DẪN

> Nguyên tắc: **chỉ dẫn chiếu, không chép lại nội dung.** Bản đầy đủ đặt tại `03_MANAGEMENT_SYSTEM/` (chuẩn mực) và `08_KNOWLEDGE_GRAPH/01_Regulations/` (pháp luật). QLCL rà soát hiệu lực và văn bản thay thế trước mỗi lần ban hành lại.

### 3.1. Tiêu chuẩn

- ISO 9001:2015 §7.1.3 (Cơ sở hạ tầng); §9.3
- ISO/IEC 17025:2017 §6.4 (Thiết bị); §7.11 (Kiểm soát dữ liệu và quản lý thông tin)
- ISO 17034:2016 §7.4 (Kiểm soát dữ liệu)
- ISO/IEC 27001:2022 A.5.9 (Kiểm kê tài sản); A.7.9–A.7.10 (Tài sản ngoài khuôn viên, phương tiện lưu trữ); A.8.1 (Thiết bị đầu cuối); A.8.7 (Phòng chống mã độc); A.8.8 (Quản lý lỗ hổng kỹ thuật); A.8.9 (Quản lý cấu hình); A.8.19–A.8.22 (Cài đặt phần mềm, an toàn mạng, dịch vụ mạng, phân tách mạng); A.8.32 (Quản lý thay đổi)
- ISO/IEC 42001:2023 §8.1 (Kiểm soát vận hành hệ thống AI)
- `11_COMPLIANCE/01_ISO_Mapping/MP-ISO-mapping.md` — bảng ánh xạ đầy đủ MP ↔ điều khoản

### 3.2. Văn bản pháp luật

- Luật Giao dịch điện tử số 20/2023/QH15 — chữ ký số, chứng thư số dùng trên hệ thống của Viện
- Pháp luật hiện hành về **an toàn thông tin mạng** — bảo đảm an toàn hệ thống thông tin
- Pháp luật hiện hành về **sở hữu trí tuệ đối với phần mềm** — nghiêm cấm cài đặt, sử dụng phần mềm không có bản quyền hợp lệ trên hạ tầng của Viện
- Pháp luật hiện hành về **bảo vệ dữ liệu cá nhân** — áp dụng khi hạ tầng lưu trữ, xử lý dữ liệu cá nhân

### 3.3. Văn bản nội bộ Viện ETV

- Sổ tay quản lý chất lượng (ETV.QM) §10.2 và §7.11
- ETV.P01 – Quản lý rủi ro và cơ hội · ETV.P02 – Bảo mật thông tin · ETV.P03 – Quản lý nhân sự · ETV.P05 – Quản lý thiết bị
- ETV.P06 – Quản lý mua sắm · ETV.P08 – Lựa chọn, xác nhận giá trị sử dụng phương pháp · ETV.P10 – Đảm bảo giá trị sử dụng kết quả
- ETV.P11 – Báo cáo kết quả · ETV.P13 – Khắc phục, cải tiến · ETV.P14 – Kiểm soát tài liệu · ETV.P15 – Kiểm soát hồ sơ
- ETV.P16 – Đánh giá nội bộ/bên ngoài · ETV.P17 – Xem xét của lãnh đạo · ETV.P26 – Quản lý tri thức tổ chức
- ETV.P27 – Quản trị dữ liệu và tài sản thông tin
- ETV.P28 – Quản lý an toàn thông tin · ETV.P29 – Quản lý hệ thống trí tuệ nhân tạo · ETV.P30 – Quản lý thay đổi
- ETV.P31 – Quản lý tính liên tục hoạt động · ETV.P32 – Chuyển đổi số và cải tiến hệ thống · ETV.P34 – Quản lý dữ liệu số · ETV.P35 – Quản lý nền tảng số

---

## IV. THUẬT NGỮ, ĐỊNH NGHĨA VÀ CHỮ VIẾT TẮT

### 4.1. Thuật ngữ và định nghĩa

Định nghĩa chung ("tài sản", "hệ thống thông tin", "sự cố"...) theo ISO 9000:2015 và ISO/IEC 27000 — không nhắc lại tại đây. Các thuật ngữ riêng của thủ tục này:

| Thuật ngữ | Định nghĩa |
|---|---|
| **Hạ tầng công nghệ thông tin** | Toàn bộ cấu phần vật lý, ảo hoá, phần mềm nền và dịch vụ thuê ngoài tạo nên môi trường chạy các nền tảng số và công việc của Viện (danh sách lớp tài sản tại §2.1) |
| **Tài sản công nghệ thông tin** | Một cấu phần hạ tầng được kiểm kê thành một bản ghi độc lập, có mã tài sản, chủ quản trị, đơn vị sử dụng, môi trường, vùng mạng và mức trọng yếu |
| **Chủ quản trị** (custodian) | Người thuộc bộ phận quản trị hệ thống chịu trách nhiệm kỹ thuật về tài sản: cấu hình, bảo trì, vá lỗi, khôi phục |
| **Đơn vị sử dụng** (user owner) | Phòng, bộ phận hoặc cá nhân được giao sử dụng tài sản và chịu trách nhiệm bảo quản, sử dụng đúng quy định |
| **Mức trọng yếu** | Mức độ ảnh hưởng tới Viện nếu tài sản hỏng hoặc ngừng hoạt động, gồm ba mức Thấp, Trung bình, Cao (§6.1.3) |
| **Mục tiêu thời gian khôi phục** (RTO) | Khoảng thời gian mục tiêu để đưa tài sản trở lại hoạt động, tính từ thời điểm hỏng; xác định theo ETV.P31 |
| **Vùng mạng** | Phân vùng logic của mạng Viện theo ETV.P28 mục 5.7.3: vùng quản trị – văn phòng · **vùng thiết bị đo và hệ thống thu thập dữ liệu** · vùng khách – Wi-Fi công cộng |
| **Môi trường** | Ngữ cảnh sử dụng của tài sản: **Vận hành** · **Kiểm thử** · **Phát triển**; áp dụng thống nhất với ETV.P35 |
| **Bảo trì** | Công việc kỹ thuật theo kế hoạch hoặc đột xuất nhằm giữ tài sản ở tình trạng hoạt động được: kiểm tra, vệ sinh, thay thế linh kiện, cập nhật phần mềm nền |
| **Vá lỗi bảo mật** | Việc cài đặt bản sửa lỗi do nhà cung cấp phát hành nhằm khắc phục lỗ hổng đã công bố; thời hạn theo §6.3.3 |
| **Tài khoản hệ thống** | Một tài khoản tồn tại trên một hệ thống cụ thể, gắn với một phiếu quyền truy cập đã phê duyệt (F28.04) |
| **Tài khoản dịch vụ** | Tài khoản dùng cho tiến trình tự động, không gắn với một cá nhân; phải có người chịu trách nhiệm và được rà soát như tài khoản đặc quyền |
| **Sự cố kỹ thuật** | Sự việc làm tài sản hạ tầng ngừng hoạt động, hoạt động sai hoặc suy giảm, chưa có kết luận là sự cố an toàn thông tin |
| **Hết vòng đời** (EOL) | Thời điểm nhà cung cấp ngừng hỗ trợ kỹ thuật và ngừng phát hành bản vá cho tài sản |
| **Xoá dữ liệu an toàn** | Việc xoá dữ liệu bằng phương pháp không thể khôi phục được bằng công cụ thông thường, có biên bản xác nhận theo ETV.P27 |

### 4.2. Chữ viết tắt

| Chữ viết tắt | Ý nghĩa |
|---|---|
| ETV | Viện Kiểm định Công nghệ và Môi trường |
| HTQL | Hệ thống quản lý |
| LĐV | Lãnh đạo Viện |
| LĐP / TP | Lãnh đạo Phòng / Trưởng phòng, người phụ trách lĩnh vực |
| NTH | Người thực hiện (mọi nhân sự, không phân biệt chức vụ) |
| VP | Văn phòng — đơn vị chủ trì quản trị hệ thống thông tin |
| QTHT | Quản trị hệ thống |
| PT.ATTT | Người phụ trách an toàn thông tin |
| QLCL | Phụ trách Quản lý chất lượng |
| QLKT | Phụ trách Quản lý kỹ thuật |
| RTO | Mục tiêu thời gian khôi phục |
| EOL | Hết vòng đời hỗ trợ của nhà cung cấp |
| MFA | Xác thực đa yếu tố |
| KPH | Sự không phù hợp và hành động khắc phục (theo ETV.P13) |
| ManLab | Nền tảng số hợp nhất của Viện (ManLab AIOS) |
| RACI | Responsible – Accountable – Consulted – Informed |

---

## V. VAI TRÒ VÀ TRÁCH NHIỆM (RACI)

### 5.1. Ma trận RACI

| Bước trong vòng đời tài sản hạ tầng | NTH | QTHT | TP | PT.ATTT | VP | LĐV |
|---|---|---|---|---|---|---|
| Khai báo, kiểm kê tài sản (F33.01) | C | **R** | C | I | **A** | I |
| Soát xét cấu hình an toàn, vùng mạng, mức phân loại | I | C | C | **R/A** | C | I |
| Phê duyệt đưa tài sản vào vận hành | I | C | C | C | C | **R/A** |
| Bàn giao, tiếp nhận thiết bị cho người dùng | **R** | **R** | **A** | I | C | I |
| Lập kế hoạch bảo trì năm (F33.02) | I | **R** | C | C | **R** | **A** |
| Thực hiện bảo trì, vá lỗi | I | **R/A** | C | C | C | I |
| Nghiệm thu bảo trì | C | **R** | **A** | I | C | I |
| Thực thi cấp, thay đổi, thu hồi tài khoản theo phiếu F28.04 | I | **R/A** | C | C | I | I |
| **Phê duyệt** quyền truy cập | I | I | C | **R/A** | I | **A** *(mức nhạy cảm)* |
| Đối chiếu tài khoản thực tế với phiếu đã duyệt (F33.03) | I | **R** | C | **A** | C | I |
| Tiếp nhận, xử lý sự cố kỹ thuật (F33.04) | **R** *(báo)* | **R/A** | C | C | C | I |
| Định tuyến sự cố sang ETV.P28 / P35 / P10 / P13 | I | **R** | I | **A** | C | I |
| Đánh giá ảnh hưởng an toàn thông tin trước thay đổi | I | C | I | **R/A** | I | I |
| Đánh giá ảnh hưởng hiệu lực kết quả đo trước thay đổi | I | C | **R** | I | I | **A** |
| Rà soát định kỳ danh mục hạ tầng | I | **R** | C | C | **A** | I |
| Xử lý hạ tầng hết vòng đời (EOL) | I | **R** | C | C | **A** | **A** |
| Đề nghị ngừng vận hành, thanh lý | I | **R** | C | C | **R** | **A** |
| Xác nhận xoá dữ liệu an toàn trước khi thiết bị rời Viện | I | **R** | C | **A** | C | I |
| Tổng hợp báo cáo phục vụ xem xét của lãnh đạo | I | C | I | C | **R/A** | I |
| Lưu trữ hồ sơ hệ thống thông tin | I | **R** | I | I | **A** | I |

> LĐV luôn là **A** cuối cùng đối với việc **đưa tài sản vào vận hành**, **kế hoạch bảo trì năm**, **thanh lý** và **ngoại lệ** (thiết bị cá nhân xử lý thông tin Hạn chế/Mật, tài khoản dùng chung) — không uỷ quyền.

### 5.2. Trách nhiệm cụ thể

**Lãnh đạo Viện (LĐV):** Phê duyệt danh mục hạ tầng và việc đưa tài sản vào vận hành; phê duyệt kế hoạch bảo trì năm và ngân sách thay thế; phê duyệt ngừng vận hành, thanh lý; phê duyệt ngoại lệ (thiết bị cá nhân xử lý thông tin Hạn chế/Mật, tài khoản dùng chung, hạ tầng EOL còn phục vụ hoạt động trọng yếu); quyết định biện pháp xử lý khi hạ tầng mức trọng yếu Cao mất khả năng hoạt động; xem xét tình hình hệ thống thông tin trong cuộc họp xem xét của lãnh đạo (ETV.P17).

**Văn phòng (VP):** Đơn vị chủ trì quản trị hệ thống thông tin; tổng hợp danh mục hạ tầng, kế hoạch bảo trì và nhu cầu ngân sách; theo dõi tài sản đến hạn rà soát, đến hạn bảo trì, quá hạn vá lỗi, sắp hết hạn bản quyền/bảo hành/EOL; tổng hợp báo cáo phục vụ xem xét của lãnh đạo.

**Quản trị hệ thống (QTHT):** Kiểm kê và vận hành hạ tầng; thực hiện bảo trì, vá lỗi, cập nhật theo kế hoạch; **thực thi** cấp, thay đổi, thu hồi tài khoản theo phiếu đã phê duyệt tại ETV.P28 — **không** phê duyệt quyền; đối chiếu định kỳ tài khoản thực tế với phiếu; tiếp nhận và xử lý sự cố kỹ thuật, định tuyến đúng chủ sở hữu; bảo đảm bằng chứng xoá dữ liệu an toàn trước khi thiết bị rời khỏi Viện; **từ chối** thực hiện thay đổi cấu hình khi chưa có phiếu thay đổi được phê duyệt theo ETV.P30, trừ trường hợp khẩn cấp có lệnh của LĐV.

**Người phụ trách an toàn thông tin (PT.ATTT):** Soát xét cấu hình an toàn cơ sở, phân vùng mạng và mức phân loại tối đa của tài sản trước khi đưa vào vận hành; phê duyệt quyền truy cập theo thẩm quyền tại ETV.P28; đánh giá ảnh hưởng an toàn thông tin trước thay đổi hệ thống; kết luận đối với sự cố có dấu hiệu mất an toàn thông tin; xác nhận phương pháp xoá dữ liệu an toàn.

**Lãnh đạo Phòng (TP):** Xác nhận nhu cầu hạ tầng của đơn vị; tiếp nhận, bảo quản và sử dụng đúng quy định thiết bị được giao; nghiệm thu bảo trì trong phạm vi đơn vị; **đánh giá ảnh hưởng tới hiệu lực kết quả đo** khi thay đổi chạm máy tính điều khiển, thu thập dữ liệu của thiết bị đo (phối hợp ETV.P10); rà soát danh sách quyền của phòng theo ETV.P28 mục 5.7.1.

**Phụ trách Quản lý chất lượng (QLCL):** Bảo đảm hồ sơ hệ thống thông tin được lưu theo ETV.P15; mở KPH theo ETV.P13 khi sự cố lặp lại hoặc bảo trì, vá lỗi quá hạn kéo dài; đưa tình hình hạ tầng vào chương trình đánh giá nội bộ (ETV.P16).

**Người thực hiện (NTH):** Sử dụng thiết bị đúng quy định; **không** tự cài đặt phần mềm không có bản quyền hợp lệ, không tự thay đổi cấu hình an toàn của thiết bị; báo sự cố kỹ thuật ngay khi phát hiện; hoàn trả thiết bị và bàn giao dữ liệu khi chấm dứt công việc hoặc chuyển công tác.

### 5.3. Nguyên tắc tách vai trò và giới hạn của AI

- **Người đề nghị ≠ người phê duyệt ≠ người thực hiện** đối với quyền truy cập (ETV.P28 mục 5.7.1). Thủ tục này giữ vai trò **người thực hiện**.
- Người lập bản ghi tài sản ≠ người soát xét (PT.ATTT hoặc TP khác) ≠ người phê duyệt (LĐV).
- Người trực tiếp thực hiện bảo trì **không** đồng thời là người nghiệm thu bảo trì đó.
- Trợ lý AI được phép **phát hiện** tài sản chưa kiểm kê, **nhắc** hạn bảo trì, hạn vá lỗi, hạn bản quyền, **gợi ý** phân loại sự cố và đối chiếu tài khoản với phiếu. Trợ lý AI **không** phê duyệt danh mục, **không** tự thực hiện thay đổi cấu hình trên hệ thống vận hành, **không** kết luận sự cố an toàn thông tin và **không** kết luận về hiệu lực kết quả đo (ISO/IEC 42001; ETV.P29).

---

## VI. NỘI DUNG / QUY TRÌNH THỰC HIỆN

### 6.1. Danh mục tài sản công nghệ thông tin (Biểu mẫu F33.01)

#### 6.1.1. Nội dung tối thiểu của một bản ghi

| Nhóm | Trường bắt buộc |
|---|---|
| Nhận dạng | Mã tài sản; tên gọi; lớp tài sản (§2.1); số sê-ri hoặc định danh nhà cung cấp; vị trí đặt |
| Trách nhiệm | **Chủ quản trị** (QTHT) và **đơn vị sử dụng** — thiếu một trong hai thì không được phê duyệt |
| Kỹ thuật | Môi trường (Vận hành/Kiểm thử/Phát triển); vùng mạng; hệ điều hành và phiên bản; cấu hình an toàn cơ sở đã áp dụng |
| Phân loại | Mức trọng yếu; mức phân loại thông tin cao nhất mà tài sản xử lý hoặc lưu trữ (theo ETV.P02, ETV.P27, ETV.P28) |
| Vòng đời | Ngày đưa vào vận hành; hạn bảo hành; hạn bản quyền; ngày hết vòng đời (EOL); chu kỳ bảo trì; chu kỳ rà soát |
| Liên kết | Hồ sơ mua sắm (ETV.P06); hợp đồng bảo trì; nền tảng số chạy trên tài sản (ETV.P35); thiết bị đo được phục vụ (ETV.P05); tài sản thông tin nằm trên tài sản (ETV.P27); rủi ro liên quan (ETV.P01, ETV.P28) |

**Nghiêm cấm** ghi mật khẩu, khoá API, mã PIN, chứng thư số vào bất kỳ trường nào của bản ghi tài sản — áp dụng nguyên nguyên tắc của ETV.P35 §2.2.

#### 6.1.2. Mã tài sản

Mã do Văn phòng cấp, **duy nhất toàn hệ thống**, cấp một lần khi tạo bản ghi và không thay đổi. Mã của tài sản đã thanh lý **không được cấp lại** cho tài sản khác — giữ nguyên giá trị truy vết của nhật ký lịch sử.

#### 6.1.3. Mức trọng yếu và hệ quả

| Mức | Ý nghĩa | Hệ quả bắt buộc |
|---|---|---|
| **Thấp** | Hỏng không ảnh hưởng đáng kể | Bảo trì theo kế hoạch chung |
| **Trung bình** | Hỏng ảnh hưởng một phòng hoặc một hệ thống | Kế hoạch bảo trì riêng; theo dõi hạn bảo hành |
| **Cao** | Hỏng làm ngừng dịch vụ toàn Viện, ngừng nền tảng ManLab, hoặc gây mất dữ liệu / ảnh hưởng hiệu lực kết quả đo | Bắt buộc xác định **RTO**; có phương án dự phòng và nằm trong kế hoạch liên tục hoạt động (ETV.P31); có ≥ 01 rủi ro đã mở tại ETV.P01 hoặc ETV.P28; ưu tiên vá lỗi cao nhất; rà soát ≤ 01 năm |

#### 6.1.4. Trình tự đưa tài sản vào vận hành

| Bước | Nội dung thực hiện | Trách nhiệm | Biểu mẫu |
|---|---|---|---|
| 1 | Khai báo bản ghi tài sản (trạng thái **Nháp**) với đủ trường bắt buộc theo lớp tài sản | QTHT | `ETV.P.F 33.01` |
| 2 | Chuyển **Chờ soát xét** khi đã áp dụng cấu hình an toàn cơ sở theo §6.2.3 | QTHT | `ETV.P.F 33.01` |
| 3 | Soát xét cấu hình an toàn, vùng mạng, mức phân loại tối đa. Đạt → Chờ phê duyệt; Không đạt → **Không soát xét** (bắt buộc ghi lý do) | PT.ATTT (≠ người lập) | `ETV.P.F 33.01` |
| 4 | Phê duyệt → **Đang vận hành**; không đạt → **Không phê duyệt** (bắt buộc ghi lý do). Hệ thống chặn phê duyệt khi vi phạm điều kiện tại Phụ lục I.1 | **LĐV** | `ETV.P.F 33.01` |
| 5 | Bàn giao thiết bị cho đơn vị sử dụng, ghi biên bản bàn giao; đưa tài sản vào kế hoạch bảo trì | QTHT, TP | `ETV.P.F 33.01`, `ETV.P.F 33.02` |
| 6 | Rà soát định kỳ theo chu kỳ (mặc định **01 năm/lần**): xác nhận còn đúng và còn cần thiết, hoặc đề nghị thay thế, ngừng vận hành theo §6.6 | QTHT, VP | `ETV.P.F 33.01` |

#### 6.1.5. Lộ trình kiểm kê kỳ đầu

Kiểm kê được thực hiện theo hai đợt kể từ ngày thủ tục có hiệu lực:

| Đợt | Phạm vi | Thời hạn hoàn thành |
|---|---|---|
| Đợt 1 | Hạ tầng trọng yếu: máy chủ, thiết bị mạng, **máy tính điều khiển và thu thập dữ liệu của thiết bị đo**, thiết bị lưu trữ, thiết bị ký số, dịch vụ thuê ngoài | **90 ngày** |
| Đợt 2 | Máy trạm, máy tính xách tay, thiết bị di động, thiết bị ngoại vi, phần mềm và bản quyền | **180 ngày** |

Tài sản phát hiện đang sử dụng mà **chưa được kiểm kê** được xử lý theo §6.7.

### 6.2. Cấu hình an toàn và sử dụng thiết bị

#### 6.2.1. Nguyên tắc chung

Yêu cầu an toàn do **ETV.P28 mục 5.7.2 và 5.7.3** quy định. Thủ tục này **áp dụng nguyên**, không diễn giải lại, và bổ sung cách **thực thi, kiểm chứng và lưu bằng chứng**.

#### 6.2.2. Vùng mạng và môi trường

Tài sản phải được gán đúng vùng mạng theo ETV.P28 mục 5.7.3 và đúng môi trường (Vận hành/Kiểm thử/Phát triển). Môi trường **Kiểm thử, Phát triển phải tách khỏi Vận hành**; **nghiêm cấm** đưa dữ liệu thật của khách hàng vào tài sản thuộc môi trường không phải Vận hành khi chưa được ẩn danh hoặc chưa được LĐV phê duyệt (ETV.P28 mục 5.7.10).

#### 6.2.3. Cấu hình an toàn cơ sở bắt buộc

Trước khi đưa vào vận hành, thiết bị đầu cuối và máy chủ phải có đủ: khoá màn hình tự động · mật khẩu hoặc mã PIN · phần mềm phòng chống mã độc đang hoạt động · bản vá cập nhật · đổi mật khẩu mặc định và đóng dịch vụ không dùng đến · **mã hoá ổ đĩa** đối với tài sản xử lý thông tin mức **Hạn chế** hoặc **Mật**. Thiếu bất kỳ điều kiện nào → **chặn phê duyệt** (Phụ lục I.1).

#### 6.2.4. Thiết bị cá nhân dùng cho công việc

| Mức phân loại thông tin xử lý | Điều kiện |
|---|---|
| Công khai, **Nội bộ** | Được phép, với điều kiện thiết bị đã đăng ký trong danh mục và đáp ứng đủ cấu hình an toàn cơ sở tại §6.2.3 |
| **Hạn chế**, **Mật** | Phải được **LĐV phê duyệt** và ghi nhận rủi ro tương ứng theo ETV.P28 mục 5.7.2 |

Thiết bị cá nhân không đăng ký **không** được kết nối vào vùng quản trị – văn phòng và vùng thiết bị đo.

#### 6.2.5. Phần mềm và bản quyền

Chỉ cài đặt phần mềm có nguồn gốc hợp pháp và giấy phép còn hiệu lực; giấy phép được kiểm kê như một tài sản. **Nghiêm cấm** cài đặt phần mềm không có bản quyền hợp lệ trên hạ tầng của Viện. Người dùng **không** tự cài đặt phần mềm trên máy trạm khi chưa được QTHT chấp thuận.

### 6.3. Bảo trì, vá lỗi và cập nhật (Biểu mẫu F33.02)

#### 6.3.1. Kế hoạch bảo trì năm

Văn phòng lập kế hoạch bảo trì năm cho toàn bộ tài sản có hệ điều hành hoặc phần mềm nền, trình **LĐV phê duyệt** trước khi bắt đầu năm kế hoạch; kế hoạch nêu rõ tài sản, loại công việc, chu kỳ, người thực hiện, thời điểm dự kiến, nhu cầu ngừng dịch vụ và nguồn lực.

#### 6.3.2. Trình tự thực hiện

| Bước | Nội dung thực hiện | Trách nhiệm | Biểu mẫu |
|---|---|---|---|
| 1 | Lập công việc bảo trì (theo kế hoạch hoặc đột xuất), xác định cửa sổ thời gian và ảnh hưởng tới người dùng | QTHT | `ETV.P.F 33.02` |
| 2 | Kiểm tra điều kiện đặc thù: tài sản thuộc **vùng thiết bị đo** hoặc thay đổi vượt phạm vi bảo trì thông thường → mở phiếu thay đổi theo **ETV.P30** và đánh giá ảnh hưởng theo §6.3.4 trước khi thực hiện | QTHT, TP, PT.ATTT | `F 30.02` |
| 3 | Thông báo trước cho đơn vị sử dụng đối với công việc gây gián đoạn | QTHT | `ETV.P.F 33.02` |
| 4 | Thực hiện bảo trì, vá lỗi; ghi nhật ký công việc và bằng chứng (ảnh chụp, kết quả kiểm tra, phiên bản sau cập nhật) | QTHT | `ETV.P.F 33.02` |
| 5 | Kiểm tra sau bảo trì và **nghiệm thu** bởi người khác người thực hiện | TP hoặc QTHT khác | `ETV.P.F 33.02` |
| 6 | Cập nhật bản ghi tài sản (phiên bản, ngày bảo trì gần nhất, hạn kế tiếp) | QTHT | `ETV.P.F 33.01` |

#### 6.3.3. Thời hạn hoàn thành vá lỗi bảo mật

ETV.P28 mục 5.7.3 yêu cầu vá lỗi "theo mức nghiêm trọng của lỗ hổng". Mốc thời hạn áp dụng trong toàn Viện:

| Mức nghiêm trọng | Thời hạn kể từ khi nhà cung cấp phát hành bản vá |
|---|---|
| **Nghiêm trọng** | **07 ngày**; nếu chưa vá được thì phải áp dụng **biện pháp giảm thiểu tạm thời trong 48 giờ** và ghi vào hồ sơ |
| **Cao** | 30 ngày |
| **Trung bình** | 90 ngày |
| **Thấp** | Theo chu kỳ bảo trì kế tiếp |

Quá hạn → cảnh báo chủ quản trị; **vá lỗi mức Nghiêm trọng quá hạn** hoặc bảo trì quá **02 chu kỳ** liên tiếp → cảnh báo LĐV và mở KPH theo ETV.P13.

#### 6.3.4. Thay đổi trên máy tính điều khiển, thu thập dữ liệu của thiết bị đo

Đây là **vùng đặc biệt**. Mọi thay đổi cấu hình hoặc cập nhật phần mềm điều khiển trên nhóm tài sản này chỉ được thực hiện khi có đủ:

1. **Phiếu thay đổi đã phê duyệt** theo ETV.P30;
2. **Đánh giá ảnh hưởng tới hiệu lực kết quả đo** theo ETV.P10 (và ETV.P08 nếu chạm phương pháp), có kết luận trước khi áp dụng.

Thiếu một trong hai → ManLab **chặn** ghi nhận hoàn thành công việc bảo trì. Sau khi áp dụng, phải kiểm tra xác nhận hệ thống thu thập dữ liệu hoạt động đúng trước khi tiếp tục sử dụng cho công việc chính thức.

### 6.4. Tài khoản trên hệ thống (Biểu mẫu F33.03)

#### 6.4.1. Nguyên tắc

Việc **phê duyệt** quyền truy cập thuộc ETV.P28 (phiếu F28.04). Thủ tục này quản lý **danh mục tài khoản thực tế tồn tại trên từng hệ thống** và bảo đảm mỗi tài khoản đều truy được về một phiếu đã phê duyệt.

Mỗi bản ghi tài khoản ghi tối thiểu: hệ thống, tên tài khoản, loại (cá nhân · đặc quyền · **dịch vụ** · bên thứ ba), người chịu trách nhiệm, số phiếu F28.04, ngày cấp, thời hạn hiệu lực (nếu là quyền tạm thời), trạng thái MFA, nơi lưu bí mật xác thực và người có quyền cấp phát.

**Nghiêm cấm** lưu mật khẩu, khoá API, mã PIN, chứng thư số trong bản ghi tài khoản dưới bất kỳ dạng nào, kể cả đã mã hoá.

#### 6.4.2. Trình tự thực hiện

| Bước | Nội dung thực hiện | Trách nhiệm | Biểu mẫu |
|---|---|---|---|
| 1 | Tiếp nhận phiếu yêu cầu cấp/thay đổi/thu hồi quyền **đã được phê duyệt** | QTHT | `F 28.04` |
| 2 | Thực hiện trên hệ thống; ghi bản ghi tài khoản kèm số phiếu và thời hạn hiệu lực | QTHT | `ETV.P.F 33.03` |
| 3 | Thu hồi **trong ngày làm việc** khi chấm dứt hợp đồng, chuyển công tác hoặc kết thúc công việc của bên thứ ba (ETV.P28 mục 5.7.1; điều kiện bắt buộc để hoàn tất thủ tục thôi việc theo ETV.P03) | QTHT | `ETV.P.F 33.03` |
| 4 | **Đối chiếu định kỳ 06 tháng/lần**: tài khoản thực tế ↔ phiếu đã phê duyệt; lập danh sách tài khoản không có phiếu, phiếu không có tài khoản, tài khoản quá thời hạn hiệu lực | QTHT | `ETV.P.F 33.03` |
| 5 | Rà soát danh sách **tài khoản đặc quyền và tài khoản dịch vụ** tối thiểu **02 lần/năm**, trình LĐV theo ETV.P28 mục 5.7.1 | QTHT, PT.ATTT | `ETV.P.F 33.03` |

#### 6.4.3. Tài khoản bất thường

Tài khoản phát hiện trên hệ thống mà **không truy được về phiếu đã phê duyệt** → **khoá tạm ngay**, ghi nhận và mở sự cố an toàn thông tin theo ETV.P28. Không được xoá tài khoản trước khi PT.ATTT xem xét, để giữ dấu vết phục vụ điều tra.

Tài khoản **dùng chung** chỉ được tồn tại khi có **phê duyệt của LĐV** kèm lý do, thời hạn và người chịu trách nhiệm; phải được rà soát như tài khoản đặc quyền.

### 6.5. Sự cố kỹ thuật và yêu cầu hỗ trợ (Biểu mẫu F33.04)

#### 6.5.1. Tiếp nhận

Mọi nhân sự báo sự cố kỹ thuật qua ManLab hoặc kênh do Văn phòng công bố. QTHT ghi nhận phiếu sự cố, xác định tài sản liên quan, mức ảnh hưởng và thời điểm phát sinh.

#### 6.5.2. Phân mức ảnh hưởng và thời hạn phản hồi

| Mức | Tiêu chí | Thời hạn phản hồi | Thời hạn xử lý mục tiêu |
|---|---|---|---|
| **Cao** | Ngừng dịch vụ toàn Viện; ngừng nền tảng ManLab; ảnh hưởng tài sản mức trọng yếu Cao; ảnh hưởng hệ thống thu thập dữ liệu đo | **Ngay**, báo cáo LĐV trong **01 giờ** | Theo RTO đã xác định |
| **Trung bình** | Ảnh hưởng một phòng hoặc một nhóm người dùng; suy giảm hiệu năng đáng kể | Trong **04 giờ làm việc** | 02 ngày làm việc |
| **Thấp** | Ảnh hưởng cá nhân; yêu cầu hỗ trợ thông thường | Trong **01 ngày làm việc** | 05 ngày làm việc |

#### 6.5.3. Định tuyến bắt buộc

| Dấu hiệu | Định tuyến |
|---|---|
| Có dấu hiệu mất an toàn thông tin (truy cập trái phép, mã độc, lộ lọt dữ liệu) | **ETV.P28** — QTHT **không** tự kết luận; phiếu sự cố kỹ thuật không được đóng trước khi ETV.P28 kết luận |
| Ảnh hưởng nền tảng số | **ETV.P35** — lập phiếu sự cố nền tảng (F35.03) |
| Ảnh hưởng dữ liệu đo hoặc hiệu lực kết quả đã phát hành | **ETV.P10**, **ETV.P11** — dừng sử dụng kết quả liên quan cho tới khi có kết luận |
| Gián đoạn vượt ngưỡng kích hoạt kế hoạch liên tục | **ETV.P31** |
| Sự cố lặp lại **≥ 03 lần trong 90 ngày** trên cùng một tài sản | **ETV.P13** — bắt buộc mở KPH |

#### 6.5.4. Đóng phiếu

Phiếu sự cố chỉ được đóng khi có đủ: nguyên nhân, biện pháp đã thực hiện, xác nhận tài sản trở lại hoạt động bình thường, kết luận của thủ tục được định tuyến (nếu có) và kết luận về việc có phải mở KPH hay lập bài học kinh nghiệm (ETV.P26) hay không.

### 6.6. Ngừng vận hành, thanh lý và chuyển giao

#### 6.6.1. Trình tự thực hiện

| Bước | Nội dung thực hiện | Trách nhiệm | Biểu mẫu |
|---|---|---|---|
| 1 | Đề nghị ngừng vận hành: lý do (hỏng không sửa được, hết vòng đời, không còn nhu cầu, thay thế), tài sản thay thế | QTHT, TP | `ETV.P.F 33.01` |
| 2 | Kiểm tra **đối tượng còn phụ thuộc**: nền tảng số đang chạy trên tài sản (ETV.P35), tài sản thông tin còn lưu trên tài sản (ETV.P27), thiết bị đo còn được phục vụ (ETV.P05) | QTHT, VP | `ETV.P.F 33.01` |
| 3 | Xử lý dữ liệu: trích xuất, chuyển giao hoặc **xoá an toàn**; lập biên bản theo ETV.P27 | QTHT, PT.ATTT | Biên bản xoá dữ liệu (ETV.P27) |
| 4 | Thu hồi tài khoản, quyền truy cập, chứng thư số gắn với tài sản | QTHT | `ETV.P.F 33.03` |
| 5 | Phê duyệt thanh lý, chuyển giao (bắt buộc ghi lý do) | **LĐV** | `ETV.P.F 33.01` |
| 6 | Chuyển bản ghi sang **Đã thanh lý**; **giữ nguyên bản ghi kiểm kê** phục vụ truy vết; lưu hồ sơ theo ETV.P15 | QTHT, VP | `ETV.P.F 33.01` |

#### 6.6.2. Điều kiện chặn cứng

Không được chuyển tài sản sang **Đã thanh lý**, chuyển giao ra ngoài hoặc gửi sửa chữa bên ngoài khi **chưa có bằng chứng xoá dữ liệu an toàn** (ETV.P28 mục 5.7.2; biên bản theo ETV.P27). Không được ngừng vận hành hạ tầng khi còn nền tảng số ở trạng thái Hiệu lực phụ thuộc vào hạ tầng đó — hệ thống từ chối thao tác và chỉ ra danh sách đối tượng còn phụ thuộc.

#### 6.6.3. Hạ tầng hết vòng đời (EOL)

Tài sản đã quá ngày EOL mà còn ở trạng thái Đang vận hành phải có: ≥ 01 rủi ro đã mở tại ETV.P01 hoặc ETV.P28, biện pháp giảm thiểu và **kế hoạch thay thế có mốc thời gian**. Cảnh báo tới LĐV **hằng quý** cho tới khi xử lý xong.

### 6.7. Hạ tầng chưa kiểm kê

Tài sản công nghệ thông tin đang được sử dụng cho công việc của Viện mà **chưa có bản ghi kiểm kê** được coi là **không phù hợp**. Khi phát hiện:

1. QTHT lập bản ghi ở trạng thái Nháp, xác định chủ quản trị và đơn vị sử dụng.
2. Nếu tài sản cần thiết → đưa vào trình tự tại §6.1.4 trong thời hạn **30 ngày**.
3. Nếu không đáp ứng cấu hình an toàn cơ sở (§6.2.3) → **ngắt khỏi mạng của Viện** cho tới khi khắc phục.
4. Trường hợp tài sản chưa kiểm kê có lưu dữ liệu mức **Hạn chế/Mật** → lập KPH theo ETV.P13 và xử lý sự cố theo ETV.P28.

### 6.8. Vai trò của AI trong quản lý hệ thống thông tin

Trợ lý AI trên ManLab được phép: đối chiếu danh mục tài sản với dữ liệu thực tế để **phát hiện tài sản chưa kiểm kê**; nhắc tài sản đến hạn rà soát, đến hạn bảo trì, quá hạn vá lỗi, sắp hết hạn bản quyền/bảo hành/EOL; đối chiếu tài khoản thực tế với phiếu đã phê duyệt và nêu bất thường; gợi ý phân loại và định tuyến sự cố; soạn dự thảo báo cáo tình hình hạ tầng.

Trợ lý AI **không** phê duyệt danh mục tài sản, **không** phê duyệt hay thực hiện cấp/thu hồi quyền, **không** tự thay đổi cấu hình trên hệ thống vận hành, **không** kết luận sự cố an toàn thông tin và **không** kết luận về hiệu lực kết quả đo. Mọi tính năng AI trong Module M33 phải có hồ sơ đánh giá tác động theo ETV.P29.

### 6.9. Báo cáo và soát xét

Văn phòng tổng hợp **06 tháng/lần** và trước mỗi cuộc họp xem xét của lãnh đạo (ETV.P17): tổng số tài sản theo lớp, môi trường, vùng mạng và mức trọng yếu; tài sản đến hạn/quá hạn rà soát và bảo trì; tình hình vá lỗi bảo mật, đặc biệt các lỗ hổng mức Nghiêm trọng quá hạn; thống kê sự cố kỹ thuật theo mức và thời gian xử lý; kết quả đối chiếu tài khoản với phiếu; danh sách hạ tầng EOL và kế hoạch thay thế; tài sản phát hiện chưa kiểm kê trong kỳ; nhu cầu ngân sách thay thế, nâng cấp.

Thủ tục này được soát xét định kỳ theo ETV.P14 §6.10, hoặc đột xuất khi có thay đổi lớn về kiến trúc hạ tầng, nhà cung cấp dịch vụ trọng yếu hoặc yêu cầu pháp lý liên quan.

---

## VII. BIỂU MẪU ÁP DỤNG

| Mã biểu mẫu | Tên biểu mẫu | Nơi lưu bản gốc |
|---|---|---|
| **ETV.P.F 33.01** | Danh mục tài sản công nghệ thông tin | `06_SHARED_RESOURCES/01_Forms/` |
| **ETV.P.F 33.02** | Kế hoạch và hồ sơ bảo trì hệ thống | `06_SHARED_RESOURCES/01_Forms/` |
| **ETV.P.F 33.03** | Danh mục tài khoản hệ thống | `06_SHARED_RESOURCES/01_Forms/` |
| **ETV.P.F 33.04** | Phiếu sự cố và yêu cầu hỗ trợ công nghệ thông tin | `06_SHARED_RESOURCES/01_Forms/` |

Việc **phê duyệt quyền truy cập** dùng biểu mẫu **F28.04** của ETV.P28; phiếu đề nghị thay đổi dùng **F30.02** của ETV.P30; phiếu sự cố an toàn thông tin dùng **F28.03**; phiếu sự cố nền tảng dùng **F35.03**; biên bản xoá, huỷ dữ liệu dùng biểu mẫu của ETV.P27; hồ sơ mua sắm dùng bộ biểu mẫu của ETV.P06 — **không** lập biểu mẫu mới ở thủ tục này (nguyên tắc một nơi duy nhất, ETV.P14).

---

## VIII. LƯU HỒ SƠ

Việc lập, lưu giữ, bảo quản, tra cứu, phân quyền truy cập và thanh lý hồ sơ thực hiện theo **ETV.P15 – Kiểm soát hồ sơ**; thời hạn lưu và phân quyền chi tiết theo **ETV.P.F 14.06 (Danh mục phân quyền và thời hạn lưu)**. Thủ tục này **không** quy định lại cơ chế lưu trữ, chỉ đăng ký các hồ sơ phát sinh và thời hạn đề xuất để cập nhật vào danh mục đó.

| Hồ sơ | Người lưu | Thời hạn lưu đề xuất |
|---|---|---|
| Danh mục tài sản công nghệ thông tin (F33.01) và các phiên bản | VP | Vĩnh viễn trên ManLab |
| Kế hoạch và hồ sơ bảo trì hệ thống (F33.02) | QTHT, sao gửi VP | Suốt vòng đời tài sản + 05 năm |
| Danh mục tài khoản hệ thống (F33.03) và kết quả đối chiếu định kỳ | QTHT | 05 năm |
| Phiếu sự cố và yêu cầu hỗ trợ (F33.04) | QTHT | 05 năm sau khi đóng |
| Biên bản bàn giao, thu hồi thiết bị | VP | Suốt vòng đời tài sản + 02 năm |
| Bằng chứng xoá dữ liệu an toàn trước thanh lý, chuyển giao | QTHT, sao gửi PT.ATTT | Theo ETV.P27 |
| Hồ sơ phê duyệt ngoại lệ (thiết bị cá nhân, tài khoản dùng chung, hạ tầng EOL) | VP | 10 năm |
| Nhật ký thay đổi cấu hình hệ thống | QTHT | Theo ETV.P28 |
| Báo cáo tình hình hệ thống thông tin phục vụ xem xét của lãnh đạo | VP | Theo ETV.P17 |

---

## IX. CÁC PHỤ LỤC

### Phụ lục I — Ma trận kiểm soát rủi ro và điều kiện chặn cứng

*(Dẫn chiếu từ §6.1.4, §6.2.3, §6.3.4, §6.4, §6.6.2 và §6.7. Hệ thống ManLab thực thi các điều kiện này bằng ràng buộc kỹ thuật.)*

**I.1. Điều kiện chặn cứng trước khi phê duyệt đưa tài sản vào vận hành**

| TT | Điều kiện | Áp dụng cho |
|---|---|---|
| 1 | Có **chủ quản trị** và **đơn vị sử dụng** là người/đơn vị cụ thể đang hoạt động | Mọi tài sản |
| 2 | Có **mức phân loại thông tin cao nhất** và **mức trọng yếu** | Mọi tài sản |
| 3 | Đủ **cấu hình an toàn cơ sở** theo §6.2.3 | Thiết bị đầu cuối, máy chủ |
| 4 | Có **mã hoá ổ đĩa** | Tài sản xử lý thông tin Hạn chế/Mật |
| 5 | Có **RTO**, phương án dự phòng và ≥ 01 rủi ro đã mở (ETV.P01/ETV.P28) | Tài sản mức trọng yếu Cao |
| 6 | Có **phê duyệt của LĐV** | Thiết bị cá nhân xử lý thông tin Hạn chế/Mật; tài khoản dùng chung |
| 7 | Bản ghi **không** chứa mật khẩu, khoá API, mã PIN, chứng thư số | Mọi tài sản, mọi tài khoản |
| 8 | Có **giấy phép sử dụng hợp lệ** | Phần mềm, bản quyền |

**I.2. Các tình huống bị chặn hoặc phải xử lý bắt buộc**

| Tình huống | Xử lý |
|---|---|
| Tài sản không có chủ quản trị hoặc đơn vị sử dụng | **Không cho lưu** |
| Hoàn thành bảo trì trên máy tính điều khiển thiết bị đo mà thiếu phiếu thay đổi (ETV.P30) hoặc thiếu đánh giá ảnh hưởng hiệu lực kết quả đo (ETV.P10) | **Chặn ghi nhận hoàn thành** (§6.3.4) |
| Thực hiện thay đổi cấu hình ngoài phạm vi bảo trì thông thường khi chưa có phiếu thay đổi được phê duyệt | Vi phạm; xử lý như thay đổi âm thầm theo ETV.P30 |
| Tạo tài khoản trên hệ thống mà **không có phiếu F28.04 đã phê duyệt** | **Khoá tạm ngay** + mở sự cố theo ETV.P28; không xoá trước khi PT.ATTT xem xét |
| QTHT tự phê duyệt quyền truy cập cho mình hoặc cho người khác | **Cấm tuyệt đối** (ETV.P28 mục 5.7.1) |
| Bản ghi tài sản hoặc tài khoản chứa bí mật xác thực | **Cấm tuyệt đối**; thu hồi bí mật xác thực ngay theo ETV.P28 và lập KPH theo ETV.P13 |
| Thanh lý, chuyển giao, gửi sửa chữa bên ngoài khi chưa có bằng chứng **xoá dữ liệu an toàn** | **Chặn thao tác** (§6.6.2) |
| Ngừng vận hành hạ tầng khi còn nền tảng số Hiệu lực phụ thuộc | **Chặn thao tác** |
| Đưa dữ liệu thật của khách hàng vào tài sản thuộc môi trường Kiểm thử/Phát triển khi chưa ẩn danh hoặc chưa được LĐV phê duyệt | **Không chấp nhận** (ETV.P28 mục 5.7.10) |
| Cài đặt phần mềm không có bản quyền hợp lệ trên hạ tầng của Viện | **Cấm tuyệt đối**; gỡ bỏ ngay và lập KPH theo ETV.P13 |
| Thiết bị cá nhân chưa đăng ký kết nối vào vùng quản trị – văn phòng hoặc vùng thiết bị đo | **Ngắt kết nối**; xử lý theo §6.7 |
| Vá lỗi mức **Nghiêm trọng quá hạn** hoặc bảo trì quá **02 chu kỳ** | Cảnh báo LĐV + mở KPH theo ETV.P13 |
| Sự cố lặp ≥ **03 lần/90 ngày** trên cùng tài sản | Bắt buộc mở KPH theo ETV.P13 |
| Đóng phiếu sự cố có dấu hiệu mất an toàn thông tin trước khi ETV.P28 kết luận | **Chặn thao tác đóng** |
| Tài sản quá **EOL** còn vận hành mà không có rủi ro đã mở và kế hoạch thay thế | Cảnh báo LĐV hằng quý cho tới khi xử lý xong |
| Tái sử dụng mã tài sản của tài sản đã thanh lý | **Không cho phép** |
| Trợ lý AI phê duyệt danh mục, cấp/thu hồi quyền, tự đổi cấu hình vận hành hoặc kết luận sự cố ATTT | **Cấm tuyệt đối** |

### Phụ lục II — Bảng trạng thái và thẩm quyền thao tác

*(Dẫn chiếu từ §6.1.4, §6.3, §6.4, §6.5, §6.6)*

**II.1. Tài sản công nghệ thông tin (F33.01)**

| STT | Trạng thái | Ý nghĩa | Người thao tác | Bắt buộc lý do |
|---|---|---|---|---|
| 1 | Nháp | Đang khai báo | QTHT | Không |
| 2 | Chờ soát xét | Chờ kiểm tra cấu hình an toàn, vùng mạng, mức phân loại | QTHT | Không |
| 3 | Không soát xét | Bị trả lại để sửa | PT.ATTT (≠ người lập) | **Có** |
| 4 | Chờ phê duyệt | Chờ LĐV | PT.ATTT, VP | Không |
| 5 | Không phê duyệt | Bị trả lại để sửa | LĐV | **Có** |
| 6 | Đang vận hành | Đang phục vụ công việc | LĐV (phê duyệt), QTHT (vận hành) | Không |
| 7 | Tạm ngừng | Đang bảo trì, sửa chữa; chưa chấm dứt sử dụng | QTHT | **Có** |
| 8 | Ngừng vận hành | Không còn dùng, **chưa thanh lý**, dữ liệu chưa xử lý xong | QTHT | **Có** |
| 9 | Đã thanh lý | Đã thanh lý, chuyển giao — **bản ghi kiểm kê vẫn giữ** | LĐV | **Có** |
| 10 | Huỷ bản ghi | Khai báo sai hoặc trùng, bỏ trước khi phê duyệt | LĐV | **Có** |

Bốn cờ cảnh báo — **Đến hạn rà soát** · **Đến hạn bảo trì** · **Quá hạn vá lỗi bảo mật** · **Sắp hết hạn bản quyền, bảo hành, EOL** — không phải trạng thái hồ sơ mà là cảnh báo tính theo dữ liệu bản ghi.

**II.2. Các đối tượng khác**

| Đối tượng | Chuỗi trạng thái | Thẩm quyền kết thúc |
|---|---|---|
| Công việc bảo trì (F33.02) | Kế hoạch → Đang thực hiện → Chờ nghiệm thu → Hoàn thành / Quá hạn / Huỷ | TP hoặc QTHT khác người thực hiện |
| Tài khoản hệ thống (F33.03) | Đang hoạt động → Tạm khoá → Đã thu hồi | QTHT (theo phiếu F28.04) |
| Phiếu sự cố, yêu cầu hỗ trợ (F33.04) | Mới → Đang xử lý → Chờ bên thứ ba → Đã xử lý → Đã đóng / Huỷ | QTHT (Đã đóng) · PT.ATTT (khi có yếu tố ATTT) · LĐV (Huỷ) |

Mọi nhánh **Huỷ**, **Không phê duyệt**, **Không soát xét**, **Quá hạn** bắt buộc ghi lý do.

### Phụ lục III — Ranh giới kiểm kê giữa các thủ tục

*(Dẫn chiếu từ §2.2 và §2.3 — dùng khi có tranh luận "việc này thuộc thủ tục nào")*

| Câu hỏi | Thủ tục trả lời |
|---|---|
| Thiết bị, máy chủ, mạng, phần mềm nào Viện đang có, ai quản, ở đâu? | **ETV.P33** |
| Phần mềm nghiệp vụ nào đang chạy, ai là chủ sở hữu nền tảng, dữ liệu chảy đi đâu? | ETV.P35 |
| Dữ liệu, tài sản thông tin nào tồn tại, sao lưu và huỷ ra sao? | ETV.P27 |
| Chất lượng, vòng đời và kiểm soát truy xuất dữ liệu số? | ETV.P34 |
| Yêu cầu bảo mật là gì, rủi ro nào, ai được cấp quyền? | ETV.P28 |
| Thay đổi được phê duyệt thế nào? | ETV.P30 |
| Kết quả đo có còn hiệu lực sau thay đổi không? | ETV.P10 · ETV.P11 |
| Thiết bị đo được hiệu chuẩn, kiểm định thế nào? | ETV.P05 |
| Viện có tiếp tục làm việc được không khi hạ tầng hỏng? | ETV.P31 |

---

*Thủ tục Quản lý hệ thống thông tin — ETV.P 33 — Lần BH: 01 — Trang tài liệu điện tử, không áp dụng đánh số trang thủ công (bản in xuất từ ManLab tự sinh header/footer theo ETV.P14 §6.4).*
