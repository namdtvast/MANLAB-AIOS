# MP34_DuLieuSo — Quản lý dữ liệu số

| Thuộc tính | Giá trị |
|---|---|
| Mã quy trình | MP34 |
| Tên gọi ngắn | DuLieuSo |
| Thủ tục ban hành | `ETV.P34` — Thủ tục Quản lý dữ liệu số (lần BH 01, chờ soát xét) |
| Điều khoản/căn cứ | ISO/IEC 17025 §7.5, §7.11 · ISO 17034 §7.4 · ISO 9001 §7.5 · ISO/IEC 27001 A.5.12–A.5.14, A.5.33, A.8.10–A.8.12 · ISO/IEC 42001 §7.4 · ETV.QM §10.3 |
| Năng lực liên quan | CAP-28 |
| Module số hóa | M34_DuLieuSo |
| Chủ sở hữu | Phụ trách Quản lý chất lượng (QLCL) |
| Biểu mẫu | F34.01 Danh mục dữ liệu số và từ điển dữ liệu · F34.02 Phiếu đo chất lượng và hiệu chỉnh dữ liệu · F34.03 Phiếu yêu cầu khai thác, chia sẻ dữ liệu |

**Nguyên tắc cốt lõi:** một nguồn sự thật · **dữ liệu gốc không bị sửa đè** (hiệu chỉnh bằng bản ghi mới, giữ nguyên giá trị cũ) · chất lượng dữ liệu phải **đo được**, không khẳng định suông.

**Phân biệt với thủ tục lân cận:** ETV.P27 — *có tài sản dữ liệu nào, sao lưu và huỷ ra sao* · **ETV.P34 — *dữ liệu có đúng không, ai được dùng, sống bao lâu*** · ETV.P28 — *bảo vệ bằng biện pháp gì* · ETV.P33 — *nằm trên thiết bị nào* · ETV.P37 — *chảy giữa các hệ thống thế nào*. Ranh giới này do ETV.P35 mục 2.3 (đã ban hành) xác lập.

**Dữ liệu chủ Chủ thể (Party):** nhóm dữ liệu chủ "danh mục khách hàng" (ETV.P34 §2.1 nhóm 3) được
chuẩn hóa thành mô hình **Chủ thể – Vai trò**: một tổ chức hoặc cá nhân chỉ có một định danh gốc, mang
nhiều vai trò (khách hàng, nhà cung cấp, bên ngoài cung cấp, cơ sở được đánh giá, chuyên gia, nhân sự,
bên quan tâm...). Lược đồ, danh mục vai trò, quy tắc khử trùng và gộp:
[`09_ENGINEERING/05_Database/MasterData_ChuThe_VaiTro.md`](../../09_ENGINEERING/05_Database/MasterData_ChuThe_VaiTro.md).
Mọi module tham chiếu `m34_party_role`, **không tự tạo master khách hàng / NCC / cơ sở / đối tác /
chuyên gia** — đây là áp dụng Nguyên tắc 1 (một nguồn sự thật) của ETV.P34 §2.2.

> Hub không chứa nội dung quy trình. Xem `links.yaml`.
