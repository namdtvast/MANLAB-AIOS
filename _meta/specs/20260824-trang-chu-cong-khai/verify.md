# VERIFY — Trang chủ công khai + yêu cầu cấp tài khoản

Work-id: `20260824-trang-chu-cong-khai` · verify ngày 24/08/2026, bổ sung R7 ngày 27/08/2026

Trạng thái dùng đúng 5 giá trị: PASS / FAIL / NOT RUN / NOT APPLICABLE / BLOCKED.

## 1. Kiểm tra tự động

| Hạng mục | Trạng thái | Bằng chứng |
|---|---|---|
| `npx tsc --noEmit` | PASS | không lỗi (bỏ qua artifact `.next/` cũ của route đã di chuyển) |
| `npx eslint src` | PASS | mã thoát 0 |
| `npm test` (vitest) | PASS | 6 file · 84 test, trong đó 11 test mới cho `lib/access-request/rules` |
| `npm run build` | PASS | mã thoát 0; `/` là route động (`ƒ`), cùng `/dang-ky`, `/dashboard`, `/admin/access-requests` |
| `python3 _meta/validate_links.py` | PASS | xem mục 4 |

## 2. Kiểm tra định tuyến — chưa đăng nhập (curl, không cookie)

| Tiêu chí | Đường dẫn | Kết quả | Trạng thái |
|---|---|---|---|
| AC1 | `/` | HTTP 200, không redirect | PASS |
| — | `/dang-ky` | HTTP 200, không redirect | PASS |
| AC2 | `/dashboard` | HTTP 307 → `/login?callbackUrl=%2Fdashboard` | PASS |
| Không hở route nghiệp vụ | `/modules/M25` | HTTP 307 → `/login?callbackUrl=%2Fmodules%2FM25` | PASS |
| Không hở route nghiệp vụ | `/modules/M10` | HTTP 307 → `/login?callbackUrl=%2Fmodules%2FM10` | PASS |
| Không hở trang quản trị | `/admin/access-requests` | HTTP 307 → `/login?...` | PASS |

Đây là phép thử quan trọng nhất của thay đổi này: `/` được mở công khai bằng **khớp đúng**
chứ không phải khớp tiền tố. Nếu lỡ đưa `/` vào nhóm tiền tố thì cả 6 dòng trên đều trả 200 —
toàn hệ thống mất chặn đăng nhập.

## 3. Kiểm tra qua trình duyệt

| Tình huống | Kết quả quan sát | Trạng thái |
|---|---|---|
| `/` khi **chưa** đăng nhập | Hiện trang giới thiệu; đầu trang có *Đăng nhập* + *Đăng ký*; khối mở đầu có 2 nút và dòng "Tài khoản do Quản trị hệ thống cấp…" | PASS |
| `/` khi **đã** đăng nhập | Hai nút thay bằng *Vào hệ thống* (đầu trang và khối mở đầu) | PASS |
| `/dashboard` | Chào đúng tên người dùng, 4 ô số liệu, bản đồ 7 nhóm; nút *Bảng điều khiển* ở thanh đầu trang và mục sidebar cùng sáng | PASS |
| `/admin/access-requests` với tài khoản MEMBER | Hiện "Không có quyền truy cập" (AC5) | PASS |
| Form `/dang-ky` — gửi rỗng | 4 lỗi có chữ; input mang `aria-invalid="true"`; `aria-describedby` nối đúng hint + lỗi | PASS |
| Form `/dang-ky` — gửi hợp lệ (AC3) | Hiện khối `role="status"` "Đã gửi yêu cầu"; DB có 1 bản ghi `PENDING` | PASS |
| Gửi lại cùng email khác hoa/thường (AC4) | Vẫn đúng 1 bản ghi trong DB; thông báo không đổi | PASS |
| Gửi bằng email đã có tài khoản (R3) | 0 bản ghi được tạo; thông báo **giống hệt** trường hợp thành công → không dò được email nào tồn tại | PASS |

