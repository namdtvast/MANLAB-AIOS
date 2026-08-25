# M35_NenTangSo — Đặc tả API

> Đồng bộ với **`ETV.P35`** (ban hành lần 01 ngày 24/08/2026). Quy tắc nghiệp vụ: [DacTa.md §5](../01_Requirement/DacTa.md).
> Mọi thao tác đổi trạng thái ghi `AIAuditLog` (schema chung của M29_AI). Lỗi trả về thống nhất
> `{ traceId, errorCode, component, timestamp }`.

## 1. Bản ghi nền tảng

| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| GET | `/api/ai/platforms` | AI_VIEWER | Danh sách nền tảng, kèm `health` hiện tại. Lọc theo `environment`, `category`, `criticality`, `approval_status`, cờ `due_for_review` |
| POST | `/api/ai/platforms` | AI_ADMIN | Đăng ký nền tảng mới (Nháp). `code` trùng ⇒ `409 PLATFORM_CODE_TAKEN` (kể cả code của nền tảng đã Hủy — quy tắc 1) |
| GET | `/api/ai/platforms/{id}` | AI_VIEWER | Chi tiết 1 nền tảng kèm điểm tích hợp, ngoại lệ đang hiệu lực |
| PUT | `/api/ai/platforms/{id}` | AI_ADMIN | Sửa khi Nháp. Khi đang Hiệu lực: thay đổi **nhỏ** ghi thẳng; **cấu hình kết nối** tạo `PlatformChange` chờ duyệt; **lớn** ⇒ `409 REQUIRES_NEW_VERSION` (quy tắc 9) |
| POST | `/api/ai/platforms/{id}/submit-review` | Người lập | → Chờ soát xét. Thiếu trường bắt buộc ⇒ `422` kèm danh sách trường |
| POST | `/api/ai/platforms/{id}/review` | ĐMKT/TP (≠ người lập) | Đạt → Chờ phê duyệt; không đạt → Không soát xét (**bắt buộc** `reason`) |
| POST | `/api/ai/platforms/{id}/approve` | **LĐV** | → Đã phê duyệt. Thiếu 1 trong 7 điều kiện chặn cứng ⇒ `422 GATE_CHECK_FAILED` kèm danh sách điều kiện thiếu (quy tắc 5) |
| POST | `/api/ai/platforms/{id}/activate` | QTHT/ĐMKT | Đã phê duyệt → **Hiệu lực**. Yêu cầu `health_check_enabled = true` khi PRODUCTION hoặc `criticality ∈ {Cao, Trung bình}` |
| POST | `/api/ai/platforms/{id}/new-version` | AI_ADMIN | Tạo phiên bản mới (`version + 1`, `supersedes_ref`) cho thay đổi lớn |
| GET | `/api/ai/platforms/{id}/dependencies` | AI_VIEWER | Agent/Tool/Prompt (M29) + dịch vụ số (M38) đang trỏ tới nền tảng — dùng trước khi ngừng vận hành |
| GET | `/api/ai/platforms/{id}/audit` | AI_AUDITOR | Nhật ký thay đổi cấu hình (dùng `AIAuditLog` chung của M29_AI) |

## 2. Điểm tích hợp

| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| GET | `/api/ai/platforms/{id}/integrations` | AI_VIEWER | Danh sách điểm tích hợp |
| POST | `/api/ai/platforms/{id}/integrations` | AI_ADMIN | Thêm điểm tích hợp. Trường chứa chuỗi giống bí mật xác thực ⇒ `422 SECRET_NOT_ALLOWED` (quy tắc 11) |
| PUT | `/api/ai/integrations/{iid}` | AI_ADMIN | Sửa; với nền tảng có Agent/Tool hoạt động ⇒ bắt buộc sinh `AIAuditLog` (quy tắc 8) |
| POST | `/api/ai/integrations/{iid}/disconnect` | AI_ADMIN | → Đã cắt (**bắt buộc** `reason`) |

## 3. Đánh giá trước vận hành và ngoại lệ

| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| POST | `/api/ai/platforms/{id}/assessments` | CSH/ĐMKT | Lập hồ sơ F35.02 (Nháp) |
| PUT | `/api/ai/assessments/{aid}` | Người lập | Cập nhật 9 mục đánh giá + 7 điều kiện chặn cứng |
| POST | `/api/ai/assessments/{aid}/submit-review` · `/review` · `/approve` | Người lập · ĐMKT/TP · **LĐV** | Vòng đời hồ sơ F35.02 |
| POST | `/api/ai/platforms/{id}/exceptions` | **LĐV** | Mở ngoại lệ có thời hạn. Thiếu `risk_ref` hoặc `deadline > 90 ngày` ⇒ `422` (quy tắc 5) |
| POST | `/api/ai/exceptions/{eid}/close` | QLCL | → Đã khắc phục; hệ thống kiểm tra lại đủ 7 điều kiện |

## 4. Giám sát, sự cố, thay đổi

| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| GET | `/api/ai/platforms/{id}/health` | AI_VIEWER | Kết quả kiểm tra sức khỏe gần nhất (`health`, `last_error`, `last_health_check_at`) |
| GET | `/api/ai/platforms/{id}/health-history` | AI_VIEWER | Lịch sử `HealthCheckResult` (lưu 02 năm) |
| POST | `/api/ai/platforms/{id}/health-check` | QTHT (hoặc tiến trình nội bộ) | Chạy kiểm tra ngay. Adapter là `PlaceholderPlatformAdapter` ⇒ `501 ADAPTER_NOT_IMPLEMENTED` (quy tắc 3) |
| GET / POST | `/api/ai/incidents` | AI_VIEWER / ĐMKT | Danh sách và lập phiếu sự cố F35.03 |
| POST | `/api/ai/incidents/{iid}/close` | CSH | Đóng phiếu. Thiếu `root_cause`/`actions`/`recovered_at`/kết luận bài học ⇒ `422`; `security_flag = true` mà M28 chưa kết luận ⇒ `409 SECURITY_REVIEW_PENDING`; lặp ≥ 3 lần/90 ngày mà thiếu `capa_ref` ⇒ `422 CAPA_REQUIRED` (quy tắc 13–15) |
| GET | `/api/ai/platforms/{id}/changes` | AI_AUDITOR | Nhật ký thay đổi cấu hình (F35.03 phần C) |
| POST | `/api/ai/changes/{cid}/approve` | Theo `change_type` | Nhỏ = CSH · Cấu hình kết nối = CSH sau soát xét ĐMKT · Lớn = **LĐV** |

## 5. Ngừng vận hành

| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| POST | `/api/ai/platforms/{id}/decommission` | CSH | Lập phiếu F35.04 (Nháp) kèm phương án dữ liệu và thu hồi truy cập |
| POST | `/api/ai/decommissions/{did}/approve` | **LĐV** | → Đã phê duyệt (**bắt buộc** `reason`) |
| POST | `/api/ai/decommissions/{did}/execute` | ĐMKT/QTHT | Thực hiện cắt kết nối, thu hồi truy cập → bản ghi **Hết hiệu lực**. Còn Agent/Tool/dịch vụ số phụ thuộc ⇒ `409 DEPENDENTS_EXIST` kèm **danh sách**; `data_disposition[]` chưa xong ⇒ `409 DATA_NOT_DISPOSED` (quy tắc 16–17) |

## 6. Báo cáo

| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| GET | `/api/ai/platforms/reports/registry` | AI_VIEWER | Kết xuất F35.01 (6 phần) |
| GET | `/api/ai/platforms/reports/review-summary` | QLCL | Báo cáo tình hình nền tảng phục vụ M17 (ETV.P35 §6.8) |
| GET | `/api/ai/platforms/reports/downtime` | AI_VIEWER | Thống kê thời gian ngừng hoạt động theo `criticality` |

> Đây là API duy nhất quản trị *định danh* nền tảng. API quản trị Agent/Tool/Prompt chạy trên từng
> nền tảng (lọc theo `platform_id` trả về từ `/api/ai/platforms`) thuộc
> [M29_AI/02_API/API.md](../../M29_AI/02_API/API.md).
