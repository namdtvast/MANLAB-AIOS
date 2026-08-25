# Q1 — Danh mục phân loại tài liệu cho ngữ cảnh AI ngoài Viện

Trả lời câu hỏi **Q1** của [spec.md](spec.md): *tài liệu nào được phép đưa vào ngữ cảnh gửi tới
mô hình ngôn ngữ đặt ngoài hạ tầng của Viện, ai lập và duyệt.*

Trạng thái: **dự thảo, chưa ban hành**. Khi được duyệt sẽ ban hành thành **phụ lục của ETV.P29**
(dẫn chiếu ETV.P02 và ETV.P28) theo đúng quy trình MP14 — không sửa thẳng vào tài liệu đã ban hành.

Đề nghị: **PT.ATTT** soát xét · **LĐV** phê duyệt · rà soát lại 6 tháng/lần cùng chu kỳ xem xét ISMS.

---

## 1. Vì sao không dùng lại trường `permission` sẵn có

Repo đã có nhãn phân loại trong frontmatter tài liệu, nhưng nó **trả lời một câu hỏi khác**:

| Trường | Trả lời câu hỏi | Phân bố thực tế trong repo |
|---|---|---|
| `permission` | Ai **trong Viện** được đọc? | 194 `Noi-bo` · 2 `Cong-khai` · 10 rỗng · 2 khai sai định dạng (ghi danh sách vai trò) — trên 209 file có frontmatter |
| **Cần cho Copilot** | Nội dung có được **rời khỏi hạ tầng Viện** tới bên thứ ba không? | chưa có trường nào |

Dùng `permission` làm cổng sẽ rơi vào một trong hai cực đều vô dụng: chỉ cho `Cong-khai` thì
Copilot đọc được đúng **2 file**; cho cả `Noi-bo` thì mở gần như **toàn bộ**, kể cả thứ không được
phép ra ngoài. Hai câu hỏi độc lập nhau nên cần hai trường độc lập.

## 2. Trường mới: `ai_external`

Khai trong frontmatter tài liệu, ba giá trị:

| Giá trị | Copilot được gửi ra ngoài | Dùng cho |
|---|---|---|
| `allow` | Trích đoạn nội dung + metadata | Tài liệu mô tả *cách Viện làm*, không chứa dữ liệu thật |
| `index-only` | **Chỉ** mã, tiêu đề, phạm vi, đường dẫn — **không** nội dung | Tài liệu cần chỉ đường tới nhưng không được trích nội dung |
| `deny` | Không gì cả — **không xuất hiện trong chỉ mục** | Dữ liệu khách hàng, hồ sơ, dữ liệu cá nhân, bí mật kỹ thuật, tài liệu có bản quyền |

**Thiếu trường ⇒ hiểu là `deny`** (fail-closed). Không có giá trị mặc định "cho phép" ở bất kỳ đâu.

`index-only` là mức đáng giá nhất về mặt nghiệp vụ: Copilot vẫn trả lời được *"nội dung này quy
định tại ETV.M12, mở tại đường dẫn sau"* mà không một chữ nào của tài liệu rời khỏi Viện.

## 3. Danh mục phân loại theo lớp tài liệu

Quyết định theo **lớp**, không duyệt tay 209 file. Cột "Mặc định" là giá trị áp cho cả lớp; file
riêng lẻ khai nhãn khác thì nhãn của file thắng.

### 3.1. Cho phép (`allow`)

