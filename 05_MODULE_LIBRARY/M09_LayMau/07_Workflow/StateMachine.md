# M09_LayMau — Bảng trạng thái (mặc định)

> Khung mẫu (template) — cập nhật nội dung cụ thể cho module. Xem M36_ChungChiSo làm ví dụ đã hoàn chỉnh.

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
