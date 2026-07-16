# /ars-lit-review — Tổng quan & bản đồ bằng chứng

**Mục đích:** Xây chiến lược tìm kiếm, lập literature matrix, evidence map và xác minh nguồn.

**Khi dùng:** Sau khi câu hỏi nghiên cứu đã rõ; hoặc khi cần tổng quan hệ thống (PRISMA).

**Quy trình:**
1. Chốt phạm vi, từ khóa, tiêu chí chọn/loại và nguồn dữ liệu (theo `knowledge/SOURCE_HIERARCHY.md`).
2. Điền `templates/LITERATURE_MATRIX.csv`; với tổng quan hệ thống, theo dõi luồng PRISMA.
3. Xác minh từng nguồn cốt lõi; ghi locator theo `references/citation_locator_standard.md`.
4. Ánh xạ nguồn → claim trong `templates/CLAIM_EVIDENCE_LEDGER.csv`.

**Agent:** `agents/02-literature-reviewer.md`, `agents/03-source-verifier.md`, `agents/15-prisma-coordinator.md`
**Workflow:** `workflows/01-systematic-review.md`, `workflows/10-review-paper.md`, `workflows/11-meta-analysis.md`
**Đầu ra:** literature matrix, evidence map, danh sách nguồn đã xác minh
**Quality gate:** G03 (Evidence)

**Nguyên tắc:** Không bịa DOI/nguồn. Nguồn chưa xác minh phải gắn `PROVISIONAL`; không đưa vào claim chính khi chưa có locator.
