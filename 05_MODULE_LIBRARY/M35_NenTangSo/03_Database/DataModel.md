# M35_NenTangSo — Mô hình dữ liệu

> Đồng bộ với **`ETV.P35`** (ban hành lần 01 ngày 24/08/2026). Chi tiết trường: [DacTa.md §2](../01_Requirement/DacTa.md).
> Đặc tả dùng `snake_case`; schema Prisma đã triển khai dùng `camelCase` (`api_base_url` ↔ `apiBaseUrl`).

## Thực thể

| Thực thể | Trường chính | Khóa/Quan hệ | Biểu mẫu |
|---|---|---|---|
| `AIPlatform` | `code` (duy nhất, in hoa), `name`, `category`, `environment`, `base_url`, `api_base_url`, `adapter_type`, `source_type`, `vendor`, `owner`, `technical_contact`, `criticality`, `data_classification`, `has_ai_component`, `health_check_enabled`, `health`, `review_cycle`, `version`, `approval_status` | PK `id`; 1—N `AIAgent`, `AITool`, `AIRequest` ([M29_AI](../../M29_AI/03_Database/DataModel.md)); 1—N các thực thể dưới | F35.01 §1 |
| `IntegrationPoint` | `counterpart`, `direction`, `data_kind`, `data_classification`, `auth_method`, `secret_location_ref`, `data_contract_ref` | FK `platform_id`; ref → M37 | F35.01 §2 |
| `PreOpAssessment` | `code`, `sections[]` (9 mục), `validation_ref`, `gate_checks[]` (7 điều kiện), `conclusion`, `status` | FK `platform_id`; ref → M06, M29 | F35.02 |
| `PlatformException` | `missing_conditions[]`, `reason`, `risk_ref`, `approved_by`, `deadline`, `status` | FK `platform_id`; ref → M01 | F35.01 §3 |
| `HealthCheckResult` | `checked_at`, `result`, `latency_ms`, `error` | FK `platform_id`; append-only | F35.03 B |
| `PlatformIncident` | `code`, `incident_type`, `detected_at`, `notified_at`, `downtime_minutes`, `security_flag`, `root_cause`, `recovered_at`, `capa_ref` | FK `platform_id`; ref → M28, M13, M26 | F35.03 A |
| `PlatformChange` | `change_type`, `before`, `after`, `proposed_by`, `reviewed_by`, `approved_by`, `m30_ref` | FK `platform_id`; ref → M30 | F35.03 C |
| `DecommissionRecord` | `reason`, `replacement_platform_id`, `dependency_checks[]`, `data_disposition[]`, `access_revocations[]`, `approved_by`, `effective_date` | FK `platform_id`; ref → M27/M34 | F35.04 |
| `AIAuditLog` | Dùng **chung** schema audit của M29_AI — không tạo bảng nhật ký riêng | append-only | — |

## Ràng buộc

**Định danh và phiên bản**
- `code` duy nhất toàn hệ thống; **không sửa** sau phê duyệt; **không tái sử dụng** `code` của nền tảng đã Hết hiệu lực/Hủy (giữ giá trị truy vết `AIAuditLog`).
- Cùng một phần mềm ở hai môi trường ⇒ **hai** bản ghi riêng, không gộp.
- Thay đổi lớn (đổi `environment`, nâng `criticality` lên Cao, nâng `data_classification` lên Hạn chế/Mật, đổi nhà cung cấp) ⇒ `version + 1` và `supersedes_ref` trỏ bản cũ; không sửa đè.

**Điều kiện chặn cứng khi phê duyệt** (ETV.P35 §6.2.3 — validate ở tầng application)
- `owner` và `technical_contact` bắt buộc, phải là người cụ thể đang làm việc tại Viện.
- `data_classification` bắt buộc và nhất quán với `PreOpAssessment`.
- `environment = PRODUCTION` ⇒ bắt buộc `PreOpAssessment.status = Đã phê duyệt` **và** `health_check_enabled = true`.
- `criticality = Cao` ⇒ bắt buộc `risk_refs[] ≥ 1` (M01) **và** `continuity_ref` (M31).
- `source_type = Thuê ngoài` **và** `data_classification ∈ {Hạn chế, Mật}` ⇒ bắt buộc `vendor_assessment_ref` (M06) còn hiệu lực.
- `has_ai_component = true` ⇒ bắt buộc `aia_ref` (M29).
- Mọi trường của `AIPlatform` và `IntegrationPoint` **cấm** chứa mật khẩu, khóa API, chứng thư số — chỉ `secret_location_ref` trỏ nơi lưu theo M28.
- Thiếu bất kỳ điều kiện nào ⇒ chỉ vào Hiệu lực được khi có `PlatformException` đang hiệu lực (LĐV duyệt, `deadline ≤ 90 ngày`, có `risk_ref`).

**Tham chiếu chéo**
- `adapter_type` phải khớp một `IAIPlatformAdapter` đã triển khai; `PlaceholderPlatformAdapter` không được dùng làm căn cứ cho nghiệp vụ tự động.
- Entity ở M29_AI (`AIAgent.platform_id`, `AITool.platform_id`, `AIRequest.platform_id`) **không** được trỏ tới `AIPlatform` không tồn tại, chưa phê duyệt, Hết hiệu lực hoặc đã Hủy.
- Không chuyển `AIPlatform` sang **Hết hiệu lực** khi còn Agent/Tool/Prompt (M29) hoặc dịch vụ số (M38) đang hoạt động — trả về **danh sách** đối tượng phụ thuộc.
- `data_disposition[]` phải hoàn tất trước `access_revocations[]` trong `DecommissionRecord`.

**Hai trục trạng thái tách biệt**
- `approval_status` = vòng đời hồ sơ (09 trạng thái, mục 6 của đặc tả).
- `health` = tình trạng vận hành, do tiến trình kiểm tra sức khỏe cập nhật, chỉ áp dụng cho bản ghi **Hiệu lực**, **không** kéo bản ghi quay lại soát xét/phê duyệt.
- Cờ tính khi đọc, **không** lưu thành trạng thái: *Đến hạn rà soát* (`last_reviewed_at + review_cycle`), *Ngoại lệ quá hạn khắc phục* (`PlatformException.deadline`).

**Nhật ký**
- Mọi đổi trạng thái, mọi `PlatformChange`, mọi lần bật/tắt kiểm tra sức khỏe ⇒ ghi `AIAuditLog` (ai, khi nào, giá trị trước/sau). Đổi `api_base_url`/`adapter_type`/`IntegrationPoint` của nền tảng đang có Agent/Tool hoạt động mà không ghi vết ⇒ **không cho lưu**.
- `HealthCheckResult` lưu 02 năm; hồ sơ nghiệp vụ lưu theo ETV.P15 (F35.01 vĩnh viễn · F35.02 vòng đời + 05 năm · F35.03 05 năm · F35.04 10 năm).
