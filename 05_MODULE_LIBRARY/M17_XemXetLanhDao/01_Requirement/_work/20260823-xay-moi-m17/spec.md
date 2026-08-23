# M17_XemXetLanhDao — Đặc tả xây dựng mới (Increment 9, aios-platform)

Không có `08_Source` nguyên mẫu (giống M01/M02/M03/M04/M16) — nguồn duy nhất là
`01_Requirement/DacTa.md` (transcribe từ `ETV.P17_XemXetLanhDao.md`, Đã phê duyệt, lần 03).

## OUTCOME

- **WHO**: QLCL (lập chương trình, ghi biên bản, lập phiếu CAPA), Trưởng phòng + LĐV (đồng phê
  duyệt chương trình), LĐV (kết luận cuối cùng cuộc họp).
- **WHAT**: lập + đồng phê duyệt chương trình xem xét lãnh đạo, ghi biên bản đủ 12 nội dung bắt
  buộc, LĐV kết luận, theo dõi hành động sau xem xét (tự động đánh dấu quá hạn).
- **WHY**: ISO 9001 §9.3 + ISO/IEC 17025 §8.9 bắt buộc chương trình xem xét lãnh đạo có hồ sơ đủ
  12 nội dung, đúng thẩm quyền phê duyệt.
- **SUCCESS CRITERIA**: lập chương trình → cả TP và LĐV đồng phê duyệt (thiếu 1 trong 2 chưa
  chuyển APPROVED); ghi biên bản thiếu 1/12 nội dung bị chặn; chỉ LĐV ghi được kết luận cuối; hành
  động quá hạn tự động hiển thị đúng, qua Browser với tài khoản vai trò thật.

## Điểm khác biệt so với M16 — gate "đồng phê duyệt" (co-approval), không phải phân cấp tuần tự

DacTa.md quy tắc 2 ghi "**bắt buộc LĐV + Trưởng phòng phê duyệt chương trình**" (khác M16 nơi LĐP
xem xét TRƯỚC rồi LĐV phê duyệt SAU theo cấp bậc). Ở M17, TP và LĐV là **2 người phê duyệt độc
lập, không theo thứ tự** — ai duyệt trước cũng được, chỉ cần đủ cả 2 chữ ký thì mới APPROVED.
Đây là gate mới chưa từng dùng ở M01/M02/M03/M04/M16 (tất cả đều là phân cấp tuần tự).

## Điểm khác biệt khác — liên kết thật với M16 (cross-module query đầu tiên)

Quy tắc 1 DacTa: `ReviewPlan` **nên cảnh báo** (không phải "bắt buộc chặn" — DacTa dùng từ "nên")
nếu tạo trước khi có đủ dữ liệu đánh giá của năm đó. M16 đã xây thật (Increment 8) — Increment
này **query thật** `M16AuditReport` (qua `M16AuditProgram.plan.year`) để tính cảnh báo, không
phải trường nhập tay hay giả lập. Đây là lần đầu 1 module xây mới thật sự đọc dữ liệu từ module
khác đã xây trước đó trong cùng nền tảng.

## Data model — map DacTa.md → Prisma

Additive, convention `M17<Entity>` + `M17AuditEntry`.

### `M17ReviewPlan`

`code, title, isAdHoc, plannedDate, location, attendees (String[]), plannedTopics (Int[] — chỉ số
1–12 theo mục 2.4 DacTa), status (DRAFT/PENDING_APPROVAL/APPROVED/REJECTED), createdById (QLCL),
tpApprovedById?, tpApprovedAt?, ldvApprovedById?, ldvApprovedAt?, reason?`.

### `M17ReviewMinutes`

`code, planId (→ M17ReviewPlan, chỉ tạo khi plan đã APPROVED), meetingDate, topicResults (Json —
mảng 12 phần tử `{topicId, assessmentResult}`, validate đủ 12 lúc lưu), conclusion? (chỉ LĐV ghi
được, action riêng), recordedById (QLCL)`.

