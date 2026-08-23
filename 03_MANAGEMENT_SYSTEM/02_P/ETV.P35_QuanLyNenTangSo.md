---
doc_id: ETV.P35
doc_name: Thủ tục Quản lý nền tảng số
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

# THỦ TỤC QUẢN LÝ NỀN TẢNG SỐ

**Procedure For Digital Platform Management**

**Mã số:** ETV.MP 35  
**Lần ban hành:** 01  
**Ngày ban hành:** 24/08/2026

## THEO DÕI SỬA ĐỔI TÀI LIỆU

| Ngày soát xét | Lý do soát xét, ban hành lại | Lần ban hành |
|---|---|---|
| 24/08/2026 | Ban hành lần thứ 01 | 01 |

---

## 1. MỤC ĐÍCH, PHẠM VI ÁP DỤNG

### 1.1. Mục đích

Thủ tục này quy định thống nhất cách thức **đăng ký, đánh giá, phê duyệt đưa vào vận hành, giám sát, thay đổi và ngừng vận hành** các nền tảng số của Viện ETV, nhằm bảo đảm mọi nền tảng số đang được Viện sử dụng đều **có danh tính rõ ràng, có chủ sở hữu, đúng môi trường, đúng mức bảo mật và được giám sát tình trạng hoạt động**, cụ thể để:

- Bảo đảm nguồn lực hạ tầng công nghệ phục vụ vận hành các quá trình luôn phù hợp và sẵn sàng (ISO 9001 §7.1.3)
- Bảo đảm mọi hệ thống quản lý thông tin dùng cho hoạt động kiểm định, hiệu chuẩn, thử nghiệm, sản xuất chất chuẩn được xác nhận giá trị sử dụng trước khi đưa vào vận hành (ISO/IEC 17025 §7.11)
- Ngăn tình trạng **nền tảng dùng chui** — phần mềm, dịch vụ đám mây, công cụ bên ngoài được sử dụng cho công việc mà không đăng ký, không có chủ sở hữu, không rõ dữ liệu chảy đi đâu
- Kiểm soát các **điểm tích hợp** giữa nền tảng của Viện và nền tảng bên ngoài — nơi phát sinh rủi ro rò rỉ dữ liệu và mất tính liên tục
- Cung cấp **sổ đăng ký nền tảng (Platform Registry)** làm nền cho quản trị hệ thống trí tuệ nhân tạo theo ETV.MP29 — mọi tác tử (agent), công cụ (tool), lời nhắc (prompt) đều phải gắn với một nền tảng đã đăng ký
- Bảo đảm dữ liệu và dịch vụ được chuyển giao an toàn khi một nền tảng ngừng vận hành

### 1.2. Phạm vi áp dụng

Áp dụng cho toàn bộ đơn vị, phòng ban, cá nhân thuộc Viện ETV và cho **mọi nền tảng số** phục vụ hoạt động quản lý, kỹ thuật, nghiên cứu, đào tạo, kinh doanh dịch vụ của Viện, bao gồm:

| Nhóm | Ví dụ |
|---|---|
| Nền tảng do Viện tự xây dựng và vận hành | ManLab (Hệ điều hành doanh nghiệp ETV), cổng thông tin nội bộ |
| Nền tảng do Viện sở hữu, giao bên ngoài vận hành | Website, cổng dịch vụ khách hàng đặt tại nhà cung cấp |
| Nền tảng thuê ngoài dạng dịch vụ (SaaS/PaaS/IaaS) | Thư điện tử, lưu trữ đám mây, nền tảng hội họp trực tuyến, dịch vụ mô hình AI |
| Nền tảng của đối tác mà Viện tích hợp vào | VI-CONNECT, cổng dữ liệu của cơ quan quản lý nhà nước |
| Nền tảng ở môi trường không phải sản xuất nhưng có dữ liệu thật | Môi trường thử nghiệm (STAGING), môi trường nội bộ (INTERNAL) |

Dữ liệu được quản lý thống nhất trên phần mềm ManLab (Module M35 – Quản lý nền tảng số).

### 1.3. Nguyên tắc "đăng ký, không sao chép"

Danh mục nền tảng số là **sổ đăng ký (registry)**, **không phải kho cấu hình và không phải kho tài liệu kỹ thuật**. Bản ghi nền tảng chỉ lưu **thông tin định danh, chủ sở hữu, môi trường, mức trọng yếu, mức phân loại dữ liệu, adapter và đường dẫn** tới nơi lưu nội dung gốc: tài liệu kiến trúc và đặc tả tại thư viện module, hồ sơ đánh giá nhà cung cấp theo ETV.MP06, hồ sơ tài sản thông tin theo ETV.MP27, hồ sơ an toàn thông tin theo ETV.MP28.

**Nghiêm cấm** lưu mật khẩu, khóa API, chứng thư số hoặc bất kỳ bí mật xác thực nào trong bản ghi nền tảng. Bí mật xác thực được quản lý theo ETV.MP28; bản ghi nền tảng chỉ ghi **nơi lưu giữ** và **người có quyền cấp phát**.

### 1.4. Ngoài phạm vi

Thủ tục này **không** thay thế và **không** trùng lặp với:

