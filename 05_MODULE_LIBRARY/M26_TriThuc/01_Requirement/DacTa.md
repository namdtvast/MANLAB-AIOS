# M26_TriThuc — Đặc tả yêu cầu

> **Nguồn**: Thủ tục **`ETV.P26` — Quản lý tri thức tổ chức** đã **ban hành lần 01 ngày 23/08/2026**
> (`03_MANAGEMENT_SYSTEM/02_P/ETV.P26_QuanLyTriThuc.md`) cùng bộ biểu mẫu **`ETV.P.F26.01–F26.04`**
> trong `06_SHARED_RESOURCES/01_Forms/`. Căn cứ cấp trên: Sổ tay chất lượng
> `03_MANAGEMENT_SYSTEM/01_QM/ETV.QM_QuanlyChatluong.md` **§9.3 Quản lý tri thức tổ chức**; tiêu
> chuẩn áp dụng: ISO 9001 §7.1.6, ISO/IEC 17025 §6.2 và §8.5, ISO 17034, ISO/IEC 27001 §7.4 và
> A.5.9–A.5.12, ISO/IEC 42001 §7.1/§7.4/§8.1.
>
> Các giả định `[SUY DẪN]` của bản đặc tả trước đã được LĐV/QLCL chốt và đưa vào thủ tục ban hành
> (xem mục 10). **Thủ tục là nguồn sự thật**: nếu đặc tả lệch thủ tục thì sửa đặc tả, không sửa
> ngược lại.

## 1. Mục tiêu module

Số hóa MP26 — **đăng ký, phân loại, giao chủ sở hữu, duy trì hiệu lực, chia sẻ và kiểm soát khai
thác** tri thức tổ chức của Viện, để tri thức cần thiết cho vận hành và cho năng lực kỹ thuật luôn
**sẵn có, đúng phiên bản, đúng người, đúng mức bảo mật** — và không mất đi khi nhân sự thay đổi
(đúng QM §9.3 và ISO 9001 §7.1.6).

M26 là **sổ đăng ký (registry) tri thức, không phải kho nội dung**. Nội dung thật luôn nằm ở nơi đã
có nguồn sự thật: `08_KNOWLEDGE_GRAPH` (văn bản pháp luật, tiêu chuẩn, HDSD thiết bị, Wiki, FAQ,
Case study, Lessons Learned), **M14** (tài liệu kiểm soát), **M15** (hồ sơ), **M05** (HDSD/hồ sơ
thiết bị). M26 chỉ giữ **metadata + đường dẫn**, đúng nguyên tắc một nguồn sự thật của repo.

**Ranh giới**

| Module | M26 làm gì với nó | M26 **không** làm |
|---|---|---|
| **M25_BoiCanh** (cùng CAP-25) | Nhận nhu cầu tri thức phát sinh từ vấn đề bối cảnh | Không quản lý vấn đề bối cảnh/bên quan tâm (QM §9.2) |
| **M14_TaiLieu** | Trỏ tới tài liệu kiểm soát bằng `doc_ref` | Không tự đánh phiên bản, không tự ban hành tài liệu (MP14 giữ quyền đó) |
| **M15_HoSo** | Lưu hồ sơ hoạt động tri thức theo ETV.P15 | Không thay thế kiểm soát hồ sơ |
| **M27_TaiSanTT** | Kế thừa thang **phân loại bảo mật** và danh mục tài sản thông tin | Không tự định nghĩa thang bảo mật, không quản lý vòng đời dữ liệu/sao lưu |
| **M03_NhanSu** | Trỏ tới hồ sơ đào tạo khi việc bổ sung tri thức thực hiện bằng đào tạo | Không quản lý năng lực, đánh giá nhân sự, hồ sơ đào tạo |
| **M13 / M12 / M10 / M16** | Nhận **bài học kinh nghiệm** từ KPH, khiếu nại, kết quả ngoài kiểm soát, đánh giá | Không xử lý KPH/khiếu nại, không ra hành động khắc phục |
| **M29_AI** | Cấp nguồn tri thức **đã phê duyệt** cho chỉ mục AI và gỡ khi hết hiệu lực | Không huấn luyện/vận hành mô hình, không tự sinh tri thức |
| **M08 / M05 / M21** | Nhận tín hiệu phát sinh nhu cầu tri thức (phương pháp mới, thiết bị mới, mở rộng phạm vi) | Không phê duyệt phương pháp, thiết bị, phạm vi công nhận |

## 2. Đối tượng dữ liệu chính

