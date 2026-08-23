# M08_PhuongPhap — Đặc tả yêu cầu

> Nguồn: `03_MANAGEMENT_SYSTEM/02_P/ETV.P08_PhuongPhap.md` (Thủ tục ETV.P08, lần ban hành 03,
> **Đã phê duyệt** 21/07/2026). 2/4 biểu mẫu có nguồn (F08.01, F08.04).

## 1. Mục tiêu module

Số hóa MP08 — lựa chọn phương pháp, kiểm tra xác nhận, **xác nhận giá trị sử dụng (GTSD)** và
**ước lượng độ không đảm bảo đo (ĐKĐBĐ)** trước khi áp dụng chính thức, theo ISO/IEC 17025 §7.2
+ GUM (TCVN 9595-3), TCVN 6910 (ISO 5725), TCVN 10861 (ISO 21748).

Kết quả module này là **đầu vào bắt buộc** cho M10 (đối chiếu U công bố với CMC) và M11 (cấu
hình công thức xử lý số liệu trên biên bản đo lường).

## 2. Đối tượng dữ liệu chính

| Đối tượng | Mô tả | Biểu mẫu |
|---|---|---|
| `ValidationPlan` | Kế hoạch xác nhận GTSD | F08.01 |
| `BaselineAssessment` | Đánh giá điều kiện cơ bản (thiết bị/hóa chất/nhân sự) | F08.02 (chưa có nguồn) |
| `ValidationReport` | Báo cáo tóm tắt kết quả xác nhận GTSD | F08.03 (chưa có nguồn) |
| `MethodApprovalDecision` | Quyết định ban hành áp dụng quy trình | F08.04 |

### 2.1. `ValidationPlan`

`method_type` (Tiêu chuẩn/Không tiêu chuẩn), `method_ref`, `evaluation_parameters[]` (chọn từ
Phụ lục I: độ đúng, độ chụm, tuyến tính, LOD, LOQ, độ chọn lọc, độ ổn định, tác động ma trận, En),
`evaluation_form` (chất chuẩn/chuẩn đo lường/PT/so sánh liên phòng/lặp lại 2 người 2 thời điểm),
`uncertainty_principle` (GUM / TCVN 6910 / TCVN 10861), `assigned_to`, `due_date`.

### 2.2. `ValidationReport`

`summary`, `conclusion`, `proposal`, `uncertainty_result` (U, k), `reviewed_by` (QLKT),
`approved_by` (LĐV — bắt buộc với phương pháp **không tiêu chuẩn**).

## 3. Vai trò

| Vai trò | Trách nhiệm chính |
|---|---|
| LĐV | Chủ sở hữu; ký `MethodApprovalDecision`; xem xét kết luận/đề xuất báo cáo GTSD phương pháp **không tiêu chuẩn** |
| QLKT | Chọn thông số/hình thức đánh giá; phân công nhân sự; phê duyệt & tính ĐKĐBĐ; đánh giá kết quả GTSD |
| Nhân viên thực hiện | Lập `ValidationPlan`, thực hiện `BaselineAssessment`, viết `ValidationReport` |

## 4. Quy tắc nghiệp vụ

1. Phương pháp phải xác nhận GTSD **trước khi đưa vào sử dụng chính thức** hoặc khi có thay đổi
   đáng kể (thiết bị mới, ma trận mẫu đổi, kỹ thuật viên mới, môi trường khác).
2. Ưu tiên phương pháp tiêu chuẩn theo thứ tự: quốc tế → quốc gia → ngành → hiệp hội khoa học uy
   tín; chỉ dùng phương pháp không tiêu chuẩn khi không có lựa chọn tiêu chuẩn phù hợp.
3. Phương pháp **không tiêu chuẩn** bắt buộc `ValidationReport.approved_by = LĐV`; phương pháp
   tiêu chuẩn chỉ cần LĐV xem xét (không bắt buộc phê duyệt riêng như không tiêu chuẩn).
4. Kiểm định phương tiện đo nhóm II: **bắt buộc dùng đúng ĐLVN hiện hành đã chỉ định**, không
   được thay thế bằng phương pháp tự xây dựng.
5. `BaselineAssessment` phát hiện nguồn lực chưa đáp ứng (thiết bị/hóa chất/đào tạo/tiện nghi) →
   chặn tiến hành đánh giá độ chính xác cho tới khi bổ sung.
6. Sau khi phương pháp được phê duyệt ban hành, QLKT phải phân công phổ biến/đào tạo cho nhân
   viên khác trước khi áp dụng đại trà (không tự động coi là "đã áp dụng" chỉ vì đã ký quyết
   định).
7. ĐKĐBĐ phải tính theo đúng 1 trong 3 nguyên tắc đã chọn ở `ValidationPlan` — không đổi nguyên
   tắc giữa chừng mà không cập nhật lại kế hoạch.
8. Phải dùng **phiên bản có hiệu lực mới nhất** của phương pháp/tiêu chuẩn, trừ khi chứng minh
   được là không khả thi.
9. Hồ sơ xác nhận GTSD lưu theo **ETV.P15**.

## 5. Liên kết

Quy trình: MP08 · Năng lực: CAP-08_HieuChuan, CAP-09_KiemDinh, CAP-10_ThuNghiem · Thủ tục gốc:
`ETV.P08_PhuongPhap.md` (Đã phê duyệt, lần 03) · Biểu mẫu: F08.01–F08.04 (2/4 đã số hóa) · Lưu
hồ sơ: ETV.P15 · Liên quan: **M10** (đối chiếu U công bố với CMC, chỉ tiêu z-score/En dùng
chung định nghĩa), **M11** (cấu hình công thức xử lý số liệu biên bản đo lường) · Căn cứ: ISO
9001 §8.3, ISO/IEC 17025 §7.2, TCVN 9595-3 (GUM), TCVN 6910 (ISO 5725), TCVN 10861 (ISO 21748),
TT 24/2017/TT-BTNMT.
