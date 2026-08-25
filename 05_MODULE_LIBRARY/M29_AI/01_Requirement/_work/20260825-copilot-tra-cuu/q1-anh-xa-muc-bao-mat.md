# Q1 — Ánh xạ mức bảo mật tài liệu để nạp chỉ mục Copilot

Trả lời **Q1** của [spec.md](spec.md). **Không định nghĩa hệ phân loại mới** — quy tắc đã có
trong tài liệu đã ban hành; việc còn lại chỉ là *áp cho đúng* và *cưỡng chế được bằng máy*.

## 1. Quy tắc gốc (đã ban hành, chỉ dẫn chiếu)

| Nguồn | Nội dung ràng buộc |
|---|---|
| ETV.P28 §2 | Bốn mức thống nhất toàn Viện: **Công khai · Nội bộ · Hạn chế · Mật**. Định nghĩa và tiêu chí gán mức thuộc **ETV.P02/ETV.P27**; các thủ tục khác *sử dụng nguyên, không định nghĩa lại* |
| ETV.P29 §5.5 | Chỉ dữ liệu mức **Công khai** và **Nội bộ** được đưa vào chỉ mục AI; **Hạn chế** và **Mật** *không bao giờ* |
| ETV.P29 §5.5 | Gửi dữ liệu tới **dịch vụ mô hình bên ngoài** phải nêu rõ trong AIA, kèm điều khoản nhà cung cấp về **không dùng dữ liệu để huấn luyện lại**; không bảo đảm được ⇒ **chỉ gửi mức Công khai** |
| ETV.P29 §5.5 | Tài liệu chuyển **hết hiệu lực** ⇒ gỡ khỏi chỉ mục AI **ngay trong cùng giao dịch** |
| ETV.P26 §5.5 | Vào chỉ mục AI cần **đồng thời**: trạng thái **Đã phê duyệt** *và* mức ∈ {Công khai, Nội bộ} |
| ETV.P28 §5.13 | Phát hiện dữ liệu Hạn chế/Mật lọt vào chỉ mục ⇒ gỡ ngay, **mở sự cố** theo P28 §5.8 và lập KPH theo ETV.P13 |

**Hệ quả cho Copilot:** không cần nhãn mới nào. Một tài liệu vào được chỉ mục khi và chỉ khi
`mức ∈ {Công khai, Nội bộ}` **và** `trạng thái = Đã phê duyệt`. Mọi câu hỏi kiểu "tài liệu này có
được gửi ra ngoài không" quy về **một** câu hỏi đã có người có thẩm quyền trả lời theo ETV.P02/P27:
*tài liệu này ở mức nào?*

Vì Anthropic API cam kết không dùng dữ liệu API để huấn luyện, điều kiện của P29 §5.5 được thỏa
mãn ⇒ mức **Nội bộ** gửi được. Điều khoản này **phải được trích dẫn trong hồ sơ AIA (F29.02)** —
nếu đổi nhà cung cấp sang dịch vụ không cam kết tương đương, phạm vi tự động co lại còn mức
Công khai và Copilot mất gần hết giá trị.

## 2. Hiện trạng nhãn trong repo — vì sao chưa cưỡng chế được

209 file tài liệu có frontmatter, nhưng trường `permission` **không mang hệ 4 mức**:

| Giá trị đang có | Số file | Vấn đề |
|---|---|---|
| `Noi-bo` | 194 | Không phân biệt được Nội bộ với Hạn chế — cả bí quyết kỹ thuật lẫn thủ tục thường đều nằm chung |
| `Cong-khai` | 2 | — |
| rỗng | 10 | Không xác định ⇒ phải coi là chưa phân loại |
| Ghi danh sách vai trò (`"LĐV,LĐP,Nhân viên"`) | 2 | Khai sai trường — đây là phân quyền đọc, không phải mức bảo mật |
| `Han-che` / `Mat` | **0** | Chưa từng được dùng |

Trường `permission` trả lời *ai được đọc*; mức bảo mật trả lời *thông tin thuộc loại nào*. Hai
việc khác nhau, hiện đang bị dồn vào một trường. **Không thêm trường mới ngoài hệ đã ban hành** —
chuẩn hóa `permission` (hoặc trường `security_level` tách riêng nếu Kiểm soát tài liệu thấy cần)
về đúng 4 giá trị, và tổng hợp vào `ETV.P.F14.06 — Danh mục phân quyền và thời hạn lưu`.

## 3. Đề xuất mức cho từng lớp tài liệu

Để người có thẩm quyền duyệt theo lớp thay vì rà 209 file lẻ. Mức của từng file khi đã gán thì thắng mức lớp.

