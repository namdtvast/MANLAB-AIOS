# M27_TaiSanTT — Đặc tả yêu cầu

> **Nguồn**: Thủ tục **`ETV.P27` — Quản trị dữ liệu và tài sản thông tin** đã **ban hành lần 01 ngày
> 26/08/2026** (`03_MANAGEMENT_SYSTEM/02_P/ETV.P27_QuanTriDuLieuTaiSanTT.md`) cùng bộ biểu mẫu
> **`ETV.P.F 27.01–F 27.03`** trong `06_SHARED_RESOURCES/01_Forms/`. Căn cứ kèm theo: Sổ tay chất
> lượng **§9.4** và **§7.11**; **`ETV.P02`** §6.8–§6.10; **`ETV.P15`**; ISO/IEC 27001 §8.2 và
> A.5.9–A.5.14, A.8.10, A.8.13; ISO/IEC 17025 §7.11; ISO 9001 §7.5; **Nghị định 13/2023/NĐ-CP**;
> ISO/IEC 42001 §7.4.
>
> **Thủ tục là nguồn sự thật**: nếu đặc tả lệch thủ tục thì sửa đặc tả, không sửa ngược lại. Mọi số
> hiệu mục dạng "P27 §x.y" trỏ tới điều khoản của thủ tục lần ban hành 01 (khung I–IX, nội dung
> nghiệp vụ ở mục VI). Các dấu `[SUY DẪN]` còn lại là phần **thủ tục không quy định**, thuộc quyền
> quyết định của đặc tả kỹ thuật; phần đã được thủ tục chốt thì ghi rõ điều khoản.
>
> **Ba điểm đặc tả đã được thủ tục sửa lại** (so với dự thảo đặc tả ngày 24/08/2026): bộ biểu mẫu
> còn **03** thay vì 05 (§VII) · luồng **chia sẻ dữ liệu** chuyển sang **ETV.P34 §6.5 / F34.03**,
> M27 chỉ quyết định ở cấp tài sản (§6.6) · chu kỳ **rà soát** và **kiểm chứng phục hồi** lấy theo
> §6.8 và §6.5.2. Xem mục 10 để biết câu hỏi nào đã được thủ tục trả lời.

## 1. Mục tiêu module

Số hóa MP27 — **kiểm kê, phân loại, giao chủ sở hữu và kiểm soát toàn bộ vòng đời** của dữ liệu và
tài sản thông tin của Viện, để mọi dữ liệu đều có người chịu trách nhiệm, có mức phân loại, có quy
tắc xử lý tương ứng, có thời hạn lưu, được sao lưu và được hủy đúng cách có bằng chứng (QM §9.4,
§7.11; ISO/IEC 27001 A.5.9–A.5.13).

M27 là **nguồn chuẩn duy nhất của thang phân loại thông tin và của bảng quy tắc xử lý theo mức phân
loại** trong toàn hệ thống. Các module khác (M26 tri thức, M14 tài liệu, M15 hồ sơ, M34 dữ liệu số,
M35 nền tảng số) **kế thừa** thang này, không tự định nghĩa.

M27 **không phải kho dữ liệu**: module chỉ giữ **bản kiểm kê + thuộc tính quản trị + đường dẫn tới
nơi dữ liệu thật nằm** (hệ thống CNTT ở M33, hồ sơ ở M15, tài liệu ở M14, nền tảng ManLab).

**Ranh giới**

| Module | M27 làm gì với nó | M27 **không** làm |
|---|---|---|
| **M02_BaoMat** (đã có đặc tả theo `ETV.P02`) | Trỏ tới phê duyệt công bố thông tin khách hàng (`DisclosureApproval`) khi chia sẻ ra bên ngoài | Không quản lý cam kết bảo mật, sổ khách, sự cố bảo mật |
| **M28_ATTT** (`ETV.P28` **đã ban hành** 26/08/2026, đã có đặc tả) | Cấp danh mục tài sản làm **đầu vào đánh giá rủi ro ATTT** (ISO/IEC 27001 §8.2); nhận sự cố khi khôi phục sao lưu thất bại hoặc dữ liệu Hạn chế/Mật lọt chỉ mục AI | Không đánh giá rủi ro, không quản lý SoA, không xử lý sự cố ATTT |
| **M33_HeThongTT** | Trỏ tới hệ thống/ứng dụng đang chứa tài sản bằng `system_ref` | Không quản lý vòng đời phần cứng, phần mềm, hạ tầng CNTT |
| **M34_DuLieuSo** | Cung cấp mức phân loại và chủ sở hữu cho tập dữ liệu số | Không định nghĩa từ điển dữ liệu, chuẩn kỹ thuật, luồng tích hợp (M34, M37) |
| **M15_HoSo** | Với tài sản là **hồ sơ**: `retention_ref` trỏ M15 | Không tự đặt thời hạn lưu hồ sơ (thẩm quyền của ETV.P15) |
| **M14_TaiLieu** | Với tài sản là **tài liệu kiểm soát**: `doc_ref` trỏ M14 | Không đánh phiên bản, không ban hành tài liệu |
| **M26_TriThuc** | Cấp thang phân loại để M26 gán `confidentiality` | Không quản lý tri thức, bài học kinh nghiệm |
| **M29_AI** | Kiểm soát dữ liệu được dùng cho hệ thống AI (nguồn, mức phân loại) | Không quản lý hệ thống AI, không đánh giá tác động AI (AIA) |
| **M31_LienTuc** | Cấp yêu cầu sao lưu/khôi phục làm đầu vào kế hoạch liên tục | Không lập kịch bản thảm họa, không diễn tập BCP |

