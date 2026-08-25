---
# Khối metadata AI — bắt buộc cho mọi văn bản kiểm soát (ETV.P14 §6.3)
id: ETV.P35
title: "Thủ tục Quản lý nền tảng số"
type: Thu-tuc
owner: "Phụ trách Quản lý chất lượng (QLCL)"
department: "Toàn Viện"
process: MP35_NenTangSo
capability: [CAP-29_AIOffice]
module: M35_NenTangSo
effective_date: ""
revision: "02"
status: Cho-soat-xet
keywords: [nền tảng số, sổ đăng ký nền tảng, điểm tích hợp, kiểm tra sức khỏe, ngừng vận hành, ISO/IEC 17025 §7.11, ISO/IEC 27001 A.5.23]
related_documents: [ETV.QM, ETV.P01, ETV.P02, ETV.P06, ETV.P13, ETV.P14, ETV.P15, ETV.P17, ETV.P27, ETV.P28, ETV.P29, ETV.P30, ETV.P31, ETV.P32, ETV.P33, ETV.P34, ETV.P37, ETV.P38]
iso_clause: ["ISO 9001:2015 §7.1.3, §8.4, §8.5.1, §9.3", "ISO/IEC 17025:2017 §6.6, §7.11, §8.5", "ISO 17034:2016 §6.6, §7.4", "ISO/IEC 27001:2022 §8.1, A.5.9, A.5.19–A.5.23, A.5.30, A.8.9, A.8.16, A.8.31", "ISO/IEC 42001:2023 §6.1, §8.1, §8.4"]
legal_basis: ["Luật Giao dịch điện tử 20/2023/QH15", "Pháp luật hiện hành về an toàn thông tin mạng", "Pháp luật hiện hành về bảo vệ dữ liệu cá nhân"]
ai_tags: [platform-registry, integration-point, health-check]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Vĩnh viễn (bản hiện hành) — xem chi tiết theo loại tại ETV.P.F 14.06"
digital_signature: "LĐV"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV)"
supersedes: "ETV.P35 lần ban hành 01 (24/08/2026)"
superseded_by: null
---
# THỦ TỤC QUẢN LÝ NỀN TẢNG SỐ

**Procedure For Digital Platform Management**

|                   |                                          |
| ----------------- | ---------------------------------------- |
| **Mã số**         | ETV.P 35                                 |
| **Lần ban hành**  | 02                                       |
| **Ngày ban hành** | ..../..../........                       |
| **Biên soạn**     | Dương Thành Nam — ..../..../........     |
| **Soát xét**      | Đỗ Văn Vinh — Lãnh đạo Phòng, ..../..../........ |
| **Phê duyệt**     | Nguyễn Hoàng Giang — Lãnh đạo Viện, ..../..../........ |

> **Tình trạng bản này: CHỜ SOÁT XÉT** — lần ban hành 02, chưa có hiệu lực. **Lần ban hành 01 (24/08/2026) vẫn là bản đang áp dụng** cho tới khi bản này được Lãnh đạo Viện phê duyệt và chuyển trạng thái **Đã phê duyệt** theo ETV.P14.

> **Chú ý:** Tài liệu nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện Kiểm định Công nghệ và Môi trường.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian | Nội dung thay đổi | Lần ban hành |
| ---------- | ------------------- | -------------- |
| 24/08/2026 | Ban hành lần thứ nhất | 01 |
| 25/08/2026 | Ban hành lại: đưa về đúng khung thủ tục I–IX của ETV.P14 (khối metadata chuẩn theo ETV.P14 §6.3, trang bìa Biên soạn–Soát xét–Phê duyệt, bổ sung §V Ma trận RACI, §IX Các phụ lục); bổ sung mục Văn bản pháp luật viện dẫn; §VIII dẫn chiếu thời hạn lưu về ETV.P.F 14.06 thay vì tự quy định; thống nhất cách dẫn chiếu thủ tục theo mã `ETV.P xx` (ETV.P14 §6.2). **Nội dung yêu cầu kỹ thuật và thẩm quyền không thay đổi so với lần ban hành 01.** | 02 |

---

## I. MỤC ĐÍCH

Thủ tục này quy định nội dung, trách nhiệm và trình tự **đăng ký, đánh giá, phê duyệt đưa vào vận hành, giám sát, thay đổi và ngừng vận hành** các nền tảng số của Viện ETV, nhằm đáp ứng yêu cầu Điều 7.1.3 của ISO 9001:2015, Điều 7.11 của ISO/IEC 17025:2017, kiểm soát A.5.9, A.5.19–A.5.23 của ISO/IEC 27001:2022 và Chương X của Sổ tay chất lượng. Cụ thể để:

1. Bảo đảm mọi nền tảng số đang được Viện sử dụng đều **có danh tính rõ ràng, có chủ sở hữu, đúng môi trường, đúng mức bảo mật** và được giám sát tình trạng hoạt động.
2. Bảo đảm nguồn lực hạ tầng công nghệ phục vụ vận hành các quá trình luôn phù hợp và sẵn sàng.
3. Bảo đảm mọi hệ thống quản lý thông tin dùng cho hoạt động kiểm định, hiệu chuẩn, thử nghiệm, sản xuất chất chuẩn được **xác nhận giá trị sử dụng trước khi đưa vào vận hành**.
4. Ngăn tình trạng **nền tảng dùng chui** — phần mềm, dịch vụ đám mây, công cụ bên ngoài được sử dụng cho công việc mà không đăng ký, không có chủ sở hữu, không rõ dữ liệu chảy đi đâu.
5. Kiểm soát các **điểm tích hợp** giữa nền tảng của Viện và nền tảng bên ngoài — nơi phát sinh rủi ro rò rỉ dữ liệu và mất tính liên tục.
6. Cung cấp **sổ đăng ký nền tảng (Platform Registry)** làm nền cho quản trị hệ thống trí tuệ nhân tạo theo ETV.P29 — mọi tác tử (agent), công cụ (tool), lời nhắc (prompt) đều phải gắn với một nền tảng đã đăng ký.
7. Bảo đảm dữ liệu và dịch vụ được **chuyển giao an toàn** khi một nền tảng ngừng vận hành.

Áp dụng thống nhất trong toàn Viện ETV, thực hiện qua phần mềm ManLab (Module M35 – Quản lý nền tảng số).

---

## II. PHẠM VI ÁP DỤNG

### 2.1. Đối tượng áp dụng

Áp dụng cho toàn bộ đơn vị, phòng ban, cá nhân thuộc Viện ETV và cho **mọi nền tảng số** phục vụ hoạt động quản lý, kỹ thuật, nghiên cứu, đào tạo, kinh doanh dịch vụ của Viện, bao gồm:

| TT | Nhóm | Ví dụ |
|---|---|---|
| 1 | Nền tảng do Viện tự xây dựng và vận hành | ManLab (Hệ điều hành doanh nghiệp ETV), cổng thông tin nội bộ |
| 2 | Nền tảng do Viện sở hữu, giao bên ngoài vận hành | Website, cổng dịch vụ khách hàng đặt tại nhà cung cấp |
| 3 | Nền tảng thuê ngoài dạng dịch vụ (SaaS/PaaS/IaaS) | Thư điện tử, lưu trữ đám mây, nền tảng hội họp trực tuyến, dịch vụ mô hình AI |
| 4 | Nền tảng của đối tác mà Viện tích hợp vào | VI-CONNECT, cổng dữ liệu của cơ quan quản lý nhà nước |
| 5 | Nền tảng ở môi trường không phải sản xuất nhưng có dữ liệu thật | Môi trường thử nghiệm (STAGING), môi trường nội bộ (INTERNAL) |

