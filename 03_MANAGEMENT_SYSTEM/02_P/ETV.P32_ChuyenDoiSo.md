---
# Khối metadata AI — bắt buộc cho mọi văn bản kiểm soát (ETV.P14 §6.3)
id: ETV.P32
title: "Thủ tục Chuyển đổi số và cải tiến hệ thống"
type: Thu-tuc
owner: "Phụ trách Quản lý chất lượng (QLCL)"
department: "Toàn Viện"
process: MP32_ChuyenDoiSo
capability: CAP-16_ChatLuong
module: M32_ChuyenDoiSo
effective_date: ""          # cập nhật khi được phê duyệt ban hành
revision: "01"
status: Cho-soat-xet
keywords: [chuyển đổi số, cải tiến, sáng kiến, số hóa quá trình, ManLab, ISO 9001 §10.3]
related_documents: [ETV.QM, ETV.P13, ETV.P14, ETV.P15, ETV.P17, ETV.P29, ETV.P30, ETV.P35]
iso_clause:
  - "ISO 9001:2015 §6.2, §6.3, §9.1, §10.1, §10.3"
  - "ISO/IEC 17025:2017 §7.11, §8.2.4, §8.5, §8.6, §8.9"
  - "ISO 17034:2016 §7.4, §8.5, §8.6, §8.9"
  - "ISO/IEC 27001:2022 §6.2, §6.3, §10.1, A.5.23, A.8.25, A.8.31, A.8.32, A.8.33"
  - "ISO/IEC 42001:2023 §6.1, §6.2, §8.1, §10.1"
legal_basis:
  - "Luật Giao dịch điện tử 20/2023/QH15"
  - "Nghị định 30/2020/NĐ-CP"
  - "Luật Đo lường 04/2011/QH13; Nghị định 105/2016/NĐ-CP; Nghị định 154/2018/NĐ-CP; Nghị định 107/2016/NĐ-CP"
ai_tags: [digital-transformation, continual-improvement, initiative-register]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 14.06"
digital_signature: "LĐV"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV)"
supersedes: null
superseded_by: null
---
# THỦ TỤC CHUYỂN ĐỔI SỐ VÀ CẢI TIẾN HỆ THỐNG

**Procedure For Digital Transformation And System Improvement**

|                   |                                 |
| ----------------- | ------------------------------- |
| **Mã số**         | ETV.P 32                        |
| **Lần ban hành**  | 01                              |
| **Ngày ban hành** | ..../..../........              |
| **Biên soạn**     | Dương Thành Nam                 |
| **Soát xét**      | Trần Thị Hoa (..../..../......) |
| **Phê duyệt**     | Nguyễn Hoàng Giang (..../..../......) |

> **Tình trạng bản này: CHỜ SOÁT XÉT** — dự thảo lần ban hành 01, chưa có hiệu lực áp dụng. Bản này chỉ được sử dụng sau khi Lãnh đạo Viện phê duyệt ban hành.

> **Về mã số:** Quy tắc mã hoá gốc tại `ETV.P14` §6.2 quy định thủ tục mang mã `ETV.P xx`. Trong Sổ tay chất lượng (`ETV.QM` §9.9) và một số thủ tục ban hành gần đây, thủ tục này được dẫn chiếu là **ETV.MP32** — cùng một tài liệu. Việc thống nhất cách dẫn chiếu trong toàn bộ HTQL được xử lý bằng một đợt soát xét riêng theo `ETV.P14`.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian | Nội dung thay đổi | Lần ban hành |
| --------- | ----------------- | ------------ |
| 25/08/2026 | Xây dựng mới, trình soát xét. Cụ thể hoá `ETV.QM` §9.9 và Chương X; thiết lập danh mục sáng kiến, cơ chế sàng lọc, thí điểm, xác nhận hiệu quả và chuẩn hóa; phân định phạm vi với `ETV.P13` (khắc phục, cải tiến), `ETV.P30` (quản lý thay đổi), `ETV.P35` (nền tảng số) | 01 |

> **Chú ý:** Văn bản nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

---

## I. MỤC ĐÍCH

Thủ tục này quy định nội dung, trách nhiệm và trình tự **đề xuất, sàng lọc, phê duyệt, triển khai, xác nhận hiệu quả và chuẩn hóa** các sáng kiến chuyển đổi số và cải tiến hệ thống quản lý, nhằm đáp ứng yêu cầu cải tiến liên tục của ISO 9001:2015 §10.3, ISO/IEC 17025:2017 §8.6 và Mục 9.9 của Sổ tay chất lượng. Áp dụng thống nhất trong toàn Viện Kiểm định Công nghệ và Môi trường (ETV), thực hiện qua phần mềm ManLab (Module M32).

Thủ tục bảo đảm:

- Hoạt động chuyển đổi số được triển khai **đồng bộ với cải tiến liên tục HTQL** và phù hợp chiến lược, bối cảnh của Viện
- Mọi sáng kiến có **chủ trì, đường cơ sở đo được và chỉ tiêu bằng số** trước khi triển khai
- Việc số hóa **không làm suy giảm** tính đúng đắn kỹ thuật, hiệu lực kết quả, khả năng truy xuất nguồn gốc và bằng chứng tuân thủ
- Sáng kiến khi triển khai luôn đi qua các kiểm soát đã có (`ETV.P30`, `ETV.P35`, `ETV.P29`, `ETV.P28`, `ETV.P06`) — **không** tạo cơ chế phê duyệt song song
- Kết quả cải tiến được **chuẩn hóa vào tài liệu HTQL và tri thức tổ chức**, không mất đi khi người chủ trì chuyển công tác
- Ngăn chặn **số hóa âm thầm** — công cụ, bảng tính, kịch bản, trợ lý AI cá nhân tự dựng và dùng vào công việc chính thức mà không được kiểm soát

## II. PHẠM VI ÁP DỤNG

### 2.1. Đối tượng áp dụng

Áp dụng cho toàn bộ vòng đời sáng kiến:

**Đề xuất → Sàng lọc → Phê duyệt → Triển khai → Thí điểm → Xác nhận hiệu quả → Chuẩn hóa → Đóng → Lưu hồ sơ**

đối với mọi đơn vị, phòng ban, cá nhân thuộc Viện và mọi nhóm sáng kiến sau:

| Nhóm sáng kiến | Ví dụ |
| -------------- | ----- |
| Cải tiến quá trình quản lý | Rút ngắn vòng phê duyệt, gộp bước trùng lặp, bỏ biểu mẫu không còn giá trị |
| Số hóa, tự động hóa nghiệp vụ | Chuyển hồ sơ giấy sang ManLab, tự động sinh phiếu, tự động cấp mã, thay chữ ký tay bằng chữ ký số |
| Dữ liệu và báo cáo | Bảng điều khiển theo dõi tiến độ, báo cáo tự động, liên thông dữ liệu giữa các module |
| Trí tuệ nhân tạo | Trợ lý tra cứu, hỗ trợ soạn thảo, kiểm tra hình thức hồ sơ — luôn kèm hồ sơ đánh giá tác động theo `ETV.P29` |
| Dịch vụ số hướng khách hàng | Cổng tra cứu kết quả, đăng ký dịch vụ trực tuyến, trả kết quả điện tử |
| Cải tiến hoạt động kỹ thuật | Cải tiến cách thu thập dữ liệu đo, giảm thao tác nhập tay, tăng khả năng truy xuất nguồn gốc |
| Năng suất, trải nghiệm người dùng nội bộ | Giảm số lần nhập lại cùng một dữ liệu, đơn giản hóa giao diện, rút ngắn thời gian đào tạo |

### 2.2. Nguyên tắc áp dụng: chuẩn hóa trước — số hóa sau — đo được mới đóng

1. **Chuẩn hóa trước, số hóa sau.** Không số hóa một quá trình chưa có thủ tục hoặc quy trình đang hiệu lực, chưa xác định được chủ sở hữu quá trình và chủ sở hữu dữ liệu. Số hóa một quá trình chưa được kiểm soát chỉ làm sự thiếu kiểm soát lan nhanh hơn.
2. **Không có đường cơ sở thì không có cải tiến.** Mỗi sáng kiến phải xác định trước khi triển khai: chỉ số đo, giá trị hiện trạng, cách đo và chỉ tiêu cần đạt. Sáng kiến không có đường cơ sở **không được phê duyệt triển khai**.
3. **Đo được mới đóng.** Sáng kiến chỉ được đóng ở trạng thái **Đã chuẩn hóa** khi hiệu quả đã được đo lại, đối chiếu với đường cơ sở và tài liệu HTQL, biểu mẫu, phân quyền, đào tạo đã cập nhật. Sáng kiến "đã chạy xong nhưng chưa cập nhật thủ tục" là sáng kiến **chưa hoàn thành**.

### 2.3. Ngoài phạm vi

