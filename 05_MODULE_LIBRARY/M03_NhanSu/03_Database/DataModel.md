# M03_NhanSu — Mô hình dữ liệu

> **Nguồn xác thực:** `09_ENGINEERING/aios-platform/prisma/schema.prisma` (các model/enum tiền tố `M03`). File này mô tả và đối chiếu, **không** định nghĩa lại — khi hai bên lệch nhau, schema đúng.
>
> Đặc tả nghiệp vụ: [`01_Requirement/DacTa.md`](../01_Requirement/DacTa.md) · Thủ tục: [`ETV.P03`](../../../03_MANAGEMENT_SYSTEM/02_P/ETV.P03_NhanSu.md)

---

## 1. Thực thể

| Thực thể | Ý nghĩa | Khoá / Quan hệ chính |
|---|---|---|
| `M03RecruitmentPlan` | Kế hoạch, đề xuất tuyển dụng | PK `id`; `code` unique (`TD-YYYY-NNNN`); 1–n `M03Employee` |
| `M03Employee` | Hồ sơ nhân sự | PK `id`; `code` unique (`NS-YYYY-NNNN`); FK `recruitmentPlanId` |
| `M03TrainingPlan` | Kế hoạch đào tạo (ban đầu / định kỳ / bổ sung) | FK `employeeId`; 1–n `M03TrainingRecord` |
| `M03TrainingRecord` | Phiếu theo dõi kết quả đào tạo từng người | FK `trainingPlanId`, `employeeId`, `approvedById` |
| `M03LaborContract` | Hợp đồng lao động | FK `employeeId`, `signedById` |
| `M03ServiceContract` | Hợp đồng dịch vụ (chuyên môn / phổ thông) | FK `employeeId`, `signedById` |
| `M03ContractTermination` | Nghiệm thu – thanh lý hợp đồng | `contractId` **trỏ tự do** vào một trong hai loại hợp đồng |
| `M03EmployeeField` | Lĩnh vực kiểm định được ủy quyền (bảng nối) | FK `employeeId`; unique `(employeeId, field)` |

Liên kết ra ngoài module: `M02SecurityCommitment` (cam kết bảo mật), `M16AuditorQualification` / `M16AuditProgram` / `M16ProgramMember` (năng lực đánh giá viên nội bộ), `M26KnowledgeNeed` / `M26SharingEvent` (tri thức).

## 2. Danh mục giá trị (enum)

| Enum | Giá trị |
|---|---|
| `M03EmploymentType` | CHINHTHUC · THUVIEC · THUCTAP · HDDV |
| `M03EmployeeStatus` | THUVIEC · CHINHTHUC · DANGHIVIEC — **quan hệ lao động** |
| `M03EmployeeRecordStatus` | DRAFT · PENDING_APPROVAL · APPROVED · REJECTED — **duyệt bản ghi**, trục độc lập |
| `M03InspectionField` | 12 lĩnh vực kiểm định |
| `M03ContractType` | THOIVU · KHONGTHOIHAN · THUVIEC · THUCTAP |
| `M03ContractStatus` | DRAFT · PENDING_SIGN · ACTIVE · TERMINATED |
| `M03ServiceType` | CHUYENMON · PHOTHONG |
| `M03ServiceStatus` | DRAFT · ACTIVE · TERMINATED |
| `M03RecruitmentStatus` | DRAFT · PENDING_APPROVAL · APPROVED · FULFILLED · REJECTED |
| `M03TrainingPlanType` | BAN_DAU · DINH_KY · BO_SUNG |
| `M03TrainingStatus` | DRAFT · PENDING_APPROVAL · APPROVED · NEEDS_SUPPLEMENT |
| `M03TrainingResult` | DAT · CHUA_DAT · BO_SUNG |
| `M03TerminationContractType` | LABOR · SERVICE |

## 3. Ràng buộc