| Lớp | Vị trí | Mức đề xuất | Vào chỉ mục AI |
|---|---|---|---|
| Sổ tay chất lượng | `03/01_QM` | Nội bộ | ✓ |
| Thủ tục ETV.Pxx (23 file) | `03/02_P` | Nội bộ | ✓ |
| **Quy trình kỹ thuật / SOP (84 file)** | `03/03_M` | **Rà từng file**: chỉ diễn giải tiêu chuẩn công khai ⇒ Nội bộ; chứa tham số, bí quyết, know-how riêng ⇒ **Hạn chế** | Tùy mức |
| Biểu mẫu gốc **chưa điền** | `03/04_F`, `06/01_Forms` | Nội bộ (một số Công khai, vd F02.05) | ✓ |
| **Hồ sơ, biểu mẫu đã điền** | `03/05_R` và mọi hồ sơ phát hành | **Hạn chế/Mật** theo ETV.P02 §4.1 | ✗ |
| Hub thủ tục, đặc tả module, năng lực | `04`, `05`, `02` | Nội bộ | ✓ |
| Tri thức đã biên soạn | `08/Wiki`, `08/06_FAQ` | Nội bộ | ✓ |
| **Toàn văn ISO/TCVN/DLVN có bản quyền** | `08/{00_RAW_DATA,02_ISO,03_DLVN,04_TCVN,14_Technical_References}` | **Hạn chế** — ràng buộc bản quyền, không phải bí mật | ✗ |
| Khách hàng, hợp đồng, giá | `06/06_Customers`, MP07 | **Hạn chế/Mật** (ISO/IEC 17025 §4.2) | ✗ |
| Nhân sự, hồ sơ năng lực cá nhân | `06/08_Personnel`, MP03 | **Hạn chế** (NĐ 13/2023) | ✗ |
| Bằng chứng, hồ sơ đánh giá, KPH/CAPA | `11/{03_Evidence,04_Audit,05_NC,06_CAPA}` | **Hạn chế** | ✗ |
| Cấu hình ATTT, tài khoản, sơ đồ mạng, khóa | rải rác | **Mật** | ✗ |
| Nghiên cứu chưa công bố | `12_RESEARCH` | **Hạn chế** (ưu tiên SHTT, MP27) | ✗ |
| Dữ liệu nghiệp vụ trong CSDL nền tảng | mọi bảng `M01…M38` | Ngoài phạm vi Increment 1 | ✗ |

Lớp cần người quyết thực sự chỉ có **một**: 84 SOP ở `03/03_M`. Các lớp còn lại là hệ quả hiển
nhiên của ETV.P02 §4.1. Chưa rà xong 84 file này thì Copilot vẫn chạy được trên sổ tay + 23 thủ
tục + biểu mẫu trống + hub/đặc tả — đủ cho phần lớn câu hỏi tra cứu.

## 4. Cưỡng chế bằng máy (không dựa vào ý thức người dùng)

| Mã | Yêu cầu |
|---|---|
| **E1** | Script nạp chỉ mục chỉ nạp file có `mức ∈ {Công khai, Nội bộ}` **và** `doc_status = issued`. Thiếu mức hoặc mức không hợp lệ ⇒ **bỏ qua** (fail-closed) |
| **E2** | Tài liệu ngoài chỉ mục **không xuất hiện dưới bất kỳ hình thức nào** — Copilot không tiết lộ cả tiêu đề |
| **E3** | CI chặn merge nếu một file trong lớp `✗` của §3 khai mức Công khai/Nội bộ |
| **E4** | Hạ mức hoặc chuyển hết hiệu lực ⇒ gỡ khỏi chỉ mục **trong cùng giao dịch** (P29 §5.5), không chờ chu kỳ nạp lại |
| **E5** | Phát hiện tài liệu Hạn chế/Mật đã lọt vào chỉ mục ⇒ gỡ ngay + mở phiếu sự cố (P28 §5.8) + KPH (ETV.P13) |
| **E6** | Kể cả tài liệu Nội bộ, trích đoạn chứa dữ liệu cá nhân phải được che trước khi gửi (guardrail `GR-PII-OUT`) |

Bổ sung vào tiêu chí nghiệm thu của spec §10:
- **AC-11** — tài liệu mức Hạn chế ⇒ Copilot không trả lời được và không nhắc tới sự tồn tại của nó.
- **AC-12** — tài liệu thiếu mức bảo mật ⇒ không vào chỉ mục (fail-closed).
- **AC-13** — hạ mức một tài liệu đang trong chỉ mục ⇒ biến mất khỏi câu trả lời ngay lượt hỏi kế tiếp.

*Ghi chú kỹ thuật:* nhu cầu "chỉ đường tới tài liệu mà không gửi nội dung" là **chức năng giao
diện** (hiện đường dẫn cho người đã có quyền đọc), **không phải** một mức phân loại. Không tạo mức
thứ năm.

## 5. Việc phải làm

| # | Việc | Khối lượng | Người |
|---|---|---|---|
| 1 | Duyệt bảng mức theo lớp ở §3 | 1 buổi | PT.ATTT + LĐV |
| 2 | **Rà 84 SOP `03/03_M`: Nội bộ hay Hạn chế** | Nặng nhất — chia theo lĩnh vực | LĐP chuyên môn |
| 3 | Chuẩn hóa nhãn 4 mức trong frontmatter; sửa 2 file khai sai trường, điền 10 file rỗng | 12 file + rà 209 | Kiểm soát tài liệu (MP14) |
| 4 | Cập nhật `ETV.P.F14.06` cho nhóm tài liệu liên quan | — | Kiểm soát tài liệu |
| 5 | Trích điều khoản "không huấn luyện lại" của nhà cung cấp vào **F29.02** | — | PT.AI + CSH |
| 6 | Hiện thực E1–E6 | — | Kỹ thuật |

**Không cần ban hành tài liệu mới cho Q1** — quy tắc đã nằm trong ETV.P29 §5.5. Tài liệu này chỉ
là bản làm rõ phục vụ thi công; kết quả cuối cùng sống ở nhãn frontmatter, `ETV.P.F14.06` và hồ sơ
AIA `F29.02`.