| Nội dung | Thuộc thủ tục |
| -------- | ------------- |
| Sự không phù hợp, hành động khắc phục, công việc không phù hợp | `ETV.P13` – Khắc phục, cải tiến |
| Kiểm soát thay đổi khi triển khai (đánh giá tác động, phê duyệt, xác nhận hiệu lực, quay lui) | `ETV.P30` – Quản lý thay đổi |
| Đăng ký, đánh giá trước vận hành, giám sát, ngừng vận hành nền tảng số | `ETV.P35` – Quản lý nền tảng số |
| Hạ tầng công nghệ thông tin, máy chủ, mạng, thiết bị đầu cuối | `ETV.P33` – Quản lý hệ thống thông tin |
| Vòng đời dữ liệu số, chất lượng dữ liệu, sao lưu | `ETV.P34` · `ETV.P27` |
| Kết nối, ánh xạ, đồng bộ dữ liệu giữa các hệ thống | `ETV.P37` – Tích hợp dữ liệu |
| Vận hành, mức dịch vụ, hỗ trợ người dùng của dịch vụ số đã khai thác | `ETV.P38` – Quản lý dịch vụ số |
| Đánh giá tác động, kiểm soát, giám sát hệ thống trí tuệ nhân tạo | `ETV.P29` – Quản lý hệ thống trí tuệ nhân tạo |
| An toàn thông tin, phân quyền, sự cố an toàn thông tin | `ETV.P28` – Quản lý an toàn thông tin |
| Duy trì, khôi phục hoạt động khi gián đoạn | `ETV.P31` – Quản lý tính liên tục hoạt động |
| Ban hành, sửa đổi, thu hồi tài liệu HTQL sau khi chuẩn hóa | `ETV.P14` – Kiểm soát tài liệu |
| Lưu trữ hồ sơ phát sinh | `ETV.P15` – Kiểm soát hồ sơ |
| Mua sắm phần mềm, thuê dịch vụ, đánh giá nhà cung cấp | `ETV.P06` – Quản lý mua sắm |
| Đào tạo, đánh giá năng lực, ủy quyền người dùng hệ thống mới | `ETV.P03` – Quản lý nhân sự |
| Nhận diện, đánh giá, xử lý rủi ro và cơ hội | `ETV.P01` – Rủi ro và cơ hội |
| Phân tích bối cảnh, bên quan tâm, định hướng chiến lược | `ETV.P25` – Quản lý bối cảnh |
| Bài học kinh nghiệm, tri thức tổ chức | `ETV.P26` – Quản lý tri thức tổ chức |
| Kết luận kỹ thuật, xác nhận giá trị sử dụng phương pháp, hiệu lực kết quả đo | `ETV.P08` · `ETV.P10` · `ETV.P11` |
| Đánh giá nội bộ, xem xét của lãnh đạo | `ETV.P16` · `ETV.P17` |

> **Phân biệt cốt lõi:** `ETV.P13` trả lời "đã sai thì sửa và ngăn tái diễn thế nào"; **`ETV.P32`** trả lời "đang đúng thì làm tốt hơn thế nào và chứng minh bằng gì"; `ETV.P30` trả lời "khi thực sự động vào hệ thống thì kiểm soát thế nào". Một sáng kiến chuyển đổi số điển hình kích hoạt **cả ba**.

## III. TÀI LIỆU VIỆN DẪN

> Nguyên tắc: **chỉ dẫn chiếu, không chép lại nội dung.** Bản đầy đủ đặt tại `03_MANAGEMENT_SYSTEM/` (chuẩn mực) và `08_KNOWLEDGE_GRAPH/01_Regulations/` (pháp luật). QLCL rà soát hiệu lực và văn bản thay thế trước mỗi lần ban hành lại.

### 3.1. Tiêu chuẩn

- ISO 9001:2015 §4.1, §6.1, §6.2, §6.3, §7.1.6, §9.1, §9.3, §10.1, §10.3
- ISO/IEC 17025:2017 §6.2, §7.11, §8.2.4, §8.5, §8.6, §8.9
- ISO 17034:2016 §7.4, §8.5, §8.6, §8.9 (áp dụng khi vận hành năng lực sản xuất chất chuẩn)
- ISO/IEC 27001:2022 §6.2, §6.3, §8.1, §9.1, §10.1; kiểm soát A.5.23, A.8.25, A.8.31, A.8.32, A.8.33
- ISO/IEC 42001:2023 §6.1, §6.2, §8.1, §9.3, §10.1 và Phụ lục A (vòng đời hệ thống AI)
- `11_COMPLIANCE/01_ISO_Mapping/MP-ISO-mapping.md` — bảng ánh xạ đầy đủ MP ↔ điều khoản

### 3.2. Văn bản pháp luật

- Luật Giao dịch điện tử 20/2023/QH15 — giá trị pháp lý của thông điệp dữ liệu, chữ ký điện tử, chữ ký số trong các quá trình đã số hóa
- Nghị định 30/2020/NĐ-CP — công tác văn thư đối với văn bản hành chính ban hành kèm theo sáng kiến, kế hoạch
- Luật Đo lường 04/2011/QH13; Nghị định 105/2016/NĐ-CP; Nghị định 154/2018/NĐ-CP; Nghị định 107/2016/NĐ-CP (và văn bản sửa đổi, bổ sung hiện hành) — **nghĩa vụ thông báo khi sáng kiến làm thay đổi nội dung đã đăng ký, đã chỉ định**
- Pháp luật hiện hành về an toàn thông tin mạng và về bảo vệ dữ liệu cá nhân — áp dụng khi sáng kiến xử lý dữ liệu cá nhân hoặc đưa dữ liệu ra dịch vụ bên ngoài; QLCL phối hợp PT.ATTT xác định văn bản đang hiệu lực tại thời điểm áp dụng và ghi vào hồ sơ sáng kiến

### 3.3. Văn bản nội bộ Viện ETV

- Sổ tay chất lượng `ETV.QM` §9.9 và Chương X
- `ETV.P01`, `ETV.P03`, `ETV.P06`, `ETV.P08`, `ETV.P10`, `ETV.P11`, `ETV.P12`, `ETV.P13`, `ETV.P14`, `ETV.P15`, `ETV.P16`, `ETV.P17`, `ETV.P25`, `ETV.P26`, `ETV.P27`, `ETV.P28`, `ETV.P29`, `ETV.P30`, `ETV.P31`, `ETV.P33`, `ETV.P34`, `ETV.P35`, `ETV.P37`, `ETV.P38`

> **Lưu ý phạm vi:** Luật Ban hành văn bản quy phạm pháp luật không phải căn cứ ban hành văn bản nội bộ của ETV (xem `ETV.P14` §IV).

## IV. THUẬT NGỮ, ĐỊNH NGHĨA VÀ CHỮ VIẾT TẮT

### 4.1. Thuật ngữ và định nghĩa

Định nghĩa chung ("cải tiến", "quá trình", "hiệu lực"...) theo ISO 9000:2015 — không nhắc lại tại đây. Các thuật ngữ riêng của thủ tục này:

| Thuật ngữ | Định nghĩa |
| --------- | ---------- |
| **Chuyển đổi số** | Việc ứng dụng công nghệ số, dữ liệu số, hồ sơ điện tử, chữ ký số và trí tuệ nhân tạo để thay đổi cách thức thực hiện các quá trình của Viện. **Không** đồng nghĩa với việc mua phần mềm. |
| **Sáng kiến** | Một đề xuất cải tiến hoặc chuyển đổi số cụ thể, có phạm vi, chủ trì, mục tiêu đo được, nguồn lực và thời hạn xác định; là **đối tượng dữ liệu chính** của thủ tục này. |
| **Danh mục sáng kiến** | Bản ghi tập trung, duy nhất về toàn bộ sáng kiến đã đề xuất, kể cả sáng kiến bị từ chối và đã dừng, kèm trạng thái và kết quả. |
| **Đường cơ sở** | Giá trị đo được của chỉ số hiện trạng, xác định **trước** khi triển khai, kèm nguồn dữ liệu, kỳ đo và cách tính; là mốc đối chiếu khi xác nhận hiệu quả. |
| **Chỉ tiêu hiệu quả** | Giá trị mà chỉ số phải đạt sau khi triển khai, ghi bằng số kèm mốc thời gian. |
| **Mức độ số hóa quá trình** | Thang 05 mức từ 0 đến 4 (Phụ lục II) đánh giá hiện trạng một quá trình; là **thuộc tính của quá trình**, không phải trạng thái hồ sơ. |
| **Thí điểm** | Việc áp dụng sáng kiến trong phạm vi giới hạn, thời hạn xác định, có tiêu chí thoát định trước. |
| **Tiêu chí thoát thí điểm** | Tập điều kiện định lượng phải đạt để thí điểm được kết luận thành công; phê duyệt **trước khi** bắt đầu, không sửa trong khi thí điểm đang chạy. |
| **Chạy song song** | Duy trì đồng thời phương thức hiện hành và phương thức mới, có đối chiếu kết quả; bắt buộc khi sáng kiến chạm dữ liệu đo, hồ sơ kỹ thuật hoặc kết quả phát hành cho khách hàng. |
| **Chuẩn hóa** | Việc đưa cách làm mới đã chứng minh hiệu quả vào tài liệu HTQL, biểu mẫu, phân quyền, đào tạo và danh mục nền tảng, để cách làm đó lặp lại được và không phụ thuộc cá nhân. |
| **Số hóa âm thầm** | Việc tự dựng và dùng công cụ số vào công việc chính thức mà không đăng ký sáng kiến, không đăng ký nền tảng theo `ETV.P35`, không qua kiểm soát thay đổi theo `ETV.P30`. |
| **Nợ quy trình** | Tình trạng cách làm thực tế đã thay đổi nhưng tài liệu HTQL chưa được cập nhật tương ứng. |

