# M35_NenTangSo — Đặc tả yêu cầu

> **Nguồn**: Thủ tục **`ETV.P35` — Quản lý nền tảng số** đã **ban hành lần 01 ngày 24/08/2026**
> (`03_MANAGEMENT_SYSTEM/02_P/ETV.P35_QuanLyNenTangSo.md`) cùng bộ biểu mẫu **`ETV.P.F35.01–F35.04`**
> trong `06_SHARED_RESOURCES/01_Forms/`. Tiêu chuẩn áp dụng: ISO 9001 §7.1.3/§8.4/§8.5.1,
> ISO/IEC 17025 §6.6 và §7.11, ISO 17034 §6.6/§7.4, ISO/IEC 27001 §8.1, A.5.9, A.5.19–A.5.23,
> A.5.30, A.8.9, A.8.16, A.8.31, ISO/IEC 42001 §6.1/§8.1/§8.4.
>
> **Thủ tục là nguồn sự thật**: nếu đặc tả lệch thủ tục thì sửa đặc tả, không sửa ngược lại.
>
> Bản đặc tả trước (phạm vi Platform Registry của sáng kiến AIOS Control Plane) được **giữ nguyên
> và mở rộng**, không thay thế: mọi trường và ràng buộc đã triển khai trong
> `09_ENGINEERING/aios-platform/prisma/schema.prisma` (model `AIPlatform`) vẫn đúng — xem mục 9.

## 1. Mục tiêu module

Số hóa MP35 — **đăng ký, đánh giá trước vận hành, phê duyệt, giám sát tình trạng, kiểm soát thay
đổi và ngừng vận hành** nền tảng số của Viện, để mọi nền tảng đang được dùng cho công việc đều
**có danh tính rõ ràng, có chủ sở hữu, đúng môi trường, đúng mức bảo mật và được giám sát**
(ETV.P35 mục 1.1).

M35 là **sổ đăng ký (registry) nền tảng, không phải kho cấu hình và không phải kho tài liệu kỹ
thuật**. Bản ghi chỉ giữ **định danh + metadata + đường dẫn** tới hồ sơ gốc: tài liệu kiến trúc ở
thư viện module, hồ sơ nhà cung cấp ở M06, tài sản thông tin ở M27, hồ sơ an toàn thông tin ở M28.
**Nghiêm cấm** lưu mật khẩu, khóa API, chứng thư số trong bản ghi — chỉ ghi *nơi lưu giữ* và
*người có quyền cấp phát* (ETV.P35 mục 1.3).

M35 đồng thời là **nền cho mọi bộ lọc** của trang quản trị AI M29: chọn nền tảng ở đây sẽ lọc toàn
bộ Agent/Tool/Prompt/Trace/Usage hiển thị bên M29.

**Ranh giới**

| Module | M35 làm gì với nó | M35 **không** làm |
|---|---|---|
| **M29_AI** (cùng CAP-29) | Cấp `platform_id` làm khóa lọc; chặn ngừng vận hành khi còn Agent/Tool phụ thuộc | Không quản lý Agent/Tool/Prompt/Trace, không chạy AIA (M29 giữ quyền đó) |
| **M38_DichVuSo** (cùng CAP-29) | Cung cấp nền tảng vận hành dịch vụ; chặn công bố dịch vụ khi nền tảng chưa Hiệu lực | Không quản lý danh mục, giá, SLA của dịch vụ số |
| **M33_HeThongTT** | Trỏ tới hạ tầng bên dưới nền tảng bằng `infra_ref` | Không quản lý máy chủ, mạng, thiết bị đầu cuối, tài khoản người dùng |
| **M28_ATTT** | Kế thừa thang phân loại; trỏ nơi lưu bí mật xác thực; chuyển sự cố có dấu hiệu mất ATTT sang M28 | Không tự định nghĩa thang bảo mật, không lưu bí mật xác thực, không kết luận sự cố ATTT |
| **M27_TaiSanTT / M34_DuLieuSo** | Trỏ tới tài sản dữ liệu chạy trên nền tảng; yêu cầu xử lý xong dữ liệu trước khi cắt truy cập | Không quản lý vòng đời dữ liệu, sao lưu, phục hồi |
| **M37_TichHopDuLieu** | Đăng ký **điểm tích hợp** ở mức định danh và mức phân loại | Không quản lý hợp đồng dữ liệu, ánh xạ trường, lịch đồng bộ |
| **M06_MuaSam** | Trỏ tới hồ sơ đánh giá nhà cung cấp bằng `vendor_assessment_ref` | Không đánh giá, không lựa chọn nhà cung cấp |
| **M01_RuiRo** | Mở/trỏ rủi ro cho nền tảng trọng yếu Cao và cho mọi ngoại lệ có thời hạn | Không đánh giá, không xử lý rủi ro |
| **M31_LienTuc** | Trỏ tới phương án duy trì liên tục bằng `continuity_ref` | Không lập kế hoạch BCP/DR |
| **M30_ThayDoi** | Chuyển thay đổi lớn ảnh hưởng liên phòng sang M30 | Không thẩm định thay đổi liên phòng |
| **M13_KhacPhuc / M26_TriThuc** | Sinh KPH khi sự cố lặp ≥ 3 lần/90 ngày; sinh bài học kinh nghiệm khi đóng sự cố | Không xử lý KPH, không quản lý danh mục tri thức |

