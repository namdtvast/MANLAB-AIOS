# 06 — SHARED RESOURCES ⭐ (Tài nguyên dùng chung)

**Ý nghĩa:** Tầng này chứa **các tài nguyên dùng chung** cho mọi MP/M — "một nguồn sự thật" (One Source of Truth). Mỗi tài nguyên được lưu **một lần duy nhất** ở đây, các quy trình MP/M khác chỉ **link**, không copy. Sửa một chỗ → mọi nơi tự động cập nhật.

---

## Cấu Trúc & Vai Trò

| Thư mục con | Lưu gì | Vai Trò | Link từ |
|---|---|---|---|
| `01_Forms` | Biểu mẫu gốc (F-xxx), bản blank | **Single Source** cho forms | MP, M, 03 (danh mục) |
| `02_Templates` | Mẫu báo cáo, công văn, slide | Template cho output | MP, M |
| `03_Reference_Data` | Bảng tra, danh mục đại lượng, hằng số | Dữ liệu tham khảo | M, AI skill |
| `04_Master_Data` | Dữ liệu chủ: mã hóa, enumeration | Reference data chuẩn | Database schema, M |
| `05_Units` | Đơn vị SI và bảng quy đổi | Unit conversion | M (tính toán) |
| `06_Customers` | Danh mục khách hàng (master) | Reference, không giao dịch | M, CRM |
| `07_Equipment` | Danh mục thiết bị, chuẩn | Equipment master | M08, M10, MP05 |
| `08_Personnel` | Danh mục nhân sự & ma trận năng lực | HR reference | MP03, M03 |
| `09_Methods` | Danh mục phương pháp/quy trình kỹ thuật | Method library | MP08, M08 |
| `10_Standards` | Chỉ mục tiêu chuẩn/ĐLVN viện dẫn | Standard reference | MP, Tầng 08 |
| `11_OCR_Models` | Mô hình OCR, template nhận dạng | AI/ML models | M (document processing) |
| `12_Icons` | Bộ biểu tượng giao diện | UI components | 02_Frontend, M UI |
| `13_Branding` | Logo, màu, font, nhận diện | Design system | Tất cả UI/output |

---

## Nguyên Tắc "Single Source of Truth"

### 🟢 01_Forms — Biểu Mẫu Gốc

**Tầng 06 lưu:**
- ✅ Nội dung gốc của mỗi biểu mẫu (F14.01, F21.03, v.v.)
- ✅ Các trường bắt buộc, validation rules, hướng dẫn điền
- ✅ Version history, thay đổi ghi chép

**Liên kết:**
```
06_SHARED_RESOURCES/01_Forms/F14.01_YeuCauHieuChuan.md (gốc)
    ↑
    ├─ 03_MANAGEMENT_SYSTEM/04_F/ (danh mục + link)
    ├─ 04_PROCESS_LIBRARY/MP08_PhuongPhap/links.yaml (reference)
    ├─ 04_PROCESS_LIBRARY/MP09_LayMau/links.yaml (reference)
    └─ 05_MODULE_LIBRARY/M08_PhuongPhap/05_Report/ (link template)
    
    (Khi F14.01 được cập nhật ở 06 → mọi nơi link tới nó sẽ thấy phiên bản mới)
```

### 🔴 Tầng 03 — Danh Mục, Không Nội Dung

`03_MANAGEMENT_SYSTEM/04_F/` chỉ chứa:
- ✅ Danh sách tất cả F-xxx
- ✅ Link tới Tầng 06
- ❌ Không copy nội dung

### 🔵 Tầng 11 — Hồ Sơ Đã Điền

`11_COMPLIANCE/03_Evidence/` chứa:
- ✅ Hồ sơ **đã điền** (instance cụ thể)
- ✅ Từ quá trình thực thi MP (không phải template)
- ✅ Phân quyền: PII, dữ liệu nhạy cảm

---

## KHÔNG Lưu Ở Đây

| Tài liệu | Lưu Đúng Chỗ | Ghi chú |
|---|---|---|
| Hồ sơ đã điền/đã phát hành | → `11_COMPLIANCE/03_Evidence/` | Instance, không template |
| Dữ liệu giao dịch thật (KH, đơn hàng) | → CSDL/ManLab | Transactional data |
| PII (chi tiết khách hàng cụ thể) | → Encrypted storage, external system | Bảo vệ dữ liệu |
| Lịch sử thay đổi dữ liệu | → Database audit log | Không lưu repo |

---

## Quy Tắc "Một Nguồn Sự Thật"

### ✅ Đúng

```
Khi cập nhật F14.01 ở 06_SHARED_RESOURCES/01_Forms/
  ↓
Tất cả MP, M link tới đó → tự động thấy phiên bản mới
  ↓
Không cần update từng MP/M riêng
```

### ❌ Sai

```
Copy F14.01 vào 03_MANAGEMENT_SYSTEM/04_F/
  ↓
Lại copy vào 04_PROCESS_LIBRARY/MP08/
  ↓
Lại copy vào 05_MODULE_LIBRARY/M08/
  ↓
Khi cập nhật F14.01, có 4 nơi cần update → dễ miss
```

---

## Tần Suất Cập Nhật

| Tài Nguyên | Tần Suất | Cách Quản Lý |
|---|---|---|
| Biểu mẫu (01_Forms) | Khi thiết kế lại | Semantic versioning (v1.0 → v1.1 → v2.0) |
| Danh mục khách hàng (06_Customers) | Khi có KH mới | Add record, version control |
| Danh mục thiết bị (07_Equipment) | Khi thêm/sửa thiết bị | Version, ngày cập nhật |
| Ma trận năng lực (08_Personnel) | Hằng quý hoặc khi có thay đổi | Phê duyệt từ HR |
| Master data (04_Master_Data) | Khi có quy định mới | Version, changelog |
| Branding (13_Branding) | Hiếm (thiết kế mới) | Keep updated, all output reflect |

---

## Lưu gì — Tự hỏi

> **Tôi có thể lưu bản copy của F14.01 vào folder khác không?**
> - ❌ Không. Luôn link tới `06_SHARED_RESOURCES/01_Forms/F14.01_...`

> **Tôi có cần update 01_Forms khi Module sử dụng nó thay đổi không?**
> - ⚠️ Phụ thuộc. Nếu M thay đổi field → update F14.01. Nếu M chỉ thay cách dùng → không cần.

> **Tôi có thể sửa template của F14.01 ở trong code Module không?**
> - ❌ Không. Template phải ở `06/01_Forms/`, code M chỉ reference nó.

---

**Lưu ý:** Sửa một chỗ → mọi nơi cập nhật. Đây là lý do tránh nhân bản. Tầng 06 là "database" của các tài nguyên dùng chung.
