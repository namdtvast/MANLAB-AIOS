---
# Khối metadata AI — bắt buộc cho mọi văn bản kiểm soát
id: ETV.P10
title: "Thủ tục Đảm bảo hiệu lực của các kết quả"
type: Thu-tuc
owner: "Trần Thị Hoa (Lãnh đạo phòng phụ trách)"
department: "Toàn Viện"
process: MP10_DamBaoHieuLucKetQua
module: M10_DamBaoKQ
effective_date: "15/07/2026"
revision: "04"
status: Da-phe-duyet
keywords: [đảm bảo hiệu lực kết quả, QC nội bộ, thử nghiệm thành thạo, PT/ILC, đánh giá tay nghề, RM/CRM, xác nhận công cụ số, AI, ManLab, ISO 17025 §7.7]
related_documents: [ETV.QM, ETV.P03, ETV.P05, ETV.P06, ETV.P08, ETV.P11, ETV.P13, ETV.P14, ETV.P15, ETV.P18]
iso_clause: ["ISO 9001:2015 §4.2/6.1/7.5/8.1/8.4/8.6/8.7/9.1/10.2", "ISO/IEC 17025:2017 §4.1/4.2/7.5/7.7/7.10/7.11/8.3/8.5-8.7", "ISO 17034:2016 §7.7-7.15/8.3", "ISO/IEC 27001:2022 §6.1/7.5/8-10", "ISO/IEC 42001:2023 §7.5"]
legal_basis: ["Luật Đo lường 04/2011/QH13", "Luật Giao dịch điện tử 20/2023/QH15", "Luật Dữ liệu 60/2024/QH15", "Luật Bảo vệ môi trường 72/2020/QH14", "Luật An ninh mạng 24/2018/QH14", "Luật Bảo vệ quyền lợi người tiêu dùng 19/2023/QH15"]
ai_tags: [quality-control, proficiency-testing, reference-material, method-validation, ai-governance]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Vĩnh viễn (bản hiện hành)"
digital_signature: "LĐV"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV)"
supersedes: "ETV.P10 lần ban hành 03 (01/07/2026)"
superseded_by: null
---
# THỦ TỤC ĐẢM BẢO HIỆU LỰC CỦA CÁC KẾT QUẢ

*(Ensuring the validity of results)*

|                   |                     |
| ----------------- | ------------------- |
| **Mã số**         | ETV.P 10            |
| **Lần ban hành**  | 04                  |
| **Ngày ban hành** | 15/07/2026          |
| **Hiệu lực**      | 15/07/2026          |
| **Biên soạn**     | Trần Thị Hoa        |
| **Soát xét**      | Nguyễn Ngọc Tuấn    |
| **Phê duyệt**     | Nguyễn Hoàng Giang  |

> **Hệ thống quản lý tích hợp:** ISO 9001, ISO/IEC 17025, ISO 17034, ISO/IEC 27001 và ISO/IEC 42001.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian | Nội dung thay đổi | Lần ban hành |
| --- | --- | --- |
| 22/04/2019 | Ban hành lần thứ nhất | 01 |
| 22/04/2023 | Ban hành lần thứ hai | 02 |
| 01/02/2024 | Bổ sung Dịch vụ "Pha chế/Chế tạo" theo chuẩn mực ISO 17034 | 02 |
| 01/07/2026 | Ban hành lần thứ ba | 03 |
| 15/07/2026 | Ban hành lần thứ tư: Tích hợp yêu cầu ISO 9001, ISO/IEC 27001, ISO/IEC 42001; cập nhật quản trị rủi ro, dữ liệu, AI, khách hàng và pháp luật. Hoàn thiện theo khung 08 mục và bổ sung 07 phụ lục kỹ thuật có dẫn chiếu từ thân bài. | 04 |

> **Chú ý:** Tài liệu nội bộ nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

---

## I. MỤC ĐÍCH

Thủ tục này quy định nguyên tắc, trách nhiệm và phương thức hoạch định,
thực hiện, theo dõi, đánh giá và cải tiến các hoạt động bảo đảm hiệu lực
của kết quả kiểm định, hiệu chuẩn, thử nghiệm, quan trắc và sản xuất mẫu
chuẩn/chất chuẩn tại Viện Kiểm định Công nghệ và Môi trường.

**Thủ tục nhằm:**

- Bảo đảm kết quả kỹ thuật chính xác, ổn định, đáng tin cậy, có khả năng
  truy xuất và phù hợp với mục đích sử dụng;

- Phát hiện kịp thời xu hướng bất thường, sai lệch hệ thống hoặc kết quả
  vượt giới hạn kiểm soát;

- Bảo đảm dữ liệu kiểm soát chất lượng và bằng chứng liên quan được xem
  xét trước khi phê duyệt, phát hành báo cáo hoặc chứng chỉ;

- Kiểm soát thống nhất kế hoạch, dữ liệu, phép tính, tiêu chí chấp nhận,
  soát xét, phê duyệt, cảnh báo và hành động khắc phục trên ManLab;

- Nâng cao chất lượng sản phẩm, dịch vụ và sự thỏa mãn của khách hàng,
  đồng thời bảo đảm tính khách quan;

- Bảo vệ tính bảo mật, toàn vẹn, sẵn sàng và khả năng truy xuất của
  thông tin, dữ liệu kỹ thuật theo nguyên tắc ALCOA+;

- Kiểm soát phần mềm, công cụ tính toán tự động và AI; AI chỉ hỗ trợ,
  không tự phê duyệt hoặc quyết định kỹ thuật cuối cùng;

- Cung cấp bằng chứng cho đánh giá năng lực, quản lý rủi ro, xử lý công
  việc không phù hợp và cải tiến liên tục.

## II. PHẠM VI ÁP DỤNG

Áp dụng trong toàn Viện đối với các hoạt động và nguồn lực có thể ảnh
hưởng đến hiệu lực của kết quả, bao gồm:

- Kiểm định, hiệu chuẩn, thử nghiệm và các phép đo tại phòng hoặc hiện
  trường;

- Quan trắc, lấy mẫu, bảo quản, vận chuyển, phân tích và xử lý dữ liệu
  quan trắc;

