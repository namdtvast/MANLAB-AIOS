# 09 — Kiến trúc tổng thể ManLab-AIOS (Architecture)

## 1. Mục đích và phạm vi

Tài liệu này mô tả kiến trúc chuẩn của **ManLab-AIOS Enterprise Repository v4.0**. Đây là kiến trúc hệ điều hành số cấp Viện, tổ chức đồng thời chiến lược, năng lực, hệ thống quản lý, quy trình, mô-đun phần mềm, dữ liệu, AI, tri thức, mã nguồn, triển khai, tuân thủ và nghiên cứu đổi mới.

ManLab-AIOS không chỉ là một phần mềm LIMS hoặc một cây tài liệu ISO. Hệ thống kết nối bốn chủ thể chính quanh **ETV Digital Operating System**:

- Khách hàng.
- Nhân sự ETV.
- Nhà nước và cơ quan quản lý.
- Đối tác và tổ chức công nhận.

## 2. Phân biệt các mô hình kiến trúc

Các sơ đồ của ETV mô tả cùng một hệ thống nhưng ở các góc nhìn khác nhau; không được xem là các kiến trúc cạnh tranh hoặc thay thế nhau.

| Mô hình | Câu hỏi trả lời | Phạm vi | Quan hệ với ManLab-AIOS |
|---|---|---|---|
| **Enterprise Repository 12 tầng** | Toàn bộ tài sản doanh nghiệp được tổ chức ở đâu và liên kết thế nào? | Kiến trúc tổng thể cấp Viện | Là kiến trúc chuẩn cao nhất của ManLab-AIOS |
| **QMS 6 tầng tài liệu** | Tài liệu quản lý đi từ chính sách đến bằng chứng và tri thức AI như thế nào? | Cấu trúc tài liệu Hệ thống quản lý | Là một góc nhìn logic, chủ yếu nằm trong tầng 03, 04, 06, 07 và 08 |
| **Hệ thống quản lý tích hợp 5 tiêu chuẩn** | Các yêu cầu ISO được tích hợp để quản trị chất lượng, năng lực, an toàn thông tin và AI ra sao? | Khung tuân thủ và quản trị | Là nội dung nguồn của tầng 03 và được ánh xạ/kiểm chứng tại tầng 11 |
| **Kiến trúc ứng dụng** | Phần mềm, dữ liệu, API và hạ tầng chạy như thế nào? | Kiến trúc giải pháp và vận hành | Được triển khai chủ yếu tại tầng 05, 09 và 10 |
| **Knowledge Graph - tầng 08** | Tri thức, thuật ngữ và quan hệ được liên kết thế nào? | Kiến trúc tri thức | Chỉ là một tầng của kiến trúc 12 tầng, không phải toàn bộ kiến trúc ManLab-AIOS |

Vì vậy, “kiến trúc tổng thể” trước đây chỉ mô tả các lớp nghiệp vụ - ứng dụng - dữ liệu - tích hợp - công nghệ là chưa đủ. Góc nhìn đó vẫn cần thiết nhưng phải được đặt bên trong kiến trúc Enterprise Repository 12 tầng.

## 3. Kiến trúc Enterprise Repository 12 tầng

