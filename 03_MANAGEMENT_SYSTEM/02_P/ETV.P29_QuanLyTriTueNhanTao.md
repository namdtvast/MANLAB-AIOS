---
doc_id: ETV.P29
doc_name: Thủ tục Quản lý hệ thống trí tuệ nhân tạo
doc_status: Cho-soat-xet
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

# THỦ TỤC QUẢN LÝ HỆ THỐNG TRÍ TUỆ NHÂN TẠO

**Procedure For Artificial Intelligence Management System**

**Mã số:** ETV.MP 29  
**Lần ban hành:** 01  
**Ngày ban hành:** ..../..../........

## THEO DÕI SỬA ĐỔI TÀI LIỆU

| Ngày soát xét | Lý do soát xét, ban hành lại | Lần ban hành |
|---|---|---|
| 24/08/2026 | Dự thảo lần đầu, trình soát xét (chưa ban hành) | 01 |
| 25/08/2026 | Sửa dự thảo, **chưa ban hành**: dọn câu chữ lệch trong nội bộ về dữ liệu mức Hạn chế. Mục 1.3.6 trước chỉ cấm *lập chỉ mục* trong khi mục 5.1.5 cấm cả *truy cập*; mục 4.7 viết "khi không được phép" ngầm mở một ngoại lệ không có ở đâu. Nay cả ba mục nói cùng một điều, khớp **ETV.MP26 mục 5.5** và **ETV.MP28 mục 6.13** đang có hiệu lực. **Không nới rộng phạm vi cho phép.** | 01 |

---

## 1. MỤC ĐÍCH, PHẠM VI ÁP DỤNG

### 1.1. Mục đích

Thủ tục này quy định thống nhất cách thức **đăng ký, đánh giá tác động, kiểm thử, phê duyệt đưa vào sử dụng, kiểm soát vận hành, giám sát, xử lý sự cố, thay đổi và ngừng sử dụng** các hệ thống trí tuệ nhân tạo (AI) của Viện ETV, nhằm bảo đảm AI được sử dụng **có kiểm soát, có trách nhiệm giải trình và không làm suy giảm tính khách quan, năng lực kỹ thuật hay giá trị pháp lý của kết quả** do Viện phát hành, cụ thể để:

- Bảo đảm mọi hệ thống AI đang chạy trong Viện đều **được đăng ký, có chủ sở hữu, có mức tác động đã xác định** — không tồn tại AI "chạy ngầm"
- Bảo đảm mọi hệ thống AI có tác động tới con người, khách hàng hoặc kết quả kỹ thuật đều có **hồ sơ đánh giá tác động AI (AIA) đã phê duyệt** trước khi vận hành (ISO/IEC 42001 §6.1.4, §8.4)
- Giữ vững ranh giới bất biến: **AI không bao giờ tự ra kết luận đo lường cuối cùng, không tự phê duyệt chứng chỉ, báo cáo, hồ sơ hay tài liệu** — quyết định cuối cùng luôn thuộc về người có thẩm quyền
- Kiểm soát phạm vi hành động của AI qua **cổng công cụ (Tool Gateway)**, **rào chắn (Guardrail)** và **phân cấp quyền hành động**
- Bảo đảm mọi lượt AI hoạt động đều **truy vết được**: dùng mô hình nào, lời nhắc phiên bản nào, gọi công cụ gì, do ai kích hoạt, chi phí bao nhiêu
- Kiểm soát dữ liệu cấp cho AI theo đúng mức phân loại bảo mật và quy định bảo vệ dữ liệu cá nhân
- Bảo đảm tính minh bạch với khách hàng và các bên quan tâm về việc Viện có sử dụng AI trong hoạt động của mình

### 1.2. Phạm vi áp dụng

Áp dụng cho **mọi hệ thống AI** được Viện tự phát triển, mua, thuê dịch vụ, sử dụng miễn phí hoặc nhúng sẵn trong nền tảng số của bên thứ ba, bao gồm:

| Nhóm | Ví dụ tại Viện |
|---|---|
| Tác tử AI nhúng trong nền tảng nghiệp vụ | Trợ lý AI trên ManLab, VI-CONNECT và các nền tảng đăng ký tại ETV.MP35 |
| AI hỗ trợ công việc hành chính, văn phòng | Soạn thảo, tóm tắt, dịch, tra cứu tri thức nội bộ |
| AI hỗ trợ kỹ thuật, tính toán, phân tích dữ liệu | Gợi ý phương pháp, kiểm tra tính đầy đủ hồ sơ, phát hiện bất thường trong chuỗi dữ liệu |
| AI xử lý tài liệu, hình ảnh | Nhận dạng ký tự (OCR), bóc tách dữ liệu từ tài liệu, phân loại tài liệu |
| Dịch vụ mô hình của nhà cung cấp bên ngoài | Mô hình ngôn ngữ lớn, dịch vụ suy luận theo lượt gọi API |

Áp dụng cho toàn bộ đơn vị, phòng ban, cá nhân thuộc Viện và cho bên thứ ba được phép sử dụng hệ thống AI của Viện. Dữ liệu quản trị được quản lý thống nhất trên phần mềm ManLab (Module **M29 – Quản lý hệ thống trí tuệ nhân tạo**).

### 1.3. Nguyên tắc quản trị AI của Viện

1. **Con người quyết định cuối cùng.** AI chỉ **gợi ý, soạn nháp, kiểm tra, cảnh báo**. Việc kết luận kết quả đo, phê duyệt chứng chỉ, báo cáo, tài liệu, hồ sơ, quyền truy cập, rủi ro và sự cố luôn do người có thẩm quyền thực hiện và ký.
2. **Đăng ký, không sao chép.** Danh mục hệ thống AI là **sổ đăng ký**; nội dung thật (mã nguồn, lời nhắc, cấu hình, nhật ký) nằm ở nơi có nguồn sự thật — mục đăng ký chỉ lưu thông tin nhận dạng và đường dẫn.
3. **Chỉ được làm điều đã cho phép.** AI chỉ gọi được các công cụ đã đăng ký, qua **cổng công cụ**; công cụ không có trong danh sách cho phép thì bị chặn, không phụ thuộc vào nội dung lời nhắc.
4. **Không sửa đè bản đang hiệu lực.** Lời nhắc, rào chắn, chính sách AI đã ở trạng thái hiệu lực **không sửa trực tiếp** — tạo phiên bản mới và trình duyệt lại.
5. **Truy vết đầy đủ.** Mọi lượt gọi AI và mọi thay đổi cấu hình AI đều sinh nhật ký **chỉ ghi thêm, không sửa, không xóa**.
6. **Dữ liệu theo phân loại.** AI chỉ truy cập dữ liệu ở mức **Công khai** và **Nội bộ**. Dữ liệu **Hạn chế** và **Mật** **không bao giờ** được đưa vào hệ thống AI — không lập chỉ mục, không đưa vào lời nhắc, không truy xuất trực tiếp (thống nhất với ETV.MP26 mục 5.5 và ETV.MP28 mục 6.13).

