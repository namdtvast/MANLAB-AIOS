# M21_CongBoNangLuc — Kế hoạch triển khai di trú (Increment 1)

Tham chiếu `spec.md` cùng thư mục. Kiến trúc/khuôn mẫu bám sát `src/lib/m10/*` +
`src/app/(platform)/modules/M10/*` đã có trong `aios-platform`.

## DB impact (Prisma schema — additive, không sửa model M10/PlatformModule)

Thêm vào `09_ENGINEERING/aios-platform/prisma/schema.prisma`:

- `enum M21RecordType { DL QTMT }`
- `enum M21Status { CHUALAP DANGLAP SOATXET DNLDV PHENOIBO DAGUI YEUCAUBOSUNG TIEPNHAN CONGHIEU DIEUCHINH TAMDUNG HUYBO HETHIEU }`
  (đặt tên SCREAMING_SNAKE_CASE viết hoa không dấu từ khoá gốc `trangThai`, giữ nhãn tiếng Việt
  ở tầng UI `labels.ts` — đúng convention đã dùng cho M10Status).
- `enum M21LineResult { DAPUNG KHONG DIEUCHINH }`
- `model M21Record` — các trường header liệt kê ở `spec.md`; `phienBanCu` kiểu `Json` (mảng
  snapshot); quan hệ `lines M21Line[]`, `auditEntries M21AuditEntry[]`; `createdById/reviewedById
  (nullable)/approvedById (nullable)` quan hệ `User` (thêm 3 relation ngược trên `User` giống
  M10Created/M10Reviewed/M10Approved).
- `model M21Line` — 1-N với `M21Record` (`onDelete: Cascade`); `catalogRef` giữ string tự do
  (không FK sang bảng danh mục PTĐ vì M05 chưa có backend thật — xem Quyết định phạm vi #1 trong
  spec.md).
- `model M21AuditEntry` — mirror `M10AuditEntry` nguyên cấu trúc (`recordId, ts, actorId, role,
  action, reason`).

Migration: `npx prisma migrate dev --name m21_record` (additive — an toàn revert bằng
`prisma migrate resolve` + xoá migration nếu cần, không đụng dữ liệu M10 hiện có).

## File impact

```
prisma/schema.prisma                                   (sửa — thêm model/enum M21, KHÔNG sửa phần M10)
prisma/seed.ts                                          (không sửa — M21 đã ACTIVE + sourcePath sẵn từ Increment 0)
src/lib/m21/rules.ts        (mới)  port TR/ST/gateCheck/lineGaps/recordGaps/hasGoodLine/doTransition-logic — AUTHORITATIVE
src/lib/m21/labels.ts       (mới)  nhãn tiếng Việt (ST labels, RECORD_TYPE, LINE_RESULT, ROLE)
src/lib/m21/actor.ts        (mới)  mirror src/lib/m10/actor.ts — getActor/getM21Role qua ModuleRoleAssignment moduleCode="M21"
src/lib/m21/catalog.ts      (mới)  dữ liệu nhúng tĩnh danh mục PTĐ (port từ DL_SERVICES/mảng embedded trong index.html) + gateCheck dùng chung với rules.ts
src/lib/m21/actions.ts      (mới)  "use server" — createRecord, addLine, updateLine, deleteLine, transition(recordId, to, {reason?, receiptNo?})
src/app/(platform)/modules/M21/page.tsx              (mới) danh sách hồ sơ (2 loại, lọc trạng thái) — route ưu tiên hơn [code] catch-all, giống mẫu M10
src/app/(platform)/modules/M21/new/page.tsx          (mới) chọn loại (DL/QTMT) + NewRecordForm
src/app/(platform)/modules/M21/new/NewRecordForm.tsx (mới)
src/app/(platform)/modules/M21/[id]/page.tsx         (mới) chi tiết hồ sơ: header + bảng dòng đối tượng + BR panel + audit log
src/app/(platform)/modules/M21/[id]/LinesTable.tsx   (mới) bảng dòng đối tượng (thêm/sửa/xoá dòng, chọn từ danh mục hoặc nhập tay)
src/app/(platform)/modules/M21/[id]/ActionPanel.tsx  (mới) mirror M10 ActionPanel — nút transition theo trạng thái hiện tại + gate vai trò
```