Dữ liệu được quản lý thống nhất trên phần mềm ManLab (Module M35 – Quản lý nền tảng số).

### 2.2. Nguyên tắc áp dụng

**Nguyên tắc 1 — Đăng ký, không sao chép.** Danh mục nền tảng số là **sổ đăng ký (registry)**, **không phải kho cấu hình và không phải kho tài liệu kỹ thuật**. Bản ghi nền tảng chỉ lưu **thông tin định danh, chủ sở hữu, môi trường, mức trọng yếu, mức phân loại dữ liệu, bộ chuyển đổi và đường dẫn** tới nơi lưu nội dung gốc: tài liệu kiến trúc và đặc tả tại thư viện module, hồ sơ đánh giá nhà cung cấp theo ETV.P06, hồ sơ tài sản thông tin theo ETV.P27, hồ sơ an toàn thông tin theo ETV.P28.

**Nguyên tắc 2 — Không lưu bí mật xác thực trong sổ đăng ký.** **Nghiêm cấm** lưu mật khẩu, khóa API, chứng thư số hoặc bất kỳ bí mật xác thực nào trong bản ghi nền tảng. Bí mật xác thực được quản lý theo ETV.P28; bản ghi nền tảng chỉ ghi **nơi lưu giữ** và **người có quyền cấp phát**.

### 2.3. Ngoài phạm vi

Thủ tục này **không** thay thế và **không** trùng lặp với:

| Nội dung | Thuộc thủ tục |
|---|---|
| Hạ tầng công nghệ thông tin, máy chủ, mạng, thiết bị đầu cuối, tài khoản người dùng | ETV.P33 – Quản lý hệ thống thông tin |
| Biện pháp kỹ thuật an toàn thông tin, quản lý bí mật xác thực, xử lý sự cố an toàn thông tin | ETV.P28 – Quản lý an toàn thông tin |
| Danh mục và vòng đời tài sản dữ liệu, sao lưu, phục hồi | ETV.P27 – Quản trị dữ liệu và tài sản thông tin |
| Dữ liệu số chạy trên nền tảng: chất lượng, vòng đời, kiểm soát truy xuất | ETV.P34 – Quản lý dữ liệu số |
| Tác tử, công cụ, lời nhắc, nhật ký suy luận, đánh giá tác động AI (AIA) | ETV.P29 – Quản lý hệ thống trí tuệ nhân tạo |
| Dịch vụ số cung cấp cho khách hàng qua nền tảng | ETV.P38 – Quản lý dịch vụ số |
| Luồng dữ liệu nghiệp vụ giữa các module, hợp đồng dữ liệu | ETV.P37 – Tích hợp dữ liệu |
| Sáng kiến, lộ trình và danh mục đầu tư chuyển đổi số | ETV.P32 – Chuyển đổi số và cải tiến hệ thống |
| Mua sắm, thuê dịch vụ, đánh giá và lựa chọn nhà cung cấp | ETV.P06 – Quản lý mua sắm |
| Thẩm định thay đổi lớn có ảnh hưởng liên phòng | ETV.P30 – Quản lý thay đổi |
| Kế hoạch duy trì liên tục hoạt động và khắc phục thảm họa | ETV.P31 – Quản lý tính liên tục hoạt động |
| Đánh giá và xử lý rủi ro | ETV.P01 – Rủi ro và cơ hội |
| Nội dung, phiên bản, hiệu lực của tài liệu kiểm soát | ETV.P14 – Kiểm soát tài liệu |

> **Phân biệt cốt lõi:** ETV.P35 trả lời "Viện đang dùng những nền tảng nào, ai chịu trách nhiệm, dữ liệu chảy đi đâu"; ETV.P33 trả lời "hạ tầng chạy chúng ra sao"; ETV.P28 trả lời "bảo vệ chúng bằng biện pháp gì". Một nền tảng mới kích hoạt cả ba, nhưng mỗi thủ tục giữ đúng vai của mình.

---

## III. TÀI LIỆU VIỆN DẪN

> Nguyên tắc: **chỉ dẫn chiếu, không chép lại nội dung.** Bản đầy đủ đặt tại `03_MANAGEMENT_SYSTEM/` (chuẩn mực) và `08_KNOWLEDGE_GRAPH/01_Regulations/` (pháp luật). QLCL rà soát hiệu lực và văn bản thay thế trước mỗi lần ban hành lại.

### 3.1. Tiêu chuẩn

- ISO 9001:2015 §7.1.3 (Cơ sở hạ tầng); §8.4 (Kiểm soát quá trình, sản phẩm, dịch vụ do bên ngoài cung cấp); §8.5.1; §9.3
- ISO/IEC 17025:2017 §6.6 (Sản phẩm và dịch vụ do bên ngoài cung cấp); §7.11 (Kiểm soát dữ liệu và quản lý thông tin); §8.5
- ISO 17034:2016 §6.6 (Dịch vụ bên ngoài); §7.4 (Kiểm soát dữ liệu)
- ISO/IEC 27001:2022 §8.1; A.5.9 (Kiểm kê tài sản); A.5.19–A.5.23 (An toàn thông tin trong quan hệ nhà cung cấp và dịch vụ đám mây); A.5.30 (Sẵn sàng công nghệ thông tin cho tính liên tục); A.8.9 (Quản lý cấu hình); A.8.16 (Hoạt động giám sát); A.8.31 (Tách biệt môi trường phát triển, thử nghiệm và sản xuất)
- ISO/IEC 42001:2023 §6.1; §8.1 (Kiểm soát vận hành hệ thống AI); §8.4 (Quản lý bên thứ ba và nhà cung cấp)
- `11_COMPLIANCE/01_ISO_Mapping/MP-ISO-mapping.md` — bảng ánh xạ đầy đủ MP ↔ điều khoản

### 3.2. Văn bản pháp luật

- Luật Giao dịch điện tử số 20/2023/QH15 — giá trị pháp lý của thông điệp dữ liệu và chữ ký điện tử phát sinh trên nền tảng số
- Pháp luật hiện hành về **an toàn thông tin mạng** — áp dụng đối với nền tảng kết nối ra ngoài và nền tảng thuê ngoài
- Pháp luật hiện hành về **bảo vệ dữ liệu cá nhân** — áp dụng khi nền tảng xử lý dữ liệu cá nhân hoặc chuyển dữ liệu cho bên thứ ba; QLCL phối hợp người phụ trách an toàn thông tin xác định văn bản đang hiệu lực tại thời điểm áp dụng và ghi vào hồ sơ đánh giá trước vận hành

> **Lưu ý phạm vi:** Luật Ban hành văn bản quy phạm pháp luật điều chỉnh cơ quan nhà nước có thẩm quyền ban hành VBQPPL; ETV không ban hành VBQPPL nên luật này không phải căn cứ ban hành văn bản nội bộ.

### 3.3. Văn bản nội bộ Viện ETV

