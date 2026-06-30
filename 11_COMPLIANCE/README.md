# 11 — COMPLIANCE ⭐ (Tuân thủ & Đăng ký nhà nước)

**Ý nghĩa:** Lớp chứng minh tuân thủ — nơi đánh giá viên (BoA/VILAS, TDC, cơ quan QLNN) truy bằng chứng. Bao gồm toàn bộ hồ sơ đăng ký hoạt động với cơ quan nhà nước.

---

## Cấu trúc thư mục

| Thư mục | Lưu gì | Nguồn Dropbox cũ |
|---------|--------|------------------|
| `01_ISO_Mapping/` | Bảng ánh xạ điều khoản ISO 17025/9001 ↔ MP ↔ bằng chứng | Mới tạo |
| `02_Legal_Mapping/` | Bảng ánh xạ Nghị định/Thông tư ↔ hoạt động ETV | Mới tạo |
| `03_Evidence/` | Bằng chứng tuân thủ có mã EV-xxx: hồ sơ, nhật ký, ảnh | `Data_ManLab/KQ_*` đã hoàn thành |
| `04_Audit/` | Biên bản đánh giá nội bộ, báo cáo đánh giá bên ngoài | `1.E_ISO17025/` → audit records |
| `05_NC/` | Phiếu ghi nhận sự không phù hợp (KPH) | `0.Data_ManLab/13_KQ_KPH/` |
| `06_CAPA/` | Phiếu hành động khắc phục/phòng ngừa | Liên kết từ `05_NC/` |
| `07_Management_Review/` | Biên bản xem xét lãnh đạo | `0.Data_ManLab/17_KQ_XemxetLanhdao/` |
| `08_Risk/` | Sổ rủi ro | `0.Data_ManLab/16_KQ_DanhGiaNoibo/` |
| `09_Opportunity/` | Sổ cơ hội cải tiến | — |
| `boa/` | Hồ sơ công nhận BoA/VILAS: giấy công nhận, phạm vi, hồ sơ nộp | `1.E_ISO17025/4.HS_BoA/` |
| `tdc-dk105/` | Đăng ký kiểm định HC (ND105): QĐ, biểu M1–M13, GCN đào tạo, GCN chuẩn đo lường, BC TDC | `2.E_TDC_DK 105/` |
| `tdc-dk107/` | Đăng ký thử nghiệm (ND107): QĐ, thủ tục, phương pháp, TLTK, M8 báo cáo | `2.E_TDC_DK 107_TN/` |

---

## KHÔNG lưu ở đây

| Loại tài liệu | Lưu đúng chỗ |
|---------------|-------------|
| Bản nháp thủ tục, quy trình chưa ban hành | → `03_MANAGEMENT_SYSTEM/` |
| Biểu mẫu trắng chưa điền | → `06_SHARED_RESOURCES/01_Forms/` |
| Hồ sơ pháp lý Viện (thành lập, đăng ký KD) | → `01_ENTERPRISE/legal/` |
| Tiêu chuẩn, quy chuẩn tham chiếu | → `08_KNOWLEDGE_GRAPH/` |

---

## Quy tắc nhanh

> **Tài liệu này để chứng minh với bên ngoài (BoA, TDC, thanh tra) rằng ETV đã tuân thủ không?**
> - Có → lưu vào `11_COMPLIANCE/`
> - Không → đây là tài liệu nội bộ, xem các tầng khác

**Đặt tên file:** `YYYY_TenHoSo_v1.pdf`  
**Lưu ý:** Bằng chứng trong `03_Evidence/` nên kèm mã `MPxx` để truy ngược về quy trình đã sinh ra nó.
