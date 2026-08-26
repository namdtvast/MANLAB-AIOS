# M28_ATTT — Đặc tả yêu cầu

> **Nguồn**: Thủ tục **`ETV.P28` — Quản lý an toàn thông tin** đã **ban hành lần 02 ngày 26/08/2026**
> (`03_MANAGEMENT_SYSTEM/02_P/ETV.P28_QuanLyAnToanThongTin.md`) cùng bộ biểu mẫu
> **`ETV.P.F28.01–F28.04`** trong `06_SHARED_RESOURCES/01_Forms/`. Tiêu chuẩn áp dụng: ISO/IEC
> 27001:2022 §4, §5.2, §6.1.2, §6.1.3, §6.2, §7.2–7.5, §8.1–8.3, §9.1–9.3, §10 và Phụ lục A;
> ISO 9001 §6.1/§7.5; ISO/IEC 17025 §4.1, §4.2, §7.11; ISO 17034 §7.4; ISO/IEC 42001 §6.1/§8.1.
>
> **Thủ tục là nguồn sự thật**: nếu đặc tả lệch thủ tục thì sửa đặc tả, không sửa ngược lại. Mọi số
> hiệu mục dạng "P28 §x.y" dưới đây trỏ tới điều khoản của thủ tục **lần ban hành 02** (khung I–IX,
> nội dung nghiệp vụ nằm ở mục VI); lần ban hành 01 đánh số khác, không dùng để đối chiếu.

## 1. Mục tiêu module

Số hóa MP28 — vận hành **Hệ thống quản lý an toàn thông tin (ISMS)** của Viện trên ManLab, để bốn
dòng nghiệp vụ của ISMS chạy được, truy vết được và không rơi rụng: **đánh giá – xử lý rủi ro ATTT**,
**Tuyên bố áp dụng (SoA)**, **quản lý sự cố ATTT**, **quản lý quyền truy cập**.

M28 là **hệ thống quản lý**, không phải công cụ kỹ thuật: module **không** thay thế phần mềm bảo mật,
**không** tự quét lỗ hổng, **không** tự thu thập nhật ký hệ thống. Module giữ **hồ sơ quyết định và
bằng chứng** — ai đánh giá rủi ro nào, kiểm soát nào được áp dụng vì lý do gì, sự cố được xử lý ra
sao, quyền truy cập do ai phê duyệt.

**Ranh giới**

| Module | M28 làm gì với nó | M28 **không** làm |
|---|---|---|
| **M02_BaoMat** (cùng CAP-28) | Kế thừa thang phân loại thông tin; nhận sự việc lộ lọt thông tin khách hàng để điều tra kỹ thuật | Không quản lý cam kết bảo mật, khách tham quan, công bố thông tin khách hàng (P02 §6.2, 6.4, 6.6) |
| **M27_TaiSanTT** | Trỏ tới tài sản thông tin bằng `asset_ref`; dùng kết quả kiểm tra phục hồi làm bằng chứng SoA | Không kiểm kê tài sản, không quản lý sao lưu/phục hồi/vòng đời dữ liệu |
| **M01_RuiRo** | Đẩy rủi ro ATTT mức Cao/Rất cao lên hồ sơ rủi ro chung; nhận phương pháp luận rủi ro | Không định nghĩa lại phương pháp rủi ro toàn hệ thống |
| **M31_LienTuc** | Đẩy rủi ro có tác động sẵn sàng ≥ 4 sang làm đầu vào BCP; nhận kết quả diễn tập làm bằng chứng | Không lập kế hoạch liên tục hoạt động, không tổ chức diễn tập |
| **M29_AI** | Ghi rủi ro đặc thù hệ thống AI; chặn dữ liệu Hạn chế/Mật lọt chỉ mục AI | Không vận hành mô hình, không lập hồ sơ AIA |
| **M13_KhacPhuc** | Mở KPH từ sự cố và từ kiểm soát "Áp dụng" quá hạn không bằng chứng | Không phân tích nguyên nhân gốc, không ra hành động khắc phục |
| **M26_TriThuc** | Đẩy bài học kinh nghiệm sau sự cố mức Cao trở lên | Không quản lý danh mục tri thức |
| **M03_NhanSu** | Chặn hoàn tất thôi việc khi chưa thu hồi quyền; trỏ hồ sơ đào tạo nhận thức | Không quản lý năng lực, không lập hồ sơ đào tạo |
| **M06_MuaSam** | Trỏ hồ sơ đánh giá nhà cung cấp dịch vụ CNTT | Không đánh giá, không lựa chọn nhà cung cấp |
| **M30 / M33** | Nhận yêu cầu đánh giá ảnh hưởng ATTT trước khi đổi hệ thống | Không quản lý thay đổi, không vận hành hệ thống thông tin |
| **M10 / M11** | Kích hoạt khi sự cố ảnh hưởng hiệu lực kết quả đo/chứng chỉ đã phát hành | **Không** tự kết luận về hiệu lực kết quả — thẩm quyền của M10/M11 |
| **M14 / M15 / M16 / M17** | Trỏ tài liệu kiểm soát; lưu hồ sơ; cấp đầu vào đánh giá nội bộ và xem xét lãnh đạo | Không kiểm soát tài liệu, hồ sơ, không tổ chức đánh giá |

## 2. Đối tượng dữ liệu chính

