# CLAUDE.md — Hành vi bắt buộc khi tạo/sửa file văn phòng

Khi tạo, sửa, hoặc chuyển đổi bất kỳ file DOCX/XLSX/PPTX/PDF nào, Claude phải luôn thực hiện đủ các bước sau, theo đúng thứ tự. Không bỏ bước, không rút gọn.

## 1. Xác định phạm vi: nội dung hay file vật lý

Nếu yêu cầu liên quan đến **nội dung/pháp lý** của Công văn, Quyết định, Báo cáo, Thông báo, Biên bản (5 loại VB hành chính chuẩn ETV) và nội dung đó **chưa được chốt** → dừng lại, dùng skill `etv-document-governance` trước (`07_AI_OPERATING_SYSTEM/01_Skills/S14_KiemSoatTaiLieu`). Skill này chỉ nhận nội dung đã chốt và sinh file `.docx` đúng chuẩn — không tự soạn thể thức pháp lý của 5 loại đó.

## 2. Hỏi trước khi vẽ (Dual-Track)

Luôn dùng bảng 3 lựa chọn ở `SKILL.md` mục 2 hỏi người dùng trước khi tạo file: **[1]** Chuẩn Hành chính NĐ 30, **[2]** Chuẩn Thẩm mỹ Hiện đại (Brand Kit), **[3]** Chỉ trích xuất Brand & Assets. Không tự đoán track.

Nếu user chỉ gửi content thô (MD/text, không có file mẫu) → bắt buộc chạy quy trình 3 bước của `resources/content_analysis.md` (phân tích → chốt Brand Kit → generate) trước khi generate.

## 3. Track 1 cấm màu sắc

User chọn [1] → nghiêm cấm hàm vẽ màu, callout, font nghệ thuật. Tuân thủ tuyệt đối `standards/nd30.md`. Không trộn format NĐ 30 với format doanh nghiệp trong cùng một file.

## 4. Track 2 phải dùng Node.js

User chọn [2] → dùng `docx`/`exceljs`/`pptxgenjs`, không dùng `python-docx` để sinh file mới. Ngoại lệ: "giữ nguyên format file mẫu, chỉ thay nội dung" → dùng `scripts/extractor/office/unpack.py` + `pack.py`.

## 5. Một schema Brand Kit duy nhất

Mọi script đọc/ghi `brand_kit.json` phải theo schema tại `resources/extractor_docs.md` (khóa màu `dk1, lt1, dk2, lt2, accent1..accent6`). Cấm hardcode mã màu trong script. Cấm dùng `standards/brand_kits/example/` cho tài liệu thật của user — chỉ dùng để test script.

## 6. Sơ đồ và Excel phải "sống"

Cấm copy SmartArt/Chart cũ bằng ảnh (trừ logo). Bóc Data từ file mẫu và vẽ lại bằng code. Mọi ô Excel có tính toán phải dùng Live Formula (`{ formula: '...' }`), không hardcode kết quả.

## 7. QA bắt buộc trước khi giao

Trước khi báo hoàn thành, chạy tối thiểu 1 vòng Generate → Convert sang PDF/ảnh (`scripts/extractor/office/soffice.py`) → soi bằng mắt → Fix → Re-verify. Mọi tổ hợp text/nền phải đạt contrast WCAG. Quy trình đầy đủ tại `resources/generator_docs.md` mục 5.

## 8. Khung DOCX mặc định áp dụng cho mọi track

Body justify + first-line indent 1.25cm + spacing 3pt/3pt + line atLeast 1.3 lần cỡ chữ; đề mục cấp cao nhô trái 1.0cm; bullet dùng `-` (không dùng `•`); bảng full khổ nội dung, cột fit theo content, chữ trong bảng nhỏ hơn body 1-2pt (chi tiết: `standards/dynamic_structure/docx-page-setup.md`, `docx-table.md`, `docx-list-bullet.md`). Brand Kit (Track 2) chỉ đắp lớp màu lên khung này — không được đổi thông số khung.

## 9. Khử dấu vết AI trong dấu câu

Cấm em dash `—` (thay bằng ` - ` hoặc từ nối), cấm dấu hai chấm trong tiêu đề, cấm Oxford comma `, và`. Áp dụng cho mọi text trong DOCX/PPTX/XLSX (chi tiết: `resources/content_analysis.md` mục 3b). Sau generate, đếm kiểm tra `—`, `, và`, và `:` trong heading — phải bằng 0.

## 10. Nội dung phải qua biên tập

Không copy nguyên văn Markdown vào DOCX/PPTX/XLSX. Nội dung phải qua phân tích và biên tập lại theo `resources/content_analysis.md` trước khi đổ vào khung.

## Nguyên tắc bất biến (không được vi phạm trong bất kỳ tình huống nào)

1. Không tự chốt nội dung/thể thức pháp lý của 5 loại VB hành chính chuẩn ETV — đó là phạm vi của `etv-document-governance`.
2. Không tự phê duyệt, ký số hay ban hành văn bản — skill này chỉ sinh file, không quyết định hiệu lực.
3. Mọi output phải nêu rõ đây là **bản dự thảo do AI sinh**, cần người dùng kiểm tra trước khi dùng chính thức.
