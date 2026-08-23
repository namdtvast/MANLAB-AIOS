# M16_DanhGiaNoiBo — Đặc tả yêu cầu

> Nguồn: `03_MANAGEMENT_SYSTEM/02_P/ETV.P16_DanhGiaNoiBo.md` (Thủ tục ETV.P16, lần ban hành 03,
> **Đã phê duyệt** 21/07/2026, tên đầy đủ "Đánh giá Nội bộ/Bên ngoài"). 0/4 biểu mẫu có nguồn
> trắng (chỉ có hồ sơ đã điền thật 2019–2025, không số hóa theo nguyên tắc không đưa hồ sơ đã
> điền lên repo công khai).

## 1. Mục tiêu module

Số hóa MP16 — lập kế hoạch/chương trình, thực hiện và xử lý sau đánh giá nội bộ/bên ngoài, theo
ISO/IEC 17025 §8.8 + ISO 9001 §9.2.

## 2. Đối tượng dữ liệu chính

| Đối tượng | Mô tả | Biểu mẫu |
|---|---|---|
| `AuditPlan` | Kế hoạch đánh giá nội bộ/bên ngoài (hằng năm hoặc đột xuất) | F16.01 |
| `AuditProgram` | Chương trình đánh giá (bộ phận, lĩnh vực, thời điểm) | F16.02 |
| `AuditFinding` | Phát hiện trong quá trình đánh giá | F16.03 |
| `AuditReport` | Báo cáo tổng hợp đánh giá | F16.04 |

### 2.1. `AuditPlan`

`type` (Nội bộ/Bên ngoài), `year`, `scope[]`, `auditors[]`, `is_ad_hoc` (đột xuất), `approved_by`
(LĐV, qua LĐP xem xét trước).

### 2.2. `AuditFinding`

`clause_ref` (điều khoản ISO/IEC 17025 liên quan), `department`, `description`,
`conformity` (Phù hợp/Không phù hợp), `evidence`, `auditor_signature`.

### 2.3. `AuditReport`

`opening_meeting_notes`, `closing_conclusion` (kết luận cuối = ý kiến **trưởng đoàn**, các ý
kiến khác chỉ bảo lưu, không phải đồng thuận), `findings[]`, `submitted_within_days` (bắt buộc
≤ 7 ngày làm việc kể từ họp kết thúc), `capa_refs[]` (→ M13).

## 3. Vai trò

| Vai trò | Trách nhiệm chính |
|---|---|
| LĐV | Chủ sở hữu; phê duyệt kế hoạch/chương trình; chỉ đạo thông báo khách hàng/thu hồi kết quả khi phát hiện ảnh hưởng |
| LĐP | Xem xét, trình LĐV phê duyệt kế hoạch; giám sát thực hiện; kiểm tra lại hành động khắc phục |
| QLCL | Tổ chức đánh giá; lập kế hoạch/chương trình; theo dõi toàn quá trình; tập hợp báo cáo cuối; có thể kiêm đánh giá viên |
| Trưởng đoàn đánh giá | Điều hành đoàn; kết luận cuối cùng khi có ý kiến không thống nhất; đệ trình tài liệu ≤ 7 ngày |
| Đánh giá viên | Thu thập tài liệu, thực hiện đánh giá theo phân công, ghi chép phát hiện |
| Trưởng bộ phận được đánh giá | Thông báo kết quả tới nhân viên; phân tích nguyên nhân; đề xuất CAPA |

## 4. Quy tắc nghiệp vụ

1. Đánh giá viên nội bộ bắt buộc: hiểu biết + đã đào tạo ISO/IEC 17025, đã đào tạo đánh giá nội
   bộ; trưởng đoàn phải có kinh nghiệm đánh giá nội bộ — validate khi phân công, không chỉ là
   ghi chú.
2. `AuditProgram` phải thông báo tới bộ phận liên quan **ít nhất 1 tuần trước** khi bắt đầu đánh
   giá; nhắc đoàn chuẩn bị **ít nhất 2 tuần trước**.
3. Ý kiến không thống nhất giữa các thành viên đoàn → **kết luận của trưởng đoàn là cuối cùng**,
   ý kiến khác giữ ở dạng bảo lưu (không phải biểu quyết đa số).
4. `AuditReport` phải đệ trình lãnh đạo **trong vòng 1 tuần làm việc** kể từ họp kết thúc — trễ
   hạn cần cảnh báo.
5. Kết quả đánh giá phát hiện ảnh hưởng tới kết quả đo lường **đã phát hành** → bắt buộc thông
   báo khách hàng + thu hồi kết quả liên quan (→ M11), không chỉ ghi nhận nội bộ.
6. Mọi phát hiện Không phù hợp phải dẫn tới đề xuất hành động khắc phục qua **M13**, LĐP kiểm
   tra lại kết quả thực hiện trước khi coi là đóng.
7. Sau khắc phục, LĐP/QLCL **thẩm tra** hành động đã thực hiện, có thể đề xuất đánh giá bổ sung
   nếu chưa đủ tin cậy — không tự động đóng khi CAPA hoàn thành.
8. Hồ sơ đánh giá (kế hoạch/chương trình/phát hiện/kết luận/CAPA) lưu theo **ETV.P15**.

## 5. Liên kết

Quy trình: MP16 · Năng lực: CAP-16_ChatLuong · Thủ tục gốc: `ETV.P16_DanhGiaNoiBo.md` (Đã phê
duyệt, lần 03) · Biểu mẫu: F16.01–F16.04 (chưa có bản mẫu trống) · Lưu hồ sơ: ETV.P15 · Liên
quan: M13 (hành động khắc phục sau phát hiện KPH), M17 (kết quả đánh giá là đầu vào xem xét lãnh
đạo), M11 (thu hồi kết quả đã phát hành nếu bị ảnh hưởng) · Căn cứ: ISO 9001 §9.2, ISO/IEC 17025
§8.8.
