---
# Khối metadata AI — bắt buộc cho mọi văn bản kiểm soát (ETV.P14 VI.3)
id: ETV.P30
title: "Thủ tục Quản lý thay đổi"
type: Thu-tuc
owner: "Phụ trách Quản lý chất lượng (QLCL)"
department: "Toàn Viện"
process: MP30_ThayDoi
capability: [CAP-16_ChatLuong]
module: M30_ThayDoi
effective_date: ""
revision: "01"
status: Cho-soat-xet
keywords: [quản lý thay đổi, đánh giá tác động, phương án quay lui, xác nhận hiệu lực sau thay đổi, ISO 9001 §6.3, ISO/IEC 17025 §8.2.4]
related_documents: [ETV.QM, ETV.P01, ETV.P03, ETV.P05, ETV.P08, ETV.P10, ETV.P11, ETV.P13, ETV.P14, ETV.P15, ETV.P21, ETV.P29, ETV.P31, ETV.P35]
iso_clause: ["ISO 9001:2015 §6.3 (Hoạch định thay đổi)", "ISO 9001:2015 §8.5.6 (Kiểm soát thay đổi)", "ISO/IEC 17025:2017 §8.2.4 (Thay đổi hệ thống quản lý)", "ISO/IEC 17025:2017 §7.2 (Phương pháp)", "ISO 17034:2016 §8.2.4", "ISO/IEC 27001:2022 §6.3, A.8.32 (Quản lý thay đổi)", "ISO/IEC 42001:2023 §8.1"]
legal_basis: ["Luật Đo lường 04/2011/QH13", "Nghị định 105/2016/NĐ-CP", "Nghị định 154/2018/NĐ-CP", "Nghị định 107/2016/NĐ-CP", "Luật Giao dịch điện tử 20/2023/QH15", "Nghị định 30/2020/NĐ-CP"]
ai_tags: [change-management, impact-assessment, rollback]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Vĩnh viễn (bản hiện hành) — xem chi tiết theo loại tại ETV.P.F 14.06"
digital_signature: "LĐV"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV)"
supersedes: null
superseded_by: null
---
# THỦ TỤC QUẢN LÝ THAY ĐỔI

**Procedure For Change Management**

|                   |                                          |
| ----------------- | ---------------------------------------- |
| **Mã số**         | ETV.P 30                                 |
| **Lần ban hành**  | 01                                       |
| **Ngày ban hành** | ..../..../........                       |
| **Biên soạn**     | Dương Thành Nam — ..../..../........     |
| **Soát xét**      | Đỗ Văn Vinh — Lãnh đạo Phòng, ..../..../........ |
| **Phê duyệt**     | Nguyễn Hoàng Giang — Lãnh đạo Viện, ..../..../........ |

> **Tình trạng bản này: CHỜ SOÁT XÉT** — dự thảo lần đầu, chưa có hiệu lực. Bản này chỉ được áp dụng sau khi Lãnh đạo Viện phê duyệt và chuyển trạng thái **Đã phê duyệt** theo ETV.P14.

> **Chú ý:** Tài liệu nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện Kiểm định Công nghệ và Môi trường.

> **Ghi chú số hóa (AI).** Bản dự thảo do AI soạn theo khung mẫu chuẩn của skill `s14-kiem-soat-tai-lieu` (thể thức tài liệu HTQL tại ETV.P14), lấy ETV.P01 và ETV.P13 làm mẫu cấu trúc. Đây là **bản dự thảo/gợi ý**, cần Lãnh đạo Phòng soát xét và Lãnh đạo Viện phê duyệt trước khi có hiệu lực. Các giá trị định lượng (mức tác động, thời gian quan sát, thời hạn hồi tố) là **đề xuất**, cần Viện xác nhận cho khớp nguồn lực thực tế trước khi ban hành.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian | Nội dung thay đổi | Lần ban hành |
| ---------- | ------------------- | -------------- |
| ..../..../........ | Ban hành lần thứ nhất. Thủ tục mới, hiện thực hoá yêu cầu tại Sổ tay chất lượng §9.7 và quy trình MP30 | 01 |

---

## I. MỤC ĐÍCH

Thủ tục này quy định nội dung, trách nhiệm và trình tự **đề nghị, đánh giá tác động, phê duyệt, triển khai, xác nhận hiệu lực và đóng** mọi thay đổi có ảnh hưởng tới hệ thống quản lý và hoạt động chuyên môn của Viện ETV, nhằm đáp ứng yêu cầu Điều 6.3 và 8.5.6 của ISO 9001:2015, Điều 8.2.4 của ISO/IEC 17025:2017, Điều 8.2.4 của ISO 17034:2016, Điều 6.3 và kiểm soát A.8.32 của ISO/IEC 27001:2022, và Mục 9.7 của Sổ tay chất lượng. Cụ thể để:

1. Bảo đảm mọi thay đổi đối với hệ thống quản lý được **hoạch định trước**, không thực hiện tự phát, và luôn xem xét mục đích thay đổi cùng hệ quả tiềm ẩn.
2. Bảo đảm thay đổi về nhân sự, thiết bị, phương pháp, cơ sở vật chất, phần mềm, dữ liệu và nhà cung cấp **không làm mất hiệu lực** kết quả kiểm định, hiệu chuẩn, thử nghiệm, sản xuất chất chuẩn đã và đang thực hiện.
3. Bảo đảm thay đổi ảnh hưởng tới **phạm vi công nhận, phạm vi chỉ định, phạm vi đăng ký** được thông báo tới tổ chức công nhận và cơ quan quản lý nhà nước đúng nghĩa vụ, đúng thời hạn.
4. Bảo đảm mỗi thay đổi đều có **người chịu trách nhiệm, phương án quay lui, tiêu chí xác nhận hiệu lực** và bằng chứng đóng thay đổi có thể truy xuất.
5. Ngăn tình trạng **thay đổi âm thầm** — sửa quy trình, đổi cấu hình phần mềm, thay hoá chất/chuẩn, đổi người ký kết quả mà không ai đánh giá tác động.
6. Cung cấp **sổ đăng ký thay đổi** làm nguồn dữ liệu chung cho quản lý rủi ro (ETV.P01), đánh giá nội bộ (ETV.P16) và xem xét của lãnh đạo (ETV.P17).

Áp dụng thống nhất trong toàn Viện ETV, thực hiện qua phần mềm ManLab (Module M30 – Quản lý thay đổi).

---

## II. PHẠM VI ÁP DỤNG

### 2.1. Đối tượng áp dụng

Áp dụng cho toàn bộ đơn vị, phòng ban, cá nhân thuộc Viện ETV và cho **mọi thay đổi có chủ đích** thuộc các nhóm sau:

| TT | Nhóm thay đổi | Ví dụ |
|---|---|---|
| 1 | Hệ thống quản lý | Sửa đổi Sổ tay chất lượng, ban hành lại thủ tục, thay đổi cơ cấu tổ chức, thay đổi phân công trách nhiệm |
| 2 | Nhân sự | Bổ nhiệm/thay người ký kết quả, thay đổi người được uỷ quyền phê duyệt, thay đổi người thực hiện phép đo đã được đánh giá tay nghề |
| 3 | Phương pháp và kỹ thuật | Áp dụng phiên bản mới của tiêu chuẩn, đổi phương pháp, mở rộng/thu hẹp dải đo, đổi công thức tính độ không đảm bảo đo |
| 4 | Thiết bị và chuẩn đo lường | Thay thiết bị chính, đổi chuẩn/mẫu chuẩn tham chiếu, đổi tổ chức hiệu chuẩn bên ngoài, di chuyển thiết bị |
| 5 | Cơ sở vật chất và môi trường | Chuyển địa điểm phòng thí nghiệm, cải tạo mặt bằng, thay đổi hệ thống điều hoà/thông gió ảnh hưởng điều kiện môi trường |
| 6 | Phần mềm, dữ liệu, nền tảng số | Nâng cấp ManLab, đổi cấu trúc dữ liệu, đổi phân quyền diện rộng, đổi nhà cung cấp dịch vụ đám mây |
| 7 | Trí tuệ nhân tạo | Đổi mô hình, nâng mức quyền hành động của tác tử, mở rộng đối tượng chịu tác động |
| 8 | Nhà cung cấp và dịch vụ bên ngoài | Đổi nhà thầu phụ thực hiện phép thử, đổi nhà cung cấp hoá chất/chuẩn có ảnh hưởng kỹ thuật |
| 9 | Phạm vi hoạt động | Bổ sung/rút phép thử khỏi phạm vi công nhận, thay đổi phạm vi chỉ định, thay đổi phạm vi đăng ký hoạt động |

