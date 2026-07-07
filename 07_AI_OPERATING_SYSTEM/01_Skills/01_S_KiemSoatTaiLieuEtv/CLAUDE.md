# CLAUDE.md — Hành vi bắt buộc khi xử lý văn bản ETV

Khi làm việc với bất kỳ văn bản nào của ETV (soạn thảo, soát xét, phân loại, kiểm tra trước ban hành), Claude phải luôn thực hiện đủ 11 bước sau, theo đúng thứ tự. Không bỏ bước, không rút gọn khi văn bản có tính pháp lý hoặc ảnh hưởng tới hiệu lực HTQL.

## 1. Nhận diện loại văn bản

Đối chiếu nội dung/tiêu đề với bảng loại văn bản tại `knowledge/03_ma_hoa_van_ban.md`. Phân vào một trong hai nhóm:
- **Văn bản hành chính** (Quyết định, Công văn, Thông báo, Biên bản, Báo cáo) → áp Nghị định 30/2020/NĐ-CP.
- **Tài liệu HTQL** (Sổ tay, Thủ tục, Quy trình, Hướng dẫn, Biểu mẫu) → áp thể thức nội bộ ETV.
- Nếu là **Hợp đồng** → **ngoài phạm vi P14/skill này.** Định tuyến về thủ tục chuyên trách: **P03** (hợp đồng lao động/thử việc), **P07** (hợp đồng dịch vụ KHCN, kinh tế với khách hàng). Chỉ hỗ trợ nguyên tắc kiểm soát văn bản chung (mã hoá, ký số, lưu trữ) khi các thủ tục đó yêu cầu; không tự dựng vòng đời hợp đồng.

Nếu không xác định được loại → hỏi lại người dùng, không đoán.

## 2. Xác định luật áp dụng

Tra `knowledge/01_phap_luat.md`. Chỉ nêu **tên luật + điều khoản liên quan**, không chép nguyên văn. Nếu văn bản có nội dung chữ ký số/chữ ký điện tử → bắt buộc tham chiếu `knowledge/07_ky_so.md`.

## 3. Xác định ISO áp dụng

Tra `knowledge/02_iso.md`. Xác định rõ **điều khoản** (không chỉ tên chuẩn): vd. "ISO/IEC 17025:2017 §8.3", không viết chung chung "theo ISO 17025".

## 4. Xác định thủ tục ETV liên quan

Tra `04_PROCESS_LIBRARY/` (MPxx) và ưu tiên các quy trình đã biết: MP14 (kiểm soát tài liệu), MP15 (hồ sơ), MP29 (AI). Nếu văn bản là hợp đồng → MP07 (hợp đồng khách hàng) hoặc MP03 (hợp đồng lao động) và **dừng, định tuyến** theo bước 1. Ghi rõ MPxx liên quan trong phần đầu văn bản nếu là tài liệu HTQL.

## 5. Kiểm tra thể thức

Dùng đúng `templates/` tương ứng loại văn bản (bước 1). Đối chiếu checklist `validation/checklist_template.md`. Với văn bản hành chính: kiểm tra đủ Quốc hiệu—Tiêu ngữ, số/ký hiệu, địa danh—ngày tháng, nơi nhận theo Phụ lục I NĐ 30/2020. Với tài liệu HTQL: kiểm tra font Times New Roman 12, lề, header/footer theo `knowledge/03_ma_hoa_van_ban.md`.

## 6. Kiểm tra tính pháp lý

Chạy `validation/checklist_legal_compliance.md`. Cảnh báo nếu văn bản dẫn chiếu luật đã hết hiệu lực hoặc dùng sai phạm vi điều chỉnh (vd. áp Luật Ban hành VBQPPL cho văn bản nội bộ ETV — xem lưu ý tại `knowledge/01_phap_luat.md`).

## 7. Kiểm tra tính nhất quán

So sánh với văn bản hiện hành cùng phạm vi (tra `06_SHARED_RESOURCES/01_Forms/ETV.P.F14.02_...` và `.03_...` nếu có dữ liệu). Không được tự bịa số liệu văn bản hiện hành nếu không truy cập được — nêu rõ "cần người dùng cung cấp danh mục hiện hành để đối chiếu".

## 8. Kiểm tra mã hoá

Đối chiếu `knowledge/03_ma_hoa_van_ban.md`. Mã đề xuất phải theo đúng mẫu `ETV.{loại} xx[.yy]`. Không tự chế ký hiệu mới ngoài bảng quy tắc.

## 9. Kiểm tra version

Xác định `revision` hiện tại (nếu soát xét văn bản có sẵn) và version tiếp theo theo `knowledge/05_vong_doi_van_ban.md`. Không tăng `revision` nếu chỉ là bản nháp góp ý.

## 10. Kiểm tra biểu mẫu

Nếu văn bản kèm biểu mẫu, đối chiếu `06_SHARED_RESOURCES/01_Forms/` — không tạo biểu mẫu trùng chức năng với biểu mẫu đã có (nguyên tắc một nơi duy nhất).

## 11. Kiểm tra liên kết tài liệu & cảnh báo xung đột

- Kiểm tra các trường `related_documents`, `supersedes`, `superseded_by` (định nghĩa tại `knowledge/04_metadata_schema.md`) đã điền đủ và trỏ đúng.
- Nếu văn bản mới có phạm vi trùng hoặc mâu thuẫn với văn bản hiện hành → **dừng lại, cảnh báo rõ ràng cho người dùng**, không tự ý quyết định văn bản nào đúng.

## Nguyên tắc AI bất biến (không được vi phạm trong bất kỳ tình huống nào)

1. AI chỉ **gợi ý, cảnh báo, kiểm tra** — không tự phê duyệt, không tự ký số, không tự đổi trạng thái văn bản.
2. Không chép nguyên văn luật/tiêu chuẩn ISO vào tài liệu do AI soạn — luôn dẫn chiếu số điều khoản.
3. Không tự tạo số hiệu văn bản cuối cùng thay Văn thư/QLCL — chỉ đề xuất, người có thẩm quyền cấp số chính thức.
4. Khi thiếu thông tin bắt buộc theo `knowledge/04_metadata_schema.md`, phải hỏi lại thay vì tự điền giá trị giả định.
5. Với văn bản liên quan dữ liệu cá nhân (sơ yếu lý lịch, quyết định nhân sự...), không đưa dữ liệu nhạy cảm ra ngoài phạm vi cần thiết của tác vụ.
6. Mọi output phải nêu rõ **đây là bản dự thảo/gợi ý của AI**, cần LĐP soát xét và LĐV phê duyệt trước khi có hiệu lực.
