# 04 — Master Data (Dữ liệu chủ)

> **Một câu:** bộ mã dùng chung của cả Viện — mã nào nghĩa là gì, để mọi module và mọi tài liệu gọi cùng một tên cho cùng một thứ.

**Hiện có:** chưa có file danh mục — mục dưới mô tả những gì sẽ đưa vào; phần *Chủ thể (Party)* bên dưới là **ràng buộc kiến trúc đang có hiệu lực**.

## Lưu gì ở đây

| Loại | Ví dụ |
|---|---|
| Quy ước mã hoá dùng chung | mã đơn vị/phòng ban, mã lĩnh vực đo, mã loại tài liệu |
| Danh mục giá trị hợp lệ (bảng mã tra cứu) | loại chủ thể, loại vai trò, loại hợp đồng, trạng thái hồ sơ |
| Quy tắc sinh mã | cấu trúc mã chứng chỉ, mã hồ sơ, mã thiết bị |

**Dữ liệu chủ ≠ bản ghi chủ.** Ở đây là **quy ước** (mã `KH` nghĩa là khách hàng, mã sinh theo cấu trúc nào). Còn **bản ghi thật** (Công ty A, mã KH-0007) sống trong CSDL — bảng `M34Party`, `M34PartyRole`.

## Không lưu ở đây

| Thứ này | Về đâu |
|---|---|
| Danh sách khách hàng / thiết bị / nhân sự cụ thể | [`06_Customers`](../06_Customers) · [`07_Equipment`](../07_Equipment) · [`08_Personnel`](../08_Personnel) (danh mục) và CSDL (bản ghi) |
| Bảng tra kỹ thuật, hằng số | [`03_Reference_Data`](../03_Reference_Data) |
| Dữ liệu phát sinh khi vận hành | CSDL của module `Mxx` |

## Phép thử nhanh

> Đây là **quy ước đặt tên/đặt mã** mà nhiều module phải theo? → để ở đây. Là **một dòng dữ liệu cụ thể**? → CSDL.

---

## Dữ liệu chủ về Chủ thể (Party)

Khách hàng, khách hàng tiềm năng, nhà cung cấp, bên ngoài cung cấp, cơ sở được đánh giá, đối tác,
chuyên gia, nhân sự, cơ quan quản lý và bên quan tâm là **cùng một loại dữ liệu chủ: Chủ thể
(Party)**, mang nhiều **vai trò (Party Role)** theo thời gian.

> **Module không được tự tạo master khách hàng / nhà cung cấp / cơ sở / đối tác / chuyên gia.**
> Mọi module tham chiếu `m34_party_role`. Đây là ràng buộc bắt buộc, không phải khuyến nghị.

- Chuẩn kiến trúc: [`09_ENGINEERING/05_Database/MasterData_ChuThe_VaiTro.md`](../../09_ENGINEERING/05_Database/MasterData_ChuThe_VaiTro.md)
- Nguyên tắc tóm tắt: [`01_ENTERPRISE/09_Architecture.md` §9.2.1](../../01_ENTERPRISE/09_Architecture.md)
- Thủ tục sở hữu: [`MP34_DuLieuSo`](../../04_PROCESS_LIBRARY/MP34_DuLieuSo)

**Lưu ý thuật ngữ:** `CRM` trong repo này luôn là **mẫu chuẩn được chứng nhận** (CAP-12, MP19,
MP23). Quản lý quan hệ khách hàng viết là **QLKH**.
