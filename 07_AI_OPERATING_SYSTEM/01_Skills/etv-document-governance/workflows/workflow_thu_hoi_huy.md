# Workflow — Thu hồi, Thanh lý, Hủy bỏ

Áp dụng khi văn bản hết hiệu lực/cần loại khỏi kiểm soát (`ETV.P14` VI.10).

1. **Xác định loại xử lý** — quan trọng, không nhầm lẫn:
   - **Thanh lý** = chuyển `status → Hết hiệu lực`, văn bản vẫn được lưu, có thể giữ tham khảo với dấu "TÀI LIỆU KHÔNG KIỂM SOÁT". Thẩm quyền: LĐP.
   - **Hủy bỏ** = loại văn bản khỏi phạm vi kiểm soát hoàn toàn. Thẩm quyền: **chỉ LĐV**, bắt buộc lý do bằng văn bản.
2. **Lập phiếu đề nghị** (`ETV.P.F 14.05`), chọn đúng loại đề nghị (Thanh lý/Hủy bỏ).
3. **Thu hồi bản đang lưu hành**: lập `ETV.P.F 14.04` thu hồi các bản đã phân phối trước đó (nếu văn bản có bản giấy đang lưu hành).
4. **Cập nhật trạng thái điện tử**: `status → Hết hiệu lực/Hủy` trên ManLab, kèm `reason` bắt buộc.
5. **Xử lý bản giấy**: đóng dấu "TÀI LIỆU KHÔNG KIỂM SOÁT" (nếu giữ tham khảo) hoặc cắt góc phải/tiêu hủy theo quy định (nếu hủy hẳn).
6. **Lưu hồ sơ**: theo `ETV.P15`, thời hạn tối thiểu theo `ETV.P.F 14.06`.

> AI chỉ soạn phiếu đề nghị và tóm tắt tình trạng — **không** tự đề xuất chuyển trạng thái mà không có phiếu đề nghị đã được người có thẩm quyền xác nhận.