| Lớp tài liệu | Vị trí | Lý do |
|---|---|---|
| Sổ tay chất lượng | `03_MANAGEMENT_SYSTEM/01_QM` | Mô tả hệ thống theo ISO, không chứa dữ liệu thật |
| Thủ tục ETV.Pxx | `03_MANAGEMENT_SYSTEM/02_P` (23 file) | Đây chính là thứ Copilot cần trả lời; nội dung bám tiêu chuẩn |
| Biểu mẫu gốc **chưa điền** | `06_SHARED_RESOURCES/01_Forms`, `03_MANAGEMENT_SYSTEM/04_F` (81 + 5 file) | Là khung trống — không có dữ liệu |
| Hub thủ tục | `04_PROCESS_LIBRARY/MPxx/{README.md, manifest.yaml, links.yaml}` | Mục tiêu, chủ sở hữu, căn cứ, danh mục biểu mẫu |
| Đặc tả module | `05_MODULE_LIBRARY/Mxx/{README.md, 01_Requirement…07_Workflow}` | Đặc tả, không phải dữ liệu vận hành |
| Năng lực | `02_CAPABILITIES/CAP-xx` | Mô tả năng lực, đã dùng để công bố |
| Tri thức đã biên soạn | `08_KNOWLEDGE_GRAPH/Wiki`, `06_FAQ` | Bản tóm tắt nội bộ, không phải toàn văn tiêu chuẩn |
| Skill và prompt | `07_AI_OPERATING_SYSTEM/01_Skills` (13 file) | Không chứa dữ liệu nghiệp vụ |
| Kiến trúc repo | `README.md`, `ARCHITECTURE.md`, `_meta/` | Đã công khai qua GitHub Pages |

### 3.2. Chỉ chỉ đường (`index-only`)

| Lớp tài liệu | Vị trí | Lý do |
|---|---|---|
| **Quy trình kỹ thuật / SOP** | `03_MANAGEMENT_SYSTEM/03_M` (**84 file — lớp lớn nhất**) | Chứa tham số phương pháp, cách xử lý kỹ thuật — là bí quyết nghề nghiệp và lợi thế cạnh tranh. Nâng lên `allow` **theo từng file** khi LĐP chuyên môn xác nhận file đó chỉ diễn giải tiêu chuẩn công khai |
| Dữ liệu chuẩn dùng chung | `06_SHARED_RESOURCES/{03_Reference_Data, 05_Units, 09_Methods, 10_Standards}` | Chỉ đường được, nhưng nội dung có thể ràng buộc bản quyền |
| Nghiên cứu chưa công bố | `12_RESEARCH` | Ưu tiên sở hữu trí tuệ (MP27) — công bố trước là mất quyền ưu tiên |
| Hướng dẫn sử dụng thiết bị | `08_KNOWLEDGE_GRAPH/15_HDSD_ThietBi` | Tài liệu của nhà sản xuất, có bản quyền |

### 3.3. Cấm (`deny`)

| Lớp | Vị trí | Căn cứ |
|---|---|---|
| **Hồ sơ, biểu mẫu đã điền** | `03_MANAGEMENT_SYSTEM/05_R`, mọi hồ sơ phát hành | ISO/IEC 17025 §4.2; ETV.P02 mục 4.1 "Thông tin bảo mật" |
| **Dữ liệu nghiệp vụ trong CSDL nền tảng** | mọi bảng `M01…M38` | Ngoài phạm vi Increment 1; chứa dữ liệu thật |
| Thông tin khách hàng, hợp đồng, giá | `06_SHARED_RESOURCES/06_Customers`, MP07 | ISO/IEC 17025 §4.2 |
| Hồ sơ nhân sự, năng lực cá nhân | `06_SHARED_RESOURCES/08_Personnel`, MP03 | Nghị định 13/2023/NĐ-CP |
| Bằng chứng tuân thủ, hồ sơ đánh giá, KPH/CAPA | `11_COMPLIANCE/{03_Evidence, 04_Audit, 05_NC, 06_CAPA}` | Chứa phát hiện nội bộ, tên người, điểm yếu chưa khắc phục |
| **Toàn văn tiêu chuẩn ISO/TCVN/DLVN mua bản quyền** | `08_KNOWLEDGE_GRAPH/{00_RAW_DATA, 02_ISO, 03_DLVN, 04_TCVN, 14_Technical_References}` | Tái phân phối toàn văn là vi phạm bản quyền — kể cả trích đoạn dài |
| Thông tin an toàn thông tin | Cấu hình, sơ đồ mạng, tài khoản, khóa, `06_SHARED_RESOURCES/11_OCR_Models` nếu có dữ liệu huấn luyện thật | MP28; lộ là mở đường tấn công |
| Dữ liệu thiết bị gắn định danh khách hàng | `06_SHARED_RESOURCES/07_Equipment` khi có mã khách hàng | ISO/IEC 17025 §4.2 |

