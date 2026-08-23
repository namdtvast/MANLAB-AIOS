---
doc_id: ETV.P28
doc_name: Thủ tục Quản lý an toàn thông tin
doc_status: issued
doc_version: 01
issued_date: 2026-08-24
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

# THỦ TỤC QUẢN LÝ AN TOÀN THÔNG TIN

**Procedure For Information Security Management**

**Mã số:** ETV.MP 28  
**Lần ban hành:** 01  
**Ngày ban hành:** 24/08/2026

## THEO DÕI SỬA ĐỔI TÀI LIỆU

| Ngày soát xét | Lý do soát xét, ban hành lại | Lần ban hành |
|---|---|---|
| 24/08/2026 | Ban hành lần thứ 01 | 01 |

---

## 1. MỤC ĐÍCH, PHẠM VI ÁP DỤNG

### 1.1. Mục đích

Thủ tục này quy định thống nhất cách thức **thiết lập, vận hành, duy trì và cải tiến Hệ thống quản lý an toàn thông tin (ISMS)** của Viện ETV, nhằm bảo đảm **tính bí mật – tính toàn vẹn – tính sẵn sàng** của thông tin và hệ thống thông tin phục vụ hoạt động kiểm định, hiệu chuẩn, thử nghiệm, quan trắc, sản xuất chất chuẩn và quản lý điều hành, cụ thể để:

- Xác định rõ **phạm vi và ranh giới** của ISMS, chính sách và mục tiêu an toàn thông tin (ISO/IEC 27001 §4, §5.2, §6.2)
- **Nhận diện, phân tích, đánh giá và xử lý rủi ro an toàn thông tin** theo phương pháp nhất quán, có thể lặp lại (ISO/IEC 27001 §6.1.2, §6.1.3, §8.2, §8.3)
- Lập, phê duyệt và duy trì **Tuyên bố áp dụng (SoA)** — văn bản bắt buộc thể hiện các kiểm soát được áp dụng, lý do áp dụng và lý do loại trừ
- Quy định các **kiểm soát vận hành** bắt buộc về định danh và truy cập, thiết bị đầu cuối, mạng, mật mã, nhật ký, nhà cung cấp và làm việc từ xa
- Quy định trình tự **phát hiện, báo cáo, xử lý và rút kinh nghiệm sự cố an toàn thông tin**, bao gồm nghĩa vụ thông báo theo pháp luật và theo hợp đồng
- **Đo lường hiệu lực** của ISMS và cung cấp đầu vào cho đánh giá nội bộ, xem xét của lãnh đạo và cải tiến liên tục
- Bảo vệ dữ liệu khách hàng và dữ liệu cá nhân, bảo đảm tính khách quan và bảo mật của hoạt động phòng thử nghiệm (ISO/IEC 17025 §4.1, §4.2)

### 1.2. Phạm vi áp dụng

Áp dụng cho toàn bộ đơn vị, phòng ban, cá nhân thuộc Viện ETV và cho mọi bên thứ ba (nhà thầu, chuyên gia, nhà cung cấp dịch vụ công nghệ thông tin) có quyền truy cập thông tin hoặc hệ thống thông tin của Viện.

Phạm vi ISMS bao trùm thông tin ở **mọi dạng thể hiện** (bản giấy, bản điện tử, hình ảnh, âm thanh, trao đổi bằng lời) và mọi **hệ thống thông tin** phục vụ hoạt động của Viện: nền tảng ManLab, hệ thống thư điện tử, kho dữ liệu dùng chung, phần mềm điều khiển/thu thập dữ liệu của thiết bị đo, thiết bị đầu cuối, hạ tầng mạng và các dịch vụ đám mây đã được phê duyệt. Dữ liệu ISMS được quản lý thống nhất trên phần mềm ManLab (Module M28 – Quản lý an toàn thông tin).

Phạm vi và ranh giới cụ thể của ISMS tại từng thời điểm được xác lập theo mục 5.1 và ghi trong **Tuyên bố áp dụng (ETV.P.F28.02)**.

### 1.3. Nguyên tắc áp dụng

1. **Rủi ro dẫn đường:** mọi kiểm soát an toàn thông tin được áp dụng phải truy được về ít nhất một rủi ro đã đánh giá; không áp dụng kiểm soát chỉ vì "tiêu chuẩn có nêu".
2. **Một nguồn sự thật:** thủ tục này **không** định nghĩa lại thang phân loại thông tin, danh mục tài sản thông tin, thời hạn lưu hồ sơ hay quy trình khắc phục — các nội dung đó thuộc các thủ tục nêu tại mục 1.4 và được dẫn chiếu tới.
3. **Cần biết – tối thiểu quyền:** quyền truy cập được cấp theo đúng nhiệm vụ, ở mức tối thiểu đủ để làm việc, có thời hạn và được rà soát định kỳ.
4. **Tách vai trò:** người đề nghị ≠ người phê duyệt; người vận hành hệ thống ≠ người phê duyệt quyền truy cập của chính mình.
5. **Ghi vết:** mọi thao tác cấp/thu hồi quyền, truy cập thông tin mức Hạn chế/Mật, thay đổi cấu hình hệ thống và xử lý sự cố đều phải để lại nhật ký không sửa được.
6. **An toàn thông tin không tách rời tính khách quan và bảo mật của phòng thử nghiệm:** mọi kiểm soát phải bảo đảm đồng thời yêu cầu của ISO/IEC 17025 §4.1, §4.2.

### 1.4. Ngoài phạm vi

Thủ tục này **không** thay thế và **không** trùng lặp với:

| Nội dung | Thuộc thủ tục |
|---|---|
| Nghĩa vụ bảo mật đối với khách hàng, cam kết bảo mật, khách tham quan, công bố thông tin khách hàng cho bên thứ ba | ETV.MP02 – Bảo mật |
| Kiểm kê, phân loại, gán chủ sở hữu tài sản thông tin; sao lưu, phục hồi, vòng đời dữ liệu | ETV.MP27 – Quản trị dữ liệu và tài sản thông tin |
| Phương pháp luận chung về đánh giá, xử lý rủi ro và cơ hội của toàn hệ thống quản lý | ETV.MP01 – Quản lý rủi ro và cơ hội |
| Kế hoạch liên tục hoạt động, phục hồi sau thảm họa, diễn tập | ETV.MP31 – Quản lý liên tục hoạt động |
| Rủi ro và kiểm soát đặc thù của hệ thống trí tuệ nhân tạo, hồ sơ đánh giá tác động AI (AIA) | ETV.MP29 – Quản lý hệ thống trí tuệ nhân tạo |
| Nội dung, phiên bản, hiệu lực và phân quyền xem tài liệu kiểm soát | ETV.MP14 – Kiểm soát tài liệu |
| Lập, lưu trữ, bảo quản, hủy hồ sơ và thời hạn lưu | ETV.MP15 – Kiểm soát hồ sơ |
| Phân tích nguyên nhân gốc, hành động khắc phục, phòng ngừa | ETV.MP13 – Khắc phục, cải tiến |
| Đánh giá, lựa chọn và theo dõi nhà cung cấp | ETV.MP06 – Mua sắm |
| Năng lực, đào tạo và hồ sơ nhân sự | ETV.MP03 – Quản lý nhân sự |
| Điều kiện môi trường và kiểm soát ra vào khu vực kỹ thuật | ETV.MP04 – Quản lý điều kiện môi trường |
| Kiểm soát thay đổi hệ thống thông tin, nền tảng số | ETV.MP30 – Quản lý thay đổi · ETV.MP33 – Hệ thống thông tin |
| Kết tinh bài học kinh nghiệm sau sự cố thành tri thức tổ chức | ETV.MP26 – Quản lý tri thức tổ chức |