- Sản xuất, pha chế, kiểm soát và sử dụng RM/CRM; đánh giá đồng nhất, ổn
  định, mô tả đặc trưng, ấn định giá trị và độ không đảm bảo;

- Nhân sự, thiết bị, chuẩn đo lường, chất chuẩn, điều kiện môi trường,
  phương pháp và nhà cung cấp bên ngoài;

- Bảng tính, phần mềm ManLab, API, công cụ tính toán, hệ thống lưu trữ
  và hệ thống AI dùng để hỗ trợ xử lý dữ liệu;

- Toàn bộ vòng đời dữ liệu từ tạo lập, thu nhận, truyền, xử lý, soát
  xét, phê duyệt, phát hành, sửa đổi, sao lưu, lưu trữ đến hủy bỏ.

## III. TÀI LIỆU VIỆN DẪN

Áp dụng phiên bản hiện hành của các tài liệu sau; nội dung chi tiết được
kiểm soát theo ETV.P14:

| **Tài liệu** | **Nội dung viện dẫn** |
|----|----|
| ETV.QM | Sổ tay chất lượng. |
| ETV.P03 | Thủ tục quản lý nhân sự. |
| ETV.P05 | Thủ tục quản lý thiết bị. |
| ETV.P06 | Thủ tục mua sản phẩm và dịch vụ bên ngoài. |
| ETV.P08 | Thủ tục lựa chọn, xác nhận giá trị sử dụng phương pháp. |
| ETV.P11 | Thủ tục báo cáo kết quả. |
| ETV.P13 | Thủ tục kiểm soát công việc không phù hợp và hành động khắc phục. |
| ETV.P14 | Thủ tục kiểm soát tài liệu, thông tin. |
| ETV.P15 | Thủ tục kiểm soát hồ sơ. |
| ETV.P18 | Thủ tục quy tắc quyết định và tuyên bố sự phù hợp. |
| ISO 9001:2015 | Các điều 4.2, 6.1, 8.1, 8.4, 8.6, 8.7, 9.1, 10.2 và 7.5. |
| ISO/IEC 17025:2017 | Các điều 4.1, 4.2, 7.5, 7.7, 7.10, 7.11, 8.3, 8.5–8.7. |
| ISO 17034:2016 | Các điều 7.7–7.15 và 8.3. |
| ISO/IEC 27001:2022 | Điều 6.1, 7.5, 8–10; các kiểm soát A.5.9–A.5.18, A.5.37 và A.8.13 khi áp dụng. |
| ISO/IEC 42001:2023 | Điều 7.5 và các yêu cầu quản trị vòng đời, dữ liệu, đánh giá tác động và giám sát AI khi áp dụng. |
| ISO 33401:2024; ISO 33403:2024; ISO 33406:2024 | Chứng nhận, sử dụng và sản xuất mẫu chuẩn; áp dụng cùng ISO 17034:2016 (chuẩn công nhận nhà sản xuất mẫu chuẩn). |
| TCVN 6910/ISO 5725 | Độ đúng, độ chụm của phương pháp và kết quả đo. |
| AGL/VILAS hiện hành | Hướng dẫn tham gia PT/ILC và chính sách công nhận liên quan. |
| Luật Đo lường 04/2011/QH13 | Và văn bản hướng dẫn, sửa đổi, bổ sung còn hiệu lực. |
| Luật Giao dịch điện tử 20/2023/QH15 | Yêu cầu áp dụng đối với dữ liệu, hồ sơ và giao dịch điện tử. |
| Luật Dữ liệu 60/2024/QH15 | Yêu cầu quản lý, bảo vệ và sử dụng dữ liệu. |
| Luật Bảo vệ môi trường 72/2020/QH14; Thông tư 10/2021/TT-BTNMT | Yêu cầu về quan trắc môi trường và dữ liệu quan trắc. |
| Luật An ninh mạng 24/2018/QH14 và quy định bảo vệ dữ liệu cá nhân hiện hành | Yêu cầu bảo vệ hệ thống, dữ liệu và thông tin liên quan. |
| Luật Bảo vệ quyền lợi người tiêu dùng 19/2023/QH15 | Yêu cầu liên quan đến chất lượng dịch vụ và cung cấp thông tin. |

## IV. THUẬT NGỮ, ĐỊNH NGHĨA VÀ CHỮ VIẾT TẮT

| **Thuật ngữ/viết tắt** | **Diễn giải áp dụng** |
|----|----|
| Đảm bảo hiệu lực của kết quả | Hoạt động theo dõi nội bộ và/hoặc bên ngoài để chứng minh kết quả tiếp tục đáng tin cậy, ổn định và phù hợp mục đích sử dụng. |
| QC | Kiểm soát chất lượng bằng các hoạt động kỹ thuật nhằm phát hiện, ngăn ngừa và xử lý sai lệch. |
| PT/ILC | Thử nghiệm thành thạo/so sánh liên phòng. |
| RM/CRM | Mẫu chuẩn/mẫu chuẩn được chứng nhận. |
| Mẫu kiểm soát | Mẫu có giá trị đã biết hoặc ổn định, dùng theo dõi độ đúng hoặc độ chụm. |
| En | Sai số chuẩn hóa dùng đánh giá kết quả so sánh có xét độ không đảm bảo. |
| z-score | Chỉ số độ lệch so với giá trị ấn định theo độ lệch chuẩn đánh giá thành thạo. |
| RSD/CV | Độ lệch chuẩn tương đối/hệ số biến thiên. |
| ALCOA+ | Dữ liệu quy được người thực hiện, rõ ràng, ghi đúng thời điểm, nguyên gốc, chính xác, đầy đủ, nhất quán, bền vững và sẵn có. |
| ManLab | Hệ thống quản lý dữ liệu, workflow, phê duyệt, truy xuất và báo cáo của Viện. |
| AI | Hệ thống trí tuệ nhân tạo; trong P10 chỉ được dùng để hỗ trợ và phải có người đủ thẩm quyền kiểm chứng. |
| Cảnh báo | Trạng thái cần xem xét tăng cường nhưng chưa đủ căn cứ kết luận không đạt. |
| Không đạt/Blocked | Trạng thái không đáp ứng tiêu chí hoặc có rủi ro không chấp nhận được; không cho phép phát hành kết quả liên quan. |
| CAPA | Hành động xử lý nguyên nhân, ngăn ngừa tái diễn và đánh giá hiệu lực sau thực hiện. |
| NTH | Người thực hiện phép đo/hoạt động kỹ thuật; trong ManLab là tài khoản tạo nháp và gửi duyệt hồ sơ. |
| QLCL | Quản lý chất lượng; theo dõi, tổng hợp và cải tiến hoạt động bảo đảm hiệu lực của kết quả. |
| QTHT/ATTT | Quản trị hệ thống/An toàn thông tin; phân quyền, audit trail, sao lưu và ứng phó sự cố dữ liệu/AI. |

