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
