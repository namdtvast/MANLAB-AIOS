# M33_HeThongTT — Đầu ra

> Nguồn sự thật: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md) mục 7.

| Đầu ra | Định dạng | Ghi chú |
|---|---|---|
| F33.01 — Danh mục tài sản công nghệ thông tin | PDF/Excel | Theo lớp tài sản, vùng mạng, môi trường, mức trọng yếu, chủ quản trị |
| F33.02 — Kế hoạch và hồ sơ bảo trì hệ thống | PDF/Excel | Kế hoạch năm và kết quả thực hiện, kèm bằng chứng |
| F33.03 — Danh mục tài khoản hệ thống | PDF/Excel | Tài khoản theo hệ thống, loại, MFA, phiếu M28 tương ứng |
| F33.04 — Phiếu sự cố và yêu cầu hỗ trợ CNTT | PDF | Sự cố, mức ảnh hưởng, xử lý, định tuyến sang M28/M35/M10 |
| Báo cáo kiểm kê tài sản hợp nhất (M33 + M27) | PDF/Excel | Phục vụ ISO/IEC 27001 A.5.9 — quy tắc R2 |
| Bảng đối chiếu tài khoản thực tế ↔ phiếu M28 | Màn hình/PDF | Tài khoản không phiếu · phiếu không tài khoản · quá hạn hiệu lực · đặc quyền thiếu MFA |
| Bảng đến hạn: rà soát · bảo trì · vá lỗi · bản quyền–bảo hành–EOL | Màn hình | Tính khi đọc |
| Trích xuất hạ tầng trọng yếu và RTO cho M31 | Dữ liệu/PDF | Đầu vào kế hoạch liên tục hoạt động |
| Trích xuất tình hình hạ tầng cho M17 | Dữ liệu/PDF | Sự cố lớn, mức sẵn sàng, hạ tầng EOL, nhu cầu thay thế |

> **Bốn biểu mẫu F33.01–F33.04 chưa được ban hành** — phải soạn và ban hành theo MP14 trước khi bản
> xuất được dùng làm hồ sơ chính thức. Việc phê duyệt quyền truy cập vẫn dùng **F28.04** của
> `ETV.P28`, không lập biểu mẫu trùng.

## Hỗ trợ AI (← M29, có kiểm soát)

AI được phép *phát hiện* tài sản chưa kiểm kê hoặc tài khoản không có phiếu, *nhắc* hạn bảo trì – vá
lỗi – bản quyền – EOL, *gợi ý* phân loại và định tuyến sự cố. AI **không** tự phê duyệt danh mục,
**không** tự thực hiện thay đổi cấu hình, **không** kết luận sự cố an toàn thông tin (ISO/IEC 42001;
`ETV.P29`).
