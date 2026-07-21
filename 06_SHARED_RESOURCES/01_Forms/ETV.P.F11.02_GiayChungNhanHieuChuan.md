---
id: ETV.P.F11.02
title: "Giấy chứng nhận hiệu chuẩn"
type: Bieu-mau
owner: "Lãnh đạo PTN (LĐP)"
department: "Phòng Thí nghiệm"
process: MP11_BaoCao
module: M11_BaoCao
revision: "02"
effective_date: "21/07/2026"
status: Da-phe-duyet
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo ETV.P.F 15 — hồ sơ kỹ thuật hiệu chuẩn"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV)"
related_documents: [ETV.P11, "ETV.P.F11.03", "ETV.P.F11.10"]
note: "Số hóa từ bản ManLab đang dùng thực tế (`Manlab_P.F 11.02_Mau GCN HC_template_V12.docx`, nguồn `0. Data_ManLab/1. Form BM/P11_Form_GCN/P11_Form_GCN_HC_V2/`). Bản gốc là file mail-merge từ bảng tính, có hàng trăm token ô lưới (ví dụ `D207dv`, `H14_MQL`, `ZZ.d`...) lặp lại theo đúng một khuôn dạng cho 9 mục kết quả (4.1–4.9: Dữ liệu đo lường, Sai số, Độ lệch chuẩn, Độ đồng đều, Độ ổn định, Độ hồi trễ, Độ tuyến tính, Độ lặp lại, Độ không đảm bảo đo) — AI trình bày **1 bảng khuôn mẫu chung** duy nhất kèm quy ước đặt tên token thay vì lặp lại 9 bảng gần như giống hệt nhau, để tài liệu dễ đọc mà vẫn đủ để lập trình lại mail-merge nếu cần. Đã được soát xét và phê duyệt cùng lần cập nhật biểu mẫu 21/07/2026 — Biên soạn: Dương Thành Nam; Soát xét: Trần Thị Hoa; Phê duyệt: Nguyễn Hoàng Giang."
---
# GIẤY CHỨNG NHẬN HIỆU CHUẨN (CALIBRATION CERTIFICATE)

|  |  |
| --- | --- |
| **Mã số** | ETV.P.F 11.02 |
| **Lần ban hành** | 02 |
| **Ngày ban hành** | 21/07/2026 |
| **Thủ tục áp dụng** | ETV.P 11 — mục VI.4 (đóng gói kết quả) |

## Trang 1 — Giấy chứng nhận

VIỆN KIỂM ĐỊNH CÔNG NGHỆ VÀ MÔI TRƯỜNG (Environment Technology Verification Institute) · Khu C3-2B/NO4, Phường Long Biên, TP. Hà Nội · Tel/Fax: 02433.533.555 · Email: kiemdinh@etv.org.vn — `[QrCodeGCN]` — Mã đăng ký ĐK 416 — Số: `SoGCN`

**GIẤY CHỨNG NHẬN HIỆU CHUẨN**

| # | Nội dung | Placeholder |
| --- | --- | --- |
| 1 | Tên đối tượng (Object) | `TenDoiTuong` (`TenTiengAnh`) |
| 2 | Kiểu (Type) / Số hiệu (Serial No) / Mã QL (Tag No) | `TenKieu` / `SoHieu` / `mql` |
| 3 | Nơi sản xuất (Manufacturer) | `CoSoSanXuat` |
| 4 | Đặc tính kỹ thuật đo lường: Phạm vi đo (Range) / Độ phân giải (Resolution) | (`GiaTriDau` ÷ `GiaTriCuoi`) `fv` / `DoPhanGiai` `fv` |
| 5 | Cơ sở sử dụng (Customer) | `CoSoSuDung` |
| 6 | Địa chỉ (Address) | `DiaChi` |
| 7 | Nơi sử dụng (Place) | `NoiSuDung` |
| 8 | Phương pháp thực hiện (Method of Calibration) | `TenDoiTuong` — Quy trình hiệu chuẩn (`PhuongPhapThucHien`) |
| 9 | Chế độ hiệu chuẩn (Type of Calibration) | `Chedokd` |
| 10 | Chuẩn được sử dụng (Standards used) | Hệ thống chuẩn — xem mục 3, trang 2 |
| 11 | Kết quả (Results) | Bảng kết quả kèm theo (trang 2) |
| 12 | Ngày hiệu chuẩn đề nghị (Recal. recommended) | `DNHieuChuan` |

Hà Nội, ngày `Ngay` tháng `Thang` năm `Year` (Date of Issue)

| TP. THÍ NGHIỆM (Head of Laboratory) | VIỆN TRƯỞNG (Director) |
| --- | --- |
| `NguoiSoatXet` | `NguoiPheDuyet` |

## Trang 2 — Kết quả hiệu chuẩn chi tiết

