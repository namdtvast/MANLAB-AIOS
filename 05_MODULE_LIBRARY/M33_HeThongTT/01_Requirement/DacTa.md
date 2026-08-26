# M33_HeThongTT — Đặc tả yêu cầu

> **Nguồn**: Thủ tục **`ETV.P33` — Quản lý hệ thống thông tin** đã có **dự thảo lần ban hành 01,
> trạng thái `Chờ soát xét`** (`03_MANAGEMENT_SYSTEM/02_P/ETV.P33_QuanLyHeThongThongTin.md`), kèm
> **bốn biểu mẫu `ETV.P.F 33.01–33.04`** trong `06_SHARED_RESOURCES/01_Forms/` (cùng trạng thái).
> Dự thảo lấy chính đặc tả này làm đầu vào và **đã chốt toàn bộ 8 điểm mà đặc tả để ngỏ** — đối
> chiếu ở mục 10. Căn cứ khác: Sổ tay chất lượng **§10.2** và **§7.11**; Thủ tục **`ETV.P28` — Quản
> lý an toàn thông tin** (ban hành 24/08/2026, đánh số theo lần ban hành 02) mục **6.7.1–6.7.5**, **6.7.10** và **6.9**; Thủ tục
> **`ETV.P35` — Quản lý nền tảng số** (ban hành 24/08/2026) **mục 2.3** — giao cho ETV.P33 "hạ tầng
> công nghệ thông tin, máy chủ, mạng, thiết bị đầu cuối, tài khoản người dùng"; ETV.P02 §6.8;
> `ETV.P15`.
>
> **Thứ tự nguồn sự thật khi có mâu thuẫn**: `ETV.P28`/`ETV.P35` (**đã ban hành**) → `ETV.P33`
> (**dự thảo, chờ soát xét**) → đặc tả này. Quy tắc nào dẫn từ thủ tục thì M33 **áp dụng nguyên**,
> không diễn giải lại; nhãn `[P33 §x.y]` chỉ rõ điều khoản nguồn. Phần chưa có thủ tục nào phủ được
> **suy dẫn** từ ISO/IEC 27001 A.5.9, A.7.9–A.7.10, A.8.1, A.8.7–A.8.9, A.8.19–A.8.22, A.8.32;
> ISO 9001 §7.1.3; ISO/IEC 17025 §6.4 và §7.11 — đánh dấu `[SUY DẪN]`.
>
> ⚠ **Giới hạn còn lại**: `ETV.P33` **chưa được phê duyệt**, các **giá trị định lượng** trong đó
> (thời hạn vá lỗi, SLA sự cố, lộ trình kiểm kê, chu kỳ đối chiếu) là **đề xuất chờ Viện xác nhận
> cho khớp nguồn lực thực tế**. BUILD chỉ nên bắt đầu sau khi thủ tục chuyển trạng thái **Đã phê
> duyệt** theo MP14 — xem mục 10.

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
| **M28_ATTT** (`ETV.P28` đã ban hành) | **Thực thi** kiểm soát kỹ thuật ETV.P28 §6.7 và thực hiện cấp/thu hồi quyền theo phiếu đã phê duyệt của M28; chuyển sự cố có dấu hiệu mất ATTT sang M28 | Không đánh giá rủi ro ATTT, **không phê duyệt quyền truy cập**, không kết luận sự cố ATTT, không quản lý SoA |
| **M30_ThayDoi** | Chuyển mọi thay đổi cấu hình ngoài bảo trì định kỳ sang M30 kèm đánh giá ảnh hưởng ATTT (ETV.P28 mục 6.9) | Không thẩm định, không phê duyệt thay đổi |
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

| Đối tượng | Mô tả | Biểu mẫu (dự thảo, chờ soát xét) |
|---|---|---|
| `ITAsset` | Cấu phần hạ tầng CNTT trong danh mục kiểm kê | `ETV.P.F 33.01` — Danh mục tài sản công nghệ thông tin |
| `MaintenanceTask` | Công việc bảo trì, vá lỗi, cập nhật theo kế hoạch hoặc đột xuất | `ETV.P.F 33.02` — Kế hoạch và hồ sơ bảo trì hệ thống |
| `SystemAccount` | Tài khoản tồn tại trên một hệ thống cụ thể | `ETV.P.F 33.03` — Danh mục tài khoản hệ thống |
| `ITIncident` | Sự cố kỹ thuật và yêu cầu hỗ trợ CNTT | `ETV.P.F 33.04` — Phiếu sự cố và yêu cầu hỗ trợ CNTT |

Ngoài bốn thực thể trên, ETV.P33 §6.3.1 buộc **kế hoạch bảo trì năm phải được LĐV phê duyệt trước
khi bắt đầu năm kế hoạch** — vì vậy đặc tả bổ sung thực thể `MaintenancePlan` (mục 2.6); và ETV.P33 §6.4.2
bước 4 buộc **đối chiếu tài khoản 06 tháng/lần** thành một kỳ có hồ sơ — thực thể
`AccountReconciliation` (mục 2.7). Hai thực thể này dùng chung biểu mẫu F33.02 và F33.03, không lập
biểu mẫu mới.

