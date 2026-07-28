# Skill System — Tài liệu & Script Portability

Index đầy đủ các file & hướng dẫn để làm skill portable trên nhiều AI IDE/CLI.

---

## 📖 Tài liệu chính

| File | Mục đích |
|---|---|
| **[README.md](README.md)** | Quy tắc đặt tên, cấu trúc skill (Mẫu A/B), & hướng dẫn chuẩn hóa portability |
| **[QUICK_START.md](QUICK_START.md)** | Hướng dẫn nhanh: cách sử dụng & export skill cho từng IDE (Cursor, Gemini CLI, VS Code, OpenAI) |
| **[SKILL_TEMPLATE.md](SKILL_TEMPLATE.md)** | Template chuẩn `SKILL.md` để copy khi tạo skill mới |

---

## 🔧 Script & Tool

### Validation & Export

| File | Mục đích | Chạy khi nào |
|---|---|---|
| `_meta/skills_schema.json` | JSON Schema định nghĩa cấu trúc SKILL.md | (định nghĩa, không chạy) |
| `_meta/validate_skill_schema.py` | Kiểm tra SKILL.md tuân thủ schema | `python3 _meta/validate_skill_schema.py` (trước export) |
| `_meta/export_skill_cursor.py` | Export skill sang format Cursor (`.cursor/skills.json`) | `python3 _meta/export_skill_cursor.py --all` |
| `_meta/export_all_skills.py` | Chạy tất cả adapter cùng lúc | `python3 _meta/export_all_skills.py` (sau khi sửa SKILL.md) |

### Adapter từ SKILL.md sang IDE khác (sắp tới)

| File | IDE/Platform | Status |
|---|---|---|
| `_meta/export_skill_cursor.py` | Cursor | ✓ Có |
| `_meta/export_skill_gemini.py` | Gemini CLI | ◐ Template sẵn, chưa test |
| `_meta/export_skill_vscode.py` | VS Code Copilot | ◐ Template sẵn, chưa test |
| `_meta/export_skill_openai.py` | OpenAI Codex / GitHub Copilot API | ◐ Template sẵn, chưa test |

---

## 🚀 Quy trình làm việc

### 1. Tạo skill mới

```bash
# Tạo thư mục
mkdir -p 07_AI_OPERATING_SYSTEM/01_Skills/S42_TenSkill

# Copy template
cp 07_AI_OPERATING_SYSTEM/01_Skills/SKILL_TEMPLATE.md \
   07_AI_OPERATING_SYSTEM/01_Skills/S42_TenSkill/SKILL.md

# Sửa frontmatter & viết nội dung
```

### 2. Kiểm tra schema

```bash
python3 _meta/validate_skill_schema.py S42_TenSkill
```

### 3. Export sang IDE khác (nếu cần)

```bash
# Export Cursor
python3 _meta/export_skill_cursor.py --all --output .cursor/skills.json

# Export tất cả
python3 _meta/export_all_skills.py
```

### 4. Commit & push

```bash
git add 07_AI_OPERATING_SYSTEM/01_Skills/S42_TenSkill/
git add .cursor/skills.json
git commit -m "feat(S42): thêm skill Tên Skill"
git push
```

---

## 📋 Cấu trúc frontmatter SKILL.md (Bắt buộc)

```yaml
---
name: kebab-case-identifier             # ← Định danh kích hoạt (phải unique)
title: Tiêu đề Skill Bằng Tiếng Việt    # ← Hiển thị trên IDE
description: Mô tả ngắn (1-2 câu)       # ← Dòng tóm tắt cho dropdown
version: "1.0.0"                        # ← Semantic versioning
scope:                                  # ← IDE mà skill này được thiết kế cho
  - claude-code
  - cursor
procedure: "ETV.P14"                    # ← (Mẫu A chỉ) Thủ tục tương ứng, hoặc bỏ trống
tags:                                   # ← Từ khóa tìm kiếm
  - document-governance
  - quality-management
  - vietnam-vietnamese
---
```

**Không bắt buộc:**
- `author`: Email/tên người tạo
- `created_at`: Ngày tạo (ISO 8601)
- `updated_at`: Ngày sửa cuối
- `supported_languages`: Ngôn ngữ skill hỗ trợ
- `security.requires_authentication`: Có cần API key
- `security.handles_sensitive_data`: Có xử lý dữ liệu mật

---

## 🔄 CI/CD Integration (tương lai)

Khi push lên `main`, CI sẽ tự động:

1. Chạy `validate_skill_schema.py` kiểm tra tất cả SKILL.md
2. Chạy `export_all_skills.py` sinh lại export files
3. Commit export files nếu có thay đổi
4. Deploy documentation nếu cần

(File: `.github/workflows/skill-export.yml` — chưa tạo, mẫu bên dưới)

---

## ✅ Checklist khi thêm skill mới

- [ ] Tạo thư mục `S{N}_Slug` hoặc `{stt}_S_Slug`
- [ ] Copy `SKILL_TEMPLATE.md` → `SKILL.md`
- [ ] Điền frontmatter (name, title, description, version, scope, tags)
- [ ] Viết nội dung skill (markdown body)
- [ ] Chạy `validate_skill_schema.py S{N}_Slug` — pass
- [ ] Chạy `export_all_skills.py` — sinh ra export files
- [ ] Test skill trên ít nhất 1 IDE trong `scope:`
- [ ] Commit & push

---

## 🐛 Troubleshooting

**Vấn đề:** "SKILL.md not found" hoặc "No frontmatter found"
- Đảm bảo file bắt đầu với `---` và kết thúc frontmatter với `---`
- File phải là `.md` (markdown), không phải `.txt`

**Vấn đề:** Validation error "Field: name, Error: 'must be string'"
- `name:` phải là kebab-case (chữ thường, dấu gạch ngang), không khoảng trắng

**Vấn đề:** Export thành công nhưng IDE không thấy skill
- Kiểm tra IDE có trong `scope:` không
- Restart IDE sau export
- Kiểm tra IDE có load file export (ví dụ `.cursor/skills.json` phải là valid JSON)

---

## 📚 Tài liệu liên quan

- **MANLAB CLAUDE.md:** Quy tắc bắt buộc cho Claude Code skill
- **03_MANAGEMENT_SYSTEM/02_P/{N}:** Thủ tục tương ứng (nếu Mẫu A)
- **05_MODULE_LIBRARY/M{N}/:** Module số hóa thủ tục (nếu có)
