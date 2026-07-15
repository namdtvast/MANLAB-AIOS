# M10_DamBaoKQ — Mô hình dữ liệu

## Thực thể lõi
| Thực thể | Ý nghĩa | Khóa/Quan hệ chính |
|---|---|---|
| `AssurancePlan` | Kế hoạch bảo đảm hiệu lực (F10.01) | PK `id`; `year`, `department`, `risk_level`, `status` |
| `PlanItem` | Dòng kế hoạch: quy trình–đối tượng–hoạt động–tần suất | FK `plan_id`; `activity_type`, `frequency`, `criteria_id`, `assignee_id` |
| `Assessment` | Hồ sơ P10 (một hoạt động thực hiện) | PK `id`; FK `plan_id`, `procedure_id`, `object_id`; `record_type`, `result`, `status` |
| `Indicator` | Chỉ số đánh giá của hồ sơ | FK `assessment_id`; `type` (z/En/zeta/bias/recovery/rsd/u_hom/u_stab/U_CRM), `value`, `threshold`, `verdict` |
| `Publication` | Công bố trạng thái P10 (F10.09) | PK `id`; FK `assessment_id`; UNIQUE `source_certificate_id`+`version`; `publication_status`, `release_allowed`, `expires_at` |
| `Personnel` | Nhân sự thực hiện/được đánh giá | FK (← M03); F10.03 liên kết `F03.02` |
| `Equipment` / `ReferenceStandard` | Thiết bị · chuẩn/chất chuẩn | n–n với `Assessment` (← M05) |
| `Method` | Quy trình/phương pháp | FK (← M08) |
| `Evidence` | Tệp bằng chứng/dữ liệu thô | FK `assessment_id`; `checksum`, phân loại bảo mật |
| `Capa` | Liên kết KPH/CAPA | FK `assessment_id` (→ M13) |
| `Version` | Phiên bản/thay thế | self-FK `replaces_id` |
| `AuditLog` | Nhật ký thao tác | FK `assessment_id`; `actor, role, action, from_status, to_status, before, after, reason, ts, corr_id`; append-only |

## Trạng thái vòng đời (Assessment)
`NHÁP → ĐÃ GỬI DUYỆT → CHỜ SOÁT XÉT → (TRẢ LẠI | ĐÃ SOÁT XÉT) → (TỪ CHỐI | ĐÃ PHÊ DUYỆT) → ĐÃ CÔNG BỐ → HẾT HIỆU LỰC/THU HỒI`. Nhánh không đạt: `CẢNH BÁO|KHÔNG ĐẠT → KHÓA PHÁT HÀNH → KPH/CAPA → KHÔI PHỤC|THU HỒI`.

## Ánh xạ Publication ↔ F11.03
| `publication_status` | `release_allowed` | Xử lý tại F11.03 |
|---|---|---|
| PASS | true | Cho phép phát hành |
| CONDITIONAL | true (có điều kiện) | Kiểm tra điều kiện, người phê duyệt, hạn |
| WARNING | false đến khi phê duyệt | Chuyển LĐP/LĐV |
| FAIL/BLOCKED | false | Khóa nút phát hành; mở/liên kết CAPA |
| EXPIRED/MISSING | false | Yêu cầu đánh giá hoặc gia hạn P10 |

## Ràng buộc
- `UNIQUE(assessment_id)`; `Publication` duy nhất theo `source_certificate_id` + `version`.
- `Indicator.value NOT NULL` khi hồ sơ có tiêu chí định lượng; `verdict` ∈ {ĐẠT, CẢNH BÁO, KHÔNG ĐẠT}.
- `Assessment.result = KHÔNG ĐẠT` ⇒ bắt buộc tồn tại `Capa` liên kết trước khi rời khóa phát hành.
- `Publication.release_allowed = true` chỉ khi `status = ĐÃ PHÊ DUYỆT` và còn hiệu lực (`expires_at` chưa qua).
- Bản đã phê duyệt không sửa trực tiếp — tạo `Version` mới; `AuditLog` append-only, không sửa/xóa.
- `source_snapshot_at` lưu thời điểm sao chép từ F11.03; cảnh báo khi bản nguồn thay đổi sau mốc này.
