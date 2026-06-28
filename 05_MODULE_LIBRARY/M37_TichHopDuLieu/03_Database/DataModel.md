# M37_TichHopDuLieu — Mô hình dữ liệu

> Khung mẫu (template) — cập nhật nội dung cụ thể cho module. Xem M36_ChungChiSo làm ví dụ đã hoàn chỉnh.

## Thực thể chính
| Thực thể | Ý nghĩa | Khóa/Quan hệ |
|---|---|---|
| `TichHopDuLieu` | Luồng tích hợp/API | PK `id`; FK (cập nhật) |
| `AuditLog` | Nhật ký thao tác | FK `tichhopdulieu_id`; append-only |

## Ràng buộc
- (cập nhật) — khóa duy nhất, trường NOT NULL, quan hệ tới module khác.
