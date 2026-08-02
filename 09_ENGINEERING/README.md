# 09 — ENGINEERING (Phát triển sản phẩm)

**Ý nghĩa:** Tầng này chứa **mã nguồn, kiến trúc kỹ thuật, testing và DevOps** để phát triển hệ thống ManLab-AIOS. Các module M01–M38 (Tầng 05) được hiện thực hóa thành backend, frontend, mobile, API, database, testing framework tại tầng này.

**Trạng thái hiện tại:** Đang xây dựng. Cấu trúc sẽ được phát triển song song với các module M01–M38 ở Tầng 05.

---

## Cấu Trúc Dự Kiến (v4.1+)

| Thư mục | Mục đích | Ghi chú |
|---|---|---|
| `01_Backend/` | Backend services, API server (Node.js, Python, Java, v.v.) | Repository riêng hoặc monorepo |
| `02_Frontend/` | Web UI, dashboard, admin panel (React, Vue, Angular, v.v.) | Component library, state management |
| `03_Mobile/` | Mobile app (iOS, Android, React Native, Flutter) | Cross-platform hoặc native |
| `04_API/` | OpenAPI/Swagger specs, API contracts | Single source of truth cho API |
| `05_Database/` | Schema, migrations, seeding, backup scripts | SQL/NoSQL, version control |
| `06_Testing/` | Unit tests, integration tests, e2e tests, performance | Test frameworks, CI/CD pipelines |
| `07_DevOps/` | Docker, Kubernetes, Terraform, configuration | Infrastructure as Code |
| `08_CI_CD/` | GitHub Actions, GitLab CI, Jenkins config | Automated build, test, deploy |
| `09_Documentation/` | Technical docs, API docs, deployment guide | Readthedocs hoặc similar |

---

## Nguyên Tắc Phát Triển

### 1. Ánh Xạ 1:1 Module → Engineering

Mỗi Module Mxx (Tầng 05) tương ứng với **một hay nhiều thành phần kỹ thuật** ở Tầng 09:

```
M01_RuiRo (Tầng 05)
  ↓
01_Backend/risk-service/
02_Frontend/risk-dashboard/
06_Testing/risk-tests/
08_CI_CD/risk-pipeline.yaml
```

### 2. "Mã Là Tài Liệu"

- Mã nguồn phải có **comment rõ ràng**, **type hints**, **docstring** tuân theo chuẩn
- README ở mỗi thư mục con phải giải thích cách build, test, deploy
- Không có "magic" — logic phức tạp phải được ghi chú lý do

### 3. Testing Bắt Buộc

- Mỗi feature phải có **unit test** (>80% coverage)
- Critical path phải có **integration test**
- Mỗi release phải qua **e2e test** ít nhất 1 lần

### 4. DevOps Từ Đầu

- Không triển khai code mà không có **Docker**, **Kubernetes config**, **monitoring**
- CI/CD phải **tự động** từ commit đến deployment
- Mỗi module phải có **health check**, **logging**, **alerting**

---

## Liên Kết Với Các Tầng Khác

### Tầng 05 (Module Library) → Tầng 09 (Engineering)

Mỗi `05_MODULE_LIBRARY/Mxx/08_Source/` trỏ tới code ở Tầng 09:

```yaml
# 05_MODULE_LIBRARY/M01_RuiRo/manifest.yaml
source_repo: "github.com/namdtvast/manlab-backend/risk-service"
source_path: "09_ENGINEERING/01_Backend/risk-service"
```

### Tầng 04 (Process) ← Tầng 09

Process MP01 sử dụng Module M01 → M01 được triển khai ở Tầng 09.

### Tầng 03 (Management) ← Tầng 09

- Policy & Procedure (Tầng 03) định rõ yêu cầu
- Code review, testing, deployment (Tầng 09) chứng minh tuân thủ
- Bằng chứ (Tầng 11) ghi lại test results, deployment logs

---

## Quy Tắc Nhanh

> **Tôi có đặt file code ở Tầng 04 hoặc Tầng 05 không?**
> - ❌ Không. Code luôn ở Tầng 09, module Tầng 05 chỉ link/reference

> **Tôi có thể deploy trực tiếp từ Tầng 05 không?**
> - ❌ Không. Phải qua Tầng 09 CI/CD pipeline, testing, approval

> **Tôi có thể push code mà không có test không?**
> - ❌ Không. CI/CD sẽ block nếu coverage <80% hoặc test fail

---

## Không Lưu Ở Đây

| Tài liệu | Lưu Đúng Chỗ |
|---|---|
| Spec, requirement, yêu cầu chức năng | → `05_MODULE_LIBRARY/Mxx/01_Requirement/` |
| Mô hình database, ER diagram | → `05_MODULE_LIBRARY/Mxx/03_Database/` |
| Wireframe, UI mockup | → `05_MODULE_LIBRARY/Mxx/04_UI/` |
| Test case design | → `05_MODULE_LIBRARY/Mxx/08_Source/` hoặc `06_Testing/` |
| Deploy logs, runtime data | → Monitoring/Logging system, không lưu repo |

---

## Tần Suất Cập Nhật

| Hoạt động | Tần suất |
|---|---|
| Push code | Hàng ngày (mỗi feature/bugfix) |
| Release version | Hằng tuần hoặc hàng tháng (release cycle) |
| Update README | Cùng lúc cập nhật cấu trúc project |
| Cập nhật DevOps config | Khi thay đổi infrastructure |

---

**Trạng thái:** 🟡 Đang đợi phát triển. Cấu trúc này sẽ được tạo ra khi các module M01–M38 bắt đầu triển khai code thực tế.