| Tầng | Thư mục chuẩn | Vai trò | Nội dung chính | Chủ thể chính |
|---:|---|---|---|---|
| 01 | `01_ENTERPRISE` | Định hướng doanh nghiệp | Strategy, Vision, Mission, Organization, Governance, Business Model, KPI, Digital Strategy, Roadmap, Architecture, Glossary | Con người |
| 02 | `02_CAPABILITIES` | Năng lực nghiệp vụ | Danh mục năng lực cấp Viện, đơn vị, vai trò và Capability Map | Con người |
| 03 | `03_MANAGEMENT_SYSTEM` | Hệ thống quản lý tích hợp | ISO/IEC 17025, ISO 17034, ISO 9001, ISO/IEC 27001, ISO/IEC 42001; Sổ tay, chính sách, mục tiêu, ma trận áp dụng | Nguồn + con người |
| 04 | `04_PROCESS_LIBRARY` | Thư viện quy trình | MP01-MP38; mỗi MP là Process Hub liên kết thủ tục, BPMN, biểu mẫu, mô-đun, AI, luật, bằng chứng và kiểm thử | Con người + AI hỗ trợ |
| 05 | `05_MODULE_LIBRARY` | Thư viện mô-đun phần mềm | M01-M38; ứng dụng hiện thực hóa quy trình, ánh xạ 1:1 hoặc được phê duyệt với MP tương ứng | Mã nguồn + AI hỗ trợ |
| 06 | `06_SHARED_RESOURCES` | Tài nguyên dùng chung | Forms, Templates, Reference Data, Master Data, khách hàng, thiết bị, nhân sự, đơn vị, tiêu chuẩn | Con người + AI hỗ trợ |
| 07 | `07_AI_OPERATING_SYSTEM` | Hệ điều hành AI | Skills, Harness, Agents, Memory, Contexts, Prompts, MCP, RAG, Guardrails, Evaluation, AI Policies | AI + con người kiểm soát |
| 08 | `08_KNOWLEDGE_GRAPH` | Lớp tri thức | Luật, ISO, ĐLVN, TCVN, QCVN, ILAC, FAQ, case study, ontology, embedding, vector database, lessons learned | Nguồn + AI hỗ trợ |
| 09 | `09_ENGINEERING` | Phát triển sản phẩm | Backend, Frontend, Mobile, API, Database, Testing, DevOps, CI/CD, Code, Packages | Mã nguồn + AI hỗ trợ |
| 10 | `10_DEPLOYMENT` | Triển khai và vận hành | Docker, Kubernetes, Cloud, Monitoring, Logging, Backup, Disaster Recovery, Environment Configuration | Mã nguồn + AI hỗ trợ |
| 11 | `11_COMPLIANCE` | Tuân thủ và bằng chứng | ISO Mapping, Legal Mapping, Evidence, Audit, NC/CAPA, Management Review, Risk, Opportunity, KPI | Bằng chứng + con người |
| 12 | `12_RESEARCH_INNOVATION` | Nghiên cứu và đổi mới | KC4.0, DMC, AI, IoT, GPS, Paper, Patent, Proposal, Pilot, Lab Reports, R&D, Innovation | AI hỗ trợ + con người |

### 3.1. Quy tắc phụ thuộc giữa các tầng

- Tầng 01 xác định **vì sao** và **đi về đâu**.
- Tầng 02 xác định ETV cần **năng lực gì**.
- Tầng 03 xác định **yêu cầu quản lý và chuẩn mực**.
- Tầng 04 xác định **quy trình thực hiện**.
- Tầng 05 hiện thực hóa quy trình thành **mô-đun phần mềm**.
- Tầng 06 cung cấp **dữ liệu và tài nguyên dùng chung**.
- Tầng 07 hỗ trợ **AI và tự động hóa có kiểm soát**.
- Tầng 08 cung cấp **ngữ nghĩa, nguồn luật và tri thức**.
- Tầng 09 tạo và kiểm thử **sản phẩm kỹ thuật**.
- Tầng 10 triển khai và vận hành **môi trường hệ thống**.
- Tầng 11 chứng minh **tuân thủ, hiệu lực và khả năng truy xuất**.
- Tầng 12 thử nghiệm **năng lực và sản phẩm tương lai**, sau đó chuyển giao về các tầng vận hành khi được phê duyệt.

Không sao chép một tài sản sang nhiều tầng. Tài sản có một nguồn chuẩn duy nhất; nơi khác sử dụng liên kết có quản lý.

## 4. Process Hub MP01-MP38

Tầng 04 là trung tâm điều phối. Mỗi quy trình `MPxx` là một **Process Hub**, không chỉ là một tệp thủ tục.

### 4.1. Cấu trúc chuẩn của một MPxx