## 2. Đối tượng dữ liệu chính

Trục chính là `AIPlatform` (bản ghi nền tảng). Bảy thực thể còn lại là **các dòng vào/ra** của nó:
điểm tích hợp (nền tảng nối với ai), đánh giá trước vận hành (được phép chạy chưa), ngoại lệ (chạy
khi chưa đủ điều kiện), kết quả kiểm tra sức khỏe (đang sống ra sao), sự cố (khi hỏng), thay đổi
(khi đổi cấu hình), ngừng vận hành (khi chấm dứt).

| Đối tượng | Mô tả | Biểu mẫu áp dụng (ban hành 24/08/2026) |
|---|---|---|
| `AIPlatform` | Bản ghi nền tảng số trong danh mục | F35.01 §1 — Danh mục nền tảng số |
| `IntegrationPoint` | Điểm tích hợp giữa nền tảng và nền tảng khác | F35.01 §2 — Danh mục điểm tích hợp |
| `PreOpAssessment` | Hồ sơ đánh giá trước khi đưa vào vận hành | F35.02 — Phiếu đánh giá trước vận hành |
| `PlatformException` | Ngoại lệ có thời hạn do LĐV duyệt | F35.01 §3 + F35.02 §4 |
| `HealthCheckResult` | Kết quả một lượt kiểm tra sức khỏe | F35.03 phần B — Nhật ký giám sát |
| `PlatformIncident` | Sự cố nền tảng | F35.03 phần A — Phiếu sự cố |
| `PlatformChange` | Thay đổi cấu hình nền tảng | F35.03 phần C — Nhật ký thay đổi |
| `DecommissionRecord` | Hồ sơ ngừng vận hành | F35.04 — Phiếu ngừng vận hành |

### 2.1. `AIPlatform` — Bản ghi nền tảng

Giữ **nguyên tên** thực thể và các trường đã triển khai; phần mở rộng đánh dấu **(mới)**.

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `id` | string | tự sinh | Khóa chính |
| `code` | string, duy nhất | có | In hoa không dấu, vd `MANLAB`, `VICONNECT` — quy tắc 1 |
| `name` | string | có | Tên hiển thị |
| `category` | enum | có | **(mới)** 7 nhóm — mục 4.1 |
| `environment` | enum: PRODUCTION / STAGING / INTERNAL | có | Mục 4.2 — mỗi môi trường là **một bản ghi riêng**, quy tắc 2 |
| `base_url` | string | không | URL giao diện người dùng |
| `api_base_url` | string | không | Gốc API để Tool Gateway forward tới — đổi giá trị này kích hoạt quy tắc 8 |
| `adapter_type` | string | có | Định danh `IAIPlatformAdapter`; nền tảng chưa có API thật dùng `PlaceholderPlatformAdapter` — quy tắc 3 |
| `source_type` | enum: Tự xây / Thuê ngoài / Đối tác | có | **(mới)** Quyết định trường bắt buộc kèm theo |
| `vendor` | string | có **khi** `source_type = Thuê ngoài` | **(mới)** Nhà cung cấp |
| `vendor_assessment_ref` | ref → M06 | có **khi** thuê ngoài **và** `data_classification ∈ {Hạn chế, Mật}` | **(mới)** Quy tắc 5đ |
| `owner` | ref User | có | Chủ sở hữu nền tảng — chịu trách nhiệm lý do nghiệp vụ |
| `technical_contact` | ref User | có | **(mới)** Đầu mối kỹ thuật — quy tắc 5a |
| `criticality` | enum: Thấp / Trung bình / Cao | có | **(mới)** Mục 4.3 |
| `data_classification` | enum | có | **(mới)** Kế thừa thang M02/M27/M28 — mục 4.4, quy tắc 4 |
| `risk_refs[]` | ref → M01 | có **khi** `criticality = Cao` | **(mới)** Quy tắc 5d |
| `continuity_ref` | ref → M31 | có **khi** `criticality = Cao` | **(mới)** Quy tắc 5d |
| `aia_ref` | ref → M29 | có **khi** `has_ai_component = true` | **(mới)** Quy tắc 5e |
| `has_ai_component` | bool | có | **(mới)** Nền tảng có thành phần AI hay không |
| `infra_ref` | ref → M33 | không | **(mới)** Hạ tầng bên dưới |
| `doc_refs[]` | link | không | **(mới)** Hồ sơ gốc: kiến trúc, đặc tả, hợp đồng — **không** copy nội dung vào bản ghi |
| `health_check_enabled` | bool | có | **(mới)** Bắt buộc `true` khi `criticality ∈ {Cao, Trung bình}` hoặc `environment = PRODUCTION` — quy tắc 5c |
| `health` | enum: HEALTHY / DEGRADED / DOWN / UNKNOWN | tự quản lý | Tình trạng vận hành — **không phải** trạng thái hồ sơ, quy tắc 6 |
| `last_error` | string | tự ghi | Lỗi gần nhất của kiểm tra sức khỏe |
| `last_health_check_at` | datetime | tự ghi | Mốc kiểm tra gần nhất |
| `review_cycle` | enum: 6 tháng / 1 năm / 2 năm / Theo sự kiện | có | **(mới)** Mục 4.5, quy tắc 7 |
| `last_reviewed_at` | date | tự ghi | **(mới)** Mốc tính hạn rà soát |
| `version` | int | tự sinh | **(mới)** Bắt đầu từ 1 |
| `supersedes_ref` | ref `AIPlatform` | tự gán | **(mới)** Phiên bản bị thay thế — quy tắc 9 |
| `approval_status` | enum | tự quản lý | Vòng đời hồ sơ — mục 6 |
| `created_by` / `reviewed_by` / `approved_by` | ref User | theo bước | `created_by ≠ approved_by`; `reviewed_by` khác người lập — quy tắc 12 |

