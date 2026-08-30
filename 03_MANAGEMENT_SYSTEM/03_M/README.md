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
| `G` | `ETV.G_HuongDan` | Hướng dẫn công việc **không thuộc lĩnh vực đo lường** (CNTT, AI, hạ tầng số) — xem quy ước riêng bên dưới |

### Ngoại lệ — thư mục `ETV.G_HuongDan` (Hướng dẫn phi đo lường)

Hướng dẫn công việc mã `ETV.Gb xx` (ETV.P14 §6.2) **không có Lĩnh vực đo lường** nên không áp cấu trúc 4 cấp ở trên. Quy ước riêng, chỉ **2 cấp**:

```
ETV.G_HuongDan/
└── G{b}{số hiệu}_{Tên viết tắt đối tượng}/     ← một thư mục cho một hướng dẫn
    ├── ETV.G{b}{số hiệu}_{TenDayDu}.md          ← văn bản hướng dẫn
    └── 2. Bieu mau/                             ← chỉ tạo khi hướng dẫn có biểu mẫu riêng
```

`b` = ký hiệu phân loại của hướng dẫn. Nhóm **phân loại phi đo lường** đã được đăng ký chính thức tại ETV.P14 §6.2 (lần ban hành 04, hiệu lực 30/08/2026) và hiện có đúng một ký hiệu: `AI` — trí tuệ nhân tạo. Ký hiệu mới phải trình bổ sung vào ETV.P14 và được ban hành lại trước khi dùng.

Biểu mẫu riêng của hướng dẫn lưu tại `2. Bieu mau/` ngay trong thư mục hướng dẫn đó — xem quy tắc chung **Nơi lưu biểu mẫu** ở mục *Cấp 4* bên dưới.

| Đường dẫn | Nội dung |
|---|---|
| [`ETV.G_HuongDan/GAI01_MayChuMoHinhAI/`](ETV.G_HuongDan/GAI01_MayChuMoHinhAI/) | `ETV.GAI 01` — Hướng dẫn Tích hợp máy chủ mô hình AI nội bộ vào ManLab AIOS (**ban hành lần 01, hiệu lực 30/08/2026**; chủ trì ETV.P29; liên thủ tục P33/P35/P28/P34; **không lập biểu mẫu mới**) |
| [`ETV.G_HuongDan/GAI02_TriThucNguNghiaAI/`](ETV.G_HuongDan/GAI02_TriThucNguNghiaAI/) | `ETV.GAI 02` — Hướng dẫn Kiến trúc tri thức và ngữ nghĩa cho AI trong hệ sinh thái ManLab (chủ trì ETV.P29; liên thủ tục P26/P34/P28/P35; **không lập biểu mẫu mới**). Cắt trục khác GAI 01: GAI 01 là mô hình chạy *ở đâu*, GAI 02 là mô hình được cấp *cái gì* để trả lời |

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
| 2 | `2. Bieu mau` | Biểu mẫu kiểm soát của quy trình (mã `ETV.M{Dịch vụ}{Lĩnh vực}.F {số}.{yy}`): biên bản hiệu chuẩn/kiểm định, bảng tính, hồ sơ đi kèm |
| 3 | `3. GCN` | Mẫu giấy chứng nhận (hiệu chuẩn/kiểm định) |
| 4 | `4. Diagrams` | Sơ đồ, hình ảnh minh hoạ |

Chỉ tạo những thư mục con thực sự có tài liệu — không cần đủ 1–4 ngay từ đầu (vd. quy trình chỉ có Quy trình + Biểu mẫu thì không cần tạo `3. GCN`/`4. Diagrams`).

### Nơi lưu biểu mẫu — phân biệt theo loại tài liệu mẹ

Mã biểu mẫu quyết định nơi lưu, không phải loại nội dung:

| Biểu mẫu của | Mã biểu mẫu | Nơi lưu bản gốc |
|---|---|---|
| Thủ tục quản lý `ETV.Pxx` | `ETV.P.F {xx}.{yy}` | `06_SHARED_RESOURCES/01_Forms/` — một nguồn sự thật dùng chung cho nhiều thủ tục; `03_MANAGEMENT_SYSTEM/04_F/` chỉ là bản tham chiếu |
| Quy trình kỹ thuật `ETV.M{DV}{LV} xx` | `ETV.M{DV}{LV}.F {xx}.{yy}` | `2. Bieu mau/` **ngay trong thư mục quy trình đó** |
| Hướng dẫn công việc `ETV.G{b} xx` | `ETV.G{b}.F {xx}.{yy}` | `2. Bieu mau/` **ngay trong thư mục hướng dẫn đó** |

Biểu mẫu kỹ thuật đi liền văn bản mẹ vì mã của nó gắn cứng vào số hiệu quy trình (`ETV.MCA.F 01.01` chỉ thuộc `ETV.MCA 01`, không dùng lại được ở quy trình khác) — tách ra `06_SHARED_RESOURCES` sẽ làm đứt liên kết mã số và buộc phải nuôi hai đường dẫn cho cùng một tài liệu. Ngược lại, biểu mẫu thủ tục `ETV.P.F*` dùng chung xuyên nhiều thủ tục nên phải tập trung.

Ví dụ: `ETV.MCA.F 01.01` → `ETV.MC_HieuChuan/1. MC_Phy_Che_Air/MCA01_KhiTuDong/2. Bieu mau/ETV.MCA.F01.01_BBHC_KhiTuDong.md`.

### Tên file biểu mẫu — soi gương tên file quy trình

