# M25_BoiCanh — Bảng trạng thái

> Nguồn sự thật: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md) mục 6. Trạng thái áp
> dụng cho `ContextReview` (kỳ xem xét). `ContextIssue` / `InterestedParty` chỉ có 2 trạng thái con:
> **Còn hiệu lực** / **Đã đóng** (đóng bắt buộc lý do).

| STT | Trạng thái | Ý nghĩa | Người thao tác | Điều kiện chuyển | Bắt buộc lý do |
|---|---|---|---|---|---|
| 1 | Nháp | QLCL đang soạn | QLCL | Đủ trường bắt buộc + mọi vấn đề mức Cao đã liên kết M01 + mọi bên quan tâm có ≥1 mong đợi → Chờ soát xét | Không |
| 2 | Chờ soát xét | Chờ TP kiểm tra | TP (≠ người lập) | Đạt → Chờ phê duyệt; Không đạt → Không soát xét | — |
| 3 | Không soát xét | Bị trả lại | QLCL | Sửa → Chờ soát xét | **Có** |
| 4 | Chờ phê duyệt | Chờ LĐV | LĐV | Đạt (+ kết luận) → Đã phê duyệt; Không đạt → Không phê duyệt | — |
| 5 | Không phê duyệt | Bị trả lại | QLCL | Sửa → Chờ soát xét | **Có** |
| 6 | Đã phê duyệt | Có hiệu lực, **chỉ đọc** | — | Kỳ mới cùng phạm vi được phê duyệt → Hết hiệu lực (tự động) | — |
| 7 | Hết hiệu lực | Đã bị kỳ sau thay thế | — | (kết thúc — vẫn tra cứu được làm bằng chứng) | — |
| 8 | Hủy | Bỏ kỳ trước khi phê duyệt | LĐV | (kết thúc) | **Có** |

> Nguyên tắc: kỳ đã phê duyệt là hồ sơ bất biến — mọi thay đổi bối cảnh phải tạo kỳ mới, không sửa
> đè lên hồ sơ đã dùng làm căn cứ hoạch định.
