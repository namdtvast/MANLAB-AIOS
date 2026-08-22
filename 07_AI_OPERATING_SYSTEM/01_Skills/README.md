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

> **Lưu ý:** trường `name:` trong frontmatter `SKILL.md` (kebab-case — dùng để Claude nhận diện/kích hoạt skill) **phải là bản chuyển đổi cơ học của tên thư mục** (hạ chữ thường + đổi `_` thành `-`, tách theo ranh giới chữ hoa của PascalCase), ví dụ `06_S_LapTrinhTheoDacTa` → `06-s-lap-trinh-theo-dac-ta`. Không tự đặt tên kích hoạt khác tên thư mục — xem bảng mapping bên dưới. `_meta/validate_skill_schema.py` (chạy trong CI) kiểm tra tự động quy tắc này.

### Bắt buộc kèm theo mỗi skill

- `SKILL.md` — bắt buộc, có frontmatter `name:` (kebab-case, định danh kích hoạt skill).
- `CLAUDE.md` — khuyến nghị nếu skill có hành vi/quy tắc bắt buộc nhiều bước (không phải chỉ mô tả tĩnh).

### Skill hiện có

| Thư mục | Mẫu | Thủ tục nguồn | `name:` trong SKILL.md |
|---|---|---|---|
| `S14_KiemSoatTaiLieu` | A | `ETV.P14` — Kiểm soát tài liệu | `s14-kiem-soat-tai-lieu` |
| `01_S_Governance` | B | (không có) | `01-s-governance` |
| `02_S_XuLyVanPhong` | B | (không có) | `02-s-xu-ly-van-phong` |
| `03_S_NghienCuuHocThuat` | B | (không có) | `03-s-nghien-cuu-hoc-thuat` |
| `04_S_ThietKeAI` | B | (không có) | `04-s-thiet-ke-ai` |
| `05_S_DrawIO` | B | (không có) | `05-s-draw-io` |
| `06_S_LapTrinhTheoDacTa` | B | (không có) | `06-s-lap-trinh-theo-dac-ta` |

Số thứ tự tiếp theo cho skill **Mẫu B** (không gắn thủ tục): `07`.

---

## Chuẩn hóa & Portability — Skill chạy trên nhiều nền tảng

Để skill trong MANLAB có thể dùng được trên Claude Code, Cursor, Codex, Gemini CLI, VS Code Copilot, v.v., cần tách biệt **định nghĩa skill (nội dung)** khỏi **cấu hình AI IDE (format riêng)**.

### Cấu trúc SKILL.md chuẩn (khung sườn)

Mỗi thư mục skill **bắt buộc** chứa `SKILL.md` với frontmatter tối thiểu + body markdown:

```yaml
---
name: kebab-case-identifier
title: Tiêu đề skill bằng tiếng Việt
description: Mô tả ngắn (1-2 câu) ý nghĩa & khi dùng
version: "1.0.0"
scope: 
  - claude-code
  - cursor
  - codex
  - gemini-cli
  - vscode-copilot
procedure: "ETV.P14"  # (tuỳ mẫu A/B, có hoặc không)
tags:
  - document-governance
  - quality-management
  - vietnam-vietnamese
---

# Mô tả chi tiết

## Ý nghĩa
...

## Khi nào dùng
...

## Hành vi bắt buộc
...
```

| Trường | Yêu cầu | Ý nghĩa |
|---|---|---|
| **`name`** | ✓ Bắt buộc | kebab-case, định danh kích hoạt skill — phải duy nhất trong thư mục skill |
| **`title`** | ✓ Bắt buộc | Tiêu đề đọc được cho con người (tiếng Việt) |
| **`description`** | ✓ Bắt buộc | Dòng tóm tắt 1-2 câu — dùng trong dropdown/list skill |
| **`version`** | ✓ Bắt buộc | Semantic versioning (`1.0.0`); tăng khi sửa prompt/hành vi |
| **`scope`** | ✓ Bắt buộc | Mảng các IDE/CLI tool mà skill này được thiết kế cho |
| **`procedure`** | Tùy Mẫu | Số thủ tục `ETV.Pxx` nếu skill thuộc Mẫu A; để trống nếu Mẫu B |
| **`tags`** | ✓ Nên có | Từ khóa để tìm kiếm & phân loại |

### Adapter — Chuyển đổi từ SKILL.md sang format IDE khác

Khi skill cần cài trên IDE khác, **không copy-paste & chỉnh tay**, mà dùng adapter script để dịch từ `SKILL.md` chuẩn sang format của IDE đó:

#### 1. Claude Code (`.claude/skills/`)
**Format hiện tại:** SKILL.md + CLAUDE.md (nằm ở thư mục skill trong `07_AI_OPERATING_SYSTEM`)

**Cách dùng:** Claude Code tự load từ `07_AI_OPERATING_SYSTEM/01_Skills/S{N}_*/SKILL.md` — không cần chuyển đổi, đã là format native.

#### 2. Cursor (`.cursor/skills.json`)
**Format Cursor:** JSON array, mỗi skill là object `{name, prompt, description, tags}`

**Adapter script** (`_meta/export_skill_cursor.py`):
```bash
python3 _meta/export_skill_cursor.py S14_KiemSoatTaiLieu --output .cursor/skills.json
```

Adapter sẽ:
1. Đọc `S14_KiemSoatTaiLieu/SKILL.md` + `S14_KiemSoatTaiLieu/CLAUDE.md`
2. Kết hợp frontmatter + body thành single prompt JSON
3. Ghi vào `.cursor/skills.json` theo format Cursor

