# M35_NenTangSo — Bảng trạng thái

> Đồng bộ với **`ETV.P35`** mục 6 (ban hành lần 01 ngày 24/08/2026).

## 1. Vòng đời bản ghi nền tảng (`AIPlatform.approval_status`)

| STT | Trạng thái | Ý nghĩa | Người thao tác | Điều kiện chuyển | Bắt buộc lý do |
|---|---|---|---|---|---|
| 1 | Nháp | Đang soạn | CSH, ĐMKT, QLCL | Đủ trường bắt buộc (+ F35.02 với PRODUCTION) → Chờ soát xét | Không |
| 2 | Chờ soát xét | Chờ kiểm tra kỹ thuật và trùng lặp | ĐMKT/TP (≠ người lập) | Đạt → Chờ phê duyệt; Không đạt → Không soát xét | — |
| 3 | Không soát xét | Bị trả lại | Người lập | Sửa → Chờ soát xét | **Có** |
| 4 | Chờ phê duyệt | Chờ thẩm quyền | QLCL trình **LĐV** | Đạt → Đã phê duyệt (**chặn** nếu thiếu 1 trong 7 điều kiện); Không đạt → Không phê duyệt | — |
| 5 | Không phê duyệt | Bị trả lại | LĐV | Sửa → Chờ soát xét | **Có** |
| 6 | Đã phê duyệt | Được chấp thuận, **chưa** chạy | LĐV | Bật kiểm tra sức khỏe + kết nối adapter → Hiệu lực | — |
| 7 | Hiệu lực | Đang vận hành, được M29/M38 tham chiếu | QTHT/ĐMKT | Phiên bản mới được duyệt → Hết hiệu lực (tự động); hoặc F35.04 → Hết hiệu lực | — |
| 8 | Hết hiệu lực | Đã ngừng vận hành hoặc bị thay thế | LĐV (qua F35.04) | (kết thúc — vẫn tra cứu được làm bằng chứng) | **Có** |
| 9 | Hủy | Bỏ bản ghi trước khi phê duyệt | LĐV | (kết thúc) | **Có** |

> Nguyên tắc: ít trạng thái nhưng đủ kiểm soát; hồ sơ chưa phê duyệt không dùng làm căn cứ tiếp theo.
> **Đã phê duyệt** và **Hiệu lực** tách riêng để phân biệt nền tảng đã được duyệt nhưng chưa bật
> kiểm tra sức khỏe — nếu gộp thì không thực thi được điều kiện chặn cứng (c) của mục 5.2.3.

## 2. Tình trạng vận hành (`health`) — không phải trạng thái hồ sơ

| Tình trạng | Ý nghĩa | Nguồn cập nhật |
|---|---|---|
| HEALTHY | Kiểm tra sức khỏe đạt | Tiến trình tự động |
| DEGRADED | Hoạt động nhưng không đầy đủ hoặc chậm bất thường | Tiến trình tự động |
| DOWN | Không truy cập được | Tiến trình tự động |
| UNKNOWN | Chưa bật kiểm tra sức khỏe hoặc kiểm tra không chạy | Tiến trình tự động |

Chỉ áp dụng cho bản ghi ở trạng thái **Hiệu lực**. Health đổi **không** đưa bản ghi quay lại quy
trình soát xét/phê duyệt. Ngưỡng sinh sự cố (ETV.P35 mục 5.3.2): mức Cao DOWN ⇒ báo trong 01 giờ ·
mức Cao DEGRADED > 24 giờ · mức Trung bình DOWN > 24 giờ · UNKNOWN > 07 ngày = **mất giám sát**.

## 3. Trạng thái thực thể phụ

| Đối tượng | Chuỗi trạng thái | Thẩm quyền kết thúc | Điều kiện đặc biệt |
|---|---|---|---|
| `PreOpAssessment` | Nháp → Chờ soát xét → Chờ phê duyệt → Đã phê duyệt / Không phê duyệt | LĐV | — |
| `PlatformIncident` | Mới → Đang xử lý → Chờ xác nhận → Đã đóng / Hủy | CSH (đóng) · LĐV (hủy) | `security_flag = true` ⇒ **không đóng** trước khi M28 kết luận; lặp ≥ 3 lần/90 ngày ⇒ bắt buộc `capa_ref` (M13) |
| `DecommissionRecord` | Nháp → Chờ phê duyệt → Đã phê duyệt → Đã thực hiện / Hủy | LĐV | Chặn khi còn phụ thuộc M29/M38; `data_disposition[]` xong trước `access_revocations[]` |
| `PlatformException` | Đang hiệu lực → Đã khắc phục / Quá hạn | LĐV duyệt khi mở | `deadline ≤ 90 ngày`; quá hạn ⇒ cảnh báo LĐV |
| `IntegrationPoint` | Hoạt động → Tạm dừng / Đã cắt | ĐMKT | Đổi điểm tích hợp của nền tảng có Agent/Tool hoạt động ⇒ bắt buộc ghi `AIAuditLog` |
| `PlatformChange` | (ghi nhận) → Đã thực hiện | Theo `change_type`: Nhỏ = CSH · Cấu hình kết nối = ĐMKT soát xét + CSH duyệt · Lớn = **LĐV** | Thay đổi lớn ⇒ lập phiên bản mới, trình lại từ bước 1 |

## 4. Cờ tính khi đọc (không lưu thành trạng thái)

| Cờ | Công thức | Hệ quả |
|---|---|---|
| Đến hạn rà soát | `last_reviewed_at + review_cycle < hôm nay` | Cảnh báo CSH; quá 02 chu kỳ ⇒ cảnh báo LĐV. Hệ thống **không** tự chuyển Hết hiệu lực |
| Ngoại lệ quá hạn khắc phục | `PlatformException.deadline < hôm nay` và chưa Đã khắc phục | Cảnh báo LĐV; vào báo cáo xem xét lãnh đạo (M17) |
| Mất giám sát | `health = UNKNOWN` liên tục > 07 ngày | Lập `PlatformIncident` loại *Mất giám sát* |
