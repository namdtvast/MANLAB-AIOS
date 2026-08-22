# Hướng dẫn triển khai MANLAB-AIOS lên VPS — aios.manlab.vn

Bộ tài liệu này dành cho coder/DevOps triển khai **MANLAB-AIOS Platform**
(`09_ENGINEERING/aios-platform`) lên VPS riêng, gắn với tên miền
**aios.manlab.vn**.

> Bản trước của file này mô tả kiến trúc nhiều subdomain (mỗi module một
> app/domain riêng). Sau khi thảo luận lại, kiến trúc đã đổi sang **một
> app Next.js + Prisma + PostgreSQL duy nhất**, gộp toàn bộ kiến trúc 12
> tầng vào một codebase/DB — xem RECON/OUTCOME đầy đủ tại
> [`_meta/specs/20260822-aios-platform-increment0/`](../../_meta/specs/20260822-aios-platform-increment0/).
> File này viết lại hoàn toàn cho kiến trúc mới, không phải bản vá.

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

**Trạng thái thật tại thời điểm viết (Increment 0 — xem
[`aios-platform/README.md`](../aios-platform/README.md) để cập nhật mới
nhất):**

- Chỉ có **khung**: auth thật + đăng ký 38 module + trang chi tiết tĩnh.
- **M10, M21, M29** — 3 module duy nhất đã có `08_Source` chạy thật —
  **chưa được di trú** vào app/DB này (đó là Increment 1). Trang chi tiết
  của 3 module này trong app mới chỉ hiển thị thông báo "đã có prototype
  riêng", **không** gọi API/hiển thị dữ liệu nghiệp vụ thật của chúng.
- Nếu bạn cần 3 module đó hoạt động đầy đủ ngay bây giờ, chúng vẫn chạy
  độc lập như trước (xem `.claude/launch.json` các mục `m10-api`,
  `m10-webapp`, `aios-api`) — **không nằm trong phạm vi tài liệu này**,
  vì mục tiêu của domain `aios.manlab.vn` là nền tảng hợp nhất, không
  phải lộ lại kiến trúc rời rạc cũ ra production.
- **Chưa gate quyền theo `User.role`** ở tầng UI/route — mọi tài khoản đã
  đăng nhập hiện thấy được toàn bộ. **Không đưa domain này ra công khai
  cho người dùng thật cho tới khi hoàn thiện RBAC** (xem mục "Ghi chú
  quan trọng" cuối file).

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
- [ ] Sau khi seed, **đổi ngay** mật khẩu tài khoản demo `admin@manlab.vn`
      (hoặc xoá, tạo tài khoản admin thật) — xem mục 7.

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

Lệnh này **cũng tạo tài khoản demo** `admin@manlab.vn` với mật khẩu cố
định trong `prisma/seed.ts` — **PHẢI đổi ngay** trên production:

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

- Truy cập `https://aios.manlab.vn` — phải thấy trang đăng nhập, đăng
  nhập được, thấy sidebar đủ 38 module.
- Truy cập `https://aios.manlab.vn/modules/M10` khi chưa đăng nhập →
  phải bị redirect về `/login` (kiểm tra `proxy.ts` hoạt động đúng, không
  lộ dữ liệu trước khi xác thực).
- Kiểm tra chứng chỉ SSL hợp lệ (khóa xanh trên trình duyệt).
- `sudo journalctl -u manlab-aios-platform -f` để xem log runtime khi cần
  debug.

## 11. Quy trình cập nhật sau này

```bash
cd /var/www/manlab-aios
git pull origin main

cd 09_ENGINEERING/aios-platform
npm ci
npx prisma generate
npx prisma migrate deploy
npx prisma db seed          # cập nhật lại danh sách module nếu có thay đổi
npm run build

sudo systemctl restart manlab-aios-platform
```

## Ghi chú quan trọng

- Đây là hạ tầng cho **Increment 0** (khung nền tảng) theo lộ trình đã
  thống nhất — xem trạng thái/giới hạn đầy đủ tại
  [`aios-platform/README.md`](../aios-platform/README.md) và
  [`_meta/specs/20260822-aios-platform-increment0/verify.md`](../../_meta/specs/20260822-aios-platform-increment0/verify.md)
  (kết quả verify: `PASS WITH WARNINGS`, không phải `PASS` thuần).
- **Chưa có RBAC ở tầng UI/route** (chỉ có cột `role` trong DB) và **chưa
  có test tự động** — hai điều này là điều kiện cần trước khi coi nền
  tảng "sẵn sàng production" cho người dùng thật ngoài đội triển khai.
- **M10/M29 chưa di trú** — dữ liệu nghiệp vụ thật của 2 module này vẫn
  nằm ở file JSON trong service riêng, chưa có trong Postgres của app
  này. Không quảng bá `aios.manlab.vn` là nơi thao tác nghiệp vụ M10/M29
  cho tới khi Increment 1 hoàn tất.
- Trước khi công bố `aios.manlab.vn` rộng rãi ra ngoài Viện, xác nhận lại
  với chủ repo về phạm vi công bố (nội bộ hay công khai) — cổng này phơi
  bày toàn bộ cấu trúc quản trị/kiến trúc 12 tầng của Viện.
