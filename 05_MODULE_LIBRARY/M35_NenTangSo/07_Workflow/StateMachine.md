# M35_NenTangSo — Bảng trạng thái

Áp dụng cho vòng đời **đăng ký** một `AIPlatform` (định danh nền tảng) — dùng đúng khuôn trạng
thái chuẩn của repo, không tùy biến riêng.

| STT | Trạng thái | Ý nghĩa | Người thao tác | Điều kiện chuyển | Bắt buộc lý do |
|---|---|---|---|---|---|
| 1 | Nháp | Đang soạn | Người lập | Đủ trường bắt buộc → Chờ soát xét | Không |
| 2 | Chờ soát xét | Chờ kiểm tra | Người soát xét | Đạt → Chờ phê duyệt; Không đạt → Không soát xét | — |
| 3 | Không soát xét | Bị trả lại | Người lập | Sửa → Chờ soát xét | **Có** |
| 4 | Chờ phê duyệt | Chờ thẩm quyền | Người phê duyệt | Đạt → Đã phê duyệt; Không đạt → Không phê duyệt | — |
| 5 | Không phê duyệt | Bị trả lại | Người lập | Sửa → Chờ soát xét | **Có** |
| 6 | Đã phê duyệt | Có hiệu lực | — | (tùy module) → Đã công bố / Hết hiệu lực / Hủy | — |
| 7 | Hết hiệu lực / Hủy | Kết thúc vòng đời | người có thẩm quyền | (kết thúc) | **Có** khi Hủy |

> Nguyên tắc: ít trạng thái nhưng đủ kiểm soát; hồ sơ chưa phê duyệt không dùng làm căn cứ tiếp theo.

Sau khi vào **Đã phê duyệt/Đã công bố (Hiệu lực)**, `status` health
(`HEALTHY`/`DEGRADED`/`DOWN`/`UNKNOWN`) do tiến trình health check tự động cập nhật — tách biệt
khỏi vòng đời phê duyệt ở trên, không quay lại quy trình soát xét/phê duyệt khi health đổi.
