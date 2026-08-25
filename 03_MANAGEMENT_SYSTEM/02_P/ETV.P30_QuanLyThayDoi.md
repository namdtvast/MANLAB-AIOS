---
doc_id: ETV.P30
doc_name: Thủ tục Quản lý thay đổi
doc_status: Cho-soat-xet
doc_version: 01
issued_date: 2026-08-25
responsibility:
  author: Dương Thành Nam
  reviewer: Đỗ Văn Vinh
  approver: Nguyễn Hoàng Giang
applicable_standard:
  - ISO 9001:2015
  - ISO/IEC 17025:2017
  - ISO 17034:2016
  - ISO/IEC 27001:2022
  - ISO/IEC 42001:2023
---

# THỦ TỤC QUẢN LÝ THAY ĐỔI

**Procedure For Change Management**

**Mã số:** ETV.MP 30  
**Lần ban hành:** 01  
**Ngày ban hành:** ..../..../........

## THEO DÕI SỬA ĐỔI TÀI LIỆU

| Ngày soát xét | Lý do soát xét, ban hành lại | Lần ban hành |
|---|---|---|
| 25/08/2026 | Dự thảo lần đầu, trình soát xét (chưa ban hành) | 01 |

---

## 1. MỤC ĐÍCH, PHẠM VI ÁP DỤNG

### 1.1. Mục đích

Thủ tục này quy định thống nhất cách thức **đề nghị, đánh giá tác động, phê duyệt, triển khai, xác nhận hiệu lực và đóng** mọi thay đổi có ảnh hưởng tới hệ thống quản lý và hoạt động chuyên môn của Viện ETV, cụ thể để:

- Bảo đảm mọi thay đổi đối với hệ thống quản lý được **hoạch định trước**, không thực hiện tự phát, và luôn xem xét mục đích thay đổi cùng hệ quả tiềm ẩn (ISO 9001 §6.3; ISO/IEC 17025 §8.2.4; ISO 17034 §8.2.4; ISO/IEC 27001 §6.3)
- Bảo đảm thay đổi về **nhân sự, thiết bị, phương pháp, cơ sở vật chất, phần mềm, dữ liệu và nhà cung cấp** không làm mất hiệu lực kết quả kiểm định, hiệu chuẩn, thử nghiệm, sản xuất chất chuẩn đã và đang thực hiện
- Bảo đảm thay đổi ảnh hưởng tới **phạm vi công nhận, phạm vi chỉ định, phạm vi đăng ký** được thông báo tới tổ chức công nhận và cơ quan quản lý nhà nước đúng nghĩa vụ, đúng thời hạn
- Bảo đảm mỗi thay đổi đều có **người chịu trách nhiệm, phương án quay lui, tiêu chí xác nhận hiệu lực** và bằng chứng đóng thay đổi có thể truy xuất
- Ngăn tình trạng **thay đổi âm thầm** — sửa quy trình, đổi cấu hình phần mềm, thay hóa chất/chuẩn, đổi người ký kết quả mà không ai đánh giá tác động
- Cung cấp **sổ đăng ký thay đổi (Change Register)** làm nguồn dữ liệu chung cho quản lý rủi ro (ETV.MP01), đánh giá nội bộ (ETV.MP16) và xem xét của lãnh đạo (ETV.MP17)

### 1.2. Phạm vi áp dụng

Áp dụng cho toàn bộ đơn vị, phòng ban, cá nhân thuộc Viện ETV và cho **mọi thay đổi có chủ đích** thuộc các nhóm sau:

| Nhóm thay đổi | Ví dụ |
|---|---|
| Hệ thống quản lý | Sửa đổi Sổ tay chất lượng, ban hành lại thủ tục, thay đổi cơ cấu tổ chức, thay đổi phân công trách nhiệm |
| Nhân sự | Bổ nhiệm/thay người ký kết quả, thay đổi người được ủy quyền phê duyệt, thay đổi người thực hiện phép đo đã được đánh giá tay nghề |
| Phương pháp và kỹ thuật | Áp dụng phiên bản mới của tiêu chuẩn, đổi phương pháp, mở rộng/thu hẹp dải đo, đổi công thức tính độ không đảm bảo đo |
| Thiết bị và chuẩn đo lường | Thay thiết bị chính, đổi chuẩn/mẫu chuẩn tham chiếu, đổi tổ chức hiệu chuẩn bên ngoài, di chuyển thiết bị |
| Cơ sở vật chất và môi trường | Chuyển địa điểm phòng thí nghiệm, cải tạo mặt bằng, thay đổi hệ thống điều hòa/thông gió ảnh hưởng điều kiện môi trường |
| Phần mềm, dữ liệu, nền tảng số | Nâng cấp ManLab, đổi cấu trúc dữ liệu, đổi phân quyền diện rộng, đổi nhà cung cấp dịch vụ đám mây |
| Trí tuệ nhân tạo | Đổi mô hình, nâng mức quyền hành động của tác tử, mở rộng đối tượng chịu tác động |
| Nhà cung cấp và dịch vụ bên ngoài | Đổi nhà thầu phụ thực hiện phép thử, đổi nhà cung cấp hóa chất/chuẩn có ảnh hưởng kỹ thuật |
| Phạm vi hoạt động | Bổ sung/rút phép thử khỏi phạm vi công nhận, thay đổi phạm vi chỉ định, thay đổi phạm vi đăng ký hoạt động |

Dữ liệu được quản lý thống nhất trên phần mềm ManLab (Module M30 – Quản lý thay đổi).

### 1.3. Nguyên tắc "không thay đổi trước khi đánh giá tác động"

Thay đổi thuộc **Mức 2** và **Mức 3** (mục 5.2) **chỉ được triển khai sau khi** phiếu thay đổi đã được phê duyệt. Việc đã "làm rồi mới ghi hồ sơ" là **không phù hợp**, trừ **thay đổi khẩn cấp** theo mục 5.6 — và ngay cả trường hợp này vẫn phải hoàn tất hồ sơ hồi tố trong thời hạn quy định.

Sổ đăng ký thay đổi là **sổ đăng ký (register)**, **không phải kho tài liệu**. Phiếu thay đổi chỉ lưu **thông tin định danh thay đổi, đánh giá tác động, quyết định phê duyệt, kết quả xác nhận hiệu lực** và **đường dẫn** tới nội dung gốc: tài liệu được sửa lưu theo ETV.MP14, hồ sơ xác nhận giá trị sử dụng phương pháp lưu theo ETV.MP08, hồ sơ thiết bị lưu theo ETV.MP05.

### 1.4. Ngoài phạm vi

Thủ tục này **không** thay thế và **không** trùng lặp với:

| Nội dung | Thuộc thủ tục |
|---|---|
| Sự cố, hỏng hóc, sai lệch **ngoài ý muốn** (không phải thay đổi có chủ đích) | ETV.MP13 – Khắc phục, cải tiến · ETV.MP28 – An toàn thông tin |
| Gián đoạn hoạt động và phương án khôi phục | ETV.MP31 – Quản lý tính liên tục hoạt động |
| Thể thức, mã hóa, phiên bản, hiệu lực, phân phối và thu hồi tài liệu bị sửa đổi | ETV.MP14 – Kiểm soát tài liệu |
| Xác nhận giá trị sử dụng của phương pháp mới hoặc phương pháp đã sửa đổi | ETV.MP08 – Lựa chọn, kiểm tra xác nhận và xác nhận giá trị sử dụng phương pháp |
| Đánh giá tay nghề, ủy quyền kỹ thuật, đào tạo nhân sự sau thay đổi | ETV.MP03 – Quản lý nhân sự |
| Hồ sơ thiết bị, hiệu chuẩn, kiểm tra trung gian sau khi thay/di chuyển thiết bị | ETV.MP05 – Quản lý thiết bị |
| Đánh giá và lựa chọn nhà cung cấp mới | ETV.MP06 – Quản lý mua sắm |
| Xử lý kết quả đã phát hành bị ảnh hưởng bởi thay đổi | ETV.MP10 – Đảm bảo giá trị sử dụng kết quả · ETV.MP11 – Báo cáo kết quả |
| Đánh giá và xử lý rủi ro phát sinh từ thay đổi | ETV.MP01 – Rủi ro và cơ hội |
| Biện pháp kỹ thuật an toàn thông tin khi thay đổi hệ thống | ETV.MP28 – Quản lý an toàn thông tin |
| Đăng ký, phê duyệt vận hành và ngừng vận hành nền tảng số | ETV.MP35 – Quản lý nền tảng số |
| Đánh giá tác động AI (AIA), kiểm thử chất lượng hệ thống AI | ETV.MP29 – Quản lý hệ thống trí tuệ nhân tạo |
| Sáng kiến, lộ trình và danh mục đầu tư chuyển đổi số | ETV.MP32 – Chuyển đổi số và cải tiến hệ thống |
| Công bố lại năng lực sau khi thay đổi phạm vi được chấp thuận | ETV.MP21 – Công bố và kiểm soát năng lực |

> **Phân biệt cốt lõi:** ETV.MP30 xử lý **cái Viện chủ động làm khác đi**; ETV.MP13 xử lý **cái đã xảy ra sai**; ETV.MP31 xử lý **cái làm Viện không hoạt động được**. Một sự việc có thể kích hoạt cả ba, nhưng mỗi thủ tục giữ đúng vai của mình.

---

## 2. THUẬT NGỮ, ĐỊNH NGHĨA VÀ CHỮ VIẾT TẮT

### 2.1. Thuật ngữ và định nghĩa

**Thay đổi (Change)**  
Việc chủ động làm khác đi so với hiện trạng đã được thiết lập của hệ thống quản lý hoặc hoạt động chuyên môn, do Viện quyết định thực hiện.

**Phiếu thay đổi (Change Request — RFC)**  
Hồ sơ đăng ký một thay đổi cụ thể, gồm: mã thay đổi, nội dung thay đổi, lý do, đối tượng chịu ảnh hưởng, đánh giá tác động, phương án triển khai, phương án quay lui, tiêu chí xác nhận hiệu lực và quyết định phê duyệt.

**Mã thay đổi (Change code)**  
Chuỗi định danh duy nhất toàn hệ thống của một thay đổi, dạng `CR-<năm>-<số thứ tự>` (ví dụ `CR-2026-017`). Mã thay đổi **không được tái sử dụng**.

**Mức tác động (Impact level)**  
Mức độ ảnh hưởng của thay đổi tới Viện, gồm ba mức: **Mức 1** (trong phạm vi một phòng), **Mức 2** (liên phòng hoặc ảnh hưởng hệ thống quản lý), **Mức 3** (ảnh hưởng hiệu lực kết quả, dữ liệu khách hàng, hoặc phạm vi công nhận/chỉ định).

**Loại thay đổi (Change type)**  
Cách thức xử lý thay đổi, gồm ba loại: **Thay đổi tiêu chuẩn** (đã được phê duyệt trước theo danh mục), **Thay đổi thông thường** (theo trình tự đầy đủ), **Thay đổi khẩn cấp** (triển khai trước, hoàn tất hồ sơ hồi tố).

**Thay đổi tiêu chuẩn (Standard change)**  
Thay đổi lặp lại, đã biết rõ rủi ro, được LĐV phê duyệt trước một lần cho cả loại và ghi trong Danh mục thay đổi tiêu chuẩn; mỗi lần thực hiện chỉ cần ghi nhật ký, không lập phiếu đầy đủ.

**Đánh giá tác động (Impact assessment)**  
Việc xác định thay đổi ảnh hưởng tới những đối tượng nào (tài liệu, nhân sự, thiết bị, phương pháp, dữ liệu, khách hàng, phạm vi công nhận), mức độ ảnh hưởng và các hành động bắt buộc kèm theo.

**Phương án quay lui (Rollback plan)**  
Cách thức đưa hệ thống trở lại hiện trạng trước thay đổi khi thay đổi thất bại, gồm điều kiện kích hoạt, các bước thực hiện, người chịu trách nhiệm và thời gian dự kiến.

**Cửa sổ triển khai (Change window)**  
Khoảng thời gian được phê duyệt để thực hiện thay đổi, chọn sao cho ít ảnh hưởng nhất tới hoạt động cung cấp dịch vụ.

**Xác nhận hiệu lực sau thay đổi (Post-implementation review — PIR)**  
Việc kiểm tra, sau khi thay đổi đã triển khai, rằng thay đổi đạt được mục đích đặt ra và **không** gây hệ quả ngoài mong muốn; kết luận PIR là điều kiện để đóng thay đổi.

**Thay đổi âm thầm (Unauthorised change)**  
Thay đổi đã được thực hiện trên thực tế nhưng không có phiếu thay đổi được phê duyệt và không thuộc diện thay đổi tiêu chuẩn hay khẩn cấp.

**Người đề nghị thay đổi (Change Requester)**  
Cá nhân phát hiện nhu cầu và lập phiếu thay đổi.

**Chủ trì thay đổi (Change Owner)**  
Trưởng phòng hoặc người phụ trách lĩnh vực chịu trách nhiệm về việc thay đổi được triển khai đúng, đủ và được xác nhận hiệu lực.

### 2.2. Chữ viết tắt

| Chữ viết tắt | Ý nghĩa |
|---|---|
| LĐV | Lãnh đạo Viện |
| QLCL | Phụ trách Quản lý chất lượng |
| QTHT | Quản trị hệ thống |
| TP | Trưởng phòng/Người phụ trách lĩnh vực |
| CTTĐ | Chủ trì thay đổi |
| RFC | Phiếu đề nghị thay đổi |
| PIR | Xác nhận hiệu lực sau thay đổi |
| AIA | Đánh giá tác động hệ thống trí tuệ nhân tạo |
| BoA | Văn phòng Công nhận Chất lượng |

---

## 3. TÀI LIỆU VIỆN DẪN

### 3.1. Tiêu chuẩn quốc tế