> **Ranh giới với ETV.MP02:** ETV.MP02 quy định **nghĩa vụ bảo mật** của Viện đối với thông tin khách hàng (cam kết, công bố, khách tham quan) theo ISO/IEC 17025 §4.2. ETV.MP28 quy định **hệ thống quản lý và biện pháp kỹ thuật – tổ chức** để thực thi nghĩa vụ đó theo ISO/IEC 27001. Một sự việc lộ lọt thông tin khách hàng được xử lý **đồng thời**: nghĩa vụ thông báo và quan hệ với khách hàng theo ETV.MP02 mục 6.4, 6.9; điều tra kỹ thuật, khống chế, hồ sơ sự cố và bài học theo ETV.MP28 mục 5.8. Không lập hai bộ hồ sơ sự cố song song — hồ sơ gốc là **Phiếu sự cố an toàn thông tin (ETV.P.F28.03)**, ETV.MP02 dẫn chiếu tới phiếu này.

---

## 2. THUẬT NGỮ, ĐỊNH NGHĨA VÀ CHỮ VIẾT TẮT

### 2.1. Thuật ngữ và định nghĩa

**An toàn thông tin (Information security)**  
Việc duy trì tính bí mật, tính toàn vẹn và tính sẵn sàng của thông tin (ISO/IEC 27001 §3, viện dẫn ISO/IEC 27000).

**Tính bí mật (Confidentiality) – C**  
Thông tin chỉ được tiếp cận bởi người, thực thể hoặc quy trình được phép.

**Tính toàn vẹn (Integrity) – I**  
Thông tin chính xác, đầy đủ, không bị sửa đổi trái phép hoặc mất mát trong quá trình lưu trữ, xử lý, truyền nhận.

**Tính sẵn sàng (Availability) – A**  
Thông tin và hệ thống truy cập được khi người có thẩm quyền cần đến.

**Tài sản thông tin (Information asset)**  
Thông tin và phương tiện xử lý thông tin có giá trị đối với Viện, được kiểm kê và gán chủ sở hữu theo ETV.MP27.

**Mối đe dọa (Threat)**  
Nguyên nhân tiềm ẩn của một sự việc không mong muốn có thể gây thiệt hại cho tài sản thông tin.

**Điểm yếu (Vulnerability)**  
Khiếm khuyết của tài sản hoặc của biện pháp kiểm soát có thể bị mối đe dọa khai thác.

**Rủi ro an toàn thông tin (Information security risk)**  
Khả năng một mối đe dọa khai thác điểm yếu của tài sản thông tin và gây tổn hại cho Viện; được lượng hóa theo mục 5.4.

**Chủ sở hữu rủi ro (Risk owner)**  
Người có thẩm quyền và trách nhiệm quản lý một rủi ro cụ thể, chấp nhận rủi ro tồn dư và bảo đảm biện pháp xử lý được thực hiện.

**Rủi ro tồn dư (Residual risk)**  
Mức rủi ro còn lại sau khi đã áp dụng biện pháp xử lý.

**Tuyên bố áp dụng (Statement of Applicability – SoA)**  
Văn bản bắt buộc nêu các kiểm soát an toàn thông tin được Viện áp dụng, lý do áp dụng, tình trạng thực hiện, và các kiểm soát bị loại trừ kèm lý do loại trừ (ISO/IEC 27001 §6.1.3 d).

**Kế hoạch xử lý rủi ro (Risk Treatment Plan – RTP)**  
Kế hoạch nêu biện pháp xử lý cho từng rủi ro trên ngưỡng chấp nhận, kèm người chịu trách nhiệm, nguồn lực, thời hạn và cách xác nhận hiệu lực.

**Sự kiện an toàn thông tin (Information security event)**  
Trạng thái được nhận biết của hệ thống, dịch vụ hoặc mạng cho thấy có thể có vi phạm chính sách hoặc thất bại của biện pháp kiểm soát; **chưa** chắc chắn là sự cố.

**Sự cố an toàn thông tin (Information security incident)**  
Một hoặc nhiều sự kiện an toàn thông tin có khả năng cao gây tổn hại tới hoạt động của Viện hoặc đe dọa an toàn thông tin.

**Vi phạm dữ liệu cá nhân**  
Sự cố dẫn đến việc dữ liệu cá nhân bị tiếp cận, tiết lộ, sửa đổi, mất hoặc phá hủy trái phép; kéo theo nghĩa vụ thông báo theo Nghị định 13/2023/NĐ-CP.

**Thang phân loại thông tin**  
Bốn mức thống nhất toàn Viện: **Công khai · Nội bộ · Hạn chế · Mật** — định nghĩa và tiêu chí gán mức thuộc ETV.MP02/ETV.MP27; thủ tục này **sử dụng nguyên**, không định nghĩa lại.

### 2.2. Chữ viết tắt

| Chữ viết tắt | Ý nghĩa |
|---|---|
| ETV | Viện Kiểm định Công nghệ và Môi trường |
| LĐV | Lãnh đạo Viện |
| QLCL | Phụ trách Quản lý chất lượng |
| PT.ATTT | Người phụ trách an toàn thông tin |
| QTHT | Quản trị hệ thống (công nghệ thông tin) |
| TP | Trưởng phòng/Người phụ trách lĩnh vực |
| ISMS | Hệ thống quản lý an toàn thông tin |
| SoA | Tuyên bố áp dụng |
| RTP | Kế hoạch xử lý rủi ro |
| C-I-A | Bí mật – Toàn vẹn – Sẵn sàng |
| KPH | Sự không phù hợp |
| CAPA | Hành động khắc phục – phòng ngừa |
| MFA | Xác thực đa yếu tố |
| AI | Trí tuệ nhân tạo |

---

## 3. TÀI LIỆU VIỆN DẪN

### 3.1. Tiêu chuẩn quốc tế

- **ISO/IEC 27001:2022** (Điều 4 Bối cảnh và phạm vi ISMS; 5.2 Chính sách; 5.3 Vai trò, trách nhiệm, quyền hạn; 6.1.2 Đánh giá rủi ro an toàn thông tin; 6.1.3 Xử lý rủi ro và Tuyên bố áp dụng; 6.2 Mục tiêu an toàn thông tin; 7.2 Năng lực; 7.3 Nhận thức; 7.5 Thông tin dạng văn bản; 8.1 Hoạch định và kiểm soát vận hành; 8.2, 8.3 Thực hiện đánh giá và xử lý rủi ro; 9.1 Theo dõi, đo lường, phân tích và đánh giá; 9.2 Đánh giá nội bộ; 9.3 Xem xét của lãnh đạo; 10 Cải tiến; Phụ lục A – tập kiểm soát tham chiếu theo bốn chủ đề: Tổ chức A.5, Con người A.6, Vật lý A.7, Công nghệ A.8)
- **ISO/IEC 27002:2022** — hướng dẫn thực hành đối với các kiểm soát nêu tại Phụ lục A của ISO/IEC 27001 *(dùng làm tài liệu tham khảo khi lập SoA, không phải tiêu chuẩn chứng nhận)*
- **ISO/IEC 27005** — hướng dẫn quản lý rủi ro an toàn thông tin *(tham khảo khi xây dựng phương pháp đánh giá rủi ro tại mục 5.4)*
- **ISO 9001:2015** (Điều 6.1 Hành động giải quyết rủi ro và cơ hội; 7.5 Thông tin dạng văn bản; 9.3 Xem xét của lãnh đạo)
- **ISO/IEC 17025:2017** (Điều 4.1 Tính khách quan; 4.2 Bảo mật; 6.2 Nhân sự; 7.11 Kiểm soát dữ liệu và quản lý thông tin; 8.3 Kiểm soát tài liệu; 8.5 Hành động giải quyết rủi ro và cơ hội)
- **ISO 17034:2016** (Điều 7.4 Kiểm soát dữ liệu; 8.3 Kiểm soát tài liệu)
- **ISO/IEC 42001:2023** (Điều 6.1 Rủi ro liên quan hệ thống AI; 8.1 Kiểm soát vận hành hệ thống AI)

