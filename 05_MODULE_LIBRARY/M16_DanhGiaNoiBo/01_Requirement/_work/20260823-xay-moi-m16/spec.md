# M16_DanhGiaNoiBo — Đặc tả xây dựng mới (Increment 8, aios-platform)

Không có `08_Source` nguyên mẫu (giống M01/M02/M03/M04) — nguồn duy nhất là
`01_Requirement/DacTa.md` (transcribe từ `ETV.P16_DanhGiaNoiBo.md`, Đã phê duyệt, lần 03).

## OUTCOME

- **WHO**: QLCL (tổ chức, lập kế hoạch/chương trình), LĐP (xem xét kế hoạch, giám sát), LĐV (phê
  duyệt kế hoạch), Trưởng đoàn đánh giá (điều hành đoàn, kết luận cuối, đệ trình báo cáo), Đánh
  giá viên (thực hiện, ghi phát hiện), Trưởng bộ phận được đánh giá (nhận kết quả, đề xuất CAPA).
- **WHAT**: lập + phê duyệt kế hoạch đánh giá (nội bộ/bên ngoài), lập chương trình đánh giá cho
  từng đợt (gate thời hạn thông báo), ghi phát hiện, tổng hợp báo cáo (gate thời hạn đệ trình).
- **WHY**: ISO/IEC 17025 §8.8 + ISO 9001 §9.2 bắt buộc chương trình đánh giá nội bộ có hồ sơ kiểm
  soát, đúng thời hạn thông báo/đệ trình.
- **SUCCESS CRITERIA**: lập kế hoạch → LĐP xem xét → LĐV phê duyệt (gate 2 cấp); lập chương trình
  cho đợt đánh giá cận ngày (< 7 ngày) bị chặn xác nhận; báo cáo đệ trình trễ hạn hiển thị cảnh
  báo (không chặn, đúng DacTa "trễ hạn cần cảnh báo"), qua Browser với tài khoản vai trò thật.

## Data model — map DacTa.md → Prisma

Additive, convention `M16<Entity>` + `M16AuditEntry`.

### `M16AuditPlan`

`code, type (NOI_BO/BEN_NGOAI), year, scope (String[]), auditors (String[]), isAdHoc, status
(DRAFT/PENDING_REVIEW/PENDING_APPROVAL/APPROVED/REJECTED), createdById, reviewedById?,
approvedById?, reason?`.

### `M16AuditProgram`

`code, planId (→ M16AuditPlan, chỉ tạo khi plan đã APPROVED), department, field, auditDate,
teamLeadName, teamMembers (String[]), status (DRAFT/CONFIRMED), confirmedAt?`.

### `M16AuditFinding`

`code, programId (→ M16AuditProgram), clauseRef, department, description, conformity
(PHU_HOP/KHONG_PHU_HOP), evidence, auditorSignature, capaRef? (tham chiếu tự do → M13, M13 chưa
có backend thật, cùng cách M21 tham chiếu M05 catalog trước khi M05 xây xong)`.

### `M16AuditReport`

`code, programId (→ M16AuditProgram), openingMeetingNotes, closingMeetingDate, closingConclusion,
submittedAt, isLate (tự tính = submittedAt > closingMeetingDate + 7 ngày làm việc), createdById
(bắt buộc role Trưởng đoàn)`.

### `M16AuditEntry`

`itemType (enum PLAN/PROGRAM/REPORT), itemId, ts, actorId, role, action, reason`.

## State machine / gate chính

### `M16AuditPlan` — gate 2 cấp (quy tắc DacTa "phê duyệt LĐV, qua LĐP xem xét trước"), mirror M10

```
DRAFT --submit--> PENDING_REVIEW
PENDING_REVIEW --review(LDP, approve)--> PENDING_APPROVAL
PENDING_REVIEW --review(LDP, return, reason bắt buộc)--> DRAFT
PENDING_APPROVAL --approve(LDV)--> APPROVED
PENDING_APPROVAL --reject(LDV, reason bắt buộc)--> DRAFT
```

Quyết định phạm vi #1: mô hình 2 bước tường minh (PENDING_REVIEW rồi PENDING_APPROVAL) dù DacTa
chỉ viết gọn "phê duyệt LĐV, qua LĐP xem xét trước" — cùng cách suy luận đã dùng cho M10/M03 khi
transcribe "qua X xem xét trước Y phê duyệt".

### `M16AuditProgram` — gate thời hạn thông báo (quy tắc 2 DacTa)

```
createProgram(planId đã APPROVED, auditDate, ...) --> DRAFT
DRAFT --confirm(QLCL/LDP)--
  gate: auditDate phải cách hiện tại >= 7 ngày (thông báo bộ phận) — nếu không, chặn
  --> CONFIRMED (confirmedAt = now)
```

Quyết định phạm vi #2: chỉ cài gate 7 ngày (thông báo bộ phận liên quan) làm gate cứng; mốc 2
tuần (nhắc đoàn chuẩn bị) chỉ hiển thị cảnh báo mềm ở UI, không chặn — vì đây là 2 mốc thời gian
chồng lấn nhau khó phân biệt rạch ròi nghiệp vụ nào là "chặn được" vs "chỉ nhắc", DacTa cũng dùng
từ "nhắc" (không phải "bắt buộc") cho mốc 2 tuần.

### `M16AuditFinding` — không có state machine, chỉ CRUD gắn `programId`

### `M16AuditReport` — tính `isLate`, không chặn tạo (quy tắc 4: "trễ hạn cần cảnh báo", không phải "chặn")

```
createReport(programId, closingMeetingDate, submittedAt=now, ...) --
  server tính isLate = (submittedAt - closingMeetingDate) > 7 ngày làm việc
  --> tạo bản ghi kèm badge cảnh báo nếu isLate=true (không chặn)
```

Gate vai trò: chỉ `TRUONGDOAN` (Trưởng đoàn đánh giá) được tạo `M16AuditReport` — đúng quy tắc 3
DacTa "kết luận của trưởng đoàn là cuối cùng" (kết luận đóng gói trong report do đúng người viết).

## Vai trò → gate hành động

| Hành động | Role yêu cầu | Điều kiện thêm |
|---|---|---|
| Tạo/gửi duyệt `AuditPlan` | QLCL | |
| Xem xét (LĐP) | LDP | không tự xem xét hồ sơ mình tạo |
| Phê duyệt (LĐV) | LDV | |
| Tạo `AuditProgram` | QLCL | plan đã APPROVED |
| Xác nhận `AuditProgram` | QLCL/LDP | `auditDate` ≥ hôm nay + 7 ngày |
| Ghi `AuditFinding` | DANHGIAVIEN | program đã CONFIRMED |
| Tạo `AuditReport` | TRUONGDOAN | |

## Không trong phạm vi Increment này

- Validate năng lực đánh giá viên (quy tắc 1 — "đã đào tạo ISO/IEC 17025, đã đào tạo đánh giá nội
  bộ") — cần liên kết dữ liệu đào tạo thật từ M03 (`TrainingRecord`), không tự thêm field
  "đã đào tạo" tùy tiện; để increment sau khi có nhu cầu liên kết 2 module cụ thể.
- Thông báo khách hàng + thu hồi kết quả khi phát hiện ảnh hưởng kết quả đã phát hành (quy tắc 5)
  — cần liên kết M11 (chưa xây), chỉ ghi `capaRef`/ghi chú tự do trong `AuditFinding`.
- LĐP thẩm tra lại CAPA + đề xuất đánh giá bổ sung (quy tắc 6–7) — cần liên kết M13 (chưa xây).