### 2.2. `IntegrationPoint` — Điểm tích hợp

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `platform_id` | ref `AIPlatform` | có | Nền tảng của Viện |
| `counterpart` | string / ref `AIPlatform` | có | Nền tảng đối tác |
| `direction` | enum: Đi / Đến / Hai chiều | có | Hướng truyền dữ liệu |
| `data_kind` | text | có | Loại dữ liệu trao đổi |
| `data_classification` | enum | có | Mức phân loại **cao nhất** đi qua điểm này |
| `auth_method` | string | có | Phương thức xác thực |
| `secret_location_ref` | link → M28 | có | **Nơi lưu** bí mật xác thực — tuyệt đối không lưu giá trị bí mật, quy tắc 11 |
| `data_contract_ref` | ref → M37 | không | Hợp đồng dữ liệu, ánh xạ trường — thuộc M37 |
| `status` | enum: Hoạt động / Tạm dừng / Đã cắt | tự quản lý | |

### 2.3. `PreOpAssessment` — Đánh giá trước khi đưa vào vận hành

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `code` | string, duy nhất | tự sinh | vd `DGNT-2026-001` |
| `platform_id` | ref `AIPlatform` | có | |
| `sections[]` | 9 mục đánh giá | có | Nhu cầu · Dữ liệu · ATTT · Nhà cung cấp · Xác nhận giá trị sử dụng · Tính liên tục · Tích hợp · AI · Rủi ro (F35.02 §2) |
| `validation_ref` | link | có **khi** nền tảng xử lý dữ liệu kiểm định/hiệu chuẩn/thử nghiệm | Bằng chứng xác nhận giá trị sử dụng theo ISO/IEC 17025 §7.11 — quy tắc 10 |
| `gate_checks[]` | 7 điều kiện chặn cứng | có | Kết quả từng điều kiện tại mục 5.2.3 của thủ tục — quy tắc 5 |
| `conclusion` | enum: Đủ điều kiện / Chưa đủ điều kiện / Đề nghị ngoại lệ | có | |
| `status` | enum | tự quản lý | Nháp → Chờ soát xét → Chờ phê duyệt → Đã phê duyệt / Không phê duyệt |

### 2.4. `PlatformException` — Ngoại lệ có thời hạn

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `platform_id` | ref `AIPlatform` | có | |
| `missing_conditions[]` | enum (trong 7 điều kiện) | có | Điều kiện còn thiếu |
| `reason` | text | có | Lý do cấp bách |
| `risk_ref` | ref → M01 | có | Bắt buộc mở rủi ro — quy tắc 5g |
| `approved_by` | ref User (**LĐV**) | có | Chỉ LĐV duyệt ngoại lệ |
| `deadline` | date | có | **≤ 90 ngày** kể từ ngày phê duyệt — quy tắc 5g |
| `status` | enum: Đang hiệu lực / Đã khắc phục / Quá hạn | tự quản lý | Quá hạn ⇒ cảnh báo LĐV |

### 2.5. `HealthCheckResult` — Kết quả kiểm tra sức khỏe

`platform_id` · `checked_at` · `result` (HEALTHY/DEGRADED/DOWN/UNKNOWN) · `latency_ms` · `error`.
Append-only, lưu **02 năm** (ETV.P35 mục 9). Là nguồn tính bảng nhật ký giám sát F35.03 phần B.

### 2.6. `PlatformIncident` — Sự cố nền tảng

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `code` | string, duy nhất | tự sinh | |
| `platform_id` | ref `AIPlatform` | có | |
| `incident_type` | enum: Ngừng hoạt động / Suy giảm / Mất giám sát / Khác | có | Mất giám sát = UNKNOWN > 07 ngày |
| `detected_at` / `detected_by` | datetime / enum (Hệ thống / Người dùng) | có | |
| `notified_at` | datetime | có **khi** `criticality = Cao` và loại Ngừng | Trong vòng **01 giờ** — mục 5.3.2 |
| `downtime_minutes` | int | tự tính | Từ mốc phát hiện tới mốc trở lại HEALTHY |
| `security_flag` | bool | có | Có dấu hiệu mất ATTT — quy tắc 13 |
| `security_ref` | ref → M28 | có **khi** `security_flag = true` | |
| `affects_ai_refs[]` / `affects_service_refs[]` | ref → M29 / M38 | không | Agent/Tool và dịch vụ số bị ảnh hưởng |
| `root_cause` / `actions[]` / `recovered_at` | text / bảng / datetime | có, khi đóng | Điều kiện đóng phiếu — quy tắc 14 |
| `lesson_ref` | ref → M26 | không | Bài học kinh nghiệm nếu có |
| `capa_ref` | ref → M13 | có **khi** lặp ≥ 3 lần/90 ngày | Quy tắc 15 |

