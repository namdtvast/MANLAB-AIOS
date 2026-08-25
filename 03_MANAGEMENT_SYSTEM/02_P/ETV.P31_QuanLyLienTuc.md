---
doc_id: ETV.P31
doc_name: Thủ tục Quản lý tính liên tục hoạt động
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

# THỦ TỤC QUẢN LÝ TÍNH LIÊN TỤC HOẠT ĐỘNG

**Procedure For Business Continuity Management**

**Mã số:** ETV.MP 31  
**Lần ban hành:** 01  
**Ngày ban hành:** ..../..../........

## THEO DÕI SỬA ĐỔI TÀI LIỆU

| Ngày soát xét | Lý do soát xét, ban hành lại | Lần ban hành |
|---|---|---|
| 25/08/2026 | Dự thảo lần đầu, trình soát xét (chưa ban hành) | 01 |

---

## 1. MỤC ĐÍCH, PHẠM VI ÁP DỤNG

### 1.1. Mục đích

Thủ tục này quy định thống nhất cách thức **phân tích tác động nghiệp vụ, lập kế hoạch, diễn tập, kích hoạt, khôi phục và rút kinh nghiệm** đối với các tình huống gián đoạn hoạt động của Viện ETV, cụ thể để:

- Bảo đảm Viện **duy trì hoặc khôi phục** các quá trình trọng yếu trong thời gian đã cam kết khi xảy ra gián đoạn về con người, mặt bằng, thiết bị, hạ tầng, hệ thống thông tin, dữ liệu hoặc nhà cung cấp
- Xác định rõ **quá trình trọng yếu**, **thời gian gián đoạn tối đa chấp nhận được (MTPD)**, **mục tiêu thời gian khôi phục (RTO)** và **mục tiêu điểm khôi phục dữ liệu (RPO)** cho từng quá trình — thay cho cách nói chung chung "phải khôi phục sớm nhất"
- Bảo đảm **sẵn sàng công nghệ thông tin** cho tính liên tục và bảo đảm **an toàn thông tin được duy trì trong suốt thời gian gián đoạn** (ISO/IEC 27001 A.5.29, A.5.30)
- Bảo đảm gián đoạn **không dẫn tới việc phát hành kết quả không đủ độ tin cậy**; mọi công việc bị ảnh hưởng đều được rà soát về hiệu lực trước khi tiếp tục
- Bảo đảm năng lực khôi phục là **đã được kiểm chứng bằng diễn tập**, không phải chỉ tồn tại trên giấy — bản sao lưu chưa từng được thử phục hồi thì không được coi là phương án khôi phục
- Bảo đảm cam kết với khách hàng và nghĩa vụ thông báo tới cơ quan quản lý, tổ chức công nhận được thực hiện đúng trong tình huống gián đoạn

### 1.2. Phạm vi áp dụng

Áp dụng cho toàn bộ đơn vị, phòng ban, cá nhân thuộc Viện ETV và cho **mọi tình huống gián đoạn** thuộc các nhóm sau:

| Nhóm gián đoạn | Ví dụ |
|---|---|
| Con người | Mất nhân sự chủ chốt (người ký kết quả, người phụ trách kỹ thuật), dịch bệnh, nghỉ việc đồng loạt |
| Mặt bằng và cơ sở vật chất | Cháy nổ, ngập lụt, mất điện kéo dài, hỏng hệ thống điều hòa làm mất điều kiện môi trường phòng thí nghiệm, không tiếp cận được trụ sở |
| Thiết bị và chuẩn đo lường | Hỏng thiết bị chính không có dự phòng, mất/hỏng chuẩn tham chiếu, chuẩn quá hạn hiệu chuẩn mà chưa có phương án thay thế |
| Hệ thống thông tin và nền tảng số | Mất ManLab, mất máy chủ, mất kết nối mạng, sự cố mã hóa tống tiền, nhà cung cấp dịch vụ đám mây ngừng hoạt động |
| Dữ liệu | Mất, hỏng hoặc không truy cập được dữ liệu đo, hồ sơ kỹ thuật, dữ liệu khách hàng |
| Chuỗi cung ứng và dịch vụ bên ngoài | Nhà thầu phụ ngừng cung cấp phép thử, tổ chức hiệu chuẩn bên ngoài ngừng dịch vụ, đứt nguồn cung hóa chất/chất chuẩn |
| Bên ngoài, bất khả kháng | Thiên tai, sự kiện xã hội, quyết định hành chính làm gián đoạn hoạt động |

Dữ liệu được quản lý thống nhất trên phần mềm ManLab (Module M31 – Quản lý tính liên tục hoạt động).

### 1.3. Nguyên tắc "kế hoạch chưa diễn tập là kế hoạch chưa có"

Một phương án khôi phục chỉ được ghi nhận là **có hiệu lực** khi đã được kiểm chứng bằng diễn tập hoặc bằng một lần kích hoạt thật có ghi nhận kết quả, trong chu kỳ quy định tại mục 5.4.2. Phương án quá hạn diễn tập bị gắn cờ **Chưa kiểm chứng** và **không** được viện dẫn làm bằng chứng đáp ứng yêu cầu liên tục hoạt động cho bất kỳ thủ tục nào khác.

Kế hoạch duy trì liên tục hoạt động là **kế hoạch hành động**, **không phải kho tài liệu kỹ thuật**. Kế hoạch chỉ ghi **ngưỡng kích hoạt, đội ứng phó, các bước, nguồn lực và đường dẫn** tới nội dung gốc: quy trình sao lưu kỹ thuật theo ETV.MP27/MP34, hồ sơ thiết bị theo ETV.MP05, hồ sơ nhà cung cấp theo ETV.MP06.

### 1.4. Ngoài phạm vi

Thủ tục này **không** thay thế và **không** trùng lặp với:

| Nội dung | Thuộc thủ tục |
|---|---|
| Cơ chế sao lưu, lưu trữ, vòng đời và phục hồi dữ liệu về mặt kỹ thuật | ETV.MP27 – Quản trị dữ liệu và tài sản thông tin · ETV.MP34 – Quản lý dữ liệu số |
| Phân loại, điều tra, xử lý và đóng **sự cố an toàn thông tin** | ETV.MP28 – Quản lý an toàn thông tin |
| Hạ tầng công nghệ thông tin, máy chủ, mạng, thiết bị đầu cuối | ETV.MP33 – Quản lý hệ thống thông tin |
| Đăng ký, giám sát tình trạng và ngừng vận hành nền tảng số | ETV.MP35 – Quản lý nền tảng số |
| Thay đổi **có chủ đích** đối với hệ thống quản lý và hoạt động | ETV.MP30 – Quản lý thay đổi |
| Sự không phù hợp và hành động khắc phục sau gián đoạn | ETV.MP13 – Khắc phục, cải tiến |
| Kết luận về hiệu lực kết quả đo bị ảnh hưởng và xử lý kết quả đã phát hành | ETV.MP10 – Đảm bảo giá trị sử dụng kết quả · ETV.MP11 – Báo cáo kết quả |
| Đánh giá và xử lý rủi ro (bao gồm rủi ro gián đoạn) | ETV.MP01 – Rủi ro và cơ hội |
| Điều kiện môi trường phòng thí nghiệm trong điều kiện bình thường | ETV.MP04 – Quản lý điều kiện môi trường |
| Hồ sơ thiết bị, hiệu chuẩn, kiểm tra trung gian | ETV.MP05 – Quản lý thiết bị |
| Đánh giá, lựa chọn và thay thế nhà cung cấp | ETV.MP06 – Quản lý mua sắm |
| Thông báo và thương lượng lại với khách hàng về hợp đồng | ETV.MP07 – Xem xét yêu cầu, đề nghị và hợp đồng |
| Bài học kinh nghiệm rút ra sau gián đoạn | ETV.MP26 – Quản lý tri thức tổ chức |