Bốn thực thể nghiệp vụ + nhật ký. Trục chính là `KnowledgeItem` (mục tri thức); ba thực thể còn lại
là **ba dòng vào/ra** của nó: bài học kinh nghiệm (tri thức sinh ra từ thực tiễn), nhu cầu tri thức
(tri thức còn thiếu), hoạt động chia sẻ (tri thức được lan tỏa).

| Đối tượng | Mô tả | Biểu mẫu áp dụng (đã ban hành 23/08/2026) |
|---|---|---|
| `KnowledgeItem` | Mục tri thức trong danh mục tri thức tổ chức | F26.01 — Danh mục tri thức tổ chức |
| `LessonLearned` | Bài học kinh nghiệm rút ra từ một sự việc cụ thể | F26.02 — Phiếu bài học kinh nghiệm |
| `KnowledgeNeed` | Nhu cầu tri thức cần bổ sung và cách bổ sung | F26.03 — Phiếu xác định nhu cầu tri thức |
| `SharingEvent` | Hoạt động chia sẻ/chuyển giao tri thức | F26.04 — Biên bản chia sẻ tri thức |

### 2.1. `KnowledgeItem` — Mục tri thức

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `code` | string, duy nhất | tự sinh | vd `TT-2026-001` |
| `title` | string | có | Tên gọi tri thức, đủ nghĩa khi đứng một mình |
| `knowledge_form` | enum: Tri thức hiện / Tri thức ẩn | có | Mục 4.2 — quyết định trường bắt buộc kèm theo |
| `category` | enum | có | Mục 4.1 |
| `origin` | enum: Nội bộ / Bên ngoài | có | ISO 9001 §7.1.6 phân biệt hai nguồn |
| `summary` | text | có | Tóm tắt nội dung đủ để tìm kiếm — **không** chép toàn văn nội dung |
| `source_ref` | link | có **khi** `knowledge_form = Tri thức hiện` | Nơi lưu nội dung thật: `08_KNOWLEDGE_GRAPH/...`, M15, M05 — quy tắc 1 |
| `doc_ref` | ref → M14 | có **khi** tri thức là tài liệu kiểm soát | Quy tắc 2 |
| `holders[]` | ref User | có **khi** `knowledge_form = Tri thức ẩn`, ≥ 1 | Người đang giữ tri thức — quy tắc 3 |
| `owner` | ref User (TP) | có | Chịu trách nhiệm duy trì, cập nhật, rà soát |
| `criticality` | enum: Thấp / Trung bình / Cao | có | Mục 4.3 |
| `confidentiality` | enum | có | Kế thừa thang của M02/M27 — mục 4.4, quy tắc 9 |
| `applies_to[]` | ref → M08 / M05 / dịch vụ | không | Phương pháp, thiết bị, dịch vụ áp dụng tri thức này |
| `review_cycle` | enum: 6 tháng / Năm / 2 năm / Theo sự kiện | có | Quy tắc 4 |
| `last_reviewed_at` | date | tự ghi | Lần rà soát gần nhất (mốc tính hạn) |
| `ai_indexed` | bool | tự quản lý | Đã đưa vào chỉ mục AI — quy tắc 10 |
| `version` | int | tự sinh | Bắt đầu từ 1 |
| `supersedes_ref` | ref `KnowledgeItem` | tự gán | Phiên bản bị thay thế — quy tắc 5 |
| `status` | enum | tự quản lý | Mục 6 |
| `created_by` | ref User | tự ghi | Người lập |
| `reviewed_by` | ref User (TP ≠ người lập) | có, khi soát xét | |
| `approved_by` / `approved_at` | ref User / datetime | có, khi phê duyệt | Quy tắc 11 |

### 2.2. `LessonLearned` — Bài học kinh nghiệm

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `code` | string, duy nhất | tự sinh | |
| `title` | string | có | |
| `source_type` | enum | có | KPH/CAPA (← M13) · Khiếu nại (← M12) · Kết quả ngoài kiểm soát (← M10) · Đánh giá nội bộ/bên ngoài (← M16) · Sự cố thiết bị (← M05) · Sự cố ATTT (← M28) · Sự cố hệ thống AI (← M29) · Hợp đồng/dự án (← M07) · Nghiên cứu (← `12_RESEARCH`) |
| `source_ref` | ref/link | có | Bản ghi gốc ở module nguồn — quy tắc 6 |
| `context` | text | có | Sự việc đã xảy ra, ngắn gọn, không quy kết cá nhân |
| `root_cause_ref` | ref → M13 | không | Nếu nguyên nhân gốc đã phân tích ở M13 thì **trỏ**, không phân tích lại |
| `lesson` | text | có | Bài học rút ra — điều tổ chức phải nhớ |
| `recommended_action` | text | có | Việc nên làm khác đi lần sau |
| `knowledge_item_ref` | ref `KnowledgeItem` | có, khi phê duyệt | Mục tri thức được tạo mới/cập nhật từ bài học — quy tắc 7 |
| `share_required` | bool | có | Có phải tổ chức chia sẻ rộng không |
| `status` | enum: Mới / Đang phân tích / Chờ phê duyệt / Đã phê duyệt / Hủy | tự quản lý | Hủy bắt buộc lý do |