### 2.1. `ITAsset` — Tài sản công nghệ thông tin

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `code` | string, duy nhất | tự sinh | vd `HT-2026-001` |
| `name` | string | có | Tên định danh trong vận hành |
| `asset_class` | enum | có | Mục 4.1 |
| `model` / `serial` | string | có **khi** là thiết bị vật lý | Nhận dạng duy nhất thiết bị |
| `network_zone` | enum: Quản trị – văn phòng / Thiết bị đo và thu thập dữ liệu / Khách – Wi-Fi công cộng / Không nối mạng | có **khi** có kết nối mạng | Phân vùng mạng theo ETV.P28 mục 6.7.3 |
| `environment` | enum: Vận hành / Kiểm thử / Phát triển | có | ETV.P28 mục 6.9 — tách môi trường |
| `location` | text | có | Vị trí vật lý hoặc nhà cung cấp đám mây |
| `user_owner` | ref User / đơn vị | có | Người/đơn vị sử dụng chịu trách nhiệm |
| `custodian` | ref User (QTHT) | có | Người quản trị kỹ thuật — quy tắc R1 |
| `criticality` | enum: Thấp / Trung bình / Cao | có | Mục 4.2 |
| `platform_refs[]` | ref → M35 | không | Nền tảng số đang chạy trên hạ tầng này |
| `info_asset_refs[]` | ref → M27 | không | Tài sản thông tin đang nằm trên thiết bị — quy tắc R2 |
| `measuring_device_ref` | ref → M05 | có **khi** `asset_class = Máy tính điều khiển – thu thập dữ liệu` | Thiết bị đo được phục vụ — quy tắc R4 |
| `max_classification` | enum | có | Mức phân loại cao nhất được phép lưu/xử lý trên thiết bị (thang của M27) |
| `disk_encryption` | bool | có | Bắt buộc `true` khi `max_classification ∈ {Hạn chế, Mật}` — quy tắc R3 |
| `screen_lock` / `antimalware` | bool | có **khi** là thiết bị đầu cuối | ETV.P28 mục 6.7.2 |
| `default_password_changed` / `unused_services_closed` | bool | có **khi** là thiết bị đầu cuối hoặc máy chủ | Hai điều kiện cấu hình an toàn cơ sở bổ sung tại ETV.P33 §6.2.3 — quy tắc R3 |
| `os_version` | string | có **khi** có hệ điều hành | Hệ điều hành và phiên bản (ETV.P33 §6.1.1) |
| `patch_level` / `last_patched_at` | string / date | có **khi** có hệ điều hành hoặc phần mềm | Quy tắc R8 |
| `commissioned_at` | date | có **khi** `status ≥ Đang vận hành` | Ngày đưa vào vận hành (ETV.P33 §6.1.1) |
| `handover_record_ref` | link | có **khi** đã bàn giao cho đơn vị sử dụng | Biên bản bàn giao thiết bị (ETV.P33 §6.1.4 bước 5) |
| `is_personal_device` | bool | có | Thiết bị cá nhân dùng cho công việc — quy tắc R3 |
| `license_type` / `license_expiry` | enum / date | có **khi** `asset_class = Phần mềm – bản quyền` | Cảnh báo trước hạn |
| `warranty_until` / `maintenance_contract_ref` | date / ref → M07 | không | Hợp đồng bảo trì, bảo hành |
| `eol_date` | date | không | Mốc hết vòng đời/nhà sản xuất ngừng hỗ trợ — quy tắc R11 |
| `maintenance_cycle` | enum: Tháng / Quý / 6 tháng / Năm / Theo khuyến cáo hãng | có | Quy tắc R8 |
| `last_maintained_at` | date | tự ghi | Mốc tính hạn bảo trì |
| `recovery_time_objective` | string | có **khi** `criticality = Cao` | Thời gian khôi phục mục tiêu — đầu vào M31 |
| `failover_plan` | text / ref → M31 | có **khi** `criticality = Cao` | Phương án dự phòng — điều kiện chặn cứng thứ 5, `ETV.P33` Phụ lục I.1 |
| `risk_refs[]` | ref → M28 / M01 | có **khi** EOL còn vận hành hoặc `criticality = Cao` | Quy tắc R11 |
| `review_cycle` / `last_reviewed_at` | enum / date | có / tự ghi | Mặc định 1 năm; `criticality = Cao` ⇒ **≤ 1 năm** (ETV.P33 §6.1.3) — quy tắc R12 |
| `discovery_source` | enum: Kiểm kê kỳ đầu / Mua sắm mới / **Phát hiện chưa kiểm kê** | có | ETV.P33 §6.7 — quy tắc R17 |
| `inventory_due_at` | date | tự tính | Chỉ khi `discovery_source = Phát hiện chưa kiểm kê`: hạn đưa vào vận hành = ngày lập + **30 ngày** (ETV.P33 §6.7) |
| `network_isolated` | bool | tự quản lý | Đã ngắt khỏi mạng của Viện do không đạt cấu hình an toàn cơ sở (ETV.P33 §6.7 bước 3) |
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
| `impact_assessment_ref` | ref → M28 | có **khi** `change_ref` tồn tại | Đánh giá ảnh hưởng ATTT trước triển khai (ETV.P28 mục 6.9) |
| `measurement_impact_ref` | ref → M10 | có **khi** tài sản là máy tính điều khiển thiết bị đo | Quy tắc R4 |
| `method_impact_ref` | ref → M08 | có **khi** thay đổi chạm tới phương pháp đo | ETV.P33 §6.3.4 — đánh giá theo `ETV.P10` **và `ETV.P08` nếu chạm phương pháp** |
| `plan_ref` | ref `MaintenancePlan` | có **khi** `task_type = Bảo trì định kỳ` | Thuộc kế hoạch bảo trì năm đã được LĐV phê duyệt (mục 2.6) |
| `emergency_order_ref` | link | có **khi** thay đổi khẩn cấp chưa kịp có phiếu M30 | Lệnh của LĐV; **vẫn bắt buộc** bổ sung `change_ref` hồi tố — quy tắc R5 |
| `user_notified_at` | datetime | có **khi** công việc gây gián đoạn | Thông báo trước cho đơn vị sử dụng (ETV.P33 §6.3.2 bước 3) |
| `performed_by` / `performed_at` | ref User (QTHT) / datetime | có, khi thực hiện | |
| `result` | enum: Thành công / Thất bại / Hoãn | có, khi thực hiện | Thất bại/Hoãn bắt buộc lý do |
| `evidence_ref` | link | có, khi thực hiện | Nhật ký công việc, ảnh chụp, kết quả kiểm tra, phiên bản sau cập nhật |
| `accepted_by` / `accepted_at` | ref User (TP hoặc QTHT khác) / datetime | **có, trước khi Hoàn thành** | Nghiệm thu bởi **người khác người thực hiện** — ETV.P33 §6.3.2 bước 5, quy tắc R15 |
| `post_check_result` | text | có **khi** tài sản là máy tính điều khiển thiết bị đo | Xác nhận hệ thống thu thập dữ liệu hoạt động đúng sau khi áp dụng (ETV.P33 §6.3.4) |
| `downtime_minutes` | int | không | Thời gian ngừng dịch vụ |
| `status` | enum: Kế hoạch / Đang thực hiện / **Chờ nghiệm thu** / Hoàn thành / Quá hạn / Hủy | tự quản lý | Chuỗi theo `ETV.P33` Phụ lục II.2; Quá hạn tính khi đọc |

### 2.3. `SystemAccount` — Tài khoản trên hệ thống

M33 giữ **danh mục tài khoản thực tế đang tồn tại**; thẩm quyền phê duyệt quyền thuộc **M28**.

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `code` | string, duy nhất | tự sinh | |
| `asset_ref` / `platform_ref` | ref `ITAsset` / → M35 | có (một trong hai) | Tài khoản tồn tại trên hệ thống/nền tảng nào |
| `login_name` | string | có | Không lưu mật khẩu, khóa, token dưới bất kỳ dạng nào — quy tắc R7 |
| `account_type` | enum: Cá nhân định danh / Đặc quyền – quản trị / Dịch vụ – hệ thống / **Bên thứ ba** / Dùng chung (ngoại lệ) | có | ETV.P28 mục 6.7.1; ETV.P33 §6.4.1 nêu bốn loại (cá nhân · đặc quyền · dịch vụ · bên thứ ba) và ETV.P33 §6.4.3 nêu thêm **dùng chung** là ngoại lệ ⇒ enum gộp đủ 5 |
| `holder` | ref User / bên thứ ba | có **khi** `account_type ≠ Dịch vụ – hệ thống` | |
| `access_request_ref` | ref → M28 | có | Phiếu **F28.04** cấp/thay đổi quyền đã phê duyệt — **quy tắc R6** |
| `granted_at` | date | có | Ngày cấp (ETV.P33 §6.4.1) |
| `secret_location` / `secret_issuer` | text / ref User | có | **Nơi lưu** bí mật xác thực và **người có quyền cấp phát** — ghi *nơi lưu*, tuyệt đối không ghi *giá trị* (ETV.P33 §6.4.1, quy tắc R7) |
| `mfa_enabled` | bool | có | Bắt buộc `true` với tài khoản đặc quyền, truy cập từ xa, thư điện tử công vụ, hệ thống chứa Hạn chế/Mật (ETV.P28 mục 6.7.1) |
| `valid_until` | date | có **khi** quyền tạm thời | Hết hạn ⇒ chặn tiếp tục sử dụng, phải thu hồi |
| `shared_approval_ref` | ref → M28/LĐV | có **khi** `account_type = Dùng chung (ngoại lệ)` | Ngoại lệ phải được phê duyệt và có rủi ro tương ứng |
| `last_review_ref` | ref → M28 `AccessReview` | không | Kỳ rà soát gần nhất của M28 đã đối chiếu tài khoản này |
| `last_reconciliation_ref` | ref `AccountReconciliation` | không | Kỳ đối chiếu 06 tháng gần nhất của chính M33 (mục 2.7) |
| `hr_event_ref` / `revocation_due_at` | ref → M03 / date | có **khi** có biến động nhân sự | Chấm dứt hợp đồng, chuyển công tác, kết thúc việc của bên thứ ba ⇒ **thu hồi trong ngày làm việc** (ETV.P33 §6.4.2 bước 3) — quy tắc R16 |
| `status` | enum: Đang hoạt động / Tạm khóa / Đã thu hồi | tự quản lý | Thu hồi bắt buộc `revoked_at` + phiếu M28 |

