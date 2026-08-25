# Hướng dẫn triển khai MANLAB-AIOS lên VPS — aios.manlab.vn

Bộ tài liệu này dành cho coder/DevOps triển khai **MANLAB-AIOS Platform**
(`09_ENGINEERING/aios-platform`) lên VPS riêng, gắn với tên miền
**aios.manlab.vn**.

> Kiến trúc: **một app Next.js + Prisma + PostgreSQL duy nhất**, gộp toàn
> bộ kiến trúc 12 tầng vào một codebase/DB — không phải nhiều subdomain
> như bản đầu tiên của tài liệu này. RECON/OUTCOME đầy đủ tại
> [`_meta/specs/20260822-aios-platform-increment0/`](../../_meta/specs/20260822-aios-platform-increment0/).
>
> **Cập nhật 24/08/2026** — mục 0 (trạng thái), 0bis (ranh giới công
> khai/riêng tư), 7 (tài khoản demo), 10 (kiểm tra sau triển khai), 11
> (migrate) và Ghi chú quan trọng đã viết lại cho khớp hiện trạng. Bản
> trước còn ghi "chưa có RBAC, chưa có test, M10/M29 chưa di trú" và dặn
> kiểm tra `/` phải ra trang đăng nhập — cả bốn điều đó nay đều sai.

## 0. Kiến trúc triển khai — đọc trước khi làm

| | |
|---|---|
| Domain | `aios.manlab.vn` (1 domain duy nhất, không có subdomain phụ) |
| App | Next.js 16 (App Router), TypeScript, build step thật (`next build`) |
| DB | PostgreSQL, qua Prisma 7 (driver adapter `@prisma/adapter-pg`) |
| Auth | NextAuth v5 (Credentials + Prisma), session JWT — auth thật, không mô phỏng |
| Nguồn | `09_ENGINEERING/aios-platform/` trong repo (không tách repo riêng) |

App đóng vai trò **cổng duy nhất** cho toàn bộ 38 module (M01–M38): sidebar
liệt kê đủ 38 mục (dữ liệu quét từ `05_MODULE_LIBRARY/` lúc seed, không
hardcode), mỗi mục dẫn tới trang chi tiết module.

**Trạng thái thật — cập nhật 24/08/2026** (nguồn cập nhật nhất vẫn là
[`aios-platform/README.md`](../aios-platform/README.md)):

- **14/38 module đã vận hành thật** trên nền tảng hợp nhất (khai trong
  `ACTIVE_MODULE_CODES` của `prisma/seed.ts`): M01, M02, M03, M04, M10,
  M12, M13, M14, M16, M17, M21, M25, M26, M29. Các module còn lại mở trang
  giới thiệu và trỏ về đặc tả nghiệp vụ.
- **M10, M21, M29 đã di trú** vào app/DB này (Increment 1–3). Bản
  `08_Source` cũ của chúng vẫn còn trong repo và **chưa deprecate** —
  không triển khai các service rời đó ra production; domain
  `aios.manlab.vn` chỉ phục vụ nền tảng hợp nhất.
- **Đã có gate quyền theo vai trò**, chặn ở server chứ không chỉ ẩn nút:
  quyền nghiệp vụ gán theo **từng module** (`ModuleRoleAssignment`, mỗi
  module một bộ vốn từ vai trò riêng), quyền quản trị nền tảng theo
  `User.role` (`PlatformRole`). Chặn theo route nằm ở `src/proxy.ts`.
- **Đã có test tự động và build gác cổng ở CI**: workflow
  `.github/workflows/test-aios-platform.yml` chạy `npm test` (vitest) và
  `npm run build` cho mọi thay đổi chạm `09_ENGINEERING/aios-platform/**`.
- ⚠️ Nhiều module trong số 14 module trên **mới đạt phần lõi của đặc tả**,
  chưa đủ toàn bộ phạm vi `DacTa.md`. Không quảng bá là đã hoàn thiện —
  README của từng module và trang module trong app đều nói rõ phần nào
  còn thiếu.

## 0bis. Ranh giới công khai / riêng tư — xác nhận trước khi trỏ DNS

