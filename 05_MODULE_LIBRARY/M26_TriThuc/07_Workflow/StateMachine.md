# M26_TriThuc — Bảng trạng thái

> Nguồn sự thật: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md) mục 6. Trạng thái chính
> áp dụng cho `KnowledgeItem` (mục tri thức).

| STT | Trạng thái | Ý nghĩa | Người thao tác | Điều kiện chuyển | Bắt buộc lý do |
|---|---|---|---|---|---|
| 1 | Nháp | Đang soạn | QLCL, TP | Đủ trường bắt buộc theo `knowledge_form` (tri thức hiện: `source_ref`/`doc_ref`; tri thức ẩn: `holders` ≥ 1) → Chờ soát xét | Không |
| 2 | Chờ soát xét | Chờ TP lĩnh vực kiểm tra | TP (≠ người lập) | Đạt → Chờ phê duyệt; Không đạt → Không soát xét | — |
| 3 | Không soát xét | Bị trả lại | Người lập | Sửa → Chờ soát xét | **Có** |
| 4 | Chờ phê duyệt | Chờ thẩm quyền | LĐV (bắt buộc khi `criticality = Cao`) | Đạt → Đã phê duyệt (**chặn** nếu là tri thức ẩn trọng yếu chỉ 1 người giữ mà chưa có liên kết M01 + kế hoạch chuyển giao); Không đạt → Không phê duyệt | — |
| 5 | Không phê duyệt | Bị trả lại | Người lập | Sửa → Chờ soát xét | **Có** |
| 6 | Đã phê duyệt | Có hiệu lực, khai thác được, **chỉ đọc** | — | Phiên bản mới được phê duyệt → Hết hiệu lực (tự động); hoặc tuyên bố lỗi thời → Hết hiệu lực | — |
| 7 | Hết hiệu lực | Lỗi thời/bị thay thế — **tự gỡ khỏi chỉ mục AI** | LĐV, QLCL | (kết thúc — vẫn tra cứu được làm bằng chứng) | **Có** khi tuyên bố lỗi thời |
| 8 | Hủy | Bỏ mục trước khi phê duyệt | LĐV | (kết thúc) | **Có** |

Cờ **Đến hạn rà soát** không phải trạng thái — tính khi đọc trên mục Đã phê duyệt từ
`last_reviewed_at` + `review_cycle`; quá 2 chu kỳ thì cảnh báo LĐV, hệ thống **không** tự chuyển
mục sang Hết hiệu lực.

## Thực thể phụ

| Thực thể | Chuỗi trạng thái | Ghi chú |
|---|---|---|
| `LessonLearned` | Mới → Đang phân tích → Chờ phê duyệt → Đã phê duyệt / Hủy | Phê duyệt bị **chặn** nếu chưa gắn `knowledge_item_ref` |
| `KnowledgeNeed` | Mở → Đang bổ sung → Đã đáp ứng / Không thực hiện | Đã đáp ứng bắt buộc `result_ref`; Không thực hiện do LĐV duyệt, bắt buộc lý do |
| `SharingEvent` | Kế hoạch → Đã thực hiện / Hủy | Đào tạo nội bộ bắt buộc `evidence_ref` → hồ sơ M03 |

> Nguyên tắc: mục tri thức đã phê duyệt là hồ sơ bất biến — cập nhật tri thức phải tạo phiên bản
> mới, không sửa đè lên bản đang được người khác (và trợ lý AI) sử dụng.
