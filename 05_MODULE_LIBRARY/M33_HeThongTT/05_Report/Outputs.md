# M33_HeThongTT — Đầu ra

> Nguồn sự thật: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md) mục 7. Chỉ số hiển thị
> liên tục của các báo cáo này ở [`../06_Dashboard/Dashboard.md`](../06_Dashboard/Dashboard.md).

| Đầu ra | Định dạng | Ghi chú |
|---|---|---|
| `ETV.P.F 33.01` — Danh mục tài sản công nghệ thông tin | PDF/Excel | Theo lớp tài sản, vùng mạng, môi trường, mức trọng yếu, chủ quản trị |
| `ETV.P.F 33.02` — Kế hoạch và hồ sơ bảo trì hệ thống | PDF/Excel | Kế hoạch năm đã được LĐV phê duyệt và kết quả thực hiện, kèm bằng chứng và người nghiệm thu |
| `ETV.P.F 33.03` — Danh mục tài khoản hệ thống | PDF/Excel | Tài khoản theo hệ thống, loại, MFA, phiếu F28.04 tương ứng, nơi lưu bí mật xác thực |
| `ETV.P.F 33.04` — Phiếu sự cố và yêu cầu hỗ trợ CNTT | PDF | Sự cố, mức ưu tiên, thời hạn phản hồi/xử lý, cách xử lý, định tuyến sang M28/M35/M10–M11/M31/M13 |
| Báo cáo kiểm kê tài sản hợp nhất (M33 + M27) | PDF/Excel | Phục vụ ISO/IEC 27001 A.5.9 — quy tắc R2 |
| **Báo cáo tình hình hệ thống thông tin 06 tháng/lần** | PDF | ETV.P33 §6.9 — tám nội dung bắt buộc, xem bên dưới |
| Hồ sơ kỳ đối chiếu tài khoản (`AccountReconciliation`) | PDF | Bốn nhóm bất thường, chốt kỳ là bất biến, lưu 05 năm — quy tắc R20 |
| Bảng đến hạn (7 nhóm) | Màn hình | Tính khi đọc |
| Trích xuất hạ tầng trọng yếu và RTO cho M31 | Dữ liệu/PDF | Đầu vào kế hoạch liên tục hoạt động |
| Trích xuất tình hình hạ tầng cho M17 | Dữ liệu/PDF | Sự cố lớn, mức sẵn sàng, hạ tầng EOL, nhu cầu thay thế |

## Báo cáo 06 tháng — tám nội dung bắt buộc (ETV.P33 §6.9)

1. Tổng số tài sản theo lớp, môi trường, vùng mạng và mức trọng yếu.
2. Tài sản đến hạn/quá hạn rà soát và bảo trì.
3. Tình hình vá lỗi bảo mật, **nêu riêng các lỗ hổng mức Nghiêm trọng quá hạn**.
4. Thống kê sự cố kỹ thuật theo mức và thời gian xử lý.
5. Kết quả đối chiếu tài khoản với phiếu đã phê duyệt.
6. Danh sách hạ tầng EOL và kế hoạch thay thế.
7. Tài sản phát hiện **chưa kiểm kê** trong kỳ.
8. Nhu cầu ngân sách thay thế, nâng cấp.

Báo cáo cũng được lập **trước mỗi cuộc họp xem xét của lãnh đạo** (`ETV.P17`).

## Trạng thái biểu mẫu và nguyên tắc không lập trùng

Bốn biểu mẫu `ETV.P.F 33.01`–`33.04` **đã có dự thảo** trong `06_SHARED_RESOURCES/01_Forms/`, trạng
thái `Chờ soát xét` cùng `ETV.P33` — chỉ dùng làm hồ sơ chính thức sau khi được **phê duyệt theo
MP14**. Không lập biểu mẫu mới cho các việc đã có nơi giữ (`ETV.P33` §VII):

| Việc | Biểu mẫu dùng | Của thủ tục |
|---|---|---|
| Phê duyệt quyền truy cập | `F28.04` | `ETV.P28` |
| Phiếu đề nghị thay đổi | `F30.02` | `ETV.P30` |
| Sự cố an toàn thông tin | `F28.03` | `ETV.P28` |
| Sự cố nền tảng số | `F35.03` | `ETV.P35` |
| Biên bản xóa, hủy dữ liệu | biểu mẫu của `ETV.P27` | `ETV.P27` |
| Hồ sơ mua sắm | bộ biểu mẫu của `ETV.P06` | `ETV.P06` |

## Lưu hồ sơ (`ETV.P33` §VIII, chi tiết theo `ETV.P15` và `ETV.P.F 14.06`)

| Hồ sơ | Người lưu | Thời hạn lưu đề xuất |
|---|---|---|
| Danh mục tài sản CNTT (F33.01) và các phiên bản | VP | **Vĩnh viễn** trên ManLab |
| Kế hoạch và hồ sơ bảo trì (F33.02) | QTHT, sao gửi VP | Vòng đời tài sản **+ 05 năm** |
| Danh mục tài khoản (F33.03) và kết quả đối chiếu định kỳ | QTHT | **05 năm** |
| Phiếu sự cố và yêu cầu hỗ trợ (F33.04) | QTHT | **05 năm** sau khi đóng |
| Biên bản bàn giao, thu hồi thiết bị | VP | Vòng đời tài sản **+ 02 năm** |
| Bằng chứng xóa dữ liệu an toàn trước thanh lý, chuyển giao | QTHT, sao gửi PT.ATTT | Theo `ETV.P27` |
| Hồ sơ phê duyệt ngoại lệ (BYOD, tài khoản dùng chung, hạ tầng EOL) | VP | **10 năm** |
| Nhật ký thay đổi cấu hình hệ thống | QTHT | Theo `ETV.P28` |
| Báo cáo tình hình hệ thống thông tin | VP | Theo `ETV.P17` |

## Hỗ trợ AI (← M29, có kiểm soát)

AI được phép *phát hiện* tài sản chưa kiểm kê hoặc tài khoản không có phiếu, *nhắc* hạn rà soát –
bảo trì – vá lỗi – bản quyền – bảo hành – EOL, *đối chiếu* tài khoản thực tế với phiếu và nêu bất
thường, *gợi ý* phân loại và định tuyến sự cố, *soạn dự thảo* báo cáo tình hình hạ tầng. AI **không**
phê duyệt danh mục, **không** phê duyệt hay thực hiện cấp/thu hồi quyền, **không** tự thực hiện thay
đổi cấu hình trên hệ thống vận hành, **không** kết luận sự cố an toàn thông tin và **không** kết luận
hiệu lực kết quả đo. Mọi tính năng AI phải có hồ sơ AIA theo MP29 (ISO/IEC 42001; `ETV.P29`;
ETV.P33 §6.8).
