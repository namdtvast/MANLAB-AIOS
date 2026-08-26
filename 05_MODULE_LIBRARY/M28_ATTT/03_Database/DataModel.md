# M28_ATTT — Mô hình dữ liệu

> Nguồn sự thật: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md) mục 2 (danh sách trường
> đầy đủ). Bảng dưới là bản dẫn xuất ở mức thực thể/quan hệ.

## Thực thể chính

| Thực thể | Ý nghĩa | Khóa/Quan hệ |
|---|---|---|
| `SecurityRisk` | Rủi ro an toàn thông tin đã đánh giá | PK `id`; `code` duy nhất; FK nhiều-nhiều `asset_refs` → M27; FK `risk_owner` → User; FK nhiều-nhiều `soa_control_refs` → `SoAControl`; FK `m01_risk_ref` → M01 |
| `RiskTreatment` | Hạng mục Kế hoạch xử lý rủi ro (RTP) | PK `id`; FK `risk_ref` → `SecurityRisk`; FK `soa_control_ref` → `SoAControl`; FK `responsible`/`verified_by` → User |
| `SoAVersion` | Tuyên bố áp dụng, có phiên bản | PK `id`; `version` duy nhất; self-FK `supersedes_ref`; FK `approved_by` → User |
| `SoAControl` | Một dòng kiểm soát trong một phiên bản SoA | PK `id`; FK `soa_version_ref` → `SoAVersion`; `(soa_version_ref, control_code)` duy nhất; FK `responsible` → User; FK nhiều-nhiều `evidence_refs` → M15 |
| `SecurityIncident` | Sự cố an toàn thông tin | PK `id`; `code` duy nhất; FK nhiều-nhiều `asset_refs` → M27; FK nhiều-nhiều `risk_refs` → `SecurityRisk`; FK `capa_ref` → M13; FK `lesson_ref` → M26; FK `m10_ref`/`m11_ref` → M10/M11 |
| `IncidentNotification` | Một lần thông báo ra bên ngoài của sự cố | PK `id`; FK `incident_ref` → `SecurityIncident`; FK `decided_by` → User (LĐV) |
| `AccessRequest` | Yêu cầu cấp/thay đổi/thu hồi quyền | PK `id`; `code` duy nhất; FK `subject`/`requested_by`/`approved_by`/`executed_by` → User; FK `nda_ref` → M02; FK `awareness_training_ref` → M03 |
| `AccessItem` | Một dòng quyền trong phiếu | PK `id`; FK `request_ref` → `AccessRequest` |
| `AccessReview` | Đợt rà soát quyền truy cập định kỳ | PK `id`; FK `reviewer` → User; FK nhiều-nhiều `revocation_refs` → `AccessRequest` |
| `AuditLog` | Nhật ký thao tác và lượt truy cập | FK đa hình tới các thực thể trên; **append-only** |

## Ràng buộc

- `code` duy nhất trên `SecurityRisk`, `SecurityIncident`, `AccessRequest`; `(soa_version_ref,
  control_code)` duy nhất trên `SoAControl`.
- `SecurityRisk`: `count(asset_refs) ≥ 1` (R1); `risk_owner.role ∈ {TP, LĐV}` (R3);
  `impact = max(impact_c, impact_i, impact_a)` và `risk_score = likelihood × impact` là **cột tính**
  (generated/computed), không cho ghi trực tiếp (R2).
- `SecurityRisk`: `risk_score ≥ 7` ⇒ `count(treatments) ≥ 1` trước khi rời trạng thái Chờ phê duyệt
  (R4); `residual_score ≥ 7` ⇒ `residual_accepted_by` NOT NULL và `residual_accept_reason` NOT NULL
  (R5).
- `RiskTreatment`: `status = Hoàn thành` ⇒ `verified_by` và `verified_at` NOT NULL (R6). `due_at`
  ràng buộc theo mức rủi ro của bản ghi cha: ≤ 12 / 06 / 03 tháng.
- `SoAControl`: `applicable = false` ⇒ `exclusion_reason` NOT NULL (R7); `applicable = true` ⇒
  `justification`, `implementation`, `responsible` NOT NULL; `implementation_status = Đã thực hiện`
  ⇒ `count(evidence_refs) ≥ 1` (R9).
- `SoAVersion`: mỗi phiên bản phải có **đúng 93** `SoAControl`; bản `status = Đã phê duyệt` là
  chỉ đọc — mọi UPDATE bị từ chối ở tầng ứng dụng và tầng CSDL (R8); tối đa **một** bản Đã phê duyệt
  tại một thời điểm (partial unique index trên `status`).
- `SecurityIncident`: `affects_result_validity = true` ⇒ `m10_ref` hoặc `m11_ref` NOT NULL trước khi
  đóng (R14); `severity ∈ {Cao, Rất cao}` ⇒ `lesson_ref` NOT NULL trước khi đóng (R15);
  `closed_by ≠ reporter` và `closed_by` không nằm trong danh sách người liên quan (R20);
  `severity ∈ {Cao, Rất cao}` ⇒ `closed_by.role = LĐV`.
- `SecurityIncident`, `IncidentNotification`, `AuditLog`: **không** có thao tác DELETE — thu hồi chỉ
  bằng trạng thái `Hủy` kèm lý do (R10).
- `AccessRequest`: `awareness_training_ref` NOT NULL; `subject_type ≠ Nhân sự chính thức` ⇒
  `nda_ref` NOT NULL (R16); tồn tại `AccessItem.is_privileged = true` **hoặc** mức truy cập ∈ {Hạn
  chế, Mật} **hoặc** `subject_type = Nhà cung cấp CNTT` ⇒ `approved_by.role = LĐV` (R17);
  `requested_by ≠ approved_by ≠ executed_by` (R18); `request_type = Thu hồi toàn bộ` ⇒ `revoked_at`
  NOT NULL và `assets_returned` NOT NULL (R19).
- `AccessItem`: `valid_until` NOT NULL khi quyền là tạm thời hoặc `subject_type ≠ Nhân sự chính
  thức`.
- `confidentiality` trên mọi thực thể dùng chung enum của M02/M27 (Công khai · Nội bộ · Hạn chế ·
  Mật) — **không** khai báo enum riêng cho M28 (R11).

## Cột tính khi đọc (không lưu)

| Cột | Công thức | Quy tắc |
|---|---|---|
| Mức rủi ro (Thấp/Trung bình/Cao/Rất cao) | Phân dải từ `risk_score` | mục 4.1 đặc tả |
| Cờ **Đến hạn rà soát** (rủi ro) | `now > last_assessed_at + 12 tháng` | R13 |
| Cờ **Đến hạn rà soát** (SoA) | `now > effective_date + 12 tháng` | R13 |
| `RiskTreatment.status = Quá hạn` | `now > due_at` và chưa Hoàn thành | R4 |
| `bcp_input` | `impact_a ≥ 4` | R12 |
| `mfa_required` | Có `is_privileged`, truy cập từ xa, thư điện tử công vụ, hoặc mức Hạn chế/Mật | mục 2.5 đặc tả |

## Dữ liệu khởi tạo (seed)

- **93 mã kiểm soát** cho mỗi `SoAVersion` mới: `A.5.1`–`A.5.37`, `A.6.1`–`A.6.8`, `A.7.1`–`A.7.14`,
  `A.8.1`–`A.8.34`. Chỉ seed **mã**; không lưu tên và diễn giải kiểm soát (bản quyền tiêu chuẩn —
  P28 §6.6).
- Enum `confidentiality` lấy từ M02/M27, không seed riêng.
