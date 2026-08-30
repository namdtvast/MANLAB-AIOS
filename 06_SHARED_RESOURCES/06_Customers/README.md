# 06 — Customers (Danh mục khách hàng)

> **Một câu:** sổ tra *"khách hàng này là ai, mã bao nhiêu, tên pháp nhân viết thế nào"* — không phải nơi lưu việc đã làm cho họ.

**Hiện có:** chưa có file — mục dưới mô tả những gì sẽ đưa vào.

## Lưu gì ở đây

| Loại | Ví dụ |
|---|---|
| Danh mục khách hàng (master) | mã KH ↔ tên pháp nhân đầy đủ ↔ mã số thuế ↔ địa chỉ ghi trên chứng chỉ |
| Quy ước phân nhóm khách hàng | theo lĩnh vực, theo vùng, theo loại dịch vụ |

Tên pháp nhân ở đây là **tên sẽ in lên chứng chỉ/kết quả** — sai một chữ là phải thu hồi bản đã phát hành, nên chỉ sửa khi có căn cứ (giấy ĐKKD, công văn của khách).

## Không lưu ở đây

| Thứ này | Về đâu | Vì sao |
|---|---|---|
| Hợp đồng, đơn hàng, phiếu yêu cầu, kết quả đã phát hành | CSDL (module [`M07_HopDong`](../../05_MODULE_LIBRARY/M07_HopDong)) và [`11_COMPLIANCE`](../../11_COMPLIANCE) | Đó là giao dịch và hồ sơ, phát sinh liên tục |
| Bản ghi khách hàng thật trong phần mềm | CSDL — bảng `M34Party` / `M34PartyRole` | **Module không được tự tạo master khách hàng** (xem [`04_Master_Data`](../04_Master_Data)) |
| Thông tin liên hệ cá nhân (tên người, số điện thoại, email cá nhân) | Không đưa vào repo | **Repo này công khai trên GitHub**; đó là dữ liệu cá nhân theo NĐ 13/2023/NĐ-CP |

## Phép thử nhanh

> Thông tin này **đúng kể cả khi khách chưa ký hợp đồng nào**? → danh mục, để ở đây. Chỉ có nghĩa khi gắn với một đơn hàng? → giao dịch, không để ở đây.

**Lưu ý:** Sửa tên khách một chỗ → mọi tài liệu tra lại đều đúng. Đừng gõ lại tên khách trong từng module.
