# M33_HeThongTT — Đặc tả yêu cầu

> **Nguồn và giới hạn nguồn**: **chưa có Thủ tục `ETV.P33`** trong `03_MANAGEMENT_SYSTEM/02_P/` và
> **chưa có biểu mẫu `F33.xx`** trong `06_SHARED_RESOURCES/01_Forms/` (0/0). Căn cứ đã ban hành gồm:
> Sổ tay chất lượng **§10.2 Quản lý hệ thống thông tin** (quản lý – vận hành – khai thác – bảo trì
> để hệ thống hoạt động ổn định, an toàn, hiệu quả) và **§7.11**; Thủ tục **`ETV.P28` — Quản lý an
> toàn thông tin** (ban hành 24/08/2026) mục **5.7.1–5.7.5** (định danh và truy cập, thiết bị đầu
> cuối, mạng và dịch vụ, mật mã, nhật ký) và mục **5.9**; Thủ tục **`ETV.P35` — Quản lý nền tảng số**
> (ban hành 24/08/2026) mục 1.4 — **giao rõ cho ETV.MP33: "hạ tầng công nghệ thông tin, máy chủ,
> mạng, thiết bị đầu cuối, tài khoản người dùng"**; Thủ tục `ETV.P02` §6.8; `ETV.P15`.
>
> **Các thủ tục đã ban hành là nguồn sự thật**: quy tắc nào dẫn từ `ETV.P28`/`ETV.P35` thì M33 **áp
> dụng nguyên**, không diễn giải lại. Phần còn lại **suy dẫn** từ ISO/IEC 27001 A.5.9, A.7.9–A.7.10,
> A.8.1, A.8.7–A.8.9, A.8.19–A.8.22, A.8.32; ISO 9001 §7.1.3 (cơ sở hạ tầng); ISO/IEC 17025 §6.4 và
> §7.11 — được đánh dấu `[SUY DẪN]` và phải được xác nhận cùng việc **ban hành `ETV.P33` + bộ biểu
> mẫu F33.xx theo MP14** trước khi BUILD. Xem câu hỏi cần chốt ở mục 10.

## 1. Mục tiêu module

Số hóa MP33 — **kiểm kê, vận hành, bảo trì, kiểm soát tài khoản kỹ thuật và xử lý sự cố** đối với
**hạ tầng công nghệ thông tin** của Viện (máy chủ, mạng, thiết bị đầu cuối, thiết bị lưu trữ, phần
mềm và bản quyền, dịch vụ CNTT thuê ngoài), để hạ tầng luôn **có chủ, đúng cấu hình an toàn, được
vá lỗi, được bảo trì đúng hạn và khôi phục nhanh khi hỏng** (QM §10.2; ISO 9001 §7.1.3).

M33 là **lớp hạ tầng bên dưới**: nền tảng số chạy trên hạ tầng do M33 quản lý (M35 trỏ xuống bằng
`infra_ref`), dữ liệu do M27 kiểm kê nằm trên thiết bị do M33 kiểm kê (M27 trỏ bằng `system_ref`),
quyền truy cập do M28 phê duyệt được M33 **thực thi** trên hệ thống thật.

M33 **không phải hệ thống giám sát kỹ thuật**: module không thay thế công cụ monitoring, không tự
thu thập nhật ký, không tự quét lỗ hổng. Module giữ **hồ sơ quản trị và bằng chứng** — thiết bị nào
đang chạy ở đâu, ai chịu trách nhiệm, đã vá lỗi và bảo trì tới đâu, tài khoản nào tồn tại trên hệ
thống nào theo phiếu nào, sự cố được xử lý và định tuyến ra sao.

**Ranh giới**