| Nội dung | Thuộc thủ tục |
|---|---|
| Hạ tầng công nghệ thông tin, máy chủ, mạng, thiết bị đầu cuối, tài khoản người dùng | ETV.MP33 – Quản lý hệ thống thông tin |
| Biện pháp kỹ thuật an toàn thông tin, quản lý bí mật xác thực, xử lý sự cố an toàn thông tin | ETV.MP28 – Quản lý an toàn thông tin |
| Danh mục và vòng đời tài sản dữ liệu, sao lưu, phục hồi | ETV.MP27 – Quản trị dữ liệu và tài sản thông tin |
| Dữ liệu số chạy trên nền tảng: chất lượng, vòng đời, kiểm soát truy xuất | ETV.MP34 – Quản lý dữ liệu số |
| Tác tử, công cụ, lời nhắc, nhật ký suy luận, đánh giá tác động AI (AIA) | ETV.MP29 – Quản lý hệ thống trí tuệ nhân tạo |
| Dịch vụ số cung cấp cho khách hàng qua nền tảng | ETV.MP38 – Quản lý dịch vụ số |
| Luồng dữ liệu nghiệp vụ giữa các module, hợp đồng dữ liệu | ETV.MP37 – Tích hợp dữ liệu |
| Sáng kiến, lộ trình và danh mục đầu tư chuyển đổi số | ETV.MP32 – Chuyển đổi số và cải tiến hệ thống |
| Mua sắm, thuê dịch vụ, đánh giá và lựa chọn nhà cung cấp | ETV.MP06 – Quản lý mua sắm |
| Thẩm định thay đổi lớn có ảnh hưởng liên phòng | ETV.MP30 – Quản lý thay đổi |
| Kế hoạch duy trì liên tục hoạt động và khắc phục thảm họa | ETV.MP31 – Quản lý tính liên tục hoạt động |
| Đánh giá và xử lý rủi ro | ETV.MP01 – Rủi ro và cơ hội |
| Nội dung, phiên bản, hiệu lực của tài liệu kiểm soát | ETV.MP14 – Kiểm soát tài liệu |

---

## 2. THUẬT NGỮ, ĐỊNH NGHĨA VÀ CHỮ VIẾT TẮT

### 2.1. Thuật ngữ và định nghĩa

**Nền tảng số (Digital Platform)**  
Một hệ thống phần mềm có danh tính độc lập, có giao diện người dùng hoặc giao diện lập trình ứng dụng (API), được Viện sở hữu, thuê hoặc tích hợp vào để thực hiện một phần công việc của Viện.

**Bản ghi nền tảng (Platform Record)**  
Một đơn vị đăng ký trong Danh mục nền tảng số, có mã nền tảng, tên gọi, chủ sở hữu, môi trường, mức trọng yếu, mức phân loại dữ liệu, loại bộ chuyển đổi và đường dẫn tới hồ sơ gốc.

**Mã nền tảng (Platform code)**  
Chuỗi định danh duy nhất toàn hệ thống của một nền tảng, viết in hoa không dấu (ví dụ `MANLAB`, `VICONNECT`). Mã nền tảng **không được tái sử dụng** sau khi nền tảng bị hủy.

**Môi trường (Environment)**  
Ngữ cảnh vận hành của nền tảng, gồm ba giá trị: **PRODUCTION** (sản xuất – phục vụ công việc thật), **STAGING** (thử nghiệm – kiểm thử trước khi phát hành), **INTERNAL** (nội bộ – dùng riêng trong Viện, không phục vụ khách hàng).

**Bộ chuyển đổi (Adapter)**  
Thành phần phần mềm đảm nhận toàn bộ cách thức giao tiếp riêng của một nền tảng (cách gọi API, định dạng phản hồi, cách xác thực). Mỗi nền tảng có **đúng một** loại bộ chuyển đổi tương ứng.

**Bộ chuyển đổi tạm (Placeholder Adapter)**  
Bộ chuyển đổi dùng cho nền tảng đã đăng ký nhưng **chưa có quyền truy cập API thật**. Bộ chuyển đổi tạm trả về lỗi rõ ràng thay vì suy đoán hành vi của nền tảng.

**Điểm tích hợp (Integration point)**  
Một kết nối kỹ thuật cụ thể giữa nền tảng của Viện và một nền tảng khác, đặc trưng bởi hướng truyền dữ liệu, loại dữ liệu trao đổi và phương thức xác thực.

**Tình trạng vận hành (Health status)**  
Trạng thái kỹ thuật thời điểm hiện tại của nền tảng do tiến trình kiểm tra sức khỏe tự động xác định, gồm bốn giá trị: **Hoạt động tốt** (HEALTHY), **Suy giảm** (DEGRADED), **Ngừng** (DOWN), **Chưa xác định** (UNKNOWN). Tình trạng vận hành **không phải** trạng thái hồ sơ.

**Kiểm tra sức khỏe (Health check)**  
Phép kiểm tra tự động, định kỳ, do ManLab thực hiện để cập nhật tình trạng vận hành của nền tảng.

**Chủ sở hữu nền tảng (Platform Owner)**  
Lãnh đạo đơn vị hoặc người phụ trách lĩnh vực chịu trách nhiệm về việc nền tảng đó tồn tại, phục vụ đúng mục đích nghiệp vụ và được duy trì hiệu lực.

**Đầu mối kỹ thuật (Technical Contact)**  
Cá nhân chịu trách nhiệm cấu hình, theo dõi và xử lý sự cố kỹ thuật của nền tảng.

**Mức trọng yếu nền tảng (Criticality)**  
Mức độ ảnh hưởng tới Viện nếu nền tảng ngừng hoạt động hoặc bị xâm phạm, gồm ba mức: Thấp, Trung bình, Cao.

**Ngừng vận hành (Decommission)**  
Việc chấm dứt sử dụng một nền tảng, kèm theo xử lý dữ liệu, thu hồi quyền truy cập và cắt các điểm tích hợp liên quan.

### 2.2. Chữ viết tắt

| Chữ viết tắt | Ý nghĩa |
|---|---|
| LĐV | Lãnh đạo Viện |
| QLCL | Phụ trách Quản lý chất lượng |
| QTHT | Quản trị hệ thống |
| CSH | Chủ sở hữu nền tảng |
| ĐMKT | Đầu mối kỹ thuật |
| TP | Trưởng phòng/Người phụ trách lĩnh vực |
| API | Giao diện lập trình ứng dụng |
| SaaS | Phần mềm dạng dịch vụ |
| AIA | Đánh giá tác động hệ thống trí tuệ nhân tạo |

---