Bốn thực thể nghiệp vụ + hai thực thể phụ trợ + nhật ký. Trục chính là `SecurityRisk` (rủi ro ATTT):
mọi kiểm soát trong SoA phải truy được về một rủi ro (P28 §2.2 nguyên tắc 1), sự cố xảy ra thì cập
nhật ngược lại rủi ro, quyền truy cập là kiểm soát vận hành sinh bằng chứng cho SoA.

| Đối tượng | Mô tả | Biểu mẫu áp dụng (ban hành 24/08/2026) |
|---|---|---|
| `SecurityRisk` | Rủi ro an toàn thông tin đã đánh giá | F28.01 mục 1 |
| `RiskTreatment` | Hạng mục Kế hoạch xử lý rủi ro (RTP) | F28.01 mục 2 |
| `SoAVersion` + `SoAControl` | Tuyên bố áp dụng (có phiên bản) và 93 dòng kiểm soát | F28.02 |
| `SecurityIncident` | Sự cố an toàn thông tin | F28.03 |
| `AccessRequest` | Yêu cầu cấp/thay đổi/thu hồi quyền truy cập | F28.04 mục 1–5 |
| `AccessReview` | Đợt rà soát quyền truy cập định kỳ | F28.04 mục 6 |
| `AuditLog` | Nhật ký thao tác, append-only | — |

### 2.1. `SecurityRisk` — Rủi ro an toàn thông tin

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `code` | string, duy nhất | tự sinh | vd `RR-ATTT-2026-001` |
| `title` | string | có | Tên rủi ro, đủ nghĩa khi đứng một mình |
| `asset_refs[]` | ref → M27 | có, ≥ 1 | Tài sản thông tin liên quan — **quy tắc R1** |
| `confidentiality` | enum | có | Mức phân loại thông tin bị ảnh hưởng; kế thừa thang M02/M27 — quy tắc R11 |
| `threat` | text | có | Mối đe dọa |
| `vulnerability` | text | có | Điểm yếu bị khai thác |
| `impact_c` / `impact_i` / `impact_a` | int 1–5 | có | Hệ quả theo ba chiều bí mật · toàn vẹn · sẵn sàng |
| `existing_controls` | text | không | Kiểm soát đang có tại thời điểm đánh giá |
| `likelihood` | int 1–5 | có | K — khả năng xảy ra trong 12 tháng |
| `impact` | int 1–5 | tự tính | T = `max(impact_c, impact_i, impact_a)` — quy tắc R2 |
| `risk_score` | int 1–25 | tự tính | R = K × T; mức: Thấp 1–6 · Trung bình 7–12 · Cao 13–19 · Rất cao 20–25 |
| `risk_owner` | ref User (TP hoặc LĐV) | có | **Không** được là QTHT — quy tắc R3 |
| `treatment_option` | enum: Giảm thiểu / Tránh / Chia sẻ / Chấp nhận | có | P28 §6.5.1 |
| `treatments[]` | ref `RiskTreatment` | có **khi** `risk_score ≥ 7` | Quy tắc R4 |
| `soa_control_refs[]` | ref `SoAControl` | có **khi** `treatment_option = Giảm thiểu` | Kiểm soát được viện tới để giảm rủi ro |
| `residual_likelihood` / `residual_impact` | int 1–5 | có, khi đóng | Sau xử lý |
| `residual_score` | int 1–25 | tự tính | R tồn dư |
| `residual_accepted_by` / `residual_accepted_at` | ref User (**LĐV**) / datetime | có **khi** `residual_score ≥ 7` | Quy tắc R5 — không ủy quyền |
| `residual_accept_reason` | text | có cùng điều kiện trên | |
| `m01_risk_ref` | ref → M01 | có **khi** mức Cao/Rất cao | Đẩy lên hồ sơ rủi ro chung |
| `bcp_input` | bool | tự tính | `true` khi `impact_a ≥ 4` → đầu vào M31 (quy tắc R12) |
| `review_due_at` | date | tự tính | `last_assessed_at` + 12 tháng (quy tắc R13) |
| `status` | enum | tự quản lý | Mục 6.1 |
| `created_by` / `reviewed_by` / `approved_by` | ref User | tự ghi / có khi soát xét / có khi phê duyệt | `created_by ≠ approved_by` |

### 2.2. `RiskTreatment` — Hạng mục Kế hoạch xử lý rủi ro

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `risk_ref` | ref `SecurityRisk` | có | |
| `measure` | text | có | Biện pháp xử lý cụ thể |
| `soa_control_ref` | ref `SoAControl` | có | Mã kiểm soát tương ứng trong SoA |
| `responsible` | ref User | có | |
| `resources` | text | không | Nguồn lực cần thiết |
| `due_at` | date | có | ≤ 12 tháng (Trung bình) · ≤ 06 tháng (Cao) · ≤ 03 tháng (Rất cao) — quy tắc R4 |
| `interim_measure` | text | có **khi** rủi ro mức Rất cao | Biện pháp khống chế tạm thời áp dụng ngay |
| `verification_method` | text | có | Cách xác nhận hiệu lực |
| `completed_at` | date | tự ghi | |
| `verified_by` / `verified_at` | ref User (PT.ATTT) / datetime | có, khi hoàn thành | Quy tắc R6 — chưa xác nhận hiệu lực thì **không** được ghi hoàn thành |
| `status` | enum: Mở / Đang thực hiện / Hoàn thành / Quá hạn | tự quản lý | Quá hạn tính khi đọc từ `due_at` |