| Module | M33 làm gì với nó | M33 **không** làm |
|---|---|---|
| **M35_NenTangSo** (`ETV.P35` đã ban hành) | Cấp hạ tầng bên dưới nền tảng (`infra_ref` từ M35 trỏ xuống M33); chặn ngừng vận hành hạ tầng khi còn nền tảng Hiệu lực phụ thuộc | Không đăng ký nền tảng số, không đánh giá trước vận hành nền tảng, không quản lý điểm tích hợp |
| **M27_TaiSanTT** | Kiểm kê **thiết bị/hệ thống/phần mềm**; M27 kiểm kê **dữ liệu** và trỏ xuống bằng `system_ref` | Không phân loại dữ liệu, không sao lưu – phục hồi – hủy dữ liệu (quy tắc R2, R10) |
| **M28_ATTT** (`ETV.P28` đã ban hành) | **Thực thi** kiểm soát kỹ thuật P28 §5.7 và thực hiện cấp/thu hồi quyền theo phiếu đã phê duyệt của M28; chuyển sự cố có dấu hiệu mất ATTT sang M28 | Không đánh giá rủi ro ATTT, **không phê duyệt quyền truy cập**, không kết luận sự cố ATTT, không quản lý SoA |
| **M30_ThayDoi** | Chuyển mọi thay đổi cấu hình ngoài bảo trì định kỳ sang M30 kèm đánh giá ảnh hưởng ATTT (`ETV.P28` mục 5.9) | Không thẩm định, không phê duyệt thay đổi |
| **M10_DamBaoKQ** | Chặn thay đổi trên máy tính điều khiển/thu thập dữ liệu thiết bị đo khi chưa đánh giá ảnh hưởng hiệu lực kết quả đo | **Không** tự kết luận về hiệu lực kết quả đo — thẩm quyền của M10 |
| **M05_ThietBi** | Trỏ tới thiết bị đo mà máy tính/phần mềm điều khiển đang phục vụ | Không quản lý hiệu chuẩn, kiểm định, vòng đời thiết bị đo |
| **M06_MuaSam / M07_HopDong** | Trỏ hồ sơ mua sắm, hợp đồng bảo trì, nhà cung cấp dịch vụ CNTT | Không mua sắm, không đánh giá nhà cung cấp |
| **M03_NhanSu** | Nhận tín hiệu nghỉ việc/chuyển công tác để thu hồi thiết bị và tài khoản | Không quản lý nhân sự, không quyết định thôi việc |
| **M13_KhacPhuc** | Mở KPH khi sự cố hạ tầng lặp lại hoặc bảo trì quá hạn kéo dài | Không phân tích nguyên nhân gốc |
| **M31_LienTuc** | Cấp thông tin hạ tầng trọng yếu và thời gian khôi phục làm đầu vào BCP/DR | Không lập kế hoạch liên tục, không tổ chức diễn tập |
| **M01_RuiRo** | Mở rủi ro cho hạ tầng hết vòng đời (EOL) còn phục vụ hoạt động trọng yếu | Không đánh giá, không xử lý rủi ro |

## 2. Đối tượng dữ liệu chính

Bốn thực thể nghiệp vụ + nhật ký. Trục chính là `ITAsset`; ba thực thể còn lại là ba dòng vận hành
quanh nó: **bảo trì – vá lỗi**, **tài khoản trên hệ thống**, **sự cố – yêu cầu hỗ trợ**.

| Đối tượng | Mô tả | Biểu mẫu đề xuất (chưa ban hành) |
|---|---|---|
| `ITAsset` | Cấu phần hạ tầng CNTT trong danh mục kiểm kê | F33.01 — Danh mục tài sản công nghệ thông tin |
| `MaintenanceTask` | Công việc bảo trì, vá lỗi, cập nhật theo kế hoạch hoặc đột xuất | F33.02 — Kế hoạch và hồ sơ bảo trì hệ thống |
| `SystemAccount` | Tài khoản tồn tại trên một hệ thống cụ thể | F33.03 — Danh mục tài khoản hệ thống |
| `ITIncident` | Sự cố kỹ thuật và yêu cầu hỗ trợ CNTT | F33.04 — Phiếu sự cố và yêu cầu hỗ trợ CNTT |

### 2.1. `ITAsset` — Tài sản công nghệ thông tin

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `code` | string, duy nhất | tự sinh | vd `HT-2026-001` |
| `name` | string | có | Tên định danh trong vận hành |
| `asset_class` | enum | có | Mục 4.1 |
| `model` / `serial` | string | có **khi** là thiết bị vật lý | Nhận dạng duy nhất thiết bị |
| `network_zone` | enum: Quản trị – văn phòng / Thiết bị đo và thu thập dữ liệu / Khách – Wi-Fi công cộng / Không nối mạng | có **khi** có kết nối mạng | Phân vùng mạng theo `ETV.P28` mục 5.7.3 |
| `environment` | enum: Vận hành / Kiểm thử / Phát triển | có | `ETV.P28` mục 5.9 — tách môi trường |
| `location` | text | có | Vị trí vật lý hoặc nhà cung cấp đám mây |
| `user_owner` | ref User / đơn vị | có | Người/đơn vị sử dụng chịu trách nhiệm |
| `custodian` | ref User (QTHT) | có | Người quản trị kỹ thuật — quy tắc R1 |
| `criticality` | enum: Thấp / Trung bình / Cao | có | Mục 4.2 |
| `platform_refs[]` | ref → M35 | không | Nền tảng số đang chạy trên hạ tầng này |
| `info_asset_refs[]` | ref → M27 | không | Tài sản thông tin đang nằm trên thiết bị — quy tắc R2 |
| `measuring_device_ref` | ref → M05 | có **khi** `asset_class = Máy tính điều khiển – thu thập dữ liệu` | Thiết bị đo được phục vụ — quy tắc R4 |
| `max_classification` | enum | có | Mức phân loại cao nhất được phép lưu/xử lý trên thiết bị (thang của M27) |
| `disk_encryption` | bool | có | Bắt buộc `true` khi `max_classification ∈ {Hạn chế, Mật}` — quy tắc R3 |
| `screen_lock` / `antimalware` | bool | có **khi** là thiết bị đầu cuối | `ETV.P28` mục 5.7.2 |
| `patch_level` / `last_patched_at` | string / date | có **khi** có hệ điều hành hoặc phần mềm | Quy tắc R8 |
| `is_personal_device` | bool | có | Thiết bị cá nhân dùng cho công việc — quy tắc R3 |
| `license_type` / `license_expiry` | enum / date | có **khi** `asset_class = Phần mềm – bản quyền` | Cảnh báo trước hạn |
| `warranty_until` / `maintenance_contract_ref` | date / ref → M07 | không | Hợp đồng bảo trì, bảo hành |
| `eol_date` | date | không | Mốc hết vòng đời/nhà sản xuất ngừng hỗ trợ — quy tắc R11 |
| `maintenance_cycle` | enum: Tháng / Quý / 6 tháng / Năm / Theo khuyến cáo hãng | có | Quy tắc R8 |
| `last_maintained_at` | date | tự ghi | Mốc tính hạn bảo trì |
| `recovery_time_objective` | string | có **khi** `criticality = Cao` | Thời gian khôi phục mục tiêu — đầu vào M31 |
| `risk_refs[]` | ref → M28 / M01 | có **khi** EOL còn vận hành hoặc `criticality = Cao` | Quy tắc R11 |
| `review_cycle` / `last_reviewed_at` | enum / date | có / tự ghi | Mặc định 1 năm — quy tắc R12 |
| `status` | enum | tự quản lý | Mục 6 |
| `created_by` / `reviewed_by` / `approved_by` | ref User | theo trạng thái | Quy tắc R13 |