Tên file quy trình theo cấu trúc `{Mã}_{Loại}_{TenDoiTuong}` (vd. `ETV.MCA.01_QTHC_KhiTuDong.md`). **Biểu mẫu đi kèm dùng đúng cấu trúc đó**, chỉ đổi phần Mã sang mã biểu mẫu và phần Loại sang loại biểu mẫu — giữ nguyên `{TenDoiTuong}` của quy trình mẹ:

```
ETV.MCA.01_QTHC_KhiTuDong.md          ← quy trình
ETV.MCA.F01.01_BBHC_KhiTuDong.md      ← biểu mẫu, cùng TenDoiTuong
```

Nhờ giữ nguyên `{TenDoiTuong}`, nhìn tên file là biết ngay biểu mẫu thuộc quy trình nào mà không phải mở file — và khi sắp xếp theo tên, quy trình với biểu mẫu của nó đứng liền nhau.

| Phần | Quy tắc | Ví dụ |
|---|---|---|
| `{Mã}` | Mã biểu mẫu, bỏ dấu cách như trong tên file quy trình. Biểu mẫu là phụ lục của văn bản ĐLVN không có mã ETV riêng thì dùng tiền tố số hiệu ĐLVN như file quy trình | `ETV.MCA.F01.01`, `ETV.MVA.F389.01`, `DLVN333` |
| `{Loại}` | Viết tắt loại tài liệu — xem bảng dưới | `BBHC` |
| `{TenDoiTuong}` | **Sao đúng** phần `{TenDoiTuong}` của file quy trình mẹ | `KhiTuDong` |

**Viết tắt loại tài liệu** (dùng chung cho cả quy trình và biểu mẫu):

| Viết tắt | Nghĩa | Dùng cho |
|---|---|---|
| `QTHC` | Quy trình hiệu chuẩn | `1. Quy trinh` |
| `QTKD` | Quy trình kiểm định | `1. Quy trinh` |
| `QTTN` | Quy trình thử nghiệm | `1. Quy trinh` |
| `BBHC` | Biên bản hiệu chuẩn | `2. Bieu mau` |
| `BBKD` | Biên bản kiểm định | `2. Bieu mau` |
| `BBTN` | Biên bản thử nghiệm | `2. Bieu mau` |
| `GCN` | Mẫu giấy chứng nhận | `3. GCN` |

Phụ lục không thuộc các loại trên (bảng tính, hồ sơ dữ liệu…) chưa có viết tắt — dùng tên mô tả không dấu viết hoa đầu từ, vẫn giữ đủ ba phần: `ETV.MCL.F04.02_BangTinh_MaydinhviGPS.md`. Khi một loại mới lặp lại đủ nhiều, bổ sung viết tắt vào bảng trên thay vì để mỗi nơi đặt một kiểu.

## **Mã số văn bản và cách xếp thư mục**

Mã số văn bản = `ETV.M{Dịch vụ}{Lĩnh vực} {số}`, ví dụ `ETV.MCL 04` = **M**ethod + **C**alibration (dịch vụ) + **L**ength (lĩnh vực) + số 04. Biểu mẫu/phụ lục đi kèm dùng mã `ETV.M{Dịch vụ}{Lĩnh vực}.F{số}.{yy}` (vd. `ETV.MCL.F04.01`).

**Khi nhận một file quy trình/biểu mẫu mới, xác định thư mục lưu theo đúng ký hiệu trong Số/mã của file:**
1. Chữ cái ngay sau `ETV.M` → tra bảng Cấp 1 → thư mục Dịch vụ (vd. `C` → `ETV.MC_HieuChuan`).
2. Chữ cái tiếp theo → tra bảng Cấp 2 → thư mục Lĩnh vực (vd. `L` → `9. MC_Length`).
3. Số hiệu quy trình (vd. `04`) → tra/khớp với thư mục Cấp 3 có tiền tố `{Mã dịch vụ}{Mã lĩnh vực}{Số hiệu}_` trong thư mục Lĩnh vực đó (vd. `MCL04_MaydinhviGPS`); nếu quy trình mới, tạo thư mục Cấp 3 mới theo đúng quy tắc đặt tên ở trên.
4. Theo loại tài liệu (quy trình/biểu mẫu/GCN/diagram) → xếp vào đúng thư mục Cấp 4 tương ứng trong bảng trên; nếu chưa có thì tạo mới.

## **Properties (YAML frontmatter) của tài liệu**

Mỗi file `.md` trong `03_M` mở đầu bằng khối frontmatter. Các trường về chủ sở hữu và người ký áp dụng thống nhất:

| Trường | Quy tắc |
|---|---|
| `owner` | Luôn là `Viện Kiểm định Công nghệ và Môi trường` |
| `department` | Luôn là `Phòng Đo lường Chất lượng` |
| `prepared_by` | Người biên soạn — theo nhóm quy trình (xem bảng dưới) |
| `reviewed_by` | Người soát xét — **Quản lý chất lượng**, hiện là Trần Thị Hoa |
| `approved_by` | Người phê duyệt — **Viện trưởng**, hiện là Nguyễn Hoàng Giang |
| `prepared_date` / `reviewed_date` / `approved_date` | Bằng `effective_date` của văn bản |
| `effective_date` + `revision` | **Ngày và lần ban hành** — chỉ đổi khi văn bản được *ban hành lại* |
| `last_modified` | Ngày chỉnh sửa nội dung gần nhất **khi không ban hành lại**; chỉ thêm trường này trong trường hợp đó |

