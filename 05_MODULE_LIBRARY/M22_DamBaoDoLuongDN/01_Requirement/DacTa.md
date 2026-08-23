# M22_DamBaoDoLuongDN — Đặc tả yêu cầu

> Nguồn: `03_MANAGEMENT_SYSTEM/02_P/ETV.P22_DamBaoDoLuongDN.md` (Thủ tục ETV.P22, lần ban hành
> 02, **Đã phê duyệt** 21/07/2026, tên đầy đủ "Đảm bảo Đo lường tại Doanh nghiệp", xây dựng trên
> cơ sở Quyết định 510/QĐ-BKHCN). 3 biểu mẫu chính `F22.01`–`F22.03` đã có cấu trúc chi tiết tại
> Phụ lục III của nguồn nhưng **chưa tách thành file biểu mẫu độc lập** — nguồn tự ghi chú đề
> nghị QLCL xác nhận. Mục V (RACI) của nguồn do AI tổng hợp từ vai trò nêu rải rác, chưa được
> LĐP xác nhận chính thức.

## 1. Mục tiêu module

Số hóa MP22 — tư vấn/hỗ trợ hoặc tự triển khai xây dựng, phê duyệt, triển khai, theo dõi, đánh
giá và sửa đổi **Chương trình đảm bảo đo lường tại doanh nghiệp (CTĐBĐL)**, theo Quyết định
510/QĐ-BKHCN (17/3/2021) + Quyết định 996/QĐ-TTg + Luật Đo lường 04/2011/QH13. Khác các module
kỹ thuật đo lường trực tiếp (M05/M08/M09) — đây là **dịch vụ tư vấn quản lý đo lường** cho đối
tượng bên ngoài (doanh nghiệp) hoặc nội bộ ETV.

## 2. Đối tượng dữ liệu chính

| Đối tượng | Mô tả | Biểu mẫu |
|---|---|---|
| `AssuranceProgram` | Chương trình đảm bảo đo lường (CTĐBĐL) | F22.01 |
| `StatusAssessment` | Đánh giá hiện trạng + kế hoạch của chương trình | F22.02 |
| `ProgramResultReport` | Báo cáo kết quả thực hiện CTĐBĐL | F22.03 |

### 2.1. `AssuranceProgram` (F22.01)

`enterprise_ref` (doanh nghiệp/đơn vị được hỗ trợ, hoặc nội bộ ETV), `program_name` (gắn tên
doanh nghiệp + giai đoạn), `period` (tối thiểu 1 năm), `general_objectives`,
`specific_objectives[]` (kèm chỉ tiêu theo dõi, mốc thời gian, đơn vị chịu trách nhiệm),
`tasks[]`, `solutions[]`, `budget_and_resources`, `implementation_team`, `timeline`, `version`
(kiểm soát phiên bản khi sửa đổi), `status`
(Dự thảo/Đã lấy ý kiến/Đã phê duyệt), `approved_by` (người đứng đầu doanh nghiệp/đơn vị).

### 2.2. `StatusAssessment` (F22.02) — 9 nội dung đánh giá bắt buộc

`program_ref`, `assessment_items[]` — mỗi mục gồm: `category` (1 trong 9 nhóm: tổ chức quản lý /
nhân sự-năng lực-đào tạo-đánh giá tay nghề / phương pháp đo-thử nghiệm-kiểm tra / PTĐ-chuẩn đo
lường-chất chuẩn-liên kết chuẩn / kiểm định-hiệu chuẩn-thử nghiệm-bảo trì / điều kiện môi
trường-cơ sở hạ tầng-an toàn / kiểm soát dữ liệu-hồ sơ-phần mềm-bảo mật / PT-ILC-kiểm soát chất
lượng kết quả / hiệu quả dự kiến), `current_status`, `evidence_ref`, `gaps_risks`, `root_cause`,
`proposed_task_solution`, `responsible_unit`, `deadline`.

### 2.3. `ProgramResultReport` (F22.03) — 8 mục bắt buộc

`program_ref`, `general_info`, `objective_results`, `task_results`, `achieved_effects`,
`difficulties_root_causes`, `corrective_actions`, `recommendations`, `conclusion`,
`report_period` (định kỳ theo kế hoạch/cuối giai đoạn/đột xuất).

## 3. Vai trò (RACI — *do AI tổng hợp, cần LĐP xác nhận*)

