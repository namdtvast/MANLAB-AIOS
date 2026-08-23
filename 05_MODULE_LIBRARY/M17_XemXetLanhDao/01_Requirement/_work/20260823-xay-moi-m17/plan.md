# M17_XemXetLanhDao — Kế hoạch triển khai (Increment 9)

Tham chiếu `spec.md` cùng thư mục. Trọng tâm: gate "đồng phê duyệt" (co-approval) — mẫu mới chưa
dùng ở increment nào trước đó — và query thật vào bảng `M16*` để tính cảnh báo mềm.

## DB impact (Prisma schema — additive)

- `enum M17PlanStatus { DRAFT PENDING_APPROVAL APPROVED REJECTED }`
- `enum M17ActionStatus { DANG_THUC_HIEN HOAN_THANH }`
- `enum M17ItemType { PLAN MINUTES ACTION }`
- `model M17ReviewPlan`, `model M17ReviewMinutes`, `model M17ReviewActionTracking`,
  `model M17CorrectiveActionRequest`, `model M17AuditEntry` — field theo spec.md.

Quan hệ `User`: `m17PlanCreated`, `m17PlanTpApproved`, `m17PlanLdvApproved`,
`m17MinutesRecorded`, `m17ActionCreated`(nếu cần), `m17CapaCreated`, `m17AuditEntries`.

Migration: `npx prisma migrate dev --name m17_xem_xet_lanh_dao` (additive).

`prisma/seed.ts`:
- Thêm `"M17"` vào `ACTIVE_MODULE_CODES`.
- Thêm `seedM17()`: dùng lại nth/ldp/ldv (nth→QLCL, ldp→TP, ldv→LDV) — không cần tài khoản mới,
  đủ 3 vai trò cốt lõi.
- Seed data: 1 `ReviewPlan` đã APPROVED (cả TP+LDV đã duyệt) → 1 `ReviewMinutes` đủ 12 nội dung +
  `conclusion` đã ghi bởi LDV → 2 `ReviewActionTracking` (1 sắp quá hạn để demo derived status, 1
  đã Hoàn thành) → 1 `CorrectiveActionRequest`. Thêm 1 `ReviewPlan` khác đang `PENDING_APPROVAL`
  chỉ mới có TP duyệt (demo gate — LĐV duyệt tiếp mới APPROVED).

## File impact

```
prisma/schema.prisma                                (sửa — thêm model/enum M17)
prisma/seed.ts                                        (sửa — thêm "M17" + seedM17())
src/lib/m17/rules.ts        (mới) gate đồng phê duyệt + validate 12 nội dung — AUTHORITATIVE
src/lib/m17/labels.ts       (mới)
src/lib/m17/actor.ts        (mới) mirror m01/actor.ts — moduleCode="M17"
src/lib/m17/actions.ts      (mới) "use server" — bao gồm query M16AuditReport cho cảnh báo mềm
src/app/(platform)/modules/M17/page.tsx                       (mới) danh sách chương trình
src/app/(platform)/modules/M17/plan/new/page.tsx                (mới)
src/app/(platform)/modules/M17/plan/[id]/page.tsx               (mới) + ActionPanel (đồng phê duyệt) + tạo biên bản con
src/app/(platform)/modules/M17/minutes/[id]/page.tsx            (mới) + ghi kết luận (LĐV) + tạo action tracking + tạo CAPA request
```

Không đụng `src/lib/m01|m02|m03|m04|m10|m16|m21|m29/*` — chỉ đọc (Prisma `findMany`) từ bảng
`M16*` trong `actions.ts` của M17, không import code M16.

## Kiến trúc / Increment con (BUILD theo thứ tự)

1. **Schema + migration** — thêm model/enum, `prisma migrate dev`, cập nhật `seed.ts`, chạy seed.
2. **`rules.ts`** — gate đồng phê duyệt (`txTpApprove`/`txLdvApprove`, mỗi hàm kiểm tra điều kiện
   còn lại đã có chưa để tự chuyển APPROVED) + `validateTopicResults` (đủ 12, topicId 1-12 không
   trùng).
3. **`labels.ts` + `actor.ts`**.
4. **`actions.ts`** — thêm `hasCompletedAuditThisYear(year)` query thật `M16AuditReport` qua
   `program.plan.year` + `program.plan.status`.
5. **UI**: list → plan/new (hiển thị cảnh báo mềm nếu chưa có đánh giá năm nay) → plan/[id]
   (ActionPanel 2 nút độc lập TP/LĐV) → minutes/[id] (form 12 dòng cố định + nút ghi kết luận chỉ
   LĐV thấy được khi đủ điều kiện + form action tracking + form CAPA request).
6. **VERIFY qua Browser**: TP duyệt trước → chưa APPROVED (còn thiếu LĐV) → LĐV duyệt → APPROVED;
   thử ngược lại LĐV trước → TP sau, xác nhận đối xứng; ghi biên bản thiếu 1/12 nội dung → bị
   chặn; QLCL thử ghi `conclusion` → bị chặn (chỉ LĐV); hành động quá hạn hiển thị đúng badge.

## Rollout / Rollback

- 1 nhánh, 1 PR. Rollback: schema additive, chỉ FK vào `User` — revert bằng xoá migration +
  `git revert`. Việc M17 đọc bảng M16 không tạo phụ thuộc ngược nguy hiểm (chỉ SELECT, không FK).

## Risk

- Không phải Tier L.
- Rủi ro chính: gate đồng phê duyệt là mẫu logic mới — cần kiểm tra kỹ cả 2 chiều thứ tự (TP
  trước/LĐV trước) đều dẫn đến cùng kết quả APPROVED, tránh lỗi chỉ đúng 1 chiều.
- 1 "Quyết định phạm vi" cần LĐP xác nhận: derived "Quá hạn" không lưu DB (mirror M04/M20).

## VERIFY checklist (điền vào verify.md sau BUILD)

- [ ] `npx tsc --noEmit` PASS
- [ ] `npx eslint src --max-warnings=0` PASS
- [ ] Gate đồng phê duyệt: TP trước rồi LĐV — APPROVED đúng lúc đủ cả 2
- [ ] Gate đồng phê duyệt: LĐV trước rồi TP — vẫn APPROVED đúng (đối xứng)
- [ ] Gate đủ 12 nội dung khi lập biên bản
- [ ] Gate chỉ LĐV ghi được kết luận
- [ ] Cảnh báo mềm khi chưa có đánh giá M16 năm nay (không chặn)
- [ ] `python3 _meta/validate_links.py` PASS
- [ ] Cập nhật `01_Requirement/DacTa.md` mục "Triển khai thật"
- [ ] Cập nhật `09_ENGINEERING/aios-platform/README.md` Increment 9