### 2.7. `PlatformChange` — Thay đổi cấu hình

`platform_id` · `change_type` (Nhỏ / Cấu hình kết nối / Lớn) · `before` / `after` (chỉ trường thay
đổi) · `proposed_by` · `reviewed_by` · `approved_by` · `m30_ref` (khi ảnh hưởng liên phòng) ·
`changed_at`. Thẩm quyền theo mục 4.6; ràng buộc theo quy tắc 8 và 9.

### 2.8. `DecommissionRecord` — Ngừng vận hành

`platform_id` · `reason` (bắt buộc) · `replacement_platform_id` · `dependency_checks[]` (Agent,
Tool, Prompt, dịch vụ số, điểm tích hợp) · `data_disposition[]` (loại dữ liệu, cách xử lý, thủ tục
M27/M34, ngày hoàn thành) · `data_minutes_ref` (biên bản xử lý dữ liệu) · `access_revocations[]` ·
`approved_by` (**LĐV**) · `effective_date`. Ràng buộc theo quy tắc 16 và 17.

### 2.9. `AIAuditLog`

Dùng **chung** schema audit của M29_AI (không tạo bảng nhật ký riêng). Mọi thao tác đổi trạng thái,
mọi `PlatformChange`, mọi lần bật/tắt kiểm tra sức khỏe đều ghi vết: ai, khi nào, nội dung, giá trị
trước/sau. Append-only.

## 3. Vai trò

| Vai trò | Quyền chính | Nguồn |
|---|---|---|
| **LĐV** | Phê duyệt đăng ký, phê duyệt ngoại lệ, phê duyệt ngừng vận hành, phê duyệt thay đổi lớn | ETV.P35 §4.1 |
| **QLCL** | Quản trị danh mục, cấp `code`, kiểm tra đủ hồ sơ trước khi trình, theo dõi đến hạn/quá hạn, kiểm tra phụ thuộc khi ngừng vận hành, báo cáo M17 | §4.2 |
| **CSH** (chủ sở hữu nền tảng) | Đề xuất đăng ký, xác định `criticality` và `data_classification`, rà soát định kỳ, đóng phiếu sự cố, đề nghị ngừng vận hành | §4.3 |
| **ĐMKT** (đầu mối kỹ thuật) | Cấu hình adapter/điểm tích hợp/kiểm tra sức khỏe, xử lý sự cố, thực hiện thay đổi đã duyệt, cắt kết nối | §4.4 |
| **QTHT** | Vận hành module, phân quyền, bảo đảm bí mật xác thực nằm đúng chỗ theo M28 | §4.5 |
| **Nhân viên** | Chỉ dùng nền tảng đã phê duyệt; báo cáo nền tảng chưa đăng ký và nền tảng bất thường | §4.6 |

**Trợ lý AI** được phép *gợi ý* trường còn thiếu, *phát hiện* nền tảng nghi chưa đăng ký từ nhật ký
truy cập, *cảnh báo* nền tảng đến hạn rà soát. AI **không** lập bản ghi chính thức, **không** soát
xét, **không** phê duyệt (ISO/IEC 42001; ràng buộc MP29).

## 4. Danh mục chuẩn

### 4.1. Nhóm nền tảng (`category`) — ETV.P35 mục 5.1.1

| # | Nhóm | Ví dụ |
|---|---|---|
| 1 | Lõi nghiệp vụ | ManLab |
| 2 | Đối tác/liên thông | VI-CONNECT, cổng dữ liệu cơ quan quản lý |
| 3 | Văn phòng và cộng tác | Thư điện tử, lưu trữ đám mây, hội họp trực tuyến |
| 4 | Dịch vụ khách hàng | Website, cổng tra cứu kết quả, cổng chứng chỉ số |
| 5 | Dữ liệu và phân tích | Kho dữ liệu, công cụ báo cáo |
| 6 | Trí tuệ nhân tạo | Dịch vụ mô hình ngôn ngữ, cổng công cụ AI |
| 7 | Phát triển và vận hành | Kho mã nguồn, CI, môi trường thử nghiệm |

### 4.2. Môi trường (`environment`) — mục 5.1.2

| Giá trị | Yêu cầu bắt buộc |
|---|---|
| `PRODUCTION` | Có `PreOpAssessment` đã phê duyệt + `health_check_enabled = true` |
| `STAGING` | Ghi rõ dữ liệu thật hay giả lập; nếu **dữ liệu thật** ⇒ áp nguyên yêu cầu của PRODUCTION |
| `INTERNAL` | Có `owner` và `data_classification` |

### 4.3. Mức trọng yếu (`criticality`) — mục 5.1.3

| Mức | Hành động bắt buộc |
|---|---|
| Thấp | Rà soát theo chu kỳ; kiểm tra sức khỏe không bắt buộc |
| Trung bình | `health_check_enabled = true`; có phương án thay thế tạm thời |
| Cao | `health_check_enabled = true` + `risk_refs[] ≥ 1` (M01) + `continuity_ref` (M31); rà soát ≤ 01 năm |

Thang này chỉ **sàng lọc mức ưu tiên**; đánh giá và xử lý rủi ro thực hiện ở M01.