## V. VAI TRÒ VÀ TRÁCH NHIỆM (RACI)

Ký hiệu: R – thực hiện; A – chịu trách nhiệm/phê duyệt; C – tham
vấn/soát xét; I – được thông báo.

| **Hoạt động** | **NTH/Mọi TK** | **LĐ phòng** | **LĐ Viện** | **QLCL** | **QTHT/ATTT** |
|----|:--:|:--:|:--:|:--:|:--:|
| Lập hoặc cập nhật kế hoạch F10.01 | R | C | A | C | I |
| Tạo nháp/lấy dữ liệu F11.03/thêm mới và gửi duyệt | R | C | I | C | I |
| Soát xét kế hoạch và hồ sơ P10 | I | A/R | I | C | C |
| Phê duyệt cuối và công bố F10.09 | I | C | A/R | C | I |
| Thực hiện QC, PT/ILC, tay nghề, RM/CRM | R | A | I | C | I |
| Đánh giá cảnh báo/không đạt và khóa phát hành | R | A | I | C | C |
| Mở và theo dõi KPH/CAPA | R | C | I | A | C |
| Phân quyền, audit trail, sao lưu và sự cố ATTT | I | C | I | C | A/R |
| Xác nhận công cụ số/AI trước sử dụng | R | A | I | C | C |
| Tổng hợp KPI và đầu vào xem xét lãnh đạo | I | C | A | R | C |

Mọi tài khoản đang hoạt động được tạo nháp và gửi duyệt. Bước Soát xét
chỉ do tài khoản Lãnh đạo phòng thực hiện; bước Phê duyệt chỉ do tài
khoản Lãnh đạo Viện thực hiện. Không người dùng nào được tự soát xét
hoặc tự phê duyệt hồ sơ do mình tạo.

## VI. NỘI DUNG/QUY TRÌNH THỰC HIỆN

### **6.1. Nguyên tắc kiểm soát**

- Hoạt động bảo đảm hiệu lực phải được hoạch định theo rủi ro, hậu quả
  của kết quả sai, tần suất công việc, lịch sử QC/PT, thay đổi nhân sự,
  thiết bị, phương pháp, phần mềm và yêu cầu pháp luật/công nhận.

- Dữ liệu phải đủ để phát hiện xu hướng, đánh giá thống kê khi phù hợp
  và truy xuất đến đối tượng, mẫu/lô, phương pháp, thiết bị, chuẩn, nhân
  sự, dữ liệu thô, công thức và phiên bản tiêu chí.

- Kết quả QC liên quan phải được xem xét trước khi phát hành. Không được
  chỉ thử lại để có kết quả đạt mà không điều tra nguyên nhân và phê
  duyệt lý do kỹ thuật.

- Mọi thay đổi phương pháp, thiết bị, chuẩn, nhân sự chủ chốt, công
  thức, phần mềm/AI hoặc nhà cung cấp phải được đánh giá tác động và xác
  nhận trước khi áp dụng.

- Dữ liệu mật, dữ liệu khách hàng và dữ liệu cá nhân phải được phân
  quyền theo nhu cầu công việc; AI không được tự phê duyệt, tự kết luận
  sự phù hợp hoặc thay đổi dữ liệu gốc.

### **6.2. Quy trình tổng quát**

Lưu đồ trạng thái và các nhánh xử lý được trình bày tại Phụ lục I.

| **Bước** | **Nội dung thực hiện** | **Trách nhiệm** | **Biểu mẫu/đầu ra** |
|:--:|----|:--:|----|
| 1 | Tạo hoặc cập nhật kế hoạch F10.01; xác định quy trình, đối tượng, hoạt động, tần suất, người thực hiện, tiêu chí và rủi ro. | Mọi tài khoản/NTH | F10.01 |
| 2 | Gửi duyệt kế hoạch hoặc hồ sơ. Hệ thống kiểm tra dữ liệu bắt buộc và lưu phiên bản. | Người tạo | F10.01–F10.08 |
| 3 | Soát xét nội dung, bằng chứng, tiêu chí, phép tính và ảnh hưởng đến kết quả. | Lãnh đạo phòng | Trạng thái Soát xét |
| 4 | Phê duyệt cuối hoặc trả lại/từ chối kèm lý do. | Lãnh đạo Viện | Trạng thái Phê duyệt |
| 5 | Thực hiện hoạt động theo kế hoạch; nhập dữ liệu gốc, đính kèm bằng chứng và tính toán. | NTH | F10.02–F10.08 |
| 6 | Đánh giá Đạt/Cảnh báo/Không đạt; mở KPH/CAPA và khóa phát hành khi cần. | LĐ phòng/QLCL | F10.02–F10.08; P13 |
| 7 | Công bố nội bộ trạng thái P10 và trả quyết định cho F11.03. | Lãnh đạo Viện | F10.09 |
| 8 | Theo dõi xu hướng, KPI, hiệu lực CAPA và cập nhật rủi ro/kế hoạch. | QLCL/LĐ phòng | F10.09; đầu vào xem xét lãnh đạo |

### **6.3. Lập kế hoạch bảo đảm hiệu lực – F10.01**

Ma trận lựa chọn hoạt động, tần suất và bằng chứng tham khảo tại Phụ lục
II.