- **ISO 9001:2015** (Điều 6.3 Hoạch định thay đổi; 8.1 Hoạch định và kiểm soát vận hành; 8.3.6 Thay đổi thiết kế và phát triển; 8.5.6 Kiểm soát thay đổi; 9.3 Xem xét của lãnh đạo)
- **ISO/IEC 17025:2017** (Điều 6.2 Nhân sự; 6.3 Cơ sở vật chất và điều kiện môi trường; 6.4 Thiết bị; 6.6 Sản phẩm và dịch vụ do bên ngoài cung cấp; 7.2 Lựa chọn, kiểm tra xác nhận và xác nhận giá trị sử dụng phương pháp; 7.8 Báo cáo kết quả; 7.11 Kiểm soát dữ liệu và quản lý thông tin; 8.2.4 Thay đổi hệ thống quản lý; 8.5 Hành động giải quyết rủi ro và cơ hội)
- **ISO 17034:2016** (Điều 7.4 Kiểm soát dữ liệu; 7.6 Quá trình sản xuất mẫu chuẩn; 8.2.4 Thay đổi hệ thống quản lý)
- **ISO/IEC 27001:2022** (Điều 6.3 Hoạch định thay đổi; 8.1 Hoạch định và kiểm soát vận hành; A.8.32 Quản lý thay đổi; A.8.31 Tách biệt môi trường phát triển, thử nghiệm và sản xuất; A.8.9 Quản lý cấu hình)
- **ISO/IEC 42001:2023** (Điều 6.1 Hành động giải quyết rủi ro và cơ hội; 8.1 Kiểm soát vận hành hệ thống AI; 8.4 Quản lý bên thứ ba)

### 3.2. Văn bản pháp luật

*(Chỉ dẫn chiếu — không chép nội dung. Bản đầy đủ lưu tại `08_KNOWLEDGE_GRAPH/01_Regulations/`. QLCL rà soát hiệu lực và văn bản thay thế trước mỗi lần ban hành lại.)*

- **Luật Đo lường số 04/2011/QH13** — điều kiện hoạt động của tổ chức kiểm định, hiệu chuẩn, thử nghiệm phương tiện đo, chuẩn đo lường
- **Nghị định 105/2016/NĐ-CP** và **Nghị định 154/2018/NĐ-CP** — điều kiện, đăng ký và chỉ định hoạt động kiểm định, hiệu chuẩn, thử nghiệm; **nghĩa vụ thông báo khi có thay đổi** so với hồ sơ đã đăng ký, đã chỉ định
- **Nghị định 107/2016/NĐ-CP** (và văn bản sửa đổi, bổ sung hiện hành) — điều kiện kinh doanh dịch vụ đánh giá sự phù hợp; nghĩa vụ báo cáo khi thay đổi
- **Luật Giao dịch điện tử số 20/2023/QH15** — giá trị pháp lý của thông điệp dữ liệu và chữ ký điện tử dùng trong phê duyệt thay đổi
- **Nghị định 30/2020/NĐ-CP** — công tác văn thư đối với văn bản ban hành kèm theo thay đổi

### 3.3. Văn bản nội bộ Viện ETV

- Sổ tay quản lý chất lượng (ETV.QM)
- Thủ tục ETV.MP01 – Quản lý rủi ro và cơ hội
- Thủ tục ETV.MP03 – Quản lý nhân sự
- Thủ tục ETV.MP05 – Quản lý thiết bị
- Thủ tục ETV.MP06 – Quản lý mua sắm
- Thủ tục ETV.MP08 – Lựa chọn, kiểm tra xác nhận và xác nhận giá trị sử dụng phương pháp
- Thủ tục ETV.MP10 – Đảm bảo giá trị sử dụng kết quả
- Thủ tục ETV.MP11 – Báo cáo kết quả
- Thủ tục ETV.MP13 – Khắc phục, cải tiến
- Thủ tục ETV.MP14 – Kiểm soát tài liệu
- Thủ tục ETV.MP15 – Kiểm soát hồ sơ
- Thủ tục ETV.MP16 – Đánh giá nội bộ
- Thủ tục ETV.MP17 – Xem xét của lãnh đạo
- Thủ tục ETV.MP21 – Công bố và kiểm soát năng lực
- Thủ tục ETV.MP26 – Quản lý tri thức tổ chức
- Thủ tục ETV.MP27 – Quản trị dữ liệu và tài sản thông tin
- Thủ tục ETV.MP28 – Quản lý an toàn thông tin
- Thủ tục ETV.MP29 – Quản lý hệ thống trí tuệ nhân tạo
- Thủ tục ETV.MP31 – Quản lý tính liên tục hoạt động
- Thủ tục ETV.MP32 – Chuyển đổi số và cải tiến hệ thống
- Thủ tục ETV.MP33 – Quản lý hệ thống thông tin
- Thủ tục ETV.MP35 – Quản lý nền tảng số

---

## 4. TRÁCH NHIỆM

### 4.1. Lãnh đạo Viện (LĐV)

- **Phê duyệt** thay đổi Mức 2 và Mức 3; phê duyệt Danh mục thay đổi tiêu chuẩn
- Quyết định việc thông báo tới tổ chức công nhận, cơ quan quản lý nhà nước và khách hàng khi thay đổi thuộc diện phải thông báo (mục 5.4.3)
- Phê duyệt hồi tố đối với thay đổi khẩn cấp (mục 5.6); quyết định xử lý đối với thay đổi âm thầm (mục 5.8)
- Quyết định dừng thay đổi và kích hoạt phương án quay lui khi thay đổi thất bại ở Mức 3
- Xem xét tình hình thay đổi trong cuộc họp xem xét của lãnh đạo (ETV.MP17)

### 4.2. Phụ trách Quản lý chất lượng (QLCL)

- Quản trị Sổ đăng ký thay đổi (F30.01); cấp mã thay đổi; duy trì Danh mục thay đổi tiêu chuẩn
- **Phân loại sơ bộ** mức tác động và loại thay đổi; chỉ định thành phần soát xét theo mục 5.3.2
- Kiểm tra tính đầy đủ của đánh giá tác động (F30.02) trước khi trình LĐV
- Theo dõi thay đổi **quá hạn triển khai**, thay đổi **đã triển khai nhưng chưa xác nhận hiệu lực**; báo cáo LĐV
- Phối hợp ETV.MP14 bảo đảm tài liệu bị ảnh hưởng được sửa đổi, ban hành lại và thu hồi bản cũ
- **Phê duyệt** thay đổi Mức 1
- Tổng hợp báo cáo thay đổi phục vụ xem xét của lãnh đạo; lưu trữ hồ sơ theo ETV.MP15

### 4.3. Chủ trì thay đổi (CTTĐ)

