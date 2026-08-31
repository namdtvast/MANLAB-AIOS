# M03 — Chốt K2/K3/K4 vào schema (Tier M)

Xuất phát từ ba khoảng cách nêu tại [`03_Database/DataModel.md`](../../../03_Database/DataModel.md) §4, đo bằng bản kết xuất `vw_tb_qlManLab_NhanSu` ngày 31/08/2026 (145 bản ghi × 53 cột).

**Thời điểm chọn để làm việc này:** `M03Employee` trên aios-platform hiện chỉ có **2 bản ghi seed demo**. Sửa schema bây giờ không phải viết migration dữ liệu; sau khi nhập 145 bản ghi thật thì phải viết.

## OUTCOME

- **WHO** — Văn phòng (quản lý danh sách nhân sự, `ETV.P03` §V), QLKT (xác nhận năng lực kỹ thuật), LĐV (phê duyệt).
- **WHAT** — bổ sung ba thứ vào mô hình `M03Employee`: mã nhân sự cũ của ManLab (K2), trạng thái duyệt bản ghi tách khỏi trạng thái lao động (K3), lĩnh vực kiểm định dạng nhiều–nhiều (K4).
- **WHY** — ba khoảng cách này chặn việc di trú 145 bản ghi ManLab sang aios-platform: K2 làm mất phòng ban gốc của người đã nghỉ, K3 làm mất trạng thái duyệt, K4 làm mất năng lực được ủy quyền.
- **SUCCESS CRITERIA**
  1. Ba bản ghi ManLab bất kỳ ở trạng thái `Nháp` / `Đã duyệt` / `Chấm dứt HĐLĐ` biểu diễn được **không mất thông tin nào**.
  2. Một nhân sự có 4 lĩnh vực kiểm định truy vấn được bằng `WHERE field = ...`, không phải `LIKE '%...%'`.
  3. Toàn bộ 498 test hiện có vẫn xanh; không hồi quy hành vi nào đang chạy.

## SPEC

### K2 — `legacyCode`

| | |
|---|---|
| Trường | `M03Employee.legacyCode String? @unique` |
| Chứa | Mã nhân sự ManLab, giữ nguyên chuỗi gốc kể cả khoảng trắng: `P. ĐL46`, `VP01`, `CTV07` |
| Vì sao không thay `code` | `code` theo mẫu `NS-YYYY-NNNN` dùng thống nhất cho cả 7 thực thể M03 và mọi module khác (`TD-`, `DT-`, `PT-`, `HDLD-`); đổi riêng M03Employee sẽ phá tính nhất quán đó. Giữ cả hai: `code` cho nền tảng, `legacyCode` cho truy vết ngược về hồ sơ giấy và thẻ đã in |
| Nullable | Có — nhân sự tạo mới trên aios-platform không có mã ManLab |
| Unique | Có — mã ManLab không tái sử dụng số; Postgres cho phép nhiều `NULL` trong unique index |

**Lợi ích phụ đã tính trước:** theo K1, tiền tố của `legacyCode` là chỗ **duy nhất** còn giữ phòng ban gốc của 30 nhân sự đã chấm dứt hợp đồng (cột Bộ phận trên ManLab bị ghi đè thành `CDHĐ`). Không có trường này thì thông tin đó mất khi di trú.

### K3 — `recordStatus`

| | |
|---|---|
| Trường | `M03Employee.recordStatus M03EmployeeRecordStatus @default(DRAFT)` |
| Enum mới | `DRAFT` · `PENDING_APPROVAL` · `APPROVED` · `REJECTED` |
| Quan hệ với `status` | Độc lập hoàn toàn. `status` (`M03EmployeeStatus`) = quan hệ lao động: Thử việc / Chính thức / Đã nghỉ. `recordStatus` = bản ghi đã được xác nhận chưa |

Bốn giá trị lấy đúng theo `M03RecruitmentStatus` đã có (bỏ `FULFILLED` vì không áp dụng cho hồ sơ nhân sự) — không sinh bộ từ vựng thứ ba trong cùng module.

