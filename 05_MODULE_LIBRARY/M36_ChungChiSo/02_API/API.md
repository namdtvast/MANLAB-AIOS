# M36 — Đặc tả API (vòng đời chứng chỉ)

> REST, JSON. Mọi thao tác đổi trạng thái đều ghi `AuditLog`. Phân quyền theo vai trò.

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| POST | `/certificates` | Người lập | Tạo chứng chỉ ở trạng thái **Nháp** |
| GET | `/certificates/{id}` | Nội bộ | Xem chi tiết |
| PUT | `/certificates/{id}` | Người lập | Sửa (chỉ khi **Nháp**) |
| POST | `/certificates/{id}/submit-review` | Người lập | Nháp → **Chờ soát xét** |
| POST | `/certificates/{id}/review` | Người soát xét | `decision=approve|reject` (+`reason` nếu reject) |
| POST | `/certificates/{id}/approve` | Người phê duyệt | → **Đã phê duyệt** |
| POST | `/certificates/{id}/sign` | Người ký | Ký số → **Đã ký số** |
| POST | `/certificates/{id}/publish` | Người phát hành | → **Đã phát hành** (bật QR công khai) |
| POST | `/certificates/{id}/replace` | Người phê duyệt | Tạo bản thay thế, liên kết `replaces`; bản gốc → **Đã thay thế** |
| POST | `/certificates/{id}/revoke` | LĐP/LĐV | Thu hồi (+`reason`) → **Đã thu hồi** |
| POST | `/certificates/{id}/cancel` | LĐP/LĐV | Hủy (+`reason`) → **Đã hủy** |
| GET | `/public/verify/{qr_token}` | Công khai | Tra cứu chứng chỉ đã ký số/phát hành |
| GET | `/certificates/{id}/audit` | Quản trị/Đánh giá viên | Lấy nhật ký thao tác |

### Quy ước phản hồi
- Vi phạm quy tắc nghiệp vụ → `409 Conflict` kèm mã lỗi (vd. `MISSING_UNCERTAINTY`, `REASON_REQUIRED`, `NOT_DRAFT`).
- `GET /public/verify` trả tối thiểu: `cert_no`, `cert_type`, `status`, `issued_date`, `valid_until`, tổ chức, kết quả tóm tắt — **không** lộ dữ liệu nội bộ/khách hàng nhạy cảm.
