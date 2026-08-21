# Security Checklist (dùng trong VERIFY)

Kiểm tra từng mục áp dụng được cho thay đổi hiện tại — không cần đủ mọi mục nếu không liên quan, nhưng phải nêu rõ mục nào `NOT APPLICABLE` và vì sao.

- [ ] **Authentication** — endpoint/action mới có yêu cầu xác thực đúng như thiết kế không?
- [ ] **Authorization** — có kiểm tra quyền đúng vai trò/scope, không chỉ dựa vào ẩn URL?
- [ ] **IDOR** — object ID trong request có bị đối tượng không sở hữu truy cập được không?
- [ ] **Input validation** — mọi input từ người dùng/hệ thống ngoài đều được validate ở boundary?
- [ ] **SQL injection** — mọi truy vấn dùng parameterized query/ORM an toàn, không nối chuỗi SQL từ input?
- [ ] **XSS** — output ra HTML có được escape/sanitize đúng?
- [ ] **CSRF** — action có side-effect (POST/PUT/DELETE) có bảo vệ CSRF khi cần?
- [ ] **SSRF** — nếu server gọi URL do người dùng cung cấp, có giới hạn đích hợp lệ?
- [ ] **Path traversal** — thao tác file có validate path, không cho `../` thoát khỏi thư mục cho phép?
- [ ] **File upload validation** — kiểm tra loại file, kích thước, nội dung thật (không chỉ tin đuôi file)?
- [ ] **Mass assignment** — request body không thể ghi đè field nhạy cảm (role, ownerId, status) ngoài ý muốn?
- [ ] **Insecure deserialization** — không deserialize dữ liệu không tin cậy thành object thực thi được?
- [ ] **Secret exposure** — không có API key/token/password hard-code hoặc log ra console/file?
- [ ] **Sensitive logging** — log không chứa PII, mật khẩu, token, hoặc dữ liệu đo lường/kết quả nhạy cảm chưa được phép công bố?
- [ ] **PII trong export** — file export (CSV/PDF/report) không rò rỉ PII ngoài phạm vi được phép?
- [ ] **Background-job authorization** — job chạy nền có kiểm tra quyền của người khởi tạo, không chạy với quyền cao hơn ngữ cảnh gốc?
- [ ] **Export authorization** — chức năng export/tải xuống có kiểm tra quyền như chức năng xem?
- [ ] **Rate limiting** — endpoint nhạy cảm (login, OTP, tra cứu hàng loạt) có giới hạn tần suất?

## Riêng MANLAB-AIOS / ISO 42001

- [ ] Nếu thay đổi liên quan agent/skill AI: có đảm bảo **AI không tự ra kết luận đo lường cuối cùng hoặc tự phê duyệt chứng chỉ/kết quả** (ràng buộc bắt buộc theo MP29, ghi trong `07_AI_OPERATING_SYSTEM/01_Skills/README.md`)?
- [ ] Nếu thay đổi thêm agent triển khai mới: đã có hồ sơ AIA (AI Impact Assessment) theo MP29 chưa, hay cần tạo?
- [ ] Không đưa dữ liệu cá nhân/mật vào prompt hoặc cấu hình skill (đúng ràng buộc "KHÔNG lưu ở đây" của tầng `07_AI_OPERATING_SYSTEM`).
