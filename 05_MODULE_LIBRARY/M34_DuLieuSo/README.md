# M34_DuLieuSo — Quản lý dữ liệu số

| Đặc tả | Mô tả |
|---|---|
| Số hóa quy trình | MP34 — Thủ tục `ETV.P34` **dự thảo lần BH 01, Chờ soát xét** (25/08/2026, kèm biểu mẫu `ETV.P.F 34.01`–`34.03` cùng trạng thái). Căn cứ đã ban hành: Sổ tay chất lượng §10.3, `ETV.P35` mục 2.3 (ranh giới), `ETV.P28`, `ETV.P26` mục 5.5 |
| Đối tượng dữ liệu chính | Tập dữ liệu (danh mục) · Từ điển dữ liệu theo phiên bản · Dữ liệu chủ – nguồn sự thật duy nhất · Bảng tra song song · Kỳ đo chất lượng sáu chiều · Hiệu chỉnh dữ liệu · Phiếu khai thác – chia sẻ · Hồ sơ dữ liệu cho AI |
| Trạng thái | Nháp → Chờ soát xét → Chờ phê duyệt → Hiệu lực (Hoạt động) → Lưu trữ → Đề nghị hủy → Đã hủy (bản ghi vẫn giữ) · nhánh trả lại/hủy bản ghi |
| Vai trò | CSHDL (sở hữu, phê duyệt) · QTDL (quản trị nghiệp vụ) · QLCL (danh mục, KPH, báo cáo) · PT.ATTT (phân loại, chia sẻ, ẩn danh) · QTHT (thao tác kỹ thuật) · TP · NTH · LĐV (4 thẩm quyền không ủy quyền) |
| Phạm vi | **Nội dung dữ liệu số**: đúng không, ai được dùng, dùng thế nào, sống bao lâu (`ETV.P35` mục 2.3 giao cho ETV.P34) — phân biệt với M27 (tài sản, sao lưu, hủy kỹ thuật), M28 (bảo vệ, quyền), M33 (thiết bị), M35 (nền tảng) |
| Liên thông | → M10/M11 (chặn hiệu chỉnh chưa kết luận, dừng dùng dữ liệu), M36 (lineage cho chứng chỉ số), M37 (điểm tích hợp), M13 (KPH), M15, M17, M29 · ← M28 (phân loại, quyền), M27 (tài sản, biên bản hủy), M30 (F30.02 đổi cấu trúc), M33/M35 (nơi lưu), M29 (AIA), M37 (sự cố đồng bộ) |
| Nguyên tắc | Một nguồn sự thật · dữ liệu gốc không sửa đè · chất lượng phải đo được (3 nguyên tắc `ETV.P34` §2.2) · bản ghi mô tả không chứa dữ liệu · Hạn chế/Mật không vào AI · hủy cần 2 chữ ký |
| Triển khai | **Chưa xây** — đã đủ tầng đặc tả (yêu cầu, API, dữ liệu, màn hình, đầu ra, bảng điều khiển, trạng thái); chờ `ETV.P34` được phê duyệt theo MP14 trước khi BUILD |
| Nhật ký | Mọi thao tác ghi vết append-only; nhật ký thao tác trên dữ liệu không sửa được, lưu theo `ETV.P28` mục 5.7.5 |

## Tầng đặc tả

| Thư mục | File | Nội dung |
|---|---|---|
| `01_Requirement` | `DacTa.md` | **Nguồn sự thật** — đối tượng dữ liệu, vai trò, danh mục chuẩn, 22 quy tắc nghiệp vụ, trạng thái, đầu ra, đối chiếu với `ETV.P34` |
| `02_API` | `API.md` | Endpoint và điều kiện chặn theo vai trò |
| `03_Database` | `DataModel.md` | Thực thể, quan hệ, ràng buộc, chỉ mục cho cờ tính-khi-đọc |
| `04_UI` | `Screens.md` | 10 màn hình, quy ước hiển thị, 25 tiêu chí chấp nhận, NFR |
| `05_Report` | `Outputs.md` | Biểu mẫu xuất, báo cáo 06 tháng, thời hạn lưu hồ sơ |
| `06_Dashboard` | `Dashboard.md` | 13 chỉ số bám bảy nội dung báo cáo `ETV.P34` §6.9 |
| `07_Workflow` | `StateMachine.md` | Bảng trạng thái và thẩm quyền thao tác |
| `08_Source` | *(trống)* | Chưa xây |
