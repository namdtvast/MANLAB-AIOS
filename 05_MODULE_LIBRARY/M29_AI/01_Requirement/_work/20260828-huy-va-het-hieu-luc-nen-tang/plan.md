# PLAN — 20260828-huy-va-het-hieu-luc-nen-tang

## File impact

| File | Thay đổi |
|---|---|
| `src/lib/m29/rules.ts` | thêm `approvalTransitions.cancel()`; `archive()` nhận `activeDependents` và kiểm `reason.trim()`; hằng `PRE_APPROVAL_STATUSES` |
| `src/lib/m29/actions.ts` | `approvalAction` nhận thêm `"cancel"`; nạp danh sách phụ thuộc đang hoạt động cho nhánh archive/cancel của platform; `createTool` chặn nền tảng chưa phê duyệt/đã kết thúc |
| `src/app/(platform)/modules/M29/registry/RegistryActions.tsx` | bộ nút đầy đủ theo trạng thái + ô nhập lý do |
| `src/app/(platform)/modules/M29/registry/page.tsx` | lọc danh sách nền tảng truyền vào form đăng ký công cụ |
| `src/lib/m29/labels.ts` | nhãn `ARCHIVED` |
| `src/lib/m29/__tests__/rules.test.ts` | ca test cho AC1–AC3 |
| `07_Workflow/StateMachine.md`, `01_Requirement/DacTa.md`, `04_UI/HDSD.yaml` | đồng bộ tài liệu module |

Không đụng `prisma/schema.prisma` — cả hai trạng thái đã có sẵn trong enum `AIApprovalStatus`.

## Increment

1. **Luật** — `rules.ts` + test. Revert độc lập được.
2. **Tầng hành động** — `actions.ts` (cancel, chặn phụ thuộc, chặn `createTool`).
3. **Giao diện** — `RegistryActions.tsx`, `page.tsx`, `labels.ts`.
4. **Tài liệu** — StateMachine/DacTa/HDSD + `verify.md`.

## Rủi ro và rollback

| Rủi ro | Xử lý |
|---|---|
| Chặn `createTool` làm hỏng luồng đang dùng (nền tảng demo ở `DRAFT`) | Dữ liệu mẫu: công cụ duy nhất trỏ `MANLAB` (`APPROVED`) — không ảnh hưởng. Nền tảng `DRAFT` vốn đã không được phép nhận công cụ theo §6.7 |
| Chặn phụ thuộc làm LĐV không ngừng được nền tảng | Đúng chủ ý của §6.5.3; thông báo nêu rõ phải tắt/chuyển hướng đối tượng nào trước |
| Nhầm Hủy với Hết hiệu lực | Hai nút không bao giờ hiện cùng lúc — tập trạng thái nguồn rời nhau |

Rollback: `git revert` theo từng increment; không có migration nên không có bước lùi dữ liệu.
