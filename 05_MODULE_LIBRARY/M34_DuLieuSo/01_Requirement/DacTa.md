# M34_DuLieuSo — Đặc tả yêu cầu

> **Nguồn**: Thủ tục **`ETV.P34` — Quản lý dữ liệu số** đã có **dự thảo lần ban hành 01, trạng thái
> `Chờ soát xét`** (`03_MANAGEMENT_SYSTEM/02_P/ETV.P34_QuanLyDuLieuSo.md`, 25/08/2026), kèm **ba
> biểu mẫu `ETV.P.F 34.01–34.03`** trong `06_SHARED_RESOURCES/01_Forms/` (cùng trạng thái). Căn cứ
> khác: Sổ tay chất lượng **§10.3** và **§7.11**; **`ETV.P35`** (đã ban hành) **mục 2.3** — xác lập
> ranh giới *"dữ liệu số chạy trên nền tảng: chất lượng, vòng đời, kiểm soát truy xuất — ETV.P34"*;
> **`ETV.P28`** (đã ban hành) — phê duyệt quyền truy cập, bảo vệ và nhật ký; `ETV.P15` — hồ sơ.
>
> **Thứ tự nguồn sự thật khi có mâu thuẫn**: `ETV.P28`/`ETV.P35`/`ETV.P26` (**đã ban hành**) →
> `ETV.P34` (**dự thảo, chờ soát xét**) → đặc tả này. Quy tắc nào dẫn từ thủ tục thì M34 **áp dụng
> nguyên**, không diễn giải lại; nhãn `[P34 §x.y]` chỉ rõ điều khoản nguồn. Chính `ETV.P34` bản
> 25/08/2026 đã tự hiệu đính mục 6.8 để khớp `ETV.P28` mục 6.13 và `ETV.P26` mục 5.5 đang hiệu lực
> — đặc tả này theo bản đã hiệu đính.
>
> ⚠ **Giới hạn còn lại**: `ETV.P34` **chưa được phê duyệt**; các **giá trị định lượng** trong đó
> (kỳ đo 03/06/12 tháng, hạn khắc phục 15 ngày làm việc, chu kỳ rà soát 12/06 tháng, thời hạn lưu
> 05/10 năm) là **đề xuất chờ Viện xác nhận**. BUILD chỉ nên bắt đầu sau khi thủ tục chuyển trạng
> thái **Đã phê duyệt** theo MP14 — xem mục 10.

## 1. Mục tiêu module

Số hóa MP34 — **kiểm kê tập dữ liệu, xác định chủ sở hữu, kiểm soát chất lượng, kiểm soát khai
thác – chia sẻ và quản lý vòng đời** đối với **dữ liệu số** của Viện, để không có dữ liệu vô chủ,
chất lượng dữ liệu **đo được** thay vì khẳng định chung chung, dữ liệu gốc không bị sửa đè, và một
con số trên báo cáo, chứng chỉ **truy được về dữ liệu gốc** (QM §10.3; ISO/IEC 17025 §7.11, §7.5;
ISO 9001 §7.5; ISO 17034 §7.4).

M34 là **lớp quản trị nội dung dữ liệu**: nó trả lời *"dữ liệu đó có đúng không, ai được dùng, dùng
thế nào, sống bao lâu"* — trong khi M27 trả lời *"Viện có những tài sản dữ liệu nào, sao lưu và hủy
ra sao"*, M28 trả lời *"bảo vệ bằng biện pháp gì"*, M33 trả lời *"nằm trên thiết bị nào"* và M35
trả lời *"chạy trên nền tảng nào"* (`ETV.P34` §2.3). Một tập dữ liệu khách hàng kích hoạt cả bốn
thủ tục cùng lúc, nhưng mỗi module giữ đúng vai của mình.

M34 **không chứa dữ liệu nghiệp vụ**: bản ghi danh mục chỉ **mô tả** tập dữ liệu (metadata), nghiêm
cấm chứa nội dung dữ liệu thật (`ETV.P34` §6.1.1). Dữ liệu thật sống trong module nghiệp vụ tương
ứng (M10, M05, M04…) và trên nền tảng do M35/M33 quản lý — M34 chỉ giữ **hồ sơ quản trị** về chúng.

**Ranh giới**

| Module | M34 làm gì với nó | M34 **không** làm |
|---|---|---|
| **M27_TaiSanTT** | Bản ghi tập dữ liệu trỏ tới tài sản thông tin tương ứng (`info_asset_ref`); tình huống hủy dữ liệu dùng biên bản hủy của M27 | Không kiểm kê tài sản thông tin, không sao lưu – phục hồi, không thực hiện hủy về mặt kỹ thuật (`ETV.P34` §6.7.2) |
| **M28_ATTT** (`ETV.P28` đã ban hành) | Dùng mức phân loại và nền quyền truy cập đã phê duyệt ở M28; chuyển vi phạm kênh chia sẻ sang M28 xử lý | Không phê duyệt quyền truy cập, không đánh giá rủi ro ATTT, không quy định biện pháp mã hóa |
| **M33_HeThongTT** | Trỏ hạ tầng nơi dữ liệu tồn tại (`infra_ref`) | Không quản lý máy chủ, thiết bị, tài khoản hệ thống |
| **M35_NenTangSo** (`ETV.P35` đã ban hành) | Trỏ nền tảng số vận hành tập dữ liệu (`platform_ref`) | Không đăng ký nền tảng, không đánh giá trước vận hành |
| **M37_TichHopDuLieu** | Chia sẻ **định kỳ, tự động** chuyển thành điểm tích hợp ở M37; sai lệch chất lượng phát sinh từ đồng bộ xử lý theo M37 | Không quản lý kết nối, ánh xạ trường, hợp đồng dữ liệu giữa hệ thống |
| **M36_ChungChiSo** | Cấp thông tin truy xuất nguồn gốc dữ liệu làm nền cho truy xuất chứng chỉ số | Không phát hành, không xác thực chứng chỉ số |
| **M10_DamBaoKQ / M11_BaoCaoKQ** | **Chặn** hiệu chỉnh dữ liệu đã dùng phát hành kết quả khi chưa có kết luận hiệu lực của M10/M11 | **Không** tự kết luận hiệu lực kết quả — thẩm quyền của M10/M11 |
| **M30_ThayDoi** | Thay đổi từ điển dữ liệu (cấu trúc) đi qua phiếu F30.02 của M30 | Không thẩm định, không phê duyệt thay đổi |
| **M29_QuanLyAI** | Hồ sơ phê duyệt dữ liệu dùng cho hệ thống AI trỏ tới hồ sơ AIA của M29 | Không đánh giá tác động AI, không quy định lại quy tắc dữ liệu cấp cho AI (`ETV.P29` mục 5.5 là quy tắc gốc) |
| **M15_HoSo** | Đăng ký hồ sơ phát sinh và thời hạn đề xuất vào danh mục của M15 | Không quy định lại cơ chế lưu trữ, phân quyền hồ sơ (`ETV.P34` mục VIII) |
| **M13_KhacPhuc** | Mở KPH khi chất lượng dưới ngưỡng 02 kỳ liên tiếp, sửa đè dữ liệu gốc, bảng tra song song gây sai lệch | Không phân tích nguyên nhân gốc |
| **M31_LienTuc** | — (dữ liệu khôi phục khi gián đoạn, RPO thuộc M31) | Không lập kế hoạch khôi phục dữ liệu |

## 2. Đối tượng dữ liệu chính

Trục chính là `DataSet` — một bản ghi mô tả cho mỗi tập dữ liệu (`ETV.P34` §6.1.1, biểu mẫu
F34.01). Bảy thực thể còn lại là các dòng quản trị quanh nó: **từ điển dữ liệu**, **dữ liệu chủ**,
**bảng tra song song**, **đo chất lượng**, **hiệu chỉnh**, **khai thác – chia sẻ**, **dữ liệu cho
AI** — cộng nhật ký.

| Đối tượng | Mô tả | Biểu mẫu (dự thảo, chờ soát xét) |
|---|---|---|
| `DataSet` | Bản ghi danh mục của một tập dữ liệu | `ETV.P.F 34.01` phần I |
| `DataDictionaryVersion` | Từ điển dữ liệu của tập, theo phiên bản | `ETV.P.F 34.01` phần II |
| `MasterDataSource` | Loại dữ liệu chủ được LĐV công nhận nguồn sự thật duy nhất | `ETV.P.F 34.01` phần III |
| `ParallelLookupFinding` | Bảng tra song song phát hiện trong kỳ | `ETV.P.F 34.01` phần III.1 |
| `QualityMeasurement` | Kỳ đo chất lượng sáu chiều của một tập | `ETV.P.F 34.02` phần A |
| `DataCorrection` | Đề nghị hiệu chỉnh dữ liệu đã ghi nhận | `ETV.P.F 34.02` phần B |
| `DataSharingRequest` | Phiếu yêu cầu khai thác, chia sẻ dữ liệu | `ETV.P.F 34.03` |
| `AIDataApproval` | Hồ sơ phê duyệt dùng một tập dữ liệu cho hệ thống AI | *(hồ sơ mục VIII, không có biểu mẫu riêng)* |