### 2.2. Nguyên tắc áp dụng

**Nguyên tắc 1 — Không thay đổi trước khi đánh giá tác động.** Thay đổi thuộc **Mức 2** và **Mức 3** (mục 6.2) chỉ được triển khai **sau khi** phiếu thay đổi đã được phê duyệt. Việc "làm rồi mới ghi hồ sơ" là **không phù hợp**, trừ thay đổi khẩn cấp theo mục 6.6 — và ngay cả trường hợp này vẫn phải hoàn tất hồ sơ hồi tố trong thời hạn quy định.

**Nguyên tắc 2 — Đăng ký, không sao chép.** Sổ đăng ký thay đổi là **sổ đăng ký**, không phải kho tài liệu. Phiếu thay đổi chỉ lưu thông tin định danh thay đổi, đánh giá tác động, quyết định phê duyệt, kết quả xác nhận hiệu lực và **đường dẫn** tới nội dung gốc: tài liệu được sửa lưu theo ETV.P14, hồ sơ xác nhận giá trị sử dụng phương pháp lưu theo ETV.P08, hồ sơ thiết bị lưu theo ETV.P05.

### 2.3. Ngoài phạm vi

Thủ tục này **không** thay thế và **không** trùng lặp với:

| Nội dung | Thuộc thủ tục |
|---|---|
| Sự cố, hỏng hóc, sai lệch **ngoài ý muốn** (không phải thay đổi có chủ đích) | ETV.P13 – Kiểm soát công việc không phù hợp · ETV.P28 – An toàn thông tin |
| Gián đoạn hoạt động và phương án khôi phục | ETV.P31 – Quản lý tính liên tục hoạt động |
| Thể thức, mã hoá, phiên bản, hiệu lực, phân phối và thu hồi tài liệu bị sửa đổi | ETV.P14 – Kiểm soát tài liệu |
| Xác nhận giá trị sử dụng của phương pháp mới hoặc phương pháp đã sửa đổi | ETV.P08 – Lựa chọn, kiểm tra xác nhận và xác nhận giá trị sử dụng phương pháp |
| Đánh giá tay nghề, uỷ quyền kỹ thuật, đào tạo nhân sự sau thay đổi | ETV.P03 – Quản lý nhân sự |
| Hồ sơ thiết bị, hiệu chuẩn, kiểm tra trung gian sau khi thay/di chuyển thiết bị | ETV.P05 – Quản lý thiết bị |
| Đánh giá và lựa chọn nhà cung cấp mới | ETV.P06 – Quản lý mua sắm |
| Xử lý kết quả đã phát hành bị ảnh hưởng bởi thay đổi | ETV.P10 – Đảm bảo giá trị sử dụng kết quả · ETV.P11 – Báo cáo kết quả |
| Đánh giá và xử lý rủi ro phát sinh từ thay đổi | ETV.P01 – Rủi ro và cơ hội |
| Biện pháp kỹ thuật an toàn thông tin khi thay đổi hệ thống | ETV.P28 – Quản lý an toàn thông tin |
| Đăng ký, phê duyệt vận hành và ngừng vận hành nền tảng số | ETV.P35 – Quản lý nền tảng số |
| Đánh giá tác động AI (AIA), kiểm thử chất lượng hệ thống AI | ETV.P29 – Quản lý hệ thống trí tuệ nhân tạo |
| Sáng kiến, lộ trình và danh mục đầu tư chuyển đổi số | ETV.P32 – Chuyển đổi số và cải tiến hệ thống |
| Công bố lại năng lực sau khi thay đổi phạm vi được chấp thuận | ETV.P21 – Công bố và kiểm soát năng lực |

> **Phân biệt cốt lõi:** ETV.P30 xử lý **cái Viện chủ động làm khác đi**; ETV.P13 xử lý **cái đã xảy ra sai**; ETV.P31 xử lý **cái làm Viện không hoạt động được**. Một sự việc có thể kích hoạt cả ba, nhưng mỗi thủ tục giữ đúng vai của mình.

---

## III. TÀI LIỆU VIỆN DẪN

> Nguyên tắc: **chỉ dẫn chiếu, không chép lại nội dung.** Bản đầy đủ đặt tại `03_MANAGEMENT_SYSTEM/` (chuẩn mực) và `08_KNOWLEDGE_GRAPH/01_Regulations/` (pháp luật). QLCL rà soát hiệu lực và văn bản thay thế trước mỗi lần ban hành lại.

### 3.1. Tiêu chuẩn

- ISO 9001:2015 §6.3 (Hoạch định thay đổi); §8.1; §8.3.6; §8.5.6 (Kiểm soát thay đổi); §9.3
- ISO/IEC 17025:2017 §6.2; §6.3; §6.4; §6.6; §7.2; §7.8; §7.11; §8.2.4 (Thay đổi hệ thống quản lý); §8.5
- ISO 17034:2016 §7.4; §7.6; §8.2.4
- ISO/IEC 27001:2022 §6.3 (Hoạch định thay đổi); §8.1; A.8.9; A.8.31; A.8.32 (Quản lý thay đổi)
- ISO/IEC 42001:2023 §6.1; §8.1; §8.4
- `11_COMPLIANCE/01_ISO_Mapping/MP-ISO-mapping.md` — bảng ánh xạ đầy đủ MP ↔ điều khoản

### 3.2. Văn bản pháp luật

- Luật Đo lường số 04/2011/QH13 — điều kiện hoạt động của tổ chức kiểm định, hiệu chuẩn, thử nghiệm
- Nghị định 105/2016/NĐ-CP và Nghị định 154/2018/NĐ-CP — điều kiện, đăng ký và chỉ định hoạt động; **nghĩa vụ thông báo khi có thay đổi** so với hồ sơ đã đăng ký, đã chỉ định
- Nghị định 107/2016/NĐ-CP (và văn bản sửa đổi, bổ sung hiện hành) — điều kiện kinh doanh dịch vụ đánh giá sự phù hợp; nghĩa vụ báo cáo khi thay đổi
- Luật Giao dịch điện tử số 20/2023/QH15 — giá trị pháp lý của thông điệp dữ liệu và chữ ký điện tử dùng trong phê duyệt thay đổi
- Nghị định 30/2020/NĐ-CP — công tác văn thư đối với văn bản ban hành kèm theo thay đổi

> **Lưu ý phạm vi:** Luật Ban hành văn bản quy phạm pháp luật điều chỉnh cơ quan nhà nước có thẩm quyền ban hành VBQPPL; ETV không ban hành VBQPPL nên luật này không phải căn cứ ban hành văn bản nội bộ.

### 3.3. Văn bản nội bộ Viện ETV