### 3.2. Văn bản pháp luật

*(Chỉ dẫn chiếu — không chép nội dung. Bản đầy đủ lưu tại `08_KNOWLEDGE_GRAPH/01_Regulations/`. QLCL rà soát hiệu lực và văn bản thay thế trước mỗi lần ban hành lại.)*

- **Luật An toàn thông tin mạng số 86/2015/QH13** — bảo vệ thông tin cá nhân trên mạng, bảo đảm an toàn hệ thống thông tin
- **Luật An ninh mạng số 24/2018/QH14** — bảo vệ hệ thống thông tin, ứng phó sự cố an ninh mạng
- **Luật Giao dịch điện tử số 20/2023/QH15** — giá trị pháp lý của thông điệp dữ liệu và chữ ký điện tử
- **Nghị định 13/2023/NĐ-CP** — bảo vệ dữ liệu cá nhân, bao gồm nghĩa vụ thông báo khi xảy ra vi phạm
- **Nghị định 85/2016/NĐ-CP** — bảo đảm an toàn hệ thống thông tin theo cấp độ *(và văn bản hướng dẫn hiện hành — cần QLCL/LĐP xác nhận hiệu lực tại thời điểm áp dụng)*

### 3.3. Văn bản nội bộ Viện ETV

- Sổ tay quản lý chất lượng (ETV.QM)
- Thủ tục ETV.MP01 – Quản lý rủi ro và cơ hội
- Thủ tục ETV.MP02 – Bảo mật
- Thủ tục ETV.MP03 – Quản lý nhân sự (đào tạo, năng lực)
- Thủ tục ETV.MP04 – Quản lý điều kiện môi trường
- Thủ tục ETV.MP06 – Mua sắm dịch vụ và nhà cung cấp
- Thủ tục ETV.MP13 – Khắc phục, cải tiến
- Thủ tục ETV.MP14 – Kiểm soát tài liệu
- Thủ tục ETV.MP15 – Kiểm soát hồ sơ
- Thủ tục ETV.MP16 – Đánh giá nội bộ
- Thủ tục ETV.MP17 – Xem xét của lãnh đạo
- Thủ tục ETV.MP25 – Quản lý bối cảnh tổ chức và các bên quan tâm
- Thủ tục ETV.MP26 – Quản lý tri thức tổ chức
- Thủ tục ETV.MP27 – Quản trị dữ liệu và tài sản thông tin
- Thủ tục ETV.MP29 – Quản lý hệ thống trí tuệ nhân tạo
- Thủ tục ETV.MP30 – Quản lý thay đổi
- Thủ tục ETV.MP31 – Quản lý liên tục hoạt động
- Thủ tục ETV.MP33 – Quản lý hệ thống thông tin

---

## 4. TRÁCH NHIỆM

### 4.1. Lãnh đạo Viện (LĐV)

- Ban hành **Chính sách an toàn thông tin** và phê duyệt **mục tiêu an toàn thông tin** hằng năm
- Phê duyệt **phạm vi ISMS**, **tiêu chí đánh giá và ngưỡng chấp nhận rủi ro**
- **Phê duyệt Tuyên bố áp dụng (SoA)** và mọi sửa đổi SoA — bao gồm việc loại trừ kiểm soát
- **Chấp nhận rủi ro tồn dư** vượt ngưỡng chấp nhận (không được ủy quyền cho vai trò khác)
- Phê duyệt Kế hoạch xử lý rủi ro và bố trí nguồn lực thực hiện
- Quyết định công bố sự cố an toàn thông tin ra bên ngoài, thông báo cơ quan có thẩm quyền và khách hàng
- Xem xét tình trạng ISMS trong cuộc họp xem xét của lãnh đạo (ETV.MP17)

### 4.2. Người phụ trách an toàn thông tin (PT.ATTT)

*(Do LĐV chỉ định bằng văn bản; có thể do QLCL kiêm nhiệm nếu bảo đảm nguyên tắc tách vai trò tại mục 4.7)*

- Chủ trì xây dựng, duy trì và rà soát **hồ sơ rủi ro an toàn thông tin (F28.01)** và **SoA (F28.02)**
- Điều phối xử lý **sự cố an toàn thông tin (F28.03)**; xác định mức độ, phạm vi ảnh hưởng và nghĩa vụ thông báo
- Theo dõi tiến độ Kế hoạch xử lý rủi ro; cảnh báo LĐV khi quá hạn
- Tổng hợp **chỉ số đo lường hiệu lực ISMS** (mục 5.11) phục vụ xem xét của lãnh đạo
- Đề xuất nội dung đào tạo, nhận thức an toàn thông tin phối hợp với ETV.MP03

### 4.3. Phụ trách Quản lý chất lượng (QLCL)

- Bảo đảm ISMS tích hợp với hệ thống quản lý chung; kiểm soát tài liệu, hồ sơ ISMS theo ETV.MP14, ETV.MP15
- Đưa nội dung an toàn thông tin vào chương trình **đánh giá nội bộ (ETV.MP16)**
- Chuyển sự không phù hợp về an toàn thông tin sang **ETV.MP13** để phân tích nguyên nhân gốc và khắc phục
- Chuyển bài học sau sự cố sang **ETV.MP26** để kết tinh thành tri thức tổ chức
- Rà soát hiệu lực của các văn bản pháp luật viện dẫn tại mục 3.2

### 4.4. Quản trị hệ thống (QTHT)

- Thực hiện các kiểm soát kỹ thuật tại mục 5.7: định danh, phân quyền, sao lưu (theo ETV.MP27), nhật ký, cấu hình an toàn, vá lỗi, kiểm soát mạng và thiết bị đầu cuối
- Thực hiện thao tác **cấp/sửa/thu hồi quyền truy cập** sau khi có phê duyệt hợp lệ (F28.04) — **không** tự quyết định quyền
- Bảo đảm nhật ký hệ thống được ghi, lưu và **không sửa được**; định kỳ trích xuất phục vụ rà soát
- Phát hiện, ghi nhận và báo cáo ngay sự kiện/sự cố an toàn thông tin cho PT.ATTT
- Không được tự phê duyệt quyền truy cập của chính mình hoặc tự đóng sự cố do mình gây ra

### 4.5. Trưởng phòng/Người phụ trách lĩnh vực (TP)

- Là **chủ sở hữu rủi ro** đối với rủi ro an toàn thông tin phát sinh trong lĩnh vực phụ trách
- Đề nghị cấp, thay đổi và **thu hồi ngay** quyền truy cập của nhân sự thuộc phòng khi thay đổi nhiệm vụ hoặc chấm dứt công việc
- Rà soát định kỳ danh sách quyền truy cập của phòng (mục 5.7.1)
- Bảo đảm nhân sự của phòng được đào tạo nhận thức an toàn thông tin trước khi được cấp quyền

### 4.6. Nhân viên và bên thứ ba

- Tuân thủ Chính sách an toàn thông tin, sử dụng tài khoản riêng, không chia sẻ mật khẩu
- Chỉ sử dụng thiết bị, phần mềm, dịch vụ đám mây đã được phê duyệt để xử lý thông tin của Viện
- **Báo cáo ngay** mọi sự kiện, nghi ngờ hoặc điểm yếu an toàn thông tin; không tự ý che giấu, không xóa bằng chứng
- Bên thứ ba tuân thủ điều khoản an toàn thông tin trong hợp đồng và cam kết bảo mật theo ETV.MP02

### 4.7. Nguyên tắc tách vai trò