> **Phân biệt cốt lõi:** ETV.MP28 trả lời "chuyện gì đã xảy ra với an toàn thông tin và xử lý ra sao"; ETV.MP31 trả lời "Viện có tiếp tục làm việc được không và khôi phục trong bao lâu". Một sự cố mã hóa tống tiền kích hoạt **cả hai** — ETV.MP28 điều tra và xử lý sự cố, ETV.MP31 quyết định chuyển sang phương thức làm việc dự phòng và khôi phục dịch vụ.

---

## 2. THUẬT NGỮ, ĐỊNH NGHĨA VÀ CHỮ VIẾT TẮT

### 2.1. Thuật ngữ và định nghĩa

**Gián đoạn (Disruption)**  
Sự việc làm cho một hoặc nhiều quá trình của Viện không thể thực hiện được theo cách thông thường, không phụ thuộc nguyên nhân.

**Quá trình trọng yếu (Critical process)**  
Quá trình mà việc gián đoạn gây hậu quả không chấp nhận được đối với khách hàng, nghĩa vụ pháp lý, hiệu lực kết quả hoặc uy tín của Viện; được xác định qua Phân tích tác động nghiệp vụ.

**Phân tích tác động nghiệp vụ (Business Impact Analysis — BIA)**  
Việc xác định các quá trình của Viện, hậu quả nếu chúng bị gián đoạn theo thời gian, các nguồn lực tối thiểu cần thiết để duy trì chúng, và từ đó xác định MTPD, RTO, RPO.

**Thời gian gián đoạn tối đa chấp nhận được (MTPD)**  
Khoảng thời gian dài nhất mà một quá trình có thể ngừng trước khi hậu quả trở nên không thể chấp nhận được.

**Mục tiêu thời gian khôi phục (RTO)**  
Khoảng thời gian mục tiêu để khôi phục một quá trình về mức hoạt động tối thiểu chấp nhận được, tính từ thời điểm gián đoạn. RTO luôn **ngắn hơn** MTPD.

**Mục tiêu điểm khôi phục (RPO)**  
Lượng dữ liệu tối đa (tính theo thời gian) mà Viện chấp nhận mất khi khôi phục — quyết định tần suất sao lưu tối thiểu.

**Mức hoạt động tối thiểu chấp nhận được (Minimum acceptable level)**  
Mức năng lực mà quá trình phải đạt trong thời gian chưa khôi phục hoàn toàn, ghi rõ khối lượng, phạm vi phép thử và điều kiện chất lượng còn được bảo đảm.

**Kế hoạch duy trì liên tục hoạt động (BCP)**  
Tập hợp các phương án hành động cho từng kịch bản gián đoạn: ngưỡng kích hoạt, đội ứng phó, các bước xử lý, nguồn lực dự phòng, cách thức thông tin liên lạc và tiêu chí tuyên bố kết thúc.

**Kịch bản gián đoạn (Disruption scenario)**  
Một tình huống gián đoạn giả định cụ thể, dùng làm cơ sở lập phương án và tổ chức diễn tập.

**Ngưỡng kích hoạt (Activation threshold)**  
Điều kiện định lượng hoặc định tính mà khi vượt qua thì kế hoạch được kích hoạt, ví dụ mất hệ thống thông tin quá 04 giờ trong giờ làm việc.

**Đội ứng phó gián đoạn (Continuity Response Team — ĐUP)**  
Nhóm nhân sự được chỉ định trước, có người chỉ huy và người thay thế, chịu trách nhiệm xử lý gián đoạn khi kế hoạch được kích hoạt.

**Diễn tập (Exercise)**  
Hoạt động kiểm chứng kế hoạch, gồm ba hình thức: **diễn tập trên giấy** (rà soát theo kịch bản), **diễn tập mô phỏng** (thực hiện một phần thao tác thật), **diễn tập thực tế** (chuyển đổi thật sang phương án dự phòng).

**Kiểm chứng phục hồi (Restore test)**  
Việc phục hồi thật một bản sao lưu vào môi trường kiểm thử và xác nhận dữ liệu đọc được, đúng và đủ. Kiểm tra "sao lưu chạy thành công" **không** phải kiểm chứng phục hồi.

**Kích hoạt (Activation)**  
Quyết định chính thức chuyển sang vận hành theo kế hoạch duy trì liên tục hoạt động.

**Trở lại bình thường (Return to normal)**  
Việc chấm dứt trạng thái vận hành dự phòng và quay lại phương thức hoạt động thông thường, sau khi đã rà soát hiệu lực của các công việc thực hiện trong thời gian gián đoạn.

### 2.2. Chữ viết tắt

| Chữ viết tắt | Ý nghĩa |
|---|---|
| LĐV | Lãnh đạo Viện |
| QLCL | Phụ trách Quản lý chất lượng |
| QTHT | Quản trị hệ thống |
| TP | Trưởng phòng/Người phụ trách lĩnh vực |
| ĐUP | Đội ứng phó gián đoạn |
| CHUP | Người chỉ huy ứng phó |
| PT.ATTT | Người phụ trách an toàn thông tin |
| BIA | Phân tích tác động nghiệp vụ |
| BCP | Kế hoạch duy trì liên tục hoạt động |
| MTPD | Thời gian gián đoạn tối đa chấp nhận được |
| RTO | Mục tiêu thời gian khôi phục |
| RPO | Mục tiêu điểm khôi phục dữ liệu |
| BoA | Văn phòng Công nhận Chất lượng |

---

## 3. TÀI LIỆU VIỆN DẪN

### 3.1. Tiêu chuẩn quốc tế