**1. Thông tin đối tượng (Object Information):** Kiểu `TenKieu` / Số hiệu `SoHieu` / Phạm vi đo (`GiaTriDau` ÷ `GiaTriCuoi`) `fv` / Độ phân giải `DoPhanGiai` `fv` / Cơ sở sản xuất `CoSoSanXuat`.

**2. Dữ liệu hiệu chuẩn (Calibration Data):** Phương pháp thực hiện `PhuongPhapThucHien` · Điểm hiệu chuẩn `diemchuan` · Người hiệu chuẩn `TenNguoiHieuChuan` · Tem hiệu chuẩn `TemHC` · Ngày hiệu chuẩn `DateHieuChuan` · Ngày hiệu chuẩn đề nghị `DNHieuChuan` · Điều kiện môi trường: Nhiệt độ (`NhietDoBD` ÷ `NhietDoKT`) °C, Độ ẩm (`DoAmBD` ÷ `DoAmKT`) %RH · Địa điểm hiệu chuẩn: ☐ Phòng thí nghiệm ☐ Cơ sở ☐ Hiện trường · Hiệu chỉnh: ☐ Có ☐ Không.

**3. Chuẩn và thiết bị chính được sử dụng:**

| Mã quản lý (Tag No) | Diễn giải (Descriptions) | Hiệu lực của chuẩn (Expiry date) | Liên kết chuẩn (Traceability) |
| --- | --- | --- | --- |
| `CSD.MQL` | `CSD.DG` | `CSD.HL` | `CSD.LKC` |

**4. Kết quả hiệu chuẩn** — Vị trí bố trí điểm chuẩn: `HinhAnh1`, `HinhAnh2`, `HinhAnh3`.

### Bảng khuôn mẫu chung — mục 4.1 đến 4.9

Các mục 4.1 Dữ liệu đo lường, 4.2 Sai số, 4.3 Độ lệch chuẩn, 4.4 Độ đồng đều, 4.5 Độ ổn định, 4.6 Độ hồi trễ, 4.7 Độ tuyến tính, 4.8 Độ lặp lại, 4.9 Độ không đảm bảo đo (P=95%, k=2) đều dùng **chung một khuôn bảng** với tối đa 6 điểm chuẩn (ký hiệu cột gốc bảng tính: D, F, H, J, L, N — tương ứng điểm 1-6), mỗi điểm có 2 cột con **Chuẩn (Ref)** và **Đối tượng (Obj)**:

| Hạng mục (Items) | ĐVT | Điểm 1 (D) | Điểm 2 (F) | Điểm 3 (H) | Điểm 4 (J) | Điểm 5 (L) | Điểm 6 (N) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| *(tên hạng mục theo từng mục 4.1–4.9)* | tđ / % | Chuẩn / Đối tượng | Chuẩn / Đối tượng | Chuẩn / Đối tượng | Chuẩn / Đối tượng | Chuẩn / Đối tượng | Chuẩn / Đối tượng |

Quy ước token theo mục:
- **4.1 Dữ liệu đo lường** — hàng mục dùng `ZZ.hm`/`ZZ.dvt`, các ô giá trị `ZZ.d`…`ZZ.o` (6 điểm × Chuẩn/Đối tượng).
- **4.2–4.9** — mỗi mục dùng 3 hàng: giá trị đo (`D2xxdv`…`N2xxdv` theo tđ và %), giá trị cho phép (MPE/MPS/MPU/MPSt/MPH/MAS…) và giá trị chấp nhận, với hậu tố số tăng dần theo mục (207–212 cho Sai số, 213–218 cho Độ lệch chuẩn, 219–224 cho Độ đồng đều, 225–230 cho Độ ổn định, 231–236 cho Độ hồi trễ, 243–248 cho Độ tuyến tính, 261–266 cho Độ lặp lại, 384–389 cho Độ không đảm bảo đo).

Ghi chú in kèm: "Điểm hiệu chuẩn theo yêu cầu khách hàng"; và tùy loại phương tiện đo: "Phương tiện đo này không phải là PTĐ nhóm 2 theo quy định tại Khoản 2 Điều 16 của Luật Đo lường" / "Phương tiện đo này không được sử dụng trực tiếp để kiểm định phương tiện đo nhóm 2" (`NoteCapLai` — ghi chú hiệu chuẩn lại nếu có).

**Người thực hiện (Calibrated by):** `TenNguoiHieuChuan`

## Checklist trước khi ban hành biểu mẫu
Xem `validation/checklist_template.md` tại skill `01-s-kiem-soat-tai-lieu-etv`.

---

Footer: ETV.P.F 11.02 · Lần BH: 02 · Ngày BH: 21/07/2026 · Soát xét: 21/07/2026 · Trang 1/1
