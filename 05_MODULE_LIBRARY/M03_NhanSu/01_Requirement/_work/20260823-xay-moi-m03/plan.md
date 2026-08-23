# M03_NhanSu — Kế hoạch triển khai (Increment 5)

Tham chiếu `spec.md` cùng thư mục. Kiến trúc bám sát `src/lib/m01/*` (module xây mới, không có
nguyên mẫu) — nhưng nhiều entity liên kết nhau hơn M01 (RecruitmentPlan → Employee →
TrainingRecord/LaborContract).

## DB impact (Prisma schema — additive)

Thêm vào `09_ENGINEERING/aios-platform/prisma/schema.prisma`:

- `enum M03RecruitmentStatus { DRAFT PENDING_APPROVAL APPROVED FULFILLED REJECTED }`
- `enum M03EmploymentType { CHINHTHUC THUVIEC THUCTAP HDDV }`
- `enum M03EmployeeStatus { THUVIEC CHINHTHUC DANGHIVIEC }`
- `enum M03TrainingPlanType { BAN_DAU DINH_KY BO_SUNG }`
- `enum M03TrainingResult { DAT CHUA_DAT BO_SUNG }`
- `enum M03TrainingStatus { DRAFT PENDING_APPROVAL APPROVED NEEDS_SUPPLEMENT }`
- `enum M03ContractType { THOIVU KHONGTHOIHAN THUVIEC THUCTAP }`
- `enum M03ContractStatus { DRAFT PENDING_SIGN ACTIVE TERMINATED }` (EXPIRED tính derived, không
  lưu — xem spec.md Quyết định phạm vi #2)
- `enum M03ServiceType { CHUYENMON PHOTHONG }`
- `enum M03ServiceStatus { DRAFT ACTIVE TERMINATED }`
- `enum M03TerminationContractType { LABOR SERVICE }`
- `enum M03ItemType { RECRUITMENT TRAINING_RECORD LABOR_CONTRACT SERVICE_CONTRACT TERMINATION }`
- `model M03RecruitmentPlan`, `model M03Employee`, `model M03TrainingPlan`,
  `model M03TrainingRecord`, `model M03LaborContract`, `model M03ServiceContract`,
  `model M03ContractTermination`, `model M03AuditEntry` — field theo spec.md.

Quan hệ `User`: `createdBy/approvedBy` cho RecruitmentPlan; `approvedBy` cho TrainingRecord (chỉ
LĐV); `signedBy` cho LaborContract/ServiceContract; `terminatedBy` cho ContractTermination;
`actor` cho AuditEntry — đặt tên field quan hệ dài để tránh trùng (`m03RecruitmentApproved`,
`m03TrainingApproved`, `m03ContractSigned`, `m03ServiceSigned`, `m03Terminated`,
`m03AuditEntries`).

Migration: `npx prisma migrate dev --name m03_nhan_su` (additive).

`prisma/seed.ts`:
- Thêm `"M03"` vào `ACTIVE_MODULE_CODES`.
- Thêm `seedM03()`: dùng lại 3 tài khoản demo (nth→ đóng vai TP tạm thời hoặc thêm role riêng —
  quyết định khi build: M03 cần 6 vai trò (LDV/TP/QLCL/QLKT/VanPhong/NguoiHuongDan), nhiều hơn 3
  tài khoản demo hiện có → **tái sử dụng nth/ldp/ldv cho 3 vai trò gần nghĩa nhất** (nth→
  NguoiHuongDan, ldp→TP, ldv→LDV) + **tạo mới 1 tài khoản** `vanphong@manlab.vn` cho VanPhong
  (QLCL/QLKT không có action nào trong Increment 5 theo bảng gate ở spec.md — không cần tài khoản
  riêng, để trống seed).
- Seed data: 1 RecruitmentPlan đã Fulfilled (có Employee liên kết) + 1 Employee đang thử việc với
  TrainingRecord đủ 6 điều kiện (đã APPROVED) + 1 Employee khác với TrainingRecord thiếu 1 điều
  kiện (NEEDS_SUPPLEMENT, demo gate) + 1 LaborContract ACTIVE cho nhân sự đã đào tạo xong.

## File impact

```
prisma/schema.prisma                                     (sửa — thêm model/enum M03)
prisma/seed.ts                                            (sửa — thêm "M03" + seedM03())
src/lib/m03/rules.ts        (mới) state machine 4 nhóm — AUTHORITATIVE
src/lib/m03/labels.ts       (mới)
src/lib/m03/actor.ts        (mới) mirror m01/actor.ts — moduleCode="M03"
src/lib/m03/actions.ts      (mới) "use server"
src/app/(platform)/modules/M03/page.tsx                       (mới) danh sách — tab Nhân sự/Tuyển dụng/Đào tạo/Hợp đồng
src/app/(platform)/modules/M03/recruitment/new/page.tsx        (mới)
src/app/(platform)/modules/M03/recruitment/[id]/page.tsx       (mới) + ActionPanel
src/app/(platform)/modules/M03/employee/[id]/page.tsx          (mới) trang tổng hợp 1 nhân sự: đào tạo + hợp đồng
src/app/(platform)/modules/M03/training/[id]/page.tsx          (mới) + ActionPanel (gate 6 điều kiện)
src/app/(platform)/modules/M03/contract/[id]/page.tsx          (mới) + ActionPanel (ký/gia hạn/chấm dứt, dùng chung Labor/Service qua param type)
```

Không đụng `src/lib/m01|m10|m21|m29/*`.

## Kiến trúc / Increment con (BUILD theo thứ tự)

1. **Schema + migration** — thêm model/enum, `prisma migrate dev`, cập nhật `seed.ts`, chạy seed.
2. **`rules.ts`** — 4 state machine thuần hàm: `recruitment*`, `training*` (trọng tâm — gate 6
   cờ), `contract*` (dùng chung logic cho Labor/Service qua tham số), `termination*`.
3. **`labels.ts` + `actor.ts`**.
4. **`actions.ts`** — nối rules.ts với Prisma; `fulfillRecruitment` phải tạo `M03Employee` trong
   1 `$transaction` (giống cách M10/M01 sinh `code` qua transaction).
5. **UI**: list (4 tab) → recruitment detail/new → employee tổng hợp (điều hướng sang
   training/contract con) → training detail (form 6 checkbox + ActionPanel) → contract detail
   (ký/gia hạn/chấm dứt).
6. **VERIFY qua Browser**: luồng Tuyển dụng → Employee → Đào tạo đủ 6 điều kiện (APPROVED) → Ký
   HĐLĐ (ACTIVE); luồng Đào tạo thiếu 1 điều kiện (NEEDS_SUPPLEMENT, LĐV bị chặn approve); luồng
   Chấm dứt hợp đồng (bắt buộc securityRevoked).

## Rollout / Rollback

- 1 nhánh, 1 PR (đúng lý do đã áp dụng M01/M21 — schema+rules+UI phụ thuộc chặt).
- Rollback: schema additive, chỉ FK vào `User` — revert bằng xoá migration + `git revert`.

## Risk

- Không phải Tier L.
- Rủi ro chính: 2 "Quyết định phạm vi" ở spec.md (rút gọn ProbationReport/ServiceContract, EXPIRED
  derived không cron) — cần LĐP xác nhận lại, không phải điều thủ tục quy định tường minh.
- Điểm cần STOP nếu phát sinh khi BUILD: nếu đọc lại `ETV.P03` (chưa đọc đầy đủ toàn văn, chỉ dựa
  DacTa.md đã transcribe) phát hiện quy tắc mâu thuẫn với giả định gate 6 điều kiện — dừng lại
  đọc nguồn gốc trước khi tiếp tục, không tự suy diễn thêm.

## VERIFY checklist (điền vào verify.md sau BUILD)

- [ ] `npx tsc --noEmit` PASS
- [ ] `npx eslint src --max-warnings=0` PASS
- [ ] Luồng Tuyển dụng → Employee → Đào tạo đạt đủ 6 điều kiện → Ký HĐLĐ — screenshot/log thật
- [ ] Luồng Đào tạo thiếu 1 điều kiện — LĐV bị chặn approve, chuyển NEEDS_SUPPLEMENT — screenshot/log thật
- [ ] Luồng chấm dứt hợp đồng — chặn nếu chưa securityRevoked
- [ ] `python3 _meta/validate_links.py` PASS
- [ ] Cập nhật `01_Requirement/DacTa.md` mục 8 (Triển khai thật + quyết định phạm vi)
- [ ] Cập nhật `09_ENGINEERING/aios-platform/README.md` Increment 5
