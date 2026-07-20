# 03_M — Method / Process / Work Instruction

Quy trình kỹ thuật, phương pháp, hướng dẫn công việc (SOP), quy trình hiệu chuẩn, quy trình kiểm định, quy trình thử nghiệm.

Cấu trúc thư mục có **4 cấp**: Dịch vụ → Lĩnh vực → Số hiệu quy trình → Loại tài liệu.

## **Cấp 1 — Thư mục theo Dịch vụ**

Đặt tên theo mã hiệu: `ETV` (tên tổ chức) + `M` (Method — phương pháp/quy trình) + mã dịch vụ.

| Mã dịch vụ | Thư mục | Ý nghĩa |
|---|---|---|
| `C` | `ETV.MC_HieuChuan` | Quy trình hiệu chuẩn |
| `T` | `ETV.MT_ThuNghiem` | Quy trình thử nghiệm |
| `V` | `ETV.MV_KiemDinh` | Quy trình kiểm định |
| `P` | `ETV.MP_PhaCheCheTao` | Quy trình Pha chế — Chế tạo |
| `RA` | `ETV.MRA_QuanTracDoiChung` | Quy trình quan trắc đối chứng |
| `S` | `ETV.MS_DanhGiaHeThongTram` | Quy trình đánh giá hệ thống trạm |
| `H` | `ETV.MH_KiemDinhAnToan` | Quy trình kiểm định an toàn và tính năng kỹ thuật |
| `M` | `ETV.MM_QuanTracMoiTruong` | Quy trình quan trắc môi trường (QTMT) |
| `E` | `ETV.ME_DaoTao` | Giáo trình, tài liệu đào tạo nội bộ |

## **Cấp 2 — Thư mục con theo Lĩnh vực**

Trong mỗi thư mục Dịch vụ, tạo tiếp thư mục con theo **Lĩnh vực đo lường**, đặt tên:

```
{Số thứ tự}. {Mã dịch vụ}_{Tên lĩnh vực}
```

Ví dụ: `9. MC_Length`, `1. MC_Phy_Che_Air`.

**Số thứ tự dùng chung, cố định cho mỗi lĩnh vực** — cùng một lĩnh vực thì dùng cùng một số ở bất kỳ thư mục Dịch vụ nào (đối chiếu theo cấu trúc Dropbox hiện có, đã dùng nhất quán giữa `ETV.MC` và `ETV.MV`). Không tự đặt số khác cho cùng một lĩnh vực; không dùng trùng số cho hai lĩnh vực khác nhau (trừ cặp Hoá lý khí/nước dùng chung số `1`, phân biệt bằng hậu tố `_Air`/`_Water`).

| Số | Thư mục (mẫu, ghép với mã dịch vụ) | Tên lĩnh vực | Ký hiệu trong mã văn bản |
|---|---|---|---|
| 0 | `0. DLVN_Ban hanh` | *(không phải lĩnh vực — nơi lưu văn bản ĐLVN đã ban hành)* | — |
| 1 | `1. {DV}_Phy_Che_Air` | Hoá lý (khí) | `A` |
| 1 | `1. {DV}_Phy_Che_Water` | Hoá lý (nước) | `W` |
| 2 | `2. {DV}_Mass` | Khối lượng | `M` |
| 3 | `3. {DV}_Volume_Flow` | Dung tích — Lưu lượng | `F` |
| 4 | `4. {DV}_Optics` | Quang học | `O` |
| 5 | `5. {DV}_Frequency` | Thời gian — Tần số | `S` |
| 6 | `6. {DV}_Temp` | Nhiệt độ | `T` |
| 7 | `7. {DV}_Pressure` | Áp suất | `P` |
| 8 | `8. {DV}_Electric` | Điện từ — Không điện | `E` |
| 9 | `9. {DV}_Length` | Độ dài | `L` |
| 10 | `10. {DV}_Hygro` | Độ ẩm | `H` |
| 11 | `11. {DV}_KTTV` | Khí tượng, thuỷ văn | `HM` |
| 12 | `12. {DV}_MetrologyFoundation` | Cơ sở đo lường học và năng lực nền tảng | `MC` |

`{DV}` = mã dịch vụ cấp 1 (`MC`, `MT`, `MV`, `MP`, `MRA`, `MS`, `MH`, `MM`, `ME`). Mỗi thư mục Dịch vụ chỉ tạo những lĩnh vực thực sự có tài liệu — không cần tạo đủ 0–12 ngay từ đầu.