### 2.3. `SoAVersion` và `SoAControl` — Tuyên bố áp dụng

`SoAVersion` là bản SoA có hiệu lực tại một thời điểm; mỗi lần sửa tạo phiên bản mới, **không sửa
đè** (P28 §6.6).

| Trường (`SoAVersion`) | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `version` | int | tự sinh | Bắt đầu từ 1 |
| `scope_organization` / `scope_location` / `scope_information` / `scope_systems` / `scope_interfaces` | text | có | Sáu chiều phạm vi ISMS — P28 §6.1 |
| `scope_exclusions` | text | có **khi** có loại trừ | Bắt buộc nêu lý do |
| `effective_date` | date | có, khi phê duyệt | |
| `supersedes_ref` | ref `SoAVersion` | tự gán | |
| `approved_by` / `approved_at` | ref User (**LĐV**) / datetime | có, khi phê duyệt | Quy tắc R8 |
| `review_due_at` | date | tự tính | `effective_date` + 12 tháng (quy tắc R13) |
| `status` | enum | tự quản lý | Mục 6.2 |

| Trường (`SoAControl`) | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `soa_version_ref` | ref `SoAVersion` | có | |
| `control_code` | string | có | Mã theo Phụ lục A ISO/IEC 27001:2022 — **93 dòng**: A.5.1–A.5.37 · A.6.1–A.6.8 · A.7.1–A.7.14 · A.8.1–A.8.34 |
| `applicable` | bool | có | Áp dụng / Loại trừ |
| `justification` | text | có **khi** `applicable = true` | Mã rủi ro · pháp luật · hợp đồng · yêu cầu tiêu chuẩn |
| `exclusion_reason` | text | có **khi** `applicable = false` | Quy tắc R7 — không chấp nhận lý do chung chung |
| `implementation` | text | có **khi** `applicable = true` | Thủ tục/quy định/biện pháp nội bộ đang thực thi kiểm soát |
| `responsible` | ref User | có **khi** `applicable = true` | |
| `implementation_status` | enum: Chưa thực hiện / Đang thực hiện / Đã thực hiện | có | |
| `evidence_refs[]` | ref → M15 / link | có **khi** `implementation_status = Đã thực hiện` | Quy tắc R9 |
| `evidence_due_at` | date | không | Hạn cam kết có bằng chứng; quá hạn mà rỗng ⇒ tự mở KPH sang M13 |

**Không lưu tên kiểm soát**: module chỉ giữ `control_code` và cách ETV thực thi. Tên và diễn giải
từng kiểm soát tra bản ISO/IEC 27001:2022 và 27002:2022 lưu tại kho tri thức (M26) — tránh chép nội
dung tiêu chuẩn có bản quyền vào cơ sở dữ liệu (P28 §6.6).

### 2.4. `SecurityIncident` — Sự cố an toàn thông tin

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `code` | string, duy nhất | tự sinh | vd `SC-ATTT-2026-001` |
| `reporter` | ref User | có | Ai cũng báo được, kể cả nhân viên không có quyền quản trị |
| `occurred_at` / `detected_at` / `reported_at` | datetime | có (`occurred_at` có thể ước lượng) | Ba mốc để đo thời gian phát hiện và báo cáo |
| `symptom` | text | có | Hiện tượng quan sát được |
| `asset_refs[]` | ref → M27 | có | Hệ thống/tài sản liên quan |
| `confidentiality` | enum | có | Mức phân loại thông tin bị ảnh hưởng |
| `involves_customer_data` / `involves_personal_data` | enum: Có / Không / Chưa xác định | có | Quyết định nghĩa vụ thông báo |
| `severity` | enum: Thấp / Trung bình / Cao / Rất cao | có | P28 §6.8.1 — quyết định thời hạn báo cáo và thẩm quyền đóng |
| `contained_at` | datetime | có, khi khống chế xong | |
| `containment_actions` | text | có | Biện pháp khống chế đã thực hiện |
| `evidence_preserved` | text | có | Bằng chứng đã thu thập và nơi lưu — quy tắc R10 |
| `direct_cause` | text | có, khi điều tra xong | |
| `scope_of_impact` | text | có | Hệ thống, dữ liệu, số chủ thể bị ảnh hưởng |
| `affects_result_validity` | bool | có | `true` ⇒ bắt buộc `m10_ref`/`m11_ref` — quy tắc R14 |
| `m10_ref` / `m11_ref` | ref → M10 / M11 | có cùng điều kiện trên | M28 **không** tự kết luận hiệu lực kết quả |
| `notifications[]` | bản ghi con | có **khi** phát sinh nghĩa vụ | Đối tượng · căn cứ · người quyết định (LĐV) · ngày gửi · bằng chứng gửi/nhận |
| `recovery_at` | datetime | có, khi khắc phục xong | |
| `risk_refs[]` | ref `SecurityRisk` | có | Rủi ro đã cập nhật hoặc mở mới sau sự cố |
| `capa_ref` | ref → M13 | có **khi** có sự không phù hợp | |
| `lesson_ref` | ref → M26 | có **khi** `severity ∈ {Cao, Rất cao}` | Quy tắc R15 — chặn đóng nếu thiếu |
| `closed_by` / `closed_at` | ref User / datetime | có, khi đóng | LĐV (Cao, Rất cao) · PT.ATTT (Thấp, Trung bình) |
| `status` | enum | tự quản lý | Mục 6.3 |

