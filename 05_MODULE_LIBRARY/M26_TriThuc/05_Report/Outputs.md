# M26_TriThuc — Đầu ra

> Nguồn sự thật: [`../01_Requirement/DacTa.md`](../01_Requirement/DacTa.md) mục 7.

| Đầu ra | Định dạng | Ghi chú |
|---|---|---|
| F26.01 — Danh mục tri thức tổ chức | PDF/Excel | Mục tri thức theo nhóm, dạng, mức trọng yếu, chủ sở hữu, chu kỳ rà soát |
| F26.02 — Phiếu bài học kinh nghiệm | PDF | Sự việc, bài học, khuyến nghị, mục tri thức kết tinh |
| F26.03 — Phiếu xác định nhu cầu tri thức | PDF | Nhu cầu, cách bổ sung, người chịu trách nhiệm, hạn, kết quả |
| F26.04 — Biên bản chia sẻ tri thức | PDF | Hình thức, nội dung, người trình bày, người tham dự |
| Báo cáo tình hình tri thức phục vụ M17 | Dữ liệu/PDF | Tri thức mới, mục hết hiệu lực, nhu cầu chưa đáp ứng, hoạt động chia sẻ trong kỳ |
| Bảng mục đến hạn rà soát | Màn hình | Tính khi đọc theo `review_cycle` |
| Bảng rủi ro mất tri thức | Màn hình/PDF | Mục trọng yếu là tri thức ẩn, số người giữ ≤ 1 — đầu vào M01 |

> **Bốn biểu mẫu F26.01–F26.04 chưa được ban hành** (không có trong `06_SHARED_RESOURCES/01_Forms/`)
> — phải soạn và ban hành theo MP14 trước khi bản xuất được dùng làm hồ sơ chính thức. Hoạt động
> đào tạo nội bộ dùng lại **F03.05.x** của M03, không tạo biểu mẫu trùng.

## Hỗ trợ AI (← M29, có kiểm soát)

AI được phép *gợi ý* mục tri thức từ tài liệu/hồ sơ sẵn có (M13, M12, M16, `08_KNOWLEDGE_GRAPH`),
*đánh dấu* mục nghi lỗi thời, *đề xuất* nhóm và từ khóa tra cứu. AI **không** tạo bản ghi chính
thức, **không** soát xét, **không** phê duyệt mục tri thức (ISO/IEC 42001; MP29).

Chiều ngược lại: chỉ mục tri thức ở trạng thái **Đã phê duyệt** và mức bảo mật **Công khai/Nội bộ**
mới được nạp vào chỉ mục trợ lý AI (`08_KNOWLEDGE_GRAPH/09_Embedding`, `10_Vector_DB`); mục chuyển
Hết hiệu lực phải được gỡ khỏi chỉ mục trong cùng giao dịch.
