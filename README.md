# MANLAB-AIOS — Enterprise Operating System Repository

[![Validate links](https://github.com/namdtvast/MANLAB-AIOS/actions/workflows/validate-links.yml/badge.svg)](https://github.com/namdtvast/MANLAB-AIOS/actions/workflows/validate-links.yml)

> 🌐 **Cổng tra cứu tương tác:** **https://namdtvast.github.io/MANLAB-AIOS/** — duyệt cấu trúc thư mục, mở tài liệu và chia sẻ cho đoàn đánh giá. (Mã nguồn trang: [`docs/`](docs/) · cách bật Pages: [docs/README.md](docs/README.md))

**Viện Kiểm định Công nghệ và Môi trường (ETV)** · Kiến trúc **v4.1**

> Đây không phải kho tài liệu. Đây là **Hệ điều hành doanh nghiệp**.
> Đơn vị nhỏ nhất là **Business Capability (Năng lực nghiệp vụ)**.

## Quy ước đặt tên (mới)
- Thư mục có **mã + tên gọi ngắn** không dấu: `MP01_RuiRo`, `M21_CongBoNangLuc`, `CAP-08_HieuChuan`.
- Thư mục con được **đánh số thứ tự** `01_, 02_, …` để sắp xếp theo đúng logic/độ quan trọng (không bị xếp ABC).

## Bản đồ thư mục — ý nghĩa từng tầng
| Tầng | Trả lời | Lưu gì | KHÔNG lưu |
|---|---|---|---|
| `01_ENTERPRISE` | Vì sao Viện tồn tại | Chiến lược, tổ chức, lộ trình | Quy trình, biểu mẫu, hồ sơ |
| `02_CAPABILITIES` ⭐ | Viện làm được **gì** | Năng lực CAP-xx + link tới MP | Cách làm chi tiết, code |
| `03_MANAGEMENT_SYSTEM` | Theo **luật chơi** nào | Chuẩn mực ISO + ETV.QM | **Quy trình MP**, biểu mẫu |
| `04_PROCESS_LIBRARY` ⭐ | Làm **thế nào** | 38 Hub MP (README+manifest+links) | Thủ tục đầy đủ, bản copy |
| `05_MODULE_LIBRARY` ⭐ | Số hóa **bằng gì** | Đặc tả 38 module | Dữ liệu thật, secrets |
| `06_SHARED_RESOURCES` ⭐ | Tài nguyên **dùng chung** | Biểu mẫu gốc, master data | Hồ sơ đã điền |
| `07_AI_OPERATING_SYSTEM` ⭐ | **AI** vận hành | Skill, Agent, Guardrail, Policy | Dữ liệu mật trong prompt |
| `08_KNOWLEDGE_GRAPH` ⭐ | AI **đọc** ở đâu | QPPL, ISO, ontology, vector | Chuẩn mực kiểm soát (ở 03) |
| `09_ENGINEERING` | **Code** | Backend/Frontend/API/DB | Secrets, dữ liệu sản xuất |
| `10_DEPLOYMENT` | **Vận hành** | Docker/K8s/Backup/DR | Khóa/bí mật thật |
| `11_COMPLIANCE` ⭐ | **Chứng minh** tuân thủ | Mapping, bằng chứng, audit, CAPA | Bản nháp tài liệu |
| `12_RESEARCH` | **Tương lai** | KC4.0, DMC, OCR, paper | Hệ thống vận hành chính thức |

> Chi tiết "Lưu gì / Không lưu / Lưu ý" của **từng thư mục con** nằm trong `README.md` của chính thư mục đó.

## 3 quy ước bất biến
1. **MP/M là Hub** — chỉ `README.md` + `manifest.yaml` + `links.yaml`. **Link, không copy.**
2. **Một nguồn sự thật** — biểu mẫu ở `06`, tiêu chuẩn ở `03`, tri thức ở `08`.
3. **Digital Thread** — `04_PROCESS_LIBRARY/_DIGITAL_THREADS`.

---

## Bản đồ di chuyển — từ Dropbox cũ vào repo này

> Dùng bảng này khi chuyển tài liệu từ cấu trúc Dropbox cũ. Mỗi dòng = **1 thư mục nguồn → 1 đích duy nhất**.

| Thư mục Dropbox cũ | Chuyển vào | Ghi chú |
|--------------------|-----------|---------|
| `1.ManLab_Cal/1.Ban Mo ta/` | `05_MODULE_LIBRARY/M08_QuanTrac/01_Requirement/` | Bản mô tả sản phẩm ManLab |
| `1.ManLab_Cal/5.ManCheck/` | `05_MODULE_LIBRARY/M08_QuanTrac/` | ManCheck → module quản trắc |
| `1.Vien ETV/0.Data_ManLab/1.Form BM/` | `06_SHARED_RESOURCES/01_Forms/` | Biểu mẫu gốc chưa điền |
| `1.Vien ETV/0.Data_ManLab/2_BaoGia/` | `02_CAPABILITIES/CAP-01_BaoGia/` | Dữ liệu báo giá thực tế |
| `1.Vien ETV/0.Data_ManLab/2_KQ_Hopdong/` | `02_CAPABILITIES/CAP-07_HopDong/` | Hợp đồng đã ký |
| `1.Vien ETV/0.Data_ManLab/13_KQ_KPH/` | `11_COMPLIANCE/05_NC/` | Sự không phù hợp |
| `1.Vien ETV/0.Data_ManLab/17_KQ_XemxetLanhdao/` | `11_COMPLIANCE/07_Management_Review/` | Xem xét lãnh đạo |
| `1.Vien ETV/1.E_ISO17025/1.ETV.QM_STCL/` | `03_MANAGEMENT_SYSTEM/01_ETV.QM/` | Sổ tay chất lượng |
| `1.Vien ETV/1.E_ISO17025/2.ETV.P_Thu tuc/` | `03_MANAGEMENT_SYSTEM/03_ISO17025/` → procedures | Thủ tục ISO |
| `1.Vien ETV/1.E_ISO17025/3.ETV.P_Quy trinh/` | `03_MANAGEMENT_SYSTEM/03_ISO17025/` → processes | Quy trình kỹ thuật |
| `1.Vien ETV/1.E_ISO17025/4.HS_BoA/` | `11_COMPLIANCE/boa/` | Hồ sơ công nhận BoA |
| `1.Vien ETV/2.E_TDC_DK 105/` | `11_COMPLIANCE/tdc-dk105/` | Đăng ký kiểm định ND105 |
| `1.Vien ETV/2.E_TDC_DK 107_TN/` | `11_COMPLIANCE/tdc-dk107/` | Đăng ký thử nghiệm ND107 |
| `1.Vien ETV/4.E_Thu tuc/1–2` | `01_ENTERPRISE/legal/` | Quyết định, đăng ký KD |
| `1.Vien ETV/4.E_Thu tuc/3–4, 8` | `01_ENTERPRISE/banking-tax/` | Ngân hàng, thuế, HĐĐT |
| `1.Vien ETV/4.E_Thu tuc/10–20` | `01_ENTERPRISE/assets/` | Mua đất, xe, chung cư |
| `1.Vien ETV/5.E_Ho so/*_Nhan hieu/` | `01_ENTERPRISE/ip-trademark/` | Nhãn hiệu đã đăng ký |
| `1.Vien ETV/5.E_Ho so/*_Sang che, GPHI, KDCN/` | `01_ENTERPRISE/ip-patent/` | Sáng chế đã nộp đơn |
| `1.Vien ETV/12.Dich vu_CHTD/` | `12_RESEARCH/10_CHTD/` | Dịch vụ CHTD, HTIC |
| `1.Vien ETV/13.Van thu Di Den/` | `01_ENTERPRISE/correspondence/` | Công văn đi/đến |
| `1.Vien ETV/14.HS.Ke toan/` | `01_ENTERPRISE/finance/` | Hồ sơ kế toán |
| `1.Vien ETV/Logo, hinh anh/` | `06_SHARED_RESOURCES/13_Branding/` | Logo tất cả thương hiệu |
| `1.Vien ETV/TLTK/5.TCVN/` | `08_KNOWLEDGE_GRAPH/04_TCVN/` | Tiêu chuẩn TCVN |
| `1.Vien ETV/TLTK/6.QCVN/` | `08_KNOWLEDGE_GRAPH/13_QCVN/` | Quy chuẩn QCVN |
| `1.Vien ETV/TLTK/7.DLVN/` | `08_KNOWLEDGE_GRAPH/03_DLVN/` | ĐLVN |
| `1.Vien ETV/TLTK/8.BoA/` | `08_KNOWLEDGE_GRAPH/05_ILAC/` | Tài liệu tổ chức công nhận |
| `TAI LIEU/0.1.* (khí)/` | `04_PROCESS_LIBRARY/air/` | Tài liệu kỹ thuật đo khí |
| `TAI LIEU/0.9.* (nước)/` | `04_PROCESS_LIBRARY/water/` | Tài liệu kỹ thuật đo nước |
| `TAI LIEU/0.3.* (lưu lượng)/` | `04_PROCESS_LIBRARY/flow/` | Lưu lượng, tốc độ gió |
| `TAI LIEU/0.4–7 (vật lý)/` | `04_PROCESS_LIBRARY/physical/` | Bụi, nhiệt, ẩm, ồn |
| `TAI LIEU/0.10–12 (hiệu chuẩn)/` | `04_PROCESS_LIBRARY/calibration/` | RM, CRM, uncertainty |
| `TAI LIEU/1.4.* (pháp luật)/` | `08_KNOWLEDGE_GRAPH/01_Regulations/` | Luật, NĐ, TT |
| `TAI LIEU/2.1.EPA, 2.9.ASTM, 2.7.APHA/` | `08_KNOWLEDGE_GRAPH/12_International/` | Tiêu chuẩn quốc tế |
| `TAI LIEU/2.2.ISO/` | `08_KNOWLEDGE_GRAPH/02_ISO/` | Tiêu chuẩn ISO |
| `TAI LIEU/2.4.VIM, GUM/` | `08_KNOWLEDGE_GRAPH/12_International/` | VIM, GUM |
| `4.Presentation/` | `12_RESEARCH/11_Presentations/` | Slide theo năm |
| `Z.Dang hoan thien/0.Bieu mau chung/` | `06_SHARED_RESOURCES/01_Forms/` | Biểu mẫu chung |

> **Sau khi di chuyển xong**: xoá thư mục nguồn để tránh trùng lặp. Dùng script `_meta/migrate.sh` (nếu có).

---

Xem [ARCHITECTURE.md](ARCHITECTURE.md) · [_meta/SCHEMA.md](_meta/SCHEMA.md) · [_meta/INDEX.md](_meta/INDEX.md)
