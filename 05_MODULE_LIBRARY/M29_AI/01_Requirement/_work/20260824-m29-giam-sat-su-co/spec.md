# SPEC — M29 Increment 4

Nguồn quy định: **ETV.P29** mục 5.1.7, 5.2.3, 5.7, 6.1, 6.3 (đã ban hành 24/8/2026) và
`DacTa.md` M29 mục 5 (quy tắc nghiệp vụ 9, 11).

## 1. DATA — thay đổi schema

### 1.1. Sửa enum/model đã có

| Đối tượng | Thay đổi | Lý do |
|---|---|---|
| `enum AIOpStatus` | **thêm** giá trị `SUSPENDED` | P29 6.1 trạng thái "Tạm dừng" của bản ghi hệ thống AI. Thêm giá trị vào enum Postgres là thao tác cộng thêm, không phá dữ liệu cũ |
| `model AIAgent` | thêm `suspendedReason String?`, `suspendedAt DateTime?` | Truy vết vì sao bị tạm dừng (AIA quá hạn / sự cố Nghiêm trọng) để tự phục hồi đúng nguyên nhân |
| `model AIAuditLog` | `actorId` → **nullable**; thêm `actorLabel String @default("")` | Sweep tự động phải ghi `actor = SYSTEM` (DacTa quy tắc 11) mà không mượn danh nghĩa một người thật. Nới NOT NULL → NULL không mất dữ liệu |

### 1.2. Model mới — `AIIncident` (Phiếu sự cố AI, F29.04)

| Trường | Kiểu | Ghi chú |
|---|---|---|
| `id` | cuid | |
| `seq` | Int autoincrement | |
| `code` | String @unique | `SCAI-YYYY-NNNN` |
| `severity` | `AIIncidentSeverity` | `SEVERE` / `SIGNIFICANT` / `MINOR` — P29 5.7.2 |
| `kind` | `AIIncidentKind` | `WRONG_OUTPUT`, `DATA_LEAK`, `PROMPT_INJECTION`, `PERMISSION_BREACH`, `BIAS`, `SERVICE_DISRUPTION`, `UNREGISTERED_AI`, `OTHER` |
| `agentId` | String? | Có thể trống khi sự cố đến từ AI chưa đăng ký |
| `platformId` | String? | |
| `traceId` | String? | Mã `AIRequest` liên quan |
| `occurredAt` / `detectedAt` | DateTime | |
| `detectedById` | String (FK User) | Người phát hiện |
| `description` | String | Diễn biến |
| `containmentAction` | String @default("") | Biện pháp khống chế |
| `affectsIssuedResult` | Boolean @default(false) | Ảnh hưởng kết quả/chứng chỉ **đã phát hành** |
| `issuedResultRef` | String? | Mã hồ sơ MP10/MP11 |
| `sensitiveDataExposed` | Boolean @default(false) | Lộ dữ liệu Hạn chế/Mật/cá nhân |
| `f28Ref` | String? | Số phiếu ETV.P.F28.03 |
| `capRef` | String? | Mã KPH theo MP13 |
| `assessedById` / `closedById` | String? (FK User) | |
| `closureNote` | String? | |
| `status` | `AIIncidentStatus` | `NEW` / `IN_PROGRESS` / `PENDING_CONFIRMATION` / `CLOSED` / `CANCELLED` |
| `cancelReason` | String? | |

### 1.3. Model mới — `AIUnregisteredSighting` (AI chưa đăng ký, F29.01 phần 3)

| Trường | Kiểu | Ghi chú |
|---|---|---|
| `code` | String @unique | `UAI-YYYY-NNN` |
| `name` | String | Tên hệ thống/dịch vụ AI bị phát hiện |
| `usedBy` | String | Người/đơn vị đang dùng |
| `detectedAt` | DateTime | |
| `detectedById` | String (FK User) | |
| `dataExposed` | String @default("") | Dữ liệu đã đưa vào |
| `sensitiveData` | Boolean @default(false) | Có dữ liệu Hạn chế/Mật/cá nhân |
| `incidentId` | String? (FK AIIncident) | Bắt buộc khi `sensitiveData = true` mới đóng được |
| `plannedAction` | String @default("") | |
| `dueDate` | DateTime | Mặc định `detectedAt + 15 ngày` (P29 5.1.7) |
| `registeredAgentId` | String? (FK AIAgent) | Bắt buộc khi đóng bằng `REGISTERED` |
| `closeReason` | String? | Bắt buộc khi `DISCONTINUED` |
| `status` | `AIUnregisteredStatus` | `OPEN` / `REGISTERING` / `REGISTERED` / `DISCONTINUED` |

