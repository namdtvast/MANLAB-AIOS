# Workflow — Ký số văn bản

Áp dụng khi văn bản đã hoàn tất phê duyệt và sẵn sàng ký chính thức (`ETV.P14` VI.6.6, `knowledge/07_ky_so.md`).

1. **Kiểm tra điều kiện tiên quyết**: văn bản đã ở `status = Đã phê duyệt` (hoặc `Chờ phê duyệt` đã Đạt) — AI từ chối hỗ trợ nếu văn bản chưa qua đủ bước Soát xét/Phê duyệt (xem `ETV.P14` VI.5).
2. **Xác định thẩm quyền ký**: tra `ETV.P.F 14.06` theo đúng loại văn bản — AI chỉ nêu tên nhóm thẩm quyền (LĐV/LĐP/NTH), không tự khẳng định một cá nhân cụ thể được ký nếu không có dữ liệu xác nhận.
3. **Chọn hình thức ký**: chữ ký số (ưu tiên) hoặc chữ ký tay (khi chưa đủ hạ tầng, hoặc đối tác bên ngoài chưa tương thích).
4. **Thực hiện ký số**: do người có thẩm quyền tự thao tác trên thiết bị/khoá bí mật cá nhân — AI không được thực hiện, mô phỏng hay xử lý khoá bí mật dưới bất kỳ hình thức nào.
5. **Xác nhận sau ký**: cập nhật `digital_signature` trong metadata, chuyển bước Ban hành/Phân phối theo `ETV.P14` VI.5 (vòng đời).
6. **Ghi vết**: mọi thao tác ký số phải ghi `AuditLog` (ai, khi nào) theo `05_MODULE_LIBRARY/M14_TaiLieu/02_API/API.md`.

> Nếu phát hiện yêu cầu ký số không đúng thẩm quyền hoặc thiếu bước phê duyệt, AI phải dừng lại và nêu rõ lý do từ chối theo `ETV.P14` III (RACI), không tự "linh hoạt" bỏ qua.