#### 3. Gemini CLI (`~/.config/gemini-cli/skills.yaml`)
**Format Gemini:** YAML list, mỗi skill là `- name:`, `prompt:`, `description:`, `version:`

**Adapter script** (`_meta/export_skill_gemini.py`):
```bash
python3 _meta/export_skill_gemini.py --all --output ~/.config/gemini-cli/skills.yaml
```

#### 4. VS Code Copilot (`.vscode/copilot-skills.json`)
**Format VS Code:** JSON, mỗi skill là object với `id`, `title`, `prompt`, `scope` (editor/workspace/file)

**Adapter script** (`_meta/export_skill_vscode.py`):
```bash
python3 _meta/export_skill_vscode.py S14_KiemSoatTaiLieu --output .vscode/copilot-skills.json
```

#### 5. Codex (OpenAI / GitHub Copilot API)
**Format Codex:** OpenAI Function Calling schema (JSON Schema)

**Adapter script** (`_meta/export_skill_openai.py`):
```bash
python3 _meta/export_skill_openai.py S14_KiemSoatTaiLieu --format function-schema
```

Sẽ sinh schema JSON để gửi tới Codex API.

### Bộ adapter công cụ

Tất cả adapter được đặt trong `_meta/` để quản lý tập trung:

```
_meta/
├── export_skill_*.py         # Adapter cho từng IDE/CLI
├── validate_skill_schema.py  # Kiểm tra SKILL.md tuân thủ schema
├── build_site.py             # (hiện tại — cập nhật để export skill)
└── skills_schema.json        # JSON Schema định nghĩa cấu trúc SKILL.md
```

**Chạy tất cả adapter cùng lúc:**
```bash
python3 _meta/export_all_skills.py
```

Kết quả:
```
.cursor/skills.json                 ← export cho Cursor
~/.config/gemini-cli/skills.yaml   ← export cho Gemini CLI
.vscode/copilot-skills.json        ← export cho VS Code Copilot
```

### Compatibility Matrix — Skill nào chạy trên nền tảng nào

| Skill | Claude Code | Cursor | Gemini CLI | VS Code Copilot | Codex/Copilot API |
|---|---|---|---|---|---|
| `S14_KiemSoatTaiLieu` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `02_S_XuLyVanPhong` | ✓ | ✓ | ✓ | ✓ | ◐ (prompt chưa dùng OpenAI schema) |
| `03_S_NghienCuuHocThuat` | ✓ | ✓ | ◐ (chưa test) | ✓ | ✓ |
| `06_S_LapTrinhTheoDacTa` | ✓ | ◐ (chưa test) | ◐ (chưa test) | ◐ (chưa test) | ✓ |

**Chú giải:** ✓ = hỗ trợ đầy đủ, ◐ = hỗ trợ một phần (cần kiểm tra), ✗ = không hỗ trợ

### Hướng dẫn dùng skill trên từng IDE

#### Claude Code (mặc định, không cần setup thêm)
```bash
# Skill tự load từ 07_AI_OPERATING_SYSTEM/01_Skills
# Kích hoạt bằng /s14-kiem-soat-tai-lieu hoặc tên trong SKILL.md
```

#### Cursor
1. Chạy adapter: `python3 _meta/export_skill_cursor.py --all`
2. Mở `.cursor/skills.json`, verify skill đã có trong list
3. Restart Cursor
4. Kích hoạt bằng tên `name:` từ frontmatter

#### Gemini CLI
1. Chạy adapter: `python3 _meta/export_skill_gemini.py --all`
2. Cấu hình `~/.config/gemini-cli/config.yaml`:
   ```yaml
   skills:
     enabled: true
     path: ~/.config/gemini-cli/skills.yaml
   ```
3. Restart Gemini CLI
4. Dùng: `gemini-cli invoke-skill s14-kiem-soat-tai-lieu`

#### VS Code Copilot
1. Chạy adapter: `python3 _meta/export_skill_vscode.py --all`
2. Mở VS Code, kích hoạt Copilot (Cmd/Ctrl + Shift + A)
3. Skills sẽ xuất hiện trong dropdown / gợi ý

### Quy trình đồng bộ khi sửa skill

```
1. Sửa SKILL.md (hoặc CLAUDE.md) trong 07_AI_OPERATING_SYSTEM/01_Skills/Sxx_*
   ↓
2. Tăng version trong frontmatter (1.0.0 → 1.0.1 / 1.1.0 / 2.0.0)
   ↓
3. Chạy: python3 _meta/validate_skill_schema.py
   ↓
4. Nếu pass: chạy python3 _meta/export_all_skills.py
   ↓
5. Commit + push
   ↓
6. CI tự động chạy export lại nếu có thay đổi skill
```

### Lưu ý khi thiết kế skill "portable"

- **Prompt phải IDE-agnostic** — không nhắc tới "VS Code", "Cursor", v.v., chỉ nói việc cần làm
- **Output format**: luôn dùng markdown, không dùng format riêng của IDE (ví dụ không dùng `@editor.action.*` chỉ có VS Code)
- **Test trên 2+ IDE**: nếu skill yêu cầu hỗ trợ đa nền tảng, phải test chạy trên ít nhất 2 IDE khác nhau
- **Version bump khi có breaking change**: nếu đổi `scope` hoặc prompt logic thay đổi kết quả, bump major version (x.0.0)
