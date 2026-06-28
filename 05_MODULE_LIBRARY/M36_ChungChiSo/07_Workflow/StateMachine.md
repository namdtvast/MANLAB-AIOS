# M36 — Bảng trạng thái & điều kiện chuyển

| STT | Trạng thái | Ý nghĩa | Người thao tác | Điều kiện chuyển tiếp | Bắt buộc lý do |
|---|---|---|---|---|---|
| 1 | Nháp | Đang soạn | Người lập | Đủ trường bắt buộc → Chờ soát xét | Không |
| 2 | Chờ soát xét | Chờ kiểm tra kỹ thuật | Người soát xét | Đạt → Chờ phê duyệt; Không đạt → Không soát xét | — |
| 3 | Không soát xét | Bị trả lại khi soát xét | Người lập | Sửa → Chờ soát xét | **Có** |
| 4 | Chờ phê duyệt | Chờ người có thẩm quyền | Người phê duyệt | Đạt → Đã phê duyệt; Không đạt → Không phê duyệt | — |
| 5 | Không phê duyệt | Bị trả lại khi phê duyệt | Người lập | Sửa → Chờ soát xét | **Có** |
| 6 | Đã phê duyệt | Đã duyệt nội dung | Người ký | → Đã ký số | Không |
| 7 | Đã ký số | Đã ký số/xác thực điện tử | Người phát hành | → Đã phát hành | Không |
| 8 | Đã phát hành | Có hiệu lực, tra cứu QR công khai | — | → Đã thay thế / Đã thu hồi / Hết hiệu lực | — |
| 9 | Đã thay thế | Bị thay bằng phiên bản mới | hệ thống | (kết thúc) — liên kết bản mới | Không |
| 10 | Đã thu hồi | Bị thu hồi hiệu lực | LĐP/LĐV | (kết thúc) | **Có** |
| 11 | Đã hủy | Hủy bỏ | LĐP/LĐV | (kết thúc) | **Có** |
| 12 | Hết hiệu lực | Quá `valid_until` | hệ thống | (kết thúc) | Không |

## Nguyên tắc
- Hồ sơ chưa phê duyệt **không** được dùng làm căn cứ nghiệp vụ tiếp theo.
- Chỉ trạng thái 7–8 mới tra cứu công khai.
- Mọi chuyển trạng thái ghi `AuditLog`; trạng thái "Không…/Thu hồi/Hủy" bắt buộc `reason`.