## 2. Đối tượng dữ liệu chính

**Ba** thực thể nghiệp vụ + nhật ký. Trục chính là `InfoAsset`; `ClassificationRule` là **bảng luật**
áp lên trục chính; `DisposalRecord` là **sự kiện vòng đời** phải có phê duyệt trước khi thực hiện.

| Đối tượng | Mô tả | Biểu mẫu (đã ban hành 26/08/2026) |
|---|---|---|
| `InfoAsset` | Tài sản thông tin/dữ liệu trong danh mục kiểm kê | **F27.01** — Danh mục tài sản thông tin |
| `ClassificationRule` | Quy tắc xử lý bắt buộc theo từng mức phân loại | **F27.02** — Bảng quy tắc xử lý theo mức phân loại |
| `DisposalRecord` | Việc hủy dữ liệu/vật mang tin khi hết thời hạn lưu | **F27.03** — Phiếu đề nghị và biên bản huỷ dữ liệu, vật mang tin |
| ~~`DataSharing`~~ | **Không thuộc M27.** Luồng phê duyệt chia sẻ từng lần thực hiện theo **ETV.P34 §6.5 (F34.03)** kèm phê duyệt công bố theo ETV.P02. M27 chỉ quyết định ở **cấp tài sản**: có được phép chia sẻ ra ngoài hay không (`external_sharing_allowed`) và với điều kiện gì theo bảng quy tắc — P27 §6.6 | *(F34.03 của ETV.P34)* |
| (thuộc tính của `InfoAsset`) | Ngày kiểm chứng phục hồi gần nhất | *(F31.03 của ETV.P31 — P27 §6.5.2)* |

### 2.1. `InfoAsset` — Tài sản thông tin

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `code` | string, duy nhất | tự sinh | vd `TS-2026-001` |
| `name` | string | có | Tên tài sản, đủ nghĩa khi đứng một mình |
| `asset_type` | enum | có | Mục 4.1 |
| `data_domain` | enum | có | Mục 4.2 — nhóm nghiệp vụ của dữ liệu |
| `description` | text | có | Nội dung dữ liệu chứa đựng; **không** chép dữ liệu thật vào đây |
| `classification` | enum: Công khai / Nội bộ / Hạn chế / Mật | có | Mục 4.3 — **thang chuẩn của Viện** |
| `contains_personal_data` | bool | có | Quy tắc 4 (NĐ 13/2023) |
| `legal_basis` | text | có **khi** `contains_personal_data = true` | Căn cứ và mục đích xử lý dữ liệu cá nhân |
| `owner` | ref User (TP) | có | **Chủ sở hữu tài sản** — một cá nhân, không phải phòng (quy tắc 1) |
| `custodian` | ref User (QT hệ thống) | có **khi** tài sản ở dạng điện tử | Người quản lý kỹ thuật, vận hành, sao lưu |
| `system_ref` | ref → M33 | có **khi** tài sản ở dạng điện tử | Hệ thống/ứng dụng đang chứa tài sản |
| `storage_location` | text | có | Nơi lưu vật lý/logic (tủ hồ sơ, thư mục, CSDL, dịch vụ đám mây) |
| `doc_ref` / `record_ref` | ref → M14 / M15 | có **khi** tài sản là tài liệu kiểm soát / hồ sơ | Quy tắc 8 |
| `cia_c` / `cia_i` / `cia_a` | enum: Thấp / Trung bình / Cao | có | Mức yêu cầu Bảo mật / Toàn vẹn / Sẵn sàng — đầu vào M28 |
| `retention_period` | string | có | Thời hạn lưu; tài sản là hồ sơ ⇒ lấy theo `retention_ref` |
| `retention_ref` | ref → M15 | có **khi** tài sản là hồ sơ | Không tự đặt thời hạn khác ETV.P15 (quy tắc 8) |
| `backup_required` | bool | có | Bắt buộc `true` khi `cia_a = Cao` (quy tắc 7) |
| `backup_frequency` | enum: Ngày / Tuần / Tháng / Khác | có **khi** `backup_required = true` | |
| `last_restore_test_at` | date | có **khi** `backup_required = true` | Lần kiểm tra khôi phục gần nhất — quy tắc 7 |
| `disposal_method` | enum | có | Mục 4.4 — cách hủy dự kiến khi hết thời hạn |
| `external_sharing_allowed` | bool | có | Mặc định `false` với mức Hạn chế/Mật (quy tắc 6) |
| `ai_use_allowed` | bool | có | Được phép dùng làm nguồn cho hệ thống AI hay không — quy tắc 12 |
| `review_cycle` | enum: 6 tháng / 12 tháng | tự tính | **12 tháng** mặc định; **06 tháng** bắt buộc khi `classification = Mật` hoặc `contains_personal_data = true` — P27 §6.8 (quy tắc 11) |
| `last_reviewed_at` | date | tự ghi | Mốc tính hạn rà soát |
| `risk_refs[]` | ref → M28 | có **khi** `classification ∈ {Hạn chế, Mật}` hoặc có mức CIA = Cao | Quy tắc 10 |
| `status` | enum | tự quản lý | Mục 6 |
| `created_by` / `reviewed_by` / `approved_by` / `approved_at` | ref User / datetime | theo trạng thái | Quy tắc 13 |