- Sổ tay quản lý chất lượng (ETV.QM) Chương X
- ETV.P01 – Quản lý rủi ro và cơ hội · ETV.P02 – Bảo mật thông tin · ETV.P06 – Quản lý mua sắm · ETV.P13 – Khắc phục, cải tiến
- ETV.P14 – Kiểm soát tài liệu · ETV.P15 – Kiểm soát hồ sơ · ETV.P17 – Xem xét của lãnh đạo · ETV.P26 – Quản lý tri thức tổ chức
- ETV.P27 – Quản trị dữ liệu và tài sản thông tin · ETV.P28 – Quản lý an toàn thông tin · ETV.P29 – Quản lý hệ thống trí tuệ nhân tạo
- ETV.P30 – Quản lý thay đổi · ETV.P31 – Quản lý tính liên tục hoạt động · ETV.P32 – Chuyển đổi số và cải tiến hệ thống
- ETV.P33 – Quản lý hệ thống thông tin · ETV.P34 – Quản lý dữ liệu số · ETV.P37 – Tích hợp dữ liệu · ETV.P38 – Quản lý dịch vụ số

---

## IV. THUẬT NGỮ, ĐỊNH NGHĨA VÀ CHỮ VIẾT TẮT

### 4.1. Thuật ngữ và định nghĩa

Định nghĩa chung ("quá trình", "tài sản thông tin", "hiệu lực"...) theo ISO 9000:2015 và ISO/IEC 27000 — không nhắc lại tại đây. Các thuật ngữ riêng của thủ tục này:

| Thuật ngữ | Định nghĩa |
|---|---|
| **Nền tảng số** (Digital Platform) | Một hệ thống phần mềm có danh tính độc lập, có giao diện người dùng hoặc giao diện lập trình ứng dụng (API), được Viện sở hữu, thuê hoặc tích hợp vào để thực hiện một phần công việc của Viện |
| **Bản ghi nền tảng** (Platform Record) | Một đơn vị đăng ký trong Danh mục nền tảng số, có mã nền tảng, tên gọi, chủ sở hữu, môi trường, mức trọng yếu, mức phân loại dữ liệu, loại bộ chuyển đổi và đường dẫn tới hồ sơ gốc |
| **Mã nền tảng** (Platform code) | Chuỗi định danh duy nhất toàn hệ thống của một nền tảng, viết in hoa không dấu (ví dụ `MANLAB`, `VICONNECT`). Mã nền tảng **không được tái sử dụng** sau khi nền tảng bị hủy |
| **Môi trường** (Environment) | Ngữ cảnh vận hành của nền tảng, gồm ba giá trị: **PRODUCTION** (sản xuất – phục vụ công việc thật), **STAGING** (thử nghiệm – kiểm thử trước khi phát hành), **INTERNAL** (nội bộ – dùng riêng trong Viện, không phục vụ khách hàng) |
| **Bộ chuyển đổi** (Adapter) | Thành phần phần mềm đảm nhận toàn bộ cách thức giao tiếp riêng của một nền tảng (cách gọi API, định dạng phản hồi, cách xác thực). Mỗi nền tảng có **đúng một** loại bộ chuyển đổi tương ứng |
| **Bộ chuyển đổi tạm** (Placeholder Adapter) | Bộ chuyển đổi dùng cho nền tảng đã đăng ký nhưng **chưa có quyền truy cập API thật**; trả về lỗi rõ ràng thay vì suy đoán hành vi của nền tảng |
| **Điểm tích hợp** (Integration point) | Một kết nối kỹ thuật cụ thể giữa nền tảng của Viện và một nền tảng khác, đặc trưng bởi hướng truyền dữ liệu, loại dữ liệu trao đổi và phương thức xác thực |
| **Tình trạng vận hành** (Health status) | Trạng thái kỹ thuật thời điểm hiện tại của nền tảng do tiến trình kiểm tra sức khỏe tự động xác định: **Hoạt động tốt** (HEALTHY), **Suy giảm** (DEGRADED), **Ngừng** (DOWN), **Chưa xác định** (UNKNOWN). **Không phải** trạng thái hồ sơ |
| **Kiểm tra sức khỏe** (Health check) | Phép kiểm tra tự động, định kỳ, do ManLab thực hiện để cập nhật tình trạng vận hành của nền tảng |
| **Chủ sở hữu nền tảng** (Platform Owner) | Lãnh đạo đơn vị hoặc người phụ trách lĩnh vực chịu trách nhiệm về việc nền tảng đó tồn tại, phục vụ đúng mục đích nghiệp vụ và được duy trì hiệu lực |
| **Đầu mối kỹ thuật** (Technical Contact) | Cá nhân chịu trách nhiệm cấu hình, theo dõi và xử lý sự cố kỹ thuật của nền tảng |
| **Mức trọng yếu nền tảng** (Criticality) | Mức độ ảnh hưởng tới Viện nếu nền tảng ngừng hoạt động hoặc bị xâm phạm, gồm ba mức: Thấp, Trung bình, Cao |
| **Ngừng vận hành** (Decommission) | Việc chấm dứt sử dụng một nền tảng, kèm theo xử lý dữ liệu, thu hồi quyền truy cập và cắt các điểm tích hợp liên quan |

### 4.2. Chữ viết tắt

| Chữ viết tắt | Ý nghĩa |
|---|---|
| ETV | Viện Kiểm định Công nghệ và Môi trường |
| HTQL | Hệ thống quản lý |
| LĐV | Lãnh đạo Viện |
| LĐP / TP | Lãnh đạo Phòng / Trưởng phòng, người phụ trách lĩnh vực |
| NTH | Người thực hiện (mọi nhân sự, không phân biệt chức vụ) |
| QLCL | Phụ trách Quản lý chất lượng |
| QTHT | Quản trị hệ thống |
| CSH | Chủ sở hữu nền tảng |
| ĐMKT | Đầu mối kỹ thuật |
| API | Giao diện lập trình ứng dụng |
| SaaS | Phần mềm dạng dịch vụ |
| AIA | Đánh giá tác động hệ thống trí tuệ nhân tạo (theo ETV.P29) |
| KPH | Sự không phù hợp và hành động khắc phục (theo ETV.P13) |
| RACI | Responsible – Accountable – Consulted – Informed |

---

## V. VAI TRÒ VÀ TRÁCH NHIỆM (RACI)

### 5.1. Ma trận RACI

| Bước trong vòng đời nền tảng | NTH | CSH | ĐMKT | LĐP | QLCL | LĐV | QTHT |
|---|---|---|---|---|---|---|---|
| Đề xuất đăng ký nền tảng mới | C | **R** | C | C | I | I | I |
| Lập bản ghi nền tảng (F35.01) | I | **R** | **R** | I | C | I | I |
| Cấp mã nền tảng | I | I | I | I | **R/A** | I | I |
| Lập hồ sơ đánh giá trước vận hành (F35.02) | I | **R/A** | **R** | C | C | I | C |
| Soát xét bản ghi và hồ sơ đánh giá | I | I | **R/A** | **R/A** | C | I | C |
| Kiểm tra tính đầy đủ trước khi trình phê duyệt | I | C | C | I | **R/A** | I | I |
| Phê duyệt đăng ký và đưa vào vận hành | I | C | C | C | C | **R/A** | I |
| Phê duyệt ngoại lệ có thời hạn (§6.2.3) | I | C | C | I | **R** | **A** | I |
| Bật kiểm tra sức khỏe, kết nối bộ chuyển đổi | I | I | **R** | I | I | I | **R/A** |
| Theo dõi tình trạng vận hành hằng ngày | C | A | **R** | I | I | I | C |
| Ghi nhận và xử lý sự cố nền tảng (F35.03) | C | **A** | **R** | I | C | I | C |
| Đóng phiếu sự cố | I | **R/A** | **R** | I | C | I | I |
| Thay đổi nhỏ | I | **R/A** | **R** | I | I | I | I |
| Thay đổi cấu hình kết nối | I | **A** | **R** | C | C | I | C |
| Thay đổi lớn | I | **R** | C | C | C | **R/A** | I |
| Rà soát định kỳ bản ghi | I | **R/A** | C | C | **R** | I | I |
| Đề nghị ngừng vận hành (F35.04) | I | **R** | C | C | C | I | I |
| Kiểm tra đối tượng còn phụ thuộc trước khi ngừng | I | C | C | I | **R/A** | I | C |
| Phê duyệt ngừng vận hành | I | C | C | I | C | **R/A** | I |
| Cắt kết nối, xử lý dữ liệu, thu hồi quyền truy cập | I | A | **R** | I | C | I | **R** |
| Xử lý nền tảng chưa đăng ký (§6.6) | **R** | C | C | C | **R/A** | **A** | I |
| Tổng hợp báo cáo phục vụ xem xét của lãnh đạo | I | C | C | C | **R/A** | I | I |
| Lưu trữ hồ sơ nền tảng | I | I | C | I | **R/A** | I | I |

