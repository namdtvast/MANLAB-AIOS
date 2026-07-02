# Thủ tục ISO/IEC 17025 — dạng nội dung

Thư mục chứa nội dung đầy đủ của các thủ tục (khác với Hub `MPxx` ở tầng 04 — Hub chỉ trỏ đường dẫn, không chứa nội dung).

## Quy ước hai định dạng (tránh hai nguồn sự thật)

| Vai trò | Định dạng | File | Ghi chú |
|---|---|---|---|
| **Bản nguồn kiểm soát** | Markdown | `ETV.P14_KiemSoatTaiLieu.md` | Nguồn sự thật duy nhất. Mọi sửa đổi nội dung thực hiện tại đây trước. Git đóng vai trò nhật ký phiên bản. AI/ManLab đọc bản này. |
| **Bản phát hành** | Word | `ETV.P14_KiemSoatTaiLieu.docx` | Xuất ra từ bản Markdown để in, trình ký, lưu kho ISO. **Không** chỉnh sửa trực tiếp — khi nội dung đổi, sửa `.md` rồi tái tạo `.docx`. |
| Tài liệu bổ trợ | Markdown | `ETV.P14_PhanTich_ThietKeLai.md` | Phân tích & thuyết minh thiết kế lại — không phải một phần của thủ tục có hiệu lực. |

## Khi cập nhật thủ tục

1. Sửa bản `.md` (bản nguồn).
2. Tái tạo `.docx` từ bản `.md` (script tạo Word đặt tại kho scratchpad/`_meta` khi cần).
3. Ghi mô tả thay đổi vào commit message + bảng "Những thay đổi đã có" trong chính thủ tục.
4. Bản `.doc` gốc cũ (lần ban hành 02) vẫn ở kho tài liệu ISO của Viện, không đưa vào repo (theo lưu ý tại `03_MANAGEMENT_SYSTEM/01_ETV.QM/README.md`).