### 2.2. `ClassificationRule` — Quy tắc xử lý theo mức phân loại

Bảng luật có phiên bản, do LĐV phê duyệt; mỗi dòng là một cặp **(mức phân loại × hành động)**.

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `version` | int | tự sinh | Toàn bảng dùng chung một số phiên bản |
| `classification` | enum | có | Công khai / Nội bộ / Hạn chế / Mật |
| `action` | enum | có | Lưu trữ · Truyền – gửi · In ấn – sao chép · Mang ra ngoài Viện · Chia sẻ bên thứ ba · Lưu trên thiết bị cá nhân · Hủy |
| `requirement` | text | có | Yêu cầu bắt buộc khi thực hiện hành động (vd: mã hóa khi truyền, gửi mật khẩu qua kênh khác — ETV.P02 §6.8) |
| `is_prohibited` | bool | có | Hành động bị **cấm** với mức phân loại này |
| `effective_from` | date | có | |
| `status` | enum: Nháp / Đã phê duyệt / Hết hiệu lực | tự quản lý | Quy tắc 5 |

### 2.3. Chia sẻ dữ liệu ra ngoài — **không phải thực thể của M27**

Dự thảo đặc tả ngày 24/08/2026 đề xuất thực thể `DataSharing` trong M27. **Thủ tục đã ban hành quyết
định khác**: theo **P27 §6.6**, luồng phê duyệt chia sẻ **từng lần** thực hiện theo **ETV.P34 §6.5
(biểu mẫu F34.03)** kèm phê duyệt công bố theo **ETV.P02** — không lập biểu mẫu và không dựng thực
thể trùng ở M27 (nguyên tắc một nơi duy nhất, ETV.P14).

M27 chỉ quyết định ở **cấp tài sản**, bằng hai trường của `InfoAsset`:

| Quyết định của M27 | Trường | Quy định |
|---|---|---|
| Tài sản này có được phép chia sẻ ra ngoài không | `external_sharing_allowed` | Tài sản mức **Hạn chế** và **Mật** mặc định **không được phép** (P27 §6.6) |
| Chia sẻ thì phải theo điều kiện gì | `ClassificationRule` của mức tương ứng | Hành động *Chia sẻ với bên thứ ba* trong bảng quy tắc (P27 §6.3) |

Thẩm quyền phê duyệt từng lần (P27 §6.6): **LĐV** với tài sản mức **Hạn chế, Mật** · **chủ sở hữu
tài sản** với mức **Nội bộ** · mức **Công khai** không cần phiếu. Dữ liệu khách hàng hoặc dữ liệu cá
nhân bắt buộc thêm phê duyệt công bố theo ETV.P02, thiếu thì chặn phê duyệt chia sẻ.

### 2.4. `DisposalRecord` — Hủy dữ liệu và vật mang tin

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `code` | string, duy nhất | tự sinh | |
| `asset_refs[]` | ref `InfoAsset` | có, ≥ 1 | Chỉ tài sản ở trạng thái Ngừng sử dụng và **đã hết thời hạn lưu** (quy tắc 8) |
| `reason` | enum: Hết thời hạn lưu · Trùng lặp · Theo yêu cầu pháp luật · Theo yêu cầu chủ thể dữ liệu (NĐ 13/2023) | có | |
| `method` | enum | có | Mục 4.4 |
| `planned_at` | date | có | Ngày dự kiến hủy |
| `approved_by` / `approved_at` | ref User (LĐV) / datetime | có, **trước khi** thực hiện | Quy tắc 9 |
| `executed_by` / `executed_at` | ref User / datetime | có, khi thực hiện | |
| `witness` | ref User | có | Người chứng kiến ≠ người thực hiện |
| `evidence_ref` | link | có | Ảnh/biên bản/log xóa an toàn — ETV.P02 §6.10 |
| `status` | enum: Nháp / Chờ phê duyệt / Đã phê duyệt / Đã thực hiện / Hủy bỏ | tự quản lý | |

### 2.5. `AuditLog`

Append-only, ghi mọi thao tác tạo/sửa/đổi trạng thái/đổi mức phân loại/phê duyệt chia sẻ/phê duyệt
hủy trên cả 4 thực thể: ai, khi nào, trường nào, giá trị trước → sau, lý do (khi bắt buộc). Với tài
sản `classification ∈ {Hạn chế, Mật}` ghi thêm **lượt truy cập bản ghi kiểm kê** (ai xem, khi nào).