Từ 24/08/2026 nền tảng có **trang công khai không cần đăng nhập**. Đây là
quyết định về phạm vi công bố, không phải chi tiết kỹ thuật — xác nhận với
chủ repo trước khi mở domain ra internet.

| Đường dẫn | Ai xem được | Nội dung |
|---|---|---|
| `/` | **Bất kỳ ai** | Trang giới thiệu: mục đích nền tảng, 7 nhóm nghiệp vụ, tổng số module, số module đã vận hành, số thủ tục đã ban hành |
| `/dang-ky` | **Bất kỳ ai** | Form gửi yêu cầu cấp tài khoản (chỉ ghi nhận đề nghị, không tạo tài khoản) |
| `/login` | Bất kỳ ai | Đăng nhập |
| `/dashboard` | Đã đăng nhập | Bảng điều khiển |
| `/modules/**` | Đã đăng nhập + đúng vai trò module | Nghiệp vụ thật |
| `/admin/access-requests` | `PlatformRole.ADMIN` | Hàng chờ yêu cầu cấp tài khoản |

Hai điều cần cân nhắc trước khi công bố:

1. Trang `/` **để lộ có chủ đích** quy mô và cấu trúc nghiệp vụ của Viện
   (số module, số thủ tục đã ban hành, tên 7 nhóm nghiệp vụ). Đó là nội
   dung giới thiệu, không phải dữ liệu hồ sơ — nhưng vẫn là thông tin về
   tổ chức, cần chủ repo đồng ý mới đưa ra internet.
2. `/dang-ky` là **điểm nhận dữ liệu từ người lạ**. Hiện chỉ có chống
   trùng theo email và giới hạn độ dài trường, **chưa có captcha hay giới
   hạn tần suất theo IP** — nếu mở ra internet công cộng, cân nhắc đặt
   rate limit ở tầng Nginx (`limit_req`) cho riêng đường dẫn này.

## 1. Tóm tắt nhanh (checklist)

- [ ] VPS Ubuntu 22.04/24.04 (hoặc Debian 12), tối thiểu 1 vCPU / 2GB RAM.
- [ ] Node.js **≥ 20.9** (khuyến nghị 22 LTS).
- [ ] PostgreSQL 15+ (tự cài trên VPS hoặc dùng dịch vụ managed như Neon/Supabase).
- [ ] DNS: bản ghi `A` của `aios.manlab.vn` trỏ về IP VPS.
- [ ] Nginx làm reverse proxy + SSL qua Let's Encrypt (certbot).
- [ ] Chạy app bằng `systemd` (file mẫu ở `deploy/manlab-aios-platform.service`).
- [ ] Chỉ mở port `80`/`443` ra ngoài; port app (`3000`) và Postgres (`5432`)
      chỉ nghe trên `localhost`.
- [ ] Biến môi trường production tự tạo `.env` theo mục 5 — **không commit
      `.env` thật lên git** (đã gitignore sẵn trong `aios-platform/.gitignore`).
- [ ] Sau khi seed, **đổi hoặc xoá TOÀN BỘ tài khoản demo** — không chỉ
      `admin@manlab.vn`. Seed tạo khoảng 11 tài khoản dùng chung một mật khẩu;
      mật khẩu nay lấy từ `SEED_DEMO_PASSWORD` hoặc sinh ngẫu nhiên, nhưng
      11 tài khoản đó vẫn là 11 đường vào hệ thống — xem mục 7.

## 2. Chuẩn bị VPS

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git nginx postgresql postgresql-contrib ufw

# Node.js 22 LTS qua NodeSource
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node --version   # phải >= 20.9

# Firewall: chỉ mở SSH, HTTP, HTTPS
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## 3. Tạo database PostgreSQL (nếu tự host trên VPS)

```bash
sudo -u postgres psql <<'SQL'
CREATE USER aios_platform WITH PASSWORD 'THAY_BANG_MAT_KHAU_MANH';
CREATE DATABASE aios_platform_prod OWNER aios_platform;
SQL
```

