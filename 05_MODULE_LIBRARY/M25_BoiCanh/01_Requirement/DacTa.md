# M25_BoiCanh — Đặc tả yêu cầu

> **Nguồn và giới hạn nguồn**: **chưa có Thủ tục `ETV.P25`** trong `03_MANAGEMENT_SYSTEM/02_P/`
> và **chưa có biểu mẫu `F25.xx`** trong `06_SHARED_RESOURCES/01_Forms/` (0/0). Căn cứ duy nhất đã
> ban hành là Sổ tay chất lượng `03_MANAGEMENT_SYSTEM/01_QM/ETV.QM_QuanlyChatluong.md` **§9.2 Bối
> cảnh tổ chức và các bên quan tâm** — mục này chỉ nêu nguyên tắc và **dẫn chiếu tới "Thủ tục
> ETV.MP25"** như một tài liệu sẽ ban hành. Vì vậy đặc tả này **suy dẫn** từ QM §9.2 + yêu cầu
> tiêu chuẩn (ISO 9001 §4.1/§4.2, ISO/IEC 17025 §4.1/§8.5, ISO/IEC 27001 §4.1–§4.3, ISO/IEC 42001
> §4.1–§4.3, ISO 17034) + khuôn mẫu đã dùng ở các module cùng họ quản trị (M01, M17).
>
> Mọi quy tắc **không** đọc được trực tiếp từ văn bản đã ban hành đều được đánh dấu `[SUY DẪN]` —
> phải được LĐV/QLCL xác nhận và **ban hành chính thức `ETV.P25` + bộ biểu mẫu F25.xx theo MP14**
> trước khi BUILD. Xem danh sách câu hỏi cần chốt ở mục 10.

## 1. Mục tiêu module

Số hóa MP25 — xác định, theo dõi, xem xét định kỳ và lưu bằng chứng về (a) **các vấn đề nội bộ và
bên ngoài** ảnh hưởng tới Hệ thống quản lý tích hợp, và (b) **các bên quan tâm cùng nhu cầu, mong
đợi** của họ, làm cơ sở cho hoạch định chiến lược, quản lý rủi ro, mục tiêu chất lượng, phân bổ
nguồn lực và cải tiến (đúng QM §9.2).

M25 là **module đầu nguồn của chuỗi hoạch định**: kết quả kỳ xem xét bối cảnh đã phê duyệt là đầu
vào bắt buộc của **M01** (nhận diện rủi ro/cơ hội), **M17** (nội dung xem xét của lãnh đạo) và
**M24** (mục tiêu/KPI kỳ sau). Ngược lại, M25 **không** tự xử lý rủi ro, không tự lập hành động
khắc phục — chỉ nhận diện và chuyển tiếp.

**Ranh giới với M26_TriThuc** (cùng năng lực CAP-25): M25 quản lý *vấn đề bối cảnh + bên quan tâm*
(ISO 9001 §4.1/§4.2, QM §9.2); M26 quản lý *tri thức tổ chức* (QM §9.3). Không gộp hai module.

## 2. Đối tượng dữ liệu chính

Bốn thực thể, tổ chức theo mô hình **kỳ xem xét là bản chụp (snapshot) có phiên bản** — mỗi lần
xem xét tạo một kỳ mới, kỳ đã phê duyệt trở thành hồ sơ bất biến dùng làm bằng chứng cho đoàn
đánh giá.

| Đối tượng | Mô tả | Biểu mẫu đề xuất (chưa ban hành) |
|---|---|---|
| `ContextReview` | Kỳ xem xét bối cảnh (định kỳ/đột xuất) | F25.03 — Biên bản xem xét bối cảnh |
| `ContextIssue` | Vấn đề nội bộ/bên ngoài trong kỳ | F25.01 — Bảng phân tích bối cảnh tổ chức |
| `InterestedParty` | Bên quan tâm được nhận diện trong kỳ | F25.02 — Bảng bên quan tâm và mong đợi |
| `PartyExpectation` | Nhu cầu/mong đợi của một bên quan tâm | (phần II của F25.02) |