## 3. Vai trò

| Vai trò | Trách nhiệm chính |
|---|---|
| **TP** (trưởng phòng/phụ trách lĩnh vực) | **Chủ sở hữu tài sản** (`owner`): khai báo, phân loại, xác định thời hạn lưu và nhu cầu sao lưu, rà soát định kỳ, đề nghị chia sẻ/hủy |
| **QT hệ thống** (quản trị hệ thống thông tin) | **Người quản lý kỹ thuật** (`custodian`): thực hiện sao lưu, kiểm tra khôi phục, cấp/thu hồi quyền truy cập, thực hiện xóa an toàn |
| **Phụ trách ATTT** (có thể kiêm nhiệm) | Soát xét mức phân loại và mức CIA; đối chiếu danh mục với đánh giá rủi ro ATTT (M28) |
| **QLCL** | Giữ danh mục tổng hợp và hồ sơ theo ETV.P15; theo dõi tài sản đến hạn rà soát, đến hạn hủy |
| **LĐV** | **Phê duyệt** danh mục, bảng quy tắc xử lý, việc chia sẻ dữ liệu ra ngoài và việc hủy dữ liệu |
| **Nhân viên** | Sử dụng dữ liệu đúng quy tắc xử lý theo mức phân loại; báo cáo sai lệch trong danh mục |

Nguyên tắc tách vai trò: **người lập ≠ người phê duyệt**; **người thực hiện hủy ≠ người chứng kiến**
— thống nhất với M01/M10/M14/M16/M25/M26.

## 4. Danh mục chuẩn

### 4.1. Loại tài sản (`asset_type`) `[SUY DẪN]`

Cơ sở dữ liệu/tập dữ liệu điện tử · Tệp tài liệu điện tử (thư mục dùng chung) · Hồ sơ giấy ·
Ứng dụng – nền tảng chứa dữ liệu (ManLab, aios-platform) · Vật mang tin rời (ổ cứng, USB, băng từ) ·
Dữ liệu trên dịch vụ bên thứ ba (đám mây, email) · Dữ liệu đo trực tiếp từ thiết bị (← M05).

### 4.2. Nhóm dữ liệu nghiệp vụ (`data_domain`) `[SUY DẪN]`

| Nhóm | Ví dụ tại Viện | Mức phân loại tối thiểu đề xuất |
|---|---|---|
| Dữ liệu khách hàng | Thông tin liên hệ, hợp đồng, yêu cầu dịch vụ | **Hạn chế** (quy tắc 3) |
| Dữ liệu kết quả đo – thử nghiệm – kiểm định | Dữ liệu thô, phiếu kết quả, chứng chỉ (← M10, M11, M36) | **Hạn chế** |
| Dữ liệu hiệu chuẩn và mẫu chuẩn | Hồ sơ hiệu chuẩn, dữ liệu sản xuất CRM (← M19) | Hạn chế |
| Dữ liệu nhân sự | Hồ sơ nhân sự, lương thưởng (← M03, M24) | **Mật** |
| Dữ liệu tài chính – hợp đồng | Báo giá, thanh toán (← M07) | Mật |
| Dữ liệu hệ thống quản lý | Tài liệu, hồ sơ ISO (← M14, M15, M16) | Nội bộ |
| Dữ liệu nghiên cứu | Đề tài, dữ liệu thử nghiệm R&D (← `12_RESEARCH`) | Nội bộ |
| Dữ liệu vận hành CNTT | Nhật ký hệ thống, cấu hình, sao lưu (← M33) | Hạn chế |
| Dữ liệu phục vụ AI | Tập dữ liệu đầu vào, nhật ký tương tác, chỉ mục ngữ nghĩa (← M29) | Nội bộ — chỉ mục AI chỉ nhận Công khai/Nội bộ (quy tắc 12) |

### 4.3. Thang phân loại thông tin (`classification`) — **nguồn chuẩn của Viện** (P27 §6.2, đã ban hành)

| Mức | Ai được tiếp cận | Hệ quả chính |
|---|---|---|
| **Công khai** | Không giới hạn | Được công bố ra ngoài; vẫn phải kiểm soát tính toàn vẹn (ai được sửa) |
| **Nội bộ** | Toàn bộ người lao động của Viện | Không phát tán ra ngoài nếu không có phê duyệt |
| **Hạn chế** | Nhóm/vai trò được chỉ định | Chia sẻ ra ngoài bắt buộc `DataSharing` được phê duyệt; ghi nhật ký truy cập |
| **Mật** | Danh sách cá nhân đích danh do LĐV duyệt | Cấm lưu trên thiết bị cá nhân và dịch vụ đám mây cá nhân (ETV.P02 §6.8); **không** đưa vào chỉ mục AI |

