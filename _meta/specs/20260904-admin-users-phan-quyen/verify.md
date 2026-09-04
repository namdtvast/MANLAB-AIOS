# Verification report — /admin/users

- **work-id:** `20260904-admin-users-phan-quyen` · **Tier:** L · **Ngày:** 04/09/2026
- **Môi trường verify:** PostgreSQL cục bộ `aios_wt_phanquyen` (tạo mới cho lần kiểm này, đã `dropdb` sau khi xong), `next dev`, dữ liệu từ `prisma/seed.ts`.

## Kết quả theo tiêu chí nghiệm thu (spec §3.4)

| # | Tiêu chí | Trạng thái | Bằng chứng |
|---|---|---|---|
| 1 | Gán vai trò module theo phiếu đã phê duyệt | **PASS** | ADMIN cấp `M01 · NV` cho `qtht@manlab.vn` theo phiếu `QTC-2026-001` (DA_PHE_DUYET). Dòng `ModuleRoleAssignment` sinh ra kèm `accessRequestId` — đúng thứ `getActor()` của module đọc |
| 2 | Không phiếu / phiếu người khác / phiếu chưa duyệt bị chặn | **PASS** | Trang của `admin@manlab.vn` (không có phiếu nào): cảnh báo hiện ra, nút Cấp và Đổi vai trò nền tảng đều vô hiệu. Ba nhánh còn lại (`TICKET_REQUIRED`, `TICKET_SUBJECT`, `TICKET_STATE` với `CHO_PHE_DUYET`/`TU_CHOI`/`DA_THU_HOI`) có test đơn vị |
| 3 | Vai trò ngoài danh mục module bị chặn | **PASS** | Test đơn vị: `QTHT` (có thật ở M33) bị từ chối khi cấp cho M10 → `INVALID_ROLE` |
| 4 | Thu hồi bắt buộc lý do, có vết | **PASS** | Bấm Thu hồi khi ô lý do rỗng → "Thu hồi bắt buộc nêu lý do…". Nhập lý do → dòng quyền biến mất khỏi `ModuleRoleAssignment`, `PlatformAccessAudit` giữ cả `CAP_VAI_TRO_MODULE` lẫn `THU_HOI_VAI_TRO_MODULE` kèm lý do |
| 5 | Tự đổi vai trò của mình / hạ ADMIN cuối | **PASS** | Test đơn vị `SELF_CHANGE`, `LAST_ADMIN`. Không dựng được tình huống này trên giao diện vì tài khoản admin demo chưa có phiếu nên nút đã vô hiệu từ trước |
| 6 | Không phải ADMIN mở trang | **PASS** | Đăng nhập `qtht@manlab.vn` (`PlatformRole=MEMBER`) mở `/admin/users` → "Không có quyền truy cập" |
| 7 | Mỗi thao tác thành công sinh đúng một bản ghi vết | **PASS** | Sau hai thao tác, bảng vết có đúng hai dòng, đúng thứ tự, đúng căn cứ |

Trang danh sách hiển thị **79 vai trò module chưa truy được về phiếu F28.04** — toàn bộ là dữ liệu demo do `seed.ts` tạo trước khi có cơ chế căn cứ (spec §3.5). Đây là con số cố ý phơi ra, không phải lỗi.

## Kiểm tra tự động

| Lệnh | Kết quả |
|---|---|
| `npx tsc --noEmit` | **PASS** (exit 0) |
| `npx eslint src` | **PASS** (exit 0) |
| `npx vitest run` | **PASS** — 29 file, 546 test (thêm 9 test mới) |
| `npm run build` | **PASS** — `/admin/users` và `/admin/users/[id]` vào bảng route |
| `npx prisma migrate deploy` | **PASS** trên database trắng — gồm `20260904150000_admin_users_phan_quyen` |
| `npx tsx prisma/seed.ts` | **PASS** |
| `python3 _meta/validate_links.py` | **PASS** — 617 link, 0 vấn đề |
| `python3 _meta/validate_citations.py --chan` | **PASS** — 1048 trích dẫn, 0 hỏng |
| `npm run kiem-tra-hdsd` | **PASS** — 18 file |

## Chưa verify

- **Migration trên cơ sở dữ liệu thật (VPS):** NOT RUN — phiên làm việc không truy cập được máy chủ đó. Migration chỉ `CREATE TYPE` + `ADD COLUMN` nullable + `CREATE TABLE` + khóa ngoại; không backfill, không DROP.
- **Vai trò vừa cấp có hiệu lực trong chính module đó:** kiểm gián tiếp — dòng `ModuleRoleAssignment` đúng người/đúng module/đúng mã vai trò là điều kiện duy nhất `src/lib/mXX/actor.ts` đọc. Chưa mở module M01 bằng tài khoản vừa được cấp để xem tận mắt.
- **Hai chốt an toàn `SELF_CHANGE` và `LAST_ADMIN` trên giao diện thật:** chỉ có test đơn vị (xem tiêu chí 5).