### 2.1. `ContextReview` — Kỳ xem xét bối cảnh

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `code` | string, duy nhất | tự sinh | vd `BC-2026-01` |
| `cycle_type` | enum: Định kỳ / Đột xuất | có | |
| `period_year` | int | có | Năm áp dụng của kết quả xem xét |
| `trigger_reason` | text | có **khi** Đột xuất | Sự kiện làm phát sinh (mục 5, quy tắc 2) |
| `scope_systems` | multi-enum | có | ISO 9001 · ISO/IEC 17025 · ISO 17034 · ISO/IEC 27001 · ISO/IEC 42001 |
| `summary` | text | có, trước khi gửi soát xét | Tóm tắt biến động so với kỳ liền trước |
| `conclusion` | text | có, khi phê duyệt | Kết luận của LĐV |
| `status` | enum | tự quản lý | Mục 6 |
| `created_by` | ref User (QLCL) | tự ghi | Người lập |
| `reviewed_by` | ref User (TP) | có, khi soát xét | |
| `approved_by` / `approved_at` | ref User (LĐV) / datetime | có, khi phê duyệt | |
| `supersedes_ref` | ref `ContextReview` | tự gán | Kỳ liền trước bị thay thế |

### 2.2. `ContextIssue` — Vấn đề bối cảnh

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `code` | string, duy nhất | tự sinh | |
| `review_ref` | ref `ContextReview` | có | Thuộc kỳ nào |
| `origin` | enum: Nội bộ / Bên ngoài | có | Đúng cặp khái niệm ISO 9001 §4.1 |
| `category` | enum | có | Mục 4.1 |
| `title` | string | có | |
| `description` | text | có | |
| `direction` | enum: Cơ hội / Thách thức / Cả hai / Trung tính | có | |
| `affected_systems` | multi-enum | có | Cùng bộ giá trị `scope_systems` |
| `impact_level` | enum: Thấp / Trung bình / Cao | có | Mục 4.3 |
| `monitoring_method` | text | có | Cách theo dõi (chỉ số, nguồn tin, kênh) |
| `monitoring_frequency` | enum: Tháng / Quý / 6 tháng / Năm / Theo sự kiện | có | |
| `owner` | ref User | có | Người theo dõi vấn đề |
| `risk_refs[]` | ref → M01 | có **khi** `impact_level = Cao` | Quy tắc 3 |
| `objective_refs[]` | ref → M24 | không | Mục tiêu/KPI hình thành từ vấn đề này |
| `evidence_refs[]` | link/ref | không | Văn bản pháp luật (08), phản hồi (M12), kết quả đánh giá (M16)… |
| `status` | enum: Còn hiệu lực / Đã đóng | tự quản lý | Đóng phải có lý do |

### 2.3. `InterestedParty` — Bên quan tâm

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `code` | string, duy nhất | tự sinh | |
| `review_ref` | ref `ContextReview` | có | |
| `name` | string | có | Tên bên quan tâm (tổ chức/nhóm cụ thể) |
| `group` | enum | có | Mục 4.2 |
| `influence_level` | enum: Cao / Trung bình / Thấp | có | Mức ảnh hưởng tới hệ thống quản lý |
| `engagement_channel` | text | có | Kênh trao đổi/thu thập mong đợi |
| `monitoring_frequency` | enum | có | Cùng bộ giá trị với `ContextIssue` |
| `owner` | ref User | có | Đầu mối phụ trách quan hệ |
| `impartiality_flag` | bool | có | Quan hệ có nguy cơ ảnh hưởng **tính khách quan** (ISO/IEC 17025 §4.1) → quy tắc 5 |
| `status` | enum: Còn hiệu lực / Đã đóng | tự quản lý | |

### 2.4. `PartyExpectation` — Nhu cầu và mong đợi

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `party_ref` | ref `InterestedParty` | có | |
| `description` | text | có | Nhu cầu/mong đợi cụ thể, đo được nếu có thể |
| `source` | enum | có | Hợp đồng · Văn bản pháp luật · Tiêu chuẩn · Khảo sát/phản hồi · Khiếu nại (← M12) · Đánh giá bên ngoài · Họp/trao đổi |
| `is_compliance_obligation` | bool | có | Mong đợi được Viện **chấp nhận thành nghĩa vụ tuân thủ** |
| `obligation_ref` | link | có **khi** `is_compliance_obligation = true` | Trỏ tới văn bản trong `08_KNOWLEDGE_GRAPH/01_Regulations` hoặc `02_ISO` — quy tắc 4 |
| `response_action` | text | có | Cách Viện đáp ứng |
| `response_module_ref` | ref → M01/M13/M24… | không | Nơi hành động thực sự được theo dõi |
| `fulfillment_status` | enum: Đang đáp ứng / Chưa đáp ứng / Không áp dụng | có | |