- Chịu trách nhiệm về **nội dung kỹ thuật** của thay đổi và tính đầy đủ của đánh giá tác động
- Lập phương án triển khai, phương án quay lui và tiêu chí xác nhận hiệu lực
- Tổ chức triển khai trong cửa sổ đã phê duyệt; quyết định kích hoạt quay lui ở Mức 1, Mức 2
- Chủ trì xác nhận hiệu lực sau thay đổi (F30.03) và đề nghị đóng thay đổi
- Bảo đảm nhân sự liên quan được phổ biến, đào tạo về thay đổi **trước khi** thay đổi có hiệu lực

### 4.4. Trưởng phòng/Người phụ trách lĩnh vực (TP)

- **Soát xét** phiếu thay đổi thuộc lĩnh vực mình phụ trách; nêu rõ ảnh hưởng tới hoạt động của phòng
- Bố trí nguồn lực triển khai thay đổi đã được phê duyệt
- Báo cáo QLCL khi phát hiện thay đổi âm thầm trong phạm vi quản lý

### 4.5. Quản trị hệ thống (QTHT)

- Vận hành ManLab Module M30; bảo đảm phân quyền theo vai trò và ghi nhật ký thao tác
- Thực hiện thay đổi kỹ thuật trên hệ thống thông tin theo phiếu đã phê duyệt; ghi nhật ký thay đổi cấu hình
- **Từ chối** thực hiện thay đổi kỹ thuật khi chưa có phiếu thay đổi được phê duyệt, trừ trường hợp khẩn cấp có lệnh của LĐV

### 4.6. Nhân viên

- Đề nghị thay đổi khi phát hiện nhu cầu; **không** tự ý thay đổi cách làm đã được quy định
- Thực hiện đúng nội dung đã thay đổi kể từ ngày thay đổi có hiệu lực
- Báo cáo CTTĐ khi phát hiện hệ quả ngoài mong muốn sau khi thay đổi được triển khai

> **Nguyên tắc tách vai trò:** Người đề nghị ≠ người soát xét ≠ người phê duyệt. Người xác nhận hiệu lực sau thay đổi **không** đồng thời là người trực tiếp thực hiện thay đổi đó ở Mức 3. Trợ lý AI **không** được phê duyệt thay đổi, **không** được kết luận xác nhận hiệu lực và **không** được tự thực hiện thay đổi trên hệ thống vận hành (ISO/IEC 42001; ETV.MP29).

---

## 5. NỘI DUNG

### 5.1. Sổ đăng ký thay đổi (Biểu mẫu F30.01)

#### 5.1.1. Nội dung tối thiểu của một bản ghi

| Nhóm | Trường bắt buộc |
|---|---|
| Định danh | Mã thay đổi, tiêu đề, ngày đề nghị, người đề nghị, chủ trì thay đổi |
| Phân loại | Nhóm thay đổi (theo mục 1.2), loại thay đổi, mức tác động |
| Nội dung | Hiện trạng, nội dung thay đổi, lý do, kết quả mong đợi |
| Tác động | Danh sách đối tượng chịu ảnh hưởng, hành động bắt buộc kèm theo, mã rủi ro mở tại ETV.MP01 |
| Triển khai | Cửa sổ triển khai, người thực hiện, phương án quay lui, ngày hiệu lực |
| Xác nhận | Tiêu chí xác nhận hiệu lực, ngày PIR, kết luận PIR |
| Quyết định | Người soát xét, người phê duyệt, ngày phê duyệt, lý do (nếu không phê duyệt) |
| Liên kết | Đường dẫn tới tài liệu bị sửa (MP14), hồ sơ kỹ thuật liên quan, phiếu KPH (MP13) nếu có |

#### 5.1.2. Mã thay đổi

Mã thay đổi do QLCL cấp, **duy nhất toàn hệ thống**, dạng `CR-<năm>-<số thứ tự 3 chữ số>`. Mã của thay đổi đã Hủy hoặc Không phê duyệt **không được cấp lại** — nhằm giữ nguyên giá trị truy vết của nhật ký lịch sử.

### 5.2. Phân mức tác động

#### 5.2.1. Thang mức tác động

| Mức | Tiêu chí nhận diện (thỏa **bất kỳ** tiêu chí nào thì xếp vào mức đó) | Ví dụ |
|---|---|---|
| **Mức 1** | Ảnh hưởng giới hạn trong **một phòng**; không đụng tới phương pháp, thiết bị chính, dữ liệu khách hàng, tài liệu hệ thống | Sửa mô tả công việc nội bộ, đổi vị trí lưu hồ sơ trong phòng, đổi biểu mẫu ghi chép không kiểm soát |
| **Mức 2** | Ảnh hưởng **từ hai phòng trở lên**; sửa đổi tài liệu hệ thống quản lý; đổi phân công trách nhiệm; nâng cấp phần mềm dùng chung; đổi nhà cung cấp có ảnh hưởng kỹ thuật | Ban hành lại một thủ tục, đổi cơ cấu tổ chức, nâng cấp ManLab, đổi tổ chức hiệu chuẩn bên ngoài |
| **Mức 3** | Có khả năng ảnh hưởng tới **hiệu lực kết quả đã hoặc đang phát hành**; ảnh hưởng **dữ liệu khách hàng** mức Hạn chế/Mật; thay đổi **phạm vi công nhận/chỉ định/đăng ký**; thay đổi **người ký kết quả**; thay đổi **phương pháp, dải đo, công thức tính độ không đảm bảo đo** | Áp dụng phiên bản mới của tiêu chuẩn phép thử, thay thiết bị chính, chuyển địa điểm phòng thí nghiệm, đổi mô hình AI tham gia xử lý dữ liệu đo |

Khi có nghi ngờ giữa hai mức, **xếp vào mức cao hơn**. QLCL phân loại sơ bộ; LĐV có quyền nâng mức.

#### 5.2.2. Yêu cầu bắt buộc theo mức

| Yêu cầu | Mức 1 | Mức 2 | Mức 3 |
|---|---|---|---|
| Lập phiếu thay đổi (F30.01) | Có | Có | Có |
| Đánh giá tác động đầy đủ (F30.02) | Rút gọn | **Có** | **Có** |
| Mở rủi ro tại ETV.MP01 | Khi có rủi ro | **Bắt buộc ≥ 01 rủi ro** | **Bắt buộc ≥ 01 rủi ro** |
| Phương án quay lui | Khuyến nghị | **Bắt buộc** | **Bắt buộc, đã thử nghiệm hoặc mô tả chi tiết đến bước thao tác** |
| Người soát xét | TP (≠ người đề nghị) | TP liên quan + QLCL | TP liên quan + QLCL + chuyên gia kỹ thuật lĩnh vực |
| Người phê duyệt | **QLCL** | **LĐV** | **LĐV** |
| Phổ biến/đào tạo trước hiệu lực | Khi cần | **Bắt buộc** | **Bắt buộc, có hồ sơ theo ETV.MP03** |
| Xác nhận hiệu lực sau thay đổi (F30.03) | Ghi nhận ngắn | **Bắt buộc** | **Bắt buộc, có bằng chứng khách quan** |
| Thông báo bên ngoài | Không | Khi thuộc diện | **Rà soát bắt buộc** theo mục 5.4.3 |

