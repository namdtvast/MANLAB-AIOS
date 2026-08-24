# M33_HeThongTT — Quản lý hệ thống thông tin

| Đặc tả | Mô tả |
|---|---|
| Số hóa quy trình | MP33 (Thủ tục `ETV.P33` **chưa ban hành** — căn cứ hiện có: Sổ tay chất lượng §10.2, `ETV.P28` mục 5.7/5.9, `ETV.P35` mục 1.4) |
| Đối tượng dữ liệu chính | Tài sản CNTT · Bảo trì – vá lỗi · Tài khoản hệ thống · Sự cố và yêu cầu hỗ trợ |
| Trạng thái | Nháp → Chờ soát xét → Chờ phê duyệt → Đang vận hành → Tạm ngừng → Ngừng vận hành → Đã thanh lý |
| Vai trò | QTHT (quản trị, thực thi) · PT.ATTT (soát xét cấu hình an toàn) · TP (đơn vị sử dụng) · LĐV (phê duyệt, thanh lý) |
| Phạm vi | **Hạ tầng CNTT**: máy chủ, mạng, thiết bị đầu cuối, phần mềm – bản quyền, dịch vụ thuê ngoài, tài khoản người dùng (`ETV.P35` mục 1.4 giao cho MP33) |
| Liên thông | → M35 (`infra_ref`), M27 (`system_ref`), M28, M31, M10, M13, M01 · ← M28 (phiếu quyền), M30 (thay đổi), M27 (biên bản xóa dữ liệu), M06/M07, M03, M05 |
| Nguyên tắc | Không phê duyệt quyền truy cập (M28 giữ) · không lưu bí mật xác thực · không thiết bị nào rời Viện khi chưa xóa dữ liệu an toàn |
| Triển khai | **Chưa xây** — mới có đặc tả (`01_Requirement/DacTa.md`) |
| Nhật ký | Mọi thao tác ghi vết; nhật ký module không thay thế nhật ký hệ thống (`ETV.P28` mục 5.7.5) |
