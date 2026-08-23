# M35_NenTangSo — Quản lý nền tảng số

| Đặc tả | Mô tả |
|---|---|
| Số hóa quy trình | MP35 — `ETV.P35`, ban hành lần 01 ngày 24/08/2026 |
| Đối tượng dữ liệu chính | `AIPlatform` (bản ghi nền tảng) + điểm tích hợp · đánh giá trước vận hành · ngoại lệ · kiểm tra sức khỏe · sự cố · thay đổi · ngừng vận hành |
| Vòng đời hồ sơ | Nháp → Chờ soát xét → Chờ phê duyệt → Đã phê duyệt → **Hiệu lực** → Hết hiệu lực/Hủy |
| Tình trạng vận hành | HEALTHY · DEGRADED · DOWN · UNKNOWN — **tách khỏi** vòng đời phê duyệt |
| Vai trò | LĐV (phê duyệt) · QLCL (quản trị danh mục) · CSH (chủ sở hữu) · ĐMKT (đầu mối kỹ thuật) · QTHT |
| Biểu mẫu | F35.01 Danh mục · F35.02 Đánh giá trước vận hành · F35.03 Sự cố và giám sát · F35.04 Ngừng vận hành |
| Nhật ký | Mọi thao tác ghi vết vào `AIAuditLog` (schema chung M29): ai, khi nào, giá trị trước/sau |

M35 là **sổ đăng ký nền tảng**, không phải kho cấu hình — nghiêm cấm lưu mật khẩu, khóa API, chứng
chỉ số trong bản ghi. Đồng thời là **nền cho mọi bộ lọc** của trang quản trị AI M29.

Chi tiết: [DacTa.md](01_Requirement/DacTa.md) · [API.md](02_API/API.md) ·
[DataModel.md](03_Database/DataModel.md) · [StateMachine.md](07_Workflow/StateMachine.md) ·
[Outputs.md](05_Report/Outputs.md)