### 2.5. `AccessRequest` — Yêu cầu quyền truy cập

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `code` | string, duy nhất | tự sinh | |
| `subject` | ref User \| thông tin bên thứ ba | có | Người được cấp quyền |
| `subject_type` | enum: Nhân sự chính thức / Thử việc / Chuyên gia–nhà thầu / Nhà cung cấp CNTT | có | |
| `nda_ref` | ref → M02 | có **khi** `subject_type ≠ Nhân sự chính thức` | Cam kết bảo mật đã ký (F02.01/.02/.04) |
| `awareness_training_ref` | ref → M03 | có | Đào tạo nhận thức ATTT — chưa có thì **chặn cấp quyền** (quy tắc R16) |
| `request_type` | enum: Cấp mới / Thay đổi / Thu hồi một phần / Thu hồi toàn bộ | có | |
| `reason` | text | có | |
| `items[]` | bản ghi con | có, ≥ 1 | Hệ thống · vai trò/mức quyền · `is_privileged` · mức phân loại truy cập · `valid_until` |
| `mfa_required` | bool | tự tính | `true` khi có `is_privileged`, truy cập từ xa, thư điện tử công vụ hoặc mức Hạn chế/Mật |
| `requested_by` | ref User (TP) | có | |
| `approved_by` | ref User (PT.ATTT hoặc **LĐV**) | có | LĐV bắt buộc khi có `is_privileged`, mức Hạn chế/Mật hoặc bên thứ ba — quy tắc R17 |
| `executed_by` / `executed_at` | ref User (QTHT) / datetime | có, khi thực hiện | Quy tắc R18 — ba vai trò phải khác nhau |
| `system_log_ref` | string | có, khi thực hiện | Mã nhật ký hệ thống của thao tác |
| `revoked_at` | datetime | có **khi** thu hồi | ≤ cuối ngày làm việc cuối cùng — quy tắc R19 |
| `assets_returned` | bool | có **khi** thu hồi toàn bộ | Thiết bị, thẻ ra vào, USB token chữ ký số |
| `status` | enum | tự quản lý | Mục 6.4 |

### 2.6. `AccessReview` — Rà soát quyền truy cập định kỳ

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `period` | string | có | Kỳ rà soát |
| `scope` | enum: Phòng / Tài khoản đặc quyền | có | Phòng: TP rà soát ≥ 06 tháng/lần · Đặc quyền: LĐV ≥ 02 lần/năm |
| `department_ref` | ref | có **khi** `scope = Phòng` | |
| `accounts_reviewed` / `excess_found` / `revoked` | int | có | Số liệu kết quả |
| `revocation_refs[]` | ref `AccessRequest` | có **khi** `revoked > 0` | Quyền thừa phải được thu hồi bằng phiếu, không thu hồi ngầm |
| `reviewer` / `reviewed_at` | ref User / date | có | |

### 2.7. `AuditLog`

Append-only, ghi mọi thao tác tạo/sửa/đổi trạng thái trên sáu thực thể trên: ai, khi nào, trường nào,
giá trị trước → sau, lý do (khi bắt buộc). Ghi thêm **lượt truy cập** đối với `SecurityIncident` và
`SecurityRisk` có `confidentiality ∈ {Hạn chế, Mật}`. Nhật ký của module **không** thay thế nhật ký
hệ thống do QTHT quản lý (P28 §6.7.5) — hai loại tồn tại song song, module chỉ trỏ tới bằng
`system_log_ref`.

## 3. Vai trò

| Vai trò | Trách nhiệm chính trong module |
|---|---|
| **LĐV** | Phê duyệt rủi ro và RTP · **phê duyệt SoA** · **chấp nhận rủi ro tồn dư R ≥ 7** · phê duyệt quyền đặc quyền/bên thứ ba · quyết định thông báo ra bên ngoài · đóng sự cố mức Cao, Rất cao |
| **PT.ATTT** | Chủ trì hồ sơ rủi ro và SoA · điều phối sự cố, phân mức, xác định nghĩa vụ thông báo · **xác nhận hiệu lực** biện pháp xử lý · phê duyệt quyền thông thường · đóng sự cố mức Thấp, Trung bình · tổng hợp chỉ số ISMS |
| **QLCL** | Soát xét hồ sơ rủi ro và SoA · chuyển KPH sang M13, bài học sang M26 · đưa ISMS vào đánh giá nội bộ (M16) · lưu hồ sơ theo ETV.P15 |
| **QTHT** | **Thực hiện** thao tác cấp/thu hồi quyền sau khi có phê duyệt · ghi `system_log_ref` · báo sự cố · thực hiện biện pháp kỹ thuật | 
| **TP** | `risk_owner` của rủi ro trong lĩnh vực · đề nghị cấp/thu hồi quyền cho nhân sự phòng · rà soát quyền định kỳ |
| **Nhân viên** | Báo cáo sự kiện/sự cố; xác nhận cam kết khi nhận quyền |

Nguyên tắc tách vai trò (P28 §5.3): `requested_by ≠ approved_by ≠ executed_by`; QTHT **không** phê
duyệt quyền của chính mình; người liên quan trực tiếp tới sự cố **không** đóng sự cố đó;
`created_by ≠ approved_by` trên hồ sơ rủi ro. AI **không** đánh giá rủi ro chính thức, **không** phê
duyệt SoA, **không** đóng sự cố, **không** thay đổi quyền truy cập.