**Lĩnh vực chưa có số thứ tự chính thức** (theo `Danh_Muc_linh_vuc_do_luong` — bổ sung số khi phát sinh tài liệu đầu tiên thuộc lĩnh vực đó, lấy số tiếp theo sau 12): Lực (`Fo`), Y tế (`Md`), Cơ học (`Me`), Phóng xạ (`R`), Thiết bị phụ (`IS`), Dụng cụ (`ITo`), Thiết bị khác (`IO`), Thử nghiệm — với vai trò lĩnh vực riêng, không nhầm với mã dịch vụ `T` (`T` trùng ký hiệu Nhiệt độ, cần xem ngữ cảnh).

Ngoài các lĩnh vực đo lường/thử nghiệm kỹ thuật ở trên, danh mục chính thức còn có các lĩnh vực khác không thuộc phạm vi `03_M` (không tạo thư mục Cấp 2 tương ứng trong `03_M`, chỉ liệt kê để tránh nhầm ký hiệu khi tra cứu): Biến đổi khí hậu (`GHG`), Quan trắc đối chứng khí/nước (`Mo`), Nước mặt/thải/biển/dưới đất/mưa (`SW`/`WW`/`MW`/`GW`/`RW`), Khí thải (`EA`), Không khí xung quanh (`AA`), Đất (`SO`), Trầm tích (`SD`), Tiếng ồn — độ rung (`NV`), QA/QC (`QA-QC`), các lĩnh vực hành chính/kế toán/quản lý (`KT-*`, `QLC`, `VC`, `NCV`), Đề tài nghiên cứu (`KC`), và các mã dùng chung `Không lĩnh vực` (`KLV`)/`Không áp dụng` (`NA`).

**Nguồn tham chiếu đầy đủ:** `Danh_Muc_linh_vuc_do_luong_*.xlsx` (do người dùng cung cấp, bản cập nhật 2026-07-20 có 51 mục) — danh sách chính thức tên lĩnh vực + ký hiệu dùng trong mã số văn bản; đối chiếu cùng `Danh_muc_dich_vu_tb_*.xlsx` (25 dịch vụ) khi cần xác định lại mã dịch vụ Cấp 1. Hai file này không lưu trong repo; dùng để tra cứu khi cần thêm lĩnh vực/dịch vụ mới.

## **Cấp 3 — Thư mục con theo Số hiệu quy trình**

Trong mỗi thư mục Lĩnh vực, mỗi quy trình (một số hiệu cụ thể) có một thư mục con riêng, đặt tên:

```
{Mã dịch vụ}{Mã lĩnh vực}{Số hiệu}_{Tên viết tắt của đối tượng}
```

- `{Mã dịch vụ}{Mã lĩnh vực}{Số hiệu}` = ghép mã số văn bản của quy trình chính, bỏ `ETV.` và bỏ các dấu chấm (vd. `ETV.MCL 04` → `MCL04`).
- `{Tên viết tắt của đối tượng}` = tên viết tắt (không dấu, liền không cách) của đối tượng đo/thiết bị mà quy trình áp dụng (vd. `MaydinhviGPS`).

Ví dụ: `9. MC_Length/MCL04_MaydinhviGPS`.

**Trường hợp quy trình áp dụng trực tiếp một văn bản ĐLVN đã ban hành** (không phải quy trình nội bộ ETV tự đánh số): giữ nguyên số hiệu ĐLVN làm phần `{Số hiệu}` (bỏ dấu cách/hai chấm và bỏ năm ban hành, vd. `DLVN 389:2021` → `DLVN389` — năm ban hành không thuộc số hiệu quy trình nên không đưa vào tên thư mục), xếp trực tiếp vào đúng thư mục Lĩnh vực như quy trình thường — không dùng slot `0. DLVN_Ban hanh` cho trường hợp này (slot đó chỉ dành cho các văn bản ĐLVN lưu tham khảo, chưa gắn với một lĩnh vực/quy trình áp dụng cụ thể). Ví dụ: `1. MV_Phy_Che_Air/MVA_DLVN389_NongDoKhiXQ`.

Toàn bộ tài liệu thuộc quy trình đó nằm chung trong thư mục Cấp 3 này, không rải ở cấp Lĩnh vực — nhưng được chia tiếp theo **Cấp 4** bên dưới, không để phẳng trực tiếp trong thư mục Cấp 3.

