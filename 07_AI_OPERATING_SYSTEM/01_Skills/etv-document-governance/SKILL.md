---
name: etv-document-governance
description: "Kiểm soát tài liệu, dữ liệu, thông tin tại Viện Kiểm định Công nghệ và Môi trường (ETV) theo ETV.P14. Nhận diện loại văn bản, xác định căn cứ pháp luật/ISO áp dụng, kiểm tra thể thức, mã hóa, metadata, liên kết tài liệu, phát hiện xung đột, sinh template chuẩn (Quyết định, Công văn, Báo cáo, Thông báo, Biên bản, Thủ tục, Quy trình, Hướng dẫn, Giấy chứng nhận, Biểu mẫu) và checklist kiểm tra trước khi ban hành. Dùng khi: soạn thảo/soát xét/ban hành văn bản nội bộ hoặc bên ngoài, kiểm tra tuân thủ Nghị định 30/2020/NĐ-CP, Luật Giao dịch điện tử 2023, ISO 9001/17025/17034/27001/42001, hoặc khi làm việc với ManLab document module (M14). Không quản lý vòng đời hợp đồng — hợp đồng thuộc thủ tục chuyên trách (P03 nhân sự, P07 dịch vụ); skill chỉ nhận diện và định tuyến về các thủ tục đó."
argument-hint: "[loại văn bản] [hành động: soạn thảo|soát xét|kiểm tra|phân loại]"
license: Internal-ETV
metadata:
  author: ETV-QMS
  version: "1.0.0"
  owner_procedure: ETV.P14
---

# ETV Document Governance

Skill quản trị vòng đời tài liệu, dữ liệu, thông tin của ETV — bản triển khai AI của thủ tục **`ETV.P14 — Kiểm soát tài liệu, dữ liệu, thông tin`**. **Không** quản lý vòng đời hợp đồng (thuộc P03/P07); khi gặp hợp đồng, skill chỉ nhận diện và định tuyến về thủ tục chuyên trách.

> **Quan hệ với ETV.P14**: Skill này **không** thay thế hay định nghĩa lại quy định — mọi luật chơi (metadata bắt buộc, quy tắc mã hoá, RACI, vòng đời) đã được quy định tại `03_MANAGEMENT_SYSTEM/03_ISO17025/procedures/ETV.P14_KiemSoatTaiLieu.md`. Skill chỉ **vận hành hoá** quy định đó thành hành vi AI có thể lặp lại, kiểm tra được.

## Khi nào dùng skill này

- Soạn thảo mới hoặc soát xét: Quyết định, Công văn, Thông báo, Biên bản, Báo cáo, Thủ tục, Quy trình, Hướng dẫn, Biểu mẫu, Giấy chứng nhận.
- Cần xác định: loại văn bản, căn cứ pháp lý áp dụng, điều khoản ISO áp dụng, thủ tục ETV liên quan.
- Cần kiểm tra trước khi trình ký: thể thức, mã hoá, version, liên kết tài liệu, xung đột với văn bản hiện hành.
- Cần dựng metadata chuẩn cho một văn bản mới để nạp vào ManLab (M14_TaiLieu).

## Cách hoạt động

1. Đọc `CLAUDE.md` — quy tắc hành vi bắt buộc khi xử lý bất kỳ văn bản nào.
2. Xác định loại văn bản → chọn `templates/` tương ứng.
3. Tra `knowledge/` để lấy đúng căn cứ pháp luật/ISO/mã hoá/metadata — **không tự suy diễn**, không chép nguyên văn luật.
4. Chạy `validation/` checklist phù hợp trước khi coi văn bản là "sẵn sàng trình ký".
5. Tham khảo `examples/` nếu cần một bản mẫu đã điền đủ để đối chiếu.
6. Với thao tác nhiều bước (ban hành, soát xét/sửa đổi, thu hồi/hủy, ký số), theo đúng `workflows/`.
7. Khi nội dung đã chốt và cần xuất file `.docx`/`.pptx`/`.xlsx` vật lý (không chỉ Markdown), chuyển sang skill `xu-ly-van-phong` (`07_AI_OPERATING_SYSTEM/01_Skills/xu-ly-van-phong`) — skill đó sở hữu toàn bộ pipeline sinh file, không dựng lại thể thức pháp lý đã chốt ở đây.

## Bản đồ thư mục

| Thư mục | Nội dung |
|---|---|
| `CLAUDE.md` | Quy tắc hành vi AI bắt buộc (nhận diện, kiểm tra, cảnh báo) |
| `knowledge/` | Tri thức nền: pháp luật, ISO, mã hoá, metadata schema, vòng đời, chữ ký số |
| `templates/` | Template Markdown chuẩn cho từng loại văn bản |
| `validation/` | Checklist kiểm tra trước khi ban hành |
| `examples/` | Ví dụ đã điền đầy đủ để đối chiếu |
| `workflows/` | Quy trình nhiều bước: ban hành, soát xét/sửa đổi, thu hồi/hủy, ký số |

## Giới hạn (không được làm)

- Không tự phê duyệt, ký số, thu hồi hay hủy văn bản — chỉ LĐP/LĐV theo `ETV.P14` III (Phân quyền vai trò và trách nhiệm RACI).
- Không chép nguyên văn luật/ISO vào văn bản đang soạn — luôn dẫn chiếu (`knowledge/01_phap_luat.md`, `knowledge/02_iso.md`).
- Không tự đặt tên trạng thái khác ngoài bảng tại `knowledge/05_vong_doi_van_ban.md`.
- Không xử lý dữ liệu cá nhân/mật nhạy cảm trong nội dung prompt khi không cần thiết.
- Không tự sinh file `.docx`/`.pptx`/`.xlsx` vật lý (OOXML, Brand Kit, format NĐ 30) — đó là phạm vi của skill `xu-ly-van-phong`.
- Mọi agent triển khai tính năng AI trong skill này khi đưa vào production phải có hồ sơ đánh giá tác động (AIA) theo `MP29_AI`.