### 2.2. `MaintenanceTask` — Bảo trì, vá lỗi, cập nhật

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `code` | string, duy nhất | tự sinh | |
| `asset_refs[]` | ref `ITAsset` | có, ≥ 1 | |
| `task_type` | enum: Bảo trì định kỳ / Vá lỗi bảo mật / Cập nhật phiên bản / Sửa chữa sự cố / Sao lưu – kiểm tra khôi phục (phối hợp M27) / Thay thế linh kiện | có | |
| `severity` | enum: Nghiêm trọng / Cao / Trung bình / Thấp | có **khi** `task_type = Vá lỗi bảo mật` | Quyết định thời hạn phải hoàn thành — quy tắc R8 |
| `planned_at` / `due_at` | date | có | |
| `change_ref` | ref → M30 | có **khi** thay đổi cấu hình ngoài bảo trì định kỳ | Quy tắc R5 |
| `impact_assessment_ref` | ref → M28 | có **khi** `change_ref` tồn tại | Đánh giá ảnh hưởng ATTT trước triển khai (`ETV.P28` mục 5.9) |
| `measurement_impact_ref` | ref → M10 | có **khi** tài sản là máy tính điều khiển thiết bị đo | Quy tắc R4 |
| `performed_by` / `performed_at` | ref User (QTHT) / datetime | có, khi thực hiện | |
| `result` | enum: Thành công / Thất bại / Hoãn | có, khi thực hiện | Thất bại/Hoãn bắt buộc lý do |
| `evidence_ref` | link | có, khi thực hiện | Nhật ký, ảnh, phiếu nghiệm thu |
| `downtime_minutes` | int | không | Thời gian ngừng dịch vụ |
| `status` | enum: Kế hoạch / Đang thực hiện / Hoàn thành / Quá hạn / Hủy | tự quản lý | Quá hạn tính khi đọc |

### 2.3. `SystemAccount` — Tài khoản trên hệ thống

M33 giữ **danh mục tài khoản thực tế đang tồn tại**; thẩm quyền phê duyệt quyền thuộc **M28**.

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `code` | string, duy nhất | tự sinh | |
| `asset_ref` / `platform_ref` | ref `ITAsset` / → M35 | có (một trong hai) | Tài khoản tồn tại trên hệ thống/nền tảng nào |
| `login_name` | string | có | Không lưu mật khẩu, khóa, token dưới bất kỳ dạng nào — quy tắc R7 |
| `account_type` | enum: Cá nhân định danh / Đặc quyền – quản trị / Dịch vụ – hệ thống / Dùng chung (ngoại lệ) | có | `ETV.P28` mục 5.7.1 |
| `holder` | ref User / bên thứ ba | có **khi** `account_type ≠ Dịch vụ – hệ thống` | |
| `access_request_ref` | ref → M28 | có | Phiếu cấp/thay đổi quyền đã phê duyệt — **quy tắc R6** |
| `mfa_enabled` | bool | có | Bắt buộc `true` với tài khoản đặc quyền, truy cập từ xa, thư điện tử công vụ, hệ thống chứa Hạn chế/Mật (`ETV.P28` mục 5.7.1) |
| `valid_until` | date | có **khi** quyền tạm thời | Hết hạn ⇒ chặn tiếp tục sử dụng, phải thu hồi |
| `shared_approval_ref` | ref → M28/LĐV | có **khi** `account_type = Dùng chung (ngoại lệ)` | Ngoại lệ phải được phê duyệt và có rủi ro tương ứng |
| `last_review_ref` | ref → M28 `AccessReview` | không | Kỳ rà soát gần nhất đã đối chiếu tài khoản này |
| `status` | enum: Đang hoạt động / Tạm khóa / Đã thu hồi | tự quản lý | Thu hồi bắt buộc `revoked_at` + phiếu M28 |

