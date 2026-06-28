# M07_HopDong — Mô hình dữ liệu

> Khung mẫu (template) — cập nhật nội dung cụ thể cho module. Xem M36_ChungChiSo làm ví dụ đã hoàn chỉnh.

## Thực thể chính
| Thực thể | Ý nghĩa | Khóa/Quan hệ |
|---|---|---|
| `HopDong` | Yêu cầu, báo giá, hợp đồng | PK `id`; FK (cập nhật) |
| `AuditLog` | Nhật ký thao tác | FK `hopdong_id`; append-only |

## Ràng buộc
- (cập nhật) — khóa duy nhất, trường NOT NULL, quan hệ tới module khác.
