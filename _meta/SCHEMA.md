# Lược đồ Hub
`manifest.yaml` (`manlab-aios/process@1.1`): schema, code (MPxx), name, owner, status, standards, legal, capabilities, module, menu_group, menu_order, document, forms.
`menu_group` ∈ DIEU_HANH · NGUON_LUC · KHACH_HANG · KY_THUAT · CHAT_LUONG · DU_LIEU_SO · CONG_NGHE — nhóm menu của module Mxx tương ứng trên nền tảng ManLab; `menu_order` là thứ tự trong nhóm (theo dòng chảy nghiệp vụ, không theo số Mxx). Đây là nguồn sự thật duy nhất của phép gán nhóm — `prisma/seed.ts` đọc lên, không hardcode.
`document`: khối căn cứ của thủ tục đã ban hành — doc_id (ETV.Pxx), doc_title, doc_status (issued · draft), doc_version (lần ban hành), issued_date (YYYY-MM-DD), iso_clauses (điều khoản ISO viện dẫn), controlled_file (tên bản kiểm soát gốc nếu không phải file .md trong 03). Trích từ chính văn bản thủ tục ở `03_MANAGEMENT_SYSTEM/02_P/`, không tự đặt. MP chưa ban hành thủ tục thì bỏ trống cả khối — nền tảng hiển thị "chưa ban hành" thay vì bịa căn cứ.
`forms`: danh sách mã biểu mẫu áp dụng (ETV.P.Fxx.yy); đường dẫn file tương ứng khai ở `links.yaml → form_files`.
`links.yaml`: đường dẫn tương đối tới procedure/iso/module/forms/form_files/skill/law/evidence/capabilities. **Chỉ link, không copy.**

Khối `document` + `forms` là nguồn dữ liệu cho khung Căn cứ pháp lý hiển thị trên mọi trang module của aios-platform (`prisma/seed.ts` → `PlatformModule` → `<CanCuBanner>`).