```text
MPxx_<Process_Name>/
├── README.md
├── manifest.yaml
├── links.yaml
├── 01_Procedure/
│   ├── MPxx_Procedure.md
│   └── Workflow.md
├── 02_BPMN/
│   └── MPxx.bpmn
├── 03_Forms_Links/
├── 04_Modules_Links/
├── 05_AI/
│   ├── Skill_Link.md
│   ├── Harness_Link.md
│   └── Agent_Link.md
├── 06_ISO_Law_Links/
├── 07_Evidence_Links/
├── 08_Test_Cases/
└── 09_Release_History/
```

### 4.2. Quan hệ MP ↔ M

- `MP01` ánh xạ `M01`, `MP02` ánh xạ `M02`, tiếp tục đến `MP38` ↔ `M38`, trừ trường hợp ngoại lệ được phê duyệt và ghi trong `manifest.yaml`.
- MP là định nghĩa quy trình và kiểm soát nghiệp vụ; M là mô-đun phần mềm hiện thực hóa quy trình.
- Sửa mô-đun không được tự động thay đổi thủ tục. Sửa thủ tục phải đánh giá tác động tới BPMN, biểu mẫu, dữ liệu, mô-đun, AI, kiểm thử và bằng chứng.

### 4.3. Digital Thread

Chuỗi giá trị số điển hình:

```text
Yêu cầu khách hàng
→ Hợp đồng
→ Kế hoạch
→ Hiện trường/Lấy mẫu
→ Hiệu chuẩn/Kiểm định/Thử nghiệm/Quan trắc
→ Kết quả
→ Thẩm tra
→ Phê duyệt
→ DCC/DVC/DTC hoặc chứng chỉ số
→ Khiếu nại (nếu có)
→ Đánh giá/Xem xét
```

Mỗi bước phải duy trì đồng thời:

- **Luồng thực thi:** người, vai trò, trạng thái và thời hạn.
- **Luồng dữ liệu:** đầu vào, dữ liệu gốc, phép tính và đầu ra.
- **Luồng minh chứng:** hồ sơ chứng minh tuân thủ.
- **Luồng AI hỗ trợ:** gợi ý hoặc tự động hóa trong giới hạn đã phê duyệt.

## 5. AI Operating System - tầng 07

AI OS là lớp điều hành AI xuyên suốt các quy trình và mô-đun, không phải một chatbot độc lập.

### 5.1. Thành phần

| Thành phần | Vai trò |
|---|---|
| Skills | Kỹ năng AI theo nghiệp vụ và quy trình |
| Harness | Lớp điều phối, workflow engine và kiểm soát thực thi |
| Agents | Tác nhân chuyên miền như QM, Tech, Legal hoặc ISO |
| Memory | Bộ nhớ ngữ cảnh có phạm vi và thời hạn kiểm soát |
| Contexts | Ngữ cảnh doanh nghiệp, quy tắc và dữ liệu đầu vào |
| Prompts | Thư viện prompt chuẩn hóa, có phiên bản |
| MCP | Giao thức kết nối dữ liệu, công cụ và hệ thống |
| RAG | Truy hồi có dẫn nguồn từ Knowledge Graph và repository |
| Guardrails | Kiểm soát an toàn, chính sách và giới hạn hành động |
| Evaluation | Đánh giá độ đúng, chất lượng, rủi ro và độ lệch |
| Reasoning | Lập kế hoạch và suy luận trong phạm vi được phép |
| AI Policies | Chính sách chất lượng AI, đạo đức, tuân thủ ISO/IEC 42001 |

### 5.2. Đầu vào và đầu ra

Đầu vào gồm người dùng, quy trình MPxx, dữ liệu/tài liệu, biểu mẫu/kết quả, luật/ISO và hệ thống bên ngoài. Đầu ra có thể gồm gợi ý, khuyến nghị, tự động hóa, báo cáo thông minh, cảnh báo rủi ro, hồ sơ minh chứng và dashboard/KPI.

### 5.3. Nguyên tắc AI

