# M33 — Đồng bộ đặc tả với `ETV.P33` (work-id 20260826-dong-bo-p33)

**Chế độ**: BUILD (chỉ tài liệu đặc tả, **không** viết mã) · **Tier**: M — 8 file, đổi mô hình dữ
liệu và state machine của module chưa xây, không đụng mã nguồn nào đang chạy.

## 1. Vì sao phải làm

Đặc tả M33 được viết **24/08/2026** (commit `7f25938`) và được dùng làm đầu vào để soạn thủ tục
`ETV.P33` **26/08/2026** (commit `5694165`). Thủ tục đã **chốt toàn bộ 8 điểm** mà đặc tả để ngỏ và
**bổ sung nhiều yêu cầu mới**, nhưng đặc tả chưa được cập nhật ngược — vẫn viết "chưa có `ETV.P33`",
"chưa có biểu mẫu F33.xx (0/0)". Module số hóa một thủ tục mà không khớp thủ tục đó là lỗi nền: gate
lập trình ra sẽ thiếu, và người đọc đặc tả sẽ tin vào một bức tranh đã lỗi thời.

## 2. Điều đã chốt — đặc tả cập nhật theo

Xem bảng đối chiếu 8 câu hỏi ở [`../../DacTa.md`](../../DacTa.md) mục 10.

## 3. Yêu cầu MỚI mà `ETV.P33` đặt ra, đặc tả cũ chưa có

| # | Yêu cầu mới | Điều khoản | Đã đưa vào |
|---|---|---|---|
| 1 | `MaintenanceTask` phải qua trạng thái **Chờ nghiệm thu**, người nghiệm thu **≠ người thực hiện** | §6.3.2 bước 5, Phụ lục II.2 | Quy tắc **R15**, trường `accepted_by`/`accepted_at`, endpoint `/accept` |
| 2 | Sự cố có **thời hạn phản hồi** riêng (ngay/04 giờ/01 ngày) và mức Cao phải **báo LĐV trong 01 giờ** | §6.5.2 | Quy tắc **R18**, mục 4.6, trường `priority`/`response_due_at`/`escalated_to_ldv_at` |
| 3 | Đóng phiếu sự cố phải có **nguyên nhân**, xác nhận tài sản trở lại bình thường, và kết luận **có/không lập bài học kinh nghiệm** (`ETV.P26`) | §6.5.4 | Quy tắc **R18**, trường `root_cause`, `asset_back_to_normal`, `lesson_ref`/`no_lesson_reason` |
| 4 | Đích định tuyến thứ tư: gián đoạn vượt ngưỡng ⇒ **`ETV.P31`**; ảnh hưởng kết quả đã phát hành ⇒ **`ETV.P10` và `ETV.P11`**, dừng dùng kết quả | §6.5.3 | Quy tắc **R9**, trường `continuity_ref` |
| 5 | **Kế hoạch bảo trì năm** phải được LĐV phê duyệt trước năm kế hoạch | §6.3.1 | Thực thể **`MaintenancePlan`** (mục 2.6), quy tắc **R19** |
| 6 | Đối chiếu tài khoản **06 tháng/lần**; rà soát đặc quyền – dịch vụ **≥ 02 lần/năm** trình LĐV; kết quả lưu 05 năm | §6.4.2 bước 4–5 | Thực thể **`AccountReconciliation`** (mục 2.7), quy tắc **R20** |
| 7 | Thu hồi tài khoản **trong ngày làm việc** khi có biến động nhân sự — điều kiện hoàn tất thủ tục thôi việc (`ETV.P03`) | §6.4.2 bước 3 | Quy tắc **R16**, trường `hr_event_ref`/`revocation_due_at` |
| 8 | **Hạ tầng chưa kiểm kê** là sự không phù hợp: lập bản ghi, hạn 30 ngày, **ngắt mạng** nếu không đạt cấu hình, KPH nếu có dữ liệu Hạn chế/Mật | §6.7 | Quy tắc **R17**, trường `discovery_source`/`inventory_due_at`/`network_isolated`, màn hình 9 |
| 9 | Phần mềm phải có **giấy phép hợp lệ** mới được phê duyệt; cấm cài phần mềm không bản quyền | §6.2.5, Phụ lục I.1 đk 8 | Quy tắc **R21** |
| 10 | **Mã tài sản không bao giờ được cấp lại**, kể cả sau thanh lý | §6.1.2, Phụ lục I.2 | Quy tắc **R22** |
| 11 | Hai điều kiện cấu hình an toàn cơ sở bổ sung: **đổi mật khẩu mặc định**, **đóng dịch vụ không dùng**; áp cho cả **máy chủ** | §6.2.3 | Quy tắc **R3**, trường `default_password_changed`/`unused_services_closed` |
| 12 | Tài sản trọng yếu Cao bắt buộc thêm **phương án dự phòng** và **≥ 01 rủi ro đã mở** | §6.1.3, Phụ lục I.1 đk 5 | Trường `failover_plan`, ràng buộc DataModel |
| 13 | Ngừng vận hành phải kiểm tra **ba** nhóm phụ thuộc (M35, M27, **M05**) và **thu hồi chứng thư số** gắn với tài sản | §6.6.1 bước 2, 4 | Quy tắc **R10**, endpoint `/retire`, `/dispose` |
| 14 | Cấm ghi bí mật xác thực vào **bản ghi tài sản**, không chỉ bản ghi tài khoản | §6.1.1, Phụ lục I.1 đk 7 | Quy tắc **R7**, NFR kiểm tra mẫu trên cả `ITAsset` |
| 15 | Ngoại lệ **thay đổi khẩn cấp có lệnh LĐV** — vẫn phải bổ sung phiếu M30 hồi tố | §5.2, Phụ lục I.2 | Quy tắc **R5**, trường `emergency_order_ref` |
| 16 | Vai trò **QLCL** trong M33 (hồ sơ, mở KPH, đánh giá nội bộ); **TP** là người đánh giá ảnh hưởng hiệu lực kết quả đo | §5.2 | Mục 3 Vai trò |
| 17 | Báo cáo **06 tháng/lần** với 8 nội dung bắt buộc; **thời hạn lưu** từng loại hồ sơ | §6.9, §VIII | Mục 7, `05_Report/Outputs.md`, `06_Dashboard/Dashboard.md` |
| 18 | Lộ trình kiểm kê kỳ đầu **90/180 ngày** | §6.1.5 | Mục 4.7, chỉ số 2 của bảng điều khiển |