Thang này là **nguồn chuẩn duy nhất** — M26 (`confidentiality`), M14, M15, M34, M35 kế thừa nguyên
tên gọi, không định nghĩa thang riêng (quy tắc 2). `ETV.P28` mục 6.3 (đã ban hành) cũng tuyên bố
rõ: định nghĩa mức và tiêu chí gán mức thuộc **ETV.MP02 và ETV.MP27**, M28 chỉ sử dụng lại.

### 4.4. Phương pháp hủy (`disposal_method`) — ETV.P02 §6.10

Hủy giấy bằng phương pháp không khôi phục được nội dung (cắt vụn) · Xóa an toàn dữ liệu điện tử
(ghi đè theo chuẩn) · Hủy vật lý vật mang tin · Hủy bằng khóa mã hóa (crypto-erase) · Yêu cầu bên
thứ ba xóa và cung cấp bằng chứng.

## 5. Quy tắc nghiệp vụ

1. **Không có tài sản vô chủ**: mỗi `InfoAsset` phải có `owner` là **một cá nhân** (không phải tên
   phòng). Thiếu `owner` hoặc owner đã nghỉ việc ⇒ **chặn phê duyệt** và cảnh báo chuyển giao
   (ISO/IEC 27001 A.5.9). `[SUY DẪN]`
2. **Một thang phân loại duy nhất**: thang mục 4.3 do M27 sở hữu; module khác kế thừa. Đổi thang ⇒
   phiên bản mới của `ClassificationRule` + rà soát lại toàn bộ tài sản bị ảnh hưởng.
3. **Dữ liệu khách hàng mặc định ≥ Hạn chế**: theo QM (mọi thông tin thu được trong hoạt động chuyên
   môn đều là thông tin bảo mật) và ETV.P02. Hạ mức xuống Nội bộ/Công khai chỉ khi có phê duyệt công
   bố ở **M02** (`disclosure_ref`) hoặc pháp luật bắt buộc công bố — hệ thống **chặn** hạ mức nếu
   thiếu căn cứ.
4. **Dữ liệu cá nhân phải có căn cứ**: `contains_personal_data = true` ⇒ bắt buộc `legal_basis`
   (căn cứ + mục đích xử lý), bắt buộc `retention_period` hữu hạn (không được "vĩnh viễn" nếu không
   có căn cứ pháp luật), và phải nằm trong hồ sơ đánh giá tác động xử lý dữ liệu cá nhân theo
   **NĐ 13/2023/NĐ-CP**. `[SUY DẪN]`
5. **Quy tắc xử lý là luật hiển thị tại chỗ**: bảng `ClassificationRule` có phiên bản, do LĐV phê
   duyệt; màn hình chi tiết tài sản **hiển thị sẵn** các yêu cầu/điều cấm áp dụng cho mức phân loại
   của nó — không bắt người dùng tra cứu sổ tay. Hành động có `is_prohibited = true` bị chặn ở mọi
   luồng thao tác của module. `[SUY DẪN]`
6. **Chia sẻ ra ngoài phải được phê duyệt**: tài sản `Hạn chế/Mật` (hoặc `external_sharing_allowed
   = false`) chỉ ra khỏi phạm vi mặc định khi có `DataSharing` **Đã phê duyệt** bởi LĐV; nếu liên
   quan khách hàng hoặc dữ liệu cá nhân, bắt buộc thêm `disclosure_ref` sang **M02** — thiếu thì
   chặn phê duyệt. Hết `valid_until` ⇒ nhắc `custodian` thu hồi quyền truy cập.
7. **Sao lưu phải được chứng minh bằng khôi phục**: `cia_a = Cao` ⇒ `backup_required = true` bắt
   buộc (thiếu sao lưu ⇒ **chặn phê duyệt**, P27 Phụ lục I.1 điều kiện 7). Chu kỳ **kiểm chứng phục
   hồi** theo P27 §6.5.2 — **≤ 06 tháng** với tài sản `cia_a = Cao`, **≤ 12 tháng** với tài sản còn
   lại có sao lưu; bằng chứng dùng **F31.03** của ETV.P31, không lập biểu mẫu riêng. Người thực hiện
   phục hồi ≠ người xác nhận kết quả. Quá hạn ⇒ cảnh báo `custodian`, quá 2 chu kỳ ⇒ cảnh báo LĐV. Sao lưu chưa từng khôi phục thử **không được coi là biện pháp kiểm soát có hiệu
   lực** (ISO/IEC 27001 A.8.13). **Kiểm tra khôi phục thất bại ⇒ bắt buộc mở sự cố an toàn thông
   tin ở M28** và kết quả kiểm tra là bằng chứng bắt buộc cho các kiểm soát tính sẵn sàng trong SoA
   (`ETV.P28` mục 6.7, đã ban hành 26/08/2026).
8. **Thời hạn lưu không đặt hai nơi**: tài sản là hồ sơ ⇒ `retention_ref` trỏ **M15**, thời hạn lấy
   theo ETV.P15; tài sản là tài liệu kiểm soát ⇒ `doc_ref` trỏ **M14**. M27 chỉ tự đặt thời hạn cho
   dữ liệu không thuộc hai loại trên (CSDL vận hành, bản sao lưu, nhật ký hệ thống).
