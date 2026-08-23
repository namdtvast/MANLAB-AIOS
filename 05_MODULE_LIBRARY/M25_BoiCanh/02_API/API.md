# M25_BoiCanh — Đặc tả API

> Nguồn sự thật: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md). Bảng dưới là bản dẫn
> xuất; chi tiết gate xem `01_Requirement/_work/20260823-dac-ta-m25/spec.md` mục 3.

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET | `/boicanh` | Nội bộ | Danh sách kỳ xem xét bối cảnh |
| POST | `/boicanh` | QLCL | Tạo kỳ mới (Nháp) — đột xuất bắt buộc `trigger_reason`; kế thừa mục còn hiệu lực của kỳ trước |
| GET | `/boicanh/{id}` | Nội bộ | Chi tiết kỳ (vấn đề bối cảnh + bên quan tâm) |
| PUT | `/boicanh/{id}` | QLCL | Sửa kỳ (chỉ khi chưa phê duyệt) |
| POST/PUT | `/boicanh/{id}/issues[/{issueId}]` | QLCL, TP | Thêm/sửa vấn đề bối cảnh |
| POST | `/boicanh/{id}/issues/{issueId}/close` | QLCL, TP | Đóng vấn đề — **bắt buộc lý do** |
| POST/PUT | `/boicanh/{id}/parties[/{partyId}]` | QLCL, TP | Thêm/sửa bên quan tâm |
| POST/PUT | `/boicanh/{id}/parties/{partyId}/expectations[/{expId}]` | QLCL, TP | Thêm/sửa nhu cầu, mong đợi |
| POST | `/boicanh/{id}/submit-review` | QLCL | → Chờ soát xét (chặn nếu còn vấn đề mức Cao chưa liên kết M01, hoặc bên quan tâm chưa có mong đợi) |
| POST | `/boicanh/{id}/review` | TP (≠ người lập) | Đạt → Chờ phê duyệt; Không đạt → Không soát xét (**bắt buộc lý do**) |
| POST | `/boicanh/{id}/approve` | **LĐV** | Đạt (+ `conclusion`) → Đã phê duyệt, kỳ trước tự chuyển Hết hiệu lực; Không đạt → Không phê duyệt (**bắt buộc lý do**) |
| POST | `/boicanh/{id}/cancel` | LĐV | → Hủy (chỉ khi chưa phê duyệt, **bắt buộc lý do**) |
| GET | `/boicanh/{id}/export/{F25.01\|F25.02\|F25.03}` | QLCL | Xuất biểu mẫu (chỉ kỳ Đã phê duyệt) |
| GET | `/boicanh/monitoring` | QLCL, TP | Mục đến hạn xem xét (tính khi đọc theo `monitoring_frequency`) |
| GET | `/boicanh/{id}/audit` | Quản trị | Nhật ký thao tác |

> Mọi thao tác đổi trạng thái ghi AuditLog; vi phạm quy tắc → 409 kèm mã lỗi. Kỳ ở trạng thái
> **Đã phê duyệt / Hết hiệu lực** không có bất kỳ đường ghi nào.