## 4. Lỗi trích dẫn đã sửa

Đặc tả cũ dẫn **`ETV.P35` mục 1.4** ở 3 chỗ trong `DacTa.md` và 2 chỗ trong `README.md`. **`ETV.P35`
không có mục 1.4** — điều khoản giao phạm vi cho ETV.P33 nằm ở **§2.3 (Ngoài phạm vi)**; chính
`ETV.P33` §2.2 cũng dẫn đúng là "ETV.P35 mục 2.3". Đã sửa toàn bộ sang **mục 2.3**.

Vì sao `validate_citations.py` không bắt được: mẫu nhận dạng là
`ETV\.(?:MP|P)(\d{2})\s*(?:§|mục)\s*(\d+...)` — giữa mã thủ tục và chữ "mục" chỉ chấp nhận khoảng
trắng. Repo viết mã thủ tục trong dấu nháy ngược (`` `ETV.P35` mục 1.4 ``), nên dấu nháy đóng chen
vào giữa và mẫu **không khớp** ⇒ trích dẫn không được kiểm. Đây là **điểm mù của công cụ**, không
phải lỗi dữ liệu: mọi trích dẫn viết dạng `` `ETV.Pxx` §y.z `` đều đang lọt lưới. Không sửa công cụ
trong đợt này (ngoài phạm vi, thuộc `_meta/`, cần đo lại toàn repo trước khi bật) — ghi lại ở đây để
xử lý riêng.

## 5. Kết quả kiểm tra

| Kiểm tra | Lệnh | Kết quả |
|---|---|---|
| Cấu trúc và link tương đối | `python3 _meta/validate_links.py` | **PASS** — 562 link · 46 MP · 38 M · 22 CAP · 0 vấn đề |
| Trích dẫn điều khoản (cảnh báo) | `python3 _meta/validate_citations.py` | **PASS** — 372 trích dẫn · 0 hỏng |
| Trích dẫn điều khoản (chặn, như CI) | `python3 _meta/validate_citations.py --chan` | **PASS** — thoát 0 |
| Đối chiếu thủ công `ETV.P33` ↔ đặc tả | Đọc toàn văn 595 dòng P33 và 4 biểu mẫu F33.xx | 18 yêu cầu mới đã đưa vào; **0** điều khoản P33 còn chưa có nơi hiện thực trong đặc tả |

**Không verify được** (không thuộc phạm vi đợt này): chưa có mã nguồn nên **không** kiểm được gate
thực thi; 24 tiêu chí chấp nhận ở `04_UI/Screens.md` là tiêu chí *sẽ* verify khi BUILD, hiện ở trạng
thái **NOT RUN**.

## 6. Việc còn lại (cần con người)

1. **Soát xét và phê duyệt `ETV.P33` + F33.01–04 theo MP14.** Mọi giá trị định lượng (07/30/90 ngày,
   SLA 01 giờ/04 giờ/01 ngày, 90/180 ngày, 06 tháng) là **đề xuất chờ Viện xác nhận**.
2. **Xác nhận ánh xạ `impact` → `priority`** (mục 4.6) — `ETV.P33` §6.5.2 không nêu bảng ánh xạ, đây
   là diễn giải của đặc tả.
3. **Hiệu đính `ETV.P28` mục 5.7.2** theo MP14 khi tới kỳ soát xét: câu chữ hiện vẫn nói thiết bị đầu
   cuối đăng ký tại ETV.MP27, ngược với kết luận đã chốt ở `ETV.P33` §2.2.
4. **Cập nhật `04_PROCESS_LIBRARY/MP33_HeThongTT/manifest.yaml`** khi thủ tục được phê duyệt:
   `doc_status` từ `Cho-soat-xet` sang trạng thái mới và điền `issued_date` thật.
5. **Xử lý điểm mù của `validate_citations.py`** (mục 4) — việc của `_meta/`, không thuộc module.