### 2.3. `KnowledgeNeed` — Nhu cầu tri thức

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `code` | string, duy nhất | tự sinh | |
| `trigger` | enum | có | Phương pháp mới (← M08) · Thiết bị mới (← M05) · Mở rộng phạm vi công nhận/chỉ định (← M21) · Nhân sự mới hoặc nghỉ việc (← M03) · Công nghệ/hệ thống AI mới (← M29, M32) · Thay đổi pháp luật/tiêu chuẩn (← `08_KNOWLEDGE_GRAPH`) · Vấn đề bối cảnh (← M25) · KPH lặp lại (← M13) |
| `trigger_ref` | ref/link | có | Bản ghi/căn cứ làm phát sinh nhu cầu |
| `description` | text | có | Tri thức còn thiếu là gì, thiếu ở đâu |
| `required_by` | date | có | Hạn cần có tri thức (thường gắn mốc của module nguồn) |
| `acquisition_method` | enum | có | Đào tạo nội bộ · Đào tạo bên ngoài · Tuyển dụng (← M03) · Thuê chuyên gia · Mua tài liệu/tiêu chuẩn (← M06) · Nghiên cứu nội bộ · Hợp tác – chuyển giao |
| `responsible` | ref User | có | Người chịu trách nhiệm bổ sung |
| `target_item_ref` | ref `KnowledgeItem` | có, khi là phiếu chuyển giao theo quy tắc 3 | **Đầu vào** — mục tri thức mà nhu cầu nhằm bổ sung/chuyển giao; gate mục 5.1.6 đếm theo trường này |
| `result_ref` | ref `KnowledgeItem` \| ref → M03 | có, khi đóng ở trạng thái Đã đáp ứng | **Đầu ra** — quy tắc 8 |
| `status` | enum: Mở / Đang bổ sung / Đã đáp ứng / Không thực hiện | tự quản lý | "Không thực hiện" bắt buộc lý do + LĐV duyệt |

### 2.4. `SharingEvent` — Hoạt động chia sẻ tri thức

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `code` | string, duy nhất | tự sinh | |
| `form` | enum | có | Sinh hoạt chuyên môn · Đào tạo nội bộ (← M03) · Kèm cặp – hướng dẫn · Bản tin/FAQ nội bộ · Phổ biến sau hội thảo bên ngoài · Bàn giao khi thay đổi nhân sự |
| `knowledge_item_refs[]` | ref `KnowledgeItem` | có, ≥ 1 | Chỉ chọn mục ở trạng thái **Đã phê duyệt** — quy tắc 12 |
| `held_at` | date | có | |
| `presenter` | ref User | có | Thường là `holders` hoặc `owner` của mục tri thức |
| `participants[]` | ref User | có | |
| `evidence_ref` | ref → M03 \| link | có **khi** `form = Đào tạo nội bộ` | Hồ sơ đào tạo nằm ở M03 (F03.05.x) — M26 **không** tạo biểu mẫu trùng |
| `effectiveness_note` | text | không | Ghi nhận hiệu quả/phản hồi |
| `status` | enum: Kế hoạch / Đã thực hiện / Hủy | tự quản lý | Hủy bắt buộc lý do |

### 2.5. `AuditLog`

Append-only, ghi mọi thao tác tạo/sửa/đổi trạng thái/bật–tắt chỉ mục AI trên cả 4 thực thể: ai, khi
nào, trường nào, giá trị trước → sau, lý do (khi bắt buộc). Riêng với mục `confidentiality ∈ {Hạn
chế, Mật}` còn ghi **lượt truy cập** (ai xem, khi nào) theo yêu cầu ISO/IEC 27001.

## 3. Vai trò