Không đụng `src/lib/m10/*`, `src/components/*` (dùng lại design token `bg/surface/ink/accent/...`
đã có sẵn từ redesign trước, không tạo hệ màu riêng cho M21).

## Kiến trúc / Increment con (BUILD theo thứ tự, mỗi bước tự verify được)

1. **Schema + migration** — thêm model, chạy migrate dev, `prisma db seed` lại (không phá dữ liệu
   M10 vì additive).
2. **`rules.ts`** — port state machine + gate thuần hàm (không phụ thuộc DB/Next) để có thể test
   độc lập bằng mắt/console trước khi nối UI, giống cách `m10/rules.ts` tách khỏi actions.ts.
3. **`labels.ts` + `catalog.ts`** — nhãn hiển thị + dữ liệu danh mục tĩnh.
4. **`actor.ts` + `actions.ts`** — nối rules.ts với Prisma + session thật.
5. **UI: list → new → detail (header + BR panel + audit log) → ActionPanel → LinesTable** — theo
   đúng thứ tự M10 đã làm (list trước, rồi mới vào chi tiết).
6. **VERIFY qua Browser** — đi hết luồng DL và QTMT bằng account NTH/LDP/LDV thật.

## Rollout / Rollback

- 1 nhánh, 1 PR (không tách nhỏ hơn vì schema+rules+UI phụ thuộc chặt, tách PR sẽ để lại UI gọi
  model chưa tồn tại — vi phạm "mỗi increment ở PLAN phải revert độc lập" nếu tách sai chỗ).
- Rollback: schema mới là additive (bảng M21* độc lập, không FK ngược vào bảng hiện có ngoài
  `User`) — revert bằng cách xoá migration + `git revert` PR, không ảnh hưởng M10/PlatformModule.
- KHÔNG tắt/đổi app gốc `08_Source/index.html` trong increment này (submodule vẫn giữ nguyên) —
  đúng nguyên tắc M10 đã áp dụng ("2 nguồn dữ liệu cùng tồn tại, quyết định tắt bản cũ để sau").

## Risk

- **Rủi ro chính**: nhầm quy tắc BR khi port thủ công từ JS minified 1 dòng sang TypeScript — đã
  giảm thiểu bằng cách trích xuất nguyên văn từng hàm gốc (`gateCheck`, `lineGaps`, `recordGaps`,
  `doTransition`, `rulesPanel`, `var TR`, `var ST`) trước khi viết, không suy diễn từ README.
- Không phải Tier L: không đổi authentication, không đổi tenant isolation, không breaking API
  công khai nào (chưa có API công khai M21 trong platform), không đụng hạ tầng production.
- Điểm cần STOP nếu phát sinh khi BUILD (không tự quyết): nếu phát hiện quy tắc BR nào trong
  code gốc mâu thuẫn với luật hiện hành đã đổi (vd BR8 mốc 28/02/2027 đã qua ở thời điểm build) —
  báo cho người dùng, không tự sửa mốc pháp lý.

## VERIFY checklist (điền vào verify.md sau BUILD)

- [ ] `npx tsc --noEmit` PASS
- [ ] `npx eslint src --max-warnings=0` PASS
- [ ] Luồng DL đầy đủ qua Browser (3 role thật) — screenshot/log thật
- [ ] Luồng QTMT đầy đủ qua Browser — screenshot/log thật
- [ ] Thử ≥1 case bị chặn (thiếu trường bắt buộc / thiếu lý do / sai vai trò) — chứng minh gate
  hoạt động, không chỉ "code có vẻ đúng"
- [ ] `python3 _meta/validate_links.py` PASS (output thật)
- [ ] Cập nhật `01_Requirement/DacTa.md` — hợp nhất kết luận đặc tả cuối (không để spec.md/plan.md
  cạnh tranh với DacTa.md sau khi xong)
