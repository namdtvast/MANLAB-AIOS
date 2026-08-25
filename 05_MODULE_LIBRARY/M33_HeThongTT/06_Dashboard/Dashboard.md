# M33_HeThongTT — Bảng điều khiển

> Nguồn sự thật: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md) mục 7. Bộ chỉ số bám
> đúng tám nội dung báo cáo bắt buộc của `ETV.P33` §6.9 — bảng điều khiển là bản *xem liên tục* của
> chính báo cáo 06 tháng, không phải một bộ chỉ số song song.

## 1. Nguyên tắc

- Mọi chỉ số **tính khi đọc** từ bản ghi nghiệp vụ, không có bảng tổng hợp riêng — số trên bảng điều
  khiển và số trong báo cáo `ETV.P33` §6.9 **luôn là một**.
- Bảng điều khiển **không** là công cụ giám sát kỹ thuật: không có chỉ số CPU, băng thông, uptime đo
  bằng máy. M33 giữ **hồ sơ quản trị** (`ETV.P33` §2.2 Nguyên tắc 3) — số liệu sẵn sàng lấy từ phiếu
  sự cố, không từ hệ thống monitoring.
- Mỗi ô chỉ số dẫn thẳng tới danh sách bản ghi phía sau; không có con số nào không mở ra được.

## 2. Bộ chỉ số

| # | Chỉ số | Cách tính | Ngưỡng cảnh báo | Nội dung §6.9 |
|---|---|---|---|---|
| 1 | Tổng tài sản theo **lớp · môi trường · vùng mạng · mức trọng yếu** | Đếm `ITAsset` ở trạng thái Đang vận hành, cắt theo 4 chiều | — | (1) |
| 2 | Tiến độ **kiểm kê kỳ đầu** | Tỷ lệ tài sản đợt 1 (hạn 90 ngày) và đợt 2 (hạn 180 ngày) đã Đang vận hành | Quá hạn đợt ⇒ đỏ | (1) |
| 3 | **Đến hạn / quá hạn rà soát** | `last_reviewed_at + review_cycle < hôm nay` | Quá hạn > 0 ⇒ vàng; > 30 ngày ⇒ đỏ | (2) |
| 4 | **Đến hạn / quá hạn bảo trì** | `last_maintained_at + maintenance_cycle < hôm nay` | Quá **02 chu kỳ** ⇒ đỏ + KPH (R8) | (2) |
| 5 | **Vá lỗi bảo mật quá hạn theo mức** | So `due_at` của `MaintenanceTask` loại Vá lỗi với mốc 07/30/90 ngày (mục 4.3) | Bất kỳ lỗ hổng **Nghiêm trọng** quá hạn ⇒ **đỏ + cảnh báo LĐV** | (3) |
| 6 | **Sự cố theo mức và thời gian xử lý** | Đếm `ITIncident` theo `priority`; trung vị thời gian phản hồi và thời gian đóng | Quá hạn phản hồi > 0 ⇒ vàng; sự cố mức Cao chưa báo LĐV trong 01 giờ ⇒ đỏ | (4) |
| 7 | **Sự cố lặp** | Tài sản có ≥ 03 sự cố/90 ngày | ≥ 1 tài sản ⇒ đỏ, bắt buộc KPH (R9) | (4) |
| 8 | **Kết quả đối chiếu tài khoản** | Từ kỳ `AccountReconciliation` gần nhất: tài khoản không phiếu · phiếu không tài khoản · quá hạn hiệu lực · đặc quyền thiếu MFA | Tài khoản không phiếu > 0 ⇒ **đỏ** (sự cố ATTT, R20) | (5) |
| 9 | **Tài khoản chờ thu hồi quá hạn** | `revocation_due_at < hiện tại` và `status ≠ Đã thu hồi` | > 0 ⇒ đỏ (R16) | (5) |
| 10 | **Hạ tầng EOL** | `eol_date < hôm nay` và còn Đang vận hành | Thiếu rủi ro đã mở hoặc kế hoạch thay thế ⇒ đỏ (R11) | (6) |
| 11 | **Sắp hết hạn bản quyền / bảo hành** | `license_expiry` hoặc `warranty_until` trong 90 ngày tới | ⇒ vàng | (6) |
| 12 | **Tài sản phát hiện chưa kiểm kê trong kỳ** | `discovery_source = Phát hiện chưa kiểm kê` tạo trong kỳ | Quá 30 ngày chưa vào vận hành, hoặc đang `network_isolated` ⇒ đỏ (R17) | (7) |
| 13 | **Ngoài kế hoạch bảo trì năm** | Tài sản có hệ điều hành/phần mềm nền nhưng không thuộc `MaintenancePlan` đã phê duyệt | > 0 ⇒ vàng (R19) | (2), (8) |
| 14 | **Nhu cầu ngân sách thay thế** | Tổng hợp tài sản EOL + hết bảo hành + kế hoạch thay thế đã lập | — | (8) |

## 3. Phân quyền hiển thị

| Vai trò | Thấy gì |
|---|---|
| **QTHT** | Toàn bộ 14 chỉ số, mặc định lọc theo tài sản mình là `custodian` |
| **VP** | Toàn bộ — đơn vị chủ trì tổng hợp và lập báo cáo |
| **PT.ATTT** | Chỉ số 5, 6, 7, 8, 9, 12 (cấu hình an toàn, sự cố, tài khoản, tài sản chưa kiểm kê) |
| **TP** | Chỉ số 1, 3, 4, 6 giới hạn trong tài sản đơn vị mình sử dụng |
| **QLCL** | Chỉ số 4, 5, 7, 12 — đầu vào KPH (M13) và đánh giá nội bộ (M16) |
| **LĐV** | Toàn bộ ở mức tổng hợp, ưu tiên các ô đang ở ngưỡng **đỏ** |

## 4. Giới hạn

Bảng điều khiển **không** thay nhật ký hệ thống và **không** kết luận thay các thủ tục khác: sự cố
có dấu hiệu mất ATTT vẫn do M28 kết luận, ảnh hưởng hiệu lực kết quả đo vẫn do M10/M11 kết luận. Ô
chỉ số chỉ **hiển thị trạng thái định tuyến**, không hiển thị kết luận do M33 tự suy ra.
