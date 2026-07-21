---
id: ETV.P.F11.03
title: "Giấy chứng nhận kiểm định phương tiện đo nhóm 2"
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
related_documents: [ETV.P11, "ETV.P.F11.02", "ETV.P.F11.10"]
note: "Số hóa từ bản ManLab đang dùng thực tế (`Manlab_P.F 11.03_Mau GCN KD_template.docx`, nguồn `0. Data_ManLab/1. Form BM/P11_Form_GCN/P11_Form_GCN_KD_V2/`). Cấu trúc bảng kết quả giống hệt `ETV.P.F11.02` (9 mục lặp cùng khuôn dạng, xem bảng khuôn mẫu chung tại đó); áp dụng cho phương tiện đo (PTĐ) thuộc Danh mục nhóm 2 phải kiểm định. **Phát hiện khi số hóa:** trong file nguồn, mục 7 (Độ tuyến tính) và mục 8 (Độ lặp lại) dùng **trùng token** với mục 6 (Độ hồi trễ) — `D231dv`…`O236dv` lặp lại 3 lần thay vì có dải token riêng như bản `ETV.P.F11.02` (dùng 243–248 và 261–266 cho hai mục này) — nhiều khả năng là lỗi copy-paste khi tạo template KD từ template HC. AI **không tự sửa** token vì không có quyền truy cập file bảng tính gốc để xác nhận; đã ghi token đúng như bản gốc và đánh dấu để LĐP/Văn phòng kiểm tra lại file mail-merge gốc trước khi dùng in ấn thật. Đã được soát xét và phê duyệt cùng lần cập nhật biểu mẫu 21/07/2026 — Biên soạn: Dương Thành Nam; Soát xét: Trần Thị Hoa; Phê duyệt: Nguyễn Hoàng Giang."
---
# GIẤY CHỨNG NHẬN KIỂM ĐỊNH (CERTIFICATE OF VERIFICATION) — PTĐ NHÓM 2

|  |  |
| --- | --- |
| **Mã số** | ETV.P.F 11.03 |
| **Lần ban hành** | 02 |
| **Ngày ban hành** | 21/07/2026 |
| **Thủ tục áp dụng** | ETV.P 11 — mục VI.4 (đóng gói kết quả) |

> **⚠ Lưu ý số hóa:** mục 7 và 8 của bảng kết quả (trang 2) dùng trùng token với mục 6 trong file nguồn ManLab — cần Văn phòng kiểm tra lại file mail-merge gốc trước khi in ấn (xem `note` YAML phía trên).

## Trang 1 — Giấy chứng nhận

VIỆN KIỂM ĐỊNH CÔNG NGHỆ VÀ MÔI TRƯỜNG · Khu C3-2B/NO4, Phường Long Biên, TP. Hà Nội · Tel/Fax: 02433.533.555 · Email: kiemdinh@etv.org.vn — `[QrCodeGCN]` — Số: `SoGCN`

**GIẤY CHỨNG NHẬN KIỂM ĐỊNH**

| # | Nội dung | Placeholder |
| --- | --- | --- |
| 1 | Tên đối tượng (Object) | `TenDoiTuong` (`TenTiengAnh`) |
| 2 | Kiểu / Số / Mã quản lý | `TenKieu` / `SoHieu` / `mql` |
| 3 | Nơi sản xuất / Năm | `CoSoSanXuat` / `NamSanXuat` |
| 4 | Đặc tính kỹ thuật đo lường: Phạm vi đo / Độ phân giải | (`GiaTriDau` ÷ `GiaTriCuoi`) `fv` / `DoPhanGiai` `fv` |
| 5 | Cơ sở sử dụng (Customer) | `CoSoSuDung` |
| 6 | Địa chỉ (Address) | `DiaChi` |
| 7 | Nơi sử dụng (Place) | `NoiSuDung` |
| 8 | Phương pháp thực hiện (Method of verification) | `TenDoiTuong` — Quy trình kiểm định (`PhuongPhapThucHien`) |
| 9 | Chế độ kiểm định (Type of verification) | `Chedokd` |
| 10 | Kết luận (Conclusion) | `kl` (`ghichuE`) |
| 11 | Số tem kiểm định (Verification stamp No) | `temkd` (`GhichuT`) |
| 12 | Thời hạn đến (*) (Valid until) | `DNHieuChuan` (`GhichuN`) |

Hà Nội, ngày `Ngay` tháng `Thang` năm `Year`

| KIỂM ĐỊNH VIÊN (Verified by) | VIỆN TRƯỞNG (Director) |
| --- | --- |
| `NguoiSoatXet` | `NguoiPheDuyet` |

Ghi chú in kèm: `fn_MakeHtml_BBHC_GhiChu`

## Trang 2 — Kết quả kiểm định (số: `SoGCN`)

Bảng kết quả gồm 8 mục theo cùng khuôn dạng với `ETV.P.F11.02` (6 điểm chuẩn D/F/H/J/L/N, mỗi điểm 2 cột con Chuẩn/Đối tượng):

1. **Dữ liệu đo lường** — token `ZZZ.hm`, `ZZZ.dvt`, `ZZZ.d`…`ZZZ.o`.
2. **Sai số** — token `D207dv`…`N212dv` (như HC).
3. **Độ lệch chuẩn** — token `D213dv`…`O218dv`.
4. **Độ đồng đều** — token `D219dv`…`N224dv`.
5. **Độ ổn định** — token `D225dv`…`N230dv`.
6. **Độ hồi trễ** — token `D231dv`…`O236dv`.
7. **Độ tuyến tính** — *(nguồn dùng trùng token `D231dv`…`O236dv` với mục 6 — cần xác nhận lại)*.
8. **Độ lặp lại** — *(nguồn dùng trùng token `D231dv`…`O236dv` với mục 6 — cần xác nhận lại)*.
9. **Độ không đảm bảo đo** (P=95%, k=2) — token `D384dv`…`O389dv` (Giá trị trung bình, Số hiệu chính, U mở rộng).

Ghi chú: `fn_MakeHtml_BBHC_GhiChu`, `NoteCapLai` (ghi chú hiệu chuẩn/kiểm định lại nếu có).

| Người soát xét (Reviewer by) | Người thực hiện (Verified by) |
| --- | --- |
| `NguoiSoatXet` | `TenNguoiHieuChuan` |

`fn_MakeHtml_BBHC_TraodoiNB`

## Checklist trước khi ban hành biểu mẫu
Xem `validation/checklist_template.md` tại skill `01-s-kiem-soat-tai-lieu-etv`.

---

Footer: ETV.P.F 11.03 · Lần BH: 02 · Ngày BH: 21/07/2026 · Soát xét: 21/07/2026 · Trang 1/1