### 4.2. Chữ viết tắt

| Viết tắt | Ý nghĩa |
| -------- | ------- |
| ETV | Viện Kiểm định Công nghệ và Môi trường |
| HTQL | Hệ thống quản lý |
| LĐV | Lãnh đạo Viện (cấp trưởng, cấp phó) |
| LĐP | Lãnh đạo Phòng/bộ phận (Trưởng phòng, người phụ trách lĩnh vực) |
| NTH | Người thực hiện (mọi nhân sự, không phân biệt chức vụ) |
| QLCL | Quản lý chất lượng |
| QLKT | Quản lý kỹ thuật |
| TCĐS | Tổ chuyển đổi số và cải tiến — nhóm công tác do LĐV quyết định thành lập, có đại diện quản lý chất lượng, kỹ thuật và công nghệ thông tin |
| CTSK | Chủ trì sáng kiến |
| QTHT | Quản trị hệ thống |
| PT.ATTT | Người phụ trách an toàn thông tin |
| AIA | Đánh giá tác động hệ thống trí tuệ nhân tạo (theo `ETV.P29`) |
| KPH | Sự không phù hợp và hành động khắc phục (theo `ETV.P13`) |
| ManLab | Nền tảng số hợp nhất của Viện (ManLab AIOS) |
| RACI | Responsible – Accountable – Consulted – Informed |

## V. VAI TRÒ VÀ TRÁCH NHIỆM (RACI)

### 5.1. Ma trận RACI

| Bước trong vòng đời sáng kiến | NTH | CTSK | LĐP | TCĐS | QLCL | LĐV |
| ----------------------------- | --- | ---- | --- | ---- | ---- | --- |
| Đề xuất sáng kiến | **R** | I | C | I | I | I |
| Kiểm tra điều kiện cổng vào (§6.3.1) | I | I | C | C | **R/A** | I |
| Chấm điểm, kiến nghị tiếp nhận (§6.3.2) | I | I | C | **R** | A | I |
| Phân mức sáng kiến (§6.2) | I | I | C | C | **R/A** | C |
| Phê duyệt sáng kiến Mức 1 | I | I | **R/A** | I | C | I |
| Phê duyệt sáng kiến Mức 2, Mức 3 | I | I | C | C | C | **R/A** |
| Lập, phê duyệt Kế hoạch chuyển đổi số hằng năm (§6.4) | I | I | C | **R** | C | **A** |
| Đo đường cơ sở, lập kế hoạch triển khai | C | **R/A** | C | I | C | I |
| Mở phiếu thay đổi theo `ETV.P30`, hồ sơ chuyên ngành (§6.5.1) | I | **R/A** | C | I | C | I |
| Tổ chức thí điểm, chạy song song (§6.6) | **R** | **A** | C | I | I | I |
| Đo lại và lập hồ sơ xác nhận hiệu quả (§6.7.1) | C | **R** | C | I | A | I |
| Kết luận hiệu quả Mức 1 · Mức 2 · Mức 3 | I | I | **R/A** (Mức 1) | I | **R/A** (Mức 2) | **R/A** (Mức 3) |
| Thực hiện hành động chuẩn hóa (§6.7.3) | C | **R** | C | I | **A** | I |
| Đóng sáng kiến | I | C | R (Mức 1) | I | R (Mức 2) | **R/A** (Mức 3) |
| Quay lui khi sáng kiến không đạt (§6.8) | C | **R** | C | I | A | C |
| Khai báo, xử lý công cụ tự phát (§6.9) | **R** | I | C | I | **R/A** | C |
| Tổng hợp báo cáo phục vụ xem xét lãnh đạo (§6.12) | I | C | C | C | **R/A** | I |

> LĐV luôn là **A** cuối cùng đối với Kế hoạch chuyển đổi số hằng năm và mọi sáng kiến Mức 3 (không ủy quyền). QTHT và PT.ATTT được **C** bắt buộc tại các bước có yếu tố nền tảng, dữ liệu, an toàn thông tin; QLKT được **C** bắt buộc tại các bước chạm hoạt động kỹ thuật.
>
> **CTSK không được là người kết luận hiệu quả sáng kiến do mình chủ trì** (§6.7.2) — ManLab chặn cứng.

### 5.2. Trách nhiệm cụ thể

**Lãnh đạo Viện (LĐV):** Quyết định định hướng chuyển đổi số của Viện và phê duyệt Kế hoạch chuyển đổi số hằng năm (F32.04) gồm thứ tự ưu tiên và nguồn lực; phê duyệt sáng kiến Mức 2, Mức 3; quyết định dừng, tạm dừng hoặc hủy sáng kiến; quyết định thành lập TCĐS và cử người chủ trì; quyết định việc thông báo tới tổ chức công nhận, cơ quan quản lý nhà nước và khách hàng khi sáng kiến làm thay đổi nội dung đã đăng ký, đã chỉ định; kết luận đối với sáng kiến Không đạt ở quá trình có ảnh hưởng tới hiệu lực kết quả; xem xét tình hình chuyển đổi số và cải tiến trong cuộc họp xem xét của lãnh đạo (`ETV.P17`).

**Phụ trách Quản lý chất lượng (QLCL):** Quản trị Danh mục sáng kiến (F32.01), cấp mã sáng kiến, bảo đảm không trùng lặp hoặc mâu thuẫn phạm vi; chủ trì sàng lọc cùng TCĐS và kiểm tra điều kiện cổng vào (§6.3.1); kiểm tra đường cơ sở và chỉ tiêu trước khi trình phê duyệt — **từ chối trình duyệt sáng kiến không có chỉ số đo**; kết luận hiệu quả sáng kiến Mức 2; kiểm tra tính đầy đủ của hồ sơ chuẩn hóa trước khi cho đóng sáng kiến (§6.7.3); theo dõi tiến độ lộ trình, phát hiện và xử lý số hóa âm thầm (§6.9); bảo đảm mọi cập nhật tài liệu HTQL phát sinh từ sáng kiến được thực hiện theo `ETV.P14`; tổng hợp báo cáo và lưu trữ hồ sơ theo `ETV.P15`.

**Tổ chuyển đổi số và cải tiến (TCĐS):** Đánh giá sáng kiến theo bộ tiêu chí tại Phụ lục III; kiến nghị tiếp nhận, không tiếp nhận hoặc gộp với sáng kiến khác; kiến nghị thứ tự ưu tiên và dự thảo Kế hoạch chuyển đổi số hằng năm; rà soát mức độ số hóa của các quá trình (Phụ lục II) tối thiểu 12 tháng/lần; theo dõi phụ thuộc kỹ thuật giữa các sáng kiến để tránh triển khai chồng lấn trên cùng một nền tảng.

**Chủ trì sáng kiến (CTSK):** Đo và ghi nhận đường cơ sở; đề xuất chỉ tiêu hiệu quả và cách đo; lập kế hoạch triển khai; mở phiếu thay đổi theo `ETV.P30` và hồ sơ chuyên ngành theo Phụ lục V khi sáng kiến chạm tới quá trình, tài liệu, dữ liệu hoặc nền tảng đang vận hành; tổ chức thí điểm, chạy song song, thu thập dữ liệu và lập hồ sơ xác nhận hiệu quả (F32.03); thực hiện hoặc phối hợp thực hiện các hành động chuẩn hóa tại §6.7.3; báo cáo kịp thời khi sáng kiến không khả thi, vượt nguồn lực hoặc phát sinh rủi ro mới.

**Lãnh đạo Phòng (LĐP):** Xác nhận hiện trạng và đường cơ sở thuộc phạm vi phòng mình; phê duyệt và kết luận hiệu quả sáng kiến Mức 1; bố trí nhân sự tham gia thí điểm; bảo đảm nhân viên không sử dụng công cụ tự phát vào công việc chính thức khi chưa đăng ký (§6.9); xác nhận cách làm mới đã được áp dụng thực tế trước khi đề nghị đóng sáng kiến.

