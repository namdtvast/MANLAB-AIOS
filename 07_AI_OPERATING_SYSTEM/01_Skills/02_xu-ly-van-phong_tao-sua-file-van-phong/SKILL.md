---
name: xu-ly-van-phong
description: "TẠO, SỬA, CHUYỂN ĐỔI FILE VĂN PHÒNG (WORD, EXCEL, POWERPOINT, PDF) THEO KIẾN TRÚC 2 CHIỀU. Chiều Đọc bóc tách Brand Kit (màu sắc, font, logo) và Data từ file mẫu; Chiều Ghi tái tạo file mới bằng Node.js mang Brand DNA. Hỗ trợ 2 luồng xuất bản - Chuẩn Hành chính NĐ 30 (đen trắng, nghiêm ngặt) và Chuẩn Thẩm mỹ Hiện đại (Brand Kit linh hoạt). Kích hoạt khi user đề cập 'soạn công văn', 'tạo file word', 'làm slide', 'tạo bảng tính', 'cắt file pdf'; yêu cầu 'tạo báo cáo', 'làm đề xuất', 'bóc tách format file này', 'bắt chước format file này', 'xuất bản sách', 'chuyển sang word'; nói 'gộp file', 'tách trang', 'đổi sang pdf', 'format cho đẹp', 'chuyển file md này thành word/excel/slide'; trong tình huống user gửi file Word/Excel/PDF/Slide kèm yêu cầu chỉnh sửa, gửi file MD/text thô cần chuyển thành tài liệu chuyên nghiệp, hoặc cần tạo tài liệu từ đầu. KHÔNG dùng cho viết nội dung bài viết (skill này chỉ chuyên thiết kế và cấu trúc file), lập trình phần mềm, đăng bài mạng xã hội. Đây là lớp KỸ THUẬT sinh file — nội dung/pháp lý của 5 loại văn bản hành chính chuẩn ETV (Công văn, Quyết định, Báo cáo, Thông báo, Biên bản) do skill etv-document-governance quyết định. Dùng cho MỌI nghiệp vụ tạo và xử lý file văn phòng — kể cả khi user chỉ gửi 1 file và nói 'xử lý giúp tôi'."
argument-hint: "[loại file: docx|pptx|xlsx|pdf] [hành động: tạo|sửa|chuyển đổi|bóc tách]"
license: Internal-ETV
metadata:
  author: Nguyễn Duy Tùng
  version: "2.0.0"
  maintainer: ETV-AIOS
---

# Xử lý Văn phòng 2.0 (Bi-directional Pipeline)

Skill xử lý toàn diện file văn phòng (DOCX, XLSX, PPTX, PDF). Hệ thống hoạt động theo **Kiến trúc Song song 2 Chiều (Extractor & Generator)**: bóc tách Dữ liệu/Giao diện từ file cũ và vẽ lại hoàn toàn bằng Code.

> **Hành vi bắt buộc:** xem `CLAUDE.md` trước khi tạo/sửa bất kỳ file văn phòng nào — không được bỏ qua bước hỏi Dual-Track hay QA loop.

---

## 0. Quan hệ với `etv-document-governance`

Hai skill chia nhau đúng một ranh giới: **nội dung/pháp lý** vs **file vật lý**.

| | `etv-document-governance` | `xu-ly-van-phong` (skill này) |
|---|---|---|
| Trả lời câu hỏi | Văn bản này viết gì, căn cứ luật nào, mã hoá ra sao, ai được ký? | File `.docx/.pptx/.xlsx` này trình bày thế nào cho đúng NĐ 30 / Brand Kit? |
| Sở hữu | Nội dung, metadata, thể thức pháp lý của Công văn, Quyết định, Báo cáo, Thông báo, Biên bản, Thủ tục, Quy trình, Hướng dẫn, Biểu mẫu, Giấy chứng nhận | Toàn bộ pipeline OOXML: bóc tách Brand Kit, sinh file Node.js, convert, PDF, thiết kế Track 2 |
| Khi nào gọi skill kia | Cần xuất file `.docx` thật từ nội dung đã soạn → gọi `xu-ly-van-phong` | Nội dung 1 trong 5 loại VB hành chính chuẩn chưa được chốt → gọi `etv-document-governance` trước |

Với **Công văn, Quyết định, Báo cáo, Thông báo, Biên bản**: lấy khung nội dung + metadata từ `etv-document-governance/templates/`, chỉ dùng `standards/nd30.md` (mục "Biến thể kỹ thuật theo loại văn bản") để biết cách trình bày. Không tự bịa lại cấu trúc nội dung của 5 loại này trong skill này.

