# 11 — COMPLIANCE (Tuân thủ & Bằng chứ)

**Ý nghĩa:** Tầng này chứa **bằng chứ tuân thủ, ánh xạ ISO, hồ sơ kiểm định, CAPA, risk register, opportunity log, KPI report** để chứng minh rằng hệ thống ManLab-AIOS tuân thủ các tiêu chuẩn (ISO 9001, 17025, 27001, 42001), pháp luật và các yêu cầu quản lý.

**Trạng thái hiện tại:** Đang xây dựng. Cấu trúc sẽ được phát triển song song với việc triển khai Tầng 03–10.

---

## Cấu Trúc Dự Kiến (v4.1+)

| Thư mục | Mục đích | Ghi chú |
|---|---|---|
| `01_ISO_Mapping/` | Ánh xạ yêu cầu ISO tới quy trình/kiểm soát | Traceability matrix |
| `02_Legal_Mapping/` | Ánh xạ luật pháp tới chính sách/quy trình | Compliance framework |
| `03_Evidence/` | Hồ sơ, báo cáo, kết quả kiểm tra, test results | Proof of compliance |
| `04_Audit/` | Kế hoạch kiểm định, báo cáo kiểm định nội bộ, corrective action | Audit trail |
| `05_CAPA/` | Corrective/Preventive Actions: NC (không phù hợp), phân tích, kế hoạch | Issue tracking |
| `06_Risk/` | Risk register, risk assessment, risk mitigation plan | Risk management |
| `07_Opportunity/` | Opportunity log, improvement ideas, proposal | Opportunity management |
| `08_Management_Review/` | Kỷ yếu xem xét lãnh đạo, quyết định cải tiến | Strategy alignment |
| `09_KPI_Report/` | Báo cáo KPI hàng tháng/quý/năm | Performance tracking |

---

## Nguyên Tắc Tuân Thủ

### 1. Traceability — "Từ Yêu Cầu Tới Bằng Chứ"

Mỗi yêu cầu ISO/Luật phải **truy nguồn** tới:
- ✅ Policy/Procedure (Tầng 03) thực hiện nó
- ✅ Process (Tầng 04) định rõ cách làm
- ✅ Execution evidence (Tầng 11) chứng minh tuân thủ

```
ISO 17025 §8.5 (Risk Management)
  ↓
ETV.P03_RuiRo (Procedure)
  ↓
MP01_RuiRo (Process Hub)
  ↓
M01_RuiRo (Module, code)
  ↓
11_COMPLIANCE/03_Evidence/2026-Q1_RiskRegister.md
  ↓
Audit evidence: Risk assessment report, mitigation plan
```

### 2. "Làm → Kiểm → Ghi → Cải Tiến"

Vòng PDCA:
- **P**lan: Policy, Procedure (Tầng 03)
- **D**o: Process execution (Tầng 04–10)
- **C**heck: Audit, monitoring (Tầng 11)
- **A**ct: CAPA, improvement (Tầng 11, feedback tới Tầng 03–04)

### 3. Bằng Chứ Phải Có

Không có execution mà không có evidence:
- Mỗi quy trình chạy → log entry
- Mỗi kiểm định → báo cáo
- Mỗi lỗi → NC (không phù hợp) → root cause analysis → CAPA plan
- Mỗi CAPA close → evidence verification

### 4. Confidentiality & Access Control

- Hồ sơ khách hàng (PII) → mã hóa, access limited
- Evidence tuân thủ → phân quyền xem (kỹ thuật, quản lý, kiểm định viên)
- Thay đổi document → audit log bắt buộc

---

## Liên Kết Với Các Tầng Khác

### Tầng 03 (Management) → Tầng 11

Policy định yêu cầu → Tầng 11 ghi chứng minh tuân thủ:

```yaml
# 03_MANAGEMENT_SYSTEM/01_QM/ETV.QM_QL_Risico.md
requirement: "Tất cả rủi ro phải được đánh giá mỗi năm"
  ↓
# 11_COMPLIANCE/06_Risk/2026_RiskAssessment.md
evidence: "Risk assessment hoàn thành 2026-01-15"
```

### Tầng 04 (Process) → Tầng 11

Process execution → Evidence:

```
04_PROCESS_LIBRARY/MP01_RuiRo/
  ↓ (executed)
05_MODULE_LIBRARY/M01_RuiRo/ (data generated)
  ↓
11_COMPLIANCE/03_Evidence/M01_Risk_2026_Q1.md
```

### Tầng 08 (Knowledge) → Tầng 11

Tiêu chuẩn/Luật trích từ Tầng 08 được ánh xạ ở Tầng 11:

```
08_KNOWLEDGE_GRAPH/02_ISO/ISO-17025-8.5.md
  ↓ (requirement)
11_COMPLIANCE/01_ISO_Mapping/ISO-17025-Mapping.yaml
  → Maps to: MP01, MP04, MP08, MP10
  → Responsible: QA Officer
  → Evidence: Risk Register, Test Results
```

### Tầng 09-10 (Engineering & Deployment) → Tầng 11

Deployment logs, test results, security scan → Evidence:

```
09_ENGINEERING/06_Testing/test-results-2026-01-15.json
  ↓ (automated)
11_COMPLIANCE/03_Evidence/Engineering_Q1_TestCoverage.md
  → Coverage: 85%
  → Status: ✅ Pass (threshold: >80%)
```

---

## Quy Tắc Nhanh

> **Tôi có thể skip một quy trình để tiết kiệm thời gian không?**
> - ❌ Không. Mỗi quy trình là để tuân thủ ISO/Luật. Skip = vi phạm.

> **Tôi có cần ghi lại mọi lỗi không?**
> - ✅ Có. Mỗi lỗi là cơ hội học. Nếu không ghi → không có bằng chứ → kiểm định fail.

> **Tôi có thể xóa hồ sơ cũ không?**
> - ❌ Không (trong thời gian lưu giữ). ISO yêu cầu lưu giữ ít nhất 5 năm.

> **Tôi có cần approve mọi CAPA không?**
> - ✅ Có. CAPA phải được người có thẩm quyền phê duyệt trước khi implement.

---

## Không Lưu Ở Đây

| Tài liệu | Lưu Đúng Chỗ |
|---|---|
| Policy & Procedure | → `03_MANAGEMENT_SYSTEM/` |
| Tiêu chuẩn/Luật gốc | → `08_KNOWLEDGE_GRAPH/` |
| Runtime transaction data | → Database/Data warehouse |
| Khách hàng PII (chi tiết) | → Encrypted storage, external system |
| Employee performance data | → HR system, không lưu repo |

---

## Tần Suất Cập Nhật

| Hoạt động | Tần suất |
|---|---|
| Ghi evidence (process execution) | Liên tục (realtime hoặc batch) |
| Kiểm định nội bộ | Hàng tháng hoặc hằng quý |
| Xem xét lãnh đạo | Hằng quý hoặc hằng năm |
| Risk assessment | Hằng năm tối thiểu |
| CAPA close-out | Khi hoàn thành kế hoạch |
| Compliance report | Hằng quý (nội bộ), hằng năm (cơ quan) |

---

**Trạng thái:** 🟡 Đang đợi phát triển. Cấu trúc này sẽ được tạo ra khi các quy trình Tầng 03–10 bắt đầu hoạt động và tạo ra evidence.