**Phân biệt quan trọng:** chỉnh sửa nội dung không đương nhiên là ban hành lại. Nếu văn bản được sửa nhưng vẫn giữ nguyên lần ban hành thì `revision`/`effective_date` **không đổi**, ghi ngày sửa vào `last_modified` và thêm một dòng trong bảng "Theo dõi sửa đổi tài liệu" với cột Lần ban hành giữ nguyên số cũ.

| Nhóm | Người biên soạn |
|---|---|
| `ETV.MCW` — Hoá lý (nước) | Nguyễn Văn Đồng |
| `ETV.MCA` — Hoá lý (khí) | Nguyễn Văn Huy |
| `ETV.MCL`, `ETV.ME*` — Độ dài, Giáo trình đào tạo (trừ MCL 01/02, xem dưới) | Dương Thành Nam |
| `ETV.MCP 02` — Chênh áp | Nguyễn Ngọc Tuấn (theo bản gốc) |
| `ETV.MCP 01`, `MCP 03`, `MCL 01`, `MCL 02`, `MCM 01`, `MCH 01`, `MCO 01`–`05`, `MCS 01`–`06`, `MCT 01`–`13`, `MCF 01`–`14` | *(chưa xác nhận — khối chữ ký trong PDF gốc để trống, `prepared_by` để trống chờ điền)* |

**Ngoại lệ — văn bản ĐLVN quốc gia** (`ĐLVN 76`, `112`, `133`, `138`, `160`, `333`, `380`, `389`): đây là văn bản do Tổng cục TCĐLCL / Tổng cục Môi trường ban hành, ETV chỉ áp dụng. Không gán `prepared_by`/`reviewed_by`/`approved_by` của ETV; thay vào đó dùng `issuing_body` (cơ quan ban hành gốc) và `applying_department` (đơn vị áp dụng nội bộ). Các **biểu mẫu** đi kèm trong cùng thư mục là tài liệu của ETV nên vẫn theo quy tắc chung.

Bảng chữ ký hiển thị ở đầu thân văn bản (`Biên soạn` / `Soát xét` / `Phê duyệt`) phải luôn khớp với frontmatter.

## **Danh mục phương pháp hiện có**