### 1.4. Ngoài phạm vi

Thủ tục này **không** thay thế và **không** trùng lặp với:

| Nội dung | Thuộc thủ tục |
|---|---|
| Đăng ký, đánh giá trước vận hành, sự cố và ngừng vận hành của **nền tảng số** chứa hệ thống AI | ETV.MP35 – Quản lý nền tảng số |
| Biện pháp kỹ thuật an toàn thông tin, quản lý bí mật xác thực, sự cố an toàn thông tin | ETV.MP28 – Quản lý an toàn thông tin |
| Hạ tầng công nghệ thông tin, máy chủ, mạng, tài khoản người dùng | ETV.MP33 – Quản lý hệ thống thông tin |
| Danh mục và vòng đời tài sản dữ liệu, sao lưu, phục hồi | ETV.MP27 – Quản trị dữ liệu và tài sản thông tin |
| Chất lượng, vòng đời và kiểm soát truy xuất dữ liệu số dùng cho AI | ETV.MP34 – Quản lý dữ liệu số |
| Đăng ký, phê duyệt và rà soát **tri thức** được cấp cho trợ lý AI | ETV.MP26 – Quản lý tri thức tổ chức |
| Đánh giá và xử lý rủi ro cấp tổ chức | ETV.MP01 – Rủi ro và cơ hội |
| Mua sắm, thuê dịch vụ và đánh giá nhà cung cấp mô hình/dịch vụ AI | ETV.MP06 – Quản lý mua sắm |
| Thẩm định thay đổi lớn có ảnh hưởng liên phòng | ETV.MP30 – Quản lý thay đổi |
| Năng lực, đào tạo và hồ sơ nhân sự sử dụng AI | ETV.MP03 – Quản lý nhân sự |
| Phân tích nguyên nhân gốc, hành động khắc phục sau sự cố | ETV.MP13 – Khắc phục, cải tiến |
| Nội dung, phiên bản, hiệu lực của tài liệu kiểm soát do AI hỗ trợ soạn thảo | ETV.MP14 – Kiểm soát tài liệu |
| Giá trị sử dụng của kết quả đo và xử lý báo cáo/chứng chỉ đã phát hành | ETV.MP10, ETV.MP11 |

> **Ranh giới với ETV.MP35:** ETV.MP35 quản lý **nền tảng** (nơi phần mềm chạy). ETV.MP29 quản lý **hệ thống AI chạy trên nền tảng đó**. Một tác tử AI luôn phải tham chiếu tới một mã nền tảng đã đăng ký và đang hiệu lực tại ETV.MP35; đăng ký tác tử trỏ tới nền tảng chưa phê duyệt, hết hiệu lực hoặc đã hủy là lỗi ràng buộc — hệ thống từ chối.

---

## 2. THUẬT NGỮ, ĐỊNH NGHĨA VÀ CHỮ VIẾT TẮT

### 2.1. Thuật ngữ và định nghĩa

**Hệ thống trí tuệ nhân tạo (AI system)**  
Hệ thống được thiết kế để, với một tập mục tiêu cho trước, tạo ra đầu ra như dự đoán, nội dung, khuyến nghị hoặc quyết định có ảnh hưởng tới môi trường mà nó tương tác (ISO/IEC 42001).

**Tác tử AI (Agent)**  
Một hệ thống AI cụ thể đã đăng ký, vận hành trên một nền tảng số xác định, có mô hình, lời nhắc, tập kỹ năng và tập công cụ được phép sử dụng.

**Mô hình (Model)**  
Mô hình suy luận được cấu hình cho tác tử, do một nhà cung cấp mô hình (Provider) cung cấp.

**Lời nhắc (Prompt) và phiên bản lời nhắc (Prompt Version)**  
Chỉ dẫn hệ thống định hình hành vi của tác tử. Mỗi lần thay đổi nội dung sinh một **phiên bản** mới; chỉ **01 phiên bản** được ở trạng thái đang áp dụng tại một thời điểm.

**Công cụ (Tool)**  
Một điểm gọi nghiệp vụ thật mà tác tử được phép sử dụng (tra cứu dữ liệu, tính toán, tạo bản nháp hồ sơ…), có **mức quyền hành động** xác định.

**Cổng công cụ (Tool Gateway)**  
Thành phần trung gian bắt buộc: mọi lời gọi công cụ của tác tử đều đi qua cổng này để kiểm tra quyền, trạng thái công cụ và điều kiện phê duyệt trước khi được thực hiện. Tác tử **không** được gọi thẳng cơ sở dữ liệu hoặc giao diện lập trình của nền tảng.

**Mức quyền hành động (Permission level)**  
Bốn mức tăng dần của một công cụ: **Đọc** (chỉ truy xuất) · **Tính toán** (xử lý, không ghi) · **Đề xuất** (tạo bản nháp để người duyệt) · **Thực thi** (ghi/tạo bản ghi có hiệu lực nghiệp vụ).

**Rào chắn (Guardrail)**  
Quy tắc kiểm soát hành vi AI, có hiệu lực ở cấp hệ thống, nền tảng, tác tử, kỹ năng, công cụ hoặc luồng công việc; hành động khi kích hoạt gồm: **Chặn · Cảnh báo · Yêu cầu xác nhận · Yêu cầu phê duyệt**.

**Đánh giá tác động AI (AI Impact Assessment – AIA)**  
Hồ sơ đánh giá tác động của một hệ thống AI tới cá nhân, khách hàng, tổ chức và tới chất lượng kết quả kỹ thuật, kèm biện pháp kiểm soát và kết luận về điều kiện được phép sử dụng.

**Mức tác động (Impact level)**  
Ba mức xác định mức độ kiểm soát bắt buộc áp dụng cho một hệ thống AI: **Thấp · Trung bình · Cao** (mục 5.1.3).

**Đánh giá chất lượng (Evaluation)**  
Bộ tình huống kiểm thử và kết quả chạy dùng để xác nhận tác tử hoạt động đúng kỳ vọng trước khi đưa vào hoặc tiếp tục vận hành.

**Nhật ký suy luận (Trace)**  
Bản ghi đầu-cuối của một lượt gọi AI: người kích hoạt, tác tử, mô hình, phiên bản lời nhắc, chuỗi công cụ đã gọi, kết quả, thời gian, lượng token và chi phí.

**Con người trong vòng lặp (Human-in-the-loop)**  
Cơ chế bắt buộc có người xem xét và quyết định trước khi đầu ra của AI phát sinh hiệu lực.

**Cổng AIA (AIA Gate)**  
Ràng buộc chặn cứng: cổng công cụ từ chối mọi lời gọi thay mặt một tác tử chưa có hồ sơ AIA ở trạng thái Đã phê duyệt.

**Cổng triển khai (Deployment Gate)**  
Ràng buộc chặn cứng: không cho áp dụng một phiên bản lời nhắc mới nếu lần đánh giá chất lượng gần nhất của tác tử đó có kết quả **Không đạt**.

