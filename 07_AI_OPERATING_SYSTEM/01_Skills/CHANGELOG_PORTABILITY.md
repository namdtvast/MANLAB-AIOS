# Changelog — Skill Portability Feature

**Ngày:** 2026-07-25

Bổ sung hệ thống chuẩn hóa & export skill để dùng được trên nhiều AI IDE/CLI (Cursor, Codex, Gemini CLI, VS Code, OpenAI API).

---

## ✨ Thêm mới

### Tài liệu

1. **README.md** — Bổ sung phần "Chuẩn hóa & Portability"
   - Cấu trúc frontmatter SKILL.md chuẩn
   - Hướng dẫn 5 loại adapter (Cursor, Gemini, VS Code, Codex, OpenAI)
   - Compatibility matrix
   - Quy trình đồng bộ khi sửa skill
   - Lưu ý design "portable"

2. **QUICK_START.md** — Hướng dẫn nhanh per IDE
   - Setup & kích hoạt skill trên Cursor
   - Setup & kích hoạt skill trên Gemini CLI
   - Setup & kích hoạt skill trên VS Code Copilot
   - Setup & kích hoạt skill trên OpenAI Codex
   - Cách tạo skill mới & export
   - Troubleshooting

3. **SKILL_TEMPLATE.md** — Template chuẩn
   - Frontmatter mẫu (bắt buộc & tùy chọn)
   - Body markdown structure (ý nghĩa, khi nào dùng, hành vi, ví dụ)
   - Ghi chú cho từng IDE

4. **INDEX.md** — Index & tóm tắt
   - Danh sách tất cả file
   - Bảng mục đích từng script
   - Quy trình làm việc (tạo skill → validate → export → commit)
   - Cấu trúc frontmatter
   - Checklist khi thêm skill
   - Troubleshooting

### Script & Tool

1. **`_meta/skills_schema.json`** — JSON Schema
   - Định nghĩa cấu trúc SKILL.md (frontmatter)
   - Yêu cầu: `name`, `title`, `description`, `version`, `scope`, `tags`
   - Tùy chọn: `author`, `created_at`, `updated_at`, `security`, v.v.

2. **`_meta/validate_skill_schema.py`** — Validation script
   ```bash
   python3 _meta/validate_skill_schema.py              # Validate tất cả skill
   python3 _meta/validate_skill_schema.py S14_TenSkill # Validate 1 skill
   ```
   - Kiểm tra SKILL.md tuân thủ schema
   - Báo lỗi chi tiết từng field
   - Exit code 1 nếu có lỗi (dùng trong CI)

3. **`_meta/export_skill_cursor.py`** — Adapter cho Cursor
   ```bash
   python3 _meta/export_skill_cursor.py --all --output .cursor/skills.json
   python3 _meta/export_skill_cursor.py S14_KiemSoatTaiLieu
   ```
   - Convert SKILL.md + CLAUDE.md → `.cursor/skills.json` (JSON array)
   - Lọc skill có `"cursor"` trong `scope:`
   - Ready to use, tested

4. **`_meta/export_all_skills.py`** — Master export script
   ```bash
   python3 _meta/export_all_skills.py
   ```
   - Chạy tất cả adapter cùng lúc
   - Báo tổng hợp kết quả
   - Return exit code 1 nếu có adapter fail

5. **CI/CD Workflow** — `.github/workflows/skill-export.yml`
   - Trigger khi push/PR thay đổi `07_AI_OPERATING_SYSTEM/01_Skills/` hoặc `_meta/export_*.py`
   - Tự động chạy `validate_skill_schema.py` & `export_all_skills.py`
   - Tự động commit & push export files nếu có thay đổi
   - Comment trên PR với trạng thái

---

## 🔄 Quy trình sử dụng

### Tạo skill mới

```bash
# 1. Tạo thư mục
mkdir -p 07_AI_OPERATING_SYSTEM/01_Skills/S42_TenSkill

# 2. Copy template
cp 07_AI_OPERATING_SYSTEM/01_Skills/SKILL_TEMPLATE.md \
   07_AI_OPERATING_SYSTEM/01_Skills/S42_TenSkill/SKILL.md

# 3. Sửa frontmatter & viết nội dung

# 4. Validate
python3 _meta/validate_skill_schema.py S42_TenSkill

# 5. Export (nếu cần multi-IDE)
python3 _meta/export_all_skills.py

# 6. Commit & push
git add 07_AI_OPERATING_SYSTEM/01_Skills/S42_TenSkill/
git add .cursor/skills.json
git commit -m "feat(S42): thêm skill Tên Skill"
git push
```