- Sổ tay quản lý chất lượng (ETV.QM) §9.7
- ETV.P01 – Quản lý rủi ro và cơ hội · ETV.P03 – Quản lý nhân sự · ETV.P05 – Quản lý thiết bị · ETV.P06 – Quản lý mua sắm
- ETV.P08 – Phương pháp · ETV.P10 – Đảm bảo giá trị sử dụng kết quả · ETV.P11 – Báo cáo kết quả · ETV.P13 – Kiểm soát công việc không phù hợp
- ETV.P14 – Kiểm soát tài liệu · ETV.P15 – Kiểm soát hồ sơ · ETV.P16 – Đánh giá nội bộ · ETV.P17 – Xem xét của lãnh đạo
- ETV.P21 – Công bố và kiểm soát năng lực · ETV.P26 – Quản lý tri thức tổ chức · ETV.P27 – Quản trị dữ liệu và tài sản thông tin
- ETV.P28 – Quản lý an toàn thông tin · ETV.P29 – Quản lý hệ thống trí tuệ nhân tạo · ETV.P31 – Quản lý tính liên tục hoạt động
- ETV.P32 – Chuyển đổi số và cải tiến hệ thống · ETV.P33 – Quản lý hệ thống thông tin · ETV.P35 – Quản lý nền tảng số

---

## IV. THUẬT NGỮ, ĐỊNH NGHĨA VÀ CHỮ VIẾT TẮT

### 4.1. Thuật ngữ và định nghĩa

Định nghĩa chung ("quá trình", "sự không phù hợp", "hiệu lực"...) theo ISO 9000:2015 — không nhắc lại tại đây. Các thuật ngữ riêng của thủ tục này:

| Thuật ngữ | Định nghĩa |
|---|---|
| **Thay đổi** (Change) | Việc chủ động làm khác đi so với hiện trạng đã được thiết lập của hệ thống quản lý hoặc hoạt động chuyên môn, do Viện quyết định thực hiện |
| **Phiếu thay đổi** (RFC) | Hồ sơ đăng ký một thay đổi cụ thể, gồm: mã thay đổi, nội dung, lý do, đối tượng chịu ảnh hưởng, đánh giá tác động, phương án triển khai, phương án quay lui, tiêu chí xác nhận hiệu lực và quyết định phê duyệt |
| **Mã thay đổi** | Chuỗi định danh duy nhất toàn hệ thống của một thay đổi, dạng `CR-<năm>-<số thứ tự>` (ví dụ `CR-2026-017`). **Không được tái sử dụng** |
| **Mức tác động** | Mức độ ảnh hưởng của thay đổi tới Viện: **Mức 1** (trong phạm vi một phòng), **Mức 2** (liên phòng hoặc ảnh hưởng hệ thống quản lý), **Mức 3** (ảnh hưởng hiệu lực kết quả, dữ liệu khách hàng, hoặc phạm vi công nhận/chỉ định) |
| **Loại thay đổi** | Cách thức xử lý thay đổi: **Thay đổi tiêu chuẩn** (đã phê duyệt trước theo danh mục), **Thay đổi thông thường** (theo trình tự đầy đủ), **Thay đổi khẩn cấp** (triển khai trước, hoàn tất hồ sơ hồi tố) |
| **Thay đổi tiêu chuẩn** | Thay đổi lặp lại, đã biết rõ rủi ro, được LĐV phê duyệt trước một lần cho cả loại và ghi trong Danh mục thay đổi tiêu chuẩn; mỗi lần thực hiện chỉ cần ghi nhật ký |
| **Đánh giá tác động** | Việc xác định thay đổi ảnh hưởng tới những đối tượng nào (tài liệu, nhân sự, thiết bị, phương pháp, dữ liệu, khách hàng, phạm vi công nhận), mức độ ảnh hưởng và các hành động bắt buộc kèm theo |
| **Phương án quay lui** (Rollback) | Cách thức đưa hệ thống trở lại hiện trạng trước thay đổi khi thay đổi thất bại, gồm điều kiện kích hoạt, các bước, người chịu trách nhiệm và thời gian dự kiến |
| **Cửa sổ triển khai** | Khoảng thời gian được phê duyệt để thực hiện thay đổi, chọn sao cho ít ảnh hưởng nhất tới hoạt động cung cấp dịch vụ |
| **Xác nhận hiệu lực sau thay đổi** (PIR) | Việc kiểm tra, sau khi thay đổi đã triển khai, rằng thay đổi đạt được mục đích đặt ra và **không** gây hệ quả ngoài mong muốn; kết luận PIR là điều kiện để đóng thay đổi |
| **Thay đổi âm thầm** | Thay đổi đã được thực hiện trên thực tế nhưng không có phiếu thay đổi được phê duyệt và không thuộc diện thay đổi tiêu chuẩn hay khẩn cấp |
| **Chủ trì thay đổi** (CTTĐ) | Lãnh đạo Phòng hoặc người phụ trách lĩnh vực chịu trách nhiệm về việc thay đổi được triển khai đúng, đủ và được xác nhận hiệu lực |

### 4.2. Chữ viết tắt

| Viết tắt | Ý nghĩa |
|---|---|
| ETV | Viện Kiểm định Công nghệ và Môi trường |
| LĐV | Lãnh đạo Viện (cấp trưởng, cấp phó) |
| LĐP | Lãnh đạo Phòng/bộ phận, người phụ trách lĩnh vực |
| NTH | Người thực hiện (mọi nhân sự, không phân biệt chức vụ) |
| QLCL | Phụ trách Quản lý chất lượng |
| QTHT | Quản trị hệ thống |
| CTTĐ | Chủ trì thay đổi |
| RFC | Phiếu đề nghị thay đổi (Change Request) |
| PIR | Xác nhận hiệu lực sau thay đổi (Post-Implementation Review) |
| AIA | Đánh giá tác động hệ thống trí tuệ nhân tạo |
| KPH | Công việc không phù hợp |
| BoA | Văn phòng Công nhận Chất lượng |
| RACI | Responsible – Accountable – Consulted – Informed |

---

## V. VAI TRÒ VÀ TRÁCH NHIỆM (RACI)

### 5.1. Ma trận RACI

| Bước trong vòng đời thay đổi | NTH | CTTĐ | LĐP | QLCL | LĐV | QTHT |
|---|---|---|---|---|---|---|
| Đề nghị thay đổi | **R** | C | C | I | I | I |
| Cấp mã, phân loại nhóm/loại/mức tác động | I | C | I | **R/A** | C | I |
| Lập đánh giá tác động (F30.02) | C | **R/A** | C | C | I | C |
| Mở rủi ro tương ứng tại ETV.P01 | I | **R** | C | A | I | I |
| Soát xét phiếu thay đổi | I | I | **R/A** | **R/A** | I | C |
| Phê duyệt thay đổi Mức 1 | I | C | C | **R/A** | I | I |
| Phê duyệt thay đổi Mức 2, Mức 3 | I | C | C | C | **R/A** | I |
| Quyết định thông báo bên ngoài (BoA, cơ quan quản lý, khách hàng) | I | C | I | **R** | **A** | I |
| Triển khai thay đổi trong cửa sổ đã duyệt | **R** | **A** | C | I | I | **R** |
| Phổ biến, đào tạo trước ngày hiệu lực | **R** | **A** | C | C | I | I |
| Sửa đổi, ban hành lại tài liệu bị ảnh hưởng (ETV.P14) | C | C | C | **R/A** | I | I |
| Kích hoạt phương án quay lui (Mức 1, Mức 2) | C | **R/A** | C | I | I | **R** |
| Kích hoạt phương án quay lui (Mức 3) | I | **R** | C | C | **A** | **R** |
| Xác nhận hiệu lực sau thay đổi (F30.03) | C | **R** | C | **A** | I | I |
| Đóng thay đổi Mức 1 | I | C | I | **R/A** | I | I |
| Đóng thay đổi Mức 2, Mức 3 | I | C | I | **R** | **A** | I |
| Xử lý thay đổi âm thầm | I | C | C | **R** | **A** | I |
| Phê duyệt Danh mục thay đổi tiêu chuẩn | I | C | C | **R** | **A** | I |
| Lưu trữ hồ sơ thay đổi | I | C | I | **R/A** | I | I |

