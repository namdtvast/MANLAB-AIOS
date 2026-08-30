---
id: ETV.P.F14.01
title: "Phiếu đề nghị ban hành lại ETV.P14 lần 04 — bổ sung ký hiệu phân loại AI vào bảng mã hoá §6.2"
type: Bieu-mau
process: MP14_TaiLieu
module: M14_TaiLieu
revision: "01"
effective_date: ""
status: Cho-soat-xet
knowledge_category: HTQL-noi-bo
permission: Noi-bo
source: "Viện Kiểm định Công nghệ và Môi trường (ETV)"
related_documents: [ETV.P14, ETV.GAI01, ETV.GAI02, ETV.P.F14.02]
---

# PHIẾU ĐỀ NGHỊ SOÁT XÉT, SỬA ĐỔI, BAN HÀNH VĂN BẢN

Bản đã điền theo `ETV.P.F 14.01` (ETV.P14 §6.6.1 bước 1–2).

| Trường | Nội dung |
|---|---|
| Mã văn bản đề nghị | **ETV.P 14** — Thủ tục Kiểm soát tài liệu, dữ liệu, thông tin |
| Loại văn bản | ☒ Thủ tục |
| Loại đề nghị | ☒ Soát xét/sửa đổi ☒ Bổ sung |
| Người đề nghị / biên soạn | Dương Thành Nam |
| Ngày đề nghị | 30/08/2026 |
| Hiện trạng văn bản | Lần ban hành **03**, hiệu lực **01/07/2026**, `status: Da-phe-duyet` |
| Đề nghị | Ban hành lại **lần 04** |

> **Phiếu này phát sinh từ một quyết định đã có.** Tại phiếu [`ETV.P.F14.01_2026-08-30_GAI01_MayChuMoHinhAI`](ETV.P.F14.01_2026-08-30_GAI01_MayChuMoHinhAI.md) ngày 30/08/2026, LĐV phê duyệt nội dung Hướng dẫn `ETV.GAI 01` nhưng chọn **ban hành lại ETV.P14 lần 04 trước** khi cấp mã chính thức. Đây là **điều kiện tiên quyết ĐK1** của việc ban hành GAI 01.

---

## 1. LÝ DO ĐỀ NGHỊ

**Hai văn bản đang dùng một ký hiệu chưa có căn cứ.** ETV.P14 §6.2 quy định Hướng dẫn mã hoá theo mẫu **`ETV.Gb xx`**, trong đó `b` là ký hiệu lĩnh vực/phân loại, và danh sách nêu trong thủ tục gồm **mười ký hiệu một chữ cái, đều là lĩnh vực đo lường**: A-Không khí, W-Nước, M-Khối lượng, F-Lưu lượng, O-Quang, S-Thời gian–Tần số, T-Nhiệt độ, P-Áp suất, E-Điện, H-Độ ẩm.

Ký hiệu `AI` lệch hai điểm: **hai ký tự** thay vì một, và **không phải lĩnh vực đo lường**. Hiện đã có hai văn bản dùng:

| Văn bản | Tên | Trạng thái |
|---|---|---|
| `ETV.GAI 01` | Hướng dẫn Tích hợp máy chủ mô hình AI nội bộ vào ManLab AIOS | Chờ phê duyệt — LĐV đã phê duyệt nội dung 30/08/2026 |
| `ETV.GAI 02` | Hướng dẫn Kiến trúc tri thức và ngữ nghĩa cho AI trong hệ sinh thái ManLab | Nháp |

Cả hai đều đang tự ghi trong thân văn bản rằng "đây là mã đề xuất". Một ngoại lệ tự khai, lặp ở hai văn bản, không còn là ngoại lệ — nó là một quy tắc chưa được ban hành.

**Việc này đã được chuẩn bị sẵn.** Phụ lục III của chính ETV.P14 (`knowledge/03_ma_hoa_van_ban.md`, đăng ký tại §IX) đã ghi `AI` là *"ký hiệu phân loại phi đo lường (đề xuất, **chưa có trong ETV.P14 §6.2**)"* kèm yêu cầu văn bản dùng ký hiệu này phải tự khai là mã đề xuất. Nghĩa là phần soạn thảo đã xong; việc còn lại chỉ là **nâng đề xuất đó vào thân thủ tục** để phụ lục không còn quy định thứ mà thủ tục chưa cho phép.

**Rủi ro nếu không sửa.** §IX quy định "khi có mâu thuẫn, nội dung thân thủ tục (§I–VIII) được ưu tiên áp dụng". Chiếu đúng câu đó, ký hiệu `AI` hiện **không có hiệu lực** — và mọi văn bản mang mã `ETV.GAI xx` đứng trên một mã số không có căn cứ trong thủ tục đang hành.

---

## 2. PHẠM VI THAY ĐỔI ĐỀ NGHỊ

Phạm vi **tối thiểu**: chỉ đụng vào bảng mã hoá §6.2 và các chỗ dẫn chiếu bắt buộc phải đồng bộ theo. Không sửa nội dung nào khác của thủ tục.