## 3. TÀI LIỆU VIỆN DẪN

### 3.1. Tiêu chuẩn quốc tế

- **ISO 9001:2015** (Điều 7.1.3 Cơ sở hạ tầng; 8.4 Kiểm soát quá trình, sản phẩm, dịch vụ do bên ngoài cung cấp; 8.5.1 Kiểm soát việc cung cấp sản phẩm, dịch vụ; 9.3 Xem xét của lãnh đạo)
- **ISO/IEC 17025:2017** (Điều 6.6 Sản phẩm và dịch vụ do bên ngoài cung cấp; 7.11 Kiểm soát dữ liệu và quản lý thông tin; 8.5 Hành động giải quyết rủi ro và cơ hội)
- **ISO 17034:2016** (Điều 7.4 Kiểm soát dữ liệu; 6.6 Dịch vụ bên ngoài)
- **ISO/IEC 27001:2022** (Điều 8.1 Hoạch định và kiểm soát vận hành; A.5.9 Kiểm kê tài sản; A.5.19–A.5.23 An toàn thông tin trong quan hệ nhà cung cấp và dịch vụ đám mây; A.5.30 Sẵn sàng công nghệ thông tin cho tính liên tục; A.8.9 Quản lý cấu hình; A.8.16 Hoạt động giám sát; A.8.31 Tách biệt môi trường phát triển, thử nghiệm và sản xuất)
- **ISO/IEC 42001:2023** (Điều 6.1 Hành động giải quyết rủi ro và cơ hội; 8.1 Kiểm soát vận hành hệ thống AI; 8.4 Quản lý bên thứ ba và nhà cung cấp)

### 3.2. Văn bản nội bộ Viện ETV

- Sổ tay quản lý chất lượng (ETV.QM)
- Thủ tục ETV.MP01 – Quản lý rủi ro và cơ hội
- Thủ tục ETV.MP06 – Quản lý mua sắm
- Thủ tục ETV.MP14 – Kiểm soát tài liệu
- Thủ tục ETV.MP15 – Kiểm soát hồ sơ
- Thủ tục ETV.MP17 – Xem xét của lãnh đạo
- Thủ tục ETV.MP27 – Quản trị dữ liệu và tài sản thông tin
- Thủ tục ETV.MP28 – Quản lý an toàn thông tin
- Thủ tục ETV.MP29 – Quản lý hệ thống trí tuệ nhân tạo
- Thủ tục ETV.MP30 – Quản lý thay đổi
- Thủ tục ETV.MP31 – Quản lý tính liên tục hoạt động
- Thủ tục ETV.MP32 – Chuyển đổi số và cải tiến hệ thống
- Thủ tục ETV.MP33 – Quản lý hệ thống thông tin
- Thủ tục ETV.MP34 – Quản lý dữ liệu số
- Thủ tục ETV.MP37 – Tích hợp dữ liệu
- Thủ tục ETV.MP38 – Quản lý dịch vụ số

---

## 4. TRÁCH NHIỆM

### 4.1. Lãnh đạo Viện (LĐV)

- **Phê duyệt** đăng ký nền tảng số mới và việc đưa nền tảng vào vận hành
- Phê duyệt việc ngừng vận hành, tuyên bố hết hiệu lực hoặc hủy bản ghi nền tảng
- Phê duyệt ngoại lệ đối với nền tảng chưa đáp ứng đủ điều kiện đưa vào vận hành (mục 5.2.3)
- Quyết định biện pháp xử lý khi nền tảng mức trọng yếu Cao mất khả năng hoạt động
- Xem xét tình hình nền tảng số trong cuộc họp xem xét của lãnh đạo (ETV.MP17)

### 4.2. Phụ trách Quản lý chất lượng (QLCL)

- Quản trị Danh mục nền tảng số (F35.01); duy trì danh mục chuẩn phân nhóm nền tảng
- Kiểm tra tính đầy đủ hồ sơ đánh giá trước vận hành (F35.02) trước khi trình LĐV
- Theo dõi nền tảng **đến hạn rà soát**, nền tảng ở tình trạng Suy giảm/Ngừng kéo dài, báo cáo LĐV
- Tổng hợp báo cáo tình hình nền tảng số phục vụ xem xét của lãnh đạo
- Lưu trữ hồ sơ theo ETV.MP15

### 4.3. Chủ sở hữu nền tảng (CSH)

- Đề xuất đăng ký nền tảng mới; chịu trách nhiệm về **lý do nghiệp vụ** của nền tảng
- Xác định mức trọng yếu, mức phân loại dữ liệu xử lý trên nền tảng
- Rà soát định kỳ bản ghi nền tảng; đề xuất ngừng vận hành khi nền tảng không còn cần thiết
- Bảo đảm người dùng thuộc phạm vi quản lý chỉ sử dụng nền tảng đã được phê duyệt

### 4.4. Đầu mối kỹ thuật (ĐMKT)

- Cấu hình bộ chuyển đổi, điểm tích hợp và tham số kiểm tra sức khỏe
- Theo dõi tình trạng vận hành hằng ngày; ghi nhận và xử lý sự cố nền tảng (F35.03)
- Thực hiện thay đổi kỹ thuật đã được phê duyệt; ghi đầy đủ nhật ký thay đổi
- Thực hiện cắt kết nối, thu hồi quyền truy cập khi ngừng vận hành

### 4.5. Quản trị hệ thống (QTHT)

- Vận hành ManLab Module M35; bảo đảm phân quyền theo vai trò và ghi nhật ký thao tác
- Bảo đảm bí mật xác thực của nền tảng được lưu đúng nơi theo ETV.MP28, **không** nằm trong bản ghi nền tảng
- Thực hiện thao tác kỹ thuật theo quyết định của LĐV/CSH — **không** tự quyết định nền tảng nào được dùng

### 4.6. Nhân viên

