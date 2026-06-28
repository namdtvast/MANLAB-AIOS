# M36 — Mô hình dữ liệu

## Thực thể lõi
| Thực thể | Ý nghĩa | Khóa/Quan hệ chính |
|---|---|---|
| `Certificate` | Chứng chỉ DCC/DVC/DTC | PK `id`; UNIQUE `cert_no`; FK customer/instrument/org/method |
| `MeasurementResult` | Kết quả đo có cấu trúc | FK `certificate_id`; gồm `quantity, value, unit, uncertainty` |
| `Instrument` | Phương tiện đo/đối tượng đo | PK `id` |
| `Customer` | Khách hàng/chủ sở hữu | PK `id` (← M07/Master Data) |
| `Organization` | Tổ chức thực hiện (ETV) | PK `id` |
| `ReferenceStandard` | Chuẩn/chất chuẩn sử dụng | n–n với Certificate (← M05) |
| `Method` | Phương pháp áp dụng | FK (← M08) |
| `Signature` | Chữ ký số/xác thực | FK `certificate_id` |
| `QRLookup` | Token tra cứu công khai | UNIQUE `qr_token` |
| `Version` | Phiên bản/thay thế | self-FK `replaces_id` |
| `AuditLog` | Nhật ký thao tác | FK `certificate_id`; `actor, action, from_status, to_status, reason, ts` |

## Ràng buộc
- `UNIQUE(cert_no)` toàn hệ thống.
- `MeasurementResult.uncertainty NOT NULL` khi phép đo là định lượng.
- `Certificate.replaces_id` trỏ tới bản gốc khi là chứng chỉ thay thế.
- Bản ghi `AuditLog` chỉ thêm (append-only), không sửa/xóa.