## 4. Danh mục chuẩn

### 4.1. Thang chấm rủi ro — P28 §6.4.2

| Yếu tố | Thang | Diễn giải |
|---|---|---|
| K — khả năng | 1 Hiếm khi · 2 Ít khả năng · 3 Có thể · 4 Nhiều khả năng · 5 Gần như chắc chắn | Trong 12 tháng |
| T — tác động | 1 Không đáng kể · 2 Nhẹ · 3 Trung bình · 4 Nặng · 5 Nghiêm trọng | `max(C, I, A)`; xét thiệt hại khách hàng, hiệu lực kết quả đo, gián đoạn dịch vụ, nghĩa vụ pháp lý, uy tín |
| R = K × T | Thấp 1–6 · Trung bình 7–12 · Cao 13–19 · Rất cao 20–25 | Quyết định hạn xử lý và thẩm quyền |

Thang này **khác** ma trận của M01 ở chỗ tác động lấy theo ba chiều C-I-A. Rủi ro mức Cao/Rất cao
được đẩy sang M01 để hợp nhất vào hồ sơ rủi ro chung, **không** đánh giá lại từ đầu.

### 4.2. Ngưỡng chấp nhận và hạn xử lý — P28 §6.4.3

| Mức | Yêu cầu | Hạn hoàn thành |
|---|---|---|
| Thấp (1–6) | Chấp nhận, theo dõi theo chu kỳ | — |
| Trung bình (7–12) | Phải có RTP | ≤ 12 tháng |
| Cao (13–19) | Phải xử lý, báo cáo LĐV | ≤ 06 tháng |
| Rất cao (20–25) | Khống chế tạm thời **ngay**, LĐV trực tiếp theo dõi | ≤ 03 tháng |

### 4.3. Phân mức sự cố — P28 §6.8.1

| Mức | Tiêu chí (thỏa mãn ít nhất một) | Thời hạn báo cáo | Thẩm quyền đóng |
|---|---|---|---|
| Thấp | Sự kiện đơn lẻ, không lộ lọt, không gián đoạn | ≤ 24 giờ | PT.ATTT |
| Trung bình | Gián đoạn nội bộ ngắn; nghi ngờ truy cập trái phép chưa xác nhận | ≤ 08 giờ | PT.ATTT |
| Cao | Lộ lọt/mất dữ liệu khách hàng hoặc dữ liệu cá nhân; mã độc lan rộng; mất toàn vẹn dữ liệu đo; gián đoạn kéo dài | Ngay lập tức | **LĐV** |
| Rất cao | Ảnh hưởng hiệu lực kết quả đo/chứng chỉ đã phát hành; mã hóa tống tiền; phải báo cơ quan có thẩm quyền | Ngay lập tức | **LĐV** |

### 4.4. Phân loại thông tin (`confidentiality`)

Dùng **nguyên** thang **Công khai · Nội bộ · Hạn chế · Mật** của M02/M27 — M28 **không** định nghĩa
thang riêng (P28 §6.3). Nếu M27 ban hành thang khác, M28 sửa theo M27.

### 4.5. Tập kiểm soát tham chiếu (`control_code`)

93 mã theo bốn chủ đề của Phụ lục A ISO/IEC 27001:2022: **A.5** Tổ chức (37) · **A.6** Con người (8)
· **A.7** Vật lý (14) · **A.8** Công nghệ (34). Module seed sẵn đủ 93 mã khi khởi tạo một
`SoAVersion` mới — chỉ mã, không kèm tên kiểm soát (mục 2.3).

## 5. Quy tắc nghiệp vụ

Nguồn: P28 Phụ lục I (Ma trận kiểm soát rủi ro và điều kiện chặn cứng). **Chặn cứng** = hệ thống từ chối thao tác; **cảnh báo mềm** =
cho phép nhưng ghi cờ và thông báo.

