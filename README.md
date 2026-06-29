# MANLAB-AIOS — Enterprise Operating System Repository

[![Validate links](https://github.com/namdtvast/MANLAB-AIOS/actions/workflows/validate-links.yml/badge.svg)](https://github.com/namdtvast/MANLAB-AIOS/actions/workflows/validate-links.yml)

> 🌐 **Cổng tra cứu tương tác:** **https://namdtvast.github.io/MANLAB-AIOS/** — duyệt cấu trúc thư mục, mở tài liệu và chia sẻ cho đoàn đánh giá. (Mã nguồn trang: [`docs/`](docs/) · cách bật Pages: [docs/README.md](docs/README.md))

**Viện Kiểm định Công nghệ và Môi trường (ETV)** · Kiến trúc **v4.1**

> Đây không phải kho tài liệu. Đây là **Hệ điều hành doanh nghiệp**.
> Đơn vị nhỏ nhất là **Business Capability (Năng lực nghiệp vụ)**.

## Quy ước đặt tên (mới)
- Thư mục có **mã + tên gọi ngắn** không dấu: `MP01_RuiRo`, `M21_CongBoNangLuc`, `CAP-05_HieuChuan`.
- Thư mục con được **đánh số thứ tự** `01_, 02_, …` để sắp xếp theo đúng logic/độ quan trọng (không bị xếp ABC).

## Bản đồ thư mục — ý nghĩa từng tầng
| Tầng | Trả lời | Lưu gì | KHÔNG lưu |
|---|---|---|---|
| `01_ENTERPRISE` | Vì sao Viện tồn tại | Chiến lược, tổ chức, lộ trình | Quy trình, biểu mẫu, hồ sơ |
| `02_CAPABILITIES` ⭐ | Viện làm được **gì** | Năng lực CAP-xx + link tới MP | Cách làm chi tiết, code |
| `03_MANAGEMENT_SYSTEM` | Theo **luật chơi** nào | Chuẩn mực ISO + ETV.QM | **Quy trình MP**, biểu mẫu |
| `04_PROCESS_LIBRARY` ⭐ | Làm **thế nào** | 38 Hub MP (README+manifest+links) | Thủ tục đầy đủ, bản copy |
| `05_MODULE_LIBRARY` ⭐ | Số hóa **bằng gì** | Đặc tả 38 module | Dữ liệu thật, secrets |
| `06_SHARED_RESOURCES` ⭐ | Tài nguyên **dùng chung** | Biểu mẫu gốc, master data | Hồ sơ đã điền |
| `07_AI_OPERATING_SYSTEM` ⭐ | **AI** vận hành | Skill, Agent, Guardrail, Policy | Dữ liệu mật trong prompt |
| `08_KNOWLEDGE_GRAPH` ⭐ | AI **đọc** ở đâu | QPPL, ISO, ontology, vector | Chuẩn mực kiểm soát (ở 03) |
| `09_ENGINEERING` | **Code** | Backend/Frontend/API/DB | Secrets, dữ liệu sản xuất |
| `10_DEPLOYMENT` | **Vận hành** | Docker/K8s/Backup/DR | Khóa/bí mật thật |
| `11_COMPLIANCE` ⭐ | **Chứng minh** tuân thủ | Mapping, bằng chứng, audit, CAPA | Bản nháp tài liệu |
| `12_RESEARCH` | **Tương lai** | KC4.0, DMC, OCR, paper | Hệ thống vận hành chính thức |

> Chi tiết "Lưu gì / Không lưu / Lưu ý" của **từng thư mục con** nằm trong `README.md` của chính thư mục đó.

## 3 quy ước bất biến
1. **MP/M là Hub** — chỉ `README.md` + `manifest.yaml` + `links.yaml`. **Link, không copy.**
2. **Một nguồn sự thật** — biểu mẫu ở `06`, tiêu chuẩn ở `03`, tri thức ở `08`.
3. **Digital Thread** — `04_PROCESS_LIBRARY/_DIGITAL_THREADS`.

Xem [ARCHITECTURE.md](ARCHITECTURE.md) · [_meta/SCHEMA.md](_meta/SCHEMA.md) · [_meta/INDEX.md](_meta/INDEX.md)
