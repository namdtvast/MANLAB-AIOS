# 03_M — Method / Process / Work Instruction

Quy trình kỹ thuật, phương pháp, hướng dẫn công việc (SOP), quy trình hiệu chuẩn, quy trình kiểm định, quy trình thử nghiệm.

## **Nguyên tắc đặt tên thư mục con**

Mỗi loại dịch vụ có một thư mục con riêng, đặt tên theo mã hiệu:

`ETV` (tên tổ chức) + `M` (Method — phương pháp/quy trình) + mã dịch vụ

| Mã dịch vụ | Thư mục | Ý nghĩa |
|---|---|---|
| `C` | `ETV.MC_HieuChuan` | Quy trình hiệu chuẩn |
| `T` | `ETV.MT_ThuNghiem` | Quy trình thử nghiệm |
| `V` | `ETV.MV_KiemDinh` | Quy trình kiểm định |
| `P` | `ETV.MP_PhaCheCheTao` | Quy trình Pha chế — Chế tạo |
| `RA` | `ETV.MRA_QuanTracDoiChung` | Quy trình quan trắc đối chứng |
| `SMo` | `ETV.MSMo_DanhGiaHeThongTram` | Quy trình đánh giá hệ thống trạm |
| `H` | `ETV.MH_KiemDinhAnToan` | Quy trình kiểm định an toàn và tính năng kỹ thuật |
| `M` | `ETV.MM_ThaoTacChuan` | Quy trình thao tác chuẩn |

**Mã số văn bản bên trong mỗi thư mục** đi thêm 1 chữ cái lĩnh vực đo (vd. `L`=Chiều dài, `M`=Khối lượng, `F`=Lưu lượng, `T`=Nhiệt độ, `P`=Áp suất...) + số thứ tự, vd. `ETV.MCL 04` = **M**ethod + **C**alibration + **L**ength + số 04, nằm trong thư mục `ETV.MC_HieuChuan/`. Biểu mẫu/phụ lục đi kèm dùng mã `ETV.M{dịch vụ}{lĩnh vực}.F{số}.{yy}` (vd. `ETV.MCL.F04.01`).

## **Danh mục phương pháp hiện có**

| Thư mục | Nội dung |
|---|---|
| [`ETV.MC_HieuChuan/`](ETV.MC_HieuChuan/) | Quy trình hiệu chuẩn — hiện có `ETV.MCL.04` (Phương tiện đo định vị vệ tinh GNSS/GPS cầm tay) và 4 biểu mẫu/phụ lục đi kèm (F04.01–F04.04) |

Các mã dịch vụ còn lại (`ETV.MT_...`, `ETV.MV_...`, `ETV.MP_...`, `ETV.MRA_...`, `ETV.MSMo_...`, `ETV.MH_...`, `ETV.MM_...`) chưa có nội dung — tạo thư mục tương ứng khi bắt đầu chuyển đổi/soạn thảo tài liệu thuộc dịch vụ đó.

**Ghi chú:** Danh mục phương pháp cấp cao (tên phương pháp, không phải nội dung quy trình đầy đủ) được quản lý tại `06_SHARED_RESOURCES/09_Methods/`.
**Lưu ý:** `05_MODULE_LIBRARY/M*` hiện chỉ chứa các module quy trình quản lý (MP-track, vd. M14_TaiLieu, M17_XemXetLanhDao) — chưa có module theo lĩnh vực hiệu chuẩn/thử nghiệm/kiểm định. Nội dung quy trình kỹ thuật (M-track) nằm trực tiếp trong `03_M/` theo cấu trúc ở trên.
