# M14 — Mô hình dữ liệu

## Thực thể chính

| Thực thể | Ý nghĩa | Khóa/Quan hệ chính |
|---|---|---|
| `Document` | Văn bản/tài liệu, mọi loại kể cả hành chính (không gồm hợp đồng — thuộc P03/P07) | PK `id` (mã ETV.*); FK `owner_id`, `department_id`, `process_code` (→MPxx) |
| `DocumentVersion` | Phiên bản/lần ban hành của `Document` | FK `document_id`; self-FK `supersedes_id` |
| `Permission` | Nhóm quyền theo tài khoản | định nghĩa gốc tại `ETV.P.F 14.06`; FK từ `Document.permission_id` |
| `RetentionSchedule` | Thời hạn lưu theo loại hồ sơ | định nghĩa gốc tại `ETV.P.F 14.06`; FK từ `Document.retention_id` |
| `Embedding` | Vector tìm kiếm ngữ nghĩa | FK `document_id`; sinh tự động (← 08_KNOWLEDGE_GRAPH/09_Embedding) |
| `AuditLog` | Nhật ký thao tác | FK `document_id`; append-only: `actor, action, from_status, to_status, reason, ts` |

## Ràng buộc

- `UNIQUE(Document.id)` toàn hệ thống; định dạng theo `ETV.P14` §6.2.
- `Document.supersedes_id` và `Document.superseded_by_id` là cặp nghịch đảo, hệ thống tự đồng bộ hai chiều khi ghi một chiều.
- `Document.status` phải thuộc tập giá trị của `07_Workflow/StateMachine.md`.
- `Document.permission_id` và `Document.retention_id` bắt buộc trỏ tới bản ghi tồn tại trong `ETV.P.F 14.06` — không cho nhập tự do (tránh hai nguồn sự thật).
- `AuditLog` append-only, không cho `UPDATE`/`DELETE`.
