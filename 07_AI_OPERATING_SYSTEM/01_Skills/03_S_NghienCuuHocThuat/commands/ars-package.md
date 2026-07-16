# /ars-package — Đóng gói tái lập

**Mục đích:** Tạo gói tái lập cuối: material passport, reproducibility lock và tập hợp đầu ra.

**Khi dùng:** Sau khi qua kiểm toán toàn vẹn cuối, chuẩn bị nộp/lưu trữ.

**Quy trình:**
1. Hoàn tất `templates/MATERIAL_PASSPORT.md`: truy vết nguồn, dữ liệu, thí nghiệm, thiết bị, sản phẩm.
2. Ghi cấu hình tái lập vào `templates/REPRO_LOCK.yaml` theo `shared/reproducibility_lock.md`.
3. Gom dữ liệu/code/hình hoặc nêu lý do hạn chế truy cập; kiểm tra tách raw/processed.
4. Kiểm tra yêu cầu nơi nhận: biểu mẫu, độ dài, đạo đức, disclosure (G14).

**Agent:** `agents/20-reproducibility-engineer.md`, `agents/06-data-steward.md`
**Workflow:** `workflows/15-reproducibility-package.md`
**Đầu ra:** material passport, repro lock, gói tái lập, checklist nộp
**Quality gate:** G13 (Reproducibility), G14 (Submission/Acceptance)

**Nguyên tắc:** Repro lock mô tả cấu hình để tái lập, **không** cam kết đầu ra LLM giống nhau từng byte. Không đóng gói dữ liệu nhạy cảm khi chưa xử lý quyền truy cập.