> Người **đề nghị** quyền truy cập ≠ người **phê duyệt** quyền truy cập ≠ người **thực hiện** thao tác cấp quyền. Người gây ra hoặc liên quan trực tiếp tới sự cố **không** được là người kết luận và đóng sự cố đó. Trợ lý AI **không** được tự đánh giá rủi ro chính thức, **không** phê duyệt SoA, **không** đóng sự cố và **không** tự thay đổi quyền truy cập (ISO/IEC 42001; ETV.MP29).

---

## 5. NỘI DUNG

### 5.1. Phạm vi và ranh giới ISMS

Phạm vi ISMS được xác định trên cơ sở **bối cảnh tổ chức và các bên quan tâm (ETV.MP25)** và được ghi tại phần đầu **SoA (F28.02)**, gồm tối thiểu:

| Chiều xác định | Nội dung phải nêu |
|---|---|
| Tổ chức | Các phòng/bộ phận và hoạt động nằm trong ISMS |
| Địa điểm | Trụ sở, phòng thử nghiệm, kho, hiện trường, làm việc từ xa |
| Thông tin | Nhóm thông tin thuộc phạm vi, theo danh mục tài sản của ETV.MP27 |
| Hệ thống | Nền tảng ManLab, thư điện tử, kho dữ liệu dùng chung, phần mềm thiết bị đo, hạ tầng mạng, dịch vụ đám mây đã phê duyệt |
| Giao diện & phụ thuộc | Dịch vụ do bên thứ ba cung cấp, kết nối tới cơ quan quản lý, khách hàng |
| Loại trừ | Phần bị loại khỏi phạm vi **kèm lý do** |

Phạm vi ISMS được rà soát **tối thiểu 01 lần/năm** hoặc khi có thay đổi lớn về tổ chức, địa điểm, hệ thống hoặc pháp luật; mọi thay đổi phạm vi do **LĐV phê duyệt**.

### 5.2. Chính sách và mục tiêu an toàn thông tin

- **Chính sách an toàn thông tin** do LĐV ban hành, phổ biến tới toàn Viện và tới bên thứ ba liên quan ở mức cần thiết; là tài liệu kiểm soát theo ETV.MP14.
- **Mục tiêu an toàn thông tin** được thiết lập hằng năm, có chỉ số đo được (mục 5.11), người chịu trách nhiệm và thời hạn; được xem xét trong ETV.MP17 và liên kết với hệ thống chỉ tiêu tại ETV.MP24.
- Chính sách được rà soát tối thiểu 01 lần/năm hoặc khi có thay đổi đáng kể về bối cảnh, pháp luật, công nghệ hoặc sau sự cố nghiêm trọng.

### 5.3. Phân loại thông tin và tài sản thông tin

- Viện áp dụng **thống nhất** thang phân loại **Công khai · Nội bộ · Hạn chế · Mật**. Định nghĩa mức, tiêu chí gán mức, danh mục tài sản và chủ sở hữu tài sản do **ETV.MP02 và ETV.MP27** quy định; thủ tục này chỉ **sử dụng** và **không** định nghĩa lại.
- Mỗi rủi ro trong F28.01 phải gắn với ít nhất **01 tài sản thông tin có trong danh mục của ETV.MP27**. Rủi ro không gắn được tài sản → **không cho lưu**.
- Mức phân loại của thông tin quyết định mức kiểm soát tối thiểu về truy cập, truyền nhận, lưu trữ, sao lưu và hủy bỏ.

### 5.4. Đánh giá rủi ro an toàn thông tin (Biểu mẫu F28.01)

#### 5.4.1. Nguyên tắc và tần suất

Đánh giá rủi ro an toàn thông tin được thực hiện theo phương pháp **nhất quán, có thể lặp lại và cho kết quả so sánh được** (ISO/IEC 27001 §6.1.2), thực hiện:

- **Định kỳ tối thiểu 01 lần/năm**, trước cuộc họp xem xét của lãnh đạo
- **Đột xuất** khi: đưa vào hệ thống/nền tảng mới hoặc dịch vụ đám mây mới; thay đổi lớn về tổ chức, địa điểm, quy trình; sau sự cố an toàn thông tin mức Cao trở lên; khi có thay đổi pháp luật hoặc yêu cầu của khách hàng/cơ quan công nhận

Phương pháp luận chung về rủi ro của Viện tuân theo **ETV.MP01**; thủ tục này chỉ bổ sung **chiều đánh giá đặc thù C-I-A** dưới đây.

#### 5.4.2. Cách xác định mức rủi ro

Mỗi rủi ro được mô tả theo cấu trúc: **Tài sản thông tin → Mối đe dọa → Điểm yếu → Hệ quả (C/I/A) → Kiểm soát hiện có**.

| Yếu tố | Thang | Diễn giải |
|---|---|---|
| **Khả năng xảy ra (K)** | 1 – 5 | 1: hiếm khi · 3: có thể · 5: gần như chắc chắn trong 12 tháng |
| **Mức tác động (T)** | 1 – 5 | Lấy **giá trị lớn nhất** trong ba chiều C, I, A; xét trên: thiệt hại cho khách hàng, ảnh hưởng tới hiệu lực kết quả đo/chứng chỉ, gián đoạn dịch vụ, nghĩa vụ pháp lý, uy tín |
| **Mức rủi ro (R)** | R = K × T (1 – 25) | Thấp: 1–6 · Trung bình: 7–12 · Cao: 13–19 · Rất cao: 20–25 |

#### 5.4.3. Ngưỡng chấp nhận rủi ro

| Mức rủi ro | Yêu cầu bắt buộc |
|---|---|
| **Thấp (1–6)** | Chấp nhận; chủ sở hữu rủi ro theo dõi theo chu kỳ rà soát |
| **Trung bình (7–12)** | Phải có biện pháp xử lý trong Kế hoạch xử lý rủi ro; hạn hoàn thành ≤ 12 tháng |
| **Cao (13–19)** | Phải xử lý; hạn hoàn thành ≤ 06 tháng; báo cáo LĐV |
| **Rất cao (20–25)** | Phải có **biện pháp khống chế tạm thời ngay**; hạn xử lý triệt để ≤ 03 tháng; LĐV trực tiếp theo dõi |

Rủi ro tồn dư **trên ngưỡng chấp nhận (R ≥ 7)** chỉ được đóng khi **LĐV chấp nhận rủi ro tồn dư bằng văn bản, có ghi lý do**. Đây là điều kiện **chặn cứng** — hệ thống ManLab từ chối thao tác đóng rủi ro khi chưa có phê duyệt này.

Chủ sở hữu rủi ro là **TP lĩnh vực** hoặc **LĐV** (với rủi ro liên phòng, rủi ro mức Rất cao); **không** giao chủ sở hữu rủi ro cho QTHT.

### 5.5. Xử lý rủi ro và Kế hoạch xử lý rủi ro

#### 5.5.1. Lựa chọn phương án xử lý

| Phương án | Áp dụng khi | Yêu cầu hồ sơ |
|---|---|---|
| **Giảm thiểu** | Có kiểm soát khả thi làm giảm K hoặc T | Nêu rõ kiểm soát áp dụng và ánh xạ tới mã kiểm soát trong SoA |
| **Tránh** | Dừng hoặc thay đổi hoạt động sinh ra rủi ro | Nêu quyết định thay đổi và tác động tới dịch vụ |
| **Chia sẻ** | Chuyển một phần hệ quả cho bên thứ ba (nhà cung cấp, bảo hiểm) | Điều khoản hợp đồng tương ứng (ETV.MP06) |
| **Chấp nhận** | Rủi ro ở mức Thấp, hoặc chi phí xử lý vượt giá trị bảo vệ | Bắt buộc ghi lý do; nếu R ≥ 7 phải có phê duyệt của LĐV |

