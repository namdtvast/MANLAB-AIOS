---
id: ETV.P.F14.01
title: "Phiếu đề nghị ban hành văn bản — Hướng dẫn ETV.GAI 01 Tích hợp máy chủ mô hình AI nội bộ vào ManLab AIOS"
type: Bieu-mau
process: MP14_TaiLieu
module: M14_TaiLieu
revision: "01"
effective_date: "30/08/2026"
status: Da-phe-duyet
knowledge_category: HTQL-noi-bo
permission: Noi-bo
source: "Viện Kiểm định Công nghệ và Môi trường (ETV)"
related_documents: [ETV.P14, ETV.P26, ETV.P28, ETV.P29, ETV.P33, ETV.P34, ETV.P35, ETV.GAI01, ETV.GAI02, ETV.P.F14.02, ETV.P.F14.04, ETV.P.F14.06]
---

# PHIẾU ĐỀ NGHỊ BAN HÀNH VĂN BẢN

Bản đã điền theo `ETV.P.F 14.01` (ETV.P14 §6.6.1 bước 1–2, trình tiếp bước 4–5).

| Trường | Nội dung |
|---|---|
| Mã văn bản đề nghị | **ETV.GAI 01** *(là mã đề xuất tại thời điểm trình; nay là **mã chính thức** — vướng mắc 2 đã xử lý, xem mục 5)* |
| Tên văn bản | Hướng dẫn Tích hợp máy chủ mô hình AI nội bộ vào ManLab AIOS |
| Loại văn bản | ☒ Hướng dẫn |
| Loại đề nghị | ☒ Xây dựng mới |
| Người đề nghị / biên soạn | Dương Thành Nam |
| Ngày đề nghị | 30/08/2026 |
| Trạng thái hiện tại của văn bản | `Nháp`, lần ban hành 01, `effective_date` để trống |
| Thủ tục chủ trì | **ETV.P29** (Quản lý hệ thống trí tuệ nhân tạo) |
| Thủ tục liên quan | ETV.P28, ETV.P33, ETV.P34, ETV.P35, ETV.P26, ETV.P06, ETV.P13, ETV.P15 |

> **Phiếu này lập bù cho bước 1–2.** Văn bản đã được soạn thảo (bước 3) và soát xét nội bộ nhiều lượt trước khi có phiếu đề nghị — không đúng thứ tự ETV.P14 §6.6.1. Nêu ra ở đây để LĐP thẩm định trên hiện trạng thật, không trình bày như thể quy trình đã đi đủ bước.

---

## 1. LÝ DO ĐỀ NGHỊ BAN HÀNH

**Máy chủ đã vận hành thật, hướng dẫn thì chưa có hiệu lực.** Từ 30/08/2026 Viện đang chạy máy chủ mô hình AI nội bộ (`Qwen/Qwen2.5-7B-Instruct` trên vLLM v0.10.2 / RTX 3090, công bố tại `https://ai.manlab.vn/v1`) và đã phục vụ ManLab AIOS. Toàn bộ luật chơi cho hạ tầng này — chọn mô hình, kiểm soát chuỗi cung ứng, công bố endpoint, kiểm soát nhật ký, đăng ký nền tảng, đánh giá tác động, định tuyến theo mức phân loại dữ liệu, dự phòng khi mất khả dụng — hiện chỉ tồn tại trong một **bản Nháp**.

Đây chính là tình huống ISO/IEC 42001:2023 §8.1 yêu cầu tránh: quá trình liên quan hệ thống AI phải được hoạch định, kiểm soát và **có tài liệu có hiệu lực**. Vận hành trước, ban hành sau là một điểm không phù hợp có thể nêu được trong đánh giá.

**Không có văn bản hiện hành nào phủ nội dung này.** ETV.P29 điều chỉnh vòng đời hệ thống AI ở mức thủ tục; ETV.P33/P35 điều chỉnh tài sản và nền tảng số nói chung. Không văn bản nào nói cụ thể một máy chủ GPU tự vận hành phải đi qua những cổng kiểm soát nào để trở thành nhà cung cấp mô hình được AIOS sử dụng.