### 2.1. `DataSet` — Bản ghi danh mục tập dữ liệu

Tám nhóm trường bắt buộc theo `ETV.P34` §6.1.1 — thiếu nhóm Trách nhiệm thì **không được phê
duyệt**, và bản ghi **chỉ mô tả, không chứa** dữ liệu thật.

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `code` | string, duy nhất | tự sinh | vd `DS-2026-001`; không cấp lại sau khi hủy bản ghi |
| `name` | string | có | Tên gọi tập dữ liệu |
| `data_group` | enum 7 nhóm | có | Mục 4.1 — quyết định chỉ số bắt buộc và kỳ đo (mục 4.3) |
| `purpose` | text | có | Mục đích sử dụng |
| `owner_ref` | ref User (CSHDL) | **có** | Chủ sở hữu dữ liệu — lãnh đạo đơn vị, quy tắc R1 |
| `steward_ref` | ref User (QTDL) | **có** | Người quản trị dữ liệu nghiệp vụ — quy tắc R1 |
| `primary_enterer_ref` | ref User | không | Người nhập liệu chính hiện tại (khai báo) — căn cứ thực thi gate R16 *(bổ sung khi BUILD 26/08/2026: không thể kiểm "người nhập" từ module khác, nên khai trên bản ghi)* |
| `platform_ref` | ref → M35 | có | Nền tảng số nơi dữ liệu tồn tại |
| `infra_ref` | ref → M33 | có | Hạ tầng nơi dữ liệu tồn tại |
| `copies_note` | text | có | Có bản sao ở nơi nào khác không (`ETV.P34` §6.1.1 nhóm Nơi lưu) |
| `classification` | enum: Công khai / Nội bộ / Hạn chế / Mật | có | Thang phân loại dùng chung của M27 (theo `ETV.P02`, `ETV.P27`, `ETV.P28`) — quy tắc R2 |
| `has_personal_data` | bool | có | Quyết định chu kỳ rà soát **06 tháng** và nghĩa vụ pháp luật bảo vệ dữ liệu cá nhân — quy tắc R2, R8 |
| `personal_data_legal_ref` | text | có **khi** `has_personal_data = true` | Văn bản pháp luật đang hiệu lực được áp dụng (`ETV.P34` §3.2) |
| `quality_metrics[]` | {chiều, chỉ số, ngưỡng, kỳ đo} | có **khi** giai đoạn Hoạt động | Quy tắc R4; sàn ngưỡng theo mục 4.3 |
| `lifecycle_stage` | enum: Hoạt động / Lưu trữ / Đề nghị hủy | tự quản lý | Mục 4.5, quy tắc R21 |
| `active_retention` | string | có | Thời hạn giữ ở giai đoạn Hoạt động |
| `retention_basis` | text | **có** | Căn cứ thời hạn lưu: `ETV.P15`, `ETV.P.F 14.06` hoặc pháp luật chuyên ngành — quy tắc R5 |
| `read_scope` / `write_scope` | text | có | Ai được đọc, ai được sửa — nền quyền theo `ETV.P28`, quy tắc R17 |
| `external_sharing` | enum: Không / Có điều kiện | có | Điều kiện ghi kèm; chia sẻ thật đi qua `DataSharingRequest` |
| `info_asset_ref` | ref → M27 | có | Tài sản thông tin tương ứng (`ETV.P34` §6.1.1 nhóm Liên kết) |
| `integration_refs[]` | ref → M37 | không | Điểm tích hợp đang đồng bộ tập này |
| `master_refs[]` | ref `MasterDataSource` | không | Dữ liệu chủ được tập này tham chiếu |
| `record_ref` | ref → M15 | không | Hồ sơ tương ứng trong danh mục hồ sơ |
| `is_master_data` | bool | có | Tập này có là dữ liệu chủ không; `true` ⇒ bắt buộc có `MasterDataSource` được công nhận — quy tắc R9 |
| `dictionary_required` | bool | tự tính | `true` với dữ liệu đo – kỹ thuật, dữ liệu chủ, dữ liệu công bố — quy tắc R3 |
| `current_dictionary_ref` | ref `DataDictionaryVersion` | có **khi** `dictionary_required` | Phiên bản từ điển đang hiệu lực |
| `lineage_required` | bool | tự tính | `true` với dữ liệu đo – kỹ thuật và dữ liệu công bố — quy tắc R20 |
| `ai_usage` | enum: Không dùng / Đã phê duyệt | tự quản lý | `Đã phê duyệt` ⇒ bắt buộc `AIDataApproval` hiệu lực — quy tắc R22 |
| `review_cycle` | enum: 12 tháng / 06 tháng | tự tính | 06 tháng khi `has_personal_data = true` (`ETV.P34` §6.1.3 bước 5) |
| `last_reviewed_at` | date | tự ghi | Mốc tính cờ Đến hạn rà soát |
| `status` | enum 10 trạng thái | tự quản lý | Mục 6, theo `ETV.P34` Phụ lục II.1 |
| `created_by` / `reviewed_by` / `approved_by` | ref User | theo trạng thái | QTDL lập · QLCL/PT.ATTT soát xét · CSHDL phê duyệt (quy tắc R7) |

### 2.2. `DataDictionaryVersion` — Từ điển dữ liệu theo phiên bản

`ETV.P34` §6.1.2: bắt buộc với dữ liệu đo – kỹ thuật, dữ liệu chủ, dữ liệu công bố; là **căn cứ
kiểm tra hợp lệ** khi nhập liệu và tích hợp; **thay đổi từ điển là thay đổi cấu trúc dữ liệu** —
đi qua M30.

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `dataset_ref` | ref `DataSet` | có | |
| `version` / `effective_date` | string / date | có | Mỗi lần đổi cấu trúc tạo phiên bản mới, phiên bản cũ giữ nguyên |
| `fields[]` | danh sách trường | có, ≥ 1 | Mỗi trường: tên · ý nghĩa nghiệp vụ · kiểu · đơn vị đo · miền giá trị hợp lệ · bắt buộc · quy tắc kiểm tra · ví dụ (đúng 8 cột của F34.01 phần II) |
| `change_ref` | ref → M30 | có **từ phiên bản 02** | Phiếu thay đổi cấu trúc F30.02 — quy tắc R3 |
| `status` | enum: Nháp / Hiệu lực / Đã thay thế | tự quản lý | Chỉ một phiên bản Hiệu lực tại một thời điểm |

### 2.3. `MasterDataSource` — Dữ liệu chủ và nguồn sự thật duy nhất

`ETV.P34` §6.2.1: với mỗi loại dữ liệu chủ, **LĐV công nhận một nguồn duy nhất**; từ đó mọi hệ
thống lấy từ nguồn hoặc bản sao đồng bộ tự động (M37), thêm/sửa chỉ tại nguồn bởi người được phân
quyền.

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `master_group` | enum MD01–MD12 | có | Nhóm dữ liệu chủ tối thiểu theo `ETV.P34` §6.2.3 |
| `master_type` | string | có | Tên loại cụ thể trong nhóm; không được trùng nghĩa với loại đã có |
| `dataset_ref` | ref `DataSet` | có | Bản ghi danh mục của tập dữ liệu chủ |
| `source_system` | text | có | **Nguồn sự thật duy nhất** — hệ thống, bảng |
| `authorized_editors` | text / ref[] | có | Người được phân quyền thêm, sửa tại nguồn |
| `sync_targets[]` | ref → M37 | không | Hệ thống được đồng bộ từ nguồn |
| `recognized_by` / `recognized_at` | ref User (**LĐV**) / date | có | LĐV là A, không ủy quyền (`ETV.P34` §5.1) |
| `status` | enum: Đề nghị / Đã công nhận / Thu hồi công nhận | tự quản lý | Thu hồi bắt buộc lý do |