| Vai trò | Trách nhiệm chính |
|---|---|
| LĐV / Người đứng đầu doanh nghiệp | Chủ sở hữu; phê duyệt CTĐBĐL/Thuyết minh/Kế hoạch và mọi sửa đổi trước khi ban hành |
| Trưởng phòng ĐLCL | Kiểm soát áp dụng QĐ 510/QĐ-BKHCN; xác định cấu trúc/nội dung/trình tự xây dựng-triển khai-đánh giá-sửa đổi |
| QLCL | Kiểm soát thống nhất với ETV.QM và các thủ tục ISO/IEC 17025 liên quan |
| Phòng ĐLCL | Kiểm soát danh mục PTĐ/chuẩn đo lường/lịch kiểm định-hiệu chuẩn/hồ sơ liên kết chuẩn |
| Nhóm thực hiện | Thực hiện phân tích thực trạng, dự kiến hiệu quả, xác định mục tiêu/nhiệm vụ/giải pháp/kinh phí, triển khai, theo dõi, báo cáo |
| Đơn vị/doanh nghiệp được đánh giá | Cung cấp hồ sơ pháp lý/năng lực/nhân sự/thiết bị/PTĐ/chuẩn đo lường làm đầu vào |
| Người được phân công (quản lý dữ liệu) | Lưu trữ dữ liệu, theo dõi tiến độ, tổng hợp báo cáo trên ManLab |

## 4. Quy tắc nghiệp vụ

1. `AssuranceProgram` bắt buộc có tên gắn với doanh nghiệp/đơn vị + giai đoạn thực hiện, thời
   gian **tối thiểu 1 năm** — không tạo chương trình thiếu định danh giai đoạn.
2. Trình tự bắt buộc theo đúng thứ tự: tiếp nhận yêu cầu → thu thập hồ sơ đầu vào → phân tích
   thực trạng (`StatusAssessment`) → dự kiến hiệu quả → xác định mục tiêu/nhiệm vụ/giải pháp/kinh
   phí → lấy ý kiến → trình phê duyệt → triển khai → theo dõi/đánh giá/báo cáo → sửa đổi (nếu
   cần) — không cho tạo `AssuranceProgram` mà bỏ qua bước `StatusAssessment`.
3. `StatusAssessment` bắt buộc đủ **9 nhóm nội dung** (mục 2.2) — thiếu bất kỳ nhóm nào chặn
   hoàn tất đánh giá; mỗi nhóm phải có đủ hiện trạng + bằng chứng + tồn tại/rủi ro + nguyên nhân
   + đề xuất, không được để trống các trường phân tích.
4. `AssuranceProgram.status → Đã phê duyệt` chỉ khi đã qua bước **lấy ý kiến** đơn vị/cá nhân
   liên quan trước đó — không phê duyệt trực tiếp từ Dự thảo.
5. Sửa đổi/bổ sung chương trình bắt buộc **kiểm soát phiên bản** (`version` tăng), có lý do và
   bằng chứng xem xét, được phê duyệt lại trước khi áp dụng — không sửa trực tiếp bản đã duyệt.
6. `ProgramResultReport` bắt buộc đủ **8 mục** (mục 2.3) — đánh giá định kỳ tối thiểu **hằng
   năm** hoặc theo kế hoạch đã phê duyệt.
7. Khi `ProgramResultReport` phát hiện không phù hợp/chậm tiến độ/mục tiêu không còn phù hợp →
   bắt buộc xác định nguyên nhân + đề xuất hành động khắc phục/điều chỉnh + theo dõi hiệu lực —
   không chỉ ghi nhận mà không xử lý.
8. Chu kỳ rà soát chương trình: khuyến nghị tối thiểu **1 lần/năm**, hoặc ngay khi có thay đổi
   quy định pháp luật/phạm vi/tổ chức/phương pháp/thiết bị/chuẩn đo lường/yêu cầu khách hàng —
   hệ thống nên cảnh báo khi quá 1 năm chưa rà soát.
9. Nhiệm vụ kỹ thuật liên quan PTĐ/chuẩn đo lường/chất chuẩn/phương pháp trong `AssuranceProgram`
   phải bảo đảm liên kết chuẩn và độ tin cậy kết quả — tham chiếu dữ liệu thật từ **M05** (thiết
   bị/chuẩn đo lường) và **M08** (phương pháp/ĐKĐBĐ), không nhập tay trùng lặp.
10. Hồ sơ CTĐBĐL/đánh giá hiện trạng/báo cáo kết quả lưu theo **ETV.P15**.

## 5. Liên kết

Quy trình: MP22 · Năng lực: CAP-22_DamBaoDoLuongDN · Thủ tục gốc: `ETV.P22_DamBaoDoLuongDN.md`
(Đã phê duyệt, lần 02) · Biểu mẫu: F22.01–F22.03 (có cấu trúc tại Phụ lục III nguồn, chưa tách
file riêng) · Lưu hồ sơ: ETV.P15 · Liên quan: M05 (danh mục PTĐ/chuẩn đo lường làm đầu vào đánh
giá kỹ thuật), M08 (phương pháp đo/ĐKĐBĐ) · Căn cứ: Quyết định 510/QĐ-BKHCN (17/3/2021), Quyết
định 996/QĐ-TTg (10/8/2018), Luật Đo lường 04/2011/QH13, TCVN ISO/IEC 17025:2017.