Với **Kế hoạch, Tờ trình, Giấy mời/Ủy quyền, Đề xuất** và các loại VB không có template riêng: dùng `templates/` của skill này (`etv-document-governance` chưa có).

---

## 1. Nguyên lý Hoạt động Cốt lõi (2 Chiều)

Mọi tài liệu đi qua hệ thống đều phân tách rõ Tầng Dữ liệu (Content) và Tầng Hiển thị (UI/Theme). Không sửa trực tiếp trên file xấu — bóc tách Data rồi sinh file mới.

### Chiều Đọc & Bóc tách (The Extractor) — Python

1. **Content:** Cào text thô, con số, công thức (markitdown, openpyxl, pdfplumber).
2. **Brand Kit (UI):** Chạy `scripts/extractor/extract_brand.py` — đọc `theme1.xml`, xuất `brand_kit.json` theo **schema chuẩn duy nhất** (khóa màu `dk1, lt1, dk2, lt2, accent1..accent6` — xem `resources/extractor_docs.md`).
3. **Assets:** Trích ảnh/logo từ `media/` ra `assets/`. Bóc Data từ biểu đồ/sơ đồ (không copy hình chết).

### Chiều Ghi & Tái tạo (The Generator) — Node.js

1. **Global Styles:** Nạp `brand_kit.json` vào Document Styles / Header Styles / Slide Master.
2. **Tái tạo Assets:** Nhúng ảnh từ `assets/` (kiểm tra tồn tại trước). Vẽ lại sơ đồ/biểu đồ dạng "sống".
3. **Đổ Content:** Đưa dữ liệu thô vào khung đã cấu hình Brand DNA và xuất bản.

---

## 2. Đường ray Đôi (Dual-Track) & Agent Workflow

**TỐI QUAN TRỌNG:** Agent KHÔNG ĐƯỢC tự ý đoán luồng định dạng. Trước khi tạo file, bắt buộc hỏi người dùng chọn 1 trong 3 tùy chọn:

| Lựa chọn | Luồng Thực thi | Ứng dụng | Kỹ thuật & Rào cản |
|:---:|---|---|---|
| **[1]** | **Chuẩn Hành chính Quốc gia (NĐ 30)** | Công văn, Tờ trình, Quyết định nhà nước | **Đen/Trắng tuyệt đối.** Cấm Brand Kit. Times New Roman, lề chuẩn (Trái 3, Phải 1.5, Trên/Dưới 2), header Quốc hiệu 2 cột. Theo `standards/nd30.md` + `templates/` (hoặc `etv-document-governance/templates/` cho 5 loại chuẩn) |
| **[2]** | **Chuẩn Thẩm mỹ Hiện đại (Doanh nghiệp)** | Đề xuất, Pitch Deck, Báo cáo nội bộ, Tài liệu quy trình | **Kích hoạt Brand Kit.** Dùng Node.js Generator (`docx`, `exceljs`, `pptxgenjs`). Bảng zebra, callout box, nhúng logo và màu công ty |
| **[3]** | **Trích xuất Brand & Assets (chỉ bóc tách)** | Cào file mẫu lấy format làm chuẩn về sau | Chỉ chạy Extractor: `extract_brand.py` → `brand_kit.json` + `assets/`. Báo cáo thông số bóc được |

### Nhánh đặc biệt: User chỉ đưa CONTENT (file MD, text) — không có file mẫu

Đây là tình huống thường gặp nhất. KHÔNG được nhảy thẳng vào generate. Làm theo quy trình 3 bước trong `resources/content_analysis.md`:

1. **Phân tích content** → lập Kế hoạch Thiết kế (chia slide/sheet/heading, bảng nào thành chart, số nào thành callout) và trình user duyệt.
2. **Chốt Brand Kit** → đề xuất 2-3 preset từ thư viện 10 bộ (`standards/brand_kits/README.md` — phân loại sáng/tối, nóng/lạnh/trung tính, cổ điển/hiện đại), hoặc nhận màu/logo user cung cấp. **CẤM dùng `brand_kits/example/` cho tài liệu user thật.** Khi ETV/ManLab có bộ nhận diện chính thức (`06_SHARED_RESOURCES/13_Branding/`), ưu tiên bóc từ đó bằng `extract_brand.py` thay vì 10 preset trung tính.
3. **Generate + QA loop.**

Ngoài các track trên, nghiệp vụ PDF (cắt/ghép/trích/convert) làm theo `resources/pdf.md` và `resources/convert.md` — xử lý cục bộ, không upload cloud.

