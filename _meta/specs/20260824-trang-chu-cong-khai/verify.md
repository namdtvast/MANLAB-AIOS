# VERIFY — Trang chủ công khai + yêu cầu cấp tài khoản

Work-id: `20260824-trang-chu-cong-khai` · verify ngày 24/08/2026

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

## 4. Toàn vẹn repo

`python3 _meta/validate_links.py` → PASS (xem log ở PR). Thay đổi không đụng thư mục Hub
`MPxx`, module `Mxx` hay capability `CAP-xx`.

## 5. Chưa verify — nêu rõ, không quy tròn

| Hạng mục | Trạng thái | Lý do |
|---|---|---|
| AC6 — ADMIN duyệt/từ chối trên giao diện thật | NOT RUN | Cần đăng nhập bằng tài khoản quản trị; phiên làm việc này không nhập mật khẩu vào biểu mẫu. Nhánh **từ chối** của cùng logic đã kiểm chứng: MEMBER bị chặn ở giao diện thật (mục 3), và toàn bộ gate R4/R5/R6 có 11 test đơn vị. |
| Gửi email thông báo cho người đề nghị | NOT APPLICABLE | Ngoài phạm vi — hệ thống chưa có hạ tầng gửi thư (xem spec mục "Ngoài phạm vi"). |
| Chống lạm dụng form công khai (captcha, giới hạn tần suất) | NOT RUN | Ngoài phạm vi đợt này. Hiện chỉ có chống trùng theo email (R2) và giới hạn độ dài trường. |

## 6. Giới hạn còn lại của thiết kế

Duyệt **không** tạo tài khoản đăng nhập — chỉ ghi nhận "đồng ý cấp". Việc tạo `User`, cấp mật
khẩu và gán vai trò vẫn theo quy trình cấp phát hiện hành của Quản trị hệ thống. Tự động hóa
bước đó là thay đổi biên xác thực, cần quyết định riêng (mật khẩu tạm, ép đổi lần đầu, thu hồi).