- **ISO/IEC 27001:2022** (Điều 6.1 Hành động giải quyết rủi ro và cơ hội; 8.1 Hoạch định và kiểm soát vận hành; 9.1 Theo dõi, đo lường; A.5.29 An toàn thông tin trong gián đoạn; A.5.30 Sẵn sàng công nghệ thông tin cho tính liên tục hoạt động; A.7.5 Bảo vệ trước các mối đe dọa vật lý và môi trường; A.7.11 Tiện ích hỗ trợ; A.8.13 Sao lưu thông tin; A.8.14 Dự phòng phương tiện xử lý thông tin)
- **ISO 22301:2019** — hệ thống quản lý tính liên tục hoạt động *(dùng làm tài liệu tham khảo về phương pháp BIA, RTO/RPO và diễn tập; **không** phải tiêu chuẩn Viện đăng ký chứng nhận)*
- **ISO 9001:2015** (Điều 6.1 Hành động giải quyết rủi ro và cơ hội; 7.1.3 Cơ sở hạ tầng; 7.1.4 Môi trường vận hành quá trình; 8.1 Hoạch định và kiểm soát vận hành; 8.4 Kiểm soát bên ngoài cung cấp; 9.3 Xem xét của lãnh đạo)
- **ISO/IEC 17025:2017** (Điều 6.3 Cơ sở vật chất và điều kiện môi trường; 6.4 Thiết bị; 6.6 Sản phẩm và dịch vụ do bên ngoài cung cấp; 7.10 Công việc không phù hợp; 7.11 Kiểm soát dữ liệu và quản lý thông tin — bao gồm bảo vệ và sao lưu dữ liệu; 8.5 Hành động giải quyết rủi ro và cơ hội)
- **ISO 17034:2016** (Điều 7.4 Kiểm soát dữ liệu; 7.7 Bảo quản, lưu giữ mẫu chuẩn; 8.5 Rủi ro và cơ hội)
- **ISO/IEC 42001:2023** (Điều 6.1 Rủi ro liên quan hệ thống AI; 8.1 Kiểm soát vận hành hệ thống AI — bao gồm phương án khi hệ thống AI không khả dụng)

### 3.2. Văn bản pháp luật

*(Chỉ dẫn chiếu — không chép nội dung. Bản đầy đủ lưu tại `08_KNOWLEDGE_GRAPH/01_Regulations/`. QLCL rà soát hiệu lực và văn bản thay thế trước mỗi lần ban hành lại.)*

- **Luật An toàn thông tin mạng số 86/2015/QH13** — bảo đảm an toàn hệ thống thông tin, ứng cứu sự cố
- **Luật An ninh mạng số 24/2018/QH14** — ứng phó, khắc phục sự cố an ninh mạng
- **Nghị định 85/2016/NĐ-CP** — bảo đảm an toàn hệ thống thông tin theo cấp độ, bao gồm yêu cầu về phương án dự phòng và ứng cứu *(và văn bản hướng dẫn hiện hành)*
- **Nghị định 13/2023/NĐ-CP** — bảo vệ dữ liệu cá nhân, nghĩa vụ thông báo khi xảy ra vi phạm
- **Luật Đo lường số 04/2011/QH13**; **Nghị định 105/2016/NĐ-CP**; **Nghị định 154/2018/NĐ-CP** — nghĩa vụ duy trì điều kiện hoạt động và thông báo khi không còn đáp ứng điều kiện đã đăng ký, đã chỉ định
- **Bộ luật Lao động số 45/2019/QH14** — bố trí lao động, làm việc từ xa, ngừng việc trong tình huống bất khả kháng

### 3.3. Văn bản nội bộ Viện ETV

- Sổ tay quản lý chất lượng (ETV.QM)
- Thủ tục ETV.MP01 – Quản lý rủi ro và cơ hội
- Thủ tục ETV.MP03 – Quản lý nhân sự
- Thủ tục ETV.MP04 – Quản lý điều kiện môi trường
- Thủ tục ETV.MP05 – Quản lý thiết bị
- Thủ tục ETV.MP06 – Quản lý mua sắm
- Thủ tục ETV.MP07 – Xem xét yêu cầu, đề nghị và hợp đồng
- Thủ tục ETV.MP10 – Đảm bảo giá trị sử dụng kết quả
- Thủ tục ETV.MP11 – Báo cáo kết quả
- Thủ tục ETV.MP12 – Khiếu nại
- Thủ tục ETV.MP13 – Khắc phục, cải tiến
- Thủ tục ETV.MP14 – Kiểm soát tài liệu
- Thủ tục ETV.MP15 – Kiểm soát hồ sơ
- Thủ tục ETV.MP16 – Đánh giá nội bộ
- Thủ tục ETV.MP17 – Xem xét của lãnh đạo
- Thủ tục ETV.MP25 – Quản lý bối cảnh tổ chức và các bên quan tâm
- Thủ tục ETV.MP26 – Quản lý tri thức tổ chức
- Thủ tục ETV.MP27 – Quản trị dữ liệu và tài sản thông tin
- Thủ tục ETV.MP28 – Quản lý an toàn thông tin
- Thủ tục ETV.MP29 – Quản lý hệ thống trí tuệ nhân tạo
- Thủ tục ETV.MP30 – Quản lý thay đổi
- Thủ tục ETV.MP33 – Quản lý hệ thống thông tin
- Thủ tục ETV.MP34 – Quản lý dữ liệu số
- Thủ tục ETV.MP35 – Quản lý nền tảng số

---

## 4. TRÁCH NHIỆM

### 4.1. Lãnh đạo Viện (LĐV)

- **Phê duyệt** kết quả Phân tích tác động nghiệp vụ, giá trị MTPD/RTO/RPO và Kế hoạch duy trì liên tục hoạt động
- Chỉ định **Người chỉ huy ứng phó** và người thay thế; phê duyệt danh sách Đội ứng phó gián đoạn
- **Quyết định kích hoạt** kế hoạch đối với gián đoạn Mức B, Mức C (mục 5.5.1) và **quyết định tuyên bố trở lại bình thường**
- Quyết định việc thông báo tới khách hàng, cơ quan quản lý nhà nước, tổ chức công nhận trong thời gian gián đoạn
- Bảo đảm nguồn lực cho phương án dự phòng và cho diễn tập
- Xem xét tình hình liên tục hoạt động trong cuộc họp xem xét của lãnh đạo (ETV.MP17)

### 4.2. Phụ trách Quản lý chất lượng (QLCL)

- Chủ trì tổ chức Phân tích tác động nghiệp vụ (F31.01) và duy trì Kế hoạch duy trì liên tục hoạt động (F31.02)
- Lập kế hoạch diễn tập năm, tổ chức diễn tập và lưu biên bản (F31.03)
- Theo dõi phương án **quá hạn diễn tập**, quá hạn kiểm chứng phục hồi; báo cáo LĐV
- Chủ trì rà soát **hiệu lực công việc thực hiện trong thời gian gián đoạn** trước khi tuyên bố trở lại bình thường
- Lập sự không phù hợp theo ETV.MP13 khi RTO/RPO bị vượt; tổng hợp bài học kinh nghiệm theo ETV.MP26
- Tổng hợp báo cáo phục vụ xem xét của lãnh đạo; lưu trữ hồ sơ theo ETV.MP15