9. **Hủy dữ liệu: phê duyệt trước, bằng chứng sau**: chỉ hủy tài sản đã **Ngừng sử dụng** và **hết
   thời hạn lưu**; `DisposalRecord` phải được **LĐV phê duyệt trước khi thực hiện**; người thực hiện
   ≠ người chứng kiến; bắt buộc `evidence_ref`. Bản ghi kiểm kê **không bao giờ bị xóa** — tài sản
   chuyển trạng thái **Đã hủy** và giữ lại biên bản làm bằng chứng (ETV.P02 §6.10, ETV.P15).
10. **Danh mục là đầu vào của đánh giá rủi ro ATTT**: tài sản `classification ∈ {Hạn chế, Mật}`
    hoặc có bất kỳ mức CIA = Cao phải có ≥ 1 `risk_refs` sang **M28**. Chiều ngược lại là **chặn
    cứng** theo `ETV.P28` mục 6.3 và quy tắc R1 của M28: rủi ro ATTT không gắn được tài sản trong
    danh mục M27 thì không cho lưu. Hệ quả về thứ tự triển khai: **M27 phải lên nền tảng trước
    M28**, nếu không R1 của M28 phải tạm hạ xuống cảnh báo mềm (câu hỏi mở số 3 của M28). Ở chiều
    M27, giai đoạn đầu áp dụng **cảnh báo mềm**, chuyển thành chặn phê duyệt khi M28 lên nền tảng.
    `[SUY DẪN]` (chiều M27) · **đã ban hành** (chiều M28)
11. **Rà soát định kỳ** (P27 §6.8): **12 tháng/lần** mặc định; **06 tháng/lần** với tài sản mức
    **Mật** hoặc có **dữ liệu cá nhân**. Cờ **Đến hạn rà soát** tính khi đọc từ `last_reviewed_at` +
    `review_cycle`, **không** lưu cột riêng. Hệ thống CNTT chứa tài sản bị ngừng vận hành ở M33 ⇒
    tài sản tự gắn cờ cần rà soát. **Chuyển giao chủ sở hữu** bắt buộc khi người giữ vai trò nghỉ
    việc/chuyển công tác và phải hoàn tất **trước khi** hoàn thành thủ tục thôi việc theo ETV.P03;
    tài sản có chủ sở hữu đã nghỉ việc gắn cờ **Tài sản vô chủ**, cảnh báo QLCL và LĐV.
12. **Dữ liệu cho AI có kiểm soát (← M29)**: tài sản chỉ được dùng làm nguồn cho hệ thống AI khi
    `ai_use_allowed = true`, `status = Đang sử dụng` và `classification ∈ {Công khai, Nội bộ}` —
    dữ liệu mức **Hạn chế** và **Mật** **không bao giờ** được đưa vào chỉ mục AI; phát hiện vi phạm
    phải gỡ ngay, **mở sự cố ATTT ở M28 và lập KPH ở M13** (`ETV.P28` mục 6.7 và 5.10, đã ban hành;
    thống nhất với `ETV.P26` mục 5.5 và quy tắc R11 của M28). Mọi hệ thống AI sử dụng tài sản phải
    được liệt kê (liên kết sang M29). AI được phép *gợi ý* phân loại và *phát hiện* tài sản chưa
    kiểm kê; AI **không** tự phân loại chính thức, **không** phê duyệt chia sẻ hoặc hủy dữ liệu
    (ISO/IEC 42001; ETV.P29).
13. **Tách vai trò, ghi vết, lưu hồ sơ**: `created_by ≠ approved_by`; `reviewed_by` (phụ trách ATTT
    hoặc TP khác) ≠ người lập; mọi thao tác ghi `AuditLog` append-only; hồ sơ danh mục, phiếu chia
    sẻ, biên bản hủy lưu theo **ETV.P15**.

## 6. Trạng thái `InfoAsset`

| STT | Trạng thái | Ý nghĩa | Người thao tác | Điều kiện chuyển | Bắt buộc lý do |
|---|---|---|---|---|---|
| 1 | Nháp | Đang khai báo | TP, QT hệ thống | Đủ trường bắt buộc theo `asset_type` → Chờ soát xét | Không |
| 2 | Chờ soát xét | Chờ phụ trách ATTT/TP khác kiểm tra phân loại và mức CIA | Phụ trách ATTT (≠ người lập) | Đạt → Chờ phê duyệt; Không đạt → Không soát xét | — |
| 3 | Không soát xét | Bị trả lại | Người lập | Sửa → Chờ soát xét | **Có** |
| 4 | Chờ phê duyệt | Chờ LĐV | LĐV | Đạt → Đang sử dụng (chặn nếu thiếu `owner`, hoặc vi phạm quy tắc 3/4/7); Không đạt → Không phê duyệt | — |
| 5 | Không phê duyệt | Bị trả lại | Người lập | Sửa → Chờ soát xét | **Có** |
| 6 | Đang sử dụng | Có trong danh mục hiệu lực | TP (`owner`) | Ngừng khai thác → Ngừng sử dụng | **Có** |
| 7 | Ngừng sử dụng | Không còn khai thác, **vẫn trong thời hạn lưu** | QLCL, QT hệ thống | Hết thời hạn lưu + `DisposalRecord` đã thực hiện → Đã hủy | — |
| 8 | Đã hủy | Dữ liệu đã bị hủy, **bản ghi kiểm kê vẫn giữ** làm bằng chứng | — | (kết thúc) | — |
| 9 | Hủy bản ghi | Khai báo sai/trùng, bỏ trước khi phê duyệt | LĐV | (kết thúc) | **Có** |

