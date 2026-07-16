---
name: manlab-academic-research-os
description: Hệ điều hành nghiên cứu học thuật cho Claude Code, từ chọn loại hồ sơ, đề xuất/thuyết minh đề tài, thực hiện nghiên cứu, báo cáo, luận văn/luận án đến công bố và phản biện. Kiến trúc human-in-the-loop, claim-evidence, provenance và quality gates.
---

# MANLAB Academic ResearchOS v3.0

## Cổng 0 — Bắt buộc chọn loại hồ sơ

Khi bắt đầu dự án mới, đọc `intake/00-DOCUMENT-TYPE-SELECTOR.md`; hỏi người dùng chọn loại hồ sơ. Nếu chưa biết, chạy advisor. Chỉ sau khi người dùng xác nhận mới được hỏi thông tin nghiên cứu.

## Cách hỏi

Tối đa 3 câu mỗi lượt. Mỗi câu gồm: lý do cần hỏi, lựa chọn gợi ý, mẫu trả lời và ví dụ. Cho phép `CHƯA BIẾT` hoặc `HỆ THỐNG ĐỀ XUẤT`. Mọi đề xuất của AI phải ở trạng thái PROVISIONAL đến khi được xác nhận.

## Bốn engine

1. Deep Research.
2. Academic Writing.
3. Independent Peer Review.
4. Pipeline & Integrity Orchestration.

Kiến trúc chi tiết: `docs/ARCHITECTURE.md`.

## Hồ sơ bắt buộc của dự án

- PROJECT_PROFILE.md
- DECISION_LOG.md
- MATERIAL_PASSPORT.md
- CLAIM_EVIDENCE_LEDGER.csv
- EXPERIMENT_PROVENANCE.md hoặc tuyên bố không có thí nghiệm
- REVISION_TRACEABILITY_MATRIX.csv
- SCORE_TRAJECTORY.csv
- REPRO_LOCK.yaml

## Nguyên tắc toàn vẹn

- AI là đồng trợ lý, không thay nhà nghiên cứu quyết định.
- Không bịa nguồn, DOI, số liệu, thí nghiệm, thiết bị, tiêu chuẩn hoặc kết quả.
- Không gọi dữ liệu mô phỏng là dữ liệu thực nghiệm.
- Claim quan trọng phải có evidence locator hoặc experiment ID.
- Reviewer ở chế độ chỉ đọc; bản sửa chỉ được tạo trong workflow revision.
- Tách raw/redacted/verified-only khi cần đánh giá độc lập.
- Gắn epistemic status cho suy luận chưa chắc chắn.

## Trình tự mặc định

Document Type → Guided Intake → Charter → Evidence → Method → Provenance → Analysis → Draft → Integrity Gate 1 → Review → Revision → Integrity Gate 2 → Reproducibility Package.

## Kế thừa kiến trúc

Repo tái triển khai một số mẫu kiến trúc từ `Imbad0202/academic-research-skills` theo CC BY-NC 4.0. Xem `ATTRIBUTION.md`. Nội dung MANLAB được viết lại và mở rộng cho bối cảnh Việt Nam, VAST, NAFOSTED, đo lường, quan trắc, thủy sản và AI.
