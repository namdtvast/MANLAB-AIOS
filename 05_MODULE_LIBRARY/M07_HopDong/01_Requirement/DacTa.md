# M07_HopDong — Đặc tả yêu cầu

> Nguồn: `03_MANAGEMENT_SYSTEM/02_P/ETV.P07_HopDong.md` (Thủ tục ETV.P07, lần ban hành 03, **Đã
> phê duyệt** 21/07/2026, tên đầy đủ "Xem xét Yêu cầu, Đề nghị thầu và Hợp đồng"). 4/11 biểu mẫu
> có nguồn (F07.02/06/06.02/11); còn lại chưa số hóa được.

## 1. Mục tiêu module

Số hóa MP07 — tiếp nhận yêu cầu, báo giá, xem xét/ký hợp đồng và quản lý phiếu nhận-trả (PNT)
phương tiện đo/mẫu, theo ISO/IEC 17025 §7.1 + ISO 9001 §8.2.

## 2. Đối tượng dữ liệu chính

| Đối tượng | Mô tả | Biểu mẫu |
|---|---|---|
| `Quotation` | Phiếu báo giá | F07.03 (chưa có nguồn) |
| `Contract` | Hợp đồng dịch vụ đo lường | F07.06 |
| `ContractSettlement` | Biên bản nghiệm thu-thanh lý hợp đồng | F07.06.02 |
| `HandoverTicket` (PNT) | Phiếu nhận-trả PTĐ/mẫu | F07.02 |
| `BusinessTripOrder` | Quyết định cử nhân sự đi công tác | F07.11 |

### 2.1. Quy tắc mã hóa (Phụ lục I ETV.P07 — áp dụng khi sinh mã)

- `Quotation.code` = `BG-ETV.YYABCD` (YY=năm, ABCD=số thứ tự tăng dần).
- `HandoverTicket.code` = `NT.YYABCD/XX` (XX = ETV/HT/PTN — địa điểm nhận mẫu).
- `Contract.code` = `ABCD.XX/YY/ĐL-ETV` (ABCD=ngày+tháng ký, XX=số thứ tự trong ngày).

### 2.2. `Contract`

`customer`, `service_type` (KĐ/HC/TN/RA/thầu phụ), `object[]`, `cost_breakdown` (nhân công theo
người-ngày, công tác theo ngày, vận chuyển theo gói, di chuyển theo km), `tax_rate` (nhân công
8%; dịch vụ KĐ/HC/TN 5%; nhà thầu phụ 5% hoặc 8%; thuê ngoài 8%), `is_khcn_support` (hỗ trợ
KHCN → miễn phí, LĐV quyết định), `status`, `signed_by` (LĐV).

### 2.3. `HandoverTicket`

`contract_ref`, `items[]` (PTĐ/mẫu, mã QR), `received_by`, `received_at`, `location_type`
(ETV/HT/PTN), `status` (Đã quét nhận/Đã chuyển thực hiện/Đã trả).

## 3. Vai trò

| Vai trò | Trách nhiệm chính |
|---|---|
| LĐV | Chủ sở hữu; ký hợp đồng; quyết định đấu thầu/hỗ trợ KHCN không tính phí |
| TP | Kiểm soát tiếp nhận mẫu, thực hiện, hoàn thành dịch vụ; xử lý phát sinh/thay đổi yêu cầu |
| Nhân sự báo giá/hợp đồng | Lập báo giá, xem xét yêu cầu, xác định chi phí, lập yêu cầu hợp đồng |
| Người thực hiện nhận-trả PTĐ | Quét nhận/trả, tạo và quản lý PNT |
| Nhân sự thực hiện đo lường | Tiếp nhận công việc, tạo nháp biên bản đo lường (→ M11) |

## 4. Quy tắc nghiệp vụ

1. Yêu cầu vượt năng lực PTN → xem xét thuê thầu phụ (theo **M06**) hoặc từ chối; không tự ý
   nhận vượt phạm vi năng lực đã công bố.
2. `Contract` phải được **phê duyệt trước khi nhận PTĐ/mẫu** — không cho tạo `HandoverTicket`
   khi chưa có hợp đồng/yêu cầu hợp lệ.
3. Thay đổi yêu cầu từ khách hàng: nếu **chưa thực hiện** → được thay đổi; nếu **đã thực hiện**
   → không được giảm chỉ tiêu, chỉ có thể bổ sung.
4. Thay đổi từ phía PTN phải thông báo khách hàng và ghi nhận vào `HandoverTicket`; không thống
   nhất được → báo TP xử lý.
5. Hồ sơ yêu cầu thiếu/không hợp lệ → yêu cầu bổ sung trước khi xác nhận, không tiếp nhận PTĐ
   khi hồ sơ chưa đầy đủ.
6. Thuê thầu phụ trong quá trình thực hiện phải tuân **M06** và ghi nhận trong `HandoverTicket`.
7. Sau khi PNT được duyệt mới chuyển phiếu công việc cho nhân sự thực hiện đo lường (→ M11 tạo
   nháp biên bản đo lường).
8. Hồ sơ báo giá/hợp đồng/PNT lưu theo **ETV.P15**.

## 5. Liên kết

Quy trình: MP07 · Năng lực: CAP-01_BaoGia, CAP-07_HopDong, CAP-02_KeHoach · Thủ tục gốc:
`ETV.P07_HopDong.md` (Đã phê duyệt, lần 03) · Biểu mẫu: F07.01–F07.11 (4/11 đã số hóa) · Lưu hồ
sơ: ETV.P15 · Liên quan: M06 (thuê thầu phụ), M11 (biên bản đo lường sau khi nhận việc), M02
(bảo mật thông tin khách hàng khi tiếp nhận/trả kết quả) · Căn cứ: ISO 9001 §8.2, ISO/IEC 17025
§7.1, ISO 17034 §7.1 (khi liên quan sản xuất/pha chế chất chuẩn).
