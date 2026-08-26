# M33_HeThongTT — Màn hình

> Nguồn sự thật nghiệp vụ: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md). Thủ tục nguồn:
> `ETV.P33` (dự thảo, Chờ soát xét). Nền tảng đích: `09_ENGINEERING/aios-platform` (Next.js App
> Router + Prisma + server action), khuôn M16/M17/M25 — **chưa xây**.

## 1. Danh sách màn hình

| # | Màn hình | Đường dẫn dự kiến | Vai trò | Nội dung chính |
|---|---|---|---|---|
| 1 | Danh mục hạ tầng | `/modules/M33` | Nội bộ | Bảng tài sản: mã, tên, lớp, vùng mạng, môi trường, trọng yếu, chủ quản trị, trạng thái + cờ cảnh báo |
| 2 | Chi tiết tài sản | `/modules/M33/asset/[id]` | Nội bộ | Cấu hình an toàn cơ sở · tab Bảo trì · tab Tài khoản · tab Sự cố · nền tảng (M35), dữ liệu (M27), thiết bị đo (M05) liên quan |
| 3 | Kế hoạch bảo trì năm | `/modules/M33/plan` | VP, QTHT, LĐV | Lập – trình – phê duyệt `MaintenancePlan`; nêu tài sản trong phạm vi mà chưa có trong kế hoạch (R19) |
| 4 | Bảo trì và vá lỗi | `/modules/M33/maintenance` | QTHT, TP, LĐV | Công việc đến hạn/quá hạn, vá lỗi theo mức nghiêm trọng, **hàng chờ nghiệm thu** (R15) |
| 5 | Tài khoản hệ thống | `/modules/M33/accounts` | QTHT, PT.ATTT, LĐV | Danh mục tài khoản theo hệ thống/nền tảng; hàng chờ thu hồi theo biến động nhân sự (R16) |
| 6 | Kỳ đối chiếu tài khoản | `/modules/M33/accounts/reconciliation` | QTHT, PT.ATTT, LĐV | Mở kỳ 06 tháng / kỳ đặc quyền – dịch vụ, chốt kỳ thành hồ sơ bất biến (R20) |
| 7 | Sự cố và hỗ trợ | `/modules/M33/incidents` | Tất cả (báo) · QTHT (xử lý) | Danh sách theo `priority`, đồng hồ **thời hạn phản hồi** và thời hạn xử lý, định tuyến 5 đích, cảnh báo sự cố lặp |
| 8 | Bảng đến hạn | `/modules/M33/due` | QTHT, VP, LĐV | 7 tab: rà soát · bảo trì · vá lỗi quá hạn · bản quyền–bảo hành–EOL · quá hạn phản hồi sự cố · tài sản chưa kiểm kê quá 30 ngày · ngoài kế hoạch bảo trì năm |
| 9 | Hạ tầng chưa kiểm kê | `/modules/M33/undiscovered` | QTHT, PT.ATTT | Hàng chờ xử lý theo ETV.P33 §6.7: lập bản ghi, hạn 30 ngày, cờ đã ngắt mạng, KPH khi có dữ liệu Hạn chế/Mật |
| 10 | Kiểm kê hợp nhất | `/modules/M33/inventory` | QLCL, PT.ATTT, LĐV | Hợp M33 (thiết bị) + M27 (dữ liệu) cho ISO/IEC 27001 A.5.9 (R2) |
| 11 | Báo cáo 06 tháng | `/modules/M33/report` | VP, QLCL, LĐV | Tám nội dung bắt buộc của ETV.P33 §6.9 |

## 2. Quy ước hiển thị

- Nhãn tiếng Việt tập trung ở `labels.ts`; enum lưu tiếng Anh trong DB theo khuôn M16/M17.
- **Không hiển thị bất kỳ trường bí mật xác thực nào** — module không lưu (R7). Màn hình tài khoản
  chỉ hiện *nơi lưu giữ* và *người có quyền cấp phát*.