---

## 2. TÓM TẮT NỘI DUNG VĂN BẢN TRÌNH

Sáu bước triển khai, mỗi bước kết bằng một **Cổng kiểm soát (Gate)**; không đạt Gate thì không sang bước sau:

| Bước | Nội dung | Gate | Hồ sơ |
|---|---|---|---|
| 1 | Kiểm kê và nghiệm thu hạ tầng | Hệ điều hành nhận đúng GPU, VRAM đúng 24 GB | F33.01, F33.02, F33.03, F28.04 |
| 2 | Triển khai inference engine trong container | Mô hình nạp được, cổng 8000 chỉ nghe `127.0.0.1` | Ghim image + digest, checksum mô hình |
| 3 | Công bố endpoint an toàn | 200 khi đúng khoá, 401 khi sai; engine không truy cập được từ ngoài | F28.01 |
| 3b | Kiểm soát nhật ký và dữ liệu tạm | Phép thử chuỗi mồi không tìm thấy trong nhật ký | — |
| 4 | Đăng ký trong AIOS | `AIPlatform` + `AIProvider` + `AIModel` khớp nhau, sức khoẻ `HEALTHY` | F35.01, F35.02, F29.01 |
| 5 | Đánh giá tác động, kiểm thử, đo hiệu năng | AIA đã phê duyệt; năm tình huống hỏng TC01–TC05 đều đạt | F29.02, F29.03 |
| 6 | Phê duyệt và đưa vào sử dụng | Thẩm quyền theo mức tác động của Agent (ETV.P29 §6) | — |

**Ba điều cấm tuyệt đối** (§3.1): frontend không gọi thẳng máy chủ mô hình; không publish cổng inference engine ra Internet; không hard-code tên mô hình trong Copilot/Agent/Workflow.

**Điểm kiểm soát quan trọng nhất** (§3.7): định tuyến theo mức phân loại dữ liệu. Dữ liệu mức **Hạn chế** và **Mật** không đưa vào hệ thống AI dưới bất kỳ hình thức nào — căn cứ **ETV.P26 mục 5.5** và **ETV.P28 mục 6.13**, cả hai đã ban hành. Khi máy chủ nội bộ mất khả dụng, **không** chuyển sang nền tảng dự phòng có trần thấp hơn mức dữ liệu đang xử lý: mất dịch vụ là sự cố chấp nhận được, gửi dữ liệu vượt trần thì không.

**Không lập biểu mẫu mới.** Toàn bộ hồ sơ dùng biểu mẫu sẵn có của P28/P29/P33/P35 — đúng nguyên tắc một nguồn sự thật.

---

## 3. KẾT QUẢ TỰ KIỂM THEO CHECKLIST SOÁT XÉT

Chạy `checklist_document_review.md` (skill `s14-kiem-soat-tai-lieu`, bản đang chạy đã đối chiếu khớp bản trong repo, 0 chỗ lệch).

