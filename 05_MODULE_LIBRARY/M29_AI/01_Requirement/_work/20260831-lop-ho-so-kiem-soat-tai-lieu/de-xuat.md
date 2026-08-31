# Đề xuất sửa bảng lớp tài liệu — mở lớp hồ sơ kiểm soát tài liệu vào chỉ mục Copilot

> **Bản dự thảo trình duyệt — chưa có hiệu lực.** Do AI soạn theo yêu cầu, dựa trên đối chiếu các
> thủ tục đã ban hành. Người ký ở mục 9 phải là người thật; trợ lý AI không gán mức phân loại,
> không phân loại mức tác động và không phê duyệt (ETV.P27 §5.3, ETV.P30 §5.3).
>
> Ngày dự thảo: 31/08/2026 · Người đề nghị: *(điền)* · Trình: PT.ATTT, QLCL, Lãnh đạo Viện.

## 1. Việc trình

Ngày 31/08/2026, 6 phiếu `ETV.P.F14.01` đã điền (kèm 2 tệp PDF bản ký) được chuyển từ
`03_MANAGEMENT_SYSTEM/04_F/` sang [`03_MANAGEMENT_SYSTEM/05_R/F14_TaiLieu/`](../../../../../03_MANAGEMENT_SYSTEM/05_R/F14_TaiLieu/)
cho đúng tầng — biểu mẫu **đã điền** là hồ sơ, không phải biểu mẫu.

Hệ quả không mong muốn: `05_R` nằm trong danh sách **BLOCKED** của bộ nạp chỉ mục Copilot, nên
3 phiếu ở trạng thái `Da-phe-duyet` trước đây Copilot dẫn được nay rơi khỏi chỉ mục. Đây là hành vi
fail-closed đúng thiết kế, nhưng lý do chặn thì **không đứng vững khi đối chiếu thủ tục** (mục 3).

### 1.1. Đếm lại ngày 31/08/2026 (đối chiếu lần hai, sau PR #195, #197, #199)

Thư mục nay có **7 phiếu `.md` + 2 PDF**. Không phải phiếu nào cũng vào được chỉ mục kể cả khi lớp
được mở — bộ nạp đòi **đồng thời** `status ∈ {Da-phe-duyet, issued, Ban-hanh}` và
`permission ∈ {Cong-khai, Noi-bo}`:

| # | Phiếu | `status` | `permission` | Vào chỉ mục nếu mở lớp? |
|---|---|---|---|---|
| 1 | `2026-07-01_P14_BoSungPhuLuc` | **không có frontmatter** | — | ✗ fail-closed |
| 2 | `2026-08-11_MCF08_DoMucTuDong` | **không có frontmatter** | — | ✗ fail-closed |
| 3 | `2026-08-25_P29_P34_DuLieuHanChe` | `Cho-phe-duyet` | `Noi-bo` | ✗ chưa phê duyệt |
| 4 | `2026-08-30_GAI01_MayChuMoHinhAI` | `Da-phe-duyet` | `Noi-bo` | ✓ |
| 5 | `2026-08-30_P14_KyHieuLinhVucAI` | `Da-phe-duyet` | `Noi-bo` | ✓ |
| 6 | `2026-08-30_P33_P34_P35_ChumQuanTriSo` | `Da-phe-duyet` | `Noi-bo` | ✓ |
| 7 | `2026-08-31_F03.08_DoiChieuManLab` | `Nhap` | `Noi-bo` | ✗ còn nháp |
| — | 2 tệp PDF bản ký | — | — | ✗ bộ nạp chỉ đọc `.md` |

**Số phiếu thực sự vào chỉ mục vẫn là 3**, không đổi so với bản trình đầu — phiếu mới của PR #195
đang ở trạng thái `Nhap`. Đối chiếu lần hai sau khi PR #197 và #199 hợp nhất: hai PR đó không thêm,
bớt hay đổi trạng thái phiếu nào trong thư mục, nên **con số 3 giữ nguyên**.