### 4.3. Người chỉ huy ứng phó (CHUP)

- **Điều hành** Đội ứng phó khi kế hoạch được kích hoạt; phân công nhiệm vụ và quyết định thứ tự ưu tiên khôi phục
- Đề xuất LĐV kích hoạt, nâng mức hoặc kết thúc trạng thái ứng phó
- Bảo đảm **nhật ký gián đoạn (F31.04)** được ghi liên tục trong suốt thời gian ứng phó
- Là đầu mối thông tin nội bộ trong thời gian gián đoạn

### 4.4. Trưởng phòng/Người phụ trách lĩnh vực (TP)

- Cung cấp dữ liệu đầu vào cho BIA của các quá trình thuộc phạm vi phụ trách
- Xác định **mức hoạt động tối thiểu chấp nhận được** và nguồn lực tối thiểu của quá trình mình phụ trách
- Tổ chức thực hiện phương án dự phòng trong phòng; báo cáo tiến độ khôi phục cho CHUP
- Xác định danh sách công việc, mẫu, kết quả bị ảnh hưởng để rà soát theo mục 5.6.2

### 4.5. Quản trị hệ thống (QTHT) và Người phụ trách an toàn thông tin (PT.ATTT)

- Bảo đảm sao lưu được thực hiện đúng tần suất đáp ứng RPO đã phê duyệt (cơ chế kỹ thuật theo ETV.MP27/MP34)
- Thực hiện **kiểm chứng phục hồi** theo chu kỳ tại mục 5.4.3 và lưu bằng chứng
- Thực hiện chuyển đổi sang hệ thống dự phòng theo quyết định của CHUP/LĐV
- Bảo đảm **mức bảo vệ an toàn thông tin không bị hạ thấp** trong thời gian vận hành dự phòng (ISO/IEC 27001 A.5.29); mọi nới lỏng kiểm soát phải có phê duyệt của LĐV, có thời hạn và được ghi nhật ký

### 4.6. Nhân viên

- Nắm rõ phương án dự phòng áp dụng cho công việc của mình và đầu mối liên lạc khi gián đoạn
- Tham gia diễn tập theo kế hoạch
- Báo cáo ngay cho TP/CHUP khi phát hiện dấu hiệu gián đoạn
- **Không** tự ý dùng thiết bị, phần mềm hoặc kênh trao đổi ngoài phương án đã phê duyệt để "chữa cháy"

> **Nguyên tắc tách vai trò:** Người lập BIA/BCP ≠ người phê duyệt. Người thực hiện kiểm chứng phục hồi ≠ người xác nhận kết quả kiểm chứng. Trợ lý AI **không** được quyết định kích hoạt, **không** được kết luận về hiệu lực kết quả bị ảnh hưởng và **không** được tự thực hiện thao tác khôi phục trên hệ thống vận hành (ISO/IEC 42001; ETV.MP29). Kế hoạch phải vận hành được **kể cả khi hệ thống AI và ManLab không khả dụng** — bắt buộc có bản in hoặc bản ngoại tuyến theo mục 5.3.4.

---

## 5. NỘI DUNG

### 5.1. Phân tích tác động nghiệp vụ (Biểu mẫu F31.01)

#### 5.1.1. Chu kỳ thực hiện

BIA được lập lần đầu khi ban hành thủ tục này và rà soát lại **12 tháng/lần**, hoặc sớm hơn khi: thay đổi cơ cấu tổ chức, thay đổi địa điểm, bổ sung/rút phép thử khỏi phạm vi công nhận, thay đổi lớn về hệ thống thông tin (ETV.MP30), hoặc sau mỗi lần kích hoạt kế hoạch thật.

#### 5.1.2. Nội dung phân tích

Với **từng quá trình** của Viện, xác định:

| Nội dung | Yêu cầu |
|---|---|
| Mô tả quá trình | Đầu vào, đầu ra, đơn vị chủ trì |
| Hậu quả theo thời gian gián đoạn | Đánh giá tại các mốc: 04 giờ · 24 giờ · 03 ngày · 07 ngày · 30 ngày |
| Loại hậu quả | Hợp đồng và tài chính · Nghĩa vụ pháp lý và điều kiện hoạt động · Hiệu lực kết quả và an toàn của bên sử dụng kết quả · Uy tín và phạm vi công nhận |
| MTPD | Thời điểm hậu quả trở nên không chấp nhận được |
| RTO | Mục tiêu khôi phục, phải ngắn hơn MTPD |
| RPO | Lượng dữ liệu tối đa chấp nhận mất |
| Mức hoạt động tối thiểu | Khối lượng, phạm vi phép thử và điều kiện chất lượng còn bảo đảm trong thời gian dự phòng |
| Nguồn lực tối thiểu | Nhân sự (vai trò, số người, người thay thế), thiết bị và chuẩn, mặt bằng, hệ thống thông tin, dữ liệu, nhà cung cấp |
| Phụ thuộc | Quá trình khác, nền tảng số (ETV.MP35), nhà cung cấp (ETV.MP06) mà quá trình này phụ thuộc |

#### 5.1.3. Xếp hạng trọng yếu

| Hạng | Tiêu chí | Hệ quả bắt buộc |
|---|---|---|
| **Trọng yếu cao** | MTPD ≤ 24 giờ; hoặc gián đoạn ảnh hưởng hiệu lực kết quả đã/đang phát hành; hoặc ảnh hưởng điều kiện duy trì phạm vi công nhận/chỉ định | Bắt buộc có phương án dự phòng đã kiểm chứng; diễn tập ≤ 12 tháng/lần; ≥ 01 rủi ro mở tại ETV.MP01 |
| **Trọng yếu trung bình** | MTPD từ trên 24 giờ đến 07 ngày | Bắt buộc có phương án dự phòng; diễn tập ≤ 24 tháng/lần |
| **Không trọng yếu** | MTPD > 07 ngày | Ghi nhận trong BIA; không bắt buộc phương án riêng |

Khi có nghi ngờ giữa hai hạng, **xếp vào hạng cao hơn**. Kết quả BIA do **LĐV phê duyệt** và là **đầu vào bắt buộc** cho ETV.MP01.

#### 5.1.4. Liên kết với đánh giá rủi ro an toàn thông tin

Rủi ro an toàn thông tin có mức tác động tới **tính sẵn sàng ≥ 4** theo ETV.MP28 là **đầu vào bắt buộc** cho BIA và cho kế hoạch tại mục 5.3. Ngược lại, quá trình xếp hạng **Trọng yếu cao** ở thủ tục này phải có tài sản thông tin tương ứng được nhận diện tại ETV.MP27 và được xem xét trong đánh giá rủi ro của ETV.MP28.

### 5.2. Kịch bản gián đoạn bắt buộc

