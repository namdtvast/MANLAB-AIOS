# M01_RuiRo — Đặc tả xây dựng mới (Increment 4, aios-platform)

Khác M10/M21/M29 (di trú từ `08_Source` thật), M01 **không có nguyên mẫu code** — `08_Source/`
chỉ có `.gitkeep`. Nguồn duy nhất là `01_Requirement/DacTa.md` (đã transcribe từ
`ETV.P01_RuiRoCoHoi.md`, Đã phê duyệt, lần 03) + trực tiếp đọc lại mục V (RACI), 6.1, Phụ lục A
(thiết kế UI gốc) của thủ tục để lấy chi tiết state machine không có trong bản DacTa rút gọn.

## OUTCOME

- **WHO**: 3 vai trò module — NV (nhân viên đề xuất/thực hiện), TP_QLCL (Trưởng phòng/QLCL —
  soát xét + phê duyệt hầu hết trường hợp), LDV (Lãnh đạo Viện — chỉ quyết định khi rủi ro Rất
  cao hoặc khi TP/QLCL và người thực hiện/thẩm xét không thống nhất).
- **WHAT**: số hóa vòng đời Rủi ro (`RiskItem`) và Cơ hội (`OpportunityItem`) — đề xuất → soát
  xét → phê duyệt (hoặc chuyển LĐV nếu Rất cao) → phân công → thực hiện → thẩm xét → hoàn thành.
- **WHY**: ISO/IEC 17025 §8.5 + ISO 9001 §6.1 bắt buộc PTN có quy trình quản lý rủi ro/cơ hội có
  hồ sơ, đúng RACI đã duyệt — hiện tại thủ tục ETV.P01 vận hành thủ công (giấy `ETV.P.F01.01`).
- **SUCCESS CRITERIA**: tạo/soát xét/phê duyệt/thực hiện/thẩm xét được cả 2 loại (Rủi ro, Cơ
  hội) qua Browser với 3 tài khoản vai trò thật; `risk_score` luôn tự tính; gate Rất cao chặn
  đúng; nhật ký ghi đủ vết ai/khi nào/gì.

## Data model — map DacTa.md → Prisma

Additive, không sửa model M10/M21/M29/PlatformModule hiện có, theo đúng convention `Mxx<Entity>`
+ `Mxx<Entity>AuditEntry` đã dùng.

### `M01RiskItem` (← Rủi ro, DacTa.md §2.1)

| DacTa field | Prisma field | Ghi chú |
|---|---|---|
| code | `code` String @unique | sinh `RR-YYYY-NNNN`, cùng cơ chế `seq` autoincrement như M10Assessment.code |
| title | `title` String | |
| description | `description` String | |
| source | `source` enum `M01Source` | 7 giá trị mục 4.1 DacTa (đánh giá nội bộ/xem xét lãnh đạo/đề xuất NV/phàn nàn/đánh giá bên ngoài/TNTT-SSLP/khác) |
| cause | `cause` String? | bắt buộc trước khi gửi soát xét — validate ở rules.ts, không NOT NULL ở DB (giữ Đang soạn tự do) |
| severity (S) | `severity` Int? | 1–5 |
| possibility (P) | `possibility` Int? | 1–5 |
| risk_score (R) | `riskScore` Int? | **server tính lại khi lưu**, không nhận trực tiếp từ client — R = S×P |
| risk_level | `riskLevel` enum `M01RiskLevel?` | suy ra từ R lúc tính riskScore — THAP(1-3)/TRUNGBINH(4-8)/CAO(9-15)/RATCAO(16-25) |
| control_measure | `controlMeasure` String? | bắt buộc trước khi gửi soát xét |
| assignee | `assigneeId` String? → User | gán lúc phê duyệt |
| due_date | `dueDate` DateTime? | gán lúc phê duyệt |
| status | `status` enum `M01Status` | xem state machine dưới |
| evidence | `evidence` String? | nộp lúc thực hiện xong |
| verify_result | `verifyResult` enum `M01VerifyResult?` | DAT / CHUA_DAT |
| — | `verifiedById` String? → User | người thẩm xét — **khác `assigneeId`**, validate ở rules |
| — | `createdById` String → User | |
| — | `reviewedById` String? → User | |
| — | `approvedById` String? → User | LĐV chỉ set khi mức Rất cao đi qua nhánh LĐV |