**Quản trị hệ thống (QTHT) và Người phụ trách an toàn thông tin (PT.ATTT):** Đánh giá tính khả thi kỹ thuật, phụ thuộc hệ thống và tác động tới nền tảng đang vận hành; bảo đảm việc phát triển, thử nghiệm được thực hiện trên môi trường tách biệt với môi trường vận hành và kiểm soát dữ liệu dùng cho kiểm thử (§6.5.3); phối hợp đăng ký, cập nhật nền tảng và điểm tích hợp theo `ETV.P35`, `ETV.P37`; đánh giá tác động an toàn thông tin và phân quyền theo `ETV.P28` trước khi đưa sáng kiến vào vận hành.

**Người thực hiện (NTH):** Được quyền và được khuyến khích đề xuất sáng kiến qua ManLab — đề xuất không được coi là phê bình cá nhân hay đơn vị; cung cấp dữ liệu trung thực phục vụ đo đường cơ sở và đo hiệu quả; **đăng ký** mọi công cụ số tự dựng đang dùng cho công việc chính thức theo §6.9; tuân thủ cách làm đã được chuẩn hóa sau khi sáng kiến đóng — nếu thấy bất cập thì đề xuất sáng kiến mới thay vì tự quay về cách làm cũ.

### 5.3. Nguyên tắc tách vai trò và giới hạn của AI

- Người đề xuất ≠ người sàng lọc ≠ người phê duyệt.
- **Chủ trì sáng kiến không đồng thời là người kết luận hiệu quả** sáng kiến do mình chủ trì (§6.7.2) — ManLab chặn cứng.
- Người xác nhận cách làm mới đã áp dụng thực tế là Lãnh đạo Phòng nơi áp dụng, khác CTSK.
- Trợ lý AI **không** được sàng lọc thay TCĐS để loại bỏ sáng kiến, **không** phê duyệt sáng kiến hay kế hoạch, **không** kết luận hiệu quả, **không** tự đóng sáng kiến và **không** tự thay đổi cấu hình, dữ liệu trên môi trường vận hành (ISO/IEC 42001; `ETV.P29`). Chi tiết tại §6.11.

## VI. NỘI DUNG / QUY TRÌNH THỰC HIỆN

### 6.1 Danh mục sáng kiến

#### 6.1.1 Nguyên tắc một danh mục duy nhất

Mọi sáng kiến, không phân biệt quy mô và nguồn đề xuất, được ghi vào **một** Danh mục sáng kiến duy nhất trên ManLab (`ETV.P.F 32.01`). Sáng kiến **không tiếp nhận** hoặc **đã dừng** vẫn được giữ lại kèm lý do — là bằng chứng Viện có xem xét, đồng thời tránh việc cùng một ý tưởng được đề xuất lặp lại mà không rút kinh nghiệm.

Mã sáng kiến do ManLab sinh tự động theo dạng `SK-<năm>-<số thứ tự>`, cấp **một lần** khi tạo bản ghi và không thay đổi trong suốt vòng đời, kể cả khi sáng kiến đổi tên hoặc đổi người chủ trì. Thông tin bắt buộc của bản ghi theo `ETV.P.F 32.01`.

#### 6.1.2 Nguồn đề xuất

| Nguồn | Cách đưa vào danh mục | Trách nhiệm |
| ----- | --------------------- | ----------- |
| Đề xuất tự nguyện của nhân viên, phòng ban | Tạo trực tiếp trên ManLab | NTH |
| Kết quả đánh giá nội bộ (`ETV.P16`), đánh giá bên ngoài | Tạo bản ghi, dẫn chiếu số hiệu báo cáo đánh giá | QLCL |
| Hành động khắc phục đã hoàn thành có đề xuất cải tiến hệ thống (`ETV.P13`) | Tạo bản ghi, liên kết chéo mã KPH — xem §6.10 | CTSK, QLCL |
| Khiếu nại, phản hồi khách hàng (`ETV.P12`) | Tạo bản ghi, dẫn chiếu mã khiếu nại | QLCL |
| Cơ hội đã nhận diện trong hồ sơ rủi ro và cơ hội (`ETV.P01`) | Tạo bản ghi, dẫn chiếu mã cơ hội | QLCL |
| Kết luận xem xét của lãnh đạo (`ETV.P17`) | Tạo bản ghi trong 10 ngày làm việc kể từ khi có biên bản | QLCL |
| Rút kinh nghiệm sau gián đoạn (`ETV.P31`), sau sự cố an toàn thông tin (`ETV.P28`) | Tạo bản ghi, dẫn chiếu mã sự việc | QLCL |
| Rà soát mức độ số hóa quá trình (Phụ lục II) | Tạo bản ghi khi phát hiện quá trình ưu tiên còn ở mức thấp | TCĐS |

### 6.2 Phân mức sáng kiến

Phân mức quyết định thẩm quyền phê duyệt và mức độ hồ sơ; do QLCL xác định khi sàng lọc, LĐV quyết định cuối cùng khi có tranh luận.

| Mức | Tiêu chí (thỏa mãn **bất kỳ** tiêu chí nào thì xếp vào mức đó) | Thẩm quyền phê duyệt | Hồ sơ tối thiểu |
| --- | ------------------------------------------------------------- | -------------------- | --------------- |
| **Mức 1** – Cục bộ | Chỉ ảnh hưởng cách làm nội bộ một phòng; không sửa tài liệu HTQL; không chạm dữ liệu kỹ thuật, dữ liệu khách hàng; không phát sinh chi phí đáng kể | LĐP (thông báo QLCL để ghi danh mục) | `F 32.01` |
| **Mức 2** – Liên phòng, chạm hệ thống | Ảnh hưởng từ hai phòng trở lên; phải sửa thủ tục, quy trình, hướng dẫn hoặc biểu mẫu; thay đổi cấu hình nền tảng đang vận hành; phát sinh mua sắm | LĐV | `F 32.01` + `F 32.02` + phiếu thay đổi `ETV.P30` |
| **Mức 3** – Trọng yếu | Chạm dữ liệu đo, hồ sơ kỹ thuật, kết quả phát hành cho khách hàng, phạm vi đã đăng ký/chỉ định/công nhận; đưa nền tảng số mới vào vận hành; ứng dụng trí tuệ nhân tạo vào quá trình nghiệp vụ; xử lý dữ liệu cá nhân hoặc đưa dữ liệu ra dịch vụ bên ngoài | LĐV, sau khi có ý kiến QLKT và PT.ATTT | `F 32.01` + `F 32.02` + phiếu thay đổi `ETV.P30` (đánh giá tác động đầy đủ) + hồ sơ chuyên ngành theo Phụ lục V |

Khi nghi ngờ giữa hai mức, **áp mức cao hơn**. **Không** được chia nhỏ một sáng kiến Mức 3 thành nhiều sáng kiến Mức 1 để né thẩm quyền phê duyệt — xử lý như thay đổi âm thầm theo `ETV.P30`.

### 6.3 Đề xuất và sàng lọc

#### 6.3.1 Điều kiện cổng vào

Sáng kiến chỉ được chuyển sang bước chấm điểm khi thỏa mãn **đủ bốn** điều kiện. Thiếu bất kỳ điều kiện nào, QLCL trả lại kèm hướng dẫn bổ sung, **không** chuyển tiếp:

1. **Quá trình đích đã được kiểm soát** — có thủ tục, quy trình hoặc hướng dẫn đang hiệu lực; nếu chưa có, phải ban hành trước theo `ETV.P14` rồi mới số hóa (§2.1).
2. **Có chủ sở hữu rõ ràng** — xác định được người phụ trách quá trình và chủ sở hữu dữ liệu liên quan (`ETV.P27`).
3. **Có đường cơ sở đo được** — nêu rõ chỉ số, giá trị hiện trạng, nguồn dữ liệu và kỳ đo; nếu chưa có dữ liệu, phải đo trước tối thiểu **01 kỳ** đại diện.
4. **Không trùng lặp, không mâu thuẫn** — không trùng phạm vi với sáng kiến đang triển khai và không mâu thuẫn với tài liệu HTQL đang hiệu lực; nếu trùng, **gộp** vào sáng kiến đang có.

#### 6.3.2 Trình tự thực hiện

