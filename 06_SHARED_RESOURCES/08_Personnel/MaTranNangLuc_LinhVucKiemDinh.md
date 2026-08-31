# Ma trận năng lực — trục lĩnh vực kiểm định

> **Một câu:** danh mục các **lĩnh vực kiểm định** mà một nhân sự có thể được ủy quyền thực hiện, cùng loại bằng chứng chứng minh ủy quyền đó — đây là trục dọc của ma trận năng lực, không phải bản thân ma trận đã điền tên người.

**Nguồn đối chiếu:** bản kết xuất `vw_tb_qlManLab_NhanSu` ngày 31/08/2026 (145 bản ghi), cột *Lĩnh vực kiểm định (M4-TT24)* và bốn cột thẻ kiểm định viên. Chỉ rút **tập giá trị lĩnh vực**, không rút ai được ủy quyền lĩnh vực nào — phần đó là dữ liệu vận hành, sống trong CSDL ManLab.

---

## 1. Danh mục lĩnh vực

| Lĩnh vực (tên trên ManLab) | Ký hiệu `ETV.P14` §6.2 — **đối chiếu đề nghị** |
|---|---|
| Khối lượng | `M` |
| Dung tích – Lưu lượng | `F` — *P14 ghi "Lưu lượng", tên không trùng* |
| Áp suất | `P` |
| Nhiệt độ | `T` |
| Độ ẩm | `H` |
| Quang học | `O` |
| Thời gian – Tần số | `S` |
| Hoá lý (nước) | `W` — *P14 ghi "Nước", tên không trùng* |
| Hoá lý (khí) | `A` — *P14 ghi "Không khí", tên không trùng* |
| Y tế | *(chưa có ký hiệu)* |
| Quan trắc (RA khí) | *(chưa có ký hiệu)* |
| Quan trắc (RA nước) | *(chưa có ký hiệu)* |

Cột ký hiệu là **đối chiếu do người soạn đề nghị**, chưa được ban hành: ba dòng đánh dấu *tên không trùng* là suy luận từ nghĩa, cần LĐP xác nhận trước khi dùng để mã hoá tài liệu. Sáu dòng còn lại trùng tên nên đối chiếu hiển nhiên.

Giá trị `Không áp dụng` và `Không lĩnh vực` trong dữ liệu vận hành **không phải lĩnh vực** — đó là cách ghi "người này không làm kiểm định". Hai cách viết cho cùng một ý là thừa; đề nghị giữ một. Ngoài ra một bản ghi ghi lĩnh vực là `Kế toán Nội bộ` — đó là công việc, không phải lĩnh vực kiểm định; cần Văn phòng sửa trên ManLab.

**Một người có thể có nhiều lĩnh vực.** 18/145 bản ghi ghi từ hai lĩnh vực trở lên, phân tách bằng dấu `;` trong một ô văn bản. Đây là quan hệ nhiều–nhiều bị nén vào chuỗi — xem [`M03_NhanSu/03_Database/DataModel.md`](../../05_MODULE_LIBRARY/M03_NhanSu/03_Database/DataModel.md) §4 khoảng cách K4.

## 2. Hai danh mục lĩnh vực đang lệch nhau

| | Danh mục ManLab (cột M4-TT24) | Bảng ký hiệu `ETV.P14` §6.2 |
|---|---|---|
| Có ở đây, thiếu ở kia | Y tế · Quan trắc (RA khí) · Quan trắc (RA nước) | — |
| Thiếu ở đây, có ở kia | — | Điện (`E`) |

Ba lĩnh vực **Y tế** và **Quan trắc (RA khí/nước)** đang được gán cho nhân sự thật nhưng chưa có ký hiệu trong bảng mã hoá của thủ tục kiểm soát tài liệu — nghĩa là chưa mã hoá được tài liệu kỹ thuật thuộc ba lĩnh vực này. Ngược lại **Điện** có ký hiệu nhưng chưa nhân sự nào được gán.

Việc bổ sung ký hiệu lĩnh vực vào `ETV.P14` §6.2 phải qua soát xét và ban hành lại thủ tục (`ETV.P14` §6.2, đoạn cuối) — không tự sinh ký hiệu mới. Tiền lệ gần nhất: phiếu [`ETV.P.F14.01_2026-08-30_P14_KyHieuLinhVucAI`](../../03_MANAGEMENT_SYSTEM/05_R/F14_TaiLieu/ETV.P.F14.01_2026-08-30_P14_KyHieuLinhVucAI.md).

## 3. Thẻ kiểm định viên — bằng chứng ủy quyền

Bốn trường đang theo dõi trên ManLab, điền cho 27–29/145 nhân sự:

| Trường | Vai trò |
|---|---|
| Số thẻ KĐV | Định danh thẻ |
| Số QĐ cấp thẻ KĐV | Quyết định làm căn cứ cấp |
| Ngày QĐ cấp thẻ KĐV | Mốc bắt đầu hiệu lực |
| Ngày hết hạn thẻ KĐV | **Mốc hết hiệu lực — trường quyết định** |

Thẻ hết hạn là điều kiện **chặn**: người hết thẻ không còn được ký kết quả kiểm định trong lĩnh vực tương ứng. Hiện chưa có cảnh báo tự động trước hạn — xem khoảng cách K5 tại `DataModel.md`.

**Nhãn cột "M4-TT24" cần LĐP xác nhận.** Nhãn này do ManLab đặt, hiểu là *Mẫu 4* của Thông tư 24/2013/TT-BKHCN. Cần xác nhận hai điều: (a) đúng là Mẫu 4 chứ không phải mẫu khác; (b) Thông tư 54/2025/TT-BKHCN — đã được viện dẫn tại [`ETV.P11`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P11_BaoCao.md) cùng với TT 24/2013 — có thay thế phần quy định về kiểm định viên hay không. Nếu có, nhãn cột phải đổi theo. **Không suy đoán thay LĐP.**

## 4. Ma trận năng lực đầy đủ — chưa lập

Bảng *chức danh/nhân sự × phép đo – phương pháp – thiết bị được ủy quyền thực hiện/ký* mà [`README.md`](README.md) §1 mô tả **chưa tồn tại**. File này mới dựng xong một trục (lĩnh vực). Ba trục còn lại — phép đo, phương pháp, thiết bị — nằm ở [`06/09_Methods`](../09_Methods), [`06/07_Equipment`](../07_Equipment) và các thủ tục MP08/MP05, đều chưa có danh mục.

Khi lập ma trận đầy đủ, **phần "ai được ủy quyền gì" vẫn không đặt trong repo** — đó là bản ghi vận hành, có tên người, thuộc CSDL. Repo chỉ giữ các trục và quy tắc.

---

## 5. Liên kết

| Cần gì | Đi đâu |
|---|---|
| Danh mục chức danh | [`DanhMuc_ChucDanh.md`](DanhMuc_ChucDanh.md) |
| Bảng ký hiệu lĩnh vực | [`ETV.P14` §6.2](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P14_KiemSoatTaiLieu.md) |
| Yêu cầu năng lực từng vị trí | [`ETV.QM` §6.2](../../03_MANAGEMENT_SYSTEM/01_QM/ETV.QM_QuanlyChatluong.md) |
| Thủ tục phương pháp (ủy quyền thực hiện phép đo) | [`ETV.P08_PhuongPhap`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P08_PhuongPhap.md) |
| Công bố năng lực ra bên ngoài | [`MP21_CongBoNangLuc`](../../04_PROCESS_LIBRARY/MP21_CongBoNangLuc) |