- AI-First nhưng Human-in-the-Loop.
- Minh bạch và giải thích được trong phạm vi sử dụng.
- An toàn, bảo mật, đạo đức và có kiểm soát dữ liệu.
- Tuân thủ ISO/IEC 42001 và chính sách ETV.
- Cải tiến liên tục dựa trên đánh giá.
- AI không tự ký, tự phát hành hoặc tự thay đổi kết quả kỹ thuật đã được phê duyệt.

## 6. Knowledge Graph - tầng 08

Tầng 08 là **lớp tri thức dùng chung**, không phải kiến trúc tổng thể. Tầng này liên kết:

- Luật, Nghị định, Thông tư và quy định quản lý.
- ISO, TCVN, QCVN, ĐLVN, ILAC và tài liệu cơ quan công nhận.
- Thuật ngữ, định nghĩa, ontology và quan hệ ngữ nghĩa.
- Quy trình MPxx, mô-đun Mxx, biểu mẫu, thiết bị, phương pháp và năng lực.
- FAQ, case study, bài học kinh nghiệm và hồ sơ đã ẩn danh/phân quyền.
- Embedding, vector database và chỉ mục phục vụ RAG.

### 6.1. Nguyên tắc nguồn tri thức

- Mỗi nút tri thức phải có nguồn, phiên bản, hiệu lực, phạm vi và chủ sở hữu.
- Văn bản nguồn `[SOURCE]` không được AI tự sửa.
- Nội dung AI sinh `[AI-GEN]` phải được gắn nhãn và phê duyệt trước khi trở thành tri thức chuẩn.
- Hồ sơ minh chứng `[EVID]` được liên kết theo quyền truy cập và thời hạn lưu giữ.
- Thuật ngữ mới được phát hiện tự động nhưng chỉ được đồng bộ chính thức sau phê duyệt.

## 7. Mô hình QMS 6 tầng trong kiến trúc 12 tầng

QMS 6 tầng là mô hình logic của tài liệu quản lý; được ánh xạ như sau:

| Tầng QMS | Nội dung | Vị trí chính trong Repository |
|---:|---|---|
| 1 | Chính sách và mục tiêu | `03_MANAGEMENT_SYSTEM` |
| 2 | Sổ tay quản lý, sơ đồ tổ chức, ma trận áp dụng, Process Map | `03_MANAGEMENT_SYSTEM`, liên kết `01_ENTERPRISE` và `04_PROCESS_LIBRARY` |
| 3 | Thủ tục - Procedure | `04_PROCESS_LIBRARY/MPxx/01_Procedure` |
| 4 | Phương pháp, WI, SOP | Liên kết từ MPxx đến tài liệu kỹ thuật chuẩn tại tầng 03/04/06 tùy loại |
| 5 | Biểu mẫu, hồ sơ, dữ liệu và bằng chứng | Biểu mẫu chuẩn tại tầng 06; liên kết và bằng chứng tại MPxx và tầng 11 |
| 6 | AI Knowledge Layer | Skills/Rules/Prompts tại tầng 07; nguồn tri thức và ontology tại tầng 08 |

Nguyên tắc là **một tài liệu - một nguồn chuẩn - nhiều liên kết**, không sao chép tài liệu giữa QMS và Process Hub.

## 8. Hệ thống quản lý tích hợp 5 tiêu chuẩn

ManLab-AIOS hỗ trợ một hệ thống quản lý tích hợp gồm:

- ISO 9001:2015 - hệ thống quản lý chất lượng.
- ISO/IEC 17025:2017 - năng lực phòng thử nghiệm và hiệu chuẩn.
- ISO 17034:2016 - năng lực nhà sản xuất mẫu chuẩn.
- ISO/IEC 27001:2022 - hệ thống quản lý an toàn thông tin.
- ISO/IEC 42001:2023 - hệ thống quản lý trí tuệ nhân tạo.

Yêu cầu tiêu chuẩn được quản lý làm nguồn ở tầng 03/08, ánh xạ tới quy trình và kiểm soát, sau đó thu thập bằng chứng và đánh giá tại tầng 11. PDCA được áp dụng chung, tránh xây năm hệ thống độc lập.

