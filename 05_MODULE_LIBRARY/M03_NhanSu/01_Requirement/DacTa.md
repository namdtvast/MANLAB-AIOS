# M03_NhanSu — Đặc tả yêu cầu

> Nguồn: `03_MANAGEMENT_SYSTEM/02_P/ETV.P03_NhanSu.md` (Thủ tục ETV.P03, lần ban hành 03, **Đã
> phê duyệt** 20/07/2026, 18 biểu mẫu đi kèm tại `06_SHARED_RESOURCES/01_Forms/ETV.P.F03.xx_*`).

## 1. Mục tiêu module

Số hóa MP03 — tuyển dụng, đào tạo, đánh giá năng lực, ký kết/gia hạn/chấm dứt hợp đồng lao động
(HĐLĐ) và hợp đồng dịch vụ nhân sự (HĐDV), theo ISO/IEC 17025 §6.2 + Bộ luật Lao động 2019 +
NĐ 145/2020/NĐ-CP + Luật BHXH 2024.

**Yêu cầu năng lực từng vị trí** (giáo dục, kinh nghiệm, chuyên ngành...) **không** lặp lại ở
đây — nguồn duy nhất là `ETV.QM §6.2` (nguyên tắc một nguồn sự thật; bản P03 lần 02 từng chép
trùng và bị lệch dữ liệu so với ETV.QM).

## 2. Đối tượng dữ liệu chính

| Đối tượng | Mô tả | Biểu mẫu chính |
|---|---|---|
| `RecruitmentPlan` | Kế hoạch/đề xuất tuyển dụng | F03.03.1–.3 |
| `Employee` | Hồ sơ nhân sự (danh sách, sơ yếu lý lịch, mô tả công việc) | F03.01, F03.02, F03.08 |
| `TrainingPlan` | Kế hoạch đào tạo (ban đầu cho nhân sự mới / định kỳ / bổ sung) | F03.04 |
| `TrainingRecord` | Phiếu theo dõi kết quả đào tạo từng người | F03.06, F03.10 |
| `ProbationReport` | Báo cáo/đánh giá kết quả thử việc | F03.05.x, F03.07 |
| `LaborContract` | HĐLĐ (có thời hạn/không thời hạn/thử việc/thực tập) | F03.09 |
| `ServiceContract` | HĐDV chuyên môn/phổ thông | F03.11, F03.12 |
| `ContractTermination` | Biên bản nghiệm thu-thanh lý hợp đồng | F03.13 |

### 2.1. `Employee` (trường chính)

`full_name`, `position`, `department`, `employment_type` (Chính thức/Thử việc/Thực tập/HĐDV),
`hire_date`, `status` (Đang thử việc/Chính thức/Đã nghỉ việc), liên kết `LaborContract`/
`ServiceContract` hiện hành, liên kết `SecurityCommitment` (← M02 — **FK thật** kể từ khi M02 xây
xong ở Increment 6, xem `M02_BaoMat/01_Requirement/DacTa.md` mục 6; trước đó là tham chiếu tự do
vì M02 chưa có backend).

### 2.2. `TrainingPlan` / `TrainingRecord`

`content[]` (≥8 nội dung bắt buộc với nhân sự mới: nhận thức HTQL, nội quy, bảo mật, an toàn,
mô tả công việc, chuyên môn, hướng dẫn biểu mẫu/phần mềm, thực hành giám sát), `trainer`,
`trainee`, `assessment_method`, `result` (Đạt/Chưa đạt/Đào tạo bổ sung), `evidence`.

### 2.3. `LaborContract` / `ServiceContract`

`contract_type`, `duration`, `salary`, `bhxh_info`, `signed_by` (LĐV), `expiry_date`,
`renewal_history[]`.

## 3. Vai trò

| Vai trò | Trách nhiệm chính |
|---|---|
| LĐV | Chủ sở hữu; phê duyệt kế hoạch tuyển dụng/đào tạo; ký HĐLĐ/HĐDV; quyết định chấm dứt hợp đồng; phê duyệt kết quả đào tạo cuối cùng |
| TP (Lãnh đạo PTN) | Xác định nhu cầu tuyển dụng/đào tạo PTN; tổ chức thử việc; lập/theo dõi kế hoạch đào tạo; đánh giá hiệu quả đào tạo |
| QLCL | Theo dõi tuân thủ, kiểm soát hồ sơ đào tạo/năng lực |
| QLKT | Xác nhận yêu cầu năng lực kỹ thuật, đánh giá năng lực kỹ thuật sau đào tạo |
| Văn phòng | Soạn/trình ký HĐLĐ/HĐDV, theo dõi BHXH, xử lý thôi việc/thanh lý, quản lý Danh sách nhân sự |
| Người hướng dẫn | Đào tạo/giám sát nhân sự mới, lập phiếu theo dõi kết quả |

## 4. Quy tắc nghiệp vụ

1. Nhân sự mới phải ký cam kết bảo mật (→ M02) **trước khi** được phân công thử việc.
2. Trong thời gian đào tạo/thử việc, nhân sự **chỉ thực hiện công việc dưới giám sát**, trừ khi
   TP cho phép theo căn cứ đánh giá năng lực phù hợp.
