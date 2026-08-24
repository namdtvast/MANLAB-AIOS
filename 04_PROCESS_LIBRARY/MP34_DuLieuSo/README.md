# MP34_DuLieuSo — Quản lý dữ liệu số

| Thuộc tính | Giá trị |
|---|---|
| Mã quy trình | MP34 |
| Tên gọi ngắn | DuLieuSo |
| Điều khoản/căn cứ | ISO/IEC 27001; ISO/IEC 42001; Nghị định 13/2023/NĐ-CP |
| Năng lực liên quan | CAP-28 |
| Module số hóa | M34_DuLieuSo |
| Chủ sở hữu | Phụ trách Quản lý chất lượng (QLCL) |

**Dữ liệu chủ Chủ thể (Party):** MP34 là thủ tục sở hữu chuẩn dữ liệu chủ về chủ thể — định danh,
vai trò, quan hệ, địa điểm, người liên hệ, bản chụp giao dịch, khử trùng và gộp chủ thể. Chuẩn chi
tiết: [`09_ENGINEERING/05_Database/MasterData_ChuThe_VaiTro.md`](../../09_ENGINEERING/05_Database/MasterData_ChuThe_VaiTro.md).
Mọi module tham chiếu `m34_party_role`, **không tự tạo master khách hàng / NCC / cơ sở / đối tác /
chuyên gia**.

**Ranh giới:** MP34 quản lý *dữ liệu số và dữ liệu chủ*. Việc sử dụng chủ thể trong nghiệp vụ thuộc
về từng thủ tục: khách hàng và hợp đồng → MP07 · bên ngoài cung cấp → MP06 · nhân sự và chuyên gia →
MP03 · khiếu nại → MP12 · bảo mật thông tin khách hàng → MP02 · bên quan tâm và tính khách quan →
MP25 · phân loại và bảo vệ dữ liệu → MP27/MP28 · nền tảng và phân quyền → MP33/MP35 · API và hợp
đồng dữ liệu → MP37 · ràng buộc AI → MP29.

> Hub không chứa nội dung quy trình. Xem `links.yaml`.
