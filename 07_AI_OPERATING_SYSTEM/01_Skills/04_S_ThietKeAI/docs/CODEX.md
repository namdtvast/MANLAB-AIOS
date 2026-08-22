# Hướng dẫn dùng với OpenAI Codex

## Thành phần Codex sử dụng

- `AGENTS.md`: quy tắc luôn áp dụng trong phạm vi repo.
- `SKILL.md`: mô tả năng lực và điều kiện kích hoạt.
- `DESIGN.md`: hợp đồng thiết kế.
- `skills/`: module chuyên môn chỉ đọc khi cần.

## Cài đặt

```bash
bash scripts/install-codex.sh
```

## Kiểm tra

```bash
ls ~/.codex/skills/04_S_ThietKeAI
cat ~/.codex/skills/04_S_ThietKeAI/SKILL.md | head
```

## Gọi trong Codex

```text
Dùng skill 04-s-thiet-ke-ai để tạo prototype dashboard ManLab theo design system ETV.
```

## Khuyến nghị cho AGENTS.md của dự án

```text
## Skills
- 04-s-thiet-ke-ai: Thiết kế UI/UX, dashboard, infographic, slide, báo cáo và prototype theo DESIGN.md. File: ~/.codex/skills/04_S_ThietKeAI/SKILL.md
```
