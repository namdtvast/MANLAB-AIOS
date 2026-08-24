# M33_HeThongTT — SPEC kỹ thuật (work-id 20260824-dac-ta-m33)

> Nghiệp vụ (nguồn sự thật): [`../../DacTa.md`](../../DacTa.md). File này chỉ bổ sung phần **kỹ
> thuật** cần cho BUILD: màn hình, API, tiêu chí chấp nhận, NFR. Nền tảng đích:
> `09_ENGINEERING/aios-platform` (Next.js App Router + Prisma + server actions), khuôn M16/M17/M25.

## 1. RECON — hiện trạng

- `[FACT]` Không có `03_MANAGEMENT_SYSTEM/02_P/ETV.P33*` và không có `ETV.P.F33*`.
- `[FACT]` `ETV.P35` (ban hành 24/08/2026) mục 1.4 giao cho **ETV.MP33**: "hạ tầng công nghệ thông
  tin, máy chủ, mạng, thiết bị đầu cuối, tài khoản người dùng"; M35 trỏ xuống bằng `infra_ref`.
- `[FACT]` `ETV.P28` (ban hành 24/08/2026) mục 5.7.1–5.7.5 và 5.9 đặt ra các kiểm soát kỹ thuật bắt
  buộc; mục 5.7.2 yêu cầu thiết bị đầu cuối "được đăng ký trong danh mục tài sản (ETV.MP27)".
- `[FACT]` M28 đã có đặc tả và **giữ `AccessRequest`/`AccessReview`** — thẩm quyền phê duyệt quyền
  truy cập thuộc M28, ba vai trò đề nghị/phê duyệt/thực hiện phải khác nhau (M28 quy tắc R18).
- `[FACT]` M27 đã có đặc tả, kiểm kê **tài sản thông tin (dữ liệu)** và trỏ tới hệ thống chứa bằng
  `system_ref` → M33; biên bản hủy dữ liệu (`DisposalRecord`) nằm ở M27.
- `[FACT]` `05_MODULE_LIBRARY/M33_HeThongTT/08_Source/` trống; `prisma/schema.prisma` không có model
  tiền tố `M33`; module ngoài `ACTIVE_MODULE_CODES` là `COMING_SOON`.
- `[FACT]` Vai trò **QTHT** và **PT.ATTT** đã được M27/M28 yêu cầu bổ sung vào nền tảng nhưng chưa
  tồn tại trong bộ tài khoản demo hiện tại.
- `[ASSUMPTION]` M33 giữ danh mục tài khoản kỹ thuật (`SystemAccount`) ở mức *thực thi và đối
  chiếu*, không lặp lại luồng phê duyệt của M28.
- `[QUESTION]` 8 câu hỏi chốt — xem `DacTa.md` mục 10 (đặc biệt câu 2: vênh giữa P28 5.7.2 và P35 1.4).

## 2. Màn hình (UI)

| # | Màn hình | Đường dẫn dự kiến | Vai trò | Nội dung chính |
|---|---|---|---|---|
| 1 | Danh mục hạ tầng | `/modules/M33` | Nội bộ | Bảng tài sản: mã, tên, lớp, vùng mạng, môi trường, trọng yếu, chủ quản trị, trạng thái + 4 cờ đến hạn |
| 2 | Chi tiết tài sản | `/modules/M33/asset/[id]` | Nội bộ | Cấu hình an toàn (mã hóa, chống mã độc, vá lỗi) · tab Bảo trì · tab Tài khoản · tab Sự cố · nền tảng (M35) và dữ liệu (M27) liên quan |
| 3 | Bảo trì và vá lỗi | `/modules/M33/maintenance` | QTHT, LĐV | Kế hoạch năm, việc đến hạn/quá hạn, vá lỗi theo mức nghiêm trọng |
| 4 | Tài khoản hệ thống | `/modules/M33/accounts` | QTHT, PT.ATTT, LĐV | Danh mục tài khoản + **bảng đối chiếu với phiếu M28** |
| 5 | Sự cố và hỗ trợ | `/modules/M33/incidents` | Tất cả (báo) · QTHT (xử lý) | Danh sách, định tuyến sang M28/M35/M10, cảnh báo sự cố lặp |
| 6 | Bảng đến hạn | `/modules/M33/due` | QTHT, LĐV | 4 tab: rà soát · bảo trì · vá lỗi quá hạn · bản quyền–bảo hành–EOL |
| 7 | Kiểm kê hợp nhất | `/modules/M33/inventory` | QLCL, PT.ATTT, LĐV | Hợp M33 (thiết bị) + M27 (dữ liệu) cho ISO/IEC 27001 A.5.9 |