## **Cấp 4 — Thư mục con theo Loại tài liệu**

Trong mỗi thư mục quy trình (Cấp 3), tạo thư mục con đánh số theo loại tài liệu:

| Số | Thư mục | Nội dung |
|---|---|---|
| 1 | `1. Quy trinh` | Văn bản quy trình chính |
| 2 | `2. Bieu mau` | Biên bản, bảng tính, hồ sơ đi kèm |
| 3 | `3. GCN` | Mẫu giấy chứng nhận (hiệu chuẩn/kiểm định) |
| 4 | `4. Diagrams` | Sơ đồ, hình ảnh minh hoạ |

Chỉ tạo những thư mục con thực sự có tài liệu — không cần đủ 1–4 ngay từ đầu (vd. quy trình chỉ có Quy trình + Biểu mẫu thì không cần tạo `3. GCN`/`4. Diagrams`).

## **Mã số văn bản và cách xếp thư mục**

Mã số văn bản = `ETV.M{Dịch vụ}{Lĩnh vực} {số}`, ví dụ `ETV.MCL 04` = **M**ethod + **C**alibration (dịch vụ) + **L**ength (lĩnh vực) + số 04. Biểu mẫu/phụ lục đi kèm dùng mã `ETV.M{Dịch vụ}{Lĩnh vực}.F{số}.{yy}` (vd. `ETV.MCL.F04.01`).

**Khi nhận một file quy trình/biểu mẫu mới, xác định thư mục lưu theo đúng ký hiệu trong Số/mã của file:**
1. Chữ cái ngay sau `ETV.M` → tra bảng Cấp 1 → thư mục Dịch vụ (vd. `C` → `ETV.MC_HieuChuan`).
2. Chữ cái tiếp theo → tra bảng Cấp 2 → thư mục Lĩnh vực (vd. `L` → `9. MC_Length`).
3. Số hiệu quy trình (vd. `04`) → tra/khớp với thư mục Cấp 3 có tiền tố `{Mã dịch vụ}{Mã lĩnh vực}{Số hiệu}_` trong thư mục Lĩnh vực đó (vd. `MCL04_MaydinhviGPS`); nếu quy trình mới, tạo thư mục Cấp 3 mới theo đúng quy tắc đặt tên ở trên.
4. Theo loại tài liệu (quy trình/biểu mẫu/GCN/diagram) → xếp vào đúng thư mục Cấp 4 tương ứng trong bảng trên; nếu chưa có thì tạo mới.

## **Danh mục phương pháp hiện có**