Viện xây dựng phương án cho **tối thiểu** các kịch bản sau; mỗi kịch bản là một phần của F31.02:

| Mã | Kịch bản | Nội dung tối thiểu của phương án |
|---|---|---|
| KB-01 | Mất mặt bằng làm việc/phòng thí nghiệm (cháy, ngập, không tiếp cận được) | Địa điểm dự phòng, thứ tự di dời thiết bị và mẫu, điều kiện môi trường tối thiểu, xử lý mẫu đang lưu |
| KB-02 | Mất điện hoặc mất tiện ích hỗ trợ kéo dài | Nguồn dự phòng, thứ tự ưu tiên cấp điện cho tủ bảo quản mẫu/chất chuẩn và thiết bị đang đo, ngưỡng dừng phép đo |
| KB-03 | Mất hệ thống thông tin/ManLab | Phương thức làm việc ngoại tuyến, biểu mẫu giấy thay thế, cách nhập bù dữ liệu và bảo đảm truy vết khi hệ thống trở lại |
| KB-04 | Mất hoặc hỏng dữ liệu | Nguồn sao lưu sử dụng, trình tự phục hồi, cách xác định khoảng dữ liệu mất so với RPO, cách xử lý công việc trong khoảng đó |
| KB-05 | Sự cố mã hóa tống tiền hoặc xâm nhập trái phép | Cách ly hệ thống, phối hợp bắt buộc với ETV.MP28, điều kiện phục hồi từ bản sao lưu sạch, **không** khôi phục vào hệ thống chưa được xác nhận sạch |
| KB-06 | Hỏng/mất thiết bị chính hoặc chuẩn tham chiếu | Thiết bị thay thế, thuê ngoài hoặc chuyển phép thử cho nhà thầu phụ đủ năng lực (ETV.MP06), điều kiện tiếp tục phát hành kết quả |
| KB-07 | Mất nhân sự chủ chốt | Người thay thế đã được ủy quyền và đánh giá năng lực trước (ETV.MP03), giới hạn phép thử còn thực hiện được |
| KB-08 | Mất nhà cung cấp/nhà thầu phụ trọng yếu | Nhà cung cấp thay thế đã đánh giá sơ bộ, thời gian chuyển đổi, ảnh hưởng tới cam kết với khách hàng |
| KB-09 | Nhân sự không thể đến trụ sở diện rộng (dịch bệnh, sự kiện xã hội) | Công việc thực hiện từ xa, công việc bắt buộc tại chỗ, bố trí ca luân phiên, điều kiện an toàn thông tin khi làm việc từ xa |

QLCL bổ sung kịch bản khác khi BIA hoặc ETV.MP01, ETV.MP25 chỉ ra nguy cơ mới.

### 5.3. Kế hoạch duy trì liên tục hoạt động (Biểu mẫu F31.02)

#### 5.3.1. Nội dung bắt buộc của mỗi phương án

| Mục | Nội dung |
|---|---|
| Kịch bản áp dụng | Mã và mô tả kịch bản |
| Ngưỡng kích hoạt | Điều kiện định lượng để đề nghị kích hoạt |
| Đội ứng phó | Người chỉ huy, người thay thế, thành viên và vai trò; thông tin liên lạc (kể cả kênh ngoài hệ thống của Viện) |
| Các bước xử lý | Trình tự thao tác theo thứ tự thời gian, ghi rõ ai làm, trong bao lâu |
| Nguồn lực dự phòng | Địa điểm, thiết bị, dữ liệu, nhà cung cấp, kinh phí dự kiến |
| Thứ tự ưu tiên khôi phục | Danh sách quá trình theo hạng trọng yếu và RTO |
| Thông tin liên lạc | Nội bộ; khách hàng; cơ quan quản lý; tổ chức công nhận — ai soạn, ai duyệt, ai gửi |
| Tiêu chí kết thúc | Điều kiện tuyên bố trở lại bình thường |
| Điểm không thể phục hồi | Nội dung không có phương án khôi phục (nếu có) — phải nêu rõ và mở rủi ro tại ETV.MP01 |

#### 5.3.2. Duy trì an toàn thông tin trong thời gian gián đoạn

Trong thời gian vận hành dự phòng, **mức bảo vệ an toàn thông tin không được hạ thấp**. Trường hợp buộc phải nới lỏng một kiểm soát để duy trì hoạt động, phải: có **phê duyệt của LĐV**, ghi rõ **kiểm soát bị nới lỏng và biện pháp bù đắp**, ấn định **thời hạn không quá thời gian gián đoạn**, ghi vào **nhật ký gián đoạn** và **khôi phục nguyên trạng ngay khi trở lại bình thường**. Việc nới lỏng kiểm soát được ghi nhận và xử lý đồng thời theo **ETV.MP28**.

#### 5.3.3. Phương án khi hệ thống trí tuệ nhân tạo không khả dụng

Mọi quá trình có sử dụng trợ lý AI phải có phương án thực hiện **không cần AI**. Việc AI không khả dụng **không** được viện dẫn làm lý do chậm trễ hoặc sai sót trong công việc chuyên môn, vì AI không bao giờ là mắt xích ra quyết định cuối cùng (ETV.MP29).

#### 5.3.4. Bản ngoại tuyến của kế hoạch

Kế hoạch và danh sách liên lạc của Đội ứng phó phải có **bản in hoặc bản lưu ngoại tuyến** đặt tại nơi Đội ứng phó tiếp cận được **khi không có mạng và không có ManLab**. QLCL cập nhật bản ngoại tuyến trong **05 ngày làm việc** kể từ mỗi lần kế hoạch được phê duyệt lại. Bản ngoại tuyến chứa dữ liệu cá nhân liên lạc được bảo vệ theo ETV.MP28.

### 5.4. Diễn tập và kiểm chứng (Biểu mẫu F31.03)

#### 5.4.1. Kế hoạch diễn tập năm

QLCL lập kế hoạch diễn tập cho năm kế tiếp trước **31/12** hằng năm, trình LĐV phê duyệt cùng kế hoạch đánh giá nội bộ (ETV.MP16). Kế hoạch nêu rõ: kịch bản, hình thức diễn tập, thời điểm, thành phần tham gia, mục tiêu kiểm chứng (RTO/RPO nào được kiểm chứng).

#### 5.4.2. Tần suất tối thiểu

| Đối tượng | Tần suất | Hình thức tối thiểu |
|---|---|---|
| Kịch bản của quá trình **Trọng yếu cao** | ≤ 12 tháng/lần | Mô phỏng (ít nhất 01 kịch bản/năm phải là diễn tập thực tế) |
| Kịch bản của quá trình **Trọng yếu trung bình** | ≤ 24 tháng/lần | Trên giấy |
| Danh sách liên lạc Đội ứng phó | ≤ 06 tháng/lần | Gọi kiểm tra thực tế |
| Kịch bản KB-03, KB-04, KB-05 (hệ thống thông tin và dữ liệu) | ≤ 12 tháng/lần | Mô phỏng có kiểm chứng phục hồi thật |

