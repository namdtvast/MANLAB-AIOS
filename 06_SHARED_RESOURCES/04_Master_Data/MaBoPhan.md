# Mã bộ phận & quy tắc sinh mã nhân sự

> **Một câu:** bảng quy đổi giữa **mã bộ phận viết tắt** đang dùng trên ManLab và **tên đơn vị theo cơ cấu tổ chức**, kèm quy tắc sinh `Mã nhân sự` từ mã đó.

**Nguồn đối chiếu:** bản kết xuất `vw_tb_qlManLab_NhanSu` ngày 31/08/2026 (145 bản ghi) — đối chiếu với sơ đồ tổ chức tại [`01_ENTERPRISE/04_Organization.md`](../../01_ENTERPRISE/04_Organization.md) §2. Bản kết xuất **không** được lưu vào repo (dữ liệu cá nhân — xem [`08_Personnel/README.md`](../08_Personnel/README.md) §2.2); chỉ phần mã hoá phi định danh dưới đây được rút ra.

---

## 1. Mã bộ phận

### 1.1. Mã tương ứng một đơn vị trong cơ cấu tổ chức

| Mã | Đơn vị theo `01_ENTERPRISE/04_Organization.md` | Ghi chú |
|---|---|---|
| `HĐQL` | Hội đồng Quản lý | Cấp quản lý cao nhất (§3.1) |
| `VP` | Văn phòng | §3.4 |
| `P. ĐL` | Phòng Đo lường Chất lượng | §3.5 — có 5 bộ phận con (Hóa lý, Khối lượng, Nhiệt ẩm, Quang học, Y tế) **chưa được mã hoá riêng** |
| `TT.QT` | Trung tâm Quan trắc và Chứng nhận phù hợp | §3.6 — có 3 phòng con **chưa được mã hoá riêng** |
| `P. CGCN` | Phòng Chuyển giao Công nghệ | §3.7 |

**Chưa có mã:** Ban Lãnh đạo Viện, Hội đồng Khoa học — hai đơn vị có trong sơ đồ tổ chức nhưng không xuất hiện trong dữ liệu vận hành. Nhân sự thuộc hai đơn vị này hiện được gán mã `VP` hoặc `HĐQL`.

### 1.2. Mã **không** phải bộ phận — đang dùng lẫn trong cùng một trường

Bốn giá trị dưới đây nằm chung cột "Bộ phận (Phòng/Ban)" trên ManLab nhưng **không phải đơn vị tổ chức**. Ghi lại ở đây để người đọc dữ liệu không hiểu nhầm, **không** phải để hợp thức hoá cách dùng:

| Giá trị | Thực chất là gì | Đúng ra thuộc về |
|---|---|---|
| `CTV` | Loại quan hệ chủ thể — chuyên gia/cộng tác viên, không thuộc biên chế | Vai trò chủ thể (`m34_party_role`) |
| `NĐT` | Nhà đầu tư | Vai trò chủ thể |
| `NCC` | Nhà cung cấp | Vai trò chủ thể |
| `CDHĐ` | **Trạng thái** — đã chấm dứt hợp đồng | Trường trạng thái nhân sự |

`CDHĐ` là trường hợp gây mất dữ liệu rõ nhất: khi một người chấm dứt hợp đồng, cột Bộ phận bị **ghi đè** thành `CDHĐ`, nên phòng ban gốc biến mất khỏi mọi báo cáo theo đơn vị. Thông tin đó chỉ còn sót lại ở tiền tố của `Mã nhân sự` (mã vẫn giữ `P. ĐL41`, `VP…`, `TT.QT…`). Xem [`M03_NhanSu/03_Database/DataModel.md`](../../05_MODULE_LIBRARY/M03_NhanSu/03_Database/DataModel.md) §4 khoảng cách K1.

---

## 2. Quy tắc sinh mã nhân sự

Mã nhân sự đang vận hành có cấu trúc:

```text
<Mã bộ phận><số thứ tự trong bộ phận>
```

Ví dụ: `P. ĐL46`, `VP01`, `P. CGCN12`, `CTV07`, `TT.QT03`.

**Ba tính chất quan sát được:**

1. Số thứ tự **không quay vòng** — người nghỉ việc không trả lại số cho người mới.
2. Mã **không đổi** khi người đó chấm dứt hợp đồng (khác với cột Bộ phận, bị ghi đè). Nhờ vậy mã là nơi duy nhất còn giữ phòng ban gốc.
3. Mã **có khoảng trắng** sau dấu chấm (`P. ĐL`, không phải `P.ĐL`) — bắt buộc giữ đúng khi so khớp chuỗi, đây là nguồn lỗi khi lọc dữ liệu.

**Xung đột đang tồn tại:** module M03 trên aios-platform quy định `M03Employee.code` theo mẫu `NS-2026-0001` (mã tuần tự toàn Viện, gắn năm), khác hoàn toàn quy tắc đang chạy thật. Hai quy tắc này chưa được hợp nhất — chi tiết và phương án tại [`M03_NhanSu/03_Database/DataModel.md`](../../05_MODULE_LIBRARY/M03_NhanSu/03_Database/DataModel.md) §4 khoảng cách K2.

---

## 3. Liên kết

| Cần gì | Đi đâu |
|---|---|
| Cơ cấu tổ chức, chức năng nhiệm vụ từng đơn vị | [`01_ENTERPRISE/04_Organization.md`](../../01_ENTERPRISE/04_Organization.md) |
| Danh mục chức danh | [`06/08_Personnel/DanhMuc_ChucDanh.md`](../08_Personnel/DanhMuc_ChucDanh.md) |
| Danh mục loại hợp đồng, trạng thái, nhóm nhân sự | [`LoaiHopDong_TrangThai.md`](LoaiHopDong_TrangThai.md) |
| Ràng buộc dữ liệu chủ Chủ thể (Party) | [`README.md`](README.md) · [`09_ENGINEERING/05_Database/MasterData_ChuThe_VaiTro.md`](../../09_ENGINEERING/05_Database/MasterData_ChuThe_VaiTro.md) |
