# 10 — DEPLOYMENT (Triển khai & Vận hành)

**Ý nghĩa:** Tầng này chứa **cấu hình production, orchestration, monitoring, logging, backup, disaster recovery** để triển khai và vận hành hệ thống ManLab-AIOS trên cloud/on-premise. Tầng 09 tạo ra artifacts (Docker image, compiled code); Tầng 10 orchestrate chúng thành môi trường chạy được.

**Trạng thái hiện tại:** Đang xây dựng. Cấu trúc sẽ được phát triển khi Tầng 09 tạo ra sản phẩm đầu tiên.

---

## Cấu Trúc Dự Kiến (v4.1+)

| Thư mục | Mục đích | Ghi chú |
|---|---|---|
| `01_Docker/` | Dockerfile, docker-compose, image registry config | Container management |
| `02_Kubernetes/` | K8s manifests (deployment, service, ingress, statefulset) | Orchestration, scaling |
| `03_Cloud/` | Terraform/CloudFormation, VPC, storage, networking | Infrastructure as Code |
| `04_Monitoring/` | Prometheus, Grafana, ELK stack config | Observability |
| `05_Logging/` | Centralized logging (ELK, Datadog, CloudWatch) | Log aggregation |
| `06_Backup/` | Backup scripts, disaster recovery plan, RTO/RPO | Data protection |
| `07_Configuration/` | Environment variables, secrets management, config maps | Env-specific config |
| `08_Database/` | Production database migration, replication setup | Data persistence |
| `09_Security/` | SSL/TLS, firewall rules, WAF, security scanning | Security hardening |

---

## Nguyên Tắc Triển Khai

### 1. Infrastructure as Code (IaC)

- Mọi cấu hình production phải dưới **version control** (không manual setup)
- Terraform/CloudFormation tạo infrastructure lần đầu
- Mỗi thay đổi phải qua **code review** trước khi apply

### 2. Blue-Green Deployment

- Chạy 2 bản production cùng lúc: Blue (hiện tại) + Green (mới)
- Switch traffic từ Blue → Green khi Green stable
- Rollback nhanh nếu Green lỗi

### 3. Monitoring & Alerting

- **Health check** mỗi 30s: CPU, memory, disk, network, response time
- **Alert** gửi tới Slack/Email khi threshold vượt
- **Dashboard** hiển thị KPI realtime

### 4. Disaster Recovery

- Backup tự động mỗi 6 giờ
- Test restore ít nhất hàng tháng
- RTO (Recovery Time Objective) < 1 giờ
- RPO (Recovery Point Objective) < 30 phút

---

## Liên Kết Với Các Tầng Khác

### Tầng 09 (Engineering) → Tầng 10

Tầng 09 tạo Docker image/artifact → Tầng 10 deploy nó:

```
09_ENGINEERING/01_Backend/risk-service/Dockerfile
  ↓ (build image)
10_DEPLOYMENT/01_Docker/risk-service-deployment.yaml
  ↓ (push to registry)
10_DEPLOYMENT/02_Kubernetes/risk-service.yaml
  ↓ (deploy to cluster)
Production Environment
```

### Tầng 11 (Compliance) ← Tầng 10

- Deployment logs (Tầng 10) → Bằng chứ (Tầng 11)
- Security scanning results → Evidence trên Tầng 11
- Change log → Audit trail ở Tầng 11

---

## Quy Tắc Nhanh

> **Tôi có thể SSH vào production để fix bug không?**
> - ❌ Không. Mọi thay đổi phải qua code → CI/CD → deployment automation

> **Tôi có deploy code không thông qua CI/CD không?**
> - ❌ Không. CI/CD phải pass trước: test, security scan, approval

> **Tôi có xóa production data để test không?**
> - ❌ Không. Test phải ở staging environment, backup trước mỗi lần

> **Tôi có cần backup nếu có cloud replication không?**
> - ⚠️ Vẫn cần. Replication chỉ bảo vệ lỗi hardware, không bảo vệ data deletion hoặc corruption

---

## Không Lưu Ở Đây

| Tài liệu | Lưu Đúng Chỗ |
|---|---|
| Secret, API key, password | → Secret manager (HashiCorp Vault, AWS Secrets Manager) |
| Runtime data, transaction logs | → Database/Data warehouse |
| Old backups (>1 năm) | → Archive storage (AWS Glacier, cold storage) |
| Deployment documentation | → `09_ENGINEERING/09_Documentation/` hoặc wiki |

---

## Tần Suất Cập Nhật

| Hoạt động | Tần suất |
|---|---|
| Deploy thay đổi code | Hàng ngày (sau CI/CD pass) |
| Update Kubernetes manifest | Khi thay đổi scaling/resource |
| Patch security | Ngay khi có CVE |
| Disaster recovery drill | Hàng tháng |
| Review monitoring threshold | Hằng quý |

---

**Trạng thái:** 🟡 Đang đợi phát triển. Cấu trúc này sẽ được tạo ra khi Tầng 09 sản xuất các artifacts sẵn sàng triển khai.
