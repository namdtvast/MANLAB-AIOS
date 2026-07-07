# Ví dụ — Khối metadata đã điền đầy đủ

> Minh hoạ cách điền khối YAML tại `knowledge/04_metadata_schema.md` cho một Thủ tục thật (chính ETV.P14).

```yaml
id: ETV.P14
title: "Thủ tục Kiểm soát tài liệu, dữ liệu, thông tin"
type: Thu-tuc
owner: "LĐP phụ trách Hệ thống quản lý"
department: "Toàn Viện"
process: MP14_TaiLieu
effective_date: "2026-07-15"
revision: "03"
status: Da-phe-duyet
keywords: [kiểm soát tài liệu, chữ ký số, ManLab]
related_documents: [ETV.QM, ETV.P15, ETV.P07]
iso_clause: ["ISO/IEC 17025:2017 §8.3", "ISO 9001:2015 §7.5"]
legal_basis: ["Nghị định 30/2020/NĐ-CP", "Luật GDĐT 20/2023/QH15"]
ai_tags: [document-control, rbac]
knowledge_category: Noi-bo
permission: "LĐV,LĐP,Nhân viên"
retention: "Vĩnh viễn (bản hiện hành)"
digital_signature: "LĐV"
source: "ETV"
supersedes: "ETV.P14 lần ban hành 02"
superseded_by: null
```

## Nhận xét mẫu

- `status: Da-phe-duyet` chỉ được đặt **sau khi** LĐV đã ký duyệt — trước đó luôn là `Nhap`/`Cho-soat-xet`/`Cho-phe-duyet`.
- `iso_clause` ghi rõ điều khoản, không ghi chung "ISO 17025".
- `supersedes` trỏ đúng bản cũ; khi ban hành xong, bản cũ phải được cập nhật `superseded_by = ETV.P14 (rev 03)`.
