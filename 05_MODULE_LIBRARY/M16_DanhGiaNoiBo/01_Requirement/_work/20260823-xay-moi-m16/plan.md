# M16_DanhGiaNoiBo — Kế hoạch triển khai (Increment 8)

Tham chiếu `spec.md` cùng thư mục. Kiến trúc bám sát `src/lib/m10/*` (2-step approval LĐP→LĐV)
kết hợp `src/lib/m04/*` (gate thời hạn theo ngày).

## DB impact (Prisma schema — additive)

- `enum M16AuditType { NOI_BO BEN_NGOAI }`
- `enum M16PlanStatus { DRAFT PENDING_REVIEW PENDING_APPROVAL APPROVED REJECTED }`
- `enum M16ProgramStatus { DRAFT CONFIRMED }`
- `enum M16Conformity { PHU_HOP KHONG_PHU_HOP }`
- `enum M16ItemType { PLAN PROGRAM REPORT }`
- `model M16AuditPlan`, `model M16AuditProgram`, `model M16AuditFinding`, `model M16AuditReport`,
  `model M16AuditEntry` — field theo spec.md.

Quan hệ `User`: `m16PlanCreated/m16PlanReviewed/m16PlanApproved`, `m16ReportCreated`,
`m16AuditEntries`.

Migration: `npx prisma migrate dev --name m16_danh_gia_noi_bo` (additive).

`prisma/seed.ts`:
- Thêm `"M16"` vào `ACTIVE_MODULE_CODES`.
- Thêm `seedM16()`: dùng lại nth/ldp/ldv (nth→QLCL/ĐánhGiáViên, ldp→LDP, ldv→LDV) — cần thêm vai
  trò TRUONGDOAN riêng biệt vì "Trưởng đoàn đánh giá" là actor bắt buộc khác NV thường trong gate
  tạo AuditReport → tái dùng `ldp@manlab.vn` cho vai trò TRUONGDOAN cũng được (1 người có thể giữ
  nhiều vai trò module) hoặc tạo tài khoản mới `truongdoan@manlab.vn` — **quyết định khi build**:
  tái dùng `nth@manlab.vn` thêm vai trò TRUONGDOAN (đã đóng vai NguoiHuongDan ở M03, hợp lý làm
  Trưởng đoàn đánh giá ở M16) để không tăng số tài khoản demo.
- Seed data: 1 `AuditPlan` đã APPROVED (năm hiện tại) → 1 `AuditProgram` đã CONFIRMED (auditDate
  đủ xa) → 2 `AuditFinding` (1 Phù hợp, 1 Không phù hợp có capaRef) → 1 `AuditReport` đúng hạn +
  1 `AuditPlan` khác đang PENDING_REVIEW (demo luồng duyệt qua UI).

## File impact

```
prisma/schema.prisma                                (sửa — thêm model/enum M16)
prisma/seed.ts                                        (sửa — thêm "M16" + seedM16())
src/lib/m16/rules.ts        (mới) state machine plan + gate program/report — AUTHORITATIVE
src/lib/m16/labels.ts       (mới)
src/lib/m16/actor.ts        (mới) mirror m01/actor.ts — moduleCode="M16"
src/lib/m16/actions.ts      (mới) "use server"
src/app/(platform)/modules/M16/page.tsx                       (mới) danh sách kế hoạch + chương trình
src/app/(platform)/modules/M16/plan/new/page.tsx                (mới)
src/app/(platform)/modules/M16/plan/[id]/page.tsx               (mới) + ActionPanel (xem xét/phê duyệt) + tạo chương trình con
src/app/(platform)/modules/M16/program/[id]/page.tsx            (mới) + xác nhận + ghi phát hiện + tạo báo cáo
```

Không đụng `src/lib/m01|m02|m03|m04|m10|m21|m29/*`.

## Kiến trúc / Increment con (BUILD theo thứ tự)

1. **Schema + migration** — thêm model/enum, `prisma migrate dev`, cập nhật `seed.ts`, chạy seed.
2. **`rules.ts`** — state machine `AuditPlan` (submit/review/approve, mirror M10) + gate
   `canConfirmProgram` (so `auditDate` với `now+7ngày`) + `computeReportLateness`.
3. **`labels.ts` + `actor.ts`**.
4. **`actions.ts`**.
5. **UI**: list (2 khối: kế hoạch + chương trình gần đây) → plan/new → plan/[id] (ActionPanel
   duyệt 2 cấp + form tạo chương trình con khi đã APPROVED) → program/[id] (xác nhận + form ghi
   phát hiện + form tạo báo cáo).
6. **VERIFY qua Browser**: LĐP xem xét → LĐV phê duyệt kế hoạch; tạo chương trình với ngày cận kề
   (<7 ngày) → bị chặn xác nhận; đổi ngày xa hơn → xác nhận được; ghi phát hiện Không phù hợp; tạo
   báo cáo trễ hạn → hiển thị cảnh báo (không chặn).

## Rollout / Rollback

- 1 nhánh, 1 PR. Rollback: schema additive, chỉ FK vào `User` — revert bằng xoá migration +
  `git revert`.

## Risk

- Không phải Tier L.
- Rủi ro chính: 2 "Quyết định phạm vi" (mô hình 2 bước duyệt tường minh dù DacTa viết gọn; chỉ
  cài gate cứng cho mốc 7 ngày, mốc 2 tuần chỉ cảnh báo mềm) — cần LĐP xác nhận lại.

## VERIFY checklist (điền vào verify.md sau BUILD)

- [ ] `npx tsc --noEmit` PASS
- [ ] `npx eslint src --max-warnings=0` PASS
- [ ] Gate duyệt AuditPlan 2 cấp (LĐP xem xét → LĐV phê duyệt), LĐV không tự duyệt khi chưa qua LĐP
- [ ] Gate xác nhận AuditProgram cận ngày (<7 ngày) — bị chặn
- [ ] AuditReport trễ hạn hiển thị cảnh báo, không chặn tạo
- [ ] `python3 _meta/validate_links.py` PASS
- [ ] Cập nhật `01_Requirement/DacTa.md` mục "Triển khai thật"
- [ ] Cập nhật `09_ENGINEERING/aios-platform/README.md` Increment 8
