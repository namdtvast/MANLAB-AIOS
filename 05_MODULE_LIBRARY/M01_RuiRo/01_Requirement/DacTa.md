# M01_RuiRo — Đặc tả yêu cầu

> Nguồn: `03_MANAGEMENT_SYSTEM/02_P/ETV.P01_RuiRoCoHoi.md` (Thủ tục ETV.P01, lần ban hành 03,
> **Đã phê duyệt** 19/07/2026 — có sẵn Phụ lục A "Thiết kế giao diện web M01_RuiRo" và Phụ lục B
> "Tiêu chí đánh giá tuân thủ"). Đặc tả này transcribe/tổng hợp lại theo khuôn DacTa.md của repo,
> KHÔNG tự đặt thêm quy tắc nghiệp vụ nào ngoài thủ tục đã duyệt.

## 1. Mục tiêu module

Số hóa quy trình MP01 — nhận diện, đánh giá (ma trận R = S × P), phê duyệt biện pháp xử lý và
theo dõi hoàn thành rủi ro/cơ hội của Phòng Đo lường Chất lượng (PTN), theo ISO/IEC 17025 §8.5 +
ISO 9001 §6.1.

**Ranh giới với M13_KhacPhuc**: biểu mẫu giấy `ETV.P.F01.01` dùng chung cho 3 "hình thức xử lý"
(☐ Khắc phục / ☐ Giải quyết rủi ro / ☐ Cải tiến). M01 chỉ số hóa 2 hình thức **Giải quyết rủi ro**
và **Cải tiến** (= Cơ hội); hình thức **Khắc phục** (sự không phù hợp kỹ thuật) thuộc M13.

## 2. Đối tượng dữ liệu chính

Hai đối tượng tách riêng theo đúng Phụ lục A (menu F01.01 và F01.02) — không gộp chung 1 bảng vì
Cơ hội không có điểm số P/S/R:

### 2.1. Rủi ro (`RiskItem`)

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `code` | string, duy nhất | tự sinh | |
| `title` | string | có | Tên rủi ro |
| `description` | text | có | Mô tả rủi ro |
| `source` | enum | có | Nguồn gốc — xem mục 4.1 |
| `cause` | text | có, trước khi gửi soát xét | Nguyên nhân |
| `severity` (S) | int 1–5 | có | Bảng 1 — mức độ hậu quả |
| `possibility` (P) | int 1–5 | có | Bảng 2 — khả năng xảy ra |
| `risk_score` (R) | int, **tự tính** = S × P | tự sinh | Không cho nhập tay |
| `risk_level` | enum tự suy ra từ R | tự sinh | Thấp/Trung bình/Cao/Rất cao — mục 4.2 |
| `control_measure` | text | có, trước khi gửi soát xét | Biện pháp kiểm soát/đề xuất |
| `assignee` | ref User | có, khi phê duyệt | Người phụ trách xử lý |
| `due_date` | date | có, khi phê duyệt | Thời hạn xử lý |
| `status` | enum | tự quản lý | Đang soạn/Đang soát xét/Đã phê duyệt/Đang xử lý/Hoàn thành — mục 5 |
| `evidence` | text/file ref | có, khi nộp kết quả | Bằng chứng thực hiện |
| `verify_result` | enum: Đạt/Chưa đạt | có, khi thẩm xét | Mục 7 biểu mẫu gốc |

### 2.2. Cơ hội (`OpportunityItem`)

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `code` | string, duy nhất | tự sinh | |
| `title` | string | có | Tên cơ hội |
| `description` | text | có | Mô tả cơ hội |
| `source` | enum | có | Đánh giá nội bộ / Đề xuất nhân viên / Phản hồi khách hàng / khác |
| `proposed_action` | text | có | Biện pháp đề xuất |
| `assignee` | ref User | có, khi phê duyệt | Người phụ trách |
| `due_date` | date | có, khi phê duyệt | Thời hạn hoàn thành |
| `status` | enum | tự quản lý | cùng bộ trạng thái với Rủi ro (trừ không có bước "thẩm xét Đạt/Chưa đạt" riêng theo P/S) |

## 3. Vai trò (rút gọn từ bảng RACI đầy đủ ở ETV.P01 mục V)

| Vai trò | Ký hiệu | Trách nhiệm chính |
|---|---|---|
| Nhân viên (người đề xuất/thực hiện) | NV | Đề xuất rủi ro/cơ hội, phân tích nguyên nhân, thực hiện biện pháp đã duyệt, nộp bằng chứng |
| Trưởng phòng / Quản lý chất lượng | TP/QLCL | Soát xét đề xuất, phê duyệt (trừ rủi ro **Rất cao**), phân công người thực hiện, thẩm xét kết quả, tổng hợp báo cáo |
| Lãnh đạo Viện | LĐV | Được thông báo khi rủi ro **Cao**; **quyết định cuối cùng** khi rủi ro **Rất cao** hoặc khi TP/QLCL và người thực hiện không thống nhất |