`MD01` triển khai theo mô hình **Party–Role**: một `Party` (Tổ chức/Cá nhân) có nhiều `PartyRole`; khách hàng, NCC, NTP, NSX và đối tác không tạo các nguồn định danh riêng. Tạo mới phải kiểm tra định danh chính xác và ứng viên tương đồng; merge cần người phê duyệt và `MasterMergeMap`, không tự merge chỉ theo tên (`ETV.P34` §6.2.4).

### 2.4. `ParallelLookupFinding` — Bảng tra song song phát hiện trong kỳ

`ETV.P34` §6.2.2: bảng tra, tệp riêng đang được dùng làm căn cứ nghiệp vụ khi đã có nguồn chính
thức là **sự không phù hợp** — ngừng dùng ngay, đối chiếu chênh lệch, cập nhật phần đúng còn thiếu
vào nguồn, mở KPH nếu đã gây sai lệch.

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `master_source_ref` | ref `MasterDataSource` | có | Nguồn chính thức bị "cạnh tranh" |
| `description` / `used_by` / `used_for` | text | có | Bảng tra là gì, ai đang dùng, làm căn cứ cho việc gì |
| `diff_note` | text | có | Chênh lệch so với nguồn chính thức |
| `caused_error` | bool | có | Đã gây sai lệch kết quả, hồ sơ chưa |
| `capa_ref` | ref → M13 | có **khi** `caused_error = true` | Số KPH |
| `stopped_at` / `resolved_at` | date | có / có khi đóng | Ngày ngừng sử dụng, ngày xử lý xong |
| `status` | enum: Mới / Đang xử lý / Đã xử lý | tự quản lý | |

### 2.5. `QualityMeasurement` — Kỳ đo chất lượng

`ETV.P34` §6.4: mỗi kỳ đo là một hồ sơ (F34.02 phần A) trên một tập dữ liệu, đo các chiều bắt buộc
theo nhóm (mục 4.3).

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `dataset_ref` / `period` | ref `DataSet` / string | có | vd `2026-Q3` |
| `rows[]` | theo chiều | có | Mỗi chiều: chỉ số áp dụng · cách đo, nguồn dữ liệu · ngưỡng chấp nhận · giá trị đo được · Đạt/Không |
| `measured_by` / `measured_at` | ref User (QTDL) / date | có | Người nhập dữ liệu **không** đo chính dữ liệu mình nhập — quy tắc R16 |
| `previous_ref` / `trend` | ref / enum: Cải thiện / Giữ nguyên / Xấu đi | không / có | So với kỳ trước (F34.02 phần A) |
| `overall` | enum: Đạt / Không đạt | tự tính | Không đạt khi ≥ 1 chiều dưới ngưỡng |
| `below_threshold_case` | enum 5 tình huống | có **khi** Không đạt | Theo bảng `ETV.P34` §6.4.4 — mục 4.6 |
| `remediation_plan` / `remediation_due` | text / date | có **khi** Không đạt | Kế hoạch khắc phục trong **15 ngày làm việc** |
| `capa_ref` | ref → M13 | có **khi** dưới ngưỡng 02 kỳ liên tiếp | Quy tắc R15 |
| `validity_ref` | ref → M10/M11 | có **khi** có khả năng ảnh hưởng kết quả đã phát hành | Kèm **dừng sử dụng dữ liệu** và báo cáo LĐV |
| `integration_ref` | ref → M37 | có **khi** sai lệch phát sinh từ tích hợp | Tạm ngừng điểm tích hợp nếu tiếp tục sinh dữ liệu sai |
| `status` | enum: Mới / Đang đo / Có kết quả / Đạt / Không đạt | tự quản lý | `ETV.P34` Phụ lục II.2; QTDL kết thúc nhánh Đạt, QLCL kết thúc nhánh Không đạt (quyết định mở KPH) |

### 2.6. `DataCorrection` — Hiệu chỉnh dữ liệu đã ghi nhận

`ETV.P34` §6.3: dữ liệu đo thô và hồ sơ kỹ thuật đã ghi nhận **không sửa trực tiếp, không ghi đè,
không xóa** — hiệu chỉnh bằng bản ghi mới giữ nguyên giá trị cũ (ISO/IEC 17025 §7.5).

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `dataset_ref` / `record_pointer` | ref `DataSet` / text | có | Bản ghi, trường dữ liệu cần hiệu chỉnh |
| `old_value` / `new_value` | text | **có** | Giữ nguyên giá trị cũ trong hồ sơ — quy tắc R11 |
| `reason` / `evidence_ref` | text / link | có | Lý do và bằng chứng đính kèm |
| `requested_by` / `requested_at` | ref User (NTH) / date | có | |
| `published_impact` | enum: Chưa dùng phát hành / **Đã dùng phát hành** | có | Bước xem xét ảnh hưởng (§6.3.2 bước 2) — QTDL, CSHDL |
| `validity_ref` | ref → M10/M11 | **có khi** `published_impact = Đã dùng phát hành` | Kết luận hiệu lực kết quả **trước khi** hiệu chỉnh có hiệu lực — chặn cứng, quy tắc R12 |
| `validity_conclusion` | enum: Còn hiệu lực / Phải thu hồi – phát hành lại | có **khi** có `validity_ref` | Theo F34.02 phần B.1 |
| `correction_record_id` | string | có, khi thực hiện | Mã bản ghi hiệu chỉnh mới do hệ thống nghiệp vụ tạo |
| `performed_by` / `performed_at` | ref User (QTDL) / datetime | có, khi thực hiện | |
| `capa_ref` | ref → M13 | có **khi** nguyên nhân hệ thống hoặc lặp lại | §6.3.2 bước 5 |
| `approved_by` | ref User | có | CSHDL; **LĐV** khi ảnh hưởng kết quả đã phát hành (Phụ lục II.2) |
| `status` | enum: Mới / Đang xem xét ảnh hưởng / Chờ kết luận P10-P11 / Đã hiệu chỉnh / Từ chối | tự quản lý | Từ chối bắt buộc lý do |

### 2.7. `DataSharingRequest` — Khai thác và chia sẻ dữ liệu

`ETV.P34` §6.5, biểu mẫu F34.03. Ba loại yêu cầu, ba đường phê duyệt khác nhau (mục 4.7).

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `request_type` | enum: Khai thác nội bộ vượt quyền / Chia sẻ ra ngoài Viện / Chia sẻ định kỳ – tự động | có | Loại 3 chuyển thiết lập **điểm tích hợp** ở M37, không lập phiếu từng lần (§6.5.2) |
| `dataset_ref` | ref `DataSet` | có | Kéo theo `classification`, `has_personal_data` hiển thị trên phiếu |
| `has_customer_data` | bool | có | Nghĩa vụ bảo mật theo `ETV.P02`, ISO/IEC 17025 §4.2 |
| `requester` / `recipient` | ref User / text | có | Bên nhận ghi rõ khi chia sẻ ra ngoài |
| `purpose` / `scope` | text | có | Phạm vi: liệt kê trường, khoảng thời gian, số lượng bản ghi |
| `channel` / `use_until` | text / date | có | Hình thức, kênh chuyển; thời hạn sử dụng của bên nhận |
| `legal_basis` | text | có **khi** ra ngoài Viện | Hợp đồng · yêu cầu cơ quan quản lý · đồng ý của chủ thể dữ liệu · nghĩa vụ pháp luật (§6.5.2 bước 2) |
| `minimization` | {chỉ trường cần thiết, ẩn danh/giả danh, giới hạn thời hạn, kênh có bảo vệ, cam kết bảo mật, điều khoản trả/xóa} | có **khi** ra ngoài Viện | PT.ATTT xác định (§6.5.2 bước 3) — thiếu khi khả thi ⇒ **không chấp nhận**, quy tắc R18 |
| `attt_opinion_by` / `attt_opinion_at` | ref User (PT.ATTT) / date | **có khi** ra ngoài Viện hoặc có dữ liệu cá nhân | Ý kiến bắt buộc (`ETV.P34` §5.2) |
| `approved_by` / `approved_at` | ref User / date | có | **CSHDL** với nội bộ; **LĐV** với ra ngoài Viện — quy tắc R18 |
| `executed_by` / `executed_at` | ref User (QTDL/QTHT) / datetime | có, khi thực hiện | **≠ người phê duyệt** (§5.3); đúng phạm vi và kênh đã duyệt, ghi nhật ký |
| `revoke_due` / `revoke_requested_at` | date | có / khi hết hạn | CSHDL theo dõi thời hạn, yêu cầu bên nhận xóa/trả (§6.5.2 bước 6) |
| `revoke_evidence_ref` | link | có, khi thu hồi | Bằng chứng bên nhận đã xóa, trả lại |
| `status` | enum: Nháp / Chờ ý kiến ATTT / Chờ phê duyệt / Đã phê duyệt / Đã thực hiện / Đã thu hồi / Từ chối | tự quản lý | `ETV.P34` Phụ lục II.2; Từ chối bắt buộc lý do |