> LĐV luôn là **A** cuối cùng đối với việc **đưa nền tảng vào vận hành**, **phê duyệt ngoại lệ** và **ngừng vận hành** — không uỷ quyền.

### 5.2. Trách nhiệm cụ thể

**Lãnh đạo Viện (LĐV):** Phê duyệt đăng ký nền tảng số mới và việc đưa nền tảng vào vận hành; phê duyệt việc ngừng vận hành, tuyên bố hết hiệu lực hoặc hủy bản ghi nền tảng; phê duyệt ngoại lệ đối với nền tảng chưa đáp ứng đủ điều kiện đưa vào vận hành (§6.2.3); quyết định biện pháp xử lý khi nền tảng mức trọng yếu Cao mất khả năng hoạt động; xem xét tình hình nền tảng số trong cuộc họp xem xét của lãnh đạo (ETV.P17).

**Phụ trách Quản lý chất lượng (QLCL):** Quản trị Danh mục nền tảng số (F35.01), cấp mã nền tảng, duy trì danh mục chuẩn phân nhóm nền tảng; kiểm tra tính đầy đủ hồ sơ đánh giá trước vận hành (F35.02) trước khi trình LĐV; theo dõi nền tảng **đến hạn rà soát**, nền tảng ở tình trạng Suy giảm/Ngừng kéo dài và báo cáo LĐV; chủ trì xử lý nền tảng chưa đăng ký; tổng hợp báo cáo phục vụ xem xét của lãnh đạo; lưu trữ hồ sơ theo ETV.P15.

**Chủ sở hữu nền tảng (CSH):** Đề xuất đăng ký nền tảng mới và chịu trách nhiệm về **lý do nghiệp vụ** của nền tảng; xác định mức trọng yếu và mức phân loại dữ liệu xử lý trên nền tảng; rà soát định kỳ bản ghi nền tảng; đề xuất ngừng vận hành khi nền tảng không còn cần thiết; bảo đảm người dùng thuộc phạm vi quản lý chỉ sử dụng nền tảng đã được phê duyệt.

**Đầu mối kỹ thuật (ĐMKT):** Cấu hình bộ chuyển đổi, điểm tích hợp và tham số kiểm tra sức khỏe; theo dõi tình trạng vận hành hằng ngày, ghi nhận và xử lý sự cố nền tảng (F35.03); thực hiện thay đổi kỹ thuật đã được phê duyệt và ghi đầy đủ nhật ký thay đổi; thực hiện cắt kết nối, thu hồi quyền truy cập khi ngừng vận hành.

**Quản trị hệ thống (QTHT):** Vận hành ManLab Module M35, bảo đảm phân quyền theo vai trò và ghi nhật ký thao tác; bảo đảm bí mật xác thực của nền tảng được lưu đúng nơi theo ETV.P28, **không** nằm trong bản ghi nền tảng; thực hiện thao tác kỹ thuật theo quyết định của LĐV/CSH — **không** tự quyết định nền tảng nào được dùng.

**Lãnh đạo Phòng (LĐP):** Soát xét bản ghi nền tảng thuộc lĩnh vực phụ trách; bố trí nguồn lực; báo cáo QLCL khi phát hiện nền tảng chưa đăng ký trong phạm vi quản lý.

**Người thực hiện (NTH):** Chỉ sử dụng nền tảng số đã được phê duyệt cho công việc của Viện; báo cáo QLCL khi phát hiện nền tảng đang được sử dụng mà chưa đăng ký; báo cáo ĐMKT khi phát hiện nền tảng hoạt động bất thường.

### 5.3. Nguyên tắc tách vai trò và giới hạn của AI

- Người lập ≠ người soát xét ≠ người phê duyệt. Người soát xét là ĐMKT/LĐP khác người lập.
- Người trực tiếp thực hiện thay đổi kỹ thuật **không** đồng thời là người phê duyệt thay đổi đó.
- Trợ lý AI **không** được lập bản ghi nền tảng chính thức, **không** soát xét, **không** phê duyệt và **không** tự thay đổi cấu hình nền tảng trên môi trường vận hành (ISO/IEC 42001; ETV.P29). AI chỉ gợi ý, cảnh báo, đối chiếu; mọi gợi ý phải được người có thẩm quyền xác nhận.

---

## VI. NỘI DUNG / QUY TRÌNH THỰC HIỆN

### 6.1. Danh mục nền tảng số (Biểu mẫu F35.01)

#### 6.1.1. Phân nhóm nền tảng

| TT | Nhóm nền tảng | Ví dụ tại Viện |
|---|---|---|
| 1 | Nền tảng lõi nghiệp vụ | ManLab – Hệ điều hành doanh nghiệp ETV |
| 2 | Nền tảng đối tác/liên thông | VI-CONNECT, cổng dữ liệu cơ quan quản lý nhà nước |
| 3 | Nền tảng văn phòng và cộng tác | Thư điện tử, lưu trữ đám mây, hội họp trực tuyến |
| 4 | Nền tảng dịch vụ khách hàng | Website, cổng tra cứu kết quả, cổng chứng chỉ số |
| 5 | Nền tảng dữ liệu và phân tích | Kho dữ liệu, công cụ báo cáo |
| 6 | Nền tảng trí tuệ nhân tạo | Dịch vụ mô hình ngôn ngữ, cổng công cụ AI |
| 7 | Nền tảng phát triển và vận hành | Kho mã nguồn, hệ thống tích hợp liên tục, môi trường thử nghiệm |

#### 6.1.2. Môi trường

| Môi trường | Ý nghĩa | Yêu cầu bắt buộc |
|---|---|---|
| **PRODUCTION** | Phục vụ công việc thật, dữ liệu thật | Bắt buộc có hồ sơ đánh giá trước vận hành (F35.02) đã phê duyệt; bắt buộc bật kiểm tra sức khỏe |
| **STAGING** | Kiểm thử trước khi phát hành | Bắt buộc ghi rõ dữ liệu sử dụng là dữ liệu thật hay dữ liệu giả lập; nếu là dữ liệu thật thì áp dụng nguyên yêu cầu của PRODUCTION |
| **INTERNAL** | Dùng riêng trong Viện | Bắt buộc có chủ sở hữu và mức phân loại dữ liệu |