- Chỉ sử dụng nền tảng số đã được phê duyệt cho công việc của Viện
- Báo cáo QLCL khi phát hiện nền tảng đang được sử dụng mà chưa đăng ký
- Báo cáo ĐMKT khi phát hiện nền tảng hoạt động bất thường

> **Nguyên tắc tách vai trò:** Người lập ≠ người phê duyệt. Người soát xét là TP/ĐMKT khác người lập. Trợ lý AI **không** được lập bản ghi nền tảng chính thức, **không** soát xét và **không** phê duyệt (ISO/IEC 42001; ETV.MP29).

---

## 5. NỘI DUNG

### 5.1. Danh mục nền tảng số (Biểu mẫu F35.01)

#### 5.1.1. Phân nhóm nền tảng

| TT | Nhóm nền tảng | Ví dụ tại Viện |
|---|---|---|
| 1 | Nền tảng lõi nghiệp vụ | ManLab – Hệ điều hành doanh nghiệp ETV |
| 2 | Nền tảng đối tác/liên thông | VI-CONNECT, cổng dữ liệu cơ quan quản lý nhà nước |
| 3 | Nền tảng văn phòng và cộng tác | Thư điện tử, lưu trữ đám mây, hội họp trực tuyến |
| 4 | Nền tảng dịch vụ khách hàng | Website, cổng tra cứu kết quả, cổng chứng chỉ số |
| 5 | Nền tảng dữ liệu và phân tích | Kho dữ liệu, công cụ báo cáo |
| 6 | Nền tảng trí tuệ nhân tạo | Dịch vụ mô hình ngôn ngữ, cổng công cụ AI |
| 7 | Nền tảng phát triển và vận hành | Kho mã nguồn, hệ thống tích hợp liên tục, môi trường thử nghiệm |

#### 5.1.2. Môi trường

| Môi trường | Ý nghĩa | Yêu cầu bắt buộc |
|---|---|---|
| **PRODUCTION** | Phục vụ công việc thật, dữ liệu thật | Bắt buộc có hồ sơ đánh giá trước vận hành (F35.02) đã phê duyệt; bắt buộc bật kiểm tra sức khỏe |
| **STAGING** | Kiểm thử trước khi phát hành | Bắt buộc ghi rõ dữ liệu sử dụng là dữ liệu thật hay dữ liệu giả lập; nếu là dữ liệu thật thì áp dụng nguyên yêu cầu của PRODUCTION |
| **INTERNAL** | Dùng riêng trong Viện | Bắt buộc có chủ sở hữu và mức phân loại dữ liệu |

Nền tảng ở môi trường khác nhau được đăng ký thành **các bản ghi riêng biệt**, không gộp chung một bản ghi.

#### 5.1.3. Mức trọng yếu và hành động yêu cầu

| Mức | Ý nghĩa | Hành động bắt buộc |
|---|---|---|
| **Thấp** | Ngừng hoạt động không ảnh hưởng đáng kể | Rà soát theo chu kỳ; kiểm tra sức khỏe không bắt buộc |
| **Trung bình** | Ảnh hưởng tới hiệu quả một quá trình/một phòng | Bắt buộc bật kiểm tra sức khỏe; có phương án thay thế tạm thời |
| **Cao** | Ngừng hoạt động ảnh hưởng tới năng lực kỹ thuật, khả năng cung cấp dịch vụ, hoặc gây mất/lộ dữ liệu Hạn chế/Mật | Bắt buộc bật kiểm tra sức khỏe; bắt buộc có kế hoạch duy trì liên tục theo ETV.MP31 và ≥ 01 rủi ro đã mở tại ETV.MP01; rà soát ≤ 01 năm |

Thang trọng yếu này chỉ dùng để **sàng lọc mức ưu tiên**; việc đánh giá và xử lý rủi ro thực hiện theo ETV.MP01.

#### 5.1.4. Phân loại dữ liệu xử lý trên nền tảng

Bản ghi nền tảng dùng **nguyên** thang phân loại thông tin của Viện: **Công khai · Nội bộ · Hạn chế · Mật** (ETV.MP02, ETV.MP27, ETV.MP28), ghi theo **mức cao nhất** của dữ liệu mà nền tảng xử lý hoặc lưu trữ. Thủ tục này **không** định nghĩa thang phân loại riêng.

Nền tảng **thuê ngoài** xử lý dữ liệu mức **Hạn chế** hoặc **Mật** chỉ được phê duyệt khi có hồ sơ đánh giá nhà cung cấp theo ETV.MP06 và cam kết bảo mật/thỏa thuận xử lý dữ liệu còn hiệu lực.

#### 5.1.5. Chu kỳ rà soát

| Mức trọng yếu | Chu kỳ rà soát mặc định |
|---|---|
| Cao | ≤ 01 năm |
| Trung bình | 02 năm |
| Thấp | Theo sự kiện (khi có thay đổi liên quan) |

Chủ sở hữu có thể đề xuất chu kỳ ngắn hơn (06 tháng) đối với nền tảng thay đổi nhanh hoặc nền tảng AI. Quá hạn rà soát, hệ thống gắn cờ **Đến hạn rà soát** và cảnh báo chủ sở hữu; quá **02 chu kỳ** liên tiếp, cảnh báo tới LĐV. Hệ thống **không** tự chuyển bản ghi sang Hết hiệu lực — việc tuyên bố một nền tảng không còn dùng luôn do con người quyết định.

#### 5.1.6. Bộ chuyển đổi và điểm tích hợp

- Mỗi nền tảng có **đúng một** loại bộ chuyển đổi. Loại bộ chuyển đổi phải khớp một thành phần đã triển khai thật; **không** chấp nhận giá trị tự do không tương ứng triển khai.
- Nền tảng chưa có quyền truy cập API thật đăng ký với **bộ chuyển đổi tạm**; ở trạng thái này nền tảng **không được** dùng làm căn cứ cho bất kỳ nghiệp vụ tự động nào, và phải xác nhận lại khi có quyền truy cập API thật.
- Mỗi điểm tích hợp được ghi tối thiểu: nền tảng đối tác, hướng truyền dữ liệu (đi/đến/hai chiều), loại dữ liệu trao đổi, mức phân loại cao nhất, phương thức xác thực và nơi lưu bí mật xác thực.
- Hợp đồng dữ liệu và ánh xạ trường dữ liệu của điểm tích hợp thuộc ETV.MP37; bản ghi nền tảng chỉ dẫn chiếu.