## 9. Kiến trúc ứng dụng, dữ liệu và tích hợp

Đây là góc nhìn kỹ thuật nằm bên trong các tầng 05, 06, 09 và 10.

### 9.1. Miền ứng dụng

| Miền | Khả năng/mô-đun |
|---|---|
| Khách hàng | CRM, cổng khách hàng, báo giá, hợp đồng, phản hồi |
| Dịch vụ | Yêu cầu, kế hoạch, thiết bị, mẫu, hiện trường, chuỗi kiểm soát |
| Đo lường | Kiểm định, hiệu chuẩn, thử nghiệm, độ không đảm bảo đo, DMC |
| Lĩnh vực đo lường | Hóa lý, Khối lượng, Nhiệt ẩm, Quang học, Y tế; liên kết năng lực - nhân sự - chuẩn - thiết bị - phương pháp |
| Môi trường | Quan trắc, phân tích, QA/QC, RA Test, dữ liệu trạm tự động |
| Chứng nhận | Hồ sơ đánh giá, quyết định, chứng nhận và giám sát |
| Mẫu chuẩn | Sản xuất, đồng nhất, ổn định, giá trị đặc trưng và chứng chỉ |
| Quản lý | Tài liệu, rủi ro, đánh giá, NC/CAPA, khiếu nại, KPI |
| Nguồn lực | Nhân sự, năng lực, thiết bị, bảo trì, kho và mua sắm |

### 9.2. Dữ liệu

- Dữ liệu chủ: khách hàng, thiết bị, nhân sự, đơn vị, phương pháp, dịch vụ, tiêu chuẩn.
- Tuyến quản lý trực tiếp: Hội đồng Quản lý → Ban Lãnh đạo Viện → Văn phòng/phòng/trung tâm → bộ phận chuyên ngành; Hội đồng Khoa học là nhánh tham mưu, tư vấn gián tiếp cho Ban Lãnh đạo Viện.
- Đối tượng môi trường: nguồn khí thải ống khói, điểm xả nước thải, vị trí quan trắc, thiết bị lấy mẫu, trạm tự động và thông số môi trường.
- Dữ liệu giao dịch: yêu cầu, hợp đồng, mẫu, phép đo, kết quả, chứng chỉ, đánh giá.
- Dữ liệu thô và hồ sơ minh chứng: lưu trong kho phù hợp, có checksum và chính sách lưu giữ.
- Dữ liệu phân tích: KPI, xu hướng, cảnh báo và dashboard.
- Knowledge Graph và vector database: phục vụ tìm kiếm ngữ nghĩa và RAG, không thay thế nguồn gốc.

### 9.3. Tích hợp

- API và event-driven integration cho liên kết mô-đun.
- MCP cho công cụ và ngữ cảnh AI được kiểm soát.
- Kết nối thiết bị, IoT và trạm quan trắc qua adapter.
- Chữ ký số, chứng chỉ số và DMC qua giao diện chuẩn.
- Link, manifest và ID ổn định cho liên kết nội bộ repository.

## 10. Engineering và Deployment

### 10.1. Engineering - tầng 09

- Backend, Frontend, Mobile, API và Database.
- Testing, test data, test case và quality gate.
- DevOps, CI/CD, quản lý package và phiên bản mã nguồn.
- Mã nguồn liên kết tới Mxx, Mxx liên kết tới MPxx; không đặt mã nguồn trong thư viện quy trình.

### 10.2. Deployment - tầng 10

- Container, Docker/Kubernetes hoặc nền tảng tương đương được phê duyệt.
- Môi trường Development, Test, Staging và Production được phân tách.
- Cloud/on-premise/hybrid theo yêu cầu bảo mật và vận hành.
- Monitoring, logging, backup, disaster recovery và configuration management.
- Công nghệ tham chiếu có thể gồm Git, Docker/K8s, PostgreSQL, FastAPI, React/Next.js, LangChain, vector database, Elasticsearch, Prometheus/Grafana và object storage; lựa chọn thực tế phải qua phê duyệt kiến trúc.

