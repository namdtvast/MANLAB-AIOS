# 08 — KNOWLEDGE GRAPH ⭐ (Lớp tri thức & nguồn tham khảo)

**Ý nghĩa:** Tầng này là **kho tri thức dùng chung** của toàn bộ hệ thống — chứa luật pháp, tiêu chuẩn, quy định, thuật ngữ, ontology, FAQ, case study, bài học kinh nghiệm và embedding cho RAG. Tầng 08 cung cấp **ngữ cảnh tri thức** cho AI OS (Tầng 07) và **bằng chứ pháp lý/kỹ thuật** cho Tuân thủ (Tầng 11).

---

## Cấu trúc thư mục (5 thư mục chính + mở rộng)

| Thư mục | Lưu gì | Đối tượng chính |
|---|---|---|
| `00_RAW_DATA/` | Tài liệu thô chưa phân loại (PDF, Word, ảnh) — kho tạm để xử lý trước | Đầu vào |
| `01_Regulations/` | Văn bản QPPL: Luật, Nghị định, Thông tư, Quyết định từ Chính phủ/Bộ/Sở | Pháp lý quốc gia |
| `02_ISO/` | ISO/IEC 17025, 9001, 27001, 42001, 17034 (hoặc tiêu chuẩn quốc tế khác) | Tiêu chuẩn quốc tế |
| `03_DLVN/` | Đề Xuất Lượng Viễn – Hướng dẫn Đánh giá Độ Không Đảm Bảo Đo Lường | Hướng dẫn kỹ thuật Việt Nam |
| `04_TCVN/` | Tiêu Chuẩn Việt Nam — các TCVN được viện dẫn | Tiêu chuẩn quốc gia |
| `05_ILAC/` (đặt) | ILAC Guidance, Policies, Technical Notes | Công nhận quốc tế |
| `06_Glossary/` (đặt) | Danh mục thuật ngữ, định nghĩa, ontology | Ngữ nghĩa |
| `07_Case_Studies/` (đặt) | FAQ, trường hợp thực tế, bài học kinh nghiệm, lessons learned | Tri thức tích lũy |
| `08_Embedding/` (đặt) | Vector database, embedding cho RAG, chỉ mục đầy đủ | Cơ sở dữ liệu AI |
| `09_Wiki/` | Chỉ mục trung tâm, tóm tắt cấu trúc, bảng tra cứu | Điều hướng |

---

## Phân loại và Nguyên tắc lưu trữ

### Luật pháp (01_Regulations)

| Loại | Ví dụ | Lưu ở |
|---|---|---|
| Luật | Luật Đo lường, Luật An toàn thông tin | `01_Regulations/` |
| Nghị định | ND 30/2020, ND 130/2018 | `01_Regulations/` |
| Thông tư | TT95/2020 (Tài khoản ngân hàng), TT18/2023 (Hóa đơn điện tử) | `01_Regulations/` |
| Quyết định cấp Bộ | QĐ công nhận, chỉ định kiểm định viên | `01_Regulations/` |

→ Định dạng: Markdown hoặc link tới tài liệu gốc, có metadata `[SOURCE]` trích rõ khóa điều, ngày hiệu lực.

### Tiêu chuẩn (02_ISO, 03_DLVN, 04_TCVN)

| Loại | Phạm vi | Lưu ở |
|---|---|---|
| ISO/IEC quốc tế | Gốc tiêu chuẩn, yêu cầu | `02_ISO/` |
| ĐLVN | Hướng dẫn đánh giá độ không đảm bảo | `03_DLVN/` |
| TCVN quốc gia | Tiêu chuẩn do TCVN công bố | `04_TCVN/` |

→ Định dạng: Tóm tắt yêu cầu, ánh xạ tới quy trình MP, đánh dấu `[ISO]` có phiên bản, ngày.

### Tri thức (06_Glossary, 07_Case_Studies)

