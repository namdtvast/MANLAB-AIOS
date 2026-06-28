# MANLAB-AIOS — Enterprise Operating System Repository

**Viện Kiểm định Công nghệ và Môi trường (ETV)** · Kiến trúc **v4.0**

> Đây không phải kho tài liệu. Đây là **Hệ điều hành doanh nghiệp**.
> Đơn vị nhỏ nhất của hệ thống là **Business Capability (Năng lực nghiệp vụ)**, không phải tài liệu hay module.

## Mô hình phân rã
```
BUSINESS → CAPABILITY → PROCESS (MPxx) → MODULE (Mxx) → DATA/FORMS/API → AI/WORKFLOW → EVIDENCE/AUDIT
```

## Bản đồ thư mục — ý nghĩa từng tầng

| Tầng | Trả lời câu hỏi | Lưu gì (tóm tắt) | KHÔNG lưu |
|---|---|---|---|
| `01_ENTERPRISE` | Vì sao Viện tồn tại | Chiến lược, tầm nhìn, tổ chức, lộ trình | Quy trình, biểu mẫu, hồ sơ |
| `02_CAPABILITIES` ⭐ | Viện làm được **gì** | Định nghĩa năng lực CAP-xx + link tới MP | Cách làm chi tiết, code |
| `03_MANAGEMENT_SYSTEM` | Theo **luật chơi** nào | Chuẩn mực ISO + Sổ tay ETV.QM | **Quy trình MP**, biểu mẫu, hồ sơ |
| `04_PROCESS_LIBRARY` ⭐ | Làm **thế nào** | 38 Hub MP (README+manifest+links) | Nội dung thủ tục đầy đủ, bản copy biểu mẫu |
| `05_MODULE_LIBRARY` ⭐ | Số hóa **bằng gì** | Đặc tả 38 module M01–M38 | Dữ liệu nghiệp vụ thật, secrets |
| `06_SHARED_RESOURCES` ⭐ | Tài nguyên **dùng chung** | Biểu mẫu gốc, master/reference data | Hồ sơ đã điền, dữ liệu giao dịch |
| `07_AI_OPERATING_SYSTEM` ⭐ | **AI** vận hành ra sao | Skill, Agent, Prompt, Guardrail, Policy | Dữ liệu mật trong prompt, cấu hình tự phê duyệt |
| `08_KNOWLEDGE_GRAPH` ⭐ | AI **đọc** ở đâu | QPPL, ISO, ĐLVN, ontology, vector | Chuẩn mực kiểm soát (ở 03), tài liệu vi phạm bản quyền |
| `09_ENGINEERING` | **Code** ra sao | Backend/Frontend/API/DB/Test | Secrets, dữ liệu sản xuất |
| `10_DEPLOYMENT` | **Vận hành** ra sao | Docker/K8s/Cloud/Backup/DR | Khóa/bí mật thật |
| `11_COMPLIANCE` ⭐ | **Chứng minh** tuân thủ | Mapping ISO/luật, bằng chứng, audit, CAPA, risk | Bản nháp tài liệu hệ thống |
| `12_RESEARCH` | **Tương lai** | KC4.0, DMC, OCR, paper, patent | Hệ thống vận hành chính thức |

> Cột chi tiết "Lưu gì / Không lưu / Lưu ý" của **từng thư mục con** nằm trong `README.md` của chính thư mục đó.

## 3 quy ước bất biến
1. **MP/M là Hub** — `04_PROCESS_LIBRARY/MPxx/` chỉ có `README.md` + `manifest.yaml` + `links.yaml`. **Link, không copy.**
2. **Một nguồn sự thật** — biểu mẫu ở `06`, tiêu chuẩn ở `03`, tri thức ở `08`. Không nhân bản.
3. **Digital Thread** — mỗi dịch vụ là chuỗi số xuyên suốt, định nghĩa tại `04_PROCESS_LIBRARY/_DIGITAL_THREADS`.

## Quy ước đặt tên
`CAP-xx` Năng lực · `MPxx` Quy trình · `Mxx` Module (số hóa MPxx 1–1) · `F-xxx` Biểu mẫu ·
`EV-xxx` Bằng chứng · `SK-xxx` Skill · `AG-xxx` Agent · `DT-xx` Digital Thread.

Xem thêm: [ARCHITECTURE.md](ARCHITECTURE.md) · lược đồ Hub: [_meta/SCHEMA.md](_meta/SCHEMA.md)
