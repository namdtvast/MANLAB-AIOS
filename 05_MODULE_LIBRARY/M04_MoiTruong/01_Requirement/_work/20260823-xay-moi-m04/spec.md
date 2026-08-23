# M04_MoiTruong — Đặc tả xây dựng mới (Increment 7, aios-platform)

Không có `08_Source` nguyên mẫu (giống M01/M02/M03) — nguồn duy nhất là `01_Requirement/DacTa.md`
(transcribe từ `ETV.P04_MoiTruong.md`, Đã phê duyệt, lần 03).

## OUTCOME

- **WHO**: Cán bộ quản lý thiết bị/mẫu chuẩn (ghi log định kỳ), TP (giám sát, phê duyệt
  `FieldWorkPlan` mức thường), LĐV (phê duyệt `FieldWorkPlan` mức rủi ro cao), QLKT (xác nhận điều
  kiện phù hợp trước phép đo — chưa có action riêng trong Increment này), Nhân sự phụ trách hiện
  trường (lập kế hoạch).
- **WHAT**: ghi nhận điều kiện môi trường/tủ bảo quản định kỳ có so ngưỡng tự động, lập + phê
  duyệt kế hoạch công việc hiện trường theo đúng cấp thẩm quyền dựa trên mức rủi ro.
- **WHY**: ISO/IEC 17025 §6.3 bắt buộc kiểm soát điều kiện môi trường ảnh hưởng kết quả đo; Luật
  ATVSLĐ bắt buộc kế hoạch an toàn hiện trường có phê duyệt đúng cấp trước khi thi công.
- **SUCCESS CRITERIA**: ghi log môi trường tự động tính `withinSpec` so ngưỡng khu vực (gate: bắt
  buộc biện pháp xử lý nếu vượt ngưỡng); lập `FieldWorkPlan` mức rủi ro cao bị chặn nếu TP tự
  duyệt (phải LĐV), qua Browser với tài khoản vai trò thật.

## Quyết định phạm vi #1 — gộp 3 loại log thành 1 model (đúng như DacTa đã gợi ý)

DacTa.md mục 2.1 tự ghi "cấu trúc chung" cho `EnvironmentLog`/`ChemicalCabinetLog`/
`EquipmentCabinetLog` — 3 entity có **field giống hệt nhau**, chỉ khác ngữ cảnh khu vực theo dõi.
Gộp thành 1 model `M04ConditionLog` với field `logType` (ENVIRONMENT/CHEMICAL_CABINET/
EQUIPMENT_CABINET) thay vì 3 bảng trùng lặp — không phải cắt giảm phạm vi, chỉ là chọn cách triển
khai đúng với gợi ý "cấu trúc chung" đã có sẵn trong đặc tả.

## Quyết định phạm vi #2 — ngưỡng khu vực (Phụ lục II) cần bảng cấu hình riêng

`area_code` "ref Phụ lục II" nhưng DacTa.md không liệt kê đủ danh sách khu vực + ngưỡng cụ thể
(ghi "xem `03_MANAGEMENT_SYSTEM/02_P/ETV.P04_MoiTruong.md` mục Phụ lục II" mà DacTa chưa transcribe
chi tiết). Thêm bảng cấu hình `M04AreaSpec` (areaCode, name, tempMin/Max, humidityMin/Max) — seed
3–4 khu vực mẫu tiêu biểu (phòng đo áp suất 20±2°C, kho hóa chất, kho thiết bị) làm dữ liệu demo,
**không phải danh mục đầy đủ Phụ lục II thật** — cần bổ sung khi có toàn văn Phụ lục II.

## Data model — map DacTa.md → Prisma

Additive, convention `M04<Entity>` + `M04AuditEntry`.

### `M04AreaSpec` (cấu hình ngưỡng — không phải entity nghiệp vụ, ít thay đổi)

`areaCode (unique), name, tempMin, tempMax, humidityMin, humidityMax`.

### `M04ConditionLog`

`code, logType (ENVIRONMENT/CHEMICAL_CABINET/EQUIPMENT_CABINET), areaId (→ M04AreaSpec),
measuredAt, temperature, humidity, deviceRef, withinSpec (tự tính server-side, không nhận từ
client), reportedById, abnormalAction? (bắt buộc nếu !withinSpec)`.

### `M04FieldWorkPlan`

`code, site, customer, personnel (String[]), schedule (DateTime), workItems (String[]), riskLevel
(THUONG/CAO), status (DRAFT/PENDING_APPROVAL/APPROVED/REJECTED), createdById, approvedById?,
briefed (bool), briefedAt?`.

### `M04AuditEntry`

`itemType (enum CONDITION_LOG/FIELD_WORK_PLAN), itemId, ts, actorId, role, action, reason`.

## State machine / gate chính

### `M04ConditionLog` — không có workflow, chỉ gate tính toán lúc ghi (quy tắc 1–2 DacTa)

```
createConditionLog(areaId, temperature, humidity, ...) --server tính withinSpec so M04AreaSpec--
  nếu !withinSpec và thiếu abnormalAction → chặn "ABNORMAL_ACTION_REQUIRED"
  --> tạo bản ghi
```

### `M04FieldWorkPlan` — gate cấp phê duyệt theo mức rủi ro (quy tắc 5 DacTa)

```
DRAFT --submit--> PENDING_APPROVAL
PENDING_APPROVAL --approve(actor)--
  nếu riskLevel=CAO: chỉ LDV được duyệt, TP bị chặn
  nếu riskLevel=THUONG: TP hoặc LDV đều duyệt được
  --> APPROVED
PENDING_APPROVAL --reject(actor, reason bắt buộc)--> DRAFT
APPROVED --markBriefed(actor)--> APPROVED (briefed=true, briefedAt — không đổi status, chỉ đánh dấu đã phổ biến trước khi thi công, quy tắc 4)
```

## Vai trò → gate hành động

| Hành động | Role yêu cầu | Điều kiện thêm |
|---|---|---|
| Ghi `M04ConditionLog` | bất kỳ user đã gán vai trò M04 | bắt buộc `abnormalAction` nếu vượt ngưỡng |
| Tạo/gửi duyệt `FieldWorkPlan` | NV phụ trách hiện trường (role tự do, không giới hạn) | |
| Phê duyệt `FieldWorkPlan` mức Thường | TP hoặc LDV | |
| Phê duyệt `FieldWorkPlan` mức Cao | chỉ LDV | |
| Đánh dấu đã phổ biến | bất kỳ, chỉ khi đã APPROVED | |

## Không trong phạm vi Increment này

- Liên kết thông số môi trường vào biên bản đo lường M10/M11 (quy tắc 3) — cả M10/M11 UI chưa có
  trường nhập thông số môi trường trong Increment hiện tại của M10; không mở rộng M10 trong
  increment M04 này, để lại reference field tự do nếu cần sau.
- Ràng buộc vị trí đặt hóa chất vật lý (quy tắc 6) — mô tả validation thủ công, không phải dữ liệu
  hệ thống kiểm tra được (đã DacTa tự ghi rõ "không phải trường dữ liệu tự động kiểm tra được").
- Giấy phép sử dụng/kiểm định thiết bị trước khi đưa ra hiện trường (quy tắc 7) — thuộc phạm vi
  M05 (thiết bị), không lặp lại field ở M04.
- Danh mục đầy đủ Phụ lục II (ngưỡng theo từng khu vực/quy trình đo cụ thể) — chỉ seed dữ liệu mẫu
  minh họa, xem Quyết định phạm vi #2.