> LĐV luôn là **A** cuối cùng đối với thay đổi Mức 2, Mức 3 và đối với Danh mục thay đổi tiêu chuẩn — **không uỷ quyền**.

### 5.2. Trách nhiệm cụ thể

**Lãnh đạo Viện (LĐV):** Phê duyệt thay đổi Mức 2, Mức 3 và Danh mục thay đổi tiêu chuẩn; quyết định việc thông báo tới tổ chức công nhận, cơ quan quản lý nhà nước và khách hàng; phê duyệt hồi tố thay đổi khẩn cấp và quyết định xử lý thay đổi âm thầm; quyết định dừng thay đổi, kích hoạt quay lui ở Mức 3; xem xét tình hình thay đổi trong cuộc họp xem xét của lãnh đạo (ETV.P17).

**Phụ trách Quản lý chất lượng (QLCL):** Quản trị Sổ đăng ký thay đổi (F30.01), cấp mã thay đổi, duy trì Danh mục thay đổi tiêu chuẩn; phân loại sơ bộ mức tác động và chỉ định thành phần soát xét; kiểm tra tính đầy đủ của đánh giá tác động trước khi trình LĐV; theo dõi thay đổi quá hạn triển khai và quá hạn xác nhận hiệu lực; phối hợp ETV.P14 bảo đảm tài liệu bị ảnh hưởng được sửa đổi, ban hành lại, thu hồi bản cũ; **phê duyệt thay đổi Mức 1**; tổng hợp báo cáo và lưu trữ hồ sơ theo ETV.P15.

**Chủ trì thay đổi (CTTĐ):** Chịu trách nhiệm về nội dung kỹ thuật của thay đổi và tính đầy đủ của đánh giá tác động; lập phương án triển khai, phương án quay lui và tiêu chí xác nhận hiệu lực; tổ chức triển khai trong cửa sổ đã phê duyệt; chủ trì xác nhận hiệu lực sau thay đổi và đề nghị đóng thay đổi; bảo đảm nhân sự liên quan được phổ biến, đào tạo **trước khi** thay đổi có hiệu lực.

**Lãnh đạo Phòng (LĐP):** Soát xét phiếu thay đổi thuộc lĩnh vực phụ trách, nêu rõ ảnh hưởng tới hoạt động của phòng; bố trí nguồn lực triển khai; báo cáo QLCL khi phát hiện thay đổi âm thầm trong phạm vi quản lý.

**Quản trị hệ thống (QTHT):** Vận hành ManLab Module M30, bảo đảm phân quyền theo vai trò và ghi nhật ký thao tác; thực hiện thay đổi kỹ thuật trên hệ thống thông tin theo phiếu đã phê duyệt và ghi nhật ký thay đổi cấu hình; **từ chối** thực hiện thay đổi kỹ thuật khi chưa có phiếu được phê duyệt, trừ trường hợp khẩn cấp có lệnh của LĐV.

**Người thực hiện (NTH):** Đề nghị thay đổi khi phát hiện nhu cầu, **không** tự ý thay đổi cách làm đã được quy định; thực hiện đúng nội dung đã thay đổi kể từ ngày có hiệu lực; báo cáo CTTĐ khi phát hiện hệ quả ngoài mong muốn.

### 5.3. Nguyên tắc tách vai trò và giới hạn của AI

- Người đề nghị ≠ người soát xét ≠ người phê duyệt.
- Người xác nhận hiệu lực sau thay đổi **không** đồng thời là người trực tiếp thực hiện thay đổi đó ở Mức 3.
- Trợ lý AI **không** được phân loại mức tác động thay người có thẩm quyền, **không** soát xét, **không** phê duyệt, **không** kết luận xác nhận hiệu lực và **không** tự thực hiện thay đổi trên môi trường vận hành (ISO/IEC 42001; ETV.P29). AI chỉ gợi ý, cảnh báo, kiểm tra; mọi gợi ý phải được người có thẩm quyền xác nhận trước khi trở thành nội dung chính thức của phiếu.

---

## VI. NỘI DUNG / QUY TRÌNH THỰC HIỆN

### 6.1. Sổ đăng ký thay đổi

#### 6.1.1. Nội dung tối thiểu của một bản ghi

| Nhóm | Trường bắt buộc |
|---|---|
| Định danh | Mã thay đổi, tiêu đề, ngày đề nghị, người đề nghị, chủ trì thay đổi |
| Phân loại | Nhóm thay đổi (mục 2.1), loại thay đổi, mức tác động |
| Nội dung | Hiện trạng, nội dung thay đổi, lý do, kết quả mong đợi |
| Tác động | Danh sách đối tượng chịu ảnh hưởng, hành động bắt buộc kèm theo, mã rủi ro mở tại ETV.P01 |
| Triển khai | Cửa sổ triển khai, người thực hiện, phương án quay lui, ngày hiệu lực |
| Xác nhận | Tiêu chí xác nhận hiệu lực, ngày PIR, kết luận PIR |
| Quyết định | Người soát xét, người phê duyệt, ngày phê duyệt, lý do (nếu không phê duyệt) |
| Liên kết | Đường dẫn tới tài liệu bị sửa (ETV.P14), hồ sơ kỹ thuật liên quan, phiếu KPH (ETV.P13) nếu có |

#### 6.1.2. Mã thay đổi

Mã thay đổi do QLCL cấp, **duy nhất toàn hệ thống**, dạng `CR-<năm>-<số thứ tự 3 chữ số>`. Mã của thay đổi đã Hủy hoặc Không phê duyệt **không được cấp lại**, nhằm giữ nguyên giá trị truy vết của nhật ký lịch sử.

### 6.2. Phân mức tác động

#### 6.2.1. Thang mức tác động

| Mức | Tiêu chí nhận diện (thoả **bất kỳ** tiêu chí nào thì xếp vào mức đó) | Ví dụ |
|---|---|---|
| **Mức 1** | Ảnh hưởng giới hạn trong **một phòng**; không đụng tới phương pháp, thiết bị chính, dữ liệu khách hàng, tài liệu hệ thống | Sửa mô tả công việc nội bộ, đổi vị trí lưu hồ sơ trong phòng |
| **Mức 2** | Ảnh hưởng **từ hai phòng trở lên**; sửa đổi tài liệu hệ thống quản lý; đổi phân công trách nhiệm; nâng cấp phần mềm dùng chung; đổi nhà cung cấp có ảnh hưởng kỹ thuật | Ban hành lại một thủ tục, đổi cơ cấu tổ chức, nâng cấp ManLab, đổi tổ chức hiệu chuẩn bên ngoài |
| **Mức 3** | Có khả năng ảnh hưởng **hiệu lực kết quả đã hoặc đang phát hành**; ảnh hưởng **dữ liệu khách hàng** mức Hạn chế/Mật; thay đổi **phạm vi công nhận/chỉ định/đăng ký**; thay đổi **người ký kết quả**; thay đổi **phương pháp, dải đo, công thức tính độ không đảm bảo đo** | Áp dụng phiên bản mới của tiêu chuẩn phép thử, thay thiết bị chính, chuyển địa điểm phòng thí nghiệm, đổi mô hình AI tham gia xử lý dữ liệu đo |