**Sự cố AI (AI incident)**  
Sự việc trong đó hệ thống AI gây ra hoặc có nguy cơ gây ra hậu quả không mong muốn: đầu ra sai gây hệ quả nghiệp vụ, rò rỉ dữ liệu qua lời nhắc, bị tiêm lệnh, vượt quyền hành động, phân biệt đối xử, hoặc gián đoạn dịch vụ AI.

**Nội dung do AI tạo**  
Văn bản, hình ảnh, bảng biểu, mã nguồn hoặc bản nháp hồ sơ do hệ thống AI sinh ra, chưa được người có thẩm quyền xem xét và chấp nhận.

### 2.2. Chữ viết tắt

| Chữ viết tắt | Ý nghĩa |
|---|---|
| AI | Trí tuệ nhân tạo |
| AIA | Hồ sơ đánh giá tác động AI |
| LĐV | Lãnh đạo Viện |
| PT.AI | Người phụ trách quản trị trí tuệ nhân tạo |
| PT.ATTT | Người phụ trách an toàn thông tin |
| QLCL | Phụ trách Quản lý chất lượng |
| CSH | Chủ sở hữu hệ thống AI |
| ĐMKT | Đầu mối kỹ thuật |
| QTHT | Quản trị hệ thống |
| TP | Trưởng phòng/Người phụ trách lĩnh vực |
| KPH | Sự không phù hợp |

---

## 3. TÀI LIỆU VIỆN DẪN

### 3.1. Tiêu chuẩn quốc tế

- **ISO/IEC 42001:2023** (Điều 4 Bối cảnh và phạm vi hệ thống quản lý AI; 5 Vai trò lãnh đạo và chính sách AI; 6.1 Hành động giải quyết rủi ro và cơ hội; 6.1.4 Đánh giá tác động hệ thống AI; 6.2 Mục tiêu AI; 7 Nguồn lực, năng lực, nhận thức, trao đổi thông tin; 8.1 Kiểm soát vận hành; 8.2–8.4 Đánh giá rủi ro, đánh giá tác động và vòng đời hệ thống AI; 9 Theo dõi, đo lường, đánh giá nội bộ, xem xét của lãnh đạo; 10 Cải tiến; Phụ lục A/B – mục tiêu và biện pháp kiểm soát tham chiếu)
- **ISO/IEC 27001:2022** (Điều 6.1.2 Đánh giá rủi ro; 8.1 Kiểm soát vận hành; A.5.9–A.5.12 Kiểm kê và phân loại tài sản thông tin; A.5.23 An toàn dịch vụ đám mây; A.8.16 Giám sát hoạt động)
- **ISO 9001:2015** (Điều 6.1 Rủi ro và cơ hội; 7.1.6 Tri thức của tổ chức; 8.5.1 Kiểm soát cung cấp dịch vụ; 9.3 Xem xét của lãnh đạo)
- **ISO/IEC 17025:2017** (Điều 4.1 Tính khách quan; 6.2 Nhân sự; 7.7 Đảm bảo giá trị sử dụng của kết quả; 7.11 Kiểm soát dữ liệu và quản lý thông tin; 8.5 Rủi ro và cơ hội)
- **ISO 17034:2016** (Điều 7.4 Kiểm soát dữ liệu; 8.7 Cải tiến)

### 3.2. Văn bản pháp luật

*(Chỉ dẫn chiếu — không chép nội dung. Bản đầy đủ lưu tại `08_KNOWLEDGE_GRAPH/01_Regulations/`. QLCL rà soát hiệu lực và văn bản thay thế trước mỗi lần ban hành lại.)*

- **Luật An toàn thông tin mạng số 86/2015/QH13** — bảo vệ thông tin cá nhân trên mạng, an toàn hệ thống thông tin
- **Luật An ninh mạng số 24/2018/QH14** — bảo vệ hệ thống thông tin, ứng phó sự cố
- **Luật Giao dịch điện tử số 20/2023/QH15** — giá trị pháp lý của thông điệp dữ liệu và chữ ký điện tử
- **Nghị định 13/2023/NĐ-CP** — bảo vệ dữ liệu cá nhân, nghĩa vụ khi xử lý dữ liệu cá nhân và khi xảy ra vi phạm
- Các quy định hiện hành khác về công nghiệp công nghệ số, dữ liệu và trí tuệ nhân tạo *(QLCL/PT.AI xác nhận hiệu lực tại thời điểm áp dụng)*

### 3.3. Văn bản nội bộ Viện ETV

- Sổ tay quản lý chất lượng (ETV.QM)
- Thủ tục ETV.MP01 – Quản lý rủi ro và cơ hội
- Thủ tục ETV.MP03 – Quản lý nhân sự (đào tạo, năng lực)
- Thủ tục ETV.MP06 – Quản lý mua sắm
- Thủ tục ETV.MP10 – Đảm bảo giá trị sử dụng của kết quả
- Thủ tục ETV.MP11 – Báo cáo kết quả
- Thủ tục ETV.MP13 – Khắc phục, cải tiến
- Thủ tục ETV.MP14 – Kiểm soát tài liệu
- Thủ tục ETV.MP15 – Kiểm soát hồ sơ
- Thủ tục ETV.MP16 – Đánh giá nội bộ
- Thủ tục ETV.MP17 – Xem xét của lãnh đạo
- Thủ tục ETV.MP25 – Quản lý bối cảnh tổ chức và các bên quan tâm
- Thủ tục ETV.MP26 – Quản lý tri thức tổ chức
- Thủ tục ETV.MP27 – Quản trị dữ liệu và tài sản thông tin
- Thủ tục ETV.MP28 – Quản lý an toàn thông tin
- Thủ tục ETV.MP30 – Quản lý thay đổi
- Thủ tục ETV.MP33 – Quản lý hệ thống thông tin
- Thủ tục ETV.MP34 – Quản lý dữ liệu số
- Thủ tục ETV.MP35 – Quản lý nền tảng số
- Thủ tục ETV.MP38 – Quản lý dịch vụ số

---

## 4. TRÁCH NHIỆM

### 4.1. Lãnh đạo Viện (LĐV)

- Ban hành **Chính sách sử dụng trí tuệ nhân tạo** của Viện và các mục tiêu AI
- **Phê duyệt** đăng ký hệ thống AI mức tác động **Trung bình** và **Cao**, phê duyệt hồ sơ AIA
- Phê duyệt việc cấp mức quyền hành động **Thực thi** cho bất kỳ công cụ nào
- Quyết định **tạm dừng** hoặc **ngừng sử dụng** một hệ thống AI khi có rủi ro không chấp nhận được
- Chấp nhận rủi ro tồn dư của hệ thống AI vượt ngưỡng chấp nhận *(không được ủy quyền cho vai trò khác)*
- Xem xét tình hình quản trị AI trong cuộc họp xem xét của lãnh đạo (ETV.MP17)

### 4.2. Người phụ trách quản trị AI (PT.AI)

*(Do LĐV chỉ định bằng văn bản; có thể kiêm nhiệm nếu bảo đảm nguyên tắc tách vai trò tại mục 4.8)*