#### 5.5.2. Kế hoạch xử lý rủi ro (RTP)

RTP là một phần của F28.01, nêu cho từng rủi ro cần xử lý: biện pháp cụ thể · mã kiểm soát tương ứng trong SoA · người chịu trách nhiệm · nguồn lực · hạn hoàn thành · cách xác nhận hiệu lực · mức rủi ro tồn dư dự kiến.

RTP do **LĐV phê duyệt**. Hạng mục quá hạn được cảnh báo tới chủ sở hữu rủi ro, quá **02 lần cảnh báo** thì báo cáo LĐV và đưa vào báo cáo xem xét của lãnh đạo.

Sau khi hoàn thành, PT.ATTT **xác nhận hiệu lực** của biện pháp (bằng kiểm tra kỹ thuật, rà soát hồ sơ hoặc thử nghiệm) và ghi lại mức rủi ro tồn dư thực tế. Biện pháp chưa được xác nhận hiệu lực → **không** được ghi là hoàn thành.

### 5.6. Tuyên bố áp dụng — SoA (Biểu mẫu F28.02)

- SoA là **tài liệu bắt buộc** của ISMS. SoA liệt kê **toàn bộ** kiểm soát tham chiếu theo bốn chủ đề của Phụ lục A ISO/IEC 27001:2022 (Tổ chức A.5 · Con người A.6 · Vật lý A.7 · Công nghệ A.8) và, đối với **từng** kiểm soát, ghi rõ:

| Trường bắt buộc | Nội dung |
|---|---|
| Mã kiểm soát | Theo Phụ lục A ISO/IEC 27001:2022 |
| Áp dụng / Loại trừ | Chỉ một trong hai |
| Lý do áp dụng | Rủi ro tương ứng trong F28.01, yêu cầu pháp luật, yêu cầu hợp đồng hoặc yêu cầu của tiêu chuẩn |
| Lý do loại trừ | **Bắt buộc** nếu chọn Loại trừ — nêu căn cứ, không được ghi chung chung |
| Cách thực hiện tại ETV | Dẫn chiếu thủ tục/quy định/biện pháp kỹ thuật nội bộ đang thực thi kiểm soát |
| Tình trạng thực hiện | Chưa thực hiện · Đang thực hiện · Đã thực hiện |
| Bằng chứng | Dẫn chiếu hồ sơ tại ETV.MP15 hoặc bản ghi trên ManLab |

> **Không chép nội dung tiêu chuẩn:** biểu mẫu SoA chỉ ghi **mã kiểm soát** và cách Viện thực thi. Tên và diễn giải đầy đủ của từng kiểm soát tra tại bản ISO/IEC 27001:2022 và ISO/IEC 27002:2022 có bản quyền do Viện sở hữu hợp pháp, lưu tại kho tri thức (ETV.MP26). Việc chép toàn văn nội dung tiêu chuẩn vào biểu mẫu là **không chấp nhận**.

- SoA do PT.ATTT lập, QLCL soát xét, **LĐV phê duyệt**. Mỗi lần sửa đổi tạo **phiên bản mới**, không sửa đè; phiên bản cũ được giữ để làm bằng chứng.
- SoA được rà soát **tối thiểu 01 lần/năm** và bắt buộc rà soát sau mỗi lần đánh giá rủi ro đột xuất theo mục 5.4.1.
- Mọi kiểm soát ghi **Áp dụng** mà không có bằng chứng thực hiện sau thời hạn đã cam kết trong RTP → lập KPH theo **ETV.MP13**.

### 5.7. Kiểm soát vận hành an toàn thông tin

Các kiểm soát dưới đây là **mức tối thiểu bắt buộc** của Viện; kiểm soát bổ sung được xác định qua đánh giá rủi ro và ghi trong SoA.

#### 5.7.1. Định danh và quản lý truy cập (Biểu mẫu F28.04)

| Nội dung | Quy định bắt buộc |
|---|---|
| Tài khoản | Mỗi người **01 tài khoản định danh riêng**; nghiêm cấm dùng chung tài khoản và chia sẻ mật khẩu |
| Cấp quyền | Theo **Phiếu yêu cầu cấp/thay đổi/thu hồi quyền truy cập (F28.04)**: TP đề nghị → PT.ATTT hoặc LĐV phê duyệt theo mức nhạy cảm → QTHT thực hiện |
| Nguyên tắc | Quyền tối thiểu, theo vai trò công việc; quyền tạm thời phải có **thời hạn hiệu lực** |
| Tài khoản đặc quyền | Tài khoản quản trị phải tách khỏi tài khoản dùng hằng ngày; danh sách tài khoản đặc quyền do LĐV phê duyệt và rà soát ≥ 02 lần/năm |
| Xác thực | Bắt buộc **MFA** đối với: tài khoản quản trị, truy cập từ xa, thư điện tử công vụ và các hệ thống chứa thông tin mức Hạn chế/Mật |
| Thu hồi | Thu hồi **trong ngày làm việc** khi chấm dứt hợp đồng, chuyển công tác hoặc kết thúc công việc của bên thứ ba; là điều kiện bắt buộc để hoàn tất thủ tục thôi việc theo ETV.MP03 |
| Rà soát | TP rà soát danh sách quyền của phòng **tối thiểu 06 tháng/lần**; kết quả rà soát ghi vào F28.04 |

#### 5.7.2. Thiết bị đầu cuối và thiết bị di động

Máy tính, máy tính xách tay, thiết bị di động và thiết bị lưu trữ di động dùng cho công việc phải: được đăng ký trong danh mục tài sản (ETV.MP27) · có khóa màn hình tự động và mật khẩu/mã PIN · được cập nhật bản vá và có phần mềm phòng chống mã độc đang hoạt động · mã hóa ổ đĩa đối với thiết bị lưu thông tin mức Hạn chế/Mật · được xóa dữ liệu an toàn trước khi thanh lý, chuyển giao hoặc sửa chữa bên ngoài.

Việc sử dụng thiết bị cá nhân để xử lý thông tin mức **Hạn chế/Mật** phải được **LĐV phê duyệt** và ghi nhận rủi ro tương ứng trong F28.01.

#### 5.7.3. Kiểm soát mạng và dịch vụ

Mạng của Viện được phân tách vùng ở mức phù hợp (vùng quản trị/văn phòng · vùng thiết bị đo và hệ thống thu thập dữ liệu · vùng khách/Wi-Fi công cộng). Truy cập từ xa chỉ qua kênh đã được phê duyệt và có MFA. Thiết bị mạng, máy chủ và dịch vụ phải có cấu hình an toàn cơ sở, đổi mật khẩu mặc định, đóng dịch vụ không dùng đến và được vá lỗi theo mức nghiêm trọng của lỗ hổng.

Mạng dùng cho **thiết bị đo và hệ thống thu thập dữ liệu** phải được kiểm soát chặt: mọi thay đổi cấu hình, cập nhật phần mềm điều khiển thiết bị thực hiện theo **ETV.MP30** và phải đánh giá ảnh hưởng tới **hiệu lực kết quả đo (ETV.MP10)** trước khi áp dụng.

#### 5.7.4. Mật mã và truyền nhận thông tin

Thông tin mức **Hạn chế/Mật** phải được bảo vệ khi truyền qua mạng công cộng (kênh mã hóa hoặc tệp được bảo vệ bằng mật khẩu, mật khẩu gửi qua kênh khác). Chữ ký số và chứng thư số sử dụng theo quy định của **Luật Giao dịch điện tử số 20/2023/QH15** và quy định nội bộ về ký số. Khóa và chứng thư số phải được bảo quản, phân quyền sử dụng và thu hồi có kiểm soát; **nghiêm cấm** cho mượn thiết bị/USB token chữ ký số.

