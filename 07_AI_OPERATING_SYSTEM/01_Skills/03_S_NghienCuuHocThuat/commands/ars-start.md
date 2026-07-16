# /ars-start — Khởi tạo hồ sơ học thuật

**Mục đích:** Mở một dự án nghiên cứu mới, đi qua Cổng 0 (chọn loại hồ sơ) rồi guided intake.

**Khi dùng:** Bắt đầu bất kỳ dự án nào chưa có `PROJECT_PROFILE.md`.

**Quy trình:**
1. Đọc `intake/00-DOCUMENT-TYPE-SELECTOR.md`, yêu cầu người dùng chọn loại hồ sơ (mã A–F hoặc mô tả). Nếu `00`/chưa rõ → chạy `intake/01-DOCUMENT-TYPE-ADVISOR.md`.
2. **Chờ người dùng xác nhận loại hồ sơ** trước khi hỏi tiếp (ghi vào `templates/00_DOCUMENT_TYPE_CONFIRMATION.md`).
3. Guided intake theo `templates/00_PROJECT_INTAKE_GUIDED.md`: tối đa 3 câu/lượt, mỗi câu có gợi ý + ví dụ.
4. Lập `templates/00_PROJECT_CHARTER.md`; khởi tạo cấu trúc dự án bằng `scripts/init_project.py <target> --type <MÃ>`.

**Agent:** `agents/01-research-director.md`
**Workflow:** `workflows/00-intake-and-onboarding.md`, `workflows/00-master-workflow.md`
**Đầu ra:** `PROJECT_PROFILE.md`, `DECISION_LOG.md`, bộ template khởi tạo
**Quality gate:** G00 (Document Type), G01 (Intake Completeness)

**Nguyên tắc:** Không hỏi thông tin nghiên cứu khi loại hồ sơ chưa được xác nhận. Mọi đề xuất của AI ở trạng thái `PROVISIONAL` cho tới khi người dùng chốt.
