# 09 — ENGINEERING (Kỹ thuật/Code)

**Ý nghĩa:** Mã nguồn và cấu hình kỹ thuật của nền tảng ManLab.

| Thư mục con | Lưu gì |
|---|---|
| `01_Backend` | Mã nguồn máy chủ, dịch vụ nghiệp vụ |
| `02_Frontend` | Mã nguồn giao diện web |
| `03_Mobile` | Ứng dụng di động |
| `04_API` | Triển khai API, cổng tích hợp |
| `05_Database` | Script CSDL, migration, seed |
| `06_Testing` | Kiểm thử tự động |
| `07_DevOps` | Hạ tầng như mã (IaC) |
| `08_CI_CD` | Pipeline tích hợp/triển khai liên tục |

**KHÔNG lưu trong tầng này:**
- Secrets/khóa thật (dùng vault)
- Dữ liệu sản xuất thật

**Lưu ý:** Code thực tế nên ở repo riêng và liên kết; tầng này có thể chứa submodule hoặc đặc tả.

## `aios-platform/` — nền tảng hợp nhất 12 tầng

App Next.js + Prisma + PostgreSQL duy nhất, hợp nhất 38 module (M01–M38)
thành một nền tảng có DB thật/build step thật, thay cho các prototype rời
rạc trong `05_MODULE_LIBRARY/Mxx_Slug/08_Source/`. Không gắn số `Mxx` nào
(đây là lớp xuyên suốt, không số hóa một MPxx cụ thể) — xem
[aios-platform/README.md](aios-platform/README.md) để biết trạng thái
từng increment và cách chạy dev/build. Triển khai VPS: xem
[07_DevOps/DEPLOYMENT.md](07_DevOps/DEPLOYMENT.md).