Khi có nghi ngờ giữa hai mức, **xếp vào mức cao hơn**. QLCL phân loại sơ bộ; LĐV có quyền nâng mức.

#### 6.2.2. Yêu cầu bắt buộc theo mức

| Yêu cầu | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|
| Lập phiếu thay đổi (F30.01) | Có | Có | Có |
| Đánh giá tác động đầy đủ (F30.02) | Rút gọn | **Có** | **Có** |
| Mở rủi ro tại ETV.P01 | Khi có rủi ro | **Bắt buộc ≥ 01 rủi ro** | **Bắt buộc ≥ 01 rủi ro** |
| Phương án quay lui | Khuyến nghị | **Bắt buộc** | **Bắt buộc, đã thử nghiệm hoặc mô tả chi tiết đến bước thao tác** |
| Người soát xét | LĐP (≠ người đề nghị) | LĐP liên quan + QLCL | LĐP liên quan + QLCL + chuyên gia kỹ thuật lĩnh vực |
| Người phê duyệt | **QLCL** | **LĐV** | **LĐV** |
| Phổ biến/đào tạo trước hiệu lực | Khi cần | **Bắt buộc** | **Bắt buộc, có hồ sơ theo ETV.P03** |
| Xác nhận hiệu lực sau thay đổi (F30.03) | Ghi nhận ngắn | **Bắt buộc** | **Bắt buộc, có bằng chứng khách quan** |
| Thông báo bên ngoài | Không | Khi thuộc diện | **Rà soát bắt buộc** theo mục 6.4.3 |

### 6.3. Trình tự thay đổi thông thường

| Bước | Nội dung thực hiện | Trách nhiệm | Biểu mẫu |
|---|---|---|---|
| 1 | **Đề nghị thay đổi** — lập phiếu: hiện trạng, nội dung thay đổi, lý do, kết quả mong đợi, đề xuất chủ trì thay đổi | NTH (người đề nghị) | F30.01 |
| 2 | **Phân loại** — cấp mã thay đổi; phân loại nhóm, loại và mức tác động; chỉ định thành phần soát xét theo mục 6.3.1 | QLCL | F30.01 |
| 3 | **Đánh giá tác động** — xác định đối tượng chịu ảnh hưởng, hành động bắt buộc, nguồn lực, cửa sổ triển khai, phương án quay lui, tiêu chí xác nhận hiệu lực; mở rủi ro tại ETV.P01 | CTTĐ | F30.02 |
| 4 | **Chuyển soát xét** khi F30.02 đã đủ nội dung theo mức tác động | CTTĐ | F30.02 |
| 5 | **Soát xét** — kiểm tra đánh giá tác động đầy đủ, không bỏ sót đối tượng, phương án quay lui khả thi, tiêu chí xác nhận hiệu lực đo được. Đạt → chuyển Chờ phê duyệt; Không đạt → **Không soát xét** (bắt buộc ghi lý do) | LĐP/QLCL/chuyên gia (≠ người đề nghị) | F30.02 |
| 6 | **Trình phê duyệt** — trình cấp có thẩm quyền theo mục 6.2.2 | QLCL | F30.02 |
| 7 | **Phê duyệt** — phê duyệt kèm cửa sổ triển khai và ngày hiệu lực; Không đạt → **Không phê duyệt** (bắt buộc ghi lý do). Hệ thống chặn phê duyệt nếu vi phạm mục 6.4.4 | QLCL (Mức 1) · **LĐV** (Mức 2, 3) | F30.02 |
| 8 | **Triển khai** — thực hiện trong cửa sổ đã phê duyệt; phổ biến/đào tạo trước ngày hiệu lực; ghi nhật ký triển khai | CTTĐ, LĐP, QTHT | F30.01 · F30.03 |
| 9 | **Xác nhận hiệu lực** — lập biên bản sau khi thay đổi đã vận hành đủ thời gian quan sát (mục 6.5.2) | CTTĐ | F30.03 |
| 10 | **Đóng thay đổi** khi kết luận PIR là **Đạt**; nếu **Không đạt** → xử lý theo mục 6.5.4 | QLCL (Mức 1) · **LĐV** (Mức 2, 3) | F30.01 · F30.03 |

Trạng thái tương ứng từng bước và thẩm quyền thao tác xem **Phụ lục II**.

#### 6.3.1. Thành phần soát xét bắt buộc theo nội dung thay đổi

| Nội dung thay đổi | Thành phần soát xét bắt buộc bổ sung |
|---|---|
| Phương pháp, dải đo, độ không đảm bảo đo | Người phụ trách kỹ thuật lĩnh vực tương ứng; bắt buộc dẫn chiếu ETV.P08 |
| Thiết bị chính, chuẩn đo lường | Người quản lý thiết bị; bắt buộc dẫn chiếu ETV.P05 |
| Người ký kết quả, uỷ quyền kỹ thuật | QLCL; bắt buộc dẫn chiếu ETV.P03 và ETV.P11 |
| Cơ sở vật chất, điều kiện môi trường | Người phụ trách điều kiện môi trường; bắt buộc dẫn chiếu ETV.P04 |
| Phần mềm, dữ liệu, phân quyền | QTHT và người phụ trách an toàn thông tin; bắt buộc dẫn chiếu ETV.P28, ETV.P33 |
| Nền tảng số | Chủ sở hữu nền tảng; bắt buộc dẫn chiếu ETV.P35 |
| Hệ thống trí tuệ nhân tạo | Người phụ trách AI; bắt buộc có hồ sơ AIA theo ETV.P29 |
| Nhà cung cấp, nhà thầu phụ | Người phụ trách mua sắm; bắt buộc dẫn chiếu ETV.P06 |
| Sản xuất chất chuẩn | Người phụ trách sản xuất chất chuẩn; bắt buộc dẫn chiếu ETV.P19, ETV.P23 |

### 6.4. Đánh giá tác động

#### 6.4.1. Nội dung phải trả lời

| Nhóm nội dung | Câu hỏi phải trả lời |
|---|---|
| Mục đích | Thay đổi nhằm giải quyết vấn đề gì? Kết quả mong đợi đo bằng gì? |
| Đối tượng chịu ảnh hưởng | Tài liệu nào phải sửa? Nhân sự nào phải đào tạo lại? Thiết bị, phương pháp, dữ liệu, khách hàng nào bị ảnh hưởng? |
| Hiệu lực kết quả | Có ảnh hưởng kết quả **đang thực hiện** hoặc **đã phát hành** không? Nếu có → hành động theo ETV.P10, ETV.P11 |
| Phạm vi được thừa nhận | Có chạm tới phạm vi công nhận (BoA), phạm vi chỉ định hoặc phạm vi đăng ký không? |
| Năng lực | Nhân sự đã đủ năng lực thực hiện theo cách mới chưa? Cần đánh giá tay nghề lại không (ETV.P03)? |
| Dữ liệu và an toàn thông tin | Dữ liệu nào bị di chuyển, chuyển đổi định dạng, đổi quyền truy cập? Rủi ro an toàn thông tin phát sinh (ETV.P28)? |
| Khách hàng và bên quan tâm | Có nghĩa vụ thông báo khách hàng, cơ quan quản lý, tổ chức công nhận không? |
| Nguồn lực và chi phí | Nhân lực, thời gian, kinh phí, thiết bị cần huy động |
| Rủi ro | Rủi ro của **việc thực hiện** và rủi ro của **việc không thực hiện**; mã rủi ro đã mở tại ETV.P01 |
| Phương án quay lui | Điều kiện kích hoạt, các bước, người chịu trách nhiệm, thời gian dự kiến, giới hạn không thể quay lui (nếu có) |
| Tiêu chí xác nhận hiệu lực | Tiêu chí **đo được**, thời điểm và cách thu thập bằng chứng |