#### 5.1.7. Quy trình đăng ký và phê duyệt bản ghi nền tảng

| Bước | Trạng thái | Người thực hiện | Nội dung |
|---|---|---|---|
| 1 | Nháp | CSH, ĐMKT, QLCL | Lập bản ghi: mã nền tảng, tên gọi, nhóm, môi trường, địa chỉ giao diện, địa chỉ gốc API, chủ sở hữu, đầu mối kỹ thuật, mức trọng yếu, mức phân loại dữ liệu, loại bộ chuyển đổi, điểm tích hợp, chu kỳ rà soát, đường dẫn hồ sơ gốc |
| 2 | Chờ soát xét | Người lập | Chuyển soát xét khi đã đủ trường bắt buộc và đã đính kèm hồ sơ đánh giá trước vận hành (F35.02) đối với nền tảng PRODUCTION |
| 3 | Soát xét | ĐMKT/TP (≠ người lập) | Kiểm tra: mã nền tảng không trùng, bộ chuyển đổi khớp triển khai thật, điểm tích hợp đầy đủ, không trùng lặp với nền tảng đã có. Đạt → Chờ phê duyệt; Không đạt → **Không soát xét** (bắt buộc ghi lý do) |
| 4 | Chờ phê duyệt | QLCL | Trình LĐV kèm hồ sơ F35.02 |
| 5 | Phê duyệt | **LĐV** | Phê duyệt → **Đã phê duyệt**; Không đạt → **Không phê duyệt** (bắt buộc ghi lý do). Hệ thống chặn phê duyệt nếu vi phạm mục 5.2.3 |
| 6 | Đưa vào vận hành | QTHT/ĐMKT | Bật kiểm tra sức khỏe, kết nối bộ chuyển đổi; bản ghi chuyển **Hiệu lực** |
| 7 | Rà soát định kỳ | CSH | Xác nhận còn cần thiết và còn đúng (ghi lại mốc rà soát), hoặc lập thay đổi theo mục 5.4, hoặc đề nghị ngừng vận hành theo mục 5.5 |

Bản ghi ở trạng thái **Nháp** hoặc bị trả lại **không** được dùng làm căn cứ cho bất kỳ nghiệp vụ nào; không được đăng ký tác tử/công cụ (ETV.MP29) trỏ vào bản ghi đó.

#### 5.1.8. Mã nền tảng

Mã nền tảng do QLCL cấp, **duy nhất toàn hệ thống**, viết in hoa không dấu, không chứa khoảng trắng. Mã của nền tảng đã Hủy hoặc Hết hiệu lực **không được cấp lại** cho nền tảng khác — nhằm giữ nguyên giá trị truy vết của nhật ký lịch sử.

### 5.2. Đánh giá trước khi đưa vào vận hành (Biểu mẫu F35.02)

#### 5.2.1. Khi nào phải lập

Bắt buộc lập hồ sơ đánh giá trước vận hành trong các trường hợp:

- Đăng ký mới một nền tảng ở môi trường **PRODUCTION**
- Nền tảng ở môi trường **STAGING** có xử lý dữ liệu thật
- Nền tảng thuê ngoài xử lý dữ liệu mức **Hạn chế** hoặc **Mật**
- Chuyển một nền tảng từ STAGING/INTERNAL lên PRODUCTION

#### 5.2.2. Nội dung đánh giá

| Nhóm nội dung | Câu hỏi phải trả lời |
|---|---|
| Nhu cầu nghiệp vụ | Nền tảng phục vụ quá trình nào? Có trùng lặp với nền tảng đã có không? |
| Dữ liệu | Xử lý dữ liệu gì, mức phân loại cao nhất, lưu ở đâu, ai truy cập được? |
| An toàn thông tin | Cơ chế xác thực, phân quyền, mã hóa, nhật ký; bí mật xác thực lưu ở đâu (ETV.MP28)? |
| Nhà cung cấp | Nếu thuê ngoài: đã đánh giá theo ETV.MP06 chưa; cam kết bảo mật, thỏa thuận mức dịch vụ và điều khoản trả lại dữ liệu? |
| Xác nhận giá trị sử dụng | Nếu nền tảng tham gia xử lý dữ liệu kiểm định/hiệu chuẩn/thử nghiệm: đã xác nhận giá trị sử dụng theo ISO/IEC 17025 §7.11 chưa (bằng chứng kèm theo)? |
| Tính liên tục | Mức trọng yếu; phương án khi nền tảng ngừng hoạt động; sao lưu và khả năng phục hồi (ETV.MP31) |
| Tích hợp | Các điểm tích hợp phát sinh; ảnh hưởng tới nền tảng đang chạy |
| Trí tuệ nhân tạo | Nền tảng có thành phần AI không; nếu có, đã có hồ sơ AIA theo ETV.MP29 chưa? |
| Rủi ro | Rủi ro đã nhận diện và mã rủi ro tương ứng đã mở tại ETV.MP01 |

#### 5.2.3. Điều kiện chặn cứng

Bản ghi nền tảng **không được phê duyệt đưa vào vận hành** nếu thiếu một trong các điều kiện sau:

1. Có **chủ sở hữu** và **đầu mối kỹ thuật** là người cụ thể đang làm việc tại Viện
2. Có **mức phân loại dữ liệu** và mức đó nhất quán với mô tả dữ liệu tại F35.02
3. Nền tảng **PRODUCTION** có hồ sơ F35.02 đã phê duyệt và đã bật kiểm tra sức khỏe
4. Nền tảng mức trọng yếu **Cao** có ≥ 01 rủi ro đã mở tại ETV.MP01 và phương án liên tục theo ETV.MP31
5. Nền tảng **thuê ngoài** xử lý dữ liệu **Hạn chế/Mật** có hồ sơ đánh giá nhà cung cấp theo ETV.MP06 còn hiệu lực
6. Nền tảng có thành phần **AI** có hồ sơ AIA theo ETV.MP29
7. Bản ghi **không** chứa mật khẩu, khóa API hoặc bí mật xác thực

Đây là điều kiện **chặn cứng**: hệ thống ManLab từ chối thao tác phê duyệt khi chưa đủ. Trường hợp cấp bách, LĐV có thể phê duyệt **ngoại lệ có thời hạn** — bắt buộc ghi lý do, ghi thời hạn khắc phục không quá 90 ngày và mở rủi ro tương ứng tại ETV.MP01. Quá thời hạn khắc phục mà chưa đủ điều kiện, bản ghi tự gắn cờ cảnh báo tới LĐV.

### 5.3. Giám sát tình trạng và sự cố nền tảng (Biểu mẫu F35.03)

#### 5.3.1. Kiểm tra sức khỏe

- Nền tảng mức trọng yếu **Cao** và **Trung bình**: bắt buộc bật kiểm tra sức khỏe tự động.
- Kết quả kiểm tra cập nhật trường **tình trạng vận hành**: Hoạt động tốt · Suy giảm · Ngừng · Chưa xác định.
- Tình trạng vận hành **tách biệt hoàn toàn** với vòng đời phê duyệt: nền tảng chuyển sang Suy giảm hay Ngừng **không** làm bản ghi quay lại quy trình soát xét/phê duyệt.
- Tình trạng **Chưa xác định** kéo dài quá 07 ngày được coi là **mất giám sát** và phải xử lý như một sự cố.

#### 5.3.2. Ngưỡng cảnh báo và xử lý

| Tình huống | Xử lý |
|---|---|
| Nền tảng mức Cao ở tình trạng **Ngừng** | ĐMKT xử lý ngay, thông báo CSH và LĐV trong vòng 01 giờ; ghi phiếu sự cố (F35.03) |
| Nền tảng mức Cao ở tình trạng **Suy giảm** quá 24 giờ | Ghi phiếu sự cố; CSH quyết định kích hoạt phương án thay thế |
| Nền tảng mức Trung bình **Ngừng** quá 24 giờ | Ghi phiếu sự cố; báo cáo CSH |
| Nền tảng bất kỳ ở tình trạng **Chưa xác định** quá 07 ngày | Ghi phiếu sự cố mất giám sát; ĐMKT khôi phục kiểm tra sức khỏe |
| Sự cố có dấu hiệu mất an toàn thông tin | **Đồng thời** xử lý theo ETV.MP28; không đóng phiếu F35.03 trước khi ETV.MP28 kết luận |
| Sự cố lặp lại ≥ 03 lần trong 90 ngày | Lập sự không phù hợp và hành động khắc phục theo ETV.MP13 |

#### 5.3.3. Đóng phiếu sự cố

Phiếu sự cố chỉ được đóng khi có đủ: nguyên nhân, biện pháp đã thực hiện, xác nhận nền tảng trở lại tình trạng Hoạt động tốt, và kết luận có/không phải lập bài học kinh nghiệm theo ETV.MP26.

### 5.4. Thay đổi nền tảng và điểm tích hợp

#### 5.4.1. Phân loại thay đổi

| Loại thay đổi | Ví dụ | Thẩm quyền |
|---|---|---|
| **Thay đổi nhỏ** | Sửa tên hiển thị, cập nhật đầu mối kỹ thuật, sửa mô tả | CSH duyệt; ghi nhật ký thay đổi |
| **Thay đổi cấu hình kết nối** | Đổi địa chỉ gốc API, đổi loại bộ chuyển đổi, thêm/bớt điểm tích hợp | Soát xét bởi ĐMKT (≠ người đề xuất) + phê duyệt của CSH; **bắt buộc** ghi nhật ký thay đổi |
| **Thay đổi lớn** | Đổi môi trường (STAGING → PRODUCTION), đổi mức trọng yếu lên Cao, đổi mức phân loại dữ liệu lên Hạn chế/Mật, đổi nhà cung cấp | Trình lại theo mục 5.1.7 và lập/soát xét lại F35.02; **LĐV** phê duyệt; thay đổi có ảnh hưởng liên phòng áp dụng thêm ETV.MP30 |

#### 5.4.2. Quy tắc bắt buộc

- **Mọi** thay đổi địa chỉ gốc API, loại bộ chuyển đổi hoặc điểm tích hợp của một nền tảng **đang có tác tử/công cụ hoạt động** (ETV.MP29) đều **bắt buộc ghi nhật ký thay đổi**, vì ảnh hưởng trực tiếp tới cổng công cụ.
- **Không** sửa đè bản ghi nền tảng đang Hiệu lực bằng thay đổi thuộc loại "thay đổi lớn"; phải lập phiên bản mới có liên kết tới phiên bản bị thay thế.
- **Mã nền tảng không được sửa** sau khi bản ghi đã phê duyệt. Nếu cần mã khác, phải ngừng vận hành bản ghi cũ và đăng ký bản ghi mới.

### 5.5. Ngừng vận hành nền tảng số (Biểu mẫu F35.04)

#### 5.5.1. Căn cứ ngừng vận hành

Nền tảng được đề nghị ngừng vận hành khi: không còn nhu cầu nghiệp vụ; bị thay thế bởi nền tảng khác; hết hạn hợp đồng thuê dịch vụ; nhà cung cấp chấm dứt dịch vụ; hoặc nền tảng không còn đáp ứng yêu cầu an toàn thông tin.