Nền tảng ở môi trường khác nhau được đăng ký thành **các bản ghi riêng biệt**, không gộp chung một bản ghi.

#### 6.1.3. Mức trọng yếu và hành động yêu cầu

| Mức | Ý nghĩa | Hành động bắt buộc |
|---|---|---|
| **Thấp** | Ngừng hoạt động không ảnh hưởng đáng kể | Rà soát theo chu kỳ; kiểm tra sức khỏe không bắt buộc |
| **Trung bình** | Ảnh hưởng tới hiệu quả một quá trình/một phòng | Bắt buộc bật kiểm tra sức khỏe; có phương án thay thế tạm thời |
| **Cao** | Ngừng hoạt động ảnh hưởng tới năng lực kỹ thuật, khả năng cung cấp dịch vụ, hoặc gây mất/lộ dữ liệu Hạn chế/Mật | Bắt buộc bật kiểm tra sức khỏe; bắt buộc có kế hoạch duy trì liên tục theo ETV.P31 và ≥ 01 rủi ro đã mở tại ETV.P01; rà soát ≤ 01 năm |

Thang trọng yếu này chỉ dùng để **sàng lọc mức ưu tiên**; việc đánh giá và xử lý rủi ro thực hiện theo ETV.P01.

#### 6.1.4. Phân loại dữ liệu xử lý trên nền tảng

Bản ghi nền tảng dùng **nguyên** thang phân loại thông tin của Viện: **Công khai · Nội bộ · Hạn chế · Mật** (ETV.P02, ETV.P27, ETV.P28), ghi theo **mức cao nhất** của dữ liệu mà nền tảng xử lý hoặc lưu trữ. Thủ tục này **không** định nghĩa thang phân loại riêng.

Nền tảng **thuê ngoài** xử lý dữ liệu mức **Hạn chế** hoặc **Mật** chỉ được phê duyệt khi có hồ sơ đánh giá nhà cung cấp theo ETV.P06 và cam kết bảo mật/thỏa thuận xử lý dữ liệu còn hiệu lực.

#### 6.1.5. Chu kỳ rà soát

| Mức trọng yếu | Chu kỳ rà soát mặc định |
|---|---|
| Cao | ≤ 01 năm |
| Trung bình | 02 năm |
| Thấp | Theo sự kiện (khi có thay đổi liên quan) |

Chủ sở hữu có thể đề xuất chu kỳ ngắn hơn (06 tháng) đối với nền tảng thay đổi nhanh hoặc nền tảng AI. Quá hạn rà soát, hệ thống gắn cờ **Đến hạn rà soát** và cảnh báo chủ sở hữu; quá **02 chu kỳ** liên tiếp, cảnh báo tới LĐV. Hệ thống **không** tự chuyển bản ghi sang Hết hiệu lực — việc tuyên bố một nền tảng không còn dùng luôn do con người quyết định.

#### 6.1.6. Bộ chuyển đổi và điểm tích hợp

- Mỗi nền tảng có **đúng một** loại bộ chuyển đổi. Loại bộ chuyển đổi phải khớp một thành phần đã triển khai thật; **không** chấp nhận giá trị tự do không tương ứng triển khai.
- Nền tảng chưa có quyền truy cập API thật đăng ký với **bộ chuyển đổi tạm**; ở trạng thái này nền tảng **không được** dùng làm căn cứ cho bất kỳ nghiệp vụ tự động nào, và phải xác nhận lại khi có quyền truy cập API thật.
- Mỗi điểm tích hợp được ghi tối thiểu: nền tảng đối tác, hướng truyền dữ liệu (đi/đến/hai chiều), loại dữ liệu trao đổi, mức phân loại cao nhất, phương thức xác thực và nơi lưu bí mật xác thực.
- Hợp đồng dữ liệu và ánh xạ trường dữ liệu của điểm tích hợp thuộc ETV.P37; bản ghi nền tảng chỉ dẫn chiếu.

#### 6.1.7. Trình tự đăng ký và phê duyệt bản ghi nền tảng

| Bước | Nội dung thực hiện | Trách nhiệm | Biểu mẫu |
|---|---|---|---|
| 1 | Lập bản ghi (trạng thái **Nháp**): mã nền tảng, tên gọi, nhóm, môi trường, địa chỉ giao diện, địa chỉ gốc API, chủ sở hữu, đầu mối kỹ thuật, mức trọng yếu, mức phân loại dữ liệu, loại bộ chuyển đổi, điểm tích hợp, chu kỳ rà soát, đường dẫn hồ sơ gốc | CSH, ĐMKT, QLCL | `ETV.P.F 35.01` |
| 2 | Chuyển **Chờ soát xét** khi đã đủ trường bắt buộc và đã đính kèm hồ sơ đánh giá trước vận hành đối với nền tảng PRODUCTION | Người lập | `ETV.P.F 35.01`, `ETV.P.F 35.02` |
| 3 | Soát xét: mã nền tảng không trùng, bộ chuyển đổi khớp triển khai thật, điểm tích hợp đầy đủ, không trùng lặp với nền tảng đã có. Đạt → Chờ phê duyệt; Không đạt → **Không soát xét** (bắt buộc ghi lý do) | ĐMKT/LĐP (≠ người lập) | `ETV.P.F 35.01` |
| 4 | Kiểm tra tính đầy đủ và trình LĐV kèm hồ sơ F35.02 | QLCL | `ETV.P.F 35.02` |
| 5 | Phê duyệt → **Đã phê duyệt**; không đạt → **Không phê duyệt** (bắt buộc ghi lý do). Hệ thống chặn phê duyệt nếu vi phạm §6.2.3 | **LĐV** | `ETV.P.F 35.02` |
| 6 | Đưa vào vận hành: bật kiểm tra sức khỏe, kết nối bộ chuyển đổi; bản ghi chuyển **Hiệu lực** | QTHT, ĐMKT | `ETV.P.F 35.01` |
| 7 | Rà soát định kỳ: xác nhận còn cần thiết và còn đúng, hoặc lập thay đổi theo §6.4, hoặc đề nghị ngừng vận hành theo §6.5 | CSH | `ETV.P.F 35.01` |

Bản ghi ở trạng thái **Nháp** hoặc bị trả lại **không** được dùng làm căn cứ cho bất kỳ nghiệp vụ nào; không được đăng ký tác tử/công cụ (ETV.P29) trỏ vào bản ghi đó.

#### 6.1.8. Mã nền tảng

Mã nền tảng do QLCL cấp, **duy nhất toàn hệ thống**, viết in hoa không dấu, không chứa khoảng trắng. Mã của nền tảng đã Hủy hoặc Hết hiệu lực **không được cấp lại** cho nền tảng khác — nhằm giữ nguyên giá trị truy vết của nhật ký lịch sử.

### 6.2. Đánh giá trước khi đưa vào vận hành (Biểu mẫu F35.02)

#### 6.2.1. Khi nào phải lập

Bắt buộc lập hồ sơ đánh giá trước vận hành trong các trường hợp:

- Đăng ký mới một nền tảng ở môi trường **PRODUCTION**
- Nền tảng ở môi trường **STAGING** có xử lý dữ liệu thật
- Nền tảng thuê ngoài xử lý dữ liệu mức **Hạn chế** hoặc **Mật**
- Chuyển một nền tảng từ STAGING/INTERNAL lên PRODUCTION

#### 6.2.2. Nội dung đánh giá