#### 5.7.5. Nhật ký và giám sát

Hệ thống thông tin của Viện phải ghi nhật ký tối thiểu: đăng nhập thành công/thất bại · thao tác của tài khoản đặc quyền · thay đổi phân quyền · truy cập thông tin mức Hạn chế/Mật · thay đổi cấu hình · thao tác xóa dữ liệu. Nhật ký phải **không sửa được**, được đồng bộ thời gian và lưu tối thiểu **12 tháng** (hoặc theo thời hạn dài hơn nếu pháp luật/hợp đồng yêu cầu).

QTHT trích xuất và PT.ATTT rà soát nhật ký **tối thiểu hằng quý** và ngay khi có nghi ngờ sự cố. Nhật ký **không** được sử dụng làm công cụ đánh giá năng suất cá nhân.

#### 5.7.6. Sao lưu, phục hồi và hủy dữ liệu

Chính sách sao lưu, chu kỳ, thời hạn giữ, kiểm tra phục hồi và hủy dữ liệu an toàn thực hiện theo **ETV.MP27**; thời hạn lưu hồ sơ theo **ETV.MP15**. Thủ tục này chỉ yêu cầu bổ sung: kết quả **kiểm tra phục hồi định kỳ** phải được ghi nhận và là **bằng chứng bắt buộc** cho các kiểm soát liên quan tính sẵn sàng trong SoA; thất bại phục hồi phải mở sự cố theo mục 5.8.

#### 5.7.7. Nhà cung cấp và dịch vụ đám mây

- Nhà cung cấp có quyền truy cập thông tin/hệ thống của Viện phải được đánh giá theo **ETV.MP06** và ký cam kết bảo mật theo **ETV.MP02** trước khi được cấp quyền.
- Hợp đồng/thỏa thuận phải có điều khoản về: phạm vi truy cập · nghĩa vụ bảo mật · **nghĩa vụ thông báo sự cố trong thời hạn xác định** · quyền kiểm tra của Viện · trả lại/xóa dữ liệu khi kết thúc.
- Việc đưa thông tin của Viện lên **dịch vụ đám mây mới** phải được đánh giá rủi ro theo mục 5.4 và **LĐV phê duyệt** trước khi sử dụng. Nghiêm cấm dùng tài khoản đám mây cá nhân để lưu trữ dữ liệu khách hàng.
- Quyền truy cập của bên thứ ba phải có **thời hạn** và được thu hồi ngay khi kết thúc công việc.

#### 5.7.8. An ninh vật lý và môi trường làm việc

Kiểm soát ra vào khu vực kỹ thuật, phòng máy chủ, kho hồ sơ thực hiện theo **ETV.MP04** và **ETV.MP02** (khách tham quan). Bổ sung yêu cầu: bàn làm việc gọn – màn hình khóa khi rời vị trí · hồ sơ giấy mức Hạn chế/Mật phải cất vào tủ có khóa · tài liệu in bị loại bỏ phải được hủy bằng máy hủy giấy · khu vực đặt thiết bị mạng và máy chủ phải hạn chế người ra vào và có ghi nhận.

#### 5.7.9. Làm việc từ xa và hiện trường

Khi làm việc từ xa hoặc tại hiện trường: chỉ dùng thiết bị và kênh kết nối đã được phê duyệt · tránh để người không có thẩm quyền nhìn/nghe thông tin · không sử dụng Wi-Fi công cộng để truy cập hệ thống chứa thông tin mức Hạn chế/Mật khi chưa có kênh bảo vệ · dữ liệu thu thập tại hiện trường phải được đồng bộ về hệ thống của Viện trong thời hạn quy định và không lưu trữ lâu dài trên thiết bị cá nhân.

#### 5.7.10. An toàn thông tin trong thay đổi và phát triển hệ thống

Mọi thay đổi hệ thống thông tin (nâng cấp nền tảng ManLab, tích hợp mới, thay đổi phân quyền diện rộng) thực hiện theo **ETV.MP30** và **ETV.MP33**, kèm **đánh giá ảnh hưởng an toàn thông tin** trước khi triển khai. Môi trường phát triển/kiểm thử phải tách khỏi môi trường vận hành; **nghiêm cấm** dùng dữ liệu thật của khách hàng để kiểm thử khi chưa được ẩn danh hoặc chưa được LĐV phê duyệt.

### 5.8. Quản lý sự cố an toàn thông tin (Biểu mẫu F28.03)

#### 5.8.1. Phân mức sự cố

| Mức | Tiêu chí (thỏa mãn ít nhất một) | Thời hạn báo cáo nội bộ |
|---|---|---|
| **Thấp** | Sự kiện đơn lẻ, không lộ lọt dữ liệu, không gián đoạn dịch vụ | Trong 24 giờ tới PT.ATTT |
| **Trung bình** | Gián đoạn dịch vụ nội bộ ngắn; nghi ngờ truy cập trái phép chưa xác nhận | Trong 08 giờ tới PT.ATTT |
| **Cao** | Lộ lọt hoặc mất dữ liệu khách hàng/dữ liệu cá nhân; mã độc lan rộng; mất tính toàn vẹn dữ liệu đo; gián đoạn dịch vụ kéo dài | **Ngay lập tức** tới PT.ATTT và LĐV |
| **Rất cao** | Ảnh hưởng tới hiệu lực kết quả đo/chứng chỉ đã phát hành; tấn công mã hóa tống tiền; sự cố phải thông báo cơ quan có thẩm quyền | **Ngay lập tức** tới LĐV; kích hoạt ETV.MP31 nếu gián đoạn hoạt động |

#### 5.8.2. Trình tự xử lý

| Bước | Trạng thái | Người thực hiện | Nội dung |
|---|---|---|---|
| 1 | Mới | Người phát hiện (bất kỳ nhân sự nào), QTHT hoặc hệ thống giám sát | Ghi nhận sự kiện vào F28.03: thời điểm, hiện tượng, hệ thống/tài sản liên quan. **Không** tự ý xóa dữ liệu, nhật ký hoặc thư điện tử liên quan |
| 2 | Đang khống chế | QTHT theo chỉ đạo của PT.ATTT | Ngăn chặn trong khả năng an toàn: khóa tài khoản, cô lập thiết bị, thu hồi thư/tài liệu đã gửi nhầm, ngắt kết nối; **bảo toàn bằng chứng** |
| 3 | Đang điều tra | PT.ATTT, QTHT | Xác định nguyên nhân trực tiếp, phạm vi ảnh hưởng, dữ liệu và chủ thể bị ảnh hưởng, mức sự cố; đánh giá **nghĩa vụ thông báo** theo mục 5.8.3 |
| 4 | Đang khắc phục | Chủ sở hữu hệ thống, QTHT | Khôi phục dịch vụ/dữ liệu; áp dụng biện pháp loại bỏ nguyên nhân; cập nhật rủi ro liên quan trong F28.01 |
| 5 | Chờ kết luận | PT.ATTT | Lập kết luận: nguyên nhân, thiệt hại, biện pháp đã thực hiện, đề xuất phòng ngừa; chuyển KPH sang **ETV.MP13** nếu có sự không phù hợp |
| 6 | Đã đóng | **LĐV** (mức Cao, Rất cao) · **PT.ATTT** (mức Thấp, Trung bình) | Chỉ được đóng khi: đã khôi phục, đã hoàn tất nghĩa vụ thông báo (nếu có), **và** đã lập phiếu bài học kinh nghiệm theo **ETV.MP26** đối với sự cố mức Cao trở lên |
| — | Hủy | PT.ATTT | Khi xác định là **cảnh báo giả**; bắt buộc ghi lý do |

#### 5.8.3. Nghĩa vụ thông báo ra bên ngoài