## 11. Compliance, Evidence và truy xuất

Tầng 11 duy trì chuỗi bằng chứng từ yêu cầu đến thực thi:

```text
Luật/ISO/QCVN/ĐLVN
→ Yêu cầu kiểm soát
→ MPxx/Thủ tục
→ Mxx/Workflow
→ Biểu mẫu và dữ liệu
→ Hồ sơ minh chứng
→ Đánh giá/KPI/NC-CAPA/Xem xét lãnh đạo
```

Mỗi liên kết phải truy xuất hai chiều. Người đánh giá phải đi từ điều khoản đến bằng chứng và từ bằng chứng về đúng quy trình, phiên bản, người thực hiện và nguồn yêu cầu.

## 12. Quy tắc lưu file và phân loại

### 12.1. Ký hiệu nguồn

| Ký hiệu | Ý nghĩa |
|---|---|
| `[HUMAN]` | Tài liệu do con người tạo hoặc chịu trách nhiệm chính |
| `[AI-GEN]` | Nội dung tự động sinh bởi AI, chưa mặc nhiên là tài liệu chuẩn |
| `[SOURCE]` | Nguồn gốc hoặc văn bản gốc không được tự ý sửa |
| `[EVID]` | Hồ sơ minh chứng |
| `[CODE]` | Mã nguồn hoặc cấu hình hệ thống |

### 12.2. Quy tắc bắt buộc

- Tên tệp dùng chuẩn thống nhất, không chứa ký tự gây lỗi hệ thống.
- Tài liệu có mã, phiên bản, ngày hiệu lực, chủ sở hữu và trạng thái.
- Không copy khi có thể dùng liên kết động.
- Không đưa hồ sơ minh chứng vào thư viện nguồn hoặc thư viện quy trình.
- Mọi thay đổi có lịch sử, người thực hiện và căn cứ phê duyệt.
- Tài liệu AI sinh phải được phân loại, đánh giá và phê duyệt phù hợp.

## 13. Nguyên tắc thiết kế tổng thể

- **Process First:** quy trình là trung tâm điều phối.
- **Data Driven:** quyết định dựa trên dữ liệu có nguồn và chất lượng.
- **AI Native:** AI được tích hợp vào kiến trúc, không gắn thêm tùy tiện.
- **Human in Control:** con người có thẩm quyền chịu trách nhiệm cuối cùng.
- **Link, not Copy:** liên kết thay cho sao chép.
- **Traceable:** truy xuất hai chiều từ yêu cầu đến bằng chứng.
- **Secure and Compliant:** an toàn và tuân thủ ngay từ thiết kế.
- **Scalable:** mô-đun hóa, mở rộng linh hoạt.
- **Sustainable:** dễ bảo trì, cập nhật và bàn giao.

## 14. Tiêu chí kiểm tra tính đúng kiến trúc

Một tài sản hoặc thay đổi được coi là phù hợp kiến trúc khi trả lời được:

1. Thuộc tầng nào và có một nguồn chuẩn duy nhất ở đâu?
2. Liên kết tới chiến lược, năng lực và yêu cầu quản lý nào?
3. Thuộc MPxx nào; nếu có phần mềm thì ánh xạ Mxx nào?
4. Dùng dữ liệu chủ, biểu mẫu và nguồn tri thức nào?
5. AI tham gia ở bước nào, với guardrail và người phê duyệt nào?
6. Bằng chứng tuân thủ được tạo, lưu và truy xuất ở đâu?
7. Mã nguồn, kiểm thử, triển khai và giám sát được quản lý thế nào?
8. Rủi ro, an toàn thông tin, phiên bản và quay lui đã được kiểm soát chưa?

Nếu không trả lời đủ tám câu hỏi, thay đổi chưa sẵn sàng để đưa vào ManLab-AIOS chính thức.

## Infographic tóm tắt

![Infographic kiến trúc ManLab-AIOS Enterprise Repository v4.0](infographics/09_architecture.png)
