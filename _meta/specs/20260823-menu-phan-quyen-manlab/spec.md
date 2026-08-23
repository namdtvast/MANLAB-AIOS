# Feature Spec — 20260823-menu-phan-quyen-manlab

Thiết kế **menu và phân quyền** cho nền tảng ManLab (`09_ENGINEERING/aios-platform`).

Tier: **L** — đổi kiến trúc authorization, chạm security boundary, hạ tầng dùng chung cho cả
38 module. Phạm vi không gắn một module cụ thể → artifact lưu tại `_meta/specs/` theo mục 10
của `06_S_LapTrinhTheoDacTa/SKILL.md`.

Chế độ: **ANALYZE** — tài liệu này là đặc tả, chưa hiện thực hóa. Không sửa mã nguồn, không
sửa schema, không sửa `Sidebar.tsx` cho tới khi PLAN được duyệt.

Tham chiếu ngoài: có tham khảo tài liệu nghiên cứu phân quyền nền tảng DMC (bản người dùng
cung cấp) ở mức **nguyên lý** (RBAC + phạm vi dữ liệu + quyền theo trạng thái + tách vai trò +
bảo mật cấp trường + nhật ký). Toàn bộ **tên phân hệ, tên nhóm menu, mã vai trò, mã hành động
trong tài liệu này lấy theo vocabulary sẵn có của repo MANLAB-AIOS**, không mượn tên cấu phần
menu của tài liệu đó.

---

## RECON

### [FACT] Hiện trạng nền tảng

| # | Sự kiện quan sát được | Nguồn |
|---|---|---|
| F1 | Quyền nền tảng chỉ có 3 mức `ADMIN / MEMBER / VIEWER` (`enum PlatformRole`), gắn thẳng vào `User.role` | `prisma/schema.prisma:16-30` |
| F2 | Vai trò nghiệp vụ tách riêng theo module: `ModuleRoleAssignment(userId, moduleCode, role: String)` — `role` là **chuỗi tự do**, cố ý không dùng enum chung | `prisma/schema.prisma:112-122` + comment tại chỗ |
| F3 | Sidebar hiển thị **toàn bộ 38 module** cho **mọi** người dùng, dạng danh sách phẳng, chỉ lọc bằng ô tìm kiếm phía client; không có bất kỳ phép lọc theo quyền nào | `src/components/Sidebar.tsx`, `src/app/(platform)/layout.tsx` |
| F4 | Danh sách module trong `PlatformModule` được seed bằng cách quét `05_MODULE_LIBRARY/` + `04_PROCESS_LIBRARY/MPxx/manifest.yaml` — một nguồn sự thật, không hardcode | `prisma/seed.ts:1-60` |
| F5 | 10/38 module đã có code chạy thật: M01, M02, M03, M04, M10, M12, M16, M17, M21, M29 | `prisma/seed.ts` `ACTIVE_MODULE_CODES`; `src/lib/*` |
| F6 | Vocabulary vai trò thực tế đang dùng rất phân mảnh giữa các module: `NV`, `TP`, `TP_QLCL`, `LDP`, `LDV`, `QLCL`, `QLKT`, `NTH`, `VANPHONG`, `DANHGIAVIEN`, `TRUONGDOAN`, `DL`, `HC`, `AI_VIEWER`, `AI_OPERATOR`, `AI_ADMIN`, `AI_SECURITY_ADMIN`, `AI_AUDITOR`, `SUPER_ADMIN` | `src/lib/m*/rules.ts`, `prisma/seed.ts` |
| F7 | Tách vai trò (SoD) **đã được hiện thực nhưng lặp lại rời rạc** trong từng module: mỗi `rules.ts` tự viết `canReview`/`canApprove` kèm điều kiện `createdById !== u.id` | `src/lib/m10/rules.ts:56-61`, tương tự m01/m13/m16 |
| F8 | Mỗi module giữ nhật ký riêng (`M01AuditEntry`, `M10AuditEntry`, …, `AIAuditLog`); **không có bảng nhật ký chung ở tầng nền tảng** cho sự kiện đăng nhập / cấp–thu hồi quyền / truy cập chéo | `prisma/schema.prisma` (grep `AuditEntry`) |
| F9 | Không tồn tại model `Organization` / `Tenant` / `Membership`; nền tảng đang ngầm định phục vụ đúng một tổ chức (ETV) | `prisma/schema.prisma` |
| F10 | Mô hình phân quyền đa tổ chức **đã được đặc tả** cho M36 (User → Membership → Organization → Role → Permission → DataScope; 7 phạm vi dữ liệu; 3 quy tắc SoD MUST) nhưng chưa hiện thực hóa | `05_MODULE_LIBRARY/M36_ChungChiSo/01_Requirement/DacTa.md` §5, commit `f37a158` |
| F11 | 38 module dùng **chung một vòng đời trạng thái**: Nháp → Chờ soát xét → Chờ phê duyệt → Đã phê duyệt → (Đã công bố) → Hết hiệu lực/Hủy, với 4 vai trò khuôn mẫu: Người lập · soát xét · phê duyệt · công bố | `05_MODULE_LIBRARY/Mxx/README.md` (đồng nhất ở mọi module) |
| F12 | `M03Employee.department` là chuỗi tự do — nền tảng **chưa có cây đơn vị/phòng ban** dạng bảng | `prisma/schema.prisma:979-1004` |
| F13 | Ràng buộc ISO 42001 của repo: AI không bao giờ tự ra kết luận đo lường cuối cùng hoặc tự phê duyệt chứng chỉ/kết quả | `CLAUDE.md` (mục Skill AI); M36 DacTa §5.2 |
| F14 | `manifest.yaml` của MPxx hiện có khóa: `schema, code, slug, name, owner, status, standards, legal, capabilities, module`; `validate_links.py` **không** kiểm tra danh sách khóa này (chỉ kiểm tra sự tồn tại 3 file bắt buộc và tính đúng của link) | `04_PROCESS_LIBRARY/MP10_DamBaoKQ/manifest.yaml`, `_meta/SCHEMA.md:2`, `_meta/validate_links.py:23` |

