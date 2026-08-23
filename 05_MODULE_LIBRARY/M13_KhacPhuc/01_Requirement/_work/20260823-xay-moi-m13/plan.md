# M13_KhacPhuc — PLAN (Increment 11)

## Kiến trúc / File impact

- `prisma/schema.prisma`: thêm enum `M13SourceType`, `M13Severity`, `M13NcwStatus`,
  `M13CapStatus`, `M13ItemType` + model `M13NonconformingWork`, `M13CorrectiveActionPlan`
  (1-1), `M13RevokedReport`, `M13MonitoringNote`, `M13AuditEntry` + quan hệ trên `User`
  (`m13NcwDetected`, `m13NcwAssessed`, `m13CapAssigned`, `m13CapReviewed`, `m13CapApproved`,
  `m13MonitoringNotes`, `m13AuditEntries`).
- `src/lib/m13/rules.ts` — state machine thuần hàm (AUTHORITATIVE): `txAssessSeverity`,
  `txCreateCapPlan`, `txCompleteCapPlan`, `txReviewCapPlan`, `txCloseNcw`,
  `txApproveReplacementReport`, `canAssess`.
- `src/lib/m13/labels.ts`, `src/lib/m13/actor.ts` (mirror M12, `moduleCode = "M13"`),
  `src/lib/m13/actions.ts` (Server Actions + audit + revalidate).
- UI `src/app/(platform)/modules/M13/`: `page.tsx` (sổ theo dõi + đếm việc đang dừng),
  `ncw/new/`, `ncw/[id]/` (ActionPanel theo trạng thái + thu hồi báo cáo + ghi chép theo dõi).
- `prisma/seed.ts`: thêm `M13` vào `ACTIVE_MODULE_CODES`, tạo tài khoản `qlkt@manlab.vn`,
  `seedM13()`.
- `01_Requirement/DacTa.md` mục 6 "Triển khai thật"; `aios-platform/README.md` Increment 11.

## Increment (1 lần — Tier M, phạm vi tương đương M12)

1. Schema + `prisma migrate dev --name m13_khac_phuc` + `prisma generate` (bắt buộc chạy tay,
   theo sự cố đã gặp ở Increment 10).
2. `rules.ts` + `labels.ts` + `actor.ts` + `actions.ts`.
3. UI: sổ theo dõi, form ghi nhận KPH, trang chi tiết + ActionPanel.
4. Seed: 4 KPH demo phủ đủ nhánh gate — (a) Nhẹ chưa có ghi chép (demo `MONITORING_REQUIRED`),
   (b) Nặng đã có phương án chờ thẩm xét (demo `SELF_REVIEW` + thẩm xét đạt),
   (c) Nặng đã thu hồi báo cáo, phương án chưa đạt (demo `CAP_REVIEW_REQUIRED` khi đóng và khi
   xin phát hành thay thế), (d) KPH nguồn khiếu nại ← M12 (demo cross-module link).
5. VERIFY qua Browser: 4 gate, cả nhánh chặn lẫn nhánh thành công, đổi vai trò thật.
6. `tsc --noEmit`, `eslint src --max-warnings=0`, `python3 _meta/validate_links.py`.
7. Cập nhật DacTa.md + README, commit → PR → merge → sync.

## Rollout / Rollback

Additive schema only (chỉ thêm model/enum mới + quan hệ mới trên `User`, không sửa model đã có,
**không đụng bảng M12**) — revert bằng cách bỏ migration mới nhất + revert commit, không ảnh
hưởng module khác. Tài khoản `qlkt@manlab.vn` là dữ liệu seed, không phá dữ liệu có sẵn.

## Risk

- Rủi ro chính: gate "không tự mở khóa" nếu viết sai sẽ cho đóng hồ sơ mức Nặng khi chưa thẩm
  xét đạt — vi phạm trực tiếp ISO/IEC 17025 §7.10. Giảm thiểu: logic đặt trong `rules.ts` thuần
  hàm, verify cả 2 nhánh qua UI thật trước khi merge.
- Không có migration phá hủy dữ liệu, không đụng auth/phân quyền nền tảng → không phải Tier L.
