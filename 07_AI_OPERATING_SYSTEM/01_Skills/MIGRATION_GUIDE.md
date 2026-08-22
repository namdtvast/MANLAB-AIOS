# Migration Guide — Nâng cấp Skill sang format Portability

Hướng dẫn cập nhật 3 skill hiện tại (`S14_*`, `02_S_*`, `03_S_*`) từ format cũ sang format chuẩn mới hỗ trợ multi-IDE.

---

## Tóm tắt thay đổi

| Mục | Cũ | Mới | Bắt buộc? |
|---|---|---|---|
| **`name`** | Có, kebab-case | Giữ nguyên | ✓ (không thay) |
| **`title`** | Không có | Thêm tiêu đề tiếng Việt | ✓ Bắt buộc |
| **`version`** | Nằm trong `metadata.version` | Nằm ở top-level frontmatter | ✓ Bắt buộc |
| **`scope`** | Không có | Mảng IDE cần support | ✓ Bắt buộc |
| **`tags`** | Không có | Mảng từ khóa tìm kiếm | ✓ Bắt buộc |
| **`description`** | Có, rất dài (500+ chars) | Giữ lại nhưng rút gọn 1-2 câu | ✓ Tối ưu hóa |
| **`procedure`** | Nằm trong `metadata.owner_procedure` | Top-level, nếu Mẫu A | ◐ Tùy loại |
| **`author`, `license`, `argument-hint`** | Có | Xóa (không cần trong schema mới) | ◐ Tối ưu |
| **`metadata`** | Có | Xóa (đã chuyển top-level) | ✓ Xóa |

---

## Bước 1: Sao lưu

```bash
cd 07_AI_OPERATING_SYSTEM/01_Skills/
cp S14_KiemSoatTaiLieu/SKILL.md S14_KiemSoatTaiLieu/SKILL.md.backup
cp 02_S_XuLyVanPhong/SKILL.md 02_S_XuLyVanPhong/SKILL.md.backup
cp 03_S_NghienCuuHocThuat/SKILL.md 03_S_NghienCuuHocThuat/SKILL.md.backup
```

---

## Bước 2: Update từng skill

### Skill 1: `S14_KiemSoatTaiLieu`

**Trước (cũ):**
```yaml
---
name: s14-kiem-soat-tai-lieu
description: "Kiểm soát tài liệu, dữ liệu, thông tin tại Viện Kiểm định Công nghệ và Môi trường (ETV)..."
argument-hint: "[loại văn bản] [hành động: soạn thảo|soát xét|kiểm tra|phân loại]"
license: Internal-ETV
metadata:
  author: ETV-QMS
  version: "1.0.0"
  owner_procedure: ETV.P14
---
```

**Sau (mới):**
```yaml
---
name: s14-kiem-soat-tai-lieu
title: Kiểm soát Tài liệu & Dữ liệu ETV
description: Kiểm soát vòng đời tài liệu/dữ liệu tại ETV theo ETV.P14 — nhận diện loại, căn cứ pháp luật, thể thức, metadata, kiểm tra trước ban hành
version: "1.0.0"
scope:
  - claude-code
procedure: "ETV.P14"
tags:
  - document-governance
  - quality-management
  - compliance
  - etv-procedure
  - vietnam-vietnamese
---
```

**Giải thích từng trường:**
- `title`: Rút gọn từ `description` cũ (tối đa 100 chars)
- `description`: Rút gọn còn 1-2 câu (tối đa 500 chars) — chỉ nêu ghi chú chính
- `scope`: Hiện tại chỉ `claude-code`, nhưng có thể thêm `cursor`, `gemini-cli` khi test song song
- `tags`: Từ khóa tìm kiếm — từ loại tài liệu (document-governance), từ kỹ thuật (quality-management), từ pháp luật (compliance), từ thủ tục (etv-procedure)

### Skill 2: `02_S_XuLyVanPhong`

**Trước:**
```yaml
---
name: 02-s-xu-ly-van-phong
description: "..."
metadata:
  version: "1.0.0"
---
```

**Sau:**
```yaml
---
name: 02-s-xu-ly-van-phong
title: Xử Lý Văn Phòng & Tài Liệu
description: Sinh file, soát xét biểu mẫu, xử lý luồng văn phòng cho tài liệu ETV
version: "1.0.0"
scope:
  - claude-code
tags:
  - office-processing
  - document-generation
  - forms-handling
  - etv-workflow
---
```

### Skill 3: `03_S_NghienCuuHocThuat`