### 2.4. `ITIncident` — Sự cố kỹ thuật và yêu cầu hỗ trợ

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `code` | string, duy nhất | tự sinh | |
| `kind` | enum: Sự cố / Yêu cầu hỗ trợ | có | |
| `asset_refs[]` | ref `ITAsset` | có, ≥ 1 | |
| `reported_by` / `reported_at` | ref User / datetime | có | |
| `description` | text | có | |
| `impact` | enum: Ngừng dịch vụ toàn Viện / Ngừng một phòng – một hệ thống / Ảnh hưởng một người dùng / Không ảnh hưởng vận hành | có | Quyết định mức ưu tiên |
| `security_flag` | bool | có | Có dấu hiệu mất bảo mật/toàn vẹn/lộ dữ liệu — **quy tắc R9** |
| `security_incident_ref` | ref → M28 | có **khi** `security_flag = true` | Chuyển sang M28, M33 không tự kết luận |
| `platform_incident_ref` | ref → M35 | có **khi** ảnh hưởng nền tảng số | Sự cố nền tảng thuộc M35 |
| `measurement_impact_ref` | ref → M10 | có **khi** ảnh hưởng dữ liệu/hiệu lực kết quả đo | M33 không kết luận hiệu lực kết quả |
| `assigned_to` | ref User (QTHT) | có | |
| `resolution` | text | có, khi đóng | Cách xử lý |
| `maintenance_ref` | ref `MaintenanceTask` | không | Công việc sửa chữa phát sinh |
| `capa_ref` | ref → M13 | có **khi** lặp ≥ 3 lần/90 ngày trên cùng tài sản | Quy tắc R9 |
| `status` | enum: Mới / Đang xử lý / Chờ bên thứ ba / Đã xử lý / Đã đóng / Hủy | tự quản lý | Hủy bắt buộc lý do |

### 2.5. `AuditLog`

Append-only, ghi mọi thao tác tạo/sửa/đổi trạng thái trên 4 thực thể: ai, khi nào, trường nào, giá
trị trước → sau, lý do (khi bắt buộc). Nhật ký của module **không** thay thế nhật ký hệ thống do
QTHT quản lý (`ETV.P28` mục 5.7.5) — hai loại tồn tại song song, module chỉ trỏ tới bằng
`evidence_ref` / `system_log_ref`.

## 3. Vai trò

| Vai trò | Trách nhiệm chính |
|---|---|
| **QTHT** (quản trị hệ thống thông tin, thuộc Văn phòng — QM §5) | Kiểm kê và vận hành hạ tầng; thực hiện bảo trì, vá lỗi; **thực thi** cấp/thu hồi tài khoản theo phiếu M28; xử lý sự cố kỹ thuật |
| **Văn phòng** | Đơn vị chủ trì quản trị hệ thống thông tin và nền tảng số; tổng hợp danh mục, kế hoạch bảo trì, ngân sách |
| **PT.ATTT** | Soát xét cấu hình an toàn, phân vùng mạng, mức phân loại tối đa của thiết bị; đánh giá ảnh hưởng ATTT trước thay đổi |
| **TP** (đơn vị sử dụng) | Xác nhận nhu cầu, tiếp nhận và bảo quản thiết bị được giao; báo sự cố; xác nhận nghiệm thu bảo trì |
| **LĐV** | Phê duyệt danh mục hạ tầng, kế hoạch bảo trì năm, ngừng vận hành – thanh lý, ngoại lệ (thiết bị cá nhân xử lý Hạn chế/Mật, tài khoản dùng chung) |
| **Nhân viên** | Sử dụng thiết bị đúng quy định; báo sự cố; hoàn trả thiết bị khi chấm dứt công việc |

Nguyên tắc tách vai trò: **người đề nghị ≠ người phê duyệt ≠ người thực hiện** đối với quyền truy
cập (`ETV.P28` quy tắc R18) — M33 chỉ giữ vai trò **người thực hiện**.

## 4. Danh mục chuẩn

### 4.1. Lớp tài sản CNTT (`asset_class`) `[SUY DẪN]`

Máy chủ (vật lý/ảo) · Thiết bị mạng (switch, router, firewall, access point) · Máy trạm – máy tính
xách tay · Thiết bị di động · **Máy tính điều khiển – thu thập dữ liệu của thiết bị đo** · Thiết bị
lưu trữ (NAS, ổ cứng ngoài, băng từ) · Thiết bị ngoại vi (máy in, máy quét, UPS) · Phần mềm – bản
quyền · Dịch vụ CNTT thuê ngoài (đám mây, hosting, email) · Thiết bị ký số (USB token).