### 2.5. `AuditLog`

Append-only, ghi mọi thao tác tạo/sửa/đổi trạng thái trên cả 4 thực thể: ai, khi nào, trường nào,
giá trị trước → sau, lý do (khi bắt buộc).

## 3. Vai trò

| Vai trò | Trách nhiệm chính |
|---|---|
| **QLCL** | Lập kỳ xem xét; tổng hợp vấn đề bối cảnh và bên quan tâm từ các nguồn (M12, M16, M17, văn bản pháp luật mới); chuẩn bị biên bản; lưu hồ sơ theo ETV.P15 |
| **TP** (Trưởng phòng/phụ trách lĩnh vực) | Đề xuất vấn đề/bên quan tâm thuộc lĩnh vực mình; **soát xét** kỳ trước khi trình LĐV; theo dõi các vấn đề được giao (`owner`) |
| **LĐV** | **Phê duyệt** kỳ xem xét; ghi kết luận; quyết định đối với vấn đề mức tác động **Cao**; quyết định xem xét đột xuất |
| **Nhân viên** | Xem kết quả kỳ đã phê duyệt (chỉ đọc); đề xuất bổ sung qua kênh phản hồi nội bộ |

Nguyên tắc tách vai trò: **người lập ≠ người phê duyệt** (QLCL lập, LĐV phê duyệt) — thống nhất với
M01/M10/M16/M17.

## 4. Danh mục chuẩn

### 4.1. Phân nhóm vấn đề bối cảnh (`category`) `[SUY DẪN]`

| Nhóm | Thường thuộc |
|---|---|
| Chính trị – pháp lý (Luật Đo lường, NĐ 36/2026, NĐ 22/2026, TT 24/2013…) | Bên ngoài |
| Kinh tế – thị trường (nhu cầu kiểm định/hiệu chuẩn, giá dịch vụ, ngân sách khách hàng) | Bên ngoài |
| Xã hội – khách hàng (kỳ vọng chất lượng, thời gian trả kết quả) | Bên ngoài |
| Công nghệ – chuyển đổi số & AI (← M29, M32) | Cả hai |
| Cạnh tranh trong ngành kiểm định/hiệu chuẩn/thử nghiệm | Bên ngoài |
| Môi trường – hạ tầng – điều kiện tiện nghi (← M04) | Nội bộ |
| Nguồn lực nội bộ (nhân sự ← M03, thiết bị ← M05, tài chính) | Nội bộ |
| Năng lực kỹ thuật & phạm vi công nhận/chỉ định (← M21) | Nội bộ |
| Văn hóa – tổ chức – quản trị | Nội bộ |
| Bảo mật & tài sản thông tin (← M02, M27, M28) | Cả hai |

### 4.2. Phân nhóm bên quan tâm (`group`) `[SUY DẪN]`

Khách hàng · Cơ quan quản lý nhà nước · Tổ chức công nhận/chỉ định (BoA, cơ quan chỉ định) ·
Cơ quan chủ quản (LHHVN) · Nhân sự nội bộ · Nhà cung cấp và thầu phụ (← M06) ·
Đối tác nghiên cứu – đào tạo · Cộng đồng và xã hội.

### 4.3. Thang mức tác động (`impact_level`) và hành động yêu cầu `[SUY DẪN]`

| Mức | Ý nghĩa | Hành động bắt buộc |
|---|---|---|
| Thấp | Không ảnh hưởng đáng kể trong kỳ | Ghi nhận, theo dõi định kỳ |
| Trung bình | Ảnh hưởng tới một quá trình/phòng | Giao `owner` theo dõi; cân nhắc đưa vào mục tiêu (M24) |
| **Cao** | Ảnh hưởng tới hiệu lực hệ thống quản lý, phạm vi công nhận, hoặc khả năng cung cấp dịch vụ | **Bắt buộc** mở rủi ro/cơ hội tương ứng ở **M01**; LĐV quyết định |

