---
id: ETV.P.F11.10
title: "Giấy chứng nhận kiểm định phương tiện đo nhóm 1"
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
retention: "Theo ETV.P.F 15 — hồ sơ kỹ thuật kiểm định"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV)"
related_documents: [ETV.P11, "ETV.P.F11.02", "ETV.P.F11.03"]
note: "Số hóa từ bản ManLab đang dùng thực tế (`Manlab_P.F 11.10_Mau GCN KDTN_template.docx`, nguồn `0. Data_ManLab/1. Form BM/P11_Form_GCN/P11_Form_GCN_KDTN_V2/`). Cấu trúc giống `ETV.P.F11.03` (GCN kiểm định nhóm 2) nhưng áp dụng cho PTĐ nhóm 1 (không bắt buộc kiểm định theo luật, khách hàng tự nguyện — KDTN = Kiểm định tự nguyện). Khác với bản 11.03, bảng kết quả ở đây dùng đúng dải token riêng biệt cho từng mục (không lặp token như phát hiện ở 11.03) — đã kiểm tra không có lỗi tương tự. Đã được soát xét và phê duyệt cùng lần cập nhật biểu mẫu 21/07/2026 — Biên soạn: Dương Thành Nam; Soát xét: Trần Thị Hoa; Phê duyệt: Nguyễn Hoàng Giang."
---
# GIẤY CHỨNG NHẬN KIỂM ĐỊNH (CERTIFICATE OF VERIFICATION) — PTĐ NHÓM 1 (TỰ NGUYỆN)

|  |  |
| --- | --- |
| **Mã số** | ETV.P.F 11.10 |
| **Lần ban hành** | 02 |
| **Ngày ban hành** | 21/07/2026 |
| **Thủ tục áp dụng** | ETV.P 11 — mục VI.4 (đóng gói kết quả) |

## Trang 1 — Giấy chứng nhận

VIỆN KIỂM ĐỊNH CÔNG NGHỆ VÀ MÔI TRƯỜNG · Khu C3-2B/NO4, Phường Long Biên, TP. Hà Nội · Tel/Fax: 02433.533.555 · Email: kiemdinh@etv.org.vn — `[QrCodeGCN]` — Mã đăng ký (ĐK ...) — Số: `SoGCN`

**GIẤY CHỨNG NHẬN KIỂM ĐỊNH**

| # | Nội dung | Placeholder |
| --- | --- | --- |
| 1 | Tên đối tượng (Object) | `TenDoiTuong` (`TenTiengAnh`) |
| 2 | Kiểu / Số / Mã quản lý | `TenKieu` / `SoHieu` / `mql` |
| 3 | Cơ sở sản xuất / Năm | `CoSoSanXuat` / `NSanXuat` |
| 4 | Đặc trưng kỹ thuật: Phạm vi đo / Độ phân giải | (`GiaTriDau` ÷ `GiaTriCuoi`) `fv` / `DoPhanGiai` `fv` |
| 5 | Cơ sở sử dụng (Customer) | `CoSoSuDung` |
| 6 | Địa chỉ (Address) | `DiaChi` |
| 7 | Nơi sử dụng (Place) | `NoiSuDung` |
| 8 | Phương pháp thực hiện (Method of verification) | `TenDoiTuong` — Quy trình kiểm định (`PhuongPhapThucHien`) |
| 9 | Chế độ kiểm định (Type of verification) | `Chedokd` |
| 10 | Kết luận (Conclusion) | `kl` (`ghichuE`) |
| 11 | Số tem kiểm định (Verification stamp No) | `temkd` (`GhichuT`) |
| 12 | Thời hạn đến (*) (Valid until) | `DNHieuChuan` (`GhichuN`) |

Hà Nội, ngày `Ngay` tháng `Thang` năm `Nam`

| KIỂM ĐỊNH VIÊN (Verified by) | VIỆN TRƯỞNG (Director) |
| --- | --- |
| `TenNguoiHieuChuan` | `NguoiPheDuyet` |

## Trang 2 — Kết quả kiểm định (Verification Results, số: `SoGCN`)

Vị trí bố trí điểm chuẩn (Standards position): `HinhAnh`.

Bảng kết quả gồm 9 mục theo cùng khuôn dạng với `ETV.P.F11.02`/`ETV.P.F11.03` (6 điểm chuẩn D/F/H/J/L/N, mỗi điểm 2 cột con Chuẩn/Đối tượng), với dải token riêng biệt cho từng mục — **không có lỗi trùng token**:

1. Dữ liệu đo lường 2. Sai số (`D207dv`…`N212dv`) 3. Độ lệch chuẩn (`D213dv`…`O218dv`) 4. Độ đồng đều (`D219dv`…`N224dv`) 5. Độ ổn định (`D225dv`…`N230dv`) 6. Độ hồi trễ (`D231dv`…`O236dv`) 7. Độ tuyến tính (`D243dv`…`O248dv`) 8. Độ lặp lại (`D261dv`…`O266dv`) 9. Độ không đảm bảo đo — P=95%, k=2 (`D384dv`…`O389dv`: Giá trị trung bình, Số hiệu chính, U mở rộng).

Ghi chú: `fn_MakeHtml_BBHC_GhiChu`, `NoteCapLai` (ghi chú kiểm định lại nếu có).

| Người soát xét (Reviewer by) | Người thực hiện (Verified by) |
| --- | --- |
| `NguoiSoatXet` | `TenNguoiHieuChuan` |

`fn_MakeHtml_BBHC_TraodoiNB`

## Checklist trước khi ban hành biểu mẫu
Xem `validation/checklist_template.md` tại skill `01-s-kiem-soat-tai-lieu-etv`.

---

Footer: ETV.P.F 11.10 · Lần BH: 02 · Ngày BH: 21/07/2026 · Soát xét: 21/07/2026 · Trang 1/1