| Đường dẫn | Nội dung |
|---|---|
| [`ETV.MC_HieuChuan/2. MC_Mass/MCM01_Can/`](ETV.MC_HieuChuan/2.%20MC_Mass/MCM01_Can/) | `ETV.MCM 01` — Cân phân tích và cân kỹ thuật: `1. Quy trinh/` (tải trọng lệch tâm, độ nhạy, quả cân chuẩn OIML R76; chuyển đổi `.md` từ PDF, không lưu bản gốc) |
| [`ETV.MC_HieuChuan/7. MC_Pressure/MCP01_HuyetApKe/`](ETV.MC_HieuChuan/7.%20MC_Pressure/MCP01_HuyetApKe/) | `ETV.MCP 01` — Huyết áp kế: `1. Quy trinh/` |
| [`ETV.MC_HieuChuan/7. MC_Pressure/MCP02_ChenhAp/`](ETV.MC_HieuChuan/7.%20MC_Pressure/MCP02_ChenhAp/) | `ETV.MCP 02` — Áp kế kiểu chênh áp: `1. Quy trinh/` |
| [`ETV.MC_HieuChuan/7. MC_Pressure/MCP03_ApSuatNoiHap/`](ETV.MC_HieuChuan/7.%20MC_Pressure/MCP03_ApSuatNoiHap/) | `ETV.MCP 03` — Nồi hấp tiệt trùng (áp suất): `1. Quy trinh/` |
| [`ETV.MC_HieuChuan/9. MC_Length/MCL01_ThuocPanme/`](ETV.MC_HieuChuan/9.%20MC_Length/MCL01_ThuocPanme/) | `ETV.MCL 01` — Thước Panme: `1. Quy trinh/` |
| [`ETV.MC_HieuChuan/9. MC_Length/MCL02_ThuocCap/`](ETV.MC_HieuChuan/9.%20MC_Length/MCL02_ThuocCap/) | `ETV.MCL 02` — Thước cặp: `1. Quy trinh/` |
| [`ETV.MC_HieuChuan/10. MC_Hygro/MCH01_DoAm/`](ETV.MC_HieuChuan/10.%20MC_Hygro/MCH01_DoAm/) | `ETV.MCH 01` — Phương tiện đo độ ẩm không khí: `1. Quy trinh/` |
| [`ETV.MC_HieuChuan/1. MC_Phy_Che_Water/`](ETV.MC_HieuChuan/1.%20MC_Phy_Che_Water/) | **12 quy trình hiệu chuẩn lĩnh vực Hoá lý (nước)** — `ETV.MCW 01` … `ETV.MCW 13` (không có 11), mỗi quy trình một thư mục Cấp 3 với `1. Quy trinh/`; chuyển đổi `.md` từ bản PDF ban hành 22/04/2026, không lưu bản `.pdf` gốc trong repo: `MCW01_pH`, `MCW02_EC` (độ dẫn điện), `MCW03_DoDuc` (độ đục), `MCW04_ORP` (thế ôxy hoá khử), `MCW05_TDS` (tổng chất rắn hoà tan), `MCW06_DO` (oxy hoà tan), `MCW07_SALT` (độ mặn), `MCW08_NongDoChatTrongNuoc` (COD/BOD/TOC/TSS/kim loại… — 21 thông số), `MCW09_AAS` (quang phổ hấp thụ nguyên tử), `MCW10_DienTroSuat`, `MCW12_HPLC` (sắc ký lỏng), `MCW13_ICP` (plasma cảm ứng cao tần). Biểu mẫu Biên bản hiệu chuẩn `ETV.MCW.F xx.01` đã bổ sung vào `2. Bieu mau/` cho MCW 01–09 (chuyển đổi `.md` từ bản PDF gốc); MCW 10/12/13 chưa có bản gốc biểu mẫu |
| [`ETV.MC_HieuChuan/9. MC_Length/MCL04_MaydinhviGPS/`](ETV.MC_HieuChuan/9.%20MC_Length/MCL04_MaydinhviGPS/) | `ETV.MCL.04` — Phương tiện đo định vị vệ tinh GNSS/GPS cầm tay: `1. Quy trinh/` (quy trình hiệu chuẩn), `2. Bieu mau/` (biên bản, bảng tính, hồ sơ điểm chuẩn F04.01–F04.03), `3. GCN/` (mẫu GCN F04.04), `4. Diagrams/` (sơ đồ liên kết chuẩn) |
| [`ETV.MV_KiemDinh/1. MV_Phy_Che_Air/MVA01_KhiTuDong/`](ETV.MV_KiemDinh/1.%20MV_Phy_Che_Air/MVA01_KhiTuDong/) | `ETV.MVA 01` — Phương tiện đo nồng độ khí của trạm quan trắc không khí tự động, liên tục (15 thông số CO/SO₂/NO/NO₂/O₃/NH₃/THC/H₂S/VOCs/BTEX/CO₂/O₂): `1. Quy trinh/` (quy trình kiểm định, lần ban hành 01 — 19/05/2020; Biên soạn Nguyễn Ngọc Tuấn, Soát xét Nguyễn Chu Anh Tuấn, Phê duyệt Nguyễn Hoàng Giang), `2. Bieu mau/` (biên bản kiểm định `ETV.MVA.F 01.01`) — không lưu bản `.pdf`/`.doc` gốc trong repo. Ghi chú các sai khác của bản gốc: thân bài đánh số 7.3.2.1–7.3.2.5 lệch với bảng 1 (7.3.1–7.3.5); **chân trang biểu mẫu in nhầm mã `ETV.MCA.F 01.01`** (mã của biên bản hiệu chuẩn thuộc `ETV.MCA 01`, đã có trong repo với nội dung khác) và ngày 22/04/2019 sớm hơn quy trình mẹ |
| [`ETV.MV_KiemDinh/1. MV_Phy_Che_Air/MVA02_NongDoKhi/`](ETV.MV_KiemDinh/1.%20MV_Phy_Che_Air/MVA02_NongDoKhi/) | `ETV.MVA 02` — Phương tiện đo nồng độ khí (khí cầm tay và trạm tự động liên tục, 20 thông số): `1. Quy trinh/` (quy trình kiểm định, lần ban hành 01 — 19/05/2020), `2. Bieu mau/` (`ETV.MVA.F 02.01` biên bản kiểm định; `ETV.MVA.F 02.02` bản dùng cho trạm tự động, liên tục) — không lưu bản `.pdf`/`.doc` gốc trong repo. Hai điểm cần LĐP xử lý, đã ghi chú: (1) Dropbox có **ba biến thể** của cùng văn bản này, bản được dùng là bản 9 trang nằm trong `2. QTKD` nhưng **bị đặt tên nhầm là “ETV.MVA 03_Khi.pdf”**; (2) `ETV.MVA.F 02.02` khai “Phương pháp thực hiện: ETV.MVA 02” nhưng bộ phép đo (độ trôi 24 h, thời gian đáp ứng) là của `ETV.MVA 01` |
| [`ETV.MV_KiemDinh/1. MV_Phy_Che_Air/MVA_DLVN389_NongDoKhiXQ/`](ETV.MV_KiemDinh/1.%20MV_Phy_Che_Air/MVA_DLVN389_NongDoKhiXQ/) | `ĐLVN 389:2021` — Phương tiện đo nồng độ khí của trạm quan trắc chất lượng không khí xung quanh: `1. Quy trinh/` (quy trình kiểm định, chuyển đổi `.md` từ văn bản ĐLVN đã ban hành), `2. Bieu mau/` (biên bản kiểm định `ETV.MVA.F389.01`) — không lưu bản `.pdf`/`.doc` gốc trong repo |
| [`ETV.MV_KiemDinh/1. MV_Phy_Che_Air/MVA_DLVN380_NongDoKhiThai/`](ETV.MV_KiemDinh/1.%20MV_Phy_Che_Air/MVA_DLVN380_NongDoKhiThai/) | `ĐLVN 380:2021` — Phương tiện đo nồng độ khí của trạm quan trắc khí thải: `1. Quy trinh/` (quy trình kiểm định), `2. Bieu mau/` (biên bản kiểm định theo Phụ lục 1 ĐLVN — file `.doc` gốc của ETV đang trống) — không lưu bản `.pdf`/`.doc` gốc trong repo |
| [`ETV.MV_KiemDinh/1. MV_Phy_Che_Air/MVA_DLVN333_KhiTuDong/`](ETV.MV_KiemDinh/1.%20MV_Phy_Che_Air/MVA_DLVN333_KhiTuDong/) | `ĐLVN 333:2016` — Phương tiện đo nồng độ SO2, CO, NO, NO2 của trạm quan trắc không khí tự động, liên tục: `1. Quy trinh/` (quy trình kiểm định), `2. Bieu mau/` (biên bản kiểm định theo Phụ lục 1 ĐLVN — file `.doc` gốc của ETV đang trống) — không lưu bản `.pdf`/`.doc` gốc trong repo |
| [`ETV.MV_KiemDinh/1. MV_Phy_Che_Air/MVA_DLVN265_NongDoKhi/`](ETV.MV_KiemDinh/1.%20MV_Phy_Che_Air/MVA_DLVN265_NongDoKhi/) | `ĐLVN 265:2016` — Phương tiện đo nồng độ SO₂, CO₂, CO, NOₓ trong không khí (gồm cả trạm quan trắc **khí thải** tự động, liên tục; ETV gọi tắt là “khí cầm tay” trên Dropbox): `1. Quy trinh/` (quy trình kiểm định), `2. Bieu mau/` (biên bản kiểm định **riêng của ETV**, mã gốc `ETV.P.F 11.01/265:2016` — **xung đột**: `ETV.P.F 11.01` hiện đã đăng ký cho biểu mẫu “Phân công công việc / Cập nhật tem hỏng” của `ETV.P11`, đã ghi chú trong file biểu mẫu) — không lưu bản `.pdf`/`.doc` gốc trong repo. PDF gốc mất dấu tiếng Việt trên diện rộng khi trích xuất, đã khôi phục theo thuật ngữ ĐLVN và ghi chú; bố cục bảng của biểu mẫu `.doc` phục hồi từ file lỗi bố cục — cần LĐP đối chiếu bản in gốc |
| [`ETV.MV_KiemDinh/1. MV_Phy_Che_Air/MVA_DLVN214_KhiThaiXeCoGioi/`](ETV.MV_KiemDinh/1.%20MV_Phy_Che_Air/MVA_DLVN214_KhiThaiXeCoGioi/) | `ĐLVN 214:2017` — Phương tiện đo khí thải xe cơ giới (CO, CO₂, HC theo n-hexan, O₂): `1. Quy trinh/` (quy trình kiểm định), `2. Bieu mau/` (biên bản kiểm định theo Phụ lục ĐLVN — ETV chưa có biểu mẫu riêng, thư mục `3. BBKD` bản Dropbox trống) — không lưu bản `.pdf` gốc trong repo |
| [`ETV.MV_KiemDinh/1. MV_Phy_Che_Air/MVA_DLVN107_NongDoCon/`](ETV.MV_KiemDinh/1.%20MV_Phy_Che_Air/MVA_DLVN107_NongDoCon/) | `ĐLVN 107:2012` — Phương tiện đo hàm lượng cồn trong hơi thở (mg/L và %BAC, phương pháp khí khô và khí ướt): `1. Quy trinh/` (quy trình kiểm định), `2. Bieu mau/` (biên bản kiểm định theo Phụ lục ĐLVN — ETV chưa có biểu mẫu riêng) — không lưu bản `.pdf` gốc trong repo |
| [`ETV.MV_KiemDinh/1. MV_Phy_Che_Air/MVA_DLVN90_BuiTong/`](ETV.MV_KiemDinh/1.%20MV_Phy_Che_Air/MVA_DLVN90_BuiTong/) | `ĐLVN 90:2017` — Phương tiện đo hàm lượng bụi tổng trong không khí, phạm vi (0 ÷ 200) mg/m³: `1. Quy trinh/` (quy trình kiểm định), `2. Bieu mau/` (biên bản kiểm định **riêng của ETV**, mã gốc `ETV.P.F 11.01/90:2017` — **xung đột**: `ETV.P.F 11.01` hiện đã đăng ký cho biểu mẫu “Phân công công việc / Cập nhật tem hỏng” của `ETV.P11`, đã ghi chú trong file biểu mẫu) — không lưu bản `.pdf`/`.doc` gốc trong repo. Đã ghi chú hai sai khác của bản gốc: bảng 1 lệch số hiệu điều mục so với thân bài mục 7.3 và thiếu phép “Kiểm tra điểm không”; biểu mẫu ETV ghi điều kiện nhiệt độ (25 ± 2) °C trong khi ĐLVN quy định (25 ± 3) °C |
| [`ETV.MC_HieuChuan/7. MC_Pressure/MCP_DLVN76_ApKe/`](ETV.MC_HieuChuan/7.%20MC_Pressure/MCP_DLVN76_ApKe/) | `ĐLVN 76:2001` — Áp kế, chân không kế kiểu lò xo và hiện số: `1. Quy trinh/` (quy trình hiệu chuẩn, chuyển đổi `.md` từ bản scan PDF), `2. Bieu mau/` (biên bản hiệu chuẩn `ETV.ĐLVN.76`) — không lưu bản `.pdf`/`.docx` gốc trong repo |
| [`ETV.MC_HieuChuan/7. MC_Pressure/MCP_DLVN112_ChuyenDoiApSuat/`](ETV.MC_HieuChuan/7.%20MC_Pressure/MCP_DLVN112_ChuyenDoiApSuat/) | `ĐLVN 112:2002` — Thiết bị chuyển đổi áp suất (pressure transducer/transmitter): `1. Quy trinh/`; PDF gốc dùng phông chữ TCVN3 không giải mã được bằng trích xuất trực tiếp, chuyển đổi bằng OCR (`tesseract` tiếng Việt) trên ảnh quét — Phụ lục 1 (ví dụ số ĐKĐB) không transcribe đầy đủ số liệu do OCR sai lệch nhiều |
| [`ETV.MC_HieuChuan/7. MC_Pressure/MCP_DLVN133_DatMucApSuat/`](ETV.MC_HieuChuan/7.%20MC_Pressure/MCP_DLVN133_DatMucApSuat/) | `ĐLVN 133:2004` — Thiết bị đặt mức áp suất (pressure switch): `1. Quy trinh/`; chuyển đổi bằng OCR (cùng lý do phông chữ TCVN3); công thức ĐKĐB mục 8 phục hồi theo cấu trúc GUM chuẩn từ ngữ cảnh OCR, đã ghi chú |
| [`ETV.MC_HieuChuan/1. MC_Phy_Che_Air/MCA01_KhiTuDong/`](ETV.MC_HieuChuan/1.%20MC_Phy_Che_Air/MCA01_KhiTuDong/) | `ETV.MCA 01` — Phương tiện đo nồng độ khí (SO₂, CO, NOₓ, THC, O₃) của trạm quan trắc không khí tự động, liên tục: `1. Quy trinh/` (quy trình hiệu chuẩn, lần ban hành 02 — 22/04/2026), `2. Bieu mau/` (biên bản hiệu chuẩn `ETV.MCA.F 01.01`, chuyển đổi `.md` từ bản PDF gốc, gồm cả Biên bản ghi nhận hiệu chỉnh phương tiện đo) — không lưu bản `.pdf`/`.doc` gốc trong repo; biểu mẫu đã chốt cùng lần ban hành 02 — 22/04/2026 với quy trình mẹ (chân trang bản PDF gốc ghi nhầm 22/04/2023, đã đính chính và ghi chú trong file biểu mẫu) |
| [`ETV.MC_HieuChuan/1. MC_Phy_Che_Air/MCA04_GasO3/`](ETV.MC_HieuChuan/1.%20MC_Phy_Che_Air/MCA04_GasO3/) | `ETV.MCA 04` — Phương tiện đo nồng độ khí Ozone của trạm quan trắc chất lượng không khí xung quanh: `1. Quy trinh/` (quy trình hiệu chuẩn — tài liệu ETV tự soạn, tham khảo US EPA EPA-454/B-22-003, đang ở trạng thái **dự thảo** chờ soát xét/phê duyệt chính thức), `2. Bieu mau/` (biên bản hiệu chuẩn `ETV.MCA.F04.01`) |
| [`ETV.ME_DaoTao/9. ME_Length/MEL02_MaydinhviGPS/`](ETV.ME_DaoTao/9.%20ME_Length/MEL02_MaydinhviGPS/) | `ETV.MEL 02` — Giáo trình đào tạo phương tiện đo định vị bằng vệ tinh (GPS/GNSS): `1. Quy trinh/` (giáo trình đào tạo, lần ban hành 01 — 27/05/2026; Biên soạn: Dương Thành Nam, Soát xét: Trần Thị Hoa, Phê duyệt: Nguyễn Hoàng Giang) |
| [`ETV.ME_DaoTao/5. ME_Frequency/MES02_DongHoBamGiay/`](ETV.ME_DaoTao/5.%20ME_Frequency/MES02_DongHoBamGiay/) | `ETV.MES 02` — Giáo trình đào tạo phương tiện đo đồng hồ bấm giây: `1. Quy trinh/` (giáo trình đào tạo, lần ban hành 01 — 27/05/2026; Biên soạn: Dương Thành Nam, Soát xét: Trần Thị Hoa, Phê duyệt: Nguyễn Hoàng Giang) |
| [`ETV.ME_DaoTao/12. ME_MetrologyFoundation/MEMC01_NhanThucToChucHoiNhap/`](ETV.ME_DaoTao/12.%20ME_MetrologyFoundation/MEMC01_NhanThucToChucHoiNhap/) | `ETV.MEMC 01` — Giáo trình đào tạo nhận thức chung về tổ chức và hội nhập nhân sự (lĩnh vực Cơ sở đo lường học và năng lực nền tảng, tài liệu đầu tiên của lĩnh vực): `1. Quy trinh/` (giáo trình đào tạo kiêm bài giảng chi tiết, lần ban hành 01 — 20/07/2026, chỉnh sửa nội dung gần nhất 22/07/2026 — không ban hành lại; Biên soạn: Dương Thành Nam, Soát xét: Trần Thị Hoa, Phê duyệt: Nguyễn Hoàng Giang; triển khai nội dung §6.2(1)-(2) của `ETV.P03`) |
| [`ETV.MC_HieuChuan/4. MC_Optics/`](ETV.MC_HieuChuan/4.%20MC_Optics/) | **5 quy trình hiệu chuẩn lĩnh vực Quang học** — `ETV.MCO 01` … `ETV.MCO 05`, mỗi quy trình một thư mục Cấp 3 với `1. Quy trinh/`; chuyển đổi `.md` từ bản PDF, không lưu bản `.pdf` gốc trong repo, `prepared_by` để trống (khối chữ ký gốc trống): `MCO01_UVVIS` (quang phổ UV-VIS), `MCO02_CuongDoAnhSang` (cường độ ánh sáng — một số công thức ĐKĐB là hình ảnh trong bản gốc, không trích xuất được), `MCO03_BuiXQ` (bụi tổng trong không khí xung quanh — dùng bản `Bui XQ_V3`, bỏ bản trùng số `Bui -V2` theo quyết định người dùng), `MCO04_BuiKhiThai` (bụi trong khí thải — một số công thức là hình ảnh trong bản gốc), `MCO05_ChuanBui` (hệ thống chuẩn nồng độ khối lượng bụi PM10/PM2,5 — tài liệu dài 21 trang, có ghi chú các bất thường đánh số công thức và lỗi chân trang trong bản gốc) |
| [`ETV.MC_HieuChuan/5. MC_Frequency/`](ETV.MC_HieuChuan/5.%20MC_Frequency/) | **6 quy trình hiệu chuẩn lĩnh vực Thời gian — Tần số** — `ETV.MCS 01` … `ETV.MCS 06`, mỗi quy trình một thư mục Cấp 3 với `1. Quy trinh/`; chuyển đổi `.md` từ bản PDF, không lưu bản `.pdf` gốc trong repo, `prepared_by` để trống (khối chữ ký gốc trống): `MCS01_DoOn` (phương tiện đo độ ồn), `MCS02_TocDoVongQuay` (máy tốc độ vòng quay — máy ly tâm, máy giặt, động cơ…), `MCS03_HoaTanVienNen` (máy thử độ hòa tan viên nén/viên nang — dùng Prednisone chuẩn + UV-Vis, có ghi chú sai khác ngày ban hành giữa trang bìa và chân trang bản gốc), `MCS04_MaiMon` (máy thử độ mài mòn — bản gốc có dấu hiệu tái sử dụng mẫu từ MCS03/05 chưa cập nhật hết tên đối tượng, đã ghi chú), `MCS05_TanRa` (máy thử độ tan rã), `MCS06_DongHoBamGiay` (đồng hồ bấm giây — phát hiện văn bản ẩn trong PDF gốc mang tên người biên soạn dù khối chữ ký hiển thị trống, đã ghi chú) |
| [`ETV.MC_HieuChuan/6. MC_Temp/`](ETV.MC_HieuChuan/6.%20MC_Temp/) | **13 quy trình hiệu chuẩn lĩnh vực Nhiệt độ** — `ETV.MCT 01` … `ETV.MCT 13`, mỗi quy trình một thư mục Cấp 3 với `1. Quy trinh/`; chuyển đổi `.md` từ bản PDF, không lưu bản `.pdf` gốc trong repo, `prepared_by` để trống (khối chữ ký gốc trống hoặc chỉ có văn bản ẩn không khớp bản hiển thị — đã ghi chú riêng tại MCT02/MCT13): `MCT01_TuNhiet` (tủ nhiệt), `MCT02_PhaMauCOD` (thiết bị phá mẫu COD và tương tự), `MCT03_NhietDoKhongKhi` (phương tiện đo nhiệt độ không khí), `MCT04_CapNhietDoK` (cặp nhiệt điện công nghiệp), `MCT05_LoNhiet` (lò nhiệt/temperature block), `MCT06_ThietBiHapTietTrung` (nồi hấp tiệt trùng), `MCT07_BeDieuNhiet` (bể điều nhiệt), `MCT08_ThietBiChungCat` (thiết bị chưng cất đạm — chân trang bản gốc in nhầm mã MCT02, đã ghi chú), `MCT09_NhietKeThuyTinh` (nhiệt kế thủy tinh chất lỏng — Phụ lục 2 dạng ảnh không trích xuất được), `MCT10_NhietKeTTTNCucDai` (nhiệt kế thủy tinh-thủy ngân cơ cấu cực đại), `MCT11_NhietKeYHoc` (nhiệt kế y học thủy tinh-thủy ngân cơ cấu cực đại), `MCT12_LoNung` (lò nung), `MCT13_LoViSong` (lò vi sóng — mô hình ĐKĐB công suất theo phương pháp GUM đầy đủ nhất trong nhóm) |
| [`ETV.MC_HieuChuan/6. MC_Temp/MCT_DLVN138_NhietKeHienSoTuongTu/`](ETV.MC_HieuChuan/6.%20MC_Temp/MCT_DLVN138_NhietKeHienSoTuongTu/) | `ĐLVN 138:2004` — Nhiệt kế chỉ thị hiện số và tương tự: `1. Quy trinh/`; PDF gốc dùng phông chữ TCVN3 không giải mã được bằng trích xuất trực tiếp, chuyển đổi bằng OCR (`tesseract` tiếng Việt) trên ảnh quét — công thức ĐKĐB Phụ lục 1 phục hồi từ ngữ cảnh OCR, đánh số mục 6.5 có bất thường trong bản gốc (tiểu mục ghi "6.3.5.x"), đã ghi chú |
| [`ETV.MC_HieuChuan/6. MC_Temp/MCT_DLVN160_ChiThiNhietDo/`](ETV.MC_HieuChuan/6.%20MC_Temp/MCT_DLVN160_ChiThiNhietDo/) | `ĐLVN 160:2005` — Thiết bị chỉ thị nhiệt độ hiện số và tương tự: `1. Quy trinh/`; PDF gốc (Word 2016) có luồng nội dung lỗi khiến `pdftotext` chỉ đọc được trang bìa, chuyển đổi bằng OCR trên ảnh quét toàn bộ 13 trang — cấu trúc song hành với `ĐLVN 138:2004` cùng nhóm |
| [`ETV.MC_HieuChuan/3. MC_Volume_Flow/`](ETV.MC_HieuChuan/3.%20MC_Volume_Flow/) | **14 quy trình hiệu chuẩn lĩnh vực Dung tích — Lưu lượng** — `ETV.MCF 01` … `ETV.MCF 14`, mỗi quy trình một thư mục Cấp 3 với `1. Quy trinh/`; chuyển đổi `.md` từ bản PDF, không lưu bản `.pdf` gốc trong repo, `prepared_by` để trống (khối chữ ký gốc trống): `MCF01_LuuLuongKhi` (lưu lượng khí), `MCF02_DongHoDoKhi` (đồng hồ đo thể tích khí — ghi chú sai khác ngày ban hành trang bìa/bảng theo dõi), `MCF03_TocDoGio` (vận tốc gió dải thấp — dùng hầm tạo gió chuẩn Omega WTM-1000), `MCF04_LuuLuongKhiThai` (lưu lượng khí thải theo Thông tư 24/2017/TT-BTNMT — ghi chú thân bài giữ nguyên text lần ban hành cũ), `MCF05_LuuLuongKenhHo` (lưu lượng kênh hở — đập tràn/máng Parshall, tài liệu dài nhất nhóm, nhiều công thức/hình vẽ là ảnh không trích xuất được), `MCF06_LuuLuongOngKin` (lưu lượng ống kín — mục ký hiệu bị sao chép nhầm từ MCF05, đã ghi chú), `MCF07_Micropipet` (micropipet — phương pháp khối lượng theo ISO/TR 20461), `MCF08_DoMucTuDong` (đo mức tự động — lần ban hành 02 có nội dung thân bài sao chép nhầm từ MCF05; **đã ban hành lại lần 03 (11/08/2026), biên soạn đúng đối tượng, đã soát xét/phê duyệt chính thức theo ETV.P14** — xem phiếu `ETV.P.F14.01_2026-08-11_MCF08_DoMucTuDong.md` trong `04_F/`), `MCF09_DungCuThuyTinh` (dụng cụ thuỷ tinh thí nghiệm — buret/pipet/bình định mức), `MCF10_PhaLoangKhiChuan` (thiết bị pha loãng khí chuẩn — nhiều ký hiệu công thức ĐKĐB bị mất khi trích xuất, đã ghi chú suy luận), `MCF11_PTDLuongMua` (phương tiện đo lượng mưa — có mục đánh số trùng "7.4.3.4", đã ghi chú), `MCF12_DoMucNuoc` (phương tiện đo mực nước — mục 6.4.1 sao chép nhầm nội dung PTĐ pH, đã ghi chú), `MCF13_VanTocGioDaiCao` (vận tốc gió dải cao — hầm tạo gió chuẩn Omega WT4401, có Phụ lục khảo sát trường tốc độ gió; ghi chú sai khác lần ban hành trang bìa/chân trang), `MCF14_LuuLuongKhiThaiOngKhoi` (vận tốc và lưu lượng khí thải trong ống khói — ống Pitot, theo Thông tư 24/2017/TT-BTNMT; ghi chú mã biểu mẫu Phụ lục nhầm sang MCF04) |
| [`ETV.MC_HieuChuan/8. MC_Electric/MCE01_DienVanNang/`](ETV.MC_HieuChuan/8.%20MC_Electric/MCE01_DienVanNang/) | `ETV.MCE 01` — Thiết bị đo điện vạn năng: **mới có `2. Bieu mau/`** (biên bản hiệu chuẩn `ETV.MCE.F 01.01`, chuyển đổi `.md` từ bản PDF gốc), **chưa có quy trình hiệu chuẩn** trong repo — thư mục đầu tiên của lĩnh vực Điện từ. Khi chuyển đổi/ban hành `ETV.MCE 01`, phải rà lại lần ban hành của biểu mẫu cho khớp quy trình mẹ |