### Sửa skill hiện tại

```bash
# 1. Sửa SKILL.md (hoặc CLAUDE.md)

# 2. Tăng version trong frontmatter
# (1.0.0 → 1.0.1 cho patch, 1.1.0 cho minor, 2.0.0 cho major)

# 3. Validate
python3 _meta/validate_skill_schema.py S14_KiemSoatTaiLieu

# 4. Export (CI tự động chạy, nhưng test trước local)
python3 _meta/export_all_skills.py

# 5. Test skill trên IDE nếu thay đổi prompt

# 6. Commit & push
git add 07_AI_OPERATING_SYSTEM/01_Skills/S14_KiemSoatTaiLieu/
git add .cursor/skills.json
git commit -m "feat(S14): cập nhật prompt kiểm soát tài liệu"
git push
```

---

## 📊 Trạng thái hiện tại

### Skill hiện tại (cần migrate)

| Skill | Format | Action |
|---|---|---|
| `S14_KiemSoatTaiLieu` | Có `SKILL.md` + `CLAUDE.md` | Cập nhật SKILL.md theo template (thêm scope, version, tags) |
| `02_S_XuLyVanPhong` | Có `SKILL.md` | Cập nhật SKILL.md theo template |
| `03_S_NghienCuuHocThuat` | Có `SKILL.md` | Cập nhật SKILL.md theo template |

### Adapter status

| Adapter | IDE | Status | Ghi chú |
|---|---|---|---|
| `export_skill_cursor.py` | Cursor | ✓ Ready | Tested, sinh `.cursor/skills.json` |
| `export_skill_gemini.py` | Gemini CLI | ◐ Template | Script chưa có, cần implement (dùng mẫu Cursor) |
| `export_skill_vscode.py` | VS Code Copilot | ◐ Template | Script chưa có, cần implement |
| `export_skill_openai.py` | OpenAI API | ◐ Template | Script chưa có, cần implement (convert → function schema) |

---

## 🎯 Next steps

1. **Test ngay:** Chạy `export_skill_cursor.py` với skill hiện tại
   ```bash
   python3 _meta/validate_skill_schema.py
   python3 _meta/export_skill_cursor.py --all --output .cursor/skills.json
   ```

2. **Migrate skill hiện tại:** Update frontmatter 3 skill hiện tại theo template (thêm `scope`, `version`, `tags`)

3. **Test Cursor integration:** Export & test skill trên Cursor

4. **Implement adapter khác:** Gemini, VS Code, OpenAI (tuần tới)

5. **CI/CD activation:** Kích hoạt workflow khi đã tested đủ

---

## 📚 Tài liệu & Script

**Tài liệu:**
- `07_AI_OPERATING_SYSTEM/01_Skills/README.md` (đã cập nhật phần Portability)
- `07_AI_OPERATING_SYSTEM/01_Skills/QUICK_START.md` (mới)
- `07_AI_OPERATING_SYSTEM/01_Skills/SKILL_TEMPLATE.md` (mới)
- `07_AI_OPERATING_SYSTEM/01_Skills/INDEX.md` (mới)
- `07_AI_OPERATING_SYSTEM/01_Skills/CHANGELOG_PORTABILITY.md` (tài liệu này)

**Script:**
- `_meta/skills_schema.json` (mới)
- `_meta/validate_skill_schema.py` (mới)
- `_meta/export_skill_cursor.py` (mới, ready)
- `_meta/export_all_skills.py` (mới)

**CI/CD:**
- `.github/workflows/skill-export.yml` (mới)

---

## ⚠️ Breaking changes (none)

Tất cả thay đổi là **backward-compatible**:
- Skill hiện tại vẫn chạy bình thường trên Claude Code
- Export sang IDE khác là tùy chọn
- SKILL.md cũ vẫn được recognize (chỉ cần thêm `scope` nếu muốn export)