Quy ước hiển thị: nhãn tiếng Việt tập trung ở `labels.ts`; **không hiển thị bất kỳ trường bí mật xác
thực nào** (module không lưu); tài sản `criticality = Cao` có nhãn nổi bật kèm RTO.

## 3. API / server action

| Hành động | Vai trò | Gate chính |
|---|---|---|
| `createAsset` / `updateAsset` | QTHT | `custodian` + `user_owner` bắt buộc (R1); thiết bị đầu cuối bắt buộc bộ cấu hình an toàn (R3) |
| `submitForReview` / `review` | QTHT · PT.ATTT ≠ người lập | Không đạt ⇒ bắt buộc lý do |
| `approveAsset` | **LĐV** | Chặn khi vi phạm R1, R3, hoặc gán dữ liệu khách hàng vào môi trường Kiểm thử/Phát triển chưa được duyệt (R5) |
| `suspendAsset` / `resumeAsset` | QTHT | Bắt buộc lý do khi tạm ngừng |
| `retireAsset` | QTHT, LĐV | Chặn khi còn nền tảng Hiệu lực phụ thuộc (← M35) |
| `disposeAsset` | **LĐV** | **Chặn nếu thiếu bằng chứng xóa dữ liệu an toàn** (← M27 `DisposalRecord`) — R10 |
| `planMaintenance` / `completeMaintenance` | QTHT | Hoàn thành ⇒ bắt buộc `evidence_ref`; chặn khi thiếu `change_ref` → M30 (R5) hoặc `measurement_impact_ref` → M10 (R4) |
| `deferMaintenance` | QTHT · **LĐV** khi vá lỗi Nghiêm trọng | Bắt buộc lý do; quá hạn ⇒ cảnh báo + KPH M13 (R8) |
| `registerAccount` | QTHT | Bắt buộc `access_request_ref` **đã phê duyệt** ở M28 (R6); từ chối chuỗi giống bí mật xác thực (R7) |
| `lockAccount` / `revokeAccount` | QTHT | Theo phiếu M28; thu hồi bắt buộc `revoked_at` |
| `flagOrphanAccount` | QTHT, PT.ATTT | Khóa tạm + mở sự cố ở M28 (R6) |
| `reportIncident` / `routeIncident` / `closeIncident` | Nhân viên · QTHT | Đóng bị chặn khi `security_flag` chưa chuyển M28, hoặc sự cố lặp ≥ 3 lần/90 ngày chưa có `capa_ref` (R9) |
| `listAudit` | Quản trị | Chỉ đọc |

Vi phạm gate ⇒ lỗi nghiệp vụ có mã (`409` + mã lỗi). **Không có** server action xóa `ITAsset`.

## 4. Tiêu chí chấp nhận (AC)

| # | Tiêu chí | Cách verify |
|---|---|---|
| AC1 | Tài sản thiếu `custodian` hoặc `user_owner` ⇒ chặn gửi soát xét và chặn phê duyệt | Thao tác UI 2 chiều |
| AC2 | Thiết bị đầu cuối `max_classification = Hạn chế` mà `disk_encryption = false` ⇒ chặn phê duyệt | Thao tác UI 2 chiều |
| AC3 | Thiết bị cá nhân xử lý Hạn chế/Mật không có phê duyệt LĐV + rủi ro M28 ⇒ chặn phê duyệt | Thao tác UI 2 chiều |
| AC4 | Hoàn thành bảo trì trên máy tính điều khiển thiết bị đo mà thiếu `change_ref` hoặc `measurement_impact_ref` ⇒ bị chặn | Thao tác UI 2 chiều |
| AC5 | Gán tài sản thông tin chứa dữ liệu khách hàng vào tài sản môi trường Kiểm thử ⇒ bị chặn khi chưa có phê duyệt | Thử 2 môi trường |
| AC6 | Ghi nhận tài khoản không có `access_request_ref` đã phê duyệt ⇒ bị chặn | Thao tác UI 2 chiều |
| AC7 | Dán chuỗi giống mật khẩu/khóa API vào trường tự do của tài khoản ⇒ bị chặn | Thử 3 mẫu chuỗi |
| AC8 | Bảng đối chiếu liệt kê đúng: tài khoản không phiếu · phiếu không tài khoản · quá `valid_until` · đặc quyền thiếu MFA | Dữ liệu seed có đủ 4 trường hợp |
| AC9 | Thanh lý tài sản khi chưa có bằng chứng xóa dữ liệu an toàn ⇒ bị chặn; có bằng chứng ⇒ chuyển **Đã thanh lý** và bản ghi vẫn tra cứu được | Thao tác UI + kiểm tra DB |
| AC10 | Ngừng vận hành hạ tầng còn nền tảng Hiệu lực phụ thuộc ⇒ bị chặn | Seed 1 nền tảng M35 phụ thuộc |
| AC11 | Sự cố `security_flag = true` chưa chuyển M28 ⇒ không đóng được | Thao tác UI 2 chiều |
| AC12 | Sự cố thứ 3 trong 90 ngày trên cùng tài sản ⇒ không đóng được nếu thiếu `capa_ref` | Seed 2 sự cố cũ |
| AC13 | Vá lỗi mức Nghiêm trọng quá hạn ⇒ xuất hiện ở bảng đến hạn và cảnh báo LĐV | Seed 1 vá lỗi quá hạn |
| AC14 | Báo cáo kiểm kê hợp nhất hiển thị đủ thiết bị (M33) và dữ liệu (M27) không trùng lặp | Đối chiếu với hai danh mục nguồn |
| AC15 | Không có bất kỳ đường nào xóa bản ghi tài sản | Rà soát server action + thử gọi |
| AC16 | Mọi chuyển trạng thái ghi `AuditLog` đủ ai/khi nào/trước→sau/lý do | Xem nhật ký sau chuỗi thao tác |