## 2. BUSINESS RULES

### R1 — Sweep AIA quá hạn (P29 5.2.3)
Với mỗi `AIImpactAssessment` có `status = APPROVED` và `reviewDate < now`:
1. AIA → `REVIEW_REQUIRED`.
2. Agent tương ứng đang `ACTIVE` → `SUSPENDED`, `suspendedReason = "AIA_OVERDUE"`, `suspendedAt = now`.
3. Ghi `AIAuditLog` với `actorId = null`, `actorLabel = "SYSTEM"`, nêu rõ mốc `reviewDate`.

Hệ thống **chỉ phát hiện theo lịch**, không tự kết luận nội dung đánh giá — đúng DacTa quy tắc 11.

### R2 — Tự phục hồi
`aiaAction(..., "approve")` thành công → Agent đang `SUSPENDED` **với `suspendedReason = "AIA_OVERDUE"`**
trở lại `ACTIVE`, xóa `suspendedReason`/`suspendedAt`, ghi audit. Agent bị tạm dừng vì **sự cố**
(`suspendedReason = "INCIDENT:<code>"`) **không** tự phục hồi theo đường này — phải mở lại thủ công
sau khi đóng sự cố.

### R3 — Gateway kiểm tra trạng thái Agent (lỗ hổng đang có)
Thêm bước kiểm tra **ngay sau bước (3) "Agent tồn tại"**, giữ nguyên thứ tự các bước còn lại:
Agent `status !== ACTIVE` → từ chối `AGENT_NOT_ACTIVE`, kèm lý do tạm dừng nếu có.

### R4 — Vòng đời phiếu sự cố (P29 6.3)
| Từ | Hành động | Tới | Điều kiện |
|---|---|---|---|
| `NEW` | Bắt đầu xử lý | `IN_PROGRESS` | Bắt buộc có `containmentAction` |
| `IN_PROGRESS` | Trình xác nhận | `PENDING_CONFIRMATION` | — |
| `PENDING_CONFIRMATION` | Đóng | `CLOSED` | Xem R5 |
| `NEW`/`IN_PROGRESS`/`PENDING_CONFIRMATION` | Hủy | `CANCELLED` | Chỉ `SUPER_ADMIN`, bắt buộc lý do |

### R5 — Ràng buộc khi đóng sự cố (P29 5.7.3)
1. `closedById !== detectedById` — người phát hiện/liên quan trực tiếp không được đóng chính sự cố đó.
2. `severity = SEVERE` → chỉ `SUPER_ADMIN` (vai LĐV) được đóng; `SIGNIFICANT`/`MINOR` → `AI_ADMIN` trở lên.
3. `severity ∈ {SEVERE, SIGNIFICANT}` → bắt buộc `capRef` (KPH theo MP13).
4. `sensitiveDataExposed = true` → bắt buộc `f28Ref`.
5. `affectsIssuedResult = true` → bắt buộc `issuedResultRef` (MP10/MP11). Phần mềm **không** tự kết
   luận về hiệu lực kết quả — chỉ buộc khai báo mã hồ sơ đã xử lý ở thủ tục chuyên trách.

### R6 — Khống chế trước khi điều tra (P29 5.7.3 bước 1)
Lập phiếu sự cố `severity = SEVERE` có `agentId` → Agent chuyển `SUSPENDED` ngay trong cùng giao
dịch, `suspendedReason = "INCIDENT:<code>"`, ghi audit.

### R7 — AI chưa đăng ký (P29 5.1.7)
1. `dueDate` mặc định `detectedAt + 15 ngày`.
2. Đóng bằng `REGISTERED` → bắt buộc `registeredAgentId` trỏ tới Agent có thật.
3. Đóng bằng `DISCONTINUED` → bắt buộc `closeReason`.
4. `sensitiveData = true` → **không đóng được** (cả hai nhánh) khi chưa gắn `incidentId`.