Thang này cố ý **3 mức**, khác ma trận 5×5 của M01 — M25 chỉ sàng lọc mức độ trọng yếu, việc chấm
điểm R = S × P là nghiệp vụ của M01, **không lặp lại ở M25**.

## 5. Quy tắc nghiệp vụ

1. **Chu kỳ tối thiểu**: mỗi năm phải có ít nhất **một** `ContextReview` định kỳ được phê duyệt, và
   phải hoàn tất **trước khi** lập chương trình xem xét của lãnh đạo (M17, thường Quý 4) — vì bối
   cảnh là đầu vào hoạch định, không phải kết quả sau họp. Hệ thống cảnh báo khi M17 tạo `ReviewPlan`
   cho năm chưa có kỳ bối cảnh nào ở trạng thái Đã phê duyệt (cảnh báo mềm, không chặn). `[SUY DẪN]`
2. **Xem xét đột xuất bắt buộc** khi xảy ra một trong các sự kiện: thay đổi văn bản quy phạm pháp
   luật liên quan tới hoạt động kiểm định/hiệu chuẩn/thử nghiệm; thay đổi phạm vi công nhận/chỉ định
   (← M21); thay đổi tổ chức hoặc nhân sự chủ chốt; sự cố an toàn thông tin nghiêm trọng (← M28);
   đưa hệ thống AI mới vào vận hành (← M29); kết quả đánh giá bên ngoài có KPH nặng (← M16).
   `trigger_reason` bắt buộc ghi rõ sự kiện. `[SUY DẪN]`
3. **Không để vấn đề trọng yếu bị treo**: mọi `ContextIssue` có `impact_level = Cao` phải có **ít
   nhất một** `risk_refs` trỏ sang M01 trước khi kỳ được phê duyệt — hệ thống **chặn** phê duyệt nếu
   còn vấn đề Cao chưa có liên kết. `[SUY DẪN]`
4. **Mong đợi thành nghĩa vụ phải có căn cứ**: khi `is_compliance_obligation = true`, bắt buộc có
   `obligation_ref` trỏ tới văn bản pháp luật/tiêu chuẩn cụ thể trong `08_KNOWLEDGE_GRAPH` — không
   chấp nhận nghĩa vụ tuân thủ "chung chung". `[SUY DẪN]`
5. **Liên thông tính khách quan**: mỗi `InterestedParty` có `impartiality_flag = true` phải được
   nhận diện như một nguồn rủi ro tính khách quan theo ISO/IEC 17025 §4.1 — hệ thống nhắc mở rủi ro
   tương ứng ở M01 (nhắc, không chặn, vì việc đánh giá mức độ thuộc M01). `[SUY DẪN]`
6. **Mỗi bên quan tâm phải có ≥ 1 `PartyExpectation`** — bên quan tâm không kèm nhu cầu/mong đợi
   không có giá trị chứng minh cho ISO 9001 §4.2. `[SUY DẪN]`
7. **Tách vai trò**: `created_by ≠ approved_by`; chỉ **LĐV** được phê duyệt kỳ và ghi `conclusion`;
   `reviewed_by` phải là TP khác người lập.
8. **Bất biến sau phê duyệt**: kỳ ở trạng thái Đã phê duyệt **không được sửa** nội dung (vấn đề, bên
   quan tâm, mong đợi). Muốn thay đổi → tạo kỳ mới (định kỳ hoặc đột xuất). Đây là điều kiện để hồ sơ
   dùng được làm bằng chứng đánh giá.
9. **Kế thừa kỳ trước**: khi tạo kỳ mới, hệ thống sao chép các mục `Còn hiệu lực` của kỳ liền trước
   làm điểm khởi đầu; người lập cập nhật/đóng/bổ sung. Khi kỳ mới được phê duyệt, kỳ cũ tự chuyển
   **Hết hiệu lực** và `supersedes_ref` được gán tự động. `[SUY DẪN]`
10. **Đóng một mục phải có lý do** — `status = Đã đóng` bắt buộc kèm lý do (đã hết tác động / đã
    chuyển thành rủi ro đang xử lý / không còn liên quan).