- Quản trị **Danh mục hệ thống AI** (F29.01); duy trì danh mục chuẩn phân nhóm và mức tác động
- Chủ trì lập và soát xét hồ sơ **đánh giá tác động AI** (F29.02) cùng CSH
- Kiểm tra tính đầy đủ của hồ sơ kiểm thử, đánh giá chất lượng (F29.03) trước khi trình LĐV
- Quản trị danh mục công cụ, rào chắn và mức quyền hành động; đề xuất điều chỉnh khi phát hiện rủi ro
- Theo dõi nhật ký suy luận, chi phí sử dụng, cảnh báo rào chắn; phát hiện hệ thống AI **chưa đăng ký**
- Đầu mối tiếp nhận và điều phối xử lý **sự cố AI** (F29.04)

### 4.3. Phụ trách Quản lý chất lượng (QLCL)

- Bảo đảm quy định về AI không mâu thuẫn với hệ thống quản lý chất lượng và các thủ tục hiện hành
- Kiểm tra việc tuân thủ nguyên tắc "AI không tự kết luận, không tự phê duyệt" trong đánh giá nội bộ (ETV.MP16)
- Tổng hợp báo cáo tình hình quản trị AI phục vụ xem xét của lãnh đạo
- Lưu trữ hồ sơ theo ETV.MP15

### 4.4. Chủ sở hữu hệ thống AI (CSH)

*(Trưởng phòng/Người phụ trách lĩnh vực có nhu cầu sử dụng hệ thống AI)*

- Đề xuất đăng ký hệ thống AI; mô tả mục đích sử dụng, đối tượng chịu tác động, dữ liệu sử dụng
- Cùng PT.AI lập hồ sơ AIA; chịu trách nhiệm về **mục đích sử dụng đúng** của hệ thống AI thuộc phạm vi mình
- Chỉ định người xem xét đầu ra AI trong luồng công việc có con người trong vòng lặp
- Rà soát định kỳ và đề nghị ngừng sử dụng khi hệ thống AI không còn cần thiết hoặc không còn phù hợp

### 4.5. Đầu mối kỹ thuật (ĐMKT) và Quản trị hệ thống (QTHT)

- Cấu hình tác tử, mô hình, lời nhắc, kỹ năng, công cụ và rào chắn **theo quyết định đã phê duyệt**
- Thực hiện kiểm thử, chạy bộ đánh giá chất lượng và lập báo cáo kết quả (F29.03)
- Bảo đảm nhật ký suy luận và nhật ký thay đổi cấu hình được ghi đầy đủ, không sửa, không xóa
- Thực hiện thao tác tạm dừng, gỡ bỏ hoặc thu hồi quyền của tác tử khi có yêu cầu — **không** tự quyết định nội dung phê duyệt

### 4.6. Người phụ trách an toàn thông tin (PT.ATTT)

- Đánh giá rủi ro an toàn thông tin của hệ thống AI theo ETV.MP28 mục 6.4; kết quả là đầu vào bắt buộc của AIA
- Phối hợp xử lý sự cố AI có yếu tố mất an toàn thông tin theo ETV.MP28 mục 6.8

### 4.7. Người sử dụng

- Chỉ sử dụng hệ thống AI **đã đăng ký và đang hiệu lực**; không tự ý đưa dữ liệu công việc vào dịch vụ AI bên ngoài chưa được phê duyệt
- **Không** nhập dữ liệu mức **Hạn chế** hoặc **Mật** vào lời nhắc trong mọi trường hợp (mục 5.1.5); không nhập dữ liệu cá nhân của khách hàng khi chưa được phép theo mục 5.5
- **Kiểm tra và chịu trách nhiệm** đối với mọi nội dung do AI hỗ trợ tạo ra trước khi sử dụng vào công việc chính thức
- Báo cáo ngay khi phát hiện đầu ra sai lệch, vượt quyền hoặc dấu hiệu rò rỉ dữ liệu

### 4.8. Nguyên tắc tách vai trò

> Người **đề xuất** hệ thống AI ≠ người **soát xét** ≠ người **phê duyệt**. Người **cấu hình** tác tử ≠ người **phê duyệt** cấu hình đó. Người **xem xét đầu ra AI** trong một hồ sơ nghiệp vụ phải là người có thẩm quyền theo thủ tục nghiệp vụ tương ứng, không phải người vận hành AI. Trợ lý AI **không** được lập hồ sơ AIA chính thức, **không** soát xét, **không** phê duyệt, **không** đóng sự cố và **không** tự thay đổi cấu hình của chính mình.

---

## 5. NỘI DUNG

### 5.1. Danh mục hệ thống AI (Biểu mẫu F29.01)

#### 5.1.1. Nguyên tắc

Danh mục hệ thống AI là **sổ đăng ký duy nhất** ghi nhận mọi hệ thống AI đang hoặc sẽ được sử dụng trong Viện. Mỗi bản ghi phải tham chiếu tới **một mã nền tảng số** đã đăng ký và đang hiệu lực tại ETV.MP35.

#### 5.1.2. Trường thông tin bắt buộc

Mã hệ thống AI · Tên gọi · Nhóm · Mục đích sử dụng · Nền tảng vận hành (mã tại ETV.MP35) · Nhà cung cấp và mô hình sử dụng · Hình thức (tự phát triển/mua/thuê/nhúng sẵn) · Chủ sở hữu · Đầu mối kỹ thuật · Đối tượng chịu tác động · Loại và mức phân loại dữ liệu sử dụng · Có xử lý dữ liệu cá nhân hay không · **Mức tác động** · **Mức quyền hành động cao nhất** · Cơ chế con người trong vòng lặp · Mã hồ sơ AIA · Chu kỳ rà soát · Trạng thái.

#### 5.1.3. Mức tác động và mức kiểm soát bắt buộc

| Mức tác động | Tiêu chí xác định | Kiểm soát bắt buộc |
|---|---|---|
| **Thấp** | Chỉ hỗ trợ cá nhân, đầu ra không đi vào hồ sơ chính thức; chỉ dùng dữ liệu Công khai/Nội bộ; quyền hành động tối đa là **Đọc** hoặc **Tính toán** | Đăng ký danh mục; người dùng tự kiểm tra đầu ra; rà soát theo sự kiện |
| **Trung bình** | Đầu ra được dùng làm **bản nháp** cho hồ sơ, tài liệu, trao đổi với khách hàng; quyền hành động tối đa là **Đề xuất** | **Bắt buộc AIA**; bắt buộc con người xem xét trước khi đầu ra có hiệu lực; đánh giá chất lượng trước khi vận hành; rà soát ≤ 01 năm |
| **Cao** | Liên quan tới kết quả đo, chứng chỉ, quyết định ảnh hưởng tới quyền lợi cá nhân/khách hàng; hoặc sử dụng dữ liệu cá nhân; hoặc có công cụ ở mức **Thực thi** | **Bắt buộc AIA do LĐV phê duyệt**; bắt buộc rào chắn **Yêu cầu phê duyệt**; bắt buộc đánh giá chất lượng định kỳ; giám sát nhật ký liên tục; rà soát ≤ 06 tháng |