### Thay đổi 1 — §6.2, đoạn định nghĩa `a`/`b` *(thay đổi chính)*

| | Nội dung |
|---|---|
| **Trước** | ``a``/``b`` = ký hiệu lĩnh vực/phân loại (A-Không khí, W-Nước, M-Khối lượng, F-Lưu lượng, O-Quang, S-Thời gian-Tần số, T-Nhiệt độ, P-Áp suất, E-Điện, H-Độ ẩm...). Danh mục đầy đủ: ``ETV.P.F 14.02``. |
| **Sau** | ``a``/``b`` = ký hiệu lĩnh vực/phân loại, thuộc một trong hai nhóm:<br>· **Lĩnh vực đo lường — một ký tự:** A-Không khí, W-Nước, M-Khối lượng, F-Lưu lượng, O-Quang, S-Thời gian–Tần số, T-Nhiệt độ, P-Áp suất, E-Điện, H-Độ ẩm.<br>· **Phân loại phi đo lường — một hoặc hai ký tự:** `AI` — trí tuệ nhân tạo (hướng dẫn về máy chủ, mô hình, tri thức và dịch vụ AI). Ví dụ: `ETV.GAI 01`.<br>Không tự sinh ký hiệu ngoài hai danh sách trên; bổ sung ký hiệu mới phải qua soát xét và ban hành lại thủ tục này. |

Hai điểm sửa thực chất: **cho phép ký hiệu hai ký tự** ở nhóm phi đo lường, và **đăng ký `AI`** vào danh sách. Cụm "lĩnh vực/**phân loại**" vốn đã có sẵn trong câu chữ hiện hành nên không phải mở rộng phạm vi khái niệm, chỉ là làm rõ nhóm thứ hai vốn chưa có phần tử nào.

### Thay đổi 2 — §6.2, bảng mã hoá, dòng "Hướng dẫn"

| | Nội dung |
|---|---|
| **Trước** | Hướng dẫn · `ETV.Gb xx` · ví dụ **ETV.GI 01** |
| **Sau** | Hướng dẫn · `ETV.Gb xx` · ví dụ **ETV.GI 01**, **ETV.GAI 01** |

### Thay đổi 3 — §6.2, gỡ một dẫn chiếu treo *(phát hiện khi soạn phiếu)*

Câu hiện hành kết bằng *"Danh mục đầy đủ: `ETV.P.F 14.02`."* Mở `ETV.P.F 14.02` thì đó là **Danh mục văn bản nội bộ** — một khung cột để liệt kê **văn bản** (mã số, tên, loại, chủ sở hữu, trạng thái…), **không chứa và không có chỗ chứa danh mục ký hiệu lĩnh vực**.

Nghĩa là câu "danh mục đầy đủ ở F14.02" trỏ tới một nơi không có nội dung đó. Người tra cứu đi theo dẫn chiếu sẽ không tìm thấy gì — đây đúng là lớp lỗi "mục có thật nhưng sai chỗ" mà công cụ kiểm trích dẫn không bắt được.

**Đề nghị:** bỏ câu dẫn chiếu này; đưa danh mục ký hiệu vào thẳng §6.2 như Thay đổi 1 đã làm. Danh sách chỉ có 11 phần tử, đặt tại chỗ rẻ hơn nuôi một dẫn chiếu.

### Thay đổi 4 — Phụ lục III đồng bộ *(bắt buộc theo §IX)*

`07_AI_OPERATING_SYSTEM/01_Skills/S14_KiemSoatTaiLieu/knowledge/03_ma_hoa_van_ban.md`:

| | Nội dung |
|---|---|
| **Trước** | "**Ký hiệu phân loại phi đo lường (đề xuất, chưa có trong `ETV.P14` §6.2):** `AI` … **phải ghi rõ trong chính văn bản rằng đây là mã đề xuất**, chờ Văn thư/QLCL cấp số chính thức và bổ sung ký hiệu vào `ETV.P14` §6.2 ở lần ban hành kế tiếp." |
| **Sau** | "**Ký hiệu phân loại phi đo lường** (`ETV.P14` §6.2, lần ban hành 04): `AI` — trí tuệ nhân tạo. Không tự sinh thêm ký hiệu mới ngoài danh sách này." |

> **Lưu ý kỹ thuật cho người thực hiện.** Phụ lục III tồn tại **hai bản**: bản trong repo (`07_AI_OPERATING_SYSTEM/01_Skills/`) và bản Claude Code thực sự nạp khi chạy (`~/.claude/skills/`). Sửa một bản là hai bản lệch nhau âm thầm — CI **không** phát hiện được vì `~/.claude/` không tồn tại trên runner. Phải chạy tay `python3 _meta/validate_skill_sync.py --chan` sau khi sửa.

### Thay đổi 5 — Bảng "Những thay đổi đã có" và metadata của ETV.P14

