# M13_KhacPhuc — Đặc tả yêu cầu

> Nguồn: `03_MANAGEMENT_SYSTEM/02_P/ETV.P13_KhacPhuc.md` (Thủ tục ETV.P13, lần ban hành 03,
> **Đã phê duyệt** 21/07/2026, tên đầy đủ "Kiểm soát Công việc Không phù hợp"). 0/1 biểu mẫu có
> nguồn.

## 1. Mục tiêu module

Số hóa MP13 — phát hiện, đánh giá mức độ và xử lý công việc không phù hợp (sai khác so với
chính sách/thủ tục đã ban hành) tại bất kỳ khâu nào của PTN, theo ISO/IEC 17025 §7.10 + ISO 9001
§10.2. Đây là **điểm hội tụ CAPA** của toàn hệ thống — M05 (IC vượt giới hạn), M10 (KPH-CAPA
gate), M12 (khiếu nại phức tạp) đều dẫn về module này.

## 2. Đối tượng dữ liệu chính

| Đối tượng | Mô tả | Biểu mẫu |
|---|---|---|
| `NonconformingWork` | Sổ theo dõi công việc không phù hợp | F13.01 |
| `CorrectiveActionPlan` | Phương án hành động khắc phục (mức Nặng) | chưa có mã riêng — xem quy tắc #5 |

### 2.1. `NonconformingWork`

`source_ref` (nguồn phát hiện: tự phát hiện/khiếu nại ← M12/IC vượt giới hạn ← M05/khác),
`description`, `severity` (Nhẹ/Nặng — tự đánh giá bởi LĐV/QLCL/QLKT, không tự động phân loại),
`detected_by`, `assessed_by`, `status` (Ghi nhận/Đang theo dõi/Đang khắc phục/Đã khắc phục),
`stopped_work` (bool, bắt buộc `true` nếu `severity = Nặng`), `revoked_reports[]` (báo cáo/GCN
bị thu hồi do liên quan — ← M11).

### 2.2. `CorrectiveActionPlan` (chỉ áp dụng mức Nặng)

`root_cause`, `action_plan`, `assigned_to`, `reviewed_by` (QLCL — thẩm xét trước khi cho tiếp tục
công việc), `completed_at`, `replacement_report_ref` (báo cáo thay thế báo cáo đã thu hồi, cần
LĐV cho phép phát hành).

## 3. Vai trò

| Vai trò | Trách nhiệm chính |
|---|---|
| LĐV | Chủ sở hữu; quyết định dừng hẳn công việc (mức Nặng); cho phát hành báo cáo thay thế |
| QLCL | Tham gia đánh giá mức độ; báo cáo LĐV dừng công việc + lập phương án khắc phục (Nặng); phân công thực hiện; **thẩm xét trước khi cho tiếp tục công việc** |
| QLKT | Tham gia đánh giá mức độ về mặt kỹ thuật |
| Toàn thể nhân viên PTN | Báo cáo ngay khi phát hiện; ghi nhận vào sổ theo dõi |

## 4. Quy tắc nghiệp vụ

1. Phát hiện KPH khẩn cấp → **được phép dừng ngay** công việc đang thực hiện, không cần chờ phê
   duyệt trước — báo cáo sau.
2. Phân loại **Nhẹ/Nặng** do LĐV/QLCL/QLKT đánh giá thủ công (không có công thức tự động như ma
   trận R=S×P của M01) — ghi nhận người đánh giá + căn cứ.
3. `severity = Nhẹ` → có thể tiếp tục công việc nhưng **bắt buộc theo dõi chặt chẽ**, ghi chép
   đầy đủ diễn biến, không đóng hồ sơ ngay.
4. `severity = Nặng` → **dừng hẳn công việc** (`stopped_work = true`), bắt buộc lập
   `CorrectiveActionPlan`, thu hồi văn bản/báo cáo liên quan nếu có.
5. `CorrectiveActionPlan` phải được **QLCL thẩm xét đạt** mới cho phép tiếp tục công việc — không
   tự động mở khóa khi hết thời hạn hoặc do người thực hiện tự xác nhận.
6. Báo cáo/GCN đã thu hồi (mức Nặng) chỉ được phát hành báo cáo thay thế sau khi **LĐV cho phép**
   — không phát hành lại tự động dù CorrectiveActionPlan đã hoàn thành.
7. Hồ sơ KPH + phương án khắc phục lưu theo **ETV.P15**.

## 5. Liên kết

Quy trình: MP13 · Năng lực: CAP-16_ChatLuong · Thủ tục gốc: `ETV.P13_KhacPhuc.md` (Đã phê duyệt,
lần 03) · Biểu mẫu: F13.01 (chưa có nguồn) · Lưu hồ sơ: ETV.P15 · Liên quan (điểm hội tụ CAPA):
M05 (IC vượt giới hạn kiểm soát), M10 (gate KPH-CAPA trước phê duyệt), M11 (thu hồi/thay thế báo
cáo/GCN), M12 (khiếu nại phức tạp dẫn tới KPH) · Căn cứ: ISO 9001 §10.2, ISO/IEC 17025 §7.10.
