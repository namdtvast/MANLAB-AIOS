# M33_HeThongTT — Mô hình dữ liệu

> Nguồn sự thật: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md) mục 2 (danh sách trường
> đầy đủ). Bảng dưới là bản dẫn xuất ở mức thực thể/quan hệ.

## Thực thể chính

| Thực thể | Ý nghĩa | Khóa/Quan hệ |
|---|---|---|
| `ITAsset` | Cấu phần hạ tầng CNTT | PK `id`; `code` duy nhất; `serial` duy nhất khi có; FK `custodian`/`user_owner` → User; FK nhiều-nhiều `platform_refs` → M35, `info_asset_refs` → M27, `risk_refs` → M28/M01; FK `measuring_device_ref` → M05; FK `maintenance_contract_ref` → M07 |
| `MaintenanceTask` | Bảo trì, vá lỗi, cập nhật | PK `id`; FK nhiều-nhiều `asset_refs` → `ITAsset`; FK `change_ref` → M30; FK `impact_assessment_ref` → M28; FK `measurement_impact_ref` → M10 |
| `SystemAccount` | Tài khoản trên hệ thống/nền tảng | PK `id`; FK `asset_ref` → `ITAsset` **hoặc** `platform_ref` → M35; FK `access_request_ref` → M28; FK `holder` → User |
| `ITIncident` | Sự cố kỹ thuật và yêu cầu hỗ trợ | PK `id`; FK nhiều-nhiều `asset_refs` → `ITAsset`; FK `security_incident_ref` → M28, `platform_incident_ref` → M35, `measurement_impact_ref` → M10, `capa_ref` → M13, `maintenance_ref` → `MaintenanceTask` |
| `AuditLog` | Nhật ký thao tác | FK tới 4 thực thể trên; **append-only** |

## Ràng buộc

- `code` duy nhất trên cả 4 thực thể; `serial` duy nhất trong phạm vi thiết bị vật lý.
- `custodian` và `user_owner` NOT NULL trên mọi `ITAsset` (R1).
- `max_classification ∈ {Hạn chế, Mật}` ⇒ `disk_encryption = true`; thiết bị đầu cuối ⇒
  `screen_lock = true` **và** `antimalware = true` (R3 — `ETV.P28` mục 5.7.2).
- `is_personal_device = true` **và** `max_classification ∈ {Hạn chế, Mật}` ⇒ phải có phê duyệt LĐV
  + `risk_refs` → M28 (R3).
- `asset_class = Máy tính điều khiển – thu thập dữ liệu` ⇒ `measuring_device_ref` NOT NULL; mọi
  `MaintenanceTask` đổi cấu hình trên tài sản này ⇒ `change_ref` **và** `measurement_impact_ref`
  NOT NULL trước khi `result` được ghi (R4).
- `MaintenanceTask.change_ref` NOT NULL ⇒ `impact_assessment_ref` NOT NULL (R5).
- `environment ≠ Vận hành` ⇒ không được gán `info_asset_refs` chứa dữ liệu khách hàng nếu thiếu phê
  duyệt LĐV (R5 — cấm dữ liệu thật trong môi trường kiểm thử).
- `SystemAccount.access_request_ref` NOT NULL (R6); `account_type = Đặc quyền – quản trị` ⇒
  `mfa_enabled = true`; `account_type = Dùng chung (ngoại lệ)` ⇒ `shared_approval_ref` NOT NULL.
- `SystemAccount` **không có** cột nào lưu mật khẩu/khóa/token; kiểm tra mẫu trên trường tự do (R7).
- `status = Đã thanh lý` ⇒ tồn tại bằng chứng xóa dữ liệu an toàn (`DisposalRecord` ← M27) (R10).
- `eol_date < hôm nay` **và** `status = Đang vận hành` ⇒ cần ≥ 1 `risk_refs` (R11).
- `ITIncident.security_flag = true` ⇒ `security_incident_ref` NOT NULL; đóng sự cố lặp ≥ 3 lần/90
  ngày trên cùng tài sản ⇒ `capa_ref` NOT NULL (R9).
- `created_by ≠ approved_by`; `reviewed_by ≠ created_by` (R13).
- **Không có thao tác xóa** bản ghi `ITAsset` ở tầng dữ liệu — chỉ chuyển trạng thái.
- Bốn cờ đến hạn (rà soát · bảo trì · vá lỗi · bản quyền–bảo hành–EOL) **không lưu cột riêng** —
  tính khi đọc.
