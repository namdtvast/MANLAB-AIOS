# 04 — Master Data

**Ý nghĩa:** Dữ liệu chủ mã hóa dùng chung

**Lưu file gì ở đây:**
- Các file: dữ liệu chủ mã hóa dùng chung

**KHÔNG lưu ở đây:**
- Hồ sơ đã điền/đã phát hành (→11)
- Dữ liệu giao dịch thật (→CSDL/ManLab)

**Lưu ý:** Sửa một chỗ → mọi nơi dùng lại cập nhật. Đây là lý do tránh nhân bản.

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