Việc đánh giá và xử lý rủi ro tương ứng thực hiện theo ETV.MP01; rủi ro an toàn thông tin theo ETV.MP28.

#### 5.1.4. Mức quyền hành động của công cụ

| Mức | Ý nghĩa | Điều kiện bắt buộc |
|---|---|---|
| **Đọc** | Truy xuất dữ liệu, không thay đổi | Chỉ nguồn dữ liệu mức Công khai/Nội bộ |
| **Tính toán** | Xử lý, tổng hợp, không ghi dữ liệu | Kết quả phải nêu rõ là do AI tính toán |
| **Đề xuất** | Tạo bản nháp chờ người duyệt | Bản nháp phải gắn nhãn nguồn gốc AI; không tự chuyển trạng thái hồ sơ |
| **Thực thi** | Ghi/tạo bản ghi có hiệu lực nghiệp vụ | **Bắt buộc** có `yêu cầu xác nhận` hoặc `yêu cầu phê duyệt` — không được để cả hai đều tắt; **LĐV phê duyệt** từng công cụ |

#### 5.1.5. Điều cấm tuyệt đối

Không hệ thống AI nào, ở bất kỳ mức quyền hành động nào, được phép:

1. **Ra kết luận cuối cùng về kết quả đo, hiệu chuẩn, thử nghiệm** hoặc về giá trị sử dụng của kết quả (ETV.MP10)
2. **Phê duyệt hoặc ký** chứng chỉ, báo cáo kết quả, tài liệu kiểm soát, hồ sơ, phiếu KPH, hồ sơ rủi ro
3. **Tự thay đổi quyền truy cập**, tự cấp quyền cho chính mình hoặc cho tác tử khác
4. **Tự đóng** sự cố, khiếu nại, KPH hoặc tự kết luận nguyên nhân gốc
5. **Truy cập hoặc lập chỉ mục** dữ liệu mức **Hạn chế**, **Mật**
6. **Tự sửa hoặc xóa** nhật ký suy luận và nhật ký thay đổi cấu hình

Vi phạm bất kỳ điểm nào ở trên là **sự cố AI mức nghiêm trọng**, xử lý theo mục 5.7 và lập KPH theo ETV.MP13.

#### 5.1.6. Quy trình đăng ký và phê duyệt

| Bước | Trạng thái | Người thực hiện | Nội dung |
|---|---|---|---|
| 1 | Nháp | CSH, ĐMKT | Lập bản ghi hệ thống AI với đầy đủ trường tại mục 5.1.2; xác định mức tác động dự kiến |
| 2 | Chờ soát xét | Người lập | Chuyển PT.AI khi đã đủ trường bắt buộc và đã đính kèm AIA (với mức Trung bình/Cao) cùng báo cáo đánh giá chất lượng (F29.03) |
| 3 | Soát xét | **PT.AI** (≠ người lập) | Kiểm tra: mức tác động phù hợp, nền tảng đã đăng ký, dữ liệu đúng phân loại, có cơ chế con người trong vòng lặp, danh sách công cụ và rào chắn phù hợp. Đạt → Chờ phê duyệt; Không đạt → **Không soát xét** (bắt buộc ghi lý do) |
| 4 | Chờ phê duyệt | PT.AI | Trình LĐV kèm hồ sơ AIA và F29.03 |
| 5 | Phê duyệt | **LĐV** | Phê duyệt → **Đã phê duyệt**; Không đạt → **Không phê duyệt** (bắt buộc ghi lý do) |
| 6 | Vận hành | ĐMKT, người dùng | Kích hoạt tác tử; mọi lời gọi đi qua cổng công cụ, sinh nhật ký suy luận |
| 7 | Rà soát định kỳ | CSH + PT.AI | Xác nhận còn phù hợp hoặc lập phiên bản mới theo mục 5.8 |

Hệ thống AI mức tác động **Thấp** có thể được PT.AI phê duyệt theo ủy quyền bằng văn bản của LĐV; mức **Trung bình** và **Cao** luôn do LĐV phê duyệt.

#### 5.1.7. Hệ thống AI chưa đăng ký

Việc sử dụng bất kỳ hệ thống AI nào cho công việc của Viện mà **chưa đăng ký** là không phù hợp. Khi phát hiện:

1. PT.AI ghi nhận vào danh mục ở trạng thái **Nháp** kèm mốc phát hiện
2. CSH tương ứng phải hoàn thiện hồ sơ đăng ký trong **15 ngày làm việc**, hoặc chấm dứt sử dụng
3. Nếu hệ thống đó đã xử lý dữ liệu mức **Hạn chế/Mật** hoặc dữ liệu cá nhân → mở sự cố theo mục 5.7 và xử lý đồng thời theo ETV.MP28

### 5.2. Đánh giá tác động AI — AIA (Biểu mẫu F29.02)

#### 5.2.1. Khi nào bắt buộc

Hồ sơ AIA là **bắt buộc** đối với hệ thống AI mức tác động **Trung bình** và **Cao**, và bắt buộc lập lại khi:

- Đổi mục đích sử dụng hoặc mở rộng đối tượng chịu tác động
- Đổi mô hình hoặc nhà cung cấp mô hình
- Nâng mức quyền hành động (lên **Đề xuất** hoặc **Thực thi**)
- Bắt đầu sử dụng dữ liệu cá nhân hoặc dữ liệu ở mức phân loại cao hơn
- Đến hạn rà soát ghi trên hồ sơ AIA

#### 5.2.2. Nội dung tối thiểu của hồ sơ AIA

| TT | Nội dung |
|---|---|
| 1 | Mô tả hệ thống AI: mục đích, phạm vi sử dụng, nền tảng, mô hình, giới hạn đã biết |
| 2 | Các bên chịu tác động: người lao động, khách hàng, bên thứ ba, xã hội |
| 3 | Dữ liệu sử dụng: nguồn, mức phân loại, có dữ liệu cá nhân hay không, cơ sở pháp lý xử lý |
| 4 | Tác động tiềm ẩn: sai lệch đầu ra, thiên lệch/phân biệt đối xử, rò rỉ thông tin, phụ thuộc nhà cung cấp, ảnh hưởng tới tính khách quan và năng lực kỹ thuật |
| 5 | Đánh giá rủi ro an toàn thông tin do PT.ATTT cung cấp (ETV.MP28 mục 6.4) |
| 6 | Biện pháp kiểm soát: rào chắn, giới hạn công cụ, con người trong vòng lặp, ghi nhãn đầu ra, đào tạo người dùng |
| 7 | Rủi ro tồn dư và mức chấp nhận |
| 8 | Kết luận: được phép sử dụng / được phép có điều kiện (nêu rõ điều kiện) / không được phép |
| 9 | Chu kỳ rà soát và ngày rà soát kế tiếp |

#### 5.2.3. Cổng AIA