Kế hoạch được lập hằng năm và cập nhật khi mở rộng phạm vi, thay đổi có
ảnh hưởng, xuất hiện kết quả bất thường, khiếu nại, yêu cầu công
nhận/pháp luật hoặc rủi ro mới. Mọi tài khoản được tạo nháp và gửi
duyệt.

| **Nhóm dữ liệu** | **Yêu cầu cấu hình** |
|----|----|
| Thông tin chung | Mã tự sinh; năm; tên kế hoạch; phòng/bộ phận; căn cứ; mức rủi ro; người lập; trạng thái; phiên bản. |
| Quy trình thực hiện | Droplist từ danh mục quy trình/phương pháp đang hiệu lực. |
| Đối tượng | Droplist từ danh mục đối tượng/phương tiện đo/mẫu; lọc theo quy trình khi có liên kết. |
| Hoạt động | Droplist: QC nội bộ, tay nghề, PT/ILC, đồng nhất, ổn định, đặc trưng/ấn định giá trị, xác nhận công cụ số. |
| Tần suất | Droplist: theo mẻ/lô, tháng, quý, 06 tháng, năm hoặc khi thay đổi/bất thường. |
| Người thực hiện | Droplist tài khoản đang hoạt động; ưu tiên lọc theo phòng và phạm vi năng lực. |
| Tiêu chí chấp nhận | Droplist từ danh mục tiêu chí có phiên bản; hiển thị căn cứ, giới hạn và cách xử lý. |
| Thời hạn/nguồn lực | Ngày dự kiến; người phối hợp; thiết bị, chuẩn/chất chuẩn, nhà cung cấp và bằng chứng dự kiến. |

### **6.4. Tạo hồ sơ đánh giá P10**

Người dùng tạo hồ sơ theo một trong hai cách:

- Lấy từ F11.03 – Chứng chỉ đo lường: chọn chứng chỉ; hệ thống sao chép
  thông tin sang bản nháp, lưu liên kết nguồn, thời điểm và người sao
  chép; không sửa dữ liệu nguồn. Hệ thống cảnh báo khi F11.03 thay đổi
  sau thời điểm sao chép.

- Thêm mới: nhập nhóm “Thông tin chi tiết đối tượng” bằng các trường và
  danh mục tương đương Chứng chỉ đo lường F11.03.

Thông tin tối thiểu gồm khách hàng, đối tượng, model/serial/nhà sản xuất
khi áp dụng, quy trình, địa điểm, thời gian, nhân sự, thiết bị,
chuẩn/chất chuẩn, điều kiện môi trường, dữ liệu đo, kết quả và độ không
đảm bảo. Bản nháp P10 là phiên bản độc lập và có audit trail.

### **6.5. Kiểm soát chất lượng nội bộ – F10.02**

Công thức, ngưỡng mặc định và nguyên tắc ưu tiên tiêu chí được tổng hợp
tại Phụ lục III.

Tùy phương pháp và rủi ro, áp dụng một hoặc nhiều biện pháp: RM/CRM/mẫu
kiểm soát, mẫu trắng, mẫu lặp, thêm chuẩn, đo lặp, biểu đồ kiểm soát, so
sánh nhân viên, thiết bị hoặc phương pháp. Bản ghi liên kết với kế
hoạch, quy trình, đối tượng/mẫu/lô, thiết bị, chuẩn, nhân sự và dữ liệu
thô.

| **Chỉ số** | **Công thức/diễn giải** | **Mặc định** | **Quyết định** |
|----|----|----|----|
| z-score | z = (x − xpt)/σpt | \|z\| ≤ 2 | Đạt; 2 \< \|z\| \< 3: cảnh báo; \|z\| ≥ 3: không đạt. |
| En | En = (x − Xref)/√(U²lab + U²ref) | \|En\| ≤ 1 | Đạt; \> 1: không đạt. |
| Bias % | 100 × (x − xref)/xref | Theo phương pháp | So sánh với giới hạn độ chệch. |
| Recovery % | 100 × (Cs − C0)/Cadd | Theo phương pháp/nền mẫu | Đạt khi trong khoảng phê duyệt. |
| RSD/CV % | 100 × SD/Mean | Theo phương pháp | Đạt khi không vượt giới hạn. |
| Biểu đồ kiểm soát | Đường trung tâm và giới hạn cảnh báo/hành động | Theo cấu hình | Áp dụng rule được phê duyệt; vi phạm phải được đánh giá. |

Tiêu chí của phương pháp, tiêu chuẩn, quy định công nhận hoặc khách hàng
được ưu tiên. Giá trị mặc định chỉ được dùng khi QLCL/Lãnh đạo phòng phê
duyệt trước.

### **6.6. Đánh giá tay nghề – F10.03**

Thực hiện tối thiểu hằng năm đối với nhân sự thực hiện phép đo chính và
khi có nhân sự mới, sau đào tạo/gián đoạn, sau QC/PT không đạt hoặc khi
nghi ngờ năng lực. Nhân sự không đạt chỉ được làm việc độc lập sau đào
tạo, giám sát và đánh giá lại đạt. Kết quả được cập nhật hồ sơ năng lực
F03.02.

### **6.7. PT/ILC – F10.04**

Lập kế hoạch tham gia PT/ILC cho các lĩnh vực/phép đo thuộc phạm vi công
nhận hoặc rủi ro cao khi có chương trình phù hợp. Đánh giá bằng z-score,
En, zeta-score hoặc chỉ số do nhà tổ chức quy định. Kết quả cảnh
báo/không đạt phải được điều tra, đánh giá ảnh hưởng đến kết quả đã phát
hành, thực hiện CAPA và xác nhận lại hiệu lực.

### **6.8. Kiểm soát RM/CRM – F10.05 đến F10.07**

| **Hoạt động** | **Yêu cầu chính** | **Đầu ra** |
|----|----|----|
| Đồng nhất – F10.05 | Thiết kế lấy mẫu, đo lặp, ANOVA hoặc phương pháp phù hợp; kiểm soát xu hướng và ngoại lệ. | Kết luận đồng nhất; uhom khi áp dụng. |
| Ổn định – F10.06 | Theo dõi ngắn hạn/dài hạn; điều kiện vận chuyển/bảo quản; hồi quy hoặc phương pháp phù hợp. | Kết luận ổn định; hạn sử dụng; ustab. |
| Đặc trưng – F10.07 | Một hoặc nhiều phương pháp/phòng; đánh giá dữ liệu, sai lệch và độ không đảm bảo. | Giá trị ấn định, UCRM và tài liệu kèm theo. |
| Định tính | Xác định danh tính/thuộc tính bằng thiết kế phù hợp và bằng chứng khách quan. | Kết luận định tính và mức tin cậy. |