| Nhóm nội dung | Câu hỏi phải trả lời |
|---|---|
| Nhu cầu nghiệp vụ | Nền tảng phục vụ quá trình nào? Có trùng lặp với nền tảng đã có không? |
| Dữ liệu | Xử lý dữ liệu gì, mức phân loại cao nhất, lưu ở đâu, ai truy cập được? |
| An toàn thông tin | Cơ chế xác thực, phân quyền, mã hóa, nhật ký; bí mật xác thực lưu ở đâu (ETV.P28)? |
| Nhà cung cấp | Nếu thuê ngoài: đã đánh giá theo ETV.P06 chưa; cam kết bảo mật, thỏa thuận mức dịch vụ và điều khoản trả lại dữ liệu? |
| Xác nhận giá trị sử dụng | Nếu nền tảng tham gia xử lý dữ liệu kiểm định/hiệu chuẩn/thử nghiệm: đã xác nhận giá trị sử dụng theo ISO/IEC 17025 §7.11 chưa (bằng chứng kèm theo)? |
| Tính liên tục | Mức trọng yếu; phương án khi nền tảng ngừng hoạt động; sao lưu và khả năng phục hồi (ETV.P31) |
| Tích hợp | Các điểm tích hợp phát sinh; ảnh hưởng tới nền tảng đang chạy |
| Trí tuệ nhân tạo | Nền tảng có thành phần AI không; nếu có, đã có hồ sơ AIA theo ETV.P29 chưa? |
| Dữ liệu cá nhân | Nền tảng có xử lý dữ liệu cá nhân không; nếu có, căn cứ pháp lý và biện pháp bảo vệ theo §3.2 |
| Rủi ro | Rủi ro đã nhận diện và mã rủi ro tương ứng đã mở tại ETV.P01 |

#### 6.2.3. Điều kiện chặn cứng

Bản ghi nền tảng **không được phê duyệt đưa vào vận hành** nếu thiếu một trong bảy điều kiện tại **Phụ lục I.1**. Đây là điều kiện **chặn cứng**: hệ thống ManLab từ chối thao tác phê duyệt khi chưa đủ.

Trường hợp cấp bách, LĐV có thể phê duyệt **ngoại lệ có thời hạn** — bắt buộc ghi lý do, ghi thời hạn khắc phục **không quá 90 ngày** và mở rủi ro tương ứng tại ETV.P01. Quá thời hạn khắc phục mà chưa đủ điều kiện, bản ghi tự gắn cờ cảnh báo tới LĐV.

### 6.3. Giám sát tình trạng và sự cố nền tảng (Biểu mẫu F35.03)

#### 6.3.1. Kiểm tra sức khỏe

- Nền tảng mức trọng yếu **Cao** và **Trung bình**: bắt buộc bật kiểm tra sức khỏe tự động.
- Kết quả kiểm tra cập nhật trường **tình trạng vận hành**: Hoạt động tốt · Suy giảm · Ngừng · Chưa xác định.
- Tình trạng vận hành **tách biệt hoàn toàn** với vòng đời phê duyệt: nền tảng chuyển sang Suy giảm hay Ngừng **không** làm bản ghi quay lại quy trình soát xét/phê duyệt.
- Tình trạng **Chưa xác định** kéo dài quá 07 ngày được coi là **mất giám sát** và phải xử lý như một sự cố.

#### 6.3.2. Ngưỡng cảnh báo và xử lý

| Tình huống | Xử lý | Trách nhiệm |
|---|---|---|
| Nền tảng mức Cao ở tình trạng **Ngừng** | Xử lý ngay, thông báo CSH và LĐV trong vòng **01 giờ**; ghi phiếu sự cố (F35.03) | ĐMKT |
| Nền tảng mức Cao ở tình trạng **Suy giảm** quá 24 giờ | Ghi phiếu sự cố; quyết định kích hoạt phương án thay thế | ĐMKT, CSH |
| Nền tảng mức Trung bình **Ngừng** quá 24 giờ | Ghi phiếu sự cố; báo cáo CSH | ĐMKT |
| Nền tảng bất kỳ ở tình trạng **Chưa xác định** quá 07 ngày | Ghi phiếu sự cố mất giám sát; khôi phục kiểm tra sức khỏe | ĐMKT |
| Sự cố có dấu hiệu mất an toàn thông tin | **Đồng thời** xử lý theo ETV.P28; không đóng phiếu F35.03 trước khi ETV.P28 kết luận | ĐMKT, PT.ATTT |
| Sự cố lặp lại ≥ 03 lần trong 90 ngày | Lập sự không phù hợp và hành động khắc phục theo ETV.P13 | QLCL |

#### 6.3.3. Đóng phiếu sự cố

Phiếu sự cố chỉ được đóng khi có đủ: nguyên nhân, biện pháp đã thực hiện, xác nhận nền tảng trở lại tình trạng Hoạt động tốt, và kết luận có/không phải lập bài học kinh nghiệm theo ETV.P26.

### 6.4. Thay đổi nền tảng và điểm tích hợp

#### 6.4.1. Phân loại thay đổi

| Loại thay đổi | Ví dụ | Thẩm quyền |
|---|---|---|
| **Thay đổi nhỏ** | Sửa tên hiển thị, cập nhật đầu mối kỹ thuật, sửa mô tả | CSH duyệt; ghi nhật ký thay đổi |
| **Thay đổi cấu hình kết nối** | Đổi địa chỉ gốc API, đổi loại bộ chuyển đổi, thêm/bớt điểm tích hợp | Soát xét bởi ĐMKT (≠ người đề xuất) + phê duyệt của CSH; **bắt buộc** ghi nhật ký thay đổi |
| **Thay đổi lớn** | Đổi môi trường (STAGING → PRODUCTION), đổi mức trọng yếu lên Cao, đổi mức phân loại dữ liệu lên Hạn chế/Mật, đổi nhà cung cấp | Trình lại theo §6.1.7 và lập/soát xét lại F35.02; **LĐV** phê duyệt; thay đổi có ảnh hưởng liên phòng áp dụng thêm ETV.P30 |

#### 6.4.2. Quy tắc bắt buộc

- **Mọi** thay đổi địa chỉ gốc API, loại bộ chuyển đổi hoặc điểm tích hợp của một nền tảng **đang có tác tử/công cụ hoạt động** (ETV.P29) đều **bắt buộc ghi nhật ký thay đổi**, vì ảnh hưởng trực tiếp tới cổng công cụ.
- **Không** sửa đè bản ghi nền tảng đang Hiệu lực bằng thay đổi thuộc loại "thay đổi lớn"; phải lập phiên bản mới có liên kết tới phiên bản bị thay thế.
- **Mã nền tảng không được sửa** sau khi bản ghi đã phê duyệt. Nếu cần mã khác, phải ngừng vận hành bản ghi cũ và đăng ký bản ghi mới.

### 6.5. Ngừng vận hành nền tảng số (Biểu mẫu F35.04)

#### 6.5.1. Căn cứ ngừng vận hành

Nền tảng được đề nghị ngừng vận hành khi: không còn nhu cầu nghiệp vụ; bị thay thế bởi nền tảng khác; hết hạn hợp đồng thuê dịch vụ; nhà cung cấp chấm dứt dịch vụ; hoặc nền tảng không còn đáp ứng yêu cầu an toàn thông tin.

#### 6.5.2. Trình tự thực hiện