- `code` **unique** trên cả bảy thực thể.
- `M03TrainingRecord` có 6 cờ `c1…c6` — sáu điều kiện hoàn thành đào tạo phải **đồng thời** đúng mới được kết luận `DAT` (quy tắc 3, `DacTa.md`); ràng buộc này áp ở `rules.ts`, không ở tầng CSDL.
- `M03ContractTermination.contractId` **không có FK thật** — trỏ tự do vào `M03LaborContract.id` hoặc `M03ServiceContract.id`, phân biệt bằng `contractType`. CSDL không chặn được id sai.
- `M03Employee.securityCommitmentRef` là tham chiếu chuỗi tự do đã bị thay thế bằng quan hệ thật `m02Commitments`; trường cũ còn lại vì lý do lịch sử.
- `M03Employee.legacyCode` **unique, nullable** — mã ManLab cũ. `NULL` với nhân sự tạo mới trên nền tảng.
- `M03Employee.recordStatus` mặc định `DRAFT`; `fulfillRecruitmentPlan()` — đường tạo hồ sơ nhân sự **duy nhất** — ghi đè thành `APPROVED` vì bản ghi sinh từ đề xuất tuyển dụng đã được LĐV phê duyệt. `DRAFT` chỉ phát sinh khi di trú dữ liệu ManLab.
- `M03EmployeeField` unique `(employeeId, field)`; `onDelete: Cascade`. Không có lĩnh vực nào = **không có dòng nào**, không phải một giá trị enum riêng.

---

## 4. Khoảng cách với dữ liệu vận hành thật trên ManLab

> **Cập nhật 31/08/2026 — K2, K3, K4 đã chốt vào schema** (migration `20260831090000_m03_k2_k3_k4`, đặc tả tại [`01_Requirement/_work/20260831-m03-k2-k3-k4/`](../01_Requirement/_work/20260831-m03-k2-k3-k4)). Ba mục đó giữ nguyên phần mô tả khoảng cách bên dưới — vì đó là căn cứ của thiết kế — và bổ sung dòng **Đã chốt** ở cuối. K1, K5–K9 chưa xử lý.

**Cách đo.** Đối chiếu mô hình trên với bản kết xuất `vw_tb_qlManLab_NhanSu` ngày **31/08/2026** — 145 bản ghi, 53 cột — là dữ liệu nhân sự đang chạy thật. Bản kết xuất **không** được đưa vào repo (dữ liệu cá nhân theo Nghị định 13/2023/NĐ-CP, repo công khai); chỉ tập giá trị mã hoá được rút ra, đặt tại [`06/04_Master_Data`](../../../06_SHARED_RESOURCES/04_Master_Data) và [`06/08_Personnel`](../../../06_SHARED_RESOURCES/08_Personnel).

Cần đối chiếu này vì mô hình module được thiết kế từ thủ tục, còn ManLab đã vận hành trước đó — hai bên chưa từng được đặt cạnh nhau.

### K1 — Trạng thái ghi đè lên bộ phận, mất phòng ban gốc

Khi một người chấm dứt hợp đồng, cột *Bộ phận* trên ManLab bị ghi thành `CDHĐ`; 30/145 bản ghi đang ở tình trạng này. Phòng ban gốc chỉ còn sót ở tiền tố `Mã nhân sự` (`P. ĐL41` vẫn giữ `P. ĐL`), tức là **suy được nhưng không truy vấn được** — mọi báo cáo nhân sự theo đơn vị đều thiếu người đã nghỉ.

Mô hình module đã tách đúng: `department` và `status` là hai trường độc lập. Khoảng cách nằm ở phía dữ liệu vận hành, cần xử lý khi di trú: khôi phục `department` từ tiền tố mã, đặt `status = DANGHIVIEC`.

### K2 — Hai quy tắc mã nhân sự không tương thích

| | Quy tắc |
|---|---|
| ManLab (đang chạy) | `<Mã bộ phận><STT trong bộ phận>` — `P. ĐL46`, `VP01`, `CTV07` |
| `M03Employee.code` (đặc tả) | `NS-YYYY-NNNN` — tuần tự toàn Viện, gắn năm |

Không phải khác định dạng mà khác **ngữ nghĩa**: mã ManLab mang thông tin phòng ban, mã module thì không. Di trú theo mã module sẽ **xoá** thông tin đó — mà theo K1, tiền tố mã hiện là chỗ duy nhất còn giữ phòng ban gốc của người đã nghỉ.