### 2.8. `AIDataApproval` — Dữ liệu dùng cho hệ thống trí tuệ nhân tạo

`ETV.P34` §6.8: một tập dữ liệu chỉ được dùng làm dữ liệu ngữ cảnh, tập tri thức hoặc dữ liệu đánh
giá cho hệ thống AI khi đủ **bốn điều kiện** — bản ghi danh mục, phê duyệt LĐV có ý kiến PT.ATTT,
hồ sơ AIA theo `ETV.P29`, biện pháp giảm thiểu theo mức phân loại.

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `dataset_ref` | ref `DataSet` | có | **Chặn tạo hồ sơ** khi `classification ∈ {Hạn chế, Mật}` — quy tắc R22 |
| `ai_purpose` | enum: Dữ liệu ngữ cảnh / Tập tri thức / Dữ liệu đánh giá mô hình | có | |
| `ai_system_ref` / `aia_ref` | ref → M29 | có | Hệ thống AI và hồ sơ đánh giá tác động AI theo `ETV.P29` |
| `mitigation` | text | có | Loại bỏ/ẩn danh dữ liệu cá nhân, giới hạn phạm vi truy xuất |
| `attt_opinion_by` | ref User (PT.ATTT) | có | |
| `approved_by` / `approved_at` | ref User (**LĐV**) / date | có | LĐV là A, không ủy quyền (`ETV.P34` §5.1) |
| `status` | enum: Đề nghị / Đã phê duyệt / Thu hồi | tự quản lý | Thu hồi bắt buộc lý do; kỳ đo chất lượng của tập chạy **trước mỗi lần cập nhật tập dữ liệu** (mục 4.3) |

### 2.9. `AuditLog`

Append-only, ghi mọi thao tác tạo/sửa/đổi trạng thái trên 8 thực thể: ai, khi nào, trường nào, giá
trị trước → sau, lý do (khi bắt buộc). Nhật ký thao tác trên dữ liệu phải **không sửa được** và lưu
theo `ETV.P28` mục 6.7.5 (`ETV.P34` §6.6) — nhật ký module không thay thế nhật ký hệ thống, chỉ
trỏ tới bằng `log_ref`.

## 3. Vai trò

| Vai trò | Trách nhiệm chính (`ETV.P34` §5.2) |
|---|---|
| **QLCL** | Quản trị danh mục dữ liệu số; kiểm tra đầy đủ và **kiểm tra trùng lặp** trước khi trình phê duyệt; theo dõi kết quả đo và tập đến hạn rà soát; mở KPH khi chất lượng dưới ngưỡng kéo dài hoặc phát hiện sửa đè; tổng hợp báo cáo; lưu hồ sơ theo `ETV.P15` |
| **CSHDL** (chủ sở hữu dữ liệu) | Chịu trách nhiệm ý nghĩa nghiệp vụ và tính đúng đắn; xác định mức phân loại (phối hợp PT.ATTT); quyết định ai đọc ai sửa; **phê duyệt** bản ghi danh mục và khai thác nội bộ; đề xuất chuyển giai đoạn vòng đời; bảo đảm tập có chỉ số chất lượng |
| **QTDL** (người quản trị dữ liệu nghiệp vụ) | Lập và duy trì từ điển dữ liệu; tổ chức đo chất lượng theo kỳ; xử lý sai lệch; thực hiện trích xuất, ẩn danh theo yêu cầu đã duyệt; duy trì thông tin truy xuất nguồn gốc |
| **PT.ATTT** | Xác nhận mức phân loại và biện pháp bảo vệ (`ETV.P28`); **ý kiến bắt buộc** với chia sẻ ra ngoài và dữ liệu cá nhân; xác nhận phương pháp ẩn danh, giả danh, phương pháp hủy an toàn |
| **QTHT** | Thao tác kỹ thuật theo yêu cầu đã duyệt (trích xuất, di chuyển, hủy); **không** tự quyết định nội dung, phạm vi, việc chia sẻ |
| **TP** | Bảo đảm nhân sự nhập liệu đúng quy định, không tạo bảng tra song song, không lưu dữ liệu ngoài hệ thống được duyệt; xác nhận nhu cầu khai thác của đơn vị |
| **NTH** | Nhập trung thực, đầy đủ, đúng thời điểm; **không sửa đè dữ liệu gốc**; báo QTDL khi phát hiện sai, thiếu, trùng; chỉ khai thác trong phạm vi được phép |
| **LĐV** | Phê duyệt **dữ liệu chủ và nguồn sự thật duy nhất**, **chia sẻ ra ngoài Viện**, **hủy dữ liệu**, **dữ liệu dùng cho AI** — bốn thẩm quyền không ủy quyền (`ETV.P34` §5.1); quyết định xử lý khi dữ liệu sai ảnh hưởng kết quả đã phát hành; xem xét tình hình dữ liệu số theo `ETV.P17` |

Nguyên tắc tách vai trò (`ETV.P34` §5.3), M34 thực thi cả bốn:
1. Người đề nghị khai thác **≠** người phê duyệt; người thực hiện trích xuất **≠** người phê duyệt.
2. Người nhập dữ liệu **không** kết luận chất lượng của chính dữ liệu mình nhập.
3. Hủy dữ liệu cần **hai chữ ký**: phê duyệt LĐV + xác nhận phương pháp hủy của PT.ATTT.
4. Trợ lý AI chỉ *phát hiện – nhắc – gợi ý – soạn dự thảo*; không sửa, không duyệt, không kết luận,
   không hủy (quy tắc R22).

## 4. Danh mục chuẩn

### 4.1. Nhóm dữ liệu (`data_group`) — `ETV.P34` §2.1

Dữ liệu đo và dữ liệu kỹ thuật · Dữ liệu hồ sơ nghiệp vụ · **Dữ liệu chủ (dùng chung)** · Dữ liệu
quản trị · Dữ liệu hệ thống quản lý · Dữ liệu công bố · Dữ liệu dùng cho trí tuệ nhân tạo.

Đủ 7 nhóm, khớp bảng của `ETV.P34` §2.1 — M34 áp dụng nguyên, không định nghĩa lại. Nhóm quyết
định: chỉ số bắt buộc và kỳ đo (mục 4.3), bắt buộc từ điển (R3), bắt buộc lineage (R20).

### 4.2. Sáu chiều chất lượng — `ETV.P34` §6.4.1

**Chính xác** (giá trị phản ánh đúng thực tế) · **Đầy đủ** (không thiếu bản ghi, trường bắt buộc) ·
**Nhất quán** (không mâu thuẫn giữa các nơi) · **Kịp thời** (cập nhật đúng lúc cần dùng) · **Duy
nhất** (không bản ghi trùng) · **Hợp lệ** (nằm trong miền cho phép của từ điển dữ liệu).

### 4.3. Chỉ số bắt buộc và kỳ đo tối thiểu theo nhóm — `ETV.P34` §6.4.2, §6.4.3

| Nhóm dữ liệu | Chỉ số bắt buộc | Kỳ đo tối thiểu |
|---|---|---|
| Dữ liệu đo và dữ liệu kỹ thuật | **Cả sáu chiều** | **03 tháng/lần** |
| Dữ liệu chủ | Duy nhất, nhất quán, đầy đủ | 06 tháng/lần |
| Dữ liệu hồ sơ nghiệp vụ, dữ liệu công bố | Đầy đủ, kịp thời, hợp lệ | 06 tháng/lần |
| Dữ liệu quản trị, dữ liệu HTQL | Đầy đủ, kịp thời | 12 tháng/lần |
| Dữ liệu dùng cho trí tuệ nhân tạo | Theo `ETV.P34` §6.8 | **Trước mỗi lần cập nhật tập dữ liệu** |

**Sàn ngưỡng không hạ được** (§6.4.3): dữ liệu đo – kỹ thuật và dữ liệu công bố phải đạt **100%** ở
chiều **hợp lệ** và **đầy đủ** đối với trường bắt buộc. Ngưỡng các chiều khác do CSHDL đề xuất,
QLCL soát xét, ghi trong bản ghi tập dữ liệu.

### 4.4. Mức phân loại thông tin — thang dùng chung

