# 07 — DevOps

**Ý nghĩa:** Hạ tầng như mã (IaC)

**Lưu file gì ở đây:**
- Các file: hạ tầng như mã (iac)
- [`DEPLOYMENT.md`](DEPLOYMENT.md) — hướng dẫn triển khai **MANLAB-AIOS
  Platform** (app Next.js+Prisma+Postgres duy nhất tại
  `09_ENGINEERING/aios-platform/`, hợp nhất 38 module) lên VPS riêng,
  domain `aios.manlab.vn`.
- `deploy/` — cấu hình Nginx/systemd mẫu tham chiếu từ `DEPLOYMENT.md`
  (`manlab-aios-platform.service`, `nginx-aios-platform.conf`).

**KHÔNG lưu ở đây:**
- Secrets/khóa thật (dùng vault)
- Dữ liệu sản xuất thật

**Lưu ý:** Code thực tế nên ở repo riêng và liên kết; tầng này có thể chứa submodule hoặc đặc tả.