**Đề nghị:** giữ mã ManLab làm `code` (nó đang được in trên thẻ, dùng trong hồ sơ giấy), hoặc bổ sung trường `legacyCode` giữ nguyên mã cũ trước khi đổi. Quyết định thuộc Văn phòng — không tự đổi.

> **Đã chốt:** giữ cả hai — `code` theo `NS-YYYY-NNNN` cho nền tảng, thêm `legacyCode String? @unique` giữ nguyên mã ManLab. Không xoá thông tin phòng ban gốc nằm ở tiền tố.

### K3 — Trạng thái duyệt bản ghi và trạng thái lao động bị gộp

Cột *Trạng thái (NS)* chứa lẫn hai loại: `Nháp` · `Chờ duyệt` · `Đã duyệt` · `Không duyệt` (trạng thái duyệt bản ghi) và `Chấm dứt HĐLĐ` (trạng thái quan hệ lao động). Hệ quả: người đã nghỉ việc **không biểu diễn được** là bản ghi của họ đã duyệt hay chưa.

Mô hình module chỉ có `M03EmployeeStatus` (THUVIEC/CHINHTHUC/DANGHIVIEC) — tức là mô hình hoá **đúng một** trong hai trục, và thiếu hẳn trục duyệt bản ghi. Cần bổ sung một trường trạng thái duyệt riêng cho `M03Employee`. Danh mục hai trục: [`06/04_Master_Data/LoaiHopDong_TrangThai.md`](../../../06_SHARED_RESOURCES/04_Master_Data/LoaiHopDong_TrangThai.md) §2.

> **Đã chốt:** thêm `recordStatus M03EmployeeRecordStatus @default(DRAFT)`, độc lập với `status`. Chưa xây màn hình duyệt hồ sơ nhân sự riêng — hồ sơ tạo trên nền tảng đã mang dấu vết phê duyệt từ đề xuất tuyển dụng.

### K4 — Năng lực theo lĩnh vực kiểm định chưa có trong mô hình

ManLab theo dõi *Lĩnh vực kiểm định (M4-TT24)* cho từng nhân sự — 12 lĩnh vực, **18/145 người có từ 2 lĩnh vực trở lên**, hiện nén thành chuỗi phân tách bằng `;` trong một ô văn bản. Đây là quan hệ nhiều–nhiều.

`M03Employee` **không có trường nào tương ứng**. Đây là thiếu sót đáng kể chứ không phải chi tiết phụ: lĩnh vực kiểm định là cái quyết định một người được ký kết quả nào, và là đầu vào của MP08 (phương pháp), MP10 (đảm bảo kết quả), MP21 (công bố năng lực). Cần bảng nối `M03EmployeeField` (employeeId × field). Trục lĩnh vực: [`06/08_Personnel/MaTranNangLuc_LinhVucKiemDinh.md`](../../../06_SHARED_RESOURCES/08_Personnel/MaTranNangLuc_LinhVucKiemDinh.md).

> **Đã chốt:** thêm bảng nối `M03EmployeeField` + enum `M03InspectionField` (12 giá trị). Bằng chứng ủy quyền vẫn thuộc K5.

### K5 — Thẻ kiểm định viên chưa có trong mô hình, chưa có cảnh báo hết hạn

Bốn trường trên ManLab (số thẻ, số QĐ cấp, ngày QĐ cấp, **ngày hết hạn**) điền cho 27–29/145 nhân sự; mô hình module không có trường nào. Ngày hết hạn là điều kiện **chặn** — hết thẻ thì không còn được ký kết quả kiểm định — nhưng hiện không có cảnh báo trước hạn ở cả hai phía.

### K6 — Đơn vị công tác: mô hình giả định một pháp nhân

Dữ liệu thật trải trên **18 pháp nhân** (ETV và các công ty/trung tâm liên kết); 80/145 bản ghi mang mã bộ phận `CTV` — chuyên gia, cộng tác viên không thuộc biên chế ETV. `M03Employee` chỉ có `department` (chuỗi), không có khái niệm pháp nhân.