| Bước | Nội dung thực hiện | Trách nhiệm | Biểu mẫu |
|---|---|---|---|
| 1 | Lập phiếu ngừng vận hành: lý do, nền tảng thay thế (nếu có), danh sách điểm tích hợp bị ảnh hưởng, danh sách dữ liệu cần xử lý | CSH | `ETV.P.F 35.04` |
| 2 | Xác nhận phương án kỹ thuật: trích xuất/di chuyển dữ liệu, cắt điểm tích hợp, thu hồi quyền truy cập và bí mật xác thực | ĐMKT | `ETV.P.F 35.04` |
| 3 | Kiểm tra: mọi tác tử/công cụ (ETV.P29) và dịch vụ số (ETV.P38) trỏ tới nền tảng này đã được chuyển hướng hoặc dừng | QLCL | `ETV.P.F 35.04` |
| 4 | Phê duyệt ngừng vận hành (bắt buộc ghi lý do) | **LĐV** | `ETV.P.F 35.04` |
| 5 | Thực hiện cắt kết nối, xử lý dữ liệu theo ETV.P27/ETV.P34, thu hồi quyền truy cập | ĐMKT, QTHT | Biên bản xử lý dữ liệu |
| 6 | Chuyển bản ghi sang **Hết hiệu lực**; lưu hồ sơ theo ETV.P15 | QLCL | `ETV.P.F 35.01` |

#### 6.5.3. Điều kiện chặn cứng khi ngừng vận hành

Không được chuyển bản ghi sang **Hết hiệu lực** khi còn tồn tại tác tử, công cụ (ETV.P29) hoặc dịch vụ số (ETV.P38) đang hoạt động và trỏ tới nền tảng đó. Hệ thống ManLab từ chối thao tác và chỉ ra danh sách đối tượng còn phụ thuộc.

Dữ liệu trên nền tảng ngừng vận hành phải được xử lý theo ETV.P27/ETV.P34 (trích xuất, chuyển giao hoặc hủy có kiểm soát) **trước khi** chấm dứt quyền truy cập; biên bản xử lý dữ liệu đính kèm F35.04.

### 6.6. Nền tảng chưa đăng ký

Nền tảng số đang được sử dụng cho công việc của Viện mà **chưa có bản ghi đăng ký** được coi là **không phù hợp**. Khi phát hiện:

1. QLCL lập bản ghi ở trạng thái Nháp và thông báo cho người đang sử dụng, xác định chủ sở hữu.
2. Nếu nền tảng cần thiết → đưa vào trình tự đăng ký tại §6.1.7 trong thời hạn **30 ngày**.
3. Nếu nền tảng không cần thiết hoặc không đáp ứng điều kiện tại §6.2.3 → **ngừng sử dụng ngay**, xử lý dữ liệu đã đưa lên theo ETV.P27/ETV.P34.
4. Trường hợp đã đưa dữ liệu mức **Hạn chế/Mật** lên nền tảng chưa đăng ký → lập sự không phù hợp theo ETV.P13 và xử lý sự cố theo ETV.P28.

### 6.7. Quan hệ với quản trị trí tuệ nhân tạo và dịch vụ số

- Danh mục nền tảng số là **nền cho bộ lọc** của trang quản trị AI: mọi tác tử, công cụ, lời nhắc, nhật ký suy luận và số liệu sử dụng tại ETV.P29 đều tham chiếu tới một mã nền tảng đã đăng ký ở thủ tục này.
- Đăng ký một tác tử/công cụ trỏ tới nền tảng **không tồn tại**, **chưa phê duyệt**, **Hết hiệu lực** hoặc **đã Hủy** là lỗi ràng buộc — hệ thống từ chối.
- Dịch vụ số cung cấp cho khách hàng (ETV.P38) phải khai báo nền tảng vận hành dịch vụ đó; dịch vụ không được công bố nếu nền tảng chưa ở trạng thái Hiệu lực.

### 6.8. Báo cáo và xem xét

QLCL tổng hợp **06 tháng/lần** và trước mỗi cuộc họp xem xét của lãnh đạo (ETV.P17): tổng số nền tảng theo nhóm và môi trường; nền tảng mới đăng ký và nền tảng ngừng vận hành trong kỳ; nền tảng đến hạn/quá hạn rà soát; thống kê sự cố và thời gian ngừng hoạt động của nền tảng mức Cao; nền tảng đang vận hành theo ngoại lệ có thời hạn; nền tảng phát hiện chưa đăng ký trong kỳ.

Thủ tục này được soát xét định kỳ theo ETV.P14 §6.10, hoặc đột xuất khi có thay đổi về kiến trúc nền tảng, nhà cung cấp trọng yếu hoặc yêu cầu pháp lý liên quan.

---

## VII. BIỂU MẪU ÁP DỤNG

| Mã biểu mẫu | Tên biểu mẫu | Nơi lưu bản gốc |
|---|---|---|
| **ETV.P.F 35.01** | Danh mục nền tảng số | `06_SHARED_RESOURCES/01_Forms/` |
| **ETV.P.F 35.02** | Phiếu đánh giá nền tảng số trước khi đưa vào vận hành | `06_SHARED_RESOURCES/01_Forms/` |
| **ETV.P.F 35.03** | Phiếu sự cố và nhật ký giám sát nền tảng số | `06_SHARED_RESOURCES/01_Forms/` |
| **ETV.P.F 35.04** | Phiếu ngừng vận hành nền tảng số | `06_SHARED_RESOURCES/01_Forms/` |

Việc đánh giá nhà cung cấp sử dụng lại bộ biểu mẫu của ETV.P06; hồ sơ đánh giá tác động AI sử dụng lại biểu mẫu của ETV.P29; phiếu hành động khắc phục sử dụng biểu mẫu của ETV.P13 — **không** lập biểu mẫu mới ở thủ tục này (nguyên tắc một nơi duy nhất, ETV.P14).

---

## VIII. LƯU HỒ SƠ

Việc lập, lưu giữ, bảo quản, tra cứu, phân quyền truy cập và thanh lý hồ sơ thực hiện theo **ETV.P15 – Kiểm soát hồ sơ**; thời hạn lưu và phân quyền chi tiết theo **ETV.P.F 14.06 (Danh mục phân quyền và thời hạn lưu)**. Thủ tục này **không** quy định lại cơ chế lưu trữ, chỉ đăng ký các hồ sơ phát sinh và thời hạn đề xuất để cập nhật vào danh mục đó.

| Hồ sơ | Người lưu | Thời hạn lưu đề xuất |
|---|---|---|
| Danh mục nền tảng số (F35.01) và các phiên bản | QLCL | Vĩnh viễn trên ManLab |
| Phiếu đánh giá trước vận hành (F35.02) | QLCL | Suốt vòng đời nền tảng + 05 năm |
| Phiếu sự cố nền tảng (F35.03) | ĐMKT, sao gửi QLCL | 05 năm sau khi đóng |
| Phiếu ngừng vận hành (F35.04) kèm biên bản xử lý dữ liệu | QLCL | 10 năm |
| Hồ sơ phê duyệt ngoại lệ có thời hạn | QLCL | 10 năm |
| Nhật ký thay đổi cấu hình nền tảng | QTHT | Theo ETV.P28 |
| Kết quả kiểm tra sức khỏe | QTHT | 02 năm |
| Báo cáo tình hình nền tảng số phục vụ xem xét của lãnh đạo | QLCL | Theo ETV.P17 |

---

## IX. CÁC PHỤ LỤC

### Phụ lục I — Ma trận kiểm soát rủi ro và điều kiện chặn cứng