**Sau:**
```yaml
---
name: 03-s-nghien-cuu-hoc-thuat
title: Hệ Điều Hành Nghiên Cứu Học Thuật
description: Hỗ trợ tìm kiếm, phân tích, tổng hợp tài liệu học thuật cho dự án MANLAB
version: "1.0.0"
scope:
  - claude-code
tags:
  - academic-research
  - knowledge-synthesis
  - manlab-research
  - vietnam-vietnamese
---
```

---

## Bước 3: Validate

```bash
# Test từng skill
python3 _meta/validate_skill_schema.py S14_KiemSoatTaiLieu
python3 _meta/validate_skill_schema.py 02_S_XuLyVanPhong
python3 _meta/validate_skill_schema.py 03_S_NghienCuuHocThuat

# Test tất cả
python3 _meta/validate_skill_schema.py
```

Nếu lỗi, sửa frontmatter theo hướng dẫn & chạy lại.

---

## Bước 4: Export (tuỳ chọn)

Nếu muốn test Cursor integration ngay:

```bash
python3 _meta/export_skill_cursor.py --all --output .cursor/skills.json
```

Cái file `.cursor/skills.json` sẽ chứa 3 skill (vì tất cả đều có `"cursor"` trong `scope`).

---

## Bước 5: Commit

```bash
git add 07_AI_OPERATING_SYSTEM/01_Skills/S14_KiemSoatTaiLieu/SKILL.md
git add 07_AI_OPERATING_SYSTEM/01_Skills/02_S_XuLyVanPhong/SKILL.md
git add 07_AI_OPERATING_SYSTEM/01_Skills/03_S_NghienCuuHocThuat/SKILL.md
git add .cursor/skills.json
git commit -m "chore(skills): migrate SKILL.md to portable format (add scope, tags, title)"
git push
```

---

## Bước 6: Test (tùy chọn)

Nếu có Cursor cài sẵn:

1. Copy `.cursor/skills.json` vào project
2. Restart Cursor
3. Gõ `/` → xem 3 skill xuất hiện

---

## Danh sách check

- [ ] Backup 3 file SKILL.md
- [ ] Update `S14_KiemSoatTaiLieu/SKILL.md`
  - [ ] Thêm `title`
  - [ ] Rút gọn `description` (1-2 câu)
  - [ ] Di chuyển `version` từ `metadata` lên top-level
  - [ ] Xóa `metadata` block
  - [ ] Thêm `scope` mảng
  - [ ] Thêm `tags` mảng
  - [ ] (Tùy) Thêm `procedure` từ `owner_procedure`
  - [ ] Xóa `license`, `argument-hint` (không cần)
- [ ] Update `02_S_XuLyVanPhong/SKILL.md` (tương tự)
- [ ] Update `03_S_NghienCuuHocThuat/SKILL.md` (tương tự)
- [ ] Chạy `validate_skill_schema.py` — pass tất cả
- [ ] Chạy `export_skill_cursor.py --all` (tuỳ chọn)
- [ ] Commit & push

---

## Lưu ý

1. **`scope` hiện tại chỉ thêm `claude-code`** — có thể thêm `cursor`, `gemini-cli` khi đã test đủ trên các IDE đó

2. **`tags` không bắt buộc phải khớp với tên** — chỉ cần mô tả ý nghĩa skill để tìm kiếm

3. **`title` nên rút gọn & tiếng Việt** — dùng để hiển thị trên IDE dropdown

4. **Không xóa nội dung body (phần Markdown)** — chỉ cập nhật frontmatter

5. **Lưu ý ISO 42001:** Skill không được tự phê duyệt/ký — CLAUDE.md đã có constraint này, giữ nguyên

---

## Troubleshooting

**Lỗi:** "No frontmatter found"
- Kiểm tra `SKILL.md` bắt đầu với `---` và kết thúc frontmatter với `---`

**Lỗi:** "'name' is not kebab-case"
- Kiểm tra `name:` chỉ chứa chữ thường, chữ số, dấu gạch ngang

**Lỗi:** "`scope` must be an array"
- `scope:` phải là mảng YAML:
  ```yaml
  scope:
    - claude-code
    - cursor
  ```
  Không phải string: `scope: "claude-code"`

---

## Kế tiếp

- [ ] Sau khi migrate, có thể implement adapter cho Gemini CLI, VS Code, OpenAI
- [ ] Test Cursor integration (nếu có Cursor cài sẵn)
- [ ] Kích hoạt CI/CD workflow `.github/workflows/skill-export.yml`