Một lần **kích hoạt thật** có ghi nhật ký đầy đủ và có biên bản rút kinh nghiệm được tính thay cho một lần diễn tập của kịch bản tương ứng.

#### 5.4.3. Kiểm chứng phục hồi dữ liệu

- QTHT thực hiện kiểm chứng phục hồi **≤ 06 tháng/lần** đối với dữ liệu phục vụ quá trình Trọng yếu cao, **≤ 12 tháng/lần** đối với dữ liệu còn lại.
- Kiểm chứng phải phục hồi **vào môi trường kiểm thử tách biệt**, xác nhận dữ liệu **đọc được, đúng và đủ**, và đo **thời gian phục hồi thực tế** để đối chiếu RTO.
- Người thực hiện phục hồi và người xác nhận kết quả là **hai người khác nhau**.
- Kết quả kiểm chứng lưu tại F31.03; **không đạt** → lập KPH theo ETV.MP13 và báo cáo LĐV trong **03 ngày làm việc**.

#### 5.4.4. Kết luận diễn tập

Mỗi diễn tập kết thúc bằng biên bản ghi: mục tiêu, diễn biến, **thời gian khôi phục thực tế so với RTO**, **lượng dữ liệu mất thực tế so với RPO**, điểm chưa đạt, hành động cải tiến kèm người chịu trách nhiệm và thời hạn.

Diễn tập cho kết quả **vượt RTO hoặc RPO** → bắt buộc lập KPH theo ETV.MP13 và cập nhật lại kế hoạch hoặc điều chỉnh giá trị RTO/RPO có phê duyệt của LĐV (không được âm thầm nới lỏng mục tiêu để hợp thức hóa kết quả).

### 5.5. Kích hoạt và ứng phó (Biểu mẫu F31.04)

#### 5.5.1. Phân mức gián đoạn và thẩm quyền kích hoạt

| Mức | Tiêu chí | Thẩm quyền kích hoạt | Thời hạn thông báo |
|---|---|---|---|
| **Mức A** | Gián đoạn trong một phòng, dự kiến khắc phục trong RTO, không ảnh hưởng khách hàng | TP (báo cáo QLCL) | Trong ngày làm việc |
| **Mức B** | Gián đoạn ảnh hưởng ≥ 02 phòng, hoặc ảnh hưởng cam kết với khách hàng, hoặc dự kiến vượt RTO | **LĐV** theo đề nghị của CHUP | Ngay khi xác định, không quá **04 giờ** |
| **Mức C** | Gián đoạn ảnh hưởng quá trình Trọng yếu cao; hoặc ảnh hưởng hiệu lực kết quả đã/đang phát hành; hoặc ảnh hưởng điều kiện duy trì phạm vi công nhận/chỉ định; hoặc mất dữ liệu vượt RPO | **LĐV** | **Ngay lập tức** |

#### 5.5.2. Trình tự ứng phó

| Bước | Người thực hiện | Nội dung |
|---|---|---|
| 1 | Người phát hiện | Báo cáo TP/CHUP ngay; mô tả hiện tượng, thời điểm, phạm vi ảnh hưởng |
| 2 | CHUP | Đánh giá sơ bộ, phân mức theo mục 5.5.1, mở nhật ký gián đoạn (F31.04) |
| 3 | LĐV (Mức B, C) | **Quyết định kích hoạt** kế hoạch; chỉ định phương án áp dụng |
| 4 | ĐUP | Thực hiện các bước của phương án; ghi nhật ký liên tục theo mốc thời gian |
| 5 | CHUP | Cập nhật tình hình cho LĐV theo tần suất: Mức C **≤ 04 giờ/lần**, Mức B **≤ 01 ngày/lần** |
| 6 | LĐV/QLCL | Thực hiện nghĩa vụ thông báo bên ngoài theo mục 5.5.4 |
| 7 | CHUP | Đề nghị **trở lại bình thường** khi đạt tiêu chí kết thúc |
| 8 | QLCL | Chủ trì rà soát hiệu lực công việc trong thời gian gián đoạn (mục 5.6.2) |
| 9 | **LĐV** | **Tuyên bố trở lại bình thường** |
| 10 | QLCL | Tổ chức rút kinh nghiệm, lập KPH (nếu có), ghi bài học theo ETV.MP26, đóng nhật ký |

#### 5.5.3. Nội dung bắt buộc của nhật ký gián đoạn

Thời điểm phát hiện · thời điểm kích hoạt · mức gián đoạn · quá trình bị ảnh hưởng · quyết định và người quyết định theo mốc thời gian · nguồn lực huy động · kiểm soát an toàn thông tin bị nới lỏng (nếu có) · thời điểm khôi phục từng quá trình · thời điểm tuyên bố trở lại bình thường.

Nhật ký được ghi **liên tục trong khi ứng phó**, không được lập lại sau khi sự việc kết thúc. Khi ManLab không khả dụng, ghi trên bản giấy và nhập bù trong **03 ngày làm việc** kể từ khi hệ thống trở lại, giữ nguyên bản giấy làm hồ sơ gốc.

#### 5.5.4. Nghĩa vụ thông báo trong thời gian gián đoạn

| Trường hợp | Đầu mối | Thời hạn |
|---|---|---|
| Gián đoạn ảnh hưởng tiến độ, phạm vi hoặc cách thức thực hiện dịch vụ đã ký kết | Khách hàng (ETV.MP07) | Ngay khi xác định ảnh hưởng |
| Gián đoạn ảnh hưởng hiệu lực kết quả, chứng chỉ đã phát hành | Khách hàng và bên nhận kết quả (ETV.MP10, ETV.MP11) | Theo quyết định của LĐV, sau khi ETV.MP10 kết luận |
| Viện tạm thời **không còn đáp ứng điều kiện** đã đăng ký, đã chỉ định | Cơ quan quản lý nhà nước có thẩm quyền | Theo quy định pháp luật hiện hành |
| Gián đoạn ảnh hưởng điều kiện duy trì phạm vi công nhận | Tổ chức công nhận (BoA) | Theo quy định của tổ chức công nhận |
| Gián đoạn là sự cố an toàn thông tin thuộc diện phải báo cáo | Theo ETV.MP28 | Theo ETV.MP28 |
| Gián đoạn gây vi phạm dữ liệu cá nhân | Theo NĐ 13/2023/NĐ-CP và ETV.MP28 | Theo quy định pháp luật hiện hành |

Không cá nhân nào được tự phát ngôn hoặc cung cấp thông tin về gián đoạn ra bên ngoài khi chưa được **LĐV** cho phép.

### 5.6. Trở lại bình thường

#### 5.6.1. Điều kiện