### 4.4. Phân loại dữ liệu (`data_classification`)

Kế thừa nguyên thang của Viện: **Công khai · Nội bộ · Hạn chế · Mật** (M02/M27/M28), ghi theo mức
**cao nhất** nền tảng xử lý hoặc lưu trữ. M35 **không** định nghĩa thang riêng.

### 4.5. Chu kỳ rà soát (`review_cycle`) — mục 5.1.5

Mặc định: Cao ≤ 01 năm · Trung bình 02 năm · Thấp theo sự kiện. Cho phép rút xuống 06 tháng với
nền tảng thay đổi nhanh hoặc nền tảng AI.

## 5. Quy tắc nghiệp vụ

1. **`code` là định danh vĩnh viễn**: duy nhất toàn hệ thống, in hoa không dấu, **không sửa** sau
   khi phê duyệt và **không cấp lại** cho nền tảng khác kể cả khi bản ghi cũ đã Hủy/Hết hiệu lực —
   giữ giá trị truy vết của `AIAuditLog` (ETV.P35 mục 5.1.8).
2. **Mỗi môi trường một bản ghi**: cùng một phần mềm chạy ở PRODUCTION và STAGING là **hai** bản
   ghi, không gộp (mục 5.1.2).
3. **Adapter phải có thật**: `adapter_type` phải khớp một `IAIPlatformAdapter` đã triển khai. Nền
   tảng dùng `PlaceholderPlatformAdapter` **không được** làm căn cứ cho bất kỳ nghiệp vụ tự động
   nào; adapter trả lỗi `501` rõ ràng thay vì suy đoán hành vi (mục 5.1.6 và 7).
4. **Bảo mật kế thừa, không tự định nghĩa**: `data_classification` lấy theo thang M02/M27/M28 và
   phải **nhất quán** với mô tả dữ liệu trong `PreOpAssessment` (mục 5.1.4).
5. **Bảy điều kiện chặn cứng trước khi phê duyệt** (mục 5.2.3) — hệ thống **từ chối** thao tác phê
   duyệt khi thiếu: (a) `owner` và `technical_contact` là người cụ thể đang làm việc tại Viện ·
   (b) có `data_classification` nhất quán với F35.02 · (c) PRODUCTION có `PreOpAssessment` đã phê
   duyệt và `health_check_enabled = true` · (d) `criticality = Cao` có `risk_refs[] ≥ 1` và
   `continuity_ref` · (đ) thuê ngoài xử lý Hạn chế/Mật có `vendor_assessment_ref` còn hiệu lực ·
   (e) `has_ai_component = true` có `aia_ref` · (g) bản ghi **không** chứa bí mật xác thực.
   Ngoại lệ chỉ do **LĐV** duyệt, bắt buộc `reason` + `risk_ref` (M01) + `deadline ≤ 90 ngày`.
6. **Sức khỏe tách khỏi phê duyệt**: `health` do tiến trình kiểm tra sức khỏe cập nhật, chỉ áp dụng
   cho bản ghi ở trạng thái **Hiệu lực**, và **không** kéo bản ghi quay lại soát xét/phê duyệt
   (mục 5.3.1 và 6.2).
7. **Đến hạn rà soát là cờ, không phải trạng thái**: tính khi đọc theo `last_reviewed_at +
   review_cycle`. Quá hạn ⇒ cảnh báo CSH; quá **02 chu kỳ** ⇒ cảnh báo LĐV. Hệ thống **không** tự
   chuyển bản ghi sang Hết hiệu lực (mục 5.1.5).
8. **Đổi kết nối phải ghi vết**: mọi thay đổi `api_base_url`, `adapter_type` hoặc `IntegrationPoint`
   của nền tảng **đang có Agent/Tool hoạt động** (M29) bắt buộc ghi `AIAuditLog` — không ghi vết
   thì không cho lưu (mục 5.4.2).
9. **Thay đổi lớn không sửa đè**: đổi `environment`, nâng `criticality` lên Cao, nâng
   `data_classification` lên Hạn chế/Mật, đổi nhà cung cấp ⇒ lập **phiên bản mới**
   (`version + 1`, `supersedes_ref` trỏ bản cũ), lập/soát xét lại `PreOpAssessment` và trình
   **LĐV**; ảnh hưởng liên phòng thì áp dụng thêm M30 (mục 5.4).
10. **Xác nhận giá trị sử dụng**: nền tảng tham gia xử lý dữ liệu kiểm định/hiệu chuẩn/thử nghiệm
    phải có `validation_ref` trong `PreOpAssessment` theo ISO/IEC 17025 §7.11 trước khi lên
    PRODUCTION (mục 5.2.2).
11. **Không bí mật trong registry**: mọi trường của `AIPlatform` và `IntegrationPoint` bị cấm chứa
    mật khẩu, khóa API, chứng thư số. Chỉ ghi `secret_location_ref` trỏ nơi lưu theo M28. Phát hiện
    vi phạm ⇒ thu hồi bí mật ngay + lập KPH ở M13 (mục 1.3 và 7).
12. **Tách vai trò**: `created_by ≠ approved_by`; `reviewed_by` là ĐMKT/TP khác người lập; **mọi**
    bản ghi nền tảng do **LĐV** phê duyệt. AI không lập/soát xét/phê duyệt (mục 4 và 5.1.7).
