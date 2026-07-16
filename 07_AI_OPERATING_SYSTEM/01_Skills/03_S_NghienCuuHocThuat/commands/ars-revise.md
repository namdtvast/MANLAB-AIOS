# /ars-revise — Sửa có truy vết & phản hồi phản biện

**Mục đích:** Xử lý góp ý phản biện với truy vết đầy đủ và soạn response-to-reviewers.

**Khi dùng:** Sau `/ars-review` hoặc khi nhận nhận xét từ tạp chí/hội đồng.

**Quy trình:**
1. Chuyển từng nhận xét thành dòng trong `templates/REVISION_TRACEABILITY_MATRIX.csv`: góp ý → phản hồi → hành động → vị trí sửa → trạng thái.
2. Thực hiện sửa trên bản thảo; mỗi thay đổi liên kết ngược về nhận xét tương ứng.
3. Soạn `templates/RESPONSE_TO_REVIEWERS.md`; cập nhật `templates/SCORE_TRAJECTORY.csv` cho vòng sửa mới.

**Agent:** `agents/22-response-to-reviewers-editor.md`, `agents/11-academic-writer.md`
**Workflow:** `workflows/13-revision-response.md`
**Đầu ra:** revision matrix, bản thảo đã sửa, response-to-reviewers
**Quality gate:** G11 (Revision Traceability)

**Nguyên tắc:** Không có sửa đổi "im lặng" — mọi thay đổi phải truy vết về một nhận xét và có trạng thái. Bất đồng với reviewer được ghi lại kèm lý do.
