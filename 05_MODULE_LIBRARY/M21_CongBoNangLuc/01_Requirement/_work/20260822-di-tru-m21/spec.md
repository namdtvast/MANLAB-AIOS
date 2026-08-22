# M21_CongBoNangLuc — Đặc tả di trú vào aios-platform (Increment 1)

Tier: **M** (đổi schema DB + business rule đáng kể + nhiều file + UI/backend không tầm thường,
nhưng không đụng auth/tenant isolation/breaking public API/production infra → không lên Tier L).

Theo đúng mẫu Increment 1 đã làm với M10 (xem
`05_MODULE_LIBRARY/M10_DamBaoKQ/01_Requirement/_work/20260822-increment1-di-tru-vao-aios-platform/verify.md`):
port **control rules** hiện có sang `09_ENGINEERING/aios-platform/src/lib/m21/`, gate theo vai trò
thật, verify qua Browser — KHÔNG đồng nghĩa "đã hoàn thiện theo đặc tả đầy đủ" (xem mục "Ngoài phạm vi").

## OUTCOME

- **WHO**: Người thực hiện (NTH), Lãnh đạo phòng (LDP), Lãnh đạo Viện (LDV) của Viện ETV.
- **WHAT**: Lập, soát xét, phê duyệt/ký số, gửi cơ quan tiếp nhận, công khai và duy trì hồ sơ
  công bố năng lực đo lường (NQ 66.18) / thông báo hoạt động quan trắc môi trường (NQ 66.19),
  dùng chung DB/auth với nền tảng hợp nhất thay vì app standalone (`08_Source/index.html`,
  dữ liệu localStorage riêng từng trình duyệt — không có audit trail tập trung, không chia sẻ
  được giữa nhiều người dùng thật).