#### 5.5.2. Trình tự

| Bước | Người thực hiện | Nội dung |
|---|---|---|
| 1 | CSH | Lập phiếu ngừng vận hành (F35.04): lý do, nền tảng thay thế (nếu có), danh sách điểm tích hợp bị ảnh hưởng, danh sách dữ liệu cần xử lý |
| 2 | ĐMKT | Xác nhận phương án kỹ thuật: trích xuất/di chuyển dữ liệu, cắt điểm tích hợp, thu hồi quyền truy cập và bí mật xác thực |
| 3 | QLCL | Kiểm tra: mọi tác tử/công cụ (ETV.MP29) và dịch vụ số (ETV.MP38) trỏ tới nền tảng này đã được chuyển hướng hoặc dừng |
| 4 | **LĐV** | Phê duyệt ngừng vận hành (bắt buộc ghi lý do) |
| 5 | ĐMKT/QTHT | Thực hiện cắt kết nối, xử lý dữ liệu theo ETV.MP27/MP34, thu hồi quyền truy cập |
| 6 | QLCL | Chuyển bản ghi sang **Hết hiệu lực**; lưu hồ sơ theo ETV.MP15 |

#### 5.5.3. Điều kiện chặn cứng khi ngừng vận hành

Không được chuyển bản ghi sang **Hết hiệu lực** khi còn tồn tại tác tử, công cụ (ETV.MP29) hoặc dịch vụ số (ETV.MP38) đang hoạt động và trỏ tới nền tảng đó. Hệ thống ManLab từ chối thao tác và chỉ ra danh sách đối tượng còn phụ thuộc.

Dữ liệu trên nền tảng ngừng vận hành phải được xử lý theo ETV.MP27/MP34 (trích xuất, chuyển giao hoặc hủy có kiểm soát) **trước khi** chấm dứt quyền truy cập; biên bản xử lý dữ liệu đính kèm F35.04.

### 5.6. Nền tảng chưa đăng ký

Nền tảng số đang được sử dụng cho công việc của Viện mà **chưa có bản ghi đăng ký** được coi là **không phù hợp**. Khi phát hiện:

1. QLCL lập bản ghi ở trạng thái Nháp và thông báo cho người đang sử dụng, xác định chủ sở hữu
2. Nếu nền tảng cần thiết → đưa vào quy trình đăng ký tại mục 5.1.7 trong thời hạn 30 ngày
3. Nếu nền tảng không cần thiết hoặc không đáp ứng điều kiện tại mục 5.2.3 → ngừng sử dụng ngay, xử lý dữ liệu đã đưa lên theo ETV.MP27/MP34
4. Trường hợp đã đưa dữ liệu mức Hạn chế/Mật lên nền tảng chưa đăng ký → lập sự không phù hợp theo ETV.MP13 và xử lý sự cố theo ETV.MP28

### 5.7. Quan hệ với quản trị trí tuệ nhân tạo và dịch vụ số

- Danh mục nền tảng số là **nền cho bộ lọc** của trang quản trị AI: mọi tác tử, công cụ, lời nhắc, nhật ký suy luận và số liệu sử dụng tại ETV.MP29 đều tham chiếu tới một mã nền tảng đã đăng ký ở thủ tục này.
- Đăng ký một tác tử/công cụ trỏ tới nền tảng **không tồn tại**, **chưa phê duyệt**, **Hết hiệu lực** hoặc **đã Hủy** là lỗi ràng buộc — hệ thống từ chối.
- Dịch vụ số cung cấp cho khách hàng (ETV.MP38) phải khai báo nền tảng vận hành dịch vụ đó; dịch vụ không được công bố nếu nền tảng chưa ở trạng thái Hiệu lực.

### 5.8. Báo cáo và xem xét

QLCL tổng hợp **06 tháng/lần** và trước mỗi cuộc họp xem xét của lãnh đạo (ETV.MP17) các nội dung: tổng số nền tảng theo nhóm và môi trường; nền tảng mới đăng ký, nền tảng ngừng vận hành trong kỳ; nền tảng đến hạn/quá hạn rà soát; thống kê sự cố và thời gian ngừng hoạt động của nền tảng mức Cao; nền tảng đang vận hành theo ngoại lệ có thời hạn; nền tảng phát hiện chưa đăng ký trong kỳ.

---

## 6. TRẠNG THÁI VÀ THẨM QUYỀN

### 6.1. Bản ghi nền tảng

| STT | Trạng thái | Ý nghĩa | Người thao tác | Bắt buộc lý do |
|---|---|---|---|---|
| 1 | Nháp | Đang soạn | CSH, ĐMKT, QLCL | Không |
| 2 | Chờ soát xét | Chờ kiểm tra kỹ thuật và trùng lặp | Người lập | Không |
| 3 | Không soát xét | Bị trả lại để sửa | ĐMKT/TP (≠ người lập) | **Có** |
| 4 | Chờ phê duyệt | Chờ LĐV | QLCL | Không |
| 5 | Không phê duyệt | Bị trả lại để sửa | LĐV | **Có** |
| 6 | Đã phê duyệt | Được chấp thuận, chờ đưa vào vận hành | LĐV | Không |
| 7 | Hiệu lực | Đang vận hành, được tham chiếu bởi ETV.MP29/MP38 | QTHT/ĐMKT (sau khi bật kiểm tra sức khỏe) | Không |
| 8 | Hết hiệu lực | Đã ngừng vận hành hoặc bị thay thế | LĐV (qua phiếu F35.04) hoặc tự động khi phiên bản mới được phê duyệt | **Có** |
| 9 | Hủy | Bỏ bản ghi trước khi phê duyệt | LĐV | **Có** |

Cờ **Đến hạn rà soát** và cờ **Ngoại lệ quá hạn khắc phục** không phải trạng thái hồ sơ, mà là cảnh báo tính theo mục 5.1.5 và mục 5.2.3.

