# M34_DuLieuSo — Mô hình dữ liệu

> Khung mẫu (template) — cập nhật nội dung cụ thể cho module. Xem M36_ChungChiSo làm ví dụ đã hoàn chỉnh.

## Thực thể chính
| Thực thể | Ý nghĩa | Khóa/Quan hệ |
|---|---|---|
| `DuLieuSo` | Danh mục dữ liệu số | PK `id`; FK (cập nhật) |
| `AuditLog` | Nhật ký thao tác | FK `dulieuso_id`; append-only |

## Ràng buộc
- (cập nhật) — khóa duy nhất, trường NOT NULL, quan hệ tới module khác.
