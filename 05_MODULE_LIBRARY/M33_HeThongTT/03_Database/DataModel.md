# M33_HeThongTT — Mô hình dữ liệu

> Nguồn sự thật: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md) mục 2 (danh sách trường
> đầy đủ). Bảng dưới là bản dẫn xuất ở mức thực thể/quan hệ. Ràng buộc dẫn từ `ETV.P33` Phụ lục I
> (dự thảo, Chờ soát xét).

## Thực thể chính

| Thực thể | Ý nghĩa | Khóa/Quan hệ |
|---|---|---|
| `ITAsset` | Cấu phần hạ tầng CNTT | PK `id`; `code` duy nhất **và không bao giờ cấp lại**; `serial` duy nhất khi có; FK `custodian`/`user_owner` → User; FK nhiều-nhiều `platform_refs` → M35, `info_asset_refs` → M27, `risk_refs` → M28/M01; FK `measuring_device_ref` → M05; FK `maintenance_contract_ref` → M07 |
| `MaintenancePlan` | Kế hoạch bảo trì năm được LĐV phê duyệt | PK `id`; `year` duy nhất trong các kế hoạch còn hiệu lực; FK nhiều-nhiều `scope_asset_refs` → `ITAsset`; FK `created_by`/`approved_by` → User |
| `MaintenanceTask` | Bảo trì, vá lỗi, cập nhật | PK `id`; FK nhiều-nhiều `asset_refs` → `ITAsset`; FK `plan_ref` → `MaintenancePlan`; FK `change_ref` → M30; FK `impact_assessment_ref` → M28; FK `measurement_impact_ref` → M10; FK `method_impact_ref` → M08 |
| `SystemAccount` | Tài khoản trên hệ thống/nền tảng | PK `id`; FK `asset_ref` → `ITAsset` **hoặc** `platform_ref` → M35; FK `access_request_ref` → M28; FK `holder` → User; FK `hr_event_ref` → M03 |
| `AccountReconciliation` | Kỳ đối chiếu tài khoản | PK `id`; `period + scope` duy nhất; FK[] tới `SystemAccount` cho 4 nhóm bất thường — **snapshot, không tính lại** |
| `ITIncident` | Sự cố kỹ thuật và yêu cầu hỗ trợ | PK `id`; FK nhiều-nhiều `asset_refs` → `ITAsset`; FK `security_incident_ref` → M28, `platform_incident_ref` → M35, `measurement_impact_ref` → M10/M11, `continuity_ref` → M31, `capa_ref` → M13, `lesson_ref` → M26, `maintenance_ref` → `MaintenanceTask` |
| `AuditLog` | Nhật ký thao tác | FK tới sáu thực thể trên; **append-only** |

## Ràng buộc

### Tài sản

- `code` duy nhất toàn hệ thống, cấp một lần, **không đổi và không cấp lại** kể cả sau khi tài sản
  chuyển sang Đã thanh lý (R22 — ETV.P33 §6.1.2).
- `custodian` và `user_owner` NOT NULL trên mọi `ITAsset`, trỏ tới người/đơn vị **đang hoạt động**
  (R1) — vi phạm ⇒ **không cho lưu**, không chỉ chặn phê duyệt.
- `max_classification ∈ {Hạn chế, Mật}` ⇒ `disk_encryption = true`; thiết bị đầu cuối và máy chủ ⇒
  `screen_lock`, `antimalware`, `default_password_changed`, `unused_services_closed` đều `true`
  (R3 — ETV.P28 mục 5.7.2, ETV.P33 §6.2.3).
- `is_personal_device = true`: `max_classification ∈ {Công khai, Nội bộ}` ⇒ được phép khi đã đăng ký
  và đủ cấu hình cơ sở; `∈ {Hạn chế, Mật}` ⇒ phải có phê duyệt LĐV **và** `risk_refs` → M28 (ETV.P33 §6.2.4).
- `criticality = Cao` ⇒ `recovery_time_objective`, `failover_plan` NOT NULL **và** ≥ 01 `risk_refs`;
  `review_cycle ≤ 1 năm` (`ETV.P33` Phụ lục I.1 điều kiện 5, ETV.P33 §6.1.3).
- `asset_class = Phần mềm – bản quyền` ⇒ `license_type` NOT NULL và `license_expiry` còn hiệu lực
  tại thời điểm phê duyệt (R21 — Phụ lục I.1 điều kiện 8).
- `asset_class = Máy tính điều khiển – thu thập dữ liệu` ⇒ `measuring_device_ref` NOT NULL.
- `discovery_source = Phát hiện chưa kiểm kê` ⇒ `inventory_due_at` = ngày lập + **30 ngày** (R17).
- `status = Đã thanh lý` ⇒ tồn tại bằng chứng xóa dữ liệu an toàn (`DisposalRecord` ← M27) **và**
  không còn `SystemAccount` hoạt động gắn với tài sản (R10 — ETV.P33 §6.6.1 bước 4, ETV.P33 §6.6.2).
