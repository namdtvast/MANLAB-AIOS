# M33_HeThongTT — Quản lý hệ thống thông tin

| Đặc tả | Mô tả |
|---|---|
| Số hóa quy trình | MP33 — Thủ tục `ETV.P33` **dự thảo lần BH 01, Chờ soát xét** (kèm biểu mẫu `ETV.P.F 33.01`–`33.04` cùng trạng thái). Căn cứ đã ban hành: Sổ tay chất lượng §10.2, ETV.P28 mục 5.7/5.9, ETV.P35 mục 2.3 |
| Đối tượng dữ liệu chính | Tài sản CNTT · Kế hoạch bảo trì năm · Bảo trì – vá lỗi · Tài khoản hệ thống · Kỳ đối chiếu tài khoản · Sự cố và yêu cầu hỗ trợ |
| Trạng thái | Nháp → Chờ soát xét → Chờ phê duyệt → Đang vận hành → Tạm ngừng → Ngừng vận hành → Đã thanh lý |
| Vai trò | QTHT (quản trị, thực thi) · PT.ATTT (soát xét cấu hình an toàn) · TP (đơn vị sử dụng, nghiệm thu bảo trì) · VP (chủ trì, tổng hợp) · QLCL (hồ sơ, KPH) · LĐV (phê duyệt, thanh lý) |
| Phạm vi | **Hạ tầng CNTT**: máy chủ, mạng, thiết bị đầu cuối, phần mềm – bản quyền, dịch vụ thuê ngoài, tài khoản người dùng (ETV.P35 mục 2.3 giao cho ETV.P33) |
| Liên thông | → M35 (`infra_ref`), M27 (`system_ref`), M28, M31, M10/M11, M13, M26, M01, M03, M17 · ← M28 (phiếu F28.04), M30 (F30.02), M27 (biên bản xóa dữ liệu), M06/M07, M03, M05, M08 |
| Nguyên tắc | Không phê duyệt quyền truy cập (M28 giữ) · không lưu bí mật xác thực · người nghiệm thu bảo trì ≠ người thực hiện · không thiết bị nào rời Viện khi chưa xóa dữ liệu an toàn · mã tài sản không bao giờ cấp lại |
| Triển khai | **Chưa xây** — đã đủ tầng đặc tả (yêu cầu, API, dữ liệu, màn hình, đầu ra, bảng điều khiển, trạng thái); chờ `ETV.P33` được phê duyệt theo MP14 trước khi BUILD |
| Nhật ký | Mọi thao tác ghi vết; nhật ký module không thay thế nhật ký hệ thống (ETV.P28 mục 5.7.5) |

## Tầng đặc tả

| Thư mục | File | Nội dung |
|---|---|---|
| `01_Requirement` | `DacTa.md` | **Nguồn sự thật** — đối tượng dữ liệu, vai trò, danh mục chuẩn, 22 quy tắc nghiệp vụ, trạng thái, đầu ra, đối chiếu với `ETV.P33` |
| `02_API` | `API.md` | Endpoint và điều kiện chặn theo vai trò |
| `03_Database` | `DataModel.md` | Thực thể, quan hệ, ràng buộc |
| `04_UI` | `Screens.md` | 11 màn hình, quy ước hiển thị, 24 tiêu chí chấp nhận, NFR |
| `05_Report` | `Outputs.md` | Biểu mẫu xuất, báo cáo 06 tháng, thời hạn lưu hồ sơ |
| `06_Dashboard` | `Dashboard.md` | 14 chỉ số bám tám nội dung báo cáo ETV.P33 §6.9 |
| `07_Workflow` | `StateMachine.md` | Bảng trạng thái và thẩm quyền thao tác |
| `08_Source` | *(trống)* | Chưa xây |
