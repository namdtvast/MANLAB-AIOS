# Quick Start — Sử dụng Skill trên các IDE khác

Hướng dẫn nhanh cách cài đặt & kích hoạt skill MANLAB trên Cursor, Codex, Gemini CLI, v.v.

---

## 1. Claude Code (Mặc định)

**Không cần setup** — skills tự load từ thư mục này.

**Kích hoạt:**
```
/s14-kiem-soat-tai-lieu
/xu-ly-van-phong
/manlab-academic-research-os
```

hoặc gõ tên skill trong `/invoke-skill` panel.

---

## 2. Cursor

### Setup

1. **Tạo thư mục `.cursor` ở gốc repo (nếu chưa có):**
   ```bash
   mkdir -p .cursor
   ```

2. **Export skills từ MANLAB:**
   ```bash
   python3 _meta/export_skill_cursor.py --all --output .cursor/skills.json
   ```

3. **Mở Cursor, restart nếu cần.**

### Kích hoạt

- **Cách 1:** Gõ `/` rồi chọn tên skill từ dropdown
- **Cách 2:** Gõ tên skill trực tiếp vào Copilot panel (Cmd/Ctrl + K)

**Ví dụ:**
```
/etv-document-governance
/xu-ly-van-phong
```

### Đồng bộ khi cập nhật skill

Mỗi khi sửa `SKILL.md` trong MANLAB:

```bash
python3 _meta/export_skill_cursor.py --all --output .cursor/skills.json
# Restart Cursor hoặc reload copilot panel
```

---

## 3. Gemini CLI

### Setup

1. **Cài đặt Gemini CLI:**
   ```bash
   pip install google-genai
   ```

2. **Tạo thư mục config:**
   ```bash
   mkdir -p ~/.config/gemini-cli
   ```

3. **Export skills:**
   ```bash
   # Chạy từ gốc repo (chứa 07_AI_OPERATING_SYSTEM)
   python3 _meta/export_skill_gemini.py --all --output ~/.config/gemini-cli/skills.yaml
   ```

4. **Cấu hình Gemini CLI** (`~/.config/gemini-cli/config.yaml`):
   ```yaml
   default_model: "gemini-2.0-flash"
   
   skills:
     enabled: true
     path: ~/.config/gemini-cli/skills.yaml
   ```

### Kích hoạt

```bash
# Liệt kê skill
gemini-cli list-skills

# Gọi skill
gemini-cli invoke-skill etv-document-governance
gemini-cli invoke-skill xu-ly-van-phong --input "param1=value1"
```

---

## 4. VS Code + GitHub Copilot

### Setup

1. **Cài đặt VS Code extensions:**
   - GitHub Copilot
   - GitHub Copilot Chat

2. **Tạo thư mục `.vscode` ở gốc repo:**
   ```bash
   mkdir -p .vscode
   ```

3. **Export skills:**
   ```bash
   python3 _meta/export_skill_vscode.py --all --output .vscode/copilot-skills.json
   ```

4. **Mở VS Code workspace settings** (`.vscode/settings.json`):
   ```json
   {
     "copilot.skills": {
       "enable": true,
       "path": "${workspaceFolder}/.vscode/copilot-skills.json"
     }
   }
   ```

### Kích hoạt

- Mở Copilot Chat (Cmd/Ctrl + Shift + I)
- Gõ `/` để xem danh sách skill
- Chọn skill từ dropdown

**Ví dụ:**
```
/@etv-document-governance điều chỉnh metadata file này
/@xu-ly-van-phong hướng dẫn process này
```

---

## 5. OpenAI Codex / Copilot API

### Setup

1. **Export skill thành Function Calling schema:**
   ```bash
   python3 _meta/export_skill_openai.py S14_KiemSoatTaiLieu --format function-schema
   ```

2. **Lấy API key OpenAI** từ https://platform.openai.com/api-keys

3. **Dùng trong code:**
   ```python
   import openai
   
   # Load skill function schema
   with open(".openai/S14_KiemSoatTaiLieu.json") as f:
       skill_schema = json.load(f)
   
   response = openai.ChatCompletion.create(
       model="gpt-4",
       messages=[
           {"role": "user", "content": "Kiểm soát tài liệu này"}
       ],
       functions=[skill_schema],
       function_call="auto"
   )
   ```

---

## 6. Tạo Skill mới & Export

### Bước 1: Tạo thư mục skill

Nếu skill vận hành thủ tục `ETV.P42`:
```bash
mkdir -p 07_AI_OPERATING_SYSTEM/01_Skills/S42_TenSkill
```

### Bước 2: Tạo `SKILL.md`

Sao chép từ template:
```bash
cp 07_AI_OPERATING_SYSTEM/01_Skills/SKILL_TEMPLATE.md \
   07_AI_OPERATING_SYSTEM/01_Skills/S42_TenSkill/SKILL.md
```

Sửa frontmatter:
```yaml
name: s42-ten-skill
title: Tên Skill Của Bạn
description: Mô tả ngắn
version: "1.0.0"
scope:
  - claude-code
  - cursor
  - gemini-cli
procedure: "ETV.P42"
tags:
  - tag1
  - tag2
```

### Bước 3: Thêm nội dung skill

Viết hành vi & ví dụ trong body của `SKILL.md`.

### Bước 4: Export tất cả

```bash
python3 _meta/export_all_skills.py
```

### Bước 5: Commit & push

```bash
git add 07_AI_OPERATING_SYSTEM/01_Skills/S42_TenSkill/
git add .cursor/skills.json
git commit -m "feat(S42): thêm skill Tên Skill"
git push
```

---

## Troubleshooting

### Skill không xuất hiện trong IDE

1. **Kiểm tra SKILL.md có `name:` và `scope:` không**
   ```bash
   grep -A 2 "^name:" 07_AI_OPERATING_SYSTEM/01_Skills/S*/SKILL.md
   ```

2. **Chạy lại export:**
   ```bash
   python3 _meta/export_skill_cursor.py --all --output .cursor/skills.json
   ```

3. **Restart IDE**

### Export script lỗi "No frontmatter"

Đảm bảo SKILL.md bắt đầu với:
```markdown
---
name: kebab-case
...
---
```

(Có `---` ở đầu và cuối frontmatter)

### Skill chạy trên IDE A nhưng không chạy trên IDE B

- Kiểm tra `scope:` trong frontmatter có chứa IDE B không
- Nếu có, prompt của skill có dùng IDE-specific syntax không (ví dụ `@editor.action.*` chỉ có VS Code)
- Sửa prompt để IDE-agnostic, tăng version, export lại

---

## Tài liệu chi tiết

- [README.md](README.md) — Quy tắc đặt tên & cấu trúc skill
- [SKILL_TEMPLATE.md](SKILL_TEMPLATE.md) — Template chuẩn cho SKILL.md mới
- `../CLAUDE.md` — Quy tắc bắt buộc cho Claude Code skill
