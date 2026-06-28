# 10 — DEPLOYMENT (Triển khai & vận hành)

**Ý nghĩa:** Cấu hình đưa hệ thống lên môi trường thật và duy trì vận hành.

| Thư mục con | Lưu gì |
|---|---|
| `01_Docker` | Dockerfile, compose, image |
| `02_K8S` | Manifest Kubernetes, Helm |
| `03_Cloud` | Cấu hình hạ tầng đám mây |
| `04_Monitoring` | Giám sát, cảnh báo, log, metrics |
| `05_Backup` | Chính sách & script sao lưu |
| `06_Disaster_Recovery` | Kế hoạch khôi phục thảm họa |

**KHÔNG lưu trong tầng này:**
- Khóa/mật khẩu/chứng thư thật
- Dữ liệu nghiệp vụ

**Lưu ý:** Toàn bộ nên ở dạng cấu hình-như-mã (IaC), có kiểm soát phiên bản.