| Bước | Nội dung thực hiện | Trách nhiệm | Biểu mẫu |
| ---- | ------------------ | ----------- | -------- |
| 1 | Lập đề xuất trên ManLab: hiện trạng, bất cập, nội dung sáng kiến, lợi ích dự kiến, chỉ số đo và **đường cơ sở**, nguồn lực dự kiến | NTH | `ETV.P.F 32.02` Phần A |
| 2 | Tiếp nhận, cấp mã sáng kiến, ghi vào danh mục; phản hồi sơ bộ người đề xuất trong **10 ngày làm việc** | QLCL | `ETV.P.F 32.01` |
| 3 | Kiểm tra 04 điều kiện cổng vào (§6.3.1); trả lại kèm hướng dẫn nếu không đạt | QLCL | `ETV.P.F 32.02` Phần B.1 |
| 4 | Chấm điểm theo bộ tiêu chí tại **Phụ lục III**; kiến nghị Tiếp nhận – ưu tiên / Tiếp nhận – xếp hàng đợi / Gộp / Không tiếp nhận, kèm nhận xét bằng lời | TCĐS | `ETV.P.F 32.02` Phần B.2, B.5 |
| 5 | Phân mức sáng kiến (§6.2); xác định hồ sơ kiểm soát bắt buộc kèm theo (Phụ lục V) | QLCL | `ETV.P.F 32.02` Phần B.3 |
| 6 | Lập kế hoạch thí điểm và **tiêu chí thoát** (§6.6) đối với sáng kiến Mức 2, Mức 3 | CTSK dự kiến, TCĐS | `ETV.P.F 32.02` Phần B.4 |
| 7 | Phê duyệt hoặc không phê duyệt (bắt buộc ghi lý do); giao CTSK, mốc thời gian, nguồn lực | LĐP (Mức 1) · LĐV (Mức 2, 3) | `ETV.P.F 32.02` Phần C |
| 8 | Thông báo kết quả tới người đề xuất trong **05 ngày làm việc**; cập nhật danh mục | QLCL | `ETV.P.F 32.01` |

TCĐS hoàn tất sàng lọc trong **30 ngày làm việc** kể từ khi tiếp nhận. Đề xuất chưa được phản hồi quá thời hạn được ManLab cảnh báo tới QLCL và LĐV (Phụ lục IV).

### 6.4 Kế hoạch chuyển đổi số hằng năm

#### 6.4.1 Nội dung kế hoạch

Kế hoạch (`ETV.P.F 32.04`) được lập cho từng năm, gồm tối thiểu: định hướng và mục tiêu chuyển đổi số của năm gắn với mục tiêu chất lượng; danh sách quá trình ưu tiên kèm **mức độ số hóa hiện tại và mục tiêu** (Phụ lục II); danh sách sáng kiến triển khai trong năm kèm mức, CTSK, mốc thời gian, nguồn lực, ngân sách; chỉ số theo dõi cấp Viện và chỉ tiêu năm; rủi ro chính của lộ trình (`ETV.P01`); nhu cầu đào tạo phát sinh (`ETV.P03`).

#### 6.4.2 Trình tự thực hiện

| Bước | Nội dung thực hiện | Trách nhiệm | Biểu mẫu |
| ---- | ------------------ | ----------- | -------- |
| 1 | Dự thảo kế hoạch trên cơ sở danh mục sáng kiến, kết quả rà soát mức độ số hóa và định hướng của LĐV | TCĐS | `ETV.P.F 32.04` |
| 2 | Soát xét tính khả thi, nguồn lực và tính nhất quán với các thủ tục liên quan | QLCL | `ETV.P.F 32.04` |
| 3 | Phê duyệt **trước khi năm kế hoạch bắt đầu** | LĐV | `ETV.P.F 32.04` |
| 4 | Rà soát **06 tháng/lần** và khi có thay đổi lớn về nguồn lực, chiến lược hoặc yêu cầu pháp lý | TCĐS, QLCL | `ETV.P.F 32.04` Phần E |
| 5 | Điều chỉnh kế hoạch bằng **phiên bản mới** có phê duyệt của LĐV kèm lý do — không sửa trực tiếp bản đang hiệu lực | TCĐS, LĐV | `ETV.P.F 32.04` |

Sáng kiến phát sinh giữa kỳ vẫn được tiếp nhận và sàng lọc bình thường. Sáng kiến **Mức 3 ngoài kế hoạch** chỉ được triển khai khi LĐV phê duyệt bổ sung vào kế hoạch, nêu rõ nguồn lực lấy từ đâu và sáng kiến nào bị lùi lại.

### 6.5 Triển khai sáng kiến

#### 6.5.1 Điểm nối bắt buộc với các thủ tục khác

Sáng kiến **không** tự tạo ra thẩm quyền triển khai. Trước khi tác động vào hệ thống đang vận hành, CTSK phải mở đúng hồ sơ ở thủ tục chuyên trách theo **Phụ lục V**. ManLab **chặn** việc chuyển sáng kiến Mức 2, Mức 3 sang trạng thái *Đang triển khai* khi chưa có mã phiếu thay đổi `ETV.P30` hợp lệ được liên kết.

#### 6.5.2 Trình tự thực hiện

| Bước | Nội dung thực hiện | Trách nhiệm | Biểu mẫu |
| ---- | ------------------ | ----------- | -------- |
| 1 | Xác nhận lại đường cơ sở; lập kế hoạch triển khai chi tiết | CTSK | `ETV.P.F 32.02` |
| 2 | Mở phiếu thay đổi và đánh giá tác động; mở hồ sơ chuyên ngành theo Phụ lục V | CTSK | `F 30.02` và hồ sơ tương ứng |
| 3 | Phát triển, cấu hình, thử nghiệm trên **môi trường tách biệt** với môi trường vận hành | QTHT, CTSK | Hồ sơ kỹ thuật `ETV.P33`, `ETV.P35` |
| 4 | Thí điểm theo §6.6 (nếu áp dụng) | CTSK, LĐP | `ETV.P.F 32.02` Phần B.4 |
| 5 | Xác nhận hiệu lực thay đổi trước khi áp dụng chính thức | Theo `ETV.P30` | `F 30.03` |
| 6 | Triển khai diện rộng: chuyển đổi dữ liệu, đào tạo người dùng, cập nhật phân quyền, công bố thời điểm ngừng áp dụng cách làm cũ, sẵn sàng phương án quay lui | CTSK, QTHT, LĐP | Hồ sơ đào tạo `ETV.P03` |

#### 6.5.3 Môi trường và dữ liệu dùng để phát triển, thử nghiệm

- Phát triển và thử nghiệm thực hiện trên **môi trường tách biệt** với môi trường vận hành (ISO/IEC 27001 A.8.31).
- **Cấm** dùng dữ liệu khách hàng thật, dữ liệu đo thật hoặc dữ liệu cá nhân chưa được ẩn danh, giả lập trên môi trường thử nghiệm khi chưa được PT.ATTT chấp thuận bằng văn bản (A.8.33; `ETV.P28`).
- Kết quả sinh ra trong môi trường thử nghiệm **không** được dùng làm hồ sơ chính thức và phải được đánh dấu rõ ràng để không thể nhầm với hồ sơ thật.

### 6.6 Thí điểm

Sáng kiến Mức 2, Mức 3 phải qua thí điểm, trừ khi LĐV chấp thuận bỏ qua kèm lý do ghi trong hồ sơ.

| Yêu cầu | Quy định |
| ------- | -------- |
| Phạm vi | Giới hạn theo phòng, theo loại hồ sơ hoặc theo nhóm khách hàng; ghi rõ trong `F 32.02` |
| Thời hạn | Tối đa **90 ngày**, gia hạn **một lần** không quá 90 ngày, có phê duyệt của LĐV kèm lý do |
| Tiêu chí thoát | Định lượng, phê duyệt **trước khi** bắt đầu; không được sửa trong khi thí điểm đang chạy |
| Chạy song song | **Bắt buộc** khi sáng kiến chạm dữ liệu đo, hồ sơ kỹ thuật hoặc kết quả phát hành cho khách hàng; đối chiếu 100% kết quả giữa hai phương thức |
| Ghi nhận | Ghi nhật ký sự cố, sai lệch và phản hồi người dùng trong suốt thời gian thí điểm |
| Điều kiện dừng | Dừng ngay khi phát hiện sai lệch ảnh hưởng hiệu lực kết quả, mất mát dữ liệu hoặc vi phạm an toàn thông tin; báo cáo LĐV trong **24 giờ** |

Trong thời gian thí điểm, **phương thức hiện hành vẫn là phương thức chính thức**. Hồ sơ phát hành cho khách hàng chỉ được tạo bằng phương thức mới sau khi thí điểm kết luận đạt và thay đổi được xác nhận hiệu lực theo `ETV.P30`.

### 6.7 Xác nhận hiệu quả và chuẩn hóa

#### 6.7.1 Đo lại và đối chiếu

CTSK tổ chức đo lại chỉ số sau khi cách làm mới vận hành ổn định tối thiểu **30 ngày** (hoặc tối thiểu **01 kỳ** đối với chỉ số theo kỳ), **bằng đúng cách đo và nguồn dữ liệu đã ghi trong đường cơ sở**. Việc đổi cách đo hoặc đổi nguồn dữ liệu giữa hai lần đo làm mất giá trị so sánh và **không được chấp nhận**.