Độ không đảm bảo CRM được tổng hợp từ các thành phần phù hợp, thông
thường gồm đặc trưng, đồng nhất và ổn định; công thức và hệ số phủ phải
được xác định trong hồ sơ kỹ thuật.

### **6.9. Xác nhận công cụ số và AI – F10.08**

- Kiểm thử trước sử dụng bằng tính thủ công hoặc bộ dữ liệu chuẩn; xác
  nhận công thức, phiên bản, quyền truy cập, nhật ký và đầu ra;

- Đánh giá lại khi thay đổi công thức, giao diện, thuật toán, workflow,
  API, cơ sở dữ liệu, mô hình AI hoặc hạ tầng;

- Với AI: xác định mục đích, chủ sở hữu, dữ liệu, giới hạn, tiêu chí
  hiệu năng, rủi ro sai lệch/ảo giác, bảo mật, pháp lý và phương án giám
  sát;

- Không nhập dữ liệu mật, dữ liệu khách hàng hoặc dữ liệu cá nhân vào AI
  công cộng khi chưa được phê duyệt; đầu ra AI phải được người đủ năng
  lực kiểm chứng;

- Khi hiệu năng suy giảm, thay đổi mô hình hoặc xảy ra sự cố phải dừng,
  đánh giá lại và chỉ khôi phục sau phê duyệt.

### **6.10. Xử lý cảnh báo, không đạt và công việc không phù hợp**

| **Bước** | **Yêu cầu xử lý** | **Trách nhiệm/đầu ra** |
|----|----|----|
| 1\. Kiểm soát ngay | Dừng công việc hoặc khóa phát hành; bảo toàn dữ liệu và bằng chứng; thông báo người có trách nhiệm. | NTH/LĐ phòng |
| 2\. Xác định phạm vi | Xác định đối tượng, mẫu/lô, phương pháp, thiết bị, nhân sự, phần mềm/AI, nhà cung cấp và khoảng thời gian ảnh hưởng. | LĐ phòng/QLCL |
| 3\. Điều tra | Xem xét dữ liệu gốc, log, QC, truy xuất chuẩn, môi trường, năng lực và thay đổi gần nhất; xác định nguyên nhân gốc. | Nhóm được phân công |
| 4\. Đánh giá ảnh hưởng | Xem xét kết quả đã phát hành; quyết định sửa đổi, thu hồi, thông báo khách hàng/cơ quan liên quan khi cần. | LĐ phòng/LĐ Viện |
| 5\. CAPA | Sửa chữa, hành động khắc phục, đánh giá hiệu lực; chỉ khôi phục khi rủi ro được kiểm soát. | Theo ETV.P13 |
| 6\. Sự cố dữ liệu/AI | Đồng thời kích hoạt quy trình ứng phó ATTT/AI và nghĩa vụ thông báo khi áp dụng. | QTHT/ATTT/QLCL |

### **6.11. Công bố trạng thái P10 và liên kết F11.03 – F10.09**

Cấu trúc màn hình P10 và ánh xạ dữ liệu với F11.03 được quy định tại Phụ
lục IV và Phụ lục V.

F10.09 là điểm chốt nội bộ, không thay thế Chứng chỉ đo lường/Báo cáo
kết quả F11.03. Sau phê duyệt, trạng thái P10 được truyền đến F11.03 và
các chức năng liên quan.

| **Trạng thái** | **Cho phép phát hành** | **Yêu cầu** |
|:--:|:--:|----|
| PASS | Có | Đánh giá P10 còn hiệu lực và được phê duyệt. |
| CONDITIONAL | Có điều kiện | Có lý do, kiểm soát bổ sung, người phê duyệt và ngày hết hạn. |
| WARNING | Chờ quyết định | Lãnh đạo phòng soát xét và Lãnh đạo Viện phê duyệt trước phát hành. |
| FAIL/BLOCKED | Không | Khóa phát hành; mở/ liên kết KPH-CAPA. |
| EXPIRED/MISSING | Không | Cập nhật hoặc thực hiện đánh giá P10 trước phát hành. |

F11.03 cung cấp tối thiểu số chứng chỉ/báo cáo, khách hàng, đối tượng,
quy trình, nhân sự, thiết bị, chuẩn/chất chuẩn, ngày thực hiện và kết
quả. P10 trả mã đánh giá/công bố, trạng thái, quyền phát hành, lý do,
người/ngày phê duyệt, hạn hiệu lực và mã KPH/CAPA.

### **6.12. Kiểm soát dữ liệu, phân quyền và liên tục hoạt động**

Quy tắc phân quyền và audit trail tối thiểu được quy định tại Phụ lục
VI.

- Phân loại dữ liệu; cấp quyền tối thiểu; tách biệt tạo – soát xét – phê
  duyệt; rà soát quyền định kỳ;

- Lưu audit trail người dùng, vai trò, thời gian, hành động, dữ liệu
  trước/sau, lý do, phiên bản và mã tương quan;

- Sao lưu theo kế hoạch, thử khôi phục, đồng bộ thời gian, kiểm soát
  xuất dữ liệu và mã hóa khi rủi ro yêu cầu;

- Xác định quá trình/dữ liệu trọng yếu, thời gian khôi phục mục tiêu và
  phương án khi mất điện, hỏng thiết bị, gián đoạn ManLab, tấn công
  mạng, thiếu nhân sự hoặc nhà cung cấp dừng dịch vụ.

### **6.13. Theo dõi, báo cáo và cải tiến**

Ma trận đối chiếu các tiêu chuẩn quản lý được trình bày tại Phụ lục VII.