| # | Hạng mục | Kết quả |
|---|---|---|
| 1 | Loại văn bản xác định đúng | **Đạt** — Hướng dẫn, tài liệu HTQL, áp thể thức nội bộ ETV (P14 §6.4) |
| 2 | Mã số theo quy tắc mã hoá, không trùng | **Vướng** — xem vướng mắc 2 |
| 3 | Đủ metadata bắt buộc (P14 §6.3) | **Đạt** — đủ 14 trường bắt buộc; `effective_date` để trống là đúng với `status: Nháp` |
| 4 | Không mâu thuẫn/trùng lặp văn bản hiện hành | **Đạt có điều kiện** — xem vướng mắc 3 |
| 5 | Căn cứ pháp lý/ISO nêu đúng điều khoản | **Cần người soát xét đối chiếu** — công cụ của repo kiểm được trích dẫn ETV.Pxx §y.z, **không** kiểm được điều khoản ISO (bản gốc tiêu chuẩn không có trong hệ thống) |
| 6 | Vai trò/trách nhiệm khớp RACI ETV.P14 III | **Đạt** — văn bản không định nghĩa RACI riêng, dẫn chiếu thẩm quyền phê duyệt về ETV.P29 §6 |
| 7 | Không chép nguyên văn luật/ISO | **Đạt** — chỉ dẫn chiếu; câu trích duy nhất là từ thủ tục nội bộ ETV.P28 mục 6.13 |
| 8 | Ngôn ngữ rõ ràng, không để trống mục bắt buộc | **Đạt** — §3.2 nêu tường minh các thông tin còn thiếu phải điền khi kiểm kê F33.01, không tự suy đoán |
| 9 | Bản soát xét văn bản cũ: ghi rõ thay đổi | **Không áp dụng** — xây dựng mới; bảng "Những thay đổi đã có" vẫn ghi đủ 4 lượt sửa trong giai đoạn Nháp |

Kiểm tra tự động chạy ngày 30/08/2026, tính cả phiếu này: `validate_links.py` 565 link / **0 vấn đề**; `validate_citations.py --chan` 919 trích dẫn điều khoản trên 48 thủ tục / **0 hỏng**.

> **Giới hạn phải biết:** bộ kiểm chỉ quét tệp `.md`; trong phạm vi đó nó bắt được "mục không tồn tại" nhưng **không** bắt được "mục có thật nhưng sai mục". Quét sạch không đồng nghĩa với trích dẫn đúng.
>
> Lượt soát xét 30/08/2026 phát hiện tay một lỗi rơi đúng vào khe hở thứ nhất: một ghi chú trong mã nguồn (`prisma/seed.ts`) dẫn điều khoản của ETV.P28 về hạn chế truy cập của trợ lý AI bằng số mục **5.13**, trong khi mục đúng là **ETV.P28 §6.13** — và bản thân số 5.13 không tồn tại trong thủ tục. Vì câu đó nằm trong tệp `.ts`, công cụ không nhìn thấy; cùng câu ấy đặt trong tệp `.md` thì đã bị chặn ngay. Đã sửa.

---

## 4. BỐN VƯỚNG MẮC PHẢI QUYẾT TRƯỚC KHI BAN HÀNH

### Vướng mắc 1 — Thủ tục chủ trì chưa có hiệu lực *(quyết định)*

| Văn bản | Vai trò với GAI 01 | Trạng thái |
|---|---|---|
| **ETV.P29** | **Thủ tục chủ trì** | **Chờ soát xét** |
| ETV.P33 | Kiểm kê tài sản, F33.01–04 | **Chờ soát xét** |
| ETV.P34 | Quản lý dữ liệu số | **Chờ soát xét** |
| ETV.P35 | Đăng ký nền tảng, F35.01–04 | **Chờ soát xét** |
| ETV.P28 | ATTT, F28.01/03/04 | Đã ban hành 26/08/2026 |
| ETV.P26 | Tri thức tổ chức | Đã ban hành 23/08/2026 |
| ETV.P14 | Kiểm soát tài liệu | Đã ban hành 01/07/2026, lần 03 |

GAI 01 dẫn chiếu dày đặc tới **F29.01–04, F33.01–04, F35.01–02** — biểu mẫu của những thủ tục **chưa có hiệu lực**. Ban hành hướng dẫn cấp dưới trước thủ tục mẹ tạo ra dẫn chiếu treo: đoàn đánh giá mở GAI 01 thấy "lập F29.02" rồi hỏi F29.02 có hiệu lực từ bao giờ, và câu trả lời là chưa.

**Ba phương án trình LĐV:**

