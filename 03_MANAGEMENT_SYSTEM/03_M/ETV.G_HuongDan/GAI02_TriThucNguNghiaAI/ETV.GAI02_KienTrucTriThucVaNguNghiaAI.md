---
# Khối metadata AI — bắt buộc cho mọi văn bản kiểm soát (ETV.P14 §6.3)
id: ETV.GAI 02
title: "Hướng dẫn Kiến trúc tri thức và ngữ nghĩa cho trí tuệ nhân tạo trong hệ sinh thái ManLab"
type: Huong-dan
owner: "Người phụ trách quản trị AI (PT.AI)"
department: "Toàn Viện"
process: MP29_AI
capability: [CAP-29_AIOffice]
module: M29_AI
effective_date: ""
revision: "01"
status: Nhap
keywords: [kiến trúc AI, tri thức, ngữ nghĩa, từ điển nghiệp vụ, sổ đăng ký ngữ nghĩa, truy hồi tăng cường, RAG, cổng SQL, cổng bằng chứng, kiểm chứng câu trả lời, bộ câu hỏi vàng, định tuyến mô hình]
related_documents: [ETV.P01, ETV.P06, ETV.P12, ETV.P13, ETV.P14, ETV.P15, ETV.P26, ETV.P27, ETV.P28, ETV.P29, ETV.P30, ETV.P33, ETV.P34, ETV.P35, ETV.GAI01, ETV.P.F26.01, ETV.P.F29.01, ETV.P.F29.02, ETV.P.F29.03, ETV.P.F29.04, ETV.P.F34.01, ETV.P.F34.03, ETV.P.F35.01, ETV.P.F28.01]
iso_clause: ["ISO/IEC 42001:2023 §6.1.4, §8.1, §8.3, §8.4", "ISO/IEC 27001:2022 A.5.9, A.5.12, A.5.23, A.8.3, A.8.12, A.8.16", "ISO/IEC 17025:2017 §7.11", "ISO 9001:2015 §7.1.6, §8.5.1"]
legal_basis: ["Luật Giao dịch điện tử 20/2023/QH15", "Pháp luật hiện hành về an toàn thông tin mạng", "Pháp luật hiện hành về bảo vệ dữ liệu cá nhân"]
ai_tags: [semantic-layer, knowledge-service, rag, sql-guard, evidence-gate, answer-verifier, golden-dataset]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo thời hạn lưu của tài liệu HTQL tại ETV.P.F 14.06"
digital_signature: "LĐV"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV)"
supersedes: null
superseded_by: null
---

# HƯỚNG DẪN KIẾN TRÚC TRI THỨC VÀ NGỮ NGHĨA CHO TRÍ TUỆ NHÂN TẠO TRONG HỆ SINH THÁI MANLAB

**Guideline For AI Knowledge & Semantic Architecture**

|                   |                                      |
| ----------------- | ------------------------------------ |
| **Mã số**         | ETV.GAI 02                           |
| **Lần ban hành**  | 01                                   |
| **Ngày ban hành** | ..../..../........                   |
| **Biên soạn**     | ..................................   |
| **Soát xét**      | ..................................   |
| **Phê duyệt**     | ..................................   |

> **Tình trạng bản này: NHÁP** — chưa có hiệu lực. Bản dự thảo do AI hỗ trợ soạn trên cơ sở đặc tả thiết kế `MANLAB-AI-SPEC-001` v1.1 do Viện cung cấp, cần Lãnh đạo Phòng soát xét và Lãnh đạo Viện phê duyệt theo ETV.P14 §6.6 trước khi áp dụng.
>
> **Mã số `ETV.GAI 02` là mã chính thức.** Ký hiệu phân loại phi đo lường `AI` đã được đăng ký tại bảng mã hoá ETV.P14 §6.2 kể từ **lần ban hành 04** (hiệu lực 30/08/2026), theo phiếu `ETV.P.F14.01_2026-08-30_P14_KyHieuLinhVucAI`. Vướng mắc mã số nêu trước đây tại ETV.GAI 01 đã được xử lý.

> **Chú ý:** Tài liệu nội bộ, nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian | Nội dung thay đổi | Lần ban hành |
| --- | --- | --- |
| 30/08/2026 | Dự thảo lần đầu. Chuyển đặc tả thiết kế `MANLAB-AI-SPEC-001` v1.1 thành văn bản kiểm soát của Viện: giữ nguyên kiến trúc, đối chiếu với hiện trạng ManLab AIOS (§3.4), ánh xạ tên gọi sang thực thể M29 đã có (§3.3), hoà giải bộ câu hỏi vàng với biểu mẫu đã ban hành ETV.P.F29.03 (§3.14) và nêu rõ ba điểm của bản gốc **lệch hiện trạng, phải chốt trước khi áp dụng** (§3.18). | 01 |

---

## 1. MỤC ĐÍCH

Quy định **kiến trúc chuẩn** để xây dựng các năng lực trí tuệ nhân tạo có tra cứu tri thức và truy vấn dữ liệu trong hệ sinh thái ManLab, sao cho câu trả lời của AI **luôn dựng trên bằng chứng lấy từ nguồn có kiểm soát**, truy ngược được, và không phụ thuộc vào việc mô hình ngôn ngữ "nhớ" được gì.

Nguyên tắc chi phối toàn bộ hướng dẫn:

> **Mô hình ngôn ngữ chịu trách nhiệm hiểu ngôn ngữ, suy luận và diễn đạt. Dữ liệu, tri thức, quy tắc nghiệp vụ và bằng chứng phải do các dịch vụ có kiểm soát cung cấp.**

**Hướng dẫn này không đặt ra quy định mới.** Nó xâu chuỗi các yêu cầu đã có của ETV.P29, ETV.P26, ETV.P34, ETV.P28, ETV.P35 thành một kiến trúc kỹ thuật thực hiện được, và bổ sung phần thiết kế để người lập trình làm được ngay. Khi có mâu thuẫn, **các thủ tục nêu trên là bản đúng**.

---

## 2. PHẠM VI ÁP DỤNG

Áp dụng cho mọi năng lực AI **có tra cứu** trong hệ sinh thái ManLab:

- Trợ lý hỏi–đáp (Copilot) trên ManLab AIOS và VI-CONNECT;
- AI tìm kiếm dữ liệu, hỏi–đáp tài liệu, sinh truy vấn từ ngôn ngữ tự nhiên;
- Tác tử AI, kỹ năng AI, luồng công việc có AI tham gia;
- AI lập báo cáo, phân tích số liệu nghiệp vụ;
- Các giao diện lập trình AI dùng chung của hệ sinh thái.

**Ngoài phạm vi:**

- Năng lực AI **không tra cứu** dữ liệu/tri thức của Viện (ví dụ dịch, tóm tắt văn bản người dùng tự dán vào) — vẫn phải đăng ký theo ETV.P29 nhưng không cần tầng ngữ nghĩa của hướng dẫn này;
- Hạ tầng máy chủ mô hình, GPU, engine suy luận — thuộc **ETV.GAI 01**;
- Cấu hình Skill/Agent của Claude Code vận hành trên chính kho `MANLAB-AIOS` (tầng `07_AI_OPERATING_SYSTEM`) — đó là công cụ làm việc nội bộ, không phải sản phẩm phần mềm của Viện.

### 2.1. Ranh giới trách nhiệm giữa các thủ tục và tài liệu