**Giá trị mặc định là `DRAFT`, nhưng luồng tạo duy nhất ghi đè thành `APPROVED`.** Trên aios-platform, `M03Employee` chỉ sinh ra từ `fulfillRecruitmentPlan()` — tức từ một đề xuất tuyển dụng **đã được LĐV phê duyệt**, do Văn phòng/TP thực hiện. Bản ghi sinh theo đường đó đã có dấu vết phê duyệt ở thượng nguồn, nên ghi thẳng `APPROVED` kèm audit log nêu rõ căn cứ.

`DRAFT` do đó chỉ phát sinh khi **di trú dữ liệu ManLab** (10 bản ghi `Nháp`, 1 `Chờ duyệt`, 1 `Không duyệt`). Đặt default `DRAFT` để mặc định là giá trị dè dặt nhất, và buộc đường tạo phải nói rõ nó đang phê duyệt.

**Không xây thêm màn hình duyệt hồ sơ nhân sự trong increment này** — sẽ tạo ra một luồng phê duyệt thứ hai chồng lên luồng duyệt đề xuất tuyển dụng đã có, mà chưa có nghiệp vụ nào đòi. `HDSD.yaml` vì vậy không đổi (không thêm bước người dùng nào).

### K4 — `M03EmployeeField`

```
model M03EmployeeField {
  employeeId  String
  field       M03InspectionField
  @@unique([employeeId, field])
}
enum M03InspectionField { 12 giá trị }
```

12 lĩnh vực lấy từ [`06/08_Personnel/MaTranNangLuc_LinhVucKiemDinh.md`](../../../../../06_SHARED_RESOURCES/08_Personnel/MaTranNangLuc_LinhVucKiemDinh.md) §1 — đúng tập giá trị đang dùng thật trên ManLab, không tự thêm bớt.

Bảng nối giữ **tối thiểu**: cặp (nhân sự, lĩnh vực). Bằng chứng ủy quyền (số thẻ KĐV, quyết định cấp, ngày hết hạn) là khoảng cách **K5**, chưa thuộc phạm vi lần này — thêm trường bằng chứng bây giờ sẽ là trường rỗng không ai điền.

Hai giá trị `Không áp dụng` / `Không lĩnh vực` của ManLab **không** vào enum: chúng nghĩa là "không có lĩnh vực nào", biểu diễn bằng **không có dòng nào** trong bảng nối.

### Ràng buộc phạm vi — ba thứ KHÔNG đụng tới

1. **`src/lib/m03/forms/f03-08.ts`** (xuất PDF danh sách nhân sự) giữ nguyên 11 cột. Bản 17 cột là **dự thảo `status: Nhap`** chờ LĐV phê duyệt (phiếu `ETV.P.F14.01_2026-08-31`); bản in phải khớp biểu mẫu **đã ban hành** để đoàn đánh giá đối chiếu được. Đổi trước khi có phê duyệt là vi phạm MP14.
2. **`rules.ts`** không thêm state machine mới (xem lý do ở K3).
3. **K5–K9** không giải quyết trong increment này.

## Acceptance Criteria

| # | Tiêu chí | Cách kiểm |
|---|---|---|
| AC1 | Schema hợp lệ, client sinh được | `npx prisma validate` · `npx prisma generate` |
| AC2 | Migration SQL chỉ toàn lệnh cộng thêm, không `DROP`/`ALTER ... NOT NULL` trên cột có sẵn | Đọc file SQL |
| AC3 | Bản ghi cũ không thành `DRAFT` sau migration | Migration có `UPDATE ... SET "recordStatus" = 'APPROVED'` |
| AC4 | Nhân sự sinh từ tuyển dụng mang `recordStatus = APPROVED` | Đọc `fulfillRecruitmentPlan` + seed |
| AC5 | 12 lĩnh vực có nhãn tiếng Việt | `labels.ts` |
| AC6 | Không hồi quy | `npm test` — 498 test vẫn xanh |
| AC7 | Cấu trúc repo còn nguyên vẹn | `python3 _meta/validate_links.py` |