13. **Sự cố ATTT không đóng một mình**: `PlatformIncident` có `security_flag = true` **không được**
    đóng trước khi M28 kết luận (mục 5.3.2).
14. **Điều kiện đóng phiếu sự cố**: đủ `root_cause` + `actions[]` + `recovered_at` (đã trở lại
    HEALTHY) + kết luận có/không lập bài học kinh nghiệm ở M26 (mục 5.3.3).
15. **Sự cố lặp lại sinh KPH**: cùng một `platform_id` có ≥ **03** phiếu sự cố trong **90 ngày** ⇒
    bắt buộc `capa_ref` (M13) mới đóng được phiếu thứ ba (mục 5.3.2).
16. **Không ngừng vận hành khi còn phụ thuộc**: chặn chuyển sang **Hết hiệu lực** khi còn Agent,
    Tool, Prompt (M29) hoặc dịch vụ số (M38) đang hoạt động trỏ tới nền tảng; hệ thống trả về
    **danh sách** đối tượng còn phụ thuộc thay vì lỗi chung chung (mục 5.5.3).
17. **Dữ liệu đi trước, cắt truy cập đi sau**: `data_disposition[]` phải hoàn tất theo M27/M34 và
    có biên bản kèm theo **trước khi** thực hiện `access_revocations[]` (mục 5.5.3).
18. **Nền tảng chưa đăng ký là không phù hợp**: khi phát hiện, QLCL lập bản ghi Nháp và xác định
    CSH; cần thiết ⇒ đăng ký trong **30 ngày**; không cần thiết ⇒ ngừng dùng ngay và xử lý dữ liệu
    theo M27/M34; đã đưa dữ liệu Hạn chế/Mật lên ⇒ lập KPH ở M13 và xử lý sự cố ở M28 (mục 5.6).
19. **Registry là khóa lọc của M29**: đăng ký `AIAgent`/`AITool`/`AIRequest` trỏ tới `platform_id`
    không tồn tại, chưa phê duyệt, Hết hiệu lực hoặc đã Hủy là **lỗi ràng buộc** — validate ở tầng
    application khi ghi (mục 5.7).
20. **Dịch vụ số bám nền tảng Hiệu lực**: M38 không được công bố dịch vụ nếu nền tảng vận hành dịch
    vụ đó chưa ở trạng thái **Hiệu lực** (mục 5.7).

## 6. Trạng thái `AIPlatform`

| STT | Trạng thái | Ý nghĩa | Người thao tác | Điều kiện chuyển | Bắt buộc lý do |
|---|---|---|---|---|---|
| 1 | Nháp | Đang soạn | CSH, ĐMKT, QLCL | Đủ trường bắt buộc (+ F35.02 với PRODUCTION) → Chờ soát xét | Không |
| 2 | Chờ soát xét | Chờ kiểm tra kỹ thuật và trùng lặp | ĐMKT/TP (≠ người lập) | Đạt → Chờ phê duyệt; Không đạt → Không soát xét | — |
| 3 | Không soát xét | Bị trả lại | Người lập | Sửa → Chờ soát xét | **Có** |
| 4 | Chờ phê duyệt | Chờ LĐV | QLCL trình | Đạt → Đã phê duyệt (**chặn** nếu vi phạm quy tắc 5); Không đạt → Không phê duyệt | — |
| 5 | Không phê duyệt | Bị trả lại | LĐV | Sửa → Chờ soát xét | **Có** |
| 6 | Đã phê duyệt | Được chấp thuận, **chưa** chạy | LĐV | Bật kiểm tra sức khỏe + kết nối adapter → Hiệu lực | — |
| 7 | Hiệu lực | Đang vận hành, được M29/M38 tham chiếu | QTHT/ĐMKT | Phiên bản mới được duyệt → Hết hiệu lực (tự động); hoặc F35.04 → Hết hiệu lực | — |
| 8 | Hết hiệu lực | Đã ngừng vận hành hoặc bị thay thế | LĐV (qua F35.04) | (kết thúc — vẫn tra cứu được làm bằng chứng) | **Có** |
| 9 | Hủy | Bỏ bản ghi trước khi phê duyệt | LĐV | (kết thúc) | **Có** |

**Không phải trạng thái hồ sơ**: `health` (mục 4.2 của StateMachine), cờ **Đến hạn rà soát**
(quy tắc 7), cờ **Ngoại lệ quá hạn khắc phục** (quy tắc 5).

Trạng thái thực thể phụ: `PreOpAssessment` (Nháp → Chờ soát xét → Chờ phê duyệt → Đã phê duyệt /
Không phê duyệt) · `PlatformIncident` (Mới → Đang xử lý → Chờ xác nhận → Đã đóng / Hủy) ·
`DecommissionRecord` (Nháp → Chờ phê duyệt → Đã phê duyệt → Đã thực hiện / Hủy) ·
`PlatformException` (Đang hiệu lực → Đã khắc phục / Quá hạn) · `IntegrationPoint` (Hoạt động → Tạm
dừng / Đã cắt). Mọi nhánh Hủy/Không phê duyệt bắt buộc lý do.

## 7. Đầu ra

