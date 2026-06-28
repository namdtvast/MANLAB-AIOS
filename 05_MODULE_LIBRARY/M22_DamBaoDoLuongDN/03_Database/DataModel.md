# M22_DamBaoDoLuongDN — Mô hình dữ liệu

> Khung mẫu (template) — cập nhật nội dung cụ thể cho module. Xem M36_ChungChiSo làm ví dụ đã hoàn chỉnh.

## Thực thể chính
| Thực thể | Ý nghĩa | Khóa/Quan hệ |
|---|---|---|
| `DamBaoDoLuongDN` | Chương trình đảm bảo đo lường DN | PK `id`; FK (cập nhật) |
| `AuditLog` | Nhật ký thao tác | FK `dambaodoluongdn_id`; append-only |

## Ràng buộc
- (cập nhật) — khóa duy nhất, trường NOT NULL, quan hệ tới module khác.