Postgres mặc định chỉ nghe `localhost` — không cần mở port 5432 ra ngoài
(đã chặn ở bước firewall). Nếu dùng dịch vụ managed (Neon/Supabase/RDS...)
thì bỏ qua bước này và dùng connection string họ cấp.

## 4. Lấy mã nguồn

Toàn bộ nền tảng nằm trong repo MANLAB-AIOS — clone một lần, app nằm ở
`09_ENGINEERING/aios-platform/`:

```bash
sudo mkdir -p /var/www/manlab-aios
sudo chown $USER:$USER /var/www/manlab-aios
git clone https://github.com/namdtvast/MANLAB-AIOS.git /var/www/manlab-aios
cd /var/www/manlab-aios/09_ENGINEERING/aios-platform
npm ci
```

Nếu chỉ cần bản mới nhất, không cần lịch sử commit đầy đủ (repo có nhiều
tài liệu, dung lượng lớn):

```bash
git clone --depth 1 https://github.com/namdtvast/MANLAB-AIOS.git /var/www/manlab-aios
```

## 5. Cấu hình biến môi trường production

Tạo `.env` trong `09_ENGINEERING/aios-platform/` (không commit lên git):

```bash
cd /var/www/manlab-aios/09_ENGINEERING/aios-platform
cat > .env <<'EOF'
DATABASE_URL="postgresql://aios_platform:THAY_BANG_MAT_KHAU_MANH@localhost:5432/aios_platform_prod?schema=public"
AUTH_SECRET="THAY_BANG_GIA_TRI_NGAU_NHIEN"
AUTH_TRUST_HOST="true"
NEXTAUTH_URL="https://aios.manlab.vn"
EOF
```

Hai biến tùy chọn chỉ ảnh hưởng tới lệnh seed, không ảnh hưởng lúc chạy app:

| Biến | Tác dụng |
|---|---|
| `SEED_DEMO_PASSWORD` | Mật khẩu cho các tài khoản demo do seed tạo. **Không đặt** trên production — khi đó seed tự sinh mật khẩu ngẫu nhiên và in ra một lần, không ai đoán được. |
| `SEED_ADMIN_EMAIL` | Email tài khoản quản trị demo (mặc định `admin@manlab.vn`). |

Mật khẩu tài khoản demo **không còn nằm trong mã nguồn** — trước đây nó ghi thẳng trong
`prisma/seed.ts`, tức công khai trên GitHub.

Sinh `AUTH_SECRET` ngẫu nhiên đủ mạnh:

```bash
openssl rand -base64 32
```

## 6. Migrate database & build

```bash
cd /var/www/manlab-aios/09_ENGINEERING/aios-platform
npx prisma generate
npx prisma migrate deploy   # áp toàn bộ migration đã có, KHÔNG dùng `migrate dev` trên production
npm run build
```

## 7. Seed danh sách 38 module (bắt buộc — app cần bảng `PlatformModule` mới chạy được)

```bash
npx prisma db seed
```

Lệnh này quét trực tiếp `05_MODULE_LIBRARY/` + `04_PROCESS_LIBRARY/` của
chính checkout này để nạp 38 module — **luôn chạy lại sau mỗi lần `git
pull`** nếu danh sách/tên module có thay đổi (idempotent, dùng `upsert`,
an toàn khi chạy lại nhiều lần).

Lệnh này **cũng tạo khoảng 11 tài khoản demo** — `admin@manlab.vn`, `nth@`,
`ldp@`, `ldv@`, `qlcl@`, `qtht@` và 5 tài khoản vai trò AI — tất cả dùng
chung một mật khẩu. Mật khẩu đó **lấy từ biến `SEED_DEMO_PASSWORD`**, hoặc
**sinh ngẫu nhiên và in ra một lần** ở cuối lần chạy seed nếu biến không được
đặt. Trên production thì đừng đặt biến đó: để seed tự sinh.

Chạy lại seed **không** đổi mật khẩu của tài khoản đã tồn tại (mọi upsert tài
khoản dùng `update: {}`), nên seed lại sau mỗi lần `git pull` là an toàn.

