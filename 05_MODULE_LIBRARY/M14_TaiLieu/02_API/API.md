# M14 — Đặc tả API

> REST, JSON. Mọi thao tác đổi trạng thái ghi `AuditLog`. Phân quyền theo `ETV.P.F 14.06`.

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| POST | `/documents` | Người lập | Tạo bản ghi (`Nháp`), sinh `id` theo `ETV.P14` §6.2 |
| GET | `/documents/{id}` | Theo `permission` | Xem chi tiết + metadata (`ETV.P14` §7) |
| PUT | `/documents/{id}` | Người lập | Sửa (chỉ khi `Nháp`/`Không soát xét`/`Không phê duyệt`) |
| POST | `/documents/{id}/submit-review` | Người lập | → `Chờ soát xét` |
| POST | `/documents/{id}/review` | LĐP | `decision=approve\|reject` (+`reason` nếu reject) |
| POST | `/documents/{id}/approve` | LĐV | → `Đã phê duyệt`, cấp `revision` |
| POST | `/documents/{id}/publish` | Văn thư/QLCL | Cập nhật danh mục (`ETV.P.F 14.02`/`.03`), sinh phiếu giao nhận (`ETV.P.F 14.04`) |
| POST | `/documents/{id}/retire` | LĐP | Thanh lý → `Hết hiệu lực` (+`reason`) |
| POST | `/documents/{id}/discard` | LĐV | Hủy bỏ → `Hủy` (+`reason` bắt buộc) |
| GET | `/documents/{id}/audit` | Quản trị/Đánh giá viên | Nhật ký thao tác |
| GET | `/documents/search` | Theo `permission` | Tìm theo `keywords`/`ai_tags`/`embeddings` (semantic search) |
| POST | `/ai/suggest-metadata` | AI Agent (M29) | Gợi ý `type`, `iso_clause`, `legal_basis`, `ai_tags` từ nội dung soạn thảo — **chỉ trả gợi ý**, không ghi thẳng vào `Document` |
| GET | `/ai/conflicts` | AI Agent (M29) | Danh sách cảnh báo trùng phạm vi/mâu thuẫn để LĐP xử lý (`ETV.P14` §15) |

### Quy ước phản hồi

- Vi phạm quy tắc nghiệp vụ → `409 Conflict` kèm mã lỗi (vd. `MISSING_REQUIRED_FIELD`, `REASON_REQUIRED`, `NOT_DRAFT`, `PERMISSION_DENIED`).
- Endpoint nhóm `/ai/*` không có quyền chuyển `status` — chỉ tạo gợi ý (`suggestion`), người có thẩm quyền phải gọi endpoint nghiệp vụ tương ứng để xác nhận.