| PA | Cách làm | Đánh đổi |
|---|---|---|
| **A** | **Ban hành theo chùm** — trình ETV.P29 (kèm P33, P34, P35) ban hành trước hoặc cùng lượt; `effective_date` của GAI 01 **không sớm hơn** ngày hiệu lực của ETV.P29 | Chậm hơn, phải hoàn tất soát xét 4 thủ tục. Đúng thứ bậc tài liệu, không tạo dẫn chiếu treo |
| **B** | Ban hành GAI 01 ngay, chấp nhận dẫn chiếu tới thủ tục chưa hiệu lực | Nhanh nhất. Để lại một điểm không phù hợp có thể nêu được trong đánh giá ISO/IEC 42001 |
| **C** | Giữ GAI 01 ở `Nháp`, dùng như tài liệu kỹ thuật nội bộ tới khi ETV.P29 ban hành | An toàn về hình thức, nhưng máy chủ **đang chạy thật** mà không có hướng dẫn có hiệu lực nào — chính là rủi ro nêu ở mục 1 |

**Khuyến nghị: PA A.** Bốn thủ tục đều đã ở `Chờ soát xét`, tức phần soạn thảo đã xong và việc còn lại là soát xét — chi phí để đi PA A thấp hơn nhiều so với ấn tượng ban đầu. PA B đổi một tuần chờ lấy một phát hiện đánh giá tồn tại vĩnh viễn trong hồ sơ; PA C giữ nguyên đúng cái rủi ro mà việc ban hành này sinh ra để xử lý.

### Vướng mắc 2 — Mã `ETV.GAI 01` chưa có căn cứ trong ETV.P14 §6.2 *(quyết định)*

ETV.P14 §6.2 quy định Hướng dẫn mã hoá theo mẫu **`ETV.Gb xx`**, trong đó `b` là **một** ký hiệu lĩnh vực (A-Không khí, W-Nước, M-Khối lượng, F-Lưu lượng, O-Quang, S-Thời gian–Tần số, T-Nhiệt độ, P-Áp suất, E-Điện, H-Độ ẩm…). Mã `ETV.GAI 01` lệch hai điểm: `AI` là **hai** ký tự, và **không phải lĩnh vực đo lường** mà là lĩnh vực công nghệ.

Việc đã không còn là cá biệt: `ETV.GAI 02` (Hướng dẫn Kiến trúc tri thức và ngữ nghĩa AI) đã dùng cùng tiền tố. Hai văn bản dùng một ký hiệu chưa có căn cứ thì nên hợp thức hoá, không nên tiếp tục coi là ngoại lệ.

Bổ sung `AI` vào bảng §6.2 đòi **ban hành lại ETV.P14 lần 04** — thủ tục này đang có hiệu lực nên không sửa trực tiếp được. Đây là **đề nghị riêng**, không gộp vào phiếu này.

Trong khi chờ, LĐV chọn một:
- ☐ Chấp nhận `ETV.GAI 01` là mã tạm, Văn thư/QLCL cấp số chính thức sau khi ETV.P14 lần 04 bổ sung ký hiệu `AI`;
- ☐ Đổi sang một ký hiệu đã có trong bảng §6.2 *(không có ký hiệu nào phù hợp về ngữ nghĩa — nêu ra cho đủ phương án)*;
- ☐ Lập đề nghị ban hành lại ETV.P14 lần 04 trước, ban hành GAI 01 sau.

### Vướng mắc 3 — Phụ thuộc một phiếu chưa được phê duyệt *(cần biết)*

GAI 01 §3.7 dẫn: *"Câu cho phép trước đây tại ETV.P34 mục 6.8 đã được sửa cho khớp (dự thảo 25/08/2026, phiếu `ETV.P.F14.01_2026-08-25_P29_P34_DuLieuHanChe`)"*. Phiếu đó đang **chờ phê duyệt**.

Lập luận cấm dữ liệu mức Hạn chế của GAI 01 **không phụ thuộc** vào phiếu này — nó đứng trên ETV.P26 mục 5.5 và ETV.P28 mục 6.13, cả hai đã ban hành. Nhưng nếu LĐV **không** phê duyệt bản sửa ETV.P34 mục 6.8, thì mâu thuẫn P29–P34 vẫn còn và §3.7 của GAI 01 dẫn chiếu tới một bản sửa không tồn tại.