| Việc | Thủ tục / tài liệu | Hồ sơ |
| --- | --- | --- |
| Đăng ký hệ thống AI, đánh giá tác động, kiểm thử chất lượng, sự cố AI | ETV.P29 | F29.01, F29.02, F29.03, F29.04 |
| Tri thức được phê duyệt và điều kiện đưa vào chỉ mục AI | ETV.P26 | F26.01 |
| Tài sản dữ liệu, từ điển dữ liệu, phê duyệt khai thác dữ liệu | ETV.P34, ETV.P27 | F34.01, F34.03 |
| Phân loại mức bảo mật, khoá truy cập, rủi ro và sự cố ATTT | ETV.P28, ETV.P02 | F28.01, F28.03, F28.04 |
| Đăng ký nền tảng số, đánh giá trước vận hành, giám sát | ETV.P35 | F35.01–F35.04 |
| Máy chủ mô hình nội bộ, GPU, engine suy luận, định tuyến theo mức dữ liệu | **ETV.GAI 01** | — |
| **Kiến trúc tầng tri thức–ngữ nghĩa, truy hồi, cổng bằng chứng, kiểm chứng câu trả lời, đánh giá** | **Hướng dẫn này** | — |
| Đặc tả phần mềm hiện thực kiến trúc này | `05_MODULE_LIBRARY/M29_AI/01_Requirement/DacTa.md` | — |

### 2.2. Quan hệ với ETV.GAI 01

Hai hướng dẫn cắt theo hai trục khác nhau và **không chồng lấn**:

```text
ETV.GAI 01  →  mô hình chạy Ở ĐÂU, trên phần cứng nào, dữ liệu được phép đi tới đâu
ETV.GAI 02  →  mô hình được cấp CÁI GÌ để trả lời, và bằng chứng được kiểm ra sao
```

Một năng lực AI có tra cứu phải đạt **cả hai**: nền tảng mô hình đã qua ETV.GAI 01 Bước 1–6, và đường tri thức–ngữ nghĩa đã theo §3 của hướng dẫn này.

---

## 3. NỘI DUNG HƯỚNG DẪN

### 3.1. Năm nguyên tắc bắt buộc

| # | Nguyên tắc | Căn cứ đã có |
| --- | --- | --- |
| **NT1** | **Mô hình ngôn ngữ không phải cơ sở dữ liệu.** Hồ sơ khách hàng, thiết bị, hợp đồng, báo giá, trạng thái hồ sơ, doanh thu, tiêu chuẩn hiện hành, quy tắc nghiệp vụ thay đổi theo thời gian — không bao giờ lấy từ trí nhớ mô hình, luôn lấy từ cơ sở dữ liệu, giao diện lập trình, dịch vụ tri thức hoặc chỉ mục tài liệu. | ETV.P29 §5.3.1 ("không được bịa dữ liệu, số liệu, mã tài liệu") |
| **NT2** | **Bằng chứng trước, suy luận sau.** Trình tự bắt buộc là `bằng chứng → suy luận → câu trả lời`, không phải `câu hỏi → mô hình đoán → câu trả lời`. Không đủ bằng chứng thì từ chối, không suy đoán. | ETV.P29 §5.3.1, §5.6 |
| **NT3** | **Dữ liệu có cấu trúc và không cấu trúc xử lý bằng hai đường khác nhau.** Dữ liệu nghiệp vụ (khách hàng, thiết bị, kết quả đo) đi đường truy vấn có kiểm soát; tài liệu (thủ tục, tiêu chuẩn, hướng dẫn) đi đường truy hồi tài liệu. Không trộn hai đường. | §3.7, §3.8, §3.9 |
| **NT4** | **AI không được tự phát minh lược đồ.** Bảng, cột, quan hệ, quy tắc nghiệp vụ, điểm cuối, thủ tục lưu trữ — mọi ánh xạ phải đăng ký trước trong sổ đăng ký ngữ nghĩa. Không có ánh xạ thì từ chối, không đoán. | ETV.P29 §5.4.2 |
| **NT5** | **Phân quyền không do mô hình quyết định.** Danh tính, vai trò, quyền, ranh giới dữ liệu được áp ở tầng ứng dụng/dịch vụ trước khi mô hình nhìn thấy bất cứ thứ gì. Chèn ràng buộc phân quyền bằng câu chữ trong lời nhắc **không** được tính là kiểm soát. | ETV.P29 §5.4.2, §5.5 |

### 3.2. Kiến trúc tổng thể

```text
Người dùng (ManLab AIOS / VI-CONNECT / API)
        ↓  kèm danh tính, vai trò, quyền, phạm vi tổ chức
   HIỂU CÂU HỎI        chuẩn hoá · ý định · thực thể · đầu ra có cấu trúc
        ↓
   DỊCH VỤ TRI THỨC VÀ NGỮ NGHĨA
        │  từ điển nghiệp vụ · từ điển dữ liệu · quy tắc nghiệp vụ
        │  sổ đăng ký ngữ nghĩa · định nghĩa chỉ số
        ↓
   LẬP KẾ HOẠCH VÀ ĐỊNH TUYẾN TRUY VẤN
        ├──────────────┬──────────────┬──────────────┐
        ▼              ▼              ▼              ▼
      TÀI LIỆU      DỮ LIỆU        API           CÔNG CỤ
        │              │              │              │
     Xếp hạng lại   Cổng SQL      Cổng quyền    Cổng công cụ (M29)
        └──────────────┴──────┬───────┴──────────────┘
                              ▼
                     DỊCH VỤ BẰNG CHỨNG
                              ▼
                      CỔNG BẰNG CHỨNG  ──── không đạt ──→  CÂU TRẢ LỜI DỰ PHÒNG
                              │ đạt                          (5 loại, §3.11)
                              ▼
                       DỰNG NGỮ CẢNH
                              ▼
                    ĐỊNH TUYẾN MÔ HÌNH → mô hình (ETV.GAI 01)
                              ▼
                    KIỂM CHỨNG CÂU TRẢ LỜI
                              ▼
                       CÂU TRẢ LỜI CUỐI
                              ▼
              NHẬT KÝ SUY LUẬN · CHI PHÍ · ĐÁNH GIÁ (M29)
```

**Bốn điều cấm tuyệt đối của kiến trúc này:**

1. **Không** gọi mô hình khi Cổng bằng chứng không đạt. Ngữ cảnh rỗng đưa vào mô hình là lệnh ngầm bảo nó bịa.
2. **Không** cho mô hình sinh câu lệnh truy vấn chạy thẳng vào cơ sở dữ liệu nghiệp vụ. Mọi câu lệnh đi qua Cổng SQL (§3.9).
3. **Không** đưa toàn bộ lược đồ cơ sở dữ liệu hay toàn văn tài liệu vào lời nhắc. Chỉ đưa bằng chứng đã chọn (§3.12).
4. **Không** để tài liệu, dữ liệu văn bản hay tệp người dùng tải lên ghi đè lời nhắc hệ thống, phân quyền hay chính sách truy vấn (§3.16).

### 3.3. Ánh xạ thành phần kiến trúc ↔ thực thể đã có của M29

Bảng này là phần **quan trọng nhất đối với người lập trình**: kiến trúc gốc đặt tên theo thông lệ quốc tế, còn ManLab AIOS đã có sẵn các thực thể tương ứng. **Không tạo thực thể song song, không đặt tên thứ hai cho cùng một thứ.**