Cờ **Đến hạn rà soát** và **Đến hạn kiểm tra khôi phục** không phải trạng thái — tính khi đọc
(quy tắc 7, 11).

Trạng thái thực thể phụ: `ClassificationRule` (Nháp → Đã phê duyệt → Hết hiệu lực khi có phiên bản
mới) · `DataSharing` (Nháp → Chờ phê duyệt → Đã phê duyệt / Từ chối → Đã thu hồi) · `DisposalRecord`
(Nháp → Chờ phê duyệt → Đã phê duyệt → Đã thực hiện / Hủy bỏ).

## 7. Đầu ra

| Đầu ra | Định dạng | Ghi chú |
|---|---|---|
| **F27.01** — Danh mục tài sản thông tin | PDF/Excel | Kiểm kê theo nhóm dữ liệu, mức phân loại, chủ sở hữu, CIA, thời hạn lưu |
| **F27.02** — Bảng quy tắc xử lý theo mức phân loại | PDF | Bảng luật đã phê duyệt (phiên bản hiện hành) |
| **F27.03** — Phiếu đề nghị và biên bản huỷ dữ liệu, vật mang tin | PDF | Tài sản, phương pháp, người thực hiện, người chứng kiến, bằng chứng |
| Danh mục tài sản phục vụ đánh giá rủi ro ATTT (M28) | Dữ liệu/PDF | Lọc theo mức phân loại và CIA |
| Bảng tài sản đến hạn rà soát / đến hạn kiểm tra khôi phục | Màn hình | Tính khi đọc |
| Bảng tài sản đến hạn hủy | Màn hình | `Ngừng sử dụng` + đã hết thời hạn lưu |
| Bảng tài sản có dữ liệu cá nhân | Màn hình/PDF | Phục vụ nghĩa vụ theo NĐ 13/2023 |

**Ba biểu mẫu F27.01–F27.03 đã ban hành** ngày 26/08/2026 (P27 §VII). Không lập biểu mẫu trùng ở
module này: chia sẻ dữ liệu dùng **F34.03** (ETV.P34) kèm phê duyệt công bố theo **ETV.P02** ·
kiểm chứng phục hồi dùng **F31.03** (ETV.P31) · phiếu quyền truy cập dùng **F28.04** · phiếu sự cố
dùng **F28.03** · phiếu hành động khắc phục dùng biểu mẫu của ETV.P13.

## 8. Liên kết

Quy trình: **MP27** (`ETV.P27`, ban hành lần 01 ngày 26/08/2026) · Năng lực: **CAP-28_ATTT** (dùng chung với MP28,
MP31, MP33, MP34, MP37) · Căn cứ đã ban hành: `ETV.QM_QuanlyChatluong.md` §9.4 và §7.11,
`ETV.P02_BaoMat.md` §6.8–§6.10, `ETV.P15`, `ETV.P28_QuanLyAnToanThongTin.md` mục 6.3/6.7 (ban hành 26/08/2026) · Tiêu chuẩn: ISO/IEC 27001 §8.2 và A.5.9–A.5.14, A.8.10,
A.8.13; ISO/IEC 17025 §7.11; ISO 9001 §7.5; ISO/IEC 42001 §7.4 · Pháp luật: **Nghị định
13/2023/NĐ-CP** · Lưu hồ sơ: **ETV.P15** · Nhóm menu: `DU_LIEU_SO` (manifest MP27).

**Đầu vào từ**: M33 (hệ thống/ứng dụng chứa dữ liệu) · M15 (thời hạn lưu hồ sơ) · M14 (tài liệu
kiểm soát) · M02 (phê duyệt công bố thông tin khách hàng) · M05 (dữ liệu đo từ thiết bị) ·
M03 (biến động nhân sự ⇒ chuyển giao chủ sở hữu) · M29 (hệ thống AI sử dụng dữ liệu).

**Đầu ra sang**: M28 (danh mục tài sản làm đầu vào đánh giá rủi ro ATTT và SoA — bắt buộc theo `ETV.P28` mục 6.3) · M31 (yêu cầu sao
lưu/khôi phục cho kế hoạch liên tục) · M26 (thang phân loại cho tri thức) · M34/M35 (mức phân loại
và chủ sở hữu của tập dữ liệu số) · M01 (rủi ro mất dữ liệu, rủi ro chủ sở hữu nghỉ việc) ·
M17 (tình hình quản trị dữ liệu trong xem xét lãnh đạo).

