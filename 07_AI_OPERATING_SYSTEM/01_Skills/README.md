# 01 — Skills

**Ý nghĩa:** Định nghĩa kỹ năng AI

**Lưu file gì ở đây:**
- Các file: định nghĩa kỹ năng ai

**KHÔNG lưu ở đây:**
- Dữ liệu cá nhân/mật trong prompt
- Cấu hình cho AI tự phê duyệt kết quả/chứng chỉ

**Lưu ý:** 42001: AI KHÔNG tự ra kết luận đo lường; mọi agent triển khai phải có hồ sơ AIA theo MP29.

---

## Quy tắc đặt tên thư mục skill

Mỗi skill là **1 thư mục con** của `01_Skills/`, đặt tên theo mẫu (PascalCase liền, không dấu):

```
{Số thứ tự tăng dần}_{Chữ cái đầu tên thư mục cha}_{Tên ngắn gọn nội dung}
```

| Thành phần | Quy tắc | Ví dụ |
|---|---|---|
| **Số thứ tự** | 2 chữ số (`01`, `02`, `03`...) — thứ tự **tạo skill** (thư mục con), không xếp theo ABC. Số tiếp theo = số lớn nhất hiện có + 1, không tái sử dụng số đã bỏ | `03` |
| **Chữ cái đầu tên thư mục cha** | Chữ cái đầu của thư mục cha trực tiếp (`01_Skills` → `S`) — cố định cho mọi skill trong thư mục này | `S` |
| **Tên ngắn gọn nội dung** | PascalCase liền, không dấu, mô tả ngắn gọn nghiệp vụ (2-4 từ ghép liền) — giúp nhận biết skill làm gì chỉ qua tên thư mục, không cần mở `SKILL.md` | `XuLyVanPhong` |

→ Thư mục hoàn chỉnh: `03_S_TenSkillMoi`

**Lưu ý:** tên thư mục (PascalCase) tách biệt với trường `name:` trong frontmatter `SKILL.md` (kebab-case — dùng để Claude nhận diện/kích hoạt skill). Hai giá trị **không cần khớp chữ**, nhưng phải cùng trỏ về một skill — xem bảng mapping bên dưới.

### Bắt buộc kèm theo mỗi skill

- `SKILL.md` — bắt buộc, có frontmatter `name:` (kebab-case, định danh kích hoạt skill).
- `CLAUDE.md` — khuyến nghị nếu skill có hành vi/quy tắc bắt buộc nhiều bước (không phải chỉ mô tả tĩnh).

### Skill hiện có

| Thư mục | `name:` trong SKILL.md |
|---|---|
| `01_S_KiemSoatTaiLieuEtv` | `etv-document-governance` |
| `02_S_XuLyVanPhong` | `xu-ly-van-phong` |

Số tiếp theo cho skill mới: `03`.