### 4.2. Mức trọng yếu (`criticality`) và hệ quả `[SUY DẪN]`

| Mức | Ý nghĩa | Hệ quả bắt buộc |
|---|---|---|
| Thấp | Hỏng không ảnh hưởng đáng kể | Bảo trì theo kế hoạch chung |
| Trung bình | Hỏng ảnh hưởng một phòng/một hệ thống | Có kế hoạch bảo trì riêng; theo dõi hạn bảo hành |
| **Cao** | Hỏng làm ngừng dịch vụ toàn Viện, ngừng nền tảng ManLab, hoặc mất dữ liệu/hiệu lực kết quả đo | Bắt buộc `recovery_time_objective`, phương án dự phòng (← M31), rủi ro ở M01/M28, ưu tiên vá lỗi cao nhất |

### 4.3. Thời hạn hoàn thành vá lỗi bảo mật theo mức nghiêm trọng `[SUY DẪN]`

`ETV.P28` mục 5.7.3 yêu cầu "vá lỗi theo mức nghiêm trọng của lỗ hổng" nhưng **không nêu con số** —
đề xuất mốc dưới đây để chốt khi ban hành `ETV.P33` (câu hỏi 4, mục 10):

| Mức nghiêm trọng | Thời hạn đề xuất kể từ khi có bản vá |
|---|---|
| Nghiêm trọng | 07 ngày (hoặc áp dụng biện pháp giảm thiểu tạm thời trong 48 giờ) |
| Cao | 30 ngày |
| Trung bình | 90 ngày |
| Thấp | Theo chu kỳ bảo trì kế tiếp |

### 4.4. Phân vùng mạng (`network_zone`) — `ETV.P28` mục 5.7.3 (đã ban hành)

Vùng quản trị – văn phòng · **vùng thiết bị đo và hệ thống thu thập dữ liệu** · vùng khách – Wi-Fi
công cộng. M33 áp dụng nguyên, không định nghĩa lại.

## 5. Quy tắc nghiệp vụ

**R1. Không có hạ tầng vô chủ** — mỗi `ITAsset` phải có `custodian` (QTHT) **và** `user_owner`
(người/đơn vị sử dụng). Thiếu một trong hai ⇒ chặn phê duyệt. `[SUY DẪN]`

**R2. Kiểm kê một lần, không hai nơi** — M33 kiểm kê **thiết bị, hệ thống, phần mềm**; M27 kiểm kê
**dữ liệu** và trỏ xuống bằng `system_ref`. Báo cáo kiểm kê tài sản theo ISO/IEC 27001 A.5.9 là
**hợp của M33 + M27**, xuất từ một màn hình chung. Lưu ý: `ETV.P28` mục 5.7.2 viết thiết bị đầu
cuối "được đăng ký trong danh mục tài sản (ETV.MP27)" trong khi `ETV.P35` mục 1.4 giao thiết bị đầu
cuối cho **ETV.MP33** — cần chốt cách hiểu thống nhất (câu hỏi 2, mục 10). `[SUY DẪN]`

**R3. Cấu hình an toàn bắt buộc cho thiết bị đầu cuối** (`ETV.P28` mục 5.7.2 — **đã ban hành, chặn
cứng**): khóa màn hình tự động · mật khẩu/mã PIN · phần mềm phòng chống mã độc đang hoạt động · cập
nhật bản vá · **mã hóa ổ đĩa khi `max_classification ∈ {Hạn chế, Mật}`**. Thiếu bất kỳ điều kiện nào
⇒ chặn phê duyệt đưa vào vận hành. `is_personal_device = true` mà xử lý thông tin Hạn chế/Mật ⇒ bắt
buộc **phê duyệt của LĐV** và rủi ro tương ứng ghi ở M28.

**R4. Máy tính điều khiển thiết bị đo là vùng đặc biệt** (`ETV.P28` mục 5.7.3 — **đã ban hành, chặn
cứng**): mọi thay đổi cấu hình hoặc cập nhật phần mềm điều khiển phải thực hiện theo **MP30** và
phải có **đánh giá ảnh hưởng tới hiệu lực kết quả đo (MP10)** *trước khi* áp dụng. M33 chặn ghi
nhận hoàn thành `MaintenanceTask` loại này khi thiếu `change_ref` hoặc `measurement_impact_ref`.