| Thành phần trong kiến trúc | Thực thể/thành phần đã có | Ghi chú |
| --- | --- | --- |
| AI Gateway, Tool Gateway | Cổng công cụ M29 — `gateway.ts` | Đã có, 7 bước kiểm tra, bước cuối là Cổng AIA (ETV.P29 §5.2.3) |
| Model Router, Model Provider | `AIPlatform` → `AIProvider` → `AIModel` + `IAIPlatformAdapter` | Đã có; quy tắc định tuyến theo loại tác vụ **còn thiếu** (§3.12) |
| Tool Registry, Tool Permission | `AITool`, `AITool.permissionLevel` | Đã có; 4 mức Đọc/Tính toán/Đề xuất/Thực thi theo ETV.P29 §5.1.4 |
| Guardrail | `AIGuardrail` | Đã có bản ghi khai báo; điểm cưỡng chế lúc chạy **còn thiếu** |
| Audit Service | `AIAuditLog` | Đã có, chỉ ghi thêm |
| Trace, Observability | `AIRequest`, `AIToolCall`, `AICostUsage` | Đã có |
| Evaluation Service | `AIEvaluationSuite/Case/Run` + bộ câu hỏi vàng | Đã có; hoà giải với F29.03 tại §3.14 |
| Knowledge Index, Document Chunk | `CopilotDocChunk` | Đã có cho tài liệu kiểm soát; chưa có OCR/bảng biểu |
| Prompt versioning | `AIPrompt` / `AIPromptVersion` | Đã có, đúng ETV.P29 §5.4.1 |
| Data boundary | `AIPlatform.dataBoundary` | Đã có; là **trần cứng** của mức bảo mật được gửi đi |
| Knowledge Service, Semantic Registry, SQL Guard, Evidence Service, Evidence Gate, Answer Verifier | — | **Chưa có.** Đây là phần việc mới của hướng dẫn này |

### 3.4. Hiện trạng ManLab AIOS (dành cho người lập trình)

Cập nhật tới 30/08/2026, đo trực tiếp trên `09_ENGINEERING/aios-platform`. **Đọc bảng này trước khi viết mã để không làm lại việc đã có.**

| Hạng mục | Hiện trạng | Bằng chứng |
| --- | --- | --- |
| Cổng công cụ 7 bước, có Cổng AIA chặn cứng | **Đã có** | `src/lib/m29/gateway.ts` |
| Chỉ mục tài liệu kiểm soát + truy hồi toàn văn tiếng Việt | **Đã có** | `src/lib/m29/copilot/retrieval.ts`, `text.ts` (chuẩn hoá bỏ dấu, cấu hình `simple` của Postgres) |
| Lọc mức bảo mật **lặp lại** ở tầng truy hồi (phòng thủ nhiều lớp) | **Đã có** | `retrieval.ts` + `muc-bao-mat.ts`; chỉ `Cong-khai`/`Noi-bo` vào chỉ mục, đúng ETV.P29 §5.5 |
| Trần mức bảo mật theo từng nền tảng, mặc định siết nhất | **Đã có** | `AIPlatform.dataBoundary`, nới trần phải dẫn số hồ sơ F29.02 |
| Hạn mức số đoạn trên mỗi tài liệu khi dựng ngữ cảnh | **Đã có** | `MAX_PASSAGES = 6`, `MAX_PASSAGES_PER_DOC = 2` — đo thực tế cho thấy không có hạn mức thì một tài liệu dài chiếm trọn 6 chỗ |
| Bộ câu hỏi vàng theo đúng 7 nhóm của F29.03, có trình chấm | **Đã có** | `copilot/bo-cau-hoi-vang.ts`, `copilot/danh-gia.ts` — chỉ **đo**, không kết luận Đạt/Không đạt (ETV.P29 §4.8) |
| Lọc gợi ý câu hỏi theo tài liệu **thật sự** có trong chỉ mục | **Đã có** | `copilot/chi-muc.ts` |
| Nhật ký suy luận, chi phí, nhật ký thay đổi cấu hình | **Đã có** | `AIRequest`, `AICostUsage`, `AIAuditLog` |
| **Tìm kiếm véc-tơ (embedding) và trộn với tìm kiếm từ khoá** | **Còn thiếu** | Hiện chỉ có toàn văn Postgres |
| **Xếp hạng lại (reranker)** | **Còn thiếu** | Cần giao diện `IReranker` để đổi mô hình không đụng logic nghiệp vụ |
| **Nạp tài liệu quét ảnh, OCR, bảng biểu, biểu mẫu** | **Còn thiếu** | Chỉ mục hiện chỉ nhận Markdown trong kho |
| **Từ điển nghiệp vụ, từ điển dữ liệu, sổ đăng ký ngữ nghĩa** | **Còn thiếu** | §3.6 |
| **Nhận diện ý định và bóc tách thực thể có lược đồ** | **Còn thiếu** | §3.5 |
| **Truy vấn dữ liệu nghiệp vụ có cấu trúc + Cổng SQL** | **Còn thiếu** | §3.9 — hiện Copilot **cố ý không chạm** bảng nghiệp vụ nào |
| **Dịch vụ bằng chứng và Cổng bằng chứng tách bạch** | **Còn thiếu** | Hiện việc "không tìm được nguồn thì từ chối" nằm rải trong luồng chat |
| **Kiểm chứng câu trả lời sau khi mô hình trả lời** | **Còn thiếu** | §3.13 |
| **Điểm cưỡng chế `AIGuardrail` lúc chạy** | **Còn thiếu** | Bản ghi đã có, chưa có nơi đọc ra để chặn |
| **Quy tắc định tuyến theo loại tác vụ** | **Còn thiếu** | Nền tảng đang gắn cứng ở `AIAgent.platformId` — đã ghi nhận tại ETV.GAI 01 §3.6 |

### 3.5. Hiểu câu hỏi và đầu ra có cấu trúc

Mọi lượt hỏi đi qua bước hiểu câu hỏi trước khi chạm bất kỳ nguồn dữ liệu nào. Đầu ra của bước này **bắt buộc** là đối tượng kiểm tra được theo lược đồ, không phải văn bản tự do:

```json
{
  "normalized_query": "Khách hàng ABC có thiết bị nào sắp hết hạn hiệu chuẩn?",
  "intent": "equipment.calibration.expiring",
  "entities": { "customer": "ABC", "days": 30 },
  "requested_action": "search",
  "source_type": "structured_data",
  "confidence": 0.94
}
```

Các bước bắt buộc phải trả đầu ra có lược đồ và **được kiểm tra trước khi sang bước sau**: hiểu câu hỏi, phân giải ngữ nghĩa, lập kế hoạch, gọi công cụ, lập truy vấn dữ liệu, kiểm chứng câu trả lời.

Không kiểm tra được lược đồ ⇒ dừng luồng, trả câu dự phòng `LOW_CONFIDENCE` (§3.11), ghi nhật ký. **Không** chuyển tiếp một đối tượng "gần đúng".

### 3.6. Từ điển nghiệp vụ, từ điển dữ liệu, sổ đăng ký ngữ nghĩa

Ba sổ này là **một nguồn sự thật** cho ý nghĩa nghiệp vụ. Chúng phải là dữ liệu quản trị được, có phiên bản và có người phê duyệt — không phải hằng số rải trong mã.

**a) Từ điển nghiệp vụ** — ánh xạ cách người ta thật sự nói về thuật ngữ chuẩn:

| Viết tắt / cách gọi | Thuật ngữ chuẩn |
| --- | --- |
| KH | Khách hàng |
| HC · hiệu chuẩn · calibration | Hiệu chuẩn |
| KĐ · kiểm định | Kiểm định |
| TN · thử nghiệm | Thử nghiệm |
| PTN | Phòng thí nghiệm |
| MQL | Mã quản lý |
| TB | Thiết bị |

Nguồn gốc thuật ngữ **không được tự đặt**: lấy từ mục Thuật ngữ của thủ tục tương ứng và từ ETV.P26. Thêm thuật ngữ mới là thay đổi tri thức, đi theo ETV.P26.

**b) Từ điển dữ liệu** — ánh xạ khái niệm nghiệp vụ tới trường dữ liệu vật lý:

```yaml
entity: ThietBi
attributes:
  - semantic_name: management_code
    business_name: Mã quản lý
    physical_field: <lấy từ lược đồ thật>
  - semantic_name: next_calibration_date
    business_name: Ngày hiệu chuẩn tiếp theo
    physical_field: <lấy từ lược đồ thật>
```

Trường vật lý **phải đọc từ lược đồ thật của hệ thống đích**, không chép từ ví dụ trong tài liệu. Tài sản dữ liệu tương ứng phải đã đăng ký theo ETV.P34 (F34.01) và việc khai thác được phê duyệt theo F34.03 — đúng ETV.P29 §5.5.

**c) Sổ đăng ký ngữ nghĩa** — ánh xạ ý định tới nguồn dữ liệu được phép:

```json
{
  "intent": "equipment.calibration.expiring",
  "business_object": "ThietBi",
  "source_type": "structured_data",
  "semantic_view": "vw_ai_equipment_calibration",
  "allowed_fields": ["EquipmentCode", "EquipmentName", "CustomerName", "NextCalibrationDate"]
}
```

Chuỗi phân giải bắt buộc: `câu hỏi → ý định → thực thể → phân giải từ điển → sổ đăng ký ngữ nghĩa → đối tượng nghiệp vụ → nguồn dữ liệu → truy vấn ngữ nghĩa đã phân giải`.

**Ý định không có trong sổ đăng ký ⇒ từ chối.** Không cho mô hình tự đoán bảng, cột hay khung nhìn (NT4).

### 3.7. Lập kế hoạch và định tuyến truy vấn

Bộ lập kế hoạch trả lời bốn câu: cần dữ liệu gì · lấy ở nguồn nào · có cần nhiều nguồn không · có cần nhiều bước không.

Bộ định tuyến hỗ trợ tối thiểu 5 loại:

| Loại | Đường xử lý |
| --- | --- |
| Tri thức | Truy hồi tài liệu (§3.8) |
| Dữ liệu | Truy vấn có cấu trúc / giao diện lập trình (§3.9) |
| Tính toán | Truy vấn có cấu trúc + quy tắc nghiệp vụ + bộ tính |
| Hành động | Cổng công cụ (§3.10) |
| Hỗn hợp | Kết hợp các đường trên, gộp bằng chứng trước khi trả lời |

Ví dụ câu hỏi hỗn hợp *"Thiết bị ABC hết hạn khi nào và quy trình xử lý tiếp theo là gì?"* tách thành: lấy dữ liệu thiết bị (dữ liệu) → tra quy trình xử lý (tri thức) → gộp bằng chứng → sinh câu trả lời.

### 3.8. Truy hồi tài liệu

**a) Nạp tài liệu:**

```text
Tài liệu → nhận dạng loại tệp → bóc tách (OCR nếu là bản quét) → phân tích bố cục
        → bóc tách bảng → nhận diện mục → giữ cấu trúc → gắn siêu dữ liệu
        → chia đoạn → nhúng véc-tơ → lập chỉ mục
```

Bắt buộc hỗ trợ: PDF văn bản, PDF quét, Word, Excel, ảnh, bảng phức tạp, biểu mẫu, chứng chỉ, biên bản, quy trình kỹ thuật, tiêu chuẩn. Khi xử lý bảng phải giữ: tiêu đề bảng, dòng tiêu đề, dòng, cột, đơn vị, chú thích chân bảng, số trang, mục, tài liệu nguồn — mất đơn vị đo hoặc mất chú thích là mất chính thông tin quyết định tính đúng của câu trả lời kỹ thuật.

**b) Siêu dữ liệu tối thiểu của mỗi đoạn:** mã tài liệu · loại tài liệu · lĩnh vực · thực thể · ngày hiệu lực · lần ban hành · trạng thái · **mức bảo mật** · nguồn · số trang · mục · phạm vi tổ chức.

**c) Điều kiện vào chỉ mục (chặn cứng, không có ngoại lệ thủ công):**

- Chỉ tài liệu **đã phê duyệt** và ở mức **Công khai** hoặc **Nội bộ** (ETV.P29 §5.5; ETV.P26 §5.5; ETV.P28 §6.13);
- Tài liệu chuyển sang hết hiệu lực thì **gỡ khỏi chỉ mục ngay trong cùng giao dịch**;
- Lọc mức bảo mật thực hiện **cả lúc nạp lẫn lúc truy hồi** — hiện trạng đã làm đúng như vậy, giữ nguyên;
- Trần mức bảo mật còn phụ thuộc ranh giới dữ liệu của nền tảng mô hình đang dùng (ETV.GAI 01 §3.7).

**d) Truy hồi lai:**

```text
Câu hỏi → viết lại truy vấn → lọc theo siêu dữ liệu
        → tìm từ khoá (BM25/toàn văn)  +  tìm véc-tơ
        → gộp ứng viên → xếp hạng lại → ngưỡng → K đoạn tốt nhất
```

Chỉ dùng tìm kiếm véc-tơ là không đủ: mã tài liệu, số hiệu điều khoản và ký hiệu kỹ thuật khớp bằng từ khoá tốt hơn nhiều. Ngược lại, chỉ dùng từ khoá thì câu hỏi diễn đạt khác từ ngữ trong tài liệu sẽ trượt.

**e) Xếp hạng lại:** thiết kế sau một giao diện `IReranker` để đổi mô hình mà không sửa logic nghiệp vụ. **Không** khoá kiến trúc vào một mô hình xếp hạng cụ thể; chọn mô hình sau khi đo trên bộ câu hỏi vàng.

### 3.9. Truy vấn dữ liệu có cấu trúc và Cổng SQL

Mô hình **không bao giờ** truy cập cơ sở dữ liệu nghiệp vụ trực tiếp:

```text
Mô hình → truy vấn ngữ nghĩa → Dịch vụ truy vấn dữ liệu → sinh câu lệnh
        → CỔNG SQL → khung nhìn đã phê duyệt → tài khoản chỉ-đọc → CSDL
```

Thứ tự ưu tiên nguồn: **giao diện lập trình → khung nhìn ngữ nghĩa → thủ tục lưu trữ trong danh sách cho phép → khung nhìn chỉ-đọc**, trước khi tính tới bảng gốc.

**Cổng SQL kiểm tra ở mức cây cú pháp, không phải so chuỗi.** So chuỗi bị vượt qua bằng chú thích, chữ hoa/thường, mã hoá ký tự — đây là kiểm soát an ninh, không phải bộ lọc thẩm mỹ.

```text
Câu lệnh sinh ra → phân tích cú pháp → cây cú pháp → kiểm loại câu lệnh
   → danh sách lược đồ cho phép → danh sách bảng → danh sách cột
   → cưỡng chế phạm vi tổ chức → kiểm tải → tham số hoá → thực thi chỉ-đọc
```