| Loại | Mục đích | Lưu ở |
|---|---|---|
| Thuật ngữ & Định nghĩa | Từng từ chuẩn hóa được các MP/M sử dụng | `06_Glossary/` |
| Ontology | Mối quan hệ giữa khái niệm (có thể dùng SKOS/OWL) | `06_Glossary/` |
| FAQ | Trả lời câu hỏi phổ biến từ khách hàng/nhân viên | `07_Case_Studies/` |
| Case Study | Ví dụ thực tế, cách xử lý tình huống | `07_Case_Studies/` |
| Lesson Learned | Bài học từ kiểm định/kiểm tra nội bộ | `07_Case_Studies/` |

→ Định dạng: Markdown với tags `[AI-GEN]` nếu AI sinh, `[EVID]` nếu có bằng chứ, `[APPROVED]` nếu được phê duyệt.

---

## Quy tắc "Một Nguồn Sự Thật" (One Source of Truth)

### Không Copy, Chỉ Link

- **ISO/Luật/TCVN:** Lưu **một bản** ở Tầng 08, các quy trình MP/M **link** từ `links.yaml`
- **Thuật ngữ:** Định nghĩa **một lần** ở `06_Glossary/`, các MP tham chiếu bằng liên kết

### Phân Biệt Nguồn

```
[SOURCE]   — Văn bản gốc, không sửa (luật, tiêu chuẩn, định nghĩa chính thức)
[AI-GEN]   — Nội dung AI sinh, cần phê duyệt trước khi trở thành [SOURCE]
[EVID]     — Bằng chứ (hồ sơ, kết quả đánh giá), chỉ link từ [EVID] sang
[APPROVED] — Được người có thẩm quyền xác nhận
```

### Vòng đời Tri Thức

```
00_RAW_DATA (chưa xử lý)
    ↓
Phân loại → 01/02/03/04/... (chuẩn hóa, thêm metadata [SOURCE])
    ↓
06_Glossary / 07_Case_Studies (trích xuất thuật ngữ, định nghĩa)
    ↓
08_Embedding (chỉ mục, embedding cho RAG)
    ↓
Liên kết từ MP/M/AI Skills qua links.yaml
```

---

## Liên kết với các Tầng Khác

### Tầng 03 (Management System) → Tầng 08

| Tầng 03 | Link tới Tầng 08 |
|---|---|
| Policy | ← Định dạng hóa từ Luật/ISO tại 01, 02 |
| Procedure (ETV.P14, P21) | ← Áp dụng yêu cầu ISO/DLVN từ 02, 03 |
| Method (Hiệu chuẩn, KD) | ← Tham khảo ĐLVN, TCVN từ 03, 04 |

### Tầng 04 (Process Library) → Tầng 08

Mỗi `MPxx/links.yaml` chứa:

```yaml
iso:     ../../03_MANAGEMENT_SYSTEM  # cũng trỏ sang 08 qua 03
law:     ../../08_KNOWLEDGE_GRAPH/01_Regulations
glossary: ../../08_KNOWLEDGE_GRAPH/06_Glossary
cases:   ../../08_KNOWLEDGE_GRAPH/07_Case_Studies
```

### Tầng 07 (AI OS) ← Tầng 08 (Phụ thuộc dữ liệu)

- Skills, Prompts, Guardrails của AI OS sử dụng **ngữ cảnh tri thức** từ 08 (FAQ, Case Studies, Glossary) để:
  - Hỗ trợ sinh kết quả đúng
  - Giải thích quyết định
  - Truy hồi (RAG) câu trả lời từ tri thức tích lũy

### Tầng 11 (Compliance) ← Tầng 08

- `11_COMPLIANCE/01_ISO_Mapping/` tham chiếu yêu cầu từ `08/02_ISO/`
- `11_COMPLIANCE/03_Evidence/` trích dẫn từ Luật/ISO tại `08/01, 02`

---

## Không Lưu Gì Ở Đây