**Công khai · Nội bộ · Hạn chế · Mật** — thang của `ETV.P02`/`ETV.P27`/`ETV.P28`, M34 import enum
`Classification` từ M27, không khai báo lại. Hai hệ quả riêng của M34: `has_personal_data = true`
⇒ chu kỳ rà soát 06 tháng (R8); `classification ∈ {Hạn chế, Mật}` ⇒ **không được đưa vào hệ thống
AI dưới mọi hình thức** (R22).

### 4.5. Ba giai đoạn vòng đời — `ETV.P34` §6.7.1

| Giai đoạn | Ý nghĩa | Yêu cầu |
|---|---|---|
| **Hoạt động** | Đang dùng cho công việc hằng ngày | Đầy đủ quyền truy cập; đo chất lượng theo kỳ |
| **Lưu trữ** | Hết nhu cầu dùng thường xuyên, còn trong thời hạn lưu | **Hạn chế quyền ghi**; giữ khả năng đọc và truy xuất; vẫn bảo vệ theo mức phân loại |
| **Đề nghị hủy** | Hết thời hạn lưu | Chỉ hủy sau khi kiểm tra ràng buộc §6.7.2 và có phê duyệt LĐV |

### 4.6. Xử lý khi dưới ngưỡng — `ETV.P34` §6.4.4

| Tình huống | Xử lý |
|---|---|
| Dưới ngưỡng một chiều, không ảnh hưởng kết quả đã phát hành | Kế hoạch khắc phục trong **15 ngày làm việc**; đo lại kỳ kế tiếp |
| Dưới ngưỡng **02 kỳ liên tiếp** | **Bắt buộc mở KPH** theo `ETV.P13` (← M13) |
| Có khả năng ảnh hưởng **kết quả, chứng chỉ đã phát hành** | **Dừng sử dụng dữ liệu**; chuyển ngay `ETV.P10`/`ETV.P11` (← M10/M11); báo cáo LĐV |
| Sai lệch phát sinh từ tích hợp, đồng bộ | Xử lý theo `ETV.P37` (← M37); tạm ngừng điểm tích hợp nếu tiếp tục sinh dữ liệu sai |
| Dữ liệu chủ có bản ghi trùng | Hợp nhất tại nguồn, **giữ lịch sử ánh xạ**; không xóa cứng bản ghi đã được tham chiếu |

### 4.7. Đường phê duyệt theo loại yêu cầu chia sẻ — `ETV.P34` §6.5, F34.03

| Loại yêu cầu | Ý kiến bắt buộc | Phê duyệt |
|---|---|---|
| Khai thác nội bộ vượt quyền hiện có | — | **CSHDL** |
| Chia sẻ ra ngoài Viện | **PT.ATTT** | **LĐV** |
| Chia sẻ định kỳ, tự động với bên nhận cố định | PT.ATTT (một lần) | Thiết lập **điểm tích hợp** theo `ETV.P37`, phê duyệt một lần, rà soát theo chu kỳ |

## 5. Quy tắc nghiệp vụ