> Dù mật khẩu không còn nằm trong mã nguồn, **mọi tài khoản demo vẫn là một
> đường vào hệ thống** (một môi trường seed đầy đủ có khoảng 18 tài khoản).
> Trước khi trỏ DNS: xoá hết tài khoản demo và tạo tài khoản thật, hoặc ít nhất
> đổi mật khẩu từng tài khoản. Kiểm tra lại bằng cách liệt kê `User` sau khi dọn
> — đừng tin là đã xong khi chưa nhìn danh sách.

**Môi trường đã seed trước ngày 25/08/2026** dùng mật khẩu từng ghi thẳng trong
`prisma/seed.ts`, tức đã công khai trên GitHub. Gỡ nó khỏi mã nguồn không đổi
được mật khẩu đã nằm trong database. Chạy script đổi hàng loạt:

```bash
# Xem trước sẽ đụng vào những tài khoản nào — không ghi gì:
npm run doi-mat-khau-demo

# Thực hiện thật (đặt qua biến môi trường để không lọt vào lịch sử shell):
NEW_DEMO_PASSWORD='...' npm run doi-mat-khau-demo -- --yes
```

Script chỉ đụng tài khoản có email thuộc miền `@manlab.vn`; nêu đích danh bằng
`--emails=a@…,b@…` nếu muốn giới hạn. Đổi mật khẩu **không** cắt phiên đang mở
vì session dùng JWT — muốn cắt ngay thì đổi `AUTH_SECRET` rồi khởi động lại app.

```bash
# Cách nhanh nhất: xoá tài khoản demo, tạo tài khoản admin thật qua Prisma Studio
# (chỉ mở tạm thời, KHÔNG để Studio mở public — chạy trên VPS rồi SSH tunnel về máy):
npx prisma studio
```

Hoặc đổi `passwordHash` trực tiếp bằng script Node ngắn dùng `bcryptjs`
(xem cách seed đã làm trong `prisma/seed.ts` để tham khảo cú pháp
`bcrypt.hash`).

## 8. Chạy app bằng systemd

```bash
sudo cp "09_ENGINEERING/07_DevOps/deploy/manlab-aios-platform.service" /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now manlab-aios-platform
sudo systemctl status manlab-aios-platform
```

Sửa `User=`/`WorkingDirectory=` trong file mẫu nếu VPS clone repo vào vị
trí khác `/var/www/manlab-aios`. App chạy nội bộ ở `http://127.0.0.1:3000`,
systemd tự khởi động lại nếu crash hoặc khi VPS reboot.

## 9. Cấu hình Nginx + domain + SSL

```bash
sudo cp "09_ENGINEERING/07_DevOps/deploy/nginx-aios-platform.conf" /etc/nginx/sites-available/aios.manlab.vn
sudo ln -s /etc/nginx/sites-available/aios.manlab.vn /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Lấy chứng chỉ SSL Let's Encrypt (yêu cầu DNS đã trỏ đúng về VPS trước khi chạy)
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d aios.manlab.vn
```

Certbot sẽ tự sửa file Nginx để bật HTTPS và cấu hình gia hạn chứng chỉ tự
động (`certbot renew` chạy qua systemd timer có sẵn).

## 10. Kiểm tra sau triển khai

**Bước quan trọng nhất — kiểm tra ranh giới công khai/riêng tư.** Chạy khi
CHƯA đăng nhập, kết quả phải đúng từng dòng:

```bash
for p in / /dang-ky /login /dashboard /modules/M10 /admin/access-requests; do
  curl -s -o /dev/null -w "$p -> %{http_code} %{redirect_url}\n" "https://aios.manlab.vn$p"
done
```

| Đường dẫn | Kết quả đúng |
|---|---|
| `/` | `200` — trang giới thiệu công khai |
| `/dang-ky` | `200` — form yêu cầu cấp tài khoản |
| `/login` | `200` |
| `/dashboard` | `307` → `/login?callbackUrl=%2Fdashboard` |
| `/modules/M10` | `307` → `/login?callbackUrl=%2Fmodules%2FM10` |
| `/admin/access-requests` | `307` → `/login?...` |