- Thêm dòng: `30/08/2026 | Bổ sung nhóm ký hiệu phân loại phi đo lường vào bảng mã hoá §6.2, đăng ký ký hiệu AI; gỡ dẫn chiếu danh mục ký hiệu sai tới ETV.P.F 14.02. Theo phiếu ETV.P.F14.01 ngày 30/08/2026 | 04`
- `revision: "03"` → `"04"`; `effective_date` đặt theo ngày LĐV ký; `supersedes: "ETV.P14 lần ban hành 03 (01/07/2026)"`.

---

## 3. HỆ QUẢ SAU KHI BAN HÀNH LẦN 04

| # | Việc | Trách nhiệm | Ghi chú |
|---|---|---|---|
| 1 | Cấp mã số chính thức `ETV.GAI 01`, `ETV.GAI 02` | Văn thư/QLCL | Mã giữ nguyên ký tự, chỉ khác ở chỗ nay đã có căn cứ |
| 2 | Gỡ ghi chú "mã số là mã đề xuất" trong thân `ETV.GAI 01` và `ETV.GAI 02` | NTH | Ghi chú hết lý do tồn tại |
| 3 | Cập nhật danh mục văn bản nội bộ | Văn thư/QLCL | `ETV.P.F 14.02` |
| 4 | **Đánh dấu ĐK1 của GAI 01 đã hoàn thành** | LĐP | Xem mục 5 phiếu `ETV.P.F14.01_2026-08-30_GAI01_MayChuMoHinhAI` |

Sau việc 4, GAI 01 còn **ĐK2** — ETV.P29 có hiệu lực — trước khi ban hành được. Phiếu này **không** giải quyết ĐK2.

---

## 4. HAI ĐIỂM ĐỀ NGHỊ LĐP/LĐV LƯU Ý

**(a) Lần ban hành 04 hay sửa đổi tại chỗ giữ lần 03?** ETV.P14 §6.4 quy định "khi văn bản HTQL được ban hành lại, lần ban hành tăng thêm 01", nhưng tiền lệ gần nhất đi hướng khác: phiếu ngày 01/07/2026 bổ sung **hẳn một mục mới (§IX)** vào thủ tục này mà vẫn **giữ nguyên lần ban hành 03**, ghi rõ "sửa đổi tại chỗ, không nâng lần ban hành". Thay đổi lần này (một đoạn trong §6.2) **nhỏ hơn** thay đổi 01/07/2026.

Phiếu soạn theo hướng **lần 04** đúng quyết định của LĐV ngày 30/08/2026. Nêu tiền lệ ra đây để LĐV xác nhận có chủ ý, vì hai lượt sửa cùng cỡ mà xử lý khác nhau sẽ khó giải thích khi đánh giá. Nếu LĐV đổi ý sang sửa đổi tại chỗ, Thay đổi 5 bỏ phần tăng `revision`, phần còn lại giữ nguyên.

**(b) Phiếu này không mở rộng phạm vi ký hiệu.** Chỉ đăng ký đúng một ký hiệu `AI` đang có văn bản dùng thật. Không đăng ký trước các ký hiệu phi đo lường khác (`IT`, `HR`, `QA`…) dù có thể cần sau — đăng ký ký hiệu không có văn bản nào dùng chỉ làm bảng mã hoá phình ra mà không ai tra.

---

## 5. Ý KIẾN LĐP (thẩm định sự cần thiết — ETV.P14 §6.6.1 bước 2)

☐ Không cần thiết — lý do: .....................

☐ Cần thiết — phân công:

| Vai trò | Người được phân công | Thời hạn hoàn thành |
|---|---|---|
| Người biên soạn | | |
| Người soát xét | | |

Chữ ký LĐP: ..................... Ngày: .....................

## 6. KẾT QUẢ SOÁT XÉT (LĐP — bước 4)

☐ Đạt → chuyển `Chờ phê duyệt` · ☐ Không đạt → **Không soát xét** (bắt buộc lý do): .....................

Người soát xét: ..................... · Ngày: .....................

Ý kiến về mục 4 (lần ban hành 04 hay sửa đổi tại chỗ): .....................

## 7. KẾT QUẢ PHÊ DUYỆT (LĐV — bước 5)

**Về nội dung sửa đổi tại mục 2:** ☐ Phê duyệt · ☐ Không phê duyệt (bắt buộc lý do): .....................

**Về mục 4(a):** ☐ Ban hành lại lần **04** · ☐ Sửa đổi tại chỗ, giữ lần **03** *(theo tiền lệ 01/07/2026)*

Người phê duyệt: ..................... · Ngày phê duyệt: .....................

Lần ban hành: ......... · Ngày ban hành: ......... · Chữ ký LĐV: .....................

---

*Bản dự thảo do AI hỗ trợ soạn. Theo ETV.P29 §1.3 nguyên tắc 1 ("Con người quyết định cuối cùng") và ETV.P14 §6.9, AI chỉ đề xuất và kiểm tra — không soát xét, không phê duyệt, không tự cấp mã số, không tự chuyển trạng thái văn bản.*