Truy vấn kiểm chứng DB sau các lần gửi:

```
  fullName   |        email        | status
-------------+---------------------+---------
 Lê Văn Kiểm | levankiem@doitac.vn | PENDING
(1 row)

số bản ghi cho admin@manlab.vn: 0
```

## 3bis. AC6 — ADMIN duyệt/từ chối (bổ sung ngày 24/08/2026)

Phiên verify không nhập mật khẩu vào biểu mẫu đăng nhập, nên thay vì bấm qua giao diện với
tài khoản quản trị, AC6 được kiểm chứng bằng cách gọi **thẳng server action thật** với phiên
ADMIN giả lập (chỉ `@/lib/auth` bị mock; Prisma và Postgres là thật), và **render thật** trang
duyệt bằng `react-dom/server` với hai vai khác nhau. Hai file test này là tạm thời — cần
Postgres nên không commit vào bộ test của CI — đã xoá sau khi chạy.

| Kịch bản | Kết quả | Trạng thái |
|---|---|---|
| MEMBER gọi thẳng action (R6) | Bị từ chối; bản ghi giữ nguyên `PENDING` | PASS |
| Từ chối thiếu lý do (R5) | Bị chặn ở server, thông báo nhắc "lý do"; trạng thái không đổi | PASS |
| ADMIN đồng ý cấp | `status=APPROVED`, ghi đúng `reviewedById` và `reviewedAt` | PASS |
| ADMIN từ chối kèm lý do | `status=REJECTED`, lưu đúng `reviewNote` | PASS |
| Xử lý lại yêu cầu đã xử lý (R4) | Bị chặn; trạng thái giữ nguyên `APPROVED` | PASS |
| **R1 — duyệt không tạo tài khoản** | `User` count không đổi; không có `User` nào mang email của yêu cầu | PASS |
| Render trang với phiên MEMBER | Ra khối "Không có quyền truy cập"; **không lộ** họ tên và email người đề nghị trong HTML | PASS |
| Render trang với phiên ADMIN | Ra bảng hàng chờ đủ họ tên, email, đơn vị, trạng thái "Chờ xử lý", nút "Đồng ý cấp"/"Từ chối", kèm câu nói rõ tài khoản vẫn cấp theo quy trình hiện hành (R1) | PASS |

Kết quả chạy: 6/6 test action + 2/2 test render, đều PASS trên Postgres thật. Mọi bản ghi tạm
đã xoá; sau đó `npm test` (bộ chuẩn, 84 test) vẫn PASS và cây làm việc sạch.

Còn lại **chưa** kiểm chứng: thao tác bấm nút thật trên trình duyệt với phiên ADMIN. Rủi ro còn
lại hẹp — chỉ nằm ở tầng gắn sự kiện của `ReviewPanel`, vì cả hàm xử lý phía server lẫn HTML
sinh ra của trang đều đã kiểm chứng ở trên.

## 3ter. R7 — mật khẩu do người đề nghị tự đặt (bổ sung ngày 27/08/2026)

Chạy trên Postgres cục bộ (`aios_platform_dev`) sau khi áp `20260827090000_access_request_mat_khau`.