| Vai trò | Trách nhiệm chính |
|---|---|
| **QLCL** | Quản trị danh mục tri thức; tiếp nhận bài học kinh nghiệm và nhu cầu tri thức; theo dõi mục đến hạn rà soát; lưu hồ sơ theo ETV.P15 |
| **TP** (Trưởng phòng/phụ trách lĩnh vực) | `owner` của mục tri thức thuộc lĩnh vực; đề xuất, cập nhật, **soát xét** chuyên môn; tổ chức chia sẻ; đề xuất nhu cầu tri thức |
| **LĐV** | **Phê duyệt** mục tri thức và bài học kinh nghiệm; quyết định với mục `criticality = Cao`; duyệt "Không thực hiện" đối với nhu cầu tri thức |
| **Nhân viên** | Khai thác tri thức theo phân quyền; gửi đề xuất bài học kinh nghiệm; tham dự và xác nhận hoạt động chia sẻ |
| **Quản trị hệ thống** | Xem nhật ký; quản trị chỉ mục AI theo quyết định của LĐV/QLCL (không quyết định nội dung) |

Nguyên tắc tách vai trò: **người lập ≠ người phê duyệt** — thống nhất với M01/M10/M14/M16/M25.

## 4. Danh mục chuẩn

### 4.1. Phân nhóm tri thức (`category`) — ETV.P26 mục 5.1.1

| Nhóm | Ví dụ tại Viện | Nội dung thật thường nằm ở |
|---|---|---|
| Tri thức pháp lý – tiêu chuẩn | Luật Đo lường, TCVN/QCVN, ĐLVN, ISO, ILAC | `08_KNOWLEDGE_GRAPH/01–05, 12, 13` |
| Tri thức kỹ thuật đo lường – hiệu chuẩn – thử nghiệm | Quy trình đo, ước lượng độ không đảm bảo, xử lý mẫu | `08_KNOWLEDGE_GRAPH/14_Technical_References`, M08 |
| Tri thức vận hành thiết bị | HDSD, bảo trì, xử lý lỗi thiết bị | `08_KNOWLEDGE_GRAPH/15_HDSD_ThietBi`, M05 |
| Bài học kinh nghiệm và tình huống | KPH, khiếu nại, sự cố, kết quả ngoài kiểm soát | `08_KNOWLEDGE_GRAPH/11_Lessons_Learned`, `07_Case_Study` |
| Tri thức hệ thống quản lý | Cách áp dụng ISO nội bộ, kinh nghiệm chuẩn bị đánh giá | `03_MANAGEMENT_SYSTEM`, M14 |
| Tri thức khách hàng – thị trường – dịch vụ | Yêu cầu đặc thù, câu hỏi thường gặp | `08_KNOWLEDGE_GRAPH/06_FAQ`, M12 |
| Tri thức số hóa – dữ liệu – AI | Cấu hình nền tảng, prompt/skill, kinh nghiệm vận hành AI | `07_AI_OPERATING_SYSTEM`, M29, M32 |
| Tri thức nghiên cứu – phát triển | Đề tài, kết quả nghiên cứu, chuyển giao công nghệ | `12_RESEARCH` |

### 4.2. Dạng tri thức (`knowledge_form`)

| Dạng | Đặc điểm | Ràng buộc riêng |
|---|---|---|
| **Tri thức hiện** (tường minh) | Đã được ghi lại thành tài liệu/dữ liệu | Bắt buộc `source_ref` hoặc `doc_ref` (quy tắc 1, 2) |
| **Tri thức ẩn** (kinh nghiệm cá nhân) | Nằm ở con người, chưa văn bản hóa | Bắt buộc `holders[]` ≥ 1; `criticality = Cao` + 1 người giữ ⇒ quy tắc 3 |

### 4.3. Mức trọng yếu (`criticality`) và hành động yêu cầu — ETV.P26 mục 5.1.3

| Mức | Ý nghĩa | Hành động bắt buộc |
|---|---|---|
| Thấp | Mất đi không ảnh hưởng đáng kể | Ghi nhận, rà soát theo chu kỳ |
| Trung bình | Ảnh hưởng tới hiệu quả một quá trình/phòng | Có `owner` theo dõi; khuyến nghị chia sẻ trong phòng |
| **Cao** | Mất đi ảnh hưởng tới **năng lực kỹ thuật, phạm vi công nhận/chỉ định hoặc khả năng cung cấp dịch vụ** | Bắt buộc rà soát ≤ 1 năm; nếu là tri thức ẩn và chỉ 1 người giữ ⇒ mở rủi ro ở **M01** + lập `KnowledgeNeed` chuyển giao trước khi phê duyệt (quy tắc 3) |

Thang cố ý **3 mức**, không lặp lại ma trận chấm điểm R = S × P của M01 — M26 chỉ sàng lọc mức
trọng yếu, việc đánh giá và xử lý rủi ro là nghiệp vụ của M01.