11. **Hỗ trợ AI có kiểm soát (← M29)**: AI được phép *gợi ý* vấn đề bối cảnh và mong đợi từ dữ liệu
    sẵn có (phản hồi/khiếu nại M12, KPH M16, văn bản pháp luật mới trong 08), *đánh dấu* mục có thể
    đã lỗi thời. AI **không** được tự tạo bản ghi chính thức, **không** phê duyệt kỳ, **không** tự
    xác định mức tác động Cao (ISO/IEC 42001; ràng buộc MP29). Mọi gợi ý phải được người dùng chấp
    nhận tường minh và ghi vết nguồn gợi ý.
12. **Lưu hồ sơ** kỳ xem xét bối cảnh (biên bản, bảng phân tích, bảng bên quan tâm) theo **ETV.P15**.

## 6. Trạng thái `ContextReview`

| STT | Trạng thái | Ý nghĩa | Người thao tác | Điều kiện chuyển | Bắt buộc lý do |
|---|---|---|---|---|---|
| 1 | Nháp | QLCL đang soạn | QLCL | Đủ trường bắt buộc + mọi vấn đề Cao đã có `risk_refs` → Chờ soát xét | Không |
| 2 | Chờ soát xét | Chờ TP kiểm tra | TP | Đạt → Chờ phê duyệt; Không đạt → Không soát xét | — |
| 3 | Không soát xét | Bị trả lại | QLCL | Sửa → Chờ soát xét | **Có** |
| 4 | Chờ phê duyệt | Chờ LĐV | LĐV | Đạt (+ `conclusion`) → Đã phê duyệt; Không đạt → Không phê duyệt | — |
| 5 | Không phê duyệt | Bị trả lại | QLCL | Sửa → Chờ soát xét | **Có** |
| 6 | Đã phê duyệt | Có hiệu lực, **chỉ đọc** | — | Kỳ mới cùng phạm vi được phê duyệt → Hết hiệu lực (tự động) | — |
| 7 | Hết hiệu lực | Đã bị kỳ sau thay thế | — | (kết thúc — vẫn tra cứu được) | — |
| 8 | Hủy | Kỳ bị bỏ trước khi phê duyệt | LĐV | (kết thúc) | **Có** |

## 7. Đầu ra

| Đầu ra | Định dạng | Ghi chú |
|---|---|---|
| F25.01 — Bảng phân tích bối cảnh tổ chức | PDF/Excel | Vấn đề nội bộ/bên ngoài theo nhóm, mức tác động, người theo dõi |
| F25.02 — Bảng bên quan tâm và nhu cầu, mong đợi | PDF/Excel | Kèm cột nghĩa vụ tuân thủ và căn cứ |
| F25.03 — Biên bản xem xét bối cảnh | PDF | Kỳ, thành phần, kết luận LĐV, chữ ký |
| Trích xuất đầu vào cho M17 | Dữ liệu/PDF | Phần "bối cảnh" trong 12 nội dung xem xét lãnh đạo |
| Bảng theo dõi mục quá hạn xem xét | Màn hình | Mục có `monitoring_frequency` đã đến hạn mà chưa cập nhật |

**Ba biểu mẫu F25.01–F25.03 hiện chưa tồn tại** — phải soạn và ban hành theo MP14 trước khi phát
hành hồ sơ chính thức.

## 8. Liên kết

Quy trình: **MP25** (`ETV.P25` chưa ban hành) · Năng lực: **CAP-25_BoiCanhTriThuc** (dùng chung với
MP26/M26) · Căn cứ đã ban hành: `ETV.QM_QuanlyChatluong.md` §9.2 · Tiêu chuẩn: ISO 9001 §4.1/§4.2,
ISO/IEC 17025 §4.1 (tính khách quan) và §8.5 (rủi ro/cơ hội), ISO/IEC 27001 §4.1–§4.3, ISO/IEC 42001
§4.1–§4.3, ISO 17034 · Lưu hồ sơ: **ETV.P15** · Nhóm menu: `DIEU_HANH` (manifest MP25).

