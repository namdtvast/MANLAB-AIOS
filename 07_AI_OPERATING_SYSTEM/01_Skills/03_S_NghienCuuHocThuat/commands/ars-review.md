# /ars-review — Phản biện độc lập (chỉ đọc)

**Mục đích:** Đánh giá bản thảo bằng phản biện đa vai ở chế độ chỉ đọc, không sửa nội dung.

**Khi dùng:** Sau khi có bản thảo hoàn chỉnh; trước revision hoặc trước khi nộp.

**Quy trình:**
1. Nạp bản thảo ở chế độ **read-only**; nếu cần, tách raw/redacted/verified-only để đánh giá độc lập (`shared/ground_truth_isolation.md`).
2. Phản biện theo nhiều vai: phương pháp, thống kê, đạo đức, tính toàn vẹn; ghi cả ý kiến trái chiều.
3. Ghi nhận xét + xung đột vào `templates/06_REVIEW_LOG.md`; cập nhật điểm vào `templates/SCORE_TRAJECTORY.csv`.

**Agent:** `agents/12-peer-reviewer.md`, `agents/14-integrity-auditor.md`, `agents/21-ethics-compliance-reviewer.md`
**Workflow:** `workflows/00-master-workflow.md` (pha Review)
**Đầu ra:** review log, score trajectory, danh sách vấn đề cần xử lý
**Quality gate:** G10 (Independent Review)

**Nguyên tắc:** Reviewer **không** tự sửa bản thảo — chỉ tạo bản sửa trong `/ars-revise`. Ghi rõ xung đột lợi ích và điểm chưa chắc chắn (epistemic status).