**Đề nghị:** xem xét hai phiếu **cùng lượt**, phê duyệt phiếu 25/08 trước hoặc đồng thời.

### Vướng mắc 4 — Điều kiện áp dụng chưa đủ hồ sơ *(cần biết)*

Máy chủ công bố endpoint qua **Cloudflare Tunnel** (Phương án C của §3.4 Bước 3). Chính §3.4 Bước 3 đặt ba điều kiện bắt buộc cho phương án này, và **cả ba chưa có hồ sơ**:

1. Ghi lại luồng dữ liệu thật (nơi kết thúc TLS, nhà cung cấp có ghi nhật ký nội dung không, lưu ở đâu, bao lâu);
2. Đăng ký nhà cung cấp đường hầm là nền tảng thuê ngoài theo ETV.P35, đánh giá nhà cung cấp theo ETV.P06;
3. Ghi rủi ro vào F28.01 và hạ trần mức bảo mật §3.7 tương ứng.

Điều này **không cản việc ban hành văn bản** — văn bản quy định đúng, phần thiếu là hồ sơ vận hành. Nhưng LĐP cần biết: cho tới khi có ba hồ sơ trên, nền tảng chỉ được nhận dữ liệu mức **Công khai**. Phần mềm đã cưỡng chế điều này (ranh giới dữ liệu của nền tảng đang đặt ở mức siết nhất; nới lên đòi số hồ sơ F29.02), nên hiện trạng là fail-closed đúng thiết kế, không phải lỗ hổng.

---

## 5. VIỆC PHẢI LÀM SAU KHI PHÊ DUYỆT

**Theo quyết định của LĐV tại mục 8 (PA A + ban hành lại ETV.P14 trước), GAI 01 CHƯA ban hành ngày 30/08/2026.** Hai điều kiện tiên quyết phải xong trước, theo đúng thứ tự:

| TT | Điều kiện tiên quyết | Trách nhiệm | Trạng thái 30/08/2026 |
|---|---|---|---|
| **ĐK1** | **ETV.P14 ban hành lại lần 04**, bổ sung ký hiệu `AI` vào §6.2 | LĐP → LĐV | ✅ **HOÀN THÀNH 30/08/2026** — lần 04 có hiệu lực theo phiếu [`ETV.P.F14.01_2026-08-30_P14_KyHieuLinhVucAI`](ETV.P.F14.01_2026-08-30_P14_KyHieuLinhVucAI.md). `ETV.GAI 01` nay là mã chính thức |
| **ĐK2** | **ETV.P29 có hiệu lực** (kèm P33, P34, P35 để hết dẫn chiếu treo) | LĐP → LĐV | ✅ **HOÀN THÀNH 30/08/2026** — xem bảng dưới |

**Theo dõi ĐK2 — cập nhật 30/08/2026:**

| Thủ tục | Vai trò với GAI 01 | Trạng thái |
|---|---|---|
| **ETV.P29** | Thủ tục **chủ trì**; biểu mẫu F29.01–04 (Bước 4, 5) | ✅ Ban hành lần 01, hiệu lực 30/08/2026 |
| ETV.P33 | Kiểm kê tài sản; biểu mẫu F33.01–04 (Bước 1, 2) | ✅ Ban hành lần 01, hiệu lực 30/08/2026 |
| ETV.P34 | Quản lý dữ liệu số (Bước 3b) | ✅ Ban hành lần 01, hiệu lực 30/08/2026 |
| ETV.P35 | Đăng ký nền tảng; biểu mẫu F35.01–02 (Bước 4) | ✅ Ban hành lần 02, hiệu lực 30/08/2026 |