**Cổng công cụ từ chối mọi lời gọi thay mặt một tác tử chưa có hồ sơ AIA ở trạng thái Đã phê duyệt** — kể cả khi công cụ và quyền của người dùng đều hợp lệ. Mọi lời gọi tới cổng công cụ bắt buộc mang mã tác tử; không cho phép gọi công cụ "trần" không gắn với tác tử nào.

Hồ sơ AIA **Đã phê duyệt** quá hạn rà soát tự chuyển sang trạng thái **Cần rà soát lại** do hệ thống phát hiện theo lịch (ghi nhật ký với chủ thể là hệ thống, không phải AI tự kết luận); tác tử tương ứng bị **tạm dừng** cho tới khi AIA được rà soát xong.

### 5.3. Kiểm thử và đánh giá chất lượng trước khi vận hành (Biểu mẫu F29.03)

#### 5.3.1. Yêu cầu

Hệ thống AI mức **Trung bình** và **Cao** phải có báo cáo đánh giá chất lượng đã phê duyệt trước khi đưa vào vận hành, tối thiểu gồm:

| Nội dung đánh giá | Yêu cầu |
|---|---|
| Tính đúng đắn của đầu ra | Bộ tình huống đại diện cho công việc thật, có đáp án đối chiếu |
| Hành vi khi thiếu thông tin | AI phải nêu rõ giới hạn, **không được bịa** dữ liệu, số liệu, mã tài liệu |
| Kiểm thử tiêm lệnh | AI không thực hiện chỉ dẫn ẩn trong dữ liệu đầu vào (tài liệu, thư điện tử, nội dung tải về) |
| Kiểm thử rò rỉ | AI không tiết lộ nội dung lời nhắc hệ thống, bí mật xác thực, dữ liệu ngoài phạm vi quyền của người dùng |
| Kiểm thử giới hạn quyền | AI không gọi được công cụ ngoài danh sách cho phép; công cụ bị vô hiệu hóa bị chặn ngay tại cổng |
| Tính nhất quán | Kết quả ổn định với cùng đầu vào trong phạm vi chấp nhận được |

#### 5.3.2. Cổng triển khai

Không được áp dụng một **phiên bản lời nhắc mới** cho tác tử mức Trung bình/Cao nếu lần đánh giá chất lượng gần nhất của tác tử đó có kết quả **Không đạt**. Đây là ràng buộc chặn cứng, **không có cơ chế vượt qua thủ công**; muốn triển khai phải sửa và chạy lại đánh giá cho đến khi Đạt.

#### 5.3.3. Đánh giá lại định kỳ

Hệ thống AI mức **Cao**: đánh giá lại tối thiểu **06 tháng/lần**. Mức **Trung bình**: **01 năm/lần**. Ngoài ra bắt buộc đánh giá lại khi đổi mô hình, đổi nhà cung cấp, hoặc sau mỗi sự cố AI mức nghiêm trọng.

### 5.4. Kiểm soát vận hành

#### 5.4.1. Lời nhắc và cấu hình

- Mỗi tác tử tại một thời điểm chỉ có **01 phiên bản lời nhắc** đang áp dụng
- Sửa nội dung lời nhắc đang áp dụng → tạo **phiên bản mới ở trạng thái Nháp**; bản đang áp dụng giữ nguyên hiệu lực cho tới khi bản mới được phê duyệt và kích hoạt
- Mọi thay đổi cấu hình AI (mô hình, lời nhắc, kỹ năng, công cụ, rào chắn, chính sách) đều sinh **nhật ký thay đổi** ghi rõ người thực hiện, đối tượng, giá trị trước – sau, thời điểm

#### 5.4.2. Cổng công cụ và rào chắn

- Tác tử **không bao giờ** gọi thẳng cơ sở dữ liệu hoặc giao diện lập trình của nền tảng; mọi lời gọi đi qua cổng công cụ
- Cổng công cụ kiểm tra theo thứ tự: tác tử có AIA hợp lệ → công cụ đang hiệu lực → người dùng có quyền tương ứng mức quyền hành động → rào chắn áp dụng → mới thực hiện
- Từ chối phải trả về mã lỗi và mã nhật ký suy luận, đồng thời ghi nhật ký
- Rào chắn ở mức **Yêu cầu phê duyệt** phải chỉ định rõ vai trò người phê duyệt; người phê duyệt không được là người kích hoạt lời gọi đó

#### 5.4.3. Con người trong vòng lặp

Mọi đầu ra AI đi vào hồ sơ, tài liệu, chứng chỉ, báo cáo hoặc trao đổi chính thức với khách hàng đều phải qua người có thẩm quyền theo thủ tục nghiệp vụ tương ứng. Bản ghi hồ sơ phải lưu lại: đầu ra gốc của AI, người xem xét, kết quả xem xét (chấp nhận/sửa/bác bỏ) và thời điểm.

#### 5.4.4. Bí mật xác thực

Khóa truy cập dịch vụ mô hình và công cụ được quản lý theo ETV.MP28; giá trị thật **không bao giờ** xuất hiện trong lời nhắc, đầu ra, nhật ký suy luận, giao diện hay báo cáo — chỉ hiển thị dạng đã che.

### 5.5. Dữ liệu cấp cho hệ thống AI

- Nguồn dữ liệu cấp cho AI phải là **tài sản dữ liệu đã đăng ký** theo ETV.MP27/MP34 hoặc **tri thức đã phê duyệt** theo ETV.MP26
- Chỉ dữ liệu mức **Công khai** và **Nội bộ** được đưa vào chỉ mục AI; mức **Hạn chế** và **Mật** **không bao giờ** — thống nhất với ETV.MP26 mục 5.5 và ETV.MP28 mục 6.13
- Khi một mục tri thức hoặc tài liệu chuyển sang **hết hiệu lực**, việc gỡ khỏi chỉ mục AI phải thực hiện **ngay trong cùng giao dịch**
- **Nghiêm cấm** dùng dữ liệu thật của khách hàng để kiểm thử hoặc huấn luyện khi chưa được ẩn danh hoặc chưa được LĐV phê duyệt (thống nhất với ETV.MP28 mục 6.7)
- Xử lý dữ liệu cá nhân bằng hệ thống AI phải có cơ sở pháp lý, được nêu trong hồ sơ AIA và tuân thủ quy định pháp luật về bảo vệ dữ liệu cá nhân
- Việc gửi dữ liệu của Viện tới **dịch vụ mô hình bên ngoài** phải được nêu rõ trong AIA, kèm điều khoản của nhà cung cấp về việc **không dùng dữ liệu để huấn luyện lại**; nếu nhà cung cấp không bảo đảm được điều này thì chỉ được gửi dữ liệu mức **Công khai**

### 5.6. Minh bạch và trao đổi thông tin