| Tài liệu | Lưu Đúng Chỗ | Ghi chú |
|---|---|---|
| Policy, Procedure ETV | → `03_MANAGEMENT_SYSTEM/` | 08 = tham khảo; 03 = kiểm soát nội bộ |
| Hồ sơ, Bằng chứ hoàn thành | → `11_COMPLIANCE/` | 08 = tri thức; 11 = minh chứng |
| Module code, API, Database | → `05_MODULE_LIBRARY/` | 08 = tri thức; 05 = phần mềm |
| Dữ liệu giao dịch (KH, đơn hàng) | → CSDL/ManLab | 08 = không lưu PII |
| Tài liệu vi phạm bản quyền | ❌ Cấm | Chỉ tóm tắt/tham chiếu |

---

## Hướng Dẫn Nhanh — Tự Hỏi Trước Khi Lưu

> **Đây là luật, tiêu chuẩn, định nghĩa hoặc bài học kinh nghiệm được tái sử dụng trong toàn hệ thống không?**
> - Có → lưu ở Tầng 08, link từ nơi khác
> - Không → kiểm tra bảng "Không lưu gì ở đây"

> **Tài liệu này cần phê duyệt hay cập nhật liên tục?**
> - Là Luật/ISO/TCVN chính thức → `[SOURCE]` tại 01/02/03/04, chỉ link
> - Là tóm tắt/hướng dẫn nội bộ → `[APPROVED]` tại 06/07

> **Có thể AI tự động sử dụng nó cho RAG không?**
> - Có → chuẩn hóa metadata, thêm vào `08_Embedding/`
> - Không (PII, mật) → chỉ link có phân quyền, không embed

---

## Tần Suất Cập Nhật

| Loại | Tần suất | Cách quản lý |
|---|---|---|
| Luật/ND/TT mới | Ngay khi có ban hành | Cập nhật vào `01_Regulations/`, thông báo các MP liên quan |
| ISO/DLVN/TCVN | Hằng năm hoặc khi cập nhật tiêu chuẩn | Version control, update `02/03/04/` |
| Glossary, FAQ | Liên tục (mỗi khi phát hiện thuật ngữ mới) | Sync qua `06_Glossary/`, tự động thêm vào RAG |
| Case Study, Lesson Learned | Sau mỗi đánh giá/kiểm định quan trọng | Ghi lại ở `07_Case_Studies/`, link từ MP |
| Embedding & RAG Index | Hằng tuần hoặc tự động sau mỗi thay đổi | Rebuild index từ `08_Embedding/` |

---

## Mô Hình Dữ Liệu Cơ Bản

### Một Nút Tri Thức (Knowledge Node)

```yaml
id: ISO-17025-8.5          # định danh duy nhất
title: "Risk and Opportunity Management"
source: "ISO/IEC 17025:2017, clause 8.5"
version: "2017"
effective_from: "2018-01-01"
scope: "Laboratory"
owner: "QA Officer"
tags: ["risk", "opportunity", "management", "ISO17025"]
mapped_to_process:
  - MP01_RuiRo
  - MP16_DanhGiaNoiBo
status: "[SOURCE]"  # [SOURCE] | [AI-GEN] | [APPROVED]
```

### Liên Kết Tri Thức (Knowledge Link)

```
ISO-17025-8.5
    ├─ Procedure: ETV.P03_RuiRo (Tầng 03)
    ├─ Process: MP01_RuiRo (Tầng 04)
    ├─ Module: M01_RuiRo (Tầng 05)
    ├─ Evidence: CAP-16-2026-NC-001 (Tầng 11)
    └─ AI Skill: Risk Assessment Prompt (Tầng 07)
```

---

## Tản Mạn

- Tầng 08 là **nền tảng tri thức**, không phải kho lưu trữ chung. Mỗi tài liệu phải có **mục đích rõ ràng** và **ít nhất một liên kết đến các MP/M**.
- Không copy tài liệu từ một thư mục sang thư mục khác. Thay vào đó, sử dụng **liên kết và metadata**.
- Luật/Tiêu chuẩn là **chỉ đọc** `[SOURCE]`. Tóm tắt và hướng dẫn áp dụng phải được **phê duyệt** `[APPROVED]`.
- AI OS (Tầng 07) phụ thuộc vào Tầng 08 để có **ngữ cảnh chính xác**, **quy tắc áp dụng**, và **bài học kinh nghiệm**. Không có Tầng 08 → AI sẽ hallucinate.
