# 01 — Forms (Biểu mẫu gốc)

> **Một câu:** bản trắng của mọi biểu mẫu `ETV.P.Fxx.yy` — chưa điền, chưa ký, ai cần thì lấy về dùng.

**Hiện có:** 132 biểu mẫu / 28 thủ tục, gom theo thư mục `Fxx_Slug/`. Đây là **nguồn sự thật duy nhất** của biểu mẫu trong toàn repo — mọi tầng khác chỉ **link** về đây, không copy.

## Không lưu ở đây

| Thứ này | Về đâu | Vì sao |
|---|---|---|
| Biểu mẫu **đã điền, đã ký, có ngày** | [`03_MANAGEMENT_SYSTEM/05_R/`](../../03_MANAGEMENT_SYSTEM/05_R) (hồ sơ kiểm soát tài liệu) · CSDL/ManLab (hồ sơ vận hành) | Đó là hồ sơ — cấm sửa; biểu mẫu ở đây thì sửa được |
| Hồ sơ dùng để **chứng minh tuân thủ với bên ngoài** (BoA, TDC, thanh tra) | [`11_COMPLIANCE/03_Evidence`](../../11_COMPLIANCE/03_Evidence) | Là bằng chứng có mã `EV-xxx` |
| Mẫu trình bày không có mã F (công văn, slide, báo cáo) | [`02_Templates`](../02_Templates) | Không gắn với thủ tục nào |
| Bản sao biểu mẫu đặt ở tầng khác | Không có — chỉ đặt link | Bản sao trôi khỏi bản gốc (xem ghi chú 31/08/2026 tại [`04_F`](../../03_MANAGEMENT_SYSTEM/04_F)) |

---

## Quy ước thư mục

Biểu mẫu gom theo **số thủ tục ban hành**, không phải mỗi biểu mẫu một thư mục.

- Tên thư mục: `F{số thủ tục}_{Slug}` — dùng lại đúng slug của `MPxx_Slug` trong `04_PROCESS_LIBRARY` (`F03_NhanSu` ↔ `MP03_NhanSu`). Thủ tục không có MP tương ứng thì lấy slug của chính file thủ tục (`F42_NoiQuyLaoDong` ↔ `ETV.P42_NoiQuyLaoDong.md`).
- **Không đổi tên file.** Mã tài liệu được rút ra từ tên file, không phải tên thư mục — xem `maTaiLieuTuDuongDan()` trong `09_ENGINEERING/aios-platform/src/lib/m29/copilot/goi-y.ts`. Đổi tên file làm hỏng chỉ mục Copilot và trích dẫn.
- Thêm thủ tục mới có biểu mẫu ⇒ tạo thư mục `Fxx_Slug/` mới, đừng đặt file rời ở gốc `01_Forms/`.

| Thư mục | Số biểu mẫu | Thủ tục ban hành |
|---|---|---|
| `F01_RuiRo/` | 5 | [`ETV.P01_RuiRoCoHoi`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P01_RuiRoCoHoi.md) |
| `F02_BaoMat/` | 5 | [`ETV.P02_BaoMat`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P02_BaoMat.md) |
| `F03_NhanSu/` | 18 | [`ETV.P03_NhanSu`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P03_NhanSu.md) |
| `F04_MoiTruong/` | 4 | [`ETV.P04_MoiTruong`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P04_MoiTruong.md) |
| `F05_ThietBi/` | 10 | [`ETV.P05_ThietBi`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P05_ThietBi.md) |
| `F06_MuaSam/` | 8 | [`ETV.P06_MuaSam`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P06_MuaSam.md) |
| `F07_HopDong/` | 4 | [`ETV.P07_HopDong`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P07_HopDong.md) |
| `F08_PhuongPhap/` | 2 | [`ETV.P08_PhuongPhap`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P08_PhuongPhap.md) |
| `F10_DamBaoKQ/` | 9 | [`ETV.P10_DamBaoHieuLucKetQua`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P10_DamBaoHieuLucKetQua.md) |
| `F11_BaoCao/` | 5 | [`ETV.P11_BaoCao`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P11_BaoCao.md) |
| `F12_KhieuNai/` | 3 | [`ETV.P12_KhieuNai`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P12_KhieuNai.md) |
| `F14_TaiLieu/` | 6 | [`ETV.P14_KiemSoatTaiLieu`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P14_KiemSoatTaiLieu.md) |
| `F19_SanXuatCRM/` | 3 | [`ETV.P19_SanXuatCRM`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P19_SanXuatCRM.md) |
| `F20_PhanPhoi/` | 1 | [`ETV.P20_PhanPhoi`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P20_PhanPhoi.md) |
| `F24_KPI/` | 3 | [`ETV.P24_QuanLyLuongThuong`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P24_QuanLyLuongThuong.md) |
| `F25_BoiCanh/` | 3 | [`ETV.P25_QuanLyBoiCanh`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P25_QuanLyBoiCanh.md) |
| `F26_TriThuc/` | 4 | [`ETV.P26_QuanLyTriThuc`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P26_QuanLyTriThuc.md) |
| `F27_TaiSanTT/` | 3 | [`ETV.P27_QuanTriDuLieuTaiSanTT`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P27_QuanTriDuLieuTaiSanTT.md) |
| `F28_ATTT/` | 4 | [`ETV.P28_QuanLyAnToanThongTin`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P28_QuanLyAnToanThongTin.md) |
| `F29_AI/` | 4 | [`ETV.P29_QuanLyTriTueNhanTao`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P29_QuanLyTriTueNhanTao.md) |
| `F30_ThayDoi/` | 3 | [`ETV.P30_QuanLyThayDoi`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P30_QuanLyThayDoi.md) |
| `F31_LienTuc/` | 4 | [`ETV.P31_QuanLyLienTuc`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P31_QuanLyLienTuc.md) |
| `F32_ChuyenDoiSo/` | 4 | [`ETV.P32_ChuyenDoiSo`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P32_ChuyenDoiSo.md) |
| `F33_HeThongTT/` | 4 | [`ETV.P33_QuanLyHeThongThongTin`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P33_QuanLyHeThongThongTin.md) |
| `F34_DuLieuSo/` | 3 | [`ETV.P34_QuanLyDuLieuSo`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P34_QuanLyDuLieuSo.md) |
| `F35_NenTangSo/` | 4 | [`ETV.P35_QuanLyNenTangSo`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P35_QuanLyNenTangSo.md) |
| `F37_TichHopDuLieu/` | 3 | [`ETV.P37_QuanLyTichHopDuLieu`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P37_QuanLyTichHopDuLieu.md) |
| `F38_DichVuSo/` | 3 | [`ETV.P38_QuanLyDichVuSo`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P38_QuanLyDichVuSo.md) |
| `F42_NoiQuyLaoDong/` | 3 | [`ETV.P42_NoiQuyLaoDong`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P42_NoiQuyLaoDong.md) |

**Tổng: 132 biểu mẫu / 28 thủ tục.**

---

## Phép thử nhanh

> File có **mã F**, có **ô trống chờ điền**, và **chưa có tên ai** trên đó? → để ở đây. Đã có tên người và chữ ký → là hồ sơ, không để ở đây.

---

**Lưu ý:** Sửa một chỗ → mọi nơi dùng lại cập nhật. Đây là lý do tránh nhân bản. Sau khi thêm/di chuyển biểu mẫu, chạy `python3 _meta/validate_links.py` để chắc mọi `links.yaml` còn trỏ đúng.
