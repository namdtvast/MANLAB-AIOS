# Phân tích & Thuyết minh thiết kế lại ETV.P14 — Kiểm soát tài liệu, dữ liệu, thông tin

> Tài liệu bổ trợ, **không phải** một phần của thủ tục kiểm soát. Mục đích: ghi lại căn cứ phân tích và lý do của từng quyết định thiết kế trong [ETV.P14_KiemSoatTaiLieu.md](ETV.P14_KiemSoatTaiLieu.md), để lần soát xét sau hiểu "vì sao thiết kế như vậy" thay vì chỉ thấy kết quả cuối.
>
> Căn cứ phân tích: bản `ETV.P 14_TT Kiểm soát tài liệu, dữ liệu, thông tin_L3` (lần ban hành 02, ngày 22/4/2023, soát xét 06/01/2024) cùng 6 biểu mẫu đi kèm (F14.01–F14.06).

## 1. Điểm mạnh của P14 hiện tại (giữ lại, không làm lại)

1. **Đã số hóa từ sớm** — áp dụng ManLab từ 2020, có khái niệm "văn bản mềm" với trạng thái (Đang hiệu lực/Lỗi thời), phân quyền theo tài khoản (F14.06). Nhiều PTN cùng quy mô vẫn kiểm soát tài liệu 100% giấy — ETV đã đi trước một bước.
2. **Có quy tắc mã hóa văn bản tường minh** (ETV.QM / ETV.P xx / ETV.P.F xx.yy / ETV.MCa xx / ETV.Gb xx) — đây là tài sản quan trọng, chỉ cần chuẩn hoá thêm, không cần thay.
3. **Đã tách văn bản nội bộ (đi) và văn bản bên ngoài (đến)** thành hai luồng, đúng bản chất nghiệp vụ văn thư và đúng tinh thần Nghị định 30/2020/NĐ-CP.
4. **F14.06 (bảng phân quyền)** thực chất là một ma trận RBAC đầy đủ theo từng menu/quy trình (MP01–MP38) kèm **thời hạn lưu giữ (tháng)** cho từng loại hồ sơ — dữ liệu quý, hiện đang "ẩn" trong file Excel, chưa được P14 dẫn chiếu.
5. **Có quy định chữ ký số** với căn cứ pháp lý — thiếu cập nhật nhưng đúng hướng.

## 2. Điểm yếu