**Biểu mẫu Biên bản hiệu chuẩn (`BBHC`) — đợt bổ sung 30/08/2026:** đã chuyển đổi `.md` từ bản PDF gốc và đưa vào `2. Bieu mau/` của **47 quy trình**: `ETV.MCA 02–03`, `ETV.MCE 01`, `ETV.MCF 01–12`, `ETV.MCH 01`, `ETV.MCM 01`, `ETV.MCO 01/03/04`, `ETV.MCP 01–02`, `ETV.MCS 01–02`, `ETV.MCT 01–09/12/13`, `ETV.MCW 01–09`, `ĐLVN 133/138/160`. Lần ban hành và ngày ban hành của mỗi biểu mẫu lấy theo quy trình mẹ (riêng ba biểu mẫu ĐLVN giữ theo chân trang bản PDF vì quy trình mẹ là văn bản quốc gia, không có lần ban hành nội bộ). Không lưu bản `.pdf` gốc trong repo. Các sai khác phát hiện khi đối chiếu (mã lĩnh vực sai ở chân trang `ETV.MCF 03`, `ETV.MCF 11`, `ETV.MCO 01`; loại tài liệu sai ở `ETV.MCA 03`; đánh số mục trùng ở `ETV.MCW 06`) đã ghi trong mục *Ghi chú chuyển đổi* của từng biểu mẫu, không tự sửa bản gốc.

Các thư mục Dịch vụ/Lĩnh vực khác chưa có nội dung — tạo theo đúng quy tắc ở trên khi bắt đầu chuyển đổi/soạn thảo tài liệu thuộc dịch vụ/lĩnh vực đó.

**Ghi chú:** Danh mục phương pháp cấp cao (tên phương pháp, không phải nội dung quy trình đầy đủ) được quản lý tại `06_SHARED_RESOURCES/09_Methods/`.
**Lưu ý:** `05_MODULE_LIBRARY/M*` hiện chỉ chứa các module quy trình quản lý (MP-track, vd. M14_TaiLieu, M17_XemXetLanhDao) — chưa có module theo lĩnh vực hiệu chuẩn/thử nghiệm/kiểm định. Nội dung quy trình kỹ thuật (M-track) nằm trực tiếp trong `03_M/` theo cấu trúc ở trên.
