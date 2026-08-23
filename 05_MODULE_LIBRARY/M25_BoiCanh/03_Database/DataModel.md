# M25_BoiCanh — Mô hình dữ liệu

> Nguồn sự thật: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md) mục 2 (danh sách trường
> đầy đủ). Bảng dưới là bản dẫn xuất ở mức thực thể/quan hệ.

## Thực thể chính

| Thực thể | Ý nghĩa | Khóa/Quan hệ |
|---|---|---|
| `ContextReview` | Kỳ xem xét bối cảnh (snapshot có phiên bản) | PK `id`; `code` duy nhất; self-FK `supersedes_ref` → kỳ liền trước |
| `ContextIssue` | Vấn đề nội bộ/bên ngoài | PK `id`; FK `review_ref` → `ContextReview`; FK nhiều-nhiều `risk_refs` → M01 (rủi ro/cơ hội) |
| `InterestedParty` | Bên quan tâm | PK `id`; FK `review_ref` → `ContextReview` |
| `PartyExpectation` | Nhu cầu, mong đợi | PK `id`; FK `party_ref` → `InterestedParty` (xóa theo cha) |
| `AuditLog` | Nhật ký thao tác | FK tới 4 thực thể trên; **append-only** |

## Ràng buộc

- `code` duy nhất trên `ContextReview`, `ContextIssue`, `InterestedParty`.
- `cycle_type = Đột xuất` ⇒ `trigger_reason` NOT NULL.
- `impact_level = Cao` ⇒ tồn tại ≥ 1 `risk_refs` trước khi kỳ chuyển sang Chờ soát xét.
- `is_compliance_obligation = true` ⇒ `obligation_ref` NOT NULL.
- Mỗi `InterestedParty` phải có ≥ 1 `PartyExpectation` trước khi kỳ chuyển sang Chờ soát xét.
- `created_by ≠ approved_by`; `reviewed_by ≠ created_by`.
- `status ∈ {Đã phê duyệt, Hết hiệu lực}` ⇒ toàn bộ cây dữ liệu con là chỉ đọc.
- Trạng thái "đến hạn xem xét" **không lưu cột riêng** — tính khi đọc từ `monitoring_frequency` +
  lần cập nhật gần nhất.