| # | Quy tắc | Loại |
|---|---|---|
| **R1** | Rủi ro không có `asset_refs` trỏ tới tài sản trong danh mục M27 ⇒ không cho lưu | Chặn cứng |
| **R2** | `impact` = `max(impact_c, impact_i, impact_a)`, `risk_score` = K × T — tính bởi hệ thống, người dùng **không** sửa tay | Chặn cứng |
| **R3** | `risk_owner` phải là TP hoặc LĐV; không được là QTHT | Chặn cứng |
| **R4** | `risk_score ≥ 7` ⇒ bắt buộc ≥ 1 `RiskTreatment` với `due_at` trong hạn theo mức; mức Rất cao bắt buộc thêm `interim_measure` | Chặn cứng |
| **R5** | Đóng rủi ro với `residual_score ≥ 7` mà chưa có `residual_accepted_by = LĐV` + lý do ⇒ chặn | Chặn cứng |
| **R6** | `RiskTreatment` chỉ chuyển **Hoàn thành** khi có `verified_by` + `verified_at` (PT.ATTT xác nhận hiệu lực) | Chặn cứng |
| **R7** | `SoAControl` có `applicable = false` mà `exclusion_reason` rỗng ⇒ không cho phê duyệt SoA | Chặn cứng |
| **R8** | SoA chỉ có hiệu lực khi `approved_by = LĐV`; sửa nội dung ⇒ tạo `SoAVersion` mới, **không sửa đè** bản đã phê duyệt | Chặn cứng |
| **R9** | `SoAControl` có `applicable = true`, quá `evidence_due_at` mà `evidence_refs` rỗng ⇒ tự mở KPH sang M13 | Cảnh báo mềm + tự mở KPH |
| **R10** | Không cho phép xóa `SecurityIncident`, `notifications`, `evidence_preserved` hoặc bản ghi `AuditLog` liên quan sự cố đang xử lý | Chặn cứng |
| **R11** | Dữ liệu mức **Hạn chế/Mật** không bao giờ được đưa vào chỉ mục AI (← M29) và không được đẩy lên dịch vụ ngoài phạm vi đã phê duyệt; phát hiện ⇒ mở sự cố + KPH | Chặn cứng |
| **R12** | `impact_a ≥ 4` ⇒ `bcp_input = true`, đẩy sang M31 làm đầu vào kế hoạch liên tục hoạt động | Tự động |
| **R13** | Rủi ro quá 12 tháng chưa rà soát, hoặc SoA quá 12 tháng chưa rà soát ⇒ gắn cờ **Đến hạn rà soát** (tính khi đọc), cảnh báo LĐV và đưa vào báo cáo M17 | Cảnh báo mềm |
| **R14** | `affects_result_validity = true` mà thiếu `m10_ref`/`m11_ref` ⇒ không cho đóng sự cố; module **không** tự kết luận hiệu lực kết quả | Chặn cứng |
| **R15** | Sự cố `severity ∈ {Cao, Rất cao}` đóng mà thiếu `lesson_ref` (M26) hoặc chưa hoàn tất nghĩa vụ thông báo phát sinh ⇒ chặn đóng | Chặn cứng |
| **R16** | Cấp quyền cho người chưa có `awareness_training_ref`, hoặc bên thứ ba chưa có `nda_ref` ⇒ chặn | Chặn cứng |
| **R17** | `items[].is_privileged = true`, hoặc mức truy cập Hạn chế/Mật, hoặc `subject_type = Nhà cung cấp CNTT` ⇒ `approved_by` bắt buộc là **LĐV** | Chặn cứng |
| **R18** | `requested_by ≠ approved_by ≠ executed_by`; QTHT không phê duyệt quyền của chính mình | Chặn cứng |
| **R19** | Thu hồi toàn bộ quyền phải hoàn tất trong ngày làm việc cuối cùng; chưa hoàn tất ⇒ chặn hoàn tất thôi việc ở M03 và cảnh báo LĐV | Chặn cứng (liên module) |
| **R20** | Người liên quan trực tiếp tới sự cố (`reporter`, người gây ra được ghi nhận trong `direct_cause`) không được là `closed_by` | Chặn cứng |
| **R21** | Mọi thao tác ghi `AuditLog` append-only; hồ sơ lưu theo **ETV.P15**; nhật ký **không** dùng để đánh giá năng suất cá nhân | Chặn cứng |

## 6. Trạng thái

### 6.1. `SecurityRisk`

| STT | Trạng thái | Ý nghĩa | Người thao tác | Điều kiện chuyển | Bắt buộc lý do |
|---|---|---|---|---|---|
| 1 | Nháp | Đang nhận diện, mô tả | PT.ATTT, TP, QTHT | Đủ trường bắt buộc (R1, R3) → Chờ soát xét | Không |
| 2 | Chờ soát xét | Chờ kiểm tra cách chấm điểm | Người lập | Đạt → Chờ phê duyệt; Không đạt → Không soát xét | — |
| 3 | Không soát xét | Bị trả lại | PT.ATTT/QLCL (≠ người lập) | Sửa → Chờ soát xét | **Có** |
| 4 | Chờ phê duyệt | Chờ LĐV duyệt mức rủi ro và phương án | PT.ATTT | Đạt → Đang xử lý (R ≥ 7) hoặc Chấp nhận rủi ro tồn dư (R < 7) | — |
| 5 | Không phê duyệt | Bị trả lại | LĐV | Sửa → Chờ soát xét | **Có** |
| 6 | Đang xử lý | RTP đã duyệt, đang thực hiện | `risk_owner` | Mọi `RiskTreatment` Hoàn thành (R6) → Đã xử lý | — |
| 7 | Đã xử lý | Biện pháp xong và đã xác nhận hiệu lực | PT.ATTT | → Chấp nhận rủi ro tồn dư | — |
| 8 | Chấp nhận rủi ro tồn dư | Đóng với mức tồn dư còn lại | **LĐV** khi `residual_score ≥ 7` (R5) | (kết thúc — vẫn rà soát theo R13) | **Có** |
| 9 | Hết hiệu lực | Rủi ro không còn (tài sản/hoạt động đã chấm dứt) | LĐV theo đề nghị PT.ATTT | (kết thúc) | **Có** |

### 6.2. `SoAVersion`

Nháp → Chờ soát xét → Chờ phê duyệt → **Đã phê duyệt** → Hết hiệu lực (khi phiên bản mới được phê
duyệt). Thẩm quyền phê duyệt: **LĐV**. Bản Đã phê duyệt là **chỉ đọc**; phiên bản cũ giữ làm bằng
chứng (R8).

### 6.3. `SecurityIncident`

