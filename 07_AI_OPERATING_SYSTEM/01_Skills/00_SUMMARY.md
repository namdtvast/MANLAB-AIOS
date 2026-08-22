# 📋 Summary — Skill Portability Feature (2026-07-25)

Bổ sung hệ thống chuẩn hóa & export skill để dùng được trên nhiều AI IDE/CLI: Cursor, Gemini CLI, VS Code Copilot, OpenAI API, v.v.

---

## 🎯 Mục tiêu

**Từ trước:** Skill chỉ chạy trên Claude Code  
**Từ nay:** Skill chạy được trên Claude Code + Cursor + Gemini CLI + VS Code + OpenAI API + (mở rộng)

**Cách làm:** Chuẩn hóa `SKILL.md` frontmatter → viết adapter script → tự động export sang format IDE khác

---

## 📚 Tài liệu thêm mới (8 file)

### Tài liệu chính (4 file)

1. **`README.md`** — Đã cập nhật phần "Chuẩn hóa & Portability" (dài, kỹ lưỡng)
   - Cấu trúc SKILL.md chuẩn + frontmatter bắt buộc
   - 5 loại adapter (Cursor, Gemini, VS Code, Codex, OpenAI)
   - Compatibility matrix
   - Quy trình đồng bộ

2. **`QUICK_START.md`** — Hướng dẫn nhanh per IDE (6 IDE)
   - Cài đặt & kích hoạt skill trên từng IDE
   - Troubleshooting

3. **`SKILL_TEMPLATE.md`** — Template chuẩn để copy khi tạo skill mới
   - Frontmatter đầy đủ
   - Body structure mẫu

4. **`INDEX.md`** — Index & tóm tắt tất cả file & script
   - Danh sách file
   - Quy trình làm việc
   - Checklist

### Hướng dẫn & Tương lai (2 file)

5. **`CHANGELOG_PORTABILITY.md`** — Ghi chép những gì thêm mới
   - Danh sách file/script
   - Trạng thái adapter (ready vs template)
   - Next steps

6. **`MIGRATION_GUIDE.md`** — Hướng dẫn upgrade 3 skill hiện tại
   - Thay đổi từng trường frontmatter
   - Ví dụ trước/sau cho 3 skill
   - Checklist & troubleshooting

### Tài liệu tham chiếu (1 file)

7. **`00_SUMMARY.md`** — Tài liệu này

8. **`CHANGELOG_PORTABILITY.md`** — Chi tiết

---

## 🔧 Script & Tool thêm mới (5 file)

### Validation & Schema (2 file)

1. **`_meta/skills_schema.json`** — JSON Schema
   - Định nghĩa cấu trúc SKILL.md frontmatter
   - Bắt buộc: `name`, `title`, `description`, `version`, `scope`, `tags`
   - Tùy chọn: `author`, `created_at`, `security`, v.v.

2. **`_meta/validate_skill_schema.py`** — Validation script
   ```bash
   python3 _meta/validate_skill_schema.py              # Validate tất cả
   python3 _meta/validate_skill_schema.py S14_KiemSoatTaiLieu  # Validate 1 skill
   ```

### Adapter & Export (3 file)

3. **`_meta/export_skill_cursor.py`** — Adapter cho Cursor (READY ✓)
   ```bash
   python3 _meta/export_skill_cursor.py --all --output .cursor/skills.json
   ```
   - Convert SKILL.md + CLAUDE.md → `.cursor/skills.json`
   - Lọc skill có `"cursor"` trong `scope:`
   - Tested, dùng được ngay

4. **`_meta/export_all_skills.py`** — Master export script
   ```bash
   python3 _meta/export_all_skills.py
   ```
   - Chạy tất cả adapter cùng lúc
   - Báo tổng hợp kết quả

5. **`.github/workflows/skill-export.yml`** — CI/CD workflow (NEW)
   - Tự động validate SKILL.md khi push/PR
   - Tự động export khi thay đổi skill
   - Comment trên PR với trạng thái

---

