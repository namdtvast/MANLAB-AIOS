# gen_docx — Dựng bản Word phát hành từ thủ tục ETV

Công cụ tái tạo bản **`.docx` phát hành** (để in, trình ký, lưu kho ISO) từ nội dung thủ tục, theo đúng **thể thức tài liệu HTQL của ETV** (ETV.P14 §8): A4, Times New Roman 12, lề trên/dưới 2cm–trái 2,5cm–phải 2cm, header (tên tài liệu) + footer (mã số | lần BH | ngày BH | trang/tổng), trang bìa + bảng "Những thay đổi đã có".

> **Nguồn sự thật vẫn là bản `.md`** trong `03_MANAGEMENT_SYSTEM/03_ISO17025/procedures/`. File `.docx` chỉ là bản xuất — không sửa trực tiếp Word.

## Cài đặt (một lần)

```bash
cd _meta/gen_docx
npm install
```

## Dùng

```bash
# Xuất ETV.P14 vào thư mục procedures (mặc định)
node build.js ETV.P14

# Hoặc xuất ra thư mục khác
node build.js ETV.P14 /đường/dẫn/khác
```

Kết quả: `03_MANAGEMENT_SYSTEM/03_ISO17025/procedures/ETV.P14_KiemSoatTaiLieu.docx`.

## Cấu trúc

| File | Vai trò |
|---|---|
| `etv-docx-lib.js` | Thư viện thể thức ETV dùng chung (trang bìa, header/footer, style, helper bảng). **Sửa ở đây nếu đổi thể thức chung.** |
| `docs/ETV.P14.js` | Nội dung thủ tục P14 (cfg + body). Mỗi thủ tục một file. |
| `build.js` | Bộ chạy: `node build.js <tên>` → `.docx`. |

## Thêm một thủ tục mới (vd. ETV.P15)

1. Tạo `docs/ETV.P15.js` theo mẫu `docs/ETV.P14.js`: khai báo `cfg` (mã số, tiêu đề, lần ban hành, lịch sử thay đổi) và `body` (mảng đoạn/bảng dùng helper của lib), rồi `module.exports = { cfg, body }`.
2. Chạy `node build.js ETV.P15`.

## Quy trình khi cập nhật thủ tục

1. Sửa bản `.md` (nguồn kiểm soát).
2. Đồng bộ nội dung tương ứng trong `docs/<tên>.js`.
3. Chạy `node build.js <tên>` để tái tạo `.docx`.
4. Ghi mô tả thay đổi vào commit + bảng lịch sử trong chính thủ tục.

> Lưu ý: `docs/*.js` giữ song song nội dung với bản `.md`. Đây là chủ đích để bản Word bám đúng thể thức trình bày (điều mà Markdown thuần không biểu diễn được). Khi sửa `.md`, nhớ cập nhật `.js` để hai bản không lệch nhau.