- Sự cố liên quan **dữ liệu khách hàng**: thông báo khách hàng theo thẩm quyền và cách thức quy định tại **ETV.MP02** mục 6.4, 6.9; quyết định công bố do **LĐV** phê duyệt.
- Sự cố là **vi phạm dữ liệu cá nhân**: thực hiện nghĩa vụ thông báo theo **Nghị định 13/2023/NĐ-CP**; PT.ATTT chuẩn bị nội dung, **LĐV** quyết định gửi.
- Sự cố thuộc diện phải báo cáo theo **Luật An toàn thông tin mạng số 86/2015/QH13**, **Luật An ninh mạng số 24/2018/QH14** hoặc theo hợp đồng: thực hiện đúng đầu mối, nội dung và thời hạn quy định; lưu bằng chứng gửi/nhận.
- Sự cố ảnh hưởng tới **hiệu lực của kết quả đo hoặc chứng chỉ đã phát hành**: bắt buộc kích hoạt đồng thời **ETV.MP10** (đảm bảo giá trị sử dụng kết quả) và **ETV.MP11** (xử lý báo cáo/chứng chỉ đã phát hành); AI và cá nhân đơn lẻ **không** được tự kết luận về hiệu lực kết quả.
- Không cá nhân nào được tự phát ngôn hoặc cung cấp thông tin về sự cố ra bên ngoài khi chưa được **LĐV** cho phép.

### 5.9. Liên tục hoạt động

Yêu cầu về liên tục hoạt động, mục tiêu thời gian phục hồi, phương án dự phòng và diễn tập thuộc **ETV.MP31**. Thủ tục này yêu cầu: rủi ro an toàn thông tin có mức tác động tới **tính sẵn sàng ≥ 4** phải được chuyển thành **đầu vào bắt buộc** cho kế hoạch liên tục hoạt động; kết quả diễn tập được ghi nhận và dùng làm bằng chứng cho các kiểm soát tương ứng trong SoA.

### 5.10. Nhận thức, năng lực và đào tạo

- Nhân sự mới và bên thứ ba được phổ biến Chính sách an toàn thông tin **trước khi** được cấp quyền truy cập.
- Đào tạo nhận thức an toàn thông tin tổ chức **tối thiểu 01 lần/năm** và bổ sung sau sự cố mức Cao trở lên hoặc khi có thay đổi công nghệ, phương thức làm việc. Hồ sơ đào tạo lập theo **ETV.MP03** (bộ biểu mẫu F03.05.x) — **không** lập biểu mẫu đào tạo riêng cho ISMS.
- Nhân sự giữ vai trò PT.ATTT, QTHT phải có năng lực phù hợp; hồ sơ năng lực theo **ETV.MP03**.

### 5.11. Đo lường hiệu lực ISMS

PT.ATTT theo dõi và báo cáo **tối thiểu 06 tháng/lần** các chỉ số sau (được cụ thể hóa thành chỉ tiêu hằng năm theo ETV.MP24):

| Nhóm | Chỉ số |
|---|---|
| Rủi ro | Số rủi ro mở theo mức · Tỷ lệ hạng mục RTP hoàn thành đúng hạn · Số rủi ro tồn dư ≥ 7 được LĐV chấp nhận |
| SoA | Tỷ lệ kiểm soát ghi "Áp dụng" đã có bằng chứng thực hiện · Số kiểm soát loại trừ và tính đầy đủ của lý do |
| Truy cập | Tỷ lệ tài khoản thu hồi đúng hạn khi nhân sự nghỉ/chuyển công tác · Kết quả rà soát quyền định kỳ · Tỷ lệ tài khoản đặc quyền dùng MFA |
| Sự cố | Số sự cố theo mức · Thời gian trung bình từ phát hiện đến khống chế · Số sự cố lặp lại cùng nguyên nhân |
| Sao lưu | Số lần kiểm tra phục hồi và tỷ lệ thành công |
| Nhận thức | Tỷ lệ nhân sự hoàn thành đào tạo nhận thức trong năm |

Báo cáo tình trạng ISMS là **đầu vào bắt buộc** của **ETV.MP17** và đầu vào của **ETV.MP01**.

### 5.12. Đánh giá nội bộ và cải tiến

- Nội dung ISMS được đưa vào chương trình **đánh giá nội bộ (ETV.MP16)** tối thiểu 01 lần/năm, bao trùm các kiểm soát ghi "Áp dụng" trong SoA.
- Mọi phát hiện không phù hợp về an toàn thông tin được xử lý theo **ETV.MP13** (phân tích nguyên nhân gốc, hành động khắc phục, đánh giá hiệu lực).
- Bài học sau sự cố và sau đánh giá được kết tinh thành mục tri thức theo **ETV.MP26**.

### 5.13. An toàn thông tin đối với hệ thống trí tuệ nhân tạo

- Trợ lý AI và các agent của Viện chỉ được truy cập nguồn dữ liệu ở mức **Công khai** và **Nội bộ**; dữ liệu mức **Hạn chế** và **Mật** **không bao giờ** được đưa vào chỉ mục AI (ETV.MP26 mục 5.5). Phát hiện vi phạm phải gỡ ngay, mở sự cố theo mục 5.8 và lập KPH theo ETV.MP13.
- Rủi ro đặc thù của hệ thống AI (rò rỉ dữ liệu qua prompt, tiêm lệnh, phụ thuộc nhà cung cấp mô hình) được đánh giá theo mục 5.4 và ghi trong F28.01, đồng thời phản ánh trong hồ sơ đánh giá tác động AI (AIA) theo **ETV.MP29**.
- AI **không** được tự đánh giá rủi ro chính thức, **không** phê duyệt SoA, **không** đóng sự cố, **không** thay đổi quyền truy cập và **không** ra kết luận về hiệu lực kết quả đo (ISO/IEC 42001).

---

## 6. TRẠNG THÁI VÀ THẨM QUYỀN

### 6.1. Bản ghi rủi ro an toàn thông tin (F28.01)

| STT | Trạng thái | Ý nghĩa | Người thao tác | Bắt buộc lý do |
|---|---|---|---|---|
| 1 | Nháp | Đang nhận diện, mô tả | PT.ATTT, TP, QTHT | Không |
| 2 | Chờ soát xét | Chờ kiểm tra tính đầy đủ và cách chấm điểm | Người lập | Không |
| 3 | Không soát xét | Trả lại để sửa | PT.ATTT hoặc QLCL (≠ người lập) | **Có** |
| 4 | Chờ phê duyệt | Chờ LĐV duyệt mức rủi ro và phương án xử lý | PT.ATTT | Không |
| 5 | Không phê duyệt | Trả lại để sửa | LĐV | **Có** |
| 6 | Đang xử lý | RTP đã phê duyệt, đang thực hiện biện pháp | Chủ sở hữu rủi ro | Không |
| 7 | Đã xử lý | Biện pháp hoàn thành **và** đã xác nhận hiệu lực | PT.ATTT | Không |
| 8 | Chấp nhận rủi ro tồn dư | Đóng với mức tồn dư còn lại | **LĐV** (bắt buộc khi R ≥ 7) | **Có** |
| 9 | Hết hiệu lực | Rủi ro không còn (tài sản/hoạt động đã chấm dứt) | LĐV theo đề nghị của PT.ATTT | **Có** |

### 6.2. Các đối tượng khác

| Đối tượng | Chuỗi trạng thái | Thẩm quyền kết thúc |
|---|---|---|
| Tuyên bố áp dụng (F28.02) | Nháp → Chờ soát xét → Chờ phê duyệt → Đã phê duyệt → Hết hiệu lực (khi có phiên bản mới) | **LĐV** |
| Sự cố ATTT (F28.03) | Mới → Đang khống chế → Đang điều tra → Đang khắc phục → Chờ kết luận → Đã đóng / Hủy | LĐV (mức Cao, Rất cao) · PT.ATTT (mức Thấp, Trung bình) |
| Yêu cầu quyền truy cập (F28.04) | Đề nghị → Chờ phê duyệt → Đã phê duyệt → Đã thực hiện → Từ chối / Đã thu hồi | PT.ATTT hoặc LĐV (theo mức nhạy cảm) |

