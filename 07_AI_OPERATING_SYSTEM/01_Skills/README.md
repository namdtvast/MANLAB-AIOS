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

Mỗi skill là **1 thư mục con** của `01_Skills/` (PascalCase liền, không dấu). Tên thư mục chọn theo **một trong hai mẫu**, tuỳ skill có gắn với một Thủ tục hay không.

### Mẫu A — Skill vận hành một Thủ tục (ưu tiên)

Khi skill là bản triển khai AI của một Thủ tục cụ thể (`ETV.P{N}`), đặt tên **bám theo số thủ tục** để nhìn tên thư mục là biết ngay skill phục vụ thủ tục nào:

```
S{Số thủ tục}_{Tên ngắn gọn nội dung}
```

| Thành phần | Quy tắc | Ví dụ |
|---|---|---|
| **`S`** | Viết tắt của **Skills** — cố định cho mọi skill trong thư mục này | `S` |
| **Số thủ tục** | Số của Thủ tục tương ứng (`ETV.P14` → `14`). **Không** phải số thứ tự tạo skill | `14` |
| **Tên ngắn gọn nội dung** | PascalCase liền, không dấu — **khớp với tên ngắn của thủ tục** để đồng bộ (`ETV.P14_KiemSoatTaiLieu` → `KiemSoatTaiLieu`) | `KiemSoatTaiLieu` |

→ Thư mục hoàn chỉnh: `S14_KiemSoatTaiLieu` (vận hành `ETV.P14_KiemSoatTaiLieu.md`).

Cách này giúp thư mục skill **cùng nhịp đặt tên** với thư mục/file của Thủ tục, tra chéo thủ tục ↔ skill chỉ qua con số.

### Mẫu B — Skill không gắn thủ tục nào

Khi skill là năng lực kỹ thuật dùng chung, không phải bản triển khai của một Thủ tục cụ thể, giữ quy ước cũ:

```
{Số thứ tự tăng dần}_{Chữ cái đầu tên thư mục cha}_{Tên ngắn gọn nội dung}
```

| Thành phần | Quy tắc | Ví dụ |
|---|---|---|
| **Số thứ tự** | 2 chữ số (`02`, `03`...) — thứ tự **tạo skill**, không xếp theo ABC. Số tiếp theo = số lớn nhất hiện có + 1, không tái sử dụng số đã bỏ | `02` |
| **Chữ cái đầu tên thư mục cha** | `01_Skills` → `S`, cố định | `S` |
| **Tên ngắn gọn nội dung** | PascalCase liền, không dấu, 2-4 từ ghép | `XuLyVanPhong` |

→ Thư mục hoàn chỉnh: `02_S_XuLyVanPhong`.

### Chọn mẫu nào?

- Skill **ánh xạ 1-1 với một Thủ tục** `ETV.P{N}` → **Mẫu A** (`S{N}_...`).
- Skill **không có thủ tục tương ứng** (năng lực kỹ thuật dùng chung) → **Mẫu B** (`{stt}_S_...`).

> **Lưu ý:** tên thư mục (PascalCase) tách biệt với trường `name:` trong frontmatter `SKILL.md` (kebab-case — dùng để Claude nhận diện/kích hoạt skill). Hai giá trị **không cần khớp chữ**, nhưng phải cùng trỏ về một skill — xem bảng mapping bên dưới.

### Bắt buộc kèm theo mỗi skill

- `SKILL.md` — bắt buộc, có frontmatter `name:` (kebab-case, định danh kích hoạt skill).
- `CLAUDE.md` — khuyến nghị nếu skill có hành vi/quy tắc bắt buộc nhiều bước (không phải chỉ mô tả tĩnh).

### Skill hiện có

| Thư mục | Mẫu | Thủ tục nguồn | `name:` trong SKILL.md |
|---|---|---|---|
| `S14_KiemSoatTaiLieu` | A | `ETV.P14` — Kiểm soát tài liệu | `etv-document-governance` |
| `02_S_XuLyVanPhong` | B | (không có) | `xu-ly-van-phong` |

Số thứ tự tiếp theo cho skill **Mẫu B** (không gắn thủ tục): `03` (số `01` đã bỏ, không tái sử dụng).