**R1. Không có dữ liệu vô chủ** (`ETV.P34` Phụ lục I.1 điều kiện 1 và I.2 — **chặn cứng**) — mỗi
`DataSet` phải có `owner_ref` (CSHDL) **và** `steward_ref` (QTDL) là người cụ thể. Thiếu một trong
hai ⇒ **không cho lưu**, không chỉ chặn phê duyệt (§6.1.1 nhóm Trách nhiệm: "thiếu một trong hai
thì không được phê duyệt" — module chặn sớm hơn, ngay khi lưu).

**R2. Có mức phân loại và cờ dữ liệu cá nhân mới được đi tiếp** (`ETV.P34` Phụ lục I.1 điều kiện 2)
— `classification` và `has_personal_data` bắt buộc trên mọi bản ghi; PT.ATTT **xác nhận** mức phân
loại ở bước soát xét (§6.1.3 bước 2). Có dữ liệu cá nhân ⇒ ghi văn bản pháp luật đang hiệu lực được
áp dụng vào bản ghi (§3.2).

**R3. Từ điển dữ liệu bắt buộc cho ba nhóm** (`ETV.P34` Phụ lục I.1 điều kiện 3; §6.1.2) — dữ liệu
đo – kỹ thuật, dữ liệu chủ, dữ liệu công bố không có `DataDictionaryVersion` hiệu lực ⇒ chặn phê
duyệt. Từ điển là căn cứ kiểm tra hợp lệ khi nhập và khi tích hợp; **thay đổi từ điển là thay đổi
cấu trúc dữ liệu** — bắt buộc `change_ref` (phiếu F30.02 ← M30) từ phiên bản 02 trở đi.

**R4. Chất lượng phải đo được** (`ETV.P34` §2.2 Nguyên tắc 3; Phụ lục I.1 điều kiện 4) — tập ở giai
đoạn Hoạt động phải có `quality_metrics[]` (chỉ số, ngưỡng, kỳ đo). Khẳng định "dữ liệu chính xác"
mà không có phép đo **không được chấp nhận làm bằng chứng**.

**R5. Có căn cứ thời hạn lưu** (`ETV.P34` Phụ lục I.1 điều kiện 5) — `retention_basis` bắt buộc,
dẫn `ETV.P15`, `ETV.P.F 14.06` hoặc quy định pháp luật chuyên ngành; thời hạn lưu dữ liệu kỹ thuật
**không được ngắn hơn** thời hạn pháp luật yêu cầu (§3.2).

**R6. Bản ghi mô tả, không chứa dữ liệu** (`ETV.P34` §6.1.1; Phụ lục I.1 điều kiện 7) — nghiêm cấm
đưa nội dung dữ liệu thật (đặc biệt dữ liệu cá nhân, khách hàng) vào phần mô tả. Trường tự do bị
kiểm tra mẫu (định dạng CCCD, email hàng loạt, số điện thoại…) để cảnh báo trước khi lưu.

**R7. Kiểm tra trùng trước khi phê duyệt — trùng thì gộp** (`ETV.P34` §6.1.3 bước 3) — QLCL kiểm
tra trùng lặp với tập đã có; nếu trùng thì **gộp, không tạo bản ghi mới**. Trình tự phê duyệt: QTDL
khai báo (Nháp) → CSHDL + PT.ATTT xác nhận phân loại → QLCL kiểm trùng → **CSHDL phê duyệt** (QLCL
soát xét) → Hiệu lực.

**R8. Rà soát định kỳ theo chu kỳ phân biệt** (`ETV.P34` §6.1.3 bước 5; Phụ lục I.2) — mặc định
**01 năm/lần**; tập chứa dữ liệu cá nhân **06 tháng/lần**. Nội dung rà soát: còn cần thiết, còn
đúng mức phân loại, còn đúng thời hạn giữ. Tập chứa dữ liệu cá nhân quá 06 tháng chưa rà soát ⇒
cảnh báo CSHDL; **quá 02 chu kỳ ⇒ báo cáo LĐV**. Cờ Đến hạn rà soát tính khi đọc, không lưu cột.

**R9. Một nguồn sự thật cho mỗi loại dữ liệu chủ** (`ETV.P34` §2.2 Nguyên tắc 1; §6.2.1) — LĐV công
nhận một `MasterDataSource` duy nhất; từ đó mọi hệ thống, báo cáo, biểu mẫu lấy từ nguồn hoặc bản
sao đồng bộ tự động (← M37); thêm/sửa giá trị **chỉ tại nguồn**, bởi người trong
`authorized_editors`.

**R10. Bảng tra song song là sự không phù hợp** (`ETV.P34` §6.2.2) — phát hiện bảng tra, tệp riêng
đang làm căn cứ nghiệp vụ khi đã có nguồn chính thức ⇒ lập `ParallelLookupFinding`: **ngừng sử dụng
ngay**, đối chiếu chênh lệch, cập nhật phần dữ liệu đúng còn thiếu vào nguồn chính thức, mở KPH
(← M13) nếu đã gây sai lệch kết quả hoặc hồ sơ.

**R11. Dữ liệu gốc bất biến** (`ETV.P34` §2.2 Nguyên tắc 2; §6.3.1; Phụ lục I.2 — **cấm tuyệt
đối**) — dữ liệu đo thô và hồ sơ kỹ thuật đã ghi nhận **không sửa trực tiếp, không ghi đè, không
xóa**. Hiệu chỉnh bằng bản ghi mới, giữ nguyên giá trị cũ, kèm giá trị trước/sau, lý do, người, thời
điểm (ISO/IEC 17025 §7.5). Phát hiện sửa đè ⇒ **lập KPH theo `ETV.P13` và xử lý theo `ETV.P28`**.
M34 giữ hồ sơ `DataCorrection`; việc chặn ghi đè vật lý thuộc nền tảng nghiệp vụ (M10, M35) — M34
là nơi kiểm tra *có hồ sơ hiệu chỉnh hợp lệ* cho mọi thay đổi dữ liệu đã ghi nhận.

**R12. Hiệu chỉnh dữ liệu đã phát hành phải qua M10/M11 trước** (`ETV.P34` §6.3.2 bước 3; Phụ lục
I.2 — **chặn cứng**) — `published_impact = Đã dùng phát hành` ⇒ **chặn thao tác hiệu chỉnh** cho
tới khi có `validity_ref` kèm kết luận về hiệu lực kết quả (Còn hiệu lực / Phải thu hồi – phát hành
lại). Phiếu ở trạng thái **Chờ kết luận P10-P11** không có đường đi thẳng sang Đã hiệu chỉnh.

**R13. Kiểm tra hợp lệ ngay tại thời điểm nhập** (`ETV.P34` §6.3.3) — trường bắt buộc, kiểu, miền
giá trị, đơn vị đo, quan hệ tham chiếu tới dữ liệu chủ kiểm theo từ điển dữ liệu hiệu lực. Dữ liệu
nhập từ tệp hoặc từ thiết bị đo qua bước kiểm tra **tương đương** trước khi ghi nhận chính thức.
Đây là yêu cầu M34 đặt ra cho các module nghiệp vụ; M34 cung cấp từ điển làm căn cứ.

**R14. Kỳ đo tối thiểu theo nhóm, sàn 100% không hạ** (`ETV.P34` §6.4.2, §6.4.3; Phụ lục I.2) — kỳ
đo theo bảng mục 4.3; dữ liệu đo – kỹ thuật và dữ liệu công bố **không đạt 100%** ở chiều hợp lệ và
đầy đủ (trường bắt buộc) ⇒ **không chấp nhận, dừng sử dụng cho tới khi khắc phục**. Cờ Đến hạn đo
tính khi đọc từ kỳ đo gần nhất + kỳ đo của nhóm.

**R15. Xử lý dưới ngưỡng theo đúng năm tình huống** (`ETV.P34` §6.4.4) — bảng mục 4.6; trong đó:
dưới ngưỡng **02 kỳ liên tiếp** ⇒ **bắt buộc mở KPH** (`capa_ref` ← M13); có khả năng ảnh hưởng kết
quả đã phát hành ⇒ **dừng sử dụng dữ liệu + chuyển M10/M11 + báo cáo LĐV**; dữ liệu chủ trùng ⇒ hợp
nhất tại nguồn, **giữ lịch sử ánh xạ, không xóa cứng** bản ghi đã được tham chiếu.

**R16. Người nhập không kết luận chất lượng dữ liệu mình nhập** (`ETV.P34` §5.3) — `measured_by`
của kỳ đo không được là người nhập chính của tập trong kỳ; QTDL tổ chức đo, QLCL kết thúc nhánh
Không đạt. Đây là một trong bốn nguyên tắc tách vai trò module thực thi (mục 3).

**R17. Khai thác vượt quyền phải có phiếu** (`ETV.P34` §6.5.1) — đọc/sửa trong phạm vi quyền đã cấp
theo `ETV.P28` thì không cần phiếu; **kết xuất diện rộng, truy cập tập của đơn vị khác, kết nối
công cụ phân tích** ⇒ lập `DataSharingRequest` loại nội bộ, **CSHDL phê duyệt**.

**R18. Chia sẻ ra ngoài Viện: LĐV phê duyệt, PT.ATTT ý kiến bắt buộc, giảm thiểu bắt buộc**
(`ETV.P34` §6.5.2; Phụ lục I.1 điều kiện 6; Phụ lục I.2) — đủ sáu bước của §6.5.2; **không giới hạn
phạm vi trường, không ẩn danh khi có biện pháp khả thi ⇒ không chấp nhận**; thực hiện đúng phạm vi
và kênh đã duyệt, ghi nhật ký; CSHDL theo dõi thời hạn và **thu hồi** (yêu cầu bên nhận xóa/trả kèm
bằng chứng). Chia sẻ định kỳ – tự động ⇒ điểm tích hợp M37, không lập phiếu từng lần.

**R19. Cấm tuyệt đối kênh cá nhân** (`ETV.P34` §6.5.3; Phụ lục I.2) — chuyển dữ liệu khách hàng, dữ
liệu đo, dữ liệu cá nhân qua thư điện tử cá nhân, lưu trữ đám mây cá nhân, ứng dụng nhắn tin cá
nhân, **dịch vụ AI công cộng** là vi phạm nghiêm trọng — xử lý theo `ETV.P28` và `ETV.P13`. M34 ghi
nhận vi phạm phát hiện trong kỳ vào báo cáo §6.9 (nội dung 6).

**R20. Truy xuất nguồn gốc cho dữ liệu đo và dữ liệu công bố** (`ETV.P34` §6.6) — ghi nhận đủ để
lần ngược: nguồn phát sinh (thiết bị, người nhập, hệ thống ngoài) · các bước biến đổi và **phiên
bản quy tắc tính** · người, thời điểm của mỗi lần ghi nhận, hiệu chỉnh · kết quả, báo cáo, chứng
chỉ đã dùng dữ liệu đó. Là điều kiện đáp ứng ISO/IEC 17025 §7.11 và nền cho truy xuất chứng chỉ số
(`ETV.P36`). Nhật ký thao tác **không sửa được**, lưu theo `ETV.P28` mục 6.7.5.

**R21. Vòng đời ba giai đoạn, hủy phải đủ điều kiện và hai chữ ký** (`ETV.P34` §6.7; §5.3; Phụ lục
I.2 — **chặn cứng**) — chuyển Hoạt động → Lưu trữ → Đề nghị hủy theo mục 4.5. **Không được hủy**
khi: chưa hết thời hạn lưu · còn là căn cứ của kết quả, chứng chỉ đang hiệu lực · còn khiếu nại,
tranh chấp, vụ việc, cuộc đánh giá liên quan · còn tập dữ liệu, báo cáo, điểm tích hợp phụ thuộc
chưa xử lý (§6.7.2). Hủy cần **phê duyệt LĐV + xác nhận phương pháp hủy của PT.ATTT** — thiếu một
⇒ chặn. Hủy kỹ thuật (phương pháp, biên bản, bản sao lưu) theo `ETV.P27`; **bản ghi danh mục vẫn
giữ** để truy vết (Phụ lục II.1). Bản sao làm việc (kết xuất, tệp tạm) xóa khi hết mục đích, không
được coi là nguồn dữ liệu (§6.7.3; `ETV.P28` mục 6.7.9).

**R22. Dữ liệu cho AI: bốn điều kiện, Hạn chế – Mật cấm tuyệt đối, AI không ghi đè** (`ETV.P34`
§6.8; §5.3; Phụ lục I.2) — dùng tập dữ liệu cho hệ thống AI cần đủ: bản ghi danh mục có mức phân
loại và cờ dữ liệu cá nhân · **phê duyệt LĐV có ý kiến PT.ATTT** (`AIDataApproval`) · hồ sơ AIA
theo `ETV.P29` · biện pháp giảm thiểu. Dữ liệu mức **Hạn chế, Mật không đưa vào hệ thống AI dưới
mọi hình thức** — không lập chỉ mục, không đưa vào lời nhắc, không truy xuất trực tiếp (theo
`ETV.P28` mục 6.13, `ETV.P26` mục 5.5 — hai thủ tục đã ban hành; quy tắc gốc tại `ETV.P29` mục
5.5, M34 không quy định lại). Kết quả AI sinh ra **không ghi đè dữ liệu gốc**, lưu phải **đánh dấu
nguồn gốc AI**. Trợ lý AI của chính M34 chỉ *phát hiện* trùng/thiếu/bất thường, *nhắc* đến hạn,
*gợi ý* ánh xạ – chuẩn hóa, *soạn dự thảo* từ điển và báo cáo — **không** tự sửa dữ liệu vận hành,
**không** phê duyệt, **không** kết luận chất lượng, **không** hủy; mọi tính năng AI có hồ sơ AIA
theo MP29 (ISO/IEC 42001).

## 6. Trạng thái `DataSet`

Bảng theo `ETV.P34` **Phụ lục II.1**. Cột **Người đưa vào trạng thái** là người *thực hiện thao tác
chuyển bản ghi sang trạng thái đó* — không phải người chờ xử lý tại đó.

| STT | Trạng thái | Ý nghĩa | Người đưa vào trạng thái | Chuyển tiếp | Bắt buộc lý do |
|---|---|---|---|---|---|
| 1 | Nháp | Đang khai báo | QTDL | Đủ trường bắt buộc (R1, R2, R5; R3 nếu thuộc diện) → Chờ soát xét | Không |
| 2 | Chờ soát xét | Chờ xác nhận mức phân loại và kiểm tra trùng lặp | QTDL | QLCL + PT.ATTT: Đạt → Chờ phê duyệt; Không đạt → Không soát xét; trùng tập đã có → **gộp** (R7) | Không |
| 3 | Không soát xét | Bị trả lại để sửa | QLCL, PT.ATTT (**≠ người lập**) | QTDL sửa → Chờ soát xét | **Có** |
| 4 | Chờ phê duyệt | Chờ chủ sở hữu dữ liệu | QLCL | CSHDL: Đạt → Hiệu lực; Không đạt → Không phê duyệt | Không |
| 5 | Không phê duyệt | Bị trả lại để sửa | CSHDL | QTDL sửa → Chờ soát xét | **Có** |
| 6 | Hiệu lực | Đang được sử dụng — giai đoạn **Hoạt động** | CSHDL | Hết nhu cầu dùng thường xuyên → Lưu trữ; rà soát định kỳ theo R8 | Không |
| 7 | Lưu trữ | Còn trong thời hạn lưu, hạn chế quyền ghi | CSHDL, QLCL | Hết thời hạn lưu → Đề nghị hủy; cần dùng lại → Hiệu lực | **Có** |
| 8 | Đề nghị hủy | Chờ kiểm tra ràng buộc §6.7.2 và phê duyệt | QLCL | Đủ 4 điều kiện + LĐV phê duyệt + PT.ATTT xác nhận phương pháp hủy → Đã hủy (R21) | **Có** |
| 9 | Đã hủy | Đã hủy theo `ETV.P27` — **bản ghi danh mục vẫn giữ** để truy vết | **LĐV** | (kết thúc) | **Có** |
| 10 | Hủy bản ghi | Khai báo sai hoặc trùng, bỏ trước khi phê duyệt | QLCL | (kết thúc) | **Có** |

Ba cờ tính khi đọc, không phải trạng thái (`ETV.P34` Phụ lục II.1): **Đến hạn rà soát** · **Chất
lượng dưới ngưỡng** · **Đến hạn chuyển giai đoạn vòng đời**. Đặc tả bổ sung hai cờ cùng cơ chế:
**Đến hạn đo chất lượng** (từ kỳ đo mục 4.3) · **Chia sẻ quá hạn chưa thu hồi** (từ `revoke_due`
của phiếu F34.03).

Trạng thái thực thể phụ (`ETV.P34` Phụ lục II.2):
`QualityMeasurement` (Mới → Đang đo → Có kết quả → Đạt / Không đạt — QTDL kết thúc Đạt; **QLCL**
kết thúc Không đạt, quyết định mở KPH) ·
`DataCorrection` (Mới → Đang xem xét ảnh hưởng → **Chờ kết luận P10-P11** *(khi đã phát hành)* → Đã
hiệu chỉnh / Từ chối — CSHDL; **LĐV** khi ảnh hưởng kết quả đã phát hành) ·
`DataSharingRequest` (Nháp → Chờ ý kiến ATTT → Chờ phê duyệt → Đã phê duyệt → Đã thực hiện → Đã thu
hồi / Từ chối — CSHDL nội bộ; **LĐV** ra ngoài Viện).

Mọi nhánh **Từ chối**, **Không phê duyệt**, **Không soát xét**, **Không đạt**, **Đã hủy** bắt buộc
ghi lý do (`ETV.P34` Phụ lục II.2).

## 7. Đầu ra

| Đầu ra | Định dạng | Ghi chú |
|---|---|---|
| F34.01 — Danh mục dữ liệu số và từ điển dữ liệu | PDF/Excel | 4 phần: danh mục · từ điển · dữ liệu chủ và nguồn sự thật · chuyển giai đoạn vòng đời |
| F34.02 — Phiếu đo chất lượng và hiệu chỉnh dữ liệu | PDF | Phần A kỳ đo sáu chiều; phần B hồ sơ hiệu chỉnh |
| F34.03 — Phiếu yêu cầu khai thác, chia sẻ dữ liệu | PDF | Kèm ý kiến PT.ATTT, phê duyệt, thực hiện và thu hồi |
| Quyết định công nhận dữ liệu chủ và nguồn sự thật duy nhất | PDF | LĐV ký; hồ sơ lưu **vĩnh viễn** trên ManLab (`ETV.P34` mục VIII) |
| Bảng đến hạn: rà soát · đo chất lượng · chuyển vòng đời · thu hồi chia sẻ | Màn hình | Tính khi đọc |
| **Báo cáo tình hình dữ liệu số 06 tháng/lần** | PDF | `ETV.P34` §6.9 — đủ 7 nội dung, xem bên dưới |
| Trích xuất truy xuất nguồn gốc của một giá trị dữ liệu | Màn hình/PDF | Phục vụ ISO/IEC 17025 §7.11 và M36 (R20) |
| Trích xuất tình hình dữ liệu số cho M17 | Dữ liệu/PDF | Đầu vào xem xét của lãnh đạo (`ETV.P17`) |

**Báo cáo 06 tháng/lần** (`ETV.P34` §6.9, cũng lập trước mỗi cuộc họp xem xét lãnh đạo theo
`ETV.P17`) gồm đủ bảy nội dung: (1) tổng số tập dữ liệu theo nhóm, mức phân loại, giai đoạn vòng
đời; (2) kết quả đo chất lượng theo chiều và tỷ lệ đạt ngưỡng; (3) tập dưới ngưỡng và tình trạng
khắc phục; (4) số lần hiệu chỉnh và trường hợp ảnh hưởng kết quả đã phát hành; (5) yêu cầu chia sẻ
ra ngoài đã phê duyệt và tình trạng thu hồi; (6) bảng tra song song, dữ liệu chuyển ra ngoài kênh
chưa duyệt phát hiện trong kỳ; (7) tập đến hạn rà soát, đến hạn chuyển giai đoạn vòng đời.

**Ba biểu mẫu `ETV.P.F 34.01–34.03` đã có dự thảo** (`06_SHARED_RESOURCES/01_Forms/`, trạng thái
`Chờ soát xét` cùng `ETV.P34`) — chỉ dùng làm hồ sơ chính thức sau khi được phê duyệt theo MP14.
Biên bản hủy dữ liệu và hồ sơ sao lưu dùng biểu mẫu của **`ETV.P27`**; phiếu quyền truy cập dùng
**F28.04** của `ETV.P28`; phiếu thay đổi cấu trúc dùng **F30.02** của `ETV.P30`; hồ sơ điểm tích
hợp dùng biểu mẫu của `ETV.P37`; phiếu KPH dùng biểu mẫu của `ETV.P13` — **không lập biểu mẫu
trùng** (`ETV.P34` mục VII).

**Lưu hồ sơ** (`ETV.P34` mục VIII, chi tiết theo `ETV.P15` và `ETV.P.F 14.06`): danh mục và từ điển
(các phiên bản) — **vĩnh viễn** trên ManLab · phiếu đo chất lượng và hiệu chỉnh — **05 năm** (QTDL,
sao gửi QLCL) · phiếu khai thác, chia sẻ — **10 năm** · hồ sơ phê duyệt chia sẻ ra ngoài và bằng
chứng thu hồi — **10 năm** (QLCL, sao gửi PT.ATTT) · hồ sơ hiệu chỉnh ảnh hưởng kết quả đã phát
hành — theo thời hạn hồ sơ kỹ thuật tương ứng · quyết định công nhận dữ liệu chủ — **vĩnh viễn** ·
hồ sơ dữ liệu cho AI — theo `ETV.P29` · biên bản hủy — theo `ETV.P27` · báo cáo — theo `ETV.P17`.

## 8. Liên kết

Quy trình: **MP34** — thủ tục `ETV.P34_QuanLyDuLieuSo.md` (**dự thảo lần BH 01, Chờ soát xét**) ·
Biểu mẫu: `ETV.P.F 34.01`–`34.03` (cùng trạng thái) · Năng lực: **CAP-28_ATTT** (dùng chung với
MP27, MP28, MP31, MP33, MP37) · Căn cứ đã ban hành: `ETV.QM_QuanlyChatluong.md` §10.3 và §7.11,
`ETV.P35_QuanLyNenTangSo.md` mục 2.3, `ETV.P28_QuanLyAnToanThongTin.md` (mục 6.7.5, 6.7.9, 6.13),
`ETV.P26` mục 5.5, `ETV.P15` · Tiêu chuẩn: ISO 9001 §7.1.6, §7.5, §9.1; ISO/IEC 17025 §7.5, §7.11,
§8.4; ISO 17034 §7.4; ISO/IEC 27001 §8.1, A.5.12–A.5.14, A.5.33, A.8.10–A.8.12; ISO/IEC 42001
§7.4, §8.1, Phụ lục A · Pháp luật: Luật Giao dịch điện tử 20/2023/QH15, pháp luật hiện hành về bảo
vệ dữ liệu cá nhân và an toàn thông tin mạng · Lưu hồ sơ: **ETV.P15** · Nhóm menu: `DU_LIEU_SO`
(manifest MP34).

**Đầu vào từ**: M28 (mức phân loại, nền quyền truy cập đã phê duyệt, thang bảo vệ) · M27 (tài sản
thông tin tương ứng, biên bản hủy dữ liệu) · M33/M35 (hạ tầng, nền tảng nơi dữ liệu tồn tại) · M30
(phiếu thay đổi cấu trúc F30.02) · M37 (điểm tích hợp, sự cố đồng bộ) · M29 (hồ sơ AIA cho dữ liệu
dùng AI) · M10/M11 (kết luận hiệu lực kết quả khi hiệu chỉnh dữ liệu đã phát hành).

**Đầu ra sang**: M10/M11 (chặn hiệu chỉnh chưa kết luận; dừng sử dụng dữ liệu khi chất lượng ảnh
hưởng kết quả) · M36 (thông tin truy xuất nguồn gốc dữ liệu cho chứng chỉ số) · M37 (yêu cầu chia
sẻ định kỳ chuyển thành điểm tích hợp; tạm ngừng điểm sinh dữ liệu sai) · M13 (KPH: dưới ngưỡng 02
kỳ, sửa đè dữ liệu gốc, bảng tra song song gây sai lệch, kênh chưa duyệt) · M15 (đăng ký hồ sơ và
thời hạn lưu) · M17 (báo cáo tình hình dữ liệu số cho xem xét lãnh đạo) · M29 (danh sách tập dữ
liệu đã được phê duyệt cấp cho hệ thống AI).

**Không thuộc M34** (`ETV.P34` §2.3): kiểm kê tài sản thông tin, sao lưu, phục hồi, hủy kỹ thuật
(M27) · biện pháp bảo vệ, mã hóa, phê duyệt quyền truy cập, sự cố ATTT (M28) · hạ tầng, thiết bị
(M33) · nền tảng số, điểm tích hợp, đánh giá trước vận hành (M35) · kết nối, ánh xạ trường, hợp
đồng dữ liệu (M37) · phát hành, xác thực chứng chỉ số (M36) · dịch vụ số cho khách hàng (M38) · kết
luận kỹ thuật, hiệu lực kết quả (M08/M10/M11) · nhận dạng, lưu giữ, thanh lý hồ sơ (M15) · phân
loại thông tin và cam kết bảo mật (M02/M28) · đánh giá tác động AI (M29) · phê duyệt thay đổi cấu
trúc (M30) · khôi phục dữ liệu khi gián đoạn, RPO (M31).

## 9. Trạng thái triển khai

**Đã xây nguyên mẫu trên `09_ENGINEERING/aios-platform`** (26/08/2026, theo lệnh BUILD của chủ sở
hữu repo trong khi `ETV.P34` còn `Chờ soát xét` — xem giới hạn ở mục 10 điểm 1): schema Prisma
(11 model `M34*` + enum `Classification` dùng chung, migration `20260825231424_m34_du_lieu_so`),
gate thuần `src/lib/m34/rules.ts` (R1–R22, **47 test** `rules.test.ts` PASS), server action +
audit append-only, **11 trang** `/modules/M34…` đúng danh sách `04_UI/Screens.md`, seed demo
(3 tập + kỳ đo + hiệu chỉnh chờ P10/P11 + phiếu chia sẻ + hồ sơ AI + bảng tra song song), thêm vai
trò `ATTT`, `QTDL` và tài khoản demo `attt@`, `qtdl@manlab.vn`. Mọi giá trị định lượng trong gate
bám dự thảo — Viện phê duyệt thủ tục mà đổi số thì sửa `rules.ts` theo. Tầng đặc tả:

| Tầng | File | Nội dung |
|---|---|---|
| Yêu cầu | `01_Requirement/DacTa.md` | **Nguồn sự thật** — file này |
| API | `02_API/API.md` | Endpoint và điều kiện chặn theo vai trò |
| Dữ liệu | `03_Database/DataModel.md` | Thực thể, quan hệ, ràng buộc |
| Giao diện | `04_UI/Screens.md` | Màn hình, quy ước hiển thị, tiêu chí chấp nhận |
| Đầu ra | `05_Report/Outputs.md` | Biểu mẫu xuất, báo cáo 06 tháng, thời hạn lưu |
| Bảng điều khiển | `06_Dashboard/Dashboard.md` | Chỉ số bám bảy nội dung báo cáo `ETV.P34` §6.9 |
| Quy trình | `07_Workflow/StateMachine.md` | Bảng trạng thái và thẩm quyền thao tác |

Hồ sơ làm việc: `01_Requirement/_work/20260826-dac-ta-m34/` (đợt đặc tả đầu tiên, dựng từ dự thảo
`ETV.P34` 25/08/2026) và `_work/20260826-build-m34/` (đợt BUILD nguyên mẫu lên aios-platform).

## 10. Đối chiếu với `ETV.P34` — cần chốt trước khi BUILD

Khác M33 (đặc tả có trước, thủ tục chốt sau), M34 đi chiều thuận: **thủ tục dự thảo có trước, đặc
tả này dựng theo**. Vì vậy không có bảng "đã chốt" — chỉ còn các điểm phải chốt trước khi viết mã:

1. **Phê duyệt `ETV.P34` và bộ biểu mẫu F34.01–03 theo MP14.** Thủ tục đang `Chờ soát xét`; mọi
   **giá trị định lượng** (kỳ đo 03/06/12 tháng, 15 ngày làm việc khắc phục, chu kỳ rà soát 12/06
   tháng, thời hạn lưu 05/10 năm, sàn 100%) là đề xuất chờ Viện xác nhận — chính Ghi chú soạn thảo
   của thủ tục nói rõ điều này. Nếu Viện đổi giá trị, đặc tả và gate sửa theo. Không BUILD trước
   mốc này.
2. **Vai trò CSHDL và QTDL chưa tồn tại trên nền tảng** — đây là vai trò *theo tập dữ liệu* (mỗi
   `DataSet` một cặp), khác vai trò *toàn cục* (QLCL, PT.ATTT, LĐV) đang có trong `auth.ts`. Cần
   quyết định cách biểu diễn: trường phân công trên bản ghi (đề xuất — khớp F34.01) hay role mới
   trong hệ phân quyền.
3. **Ranh giới thực thi R11 (bất biến dữ liệu gốc)**: M34 giữ *hồ sơ hiệu chỉnh*, còn việc chặn ghi
   đè vật lý nằm ở module nghiệp vụ giữ dữ liệu (M10 đã có control rule tương đương trong
   `08_Source/api/rules.mjs`). Khi BUILD cần rà từng module nghiệp vụ đang ACTIVE xem đã đáp ứng
   chưa — M34 không thể tự chặn thay cho nơi khác.
4. **Kiểm tra mẫu "bản ghi không chứa dữ liệu thật" (R6)** — mức độ kiểm (regex CCCD, số điện
   thoại, email hàng loạt) là diễn giải của đặc tả; `ETV.P34` §6.1.1 chỉ nêu nguyên tắc cấm. Cần
   PT.ATTT xác nhận bộ mẫu khi BUILD.
5. **Phụ thuộc M27, M30, M35, M37, M29 chưa lên nền tảng** — giai đoạn đầu dùng tham chiếu mềm kèm
   cảnh báo (vd `info_asset_ref` là mã văn bản, biên bản hủy là tệp đính kèm), chuyển thành FK thật
   khi các module đó ACTIVE. **Không nới lỏng điều kiện chặn cứng** (R1, R12, R21, R22) vì module
   đích chưa có.
6. **Dữ liệu chủ dùng chung với M25_DuLieuChu** *(nếu có trên nền tảng)*: chuẩn dữ liệu chủ Chủ thể
   đã có hồ sơ riêng trong `_meta`/M25 — khi BUILD, `MasterDataSource` phải trỏ về đúng nguồn đã
   công nhận đó thay vì lập danh mục song song (chính là quy tắc R9 áp cho bản thân module).