Chỉ tuyên bố trở lại bình thường khi **đồng thời**: nguyên nhân gián đoạn đã được xử lý hoặc kiểm soát; các quá trình đã khôi phục về mức hoạt động thông thường; kiểm soát an toàn thông tin bị nới lỏng đã được khôi phục nguyên trạng; dữ liệu phát sinh trong thời gian dự phòng đã được nhập đủ vào hệ thống chính thức và đối chiếu; và đã hoàn tất rà soát tại mục 5.6.2.

#### 5.6.2. Rà soát hiệu lực công việc thực hiện trong thời gian gián đoạn

Đây là **bước bắt buộc, không được bỏ qua**. QLCL chủ trì cùng TP liên quan rà soát:

| Nội dung rà soát | Xử lý khi có nghi ngờ |
|---|---|
| Phép đo thực hiện trên thiết bị dự phòng hoặc trong điều kiện môi trường ngoài quy định | Kích hoạt **ETV.MP10**; chưa kết luận thì **không phát hành** kết quả liên quan |
| Kết quả đã phát hành trong thời gian gián đoạn | Rà soát theo **ETV.MP11**; thu hồi hoặc phát hành lại nếu cần, theo quyết định của LĐV |
| Phép thử chuyển cho nhà thầu phụ | Kiểm tra năng lực và phạm vi công nhận của nhà thầu phụ (ETV.MP06); ghi rõ trên báo cáo kết quả theo ETV.MP11 |
| Công việc do người thay thế thực hiện | Kiểm tra phạm vi ủy quyền và hồ sơ năng lực (ETV.MP03) |
| Dữ liệu nhập bù từ bản giấy | Đối chiếu 100% với bản gốc đối với dữ liệu của quá trình Trọng yếu cao |
| Mẫu, chất chuẩn bảo quản trong điều kiện không đạt | Đánh giá theo ETV.MP09, ETV.MP19; hủy hoặc lấy lại mẫu nếu không bảo đảm |

Công việc không đủ độ tin cậy được xử lý theo **ETV.MP13** và, nếu là công việc không phù hợp theo ISO/IEC 17025 §7.10, theo quy định tương ứng của **ETV.MP11**.

#### 5.6.3. Rút kinh nghiệm

Trong **15 ngày làm việc** kể từ khi tuyên bố trở lại bình thường, QLCL tổ chức họp rút kinh nghiệm và lập biên bản gồm: diễn biến, thời gian khôi phục thực tế so với RTO/RPO, điều gì trong kế hoạch đã đúng, điều gì sai hoặc thiếu, hành động cải tiến kèm người chịu trách nhiệm và thời hạn.

Gián đoạn **Mức B, Mức C** bắt buộc lập **bài học kinh nghiệm** theo ETV.MP26 và cập nhật lại kế hoạch (F31.02); việc cập nhật kế hoạch thuộc diện thay đổi tài liệu, thực hiện theo ETV.MP14 và ETV.MP30.

### 5.7. Hỗ trợ của trợ lý AI

Trợ lý AI trên ManLab được phép: nhắc phương án quá hạn diễn tập và quá hạn kiểm chứng phục hồi; đối chiếu danh sách quá trình trọng yếu với tài sản thông tin (ETV.MP27) và nền tảng số (ETV.MP35) để phát hiện phụ thuộc chưa có phương án; soạn dự thảo biên bản diễn tập và tổng hợp nhật ký theo mốc thời gian.

Trợ lý AI **không** được quyết định kích hoạt hay kết thúc trạng thái ứng phó, **không** được kết luận về hiệu lực kết quả bị ảnh hưởng, **không** được xác nhận kết quả kiểm chứng phục hồi và **không** được tự thực hiện thao tác khôi phục trên hệ thống vận hành (ETV.MP29).

### 5.8. Báo cáo và xem xét

QLCL tổng hợp **06 tháng/lần** và trước mỗi cuộc họp xem xét của lãnh đạo (ETV.MP17): danh sách quá trình trọng yếu và giá trị MTPD/RTO/RPO hiện hành; số lần kích hoạt kế hoạch theo mức, thời gian khôi phục thực tế so với RTO; kết quả diễn tập trong kỳ và tỷ lệ đạt; kết quả kiểm chứng phục hồi; phương án đang ở cờ **Chưa kiểm chứng**; điểm không thể phục hồi còn tồn tại; hành động cải tiến sau gián đoạn và tình trạng thực hiện.

---

## 6. TRẠNG THÁI VÀ THẨM QUYỀN

### 6.1. Kế hoạch duy trì liên tục hoạt động (F31.02)

| STT | Trạng thái | Ý nghĩa | Người thao tác | Bắt buộc lý do |
|---|---|---|---|---|
| 1 | Nháp | Đang soạn | QLCL, TP | Không |
| 2 | Chờ soát xét | Chờ kiểm tra tính khả thi | QLCL | Không |
| 3 | Không soát xét | Bị trả lại để sửa | TP/PT.ATTT (≠ người lập) | **Có** |
| 4 | Chờ phê duyệt | Chờ LĐV | QLCL | Không |
| 5 | Không phê duyệt | Bị trả lại để sửa | LĐV | **Có** |
| 6 | Hiệu lực | Đang áp dụng | LĐV | Không |
| 7 | Hết hiệu lực | Bị thay thế bởi phiên bản mới | LĐV (tự động khi phiên bản mới hiệu lực) | **Có** |

Cờ **Chưa kiểm chứng** (quá hạn diễn tập theo mục 5.4.2) và cờ **Quá hạn kiểm chứng phục hồi** (mục 5.4.3) không phải trạng thái hồ sơ, mà là cảnh báo. Phương án mang cờ **Chưa kiểm chứng** vẫn ở trạng thái Hiệu lực nhưng **không** được viện dẫn làm bằng chứng đáp ứng yêu cầu liên tục hoạt động cho ETV.MP28, ETV.MP35 hoặc cho đánh giá bên ngoài.

### 6.2. Trạng thái ứng phó (không phải trạng thái hồ sơ)

| Trạng thái | Ý nghĩa | Người quyết định |
|---|---|---|
| Bình thường | Không có gián đoạn đang xử lý | — |
| Theo dõi | Có dấu hiệu gián đoạn, chưa vượt ngưỡng kích hoạt | CHUP |
| Đang ứng phó – Mức A | Gián đoạn cục bộ trong một phòng | TP |
| Đang ứng phó – Mức B | Gián đoạn liên phòng hoặc ảnh hưởng khách hàng | LĐV |
| Đang ứng phó – Mức C | Gián đoạn quá trình trọng yếu cao hoặc ảnh hưởng hiệu lực kết quả | LĐV |
| Đang khôi phục | Đã kiểm soát nguyên nhân, đang đưa về vận hành thông thường | CHUP |
| Trở lại bình thường | Đã hoàn tất rà soát theo mục 5.6.2 | **LĐV** |

### 6.3. Các đối tượng khác