### `M01OpportunityItem` (← Cơ hội, DacTa.md §2.2)

Không có `severity/possibility/riskScore/riskLevel/verifyResult` (đúng ghi chú DacTa "Cơ hội
không có điểm số P/S/R"). Cùng state machine rút gọn (không có nhánh Rất cao/LĐV vì cơ hội không
có điểm rủi ro để kích hoạt ngưỡng đó).

| DacTa field | Prisma field |
|---|---|
| code | `code` String @unique — `CH-YYYY-NNNN` |
| title / description | `title` / `description` |
| source | `source` enum `M01OppSource` (Đánh giá nội bộ/Đề xuất nhân viên/Phản hồi khách hàng/Khác) |
| proposed_action | `proposedAction` String? |
| assignee / due_date | `assigneeId` / `dueDate` |
| status | `status` enum `M01Status` (dùng chung enum, cơ hội không đi qua PENDING_LEADER_APPROVAL) |
| — | `createdById`, `reviewedById`, `approvedById`, `verifiedById` |
| — | `evidence`, `verifyResult` — **có giữ** vì Phụ lục A menu F01.02 cũng có "theo dõi tiến độ xử lý" và cần đóng hồ sơ có bằng chứng, dù bản gốc không nhấn mạnh bước thẩm xét riêng cho Cơ hội như Rủi ro. Quyết định phạm vi #2 (xem dưới) |

### `M01AuditEntry` — mirror `M10AuditEntry`/`M21AuditEntry`

`id, itemType (enum RISK/OPPORTUNITY), itemId (String, không FK 2 chiều — trỏ 1 trong 2 bảng),
ts, actorId, role, action, reason`. Dùng `itemType+itemId` thay vì 2 quan hệ optional riêng để
không phải sửa lại nếu sau này gộp/tách bảng.

## State machine — `M01Status`