| Kết luận | Điều kiện | Xử lý tiếp theo |
| -------- | --------- | --------------- |
| **Đạt** | Chỉ số đạt hoặc vượt chỉ tiêu; không phát sinh tác động tiêu cực ngoài dự kiến | Chuẩn hóa theo §6.7.3 |
| **Đạt một phần** | Có cải thiện nhưng chưa đạt chỉ tiêu, hoặc đạt chỉ tiêu nhưng phát sinh tác động tiêu cực | Ghi rõ: giữ cách làm mới kèm hành động bổ sung, **hoặc** quay lui — không để trạng thái lửng |
| **Không đạt** | Không cải thiện, hoặc kết quả xấu hơn đường cơ sở | Quay lui theo §6.8 |

#### 6.7.2 Thẩm quyền kết luận

| Mức sáng kiến | Người kết luận hiệu quả |
| ------------- | ----------------------- |
| Mức 1 | LĐP (khác CTSK) |
| Mức 2 | QLCL |
| Mức 3 | LĐV, trên cơ sở ý kiến của QLCL và QLKT (và PT.ATTT nếu có yếu tố an toàn thông tin, dữ liệu cá nhân) |

CTSK **không** được kết luận hiệu quả sáng kiến do mình chủ trì — ManLab chặn cứng.

#### 6.7.3 Hành động chuẩn hóa bắt buộc

Sáng kiến kết luận **Đạt** hoặc **Đạt một phần – giữ cách làm mới** chỉ được đóng khi hoàn tất **toàn bộ** các hành động sau, có bằng chứng đính kèm:

| # | Hành động | Thủ tục liên quan | Bằng chứng |
| - | --------- | ----------------- | ---------- |
| 1 | Cập nhật thủ tục, quy trình, hướng dẫn phản ánh cách làm mới | `ETV.P14` | Mã tài liệu và lần ban hành mới |
| 2 | Cập nhật, thay thế hoặc thu hồi biểu mẫu liên quan | `ETV.P14` | Mã biểu mẫu và trạng thái |
| 3 | Cập nhật phân quyền và cấu hình trên ManLab | `ETV.P28`, `ETV.P35` | Bản ghi phân quyền, bản ghi nền tảng |
| 4 | Đào tạo và xác nhận năng lực người dùng | `ETV.P03` | Hồ sơ đào tạo |
| 5 | Cập nhật danh mục nền tảng, điểm tích hợp (nếu có) | `ETV.P35`, `ETV.P37` | Mã bản ghi nền tảng, điểm tích hợp |
| 6 | Cập nhật mức độ số hóa của quá trình | Phụ lục II | Bản ghi quá trình trên ManLab |
| 7 | Ghi nhận bài học kinh nghiệm | `ETV.P26` | Mã bài học |
| 8 | Cập nhật hồ sơ rủi ro và cơ hội nếu bức tranh rủi ro thay đổi | `ETV.P01` | Mã rủi ro, cơ hội |

Sáng kiến đã triển khai xong nhưng chưa hoàn tất chuẩn hóa được ManLab gắn cờ **Nợ quy trình**; cờ này được nêu trong báo cáo xem xét của lãnh đạo và **không** được coi là sáng kiến hoàn thành khi thống kê hiệu quả.

### 6.8 Sáng kiến không đạt, tạm dừng và hủy

- **Dừng đúng lúc là kết quả tốt.** Sáng kiến được kết luận không khả thi sau thí điểm không bị coi là thất bại cá nhân; điều bị coi là vi phạm là **bỏ dở âm thầm** — không báo cáo, không ghi nhận, không hoàn nguyên hiện trạng.
- Khi kết luận **Không đạt**, CTSK thực hiện **quay lui** theo phương án đã phê duyệt trong phiếu thay đổi `ETV.P30`, khôi phục cách làm cũ, thu hồi cấu hình, phân quyền và tài liệu tạm thời đã phát hành.
- Dữ liệu phát sinh trong thời gian áp dụng cách làm mới phải được rà soát về tính đầy đủ và khả năng truy xuất trước khi đóng; hồ sơ bị ảnh hưởng xử lý theo `ETV.P15`, công việc không phù hợp (nếu có) xử lý theo `ETV.P13`.
- Sáng kiến kết luận **Không đạt** ở Mức 2, Mức 3 **bắt buộc** lập bài học kinh nghiệm theo `ETV.P26` trước khi đóng.
- **Tạm dừng** áp dụng khi thiếu nguồn lực hoặc chờ điều kiện tiên quyết; sáng kiến tạm dừng quá **12 tháng** được đưa ra để LĐV quyết định tiếp tục hay hủy.

### 6.9 Số hóa âm thầm và công cụ tự phát

Cá nhân, bộ phận đang sử dụng công cụ số tự dựng vào công việc chính thức phải khai báo trên ManLab trong **10 ngày làm việc** kể từ ngày thủ tục này có hiệu lực, hoặc kể từ khi bắt đầu sử dụng. Khai báo tự nguyện trong thời hạn **không** bị xử lý như vi phạm.

| Trường hợp | Xử lý | Trách nhiệm |
| ---------- | ----- | ----------- |
| Công cụ hữu ích, rủi ro thấp | Mở sáng kiến để chuẩn hóa và đưa vào diện kiểm soát; đăng ký nền tảng theo `ETV.P35` nếu thuộc diện | QLCL, CTSK |
| Công cụ có rủi ro về dữ liệu, an toàn thông tin hoặc hiệu lực kết quả | **Dừng sử dụng ngay**; đánh giá tác động theo `ETV.P28`; xử lý hồ sơ đã tạo ra theo `ETV.P13`, `ETV.P15` | PT.ATTT, QLCL |
| Công cụ tạo ra dữ liệu, kết quả gửi cho khách hàng | **Cấm tuyệt đối** khi chưa qua kiểm soát; rà soát toàn bộ kết quả đã phát hành theo `ETV.P10`, `ETV.P11` | LĐV, QLKT, QLCL |
| Trợ lý AI, dịch vụ AI bên ngoài dùng cho nghiệp vụ | Áp dụng `ETV.P29`; nếu đã đưa dữ liệu của Viện ra dịch vụ bên ngoài, xử lý theo `ETV.P28` | PT.ATTT, QLCL |

Việc tiếp tục sử dụng công cụ tự phát sau khi đã được yêu cầu dừng được xử lý như **thay đổi âm thầm** theo `ETV.P30` và là căn cứ xem xét trách nhiệm.

### 6.10 Quan hệ với khắc phục, cải tiến (`ETV.P13`)

- **Hành động khắc phục** một sự không phù hợp cụ thể vẫn được quản lý trọn vẹn theo `ETV.P13` — **không** chuyển sang thủ tục này để né thời hạn xử lý.
- Khi phân tích nguyên nhân gốc cho thấy cần một **thay đổi mang tính hệ thống** vượt quá phạm vi hành động khắc phục, thì mở **sáng kiến** theo thủ tục này và ghi liên kết chéo hai chiều giữa mã KPH và mã sáng kiến.
- **Không** được đóng một KPH bằng cách viện dẫn một sáng kiến chưa hoàn thành: KPH chỉ đóng khi biện pháp ngăn tái diễn đã có hiệu lực.
- Ngược lại, sáng kiến gây ra sự không phù hợp trong quá trình triển khai phải mở KPH theo `ETV.P13` trong **03 ngày làm việc** kể từ khi phát hiện.

### 6.11 Vai trò của AI trong chuyển đổi số và cải tiến

Trợ lý AI trên ManLab **được phép**: gợi ý phân nhóm và phát hiện sáng kiến trùng lặp; nhắc sáng kiến quá hạn sàng lọc, quá hạn thí điểm, quá hạn xác nhận hiệu quả và sáng kiến mang cờ **Nợ quy trình**; đối chiếu danh sách quá trình với danh mục nền tảng (`ETV.P35`) và tài sản thông tin (`ETV.P27`) để phát hiện quá trình còn phụ thuộc thao tác thủ công; tổng hợp số liệu và soạn dự thảo báo cáo, dự thảo biên bản xác nhận hiệu quả để người có thẩm quyền xem xét.

Trợ lý AI **không** được sàng lọc thay TCĐS để loại bỏ sáng kiến, **không** được phê duyệt sáng kiến hay kế hoạch, **không** được kết luận hiệu quả, **không** được tự thay đổi cấu hình hoặc dữ liệu trên môi trường vận hành, **không** được tự đóng sáng kiến. Mọi tính năng AI triển khai trong Module M32 phải có hồ sơ AIA theo `ETV.P29`.

### 6.12 Báo cáo và soát xét