Lần đếm này không đọc bằng mắt: trạng thái lấy từ khối frontmatter của từng file, còn tiêu chí lọc
đối chiếu thẳng vào hằng số trong bộ nạp — `APPROVED_STATUS = {Da-phe-duyet, issued, Ban-hanh}`,
`VALID_LEVELS = {Cong-khai, Noi-bo}`, và dòng `05_R` trong `BLOCKED` — chứ không chép lại từ bản
trình trước. Cả ba khớp với bảng trên.

**Phát hiện thêm khi đếm: 2 phiếu ở mục 1 và 2 tự ghi trong thân văn bản là "ĐÃ KÝ — HỒ SƠ CHÍNH
THỨC", có đủ chữ ký soát xét và phê duyệt LĐV, nhưng KHÔNG có khối frontmatter nào.** Với bộ nạp,
thiếu nhãn là bị loại (fail-closed, đúng thiết kế). Nhưng đây là lỗi hồ sơ độc lập với đề xuất này:
hai hồ sơ chính thức đang không mang metadata kiểm soát theo ETV.P14 §6.3. Đề nghị giao Kiểm soát
tài liệu bổ sung frontmatter cho đúng, không gộp vào thay đổi này.

> **Nói cho gọn con số này, vì hai cách đếm ra hai kết quả khác nhau.** Trong 7 phiếu, có **5 phiếu
> đã được phê duyệt trên thực tế** (3 phiếu mang `status: Da-phe-duyet` + 2 phiếu ký tay không có
> frontmatter), nhưng **chỉ 3 phiếu đếm được bằng máy**. Chênh lệch 2 phiếu đó không phải sai sót
> khi đếm — nó chính là mức độ của lỗi hồ sơ nêu ngay trên: hai hồ sơ đã ký của Viện hiện **vô
> hình** với mọi công cụ lọc theo trạng thái, kể cả khi lớp `05_R/F14_TaiLieu` được mở.
>
> Nghĩa là **mở lớp thôi chưa đủ**: duyệt PA2 mà không bổ sung frontmatter cho hai phiếu đó thì
> Copilot vẫn chỉ dẫn được 3/5 hồ sơ đã ký.

Trình xin ý kiến về việc sửa bảng lớp tài liệu tại
[`scripts/nap-chi-muc-copilot.ts`](../../../../../09_ENGINEERING/aios-platform/scripts/nap-chi-muc-copilot.ts)
và bổ hồ sơ quản trị còn thiếu.

## 2. Hiện trạng — hai cổng nối tiếp, không phải một

Điểm này quyết định cách hiểu toàn bộ đề xuất, nên đặt lên trước.

| Cổng | Ở đâu | Quyết định điều gì | Trạng thái hiện tại |
|---|---|---|---|
| **A — Nạp chỉ mục** | `nap-chi-muc-copilot.ts`, hằng `ALLOWED` / `BLOCKED` | Tài liệu nào được **ghi vào** chỉ mục | `05_R` nằm trong `BLOCKED` ⇒ phiếu F14.01 không được ghi |
| **B — Truy hồi lúc chạy** | `mucDuocGui()` trong `src/lib/m29/copilot/retrieval.ts`, đọc `AIPlatform.dataBoundary` | Đoạn trích nào được **gửi ra** dịch vụ mô hình | Cả 3 nền tảng (`GEMINI_API`, `ANTHROPIC_API`, `MANLAB_LOCAL_LLM`) đều ở `EXTERNAL_NO_COMMITMENT` ⇒ **chỉ mức Công khai** được truy hồi |

**Hệ quả phải nói thẳng:** cổng B hiện siết hơn cổng A. Sửa riêng cổng A thì phiếu F14.01 vào được
chỉ mục nhưng **vẫn không xuất hiện trong câu trả lời nào**, vì mọi đoạn mức Nội bộ đều bị cổng B
chặn — kể cả 23 thủ tục và sổ tay chất lượng đang nằm trong chỉ mục hôm nay.