Danh sách pháp nhân **không đặt trong repo**: đó là bản ghi dữ liệu chủ Chủ thể, thuộc `M34Party` (xem [`09_ENGINEERING/05_Database/MasterData_ChuThe_VaiTro.md`](../../../09_ENGINEERING/05_Database/MasterData_ChuThe_VaiTro.md)). Cần FK `M03Employee → M34Party` thay vì thêm một cột chuỗi.

Cùng gốc vấn đề: `CTV`, `NĐT`, `NCC` đang nằm trong cột *Bộ phận* nhưng là **loại quan hệ chủ thể**, không phải đơn vị tổ chức — xem [`06/04_Master_Data/MaBoPhan.md`](../../../06_SHARED_RESOURCES/04_Master_Data/MaBoPhan.md) §1.2.

### K7 — Loại hợp đồng: thiếu một giá trị, thừa một giá trị

`M03ContractType` có `THOIVU`, dữ liệu thật không dùng; dữ liệu thật dùng *HĐLĐ (Có xác định thời hạn, <36 tháng)*, enum không có. Tên trong dữ liệu thật gần Bộ luật Lao động 2019 Điều 20 hơn. Đề nghị đổi `THOIVU` → `XACDINHTHOIHAN`. Chi tiết: [`LoaiHopDong_TrangThai.md`](../../../06_SHARED_RESOURCES/04_Master_Data/LoaiHopDong_TrangThai.md) §1.

### K8 — Bốn cột chết trong view kết xuất

Cột `QuaTrinhCongTac_ID` và ba cột không tên rỗng **0/145 bản ghi**. View đang xuất cột không có dữ liệu; cần Văn phòng/IT xác nhận là bỏ hay chưa dùng đến, trước khi ai đó tưởng đó là trường cần di trú.

### K9 — Danh sách nhân sự chứa bản ghi không phải người

Cột *Họ và tên (người lao động)* có ba giá trị không phải tên người: `ETV`, `Admin`, và tên đầy đủ của chính Viện. Đó là tài khoản hệ thống và một pháp nhân bị đưa vào danh sách nhân sự. Thêm hai bản ghi chỉ có **một từ** trong họ tên — chưa đủ để định danh.

Hệ quả: **145 bản ghi không bằng 145 con người.** Mọi con số đếm trong tài liệu này và trong `06_SHARED_RESOURCES` đều tính trên *bản ghi*, không phải trên *người* — dùng để so sánh tương quan giữa các trường, không dùng để báo cáo nhân lực.

Mô hình module không có ràng buộc nào chặn việc này (`fullName` là `String` tự do). Cần ít nhất một kiểm tra ở tầng `rules.ts`, và Văn phòng rà lại 5 bản ghi nêu trên.

---

## 5. Ranh giới dữ liệu cá nhân — giữ nguyên, không mở rộng

ManLab lưu số CCCD, nơi cấp, mã số thuế TNCN, mã số BHXH, số tài khoản ngân hàng, mức lương, chỗ ở, biển số xe, người thân báo tin. `M03Employee` **không** có trường nào trong số đó, và `M03LaborContract` chỉ giữ `salary`, `bhxhInfo`.

**Đây là lựa chọn đúng, không phải thiếu sót — ghi lại để lần thiết kế sau không "bổ sung cho đủ".** Module vận hành theo thủ tục ISO cần biết *người này thuộc phòng nào, được đào tạo gì, ký hợp đồng loại nào*; không cần số CCCD để làm việc đó. Mỗi trường nhân thân thêm vào là thêm phạm vi ảnh hưởng khi rò rỉ, thêm nghĩa vụ theo Nghị định 13/2023/NĐ-CP, mà không thêm năng lực nghiệp vụ nào.

Nếu về sau thật sự cần một trường nhân thân, phải qua đánh giá tác động theo [`ETV.P28`](../../../03_MANAGEMENT_SYSTEM/02_P/ETV.P28_QuanLyAnToanThongTin.md) và đăng ký tài sản dữ liệu theo [`ETV.P34`](../../../03_MANAGEMENT_SYSTEM/02_P/ETV.P34_QuanLyDuLieuSo.md) trước, không thêm thẳng vào schema.