### [ASSUMPTION] Giả định đã nêu rõ, cần xác nhận khi hiện thực hóa

- A1: ETV vừa là đơn vị vận hành nền tảng vừa là một tổ chức đo lường tham gia — thiết kế phải
  chịu được điều đó ngay từ đầu (đã được M36 DacTa §5.4 quy tắc 3 nêu là MUST).
- A2: Giai đoạn trước mắt chỉ có người dùng **nội bộ** đăng nhập; các vai trò ngoài tổ chức
  (chủ phương tiện đo, cơ quan quản lý, khách vãng lai) được thiết kế sẵn nhưng tắt bằng cờ.
- A3: Không có yêu cầu phải giữ nguyên `enum PlatformRole` — nhưng đổi nó là thay đổi phá vỡ
  (10 module đang chạy đọc `session.user.role`), nên thiết kế chọn hướng **bổ sung, không thay thế**.

### [QUESTION] Điểm chưa chốt — xem §13

---

## OUTCOME

```
Primary User    : Nhân sự ETV ở mọi cấp (chuyên viên, trưởng bộ phận, quản lý kỹ thuật,
                  quản lý chất lượng, lãnh đạo phòng, lãnh đạo Viện) dùng nền tảng hằng ngày.
Secondary User  : Đoàn đánh giá/kiểm toán nội bộ và bên ngoài — cần xem được bằng chứng
                  "ai làm gì, khi nào, với quyền nào" mà không được sửa dữ liệu.
Administrator   : Quản trị hệ thống (QTHT) và quản trị an toàn thông tin (QTAT).
External System : Tổ chức/đối tượng ngoài ETV theo M36 §5.2 (chủ phương tiện đo, cơ quan
                  quản lý, tra cứu công khai) — thiết kế sẵn, kích hoạt sau.

Problem:
  1. Menu không phản ánh quyền: mọi tài khoản đều nhìn thấy đủ 38 module như nhau (F3),
     người dùng phải tự đoán mình được làm gì.
  2. Danh sách phẳng 38 mục không có cấu trúc điều hướng — không nhóm, không ưu tiên,
     không có nơi hiển thị "việc đang chờ tôi".
  3. Mô hình quyền hai mảnh rời: PlatformRole 3 mức (F1) quá thô cho nghiệp vụ, còn vai
     trò module là chuỗi tự do (F2) nên không có danh mục, không kiểm chứng được, không
     dò được "vai trò X làm được gì trên toàn nền tảng".
  4. Quy tắc tách vai trò bị chép lại ở từng module (F7) — sửa một chỗ không lan sang chỗ
     khác, rủi ro lệch chuẩn khi xây tiếp 28 module còn lại.
  5. Không có nhật ký cấp/thu hồi quyền ở tầng nền tảng (F8) — thiếu bằng chứng cho
     ISO/IEC 27001 và ISO/IEC 42001.
  6. Chưa có tổ chức/tenant (F9) trong khi M36 đã đặc tả yêu cầu đa tổ chức (F10).

Current Situation:
  Sidebar render `prisma.platformModule.findMany()` không điều kiện; chặn truy cập chỉ ở
  mức "đã đăng nhập hay chưa"; phân quyền nghiệp vụ nằm phân tán trong `src/lib/m*/rules.ts`.

Expected Improvement:
  Một mô hình quyền duy nhất dùng chung cho cả 38 module, sinh menu từ chính quyền đó,
  tương thích ngược với 10 module đang chạy, và mở đường cho đa tổ chức theo M36 §5.

Success Criteria:
  - Hai người dùng khác vai trò đăng nhập → nhìn thấy hai cây menu khác nhau, đúng quyền.
  - Không thể chạm dữ liệu ngoài quyền bằng cách gõ thẳng URL/route hoặc gọi Server Action.
  - Thêm module thứ 39 không phải viết lại ma trận quyền — chỉ khai báo độ lệch so với khuôn.
  - Mọi thao tác cấp/thu hồi quyền để lại nhật ký không sửa được ở tầng nền tảng.
  - 10 module đang chạy không đổi hành vi sau khi hiện thực hóa (kiểm chứng bằng luồng thật).
```

