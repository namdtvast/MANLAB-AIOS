# 12 — Icons (Bộ biểu tượng giao diện)

> **Một câu:** biểu tượng dùng lại cho giao diện và tài liệu — để cùng một hành động luôn hiện cùng một hình.

**Hiện có:** chưa có file. Hiện `aios-platform` **không dùng thư viện icon** nào (không có gói icon trong `package.json`), icon đang viết trực tiếp dạng SVG trong JSX; thư mục này là nơi gom lại khi cần dùng chung.

## Lưu gì ở đây

| Loại | Ví dụ |
|---|---|
| Icon SVG dùng chung | duyệt, từ chối, ký, tải xuống, cảnh báo, trạng thái hồ sơ |
| Bộ icon theo module | icon đại diện cho từng module `Mxx` trên trang chủ/menu |
| Quy ước dùng icon | kích thước chuẩn, độ dày nét, màu lấy từ token giao diện (không hard-code màu) |

Icon nên là **SVG một màu, ăn theo `currentColor`** để chạy đúng cả nền sáng và nền tối.

## Không lưu ở đây

| Thứ này | Về đâu |
|---|---|
| Logo, bảng màu, font nhận diện ETV | [`13_Branding`](../13_Branding) |
| Ảnh chụp màn hình, ảnh minh hoạ tài liệu | Đặt cạnh tài liệu dùng nó |
| Icon bản quyền chưa rõ giấy phép | Không đưa vào — repo này công khai |

## Phép thử nhanh

> Hình này **nhiều màn hình cùng dùng** và **không mang thương hiệu**? → icon, để ở đây. Mang dấu hiệu nhận diện ETV? → `13_Branding`.

**Lưu ý:** Ghi rõ nguồn và giấy phép của mỗi bộ icon lấy từ bên ngoài.