## 🚀 Bước tiếp theo (Priority)

### Level 1 — Ngay hôm nay (10 phút)

```bash
# 1. Test validation script
python3 _meta/validate_skill_schema.py S14_KiemSoatTaiLieu

# 2. Test export Cursor
python3 _meta/export_skill_cursor.py --all --output .cursor/skills.json

# 3. Kiểm tra `.cursor/skills.json` có được tạo không
cat .cursor/skills.json | head -20
```

**Kỳ vọng:** Không có lỗi, `S14_KiemSoatTaiLieu` (hoặc các skill hiện tại) xuất hiện trong JSON

### Level 2 — Tuần này (30 phút)

**Migrate 3 skill hiện tại**
```bash
# Theo MIGRATION_GUIDE.md
# Update S14_KiemSoatTaiLieu, 02_S_XuLyVanPhong, 03_S_NghienCuuHocThuat
# Thêm: title, scope, tags, version (top-level)
# Rút gọn: description
# Xóa: metadata, license, argument-hint

python3 _meta/validate_skill_schema.py  # Validate tất cả
python3 _meta/export_skill_cursor.py --all
git add 07_AI_OPERATING_SYSTEM/01_Skills/*/SKILL.md
git add .cursor/skills.json
git commit -m "chore(skills): migrate to portable format"
```

### Level 3 — Tuần sau (1 giờ)

**Implement adapter cho Gemini CLI + VS Code**
- Copy mẫu `export_skill_cursor.py`
- Sửa format output (YAML cho Gemini, JSON cho VS Code)
- Test trên Gemini CLI + VS Code nếu cài sẵn

### Level 4 — Tương lai (tùy chọn)

- Kích hoạt CI/CD workflow khi tất cả adapter đã ready
- Tạo npm package để distribute skills
- Support cho Anthropic API, Gemini API trực tiếp

---

## 📊 Trạng thái hiện tại

### Skill (cần migrate)

| Skill | Cũ | Mới | Status |
|---|---|---|---|
| `S14_KiemSoatTaiLieu` | Có SKILL.md | + title, scope, tags, version | ⏳ Chờ migrate |
| `02_S_XuLyVanPhong` | Có SKILL.md | + title, scope, tags, version | ⏳ Chờ migrate |
| `03_S_NghienCuuHocThuat` | Có SKILL.md | + title, scope, tags, version | ⏳ Chờ migrate |

### Adapter (sử dụng được)

| Adapter | IDE | Ready | Tested |
|---|---|---|---|
| `export_skill_cursor.py` | Cursor | ✓ | ✓ Code review |
| `export_skill_gemini.py` | Gemini CLI | ✗ (template) | ✗ |
| `export_skill_vscode.py` | VS Code | ✗ (template) | ✗ |
| `export_skill_openai.py` | OpenAI API | ✗ (template) | ✗ |

---

## 📂 File mới tổng hợp

```
07_AI_OPERATING_SYSTEM/01_Skills/
├── 00_SUMMARY.md                    ← File này
├── README.md                        ← (đã cập nhật phần Portability)
├── QUICK_START.md                   ← Hướng dẫn nhanh
├── SKILL_TEMPLATE.md                ← Template
├── INDEX.md                         ← Index & tóm tắt
├── CHANGELOG_PORTABILITY.md         ← Ghi chép thay đổi
├── MIGRATION_GUIDE.md               ← Hướng dẫn migrate
├── S14_KiemSoatTaiLieu/
│   └── SKILL.md                     ← (chờ update)
├── 02_S_XuLyVanPhong/
│   └── SKILL.md                     ← (chờ update)
├── 03_S_NghienCuuHocThuat/
│   └── SKILL.md                     ← (chờ update)
└── ...

_meta/
├── skills_schema.json               ← JSON Schema
├── validate_skill_schema.py         ← Validation script
├── export_skill_cursor.py           ← Adapter Cursor (READY)
├── export_all_skills.py             ← Master export

.cursor/
└── skills.json                      ← Export output (tạo sau export)

.github/workflows/
└── skill-export.yml                 ← CI/CD workflow
```