## 4. Ma trận đánh giá rủi ro (ETV.P01 mục 6.2)

### 4.1. Nguồn gốc xác định rủi ro (`source`, đúng checkbox biểu mẫu gốc)

Đánh giá nội bộ · Xem xét của lãnh đạo · Đề xuất của nhân viên · Phàn nàn · Đánh giá bên ngoài ·
Đảm bảo giá trị của kết quả bằng TNTT/SSLP (→ M10) · Nguồn gốc khác.

### 4.2. Công thức và ngưỡng hành động — R = S × P

| Điểm R | Mức rủi ro | Hành động yêu cầu | Trách nhiệm |
|---|---|---|---|
| 1 – 3 | Thấp | Ghi nhận, lưu hồ sơ, theo dõi định kỳ | NV ghi nhận; TP/QLCL lưu hồ sơ |
| 4 – 8 | Trung bình | Cải tiến quy trình hoặc đào tạo nhân viên | TP/QLCL đưa hành động; NV thực hiện |
| 9 – 15 | Cao | Phân tích nguyên nhân gốc, khắc phục ngay, bổ sung kiểm soát, báo cáo TP | TP/QLCL phê duyệt; LĐV được thông báo |
| 16 – 25 | Rất cao | **Dừng hoạt động liên quan**, điều tra, báo cáo LĐV, phương án khẩn cấp | **LĐV quyết định** |

Bảng S (hậu quả, 1–5) và P (khả năng xảy ra, 1–5) đầy đủ + ma trận 5×5: xem
`03_MANAGEMENT_SYSTEM/02_P/ETV.P01_RuiRoCoHoi.md` mục 6.2.3–6.2.5 — không copy lại toàn văn ở
đây (tránh 2 nguồn dữ liệu lệch nhau khi thủ tục cập nhật).

> **Ghi chú phạm vi số hóa**: Thủ tục còn có bộ ma trận **riêng cho rủi ro an toàn lao động/cháy
> nổ** (mục 6.3, chỉ 3 mức Nhẹ/Trung bình/Nặng × Hiếm khi/Thỉnh thoảng/Thường xuyên — khác thang
> điểm với ma trận chung). Phụ lục A (thiết kế UI) không tách riêng luồng an toàn lao động khỏi
> luồng rủi ro chung — **increment đầu số hóa module này chỉ áp dụng ma trận chung R = S × P**;
> rủi ro an toàn lao động/cháy nổ tạm thời vẫn đánh giá thủ công theo mục 6.3, chưa số hóa riêng.
> Đây là quyết định phạm vi cần xác nhận lại khi triển khai (không phải điều thủ tục đã quy định
> rõ cách số hóa).

## 5. Quy tắc nghiệp vụ

1. `risk_score` (R) luôn **tự tính** = `severity` × `possibility`, không cho nhập tay.
2. Rủi ro/cơ hội mới tạo ở trạng thái **Đang soạn** — người tạo tự do chỉnh sửa trước khi gửi
   soát xét.
3. Gửi soát xét bắt buộc đã có: `cause`/`proposed_action`, `severity`, `possibility` (với Rủi
   ro). Thiếu → chặn gửi.
4. TP/QLCL soát xét: **Đã phê duyệt** (chuyển Đang xử lý, gán `assignee`+`due_date`) hoặc **trả
   lại** (về Đang soạn, bắt buộc lý do).
5. **R ở mức Rất cao (16–25)**: TP/QLCL không tự phê duyệt được — bắt buộc chuyển LĐV quyết định
   cuối cùng (đúng RACI: LĐV = A/R ở mức rủi ro rất cao, TP/QLCL chỉ = A ở mức thấp hơn).
6. Sau khi thực hiện xong biện pháp, người thực hiện nộp `evidence` → người thẩm xét (khác người
   thực hiện) kết luận `verify_result`: **Đạt** → **Hoàn thành**; **Chưa đạt** → yêu cầu bổ sung,
   không tự đóng hồ sơ.
7. Người thực hiện và người thẩm xét không thống nhất kết luận → hồ sơ trình TP/QLCL quyết định
   cuối (không phải người thẩm xét tự quyết).
8. Rà soát/nhận diện rủi ro định kỳ tối thiểu **1 năm/lần** (kỳ đánh giá nội bộ), hoặc ngay khi:
   thay đổi cơ cấu tổ chức, thay đổi/xây dựng hạ tầng, triển khai hoạt động/thiết bị/công nghệ
   mới, kết quả hệ thống quản lý không đạt yêu cầu, hoặc có yêu cầu từ bên liên quan.
