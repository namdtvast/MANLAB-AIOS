# M03_NhanSu — Đặc tả xây dựng mới (Increment 5, aios-platform)

Không có `08_Source` nguyên mẫu (giống M01) — nguồn duy nhất là `01_Requirement/DacTa.md`
(transcribe từ `ETV.P03_NhanSu.md`, Đã phê duyệt, lần 03).

## OUTCOME

- **WHO**: LĐV (phê duyệt cuối/ký hợp đồng), TP (Lãnh đạo PTN — nhu cầu tuyển dụng/đào tạo, tổ
  chức thử việc), QLCL (theo dõi tuân thủ hồ sơ), QLKT (đánh giá năng lực kỹ thuật), VanPhong
  (soạn/trình ký hợp đồng, BHXH, thôi việc), NguoiHuongDan (đào tạo/giám sát nhân sự mới).
- **WHAT**: số hóa vòng đời nhân sự — đề xuất tuyển dụng → tạo hồ sơ nhân sự → đào tạo (6 điều
  kiện hoàn thành) → ký HĐLĐ/HĐDV → gia hạn/chấm dứt hợp đồng.
- **WHY**: ISO/IEC 17025 §6.2 (năng lực nhân sự) + Bộ luật Lao động 2019 + NĐ 145/2020 bắt buộc
  hồ sơ đào tạo/năng lực/hợp đồng có kiểm soát, hiện vận hành thủ công qua 18 biểu mẫu giấy.
- **SUCCESS CRITERIA**: đi hết luồng Đề xuất tuyển dụng → Nhân sự thử việc → Đào tạo (test cả
  case đủ 6 điều kiện và thiếu 1 điều kiện) → Ký HĐLĐ chính thức, qua Browser với tài khoản vai
  trò thật; gate đào tạo 6 điều kiện không cho bỏ qua bất kỳ điều kiện nào.

## Quyết định phạm vi Increment 5 — KHÔNG xây hết 8 entity cùng độ sâu

DacTa.md liệt kê 8 đối tượng dữ liệu (mục 2). Theo đúng tinh thần "right-size theo Tier" của
skill, **Increment 5 chỉ xây workflow đầy đủ cho nhóm lõi vòng đời nhân sự mới** (nơi tập trung
toàn bộ quy tắc nghiệp vụ có logic thật — quy tắc 1–4 của DacTa.md), các entity hành chính khác
có schema + CRUD/gate đơn giản hơn:

| Entity | Độ sâu Increment 5 |
|---|---|
| `Employee` | Đầy đủ — entity neo, có `status` suy ra từ hợp đồng + đào tạo |
| `RecruitmentPlan` | Đầy đủ — state machine Đề xuất→Duyệt→Đã tuyển (tạo `Employee` khi Đã tuyển) |
| `TrainingPlan` / `TrainingRecord` | Đầy đủ — **trọng tâm increment**, gate 6 điều kiện (quy tắc 3) |
| `LaborContract` | Đầy đủ — ký/gia hạn/chấm dứt, vì đây là điều kiện "Nhân sự chính thức" |
| `ServiceContract` | Rút gọn — CRUD + trạng thái Nháp/Đã ký/Hết hạn, không có luồng gia hạn nhiều bước như LaborContract (DacTa không mô tả khác biệt đủ chi tiết để tách riêng) |
| `ProbationReport` | Rút gọn — 1 bản ghi kết luận Đạt/Không đạt gắn với `Employee` đang thử việc, không tách state machine riêng (nội dung đã nằm trong luồng đào tạo/TrainingRecord) |
| `ContractTermination` | Đầy đủ nhưng đơn giản — 1 action `terminateContract` trên `LaborContract`/`ServiceContract`, sinh bản ghi thay vì 1 workflow multi-step riêng |

**Lý do**: quy tắc nghiệp vụ 1–4 (DacTa.md) mô tả logic đào tạo rất chi tiết (6 điều kiện đồng
thời) — đây là phần "có bit thật để cài", còn quy tắc 5–8 chủ yếu là thủ tục hành chính (soạn
đúng mẫu, trình ký trước hạn) không có nhánh rẽ phức tạp để mô hình hoá thêm ngoài
Nháp→Đã ký/Đã gia hạn→Hết hạn/Đã chấm dứt.

## Data model — map DacTa.md → Prisma

Additive, tiếp tục convention `M03<Entity>` + `M03AuditEntry` (itemType+itemId, mirror M01).

### `M03RecruitmentPlan`

`code, position, department, headcount, requirement, status (DRAFT/PENDING_APPROVAL/APPROVED/
FULFILLED/REJECTED), createdById, approvedById, reason`. Khi `status → FULFILLED`, tạo
`M03Employee` liên kết `recruitmentPlanId`.

### `M03Employee`

`code, fullName, position, department, employmentType (CHINHTHUC/THUVIEC/THUCTAP/HDDV), hireDate,
status (THUVIEC/CHINHTHUC/DANGHIVIEC), securityCommitmentRef (string tự do — M02 chưa có backend
thật, cùng cách M21 tham chiếu M05 catalog), recruitmentPlanId?`.

### `M03TrainingPlan`

`code, employeeId, planType (BAN_DAU/DINH_KY/BO_SUNG), content[] (String[], ≥8 nội dung bắt buộc
nếu BAN_DAU — validate ở rules.ts), trainer, status (DRAFT/APPROVED)`.

### `M03TrainingRecord` — nơi cài **gate 6 điều kiện** (quy tắc 3)

