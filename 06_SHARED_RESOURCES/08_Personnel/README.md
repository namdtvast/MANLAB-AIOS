# 08 — Personnel (Danh mục nhân sự & ma trận năng lực)

> **Một câu để nhớ:** thư mục này trả lời *"Viện có những chức danh nào, mã nhân sự nào ứng với vai trò nào, và mỗi chức danh được phép làm/ký công việc gì"* — dạng **bảng tra dùng lại nhiều lần**, không phải hồ sơ của từng con người.

Đây là tài nguyên dùng chung (tầng 06): mọi thủ tục, module, skill AI cần biết "ai giữ vai trò gì" đều **trỏ về đây**, thay vì mỗi nơi tự chép một bảng rồi lệch nhau.

**Hiện có trong thư mục này**

| File | Nội dung |
|---|---|
| [`DanhMuc_ChucDanh.md`](DanhMuc_ChucDanh.md) | Chức danh/vị trí việc làm và viết tắt vai trò dùng trong RACI |
| [`MaTranNangLuc_LinhVucKiemDinh.md`](MaTranNangLuc_LinhVucKiemDinh.md) | Trục lĩnh vực kiểm định của ma trận năng lực; thẻ kiểm định viên |

Hai bảng tra liên quan **đặt ở [`06/04_Master_Data`](../04_Master_Data)**, không đặt ở đây, vì chúng là mã hoá dùng chung cho cả Viện chứ không riêng nhân sự: [`MaBoPhan.md`](../04_Master_Data/MaBoPhan.md) (mã bộ phận, quy tắc sinh mã nhân sự) và [`LoaiHopDong_TrangThai.md`](../04_Master_Data/LoaiHopDong_TrangThai.md) (loại hợp đồng, trạng thái, nhóm nhân sự, thuế/bảo hiểm).

Cả bốn file dựng ngày 31/08/2026 bằng cách đối chiếu bản kết xuất `vw_tb_qlManLab_NhanSu` (145 bản ghi) — **chỉ rút tập giá trị mã hoá, không rút bản ghi nào**; bản kết xuất không được đưa vào repo, đúng mục 2.2 dưới đây.

*(Ma trận năng lực đầy đủ — chức danh × phép đo × phương pháp × thiết bị — vẫn chưa lập; mới có một trục.)*

---

## 1. Lưu file gì ở đây

| Loại file | Ví dụ nội dung | Ai dùng lại |
|---|---|---|
| Danh mục chức danh / vị trí việc làm | `CD-01 Trưởng phòng`, `CD-02 Phó trưởng phòng`, `CD-03 QLCL`, `CD-04 QLKT`… | Bảng RACI trong mọi thủ tục ETV.Pxx |
| Bảng mã nhân sự ↔ chức danh ↔ vai trò trong hệ thống | `NS-07 · Kiểm định viên · vai trò KDV trên aios-platform` | Phân quyền module, ô ký tài liệu, log AI |
| **Ma trận năng lực** | Chức danh/nhân sự × phép đo – phương pháp – thiết bị **được ủy quyền thực hiện/ký** | MP08 (phương pháp), MP10 (đảm bảo kết quả), MP21 (công bố năng lực) |
| Bảng tra viết tắt vai trò | LĐV, LĐP, TP, QLCL, QLKT, VP, NguoiHuongDan | Người đọc tài liệu và AI khi diễn giải RACI |

**Một nguồn sự thật — không chép lại yêu cầu năng lực:** bằng cấp, kinh nghiệm, ngoại ngữ… của từng vị trí **đã quy định tại [`ETV.QM` §6.2](../../03_MANAGEMENT_SYSTEM/01_QM/ETV.QM_QuanlyChatluong.md)** — ở đây chỉ dẫn chiếu, không chép. Đây không phải lý thuyết: lần ban hành 03 của [`ETV.P03`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P03_NhanSu.md) đã phải **bỏ Phụ lục I** vì bản chép trùng đã lệch dữ liệu so với ETV.QM (ghi "≥01 năm" trong khi ETV.QM quy định "≥03 năm").

---

## 2. KHÔNG lưu ở đây — hai dòng cũ nghĩa là gì

### 2.1. "Hồ sơ đã điền / đã phát hành (→ 11)"

Cùng **một** biểu mẫu đi qua 3 chặng, mỗi chặng nằm một chỗ khác nhau:

| Chặng | Ví dụ với `ETV.P.F 03.08 — Danh sách nhân sự` | Lưu ở |
|---|---|---|
| ① Bản trắng, chưa điền | File mẫu có sẵn tiêu đề, các cột, ô ký | [`06/01_Forms/F03_NhanSu`](../01_Forms/F03_NhanSu/ETV.P.F03.08_DanhSachNhanSu.md) |
| ② Bảng tra dùng chung, không gắn với sự kiện nào | Danh mục chức danh, ma trận năng lực | **Thư mục này** |
| ③ Bản **đã điền tên người thật, đã ký, đã đóng dấu, có ngày cụ thể** | Danh sách nhân sự PTN ký ngày 20/07/2026; Sơ yếu lý lịch của anh A; Biên bản đánh giá giám sát nhân viên mới; Chứng chỉ đào tạo nội bộ đã cấp | CSDL/ManLab (hồ sơ vận hành) · [`03/05_R`](../../03_MANAGEMENT_SYSTEM/05_R) (hồ sơ kiểm soát tài liệu) · [`11_COMPLIANCE/03_Evidence`](../../11_COMPLIANCE/03_Evidence) (bằng chứng `EV-xxx` cho đánh giá bên ngoài) |

