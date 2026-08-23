# M27_TaiSanTT — Mô hình dữ liệu

> Nguồn sự thật: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md) mục 2 (danh sách trường
> đầy đủ). Bảng dưới là bản dẫn xuất ở mức thực thể/quan hệ.

## Thực thể chính

| Thực thể | Ý nghĩa | Khóa/Quan hệ |
|---|---|---|
| `InfoAsset` | Tài sản thông tin trong danh mục kiểm kê | PK `id`; `code` duy nhất; FK `owner`/`custodian` → User; FK `system_ref` → M33; FK `doc_ref` → M14; FK `record_ref`/`retention_ref` → M15; FK nhiều-nhiều `risk_refs` → M28 |
| `ClassificationRule` | Quy tắc xử lý theo mức phân loại (bảng luật có phiên bản) | PK `id`; duy nhất `(version, classification, action)` |
| `DataSharing` | Chia sẻ dữ liệu ra ngoài | PK `id`; FK nhiều-nhiều `asset_refs` → `InfoAsset`; FK `disclosure_ref` → M02; FK `approved_by` → User |
| `DisposalRecord` | Hủy dữ liệu và vật mang tin | PK `id`; FK nhiều-nhiều `asset_refs` → `InfoAsset`; FK `approved_by`/`executed_by`/`witness` → User |
| `AuditLog` | Nhật ký thao tác và lượt truy cập | FK tới 4 thực thể trên; **append-only** |

## Ràng buộc

- `code` duy nhất trên `InfoAsset`, `DataSharing`, `DisposalRecord`.
- `owner` NOT NULL trên mọi tài sản; tài sản dạng điện tử ⇒ `custodian` và `system_ref` NOT NULL.
- `data_domain = Dữ liệu khách hàng` ⇒ `classification ≥ Hạn chế`; hạ mức chỉ hợp lệ khi có
  `DataSharing.disclosure_ref` hoặc căn cứ pháp luật (quy tắc 3).
- `contains_personal_data = true` ⇒ `legal_basis` NOT NULL **và** `retention_period` hữu hạn (quy tắc 4).
- `cia_a = Cao` ⇒ `backup_required = true`; `backup_required = true` ⇒ `backup_frequency` NOT NULL
  và `last_restore_test_at` không quá 1 năm (quy tắc 7 — kiểm tra khi rà soát, cảnh báo khi quá hạn).
- `asset_type` là hồ sơ ⇒ `retention_ref` NOT NULL (thời hạn lấy theo M15, quy tắc 8); là tài liệu
  kiểm soát ⇒ `doc_ref` NOT NULL.
- `classification ∈ {Hạn chế, Mật}` **hoặc** bất kỳ `cia_* = Cao` ⇒ cần ≥ 1 `risk_refs` → M28
  (cảnh báo mềm cho tới khi M28 lên nền tảng, quy tắc 10).
- `ai_use_allowed = true` ⇒ `classification ∈ {Công khai, Nội bộ}` **và** `status = Đang sử dụng`
  (quy tắc 12 — `ETV.P28` mục 5.7 cấm tuyệt đối dữ liệu Hạn chế/Mật vào chỉ mục AI).
- `DataSharing.status = Đã phê duyệt` ⇒ `approved_by` thuộc vai trò LĐV; dữ liệu khách hàng/dữ liệu
  cá nhân ⇒ `disclosure_ref` NOT NULL (quy tắc 6).
- `DisposalRecord.status = Đã thực hiện` ⇒ `approved_at < executed_at`, `witness ≠ executed_by`,
  `evidence_ref` NOT NULL; mọi `asset_refs` phải ở trạng thái **Ngừng sử dụng** và đã hết thời hạn
  lưu tại thời điểm phê duyệt (quy tắc 9).
- Chỉ một phiên bản `ClassificationRule` ở trạng thái Đã phê duyệt tại mỗi thời điểm.
- `created_by ≠ approved_by`; `reviewed_by ≠ created_by`.
- **Không có thao tác xóa** bản ghi `InfoAsset` ở tầng dữ liệu — chỉ chuyển trạng thái.
- Cờ "đến hạn rà soát" / "đến hạn kiểm tra khôi phục" / "đến hạn hủy" **không lưu cột riêng** —
  tính khi đọc.
