# M02_BaoMat — Kế hoạch triển khai (Increment 6)

Tham chiếu `spec.md` cùng thư mục. Kiến trúc bám sát `src/lib/m01/*` (module nhỏ, 4 entity không
quá phức tạp — gần quy mô M01 hơn M03).

## DB impact (Prisma schema — additive)

Thêm vào `09_ENGINEERING/aios-platform/prisma/schema.prisma`:

- `enum M02CommitmentType { NHAN_VIEN THU_VIEC KHACH }`
- `enum M02CommitmentStatus { HIEU_LUC DA_THU_HOI }`
- `enum M02DisclosureStatus { DRAFT APPROVED }`
- `enum M02AuthorityLevel { TP LDV }`
- `enum M02IncidentStatus { DETECTED ASSESSED CLOSED }`
- `enum M02ItemType { COMMITMENT VISITOR_LOG DISCLOSURE INCIDENT }`
- `model M02SecurityCommitment` — thêm `employeeId String?` quan hệ tới `M03Employee` (FK thật,
  additive, không sửa model `M03Employee` — chỉ thêm quan hệ ngược `m02Commitments
  M02SecurityCommitment[]` trên `M03Employee`).
- `model M02VisitorLog`, `model M02DisclosureApproval`, `model M02SecurityIncident`,
  `model M02AuditEntry` — field theo spec.md.

Quan hệ `User`: `revokedBy` (Commitment), `approvedBy` (VisitorLog), `approvedBy` (Disclosure),
`detectedBy/assessedBy/closedBy` (Incident), `actor` (AuditEntry) — đặt tên field dài tránh trùng
(`m02CommitmentRevoked`, `m02VisitorApproved`, `m02DisclosureApproved`, `m02IncidentDetected`,
`m02IncidentAssessed`, `m02IncidentClosed`, `m02AuditEntries`).

Migration: `npx prisma migrate dev --name m02_bao_mat` (additive).

`prisma/seed.ts`:
- Thêm `"M02"` vào `ACTIVE_MODULE_CODES`.
- Thêm `seedM02()`: dùng lại nth/ldp/ldv (NV/TP/LDV — vai trò M02 chỉ có TP/LDV/QLCL/NV theo
  DacTa, tái dùng 3 tài khoản sẵn có, không cần tài khoản mới vì không có vai trò nào khác biệt
  đủ để tách — QLCL trong Increment này không có action riêng theo bảng gate spec.md, bỏ qua).
- Seed data: 2 SecurityCommitment (1 NHAN_VIEN liên kết Employee NS-2026-0002 thật từ M03, 1
  KHACH) + 1 VisitorLog dùng cam kết KHACH + 1 DisclosureApproval DRAFT (demo gate customerNotified)
  + 1 SecurityIncident ở trạng thái ASSESSED (demo gate đóng thiếu correctiveAction).

## File impact

```
prisma/schema.prisma                                  (sửa — thêm model/enum M02 + quan hệ M03Employee)
prisma/seed.ts                                          (sửa — thêm "M02" + seedM02())
src/lib/m02/rules.ts        (mới) state machine 4 nhóm — AUTHORITATIVE
src/lib/m02/labels.ts       (mới)
src/lib/m02/actor.ts        (mới) mirror m01/actor.ts — moduleCode="M02"
src/lib/m02/actions.ts      (mới) "use server"
src/app/(platform)/modules/M02/page.tsx                    (mới) danh sách — 4 khối: cam kết/khách/công bố/sự cố
src/app/(platform)/modules/M02/commitment/new/page.tsx      (mới)
src/app/(platform)/modules/M02/commitment/[id]/page.tsx     (mới) + ActionPanel (thu hồi)
src/app/(platform)/modules/M02/visitor/new/page.tsx          (mới)
src/app/(platform)/modules/M02/disclosure/new/page.tsx       (mới)
src/app/(platform)/modules/M02/disclosure/[id]/page.tsx      (mới) + ActionPanel (duyệt)
src/app/(platform)/modules/M02/incident/new/page.tsx          (mới)
src/app/(platform)/modules/M02/incident/[id]/page.tsx         (mới) + ActionPanel (đánh giá/đóng)
```

Không đụng `src/lib/m01|m03|m10|m21|m29/*`. Sửa `prisma/schema.prisma` phần `M03Employee` chỉ
thêm 1 dòng quan hệ ngược, không đổi field/logic M03 hiện có.

## Kiến trúc / Increment con (BUILD theo thứ tự)

1. **Schema + migration** — thêm model/enum M02, thêm quan hệ `M03Employee.m02Commitments`,
   `prisma migrate dev`, cập nhật `seed.ts`, chạy seed.
2. **`rules.ts`** — 4 nhóm gate thuần hàm: `commitment*` (revoke), `visitorLog*` (validate
   commitment hợp lệ), `disclosure*` (gate thông báo khách hàng), `incident*` (assess/close).
3. **`labels.ts` + `actor.ts`**.
4. **`actions.ts`**.
5. **UI**: list (4 khối) → mỗi loại có new + detail/ActionPanel riêng (trừ VisitorLog chỉ cần
   new — theo DacTa không có luồng phê duyệt riêng cho việc ghi sổ, chỉ ghi nhận).
6. **VERIFY qua Browser**: tạo cam kết KHÁCH → ghi VisitorLog (gate: thử tạo VisitorLog không có
   commitmentId hợp lệ → bị chặn) → tạo DisclosureApproval, thử duyệt khi customerNotified=false
   và legallyProhibitedNotify=false → bị chặn → tick 1 trong 2 → duyệt được → tạo SecurityIncident,
   đánh giá, thử đóng thiếu correctiveAction → bị chặn → điền → đóng được.

## Rollout / Rollback

- 1 nhánh, 1 PR.
- Rollback: schema additive (bảng M02* độc lập, chỉ FK vào `User` + `M03Employee` sẵn có) — revert
  bằng xoá migration + `git revert`, không ảnh hưởng M01/M03/M10/M21/M29.

## Risk

- Không phải Tier L.
- Rủi ro chính: 2 "Quyết định phạm vi" ở spec.md (FK thật tới M03Employee thay vì free-text ref,
  SecurityCommitment không có bước soát xét/phê duyệt) — cần LĐP xác nhận lại.
- Điểm cần STOP nếu phát sinh khi BUILD: nếu đọc lại `ETV.P02` mục đầy đủ (chưa đọc toàn văn, chỉ
  dựa DacTa.md) phát hiện có bước soát xét/phê duyệt cho SecurityCommitment mà DacTa rút gọn bỏ
  qua — dừng lại đọc nguồn trước khi tiếp tục.

## VERIFY checklist (điền vào verify.md sau BUILD)

- [ ] `npx tsc --noEmit` PASS
- [ ] `npx eslint src --max-warnings=0` PASS
- [ ] Gate VisitorLog: chặn khi commitmentId không hợp lệ/không phải KHACH/đã thu hồi
- [ ] Gate DisclosureApproval: chặn duyệt khi customerNotified=false và legallyProhibitedNotify=false
- [ ] Gate SecurityIncident: chặn đóng khi thiếu correctiveAction
- [ ] `python3 _meta/validate_links.py` PASS
- [ ] Cập nhật `01_Requirement/DacTa.md` M02 mục "Triển khai thật"
- [ ] Cập nhật `01_Requirement/DacTa.md` M03 — sửa ghi chú `securityCommitmentRef` thành FK thật
- [ ] Cập nhật `09_ENGINEERING/aios-platform/README.md` Increment 6