### 5.3. Trình tự thay đổi thông thường

#### 5.3.1. Các bước

| Bước | Trạng thái | Người thực hiện | Nội dung |
|---|---|---|---|
| 1 | Nháp | Người đề nghị | Lập phiếu: hiện trạng, nội dung thay đổi, lý do, kết quả mong đợi, đề xuất chủ trì thay đổi |
| 2 | Chờ phân loại | QLCL | Cấp mã thay đổi; phân loại nhóm, loại và mức tác động; chỉ định thành phần soát xét |
| 3 | Đánh giá tác động | CTTĐ | Lập F30.02: đối tượng chịu ảnh hưởng, hành động bắt buộc, nguồn lực, cửa sổ triển khai, phương án quay lui, tiêu chí xác nhận hiệu lực; mở rủi ro tại ETV.MP01 |
| 4 | Chờ soát xét | Người đề nghị/CTTĐ | Chuyển soát xét khi F30.02 đã đủ nội dung theo mức tác động |
| 5 | Soát xét | TP/QLCL/chuyên gia (≠ người đề nghị) | Kiểm tra: đánh giá tác động đầy đủ, không bỏ sót đối tượng, phương án quay lui khả thi, tiêu chí xác nhận hiệu lực đo được. Đạt → Chờ phê duyệt; Không đạt → **Không soát xét** (bắt buộc ghi lý do) |
| 6 | Chờ phê duyệt | QLCL | Trình cấp có thẩm quyền theo mục 5.2.2 |
| 7 | Phê duyệt | **QLCL (Mức 1) / LĐV (Mức 2, 3)** | Phê duyệt → **Đã phê duyệt** kèm cửa sổ triển khai và ngày hiệu lực; Không đạt → **Không phê duyệt** (bắt buộc ghi lý do). Hệ thống chặn phê duyệt nếu vi phạm mục 5.4.4 |
| 8 | Đang triển khai | CTTĐ, TP, QTHT | Thực hiện trong cửa sổ đã phê duyệt; phổ biến/đào tạo trước ngày hiệu lực; ghi nhật ký triển khai |
| 9 | Chờ xác nhận hiệu lực | CTTĐ | Lập F30.03 sau khi thay đổi đã vận hành đủ thời gian quan sát (mục 5.5.2) |
| 10 | Đã đóng | QLCL (Mức 1) / LĐV (Mức 2, 3) | Đóng thay đổi khi kết luận PIR là **Đạt**; nếu **Không đạt** → xử lý theo mục 5.5.4 |

#### 5.3.2. Thành phần soát xét bắt buộc theo nội dung thay đổi

| Nội dung thay đổi | Thành phần soát xét bắt buộc bổ sung |
|---|---|
| Phương pháp, dải đo, độ không đảm bảo đo | Người phụ trách kỹ thuật lĩnh vực tương ứng; bắt buộc dẫn chiếu ETV.MP08 |
| Thiết bị chính, chuẩn đo lường | Người quản lý thiết bị; bắt buộc dẫn chiếu ETV.MP05 |
| Người ký kết quả, ủy quyền kỹ thuật | QLCL; bắt buộc dẫn chiếu ETV.MP03 và ETV.MP11 |
| Cơ sở vật chất, điều kiện môi trường | Người phụ trách điều kiện môi trường; bắt buộc dẫn chiếu ETV.MP04 |
| Phần mềm, dữ liệu, phân quyền | QTHT và người phụ trách an toàn thông tin; bắt buộc dẫn chiếu ETV.MP28, ETV.MP33 |
| Nền tảng số | Chủ sở hữu nền tảng; bắt buộc dẫn chiếu ETV.MP35 |
| Hệ thống trí tuệ nhân tạo | Người phụ trách AI; bắt buộc có hồ sơ AIA theo ETV.MP29 |
| Nhà cung cấp, nhà thầu phụ | Người phụ trách mua sắm; bắt buộc dẫn chiếu ETV.MP06 |
| Sản xuất chất chuẩn | Người phụ trách sản xuất chất chuẩn; bắt buộc dẫn chiếu ETV.MP19, ETV.MP23 |

### 5.4. Đánh giá tác động (Biểu mẫu F30.02)

#### 5.4.1. Nội dung phải trả lời

| Nhóm nội dung | Câu hỏi phải trả lời |
|---|---|
| Mục đích | Thay đổi nhằm giải quyết vấn đề gì? Kết quả mong đợi đo bằng gì? |
| Đối tượng chịu ảnh hưởng | Tài liệu nào phải sửa? Nhân sự nào phải đào tạo lại? Thiết bị, phương pháp, dữ liệu, khách hàng nào bị ảnh hưởng? |
| Hiệu lực kết quả | Thay đổi có ảnh hưởng tới kết quả **đang thực hiện** hoặc **đã phát hành** không? Nếu có → hành động theo ETV.MP10, ETV.MP11 |
| Phạm vi được thừa nhận | Thay đổi có chạm tới phạm vi công nhận (BoA), phạm vi chỉ định hoặc phạm vi đăng ký không? |
| Năng lực | Nhân sự đã đủ năng lực thực hiện theo cách mới chưa? Cần đánh giá tay nghề lại không (ETV.MP03)? |
| Dữ liệu và an toàn thông tin | Dữ liệu nào bị di chuyển, chuyển đổi định dạng, đổi quyền truy cập? Rủi ro an toàn thông tin phát sinh (ETV.MP28)? |
| Khách hàng và bên quan tâm | Có nghĩa vụ thông báo khách hàng, cơ quan quản lý, tổ chức công nhận không? |
| Nguồn lực và chi phí | Nhân lực, thời gian, kinh phí, thiết bị cần huy động |
| Rủi ro | Rủi ro của **việc thực hiện** thay đổi và rủi ro của **việc không thực hiện**; mã rủi ro đã mở tại ETV.MP01 |
| Phương án quay lui | Điều kiện kích hoạt, các bước, người chịu trách nhiệm, thời gian dự kiến, giới hạn không thể quay lui (nếu có) |
| Tiêu chí xác nhận hiệu lực | Tiêu chí **đo được**, thời điểm và cách thu thập bằng chứng |

#### 5.4.2. Nguyên tắc "không bỏ sót tài liệu"

Mọi thay đổi làm sai lệch nội dung của tài liệu kiểm soát đang hiệu lực đều **bắt buộc** liệt kê tài liệu đó trong F30.02 và xử lý theo ETV.MP14 (sửa đổi, ban hành lại, thu hồi bản cũ) **trước hoặc đồng thời** với ngày thay đổi có hiệu lực. Không được để tồn tại tình trạng thực tế làm một đằng, tài liệu ghi một nẻo.

#### 5.4.3. Thay đổi thuộc diện phải thông báo bên ngoài

Thay đổi thuộc các trường hợp sau **bắt buộc** rà soát nghĩa vụ thông báo; LĐV quyết định nội dung và thời hạn gửi, QLCL chuẩn bị hồ sơ và lưu bằng chứng gửi/nhận:

