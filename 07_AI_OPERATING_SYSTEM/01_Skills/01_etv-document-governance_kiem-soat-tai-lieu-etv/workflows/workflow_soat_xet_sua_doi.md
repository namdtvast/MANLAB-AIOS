# Workflow — Soát xét & sửa đổi văn bản hiện hành

Áp dụng khi văn bản đã ban hành cần sửa đổi/bổ sung, hoặc đến kỳ soát xét định kỳ (`ETV.P14` VI.9).

1. **Xác định lý do soát xét**: theo yêu cầu phát sinh (lỗi, thay đổi thực tế) hoặc đến hạn định kỳ (tối đa 36 tháng kể từ `effective_date`). AI kiểm tra `effective_date` + 36 tháng để cảnh báo nếu được hỏi.
2. **Lập phiếu đề nghị soát xét** (`ETV.P.F 14.01`), ghi rõ mã văn bản hiện hành, lần ban hành hiện tại.
3. **So sánh nội dung cũ/mới**: AI liệt kê rõ các thay đổi (thêm/sửa/xoá mục nào) để LĐP dễ đối chiếu — không tự ý viết lại toàn bộ nếu chỉ cần sửa cục bộ.
4. **Kiểm tra tác động dây chuyền**: nếu văn bản này được `related_documents`/`supersedes` bởi văn bản khác, liệt kê các văn bản cần rà soát theo (đặc biệt khi thay đổi căn cứ pháp lý/ISO — xem `ETV.P14` VI.9).
5. **Soát xét — Phê duyệt — Ban hành lại**: theo đúng `workflow_ban_hanh_van_ban.md` bước Soát xét/Phê duyệt/Ban hành (tương ứng `ETV.P14` VI.5), với lần ban hành tăng +1.
6. **Cập nhật liên kết**: văn bản mới điền `supersedes` trỏ bản cũ; nhắc người có thẩm quyền cập nhật `superseded_by` của bản cũ.
7. **Thu hồi bản cũ**: `ETV.P.F 14.04`.

> Nếu soát xét chỉ ở mức biểu mẫu (thủ tục/hướng dẫn cha chưa ban hành lại): chỉ cập nhật ngày soát xét ở footer biểu mẫu, không tăng lần ban hành của văn bản cha (xem `ETV.P14` VI.5).