**Đầu ra sang**: M01 (rủi ro/cơ hội từ vấn đề Cao và từ quan hệ ảnh hưởng tính khách quan) ·
M17 (nội dung bối cảnh trong xem xét lãnh đạo) · M24 (mục tiêu/KPI kỳ sau) · M28 (đầu vào phạm vi
ISMS) · M29 (đầu vào phạm vi AIMS).
**Đầu vào từ**: M12 (khiếu nại/phản hồi khách hàng) · M16 (kết quả đánh giá nội bộ/bên ngoài) ·
M21 (phạm vi công nhận/chỉ định) · M06 (nhà cung cấp, thầu phụ) · `08_KNOWLEDGE_GRAPH` (văn bản
pháp luật, tiêu chuẩn).
**Không thuộc M25**: xử lý rủi ro (M01), hành động khắc phục (M13), tri thức tổ chức (M26).

## 9. Triển khai thật (Increment 14, aios-platform)

Đã xây trong `09_ENGINEERING/aios-platform` (Prisma + Next.js), **không** có `08_Source` nguyên
mẫu (giống M01/M02/M03/M04/M16/M17). Đặc tả kỹ thuật, kế hoạch increment và bằng chứng VERIFY:
`01_Requirement/_work/20260823-dac-ta-m25/{outcome.md, spec.md, plan.md, verify.md}`.

Phạm vi đã chạy thật: 5 màn hình (danh sách kỳ · lập kỳ · chi tiết kỳ với 2 mục Vấn đề bối
cảnh/Bên quan tâm · theo dõi đến hạn), đủ state machine mục 6, và các gate quy tắc 2/3/4/6/7/8/
9/10. Vai trò dùng lại 3 tài khoản demo `QLCL` / `TP` / `LDV` (nth/ldp/ldv), không tạo tài khoản
mới.

**Quyết định phạm vi khi triển khai** (chưa được LĐV xác nhận — xem mục 10):
1. **Quy tắc 3 triển khai là chặn cứng**: còn vấn đề mức Cao chưa liên kết M01 thì không gửi soát
   xét được (câu hỏi 4 mục 10 hỏi lại chính điểm này — nếu LĐV chọn cảnh báo mềm, sửa đúng một
   hàm `txSubmitForReview` trong `src/lib/m25/rules.ts`).
2. **Quy tắc 5 triển khai là nhắc, không chặn**: bên quan tâm gắn cờ ảnh hưởng tính khách quan chỉ
   được ghi vết + hiển thị nhãn cảnh báo, việc đánh giá mức độ vẫn thuộc M01.
3. **Liên kết sang M01 là FK thật** (`M25IssueRiskLink` → `M01RiskItem`/`M01OpportunityItem`) vì
   M01 đã chạy thật; liên kết sang M24 (mục tiêu) tạm lưu chuỗi vì M24 chưa lên nền tảng.
4. **"Đến hạn xem xét" là tính khi đọc** (derived) từ `monitoring_frequency` + lần cập nhật gần
   nhất — không lưu cột trạng thái quá hạn (mirror M04/M17/M20).
5. **Chưa làm chức năng xuất F25.01–F25.03** vì 3 biểu mẫu chưa được ban hành theo MP14 — xuất
   bản khi biểu mẫu chưa có sẽ tạo ra hồ sơ không có giá trị pháp lý.

## 10. Câu hỏi cần LĐV/QLCL chốt trước khi BUILD

1. **Ban hành `ETV.P25`**: đặc tả này có được dùng làm dự thảo đầu vào để soạn thủ tục chính thức
   theo MP14 không? (Nếu thủ tục ban hành khác đặc tả → đặc tả phải sửa theo thủ tục, không ngược lại.)
2. **Chu kỳ định kỳ**: 1 lần/năm trước Quý 4 (giả định hiện tại) hay 6 tháng/lần?
3. **Cấp phê duyệt**: LĐV phê duyệt một mình (giả định hiện tại, giống M16) hay đồng phê duyệt
   LĐV + TP (như mô hình M17)?
4. **Quy tắc 3** (chặn phê duyệt khi vấn đề mức Cao chưa liên kết M01) là **chặn cứng** hay chỉ
   **cảnh báo mềm**?
5. **Danh mục chuẩn** mục 4.1/4.2: có chốt đúng bộ giá trị này để đưa vào biểu mẫu F25.01/F25.02
   không, hay cần bổ sung nhóm đặc thù của Viện?
6. **Bên quan tâm đã có sẵn**: có danh sách bên quan tâm hiện hành nào đang dùng trên giấy để nhập
   liệu kỳ đầu tiên (kỳ gốc) không?
