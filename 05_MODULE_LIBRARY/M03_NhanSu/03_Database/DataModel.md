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
| `M03EmployeeField` | Lĩnh vực kiểm định được ủy quyền (bảng nối) | FK `employeeId`, `cardId?`; unique `(employeeId, field)` |
| `M03InspectorCard` | Thẻ kiểm định viên — bằng chứng ủy quyền | FK `employeeId`; unique `(employeeId, cardNumber)` |

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
- `M03EmployeeField.cardId` **nullable** — dữ liệu thật có 3 nhân sự được gán lĩnh vực mà chưa có thẻ.
- `M03InspectorCard` unique **chỉ trong phạm vi một nhân sự**, không unique toàn cục — số thẻ `3961` đang trùng trên hai *bản ghi* (thực chất là hai giai đoạn của cùng một người, xem K5); unique toàn cục sẽ chặn cả 145 bản ghi vì một dòng. Trùng chéo do `duplicateCardNumbers()` báo cáo, ràng buộc CSDL **không** tự chặn.
- Quan hệ `issuedAt < expiresAt` **không** cưỡng chế được ở tầng CSDL — kiểm bằng `validateInspectorCard()`. Dữ liệu thật có 5 bản ghi vi phạm (hai ngày bị nhập đảo).

---

## 4. Khoảng cách với dữ liệu vận hành thật trên ManLab

> **Cập nhật 31/08/2026 (chiều) — đã nhập dữ liệu thật.** 133 hồ sơ nhân sự, 63 dòng lĩnh vực, 28 thẻ kiểm định viên đã vào CSDL qua [`scripts/nhap-nhan-su-manlab.ts`](../../../09_ENGINEERING/aios-platform/scripts/nhap-nhan-su-manlab.ts); đặc tả và kiểm chứng tại [`_work/20260831-nhap-nhan-su-manlab/`](../01_Requirement/_work/20260831-nhap-nhan-su-manlab). Mọi số đếm ở K5 dưới đây đã được đối chiếu lại **trên CSDL sau khi nhập** và khớp. Đợt nhập làm lộ ra **K10** (mã nhân sự không duy nhất) và đính chính một kết luận ở K5.
>
> **Cập nhật 31/08/2026 — K2, K3, K4, K5 đã chốt vào schema** (migration `20260831090000_m03_k2_k3_k4` và `20260831140000_m03_k5_the_kdv`; đặc tả tại [`_work/20260831-m03-k2-k3-k4/`](../01_Requirement/_work/20260831-m03-k2-k3-k4) và [`_work/20260831-m03-k5/`](../01_Requirement/_work/20260831-m03-k5)). Bốn mục đó giữ nguyên phần mô tả khoảng cách bên dưới — vì đó là căn cứ của thiết kế — và bổ sung dòng **Đã chốt** ở cuối. K1 xử lý được một phần (27/30) trong đợt nhập; K6–K10 chưa xử lý.

**Cách đo.** Đối chiếu mô hình trên với bản kết xuất `vw_tb_qlManLab_NhanSu` ngày **31/08/2026** — 145 bản ghi, 53 cột — là dữ liệu nhân sự đang chạy thật. Bản kết xuất **không** được đưa vào repo (dữ liệu cá nhân theo Nghị định 13/2023/NĐ-CP, repo công khai); chỉ tập giá trị mã hoá được rút ra, đặt tại [`06/04_Master_Data`](../../../06_SHARED_RESOURCES/04_Master_Data) và [`06/08_Personnel`](../../../06_SHARED_RESOURCES/08_Personnel).

Cần đối chiếu này vì mô hình module được thiết kế từ thủ tục, còn ManLab đã vận hành trước đó — hai bên chưa từng được đặt cạnh nhau.

### K1 — Trạng thái ghi đè lên bộ phận, mất phòng ban gốc

Khi một người chấm dứt hợp đồng, cột *Bộ phận* trên ManLab bị ghi thành `CDHĐ`; 30/145 bản ghi đang ở tình trạng này. Phòng ban gốc chỉ còn sót ở tiền tố `Mã nhân sự` (`P. ĐL41` vẫn giữ `P. ĐL`), tức là **suy được nhưng không truy vấn được** — mọi báo cáo nhân sự theo đơn vị đều thiếu người đã nghỉ.