Chặng ③ gọi là **hồ sơ (record)** — thứ đưa cho đánh giá viên BoA/VILAS, TDC hay thanh tra xem để chứng minh "Viện đã làm thật".

**Vì sao phải tách?** Hai loại có luật chơi ngược nhau:
- Tài nguyên dùng chung (chặng ①②): **sửa được, sửa một chỗ là mọi nơi cập nhật theo** — đó là lý do tồn tại của tầng 06.
- Hồ sơ (chặng ③): **không được sửa**. Sửa một biên bản đã ký là làm hỏng bằng chứng.

Để lẫn hai loại vào một thư mục thì hoặc bạn sửa nhầm vào bằng chứng, hoặc bạn không dám sửa bảng tra.

### 2.2. "Dữ liệu giao dịch thật (→ CSDL/ManLab)"

**"Giao dịch"** = từng bản ghi phát sinh khi vận hành hằng ngày: mỗi đề xuất tuyển dụng, mỗi khóa đào tạo, mỗi lần chấm đạt/chưa đạt 6 điều kiện hoàn thành đào tạo, mỗi hợp đồng lao động ký – gia hạn – chấm dứt.

Những bản ghi đó sống trong **cơ sở dữ liệu của phần mềm**, không nằm trong repo này — cụ thể là các bảng của module [`M03_NhanSu`](../../05_MODULE_LIBRARY/M03_NhanSu): `M03RecruitmentPlan`, `M03Employee`, `M03TrainingPlan`, `M03TrainingRecord`, `M03LaborContract`, `M03ContractTermination`.

Ba lý do:

1. **Sai công cụ.** Git quản văn bản có lần ban hành, có phiên bản — không phải để chứa dữ liệu thay đổi từng ngày, hàng nghìn dòng.
2. **Thiếu kiểm soát.** Dữ liệu nhân sự cần phân quyền theo vai trò, nhật ký thao tác, sửa/xóa có vết. CSDL làm được; một thư mục file thì không.
3. **Repo này CÔNG KHAI trên GitHub** (cổng https://namdtvast.github.io/MANLAB-AIOS/). Sơ yếu lý lịch, số CCCD, lương, hợp đồng lao động là **dữ liệu cá nhân theo Nghị định 13/2023/NĐ-CP** — đẩy vào đây là công bố ra Internet. Tuyệt đối không, kể cả file nháp.

**Kèm theo — danh sách con người cụ thể là dữ liệu chủ Chủ thể (Party):** nhân sự, khách hàng, nhà cung cấp, chuyên gia đều là cùng một loại dữ liệu chủ, tham chiếu `m34_party_role`; **module không được tự tạo master nhân sự** (xem [`06/04_Master_Data`](../04_Master_Data) và [`MasterData_ChuThe_VaiTro.md`](../../09_ENGINEERING/05_Database/MasterData_ChuThe_VaiTro.md)). Vì vậy các bảng đặt tại thư mục này chỉ giữ phần **mã hóa, chức danh, quyền được làm gì** — không giữ thông tin cá nhân.

---

## 3. Phép thử 3 câu trước khi đặt một file vào đây

1. File có **tên người thật, chữ ký, ngày tháng của một sự việc cụ thể** không? → Có: đó là hồ sơ → CSDL, `03/05_R` hoặc `11_COMPLIANCE`.
2. Nội dung có **thay đổi theo từng bản ghi vận hành** không? → Có: → CSDL / ManLab.
3. Nội dung **đã có sẵn** ở `ETV.QM` §6.2 hoặc `06/01_Forms` chưa? → Rồi: **đặt link, đừng chép**.

Trả lời "không" cả ba câu — bảng tra ổn định, dùng lại ở nhiều nơi, ai đọc cũng được — thì đúng chỗ, để ở đây.

---

## 4. Liên kết

| Cần gì | Đi đâu |
|---|---|
| Thủ tục sở hữu nội dung nhân sự | [`ETV.P03_NhanSu`](../../03_MANAGEMENT_SYSTEM/02_P/ETV.P03_NhanSu.md) |
| Hub quy trình | [`MP03_NhanSu`](../../04_PROCESS_LIBRARY/MP03_NhanSu) |
| Module số hóa | [`M03_NhanSu`](../../05_MODULE_LIBRARY/M03_NhanSu) |
| Yêu cầu năng lực từng vị trí | [`ETV.QM` §6.2](../../03_MANAGEMENT_SYSTEM/01_QM/ETV.QM_QuanlyChatluong.md) |
| 18 biểu mẫu trắng `F03.01`–`F03.13` | [`06/01_Forms/F03_NhanSu`](../01_Forms/F03_NhanSu) |
| Hồ sơ đã điền, bằng chứng đã phát hành | CSDL · [`03/05_R`](../../03_MANAGEMENT_SYSTEM/05_R) · [`11_COMPLIANCE/03_Evidence`](../../11_COMPLIANCE/03_Evidence) |

**Lưu ý:** Sửa một chỗ → mọi nơi dùng lại cập nhật. Đây là lý do tránh nhân bản.