**ĐK2 HOÀN THÀNH.** Cả bốn thủ tục có hiệu lực từ 30/08/2026 — không còn dẫn chiếu treo: F29.01–04, F33.01–04, F35.01–02 nay đều thuộc thủ tục đang hành. Hồ sơ ban hành chùm: [`ETV.P.F14.01_2026-08-30_P33_P34_P35_ChumQuanTriSo`](ETV.P.F14.01_2026-08-30_P33_P34_P35_ChumQuanTriSo.md).

> **ĐỦ CẢ ĐK1 VÀ ĐK2 — `ETV.GAI 01` đủ điều kiện ban hành.** Bước còn lại theo ETV.P14 §6.6.1 bước 6–9, do Văn thư/QLCL thực hiện: cấp số chính thức, đặt `effective_date` và chuyển `status` sang `Da-phe-duyet`, cập nhật `ETV.P.F 14.02`, phân phối và phổ biến. **Phiếu này không thực hiện thay các bước đó.**

Đủ ĐK1 và ĐK2 rồi mới chạy tiếp ETV.P14 §6.6.1 bước 6–9 và `checklist_document_release.md`:

| # | Việc | Trách nhiệm | Biểu mẫu |
|---|---|---|---|
| 1 | Cấp mã số chính thức theo ký hiệu `AI` đã được ETV.P14 lần 04 hợp thức hoá (ĐK1) | Văn thư/QLCL | — |
| 2 | Đặt `effective_date` **không sớm hơn ngày hiệu lực của ETV.P29** (ĐK2), `revision: 01`, chuyển `status` sang **`Da-phe-duyet`** | Văn thư/QLCL | — |
| 3 | Cập nhật danh mục văn bản nội bộ | Văn thư/QLCL | `ETV.P.F 14.02` |
| 4 | Xác nhận thời hạn lưu và nhóm quyền truy cập | QLCL | `ETV.P.F 14.06` |
| 5 | Phân phối, đóng dấu kiểm soát (nếu phát hành bản in) | NTH/QLCL | `ETV.P.F 14.04` |
| 6 | Phổ biến cho nhân sự vận hành máy chủ và người quản trị AI | NTH | Biên bản phổ biến |
| 7 | Lưu bản gốc | QLCL | Cặp công văn đi |

> **Về mục 2 — dùng `Da-phe-duyet`, không dùng `Da-ban-hanh`.** Bảng trạng thái tại `M14_TaiLieu/07_Workflow/StateMachine.md` (được ETV.P14 §6.3 dẫn chiếu là nguồn duy nhất) chỉ có 7 giá trị, và giá trị cho văn bản có hiệu lực là **"Đã phê duyệt"** — không có giá trị nào tên "Đã ban hành".
>
> Thực tế trong `03_MANAGEMENT_SYSTEM/` đang tồn tại **hai từ vựng song song**: 76 văn bản ghi `Da-ban-hanh`, 41 văn bản ghi `Da-phe-duyet`. Đây là **phát hiện ngoài phạm vi phiếu này**, nêu để LĐP biết và xử lý riêng; không sửa hàng loạt trong lượt ban hành GAI 01.

### 5.1. Trạng thái của GAI 01 trong thời gian chờ — một khe hở của bảng trạng thái

Bảng trạng thái M14 có đúng 7 giá trị và **không có giá trị nào cho tình huống "đã được phê duyệt nội dung nhưng chưa đủ điều kiện ban hành"**:

| Giá trị | Vì sao không dùng được cho GAI 01 lúc này |
|---|---|
| `Đã phê duyệt` | ETV.P14 §6.5 định nghĩa giá trị này là "**có hiệu lực, đã công bố**". Đặt bây giờ là tuyên bố một hiệu lực chưa có |
| `Nháp` | Sai theo hướng ngược lại — văn bản đã qua soát xét (mục 7) và được LĐV cho ý kiến (mục 8) |