### `M17ReviewActionTracking`

`code, minutesId (→ M17ReviewMinutes), actionDescription, startDate, dueDate, status
(DANG_THUC_HIEN/HOAN_THANH — "Quá hạn" tính derived lúc hiển thị, không lưu DB), assignedTo,
progressNotes?, capaRef?`.

### `M17CorrectiveActionRequest`

`code, minutesId (→ M17ReviewMinutes), description, createdById (QLCL)` — tương ứng F13.01, chưa
có FK thật tới M13 (M13 chưa xây trong Increment này), chỉ là bản ghi tối giản đúng yêu cầu "QLCL
bắt buộc lập phiếu" khi biên bản có đề xuất khắc phục.

### `M17AuditEntry`

`itemType (enum PLAN/MINUTES/ACTION), itemId, ts, actorId, role, action, reason`.

## State machine / gate chính

### `M17ReviewPlan` — gate đồng phê duyệt (quy tắc 2)

```
DRAFT --submit--> PENDING_APPROVAL
PENDING_APPROVAL --tpApprove(TP)--> PENDING_APPROVAL (set tpApprovedById; nếu ldvApprovedById đã có → APPROVED)
PENDING_APPROVAL --ldvApprove(LDV)--> PENDING_APPROVAL (set ldvApprovedById; nếu tpApprovedById đã có → APPROVED)
PENDING_APPROVAL --reject(TP hoặc LDV, reason bắt buộc)--> DRAFT
```

Cảnh báo mềm khi submit (quy tắc 1): nếu không tìm thấy `M16AuditReport` nào của năm hiện tại
(query qua `M16AuditProgram.plan.year`) → hiển thị cảnh báo trên UI, **không chặn submit** (đúng
từ "nên" trong DacTa, không phải "bắt buộc").

### `M17ReviewMinutes` — gate đủ 12 nội dung (quy tắc 4)

```
createMinutes(planId đã APPROVED, topicResults) --
  gate: topicResults phải có đúng 12 phần tử, mỗi phần tử topicId 1-12 duy nhất, assessmentResult không rỗng
  --> tạo bản ghi (conclusion = null)
recordConclusion(minutesId, conclusion) -- chỉ LDV --> cập nhật conclusion
```

### `M17ReviewActionTracking` — "Quá hạn" derived, không lưu DB (quyết định phạm vi, mirror M04/M20)

```
status lưu DB chỉ có DANG_THUC_HIEN/HOAN_THANH
hiển thị "Quá hạn" khi (dueDate < now && status === DANG_THUC_HIEN) — tính ở tầng đọc, không cron
```

## Vai trò → gate hành động

| Hành động | Role yêu cầu | Điều kiện thêm |
|---|---|---|
| Lập `ReviewPlan` | QLCL | |
| Đồng phê duyệt (TP) | TP | |
| Đồng phê duyệt (LDV) | LDV | |
| Lập `ReviewMinutes` | QLCL | plan đã APPROVED, đủ 12 nội dung |
| Ghi `conclusion` | LDV | |
| Lập `ReviewActionTracking` | QLCL | |
| Lập `CorrectiveActionRequest` | QLCL | |

## Không trong phạm vi Increment này

- FK thật `CorrectiveActionRequest` → M13 (M13 chưa xây) — chỉ bản ghi tối giản trong M17.
- Cron/job tự động đổi `ReviewActionTracking.status` thành "Quá hạn" trong DB — tính derived lúc
  đọc, giống quyết định đã áp dụng cho M04AreaSpec/M20 ValidityStatus.
- Liên kết tự động 12 nội dung với dữ liệu thật từ M16 (đánh giá nội bộ), M13 (khắc phục), M12
  (khiếu nại), M03 (đào tạo) khi ghi `topicResults` — chỉ có cảnh báo mềm dựa trên M16 (quy tắc 1)
  như đã nêu trên; 11 nội dung còn lại vẫn nhập tay tự do, chưa tự động điền từ module nguồn.
