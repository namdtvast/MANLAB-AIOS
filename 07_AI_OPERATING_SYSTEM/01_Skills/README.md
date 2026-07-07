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

Mỗi skill là **1 thư mục con** của `01_Skills/`, đặt tên theo mẫu:

```
{Số thứ tự}_{Tên thư mục}_{Tên nội dung}
```

| Thành phần | Quy tắc | Ví dụ |
|---|---|---|
| **Số thứ tự** | 2 chữ số (`01`, `02`, `03`...) — thứ tự **tạo skill**, không xếp theo ABC. Số tiếp theo = số lớn nhất hiện có + 1, không tái sử dụng số đã bỏ | `03` |
| **Tên thư mục** | Định danh kỹ thuật của skill: kebab-case, không dấu. **Phải trùng khớp tuyệt đối** với trường `name:` trong frontmatter của `SKILL.md` bên trong — đây là tên Claude dùng để nhận diện và kích hoạt skill. Không đổi sau khi đã có nơi khác tham chiếu tới | `xu-ly-van-phong` |
| **Tên nội dung** | Mô tả ngắn gọn nghiệp vụ (2-5 từ, không dấu, nối bằng gạch ngang) — giúp nhận biết skill làm gì chỉ qua tên thư mục, không cần mở `SKILL.md` | `tao-sua-file-van-phong` |

→ Thư mục hoàn chỉnh: `02_xu-ly-van-phong_tao-sua-file-van-phong`

### Bắt buộc kèm theo mỗi skill

- `SKILL.md` — bắt buộc, frontmatter có `name:` khớp với "Tên thư mục" ở trên.
- `CLAUDE.md` — khuyến nghị nếu skill có hành vi/quy tắc bắt buộc nhiều bước (không phải chỉ mô tả tĩnh).

### Skill hiện có

| Thư mục | Tên thư mục (= `name:` trong SKILL.md) |
|---|---|
| `01_etv-document-governance_kiem-soat-tai-lieu-etv` | `etv-document-governance` |
| `02_xu-ly-van-phong_tao-sua-file-van-phong` | `xu-ly-van-phong` |

Số tiếp theo cho skill mới: `03`.