| Đầu ra | Định dạng | Ghi chú |
|---|---|---|
| F35.01 — Danh mục nền tảng số | PDF/Excel | 6 phần: danh mục · điểm tích hợp · ngoại lệ · đến hạn rà soát · hết hiệu lực trong kỳ · nền tảng chưa đăng ký |
| F35.02 — Phiếu đánh giá trước vận hành | PDF | 9 mục đánh giá + bảng 7 điều kiện chặn cứng + kết luận |
| F35.03 — Phiếu sự cố và nhật ký giám sát | PDF | Phần A sự cố · phần B nhật ký giám sát · phần C nhật ký thay đổi |
| F35.04 — Phiếu ngừng vận hành | PDF | Phụ thuộc · xử lý dữ liệu · thu hồi truy cập · kết luận |
| Báo cáo tình hình nền tảng số phục vụ M17 | Dữ liệu/PDF | 06 tháng/lần và trước mỗi kỳ xem xét lãnh đạo (mục 5.8) |
| Bảng nền tảng đến hạn rà soát | Màn hình | Tính khi đọc theo `review_cycle` (quy tắc 7) |
| Bảng **ngoại lệ quá hạn khắc phục** | Màn hình/PDF | Đầu vào cảnh báo LĐV và M01 |
| Bảng phụ thuộc nền tảng | Màn hình | Agent/Tool/Prompt (M29) + dịch vụ số (M38) theo `platform_id` — dùng khi ngừng vận hành |
| Thống kê thời gian ngừng hoạt động | Màn hình/Dữ liệu | Theo `HealthCheckResult` + `PlatformIncident`, lọc theo `criticality` |

**Bốn biểu mẫu F35.01–F35.04 đã ban hành** (lần 01, ngày 24/08/2026) tại
`06_SHARED_RESOURCES/01_Forms/ETV.P.F35.0{1..4}_*.md` — bản xuất của module phải khớp bố cục và
danh mục chuẩn của biểu mẫu gốc. Đánh giá nhà cung cấp dùng lại biểu mẫu của **M06**, hồ sơ AIA
dùng lại biểu mẫu của **M29** — không tạo biểu mẫu mới.

## 8. Liên kết

Quy trình: **MP35** (`ETV.P35`, ban hành lần 01 ngày 24/08/2026) · Năng lực: **CAP-29_AIOffice**
(dùng chung với MP29/M29 và MP38/M38) · Tiêu chuẩn: ISO 9001 §7.1.3/§8.4/§8.5.1, ISO/IEC 17025
§6.6/§7.11, ISO 17034 §6.6/§7.4, ISO/IEC 27001 §8.1/A.5.9/A.5.19–A.5.23/A.5.30/A.8.9/A.8.16/A.8.31,
ISO/IEC 42001 §6.1/§8.1/§8.4 · Lưu hồ sơ: **ETV.P15** · Nhóm menu: `CONG_NGHE` (manifest MP35).

**Đầu vào từ**: M06 (hồ sơ nhà cung cấp) · M01 (rủi ro) · M31 (phương án liên tục) · M29 (hồ sơ
AIA) · M33 (hạ tầng) · M28 (nơi lưu bí mật xác thực, thang phân loại) · M32 (sáng kiến chuyển đổi
số sinh nhu cầu nền tảng mới) · M30 (thẩm định thay đổi liên phòng).

**Đầu ra sang**: M29 (`platform_id` làm khóa lọc Agent/Tool/Prompt/Trace/Usage) · M38 (nền tảng vận
hành dịch vụ số) · M01 (rủi ro nền tảng trọng yếu, ngoại lệ quá hạn) · M13 (KPH khi sự cố lặp lại
hoặc lộ bí mật) · M26 (bài học kinh nghiệm sau sự cố) · M17 (báo cáo tình hình nền tảng) ·
M27/M34 (yêu cầu xử lý dữ liệu khi ngừng vận hành).

**Không thuộc M35**: Agent/Tool/Prompt/AIA (M29) · dịch vụ số (M38) · hạ tầng CNTT và tài khoản
người dùng (M33) · biện pháp và sự cố ATTT (M28) · vòng đời dữ liệu, sao lưu (M27/M34) · hợp đồng
dữ liệu và ánh xạ trường (M37) · đánh giá nhà cung cấp (M06) · xử lý rủi ro (M01) · kế hoạch liên
tục (M31) · thẩm định thay đổi liên phòng (M30).

## 9. Trạng thái triển khai

**Đã có một phần** trong `09_ENGINEERING/aios-platform`:

| Hạng mục | Hiện trạng |
|---|---|
| Model `AIPlatform` (Prisma) | **Đã có** — `code`, `name`, `baseUrl`, `apiBaseUrl`, `environment`, `health` (enum `AIHealth`), `lastError`, `lastHealthCheckAt`, `owner`, `adapterType`, `approvalStatus` (enum `AIApprovalStatus`), `approvedBy`; quan hệ 1—N tới `AITool`, `AIAgent` |
| Trường mở rộng mục 2.1 | **Chưa có** — `category`, `source_type`, `vendor*`, `technical_contact`, `criticality`, `data_classification`, `risk_refs`, `continuity_ref`, `aia_ref`, `has_ai_component`, `infra_ref`, `doc_refs`, `health_check_enabled`, `review_cycle`, `last_reviewed_at`, `version`, `supersedes_ref` |
| 7 thực thể mục 2.2–2.8 | **Chưa có** |
| API mục `02_API/API.md` | **Chưa có** route `/api/ai/platforms` trong `src/app/api/` |
| Màn hình quản trị M35 | **Chưa có** trong `src/app/(platform)/modules/` |
| `08_Source/` | Trống |