**Xử lý:** giữ GAI 01 ở **`Cho-phe-duyet`** cho tới khi đủ ĐK1 và ĐK2. Giá trị này sai ít nhất và **fail-closed** — không văn bản nào tuyên bố hiệu lực mà nó chưa có. Quyết định phê duyệt nội dung ngày 30/08/2026 được ghi tại mục 8 của phiếu này, không ghi vào trường `status`.

**Đề nghị riêng cho LĐP:** khe hở này sẽ lặp lại với mọi văn bản ban hành theo chùm. Cân nhắc bổ sung một trạng thái "Đã phê duyệt — chờ hiệu lực" vào `M14_TaiLieu/07_Workflow/StateMachine.md` ở lần soát xét kế tiếp. Không xử lý trong phiếu này.

---

## 6. Ý KIẾN LĐP (thẩm định sự cần thiết — ETV.P14 §6.6.1 bước 2)

☐ Không cần thiết — lý do: .....................

☒ **Cần thiết** — phân công:

| Vai trò | Người được phân công | Thời hạn hoàn thành |
|---|---|---|
| Người biên soạn | Dương Thành Nam | 30/08/2026 |
| Người soát xét | Trần Thị Hoa (LĐP) | 30/08/2026 |

Chữ ký LĐP: **Trần Thị Hoa** Ngày: 30/08/2026

## 7. KẾT QUẢ SOÁT XÉT (LĐP — bước 4)

☒ **Đạt** → chuyển `Chờ phê duyệt` · ☐ Không đạt → **Không soát xét** (bắt buộc lý do): .....................

Người soát xét: **Trần Thị Hoa (LĐP)** · Ngày: 30/08/2026

Ý kiến về mục 3 (kết quả tự kiểm) và mục 4 (bốn vướng mắc): .....................

## 8. KẾT QUẢ PHÊ DUYỆT (LĐV — bước 5)

**Về nội dung văn bản:** ☒ **Phê duyệt** · ☐ Không phê duyệt (bắt buộc lý do): .....................

**Về vướng mắc 1 (thủ tục chủ trì chưa hiệu lực):** ☒ **PA A — ban hành theo chùm cùng ETV.P29** · ☐ PA B — ban hành ngay · ☐ PA C — giữ Nháp tới khi ETV.P29 ban hành

**Về vướng mắc 2 (mã số):** ☐ Chấp nhận mã tạm `ETV.GAI 01` · ☒ **Lập đề nghị ban hành lại ETV.P14 lần 04 bổ sung ký hiệu `AI` trước**

**Về vướng mắc 3:** ☐ Xem xét cùng lượt với phiếu `ETV.P.F14.01_2026-08-25_P29_P34_DuLieuHanChe` · ☐ Xử lý riêng *(chưa quyết — đề nghị LĐV cho ý kiến khi xem xét phiếu 25/08)*

Người phê duyệt: **TS. Nguyễn Hoàng Giang — Viện trưởng (LĐV)** · **Ngày phê duyệt: 30/08/2026**

Lần ban hành: 01 · **Ngày ban hành: chưa ấn định** — theo PA A, ấn định sau khi đủ ĐK1 và ĐK2 tại mục 5 · Chữ ký LĐV: .....................

> **Tóm tắt quyết định ngày 30/08/2026:** LĐV **phê duyệt nội dung** Hướng dẫn ETV.GAI 01, nhưng **chưa ban hành**. Văn bản chờ hai điều kiện: ETV.P14 ban hành lại lần 04 (hợp thức hoá ký hiệu `AI`) và ETV.P29 có hiệu lực. Trong thời gian chờ, GAI 01 giữ `status: Cho-phe-duyet` (mục 5.1).

---

*Bản dự thảo do AI hỗ trợ soạn. Theo ETV.P29 §1.3 nguyên tắc 1 ("Con người quyết định cuối cùng") và ETV.P14 §6.9, AI chỉ đề xuất và kiểm tra — không soát xét, không phê duyệt, không tự cấp mã số, không tự chuyển trạng thái văn bản.*
