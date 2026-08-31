---
id: ETV.P.F03.08
title: "Danh sách nhân sự"
type: Bieu-mau
process: MP03_NhanSu
module: M03_NhanSu
revision: "03"
effective_date: "20/07/2026"
review_date: "31/08/2026"
status: Nhap
knowledge_category: HTQL-noi-bo
permission: Noi-bo
source: "Viện Kiểm định Công nghệ và Môi trường (ETV)"
related_documents: [ETV.P03, "ETV.P.F03.01", "ETV.P.F03.09", "ETV.P.F03.13"]
note: "BẢN DỰ THẢO SOÁT XÉT — chưa thay thế bản đã ban hành `ETV.P.F03.08_DanhSachNhanSu.md`. Theo phiếu `ETV.P.F14.01_2026-08-31_F03.08_DoiChieuManLab`. Giữ nguyên lần ban hành 03 theo ETV.P14 §6.4 (biểu mẫu soát xét riêng chỉ ghi ngày soát xét, không tăng lần ban hành của thủ tục); ETV.P03 vẫn ở lần 03. Cấu trúc cột đã đối chiếu ngày 31/08/2026 với danh sách nhân sự đang vận hành trên ManLab (view `vw_tb_qlManLab_NhanSu`, 145 bản ghi, 53 cột) — thay cho ghi chú 'cần LĐP/Văn phòng đối chiếu' của lần dựng đầu, khi các file Excel nguồn đều 0 byte không đọc được. Danh mục giá trị của các cột mã hoá lấy tại `06_SHARED_RESOURCES/04_Master_Data/` và `06_SHARED_RESOURCES/08_Personnel/`, không chép vào biểu mẫu."
---
# DANH SÁCH NHÂN SỰ

|  |  |
| --- | --- |
| **Mã số** | ETV.P.F 03.08 |
| **Lần ban hành** | 03 |
| **Ngày ban hành** | 20/07/2026 |
| **Ngày soát xét** | 31/08/2026 |
| **Thủ tục áp dụng** | ETV.P 03 — mục 6.1, 6.5, 6.7, 6.8 |

## Danh sách

| TT | Mã nhân sự | Họ và tên | Ngày sinh | Đơn vị công tác | Bộ phận | Chức danh | Nhóm nhân sự | Lĩnh vực kiểm định | Số thẻ KĐV | Thẻ hết hạn | Loại hợp đồng | Ngày bắt đầu HĐ | Ngày kết thúc HĐ | Trạng thái lao động | Trạng thái duyệt | Ghi chú |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| | `MaNV` | `TenNV` | `NamSinhNV` | `DonViCongTac` | `BoPhanNV` | `ChucVuNV` | `NhomNS` | `LinhVucKD` | `SoTheKDV` | `NgayHetHanThe` | `LoaiHopDongNV` | `NBDHD` | `NKTHD` | ☐ Thử việc ☐ Chính thức ☐ Đã nghỉ | ☐ Nháp ☐ Chờ duyệt ☐ Đã duyệt ☐ Không duyệt | |

### Cách điền các cột mã hoá

| Cột | Lấy giá trị hợp lệ ở đâu |
|---|---|
| Mã nhân sự | Cấu trúc `<Mã bộ phận><số thứ tự>` — [`06/04_Master_Data/MaBoPhan.md`](../../04_Master_Data/MaBoPhan.md) §2 |
| Bộ phận | [`MaBoPhan.md`](../../04_Master_Data/MaBoPhan.md) §1.1 — **chỉ dùng mã ở §1.1**; không điền `CTV`/`NĐT`/`NCC`/`CDHĐ` vào cột này (§1.2) |
| Đơn vị công tác | Pháp nhân nơi ký hợp đồng; ghi đúng tên trong dữ liệu chủ Chủ thể |
| Chức danh | [`06/08_Personnel/DanhMuc_ChucDanh.md`](../../08_Personnel/DanhMuc_ChucDanh.md) |
| Nhóm nhân sự · Loại hợp đồng · hai cột Trạng thái | [`06/04_Master_Data/LoaiHopDong_TrangThai.md`](../../04_Master_Data/LoaiHopDong_TrangThai.md) |
| Lĩnh vực kiểm định | [`06/08_Personnel/MaTranNangLuc_LinhVucKiemDinh.md`](../../08_Personnel/MaTranNangLuc_LinhVucKiemDinh.md) §1 — nhiều lĩnh vực ghi mỗi lĩnh vực một dòng, không dồn vào một ô |

### Những cột KHÔNG thuộc biểu mẫu này

Số CMTND/CCCD, nơi và ngày cấp, mã số thuế TNCN, mã số BHXH, số tài khoản ngân hàng, mức lương, chỗ ở hiện nay, nguyên quán, biển số xe, số điện thoại người thân, ảnh đại diện — **không điền vào danh sách này**.

Đây là **danh sách**, không phải hồ sơ cá nhân: các trường trên đã có tại `ETV.P.F 03.01` (Sơ yếu lý lịch) và `ETV.P.F 03.09` (Hợp đồng lao động). Mỗi bản sao thêm là một bản dữ liệu cá nhân nữa phải bảo vệ theo Nghị định 13/2023/NĐ-CP, mà không thêm thông tin nào cho mục đích của biểu mẫu — chứng minh Viện có đủ nhân lực và nhân lực đó được ủy quyền đúng việc.

---

*Trạng thái lao động cập nhật ngay khi có thay đổi theo ETV.P03: tiếp nhận mới, ký/gia hạn hợp đồng, hoàn thành đào tạo (chuyển từ Thử việc → Chính thức), chấm dứt hợp đồng (chuyển sang Đã nghỉ, dẫn chiếu `ETV.P.F 03.13`). Khi chấm dứt hợp đồng, **giữ nguyên Bộ phận và Đơn vị công tác** — không ghi đè thành trạng thái.*

---

| Người cập nhật (Văn phòng) | Ngày cập nhật | Xác nhận (Lãnh đạo Viện) |
| --- | --- | --- |
| | | |
