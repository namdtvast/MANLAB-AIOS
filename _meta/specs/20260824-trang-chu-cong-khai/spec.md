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
| `passwordHash` | String? | bcrypt hash của mật khẩu **người đề nghị tự đặt** (R7); xóa khi từ chối hoặc khi đã cấp tài khoản |
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
- **R7 — mật khẩu do chính người đề nghị đặt** *(bổ sung 27/08/2026)*: form công khai có hai ô
  mật khẩu (đặt + nhập lại), tối thiểu 12 ký tự — cùng ngưỡng `scripts/cap-tai-khoan.ts` đang áp,
  tối đa 64 ký tự và ≤ 72 **byte** (quá 72 byte bcrypt cắt âm thầm, tiếng Việt có dấu tốn 3
  byte/ký tự), phải có cả chữ và số, không trùng mật khẩu đã lộ trong mã nguồn, không chứa phần
  tên của chính email. Server chỉ lưu **bcrypt hash**; bản rõ không ghi DB, không log, không trả
  ngược về form khi có lỗi. Băm chạy **vô điều kiện** trước khi kiểm R2/R3 — băm chỉ ở nhánh có
  ghi bản ghi thì thời gian phản hồi tự tố cáo email nào đã tồn tại, phá chính điều R2+R3 đang giữ.

  R7 **không phá R1**: form vẫn không tạo `User`, không gán vai trò. Mật khẩu là bí mật do chính
  chủ đặt, giữ tạm cho tới khi QTHT cấp tài khoản; `scripts/cap-tai-khoan.ts` dùng lại đúng hash
  đó rồi **xóa khỏi bản ghi đề nghị**, và từ chối một đề nghị cũng xóa hash. Nhờ vậy mật khẩu
  không phải đi qua email/tin nhắn để bàn giao — đúng tinh thần ETV.P02 mục 6.8 (mật khẩu gửi
  qua kênh khác) khi kênh tốt nhất là *không gửi gì cả*.

  Ranh giới với **ETV.P33 mục 6.4.1** (*nghiêm cấm lưu mật khẩu... trong bản ghi tài khoản dưới
  bất kỳ dạng nào, kể cả đã mã hoá*): điều đó áp cho **danh mục tài khoản đang tồn tại trên hệ
  thống** (biểu mẫu F33.03) — nơi chỉ ghi *nơi lưu bí mật xác thực*, không ghi bí mật. `AccessRequest`
  không phải danh mục đó; nó là bước cấp phát, và hash ở đây có vòng đời ngắn, kết thúc ngay khi
  `User` được tạo.

### Chấp nhận (Acceptance)

- AC1 — chưa đăng nhập mở `/` → HTTP 200, không redirect về `/login`.
- AC2 — chưa đăng nhập mở `/dashboard` → chuyển về `/login?callbackUrl=/dashboard`.
- AC3 — gửi form hợp lệ → có bản ghi `PENDING`, giao diện báo đã tiếp nhận.
- AC4 — gửi lại cùng email → không sinh bản ghi thứ hai (R2), thông báo không đổi.
- AC5 — tài khoản không phải ADMIN mở `/admin/access-requests` → bị chặn.
- AC6 — ADMIN duyệt/từ chối → trạng thái đổi, ghi lại người xử lý và thời điểm; từ chối
  thiếu lý do bị chặn ở server.
- AC7 — gửi form với mật khẩu không đạt (ngắn, thiếu số, nhập lại không khớp) → bị chặn, báo
  đúng ô sai, các ô khác giữ nguyên nội dung đã gõ, **hai ô mật khẩu trống lại**.
- AC8 — đề nghị hợp lệ → cột `passwordHash` là bcrypt hash, không cột nào chứa bản rõ; sau khi
  `scripts/cap-tai-khoan.ts` cấp tài khoản thì `User.passwordHash` khớp mật khẩu người dùng đã gõ
  và `AccessRequest.passwordHash` trở về `null`; người dùng đăng nhập được ở `/login`.

### Ngoài phạm vi

- Duyệt **không** tự tạo tài khoản đăng nhập — đó là thay đổi biên xác thực, cần quyết định
  riêng (cấp mật khẩu tạm, ép đổi lần đầu, khoá phiên). Duyệt ở đây nghĩa là "đồng ý cấp",
  việc tạo `User` vẫn theo quy trình QTHT hiện hành. R7 không đổi điều này: người đề nghị đặt
  trước mật khẩu, nhưng tài khoản vẫn do QTHT tạo bằng `scripts/cap-tai-khoan.ts`.
- Chưa có luồng **quên mật khẩu / đặt lại mật khẩu** cho người dùng tự làm (cần hạ tầng gửi thư).
  Quên mật khẩu trước khi được cấp tài khoản thì phải nhờ QTHT xử lý bằng
  `scripts/doi-mat-khau-demo.ts` sau khi cấp.
- Không gửi email thông báo (hệ thống chưa có hạ tầng gửi thư).
- Không có captcha / giới hạn tần suất theo IP.
