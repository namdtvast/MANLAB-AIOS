# Verification report — thu hồi và tạm khóa tài khoản đăng nhập

- **work-id:** `20260904-thu-hoi-tai-khoan` · **Tier:** L · **Ngày:** 04/09/2026
- **Môi trường verify:** PostgreSQL cục bộ `aios_wt_thuhoi` (tạo mới cho lần kiểm này, đã `dropdb` sau khi xong), `next dev` trên cổng tạm, dữ liệu từ `prisma/seed.ts`.

## Kết quả theo tiêu chí nghiệm thu (spec §3.4)

| # | Tiêu chí | Trạng thái | Bằng chứng |
|---|---|---|---|
| 1 | `authorize()` từ chối tài khoản `TAM_KHOA`/`DA_THU_HOI` | **PASS** | Đăng nhập `ldp@manlab.vn` khi `TAM_KHOA` → "Sai email hoặc mật khẩu."; lặp lại khi `DA_THU_HOI` → cùng thông báo. Log: `loginAction({"email":"ldp@manlab.vn","error":"Sai email hoặc mật khẩu."})` |
| 2 | `session` callback bỏ `id`/`role`, đặt `biKhoa` | **PASS** | Suy ra từ tiêu chí 3 — proxy chỉ chuyển hướng khi thấy cờ này |
| 3 | Phiên đang mở bị cắt | **PASS** | Đang đăng nhập LĐP tại `/dashboard`, đặt `accountStatus='TAM_KHOA'` ngoài phiên → request kế tiếp rơi về `GET /login?loi=khoa` kèm thông báo trên trang |
| 4 | Khóa/thu hồi bản ghi có `platformUserId` cập nhật `User` cùng transaction | **PASS** | Tạm khóa TK-2026-0003 từ giao diện: sổ `TAM_KHOA` + `User.ldp` `TAM_KHOA`, **cùng một lý do** `F28.04-2026-041 — nghi ngờ lộ mật khẩu`, `accountStatusAt` khác NULL. Thu hồi sau đó: cả hai sang `DA_THU_HOI` |
| 5 | Bản ghi không có `platformUserId` không đụng `User` | **PASS** | Thu hồi TK-2026-0001 (`root-manlab`, người giữ QTHT): sổ `DA_THU_HOI`, `User.qtht` vẫn `DANG_HOAT_DONG`, `accountStatusAt` vẫn NULL |
| 6 | Mở khóa đưa cả hai về hoạt động | **PASS** | Bấm "Mở lại" với kết luận PT.ATTT: sổ và `User.ldp` cùng về `DANG_HOAT_DONG`, lý do ghi đúng nội dung mới |
| 7 | Non-QTHT/non-ADMIN nhận `FORBIDDEN` | **PASS** | `src/lib/m33/__tests__/rules.test.ts` — QTHT và ADMIN thu hồi được, `m33Role: null` và `ATTT` nhận `FORBIDDEN` |

Thẩm quyền ADMIN nền tảng (spec §2.2) được kiểm bằng chính lần chạy trên: mọi thao tác giao diện ở trên do `admin@manlab.vn` (`PlatformRole=ADMIN`, không có vai trò module M33) thực hiện.

## Kiểm tra tự động

| Lệnh | Kết quả |
|---|---|
| `npx tsc --noEmit` | **PASS** (exit 0) |
| `npx eslint src` | **PASS** (exit 0) |
| `npx vitest run` | **PASS** — 28 file, 537 test (thêm 7 test mới) |
| `npm run build` | **PASS** — biên dịch thành công, 90 trang |
| `npx prisma migrate deploy` | **PASS** trên database trắng — 44 migration, gồm `20260904090000_thu_hoi_tai_khoan` |
| `npx tsx prisma/seed.ts` | **PASS** — TK-2026-0003 sinh đúng kèm `platformUserId` |
| `python3 _meta/validate_links.py` | **PASS** — 617 link, 0 vấn đề |
| `python3 _meta/validate_citations.py --chan` | **PASS** — 1046 trích dẫn, 0 hỏng |
| `npm run kiem-tra-hdsd` | **PASS** — M33 10 bước, 0 lưu ý |

## Sửa phát sinh trong lúc verify

Ô "Lý do/phiếu" dùng chung cho mọi nút trong một dòng, và trước đây không được xóa sau khi chạy — thu hồi ngay sau một lần tạm khóa sẽ ghi lại lý do của lần tạm khóa làm căn cứ thu hồi. Quan sát được đúng lần đầu chạy thật. Đã thêm bước xóa ô sau mỗi thao tác thành công.

## Chưa verify

- **Migration trên cơ sở dữ liệu thật (VPS):** NOT RUN — phiên làm việc không truy cập được máy chủ đó. Migration chỉ gồm `CREATE TYPE` + `ADD COLUMN` (có mặc định) + `CREATE UNIQUE INDEX` + `ADD FOREIGN KEY`, không backfill, không DROP; đã chạy sạch trên database trắng.
- **Tải thực tế của truy vấn thêm trong `session` callback:** NOT RUN — chỉ đo trên dữ liệu seed một người dùng.