### 2.4. `ITIncident` — Sự cố kỹ thuật và yêu cầu hỗ trợ

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `code` | string, duy nhất | tự sinh | |
| `kind` | enum: Sự cố / Yêu cầu hỗ trợ | có | |
| `asset_refs[]` | ref `ITAsset` | có, ≥ 1 | |
| `reported_by` / `reported_at` | ref User / datetime | có | |
| `description` | text | có | |
| `impact` | enum: Ngừng dịch vụ toàn Viện / Ngừng một phòng – một hệ thống / Ảnh hưởng một người dùng / Không ảnh hưởng vận hành | có | Đầu vào tính `priority` |
| `priority` | enum: Cao / Trung bình / Thấp | tự tính | Ba mức SLA của ETV.P33 §6.5.2 — bảng ánh xạ ở mục 4.6 |
| `response_due_at` / `responded_at` | datetime | tự tính / có | Thời hạn phản hồi theo `priority` (mục 4.6) — quy tắc R18 |
| `resolution_due_at` | datetime | tự tính | Thời hạn xử lý mục tiêu; mức Cao dùng **RTO** của tài sản |
| `escalated_to_ldv_at` | datetime | có **khi** `priority = Cao` | Báo cáo LĐV trong **01 giờ** (ETV.P33 §6.5.2) |
| `security_flag` | bool | có | Có dấu hiệu mất bảo mật/toàn vẹn/lộ dữ liệu — **quy tắc R9** |
| `security_incident_ref` | ref → M28 | có **khi** `security_flag = true` | Chuyển sang M28 (phiếu F28.03), M33 không tự kết luận |
| `platform_incident_ref` | ref → M35 | có **khi** ảnh hưởng nền tảng số | Sự cố nền tảng thuộc M35 (phiếu F35.03) |
| `measurement_impact_ref` | ref → M10 / M11 | có **khi** ảnh hưởng dữ liệu đo hoặc hiệu lực kết quả **đã phát hành** | M33 không kết luận hiệu lực kết quả; **dừng sử dụng kết quả liên quan** cho tới khi có kết luận (ETV.P33 §6.5.3) |
| `continuity_ref` | ref → M31 | có **khi** gián đoạn vượt ngưỡng kích hoạt kế hoạch liên tục | Đích định tuyến thứ tư — ETV.P33 §6.5.3 |
| `assigned_to` | ref User (QTHT) | có | |
| `root_cause` | text | có, khi đóng | Nguyên nhân (ETV.P33 §6.5.4) |
| `resolution` | text | có, khi đóng | Biện pháp đã thực hiện |
| `asset_back_to_normal` | bool | có, khi đóng | Xác nhận tài sản trở lại hoạt động bình thường (ETV.P33 §6.5.4) |
| `lesson_ref` / `no_lesson_reason` | ref → M26 / text | có, khi đóng (một trong hai) | Kết luận **có** lập bài học kinh nghiệm hay không (`ETV.P26`) — ETV.P33 §6.5.4 |
| `maintenance_ref` | ref `MaintenanceTask` | không | Công việc sửa chữa phát sinh |
| `capa_ref` | ref → M13 | có **khi** lặp ≥ 3 lần/90 ngày trên cùng tài sản | Quy tắc R9 |
| `status` | enum: Mới / Đang xử lý / Chờ bên thứ ba / Đã xử lý / Đã đóng / Hủy | tự quản lý | Hủy bắt buộc lý do; thẩm quyền theo `ETV.P33` Phụ lục II.2 |

### 2.5. `AuditLog`

Append-only, ghi mọi thao tác tạo/sửa/đổi trạng thái trên 4 thực thể: ai, khi nào, trường nào, giá
trị trước → sau, lý do (khi bắt buộc). Nhật ký của module **không** thay thế nhật ký hệ thống do
QTHT quản lý (ETV.P28 mục 6.7.5) — hai loại tồn tại song song, module chỉ trỏ tới bằng
`evidence_ref` / `system_log_ref`.

### 2.6. `MaintenancePlan` — Kế hoạch bảo trì năm

ETV.P33 §6.3.1: Văn phòng lập kế hoạch bảo trì năm cho **toàn bộ tài sản có hệ điều hành hoặc phần
mềm nền**, trình **LĐV phê duyệt trước khi bắt đầu năm kế hoạch**. Đây là một hồ sơ được phê duyệt,
không phải danh sách công việc rời — nên tách thành thực thể riêng.

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `code` / `year` | string / int | tự sinh / có | Mỗi năm một kế hoạch |
| `scope_asset_refs[]` | ref `ITAsset` | có | Tài sản có hệ điều hành/phần mềm nền — hệ thống gợi ý đủ, người lập xác nhận |
| `downtime_needs` / `resource_needs` | text | có | Nhu cầu ngừng dịch vụ và nguồn lực (ETV.P33 §6.3.1) |
| `created_by` / `approved_by` / `approved_at` | ref User / ref User (LĐV) / date | có | `created_by ≠ approved_by` |
| `status` | enum: Nháp / Chờ phê duyệt / Đã phê duyệt / Thay thế | tự quản lý | Quy tắc R19 |

### 2.7. `AccountReconciliation` — Kỳ đối chiếu tài khoản

ETV.P33 §6.4.2 bước 4–5: đối chiếu tài khoản thực tế ↔ phiếu đã phê duyệt **06 tháng/lần**, và rà
soát **tài khoản đặc quyền, tài khoản dịch vụ tối thiểu 02 lần/năm** trình LĐV. Bảng đối chiếu là
màn hình tính khi đọc, nhưng **kết quả từng kỳ là hồ sơ phải lưu 05 năm** (§VIII) — nên có bản ghi.

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `code` / `period` | string / string | tự sinh / có | vd `2026-H1` |
| `scope` | enum: Toàn bộ tài khoản / Đặc quyền và dịch vụ | có | Hai chu kỳ khác nhau của ETV.P33 §6.4.2 |
| `orphan_accounts[]` / `orphan_requests[]` / `expired_accounts[]` / `mfa_missing[]` | ref[] | tự sinh | Bốn nhóm bất thường — chốt lại tại thời điểm kết thúc kỳ, không tính lại về sau |
| `performed_by` / `reviewed_by` | ref User (QTHT) / ref User (PT.ATTT) | có | Rà soát đặc quyền cần PT.ATTT (ETV.P33 §6.4.2 bước 5) |
| `submitted_to_ldv_at` | date | có **khi** `scope = Đặc quyền và dịch vụ` | Trình LĐV theo ETV.P28 mục 6.7.1 |
| `status` | enum: Đang thực hiện / Đã chốt | tự quản lý | Đã chốt ⇒ bất biến |

## 3. Vai trò

| Vai trò | Trách nhiệm chính |
|---|---|
| **QTHT** (quản trị hệ thống thông tin, thuộc Văn phòng — QM §5) | Kiểm kê và vận hành hạ tầng; thực hiện bảo trì, vá lỗi; **thực thi** cấp/thu hồi tài khoản theo phiếu M28; xử lý sự cố kỹ thuật |
| **Văn phòng** | Đơn vị chủ trì quản trị hệ thống thông tin và nền tảng số; tổng hợp danh mục, kế hoạch bảo trì, ngân sách |
| **PT.ATTT** | Soát xét cấu hình an toàn, phân vùng mạng, mức phân loại tối đa của thiết bị; đánh giá ảnh hưởng ATTT trước thay đổi; **kết luận** sự cố có dấu hiệu mất ATTT; **xác nhận phương pháp xóa dữ liệu an toàn** |
| **TP** (đơn vị sử dụng) | Xác nhận nhu cầu, tiếp nhận và bảo quản thiết bị được giao; báo sự cố; **nghiệm thu bảo trì** trong phạm vi đơn vị; **đánh giá ảnh hưởng tới hiệu lực kết quả đo** khi thay đổi chạm máy tính điều khiển thiết bị đo (phối hợp M10) |
| **QLCL** | Bảo đảm hồ sơ lưu theo `ETV.P15`; **mở KPH** ở M13 khi sự cố lặp hoặc bảo trì/vá lỗi quá hạn kéo dài; đưa tình hình hạ tầng vào chương trình đánh giá nội bộ (M16) |
| **LĐV** | Phê duyệt danh mục hạ tầng, **kế hoạch bảo trì năm và ngân sách thay thế**, ngừng vận hành – thanh lý, ngoại lệ (thiết bị cá nhân xử lý Hạn chế/Mật, tài khoản dùng chung, **hạ tầng EOL còn phục vụ hoạt động trọng yếu**); quyết định biện pháp khi hạ tầng mức trọng yếu Cao mất khả năng hoạt động |
| **NTH** (nhân viên) | Sử dụng thiết bị đúng quy định; **không tự cài phần mềm không bản quyền, không tự đổi cấu hình an toàn**; báo sự cố ngay khi phát hiện; hoàn trả thiết bị và bàn giao dữ liệu khi chấm dứt công việc hoặc chuyển công tác |

Nguyên tắc tách vai trò (ETV.P33 §5.3), M33 thực thi cả ba:
1. **Người đề nghị ≠ người phê duyệt ≠ người thực hiện** đối với quyền truy cập (ETV.P28 mục
   6.7.1) — M33 chỉ giữ vai trò **người thực hiện**.
2. **Người lập bản ghi tài sản ≠ người soát xét** (PT.ATTT hoặc TP khác) **≠ người phê duyệt** (LĐV).
3. **Người thực hiện bảo trì ≠ người nghiệm thu** chính công việc đó (quy tắc R15).

## 4. Danh mục chuẩn

