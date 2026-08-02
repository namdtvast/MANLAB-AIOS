# 03 — MANAGEMENT SYSTEM (Hệ thống quản lý)

**Ý nghĩa:** Chuẩn mực kiểm soát nội bộ ETV — luật chơi mà tất cả MP, M phải tuân theo.

---

## **Cấu trúc thư mục**

| Thư mục | Tên đầy đủ | Lưu gì | Ghi chú |
|---|---|---|---|
| `01_QM` | Quality Manual | Sổ tay chất lượng, chính sách, mục tiêu, phạm vi, sơ đồ hệ thống QMS | Chính sách cấp Viện |
| `02_P` | Procedure | Thủ tục quản lý, thủ tục hệ thống (ETV.P14, ETV.P21, v.v.) | Quy trình cấp Viện |
| `03_M` | Method / Process / Work Instruction | Quy trình kỹ thuật, phương pháp, hướng dẫn công việc, SOP, quy trình hiệu chuẩn/kiểm định | Chi tiết kỹ thuật |
| `04_F` | Form / Template **List** | **Danh mục & link** tới biểu mẫu (F-xxx) | Tham chiếu; nội dung ở Tầng 06 |
| `05_R` | Record | Hồ sơ, minh chứng, dữ liệu phát sinh sau khi thực hiện | Bằng chứ thực thi |

---

## **Phân loại nhanh**

| Tài liệu | Thư mục | Ghi chú |
|---|---|---|
| Sổ tay chất lượng, chính sách QMS, mục tiêu | → `01_QM/` | Chính sách |
| Thủ tục P14, P21, P03 | → `02_P/` | Quy trình cấp Viện |
| Quy trình kỹ thuật, SOP hiệu chuẩn, hướng dẫn | → `03_M/` | Chi tiết kỹ thuật |
| **Danh mục & link** biểu mẫu F14.01, F21.03 | → `04_F/` | Chỉ list; nội dung ở `06/01_Forms/` |
| Hồ sơ hoàn thành, minh chứng, kết quả đánh giá | → `05_R/` | Bằng chứ |

---

## **Phân Chia Biểu Mẫu: Tầng 03 vs Tầng 06**

### 🔴 Tầng 03 (Quản lý) — Chỉ Danh Mục & Tham Chiếu

`03_MANAGEMENT_SYSTEM/04_F/` chứa:
- ✅ Danh sách tất cả biểu mẫu (F14.01, F21.03, F-xxx)
- ✅ Link tới biểu mẫu thực tế ở Tầng 06
- ✅ Metadata: mục đích, quy trình áp dụng, phiên bản, ngày cập nhật

**Ví dụ:**
```markdown
# 04_F — Danh Mục Biểu Mẫu

| Mã | Tên | Quy Trình | Nơi Lưu | Phiên Bản |
|---|---|---|---|---|
| F14.01 | Yêu Cầu Hiệu Chuẩn | MP08, MP09 | [06/01_Forms/F14.01_YeuCauHieuChuan.md](../../06_SHARED_RESOURCES/01_Forms/F14.01_YeuCauHieuChuan.md) | v2.1 |
| F21.03 | Báo Cáo Hiệu Chuẩn | MP11 | [06/01_Forms/F21.03_BaoCaoHieuChuan.md](../../06_SHARED_RESOURCES/01_Forms/F21.03_BaoCaoHieuChuan.md) | v3.0 |
```

### 🟢 Tầng 06 (Tài Nguyên Chung) — Biểu Mẫu Gốc (One Source of Truth)

`06_SHARED_RESOURCES/01_Forms/` chứa:
- ✅ **Nội dung gốc** của mỗi biểu mẫu (blank template)
- ✅ Các trường bắt buộc, validation rules, hướng dẫn điền
- ✅ Version control, history thay đổi
- ✅ Có thể là Markdown, PDF, hoặc Excel template

**Ví dụ:**
```
06_SHARED_RESOURCES/01_Forms/
├── F14.01_YeuCauHieuChuan.md
│   ├── Description: "Biểu mẫu yêu cầu hiệu chuẩn từ khách hàng"
│   ├── Fields: [Mã KH, Thiết bị, Loại hiệu chuẩn, ...]
│   ├── Version: 2.1
│   └── Last Updated: 2025-12-20
├── F21.03_BaoCaoHieuChuan.md
│   ├── Description: "Báo cáo kết quả hiệu chuẩn"
│   ├── Fields: [Mã lô, Kết quả, Phê duyệt, ...]
│   └── Version: 3.0
└── ...
```

### 📍 Tầng 11 (Tuân Thủ) — Bằng Chứ Đã Điền

`11_COMPLIANCE/03_Evidence/` chứa:
- ✅ Hồ sơ **đã điền** (instance, filled form)
- ✅ Dữ liệu thực tế từ quy trình thực thi
- ✅ Phân quyền: khách hàng PII, dữ liệu nhạy cảm

**Ví dụ:**
```
11_COMPLIANCE/03_Evidence/
├── 2026-Q1_HieuChuan/
│   ├── F14.01_YeuCau_KH001_2026-01-15.md (yêu cầu từ KH001)
│   ├── F21.03_BaoCao_KH001_2026-02-15.md (báo cáo kết quả)
│   └── ...
└── ...
```

### 📊 Tóm Tắt

| Tầng | Chứa Gì | Vai Trò | Số Lần Cập Nhật |
|---|---|---|---|
| **03_MANAGEMENT_SYSTEM/04_F/** | Danh mục + Link | Điều phối | Khi có biểu mẫu mới hoặc cập nhật |
| **06_SHARED_RESOURCES/01_Forms/** | Biểu mẫu gốc (blank) | Single Source of Truth | Khi thiết kế lại biểu mẫu |
| **11_COMPLIANCE/03_Evidence/** | Hồ sơ đã điền | Bằng chứ tuân thủ | Mỗi khi thực thi quy trình |

---

## **KHÔNG lưu ở đây**

- Tiêu chuẩn ISO → `08_KNOWLEDGE_GRAPH/02_ISO/`
- Pháp lý, quy định → `08_KNOWLEDGE_GRAPH/01_Regulations/`
- Tài liệu chứng thực chung → `06_SHARED_RESOURCES/`
- Dữ liệu giao dịch → CSDL/ManLab

**Lưu ý:** `03_MANAGEMENT_SYSTEM` = luật chơi ETV; `08_KNOWLEDGE_GRAPH` = kho tra cứu.