| Đường dẫn | Nội dung |
|---|---|
| [`ETV.MC_HieuChuan/9. MC_Length/MCL04_MaydinhviGPS/`](ETV.MC_HieuChuan/9.%20MC_Length/MCL04_MaydinhviGPS/) | `ETV.MCL.04` — Phương tiện đo định vị vệ tinh GNSS/GPS cầm tay: `1. Quy trinh/` (quy trình hiệu chuẩn), `2. Bieu mau/` (biên bản, bảng tính, hồ sơ điểm chuẩn F04.01–F04.03), `3. GCN/` (mẫu GCN F04.04), `4. Diagrams/` (sơ đồ liên kết chuẩn) |
| [`ETV.MV_KiemDinh/1. MV_Phy_Che_Air/MVA_DLVN389_NongDoKhiXQ/`](ETV.MV_KiemDinh/1.%20MV_Phy_Che_Air/MVA_DLVN389_NongDoKhiXQ/) | `ĐLVN 389:2021` — Phương tiện đo nồng độ khí của trạm quan trắc chất lượng không khí xung quanh: `1. Quy trinh/` (quy trình kiểm định, chuyển đổi `.md` từ văn bản ĐLVN đã ban hành), `2. Bieu mau/` (biên bản kiểm định `ETV.MVA.F389.01`) — không lưu bản `.pdf`/`.doc` gốc trong repo |
| [`ETV.MV_KiemDinh/1. MV_Phy_Che_Air/MVA_DLVN380_NongDoKhiThai/`](ETV.MV_KiemDinh/1.%20MV_Phy_Che_Air/MVA_DLVN380_NongDoKhiThai/) | `ĐLVN 380:2021` — Phương tiện đo nồng độ khí của trạm quan trắc khí thải: `1. Quy trinh/` (quy trình kiểm định), `2. Bieu mau/` (biên bản kiểm định theo Phụ lục 1 ĐLVN — file `.doc` gốc của ETV đang trống) — không lưu bản `.pdf`/`.doc` gốc trong repo |
| [`ETV.MV_KiemDinh/1. MV_Phy_Che_Air/MVA_DLVN333_KhiTuDong/`](ETV.MV_KiemDinh/1.%20MV_Phy_Che_Air/MVA_DLVN333_KhiTuDong/) | `ĐLVN 333:2016` — Phương tiện đo nồng độ SO2, CO, NO, NO2 của trạm quan trắc không khí tự động, liên tục: `1. Quy trinh/` (quy trình kiểm định), `2. Bieu mau/` (biên bản kiểm định theo Phụ lục 1 ĐLVN — file `.doc` gốc của ETV đang trống) — không lưu bản `.pdf`/`.doc` gốc trong repo |
| [`ETV.MC_HieuChuan/7. MC_Pressure/MCP_DLVN76_ApKe/`](ETV.MC_HieuChuan/7.%20MC_Pressure/MCP_DLVN76_ApKe/) | `ĐLVN 76:2001` — Áp kế, chân không kế kiểu lò xo và hiện số: `1. Quy trinh/` (quy trình hiệu chuẩn, chuyển đổi `.md` từ bản scan PDF), `2. Bieu mau/` (biên bản hiệu chuẩn `ETV.ĐLVN.76`) — không lưu bản `.pdf`/`.docx` gốc trong repo |
| [`ETV.MC_HieuChuan/1. MC_Phy_Che_Air/MCA04_GasO3/`](ETV.MC_HieuChuan/1.%20MC_Phy_Che_Air/MCA04_GasO3/) | `ETV.MCA 04` — Phương tiện đo nồng độ khí Ozone của trạm quan trắc chất lượng không khí xung quanh: `1. Quy trinh/` (quy trình hiệu chuẩn — tài liệu ETV tự soạn, tham khảo US EPA EPA-454/B-22-003, đang ở trạng thái **dự thảo** chờ soát xét/phê duyệt chính thức), `2. Bieu mau/` (biên bản hiệu chuẩn `ETV.MCA.F04.01`) |
| [`ETV.ME_DaoTao/9. ME_Length/MEL02_MaydinhviGPS/`](ETV.ME_DaoTao/9.%20ME_Length/MEL02_MaydinhviGPS/) | `ETV.MEL 02` — Giáo trình đào tạo phương tiện đo định vị bằng vệ tinh (GPS/GNSS): `1. Quy trinh/` (giáo trình đào tạo, lần ban hành 01 — 27/05/2026; Biên soạn: Dương Thành Nam, Soát xét: Trần Thị Hoa, Phê duyệt: Nguyễn Hoàng Giang) |
| [`ETV.ME_DaoTao/12. ME_MetrologyFoundation/MEMC01_NhanThucToChucHoiNhap/`](ETV.ME_DaoTao/12.%20ME_MetrologyFoundation/MEMC01_NhanThucToChucHoiNhap/) | `ETV.MEMC 01` — Giáo trình đào tạo nhận thức chung về tổ chức và hội nhập nhân sự (lĩnh vực Cơ sở đo lường học và năng lực nền tảng, tài liệu đầu tiên của lĩnh vực): `1. Quy trinh/` (giáo trình đào tạo kiêm bài giảng chi tiết, lần ban hành 01 — 20/07/2026; Biên soạn: Dương Thành Nam, Soát xét: Trần Thị Hoa, Phê duyệt: Nguyễn Hoàng Giang; triển khai nội dung §6.2(1)-(2) của `ETV.P03`) |

Các thư mục Dịch vụ/Lĩnh vực khác chưa có nội dung — tạo theo đúng quy tắc ở trên khi bắt đầu chuyển đổi/soạn thảo tài liệu thuộc dịch vụ/lĩnh vực đó.

**Ghi chú:** Danh mục phương pháp cấp cao (tên phương pháp, không phải nội dung quy trình đầy đủ) được quản lý tại `06_SHARED_RESOURCES/09_Methods/`.
**Lưu ý:** `05_MODULE_LIBRARY/M*` hiện chỉ chứa các module quy trình quản lý (MP-track, vd. M14_TaiLieu, M17_XemXetLanhDao) — chưa có module theo lĩnh vực hiệu chuẩn/thử nghiệm/kiểm định. Nội dung quy trình kỹ thuật (M-track) nằm trực tiếp trong `03_M/` theo cấu trúc ở trên.