| Kịch bản | Kết quả quan sát | Trạng thái |
|---|---|---|
| Trang `/dang-ky` hiện khối mật khẩu | Có ô *Mật khẩu* (kèm nút hiện/ẩn) và *Nhập lại mật khẩu*, cùng câu "Bạn tự đặt và **phải tự nhớ**" | PASS |
| Mật khẩu quá ngắn (AC7) | Chặn, báo "Mật khẩu tối thiểu 12 ký tự."; họ tên/email/đơn vị/lý do giữ nguyên; **hai ô mật khẩu trống lại** | PASS |
| Nhập lại không khớp (AC7) | Chặn, lỗi nằm đúng ở ô *Nhập lại mật khẩu* ("Nhập lại mật khẩu chưa khớp.") | PASS |
| Gửi hợp lệ → lưu gì trong DB (AC8) | `passwordHash` là bcrypt (`$2b$10$…`, 60 ký tự), `bcrypt.compare` khớp mật khẩu đã gõ; quét toàn bộ cột của bản ghi: **không cột nào chứa bản rõ** | PASS |
| `scripts/cap-tai-khoan.ts` xem trước | In "mật khẩu — theo mật khẩu người đề nghị đã tự đặt trên form"; không ghi gì vào DB | PASS |
| Cấp tài khoản thật (AC8) | Tạo `User` dùng lại đúng hash; `AccessRequest.passwordHash` trở về `null` ngay sau đó | PASS |
| Đăng nhập bằng mật khẩu người dùng tự đặt (AC8) | `/login` → vào `/dashboard`, chào đúng tên tài khoản vừa cấp | PASS |
| Dọn dữ liệu kiểm thử | Đã xoá `User` và `AccessRequest` của email kiểm thử | PASS |

`npx vitest run` sau thay đổi: **22 file · 439 test PASS** (trong đó 8 test mới cho R7, gồm cả
ca 30 ký tự tiếng Việt có dấu = 90 byte — dưới trần 64 ký tự nhưng vượt giới hạn 72 byte của
bcrypt, phải bị chặn thay vì để bcrypt cắt âm thầm). `npx eslint src scripts` sạch;
`npx next build` mã thoát 0.

**Chưa kiểm chứng:** giao diện `/admin/access-requests` với phiên ADMIN thật (đoạn văn hướng dẫn
mới cho QTHT) — trang chỉ build-pass và render đúng ở các đợt verify trước; phiên này không có
mật khẩu tài khoản quản trị nên không đăng nhập vai đó.

## 4. Toàn vẹn repo

`python3 _meta/validate_links.py` → PASS (xem log ở PR). Thay đổi không đụng thư mục Hub
`MPxx`, module `Mxx` hay capability `CAP-xx`.

## 5. Chưa verify — nêu rõ, không quy tròn

| Hạng mục | Trạng thái | Lý do |
|---|---|---|
| Gửi email thông báo cho người đề nghị | NOT APPLICABLE | Ngoài phạm vi — hệ thống chưa có hạ tầng gửi thư (xem spec mục "Ngoài phạm vi"). |
| Chống lạm dụng form công khai (captcha, giới hạn tần suất) | NOT RUN | Ngoài phạm vi đợt này. Hiện chỉ có chống trùng theo email (R2) và giới hạn độ dài trường. |

## 6. Giới hạn còn lại của thiết kế

Duyệt **không** tạo tài khoản đăng nhập — chỉ ghi nhận "đồng ý cấp". Việc tạo `User` và gán vai
trò vẫn theo quy trình cấp phát hiện hành của Quản trị hệ thống. Tự động hóa bước đó là thay đổi
biên xác thực, cần quyết định riêng (ép đổi lần đầu, thu hồi).

Từ 27/08/2026 (R7), riêng **mật khẩu** không còn do QTHT đặt hộ: người đề nghị tự đặt trên form
và `scripts/cap-tai-khoan.ts` dùng lại hash đó, nên mật khẩu không phải đi qua email hay tin nhắn
để bàn giao. Hai điểm còn hở:

- **Quên mật khẩu trước khi được cấp** — chưa có luồng đặt lại tự phục vụ (cần hạ tầng gửi thư).
  Hiện phải cấp tài khoản rồi QTHT đổi bằng `scripts/doi-mat-khau-demo.ts`.
- **Đề nghị nằm chờ lâu** — hash tồn tại trong `AccessRequest` suốt thời gian chờ duyệt. Ngắn
  hay dài là do tốc độ xử lý hàng chờ, chưa có cơ chế tự hết hạn đề nghị quá cũ.