---

## SPEC

### 1. Công thức quyết định quyền

```
CHO_PHEP = f( TaiKhoan, ToChuc, VaiTroModule, HanhDong, PhamViDuLieu, TrangThai, TachVaiTro )
```

Sáu điều kiện phải **đồng thời** đúng; thiếu bất kỳ điều kiện nào → từ chối. Nguyên tắc
`fail-closed`: không có khai báo quyền tường minh nghĩa là **không có quyền**, không suy diễn
"chưa cấm thì được phép".

Ba tầng quyền tách bạch, không lẫn vào nhau:

| Tầng | Trả lời | Lưu ở đâu |
|---|---|---|
| Truy cập nền tảng | Có được vào ManLab không, có phải quản trị nền tảng không | `User.role` (`PlatformRole` — giữ nguyên, F1) |
| Thuộc tổ chức nào | Người này đại diện tổ chức nào, với vai trò gì tại đó | `Membership` (mới, theo M36 §5.1) |
| Làm được gì trên nghiệp vụ | Vai trò nghiệp vụ trên từng module | `ModuleRoleAssignment` (giữ nguyên, mở rộng cột) |

> Quy tắc chống lẫn tầng: `PlatformRole = ADMIN` **không** tự sinh ra bất kỳ quyền nghiệp vụ
> nào (không được soát xét, không được phê duyệt, không được công bố). Quản trị nền tảng là
> quyền trên *hạ tầng*, không phải quyền trên *hồ sơ chuyên môn*. Xem §7 R-SoD-2.

### 2. Kiến trúc menu

Bốn cấp, trong đó **chỉ cấp 2 là module** — hai cấp còn lại là khung điều hướng:

```
Cấp 0  Hàng chờ cá nhân — "Việc của tôi"        (không phải module)
Cấp 1  Nhóm nghiệp vụ (8 nhóm)                   (không phải module)
Cấp 2  Module Mxx (38)                            PlatformModule
Cấp 3  Màn hình bên trong module                  route sẵn có của module
```

#### 2.1 Cấp 0 — "Việc của tôi"

Một mục đứng đầu sidebar, không thuộc nhóm nào, gom **bản ghi đang chờ chính người dùng
này hành động** xuyên mọi module, dựa trên đúng vòng đời chung (F11):

| Ngăn | Điều kiện |
|---|---|
| Tôi cần soát xét | bản ghi `Chờ soát xét` ở module người dùng có hành động `REVIEW`, và người dùng **không** phải người lập |
| Tôi cần phê duyệt | bản ghi `Chờ phê duyệt` ở module người dùng có hành động `APPROVE`, và không phải người lập/soát xét |
| Tôi được phân công | bản ghi có `assignedToId = tôi` chưa đóng |
| Bản nháp của tôi | bản ghi `Nháp` do tôi lập |
| Sắp đến hạn | bản ghi có mốc thời hạn trong N ngày thuộc phạm vi dữ liệu của tôi |

Ngăn nào không có quyền tương ứng thì **không render** (không hiển thị rỗng).

#### 2.2 Cấp 1 — 8 nhóm nghiệp vụ, phủ đúng 38 module, mỗi module đúng một nhóm