Nguồn: DacTa.md §5 (quy tắc 2–7) + đọc lại `ETV.P01` mục 6.1 bước 4 + Phụ lục A ("người soát xét
đưa ra nhận xét, chuyển tiếp; người phê duyệt xác nhận") + mục V RACI (LĐV chỉ A/R khi Rất cao).

```
DRAFT --submit--> PENDING_REVIEW
PENDING_REVIEW --review(return)--> DRAFT (bắt buộc reason)
PENDING_REVIEW --review(approve), risk_level != RAT_CAO--> IN_PROGRESS (gán assignee+due_date)
PENDING_REVIEW --review(approve), risk_level == RAT_CAO--> PENDING_LEADER_APPROVAL
PENDING_LEADER_APPROVAL --leaderDecide(approve)--> IN_PROGRESS (gán assignee+due_date, approvedById=LĐV)
PENDING_LEADER_APPROVAL --leaderDecide(reject)--> DRAFT (bắt buộc reason)
IN_PROGRESS --submitEvidence--> IN_PROGRESS (đặt evidence, không đổi status — chờ thẩm xét)
IN_PROGRESS --verify(dat)--> DONE
IN_PROGRESS --verify(chuadat)--> IN_PROGRESS (yêu cầu bổ sung — reason bắt buộc, KHÔNG tự đóng)
```

Field bảng DacTa liệt kê đúng 5 nhãn "Đang soạn/Đang soát xét/Đã phê duyệt/Đang xử lý/Hoàn
thành" — không có "Đã phê duyệt" như 1 status persist riêng trong máy trạng thái trên vì mục 6.1
bước 4 mô tả phê duyệt VÀ phân công xảy ra cùng lúc ("Sau khi các đề xuất... được duyệt thực hiện
thì Trưởng phòng PTN/QLCL phân công") — nhãn "Đã phê duyệt" dùng cho action log/hiển thị tức
thời, DB đi thẳng `PENDING_REVIEW → IN_PROGRESS`. **Quyết định phạm vi #1** — cần LĐP xác nhận
khi rà soát lại, không phải điều thủ tục quy định tường minh bằng con số trạng thái riêng.

`PENDING_LEADER_APPROVAL` là state MỚI không có tên tường minh trong bảng field rút gọn của
DacTa — suy ra bắt buộc phải có để lập trình đúng RACI "LĐV quyết định cuối cùng" khi Rất cao
(DacTa quy tắc 5). **Quyết định phạm vi #2**.

Quy tắc 7 (DacTa) "người thực hiện và người thẩm xét không thống nhất → trình TP/QLCL quyết định
cuối" — **không mô hình hoá riêng** ở Increment này: verify(chuadat) đã đưa hồ sơ về IN_PROGRESS
với `reason`, đủ để TP/QLCL (đã là actor thấy toàn bộ danh sách + nhật ký) can thiệp thủ công
bằng cách trao đổi ngoài hệ thống hoặc tự thực hiện `verify` với vai trò TP_QLCL nếu cần đảo kết
luận. Không thêm state riêng cho "tranh chấp" vì DacTa không có trường dữ liệu nào mô tả cách ghi
nhận sự bất đồng đó cụ thể. **Quyết định phạm vi #3 — cần xác nhận khi có phản hồi thực tế.**

## Vai trò → gate hành động

| Hành động | Role yêu cầu | Điều kiện thêm |
|---|---|---|
| Tạo hồ sơ (Đang soạn) | bất kỳ user đã đăng nhập + có vai trò M01 | |
| Sửa khi Đang soạn | NV = `createdById` (hoặc TP_QLCL/LDV) | |
| Gửi soát xét | `createdById` | `cause`+`control_measure`(Rủi ro)/`proposed_action`(Cơ hội) + severity/possibility (Rủi ro) đã có |
| Soát xét (approve/return) | TP_QLCL | không tự soát xét hồ sơ mình tạo (`createdById !== actor.id`, đồng nhất R6 của M10) |
| Quyết định LĐV (Rất cao) | LDV | chỉ khi `riskLevel === RAT_CAO` và status = PENDING_LEADER_APPROVAL |
| Nộp bằng chứng | `assigneeId` | status = IN_PROGRESS |
| Thẩm xét | TP_QLCL (không phải `assigneeId`) | status = IN_PROGRESS, đã có evidence |

## Chỉ tiêu Phụ lục B — KHÔNG xây riêng trong Increment này

DacTa.md §6 (4 công thức RSR/thời gian xử lý/tỷ lệ đạt/tỷ lệ lưu hồ sơ) là chỉ tiêu **báo cáo
tổng hợp định kỳ**, không phải business rule chặn giao dịch — để dành cho 1 increment
Dashboard/Report riêng (menu F01.03 Phụ lục A), không nằm trong scope xây CRUD+workflow lần này.
**Quyết định phạm vi #4.**

## Không trong phạm vi Increment này

- Menu **F01.03 Báo cáo** (biểu đồ, xuất PDF/Excel) — Phụ lục A có mô tả nhưng đây là tầng report
  độc lập, để increment sau.
- Thông báo tự động qua email — Phụ lục A "Tích hợp chung" mục 1 — ngoài phạm vi (chưa có hạ tầng
  gửi mail trong aios-platform).
- Ma trận rủi ro an toàn lao động/cháy nổ riêng (mục 6.3 nguồn, DacTa đã ghi chú rõ đây là quyết
  định phạm vi cần xác nhận lại — giữ nguyên chưa số hóa như DacTa đã nêu).