#### 6.4.2. Nguyên tắc không bỏ sót tài liệu

Mọi thay đổi làm sai lệch nội dung của tài liệu kiểm soát đang hiệu lực đều **bắt buộc** liệt kê tài liệu đó trong F30.02 và xử lý theo ETV.P14 (sửa đổi, ban hành lại, thu hồi bản cũ) **trước hoặc đồng thời** với ngày thay đổi có hiệu lực. Không được để tồn tại tình trạng thực tế làm một đằng, tài liệu ghi một nẻo.

#### 6.4.3. Thay đổi thuộc diện phải thông báo bên ngoài

Thay đổi thuộc các trường hợp sau **bắt buộc** rà soát nghĩa vụ thông báo; LĐV quyết định nội dung và thời hạn gửi, QLCL chuẩn bị hồ sơ và lưu bằng chứng gửi/nhận:

| Trường hợp | Đầu mối thông báo | Căn cứ |
|---|---|---|
| Thay đổi ảnh hưởng phạm vi, địa điểm, nhân sự chủ chốt, thiết bị chính thuộc phạm vi công nhận | Tổ chức công nhận (BoA) | ISO/IEC 17025 §8.2.4; quy định của tổ chức công nhận |
| Thay đổi so với hồ sơ đã đăng ký, đã chỉ định hoạt động kiểm định/hiệu chuẩn/thử nghiệm | Cơ quan quản lý nhà nước có thẩm quyền | Luật Đo lường 04/2011/QH13; NĐ 105/2016/NĐ-CP; NĐ 154/2018/NĐ-CP |
| Thay đổi so với hồ sơ đăng ký hoạt động đánh giá sự phù hợp | Cơ quan quản lý nhà nước có thẩm quyền | NĐ 107/2016/NĐ-CP và văn bản hiện hành |
| Thay đổi ảnh hưởng nội dung, thời hạn hoặc cách thức thực hiện dịch vụ đã ký kết | Khách hàng | ETV.P07; điều khoản hợp đồng |
| Thay đổi ảnh hưởng hiệu lực kết quả, chứng chỉ đã phát hành | Khách hàng và bên nhận kết quả | ETV.P10, ETV.P11 |
| Thay đổi cách xử lý dữ liệu cá nhân | Chủ thể dữ liệu và cơ quan có thẩm quyền | NĐ 13/2023/NĐ-CP; ETV.P28 |

Sau khi thay đổi phạm vi được chấp thuận, việc công bố lại năng lực thực hiện theo **ETV.P21** — thủ tục này **không** tự công bố năng lực.

#### 6.4.4. Điều kiện chặn cứng trước phê duyệt

Chi tiết 09 điều kiện chặn cứng xem **Phụ lục I**. Đây là điều kiện **chặn cứng**: hệ thống ManLab từ chối thao tác phê duyệt khi chưa đủ.

### 6.5. Triển khai và xác nhận hiệu lực

#### 6.5.1. Trong khi triển khai

- Chỉ thực hiện trong **cửa sổ triển khai** đã phê duyệt. Vượt cửa sổ phải xin gia hạn, ghi lý do.
- Ghi **nhật ký triển khai**: ai làm gì, lúc nào, kết quả từng bước, sự việc bất thường phát sinh.
- Phát hiện thay đổi gây hệ quả vượt dự kiến → **dừng ngay**, kích hoạt phương án quay lui, báo cáo cấp phê duyệt.
- Thay đổi Mức 3 gây nghi ngờ về hiệu lực kết quả đang thực hiện → **tạm dừng phát hành kết quả liên quan** cho tới khi ETV.P10 kết luận.

#### 6.5.2. Thời gian quan sát trước khi xác nhận hiệu lực

| Mức tác động | Thời gian quan sát tối thiểu |
|---|---|
| Mức 1 | Ngay sau khi triển khai xong |
| Mức 2 | 30 ngày hoặc 01 chu kỳ nghiệp vụ hoàn chỉnh, lấy mốc nào đến sau |
| Mức 3 | 90 ngày hoặc 01 chu kỳ nghiệp vụ hoàn chỉnh có bằng chứng khách quan (kết quả QC nội bộ, so sánh liên phòng, kiểm tra trung gian), lấy mốc nào đến sau |

CTTĐ có thể đề xuất rút ngắn thời gian quan sát khi có bằng chứng khách quan đầy đủ sớm hơn; cấp phê duyệt thay đổi quyết định.

#### 6.5.3. Nội dung xác nhận hiệu lực

| Nội dung | Yêu cầu |
|---|---|
| Đạt mục đích | Kết quả thực tế so với kết quả mong đợi đã ghi ở F30.02 |
| Tiêu chí đo được | Từng tiêu chí xác nhận hiệu lực: Đạt / Không đạt, kèm bằng chứng |
| Hệ quả ngoài mong muốn | Có phát sinh sự không phù hợp, khiếu nại, sai lệch kết quả không? |
| Tài liệu | Tài liệu bị ảnh hưởng đã sửa đổi, ban hành lại và thu hồi bản cũ chưa (ETV.P14)? |
| Năng lực | Nhân sự liên quan đã được phổ biến/đào tạo chưa (ETV.P03)? |
| Rủi ro | Rủi ro đã mở tại ETV.P01 nay ở trạng thái nào? |
| Bài học | Có nội dung cần ghi bài học kinh nghiệm theo ETV.P26 không? |

#### 6.5.4. Khi xác nhận hiệu lực Không đạt

| Bước | Nội dung thực hiện | Trách nhiệm | Thời hạn |
|---|---|---|---|
| 1 | Báo cáo cấp phê duyệt kết luận Không đạt | CTTĐ | **03 ngày làm việc** kể từ ngày có kết luận |
| 2 | Quyết định hướng xử lý: **quay lui** · **điều chỉnh và triển khai lại** (lập phiên bản mới của phiếu) · **chấp nhận có điều kiện** kèm hành động bổ sung và thời hạn | QLCL (Mức 1) · LĐV (Mức 2, 3) | Ngay khi nhận báo cáo |
| 3 | Lập KPH theo **ETV.P13** nếu thay đổi đã gây sự không phù hợp; thay đổi **không được đóng** trước khi KPH được xử lý | CTTĐ, QLCL | Theo ETV.P13 |
| 4 | Kích hoạt **ETV.P10** và **ETV.P11** nếu thay đổi Mức 3 thất bại và đã ảnh hưởng kết quả đã phát hành; LĐV quyết định việc thông báo khách hàng | QLCL, LĐV | Ngay |

### 6.6. Thay đổi khẩn cấp

#### 6.6.1. Điều kiện áp dụng

Chỉ áp dụng khi **đồng thời** thoả mãn: (a) không thực hiện ngay sẽ gây gián đoạn hoạt động, mất an toàn cho người, mất mát dữ liệu hoặc vi phạm nghĩa vụ pháp lý; và (b) không đủ thời gian hoàn tất trình tự tại mục 6.3.

Thay đổi khẩn cấp phải có **lệnh của LĐV** (bằng văn bản, thư điện tử hoặc phương tiện điện tử có thể truy xuất). Không cá nhân nào được tự tuyên bố tình trạng khẩn cấp.

#### 6.6.2. Trình tự hồi tố

