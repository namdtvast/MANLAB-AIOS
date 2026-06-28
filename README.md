# MANLAB-AIOS — Enterprise Operating System Repository

**Viện Kiểm định Công nghệ và Môi trường (ETV)** · Phiên bản kiến trúc **v4.0**

> Đây không phải kho tài liệu. Đây là **Hệ điều hành doanh nghiệp** (Enterprise Operating System).
> Đơn vị nhỏ nhất của hệ thống là **Business Capability (Năng lực nghiệp vụ)**, không phải tài liệu hay module.

## Mô hình phân rã

```
BUSINESS → CAPABILITY → PROCESS (MPxx) → MODULE (Mxx) → DATA/FORMS/API → AI/WORKFLOW → EVIDENCE/AUDIT
```

## 5 lớp liên kết logic

| Lớp | Ý nghĩa | Tầng vật lý |
|---|---|---|
| 1. Capability Layer | Doanh nghiệp có năng lực gì | `02_CAPABILITIES` |
| 2. Process Layer | MP01–MP38 thực hiện năng lực thế nào | `04_PROCESS_LIBRARY` |
| 3. Application Layer | M01–M38 số hóa từng quy trình | `05_MODULE_LIBRARY` |
| 4. AI Layer | Skill, Harness, Agent, Memory, Prompt | `07_AI_OPERATING_SYSTEM` |
| 5. Compliance Layer | Mọi hoạt động truy xuất được bằng chứng | `11_COMPLIANCE` |

## Nguyên tắc cốt lõi

1. **MP/M là Hub** — chỉ chứa `README.md` + `manifest.yaml` + `links.yaml`. **Link, không copy.**
2. **Một nguồn sự thật (single source of truth)** — biểu mẫu ở `06_SHARED_RESOURCES`, tiêu chuẩn ở `03_MANAGEMENT_SYSTEM`, không nhân bản.
3. **Digital Thread** — mỗi dịch vụ là một chuỗi số xuyên suốt, truy xuất được MP, M, biểu mẫu, hồ sơ, điều khoản ISO, pháp luật và AI Agent đã tham gia. Xem `04_PROCESS_LIBRARY/_DIGITAL_THREADS`.

## 12 tầng

01_ENTERPRISE · 02_CAPABILITIES · 03_MANAGEMENT_SYSTEM · 04_PROCESS_LIBRARY ·
05_MODULE_LIBRARY · 06_SHARED_RESOURCES · 07_AI_OPERATING_SYSTEM · 08_KNOWLEDGE_GRAPH ·
09_ENGINEERING · 10_DEPLOYMENT · 11_COMPLIANCE · 12_RESEARCH

Xem chi tiết tại [ARCHITECTURE.md](ARCHITECTURE.md).
