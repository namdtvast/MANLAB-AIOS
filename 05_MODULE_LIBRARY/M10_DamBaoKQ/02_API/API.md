# M10_DamBaoKQ — Đặc tả API

> REST, JSON. Mọi thao tác đổi trạng thái đều ghi `AuditLog` (append-only). Phân quyền theo vai trò.
> Mô hình dữ liệu: [`../03_Database/DataModel.md`](../03_Database/DataModel.md). Nghiệp vụ: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md).

## 1. Kế hoạch bảo đảm hiệu lực (F10.01)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| POST | `/plans` | Người lập | Tạo kế hoạch (Nháp) |
| GET | `/plans/{id}` | Nội bộ | Xem kế hoạch + dòng `PlanItem` |
| PUT | `/plans/{id}` | Người lập | Sửa (khi Nháp) |
| POST | `/plans/{id}/items` | Người lập | Thêm dòng kế hoạch (quy trình–đối tượng–tần suất) |

## 2. Hồ sơ P10 (Assessment — F10.02–F10.08)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| POST | `/assessments` | Người lập | Tạo hồ sơ **Nháp**; body có `record_type`, `plan_id` |
| GET | `/assessments` | Nội bộ | Danh sách + lọc `record_type,status,result,from,to,actor` (trang `P10-L`) |
| GET | `/assessments/{id}` | Nội bộ | Chi tiết + indicators + evidence + luồng (trang `P10-D`) |
| PUT | `/assessments/{id}` | Người lập | Sửa (chỉ khi **Nháp**) |
| POST | `/assessments/{id}/indicators` | Người lập | Ghi chỉ số theo `record_type` (z/En/zeta/bias/…) |
| POST | `/assessments/{id}/evidence` | Người lập | Tải dữ liệu thô/bằng chứng (`checksum`) |
| POST | `/assessments/{id}/submit-review` | Người lập | Nháp → **Chờ soát xét** (chặn nếu thiếu trường*/dữ liệu — `MISSING_REQUIRED`) |
| POST | `/assessments/{id}/review` | **LĐP** | `decision=approve\|return` (+`reason` nếu return) |
| POST | `/assessments/{id}/approve` | **LĐV** | → **Đã phê duyệt** (chặn nếu `result=KHÔNG ĐẠT` chưa có CAPA) |
| POST | `/assessments/{id}/reject` | **LĐV** | Từ chối (+`reason`) → tạo phiên bản chỉnh sửa |
| POST | `/assessments/{id}/link-capa` | LĐV/QLCL | Liên kết KPH/CAPA (→ M13) khi CẢNH BÁO/KHÔNG ĐẠT |
| POST | `/assessments/{id}/new-version` | Người lập | Tạo `Version` mới (thay bản đã phê duyệt), giữ bản trước |
| GET | `/assessments/{id}/audit` | Quản trị/ĐGV | Nhật ký thao tác |

## 3. Công bố nội bộ (Publication — F10.09, trang `P10-PUB`)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| POST | `/assessments/{id}/import-source` | **LĐV** | Nạp từ `F11.03` (← M11): lưu `source_certificate_id` + `source_snapshot_at`, khóa sửa dữ liệu nguồn |
| POST | `/assessments/{id}/publish` | **LĐV** | Chốt F10.09: đặt `publication_status`, `release_allowed`, `expires_at` → **Đã công bố** |
| GET | `/assessments/{id}/publication` | Nội bộ | Trạng thái công bố hiện hành |

## 4. KPI (trang `P10-DASH`)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET | `/kpi/summary` | QLCL/LĐV | Tỉ lệ ĐẠT/CẢNH BÁO/KHÔNG ĐẠT, số KPH mở, trễ hạn theo kỳ/phòng |
| GET | `/kpi/indicators` | QLCL | Phân bố z/En/bias… theo `record_type`/thời gian |

## 5. Quy ước phản hồi & mã lỗi

- Vi phạm quy tắc nghiệp vụ → `409 Conflict` kèm mã lỗi:

| Mã lỗi | Tình huống |
|---|---|
| `NOT_DRAFT` | Sửa hồ sơ không ở trạng thái Nháp |
| `MISSING_REQUIRED` | Thiếu trường bắt buộc/dữ liệu thô/bằng chứng theo `record_type` (R2) |
| `REASON_REQUIRED` | Trả lại/Từ chối/Không đạt thiếu `reason` (R3) |
| `SELF_REVIEW_FORBIDDEN` | Người tạo tự soát xét/tự phê duyệt (R8) |
| `CAPA_REQUIRED` | `result=KHÔNG ĐẠT`/`FAIL-BLOCKED` chưa liên kết CAPA (R4) |
| `RELEASE_BLOCKED` | Phát hành khi `release_allowed=false` (R4/R7) |
| `SOURCE_CHANGED` | Bản nguồn F11.03 đổi sau `source_snapshot_at` (R1) |
| `APPROVED_IMMUTABLE` | Ghi đè bản đã phê duyệt (R6) — phải dùng `new-version` |

- `403 Forbidden` khi sai vai trò; `422` khi dữ liệu không hợp lệ.
- Đầu ra AI (← M29) chỉ ở trường gợi ý/cờ; API **không** có endpoint để AI tự phê duyệt hay đổi kết luận (R5).