| Bước | Nội dung thực hiện | Trách nhiệm | Thời hạn | Biểu mẫu |
|---|---|---|---|---|
| 1 | Ghi nhật ký: nội dung đã làm, ai làm, lúc nào, theo lệnh của ai | NTH, QTHT | Ngay khi thực hiện | F30.01 |
| 2 | Thông báo QLCL để mở phiếu thay đổi khẩn cấp và cấp mã | CTTĐ | **24 giờ** | F30.01 |
| 3 | Hoàn tất đánh giá tác động hồi tố; xác định hệ quả đã phát sinh; mở rủi ro tại ETV.P01 | CTTĐ | **05 ngày làm việc** | F30.02 |
| 4 | Phê duyệt hồi tố hoặc quyết định quay lui; sửa đổi tài liệu bị ảnh hưởng theo ETV.P14 | **LĐV**, QLCL | **10 ngày làm việc** | F30.02 |
| 5 | Xác nhận hiệu lực sau thay đổi như thay đổi thông thường cùng mức | CTTĐ | Theo mục 6.5.2 | F30.03 |

Thay đổi khẩn cấp **không** được dùng để né trình tự phê duyệt. Cùng một nội dung được xử lý theo diện khẩn cấp **≥ 02 lần trong 12 tháng** → QLCL lập sự không phù hợp theo ETV.P13 và đề xuất đưa nội dung đó vào Danh mục thay đổi tiêu chuẩn hoặc sửa quy trình gốc.

### 6.7. Thay đổi tiêu chuẩn

Thay đổi lặp lại, rủi ro thấp, cách làm đã chuẩn hoá được LĐV phê duyệt trước **một lần cho cả loại** và ghi vào **Danh mục thay đổi tiêu chuẩn** (phần II của F30.01). Mỗi lần thực hiện chỉ cần ghi nhật ký thực hiện, không lập phiếu đầy đủ.

Điều kiện để một loại thay đổi được đưa vào danh mục:

1. Đã thực hiện thành công **≥ 03 lần** theo trình tự thông thường, không phát sinh hệ quả ngoài mong muốn;
2. Mức tác động là **Mức 1**;
3. Có hướng dẫn thao tác chuẩn và tiêu chí kiểm tra sau thực hiện;
4. **Không** chạm tới phương pháp, người ký kết quả, phạm vi công nhận, dữ liệu khách hàng mức Hạn chế/Mật, hoặc hệ thống AI.

QLCL rà soát Danh mục thay đổi tiêu chuẩn **12 tháng/lần**; loại thay đổi phát sinh sự cố bị rút khỏi danh mục ngay và trở lại trình tự thông thường.

### 6.8. Thay đổi âm thầm

Thay đổi đã thực hiện trên thực tế mà **không có phiếu được phê duyệt**, không thuộc thay đổi tiêu chuẩn và không có lệnh khẩn cấp là **sự không phù hợp**. Khi phát hiện:

| Bước | Nội dung thực hiện | Trách nhiệm | Biểu mẫu |
|---|---|---|---|
| 1 | Lập phiếu thay đổi ở trạng thái Nháp, ghi rõ "phát hiện sau khi đã thực hiện", xác định chủ trì thay đổi | QLCL | F30.01 |
| 2 | Đánh giá **hệ quả đã phát sinh**, đặc biệt là ảnh hưởng tới hiệu lực kết quả đã phát hành trong khoảng thời gian từ khi thay đổi được thực hiện | CTTĐ | F30.02 |
| 3 | Quyết định: chấp nhận hồi tố, hoặc yêu cầu quay lui về hiện trạng trước thay đổi | **LĐV** | F30.02 |
| 4 | Lập sự không phù hợp và hành động khắc phục theo **ETV.P13**; nếu ảnh hưởng kết quả đã phát hành thì đồng thời kích hoạt **ETV.P10** và **ETV.P11** | QLCL | Theo ETV.P13 |
| 5 | Báo cáo LĐV **ngay trong ngày làm việc** để xử lý nghĩa vụ thông báo, nếu thay đổi âm thầm chạm tới phạm vi công nhận/chỉ định | QLCL | F30.02 |

### 6.9. Hỗ trợ của trợ lý AI

Trợ lý AI trên ManLab được phép: gợi ý danh sách đối tượng có khả năng chịu ảnh hưởng dựa trên liên kết dữ liệu giữa các module; phát hiện tài liệu có nội dung mâu thuẫn với thay đổi đang đề nghị; nhắc các phiếu quá hạn triển khai hoặc quá hạn xác nhận hiệu lực; soạn dự thảo nội dung phiếu.

Giới hạn của AI xem mục 5.3. Mọi gợi ý của AI phải được người có thẩm quyền xác nhận trước khi trở thành nội dung chính thức của phiếu (ETV.P29).

### 6.10. Báo cáo và xem xét

QLCL tổng hợp **06 tháng/lần** và trước mỗi cuộc họp xem xét của lãnh đạo (ETV.P17): tổng số thay đổi theo nhóm, loại và mức tác động; thay đổi đã đóng, đang triển khai, quá hạn; tỷ lệ xác nhận hiệu lực Không đạt; số lần phải kích hoạt phương án quay lui; số thay đổi khẩn cấp và lý do; số thay đổi âm thầm phát hiện trong kỳ; thay đổi đã thông báo bên ngoài và tình trạng phản hồi.

---

## VII. BIỂU MẪU ÁP DỤNG

| Mã biểu mẫu | Tên biểu mẫu | Nơi lưu bản gốc |
|---|---|---|
| **ETV.P.F 30.01** | Sổ đăng ký thay đổi và Danh mục thay đổi tiêu chuẩn | `06_SHARED_RESOURCES/01_Forms/` |
| **ETV.P.F 30.02** | Phiếu đề nghị thay đổi và đánh giá tác động | `06_SHARED_RESOURCES/01_Forms/` |
| **ETV.P.F 30.03** | Biên bản xác nhận hiệu lực sau thay đổi | `06_SHARED_RESOURCES/01_Forms/` |

Việc sửa đổi và ban hành lại tài liệu bị ảnh hưởng sử dụng bộ biểu mẫu của ETV.P14; hồ sơ đào tạo sau thay đổi sử dụng bộ biểu mẫu của ETV.P03; hồ sơ xác nhận giá trị sử dụng phương pháp sử dụng bộ biểu mẫu của ETV.P08; hồ sơ đánh giá tác động AI sử dụng biểu mẫu của ETV.P29 — **không** lập biểu mẫu mới ở thủ tục này (nguyên tắc một nơi duy nhất, ETV.P14).

---

## VIII. LƯU HỒ SƠ

Việc lập, lưu giữ, bảo quản, tra cứu, phân quyền truy cập và thanh lý hồ sơ thực hiện theo **ETV.P15 – Kiểm soát hồ sơ**; thời hạn lưu và phân quyền chi tiết theo **ETV.P.F 14.06 (Danh mục phân quyền và thời hạn lưu)**. Thủ tục này **không** quy định lại cơ chế lưu trữ, chỉ đăng ký các hồ sơ phát sinh và thời hạn đề xuất để cập nhật vào danh mục đó.

| Hồ sơ | Người lưu | Thời hạn lưu đề xuất |
|---|---|---|
| Sổ đăng ký thay đổi (F30.01) và các phiên bản | QLCL | Vĩnh viễn trên ManLab |
| Phiếu đề nghị thay đổi và đánh giá tác động (F30.02) | QLCL | 10 năm |
| Biên bản xác nhận hiệu lực sau thay đổi (F30.03) | QLCL | 10 năm |
| Nhật ký triển khai thay đổi | CTTĐ, sao gửi QLCL | 05 năm sau khi đóng |
| Lệnh thay đổi khẩn cấp của LĐV và hồ sơ hồi tố | QLCL | 10 năm |
| Danh mục thay đổi tiêu chuẩn và nhật ký thực hiện | QLCL | Vĩnh viễn trên ManLab (nhật ký 05 năm) |
| Bằng chứng thông báo tổ chức công nhận, cơ quan quản lý, khách hàng | QLCL | 10 năm |
| Nhật ký thay đổi cấu hình hệ thống thông tin | QTHT | Theo ETV.P28 |
| Báo cáo tình hình thay đổi phục vụ xem xét của lãnh đạo | QLCL | Theo ETV.P17 |