3. Hoàn thành đào tạo chỉ được xác nhận khi đáp ứng ĐỒNG THỜI cả 6 điều kiện: tham gia đủ nội
   dung bắt buộc, tuân thủ nội quy/an toàn/bảo mật, thực hiện được công việc theo phân công, hồ
   sơ/biểu mẫu đúng yêu cầu, kết quả đánh giá đạt, đủ bằng chứng + LĐV chấp thuận. Thiếu 1 điều
   kiện → không đạt, TP lập kế hoạch đào tạo bổ sung.
4. Chỉ nhân sự đã được LĐV phê duyệt hoàn thành đào tạo mới được giao việc chính thức/độc lập.
5. Ký/gia hạn HĐLĐ/HĐDV: chỉ Văn phòng soạn thảo theo đúng mẫu đã ban hành (F03.09/F03.11/F03.12)
   — **TP không tự sửa điều khoản pháp lý lao động** mà không có ý kiến LĐV/Văn phòng.
6. Gia hạn hợp đồng phải trình LĐV phê duyệt **trước ngày hết hạn** theo thời hạn luật định.
7. Chấm dứt hợp đồng: lập Biên bản nghiệm thu-thanh lý (F03.13), thu hồi quyền truy cập thông
   tin bảo mật (phối hợp M02), chốt/trả sổ BHXH.
8. Nghĩa vụ bảo mật của người lao động **tiếp tục có hiệu lực** sau khi chấm dứt hợp đồng.
9. Nhân sự PTN: theo dõi năng lực định kỳ qua M10 (Đảm bảo giá trị kết quả). Nhân sự bộ phận
   khác: đánh giá hoàn thành công việc 12 tháng/lần bởi LĐV.

## 5. Liên kết

Quy trình: MP03 · Năng lực: CAP-03_NhanSu · Thủ tục gốc: `ETV.P03_NhanSu.md` (Đã phê duyệt, lần
03) · Yêu cầu năng lực vị trí: `03_MANAGEMENT_SYSTEM/01_QM/ETV.QM_QuanlyChatluong.md` §6.2
(nguồn duy nhất, KHÔNG lặp lại ở M03) · Biểu mẫu: F03.01–F03.13 (18 file) · Lưu hồ sơ: ETV.P15 ·
Liên quan: M02 (cam kết bảo mật khi tuyển dụng/thu hồi khi thôi việc), M10 (theo dõi năng lực
nhân sự PTN), M06 (đánh giá nhà cung cấp đào tạo bên ngoài — F06.01/F06.02) · Căn cứ: ISO 9001
§7.1.2/§7.2, ISO/IEC 17025 §6.2, Bộ luật Lao động 45/2019/QH14, NĐ 145/2020/NĐ-CP, Luật BHXH

## 6. Triển khai thật (Increment 5, aios-platform)

Đã xây thành CRUD + 4 state machine thật trong `09_ENGINEERING/aios-platform` (Prisma + Next.js),
không có `08_Source` nguyên mẫu (giống M01, khác M10/M21/M29 là di trú). Chi tiết đầy đủ + bằng
chứng VERIFY: `01_Requirement/_work/20260823-xay-moi-m03/{spec.md, plan.md, verify.md}`.

**Phạm vi Increment 5** — chỉ 4/7 entity DacTa.md có workflow đầy đủ (`RecruitmentPlan`,
`Employee`, `TrainingPlan`/`TrainingRecord`, `LaborContract`); `ServiceContract` rút gọn (CRUD +
Đang soạn/Đang hiệu lực/Đã chấm dứt, không có luồng gia hạn nhiều bước); `ProbationReport` không
có model/UI riêng (nội dung gộp vào luồng `TrainingRecord`); `ContractTermination` chỉ tạo ngầm
trong transaction khi chấm dứt hợp đồng, chưa có UI xem lại riêng — **2 quyết định này cần LĐP
xác nhận lại** (không phải điều `ETV.P03` quy định tường minh, xem spec.md).

Trọng tâm kỹ thuật: **gate 6 điều kiện hoàn thành đào tạo** (quy tắc 3) chặn cứng ở server — LĐV
không thể phê duyệt Đạt nếu thiếu bất kỳ 1/6 điều kiện, đã xác nhận qua Browser thật (không chỉ
ẩn nút UI). Side-effect tự động: `Employee.status` chuyển "Chính thức" khi đào tạo Đạt, chuyển
"Đã nghỉ việc" khi chấm dứt HĐLĐ.

Vai trò module: `NV`(chưa dùng ở Increment 5), `TP`, `QLCL`(chưa dùng), `QLKT`(chưa dùng),
`VANPHONG`, `NGUOIHUONGDAN`, `LDV` — dùng lại 3 tài khoản demo M01/M10 (nth→NGUOIHUONGDAN,
ldp→TP, ldv→LDV) + 1 tài khoản mới `vanphong@manlab.vn`.
41/2024/QH15.