- Chuyển sang `Ngừng vận hành` bị chặn khi còn nền tảng M35 ở trạng thái Hiệu lực, tài sản thông tin
  M27 còn lưu, hoặc thiết bị đo M05 còn được phục vụ (ETV.P33 §6.6.1 bước 2).
- `eol_date < hôm nay` **và** `status = Đang vận hành` ⇒ cần ≥ 01 `risk_refs` và kế hoạch thay thế
  có mốc thời gian (R11).

### Bảo trì

- `MaintenanceTask.change_ref` NOT NULL ⇒ `impact_assessment_ref` NOT NULL (R5).
- Tài sản là máy tính điều khiển thiết bị đo ⇒ `change_ref` **và** `measurement_impact_ref` NOT NULL
  trước khi `result` được ghi; sau khi áp dụng phải có `post_check_result` (R4 — ETV.P33 §6.3.4).
- `status = Hoàn thành` ⇒ `accepted_by` NOT NULL **và `accepted_by ≠ performed_by`** (R15 — Phụ lục
  II.2). Không có đường đi trực tiếp Đang thực hiện → Hoàn thành.
- `task_type = Bảo trì định kỳ` ⇒ `plan_ref` trỏ tới `MaintenancePlan` có `status = Đã phê duyệt`
  (R19); `MaintenancePlan.created_by ≠ approved_by`.
- `task_type = Vá lỗi bảo mật` ⇒ `severity` NOT NULL; `due_at` tính theo mốc 07/30/90 ngày của
  ETV.P33 §6.3.3.
- `emergency_order_ref` NOT NULL (thay đổi khẩn cấp theo lệnh LĐV) **không miễn** `change_ref` — vẫn
  bắt buộc bổ sung hồi tố, nếu không là thay đổi âm thầm (Phụ lục I.2).

### Tài khoản

- `SystemAccount.access_request_ref` NOT NULL (R6); `account_type = Đặc quyền – quản trị` ⇒
  `mfa_enabled = true`; `account_type = Dùng chung (ngoại lệ)` ⇒ `shared_approval_ref` NOT NULL.
- `secret_location` và `secret_issuer` NOT NULL — nhưng schema **không có** cột nào lưu mật khẩu,
  khóa, token, mã PIN, chứng thư số; kiểm tra mẫu trên mọi trường tự do của `SystemAccount`,
  `ITAsset` và `ITIncident` (R7 — Phụ lục I.1 điều kiện 7).
- `hr_event_ref` NOT NULL ⇒ `revocation_due_at` = cuối ngày làm việc phát sinh sự kiện (R16).
- **Không có thao tác xóa** `SystemAccount` — tài khoản bất thường chỉ được `Tạm khóa` cho tới khi
  PT.ATTT xem xét (ETV.P33 §6.4.3).
- `AccountReconciliation.status = Đã chốt` ⇒ bản ghi **bất biến**; kỳ `scope = Đặc quyền và dịch vụ`
  ⇒ `submitted_to_ldv_at` NOT NULL (R20).

### Sự cố

- `security_flag = true` ⇒ `security_incident_ref` NOT NULL, và **không cho đóng** phiếu trước khi
  M28 kết luận (R9 — ETV.P33 §6.5.3).
- `priority` suy ra từ `impact` theo bảng mục 4.6, nâng bắt buộc lên **Cao** khi tài sản có
  `criticality = Cao`, nền tảng ManLab ngừng, hoặc ảnh hưởng hệ thống thu thập dữ liệu đo.
- `priority = Cao` ⇒ `escalated_to_ldv_at` trong 01 giờ kể từ `reported_at` (R18).
- Đóng phiếu ⇒ `root_cause`, `resolution`, `asset_back_to_normal = true`, và **một trong hai**
  `lesson_ref` (← M26) hoặc `no_lesson_reason` NOT NULL (ETV.P33 §6.5.4).
- Sự cố thứ ≥ 3 trong 90 ngày trên cùng tài sản ⇒ `capa_ref` NOT NULL mới đóng được (R9).

### Chung

- `created_by ≠ approved_by`; `reviewed_by ≠ created_by` (R13 — ETV.P33 §5.3).
- **Không có thao tác xóa** bản ghi `ITAsset` ở tầng dữ liệu — chỉ chuyển trạng thái.
- Toàn bộ cờ đến hạn (rà soát · bảo trì · vá lỗi · bản quyền–bảo hành–EOL · quá hạn phản hồi sự cố ·
  tài sản chưa kiểm kê quá hạn · ngoài kế hoạch bảo trì năm) **không lưu cột riêng** — tính khi đọc;
  cần chỉ mục trên `eol_date`, `license_expiry`, `warranty_until`, `last_maintained_at`,
  `last_reviewed_at`, `due_at`, `response_due_at`, `inventory_due_at`.
- `max_classification` dùng chung enum `Classification` của M27, không khai báo lại.