## 5. NFR

- **Ghi vết**: `AuditLog` append-only; module **không** thay thế nhật ký hệ thống, chỉ trỏ tới bằng
  `evidence_ref`/`system_log_ref` (`ETV.P28` mục 5.7.5).
- **Không lưu bí mật**: schema không có trường mật khẩu/khóa/token; kiểm tra mẫu (regex) trên trường
  tự do của `SystemAccount` và `ITIncident` để chặn dán bí mật vào mô tả.
- **Không xóa**: tầng dữ liệu không có thao tác xóa `ITAsset`.
- **Phân quyền**: kiểm tra vai trò ở server action; QTHT **không** được thực hiện thao tác phê duyệt
  quyền (thẩm quyền M28) — kiểm tra chéo ba vai trò khi ghi nhận tài khoản.
- **Thang phân loại dùng chung**: `max_classification` import enum `Classification` từ M27, không
  khai báo lại.
- **Truy vết chéo**: FK thật với module đã ACTIVE; tham chiếu mềm + cảnh báo với module chưa xây
  (M27, M28, M30, M31, M35), chuyển thành FK khi module lên nền tảng.
- **Ngôn ngữ**: nhãn/thông báo tiếng Việt; enum lưu tiếng Anh trong DB theo khuôn M16/M17.
- **Hiệu năng**: danh mục phân trang ≥ 50 dòng/trang; bốn cờ đến hạn **tính khi đọc**, không lưu cột.

## 6. Rủi ro của chính đặc tả này

| Rủi ro | Mức | Giảm nhẹ |
|---|---|---|
| Vênh phạm vi thiết bị đầu cuối giữa `ETV.P28` 5.7.2 (MP27) và `ETV.P35` 1.4 (MP33) | **Cao** | Câu hỏi 2 mục 10 phải chốt trước khi BUILD; đề xuất R2 (M33 giữ thiết bị, M27 giữ dữ liệu, báo cáo A.5.9 là hợp của hai) |
| Chồng lấn tài khoản với M28 | **Cao** | M33 chỉ *thực thi và đối chiếu*, mọi phê duyệt thuộc M28 (R6); câu hỏi 3 |
| Chồng lấn sự cố với M35 và M28 | Trung bình | Quy tắc định tuyến R9 với ba đích rõ ràng, bắt buộc trước khi đóng |
| Danh mục hạ tầng phình to, kiểm kê xong rồi bỏ | **Cao** | Bốn cờ đến hạn + cảnh báo leo thang lên LĐV + rà soát 1 năm/lần |
| Người dùng dán mật khẩu vào mô tả sự cố/tài khoản | Trung bình | Kiểm tra mẫu ở server action (NFR) + AC7 |
| Ràng buộc R10 (xóa dữ liệu trước thanh lý) phụ thuộc M27 chưa xây | Trung bình | Giai đoạn đầu chấp nhận bằng chứng dạng tệp đính kèm, chuyển sang FK khi M27 lên nền tảng |
| Vai trò QTHT/PT.ATTT chưa có trên nền tảng | Trung bình | Increment 1 bổ sung vai trò — dùng chung với M27/M28, chỉ làm một lần |