| Mã nhóm | Nhãn hiển thị | Module |
|---|---|---|
| `DIEU_HANH` | Điều hành & hoạch định | M25, M01, M24, M17, M16, M30, M31, M32 |
| `NGUON_LUC` | Nguồn lực | M03, M04, M05, M06, M26 |
| `KHACH_HANG` | Khách hàng & dịch vụ | M07, M12, M22 |
| `KY_THUAT` | Chuỗi kỹ thuật | M09, M08, M10, M18, M11, M19, M23, M20 |
| `CHAT_LUONG` | Chất lượng & tuân thủ | M13, M21, M14, M15, M02 |
| `DU_LIEU_SO` | Dữ liệu & chứng chỉ số | M34, M36, M37, M27, M38 |
| `CONG_NGHE` | Công nghệ & an toàn thông tin | M33, M28, M29, M35 |
| `QUAN_TRI` | Quản trị nền tảng | *(không map module — xem §2.4)* |

Thứ tự module **trong** nhóm đi theo dòng chảy nghiệp vụ (vd nhóm `KY_THUAT`: lấy mẫu →
phương pháp → đảm bảo kết quả → quy tắc quyết định → báo cáo → sản xuất → công bố → phân
phối), **không** theo thứ tự số Mxx và **không** theo ABC — đúng quy ước "đánh số theo thứ tự
logic" của repo.

**Nguồn sự thật của phép gán nhóm**: thêm khóa `menu_group` vào `04_PROCESS_LIBRARY/MPxx/manifest.yaml`
(nâng `schema: manlab-aios/process@1.1`, cập nhật `_meta/SCHEMA.md`), seed đọc lên đúng theo
cách đang làm với `name`/`capabilities` (F4). Không hardcode bảng ánh xạ trong `seed.ts` — sẽ
thành nguồn sự thật thứ hai. Module thiếu `menu_group` rơi vào nhóm mặc định `CHAT_LUONG` và
`seed.ts` in cảnh báo.

#### 2.3 Quy tắc hiển thị menu — sinh theo quyền, không vô hiệu hóa

1. Một module **hiện** trong sidebar khi và chỉ khi người dùng có ít nhất một hành động trên
   module đó với phạm vi dữ liệu khác rỗng.
2. Module không có quyền → **không render**, không render mờ/khóa. Không tải cả cây rồi ẩn ở
   client: sidebar là Server Component, danh sách gửi xuống trình duyệt đã lọc sẵn.
3. Một nhóm chỉ hiện khi có ≥1 module con hiện. Nhóm trống biến mất.
4. Module `COMING_SOON` (28 module chưa xây, F5) **không** vào sidebar chính. Chúng nằm ở
   trang "Bản đồ 38 module" trong nhóm `QUAN_TRI`, dành cho quản trị và đoàn đánh giá — giữ
   được giá trị "duyệt trạng thái số hóa qua một cổng" của registry hiện tại (F3) mà không
   làm nhiễu điều hướng hằng ngày.
5. Menu chỉ là **lớp trình bày**. Ẩn một mục không phải là biện pháp bảo vệ: mọi route và mọi
   Server Action tự kiểm tra quyền lại từ đầu (§9).

#### 2.4 Nhóm `QUAN_TRI` — các trang hệ thống (không phải module Mxx)

Tài khoản · Tổ chức · Danh mục vai trò · Ma trận quyền · Phạm vi dữ liệu · Yêu cầu cấp quyền ·
Nhật ký hệ thống · Bản đồ 38 module.

Chỉ hiện với `PlatformRole = ADMIN` hoặc vai trò `QTHT`/`QTAT`; trang "Nhật ký hệ thống" thêm
vai trò `KIEMTOAN` ở chế độ chỉ đọc.

### 3. Danh mục hành động chuẩn

15 hành động, suy ra từ chính vòng đời chung (F11) và từ `rules.ts` của 10 module đã chạy —
không mở rộng quá những gì nghiệp vụ repo thực sự có:

| Mã | Nghĩa | Xuất hiện ở |
|---|---|---|
| `VIEW` | Xem | mọi module |
| `CREATE` | Tạo | mọi module |
| `UPDATE` | Sửa | mọi module (chỉ ở trạng thái Nháp/bị trả lại) |
| `SUBMIT` | Trình | mọi module |
| `REVIEW` | Soát xét | M01, M10, M16, M21, M29… |
| `APPROVE` | Phê duyệt | mọi module |
| `REJECT` | Trả lại / từ chối | mọi module |
| `PUBLISH` | Công bố | M10, M21, M23, M36… |
| `ASSIGN` | Phân công | M01, M12, M13 |
| `VERIFY` | Thẩm xét hiệu lực sau xử lý | M01, M13 |
| `REVOKE` | Thu hồi | M02, M21, M36 |
| `CANCEL` | Hủy | mọi module |
| `EXPORT` | Kết xuất dữ liệu | mọi module |
| `CONFIGURE` | Cấu hình | M29, M33, M35 |
| `AUDIT` | Xem nhật ký | mọi module |