Mới → Đang khống chế → Đang điều tra → Đang khắc phục → Chờ kết luận → **Đã đóng** / **Hủy** (cảnh
báo giả, bắt buộc lý do). Thẩm quyền đóng theo `severity` (mục 4.3). Điều kiện đóng: đã khôi phục
**và** hoàn tất nghĩa vụ thông báo **và** có `lesson_ref` khi mức Cao trở lên (R15), **và** có
`m10_ref`/`m11_ref` khi ảnh hưởng hiệu lực kết quả (R14).

### 6.4. `AccessRequest`

Đề nghị → Chờ phê duyệt → Đã phê duyệt → **Đã thực hiện** / **Từ chối** (bắt buộc lý do) → **Đã thu
hồi** (với quyền có `valid_until` hoặc khi chấm dứt công việc). Quyền hết `valid_until` mà chưa thu
hồi ⇒ cảnh báo PT.ATTT.

## 7. Đầu ra

| Đầu ra | Định dạng | Ghi chú |
|---|---|---|
| F28.01 — Hồ sơ đánh giá và xử lý rủi ro ATTT | PDF/Excel | Bảng rủi ro + RTP + bảng chấp nhận rủi ro tồn dư |
| F28.02 — Tuyên bố áp dụng (SoA) | PDF/Excel | Phạm vi ISMS + 93 dòng kiểm soát + bảng tổng hợp |
| F28.03 — Phiếu sự cố an toàn thông tin | PDF | Ghi nhận, phân mức, khống chế, thông báo, kết luận, đóng |
| F28.04 — Phiếu yêu cầu quyền truy cập | PDF | Kèm phần thu hồi và bảng rà soát định kỳ |
| Báo cáo tình trạng ISMS phục vụ M17 | Dữ liệu/PDF | Sáu nhóm chỉ số mục 8 — đầu vào **bắt buộc** của M17 |
| Bảng rủi ro/SoA đến hạn rà soát | Màn hình | Tính khi đọc theo R13 |
| Bảng quyền truy cập quá hạn `valid_until` | Màn hình | Cảnh báo PT.ATTT |
| Bảng kiểm soát "Áp dụng" thiếu bằng chứng | Màn hình | Nguồn mở KPH theo R9 |

**Hỗ trợ AI (← M29, có kiểm soát):** gợi ý rủi ro tương tự đã có trong hồ sơ · nhắc kiểm soát SoA
chưa có bằng chứng · đề xuất phân mức sự cố dựa trên tiêu chí mục 4.3 (chỉ **gợi ý**). AI **không**
chấm điểm rủi ro chính thức, **không** phê duyệt SoA, **không** phân mức hay đóng sự cố, **không**
thay đổi quyền truy cập.

## 8. Chỉ số đo lường hiệu lực ISMS — P28 §6.11

| Nhóm | Chỉ số |
|---|---|
| Rủi ro | Số rủi ro mở theo mức · tỷ lệ hạng mục RTP hoàn thành đúng hạn · số rủi ro tồn dư ≥ 7 được LĐV chấp nhận |
| SoA | Tỷ lệ kiểm soát "Áp dụng" đã có bằng chứng · số kiểm soát loại trừ và tính đầy đủ của lý do |
| Truy cập | Tỷ lệ tài khoản thu hồi đúng hạn · kết quả rà soát định kỳ · tỷ lệ tài khoản đặc quyền dùng MFA |
| Sự cố | Số sự cố theo mức · thời gian trung bình phát hiện → khống chế · số sự cố lặp lại cùng nguyên nhân |
| Sao lưu | Số lần kiểm tra phục hồi và tỷ lệ thành công (dữ liệu lấy từ **M27**) |
| Nhận thức | Tỷ lệ nhân sự hoàn thành đào tạo nhận thức trong năm (dữ liệu lấy từ **M03**) |

Báo cáo tổng hợp tối thiểu 06 tháng/lần.

## 9. Liên kết

Quy trình: **MP28** (`ETV.P28`, ban hành lần 02 ngày 26/08/2026) · Năng lực: **CAP-28_ATTT** (dùng
chung với MP27, MP31, MP33, MP34, MP37) · Tiêu chuẩn: ISO/IEC 27001:2022 (§4–§10, Phụ lục A),
ISO/IEC 27002:2022 và ISO/IEC 27005 (tham khảo), ISO 9001 §6.1/§7.5, ISO/IEC 17025 §4.1/§4.2/§7.11,
ISO 17034 §7.4, ISO/IEC 42001 §6.1/§8.1 · Pháp luật: Luật 86/2015/QH13, Luật 24/2018/QH14,
Luật 20/2023/QH15, Nghị định 13/2023/NĐ-CP, Nghị định 85/2016/NĐ-CP · Lưu hồ sơ: **ETV.P15** ·
Nhóm menu: `CONG_NGHE` (manifest MP28).

**Đầu vào từ**: M27 (danh mục tài sản, kết quả kiểm tra phục hồi) · M02 (thang phân loại, sự việc lộ
lọt thông tin khách hàng) · M03 (biến động nhân sự, hồ sơ đào tạo nhận thức) · M06 (đánh giá nhà cung
cấp CNTT) · M30/M33 (thay đổi hệ thống cần đánh giá ảnh hưởng ATTT) · M04 (kiểm soát ra vào khu vực)
· M29 (rủi ro hệ thống AI) · M16 (phát hiện đánh giá nội bộ).