**R5. Thay đổi hệ thống đi qua M30, kèm đánh giá ATTT** (`ETV.P28` mục 5.9 — **đã ban hành**): nâng
cấp nền tảng, tích hợp mới, đổi phân quyền diện rộng ⇒ bắt buộc `change_ref` → M30 và
`impact_assessment_ref` → M28 trước triển khai. Môi trường **Phát triển/Kiểm thử phải tách khỏi Vận
hành**; **nghiêm cấm** dùng dữ liệu thật của khách hàng để kiểm thử khi chưa ẩn danh hoặc chưa được
LĐV phê duyệt — M33 chặn gán tài sản thông tin chứa dữ liệu khách hàng (← M27) vào tài sản có
`environment ≠ Vận hành` nếu thiếu phê duyệt.

**R6. Không có tài khoản ngoài phiếu** — mọi `SystemAccount` phải có `access_request_ref` trỏ tới
phiếu **đã phê duyệt** ở M28; QTHT là **người thực hiện**, không phải người phê duyệt. Tài khoản
phát hiện trên hệ thống mà không có phiếu ⇒ đánh dấu bất thường, khóa tạm và mở sự cố ở M28.

**R7. Không lưu bí mật xác thực** — `SystemAccount` **nghiêm cấm** lưu mật khẩu, khóa API, mã PIN,
chứng thư số dưới bất kỳ dạng nào (kể cả mã hóa); chỉ ghi *nơi lưu giữ* và *người có quyền cấp
phát*. Trường tự do bị kiểm tra mẫu để chặn dán bí mật. `[SUY DẪN]` (đồng nhất với `ETV.P35` mục 1.3)

**R8. Bảo trì và vá lỗi đúng hạn** — mọi `ITAsset` có hệ điều hành/phần mềm phải nằm trong kế hoạch
bảo trì theo `maintenance_cycle`; vá lỗi bảo mật hoàn thành theo mốc mục 4.3. Quá hạn ⇒ cảnh báo
`custodian`; quá 2 chu kỳ hoặc vá lỗi **Nghiêm trọng** quá hạn ⇒ cảnh báo LĐV và mở KPH ở M13.
`[SUY DẪN]` (mốc thời hạn) · **đã ban hành** (yêu cầu vá lỗi theo mức nghiêm trọng)

**R9. Định tuyến sự cố đúng chủ sở hữu** — `security_flag = true` ⇒ bắt buộc `security_incident_ref`
sang **M28** (M33 không tự kết luận sự cố ATTT); ảnh hưởng nền tảng số ⇒ `platform_incident_ref`
sang **M35**; ảnh hưởng dữ liệu hoặc hiệu lực kết quả đo ⇒ `measurement_impact_ref` sang **M10**;
lặp ≥ 3 lần/90 ngày trên cùng tài sản ⇒ bắt buộc `capa_ref` sang **M13**. `[SUY DẪN]`

**R10. Xóa dữ liệu an toàn trước khi rời tay Viện** (`ETV.P28` mục 5.7.2 — **đã ban hành, chặn
cứng**): thanh lý, chuyển giao hoặc gửi sửa chữa bên ngoài chỉ được thực hiện khi có **bằng chứng
xóa dữ liệu an toàn** — biên bản hủy ở **M27** (`DisposalRecord`) hoặc bằng chứng tương đương. M33
chặn chuyển trạng thái sang **Đã thanh lý** khi thiếu bằng chứng này.

**R11. Hạ tầng hết vòng đời phải có rủi ro** — `eol_date` đã qua mà tài sản còn ở trạng thái Đang
vận hành ⇒ bắt buộc ≥ 1 `risk_refs` sang M28/M01 và kế hoạch thay thế; cảnh báo LĐV hằng quý cho tới
khi xử lý xong. `[SUY DẪN]`

**R12. Rà soát định kỳ** — mặc định **1 năm/lần**; cờ **Đến hạn rà soát**, **Đến hạn bảo trì**,
**Quá hạn vá lỗi**, **Sắp hết hạn bản quyền/bảo hành** đều **tính khi đọc**, không lưu cột riêng.
`[SUY DẪN]`

**R13. Tách vai trò, ghi vết, lưu hồ sơ** — `created_by ≠ approved_by`; `reviewed_by` (PT.ATTT hoặc
TP khác) ≠ người lập; mọi thao tác ghi `AuditLog` append-only; hồ sơ danh mục, bảo trì, tài khoản,
sự cố lưu theo **ETV.P15**.

**R14. AI hỗ trợ có kiểm soát (← M29)** — AI được phép *phát hiện* tài sản chưa kiểm kê, *nhắc* hạn
bảo trì/vá lỗi/bản quyền, *gợi ý* phân loại sự cố. AI **không** tự phê duyệt danh mục, **không** tự
thực hiện thay đổi cấu hình, **không** kết luận sự cố ATTT (ISO/IEC 42001; `ETV.P29`).

## 6. Trạng thái `ITAsset`

