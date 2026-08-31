# Danh mục chức danh / vị trí việc làm

> **Một câu:** danh sách các chức danh đang tồn tại thật ở Viện, để bảng RACI trong thủ tục, phân quyền module và ô ký tài liệu đều gọi cùng một tên cho cùng một vị trí.

**Nguồn đối chiếu:** bản kết xuất `vw_tb_qlManLab_NhanSu` ngày 31/08/2026 (145 bản ghi) — chỉ rút **tập giá trị chức danh**, không rút tên người. Bản kết xuất không lưu vào repo (xem [`README.md`](README.md) §2.2).

**Không chép yêu cầu năng lực vào đây.** Bằng cấp, kinh nghiệm, chuyên ngành của từng vị trí quy định tại [`ETV.QM` §6.2](../../03_MANAGEMENT_SYSTEM/01_QM/ETV.QM_QuanlyChatluong.md) — bảng dưới chỉ dẫn chiếu.

---

## 1. Chức danh quản lý và điều hành

| Chức danh | Viết tắt vai trò |
|---|---|
| Chủ tịch Hội đồng Quản lý | — |
| Phó Chủ tịch Hội đồng Quản lý | — |
| Chủ tịch Hội đồng Sáng lập | — |
| Viện trưởng | **LĐV** — Lãnh đạo Viện |
| Chánh Văn phòng | **LĐP** — Lãnh đạo Phòng/bộ phận |
| Phó Chánh Văn phòng | LĐP |
| Trưởng phòng | LĐP; riêng Trưởng phòng Đo lường Chất lượng viết tắt là **TP** |
| Phó Trưởng phòng | LĐP |

**Hai bộ viết tắt đang song song — không được trộn.** [`ETV.P14` §V](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P14_KiemSoatTaiLieu.md) định nghĩa `LĐP = Lãnh đạo Phòng/bộ phận` và dùng LĐP xuyên suốt. [`ETV.P03` §IV](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P03_NhanSu.md) **không dùng LĐP**, mà dùng `TP = Trưởng phòng (Lãnh đạo PTN)` — nghĩa hẹp hơn, chỉ riêng Phòng Đo lường Chất lượng. Đọc RACI của thủ tục nào thì tra viết tắt tại mục *Thuật ngữ, định nghĩa và chữ viết tắt* của chính thủ tục đó — hai thủ tục đánh số mục này khác nhau (P03 là IV, P14 là V).

## 2. Vai trò trong hệ thống quản lý

| Chức danh | Viết tắt vai trò |
|---|---|
| Quản lý Chất lượng (QM) | **QLCL** |
| Quản lý Kỹ thuật (TM) | **QLKT** |
| Người hướng dẫn | **Người hướng dẫn** (`ETV.P03` §V) |
| Văn phòng *(với tư cách đầu mối thủ tục)* | **VP** |

QLCL và QLKT là **vai trò được bổ nhiệm**, không phải bậc lương — một người có thể vừa là Trưởng phòng vừa là QLKT. Vì vậy chúng không nằm cùng thang với ngạch nhân viên ở mục 3.

## 3. Ngạch nhân viên theo thâm niên

| Chức danh | Ý nghĩa |
|---|---|
| Nhân viên 1 (thực tập) | Thực tập sinh |
| Nhân viên 2 (thử việc) | Đang thử việc |
| Nhân viên 3 (mới) | Đã qua thử việc |
| Nhân viên 4 (2y) | Từ 2 năm công tác |
| Nhân viên 5 (4y) | Từ 4 năm công tác |

Thang này gắn với thời gian công tác, không gắn với năng lực kỹ thuật. **Năng lực được phép thực hiện phép đo nào** là trục riêng — xem [`MaTranNangLuc_LinhVucKiemDinh.md`](MaTranNangLuc_LinhVucKiemDinh.md).

## 4. Chức danh chuyên môn khác

| Chức danh |
|---|
| Kế toán trưởng |
| Kế toán nội bộ |
| Quản trị IT |

## 5. Quan hệ ngoài biên chế

| Giá trị | Ghi chú |
|---|---|
| Chuyên gia / Cộng tác viên | Nhóm đông nhất trong dữ liệu vận hành |
| Lao động phổ thông | Theo hợp đồng dịch vụ phổ thông |
| Cổ đông | Quan hệ sở hữu, không phải chức danh công việc |

---

## 6. Ba giá trị cần làm sạch

Bản kết xuất còn ba giá trị **không phải chức danh** nằm trong cùng cột:

| Giá trị | Thực chất | Xử lý đề nghị |
|---|---|---|
| `Đã nghĩ việc` | Trạng thái lao động (và sai chính tả — đúng là "nghỉ") | Chuyển sang trường trạng thái |
| `Không áp dụng` | Giá trị rỗng trá hình | Để trống |
| *(bỏ trống)* | 6/145 bản ghi | Bổ sung hoặc đánh dấu rõ là chưa xác định |

Ghi ở đây để lần làm sạch dữ liệu sau không phải phát hiện lại. Việc sửa dữ liệu thật thuộc Văn phòng trên ManLab, không làm trong repo.

---

## 7. Liên kết

| Cần gì | Đi đâu |
|---|---|
| Yêu cầu năng lực từng vị trí | [`ETV.QM` §6.2](../../03_MANAGEMENT_SYSTEM/01_QM/ETV.QM_QuanlyChatluong.md) |
| Cơ cấu tổ chức | [`01_ENTERPRISE/04_Organization.md`](../../01_ENTERPRISE/04_Organization.md) |
| Mã bộ phận, quy tắc mã nhân sự | [`06/04_Master_Data/MaBoPhan.md`](../04_Master_Data/MaBoPhan.md) |
| Ma trận năng lực theo lĩnh vực kiểm định | [`MaTranNangLuc_LinhVucKiemDinh.md`](MaTranNangLuc_LinhVucKiemDinh.md) |
| Thủ tục sở hữu nội dung nhân sự | [`ETV.P03_NhanSu`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P03_NhanSu.md) |