### 4.1. Lớp tài sản CNTT (`asset_class`) — ETV.P33 §2.1 (dự thảo, chờ soát xét)

Máy chủ (vật lý/ảo) · Thiết bị mạng (switch, router, firewall, access point) · Máy trạm – máy tính
xách tay · Thiết bị di động · **Máy tính điều khiển – thu thập dữ liệu của thiết bị đo** · Thiết bị
lưu trữ (NAS, ổ cứng ngoài, băng từ) · Thiết bị ngoại vi (máy in, máy quét, UPS) · Phần mềm – bản
quyền · Dịch vụ CNTT thuê ngoài (đám mây, hosting, email, **tên miền, chứng thư số máy chủ**) ·
Thiết bị ký số (USB token).

Đủ 10 lớp, khớp bảng của ETV.P33 §2.1 — M33 áp dụng nguyên, không định nghĩa lại.

### 4.2. Mức trọng yếu (`criticality`) và hệ quả — ETV.P33 §6.1.3

| Mức | Ý nghĩa | Hệ quả bắt buộc |
|---|---|---|
| Thấp | Hỏng không ảnh hưởng đáng kể | Bảo trì theo kế hoạch chung |
| Trung bình | Hỏng ảnh hưởng một phòng/một hệ thống | Có kế hoạch bảo trì riêng; theo dõi hạn bảo hành |
| **Cao** | Hỏng làm ngừng dịch vụ toàn Viện, ngừng nền tảng ManLab, hoặc mất dữ liệu/hiệu lực kết quả đo | Bắt buộc `recovery_time_objective` **và** `failover_plan`, nằm trong kế hoạch liên tục (M31), **≥ 01 rủi ro đã mở** ở M01/M28, ưu tiên vá lỗi cao nhất, **rà soát ≤ 01 năm** |

### 4.3. Thời hạn hoàn thành vá lỗi bảo mật theo mức nghiêm trọng — ETV.P33 §6.3.3

ETV.P28 mục 6.7.3 yêu cầu "vá lỗi theo mức nghiêm trọng của lỗ hổng" nhưng không nêu con số;
ETV.P33 §6.3.3 **đã chốt** mốc áp dụng trong toàn Viện (giá trị định lượng còn chờ Viện xác nhận
khi phê duyệt thủ tục):

| Mức nghiêm trọng | Thời hạn kể từ khi nhà cung cấp phát hành bản vá |
|---|---|
| **Nghiêm trọng** | **07 ngày**; chưa vá được ⇒ **biện pháp giảm thiểu tạm thời trong 48 giờ** và ghi vào hồ sơ |
| Cao | 30 ngày |
| Trung bình | 90 ngày |
| Thấp | Theo chu kỳ bảo trì kế tiếp |

Quá hạn ⇒ cảnh báo chủ quản trị; **vá lỗi Nghiêm trọng quá hạn** hoặc bảo trì quá **02 chu kỳ liên
tiếp** ⇒ cảnh báo LĐV và mở KPH theo M13 (quy tắc R8).

### 4.4. Phân vùng mạng (`network_zone`) — ETV.P28 mục 6.7.3 (đã ban hành)

Vùng quản trị – văn phòng · **vùng thiết bị đo và hệ thống thu thập dữ liệu** · vùng khách – Wi-Fi
công cộng. M33 áp dụng nguyên, không định nghĩa lại.

### 4.5. Thiết bị cá nhân dùng cho công việc (BYOD) — ETV.P33 §6.2.4

| Mức phân loại thông tin xử lý | Điều kiện |
|---|---|
| Công khai, **Nội bộ** | **Được phép**, với điều kiện thiết bị đã đăng ký trong danh mục và đủ cấu hình an toàn cơ sở (ETV.P33 §6.2.3) |
| **Hạn chế**, **Mật** | Phải được **LĐV phê duyệt** và ghi nhận rủi ro tương ứng (ETV.P28 mục 6.7.2) |

Thiết bị cá nhân **không đăng ký** không được kết nối vào **vùng quản trị – văn phòng** và **vùng
thiết bị đo** — phát hiện thì ngắt kết nối và xử lý theo ETV.P33 §6.7 (quy tắc R17).

### 4.6. Mức ưu tiên và thời hạn xử lý sự cố — ETV.P33 §6.5.2

Thủ tục phân **ba** mức ưu tiên, còn `impact` của phiếu có **bốn** giá trị — ánh xạ như sau (đây là
diễn giải của đặc tả, cần xác nhận khi phê duyệt thủ tục — mục 10, điểm còn lệch số 3):

| `impact` | `priority` | Thời hạn phản hồi | Thời hạn xử lý mục tiêu |
|---|---|---|---|
| Ngừng dịch vụ toàn Viện | **Cao** | **Ngay**, báo cáo LĐV trong **01 giờ** | Theo `recovery_time_objective` của tài sản |
| Ngừng một phòng – một hệ thống | Trung bình | **04 giờ làm việc** | 02 ngày làm việc |
| Ảnh hưởng một người dùng | Thấp | **01 ngày làm việc** | 05 ngày làm việc |
| Không ảnh hưởng vận hành | Thấp | 01 ngày làm việc | 05 ngày làm việc |

**Nâng mức bắt buộc lên Cao** không phụ thuộc `impact` khi sự cố chạm một trong ba điều kiện của
ETV.P33 §6.5.2: tài sản có `criticality = Cao`, nền tảng ManLab ngừng, hoặc ảnh hưởng hệ thống thu thập dữ
liệu đo.

### 4.7. Lộ trình kiểm kê kỳ đầu — ETV.P33 §6.1.5

| Đợt | Phạm vi | Thời hạn kể từ ngày thủ tục có hiệu lực |
|---|---|---|
| Đợt 1 | Máy chủ, thiết bị mạng, **máy tính điều khiển – thu thập dữ liệu thiết bị đo**, thiết bị lưu trữ, thiết bị ký số, dịch vụ thuê ngoài | **90 ngày** |
| Đợt 2 | Máy trạm, máy tính xách tay, thiết bị di động, thiết bị ngoại vi, phần mềm – bản quyền | **180 ngày** |

Module hiển thị tiến độ hai đợt trên bảng điều khiển (`06_Dashboard`), tính theo `discovery_source`
và `commissioned_at`.

## 5. Quy tắc nghiệp vụ

**R1. Không có hạ tầng vô chủ** (`ETV.P33` Phụ lục I.1 điều kiện 1 và I.2 — **chặn cứng**) — mỗi
`ITAsset` phải có `custodian` (QTHT) **và** `user_owner` là người/đơn vị **cụ thể đang hoạt động**.
Thiếu một trong hai ⇒ **không cho lưu**, không chỉ chặn phê duyệt.

**R2. Kiểm kê một lần, không hai nơi** — M33 kiểm kê **thiết bị, hệ thống, phần mềm**; M27 kiểm kê
**dữ liệu** và trỏ xuống bằng `system_ref`. Báo cáo kiểm kê tài sản theo ISO/IEC 27001 A.5.9 là
**hợp của M33 + M27**, xuất từ một màn hình chung; **không lập hai danh mục thiết bị song song**.
Điểm lệch câu chữ giữa `ETV.P28` **lần BH 01** mục 5.7.2 ("đăng ký trong danh mục tài sản ETV.MP27")
và ETV.P35 mục 2.3 (giao thiết bị đầu cuối cho ETV.P33) **đã được chốt** tại ETV.P33 §2.2 Nguyên
tắc 1 — và đã được **đưa vào chính `ETV.P28` lần BH 02** (mục 5.7.2 + ghi chú ranh giới tại mục 1.4,
đang chờ soát xét), nên kết luận không chỉ nằm trong một thủ tục: **thiết bị đăng ký tại P33, dữ liệu
trên thiết bị đăng ký tại P27**. Yêu cầu cấu hình an toàn của ETV.P28 mục 6.7.2 vẫn áp dụng nguyên
và được kiểm chứng tại ETV.P33 §6.2.3.

**R2b. Dịch vụ thuê ngoài vừa là hạ tầng vừa có thể là nền tảng** (ETV.P33 §2.1) — dịch vụ đám
mây, hosting, thư điện tử, tên miền, chứng thư số máy chủ được kiểm kê tại M33 với tư cách **hạ
tầng**; nếu dịch vụ đó **đồng thời là nền tảng phần mềm phục vụ nghiệp vụ** thì phải đăng ký thêm
bản ghi nền tảng ở **M35** và **liên kết hai bản ghi**. M33 cảnh báo khi `asset_class = Dịch vụ CNTT
thuê ngoài` mà `platform_refs` rỗng.

