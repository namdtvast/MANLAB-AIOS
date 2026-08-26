# M34_DuLieuSo — Mô hình dữ liệu

> Nguồn sự thật: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md) mục 2. Chi tiết trường
> của từng thực thể nằm ở đó — file này giữ quan hệ, ràng buộc và các quyết định thiết kế dữ liệu.
> Thủ tục nguồn: `ETV.P34` (dự thảo, Chờ soát xét).

## Thực thể chính

| Thực thể | Ý nghĩa | Khóa/Quan hệ |
|---|---|---|
| `DataSet` | Bản ghi danh mục của một tập dữ liệu (F34.01 phần I) | PK `id`; `code` duy nhất, không cấp lại; ref mềm → M27 (`info_asset_ref`), M33 (`infra_ref`), M35 (`platform_ref`), M15 (`record_ref`) |
| `DataDictionaryVersion` | Từ điển dữ liệu theo phiên bản (F34.01 phần II) | FK `dataset_id`; duy nhất (`dataset_id`, `version`); tối đa một bản `Hiệu lực`/tập; `change_ref` → M30 từ v02 |
| `DictionaryField` | Một trường trong từ điển | FK `dictionary_version_id`; duy nhất (`dictionary_version_id`, `field_name`); 8 thuộc tính theo F34.01 phần II |
| `MasterDataSource` | Loại dữ liệu chủ được LĐV công nhận nguồn sự thật duy nhất (F34.01 phần III) | FK `dataset_id`; `master_group` thuộc MD01–MD12; duy nhất (`master_group`, `master_type`) đang `Đã công nhận` — một loại một nguồn (R9) |
| `ParallelLookupFinding` | Bảng tra song song phát hiện trong kỳ (F34.01 phần III.1) | FK `master_source_id`; `capa_ref` → M13 khi `caused_error` |
| `QualityMeasurement` | Kỳ đo chất lượng của một tập (F34.02 phần A) | FK `dataset_id`; duy nhất (`dataset_id`, `period`); con `QualityMeasurementRow` mỗi chiều một dòng |
| `DataCorrection` | Hồ sơ hiệu chỉnh dữ liệu đã ghi nhận (F34.02 phần B) | FK `dataset_id`; `validity_ref` → M10/M11 bắt buộc khi `published_impact = Đã dùng phát hành` (R12) |
| `DataSharingRequest` | Phiếu khai thác, chia sẻ dữ liệu (F34.03) | FK `dataset_id`; `integration_ref` → M37 khi loại định kỳ – tự động |
| `AIDataApproval` | Hồ sơ phê duyệt dữ liệu dùng cho hệ thống AI | FK `dataset_id`; `aia_ref` → M29 bắt buộc; **CHECK: tập không thuộc mức Hạn chế/Mật** (R22) |
| `AuditLog` | Nhật ký thao tác | FK đa hình (`entity_type`, `entity_id`); **append-only** |

## Ràng buộc chính (ánh xạ quy tắc → tầng dữ liệu)

- **NOT NULL theo R1**: `DataSet.owner_ref`, `DataSet.steward_ref` — chặn ngay khi INSERT, không
  đợi tới phê duyệt (`ETV.P34` Phụ lục I.1 điều kiện 1).
- **NOT NULL theo R2, R5**: `classification`, `has_personal_data`, `retention_basis`.
- **Điều kiện chuyển trạng thái** (kiểm ở tầng nghiệp vụ, không phải constraint DB): sang `Chờ soát
  xét` cần đủ R1/R2/R5 và `DataDictionaryVersion` hiệu lực nếu `dictionary_required` (R3); sang
  `Hiệu lực` cần `quality_metrics` không rỗng (R4); sang `Đã hủy` cần đủ 4 điều kiện §6.7.2 + hai
  chữ ký (R21).
- **Bất biến sau chốt**: `QualityMeasurement` ở `Đạt`/`Không đạt` và `DataCorrection` ở `Đã hiệu
  chỉnh` không sửa được nữa — mọi đính chính là bản ghi mới (R11 áp cho chính hồ sơ của module).
- **Không xóa cứng**: không có DELETE trên `DataSet` (kể cả `Đã hủy` — bản ghi danh mục giữ vĩnh
  viễn để truy vết, `ETV.P34` Phụ lục II.1); `MasterDataSource` thu hồi công nhận bằng trạng thái,
  không xóa; bản ghi dữ liệu chủ trùng hợp nhất bằng **bảng ánh xạ `MasterMergeMap`**
  (`old_ref` → `surviving_ref`, giữ vĩnh viễn — `ETV.P34` §6.4.4).
- **Party–Role đối với MD01**: khóa định danh nằm ở hồ sơ `Party`; vai trò CUSTOMER/SUPPLIER/
  SUBCONTRACTOR/MANUFACTURER/PARTNER là bản ghi có hiệu lực theo thời gian. Không tạo bảng khách
  hàng, NCC hoặc đối tác làm nguồn định danh cạnh tranh; merge phải có phê duyệt và lịch sử ánh xạ
  (`ETV.P34` §6.2.4).
- **Mã không cấp lại**: `DataSet.code` sinh tuần tự toàn hệ thống, kể cả khi bản ghi nguồn đã Hủy
  bản ghi.
- **Không lưu nội dung dữ liệu thật**: schema không có trường nào chứa bản ghi nghiệp vụ; các
  trường mô tả tự do qua kiểm tra mẫu ở tầng nghiệp vụ trước khi lưu (R6).
- **Thang phân loại dùng chung**: `classification` import enum `Classification` của M27, không khai
  báo lại (`ETV.P02`/`ETV.P27`/`ETV.P28`).
- **Tham chiếu chéo module**: FK thật với module đã ACTIVE trên nền tảng; ref mềm (mã văn bản + tệp
  đính kèm) với module chưa xây (M27, M30, M35, M37, M29) — chuyển thành FK khi module đích lên nền
  tảng, **không nới lỏng điều kiện chặn cứng** trong lúc chờ (DacTa mục 10 điểm 5).

## Chỉ mục phục vụ cờ tính-khi-đọc

Cờ cảnh báo không lưu cột (DacTa mục 6): **Đến hạn rà soát** (`last_reviewed_at` + `review_cycle`)
· **Đến hạn đo chất lượng** (kỳ đo gần nhất + kỳ đo của nhóm, mục 4.3) · **Chất lượng dưới ngưỡng**
(kỳ đo gần nhất `Không đạt`) · **Đến hạn chuyển giai đoạn vòng đời** (`active_retention`) · **Chia
sẻ quá hạn chưa thu hồi** (`revoke_due`). Cần chỉ mục trên: `DataSet(last_reviewed_at)`,
`DataSet(lifecycle_stage, status)`, `QualityMeasurement(dataset_id, measured_at)`,
`DataSharingRequest(revoke_due, status)`.
