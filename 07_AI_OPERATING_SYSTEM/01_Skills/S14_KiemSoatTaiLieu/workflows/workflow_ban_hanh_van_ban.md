# Workflow — Ban hành văn bản mới

Áp dụng khi có nhu cầu xây dựng văn bản mới (không phải soát xét văn bản hiện có). Tương ứng `ETV.P14` VI.5 (Vòng đời văn bản — quy trình thực hiện).

1. **Đề xuất**: lập `ETV.P.F 14.01`. AI hỗ trợ: gợi ý loại văn bản, mã số dự kiến (`knowledge/03_ma_hoa_van_ban.md`), điều khoản ISO/pháp lý liên quan (`knowledge/01_phap_luat.md`, `knowledge/02_iso.md`).
2. **Thẩm định** (LĐP): AI không tham gia quyết định "cần thiết hay không" — chỉ tóm tắt đề xuất để LĐP quyết định.
3. **Soạn thảo** (NTH): AI hỗ trợ dựng khung từ `templates/` tương ứng, điền metadata theo `knowledge/04_metadata_schema.md`, `status: Nháp`.
4. **Soát xét** (LĐP): chạy `validation/checklist_document_review.md` + checklist chuyên đề phù hợp (`checklist_legal_compliance.md`/`checklist_iso_compliance.md`/`checklist_procedure.md`). AI có thể tự chạy trước và báo cáo kết quả, LĐP quyết định Đạt/Không đạt.
5. **Phê duyệt** (LĐV): AI không tham gia — chỉ chuẩn bị bản tổng hợp để trình ký.
6. **Ban hành**: chạy `validation/checklist_document_release.md`. Văn thư/QLCL cấp mã chính thức, cập nhật `ETV.P.F 14.02`/`.03`.
7. **Phân phối & công bố**: lập `ETV.P.F 14.04`; AI có thể soạn nội dung phổ biến nhưng không tự gửi/phân phối thay người có thẩm quyền.
8. **Lưu hồ sơ**: theo `ETV.P15`.

> Ở mọi bước, AI chỉ tạo **bản dự thảo/gợi ý**; chuyển trạng thái thực tế trên ManLab do người có thẩm quyền thực hiện.