QLCL tổng hợp **06 tháng/lần** và trước mỗi cuộc họp xem xét của lãnh đạo (`ETV.P17`): số sáng kiến theo nguồn, nhóm, mức và trạng thái; thời gian trung bình từ đề xuất tới phản hồi và từ phê duyệt tới đóng; tỷ lệ sáng kiến đóng có kết luận **Đạt** và danh sách **Không đạt** kèm bài học; tiến độ Kế hoạch chuyển đổi số hằng năm và mức độ số hóa các quá trình ưu tiên so với mục tiêu; danh sách sáng kiến mang cờ **Nợ quy trình**; trường hợp số hóa âm thầm phát hiện trong kỳ; đề xuất điều chỉnh định hướng, nguồn lực cho kỳ tiếp theo.

Thủ tục này được soát xét định kỳ theo `ETV.P14` §6.10, hoặc đột xuất khi có thay đổi về định hướng chuyển đổi số, cơ cấu tổ chức hoặc yêu cầu pháp lý liên quan.

## VII. BIỂU MẪU ÁP DỤNG

| Mã biểu mẫu | Tên biểu mẫu | Nơi lưu bản gốc |
|---|---|---|
| **ETV.P.F 32.01** | Sổ đăng ký sáng kiến chuyển đổi số và cải tiến | `06_SHARED_RESOURCES/01_Forms/` |
| **ETV.P.F 32.02** | Phiếu đề xuất, sàng lọc và phê duyệt sáng kiến | `06_SHARED_RESOURCES/01_Forms/` |
| **ETV.P.F 32.03** | Biên bản xác nhận hiệu quả và chuẩn hóa sáng kiến | `06_SHARED_RESOURCES/01_Forms/` |
| **ETV.P.F 32.04** | Kế hoạch chuyển đổi số và cải tiến hằng năm | `06_SHARED_RESOURCES/01_Forms/` |

Các hồ sơ khác phát sinh khi triển khai sáng kiến sử dụng biểu mẫu của thủ tục chuyên trách — **không** lập biểu mẫu mới ở thủ tục này: phiếu đề nghị thay đổi và đánh giá tác động (`F 30.02`), biên bản xác nhận hiệu lực sau thay đổi (`F 30.03`), đăng ký và đánh giá nền tảng (`F 35.01`, `F 35.02`), hồ sơ AIA (`ETV.P29`), hồ sơ mua sắm (`ETV.P06`), phiếu hành động khắc phục (`ETV.P13`), hồ sơ đào tạo (`ETV.P03`).

## VIII. LƯU HỒ SƠ

Toàn bộ hồ sơ phát sinh từ thủ tục này được ghi chép đầy đủ và lưu trữ theo **`ETV.P 15` — Thủ tục kiểm soát hồ sơ**; thời hạn lưu và nhóm quyền truy cập áp dụng theo danh mục **`ETV.P.F 14.06`**. Bảng dưới đây xác định người lưu và giá trị **đề xuất** để cập nhật vào `ETV.P.F 14.06` khi thủ tục được ban hành:

| Hồ sơ | Người lưu | Thời hạn đề xuất |
| ----- | --------- | ---------------- |
| Sổ đăng ký sáng kiến (`F 32.01`) | QLCL | Vĩnh viễn trên ManLab |
| Phiếu đề xuất, sàng lọc và phê duyệt (`F 32.02`) | QLCL | 10 năm |
| Biên bản xác nhận hiệu quả và chuẩn hóa (`F 32.03`) | QLCL | 10 năm |
| Kế hoạch chuyển đổi số hằng năm (`F 32.04`) và các phiên bản | QLCL | Vĩnh viễn trên ManLab |
| Hồ sơ đo đường cơ sở và dữ liệu đo lại | CTSK, sao gửi QLCL | 05 năm |
| Hồ sơ thí điểm: nhật ký sự cố, dữ liệu đối chiếu chạy song song | CTSK, sao gửi QLCL | 05 năm |
| Khai báo và hồ sơ xử lý công cụ tự phát (§6.9) | QLCL, sao gửi PT.ATTT | 05 năm |
| Biên bản họp TCĐS và kết quả chấm điểm sàng lọc | QLCL | 05 năm |
| Bài học kinh nghiệm sau sáng kiến | QLCL | Theo `ETV.P26` |
| Hồ sơ thay đổi, đăng ký nền tảng, AIA, mua sắm, đào tạo phát sinh từ sáng kiến | Theo thủ tục chuyên trách | Theo `ETV.P30`, `ETV.P35`, `ETV.P29`, `ETV.P06`, `ETV.P03` |
| Báo cáo chuyển đổi số và cải tiến phục vụ xem xét của lãnh đạo | QLCL | Theo `ETV.P17` |

## IX. CÁC PHỤ LỤC

Các phụ lục dưới đây là tài liệu bổ trợ, chi tiết hoá các quy tắc đã nêu tại §VI và được dẫn chiếu từ thân thủ tục. Khi có mâu thuẫn, nội dung thân thủ tục (§I–VIII) được **ưu tiên áp dụng**; phụ lục được cập nhật đồng bộ khi thủ tục soát xét.

### Phụ lục I — Bảng trạng thái sáng kiến và thẩm quyền

*(Dẫn chiếu từ §6.1, §6.3, §6.5, §6.7, §6.8)*

| STT | Trạng thái | Ý nghĩa | Người thao tác | Bắt buộc lý do |
| --- | ---------- | ------- | -------------- | -------------- |
| 1 | Nháp | Đang soạn đề xuất | NTH | Không |
| 2 | Chờ sàng lọc | Đã gửi, chờ QLCL và TCĐS xem xét | NTH | Không |
| 3 | Không tiếp nhận | Bị loại sau sàng lọc | QLCL (theo kiến nghị TCĐS) | **Có** |
| 4 | Chờ phê duyệt | Đã qua sàng lọc, chờ người có thẩm quyền | QLCL | Không |
| 5 | Không phê duyệt | Bị trả lại hoặc bị từ chối | LĐP (Mức 1) · LĐV (Mức 2, 3) | **Có** |
| 6 | Đã phê duyệt | Được chấp thuận, chờ nguồn lực hoặc chờ tới lượt | LĐP · LĐV | Không |
| 7 | Đang triển khai | Đang thực hiện; đã có mã phiếu thay đổi `ETV.P30` với Mức 2, 3 | CTSK | Không |
| 8 | Đang thí điểm | Đang áp dụng trong phạm vi giới hạn | CTSK | Không |
| 9 | Chờ xác nhận hiệu quả | Đã triển khai, đang trong thời gian ổn định và đo lại | CTSK | Không |
| 10 | Đã chuẩn hóa | Hiệu quả đã kết luận và các hành động chuẩn hóa (§6.7.3) đã hoàn tất | LĐP (Mức 1) · QLCL (Mức 2) · LĐV (Mức 3) | Không |
| 11 | Đóng – không đạt | Kết luận không đạt, đã quay lui và lập bài học | QLCL (Mức 1, 2) · LĐV (Mức 3) | **Có** |
| 12 | Tạm dừng | Ngừng tạm thời do thiếu nguồn lực hoặc chờ điều kiện tiên quyết | QLCL · LĐV | **Có** |
| 13 | Hủy | Không tiếp tục; không quay lại danh mục ưu tiên | LĐV | **Có** |

> Đây là trạng thái **bản ghi nghiệp vụ sáng kiến** trên ManLab, khác với 07 trạng thái vòng đời **tài liệu** tại `ETV.P14` §6.3 (áp dụng cho chính thủ tục này và cho các tài liệu HTQL được cập nhật sau khi chuẩn hóa).
>
> Cờ **Nợ quy trình** không phải trạng thái: sáng kiến mang cờ này vẫn ở trạng thái *Chờ xác nhận hiệu quả*, **không** được thống kê là hoàn thành và **không** được viện dẫn làm bằng chứng cải tiến cho `ETV.P16`, `ETV.P17` hoặc cho đánh giá bên ngoài.

### Phụ lục II — Thang mức độ số hóa quá trình

*(Dẫn chiếu từ §6.1.2, §6.4.1, §6.7.3)*

| Mức | Tên gọi | Đặc trưng |
| --- | ------- | --------- |
| 0 | Thủ công trên giấy | Ghi chép, luân chuyển, ký duyệt hoàn toàn trên giấy |
| 1 | Điện tử rời rạc | Dùng tệp văn bản, bảng tính rời; không có bản ghi tập trung, không có luồng trạng thái |
| 2 | Có hệ thống, nhập tay | Đã có bản ghi trên ManLab với luồng trạng thái và phân quyền; dữ liệu vẫn nhập tay, còn nhập lại nhiều lần |
| 3 | Liên thông dữ liệu | Dữ liệu được lấy tự động từ nguồn gốc hoặc từ module khác; không nhập lại; có truy vết đầy đủ |
| 4 | Tự động hóa và hỗ trợ quyết định | Tự động hóa các bước lặp lại, cảnh báo và kiểm tra tự động, hỗ trợ ra quyết định có kiểm soát của con người |