---

## 3. Kiến trúc Vật lý của Skill

### Tầng 1: Tài liệu Hướng dẫn (`resources/`)

| File | Nội dung |
|---|---|
| `extractor_docs.md` | Bóc Brand Kit & Data bằng Python/XML Unpack. **Chứa schema chuẩn brand_kit.json** |
| `generator_docs.md` | Sinh file bằng Node.js từ Brand Kit. QA loop bắt buộc |
| `content_analysis.md` | **Content Analyzer** — quy tắc phân tích MD/text thô và map sang DOCX/XLSX/PPTX khi không có file mẫu |
| `xlsx.md` | Nguyên tắc Excel: Live Formula, Zero Error, column width chuẩn |
| `pptx.md` | Nguyên tắc slide: yếu tố thị giác, cỡ chữ, layout, QA visual |
| `pdf.md` | PDF digital vs scan, cắt/ghép/trích, PDF→DOCX |
| `convert.md` | Pipeline MD→DOCX (Pandoc), PDF→DOCX, DOCX→PDF |

### Tầng 2: Tiêu chuẩn (`standards/`)

- `nd30.md`: (Track 1) Bộ luật cứng cho văn bản nhà nước + bảng biến thể kỹ thuật theo loại VB (thay cho template riêng của 5 loại đã chuyển sang `etv-document-governance`).
- `brand_kits/`: (Track 2) Thư mục "sống" — mỗi doanh nghiệp 1 folder con gồm `brand_kit.json` + `assets/`. Có sẵn **10 preset** phân loại theo tông màu (xem `brand_kits/README.md`) và `example/` (chỉ dùng test script).
- `dynamic_structure/`: 11 file quy chuẩn bố cục (page-setup, typography, heading, table, cover, header-footer, caption, list, special-blocks, xlsx-structure, pptx-structure) — nhận tham số màu/font từ Brand Kit.

### Tầng 3: Kịch bản Thực thi (`scripts/`)

- `extractor/extract_brand.py`: Bóc Brand Kit từ file Office bất kỳ.
- `extractor/office/`: Toolkit XML — unpack, pack, clone_text, validate, soffice.
- `extractor/convert/` + `extractor/format/`: Convert MD/PDF→DOCX, post-process Pandoc.
- `generator/template_docx.js`, `generator/template_xlsx.js`, `generator/template_pptx.js`: 3 khung Node.js sinh file từ `brand_kit.json` — dùng làm điểm khởi đầu, mở rộng theo yêu cầu.
- Cài đặt: `pip install -r scripts/requirements.txt` (Python) và `npm install` trong `scripts/generator/` (Node.js) — xem `package.json`.

### Tầng 4: Templates & Examples

- `templates/`: khung nội dung cho các loại VB **chưa có** trong `etv-document-governance` — template chung, kế hoạch, tờ trình, giấy mời/ủy quyền, đề xuất. Xem `templates/README.md` cho ranh giới đầy đủ.
- `examples/`: 6 file tham chiếu, mở xem để "nhìn thấy" đích đến trước khi tạo file mới. Gồm 4 file sinh bằng chính skill này theo khung mặc định (`docx-mau-khung-chuan` đen trắng, `docx-mau-de-xuat-brand` Track 2 đủ bìa/callout/bảng màu, `pptx-mau-brand` 5 layout slide, `xlsx-mau-tracking` live formula) và 2 file minh hoạ đầu ra Track 1 NĐ 30 (`docx-cong-van-mau`, `docx-quyet-dinh-mau` — nội dung mẫu, không phải nguồn sự thật; nội dung thật lấy từ `etv-document-governance`).

---

## Nguyên tắc Tuân thủ Tuyệt đối

Xem `CLAUDE.md` — 10 quy tắc bắt buộc khi tạo/sửa file (hỏi trước khi vẽ, ranh giới Track 1/2, schema Brand Kit duy nhất, sơ đồ/Excel phải "sống", QA trước khi giao, khung DOCX mặc định, khử dấu vết AI). Không được bỏ qua dù chỉ một quy tắc.

---

## Tác giả

**Nguyễn Duy Tùng**
Tư vấn xây dựng Song sinh số Doanh nghiệp (EDT) & Lực lượng Lao động AI (AI Workforce)
Liên hệ: 0904.004.920

Bảo trì trong MANLAB-AIOS: ETV-AIOS (`07_AI_OPERATING_SYSTEM/01_Skills/02_xu-ly-van-phong_tao-sua-file-van-phong`).
