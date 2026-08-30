# 01 — Forms (Biểu mẫu gốc)

> **Một câu:** bản trắng của mọi biểu mẫu `ETV.P.Fxx.yy` — chưa điền, chưa ký, ai cần thì lấy về dùng.

**Hiện có:** 132 biểu mẫu. Đây là **nơi duy nhất** giữ bản gốc; `03_MANAGEMENT_SYSTEM/04_F` chỉ là chỉ mục xếp theo thủ tục để tra nhanh.

## Lưu gì ở đây

| Loại | Ví dụ |
|---|---|
| Biểu mẫu thuộc một thủ tục ETV.Pxx | `ETV.P.F03.08_DanhSachNhanSu.md`, `ETV.P.F05.02_PhieuTheoDoiThietBi.md` |
| Biểu mẫu nhiều lần (`.1`, `.2`…) | `ETV.P.F03.05.1_ChuongTrinhDaoTao.md` |

**Đặt tên:** `ETV.P.F<số thủ tục>.<số biểu mẫu>_TenKhongDau.md` — số thủ tục phải khớp `ETV.Pxx` đã ban hành.

## Không lưu ở đây

| Thứ này | Về đâu | Vì sao |
|---|---|---|
| Bản **đã điền, đã ký, có ngày** | [`11_COMPLIANCE/03_Evidence`](../../11_COMPLIANCE/03_Evidence) | Đó là hồ sơ — cấm sửa; biểu mẫu ở đây thì sửa được |
| Mẫu trình bày không có mã F (công văn, slide, báo cáo) | [`02_Templates`](../02_Templates) | Không gắn với thủ tục nào |
| Dữ liệu người dùng nhập trên phần mềm | CSDL của module `Mxx` | Thay đổi hằng ngày, cần phân quyền |

## Phép thử nhanh

> File có **mã F**, có **ô trống chờ điền**, và **chưa có tên ai** trên đó? → để ở đây. Có tên người và chữ ký → là hồ sơ, không để ở đây.

**Lưu ý:** Sửa biểu mẫu gốc = mọi thủ tục dùng lại nó cập nhật theo. Đừng copy biểu mẫu sang thư mục khác.