---

## IX. CÁC PHỤ LỤC

### Phụ lục I — Ma trận điều kiện chặn cứng và kiểm soát rủi ro

*(Dẫn chiếu từ mục 6.4.4 và mục 6.5. Hệ thống ManLab thực thi các điều kiện này bằng ràng buộc kỹ thuật.)*

**I.1. Chín điều kiện chặn cứng trước khi phê duyệt phiếu thay đổi**

| TT | Điều kiện | Áp dụng cho |
|---|---|---|
| 1 | Có **chủ trì thay đổi** là người cụ thể đang làm việc tại Viện | Mọi thay đổi |
| 2 | Có **đánh giá tác động** tương ứng mức và có **danh sách tài liệu bị ảnh hưởng** (kể cả khi ghi "Không có") | Mọi thay đổi |
| 3 | Có **phương án quay lui** và **tiêu chí xác nhận hiệu lực đo được** | Mức 2, Mức 3 |
| 4 | Có **≥ 01 rủi ro đã mở** tại ETV.P01 | Mức 2, Mức 3 |
| 5 | Có kế hoạch xác nhận giá trị sử dụng theo **ETV.P08** | Thay đổi chạm phương pháp, dải đo, độ không đảm bảo đo |
| 6 | Có hồ sơ năng lực theo **ETV.P03** | Thay đổi chạm người ký kết quả hoặc uỷ quyền kỹ thuật |
| 7 | Đã xác định rõ nghĩa vụ thông báo tại mục 6.4.3 | Thay đổi chạm phạm vi công nhận/chỉ định/đăng ký |
| 8 | Có hồ sơ **AIA** theo ETV.P29 | Thay đổi có thành phần AI |
| 9 | Đã dẫn chiếu hành động theo **ETV.P10/ETV.P11** | Thay đổi có khả năng ảnh hưởng kết quả đã phát hành |

**I.2. Các tình huống bị chặn hoặc phải xử lý bắt buộc**

| Tình huống | Xử lý |
|---|---|
| Triển khai thay đổi Mức 2, Mức 3 khi phiếu chưa được phê duyệt | Vi phạm nghiêm trọng; xử lý theo mục 6.8 và ETV.P13 |
| Phiếu thay đổi không có chủ trì thay đổi là người cụ thể | **Không cho lưu** |
| Đóng thay đổi khi chưa có kết luận xác nhận hiệu lực | **Chặn thao tác đóng** |
| Đóng thay đổi khi tài liệu bị ảnh hưởng chưa được sửa đổi, ban hành lại theo ETV.P14 | **Chặn thao tác đóng** |
| Đóng thay đổi khi còn KPH liên quan chưa xử lý xong (ETV.P13) | **Chặn thao tác đóng** |
| Người trực tiếp thực hiện thay đổi Mức 3 tự kết luận xác nhận hiệu lực | **Chặn cứng** |
| Trợ lý AI phân loại mức tác động, soát xét, phê duyệt hoặc kết luận xác nhận hiệu lực | **Cấm tuyệt đối** |
| Dùng diện thay đổi khẩn cấp để né trình tự phê duyệt; cùng nội dung khẩn cấp ≥ 02 lần/12 tháng | Lập KPH theo ETV.P13 |
| Thay đổi khẩn cấp quá 10 ngày làm việc chưa hoàn tất hồ sơ hồi tố | Cảnh báo LĐV; đưa vào báo cáo xem xét của lãnh đạo |
| Đưa vào Danh mục thay đổi tiêu chuẩn loại thay đổi chạm phương pháp, người ký kết quả, phạm vi công nhận, dữ liệu Hạn chế/Mật hoặc hệ thống AI | **Không cho phép** |
| Tái sử dụng mã thay đổi của phiếu đã Hủy/Không phê duyệt | **Không cho phép** |
| Thay đổi Mức 3 gây nghi ngờ hiệu lực kết quả mà vẫn tiếp tục phát hành kết quả liên quan trước khi ETV.P10 kết luận | **Không chấp nhận** |
| Thay đổi chạm phạm vi công nhận/chỉ định đã triển khai mà chưa thông báo | Báo cáo LĐV ngay trong ngày làm việc |

### Phụ lục II — Bảng trạng thái và thẩm quyền thao tác

*(Dẫn chiếu từ mục 6.3. Tên trạng thái tuân theo bộ trạng thái chuẩn tại ETV.P14 và `M14_TaiLieu/07_Workflow/StateMachine.md`; các trạng thái riêng của quy trình thay đổi được mở rộng và ghi rõ dưới đây.)*

**II.1. Phiếu thay đổi (F30.01)**

| TT | Trạng thái | Ý nghĩa | Người thao tác | Bắt buộc lý do |
|---|---|---|---|---|
| 1 | Nháp | Đang soạn đề nghị | NTH (người đề nghị) | Không |
| 2 | Chờ phân loại | Chờ QLCL cấp mã và phân mức | NTH | Không |
| 3 | Đánh giá tác động | Đang lập F30.02 | CTTĐ | Không |
| 4 | Chờ soát xét | Chờ kiểm tra nội dung và tính đầy đủ | CTTĐ | Không |
| 5 | Không soát xét | Bị trả lại để bổ sung | LĐP/QLCL/chuyên gia (≠ người đề nghị) | **Có** |
| 6 | Chờ phê duyệt | Chờ cấp có thẩm quyền | QLCL | Không |
| 7 | Không phê duyệt | Bị từ chối | QLCL (Mức 1) · LĐV (Mức 2, 3) | **Có** |
| 8 | Đã phê duyệt | Được chấp thuận, chờ tới cửa sổ triển khai | QLCL (Mức 1) · LĐV (Mức 2, 3) | Không |
| 9 | Đang triển khai | Đang thực hiện trong cửa sổ đã duyệt | CTTĐ | Không |
| 10 | Đã quay lui | Đã kích hoạt phương án quay lui | CTTĐ (Mức 1, 2) · LĐV (Mức 3) | **Có** |
| 11 | Chờ xác nhận hiệu lực | Đã triển khai, đang trong thời gian quan sát | CTTĐ | Không |
| 12 | Đã đóng | PIR kết luận Đạt và đã xử lý xong mọi hành động kèm theo | QLCL (Mức 1) · LĐV (Mức 2, 3) | Không |
| 13 | Hủy | Bỏ đề nghị trước khi triển khai | NTH (trước bước 6) · LĐV (sau bước 6) | **Có** |

Cờ **Quá hạn triển khai** và cờ **Quá hạn xác nhận hiệu lực** không phải trạng thái hồ sơ, mà là cảnh báo tính theo cửa sổ triển khai và mục 6.5.2.

**II.2. Các đối tượng khác**

| Đối tượng | Chuỗi trạng thái | Thẩm quyền kết thúc |
|---|---|---|
| Đánh giá tác động (F30.02) | Nháp → Chờ soát xét → Đã soát xét / Trả lại bổ sung | LĐP/QLCL/chuyên gia soát xét |
| Xác nhận hiệu lực sau thay đổi (F30.03) | Nháp → Chờ kết luận → Đạt / Không đạt | QLCL (Mức 1) · LĐV (Mức 2, 3) |
| Danh mục thay đổi tiêu chuẩn (phần II của F30.01) | Nháp → Chờ phê duyệt → Hiệu lực → Rút khỏi danh mục | LĐV |

Mọi nhánh **Hủy**, **Không phê duyệt**, **Không soát xét**, **Đã quay lui** bắt buộc ghi lý do.
