# M14 — Đầu ra

| Đầu ra | Định dạng | Ghi chú |
|---|---|---|
| Danh mục văn bản nội bộ | Bảng/Excel/PDF | Nguồn cấu trúc: `ETV.P.F 14.02` |
| Danh mục văn bản bên ngoài | Bảng/Excel/PDF | Nguồn cấu trúc: `ETV.P.F 14.03` |
| Phiếu giao nhận văn bản | PDF/in | `ETV.P.F 14.04` |
| Báo cáo văn bản đến hạn soát xét định kỳ (36 tháng) | Bảng | Chu kỳ 36 tháng tại ETV.P14 §6.10; cảnh báo tự động theo §6.9 |
| Báo cáo cảnh báo trùng lặp/xung đột văn bản | Bảng | Sinh bởi AI Agent (M29), người LĐP xác nhận |

## Hỗ trợ AI (← M29, có kiểm soát)

- Gợi ý mã số, loại văn bản, điều khoản ISO/căn cứ pháp lý áp dụng khi soạn thảo.
- Kiểm tra thể thức theo mẫu (`templates/` của Skill `s14-kiem-soat-tai-lieu`).
- Cảnh báo văn bản sắp hết hạn soát xét định kỳ.
- Phát hiện trùng phạm vi/mâu thuẫn giữa văn bản mới và văn bản hiện hành.
- AI **không** tự phê duyệt, ký số, thu hồi hay hủy văn bản/hợp đồng.
