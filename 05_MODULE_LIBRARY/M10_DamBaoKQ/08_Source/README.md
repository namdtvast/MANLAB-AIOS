# M10_DamBaoKQ — Mã nguồn tham chiếu (webapp + API)

Ứng dụng chạy thật minh hoạ module M10, **thực thi** control rules trong đặc tả. Kiến trúc client–server, **không phụ thuộc npm**:
- **API** (`api/`): Node built-in `http`, lưu file JSON — **nguồn xác thực** control rules.
- **Webapp** (`webapp/`): vanilla ES modules, gọi API qua `fetch`; server cũng phục vụ luôn file tĩnh.

## Chạy

```bash
cd api
node server.js            # http://localhost:8010 (đổi bằng PORT=... node server.js)
# server phục vụ cả API (/api/*) lẫn webapp (/) trên cùng cổng
```

> Có sẵn cấu hình `.claude/launch.json` tên `m10-api`. Dữ liệu khởi tạo từ seed vào `api/data/data.json` (đã gitignore). `POST /api/reset` để đặt lại.

## Cấu trúc

| File | Vai trò |
|---|---|
| `api/server.js` | HTTP server: định tuyến `/api/*` + phục vụ webapp tĩnh, chống path-traversal |
| `api/rules.mjs` | **Control rules R1–R8** (server authoritative): validation, guard phân quyền, transition |
| `api/store.mjs` | Lưu file JSON + audit trail append-only |
| `api/model.mjs` | Enum trạng thái/kết quả, người dùng theo vai, dữ liệu seed |
| `webapp/src/apiClient.js` | `fetch` tới `/api`, gửi vai qua header `X-Role` |
| `webapp/src/store.js` | Cache client, gọi API, làm mới sau mỗi hành động |
| `webapp/src/rules.js` · `model.js` | Bản client cho hiển thị/gating tức thời (server vẫn là nguồn xác thực) |
| `webapp/src/app.js` | Render 5 màn: Danh sách · Tạo · Chi tiết/workflow · Công bố F10.09 · Dashboard |
| `webapp/styles.css` | Design tokens (petrol teal + 3 màu semantic), sáng/tối, responsive |

## Endpoint chính (khớp [`../02_API/API.md`](../02_API/API.md))

| Method | Endpoint | Ghi chú |
|---|---|---|
| GET/POST | `/api/assessments` | danh sách · tạo Nháp |
| GET/PUT | `/api/assessments/:id` | chi tiết · sửa Nháp |
| POST | `/api/assessments/:id/submit-review` · `/review` · `/approve` · `/publish` | chuyển trạng thái |
| POST | `/api/assessments/:id/link-capa` · `/new-version` | R4 · R6 |
| GET | `/api/assessments/:id/audit` · `/api/kpi/summary` | nhật ký · KPI |

Vi phạm quy tắc trả **409** kèm mã lỗi (`MISSING_REQUIRED`, `REASON_REQUIRED`, `SELF_REVIEW_FORBIDDEN`, `CAPA_REQUIRED`, `NOT_DRAFT`, `BAD_STATE`).

## Quy tắc được thực thi (khớp [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md) §3)

| # | Thực thi (server) |
|---|---|
| R2 | Chặn gửi soát xét nếu thiếu trường bắt buộc/dữ liệu thô/bằng chứng theo `record_type` |
| R3 | Trả lại / Từ chối bắt buộc nhập lý do |
| R4 | KHÔNG ĐẠT khóa phê duyệt/phát hành cho tới khi liên kết KPH-CAPA |
| R6 | Nhật ký append-only; sửa bản đã phê duyệt → tạo phiên bản mới |
| R8 | Tách tạo–soát xét–phê duyệt; không ai tự soát xét/tự phê duyệt hồ sơ mình tạo |
| Công bố | Bảng trạng thái PASS/CONDITIONAL/WARNING/FAIL-BLOCKED/EXPIRED khống chế phát hành |
| AI | Chỉ gắn cờ cảnh báo; không có endpoint "AI tự duyệt" |

## Phạm vi & bước sau
Lưu trữ file JSON thay cho CSDL thật; xác thực bằng header `X-Role` thay cho đăng nhập thật. Lên production: thay `store.mjs` bằng CSDL (khớp [`../03_Database/DataModel.md`](../03_Database/DataModel.md)) và thêm xác thực/phân quyền thật — **giữ nguyên `rules.mjs`**. Bản mock tĩnh trước đó: [`../04_UI/mockup/`](../04_UI/mockup).