Mô hình module đã tách đúng: `department` và `status` là hai trường độc lập. Khoảng cách nằm ở phía dữ liệu vận hành, cần xử lý khi di trú: khôi phục `department` từ tiền tố mã, đặt `status = DANGHIVIEC`.

> **Đã xử lý một phần (31/08/2026):** script di trú khôi phục được **27/30**. Ba người còn lại mất hẳn phòng ban gốc — một người mã chính là `CDHĐ01` (ManLab ghi cả mã theo trạng thái, không chỉ cột Bộ phận), hai người không có mã nhân sự. Với ba người này không còn nguồn nào trong bản kết xuất suy ra được phòng ban; phải tra hồ sơ giấy.

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

Đối chiếu kỹ bốn cột này ngày 31/08/2026 cho ra bốn con số:

| Phát hiện | Số liệu |
|---|---|
| Thẻ **đã hết hạn** tính đến 31/08/2026 | **11/27** |
| Ngày cấp và ngày hết hạn **bị nhập đảo** (cấp 2031-03-31, hết hạn 2026-03-31) | 5 bản ghi |
| Số thẻ trùng trên hai bản ghi (`3961`) | 1 |
| Thẻ thiếu ngày hết hạn | 1 |

Hạn thẻ quan sát được là đúng **5 năm**. Căn cứ pháp lý của việc coi hạn thẻ là điều kiện chặn: [`ETV.P05` §6.2](../../../03_MANAGEMENT_SYSTEM/02_P/ETV.P05_ThietBi.md) khoản 2 (chỉ kiểm định viên đã được chứng nhận, cấp thẻ mới được dùng chuẩn đo lường) và [`ETV.P11` §6.3](../../../03_MANAGEMENT_SYSTEM/02_P/ETV.P11_BaoCao.md) (người ký GCN kiểm định phải là kiểm định viên đã được cấp thẻ).

> **Đối chiếu lại 31/08/2026 — chỉ mục của `ETV.P11`.** Câu về người ký nằm ở **tiểu mục 6.3.1, đoạn "Ký GCN"**, không phải ở đầu §6.3 (§6.3 là *Trình bày, quản lý và sử dụng GCN*). Ghi `§6.3.1` thẳng thì `validate_citations.py` báo hỏng vì tiểu mục cấp ba viết in đậm chứ không phải heading — nên giữ `§6.3` và nêu tiểu mục bằng chữ. Đây đúng lớp lỗi "mục có thật nhưng sai mục" mà công cụ không bắt được.

> **Đã chốt:** thêm model `M03InspectorCard` (nhiều thẻ trên một nhân sự, giữ lịch sử gia hạn) + `M03EmployeeField.cardId?` nối lĩnh vực với bằng chứng. Logic hiệu lực là hàm thuần trong `rules.ts`: `inspectorCardState` · `currentInspectorCard` · `validateInspectorCard` · `duplicateCardNumbers` · `canPerformInspection`. Hồ sơ nhân sự hiện mục **Năng lực kiểm định** kèm huy hiệu hạn thẻ.
>
> **Chưa chốt — cần LĐP:** cửa sổ cảnh báo trước hạn đang đặt **90 ngày**, không có căn cứ trong thủ tục (P05 §6.2 và P11 §6.3 chỉ nói hết hạn thì không được thực hiện, không nói cảnh báo trước bao lâu). Đổi chỉ là sửa hằng số `INSPECTOR_CARD_EXPIRING_SOON_DAYS`.
>
> **Việc chặn thật sự chưa nối dây:** `canPerformInspection()` là vị ngữ M03 cung cấp; M10/M11 gọi tới khi tới lượt chúng.
>
> **Đính chính sau đợt nhập dữ liệu 31/08/2026:** số thẻ `3961` **không** trùng giữa hai người. `Hoàng Kim Tùng` (`CDHĐ01`) và `Hoàng Kim Tùng (CTV)` (`CTV18`) cùng ngày sinh 06/06/1989, cùng email, cùng số điện thoại — một người, hai giai đoạn quan hệ lao động (nghỉ ETV rồi quay lại làm cộng tác viên qua EVTC). Chỗ sai thật nằm ở **ngày hết hạn**: cùng số thẻ, cùng ngày cấp `06/01/2022`, nhưng hai hạn khác nhau (`27/09/2023` và `10/03/2023`). Câu hỏi cần Văn phòng trả lời không còn là "thẻ của ai" mà là "hạn nào đúng".
>
> **Con số quan trọng chỉ nhìn thấy sau khi có dữ liệu thật trong CSDL:** 29 người được gán lĩnh vực kiểm định, **chỉ 16 người còn thẻ hiệu lực**. 13 người đang mang lĩnh vực trên hồ sơ mà thẻ đã hết hạn hoặc thiếu ngày hết hạn.

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