**Ánh xạ tên**: đặc tả dùng `snake_case`, schema Prisma dùng `camelCase` (`api_base_url` ↔
`apiBaseUrl`, `adapter_type` ↔ `adapterType`, `last_health_check_at` ↔ `lastHealthCheckAt`).
Trường `health` của schema chính là **tình trạng vận hành**; `approvalStatus` là **vòng đời hồ sơ**
— hai trục tách biệt, đúng quy tắc 6.

**Khoảng cách cần đóng khi BUILD**: enum `AIApprovalStatus` hiện có 7 giá trị (`DRAFT`,
`PENDING_REVIEW`, `RETURNED`, `PENDING_APPROVAL`, `REJECTED`, `APPROVED`, `ARCHIVED`) trong khi
thủ tục quy định **09** trạng thái, tách riêng **Đã phê duyệt** và **Hiệu lực** (mục 6). Cần bổ
sung giá trị cho trạng thái *Hiệu lực* thay vì gộp vào `APPROVED` — nếu gộp thì không phân biệt
được nền tảng đã được duyệt nhưng **chưa** bật kiểm tra sức khỏe, tức không thực thi được điều kiện
chặn cứng (c). Ánh xạ đề xuất: `RETURNED` dùng cho *Không soát xét*, `REJECTED` cho *Không phê
duyệt*, `ARCHIVED` cho *Hết hiệu lực*, thêm `ACTIVE` cho *Hiệu lực*, thêm `CANCELLED` cho *Hủy*.

> Đặc tả làm việc chi tiết hơn (RECON/OUTCOME/SPEC/PLAN) của sáng kiến AIOS Control Plane nằm ở
> module chủ M29_AI:
> [`M29_AI/01_Requirement/_work/20260822-aios-control-plane/`](../../M29_AI/01_Requirement/_work/20260822-aios-control-plane/) —
> không lặp lại toàn văn ở đây, đúng bất biến "một nguồn sự thật".

## 10. Quyết định đã chốt và câu hỏi còn mở

**Đã chốt và đưa vào `ETV.P35` (ban hành 24/08/2026):**

| # | Nội dung | Quyết định | Điều khoản thủ tục |
|---|---|---|---|
| 1 | Phạm vi module | Mọi nền tảng số của Viện (tự xây, thuê ngoài, đối tác), không chỉ nền tảng có AI | 1.2 |
| 2 | Thẩm quyền phê duyệt | **LĐV** phê duyệt mọi bản ghi nền tảng, ngoại lệ và ngừng vận hành | 4.1, 6.1 |
| 3 | Điều kiện chặn cứng | 07 điều kiện; ngoại lệ ≤ 90 ngày do LĐV duyệt kèm rủi ro M01 | 5.2.3 |
| 4 | Tách hai trục trạng thái | Vòng đời hồ sơ ≠ tình trạng vận hành; health không kéo bản ghi về soát xét | 5.3.1, 6.2 |
| 5 | Mã nền tảng | Duy nhất, không sửa sau phê duyệt, không cấp lại | 5.1.8 |
| 6 | Bí mật xác thực | Cấm tuyệt đối trong bản ghi; chỉ trỏ nơi lưu theo M28 | 1.3, 7 |
| 7 | Ngừng vận hành | Chặn khi còn phụ thuộc M29/M38; xử lý dữ liệu trước khi cắt truy cập | 5.5.3 |
| 8 | Bộ biểu mẫu | F35.01 Danh mục · F35.02 Đánh giá trước vận hành · F35.03 Sự cố và giám sát · F35.04 Ngừng vận hành | 8 |
| 9 | Thời hạn lưu hồ sơ | F35.01 vĩnh viễn · F35.02 vòng đời + 05 năm · F35.03 05 năm · F35.04 10 năm · health check 02 năm | 9 |

**Còn mở — cần chốt trước hoặc trong quá trình BUILD:**

1. **Enum trạng thái**: bổ sung `ACTIVE` và `CANCELLED` vào `AIApprovalStatus` (ảnh hưởng M29 vì
   dùng chung enum), hay tạo enum riêng cho `AIPlatform`? Xem mục 9.
2. **Phạm vi đăng ký kỳ đầu**: đăng ký toàn bộ nền tảng đang dùng, hay bắt đầu từ PRODUCTION và
   nền tảng xử lý dữ liệu Hạn chế/Mật rồi mở rộng dần?
3. **Tần suất kiểm tra sức khỏe**: thủ tục quy định ngưỡng cảnh báo (24 giờ, 07 ngày) nhưng chưa
   chốt chu kỳ chạy cụ thể theo `criticality` — cần chốt khi cấu hình tiến trình.
4. **Phát hiện nền tảng chưa đăng ký** (quy tắc 18): lấy tín hiệu từ đâu — nhật ký proxy/DNS của
   M33, hay rà soát thủ công định kỳ? Ảnh hưởng tới việc quy tắc này chạy được tự động hay không.
