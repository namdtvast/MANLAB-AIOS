# 00_RAW_DATA — Kho tài liệu thô chưa phân loại

**Mục đích:** Lưu trữ tạm thời tài liệu PDF, Word, ảnh liên quan đến ISO, pháp lý, tiêu chuẩn, quy trình trước khi phân loại vào các thư mục chính của `08_KNOWLEDGE_GRAPH`.

**Quy trình:**
1. Copy tài liệu vào `00_RAW_DATA/`.
2. Khảo sát tên file/cấu trúc thư mục, đọc mẫu đại diện để hiểu nội dung.
3. Biên soạn tóm tắt vào [`../Wiki/`](../Wiki/index.md) (mục lục trung tâm: `Wiki/index.md`).
4. Di chuyển tài liệu vào thư mục đích phù hợp (`01_Regulations/`, `02_ISO/`, `03_DLVN/`, `04_TCVN/`, `05_ILAC/`, `12_International/`, `13_QCVN/`, hoặc `14_Technical_References/` nếu là tài liệu kỹ thuật theo thông số đo — xem quy tắc tại [`../README.md`](../README.md)).
5. Ghi lại đợt xử lý vào [`../change-log.md`](../change-log.md).

**Trạng thái hiện tại (11/08/2026):** đã xử lý xong toàn bộ ~9.011 file / ~60 thư mục chủ đề từng có trong thư mục này, cộng thêm 52 file quy trình hiệu chuẩn `QTHC/` (ETV.MCx + ĐLVN, chuyển thẳng sang Markdown vào `03_MANAGEMENT_SYSTEM/03_M/` — không qua Wiki vì là tài liệu quy trình nội bộ, không phải tri thức tham chiếu) và 1 file quốc tế (`UfS_2019` → `12_International/VIM_GUM/`). Còn lại 2 file **ngoài phạm vi mục đích thư mục này** (hướng dẫn xây dựng AI Agent, không phải ISO/pháp lý/tiêu chuẩn/quy trình đo lường) — giữ nguyên tại đây theo quyết định của người dùng (11/08/2026), không có thư mục đích phù hợp sẵn có và không cần di chuyển. Xem bảng đầy đủ theo từng cụm tại [`../Wiki/index.md`](../Wiki/index.md) và nhật ký các đợt xử lý tại [`../change-log.md`](../change-log.md).

**Rà soát tiếp:** nhiều cụm mới dừng ở mức catalog theo tên file/cấu trúc thư mục, chưa đọc sâu nội dung (đặc biệt ĐLVN, TCVN, Performance Test, TLTK Chuẩn Bụi, HDSD Thiết bị — xem mục "Vấn đề cần rà soát tiếp" trong [`../Wiki/index.md`](../Wiki/index.md)).
