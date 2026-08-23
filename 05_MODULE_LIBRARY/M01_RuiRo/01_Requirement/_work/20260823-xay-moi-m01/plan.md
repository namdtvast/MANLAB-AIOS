# M01_RuiRo — Kế hoạch triển khai (Increment 4)

Tham chiếu `spec.md` cùng thư mục. Kiến trúc bám sát `src/lib/m10/*` +
`src/app/(platform)/modules/M10/*` (cùng dạng: 1 entity chính có state machine tuyến tính +
audit log) — gần M10 hơn M21 (M21 có sub-entity Line phức tạp, M01 không cần).

## DB impact (Prisma schema — additive)

Thêm vào `09_ENGINEERING/aios-platform/prisma/schema.prisma`:

- `enum M01Source` (7 giá trị — DacTa §4.1)
- `enum M01OppSource` (4 giá trị — DacTa §2.2)
- `enum M01RiskLevel { THAP TRUNGBINH CAO RATCAO }`
- `enum M01Status { DRAFT PENDING_REVIEW PENDING_LEADER_APPROVAL IN_PROGRESS DONE }`
- `enum M01VerifyResult { DAT CHUA_DAT }`
- `enum M01ItemType { RISK OPPORTUNITY }`
- `model M01RiskItem` — field theo spec.md; quan hệ `createdBy/reviewedBy/approvedBy/assignee/
  verifiedBy` → `User` (5 relation ngược mới trên `User`, mirror kiểu M10Created/M10Reviewed).
- `model M01OpportunityItem` — field theo spec.md, cùng 5 relation User (tên khác:
  `m01OppCreated`, v.v. — tránh trùng tên field quan hệ với RiskItem).
- `model M01AuditEntry` — `itemType M01ItemType, itemId String` (không FK — trỏ tự do vào 1
  trong 2 bảng, mirror kiểu M10AuditEntry nhưng bỏ FK cứng vì có 2 loại entity nguồn).

Migration: `npx prisma migrate dev --name m01_risk_opportunity` (additive, không đụng dữ liệu
M10/M21/M29 hiện có).

`prisma/seed.ts`:
- Thêm `"M01"` vào `ACTIVE_MODULE_CODES` (dòng 21) — cập nhật comment enum `ModuleStatus.ACTIVE`
  ở schema.prisma (bỏ "ở Increment 0", vì giờ ACTIVE không còn nghĩa "chỉ 3 module gốc" nữa).
- Thêm `seedM01()`: dùng lại 3 tài khoản demo đã có (`nth@manlab.vn`→NV, `ldp@manlab.vn`→TP_QLCL,
  `ldv@manlab.vn`→LDV — đúng kiểu M21 "dùng lại tài khoản M10, gán thêm vai trò module mới"), tạo
  2–3 hồ sơ Rủi ro (đủ dải Thấp/Cao/Rất cao để test được gate LĐV) + 1 Cơ hội demo.

## File impact

```
prisma/schema.prisma                                    (sửa — thêm model/enum M01, KHÔNG sửa phần M10/M21/M29)
prisma/seed.ts                                           (sửa — thêm "M01" vào ACTIVE_MODULE_CODES + seedM01())
src/lib/m01/rules.ts        (mới) state machine thuần hàm — AUTHORITATIVE (tương tự m10/rules.ts)
src/lib/m01/labels.ts       (mới) nhãn tiếng Việt (status/source/risk_level/verify_result/role)
src/lib/m01/actor.ts        (mới) mirror m10/actor.ts — moduleCode="M01"
src/lib/m01/actions.ts      (mới) "use server" — createRisk, createOpportunity, editItem, submit,
                                   review, leaderDecide, submitEvidence, verify
src/app/(platform)/modules/M01/page.tsx                 (mới) danh sách — 2 tab Rủi ro/Cơ hội
src/app/(platform)/modules/M01/new/page.tsx              (mới) chọn loại + form
src/app/(platform)/modules/M01/new/NewRiskForm.tsx        (mới)
src/app/(platform)/modules/M01/new/NewOpportunityForm.tsx (mới)
src/app/(platform)/modules/M01/[type]/[id]/page.tsx       (mới) chi tiết — [type] = risk|opportunity
src/app/(platform)/modules/M01/[type]/[id]/ActionPanel.tsx (mới) mirror M10 ActionPanel
```

Không đụng `src/lib/m10|m21|m29/*`, không tạo hệ màu/token riêng (dùng lại
`bg/surface/ink/accent/good/warn/crit` đã có).

## Kiến trúc / Increment con (BUILD theo thứ tự)

