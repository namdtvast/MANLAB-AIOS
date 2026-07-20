# Tri thức — Căn cứ ISO

> Bản đầy đủ tiêu chuẩn: `03_MANAGEMENT_SYSTEM/`. Bảng ánh xạ toàn hệ thống: `11_COMPLIANCE/01_ISO_Mapping/MP-ISO-mapping.md`.

| Chuẩn | Điều khoản dùng cho kiểm soát tài liệu | Khi nào áp dụng |
|---|---|---|
| ISO 9001:2015 | §7.5 Thông tin dạng văn bản | Luôn áp dụng — nền tảng chung mọi văn bản HTQL |
| ISO/IEC 17025:2017 | §8.3 Kiểm soát tài liệu | Luôn áp dụng — chuẩn chính của ETV (phòng thử nghiệm/hiệu chuẩn) |
| ISO 17034:2016 | §8.3 (cấu trúc tương đương ISO/IEC 17025) | Khi văn bản liên quan năng lực sản xuất chất chuẩn (CAP-12, MP19/20/23) |
| ISO/IEC 17043 | Toàn bộ (nếu áp dụng) | **Chỉ khi** ETV chính thức vận hành chương trình thử nghiệm thành thạo (PT provider) — hiện chưa có trong `02_CAPABILITIES`; không tự ý áp dụng, xác nhận với Lãnh đạo Viện trước |
| ISO/IEC 27001:2022 | A.5.9–A.5.14 (phân loại thông tin), A.5.15–A.5.18 (kiểm soát truy cập), A.5.37 (thủ tục vận hành dạng văn bản), A.8.13 (sao lưu) | Khi văn bản liên quan phân quyền, sao lưu, phân loại mật/công khai |
| ISO/IEC 42001:2023 | §7.5 Thông tin dạng văn bản (của HTQL AI) | Khi văn bản mô tả/ghi nhận hoạt động của chính Skill AI này hoặc agent khác trong `07_AI_OPERATING_SYSTEM` |

## Quy tắc chọn điều khoản

1. Luôn ghi **số điều khoản cụ thể** (vd. "§8.3", "A.5.37"), không chỉ nêu tên chuẩn.
2. Một văn bản có thể dẫn nhiều điều khoản của nhiều chuẩn cùng lúc (vd. Thủ tục kiểm soát tài liệu → ISO 9001 §7.5 + ISO/IEC 17025 §8.3 + ISO/IEC 27001 A.5.37).
3. Không suy đoán áp dụng ISO 17043 mặc định — đây là chuẩn có điều kiện, cần xác nhận phạm vi năng lực thực tế trước.
4. Khi không chắc điều khoản chính xác, đề nghị người dùng xác nhận thay vì đoán số điều khoản.
