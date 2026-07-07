# 03_M — Method / Process / Work Instruction

Quy trình kỹ thuật, phương pháp, hướng dẫn công việc (SOP), quy trình hiệu chuẩn, quy trình kiểm định, quy trình thử nghiệm.

Cấu trúc thư mục có **3 cấp**: Dịch vụ → Lĩnh vực → Số hiệu quy trình.

## **Cấp 1 — Thư mục theo Dịch vụ**

Đặt tên theo mã hiệu: `ETV` (tên tổ chức) + `M` (Method — phương pháp/quy trình) + mã dịch vụ.

| Mã dịch vụ | Thư mục | Ý nghĩa |
|---|---|---|
| `C` | `ETV.MC_HieuChuan` | Quy trình hiệu chuẩn |
| `T` | `ETV.MT_ThuNghiem` | Quy trình thử nghiệm |
| `V` | `ETV.MV_KiemDinh` | Quy trình kiểm định |
| `P` | `ETV.MP_PhaCheCheTao` | Quy trình Pha chế — Chế tạo |
| `RA` | `ETV.MRA_QuanTracDoiChung` | Quy trình quan trắc đối chứng |
| `SMo` | `ETV.MSMo_DanhGiaHeThongTram` | Quy trình đánh giá hệ thống trạm |
| `H` | `ETV.MH_KiemDinhAnToan` | Quy trình kiểm định an toàn và tính năng kỹ thuật |
| `M` | `ETV.MM_ThaoTacChuan` | Quy trình thao tác chuẩn |

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

`{DV}` = mã dịch vụ cấp 1 (`MC`, `MT`, `MV`, `MP`, `MRA`, `MSMo`, `MH`, `MM`). Mỗi thư mục Dịch vụ chỉ tạo những lĩnh vực thực sự có tài liệu — không cần tạo đủ 0–11 ngay từ đầu.

**Lĩnh vực chưa có số thứ tự chính thức** (theo `Danh_Muc_linh_vuc_do_luong` — bổ sung số khi phát sinh tài liệu đầu tiên thuộc lĩnh vực đó, lấy số tiếp theo sau 11): Lực (`Fo`), Y tế (`Md`), Cơ học (`Me`), Phóng xạ (`R`), Thiết bị phụ (`IS`), Dụng cụ (`ITo`), Thiết bị khác (`IO`), Cơ sở đo lường học (`Un`), Thử nghiệm — với vai trò lĩnh vực riêng, không nhầm với mã dịch vụ `T` (`T` trùng ký hiệu Nhiệt độ, cần xem ngữ cảnh).

**Nguồn tham chiếu đầy đủ:** `Danh_Muc_linh_vuc_do_luong_11_...xlsx` (do người dùng cung cấp) — danh sách chính thức tên lĩnh vực + ký hiệu (QT) dùng trong mã số văn bản. File này không lưu trong repo; dùng để tra cứu khi cần thêm lĩnh vực mới.

## **Cấp 3 — Thư mục con theo Số hiệu quy trình**

Trong mỗi thư mục Lĩnh vực, mỗi quy trình (một số hiệu cụ thể) có một thư mục con riêng, đặt tên:

```
{Mã dịch vụ}{Mã lĩnh vực}{Số hiệu}_{Tên viết tắt của đối tượng}
```

- `{Mã dịch vụ}{Mã lĩnh vực}{Số hiệu}` = ghép mã số văn bản của quy trình chính, bỏ `ETV.` và bỏ các dấu chấm (vd. `ETV.MCL 04` → `MCL04`).
- `{Tên viết tắt của đối tượng}` = tên viết tắt (không dấu, liền không cách) của đối tượng đo/thiết bị mà quy trình áp dụng (vd. `MaydinhviGPS`).

Ví dụ: `9. MC_Length/MCL04_MaydinhviGPS`.

**Trường hợp quy trình áp dụng trực tiếp một văn bản ĐLVN đã ban hành** (không phải quy trình nội bộ ETV tự đánh số): giữ nguyên số hiệu ĐLVN làm phần `{Số hiệu}` (bỏ dấu cách/hai chấm và bỏ năm ban hành, vd. `DLVN 389:2021` → `DLVN389` — năm ban hành không thuộc số hiệu quy trình nên không đưa vào tên thư mục), xếp trực tiếp vào đúng thư mục Lĩnh vực như quy trình thường — không dùng slot `0. DLVN_Ban hanh` cho trường hợp này (slot đó chỉ dành cho các văn bản ĐLVN lưu tham khảo, chưa gắn với một lĩnh vực/quy trình áp dụng cụ thể). Ví dụ: `1. MV_Phy_Che_Air/MVA_DLVN389_NongDoKhiXQ`.

