# Mockup hi-fi — M10 Đảm bảo hiệu lực kết quả

Bản dựng giao diện độ trung thực cao (tĩnh, dữ liệu mẫu) cho module M10 (số hóa thủ tục P10).

| File | Nội dung |
|---|---|
| [`M10_hifi_mock.html`](M10_hifi_mock.html) | 4 màn tương tác: Danh sách (P10-L) · Hồ sơ (P10-F) · Công bố (P10-PUB) · Dashboard. Tự chứa, mở trực tiếp bằng trình duyệt. |

## Tương tác
- Sidebar chuyển màn; nút 🌙/☀️ đổi sáng/tối; layout co về mobile.
- Màn **Hồ sơ**: đổi "Loại hồ sơ" → khối chỉ số đổi động; chọn KHÔNG ĐẠT → hiện banner khóa phát hành + nút mở CAPA.

## Bám sát đặc tả
Ánh xạ từ [`../Trang_DamBaoKQ.md`](../Trang_DamBaoKQ.md) và các wireframe `Wireframe_P10-*.md`. Ràng buộc R1–R8, phân quyền và bảng trạng thái công bố khớp [`../../01_Requirement/DacTa.md`](../../01_Requirement/DacTa.md).

## Phạm vi
Mock tĩnh phục vụ chốt hướng UI — **chưa** nối API ([`../../02_API/API.md`](../../02_API/API.md)). Mã nguồn triển khai thật thuộc [`../../08_Source/`](../../08_Source) / repo frontend riêng.
