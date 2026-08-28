# VERIFY — 20260828-gan-ky-nang-cong-cu-tac-tu

Chạy 28/08/2026 trên dev server trong worktree (cổng 55887) + Postgres `aios_platform_dev`,
đăng nhập tài khoản demo `SUPER_ADMIN`. Tác tử dùng để kiểm: **AGENT_TROLY_M29** (tác tử demo) —
cố ý **không** kiểm trên `AGENT_COPILOT_TRACUU` vì nâng quyền sẽ tạm dừng Copilot mà chủ sở hữu
đang dùng thật.

| # | Việc kiểm | Kết quả |
|---|---|---|
| 1 | `npm test` | **PASS** — 480 ca (thêm 8 ca mới cho `kiemTraGanCongCu`, trước là 472) |
| 2 | `npx eslint .` | **PASS** — 0 lỗi, 2 cảnh báo có sẵn ở `prisma/seed.ts` |
| 3 | `npm run build` | **PASS** |
| 4 | `python3 _meta/validate_links.py` | **PASS** — 564 link · 46 MP · 38 M · 22 CAP, 0 vấn đề |
| 5 | `npm run kiem-tra-hdsd` | **PASS** — M29 nay 10 bước |
| 6 | Cảnh báo hiện **lúc tick**, chưa bấm lưu | **PASS** — tick công cụ mức Đọc vào whitelist rỗng: hiện khối cảnh báo mục 5.8, mọc ô "Lý do nâng quyền", nút đổi nhãn thành "Lưu và tạm dừng tác tử" |
| 7 | Bỏ công cụ khỏi whitelist (thay đổi nhỏ) | **PASS** — `toolIds: []`, tác tử vẫn `ACTIVE`, AIA vẫn `APPROVED`; `AIAuditLog` ghi `field=toolIds`, before `{status: ACTIVE, toolIds:[M10_KpiSummary]}` → after `{status: ACTIVE, toolIds: []}`, lý do dẫn mục 5.4.1 |
| 8 | Gán lại công cụ đó (0 → Đọc = nâng quyền) | **PASS** — tác tử `SUSPENDED` / `suspendedReason=TOOL_PERMISSION_RAISED`; `AIA-2026-001` `APPROVED` → `REVIEW_REQUIRED`; audit ghi đủ before/after + trích mục 5.8 + lý do người nhập |
| 9 | Hệ quả thật ở cổng sau khi nâng quyền | **PASS** — bấm *Gọi Tool*: `Agent "Trợ lý AI (M29)" đang ở trạng thái SUSPENDED (lý do: TOOL_PERMISSION_RAISED) — Tool Gateway chặn, không forward tới nền tảng.` (bước 3b) |
| 10 | Gán/bỏ kỹ năng | **PASS** — bỏ rồi gán lại `PhanTichKPI`; tác tử giữ nguyên `ACTIVE`, AIA không đổi — đúng nhánh thay đổi nhỏ |
| 11 | Khôi phục dữ liệu demo | **PASS** — AIA duyệt lại về `APPROVED`, tác tử mở lại `ACTIVE`, `toolIds`/`skillIds` đúng như seed. Nhật ký thay đổi **giữ nguyên** các bản ghi kiểm chứng: sổ append-only, không sửa lại được và cũng không nên |
| 12 | Phân quyền (`registry:write`) | **NOT RUN** dưới dạng thử tay với vai trò khác — bộ chuyển tài khoản demo không bật trong worktree này. Đã kiểm bằng đọc mã: giao diện gác `can(role,"registry","write")`, và **cả hai** action gọi lại `can(...)` trả `forbidden()` — cùng khuôn với mọi action khác trong `actions.ts`; `can()` đã có test ở `model.test.ts` |

## Điều chưa làm và biết là chưa làm

- **`skillIds` vẫn không có tác dụng lúc chạy.** Màn hình này chỉ làm cho nó *khai báo được*.
  Muốn kỹ năng thật sự đổi hành vi tác tử thì phải nối vào lời nhắc hoặc bộ chọn công cụ — đó là
  thay đổi hành vi, phải đi qua AIA, cố ý để ngoài phạm vi.
- **Thông báo chặn của cổng in mã thô** (`TOOL_PERMISSION_RAISED`) thay vì nhãn tiếng Việt.
  Có sẵn từ trước với `MODEL_CHANGED`, không sửa kèm ở đây để không đụng `gateway.ts` vì lý do
  thẩm mỹ.
- Chưa có màn hình nào cho `AI_ADMIN` (không phải SUPER_ADMIN) thử thật — xem mục 12.