**R3. Cấu hình an toàn cơ sở bắt buộc** (ETV.P28 mục 6.7.2 — **đã ban hành**; cách thực thi và
kiểm chứng tại ETV.P33 §6.2.3 — **chặn cứng**), áp cho **thiết bị đầu cuối và máy chủ**: khóa màn
hình tự động · mật khẩu/mã PIN · phần mềm phòng chống mã độc đang hoạt động · cập nhật bản vá ·
**đổi mật khẩu mặc định và đóng dịch vụ không dùng đến** · **mã hóa ổ đĩa khi
`max_classification ∈ {Hạn chế, Mật}`**. Thiếu bất kỳ điều kiện nào ⇒ chặn phê duyệt đưa vào vận
hành. `is_personal_device = true` mà xử lý thông tin Hạn chế/Mật ⇒ bắt buộc **phê duyệt của LĐV** và
rủi ro tương ứng ghi ở M28; xử lý thông tin Công khai/**Nội bộ** ⇒ được phép nếu đã đăng ký và đủ
cấu hình cơ sở (mục 4.5).

**R4. Máy tính điều khiển thiết bị đo là vùng đặc biệt** (ETV.P28 mục 6.7.3 — **đã ban hành, chặn
cứng**; trình tự tại ETV.P33 §6.3.4): mọi thay đổi cấu hình hoặc cập nhật phần mềm điều khiển phải
thực hiện theo **MP30** và phải có **đánh giá ảnh hưởng tới hiệu lực kết quả đo (MP10, và MP08 nếu
chạm phương pháp)** *trước khi* áp dụng. M33 chặn ghi nhận hoàn thành `MaintenanceTask` loại này khi
thiếu `change_ref` hoặc `measurement_impact_ref`. Sau khi áp dụng, bắt buộc **kiểm tra xác nhận hệ
thống thu thập dữ liệu hoạt động đúng** (`post_check_result`) trước khi dùng lại cho công việc chính
thức.

**R5. Thay đổi hệ thống đi qua M30, kèm đánh giá ATTT** (ETV.P28 mục 6.9 — **đã ban hành**): nâng
cấp nền tảng, tích hợp mới, đổi phân quyền diện rộng ⇒ bắt buộc `change_ref` → M30 và
`impact_assessment_ref` → M28 trước triển khai. Môi trường **Phát triển/Kiểm thử phải tách khỏi Vận
hành**; **nghiêm cấm** dùng dữ liệu thật của khách hàng để kiểm thử khi chưa ẩn danh hoặc chưa được
LĐV phê duyệt (ETV.P28 mục 6.7.10) — M33 chặn gán tài sản thông tin chứa dữ liệu khách hàng
(← M27) vào tài sản có `environment ≠ Vận hành` nếu thiếu phê duyệt.

**Ngoại lệ khẩn cấp** (ETV.P33 §5.2): QTHT **từ chối** thực hiện thay đổi cấu hình khi chưa có
phiếu thay đổi được phê duyệt, **trừ trường hợp khẩn cấp có lệnh của LĐV** — khi đó bản ghi phải có
`emergency_order_ref` (lệnh của LĐV) và **phiếu thay đổi bổ sung hồi tố** ở M30; thiếu một trong hai
⇒ xử lý như **thay đổi âm thầm** theo `ETV.P30` (`ETV.P33` Phụ lục I.2).

**R6. Không có tài khoản ngoài phiếu** — mọi `SystemAccount` phải có `access_request_ref` trỏ tới
phiếu **đã phê duyệt** ở M28; QTHT là **người thực hiện**, không phải người phê duyệt. Tài khoản
phát hiện trên hệ thống mà không có phiếu ⇒ đánh dấu bất thường, khóa tạm và mở sự cố ở M28.

**R7. Không lưu bí mật xác thực** (ETV.P33 §6.1.1, ETV.P33 §6.4.1 và Phụ lục I.1 điều kiện 7 — **cấm tuyệt
đối**, áp cho **cả bản ghi tài sản lẫn bản ghi tài khoản**) — nghiêm cấm lưu mật khẩu, khóa API, mã
PIN, chứng thư số dưới bất kỳ dạng nào (kể cả đã mã hóa); chỉ ghi `secret_location` (*nơi lưu giữ*)
và `secret_issuer` (*người có quyền cấp phát*). Trường tự do bị kiểm tra mẫu để chặn dán bí mật.
Phát hiện bản ghi chứa bí mật ⇒ **thu hồi bí mật xác thực ngay** theo M28 **và lập KPH** ở M13
(`ETV.P33` Phụ lục I.2).

**R8. Bảo trì và vá lỗi đúng hạn** (ETV.P33 §6.3.3) — mọi `ITAsset` có hệ điều hành/phần mềm phải
nằm trong **kế hoạch bảo trì năm đã được LĐV phê duyệt** (quy tắc R19) theo `maintenance_cycle`; vá
lỗi bảo mật hoàn thành theo mốc mục 4.3. Quá hạn ⇒ cảnh báo `custodian`; quá **02 chu kỳ liên tiếp**
hoặc vá lỗi **Nghiêm trọng** quá hạn ⇒ cảnh báo LĐV và **mở KPH ở M13**.

**R9. Định tuyến sự cố đúng chủ sở hữu** (ETV.P33 §6.5.3 — **năm đích, bắt buộc**) —
`security_flag = true` ⇒ `security_incident_ref` sang **M28** (M33 không tự kết luận; **phiếu không
được đóng trước khi M28 kết luận**); ảnh hưởng nền tảng số ⇒ `platform_incident_ref` sang **M35**;
ảnh hưởng dữ liệu đo hoặc hiệu lực kết quả **đã phát hành** ⇒ `measurement_impact_ref` sang
**M10/M11** kèm **dừng sử dụng kết quả liên quan** cho tới khi có kết luận; gián đoạn vượt ngưỡng
kích hoạt kế hoạch liên tục ⇒ `continuity_ref` sang **M31**; lặp **≥ 03 lần/90 ngày** trên cùng tài
sản ⇒ bắt buộc `capa_ref` sang **M13**.

**R10. Xóa dữ liệu an toàn trước khi rời tay Viện** (ETV.P28 mục 6.7.2 — **đã ban hành, chặn
cứng**): thanh lý, chuyển giao hoặc gửi sửa chữa bên ngoài chỉ được thực hiện khi có **bằng chứng
xóa dữ liệu an toàn** — biên bản hủy ở **M27** (`DisposalRecord`) hoặc bằng chứng tương đương. M33
chặn chuyển trạng thái sang **Đã thanh lý** khi thiếu bằng chứng này. Trước đó, trình tự ETV.P33
§6.6.1 buộc kiểm tra **ba nhóm đối tượng còn phụ thuộc** — nền tảng số (M35), tài sản thông tin còn
lưu (M27), **thiết bị đo còn được phục vụ (M05)** — và **thu hồi tài khoản, quyền truy cập, chứng
thư số gắn với tài sản** (bước 4) trước khi trình LĐV.

**R11. Hạ tầng hết vòng đời phải có rủi ro** (ETV.P33 §6.6.3) — `eol_date` đã qua mà tài sản còn ở
trạng thái Đang vận hành ⇒ bắt buộc ≥ 01 `risk_refs` sang M28/M01, **biện pháp giảm thiểu** và **kế
hoạch thay thế có mốc thời gian**; cảnh báo LĐV **hằng quý** cho tới khi xử lý xong.

**R12. Rà soát định kỳ** (ETV.P33 §6.1.4 bước 6) — mặc định **01 năm/lần**, `criticality = Cao` ⇒
**≤ 01 năm**; nội dung rà soát là xác nhận bản ghi **còn đúng và còn cần thiết**, hoặc đề nghị thay
thế/ngừng vận hành. Cờ **Đến hạn rà soát**, **Đến hạn bảo trì**, **Quá hạn vá lỗi**, **Sắp hết hạn
bản quyền/bảo hành/EOL** đều **tính khi đọc**, không lưu cột riêng.

**R13. Tách vai trò, ghi vết, lưu hồ sơ** — `created_by ≠ approved_by`; `reviewed_by` (PT.ATTT hoặc
TP khác) ≠ người lập; mọi thao tác ghi `AuditLog` append-only; hồ sơ danh mục, bảo trì, tài khoản,
sự cố lưu theo **ETV.P15**.

**R14. AI hỗ trợ có kiểm soát (← M29)** (ETV.P33 §6.8) — AI được phép *phát hiện* tài sản chưa
kiểm kê, *nhắc* hạn rà soát/bảo trì/vá lỗi/bản quyền–bảo hành–EOL, *đối chiếu* tài khoản thực tế với
phiếu và nêu bất thường, *gợi ý* phân loại và định tuyến sự cố, *soạn dự thảo* báo cáo tình hình hạ
tầng. AI **không** phê duyệt danh mục, **không** phê duyệt hay thực hiện cấp/thu hồi quyền, **không**
tự đổi cấu hình trên hệ thống vận hành, **không** kết luận sự cố ATTT và **không** kết luận hiệu lực
kết quả đo. Mọi tính năng AI của M33 phải có **hồ sơ AIA theo MP29** (ISO/IEC 42001; `ETV.P29`).

**R15. Nghiệm thu bảo trì phải khác người thực hiện** (ETV.P33 §6.3.2 bước 5 và Phụ lục II.2) —
`MaintenanceTask` không đi thẳng từ Đang thực hiện sang Hoàn thành: phải qua **Chờ nghiệm thu**, và
`accepted_by` (TP hoặc QTHT khác) **≠** `performed_by`. Thiếu nghiệm thu ⇒ chặn Hoàn thành. Sau
nghiệm thu, bản ghi tài sản được cập nhật phiên bản, `last_maintained_at` và hạn kế tiếp (bước 6).

**R16. Thu hồi tài khoản trong ngày làm việc** (ETV.P33 §6.4.2 bước 3; ETV.P28 mục 6.7.1) — khi
có tín hiệu chấm dứt hợp đồng, chuyển công tác hoặc kết thúc công việc của bên thứ ba (← M03), M33
đặt `revocation_due_at` = **cuối ngày làm việc đó** và cảnh báo cho tới khi thu hồi xong. Việc thu
hồi là **điều kiện bắt buộc để hoàn tất thủ tục thôi việc** theo `ETV.P03` — M33 trả tín hiệu hoàn
tất về M03.

**R17. Hạ tầng chưa kiểm kê là sự không phù hợp** (ETV.P33 §6.7) — tài sản đang dùng cho công việc
của Viện mà chưa có bản ghi ⇒ lập bản ghi Nháp với `discovery_source = Phát hiện chưa kiểm kê`, xác
định chủ quản trị và đơn vị sử dụng; nếu còn cần thiết thì phải đưa vào vận hành **trong 30 ngày**;
nếu **không đạt cấu hình an toàn cơ sở** thì **ngắt khỏi mạng của Viện** (`network_isolated = true`)
cho tới khi khắc phục; nếu tài sản đó **có lưu dữ liệu Hạn chế/Mật** thì bắt buộc **lập KPH ở M13 và
mở sự cố ở M28**. Thiết bị cá nhân chưa đăng ký kết nối vào vùng quản trị hoặc vùng thiết bị đo được
xử lý theo cùng quy tắc này.

**R18. Sự cố có thời hạn phản hồi, không chỉ thời hạn xử lý** (ETV.P33 §6.5.2) — mỗi phiếu có
`response_due_at` và `resolution_due_at` tính theo `priority` (mục 4.6); mức **Cao** phải phản hồi
**ngay** và **báo cáo LĐV trong 01 giờ**. Quá hạn phản hồi là một cờ cảnh báo riêng, tính khi đọc,
tách khỏi cờ quá hạn xử lý. Đóng phiếu bắt buộc đủ: `root_cause`, `resolution`,
`asset_back_to_normal`, kết luận của thủ tục được định tuyến (nếu có), và kết luận **có/không lập
bài học kinh nghiệm** theo `ETV.P26` (ETV.P33 §6.5.4).

**R19. Kế hoạch bảo trì năm phải được phê duyệt trước năm kế hoạch** (ETV.P33 §6.3.1) — Văn phòng
lập `MaintenancePlan` phủ **toàn bộ tài sản có hệ điều hành hoặc phần mềm nền**, trình LĐV phê duyệt
**trước khi bắt đầu năm kế hoạch**. Tài sản thuộc phạm vi mà không nằm trong kế hoạch năm đã duyệt ⇒
cờ cảnh báo trên bảng đến hạn. `created_by ≠ approved_by`.

**R20. Đối chiếu tài khoản là kỳ có hồ sơ, không phải màn hình tra cứu** (ETV.P33 §6.4.2 bước 4–5)
— đối chiếu toàn bộ tài khoản **06 tháng/lần**; riêng **tài khoản đặc quyền và tài khoản dịch vụ**
rà soát **≥ 02 lần/năm** và **trình LĐV**. Kết quả từng kỳ chốt thành `AccountReconciliation` bất
biến, lưu **05 năm**. Tài khoản bất thường phát hiện trong kỳ ⇒ **khóa tạm ngay**, **không được xóa**
trước khi PT.ATTT xem xét (ETV.P33 §6.4.3), và mở sự cố ở M28.

**R21. Phần mềm phải có giấy phép hợp lệ** (ETV.P33 §6.2.5 và Phụ lục I.1 điều kiện 8 — **chặn
cứng**) — `asset_class = Phần mềm – bản quyền` phải có `license_type` và `license_expiry` còn hiệu
lực mới được phê duyệt. Phát hiện phần mềm không bản quyền trên hạ tầng của Viện ⇒ **gỡ bỏ ngay và
lập KPH ở M13**. Người dùng không tự cài phần mềm trên máy trạm khi chưa được QTHT chấp thuận.

**R22. Mã tài sản không bao giờ được cấp lại** (ETV.P33 §6.1.2 và Phụ lục I.2) — mã do Văn phòng
cấp một lần khi tạo bản ghi, **duy nhất toàn hệ thống**, không thay đổi; mã của tài sản **đã thanh
lý không được cấp lại** cho tài sản khác, để giữ nguyên giá trị truy vết của nhật ký lịch sử.

## 6. Trạng thái `ITAsset`

Bảng dưới theo `ETV.P33` **Phụ lục II.1**. Cột **Người đưa vào trạng thái** là người *thực hiện thao
tác chuyển bản ghi sang trạng thái đó* — không phải người chờ xử lý tại đó; đọc nhầm hai nghĩa này là
nguồn sai phân quyền phổ biến nhất khi lập trình state machine.

| STT | Trạng thái | Ý nghĩa | Người đưa vào trạng thái | Chuyển tiếp | Bắt buộc lý do |
|---|---|---|---|---|---|
| 1 | Nháp | Đang khai báo | QTHT | Đủ trường bắt buộc theo `asset_class` + đã áp cấu hình an toàn cơ sở → Chờ soát xét | Không |
| 2 | Chờ soát xét | Chờ kiểm tra cấu hình an toàn, vùng mạng, mức phân loại tối đa | QTHT | PT.ATTT (**≠ người lập**) soát xét: Đạt → Chờ phê duyệt; Không đạt → Không soát xét | Không |
| 3 | Không soát xét | Bị trả lại để sửa | PT.ATTT (≠ người lập) | QTHT sửa → Chờ soát xét | **Có** |
| 4 | Chờ phê duyệt | Chờ LĐV | PT.ATTT, VP | LĐV phê duyệt: Đạt → Đang vận hành (**chặn** khi vi phạm Phụ lục I.1 — R1, R3, R5, R21); Không đạt → Không phê duyệt | Không |
| 5 | Không phê duyệt | Bị trả lại để sửa | LĐV | QTHT sửa → Chờ soát xét | **Có** |
| 6 | Đang vận hành | Đang phục vụ công việc | **LĐV** (phê duyệt); QTHT vận hành sau đó | Bảo trì lớn/sự cố → Tạm ngừng; chấm dứt sử dụng → Ngừng vận hành | Không |
| 7 | Tạm ngừng | Đang bảo trì/sửa chữa, chưa chấm dứt sử dụng | QTHT | Xong → Đang vận hành; không khắc phục được → Ngừng vận hành | **Có** |
| 8 | Ngừng vận hành | Không còn dùng, **chưa thanh lý**, dữ liệu chưa xử lý xong | QTHT | Hết đối tượng phụ thuộc (M35/M27/**M05**) + đã thu hồi tài khoản và chứng thư số + có bằng chứng xóa dữ liệu an toàn (← M27) + LĐV duyệt → Đã thanh lý | **Có** |
| 9 | Đã thanh lý | Đã thanh lý/chuyển giao — **bản ghi kiểm kê vẫn giữ**, mã không cấp lại | **LĐV** | (kết thúc) | **Có** |
| 10 | Hủy bản ghi | Khai báo sai/trùng, bỏ trước khi phê duyệt | LĐV | (kết thúc) | **Có** |

Bốn cờ tính khi đọc, không phải trạng thái: **Đến hạn rà soát** · **Đến hạn bảo trì** · **Quá hạn vá
lỗi bảo mật** · **Sắp hết hạn bản quyền/bảo hành/EOL**. Bổ sung ba cờ từ `ETV.P33`: **Quá hạn phản
hồi sự cố** (R18) · **Quá hạn đưa vào vận hành của tài sản phát hiện chưa kiểm kê** (R17) · **Ngoài
kế hoạch bảo trì năm** (R19).

Trạng thái thực thể phụ (`ETV.P33` Phụ lục II.2):
`MaintenanceTask` (Kế hoạch → Đang thực hiện → **Chờ nghiệm thu** → Hoàn thành / Quá hạn / Hủy —
thẩm quyền kết thúc: TP hoặc QTHT **khác người thực hiện**, R15) ·
`SystemAccount` (Đang hoạt động → Tạm khóa → Đã thu hồi — QTHT thực hiện theo phiếu F28.04) ·
`ITIncident` (Mới → Đang xử lý → Chờ bên thứ ba → Đã xử lý → Đã đóng / Hủy — QTHT đóng; **PT.ATTT**
khi có yếu tố ATTT; **LĐV** khi Hủy) ·
`MaintenancePlan` (Nháp → Chờ phê duyệt → Đã phê duyệt → Thay thế — LĐV phê duyệt, R19) ·
`AccountReconciliation` (Đang thực hiện → Đã chốt — bất biến sau khi chốt, R20).

Mọi nhánh **Hủy**, **Không phê duyệt**, **Không soát xét**, **Quá hạn** bắt buộc ghi lý do.

## 7. Đầu ra

| Đầu ra | Định dạng | Ghi chú |
|---|---|---|
| F33.01 — Danh mục tài sản công nghệ thông tin | PDF/Excel | Theo lớp tài sản, vùng mạng, môi trường, mức trọng yếu, chủ quản trị |
| F33.02 — Kế hoạch và hồ sơ bảo trì hệ thống | PDF/Excel | Kế hoạch năm và kết quả thực hiện, kèm bằng chứng |
| F33.03 — Danh mục tài khoản hệ thống | PDF/Excel | Tài khoản theo hệ thống, loại, MFA, phiếu M28 tương ứng |
| F33.04 — Phiếu sự cố và yêu cầu hỗ trợ CNTT | PDF | Sự cố, mức ảnh hưởng, xử lý, định tuyến sang M28/M35/M10 |
| **Báo cáo kiểm kê tài sản hợp nhất (M33 + M27)** | PDF/Excel | Phục vụ ISO/IEC 27001 A.5.9 và đoàn đánh giá — quy tắc R2 |
| Bảng đến hạn: rà soát · bảo trì · vá lỗi · bản quyền/EOL | Màn hình | Tính khi đọc |
| Bảng đối chiếu tài khoản thực tế ↔ phiếu M28 | Màn hình/PDF | Tài khoản không có phiếu, phiếu không có tài khoản, tài khoản quá `valid_until`, đặc quyền thiếu MFA — chốt thành kỳ `AccountReconciliation` (R20) |
| **Báo cáo tình hình hệ thống thông tin 06 tháng/lần** | PDF | ETV.P33 §6.9 — bắt buộc đủ 8 nội dung, xem bên dưới |
| Trích xuất hạ tầng trọng yếu và RTO cho M31 | Dữ liệu/PDF | Đầu vào kế hoạch liên tục hoạt động |
| Trích xuất tình hình hạ tầng cho M17 | Dữ liệu/PDF | Sự cố lớn, mức sẵn sàng, hạ tầng EOL, ngân sách thay thế |

**Báo cáo 06 tháng/lần** (ETV.P33 §6.9, cũng lập trước mỗi cuộc họp xem xét lãnh đạo theo
`ETV.P17`) gồm đủ tám nội dung: (1) tổng số tài sản theo lớp, môi trường, vùng mạng, mức trọng yếu;
(2) tài sản đến hạn/quá hạn rà soát và bảo trì; (3) tình hình vá lỗi bảo mật, **nêu riêng lỗ hổng
mức Nghiêm trọng quá hạn**; (4) thống kê sự cố theo mức và thời gian xử lý; (5) kết quả đối chiếu
tài khoản với phiếu; (6) danh sách hạ tầng EOL và kế hoạch thay thế; (7) tài sản phát hiện **chưa
kiểm kê** trong kỳ; (8) nhu cầu ngân sách thay thế, nâng cấp.

**Bốn biểu mẫu `ETV.P.F 33.01–33.04` đã có dự thảo** (`06_SHARED_RESOURCES/01_Forms/`, trạng thái
`Chờ soát xét` cùng với `ETV.P33`) — chỉ được dùng làm hồ sơ chính thức sau khi thủ tục và biểu mẫu
được **phê duyệt theo MP14**. Việc phê duyệt quyền truy cập vẫn dùng **F28.04** của `ETV.P28`; phiếu
thay đổi dùng **F30.02**; sự cố ATTT dùng **F28.03**; sự cố nền tảng dùng **F35.03**; biên bản xóa,
hủy dữ liệu dùng biểu mẫu của `ETV.P27` — **không lập biểu mẫu trùng** (`ETV.P33` §VII).

**Lưu hồ sơ** (`ETV.P33` §VIII, chi tiết theo `ETV.P15` và `ETV.P.F 14.06`): danh mục tài sản —
**vĩnh viễn** trên ManLab · hồ sơ bảo trì — suốt vòng đời tài sản **+ 05 năm** · danh mục tài khoản
và kết quả đối chiếu — **05 năm** · phiếu sự cố — **05 năm** sau khi đóng · biên bản bàn giao, thu
hồi thiết bị — vòng đời tài sản **+ 02 năm** · hồ sơ phê duyệt ngoại lệ (BYOD, tài khoản dùng chung,
hạ tầng EOL) — **10 năm** · bằng chứng xóa dữ liệu — theo `ETV.P27` · nhật ký thay đổi cấu hình —
theo `ETV.P28`.

## 8. Liên kết

Quy trình: **MP33** — thủ tục `ETV.P33_QuanLyHeThongThongTin.md` (**dự thảo lần BH 01, Chờ soát
xét**) · Biểu mẫu: `ETV.P.F 33.01`–`33.04` (cùng trạng thái) · Năng lực: **CAP-28_ATTT** (dùng chung
với MP27, MP28, MP31, MP34, MP37) · Căn cứ đã ban hành: `ETV.QM_QuanlyChatluong.md` §10.2 và §7.11,
`ETV.P28_QuanLyAnToanThongTin.md` mục 6.7.1–6.7.5, 6.7.10 và 6.9, `ETV.P35_QuanLyNenTangSo.md`
**mục 2.3**, `ETV.P02_BaoMat.md` ETV.P33 §6.8, `ETV.P15` · Tiêu chuẩn: ISO/IEC 27001 A.5.9, A.7.9–A.7.10,
A.8.1, A.8.7–A.8.9, A.8.19–A.8.22, A.8.32; ISO 9001 §7.1.3, §9.3; ISO/IEC 17025 §6.4, §7.11;
ISO 17034 §7.4; ISO/IEC 42001 §8.1 · Lưu hồ sơ: **ETV.P15** · Nhóm menu: `CONG_NGHE` (manifest
MP33).

**Đầu vào từ**: M28 (phiếu quyền truy cập **F28.04** đã phê duyệt, kết quả rà soát quyền, đánh giá
ảnh hưởng ATTT) · M30 (quyết định thay đổi, phiếu **F30.02**) · M27 (tài sản thông tin nằm trên
thiết bị, biên bản xóa dữ liệu) · M06/M07 (mua sắm, hợp đồng bảo trì) · M03 (biến động nhân sự — kích
hoạt thu hồi tài khoản theo R16) · M05 (thiết bị đo được phục vụ) · M08 (phương pháp đo, khi thay
đổi chạm phương pháp).

**Đầu ra sang**: M35 (hạ tầng bên dưới nền tảng, `infra_ref`) · M27 (`system_ref` — nơi dữ liệu nằm)
· M28 (tài sản kỹ thuật cho đánh giá rủi ro, sự cố có dấu hiệu ATTT, đối chiếu tài khoản) · M31
(hạ tầng trọng yếu và RTO; sự cố vượt ngưỡng kích hoạt kế hoạch liên tục) · M10/M11 (khi thay đổi
hoặc sự cố ảnh hưởng hệ thống thu thập dữ liệu và hiệu lực kết quả đã phát hành) · M13 (KPH khi sự
cố lặp, bảo trì/vá lỗi quá hạn, phát hiện tài sản chưa kiểm kê có dữ liệu Hạn chế/Mật, phần mềm
không bản quyền) · M26 (bài học kinh nghiệm khi đóng sự cố) · M01 (rủi ro hạ tầng EOL) · M03 (xác
nhận đã thu hồi tài khoản — điều kiện hoàn tất thủ tục thôi việc) · M17 (tình hình hạ tầng trong xem
xét lãnh đạo).

**Không thuộc M33** (ETV.P33 §2.3 và Phụ lục III): đăng ký và đánh giá nền tảng số (M35) · phân
loại và vòng đời dữ liệu, sao lưu, hủy dữ liệu (M27) · chất lượng và kiểm soát truy xuất dữ liệu số
(M34) · đánh giá rủi ro ATTT, SoA, **phê duyệt quyền truy cập** (M28) · phê duyệt thay đổi (M30) ·
kết luận hiệu lực kết quả đo (M10/M11) · hiệu chuẩn và vòng đời thiết bị đo (M05) · mua sắm và đánh
giá nhà cung cấp (M06) · kế hoạch liên tục và diễn tập (M31) · đánh giá tác động AI (M29) · sáng
kiến chuyển đổi số (M32).

## 9. Trạng thái triển khai

**Đã xây nguyên mẫu trên `09_ENGINEERING/aios-platform`** (26/08/2026, theo lệnh BUILD của chủ sở
hữu repo trong khi `ETV.P33` còn `Chờ soát xét` — cùng cách tiếp cận đã dùng cho M34, xem giới hạn
ở mục 10): schema Prisma (7 model `M33*` + 21 enum, migration `m33_he_thong_tt`), gate thuần
`src/lib/m33/rules.ts` (R1–R22, **32 test** `rules.test.ts` PASS), server action + audit
append-only, **11 trang** `/modules/M33…` đúng danh sách `04_UI/Screens.md`, seed demo phủ các
nhánh gate và 7 nhóm cờ đến hạn, vai trò `VP`, `TP` bổ sung vào ModuleRoleAssignment. Mọi giá trị
định lượng trong gate bám dự thảo — Viện phê duyệt thủ tục mà đổi số thì sửa `rules.ts` theo.
Tầng đặc tả:

| Tầng | File | Nội dung |
|---|---|---|
| Yêu cầu | `01_Requirement/DacTa.md` | **Nguồn sự thật** — file này |
| API | `02_API/API.md` | Endpoint và gate theo vai trò |
| Dữ liệu | `03_Database/DataModel.md` | Thực thể, quan hệ, ràng buộc |
| Giao diện | `04_UI/Screens.md` | Màn hình, quy ước hiển thị, tiêu chí chấp nhận |
| Đầu ra | `05_Report/Outputs.md` | Biểu mẫu xuất và báo cáo |
| Bảng điều khiển | `06_Dashboard/Dashboard.md` | Chỉ số theo ETV.P33 §6.9 |
| Quy trình | `07_Workflow/StateMachine.md` | Bảng trạng thái và thẩm quyền |

Hồ sơ làm việc: `01_Requirement/_work/20260824-dac-ta-m33/` (đợt đặc tả gốc — outcome, spec, plan
theo increment), `_work/20260826-dong-bo-p33/` (đợt đối chiếu với thủ tục dự thảo) và
`_work/20260826-build-m33/` (đợt BUILD nguyên mẫu lên aios-platform).

## 10. Đối chiếu với `ETV.P33` — đã chốt và còn lệch

Tám câu hỏi mà bản đặc tả đầu tiên (24/08/2026) để ngỏ **đều đã được `ETV.P33` chốt** (26/08/2026).
Đặc tả này đã cập nhật theo. Bảng dưới giữ lại vết để đoàn đánh giá truy được kết luận nằm ở đâu:

| # | Câu hỏi cũ | Kết luận của `ETV.P33` | Điều khoản |
|---|---|---|---|
| 1 | Có soạn thủ tục chính thức từ đặc tả này không? | **Có** — dự thảo lần BH 01 đã soạn, đang **Chờ soát xét** | Ghi chú soạn thảo |
| 2 | Thiết bị đầu cuối thuộc danh mục của M33 hay M27? | **Thiết bị ở P33, dữ liệu trên thiết bị ở P27**; báo cáo A.5.9 là hợp của hai | ETV.P33 §2.2 Nguyên tắc 1 |
| 3 | Tài khoản: M33 giữ danh mục hay chỉ đọc từ M28? | M33 **giữ danh mục và thực thi** theo phiếu F28.04; phê duyệt vẫn ở P28 | ETV.P33 §2.2 Nguyên tắc 2, ETV.P33 §6.4 |
| 4 | Thời hạn vá lỗi bảo mật? | **07 / 30 / 90 ngày** theo mức, Nghiêm trọng có thêm mốc giảm thiểu **48 giờ** | ETV.P33 §6.3.3 |
| 5 | BYOD có được xử lý thông tin Nội bộ không? | **Được**, nếu đã đăng ký và đủ cấu hình cơ sở; Hạn chế/Mật cần LĐV duyệt | ETV.P33 §6.2.4 |
| 6 | Ngưỡng sự cố lặp để mở KPH? | **≥ 03 lần/90 ngày** trên cùng tài sản | ETV.P33 §6.5.3 |
| 7 | Dịch vụ thuê ngoài kiểm kê ở đâu? | Kiểm kê tại **P33 với tư cách hạ tầng**; nếu đồng thời là nền tảng nghiệp vụ thì **đăng ký thêm ở P35 và liên kết** | ETV.P33 §2.1 |
| 8 | Kiểm kê kỳ đầu bắt đầu từ đâu? | **Hai đợt**: trọng yếu trong **90 ngày**, phần còn lại trong **180 ngày** | ETV.P33 §6.1.5 |

### Còn phải chốt trước khi BUILD

1. **Phê duyệt `ETV.P33` và bộ biểu mẫu F33.01–04 theo MP14.** Thủ tục đang ở `Chờ soát xét`; mọi
   **giá trị định lượng** trong đó là đề xuất chờ Viện xác nhận cho khớp nguồn lực thực tế — nếu
   Viện đổi mốc (vd 07 ngày → 14 ngày), đặc tả và gate phải sửa theo. Không nên BUILD trước mốc này.
2. **Vai trò QTHT và PT.ATTT chưa tồn tại trên nền tảng** — dùng chung với M27/M28, phải bổ sung một
   lần vào `auth.ts`, `menu.ts` và bộ tài khoản demo.
3. **Ánh xạ `impact` (4 giá trị) → `priority` (3 mức SLA)** ở mục 4.6 là **diễn giải của đặc tả**,
   ETV.P33 §6.5.2 không nêu bảng ánh xạ. Cần xác nhận: "Không ảnh hưởng vận hành" xếp mức **Thấp**
   (đề xuất hiện tại) hay tách thành mức thứ tư không có SLA?
4. **Thứ tự phê duyệt `ETV.P28` lần BH 02 ↔ `ETV.P33`.** Câu chữ mục 5.7.2 của P28 đã được hiệu
   đính theo MP14 (lần BH 02, đang chờ soát xét) để không còn đọc ngược với P33. **P33 chỉ nên được
   phê duyệt sau hoặc cùng đợt với P28 lần BH 02** — nếu P33 có hiệu lực trước, hai thủ tục vẫn mâu
   thuẫn trong thời gian chờ. Đây là việc của tầng 03, không phải của module.
5. **Phụ thuộc M27, M28, M30, M31, M35 chưa lên nền tảng** — giai đoạn đầu dùng tham chiếu mềm kèm
   cảnh báo (vd bằng chứng xóa dữ liệu là tệp đính kèm), chuyển thành FK thật khi các module đó
   ACTIVE. Không được nới lỏng **điều kiện chặn cứng** chỉ vì module đích chưa có.