## 4. Quy tắc vận hành

| Mã | Quy tắc |
|---|---|
| **R1** | Fail-closed: không có nhãn ⇒ `deny`. Không bao giờ suy diễn "chắc là được". |
| **R2** | Nhãn của file thắng nhãn mặc định của lớp. Nhãn lớp khai một chỗ, không rải. |
| **R3** | Tài liệu `deny` **không nằm trong chỉ mục** — Copilot không biết nó tồn tại, không tiết lộ cả tiêu đề. |
| **R4** | Kể cả tài liệu `allow`, trích đoạn chứa dữ liệu cá nhân phải được che trước khi gửi (guardrail `GR-PII-OUT`, spec §6). |
| **R5** | Đổi nhãn: chủ sở hữu tài liệu đề nghị → PT.ATTT duyệt → ghi vết theo MP14. Không ai tự đổi nhãn tài liệu của người khác. |
| **R6** | Hạ nhãn (`allow` → `index-only`/`deny`) phải được gỡ khỏi chỉ mục **trong vòng 24 giờ**; có nút gỡ thủ công không chờ chu kỳ nạp lại. |
| **R7** | Tài liệu chưa ban hành (`doc_status ≠ issued`) mặc định `index-only` dù lớp của nó là `allow` — bản nháp không phải căn cứ để trả lời. |
| **R8** | Rà soát toàn danh mục 6 tháng/lần; rà soát bắt buộc ngoài chu kỳ khi mở rộng phạm vi Copilot sang dữ liệu nghiệp vụ. |

## 5. Cưỡng chế kỹ thuật (không dựa vào ý thức người dùng)

1. Script nạp chỉ mục đọc `ai_external` từ frontmatter: `allow` nạp nội dung, `index-only` chỉ nạp metadata, `deny` **bỏ qua hoàn toàn**.
2. Bổ sung kiểm tra vào CI: file trong lớp `allow` mà thiếu `ai_external` ⇒ cảnh báo; file nằm trong lớp `deny` mà khai `allow` ⇒ **lỗi**, chặn merge.
3. Kiểm thử nghiệm thu (bổ sung vào spec §10):
   - **AC-11** — đặt một tài liệu `deny`, hỏi đúng nội dung của nó ⇒ Copilot không trả lời được và không nhắc tới sự tồn tại của tài liệu đó.
   - **AC-12** — tài liệu `index-only` ⇒ câu trả lời chỉ có đường dẫn, không có câu chữ trích từ nội dung.
   - **AC-13** — file thiếu nhãn ⇒ không xuất hiện trong chỉ mục.

## 6. Việc phải làm để áp dụng

| # | Việc | Khối lượng | Người làm |
|---|---|---|---|
| 1 | Chốt danh mục lớp ở §3 | 1 buổi rà | PT.ATTT + LĐV |
| 2 | Khai nhãn lớp mặc định trong cấu hình nạp chỉ mục | nhỏ | Kỹ thuật |
| 3 | **Rà từng file `03_MANAGEMENT_SYSTEM/03_M`** để quyết `index-only` hay `allow` | **84 file — việc nặng nhất, nên chia theo lĩnh vực chuyên môn** | LĐP chuyên môn |
| 4 | Sửa 2 file khai `permission` sai định dạng (ghi danh sách vai trò thay vì mức phân loại) | 2 file | Kiểm soát tài liệu |
| 5 | Điền nhãn cho 10 file đang để `permission` rỗng | 10 file | Kiểm soát tài liệu |
| 6 | Ban hành phụ lục ETV.P29 theo MP14 | — | LĐV |

**Đường tới hạn:** việc số 3. Trước khi nó xong, Copilot vẫn chạy được với lớp `allow` ở §3.1
(sổ tay + 23 thủ tục + biểu mẫu trống + hub/đặc tả) — đủ để trả lời phần lớn câu hỏi tra cứu
thủ tục, và đây là cách bắt đầu mà không phải chờ rà hết 84 SOP.