Cổng B chỉ nới được bằng `datRanhGioiDuLieu()` với **số hồ sơ F29.02 cụ thể** (ETV.P29 §5.5: điều
khoản "không dùng dữ liệu để huấn luyện lại" của nhà cung cấp phải được nêu trong AIA). Hồ sơ đó
hiện **chưa có** — bản ghi `AIA-2026-003` trong seed tự ghi rõ không được coi là hồ sơ đã phê duyệt
hợp lệ.

Ghi chú kỹ thuật: bộ nạp chỉ đọc tệp `.md`, nên 2 tệp PDF bản ký **không vào chỉ mục trong mọi
phương án** — bản ký chỉ để đối chiếu và lưu theo ETV.P15.

## 3. Ba phát hiện khi đối chiếu thủ tục đã ban hành

### 3.1. Lý do chặn dẫn sai điều khoản

Chuỗi lý do đang ghi: *"Hồ sơ đã điền — Hạn chế/Mật theo ETV.P02 §4.1"*.

ETV.P02 §4.1 là **bảng thuật ngữ**, chia nhị phân *Thông tin bảo mật* / *Thông tin công khai*. Mục
này đỡ được kết luận "hồ sơ là thông tin không công khai" — nhưng **mức Nội bộ cũng đã là không
công khai**. Mục này không dựng thang 4 mức, nên không suy ra được "Hạn chế/Mật".

Thang 4 mức thuộc **ETV.P27 §6.2** — chính ETV.P28 §4.1 ghi "định nghĩa và tiêu chí gán mức thuộc
ETV.P02/ETV.P27; thủ tục này sử dụng nguyên, không định nghĩa lại", và bảng thay đổi của ETV.P27
(lần ban hành 01, 26/08/2026) ghi thủ tục này "xác lập thang phân loại thông tin chuẩn của Viện".

Đây đúng lớp lỗi mà `validate_citations.py` **không bắt được**: mục dẫn tới có thật, nên người đọc
mở ra thấy hợp lệ và tin luôn.

### 3.2. Mức tối thiểu của chính nhóm dữ liệu này là Nội bộ, không phải Hạn chế

ETV.P27 §6.1.3 — bảng mức phân loại **tối thiểu** theo nhóm dữ liệu nghiệp vụ:

| Nhóm dữ liệu | Ví dụ tại Viện | Mức tối thiểu |
|---|---|---|
| Dữ liệu hệ thống quản lý | **Tài liệu, hồ sơ ISO, đánh giá nội bộ** | **Nội bộ** |

Phiếu `ETV.P.F14.01` là hồ sơ hệ thống quản lý đúng nghĩa: ghi văn bản nào được đề nghị soát
xét/ban hành, lý do, ai soạn, ai soát xét, ai duyệt. Không chứa dữ liệu khách hàng, không chứa kết
quả đo, không chứa hồ sơ nhân sự — tức là không chạm nhóm nào mà §6.1.3 đặt tối thiểu Hạn chế/Mật.

Chặn theo **thư mục** đang gán cho lớp này một mức cao hơn mức tối thiểu. Nâng mức tự nó không sai
(chủ sở hữu được gán cao hơn tối thiểu), nhưng phải có người gán, có căn cứ và có bản ghi — hiện
không có.

### 3.3. Lỗ hổng lớn hơn: chưa lớp nào có bản ghi tài sản

ETV.P29 §5.5 đòi nguồn cấp cho AI phải là **tài sản dữ liệu đã đăng ký** theo ETV.MP27/ETV.MP34
hoặc **tri thức đã phê duyệt** theo ETV.MP26. ETV.P27 §6.9.2 đòi đồng thời ba điều kiện: được đánh
dấu *cho phép dùng cho AI* · trạng thái *Đang sử dụng* · mức ∈ {Công khai, Nội bộ}.

Hiện **chưa có bản ghi `ETV.P.F27.01` nào** cho bất kỳ lớp nào trong 7 lớp `ALLOWED`. Quy tắc đang
sống trong một hằng số TypeScript chứ không trong danh mục tài sản đã phê duyệt. Đây là thiếu sót
rộng hơn câu hỏi ban đầu và cần xử lý dù đề xuất này được duyệt hay không.