| STT | Trạng thái | Ý nghĩa | Người thao tác | Điều kiện chuyển | Bắt buộc lý do |
|---|---|---|---|---|---|
| 1 | Nháp | Đang khai báo | QTHT | Đủ trường bắt buộc theo `asset_class` → Chờ soát xét | Không |
| 2 | Chờ soát xét | Chờ PT.ATTT kiểm tra cấu hình an toàn, phân vùng mạng, mức phân loại tối đa | PT.ATTT (≠ người lập) | Đạt → Chờ phê duyệt; Không đạt → Không soát xét | — |
| 3 | Không soát xét | Bị trả lại | QTHT | Sửa → Chờ soát xét | **Có** |
| 4 | Chờ phê duyệt | Chờ LĐV | LĐV | Đạt → Đang vận hành (**chặn** khi vi phạm R1, R3, R5); Không đạt → Không phê duyệt | — |
| 5 | Không phê duyệt | Bị trả lại | QTHT | Sửa → Chờ soát xét | **Có** |
| 6 | Đang vận hành | Đang phục vụ công việc | QTHT | Bảo trì lớn/sự cố → Tạm ngừng; chấm dứt sử dụng → Ngừng vận hành | **Có** khi Ngừng |
| 7 | Tạm ngừng | Đang bảo trì/sửa chữa, chưa chấm dứt | QTHT | Xong → Đang vận hành; không khắc phục được → Ngừng vận hành | **Có** |
| 8 | Ngừng vận hành | Không còn dùng, **chưa thanh lý**, dữ liệu chưa xử lý xong | QTHT, LĐV | Có bằng chứng xóa dữ liệu an toàn (← M27) + LĐV duyệt → Đã thanh lý | — |
| 9 | Đã thanh lý | Đã thanh lý/chuyển giao — **bản ghi kiểm kê vẫn giữ** | — | (kết thúc) | — |
| 10 | Hủy bản ghi | Khai báo sai/trùng, bỏ trước khi phê duyệt | LĐV | (kết thúc) | **Có** |

Bốn cờ tính khi đọc, không phải trạng thái: **Đến hạn rà soát** · **Đến hạn bảo trì** · **Quá hạn vá
lỗi bảo mật** · **Sắp hết hạn bản quyền/bảo hành/EOL**.

Trạng thái thực thể phụ: `MaintenanceTask` (Kế hoạch → Đang thực hiện → Hoàn thành / Quá hạn / Hủy) ·
`SystemAccount` (Đang hoạt động → Tạm khóa → Đã thu hồi) · `ITIncident` (Mới → Đang xử lý → Chờ bên
thứ ba → Đã xử lý → Đã đóng / Hủy).

## 7. Đầu ra

| Đầu ra | Định dạng | Ghi chú |
|---|---|---|
| F33.01 — Danh mục tài sản công nghệ thông tin | PDF/Excel | Theo lớp tài sản, vùng mạng, môi trường, mức trọng yếu, chủ quản trị |
| F33.02 — Kế hoạch và hồ sơ bảo trì hệ thống | PDF/Excel | Kế hoạch năm và kết quả thực hiện, kèm bằng chứng |
| F33.03 — Danh mục tài khoản hệ thống | PDF/Excel | Tài khoản theo hệ thống, loại, MFA, phiếu M28 tương ứng |
| F33.04 — Phiếu sự cố và yêu cầu hỗ trợ CNTT | PDF | Sự cố, mức ảnh hưởng, xử lý, định tuyến sang M28/M35/M10 |
| **Báo cáo kiểm kê tài sản hợp nhất (M33 + M27)** | PDF/Excel | Phục vụ ISO/IEC 27001 A.5.9 và đoàn đánh giá — quy tắc R2 |
| Bảng đến hạn: rà soát · bảo trì · vá lỗi · bản quyền/EOL | Màn hình | Tính khi đọc |
| Bảng đối chiếu tài khoản thực tế ↔ phiếu M28 | Màn hình/PDF | Tài khoản không có phiếu, phiếu không có tài khoản, tài khoản quá `valid_until` |
| Trích xuất hạ tầng trọng yếu và RTO cho M31 | Dữ liệu/PDF | Đầu vào kế hoạch liên tục hoạt động |
| Trích xuất tình hình hạ tầng cho M17 | Dữ liệu/PDF | Sự cố lớn, mức sẵn sàng, hạ tầng EOL, ngân sách thay thế |

**Bốn biểu mẫu F33.01–F33.04 hiện chưa tồn tại** — phải soạn và ban hành theo MP14 trước khi bản
xuất được dùng làm hồ sơ chính thức. Việc phê duyệt quyền truy cập vẫn dùng **F28.04** của
`ETV.P28`, không lập biểu mẫu trùng.

## 8. Liên kết

Quy trình: **MP33** (`ETV.P33` chưa ban hành) · Năng lực: **CAP-28_ATTT** (dùng chung với MP27,
MP28, MP31, MP34, MP37) · Căn cứ đã ban hành: `ETV.QM_QuanlyChatluong.md` §10.2 và §7.11,
`ETV.P28_QuanLyAnToanThongTin.md` mục 5.7.1–5.7.5 và 5.9, `ETV.P35_QuanLyNenTangSo.md` mục 1.4,
`ETV.P02_BaoMat.md` §6.8, `ETV.P15` · Tiêu chuẩn: ISO/IEC 27001 A.5.9, A.7.9–A.7.10, A.8.1,
A.8.7–A.8.9, A.8.19–A.8.22, A.8.32; ISO 9001 §7.1.3; ISO/IEC 17025 §6.4, §7.11 · Lưu hồ sơ:
**ETV.P15** · Nhóm menu: `CONG_NGHE` (manifest MP33).