Chính sách mẫu (giá trị cụ thể do PT.AI và QTHT chốt khi triển khai):

```yaml
sql_policy:
  read_only: true
  allowed_statements: [SELECT]
  forbidden: [INSERT, UPDATE, DELETE, DROP, ALTER, TRUNCATE]
  allow_select_star: false
  max_rows: 1000
  max_joins: 8
  query_timeout_seconds: 10
  require_scope_filter: true        # xem §3.18 điểm 2
  require_parameterization: true
  allowed_schemas: [ai_semantic]
```

**Kiểm tải** là yêu cầu riêng, không gộp vào an ninh: chi phí thực thi ước tính, quét toàn bảng, số phép nối, thời gian chờ, số bản ghi dự kiến, việc dùng chỉ mục, truy vấn vượt phạm vi tổ chức. Truy vấn vượt chính sách thì **từ chối hoặc viết lại**, không nới chính sách cho chạy được.

Mức quyền của mọi công cụ truy vấn dữ liệu ở kiến trúc này là **Đọc** hoặc **Tính toán** theo ETV.P29 §5.1.4. Muốn ghi dữ liệu thì đó là công cụ mức **Thực thi**, bắt buộc có yêu cầu xác nhận hoặc yêu cầu phê duyệt và do LĐV phê duyệt từng công cụ.

### 3.10. Cổng công cụ

Giữ nguyên cổng công cụ hiện có của M29 — **không xây cổng thứ hai**. Kiến trúc này chỉ bổ sung yêu cầu về khai báo công cụ:

```json
{
  "tool": "equipment.search",
  "permission": "equipment.read",
  "input_schema": {},
  "output_schema": {},
  "requires_confirmation": false
}
```

Thứ tự kiểm tra của cổng đã được ETV.P29 §5.4.2 quy định: tác tử có AIA hợp lệ → công cụ đang hiệu lực → người dùng có quyền tương ứng mức quyền hành động → rào chắn áp dụng → mới thực hiện. Từ chối phải trả mã lỗi **và** mã nhật ký suy luận.

### 3.11. Bằng chứng và Cổng bằng chứng

**a) Chuẩn hoá bằng chứng.** Mọi kết quả từ truy hồi tài liệu, truy vấn dữ liệu, giao diện lập trình hay công cụ đều quy về một dạng trước khi đi tiếp:

```json
{ "evidence_id": "EV001", "type": "database",
  "source": "vw_ai_equipment_calibration", "record_id": "EQ001",
  "confidence": 1.0, "payload": {} }

{ "evidence_id": "EV002", "type": "document",
  "document_id": "ETV.P29", "page": 12, "section": "5.4.2",
  "retrieval_score": 0.91 }
```

**b) Cổng bằng chứng là cổng chặn cứng đặt TRƯỚC khi gọi mô hình:**

```text
Bằng chứng → nguồn hợp lệ? → người dùng có quyền? → đúng phạm vi tổ chức?
           → đủ độ tin cậy? → các bằng chứng có mâu thuẫn nhau không?  → ĐẠT / KHÔNG ĐẠT
```

Không đạt ⇒ **không gọi mô hình**. Không có ngoại lệ "cứ hỏi thử xem nó trả lời gì".

**c) Câu trả lời dự phòng — phân biệt 5 trường hợp, không dùng một câu chung.** Một câu dự phòng duy nhất khiến người dùng không biết nên sửa câu hỏi, xin quyền hay báo sự cố:

| Mã | Nội dung trả về |
| --- | --- |
| `NO_DATA` | Không tìm thấy dữ liệu phù hợp với yêu cầu. |
| `INSUFFICIENT_EVIDENCE` | Chưa đủ căn cứ để kết luận. |
| `LOW_CONFIDENCE` | Hệ thống chưa đủ chắc chắn để trả lời chính xác. |
| `ACCESS_DENIED` | Bạn không có quyền truy cập dữ liệu này. |
| `SOURCE_ERROR` | Nguồn dữ liệu hiện không khả dụng. |

Mã dự phòng được ghi vào nhật ký suy luận và là đầu vào của việc phân loại lỗi tại §3.14.

### 3.12. Dựng ngữ cảnh, định tuyến mô hình và lời nhắc hệ thống

**a) Dựng ngữ cảnh** chỉ cấp cho mô hình: lời nhắc hệ thống · câu hỏi của người dùng · diễn giải ngữ nghĩa · bằng chứng đã qua cổng · quy tắc nghiệp vụ cần thiết · siêu dữ liệu trích dẫn. **Không** đưa toàn bộ lược đồ cơ sở dữ liệu, không đưa toàn văn tài liệu.

**b) Định tuyến mô hình** phải có trong kiến trúc ngay từ đầu, nhưng **không bắt buộc** triển khai nhiều mô hình ở Giai đoạn 1:

| Nhóm tác vụ | Định hướng |
| --- | --- |
| Nhận diện ý định, bóc tách thực thể, viết lại truy vấn, phân loại, tóm tắt, chọn công cụ đơn giản, trả lời dựa trên bằng chứng rõ ràng | Mô hình cục bộ mặc định (ETV.GAI 01) |
| Suy luận nhiều bước, truy vấn phức tạp, nhiều công cụ, xử lý mâu thuẫn bằng chứng, phân tích dài, trường hợp độ tin cậy thấp | Có thể định tuyến sang mô hình mạnh hơn khi có |

Việc định tuyến bị chặn trên bởi ranh giới dữ liệu của từng nền tảng (`AIPlatform.dataBoundary`, ETV.GAI 01 §3.7): tác vụ chạm dữ liệu mức Nội bộ **không** được định tuyến sang nền tảng chỉ được nhận mức Công khai, kể cả khi nền tảng đó cho kết quả tốt hơn.

**c) Lời nhắc hệ thống chuẩn.** Quản lý bằng `AIPromptVersion` theo ETV.P29 §5.4.1 — mỗi tác tử tại một thời điểm chỉ có một phiên bản đang áp dụng; sửa bản đang áp dụng phải tạo phiên bản mới:

```text
Bạn là trợ lý AI của hệ sinh thái ManLab. Nhiệm vụ của bạn là đưa ra câu trả lời
chính xác, có căn cứ và ngắn gọn, dựa trên bằng chứng được hệ thống cung cấp.

QUY TẮC BẮT BUỘC:
1.  Không bịa dữ liệu nghiệp vụ.
2.  Không bịa bảng, cột hay bản ghi cơ sở dữ liệu.
3.  Không bịa thủ tục, quy định hay quy tắc nghiệp vụ.
4.  Không giả định giá trị còn thiếu.
5.  Bằng chứng được cung cấp là nguồn đúng duy nhất.
6.  Phân biệt rõ dữ liệu hệ thống, quy tắc nghiệp vụ, tài liệu và kiến thức chung.
7.  Không đủ bằng chứng thì không suy đoán câu trả lời.
8.  Tôn trọng quyền của người dùng và phạm vi tổ chức.
9.  Chỉ dùng công cụ khi hệ thống cho phép.
10. Không sinh câu lệnh truy vấn tự do.
11. Không khẳng định một hành động đã thành công nếu kết quả công cụ chưa xác nhận.
12. Khi có nguồn, phải trích dẫn nguồn.
13. Ưu tiên trả lời ngắn gọn, đúng sự thật.
14. Không kết luận về kết quả đo, hiệu chuẩn, thử nghiệm và không phê duyệt bất kỳ
    hồ sơ, chứng chỉ hay tài liệu nào (ETV.P29 §5.1.5).

Dịch vụ tri thức và ngữ nghĩa là nguồn đúng về ý nghĩa nghiệp vụ.
Kết quả từ cơ sở dữ liệu, giao diện lập trình và công cụ là nguồn đúng về dữ liệu
vận hành hiện thời.
```