## 4. Phương án

### PA1 — Gỡ nguyên dòng `05_R` khỏi `BLOCKED`

Đơn giản nhất, **không khuyến nghị**. `05_R` sẽ nhận hồ sơ của mọi thủ tục về sau — F03 nhân sự,
F07 hợp đồng, F10 kết quả đảm bảo chất lượng — đúng những nhóm mà ETV.P27 §6.1.3 đặt tối thiểu
Hạn chế/Mật. Mở theo thư mục là mở sẵn cửa cho hồ sơ **chưa tồn tại**, trái nguyên tắc fail-closed
đang là nền của cả bộ nạp.

### PA2 — Thêm lớp con `05_R/F14_TaiLieu`, giữ phần còn lại của `05_R` bị chặn ✅ **Khuyến nghị**

Thêm một lớp vào `ALLOWED`:

| Trường | Giá trị |
|---|---|
| `code` | `HO_SO_KSTL` |
| `label` | Hồ sơ kiểm soát tài liệu (phiếu F14.01 đã ký) |
| `roots` | `03_MANAGEMENT_SYSTEM/05_R/F14_TaiLieu` |
| `defaultLevel` | `Noi-bo` |
| `requireApproved` | `true` |

Giữ nguyên dòng `05_R` trong `BLOCKED`; bộ nạp xét `ALLOWED` cho đường dẫn cụ thể hơn, mọi thư mục
con khác của `05_R` vẫn chặn mặc định. Phạm vi mở đúng bằng nhóm dữ liệu đã có mức tối thiểu Nội bộ
tại §6.1.3, không rộng hơn một thư mục.

**Lý do chọn:** mức Nội bộ ở đây không do đề xuất này đặt ra — nó là mức tối thiểu đã ghi tại
ETV.P27 §6.1.3 cho nhóm "hồ sơ ISO". PA2 chỉ đưa hiện trạng kỹ thuật về đúng thủ tục và bổ hồ sơ
đang thiếu, không nới thêm quyền nào mới.

### PA3 — Giữ nguyên chặn, chỉ sửa lại trích dẫn cho đúng

Sửa chuỗi lý do thành *"Hồ sơ đã điền — mức theo ETV.P27 §6.2; lớp này Viện chủ động gán trên mức
tối thiểu §6.1.3"*, không mở lớp nào. An toàn tuyệt đối, nhưng Copilot mất khả năng dẫn lịch sử ban
hành — đúng loại câu hỏi hay được hỏi ("ETV.P14 đổi gì ở lần ban hành 04, theo phiếu nào"). Chấp
nhận được nếu Lãnh đạo Viện muốn hoãn tới khi rà xong 84 SOP ở `03_M`.

### Việc phải làm ở cả ba phương án

Sửa chuỗi lý do dẫn sai điều khoản (mục 3.1) tại `nap-chi-muc-copilot.ts` và
[`03_MANAGEMENT_SYSTEM/05_R/README.md`](../../../../../03_MANAGEMENT_SYSTEM/05_R/README.md):
`ETV.P02 §4.1` → `ETV.P27 §6.2` (thang phân loại) và `ETV.P27 §6.1.3` (mức tối thiểu theo nhóm).
Sửa trích dẫn không đổi hành vi hệ thống, nhưng để nguyên thì mọi lập luận dựa lên nó đều mượn một
căn cứ không có.

## 5. Phạm vi thay đổi kỹ thuật nếu duyệt PA2

| # | Việc | Tệp | Đổi hành vi? |
|---|---|---|---|
| 1 | Sửa chuỗi lý do dẫn sai điều khoản | `nap-chi-muc-copilot.ts`, `05_R/README.md` | Không |
| 2 | Thêm lớp `HO_SO_KSTL` vào `ALLOWED` | `nap-chi-muc-copilot.ts` | Có — cổng A |
| 3 | Lập bản ghi `ETV.P.F27.01` cho lớp tài sản này | Hồ sơ giấy/ManLab | Không |
| 4 | Lập hồ sơ `ETV.P.F29.02` và đặt `dataBoundary` = `EXTERNAL_WITH_COMMITMENT` qua `datRanhGioiDuLieu()` | Giao diện M29 | Có — cổng B |
| 5 | Chạy lại `npm run nap-chi-muc-copilot` | — | Có hiệu lực |