### 4.4. Phân loại bảo mật (`confidentiality`)

Dùng **nguyên** thang phân loại thông tin của M02/M27/M28 (Công khai · Nội bộ · Hạn chế · Mật) —
M26 **không** định nghĩa thang riêng (quy tắc 9). Nếu M27 ban hành thang khác, M26 sửa theo M27.

## 5. Quy tắc nghiệp vụ

1. **Đăng ký, không sao chép**: `KnowledgeItem` chỉ lưu metadata + `summary` + đường dẫn. Tri thức
   hiện thiếu cả `source_ref` lẫn `doc_ref` ⇒ **chặn lưu**. Cấm dán toàn văn tài liệu/tiêu chuẩn vào
   `summary` (vi phạm nguyên tắc một nguồn sự thật, và có thể vi phạm bản quyền tiêu chuẩn).
2. **Tài liệu kiểm soát do M14 giữ quyền**: khi mục tri thức là tài liệu kiểm soát, bắt buộc
   `doc_ref` → M14; M26 **không** tự đánh phiên bản, **không** phê duyệt nội dung tài liệu đó. Tài
   liệu ở M14 chuyển Hết hiệu lực ⇒ mục tri thức tương ứng tự gắn cờ **Cần rà soát**
   (ETV.P26 mục 5.1.8).
3. **Không để tri thức trọng yếu nằm ở một người**: mục có `knowledge_form = Tri thức ẩn`,
   `criticality = Cao` và `holders` chỉ **một** người ⇒ phải có ≥ 1 liên kết rủi ro sang **M01** và
   ≥ 1 `KnowledgeNeed` với `acquisition_method` mang tính chuyển giao (kèm cặp/đào tạo nội bộ/văn
   bản hóa) trước khi được phê duyệt — hệ thống **chặn cứng** thao tác phê duyệt
   (ETV.P26 mục 5.1.6, đã chốt là chặn cứng chứ không phải cảnh báo mềm).
4. **Rà soát định kỳ**: mọi mục Đã phê duyệt phải rà soát theo `review_cycle`, mặc định theo mức
   trọng yếu — **Cao ≤ 1 năm · Trung bình 2 năm · Thấp theo sự kiện** (6 tháng cho tri thức thay đổi
   nhanh: pháp luật, công nghệ, AI). Quá hạn ⇒ gắn cờ **Đến hạn rà soát** (tính khi đọc từ
   `last_reviewed_at` + `review_cycle`, **không** lưu cột riêng) và cảnh báo `owner`; quá **2 chu
   kỳ** ⇒ cảnh báo LĐV. Hệ thống **không** tự chuyển mục sang Hết hiệu lực — quyết định lỗi thời là
   của con người (ETV.P26 mục 5.1.5).
5. **Cập nhật là tạo phiên bản mới**: mục đã phê duyệt **không sửa đè**. Muốn thay đổi nội dung ⇒
   tạo phiên bản mới (`version + 1`, `supersedes_ref` trỏ bản cũ); khi bản mới được phê duyệt, bản
   cũ tự chuyển **Hết hiệu lực** và tự **gỡ khỏi chỉ mục AI**. Bản cũ vẫn tra cứu được làm bằng
   chứng. Riêng mục có `doc_ref` → phiên bản đi theo M14/MP14, M26 chỉ cập nhật liên kết.
6. **Bài học kinh nghiệm không được rơi rụng**: khi module nguồn đóng một KPH mức nặng (M13), một
   khiếu nại có cơ sở (M12), một kết quả ngoài kiểm soát (M10) hoặc một KPH của đánh giá (M16),
   M26 tự tạo `LessonLearned` ở trạng thái **Mới** và giao QLCL. Đây là **cảnh báo mềm**: M26 không
   chặn thao tác của module nguồn (ranh giới trách nhiệm) — ETV.P26 mục 5.2.1.
7. **Bài học phải kết tinh thành tri thức**: `LessonLearned` chỉ được phê duyệt khi có
   `knowledge_item_ref` (tạo mới hoặc cập nhật một mục hiện có). Bài học không vào danh mục tri thức
   thì không có giá trị đối với tổ chức (ETV.P26 mục 5.2.2).
8. **Nhu cầu tri thức phải có đầu ra**: `KnowledgeNeed` chỉ chuyển **Đã đáp ứng** khi có
   `result_ref` (mục tri thức mới hoặc hồ sơ đào tạo ở M03). Chuyển **Không thực hiện** bắt buộc lý
   do và do **LĐV** duyệt. Nhu cầu quá `required_by` mà còn Mở/Đang bổ sung ⇒ cảnh báo LĐV
   (ETV.P26 mục 5.3.3).