**Không thuộc M27**: đánh giá và xử lý rủi ro ATTT (M28) · cam kết bảo mật, sự cố bảo mật (M02) ·
vòng đời thiết bị và phần mềm CNTT (M33) · từ điển dữ liệu và tích hợp dữ liệu số (M34, M37) ·
thời hạn lưu hồ sơ (M15) · phiên bản tài liệu (M14).

## 9. Trạng thái triển khai

**Đã lên nền tảng** — `09_ENGINEERING/aios-platform`, `PlatformModule.status = ACTIVE`, nhóm menu
`DU_LIEU_SO`. Không dựng nguyên mẫu riêng trong `08_Source/`.

Phạm vi đã xây (26/08/2026): **danh mục tài sản** — khai báo, chuỗi trạng thái Nháp → Chờ soát xét →
Chờ phê duyệt → Đang sử dụng với **8 điều kiện chặn cứng** của P27 Phụ lục I.1 thực thi ở tầng server
action; **bảng quy tắc xử lý** có phiên bản, hiển thị ngay tại màn hình tài sản (§6.3); bảng đến hạn
(rà soát · kiểm chứng phục hồi · chờ đối chiếu để huỷ · tài sản vô chủ); danh sách tài sản có dữ liệu
cá nhân; nhật ký thao tác append-only.

| Vùng | Đường dẫn |
|---|---|
| Dữ liệu | `prisma/schema.prisma` — `M27InfoAsset`, `M27RuleVersion`, `M27ClassificationRule`, `M27AuditEntry`; dùng lại enum `Classification` toàn nền tảng |
| Quyết định | `src/lib/m27/rules.ts` — **nơi duy nhất** quyết định được phép hay không; thuần hàm, có 37 test |
| Ghi dữ liệu | `src/lib/m27/actions.ts` — chỉ gọi rule rồi ghi DB; **không có** action xoá tài sản |
| Giao diện | `src/app/(platform)/modules/M27/` — danh mục, chi tiết, khai báo, bảng quy tắc, bảng đến hạn, dữ liệu cá nhân |

Chưa xây: huỷ dữ liệu (F27.03), xuất PDF/Excel, chuyển giao chủ sở hữu tự động từ M03, ghi nhật ký
lượt **đọc** tài sản Hạn chế/Mật. Chi tiết và phần chưa verify: `_work/20260826-build-m27-danh-muc/`.

## 10. Câu hỏi đã được thủ tục trả lời, và phần còn mở

`ETV.P27` ban hành lần 01 ngày 26/08/2026 đã chốt **7/8** câu hỏi của dự thảo đặc tả:

| # | Câu hỏi | Thủ tục trả lời | Điều khoản |
|---|---|---|---|
| 1 | Ban hành `ETV.P27` từ đặc tả này? | **Rồi** — ban hành lần 01 ngày 26/08/2026 | toàn văn |
| 2 | Chốt thang 4 mức làm thang chuẩn toàn Viện? | **Có.** Công khai · Nội bộ · Hạn chế · Mật là **định nghĩa gốc**; đổi thang phải ban hành lại thủ tục | §6.2 |
| 3 | Ranh giới M27 ↔ M34? | **M27** giữ quản trị tài sản (chủ sở hữu, phân loại, vòng đời); **M34** giữ chất lượng dữ liệu và luồng chia sẻ từng lần | §2.3 · Phụ lục III |
| 4 | Quy tắc liên kết rủi ro M28: cảnh báo mềm rồi chuyển chặn cứng? | **Đúng.** Cảnh báo trong giai đoạn đầu, chuyển **chặn phê duyệt** kể từ khi M28 vận hành trên nền tảng; mốc chuyển do QLCL trình LĐV và ghi vào biên bản xem xét lãnh đạo | §6.9.1 |
| 5 | Chu kỳ kiểm chứng phục hồi 1 năm hay 6 tháng? | **≤ 06 tháng** với `cia_a = Cao`, **≤ 12 tháng** với tài sản còn lại; áp theo ETV.P31 §6.4.3, dùng F31.03 | §6.5.2 |
| 6 | Thẩm quyền phê duyệt chia sẻ? | **LĐV** với mức Hạn chế/Mật · **chủ sở hữu** với mức Nội bộ · mức Công khai không cần phiếu | §6.6 |
| 8 | Kiểm kê kỳ đầu bắt đầu từ đâu? | **Đợt 1 (90 ngày)**: dữ liệu khách hàng + dữ liệu kết quả đo, kể cả hồ sơ giấy. **Đợt 2 (180 ngày)**: phần còn lại | §6.1.6 |

**Còn mở — cần con người quyết định, không suy ra được từ thủ tục:**

7. **Hồ sơ đánh giá tác động xử lý dữ liệu cá nhân theo NĐ 13/2023** đặt ở module nào? Thủ tục giao
   QLCL *tổng hợp danh sách tài sản có dữ liệu cá nhân* (§6.4) nhưng không nói hồ sơ đánh giá tác
   động thuộc M27, M02 hay M28. Cho tới khi chốt, M27 chỉ giữ `contains_personal_data` +
   `legal_basis` theo §6.4, không dựng hồ sơ đánh giá tác động riêng.