**Đầu vào từ**: M28 (phiếu quyền truy cập đã phê duyệt, kết quả rà soát quyền, đánh giá ảnh hưởng
ATTT) · M30 (quyết định thay đổi) · M27 (tài sản thông tin nằm trên thiết bị, biên bản xóa dữ liệu)
· M06/M07 (mua sắm, hợp đồng bảo trì) · M03 (biến động nhân sự) · M05 (thiết bị đo được phục vụ).

**Đầu ra sang**: M35 (hạ tầng bên dưới nền tảng, `infra_ref`) · M27 (`system_ref` — nơi dữ liệu nằm)
· M28 (tài sản kỹ thuật cho đánh giá rủi ro, sự cố có dấu hiệu ATTT, đối chiếu tài khoản) · M31
(hạ tầng trọng yếu và RTO) · M10 (khi thay đổi ảnh hưởng hệ thống thu thập dữ liệu) · M13 (KPH khi
sự cố lặp hoặc bảo trì quá hạn) · M01 (rủi ro hạ tầng EOL) · M17 (tình hình hạ tầng trong xem xét
lãnh đạo).

**Không thuộc M33**: đăng ký và đánh giá nền tảng số (M35) · phân loại và vòng đời dữ liệu, sao lưu
(M27) · đánh giá rủi ro ATTT, SoA, **phê duyệt quyền truy cập** (M28) · phê duyệt thay đổi (M30) ·
kết luận hiệu lực kết quả đo (M10) · hiệu chuẩn và vòng đời thiết bị đo (M05) · mua sắm (M06).

## 9. Trạng thái triển khai

**Chưa xây** — `08_Source/` trống, chưa có trong `09_ENGINEERING/aios-platform`
(`PlatformModule.status = COMING_SOON`). Đặc tả kỹ thuật chi tiết (màn hình, API, tiêu chí chấp
nhận, NFR) và kế hoạch tăng trưởng theo increment:
`01_Requirement/_work/20260824-dac-ta-m33/{outcome.md, spec.md, plan.md}`.

## 10. Câu hỏi cần LĐV/QLCL chốt trước khi BUILD

1. **Ban hành `ETV.P33`**: đặc tả này có được dùng làm dự thảo đầu vào để soạn thủ tục chính thức
   theo MP14 không? (Như đã làm với `ETV.P25`, `ETV.P26`, `ETV.P28`, `ETV.P35`.)
2. **Ranh giới kiểm kê M33 ↔ M27 đối với thiết bị đầu cuối**: `ETV.P28` mục 5.7.2 nói thiết bị đăng
   ký trong danh mục tài sản của **ETV.MP27**, còn `ETV.P35` mục 1.4 giao thiết bị đầu cuối cho
   **ETV.MP33**. Chốt cách hiểu: M33 kiểm kê **thiết bị**, M27 kiểm kê **dữ liệu trên thiết bị**, và
   báo cáo A.5.9 là hợp của hai (đề xuất của quy tắc R2) — hay gộp toàn bộ về một module?
3. **Tài khoản người dùng**: M33 giữ danh mục tài khoản kỹ thuật và **thực thi** theo phiếu M28
   (đề xuất hiện tại), hay toàn bộ dữ liệu tài khoản nằm ở M28 và M33 chỉ đọc?
4. **Thời hạn vá lỗi bảo mật** (mục 4.3): chốt 07/30/90 ngày theo mức nghiêm trọng, hay mốc khác?
5. **Thiết bị cá nhân (BYOD)**: có cho phép dùng thiết bị cá nhân xử lý thông tin **Nội bộ** không,
   hay chỉ mức **Công khai**? (Mức Hạn chế/Mật đã có quy định phải LĐV duyệt tại `ETV.P28` 5.7.2.)
6. **Ngưỡng sự cố lặp** để mở KPH: 3 lần/90 ngày (đề xuất, đồng bộ với M35) có phù hợp không?
7. **Phạm vi dịch vụ thuê ngoài**: dịch vụ đám mây/email do bên thứ ba vận hành có kiểm kê trong
   M33 như một `ITAsset` (đề xuất) hay chỉ theo dõi ở M06/M35?
8. **Kiểm kê kỳ đầu**: bắt đầu từ hạ tầng trọng yếu (máy chủ, mạng, máy tính điều khiển thiết bị đo)
   hay kiểm kê toàn bộ kể cả máy trạm và thiết bị ngoại vi ngay từ đầu?
