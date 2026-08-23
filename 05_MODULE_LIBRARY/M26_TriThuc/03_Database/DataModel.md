# M26_TriThuc — Mô hình dữ liệu

> Nguồn sự thật: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md) mục 2 (danh sách trường
> đầy đủ). Bảng dưới là bản dẫn xuất ở mức thực thể/quan hệ.

## Thực thể chính

| Thực thể | Ý nghĩa | Khóa/Quan hệ |
|---|---|---|
| `KnowledgeItem` | Mục tri thức (có phiên bản) | PK `id`; `code` duy nhất; self-FK `supersedes_ref`; FK `doc_ref` → M14; FK nhiều-nhiều `holders` → User; FK `owner` → User; FK nhiều-nhiều `applies_to` → M08/M05 |
| `LessonLearned` | Bài học kinh nghiệm | PK `id`; FK đa hình `source_ref` → M13/M12/M10/M16/M05/M28/M29/M07; FK `knowledge_item_ref` → `KnowledgeItem`; FK `root_cause_ref` → M13 |
| `KnowledgeNeed` | Nhu cầu tri thức | PK `id`; FK đa hình `trigger_ref` → M08/M05/M21/M03/M29/M25/M13; FK `result_ref` → `KnowledgeItem` hoặc hồ sơ đào tạo M03 |
| `SharingEvent` | Hoạt động chia sẻ tri thức | PK `id`; FK nhiều-nhiều `knowledge_item_refs` → `KnowledgeItem`; FK `presenter`/`participants` → User; FK `evidence_ref` → M03 |
| `AuditLog` | Nhật ký thao tác và lượt truy cập | FK tới 4 thực thể trên; **append-only** |

## Ràng buộc

- `code` duy nhất trên cả 4 thực thể; `(code, version)` duy nhất trên `KnowledgeItem`.
- `knowledge_form = Tri thức hiện` ⇒ `source_ref` NOT NULL **hoặc** `doc_ref` NOT NULL (quy tắc 1).
- `knowledge_form = Tri thức ẩn` ⇒ `count(holders) ≥ 1`.
- `knowledge_form = Tri thức ẩn` **và** `criticality = Cao` **và** `count(holders) = 1` ⇒ phải tồn
  tại ≥ 1 liên kết rủi ro sang M01 **và** ≥ 1 `KnowledgeNeed` chuyển giao trước khi phê duyệt (quy tắc 3).
- `ai_indexed = true` ⇒ `status = Đã phê duyệt` **và** `confidentiality ∈ {Công khai, Nội bộ}` (quy tắc 10).
- `status ∈ {Hết hiệu lực, Hủy}` ⇒ `ai_indexed = false` (đặt trong **cùng giao dịch** với đổi trạng thái).
- `status ∈ {Đã phê duyệt, Hết hiệu lực}` ⇒ nội dung mục là chỉ đọc; thay đổi phải qua phiên bản mới.
- `created_by ≠ approved_by`; `reviewed_by ≠ created_by`; `criticality = Cao` ⇒ `approved_by` thuộc vai trò LĐV.
- `LessonLearned.status = Đã phê duyệt` ⇒ `knowledge_item_ref` NOT NULL (quy tắc 7).
- `KnowledgeNeed.status = Đã đáp ứng` ⇒ `result_ref` NOT NULL (quy tắc 8).
- `SharingEvent.knowledge_item_refs` chỉ trỏ tới mục có `status = Đã phê duyệt` (quy tắc 12);
  `form = Đào tạo nội bộ` ⇒ `evidence_ref` NOT NULL.
- Cờ **Đến hạn rà soát** **không lưu cột riêng** — tính khi đọc từ `last_reviewed_at` + `review_cycle`.
- Mọi trạng thái kết thúc bắt buộc lý do (Không soát xét, Không phê duyệt, Hết hiệu lực, Hủy,
  Không thực hiện) — lưu trong `AuditLog`.