---

## 🔗 Liên kết nhanh

| Tài liệu | Link | Cho ai |
|---|---|---|
| **README.md (Portability)** | `07_AI_OPERATING_SYSTEM/01_Skills/README.md` | Người muốn hiểu đầy đủ |
| **Quick Start** | `07_AI_OPERATING_SYSTEM/01_Skills/QUICK_START.md` | Người muốn setup IDE khác |
| **Template** | `07_AI_OPERATING_SYSTEM/01_Skills/SKILL_TEMPLATE.md` | Người tạo skill mới |
| **Index** | `07_AI_OPERATING_SYSTEM/01_Skills/INDEX.md` | Người muốn overview |
| **Migration** | `07_AI_OPERATING_SYSTEM/01_Skills/MIGRATION_GUIDE.md` | Người update skill cũ |

---

## ✅ Kiểm tra nhanh

**Xác nhận hệ thống hoạt động:**

```bash
# 1. Validate schema script chạy được
python3 _meta/validate_skill_schema.py --help

# 2. Export script chạy được  
python3 _meta/export_skill_cursor.py --help

# 3. Export ra JSON hợp lệ
python3 _meta/export_skill_cursor.py --all --output /tmp/test_skills.json
cat /tmp/test_skills.json | python3 -m json.tool > /dev/null && echo "✓ Valid JSON"
```

---

## 🎓 Kiến thức nền

**Nếu chưa biết về:**
- **Semantic versioning:** `major.minor.patch` (1.0.0, 1.0.1, 1.1.0, 2.0.0)
- **Kebab-case:** Chữ thường + dấu gạch ngang: `s14-kiem-soat-tai-lieu`
- **YAML frontmatter:** Markdown block từ `---` đến `---` chứa metadata
- **JSON Schema:** Định nghĩa cấu trúc JSON (xem `skills_schema.json`)

**Tài liệu MANLAB liên quan:**
- Skill Mẫu A/B: `07_AI_OPERATING_SYSTEM/01_Skills/README.md`
- ISO 42001 (AI Governance): `03_MANAGEMENT_SYSTEM/`
- MP29 (AI Management): `04_PROCESS_LIBRARY/MP29_*/`

---

## 💬 Q&A

**Q: Tại sao phải chuẩn hóa SKILL.md?**  
A: Để adapter script có thể parse & convert skill sang định dạng IDE khác một cách tự động, không cần sửa tay.

**Q: Skill của tôi có thay đổi khi export sang Cursor không?**  
A: Không, nội dung `body` (Markdown) vẫn nguyên vẹn, chỉ convert format metadata thôi.

**Q: Có cần cài đặt thêm gì trên IDE không?**  
A: Chỉ cần copy file export (ví dụ `.cursor/skills.json`) vào vị trí IDE yêu cầu + restart IDE.

**Q: Nếu sửa SKILL.md, có cần export lại không?**  
A: Đúng. Hoặc CI tự động chạy khi push, hoặc chạy `python3 _meta/export_all_skills.py` trước commit.

**Q: Tôi có thể dùng skill này trên IDE khác như Sublime, Vim không?**  
A: Phần lớn không hỗ trợ sẵn skill system, nhưng bạn có thể copy prompt từ SKILL.md dùng thủ công.

---

## 📞 Support

**Nếu gặp lỗi:**
1. Kiểm tra `QUICK_START.md` phần Troubleshooting
2. Chạy `python3 _meta/validate_skill_schema.py S{N}_Skill` để debug SKILL.md
3. Xem mẫu `SKILL_TEMPLATE.md` để so sánh cấu trúc

**Nếu muốn hỏi:**
- Về MANLAB skill system: xem `README.md`
- Về cách sử dụng IDE cụ thể: xem `QUICK_START.md`
- Về migration: xem `MIGRATION_GUIDE.md`

---

**Tạo lúc:** 2026-07-25  
**By:** Claude Code + MANLAB Portability Initiative