- Tài sản `criticality = Cao` có nhãn nổi bật kèm RTO và phương án dự phòng.
- Tài sản `network_isolated = true` hiển thị nhãn cảnh báo ở mọi danh sách (R17).
- Bảy cờ cảnh báo **tính khi đọc**, không lưu cột — hiển thị dạng chip trên hàng, đồng thời gom
  thành các tab của màn hình 8.
- Nút thao tác bị chặn phải nêu **lý do chặn dẫn đúng điều khoản** (vd "Chặn: thiếu bằng chứng xóa
  dữ liệu an toàn — ETV.P33 §6.6.2"), không hiện thông báo chung chung.

## 3. Tiêu chí chấp nhận (AC)

| # | Tiêu chí | Cách verify |
|---|---|---|
| AC1 | Tài sản thiếu `custodian` hoặc `user_owner` ⇒ **không lưu được** (R1) | Thao tác UI 2 chiều |
| AC2 | Thiết bị đầu cuối `max_classification = Hạn chế` mà `disk_encryption = false` ⇒ chặn phê duyệt | Thao tác UI 2 chiều |
| AC3 | Thiếu `default_password_changed` hoặc `unused_services_closed` ⇒ chặn phê duyệt (R3) | Thao tác UI 2 chiều |
| AC4 | Thiết bị cá nhân xử lý **Nội bộ** đã đăng ký và đủ cấu hình ⇒ **cho phép**; xử lý Hạn chế/Mật không có phê duyệt LĐV ⇒ chặn (mục 4.5) | Thử 2 mức phân loại |
| AC5 | `asset_class = Phần mềm – bản quyền` thiếu giấy phép còn hiệu lực ⇒ chặn phê duyệt (R21) | Thao tác UI 2 chiều |
| AC6 | `criticality = Cao` thiếu RTO, `failover_plan` hoặc `risk_refs` ⇒ chặn phê duyệt (`ETV.P33` Phụ lục I.1 điều kiện 5) | Thao tác UI 2 chiều |
| AC7 | Hoàn thành bảo trì trên máy tính điều khiển thiết bị đo mà thiếu `change_ref` hoặc `measurement_impact_ref` ⇒ bị chặn (R4) | Thao tác UI 2 chiều |
| AC8 | `accepted_by = performed_by` ⇒ chặn nghiệm thu; không nghiệm thu ⇒ không chuyển được sang Hoàn thành (R15) | Thao tác UI 2 chiều |
| AC9 | Gán tài sản thông tin chứa dữ liệu khách hàng vào tài sản môi trường Kiểm thử ⇒ bị chặn khi chưa có phê duyệt (R5) | Thử 2 môi trường |
| AC10 | Ghi nhận tài khoản không có `access_request_ref` đã phê duyệt ⇒ bị chặn (R6) | Thao tác UI 2 chiều |
| AC11 | Dán chuỗi giống mật khẩu/khóa API vào trường tự do của tài khoản **hoặc của tài sản** ⇒ bị chặn (R7) | Thử 3 mẫu chuỗi trên cả 2 thực thể |
| AC12 | Kỳ đối chiếu liệt kê đúng 4 nhóm: tài khoản không phiếu · phiếu không tài khoản · quá `valid_until` · đặc quyền thiếu MFA; **chốt kỳ rồi thì số liệu không đổi** (R20) | Seed đủ 4 trường hợp, chốt kỳ rồi thêm dữ liệu mới |
| AC13 | Tín hiệu nghỉ việc từ M03 ⇒ tài khoản vào hàng chờ thu hồi với `revocation_due_at` = cuối ngày làm việc (R16) | Seed 1 biến động nhân sự |
| AC14 | Thanh lý khi chưa có bằng chứng xóa dữ liệu an toàn ⇒ bị chặn; còn thiết bị đo (M05) hoặc nền tảng (M35) phụ thuộc ⇒ chặn ngừng vận hành (R10) | Thao tác UI + seed phụ thuộc |
| AC15 | Sự cố `security_flag = true` chưa có kết luận M28 ⇒ không đóng được (R9) | Thao tác UI 2 chiều |
| AC16 | Đóng sự cố thiếu `root_cause`, `asset_back_to_normal` hoặc kết luận bài học kinh nghiệm ⇒ bị chặn (R18) | Thao tác UI 2 chiều |
| AC17 | Sự cố thứ 3 trong 90 ngày trên cùng tài sản ⇒ không đóng được nếu thiếu `capa_ref` (R9) | Seed 2 sự cố cũ |
| AC18 | Sự cố `priority = Cao` quá 01 giờ chưa có `escalated_to_ldv_at` ⇒ hiện ở tab quá hạn phản hồi (R18) | Seed 1 sự cố Cao |
| AC19 | Vá lỗi mức Nghiêm trọng quá 07 ngày ⇒ xuất hiện ở bảng đến hạn và cảnh báo LĐV (mục 4.3) | Seed 1 vá lỗi quá hạn |
| AC20 | Tài sản `discovery_source = Phát hiện chưa kiểm kê` quá 30 ngày chưa vào vận hành ⇒ hiện ở màn hình 9 và bảng đến hạn (R17) | Seed 1 tài sản quá hạn |
| AC21 | Mã của tài sản **Đã thanh lý** không được cấp lại cho tài sản mới (R22) | Thử tạo trùng mã |
| AC22 | Báo cáo kiểm kê hợp nhất hiển thị đủ thiết bị (M33) và dữ liệu (M27) không trùng lặp (R2) | Đối chiếu với hai danh mục nguồn |
| AC23 | Không có bất kỳ đường nào xóa bản ghi tài sản | Rà soát server action + thử gọi |
| AC24 | Mọi chuyển trạng thái ghi `AuditLog` đủ ai/khi nào/trước→sau/lý do | Xem nhật ký sau chuỗi thao tác |

## 4. NFR

- **Ghi vết**: `AuditLog` append-only; module **không** thay thế nhật ký hệ thống, chỉ trỏ tới bằng
  `evidence_ref`/`system_log_ref` (ETV.P28 mục 6.7.5).
- **Không lưu bí mật**: schema không có trường mật khẩu/khóa/token; kiểm tra mẫu (regex) trên trường
  tự do của `ITAsset`, `SystemAccount` và `ITIncident`.
- **Không xóa**: tầng dữ liệu không có thao tác xóa `ITAsset`; tài khoản bất thường **khóa tạm,
  không xóa** trước khi PT.ATTT xem xét.
- **Phân quyền**: kiểm tra vai trò ở server action; QTHT **không** được thực hiện thao tác phê duyệt
  quyền (thẩm quyền M28); kiểm tra chéo ba vai trò khi ghi nhận tài khoản và khi nghiệm thu bảo trì.
- **Thang phân loại dùng chung**: `max_classification` import enum `Classification` từ M27, không
  khai báo lại.
- **Truy vết chéo**: FK thật với module đã ACTIVE; tham chiếu mềm + cảnh báo với module chưa xây
  (M27, M28, M30, M31, M35), chuyển thành FK khi module lên nền tảng — **không nới lỏng điều kiện
  chặn cứng** vì module đích chưa có.
- **Ngôn ngữ**: nhãn và thông báo tiếng Việt; thông báo chặn phải dẫn điều khoản `ETV.P33`.
- **Hiệu năng**: danh mục phân trang ≥ 50 dòng/trang; toàn bộ cờ đến hạn **tính khi đọc**, không lưu
  cột — với danh mục vài nghìn tài sản cần chỉ mục trên `eol_date`, `last_maintained_at`,
  `last_reviewed_at`, `due_at`.