- Nội dung do AI tạo phục vụ công việc nội bộ phải được **gắn nhãn nguồn gốc AI** cho tới khi người có thẩm quyền xem xét và chấp nhận
- Tài liệu, báo cáo, chứng chỉ **phát hành ra bên ngoài không** ghi nhãn AI, vì trách nhiệm nội dung thuộc về người ký — nhưng dấu vết hỗ trợ của AI phải lưu trong hồ sơ nội bộ để truy vết
- Khi khách hàng hoặc bên quan tâm yêu cầu, Viện cung cấp thông tin về việc có sử dụng AI trong quá trình cung cấp dịch vụ, ở mức không tiết lộ bí mật công nghệ và bí mật thông tin
- Khách hàng có quyền yêu cầu **được xem xét bởi con người** đối với bất kỳ nội dung nào có sự tham gia của AI; yêu cầu này được xử lý theo ETV.MP12 nếu phát sinh khiếu nại
- Nội dung, hình ảnh, dữ liệu do AI tạo sử dụng cho hoạt động truyền thông của Viện phải được kiểm tra tính chính xác trước khi công bố

### 5.7. Giám sát và sự cố AI (Biểu mẫu F29.04)

#### 5.7.1. Giám sát thường xuyên

PT.AI theo dõi: số lượt gọi và chi phí theo tác tử; tỷ lệ lời gọi bị rào chắn chặn; lời gọi bị từ chối do thiếu quyền; tác tử chạy với AIA quá hạn; phiên bản lời nhắc được kích hoạt trong kỳ; kết quả đánh giá chất lượng gần nhất.

#### 5.7.2. Phân loại sự cố AI

| Mức | Tiêu chí | Thời hạn thông báo |
|---|---|---|
| **Nghiêm trọng** | Vi phạm điều cấm tại mục 5.1.5; đầu ra sai đã đi vào hồ sơ/chứng chỉ đã phát hành; rò rỉ dữ liệu Hạn chế/Mật hoặc dữ liệu cá nhân | Thông báo LĐV và PT.ATTT trong vòng **01 giờ**; tạm dừng tác tử ngay |
| **Đáng kể** | Đầu ra sai bị phát hiện trước khi phát hành; AI vượt phạm vi công cụ nhưng bị cổng chặn; bị tiêm lệnh thành công nhưng không gây hậu quả | Thông báo PT.AI và CSH trong vòng **24 giờ** |
| **Nhẹ** | Đầu ra không đạt chất lượng, gián đoạn dịch vụ mô hình ngắn hạn | Ghi nhận, tổng hợp theo kỳ |

#### 5.7.3. Xử lý

1. **Khống chế trước**: tạm dừng tác tử hoặc vô hiệu hóa công cụ liên quan
2. Lập **Phiếu sự cố AI (F29.04)**, đính kèm mã nhật ký suy luận liên quan
3. Sự cố có yếu tố mất an toàn thông tin: xử lý **đồng thời** theo ETV.MP28 mục 6.8 — **không** lập hai bộ hồ sơ sự cố song song, hồ sơ gốc về khía cạnh an toàn thông tin là F28.03, F29.04 dẫn chiếu tới phiếu đó
4. Sự cố ảnh hưởng tới **hiệu lực của kết quả đo hoặc chứng chỉ đã phát hành**: kích hoạt đồng thời ETV.MP10 và ETV.MP11; **AI và cá nhân đơn lẻ không được tự kết luận** về hiệu lực kết quả
5. Sự cố mức **Nghiêm trọng** và **Đáng kể**: bắt buộc lập KPH theo ETV.MP13; bài học kinh nghiệm kết tinh theo ETV.MP26
6. Người gây ra hoặc liên quan trực tiếp tới sự cố **không** được là người kết luận và đóng sự cố đó

### 5.8. Thay đổi và ngừng sử dụng hệ thống AI

| Loại thay đổi | Ví dụ | Yêu cầu |
|---|---|---|
| **Thay đổi nhỏ** | Sửa lỗi diễn đạt trong lời nhắc, bổ sung ví dụ, đổi ngưỡng cảnh báo không ảnh hưởng quyền hành động | ĐMKT thực hiện, PT.AI phê duyệt phiên bản; ghi nhật ký |
| **Thay đổi lớn** | Đổi mô hình/nhà cung cấp, nâng mức quyền hành động, mở rộng đối tượng chịu tác động, bắt đầu dùng dữ liệu cá nhân, nâng mức tác động | Lập lại AIA và đánh giá chất lượng; **LĐV** phê duyệt; ảnh hưởng liên phòng áp dụng thêm ETV.MP30 |

**Ngừng sử dụng**: CSH lập đề nghị nêu lý do, giải pháp thay thế, danh sách luồng công việc bị ảnh hưởng và cách xử lý dữ liệu/chỉ mục AI còn lại; LĐV phê duyệt; ĐMKT thu hồi quyền công cụ, gỡ chỉ mục AI, chuyển bản ghi sang **Hết hiệu lực**. Nhật ký suy luận đã sinh **được giữ lại** theo thời hạn tại mục 9, không xóa theo hệ thống AI.

### 5.9. Năng lực và nhận thức

- Người sử dụng hệ thống AI mức **Trung bình/Cao** phải được phổ biến về giới hạn của AI, quy định dữ liệu và trách nhiệm kiểm tra đầu ra trước khi được cấp quyền sử dụng
- PT.AI và ĐMKT phải được đào tạo về quản trị AI, rủi ro đặc thù của AI và ISO/IEC 42001
- Hồ sơ đào tạo lập theo ETV.MP03 — **không** lập biểu mẫu đào tạo riêng ở thủ tục này

### 5.10. Báo cáo và xem xét

PT.AI phối hợp QLCL tổng hợp **06 tháng/lần** và trước mỗi cuộc họp xem xét của lãnh đạo (ETV.MP17): tổng số hệ thống AI theo nhóm và mức tác động; hệ thống AI mới đăng ký và ngừng sử dụng trong kỳ; hồ sơ AIA đến hạn/quá hạn rà soát; kết quả đánh giá chất lượng; thống kê sự cố AI theo mức và tình trạng xử lý; hệ thống AI phát hiện chưa đăng ký; chi phí sử dụng AI; đề xuất điều chỉnh chính sách AI.

---

## 6. TRẠNG THÁI VÀ THẨM QUYỀN

### 6.1. Bản ghi hệ thống AI

| STT | Trạng thái | Ý nghĩa | Người thao tác | Bắt buộc lý do |
|---|---|---|---|---|
| 1 | Nháp | Đang lập hồ sơ đăng ký | CSH, ĐMKT, PT.AI | Không |
| 2 | Chờ soát xét | Chờ PT.AI kiểm tra | Người lập | Không |
| 3 | Không soát xét | Bị trả lại để sửa | PT.AI (≠ người lập) | **Có** |
| 4 | Chờ phê duyệt | Chờ LĐV | PT.AI | Không |
| 5 | Không phê duyệt | Bị trả lại để sửa | LĐV | **Có** |
| 6 | Đã phê duyệt | Được phép vận hành trong phạm vi đã duyệt | LĐV (mức Thấp: PT.AI theo ủy quyền) | Không |
| 7 | Tạm dừng | Ngừng hoạt động có thời hạn do sự cố, AIA quá hạn hoặc đánh giá Không đạt | PT.AI (khẩn cấp) · LĐV | **Có** |
| 8 | Hết hiệu lực | Đã ngừng sử dụng hoặc bị thay thế | LĐV | **Có** |
| 9 | Hủy | Bỏ bản ghi trước khi phê duyệt | LĐV | **Có** |

