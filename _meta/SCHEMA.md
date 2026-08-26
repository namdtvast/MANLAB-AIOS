# Lược đồ Hub
`manifest.yaml` (`manlab-aios/process@1.2`): schema, code (MPxx), name, purpose, owner, status, standards, legal, capabilities, module, menu_group, menu_order, document, forms.
`menu_group` ∈ DIEU_HANH · NGUON_LUC · KHACH_HANG · KY_THUAT · CHAT_LUONG · DU_LIEU_SO · CONG_NGHE — nhóm menu của module Mxx tương ứng trên nền tảng ManLab; `menu_order` là thứ tự trong nhóm (theo dòng chảy nghiệp vụ, không theo số Mxx). Đây là nguồn sự thật duy nhất của phép gán nhóm — `prisma/seed.ts` đọc lên, không hardcode.
`purpose`: mục tiêu cô đọng của thủ tục — một câu trả lời cho "thủ tục (module) này dùng để làm gì", chắt từ mục **MỤC ĐÍCH** của chính văn bản `ETV.Pxx`, không tự đặt. MP chưa ban hành thủ tục thì bỏ trống — banner để trống dòng Mục tiêu thay vì bịa.
`document`: khối căn cứ của thủ tục đã ban hành — doc_id (ETV.Pxx), doc_title, doc_status (issued · draft), doc_version (lần ban hành), issued_date (YYYY-MM-DD), iso_clauses (điều khoản ISO viện dẫn), controlled_file (tên bản kiểm soát gốc nếu không phải file .md trong 03). Trích từ chính văn bản thủ tục ở `03_MANAGEMENT_SYSTEM/02_P/`, không tự đặt. MP chưa ban hành thủ tục thì bỏ trống cả khối — nền tảng hiển thị "chưa ban hành" thay vì bịa căn cứ.
`forms`: danh sách mã biểu mẫu áp dụng (ETV.P.Fxx.yy); đường dẫn file tương ứng khai ở `links.yaml → form_files`.
`links.yaml`: đường dẫn tương đối tới procedure/iso/module/forms/form_files/skill/law/evidence/capabilities. **Chỉ link, không copy.**

Khóa `purpose` + khối `document` + `forms` là nguồn dữ liệu cho khung Căn cứ pháp lý hiển thị trên mọi trang module của aios-platform (`prisma/seed.ts` → `PlatformModule` → `<CanCuBanner>`).

# Lược đồ HDSD của module
`05_MODULE_LIBRARY/Mxx_Slug/04_UI/HDSD.yaml` (`manlab-aios/hdsd@1.0`): schema, module (Mxx), summary, steps, tips.
`steps`: danh sách bước theo đúng thứ tự thao tác, mỗi bước gồm `role` (vai trò thực hiện, ghi bằng nhãn đọc được), `action` (việc phải làm, thể mệnh lệnh), `path` (đường dẫn màn hình trong nền tảng — tùy chọn, bắt buộc bắt đầu bằng `/modules/Mxx`), `note` (ràng buộc/điều kiện chặn của bước — tùy chọn).
`summary`: một câu trả lời cho "module này dùng khi nào". `tips`: lưu ý chung không gắn với bước nào.

HDSD là hướng dẫn thao tác **trên màn hình** nên đặt ở tầng `05` (số hóa), không nằm trong khối `document` của thủ tục ở tầng `04`. Nội dung mỗi bước phải bám đúng luật đã cài trong `src/lib/mxx/rules.ts` và thủ tục `ETV.Pxx` — sửa quy tắc thì sửa thủ tục trước (MP14), rồi `rules.ts`, rồi HDSD.

`prisma/seed.ts` đọc file này, kiểm tra bằng `parseHdsd()` (`src/lib/hdsd.ts`) rồi nạp vào `PlatformModule.hdsd` → mục "Hướng dẫn sử dụng" trong `<CanCuBanner>`. Sai lược đồ thì **dừng seed** kèm tên file. Kiểm tra toàn bộ file mà không cần Postgres:

```bash
cd 09_ENGINEERING/aios-platform && npm run kiem-tra-hdsd
```
