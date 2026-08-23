# M26_TriThuc — Đặc tả API

> Nguồn sự thật: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md). Bảng dưới là bản dẫn
> xuất; chi tiết gate xem `01_Requirement/_work/20260823-dac-ta-m26/spec.md` mục 3.

## Mục tri thức (`KnowledgeItem`)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET | `/trithuc` | Nội bộ (lọc theo `confidentiality`) | Danh mục tri thức — lọc theo nhóm, dạng, mức trọng yếu, chủ sở hữu, trạng thái |
| POST | `/trithuc` | QLCL, TP | Tạo mục tri thức (Nháp) — tri thức hiện bắt buộc `source_ref`/`doc_ref`; tri thức ẩn bắt buộc `holders` ≥ 1 |
| GET | `/trithuc/{id}` | Nội bộ (theo phân quyền bảo mật) | Chi tiết mục; mục Hạn chế/Mật ghi nhật ký lượt xem |
| PUT | `/trithuc/{id}` | QLCL, TP (`owner`) | Sửa (chỉ khi chưa phê duyệt) |
| POST | `/trithuc/{id}/new-version` | QLCL, TP (`owner`) | Tạo phiên bản mới từ mục Đã phê duyệt (quy tắc 5) |
| POST | `/trithuc/{id}/submit-review` | Người lập | → Chờ soát xét (chặn nếu thiếu trường bắt buộc theo `knowledge_form`) |
| POST | `/trithuc/{id}/review` | TP (≠ người lập) | Đạt → Chờ phê duyệt; Không đạt → Không soát xét (**bắt buộc lý do**) |
| POST | `/trithuc/{id}/approve` | **LĐV** (bắt buộc khi `criticality = Cao`) | Đạt → Đã phê duyệt (chặn khi vi phạm quy tắc 3); Không đạt → Không phê duyệt (**bắt buộc lý do**) |
| POST | `/trithuc/{id}/mark-reviewed` | TP (`owner`) | Xác nhận đã rà soát định kỳ — cập nhật `last_reviewed_at` |
| POST | `/trithuc/{id}/retire` | LĐV, QLCL | → Hết hiệu lực (**bắt buộc lý do**); **gỡ chỉ mục AI trong cùng giao dịch** |
| POST | `/trithuc/{id}/cancel` | LĐV | → Hủy (chỉ khi chưa phê duyệt, **bắt buộc lý do**) |
| POST | `/trithuc/{id}/ai-index` | QLCL + Quản trị hệ thống | Bật/tắt `ai_indexed` — chỉ với mục Đã phê duyệt và `confidentiality ∈ {Công khai, Nội bộ}` (quy tắc 10) |
| GET | `/trithuc/due-review` | QLCL, TP | Mục đến hạn rà soát (tính khi đọc theo `review_cycle`) |
| GET | `/trithuc/knowledge-risk` | QLCL, LĐV | Mục trọng yếu là tri thức ẩn, số người giữ ≤ 1 — đầu vào M01 |
| GET | `/trithuc/{id}/audit` | Quản trị | Nhật ký thao tác và lượt truy cập |

## Bài học kinh nghiệm (`LessonLearned`)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET/POST | `/trithuc/lessons` | Nội bộ (đọc) · QLCL, TP, Nhân viên (tạo) | Danh sách / gửi bài học kinh nghiệm — bắt buộc `source_type` + `source_ref` |
| PUT | `/trithuc/lessons/{id}` | QLCL, TP | Bổ sung phân tích, bài học, khuyến nghị |
| POST | `/trithuc/lessons/{id}/link-item` | QLCL, TP | Gắn `knowledge_item_ref` (tạo mới hoặc trỏ mục hiện có) |
| POST | `/trithuc/lessons/{id}/approve` | **LĐV** | → Đã phê duyệt — **chặn nếu chưa có `knowledge_item_ref`** (quy tắc 7) |
| POST | `/trithuc/lessons/{id}/cancel` | LĐV | → Hủy (**bắt buộc lý do**) |

## Nhu cầu tri thức (`KnowledgeNeed`)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET/POST | `/trithuc/needs` | QLCL, TP | Danh sách / tạo nhu cầu — bắt buộc `trigger` + `trigger_ref` + `required_by` |
| PUT | `/trithuc/needs/{id}` | QLCL, TP | Cập nhật cách bổ sung, người chịu trách nhiệm |
| POST | `/trithuc/needs/{id}/fulfill` | QLCL, TP | → Đã đáp ứng — **chặn nếu thiếu `result_ref`** (quy tắc 8) |
| POST | `/trithuc/needs/{id}/waive` | **LĐV** | → Không thực hiện (**bắt buộc lý do**) |

## Chia sẻ tri thức (`SharingEvent`)

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET/POST | `/trithuc/sharing` | QLCL, TP | Danh sách / lập kế hoạch chia sẻ — chỉ chọn mục Đã phê duyệt (quy tắc 12) |
| POST | `/trithuc/sharing/{id}/complete` | QLCL, TP | → Đã thực hiện; `form = Đào tạo nội bộ` bắt buộc `evidence_ref` → M03 |
| POST | `/trithuc/sharing/{id}/cancel` | QLCL, TP | → Hủy (**bắt buộc lý do**) |

## Đầu ra

| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET | `/trithuc/export/{F26.01\|F26.02\|F26.03\|F26.04}` | QLCL | Xuất biểu mẫu (chỉ bản ghi Đã phê duyệt/Đã thực hiện) |
| GET | `/trithuc/report/m17` | QLCL, LĐV | Trích xuất tình hình tri thức phục vụ xem xét lãnh đạo (M17) |

> Mọi thao tác đổi trạng thái ghi AuditLog; vi phạm quy tắc → 409 kèm mã lỗi. Mục ở trạng thái
> **Đã phê duyệt / Hết hiệu lực** không có đường ghi nào ngoài `mark-reviewed`, `retire`,
> `new-version` và `ai-index`.