QLCL tổng hợp tối thiểu hằng năm hoặc theo yêu cầu: mức hoàn thành kế
hoạch; tỷ lệ đạt/cảnh báo/không đạt; PT/ILC; tay nghề; số kết quả bị
khóa/sửa/thu hồi; thời gian xử lý; CAPA quá hạn/tái diễn; phản hồi khách
hàng; sự cố ATTT; sai lệch AI; hiệu năng nhà cung cấp và khả năng khôi
phục hệ thống. Kết quả là đầu vào xem xét lãnh đạo, đánh giá rủi ro, đào
tạo, bảo trì/hiệu chuẩn, cập nhật phương pháp và cải tiến ManLab.

## VII. BIỂU MẪU ÁP DỤNG

| **Mã biểu mẫu** | **Tên hồ sơ/biểu mẫu** | **Hình thức áp dụng** |
|----|----|----|
| ETV.P.F 10.01 | Kế hoạch bảo đảm hiệu lực kết quả | ManLab/Word/PDF khi cần |
| ETV.P.F 10.02 | Hồ sơ QC nội bộ | ManLab và bằng chứng đính kèm |
| ETV.P.F 10.03 | Đánh giá tay nghề | ManLab; liên kết F03.02 |
| ETV.P.F 10.04 | Hồ sơ PT/ILC | ManLab; báo cáo nhà tổ chức |
| ETV.P.F 10.05 | Đánh giá đồng nhất RM/CRM | ManLab/biểu mẫu được phê duyệt |
| ETV.P.F 10.06 | Đánh giá ổn định RM/CRM | ManLab/biểu mẫu được phê duyệt |
| ETV.P.F 10.07 | Đặc trưng và ấn định giá trị RM/CRM | ManLab/biểu mẫu được phê duyệt |
| ETV.P.F 10.08 | Xác nhận công cụ số/phần mềm/AI | ManLab; bộ dữ liệu kiểm thử |
| ETV.P.F 10.09 | Công bố nội bộ trạng thái P10 | ManLab; liên kết F11.03 |
| ETV.P13 | Phiếu KPH/CAPA và đánh giá hiệu lực | Theo thủ tục tương ứng |

Chỉ sử dụng biểu mẫu đang có hiệu lực trong danh mục biểu mẫu dùng
chung. Không tạo bản sao trùng mã; mọi sửa đổi biểu mẫu thực hiện theo
ETV.P14.

## VIII. LƯU HỒ SƠ

Hồ sơ phát sinh từ việc thực hiện thủ tục này được nhận diện, lập, soát
xét, phê duyệt, bảo vệ, truy xuất, lưu giữ và hủy bỏ theo ETV.P15 – Thủ
tục kiểm soát hồ sơ và Danh mục hồ sơ hiện hành của Viện.

Đối với hồ sơ điện tử trên ManLab, phải duy trì định danh duy nhất,
phiên bản, người thực hiện/soát xét/phê duyệt, dấu thời gian, audit
trail, phân quyền, tệp bằng chứng, sao lưu và khả năng khôi phục theo
ETV.P15 và quy định an toàn thông tin liên quan. Thời hạn lưu không quy
định lại tại thủ tục này.

## IX. CÁC PHỤ LỤC

Các phụ lục sau là bộ phận của thủ tục và được áp dụng cùng với nội dung
thân bài. Việc sửa đổi phụ lục phải được kiểm soát theo ETV.P14. Các giá
trị mặc định trong phụ lục không thay thế yêu cầu cụ thể của phương
pháp, tiêu chuẩn, cơ quan công nhận hoặc pháp luật hiện hành.

## PHỤ LỤC I. LƯU ĐỒ QUY TRÌNH VÀ TRẠNG THÁI P10

| **Trình tự** | **Trạng thái** | **Chủ thể** | **Điều kiện chuyển** |
|:--:|:--:|:--:|----|
| 1 | NHÁP | Mọi tài khoản | Tạo mới, lấy từ F11.03 hoặc nhập mới; được sửa khi chưa gửi. |
| 2 | ĐÃ GỬI DUYỆT | Người tạo | Đủ trường bắt buộc và bằng chứng; khóa chỉnh sửa thông thường. |
| 3 | CHỜ SOÁT XÉT | Lãnh đạo phòng | Soát xét nội dung, tiêu chí, phép tính, liên kết và ảnh hưởng. |
| 4A | TRẢ LẠI | Lãnh đạo phòng | Nêu rõ lý do; hệ thống tạo phiên bản chỉnh sửa và giữ bản trước. |
| 4B | ĐÃ SOÁT XÉT | Lãnh đạo phòng | Đủ điều kiện trình Lãnh đạo Viện. |
| 5A | TỪ CHỐI/TRẢ LẠI | Lãnh đạo Viện | Nêu lý do, điều kiện xử lý hoặc yêu cầu đánh giá lại. |
| 5B | ĐÃ PHÊ DUYỆT | Lãnh đạo Viện | Khóa dữ liệu; sẵn sàng công bố F10.09. |
| 6 | ĐÃ CÔNG BỐ | Lãnh đạo Viện | Truyền trạng thái P10 sang F11.03 và hệ thống liên quan. |
| 7 | HẾT HIỆU LỰC/THU HỒI | Người có thẩm quyền | Hết hạn, thay đổi, phát hiện ảnh hưởng hoặc có bản thay thế. |

Nhánh không đạt có thể được kích hoạt từ bất kỳ bước thực hiện/đánh giá
nào: Cảnh báo hoặc Không đạt → Khóa phát hành → Xác định phạm vi ảnh
hưởng → Mở KPH/CAPA → Đánh giá hiệu lực → Khôi phục hoặc thu hồi.

## PHỤ LỤC II. MA TRẬN LỰA CHỌN HOẠT ĐỘNG BẢO ĐẢM HIỆU LỰC