Mức độ số hóa do TCĐS xác định, QLCL xác nhận, rà soát tối thiểu **12 tháng/lần** và cập nhật ngay sau khi một sáng kiến được đóng ở trạng thái **Đã chuẩn hóa**. Mức 4 **không bao giờ** đồng nghĩa với việc bỏ phê duyệt của con người đối với kết luận đo lường, kết quả và chứng chỉ (`ETV.P29`).

### Phụ lục III — Bộ tiêu chí sàng lọc và chấm điểm

*(Dẫn chiếu từ §6.3.2 bước 4)*

Thang điểm **1–5** cho từng tiêu chí (5 là thuận lợi nhất):

| Tiêu chí | Trọng số | Nội dung xem xét |
| -------- | -------- | ---------------- |
| Lợi ích và mức độ cấp thiết | 30% | Mức độ cải thiện dự kiến so với đường cơ sở; số người, số hồ sơ, số quá trình hưởng lợi; mức độ ảnh hưởng tới khách hàng |
| Mức độ phù hợp định hướng | 20% | Bám sát định hướng chuyển đổi số, mục tiêu chất lượng và bối cảnh của Viện (`ETV.P25`) |
| Mức độ sẵn sàng dữ liệu và quá trình | 20% | Quá trình đã chuẩn hóa tới đâu; dữ liệu đã có, đã sạch, đã có chủ sở hữu hay chưa |
| Chi phí và nguồn lực | 15% | Chi phí, nhân lực, thời gian; mức độ phụ thuộc nhà cung cấp bên ngoài |
| Rủi ro | 15% | Rủi ro đối với hiệu lực kết quả, an toàn thông tin, dữ liệu cá nhân, tuân thủ; khả năng quay lui nếu thất bại |

Điểm tổng hợp là **căn cứ kiến nghị**, không phải quyết định tự động: mọi kiến nghị **Không tiếp nhận** phải có nhận xét bằng lời, và LĐV có quyền quyết định khác kèm lý do.

Kết quả sàng lọc gồm 04 khả năng: **Tiếp nhận – ưu tiên kỳ này** (đưa vào `F 32.04`, trình phê duyệt, giao CTSK) · **Tiếp nhận – xếp hàng đợi** (giữ ở trạng thái Đã phê duyệt, rà soát lại kỳ kế tiếp) · **Gộp** (ghi liên kết tới sáng kiến chính, đóng bản ghi kèm lý do) · **Không tiếp nhận** (bắt buộc ghi lý do, thông báo người đề xuất trong 05 ngày làm việc).

### Phụ lục IV — Quy tắc chặn cứng và cảnh báo trên ManLab

*(Dẫn chiếu từ §6.2, §6.3, §6.5, §6.6, §6.7, §6.8, §6.9, §6.11 — là yêu cầu cấu hình đối với Module M32)*

**Chặn cứng — hệ thống không cho thực hiện thao tác:**

- Sáng kiến số hóa một quá trình **chưa có thủ tục, quy trình đang hiệu lực** → chặn phê duyệt
- Sáng kiến **không có đường cơ sở** hoặc chỉ tiêu không phải bằng số → chặn trình phê duyệt
- Sáng kiến Mức 2, Mức 3 chuyển sang *Đang triển khai* mà **chưa liên kết phiếu thay đổi `ETV.P30`** → chặn chuyển trạng thái
- Người chủ trì sáng kiến đồng thời là **người kết luận hiệu quả** sáng kiến đó → chặn thao tác
- Đóng sáng kiến ở trạng thái **Đã chuẩn hóa** khi chưa hoàn tất §6.7.3 → chặn đóng, gắn cờ **Nợ quy trình**
- Sáng kiến **Không đạt** ở Mức 2, Mức 3 đóng mà **chưa lập bài học kinh nghiệm** theo `ETV.P26` → chặn đóng

**Không được chấp nhận — vi phạm quy định, xử lý theo thủ tục liên quan:**

- **Đổi cách đo hoặc đổi nguồn dữ liệu** giữa lần đo đường cơ sở và lần đo lại → kết quả so sánh không có giá trị
- **Sửa tiêu chí thoát thí điểm** trong khi thí điểm đang chạy → mọi điều chỉnh phải có phê duyệt của LĐV kèm lý do và làm mới thời gian thí điểm
- **Chia nhỏ** sáng kiến Mức 3 thành nhiều sáng kiến Mức 1 để né thẩm quyền → xử lý như thay đổi âm thầm (`ETV.P30`)
- Thí điểm chạm dữ liệu đo, hồ sơ kỹ thuật, kết quả khách hàng mà **không chạy song song** → cấm tuyệt đối
- Dùng **dữ liệu khách hàng thật, dữ liệu cá nhân chưa ẩn danh** trên môi trường thử nghiệm khi chưa được PT.ATTT chấp thuận → vi phạm nghiêm trọng (`ETV.P28`)
- Phát hành hồ sơ, kết quả cho khách hàng bằng **phương thức đang thí điểm** khi thay đổi chưa được xác nhận hiệu lực → rà soát theo `ETV.P10`, `ETV.P11`
- Sáng kiến bị **bỏ dở âm thầm** — không báo cáo, không quay lui, để hai cách làm cùng tồn tại → xử lý theo `ETV.P13`
- Công cụ tự phát tạo ra dữ liệu hoặc kết quả **gửi cho khách hàng** → cấm tuyệt đối
- Sáng kiến làm thay đổi nội dung **đã đăng ký, đã chỉ định, đã công nhận** mà không báo cáo LĐV để xử lý nghĩa vụ thông báo → vi phạm nghiêm trọng
- Trợ lý AI phê duyệt sáng kiến, kết luận hiệu quả, tự đóng sáng kiến hoặc tự thay đổi cấu hình, dữ liệu trên môi trường vận hành → cấm tuyệt đối

**Cảnh báo tự động:**

| Điều kiện | Cảnh báo tới | Mốc |
| --------- | ------------ | --- |
| Đề xuất chưa được phản hồi quá thời hạn (§6.3.2) | QLCL; quá 02 kỳ liên tiếp → LĐV | 10 ngày làm việc |
| Cờ **Nợ quy trình** tồn tại kéo dài | LĐV và báo cáo xem xét lãnh đạo | 60 ngày |
| Sáng kiến **Tạm dừng** không có quyết định tiếp tục hay hủy | LĐV | 12 tháng |
| Kế hoạch chuyển đổi số hằng năm chưa được phê duyệt trước khi năm kế hoạch bắt đầu | LĐV | Đầu kỳ |
| Thí điểm quá hạn mà chưa kết luận | QLCL, LĐV | Hết thời hạn tại §6.6 |

### Phụ lục V — Điểm nối bắt buộc với thủ tục liên quan

*(Dẫn chiếu từ §6.2, §6.5.1)*

| Tình huống | Hồ sơ bắt buộc | Thủ tục |
| ---------- | -------------- | ------- |
| Sáng kiến Mức 2, Mức 3 (mọi trường hợp) | Phiếu đề nghị thay đổi và đánh giá tác động | `ETV.P30` |
| Đưa nền tảng số mới vào vận hành hoặc thay đổi nền tảng | Đăng ký, đánh giá trước vận hành | `ETV.P35` |
| Ứng dụng trí tuệ nhân tạo vào quá trình nghiệp vụ | Hồ sơ đánh giá tác động AI (AIA) | `ETV.P29` |
| Mua phần mềm, thuê dịch vụ, thuê phát triển | Hồ sơ mua sắm và đánh giá nhà cung cấp | `ETV.P06` |
| Kết nối, đồng bộ dữ liệu giữa các hệ thống | Hồ sơ điểm tích hợp | `ETV.P37` |
| Thay đổi phân quyền, xử lý dữ liệu cá nhân, đưa dữ liệu ra bên ngoài | Đánh giá an toàn thông tin | `ETV.P28` |
| Thay đổi phương pháp, quy trình kỹ thuật | Kiểm tra xác nhận / xác nhận giá trị sử dụng | `ETV.P08` |
| Phát sinh nhu cầu đào tạo, ủy quyền người dùng mới | Hồ sơ đào tạo và đánh giá năng lực | `ETV.P03` |
| Cập nhật tài liệu HTQL sau chuẩn hóa | Phiếu đề nghị soát xét, sửa đổi, ban hành văn bản | `ETV.P14` (`F 14.01`) |

---

*Thủ tục Chuyển đổi số và cải tiến hệ thống — ETV.P 32 — Lần BH: 01 — Trang tài liệu điện tử, không áp dụng đánh số trang thủ công (bản in xuất từ ManLab tự sinh header/footer theo `ETV.P14` §6.4).*
