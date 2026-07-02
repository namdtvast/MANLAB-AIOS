# 00_RAW_DATA — Kho tài liệu thô chưa phân loại

**Mục đích:** Lưu trữ tạm thời tài liệu PDF, Word, ảnh liên quan đến ISO, pháp lý, tiêu chuẩn, quy trình trước khi phân loại vào các thư mục chính.

**Quy trình:**
1. Copy tài liệu vào `00_RAW_DATA/`
2. Kiểm tra, tóm tắt nội dung (nếu cần)
3. Di chuyển vào thư mục phù hợp (01_Regulations, 02_ISO, 03_DLVN, 04_TCVN, v.v.)
4. Xoá hoặc archive file cũ từ 00_RAW_DATA

**Trạng thái hiện tại:** 7 tài liệu đang chờ phân loại

| File | Loại | Phân loại đề xuất | Trạng thái |
|---|---|---|---|
| ISO-IEC 17025_2017.pdf | ISO | `02_ISO/` | ⏳ Chờ di chuyển |
| 01. ISO 17034-2016 (BS EN)...pdf | ISO | `02_ISO/` | ⏳ Chờ di chuyển |
| 01. TCVN 17034 -2017...pdf | TCVN | `04_TCVN/` | ⏳ Chờ di chuyển |
| ISO-IEC 42001_He thong Quan ly AI.pdf | ISO | `02_ISO/` | ⏳ Chờ di chuyển |
| ETV.QM_L4.pdf | Nội bộ ETV | `03_MANAGEMENT_SYSTEM/01_ETV.QM/` | ✓ Giữ nguyên vị trí |
| ETV.QM_ChinhSachChatLuong.docx | Nội bộ ETV | `03_MANAGEMENT_SYSTEM/01_ETV.QM/` | ✓ Giữ nguyên vị trí |
| ETV.QM_MucTieuChatLuong.docx | Nội bộ ETV | `03_MANAGEMENT_SYSTEM/01_ETV.QM/` | ✓ Giữ nguyên vị trí |

**Ghi chú:** ETV.QM tài liệu đã ở đúng vị trí trong `03_MANAGEMENT_SYSTEM/`, nên giữ lại. ISO/TCVN sẽ được di chuyển sang thư mục chuyên biệt.