| **Hoạt động** | **Tình huống áp dụng** | **Tần suất tham khảo** | **Bằng chứng/đầu ra** |
|----|----|----|----|
| Mẫu kiểm soát/RM/CRM | Theo dõi độ đúng và ổn định quá trình | Theo mẻ, ngày hoặc chu kỳ phương pháp | F10.02; biểu đồ; truy xuất CRM. |
| Mẫu trắng | Phát hiện nhiễm bẩn/nền/tín hiệu giả | Theo mẻ hoặc quy trình | Kết quả blank và giới hạn. |
| Mẫu lặp/đo lặp | Theo dõi độ chụm | Theo mẻ hoặc tỷ lệ mẫu | RPD/RSD/CV. |
| Thêm chuẩn | Theo dõi ảnh hưởng nền và thu hồi | Theo mẻ/nền mẫu | Recovery %. |
| So sánh nhân sự | Theo dõi tay nghề và độ tái lập | Tối thiểu hằng năm hoặc theo rủi ro | F10.03; cập nhật F03.02. |
| So sánh thiết bị/phương pháp | Thay đổi hoặc nghi ngờ sai lệch | Sau thay đổi/định kỳ theo rủi ro | Độ lệch, En hoặc tiêu chí phê duyệt. |
| PT/ILC | Phạm vi công nhận/rủi ro cao | Theo kế hoạch PT/ILC | F10.04; z, En, zeta. |
| Đồng nhất RM/CRM | Sản xuất mẫu chuẩn | Mỗi lô/thiết kế sản xuất | F10.05; uhom. |
| Ổn định RM/CRM | Vận chuyển, bảo quản, hạn sử dụng | Theo thiết kế ngắn/dài hạn | F10.06; ustab; hạn dùng. |
| Đặc trưng/ấn định giá trị | Sản xuất RM/CRM | Mỗi lô/thuộc tính | F10.07; giá trị và UCRM. |
| Công cụ số/AI | Công thức, phần mềm, API, mô hình AI | Trước dùng và sau thay đổi | F10.08; bộ dữ liệu kiểm thử. |

Tần suất chính thức do Lãnh đạo phòng xác định theo rủi ro và được Lãnh
đạo Viện phê duyệt trong F10.01.

## PHỤ LỤC III. CÔNG THỨC VÀ TIÊU CHÍ ĐÁNH GIÁ THAM KHẢO

| **Chỉ số** | **Công thức** | **Ngưỡng mặc định** | **Diễn giải** |
|----|----|----|----|
| z-score | z = (x − xpt)/σpt | \|z\| ≤ 2: đạt; 2 \< \|z\| \< 3: cảnh báo; \|z\| ≥ 3: không đạt | Áp dụng khi nhà tổ chức dùng độ lệch chuẩn đánh giá thành thạo. |
| En | En = (x − Xref)/√(U²lab + U²ref) | \|En\| ≤ 1: đạt; \> 1: không đạt | So sánh có xét độ không đảm bảo mở rộng. |
| zeta | ζ = (x − xpt)/√(u²x + u²pt) | Theo chương trình PT | Đánh giá độ lệch có xét độ không đảm bảo chuẩn. |
| Bias % | 100 × (x − xref)/xref | Theo phương pháp | Độ chệch tương đối. |
| Recovery % | 100 × (Cs − C0)/Cadd | Theo phương pháp/nền mẫu | Hiệu suất thu hồi mẫu thêm chuẩn. |
| RSD/CV % | 100 × SD/Mean | Theo phương pháp | Độ chụm tương đối. |
| RPD % | 200 × \|x1 − x2\|/(x1 + x2) | Theo phương pháp | Sai khác tương đối của cặp lặp. |
| UCRM | k × √(uchar² + uhom² + ustab²) | Theo thiết kế và mức phủ | Độ không đảm bảo mở rộng của CRM khi các thành phần phù hợp. |

Thứ tự ưu tiên: (1) pháp luật/quy chuẩn; (2) yêu cầu cơ quan công nhận;
(3) phương pháp/tiêu chuẩn; (4) yêu cầu hợp đồng được chấp nhận; (5)
tiêu chí nội bộ đã phê duyệt; (6) giá trị mặc định trong phụ lục này.

## PHỤ LỤC IV. CẤU TRÚC MÔ-ĐUN P10 TRÊN MANLAB

| **Màn hình** | **Chức năng** | **Dữ liệu/đầu ra chính** |
|----|----|----|
| F10.01 | Kế hoạch bảo đảm hiệu lực | Năm, phòng, quy trình, đối tượng, hoạt động, tần suất, người thực hiện, tiêu chí, hạn và rủi ro. |
| F10.02 | QC nội bộ | Dữ liệu gốc, RM/CRM, blank, lặp, recovery, RSD, biểu đồ và kết luận. |
| F10.03 | Đánh giá tay nghề | Phép đo, người đánh giá/được đánh giá, tiêu chí, kết luận và liên kết F03.02. |
| F10.04 | PT/ILC | Nhà tổ chức, chương trình, giá trị, U, z/En/zeta và CAPA. |
| F10.05 | Đồng nhất RM/CRM | Thiết kế, đơn vị mẫu, phép lặp, ANOVA, uhom và kết luận. |
| F10.06 | Ổn định RM/CRM | Thiết kế ngắn/dài hạn, điều kiện, hồi quy, ustab và hạn dùng. |
| F10.07 | Đặc trưng/ấn định giá trị | Phương pháp/phòng, dữ liệu, giá trị, uchar và UCRM. |
| F10.08 | Xác nhận công cụ số/AI | Tên/phiên bản, mục đích, bộ kiểm thử, quyền, log, rủi ro và phê duyệt. |
| F10.09 | Công bố trạng thái P10 | PASS/CONDITIONAL/WARNING/FAIL/BLOCKED; quyền phát hành, lý do, hạn và CAPA. |

| **Nút chức năng**     | **Quy tắc**                                 |
|-----------------------|---------------------------------------------|
| Tạo mới/Lấy từ F11.03 | Mọi tài khoản; tạo bản nháp và lưu nguồn.   |
| Lưu nháp              | Mọi tài khoản; chưa yêu cầu đầy đủ trường.  |
| Gửi duyệt             | Mọi tài khoản; kiểm tra trường bắt buộc.    |
| Soát xét/Trả lại      | Chỉ Lãnh đạo phòng.                         |
| Phê duyệt/Từ chối     | Chỉ Lãnh đạo Viện.                          |
| Mở KPH/CAPA           | Theo quyền P13; liên kết hồ sơ P10.         |
| Xem lịch sử/Export    | Theo quyền; không làm thay đổi dữ liệu gốc. |