### 6.2. Tình trạng vận hành (không phải trạng thái hồ sơ)

| Tình trạng | Ý nghĩa | Nguồn cập nhật |
|---|---|---|
| Hoạt động tốt (HEALTHY) | Kiểm tra sức khỏe đạt | Tiến trình tự động |
| Suy giảm (DEGRADED) | Hoạt động nhưng không đầy đủ hoặc chậm bất thường | Tiến trình tự động |
| Ngừng (DOWN) | Không truy cập được | Tiến trình tự động |
| Chưa xác định (UNKNOWN) | Chưa bật kiểm tra sức khỏe hoặc kiểm tra không chạy | Tiến trình tự động |

Tình trạng vận hành chỉ áp dụng cho bản ghi ở trạng thái **Hiệu lực** và **không** kéo bản ghi quay lại quy trình phê duyệt.

### 6.3. Các đối tượng khác

| Đối tượng | Chuỗi trạng thái | Thẩm quyền kết thúc |
|---|---|---|
| Hồ sơ đánh giá trước vận hành (F35.02) | Nháp → Chờ soát xét → Chờ phê duyệt → Đã phê duyệt / Không phê duyệt | LĐV |
| Phiếu sự cố nền tảng (F35.03) | Mới → Đang xử lý → Chờ xác nhận → Đã đóng / Hủy | CSH (Đã đóng) · LĐV (Hủy) |
| Phiếu ngừng vận hành (F35.04) | Nháp → Chờ phê duyệt → Đã phê duyệt → Đã thực hiện / Hủy | LĐV |

Mọi nhánh **Hủy**/**Không phê duyệt** bắt buộc ghi lý do.

---

## 7. KIỂM SOÁT RỦI RO

- Bản ghi nền tảng không có chủ sở hữu hoặc đầu mối kỹ thuật là người cụ thể → **không cho lưu**
- Bản ghi chứa mật khẩu, khóa API, chứng thư số → **cấm tuyệt đối**; phát hiện phải thu hồi bí mật xác thực ngay theo ETV.MP28 và lập KPH theo ETV.MP13
- Nền tảng PRODUCTION chưa có hồ sơ F35.02 đã phê duyệt → **chặn phê duyệt** (mục 5.2.3)
- Nền tảng mức trọng yếu Cao chưa có rủi ro tại ETV.MP01 và phương án liên tục theo ETV.MP31 → **chặn phê duyệt**
- Nền tảng thuê ngoài xử lý dữ liệu Hạn chế/Mật chưa đánh giá nhà cung cấp theo ETV.MP06 → **chặn phê duyệt**
- Nền tảng có thành phần AI chưa có hồ sơ AIA theo ETV.MP29 → **chặn phê duyệt**
- Đăng ký tác tử/công cụ (ETV.MP29) trỏ tới nền tảng không tồn tại, chưa phê duyệt hoặc đã hết hiệu lực → **lỗi ràng buộc, từ chối thao tác**
- Đổi địa chỉ gốc API hoặc bộ chuyển đổi mà không ghi nhật ký thay đổi → **không cho lưu**
- Ngừng vận hành nền tảng khi còn tác tử/công cụ/dịch vụ số đang phụ thuộc → **chặn thao tác**
- Chấm dứt quyền truy cập nền tảng trước khi xử lý xong dữ liệu → **không chấp nhận**; phải hoàn tất theo ETV.MP27/MP34
- Tái sử dụng mã nền tảng của nền tảng đã Hủy/Hết hiệu lực → **không cho phép**
- Nền tảng vận hành theo ngoại lệ quá thời hạn khắc phục → cảnh báo LĐV, đưa vào báo cáo xem xét của lãnh đạo
- Sử dụng nền tảng chưa đăng ký cho công việc của Viện → xử lý theo mục 5.6; nếu đã đưa dữ liệu Hạn chế/Mật lên thì lập KPH theo ETV.MP13
- Nền tảng đăng ký với bộ chuyển đổi tạm được dùng làm căn cứ cho nghiệp vụ tự động → **không chấp nhận**

---

## 8. HƯỚNG DẪN, BIỂU MẪU ÁP DỤNG

- **ETV.P.F35.01** – Danh mục nền tảng số
- **ETV.P.F35.02** – Phiếu đánh giá nền tảng số trước khi đưa vào vận hành
- **ETV.P.F35.03** – Phiếu sự cố và nhật ký giám sát nền tảng số
- **ETV.P.F35.04** – Phiếu ngừng vận hành nền tảng số

Việc đánh giá nhà cung cấp sử dụng lại bộ biểu mẫu của ETV.MP06; hồ sơ đánh giá tác động AI sử dụng lại biểu mẫu của ETV.MP29 — **không** lập biểu mẫu mới ở thủ tục này.

---

## 9. LƯU TRỮ HỒ SƠ

| Hồ sơ | Người lưu | Thời hạn lưu |
|---|---|---|
| Danh mục nền tảng số (F35.01) và các phiên bản | QLCL | Vĩnh viễn trên ManLab |
| Phiếu đánh giá trước vận hành (F35.02) | QLCL | Suốt vòng đời nền tảng + 05 năm |
| Phiếu sự cố nền tảng (F35.03) | ĐMKT, sao gửi QLCL | 05 năm sau khi đóng |
| Phiếu ngừng vận hành (F35.04) kèm biên bản xử lý dữ liệu | QLCL | 10 năm |
| Nhật ký thay đổi cấu hình nền tảng | QTHT | Theo ETV.MP28 |
| Kết quả kiểm tra sức khỏe | QTHT | 02 năm |
| Báo cáo tình hình nền tảng số phục vụ xem xét của lãnh đạo | QLCL | Theo ETV.MP17 |

**Toàn bộ hồ sơ có liên quan được lưu trữ theo thủ tục ETV.MP15 (Kiểm soát hồ sơ) và ETV.MP14 (Kiểm soát tài liệu).**