| Trường hợp | Đầu mối thông báo | Căn cứ |
|---|---|---|
| Thay đổi ảnh hưởng phạm vi, địa điểm, nhân sự chủ chốt, thiết bị chính thuộc phạm vi công nhận | Tổ chức công nhận (BoA) | ISO/IEC 17025 §8.2.4; quy định của tổ chức công nhận |
| Thay đổi so với hồ sơ đã đăng ký, đã chỉ định hoạt động kiểm định/hiệu chuẩn/thử nghiệm | Cơ quan quản lý nhà nước có thẩm quyền | Luật Đo lường 04/2011/QH13; NĐ 105/2016/NĐ-CP; NĐ 154/2018/NĐ-CP |
| Thay đổi so với hồ sơ đăng ký hoạt động đánh giá sự phù hợp | Cơ quan quản lý nhà nước có thẩm quyền | NĐ 107/2016/NĐ-CP và văn bản hiện hành |
| Thay đổi ảnh hưởng nội dung, thời hạn hoặc cách thức thực hiện dịch vụ đã ký kết | Khách hàng | ETV.MP07; điều khoản hợp đồng |
| Thay đổi ảnh hưởng hiệu lực kết quả, chứng chỉ đã phát hành | Khách hàng và bên nhận kết quả | ETV.MP10, ETV.MP11 |
| Thay đổi cách xử lý dữ liệu cá nhân | Chủ thể dữ liệu và cơ quan có thẩm quyền | NĐ 13/2023/NĐ-CP; ETV.MP28 |

Sau khi thay đổi phạm vi được chấp thuận, việc công bố lại năng lực thực hiện theo **ETV.MP21** — thủ tục này **không** tự công bố năng lực.

#### 5.4.4. Điều kiện chặn cứng

Phiếu thay đổi **không được phê duyệt** nếu thiếu một trong các điều kiện sau:

1. Có **chủ trì thay đổi** là người cụ thể đang làm việc tại Viện
2. Có **đánh giá tác động** tương ứng mức tác động và có **danh sách tài liệu bị ảnh hưởng** (kể cả khi danh sách là "không có", phải ghi rõ)
3. Thay đổi **Mức 2, Mức 3** có **phương án quay lui** và **tiêu chí xác nhận hiệu lực đo được**
4. Thay đổi **Mức 2, Mức 3** có **≥ 01 rủi ro đã mở** tại ETV.MP01
5. Thay đổi chạm tới **phương pháp, dải đo, độ không đảm bảo đo** có kế hoạch xác nhận giá trị sử dụng theo **ETV.MP08**
6. Thay đổi chạm tới **người ký kết quả hoặc ủy quyền kỹ thuật** có hồ sơ năng lực theo **ETV.MP03**
7. Thay đổi chạm tới **phạm vi công nhận/chỉ định/đăng ký** đã xác định rõ nghĩa vụ thông báo tại mục 5.4.3
8. Thay đổi có thành phần **AI** có hồ sơ **AIA** theo ETV.MP29
9. Thay đổi có khả năng ảnh hưởng **kết quả đã phát hành** đã dẫn chiếu hành động theo **ETV.MP10/ETV.MP11**

Đây là điều kiện **chặn cứng**: hệ thống ManLab từ chối thao tác phê duyệt khi chưa đủ.

### 5.5. Triển khai và xác nhận hiệu lực (Biểu mẫu F30.03)

#### 5.5.1. Trong khi triển khai

- Chỉ thực hiện trong **cửa sổ triển khai** đã phê duyệt. Vượt cửa sổ phải xin gia hạn, ghi lý do.
- Ghi **nhật ký triển khai**: ai làm gì, lúc nào, kết quả từng bước, sự việc bất thường phát sinh.
- Phát hiện thay đổi gây hệ quả vượt dự kiến → **dừng ngay**, kích hoạt phương án quay lui, báo cáo cấp phê duyệt.
- Thay đổi Mức 3 gây nghi ngờ về hiệu lực kết quả đang thực hiện → **tạm dừng phát hành kết quả liên quan** cho tới khi ETV.MP10 kết luận.

#### 5.5.2. Thời gian quan sát trước khi xác nhận hiệu lực

| Mức tác động | Thời gian quan sát tối thiểu |
|---|---|
| Mức 1 | Ngay sau khi triển khai xong |
| Mức 2 | 30 ngày hoặc 01 chu kỳ nghiệp vụ hoàn chỉnh, lấy mốc nào đến sau |
| Mức 3 | 90 ngày hoặc 01 chu kỳ nghiệp vụ hoàn chỉnh có bằng chứng khách quan (kết quả QC nội bộ, so sánh liên phòng, kiểm tra trung gian), lấy mốc nào đến sau |

CTTĐ có thể đề xuất rút ngắn thời gian quan sát khi có bằng chứng khách quan đầy đủ sớm hơn; cấp phê duyệt thay đổi quyết định.

#### 5.5.3. Nội dung xác nhận hiệu lực

| Nội dung | Yêu cầu |
|---|---|
| Đạt mục đích | Kết quả thực tế so với kết quả mong đợi đã ghi ở F30.02 |
| Tiêu chí đo được | Từng tiêu chí xác nhận hiệu lực: Đạt / Không đạt, kèm bằng chứng |
| Hệ quả ngoài mong muốn | Có phát sinh sự không phù hợp, khiếu nại, sai lệch kết quả không? |
| Tài liệu | Tài liệu bị ảnh hưởng đã sửa đổi, ban hành lại và thu hồi bản cũ chưa (ETV.MP14)? |
| Năng lực | Nhân sự liên quan đã được phổ biến/đào tạo chưa (ETV.MP03)? |
| Rủi ro | Rủi ro đã mở tại ETV.MP01 nay ở trạng thái nào? |
| Bài học | Có nội dung cần ghi bài học kinh nghiệm theo ETV.MP26 không? |

#### 5.5.4. Khi xác nhận hiệu lực Không đạt

1. CTTĐ báo cáo cấp phê duyệt trong **03 ngày làm việc** kể từ ngày có kết luận
2. Cấp phê duyệt quyết định một trong ba hướng: **quay lui**, **điều chỉnh và triển khai lại** (lập phiên bản mới của phiếu), hoặc **chấp nhận có điều kiện** kèm hành động bổ sung và thời hạn
3. Trường hợp thay đổi đã gây sự không phù hợp → lập KPH theo **ETV.MP13**; thay đổi **không được đóng** trước khi KPH được xử lý
4. Trường hợp thay đổi Mức 3 thất bại và đã ảnh hưởng kết quả đã phát hành → kích hoạt **ETV.MP10** và **ETV.MP11**; LĐV quyết định việc thông báo khách hàng

### 5.6. Thay đổi khẩn cấp

#### 5.6.1. Điều kiện áp dụng

Chỉ áp dụng khi **đồng thời** thỏa mãn: (a) không thực hiện ngay sẽ gây gián đoạn hoạt động, mất an toàn cho người, mất mát dữ liệu hoặc vi phạm nghĩa vụ pháp lý; và (b) không đủ thời gian hoàn tất trình tự tại mục 5.3.