Mã quyền viết dạng `Mxx.ACTION` (vd `M10.APPROVE`). Chuỗi này là khóa duy nhất dùng ở cả
guard phía server lẫn menu resolver.

**Bất biến:** không có hành động `DELETE` cho bản ghi đã rời trạng thái `Nháp`. Sau khi công
bố chỉ được `REVOKE` / thay thế / tạo phiên bản mới — đúng nguyên tắc kiểm soát hồ sơ đã áp
dụng trong repo (MP14/MP15, M36 quy tắc 6).

### 4. Danh mục vai trò chuẩn

Chuẩn hóa vocabulary đang phân mảnh (F6) thành một danh mục có đăng ký, **giữ nguyên mã đã
dùng trong DB** để không phá 10 module đang chạy:

| Nhóm | Mã | Tên | Phạm vi mặc định |
|---|---|---|---|
| Thực hiện | `NV` | Chuyên viên/nhân viên | `OWN` + `DUOC_GIAO` |
| | `NTH` | Người thực hiện (hồ sơ kỹ thuật) | `OWN` + `DUOC_GIAO` |
| | `VANPHONG` | Văn phòng | `BO_PHAN` |
| | `DANHGIAVIEN` | Đánh giá viên nội bộ | `DUOC_GIAO` |
| Kiểm soát | `TP` | Trưởng bộ phận | `BO_PHAN` |
| | `TP_QLCL` | Trưởng bộ phận QLCL | `ORGANIZATION` |
| | `LDP` | Lãnh đạo phòng (người soát xét) | `BO_PHAN` |
| | `TRUONGDOAN` | Trưởng đoàn đánh giá | `DUOC_GIAO` |
| | `QLKT` | Quản lý kỹ thuật | `ORGANIZATION` |
| | `QLCL` | Quản lý chất lượng | `ORGANIZATION` |
| Phê duyệt | `LDV` | Lãnh đạo Viện | `ORGANIZATION` |
| Nền tảng | `QTHT` | Quản trị hệ thống | `PLATFORM` (hạ tầng) |
| | `QTAT` | Quản trị an toàn thông tin | `PLATFORM` (hạ tầng) |
| | `KIEMTOAN` | Kiểm toán/đánh giá — chỉ đọc + nhật ký | `ORGANIZATION`, chỉ `VIEW`/`AUDIT`/`EXPORT` |
| AI (M29) | `AI_VIEWER` `AI_OPERATOR` `AI_ADMIN` `AI_SECURITY_ADMIN` `AI_AUDITOR` | giữ nguyên đang dùng | theo M29 |
| | `AI_AGENT` | tài khoản dịch vụ cho agent | chỉ hành động được liệt kê tường minh |
| Ngoài tổ chức (M36 §5.2, tắt ở giai đoạn đầu) | `PTD_ADMIN` `PTD_NHANVIEN` `QLNN_GIAMSAT` `QLNN_THANHTRA` `GUEST` | giữ nguyên mã M36 đã đặc tả | theo M36 §5.3 |

Danh mục này lưu thành bảng `RoleCatalog` (§10) — `ModuleRoleAssignment.role` vẫn là `String`
(không phá F2) nhưng được **validate theo registry** ở tầng ứng dụng. Mã lạ bị từ chối khi
cấp quyền, đồng thời báo cáo ra trang "Danh mục vai trò".

### 5. Phạm vi dữ liệu

Kế thừa nguyên văn 7 phạm vi đã đặc tả ở M36 §5.3 (không đặt lại tên — một nguồn sự thật),
bổ sung 2 phạm vi nội bộ mà các module quản trị nội bộ cần:

| Mã | Nghĩa | Nguồn |
|---|---|---|
| `OWN` | Bản ghi do chính người dùng lập | M36 §5.3 |
| `DUOC_GIAO` | Bản ghi được phân công cho người dùng (`assignedToId`) | **bổ sung** — đã tồn tại trường trong M01/M12/M13 |
| `BO_PHAN` | Bản ghi thuộc đơn vị/phòng của người dùng | **bổ sung** — chặn bởi F12, xem §13 Q3 |
| `ORGANIZATION` | Toàn bộ bản ghi của tổ chức người dùng | M36 §5.3 |
| `LIEN_QUAN` | Đúng bản ghi bắc cầu hai tổ chức | M36 §5.3 |
| `NGANH` | Số liệu tổng hợp xuyên tổ chức (đếm/tỷ lệ, không chi tiết) | M36 §5.3 |
| `NGANH_CHI_TIET` | Chi tiết một bản ghi, có thời hạn, có nhật ký riêng | M36 §5.3 |
| `PLATFORM` | Toàn hệ thống | M36 §5.3 |
| `PLATFORM_CONG_KHAI` | Toàn hệ thống nhưng chỉ bản ghi đã công bố | M36 §5.3 |

**Quy tắc hiện thực (MUST):** phạm vi dữ liệu phải được dịch thành mệnh đề `where` của truy vấn
Prisma tại tầng truy cập dữ liệu, không bao giờ lọc sau khi đã lấy về, và không bao giờ tin
tham số do client gửi để xác định tổ chức (M36 §5.1).

### 6. Quyền theo trạng thái

Vì cả 38 module dùng chung một vòng đời (F11), định nghĩa **một khuôn quyền chuẩn** áp cho mọi
module; module lệch chuẩn chỉ khai phần lệch:

| Trạng thái | Hành động cho phép | Ai |
|---|---|---|
| `Nháp` | `UPDATE`, `SUBMIT`, `CANCEL` | người lập; `TP`/`LDP` của bộ phận |
| `Chờ soát xét` | `REVIEW`, `REJECT` | vai trò có `Mxx.REVIEW`, **khác** người lập |
| `Chờ phê duyệt` | `APPROVE`, `REJECT` | vai trò có `Mxx.APPROVE`, **khác** người lập và người soát xét |
| `Đã phê duyệt` | `PUBLISH`, `REVOKE` | vai trò có `Mxx.PUBLISH` |
| `Đã công bố` | `REVOKE`, thay thế/phiên bản mới | vai trò có `Mxx.REVOKE`, bắt buộc lý do |
| `Hết hiệu lực` / `Hủy` | chỉ `VIEW`, `AUDIT`, `EXPORT` | mọi vai trò có `Mxx.VIEW` |

Khuôn này chính là thứ khiến việc xây 28 module còn lại **không** phải viết 28 ma trận quyền:
mỗi module chỉ khai ngoại lệ (vd M10 có `PUBLISH` chặn bởi kết quả `FAIL`; M13 có `VERIFY`
sau khi khắc phục; M29 có `CONFIGURE`).

### 7. Quy tắc tách vai trò (MUST)

| Mã | Quy tắc | Trạng thái hiện tại |
|---|---|---|
| R-SoD-1 | Người lập ≠ người soát xét ≠ người phê duyệt trên cùng một bản ghi | đã hiện thực rời rạc ở từng module (F7) → **nâng lên một hàm dùng chung**, module gọi lại chứ không chép |
| R-SoD-2 | `PlatformRole = ADMIN` / `QTHT` / `QTAT` ⊗ mọi hành động `REVIEW`/`APPROVE`/`PUBLISH`/`REVOKE` | **mới** — hiện chưa có gì chặn |
| R-SoD-3 | `AI_AGENT` và mọi tài khoản dịch vụ AI ⊗ `APPROVE`, `PUBLISH`, `REVOKE`, ký số — kể cả gián tiếp qua tài khoản quyền cao | đã nêu ở `CLAUDE.md` + M36 §5.2 (F13) → **cần chặn ở tầng cấp quyền**, không chỉ ghi trong tài liệu |
| R-SoD-4 | `KIEMTOAN` chỉ `VIEW`/`AUDIT`/`EXPORT`, không có hành động đổi trạng thái | **mới** |
| R-SoD-5 | Vai trò có `validFrom`/`validTo`; hết hạn tự vô hiệu, không cần thao tác thủ công | **mới** |
| R-SoD-6 | Không đọc chéo tổ chức; trường hợp buộc phải đọc vì vận hành nền tảng thì ghi nhật ký loại riêng | M36 §5.4 quy tắc 2 |

Xung đột SoD được kiểm tra **tại thời điểm cấp quyền** (chặn ngay khi gán) *và* **tại thời điểm
thực hiện hành động** (chặn lần hai) — vì dữ liệu bản ghi mới quyết định được R-SoD-1.

### 8. Bảo mật cấp trường

Có quyền `VIEW` một bản ghi không đồng nghĩa được xem mọi trường của nó. Danh mục trường nhạy
cảm rút từ schema hiện có:

| Trường | Module | Ai được xem đầy đủ |
|---|---|---|
| Hồ sơ nhân sự: lương, điều khoản hợp đồng | M03 (`M03LaborContract`) | `VANPHONG`, `LDV`, chủ hồ sơ |
| Thông tin định danh khách hàng, nội dung cam kết bảo mật | M02 | `TP`, `QLCL`, `LDV` |
| Dữ liệu thô và độ không đảm bảo đo | M10, M11 | vai trò kỹ thuật trong cùng tổ chức; **không** lộ cho phạm vi `NGANH`/công khai (M36 §5.2) |
| Bí mật kết nối AI (`AISecret`) | M29 | `AI_SECURITY_ADMIN`, `QTAT` — luôn hiển thị dạng che, không bao giờ trả giá trị thật ra client |
| Nhật ký hệ thống | nền tảng | `QTAT`, `KIEMTOAN` — chỉ đọc, không sửa/xóa với mọi vai trò |

Trường bị che phải bị loại **ở phía server** (không `select`), không gửi xuống rồi ẩn bằng CSS.

### 9. Chuỗi kiểm soát 5 lớp

```
1. Phiên đăng nhập      — chưa đăng nhập → chuyển hướng /login          (đã có)
2. Cổng route           — route module Mxx yêu cầu tối thiểu Mxx.VIEW    (mới)
3. Cổng hành động       — mọi Server Action tự kiểm tra Mxx.ACTION       (có rời rạc → chuẩn hóa)
4. Lọc phạm vi dữ liệu  — dịch phạm vi thành where của truy vấn          (mới)
5. Che trường + nhật ký — loại trường nhạy cảm, ghi nhật ký thao tác     (một phần)
```

Lớp 3 không được phép tin lớp 2, lớp 4 không được phép tin lớp 3. Menu (§2.3) nằm **ngoài**
chuỗi này — nó chỉ phản chiếu kết quả, không tham gia bảo vệ.

### 10. Mô hình dữ liệu đề xuất

Nguyên tắc: **bổ sung, không thay thế** — `PlatformRole`, `ModuleRoleAssignment`, `PlatformModule`
giữ nguyên để 10 module đang chạy không đổi hành vi.

Bảng mới:

| Bảng | Vai trò | Ghi chú |
|---|---|---|
| `Organization` | tổ chức tham gia nền tảng | có `orgType` (`PTD`/`TCDL`/`QLNN`/`BEN_LIEN_QUAN`) — chính là trường M36 §5.6 điểm 1 đã yêu cầu |
| `OrgUnit` | đơn vị/phòng trong tổ chức | nền cho phạm vi `BO_PHAN`; thay thế dần `M03Employee.department` chuỗi tự do (F12) |
| `Membership` | `User` ↔ `Organization`, mang vai trò tại tổ chức đó | theo M36 §5.1 |
| `RoleCatalog` | danh mục vai trò chuẩn (§4) | `code`, `name`, `group`, `isService`, `isExternal` |
| `PermissionGrant` | `role` × `moduleCode` × `action` × `dataScope` | hiện thực §3–§6; khuôn chuẩn seed sẵn, module khai ngoại lệ |
| `RoleAssignmentRequest` | yêu cầu cấp quyền đi qua phê duyệt | không cho gán vai trò tùy ý; đúng vòng đời chung của repo |
| `PlatformAuditLog` | nhật ký tầng nền tảng | đăng nhập, cấp/thu hồi quyền, truy cập chéo tổ chức, từ chối truy cập — **bổ sung** cho các `MxxAuditEntry` nghiệp vụ (F8), không thay thế chúng |

Cột bổ sung (đều `nullable` → migration cộng thêm, không phá):

- `ModuleRoleAssignment`: `+organizationId`, `+validFrom`, `+validTo`, `+grantedById`, `+reason`.
- `PlatformModule`: `+menuGroup`, `+menuOrder` (seed từ `manifest.yaml`, §2.2).
- `User`: `+isServiceAccount` (phân biệt tài khoản dịch vụ AI với người thật — điều kiện của R-SoD-3).

### 11. Tiêu chí nghiệm thu