Việc 4 nằm ngoài phạm vi đề xuất này về mặt quyết định (nó mở mức Nội bộ cho **toàn bộ** chỉ mục,
không riêng lớp F14) nhưng **là điều kiện cần** để việc 2 có tác dụng quan sát được. Trình kèm để
Lãnh đạo Viện thấy trọn đường dây, không để việc 2 được duyệt rồi không ai hiểu vì sao không có gì
thay đổi.

## 6. Đánh giá tác động tóm tắt

Chi tiết tại [`F30.02_ban-nhap.md`](F30.02_ban-nhap.md). Mức tác động đề nghị: **Mức 2** theo
ETV.P30 §6.2.1 (nâng cấp phần mềm dùng chung, ảnh hưởng từ hai phòng trở lên; không chạm hiệu lực
kết quả đã phát hành, không chạm dữ liệu khách hàng, không chạm phạm vi công nhận). Mức 2 kéo theo:
đánh giá tác động đầy đủ, bắt buộc ≥ 01 rủi ro tại ETV.P01, bắt buộc phương án quay lui, **Lãnh đạo
Viện phê duyệt**, và xác nhận hiệu lực bằng `F30.03` (ETV.P30 §6.2.2).

Phân loại mức tác động thuộc thẩm quyền QLCL — con số trên là **đề nghị**, không phải kết luận.

## 7. Rủi ro và phương án quay lui

| Rủi ro | Đánh giá | Xử lý |
|---|---|---|
| Hồ sơ khác lọt vào `05_R/F14_TaiLieu` về sau, mang dữ liệu nhạy hơn | Thấp — thư mục chỉ nhận phiếu F14.01 theo quy ước tại `05_R/README.md` | Ràng thêm `accept:` khớp đúng tiền tố `ETV.P.F14.01_` |
| Phiếu chứa **họ tên, chức danh** người ký ⇒ dữ liệu cá nhân cơ bản (ETV.P27 §6.4) | Chấp nhận được ở mức Nội bộ | Guardrail `GR-PII-OUT` chỉ bắt CCCD/điện thoại/thư điện tử, **không** bắt họ tên — phải nêu trong F29.02 thay vì trông vào guardrail |
| Mở cổng B nới mức Nội bộ cho toàn chỉ mục, không riêng lớp này | **Đây là rủi ro chính** | Tách quyết định: duyệt việc 2 không đương nhiên duyệt việc 4 |
| Phát hiện tài liệu Hạn chế/Mật đã lọt chỉ mục | — | Gỡ ngay, mở sự cố theo ETV.P28 §6.8, lập KPH theo ETV.P13 (ETV.P28 §6.13) |

**Quay lui:** gỡ lớp `HO_SO_KSTL` khỏi `ALLOWED` và chạy lại bộ nạp. Bộ nạp nạp lại toàn bộ trong
**một giao dịch** nên chỉ mục trở về đúng trạng thái trước, không có trạng thái nửa vời. Thời gian
dự kiến dưới 10 phút, không mất dữ liệu nghiệp vụ nào — chỉ mục là dữ liệu dẫn xuất.

## 8. Việc phải làm và thẩm quyền