9. **Bảo mật kế thừa, không tự định nghĩa**: `confidentiality` lấy theo thang của M02/M27/M28. Mục
   **Hạn chế/Mật** chỉ hiển thị cho vai trò được phép, mọi lượt xem đều ghi nhật ký, và **không bao
   giờ** được đưa vào chỉ mục AI.
10. **Chỉ mục AI có kiểm soát (← M29)**: `ai_indexed = true` chỉ được bật khi `status = Đã phê
    duyệt` **và** `confidentiality ∈ {Công khai, Nội bộ}`. Khi mục chuyển **Hết hiệu lực/Hủy**, việc
    gỡ khỏi chỉ mục (`08_KNOWLEDGE_GRAPH/09_Embedding`, `10_Vector_DB`) phải thực hiện **trong cùng
    giao dịch** — nếu không, trợ lý AI sẽ trả lời bằng tri thức lỗi thời. AI được phép *gợi ý* mục
    tri thức từ tài liệu/hồ sơ sẵn có và *đánh dấu* mục nghi lỗi thời; AI **không** tạo bản ghi
    chính thức, **không** soát xét, **không** phê duyệt (ISO/IEC 42001; ràng buộc MP29).
11. **Tách vai trò**: `created_by ≠ approved_by`; `reviewed_by` là TP khác người lập; **mọi mục tri
    thức đều do LĐV phê duyệt**, không ủy quyền cho TP ở bất kỳ mức trọng yếu nào
    (ETV.P26 mục 4.1 và 5.1.7).
12. **Chỉ chia sẻ tri thức đã phê duyệt**: `SharingEvent` chỉ được chọn mục tri thức ở trạng thái Đã
    phê duyệt. Nếu hoạt động là **đào tạo nội bộ**, hồ sơ chính thức lập ở **M03** (F03.05.x) và
    M26 chỉ trỏ bằng `evidence_ref` — không lập biểu mẫu trùng.
13. **Ghi vết và lưu hồ sơ**: mọi thao tác ghi `AuditLog` append-only; hồ sơ danh mục tri thức, phiếu
    bài học, phiếu nhu cầu, biên bản chia sẻ lưu theo **ETV.P15**. Số liệu khai thác (lượt xem, lượt
    chia sẻ) dùng để đánh giá **tình trạng tri thức**, không dùng để đánh giá cá nhân.

## 6. Trạng thái `KnowledgeItem`

| STT | Trạng thái | Ý nghĩa | Người thao tác | Điều kiện chuyển | Bắt buộc lý do |
|---|---|---|---|---|---|
| 1 | Nháp | Đang soạn | QLCL, TP | Đủ trường bắt buộc theo `knowledge_form` → Chờ soát xét | Không |
| 2 | Chờ soát xét | Chờ TP lĩnh vực kiểm tra | TP (≠ người lập) | Đạt → Chờ phê duyệt; Không đạt → Không soát xét | — |
| 3 | Không soát xét | Bị trả lại | Người lập | Sửa → Chờ soát xét | **Có** |
| 4 | Chờ phê duyệt | Chờ thẩm quyền | **LĐV** (mọi mức trọng yếu) | Đạt → Đã phê duyệt (chặn nếu vi phạm quy tắc 3); Không đạt → Không phê duyệt | — |
| 5 | Không phê duyệt | Bị trả lại | Người lập | Sửa → Chờ soát xét | **Có** |
| 6 | Đã phê duyệt | Có hiệu lực, khai thác được, **chỉ đọc** | — | Phiên bản mới được phê duyệt → Hết hiệu lực (tự động); hoặc người có thẩm quyền tuyên bố lỗi thời → Hết hiệu lực | — |
| 7 | Hết hiệu lực | Lỗi thời/bị thay thế — **tự gỡ khỏi chỉ mục AI** | LĐV/QLCL | (kết thúc — vẫn tra cứu được làm bằng chứng) | **Có** khi tuyên bố lỗi thời |
| 8 | Hủy | Bỏ mục trước khi phê duyệt | LĐV | (kết thúc) | **Có** |

Cờ **Đến hạn rà soát** không phải trạng thái — là thuộc tính tính khi đọc trên mục Đã phê duyệt
(quy tắc 4).

Trạng thái các thực thể phụ: `LessonLearned` (Mới → Đang phân tích → Chờ phê duyệt → Đã phê duyệt /
Hủy) · `KnowledgeNeed` (Mở → Đang bổ sung → Đã đáp ứng / Không thực hiện) · `SharingEvent` (Kế
hoạch → Đã thực hiện / Hủy). Mọi nhánh Hủy/Không thực hiện bắt buộc lý do.