> Điểm 14 là bổ sung của Viện so với đặc tả gốc — điều cấm tuyệt đối tại ETV.P29 §5.1.5 phải xuất hiện ngay trong lời nhắc, không chỉ nằm ở tầng cổng.

### 3.13. Kiểm chứng câu trả lời

Bộ kiểm chứng đứng **sau** mô hình, đối chiếu câu trả lời nháp với chính bằng chứng đã cấp:

```text
Câu trả lời nháp + bằng chứng
    → nhất quán về sự kiện → nhất quán về con số
    → nhất quán về thực thể → nhất quán về trích dẫn  → ĐẠT / BÁC BỎ
```

Không nhất thiết dùng mô hình để kiểm chứng. Thứ tự ưu tiên: **quy tắc → kiểm tra tất định → mô hình nhẹ → mô hình suy luận nếu thật sự cần**. Con số trong câu trả lời phải trùng con số trong bằng chứng; trích dẫn phải trỏ tới tài liệu và mục có thật trong tập bằng chứng đã cấp.

Bị bác bỏ ⇒ trả câu dự phòng, **không** trả câu trả lời chưa kiểm chứng kèm lời cảnh báo.

### 3.14. Bộ câu hỏi vàng và đánh giá

**Cơ cấu hồ sơ theo biểu mẫu đã ban hành, không theo cơ cấu của đặc tả gốc.** ETV.P.F29.03 quy định 7 nhóm kiểm thử, trong đó các nhóm 3, 4, 5, 7 **bắt buộc đạt**; tự dựng một cơ cấu song song thì kết quả chạy ra không điền được vào phiếu và Cổng triển khai (ETV.P29 §5.3.2) mất căn cứ. Do đó:

- **Cơ cấu hồ sơ** = 7 nhóm của F29.03 — giữ nguyên;
- **Các loại câu hỏi** của đặc tả gốc trở thành **chiều lấy mẫu bên trong** từng nhóm, bảo đảm bộ kiểm thử phủ đủ tình huống: tra dữ liệu · hỏi–đáp tài liệu · quy tắc nghiệp vụ · tính toán · báo cáo · hỗn hợp dữ liệu + tài liệu · nhiều bước · câu hỏi mơ hồ · thiếu dữ liệu · không có quyền · lời nhắc độc hại · tiêm lệnh · hành động không được hỗ trợ · ngoài phạm vi.

**Quy mô tối thiểu:** Giai đoạn 1 ≥ 300 câu; Giai đoạn 2 từ 500 đến 1.000 câu; Giai đoạn 3 ≥ 1.000 câu kèm bộ kiểm hồi quy.

**Cấu trúc một ca kiểm thử:**

```json
{ "id": "GOLD-001",
  "question": "Thiết bị nào hết hạn hiệu chuẩn trong 30 ngày?",
  "expected_intent": "equipment.calibration.expiring",
  "expected_entities": ["ThietBi", "HieuChuan"],
  "expected_source": "structured_data",
  "expected_tool": "equipment.search",
  "expected_behavior": "trả về danh sách thiết bị khớp điều kiện",
  "nhom_f29_03": 1 }
```

**Đo từng chặng, không chỉ đo câu trả lời cuối:** độ chính xác ý định → thực thể → ngữ nghĩa → định tuyến → truy hồi → truy vấn/công cụ → bằng chứng → tính đúng của câu trả lời → mức bám bằng chứng.

**Phân loại lỗi bắt buộc** cho mỗi câu sai, để biết chính xác hỏng ở chặng nào: `INTENT_ERROR` · `ENTITY_ERROR` · `SEMANTIC_MAPPING_ERROR` · `RETRIEVAL_ERROR` · `RERANK_ERROR` · `SQL_GENERATION_ERROR` · `SQL_GUARD_ERROR` · `TOOL_SELECTION_ERROR` · `DATA_ERROR` · `GROUNDING_ERROR` · `LLM_REASONING_ERROR` · `ANSWER_FORMAT_ERROR` · `PERMISSION_ERROR`.

**Ranh giới không được vượt (ETV.P29 §4.8):** trình chạy đánh giá chỉ **đo và điền số liệu**; ô Kết luận Đạt/Không đạt của F29.03 do người có thẩm quyền ký. Hiện trạng đã làm đúng như vậy — giữ nguyên khi mở rộng bộ câu hỏi.

**Dữ liệu dùng để kiểm thử:** nghiêm cấm dùng dữ liệu thật của khách hàng khi chưa ẩn danh hoặc chưa được LĐV phê duyệt (ETV.P29 §5.5).

### 3.15. Lược đồ dữ liệu logic

Tầng tri thức–ngữ nghĩa cần tối thiểu các nhóm bảng sau. **Chỉ bổ sung những gì M29 chưa có** — đối chiếu §3.3 trước khi tạo bảng mới:

| Nhóm | Bảng | Đã có ở M29? |
| --- | --- | --- |
| Từ vựng nghiệp vụ | `ai_business_term`, `ai_term_synonym` | Chưa |
| Mô hình nghiệp vụ | `ai_business_entity`, `ai_entity_attribute`, `ai_entity_relationship`, `ai_business_rule` | Chưa |
| Ánh xạ ngữ nghĩa | `ai_semantic_mapping`, `ai_semantic_source`, `ai_intent`, `ai_intent_example` | Chưa |
| Tri thức | `ai_knowledge_source`, `ai_document`, `ai_document_chunk` | Một phần — `CopilotDocChunk` |
| Công cụ | `ai_tool`, `ai_tool_parameter`, `ai_tool_permission` | **Đã có** — `AITool` |
| Nhật ký | `ai_query_log`, `ai_route_log`, `ai_retrieval_log`, `ai_sql_log`, `ai_tool_log`, `ai_answer_log` | Một phần — `AIRequest`, `AIToolCall`; các chặng còn lại bổ sung dưới dạng trường/bảng con của `AIRequest`, **không** dựng hệ nhật ký thứ hai |
| Bằng chứng | `ai_evidence` | Chưa |
| Đánh giá | `ai_evaluation_case`, `ai_evaluation_run`, `ai_evaluation_result` | **Đã có** — `AIEvaluationSuite/Case/Run` |

Trường dùng chung khi phù hợp: phạm vi tổ chức · lần ban hành · trạng thái · hiệu lực từ · hiệu lực đến · thời điểm tạo · thời điểm cập nhật · người tạo.

### 3.16. An ninh, ranh giới dữ liệu và chống tiêm lệnh

**a) Mọi lượt gọi AI phải mang đủ ngữ cảnh phân quyền**: định danh người dùng · phạm vi tổ chức · vai trò · quyền. Phân quyền cưỡng chế ở tầng ứng dụng/dịch vụ. **Không** để mô hình quyết định phân quyền và **không** coi câu chữ trong lời nhắc là biện pháp cách ly.