| Mã | Tiêu chí |
|---|---|
| AC-01 | Hai tài khoản khác vai trò đăng nhập → sidebar khác nhau; module không có quyền không xuất hiện trong HTML gửi về trình duyệt (kiểm tra bằng view-source, không phải bằng mắt). |
| AC-02 | Gõ thẳng URL route của module không có quyền → bị chặn, không rò tiêu đề/số lượng bản ghi qua thông báo lỗi. |
| AC-03 | Gọi Server Action của hành động không có quyền (bỏ qua UI) → bị chặn ở lớp 3. |
| AC-04 | Người lập không thể soát xét hoặc phê duyệt chính bản ghi của mình ở **mọi** module (không riêng M10/M13). |
| AC-05 | Tài khoản `PlatformRole = ADMIN` không kèm vai trò nghiệp vụ → không phê duyệt/công bố được bản ghi nào. |
| AC-06 | Tài khoản dịch vụ AI không thể được cấp `APPROVE`/`PUBLISH`/`REVOKE` — bị chặn ngay ở màn hình cấp quyền, không chỉ ở lúc thực hiện. |
| AC-07 | Vai trò hết `validTo` → mất quyền ngay lần kiểm tra kế tiếp, không cần thao tác thu hồi. |
| AC-08 | Bản ghi đã công bố không có đường nào xóa được; thu hồi bắt buộc có lý do và để lại nhật ký. |
| AC-09 | Vai trò `KIEMTOAN` xem được nhật ký nhưng không sửa/xóa được bản ghi nhật ký nào. |
| AC-10 | Phạm vi `BO_PHAN` chỉ trả về bản ghi đúng đơn vị; đổi tham số truy vấn không mở rộng được phạm vi. |
| AC-11 | Trường nhạy cảm (§8) không xuất hiện trong payload trả về server → client, kể cả khi UI không hiển thị. |
| AC-12 | Mọi lần cấp/thu hồi quyền ghi `PlatformAuditLog` với ai/khi nào/lý do/người duyệt. |
| AC-13 | Thêm một module mới vào registry mà không khai quyền → module đó **không** hiện với bất kỳ ai (fail-closed), thay vì hiện với tất cả. |
| AC-14 | 10 module đang chạy (M01, M02, M03, M04, M10, M12, M16, M17, M21, M29) giữ nguyên hành vi trên luồng thật sau khi hiện thực hóa. |
| AC-15 | `python3 _meta/validate_links.py` PASS sau khi sửa `manifest.yaml` của 38 MPxx. |

### 12. Yêu cầu phi chức năng

- Tính quyền một lần cho mỗi request, không truy vấn lặp cho từng mục menu (38 module × mỗi
  lần render là không chấp nhận được).
- Quyền nằm trong phiên đăng nhập được cache có thời hạn ngắn; thu hồi quyền có hiệu lực chậm
  nhất trong một khoảng xác định — phải nêu rõ con số trong PLAN, không để mơ hồ.
- Mọi thay đổi trạng thái đi kèm nhật ký trong cùng một giao dịch (đã là cách làm hiện tại của
  các module).

### 13. Điểm chưa chốt — cần xác nhận trước khi code hóa

| # | Vấn đề | Vì sao không tự quyết |
|---|---|---|
| Q1 | Mã quản trị tối cao: DB đang dùng `SUPER_ADMIN` (M29), M36 DacTa §5.2 viết `SUPERADMIN`, thiết kế này đề xuất `QTHT`. Ba mã cho một khái niệm. | Chọn mã nào là quyết định vocabulary xuyên module; đổi sai kéo theo sửa dữ liệu đã seed. |
| Q2 | ETV vừa vận hành nền tảng vừa là một tổ chức đo lường — tách thành hai tổ chức trong `Organization` hay một tổ chức hai vai? | M36 §5.4 quy tắc 3 bắt buộc tách vai trò nhưng chưa chốt cách mô hình hóa; ảnh hưởng trực tiếp đến dữ liệu đã có. |
| Q3 | Phạm vi `BO_PHAN` cần cây đơn vị thật, trong khi `M03Employee.department` đang là chuỗi tự do (F12). Lập `OrgUnit` mới và di trú, hay tạm suy ra từ chuỗi? | Đây là migration dữ liệu đang dùng thật → thuộc diện phải hỏi (mục 12 SKILL.md). |
| Q4 | Có bật đăng nhập cho đối tượng ngoài tổ chức (`PTD_*`, `QLNN_*`, `GUEST`) trong đợt này không? | Mở ranh giới bảo mật ra ngoài ETV là quyết định của chủ sở hữu nghiệp vụ, không phải quyết định kỹ thuật. |
| Q5 | Nhóm menu khai ở `manifest.yaml` (nâng schema lên 1.1) hay ở một file danh mục riêng trong `_meta/`? | Chạm quy ước tài liệu của 38 MPxx và `_meta/SCHEMA.md`. |
