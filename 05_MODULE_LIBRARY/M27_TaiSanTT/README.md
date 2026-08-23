# M27_TaiSanTT — Quản trị dữ liệu và tài sản thông tin

| Đặc tả | Mô tả |
|---|---|
| Số hóa quy trình | MP27 (Thủ tục `ETV.P27` **chưa ban hành** — căn cứ hiện có: Sổ tay chất lượng §9.4, §7.11 và `ETV.P02` §6.8–§6.10) |
| Đối tượng dữ liệu chính | Tài sản thông tin · Quy tắc xử lý theo mức phân loại · Chia sẻ dữ liệu · Biên bản hủy |
| Trạng thái | Nháp → Chờ soát xét → Chờ phê duyệt → Đang sử dụng → Ngừng sử dụng → Đã hủy |
| Vai trò | TP (chủ sở hữu tài sản) · QT hệ thống (quản lý kỹ thuật) · Phụ trách ATTT (soát xét) · LĐV (phê duyệt) · QLCL (danh mục, hồ sơ) |
| Liên thông | → M28 (đầu vào rủi ro ATTT), M31, M26/M14/M15/M34 (kế thừa thang phân loại) · ← M33, M15, M14, M02, M03 |
| Nguyên tắc | **Nguồn chuẩn duy nhất của thang phân loại thông tin**; kiểm kê chứ không lưu dữ liệu thật; bản ghi kiểm kê không bao giờ bị xóa |
| Triển khai | **Chưa xây** — mới có đặc tả (`01_Requirement/DacTa.md`) |
| Nhật ký | Mọi thao tác ghi vết: ai, khi nào, nội dung, lý do; tài sản Hạn chế/Mật ghi cả lượt truy cập |