Mô hình module không có ràng buộc nào chặn việc này (`fullName` là `String` tự do). Cần ít nhất một kiểm tra ở tầng `rules.ts`, và Văn phòng rà lại các bản ghi nêu trên.

> **Đếm lại khi nhập dữ liệu 31/08/2026: không phải 5 mà là 12 bản ghi.** Ngoài 5 bản ghi đã nêu, còn 6 bản ghi thử nghiệm (`Nam Test`, `Nam Test 5`, `Nam test`, `nhân sự gsot test`, `Mr Testing`, `Mr Testing Clone`) và 1 bản ghi giữ chỗ (`Chưa có người thực hiện KH`). Cả 12 bị loại khỏi đợt nhập theo quyết định của Văn phòng; danh sách nằm trong hằng `KHONG_PHAI_NGUOI` của script, đối chiếu theo cặp (họ tên, mã) để không loại nhầm người trùng tên. **133 hồ sơ đã nhập mới là số người lao động thật** — trong đó vẫn còn 4 cặp trùng họ tên cần Văn phòng xác nhận có phải cùng một người hay không.

### K10 — Mã nhân sự trên ManLab không duy nhất

Phát hiện khi đối chiếu từng dòng lúc nhập dữ liệu, **không** nhìn ra được từ việc đọc tập giá trị: **9 mã đang dùng cho nhiều người** và **5 bản ghi không có mã nào**.

| Mã | Số bản ghi dùng chung |
|---|---|
| `CTV110` | 6 |
| `CTV100`, `CTV111` | 3 mỗi mã |
| `VP25`, `VP11`, `P. ĐL24`, `P. ĐL26`, `P. CGCN16`, `CTV10` | 2 mỗi mã |

Tổng 24 bản ghi dính mã dùng chung. Điều này làm hỏng giả định ngầm của K2: ở đó mã ManLab được coi là định danh, và một trong hai phương án đưa ra là *giữ mã ManLab làm `code`* — phương án đó sẽ hỏng ngay lần nhập đầu vì `code` là `@unique`. Quyết định giữ `code` riêng và `legacyCode` phụ hoá ra đúng vì lý do khác với lý do đã nêu.

`legacyCode` cũng `@unique`, nên script di trú thêm hậu tố `#2`, `#3`… cho bản ghi thứ hai trở đi và `(chưa có mã)#n` cho bản ghi trống mã — nhìn vào là thấy ngay chỗ cần làm sạch. **Việc làm sạch thuộc Văn phòng**, trên ManLab, không phải trên nền tảng: sửa ở nền tảng thì hai bên lệch nhau mà không ai ký nhận sự lệch đó.

---

## 5. Ranh giới dữ liệu cá nhân — giữ nguyên, không mở rộng

ManLab lưu số CCCD, nơi cấp, mã số thuế TNCN, mã số BHXH, số tài khoản ngân hàng, mức lương, chỗ ở, biển số xe, người thân báo tin. `M03Employee` **không** có trường nào trong số đó, và `M03LaborContract` chỉ giữ `salary`, `bhxhInfo`.

**Đây là lựa chọn đúng, không phải thiếu sót — ghi lại để lần thiết kế sau không "bổ sung cho đủ".** Module vận hành theo thủ tục ISO cần biết *người này thuộc phòng nào, được đào tạo gì, ký hợp đồng loại nào*; không cần số CCCD để làm việc đó. Mỗi trường nhân thân thêm vào là thêm phạm vi ảnh hưởng khi rò rỉ, thêm nghĩa vụ theo Nghị định 13/2023/NĐ-CP, mà không thêm năng lực nghiệp vụ nào.

Nếu về sau thật sự cần một trường nhân thân, phải qua đánh giá tác động theo [`ETV.P28`](../../../03_MANAGEMENT_SYSTEM/02_P/ETV.P28_QuanLyAnToanThongTin.md) và đăng ký tài sản dữ liệu theo [`ETV.P34`](../../../03_MANAGEMENT_SYSTEM/02_P/ETV.P34_QuanLyDuLieuSo.md) trước, không thêm thẳng vào schema.