**Đầu ra sang**: M01 (rủi ro ATTT mức Cao/Rất cao) · M31 (rủi ro tác động sẵn sàng ≥ 4) · M13 (KPH từ
sự cố và từ kiểm soát thiếu bằng chứng) · M26 (bài học kinh nghiệm sau sự cố) · M03 (chặn hoàn tất
thôi việc khi chưa thu hồi quyền) · M10/M11 (khi sự cố ảnh hưởng hiệu lực kết quả) · M17 (báo cáo
tình trạng ISMS) · M24 (chỉ tiêu ATTT hằng năm).

**Không thuộc M28**: cam kết bảo mật và quan hệ với khách hàng (M02) · kiểm kê tài sản, sao lưu, vòng
đời dữ liệu (M27) · kế hoạch liên tục hoạt động và diễn tập (M31) · hồ sơ AIA (M29) · phân tích
nguyên nhân gốc (M13) · nội dung tài liệu (M14) · hồ sơ (M15) · kết luận về hiệu lực kết quả đo
(M10/M11).

## 10. Trạng thái triển khai

**Chưa xây** — `08_Source/` trống, chưa có trong `09_ENGINEERING/aios-platform`
(`PlatformModule.status = COMING_SOON`).

Thứ tự tăng trưởng đề xuất khi BUILD: (1) `SecurityRisk` + `RiskTreatment` — trục chính, dùng được
ngay cho đánh giá rủi ro định kỳ; (2) `SoAVersion` + `SoAControl` seed 93 mã, nối `soa_control_refs`
từ rủi ro; (3) `SecurityIncident` với các gate liên module R14, R15; (4) `AccessRequest` +
`AccessReview`; (5) dashboard chỉ số mục 8 và bản xuất bốn biểu mẫu.

## 11. Quyết định đã chốt và câu hỏi còn mở

**Đã chốt và đưa vào `ETV.P28` (lần ban hành 02, ngày 26/08/2026):**

| # | Nội dung | Quyết định | Điều khoản thủ tục |
|---|---|---|---|
| 1 | Phạm vi thủ tục | ISMS đầy đủ theo ISO/IEC 27001, có mục "Ngoài phạm vi" phân định với P02/P27/P31/P29 và 9 thủ tục khác | 2.3 |
| 2 | Thang chấm rủi ro | R = K × T, T = max(C, I, A), thang 1–25, bốn ngưỡng | 6.4.2, 6.4.3 |
| 3 | Chấp nhận rủi ro tồn dư | R ≥ 7 chỉ **LĐV** chấp nhận bằng văn bản, không ủy quyền | 5.2, 6.4.3 |
| 4 | SoA | Bắt buộc, liệt kê đủ 93 kiểm soát, lý do loại trừ bắt buộc, LĐV phê duyệt, rà soát ≥ 1 lần/năm | 6.6 |
| 5 | Không chép nội dung tiêu chuẩn | Chỉ lưu mã kiểm soát và cách ETV thực thi | 6.6 |
| 6 | Sự cố | 4 mức, 6 bước; hồ sơ gốc là F28.03, P02 dẫn chiếu tới; điều kiện đóng gồm bài học M26 | 2.3, 6.8 |
| 7 | Quyền truy cập | Tách ba vai trò đề nghị/phê duyệt/thực hiện; thu hồi trong ngày làm việc; MFA bắt buộc cho 4 nhóm | 6.7.1 |
| 8 | Bộ biểu mẫu | F28.01 rủi ro+RTP · F28.02 SoA · F28.03 sự cố · F28.04 quyền truy cập; tái sử dụng F02.x, F01.01, F03.05.x, F06.x, F26.02 | VII |
| 9 | Thời hạn lưu hồ sơ | Rủi ro và SoA vĩnh viễn · sự cố 10 năm · phiếu quyền 05 năm sau thu hồi · nhật ký ≥ 12 tháng | VIII |

**Còn mở — cần chốt trước hoặc trong quá trình BUILD:**

1. **Ai giữ vai trò PT.ATTT?** Thủ tục cho phép QLCL kiêm nhiệm nếu bảo đảm tách vai trò (P28 §5.2).
   Nếu kiêm nhiệm, cần rà lại các gate R5/R17: LĐV phải là người phê duyệt cuối để không dồn quyền.
2. **Phạm vi ISMS kỳ đầu**: toàn Viện ngay từ đầu, hay bắt đầu từ nền tảng ManLab + thư điện tử +
   kho dữ liệu dùng chung rồi mở rộng sang phần mềm thiết bị đo?
3. **Nguồn dữ liệu tài sản (M27)**: R1 chặn cứng theo danh mục tài sản của M27, nhưng **ETV.P27 chưa
   ban hành** và M27 chưa xây. Trong giai đoạn quá độ, cho nhập tài sản dạng văn bản tự do rồi
   chuẩn hóa sau, hay hoãn R1 xuống cảnh báo mềm cho tới khi M27 sẵn sàng?
4. **Nhật ký hệ thống**: module chỉ lưu `system_log_ref`. Có tích hợp đọc nhật ký thật từ nền tảng
   (ManLab, thư điện tử) để phục vụ rà soát hằng quý (P28 §6.7.5), hay giữ nguyên thao tác thủ công
   do QTHT trích xuất?
5. **Chu kỳ seed SoA**: khi tạo `SoAVersion` mới, sao chép nguyên trạng thái 93 dòng của phiên bản
   trước (nhanh, dễ bỏ sót rà soát) hay bắt buộc rà từng dòng lại (chậm, chắc)?
