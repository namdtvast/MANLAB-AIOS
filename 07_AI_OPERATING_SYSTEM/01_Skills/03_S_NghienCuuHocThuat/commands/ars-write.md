# /ars-write — Soạn thảo theo loại hồ sơ

**Mục đích:** Viết bản thảo (bài báo, thuyết minh, báo cáo, luận văn) theo đúng cấu trúc loại hồ sơ đã xác nhận.

**Khi dùng:** Khi câu hỏi, phương pháp và bằng chứng đã sẵn sàng.

**Quy trình:**
1. Xác nhận cấu trúc đầu ra theo `document-types/` của loại hồ sơ; mẫu chính thức của cơ quan tiếp nhận **ưu tiên hơn** template repo.
2. Soạn theo `templates/05_MANUSCRIPT.md`; mỗi claim quan trọng phải trỏ tới evidence/experiment ID trong `templates/CLAIM_EVIDENCE_LEDGER.csv`.
3. Dựng bảng/biểu và chú thích; nêu rõ giới hạn, không phóng đại.
4. Hoàn tất `templates/AI_USE_DISCLOSURE.md`.

**Agent:** `agents/11-academic-writer.md`, `agents/19-visualization-editor.md`, `agents/23-claim-evidence-mapper.md`
**Workflow:** `workflows/02-international-paper.md`, `workflows/09-national-journal-paper.md`, `workflows/12-thesis-dissertation.md`, `workflows/06-specialist-report.md`
**Đầu ra:** bản thảo có claim gắn evidence, tuyên bố sử dụng AI
**Quality gate:** G08 (Claim Support), G09 (Writing)

**Nguyên tắc:** Chỉ dùng claim/evidence đã được phép. Không bịa số liệu/kết quả; dữ liệu mô phỏng phải dán nhãn, không trình bày như dữ liệu thực nghiệm.
