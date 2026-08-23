# M14_TaiLieu — PLAN (Increment 12)

## Kiến trúc / File impact

- `prisma/schema.prisma`: enum `M14DocType` (12 giá trị), `M14DocStatus` (**đúng 7**),
  `M14KnowledgeCategory`, `M14DisposalType`, `M14ItemType` + model `M14Document`,
  `M14AiSuggestion`, `M14AuditEntry` + quan hệ trên `User`.
- `src/lib/m14/rules.ts` (AUTHORITATIVE): `missingRequiredFields`, `isValidInternalCode`,
  `txSubmitReview`, `txReview`, `txApprove`, `txPublish`, `txRetire`, `txDiscard`,
  `assertNotAiActor`.
- `src/lib/m14/{labels,actor,actions}.ts` mirror M13.
- UI `src/app/(platform)/modules/M14/`: `page.tsx` (danh mục văn bản + đếm theo trạng thái),
  `doc/new/`, `doc/[id]/` (ActionPanel theo trạng thái + khối gợi ý AI + cảnh báo supersedes).
- `prisma/seed.ts`: `M14` vào `ACTIVE_MODULE_CODES`, tạo `pvt@manlab.vn`, `seedM14()`.
- `01_Requirement/DacTa.md` mục 6; `aios-platform/README.md` Increment 12.

## Increment (1 lần — Tier M)

1. Schema + `prisma migrate dev --name m14_tai_lieu` + `prisma generate` (chạy tay).
2. `rules.ts` (gồm bảng trường bắt buộc theo `docType` và regex mã hóa §6.2) + labels + actor +
   actions.
3. UI: danh mục, form soạn thảo, chi tiết + ActionPanel + khối gợi ý AI ("Áp dụng gợi ý" chỉ hiện
   với người có thẩm quyền).
4. Seed 6 văn bản demo phủ nhánh: (a) Thủ tục Nháp thiếu trường → demo `MISSING_REQUIRED_FIELD`;
   (b) Quy trình `CHO_SOAT_XET` do NTH lập → demo `SELF_REVIEW` + soát xét đạt; (c) Sổ tay
   `CHO_PHE_DUYET` → demo `NO_DELEGATION`; (d) Công văn `DA_PHE_DUYET` chưa ban hành → demo
   publish + thanh lý/hủy bỏ; (e) Văn bản bên ngoài `F14.03-2026-0004` khớp `externalDocRef` của
   khiếu nại M12 → demo cross-module; (f) Thủ tục mới `supersedes` bản cũ. Kèm 1 gợi ý AI chờ áp
   dụng.
5. VERIFY qua Browser: 6 gate, cả nhánh chặn lẫn nhánh thành công, đổi vai trò bằng đăng nhập
   thật — trong đó bắt buộc verify **AI Agent bị chặn đổi trạng thái** bằng tài khoản
   `ai-operator@manlab.vn`.
6. `tsc --noEmit`, `eslint src --max-warnings=0`, `python3 _meta/validate_links.py`.
7. Cập nhật DacTa.md + README; commit → PR → merge → sync.

## Rollout / Rollback

Additive schema only; không sửa model/bảng của module khác (đặc biệt **không** đụng `M12Complaint`
— liên kết đọc theo `externalDocRef` là truy vấn một chiều). Revert = bỏ migration mới nhất +
`git revert`.

## Risk

- Rủi ro chính: gate ISO 42001 nếu viết sai sẽ cho tài khoản AI đổi trạng thái văn bản — vi phạm
  trực tiếp ETV.P14 §6.9 và ràng buộc bất biến của repo. Giảm thiểu: chặn tập trung tại
  `assertNotAiActor` gọi ở **mọi** transition, verify runtime bằng chính tài khoản AI.
- Rủi ro phụ: bảng trường bắt buộc theo `docType` sai → chặn nhầm hoặc bỏ lọt. Giảm thiểu: bảng
  dịch thẳng từ ETV.P14 §6.3, verify bằng hồ sơ seed thiếu trường có chủ đích.