| # | Việc | Vai trò | Căn cứ |
|---|---|---|---|
| 1 | Gán mức phân loại **Nội bộ** cho lớp tài sản "Hồ sơ kiểm soát tài liệu" | TP *(chủ sở hữu)* lập — **PT.ATTT** duyệt | ETV.P27 §5.1 |
| 2 | Phê duyệt tài sản vào danh mục `F27.01` | **Lãnh đạo Viện** | ETV.P27 §5.1 |
| 3 | Duyệt tài sản được dùng làm nguồn cho hệ thống AI | TP + PT.ATTT đề nghị — **Lãnh đạo Viện phê duyệt, không uỷ quyền** | ETV.P27 §5.1, §6.9.2 |
| 4 | Phân loại mức tác động của thay đổi | **QLCL** | ETV.P30 §6.2.1 |
| 5 | Phê duyệt thay đổi Mức 2 | **Lãnh đạo Viện** | ETV.P30 §6.2.2 |
| 6 | Lập `F29.02` trích điều khoản không huấn luyện lại của nhà cung cấp | PT.AI + chủ sở hữu | ETV.P29 §5.5 |
| 7 | Xác nhận hiệu lực sau thay đổi bằng `F30.03` | QLCL | ETV.P30 §6.2.2 |
| 8 | Bổ sung khối metadata cho 2 phiếu đã ký nhưng không có frontmatter *(mục 1.1)* | **Kiểm soát tài liệu** | ETV.P14 §6.3 |

Việc 8 **không thuộc thay đổi kỹ thuật ở mục 5** và không chặn việc duyệt PA2 — nêu ở đây để nó
không rơi mất. Nhưng nếu chưa làm thì lợi ích của PA2 chỉ đạt **3/5** hồ sơ đã ký (mục 1.1).

## 9. Ý kiến và phê duyệt

| Người đề nghị | Ý kiến PT.ATTT | Ý kiến QLCL | Phê duyệt — Lãnh đạo Viện |
|---|---|---|---|
| *(họ tên, chức danh)* | ☐ Đồng ý ☐ Không đồng ý | ☐ Đồng ý ☐ Không đồng ý | ☐ PA1 ☐ **PA2** ☐ PA3 |
| Ngày: ..../..../........ | Ngày: ..../..../........ | Ngày: ..../..../........ | Ngày: ..../..../........ |
| | Lý do nếu không đồng ý: ............ | Mức tác động: ☐ 1 ☐ 2 ☐ 3 | Lý do nếu không phê duyệt: ............ |

---

## Phụ lục — tài liệu đã đối chiếu

| Nguồn | Mục | Dùng để kết luận điều gì |
|---|---|---|
| ETV.P02 §4.1 | Thuật ngữ và định nghĩa | Chỉ có nhị phân bảo mật/công khai — **không** dựng thang 4 mức |
| ETV.P27 §6.1.3 | Nhóm dữ liệu và mức tối thiểu | "Dữ liệu hệ thống quản lý (tài liệu, hồ sơ ISO)" → tối thiểu **Nội bộ** |
| ETV.P27 §6.2 | Thang phân loại — nguồn chuẩn của Viện | Thang 4 mức thuộc thủ tục này |
| ETV.P27 §6.4 | Dữ liệu cá nhân | Họ tên người ký trong phiếu |
| ETV.P27 §6.9.2 | Dữ liệu dùng cho hệ thống AI | Ba điều kiện đồng thời để làm nguồn cho AI |
| ETV.P27 §5.1 | Ma trận RACI | Thẩm quyền gán mức, duyệt danh mục, duyệt nguồn AI |
| ETV.P28 §4.1 | Thuật ngữ | Thang 4 mức thuộc ETV.P02/ETV.P27, P28 dùng nguyên |
| ETV.P28 §6.13 | ATTT với hệ thống AI | Xử lý khi dữ liệu Hạn chế/Mật lọt chỉ mục |
| ETV.P29 §5.5 | Dữ liệu cấp cho hệ thống AI | Chỉ Công khai/Nội bộ; nguồn phải là tài sản đã đăng ký; điều khoản nhà cung cấp nêu trong AIA |
| ETV.P30 §6.2.1, §6.2.2 | Phân mức tác động và yêu cầu theo mức | Mức 2 và các yêu cầu bắt buộc kèm theo |
| ETV.P26 §5.5 | Khai thác tri thức và chỉ mục trợ lý AI | Điều kiện Đã phê duyệt đồng thời với mức |
