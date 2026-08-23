# M12_KhieuNai — PLAN (Increment 10)

## Kiến trúc / File impact

- `prisma/schema.prisma`: thêm `M12Channel`, `M12ComplaintStatus`, `M12FeedbackOrigin`,
  `M12FeedbackCategory`, `M12ItemType` (enum) + `M12Complaint`, `M12Feedback`, `M12AuditEntry`
  (model) + quan hệ trên `User` (`m12ComplaintCreated`, `m12ComplaintAssigned`,
  `m12FeedbackCreated`, `m12AuditEntries`).
- `src/lib/m12/rules.ts` — state machine thuần hàm (AUTHORITATIVE): `txAssignComplaint`,
  `txRespondComplaint`, `txCloseComplaint`, `requiresExternalDoc`, `canEscalate`.
- `src/lib/m12/labels.ts` — nhãn tiếng Việt cho enum + vai trò.
- `src/lib/m12/actor.ts` — mirror `src/lib/m01/actor.ts`, `moduleCode = "M12"`.
- `src/lib/m12/actions.ts` — Server Actions: `createComplaint`, `assignComplaint`,
  `respondComplaint`, `closeComplaint`, `createFeedback`, `escalateFeedback`,
  `listOpenComplaints`.
- UI `src/app/(platform)/modules/M12/`: `page.tsx` (danh sách khiếu nại + feedback gần đây),
  `complaint/new/`, `complaint/[id]/` (ActionPanel theo trạng thái), `feedback/new/`.
- `prisma/seed.ts`: thêm `M12` vào `ACTIVE_MODULE_CODES`, `seedM12()` — dùng lại 4 tài khoản demo
  đã có (nth/ldp/ldv/qlcl@manlab.vn), không tạo tài khoản mới.

## Increment (1 lần, không chia nhỏ thêm — Tier M vừa phải)

1. Schema + migration (`prisma migrate dev --name m12_khieu_nai`).
2. `rules.ts` + unit-level tự kiểm bằng tsc (không có test runner riêng trong repo này, theo
   đúng pattern M01–M17 — verify qua Browser thay test tự động).
3. `actor.ts` + `labels.ts` + `actions.ts`.
4. UI: trang danh sách + form tạo khiếu nại + trang chi tiết (ActionPanel: phân công/trả lời/
   đóng-dừng) + form tạo feedback + nút escalate.
5. Seed: 1 khiếu nại "giải thích ngay, khách hài lòng" (đóng ngay), 1 khiếu nại "không giải thích
   được" đang ở bước chờ phân công (demo gate F14.03 sống), 1 khiếu nại phức tạp đã trả lời chờ
   đóng (demo gate CAPA), 1 feedback đã escalate.
6. Verify qua Browser: gate F14.03, gate CAPA khi đóng phức tạp, gate LĐV-only khi dừng giải
   quyết, nhánh tắt đóng ngay khi giải thích tại chỗ.
7. Cập nhật `01_Requirement/DacTa.md` mục "Triển khai thật"; cập nhật
   `09_ENGINEERING/aios-platform/README.md` Increment 10.
8. `python3 _meta/validate_links.py`.

## Rollout / Rollback

Additive schema only (model mới, không sửa model đã có) — an toàn để revert bằng cách bỏ
migration mới nhất + revert commit nếu cần, không ảnh hưởng module khác.