## PHỤ LỤC V. ÁNH XẠ DỮ LIỆU P10 VỚI F11.03

| **Nhóm** | **Trường dữ liệu tối thiểu** | **Chiều dữ liệu** |
|----|----|----|
| Định danh | CertificateId, số chứng chỉ/báo cáo, mã hồ sơ, customerId | F11.03 → P10 |
| Đối tượng | ObjectId, tên, model, serial, nhà sản xuất, đặc tính/phạm vi | F11.03 → P10 hoặc Thêm mới |
| Kỹ thuật | ProcedureId, ngày/địa điểm, nhân sự, thiết bị, chuẩn/chất chuẩn, điều kiện môi trường | F11.03 → P10 |
| Kết quả | Kết quả đo, đơn vị, độ không đảm bảo, quy tắc quyết định khi áp dụng | F11.03 → P10 |
| Nguồn sao chép | DraftSource, SourceCertificateId, SourceSnapshotAt, CreatedBy | P10 lưu truy xuất |
| Quyết định P10 | AssessmentId, PublicationId, Status, ReleaseAllowed, Reason, ApprovedBy/At, ExpiresAt | P10 → F11.03 |
| Không phù hợp | NonconformityId/CAPAId, lý do khóa, phạm vi ảnh hưởng | Hai chiều theo workflow |

| **Trạng thái P10** | **Giá trị ReleaseAllowed** | **Xử lý tại F11.03** |
|:--:|:--:|----|
| PASS | true | Cho phép phát hành. |
| CONDITIONAL | true có điều kiện | Kiểm tra điều kiện, người phê duyệt và hạn. |
| WARNING | false đến khi phê duyệt | Chuyển Lãnh đạo phòng/Lãnh đạo Viện. |
| FAIL/BLOCKED | false | Khóa nút phát hành; mở/liên kết CAPA. |
| EXPIRED/MISSING | false | Yêu cầu đánh giá hoặc gia hạn P10. |

## PHỤ LỤC VI. PHÂN QUYỀN VÀ AUDIT TRAIL

| **Vai trò** | **Tạo nháp/Gửi** | **Soát xét** | **Phê duyệt** | **Sửa dữ liệu đã duyệt** | **Xem audit trail** |
|----|:--:|:--:|:--:|:--:|:--:|
| Mọi tài khoản hoạt động | Có | Không | Không | Không | Theo phạm vi |
| Lãnh đạo phòng | Có | Có | Không | Không | Theo phòng/phạm vi |
| Lãnh đạo Viện | Có | Không thay bước LĐP | Có | Không; chỉ phê duyệt phiên bản mới | Toàn bộ theo quyền |
| QLCL | Có | Tham vấn/kiểm tra | Không | Không | Theo nhiệm vụ |
| QTHT/ATTT | Không mặc định | Không | Không | Không | Theo quyền giám sát |

Audit trail phải ghi tối thiểu: mã sự kiện, thời gian chuẩn hóa, người
dùng, vai trò, hành động, loại/mã đối tượng, dữ liệu trước/sau, lý do,
phiên bản, mã tương quan và liên kết tệp bằng chứng. Người dùng thông
thường không được sửa hoặc xóa nhật ký.

- Không tự soát xét/phê duyệt hồ sơ do mình tạo;

- Bản đã phê duyệt không bị ghi đè; sửa đổi phải tạo phiên bản mới;

- Quyền truy cập được cấp tối thiểu, rà soát định kỳ và thu hồi khi thay
  đổi nhiệm vụ;

- Tệp bằng chứng phải có định danh, checksum khi áp dụng, phân loại bảo
  mật và lịch sử truy cập.

## PHỤ LỤC VII. MA TRẬN ĐỐI CHIẾU YÊU CẦU HỆ THỐNG QUẢN LÝ

| **Chuẩn mực** | **Điều khoản trọng tâm** | **Nội dung P10 đáp ứng** | **Bằng chứng** |
|----|----|----|----|
| ISO 9001:2015 | 4.2; 6.1; 7.5; 8.1; 8.4; 8.6–8.7; 9.1; 10.2 | Bên quan tâm, rủi ro, thông tin dạng văn bản, kiểm soát vận hành/nhà cung cấp/phát hành/đầu ra không phù hợp và cải tiến. | F10.01, F10.09, CAPA, KPI. |
| ISO/IEC 17025:2017 | 4.1–4.2; 7.5; 7.7; 7.10–7.11; 8.3; 8.5–8.7 | Khách quan, bảo mật, hồ sơ kỹ thuật, hiệu lực kết quả, công việc không phù hợp, dữ liệu và cải tiến. | F10.01–F10.09; audit trail. |
| ISO 17034:2016 | 7.7–7.15; 8.3 | Đồng nhất, ổn định, đặc trưng, ấn định giá trị/U, hồ sơ và không phù hợp. | F10.05–F10.07; hồ sơ lô. |
| ISO/IEC 27001:2022 | 6.1; 7.5; 8–10; A.5.9–5.18; A.5.37; A.8.13 | Rủi ro ATTT, tài sản/quyền, thủ tục, sao lưu, log, sự cố và nhà cung cấp. | Phân quyền, backup/restore, audit trail. |
| ISO/IEC 42001:2023 | 7.5 và yêu cầu vòng đời AI liên quan | Tài liệu AI, đánh giá tác động/rủi ro, dữ liệu, giám sát con người, sự cố và cải tiến. | F10.08; phiên bản; kết quả xác nhận. |
| Pháp luật/yêu cầu khác | Theo danh mục văn bản bên ngoài hiện hành | Đo lường, môi trường, chất lượng, giao dịch điện tử, dữ liệu, an ninh mạng, người tiêu dùng và hợp đồng/công nhận. | Danh mục pháp lý; đánh giá tuân thủ. |

Ma trận này chỉ dẫn chiếu yêu cầu; không thay thế nội dung tiêu chuẩn
hoặc văn bản pháp luật. Khi có thay đổi, QLCL cập nhật đánh giá tác động
theo ETV.P14 và thủ tục quản lý rủi ro liên quan.
