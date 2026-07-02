# M14 — Bảng trạng thái & điều kiện chuyển

> Áp dụng cho mọi văn bản thuộc phạm vi P14 (Sổ tay/Thủ tục/Quy trình/Hướng dẫn/Biểu mẫu/Hành chính/Văn bản bên ngoài). Hợp đồng **không** thuộc P14 — vòng đời hợp đồng do P03/P07 và module tương ứng quy định.

| STT | Trạng thái | Ý nghĩa | Người thao tác | Điều kiện chuyển | Bắt buộc lý do |
|---|---|---|---|---|---|
| 1 | Nháp | Đang soạn | Người lập | Đủ trường bắt buộc (`01_Requirement/DacTa.md`) → Chờ soát xét | Không |
| 2 | Chờ soát xét | Chờ kiểm tra | Người soát xét (LĐP) | Đạt → Chờ phê duyệt; Không đạt → Không soát xét | — |
| 3 | Không soát xét | Bị trả lại | Người lập | Sửa → Chờ soát xét | **Có** |
| 4 | Chờ phê duyệt | Chờ thẩm quyền | Người phê duyệt (LĐV) | Đạt → Đã phê duyệt; Không đạt → Không phê duyệt | — |
| 5 | Không phê duyệt | Bị trả lại | Người lập | Sửa → Chờ soát xét | **Có** |
| 6 | Đã phê duyệt | Có hiệu lực, đã công bố | Văn thư/QLCL | → Hết hiệu lực/Hủy | — |
| 7 | Hết hiệu lực/Hủy | Kết thúc vòng đời | LĐP (thanh lý) / LĐV (hủy bỏ) | (kết thúc) | **Có** |

## Nguyên tắc chung

- Hồ sơ chưa phê duyệt không dùng làm căn cứ nghiệp vụ tiếp theo.
- Mọi chuyển trạng thái ghi `AuditLog`; trạng thái "Không…/Hủy" bắt buộc `reason`.
- AI (← M29) chỉ đề xuất chuyển trạng thái dưới dạng gợi ý cho người có thẩm quyền bấm xác nhận — không tự gọi API chuyển trạng thái.
