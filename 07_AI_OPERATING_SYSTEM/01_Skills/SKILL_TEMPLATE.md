---
name: kebab-case-skill-name
title: Tiêu đề Skill Bằng Tiếng Việt
description: Mô tả ngắn (1-2 câu) ý nghĩa skill & khi nào dùng
version: "1.0.0"
scope:
  - claude-code
  - cursor
  - codex
  - gemini-cli
  - vscode-copilot
procedure: "ETV.Pxx"
tags:
  - category-1
  - category-2
  - vietnam-vietnamese
---

# Tên Skill Đầy Đủ

## Ý nghĩa

Giải thích skill là gì, nó giải quyết bài toán gì.

## Khi nào dùng

- Trường hợp 1: ...
- Trường hợp 2: ...
- Trường hợp 3: ...

## Hành vi bắt buộc

Nếu skill có quy trình/luồng công việc cụ thể, liệt kê các bước/ràng buộc:

1. Bước 1: ...
2. Bước 2: ...
3. Bước 3: ...

**Ràng buộc:** Nếu skill không được phép tự quyết định (ví dụ: AI không tự phê duyệt chứng chỉ), ghi rõ ở đây.

## Ví dụ

**Input:** 
```
User yêu cầu: ...
```

**Output:**
```
AI trả về: ...
```

---

## Ghi chú cho người phát triển

### Claude Code
- **Kích hoạt:** `/kebab-case-skill-name` hoặc `/s{N}` (nếu là Mẫu A)
- **CLAUDE.md:** Xem `S{N}_SkillName/CLAUDE.md` để biết quy tắc bắt buộc

### Cursor
- **Kích hoạt:** Gõ tên skill vào Copilot panel hoặc `/kebab-case-skill-name`
- **Đòi hỏi:** prompt phải không dùng VS Code-specific syntax

### Gemini CLI
- **Kích hoạt:** `gemini-cli invoke-skill kebab-case-skill-name`

### VS Code Copilot
- **Kích hoạt:** Cmd/Ctrl + Shift + A → chọn từ dropdown

### Codex / OpenAI API
- **Format:** Function Calling schema (tự sinh từ SKILL.md)
- **Note:** Prompt sẽ được convert thành `functions[0].description`