**b) Cách ly phạm vi**: mọi truy vấn phải được backend gắn điều kiện phạm vi tổ chức. Xem thêm §3.18 điểm 2 về hiện trạng ManLab AIOS.

**c) Chống tiêm lệnh.** Mọi nội dung đến từ PDF, Word, trang web, trường văn bản trong cơ sở dữ liệu và tệp người dùng tải lên đều là **nội dung không tin cậy**. Không cho nội dung đó ghi đè: lời nhắc hệ thống · phân quyền · quyền công cụ · chính sách truy vấn. Đây đồng thời là nhóm kiểm thử **bắt buộc đạt** của F29.03 và là yêu cầu của ETV.P29 §5.3.1.

**d) Bí mật xác thực**: khoá truy cập không bao giờ xuất hiện trong lời nhắc, đầu ra, nhật ký suy luận, giao diện hay báo cáo (ETV.P29 §5.4.4). Hiện trạng đã làm đúng: cơ sở dữ liệu chỉ giữ **tên** biến môi trường, không giữ khoá.

**e) Điều cấm tuyệt đối** tại ETV.P29 §5.1.5 áp cho mọi năng lực xây theo hướng dẫn này, không có ngoại lệ kỹ thuật.

### 3.17. Nhật ký, giám sát và mục tiêu hiệu năng

**a) Mỗi giao dịch AI phải ghi**: câu hỏi · người dùng · phạm vi tổ chức · ý định · thực thể · đường định tuyến · bằng chứng đã truy hồi · câu lệnh truy vấn đã sinh · công cụ đã gọi · mô hình · phiên bản lời nhắc · câu trả lời · độ trễ · số token · độ tin cậy · kết quả kiểm chứng. Thời hạn lưu theo ETV.P29 §9.

**b) Giám sát tối thiểu**: số yêu cầu/phút · thời gian tới token đầu tiên · tổng độ trễ · token/giây · token vào/ra · mức dùng GPU và VRAM · độ dài hàng đợi · độ trễ truy hồi · độ trễ truy vấn dữ liệu · độ trễ công cụ · tỷ lệ lỗi · tỷ lệ rơi vào câu dự phòng · tỷ lệ trả lời không bám bằng chứng.

**c) Mục tiêu trải nghiệm ban đầu** (là **mục tiêu**, chưa phải cam kết mức dịch vụ — chỉ trở thành cam kết sau khi đo thực tế trên hạ tầng của Viện):

| Loại thao tác | Mục tiêu |
| --- | ---: |
| Hiểu câu hỏi và phân giải ngữ nghĩa | < 1 s |
| Tra dữ liệu đơn giản | < 2 s |
| Truy hồi tài liệu | < 2 s |
| Token phản hồi đầu tiên | 3–5 s |
| Hỏi–đáp đơn giản | < 8 s |
| Câu hỏi hỗn hợp phức tạp | < 15 s |

### 3.18. Ba điểm của đặc tả gốc lệch hiện trạng — phải chốt trước khi áp dụng

Ba điểm dưới đây **không** phải lỗi của đặc tả gốc; chúng phản ánh việc đặc tả viết cho cả hệ sinh thái, còn ManLab AIOS hiện tại chưa ở trạng thái đó. Người triển khai phải chốt từng điểm, **không** chép nguyên văn.

| # | Điểm lệch | Hiện trạng đo được | Việc phải làm |
| --- | --- | --- | --- |
| 1 | Đặc tả gốc viết cấm mô hình truy cập thẳng **SQL Server** | ManLab AIOS chạy **PostgreSQL** qua Prisma (`prisma/schema.prisma`) | Nguyên tắc giữ nguyên, tên hệ quản trị viết theo từng hệ thống đích. Bộ phân tích cú pháp của Cổng SQL phải chọn theo phương ngữ thật của hệ thống đích, không giả định một loại duy nhất |
| 2 | Đặc tả gốc bắt buộc `tenant_id`/`organization_id` ở mọi tầng | Lược đồ ManLab AIOS **không có trường tenant nào**; ranh giới hiện hành là `AIPlatform` + `AIPlatform.dataBoundary` | Trước khi hiện thực, chốt: (a) ManLab AIOS có trở thành đa tổ chức không, hay (b) ràng buộc phạm vi tiếp tục thể hiện bằng nền tảng + ranh giới dữ liệu + phân quyền theo module. Không tự thêm cột `tenant_id` khi chưa có quyết định — thêm nửa vời còn nguy hơn không có, vì tạo cảm giác đã cách ly |
| 3 | Đặc tả gốc lấy mốc "độ chính xác hiện tại khoảng **56%**" | Trong kho không có hồ sơ đo nào ra con số này; phép đo duy nhất đang chạy là bộ câu hỏi vàng theo F29.03 | Trước khi dùng 56% làm mốc so sánh, phải có **một lần chạy đánh giá được ghi nhận** trên bộ câu hỏi vàng, ghi rõ phạm vi đo, mô hình, phiên bản lời nhắc và ngày đo (F29.03). Không xây kế hoạch cải thiện trên một con số không truy được nguồn |

### 3.19. Lộ trình và chỉ tiêu chất lượng

**Thứ tự triển khai đề xuất** (làm đúng thứ tự này thì mỗi bước sau đều có chỗ dựa đo được):

```text
 1 Cổng AI dùng chung          10 Dịch vụ tri thức
 2 Nhật ký truy vấn            11 Truy hồi tài liệu
 3 Bộ câu hỏi vàng             12 Xếp hạng lại
 4 Từ điển nghiệp vụ           13 Cổng công cụ
 5 Sổ đăng ký ý định           14 Dịch vụ bằng chứng
 6 Sổ đăng ký ngữ nghĩa        15 Cổng bằng chứng
 7 Đầu ra có cấu trúc          16 Kiểm chứng câu trả lời
 8 Dịch vụ truy vấn dữ liệu    17 Định tuyến mô hình
 9 Cổng SQL                    18 Bảng theo dõi đánh giá
```

**Ba giai đoạn:**

| Giai đoạn | Trọng tâm | Kết quả cần đạt |
| --- | --- | --- |
| **1 — Nền móng** | Từ điển nghiệp vụ, từ điển dữ liệu, 20–30 ý định, sổ đăng ký ngữ nghĩa, đầu ra có cấu trúc, nhật ký truy vấn, lời nhắc hệ thống, bộ câu hỏi vàng ≥ 300 câu | Có mốc đo được, biết lỗi nằm ở chặng nào |
| **2 — Có căn cứ** | Dịch vụ tri thức, truy hồi tài liệu, nạp OCR/bảng biểu, tìm kiếm lai, xếp hạng lại, Cổng SQL, dịch vụ và cổng bằng chứng, kiểm chứng câu trả lời, bộ câu hỏi 500–1.000 | Câu trả lời nghiệp vụ đều truy ngược được về nguồn |
| **3 — Doanh nghiệp** | Ontology, lập kế hoạch nhiều bước, định tuyến mô hình, kiểm chứng nâng cao, kiểm hồi quy, phân tích phản hồi tự động, tối ưu hiệu năng, mở rộng GPU nếu phép đo yêu cầu | Ổn định trên phạm vi nghiệp vụ đã chuẩn hoá |

**Chỉ tiêu chất lượng** — đo **trên bộ câu hỏi vàng của chính Viện**, không phải chỉ số công bố của nhà phát hành mô hình:

| Chỉ tiêu | GĐ 1 | GĐ 2 | GĐ 3 |
| --- | ---: | ---: | ---: |
| Độ chính xác ý định | ≥ 80% | ≥ 90% | ≥ 95% |
| Độ chính xác thực thể | ≥ 80% | ≥ 90% | ≥ 95% |
| Độ bao phủ truy hồi (Recall@5) | ≥ 75% | ≥ 90% | ≥ 95% |
| Độ chính xác chọn công cụ | ≥ 75% | ≥ 90% | ≥ 95% |
| Truy vấn dữ liệu chạy đúng | ≥ 70% | ≥ 85% | ≥ 95% |
| Câu trả lời đúng | ≥ 70% | ≥ 85% | ≥ 90% |
| Câu trả lời bám bằng chứng | ≥ 80% | ≥ 95% | ≥ 98% |
| Tỷ lệ bịa | < 10% | < 5% | < 2% |

Các mức ≥ 90–95% chỉ áp cho phần nghiệp vụ **đã chuẩn hoá**: ý định đã định nghĩa, thực thể đã chuẩn hoá, ánh xạ ngữ nghĩa đã thiết lập, công cụ đã đăng ký, nguồn dữ liệu có chất lượng, và câu hỏi nằm trong phạm vi bộ câu hỏi vàng. Ngoài phạm vi đó, chỉ tiêu không có ý nghĩa.

**Về tinh chỉnh mô hình.** Thứ tự ưu tiên: chất lượng dữ liệu → từ điển nghiệp vụ → tầng ngữ nghĩa → đầu ra có cấu trúc → truy hồi → xếp hạng lại → truy vấn/công cụ → lời nhắc → đánh giá → **tinh chỉnh nếu vẫn cần**. Nghiêm cấm tinh chỉnh trên dữ liệu vận hành (khách hàng, thiết bị, hợp đồng, giá, trạng thái, dữ liệu thời gian thực, quy định hay thay đổi) — dữ liệu vận hành thay đổi, còn trọng số mô hình thì không, và trọng số đã học rồi không gỡ ra được. Chỉ xem xét tinh chỉnh cho: ý định đặc thù, thuật ngữ, phân loại, chọn công cụ, văn phong đầu ra, mẫu nghiệp vụ ổn định. Việc tinh chỉnh làm thay đổi hệ thống AI ⇒ đi theo ETV.P29 §5.8 và đánh giá lại theo §5.3.3.

### 3.20. Tiêu chí nghiệm thu

Chỉ đánh dấu hoàn thành một năng lực AI xây theo hướng dẫn này khi **toàn bộ** các mục sau đạt:

- [ ] **AC-01 — Không bịa.** Không có bản ghi tương ứng thì AI không tạo ra bản ghi giả.
- [ ] **AC-02 — Từ điển nghiệp vụ.** Viết tắt nghiệp vụ được phân giải đúng về thuật ngữ chuẩn.
- [ ] **AC-03 — Ánh xạ ngữ nghĩa.** Câu hỏi nghiệp vụ điển hình cho ra đúng ý định đã đăng ký.
- [ ] **AC-04 — Lược đồ chưa biết.** Sổ đăng ký ngữ nghĩa không có ánh xạ thì AI không tự tạo bảng/cột.
- [ ] **AC-05 — An ninh truy vấn.** Câu lệnh không hợp chính sách bị Cổng SQL từ chối.
- [ ] **AC-06 — Tải truy vấn.** Truy vấn vượt số dòng, thời gian chờ hoặc độ phức tạp bị từ chối hoặc viết lại.
- [ ] **AC-07 — Phạm vi.** Người dùng thuộc một phạm vi tổ chức không bao giờ nhận dữ liệu của phạm vi khác.
- [ ] **AC-08 — Cổng bằng chứng.** Bằng chứng không hợp lệ thì không gọi mô hình để đoán.
- [ ] **AC-09 — Đầu ra có cấu trúc.** Bước hiểu câu hỏi trả về đối tượng kiểm tra được theo lược đồ.
- [ ] **AC-10 — Quyền công cụ.** Yêu cầu hành động không có quyền bị cổng công cụ từ chối, kèm mã lỗi và mã nhật ký suy luận.
- [ ] **AC-11 — Truy ngược bằng chứng.** Mọi số liệu trong câu trả lời truy ngược được về cơ sở dữ liệu, giao diện lập trình, tài liệu hoặc kết quả công cụ.
- [ ] **AC-12 — Nhất quán số liệu.** Con số trong câu trả lời trùng con số trong bằng chứng.
- [ ] **AC-13 — Mức bảo mật.** Không có đoạn tài liệu mức Hạn chế/Mật nào lọt vào chỉ mục hay ngữ cảnh; tài liệu hết hiệu lực bị gỡ khỏi chỉ mục trong cùng giao dịch (ETV.P29 §5.5).
- [ ] **AC-14 — Hồ sơ thủ tục.** Đã có bản ghi F29.01, hồ sơ AIA F29.02 đã phê duyệt, báo cáo F29.03 có kết luận Đạt do người có thẩm quyền ký; nguồn dữ liệu đã đăng ký F34.01 và được phê duyệt khai thác F34.03.
- [ ] **AC-15 — Nền tảng mô hình.** Nền tảng mô hình phục vụ năng lực này đã qua đủ Bước 1–6 của ETV.GAI 01 và có ranh giới dữ liệu đặt đúng.

**Định nghĩa hoàn thành:** một câu hỏi nghiệp vụ thật đi trọn vòng `người dùng → hiểu câu hỏi → phân giải ngữ nghĩa → định tuyến → truy hồi/truy vấn có kiểm soát → bằng chứng → cổng bằng chứng → mô hình → kiểm chứng → câu trả lời có trích dẫn → nhật ký/chi phí/đánh giá`; và khi cố tình hỏi một câu **không có căn cứ trong hệ thống**, năng lực đó trả đúng một trong năm câu dự phòng tại §3.11 thay vì trả lời trôi chảy mà không nguồn.

---

## 4. BIỂU MẪU LIÊN QUAN

Hướng dẫn này **không lập biểu mẫu mới** — dùng lại toàn bộ biểu mẫu đã ban hành:

| Biểu mẫu | Dùng ở mục |
| --- | --- |
| ETV.P.F 29.01 — Danh mục hệ thống trí tuệ nhân tạo | §3.20 AC-14 |
| ETV.P.F 29.02 — Phiếu đánh giá tác động AI (AIA) | §3.8c, §3.20 AC-14 |
| ETV.P.F 29.03 — Phiếu kiểm thử và đánh giá chất lượng hệ thống AI | §3.14, §3.19, §3.20 AC-14 |
| ETV.P.F 29.04 — Phiếu sự cố trí tuệ nhân tạo | §3.16, §3.17 |
| ETV.P.F 26.01 — Danh mục tri thức tổ chức | §3.6a, §3.8c |
| ETV.P.F 34.01 — Danh mục dữ liệu số, từ điển dữ liệu | §3.6b, §3.20 AC-14 |
| ETV.P.F 34.03 — Phiếu khai thác, chia sẻ dữ liệu | §3.6b, §3.20 AC-14 |
| ETV.P.F 35.01 — Danh mục nền tảng số | §3.12b, §3.20 AC-15 |
| ETV.P.F 28.01 — Hồ sơ đánh giá và xử lý rủi ro ATTT | §3.16 |

---

*(Chân trang bắt buộc khi in: mã số | lần ban hành | ngày ban hành | ngày soát xét | trang/tổng số trang)*
