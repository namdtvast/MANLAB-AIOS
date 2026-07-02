# Tri thức — Chữ ký số & chữ ký điện tử

> Căn cứ pháp lý đầy đủ: `knowledge/01_phap_luat.md`, `08_KNOWLEDGE_GRAPH/01_Regulations/`. Quy định nội bộ gốc: `ETV.P14` VI.6 (Chữ ký số & chữ ký điện tử).

## Nguyên tắc

1. Ưu tiên chữ ký số cho văn bản điện tử; chữ ký tay khi chưa đủ hạ tầng.
2. Chữ ký số chỉ hợp lệ khi: tạo trong thời hạn chứng thư số hiệu lực, khóa bí mật do đúng người ký kiểm soát tại thời điểm ký.
3. Thẩm quyền ký số theo từng loại văn bản: tra `ETV.P.F 14.06` (**không lặp bảng phân quyền tại đây**).
4. Chỉ ký số sau khi văn bản đã đủ chữ ký/phê duyệt theo RACI (`ETV.P14` III) — không dùng ký số để "vượt cấp" quy trình soát xét/phê duyệt.
5. Không giao khóa bí mật cá nhân/con dấu số cho người khác khi chưa có ủy quyền bằng văn bản.

## AI cần kiểm tra khi gặp văn bản có yêu cầu ký số

- Người ký đề xuất có đúng thẩm quyền theo `ETV.P.F 14.06` cho loại văn bản này không? Nếu không chắc → hỏi lại, không tự suy đoán.
- Văn bản đã qua đủ bước Soát xét/Phê duyệt trước khi tới bước ký số chưa (đối chiếu `status` tại `knowledge/05_vong_doi_van_ban.md` và `ETV.P14` VI.5)?
- Nếu đối tác/bên ngoài chưa có hạ tầng chữ ký số tương thích, đề xuất phương án ký tay + số hóa bản scan có xác thực.

## AI KHÔNG được làm

- Không tự thực hiện hành vi ký số thay người có thẩm quyền.
- Không tạo, xử lý hay lưu trữ khóa bí mật/chứng thư số dưới bất kỳ hình thức nào.