9. Nếu khách hàng có yêu cầu hợp đồng cụ thể về biện pháp kiểm soát, việc phê duyệt biện pháp
   phải thống nhất với khách hàng trước khi coi là Đã phê duyệt.
10. Toàn bộ hồ sơ lưu theo **ETV.P15** (Kiểm soát hồ sơ) — không xóa, chỉ archive.

## 6. Chỉ tiêu theo dõi hiệu lực (Phụ lục B ETV.P01 — dùng cho báo cáo/dashboard)

| Chỉ tiêu | Công thức | Ngưỡng tốt |
|---|---|---|
| Tỷ lệ xử lý đạt yêu cầu | (Số rủi ro xử lý đúng hạn & đạt / Tổng số phát sinh) × 100% | ≥ 90% |
| Thời gian xử lý trung bình | Σ(Ngày hoàn thành − Ngày phát hiện) / Tổng số | ≤ 5 ngày |
| Risk Score Reduction (RSR) | Σ(R trước − R sau) / Σ R trước × 100% | ≥ 70% |
| Tỷ lệ tuân thủ lưu hồ sơ | Số hồ sơ lưu đúng quy định / Tổng số hồ sơ cần lưu × 100% | 100% |

## 7. Liên kết

Quy trình: MP01 · Năng lực: CAP-16 · Thủ tục gốc: `03_MANAGEMENT_SYSTEM/02_P/ETV.P01_RuiRoCoHoi.md`
(Đã phê duyệt, lần ban hành 03) · Biểu mẫu: `06_SHARED_RESOURCES/01_Forms/F01_RuiRo/ETV.P.F01.01_...md`,
ETV.P.F01.02 (bảng tổng hợp, chưa có file số hóa riêng — kiểm tra lại khi BUILD) · Lưu hồ sơ:
ETV.P15 · Ranh giới: M13_KhacPhuc (hình thức "Khắc phục", dùng chung biểu mẫu gốc) · Nguồn dữ
liệu tham chiếu: M10 (TNTT/SSLP làm 1 nguồn xác định rủi ro) · Căn cứ: ISO/IEC 17025:2017 §8.5,
ISO 9001:2015 §6.1.

## 8. Triển khai thật (Increment 4, aios-platform)

Đã xây thành CRUD + state machine thật trong `09_ENGINEERING/aios-platform` (Prisma + Next.js),
khác M10/M21/M29 (di trú từ `08_Source`) — M01 **xây mới hoàn toàn từ đặc tả** vì không có nguyên
mẫu code. Chi tiết đầy đủ + bằng chứng VERIFY: `01_Requirement/_work/20260823-xay-moi-m01/
{spec.md, plan.md, verify.md}`.

**4 quyết định phạm vi cần LĐP xác nhận lại** (suy luận hợp lý khi lập trình state machine, không
phải điều `ETV.P01` quy định tường minh bằng tên trạng thái/state riêng):

1. Nhãn "Đã phê duyệt" trong bảng trạng thái ở mục 2.1 **không persist thành 1 trạng thái DB
   riêng** — phê duyệt và phân công (assignee+due_date) xảy ra cùng 1 hành động, chuyển thẳng
   `Đang soát xét → Đang xử lý` (đúng mục 6.1 bước 4 bản gốc: "được duyệt thực hiện thì... phân
   công"). "Đã phê duyệt" chỉ là nhãn tức thời trong action log.
2. Thêm state mới **`PENDING_LEADER_APPROVAL`** ("Chờ LĐV quyết định") — không có tên tường minh
   trong bảng field rút gọn, nhưng bắt buộc phải có để cài đúng RACI "LĐV quyết định cuối cùng"
   khi Rủi ro Rất cao (quy tắc 5).
3. Quy tắc 7 (người thực hiện/thẩm xét không thống nhất → trình TP/QLCL quyết định cuối) **không
   mô hình hoá thành state/field riêng** — xử lý bằng việc `verify(Chưa đạt)` đưa hồ sơ về
   `Đang xử lý` kèm lý do, để TP/QLCL can thiệp thủ công nếu cần đảo kết luận.
4. Chỉ tiêu Phụ lục B (RSR%, thời gian xử lý, tỷ lệ đạt, tỷ lệ lưu hồ sơ — mục 6 DacTa) và menu
   **F01.03 Báo cáo** (Phụ lục A) **chưa xây** — để dành 1 increment Dashboard/Report riêng.

Vai trò module (`ModuleRoleAssignment.role`): `NV`, `TP_QLCL`, `LDV` (khác vocabulary M10/M21/M29,
đúng nguyên tắc mỗi module có bộ vai trò riêng).