Toàn bộ tài liệu thuộc quy trình đó — quy trình chính, biên bản, bảng tính, hồ sơ điểm chuẩn, GCN, biểu mẫu/phụ lục khác, thư mục `diagrams/` — đều nằm chung trong thư mục Cấp 3 này, không rải ở cấp Lĩnh vực.

## **Mã số văn bản và cách xếp thư mục**

Mã số văn bản = `ETV.M{Dịch vụ}{Lĩnh vực} {số}`, ví dụ `ETV.MCL 04` = **M**ethod + **C**alibration (dịch vụ) + **L**ength (lĩnh vực) + số 04. Biểu mẫu/phụ lục đi kèm dùng mã `ETV.M{Dịch vụ}{Lĩnh vực}.F{số}.{yy}` (vd. `ETV.MCL.F04.01`).

**Khi nhận một file quy trình/biểu mẫu mới, xác định thư mục lưu theo đúng ký hiệu trong Số/mã của file:**
1. Chữ cái ngay sau `ETV.M` → tra bảng Cấp 1 → thư mục Dịch vụ (vd. `C` → `ETV.MC_HieuChuan`).
2. Chữ cái tiếp theo → tra bảng Cấp 2 → thư mục Lĩnh vực (vd. `L` → `9. MC_Length`).
3. Số hiệu quy trình (vd. `04`) → tra/khớp với thư mục Cấp 3 có tiền tố `{Mã dịch vụ}{Mã lĩnh vực}{Số hiệu}_` trong thư mục Lĩnh vực đó (vd. `MCL04_MaydinhviGPS`); nếu quy trình mới, tạo thư mục Cấp 3 mới theo đúng quy tắc đặt tên ở trên.
4. Toàn bộ quy trình chính + biểu mẫu/phụ lục + diagrams của cùng một mã số nằm chung trong thư mục Cấp 3 đó.

## **Danh mục phương pháp hiện có**

| Đường dẫn | Nội dung |
|---|---|
| [`ETV.MC_HieuChuan/9. MC_Length/MCL04_MaydinhviGPS/`](ETV.MC_HieuChuan/9.%20MC_Length/MCL04_MaydinhviGPS/) | `ETV.MCL.04` — Phương tiện đo định vị vệ tinh GNSS/GPS cầm tay (quy trình hiệu chuẩn), 4 biểu mẫu/phụ lục đi kèm (F04.01–F04.04) và thư mục `diagrams/` (sơ đồ liên kết chuẩn) |
| [`ETV.MV_KiemDinh/1. MV_Phy_Che_Air/MVA_DLVN389_NongDoKhiXQ/`](ETV.MV_KiemDinh/1.%20MV_Phy_Che_Air/MVA_DLVN389_NongDoKhiXQ/) | `ĐLVN 389:2021` — Phương tiện đo nồng độ khí của trạm quan trắc chất lượng không khí xung quanh (quy trình kiểm định, chuyển đổi sang `.md` từ văn bản ĐLVN đã ban hành) và biểu mẫu biên bản kiểm định `ETV.MVA.F389.01` đi kèm — không lưu bản `.pdf`/`.doc` gốc trong repo |

Các thư mục Dịch vụ/Lĩnh vực khác chưa có nội dung — tạo theo đúng quy tắc ở trên khi bắt đầu chuyển đổi/soạn thảo tài liệu thuộc dịch vụ/lĩnh vực đó.

**Ghi chú:** Danh mục phương pháp cấp cao (tên phương pháp, không phải nội dung quy trình đầy đủ) được quản lý tại `06_SHARED_RESOURCES/09_Methods/`.
**Lưu ý:** `05_MODULE_LIBRARY/M*` hiện chỉ chứa các module quy trình quản lý (MP-track, vd. M14_TaiLieu, M17_XemXetLanhDao) — chưa có module theo lĩnh vực hiệu chuẩn/thử nghiệm/kiểm định. Nội dung quy trình kỹ thuật (M-track) nằm trực tiếp trong `03_M/` theo cấu trúc ở trên.