1. **Schema + migration** — thêm model/enum, `prisma migrate dev`, cập nhật `seed.ts`
   (`ACTIVE_MODULE_CODES` + `seedM01()`), chạy lại seed.
2. **`rules.ts`** — viết thuần hàm trước (không phụ thuộc Prisma/Next): `calcRiskScore(S,P)`,
   `deriveRiskLevel(R)`, `validateForSubmit`, `txSubmit/txReview/txLeaderDecide/
   txSubmitEvidence/txVerify` cho cả Risk và Opportunity (Opportunity dùng bản rút gọn, bỏ
   nhánh PENDING_LEADER_APPROVAL vì không có riskLevel).
3. **`labels.ts` + `actor.ts`**.
4. **`actions.ts`** — nối rules.ts với Prisma + session, sinh `code` theo mẫu M10
   (`seq` autoincrement → format `RR-YYYY-NNNN`/`CH-YYYY-NNNN`), ghi `M01AuditEntry` mỗi
   transition.
5. **UI**: list (2 tab, badge risk_level màu theo DacTa: Thấp-xanh/TB-vàng/Cao-đỏ, Rất cao cần
   thêm tone riêng vì DacTa chỉ nêu 3 màu cho 4 mức — dùng đỏ đậm/crit cho cả Cao+Rất cao, phân
   biệt bằng nhãn chữ) → new (2 form riêng Risk/Opportunity vì field khác nhau) → detail +
   ActionPanel.
6. **VERIFY qua Browser** — đủ 3 role thật, đi hết 1 luồng Rủi ro mức Rất cao (chạm state
   PENDING_LEADER_APPROVAL) + 1 luồng mức thường (Cao/TB, không chạm LĐV) + 1 luồng Cơ hội.

## Rollout / Rollback

- 1 nhánh, 1 PR — schema+rules+UI phụ thuộc chặt, không tách nhỏ hơn (đúng lý do đã áp dụng cho
  M21: tách sai chỗ để lại UI gọi model chưa tồn tại).
- Rollback: schema mới additive (bảng M01* độc lập, chỉ FK vào `User` sẵn có) — revert bằng xoá
  migration + `git revert` PR, không ảnh hưởng M10/M21/M29/PlatformModule.

## Risk

- Không phải Tier L: không đổi authentication/tenant isolation, không breaking API công khai,
  không đụng hạ tầng production.
- Rủi ro chính: 4 "Quyết định phạm vi" ở spec.md (state `Đã phê duyệt` không persist riêng,
  state mới `PENDING_LEADER_APPROVAL`, không mô hình hoá tranh chấp thẩm xét, để dashboard Phụ
  lục B ngoài phạm vi) — đã ghi rõ trong spec.md, không phải điều thủ tục quy định tường minh,
  cần LĐP xác nhận lại khi rà soát. Không tự ý coi đây là quyết định cuối cùng nếu người dùng
  phản hồi khác khi VERIFY qua Browser.
- Điểm cần STOP nếu phát sinh khi BUILD: nếu đọc lại `ETV.P01` mục 6.1/Phụ lục A phát hiện mâu
  thuẫn với 4 quyết định phạm vi trên theo hướng khác hẳn giả định — báo người dùng trước khi
  tiếp tục, không tự sửa lại spec rồi build luôn.

## VERIFY checklist (điền vào verify.md sau BUILD)

- [ ] `npx tsc --noEmit` PASS
- [ ] `npx eslint src --max-warnings=0` PASS
- [ ] Luồng Rủi ro mức Rất cao (qua PENDING_LEADER_APPROVAL, LĐV quyết định) — screenshot/log thật
- [ ] Luồng Rủi ro mức thường (Cao/TB/Thấp, TP_QLCL tự phê duyệt) — screenshot/log thật
- [ ] Luồng Cơ hội đầy đủ — screenshot/log thật
- [ ] Thử ≥1 case bị chặn (thiếu cause/control_measure khi gửi soát xét; NV tự soát xét hồ sơ
  mình tạo; assignee tự thẩm xét hồ sơ mình thực hiện) — chứng minh gate hoạt động thật
- [ ] `risk_score` không nhận được giá trị tuỳ ý từ client (server luôn tính lại)
- [ ] `python3 _meta/validate_links.py` PASS (output thật)
- [ ] Cập nhật `01_Requirement/DacTa.md` — hợp nhất kết luận (đặc biệt 4 "Quyết định phạm vi")
- [ ] Cập nhật `09_ENGINEERING/aios-platform/README.md` — thêm mục Increment 4