1. **Không có bảng metadata/siêu dữ liệu chuẩn cho văn bản** → không thể tìm kiếm, không thể để AI đọc hiểu, không có trường "liên kết tài liệu", "thay thế/được thay thế".
2. **Không có RACI rõ ràng** — mục "Phân quyền và trách nhiệm" chỉ liệt kê 3 vai trò (LĐV, LĐP, NTH) bằng văn xuôi, không có bảng trách nhiệm theo từng bước, khó tự động hoá, khó audit.
3. **Ranh giới hợp đồng chưa rõ** — hợp đồng lao động, hợp đồng dịch vụ, hợp đồng kinh tế... hiện bị xử lý rải rác (một phần ở P14 dưới dạng "văn bản nội bộ", một phần thực tế nằm ở MP07_HopDong/CAP-02, một phần ở F03.09 "Hợp đồng lao động" trong ma trận F14.06). P14 cũ không nói rõ hợp đồng do thủ tục nào kiểm soát vòng đời → dễ chồng lấn. *(Quyết định cuối: đưa vòng đời hợp đồng về đúng các thủ tục chuyên trách — P03 nhân sự, P07 dịch vụ — và P14 loại hợp đồng khỏi phạm vi, chỉ giữ nguyên tắc kiểm soát văn bản chung để các thủ tục đó dẫn chiếu. Xem mục 10, quyết định #4.)*
4. **Thể thức trình bày áp dụng chung cho mọi loại văn bản** (mục "Hình thức trình bày văn bản nội bộ") nhưng lại **không phân biệt** giữa:
   - Văn bản hệ thống chất lượng (Sổ tay/Thủ tục/Quy trình/Hướng dẫn/Biểu mẫu) — ETV tự quy định thể thức, không trái luật.
   - Văn bản hành chính (Quyết định, Công văn, Thông báo, Biên bản, Báo cáo) — **phải** theo thể thức bắt buộc của Nghị định 30/2020/NĐ-CP (Phụ lục I): Quốc hiệu — Tiêu ngữ, tên cơ quan ban hành, số/ký hiệu, địa danh — ngày tháng, nơi nhận...
   Gộp chung 2 nhóm này là điểm sai lệch pháp lý cần tách bạch.
5. **Không có cơ chế soát xét định kỳ / cảnh báo hết hạn** — chỉ có "khi cần thiết".
6. **Không có quy tắc phát hiện xung đột/trùng lặp** giữa các văn bản (ví dụ 2 quy trình cùng phạm vi).
7. **Thiếu định nghĩa vòng đời đầy đủ** — thủ tục hiện chỉ có: soạn thảo → soát xét → phê duyệt → phân phối → công bố → lưu → thanh lý. Thiếu rõ bước **Đề xuất** (ai được đề xuất, tiêu chí "cần thiết") và **Hủy bỏ** (khác thanh lý — thanh lý là chuyển trạng thái, hủy bỏ là loại khỏi hệ thống có kiểm soát).
8. **Trạng thái văn bản mô tả trong P14** ("nháp; gửi yêu cầu duyệt; phê duyệt; hủy" — mục Văn bản điện tử, bước 4) **không khớp** với trạng thái đã chuẩn hoá tại `05_MODULE_LIBRARY/M14_TaiLieu/07_Workflow/StateMachine.md` (Nháp → Chờ soát xét → Không soát xét → Chờ phê duyệt → Không phê duyệt → Đã phê duyệt → Hết hiệu lực/Hủy). Đây là lỗi "hai nguồn sự thật" — P14 mới phải dùng đúng tên trạng thái của StateMachine, không tự đặt tên khác.

## 3. Nội dung trùng lặp

1. **Chữ ký số**: định nghĩa "Chữ ký số" xuất hiện 2 lần (mục Thuật ngữ, và mục 7 "Quy định về chữ ký số") với nội dung gần như lặp lại toàn bộ Điều 21 Luật GDĐT + Điều 8, 9 Nghị định 130/2018/NĐ-CP → nên **chỉ dẫn chiếu điều luật**, không chép lại nguyên văn.
2. **Danh mục loại hình văn bản nội bộ/bên ngoài** vừa liệt kê trong P14 (mục 6.1.1, 6.1.2) vừa lặp lại chi tiết hơn trong F14.02/F14.03 → P14 chỉ nên nêu nguyên tắc phân loại, chi tiết để hẳn trong biểu mẫu danh mục (một nơi duy nhất).
3. **Quy định trình bày thể thức** (font, lề, header/footer) lặp lại logic đã có trong trang bìa mẫu của chính văn bản (mục 6.3) — nên tách thành 1 phụ lục kỹ thuật hoặc mẫu (template), không mô tả bằng lời trong thân thủ tục.

## 4. Nội dung không còn phù hợp / lỗi thời

1. **Luật Giao dịch điện tử 51/2005/QH11** được dẫn ở mục "Quy định về chữ ký số" (Điều 23) trong khi mục Tài liệu trích dẫn đã cập nhật đúng **Luật Giao dịch điện tử 20/2023/QH15** (hiệu lực 01/7/2024) — hai chỗ trong cùng một thủ tục mâu thuẫn nhau về căn cứ pháp lý đang áp dụng.
2. **Nghị định 130/2018/NĐ-CP** về chữ ký số vẫn còn hiệu lực với hạ tầng CA hiện hành, nhưng khung pháp lý chữ ký điện tử/dịch vụ tin cậy đã chuyển sang nền Luật GDĐT 2023 — P14 cần đặt câu dẫn chiếu "mở" (theo văn bản hướng dẫn thi hành hiện hành) thay vì khóa cứng số hiệu nghị định, để không phải sửa thủ tục mỗi khi có nghị định mới thay thế.
3. **Luật Công nghệ thông tin 67/2006/QH11**: nhiều nội dung đã được điều chỉnh bởi Luật GDĐT 2023, Luật An toàn thông tin mạng 2015, Luật An ninh mạng 2018 — giữ lại như một căn cứ chung nhưng không dẫn chi tiết điều khoản cụ thể.
4. Tên gọi **"Phòng Đo lường Chất lượng (PTN)"** dùng xuyên suốt — cần xác nhận có còn đúng với cơ cấu tổ chức hiện tại của Viện (01_ENTERPRISE/04_Organization.md) hay đã đổi tên/mở rộng thành nhiều phòng.

## 5. Nội dung thiếu

1. Không có **bảng metadata chuẩn** (ID, loại, chủ sở hữu, phòng ban, quy trình liên quan, ngày hiệu lực, số lần soát xét, từ khóa, tài liệu liên quan, điều khoản ISO, căn cứ pháp lý, AI tags, phân loại tri thức, quyền truy cập, thời hạn lưu, chữ ký số, nguồn, thay thế/được thay thế).
2. Không có **ranh giới rõ ràng về hợp đồng** — không nêu hợp đồng do thủ tục nào kiểm soát (dẫn tới chồng lấn với P03/P07).
3. Không có **quy tắc phát hiện xung đột** giữa văn bản mới ban hành và văn bản hiện hành (trùng phạm vi, mâu thuẫn nội dung).
4. Không có **cơ chế review định kỳ theo chu kỳ** (vd. 24–36 tháng) độc lập với review "khi có nhu cầu".
5. Không có liên kết rõ ràng tới **ISO 17034, ISO/IEC 27001, ISO/IEC 42001** — chỉ có ISO 9001 và ISO/IEC 17025.
6. Không có mô tả **vai trò AI** trong kiểm soát tài liệu (dù ManLab đã có nền tảng AI theo `07_AI_OPERATING_SYSTEM`).
7. Không có **ma trận RACI** thay cho đoạn văn mô tả trách nhiệm.

## 6. Đối chiếu với pháp luật/ISO hiện hành

| Căn cứ | Tình trạng trong P14 cũ | Khuyến nghị |
|---|---|---|
| **Nghị định 30/2020/NĐ-CP** (công tác văn thư) | Có trích dẫn nhưng không phân biệt "văn bản hành chính" (phải theo Phụ lục I) với "tài liệu hệ thống chất lượng" (ETV tự quy định thể thức) | P14 mới: tách 2 nhóm thể thức; văn bản hành chính dùng đúng mẫu Phụ lục I NĐ 30/2020 (đưa vào `templates/` của Skill) |
| **Luật Giao dịch điện tử 20/2023/QH15** | Trích dẫn ở đầu nhưng mục chữ ký số vẫn viện dẫn luật 2005 | Thống nhất một căn cứ duy nhất — Luật GDĐT 2023, Điều 22–25 (chữ ký điện tử) |
| **Luật Ban hành văn bản quy phạm pháp luật** | Không có trong P14 cũ; đề bài yêu cầu xem xét | **Không áp dụng trực tiếp** cho ETV: luật này điều chỉnh cơ quan nhà nước có thẩm quyền ban hành VBQPPL (Luật/Nghị định/Thông tư...). ETV chỉ là **bên tiếp nhận và áp dụng** VBQPPL (văn bản bên ngoài), không ban hành VBQPPL. P14 mới ghi rõ điều này để tránh áp luật sai phạm vi điều chỉnh — chỉ dẫn chiếu khi mô tả cách xử lý "văn bản bên ngoài" |
| **ISO 9001:2015** | Trích dẫn tên chuẩn nhưng không nêu điều khoản | Dẫn rõ **§7.5 Thông tin dạng văn bản** |
| **ISO/IEC 17025:2017** | Có trích dẫn chuẩn, đúng với ánh xạ hệ thống (`11_COMPLIANCE/01_ISO_Mapping`) | Dẫn rõ **§8.3 Kiểm soát tài liệu** |
| **ISO 17034:2016** | Không đề cập | ETV có năng lực sản xuất chất chuẩn (CAP-09, MP19/20/23) → bổ sung dẫn chiếu ISO 17034 §8.3 (kiểm soát tài liệu hệ thống nhà sản xuất mẫu chuẩn — tương đương cấu trúc ISO/IEC 17025) |
| **ISO/IEC 17043:2010/2023** | Không đề cập | ETV hiện **chưa** có năng lực tổ chức thử nghiệm thành thạo (PT provider) trong danh mục `02_CAPABILITIES`; nêu như căn cứ dự phòng, không bắt buộc áp dụng ngay — kích hoạt khi Viện chính thức triển khai chương trình PT |
| **ISO/IEC 27001:2022** | Không đề cập dù đã có phân quyền, sao lưu cloud, chữ ký số | Bổ sung dẫn chiếu các kiểm soát liên quan: A.5.9–A.5.14 (phân loại/xử lý thông tin), A.5.15–A.5.18 (kiểm soát truy cập), A.5.37 (thủ tục vận hành dạng văn bản), A.8.13 (sao lưu) |
| **ISO/IEC 42001:2023** | Không đề cập | P14 mới đưa AI vào vòng đời tài liệu (metadata, gợi ý phân loại, cảnh báo) → cần dẫn chiếu §7.5 (thông tin dạng văn bản của HTQL AI) và nguyên tắc "AI không tự phê duyệt" đã có sẵn trong `07_AI_OPERATING_SYSTEM/01_Skills/README.md` |

## 7. Chưa phù hợp với chuyển đổi số

- Chưa có metadata → không index/tìm kiếm ngữ nghĩa được.
- Chưa có liên kết `Supersedes/SupersededBy` → không dựng được "cây phả hệ tài liệu" (Document Tree).
- Trạng thái văn bản mô tả rời rạc, không khớp state machine chuẩn của module.
- Retention (thời hạn lưu) nằm trong file Excel riêng (F14.06), không liên kết field-level với từng tài liệu.

## 8. Chưa phù hợp với ManLab

- Thiếu đặc tả field-level (loại dữ liệu, bắt buộc/không) cho phần mềm hiện thực hoá — nay chuyển vào `05_MODULE_LIBRARY/M14_TaiLieu`.
- Tên trạng thái trong văn bản và trong phần mềm lệch nhau (đã nêu ở mục 2.8).
- Chưa mô tả API/webhook để tích hợp với các MP khác (vd. MP07 Hợp đồng, MP15 Hồ sơ, MP29 AI).

## 9. Nội dung AI có thể tự động hoá

| Việc | Trạng thái hiện tại | AI hỗ trợ (không thay quyền quyết định) |
|---|---|---|
| Nhận diện loại văn bản, sinh mã số | Thủ công | Gợi ý mã theo quy tắc mã hoá |
| Kiểm tra thể thức (font, lề, header/footer, phụ lục NĐ 30) | Thủ công, dễ sai sót | Kiểm tra tự động, báo lỗi định dạng |
| Xác định căn cứ pháp lý/ISO áp dụng | Thủ công | Gợi ý theo loại văn bản + từ khoá |
| Phát hiện xung đột/trùng lặp với văn bản hiện hành | Không có | So khớp phạm vi áp dụng, cảnh báo trùng |
| Kiểm tra liên kết tài liệu (link hỏng, chưa cập nhật `SupersededBy`) | Không có | Quét & cảnh báo |
| Nhắc soát xét định kỳ trước hạn | Không có | Cảnh báo theo `next_review_date` |
| Điền metadata ban đầu từ nội dung soạn thảo | Không có | Trích xuất & đề xuất, người lập xác nhận |

**Nguyên tắc bất biến khi tự động hoá**: AI chỉ **gợi ý và cảnh báo**; quyền **soát xét, phê duyệt, ký số, thu hồi, hủy** luôn thuộc về LĐP/LĐV theo đúng phân quyền — đúng tinh thần đã ghi tại `07_AI_OPERATING_SYSTEM/01_Skills/README.md` ("AI KHÔNG tự ra kết luận... mọi agent triển khai phải có hồ sơ AIA theo MP29").

## 10. Quyết định thiết kế trong bản mới — lý do

| # | Thay đổi cấu trúc | Lý do |
|---|---|---|
| 1 | Thêm **bảng RACI** thay đoạn văn mô tả trách nhiệm | Dễ audit, dễ máy đọc, khớp thông lệ ISO 9001 §5.3 |
| 2 | Thêm **§ Metadata chuẩn** làm bảng field bắt buộc | Điều kiện tiên quyết để AI và ManLab vận hành được — không thể tự động hoá nếu không có trường dữ liệu chuẩn |
| 3 | Tách **thể thức văn bản hành chính** (theo Phụ lục I NĐ 30/2020) ra khỏi **thể thức tài liệu hệ thống chất lượng** (ETV tự quy định) | Đúng phạm vi điều chỉnh của pháp luật, tránh áp sai quy tắc trình bày |
| 4 | **Loại hợp đồng khỏi phạm vi P14**, dẫn chiếu về P03 (lao động/thử việc) và P07 (dịch vụ KHCN, kinh tế) | Hợp đồng đã có thủ tục chuyên trách kiểm soát vòng đời; đưa vào P14 sẽ trùng lặp và tạo hai nguồn sự thật. P14 chỉ giữ nguyên tắc kiểm soát văn bản chung (mã hoá, ký số, lưu trữ) để các thủ tục đó dẫn chiếu. *(Bản thiết kế đầu từng thêm "chương Kiểm soát hợp đồng"; đã gỡ theo quyết định thu hẹp phạm vi — P14 chỉ quản tài liệu/dữ liệu/thông tin.)* |
| 5 | Thống nhất **tên trạng thái** theo `M14_TaiLieu/07_Workflow/StateMachine.md` | Xoá "hai nguồn sự thật"; văn bản pháp lý và phần mềm phải nói cùng một ngôn ngữ |
| 6 | **Không chép lại** nội dung luật/ISO — chỉ dẫn chiếu tới `08_KNOWLEDGE_GRAPH` và `03_MANAGEMENT_SYSTEM` | Đúng nguyên tắc "một quy định – một nơi duy nhất" đã có sẵn trong `_meta/SCHEMA.md` của repo |
| 7 | Đưa toàn bộ hướng dẫn chi tiết, checklist, mẫu văn bản sang **Claude Skill `etv-document-governance`** | P14 là văn bản kiểm soát pháp lý (ít đổi); hướng dẫn thao tác/checklist là tri thức vận hành (đổi thường xuyên) — tách 2 tầng thay đổi khác tốc độ |
| 8 | Thêm bước **Đề xuất** tường minh và tách **Hủy bỏ** khỏi **Thanh lý** | Thanh lý = đổi trạng thái (Hết hiệu lực), Hủy bỏ = xoá khỏi hệ thống kiểm soát — hai hành vi có rủi ro khác nhau, cần phân quyền khác nhau |
| 9 | Thêm cơ chế **soát xét định kỳ** độc lập với soát xét theo yêu cầu | Đáp ứng ISO/IEC 17025 §8.3.1 ("định kỳ soát xét") mà bản cũ chỉ có "khi cần thiết" |
| 10 | Bổ sung dẫn chiếu **ISO 17034 (có điều kiện), ISO/IEC 27001, ISO/IEC 42001** | Phản ánh đúng năng lực hiện có (CAP-09 CRM) và rủi ro hiện có (bảo mật, AI) mà bản cũ bỏ sót |

## 11. Việc KHÔNG thay đổi (giữ nguyên có chủ đích)

- Quy tắc mã hoá văn bản (ETV.QM / ETV.P / ETV.MCa / ETV.Gb...) — giữ nguyên, chỉ làm rõ bằng bảng.
- Vai trò LĐV/LĐP/NTH — giữ nguyên tên gọi, chỉ bổ sung RACI.
- Dấu kiểm soát vật lý ("TÀI LIỆU KIỂM SOÁT"/"TÀI LIỆU KHÔNG KIỂM SOÁT") — vẫn cần thiết cho bản giấy, giữ nguyên.
- 6 biểu mẫu gốc (F14.01–F14.06) — giữ số hiệu, làm rõ nội dung. Không thêm biểu mẫu hợp đồng vào P14 (biểu mẫu hợp đồng thuộc P03/P07).
