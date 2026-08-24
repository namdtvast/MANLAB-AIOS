# Trang chủ công khai + luồng yêu cầu cấp tài khoản

Work-id: `20260824-trang-chu-cong-khai` · Tier M · nền tảng `09_ENGINEERING/aios-platform`

## OUTCOME

**WHO** — người chưa đăng nhập: nhân sự mới của Viện, khách hàng gửi mẫu, đoàn đánh giá /
tổ chức công nhận, đối tác đang tìm hiểu năng lực của ETV. Thứ hai là QTHT — người tiếp
nhận yêu cầu cấp tài khoản.

**WHAT** — `/` trở thành trang giới thiệu **công khai**, không đòi đăng nhập, có hai lối
vào rõ ràng: *Đăng nhập* và *Đăng ký* (gửi yêu cầu cấp tài khoản). Bảng điều khiển sau
đăng nhập chuyển sang `/dashboard`.

**WHY** — hiện `/` nằm sau chặn đăng nhập, nên người chưa có tài khoản chỉ thấy màn hình
đăng nhập trống, không biết đây là hệ thống gì, ai được dùng, xin tài khoản ở đâu. Nội
dung định vị đã có nhưng bị khoá sau cổng đăng nhập — sai đối tượng.

**SUCCESS CRITERIA**
1. Mở `/` khi chưa đăng nhập: thấy đủ nội dung giới thiệu, không bị chuyển hướng.
2. Có nút *Đăng nhập* và *Đăng ký* ở đầu trang và trong khối mở đầu.
3. Gửi được yêu cầu cấp tài khoản; yêu cầu vào hàng chờ, **không** tạo tài khoản đăng nhập.
4. QTHT xem và xử lý được hàng chờ; người không phải QTHT không mở được trang đó.
5. Đã đăng nhập vào `/dashboard` vẫn thấy đúng bảng điều khiển như trước.
6. Không route nghiệp vụ nào bị hở ra công khai ngoài `/`, `/login`, `/dang-ky`.

## SPEC

### Định tuyến

| Đường dẫn | Quyền | Nội dung |
|---|---|---|
| `/` | Công khai | Trang giới thiệu nền tảng |
| `/dang-ky` | Công khai | Form gửi yêu cầu cấp tài khoản |
| `/login` | Công khai | Đăng nhập (giữ nguyên) |
| `/dashboard` | Đã đăng nhập | Bảng điều khiển (nội dung `/` cũ) |
| `/admin/access-requests` | `PlatformRole.ADMIN` | Hàng chờ yêu cầu cấp tài khoản |

Middleware `src/proxy.ts` phân biệt **khớp đúng** (`/`) với **khớp tiền tố** (`/login`,
`/dang-ky`, `/api/auth`, `/api/m29/sweep`) — không được đưa `/` vào danh sách tiền tố vì
`"bất kỳ đường dẫn nào".startsWith("/")` luôn đúng, sẽ mở toang toàn hệ thống.

### Dữ liệu — `AccessRequest`

| Trường | Kiểu | Ghi chú |
|---|---|---|
| `fullName` | String | Họ tên người đề nghị |
| `email` | String | Email liên hệ, cũng là email tài khoản đề nghị |
| `organization` | String | Đơn vị / tổ chức |
| `phone` | String? | Điện thoại |
| `purpose` | String | Lý do cần truy cập, phần việc dự kiến |
| `status` | enum | `PENDING` → `APPROVED` \| `REJECTED` |
| `reviewNote` | String? | Ghi chú của QTHT, bắt buộc khi từ chối |
| `reviewedAt` / `reviewedById` | | Ai xử lý, lúc nào |

### Quy tắc nghiệp vụ

- **R1** — form công khai chỉ *ghi nhận đề nghị*. Không tạo `User`, không cấp mật khẩu,
  không gán vai trò. Tài khoản vẫn do QTHT cấp theo quy trình hiện hành.
- **R2** — một email chỉ có một yêu cầu `PENDING` tại một thời điểm; gửi trùng không tạo
  bản ghi thứ hai.
- **R3** — email đã có tài khoản thì không nhận yêu cầu.
- **R2+R3 — không lộ định danh** *(điều chỉnh khi BUILD so với bản đặc tả đầu)*: cả ba
  trường hợp (đã ghi nhận / đang có yêu cầu chờ / email đã có tài khoản) trả về **cùng một
  thông báo trung tính**. Bản đặc tả đầu định báo riêng "yêu cầu trước đang chờ xử lý", nhưng
  như vậy form công khai thành công cụ dò xem email nào tồn tại trong hệ thống — mâu thuẫn với
  chính yêu cầu không xác nhận sự tồn tại của R3.
- **R4** — chuyển trạng thái chỉ đi từ `PENDING`; đã xử lý rồi thì không đổi lại.
- **R5** — từ chối bắt buộc có lý do (`reviewNote`).
- **R6** — chỉ `PlatformRole.ADMIN` đọc và xử lý được hàng chờ; chặn ở server, không chỉ ẩn menu.

### Chấp nhận (Acceptance)

- AC1 — chưa đăng nhập mở `/` → HTTP 200, không redirect về `/login`.
- AC2 — chưa đăng nhập mở `/dashboard` → chuyển về `/login?callbackUrl=/dashboard`.
- AC3 — gửi form hợp lệ → có bản ghi `PENDING`, giao diện báo đã tiếp nhận.
- AC4 — gửi lại cùng email → không sinh bản ghi thứ hai (R2), thông báo không đổi.
- AC5 — tài khoản không phải ADMIN mở `/admin/access-requests` → bị chặn.
- AC6 — ADMIN duyệt/từ chối → trạng thái đổi, ghi lại người xử lý và thời điểm; từ chối
  thiếu lý do bị chặn ở server.

### Ngoài phạm vi

- Duyệt **không** tự tạo tài khoản đăng nhập — đó là thay đổi biên xác thực, cần quyết định
  riêng (cấp mật khẩu tạm, ép đổi lần đầu, khoá phiên). Duyệt ở đây nghĩa là "đồng ý cấp",
  việc tạo `User` vẫn theo quy trình QTHT hiện hành.
- Không gửi email thông báo (hệ thống chưa có hạ tầng gửi thư).
- Không có captcha / giới hạn tần suất theo IP.