Thay đổi khẩn cấp phải có **lệnh của LĐV** (bằng văn bản, thư điện tử hoặc phương tiện điện tử có thể truy xuất). Không cá nhân nào được tự tuyên bố tình trạng khẩn cấp.

#### 5.6.2. Trình tự hồi tố

| Thời hạn | Nội dung bắt buộc |
|---|---|
| Ngay khi thực hiện | Ghi nhật ký: nội dung đã làm, ai làm, lúc nào, theo lệnh của ai |
| Trong **24 giờ** | Thông báo QLCL để mở phiếu thay đổi khẩn cấp và cấp mã |
| Trong **05 ngày làm việc** | Hoàn tất đánh giá tác động (F30.02) hồi tố; xác định hệ quả đã phát sinh; mở rủi ro tại ETV.MP01 |
| Trong **10 ngày làm việc** | LĐV phê duyệt hồi tố hoặc quyết định quay lui; sửa đổi tài liệu bị ảnh hưởng theo ETV.MP14 |
| Theo mục 5.5.2 | Xác nhận hiệu lực sau thay đổi như thay đổi thông thường cùng mức |

Thay đổi khẩn cấp **không** được dùng để né trình tự phê duyệt. Cùng một nội dung được xử lý theo diện khẩn cấp **≥ 02 lần trong 12 tháng** → QLCL lập sự không phù hợp theo ETV.MP13 và đề xuất đưa nội dung đó vào Danh mục thay đổi tiêu chuẩn hoặc sửa quy trình gốc.

### 5.7. Thay đổi tiêu chuẩn

Thay đổi lặp lại, rủi ro thấp, cách làm đã chuẩn hóa được LĐV phê duyệt trước **một lần cho cả loại** và ghi vào **Danh mục thay đổi tiêu chuẩn** (phần II của F30.01). Mỗi lần thực hiện chỉ cần ghi nhật ký thực hiện, không lập phiếu đầy đủ.

Điều kiện để một loại thay đổi được đưa vào danh mục:

1. Đã thực hiện thành công **≥ 03 lần** theo trình tự thông thường, không phát sinh hệ quả ngoài mong muốn
2. Mức tác động là **Mức 1**
3. Có hướng dẫn thao tác chuẩn và tiêu chí kiểm tra sau thực hiện
4. **Không** chạm tới phương pháp, người ký kết quả, phạm vi công nhận, dữ liệu khách hàng mức Hạn chế/Mật, hoặc hệ thống AI

QLCL rà soát Danh mục thay đổi tiêu chuẩn **12 tháng/lần**; loại thay đổi phát sinh sự cố bị rút khỏi danh mục ngay và trở lại trình tự thông thường.

### 5.8. Thay đổi âm thầm

Thay đổi đã thực hiện trên thực tế mà **không có phiếu được phê duyệt**, không thuộc thay đổi tiêu chuẩn và không có lệnh khẩn cấp là **sự không phù hợp**. Khi phát hiện:

1. QLCL lập phiếu thay đổi ở trạng thái Nháp, ghi rõ "phát hiện sau khi đã thực hiện", xác định chủ trì thay đổi
2. Đánh giá **hệ quả đã phát sinh**, đặc biệt là ảnh hưởng tới hiệu lực kết quả đã phát hành trong khoảng thời gian từ khi thay đổi được thực hiện
3. LĐV quyết định: chấp nhận hồi tố, hoặc yêu cầu quay lui về hiện trạng trước thay đổi
4. Lập sự không phù hợp và hành động khắc phục theo **ETV.MP13**; nếu ảnh hưởng kết quả đã phát hành thì đồng thời kích hoạt **ETV.MP10** và **ETV.MP11**
5. Trường hợp thay đổi âm thầm chạm tới phạm vi công nhận/chỉ định → báo cáo LĐV **ngay trong ngày làm việc** để xử lý nghĩa vụ thông báo

### 5.9. Hỗ trợ của trợ lý AI

Trợ lý AI trên ManLab được phép: gợi ý danh sách đối tượng có khả năng chịu ảnh hưởng dựa trên liên kết dữ liệu giữa các module; phát hiện tài liệu có nội dung mâu thuẫn với thay đổi đang đề nghị; nhắc các phiếu quá hạn triển khai hoặc quá hạn xác nhận hiệu lực; soạn dự thảo nội dung phiếu.

Trợ lý AI **không** được phân loại mức tác động thay cho người có thẩm quyền, **không** được soát xét, **không** được phê duyệt, **không** được kết luận xác nhận hiệu lực và **không** được tự thực hiện thay đổi trên môi trường vận hành. Mọi gợi ý của AI phải được người có thẩm quyền xác nhận trước khi trở thành nội dung chính thức của phiếu (ETV.MP29).

### 5.10. Báo cáo và xem xét

QLCL tổng hợp **06 tháng/lần** và trước mỗi cuộc họp xem xét của lãnh đạo (ETV.MP17) các nội dung: tổng số thay đổi theo nhóm, loại và mức tác động; thay đổi đã đóng, đang triển khai, quá hạn; tỷ lệ xác nhận hiệu lực Không đạt; số lần phải kích hoạt phương án quay lui; số thay đổi khẩn cấp và lý do; số thay đổi âm thầm phát hiện trong kỳ; thay đổi đã thông báo bên ngoài và tình trạng phản hồi.

---

## 6. TRẠNG THÁI VÀ THẨM QUYỀN

### 6.1. Phiếu thay đổi (F30.01)

| STT | Trạng thái | Ý nghĩa | Người thao tác | Bắt buộc lý do |
|---|---|---|---|---|
| 1 | Nháp | Đang soạn đề nghị | Người đề nghị | Không |
| 2 | Chờ phân loại | Chờ QLCL cấp mã và phân mức | Người đề nghị | Không |
| 3 | Đánh giá tác động | Đang lập F30.02 | CTTĐ | Không |
| 4 | Chờ soát xét | Chờ kiểm tra nội dung và tính đầy đủ | CTTĐ | Không |
| 5 | Không soát xét | Bị trả lại để bổ sung | TP/QLCL/chuyên gia (≠ người đề nghị) | **Có** |
| 6 | Chờ phê duyệt | Chờ cấp có thẩm quyền | QLCL | Không |
| 7 | Không phê duyệt | Bị từ chối | QLCL (Mức 1) / LĐV (Mức 2, 3) | **Có** |
| 8 | Đã phê duyệt | Được chấp thuận, chờ tới cửa sổ triển khai | QLCL (Mức 1) / LĐV (Mức 2, 3) | Không |
| 9 | Đang triển khai | Đang thực hiện trong cửa sổ đã duyệt | CTTĐ | Không |
| 10 | Đã quay lui | Đã kích hoạt phương án quay lui | CTTĐ (Mức 1, 2) / LĐV (Mức 3) | **Có** |
| 11 | Chờ xác nhận hiệu lực | Đã triển khai, đang trong thời gian quan sát | CTTĐ | Không |
| 12 | Đã đóng | PIR kết luận Đạt và đã xử lý xong mọi hành động kèm theo | QLCL (Mức 1) / LĐV (Mức 2, 3) | Không |
| 13 | Hủy | Bỏ đề nghị trước khi triển khai | Người đề nghị (trước bước 6) / LĐV (sau bước 6) | **Có** |