### R8 — RBAC
| Nhóm quyền mới | AI_VIEWER | AI_OPERATOR | AI_ADMIN | AI_SECURITY_ADMIN | AI_AUDITOR | SUPER_ADMIN |
|---|---|---|---|---|---|---|
| `incidents` | r | rw (lập, xử lý) | rw | rw | r | rw |
| `unregistered` | — | r | rw | rw | r | rw |

Đóng sự cố `SEVERE` và Hủy phiếu vẫn chỉ `SUPER_ADMIN` (kiểm tra riêng trong rules, không nới ma trận).

## 3. API / ENTRY POINTS

| Điểm gọi | Mục đích |
|---|---|
| `POST /api/m29/sweep` | Cho cron ngoài gọi; xác thực bằng header `x-m29-sweep-token` khớp env `M29_SWEEP_TOKEN`. Không có token cấu hình → trả 503, **không** chạy mở |
| Sweep khi truy cập trang M29 | `maybeSweep()` chặn tần suất tối thiểu 15 phút/lần, chạy nền khi có người vào module |
| Nút "Kiểm tra ngay" | Giữ nguyên hành vi hiện có, nay gọi chung `sweep.ts` |

## 4. UI

| Trang | Nội dung |
|---|---|
| `/modules/M29` | Thêm 2 ô số liệu: **Sự cố AI đang mở**, **AI chưa đăng ký quá hạn**; cột Agent hiển thị trạng thái `Tạm dừng` kèm lý do; 2 link mới |
| `/modules/M29/incidents` | Danh sách phiếu sự cố + nút lập mới |
| `/modules/M29/incidents/new` | Form lập phiếu |
| `/modules/M29/incidents/[id]` | Chi tiết + các nút chuyển trạng thái theo R4/R5 |
| `/modules/M29/unregistered` | Danh sách + form ghi nhận + nút đóng theo R7 |

## 5. ACCEPTANCE CRITERIA

- **AC-01** AIA `APPROVED` có `reviewDate` quá khứ → sau sweep: AIA `REVIEW_REQUIRED`, Agent `SUSPENDED`, audit có dòng `actorLabel = SYSTEM`.
- **AC-02** Agent `SUSPENDED` gọi Tool qua Gateway → `AGENT_NOT_ACTIVE`, không phát sinh lời gọi tới nền tảng.
- **AC-03** Phê duyệt lại AIA → Agent trở lại `ACTIVE`, audit ghi lý do phục hồi.
- **AC-04** Lập phiếu sự cố `SEVERE` gắn Agent → Agent `SUSPENDED` ngay, `suspendedReason` chứa mã phiếu.
- **AC-05** Người phát hiện tự đóng phiếu → bị từ chối `SELF_CLOSE_FORBIDDEN`.
- **AC-06** Đóng phiếu `SEVERE` thiếu `capRef` → từ chối `CAP_REQUIRED`; thiếu `f28Ref` khi lộ dữ liệu → `F28_REQUIRED`.
- **AC-07** `AI_ADMIN` đóng phiếu `SEVERE` → từ chối; `SUPER_ADMIN` đóng được.
- **AC-08** Đóng bản ghi AI chưa đăng ký bằng `REGISTERED` mà không chọn Agent → `AGENT_REQUIRED`.
- **AC-09** Bản ghi AI chưa đăng ký có `sensitiveData` mà chưa gắn phiếu sự cố → không đóng được `INCIDENT_REQUIRED`.
- **AC-10** `/api/m29/sweep` không có token → 401; token đúng → chạy và trả số bản ghi đã xử lý.

## 6. NFR

- Không đổi hành vi 7 bước Gateway đang có, chỉ **chèn thêm** một bước.
- Sweep phải idempotent: chạy nhiều lần không tạo trùng audit cho cùng một AIA đã `REVIEW_REQUIRED`.
- Mọi thay đổi trạng thái đều ghi `AIAuditLog` (append-only) — giữ đúng DacTa quy tắc 2 và 7.