## 7. Đầu ra

| Đầu ra | Định dạng | Ghi chú |
|---|---|---|
| F26.01 — Danh mục tri thức tổ chức | PDF/Excel | Mục tri thức theo nhóm, dạng, mức trọng yếu, chủ sở hữu, chu kỳ rà soát |
| F26.02 — Phiếu bài học kinh nghiệm | PDF | Sự việc, bài học, khuyến nghị, mục tri thức kết tinh |
| F26.03 — Phiếu xác định nhu cầu tri thức | PDF | Nhu cầu, cách bổ sung, người chịu trách nhiệm, hạn, kết quả |
| F26.04 — Biên bản chia sẻ tri thức | PDF | Hình thức, nội dung, người trình bày, người tham dự |
| Báo cáo tình hình tri thức phục vụ M17 | Dữ liệu/PDF | Tri thức mới, mục hết hiệu lực, nhu cầu chưa đáp ứng, hoạt động chia sẻ trong kỳ |
| Bảng mục đến hạn rà soát | Màn hình | Tính khi đọc theo `review_cycle` (quy tắc 4) |
| Bảng **rủi ro mất tri thức** | Màn hình/PDF | Mục `criticality = Cao` là tri thức ẩn, số người giữ ≤ 1 — đầu vào M01 |

**Bốn biểu mẫu F26.01–F26.04 đã ban hành** (lần 01, ngày 23/08/2026) tại
`06_SHARED_RESOURCES/01_Forms/ETV.P.F26.0{1..4}_*.md` — bản xuất của module phải khớp bố cục và
danh mục chuẩn của biểu mẫu gốc. Hoạt động đào tạo nội bộ dùng lại **F03.05.x** của M03, không tạo
biểu mẫu mới.

## 8. Liên kết

Quy trình: **MP26** (`ETV.P26`, ban hành lần 01 ngày 23/08/2026) · Năng lực:
**CAP-25_BoiCanhTriThuc** (dùng chung với MP25/M25) · Căn cứ cấp trên: `ETV.QM_QuanlyChatluong.md`
§9.3 · Tiêu chuẩn: ISO 9001 §7.1.6,
ISO/IEC 17025 §6.2 (năng lực) và §8.5 (rủi ro/cơ hội), ISO/IEC 27001 §7.4 và A.5.9–A.5.12 (tài sản
thông tin, phân loại, xử lý), ISO/IEC 42001 §7.1/§7.4 (nguồn lực và thông tin cho hệ thống AI),
ISO 17034 · Lưu hồ sơ: **ETV.P15** · Nhóm menu: `NGUON_LUC` (manifest MP26).

**Đầu vào từ**: M13 (KPH/CAPA) · M12 (khiếu nại, phản hồi) · M10 (kết quả ngoài kiểm soát) ·
M16 (đánh giá nội bộ/bên ngoài) · M05 (sự cố, HDSD thiết bị) · M08 (phương pháp mới) ·
M21 (mở rộng phạm vi công nhận/chỉ định) · M03 (biến động nhân sự) · M25 (vấn đề bối cảnh) ·
M28/M29 (sự cố ATTT, hệ thống AI mới) · `08_KNOWLEDGE_GRAPH` (pháp luật, tiêu chuẩn, HDSD, Wiki).

**Đầu ra sang**: M01 (rủi ro mất tri thức trọng yếu) · M03 (nhu cầu đào tạo) · M17 (nội dung tri
thức trong xem xét lãnh đạo) · M29 + `08_KNOWLEDGE_GRAPH/09_Embedding, 10_Vector_DB` (nguồn tri
thức đã phê duyệt cho trợ lý AI) · M14 (đề nghị văn bản hóa tri thức ẩn thành tài liệu kiểm soát).

**Không thuộc M26**: nội dung tài liệu (M14) · hồ sơ (M15) · danh mục và vòng đời tài sản dữ liệu
(M27) · năng lực và hồ sơ đào tạo nhân sự (M03) · bối cảnh tổ chức (M25) · xử lý rủi ro (M01) ·
hành động khắc phục (M13).

## 9. Trạng thái triển khai

**Đã xây Increment 1–11 trên `09_ENGINEERING/aios-platform`** (ngày 24/08/2026), module chuyển
`ACTIVE`:

| Vùng | Nội dung |
|---|---|
| `prisma/schema.prisma` | 8 model `M26*` + 14 enum; khóa ngoại thật sang M14 (tài liệu), M01 (rủi ro), M03 (hồ sơ đào tạo), M13 (KPH nguồn bài học) |
| `prisma/migrations/` | `20260823205019_m26_tri_thuc`, `20260823..._m26_need_target_item` — chỉ thêm bảng/cột |
| `prisma/seed.ts` | `M26` vào `ACTIVE_MODULE_CODES`; 5 mục tri thức phủ đủ nhánh kiểm thử, 2 bài học, 2 nhu cầu, 1 hoạt động chia sẻ; vai trò M26 cho QLCL/TP/LĐV/QTHT/Nhân viên |
| `src/lib/m26/` | `rules.ts` (toàn bộ gate, thuần hàm) · `actions.ts` (server action + nhật ký) · `labels.ts` · `actor.ts` |
| `src/app/(platform)/modules/M26/` | 8 màn: danh mục · chi tiết · thêm/sửa mục · đến hạn rà soát · rủi ro mất tri thức · bài học · nhu cầu · chia sẻ |

**Chưa xây**: Increment 12 (hook mềm từ M13/M12/M10/M16 tự sinh bài học — AC13) và Increment 13
(xuất biểu mẫu F26.01–F26.04, trích xuất báo cáo cho M17), tách PR riêng để revert độc lập. Việc
nạp/gỡ chỉ mục AI thật ở `08_KNOWLEDGE_GRAPH/09_Embedding, 10_Vector_DB` thuộc M29 — M26 chỉ quản
cờ `ai_indexed`.

Kết quả kiểm thử 13/14 tiêu chí chấp nhận (AC13 chưa chạy vì thuộc Increment 12):
`01_Requirement/_work/20260823-dac-ta-m26/verify.md`. Đặc tả kỹ thuật và kế hoạch increment:
cùng thư mục `_work` (`outcome.md`, `spec.md`, `plan.md`).

## 10. Quyết định đã chốt và câu hỏi còn mở

**Đã chốt và đưa vào `ETV.P26` (ban hành 23/08/2026):**

| # | Nội dung | Quyết định | Điều khoản thủ tục |
|---|---|---|---|
| 1 | Ban hành thủ tục | `ETV.P26` ban hành lần 01 ngày 23/08/2026; đặc tả này là đầu vào, thủ tục là nguồn sự thật | Toàn văn |
| 2 | Thẩm quyền phê duyệt | **LĐV phê duyệt mọi mục tri thức**, không ủy quyền TP theo mức trọng yếu | 4.1, 5.1.7, 6.1 |
| 3 | Quy tắc 3 (tri thức ẩn trọng yếu, 1 người giữ) | **Chặn cứng** phê duyệt tới khi có rủi ro ở M01 + phiếu F26.03 chuyển giao | 5.1.6, 7 |
| 4 | Chỉ mục AI | Chỉ mục nhận mức **Công khai + Nội bộ**; Hạn chế/Mật cấm tuyệt đối; gỡ chỉ mục trong cùng giao dịch khi hết hiệu lực | 5.5 |
| 5 | Chu kỳ rà soát | Theo mức trọng yếu: Cao ≤ 1 năm · Trung bình 2 năm · Thấp theo sự kiện (6 tháng cho tri thức thay đổi nhanh) | 5.1.5 |
| 6 | Bộ biểu mẫu | F26.01 Danh mục · F26.02 Bài học kinh nghiệm · F26.03 Nhu cầu tri thức · F26.04 Biên bản chia sẻ; đào tạo nội bộ dùng F03.05.x | 8 |
| 7 | Thời hạn lưu hồ sơ | F26.01 vĩnh viễn trên ManLab · F26.02 10 năm · F26.03 05 năm sau khi đóng · F26.04 05 năm | 9 |

**Còn mở — cần chốt trước hoặc trong quá trình BUILD:**

1. **Phạm vi danh mục kỳ đầu**: đăng ký toàn bộ tri thức hiện có, hay bắt đầu từ nhóm trọng yếu
   (kỹ thuật đo lường, vận hành thiết bị, bài học kinh nghiệm) rồi mở rộng dần?
2. **Thang bảo mật**: M27/M02 đã chốt đủ 4 mức (Công khai · Nội bộ · Hạn chế · Mật) chưa, để M26 kế
   thừa đúng tên gọi? Thủ tục đang dẫn chiếu thang này (mục 5.1.4) mà không định nghĩa lại.
3. **Danh mục chuẩn mục 4.1**: bộ 8 nhóm tri thức đã đủ chưa, hay cần tách nhóm đặc thù (ví dụ tách
   riêng chất chuẩn/ISO 17034)?
