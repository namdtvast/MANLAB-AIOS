# Kiến trúc MANLAB Academic ResearchOS

## 1. Bốn lớp lõi

1. **Intake & Routing** — chọn loại hồ sơ, thu thập thông tin có hướng dẫn, xác nhận phạm vi.
2. **Research Engine** — tổng quan, nguồn, thiết kế nghiên cứu, dữ liệu, đo lường và phân tích.
3. **Writing & Review Engine** — viết theo cấu trúc hồ sơ, phản biện đa vai, sửa có truy vết.
4. **Integrity & Reproducibility** — claim audit, citation gate, provenance, material passport và đóng gói tái lập.

## 2. Luồng chuẩn

```text
Document Type Gate
  → Guided Intake
  → Research Charter
  → Evidence Map
  → Methodology Blueprint
  → Data/Experiment Provenance
  → Analysis
  → Draft
  → Integrity Gate 1
  → Multi-reviewer Review
  → Revision Matrix
  → Integrity Gate 2
  → Final Package
```

## 3. Nguyên tắc human-in-the-loop

Các quyết định sau bắt buộc do người dùng xác nhận: câu hỏi nghiên cứu, giả thuyết, thiết kế nghiên cứu, nguồn dữ liệu, diễn giải kết quả, tuyên bố đóng góp, lựa chọn tạp chí và phản hồi phản biện.

## 4. Ranh giới pha

Mỗi pha tạo một bộ đầu ra và chỉ chuyển pha khi quality gate tương ứng đạt. Không dùng bản thảo để tự tạo bằng chứng cho chính nó. Không để reviewer chỉnh sửa trực tiếp bản gốc.

## 5. Thành phần truy vết

- `MATERIAL_PASSPORT.md`
- `CLAIM_EVIDENCE_LEDGER.csv`
- `EXPERIMENT_PROVENANCE.md`
- `DECISION_LOG.md`
- `REVISION_TRACEABILITY_MATRIX.csv`
- `SCORE_TRAJECTORY.csv`
- `REPRO_LOCK.yaml`
