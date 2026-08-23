# M04_MoiTruong — Kế hoạch triển khai (Increment 7)

Tham chiếu `spec.md` cùng thư mục. Module nhỏ (2 entity thật: `M04ConditionLog` gộp 3 loại +
`M04FieldWorkPlan`), quy mô gần M02 hơn M03.

## DB impact (Prisma schema — additive)

- `enum M04LogType { ENVIRONMENT CHEMICAL_CABINET EQUIPMENT_CABINET }`
- `enum M04RiskLevel { THUONG CAO }`
- `enum M04PlanStatus { DRAFT PENDING_APPROVAL APPROVED REJECTED }`
- `enum M04ItemType { CONDITION_LOG FIELD_WORK_PLAN }`
- `model M04AreaSpec` — cấu hình ngưỡng (không có state machine).
- `model M04ConditionLog` — field theo spec.md; quan hệ `area → M04AreaSpec`, `reportedBy → User`.
- `model M04FieldWorkPlan` — field theo spec.md; quan hệ `createdBy/approvedBy → User`.
- `model M04AuditEntry` — mirror M01/M02/M03.

Quan hệ `User`: `m04LogReported`, `m04PlanCreated`, `m04PlanApproved`, `m04AuditEntries`.

Migration: `npx prisma migrate dev --name m04_moi_truong` (additive).

`prisma/seed.ts`:
- Thêm `"M04"` vào `ACTIVE_MODULE_CODES`.
- Thêm `seedM04()`: dùng lại nth/ldp/ldv (NV=người ghi log/lập kế hoạch, TP=ldp, LDV=ldv — vai
  trò M04 tự do, không giới hạn danh sách cố định theo spec.md).
- Seed data: 4 `M04AreaSpec` mẫu (Phòng đo áp suất 20±2°C/50±10%, Kho hóa chất, Kho thiết bị,
  Phòng hiệu chuẩn chung) + vài `M04ConditionLog` (có 1 bản ghi vượt ngưỡng demo gate) + 2
  `M04FieldWorkPlan` (1 mức Thường đã duyệt, 1 mức Cao đang chờ duyệt — demo gate LĐV-only).

## File impact

```
prisma/schema.prisma                                (sửa — thêm model/enum M04)
prisma/seed.ts                                        (sửa — thêm "M04" + seedM04())
src/lib/m04/rules.ts        (mới) gate tính withinSpec + state machine FieldWorkPlan — AUTHORITATIVE
src/lib/m04/labels.ts       (mới)
src/lib/m04/actor.ts        (mới) mirror m01/actor.ts — moduleCode="M04"
src/lib/m04/actions.ts      (mới) "use server"
src/app/(platform)/modules/M04/page.tsx                    (mới) danh sách — 2 khối: log điều kiện/kế hoạch hiện trường
src/app/(platform)/modules/M04/log/new/page.tsx             (mới)
src/app/(platform)/modules/M04/plan/new/page.tsx             (mới)
src/app/(platform)/modules/M04/plan/[id]/page.tsx            (mới) + ActionPanel (duyệt/từ chối/phổ biến)
```

Không đụng `src/lib/m01|m02|m03|m10|m21|m29/*`.

## Kiến trúc / Increment con (BUILD theo thứ tự)

1. **Schema + migration** — thêm model/enum, `prisma migrate dev`, cập nhật `seed.ts`, chạy seed.
2. **`rules.ts`** — `computeWithinSpec(area, temp, humidity)` thuần hàm + state machine
   FieldWorkPlan (submit/approve/reject/markBriefed, gate cấp duyệt theo riskLevel).
3. **`labels.ts` + `actor.ts`**.
4. **`actions.ts`**.
5. **UI**: list (2 khối) → log/new (chọn khu vực, nhập số liệu, hiển thị withinSpec preview) →
   plan/new → plan/[id] + ActionPanel.
6. **VERIFY qua Browser**: ghi log vượt ngưỡng thiếu biện pháp xử lý → bị chặn; điền biện pháp →
   thành công; tạo FieldWorkPlan mức Cao → TP thử duyệt → bị chặn → LĐV duyệt được; tạo mức
   Thường → TP duyệt được trực tiếp.

## Rollout / Rollback

- 1 nhánh, 1 PR. Rollback: schema additive, chỉ FK vào `User` — revert bằng xoá migration +
  `git revert`.

## Risk

- Không phải Tier L.
- Rủi ro chính: 2 "Quyết định phạm vi" (gộp 3 loại log thành 1 model, ngưỡng khu vực chỉ seed mẫu
  minh họa chứ không đủ Phụ lục II thật) — cần LĐP xác nhận lại danh mục khu vực/ngưỡng thật khi
  triển khai chính thức.

## VERIFY checklist (điền vào verify.md sau BUILD)

- [ ] `npx tsc --noEmit` PASS
- [ ] `npx eslint src --max-warnings=0` PASS
- [ ] Gate ghi log vượt ngưỡng thiếu biện pháp xử lý — bị chặn
- [ ] Gate FieldWorkPlan mức Cao — TP bị chặn, LĐV duyệt được
- [ ] FieldWorkPlan mức Thường — TP duyệt được
- [ ] `python3 _meta/validate_links.py` PASS
- [ ] Cập nhật `01_Requirement/DacTa.md` mục "Triển khai thật"
- [ ] Cập nhật `09_ENGINEERING/aios-platform/README.md` Increment 7
