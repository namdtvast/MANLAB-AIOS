# 03 — MANAGEMENT SYSTEM (Hệ thống quản lý)

**Ý nghĩa:** Nơi đặt 'luật chơi' — chuẩn mực ISO và tài liệu hệ thống chất lượng ETV. Mô tả **phải tuân thủ gì**, KHÔNG mô tả làm thế nào.

---

## Cấu trúc thư mục

| Thư mục | Lưu gì | Nguồn Dropbox cũ |
|---------|--------|------------------|
| `01_ETV.QM/` | Sổ tay chất lượng (QM), chính sách chất lượng, tuyên bố phạm vi | `1.E_ISO17025/1.ETV.QM_STCL/` |
| `02_ISO9001/` | Bản đối chiếu điều khoản ISO 9001 ↔ ETV, ghi chú áp dụng | — |
| `03_ISO17025/` | Sổ tay, thủ tục (P), quy trình (QT) theo ISO 17025 | `1.E_ISO17025/2.ETV.P_Thu tuc/` + `3.ETV.P_Quy trinh/` |
| `04_ISO17034/` | Tài liệu áp dụng ISO 17034 (CRM) | — |
| `05_ISO27001/` | Tài liệu áp dụng ISO 27001 (ATTT) | — |
| `06_ISO42001/` | Tài liệu áp dụng ISO 42001 (AI) | — |

### Trong `03_ISO17025/` nên có:

```
03_ISO17025/
├── procedures/     ← ETV.P-xxx thủ tục (từ 2.ETV.P_Thu tuc)
├── processes/      ← ETV.QT-xxx quy trình (từ 3.ETV.P_Quy trinh)
└── scope/          ← phạm vi công nhận, lĩnh vực hoạt động
```

---

## KHÔNG lưu ở đây

| Loại tài liệu | Lưu đúng chỗ |
|---------------|-------------|
| 38 quy trình MP01–MP38 (Hub điều hướng) | → `04_PROCESS_LIBRARY/MPxx/` |
| Biểu mẫu gốc (F-xxx) | → `06_SHARED_RESOURCES/01_Forms/` |
| Hồ sơ đã điền, bằng chứng audit | → `11_COMPLIANCE/` |
| Hồ sơ đăng ký BoA, TDC | → `11_COMPLIANCE/boa/ tdc-dk105/ tdc-dk107/` |
| Tiêu chuẩn ISO gốc (bản mua) | → `08_KNOWLEDGE_GRAPH/02_ISO/` |
| Bản scan tiêu chuẩn vi phạm bản quyền | Không lưu |

---

## Quy tắc nhanh

> **Đây là tài liệu ETV tự ban hành để kiểm soát hệ thống chất lượng không?**  
> (Sổ tay, thủ tục ETV.P-xxx, quy trình ETV.QT-xxx)
> - Có → lưu vào `03_MANAGEMENT_SYSTEM/`
> - Không → xem bảng trên

**Phân biệt then chốt:** `03` = chuẩn mực cần đạt (WHAT) · `04` = cách thực hiện (HOW) · `11` = bằng chứng đã thực hiện (PROOF)