Cờ **Quá hạn triển khai** và cờ **Quá hạn xác nhận hiệu lực** không phải trạng thái hồ sơ, mà là cảnh báo tính theo cửa sổ triển khai và mục 5.5.2.

### 6.2. Các đối tượng khác

| Đối tượng | Chuỗi trạng thái | Thẩm quyền kết thúc |
|---|---|---|
| Đánh giá tác động (F30.02) | Nháp → Chờ soát xét → Đã soát xét / Trả lại bổ sung | TP/QLCL/chuyên gia soát xét |
| Xác nhận hiệu lực sau thay đổi (F30.03) | Nháp → Chờ kết luận → Đạt / Không đạt | QLCL (Mức 1) · LĐV (Mức 2, 3) |
| Danh mục thay đổi tiêu chuẩn (phần II của F30.01) | Nháp → Chờ phê duyệt → Hiệu lực → Rút khỏi danh mục | LĐV |

Mọi nhánh **Hủy**, **Không phê duyệt**, **Không soát xét**, **Đã quay lui** bắt buộc ghi lý do.

---

## 7. KIỂM SOÁT RỦI RO

- Triển khai thay đổi **Mức 2, Mức 3 khi phiếu chưa được phê duyệt** → vi phạm nghiêm trọng; xử lý theo mục 5.8 và ETV.MP13
- Phiếu thay đổi **không có chủ trì thay đổi** là người cụ thể → **không cho lưu**
- Thay đổi **Mức 2, Mức 3 không có phương án quay lui** hoặc **không có tiêu chí xác nhận hiệu lực đo được** → **chặn phê duyệt**
- Thay đổi **Mức 2, Mức 3 chưa mở rủi ro** tại ETV.MP01 → **chặn phê duyệt**
- Thay đổi chạm **phương pháp, dải đo, độ không đảm bảo đo** mà **chưa có kế hoạch xác nhận giá trị sử dụng** theo ETV.MP08 → **chặn phê duyệt**
- Thay đổi **người ký kết quả** mà **chưa có hồ sơ năng lực** theo ETV.MP03 → **chặn phê duyệt**
- Thay đổi chạm **phạm vi công nhận/chỉ định/đăng ký** mà **chưa xác định nghĩa vụ thông báo** → **chặn phê duyệt**; đã triển khai mà chưa thông báo → báo cáo LĐV ngay trong ngày làm việc
- Thay đổi có thành phần **AI** chưa có hồ sơ **AIA** theo ETV.MP29 → **chặn phê duyệt**
- Đóng thay đổi khi **chưa có kết luận xác nhận hiệu lực** → **chặn thao tác đóng**
- Đóng thay đổi khi **tài liệu bị ảnh hưởng chưa được sửa đổi, ban hành lại** theo ETV.MP14 → **chặn thao tác đóng**
- Đóng thay đổi khi còn **KPH liên quan chưa xử lý xong** (ETV.MP13) → **chặn thao tác đóng**
- Người **trực tiếp thực hiện** thay đổi Mức 3 **tự kết luận xác nhận hiệu lực** cho thay đổi đó → **chặn cứng**
- Trợ lý AI phân loại mức tác động, soát xét, phê duyệt hoặc kết luận xác nhận hiệu lực → **cấm tuyệt đối**
- Dùng diện **thay đổi khẩn cấp** để né trình tự phê duyệt; cùng nội dung khẩn cấp ≥ 02 lần/12 tháng → lập KPH theo ETV.MP13
- Thay đổi khẩn cấp **quá 10 ngày làm việc chưa hoàn tất hồ sơ hồi tố** → cảnh báo LĐV và đưa vào báo cáo xem xét của lãnh đạo
- Đưa vào **Danh mục thay đổi tiêu chuẩn** loại thay đổi chạm phương pháp, người ký kết quả, phạm vi công nhận, dữ liệu Hạn chế/Mật hoặc hệ thống AI → **không cho phép**
- Tái sử dụng **mã thay đổi** của phiếu đã Hủy/Không phê duyệt → **không cho phép**
- Thay đổi Mức 3 gây nghi ngờ hiệu lực kết quả mà **vẫn tiếp tục phát hành kết quả liên quan** trước khi ETV.MP10 kết luận → **không chấp nhận**

---

## 8. HƯỚNG DẪN, BIỂU MẪU ÁP DỤNG

- **ETV.P.F30.01** – Sổ đăng ký thay đổi và Danh mục thay đổi tiêu chuẩn
- **ETV.P.F30.02** – Phiếu đề nghị thay đổi và đánh giá tác động
- **ETV.P.F30.03** – Biên bản xác nhận hiệu lực sau thay đổi

Việc sửa đổi và ban hành lại tài liệu bị ảnh hưởng sử dụng bộ biểu mẫu của ETV.MP14; hồ sơ đào tạo sau thay đổi sử dụng bộ biểu mẫu của ETV.MP03; hồ sơ xác nhận giá trị sử dụng phương pháp sử dụng bộ biểu mẫu của ETV.MP08; hồ sơ đánh giá tác động AI sử dụng biểu mẫu của ETV.MP29 — **không** lập biểu mẫu mới ở thủ tục này.

---

## 9. LƯU TRỮ HỒ SƠ

| Hồ sơ | Người lưu | Thời hạn lưu |
|---|---|---|
| Sổ đăng ký thay đổi (F30.01) và các phiên bản | QLCL | Vĩnh viễn trên ManLab |
| Phiếu đề nghị thay đổi và đánh giá tác động (F30.02) | QLCL | 10 năm |
| Biên bản xác nhận hiệu lực sau thay đổi (F30.03) | QLCL | 10 năm |
| Nhật ký triển khai thay đổi | CTTĐ, sao gửi QLCL | 05 năm sau khi đóng |
| Lệnh thay đổi khẩn cấp của LĐV và hồ sơ hồi tố | QLCL | 10 năm |
| Danh mục thay đổi tiêu chuẩn và nhật ký thực hiện | QLCL | Vĩnh viễn trên ManLab (nhật ký 05 năm) |
| Bằng chứng thông báo tổ chức công nhận, cơ quan quản lý, khách hàng | QLCL | 10 năm |
| Nhật ký thay đổi cấu hình hệ thống thông tin | QTHT | Theo ETV.MP28 |
| Báo cáo tình hình thay đổi phục vụ xem xét của lãnh đạo | QLCL | Theo ETV.MP17 |

**Toàn bộ hồ sơ có liên quan được lưu trữ theo thủ tục ETV.MP15 (Kiểm soát hồ sơ) và ETV.MP14 (Kiểm soát tài liệu).**