Mọi nhánh **Từ chối · Hủy · Không phê duyệt** bắt buộc ghi lý do. Mọi thao tác đều ghi nhật ký: ai, khi nào, nội dung thay đổi.

---

## 7. KIỂM SOÁT RỦI RO

- Rủi ro an toàn thông tin **không gắn với tài sản thông tin** trong danh mục ETV.MP27 → **không cho lưu**
- Rủi ro tồn dư **R ≥ 7** đóng mà **chưa có văn bản chấp nhận của LĐV** → **chặn thao tác đóng**
- **SoA thiếu lý do loại trừ** đối với kiểm soát ghi "Loại trừ" → **không phê duyệt**
- Kiểm soát ghi **"Áp dụng"** nhưng quá hạn cam kết mà **không có bằng chứng thực hiện** → lập KPH theo ETV.MP13
- Cấp quyền truy cập **không có phiếu F28.04 đã phê duyệt** → vi phạm nghiêm trọng; QTHT phải từ chối thực hiện
- Tài khoản của nhân sự đã nghỉ việc/chuyển công tác **chưa thu hồi trong ngày làm việc** → cảnh báo LĐV; chưa thu hồi thì **không hoàn tất thủ tục thôi việc** (ETV.MP03)
- **Dùng chung tài khoản, chia sẻ mật khẩu, cho mượn USB token chữ ký số** → cấm tuyệt đối
- Dữ liệu mức **Hạn chế/Mật** lọt vào chỉ mục AI hoặc lên dịch vụ đám mây cá nhân → **cấm tuyệt đối**; phát hiện phải gỡ ngay, mở sự cố và lập KPH
- **Xóa nhật ký, thư điện tử hoặc bằng chứng** liên quan sự cố đang xử lý → vi phạm nghiêm trọng, xử lý theo quy chế của Viện
- Người liên quan trực tiếp tới sự cố **tự kết luận và đóng sự cố đó** → **chặn cứng**
- Sự cố mức **Cao trở lên** đóng mà **chưa lập bài học kinh nghiệm** (ETV.MP26) → **chặn thao tác đóng**
- Sự cố ảnh hưởng hiệu lực kết quả đo/chứng chỉ mà **không kích hoạt ETV.MP10/ETV.MP11** → **không được đóng**
- Đưa dữ liệu thật của khách hàng vào môi trường kiểm thử khi **chưa ẩn danh hoặc chưa được LĐV phê duyệt** → **không chấp nhận**
- Đánh giá rủi ro **quá 12 tháng chưa rà soát** → cảnh báo LĐV và đưa vào báo cáo xem xét của lãnh đạo

---

## 8. HƯỚNG DẪN, BIỂU MẪU ÁP DỤNG

- **ETV.P.F28.01** – Hồ sơ đánh giá và xử lý rủi ro an toàn thông tin (kèm Kế hoạch xử lý rủi ro)
- **ETV.P.F28.02** – Tuyên bố áp dụng (SoA)
- **ETV.P.F28.03** – Phiếu sự cố an toàn thông tin
- **ETV.P.F28.04** – Phiếu yêu cầu cấp/thay đổi/thu hồi quyền truy cập

Các hoạt động sau **sử dụng lại** biểu mẫu của thủ tục chuyên trách, không lập biểu mẫu mới:

| Hoạt động | Biểu mẫu sử dụng |
|---|---|
| Cam kết bảo mật của nhân sự, bên thứ ba, khách tham quan | ETV.P.F02.01 · F02.02 · F02.04 (ETV.MP02) |
| Hành động khắc phục sau sự cố | ETV.P.F01.01 (ETV.MP01/MP13) |
| Đào tạo nhận thức an toàn thông tin | Bộ ETV.P.F03.05.x (ETV.MP03) |
| Đánh giá nhà cung cấp dịch vụ công nghệ thông tin | ETV.P.F06.01 · F06.02 (ETV.MP06) |
| Bài học kinh nghiệm sau sự cố | ETV.P.F26.02 (ETV.MP26) |
| Danh mục tài sản thông tin | Danh mục tài sản của ETV.MP27 |
| Phân quyền xem tài liệu và thời hạn lưu hồ sơ | ETV.P.F14.06 (ETV.MP14, ETV.MP15) |

---

## 9. LƯU TRỮ HỒ SƠ

| Hồ sơ | Người lưu | Thời hạn lưu |
|---|---|---|
| Chính sách an toàn thông tin và các phiên bản | QLCL | Vĩnh viễn (bản hiện hành và các phiên bản) |
| Hồ sơ đánh giá và xử lý rủi ro ATTT (F28.01), gồm RTP | PT.ATTT | Vĩnh viễn trên ManLab (giữ đủ các phiên bản) |
| Tuyên bố áp dụng (F28.02) và các phiên bản | PT.ATTT | Vĩnh viễn trên ManLab |
| Văn bản chấp nhận rủi ro tồn dư của LĐV | QLCL | Theo vòng đời của rủi ro tương ứng, tối thiểu 10 năm |
| Phiếu sự cố ATTT (F28.03) và hồ sơ điều tra | PT.ATTT | 10 năm kể từ ngày đóng sự cố |
| Bằng chứng thông báo sự cố cho khách hàng/cơ quan có thẩm quyền | QLCL | 10 năm |
| Phiếu yêu cầu cấp/thay đổi/thu hồi quyền truy cập (F28.04) | QTHT, sao gửi PT.ATTT | 05 năm sau khi quyền được thu hồi |
| Biên bản rà soát quyền truy cập định kỳ | PT.ATTT | 05 năm |
| Nhật ký hệ thống, nhật ký truy cập thông tin Hạn chế/Mật | QTHT | Tối thiểu 12 tháng (dài hơn nếu pháp luật/hợp đồng yêu cầu) |
| Kết quả kiểm tra phục hồi dữ liệu | QTHT | 05 năm |
| Báo cáo tình trạng ISMS phục vụ xem xét của lãnh đạo | PT.ATTT, QLCL | Theo ETV.MP17 |
| Hồ sơ đào tạo nhận thức ATTT | QLCL | Theo ETV.MP03 |

**Toàn bộ hồ sơ có liên quan được lưu trữ theo thủ tục ETV.MP15 (Kiểm soát hồ sơ) và ETV.MP14 (Kiểm soát tài liệu).**

---

> **Ghi chú số hóa (AI):** Bản lần ban hành 01 do AI hỗ trợ soạn thảo theo skill kiểm soát tài liệu `01-s-kiem-soat-tai-lieu-etv`, trên cơ sở khung thủ tục chuẩn của Viện (tham chiếu ETV.P26) và tập kiểm soát tham chiếu của ISO/IEC 27001:2022. Thông tin Biên soạn/Soát xét/Phê duyệt và ngày ban hành do người dùng cung cấp trực tiếp trong phiên làm việc — **AI không tự phê duyệt, không tự ký số, không tự cấp số hiệu chính thức**. Trước khi công bố áp dụng, đề nghị: (1) LĐP/LĐV soát xét toàn văn; (2) QLCL xác nhận hiệu lực các văn bản pháp luật viện dẫn tại mục 3.2; (3) rà soát ranh giới với ETV.MP02 mục 6.9 và ETV.MP27 theo ghi chú tại mục 1.4. File Markdown này là bản số hóa để đồng bộ vào ManLab/tri thức nội bộ, không thay thế bản ký thật lưu theo ETV.MP15.
