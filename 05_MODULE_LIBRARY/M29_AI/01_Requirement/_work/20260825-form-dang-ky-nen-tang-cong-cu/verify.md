# Verify — 20260825-form-dang-ky-nen-tang-cong-cu

Môi trường: worktree riêng, `next dev` cổng 3100, Postgres `aios_platform_dev` (dùng chung với phiên khác — dữ liệu thử đã xóa sạch sau khi kiểm, xem mục Dọn dẹp).

## Kiểm tự động

| Hạng mục | Lệnh | Kết quả |
|---|---|---|
| Biên dịch | `npm run build` | **PASS** — dựng đủ route, có `/modules/M29/registry` |
| Kiểu | `npx tsc --noEmit` | **PASS** — exit 0 |
| Test đơn vị | `npm test` | **PASS** — 15 file, 237 test |
| Lint | `npm run lint` | **PASS** — 0 lỗi (2 cảnh báo có sẵn ở `prisma/seed.ts`, không thuộc thay đổi này) |

## Kiểm trên trình duyệt thật

| # | Tình huống | Kỳ vọng | Kết quả |
|---|---|---|---|
| 1 | SUPER_ADMIN mở `/modules/M29/registry` | Thấy cả hai form | **PASS** — `["+ Đăng ký nền tảng mới", "+ Đăng ký công cụ mới"]` |
| 2 | AI_ADMIN mở cùng trang | Chỉ form Công cụ, không có nút vòng đời nền tảng | **PASS** — `["+ Đăng ký công cụ mới"]`, không có "Gửi soát xét" |
| 3 | AI_VIEWER mở cùng trang | Không form, không nút thao tác | **PASS** — 0 form, 0 nút |
| 4 | Tạo nền tảng `TEST_TMP_PLATFORM` | Bản ghi mới hiện trong bảng ở trạng thái Nháp | **PASS** — "Đã đăng ký nền tảng … ở trạng thái Nháp"; hàng mới kèm nút *Gửi soát xét* |
| 5 | Trạng thái và ranh giới dữ liệu của bản ghi mới | `DRAFT` + `EXTERNAL_NO_COMMITMENT` | **PASS** — truy vấn DB: `DRAFT · EXTERNAL_NO_COMMITMENT · STAGING · PlaceholderPlatformAdapter` |
| 6 | Nhập mã trùng, khác kiểu chữ (`manlab`) | Báo lỗi tiếng Việt, không tạo bản ghi | **PASS** — «Mã "manlab" đã có trong danh mục…»; số nền tảng không đổi |
| 7 | Chọn công cụ mức Thực thi, chưa bật chốt nào | Nút gửi bị khóa + cảnh báo | **PASS** — `disabled = true`, hiện cảnh báo "bắt buộc có ít nhất một chốt người" |
| 8 | Bật "Bắt buộc người dùng xác nhận" khi đang ở mức Thực thi | Nút mở khóa lại | **PASS** |
| 9 | Tạo công cụ `TEST_TMP_Tool` (mức Đọc, nền tảng MANLAB) | Hàng mới trong bảng Tool | **PASS** — "Công cụ thử nghiệm … MANLAB · /api/kpi/summary · Đọc · Hoạt động" |
| 10 | Nhật ký kiểm toán | 2 bản ghi `create` kèm người và vai trò | **PASS** — `tools`/`platforms` · "Quản trị viên (demo)" · `SUPER_ADMIN` · `create` |

**Ghi chú đối chiếu:** verify của increment trước (`20260825-vong-doi-hieu-luc-nen-tang`) ghi "công cụ trình duyệt không kích hoạt được server action". Lần này kích hoạt được: lấy đúng `<form>` của chính trường cần điền (`el.closest('form')`) rồi `requestSubmit()`, giá trị đặt qua native setter của React. Không phải hạn chế của công cụ.

## Chưa kiểm

- Nhánh `adapterType` không có thật ở `createPlatform` (bổ sung mới): **NOT RUN** qua giao diện — select chỉ phát sinh giá trị hợp lệ nên không dựng được tình huống từ trình duyệt. Logic là một phép `ADAPTER_TYPES.includes()` trên hằng lấy từ chính bảng `ADAPTERS`.
- Trùng mã do hai người gửi cùng lúc (chặn client không bắt được): rơi về lỗi `@unique` của Prisma, thông báo tiếng Anh — **NOT RUN**, chấp nhận vì đây là đường hiếm và vẫn an toàn (không tạo bản ghi trùng).

## Dọn dẹp

Đã xóa khỏi DB dev: `AIPlatform TEST_TMP_PLATFORM`, `AITool TEST_TMP_Tool` và 2 dòng `AIAuditLog` tương ứng. Kiểm lại: danh mục còn đúng 5 nền tảng gốc (`ANTHROPIC_API`, `GEMINI_API`, `MANLAB`, `MANLAB_LOCAL_LLM`, `VICONNECT`).
