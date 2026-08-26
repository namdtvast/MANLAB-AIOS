# M28_ATTT — Quản lý an toàn thông tin

| Đặc tả | Mô tả |
|---|---|
| Số hóa quy trình | **MP28** — `ETV.P28`, ban hành lần 02 ngày 26/08/2026 |
| Nguồn sự thật | [`01_Requirement/DacTa.md`](01_Requirement/DacTa.md) |
| Đối tượng dữ liệu chính | `SecurityRisk` + `RiskTreatment` (rủi ro & RTP) · `SoAVersion` + `SoAControl` (Tuyên bố áp dụng, 93 kiểm soát) · `SecurityIncident` (sự cố) · `AccessRequest` + `AccessReview` (quyền truy cập) |
| Biểu mẫu | ETV.P.F28.01 (rủi ro + RTP) · F28.02 (SoA) · F28.03 (sự cố) · F28.04 (quyền truy cập) |
| Trạng thái rủi ro | Nháp → Chờ soát xét → Chờ phê duyệt → Đang xử lý → Đã xử lý → Chấp nhận rủi ro tồn dư / Hết hiệu lực |
| Trạng thái sự cố | Mới → Đang khống chế → Đang điều tra → Đang khắc phục → Chờ kết luận → Đã đóng / Hủy |
| Vai trò | LĐV · PT.ATTT · QLCL · QTHT · TP · Nhân viên |
| Nhật ký | Mọi thao tác ghi vết: ai, khi nào, nội dung; lượt xem bản ghi Hạn chế/Mật cũng ghi nhật ký |
| Trạng thái triển khai | **Chưa xây** — `08_Source/` trống, chưa có trên `aios-platform` |

**Ranh giới:** M28 là *hệ thống quản lý* ATTT, không phải công cụ kỹ thuật — không quét lỗ hổng,
không thu thập nhật ký hệ thống. Cam kết bảo mật và quan hệ khách hàng thuộc **M02**; kiểm kê tài
sản, sao lưu, vòng đời dữ liệu thuộc **M27**; kế hoạch liên tục hoạt động thuộc **M31**; hồ sơ AIA
thuộc **M29**; kết luận về hiệu lực kết quả đo thuộc **M10/M11**.
