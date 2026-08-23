# M02_BaoMat — Đặc tả xây dựng mới (Increment 6, aios-platform)

Không có `08_Source` nguyên mẫu (giống M01/M03) — nguồn duy nhất là `01_Requirement/DacTa.md`
(transcribe từ `ETV.P02_BaoMat.md`, Đã phê duyệt, lần 03).

## OUTCOME

- **WHO**: TP (Trưởng phòng PTN — phê duyệt quyền truy cập/khách tham quan/công bố trong thẩm
  quyền, đánh giá sự cố), LĐV (phê duyệt công bố vượt thẩm quyền, chỉ đạo sự cố nghiêm trọng),
  QLCL (theo dõi cam kết/tuân thủ), NV (dùng thông tin đúng mục đích, báo cáo sự cố).
- **WHAT**: số hóa cam kết bảo mật (nhân viên/thử việc/khách), sổ khách ra vào khu vực hạn chế,
  phê duyệt công bố thông tin khách hàng ra bên thứ ba, xử lý sự cố bảo mật.
- **WHY**: ISO/IEC 17025 §4.2 + ISO/IEC 27001 A.5 + NĐ 13/2023/NĐ-CP bắt buộc kiểm soát truy cập
  và bảo vệ dữ liệu cá nhân có hồ sơ; hiện vận hành thủ công qua giấy (F02.01–F02.05).
- **SUCCESS CRITERIA**: ký cam kết → khách vào khu vực hạn chế (gate: bắt buộc có cam kết trước)
  → phê duyệt công bố thông tin (gate: bắt buộc thông báo khách hàng trừ khi pháp luật cấm) → xử
  lý sự cố bảo mật (gate: không đóng hồ sơ khi thiếu biện pháp khắc phục), qua Browser với tài
  khoản vai trò thật.

## Điểm khác biệt so với M01/M03 — liên kết thật với M03 (không còn free-text ref)

DacTa.md M02 mục 2.1 ghi `SecurityCommitment` không có field liên kết Employee tường minh, nhưng
DacTa.md M03 mục 2.1 đã ghi `securityCommitmentRef` (string tự do, "M02 chưa có backend thật" tại
thời điểm viết M03). **Nay M02 xây thật, sửa lại thành FK thật**: `SecurityCommitment.employeeId`
(nullable, chỉ áp dụng `type=NHAN_VIEN/THU_VIEC`) trỏ `M03Employee.id` — quyết định phạm vi #1,
cần cập nhật ghi chú tương ứng trong DacTa.md M03 sau khi hoàn tất (không sửa field M03 hiện có,
chỉ thêm quan hệ 1 chiều từ M02 sang M03, an toàn additive).

## Data model — map DacTa.md → Prisma

Additive, convention `M02<Entity>` + `M02AuditEntry` (itemType+itemId, mirror M01/M03).

### `M02SecurityCommitment`

`code, type (NHAN_VIEN/THU_VIEC/KHACH), personName, org, signedDate, accessScope, status
(HIEU_LUC/DA_THU_HOI), employeeId? (→ M03Employee, chỉ NHAN_VIEN/THU_VIEC), revokedAt?,
revokedById?, revokeReason?`.

### `M02VisitorLog`

`code, commitmentId (→ M02SecurityCommitment, bắt buộc type=KHACH — gate #1), visitorName, org,
purpose, area, entryTime, exitTime?, approvedById (TP)`.

### `M02DisclosureApproval`

`code, basis, content, recipient, legallyProhibitedNotify (bool), customerNotified (bool),
approvedById? (TP/LĐV), status (DRAFT/APPROVED), authorityLevel (TP/LDV — do người tạo chọn theo
thẩm quyền thực tế, xác nhận lại khi approve)`.

### `M02SecurityIncident`

`code, detectedById, detectedAt, containmentAction, impactAssessment?, notificationRequired?,
correctiveAction?, status (DETECTED/ASSESSED/CLOSED), assessedById?, closedById?`.

### `M02AuditEntry`

`itemType (enum 4 giá trị), itemId, ts, actorId, role, action, reason`.

## State machine chính

### SecurityCommitment — đơn giản, không cần soát xét/phê duyệt (ký giấy = hiệu lực ngay)

```
(tạo trực tiếp) --> HIEU_LUC
HIEU_LUC --revoke(TP/QLCL, reason?)--> DA_THU_HOI
```

Quyết định phạm vi #2: không mô hình state DRAFT/PENDING vì DacTa không mô tả bước soát xét cho
việc ký cam kết — hồ sơ giấy đã ký là bằng chứng, số hóa chỉ ghi nhận lại (giống cách `evidence`
text field ở M01, không phải workflow đa bước).

### VisitorLog — gate bắt buộc có cam kết hợp lệ trước (quy tắc 2)

```
createVisitorLog(commitmentId, ...) --check: commitment tồn tại, type=KHACH, status=HIEU_LUC--> tạo log
```

Không có state machine — chỉ 1 gate validate lúc tạo + action riêng `recordExit` cập nhật
`exitTime`.

### DisclosureApproval — gate quy tắc 5 (thông báo khách hàng trước khi công bố)

```
DRAFT --approve(TP nếu authorityLevel=TP, hoặc LDV nếu authorityLevel=LDV)--
  gate: customerNotified=true HOẶC legallyProhibitedNotify=true, nếu không → chặn
  --> APPROVED
```

### SecurityIncident — quy tắc 8 (ngăn chặn → đánh giá → khắc phục, không đóng khi thiếu khắc phục)

```
DETECTED (containmentAction bắt buộc lúc tạo) --assess(TP, impactAssessment+notificationRequired)--> ASSESSED
ASSESSED --close(TP/LDV, bắt buộc correctiveAction đã điền)--> CLOSED
```

## Vai trò → gate hành động

| Hành động | Role yêu cầu | Điều kiện thêm |
|---|---|---|
| Tạo SecurityCommitment | TP/QLCL | |
| Thu hồi SecurityCommitment | TP/QLCL | |
| Tạo VisitorLog | TP hoặc NV (được TP uỷ quyền — Increment này cho phép cả 2, không phân biệt) | commitmentId hợp lệ (type=KHACH, HIEU_LUC) |
| Ghi giờ ra (recordExit) | TP/NV | |
| Duyệt DisclosureApproval | TP (authorityLevel=TP) hoặc LDV (authorityLevel=LDV) | `customerNotified=true` HOẶC `legallyProhibitedNotify=true` |
| Đánh giá SecurityIncident | TP | |
| Đóng SecurityIncident | TP hoặc LDV | `correctiveAction` đã điền |

## Không trong phạm vi Increment này

- Rà soát định kỳ quyền truy cập theo đổi nhiệm vụ (quy tắc 3, phần "rà soát khi đổi nhiệm vụ") —
  không có đủ đặc tả cấu trúc dữ liệu (chu kỳ, checklist) để cài đặt cụ thể.
- Cơ chế nhận diện người nhận qua điện thoại (quy tắc 6) — thủ tục vận hành ngoài hệ thống, không
  phải dữ liệu số hóa được.
- Hủy hồ sơ hết hạn lưu trữ (quy tắc 9) — thuộc phạm vi M15 (Kiểm soát hồ sơ), không lặp lại ở M02.
- Rà soát điều khoản dân sự phối hợp M03 (quy tắc 10) — thủ tục quản trị, không phải dữ liệu vận
  hành hằng ngày.