`trainingPlanId, employeeId,`
6 cờ boolean tương ứng đúng 6 điều kiện DacTa quy tắc 3:
`c1AttendedAllContent, c2FollowedRules, c3CanPerformWork, c4RecordsComplete, c5AssessmentPassed,
c6EvidenceSufficient`, `assessmentMethod, evidence, result (DAT/CHUA_DAT/BO_SUNG), approvedById
(LĐV — chỉ set khi cả 6 cờ true), status (DRAFT/PENDING_APPROVAL/APPROVED/NEEDS_SUPPLEMENT)`.

### `M03LaborContract`

`employeeId, contractType (THOIVU/KHONGTHOIHAN/THUVIEC/THUCTAP), duration, salary, bhxhInfo,
signedById (LĐV), effectiveDate, expiryDate, status (DRAFT/PENDING_SIGN/ACTIVE/RENEWED/
TERMINATED/EXPIRED), renewalHistory (Json — mảng snapshot mỗi lần gia hạn, mirror M21
`phienBanCu`)`.

### `M03ServiceContract` (rút gọn)

`employeeId, serviceType (CHUYENMON/PHOTHONG), duration, fee, signedById, status (DRAFT/
ACTIVE/EXPIRED/TERMINATED)`.

### `M03ContractTermination`

`contractType (LABOR/SERVICE), contractId (String, trỏ tự do vào 1 trong 2 bảng — mirror
`M01AuditEntry.itemId`), reason, terminatedById (LĐV), securityRevoked (bool — bắt buộc true
trước khi coi hoàn tất, phối hợp M02 quy tắc 7 DacTa), bhxhSettled (bool)`.

### `M03AuditEntry`

`itemType (enum 7 giá trị — 1 cho mỗi entity có state machine), itemId, ts, actorId, role,
action, reason`.

## State machine chính

### RecruitmentPlan

```
DRAFT --submit--> PENDING_APPROVAL
PENDING_APPROVAL --approve(LDV)--> APPROVED
PENDING_APPROVAL --reject(LDV, reason)--> DRAFT
APPROVED --fulfill(VanPhong/TP, tạo Employee mới)--> FULFILLED
```

### TrainingRecord — trọng tâm, quy tắc 3 DacTa

```
DRAFT (NguoiHuongDan điền 6 cờ + assessment) --submit--> PENDING_APPROVAL
PENDING_APPROVAL --approve(LDV)--
  nếu cả 6 cờ true → APPROVED (result=DAT, Employee.status có thể → CHINHTHUC nếu đã có LaborContract ACTIVE)
  nếu thiếu ≥1 cờ → LDV KHÔNG được approve, bắt buộc reject → NEEDS_SUPPLEMENT (result=BO_SUNG, reason bắt buộc)
NEEDS_SUPPLEMENT --resubmit (TP lập kế hoạch bổ sung, tạo TrainingRecord mới)--> (TrainingRecord mới ở DRAFT)
```

Quyết định phạm vi #1: `submit`/`approve` **chặn ở server** nếu thiếu 1/6 cờ mà vẫn cố approve —
không chỉ ẩn nút ở UI (đúng nguyên tắc "rules.ts là nguồn xác thực", giống M01/M10).

### LaborContract

```
DRAFT --sign(LDV)--> ACTIVE (effectiveDate bắt buộc)
ACTIVE --renew(LDV, trước expiryDate)--> ACTIVE (renewalHistory append bản cũ, expiryDate mới)
ACTIVE --terminate(LDV, reason)--> TERMINATED (tạo M03ContractTermination, bắt buộc securityRevoked)
ACTIVE --(hệ thống, khi qua expiryDate mà chưa renew)--> EXPIRED
```

Quyết định phạm vi #2: `EXPIRED` tính bằng cách so `expiryDate` với `now()` ở tầng đọc (derived
trong UI/list query), **không dùng cron** — ngoài phạm vi hạ tầng nền tảng hiện tại (chưa có job
scheduler), giống cách `ValidityStatus` của M20 được ghi chú "tự động, không phải trường nhập
tay" trong DacTa.

## Vai trò → gate hành động

| Hành động | Role yêu cầu | Điều kiện thêm |
|---|---|---|
| Tạo/soát xét RecruitmentPlan | TP | |
| Phê duyệt RecruitmentPlan | LDV | |
| Đánh dấu Fulfilled (tạo Employee) | VanPhong hoặc TP | RecruitmentPlan đã APPROVED |
| Điền TrainingRecord (6 cờ) | NguoiHuongDan | |
| Phê duyệt TrainingRecord | LDV | cả 6 cờ true mới approve được |
| Ký/gia hạn/chấm dứt LaborContract/ServiceContract | LDV | soạn thảo do VanPhong chuẩn bị trước (không tách vai trò "soạn" riêng ở Increment này — VanPhong và LDV có thể là cùng 1 người thao tác 2 bước liên tiếp) |
| Chấm dứt hợp đồng | LDV | bắt buộc `securityRevoked=true` trước khi hoàn tất |

## Không trong phạm vi Increment này

- ProbationReport/ServiceContract như state machine multi-step riêng (đã gộp/rút gọn — xem bảng
  Quyết định phạm vi ở trên).
- Liên kết FK thật với M02 (SecurityCommitment) và M10 (theo dõi năng lực PTN) — cả hai module đó
  chưa có backend thật trong `aios-platform`, giữ dạng field tham chiếu tự do (string), giống
  cách M21 tham chiếu M05.
- Đánh giá hoàn thành công việc 12 tháng/lần cho nhân sự ngoài PTN (quy tắc 9 DacTa) — không có
  đủ đặc tả cấu trúc dữ liệu để cài đặt, để increment sau nếu cần.
- Cron/job tự động chuyển `EXPIRED` — tính derived khi đọc, không lưu trạng thái nền.
