# M06_MuaSam — Đặc tả yêu cầu

> Nguồn: `03_MANAGEMENT_SYSTEM/02_P/ETV.P06_MuaSam.md` (Thủ tục ETV.P06, lần ban hành 03, **Đã
> phê duyệt** 21/07/2026). 8/14 biểu mẫu có nguồn số hóa; 6 biểu mẫu còn lại (F06.03 bản trống,
> F06.07/09/10/13/14) chưa có nguồn — không suy diễn cấu trúc.

## 1. Mục tiêu module

Số hóa MP06 — lựa chọn, đánh giá nhà cung cấp (NCC) và kiểm soát mua sản phẩm/dịch vụ ảnh hưởng
tới chất lượng kỹ thuật, theo ISO/IEC 17025 §6.6 + ISO 9001 §8.4.

## 2. Đối tượng dữ liệu chính

| Đối tượng | Mô tả | Biểu mẫu |
|---|---|---|
| `Supplier` | Hồ sơ + danh sách NCC được phê duyệt | F06.01, F06.02 |
| `PurchaseRequest` | Phiếu đề nghị mua sản phẩm/dịch vụ | F06.03 (chưa có nguồn), F06.04 |
| `ReceiptAcceptance` | Biên bản bàn giao/nghiệm thu (mẫu chuẩn/thiết bị/dịch vụ) | F06.05, F06.06 |
| `SubcontractorControl` | Kiểm soát nhà thầu phụ (đo lường/quan trắc) | F06.08 |
| `SupplierEvaluation` | Đánh giá NCC sau mua (thang điểm 50) | F06.02 |
| `PurchaseContract` | Hợp đồng mua sản phẩm/dịch vụ | F06.12 |

### 2.1. `Supplier`

`name`, `legal_status`, `category` (hiệu chuẩn/PT/vận chuyển/vật tư...), `accreditation` (vd
ISO/IEC 17025 cho NCC hiệu chuẩn, ISO/IEC 17043 cho NCC PT), `approval_status` (Đề xuất/Đã phê
duyệt/Loại bỏ), `last_evaluation_score`, `last_evaluated_at`.

### 2.2. `SupplierEvaluation`

5 tiêu chí × 10 điểm (chất lượng SP/DV, thời gian giao hàng, chi phí, điều khoản thanh toán,
năng lực cung cấp) = `total_score` (tự tính, tối đa 50). Kết luận tự suy ra: **> 33,5 → Đạt**,
**≤ 33,5 → Không đạt**.

### 2.3. `PurchaseRequest`

`type` (Sản phẩm/Dịch vụ), `spec` (quy cách kỹ thuật hoặc yêu cầu năng lực NCC), `supplier_ref`
(phải thuộc Supplier đã Đã phê duyệt), `source` (Đầu tư/Nhu cầu PTN), `status` (Nháp/Chờ
duyệt/Đã duyệt).

## 3. Vai trò

| Vai trò | Trách nhiệm chính |
|---|---|
| LĐV | Chủ sở hữu; phê duyệt danh sách NCC được sử dụng; phê duyệt kết quả đánh giá NCC sau mua |
| TP | Đề xuất nhu cầu mua sắm; phối hợp tìm kiếm/đánh giá NCC; kiểm soát kỹ thuật hàng/dịch vụ mua vào |
| Nhân sự được phân công | Đánh giá NCC, lập phiếu đề nghị, nghiệm thu, chấm điểm đánh giá sau mua |
| Văn phòng | Thực hiện mua sắm; tổng hợp danh sách NCC trình LĐV |
| QLCL | Theo dõi tuân thủ; kiểm soát hồ sơ NCC/mua sắm |

## 4. Quy tắc nghiệp vụ

1. Chỉ mua từ `Supplier.approval_status = Đã phê duyệt`; NCC mới phải qua đánh giá ban đầu
   (hồ sơ pháp lý/năng lực/chứng chỉ) trước khi vào danh sách.
2. NCC dịch vụ hiệu chuẩn: bắt buộc có công nhận phù hợp (ISO/IEC 17025); NCC PT: áp dụng
   ISO/IEC 17043 — validate tại bước phê duyệt NCC, không chỉ ở bước mua.
3. `SupplierEvaluation.total_score` **tự tính** từ 5 tiêu chí, không nhập tay; kết luận
   Đạt/Không đạt tự suy ra theo ngưỡng 33,5 — không cho ghi đè thủ công.
4. NCC có kết quả đánh giá **Không đạt** (≤33,5) → xem xét loại bỏ hoặc đánh giá lại, không tự
   động giữ trong danh sách được phê duyệt.
5. Đánh giá NCC định kỳ **hằng năm** — nếu không đạt lại, quay về quy trình đánh giá ban đầu.
6. Nghiệm thu thiết bị/mẫu chuẩn phải kiểm tra CO/CQ, thông số kỹ thuật, tình trạng bên ngoài
   trước khi xác nhận `ReceiptAcceptance`.
7. `PurchaseRequest` có thể **tự động sinh** (trạng thái nháp) khi đồng thời thỏa: (a) dữ liệu
   tồn kho ≤ mức cảnh báo VÀ nhu cầu dự báo ≥ tồn khả dụng, (b) vật tư thuộc nhóm RMA/RMW theo
   M05 và điều kiện hạn dùng — PTN vẫn phải rà soát/xác nhận trước khi trình duyệt, hệ thống
   không tự phê duyệt.
8. Hồ sơ mua sắm/NCC lưu theo **ETV.P15**.

## 5. Liên kết

Quy trình: MP06 · Năng lực: CAP-06_MuaSam · Thủ tục gốc: `ETV.P06_MuaSam.md` (Đã phê duyệt, lần
03) · Biểu mẫu: F06.01–F06.14 (8/14 đã số hóa) · Lưu hồ sơ: ETV.P15 · Liên quan: M05 (vật tư
nhóm RMA/RMW, NCC hiệu chuẩn/CRM trong danh mục M06), M03 (đánh giá NCC đào tạo bên ngoài) ·
Phụ lục II (thuật toán dự báo tự sinh phiếu mua, MAPE ≤15%): thuộc phạm vi kỹ thuật đội phát
triển, không lặp lại pseudocode ở đây · Căn cứ: ISO 9001 §8.4, ISO/IEC 17025 §6.6, ISO 17034
(khi liên quan sản xuất mẫu chuẩn).
