# Tri thức — Metadata Schema

> Định nghĩa gốc và duy nhất: `ETV.P14` VI.2 (Metadata chuẩn của văn bản). File này chỉ là bản tra cứu nhanh + khối YAML mẫu để AI chèn vào đầu văn bản khi soạn thảo. **Không sửa ý nghĩa trường tại đây** — mọi thay đổi định nghĩa phải sửa `ETV.P14` trước.

## Khối YAML mẫu (chèn ở đầu văn bản Markdown khi soạn thảo)

```yaml
id: ETV.P xx            # hoặc ETV.P.F xx.yy / ETV.MCa xx / ETV.Gb xx...
title: ""
type: ""                 # Thu-tuc | Quy-trinh | Huong-dan | Bieu-mau | Quyet-dinh | Cong-van | Thong-bao | Bien-ban | Bao-cao | Hop-dong | Giay-chung-nhan | Van-ban-ben-ngoai
owner: ""
department: ""
process: ""               # MPxx liên quan
effective_date: ""
revision: ""
status: ""                # xem knowledge/05_vong_doi_van_ban.md — dùng đúng tên trạng thái
keywords: []
related_documents: []
iso_clause: []
legal_basis: []
ai_tags: []
knowledge_category: ""    # Noi-bo | Cong-khai | Mat
permission: ""            # trỏ nhóm quyền tại ETV.P.F 14.06
retention: ""              # trỏ thời hạn tại ETV.P.F 14.06
digital_signature: ""
source: ""
supersedes: null
superseded_by: null
```

## Trường bắt buộc theo loại văn bản

| Loại | Trường bắt buộc bổ sung |
|---|---|
| Thủ tục, Quy trình, Hướng dẫn, Sổ tay | `iso_clause` không rỗng |
| Quyết định, Công văn, Thông báo, Biên bản, Báo cáo | `legal_basis` nêu Nghị định 30/2020/NĐ-CP nếu là văn bản hành chính |
| Giấy chứng nhận | `digital_signature` + độ không đảm bảo đo (phép định lượng) — xem `templates/giay_chung_nhan.md` |
| Văn bản bên ngoài | `source` = cơ quan ban hành; `legal_basis` = số hiệu văn bản gốc |

## Quy tắc kiểm tra AI phải thực hiện

1. Không để trống `id`, `title`, `type`, `owner`, `department`, `status` — nếu thiếu, hỏi lại người dùng.
2. `status` phải khớp một trong các giá trị tại `knowledge/05_vong_doi_van_ban.md` — không tự đặt tên khác (vd. không dùng "pending", "draft" tiếng Anh lẫn tiếng Việt).
3. `embeddings` không cần AI điền tay — hệ thống ManLab tự sinh khi lưu.
4. Nếu văn bản mới thay thế văn bản cũ, phải điền `supersedes`; nhắc người dùng cập nhật `superseded_by` của văn bản cũ (không tự sửa văn bản cũ nếu không được cấp quyền).
