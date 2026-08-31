# Danh mục loại hợp đồng, trạng thái & phân nhóm nhân sự

> **Một câu:** bốn bảng giá trị hợp lệ mà mọi biểu mẫu, module và báo cáo nhân sự phải dùng chung — thay vì mỗi nơi tự gõ một cách viết.

**Nguồn đối chiếu:** bản kết xuất `vw_tb_qlManLab_NhanSu` ngày 31/08/2026 (145 bản ghi). Chỉ rút ra **tập giá trị**, không rút bản ghi nào. Đối chiếu với thủ tục [`ETV.P03`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P03_NhanSu.md) và enum của module [`M03_NhanSu`](../../05_MODULE_LIBRARY/M03_NhanSu).

---

## 1. Loại hợp đồng

| Giá trị đang dùng trên ManLab | Bản chất | Enum tương ứng trên aios-platform |
|---|---|---|
| `HĐLĐ (Thử việc < 2 tháng)` | Hợp đồng lao động | `M03ContractType.THUVIEC` |
| `HĐLĐ (Thực tập)` | Hợp đồng lao động | `M03ContractType.THUCTAP` |
| `HĐLĐ (Có xác định thời hạn, <36 tháng)` | Hợp đồng lao động | *(chưa có — xem ghi chú)* |
| `HĐLĐ (Không xác định thời hạn, >= 36 tháng)` | Hợp đồng lao động | `M03ContractType.KHONGTHOIHAN` |
| `HĐLĐ (Chấm dứt HĐLĐ)` | **Không phải loại hợp đồng — là trạng thái** | `M03ContractStatus.TERMINATED` |
| `Hợp đồng chuyên môn` | Hợp đồng dịch vụ | `M03ServiceType.CHUYENMON` |
| `Hợp đồng phổ thông` | Hợp đồng dịch vụ | `M03ServiceType.PHOTHONG` |

**Hai điểm cần LĐP/Văn phòng quyết định:**

**(a) Thiếu một loại.** Enum `M03ContractType` có `THOIVU` nhưng dữ liệu thật không dùng giá trị nào tên "thời vụ"; ngược lại dữ liệu thật dùng `HĐLĐ (Có xác định thời hạn, <36 tháng)` mà enum không có. Nhiều khả năng đây là **cùng một loại gọi hai tên**, nhưng không được suy đoán: Bộ luật Lao động 2019 Điều 20 phân HĐLĐ thành *không xác định thời hạn* và *xác định thời hạn ≤ 36 tháng*, không dùng khái niệm "thời vụ" — nên tên trong dữ liệu thật gần luật hơn tên trong enum. Đề nghị đổi `THOIVU` → `XACDINHTHOIHAN`.

**(b) Trạng thái bị trộn vào loại.** `HĐLĐ (Chấm dứt HĐLĐ)` chiếm 30/145 bản ghi. Đây là trạng thái ghi đè lên loại hợp đồng, nên sau khi chấm dứt thì **không còn biết người đó từng ký loại HĐLĐ nào** — mất dữ liệu không phục hồi được. Mô hình module đã tách đúng (`contractType` và `status` là hai trường độc lập); phần lệch nằm ở dữ liệu vận hành.

---

## 2. Trạng thái bản ghi nhân sự

Cột "Trạng thái (NS)" trên ManLab có 5 giá trị:

| Giá trị | Bản chất |
|---|---|
| `Nháp` | Trạng thái **duyệt bản ghi** |
| `Chờ duyệt` | Trạng thái duyệt bản ghi |
| `Đã duyệt` | Trạng thái duyệt bản ghi |
| `Không duyệt` | Trạng thái duyệt bản ghi |
| `Chấm dứt HĐLĐ` | Trạng thái **quan hệ lao động** |

Bốn giá trị đầu trả lời *"bản ghi này đã được ai đó xác nhận chưa"*; giá trị thứ năm trả lời *"người này còn làm việc không"*. Hai câu hỏi độc lập bị nhét vào một trường: một người đã nghỉ việc thì không thể đồng thời biểu diễn được là bản ghi của họ đã duyệt hay chưa.

Bộ giá trị đúng phải là **hai trường**:

- Trạng thái duyệt bản ghi: `Nháp` · `Chờ duyệt` · `Đã duyệt` · `Không duyệt`
- Trạng thái lao động: `Thử việc` · `Chính thức` · `Đã nghỉ việc` (khớp `M03EmployeeStatus`)

---

## 3. Nhóm nhân sự

| Giá trị | Nghĩa |
|---|---|
| `ETV` | Nhân sự thuộc Viện |
| `Chuyên gia/CTV` | Chuyên gia, cộng tác viên ngoài biên chế |
| `Thử việc` | Đang trong thời gian thử việc |
| `Hưu trí` | Đã nghỉ hưu, còn quan hệ cộng tác |

Nhóm nhân sự **trùng lặp một phần** với Loại hợp đồng (`Thử việc`) và với Bộ phận (`Chuyên gia/CTV` ↔ mã `CTV`). Ba trường cùng mã hoá một thông tin thì sẽ lệch nhau — hiện đã lệch: 53/145 bản ghi bỏ trống Nhóm nhân sự trong khi vẫn có Loại hợp đồng.

---

## 4. Thuế và bảo hiểm

Hai danh mục dưới đây phục vụ tính lương, không thuộc phạm vi ISO nhưng dùng chung giữa M03 (nhân sự) và nhóm module kế toán MP44–51:

| Cư trú thuế | | Bảo hiểm bắt buộc | |
|---|---|---|---|
| `Luỹ kế từng phần` | Cá nhân cư trú, ký HĐLĐ | `Có BH (XH; YT; TN)` | Đóng BHXH, BHYT, BHTN |
| `Thuế vãng lai 10%` | Cá nhân cư trú, thu nhập vãng lai | `Không BH (=0)` | Không thuộc diện đóng |
| `Thuế vãng lai 20% (NN)` | Cá nhân **không cư trú** | | |

---

## 5. Liên kết

| Cần gì | Đi đâu |
|---|---|
| Mã bộ phận, quy tắc sinh mã nhân sự | [`MaBoPhan.md`](MaBoPhan.md) |
| Danh mục chức danh | [`06/08_Personnel/DanhMuc_ChucDanh.md`](../08_Personnel/DanhMuc_ChucDanh.md) |
| Thủ tục sở hữu nội dung | [`ETV.P03_NhanSu`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P03_NhanSu.md) |
| Mô hình dữ liệu và khoảng cách với vận hành thật | [`M03_NhanSu/03_Database/DataModel.md`](../../05_MODULE_LIBRARY/M03_NhanSu/03_Database/DataModel.md) |
