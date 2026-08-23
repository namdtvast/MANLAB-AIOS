# M16_DanhGiaNoiBo — Kế hoạch triển khai (Increment 13)

Tham chiếu `spec.md` cùng thư mục. Bám kiến trúc sẵn có: rule thuần hàm ở `src/lib/m16/rules.ts`
(AUTHORITATIVE), action chỉ gọi rule rồi ghi DB, UI server component + form client nhỏ.

## File impact

```
prisma/schema.prisma                  (sửa) enum M16QualType; M16ProgramStatus += CLOSED;
                                            M13SourceType += DANH_GIA_NOI_BO;
                                            model M16AuditorQualification / M16ProgramMember /
                                            M16ReportDissent; field mới trên M16AuditProgram,
                                            M16AuditFinding, M16AuditPlan; quan hệ User/M03/M13
prisma/seed.ts                        (sửa) 2 tài khoản demo mới + năng lực + gắn nhân sự thật
src/lib/m16/rules.ts                  (sửa) gate mới — AUTHORITATIVE
src/lib/m16/labels.ts                 (sửa) QUAL_TYPE_LABEL, PROGRAM_STATUS_LABEL += CLOSED
src/lib/m16/actions.ts                (sửa) 6 action mới + sửa createAuditProgram/confirm
src/lib/m13/labels.ts                 (sửa) nhãn nguồn phát hiện mới
src/app/(platform)/modules/M16/auditors/page.tsx        (mới) sổ năng lực đánh giá viên
src/app/(platform)/modules/M16/auditors/RecognizeForm.tsx (mới)
src/app/(platform)/modules/M16/plan/[id]/NewProgramForm.tsx (sửa) chọn nhân sự thật M03
src/app/(platform)/modules/M16/program/[id]/page.tsx     (sửa) cảnh báo mềm, KPH→M13, đóng, bảo lưu
src/app/(platform)/modules/M16/program/[id]/FindingActions.tsx (mới)
src/app/(platform)/modules/M16/program/[id]/DissentForm.tsx    (mới)
src/app/(platform)/modules/M16/program/[id]/CloseProgramPanel.tsx (mới)
src/app/(platform)/modules/M16/page.tsx                  (sửa) badge CLOSED + cột cảnh báo
```

Không đụng rule/action của M01/M02/M03/M04/M10/M12/M13/M14/M17/M21/M29 (chỉ thêm 1 giá trị enum
+ 1 nhãn cho M13, và **gọi lại** `createNcw` của M13 thay vì ghi thẳng vào bảng M13).

## Increment con (BUILD theo thứ tự, mỗi bước revert độc lập được)

1. **Schema + migration** `m16_hoan_thien_dacta` (additive) + `prisma generate`.
2. **`rules.ts`** — `txRecognizeQualification`, `missingQualifications`, `canConfirmProgram` mở
   rộng, `programPreparationWarning`, `txAcknowledgeFinding`, `txProposeCorrectiveAction`,
   `canRecordDissent`, `txCloseProgram`, `canProposeFollowUp`.
3. **`labels.ts`** + `m13/labels.ts`.
4. **`actions.ts`** — 6 action mới, sửa `createAuditProgram` (nhận `teamLeadEmployeeId` +
   `memberEmployeeIds`, tự chụp tên), `confirmAuditProgram` (nạp thành viên + năng lực rồi gọi rule).
5. **UI** — sổ năng lực → form lập chương trình chọn nhân sự → trang chương trình (cảnh báo mềm,
   hành động trên phát hiện, ý kiến bảo lưu, panel đóng/đề xuất bổ sung) → badge ở trang danh sách.
6. **`seed.ts`** — 2 tài khoản mới, năng lực demo cho `NS-2026-0001` (đủ 3 loại) và **không** cấp
   cho `NS-2026-0002` (để demo gate chặn), gắn `teamLeadEmployeeId`/`M16ProgramMember` cho
   `CTDG-2026-0001`.
7. **VERIFY qua Browser** theo 5 SUCCESS CRITERIA của `spec.md` + `tsc`/`eslint`/`validate_links.py`.

## Rollout / Rollback

- 1 nhánh `feat/m16-hoan-thien-theo-dacta`, 1 PR vào `main`.
- Schema thuần additive (không xoá/đổi kiểu cột nào, `capaRef` giữ nguyên) → rollback = `git
  revert` + `prisma migrate resolve`/xoá thư mục migration mới. Dữ liệu M13 sinh ra từ M16 vẫn hợp
  lệ trong M13 sau khi revert (chỉ mất liên kết ngược `ncwId`).
- Giá trị enum `M13SourceType.DANH_GIA_NOI_BO` là điểm duy nhất không revert "sạch" nếu đã có dữ
  liệu dùng nó → nếu cần revert, đổi các bản ghi đó về `KHAC` trước.

## Risk

- Tier M (không phải L: không đụng auth, không đa tenant, không migration phá hủy dữ liệu).
- Rủi ro chính: 5 "Quyết định phạm vi" trong `spec.md` — đặc biệt #1 (năng lực đăng ký có bằng
  chứng thay vì suy diễn) và #3 (đóng ở cấp chương trình) — cần LĐP xác nhận.
- Rủi ro kỹ thuật: chương trình cũ (`CTDG-2026-0001`) chưa có `teamLeadEmployeeId` → gate mới sẽ
  chặn nếu xác nhận lại; giảm thiểu bằng seed gán FK cho bản ghi demo cũ.

## VERIFY checklist (điền vào verify.md sau BUILD)

- [ ] `npx tsc --noEmit` PASS
- [ ] `npx eslint src --max-warnings=0` PASS
- [ ] Gate năng lực: thành viên chưa đủ năng lực → chặn xác nhận chương trình
- [ ] Gate bằng chứng năng lực: hồ sơ đào tạo chưa Đạt → chặn công nhận
- [ ] KPH → tạo hồ sơ M13 thật, mở được từ M13, `sourceType = DANH_GIA_NOI_BO`
- [ ] Gate đóng chương trình khi KPH chưa khắc phục xong → chặn
- [ ] Cảnh báo mềm 7–13 ngày hiển thị, không chặn
- [ ] Ý kiến bảo lưu lưu và hiển thị dưới báo cáo
- [ ] `python3 _meta/validate_links.py` PASS
- [ ] Cập nhật `01_Requirement/DacTa.md` mục "Triển khai thật"
- [ ] Cập nhật `09_ENGINEERING/aios-platform/README.md` Increment 13
