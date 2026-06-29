# Cổng thông tin MANLAB-AIOS (GitHub Pages)

Trang web tương tác giúp đồng nghiệp và **đoàn đánh giá** duyệt toàn bộ cấu trúc thư
mục, mở quy trình / biểu mẫu / tài liệu và chia sẻ bằng đường liên kết.

## Thành phần
| Tệp | Vai trò |
|---|---|
| `index.html` | Toàn bộ giao diện (một tệp, không cần build, không phụ thuộc ngoài). |
| `data.json` | Bản đồ cấu trúc repo + metadata các Hub, **do máy sinh ra**. |
| `../_meta/build_site.py` | Bộ quét repo sinh `data.json`. |

## Cập nhật nội dung
Sau khi thêm/sửa tài liệu trong repo, dựng lại dữ liệu:

```bash
python3 _meta/build_site.py
```

Khi đẩy lên nhánh `main`, GitHub Actions (`.github/workflows/deploy-pages.yml`) sẽ
**tự chạy lại bước này và xuất bản** — không cần thao tác thủ công.

## Bật GitHub Pages (làm 1 lần)
1. Repo → **Settings → Pages**.
2. Mục **Build and deployment → Source**: chọn **GitHub Actions**.
3. Đẩy code lên `main`. Sau ~1 phút, cổng truy cập tại:
   **https://namdtvast.github.io/MANLAB-AIOS/**

> Tài liệu Word/PDF mở qua nút **"Xem trên GitHub"** (GitHub hiển thị bản xem trước)
> hoặc **"Tải xuống"**. Bản xem trước nội dung Markdown trên trang Pages lấy trực
> tiếp từ GitHub nên kho cần ở chế độ **công khai** để đoàn đánh giá xem được.

## Xem thử tại máy
```bash
# chạy ở thư mục gốc repo để đường dẫn tương đối hoạt động
python3 -m http.server 8000
# rồi mở: http://localhost:8000/docs/index.html
```

## Chia sẻ liên kết sâu
Mỗi mục có đường dẫn riêng dạng `#/p/<đường-dẫn>`. Ví dụ, gửi thẳng quy trình MP21:
`https://namdtvast.github.io/MANLAB-AIOS/#/p/04_PROCESS_LIBRARY%2FMP21_CongBoNangLuc`