- **WHY**: M21 đã đánh dấu `ACTIVE` trong `PlatformModule` từ Increment 0 nhưng vẫn là app
  độc lập không có DB thật (README gốc: "Dữ liệu demo lưu bằng localStorage... xóa dữ liệu trình
  duyệt sẽ mất dữ liệu demo"). Không có audit trail tập trung nghĩa là không đáp ứng được ISO
  17025 §8.5 (kiểm soát hồ sơ) khi nhiều người dùng thao tác trên nhiều máy.
- **SUCCESS CRITERIA**: NTH/LDP/LDV đăng nhập bằng tài khoản thật (không phải localStorage demo),
  đi hết luồng chualap→danglap→soatxet→dnldv→phenoibo→dagui→tiepnhan→conghieu cho cả 2 loại hồ sơ
  (DL, QTMT), dữ liệu lưu Postgres dùng chung, có audit log theo actor thật, `validate_links.py`
  PASS.

## RECON — phát hiện chính từ `08_Source/index.html` (1355 dòng, JS thuần một file)

`README.md` gốc mô tả đúng nghiệp vụ nhưng có 2 điểm README nói rộng hơn code thực tế implement
— ghi rõ để không port nhầm cái README "nói" thành cái code THẬT làm:

- README nói "tự kiểm tra cổng G1–G7" nhưng `function gateCheck` chỉ thật sự chặn **G1** (PTĐ đã
  duyệt), **G3** (đã liên kết quy trình), **G6** (đã gán năng lực pháp lý); G2/G4/G5/G7 không tồn
  tại trong code — CMC (G2) và phạm vi đo (G5) chỉ là cảnh báo mềm, bắt buộc lại ở `lineGaps` khi
  "Gửi soát xét", không phải gate chặn ở bước chọn đối tượng.
- Cột nguồn dữ liệu Danh mục Phương tiện đo là **API ManLab thật chưa tồn tại**
  (`https://manlab.etv.org.vn/api/phuong-tien-do`) — code luôn fallback về dữ liệu nhúng
  (`DL_SERVICES`/mảng hardcode) khi không gọi được. M05_ThietBi (module quản lý danh mục PTĐ)
  cũng đang `COMING_SOON`, chưa có backend thật trong aios-platform.

### State machine (`var TR`, port nguyên trạng — 12 trạng thái)

```
chualap -[Bắt đầu lập hồ sơ]-> danglap
danglap -[Gửi soát xét; guard: hasGoodLine; check: recordGaps]-> soatxet
soatxet -[Trả lại bổ sung; role LDP; reason bắt buộc]-> danglap
soatxet -[Duyệt soát xét · Đề nghị LĐV duyệt; role LDP]-> dnldv
dnldv -[Trả lại soát xét; role LDV; reason bắt buộc]-> soatxet
dnldv -[Phê duyệt nội bộ & ký số; role LDV; đặt kyso=true,kysoAt=now]-> phenoibo
phenoibo -[Gửi cơ quan tiếp nhận; role LDP; đặt ngayGui=today]-> dagui
dagui -[Ghi nhận biên nhận; cần nhập maBienNhan]-> tiepnhan
dagui -[Cơ quan yêu cầu bổ sung; reason bắt buộc; đặt kyso=false]-> yeucaubosung
yeucaubosung -[Quay lại chỉnh sửa, bổ sung; đặt ngayGui=null]-> danglap
tiepnhan -[Công khai & sinh QR; role LDP; đặt ngayCongKhai=today]-> conghieu
conghieu -[Điều chỉnh (mở khóa, tạo phiên bản mới); reason bắt buộc; lưu snapshot vào phienBanCu;
           đặt kyso=false]-> dieuchinh
conghieu -[Tạm dừng; role LDV; reason bắt buộc]-> tamdung
conghieu -[Hủy bỏ; role LDV; reason bắt buộc]-> huybo
conghieu -[Đánh dấu hết hiệu lực; role LDV]-> hethieu
dieuchinh -[Hoàn tất điều chỉnh & khóa phiên bản mới; role LDP; tăng lan (số hiệu, "01"→"02"...),
            đặt ngayCongKhai=today, kyso=true,kysoAt=now]-> conghieu
tamdung -[Khôi phục; role LDV]-> conghieu
tamdung -[Hủy bỏ; role LDV; reason bắt buộc]-> huybo
huybo, hethieu: trạng thái cuối (không có transition tiếp)
```

Ràng buộc chặn transition (đọc từ `doTransition`):
- `state.role===0` (Super Admin) **không bao giờ** được phê duyệt nội dung chuyên môn — chỉ cấu
  hình hệ thống (đúng nguyên tắc ISO 42001 "AI/hệ thống không tự phê duyệt" áp rộng ra cả role
  admin kỹ thuật ở đây, dù đây không phải AI mà là quy tắc phân quyền nghiệp vụ gốc).
- Chuyển `soatxet→dnldv` yêu cầu `guard: hasGoodLine` — hồ sơ phải có ≥1 dòng đối tượng có kết
  quả `dapung` hoặc `dieuchinh` (không được toàn bộ `khong`).
- Chuyển `danglap→soatxet` yêu cầu `check: recordGaps` — chặn nếu thiếu trường bắt buộc Mục 8.2.
- Chuyển tới `phenoibo` (ký số) chặn thêm nếu có dòng `khong`/`dieuchinh` mà chưa ghi lý do +
  bằng chứng (BR10) — kiểm tra kép, không chỉ dựa vào `recordGaps` lúc gửi soát xét trước đó vì
  dữ liệu có thể đổi giữa các bước.
- `reason:true` → bắt buộc nhập lý do (không rỗng) mới cho transition chạy.
- `needReceipt:true` (dagui→tiepnhan) → bắt buộc nhập mã biên nhận, tự đặt `ngayTiepNhan=today`.

### Đối tượng dữ liệu chính — Hồ sơ (header)

| Trường | Kiểu | Bắt buộc lúc "Gửi soát xét" | Ghi chú |
|---|---|---|---|
| id/code | string | tự sinh | `"CB-"` (DL) hoặc `"TB-"` (QTMT) + số thứ tự + `/2026` |
| loai | enum DL / QTMT | có | không đổi sau khi tạo |
| socb, lan | string | tự sinh | `lan` = số hiệu phiên bản, "01" tăng dần khi điều chỉnh |
| ngay | date | tự sinh (ngày tạo) | |
| toChuc, diaChi, daiDien | string | có | mặc định = thông tin ETV, cho sửa |
| dienThoai, email | string | không | mặc định = thông tin ETV |
| diaDiem | string | **có, chỉ loại DL** | "Địa điểm thực hiện hoạt động" |
| coQuanTiepNhan | string | có | mặc định theo loại: DL → Trung tâm Phục vụ HCC TP Hà Nội;
  QTMT → Bộ Nông nghiệp và Môi trường |
| coQuanChuQuan, congNhanSo, congNhanHieuLuc | string | không | |
| trangThai | enum (12 giá trị ở trên) | tự quản lý qua transition | |
| kyso, kysoAt | boolean/datetime | tự quản lý | true sau "Phê duyệt nội bộ & ký số" |
| ngayGui, maBienNhan, ngayTiepNhan, ngayCongKhai | date/string | tự quản lý qua transition | |
| phienBanCu | JSON array | tự quản lý | snapshot `{lan, ngayHieuLuc, luuLuc, lines}` mỗi lần "Điều chỉnh" |
| baoCaoHangNam | JSON, chỉ QTMT | không (ngoài phạm vi tăng — xem dưới) | `{ky,khoiLuong,thayDoi,qaqc,suCo,nguoiLap,ngayLap}` |
| lines | quan hệ 1-N | ≥1 dòng | xem bảng Dòng đối tượng |
| lichSu | quan hệ 1-N | tự sinh | audit log |

### Dòng đối tượng trong phạm vi hồ sơ (`blankLine`/`lineGaps`)

| Trường | Bắt buộc khi "Gửi soát xét" | Ghi chú |
|---|---|---|
| dichVu | tự set | `"kiemdinh"` (DL) hoặc `"quantrac"` (QTMT) |
| ten, linhVuc, phamVi, quyTrinh, ccx | có | ccx = "Cấp/ĐCX/MPE/LOD" |
| nguoiTH | không | điền tự động khi chọn từ danh mục PTĐ (fallback rỗng khi nhập tay) |
| kq | enum `dapung` / `khong` / `dieuchinh` | mặc định `dapung` |
| lyDo | **có, khi kq∈{khong,dieuchinh}** | BR10 |
| bangChung/bcFileName/bcFileType/bcFileData | **≥1 trong 2 (ghi chú text hoặc file), khi kq∈{khong,dieuchinh}** | BR10 — xem quyết định phạm vi file bên dưới |
| linked, catalogRef | boolean/string | có chọn từ danh mục PTĐ hay tự nhập tay |

### Quy tắc nghiệp vụ (BR) — port nguyên trạng từ `rulesPanel`/`gateCheck`

- **BR1**: hồ sơ đã ký số (từ `dnldv→phenoibo`) → dữ liệu khóa, không sửa trực tiếp (chỉ sửa qua
  "Điều chỉnh" tạo phiên bản mới).
- **BR2** (chỉ DL): sau khi "Gửi cơ quan tiếp nhận" (`ngayGui`), hạn ghi nhận = `ngayGui + 3 ngày
  làm việc`. Hiển thị cảnh báo còn/quá hạn.
- **BR3** (chỉ QTMT): BẮT BUỘC ở trạng thái `tiepnhan`/`conghieu`/`dieuchinh` (tức đã gửi/được
  tiếp nhận Mẫu 9.01) TRƯỚC khi cung cấp dịch vụ quan trắc — trạng thái khác thì chặn/cảnh báo.
- **BR4·BR5**: chỉ hồ sơ trạng thái `conghieu` mới "Còn hiệu lực" — hợp lệ dùng trong báo giá/hợp
  đồng/chứng chỉ/phiếu kết quả/báo cáo; `tamdung`/`dieuchinh`/`huybo`/`hethieu` bị chặn/cảnh báo
  mạnh.
- **BR6** (chỉ QTMT): Báo cáo hằng năm Mẫu 9.02 phải gửi Bộ Nông nghiệp và Môi trường trước
  30/01 hằng năm — cảnh báo khi còn ≤30 ngày.
- **BR8**: cơ chế tự công bố/thông báo chỉ áp dụng đến **28/02/2027** — cảnh báo khi còn ≤90 ngày,
  báo lỗi/hết hiệu lực sau mốc này. (Ngày cứng trong code gốc — port nguyên giá trị, không tính
  động theo config.)
- **BR9**: cần ≥1 dòng đối tượng "Đáp ứng"/"Điều chỉnh" (không được toàn bộ "Không đáp ứng") mới
  được gửi soát xét/công bố (guard `hasGoodLine`).
- **BR10**: dòng "Không đáp ứng"/"Điều chỉnh" bắt buộc ghi lý do + bằng chứng — kiểm tra tại
  `lineGaps` (gửi soát xét) và lại tại `phenoibo` (trước khi ký số).
- **BR11**: khi hồ sơ chuyển sang `conghieu`, ghi audit "PA-B: Danh mục PTĐ ghi năng lực & chuyển
  Đang sử dụng" — đây là sự kiện ghi ngược sang M05 (Danh mục PTĐ), **M05 chưa có backend thật
  nên chỉ ghi log sự kiện, không thật sự update M05** (M05 vẫn `COMING_SOON`) — nêu rõ trong UI
  là "đã phát sự kiện, chờ M05 xử lý" thay vì giả vờ đã đồng bộ.

### Gate chọn đối tượng từ Danh mục PTĐ (`gateCheck`) — G1/G3/G6

- G1: `item.trangThaiPTD` ∈ {"Đã duyệt","ĐN LĐV duyệt"} — nếu không, chặn chọn, báo rõ trạng thái
  hiện tại.
- G3: `item.quyTrinh` phải có giá trị (đã liên kết quy trình thực hiện).
- G6: `item.nangLucCode` phải có giá trị (đã gán năng lực pháp lý ĐK105/ĐK107/N383/VILAS/Giấy
  KHCN).
- Cảnh báo mềm (không chặn ở bước chọn, bắt buộc lại ở `lineGaps`): CMC (chỉ dịch vụ `"HC"` —
  hiệu chuẩn) và phạm vi đo.

### Vai trò (port nguyên `ROLES`, KHÔNG dùng chung enum với M10 — đúng ghi chú trong schema.prisma)

`ModuleRoleAssignment.moduleCode = "M21"`, `role` ∈ {`"NTH"`, `"LDP"`, `"LDV"`}. Không port role
`"Super Admin"` (role=0) vào `ModuleRoleAssignment` — Super Admin ở app gốc chỉ để cấu hình
(login riêng), không phải vai trò nghiệp vụ; ở aios-platform việc "cấu hình" tương đương
`PlatformRole.ADMIN`, không cần vai trò M21 riêng.

## Quyết định phạm vi (đọc kỹ trước khi BUILD — tránh SPEC/PLAN drift)

1. **Danh mục Phương tiện đo**: dùng **dữ liệu nhúng tĩnh** (port từ mảng embedded trong
   `index.html`), KHÔNG gọi API ManLab thật (không tồn tại) và KHÔNG liên kết DB M05 thật (M05
   chưa có backend). Đúng như hành vi fallback hiện có của app gốc — không phải regression.
2. **Bằng chứng (evidence) BR10**: increment này chỉ port trường **text** (`bangChung`) làm bắt
   buộc thay thế cho file. KHÔNG xây upload file/blob storage thật (chưa có hạ tầng lưu file nào
   trong aios-platform, kể cả M10 cũng chưa có — xem `M10Assessment.evidence` chỉ là `Int` đếm số
   lượng, không phải file thật). Trường `bcFileName` giữ trong schema nhưng chỉ nhận tên file demo
   *(text, không lưu nội dung)* — ghi rõ trong UI đây là placeholder, không phải upload thật.
3. **Trang công khai + QR** (`renderPublic`, `fakeQR` sinh QR giả bằng canvas — không phải QR thật
   mã hoá dữ liệu thật), **in A4 Mẫu 01/9.01** (`renderDoc`/`docDL`/`docQT`), **modal hướng dẫn**
   (`openGuide`): **ngoài phạm vi increment này** — cùng logic với việc M10 Increment 1 cũng chưa
   đạt phạm vi đầy đủ `DacTa.md`. Trang chi tiết hồ sơ vẫn hiển thị đủ dữ liệu (không ẩn), chỉ
   chưa có bản in/trang tra cứu công khai riêng.
4. **Báo cáo hằng năm (Mẫu 9.02, QTMT)**: lưu trường `baoCaoHangNam` trong schema (đã có sẵn cấu
   trúc từ `newRecord`) nhưng **UI nhập liệu ngoài phạm vi increment này** — chỉ cảnh báo hạn ở
   BR6 trong ActionPanel, chưa có form nhập Mẫu 9.02.

## Acceptance Criteria

- [ ] Tạo được hồ sơ DL và hồ sơ QTMT, mỗi loại đi hết state machine tới `conghieu` bằng 3 tài
  khoản NTH/LDP/LDV thật (không phải localStorage demo).
- [ ] `hasGoodLine`/`recordGaps`/`lineGaps`/gate `phenoibo` chặn đúng như code gốc (thử ≥1
  trường hợp chặn thật qua Browser, không chỉ đọc code).
- [ ] Role gate đúng: NTH không tự soát xét/phê duyệt được hồ sơ mình tạo (giống nguyên tắc tách
  vai trò R2 của M10) — kiểm tra `t.role&&state.role<t.role` port đúng.
- [ ] `reason` bắt buộc khi transition có `reason:true`; `maBienNhan` bắt buộc ở
  `dagui→tiepnhan`.
- [ ] Audit log hiển thị đúng actor thật + vai trò tại thời điểm hành động (giống `M10AuditEntry`).
- [ ] `python3 _meta/validate_links.py` PASS sau khi sửa.

## NFR

- Không đổi authentication/tenant isolation — dùng nguyên `auth()`/`ModuleRoleAssignment` đã có.
- Không thêm dependency mới ngoài những gì `aios-platform` đã có (không cần thư viện QR/canvas
  vì trang công khai ngoài phạm vi).