*(Dẫn chiếu từ §6.2.3, §6.4, §6.5.3 và §6.6. Hệ thống ManLab thực thi các điều kiện này bằng ràng buộc kỹ thuật.)*

**I.1. Bảy điều kiện chặn cứng trước khi phê duyệt đưa nền tảng vào vận hành**

| TT | Điều kiện | Áp dụng cho |
|---|---|---|
| 1 | Có **chủ sở hữu** và **đầu mối kỹ thuật** là người cụ thể đang làm việc tại Viện | Mọi nền tảng |
| 2 | Có **mức phân loại dữ liệu** và mức đó nhất quán với mô tả dữ liệu tại F35.02 | Mọi nền tảng |
| 3 | Có hồ sơ **F35.02 đã phê duyệt** và đã bật kiểm tra sức khỏe | Nền tảng PRODUCTION |
| 4 | Có **≥ 01 rủi ro đã mở** tại ETV.P01 và phương án liên tục theo ETV.P31 | Nền tảng mức trọng yếu Cao |
| 5 | Có hồ sơ **đánh giá nhà cung cấp** theo ETV.P06 còn hiệu lực | Nền tảng thuê ngoài xử lý dữ liệu Hạn chế/Mật |
| 6 | Có hồ sơ **AIA** theo ETV.P29 | Nền tảng có thành phần AI |
| 7 | Bản ghi **không** chứa mật khẩu, khóa API hoặc bí mật xác thực | Mọi nền tảng |

**I.2. Các tình huống bị chặn hoặc phải xử lý bắt buộc**

| Tình huống | Xử lý |
|---|---|
| Bản ghi không có chủ sở hữu hoặc đầu mối kỹ thuật là người cụ thể | **Không cho lưu** |
| Bản ghi chứa mật khẩu, khóa API, chứng thư số | **Cấm tuyệt đối**; thu hồi bí mật xác thực ngay theo ETV.P28 và lập KPH theo ETV.P13 |
| Nền tảng PRODUCTION chưa có hồ sơ F35.02 đã phê duyệt | **Chặn phê duyệt** (§6.2.3) |
| Nền tảng mức trọng yếu Cao chưa có rủi ro tại ETV.P01 và phương án liên tục theo ETV.P31 | **Chặn phê duyệt** |
| Nền tảng thuê ngoài xử lý dữ liệu Hạn chế/Mật chưa đánh giá nhà cung cấp theo ETV.P06 | **Chặn phê duyệt** |
| Nền tảng có thành phần AI chưa có hồ sơ AIA theo ETV.P29 | **Chặn phê duyệt** |
| Đăng ký tác tử/công cụ (ETV.P29) trỏ tới nền tảng không tồn tại, chưa phê duyệt hoặc đã hết hiệu lực | **Lỗi ràng buộc — từ chối thao tác** |
| Đổi địa chỉ gốc API hoặc bộ chuyển đổi mà không ghi nhật ký thay đổi | **Không cho lưu** |
| Ngừng vận hành nền tảng khi còn tác tử/công cụ/dịch vụ số đang phụ thuộc | **Chặn thao tác** |
| Chấm dứt quyền truy cập nền tảng trước khi xử lý xong dữ liệu | **Không chấp nhận**; phải hoàn tất theo ETV.P27/ETV.P34 |
| Tái sử dụng mã nền tảng của nền tảng đã Hủy/Hết hiệu lực | **Không cho phép** |
| Nền tảng vận hành theo ngoại lệ quá thời hạn khắc phục | Cảnh báo LĐV; đưa vào báo cáo xem xét của lãnh đạo |
| Sử dụng nền tảng chưa đăng ký cho công việc của Viện | Xử lý theo §6.6; nếu đã đưa dữ liệu Hạn chế/Mật lên thì lập KPH theo ETV.P13 |
| Nền tảng đăng ký với bộ chuyển đổi tạm được dùng làm căn cứ cho nghiệp vụ tự động | **Không chấp nhận** |
| Trợ lý AI lập bản ghi chính thức, soát xét, phê duyệt hoặc tự đổi cấu hình nền tảng vận hành | **Cấm tuyệt đối** |

### Phụ lục II — Bảng trạng thái và thẩm quyền thao tác

*(Dẫn chiếu từ §6.1.7, §6.3, §6.5)*

**II.1. Bản ghi nền tảng**

| STT | Trạng thái | Ý nghĩa | Người thao tác | Bắt buộc lý do |
|---|---|---|---|---|
| 1 | Nháp | Đang soạn | CSH, ĐMKT, QLCL | Không |
| 2 | Chờ soát xét | Chờ kiểm tra kỹ thuật và trùng lặp | Người lập | Không |
| 3 | Không soát xét | Bị trả lại để sửa | ĐMKT/LĐP (≠ người lập) | **Có** |
| 4 | Chờ phê duyệt | Chờ LĐV | QLCL | Không |
| 5 | Không phê duyệt | Bị trả lại để sửa | LĐV | **Có** |
| 6 | Đã phê duyệt | Được chấp thuận, chờ đưa vào vận hành | LĐV | Không |
| 7 | Hiệu lực | Đang vận hành, được tham chiếu bởi ETV.P29/ETV.P38 | QTHT/ĐMKT (sau khi bật kiểm tra sức khỏe) | Không |
| 8 | Hết hiệu lực | Đã ngừng vận hành hoặc bị thay thế | LĐV (qua phiếu F35.04) hoặc tự động khi phiên bản mới được phê duyệt | **Có** |
| 9 | Hủy | Bỏ bản ghi trước khi phê duyệt | LĐV | **Có** |

Cờ **Đến hạn rà soát** và cờ **Ngoại lệ quá hạn khắc phục** không phải trạng thái hồ sơ, mà là cảnh báo tính theo §6.1.5 và §6.2.3.

**II.2. Tình trạng vận hành (không phải trạng thái hồ sơ)**

| Tình trạng | Ý nghĩa | Nguồn cập nhật |
|---|---|---|
| Hoạt động tốt (HEALTHY) | Kiểm tra sức khỏe đạt | Tiến trình tự động |
| Suy giảm (DEGRADED) | Hoạt động nhưng không đầy đủ hoặc chậm bất thường | Tiến trình tự động |
| Ngừng (DOWN) | Không truy cập được | Tiến trình tự động |
| Chưa xác định (UNKNOWN) | Chưa bật kiểm tra sức khỏe hoặc kiểm tra không chạy | Tiến trình tự động |

Tình trạng vận hành chỉ áp dụng cho bản ghi ở trạng thái **Hiệu lực** và **không** kéo bản ghi quay lại quy trình phê duyệt.

**II.3. Các đối tượng khác**

| Đối tượng | Chuỗi trạng thái | Thẩm quyền kết thúc |
|---|---|---|
| Hồ sơ đánh giá trước vận hành (F35.02) | Nháp → Chờ soát xét → Chờ phê duyệt → Đã phê duyệt / Không phê duyệt | LĐV |
| Phiếu sự cố nền tảng (F35.03) | Mới → Đang xử lý → Chờ xác nhận → Đã đóng / Hủy | CSH (Đã đóng) · LĐV (Hủy) |
| Phiếu ngừng vận hành (F35.04) | Nháp → Chờ phê duyệt → Đã phê duyệt → Đã thực hiện / Hủy | LĐV |

Mọi nhánh **Hủy**, **Không phê duyệt**, **Không soát xét** bắt buộc ghi lý do.