| Đối tượng | Chuỗi trạng thái | Thẩm quyền kết thúc |
|---|---|---|
| Phân tích tác động nghiệp vụ (F31.01) | Nháp → Chờ soát xét → Chờ phê duyệt → Đã phê duyệt / Không phê duyệt | LĐV |
| Biên bản diễn tập và kiểm chứng (F31.03) | Nháp → Chờ kết luận → Đạt / Không đạt | QLCL (diễn tập) · LĐV (khi Không đạt ở quá trình Trọng yếu cao) |
| Nhật ký gián đoạn (F31.04) | Mới → Đang ứng phó → Đang khôi phục → Chờ rà soát hiệu lực → Đã đóng | **LĐV** |

Mọi nhánh **Không phê duyệt**, **Không soát xét**, **Không đạt**, **Hết hiệu lực** bắt buộc ghi lý do.

---

## 7. KIỂM SOÁT RỦI RO

- Quá trình xếp hạng **Trọng yếu cao** không có phương án dự phòng trong F31.02 → **chặn phê duyệt** kết quả BIA
- Phương án dự phòng **không có RTO/RPO bằng số** hoặc RTO ≥ MTPD → **không cho lưu**
- Phương án **quá hạn diễn tập** → gắn cờ **Chưa kiểm chứng**; **không** được viện dẫn làm bằng chứng liên tục hoạt động cho ETV.MP28, ETV.MP35 và cho đánh giá bên ngoài
- **Sao lưu chưa từng kiểm chứng phục hồi** được ghi là phương án khôi phục → **không chấp nhận**
- Người thực hiện phục hồi đồng thời là người xác nhận kết quả kiểm chứng → **chặn cứng**
- Kiểm chứng phục hồi **Không đạt** mà không lập KPH theo ETV.MP13 trong 03 ngày làm việc → cảnh báo LĐV
- Diễn tập cho kết quả **vượt RTO/RPO** mà xử lý bằng cách âm thầm nới lỏng RTO/RPO thay vì lập KPH → **không chấp nhận**; mọi điều chỉnh RTO/RPO phải có phê duyệt của LĐV kèm lý do
- **Nới lỏng kiểm soát an toàn thông tin** trong thời gian gián đoạn mà không có phê duyệt của LĐV, không có thời hạn, không ghi nhật ký → vi phạm nghiêm trọng; xử lý theo ETV.MP28 và ETV.MP13
- Kiểm soát an toàn thông tin đã nới lỏng **không được khôi phục nguyên trạng** trước khi tuyên bố trở lại bình thường → **chặn tuyên bố trở lại bình thường**
- Khôi phục dữ liệu **vào hệ thống chưa được xác nhận sạch** sau sự cố xâm nhập → **cấm tuyệt đối** (KB-05; ETV.MP28)
- Tuyên bố **trở lại bình thường** khi chưa hoàn tất rà soát hiệu lực công việc theo mục 5.6.2 → **chặn thao tác**
- **Phát hành kết quả** thực hiện trong thời gian gián đoạn khi ETV.MP10 chưa kết luận về độ tin cậy → **không chấp nhận**
- Nhật ký gián đoạn **lập lại sau khi sự việc kết thúc** thay vì ghi liên tục → **không được chấp nhận làm bằng chứng**
- Gián đoạn **Mức B, Mức C** đóng mà **chưa lập bài học kinh nghiệm** theo ETV.MP26 → **chặn thao tác đóng**
- Gián đoạn làm Viện **tạm thời không đáp ứng điều kiện đã đăng ký, đã chỉ định** mà không báo cáo LĐV ngay để xử lý nghĩa vụ thông báo → vi phạm nghiêm trọng
- Kế hoạch **không có bản ngoại tuyến** hoặc bản ngoại tuyến cũ hơn phiên bản hiệu lực → cảnh báo QLCL; quá 30 ngày → báo cáo LĐV
- BIA **quá 12 tháng chưa rà soát** → cảnh báo LĐV và đưa vào báo cáo xem xét của lãnh đạo
- Trợ lý AI quyết định kích hoạt, kết luận hiệu lực kết quả, xác nhận kiểm chứng phục hồi hoặc tự thao tác khôi phục → **cấm tuyệt đối**

---

## 8. HƯỚNG DẪN, BIỂU MẪU ÁP DỤNG

- **ETV.P.F31.01** – Phân tích tác động nghiệp vụ (BIA)
- **ETV.P.F31.02** – Kế hoạch duy trì liên tục hoạt động
- **ETV.P.F31.03** – Kế hoạch, biên bản diễn tập và kiểm chứng phục hồi
- **ETV.P.F31.04** – Phiếu kích hoạt và nhật ký gián đoạn

Hồ sơ đào tạo và ủy quyền người thay thế sử dụng bộ biểu mẫu của ETV.MP03; hồ sơ đánh giá nhà cung cấp thay thế sử dụng bộ biểu mẫu của ETV.MP06; phiếu sự cố an toàn thông tin sử dụng biểu mẫu F28.03 của ETV.MP28; phiếu hành động khắc phục sử dụng biểu mẫu của ETV.MP13 — **không** lập biểu mẫu mới ở thủ tục này.

---

## 9. LƯU TRỮ HỒ SƠ

| Hồ sơ | Người lưu | Thời hạn lưu |
|---|---|---|
| Phân tích tác động nghiệp vụ (F31.01) và các phiên bản | QLCL | Vĩnh viễn trên ManLab |
| Kế hoạch duy trì liên tục hoạt động (F31.02) và các phiên bản | QLCL | Vĩnh viễn trên ManLab |
| Bản ngoại tuyến của kế hoạch (bản in) | QLCL, CHUP | Thay thế khi có phiên bản mới; hủy bản cũ có kiểm soát theo ETV.MP14 |
| Kế hoạch, biên bản diễn tập và kiểm chứng phục hồi (F31.03) | QLCL | 05 năm |
| Phiếu kích hoạt và nhật ký gián đoạn (F31.04), kể cả bản giấy gốc | QLCL | 10 năm |
| Biên bản rút kinh nghiệm sau gián đoạn | QLCL | 10 năm |
| Hồ sơ rà soát hiệu lực công việc trong thời gian gián đoạn | QLCL | Theo thời hạn lưu hồ sơ kỹ thuật tương ứng (ETV.MP15) |
| Bằng chứng thông báo khách hàng, cơ quan quản lý, tổ chức công nhận | QLCL | 10 năm |
| Hồ sơ phê duyệt nới lỏng kiểm soát an toàn thông tin | PT.ATTT, sao gửi QLCL | Theo ETV.MP28 |
| Báo cáo liên tục hoạt động phục vụ xem xét của lãnh đạo | QLCL | Theo ETV.MP17 |

**Toàn bộ hồ sơ có liên quan được lưu trữ theo thủ tục ETV.MP15 (Kiểm soát hồ sơ) và ETV.MP14 (Kiểm soát tài liệu).**