### 6.2. Hồ sơ đánh giá tác động AI (F29.02)

| Trạng thái | Ý nghĩa | Thẩm quyền |
|---|---|---|
| Nháp → Chờ soát xét → Chờ phê duyệt | Đang lập và trình duyệt | CSH lập · PT.AI soát xét |
| Đã phê duyệt | Có hiệu lực; điều kiện bắt buộc để tác tử được gọi công cụ | **LĐV** |
| Không phê duyệt | Bị trả lại (bắt buộc ghi lý do) | LĐV |
| Cần rà soát lại | Quá hạn rà soát; tác tử bị tạm dừng | Hệ thống phát hiện theo lịch |
| Hết hiệu lực | Bị thay thế bởi phiên bản mới | Tự động khi bản mới được phê duyệt |

### 6.3. Các đối tượng khác

| Đối tượng | Chuỗi trạng thái | Thẩm quyền kết thúc |
|---|---|---|
| Phiên bản lời nhắc | Nháp → Chờ soát xét → Đã phê duyệt → Đang áp dụng → Lưu trữ | PT.AI (thay đổi nhỏ) · LĐV (thay đổi lớn) |
| Rào chắn, chính sách AI | Nháp → Chờ phê duyệt → Đang áp dụng → Hết hiệu lực | LĐV |
| Công cụ | Đăng ký → Đang hiệu lực → Vô hiệu hóa | PT.AI · LĐV (với mức Thực thi) |
| Đợt đánh giá chất lượng | Kế hoạch → Đang chạy → Đạt / Không đạt | PT.AI |
| Phiếu sự cố AI (F29.04) | Mới → Đang xử lý → Chờ xác nhận → Đã đóng / Hủy | PT.AI (Đã đóng) · LĐV (Hủy, sự cố Nghiêm trọng) |

Mọi nhánh **Không …**, **Tạm dừng**, **Hết hiệu lực**, **Hủy** bắt buộc ghi lý do. Nhật ký suy luận và nhật ký thay đổi cấu hình **chỉ ghi thêm** — không có trạng thái sửa/xóa.

---

## 7. KIỂM SOÁT RỦI RO

- Tác tử chưa có AIA **Đã phê duyệt** mà gọi công cụ → **cổng công cụ từ chối** (mục 5.2.3)
- Công cụ mức **Thực thi** không bật `yêu cầu xác nhận` hoặc `yêu cầu phê duyệt` → **không cho lưu cấu hình**
- Kích hoạt phiên bản lời nhắc mới khi đánh giá chất lượng gần nhất **Không đạt** → **chặn cứng**, không có cơ chế vượt qua (mục 5.3.2)
- Đăng ký tác tử/công cụ trỏ tới nền tảng chưa đăng ký hoặc không còn hiệu lực tại ETV.MP35 → **không cho lưu**
- Dữ liệu mức **Hạn chế/Mật** lọt vào chỉ mục AI hoặc vào lời nhắc → **cấm tuyệt đối**; phát hiện phải gỡ ngay, mở sự cố mức Nghiêm trọng và lập KPH theo ETV.MP13
- AI ký, phê duyệt hoặc kết luận thay người có thẩm quyền → **cấm tuyệt đối**; hồ sơ phát sinh theo cách đó **không có giá trị** và phải được người có thẩm quyền xem xét lại
- Bí mật xác thực xuất hiện trong lời nhắc, nhật ký hoặc đầu ra → sự cố an toàn thông tin, xử lý theo ETV.MP28
- Hệ thống AI vận hành với AIA quá hạn rà soát → **tự động tạm dừng**
- Sử dụng dịch vụ AI bên ngoài chưa đăng ký cho công việc của Viện → xử lý theo mục 5.1.7
- Dùng dữ liệu thật của khách hàng để kiểm thử/huấn luyện khi chưa ẩn danh hoặc chưa được phê duyệt → **không chấp nhận**
- Đầu ra AI đi thẳng vào hồ sơ chính thức mà không có bước người xem xét → **không cho chuyển trạng thái hồ sơ**
- Sửa hoặc xóa nhật ký suy luận, nhật ký thay đổi cấu hình → **không có chức năng**; phát hiện dấu hiệu can thiệp là sự cố mức Nghiêm trọng

---

## 8. HƯỚNG DẪN, BIỂU MẪU ÁP DỤNG

- **ETV.P.F29.01** – Danh mục hệ thống trí tuệ nhân tạo
- **ETV.P.F29.02** – Phiếu đánh giá tác động hệ thống AI (AIA)
- **ETV.P.F29.03** – Phiếu kiểm thử và đánh giá chất lượng hệ thống AI
- **ETV.P.F29.04** – Phiếu sự cố trí tuệ nhân tạo

Hồ sơ đào tạo, năng lực người sử dụng AI dùng lại bộ biểu mẫu của **ETV.MP03**; đánh giá nhà cung cấp dịch vụ mô hình dùng lại bộ biểu mẫu của **ETV.MP06**; rủi ro an toàn thông tin của hệ thống AI ghi tại **ETV.P.F28.01**; sự cố an toàn thông tin ghi tại **ETV.P.F28.03** — **không** lập biểu mẫu trùng lặp ở thủ tục này.

---

## 9. LƯU TRỮ HỒ SƠ

| Hồ sơ | Người lưu | Thời hạn lưu |
|---|---|---|
| Danh mục hệ thống AI (F29.01) và các phiên bản | PT.AI | Vĩnh viễn trên ManLab |
| Hồ sơ đánh giá tác động AI (F29.02) | PT.AI, sao gửi QLCL | Suốt vòng đời hệ thống AI + 10 năm |
| Phiếu kiểm thử và đánh giá chất lượng (F29.03) | ĐMKT, sao gửi PT.AI | Suốt vòng đời hệ thống AI + 05 năm |
| Phiếu sự cố AI (F29.04) | PT.AI, sao gửi QLCL | 10 năm sau khi đóng |
| Nhật ký suy luận (Trace) và nhật ký gọi công cụ | QTHT | 05 năm; trường hợp liên quan chứng chỉ đã phát hành: theo thời hạn lưu của hồ sơ chứng chỉ |
| Nhật ký thay đổi cấu hình AI | QTHT | Theo ETV.MP28 |
| Lời nhắc và các phiên bản đã áp dụng | ĐMKT | Suốt vòng đời hệ thống AI + 05 năm |
| Chính sách sử dụng AI của Viện | QLCL | Theo ETV.MP14 |
| Báo cáo tình hình quản trị AI phục vụ xem xét của lãnh đạo | QLCL | Theo ETV.MP17 |

**Toàn bộ hồ sơ có liên quan được lưu trữ theo thủ tục ETV.MP15 (Kiểm soát hồ sơ) và ETV.MP14 (Kiểm soát tài liệu).**
