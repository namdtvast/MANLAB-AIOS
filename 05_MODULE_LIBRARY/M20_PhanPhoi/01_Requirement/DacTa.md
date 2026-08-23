# M20_PhanPhoi — Đặc tả yêu cầu

> Nguồn: `03_MANAGEMENT_SYSTEM/02_P/ETV.P20_PhanPhoi.md` (Thủ tục ETV.P20, lần ban hành 02, **Đã
> phê duyệt** 21/07/2026, tên đầy đủ "Phân phối Sản phẩm và Truy xuất Nguồn gốc"). `ETV.P.F
> 20.01` (Nhật ký phân phối và truy xuất) đã số hóa được cấu trúc cột (bỏ dữ liệu ví dụ minh
> họa); `ETV.P.F 07.02` chưa số hóa (thuộc M07); `ETV.P.F 20.02` (Truy xuất nguồn gốc riêng)
> **chưa xác nhận** có tách biệt khỏi F20.01 hay không — nguồn tự ghi chú cần LĐP/QLKT xác nhận,
> đặc tả dưới đây tạm coi truy xuất là một view/query trên cùng dữ liệu F20.01, không phải bảng
> riêng, cho tới khi có xác nhận khác.

## 1. Mục tiêu module

Số hóa MP20 — kiểm soát phân phối (bàn giao sản phẩm — BGSP), truy xuất nguồn gốc, theo dõi
hiệu lực và xử lý sau phân phối đối với 4 loại đối tượng: mẫu chuẩn (RM/CRM ← M19), phương tiện
đo (PTĐ ← M05), giấy chứng nhận (GCN ← M11), kết quả thử nghiệm/quan trắc (KQT ← M09/M11), theo
ISO 17034 §7.14/§7.15 + ISO/IEC 17025 §6.4/§7.8/§7.11.

## 2. Đối tượng dữ liệu chính

| Đối tượng | Mô tả | Biểu mẫu |
|---|---|---|
| `DistributionLog` | Nhật ký phân phối và truy xuất (BGSP) | F20.01 |
| `HandoverRequest` | Phiếu yêu cầu nhận/trả (← M07) | F07.02 |
| `ValidityStatus` | Trạng thái hiệu lực đối tượng (tự động, không phải nhập tay) | — |

### 2.1. `DistributionLog` (F20.01)

`object_type` (RM/CRM/PTĐ/GCN/KQT), `object_code` (mã đối tượng), `job_code` (mã công việc),
`performed_by` (NTH), `issued_date`, `delivery_method` (Trực tiếp — ký nhận số hóa/ký tay /
Chuyển phát nhanh — kèm điều kiện vận chuyển/bảo quản), `recipient`, `contract_ref`, `qr_code`,
`related_documents[]` (→ F11.03/F07.02), `usage_status` (Đang sử dụng/Hết hạn/Đã thu hồi),
`nominal_value_ref`, `uncertainty_ref` (U — cho RM/CRM/PTĐ).

### 2.2. `ValidityStatus` (tự động cập nhật, hiển thị Dashboard)

`object_ref`, `expiry_date`, `alert_type` (Sắp hết hạn/Đã thu hồi/Hồ sơ chưa đầy đủ), computed
từ `DistributionLog` + dữ liệu nguồn (M05/M11/M19) — không phải trường nhập tay.

## 3. Vai trò

| Vai trò | Trách nhiệm chính |
|---|---|
| LĐV | Chủ sở hữu; phê duyệt phân phối/phát hành; chịu trách nhiệm pháp lý toàn bộ dữ liệu truy xuất |
| LĐP | Soát xét, phân công; kiểm tra tiến độ cập nhật hệ thống; giám sát truy xuất + lưu trữ hồ sơ |
| NTH | Nhập kho; lập phiếu nhận/trả (F07.02); cập nhật ManLab; lưu hồ sơ điện tử, đảm bảo truy xuất đầy đủ/chính xác |

## 4. Quy tắc nghiệp vụ

1. `DistributionLog` chỉ được tạo sau khi hồ sơ kỹ thuật đầy đủ: giá trị danh định, U, thông số
   đo, kết quả thử nghiệm hoặc GCN đã cập nhật (← F11.03) — không phân phối khi hồ sơ nguồn còn
   thiếu.
2. GCN phát hành **dạng điện tử là mặc định** trên hệ thống; bản scan PDF chỉ đính kèm khi khách
   hàng yêu cầu — không đảo ngược ưu tiên (giấy là chính, điện tử là phụ).
3. `delivery_method = Chuyển phát nhanh` bắt buộc ghi rõ điều kiện vận chuyển/bảo quản nếu đối
   tượng nhạy cảm điều kiện môi trường (RM/CRM) — không cho để trống khi loại đối tượng yêu cầu.
4. Mỗi `DistributionLog` phải sinh **mã QR** liên kết trực tuyến tới thông tin truy xuất (kết
   quả đo, thiết bị, quy trình, tính hợp lệ GCN) — không phát hành sản phẩm thiếu mã QR khi đối
   tượng thuộc diện bắt buộc gắn nhãn truy xuất (RM/CRM theo ISO 33401).
5. Truy xuất nguồn gốc phải liên kết được đầy đủ chuỗi: mã đối tượng ↔ mã công việc ↔ người thực
   hiện ↔ ngày phát hành ↔ trạng thái sử dụng ↔ thiết bị/chuẩn đo lường dùng để tạo ra đối tượng
   (← M05 cho PTĐ, M19 cho RM/CRM) — đứt một mắt xích trong chuỗi này là lỗi dữ liệu cần cảnh
   báo, không được coi là bình thường.
6. `ValidityStatus` tự động chuyển `Sắp hết hạn`/`Đã thu hồi` dựa trên dữ liệu nguồn — không cập
   nhật thủ công trạng thái hiệu lực; Dashboard phải hiển thị cảnh báo khi: sắp hết hạn, đã thu
   hồi, hoặc hồ sơ phân phối chưa hoàn tất.
7. Đối tượng không còn sử dụng (hết hạn/thu hồi) → LĐP/NTH lập danh mục đề xuất **hủy hoặc dùng
   huấn luyện nội bộ** — không tự động xóa khỏi hệ thống truy xuất (giữ lại lịch sử).
8. Thời gian lưu tối thiểu: mẫu chuẩn/PTĐ/GCN **5 năm**, KQT **3 năm** — khác thời hạn chung của
   ETV.P15, module này áp dụng thời hạn riêng theo mục VIII nguồn; lưu trên ManLab theo **ETV.P15**.

## 5. Liên kết

Quy trình: MP20 · Năng lực: CAP-12_CRM · Thủ tục gốc: `ETV.P20_PhanPhoi.md` (Đã phê duyệt, lần
02) · Biểu mẫu: F20.01 (đã số hóa cấu trúc), F07.02 (→ M07, chưa số hóa), F20.02 (chưa xác nhận
tách biệt hay gộp F20.01) · Lưu hồ sơ: ETV.P15 (thời hạn riêng: 5 năm mẫu/PTĐ/GCN, 3 năm KQT) ·
Liên quan: M05 (nguồn PTĐ), M19 (nguồn RM/CRM, kế thừa sau khi Đạt), M11 (nguồn GCN/F11.03), M07
(phiếu nhận/trả F07.02) · Căn cứ: ISO 17034:2016 §7.14/§7.15, ISO/IEC 17025:2017 §6.4/§7.8/§7.11,
ISO 33401:2024, ISO 33405:2023.