Bất kỳ đường dẫn `/modules/**` nào trả `200` khi chưa đăng nhập là **sự cố
lộ dữ liệu**, dừng triển khai và kiểm tra `src/proxy.ts` ngay. Nguyên nhân
hay gặp nhất: đưa `"/"` vào danh sách khớp **tiền tố** thay vì khớp
**đúng** — vì mọi đường dẫn đều bắt đầu bằng `/`, làm vậy sẽ mở toang toàn
hệ thống.

Kiểm tra tiếp sau khi đăng nhập:

- Đăng nhập được bằng tài khoản thật đã tạo ở mục 7; vào thẳng
  `/dashboard`, sidebar đủ 38 module.
- Mở một module **không** được gán vai trò → bị chặn ở server (không phải
  chỉ ẩn nút).
- Tài khoản không phải `ADMIN` mở `/admin/access-requests` → hiện "Không
  có quyền truy cập".
- Gửi thử form `/dang-ky`, rồi đăng nhập bằng tài khoản `ADMIN` xem yêu
  cầu có vào hàng chờ không. Lưu ý: **duyệt không tạo tài khoản**, chỉ ghi
  nhận "đồng ý cấp".
- Chứng chỉ SSL hợp lệ (khóa xanh trên trình duyệt).
- `sudo journalctl -u manlab-aios-platform -f` để xem log runtime khi cần
  debug.

## 11. Quy trình cập nhật sau này

```bash
cd /var/www/manlab-aios
git pull origin main

cd 09_ENGINEERING/aios-platform
npm ci
npx prisma generate
npx prisma migrate deploy   # BẮT BUỘC — bỏ qua là app đổ khi chạm bảng mới
npx prisma db seed          # cập nhật lại danh sách module nếu có thay đổi
npm run build

sudo systemctl restart manlab-aios-platform
```

`migrate deploy` không phải bước tùy chọn: schema vẫn đang thay đổi theo
từng đợt (tính tới 24/08/2026 đã có 24 migration, mới nhất là
`20260824141847_yeu_cau_cap_tai_khoan` thêm bảng `AccessRequest` cho form
`/dang-ky`). Kéo mã mới mà quên migrate thì app build xong vẫn chạy, nhưng
đổ ngay khi người dùng chạm vào tính năng mới.

## Ghi chú quan trọng

Ba điều kiện dưới đây đã đạt so với bản trước của tài liệu này, ghi lại để
người triển khai không dựa vào thông tin cũ:

- ✅ **Đã có gate quyền** ở tầng route và server action — không còn tình
  trạng "mọi tài khoản đăng nhập là thấy hết".
- ✅ **Đã có test tự động** (vitest) và **build gác cổng ở CI**.
- ✅ **M10/M21/M29 đã di trú** vào Postgres của app này.

Còn lại những điều **chưa** đạt — cân nhắc trước khi coi là sẵn sàng cho
người dùng thật:

- **Phạm vi đặc tả chưa đủ**: nhiều module trong 14 module đang vận hành
  mới đạt phần lõi `DacTa.md`. Xem README của từng module.
- **Chưa dọn bản `08_Source` cũ**: M10/M21/M29 vẫn còn prototype rời trong
  repo, chưa deprecate. Không triển khai chúng ra production.
- **Trang công khai chưa có chống lạm dụng**: `/dang-ky` chưa có captcha
  hay rate limit — xem mục 0bis.
- **Chưa có sao lưu định kỳ Postgres** trong tài liệu này. Nền tảng đã giữ
  hồ sơ nghiệp vụ thật, nên đặt lịch `pg_dump` và kiểm tra khôi phục được
  trước khi đưa vào dùng chính thức.
- **Phạm vi công bố phải do chủ repo quyết**: từ 24/08/2026 `/` là trang
  công khai, ai vào domain cũng đọc được phần giới thiệu và các con số
  tổng hợp về Viện. Xác nhận lại trước khi trỏ DNS ra internet — xem mục
  0bis.
